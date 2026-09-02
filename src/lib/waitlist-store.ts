import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { WaitlistEntry } from "@/lib/waitlist";

function waitlistPath(): string {
  return (
    process.env.WAITLIST_PATH ?? path.join(process.cwd(), "data", "waitlist.json")
  );
}

async function ensureFile(filePath: string): Promise<void> {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, "[]\n", "utf8");
  }
}

let writeChain: Promise<unknown> = Promise.resolve();

export function appendWaitlistEntry(
  value: Omit<WaitlistEntry, "id" | "createdAt">
): Promise<WaitlistEntry> {
  const run = writeChain.then(async () => {
    const filePath = waitlistPath();
    await ensureFile(filePath);

    const raw = await fs.readFile(filePath, "utf8");
    let entries: WaitlistEntry[] = [];
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        entries = parsed as WaitlistEntry[];
      }
    } catch {
      entries = [];
    }

    const entry: WaitlistEntry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      ...value,
    };

    entries.push(entry);
    await fs.writeFile(filePath, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
    return entry;
  });

  writeChain = run.then(
    () => undefined,
    () => undefined
  );

  return run;
}
