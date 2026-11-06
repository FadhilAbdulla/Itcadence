---
title: "What Is FOAPAL in Banner Finance?"
description: "FOAPAL is the Banner Finance chart of accounts structure: Fund, Organisation, Account, Program, Activity and Location. What each element means, with examples."
coverCode: "FOAPAL"
category: "Banner Finance & HR"
tags: ["Banner Finance", "chart of accounts", "FOAPAL"]
date: "2026-09-24"
question: "What is FOAPAL in Banner?"
answer: "FOAPAL is the accounting string used in Banner Finance. It stands for Fund, Organisation, Account, Program, Activity and Location. Every financial transaction in Banner is coded with a FOAPAL, which tells the institution where the money came from (fund), who is responsible (organisation), what it was for (account), why (program), and optionally which activity or location it relates to."
faqs:
  - q: "Which FOAPAL elements are required?"
    a: "Fund, Organisation, Account and Program are typically required. Activity and Location are optional and used by institutions that need extra detail."
  - q: "Where are FOAPAL codes defined?"
    a: "Each element has its own maintenance page: FTMFUND, FTMORGN, FTMACCT, FTMPROG, FTMACTV and FTMLOCN, all within a chart of accounts."
  - q: "What is the chart of accounts code?"
    a: "A one-character code that precedes the FOAPAL and identifies which chart of accounts the elements belong to."
---

## Overview

FOAPAL is how Banner Finance classifies every dollar or dirham. Get the FOAPAL design right and reporting is easy; get it wrong and every report needs workarounds.

![FOAPAL breakdown showing Fund, Organisation, Account, Program, Activity and Location with example codes](/images/diagrams/foapal.svg "The six elements of a Banner FOAPAL string")

## The six elements

| Element | Question it answers | Example |
|---|---|---|
| **F**und | Where did the money come from? | 110000 Operating fund |
| **O**rganisation | Who is responsible? | 3100 Department of Engineering |
| **A**ccount | What was it spent on or earned from? | 7210 Office supplies |
| **P**rogram | Why, in functional terms? | 10 Instruction |
| **A**ctivity | Which project or event? (optional) | CONF26 Annual conference |
| **L**ocation | Where? (optional) | DXB Dubai campus |

## Where FOAPAL shows up

- **Journal vouchers** on `FGAJVCD`
- **Requisitions, purchase orders and invoices**
- **Payroll** labour distribution
- **Student AR** detail codes that post to Finance
- **Budget** development and budget status inquiries such as `FGIBDST`

## Design tips

1. Keep **organisation** aligned with how budgets are managed.
2. Use **program** for functional reporting such as instruction, research or student services.
3. Don't overload **activity** and **location** without a reporting need.
4. Use **fund and organisation security** so users only see what they own.
