'use client';

import Image from 'next/image';

export function HeroLogo() {
  return (
    <div className="hero-logo-wrap group">
      <div className="hero-logo-glass">
        <div className="hero-logo-shine" aria-hidden />
        <Image
          src="/logo.png"
          alt="MeritMint — Tension Gone. Grades On."
          width={500}
          height={500}
          priority
          className="hero-logo-img"
        />
      </div>
    </div>
  );
}
