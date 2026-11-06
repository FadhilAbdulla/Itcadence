---
title: "What Is Ellucian Solution Manager (ESM)?"
description: "Ellucian Solution Manager is the tool Banner 9 institutions use to install, upgrade and deploy Banner across environments. What it does and best practices."
coverCode: "ESM"
category: "Banner Technical"
tags: ["ESM", "upgrades", "Banner 9"]
date: "2026-10-20"
question: "What is Ellucian Solution Manager (ESM)?"
answer: "Ellucian Solution Manager (ESM) is a web-based tool for managing on-premises Banner environments. It downloads Banner releases, applies database upgrades, builds and deploys Banner 9 web applications, and tracks which release of each product is installed in each environment, such as development, test and production."
faqs:
  - q: "Do SaaS customers use ESM?"
    a: "ESM is mainly used by institutions that manage their own Banner environments. In Ellucian SaaS, Ellucian manages upgrades."
  - q: "Can ESM upgrade production automatically?"
    a: "ESM can run upgrades, but institutions should always promote releases through test environments first and schedule production changes in maintenance windows."
---

## Overview

ESM is the **control panel for Banner upgrades**. It replaced much of the manual scripting that Banner 8-era upgrades required.

## What ESM does

| Task | How ESM helps |
|---|---|
| Release download | Fetches available Banner releases for your products |
| Prerequisite checks | Shows release dependencies and order |
| Database upgrades | Runs the database portion of a release |
| Application builds | Builds Banner 9 web applications, including local customisations |
| Deployment | Deploys applications to app servers |
| Inventory | Tracks installed releases per environment |

## Best practices

1. **Keep ESM itself current**, since newer releases may need newer ESM versions.
2. **Mirror production** in a test environment and upgrade there first.
3. **Bundle releases by module** to reduce regression cycles. See our guide to [finding your Banner patching cadence](/blog/banner-9-patching-cadence).
4. **Record every upgrade**: which releases, which environment, who approved it.
5. **Recompile invalid objects** and run health checks after each upgrade.

> **Tip:** Treat ESM environment definitions as critical configuration. Back them up and document them.
