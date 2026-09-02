export const SKILLS = [
  { id: "nurse", label: "Nurse" },
  { id: "kids", label: "Kids" },
  { id: "dog", label: "Dog" },
  { id: "clean", label: "Clean" },
  { id: "garden", label: "Garden" },
  { id: "gym", label: "Gym" },
  { id: "errands", label: "Errands" },
  { id: "grill", label: "Grill" },
] as const;

export type SkillId = (typeof SKILLS)[number]["id"];

export function skillLabel(id: SkillId): string {
  return SKILLS.find((skill) => skill.id === id)?.label ?? id;
}
