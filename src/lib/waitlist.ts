export const WAITLIST_INTENTS = ["rent", "list"] as const;

export type WaitlistIntent = (typeof WAITLIST_INTENTS)[number];

export type WaitlistEntry = {
  id: string;
  email: string;
  city: string | null;
  intent: WaitlistIntent;
  createdAt: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistInput = {
  email: unknown;
  city?: unknown;
  intent: unknown;
};

export type WaitlistValidation =
  | { ok: true; value: Omit<WaitlistEntry, "id" | "createdAt"> }
  | { ok: false; error: string };

export function validateWaitlistInput(input: WaitlistInput): WaitlistValidation {
  const email =
    typeof input.email === "string" ? input.email.trim().toLowerCase() : "";
  const city =
    typeof input.city === "string" ? input.city.trim().slice(0, 80) : "";
  const intent = input.intent;

  if (!email) {
    return { ok: false, error: "Email is required." };
  }

  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (intent !== "rent" && intent !== "list") {
    return { ok: false, error: "Choose whether you want to rent or list a robot." };
  }

  return {
    ok: true,
    value: {
      email,
      city: city.length > 0 ? city : null,
      intent,
    },
  };
}
