import type { Metadata, Viewport } from "next";
import { Manrope, Sora } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Footer from "@/components/Footer";
import Interactions from "@/components/Interactions";
import JsonLd from "@/components/JsonLd";
import { SITE, absUrl } from "@/lib/site";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });
const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `The UAE's Dedicated Ellucian Banner Support Team | ${SITE.name}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Ellucian Banner support", "Banner 9 support", "Banner consultants UAE", "Ellucian Banner Dubai",
    "Banner upgrade", "Ellucian Ethos integration", "Banner SaaS migration", "Banner LMS integration",
    "ILP Moodle Canvas Banner", "enterprise e-learning platform", "higher education ERP support", "Banner Q&A",
  ],
  authors: [{ name: "ITCadence", url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/rss.xml", title: "ITCadence Banner blog" }] },
  },
  openGraph: {
    type: "website", siteName: SITE.name, locale: SITE.locale, url: "/",
    title: `The UAE's Dedicated Ellucian Banner Support Team | ${SITE.name}`,
    description: SITE.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "ITCadence – Ellucian Banner support and enterprise e-learning" }],
  },
  twitter: { card: "summary_large_image", title: `The UAE's Dedicated Ellucian Banner Support Team | ${SITE.name}`, description: SITE.description, images: ["/og.jpg"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  category: "technology",
};

export const viewport: Viewport = { themeColor: "#0a1324", width: "device-width", initialScale: 1 };

const orgLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absUrl("/#organization"),
    name: SITE.name,
    url: SITE.url,
    logo: absUrl("/icon.svg"),
    email: SITE.email,
    telephone: SITE.phoneE164,
    description: SITE.description,
    knowsAbout: [
      "Ellucian Banner", "Banner 9 Admin Pages", "Banner Self-Service", "Ellucian Ethos", "Banner Student",
      "Banner Finance", "Banner HR and Payroll", "Banner Financial Aid", "Degree Works",
      "Integration for Learning Platforms (ILP)", "Moodle", "Canvas", "D2L Brightspace", "Blackboard", "Ellucian SaaS",
    ],
    contactPoint: [{
      "@type": "ContactPoint", contactType: "technical support", telephone: SITE.phoneE164, email: SITE.email,
      availableLanguage: ["English", "Arabic"], areaServed: SITE.areaServed,
    }],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absUrl("/#localbusiness"),
    name: `${SITE.name} – Ellucian Banner Support`,
    url: SITE.url,
    image: absUrl("/og.jpg"),
    telephone: SITE.phoneE164,
    email: SITE.email,
    parentOrganization: { "@id": absUrl("/#organization") },
    address: {
      "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region, addressCountry: SITE.address.country,
    },
    areaServed: SITE.areaServed.map((n) => ({ "@type": "Country", name: n })),
    serviceType: ["Ellucian Banner support", "Banner upgrades", "LMS integration", "Banner SaaS migration", "Enterprise e-learning"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absUrl("/#website"),
    url: SITE.url,
    name: SITE.name,
    publisher: { "@id": absUrl("/#organization") },
    inLanguage: "en",
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable}`}>
      <head>
        <noscript><style>{".reveal, .hero h1 .line > span { opacity: 1 !important; transform: none !important; }"}</style></noscript>
        <link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt" />
        <JsonLd data={orgLd} />
      </head>
      <body>
        <div className="scroll-progress" aria-hidden="true" />
        <div className="cursor-glow" aria-hidden="true" />
        {children}
        <Footer />
        <Interactions />
        <Script src="https://www.googletagmanager.com/gtm.js?id=GTM-M5HMPBSF" strategy="afterInteractive" />
        <Script id="gtm-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
      </body>
    </html>
  );
}
