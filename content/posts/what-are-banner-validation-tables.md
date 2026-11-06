---
title: "What Are Banner Validation Tables?"
description: "Validation tables define the allowed codes used across Banner: terms, majors, hold types, detail codes and more. How they work and how to govern them."
category: "Banner Basics"
tags: ["Banner basics", "configuration", "data governance"]
date: "2026-10-13"
question: "What are validation tables in Banner?"
answer: "Validation tables hold the lists of allowed codes that Banner pages and processes use, such as terms (STVTERM), majors (STVMAJR), hold types (STVHLDD) or level codes (STVLEVL). They are usually named with a V in the third character, and every code entered elsewhere in Banner must exist in the matching validation table."
faqs:
  - q: "Who should maintain validation tables?"
    a: "Each module's functional owner, under a change-control process, because a new or changed code can affect rules, reports and integrations."
  - q: "Can I delete a validation code?"
    a: "Usually not once it has been used. It is safer to stop using a code than to delete it."
---

## Overview

Validation tables are Banner's **dictionaries**. They make sure data is consistent: you cannot assign a student a major code that does not exist in `STVMAJR`.

## Where to find them

Validation objects follow the naming pattern of a **V in the third position**:

| Prefix | Product | Examples |
|---|---|---|
| GTV | General | Letter codes, email types |
| STV | Student | `STVTERM`, `STVMAJR`, `STVHLDD`, `STVLEVL` |
| TTV | Accounts Receivable | AR validation codes |
| RTV | Financial Aid | Aid validation codes |
| FTV | Finance | `FTVFUND`, `FTVORGN`, `FTVACCT` |
| PTV | HR and Payroll | Earnings, deductions and other codes |

## Why governance matters

Validation codes often carry **behaviour**, not just labels. A hold type on `STVHLDD` controls which processes it blocks; a term on `STVTERM` carries dates that drive other processes. Changing them casually can break registration, billing or reports.

> **Tip:** Keep a simple register of who owns each validation table, how new codes are requested and which reports or integrations depend on them.

Want a configuration health check? [Talk to ITCadence](/#contact).
