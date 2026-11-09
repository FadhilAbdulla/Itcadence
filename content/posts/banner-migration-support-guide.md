---
title: "Banner Migration Support: What Help Do You Actually Need?"
description: "Moving to Banner, to Banner SaaS or to new hosting? Who does what between Ellucian, a partner and your team, and the questions to ask before hiring help."
category: "Migration"
tags: ["migration", "SaaS", "support", "implementation"]
date: "2026-11-09"
question: "What support do you need for a Banner migration?"
answer: "It depends on the type of migration. Moving from another system to Banner needs process design and data conversion. Moving on-premises Banner to SaaS needs an inventory and rebuild of customisations, integrations and reports. Moving hosting needs infrastructure and cutover planning. In each case, decide what Ellucian provides, what a partner adds and what your own team must own."
faqs:
  - q: "Does Ellucian provide migration support itself?"
    a: "Yes, Ellucian runs implementations and describes a 'Navigate to SaaS' methodology. Institutions often add partners for extra capacity, specific skills or support after go-live. Confirm exactly what is in Ellucian's scope before you hire anyone else."
  - q: "What should a Banner migration partner be able to show?"
    a: "Named references with a similar starting point, the specific people who will do the work, a clear split of responsibilities with Ellucian, and a plan for handing knowledge to your team."
  - q: "Do we still need support after go-live?"
    a: "Usually, yes. Hypercare covers the first terms after cutover, when term processes run for the first time on the new setup. After that, many institutions keep ongoing managed support for upgrades, regression testing and peak periods."
---

"Migration support" can mean very different things. Moving from a legacy student system to Banner, moving Banner to SaaS and moving Banner to new hosting each need different skills. Getting this right early helps you avoid paying for help you do not need, or missing help you do.

## Which migration are you doing?

| Migration | What changes | Hardest parts |
|---|---|---|
| **Legacy system to Banner** | Everything: processes, data, integrations and training | [Data conversion](/blog/migrating-to-banner-from-legacy-sis), process redesign, change management |
| **On-premises Banner to SaaS** | Infrastructure, customisation and integration methods | [Rebuilding database-dependent work](/blog/banner-saas-direct-database-access), regression testing |
| **Banner to new hosting** | Where and how Banner runs | Infrastructure design, cutover, performance |
| **Banner version upgrade** | Pages, releases and modifications | [Modifications](/blog/how-to-manage-banner-modifications), testing around the calendar |

Hosting moves can be the lightest. Bucknell University, a Banner user since the mid-1990s, moved its student system to AWS with its partner Strata Information Group. [AWS reports](https://aws.amazon.com/blogs/publicsector/how-bucknell-got-40-percent-time-back-moving-erp-cloud) four months of joint design, several weeks of build and testing, and a cutover described as "one last back up, then redirect the URLs." Bucknell estimated staff time on infrastructure fell from about 70% to about 30%. Those are self-reported figures in AWS marketing, but the scale of effort is instructive.

## Who does what

Most projects involve three parties. Write their responsibilities down before the project starts:

| Area | Ellucian | Partner (if used) | Your team |
|---|---|---|---|
| Product, hosting in SaaS | Owns | Advises | Accepts |
| Implementation method | Leads its own | Supports or leads parts | Agrees |
| Business decisions | Advises | Facilitates | **Owns** |
| Data cleaning and sign-off | Converts (per contract) | Validates, scripts | **Owns** |
| Integrations and reports | Provides tools and APIs | Rebuilds | Prioritises, tests |
| Testing | Product quality | Plans and runs | **Signs off** |
| Training and change | Product training | Process training | Adoption |
| After go-live | Product support | Hypercare, managed support | Day-to-day running |

The bold cells matter most. A partner can do a great deal, but your institution must own the decisions and the sign-off.

## Where outside help adds the most

- **Inventory and readiness.** Finding every modification, script, report and integration before the plan is set.
- **Rebuild capacity.** Extra hands to rebuild integrations and reports while your team runs live terms.
- **Data validation.** Independent reconciliation of each conversion rehearsal.
- **Backfill.** Covering business-as-usual work so your experts can join the project.
- **Hypercare.** Close support for the first terms after go-live.

Broward College's case study is a reminder that people matter as much as technology. It names "staff hesitancy and cultural resistance" and burnout risk across a 100-person project team, which its partner addressed by rebalancing work and phasing training.

## Questions to ask any migration partner

1. Which institutions with a starting point like ours can we speak to?
2. Who exactly will work on our project, and what Banner modules have they supported?
3. How will your scope fit with Ellucian's, and who resolves gaps?
4. How do you inventory customisations and integrations, and can we see an example output?
5. How do you plan around our academic calendar and peak periods?
6. How will you transfer knowledge to our team before you leave?
7. What does hypercare include, and for how long?
8. How do you handle a failed rehearsal or a delayed go-live?

## Start with a health check

Before you choose a migration approach, get a clear picture of where you are. Our free [Banner health check](/banner-health-check) scores your environment across upgrades, security, operations, integrations and future readiness in about five minutes.

ITCadence is a Dubai-based team supporting Banner institutions across the UAE and GCC, with readiness assessments, rebuilds, hypercare and managed support. [Talk to us about your migration](/#contact).

## Sources

- AWS Public Sector Blog, [How Bucknell got time back moving its ERP to the cloud](https://aws.amazon.com/blogs/publicsector/how-bucknell-got-40-percent-time-back-moving-erp-cloud), June 2021
- Strata Information Group, [Broward College case study](https://www.sigcorp.com/case-studies/modernizing-erp-systems-with-strategic-guidance-from-sig-on-banner-saas/), read November 2026
- Ellucian, [32 SaaS go-lives in 2025](https://www.ellucian.com/newsroom/ellucian-achieves-record-saas-adoption-32-institutional-go-lives-2025), February 2026
