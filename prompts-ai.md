# AI Usage Log

This document records how AI tools were used during the development of this project.

AI was used as a development assistant for brainstorming, UX exploration,
implementation, debugging, refinement, and documentation. Final decisions,
integration, testing, and validation were performed by the team.

---

## 1. Audit of Current Website

**Tool:** Claude 
**Date:** 2026-08-08  
**Purpose:** To find out the strengths/weaknesses of the current website so as to get a clear idea on the improvements.

### Prompt
> Review the website at https://www.abtalks.in/ as a team of experienced Product Designers, UI/UX Designers, UX Researchers, and Content Strategists.

Evaluate the website on:

Trust: company information, policies, security, social proof, pricing transparency, and overall credibility.
Functionality: navigation, usability, performance, responsiveness, forms, CTAs, and broken links.
User Experience: user journey, content clarity, accessibility, visual consistency, and value proposition.

Each role should review the website independently, identify pain points, suggest practical improvements, and assign scores out of 100 for Trust, Functionality, and UX.

Finally, combine all reviews into a single report containing:

Executive summary
Individual role assessments with scores and recommendations
Consolidated findings
Overall Trust, Functionality, UX, and Final Score (/100)

Support every observation with specific examples from the website and prioritize recommendations by impact.

### AI Output / Direction
Audit Summary :

1. **Trust is the biggest weakness:** ABTalks lacks visible Privacy Policy, Terms, About/Team information, pricing clarity, and verifiable social proof. Trust score: **34/100**. 

2. **Functionality is solid but has friction:** The core challenge flow works, but login-gated content, unclear CTAs, and limited contact/support options create unnecessary barriers. Functionality score: **68/100**. 

3. **UX has a strong foundation but needs focus:** The visual design and daily challenge flow are good, but multiple competing programs dilute the main message. UX score: **62/100**. 

**Overall score: 52/100.** 

---

## 2. Product Design and Problem Definition

**Tool:** ChatGPT  
**Purpose:** To define the direction of our website by identifying the key problems and user needs our redesign should address while remaining aligned with the ABTalks challenge requirements. 

### Prompt
Prompt : With the given ABTalks redesign problem statement and its constraints, identify the key improvements that could be made through a new website. Focus on addressing the students' actual needs, improving usability and engagement, and introducing thoughtful product/UX improvements while staying within the required three-screen scope and mobile-first focus.

### Result
AI suggested these Key Improvements :

1. **Build trust:** Add Privacy Policy, Terms, About/Team information, transparent pricing, verified testimonials, and clearer support/contact details.

2. **Improve the challenge experience:** Make challenge information accessible before login, simplify the homepage around the 60-Day Challenge, clarify CTAs, and improve the daily task and submission flow.

3. **Increase motivation:** Strengthen progress and streak tracking, showcase student achievements and projects, make community guidelines more balanced, and introduce a meaningful feature that encourages students to stay consistent. 

---


## 3. Tech Stack & Project Setup

**Tool:** ChatGPT

### Prompt
> Help us identify and finalize the most suitable tech stack for building the ABTalks redesign, considering our mobile-first requirements, three-person team, 45-hour development window, mocked-data approach, and free deployment requirement.

Then provide a complete, step-by-step project setup guide covering the chosen framework, dependencies, Tailwind CSS, shadcn/ui configuration, routing, project structure, mock data modeling, and development setup. Explain the purpose of each technology and setup step, and recommend an organization that allows three team members to work efficiently in parallel.

### Result
 => Set Up in VS Code is completed , ready for working.

---
