# Trello task drafts

Board: https://trello.com/b/i7kk57Wr/it-340

Use the required lists Backlog, To-Do, In Progress, and Completed. These are drafts, not records of updates already made. Assign the actual responsible student to each card. Milestone 1 cards are due November 10, 2026. Add real comments as work happens; do not backdate activity.

## Completed after student review

### Build Home page

Description: Implement the CrowdMeter NJIT home page with campus directory, sample crowd meters, search, facility type filter, crowd level filter, reset, and no-results state.

Acceptance: Page renders on narrow and wide screens; search and combined filters work; all data is labeled sample; Home links to Login and Register.

Evidence: Link src/main.jsx and src/styles.css in GitHub after pushing. Attach a screenshot after reviewing.

### Build Login page

Description: Create labeled username/email and password inputs, password visibility toggle, required-field checks, and registration link.

Acceptance: Controls work; login submit clearly explains that no authenticated session is created in Milestone 1.

### Build Register page

Description: Create username, NJIT email, password, and confirm-password inputs with validation and a login link.

Acceptance: Reject non-NJIT email and mismatched passwords; valid sample input displays a demo message; no credentials are stored or sent.

### Document AI use and prepare deployment guide

Description: Review docs/AI-USAGE.md, record actual student edits, and review the Ubuntu deployment steps.

Acceptance: AI-generated portions are disclosed accurately; student can explain the code; VM deployment is not claimed before it occurs.

## To-Do

### Create GitHub repository and push Milestone 1

Checklist: create empty repository; commit source and lockfile; push; verify files; add repo URL to this card and board description.

### Deploy front end in Ubuntu on VMware Fusion

Checklist: boot VM; record hostname and private IP; install compatible Node; clone/copy project; npm ci; npm run build; npm start; open VM IP from Mac; refresh Home, Login, Register.

Acceptance: All three pages load from the Ubuntu VM address, with screenshot evidence. Move to In Progress when you start, then Completed after verification.

### Capture demonstration evidence and prepare explanation

Checklist: screenshot three pages at VM IP; screenshot Ubuntu server; link GitHub commit; practice code/infrastructure explanation; inspect course portal submission instructions.

### Confirm tooling and finalize scope

Description: Confirm whether Vite requires instructor approval under the tool policy. If working in a group, agree on the selected proposal and specific deliverables, assign owners, and record the required signoff. Do not claim group approval before it occurs.

## Backlog for later milestones

- Milestone 2: provision private back-end and database VMs and VLAN connectivity.
- Milestone 2: implement real registration/login, server-side validation, password hashing, injection protections, UFW rules, and basic system logs.
- Milestone 3: implement NJIT email verification, report submission and cooldown, 30-minute aggregation, facility API searching, agreed favorites/busiest-times features, and system/custom logging.
- Reconcile the four-VM proposal with the milestone minimum of three; add the logging/monitoring VM as planned. Clarify ambiguous logging requirements with the instructor rather than logging plaintext passwords.

## Additional parking task for review

### Display NJIT parking availability

Description: Add a parking section with available, occupied, and total counts from NJIT’s public feed, 60-second refresh, manual refresh, map links, and faculty/staff restrictions.

Acceptance: Counts load through the Node server; zero available displays as full; invalid counts display as unavailable; network failures display an error; sample campus crowd data remains separate. Include the new files in the GitHub commit. This is additional interface work requested by the student, not evidence of a team-approved change to signed deliverables.
