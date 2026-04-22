"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

export function Field({
  label,
  hint,
  required,
  children,
  className = "",
  htmlFor,
  counter,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  htmlFor?: string;
  counter?: ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label
          htmlFor={htmlFor}
          className="text-[11px] uppercase tracking-[0.16em] text-white/75"
        >
          {label}
          {required ? (
            <span className="ml-1 text-white/30" aria-hidden>
              *
            </span>
          ) : (
            <span
              className="ml-2 text-[10px] normal-case tracking-normal text-white/30"
              aria-hidden
            >
              (optional)
            </span>
          )}
        </label>
        {counter ? (
          <span className="text-[10.5px] tabular-nums text-white/40">
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? (
        <p className="text-[12.5px] leading-snug text-white/45">{hint}</p>
      ) : null}
    </div>
  );
}

export function CharCounter({ current, max }: { current: number; max: number }) {
  const pct = max > 0 ? current / max : 0;
  const nearLimit = pct >= 0.9;
  const atLimit = pct >= 1;
  const color = atLimit
    ? "text-red-300"
    : nearLimit
      ? "text-amber-200"
      : "text-white/40";
  return (
    <span className={color}>
      {current.toLocaleString()}&nbsp;/&nbsp;{max.toLocaleString()}
    </span>
  );
}

const baseInputCls =
  "w-full border-b border-hair-strong bg-transparent px-0 py-3 text-[15.5px] text-white placeholder:text-white/30 transition-colors focus:border-white focus:outline-none disabled:opacity-60";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInputCls} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${baseInputCls} resize-none leading-[1.6] py-3 ${props.className ?? ""}`}
    />
  );
}

export function Select({
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${baseInputCls} appearance-none pr-8 ${props.className ?? ""}`}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-white/40"
      >
        ▾
      </span>
    </div>
  );
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div role="radiogroup" className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-colors ${
              checked
                ? "border-white bg-white text-navy"
                : "border-hair-strong text-white hover:border-white/40"
            }`}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              required={required && !value}
              onChange={() => onChange?.(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}

export function FormSection({
  id,
  index,
  label,
  title,
  lede,
  children,
}: {
  id?: string;
  index: number | string;
  label: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  const indexLabel =
    typeof index === "number" ? String(index).padStart(2, "0") : index;
  return (
    <section
      id={id}
      data-apply-section=""
      className="border-t border-hair py-16 md:py-24"
    >
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <div className="sticky top-28 flex items-baseline gap-3">
            <span className="text-[11px] tabular-nums text-white/35">
              {indexLabel}
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-white/75">
              {label}
            </span>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <h2 className="text-[clamp(26px,2.6vw,34px)] font-medium leading-[1.15] tracking-[-0.018em] text-white text-balance">
            {title}
          </h2>
          {lede ? (
            <p className="mt-4 max-w-[54ch] text-[15px] leading-[1.55] text-white/60 text-balance">
              {lede}
            </p>
          ) : null}
          <div className="mt-12 flex flex-col gap-10">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function FieldGrid({
  children,
  cols = 2,
}: {
  children: ReactNode;
  cols?: 1 | 2 | 3;
}) {
  const cls =
    cols === 1
      ? "grid-cols-1"
      : cols === 3
        ? "grid-cols-1 md:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2";
  return <div className={`grid gap-8 ${cls}`}>{children}</div>;
}
