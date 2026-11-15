/**
 * Binomial theorem expansion with exact integer coefficients.
 *
 * Coefficients come from the iterative identity C(n,k) = C(n,k-1)·(n-k+1)/k
 * rather than from factorials: every step divides exactly, so the running
 * value stays an integer instead of round-tripping through a 20! that a
 * double cannot represent.
 */

export const MAX_N = 20;

const SUPERSCRIPTS: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};

export function toSuperscript(n: number): string {
  return String(n)
    .split("")
    .map((c) => SUPERSCRIPTS[c] ?? c)
    .join("");
}

/** Row n of Pascal's triangle, as exact integers. */
export function binomialRow(n: number): number[] {
  const row: number[] = [1];
  for (let k = 1; k <= n; k++) {
    row.push((row[k - 1] * (n - k + 1)) / k);
  }
  return row;
}

export function pascalTriangle(rows: number): number[][] {
  return Array.from({ length: rows + 1 }, (_, i) => binomialRow(i));
}

export interface BinomialTerm {
  /** 0-based index into the expansion. */
  k: number;
  /** 1-based term number, as used by "find term #". */
  index: number;
  /** C(n,k). */
  nCk: number;
  /** Full numeric coefficient: C(n,k) · a^(n-k) · b^k. */
  coefficient: number;
  powerA: number;
  powerB: number;
  /** Rendered term without its leading sign, e.g. "80x³y²". */
  text: string;
}

export interface BinomialInput {
  a: number;
  b: number;
  n: number;
  varA: string;
  varB: string;
}

export interface BinomialResult {
  terms: BinomialTerm[];
  /** Full expansion with signs, e.g. "x³ + 3x²y + 3xy² + y³". */
  expansion: string;
  /** Typeset echo of the input, e.g. "(2x + 3y)⁵". */
  input: string;
  /** Set when a coefficient exceeded exact integer range. */
  warning: string | null;
  exact: boolean;
}

function formatNumber(value: number): string {
  if (Number.isInteger(value)) return String(value);
  // Trim floating noise from non-integer coefficients without inventing precision.
  return String(Number(value.toPrecision(12)));
}

/** Render "3x²y" — suppressing a unit coefficient and any zero-power variable. */
function formatTerm(
  coefficient: number,
  powerA: number,
  powerB: number,
  varA: string,
  varB: string
): string {
  const magnitude = Math.abs(coefficient);
  const parts: string[] = [];

  const variable = (name: string, power: number) => {
    if (power === 0) return "";
    if (power === 1) return name;
    return name + toSuperscript(power);
  };

  const av = varA ? variable(varA, powerA) : "";
  const bv = varB ? variable(varB, powerB) : "";
  const hasVariables = av !== "" || bv !== "";

  // A bare 1 is only meaningful when nothing else carries the term.
  if (!(magnitude === 1 && hasVariables)) {
    parts.push(formatNumber(magnitude));
  }
  parts.push(av, bv);

  const text = parts.join("");
  return text === "" ? "1" : text;
}

/** Typeset the input expression, e.g. (2x + 3y)⁵. */
function formatInput({ a, b, n, varA, varB }: BinomialInput): string {
  const left = `${a === 1 ? "" : a === -1 ? "-" : formatNumber(a)}${varA}`;
  const sign = b < 0 ? " - " : " + ";
  const bMag = Math.abs(b);
  const right = `${bMag === 1 ? "" : formatNumber(bMag)}${varB}`;
  return `(${left}${sign}${right})${toSuperscript(n)}`;
}

export function expandBinomial(input: BinomialInput): BinomialResult {
  const { a, b, n, varA, varB } = input;

  if (!Number.isInteger(n) || n < 0 || n > MAX_N) {
    return {
      terms: [],
      expansion: "",
      input: "",
      warning: `Power n must be a whole number from 0 to ${MAX_N}. Beyond ${MAX_N} the coefficients exceed the range JavaScript can represent exactly, so the expansion would be silently wrong.`,
      exact: false,
    };
  }

  const row = binomialRow(n);
  const terms: BinomialTerm[] = [];
  let exact = true;

  for (let k = 0; k <= n; k++) {
    const powerA = n - k;
    const powerB = k;
    const coefficient = row[k] * Math.pow(a, powerA) * Math.pow(b, powerB);

    if (!Number.isFinite(coefficient)) exact = false;
    if (
      Number.isInteger(coefficient) &&
      Math.abs(coefficient) > Number.MAX_SAFE_INTEGER
    ) {
      exact = false;
    }

    terms.push({
      k,
      index: k + 1,
      nCk: row[k],
      coefficient,
      powerA,
      powerB,
      text: formatTerm(coefficient, powerA, powerB, varA, varB),
    });
  }

  const visible = terms.filter((t) => t.coefficient !== 0);
  const expansion =
    visible.length === 0
      ? "0"
      : visible
          .map((t, i) => {
            const sign = t.coefficient < 0 ? "-" : "+";
            if (i === 0) return (sign === "-" ? "-" : "") + t.text;
            return ` ${sign} ${t.text}`;
          })
          .join("");

  return {
    terms,
    expansion,
    input: formatInput(input),
    warning: exact
      ? null
      : "Some coefficients exceed the exact integer range and are shown as approximations.",
    exact,
  };
}
