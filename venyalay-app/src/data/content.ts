import { CampaignPost, FaqItem, BeeAndMeEpisode, Testimonial } from "../types";

export const CAMPAIGN_POSTS: CampaignPost[] = [
  { day: 1, question: "Why do bees dance?", teaser: "It isn't celebration — it's a map.", answer: "The 'waggle dance' is how a forager bee communicates the direction and distance of a good flower patch to the rest of the hive, encoding the sun's position into a figure-eight movement.", tag: "Bee Behaviour" },
  { day: 2, question: "Why does honey never truly spoil?", teaser: "Its chemistry does the work millennia-old jars prove.", answer: "Honey's low moisture content, natural acidity and enzyme activity make it a poor environment for bacteria and mould, which is why properly stored honey stays stable for a very long time.", tag: "Honey Science" },
  { day: 3, question: "Why does honey crystallise?", teaser: "A natural sign, not a flaw — here's why.", answer: "Crystallisation happens when glucose in honey separates from water and forms natural crystals. It depends on floral source and storage temperature, and does not indicate impurity.", tag: "Honey Science" },
  { day: 4, question: "How far will a bee fly for one flower?", teaser: "Further than most people assume.", answer: "Foraging bees can travel several kilometres from the hive in search of good blooms, though they prefer to forage as close as possible to conserve energy.", tag: "Bee Behaviour" },
  { day: 5, question: "Why does floral source change everything?", teaser: "Colour, aroma and taste all trace back to one bloom.", answer: "The nectar of each flower species carries its own sugars, oils and compounds, which is why honey from tulsi, jamun or eucalyptus can look and taste entirely different.", tag: "Sourcing" },
  { day: 6, question: "What is raw honey, really?", teaser: "It comes down to one word: unheated.", answer: "Raw honey is extracted and bottled without high-heat processing, which helps preserve its natural enzymes, aroma and fine pollen traces.", tag: "Honey Science" },
  { day: 7, question: "Why do bees matter beyond honey?", teaser: "Pollination quietly powers most of what we eat.", answer: "Bees pollinate a significant share of the crops we depend on, making them essential to food systems far beyond honey production.", tag: "Bee Behaviour" },
];

export const DID_YOU_KNOW: string[] = [
  "A single bee produces only a fraction of a teaspoon of honey in its lifetime.",
  "Honey's colour and flavour are shaped almost entirely by the flowers bees visit that season.",
  "Raw honey often contains fine pollen traces — a natural sign of its floral origin.",
  "Bees regulate hive temperature together, acting almost like one connected organism.",
  "Worker bees communicate through movement, scent and touch rather than sound alone.",
  "A healthy hive can contain tens of thousands of bees working in coordinated roles.",
];

export const FAQS: FaqItem[] = [
  { id: "f1", question: "Does pure honey crystallise?", answer: "Yes. Crystallisation is a natural process influenced by floral source and temperature — it does not mean the honey is impure." },
  { id: "f2", question: "Why does honey colour vary?", answer: "Colour depends on the flowers bees forage from. Different floral sources naturally produce different shades, from pale gold to deep mahogany." },
  { id: "f3", question: "Is thick honey always pure?", answer: "Not necessarily. Thickness varies by floral source, moisture content and temperature — it isn't a reliable purity indicator on its own." },
  { id: "f4", question: "Why do floral honeys taste different?", answer: "Each flower's nectar has a distinct composition, so honey from different floral sources naturally varies in taste, aroma and colour." },
  { id: "f5", question: "What does raw honey mean?", answer: "Raw honey is extracted and packed without high-heat processing, helping retain its natural enzymes and characteristics." },
  { id: "f6", question: "Can honey spoil?", answer: "Properly stored honey is naturally shelf-stable for a long time, though quality can change if exposed to moisture or contamination." },
  { id: "f7", question: "Does heating affect honey?", answer: "High heat can alter honey's natural enzymes and aroma, which is why VENYALAY honey is kept raw and unheated." },
  { id: "f8", question: "Why do honey prices vary?", answer: "Floral rarity, harvest season length, and sourcing region all affect honey pricing — rarer blooms typically mean smaller batches." },
];

export const BEE_AND_ME: BeeAndMeEpisode[] = [
  { id: "b1", pillar: "Nature Teaches", title: "The Architecture of a Hive", description: "How a hive organises itself without a single instruction manual." },
  { id: "b2", pillar: "Science Explains", title: "The Chemistry of Sweetness", description: "The chemistry and biology behind what makes honey behave the way it does." },
  { id: "b3", pillar: "Curiosity Connects", title: "One Question a Day", description: "Small daily questions that build a bigger picture over time." },
  { id: "b4", pillar: "Knowledge Empowers", title: "Reading a Jar Like an Expert", description: "Understanding honey well enough to recognise quality for yourself." },
  { id: "b5", pillar: "Respect Protects", title: "Beekeeping Done Right", description: "Why responsible beekeeping matters for bees, farmers and forests alike." },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: "t1", name: "Ritual customer", text: "The taste difference between the floral sources genuinely surprised me — each one feels distinct.", rating: 5 },
  { id: "t2", name: "Ritual customer", text: "I appreciated learning about crystallisation before I ever opened the jar. It changed how I look at honey.", rating: 5 },
  { id: "t3", name: "Ritual customer", text: "Using it for our festival naivedyam felt right — simple, unhurried packaging, no fuss.", rating: 5 },
];

export const TRACE_STEPS = ["Flower", "Bee", "Hive", "Selection", "Packing", "Ritual"] as const;

export const RITUALS = [
  { id: "morning", name: "Morning Ritual", desc: "1–2 teaspoons directly, or in lukewarm water — a mindful start to the day." },
  { id: "night", name: "Night Ritual", desc: "Stirred into a warm herbal drink, part of a slow evening wind-down." },
  { id: "food", name: "Food Ritual", desc: "Drizzled over fruit, breakfast bowls, or traditional foods after cooking." },
  { id: "pooja", name: "Pooja Ritual", desc: "Used respectfully in daily pooja, naivedyam, abhishekam, and festival rituals." },
] as const;

export const POOJA_USES = ["Daily Pooja", "Naivedyam", "Abhishekam", "Gruha Pravesham", "Satyanarayana Vratham", "Festival Rituals", "Ritual Gifting"];
