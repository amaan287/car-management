import { useEffect } from "react";
import BlurFade from "../components/magicui/blur-fade";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function Home() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }

  return (
    <div>
      <ScrollToTop />
      <div className="mt-2 flex flex-col items-center justify-center  h-screen">
        <BlurFade delay={0.5} blur="10px" inView>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-100">Car Management</h1>
            <p className="text-lg text-gray-300">
              Welcome to the Car Management System
            </p>
            <Link to="/allCars">
              <Button className="bg-white text-gray-800 hover:bg-gray-200 hover:text-600">
                Manage all your car
              </Button>
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
