'use client';

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-xs text-text-secondary hover:text-foreground bg-background px-3 py-1.5 rounded-full border border-border hover:border-foreground/20 transition-colors"
    >
      Print
    </button>
  );
}
