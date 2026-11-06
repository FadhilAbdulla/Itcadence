---
title: "What Is Banner Application Navigator?"
description: "Application Navigator is the Banner 9 shell that opens Admin Pages, handles search and keeps your session across Banner applications. How it works and common issues."
coverCode: "NAVIGATOR"
category: "Banner Basics"
tags: ["Banner 9", "Application Navigator", "Admin Pages"]
date: "2026-10-24"
question: "What is Banner Application Navigator?"
answer: "Application Navigator is the Banner 9 web shell that staff log in to. It provides a single search box and menu for opening Banner Admin Pages (for example SPAIDEN or FGAJVCD), keeps one authenticated session across Banner 9 applications, and lets users switch between open pages without logging in again."
faqs:
  - q: "How do I open a Banner page in Application Navigator?"
    a: "Type the seven-character page name (for example SPAIDEN) or part of its description into the search box and select the result."
  - q: "Why does Application Navigator keep asking me to log in?"
    a: "Repeated logins usually point to single sign-on or session configuration: CAS or SAML settings, cookie domains, session timeouts or a load balancer that is not keeping sessions sticky."
---

## Overview

In Banner 9, **Application Navigator** is the front door for staff. It replaced the old Banner 8 forms menu with a browser-based shell that hosts Banner Admin Pages and links Banner 9 applications together.

## What Application Navigator does

- **Search**: find any page by name (such as `SGASTDN`) or keyword (such as "student").
- **Menus and favourites**: browse Banner menus or keep a personal list of frequently used pages.
- **Single session**: once you are signed in, Navigator passes your session to other Banner 9 applications.
- **Context**: some pages pass key information such as ID or term when you move between related pages.

## How it fits the architecture

Application Navigator is deployed as its own Banner 9 web application alongside Banner Admin Pages, Self-Service and other apps on Tomcat or WebLogic. Users authenticate through Banner or an SSO identity provider (CAS or SAML), and Navigator uses that identity to apply Banner security.

## Common Application Navigator issues

| Symptom | Usual cause |
|---|---|
| Pages open in a blank frame | Application URL or proxy configuration mismatch |
| Constant re-login prompts | SSO, cookie or load-balancer session settings |
| A page is missing from search | User lacks Banner security for that object, or the application is not registered |
| Slow page loads | App server memory, connection pools or database performance |

For performance troubleshooting see [why Banner 9 pages are slow](/blog/why-are-banner-9-pages-slow).
