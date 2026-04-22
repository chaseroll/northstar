"use client";

import { useState } from "react";
import {
  CharCounter,
  Field,
  FieldGrid,
  FormSection,
  RadioGroup,
  Select,
  TextArea,
  TextInput,
} from "./form-primitives";

type Status = "idle" | "submitting" | "success" | "error";

const STAGES = [
  { value: "idea", label: "Idea" },
  { value: "prototype", label: "Prototype" },
  { value: "beta", label: "Private beta" },
  { value: "launched", label: "Launched" },
  { value: "revenue", label: "Generating revenue" },
];

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

const GRANT_ASK = [
  "Under $10,000",
  "$10,000 – $25,000",
  "$25,000 – $50,000",
  "I don't know yet",
];

type CountedName =
  | "oneliner"
  | "what"
  | "problem"
  | "why_now"
  | "built"
  | "why_you"
  | "use_of_funds"
  | "milestones"
  | "extra";

const MAX: Record<CountedName, number> = {
  oneliner: 140,
  what: 1200,
  problem: 1200,
  why_now: 800,
  built: 800,
  why_you: 1200,
  use_of_funds: 1000,
  milestones: 1200,
  extra: 800,
};

export function ApplicationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [structure, setStructure] = useState<string>("solo");
  const [counts, setCounts] = useState<Record<CountedName, number>>({
    oneliner: 0,
    what: 0,
    problem: 0,
    why_now: 0,
    built: 0,
    why_you: 0,
    use_of_funds: 0,
    milestones: 0,
    extra: 0,
  });

  const track =
    (name: CountedName) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const length = e.currentTarget.value.length;
      setCounts((prev) =>
        prev[name] === length ? prev : { ...prev, [name]: length },
      );
    };

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
      setMessage("");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
      setMessage("Something went wrong — try again");
    }
  }

  if (status === "success") {
    return <SuccessState />;
  }

  const disabled = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* ───────────────────────────── 01 · Founder */}
      <FormSection
        id="founder"
        index={1}
        label="Founder"
        title="Tell us who you are"
        lede="You — the person (or lead founder) behind what you’re building. We read every application personally; answers here should sound like you, not a deck"
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
          <Field label="Phone" htmlFor="phone" hint="Optional, but helpful">
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
            hint="LinkedIn, GitHub, X, personal site — comma-separated is fine"
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
        id="team"
        index={2}
        label="Team"
        title="Are you building solo, or with co-founders?"
        lede="Solo is fine. Teams are also fine. If you have co-founders, list them below so we can review the whole team"
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
              hint="One per line. Name · email · role (e.g. Ada Lovelace · ada@uaustin.org · Engineering)"
            >
              <TextArea
                id="cofounders"
                name="cofounders"
                rows={4}
                placeholder={
                  "Ada Lovelace · ada@uaustin.org · Engineering\nCharles Babbage · charles@uaustin.org · Hardware"
                }
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
              <Field
                label="How long have you worked together?"
                htmlFor="worked"
              >
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
        id="company"
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
          <Field
            label="Website / URL"
            htmlFor="url"
            hint="If you have one yet"
          >
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
          hint="The shortest version you can write — imagine telling a stranger in an elevator"
          counter={<CharCounter current={counts.oneliner} max={MAX.oneliner} />}
        >
          <TextInput
            id="oneliner"
            name="oneliner"
            type="text"
            required
            maxLength={MAX.oneliner}
            placeholder="We’re building …"
            disabled={disabled}
            onChange={track("oneliner")}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 04 · What & why */}
      <FormSection
        id="what-why"
        index={4}
        label="What & why"
        title="Walk us through what you’re building"
        lede="Write like you’re explaining it to a smart friend. No jargon, no deck voice"
      >
        <Field
          label="What are you building?"
          required
          htmlFor="what"
          counter={<CharCounter current={counts.what} max={MAX.what} />}
        >
          <TextArea
            id="what"
            name="what"
            rows={5}
            required
            maxLength={MAX.what}
            placeholder="The product, roughly how it works, and who uses it"
            disabled={disabled}
            onChange={track("what")}
          />
        </Field>

        <Field
          label="What problem does it solve, and for whom?"
          required
          htmlFor="problem"
          counter={<CharCounter current={counts.problem} max={MAX.problem} />}
        >
          <TextArea
            id="problem"
            name="problem"
            rows={5}
            required
            maxLength={MAX.problem}
            placeholder="Who feels this problem, how they solve it today, and why that’s bad"
            disabled={disabled}
            onChange={track("problem")}
          />
        </Field>

        <Field
          label="Why now?"
          htmlFor="why_now"
          hint="What has changed in the world that makes this the right time"
          counter={<CharCounter current={counts.why_now} max={MAX.why_now} />}
        >
          <TextArea
            id="why_now"
            name="why_now"
            rows={4}
            maxLength={MAX.why_now}
            placeholder="A technology, behavior, regulation, cost curve — something that recently shifted"
            disabled={disabled}
            onChange={track("why_now")}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 05 · Progress */}
      <FormSection
        id="progress"
        index={5}
        label="Progress"
        title="Where is it today?"
        lede="Be honest — ‘idea on paper’ is a perfectly valid answer for a first cohort"
      >
        <FieldGrid cols={2}>
          <Field label="Stage" required htmlFor="stage">
            <Select
              id="stage"
              name="stage"
              required
              defaultValue=""
              disabled={disabled}
            >
              <option value="" disabled>
                Select…
              </option>
              {STAGES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
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
          counter={<CharCounter current={counts.built} max={MAX.built} />}
        >
          <TextArea
            id="built"
            name="built"
            rows={4}
            maxLength={MAX.built}
            placeholder="Prototypes, demos, landing pages, research, pilot conversations"
            disabled={disabled}
            onChange={track("built")}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 06 · Why you */}
      <FormSection
        id="why-you"
        index={6}
        label="Why you"
        title="Why are you the right person or team for this?"
      >
        <Field
          label="Why you?"
          required
          htmlFor="why_you"
          counter={<CharCounter current={counts.why_you} max={MAX.why_you} />}
        >
          <TextArea
            id="why_you"
            name="why_you"
            rows={5}
            required
            maxLength={MAX.why_you}
            placeholder="Background, obsessions, past projects, unfair advantages"
            disabled={disabled}
            onChange={track("why_you")}
          />
        </Field>

        <Field
          label="Time commitment"
          required
          htmlFor="hours"
          hint="Hours per week you can commit to NorthStar during the program"
        >
          <TextInput
            id="hours"
            name="hours"
            type="text"
            required
            placeholder="e.g. 25 hrs/week, full-time outside class"
            disabled={disabled}
          />
        </Field>

        <Field
          label="Are you currently enrolled at UATX?"
          required
          htmlFor="enrolled"
          hint="Admission requires active UATX enrollment for the duration of the program"
        >
          <RadioGroup
            name="enrolled"
            required
            options={[
              { value: "yes", label: "Yes, currently enrolled" },
              { value: "incoming", label: "Admitted, starting next term" },
              { value: "no", label: "Not enrolled" },
            ]}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 07 · Ask */}
      <FormSection
        id="ask"
        index={7}
        label="Ask"
        title="What are you asking NorthStar for?"
        lede="Grants are non-equity, up to $50,000 per company per year. The initial amount is set by the Executive Director based on stage, scope, and need"
      >
        <FieldGrid cols={2}>
          <Field label="Requested grant range" required htmlFor="ask_amount">
            <Select
              id="ask_amount"
              name="ask_amount"
              required
              defaultValue=""
              disabled={disabled}
            >
              <option value="" disabled>
                Select…
              </option>
              {GRANT_ASK.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Earliest start" htmlFor="start_date">
            <TextInput
              id="start_date"
              name="start_date"
              type="text"
              placeholder="e.g. next cycle, Fall 2026"
              disabled={disabled}
            />
          </Field>
        </FieldGrid>

        <Field
          label="How would you deploy the capital?"
          required
          htmlFor="use_of_funds"
          counter={
            <CharCounter current={counts.use_of_funds} max={MAX.use_of_funds} />
          }
        >
          <TextArea
            id="use_of_funds"
            name="use_of_funds"
            rows={4}
            required
            maxLength={MAX.use_of_funds}
            placeholder="Roughly how the money gets spent — compute, tools, components, contractors, pilots"
            disabled={disabled}
            onChange={track("use_of_funds")}
          />
        </Field>

        <Field
          label="Milestones you commit to in 6 months"
          required
          htmlFor="milestones"
          hint="These become your personalized milestones, reviewed monthly with the Executive Director"
          counter={
            <CharCounter current={counts.milestones} max={MAX.milestones} />
          }
        >
          <TextArea
            id="milestones"
            name="milestones"
            rows={5}
            required
            maxLength={MAX.milestones}
            placeholder="Be specific — users, revenue, shipped features, design partners"
            disabled={disabled}
            onChange={track("milestones")}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 08 · Video */}
      <FormSection
        id="video"
        index={8}
        label="Video"
        title="A one-minute introduction"
        lede="Record a short Loom or YouTube unlisted video of you (and any co-founders) explaining what you’re building. Phone camera is fine"
      >
        <Field
          label="Video URL"
          htmlFor="video_url"
          hint="Loom, YouTube unlisted, or Google Drive"
        >
          <TextInput
            id="video_url"
            name="video_url"
            type="url"
            placeholder="https://www.loom.com/share/…"
            disabled={disabled}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── 09 · Anything else */}
      <FormSection
        id="else"
        index={9}
        label="Anything else"
        title="Anything we should know that we haven’t asked?"
      >
        <Field
          label="Notes"
          htmlFor="extra"
          counter={<CharCounter current={counts.extra} max={MAX.extra} />}
        >
          <TextArea
            id="extra"
            name="extra"
            rows={5}
            maxLength={MAX.extra}
            placeholder="Context, concerns, questions, clarifications — whatever is on your mind"
            disabled={disabled}
            onChange={track("extra")}
          />
        </Field>
      </FormSection>

      {/* ───────────────────────────── Submit */}
      <div className="border-t border-hair py-20 md:py-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            Ready
          </p>
          <h2 className="text-[clamp(30px,3.4vw,44px)] font-medium leading-[1.05] tracking-[-0.02em] text-white text-balance">
            Submit your application
          </h2>
          <p className="max-w-[52ch] text-[15px] leading-[1.55] text-white/55 text-balance">
            Applications are reviewed on a rolling basis by the Executive
            Director of the Innovation Labs. You’ll hear back within two weeks
          </p>

          <button
            type="submit"
            disabled={disabled}
            className="mt-4 inline-flex h-12 items-center rounded-full bg-white px-8 text-[14px] font-medium tracking-tight text-navy transition-[transform,opacity,background-color] hover:bg-white/90 active:scale-[0.98] disabled:opacity-60"
          >
            {status === "submitting" ? "Submitting…" : "Submit application"}
          </button>

          <p className="text-[12px] text-white/40">
            By submitting, you confirm the information above is accurate to the
            best of your knowledge
          </p>

          <p
            className={`h-4 text-[12.5px] transition-opacity ${
              message ? "opacity-100" : "opacity-0"
            } ${status === "error" ? "text-red-300" : "text-white/55"}`}
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

function SuccessState() {
  const steps = [
    {
      marker: "T + 0",
      title: "Application received",
      body: "Your submission is logged and acknowledged",
    },
    {
      marker: "Week 1",
      title: "First-pass review",
      body: "The Innovation Labs team reads every application personally",
    },
    {
      marker: "Week 2",
      title: "Response",
      body: "You hear back either way — with a decision or an invitation to a follow-up conversation",
    },
  ];
  return (
    <div className="mx-auto max-w-2xl py-24 md:py-40">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
          Application received
        </p>
        <h2 className="mt-6 text-[clamp(36px,5vw,60px)] font-medium leading-[1] tracking-[-0.025em] text-white text-balance">
          Thank you — we have your submission
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] text-[15.5px] leading-[1.55] text-white/60 text-balance">
          A member of the Innovation Labs team will review your application and
          reach out within two weeks. Keep building in the meantime
        </p>
      </div>

      <ol className="mt-16 border-t border-hair">
        {steps.map((s) => (
          <li
            key={s.marker}
            className="grid grid-cols-12 gap-x-6 border-b border-hair py-6"
          >
            <span className="col-span-3 text-[11px] uppercase tracking-[0.16em] text-white/45 md:col-span-2">
              {s.marker}
            </span>
            <div className="col-span-9 md:col-span-10">
              <p className="text-[15px] font-medium text-white">{s.title}</p>
              <p className="mt-1 text-[14px] leading-[1.55] text-white/55">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
