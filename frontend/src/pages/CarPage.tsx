import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import SafeHTMLContent from "../components/Safehtml";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

// Interfaces
interface Cars {
  _id: string;
  slug: string;
  title: string;
  description: string;
  tags: {
    car_type: string;
    company: string;
    status: string;
  };
  specifications: {
    year: number;
    fuelType: string;
    transmission: string;
  };
  images: Array<{
    url: string;
    alt: string;
  }>;
  createdAt: string;
}

interface CarouselProps {
  images: Array<{
    url: string;
    alt: string;
  }>;
}

// Carousel Component
const CustomCarousel = ({ images }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(goToNext, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <div
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-500"
          style={{ opacity: 1 }}
        >
          <Link
            to={images[currentIndex].url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt || `Car Image ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.preventDefault();
            goToPrevious();
          }}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            goToNext();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1}/{images.length}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                goToSlide(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Main CarPage Component
export default function CarPage(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cars, setCars] = useState<Cars | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { currentUser } = useSelector((state: RootState) => state.user);

  const fetchCar = async () => {
    try {
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

  const handleDelete = async () => {
    if (!cars?._id || !currentUser?._id) return;

    try {
      setDeleteLoading(true);
      const res = await fetch(
        `/api/car/deleteCar/${cars._id}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete car");
      }

      navigate("/"); // Redirect to home page after successful deletion
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setDeleteLoading(false);
      setShowDeleteDialog(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <main className="px-4 py-6 max-w-6xl mx-auto min-h-screen">
      <Card className="bg-black shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-6">
          <h1 className="text-3xl font-serif text-center mb-8 lg:text-4xl text-white">
            {cars?.title}
          </h1>

          {/* Custom Image Carousel */}
          {cars?.images?.length ? (
            <div className="mb-8">
              <CustomCarousel images={cars.images} />
            </div>
          ) : (
            <p className="text-center text-gray-500 mb-8">
              No images available
            </p>
          )}

          <div className="space-y-6">
            {/* Tags Section */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                {cars?.tags.car_type}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {cars?.tags.company}
              </Badge>
              <Badge variant="default" className="text-sm">
                {cars?.tags.status}
              </Badge>
            </div>

            {/* Specifications Section */}
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm">
                Year: {cars?.specifications.year}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Fuel: {cars?.specifications.fuelType}
              </Badge>
              <Badge variant="outline" className="text-sm">
                {cars?.specifications.transmission}
              </Badge>
            </div>

            {/* Meta Information */}
            <div className="flex justify-between text-sm text-gray-400 border-t border-gray-700 pt-4">
              <span>
                {cars && new Date(cars.createdAt).toLocaleDateString()}
              </span>
              <span className="italic">
                {cars && (cars.description.length / 1000).toFixed(0)} mins read
              </span>
            </div>

            {/* Description */}
            <div className="prose max-w-none text-gray-300">
              <SafeHTMLContent
                content={cars?.description ?? ""}
                className="leading-relaxed"
                truncate={true}
                maxLength={200}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 w-full flex gap-2">
              <Link to={`/update-Car/${cars?._id}`}>
                <Button className="w-full bg-white text-gray-800 mx-auto sm:w-auto hover:bg-gray-100">
                  Update Car Details
                </Button>
              </Link>
              <Button
                className="w-full bg-red-500 text-white mx-auto sm:w-auto hover:bg-red-600"
                onClick={() => setShowDeleteDialog(true)}
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              car listing and remove the data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              {deleteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
