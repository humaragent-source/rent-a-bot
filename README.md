# Borrow

Phone UI for a public marketplace that rents humanoid robots by skill. Grid owns the visual system. Cast owns portraits. Lot owns prices.

This repo implements Grid’s 390px Borrow shell. It does not redesign it.

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

## Preview URL

Use the Cursor preview of the local Next.js server on port `43180`. That is the HTTPS preview for this session. Do not expose an unauthenticated public tunnel.

Origin is the source of truth. If a host cannot see Origin yet, do not mirror to GitHub just to attach Vercel. Create the Origin repository, then connect that remote to the host.

## What’s on the phone

- Brand **Borrow**, coral `#ff385c`, max-width 390px
- Sticky topbar, fixed tabbar, Hale listing Book bar
- Hero row with Cast portraits
- Headline: A robot for the afternoon.
- Search fields as specified (Mission / Sat · this afternoon / Gym, kids, errands)
- Skill pills: Nurse, Kids, Dog, Clean, Garden, Gym, Errands, Grill
- Five cards at **$18/hr** only. No ratings or review counts. No retail on cards.
- Hale listing copy from Lot, including the $29,900 buy-line on the listing only
- Profile tab waitlist: **I want to rent** / **I have a robot**

## Cast images

Saved under `public/img/` as the supplied filenames. Do not redraw or substitute robot bodies.

- `nico-gym.png` — Hale / Gym
- `tess-clean.png` — Wren / Clean
- `jun-kids.png` — Gigi / Kids
- `fox-grill.png` — Fox / Grill
- `rio-garden.png` — Bo / Garden
- `mara-nurse.png` — Nurse
- `pip-dog.png` — Dog
- `errands.png` — Errands
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
