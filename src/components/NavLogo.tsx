'use client';

import Image from 'next/image';
import Link from 'next/link';

export function NavLogo() {
  return (
    <Link href="/" className="nav-logo group" aria-label="MeritMint home">
      <span className="nav-logo-badge">
        <Image
          src="/logo-icon.png"
          alt="MeritMint"
          width={500}
          height={500}
          priority
          className="nav-logo-img"
        />
      </span>
      <span className="nav-logo-text">
        Merit<span className="nav-logo-accent">Mint</span>
      </span>
    </Link>
  );
}
