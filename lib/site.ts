export const SITE = {
  name: "ITCadence",
  legalName: "ITCadence",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.itcadence.com").replace(/\/$/, ""),
  tagline: "Ellucian Banner Support & Enterprise E-Learning",
  description:
    "ITCadence provides managed Ellucian Banner support, Banner 9 upgrades, Ethos integrations, LMS integration and enterprise e-learning platforms for universities and colleges across the UAE and GCC.",
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
