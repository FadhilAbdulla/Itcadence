---
title: "What Is Banner Self-Service?"
description: "Banner Self-Service lets students, faculty and employees use Banner from a browser. What it includes, how it is deployed and common support issues."
category: "Banner Basics"
tags: ["Self-Service", "Banner 9", "students"]
date: "2026-10-16"
question: "What is Banner Self-Service?"
answer: "Banner Self-Service is the set of web applications that let students, faculty, employees and other users interact with Banner directly. Students register for classes and view records, faculty enter grades and view rosters, and employees see pay and leave information, while Banner security and rules control what each person can do."
faqs:
  - q: "Is Banner Self-Service the same as Admin Pages?"
    a: "No. Admin Pages are for administrative staff. Self-Service is designed for end users such as students, faculty and employees."
  - q: "Can Self-Service be branded?"
    a: "Yes. Banner 9 Self-Service supports theming so institutions can apply their colours and logo."
---

## Overview

**Banner Self-Service** is the user-facing side of Banner. Banner 9 Self-Service was rebuilt as modern web applications that replaced the older Banner 8 PL/SQL pages.

## What Self-Service typically includes

| Audience | Common functions |
|---|---|
| Students | Class search and registration, schedule, grades, holds, account balance, financial aid status |
| Faculty and advisors | Class rosters, final and midterm grade entry, advising profiles |
| Employees | Pay stubs, tax forms, leave balances, time entry, approvals |
| Finance users | Budget queries, requisitions, approvals |

Exact features depend on which Banner products and versions your institution licenses.

## How Self-Service is deployed

Each Banner 9 Self-Service application is a Java web application, deployed on Tomcat or WebLogic and secured through Banner or SSO. Institutions usually put Self-Service behind a load balancer because it carries peak traffic during registration and grade entry.

## Common Self-Service support issues

- **"I can't register"**: usually holds, time tickets, term controls or prerequisite rules. See [how time tickets work](/blog/how-registration-time-tickets-work-in-banner) and [how holds work](/blog/how-holds-work-in-banner-student).
- **Slow pages at registration opening**: capacity and database load. See our [registration readiness runbook](/blog/registration-week-readiness-runbook).
- **Login loops**: SSO or session configuration.

ITCadence supports Self-Service configuration and peak-period coverage. [Contact us](/#contact).
