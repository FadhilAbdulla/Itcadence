"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ANSWERS, AREAS, TOTAL_CHECKS, band, type AnswerValue } from "@/lib/healthcheck";
import { waLink } from "@/lib/site";
import { Arrow, WhatsApp } from "./Icons";

const points = (v?: AnswerValue) => ANSWERS.find((a) => a.value === v)?.points ?? 0;

export default function HealthCheck() {
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const answered = Object.keys(answers).length;
  const complete = answered === TOTAL_CHECKS;

  const results = useMemo(() => {
    const areas = AREAS.map((a) => {
      const score = a.checks.reduce((n, c) => n + points(answers[c.id]), 0);
      return { ...a, pct: Math.round((score / (a.checks.length * 2)) * 100) };
    });
    const pct = Math.round(areas.reduce((n, a) => n + a.pct, 0) / areas.length);
    const gaps = AREAS.flatMap((a) => a.checks.filter((c) => answers[c.id] !== "yes").map((c) => ({ ...c, area: a.name, answer: answers[c.id] })))
      // Missing controls first, then partial ones.
      .sort((x, y) => points(x.answer) - points(y.answer));
    const unsure = Object.values(answers).filter((v) => v === "unsure").length;
    return { areas, pct, gaps, unsure, band: band(pct) };
  }, [answers]);

  const finish = () => {
    setShowResults(true);
    try {
      const w = window as unknown as { dataLayer?: object[] };
      (w.dataLayer ||= []).push({ event: "banner_health_check_complete", health_score: results.pct, health_band: results.band.label });
    } catch { /* analytics is optional */ }
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const summary = [
    "Hello ITCadence, I completed the Banner health check.",
    `Overall: ${results.pct}% (${results.band.label})`,
    ...results.areas.map((a) => `${a.name}: ${a.pct}%`),
    results.gaps.length ? `Top gaps: ${results.gaps.slice(0, 3).map((g) => g.q).join(" | ")}` : "",
    "I'd like to discuss the results.",
  ].filter(Boolean).join("\n");

  return (
    <div className="hc">
      <div className="hc__progress" role="status" aria-live="polite">
        <div className="hc__bar"><span style={{ width: `${(answered / TOTAL_CHECKS) * 100}%` }} /></div>
        <span>{answered} of {TOTAL_CHECKS} answered</span>
      </div>

      {AREAS.map((area, ai) => (
        <section key={area.id} className="hc__area" aria-labelledby={`hc-${area.id}`}>
          <div className="hc__area-head">
            <span className="hc__num">{String(ai + 1).padStart(2, "0")}</span>
            <div>
              <h2 id={`hc-${area.id}`}>{area.name}</h2>
              <p className="muted">{area.blurb}</p>
            </div>
          </div>
          {area.checks.map((c) => (
            <fieldset key={c.id} className="hc__q">
              <legend>{c.q}</legend>
              <div className="hc__opts">
                {ANSWERS.map((a) => (
                  <label key={a.value} className={`hc__opt${answers[c.id] === a.value ? " is-on" : ""}`}>
                    <input
                      type="radio" name={c.id} value={a.value} checked={answers[c.id] === a.value}
                      onChange={() => setAnswers((s) => ({ ...s, [c.id]: a.value }))}
                    />
                    {a.label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
        </section>
      ))}

      <div className="hc__actions">
        <button type="button" className="btn" onClick={finish} disabled={!complete}>
          {complete ? "See my results" : `Answer all ${TOTAL_CHECKS} questions to see results`} <Arrow />
        </button>
        {answered > 0 && (
          <button type="button" className="btn btn--ghost" onClick={() => { setAnswers({}); setShowResults(false); }}>Start again</button>
        )}
      </div>

      {showResults && complete && (
        <div ref={resultsRef} className="hc__results" aria-labelledby="hc-results-h">
          <div className={`hc__score hc__score--${results.band.tone}`}>
            <div className="hc__dial"><b>{results.pct}%</b><span>{results.band.label}</span></div>
            <div>
              <h2 id="hc-results-h">Your Banner health score</h2>
              <p>{results.band.text}</p>
              {results.unsure > 0 && <p className="hc__note">You answered &quot;Not sure&quot; {results.unsure} time{results.unsure > 1 ? "s" : ""}. Unknowns are scored as gaps, because a control nobody can confirm is hard to rely on.</p>}
            </div>
          </div>

          <h3>Scores by area</h3>
          <ul className="hc__areas">
            {results.areas.map((a) => (
              <li key={a.id}>
                <span>{a.name}</span>
                <div className="hc__bar hc__bar--area"><span style={{ width: `${a.pct}%` }} /></div>
                <b>{a.pct}%</b>
              </li>
            ))}
          </ul>

          {results.gaps.length > 0 ? (
            <>
              <h3>Where to start</h3>
              <ol className="hc__gaps">
                {results.gaps.slice(0, 6).map((g) => (
                  <li key={g.id}>
                    <small>{g.area} · {ANSWERS.find((a) => a.value === g.answer)?.label}</small>
                    <b>{g.q}</b>
                    <p>{g.fix} <Link href={g.link}>{g.linkLabel} →</Link></p>
                  </li>
                ))}
              </ol>
              {results.gaps.length > 6 && <p className="muted">Plus {results.gaps.length - 6} smaller gap{results.gaps.length - 6 > 1 ? "s" : ""}. Use print to keep the full list.</p>}
            </>
          ) : <p>No gaps found. Consider an independent review to confirm what your team believes is in place.</p>}

          <div className="hc__cta">
            <div>
              <h3>Want a second opinion?</h3>
              <p>Send your scores to the ITCadence team and we will suggest the first three things to fix. Nothing is sent unless you choose to.</p>
            </div>
            <div className="hc__cta-btns">
              <a className="btn btn--wa" href={waLink(summary)} target="_blank" rel="noopener"><WhatsApp size={18} /> Send results on WhatsApp</a>
              <button type="button" className="btn btn--ghost" onClick={() => window.print()}>Print or save as PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
