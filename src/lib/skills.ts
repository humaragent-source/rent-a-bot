export const SKILLS = [
  { id: "cleaning", label: "Cleaning" },
  { id: "cooking", label: "Cooking" },
  { id: "childcare", label: "Childcare" },
  { id: "elder-care", label: "Elder care" },
  { id: "yard-work", label: "Yard work" },
  { id: "packing", label: "Packing" },
] as const;

export type SkillId = (typeof SKILLS)[number]["id"];

export function skillLabel(id: SkillId): string {
  return SKILLS.find((skill) => skill.id === id)?.label ?? id;
}
