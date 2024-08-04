import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
    <div className=" mt-5 h-full pb-2 ">
      <div className="px-10 bg-secondary  py-5 flex items-center border m-4 lg:h-[600px] dark:bg-card  shadow-2xl rounded-2xl pb-4">
        <div className="flex flex-col lg:flex-row w-full items-center">
          <img
            src={posts[0].image}
            alt={posts[0].title}
            className="lg:w-full lg:h-full h-[70%] w-[70%] max-w-sm rounded-xl shadow-2xl  mr-4"
          />{" "}
          <div>
            <BlurFade delay={0.5} blur="10px" inView>
              <h1 className="md:text-5xl text-xl font-bold mt-2 md:mt-0">
                {posts[0].title}
              </h1>
            </BlurFade>
            <BlurFade delay={0.5} blur="10px" inView>
              <div
                className="py-3 max-w-2xl text-md mx-auto w-full post-content"
                dangerouslySetInnerHTML={{
                  __html: posts[0].content.substring(0, 995) + "...read more",
                }}
              ></div>
            </BlurFade>
            <BlurFade delay={0.7} blur="10px" inView>
              {isNew && (
                <p className="text-sm px-1 rounded-xl dark:text-gray-800 bg-yellow-300 w-fit mb-2">
                  NEW
                </p>
              )}
              <Link to={`/post/${posts[0].slug}`}>
                <Button className=" text-white bg-card hover:bg-card border-gray-900 dark:bg-secondary dark:text-gray-900  shadow-gray-500 hover:-translate-y-0.5 cursor-pointer transition-all mt-2">
                  Read more
                </Button>
              </Link>
            </BlurFade>
          </div>
        </div>
      </div>
      <div className="my-10 grid  w-fit mx-auto  grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 px-4  ">
        {posts.slice(1).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default AllPosts;
