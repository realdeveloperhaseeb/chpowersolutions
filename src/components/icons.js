// Minimal inline SVG icons (no external icon lib -> lighter bundle).
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconCart = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="9" cy="20" r="1.4" />
    <circle cx="18" cy="20" r="1.4" />
    <path d="M2 3h2l2.4 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 7H6" />
  </svg>
);

export const IconMenu = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p) => (
  <svg viewBox="0 0 24 24" width="24" height="24" {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const IconArrow = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconCheck = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <path d="M4 12l5 5L20 6" />
  </svg>
);

export const IconBolt = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </svg>
);

export const IconShield = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
  </svg>
);

export const IconTruck = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17" cy="18" r="1.6" />
  </svg>
);

export const IconHeadset = (p) => (
  <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...p}>
    <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
    <path d="M4 13a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zM20 13a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2 1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z" />
    <path d="M18 19a6 6 0 0 1-4 3" />
  </svg>
);

export const IconPhone = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 3 5a1 1 0 0 1 1-1z" />
  </svg>
);

export const IconMail = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

export const IconPin = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const IconStar = (p) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" stroke="none" {...p}>
    <path d="M12 2l2.9 6 6.6.6-5 4.3 1.5 6.5L12 16.9 5.9 19.4 7.4 12.9l-5-4.3 6.6-.6z" />
  </svg>
);

export const IconUser = (p) => (
  <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const IconTrash = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" {...base} {...p}>
    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
  </svg>
);
