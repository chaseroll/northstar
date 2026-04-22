"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

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
    <div className={`flex flex-col items-center gap-2 text-center ${className}`}>
      <label
        htmlFor={htmlFor}
        className="text-[13px] italic tracking-[0.06em] text-white/70"
      >
        {label}
        {required ? (
          <span className="ml-1 text-white/30" aria-hidden>
            *
          </span>
        ) : (
          <span
            className="ml-2 text-[12px] normal-case tracking-normal text-white/30"
            aria-hidden
          >
            (optional)
          </span>
        )}
      </label>
      <div className="w-full">{children}</div>
      <div className="flex w-full items-baseline justify-center gap-3">
        {hint ? (
          <p className="text-[13px] italic leading-snug text-white/45">
            {hint}
          </p>
        ) : null}
        {counter ? (
          <span className="text-[11px] tabular-nums text-white/40">
            {counter}
          </span>
        ) : null}
      </div>
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
  "w-full border-b border-hair-strong bg-transparent px-0 py-3 text-center text-[17px] text-white placeholder:italic placeholder:text-white/30 transition-colors focus:border-white focus:outline-none disabled:opacity-60";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className={`${baseInputCls} ${props.className ?? ""}`} />
  );
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${baseInputCls} resize-none leading-[1.55] py-3 ${props.className ?? ""}`}
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
    <div
      role="radiogroup"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={`cursor-pointer rounded-full border px-5 py-2 text-[14px] italic transition-colors ${
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
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 text-center">
        <p className="flex items-baseline gap-2 text-[12px] italic tracking-[0.14em] text-white/55">
          <span className="tabular-nums text-white/30">{indexLabel}</span>
          <span className="text-white/20">·</span>
          <span>{label}</span>
        </p>
        <h2 className="text-[clamp(30px,3.4vw,44px)] font-normal italic leading-[1.1] tracking-[-0.005em] text-white text-balance">
          {title}
        </h2>
        {lede ? (
          <p className="mt-1 max-w-[50ch] text-[17px] leading-[1.55] text-white/60 text-balance">
            {lede}
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-14 flex w-full max-w-xl flex-col gap-12">
        {children}
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
  return <div className={`grid gap-10 ${cls}`}>{children}</div>;
}
