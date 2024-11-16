import { useEffect, useState } from "react";
import BlurFade from "../components/magicui/blur-fade";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
interface Post {
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
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/car/getCars");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: { posts: Post[] } = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <ScrollToTop />
      <div className="mt-2 flex flex-col items-center justify-start">
        <BlurFade delay={0.5} blur="10px" inView>
          <div>
            <h1 className="text-4xl font-bold text-gray-100">Car Management</h1>
            <p className="text-lg text-gray-300">
              Welcome to the Car Management System
              <Link to="/allCars">
                <Button>Manage all your car</Button>
              </Link>
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
