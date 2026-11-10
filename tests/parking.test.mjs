import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeParking } from "../scripts/parking.mjs";
const deck = {
  Name: "Test garage",
  SiteName: "test",
  Address: "Test address",
  Total: "100",
  Available: "25",
  Occupied: "75",
  type: "general",
};
const normalize = (patch) =>
  normalizeParking({ decks: { 1: { ...deck, ...patch } } })[0];
test("preserves numeric counts and zero availability", () => {
  assert.equal(normalize({}).available, 25);
  const full = normalize({ Available: "0", Occupied: "100" });
  assert.equal(full.available, 0);
  assert.equal(full.status, "available");
});
test("rejects missing, nonnumeric, negative, fractional, and inconsistent source counts", () => {
  for (const patch of [
    { Available: "Not Avaiable" },
    { Available: "" },
    { Available: null },
    { Occupied: "-1" },
    { Available: "101" },
    { Available: "25.5" },
    { Total: "unknown" },
    { Occupied: "74" },
  ]) {
    const result = normalize(patch);
    assert.equal(result.status, "unavailable");
    assert.equal(result.available, null);
    assert.equal(result.occupied, null);
  }
});
test("excludes reserved locations and preserves faculty restrictions", () => {
  const results = normalizeParking({
    decks: [
      deck,
      { ...deck, SiteName: "reserved", type: "reserved" },
      { ...deck, SiteName: "staff", type: "facstaff" },
    ],
  });
  assert.equal(results.length, 2);
  assert.equal(results[1].facultyOnly, true);
});
test("rejects feed errors and missing data", () => {
  for (const raw of [
    null,
    {},
    { error: "unavailable", decks: [deck] },
    { decks: [] },
  ])
    assert.throws(() => normalizeParking(raw));
});
