import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "../components/ui/direction-aware-hover";

interface Post {
  _id: string;
  slug: string;
  image: string;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
}

function AllPosts() {
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
      <div className="w-[100vw] h-[100vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }
  const isNew =
    Date.now() - new Date(posts[0].createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div className=" mt-5 ">
      <div className="px-10 bg-secondary  py-5 flex items-center border m-4 lg:h-[600px] dark:bg-card  shadow-2xl rounded-2xl pb-4">
        <div className="flex flex-col lg:flex-row w-full  ">
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="w-full h-full max-w-sm rounded-xl shadow-2xl  mr-4"
          />
          <div>
            <h1 className="text-5xl font-bold">{posts[0].title}</h1>
            <div
              className="py-3 max-w-2xl mx-auto w-full post-content"
              dangerouslySetInnerHTML={{
                __html: posts[0].content,
              }}
            ></div>
            {isNew && (
              <p className="text-sm px-1 rounded-xl dark:text-gray-800 bg-yellow-300 w-fit mb-2">
                NEW
              </p>
            )}
            <Link to={`/post/${posts[0].slug}`}>
              <Button className=" text-white bg-card  shadow-gray-500 hover:-translate-y-0.5 cursor-pointer transition-all">
                Check it out
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="my-10 grid  w-fit mx-auto  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-4  ">
        {posts.slice(1).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      <div className="h-[40rem] relative  flex items-center justify-center">
        {posts.slice(1).map((post) => (
          <DirectionAwareHover key={post._id} post={post} imageUrl={post.image}>
            <p className="font-bold text-xl">In the mountains</p>
            <p className="font-normal text-sm">$1299 / night</p>
          </DirectionAwareHover>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
