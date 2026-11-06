---
title: "How Does Banner Security Work? Classes, Objects and Roles"
description: "Banner controls access with users, security classes and object roles, plus value-based and finance security. How it fits together and how to keep access clean."
coverCode: "GSASECR"
category: "Banner Technical"
tags: ["security", "Banner General", "access control"]
date: "2026-10-23"
question: "How does Banner security work?"
answer: "Banner security grants access to objects (pages, processes and reports) through security classes. Each class is granted objects with a role such as BAN_DEFAULT_M (maintenance) or BAN_DEFAULT_Q (query-only), and users are assigned to one or more classes, usually on GSASECR. On top of object security, Banner supports finer controls such as fund and organisation security in Finance and fine-grained access control that limits which rows a user can see."
faqs:
  - q: "What is the difference between BAN_DEFAULT_M and BAN_DEFAULT_Q?"
    a: "BAN_DEFAULT_M allows maintenance (insert, update, delete) on an object, while BAN_DEFAULT_Q allows query-only access."
  - q: "Should users be granted objects directly?"
    a: "It is better practice to grant objects to security classes and assign users to classes, so access is role-based and easier to audit."
  - q: "How does SSO affect Banner security?"
    a: "SSO handles authentication (who you are). Banner security still controls authorisation (what you can do)."
---

## Overview

Banner security is **role-based**: objects go into classes, classes go to users.

## The layers

| Layer | What it controls |
|---|---|
| Object security | Which pages, jobs and reports a user can open, and whether they can change data |
| Security classes | Bundles of objects that represent a job role, such as "Registrar clerk" |
| Value-based / fine-grained access | Which rows a user can see, for example only certain student levels |
| Finance fund/org security | Which funds and organisations a user can query or post to |
| Self-Service roles | What students, faculty and employees can see in Self-Service |

## A clean security model

1. **Design classes around roles**, not individuals.
2. **Separate query and maintenance** classes where possible.
3. **Review access** at least yearly with each module owner.
4. **Remove access promptly** when staff change roles or leave.
5. **Log and audit** high-risk objects such as payroll update or grade change.

> **Important:** SSO does not replace Banner security. A user who can sign in still needs the right classes. See [how SSO works with Banner 9](/blog/how-single-sign-on-works-with-banner-9).

ITCadence runs Banner security reviews and access clean-ups. [Book a review](/#contact).
