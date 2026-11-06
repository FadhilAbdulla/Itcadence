---
title: "How Do Term Codes and CRNs Work in Banner?"
description: "Banner identifies terms with term codes defined on STVTERM and class sections with CRNs. How they are structured and why they matter for registration, billing and reporting."
coverCode: "SSASECT"
category: "Banner Student"
tags: ["Banner Student", "schedule", "data model"]
date: "2026-09-30"
question: "What are term codes and CRNs in Banner?"
answer: "A term code identifies an academic term and is defined on STVTERM. Most institutions use a six-character code made of the academic year plus a term suffix, such as 202610. A CRN (Course Reference Number) is the number that uniquely identifies one class section within a term; students register by CRN, and the same CRN can be reused in a different term."
faqs:
  - q: "Is the CRN unique forever?"
    a: "No. A CRN is unique within a term. To identify a section uniquely across time, combine the term code and the CRN."
  - q: "Where are sections created?"
    a: "Class sections are built on the schedule page (SSASECT), which assigns the CRN, meeting times, instructor and capacity."
---

## Overview

Think of the **term code** as the "when" and the **CRN** as the "which section". Together, term and CRN identify exactly one class offering.

## Term codes

- Defined on **`STVTERM`**, with start and end dates, the financial aid year and other attributes.
- The format is institution-defined. A common pattern is **YYYY + two digits**, for example `202610`, `202620`, `202630`, where each institution decides what each suffix means.
- Because codes sort as text, consistent formatting keeps terms in chronological order in reports.

## CRNs

| Concept | Where | Example |
|---|---|---|
| Course (catalogue) | `SCACRSE` | ACCT 101, Principles of Accounting |
| Section (schedule) | `SSASECT` | ACCT 101, section 02, Mon/Wed 10:00 |
| CRN | Assigned on the section | 10452 |
| Registration | `SFRSTCR` table | Student PIDM + term + CRN |

## Why it matters

- **Registration** and **fee assessment** work per term and CRN.
- **LMS integration** creates course shells from term and CRN. See [ILP integration](/blog/banner-lms-integration-ilp).
- **Reports** that ignore the term when joining on CRN produce wrong results.

> **Tip:** In reports and integrations, always use term code and CRN together as the section key.
