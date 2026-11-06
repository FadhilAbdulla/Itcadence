---
title: "What Is Banner Extensibility and Page Builder?"
description: "Banner Extensibility lets institutions change Banner 9 pages and build new ones without modifying baseline code. What it can do and when to use it instead of mods."
category: "Banner Technical"
tags: ["Extensibility", "Page Builder", "Banner 9", "modifications"]
date: "2026-10-10"
question: "What is Banner Extensibility?"
answer: "Banner Extensibility is a set of Banner 9 tools for tailoring the system without changing Ellucian's baseline code. It lets institutions hide, relabel or reorder fields on Admin Pages, add institution-specific fields, and build new pages with Page Builder. Because these changes live outside the delivered code, they are much easier to carry through upgrades than traditional modifications."
faqs:
  - q: "Can Extensibility replace all modifications?"
    a: "Not all, but many common modifications (labels, hidden fields, extra data capture and simple custom pages) can move to Extensibility."
  - q: "Is Extensibility available in Banner SaaS?"
    a: "Supported extension points are the preferred way to tailor Banner in SaaS, where direct code modification is restricted."
---

## Overview

Extensibility is the **upgrade-safe** way to make Banner fit your institution.

## What you can do

| Capability | Example |
|---|---|
| Hide or relabel fields | Rename a field to match local terminology |
| Reorder fields | Put the fields your staff use first |
| Extra fields | Capture an institution-specific attribute |
| Page Builder | Build a small custom page or form |

## Extensibility vs modifications

| | Baseline modification | Extensibility |
|---|---|---|
| Changes delivered code | Yes | No |
| Survives upgrades | Must be re-applied and retested | Usually carries forward |
| Fits SaaS | Restricted | Preferred approach |
| Governance | Code review and release management | Configuration review |

## Where to start

1. Pull your [modification inventory](/blog/how-to-manage-banner-modifications).
2. Tag mods that only change labels, visibility or simple data capture.
3. Rebuild those in Extensibility and retire the mod.
4. Keep a register of every extension and its owner.
