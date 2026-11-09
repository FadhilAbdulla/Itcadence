---
title: "Banner 9 Login Errors: What They Mean and How to Fix Them"
description: "Logon denied, session expired, Service Invocation Failed, UDC Id not available. What common Banner 9 login errors mean, with fixes for users and help desks."
category: "Banner Technical"
tags: ["troubleshooting", "Banner 9", "Self-Service", "SSO", "login"]
date: "2026-11-09"
question: "Why can't I log in to Banner 9?"
answer: "Most Banner 9 login errors come from four causes: an expired or locked account or password, an inactivity timeout, a single sign-on or identity mapping problem, or browser interference from extensions, cache or blocked pop-ups. Start with a fresh browser session with extensions turned off. If that fails, the help desk needs to check the account, access and SSO mapping."
faqs:
  - q: "What does 'Logon denied' mean in Banner 9?"
    a: "It usually means Banner rejected the account behind your login. At Miami University, for example, it appears in Employee Self-Service when the user's Oracle account password has expired or been locked. Your help desk can confirm the cause for your setup."
  - q: "What does 'Service Invocation Failed' mean in Banner?"
    a: "NC Central University's help desk explains it as an Admin Pages session that timed out through inactivity. Sign out, close the browser window and sign back in."
  - q: "Does an incognito window turn off browser extensions?"
    a: "Not necessarily. The University of Illinois notes that incognito mode does not turn off extensions, so disable them in browser settings and restart the browser."
  - q: "What does 'UDC Id not available' mean?"
    a: "It is a single sign-on error. The University of South Dakota classes it as a configuration issue for its Service Desk to resolve, so users should report it rather than retry repeatedly."
---

Login errors are the most common Banner ticket at many institutions. Most have simple causes, but the messages rarely say what the cause is.

This guide collects real error messages from university help desks, explains what they mean and gives steps for users and for support teams.

> **Note:** Banner 9 deployments vary. Treat the causes below as starting points, and follow your own institution's help desk guidance first.

## The errors and what they mean

| Error message | What it usually means | Source |
|---|---|---|
| "Logon denied. Please contact the system administrator." | The account behind the login is expired or locked; at Miami it is an Oracle account password in Employee Self-Service | [Miami University](https://miamioh.teamdynamix.com/TDClient/1813/Portal/KB/PrintArticle?ID=147662) |
| "Invalid username/password; Logon denied." | Account, session or browser problem in Self-Service | [University of Illinois](https://answers.uillinois.edu/136178) |
| "Invalid Username/Password" (Admin Pages) | An access problem with the account, or a possible outage | [NC Central](https://nccu.teamdynamix.com/TDClient/1852/Portal/KB/PrintArticle?ID=143848) |
| "Service Invocation Failed" | The Admin Pages session timed out through inactivity | [NC Central](https://nccu.teamdynamix.com/TDClient/1852/Portal/KB/PrintArticle?ID=143848) |
| "Your Session Has Expired" | The page timed out | [NC Central](https://nccu.teamdynamix.com/TDClient/1852/Portal/KB/PrintArticle?ID=143848) |
| "System is configured for external authentication and identity assertion is null" | Single sign-on configuration issue | [University of South Dakota](https://td.usd.edu/TDClient/33/Portal/KB/PrintArticle?ID=2659) |
| "UDC Id not available" | Single sign-on identity configuration issue | [University of South Dakota](https://td.usd.edu/TDClient/33/Portal/KB/PrintArticle?ID=2659) |
| Blank page after login, for many users | Possible outage | [Florida Atlantic University](https://wordpress.fau.edu/oit/2023/05/03) |

## Fixes users can try first

These steps come from published help desk guidance. Try them in order and stop when the problem clears:

1. **Reload the page.** NC Central suggests this for "Your Session Has Expired".
2. **Sign out, close the browser and sign back in.** This fixes most timeouts, including "Service Invocation Failed".
3. **Start a fresh session.** Use a private or incognito window to rule out stale cookies.
4. **Turn off browser extensions and restart.** Illinois notes that incognito mode does not turn off extensions, so disable them in settings.
5. **Clear your cache and cookies,** then try again.
6. **Allow pop-ups** for your Banner site, as NC Central advises.
7. **Try another browser,** such as the one your institution recommends.
8. **Contact your help desk** with the exact error text and a screenshot.

> **Tip:** If a Self-Service page loads but looks broken or is missing links, NC Central found the cause was most often the portal language setting. Its fix was to make sure it is set to English (United States), or to switch to another English option and back.

## What the help desk should check

If the steps above fail, the cause is usually on the server side.

**Account and password.** Check whether the account is expired or locked. Miami University's employee guidance shows this matters in Banner 9, where an expired Oracle account password produces "Logon denied".

**Access.** Confirm the user has been granted access at all. NC Central notes that Admin Pages access is not automatic and starts with a Banner access request. Then check [security classes and object roles](/blog/how-banner-security-classes-work).

**Single sign-on mapping.** Errors mentioning external authentication or a UDC ID point to how the identity provider's assertion maps to the Banner person. Check the SSO attribute release and the user's identity mapping. Our [Banner 9 single sign-on guide](/blog/how-single-sign-on-works-with-banner-9) covers the moving parts.

**Recent changes.** USD links one login failure to students who had recently started working at the university. A change in someone's roles is a common trigger, so check what changed for this user recently.

**Scope.** If several users report the same error, stop troubleshooting individuals and treat it as a possible outage.

## Cutting down login tickets

- **Publish a short self-help page** with the steps above and your recommended browser.
- **Add a status page** so users can see a known outage before calling.
- **Track error messages in your tickets.** If one error dominates, fix the cause instead of resetting accounts one by one.
- **Review SSO configuration** before certificates expire and after identity provider changes.

For other symptoms, see our guide to [common Ellucian Banner problems](/blog/common-ellucian-banner-problems-and-fixes). ITCadence supports Banner teams across the UAE and GCC. [Contact us](/#contact) if login problems keep coming back.

## Sources

- Miami University, [Banner 9 Self-Service errors](https://miamioh.teamdynamix.com/TDClient/1813/Portal/KB/PrintArticle?ID=147662), updated July 2026
- NC Central University, [Banner 9 Admin Pages common errors](https://nccu.teamdynamix.com/TDClient/1852/Portal/KB/PrintArticle?ID=143848), updated October 2026
- NC Central University, [Banner 9 Self-Service troubleshooting](https://nccu.teamdynamix.com/TDClient/1852/Portal/KB/PrintArticle?ID=166020), updated October 2026
- University of South Dakota, [Cannot log in to Self-Service registration](https://td.usd.edu/TDClient/33/Portal/KB/PrintArticle?ID=2659), updated October 2022
- University of Illinois, [Banner Self-Service logon denied](https://answers.uillinois.edu/136178), updated August 2026
- Florida Atlantic University, [Banner status notice](https://wordpress.fau.edu/oit/2023/05/03), May 2023
