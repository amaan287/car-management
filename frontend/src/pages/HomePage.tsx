import { Link } from "react-router-dom";

import { OrbitingCirclesComp } from "@/components/OrbitingCircles";
import { Reviews } from "@/components/Reviews";

export default function Home() {
  return (
    <div>
      <div className="my-10 flex flex-col items-center justify-center">
        <OrbitingCirclesComp />
      </div>
      <div className="flex flex-col items-center justify-center">
        <Reviews />
      </div>
      <Link
        to={"/all-posts"}
        className="text-lg text-teal-500 hover:underline text-center"
      >
        View all posts
      </Link>
    </div>
  );
}
