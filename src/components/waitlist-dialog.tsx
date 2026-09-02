"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WaitlistIntent } from "@/lib/waitlist";

type WaitlistDialogProps = {
  open: boolean;
  intent: WaitlistIntent | null;
  onOpenChange: (open: boolean) => void;
};

const COPY: Record<
  WaitlistIntent,
  { title: string; description: string; submit: string }
> = {
  rent: {
    title: "I want to rent",
    description:
      "Leave an email. We’ll write when rentals open. City is optional and only used to group interest.",
    submit: "Join the waitlist",
  },
  list: {
    title: "I have a robot",
    description:
      "Leave an email. We’ll write when you can list a robot. City is optional and only used to group interest.",
    submit: "Join the waitlist",
  },
};

export function WaitlistDialog({
  open,
  intent,
  onOpenChange,
}: WaitlistDialogProps) {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string | null>(null);

  const copy = intent ? COPY[intent] : null;

  function resetForm() {
    setEmail("");
    setCity("");
    setStatus("idle");
    setMessage(null);
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      resetForm();
    }
    onOpenChange(next);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!intent || status === "saving") {
      return;
    }

    setStatus("saving");
    setMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          city,
          intent,
        }),
      });

      const data: unknown = await response.json().catch(() => null);
      const error =
        data &&
        typeof data === "object" &&
        "error" in data &&
        typeof data.error === "string"
          ? data.error
          : null;

      if (!response.ok) {
        setStatus("error");
        setMessage(error ?? "Could not save your spot. Try again.");
        return;
      }

      setStatus("success");
      setMessage(
        "You’re on the waitlist. We’ll email you when this part of the marketplace opens."
      );
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Check your connection and try again.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {copy && status !== "success" ? (
          <form onSubmit={handleSubmit} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>{copy.title}</DialogTitle>
              <DialogDescription>{copy.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist-email">Email</Label>
                <Input
                  id="waitlist-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  inputMode="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 text-base"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="waitlist-city">
                  City <span className="font-normal text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="waitlist-city"
                  name="city"
                  type="text"
                  autoComplete="address-level2"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  className="h-11 text-base"
                />
              </div>
            </div>
            {message && status === "error" ? (
              <p className="text-sm text-destructive" role="alert">
                {message}
              </p>
            ) : null}
            <DialogFooter>
              <Button
                type="submit"
                disabled={status === "saving"}
                className="h-11 w-full text-base sm:w-auto"
              >
                {status === "saving" ? "Saving…" : copy.submit}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="grid gap-4">
            <DialogHeader>
              <DialogTitle>You’re on the list</DialogTitle>
              <DialogDescription>
                {message ??
                  "We’ll email you when this part of the marketplace opens."}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="h-11 w-full text-base sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
