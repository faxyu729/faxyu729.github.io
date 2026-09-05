import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  ignoreMobileResize: true,
});
export default function usePortfolioScrollAnimations(page, core, archive, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const ctx = gsap.context(() => {
      gsap.to(".reading-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: page.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
      const h = gsap.timeline({
          scrollTrigger: {
            id: "hero",
            trigger: "#home",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
            invalidateOnRefresh: true,
          },
        }),
        hp = { p: 0 };
      h.to(
        hp,
        {
          p: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => core.current?.seek(hp.p),
        },
        0,
      );
      gsap.set(".hero-sequence", { x: "-8%" });
      h.to(".hero-copy", { y: -70, autoAlpha: 0, duration: 0.32 }, 0.22).to(
        ".hero-sequence",
        {
          xPercent: () => (window.innerWidth <= 600 ? -12 : -80),
          x: "-10%",
          scale: 1,
          duration: 0.55,
        },
        0.25,
      );
      h.fromTo(
        ".hero-second",
        { y: 60, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.25 },
        0.5,
      ).to(".hero-second", { autoAlpha: 0, duration: 0.12 }, 0.87);
      gsap.fromTo(
        ".portal",
        { clipPath: "circle(5% at 50% 8%)" },
        {
          clipPath: "circle(145% at 50% 8%)",
          ease: "none",
          scrollTrigger: {
            trigger: "#about",
            start: "top 90%",
            end: "top 10%",
            scrub: true,
          },
        },
      );
      gsap.fromTo(
        ".about-line",
        { color: "#a3adba" },
        {
          color: "#17283f",
          stagger: 0.28,
          scrollTrigger: {
            trigger: ".about-statement",
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.4,
          },
        },
      );
      gsap.to(".about-orbit", {
        y: -110,
        rotate: 35,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      const o = gsap.timeline({
        scrollTrigger: {
          id: "observation",
          trigger: "#growth, #observation",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.15,
        },
      });
      o.from(
        ".graph-line",
        { strokeDashoffset: 1, stagger: 0.07, duration: 0.45 },
        0,
      ).from(
        ".graph-node",
        {
          opacity: 0.15,
          scale: 0.65,
          transformOrigin: "center",
          stagger: 0.09,
          duration: 0.35,
        },
        0,
      );
      o.from(
        ".observation-point",
        { opacity: 0.15, y: 28, duration: 0.4 },
        0.15,
      );
      const archiveStage = document.querySelector(".archive-stage");
      if (archiveStage && archive?.current) {
        const ap = { p: 0 },
          a = gsap.timeline({
            scrollTrigger: {
              id: "archive",
              trigger: "#origin",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.15,
            },
          });
        a.to(
          ap,
          {
            p: 1,
            duration: 1,
            ease: "none",
            onUpdate: () => archive.current?.seek(ap.p),
          },
          0,
        )
          .from(
            ".archive-caption",
            { opacity: 0, y: 40, stagger: 0.17, duration: 0.25 },
            0.15,
          );
      }
      const gallery = document.querySelector(".gallery-track"),
        viewport = document.querySelector(".gallery-window");
      if (gallery && viewport) {
        gsap.to(gallery, {
          x: () => -Math.max(0, gallery.scrollWidth - viewport.clientWidth),
          ease: "none",
          scrollTrigger: {
            id: "gallery",
            trigger: "#works",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });
      }
      gsap.fromTo(
        ".gallery-cool",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          ease: "none",
          scrollTrigger: {
            trigger: "#works",
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
      gsap.from(".contact-ray", {
        scaleX: 0.2,
        opacity: 0,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 80%",
          end: "top 30%",
          scrub: 0.2,
        },
      });
      gsap.from(".contact-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".contact-links",
          start: "top 95%",
          end: "top 65%",
          scrub: 0.2,
        },
      });
      gsap.utils
        .toArray(".reveal")
        .forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 94%",
              end: "top 76%",
              scrub: 0.2,
            },
          }),
        );
    }, page);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);
    return () => {
      ctx.revert();
      window.removeEventListener("load", refresh);
    };
  }, [enabled, page, core, archive]);
}
