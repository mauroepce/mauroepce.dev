import TechSketch from "./TechSketch";

export default function ClaceboxSketch() {
  return (
    <TechSketch label="Payment Strategy · Swappable Gateway">
      <div className="relative">
        <svg
          viewBox="0 0 320 200"
          fill="none"
          className="w-full h-auto text-foreground/70"
          strokeLinecap="round"
        >
          {/* Central hexagon — PaymentStrategy interface */}
          <path
            d="M 160 60 L 188 76 L 188 108 L 160 124 L 132 108 L 132 76 Z"
            stroke="currentColor"
            strokeWidth="0.7"
            strokeOpacity="0.85"
            fill="#090909"
          />
          <text
            x="160"
            y="91"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.7"
            textAnchor="middle"
          >
            Payment
          </text>
          <text
            x="160"
            y="100"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.7"
            textAnchor="middle"
          >
            Strategy
          </text>

          {/* Provider branches */}
          {/* Active: Lemon Squeezy — top */}
          <line
            x1="160"
            y1="60"
            x2="160"
            y2="32"
            stroke="#C9A84C"
            strokeWidth="0.6"
            strokeOpacity="0.8"
          />
          <rect
            x="135"
            y="18"
            width="50"
            height="14"
            stroke="#C9A84C"
            strokeWidth="0.6"
            strokeOpacity="0.8"
            fill="#090909"
          />
          <text
            x="160"
            y="28"
            className="font-mono"
            fontSize="5.5"
            fill="#C9A84C"
            opacity="0.85"
            textAnchor="middle"
          >
            Lemon Squeezy
          </text>

          {/* Inactive: Stripe — right */}
          <line
            x1="188"
            y1="92"
            x2="220"
            y2="92"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <rect
            x="222"
            y="85"
            width="40"
            height="14"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            fill="#090909"
          />
          <text
            x="242"
            y="95"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.35"
            textAnchor="middle"
          >
            Stripe
          </text>

          {/* Inactive: MercadoPago — bottom */}
          <line
            x1="160"
            y1="124"
            x2="160"
            y2="152"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <rect
            x="130"
            y="154"
            width="60"
            height="14"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            fill="#090909"
          />
          <text
            x="160"
            y="164"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.35"
            textAnchor="middle"
          >
            MercadoPago
          </text>

          {/* Inactive: Kushki — left */}
          <line
            x1="132"
            y1="92"
            x2="100"
            y2="92"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />
          <rect
            x="58"
            y="85"
            width="40"
            height="14"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            fill="#090909"
          />
          <text
            x="78"
            y="95"
            className="font-mono"
            fontSize="5.5"
            fill="currentColor"
            opacity="0.35"
            textAnchor="middle"
          >
            Kushki
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
            gateway swappable without touching checkout
          </text>
        </svg>
      </div>
    </TechSketch>
  );
}
