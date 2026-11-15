"use client";

import { useMemo, useState } from "react";
import {
  BAG_YIELDS,
  computeConcrete,
  type ConcreteMode,
} from "@/lib/math/concrete";
import { currency, decimals, num } from "@/lib/format";
import {
  Card,
  CardTitle,
  CopyButton,
  Field,
  MONO,
  SectionLabel,
  Tabs,
  ToggleRow,
  type TitleTag,
} from "@/components/ui/primitives";

const LABELS: Record<ConcreteMode, { length: string; width: string; depth: string; quantity: string }> = {
  slab: {
    length: "Length (ft)",
    width: "Width (ft)",
    depth: "Depth (in)",
    quantity: "# of slabs",
  },
  footing: {
    length: "Run length (ft)",
    width: "Trench width (in)",
    depth: "Footing depth (in)",
    quantity: "# of footings",
  },
};

export function ConcreteCalculator({ titleTag = "h1" }: { titleTag?: TitleTag }) {
  const [mode, setMode] = useState<ConcreteMode>("slab");
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [depth, setDepth] = useState("4");
  const [quantity, setQuantity] = useState("1");
  const [pricePerYard, setPricePerYard] = useState("160");
  const [pricePerBag, setPricePerBag] = useState("6.50");
  const [wastage, setWastage] = useState(true);

  const result = useMemo(
    () =>
      computeConcrete({
        mode,
        length: num(length),
        width: num(width),
        depth: num(depth),
        quantity: num(quantity),
        pricePerYard: num(pricePerYard),
        pricePerBag: num(pricePerBag),
        wastage,
      }),
    [mode, length, width, depth, quantity, pricePerYard, pricePerBag, wastage]
  );

  const labels = LABELS[mode];
  const yards = decimals(result.cubicYards, 2);
  const feet = decimals(result.cubicFeet, 2);

  return (
    <div
      className="mc-two-col"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0,1fr) minmax(0,1.05fr)",
        gap: 18,
        alignItems: "start",
      }}
    >
      <Card>
        <CardTitle
          title="Concrete Calculator"
          as={titleTag}
          subtitle="Slabs, pads & footings — volume, bags and budget"
        />

        <div style={{ marginTop: 18 }}>
          <Tabs
            ariaLabel="Pour type"
            value={mode}
            onChange={(next) => {
              setMode(next);
              // Trench width is entered in inches, so carry a sensible default
              // across rather than leaving 10 inches of trench behind.
              if (next === "footing" && width === "10") setWidth("16");
              if (next === "slab" && width === "16") setWidth("10");
            }}
            options={[
              { value: "slab", label: "Slabs / Pads" },
              { value: "footing", label: "Footings" },
            ]}
          />
        </div>

        <div
          className="mc-three"
          style={{
            marginTop: 20,
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            gap: 12,
          }}
        >
          <Field label={labels.length} value={length} onChange={setLength} />
          <Field label={labels.width} value={width} onChange={setWidth} />
          <Field label={labels.depth} value={depth} onChange={setDepth} />
          <Field label={labels.quantity} value={quantity} onChange={setQuantity} />
          <Field label="$ / cubic yard" value={pricePerYard} onChange={setPricePerYard} />
          <Field label="$ / 80 lb bag" value={pricePerBag} onChange={setPricePerBag} />
        </div>

        <ToggleRow
          checked={wastage}
          onChange={setWastage}
          title="Add 10% wastage buffer"
          description="Covers spillage, over-excavation and uneven subgrade"
        />
      </Card>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <SectionLabel>Volume required</SectionLabel>
            <CopyButton
              text={`${yards} cubic yards (${feet} cubic feet)${
                wastage ? " including 10% wastage buffer" : ""
              }`}
            />
          </div>
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "var(--accent)",
                  lineHeight: 1,
                  overflowWrap: "anywhere",
                }}
              >
                {yards}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>
                cubic yards
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 40,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  overflowWrap: "anywhere",
                }}
              >
                {feet}
              </div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 6 }}>
                cubic feet
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <SectionLabel>Pre-mix bags needed</SectionLabel>
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 11,
            }}
          >
            {result.bags.map((bag) => {
              const spec = BAG_YIELDS.find((b) => b.weight === bag.weight)!;
              return (
                <div
                  key={bag.weight}
                  style={{
                    padding: "15px 14px",
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "var(--panel2)",
                    minWidth: 0,
                  }}
                >
                  <div style={{ fontFamily: MONO, fontSize: 11, color: "var(--muted)" }}>
                    {bag.weight} lb
                  </div>
                  <div
                    style={{
                      fontFamily: MONO,
                      fontSize: 26,
                      fontWeight: 700,
                      marginTop: 6,
                      letterSpacing: "-0.03em",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {bag.count.toLocaleString("en-US")}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4 }}>
                    {spec.yield.toFixed(2)} ft³ / bag
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card
          style={{
            background:
              "linear-gradient(150deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent)",
          }}
        >
          <SectionLabel>Estimated budget</SectionLabel>
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  overflowWrap: "anywhere",
                }}
              >
                {currency(result.readyMixCost)}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
                ready-mix delivered
              </div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  overflowWrap: "anywhere",
                }}
              >
                {currency(result.bagCost)}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 5 }}>
                {result.bagCountFor80.toLocaleString("en-US")} × 80 lb bags
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
