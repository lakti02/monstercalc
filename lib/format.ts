/** Shared number formatting. Kept in one place so every card reads alike. */

export function decimals(value: number, places: number): string {
  if (!Number.isFinite(value)) return "0";
  return value.toFixed(places);
}

export function thousands(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return Math.round(value).toLocaleString("en-US");
}

export function currency(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "$0.00";
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
}

/** Coerce a text input to a number without letting an empty field read NaN. */
export function num(value: string, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
