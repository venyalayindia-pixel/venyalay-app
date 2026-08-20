import React from "react";

export default function FounderStory() {
  return (
    <section className="rounded-3xl overflow-hidden border border-line bg-white">
      <div
        className="h-36"
        style={{
          background: "linear-gradient(135deg, #6B1E2B, #231F1E)",
        }}
      />

      <div className="p-5 md:p-8">
        <div className="text-xs tracking-widest uppercase mb-2 font-bold text-gold">
          Founder Story
        </div>

        <h3 className="font-display text-2xl md:text-3xl font-semibold text-charcoal">
          From Beekeeping to Ritual Wellness
        </h3>

        <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
          The journey began in 2020, learning directly through beekeeping —
          understanding bees, honey, nature, and consumer confusion firsthand.
          VENYALAY grew from that experience as an education-first honey and
          wellness brand.
        </p>

        <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
          With 17 years of experience in the Indian pharmaceutical industry,
          across nutraceuticals, probiotics, mucosal therapeutics, gynaecology,
          sexology, and multispecialty healthcare, one question remained:
          Why do we wait for illness before we care for our health?
        </p>

        <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
          That question inspired a larger vision — to help people reconnect
          with nature through meaningful daily rituals inspired by Ayurveda
          and backed by modern science.
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-[#fffaf4] p-5 md:p-6">
          <div className="text-xs tracking-widest uppercase font-bold text-gold">
            Our Philosophy
          </div>

          <h4 className="mt-2 font-display text-xl md:text-2xl font-semibold text-charcoal">
            Purpose Before Persuasion
          </h4>

          <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
            At VENYALAY™, we believe meaningful brands are built on purpose,
            trust, and lasting value.
          </p>

          <div className="mt-5 space-y-4">
            <div>
              <p className="font-semibold text-charcoal">
                We educate before we persuade.
              </p>
              <p className="mt-1 text-sm text-[#6b6560]">
                Because informed choices create lasting confidence.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal">
                We build trust before we build sales.
              </p>
              <p className="mt-1 text-sm text-[#6b6560]">
                Because relationships matter more than transactions.
              </p>
            </div>

            <div>
              <p className="font-semibold text-charcoal">
                We create lasting value before lasting growth.
              </p>
              <p className="mt-1 text-sm text-[#6b6560]">
                Because sustainable growth is earned by consistently creating
                meaningful value.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs tracking-widest uppercase font-bold text-gold">
            Beyond Honey. Beyond Products.
          </div>

          <p className="mt-3 text-sm text-[#6b6560] leading-relaxed">
            My vision is not simply to build another wellness brand. It is to
            build a trusted institution that inspires healthier daily rituals
            through education, science, and nature.
          </p>

          <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
            Honey is our first offering — not our final destination.
          </p>

          <p className="mt-4 text-sm text-[#6b6560] leading-relaxed">
            As VENYALAY grows, our commitment remains unchanged: to educate
            with integrity, innovate with purpose, and create products that
            become meaningful rituals in everyday life.
          </p>
        </div>

        
      </div>
    </section>
  );
}