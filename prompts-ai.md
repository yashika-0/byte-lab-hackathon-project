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

---

## 9. Landing Page UX Improvements

**Tool:** ChatGPT

### Prompt

> I'm enhancing the ABtalks landing page frontend based on the attached UX audit. Please implement the following and provide the corresponding code:
>
> * **Single CTA** — keep "Start your streak" as the only primary action; any future secondary link must be visually subordinate.
> * **Trust signal** — replace the bare stat with an avatar cluster ("+2,400 others") or a link to a public leaderboard.
> * **Proof-of-work example** — a mock GitHub commit + LinkedIn post shown side by side under the hero.
> * **Pricing clarity** — "Free to join" stated near the CTA.
> * **Commit Strip legend** — Completed / Upcoming / Missed, plus a reassurance line: "One missed day won't reset your streak."
> * **Testimonial** — a named student, school, and specific outcome, not a generic quote.
> * **Track badges** — Software Engineering · Data Science · AI, shown as pills under the subhead.
> * **Footer** — working links to About / Privacy / Terms / Contact.
> * **Mobile** — CTA must stay in-viewport at 390px width after new sections are added.
> * **Motion** — one restrained fade-up on hero load only, no additional animation.
>
> Suggested section order: Hero → Proof Example → Commit Strip → How It Works → Testimonial → Footer.

### Result

ChatGPT provided frontend code and recommendations implementing the UX audit requirements, including a single primary CTA, trust signals, proof-of-work examples, pricing clarity, commit-status indicators, testimonial content, track badges, footer navigation, responsive mobile behavior, and restrained hero animation.

### Human Changes

The team integrated the suggested UX improvements into the landing page, adapted the generated content and styling to match the project's existing design, and verified the layout and CTA visibility at mobile width.
## 10. Challenge Platform — JavaScript Functionality

**Tool:** [Tool]

### Prompt

> Create the complete `script.js` for the ABTALKS 60-day challenge using vanilla JavaScript.
>
> Implement localStorage-based challenge progress, current-day calculation, streaks, 60-day challenge data, dashboard/challenge rendering, GitHub and LinkedIn proof validation, completed-day tracking, track selection, profile data, reset functionality, notifications, modals, navigation, and 60-day completion.
>
> Keep the code modular and compatible with the existing HTML pages.

### Result

Generated the main JavaScript functionality for challenge progression, localStorage persistence, streaks, proof submission, dynamic rendering, profile handling, and UI interactions.

### Human Changes

Connected the JavaScript to the team's actual HTML structure, IDs, routes, and data. Fixed and adjusted functionality where required.
## 11. Global UI — CSS Styling

**Tool:** [Tool]

### Prompt

> Create the complete `styles.css` for the ABTALKS website using pure CSS.
>
> Reproduce the premium editorial style with a dark charcoal background, cream sections, orange accents, serif headings, sans-serif body text, thin borders, large whitespace, minimal rounded corners, subtle animations, and responsive layouts.
>
> Style the navbar, hero, dashboard, challenge cards, progress bars, timelines, forms, track cards, buttons, footer, notifications, and mobile layouts.
>
> Do not use Bootstrap, Tailwind, React, or other CSS frameworks.

### Result

Generated the complete responsive visual system for the ABTALKS website, including typography, colors, layouts, cards, forms, buttons, animations, and mobile styling.

### Human Changes

Adjusted colors, spacing, sizing, responsiveness, and component styling to match the actual ABTALKS design and HTML structure.
## 12. Home Page — `index.html`

**Tool:** [Tool]

### Prompt

> Create the complete `index.html` home page for ABTALKS.
>
> Include the shared navbar, editorial hero, challenge introduction, dynamic workshop/progress section, "How It Works" Build-Show-Stack section, final CTA, and footer.
>
> Use semantic HTML, responsive design, external `style.css` and `script.js`, and links to the dashboard, challenge, about, and profile pages.
>
> Use the ABTALKS dark/cream/orange visual style and vanilla HTML/CSS/JavaScript only.

### Result

Generated the complete ABTALKS home page with navigation, hero, challenge introduction, progress section, daily loop, CTA, footer, and responsive structure.

### Human Changes

Connected the page to the team's actual routes, JavaScript, CSS, section IDs, and project structure.
## 13. About / How the Challenge Works — `about.html`

**Tool:** [Tool]

### Prompt

> Create the complete `about.html` page explaining what ABTALKS is, how the 60-day challenge works, and why public proof matters.
>
> Include an editorial hero, ABTALKS overview, Build-Show-Stack daily loop, 60-day timeline, explanation of GitHub/LinkedIn proof, the three challenge tracks, challenge rules, final CTA, shared navbar, and footer.
>
> Use the existing ABTALKS visual style, responsive design, external `style.css` and `script.js`, and links to the other pages.

### Result

Generated the About page explaining ABTALKS, the daily challenge loop, 60-day progression, proof system, tracks, rules, and CTA.

### Human Changes

Connected the page to the existing navigation, routes, CSS, and JavaScript and refined the content and layout for consistency with the rest of the website.
## 14. User Dashboard — `dashboard.html`

**Tool:** [Tool]

### Prompt

> Create the complete `dashboard.html` for the ABTALKS 60-day challenge.
>
> Build the user's main dashboard showing current day, today's challenge, streak, best streak, progress, ranking, selected track, completed days, profile preview, and reset option.
>
> Load user data from localStorage and dynamically generate the progress/completed-day sections.
>
> Include navigation to the challenge and profile pages and make the layout responsive.
>
> Use the existing ABTALKS visual style with external `style.css` and `script.js`.

### Result

Generated the main user dashboard with dynamic challenge information, streaks, progress, ranking, track, completed days, reset functionality, and profile preview.

### Human Changes

Connected the dashboard to the actual localStorage structure, JavaScript functions, routes, and shared styling. Adjusted displayed data and layout as needed.
## 15. Daily Challenge Workspace — `challenge.html`

**Tool:** [Tool]

### Prompt

> Create the complete `challenge.html` daily challenge workspace for ABTALKS.
>
> Dynamically display the current challenge from localStorage, including its title, description, time, track, task, definition of done, suggested approach, and bonus task.
>
> Add an interactive checklist and GitHub/LinkedIn proof form with URL validation.
>
> On successful submission, save the proof, mark the day complete, update the streak/progress, prevent duplicate submissions, and show the next challenge.
>
> Include dashboard navigation and responsive design using the existing `style.css` and `script.js`.

### Result

Generated the daily challenge workspace with dynamic challenge rendering, task details, checklist, proof submission, validation, completion handling, and next-challenge functionality.

### Human Changes

Connected the workspace to the actual challenge data and JavaScript logic and adjusted form handling, completion behavior, navigation, and styling.
## 16. User Profile — `profile.html`

**Tool:** [Tool]

### Prompt

> Create the complete `profile.html` page for ABTALKS.
>
> Include the user's avatar/initials, name, bio, selected track, current streak, best streak, completed days, and overall progress.
>
> Add editable name, bio, and profile image fields using localStorage, dynamically generated achievements, selected-track information, and challenge history.
>
> Allow track changes only before Day 7.
>
> Include navigation back to the dashboard and maintain the existing responsive ABTALKS design.

### Result

Generated the complete user profile page with editable profile information, statistics, achievements, track information, challenge history, and dashboard navigation.

### Human Changes

Connected the profile to the shared localStorage and JavaScript functionality and adjusted profile handling, navigation, and styling to match the project.
## 17. Admin Dashboard — `admin.html`

**Tool:** ChatGPT  

### Prompt

> Create the complete `admin.html` page for an ABTALKS 60-day coding challenge admin dashboard.
>
> Create a separate admin interface using the existing ABTALKS dark/cream/orange editorial design.
>
> Include:
> - Admin navbar with Dashboard, Challenges, Participants, Submissions, Analytics, and Back to Website
> - Admin workspace header
> - Statistics cards for builders, active users, completions, and streaks
> - Searchable and filterable participant table
> - Challenge management with Add, Edit, View, and Disable actions
> - Add Challenge modal with challenge details
> - Recent proof/submissions table with View, Approve, and Reject actions
> - Basic analytics using CSS/HTML visualizations without external chart libraries
> - Responsive layout
>
> Use sample/demo data only. Do not implement authentication or a real database.
>
> Use external `style.css` and `script.js`, with vanilla HTML, CSS, and JavaScript only.

### Result

Generated a responsive admin dashboard with demo statistics, participant management, challenge management, submission tracking, analytics sections, search/filter functionality, and an add-challenge modal.

### Human Changes

Connected the admin page to the existing ABTALKS styling and JavaScript structure and adjusted demo data, navigation, layout, and interactions to match the project.