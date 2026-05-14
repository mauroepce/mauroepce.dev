import TechSketch from "./TechSketch";

export default function BirdiSketch() {
  return (
    <TechSketch label="Dual-App · Escrow Wallet">
      <div className="relative">
        <svg
          viewBox="0 0 320 200"
          fill="none"
          className="w-full h-auto text-foreground/70"
          strokeLinecap="round"
        >
          {/* Buyer app — top left */}
          <circle
            cx="60"
            cy="55"
            r="22"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.75"
            fill="#090909"
          />
          <text
            x="60"
            y="58"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.7"
            textAnchor="middle"
          >
            Buyer
          </text>

          {/* Shipper app — top right */}
          <circle
            cx="260"
            cy="55"
            r="22"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeOpacity="0.75"
            fill="#090909"
          />
          <text
            x="260"
            y="58"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.7"
            textAnchor="middle"
          >
            Shipper
          </text>

          {/* Backend — bottom center, hexagon */}
          <path
            d="M 160 105 L 188 121 L 188 153 L 160 169 L 132 153 L 132 121 Z"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeOpacity="0.85"
            fill="#090909"
          />
          <text
            x="160"
            y="136"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.7"
            textAnchor="middle"
          >
            Backend
          </text>
          <text
            x="160"
            y="146"
            className="font-mono"
            fontSize="5.5"
            fill="#C9A84C"
            opacity="0.7"
            textAnchor="middle"
          >
            + Wallet
          </text>

          {/* Connection lines */}
          {/* Buyer → Backend */}
          <line
            x1="78"
            y1="68"
            x2="138"
            y2="115"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          {/* Shipper ↔ Backend */}
          <line
            x1="242"
            y1="68"
            x2="182"
            y2="115"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.5"
          />
          {/* Buyer ↔ Shipper (delivery path) */}
          <path
            d="M 82 50 Q 160 25 238 50"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.4"
            strokeDasharray="2 2"
          />

          {/* Gold lock — funds held */}
          <circle cx="160" cy="155" r="1.8" fill="#C9A84C" />

          {/* Labels on connection lines */}
          <text
            x="92"
            y="92"
            className="font-mono"
            fontSize="5"
            fill="currentColor"
            opacity="0.45"
          >
            funds in
          </text>
          <text
            x="220"
            y="92"
            className="font-mono"
            fontSize="5"
            fill="currentColor"
            opacity="0.45"
            textAnchor="end"
          >
            payout
          </text>
          <text
            x="160"
            y="20"
            className="font-mono"
            fontSize="5"
            fill="currentColor"
            opacity="0.4"
            textAnchor="middle"
          >
            ID · signature · condition check
          </text>

          {/* Caption */}
          <text
            x="160"
            y="192"
            className="font-mono"
            fontSize="5"
            fill="#C9A84C"
            opacity="0.55"
            textAnchor="middle"
          >
            two native Android apps · escrow until delivery
          </text>
        </svg>
      </div>
    </TechSketch>
  );
}
