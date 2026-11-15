"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { copyText, useToast } from "./Toast";
export { MONO } from "./MonoToken";

/* ==========================================================================
   The repeated surfaces of the MonsterCalc design, in one place so radii,
   borders and shadows cannot drift between tools.
   ========================================================================== */

export function Card({
  children,
  style,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  as?: "div" | "section";
}) {
  return (
    <Tag
      className={className}
      style={{
        border: "1px solid var(--border)",
        borderRadius: 20,
        background: "var(--panel)",
        boxShadow: "var(--shadow)",
        backdropFilter: "blur(12px)",
        padding: 22,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

export type TitleTag = "h1" | "h2";

export function CardTitle({
  title,
  subtitle,
  as: Tag = "h1",
}: {
  title: string;
  subtitle: string;
  as?: TitleTag;
}) {
  return (
    <>
      <Tag
        style={{
          margin: 0,
          fontSize: 15.5,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </Tag>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 3 }}>{subtitle}</div>
    </>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 11.5,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      {children}
    </span>
  );
}

/** Segmented control. Active = accent tint + accent border + white text. */
export function Tabs<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (next: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        gap: 4,
        padding: 4,
        border: "1px solid var(--border)",
        borderRadius: 11,
        background: "var(--panel2)",
        width: "fit-content",
        maxWidth: "100%",
      }}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(option.value)}
            className="mc-hover-line mc-tap"
            style={{
              padding: "7px 14px",
              borderRadius: 8,
              border: `1px solid ${
                active ? "color-mix(in srgb, var(--accent) 45%, transparent)" : "transparent"
              }`,
              background: active
                ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                : "transparent",
              color: active ? "var(--text)" : "var(--muted)",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/** Uppercase label above a mono input — the standard MonsterCalc field. */
export function Field({
  label,
  value,
  onChange,
  type = "text",
  inputMode = "decimal",
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  type?: "text" | "number" | "date";
  inputMode?: "decimal" | "numeric" | "text";
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 7, minWidth: 0 }}>
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "var(--muted)",
        }}
      >
        {label}
      </span>
      <span style={{ position: "relative", display: "flex" }}>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          type={type}
          inputMode={type === "date" ? undefined : inputMode}
          min={min}
          max={max}
          step={step}
          className="mc-field mc-tap"
          style={{
            width: "100%",
            minWidth: 0,
            padding: suffix ? "12px 38px 12px 13px" : "12px 13px",
            borderRadius: 11,
            border: "1px solid var(--border)",
            background: "var(--panel2)",
            fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            fontSize: 15,
            outline: "none",
            transition: "border-color 0.16s ease",
          }}
        />
        {suffix && (
          <span
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 11.5,
              color: "var(--muted)",
              pointerEvents: "none",
              fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
            }}
          >
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}

export function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className="mc-hover-line mc-tap"
      onClick={async () => {
        const ok = await copyText(text);
        toast(ok ? "Copied to clipboard" : "Copy failed — select and copy manually");
        if (ok) {
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }
      }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 11px",
        borderRadius: 9,
        border: "1px solid var(--border)",
        background: "transparent",
        color: "var(--muted)",
        fontSize: 11.5,
        fontWeight: 600,
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      {copied ? <Check size={12} strokeWidth={2.6} /> : <Copy size={12} strokeWidth={2.2} />}
      {copied ? "Copied" : label}
    </button>
  );
}

/** The pill toggle used for the concrete wastage buffer. */
export function ToggleRow({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      style={{
        marginTop: 18,
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "13px 15px",
        borderRadius: 12,
        border: `1px solid ${
          checked ? "color-mix(in srgb, var(--accent) 45%, transparent)" : "var(--border)"
        }`,
        background: checked
          ? "color-mix(in srgb, var(--accent) 12%, transparent)"
          : "var(--panel2)",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.16s ease",
      }}
    >
      <span
        style={{
          width: 38,
          height: 22,
          borderRadius: 999,
          background: checked ? "var(--accent)" : "var(--border2)",
          padding: 3,
          display: "flex",
          justifyContent: checked ? "flex-end" : "flex-start",
          transition: "all 0.16s ease",
          flexShrink: 0,
        }}
      >
        <span
          style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff" }}
        />
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{ fontSize: 13.5, fontWeight: 600 }}>{title}</span>
        <span style={{ fontSize: 11.5, color: "var(--muted)" }}>{description}</span>
      </span>
    </button>
  );
}

export function StatCard({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent?: "accent" | "cyan";
}) {
  return (
    <div
      style={{
        padding: "15px 14px",
        borderRadius: 14,
        border: "1px solid var(--border)",
        background: "var(--panel2)",
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-jetbrains-mono), ui-monospace, monospace",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: accent ? `var(--${accent})` : "var(--text)",
          overflowWrap: "anywhere",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 5 }}>{label}</div>
    </div>
  );
}

