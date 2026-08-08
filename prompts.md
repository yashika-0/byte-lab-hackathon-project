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