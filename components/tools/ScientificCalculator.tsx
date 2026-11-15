"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  evaluateExpression,
  formatResult,
  type AngleMode,
} from "@/lib/math/evaluate";
import { Card, MONO, SectionLabel, type TitleTag } from "@/components/ui/primitives";
import { useToast } from "@/components/ui/Toast";

type KeyKind = "number" | "function" | "operator" | "equals";

interface KeyDef {
  label: string;
  kind: KeyKind;
  /** Text inserted into the expression, when the key is a plain insert. */
  insert?: string;
  action?: "clear" | "backspace" | "equals" | "angle" | "sign" | "mc" | "mr" | "mplus" | "ans";
  ariaLabel?: string;
}

const HISTORY_LIMIT = 40;

const KEYPAD: KeyDef[][] = [
  [
    { label: "C", kind: "function", action: "clear", ariaLabel: "Clear" },
    { label: "⌫", kind: "function", action: "backspace", ariaLabel: "Backspace" },
    { label: "(", kind: "operator", insert: "(" },
    { label: ")", kind: "operator", insert: ")" },
    { label: "÷", kind: "operator", insert: "÷", ariaLabel: "Divide" },
  ],
  [
    { label: "sin", kind: "function", insert: "sin(" },
    { label: "cos", kind: "function", insert: "cos(" },
    { label: "tan", kind: "function", insert: "tan(" },
    { label: "DEG", kind: "function", action: "angle", ariaLabel: "Toggle angle mode" },
    { label: "×", kind: "operator", insert: "×", ariaLabel: "Multiply" },
  ],
  [
    { label: "xʸ", kind: "function", insert: "^", ariaLabel: "Power" },
    { label: "√", kind: "function", insert: "√(", ariaLabel: "Square root" },
    { label: "log", kind: "function", insert: "log(" },
    { label: "ln", kind: "function", insert: "ln(" },
    { label: "−", kind: "operator", insert: "−", ariaLabel: "Minus" },
  ],
  [
    { label: "7", kind: "number", insert: "7" },
    { label: "8", kind: "number", insert: "8" },
    { label: "9", kind: "number", insert: "9" },
    { label: "%", kind: "function", insert: "%", ariaLabel: "Percent" },
    { label: "+", kind: "operator", insert: "+", ariaLabel: "Plus" },
  ],
  [
    { label: "4", kind: "number", insert: "4" },
    { label: "5", kind: "number", insert: "5" },
    { label: "6", kind: "number", insert: "6" },
    { label: "MC", kind: "function", action: "mc", ariaLabel: "Memory clear" },
    { label: "MR", kind: "function", action: "mr", ariaLabel: "Memory recall" },
  ],
  [
    { label: "1", kind: "number", insert: "1" },
    { label: "2", kind: "number", insert: "2" },
    { label: "3", kind: "number", insert: "3" },
    { label: "M+", kind: "function", action: "mplus", ariaLabel: "Memory add" },
    { label: "π", kind: "number", insert: "π", ariaLabel: "Pi" },
  ],
  [
    { label: "0", kind: "number", insert: "0" },
    { label: ".", kind: "number", insert: "." },
    { label: "±", kind: "function", action: "sign", ariaLabel: "Toggle sign" },
    { label: "ANS", kind: "function", action: "ans", ariaLabel: "Last answer" },
    { label: "=", kind: "equals", action: "equals", ariaLabel: "Equals" },
  ],
];

/** Characters a physical keyboard can type straight into the expression. */
const KEYBOARD_INSERTS: Record<string, string> = {
  "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
  "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",
  ".": ".", "+": "+", "-": "−", "*": "×", "/": "÷",
  "(": "(", ")": ")", "^": "^", "%": "%",
};

export function ScientificCalculator({ titleTag: Title = "h1" }: { titleTag?: TitleTag }) {
  const { toast } = useToast();
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState<AngleMode>("DEG");
  const [memory, setMemory] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [history, setHistory] = useState<{ expression: string; result: string }[]>([]);

  const live = useMemo(
    () => evaluateExpression(expression, angleMode),
    [expression, angleMode]
  );
  const display = formatResult(live);

  const commit = useCallback(() => {
    if (live === null || !Number.isFinite(live)) return;
    const formatted = formatResult(live);
    setAnswer(live);
    setHistory((prev) =>
      [{ expression, result: formatted }, ...prev].slice(0, HISTORY_LIMIT)
    );
  }, [live, expression]);

  const press = useCallback(
    (key: KeyDef) => {
      if (key.insert !== undefined) {
        setExpression((prev) => prev + key.insert);
        return;
      }
      switch (key.action) {
        case "clear":
          setExpression("");
          break;
        case "backspace":
          setExpression((prev) => prev.slice(0, -1));
          break;
        case "equals":
          commit();
          break;
        case "angle":
          setAngleMode((prev) => (prev === "DEG" ? "RAD" : "DEG"));
          break;
        case "sign":
          // Flip the sign of the trailing number rather than the whole string.
          setExpression((prev) => {
            const match = /(-?\d*\.?\d+)$/.exec(prev);
            if (!match) return prev + "−";
            const start = prev.length - match[1].length;
            const literal = match[1];
            const flipped = literal.startsWith("-")
              ? literal.slice(1)
              : "-" + literal;
            return prev.slice(0, start) + flipped;
          });
          break;
        case "mc":
          setMemory(0);
          toast("Memory cleared");
          break;
        case "mr":
          setExpression((prev) => prev + formatResult(memory));
          break;
        case "mplus":
          if (live !== null && Number.isFinite(live)) {
            setMemory((prev) => prev + live);
            toast(`Added ${formatResult(live)} to memory`);
          }
          break;
        case "ans":
          setExpression((prev) => prev + formatResult(answer));
          break;
      }
    },
    [commit, live, memory, answer, toast]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      // Never hijack typing in another field on the page.
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        commit();
        return;
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        setExpression((prev) => prev.slice(0, -1));
        return;
      }
      if (event.key === "Escape") {
        event.preventDefault();
        setExpression("");
        return;
      }
      const insert = KEYBOARD_INSERTS[event.key];
      if (insert) {
        event.preventDefault();
        setExpression((prev) => prev + insert);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [commit]);

  return (
    <div
      className="mc-two-col"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.45fr) minmax(0,1fr)",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <Title
            style={{
              margin: 0,
              fontSize: 15.5,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Scientific Calculator
          </Title>
          <div style={{ display: "flex", gap: 7 }}>
            <Chip label={`M ${formatResult(memory) || "0"}`} />
            <Chip label={angleMode} accent />
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "18px 19px",
            borderRadius: 16,
            border: "1px solid var(--border)",
            background: "var(--panel2)",
            minHeight: 108,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <div
            aria-live="off"
            style={{
              fontFamily: MONO,
              fontSize: 15,
              color: "var(--muted)",
              minHeight: 20,
              overflowWrap: "anywhere",
              textAlign: "right",
            }}
          >
            {expression || " "}
          </div>
          <output
            aria-live="polite"
            style={{
              fontFamily: MONO,
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: "var(--accent)",
              minHeight: 44,
              lineHeight: 1.15,
              overflowWrap: "anywhere",
              textAlign: "right",
            }}
          >
            {display || " "}
          </output>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0,1fr))",
            gap: 8,
          }}
        >
          {KEYPAD.flat().map((key, index) => {
            const label = key.action === "angle" ? angleMode : key.label;
            return (
              <button
                key={`${key.label}-${index}`}
                type="button"
                onClick={() => press(key)}
                aria-label={key.ariaLabel ?? key.label}
                className="mc-key"
                style={{
                  height: 52,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 13,
                  cursor: "pointer",
                  fontFamily: MONO,
                  fontSize: key.kind === "function" ? 14 : 16.5,
                  fontWeight: 600,
                  ...kindStyle(key.kind),
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div
          style={{
            padding: "20px 22px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <SectionLabel>History</SectionLabel>
          <button
            type="button"
            onClick={() => setHistory([])}
            disabled={history.length === 0}
            className="mc-hover-line mc-tap"
            style={{
              padding: "6px 11px",
              borderRadius: 9,
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--muted)",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: history.length === 0 ? "not-allowed" : "pointer",
              opacity: history.length === 0 ? 0.45 : 1,
            }}
          >
            Clear
          </button>
        </div>

        <div className="mc-scroll" style={{ maxHeight: 470, overflowY: "auto" }}>
          {history.length === 0 ? (
            <div
              style={{
                padding: "26px 22px 34px",
                fontSize: 13,
                lineHeight: 1.6,
                color: "var(--muted)",
              }}
            >
              No calculations yet. Press <strong style={{ color: "var(--text)" }}>=</strong>{" "}
              to commit a result — the last {HISTORY_LIMIT} are kept here, and clicking one
              reuses its value.
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {history.map((entry, index) => (
                <li key={`${entry.expression}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setExpression((prev) => prev + entry.result)}
                    className="mc-tap"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 4,
                      padding: "13px 22px",
                      border: 0,
                      borderBottom: "1px solid var(--border)",
                      background: "transparent",
                      cursor: "pointer",
                      textAlign: "right",
                      transition: "background 0.16s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 12,
                        color: "var(--muted)",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {entry.expression}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: 16,
                        fontWeight: 700,
                        color: "var(--accent)",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {entry.result}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

function kindStyle(kind: KeyKind): React.CSSProperties {
  switch (kind) {
    case "number":
      return {
        border: "1px solid var(--border)",
        background: "var(--key)",
        color: "var(--text)",
      };
    case "operator":
      return {
        border: "1px solid color-mix(in srgb, var(--cyan) 32%, transparent)",
        background: "color-mix(in srgb, var(--cyan) 13%, transparent)",
        color: "var(--cyan)",
      };
    case "equals":
      return {
        border: "1px solid transparent",
        background: "linear-gradient(150deg, var(--accent), var(--cyan))",
        color: "var(--on-accent)",
        fontWeight: 700,
      };
    case "function":
    default:
      return {
        border: "1px solid var(--border)",
        background: "var(--keyhi)",
        color: "var(--muted)",
      };
  }
}

function Chip({ label, accent }: { label: string; accent?: boolean }) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: 11,
        fontWeight: 600,
        padding: "5px 9px",
        borderRadius: 8,
        border: `1px solid ${
          accent ? "color-mix(in srgb, var(--accent) 40%, transparent)" : "var(--border)"
        }`,
        background: accent
          ? "color-mix(in srgb, var(--accent) 14%, transparent)"
          : "var(--panel2)",
        color: accent ? "var(--accent)" : "var(--muted)",
        maxWidth: 150,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
