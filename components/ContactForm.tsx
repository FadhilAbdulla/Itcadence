"use client";

import { useState } from "react";
import { Arrow, Check } from "./Icons";
import { SITE, waLink } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);
  return (
    <form
      className={`form reveal reveal--right${sent ? " is-sent" : ""}`}
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const f = e.currentTarget;
        if (!f.checkValidity()) return f.reportValidity();
        const d = new FormData(f);
        const msg = `Hello ITCadence,\n\nName: ${d.get("name")}\nInstitution: ${d.get("org") || "-"}\nEmail: ${d.get("email")}\nInterest: ${d.get("topic")}\n\n${d.get("message") || ""}`;
        setSent(waLink(msg));
        f.reset();
      }}
    >
      <div className="form__row">
        <div className="field"><input id="f-name" name="name" placeholder=" " required autoComplete="name" /><label htmlFor="f-name">Full name</label></div>
        <div className="field"><input id="f-org" name="org" placeholder=" " autoComplete="organization" /><label htmlFor="f-org">Institution</label></div>
      </div>
      <div className="form__row">
        <div className="field"><input id="f-email" name="email" type="email" placeholder=" " required autoComplete="email" /><label htmlFor="f-email">Work email</label></div>
        <div className="field">
          <select id="f-topic" name="topic" defaultValue="Managed Banner support">
            <option>Managed Banner support</option><option>Upgrade / patching</option><option>LMS integration</option>
            <option>Cloud / SaaS migration</option><option>Staff augmentation</option><option>Something else</option>
          </select>
          <label htmlFor="f-topic">I&apos;m interested in</label>
        </div>
      </div>
      <div className="field"><textarea id="f-msg" name="message" placeholder=" " /><label htmlFor="f-msg">How can we help?</label></div>
      <button className="btn" type="submit" data-magnetic>Send message <Arrow /></button>
      <div className="form__success" role="status">
        <Check />
        <span>Thanks! {sent && <a href={sent} target="_blank" rel="noopener" style={{ textDecoration: "underline" }}>Tap here to send your details on WhatsApp</a>} for the fastest reply.</span>
      </div>
      <p className="form__note">Prefer email? Write to {SITE.email}.</p>
    </form>
  );
}
