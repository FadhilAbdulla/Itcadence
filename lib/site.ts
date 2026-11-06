export const SITE = {
  name: "ITCadence",
  legalName: "ITCadence",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.itcadence.com").replace(/\/$/, ""),
  tagline: "Ellucian Banner Support & Enterprise E-Learning",
  description:
    "Managed Ellucian Banner support, Banner 9 upgrades, Ethos and LMS integration, and enterprise e-learning for universities and colleges across the UAE and GCC.",
  email: "info@itcadence.com",
  whatsapp: "971569380690",
  phoneDisplay: "+971 56 938 0690",
  phoneE164: "+971569380690",
  address: {
    street: "Shop No. 99, IT Centre, Al Suk Al Kabeer",
    locality: "Bur Dubai",
    region: "Dubai",
    country: "AE",
    countryName: "United Arab Emirates",
    full: "Shop No. 99, IT Centre, Al Suk Al Kabeer, Bur Dubai, Dubai, UAE",
  },
  areaServed: ["United Arab Emirates", "Saudi Arabia", "Oman", "Qatar", "Bahrain", "Kuwait"],
  locale: "en_AE",
};

export const waLink = (text?: string) =>
  `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const absUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

// The layout appends " | ITCadence". Drop that suffix when it would push a title past ~60 characters.
export const seoTitle = (title: string) =>
  title.length + SITE.name.length + 3 <= 60 ? title : { absolute: title };

// Metadata fields replace the layout's rather than merge, so each page must set its full preview.
export const pagePreview = ({ url, title, description }: { url: string; title: string; description: string }) => ({
  openGraph: {
    type: "website" as const, siteName: SITE.name, locale: SITE.locale, url, title, description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${title} – ${SITE.name}` }],
  },
  twitter: { card: "summary_large_image" as const, title, description, images: ["/og.jpg"] },
});
