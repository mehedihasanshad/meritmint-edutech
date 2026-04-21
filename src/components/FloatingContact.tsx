'use client';

import { useEffect, useState } from 'react';

const WHATSAPP_NUMBER = '+8801751589525';
const WHATSAPP_HREF = 'https://wa.me/8801751589525';
const YOUTUBE_HREF = 'https://www.youtube.com/@ConnectXmeritmint';
const FACEBOOK_HREF = 'https://facebook.com/ConnectXmeritmint';

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  return (
    <div className={`fab-root ${open ? 'fab-open' : ''}`}>
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="fab-item fab-wa"
        aria-label={`WhatsApp ${WHATSAPP_NUMBER}`}
        style={{ transitionDelay: open ? '60ms' : '0ms' }}
      >
        <IconWhatsApp />
        <span className="fab-label">
          <span className="fab-label-top">WhatsApp</span>
          <span className="fab-label-sub">{WHATSAPP_NUMBER}</span>
        </span>
      </a>

      <a
        href={FACEBOOK_HREF}
        target="_blank"
        rel="noreferrer"
        className="fab-item fab-fb"
        aria-label="Facebook — ConnectXmeritmint"
        style={{ transitionDelay: open ? '120ms' : '0ms' }}
      >
        <IconFacebook />
        <span className="fab-label">
          <span className="fab-label-top">Facebook</span>
          <span className="fab-label-sub">Admission community</span>
        </span>
      </a>

      <a
        href={YOUTUBE_HREF}
        target="_blank"
        rel="noreferrer"
        className="fab-item fab-yt"
        aria-label="YouTube — ConnectXmeritmint"
        style={{ transitionDelay: open ? '180ms' : '0ms' }}
      >
        <IconYouTube />
        <span className="fab-label">
          <span className="fab-label-top">YouTube</span>
          <span className="fab-label-sub">@ConnectXmeritmint</span>
        </span>
      </a>

      <button
        type="button"
        className="fab-toggle"
        aria-label={open ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="fab-toggle-pulse" aria-hidden />
        <span className={`fab-icon ${open ? 'fab-icon-hide' : ''}`}>
          <IconChat />
        </span>
        <span className={`fab-icon ${open ? '' : 'fab-icon-hide'}`}>
          <IconClose />
        </span>
      </button>
    </div>
  );
}

function IconChat() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20 12a8 8 0 1 1-14.5 4.7L4 20l3.4-1.3A8 8 0 0 1 20 12zm-5 2.1c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.7.8c-.1.1-.3.2-.5.1a6 6 0 0 1-1.8-1.1 7 7 0 0 1-1.2-1.6c-.1-.2 0-.3.1-.4l.3-.4.2-.3c.1-.1 0-.2 0-.3 0-.1-.5-1.1-.6-1.5-.2-.4-.3-.3-.5-.3h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 3.9 3.4 1.5.6 2.1.6 2.8.5.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1l-.3-.1z" />
    </svg>
  );
}
function IconYouTube() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22 7.5s-.2-1.5-.8-2.1c-.8-.8-1.7-.9-2.1-1C16 4 12 4 12 4s-4 0-7.1.4c-.4.1-1.3.2-2.1 1C2.2 6 2 7.5 2 7.5S1.8 9.3 1.8 11v1.5c0 1.7.2 3.4.2 3.4s.2 1.5.8 2.1c.8.8 1.9.8 2.4.9 1.7.2 7.3.4 7.3.4s4 0 7.1-.4c.4-.1 1.3-.2 2.1-1 .6-.6.8-2.1.8-2.1s.2-1.7.2-3.4V11c0-1.7-.2-3.4-.2-3.4zM10 15V9l5 3z" />
    </svg>
  );
}
function IconFacebook() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 22v-8h3l1-4h-4V7.5c0-1.2.5-2 2-2h2V2h-3c-3 0-5 2-5 5v3H6v4h3v8z" />
    </svg>
  );
}
