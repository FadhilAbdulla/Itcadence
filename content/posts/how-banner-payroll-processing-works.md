---
title: "How Does Payroll Processing Work in Banner HR?"
description: "A walk-through of the Banner payroll cycle, from time entry and calculation to cheques, direct deposit, update and the finance feed, with tips for a smooth run."
coverCode: "PHPCALC"
category: "Banner Finance & HR"
tags: ["Banner HR", "payroll", "jobs"]
date: "2026-09-21"
question: "How does Banner payroll processing work?"
answer: "Banner payroll runs as a sequence of processes for each payroll ID and pay period: extract time and earnings, calculate gross-to-net pay (PHPCALC), assign document numbers, produce cheques and direct deposit files (PHPCHEK and PHPDIRD), update employee history (PHPUPDT), and feed the results to Banner Finance (PHPFEED). Each step is run through job submission and its output is checked before moving on."
faqs:
  - q: "Can a payroll calculation be rerun?"
    a: "Yes, before the payroll is finalised. Once documents are numbered and the update has run, corrections are made through adjustments in a later payroll."
  - q: "Where are employee jobs maintained?"
    a: "Employee records are on PEAEMPL and job assignments, with pay rates and labour distribution, on NBAJOBS."
---

## Overview

Banner payroll is a **disciplined sequence**. Each process depends on the one before it, so most payroll problems come from running steps out of order or skipping a check.

![Banner payroll cycle: time entry, calculation, document numbering, cheques and direct deposit, update, finance feed](/images/diagrams/payroll-cycle.svg "A typical Banner payroll run")

## The typical sequence

1. **Payroll calendar ready**: pay period dates set for the payroll ID.
2. **Time and earnings**: hours and earnings come in from time entry, Self-Service or upload.
3. **Calculation (PHPCALC)**: computes gross pay, deductions, taxes and net pay.
4. **Review**: payroll staff check exceptions, register reports and outliers.
5. **Document numbering**: assigns cheque and direct deposit document numbers.
6. **Cheques and direct deposit (PHPCHEK, PHPDIRD)**: produce payment output and bank files.
7. **Update (PHPUPDT)**: writes results to employee history and marks the payroll complete.
8. **Finance feed (PHPFEED)**: sends salary and benefit expense, coded by FOAPAL, to Banner Finance. See [what FOAPAL is](/blog/what-is-foapal-in-banner-finance).

## Keeping payroll calm

- Run each step through [job submission](/blog/how-banner-job-submission-works) with saved parameter sets.
- Compare each run's totals with the previous period before update.
- Lock down who can run update and finance feed.
- Test tax and deduction table changes in a non-production copy first.

ITCadence provides payroll run monitoring as part of managed Banner HR support. [Contact us](/#contact).
