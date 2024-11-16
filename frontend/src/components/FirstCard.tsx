import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import BlurFade from "./magicui/blur-fade";

export default function FirstCard() {
  return (
    <div className="relative h-screen w-full overflow-hidden rounded-lg shadow-xl ">
      <div className="absolute inset-0 blur-sm  shadow-inner shadow-black bg-[url('../../images/bg-1.jpg')] bg-cover bg-center ">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-gray-gray-100 to-transparent z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20"></div>
      </div>

      <div className="relative h-full w-full z-30 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="h-full w-full flex  md:flex-col  justify-center">
          <div className="flex flex-col-reverse lg:flex-row items-center w-[90vw] h-[100vh] lg:items-center justify-center  space-y-6 lg:space-y-0 lg:space-x-8">
            <div className="w-full lg:w-2/3 space-y-4 lg:pt-12">
              <BlurFade delay={3.5} blur="10px" inView>
                <h1 className="text-white text-xl sm:text-2xl md:text-3xl mt-2 lg:text-4xl font-semibold max-w-xs lg:text-left [text-wrap:balance] font-sans mx-auto lg:mx-0  text-center">
                  Welcome to Priyansh Soni's Art Gallery
                </h1>{" "}
              </BlurFade>
              <BlurFade delay={3.75} blur="10px" inView>
                <p className="text-white bg-opacity-40 bg-black py-2 rounded-lg text-sm sm:text-base md:text-lg font-medium font-sans text-left">
                  Explore the diverse and captivating artworks of Priyansh Soni,
                  a talented artist skilled in{" "}
                  <span className="text-sky-200 font-bold italic">
                    plein air
                  </span>{" "}
                  painting,{" "}
                  <span className="text-sky-200 font-bold italic">
                    pencil portraits
                  </span>
                  ,{" "}
                  <span className="text-sky-200 font-bold italic">
                    acrylic portraits
                  </span>
                  ,{" "}
                  <span className="text-sky-200 font-bold italic">
                    pencil sketches
                  </span>
                  , and{" "}
                  <span className="text-sky-200 font-bold italic">
                    landscapes
                  </span>
                  . Each piece reflects his dedication and passion, bringing
                  subjects to life with emotion and detail.
                </p>
              </BlurFade>
              <BlurFade delay={3.75} blur="10px" inView>
                <Link to={"/"} className="mt-2 inline-block">
                  <Button className=" border hover:border-none shadow-xl text-gray-700 bg-gradient-to-r from-yellow-50 to-orange-50 hover:shadow-md hover:shadow-yellow-50 hover:bg-yellow-50 transition-all font-medium   ">
                    Browse collections
                  </Button>
                </Link>
              </BlurFade>
            </div>

            <div className=" "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
