---
title: "Banner 8 vs Banner 9: What Actually Changed?"
description: "Banner 9 replaced Oracle Forms with web-based Admin Pages and rebuilt Self-Service. A clear comparison of Banner 8 and Banner 9 for IT and functional teams."
coverCode: "BANNER 9"
category: "Banner Basics"
tags: ["Banner 9", "Banner basics", "upgrades"]
date: "2026-10-26"
question: "What is the difference between Banner 8 and Banner 9?"
answer: "Banner 9 moved Banner's administrative interface from Oracle Forms (Internet Native Banner, or INB) to browser-based Admin Pages that run on Java application servers, and rebuilt Self-Service as modern web applications. The Oracle database and most business logic stayed the same, but the user interface, deployment model, single sign-on and extensibility options changed significantly."
faqs:
  - q: "Is Banner 8 still supported?"
    a: "No. Ellucian ended support for Banner 8 Internet Native Banner at the end of 2018, and institutions are expected to run Banner 9 Admin Pages and Self-Service."
  - q: "Did the Banner database change in Banner 9?"
    a: "The core Oracle database and table structures largely carried over. Banner 9 mainly changed the application tier and user interface."
  - q: "Do Banner 9 form names stay the same?"
    a: "Yes. Pages keep their familiar seven-character names such as SPAIDEN, GJAPCTL or FGAJVCD, which you can type into Application Navigator search."
---

## Overview

Banner 9 is a **new application layer on top of the same Banner database**. The big changes were the user interface, the technology stack and the way Banner is deployed and extended.

## Side-by-side comparison

| Area | Banner 8 | Banner 9 |
|---|---|---|
| Admin interface | Internet Native Banner (Oracle Forms) | Banner Admin Pages in the browser |
| Navigation | Forms menus, direct form names | Application Navigator with search |
| Self-Service | Banner 8 SSB (PL/SQL web pages) | Banner 9 Self-Service applications |
| Application tier | Oracle Forms server | Java web applications on Tomcat or WebLogic |
| Browser plugin | Java applet required | No plugin, runs in modern browsers |
| Customisation | Form modifications | Banner Extensibility and Page Builder |
| Single sign-on | Limited | CAS and SAML 2.0 support |
| Install/upgrade | Manual scripts | Ellucian Solution Manager (ESM) |

## What stayed the same

- The **Oracle database**, tables (such as `SPRIDEN` and `SFRSTCR`) and most PL/SQL packages.
- **Page names** and business processes. A registrar still uses SFAREGS for registration.
- **Job submission** and **population selection** concepts.

## What teams had to learn

1. **Application server administration**: deploying and tuning Banner 9 applications on Tomcat or WebLogic.
2. **SSO configuration** with CAS or SAML identity providers.
3. **Extensibility**: replacing old form modifications with supported extension points. See [what Banner Extensibility is](/blog/what-is-banner-extensibility).
4. **ESM-based upgrades**: see [what Ellucian Solution Manager does](/blog/what-is-ellucian-solution-manager-esm).

> **Tip:** If your institution still carries Banner 8-era modifications, review them now. Many can be retired in favour of delivered Banner 9 functionality or Extensibility, which makes every future upgrade cheaper.
