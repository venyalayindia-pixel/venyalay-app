import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Heart,
  Microscope,
  Sprout,
} from "lucide-react";

const stories = {
  "natures-engineers": {
    title: "Nature’s Engineers",
    question: "How do bees build with such precision?",
    image: "/assets/bee-and-me/stories/natures-engineers.png",
    introduction:
      "Honeybees build one of nature’s most efficient structures: the hexagonal honeycomb. Every cell is arranged to store more honey while using less wax.",
    science:
      "The hexagonal pattern allows neighbouring cells to share walls. This reduces the amount of building material required while creating a strong, stable structure. The design distributes pressure efficiently and leaves almost no wasted space.",
    wow:
      "Long before humans studied structural engineering, bees were already building lightweight, space-efficient and highly organized architecture.",
    lesson:
      "Nature often solves complex problems through simple, repeatable patterns.",
  },
  "inside-a-flower": {
    title: "Inside a Flower",
    question: "What does a flower look like to a bee?",
    image: "/assets/bee-and-me/stories/inside-a-flower.png",
    introduction:
      "To a honeybee, a flower is not simply colourful. It is a complex landscape filled with visual patterns, scent signals and nectar guides.",
    science:
      "Many flowers reflect ultraviolet light in patterns that human eyes cannot see. These markings act like landing guides, directing bees toward pollen and nectar.",
    wow:
      "A flower that looks plain to us may appear like a glowing map to a bee.",
    lesson:
      "The natural world contains signals that exist beyond ordinary human perception.",
  },
  "bee-vision": {
    title: "Bee Vision",
    question: "What can bees see that humans can’t?",
    image: "/assets/bee-and-me/stories/bee-vision.png",
    introduction:
      "Honeybees experience colour differently from humans. Their vision helps them identify flowers, navigate landscapes and return to valuable food sources.",
    science:
      "Bees can detect ultraviolet light but cannot see red in the same way humans do. Their eyes are especially sensitive to blue, green and ultraviolet wavelengths.",
    wow:
      "Many flowers display ultraviolet patterns that guide bees directly toward nectar.",
    lesson:
      "Intelligence is not only about thinking. It is also about sensing the world in the right way.",
  },
} as const;

type StorySlug = keyof typeof stories;

export default function BeeStory() {
  const { slug } = useParams<{ slug: string }>();
  const story = slug ? stories[slug as StorySlug] : undefined;

  if (!story) {
    return (
      <main className="min-h-screen bg-black px-5 py-10 text-white">
        <Link
          to="/explore/bee-and-me"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold"
        >
          <ArrowLeft size={16} />
          Back to BEE &amp; ME
        </Link>

        <div className="mt-16 text-center">
          <h1 className="font-display text-3xl font-semibold">
            Story not found
          </h1>

          <p className="mt-4 text-sm text-white/60">
            This BEE &amp; ME story is not available yet.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black pb-16 text-white fade-in">
      <div className="px-5 pt-6">
        <Link
          to="/explore/bee-and-me"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gold"
        >
          <ArrowLeft size={16} />
          BEE &amp; ME
        </Link>
      </div>

      <section className="mt-5 px-5">
        <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-2xl">
          <img
            src={story.image}
            alt={`${story.title} BEE & ME story`}
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="px-5 pt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Nature’s Intelligence. Through Curious Eyes.
        </p>

        <h1 className="mt-3 font-display text-3xl font-semibold">
          {story.title}
        </h1>

        <p className="mt-4 font-display text-xl leading-8 text-white/80">
          {story.question}
        </p>
      </section>

      <section className="mt-9 space-y-5 px-5">
        <article className="rounded-3xl border border-gold/20 bg-white/5 p-6">
          <div className="flex items-center gap-3 text-gold">
            <BookOpen size={20} />
            <h2 className="font-display text-xl font-semibold">
              Look Closer
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/70">
            {story.introduction}
          </p>
        </article>

        <article className="rounded-3xl border border-gold/20 bg-white/5 p-6">
          <div className="flex items-center gap-3 text-gold">
            <Microscope size={20} />
            <h2 className="font-display text-xl font-semibold">
              Science Explains
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/70">
            {story.science}
          </p>
        </article>

        <article className="rounded-3xl border border-gold/20 bg-gold/10 p-6">
          <div className="flex items-center gap-3 text-gold">
            <Brain size={20} />
            <h2 className="font-display text-xl font-semibold">
              The WOW Insight
            </h2>
          </div>

          <p className="mt-4 text-sm font-medium leading-7 text-white/85">
            {story.wow}
          </p>
        </article>

        <article className="rounded-3xl border border-gold/20 bg-white/5 p-6">
          <div className="flex items-center gap-3 text-gold">
            <Sprout size={20} />
            <h2 className="font-display text-xl font-semibold">
              Nature Teaches
            </h2>
          </div>

          <p className="mt-4 text-sm leading-7 text-white/70">
            {story.lesson}
          </p>
        </article>
      </section>

      <section className="mt-10 px-5">
        <div className="rounded-3xl border border-gold/20 bg-white/5 p-6 text-center">
          <Heart className="mx-auto text-gold" size={24} />

          <p className="mt-4 text-sm leading-7 text-white/70">
            Look closer. Think deeper. Respect the intelligence woven into
            nature.
          </p>

          <Link
            to="/explore/bee-and-me"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-black"
          >
            Explore More Stories
          </Link>
        </div>
      </section>
    </main>
  );
}