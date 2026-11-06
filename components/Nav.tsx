import Link from "next/link";
import { LogoMark } from "./Icons";

const links = [
  { href: "/#services", label: "Services" },
  { href: "/#banner", label: "Banner" },
  { href: "/#elearning", label: "E-Learning" },
  { href: "/blog", label: "Blog" },
  { href: "/banner-faq", label: "Banner Q&A" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav({ active }: { active?: string }) {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="logo" aria-label="ITCadence home">
          <LogoMark />
          <span>IT<b>Cadence</b></span>
        </Link>
        <nav aria-label="Main">
          <ul className="nav__links">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={active === l.href ? "is-active" : undefined}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__cta-wrap">
          <Link href="/#contact" className="btn nav__cta" data-magnetic>Talk to an expert</Link>
        </div>
        <button className="nav__toggle" aria-label="Open menu" aria-expanded="false"><span /><span /><span /></button>
      </div>
    </header>
  );
}
