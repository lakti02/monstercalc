import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "110px 24px 90px",
        textAlign: "center",
      }}
    >
      <h1 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: "-0.04em" }}>
        Page not found
      </h1>
      <p style={{ margin: "16px 0 0", fontSize: 16, color: "var(--muted)", lineHeight: 1.6 }}>
        That URL does not match a calculator or an article.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          marginTop: 26,
          padding: "12px 20px",
          borderRadius: 11,
          background: "linear-gradient(150deg, var(--accent), var(--cyan))",
          color: "var(--on-accent)",
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        Back to the calculators
      </Link>
    </main>
  );
}
