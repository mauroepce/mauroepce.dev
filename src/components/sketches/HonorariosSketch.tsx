import TechSketch from "./TechSketch";

export default function HonorariosSketch() {
  const NODES = [
    { x: 30, label: "Calc" },
    { x: 92, label: "Draft" },
    { x: 154, label: "Email" },
    { x: 216, label: "Checkout" },
    { x: 280, label: "Form" },
  ];

  return (
    <TechSketch label="Intent Preservation · Auth Flow">
      <div className="relative">
        <svg
          viewBox="0 0 320 160"
          fill="none"
          className="w-full h-auto text-foreground/70"
          strokeLinecap="round"
        >
          {/* Flowing horizontal line — the intent thread */}
          <path
            d="M 30 80 L 290 80"
            stroke="currentColor"
            strokeWidth="0.4"
            strokeOpacity="0.3"
            strokeDasharray="2 2"
          />

          {/* Nodes */}
          {NODES.map((node, i) => (
            <g key={node.label}>
              {/* Connection line segment */}
              {i < NODES.length - 1 && (
                <line
                  x1={node.x + 12}
                  y1="80"
                  x2={NODES[i + 1].x - 12}
                  y2="80"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeOpacity="0.5"
                />
              )}
              {/* Node circle */}
              <circle
                cx={node.x}
                cy="80"
                r="11"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeOpacity="0.7"
                fill="#090909"
              />
              {/* Label below */}
              <text
                x={node.x}
                y="105"
                className="font-mono"
                fontSize="6"
                fill="currentColor"
                opacity="0.6"
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* Gold intent token traveling */}
          <circle cx="30" cy="80" r="2" fill="#C9A84C">
            <animate
              attributeName="cx"
              from="30"
              to="280"
              dur="3.5s"
              repeatCount="indefinite"
            />
          </circle>

          {/* Labels */}
          <text
            x="160"
            y="40"
            className="font-mono"
            fontSize="6"
            fill="currentColor"
            opacity="0.5"
            textAnchor="middle"
          >
            state intact · no loss
          </text>

          {/* Caption */}
          <text
            x="160"
            y="148"
            className="font-mono"
            fontSize="5"
            fill="#C9A84C"
            opacity="0.55"
            textAnchor="middle"
          >
            intent token survives the full roundtrip
          </text>
        </svg>
      </div>
    </TechSketch>
  );
}
