export const SKILLS = [
  "Nurse",
  "Kids",
  "Dog",
  "Clean",
  "Garden",
  "Gym",
  "Errands",
  "Grill",
] as const;

export type Skill = (typeof SKILLS)[number];

export const GUEST_RATE = "$18 / hr";

export type HeroItem = {
  id: string;
  label: string;
  src: string;
  opensHale?: boolean;
};

export const HERO: HeroItem[] = [
  { id: "nurse", label: "Nurse", src: "/img/mara-nurse.png" },
  { id: "gigi", label: "Gigi", src: "/img/jun-kids.png" },
  { id: "wren", label: "Wren", src: "/img/wren-clean.jpg" },
  { id: "bo", label: "Bo", src: "/img/rio-garden.png" },
  { id: "dog", label: "Dog", src: "/img/pip-dog.png" },
  { id: "hale", label: "Hale", src: "/img/hale-gym.jpg", opensHale: true },
  { id: "errands", label: "Errands", src: "/img/errands.png" },
  { id: "fox", label: "Fox", src: "/img/fox-grill.png" },
];

export type ListingCard = {
  id: string;
  name: string;
  src: string;
  skills: Skill[];
  distance: string;
  opensHale?: boolean;
};

export const CARDS: ListingCard[] = [
  {
    id: "hale",
    name: "Hale",
    src: "/img/hale-gym.jpg",
    skills: ["Gym", "Errands"],
    distance: "0.6 mi",
    opensHale: true,
  },
  {
    id: "wren",
    name: "Wren",
    src: "/img/wren-clean.jpg",
    skills: ["Clean", "Kids", "Errands"],
    distance: "1.1 mi",
  },
  {
    id: "gigi",
    name: "Gigi",
    src: "/img/jun-kids.png",
    skills: ["Kids", "Gym"],
    distance: "1.2 mi",
  },
  {
    id: "fox",
    name: "Fox",
    src: "/img/fox-grill.png",
    skills: ["Grill", "Kids"],
    distance: "0.9 mi",
  },
  {
    id: "bo",
    name: "Bo",
    src: "/img/rio-garden.png",
    skills: ["Gym", "Garden"],
    distance: "0.4 mi",
  },
];

export const FILTER_IDS: Record<Skill, string[]> = {
  Nurse: [],
  Kids: ["wren", "gigi", "fox"],
  Dog: [],
  Clean: ["wren"],
  Garden: ["bo"],
  Gym: ["hale", "gigi", "bo"],
  Errands: ["hale", "wren"],
  Grill: ["fox"],
};

export const HALE = {
  name: "Hale",
  src: "/img/hale-gym.jpg",
  meta: "H2 · 0.6 mi · Mission",
  rate: GUEST_RATE,
  buyLine: "This robot costs about $29,900 to buy (tax & shipping extra).",
  about: [
    "Hale is the full-size one, about as tall as you, good when you need something that can reach a shelf or move plates.",
    "You teach the workout or the grocery haul; this is not a factory chore bot.",
    "Book Hale when you want an extra body in the room, not a spec sheet.",
  ],
  skills: ["Gym", "Errands"] as Skill[],
  sampleJobs: ["The workout", "The grocery haul"],
  houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
  host: "Sam",
  window: "Sat 2–4pm",
};

export function cardsForSkill(skill: Skill): ListingCard[] {
  const ids = FILTER_IDS[skill];
  return CARDS.filter((card) => ids.includes(card.id));
}
