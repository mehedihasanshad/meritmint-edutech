'use client';

import Link from 'next/link';
import { useState } from 'react';

const BKASH_NUMBER = '+8801522102652';
const BKASH_NUMBER_PLAIN = '01522102652';
const TELEGRAM_GROUP = 'https://t.me/+MeritMintAdmission';

export function PaymentSection() {
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(BKASH_NUMBER_PLAIN);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <section id="payment" className="section">
      <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="eyebrow">
            <span lang="bn">পেমেন্ট</span>
          </span>
          <h2 className="display-headline mt-4">
            <span lang="bn">bKash-এ পাঠাও।</span>
            <br />
            <span lang="bn" className="italic-serif accent-red">
              ২ মিনিটে access।
            </span>
          </h2>
        </div>
        <p className="max-w-md text-muted md:text-right" lang="bn">
          কোনো middle-man না, কোনো POS না। Send Money দাও, transaction ID
          course-এ submit করো, সঙ্গে সঙ্গে access + Telegram group।
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* bKash number card */}
        <div className="payment-card">
          <div className="payment-card-head">
            <BkashBadge />
            <span className="payment-kind" lang="bn">
              Send Money
            </span>
          </div>
          <p
            className="mt-5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-dim"
            lang="bn"
          >
            নিচের number-এ টাকা পাঠাও
          </p>
          <div className="payment-number-row">
            <span className="payment-number">{BKASH_NUMBER}</span>
            <button
              type="button"
              onClick={copyNumber}
              className="payment-copy"
              aria-label="Copy bKash number"
            >
              {copied ? (
                <>
                  <CheckIcon /> Copied
                </>
              ) : (
                <>
                  <CopyIcon /> Copy
                </>
              )}
            </button>
          </div>
          <p
            className="mt-3 text-xs italic-serif text-dim"
            lang="bn"
          >
            বিঃদ্রঃ — Cash-in / Payment না, শুধু <b>Send Money</b>। Reference-এ
            নিজের নাম বা course-এর নাম লিখে দিলে ভালো।
          </p>

          <hr className="rule my-6" />

          <div className="payment-steps">
            <Step
              n="১"
              title="Send Money"
              body="bKash app বা *247# থেকে উপরের number-এ Send Money দাও। আমাদের বলে দেওয়া amount অনুযায়ী।"
            />
            <Step
              n="২"
              title="Transaction ID কপি করো"
              body="Send Money শেষ হলে bKash message-এ একটা TrxID আসে (যেমন 8F9ABC1234)। সেটা সংরক্ষণ করো।"
            />
            <Step
              n="৩"
              title="Course-এ submit করো"
              body="ওপরের course card থেকে Buy-এ click করলে Transaction ID বসানোর box আসবে। ওখানে TrxID দিয়ে submit।"
            />
            <Step
              n="৪"
              title="Access + Telegram group"
              body="সঙ্গে সঙ্গে তোমার dashboard-এ course unlock হবে, আর admitted student-দের আলাদা Telegram group-এর invitation আসবে।"
            />
          </div>
        </div>

        {/* Side panel */}
        <div className="payment-side">
          <div className="payment-telegram">
            <div className="payment-telegram-icon" aria-hidden>
              <TelegramIcon />
            </div>
            <div>
              <div
                className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-dim"
                lang="bn"
              >
                Admitted students only
              </div>
              <h3 className="mt-1 font-display text-2xl leading-tight" lang="bn">
                Telegram group
              </h3>
              <p className="mt-2 text-sm text-muted" lang="bn">
                Live schedule, last-minute mock drop, mentor-এর direct
                reply, আর batch-mate-দের সাথে আড্ডা — সব এক জায়গায়।
                Payment verify হলে invitation-link automatically চলে যাবে।
              </p>
              <Link
                href={TELEGRAM_GROUP}
                target="_blank"
                rel="noreferrer"
                className="btn-pill btn-pill-ghost mt-5 text-sm"
              >
                <TelegramIcon small /> Group preview
              </Link>
            </div>
          </div>

          <div className="payment-note">
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] accent-red">
              সাহায্য লাগবে?
            </div>
            <p className="mt-2 text-sm text-muted" lang="bn">
              Payment কিংবা TrxID-তে কোনো ঝামেলা? WhatsApp-এ message করো —
              ৫ মিনিটের মধ্যে reply।
            </p>
            <Link
              href="https://wa.me/8801751589525"
              target="_blank"
              rel="noreferrer"
              className="btn-pill btn-pill-primary mt-4 text-sm"
            >
              WhatsApp · +8801751589525
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="payment-step">
      <div className="payment-step-num">{n}</div>
      <div className="payment-step-body">
        <div className="payment-step-title" lang="bn">
          {title}
        </div>
        <p className="payment-step-desc" lang="bn">
          {body}
        </p>
      </div>
    </div>
  );
}

/**
 * bKash brand badge — a stylized text/colour treatment (pink brand
 * colour #E2136E), not a reproduction of bKash's copyrighted logo.
 * Most merchant integrations use this exact text-plus-colour identity
 * when referencing the payment method.
 */
function BkashBadge() {
  return (
    <span className="bkash-badge">
      <span className="bkash-badge-dot" aria-hidden />
      <span className="bkash-badge-text">bKash</span>
    </span>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V5a2 2 0 0 1 2-2h10" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function TelegramIcon({ small }: { small?: boolean }) {
  const size = small ? 14 : 22;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21.5 4.1 2.6 11.4c-.9.3-.9 1.5 0 1.9l4.9 1.7 1.9 6c.2.7 1 1 1.6.5l2.8-2.2 5 3.7c.7.5 1.7.2 1.9-.7l3.4-16.3c.2-1.1-.9-2-1.9-1.8zM9.5 14.5l10.3-7.2-8.4 8.4-.4 3-1.5-4.2z" />
    </svg>
  );
}
