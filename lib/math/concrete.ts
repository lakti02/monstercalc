/** Concrete volume, bag counts and cost. */

export type ConcreteMode = "slab" | "footing";

/** Published yields, in cubic feet, for the three common bag sizes. */
export const BAG_YIELDS = [
  { weight: 40, yield: 0.3 },
  { weight: 60, yield: 0.45 },
  { weight: 80, yield: 0.6 },
] as const;

export const WASTAGE_FACTOR = 1.1;
export const CUBIC_FEET_PER_YARD = 27;

export interface ConcreteInput {
  mode: ConcreteMode;
  /** Slab: length in feet. Footing: run length in feet. */
  length: number;
  /** Slab: width in feet. Footing: trench width in INCHES. */
  width: number;
  /** Depth in inches for both modes. */
  depth: number;
  quantity: number;
  pricePerYard: number;
  pricePerBag: number;
  wastage: boolean;
}

export interface ConcreteResult {
  cubicFeet: number;
  cubicYards: number;
  bags: { weight: number; count: number }[];
  readyMixCost: number;
  bagCost: number;
  bagCountFor80: number;
}

export function computeConcrete(input: ConcreteInput): ConcreteResult {
  const { mode, length, width, depth, quantity, wastage } = input;

  // Slabs take width in feet; footings take a trench width in inches, so the
  // cross-section needs both dimensions divided by 12.
  const base =
    mode === "slab"
      ? length * width * (depth / 12)
      : length * (width / 12) * (depth / 12);

  const raw = Math.max(0, base) * Math.max(0, quantity);
  const cubicFeet = wastage ? raw * WASTAGE_FACTOR : raw;
  const cubicYards = cubicFeet / CUBIC_FEET_PER_YARD;

  // A partial bag is a whole bag — always round up.
  const bags = BAG_YIELDS.map((bag) => ({
    weight: bag.weight,
    count: cubicFeet > 0 ? Math.ceil(cubicFeet / bag.yield) : 0,
  }));

  const bagCountFor80 = bags.find((b) => b.weight === 80)?.count ?? 0;

  return {
    cubicFeet,
    cubicYards,
    bags,
    readyMixCost: cubicYards * Math.max(0, input.pricePerYard),
    bagCost: bagCountFor80 * Math.max(0, input.pricePerBag),
    bagCountFor80,
  };
}
