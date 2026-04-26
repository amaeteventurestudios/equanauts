"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

export function HomeArchiveAccess() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="home-access-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      {submitted ? (
        <div className="access-confirmation">
          <strong>ACCESS REQUEST RECEIVED</strong>
          <span>TRANSMISSION CHANNEL PENDING</span>
        </div>
      ) : (
        <>
          <input type="email" required placeholder="Enter your email address" aria-label="Email address" />
          <button type="submit">
            REQUEST ACCESS <ArrowRight size={17} />
          </button>
        </>
      )}
    </form>
  );
}
