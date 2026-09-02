"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { WaitlistDialog } from "@/components/waitlist-dialog";
import { SKILLS, type SkillId, skillLabel } from "@/lib/skills";
import type { WaitlistIntent } from "@/lib/waitlist";

const PLACEHOLDER_SLOTS = 8;

export function HomePage() {
  const [skill, setSkill] = useState<SkillId | null>(null);
  const [intent, setIntent] = useState<WaitlistIntent | null>(null);

  function toggleSkill(id: SkillId) {
    setSkill((current) => (current === id ? null : id));
  }

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-4 pb-16 pt-5 sm:px-6">
      <header className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-medium tracking-tight">By Skill</p>
        <p className="text-xs text-muted-foreground">Humanoid rentals</p>
      </header>

      <section className="mt-8 grid gap-6">
        <div className="grid gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
            Rent a humanoid robot by the work you need done.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            A public marketplace for humanoid robots, organized by skill.
            Listings are not open yet. Join the waitlist if you want to rent,
            or if you have a robot to list later.
          </p>
        </div>

        <div
          aria-hidden="true"
          className="flex aspect-[16/10] w-full items-center justify-center rounded-xl bg-muted"
        >
          <span className="text-sm text-muted-foreground">Image reserved</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            className="h-12 w-full text-base"
            onClick={() => setIntent("rent")}
          >
            I want to rent
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full text-base"
            onClick={() => setIntent("list")}
          >
            I have a robot
          </Button>
        </div>
      </section>

      <section className="mt-10 grid gap-4" aria-labelledby="browse-heading">
        <div className="grid gap-1">
          <h2 id="browse-heading" className="text-lg font-medium tracking-tight">
            Browse by skill
          </h2>
          <p className="text-sm text-muted-foreground">
            Skill labels only. These are filters, not listings.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:overflow-visible sm:px-0">
          <div
            className="flex w-max gap-2 sm:w-full sm:flex-wrap"
            role="group"
            aria-label="Skill filters"
          >
            <Button
              type="button"
              size="sm"
              variant={skill === null ? "default" : "outline"}
              aria-pressed={skill === null}
              className="h-9 rounded-full px-3"
              onClick={() => setSkill(null)}
            >
              All
            </Button>
            {SKILLS.map((item) => (
              <Button
                key={item.id}
                type="button"
                size="sm"
                variant={skill === item.id ? "default" : "outline"}
                aria-pressed={skill === item.id}
                className="h-9 rounded-full px-3"
                onClick={() => toggleSkill(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {skill
              ? `${skillLabel(skill)} — listings are not open yet.`
              : "All skills — listings are not open yet."}
          </p>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {Array.from({ length: PLACEHOLDER_SLOTS }, (_, index) => (
              <li
                key={`${skill ?? "all"}-${index}`}
                className="overflow-hidden rounded-xl border bg-card"
              >
                <div className="aspect-[4/3] bg-muted" />
                <div className="px-3 py-3">
                  <p className="text-sm font-medium">Coming soon</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {skill ? skillLabel(skill) : "No listing yet"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mt-auto pt-12 text-xs leading-5 text-muted-foreground">
        Interface, photography, and pricing are owned later by Grid, Cast, and
        Lot. This slice is browse filters and a waitlist only. No accounts,
        bookings, or payments.
      </footer>

      <WaitlistDialog
        open={intent !== null}
        intent={intent}
        onOpenChange={(open) => {
          if (!open) {
            setIntent(null);
          }
        }}
      />
    </div>
  );
}
