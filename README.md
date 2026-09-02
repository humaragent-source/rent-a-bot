# Rent a Bot

Airbnb-light marketplace for renting humanoid robots by skill. Average Joes. Skills, not specs.

This repo is the 390px phone UI. Grid owns the visual system. Cast owns portraits. Lot owns prices. It does not redesign those.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43180](http://127.0.0.1:43180).

```bash
npm run build
npm start
```

## Preview

Use the Cursor preview of the local Next.js server on port `43180`. Do not deploy to Vercel from this session. Do not expose an unauthenticated public tunnel.

## What’s on the phone

- Brand **Rent a Bot** in black, max-width 390px. Coral stays on search and the tab bar
- Lockup: static “Rent a” + a circular last-word slot (Bot → Nurse → Helper → Walker → Cleaner → Gardener → Trainer → Cook → Bot) in muted colors. Reduced motion freezes on Bot
- Sticky topbar, fixed tabbar, Hale listing Book bar
- Hero row with Cast portraits
- Headline: A robot for the afternoon.
- Search fields as specified (Mission / Sat · this afternoon / Gym, kids, errands)
- Skill pills: Nurse, Kids, Dog, Clean, Garden, Gym, Errands, Grill
- Five cards at **$18/hr** only. No ratings or review counts. No retail on cards
  - Hale (H2) Gym / Errands
  - Wren (NEO) Clean / Kids / Errands
  - Gigi (G1) Kids / Gym
  - Fox (X2) Grill / Kids — kids photo for now
  - Bo (T1) Garden / Gym
- Hale listing copy from Lot, including the $29,900 buy-line on the listing only
- Profile tab waitlist: **I want to rent** / **I have a robot**

## Cast images

Saved under `public/img/` as the supplied filenames. Do not redraw or substitute robot bodies.

- `hale-gym.png` — Hale / Gym
- `wren-clean.png` — Wren / Clean
- `gigi-kids.png` — Gigi / Kids
- `fox-kids.png` — Fox / Kids stand-in
- `bo-garden.png` — Bo / Garden
- `carousel-nurse.png` — Nurse
- `carousel-dog.png` — Dog
- `avatar-you.svg` / `sam.svg` — placeholders

## Waitlist storage

`POST /api/waitlist` writes `data/waitlist.json` on the server (gitignored). Nothing in the client stores secrets.

```bash
WAITLIST_PATH=/var/data/waitlist.json npm start
```

Replace `src/lib/waitlist-store.ts` to swap in a real database.

## Out of scope

- Checkout or payments (Book does not start checkout)
- Star ratings or review counts
- Figure or Optimus
- Owner-side take
- Generated robot photos
- Coastal Grade, Andres Log, and Ascendr (other products)
