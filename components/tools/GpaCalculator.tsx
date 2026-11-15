"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  COURSE_TYPES,
  GRADES,
  computeGpa,
  type Course,
  type CourseType,
  type GpaScale,
} from "@/lib/math/gpa";
import { decimals, num } from "@/lib/format";
import {
  Card,
  CardTitle,
  Field,
  MONO,
  SectionLabel,
  Tabs,
  type TitleTag,
} from "@/components/ui/primitives";

/**
 * Rows hold credits as raw text. Parsing on every keystroke would rewrite a
 * half-typed "1." back to "1" and fight the caret, so the string is the state
 * of record and the number is derived only at calculation time.
 */
interface CourseRow extends Omit<Course, "credits"> {
  credits: string;
}

const SEED: CourseRow[] = [
  { id: "c1", name: "AP Calculus AB", grade: "A", credits: "1", type: "ap" },
  { id: "c2", name: "Honors English 11", grade: "B+", credits: "1", type: "honors" },
  { id: "c3", name: "Chemistry", grade: "A-", credits: "1", type: "regular" },
  { id: "c4", name: "US History", grade: "B", credits: "1", type: "regular" },
];

const selectStyle: React.CSSProperties = {
  width: "100%",
  minWidth: 0,
  padding: "11px 12px",
  borderRadius: 11,
  border: "1px solid var(--border)",
  background: "var(--panel2)",
  fontFamily: MONO,
  fontSize: 14,
  outline: "none",
  cursor: "pointer",
  appearance: "none",
};

export function GpaCalculator({ titleTag = "h1" }: { titleTag?: TitleTag }) {
  const [scale, setScale] = useState<GpaScale>("highschool");
  const [courses, setCourses] = useState<CourseRow[]>(SEED);
  const [priorGpa, setPriorGpa] = useState("");
  const [priorCredits, setPriorCredits] = useState("");
  const [nextId, setNextId] = useState(5);

  const result = useMemo(
    () =>
      computeGpa({
        scale,
        courses: courses.map<Course>((row) => ({
          ...row,
          credits: num(row.credits),
        })),
        priorGpa: num(priorGpa),
        priorCredits: num(priorCredits),
      }),
    [scale, courses, priorGpa, priorCredits]
  );

  const update = (id: string, patch: Partial<CourseRow>) =>
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const maxCount = Math.max(1, ...result.distribution.map((d) => d.count));

  return (
    <div
      className="mc-two-col"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1.25fr) minmax(0,1fr)",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card>
        <CardTitle
          title="GPA Calculator"
          as={titleTag}
          subtitle="Weighted and unweighted, from the same course list"
        />

        <div style={{ marginTop: 18 }}>
          <Tabs
            ariaLabel="Grading scale"
            value={scale}
            onChange={setScale}
            options={[
              { value: "highschool", label: "High School" },
              { value: "college", label: "College" },
            ]}
          />
        </div>

        <div
          style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="mc-gpa-row"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(190px, 2.1fr) minmax(0, 0.85fr) minmax(0, 0.75fr) minmax(0, 1.2fr) 42px",
                gap: 9,
                alignItems: "center",
              }}
            >
              <input
                value={course.name}
                onChange={(e) => update(course.id, { name: e.target.value })}
                aria-label="Course name"
                placeholder="Course name"
                className="mc-tap"
                style={{
                  width: "100%",
                  minWidth: 0,
                  padding: "11px 12px",
                  borderRadius: 11,
                  border: "1px solid var(--border)",
                  background: "var(--panel2)",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <select
                value={course.grade}
                onChange={(e) => update(course.id, { grade: e.target.value })}
                aria-label="Grade"
                className="mc-tap"
                style={selectStyle}
              >
                {GRADES.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
              <input
                value={course.credits}
                onChange={(e) => update(course.id, { credits: e.target.value })}
                inputMode="decimal"
                aria-label="Credits"
                className="mc-tap"
                style={{ ...selectStyle, cursor: "text", appearance: "auto" }}
              />
              <select
                value={course.type}
                onChange={(e) =>
                  update(course.id, { type: e.target.value as CourseType })
                }
                aria-label="Course type"
                disabled={scale === "college"}
                className="mc-tap"
                style={{
                  ...selectStyle,
                  opacity: scale === "college" ? 0.45 : 1,
                  cursor: scale === "college" ? "not-allowed" : "pointer",
                }}
              >
                {COURSE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() =>
                  setCourses((prev) => prev.filter((c) => c.id !== course.id))
                }
                aria-label={`Remove ${course.name || "course"}`}
                className="mc-del mc-tap"
                style={{
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 11,
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.16s ease",
                }}
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            setCourses((prev) => [
              ...prev,
              {
                id: `c${nextId}`,
                name: "",
                grade: "A",
                credits: "1",
                type: "regular",
              },
            ]);
            setNextId((n) => n + 1);
          }}
          className="mc-hover-line mc-tap"
          style={{
            marginTop: 12,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            padding: "12px 15px",
            borderRadius: 12,
            border: "1px dashed var(--border2)",
            background: "transparent",
            color: "var(--muted)",
            fontSize: 13.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={15} strokeWidth={2.4} />
          Add course
        </button>

        <div
          style={{
            marginTop: 18,
            padding: "17px 18px",
            borderRadius: 14,
            border: "1px solid var(--border)",
            background: "var(--panel2)",
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>
            Already have a GPA? Roll it in
          </div>
          <p style={{ margin: "5px 0 0", fontSize: 12, color: "var(--muted)" }}>
            Adds your prior quality points and credits to the totals below, the same way
            a registrar recomputes a cumulative average.
          </p>
          <div
            className="mc-stack-sm"
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Field
              label="Prior cumulative GPA"
              value={priorGpa}
              onChange={setPriorGpa}
            />
            <Field
              label="Prior credits earned"
              value={priorCredits}
              onChange={setPriorCredits}
            />
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <SectionLabel>
            {scale === "highschool" ? "Weighted GPA (5.0 scale)" : "GPA (4.0 scale)"}
          </SectionLabel>
          <div
            style={{
              fontFamily: MONO,
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              color: "var(--accent)",
              lineHeight: 1,
              marginTop: 12,
            }}
          >
            {decimals(result.weighted, 2)}
          </div>
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <div
              style={{
                padding: "14px 15px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--panel2)",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                {decimals(result.unweighted, 2)}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 5 }}>
                unweighted (4.0)
              </div>
            </div>
            <div
              style={{
                padding: "14px 15px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "var(--panel2)",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                }}
              >
                {decimals(result.totalCredits, 1)}
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 5 }}>
                credit hours · {result.courseCount} courses
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Grade distribution</SectionLabel>
          <div
            style={{
              marginTop: 14,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {result.distribution.map((row) => (
              <div
                key={row.letter}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12.5,
                    color: "var(--muted)",
                    width: 14,
                    flexShrink: 0,
                  }}
                >
                  {row.letter}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: 10,
                    borderRadius: 999,
                    background: "var(--panel2)",
                    overflow: "hidden",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      height: "100%",
                      width: `${(row.count / maxCount) * 100}%`,
                      borderRadius: 999,
                      background: "linear-gradient(90deg, var(--accent), var(--cyan))",
                      transition: "width 0.28s ease",
                    }}
                  />
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 12.5,
                    color: "var(--muted)",
                    width: 18,
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {row.count}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
