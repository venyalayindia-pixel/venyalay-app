import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, Sparkles } from "lucide-react";

const stories = [
  {
    slug: "natures-engineers",
    title: "Nature’s Engineers",
    question: "How do bees build with such precision?",
    image: "/assets/bee-and-me/stories/natures-engineers.png",
  },
  {
    slug: "inside-a-flower",
    title: "Inside a Flower",
    question: "What does a flower look like to a bee?",
    image: "/assets/bee-and-me/stories/inside-a-flower.png",
  },
  {
    slug: "bee-vision",
    title: "Bee Vision",
    question: "What can bees see that humans can’t?",
    image: "/assets/bee-and-me/stories/bee-vision.png",
  },
];

export default function BeeAndMe() {
  return (
    <main className="min-h-screen bg-black pb-16 text-white fade-in">
      <div className="px-5 pt-6">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1 text-sm font-semibold text-gold"
        >
          <ChevronLeft size={16} />
          Explore
        </Link>
      </div>

      <section className="mt-5 px-5">
        <div className="overflow-hidden rounded-3xl border border-gold/20 shadow-2xl">
          <img
            src="/assets/bee-and-me/hero/bee-and-me.png"
            alt="BEE & ME immersive science storytelling series"
            className="w-full object-cover"
          />
        </div>
      </section>

      <section className="px-5 pt-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
          <Sparkles size={14} />
          Immersive Science Storytelling
        </div>

        <h1 className="mt-5 font-display text-3xl font-semibold">
          Welcome to BEE &amp; ME
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/75">
          Welcome to <strong className="text-white">BEE &amp; ME</strong>—an
          immersive science storytelling series where curiosity leads to
          discovery. Inspired by the extraordinary world of honeybees, this
          journey explores nature&apos;s intelligence through observation,
          science, and real experiences. Every story, image, and insight invites
          you to look closer, think deeper, and discover the remarkable
          connections between bees, nature, and life.
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold leading-7 text-gold">
          Because sometimes, the smallest creatures teach the biggest lessons.
        </p>
      </section>

      <section className="mt-14">
        <div className="px-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Explore Nature’s Intelligence
          </p>

          <h2 className="mt-2 font-display text-2xl font-semibold">
            Stories of Discovery
          </h2>
        </div>

        <div className="mt-7 space-y-10 px-5">
          {stories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-3xl border border-gold/20 bg-white/5 shadow-2xl"
            >
              <img
                src={story.image}
                alt={`${story.title} BEE & ME story`}
                className="w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-display text-2xl font-semibold">
                  {story.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/65">
                  {story.question}
                </p>

                <Link
  to={`/explore/bee-and-me/${story.slug}`}
  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-white transition"
>
  Explore Story
  <ArrowRight size={16} />
</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
          
      <section className="mt-14 px-5">
        <div className="rounded-3xl border border-gold/20 bg-white/5 px-6 py-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Discover
          </p>

          <h2 className="mt-3 font-display text-2xl font-semibold">
            The Incredible World of Nature, Science &amp; Intelligence
          </h2>

          <div className="mt-7 grid grid-cols-2 gap-3 text-xs sm:grid-cols-5">
            {[
              "Nature Teaches",
              "Science Explains",
              "Curiosity Connects",
              "Knowledge Empowers",
              "Respect Protects",
            ].map((pillar) => (
              <div
                key={pillar}
                className="rounded-2xl border border-gold/20 bg-black/30 px-3 py-4 text-gold"
              >
                {pillar}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}