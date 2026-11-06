---
title: "Why Are Banner 9 Pages Slow? A Troubleshooting Guide"
description: "Slow Banner 9 Admin Pages or Self-Service usually come from the database, the app servers or the network. A layered checklist to find and fix the bottleneck."
category: "Banner Technical"
tags: ["performance", "Banner 9", "troubleshooting", "Oracle"]
date: "2026-10-14"
question: "Why are Banner 9 pages slow?"
answer: "Slow Banner 9 pages are usually caused by one of three layers: the Oracle database (long-running SQL, stale statistics, locking or resource limits), the Java application servers (memory pressure, garbage collection, exhausted connection pools or too few instances), or the network path (load balancers, proxies, SSO redirects). The fix starts with measuring which layer the time is spent in before changing anything."
faqs:
  - q: "Is it always the database?"
    a: "No. Banner 9 adds an application tier, and memory or connection-pool problems on Tomcat or WebLogic are a frequent cause of slowness."
  - q: "Why is Banner slow only during registration?"
    a: "Peak concurrency exposes capacity limits in app server instances, database sessions and connection pools. Load testing before registration helps."
---

## Overview

Measure first, tune second. Banner 9 performance problems sit in **one of three layers**, and guessing wastes days.

## Layer 1: The Oracle database

- Look for **long-running or high-load SQL** in AWR or your monitoring tool.
- Check **optimizer statistics** are current, especially after large data loads.
- Watch for **blocking locks** from batch jobs running during business hours.
- Confirm **CPU, memory and I/O** are not saturated.

## Layer 2: The application servers

| Check | Symptom when wrong |
|---|---|
| JVM heap size and garbage collection | Pauses, sudden slowness, out-of-memory errors |
| Database connection pool size | Requests wait for a connection at peak |
| Number of instances behind the load balancer | Fine off-peak, slow at registration |
| Application logs | Repeated errors or timeouts |

## Layer 3: The network and SSO

- **Load balancer** health checks and session stickiness.
- **Reverse proxy** buffering and timeouts.
- **SSO redirects** adding round trips on every app switch. See [SSO with Banner 9](/blog/how-single-sign-on-works-with-banner-9).

## A practical order of work

1. Reproduce the problem and note page, time and user count.
2. Check app server metrics and logs at that time.
3. Check database load and top SQL at that time.
4. Fix the biggest contributor, re-measure, repeat.

> **Tip:** Keep a baseline of normal response times so you can tell "slow" from "normal for registration day".
