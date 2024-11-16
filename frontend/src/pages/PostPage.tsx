import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
interface Post {
  _id: string;
  title: string;
  category: string;
  image: string;
  content: string;
  createdAt: Date;
  slug: string;
}

export default function PostPage(): JSX.Element {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string | null>(null);
  const filteredPosts = posts.filter((p) => p._id !== post?._id);
  const postsToDisplay = filteredPosts.slice(0, 4);
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
        setLoading(true);
        const res = await fetch("/api/post/getPosts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data: { posts: Post[] } = await res.json();
        setPosts(data.posts);
      } catch (err) {
        setErrors(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);
  console.log(error);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  const truncateContent = (content: string, maxLength: number) => {
    const stripped = content.replace(/<[^>]+>/g, "");
    if (stripped.length <= maxLength) return stripped;
    return (
      stripped.substring(0, stripped.lastIndexOf(" ", maxLength)) + "  ...."
      // +
      // "read more"
    );
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors) {
    return <div>Error: {error}</div>;
  }

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }
  return (
    <main className="px-3 pt-3 pb-[8rem] flex flex-col max-w-6xl mx-auto min-h-screen">
      <ScrollToTop />
      <TracingBeam className="px-6">
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
          {post && post.title}
        </h1>
        <div className="w-fit mx-auto">
          <Link
            to={`/search?category=${post && post.category}`}
            className="self-center mt-5  "
          >
            <div className="badge rounded-full text-text bg-background">
              {post && post.category}
            </div>
          </Link>
        </div>
        <Link to={post?.image ?? ""} target="_blank" rel="noopener noreferrer">
          <div className="w-full flex pt-10  justify-center  ">
            <img
              src={post?.image ?? ""}
              alt={post?.title ?? ""}
              className="p-3 h-[60%] w-[60%] md:h-[40%] md:w-[40%] rounded-xl  object-cover"
            />
          </div>
        </Link>
        <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">
            {post && (post.content.length / 1000).toFixed(0)} mins read
          </span>
        </div>
        <div
          className="p-3 max-w-2xl mx-auto w-full post-content"
          dangerouslySetInnerHTML={{ __html: post ? post.content : "" }}
        ></div>
        <div className="max-w-4xl mx-auto w-full"></div>

        <div className="flex items-center justify-center">
          <h1 className="mx-auto ">
            Tap or hover on cards to read description
          </h1>
        </div>
        <div className="h-full w-fit relative mt-5 grid sm:grid-cols-2 grid-cols-1 mx-auto">
          {posts &&
            postsToDisplay.map((post) => (
              <div className="p-2 col-span-1">
                <DirectionAwareHover imageUrl={post.image} post={post}>
                  <p className="font-bold text-xl">{post.title}</p>
                  <p className="font-normal text-sm">
                    {truncateContent(post.content, 200)}
                  </p>
                </DirectionAwareHover>
              </div>
            ))}
        </div>
        <div className="mx-auto w-fit">
          <Link to={"/all-posts"}>view all</Link>
        </div>
      </TracingBeam>
    </main>
  );
}
