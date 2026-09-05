import { useEffect } from "react";

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    if (!glow || window.matchMedia("(hover: none)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let currentX = -100;
    let currentY = -100;
    let animationFrame = null;
    let visible = false;

    const updatePosition = () => {
      currentX += (mouseX - currentX) * 0.2;
      currentY += (mouseY - currentY) * 0.2;
      glow.style.setProperty("--cursor-x", `${currentX}px`);
      glow.style.setProperty("--cursor-y", `${currentY}px`);

      if (
        Math.abs(mouseX - currentX) > 0.1 ||
        Math.abs(mouseY - currentY) > 0.1
      ) {
        animationFrame = requestAnimationFrame(updatePosition);
      } else {
        animationFrame = null;
      }
    };

    const handlePointerMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!visible) {
        visible = true;
        glow.classList.add("is-visible");
      }

      const interactive = event.target?.closest(
        "a, button, [role='button'], input, textarea, select, .pill, .contact-link",
      );
      glow.classList.toggle("is-hover", Boolean(interactive));
      if (animationFrame === null) {
        animationFrame = requestAnimationFrame(updatePosition);
      }
    };

    const handlePointerLeave = () => {
      visible = false;
      glow.classList.remove("is-visible");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div className="cursor-glow" aria-hidden="true" />;
}
