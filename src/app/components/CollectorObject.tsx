type CollectorObjectProps = {
  kind: string;
  className?: string;
};

export function CollectorObject({ kind, className = '' }: CollectorObjectProps) {
  const classes = ['gp-object', `gp-object--${kind}`, className].filter(Boolean).join(' ');

  if (kind === 'coins') {
    return (
      <svg className={classes} viewBox="0 0 160 120" aria-hidden="true">
        <circle cx="80" cy="60" r="45" fill="currentColor" opacity=".13" />
        <circle cx="80" cy="60" r="39" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="80" cy="60" r="31" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".62" />
        <path
          d="M80 35 86 51l17 1-13 10 5 17-15-9-15 9 5-17-13-10 17-1Z"
          fill="currentColor"
          opacity=".78"
        />
        <path d="M49 90c17 8 45 8 62 0" fill="none" stroke="currentColor" strokeWidth="2" opacity=".55" />
      </svg>
    );
  }

  if (kind === 'diecast') {
    return (
      <svg className={classes} viewBox="0 0 180 120" aria-hidden="true">
        <path
          d="M27 73 39 54c4-7 11-11 20-12l42-4c8-1 14 2 20 7l18 17 16 4c5 1 8 5 8 10v11H24V78c0-2 1-4 3-5Z"
          fill="currentColor"
          opacity=".2"
        />
        <path
          d="M31 74 43 56c4-6 10-9 17-10l41-4c7-1 12 1 17 6l18 17 19 5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="m61 47-9 18h70l-21-22" fill="none" stroke="currentColor" strokeWidth="2" opacity=".68" />
        <circle cx="55" cy="84" r="13" fill="#080b10" stroke="currentColor" strokeWidth="4" />
        <circle cx="134" cy="84" r="13" fill="#080b10" stroke="currentColor" strokeWidth="4" />
        <circle cx="55" cy="84" r="4" fill="currentColor" />
        <circle cx="134" cy="84" r="4" fill="currentColor" />
      </svg>
    );
  }

  if (kind === 'figures') {
    return (
      <svg className={classes} viewBox="0 0 150 130" aria-hidden="true">
        <path
          d="M50 15h50c8 0 14 6 14 14v87H36V29c0-8 6-14 14-14Z"
          fill="currentColor"
          opacity=".1"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle cx="75" cy="43" r="13" fill="currentColor" opacity=".85" />
        <path
          d="M61 60c8-6 20-6 28 0l6 26-10 6v21H65V92l-10-6 6-26Z"
          fill="currentColor"
          opacity=".76"
        />
        <path d="m62 64-20 22m46-22 20 22M66 111l-8 5m26-5 8 5" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M46 24h58" stroke="currentColor" strokeWidth="2" opacity=".42" />
      </svg>
    );
  }

  return (
    <svg className={classes} viewBox="0 0 170 120" aria-hidden="true">
      <rect x="38" y="24" width="94" height="72" rx="13" fill="currentColor" opacity=".11" />
      <path
        d="M52 41h66c7 0 12 5 12 12v30c0 7-5 12-12 12H52c-7 0-12-5-12-12V53c0-7 5-12 12-12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M61 59v19m-10-9h20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <circle cx="106" cy="63" r="4" fill="currentColor" />
      <circle cx="117" cy="75" r="4" fill="currentColor" />
      <path d="M71 95 59 108m28-13-5 13m17-13 5 13m8-13 12 13" stroke="currentColor" strokeWidth="3" opacity=".72" />
    </svg>
  );
}
