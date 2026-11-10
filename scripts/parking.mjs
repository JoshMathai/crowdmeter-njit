// Read-only adapter for the public feed used by NJIT's parking status page.
const FEED_URL = "https://mobile.njit.edu/parking/data.php";
export const SOURCE_URL = "https://mobile.njit.edu/parking/";
const numberOrNull = (value) => {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (String(value).trim() === "") return null;
  const number = Number(value);
  return Number.isSafeInteger(number) && number >= 0 ? number : null;
};
export function normalizeParking(raw) {
  if (!raw || raw.error || !raw.decks || typeof raw.decks !== "object")
    throw new Error("Invalid parking feed");
  const decks = Object.values(raw.decks)
    .filter((d) => d && d.type !== "reserved")
    .map((d) => {
      const total = numberOrNull(d.Total);
      const available = numberOrNull(d.Available);
      const occupied = numberOrNull(d.Occupied);
      const valid =
        total !== null &&
        available !== null &&
        occupied !== null &&
        available <= total &&
        occupied <= total &&
        available + occupied === total;
      return {
        id: String(d.SiteName || d.Name),
        name: String(d.Name || "Parking location"),
        address: String(d.Address || ""),
        facultyOnly: d.type === "facstaff",
        total,
        available: valid ? available : null,
        occupied: valid ? occupied : null,
        status: valid ? "available" : "unavailable",
      };
    });
  if (!decks.length) throw new Error("No parking locations");
  return decks.sort(
    (a, b) =>
      Number(a.facultyOnly) - Number(b.facultyOnly) ||
      Number(a.status !== "available") - Number(b.status !== "available") ||
      a.name.localeCompare(b.name),
  );
}
let cached;
let pending;
async function getParking() {
  if (cached && Date.now() - cached.cachedAt < 30000) return cached.payload;
  if (pending) return pending;
  pending = (async () => {
    const response = await fetch(FEED_URL, {
      signal: AbortSignal.timeout(8000),
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("Parking feed request failed");
    const decks = normalizeParking(await response.json());
    const payload = {
      decks,
      fetchedAt: new Date().toISOString(),
      sourceUrl: SOURCE_URL,
    };
    cached = { cachedAt: Date.now(), payload };
    return payload;
  })();
  try {
    return await pending;
  } finally {
    pending = undefined;
  }
}
export async function serveParking(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  try {
    const payload = await getParking();
    res.writeHead(200);
    res.end(req.method === "HEAD" ? undefined : JSON.stringify(payload));
  } catch {
    res.writeHead(502);
    res.end(
      req.method === "HEAD"
        ? undefined
        : JSON.stringify({
            error:
              "NJIT parking data is temporarily unavailable. Check the official parking page or try again.",
          }),
    );
  }
}
