---
title: "Moving Banner to Ellucian SaaS: A Practical Migration Plan"
description: "A SaaS move changes how you customise, report and integrate. A five-phase plan that avoids the common surprises."
category: "Cloud"
tags: ["SaaS", "cloud", "migration"]
date: "2026-09-24"
updated: "2026-11-07"
question: "How do you plan a Banner SaaS migration?"
answer: "Plan a Banner SaaS migration in five phases: inventory everything that touches Banner, classify each item (retire, reconfigure, rebuild or re-platform), rebuild integrations on Ethos APIs, rehearse the cutover with data validation at least twice, and run a hypercare period while the team adopts the new operating model."
faqs:
  - q: "What is the biggest risk in a Banner SaaS migration?"
    a: "Underestimating the inventory: undocumented scripts, direct database connections and modifications that must be rebuilt."
  - q: "How many mock migrations should we run?"
    a: "At least two full rehearsals with validation scripts, timed so you can estimate the real cutover window."
---

More institutions are moving Banner from on-premises data centres to Ellucian SaaS. The appeal is clear: continuous updates, less infrastructure and a smaller patching burden. But SaaS also changes the rules for customisation, reporting and integration. See [Banner SaaS vs on-premise](/blog/banner-saas-vs-on-premise) for the comparison, and [Ellucian Student explained](/blog/what-is-ellucian-student-powered-by-banner) for how the offer is now packaged.

![Five-phase Banner SaaS migration plan](/images/diagrams/saas-phases.svg "Inventory, classify, rebuild, rehearse, hypercare")

## Phase 1: Inventory everything that touches Banner

- Local modifications to baseline pages, packages and tables
- Custom PL/SQL, Pro\*C and shell jobs in job submission
- Direct database connections from reporting tools, scripts and third parties
- File-based feeds in and out (bank files, LMS, ID cards, housing)

In SaaS, direct database access and arbitrary server-side code are generally restricted, so each item needs a new home. Our guide to [what replaces direct database access](/blog/banner-saas-direct-database-access) shows how that rebuild works.

## Phase 2: Classify and decide

1. **Retire**: no longer used or replaced by delivered functionality.
2. **Reconfigure**: achievable with baseline rules and settings.
3. **Rebuild**: move to Banner Extensibility, Experience or Ethos APIs.
4. **Re-platform**: shift reporting to a supported analytics approach.

> **Note:** Expect the inventory to be larger than anyone estimates. Undocumented scripts on a forgotten server are a migration classic.

## Phase 3: Rebuild integrations on APIs

Integrations that read tables directly should move to [Ethos APIs](/blog/what-is-ellucian-ethos) and change notifications. API-based integrations survive updates far better.

## Phase 4: Rehearse the cutover

Run at least two full mock migrations with validation scripts that compare record counts and key balances. Time each rehearsal; that becomes your cutover estimate. For overall planning, compare [how long real Banner SaaS migrations have taken](/blog/how-long-does-banner-saas-migration-take).

## Phase 5: Hypercare and a new operating model

After go-live, your team shifts from running infrastructure to managing a service: tracking Ellucian's update schedule, regression testing and owning configuration. Budget for hypercare and retraining.

> Migrating to SaaS is not a lift-and-shift. It is an opportunity to pay down a decade of technical debt.

ITCadence supports assessment, rebuild and hypercare. [Start with a readiness assessment](/#contact).
