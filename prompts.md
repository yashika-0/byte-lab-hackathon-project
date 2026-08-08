# AI Usage Log

This file documents the AI-assisted development process used during the hackathon.

## 1. Backend Architecture

### Prompt
The backend is responsible for Problem Statement 1 of the ABTalks hackathon. The required frontend routes are `/`, `/dashboard`, and `/day/12`. The frontend will primarily use HTML, CSS and JavaScript. The backend should use Node.js and Express.js. The problem statement allows mocked data using JSON and does not require authentication, real users, or a production database. Help plan a simple backend architecture appropriate for this scope.

### Result
The backend was planned as a lightweight Express API using mocked JSON data instead of a database.

---

## 2. Landing Page Data Design

### Prompt
Design the mock JSON structure for the ABTalks landing page. The landing page should explain the 60-day coding challenge to a first-time visitor and provide information such as the challenge identity, introduction, how it works, benefits, and a call to action. Keep dashboard-specific and user-specific data out of the landing-page response.

### Result
A `data/landing.json` file was created containing:
- Challenge information
- Introduction
- How the challenge works
- Benefits
- Call-to-action information

---

## 3. Landing Page API

### Prompt
Create a simple Express GET endpoint that reads the landing-page mock JSON file and returns it as a JSON response so that the frontend can request the landing-page content from the backend.

### Result
Implemented:

`GET /api/landing`

The endpoint reads `data/landing.json` and returns the parsed JSON to the frontend.

---

## 4. Backend Project Setup

### Prompt
Set up the Node.js/Express backend project with the required dependencies and basic project configuration. Include appropriate Git ignore rules so generated dependencies and environment secrets are not committed.

### Result
Created:
- `package.json`
- `package-lock.json`
- `.gitignore`

Installed Express and configured Git to ignore `node_modules/` and `.env`.

---

## Development Notes

The backend was developed incrementally and tested locally after implementation. Git commits were made in separate logical stages to keep the development history traceable.
## 5. Backend Review & Improvements

**Tool:** ChatGPT  
**Date:** 2026-08-08  
**Purpose:** To review the initial backend implementation and apply targeted improvements suggested during team review.

### Prompt

> Review my current Node.js + Express backend for the ABTalks hackathon.
>
> The backend currently contains a health-check endpoint and a landing-page API using mock JSON data.
>
> Suggest only the necessary improvements for the current hackathon stage, focusing on reliability, convenience for the team, and deployment readiness. Do not over-engineer the backend before frontend integration.
>
> In particular, review the package scripts, port configuration, file-path handling, and error handling for the landing-page API.

### Result

The review identified the following improvements:

1. Added an `npm start` script using `node server.js`.
2. Changed the hard-coded port to `process.env.PORT || 3000`.
3. Used `path.join(__dirname, "data", "landing.json")` for a more reliable file path.
4. Added `try/catch` error handling to `GET /api/landing`.
5. Kept the backend lightweight and avoided unnecessary authentication, database, or other features before frontend integration.

### Validation

- Tested `GET /api/health`.
- Tested `GET /api/landing`.
- Confirmed the backend starts using `npm start`.
- Confirmed the working tree after the changes was clean after committing.

### Git

**Commit:** `Improve backend configuration and error handling`

**Branch:** `backend`