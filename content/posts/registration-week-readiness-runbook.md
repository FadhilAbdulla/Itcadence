---
title: "Registration Week Readiness: A Banner Support Runbook"
description: "Registration is your system's peak load and your users' least patient moment. A checklist for the two weeks before it opens."
category: "Banner Support"
tags: ["registration", "operations", "Self-Service", "performance"]
date: "2026-08-27"
question: "How do you prepare Banner for registration week?"
answer: "Two weeks out, confirm term controls, time tickets, section rules and stale holds, and freeze non-essential changes. One week out, load-test Self-Service registration, check database and app server capacity, verify LMS sync and brief the helpdesk. On opening day, staff a shared bridge, monitor response times and errors in real time and communicate early with students."
faqs:
  - q: "Should we deploy fixes during registration?"
    a: "Avoid code deployments during registration. Fix forward with configuration where possible and schedule code changes after the peak."
  - q: "What causes most registration-day tickets?"
    a: "Holds, time ticket assignments, prerequisite and capacity rules, and performance under peak load."
---

For Banner support teams, registration opening is the equivalent of a retailer's busiest day. Thousands of students hit Self-Service at the same minute, advisors override holds and the registrar's phone never stops.

## Two weeks out

- Confirm term controls, [time tickets](/blog/how-registration-time-tickets-work-in-banner) and priority groups with the registrar.
- Validate prerequisite, capacity and restriction rules on high-demand sections.
- Review and clear stale [holds](/blog/how-holds-work-in-banner-student) that would block eligible students.
- Freeze non-essential changes in production.

## One week out

- Load-test Student Registration Self-Service at realistic concurrency.
- Check database and app server capacity, connection pools and session limits. See [why Banner 9 pages are slow](/blog/why-are-banner-9-pages-slow).
- Verify LMS integration so new enrolments reach course shells.
- Brief helpdesk staff with known issues and scripted answers.

## Opening day

1. DBAs and application admins on a shared bridge 30 minutes before opening.
2. Watch response times, error logs and blocking sessions in real time.
3. One incident channel between support, the registrar and communications.
4. Post status updates to students early. Silence creates more tickets than slowness does.

> **Tip:** Keep a fix-forward mindset. During registration, solve problems with configuration, not code deployments.

## After the rush

Hold a short retrospective within a week. Capture what broke, what nearly broke and which tickets repeated. Those notes become next term's runbook.

ITCadence offers dedicated registration-week coverage alongside managed support plans. [Ask about peak-period support](/#contact).
