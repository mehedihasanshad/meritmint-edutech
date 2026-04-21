'use client';

import Image from 'next/image';

type Bubble = {
  src: string;
  alt: string;
  name: string;
  tag: string;
  role: 'alumni' | 'mentor';
  /** Position in % of the container */
  x: number;
  y: number;
  /** Diameter in rem */
  size: number;
  /** object-position for circular crop to land on the face */
  objectPosition?: string;
  /** Animation delay (s) so each bubble floats out of sync */
  delay: number;
  /** Float duration (s) */
  duration: number;
};

const BUBBLES: Bubble[] = [
  {
    src: '/alumni-portrait.jpg',
    alt: 'MHS Shad — Lead Mentor & Coordinator',
    name: 'MHS Shad',
    tag: 'Lead Mentor · Coordinator',
    role: 'mentor',
    x: 34,
    y: 32,
    size: 8.5,
    objectPosition: 'center 22%',
    delay: 0,
    duration: 9.5,
  },
  {
    src: '/alumni-faizul.jpg',
    alt: 'Faizul Kabir — DU B Unit Winner 2023-24',
    name: 'Faizul Kabir',
    tag: 'DU · B unit · 23-24',
    role: 'alumni',
    x: 2,
    y: 6,
    size: 6.2,
    objectPosition: '50% 38%',
    delay: -1.6,
    duration: 8.2,
  },
  {
    src: '/alumni-ramisha.jpg',
    alt: 'Ramisha Anjum Nayla — DU B Unit Winner 2023-24',
    name: 'Ramisha Anjum Nayla',
    tag: 'DU · B unit · 23-24',
    role: 'alumni',
    x: 66,
    y: 2,
    size: 6.6,
    objectPosition: '50% 42%',
    delay: -3.1,
    duration: 8.6,
  },
  {
    src: '/alumni-jamilah.jpg',
    alt: 'Jamilah Tahsin Prapty — DU B Unit Winner 2023-24',
    name: 'Jamilah Tahsin Prapty',
    tag: 'DU · B unit · 23-24',
    role: 'alumni',
    x: 62,
    y: 62,
    size: 6.0,
    objectPosition: '50% 38%',
    delay: -4.8,
    duration: 7.8,
  },
  {
    src: '/alumni-junaid-result.jpg',
    alt: 'Junaid Bin Hasan — merit position 61',
    name: 'Junaid Bin Hasan',
    tag: 'Merit 61 · Marketing',
    role: 'alumni',
    x: 0,
    y: 62,
    size: 5.6,
    objectPosition: '50% 24%',
    delay: -6.4,
    duration: 8.4,
  },
];

export function AlumniBubbles() {
  return (
    <div
      className="alumni-bubbles"
      aria-label="Students who ranked through MeritMint + coordinator"
    >
      <div className="alumni-bubbles-aura" aria-hidden />
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          className={`alumni-bubble role-${b.role}`}
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}rem`,
            height: `${b.size}rem`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <div className="alumni-bubble-inner">
            <Image
              src={b.src}
              alt={b.alt}
              width={720}
              height={720}
              quality={92}
              className="alumni-bubble-img"
              style={{ objectPosition: b.objectPosition }}
              sizes="(max-width: 900px) 8rem, 10rem"
            />
            {b.role === 'mentor' && (
              <span className="alumni-bubble-crown" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 18h18v2H3v-2zM5 8l4 4 3-8 3 8 4-4v8H5V8z" />
                </svg>
              </span>
            )}
          </div>
          <div className="alumni-bubble-label" aria-hidden>
            <span className="alumni-bubble-name">{b.name}</span>
            <span className="alumni-bubble-tag">{b.tag}</span>
          </div>
        </div>
      ))}
      <span className="alumni-bubbles-caption">
        <span className="alumni-bubbles-caption-dot" aria-hidden />
        <span data-lang-only="en">Hall of Fame</span>
        <span data-lang-only="bn" lang="bn">
          Hall of Fame
        </span>
      </span>
    </div>
  );
}
