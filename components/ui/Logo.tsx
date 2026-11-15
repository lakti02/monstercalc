/**
 * The calculator-monster mark: a rounded gradient tile with the glyph on top.
 * Inline SVG rather than lucide because the creature is bespoke.
 */
export function Logo({ size = 36 }: { size?: number }) {
  return (
    <div
      style={{ position: "relative", width: size, height: size, flexShrink: 0 }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: size * 0.3,
          background: "linear-gradient(150deg, var(--accent), var(--cyan))",
          transform: "rotate(-7deg)",
          boxShadow:
            "0 9px 24px -9px var(--accent), inset 0 1px 0 rgba(255,255,255,.35)",
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M6.4 7.6 4.9 2.7a.5.5 0 0 1 .85-.45l3.4 3.3A8.9 8.9 0 0 1 12 5.2c4.42 0 8 3.13 8 7v4.1A3.7 3.7 0 0 1 16.3 20H7.7A3.7 3.7 0 0 1 4 16.3v-4.1c0-1.83.79-3.48 2.4-4.6Z"
          fill="#04150e"
        />
        <circle cx="9.5" cy="11.4" r="2.5" fill="#eafff5" />
        <circle cx="10.2" cy="11.8" r="1.1" fill="#04150e" />
        <circle cx="15.6" cy="11.2" r="1.25" fill="#eafff5" />
        <path
          d="M8.2 15.5h8.1a.9.9 0 0 1 .9.9c0 1.27-1.03 2.3-2.3 2.3H9.6a1.4 1.4 0 0 1-1.4-1.4v-1.8Z"
          fill="#eafff5"
        />
        <path d="M10.9 15.5h.95v3.2h-.95zM13.6 15.5h.95v2.9h-.95z" fill="#04150e" />
        <path
          d="M18.6 4.9h2.9M20.05 3.45v2.9"
          stroke="#04150e"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity=".55"
        />
      </svg>
    </div>
  );
}
