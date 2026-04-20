'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NavLogo } from './NavLogo';
import { LogoutButton } from './LogoutButton';
import { ThemeToggle } from './ThemeToggle';

const LINKS: { href: string; label: string; bn: string }[] = [
  { href: '/#exams', label: 'Mocks', bn: 'Mock' },
  { href: '/#how', label: 'How it works', bn: 'কীভাবে' },
  { href: '/#courses', label: 'Courses', bn: 'কোর্স' },
  { href: '/#pricing', label: 'Pricing', bn: 'দাম' },
  { href: '/#faq', label: 'FAQ', bn: 'FAQ' },
  { href: '/#connect', label: 'Contact', bn: 'যোগাযোগ' },
];

type Props = {
  username: string | null;
  isAdminUser: boolean;
};

export function MainNav({ username, isAdminUser }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', esc);
    };
  }, [open]);

  return (
    <>
      <NavLogo />

      <nav className="nav-links" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nav-actions">
        {username ? (
          <>
            <span className="hidden text-xs text-muted lg:inline">
              Hi, <span className="text-fg">{username}</span>
            </span>
            {isAdminUser && (
              <Link href="/admin" className="btn-ghost hidden sm:inline-flex">
                Admin
              </Link>
            )}
            <Link href="/dashboard" className="btn-ghost hidden sm:inline-flex">
              Dashboard
            </Link>
            <span className="hidden sm:inline-flex">
              <LogoutButton />
            </span>
          </>
        ) : (
          <Link
            href="/login"
            className="btn-pill btn-pill-primary hidden px-4 py-2 text-sm sm:inline-flex"
          >
            Get started
          </Link>
        )}
        <ThemeToggle />
        <button
          type="button"
          className="nav-burger md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`burger-bar ${open ? 'burger-bar-top' : ''}`} />
          <span className={`burger-bar ${open ? 'burger-bar-mid' : ''}`} />
          <span className={`burger-bar ${open ? 'burger-bar-bot' : ''}`} />
        </button>
      </div>

      <div
        className={`mobile-sheet ${open ? 'mobile-sheet-open' : ''}`}
        onClick={() => setOpen(false)}
      >
        <div
          className="mobile-sheet-inner"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-label="Menu"
        >
          <ul className="mobile-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="mobile-link"
                >
                  <span>{l.label}</span>
                  <span className="mobile-link-bn" lang="bn">
                    {l.bn}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-actions">
            {username ? (
              <>
                {isAdminUser && (
                  <Link href="/admin" className="btn-pill btn-pill-ghost w-full">
                    Admin
                  </Link>
                )}
                <Link
                  href="/dashboard"
                  className="btn-pill btn-pill-ghost w-full"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </>
            ) : (
              <Link
                href="/login"
                className="btn-pill btn-pill-primary w-full"
                onClick={() => setOpen(false)}
              >
                Get started
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
