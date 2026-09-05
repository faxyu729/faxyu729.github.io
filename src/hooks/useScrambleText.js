import { useEffect } from "react";

export default function useScrambleText(enabled) {
  useEffect(() => {
    const elements = document.querySelectorAll(".scramble-text");
    if (!elements.length) return;
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

    const scramble = (element) => {
      const target = element.dataset.text || element.textContent;
      const length = target.length;
      if (!enabled) {
        element.textContent = target;
        return;
      }
      const startTime = performance.now();

      const frame = (now) => {
        const elapsed = now - startTime;
        const resolvedCount =
          elapsed < 600 ? 0 : Math.min(length, Math.floor((elapsed - 600) / 180));
        let text = "";
        for (let index = 0; index < length; index += 1) {
          text +=
            index < resolvedCount
              ? target[index]
              : chars[Math.floor(Math.random() * chars.length)];
        }
        element.textContent = text;
        if (resolvedCount < length) requestAnimationFrame(frame);
        else element.textContent = target;
      };
      requestAnimationFrame(frame);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          scramble(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [enabled]);
}
