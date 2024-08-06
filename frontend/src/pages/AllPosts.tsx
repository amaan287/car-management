import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BlurFade from "@/components/magicui/blur-fade";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(" ");

  const postsPerPage = 10;

  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `/api/post/getPosts?page=${currentPage}&limit=${postsPerPage}&searchTerm=${searchTerm}&category=${selectedCategory}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data: { posts: Post[]; totalPosts: number } = await res.json();
      setPosts(data.posts);
      setTotalPages(Math.ceil(data.totalPosts / postsPerPage));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);
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
    return (
      <div>
        <div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 justify-end lg:justify-between  w-[100vw] lg:items-center ">
          <div className="flex gap-2 w-full  items-center justify-end lg:justify-start">
            <label className="text-sm font-semibold lg:hidden">search:</label>
            <Input
              type="text"
              placeholder="search"
              className="px-3 py-1 w-[90vw] lg:w-[60vw] "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="bg-background dark:hover:bg-card dark:text-white border text-sm  h-full "
              onClick={() => fetchPosts()}
            >
              <CiSearch />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold flex">Filter:</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" className="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="">Category</SelectLabel>
                  <SelectItem className="" value=" ">
                    all
                  </SelectItem>
                  <SelectItem className="" value="uncategorized">
                    Uncategorized
                  </SelectItem>
                  <SelectItem className="" value="plein air">
                    Plein air
                  </SelectItem>
                  <SelectItem className="" value="pencil sketch">
                    Pencil Sketch
                  </SelectItem>
                  <SelectItem className="" value="pencil portrait">
                    Pencil Portrait
                  </SelectItem>
                  <SelectItem className="" value="acrylic portrait">
                    Acrylic Portrait
                  </SelectItem>
                  <SelectItem className="" value="landscape">
                    Landscape
                  </SelectItem>
                  <SelectItem className="" value="commission art">
                    commission
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        No posts available.
      </div>
    );
  }
  const isNew =
    Date.now() - new Date(posts[0].createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div className=" mt-5 h-full pb-2 ">
      <ScrollToTop />
      <div className="flex lg:flex-row flex-col gap-2 lg:gap-5 px-10 justify-end lg:justify-between  w-[100vw] lg:items-center ">
        <div className="flex gap-2 w-full  items-center justify-end lg:justify-start">
          <label className="text-sm font-semibold lg:hidden">search:</label>
          <Input
            type="text"
            placeholder="search"
            className="px-3 py-1 w-[90vw] lg:w-[60vw] "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            className="bg-background dark:hover:bg-card dark:text-white border text-sm  h-full "
            onClick={() => fetchPosts()}
          >
            <CiSearch />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold flex">Filter:</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Category" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="">Category</SelectLabel>
                <SelectItem className="" value=" ">
                  all
                </SelectItem>
                <SelectItem className="" value="uncategorized">
                  Uncategorized
                </SelectItem>
                <SelectItem className="" value="plein air">
                  Plein air
                </SelectItem>
                <SelectItem className="" value="pencil sketch">
                  Pencil Sketch
                </SelectItem>
                <SelectItem className="" value="pencil portrait">
                  Pencil Portrait
                </SelectItem>
                <SelectItem className="" value="acrylic portrait">
                  Acrylic Portrait
                </SelectItem>
                <SelectItem className="" value="landscape">
                  Landscape
                </SelectItem>
                <SelectItem className="" value="commission art">
                  commission
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="px-10 bg-secondary  py-5 flex items-center border m-4 lg:h-[600px] dark:bg-card  shadow-2xl rounded-2xl pb-4">
        <div className="flex flex-col lg:flex-row w-full items-center">
          <Link to={`/post/${posts[0].slug}`}>
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="lg:w-full lg:h-full h-[70%] w-[70%] max-w-sm rounded-xl shadow-2xl  mr-4"
            />{" "}
          </Link>
          <div>
            <BlurFade delay={0.5} blur="10px" inView>
              <h1 className="md:text-5xl text-xl font-bold mt-2 md:mt-0">
                {posts[0].title}
              </h1>
            </BlurFade>
            <BlurFade delay={0.5} blur="10px" inView>
              <div
                className="py-3 max-w-2xl text-md mx-auto md:mx-0 w-full post-content"
                dangerouslySetInnerHTML={{
                  __html: posts[0].content.substring(0, 500) + "...read more",
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
                <Button className=" text-white bg-card hover:bg-card border-gray-900 dark:bg-secondary  dark:text-gray-900  shadow-gray-500 hover:-translate-y-0.5 cursor-pointer transition-all mt-2">
                  Read more
                </Button>
              </Link>
            </BlurFade>
          </div>
        </div>
      </div>
      <div className="my-10 grid w-fit mx-auto grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 px-4">
        {posts.slice(1).map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="mx-4">
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

export default AllPosts;
