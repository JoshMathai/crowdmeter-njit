# CrowdMeter NJIT

IT 340 Final Project by Joshua Mathai.

Repository: [JoshMathai/crowdmeter-njit](https://github.com/JoshMathai/crowdmeter-njit). 


To download a copy:

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

## Parking data

Source: [NJIT Parking Status](https://mobile.njit.edu/parking/), using its public `data.php` feed. Counts are estimates and the fetch time is not a sensor update time. There is no documented availability guarantee for this feed; it may change. Network or parsing failures produce a visible error; missing, negative, out-of-range, or inconsistent counts are not presented as valid availability. Reserved entries are excluded and faculty/staff entries retain their restriction. General parking labels do not override permit rules. Node needs outbound HTTPS access to mobile.njit.edu. A purely static upload without the Node server will not provide the parking endpoint. This does not replace the project’s planned campus search API or private back-end VM.


