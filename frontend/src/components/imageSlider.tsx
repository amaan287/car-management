import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

interface Post {
  _id: string;
  slug: string;
  image: string;
  title: string;
  category: string;
  content: string;
  createdAt: Date;
}

interface ImageSliderProps {
  posts: Post[];
}

export function ImageSlider({ posts }: ImageSliderProps) {
  const cards = posts.map((post, index) => {
    const cardData = {
      src: post.image,
      title: post.title,
      category: post.category,
      content: (
        <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
          <img
            src={post.image}
            alt=""
            className="w-[40%] h-[40%] mx-auto rounded-xl object-cover mb-4"
          />
          <p
            className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          ></p>
        </div>
      ),
    };

    return <Card key={post._id} card={cardData} index={index} />;
  });

  return (
    <div className="w-full h-full py-20">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Get to know Art.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}
