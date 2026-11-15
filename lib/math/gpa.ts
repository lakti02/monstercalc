/** Credit-weighted GPA on the 4.0 and weighted 5.0 scales. */

export type GpaScale = "highschool" | "college";
export type CourseType = "regular" | "honors" | "ap";

export const GRADE_POINTS: Record<string, number> = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  F: 0,
};

export const GRADES = Object.keys(GRADE_POINTS);

export const COURSE_TYPES: { value: CourseType; label: string; bonus: number }[] = [
  { value: "regular", label: "Regular", bonus: 0 },
  { value: "honors", label: "Honors +0.5", bonus: 0.5 },
  { value: "ap", label: "AP · IB +1.0", bonus: 1.0 },
];

export const WEIGHTED_CEILING = 5.0;

export interface Course {
  id: string;
  name: string;
  grade: string;
  credits: number;
  type: CourseType;
}

export interface GpaInput {
  scale: GpaScale;
  courses: Course[];
  priorGpa: number;
  priorCredits: number;
}

export interface GpaResult {
  weighted: number;
  unweighted: number;
  totalCredits: number;
  courseCount: number;
  /** Counts for the A-F distribution chart, keyed by letter family. */
  distribution: { letter: string; count: number }[];
}

const DISTRIBUTION_LETTERS = ["A", "B", "C", "D", "F"];

export function bonusFor(type: CourseType, scale: GpaScale): number {
  // College mode is a straight 4.0 scale — course-type bonuses do not apply.
  if (scale === "college") return 0;
  return COURSE_TYPES.find((t) => t.value === type)?.bonus ?? 0;
}

export function computeGpa({
  scale,
  courses,
  priorGpa,
  priorCredits,
}: GpaInput): GpaResult {
  let weightedPoints = 0;
  let unweightedPoints = 0;
  let credits = 0;
  let counted = 0;

  for (const course of courses) {
    const base = GRADE_POINTS[course.grade];
    if (base === undefined) continue;
    const courseCredits = Number.isFinite(course.credits) ? course.credits : 0;
    if (courseCredits <= 0) continue;

    const bonus = bonusFor(course.type, scale);
    const weightedValue = Math.min(base + bonus, WEIGHTED_CEILING);

    weightedPoints += weightedValue * courseCredits;
    unweightedPoints += base * courseCredits;
    credits += courseCredits;
    counted += 1;
  }

  // Prior work re-enters as a block of quality points and credits, which is
  // exactly how a registrar recomputes a cumulative average.
  const hasPrior = priorGpa > 0 && priorCredits > 0;
  if (hasPrior) {
    const priorPoints = priorGpa * priorCredits;
    weightedPoints += priorPoints;
    unweightedPoints += priorPoints;
    credits += priorCredits;
  }

  const distribution = DISTRIBUTION_LETTERS.map((letter) => ({
    letter,
    count: courses.filter(
      (c) => GRADE_POINTS[c.grade] !== undefined && c.grade.charAt(0) === letter
    ).length,
  }));

  return {
    weighted: credits > 0 ? weightedPoints / credits : 0,
    unweighted: credits > 0 ? unweightedPoints / credits : 0,
    totalCredits: credits,
    courseCount: counted,
    distribution,
  };
}
