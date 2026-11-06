---
title: "Banner SaaS vs On-Premise: What Changes?"
description: "Moving Banner to Ellucian SaaS changes who runs infrastructure, how upgrades arrive, and how you customise, report and integrate. A side-by-side comparison."
category: "Cloud"
tags: ["SaaS", "cloud", "Banner"]
date: "2026-09-23"
updated: "2026-11-07"
question: "What is the difference between Banner SaaS and on-premise Banner?"
answer: "With on-premise Banner, the institution runs the servers, database, upgrades and customisations. With Ellucian Banner SaaS, Ellucian operates the infrastructure and delivers updates continuously, while the institution focuses on configuration, testing and business processes. The trade-off is less control over code and database access, so modifications, direct database integrations and reporting must move to supported extension points, APIs and data access options."
faqs:
  - q: "Can we keep our Banner modifications in SaaS?"
    a: "Direct code modifications are generally restricted in SaaS. They need to be retired or rebuilt with Extensibility, configuration or APIs."
  - q: "Does SaaS remove the need for a Banner team?"
    a: "No. Functional configuration, testing of updates, security, integrations and reporting still need skilled staff or a support partner."
---

## Overview

SaaS moves **infrastructure and upgrades** to Ellucian. It does not remove the need to **configure, test and govern** Banner.

> **Note:** Ellucian now markets its SaaS student system as Ellucian Student powered by Banner. Read [what Ellucian Student is and what actually changed](/blog/what-is-ellucian-student-powered-by-banner).

![Five-phase Banner SaaS migration plan: inventory, classify, rebuild integrations, rehearse cutover, hypercare](/images/diagrams/saas-phases.svg "A typical path from on-premise to SaaS")

## Side-by-side

| Area | On-premise | Ellucian SaaS |
|---|---|---|
| Servers and database | Institution | Ellucian |
| Upgrades | Institution schedules and applies | Delivered continuously by Ellucian |
| Code modifications | Possible, costly to maintain | Restricted; use Extensibility |
| Direct DB access | Yes | Restricted; use supported data access |
| Integrations | Any method | APIs and supported methods |
| Testing | When you upgrade | Ongoing, for each delivered update |

## What your team does after SaaS

- **Configuration and business rules**
- **Regression testing** of delivered updates
- **Security and access management**
- **Integration and reporting ownership**

Planning a move? Read [the practical migration plan](/blog/banner-saas-migration-plan), see [what replaces direct database access](/blog/banner-saas-direct-database-access) and check [how long real migrations have taken](/blog/how-long-does-banner-saas-migration-take). In the Gulf, also read [Banner SaaS hosting in the UAE](/blog/banner-saas-uae-gcc-hosting).
