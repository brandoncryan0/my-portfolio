import test from "node:test";
import assert from "node:assert/strict";
import { createGrid, dijkstra, aStar, START, END, ROWS, COLS } from "./dijkstra.js";

function verifyPath(grid, result) {
  assert.deepEqual(result.path[0], START);
  assert.deepEqual(result.path.at(-1), END);
  let cost = 0;
  result.path.slice(1).forEach((cell, index) => {
    const previous = result.path[index];
    assert.equal(Math.abs(cell.row - previous.row) + Math.abs(cell.col - previous.col), 1);
    assert.notEqual(grid[cell.row][cell.col].type, "wall");
    cost += grid[cell.row][cell.col].weight;
  });
  assert.equal(cost, result.cost);
  assert.equal(new Set(result.visitedOrder.map(({ row, col }) => `${row},${col}`)).size, result.visitedOrder.length);
}

test("open board finds the Manhattan shortest path without mutating terrain", () => {
  const grid = createGrid();
  const before = structuredClone(grid);
  const result = dijkstra(grid);
  assert.equal(result.cost, 15);
  verifyPath(grid, result);
  assert.deepEqual(grid, before);
});

test("prefers a longer, cheaper route around weighted terrain", () => {
  const grid = createGrid();
  grid[START.row][START.col + 1].weight = 5;
  const result = dijkstra(grid);
  assert.equal(result.cost, 17);
  assert.ok(!result.path.some(({ row, col }) => row === START.row && col === START.col + 1));
  verifyPath(grid, result);
});

test("counts weights when the route must pass through them", () => {
  const grid = createGrid();
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (row !== START.row) grid[row][col] = { type: "wall", weight: Infinity };
    }
  }
  grid[START.row][START.col + 1].weight = 5;
  const result = dijkstra(grid);
  assert.equal(result.cost, 19);
  verifyPath(grid, result);
});

test("routes through the gap in a wall", () => {
  const grid = createGrid();
  for (let row = 1; row < ROWS; row++) grid[row][10] = { type: "wall", weight: Infinity };
  const result = dijkstra(grid);
  assert.equal(result.cost, 25);
  verifyPath(grid, result);
});

test("reports no path across a complete barrier", () => {
  const grid = createGrid();
  for (let row = 0; row < ROWS; row++) grid[row][10] = { type: "wall", weight: Infinity };
  const result = dijkstra(grid);
  assert.equal(result.cost, Infinity);
  assert.deepEqual(result.path, []);
  assert.ok(result.visitedOrder.every(({ col }) => col < 10));
});


test("A* agrees with Dijkstra across deterministic weighted and blocked boards", () => {
  let seed = 42;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let trial = 0; trial < 50; trial++) {
    const grid = createGrid();
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if ((row === START.row && col === START.col) || (row === END.row && col === END.col)) continue;
        const value = random();
        grid[row][col] = value < 0.25 ? { type: "wall", weight: Infinity } : { type: "open", weight: value < 0.6 ? 5 : 1 };
      }
    }
    const result = aStar(grid);
    assert.equal(result.cost, dijkstra(grid).cost);
    if (result.cost !== Infinity) verifyPath(grid, result);
    else assert.deepEqual(result.path, []);
  }
});
