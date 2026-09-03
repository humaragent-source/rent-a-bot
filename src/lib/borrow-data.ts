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
    name: "Optimus",
    src: "/img/optimus.jpg",
    skills: ["Errands", "Gym"],
    distance: "0.8 mi",
    meta: "Optimus · 0.8 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "There is no consumer price and we are not inventing one.",
    about: [
      "Famous factory humanoid, not something you can add to a cart.",
      "You’d teach the job if a unit ever showed up; today this listing is the honest wait.",
    ],
    sampleJobs: ["The grocery haul", "The tidy-up"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "unitree-g1",
    name: "G1",
    src: "/img/g1.jpg",
    skills: ["Kids", "Gym"],
    distance: "1.2 mi",
    meta: "G1 · 1.2 mi · Mission",
    rate: GUEST_RATE,
    buyLine:
      "Official list is $13,500 (tax and shipping extra). Often backordered — availability is the fine print.",
    about: [
      "Kid-height, compact, after-school buddy or a gym-floor demo once you’ve taught the routine.",
      "This SKU is show-and-go, not a research kit.",
    ],
    sampleJobs: ["After-school buddy", "Gym-floor demo"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "1x-neo",
    name: "NEO",
    src: "/img/neo.jpg",
    skills: ["Clean", "Kids", "Errands"],
    distance: "1.1 mi",
    meta: "NEO · 1.1 mi · Mission",
    rate: GUEST_RATE,
    buyLine:
      "Ownership is $20,000 or $499/mo; first US deliveries are a 2026 thing.",
    about: [
      "The home helper: the company actually sells laundry, tidying, and hanging out with kids.",
      "You still walk NEO through your house; not magic out of the box.",
    ],
    sampleJobs: ["Laundry", "Tidying", "Kids time"],
    houseRules: ["Spare batteries", "Indoors first", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "boston-atlas",
    name: "Atlas",
    src: "/img/atlas.jpg",
    skills: ["Gym", "Garden"],
    distance: "2.0 mi",
    meta: "Atlas · 2.0 mi · Mission",
    rate: GUEST_RATE,
    buyLine:
      "Boston Dynamics does not sell Atlas to Average Joes; there is no consumer cart.",
    about: [
      "The parkour one people already know.",
      "Book this as a taught-skills placeholder, not a warehouse you can order from.",
    ],
    sampleJobs: ["The workout"],
    houseRules: ["Spotter in the room", "Taught skills only", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
  {
    id: "figure-02",
    name: "Figure 02",
    src: "/img/figure02.jpg",
    skills: ["Errands", "Gym"],
    distance: "1.6 mi",
    meta: "Figure 02 · 1.6 mi · Mission",
    rate: GUEST_RATE,
    buyLine: "No public retail, no preorder button on figure.ai.",
    about: [
      "Enterprise/factory humanoid, not a store SKU.",
      "If it ever lands next door you’d teach errands; until then the listing says that plainly.",
    ],
    sampleJobs: ["The grocery haul"],
    houseRules: ["Spare batteries", "Sidewalks", "Back by 8pm"],
    window: "Sat 2–4pm",
  },
];

export const HERO = [
  { id: "tesla-optimus", label: "Optimus", src: "/img/optimus.jpg" },
  { id: "unitree-g1", label: "G1", src: "/img/g1.jpg" },
  { id: "1x-neo", label: "NEO", src: "/img/neo.jpg" },
  { id: "boston-atlas", label: "Atlas", src: "/img/atlas.jpg" },
  { id: "figure-02", label: "Figure 02", src: "/img/figure02.jpg" },
];

export const FILTER_IDS: Record<Skill, string[]> = {
  Nurse: [],
  Kids: ["unitree-g1", "1x-neo"],
  Dog: [],
  Clean: ["1x-neo"],
  Garden: ["boston-atlas"],
  Gym: ["tesla-optimus", "unitree-g1", "boston-atlas", "figure-02"],
  Errands: ["tesla-optimus", "1x-neo", "figure-02"],
  Grill: [],
};

export function cardsForSkill(skill: Skill): Listing[] {
  const ids = FILTER_IDS[skill];
  return MACHINES.filter((machine) => ids.includes(machine.id));
}

export function machineById(id: string): Listing | undefined {
  return MACHINES.find((machine) => machine.id === id);
}
