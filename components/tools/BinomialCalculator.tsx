"use client";

import { useMemo, useState } from "react";
import {
  MAX_N,
  expandBinomial,
  pascalTriangle,
  toSuperscript,
} from "@/lib/math/binomial";
import { num } from "@/lib/format";
import {
  Card,
  CardTitle,
  CopyButton,
  Field,
  MONO,
  SectionLabel,
  type TitleTag,
} from "@/components/ui/primitives";

const PASCAL_LIMIT = 9;

export function BinomialCalculator({ titleTag = "h1" }: { titleTag?: TitleTag }) {
  const [a, setA] = useState("2");
  const [b, setB] = useState("3");
  const [n, setN] = useState("5");
  const [varA, setVarA] = useState("x");
  const [varB, setVarB] = useState("y");
  const [termNumber, setTermNumber] = useState("3");

  const power = num(n);
  const result = useMemo(
    () =>
      expandBinomial({
        a: num(a),
        b: num(b),
        n: power,
        varA: varA.trim() || "x",
        varB: varB.trim() || "y",
      }),
    [a, b, power, varA, varB]
  );

  const requested = Math.round(num(termNumber, 1));
  const selected =
    result.terms.find((term) => term.index === requested) ?? result.terms[0] ?? null;

  const pascalRows = Math.min(power, PASCAL_LIMIT);
  const triangle = useMemo(
    () => (power >= 0 && power <= MAX_N ? pascalTriangle(pascalRows) : []),
    [power, pascalRows]
  );

  return (
    <div
      className="mc-two-col"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card>
        <CardTitle
          title="Binomial Expansion Calculator"
          as={titleTag}
          subtitle="Expand (ax + by)ⁿ with exact binomial coefficients"
        />

        <div
          className="mc-three"
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 12,
          }}
        >
          <Field label="Coefficient a" value={a} onChange={setA} />
          <Field label="Coefficient b" value={b} onChange={setB} />
          <Field
            label={`Power n (0–${MAX_N})`}
            value={n}
            onChange={setN}
            inputMode="numeric"
          />
          <Field label="First variable" value={varA} onChange={setVarA} inputMode="text" />
          <Field label="Second variable" value={varB} onChange={setVarB} inputMode="text" />
          <Field
            label="Find term #"
            value={termNumber}
            onChange={setTermNumber}
            inputMode="numeric"
          />
        </div>

        {result.warning ? (
          <div
            role="alert"
            style={{
              marginTop: 20,
              padding: "15px 16px",
              borderRadius: 14,
              border: "1px solid rgba(251, 191, 36, 0.4)",
              background: "rgba(251, 191, 36, 0.1)",
              fontSize: 13,
              lineHeight: 1.6,
              color: "var(--text)",
            }}
          >
            {result.warning}
          </div>
        ) : (
          <>
            <div style={{ marginTop: 22 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <SectionLabel>Expansion · {result.terms.length} terms</SectionLabel>
                <CopyButton text={`${result.input} = ${result.expansion}`} />
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: MONO,
                  fontSize: 19,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {result.input}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: MONO,
                  fontSize: 21,
                  lineHeight: 1.5,
                  color: "var(--accent)",
                  overflowWrap: "anywhere",
                }}
              >
                {result.expansion}
              </div>
            </div>

            {selected && (
              <div
                style={{
                  marginTop: 20,
                  padding: "18px 19px",
                  borderRadius: 16,
                  border: "1px solid color-mix(in srgb, var(--cyan) 40%, transparent)",
                  background: "color-mix(in srgb, var(--cyan) 11%, transparent)",
                }}
              >
                <SectionLabel>
                  Find term {selected.index} · T{toSubscript(selected.k)}
                </SectionLabel>
                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, minmax(0,1fr))",
                    gap: 12,
                  }}
                >
                  <MiniStat label="k" value={String(selected.k)} />
                  <MiniStat
                    label={`C(${power}, ${selected.k})`}
                    value={selected.nCk.toLocaleString("en-US")}
                  />
                  <MiniStat
                    label="coefficient"
                    value={selected.coefficient.toLocaleString("en-US")}
                  />
                </div>
                <div
                  style={{
                    marginTop: 14,
                    fontFamily: MONO,
                    fontSize: 22,
                    fontWeight: 700,
                    color: "var(--cyan)",
                    overflowWrap: "anywhere",
                  }}
                >
                  {selected.coefficient < 0 ? "−" : ""}
                  {selected.text}
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "20px 22px 12px" }}>
            <SectionLabel>Term table</SectionLabel>
          </div>
          <div className="mc-scroll" style={{ maxHeight: 300, overflowY: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: MONO,
                fontSize: 12.5,
              }}
            >
              <thead>
                <tr>
                  {["Term", "nCk", "Value"].map((heading) => (
                    <th
                      key={heading}
                      scope="col"
                      style={{
                        textAlign: "left",
                        padding: "9px 22px",
                        color: "var(--muted)",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--border)",
                        position: "sticky",
                        top: 0,
                        background: "var(--bg2)",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.terms.map((term) => (
                  <tr
                    key={term.k}
                    style={{
                      background:
                        term.index === requested
                          ? "color-mix(in srgb, var(--cyan) 12%, transparent)"
                          : "transparent",
                    }}
                  >
                    <td style={cellStyle}>T{term.index}</td>
                    <td style={{ ...cellStyle, color: "var(--muted)" }}>
                      {term.nCk.toLocaleString("en-US")}
                    </td>
                    <td style={{ ...cellStyle, color: "var(--accent)" }}>
                      {term.coefficient < 0 ? "−" : ""}
                      {term.text}
                    </td>
                  </tr>
                ))}
                {result.terms.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ ...cellStyle, color: "var(--muted)" }}>
                      Enter a power from 0 to {MAX_N}.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <SectionLabel>Pascal&rsquo;s triangle</SectionLabel>
          <div
            className="mc-scroll"
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 7,
              alignItems: "center",
              overflowX: "auto",
            }}
          >
            {triangle.map((row, index) => {
              const isActive = index === power;
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    gap: 7,
                    justifyContent: "center",
                    fontFamily: MONO,
                    fontSize: 12,
                    color: isActive ? "var(--accent)" : "var(--muted)",
                    fontWeight: isActive ? 700 : 400,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.map((value, k) => (
                    <span
                      key={k}
                      style={{
                        minWidth: 24,
                        padding: "3px 5px",
                        borderRadius: 7,
                        textAlign: "center",
                        background: isActive
                          ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                          : "transparent",
                      }}
                    >
                      {value.toLocaleString("en-US")}
                    </span>
                  ))}
                </div>
              );
            })}
          </div>
          {power > PASCAL_LIMIT && power <= MAX_N && (
            <div style={{ marginTop: 12, fontSize: 12, color: "var(--muted)" }}>
              Showing rows 0–{PASCAL_LIMIT} of {power}. The term table lists every
              coefficient.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

const cellStyle: React.CSSProperties = {
  padding: "9px 22px",
  borderBottom: "1px solid var(--border)",
  overflowWrap: "anywhere",
};

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div
        style={{
          fontFamily: MONO,
          fontSize: 18,
          fontWeight: 700,
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

const SUBSCRIPTS = "₀₁₂₃₄₅₆₇₈₉";
function toSubscript(value: number): string {
  return String(value + 1)
    .split("")
    .map((c) => SUBSCRIPTS[Number(c)] ?? c)
    .join("");
}
