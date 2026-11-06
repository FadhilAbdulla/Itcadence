---
title: "Banner SaaS Without Database Access: What Replaces SQL?"
description: "Banner SaaS removes direct SQL, stored procedures and database jobs. How teams rebuild that logic with Data Connect, Ethos APIs and supported reporting tools."
category: "Cloud"
tags: ["SaaS", "cloud", "Ethos", "Data Connect", "integration"]
date: "2026-11-07"
question: "Can you access the Banner database directly in Banner SaaS?"
answer: "Generally no. Consultancies working on Banner SaaS report that direct SQL access, stored procedures and database-resident jobs are not available. Custom logic is typically rebuilt outside the database, with Ellucian Data Connect orchestrating the work and Ethos APIs reading and writing Banner data. Confirm the limits for your own contract and scope with Ellucian."
faqs:
  - q: "What is Ellucian Data Connect used for in Banner SaaS?"
    a: "In published migration examples, Data Connect is the orchestration layer. It runs pipelines that apply business rules and call Ethos APIs, replacing scripts that once ran inside the database."
  - q: "Can our PL/SQL be moved to Banner SaaS as it is?"
    a: "Do not plan on it. Treat each item as something to retire, replace or redesign. The business rules can often be kept, but the way they run has to change."
  - q: "Will our reporting tools still work?"
    a: "Check each tool. Reports that connect directly to the database need a supported route. Some vendors have sought SaaS verification, such as Evisions in September 2026, and Ellucian Insights is another option, but confirm coverage for each report."
  - q: "Do we need to rebuild everything before go-live?"
    a: "No. Separate what must work on day one, such as statutory returns and term processes, from what can wait or be retired. A good inventory usually shows some items are no longer needed."
---

On-premises Banner teams often solve problems by going straight to the database: a query, a stored procedure, a scheduled script. In SaaS that habit has to change. As one consultancy, [ABCloudz, puts it](https://abcloudz.com/blog/modernizing-hesa-statutory-reporting-ellucian-saas/), "Banner SaaS removes direct database access by design."

> **Note:** The detail below comes largely from published consultancy work, not Ellucian's technical documentation, which is mostly available to customers. Validate specifics in the Ellucian Support Center and with your implementation team.

## What goes away

A [migration practice description](https://abcloudz.com/practices/modernization-ellucian-banner-to-ellucian-student/) says direct database access, database-resident code and direct database jobs are "typically unavailable." In practice, review anything that relies on:

- SQL clients and ad hoc queries against production
- Custom PL/SQL packages, triggers and stored procedures
- Pro\*C, COBOL or shell jobs that run on Banner servers
- Third-party tools with direct database connections
- Scheduled scripts that write straight into Banner tables

The [ones nobody remembers](/blog/how-to-manage-banner-modifications) are usually the real risk, so check job schedules, server crontabs and database accounts as well as your documentation.

## What replaces it

| On-premises habit | Typical SaaS direction | Check first |
|---|---|---|
| Script that updates Banner records | Data Connect pipeline calling Ethos APIs | Does an API cover every field you write? |
| Direct database integration | [Ethos APIs](/blog/what-is-ellucian-ethos) and supported integration tools | Volume, timing and error handling |
| Custom page or form logic | Delivered configuration or [Extensibility](/blog/what-is-banner-extensibility) | Is a delivered rule now enough? |
| Custom portal content | Experience extensions and cards | Who owns and maintains them? |
| SQL reports | Ellucian Insights or a SaaS-verified tool | Can it reach all the data you need? |
| Cron job | Scheduled pipeline or supported scheduler | Who monitors failures? |

Not everything needs a replacement. Each inventory item should end up with one of three outcomes: **retire, replace or redesign**.

## Two published examples

**UK statutory reporting.** [ABCloudz describes](https://abcloudz.com/blog/modernizing-hesa-statutory-reporting-ellucian-saas/) an unnamed UK university whose HESA preparation depended on scripts inside the database. The rebuild used five Data Connect pipelines covering student engagement, entry profile, course session and module records. Each stage enforced prerequisite checks, and every run produced success and error reports.

**US registration logic.** [In another project](https://abcloudz.com/blog/rebuilding-legacy-student-logic-ellucian-banner-saas/), an unnamed US college had a process that applied program and status rules each term. The rebuild used two pipelines, one at term level and one at course level, and replaced database writes with authenticated API calls. The team's summary was "keep the logic, change the mechanics."

These are the vendor's own write-ups and report no independent measurements, but the pattern is useful.

## How to convert one script

1. **Write down the business rule.** Ask what the script is for, not only what the SQL does. Interview the people who rely on its results.
2. **Decide whether it is still needed.** Delivered functionality or a process change may remove it.
3. **Map every read and write to a supported API.** Do this early, as a missing field or write path can change your design.
4. **Rebuild it as a pipeline.** Make it safe to re-run, and make it skip records that are already correct.
5. **Report every outcome.** Show what was created, skipped and failed, because administrators can no longer check with a quick query.
6. **Test against the old results.** Run both versions on the same term data and explain each difference.
7. **Assign an owner.** Someone must watch for failures and retest after updates.

## The skills your team will need

SaaS changes the skill mix rather than removing the need for it. Oracle-focused staff bring deep knowledge of your data, and that is hard to replace. They will likely need training in APIs, pipeline tools and regression testing, while functional staff take a bigger part in defining and testing rules.

Start this early. Pipeline skills are easier to learn on a low-risk report than on your first statutory return.

ITCadence helps teams inventory database dependencies and rebuild them on supported tools. [Talk to us about your inventory](/#contact).

## Sources

- ABCloudz, [HESA statutory reporting on Ellucian SaaS](https://abcloudz.com/blog/modernizing-hesa-statutory-reporting-ellucian-saas/), 15 January 2026
- ABCloudz, [Rebuilding legacy student logic](https://abcloudz.com/blog/rebuilding-legacy-student-logic-ellucian-banner-saas/), 8 January 2026
- ABCloudz, [Banner to Ellucian Student practice page](https://abcloudz.com/practices/modernization-ellucian-banner-to-ellucian-student/), read November 2026
- Evisions, [verification for Ellucian SaaS](https://finance.yahoo.com/technology/articles/ellucian-verifies-full-evisions-suite-140000762.html), September 2026
