"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

/**
 * Editorial form primitives for the North Star application.
 *
 * Visual language:
 *   - Transparent inputs with a hairline bottom border (focus → white)
 *   - Monospace, uppercase labels sitting above the field
 *   - Small muted helper text below
 *   - No card chrome, no rounded boxes, no filled backgrounds
 */

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
  counter?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={htmlFor} className="eyebrow">
          {label}
          {required ? (
            <span className="ml-1.5 text-mute-2" aria-hidden>
              *
            </span>
          ) : (
            <span
              className="ml-2 font-mono text-[10.5px] normal-case tracking-[0.08em] text-mute-2"
              aria-hidden
            >
              (optional)
            </span>
          )}
        </label>
        {counter ? (
          <span className="eyebrow-sm text-mute-2 tabular-nums">
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? (
        <p className="text-[12.5px] leading-relaxed text-mute-2">{hint}</p>
      ) : null}
    </div>
  );
}

const baseInputCls =
  "w-full border-b border-hair-strong bg-transparent px-0 py-3 text-[16px] leading-[1.5] text-white placeholder:text-mute-2 transition-colors focus:border-white focus:outline-none";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInputCls} ${props.className ?? ""}`} />;
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${baseInputCls} resize-none leading-[1.6] ${props.className ?? ""}`}
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
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[11px] text-mute-2"
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
    <div role="radiogroup" className="flex flex-wrap gap-2.5">
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const checked = value === opt.value;
        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] tracking-[-0.005em] transition-colors ${
              checked
                ? "border-white bg-white text-navy"
                : "border-hair-strong text-white/85 hover:border-white/60 hover:text-white"
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
  index,
  label,
  title,
  lede,
  children,
}: {
  index: number | string;
  label: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-hair py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">
          <span className="mr-2.5 text-mute-2 tabular-nums">
            {typeof index === "number" ? `0${index}`.slice(-2) : index}
          </span>
          {label}
        </p>
        <h2 className="display-md mt-7 text-balance">{title}</h2>
        {lede ? (
          <p className="body-lg mx-auto mt-5 max-w-[58ch] text-balance">
            {lede}
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-12 md:mt-16">
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
  return <div className={`grid gap-x-8 gap-y-10 ${cls}`}>{children}</div>;
}
