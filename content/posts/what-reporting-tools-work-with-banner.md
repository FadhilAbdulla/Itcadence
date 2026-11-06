---
title: "Which Reporting Tools Work with Ellucian Banner?"
description: "Banner reporting options range from delivered reports and job submission output to Argos, the Banner ODS and EDW, and modern analytics platforms. How to choose."
category: "Banner Technical"
tags: ["reporting", "analytics", "Argos", "ODS"]
date: "2026-10-04"
question: "What reporting tools work with Banner?"
answer: "Banner institutions typically combine delivered Banner reports run through job submission, operational reporting tools such as Evisions Argos, Ellucian's Operational Data Store (ODS) and Enterprise Data Warehouse (EDW) for reporting-friendly views and history, and analytics or BI platforms such as Power BI or Tableau fed from those sources. In SaaS, reporting is usually based on Ellucian-supported data access options rather than direct production database queries."
faqs:
  - q: "Should reports query the production Banner database directly?"
    a: "Light operational reports often do, but heavy or historical reporting is better run against the ODS, a data warehouse or a replica to protect production performance."
  - q: "What is the Banner ODS?"
    a: "The Operational Data Store is an Ellucian reporting database with simplified, reporting-friendly views of Banner data."
---

## Overview

There is no single Banner reporting tool. Most institutions use **layers**, each suited to a different question.

## The reporting layers

| Layer | Best for | Examples |
|---|---|---|
| Delivered Banner reports | Standard operational output | Reports run via job submission |
| Operational reporting tools | Lists, letters, ad hoc operational queries | Evisions Argos |
| Reporting data stores | Simplified views and snapshots | Banner ODS, EDW |
| BI and analytics | Dashboards, trends, leadership reporting | Power BI, Tableau |

## How to choose

- **Who is asking?** Clerks need lists; leadership needs trends.
- **How current?** Real-time operational data vs census snapshots.
- **How heavy?** Big historical queries do not belong on production.
- **Where is Banner hosted?** SaaS changes how you access data.

## Good reporting habits

1. Join on **PIDM** and **term**, not names or IDs. See [what PIDM is](/blog/what-is-pidm-in-banner).
2. Define **census dates** and freeze official numbers.
3. Keep a **catalogue of reports** with owners and definitions.
