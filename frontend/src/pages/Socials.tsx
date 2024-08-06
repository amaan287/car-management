import { DockD } from "@/components/Dock";
import { HeroHighlightDemo } from "@/components/HighlightedText";
import InstagramVideo from "@/components/InstagramVideo";

import { OrbitingCirclesComp } from "@/components/OrbitingCircles";
import { Button } from "@/components/ui/button";
import YoutubeVideo from "@/components/YoutubeVideo";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
export default function Socials() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div className="w-full max-w-screen h-full min-h-screen flex  flex-col items-center gap-4 ">
      <ScrollToTop />
      <div className=" w-screen flex flex-col md:flex-row items-start justify-center gap-20 mt-10">
        <h1 className="mt-10 text-xl">
          <HeroHighlightDemo
            HighlightedText="why"
            normalText="you should follow us?"
          />
        </h1>
        <div className="flex flex-col">
          <YoutubeVideo />
          <HeroHighlightDemo HighlightedText="Grow with us" normalText=" " />
          <h1>So you can grow with us with this type of content</h1>
          <Link
            target="_blank"
            to={"https://youtube.com/@priyanshsoniii?si=OXBF5MiwhwwYqWLA"}
          >
            <Button>subscribe now</Button>
          </Link>
          <h1> click on this to directly visit our channel </h1>
        </div>
      </div>
      <div>
        <OrbitingCirclesComp />
      </div>
      <div className=" w-full">
        <h1>What about Instagram </h1>
        <InstagramVideo />
        <Link to={"https://www.instagram.com/priyanshsoniii/"} target="_blank">
          <Button>Follow now</Button>
        </Link>
      </div>
      <div className="fixed bottom-0">
        <DockD />
      </div>
    </div>
  );
}
