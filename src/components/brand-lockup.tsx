import type { CSSProperties } from "react";

const LOCKUP_WORDS = [
  { word: "Bot", color: "#222222" },
  { word: "Nurse", color: "#6d7d8f" },
  { word: "Helper", color: "#8a7d6c" },
  { word: "Walker", color: "#737d88" },
  { word: "Cleaner", color: "#6e857b" },
  { word: "Gardener", color: "#70826a" },
  { word: "Trainer", color: "#8a7468" },
  { word: "Cook", color: "#8a6e6c" },
] as const;

export function BrandLockup() {
  return (
    <span className="lockup">
      <span className="lockup-static">Rent a</span>
      <span className="lockup-slot" aria-hidden="true">
        <span className="lockup-sizer">Gardener</span>
        <span className="lockup-reel">
          {LOCKUP_WORDS.map((item, index) => (
            <span
              key={item.word}
              className="lockup-word"
              style={
                {
                  color: item.color,
                  "--i": index,
                } as CSSProperties
              }
            >
              {item.word}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
