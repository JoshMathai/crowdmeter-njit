# AI usage record

## Contribution on November 9 2026

OpenAI Codex was used to read the project specifications and proposal and generate the initial Milestone 1 implementation for CrowdMeter NJIT. Generated material includes React page components, CSS styling, sample facility data, client-side form validation, a Node static server, package configuration, and the README, deployment guide, and Trello task drafts.

Codex ran dependency installation and the production build. Browser checks exercised facility search, a facility type filter, NJIT email validation, mismatched passwords, the registration preview message, password visibility, and login's preview message. These checks concern the local preview; VM hosting and Trello updates have not been verified. GitHub publication is tracked below.

The sample crowd levels and relative times were invented for the interface demonstration. They are not observations of NJIT facilities. No image generator or real student data was used.

## Student review before submission

Record the edits you actually make, the code you reviewed, and your VM testing here. Do not claim tests or work that you have not performed.

- Code and design reviewed: pending student review.
- Student changes: not yet recorded.
- VM test date and result: pending deployment.
- GitHub repository: https://github.com/JoshMathai/crowdmeter-njit. Check its commit history for the uploaded source.
- Trello evidence: pending update.

## Palette update on November 9 2026

At the student’s request, Codex changed the visual palette to NJIT-inspired red with pale red surfaces and neutral text across all three pages. Crowd-level indicators retain their semantic colors.

## Parking addition on November 9 2026

At the student’s request, Codex used https://mobile.njit.edu/parking/ as a reference and added a parking section backed by the same public feed. AI-generated changes include the React parking component, styles, Node feed adapter, Vite development endpoint, and count-validation tests. Parking figures are fetched from NJIT and are not invented sample values. Some source entries contain inconsistent counts, which display as unavailable. This addition does not implement student accounts or the planned facility search API.

## Repository preparation

At the student’s request, Codex prepared the project files for the supplied GitHub repository, including source, dependency lockfile, tests, setup guides, and AI-use disclosure. Build output and installed dependencies are excluded by .gitignore.
