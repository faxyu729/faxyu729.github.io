import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { frameAt, frameUrl, nearestFrame } from "./sequence.js";
test("scroll maps both directions and clamps overscroll to real frames", () => {
  assert.deepEqual(
    [0, 0.25, 0.5, 1, 0.5, 0, -0.1, 1.2, NaN].map((p) => frameAt(p)),
    [0, 36, 72, 143, 72, 0, 0, 143, 0],
  );
});
test("missing target frame uses closest decoded frame and empty cache preserves poster", () => {
  assert.equal(nearestFrame([], 70), null);
  assert.equal(nearestFrame([10, 30, 50], 44), 50);
  assert.equal(nearestFrame([100, 102, 110], 103), 102);
});
test("both sequences contain 144 raster frames per size with at least 120 unique motion states", () => {
  for (const scene of ["core", "archive"])
    for (const small of [false, true]) {
      // Resolve public assets relative to project, independently of the caller cwd.
      const publicDir = new URL(
        `../../public${frameUrl(scene, 0, small).replace(/000.webp$/, "")}`,
        import.meta.url,
      );
      const files = readdirSync(publicDir).filter((f) => f.endsWith(".webp"));
      assert.equal(files.length, 144);
      const hashes = new Set();
      for (let i = 0; i < 144; i++) {
        const buffer = readFileSync(
          new URL(`${String(i).padStart(3, "0")}.webp`, publicDir),
        );
        assert.equal(buffer.toString("ascii", 8, 12), "WEBP");
        hashes.add(createHash("sha256").update(buffer).digest("hex"));
      }
      // A closed animation may intentionally finish at its first pose.
      assert.ok(hashes.size >= 120, `${scene} requires at least 120 unique motion states`);
    }
});
