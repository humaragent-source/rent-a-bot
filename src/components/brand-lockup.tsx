const LOCKUP_WORDS = [
  { word: "Bot", color: "#ff385c" },
  { word: "Nurse", color: "#2a7de1" },
  { word: "Helper", color: "#c9842a" },
  { word: "Walker", color: "#5b6abf" },
  { word: "Cleaner", color: "#1a9b8e" },
  { word: "Gardener", color: "#3b8f3f" },
  { word: "Trainer", color: "#e06b1f" },
  { word: "Cook", color: "#c23a4a" },
  { word: "Bot", color: "#ff385c" },
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
              key={`${item.word}-${index}`}
              className="lockup-word"
              style={{ color: item.color }}
            >
              {item.word}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
