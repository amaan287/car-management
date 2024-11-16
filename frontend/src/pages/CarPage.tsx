import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { Link, useParams } from "react-router-dom";

interface Cars {
  _id: string;
  slug: string;
  title: string;
  description: string;
  tags: { car_type: string; company: string; status: string };
  specifications: { year: number; fuelType: string; transmission: string };
  images: Array<{ url: string; alt: string }>;
  createdAt: string;
}

export default function carPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Cars | null>(null);

  const fetchCar = async () => {
    try {
      console.log("Car slug:", slug); // Debug slug
      setLoading(true);
      const res = await fetch(`/api/car/getCars?slug=${slug}`);
      if (!res.ok) throw new Error("Failed to fetch car data");
      const data = await res.json();
      setCars(data.cars[0]);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="px-3 pt-3 pb-[8rem] flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {cars?.title}
      </h1>
      <Link
        to={cars?.images?.[0]?.url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="w-full flex pt-10 justify-center">
          {cars?.images?.length ? (
            cars.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt || "Car Image"}
                className="p-3 h-[60%] w-[60%] md:h-[40%] md:w-[40%] rounded-xl object-cover"
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      </Link>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{cars && new Date(cars.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {cars && (cars.description.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full car-content"
        dangerouslySetInnerHTML={{ __html: cars ? cars.description : "" }}
      ></div>
    </main>
  );
}
