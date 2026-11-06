---
title: "How Should You Manage Banner Modifications?"
description: "Local modifications make every Banner upgrade harder. How to inventory, classify, test and retire Banner mods, and when to use Extensibility or APIs instead."
category: "Banner Technical"
tags: ["modifications", "upgrades", "governance"]
date: "2026-10-01"
question: "How should you manage Banner modifications?"
answer: "Treat every Banner modification as technical debt with an owner. Keep a full inventory of each mod (what object it changes, why, who owns it, and how it is tested), re-evaluate it at every upgrade, and retire it whenever delivered functionality, Banner Extensibility or an API-based integration can do the same job. New requests should go through change control that prefers configuration and extensibility over code changes."
faqs:
  - q: "What counts as a Banner modification?"
    a: "Any change to Ellucian-delivered objects, such as pages, packages, processes, triggers or tables, plus custom objects that depend on baseline internals."
  - q: "Why do mods make upgrades slower?"
    a: "Each upgrade may overwrite or conflict with modified objects, so every mod must be re-applied, recompiled and regression-tested."
---

## Overview

You cannot avoid all customisation, but you can **know exactly what you have** and **shrink it every year**.

## Step 1: Inventory

For every modification, record:

| Field | Example |
|---|---|
| Object(s) changed | Package, page, trigger, process |
| Business reason | "Collect sponsor reference at registration" |
| Owner | Registrar's office |
| Test steps | How to prove it still works |
| Last reviewed | Release or date |

## Step 2: Classify

- **Retire**: no longer needed or now delivered by Ellucian.
- **Replace with configuration**: rules or validation changes.
- **Move to Extensibility**: labels, fields, simple pages. See [Banner Extensibility](/blog/what-is-banner-extensibility).
- **Move to APIs**: integration logic. See [Ethos APIs](/blog/ethos-api-banner-integrations).
- **Keep**: truly unique and justified, with tests.

## Step 3: Govern new requests

1. Ask "can configuration do this?" first.
2. Then "can Extensibility do this?"
3. Code changes need a business case, an owner and a test script.

> **Tip:** Report your mod count to leadership each term. A visible number tends to go down.
