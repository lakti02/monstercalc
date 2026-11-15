"use client";

import { useSearch } from "@/components/ui/Search";

/** Clicking a chip fills the instant-search box, filtering the hero pills. */
export function RelatedChips({ chips }: { chips: string[] }) {
  const { setQuery } = useSearch();

  return (
    <>
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          className="mc-chip mc-tap"
          onClick={() => {
            setQuery(chip);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            padding: "7px 12px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "var(--panel2)",
            color: "var(--muted)",
            fontSize: 12,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          {chip}
        </button>
      ))}
    </>
  );
}
