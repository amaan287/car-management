import { useEffect, useRef } from "react";
import gsap, { TimelineLite } from "gsap";
export default function CustomPreloader() {
  const preloaderRef = useRef(null);
  const timelineRef = useRef<TimelineLite | null>(null);

  useEffect(() => {
    // Create a GSAP timeline
    timelineRef.current = gsap.timeline({ delay: 0.5 });

    // Add animations to the timeline
    if (timelineRef.current)
      timelineRef.current
        .to(".counter", {
          opacity: 0,
          duration: 0.25,
        })
        .to(".bar", {
          height: "100vh", // Move to middle
          duration: 0,
          stagger: {
            amount: 0.5,
          },
          ease: "power4.inOut",
        })
        .to(".daily-airs", {
          y: "-50vh", // Move from bottom to middle
          duration: 1,
          ease: "power4.out",
        })
        .to(".daily-airs", {
          y: "-50vh", // Stay in middle
          duration: 1,
        })
        .to(
          ".daily-airs",
          {
            y: "-100vh", // Move up and disappear
            duration: 1,
            ease: "power4.in",
          },
          "-=0.5"
        ) // Start this animation 0.5s before the previous one ends
        .to(
          ".bar",
          {
            height: 0, // Disappear upwards
            duration: 1,
            stagger: {
              amount: 0.5,
            },
            ease: "power4.inOut",
          },
          "-=0.5"
        ) // Start this animation 0.5s before the previous one ends
        .set(preloaderRef.current, { display: "none" }); // Set display to none after animation
  }, []);

  return (
    <div ref={preloaderRef} className="relative overflow-hidden">
      <div className="overlay fixed inset-0 z-40 flex">
        <div className="bar w-[100vw] h-[100vh] bg-black"></div>
      </div>
      <div
        className="daily-airs fixed inset-x-0 bottom-0 z-50 flex items-center justify-center text-white text-6xl font-bold"
        style={{ transform: "translateY(100%)" }}
      >
        D A I L Y &nbsp; A I R S
      </div>
    </div>
  );
}
