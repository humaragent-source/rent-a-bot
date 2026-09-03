type BrandLockupProps = {
  onClick?: () => void;
};

export function BrandLockup({ onClick }: BrandLockupProps) {
  return (
    <h1 className="lockup" onClick={onClick}>
      <span className="lockup-static">Renta Robo -</span>
      <span className="lockup-slot" aria-hidden="true">
        <span className="lockup-reel">
          <span className="lw c-bot">Bot</span>
          <span className="lw c-nurse">Nurse</span>
          <span className="lw c-helper">Helper</span>
          <span className="lw c-walker">Walker</span>
          <span className="lw c-cleaner">Cleaner</span>
          <span className="lw c-gardener">Gardener</span>
          <span className="lw c-trainer">Trainer</span>
          <span className="lw c-cook">Cook</span>
          <span className="lw c-bot">Bot</span>
        </span>
      </span>
      <span className="sr-only">Renta Robo</span>
    </h1>
  );
}
