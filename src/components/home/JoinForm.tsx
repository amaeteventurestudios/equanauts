"use client";

import { useState } from "react";

export function JoinForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="border border-cyan/35 bg-cyan/8 p-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">
          Access Request Logged
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-foam">Archive review pending.</h2>
        <p className="mt-3 text-foam/70">
          Your request has been recorded locally for v1. Backend routing can be connected when the archive opens wider.
        </p>
      </div>
    );
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {[
        ["name", "Name", "text"],
        ["email", "Email", "email"],
        ["organization", "Optional organization / role", "text"],
      ].map(([id, label, type]) => (
        <label key={id} className="grid gap-2 text-left text-sm text-foam/75">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold">{label}</span>
          <input
            id={id}
            name={id}
            type={type}
            required={id !== "organization"}
            className="min-h-11 border border-gold/25 bg-black/35 px-4 text-base text-foam outline-none transition focus:border-cyan"
          />
        </label>
      ))}
      <label className="grid gap-2 text-left text-sm text-foam/75">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-gold">
          Reason for access
        </span>
        <textarea
          name="reason"
          required
          rows={5}
          className="border border-gold/25 bg-black/35 px-4 py-3 text-base text-foam outline-none transition focus:border-cyan"
        />
      </label>
      <button
        type="submit"
        className="mt-2 min-h-11 border border-gold bg-gold px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-abyss transition hover:bg-gold-soft"
      >
        REQUEST ACCESS
      </button>
    </form>
  );
}
