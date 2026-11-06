---
title: "How Does Fee Assessment Work in Banner?"
description: "Banner calculates tuition and fees from registration using fee assessment rules and detail codes. How the process works, where charges appear and how to troubleshoot."
category: "Banner Student"
tags: ["Accounts Receivable", "fees", "Banner Student"]
date: "2026-09-27"
question: "How does fee assessment work in Banner?"
answer: "Banner fee assessment reads a student's registration for a term, applies the institution's fee assessment rules (by level, campus, programme, credit hours, residency and other criteria) and posts the resulting tuition and fee charges to the student's account in Accounts Receivable using detail codes. It can run online when registration changes or in batch through the SFRFASC process."
faqs:
  - q: "What is a detail code?"
    a: "A detail code, defined on TSADETC, identifies a type of charge or payment (for example undergraduate tuition or a lab fee) and carries its accounting distribution."
  - q: "Where can I see a student's charges?"
    a: "On the account detail review page (TSAAREV), and students can see their balance in Self-Service."
  - q: "Why didn't a student get charged?"
    a: "Usually the student's attributes did not match any fee rule, the term's assessment controls are off, or batch assessment did not include them."
---

## Overview

Registration tells Banner **what** a student is taking. Fee rules tell Banner **what that costs**. Fee assessment turns one into the other and posts charges to Accounts Receivable.

## The building blocks

| Piece | Purpose |
|---|---|
| Detail codes (`TSADETC`) | Define each charge type and where it posts in Finance |
| Fee assessment rules | Match students by level, campus, residency, programme and credit hours to a charge |
| Refund rules | Reduce charges when students drop within a refund period |
| Account detail (`TSAAREV`) | Shows charges, payments and balance per student |
| Batch assessment (`SFRFASC`) | Reassesses many students at once |

## Online vs batch

- **Online**: charges recalculate when a student's registration changes.
- **Batch**: run `SFRFASC` after mass changes such as rule updates, residency corrections or term setup.

## Troubleshooting

1. Confirm the student's **level, campus, residency and programme** for the term.
2. Check the **fee rules** for that combination and credit range.
3. Review **TSAAREV** for existing or reversed charges.
4. Rerun assessment for the student and compare.

> **Tip:** Before each term, run a test assessment for a sample of student types and compare totals with the published fee schedule.
