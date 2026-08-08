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
 - Set Up in VS Code is completed , ready for working.

---

## 4. Backend Architecture & API Planning

**Tool:** ChatGPT

### Prompt

> I am building the backend for Problem Statement 1 of the ABTalks hackathon.
>
> ABTalks is a 60-day coding challenge for Indian college students where students build something every day and maintain a public learning streak by submitting a GitHub commit and a LinkedIn post.
>
> The required frontend routes are `/`, `/dashboard`, and `/day/12`.
>
> I am responsible only for the backend, while the frontend team will use HTML, CSS and JavaScript.
>
> Backend constraints:
>
> * Node.js + Express.js
> * Mock/static data is acceptable
>
> Help me identify the backend responsibilities, required API endpoints, data structures, and implementation order.

### Result

ChatGPT identified the backend responsibilities, suggested the required API endpoints and data structures, and provided an implementation order for building the backend.

### Human Changes

The team reviewed the suggested architecture and selected the backend responsibilities and API structure that were relevant to the hackathon requirements.

---

## 5. Backend Project Setup

**Tool:** ChatGPT

### Prompt

> Guide me step-by-step to set up the Node.js + Express.js backend for the ABTalks redesign. I am working in an existing GitHub repository and want to keep the backend organized separately from the frontend. Explain the required files, folders, dependencies, and how to run and test the Express server locally.

### Result

ChatGPT provided a step-by-step Express.js setup, including the recommended backend folder structure, required dependencies, server files, and commands for running and testing the server locally.

### Human Changes

The backend was organized separately from the frontend within the existing repository, and the suggested setup was adapted to the team's project structure.

---

## 6. Landing Page API

**Tool:** ChatGPT

### Prompt

> Help me implement the first backend API for the ABTalks redesign. The frontend needs data for the landing page. I want to keep the data in a JSON file rather than hardcoding it inside the Express route. Create an Express endpoint that reads the landing-page data from `data/landing.json` and returns it as JSON.

### Result

ChatGPT provided an Express API endpoint that reads the landing-page information from `data/landing.json` and returns the data as a JSON response for the frontend.

### Human Changes

The team integrated the endpoint into the backend and used a separate JSON data file to keep the landing-page content independent from the route logic.

---

## 7. Backend Health Check

**Tool:** ChatGPT

### Prompt

> I have an Express backend for the ABTalks project. Add a simple `/api/health` endpoint that can be used to verify that the backend server is running correctly. Also explain how I can test the endpoint locally.

### Result

ChatGPT provided a simple `/api/health` endpoint and explained how to run the server and test the endpoint locally to confirm that the backend was functioning correctly.

### Human Changes

The health-check endpoint was added to the backend and tested locally to verify that the Express server was running correctly.

---

## 8. Git & Backend Version Control

**Tool:** ChatGPT

### Prompt

> I have completed the initial backend setup and health-check endpoint. Help me verify my Git changes, remove any accidental files, commit the changes with an appropriate message, and push the backend branch to GitHub without affecting the main branch.

### Result

ChatGPT provided a Git workflow for reviewing changed files, removing accidental files, committing the backend changes, and safely pushing the work to the backend branch without modifying the main branch.

### Human Changes

The team reviewed the Git changes, removed unnecessary files, committed the backend work, and pushed it to the appropriate branch while keeping the main branch unchanged.
