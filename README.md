# ABTalks — 60 Day Challenge (Redesign)

**Problem Statement 1: Redesign ABTalks**

A redesigned, mobile-first version of the ABTalks 60-day coding challenge platform for Indian college students — built to fix the trust, functionality, and UX gaps identified in our audit of the original site.

- **Live site:** https://byte-lab-hackathon-project.vercel.app
- **AI usage log:** [prompts-ai.md](./prompts-ai.md)

## What is ABTalks?

ABTalks is a 60-day coding challenge where students build something every day and maintain a public learning streak by submitting a GitHub commit and a LinkedIn post. This redesign focuses on:

- **Building trust** — clearer policies, transparent pricing, real testimonials, working footer links
- **Improving the challenge experience** — challenge info visible before login, simplified homepage, clearer CTAs, smoother daily task flow
- **Increasing motivation** — stronger progress/streak tracking, a proof-of-work example, and consistency-focused features

## Tech Stack

**Frontend**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4

**Backend**
- Node.js + Express
- Deployed on Render

**Deployment**
- Frontend: Vercel
- Backend: Render

## Pages / Routes

| Route | Description |
|---|---|
| `/` | Home — hero, proof-of-work example, commit strip, how it works |
| `/about` | About — how the challenge system works |
| `/challenge` | Full 60-day challenge list, day-by-day |
| `/day/[n]` | Individual day task page (1–60) |
| `/dashboard` | Student progress dashboard |
| `/profile` | Student profile |
| `/admin` | Admin view |

## Backend API

| Endpoint | Description |
|---|---|
| `GET /api/health` | Health check — confirms the server is running |
| `GET /api/landing` | Landing page content, served from `data/landing.json` |

## Getting Started

```bash
# clone the repo
git clone https://github.com/yashika-0/byte-lab-hackathon-project.git
cd byte-lab-hackathon-project

# install dependencies
npm install

# run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result. The app auto-updates as you edit files in `app/page.tsx` and other route files.

The backend runs separately — see the `/backend` directory for setup and local run instructions.

## Development Notes

- This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically load [Geist](https://vercel.com/font).
- To learn more about Next.js, see the [Next.js Documentation](https://nextjs.org/docs), the [Learn Next.js](https://nextjs.org/learn) tutorial, or the [Next.js GitHub repository](https://github.com/vercel/next.js).
- Deployment is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) (frontend) — see the [deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## Team

Built by team **Byte Lab** in 45 hours for the ABTalks hackathon.

- **Yashika Singh** — Team Lead, Deployment
- **Varnita Shrivastava** — Frontend Developer
- **Tamanna Thakur** — Backend Developer

AI tools (Claude, ChatGPT) were used as development assistants for research, planning, and implementation support — full log in [prompts-ai.md](./prompts-ai.md). Final decisions, integration, testing, and validation were done by the team.
