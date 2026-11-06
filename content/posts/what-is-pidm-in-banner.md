---
title: "What Is a PIDM in Banner?"
description: "The PIDM is Banner's internal person identifier. Learn how it differs from a Banner ID, where it is stored, and why it matters for reporting and integrations."
coverCode: "PIDM"
category: "Banner Basics"
tags: ["Banner basics", "data model", "reporting"]
date: "2026-10-21"
question: "What does PIDM mean in Banner?"
answer: "PIDM stands for Person Identification Master. It is the internal, system-generated number Banner uses to link every record about a person or organisation across all modules. Unlike the Banner ID that users see, the PIDM never changes and is not shown on most pages, so it is the reliable key for joins in reports and integrations."
faqs:
  - q: "What is the difference between a PIDM and a Banner ID?"
    a: "The Banner ID is the visible identifier staff and students use and it can be changed. The PIDM is a hidden internal number that stays constant and links all records."
  - q: "Where is the PIDM stored?"
    a: "The SPRIDEN table holds names and IDs for each PIDM. Almost every other Banner table that stores person data carries a PIDM column."
  - q: "Should integrations use the PIDM?"
    a: "Inside Banner reports, yes. For external integrations, Ethos APIs use their own GUIDs, which is safer than exposing internal PIDMs."
---

## Overview

Every person and non-person entity in Banner (students, employees, vendors, donors) gets a **PIDM**, a unique internal number. All modules store the PIDM, which is how Banner knows that the student in `SFRSTCR`, the employee in payroll and the donor in Advancement are the same person.

## PIDM vs Banner ID

| | PIDM | Banner ID |
|---|---|---|
| Visible to users | Rarely | Yes |
| Can change | Never | Yes (with history kept) |
| Used for | Joining data across tables | Looking people up |
| Stored in | Almost every person table | `SPRIDEN` |

When an ID or name changes, Banner adds history rows in `SPRIDEN`. The **current** record has a null change indicator, which is why reports usually filter on `SPRIDEN_CHANGE_IND IS NULL`.

## Why the PIDM matters

- **Reporting**: always join tables on PIDM, not on Banner ID or name.
- **Data quality**: duplicate people mean duplicate PIDMs. Merging them requires careful identity management.
- **Integrations**: avoid exposing PIDMs externally. Ethos APIs use GUIDs designed for that purpose. See [what Ellucian Ethos is](/blog/what-is-ellucian-ethos).

> **Note:** Treat PIDMs as internal keys. Do not print them on documents or use them as login names.
