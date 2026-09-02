"use client";

/* Grid spec uses plain <img> for Cast portraits. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState, type FormEvent } from "react";

import { BrandLockup } from "@/components/brand-lockup";
import { asset } from "@/lib/asset";
import {
  HALE,
  HERO,
  SKILLS,
  cardsForSkill,
  type Skill,
} from "@/lib/borrow-data";
import type { WaitlistIntent } from "@/lib/waitlist";
import { saveWaitlistLocally } from "@/lib/waitlist-local";

type Tab = "explore" | "wishlists" | "trips" | "inbox" | "profile";

const WAITLIST_COPY: Record<
  WaitlistIntent,
  { title: string; note: string }
> = {
  rent: {
    title: "I want to rent",
    note: "Email is required. City is optional.",
  },
  list: {
    title: "I have a robot",
    note: "Email is required. City is optional.",
  },
};

export function RentABotApp() {
  const [tab, setTab] = useState<Tab>("explore");
  const [skill, setSkill] = useState<Skill>("Gym");
  const [listing, setListing] = useState(false);
  const [bookNote, setBookNote] = useState(false);
  const [intent, setIntent] = useState<WaitlistIntent | null>(null);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [waitStatus, setWaitStatus] = useState<
    "idle" | "saving" | "success" | "error"
  >("idle");
  const [waitMessage, setWaitMessage] = useState<string | null>(null);

  const cards = useMemo(() => cardsForSkill(skill), [skill]);

  function goExplore() {
    setTab("explore");
    setListing(false);
    setBookNote(false);
  }

  function openHale() {
    setTab("explore");
    setListing(true);
    setBookNote(false);
  }

  function openProfile() {
    setTab("profile");
    setListing(false);
    setBookNote(false);
  }

  function resetWaitlist() {
    setIntent(null);
    setEmail("");
    setCity("");
    setWaitStatus("idle");
    setWaitMessage(null);
  }

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!intent || waitStatus === "saving") {
      return;
    }

    setWaitStatus("saving");
    setWaitMessage(null);

    const saved = saveWaitlistLocally({ email, city, intent });
    if (!saved.ok) {
      setWaitStatus("error");
      setWaitMessage(saved.error);
      return;
    }

    setWaitStatus("success");
    setWaitMessage(
      "You’re on the waitlist. We’ll email you when this part of the marketplace opens."
    );
  }

  const showTabbar = !listing;
  const showBookbar = listing;

  useEffect(() => {
    document.title = listing ? "Hale · Rent a Bot" : "Rent a Bot";
  }, [listing]);

  return (
    <div className="phone">
      <header className="topbar">
        <BrandLockup onClick={goExplore} />
        <button type="button" className="you" onClick={openProfile} aria-label="Profile">
          <img src={asset("/img/avatar-you.svg")} alt="" />
        </button>
      </header>

      {listing ? (
        <div className="scroll is-listing">
          <div className="hero-photo">
            <img src={asset(HALE.src)} alt="" />
            <button
              type="button"
              className="back"
              onClick={() => {
                setListing(false);
                setBookNote(false);
              }}
              aria-label="Back"
            >
              <BackIcon />
            </button>
          </div>
          <article className="listing">
            <h1>{HALE.name}</h1>
            <p className="listing-meta">{HALE.meta}</p>
            <p className="listing-rate">{HALE.rate}</p>
            <p className="buy-line">{HALE.buyLine}</p>
            <div className="rule" />
            <h2>About Hale</h2>
            {HALE.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="rule" />
            <h2>Skills</h2>
            <div className="card-skills">
              {HALE.skills.map((item) => (
                <span key={item} className="chip">
                  {item}
                </span>
              ))}
            </div>
            <div className="rule" />
            <h2>Sample jobs</h2>
            <ul>
              {HALE.sampleJobs.map((job) => (
                <li key={job}>{job}</li>
              ))}
            </ul>
            <div className="rule" />
            <h2>House rules</h2>
            <ul>
              {HALE.houseRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <div className="rule" />
            <h2>Hosted by Sam</h2>
            <div className="host">
              <img src={asset("/img/sam.svg")} alt="" />
              <p>Sam</p>
            </div>
          </article>
          {bookNote ? (
            <p className="book-note">Booking isn’t open on this preview.</p>
          ) : null}
        </div>
      ) : tab === "explore" ? (
        <div className="scroll">
          <div className="hero-row">
            {HERO.map((item) =>
              item.opensHale ? (
                <button
                  key={item.id}
                  type="button"
                  className="hero-item"
                  onClick={openHale}
                >
                  <img src={asset(item.src)} alt="" />
                  <span>{item.label}</span>
                </button>
              ) : (
                <div key={item.id} className="hero-item">
                  <img src={asset(item.src)} alt="" />
                  <span>{item.label}</span>
                </div>
              )
            )}
          </div>

          <h1 className="headline">A robot for the afternoon.</h1>

          <div className="search">
            <div className="search-row">
              <label>Where</label>
              <p>Mission</p>
            </div>
            <div className="search-row">
              <label>When</label>
              <p>Sat · this afternoon</p>
            </div>
            <div className="search-row">
              <label>What they’re good at</label>
              <p>Gym, kids, errands</p>
            </div>
            <button type="button" className="search-go" aria-label="Search">
              <SearchIcon />
            </button>
          </div>

          <div className="pills" role="group" aria-label="Skill filters">
            {SKILLS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === skill ? "pill is-on" : "pill"}
                aria-pressed={item === skill}
                onClick={() => setSkill(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <h2 className="section-title">Near you</h2>
          <div className="cards">
            {cards.map((card) => {
              const inner = (
                <>
                  <img src={asset(card.src)} alt="" />
                  <div className="card-body">
                    <p className="card-name">{card.name}</p>
                    <div className="card-skills">
                      {card.skills.map((item) => (
                        <span key={item} className="chip">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="card-meta">
                      <p className="rate">
                        $18 <span>/ hr</span>
                      </p>
                      <p className="miles">{card.distance}</p>
                    </div>
                  </div>
                </>
              );

              return card.opensHale ? (
                <button
                  key={card.id}
                  type="button"
                  className="card"
                  onClick={openHale}
                >
                  {inner}
                </button>
              ) : (
                <article key={card.id} className="card">
                  {inner}
                </article>
              );
            })}
          </div>
        </div>
      ) : tab === "profile" ? (
        <div className="scroll">
          <section className="profile">
            <h1>Profile</h1>
            <p className="note">
              Join the waitlist. No accounts on this preview.
            </p>
            <div className="intent">
              <button
                type="button"
                className="primary"
                onClick={() => {
                  setIntent("rent");
                  setWaitStatus("idle");
                  setWaitMessage(null);
                }}
              >
                I want to rent
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  setIntent("list");
                  setWaitStatus("idle");
                  setWaitMessage(null);
                }}
              >
                I have a robot
              </button>
            </div>

            {intent && waitStatus !== "success" ? (
              <form onSubmit={submitWaitlist}>
                <p className="note">{WAITLIST_COPY[intent].note}</p>
                <div className="field">
                  <label htmlFor="waitlist-email">Email</label>
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="waitlist-city">City (optional)</label>
                  <input
                    id="waitlist-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
                {waitMessage && waitStatus === "error" ? (
                  <p className="err" role="alert">
                    {waitMessage}
                  </p>
                ) : null}
                <button type="submit" disabled={waitStatus === "saving"}>
                  {waitStatus === "saving" ? "Saving…" : "Join the waitlist"}
                </button>
              </form>
            ) : null}

            {waitStatus === "success" ? (
              <div>
                <p className="ok">{waitMessage}</p>
                <div className="intent" style={{ marginTop: 16 }}>
                  <button type="button" className="ghost" onClick={resetWaitlist}>
                    Close
                  </button>
                </div>
              </div>
            ) : null}
          </section>
        </div>
      ) : (
        <div className="scroll">
          <section className="blank">
            <h1>
              {tab === "wishlists"
                ? "Wishlists"
                : tab === "trips"
                  ? "Trips"
                  : "Inbox"}
            </h1>
          </section>
        </div>
      )}

      {showTabbar ? (
        <nav className="tabbar" aria-label="Rent a Bot">
          <button
            type="button"
            className={tab === "explore" ? "tab is-on" : "tab"}
            onClick={goExplore}
          >
            <SearchIcon />
            Explore
          </button>
          <button
            type="button"
            className={tab === "wishlists" ? "tab is-on" : "tab"}
            onClick={() => setTab("wishlists")}
          >
            <HeartIcon />
            Wishlists
          </button>
          <button
            type="button"
            className={tab === "trips" ? "tab is-on" : "tab"}
            onClick={() => setTab("trips")}
          >
            <BagIcon />
            Trips
          </button>
          <button
            type="button"
            className={tab === "inbox" ? "tab is-on" : "tab"}
            onClick={() => setTab("inbox")}
          >
            <ChatIcon />
            Inbox
          </button>
          <button
            type="button"
            className={tab === "profile" ? "tab is-on" : "tab"}
            onClick={openProfile}
          >
            <PersonIcon />
            Profile
          </button>
        </nav>
      ) : null}

      {showBookbar ? (
        <div className="bookbar">
          <div>
            <p className="book-window">{HALE.window}</p>
            <p className="book-rate">{HALE.rate}</p>
          </div>
          <button type="button" className="book" onClick={() => setBookNote(true)}>
            Book
          </button>
        </div>
      ) : null}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16.2 16.2 21 21" strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20s-7-4.4-9.2-8.2C1.2 9.4 2.4 6 5.8 6c1.9 0 3.1 1.1 3.8 2.2C10.3 7.1 11.5 6 13.4 6c3.4 0 4.6 3.4 3 5.8C19 15.6 12 20 12 20Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 8h12l.8 12H5.2L6 8Z" />
      <path d="M9 8V6.5A3 3 0 0 1 15 6.5V8" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 16.5 3.8 20 8 18.2A8.5 8.5 0 1 0 5 16.5Z" />
    </svg>
  );
}

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3.4 4-5 7-5s5.6 1.6 7 5" />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M10 3.5 5.5 8 10 12.5"
        stroke="#222"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
