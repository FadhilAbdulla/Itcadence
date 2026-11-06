---
title: "How Do Holds Work in Banner Student?"
description: "Banner holds block actions such as registration, transcripts or graduation. Learn how hold types are defined on STVHLDD, applied on SOAHOLD and released."
category: "Banner Student"
tags: ["holds", "Banner Student", "registration"]
date: "2026-10-09"
question: "How do holds work in Banner?"
answer: "A hold is a flag placed on a person that blocks certain actions until it is released. Hold types are defined on the STVHLDD validation page, where each type is marked with the processes it blocks (such as registration, transcripts, graduation, grades or accounts receivable). Staff add or release holds for individual people on SOAHOLD, and holds can also be created automatically by processes such as AR collections."
faqs:
  - q: "Where do I add a hold to a student in Banner?"
    a: "On SOAHOLD (Hold Information), by entering the person's ID, the hold type, dates and reason."
  - q: "How do I find which hold is blocking registration?"
    a: "Check the student's active holds on SOAHOLD and compare the hold types against the registration flag on STVHLDD. Students can also see their holds in Self-Service."
  - q: "Do holds expire?"
    a: "Holds have from and to dates. A hold stops being active after its end date, or when staff release it."
---

## Overview

Holds are Banner's way of saying "not until you sort this out". The **hold type** decides *what* is blocked; the **hold record** decides *who* is blocked and *when*.

## Defining hold types: STVHLDD

Each hold type on `STVHLDD` carries indicators for what it restricts, typically including:

- Registration
- Transcripts
- Graduation
- Grades
- Accounts receivable
- Enrolment verification
- Applications to graduate

A "Library fine" hold might block transcripts only, while a "Finance balance" hold might block registration and transcripts.

## Applying holds: SOAHOLD

On `SOAHOLD`, authorised staff add a hold to a person with:

| Field | Purpose |
|---|---|
| Hold type | Which restrictions apply |
| From / To dates | When the hold is active |
| Reason | Free-text explanation |
| Amount | Optional, for financial holds |
| Originator | The office that placed the hold |

Banner security can limit which offices can add or release which hold types.

## Good hold governance

- **One owner per hold type**: the office that places it releases it.
- **Clear student messaging**: tell students how to clear the hold in Self-Service.
- **Review before registration**: clear stale holds before registration opens. See our [registration readiness runbook](/blog/registration-week-readiness-runbook).
