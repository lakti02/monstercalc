/**
 * Calendar-exact date arithmetic.
 *
 * Ages are computed by borrowing from the real calendar — never by dividing
 * elapsed days by an averaged year length — because assessment protocols
 * (Pearson, ASQ) score by exact years/months/days bands and a 365.25-day
 * approximation drifts by a day or more.
 */

export interface YMD {
  years: number;
  months: number;
  days: number;
}

export interface AgeBreakdown extends YMD {
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalMinutes: number;
  totalHours: number;
  daysToNextBirthday: number;
  nextBirthday: Date | null;
}

const MS_PER_DAY = 86_400_000;

/** Parse a yyyy-mm-dd input value into a UTC-midnight Date, or null. */
export function parseDateInput(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(Date.UTC(y, m - 1, d));
  // Reject overflow dates such as 2023-02-30, which Date.UTC silently rolls over.
  if (
    date.getUTCFullYear() !== y ||
    date.getUTCMonth() !== m - 1 ||
    date.getUTCDate() !== d
  ) {
    return null;
  }
  return date;
}

/** Format a Date back into the yyyy-mm-dd shape an <input type="date"> wants. */
export function toDateInput(date: Date): string {
  const y = String(date.getUTCFullYear()).padStart(4, "0");
  const m = String(date.getUTCMonth() + 1).padStart(2, "0");
  const d = String(date.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayUTC(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
  );
}

export function daysInMonth(year: number, monthIndex: number): number {
  // monthIndex is 0-based; day 0 of the next month is the last day of this one.
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/** Add whole months to a UTC date, clamping to the end of the target month. */
export function addMonths(date: Date, months: number): Date {
  const year = date.getUTCFullYear();
  const monthIndex = date.getUTCMonth() + months;
  const day = date.getUTCDate();
  const targetYear = year + Math.floor(monthIndex / 12);
  const targetMonth = ((monthIndex % 12) + 12) % 12;
  const clamped = Math.min(day, daysInMonth(targetYear, targetMonth));
  return new Date(Date.UTC(targetYear, targetMonth, clamped));
}

/**
 * Exact years/months/days between two dates by calendar borrowing.
 *
 * The whole-month part is found first: borrow a month whenever the later
 * date's day-of-month has not yet reached the earlier date's, then borrow 12
 * from years if the month count went negative. The leftover days are then the
 * real calendar days from that month anniversary to the later date.
 *
 * Anchoring the day count on the anniversary rather than subtracting raw day
 * numbers is what keeps Jan 31 -> Mar 1 correct: a naive borrow of February's
 * 28 days from a -30 difference is still negative.
 */
export function diffYMD(from: Date, to: Date): YMD {
  const [a, b] = from <= to ? [from, to] : [to, from];

  let years = b.getUTCFullYear() - a.getUTCFullYear();
  let months = b.getUTCMonth() - a.getUTCMonth();

  if (b.getUTCDate() < a.getUTCDate()) months -= 1;
  if (months < 0) {
    months += 12;
    years -= 1;
  }

  const anniversary = addMonths(a, years * 12 + months);
  const days = Math.round((b.getTime() - anniversary.getTime()) / MS_PER_DAY);

  return { years, months, days };
}

/** Whole days between two dates. UTC-based, so DST can never add or drop one. */
export function totalDaysBetween(from: Date, to: Date): number {
  return Math.abs(Math.round((to.getTime() - from.getTime()) / MS_PER_DAY));
}

/** Whole calendar months between two dates. */
export function totalMonthsBetween(from: Date, to: Date): number {
  const { years, months } = diffYMD(from, to);
  return years * 12 + months;
}

/**
 * The next occurrence of `birth`'s month/day on or after `at`.
 *
 * Feb 29 clamps back to Feb 28 in non-leap years, matching the month-end
 * clamping `diffYMD` uses, so the two never disagree about when a year turns.
 */
export function nextBirthdayAfter(birth: Date, at: Date): Date {
  const yearsApart = at.getUTCFullYear() - birth.getUTCFullYear();
  let candidate = addMonths(birth, yearsApart * 12);
  if (candidate.getTime() < at.getTime()) {
    candidate = addMonths(birth, (yearsApart + 1) * 12);
  }
  return candidate;
}

export function computeAge(birth: Date, at: Date): AgeBreakdown {
  const ymd = diffYMD(birth, at);
  const totalDays = totalDaysBetween(birth, at);
  const next = nextBirthdayAfter(birth, at);

  return {
    ...ymd,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: totalMonthsBetween(birth, at),
    totalHours: totalDays * 24,
    totalMinutes: totalDays * 24 * 60,
    daysToNextBirthday: totalDaysBetween(at, next),
    nextBirthday: next,
  };
}

export function computeGap(a: Date, b: Date) {
  const [from, to] = a <= b ? [a, b] : [b, a];
  const ymd = diffYMD(from, to);
  const totalDays = totalDaysBetween(from, to);
  return {
    ...ymd,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    totalMonths: totalMonthsBetween(from, to),
    totalMinutes: totalDays * 24 * 60,
  };
}
