import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
export default function InstagramVideo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div>
      <div className="">
        <blockquote
          data-instgrm-permalink="https://www.instagram.com/reel/C-C85d5PwbI/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          className="instagram-media bg-gray-700 border-0 rounded-md shadow-sm max-w-[540px] min-w-[326px] p-0 w-[100%]"
        >
          <div className="p-4">
            <a
              href="https://www.instagram.com/reel/C-C85d5PwbI/?utm_source=ig_embed&amp;utm_campaign=loading"
              className="bg-black leading-none p-0 text-center no-underline w-full"
              target="_blank"
            >
              <div className="flex flex-row items-center">
                <div className="bg-gray-100 rounded-full flex-grow-0 h-10 mr-3.5 w-10"></div>
                <div className="flex flex-col flex-grow justify-center">
                  <div className="bg-gray-100 rounded-full h-3.5 mb-1.5 w-24"></div>
                  <div className="bg-gray-100 rounded-full h-3.5 w-16"></div>
                </div>
              </div>
              <div className="py-[19%]"></div>
              <div className="block h-[50px] mx-auto mb-3 w-[50px]"></div>
              <div className="pt-2">
                <div className="text-[#3897f0] font-sans text-lg font-bold">
                  View this post on Instagram
                </div>
              </div>
              <div className="py-[12.5%]"></div>
              <div className="flex flex-row mb-3.5 items-center">
                <div>
                  <div className="bg-gray-100 rounded-full h-3 w-3 translate-y-2.5"></div>
                  <div className="bg-gray-100 h-3 -rotate-45 translate-x-[3px] translate-y-[1px] w-3 flex-grow-0 mr-3.5 ml-0.5"></div>
                  <div className="bg-gray-100 rounded-full h-3 w-3 translate-x-2 -translate-y-4.5"></div>
                </div>
                <div className="ml-2">
                  <div className="bg-gray-100 rounded-full flex-grow-0 h-5 w-5"></div>
                  <div className="w-0 h-0 border-t-2 border-t-transparent border-l-[6px] border-l-gray-100 border-b-2 border-b-transparent transform translate-x-4 -translate-y-1 rotate-30"></div>
                </div>
                <div className="ml-auto">
                  <div className="w-0 border-t-8 border-t-gray-100 border-r-8 border-r-transparent transform translate-y-4"></div>
                  <div className="bg-gray-100 flex-grow-0 h-3 w-4 -translate-y-1"></div>
                  <div className="w-0 h-0 border-t-8 border-t-gray-100 border-l-8 border-l-transparent transform -translate-y-1 translate-x-2"></div>
                </div>
              </div>
              <div className="flex flex-col flex-grow justify-center mb-6">
                <div className="bg-gray-100 rounded flex-grow-0 h-3.5 mb-1.5 w-56"></div>
                <div className="bg-gray-100 rounded flex-grow-0 h-3.5 w-36"></div>
              </div>
            </a>
            <p className="text-gray-400 font-sans text-sm leading-[17px] mb-0 mt-2 overflow-hidden py-2 text-center truncate whitespace-nowrap">
              <a
                href="https://www.instagram.com/reel/C-C85d5PwbI/?utm_source=ig_embed&amp;utm_campaign=loading"
                className="text-gray-400 font-sans text-sm font-normal leading-[17px] no-underline"
                target="_blank"
              >
                A post shared by Priyansh soni 🎨 | Artist (@priyanshsoniii)
              </a>
            </p>
          </div>
        </blockquote>
      </div>
    </div>
  );
}
