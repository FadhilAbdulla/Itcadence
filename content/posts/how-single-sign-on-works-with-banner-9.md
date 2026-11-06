---
title: "How Does Single Sign-On Work with Banner 9?"
description: "Banner 9 supports single sign-on through CAS and SAML 2.0 with identity providers such as Microsoft Entra ID, ADFS, Okta or Shibboleth. How it works and common pitfalls."
coverCode: "SAML SSO"
category: "Banner Technical"
tags: ["SSO", "SAML", "security", "Banner 9"]
date: "2026-10-17"
question: "How does single sign-on work with Banner 9?"
answer: "Banner 9 applications can delegate authentication to an institutional identity provider using CAS or SAML 2.0. The user signs in once with their institutional account, the identity provider sends Banner a trusted assertion containing a user identifier, and Banner maps that identifier to a Banner user or person record. Banner security then decides what that user can access."
faqs:
  - q: "Which identity providers work with Banner 9?"
    a: "Any provider that supports SAML 2.0 or CAS, including Microsoft Entra ID (Azure AD), ADFS, Okta and Shibboleth, subject to correct configuration."
  - q: "Why do users get logged out between Banner applications?"
    a: "Usually inconsistent SSO settings across applications, mismatched cookie domains or session timeouts, or load-balancer stickiness issues."
---

## Overview

With SSO, Banner **trusts your identity provider** to say who the user is. Banner still decides what they are allowed to do.

## The SAML flow in brief

1. The user opens Banner Application Navigator or Self-Service.
2. Banner redirects them to the **identity provider** (IdP).
3. The user signs in, typically with MFA.
4. The IdP returns a signed **SAML assertion** with an attribute such as username or employee ID.
5. Banner **maps** that value to a Banner account and applies [Banner security](/blog/how-banner-security-classes-work).

## Configuration checklist

| Item | Why it matters |
|---|---|
| Matching user attribute | The IdP must send a value Banner can map to a user |
| Certificates | Signing certificates must be valid and rotated before expiry |
| Entity IDs and URLs | Must match exactly between Banner apps and the IdP |
| Consistent settings | Every Banner 9 app needs aligned SSO configuration |
| Logout behaviour | Decide whether logging out of Banner also logs out of the IdP |

## Common pitfalls

- **Expired IdP certificates** causing sudden login failures across all Banner apps.
- **Attribute changes** in the directory that break user mapping.
- **One app misconfigured**, so users are prompted again when switching apps.

> **Tip:** Put SSO certificate expiry dates in your operations calendar with reminders at least 30 days ahead.
