import {
  validateWaitlistInput,
  type WaitlistEntry,
  type WaitlistInput,
  type WaitlistValidation,
} from "@/lib/waitlist";

const STORAGE_KEY = "rent-a-bot-waitlist";

export function saveWaitlistLocally(
  input: WaitlistInput
): WaitlistValidation | { ok: true; value: WaitlistEntry } {
  const parsed = validateWaitlistInput(input);
  if (!parsed.ok) {
    return parsed;
  }

  const entry: WaitlistEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...parsed.value,
  };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsedStore: unknown = raw ? JSON.parse(raw) : [];
    const entries = Array.isArray(parsedStore) ? parsedStore : [];
    entries.push(entry);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    return { ok: true, value: entry };
  } catch {
    return { ok: false, error: "Could not save your spot on this device." };
  }
}
