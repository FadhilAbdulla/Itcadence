---
title: "How Do Registration Time Tickets Work in Banner?"
description: "Time tickets control when each student can register. How Banner assigns registration windows, the controls behind them and how to troubleshoot 'not permitted to register' errors."
category: "Banner Student"
tags: ["registration", "Banner Student", "Self-Service"]
date: "2026-10-11"
question: "How do registration time tickets work in Banner?"
answer: "A time ticket is the date-and-time window in which a student is allowed to register for a term. Institutions define registration groups with start and end times, then assign students to those groups, typically by class level, credits earned or priority status. When a student tries to register in Self-Service, Banner checks the term's registration controls and only allows registration inside the student's assigned window."
faqs:
  - q: "Why does a student see 'You have no time ticket' or a similar message?"
    a: "The student is not assigned to a registration group for that term, or the assignment process did not include them. Check their group assignment and the population used to assign groups."
  - q: "Can advisors override a time ticket?"
    a: "Institutions commonly allow authorised staff to register students outside their window from the admin registration page, or to grant individual overrides."
---

## Overview

Time tickets stop thousands of students from registering at the same second, and give priority groups (such as final-year or honours students) earlier access.

## The moving parts

1. **Term registration controls**: term-level settings decide whether time ticket checks apply for a term.
2. **Registration groups**: each group has one or more date and time windows (in most releases these are maintained on `SFARCTT`).
3. **Group assignment**: students are assigned to groups, usually in bulk using a [population selection](/blog/what-is-population-selection-in-banner) that ranks students by class level, credits or other attributes.
4. **The registration check**: when the student registers in Self-Service, Banner compares the current time to the student's window.

## A typical priority scheme

| Group | Who | Window opens |
|---|---|---|
| 1 | Students with accessibility or athletics priority | Monday 08:00 |
| 2 | Final-year students | Monday 12:00 |
| 3 | Third-year students | Tuesday 08:00 |
| 4 | Everyone else | Wednesday 08:00 |

## Troubleshooting checklist

- Is the student **assigned to a group** for the right term?
- Did the group assignment run **after** the latest academic history update (for credit-based groups)?
- Are window dates and times correct, including **time zone** on the app server?
- Is a **hold** also blocking registration? See [how holds work](/blog/how-holds-work-in-banner-student).

> **Tip:** Rehearse time ticket assignment in your test environment a week before registration and spot-check students in each group.
