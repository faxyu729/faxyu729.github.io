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
