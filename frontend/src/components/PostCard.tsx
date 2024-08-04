import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import BlurFade from "./magicui/blur-fade";

interface PostCardProps {
  post: {
    slug: string;
    image: string;
    title: string;
    category: string;
    content: string;
    createdAt: Date;
  };
}
export default function PostCard({ post }: PostCardProps) {
  const truncateContent = (content: string, maxLength: number) => {
    const stripped = content.replace(/<[^>]+>/g, "");
    if (stripped.length <= maxLength) return stripped;
    return (
      stripped.substr(0, stripped.lastIndexOf(" ", maxLength)) + "  ...."
      // +
      // "read more"
    );
  };

  return (
    <BlurFade delay={0.25} blur="10px" inView>
      <div className=" dark:bg-card bg-slate-gray-100 group py-2 relative w-full border  h-[600px] overflow-hidden rounded-2xl sm:w-[430px] transition-all shadow-xl px-5">
        <BlurFade delay={0.35} blur="10px" inView>
          <Link to={`/post/${post.slug}`}>
            <img
              src={post.image}
              alt="post cover"
              className="md:h-[520px] md:w-[400px] h-[400px] mx-auto rounded-xl object-cover group-hover:h-[350px] transition-all duration-300 z-20"
            />
          </Link>
        </BlurFade>

        <div className="py-3 flex flex-col gap-2">
          <BlurFade delay={0.35} blur="10px" inView>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold line-clamp-2">{post.title}</p>

              <p className="italic w-fit bg-background dark:bg-gray-950  text-text border rounded-xl text-xs self-center px-2 pb-1">
                {post.category}
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={0.35} blur="10px" inView>
            <div className="px-2 text-sm md:mt-10 mt-2   text-balance text-center">
              {truncateContent(post.content, 200)}
            </div>{" "}
          </BlurFade>
          <BlurFade delay={0.35} blur="10px" inView>
            <Link
              to={`/post/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              <Button className="w-full hover:-translate-y-0.5 cursor-pointer transition-all text-white bg-card hover:bg-card border-gray-900 mb-2 md:mb-0 dark:bg-secondary dark:text-gray-900 mt-2">
                Read more
              </Button>
            </Link>
          </BlurFade>
        </div>
      </div>
    </BlurFade>
  );
}
