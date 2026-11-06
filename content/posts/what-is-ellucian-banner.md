---
title: "What Is Ellucian Banner? A Plain-English Guide"
description: "Ellucian Banner is a higher-education ERP that runs student, finance, HR, financial aid and advancement processes. What it does and how it is structured."
category: "Banner Basics"
tags: ["Banner basics", "ERP", "higher education"]
date: "2026-10-28"
featured: true
question: "What is Ellucian Banner?"
answer: "Ellucian Banner is an enterprise resource planning (ERP) system built for colleges and universities. It runs the core administrative processes of an institution (admissions, registration, academic records, student accounts, financial aid, finance, HR and payroll, and alumni relations) on a single Oracle database, with staff using Banner Admin Pages and students and employees using Banner Self-Service."
faqs:
  - q: "Who makes Banner?"
    a: "Banner is developed by Ellucian, a software company focused on higher education. ITCadence is an independent service provider that supports institutions running Banner."
  - q: "What database does Banner use?"
    a: "Banner runs on an Oracle database. In Ellucian's SaaS offering, the database is managed by Ellucian rather than by the institution."
  - q: "Is Banner only for universities?"
    a: "Banner is designed for higher education: universities, colleges, community colleges and similar institutions."
---

## Overview

**Ellucian Banner** is a student information system and ERP for higher education. Instead of running admissions, registration, billing, financial aid, finance and payroll in separate systems, an institution runs them in Banner, which shares one set of person and organisation records across every office.

## The main Banner modules

| Module | What it covers |
|---|---|
| Banner Student | Admissions, catalogue, class schedule, registration, academic history, transcripts, graduation |
| Banner Accounts Receivable | Student and non-student accounts, fee assessment, billing, payments |
| Banner Financial Aid | Need analysis, packaging, awarding, disbursement |
| Banner Finance | General ledger, budgets, purchasing, accounts payable, fixed assets, grants |
| Banner HR and Payroll | Positions, employees, payroll, leave, benefits |
| Banner Advancement | Alumni, donors, gifts and campaigns |
| Banner General | Shared person records, security, job submission, population selection, letters |

Each module uses the shared **Banner General** layer, so a student who is also an employee and later a donor keeps one identity record.

![Banner 9 architecture: users reach Admin Pages and Self-Service through a browser; applications run on Java app servers over an Oracle database](/images/diagrams/banner-architecture.svg "How the main pieces of Banner 9 fit together")

## How people use Banner

- **Staff** (registrars, bursars, finance and HR teams) work in **Banner Admin Pages**, opened through **Application Navigator**.
- **Students, faculty and employees** use **Banner Self-Service** to register, view grades, enter final grades or see pay stubs.
- **Other systems** such as the LMS, ID card systems and CRMs connect through **Ellucian Ethos** APIs or file-based feeds.

## Where Banner can run

Institutions run Banner either **on-premises** (their own data centre or private cloud) or on **Ellucian SaaS**, where Ellucian operates the infrastructure and delivers updates continuously. See our comparison of [Banner SaaS vs on-premise](/blog/banner-saas-vs-on-premise).

## Why institutions need Banner support

Banner is highly configurable, and that is both its strength and its maintenance burden. Rules, validation tables, jobs, integrations and local modifications all need care through every release and academic term. That is the work ITCadence does every day. [Talk to us](/#contact) about managed Banner support.
