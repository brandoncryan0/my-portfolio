import test from "node:test";
import assert from "node:assert/strict";
import { primMaze } from "./prim.js";
import { dijkstra, keyOf } from "./dijkstra.js";

test("Prim mazes are connected trees with a reachable target", () => {
  let seed = 17;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let trial = 0; trial < 30; trial++) {
    const { grid, carvedOrder } = primMaze(random);
    const open = new Set(carvedOrder.map(({ row, col }) => keyOf(row, col)));
    assert.equal(open.size, carvedOrder.length);
    let edges = 0;
    for (const { row, col } of carvedOrder) {
      assert.equal(grid[row][col].type, "open");
      if (open.has(keyOf(row + 1, col))) edges++;
      if (open.has(keyOf(row, col + 1))) edges++;
    }
    const reached = new Set();
    const queue = [carvedOrder[0]];
    for (let index = 0; index < queue.length; index++) {
      const { row, col } = queue[index];
      const key = keyOf(row, col);
      if (reached.has(key)) continue;
      reached.add(key);
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        if (open.has(keyOf(row + dr, col + dc))) queue.push({ row: row + dr, col: col + dc });
      }
    }
    assert.equal(reached.size, open.size);
    assert.equal(edges, open.size - 1);
    assert.ok(Number.isFinite(dijkstra(grid).cost));
  }
});
