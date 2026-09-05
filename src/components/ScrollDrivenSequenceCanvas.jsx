import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useMotionPreference } from "../hooks/useMotionPreference";
import {
  frameAt,
  frameUrl,
  idlePreloadSequence,
  nearestFrame,
} from "../lib/frameSequence";
export default forwardRef(function ScrollDrivenSequenceCanvas(
  { scene, label, eager = false, idlePreload = false },
  ref,
) {
  const { motionEnabled } = useMotionPreference(),
    canvas = useRef(null),
    wrapper = useRef(null),
    seekRef = useRef(() => {}),
    progress = useRef(0);
  useImperativeHandle(
    ref,
    () => ({
      seek(p) {
        progress.current = p;
        seekRef.current(p);
      },
    }),
    [],
  );
  useEffect(() => {
    if (!motionEnabled) return;
    const el = canvas.current,
      ctx = el.getContext("2d");
    if (!ctx) return;
    const small =
        window.matchMedia("(max-width: 700px)").matches ||
        navigator.connection?.saveData,
      maxCache = 36,
      cache = new Map(),
      pending = new Map(),
      failed = new Set();
    let alive = true,
      near = eager,
      target = frameAt(progress.current),
      raf = 0,
      seekRaf = 0,
      last = -1;
    const paint = () => {
      raf = 0;
      if (!alive) return;
      const index = nearestFrame([...cache.keys()], target);
      if (index === null) return;
      const bitmap = cache.get(index);
      if (index === last) return;
      ctx.clearRect(0, 0, el.width, el.height);
      ctx.drawImage(bitmap, 0, 0, el.width, el.height);
      last = index;
      el.dataset.frame = String(index);
      el.dataset.ready = "true";
    };
    const queuePaint = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const prune = () => {
      const limit = near ? maxCache : 1;
      while (cache.size > limit) {
        const keys = [...cache.keys()].sort(
          (a, b) => Math.abs(b - target) - Math.abs(a - target),
        );
        const key = keys[0];
        cache.get(key)?.close?.();
        cache.delete(key);
      }
    };
    const request = async (index) => {
      const controller = new AbortController();
      pending.set(index, controller);
      try {
        const response = await fetch(frameUrl(scene, index, small), {
          signal: controller.signal,
        });
        if (!response.ok) throw Error("frame unavailable");
        const bitmap = await createImageBitmap(await response.blob());
        if (!alive) {
          bitmap.close();
          return;
        }
        cache.set(index, bitmap);
        prune();
        queuePaint();
      } catch (error) {
        if (error.name !== "AbortError") failed.add(index);
      } finally {
        pending.delete(index);
        if (alive) pump();
      }
    };
    const pump = () => {
      if (!alive || !near) return;
      const order = [
        target,
        ...Array.from({ length: 5 }, (_, i) => [
          target + i + 1,
          target - i - 1,
        ]).flat(),
      ].filter((i) => i >= 0 && i < 144);
      for (const i of order) {
        if (pending.size >= 3) break;
        if (!cache.has(i) && !pending.has(i) && !failed.has(i)) request(i);
      }
    };
    seekRef.current = (p) => {
      target = frameAt(p);
      el.dataset.target = String(target);
      for (const [index, controller] of pending) {
        if (Math.abs(index - target) > 6) controller.abort();
      }
      queuePaint();
      if (!seekRaf) {
        seekRaf = requestAnimationFrame(() => {
          seekRaf = 0;
          pump();
        });
      }
    };
    const resize = () => {
      const size = Math.min(
        small ? 600 : 1200,
        Math.round(el.clientWidth * Math.min(devicePixelRatio, 1.5)),
      );
      el.width = el.height = Math.max(1, size);
      last = -1;
      queuePaint();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) {
          pump();
          queuePaint();
        } else {
          for (const c of pending.values()) c.abort();
          prune();
        }
      },
      { rootMargin: "350px" },
    );
    io.observe(wrapper.current);
    pump();
    return () => {
      alive = false;
      seekRef.current = () => {};
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      if (seekRaf) cancelAnimationFrame(seekRaf);
      for (const c of pending.values()) c.abort();
      for (const b of cache.values()) b.close?.();
    };
  }, [scene, motionEnabled, eager]);
  useEffect(() => {
    if (!idlePreload || eager || !motionEnabled) return;
    return idlePreloadSequence(scene);
  }, [idlePreload, eager, scene, motionEnabled]);
  return (
    <div
      ref={wrapper}
      className="sequence-canvas"
      data-sequence={scene}
      role="img"
      aria-label={label}
    >
      <picture aria-hidden="true">
        <source media="(max-width: 700px)" srcSet={frameUrl(scene, 0, true)} />
        <img
          className="sequence-poster"
          src={frameUrl(scene, 0, false)}
          alt=""
          width="1200"
          height="1200"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </picture>
      {motionEnabled && <canvas ref={canvas} aria-hidden="true" />}
    </div>
  );
});
