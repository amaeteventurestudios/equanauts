"use client";

export function SignalWaveform() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-12 text-cyan"
      viewBox="0 0 64 18"
      fill="none"
    >
      <path
        className="signal-wave"
        d="M1 9H13L16 6L20 12L24 4L30 15L35 8H45L48 6L52 12L56 3L62 14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
