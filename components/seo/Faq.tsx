"use client";

import { useState } from "react";
import type { Faq as FaqItem } from "@/lib/tools";
import { MONO } from "@/components/ui/primitives";

/**
 * One panel open at a time. Rendered on the server too, so the question and
 * answer text is present in the HTML for crawlers regardless of JS.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            style={{
              border: "1px solid var(--border)",
              borderRadius: 16,
              background: "var(--panel)",
              overflow: "hidden",
            }}
          >
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
                className="mc-tap"
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "17px 18px",
                  border: 0,
                  background: "transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.16s ease",
                }}
              >
                <span style={{ fontSize: 14, fontWeight: 600 }}>{item.q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: MONO,
                    fontSize: 17,
                    color: "var(--accent)",
                    flexShrink: 0,
                  }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              hidden={!isOpen}
              style={{
                padding: "0 18px 18px",
                fontSize: 13.5,
                lineHeight: 1.65,
                color: "var(--muted)",
                textWrap: "pretty",
              }}
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
