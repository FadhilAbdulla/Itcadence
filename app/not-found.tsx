import Link from "next/link";
import Nav from "@/components/Nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="notfound">
        <div>
          <b>404</b>
          <h1 style={{ fontSize: 34, margin: "10px 0 14px" }}>This page went out of cadence.</h1>
          <p style={{ color: "#c3cde0", marginBottom: 28 }}>Try the Banner Q&amp;A hub or head back home.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/" className="btn">Back to home</Link>
            <Link href="/banner-faq" className="btn btn--ghost">Banner Q&amp;A</Link>
          </div>
        </div>
      </main>
    </>
  );
}
