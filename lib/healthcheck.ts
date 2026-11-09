export type Check = { id: string; q: string; fix: string; link: string; linkLabel: string };
export type Area = { id: string; name: string; blurb: string; checks: Check[] };

export const ANSWERS = [
  { value: "yes", label: "Yes", points: 2 },
  { value: "partly", label: "Partly", points: 1 },
  { value: "no", label: "No", points: 0 },
  { value: "unsure", label: "Not sure", points: 0 },
] as const;
export type AnswerValue = (typeof ANSWERS)[number]["value"];

export const AREAS: Area[] = [
  {
    id: "upgrades",
    name: "Upgrades & patching",
    blurb: "How current and controlled your Banner releases are.",
    checks: [
      { id: "u1", q: "We know which release each Banner module is on and when it was last updated.", fix: "Build a simple release register per module and environment, so upgrade planning starts from facts.", link: "/blog/banner-9-patching-cadence", linkLabel: "Finding your patching cadence" },
      { id: "u2", q: "We have a test environment close enough to production to test updates properly.", fix: "Refresh test from production on a schedule, with sensitive data masked, so test results mean something.", link: "/blog/banner-9-patching-cadence", linkLabel: "Keeping environments honest" },
      { id: "u3", q: "We have a written list of local modifications, each with an owner.", fix: "Inventory and classify your modifications. Each one adds testing effort to every upgrade.", link: "/blog/how-to-manage-banner-modifications", linkLabel: "Managing Banner modifications" },
      { id: "u4", q: "Patching and upgrades are planned around our academic calendar.", fix: "Mark freeze windows around registration, fee assessment, grade roll and payroll before scheduling updates.", link: "/blog/banner-9-patching-cadence", linkLabel: "Planning around freeze windows" },
    ],
  },
  {
    id: "security",
    name: "Security & access",
    blurb: "Who can see and change what in Banner.",
    checks: [
      { id: "s1", q: "Banner access is reviewed at least once a year, and leavers lose access promptly.", fix: "Run an annual access review with data owners, and tie account removal to your HR leaver process.", link: "/blog/how-banner-security-classes-work", linkLabel: "How Banner security works" },
      { id: "s2", q: "Staff and students sign in to Banner through single sign-on.", fix: "Single sign-on reduces password tickets and lets you apply MFA in one place.", link: "/blog/how-single-sign-on-works-with-banner-9", linkLabel: "Banner 9 single sign-on" },
      { id: "s3", q: "Access is granted through security classes, not one-off grants to individuals.", fix: "Move individual grants into role-based security classes so access is consistent and auditable.", link: "/blog/how-banner-security-classes-work", linkLabel: "Clean security models" },
      { id: "s4", q: "We know who can view or change sensitive data such as IDs, grades and bank details.", fix: "Report on access to sensitive pages and confirm each user still needs it.", link: "/blog/how-banner-security-classes-work", linkLabel: "Banner security layers" },
    ],
  },
  {
    id: "operations",
    name: "Operations & performance",
    blurb: "How smoothly day-to-day Banner work runs.",
    checks: [
      { id: "o1", q: "Failed jobs are noticed and investigated the same day.", fix: "Review failed and errored jobs daily, rather than waiting for a user to notice missing output.", link: "/blog/how-banner-job-submission-works", linkLabel: "Why Banner jobs fail" },
      { id: "o2", q: "Users rarely complain that Admin Pages or Self-Service are slow.", fix: "Measure page times and work through the database, application and network layers in order.", link: "/blog/why-are-banner-9-pages-slow", linkLabel: "Why Banner 9 pages are slow" },
      { id: "o3", q: "We run a readiness check before registration opens each term.", fix: "Use a runbook two weeks out, one week out and on opening day to catch holds, time tickets and capacity issues.", link: "/blog/registration-week-readiness-runbook", linkLabel: "Registration week runbook" },
      { id: "o4", q: "Critical processes like grade roll and payroll have written, current runbooks.", fix: "Document each critical process so it does not depend on one person remembering the steps.", link: "/blog/what-is-grade-roll-in-banner", linkLabel: "How grade roll works" },
    ],
  },
  {
    id: "integrations",
    name: "Integrations & data",
    blurb: "How Banner connects to other systems and keeps data clean.",
    checks: [
      { id: "i1", q: "We have a current list of every system that reads from or writes to Banner.", fix: "Build an integration catalogue with owners, methods and schedules. It is the starting point for any change.", link: "/blog/ethos-api-banner-integrations", linkLabel: "Start with an integration catalogue" },
      { id: "i2", q: "New integrations use Ethos APIs rather than direct database connections.", fix: "Make APIs the default for new work so integrations survive upgrades and a future move to SaaS.", link: "/blog/what-is-ellucian-ethos", linkLabel: "What is Ellucian Ethos?" },
      { id: "i3", q: "Changes to validation tables go through an agreed approval process.", fix: "Give each validation table an owner and require approval for new codes, as they affect reporting and integrations.", link: "/blog/what-are-banner-validation-tables", linkLabel: "Validation table governance" },
      { id: "i4", q: "Someone owns duplicate person records and wider data quality.", fix: "Assign an owner, check for duplicate records regularly and fix causes at the point of entry.", link: "/blog/what-is-pidm-in-banner", linkLabel: "PIDMs and duplicate records" },
    ],
  },
  {
    id: "future",
    name: "Future readiness",
    blurb: "How prepared you are for SaaS and for change.",
    checks: [
      { id: "f1", q: "We know which scripts and reports depend on direct database access.", fix: "List database-dependent work now. In Banner SaaS it must be retired, replaced or rebuilt.", link: "/blog/banner-saas-direct-database-access", linkLabel: "What replaces database access" },
      { id: "f2", q: "We have a view on Ellucian Student and SaaS, and what they would mean for us.", fix: "Understand what Ellucian has confirmed, and ask your account team for your contract position in writing.", link: "/blog/what-is-ellucian-student-powered-by-banner", linkLabel: "Ellucian Student explained" },
      { id: "f3", q: "More than one person can support each critical Banner area.", fix: "Identify single points of knowledge, document their work and arrange backup cover.", link: "/blog/banner-migration-support-guide", linkLabel: "Where outside help fits" },
      { id: "f4", q: "Our LMS integration syncs enrolments without regular manual fixes.", fix: "Monitor sync errors and clean identity data so courses and enrolments stay aligned.", link: "/blog/banner-lms-integration-ilp", linkLabel: "Banner and LMS integration" },
    ],
  },
];

export const TOTAL_CHECKS = AREAS.reduce((n, a) => n + a.checks.length, 0);

export function band(pct: number) {
  if (pct >= 80) return { label: "Steady", tone: "good", text: "Your Banner environment looks well run. Keep the habits that got you here, and close the remaining gaps before they grow." } as const;
  if (pct >= 50) return { label: "Needs attention", tone: "warn", text: "The basics are in place, but several gaps could cause problems at peak times or slow a future migration." } as const;
  return { label: "At risk", tone: "risk", text: "Several important controls are missing or unknown. These gaps tend to show up as incidents during registration, upgrades or audits." } as const;
}
