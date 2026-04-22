"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function InterestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [isNotifyHover, setIsNotifyHover] = useState(false);

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
      className="mx-auto mt-10 w-full max-w-md"
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
          placeholder="you@student.uaustin.org"
          disabled={disabled}
          className="body flex-1 !appearance-none !border-0 !bg-transparent px-5 py-2.5 !text-white placeholder:!text-mute-2 !shadow-none !outline-none !ring-0 [box-shadow:none!important] focus:!border-0 focus:!outline-none focus:!ring-0 focus:[box-shadow:none!important] focus-visible:!border-0 focus-visible:!outline-none focus-visible:!ring-0 focus-visible:[box-shadow:none!important] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={disabled}
          onMouseEnter={() => setIsNotifyHover(true)}
          onMouseLeave={() => setIsNotifyHover(false)}
          className="group relative inline-flex h-10 items-center justify-center rounded-full border border-white/55 bg-transparent px-5 text-[13px] font-medium tracking-tight text-white transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white/8 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_10px_24px_-16px_rgba(255,255,255,0.55)] active:translate-y-0 disabled:opacity-60"
        >
          <span className="relative z-10">
            {status === "submitting" ? "Sending…" : "Notify me"}
          </span>
          <motion.svg
            aria-hidden
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={isNotifyHover && !disabled ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <motion.rect
              x="1"
              y="1"
              width="98"
              height="38"
              rx="19"
              fill="none"
              stroke="rgba(255,255,255,0.98)"
              strokeWidth="1.25"
              strokeLinecap="round"
              style={{
                filter:
                  "drop-shadow(0 0 5px rgba(255,255,255,0.92)) drop-shadow(0 0 12px rgba(255,255,255,0.45))",
              }}
              initial={{ opacity: 0, scale: 1 }}
              animate={
                isNotifyHover && !disabled
                  ? { opacity: [0.35, 0.95, 0.35], scale: [1, 1.004, 1] }
                  : { opacity: 0, scale: 1 }
              }
              transition={
                isNotifyHover && !disabled
                  ? { duration: 1.25, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 0.2, ease: "easeOut" }
              }
            />
          </motion.svg>
        </button>
      </div>

      <p
        className={`mt-4 h-4 text-center text-[12px] transition-opacity ${
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
