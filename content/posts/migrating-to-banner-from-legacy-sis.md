---
title: "Moving to Banner From a Legacy SIS: A Data Conversion Guide"
description: "Replacing an older student system with Ellucian Banner? How to decide what history to bring, map codes, match people and prove the data is right."
category: "Migration"
tags: ["migration", "data conversion", "implementation", "Banner Student"]
date: "2026-11-09"
question: "How do you migrate data to Ellucian Banner from a legacy student system?"
answer: "Decide what history to bring across, archive official records from the old system, map every legacy code to Banner validation tables, match each person to a single Banner record, then convert in repeated rehearsals. Prove each rehearsal with record counts, financial balances and a registrar-approved sample of transcripts before you switch over."
faqs:
  - q: "Should we bring all our historical student data into Banner?"
    a: "Not automatically. Bring what staff need to serve students and meet obligations, and archive the rest in a searchable form. Broward College's project validated 88 million records dating back to the 1960s, which shows the scale full history can reach."
  - q: "How do we know the converted data is correct?"
    a: "Compare record counts and key totals between systems, then have the registrar review a sample of converted transcripts against the source. Repeat on every rehearsal, not only the last one."
  - q: "Who converts the data in a Banner SaaS implementation?"
    a: "Check your contract. One consultancy describes data conversion for Ellucian Student as Ellucian-led, with the institution responsible for data readiness. Your team still owns cleaning the source data and signing off the result."
---

Not every Banner project starts with Banner. [American University in Dubai](https://www.ellucian.com/newsroom/american-university-dubai-selects-ellucian-banner-saas-transform-campus-technology) and the [University of Stirling](https://www.ellucian.com/newsroom/university-stirling-chooses-ellucian-student-powered-banner-streamline-technology) both announced moves from legacy systems to Ellucian products. [Broward College](https://www.sigcorp.com/case-studies/modernizing-erp-systems-with-strategic-guidance-from-sig-on-banner-saas/) is replacing a homegrown system its partner describes as about 30 years old.

For projects like these, data conversion is often the riskiest workstream. Here is how to approach it.

## 1. Decide what history to bring

Bringing everything feels safe, but it multiplies the work. Broward's case study mentions **88 million academic records dating back to the 1960s**, all of which needed conversion and validation support.

Agree the rules early with the registrar, finance and compliance:

| Data | Typical options |
|---|---|
| Active students and applicants | Convert in full |
| Academic history | Convert in full, convert as summarised history, or archive |
| Closed financial accounts | Convert balances only, or archive |
| Old applications and enquiries | Usually archive |
| Documents | Move to document management or keep in a read-only archive |

> **Important:** Before the old system is switched off, export official transcripts and other required records into a secure, searchable archive. Check how long you must keep them.

## 2. Map every code to Banner

Your legacy system has its own codes for programmes, terms, grades, residency, holds and more. Each must map to a Banner [validation table](/blog/what-are-banner-validation-tables) value.

- **Design Banner's codes for the future,** not as a copy of the old system.
- **Record every mapping** in one shared, version-controlled workbook.
- **Get functional owners to sign off** each mapping table.
- **Plan for unmappable values.** Decide whether to clean, merge or retire them before conversion.

Term codes deserve special care, as they drive registration and billing. See [how term codes and CRNs work](/blog/how-banner-term-codes-and-crns-work).

## 3. Match each person to one record

Banner identifies each person by an internal [PIDM](/blog/what-is-pidm-in-banner). A person who is a student, an employee and an alumnus should end up as one record, not three.

1. **Find duplicates in the source** using names, dates of birth, national IDs and email addresses.
2. **Agree the matching rules** and who decides doubtful matches.
3. **Merge before loading.** Merging after go-live is harder.
4. **Keep a cross-reference** from old IDs to new Banner IDs for integrations and investigations.

## 4. Convert in rehearsals

Never let go-live be the first full conversion. Run several full rehearsals, each from a fresh extract:

- **Time each run.** The duration sets your cutover window.
- **Log every rejected record** and fix the cause at source, not by hand in Banner.
- **Track the error count** from one rehearsal to the next. It should fall.

## 5. Prove the data is right

Reconciliation turns "it loaded" into "it is correct":

| Check | Example |
|---|---|
| **Counts** | Students per programme and term match between systems |
| **Totals** | Account balances and credits match to the cent |
| **Samples** | Registrar compares converted transcripts with the source, record by record |
| **Process tests** | Register, bill and grade converted students end to end |

Ask the registrar and the finance lead to sign off each rehearsal formally. Their sign-off is what makes cutover a decision rather than a guess.

## 6. Rebuild integrations deliberately

Old systems often hide several business processes inside one integration. A consultancy guide to [modernising Banner integrations](https://abcloudz.com/blog/how-to-modernize-one-legacy-banner-integration-into-purpose-built-pipelines-ellucian-platform-saas/) suggests asking questions such as:

- "Which flows are inbound into Banner?"
- "Which flows need separate validation, schedules, logs, or owners?"
- "Which flows should be preserved, simplified, split, or retired?"

Its point is that pipeline boundaries should follow business functions. In SaaS, integrations will also need to use [supported APIs rather than the database](/blog/banner-saas-direct-database-access).

## 7. Plan reporting for day one

When standard reports do not meet their needs, staff tend to build their own spreadsheets, which leads to conflicting numbers. List the reports each office needs in its first term, and confirm how each will be produced before go-live. See [Banner reporting options](/blog/what-reporting-tools-work-with-banner).

## A realistic view of effort

Conversion effort depends on how much history you bring, how clean the source data is and how many systems connect to it. For context on overall timelines, see [how long Banner migrations take](/blog/how-long-does-banner-saas-migration-take).

ITCadence helps institutions plan and validate Banner data conversions and support teams after go-live. Read about the [migration support you may need](/blog/banner-migration-support-guide), or [talk to us](/#contact).

## Sources

- Ellucian, [American University in Dubai selects Banner SaaS](https://www.ellucian.com/newsroom/american-university-dubai-selects-ellucian-banner-saas-transform-campus-technology), February 2025
- Ellucian, [University of Stirling chooses Ellucian Student](https://www.ellucian.com/newsroom/university-stirling-chooses-ellucian-student-powered-banner-streamline-technology), May 2025
- Strata Information Group, [Broward College case study](https://www.sigcorp.com/case-studies/modernizing-erp-systems-with-strategic-guidance-from-sig-on-banner-saas/), read November 2026
- ABCloudz, [Modernising one legacy Banner integration](https://abcloudz.com/blog/how-to-modernize-one-legacy-banner-integration-into-purpose-built-pipelines-ellucian-platform-saas/), June 2026
- ABCloudz, [Banner to Ellucian Student practice page](https://abcloudz.com/practices/modernization-ellucian-banner-to-ellucian-student/), read November 2026
