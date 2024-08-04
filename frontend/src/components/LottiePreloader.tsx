import Lottie from "lottie-react";
import animationData from "../../preloader.json";

export default function LottiePreloader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-black">
      <div className="absolute inset-0 bg-zinc-400 opacity-40"></div>

      <div className="w-[20vw] h-[20vh] mt-8 scale-125 flex items-center justify-center">
        <Lottie animationData={animationData} loop />
      </div>
    </div>
  );
}
