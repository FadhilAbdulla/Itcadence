import Link from "next/link";
import { LogoMark, WhatsApp } from "./Icons";
import { SITE, waLink } from "@/lib/site";
import { getCategories } from "@/lib/posts";

export default function Footer() {
  const cats = getCategories();
  return (
    <>
      <footer className="footer">
        <div className="container">
          <p className="footer__big" aria-hidden="true">ITCadence</p>
          <div className="footer__grid">
            <div>
              <Link href="/" className="logo"><LogoMark /><span>IT<b>Cadence</b></span></Link>
              <p>Enterprise e-learning and Ellucian Banner support for universities and colleges, from our office in Dubai.</p>
            </div>
            <div>
              <h2 className="footer__title">Learn Banner</h2>
              <ul>
                <li><Link href="/banner-faq">Banner Q&amp;A hub</Link></li>
                <li><Link href="/banner-glossary">Banner glossary</Link></li>
                {cats.map((c) => (
                  <li key={c.slug}><Link href={`/blog/category/${c.slug}`}>{c.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="footer__title">Company</h2>
              <ul>
                <li><Link href="/#services">Services</Link></li>
                <li><Link href="/#process">Our approach</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
                <li><a href="/rss.xml">RSS feed</a></li>
              </ul>
            </div>
            <div>
              <h2 className="footer__title">Reach us</h2>
              <address style={{ fontStyle: "normal" }}>
                <ul>
                  <li><a href={waLink()} target="_blank" rel="noopener">WhatsApp {SITE.phoneDisplay}</a></li>
                  <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
                  <li>{SITE.address.full}</li>
                </ul>
              </address>
            </div>
          </div>
          <div className="footer__bottom">
            <span>&copy; {new Date().getFullYear()} ITCadence. All rights reserved.</span>
            <span>Ellucian, Banner, Ethos and Degree Works are trademarks of Ellucian Company LLC. ITCadence is an independent service provider.</span>
          </div>
        </div>
      </footer>
      <button className="back-top" aria-label="Back to top">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg>
      </button>
      <div className="wa-float">
        <div className="wa-float__bubble">Banner issue right now?<small>Chat with ITCadence support</small></div>
        <a className="wa-float__btn" href={waLink("Hello ITCadence, I need help with Banner.")} target="_blank" rel="noopener" aria-label="Chat with ITCadence on WhatsApp">
          <WhatsApp />
        </a>
      </div>
    </>
  );
}
