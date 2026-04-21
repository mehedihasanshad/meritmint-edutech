import type { ReactNode } from 'react';

/**
 * Render two language variants; CSS [data-lang] on <html> shows whichever
 * matches the user's current preference. Works in server components too —
 * no hydration mismatch because both branches are always in the DOM and
 * only one is visible via CSS display:none.
 */
export function Lang({ en, bn }: { en: ReactNode; bn: ReactNode }) {
  return (
    <>
      <span data-lang-only="en">{en}</span>
      <span data-lang-only="bn" lang="bn">
        {bn}
      </span>
    </>
  );
}
