"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";

/**
 * Editorial form primitives for the North Star application.
 *
 * Visual language (cream surface):
 *   - Transparent inputs with a hairline bottom border (focus → ink)
 *   - Outfit uppercase tracked labels in ink-mute
 *   - Small ink-mute-2 helper text + optional counter
 *   - No card chrome, no filled backgrounds — the form is just text
 *     on paper, the same voice as the Prospectus above it
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
        <label htmlFor={htmlFor} className="eyebrow text-ink-mute">
          {label}
          {required ? (
            <span className="ml-1.5 text-ink-mute-2" aria-hidden>
              *
            </span>
          ) : (
            <span
              className="ml-2 text-[10.5px] font-normal normal-case tracking-[0.08em] text-ink-mute-2"
              aria-hidden
            >
              optional
            </span>
          )}
        </label>
        {counter ? (
          <span className="eyebrow-sm text-ink-mute-2 tabular-nums">
            {counter}
          </span>
        ) : null}
      </div>
      {children}
      {hint ? (
        <p className="text-[12.5px] leading-relaxed text-ink-mute-2">{hint}</p>
      ) : null}
    </div>
  );
}

const baseInputCls =
  "w-full border-b border-ink-hair-strong bg-transparent px-0 py-3 text-[16px] leading-[1.5] text-ink placeholder:text-ink-mute-2 transition-colors focus:border-ink focus:outline-none";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`${baseInputCls} ${props.className ?? ""}`}
    />
  );
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
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-[11px] text-ink-mute-2"
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
                ? "border-ink bg-ink text-cream"
                : "border-ink-hair-strong text-ink hover:border-ink/60"
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

/**
 * FormSection — a plain editorial block. Just the question (serif
 * display) + an optional lede, then the fields. No "01 · Founder"
 * scaffolding above the question; the question itself tells you
 * what the section is.
 */
export function FormSection({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink-hair pt-14 first:border-t-0 first:pt-0 md:pt-20">
      <h2 className="display-md text-balance text-ink">{title}</h2>

      {lede ? (
        <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.65] text-ink-mute md:text-[17px]">
          {lede}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-10 md:mt-12 md:gap-12">
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
