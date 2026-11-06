import type { MetadataRoute } from "next";
import { absUrl } from "@/lib/site";

// Search engines and AI assistants are explicitly welcome: we want ITCadence's
// Banner answers to be cited by Google, Bing, ChatGPT, Claude, Perplexity and Gemini.
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "anthropic-ai",
  "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "CCBot", "Bingbot", "DuckAssistBot", "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: absUrl("/sitemap.xml"),
    host: absUrl("/"),
  };
}
