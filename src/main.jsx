import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// Illustrative locations and crowd levels; no live reports or API requests.
const facilities = [
  {
    name: "Van Houten Library",
    type: "Library",
    place: "Central campus",
    level: "Moderate",
    score: 2,
    icon: "▤",
    time: "4 min ago",
  },
  {
    name: "Central King Building",
    type: "Study space",
    place: "Academic area",
    level: "Busy",
    score: 3,
    icon: "▦",
    time: "2 min ago",
  },
  {
    name: "Campus Center Dining",
    type: "Dining",
    place: "Campus Center",
    level: "Packed",
    score: 4,
    icon: "◒",
    time: "1 min ago",
  },
  {
    name: "Wellness and Events Center",
    type: "Gym",
    place: "Athletics and recreation",
    level: "Moderate",
    score: 2,
    icon: "↗",
    time: "6 min ago",
  },
  {
    name: "Computer Lab",
    type: "Computer lab",
    place: "Sample campus location",
    level: "Empty",
    score: 1,
    icon: "⌘",
    time: "8 min ago",
  },
  {
    name: "Quiet Study Area",
    type: "Study space",
    place: "Sample campus location",
    level: "No recent reports",
    score: 0,
    icon: "▧",
    time: null,
  },
];
function App() {
  useEffect(() => {
    // React mounts after the browser initially processes the URL fragment.
    const scrollToSection = () => {
      const id = window.location.hash.slice(1);
      if (id === "parking" || id === "directory")
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
    };
    scrollToSection();
    window.addEventListener("hashchange", scrollToSection);
    return () => window.removeEventListener("hashchange", scrollToSection);
  }, []);
  const path = window.location.pathname.replace(/\/$/, "");
  const page =
    path === "/login" ? "login" : path === "/register" ? "register" : "home";
  return (
    <>
      <header className="header">
        <a className="brand" href="/" aria-label="CrowdMeter NJIT home">
          <span className="brand-icon">▥</span>
          <span>
            CrowdMeter <b>NJIT</b>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a className={page === "home" ? "active" : ""} href="/">
            Campus overview
          </a>
          <a href="/#parking">Parking</a>
          <a className={page === "login" ? "active" : ""} href="/login">
            Log in
          </a>
          <a className="button small" href="/register">
            Create account <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
      <div className="demo-banner">
        IT 340 · Milestone 1 preview{" "}
        <span>
          Sample campus crowd data · Parking uses NJIT’s public feed. Accounts
          are not connected yet.
        </span>
      </div>
      <main>
        {page === "home" ? <Home /> : <Auth register={page === "register"} />}
      </main>
      <footer>
        <a className="brand footer-brand" href="/">
          CrowdMeter <b>NJIT</b>
        </a>
        <span>Built for campus. Powered by student reports.</span>
        <span>IT 340 · Fall 2026</span>
      </footer>
    </>
  );
}
function Home() {
  const [query, setQuery] = useState(""),
    [type, setType] = useState("All spaces"),
    [level, setLevel] = useState("All crowd levels");
  const shown = facilities.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) &&
      (type === "All spaces" || f.type === type) &&
      (level === "All crowd levels" || f.level === level),
  );
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">
            <span className="dot" /> YOUR CAMPUS AT A GLANCE
          </p>
          <h1>
            Find your space.
            <br />
            <span>Skip the crowd.</span>
          </h1>
          <p className="intro">
            A quieter study spot. A shorter dining line. A place to park. See
            how busy campus is before you head out.
          </p>
          <a className="text-link" href="#directory">
            Explore campus spaces <span aria-hidden="true">↓</span>
          </a>
        </div>
        <aside className="campus-note">
          <div className="note-top">
            <span>THE CAMPUS PULSE</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="pulse" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <h2>
            A little insight.
            <br />A better campus day.
          </h2>
          <p>Student reports give you a snapshot of the spaces around you.</p>
          <span className="sample-tag">Illustrative preview</span>
        </aside>
      </section>
      <Parking />
      <section id="directory" className="directory">
        <div className="section-head">
          <div>
            <p className="eyebrow">EXPLORE NJIT</p>
            <h2>Where are you headed?</h2>
          </div>
          <p>
            {facilities.length} spaces to explore{" "}
            <span className="muted">/ sample directory</span>
          </p>
        </div>
        <div className="filters">
          <label className="search">
            <span aria-hidden="true">⌕</span>
            <span className="sr-only">Search facilities by name</span>
            <input
              type="search"
              placeholder="Search for a campus space…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label>
            <span className="sr-only">Facility type</span>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              {[
                "All spaces",
                "Library",
                "Dining",
                "Gym",
                "Computer lab",
                "Study space",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Crowd level</span>
            <select value={level} onChange={(e) => setLevel(e.target.value)}>
              {[
                "All crowd levels",
                "Empty",
                "Moderate",
                "Busy",
                "Packed",
                "No recent reports",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="results-info" aria-live="polite">
          Showing {shown.length} of {facilities.length} spaces{" "}
          <button
            className="reset"
            onClick={() => {
              setQuery("");
              setType("All spaces");
              setLevel("All crowd levels");
            }}
          >
            Reset filters
          </button>
        </div>
        <div className="grid">
          {shown.map((f) => (
            <article className="facility" key={f.name}>
              <div className="card-top">
                <span className="space-icon" aria-hidden="true">
                  {f.icon}
                </span>
                <span className="type">{f.type}</span>
              </div>
              <h3>{f.name}</h3>
              <p className="location">{f.place}</p>
              <div
                className={"meter level-" + f.score}
                aria-label={`${f.level}, ${f.score || "no"} of 4 crowd bands`}
              >
                {[1, 2, 3, 4].map((n) => (
                  <i key={n} className={n <= f.score ? "filled" : ""} />
                ))}
              </div>
              <div className="card-bottom">
                <strong className={"status status-" + f.score}>
                  {f.level}
                </strong>
                <span>
                  {f.time ? `Sample · ${f.time}` : "No sample reports"}
                </span>
              </div>
            </article>
          ))}
        </div>
        {shown.length === 0 && (
          <div className="empty">
            <h3>No spaces found</h3>
            <p>Try a different name or reset your filters.</p>
          </div>
        )}
        <p className="directory-note">
          Crowd levels will reflect reports from the last 30 minutes. This
          preview uses sample data, not live campus activity.
        </p>
      </section>
      <section className="join">
        <div>
          <p className="eyebrow">A BETTER CAMPUS STARTS WITH YOU</p>
          <h2>Your next stop, without the guesswork.</h2>
          <p>
            Verified NJIT students will be able to share crowd reports and help
            others plan their day.
          </p>
        </div>
        <a className="button" href="/register">
          Explore registration <span aria-hidden="true">↗</span>
        </a>
      </section>
    </>
  );
}

function Parking() {
  const [data, setData] = useState(null),
    [error, setError] = useState(""),
    [loading, setLoading] = useState(true),
    [refresh, setRefresh] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setRefresh((n) => n + 1), 60000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    async function load() {
      try {
        const response = await fetch("/api/parking", {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Parking feed unavailable");
        const result = await response.json();
        if (!Array.isArray(result.decks) || !result.fetchedAt)
          throw new Error("Invalid parking response");
        if (!controller.signal.aborted) {
          setData(result);
          setError("");
        }
      } catch (e) {
        if (!controller.signal.aborted)
          setError(
            "We couldn’t refresh NJIT parking data. Try again or check the official parking page.",
          );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [refresh]);
  const decks = data?.decks || [];
  return (
    <section
      id="parking"
      className="parking-section"
      aria-labelledby="parking-title"
    >
      <div className="section-head">
        <div>
          <p className="eyebrow">PARK BEFORE YOU ARRIVE</p>
          <h2 id="parking-title">Find a parking spot.</h2>
        </div>
        <a
          className="text-link official-link"
          href="https://mobile.njit.edu/parking/"
          target="_blank"
          rel="noreferrer"
        >
          Official NJIT parking ↗
        </a>
      </div>
      <div className="parking-toolbar">
        <p>
          Available spots, occupied spaces, and total capacity from NJIT’s
          parking feed.
        </p>
        <button
          className="button small"
          onClick={() => setRefresh((n) => n + 1)}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh parking"}
        </button>
      </div>
      <div className="parking-feed-status" role="status">
        {error ? (
          <span className="feed-error">
            {error}
            {data
              ? " Counts below are from the last successful fetch and may be out of date."
              : ""}
          </span>
        ) : loading && !data ? (
          "Loading parking locations…"
        ) : data ? (
          "Feed fetched " +
          new Date(data.fetchedAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          }) +
          " · Refreshes every 60 seconds."
        ) : (
          ""
        )}
      </div>
      <div className="parking-grid" aria-busy={loading}>
        {decks.map((deck) => {
          const known = deck.status === "available";
          const percent =
            known && deck.total > 0
              ? Math.round((deck.occupied / deck.total) * 100)
              : 0;
          return (
            <article className="parking-card" key={deck.id}>
              <div className="parking-card-heading">
                <span className="parking-icon" aria-hidden="true">
                  P
                </span>
                <span
                  className={
                    "parking-access" + (deck.facultyOnly ? " faculty-only" : "")
                  }
                >
                  {deck.facultyOnly
                    ? "Faculty / staff only"
                    : "General parking"}
                </span>
              </div>
              <h3>{deck.name}</h3>
              <p className="parking-address">{deck.address}</p>
              <div className="parking-count">
                <strong>{known ? deck.available.toLocaleString() : "—"}</strong>
                <span>
                  {known ? "spots available" : "Availability unavailable"}
                </span>
              </div>
              {known ? (
                <>
                  <div
                    className="parking-bar"
                    role="meter"
                    aria-label={deck.name + " occupancy"}
                    aria-valuemin={0}
                    aria-valuemax={deck.total || 1}
                    aria-valuenow={deck.occupied}
                    aria-valuetext={
                      deck.occupied +
                      " occupied out of " +
                      deck.total +
                      " total spots"
                    }
                  >
                    <span style={{ width: percent + "%" }} />
                  </div>
                  <p className="parking-occupancy">
                    {percent}% occupied{deck.available === 0 ? " · Full" : ""}
                  </p>
                </>
              ) : (
                <p className="parking-unavailable">
                  NJIT’s feed has missing or inconsistent counts for this
                  location.
                </p>
              )}
              <dl className="parking-totals">
                <div>
                  <dt>Occupied</dt>
                  <dd>{known ? deck.occupied.toLocaleString() : "—"}</dd>
                </div>
                <div>
                  <dt>Total spots</dt>
                  <dd>
                    {deck.total !== null ? deck.total.toLocaleString() : "—"}
                  </dd>
                </div>
              </dl>
              {deck.address && (
                <a
                  className="parking-map"
                  href={
                    "https://www.google.com/maps/search/?api=1&query=" +
                    encodeURIComponent(deck.address)
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  View location ↗
                </a>
              )}
            </article>
          );
        })}
      </div>
      <p className="directory-note">
        Source:{" "}
        <a
          href="https://mobile.njit.edu/parking/"
          target="_blank"
          rel="noreferrer"
        >
          NJIT Parking Status
        </a>
        . Counts are estimates from an external feed, not a guarantee of a
        space. “Feed fetched” indicates retrieval time, not when NJIT’s sensors
        last updated. Follow posted permit restrictions and check NJIT’s page
        for overflow parking rules.
      </p>
    </section>
  );
}

function Password({ label, id, autoComplete, minLength }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="field" htmlFor={id}>
      {label}
      <span className="password-wrap">
        <input
          id={id}
          name={id}
          type={visible ? "text" : "password"}
          required
          minLength={minLength}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
          onClick={() => setVisible(!visible)}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </span>
    </label>
  );
}
function Auth({ register }) {
  const [message, setMessage] = useState("");
  function submit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (register) {
      const email = data.get("email").trim();
      if (!/^[^\s@]+@njit\.edu$/i.test(email)) {
        setMessage("Enter an email address ending in @njit.edu.");
        return;
      }
      if (!/^[a-zA-Z0-9_]{3,24}$/.test(data.get("username"))) {
        setMessage(
          "Use 3–24 letters, numbers, or underscores for your username.",
        );
        return;
      }
      if (!/(?=.*[A-Za-z])(?=.*\d).{12,}/.test(data.get("password"))) {
        setMessage("Use at least 12 characters with a letter and a number.");
        return;
      }
      if (data.get("password") !== data.get("confirm")) {
        setMessage("Your passwords do not match. Please try again.");
        return;
      }
    }
    setMessage(
      register
        ? "Front-end check passed. No account was created and no verification email was sent. These will be connected in Milestone 2."
        : "Front-end check passed. Sign-in is not connected yet; no session was created.",
    );
  }
  return (
    <section className="auth-layout">
      <div className="auth-story">
        <p className="eyebrow">MADE FOR THE NJIT COMMUNITY</p>
        <h1>
          {register ? "Your campus." : "Welcome"}
          <br />
          <span>{register ? "A little clearer." : "back to campus."}</span>
        </h1>
        <p className="intro">
          {register
            ? "Join a community that helps you find the right space at the right time."
            : "Find a place to focus, grab a bite, or recharge. Your campus overview is one click away."}
        </p>
        <a className="text-link" href="/">
          ← Back to campus overview
        </a>
        <div className="auth-note">
          <span className="dot" /> Student reported. Community powered.
        </div>
      </div>
      <div className="auth-card">
        <p className="eyebrow">CROWDMETER NJIT</p>
        <h2>{register ? "Create your account" : "Good to see you again"}</h2>
        <p className="muted">
          {register
            ? "Start with your NJIT email address."
            : "Enter your username or email to continue."}
        </p>
        <form onSubmit={submit} onChange={() => setMessage("")}>
          <label className="field" htmlFor="username">
            {register ? "Username" : "Username or email"}
            <input
              id="username"
              name="username"
              required
              autoComplete="username"
              maxLength={register ? 24 : undefined}
            />
          </label>
          {register && (
            <label className="field" htmlFor="email">
              NJIT email
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@njit.edu"
                required
                autoComplete="email"
              />
              <small>Use your @njit.edu student email.</small>
            </label>
          )}
          <Password
            id="password"
            label="Password"
            autoComplete={register ? "new-password" : "current-password"}
            minLength={register ? 12 : undefined}
          />
          {register && (
            <>
              <p className="password-hint">
                Use at least 12 characters, including a letter and a number.
                This is front-end validation only.
              </p>
              <Password
                id="confirm"
                label="Confirm password"
                autoComplete="new-password"
                minLength={12}
              />
            </>
          )}
          <button className="button submit" type="submit">
            {register ? "Create account" : "Log in"}{" "}
            <span aria-hidden="true">↗</span>
          </button>
          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}
        </form>
        {register && (
          <p className="verification-note">
            Planned account flow: a verification email will confirm your NJIT
            address before you can submit reports. Email delivery is not active
            in this preview.
          </p>
        )}
        <p className="switch">
          {register ? "Already have an account?" : "New to CrowdMeter?"}{" "}
          <a href={register ? "/login" : "/register"}>
            {register ? "Log in" : "Create an account"}
          </a>
        </p>
        <p className="privacy-note">
          Demo only. Use made-up credentials; this form does not send or save
          them.
        </p>
      </div>
    </section>
  );
}
createRoot(document.getElementById("root")).render(<App />);
