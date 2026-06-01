/* ===========================================================
   Линейные иконки — единый стиль (stroke 1.7, currentColor)
   =========================================================== */
const Ic = ({ d, children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
       strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d ? <path d={d} /> : children}
  </svg>
);

export const Icon = {
  arrow: () => <Ic d="M5 12h14M13 6l6 6-6 6" />,
  phone: () => <Ic d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 6.7 2 2 0 0 1 6.5 3.5Z" />,
  telegram: () => (
    <Ic>
      <path d="M21 5 3 12l5 1.8L18 7l-7.5 8 .2 4 2.8-3 4 3z" />
    </Ic>
  ),
  close: () => <Ic d="M6 6l12 12M18 6 6 18" />,
  menu: () => <Ic d="M3 6h18M3 12h18M3 18h18" />,
  check: () => <Ic d="M4 12.5l5 5 11-11" />,
  checkCircle: () => <Ic><circle cx="12" cy="12" r="9" /><path d="M8 12.2l2.6 2.6L16 9" /></Ic>,
  box: () => <Ic><path d="M12 3 4 7v10l8 4 8-4V7l-8-4Z" /><path d="M4 7l8 4 8-4M12 11v10" /></Ic>,
  truck: () => <Ic><path d="M2 6h11v10H2zM13 9h4l3 3v4h-7" /><circle cx="6.5" cy="18" r="1.6" /><circle cx="17" cy="18" r="1.6" /></Ic>,
  handshake: () => (
    <Ic>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </Ic>
  ),
  factory: () => <Ic><path d="M3 21V10l5 3V10l5 3V7l6 3v11H3Z" /><path d="M7 21v-4M12 21v-4M17 21v-4" /></Ic>,
  pin: () => <Ic><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></Ic>,
  shield: () => <Ic><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></Ic>,
  star: () => <Ic><path d="M12 3.5l2.6 5.3 5.9.8-4.3 4.1 1 5.8L12 16.9 6.8 19.5l1-5.8L3.5 9.6l5.9-.8z" /></Ic>,
  clock: () => <Ic><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></Ic>,
  tag: () => <Ic><path d="M3 12V4h8l9 9-7 7-9-9Z" /><circle cx="7.5" cy="7.5" r="1.4" /></Ic>,
  percent: () => <Ic><path d="M5 19 19 5" /><circle cx="7.5" cy="7.5" r="2.2" /><circle cx="16.5" cy="16.5" r="2.2" /></Ic>,
  grid: () => <Ic><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></Ic>,
  mail: () => <Ic><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5 12 13l8.5-6.5" /></Ic>,
  leaf: () => <Ic d="M20 4C9 4 4 9 4 18c0-6 6-9 13-9-4 2-6 4-7 9 8 0 11-6 10-14Z" />,
  route: () => <Ic><circle cx="6" cy="6" r="2.4" /><circle cx="18" cy="18" r="2.4" /><path d="M8 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h7" /></Ic>,
  users: () => <Ic><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M21 20a6 6 0 0 0-4-5.6" /></Ic>,
  scale: () => <Ic><path d="M12 4v16M6 8h12M6 8 3.5 14h5L6 8Zm12 0-2.5 6h5L18 8ZM8 20h8" /></Ic>,
  bolt: () => <Ic d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" />,
};
