import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };
const base = (size = 24, rest: SVGProps<SVGSVGElement> = {}) => ({
  width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.9, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...rest,
});

export const Arrow = ({ size = 16, ...r }: P) => <svg {...base(size, r)} strokeWidth={2.4}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
export const Check = ({ size = 16, ...r }: P) => <svg {...base(size, r)} strokeWidth={2.6}><path d="M20 6 9 17l-5-5" /></svg>;
export const Mail = ({ size = 20, ...r }: P) => <svg {...base(size, r)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
export const Pin = ({ size = 20, ...r }: P) => <svg {...base(size, r)}><path d="M12 22s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="10" r="2.5" /></svg>;
export const Clock = ({ size = 18, ...r }: P) => <svg {...base(size, r)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
export const Cal = ({ size = 18, ...r }: P) => <svg {...base(size, r)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>;
export const Headset = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /><path d="M20 20a3 3 0 0 1-3 2h-3" /></svg>;
export const Cloud = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><path d="M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19.5 10 4 4 0 0 1 18 18z" /><path d="m10 14 2-2 2 2M12 12v5" /></svg>;
export const Plug = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4" /></svg>;
export const Book = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><path d="M4 19V5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 19v3H6" /><path d="M9 7h6M9 11h4" /></svg>;
export const Chart = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>;
export const Gear = ({ size = 26, ...r }: P) => <svg {...base(size, r)}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></svg>;
export const Link = ({ size = 18, ...r }: P) => <svg {...base(size, r)}><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>;
export const Spark = ({ size = 16, ...r }: P) => <svg {...base(size, r)}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" /></svg>;
export const LinkedIn = ({ size = 17 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>
);
export const WhatsApp = ({ size = 26 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.39 9.39 0 0 1-1.44-5.01c0-5.19 4.23-9.42 9.43-9.42 2.52 0 4.88.98 6.66 2.76a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.44 9.42m8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.25l5.64-1.48a11.3 11.3 0 0 0 5.79 1.48h.01c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.32-8.01" /></svg>
);
export const LogoMark = () => (
  <svg className="logo__mark" viewBox="0 0 34 34" aria-hidden="true">
    <rect width="34" height="34" rx="10" fill="#2ee6c5" fillOpacity=".14" />
    <g fill="#2ee6c5">
      <rect className="bar" x="7" y="13" width="3.6" height="14" rx="1.8" />
      <rect className="bar" x="12.8" y="8" width="3.6" height="19" rx="1.8" />
      <rect className="bar" x="18.6" y="11" width="3.6" height="16" rx="1.8" />
      <rect className="bar" x="24.4" y="15" width="3.6" height="12" rx="1.8" />
    </g>
  </svg>
);
