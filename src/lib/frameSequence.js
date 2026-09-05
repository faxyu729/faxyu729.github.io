const BASE = (() => {
  try {
    return import.meta.env.BASE_URL;
  } catch {
    return "";
  }
})();
export const FRAME_COUNT = 144;
export function frameAt(progress, count = FRAME_COUNT) {
  return Math.round(
    Math.max(0, Math.min(1, Number.isFinite(progress) ? progress : 0)) *
      (count - 1),
  );
}
export function frameUrl(scene, index, small = false) {
  const slash = BASE.endsWith("/") ? "" : "/";
  return `${BASE}${slash}sequences/${scene}/${small ? "mobile/" : ""}${String(index).padStart(3, "0")}.webp`;
}
export function nearestFrame(indices, target) {
  return indices.length
    ? indices.reduce((best, value) =>
        Math.abs(value - target) < Math.abs(best - target) ? value : best,
      )
    : null;
}

export function idlePreloadSequence(
  scene,
  frameIndices = [0, 1, 2, 3, 4, 6, 8, 12, 16],
) {
  if (typeof window === "undefined") return () => {};
  if (navigator.connection?.saveData) return () => {};

  const small =
    window.matchMedia("(max-width: 700px)").matches ||
    Boolean(navigator.connection?.saveData);

  let cancelled = false;
  const idleCallback =
    typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback.bind(window)
      : (cb) => setTimeout(() => cb({ timeRemaining: () => 50 }), 300);
  const cancelIdle =
    typeof window.cancelIdleCallback === "function"
      ? window.cancelIdleCallback.bind(window)
      : clearTimeout;

  const id = idleCallback(async (deadline) => {
    for (const index of frameIndices) {
      if (cancelled) break;
      if (deadline?.timeRemaining && deadline.timeRemaining() < 5) {
        await new Promise((r) => setTimeout(r, 60));
      }
      try {
        const url = frameUrl(scene, index, small);
        await fetch(url, { priority: "low" }).catch(() => {});
      } catch {
        // Preload error handled silently
      }
    }
  });

  return () => {
    cancelled = true;
    cancelIdle(id);
  };
}
