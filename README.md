# CrowdMeter NJIT

IT 340 Milestone 1 front end by Joshua Mathai.

Repository: [JoshMathai/crowdmeter-njit](https://github.com/JoshMathai/crowdmeter-njit). Home, Login, and Register pages for a campus crowd directory. Milestone 1 is due November 10, 2026.

## Run locally

Use Node.js 22 LTS or a compatible maintained Node version. Open this repository folder in VS Code, then use its integrated terminal.

To download a fresh copy:

```sh
git clone https://github.com/JoshMathai/crowdmeter-njit.git
cd crowdmeter-njit
```

```sh
npm ci
npm run build
npm start
```

Open http://localhost:8080. Login is at `/login`; registration is at `/register`. For development, use `npm run dev` instead.

## What works

- Responsive home page with six illustrative facility cards and text plus color crowd indicators.
- Search by facility name, combined type/crowd filters, reset, and empty results.
- Login and registration pages, required fields, password visibility toggles.
- Registration checks NJIT email, username format, a 12-character password containing a letter and a number, and matching passwords.
- Production build and Node server with direct links to all three pages.
- NJIT parking locations with available, occupied, and total counts, occupancy bars, faculty/staff restrictions, and map links. Counts refresh every 60 seconds, with a manual refresh button; the server caches the feed for 30 seconds. Invalid counts display as unavailable.

## Scope

Campus crowd data is sample data. Parking uses the public feed behind NJIT’s parking page through a read-only `/api/parking` adapter in the Node server. No authentication, account creation, email, database, report submission, or saved favorites are implemented. Passwords remain in the form only and are not sent, saved, or logged. Front-end checks are for usability; the back end must enforce validation and security in later milestones. Sample facility names and locations must be checked before live use.

The React components render semantic HTML, with styling in `src/styles.css`. React was selected in the project proposal. Vite is a build dependency, not a running campus service; check whether your instructor wants approval for this additional tool under the project tool policy.

## Project files

- `src/main.jsx`: pages, sample data, filters, and validation.
- `src/styles.css`: responsive styling.
- `scripts/serve.mjs`: serves the built front end over HTTP on port 8080.
- `scripts/parking.mjs`: public NJIT feed adapter and count validation.
- `vite.config.js`: enables the same parking endpoint during development/preview.
- `tests/parking.test.mjs`: count validation tests; run `node --test tests/parking.test.mjs`.
- `docs/MILESTONE-1.md`: remaining requirements, VM deployment, evidence, and presentation guide.
- `docs/TRELLO-CARDS.md`: copy-ready tasks for the existing board.
- `docs/AI-USAGE.md`: disclosure of AI contributions and review responsibilities.

## References

- [Vite production builds](https://vite.dev/guide/build)
- [Node.js downloads](https://nodejs.org/en/download)
- [GitHub instructions for existing local code](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github)

## Parking data

Source: [NJIT Parking Status](https://mobile.njit.edu/parking/), using its public `data.php` feed. Counts are estimates and the fetch time is not a sensor update time. There is no documented availability guarantee for this feed; it may change. Network or parsing failures produce a visible error; missing, negative, out-of-range, or inconsistent counts are not presented as valid availability. Reserved entries are excluded and faculty/staff entries retain their restriction. General parking labels do not override permit rules. Node needs outbound HTTPS access to mobile.njit.edu. A purely static upload without the Node server will not provide the parking endpoint. This does not replace the project’s planned campus search API or private back-end VM.

## Save future changes to GitHub

From the project folder in VS Code’s terminal:

```sh
git add .
git commit -m "Describe your changes"
git push
```

Do not commit passwords, tokens, or .env files. After pulling changes inside Ubuntu, run `npm ci` and `npm run build`, then restart `npm start`.
