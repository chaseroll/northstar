"use client";

import { useState } from "react";
import {
  Field,
  FieldGrid,
  FormSection,
  RadioGroup,
  Select,
  TextArea,
  TextInput,
} from "./form-primitives";

type Status = "idle" | "submitting" | "success" | "error";

const TEAM_STRUCTURE = [
  { value: "solo", label: "Solo founder" },
  { value: "team", label: "Team of co-founders" },
];

const CATEGORIES = [
  "AI / ML",
  "Consumer",
  "SaaS",
  "Developer tools",
  "Fintech",
  "Biotech / Health",
  "Hardware / Robotics",
  "Climate / Energy",
  "Marketplace",
  "Other",
];

const CLASS_YEARS = [
  "Undergraduate — Year 1",
  "Undergraduate — Year 2",
  "Undergraduate — Year 3",
  "Undergraduate — Year 4",
  "Graduate",
  "Other",
];

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [structure, setStructure] = useState<string>("solo");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setMessage("Application received. We’ll be in touch.");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-3xl py-28 text-center md:py-40">
        <p className="eyebrow mb-8">Application received</p>
        <h2 className="display-lg text-balance">
          Thank you. We have your submission
        </h2>
        <p className="body-lg mx-auto mt-10 max-w-[58ch] text-balance">
          A member of the Innovation Labs team will review your application
          and reach out within two weeks. Keep building in the meantime.
        </p>
      </div>
    );
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* ───────────────────────────── 01 · Founder */}
      <FormSection
        index={1}
        label="Founder"
        title="Tell us who you are."
        lede="You — the person (or lead founder) behind what you’re building. We review every application; answers here should be you, not a deck voice."
      >
        <FieldGrid cols={2}>
          <Field label="Full name" required htmlFor="name">
            <TextInput
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Ada Lovelace"
              disabled={disabled}
            />
          </Field>
          <Field label="UATX email" required htmlFor="email">
            <TextInput
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@uaustin.org"
              disabled={disabled}
            />
          </Field>
          <Field label="Phone" htmlFor="phone" hint="Optional, but helpful.">
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(512) 555-0100"
              disabled={disabled}
            />
          </Field>
          <Field label="Class year" required htmlFor="class_year">
            <Select
              id="class_year"
              name="class_year"
              required
              defaultValue=""
              disabled={disabled}
            >
              <option value="" disabled>
                Select…
              </option>
              {CLASS_YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Major / concentration" required htmlFor="major">
            <TextInput
              id="major"
              name="major"
              type="text"
              required
              placeholder="e.g. Computer Science, Economics"
              disabled={disabled}
            />
          </Field>
          <Field
            label="Links"
            htmlFor="links"
            hint="LinkedIn, GitHub, X, personal site — one per line is fine."
          >
            <TextInput
              id="links"
              name="links"
              type="text"
              placeholder="github.com/you, linkedin.com/in/you"
              disabled={disabled}
            />
          </Field>
        </FieldGrid>
      </FormSection>

      {/* ───────────────────────────── 02 · Team */}
      <FormSection
        index={2}
        label="Team"
        title="Are you building solo, or with co-founders?"
        lede="Solo is fine. Teams are also fine. If you have co-founders, list them below so we can review the whole team."
      >
        <Field label="Team structure" required>
          <RadioGroup
            name="team_structure"
            options={TEAM_STRUCTURE}
            value={structure}
            onChange={setStructure}
            required
          />
        </Field>

        {structure === "team" ? (
          <>
            <Field
              label="Co-founders"
              htmlFor="cofounders"
              hint="One per line. Name · email · role (e.g. Ada Lovelace · ada@uaustin.org · Engineering)."
            >
              <TextArea
                id="cofounders"
                name="cofounders"
                rows={4}
                placeholder={"Ada Lovelace · ada@uaustin.org · Engineering\nCharles Babbage · charles@uaustin.org · Hardware"}
                disabled={disabled}
              />
            </Field>
            <FieldGrid cols={2}>
              <Field label="How did you meet?" htmlFor="met">
                <TextInput
                  id="met"
                  name="met"
                  type="text"
                  placeholder="Class, club, hackathon, high school…"
                  disabled={disabled}
                />
              </Field>
              <Field label="How long have you worked together?" htmlFor="worked">
                <TextInput
                  id="worked"
                  name="worked"
                  type="text"
                  placeholder="e.g. 6 months, 2 years"
                  disabled={disabled}
                />
              </Field>
            </FieldGrid>
          </>
        ) : null}
      </FormSection>

      {/* ───────────────────────────── 03 · Company */}
      <FormSection
        index={3}
        label="Company"
        title="What are you calling it?"
      >
        <FieldGrid cols={2}>
          <Field label="Company name" required htmlFor="company">
            <TextInput
              id="company"
              name="company"
              type="text"
              required
              placeholder="Working title is fine"
              disabled={disabled}
            />
          </Field>
          <Field label="Website / URL" htmlFor="url" hint="If you have one yet.">
            <TextInput
              id="url"
              name="url"
              type="url"
              placeholder="https://"
              disabled={disabled}
            />
          </Field>
          <Field label="Category" required htmlFor="category">
            <Select
              id="category"
              name="category"
              required
              defaultValue=""
              disabled={disabled}
            >
              <option value="" disabled>
                Select…
              </option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Location" htmlFor="location">
            <TextInput
              id="location"
              name="location"
              type="text"
              defaultValue="Austin, TX"
              disabled={disabled}
            />
          </Field>
        </FieldGrid>

        <Field
          label="One-line description"
          required
          htmlFor="oneliner"
          hint="The shortest version you can write. Imagine telling a stranger in an elevator."
          counter="max 140"
        >
          <TextInput
            id="oneliner"
            name="oneliner"
            type="text"
            required
            maxLength={140}
            placeholder="We’re building …"
            disabled={disabled}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 04 · What & why */}
      <FormSection
        index={4}
        label="What & why"
        title="Walk us through what you’re building."
        lede="Write like you’re explaining it to a smart friend. No jargon, no deck voice."
      >
        <Field
          label="What are you building?"
          required
          htmlFor="what"
          counter="aim ~ 500 chars"
        >
          <TextArea
            id="what"
            name="what"
            rows={5}
            required
            maxLength={1200}
            placeholder="The product, roughly how it works, and who uses it."
            disabled={disabled}
          />
        </Field>

        <Field
          label="What problem does it solve, and for whom?"
          required
          htmlFor="problem"
          counter="aim ~ 500 chars"
        >
          <TextArea
            id="problem"
            name="problem"
            rows={5}
            required
            maxLength={1200}
            placeholder="Who feels this problem, how they solve it today, and why that’s bad."
            disabled={disabled}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 05 · Progress */}
      <FormSection
        index={5}
        label="Progress"
        title="Where is it today?"
        lede="Be honest. ‘Idea on paper’ is a perfectly valid answer for a first cohort."
      >
        <FieldGrid cols={2}>
          <Field label="Stage" required htmlFor="stage">
            <TextInput
              id="stage"
              name="stage"
              type="text"
              required
              placeholder="e.g. Idea on paper, prototype, private beta, $4k ARR"
              disabled={disabled}
            />
          </Field>
          <Field label="Users (if any)" htmlFor="users">
            <TextInput
              id="users"
              name="users"
              type="text"
              placeholder="e.g. 12 pilot users, 0, 3,000 MAU"
              disabled={disabled}
            />
          </Field>
          <Field label="Revenue (if any)" htmlFor="revenue">
            <TextInput
              id="revenue"
              name="revenue"
              type="text"
              placeholder="e.g. $0, $200/mo, $4k in LOIs"
              disabled={disabled}
            />
          </Field>
          <Field label="Prior funding" htmlFor="prior_funding">
            <TextInput
              id="prior_funding"
              name="prior_funding"
              type="text"
              placeholder="e.g. None, $3k UATX micro-grant, $25k angel"
              disabled={disabled}
            />
          </Field>
        </FieldGrid>

        <Field
          label="What have you already built or shipped?"
          htmlFor="built"
          counter="aim ~ 300 chars"
        >
          <TextArea
            id="built"
            name="built"
            rows={4}
            maxLength={800}
            placeholder="Prototypes, demos, landing pages, research, pilot conversations."
            disabled={disabled}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 06 · Anything else */}
      <FormSection
        index={6}
        label="Anything else"
        title="Anything we should know that we haven’t asked?"
      >
        <Field label="Notes" htmlFor="extra" counter="max 800 chars">
          <TextArea
            id="extra"
            name="extra"
            rows={5}
            maxLength={800}
            placeholder="Context, concerns, questions, clarifications — whatever is on your mind."
            disabled={disabled}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── Submit */}
      <div className="border-t border-hair py-20 md:py-28">
        <div className="shell mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <p className="eyebrow">Ready</p>
          <h2 className="display-lg text-balance">
            Submit your application
          </h2>
          <p className="body-lg mx-auto max-w-[58ch] text-balance">
            Applications are reviewed on a rolling basis by the Executive
            Director of the Innovation Labs. You’ll hear back within two
            weeks.
          </p>

          <button
            type="submit"
            disabled={disabled}
            className="mt-4 inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90 disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
          </button>

          <p
            className={`h-4 text-[12px] leading-snug transition-opacity ${
              message ? "opacity-100" : "opacity-0"
            } ${status === "error" ? "text-red-300" : "text-mute"}`}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message || "·"}
          </p>
        </div>
      </div>
    </form>
  );
}
