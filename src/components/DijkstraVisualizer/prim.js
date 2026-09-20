import { ROWS, COLS, START, END, keyOf } from "./dijkstra.js";

// Randomized Prim: grow a spanning tree of rooms, carving their connecting walls.
export function primMaze(random = Math.random) {
  const grid = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({ type: "wall", weight: Infinity })),
  );
  const carvedOrder = [];
  const rooms = new Set();
  const frontier = [];
  function carve(row, col) {
    grid[row][col] = { type: "open", weight: 1 };
    carvedOrder.push({ row, col });
  }
  function addRoom(row, col) {
    rooms.add(keyOf(row, col));
    carve(row, col);
    for (const [dr, dc] of [[-2, 0], [2, 0], [0, -2], [0, 2]]) {
      const nextRow = row + dr;
      const nextCol = col + dc;
      if (nextRow >= 1 && nextRow < ROWS - 1 && nextCol >= 2 && nextCol <= END.col - 1) {
        if (!rooms.has(keyOf(nextRow, nextCol))) {
          frontier.push({ row: nextRow, col: nextCol, fromRow: row, fromCol: col });
        }
      }
    }
  }
  addRoom(START.row, START.col);
  while (frontier.length) {
    const index = Math.floor(random() * frontier.length);
    const edge = frontier[index];
    frontier[index] = frontier[frontier.length - 1];
    frontier.pop();
    if (rooms.has(keyOf(edge.row, edge.col))) continue;
    carve((edge.row + edge.fromRow) / 2, (edge.col + edge.fromCol) / 2);
    addRoom(edge.row, edge.col);
  }
  // The target is a leaf beside the last room column.
  carve(END.row, END.col);
  return { grid, carvedOrder };
}
