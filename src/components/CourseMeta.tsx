'use client';

import { DigitStack, useCountdown } from './FlipClock';

export type CourseStatus = 'live' | 'upcoming';

export type CourseMetaProps = {
  status: CourseStatus;
  startDate: string;
  deadline?: number;
  seatsTotal: number;
  seatsFilled: number;
  enrolled: number;
};

export function CourseMeta({
  status,
  startDate,
  deadline,
  seatsTotal,
  seatsFilled,
  enrolled,
}: CourseMetaProps) {
  const cd = useCountdown(deadline ?? 0);
  const pct = Math.min(100, Math.round((seatsFilled / seatsTotal) * 100));
  const seatsLeft = Math.max(0, seatsTotal - seatsFilled);

  return (
    <div className="course-meta">
      <div className="course-meta-row">
        <StatusBadge status={status} />
        <span className="course-meta-dot">·</span>
        <span className="course-meta-date" lang="bn">
          {status === 'live' ? (
            <>
              <span data-lang-only="en">Started</span>
              <span data-lang-only="bn" lang="bn">
                শুরু হয়েছে
              </span>{' '}
              · {startDate}
            </>
          ) : (
            <>
              <span data-lang-only="en">Starts</span>
              <span data-lang-only="bn" lang="bn">
                শুরু
              </span>{' '}
              · {startDate}
            </>
          )}
        </span>
      </div>

      {deadline !== undefined && !cd.expired && (
        <div className="course-countdown">
          <div className="course-countdown-label">
            <span data-lang-only="en">Admission closes in</span>
            <span data-lang-only="bn" lang="bn">
              ভর্তির সময় বাকি
            </span>
          </div>
          <div className="course-countdown-row">
            <MiniSegment value={cd.days} label="d" bnLabel="দি" />
            <span className="course-countdown-colon">:</span>
            <MiniSegment value={cd.hours} label="h" bnLabel="ঘ" />
            <span className="course-countdown-colon">:</span>
            <MiniSegment value={cd.minutes} label="m" bnLabel="মি" />
            <span className="course-countdown-colon">:</span>
            <MiniSegment value={cd.seconds} label="s" bnLabel="সে" />
          </div>
        </div>
      )}

      <div className="course-seats">
        <div className="course-seats-bar" aria-hidden>
          <div
            className={`course-seats-fill ${pct >= 85 ? 'is-hot' : ''}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="course-seats-meta" lang="bn">
          <span>
            <b className="accent-red">
              {seatsLeft === 0 ? (
                <>
                  <span data-lang-only="en">Full</span>
                  <span data-lang-only="bn" lang="bn">
                    পূর্ণ
                  </span>
                </>
              ) : (
                <>
                  {seatsLeft}{' '}
                  <span data-lang-only="en">seats left</span>
                  <span data-lang-only="bn" lang="bn">
                    সিট বাকি
                  </span>
                </>
              )}
            </b>{' '}
            · {seatsFilled}/{seatsTotal}
          </span>
          <span className="course-enrolled">
            {enrolled.toLocaleString('en-US')}+ enrolled
          </span>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: CourseStatus }) {
  if (status === 'live') {
    return (
      <span className="status-badge status-live">
        <span className="status-dot" aria-hidden />
        <span data-lang-only="en">LIVE</span>
        <span data-lang-only="bn" lang="bn">
          চলছে
        </span>
      </span>
    );
  }
  return (
    <span className="status-badge status-upcoming">
      <span className="status-dot" aria-hidden />
      <span data-lang-only="en">UPCOMING</span>
      <span data-lang-only="bn" lang="bn">
        শীঘ্রই
      </span>
    </span>
  );
}

function MiniSegment({
  value,
  label,
  bnLabel,
}: {
  value: number;
  label: string;
  bnLabel: string;
}) {
  const text = String(Math.max(0, value)).padStart(2, '0');
  return (
    <span className="course-countdown-seg">
      <DigitStack text={text} />
      <span className="course-countdown-unit">
        <span data-lang-only="en">{label}</span>
        <span data-lang-only="bn" lang="bn">
          {bnLabel}
        </span>
      </span>
    </span>
  );
}
