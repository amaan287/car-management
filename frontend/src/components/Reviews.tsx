import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import BlurFade from "./magicui/blur-fade";
const reviews = [
  {
    name: "Shivangi Chaudhary",
    username: "@shivangi.chaudharyy__",
    body: "You are a star⭐",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jugal Thakrey",
    username: "@jugalThakrey",
    body: "One thing we really appreciate was your attention to detail",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Mahoj Sinha",
    username: "@cartoonistmanojsinha",
    body: "Your videos are soo innovative and artistic",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "Jaipurinfocus",
    username: "@jaipurinfocus",
    body: "I started doodling after watching your videos.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Shagun chauhan",
    username: "@_shagunchauhan",
    body: "I have never seen something this creative. Thankyou for this masterpiece, I'm healed.",
    img: "https://avatar.vercel.sh/jane",
  },

  {
    name: "Jugal",
    username: "@jugal8100",
    body: "Made the 50th anniversary more special....",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "Hanshul Varyani",
    username: "@hanshul_varyani",
    body: `Baat baat pe crazy paintings bana deta hai "Priyansh Soni" tho nahi.`,
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Reviews() {
  return (
    <div className="relative flex h-[500px] w-[100vw] flex-col items-center justify-center overflow-hidden rounded-xl border bg-background md:shadow-2xl">
      <BlurFade delay={0.7} blur="10px" inView>
        <h1 className="md:text-4xl text-2xl font-bold mb-4 mx-auto">
          Reviews and comments
        </h1>
      </BlurFade>
      <BlurFade delay={0.5} blur="10px" inView>
        <div>
          <Marquee pauseOnHover className="[--duration:20s]" key={""}>
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>
      </BlurFade>
      <Marquee reverse pauseOnHover className="[--duration:20s]" key={""}>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
