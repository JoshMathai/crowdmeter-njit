# Milestone 1 completion guide

CrowdMeter NJIT needs three front-end pages hosted in at least one VM, plus updated GitHub and Trello. The deadline in the supplied specifications is November 10, 2026. A working Mac preview does not satisfy VM hosting.

## Current status

| Requirement | Status |
| --- | --- |
| Home HTML and CSS through React | Implemented; browser checked |
| Login HTML and CSS through React | Implemented; browser checked |
| Register HTML and CSS through React | Implemented; browser checked |
| At least one VM hosting the pages | Pending deployment to your Ubuntu VM |
| GitHub source | [Project repository](https://github.com/JoshMathai/crowdmeter-njit); verify latest commit online |
| Trello updated | Pending cards and evidence on existing board |
| AI use documented | Record prepared in AI-USAGE.md; review before submission |

The project overview asks for four VMs, while later milestone rows say at least three. Keep the proposal's four-VM plan for the full project. Milestone 1 explicitly requires at least one. For this milestone, only the front-end VM is needed; future back-end, database, and logging VMs must remain private as specified.

## 1 Open the GitHub project

Repository: https://github.com/JoshMathai/crowdmeter-njit

All required source files, the lockfile, setup instructions, tests, and AI-use record belong in this repository. Open the project folder in VS Code. For a fresh copy, clone it:

```sh
git clone https://github.com/JoshMathai/crowdmeter-njit.git
cd crowdmeter-njit
```

For subsequent edits in the VS Code terminal, use:

```sh
git add .
git commit -m "Describe your changes"
git push
```

Confirm your commit appears on GitHub. Never commit node_modules, dist, passwords, or access tokens.

## 2 Start the front-end VM

Open VMware Fusion and boot your Ubuntu VM. For the front-end VM, use Fusion's shared/NAT network so Ubuntu can download dependencies and your Mac can reach the guest. Keep the default isolation for other roles when you add them later. Do not forward your router or expose a public internet port for this local class demonstration.

Inside the Ubuntu terminal:

```sh
hostname
hostname -I
node --version
npm --version
git --version
```

Write down the VM's private IPv4 address. If Git is missing, install it using Ubuntu's package manager. If Node/npm is missing or incompatible, use Node's official download instructions for your Ubuntu release and architecture (ARM64 on an Apple Silicon guest, x64 on an Intel guest). Use a maintained Node 22 LTS release for this project. Do not assume the Mac's Node installation exists inside Ubuntu.

## 3 Copy or clone the project inside Ubuntu

Run inside Ubuntu:

```sh
git clone https://github.com/JoshMathai/crowdmeter-njit.git
cd crowdmeter-njit
npm ci
npm run build
npm start
```

Keep this terminal open during your demonstration. The server listens on port 8080. It serves the compiled React files from dist and handles direct requests for `/login` and `/register`. It is a simple milestone server, without HTTPS or authentication services.

Alternatively, copy this project folder using Fusion's supported file transfer or shared folder feature; exclude node_modules, then run `npm ci` inside Ubuntu. Building dependencies on the guest avoids mixing Mac and Linux binaries.

If UFW is already active and blocks the browser, allow TCP 8080 from your Mac's private address only. Inspect first, and substitute your actual Mac private IP:

```sh
sudo ufw status verbose
sudo ufw allow from MAC_PRIVATE_IP to any port 8080 proto tcp
```

Do not type the placeholder literally. Do not disable UFW. If UFW is inactive, document that state and configure it deliberately for the next milestone rather than claiming it is configured now. If using remote SSH later, preserve the SSH allow rule before enabling a firewall.

## 4 Confirm hosting from the Mac

Open `http://VM_PRIVATE_IP:8080` in your Mac browser, replacing VM_PRIVATE_IP with the address from Ubuntu. Check the home page, `/login`, and `/register` directly, then refresh each. Do not use `localhost` on the Mac for VM evidence; it would point to the Mac itself.

If the page is unreachable, confirm `npm start` is still running, both host and VM are on the expected Fusion network, and the active firewall allows the Mac. Inside Ubuntu, `curl -I http://localhost:8080` can distinguish a server problem from a network problem if curl is installed.

For a restart, return to the Ubuntu project directory and run `npm start`. The foreground server stops if its terminal closes or Ubuntu reboots; this guide does not claim a persistent system service is installed.

## 5 Demonstrate and capture evidence

- Home page at the VM IP with visible URL, campus cards, crowd labels, and sample-data banner.
- Search for `library`, select Gym, combine filters for zero results, then reset.
- Login page with required fields and show/hide password. Submit made-up values and explain that authentication is planned for Milestone 2.
- Registration rejects a non-NJIT email, rejects mismatched passwords, and shows the explicit demo message for valid sample inputs. Use made-up values only.
- Ubuntu terminal showing hostname, private IP, successful build, and running server. Capture the VM window to establish that the server is inside Ubuntu.
- GitHub source and commit history; Trello board with assigned cards and current status.

Save evidence in docs/evidence after you capture it. Existing home-preview.jpg is a local Mac preview, not proof of VM hosting. Never mark deployment complete based on it.

## 6 Explain the project

“The browser renders our React front end. CSS controls the layout across phone and desktop sizes. Right now the directory uses a local array so the interface can be demonstrated independently. Search and filters operate on that array. Login and registration validate inputs but do not create or authenticate accounts. The Ubuntu front-end VM serves the built files through Node. In Milestone 2, Express and MongoDB will provide server-side authentication on private VMs, with the front-end VM handling browser-facing traffic.”

Be able to identify `facilities`, `Home`, `Auth`, and `Password` in main.jsx; explain the filter predicate, controlled React state, submit handler, and why client validation is not security. In serve.mjs, explain the dist folder, port, and why `/login` returns the app HTML.

## Before submission

- [ ] Review the design and code so you can explain the work.
- [ ] Confirm any approval needed for the Vite build tool under the supplied project tool policy.
- [ ] Host and test all three pages inside Ubuntu.
- [ ] Verify the latest project commit appears in the GitHub repository.
- [ ] Update Trello with actual task owners, dates, and evidence.
- [ ] Review the AI-use record and record your own changes accurately.
- [ ] Check the course portal for submission format and attach the required links/screenshots. The supplied specifications do not define the portal submission format.

## Parking addition

The home page now includes NJIT parking availability through a read-only Node endpoint at `/api/parking`. In Ubuntu, use `npm start` and ensure outbound HTTPS to `mobile.njit.edu` works. A static-only server cannot serve this endpoint. Open `http://VM_PRIVATE_IP:8080/#parking`, confirm available/occupied/total counts, map links, and manual refresh. Some feed entries may show unavailable because source counts are inconsistent; do not replace these with invented values. The parking adapter is separate from the planned Milestone 2 Express authentication service and Milestone 3 facility search API. Update the presentation explanation accordingly: campus crowd data is sample, but parking comes from NJIT’s external feed.
