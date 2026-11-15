"use client";

import { useEffect, useMemo, useState } from "react";
import {
  computeAge,
  computeGap,
  parseDateInput,
  toDateInput,
  todayUTC,
} from "@/lib/math/age";
import { thousands } from "@/lib/format";
import {
  Card,
  CardTitle,
  Field,
  MONO,
  SectionLabel,
  StatCard,
  Tabs,
  type TitleTag,
} from "@/components/ui/primitives";

type Mode = "chronological" | "gap";

export function AgeCalculator({ titleTag = "h1" }: { titleTag?: TitleTag }) {
  const [mode, setMode] = useState<Mode>("chronological");
  const [birth, setBirth] = useState("1996-04-18");
  const [dateOne, setDateOne] = useState("2015-06-01");

  // "Today" is resolved after mount rather than during render: the server and
  // the visitor can sit in different time zones, and a date baked into the SSR
  // HTML would not match what the browser computes.
  const [at, setAt] = useState("");
  const [dateTwo, setDateTwo] = useState("");

  useEffect(() => {
    const today = toDateInput(todayUTC());
    setAt((current) => current || today);
    setDateTwo((current) => current || today);
  }, []);

  const chrono = useMemo(() => {
    const b = parseDateInput(birth);
    const a = parseDateInput(at);
    if (!b || !a) return null;
    return computeAge(b, a);
  }, [birth, at]);

  const gap = useMemo(() => {
    const one = parseDateInput(dateOne);
    const two = parseDateInput(dateTwo);
    if (!one || !two) return null;
    return computeGap(one, two);
  }, [dateOne, dateTwo]);

  return (
    <div
      className="mc-two-col"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.15fr)",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card>
        <CardTitle
          title="Age Calculator"
          as={titleTag}
          subtitle="Calendar-exact years, months and days"
        />

        <div style={{ marginTop: 18 }}>
          <Tabs
            ariaLabel="Age mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "chronological", label: "Chronological" },
              { value: "gap", label: "Date Gap" },
            ]}
          />
        </div>

        {mode === "chronological" ? (
          <div
            className="mc-stack-sm"
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Field label="Date of birth" value={birth} onChange={setBirth} type="date" />
            <Field label="Age at date" value={at} onChange={setAt} type="date" />
          </div>
        ) : (
          <div
            className="mc-stack-sm"
            style={{
              marginTop: 20,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Field label="Date 1" value={dateOne} onChange={setDateOne} type="date" />
            <Field label="Date 2" value={dateTwo} onChange={setDateTwo} type="date" />
          </div>
        )}

        <p
          style={{
            margin: "18px 0 0",
            fontSize: 12.5,
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          Ages are computed by calendar borrowing — never by dividing days by an averaged
          year length — so the result is exact across leap years and February 29 dates of
          birth. Dates can be entered in either order.
        </p>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {mode === "chronological" ? (
          <>
            <Card>
              <SectionLabel>Chronological age</SectionLabel>
              {chrono ? (
                <>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 46,
                      fontWeight: 700,
                      letterSpacing: "-0.045em",
                      color: "var(--accent)",
                      lineHeight: 1.05,
                      marginTop: 12,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {chrono.years}y {chrono.months}m {chrono.days}d
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 13,
                      color: "var(--muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {thousands(chrono.totalDays)} days lived ·{" "}
                    {thousands(chrono.daysToNextBirthday)} days to the next birthday
                  </div>
                </>
              ) : (
                <EmptyState />
              )}
            </Card>

            {chrono && (
              <div
                className="mc-stat-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, minmax(0,1fr))",
                  gap: 11,
                }}
              >
                <StatCard value={thousands(chrono.years)} label="Years" />
                <StatCard value={thousands(chrono.totalMonths)} label="Months" />
                <StatCard value={thousands(chrono.totalWeeks)} label="Weeks" />
                <StatCard value={thousands(chrono.totalDays)} label="Days" />
                <StatCard value={thousands(chrono.totalMinutes)} label="Minutes" />
              </div>
            )}
          </>
        ) : (
          <>
            <Card>
              <SectionLabel>Interval between dates</SectionLabel>
              {gap ? (
                <>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 46,
                      fontWeight: 700,
                      letterSpacing: "-0.045em",
                      color: "var(--cyan)",
                      lineHeight: 1.05,
                      marginTop: 12,
                      overflowWrap: "anywhere",
                    }}
                  >
                    {gap.years}y {gap.months}m {gap.days}d
                  </div>
                  <div
                    style={{ marginTop: 10, fontSize: 13, color: "var(--muted)" }}
                  >
                    {thousands(gap.totalDays)} days total
                  </div>
                </>
              ) : (
                <EmptyState />
              )}
            </Card>

            {gap && (
              <div
                className="mc-stat-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0,1fr))",
                  gap: 11,
                }}
              >
                <StatCard value={thousands(gap.totalMonths)} label="Months" />
                <StatCard value={thousands(gap.totalWeeks)} label="Weeks" />
                <StatCard value={thousands(gap.totalDays)} label="Days" />
                <StatCard value={thousands(gap.totalMinutes)} label="Minutes" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ marginTop: 14, fontSize: 13.5, color: "var(--muted)" }}>
      Enter a valid date to see the result.
    </div>
  );
}
