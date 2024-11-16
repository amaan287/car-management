import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import BlurFade from "../components/magicui/blur-fade";
import { Input } from "../components/ui/input";
import CarCard from "../components/CarCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import SafeHTMLContent from "../components/Safehtml";

interface Car {
  _id: string;
  slug: string;
  title?: string;
  description?: string;
  tags?: {
    car_type?: string;
    company?: string;
    status?: string;
  };
  specifications?: {
    year?: number;
    fuelType?: string;
    transmission?: string;
  };
  images: Array<{ url: string; alt: string }>;
  createdAt: Date;
}

export default function AllCars() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/car/getCars?userId=${currentUser?._id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await res.json();
      setCars(data.cars);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const filteredCars = cars.filter(
    (car) =>
      car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filteredCars.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="">No cars </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-4">Error: {error}</div>;
  }

  return (
    <div>
      <div className="mt-5 h-full pb-2 min-h-screen ">
        <div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 justify-end lg:justify-between w-full lg:items-center">
          <div className="flex gap-2 w-full items-center justify-end lg:justify-center">
            <label className="text-sm font-semibold lg:hidden">Search:</label>
            <Input
              type="text"
              placeholder="Search cars..."
              className="px-3 py-1 w-[90vw] lg:w-[60vw]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      {filteredCars.length > 0 && (
        <div className="px-10 bg-secondary py-5 flex items-center border m-4 lg:h-[600px] dark:bg-card shadow-2xl rounded-2xl">
          <div className="flex flex-col lg:flex-row w-full items-center">
            <Link to={`/car/${filteredCars[0].slug}`}>
              <img
                src={filteredCars[0].images[0].url}
                alt={filteredCars[0].title}
                className="lg:w-full lg:h-full h-[70%] w-[70%] max-w-sm rounded-xl shadow-2xl mr-4"
              />
            </Link>
            <div>
              <BlurFade delay={0.5} blur="10px" inView>
                <h1 className="md:text-5xl text-xl font-bold mt-2 md:mt-0">
                  {filteredCars[0].title}
                </h1>
              </BlurFade>
              <BlurFade delay={0.5} blur="10px" inView>
                <div>
                  <SafeHTMLContent
                    content={filteredCars[0].description}
                    className="py-3 max-w-2xl text-md mx-auto md:mx-0 w-full car-content"
                    truncate={true}
                    maxLength={200}
                  />
                  <Link
                    to={`/car/${filteredCars[0].slug}`}
                    className="text-blue-500"
                  >
                    read more
                  </Link>
                </div>
              </BlurFade>
              <BlurFade delay={0.7} blur="10px" inView>
                {Date.now() - new Date(filteredCars[0].createdAt).getTime() <
                  1000 * 60 * 60 * 24 * 7 && (
                  <p className="text-sm px-1 rounded-xl dark:text-gray-800 bg-yellow-300 w-fit mb-2">
                    NEW
                  </p>
                )}
                <Link to={`/car/${filteredCars[0].slug}`}>
                  <Button className="text-white bg-card hover:bg-card border-gray-900 dark:bg-secondary dark:text-gray-900 shadow-gray-500 hover:-translate-y-0.5 cursor-pointer transition-all mt-2">
                    Read more
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>
      )}

      <div className="my-10 grid w-fit mx-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4">
        {filteredCars.slice(1).map((car) => (
          <CarCard key={car._id} Car={car} />
        ))}
      </div>
    </div>
  );
}
