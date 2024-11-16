import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import BlurFade from "../components/magicui/blur-fade";
import { Input } from "../components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import CarCard from "../components/CarCard";

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
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const carsPerPage = 10;

  const fetchCars = async () => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: carsPerPage.toString(),
        ...(searchTerm && { searchTerm }),
        ...(selectedCategory && { car_type: selectedCategory }),
      });

      const res = await fetch(`/api/car/getCars?${queryParams}`);
      if (!res.ok) {
        throw new Error("Failed to fetch cars");
      }
      const data = await res.json();
      setCars(data.cars);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

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
      <div className="mt-5 h-full pb-2">
        <div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 justify-end lg:justify-between w-full lg:items-center">
          <div className="flex gap-2 w-full items-center justify-end lg:justify-start">
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
        <Button
          className="bg-background dark:hover:bg-card dark:text-white border text-sm h-full"
          onClick={fetchCars}
        >
          <CiSearch />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <label className="font-semibold">Filter:</label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Car Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Car Type</SelectLabel>

              <SelectItem value="All">all</SelectItem>
              <SelectItem value="Sedan">Sedan</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Hatchback">Hatchback</SelectItem>
              <SelectItem value="Coupe">Coupe</SelectItem>
              <SelectItem value="Truck">Truck</SelectItem>
              <SelectItem value="Wagon">Van</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {/* {cars.length === 0 ? (
      <div className="text-center p-4">No cars available.</div>
      ) : (
        <> */}
      {/* Featured Car */}
      {
        <div className="px-10 bg-secondary py-5 flex items-center border m-4 lg:h-[600px] dark:bg-card shadow-2xl rounded-2xl">
          <div className="flex flex-col lg:flex-row w-full items-center">
            <Link to={`/car/${cars[0].slug}`}>
              <img
                src={cars[0].images[0].url}
                alt={cars[0].title}
                className="lg:w-full lg:h-full h-[70%] w-[70%] max-w-sm rounded-xl shadow-2xl mr-4"
              />
            </Link>
            <div>
              <BlurFade delay={0.5} blur="10px" inView>
                <h1 className="md:text-5xl text-xl font-bold mt-2 md:mt-0">
                  {cars[0].title}
                </h1>
              </BlurFade>
              <BlurFade delay={0.5} blur="10px" inView>
                <div className="py-3 max-w-2xl text-md mx-auto md:mx-0 w-full car-content">
                  {cars[0].description?.substring(0, 500)}...
                  <Link to={`/car/${cars[0].slug}`} className="text-blue-500">
                    read more
                  </Link>
                </div>
              </BlurFade>
              <BlurFade delay={0.7} blur="10px" inView>
                {Date.now() - new Date(cars[0].createdAt).getTime() <
                  1000 * 60 * 60 * 24 * 7 && (
                  <p className="text-sm px-1 rounded-xl dark:text-gray-800 bg-yellow-300 w-fit mb-2">
                    NEW
                  </p>
                )}
                <Link to={`/car/${cars[0].slug}`}>
                  <Button className="text-white bg-card hover:bg-card border-gray-900 dark:bg-secondary dark:text-gray-900 shadow-gray-500 hover:-translate-y-0.5 cursor-pointer transition-all mt-2">
                    Read more
                  </Button>
                </Link>
              </BlurFade>
            </div>
          </div>
        </div>
      }
      {/* Car Grid */}
      {
        <div className="my-10 grid w-fit mx-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4">
          {cars.slice(1).map((car) => (
            <CarCard key={car._id} Car={car} />
          ))}
        </div>
      }
      {/* Pagination */}
      <div className="flex justify-center mt-5 gap-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
