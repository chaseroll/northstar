"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("success");
      setMessage("You’re on the list.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  }

  const disabled = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-12 w-full max-w-md"
      noValidate
    >
      <div className="flex items-center gap-1 rounded-full border border-hair-strong p-1.5 transition-colors focus-within:border-white/60">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@university.edu"
          disabled={disabled}
          className="body flex-1 bg-transparent px-5 py-2.5 text-white placeholder:text-mute-2 focus:outline-none focus-visible:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="inline-flex h-10 items-center rounded-full bg-white px-5 text-[13px] font-medium tracking-[-0.01em] text-navy transition-colors hover:bg-white/90 disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Notify me"}
        </button>
      </div>

      <p
        className={`mt-5 h-4 text-center text-[12px] leading-snug transition-opacity ${
          message ? "opacity-100" : "opacity-0"
        } ${status === "error" ? "text-red-300" : "text-mute"}`}
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {message || "·"}
      </p>
    </form>
  );
}
