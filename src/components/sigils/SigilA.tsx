interface SigilProps {
  size?: number;
  className?: string;
}

export default function SigilA({ size = 48, className }: SigilProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      strokeLinecap="round"
      className={className}
    >
      {/* Two overlapping circles — Vesica Piscis */}
      <circle
        cx="40"
        cy="50"
        r="22"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.85"
      />
      <circle
        cx="60"
        cy="50"
        r="22"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeOpacity="0.85"
      />
      {/* Vertical axis through the intersection */}
      <line
        x1="50"
        y1="16"
        x2="50"
        y2="84"
        stroke="currentColor"
        strokeWidth="0.7"
        strokeOpacity="0.6"
      />
      {/* Gold center — where dualities meet */}
      <circle cx="50" cy="50" r="2.5" fill="#C9A84C" />
      {/* Subtle anchor dots on axis */}
      <circle cx="50" cy="16" r="0.9" fill="currentColor" opacity="0.5" />
      <circle cx="50" cy="84" r="0.9" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
