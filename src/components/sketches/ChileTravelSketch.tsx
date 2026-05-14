import TechSketch from "./TechSketch";

export default function ChileTravelSketch() {
  return (
    <TechSketch label="3-Level Geo-Cache">
      <div className="relative">
        <svg
          viewBox="0 0 320 200"
          fill="none"
          className="w-full h-auto text-foreground/70"
          strokeLinecap="round"
        >
          {/* Outer circle — Firestore (cold) */}
          <circle
            cx="160"
            cy="100"
            r="80"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.45"
          />
          {/* Middle circle — IndexedDB */}
          <circle
            cx="160"
            cy="100"
            r="55"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.55"
          />
          {/* Inner circle — Memory (hot) */}
          <circle
            cx="160"
            cy="100"
            r="30"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeOpacity="0.75"
          />
          {/* Geo cells grid inside inner circle */}
          {[-1, 0, 1].map((dx) =>
            [-1, 0, 1].map((dy) => (
              <circle
                key={`${dx}-${dy}`}
                cx={160 + dx * 8}
                cy={100 + dy * 8}
                r="0.8"
                fill="currentColor"
                opacity="0.35"
              />
            ))
          )}
          {/* Gold center — cache hit */}
          <circle cx="160" cy="100" r="2.5" fill="#C9A84C" />

          {/* Latency labels — right side of each ring */}
          <text
            x="245"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.55"
          >
            150ms
          </text>
          <text
            x="220"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.65"
          >
            20ms
          </text>
          <text
            x="194"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.8"
          >
            5ms
          </text>

          {/* Labels — left side */}
          <text
            x="65"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.55"
            textAnchor="end"
          >
            Firestore
          </text>
          <text
            x="100"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.65"
            textAnchor="end"
          >
            IndexedDB
          </text>
          <text
            x="125"
            y="103"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.8"
            textAnchor="end"
          >
            Memory
          </text>

          {/* Caption at bottom */}
          <text
            x="160"
            y="195"
            className="font-mono"
            fontSize="5"
            fill="#C9A84C"
            opacity="0.55"
            textAnchor="middle"
          >
            geo cells · ~1.1km quantization
          </text>
        </svg>
      </div>
    </TechSketch>
  );
}
