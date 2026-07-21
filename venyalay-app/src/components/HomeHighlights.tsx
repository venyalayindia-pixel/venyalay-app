export default function HomeHighlights() {
  return (
    <section className="px-5 py-12 bg-[#FFF9F3]">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-center text-[#5B1F28]">
          Explore VENYALAY
        </h2>

        <p className="text-center text-gray-600 mt-3 mb-10">
          Discover the world of honey bees, ritual wellness, and science.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-lg mb-2">
              🐝 100-Day Honey Bee Campaign
            </h3>
            <p>
              Daily science-backed facts about honey bees.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-lg mb-2">
              🎬 BEE & ME
            </h3>
            <p>
              Cinematic stories inspired by nature.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-lg mb-2">
              🔬 Scientific Initiatives
            </h3>
            <p>
              Research, education, and pollinator awareness.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <h3 className="font-bold text-lg mb-2">
              ❓ Honey FAQ
            </h3>
            <p>
              Learn the truth behind raw honey.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}