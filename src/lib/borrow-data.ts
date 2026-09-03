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

export type Listing = {
  id: string;
  name: string;
  src: string;
  extraSrcs?: string[];
  skills: Skill[];
  distance: string;
  meta: string;
  rate: string;
  buyLine: string;
  about: string[];
  sampleJobs: string[];
  houseRules: string[];
  window: string;
};

export const MACHINES: Listing[] = [
  {
    id: "tesla-optimus",
    name: "Tesla Optimus",
    src: "/img/tesla-optimus.jpg",
    skills: ["Gym", "Errands"],
    distance: "0.6 mi",
    meta: "Optimus · 0.6 mi · Mission",
    rate: GUEST_RATE,
    buyLine:
      "No public retail price and no cart. Musk has talked $20–30k as a target, not a buy button.",
    about: [
      "Tesla’s full-size humanoid, the one with TESLA on the chest.",
      "You teach the workout or the grocery haul. This is not a factory chore bot you order online.",
    ],
    sampleJobs: ["The workout", "The grocery haul"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "unitree-g1",
    name: "Unitree G1",
    src: "/img/unitree-g1.jpg",
    extraSrcs: ["/img/unitree-g1-studio.jpg"],
    skills: ["Kids", "Gym"],
    distance: "1.2 mi",
    meta: "G1 · 1.2 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "Official machine price $13,500. Guest rate $18/hr.",
    about: [
      "Unitree’s smaller humanoid. Official stills, not a costume.",
      "Book it when you want a compact extra body for kids time or a workout.",
    ],
    sampleJobs: ["Kids time", "The workout"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "1x-neo",
    name: "1X NEO",
    src: "/img/1x-neo.jpg",
    skills: ["Clean", "Kids"],
    distance: "1.1 mi",
    meta: "NEO · 1.1 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "1X lists $20,000 or $499/mo. Guest rate $18/hr.",
    about: [
      "The knit-suit home humanoid from 1X. Soft cover, visor head.",
      "Clean-up and kids time, not a spec sheet.",
    ],
    sampleJobs: ["The tidy-up", "Kids time"],
    houseRules: ["Spare batteries", "Indoors first", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "boston-atlas",
    name: "Boston Dynamics Atlas",
    src: "/img/boston-atlas.jpg",
    skills: ["Gym", "Errands"],
    distance: "0.4 mi",
    meta: "Atlas · 0.4 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "Not a consumer SKU. Guest rate $18/hr.",
    about: [
      "The lab Atlas — exposed hydraulics, Boston Dynamics on the chest.",
      "You cannot buy this at retail. The guest rate is for an afternoon, not a purchase.",
    ],
    sampleJobs: ["The workout", "The heavy carry"],
    houseRules: ["Lab rules", "Spotter in the room", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "figure-02",
    name: "Figure 02",
    src: "/img/figure-02.png",
    skills: ["Errands", "Clean"],
    distance: "0.9 mi",
    meta: "F.02 · 0.9 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "No public retail price. Guest rate $18/hr.",
    about: [
      "Figure AI’s matte-black F.02, the factory still with F.02 on the chest.",
      "Errands and clean-up. No invented sticker price.",
    ],
    sampleJobs: ["The grocery haul", "The tidy-up"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
];

export const HERO = [
  { id: "tesla-optimus", label: "Optimus", src: "/img/tesla-optimus.jpg" },
  { id: "unitree-g1", label: "G1", src: "/img/unitree-g1.jpg" },
  { id: "1x-neo", label: "NEO", src: "/img/1x-neo.jpg" },
  { id: "boston-atlas", label: "Atlas", src: "/img/boston-atlas.jpg" },
  { id: "figure-02", label: "Figure 02", src: "/img/figure-02.png" },
];

export const FILTER_IDS: Record<Skill, string[]> = {
  Nurse: [],
  Kids: ["unitree-g1", "1x-neo"],
  Dog: [],
  Clean: ["1x-neo", "figure-02"],
  Garden: [],
  Gym: ["tesla-optimus", "unitree-g1", "boston-atlas"],
  Errands: ["tesla-optimus", "boston-atlas", "figure-02"],
  Grill: [],
};

export function cardsForSkill(skill: Skill): Listing[] {
  const ids = FILTER_IDS[skill];
  return MACHINES.filter((machine) => ids.includes(machine.id));
}

export function machineById(id: string): Listing | undefined {
  return MACHINES.find((machine) => machine.id === id);
}
