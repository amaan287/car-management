// import { OrbitingCirclesComp } from "@/components/OrbitingCircles";
import { Reviews } from "@/components/Reviews";
import { ImageSlider } from "@/components/imageSlider";
import FirstCard from "@/components/FirstCard";
import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";

interface Post {
  _id: string;
  slug: string;
  image: string;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/post/getPosts");
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

  if (isLoading) {
    return (
      <div className="w-[100vw] h-[100vh] flex items-center justify-center text-white">
        loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div>
      <div className="mt-2 flex flex-col items-center justify-start">
        <BlurFade delay={0.5} blur="10px" inView>
          <FirstCard />
        </BlurFade>
      </div>
      {/* <div className="my-10 flex flex-col items-center justify-center">
        <OrbitingCirclesComp />
        </div> */}

      <ImageSlider posts={posts} />

      <BlurFade delay={0.3} blur="10px" inView>
        <div className="flex flex-col items-center justify-center">
          <Reviews />
        </div>
      </BlurFade>
    </div>
  );
}
