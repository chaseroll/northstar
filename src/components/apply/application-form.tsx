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
      <div className="mx-auto max-w-2xl py-16 text-center md:py-24">
        <h2 className="display-lg text-balance text-ink">Received.</h2>
        <p className="body-lg mx-auto mt-6 max-w-[62ch] text-balance text-ink-mute">
          Reviewed by the Executive Director of the Innovation Labs. You’ll
          hear back within two weeks.
        </p>
      </div>
    );
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="mx-auto flex max-w-2xl flex-col">
        <FormSection
          title="Tell us who you are."
          lede="The person (or lead founder) behind what you’re building."
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

        <FormSection
          title="Are you building solo, or with co-founders?"
          lede="Solo is fine. If you have co-founders, list them below."
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

        <FormSection title="What are you calling it?">
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

        <FormSection
          title="Walk us through what you’re building."
          lede="Plain English. No deck voice."
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

        <FormSection
          title="Where is it today?"
          lede="Be honest. ‘Idea on paper’ is a valid answer."
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

        <FormSection title="Anything we should know that we haven’t asked?">
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

        {/* Submit */}
        <section className="border-t border-ink-hair pt-14 md:pt-20">
          <h2 className="display-md text-balance text-ink">
            Submit your application.
          </h2>
          <p className="mt-3 max-w-[62ch] text-[16px] leading-[1.65] text-ink-mute md:text-[17px]">
            Reviewed on a rolling basis. You’ll hear back within two weeks.
          </p>

          <button
            type="submit"
            disabled={disabled}
            className="mt-10 inline-flex h-12 items-center gap-3 rounded-full bg-ink px-7 text-[14px] font-medium tracking-[-0.005em] text-cream transition-colors hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
            {status === "idle" ? <span aria-hidden>→</span> : null}
          </button>

          <p
            className={`mt-5 h-4 text-[12px] leading-snug transition-opacity ${
              message ? "opacity-100" : "opacity-0"
            } ${status === "error" ? "text-red-600" : "text-ink-mute"}`}
            role={status === "error" ? "alert" : "status"}
            aria-live="polite"
          >
            {message || "·"}
          </p>
        </section>
      </div>
    </form>
  );
}
