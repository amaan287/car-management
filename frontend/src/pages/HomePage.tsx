// import { OrbitingCirclesComp } from "@/components/OrbitingCircles";
import { Reviews } from "@/components/Reviews";
import { ImageSlider } from "@/components/imageSlider";
import FirstCard from "@/components/FirstCard";
import { useEffect, useState } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import CustomPreloader from "@/components/CustomPreloader";
import { useLocation } from "react-router-dom";

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
      <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-black text-white"></div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }
  const pleinAirPosts = posts.filter((post) => post.category === "plein air");
  const pencilPortraitPosts = posts.filter(
    (post) => post.category == "pencil portrait"
  );
  const pencilSketchPosts = posts.filter(
    (post) => post.category === "pencil sketch"
  );
  const commissionWorkPosts = posts.filter(
    (post) => post.category === "commission art"
  );
  const acrylicPortraitPosts = posts.filter(
    (post) => post.category === "acrylic portrait"
  );
  const LandscapePosts = posts.filter((post) => post.category === "landscape");
  return (
    <div>
      <ScrollToTop />
      <CustomPreloader />
      <div className="mt-2 flex flex-col items-center justify-start">
        <BlurFade delay={0.5} blur="10px" inView>
          <FirstCard />
        </BlurFade>
      </div>
      {/* <div className="my-10 flex flex-col items-center justify-center">
        <OrbitingCirclesComp />
        </div> */}

      {pleinAirPosts.length > 0 ? (
        <ImageSlider
          posts={pleinAirPosts}
          category="plein air"
          heading=" Discover Artistic Wonders"
        />
      ) : (
        <div></div>
      )}

      {LandscapePosts.length > 0 ? (
        <ImageSlider posts={LandscapePosts} category="landscape" heading="" />
      ) : (
        <div></div>
      )}
      {pencilPortraitPosts.length > 0 ? (
        <ImageSlider
          posts={pencilPortraitPosts}
          category="pencil portrait"
          heading=""
        />
      ) : (
        <div></div>
      )}

      {pencilSketchPosts.length > 0 ? (
        <ImageSlider
          posts={pencilSketchPosts}
          category="pencil sketch"
          heading=""
        />
      ) : (
        <div></div>
      )}
      {acrylicPortraitPosts.length > 0 ? (
        <ImageSlider
          posts={acrylicPortraitPosts}
          category="acrylic portrait"
          heading=""
        />
      ) : (
        <div></div>
      )}
      {commissionWorkPosts.length > 0 ? (
        <ImageSlider
          posts={commissionWorkPosts}
          category="commission art"
          heading=""
        />
      ) : (
        <div></div>
      )}

      <BlurFade delay={0.3} blur="10px" inView>
        <div className="flex flex-col items-center justify-center">
          <Reviews />
        </div>
      </BlurFade>
    </div>
  );
}
