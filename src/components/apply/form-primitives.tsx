"use client";

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from "react";

/**
 * Editorial form primitives for the NorthStar application.
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
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={htmlFor} className="eyebrow">
          {label}
          {required ? (
            <span className="ml-1 text-mute-2" aria-hidden>
              *
            </span>
          ) : (
            <span className="ml-2 text-mute-2 normal-case tracking-normal" aria-hidden>
              (optional)
            </span>
          )}
        </label>
        {counter ? (
          <span className="eyebrow !text-[10px] text-mute-2 tabular-nums">
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? <p className="text-[13px] leading-snug text-mute-2">{hint}</p> : null}
    </div>
  );
}

const baseInputCls =
  "w-full border-b border-hair-strong bg-transparent px-0 py-3 text-[16px] text-white placeholder:text-mute-2 transition-colors focus:border-white focus:outline-none";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${baseInputCls} ${props.className ?? ""}`} />;
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
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-mute-2"
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
                : "border-hair-strong text-white hover:border-white/60"
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
    <section className="border-t border-hair py-16 md:py-24">
      <div className="grid grid-cols-12 gap-x-8 gap-y-10">
        <div className="col-span-12 md:col-span-3">
          <p className="eyebrow sticky top-24">
            <span className="mr-2 text-mute-2 tabular-nums">
              {typeof index === "number" ? `0${index}`.slice(-2) : index}
            </span>
            {label}
          </p>
        </div>

        <div className="col-span-12 md:col-span-9 md:col-start-4">
          <h2 className="display-md text-balance">{title}</h2>
          {lede ? (
            <p className="body mt-4 max-w-[54ch] text-balance">{lede}</p>
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
