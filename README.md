# By Skill

A public marketplace site for renting humanoid robots **by skill**. This is v1 only: browse filters and a waitlist. No listings, accounts, bookings, or payments.

Grid owns the visual system. Cast owns photography. Lot owns real prices. This repo does not invent those.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43180](http://127.0.0.1:43180).

Production-style local run:

```bash
npm run build
npm start
```

## Preview URL

The working HTTPS preview for this cloud session is the Cursor preview of the local Next.js server on port `43180`. Open the Preview card from the agent session.

A custom domain or Vercel production deploy is not wired here. Origin is the source of truth. If Vercel cannot see this Origin repo yet, do **not** mirror the project to GitHub just to make Vercel work. Next step: create the Origin repository (Create repo), then connect that Origin remote to your host, or attach a custom domain once the host accepts Origin.

## What v1 includes

- Landing hero with an empty reserved image slot (no robot photos)
- Skill pills (Cleaning, Cooking, Childcare, Elder care, Yard work, Packing) that filter the browse area
- Empty coming-soon cards only — no names, photos, or prices
- Waitlist buttons: **I want to rent** and **I have a robot**
- Email (required) and city (optional), saved on the server

## Waitlist storage

Submissions are written by `POST /api/waitlist` only. Nothing in the client stores secrets or writes the file.

v1 store: a JSON file on the server at `data/waitlist.json` (created on first submit, gitignored).

To use a different file path:

```bash
WAITLIST_PATH=/var/data/waitlist.json npm start
```

To swap to a real database later, replace `src/lib/waitlist-store.ts` and keep the same `appendWaitlistEntry` shape. File storage is local-process durable enough for this slice; it is not shared across serverless instances.

## Out of scope

- Robot models, hosts, reviews, availability
- Prices, rates, or any dollar amounts
- Payments, booking, or accounts
- Generated or stock robot images
