export const ROWS = 12;
export const COLS = 20;

export const START = { row: 5, col: 2 };
export const END = { row: 5, col: 17 };

export const keyOf = (row, col) => `${row}-${col}`;

export function createGrid() {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      type: "open",
      weight: 1,
    })),
  );
}

/*
    Binary min heap.

    Dijkstra repeatedly needs the unvisited node with the
    smallest known distance. A priority queue makes that
    operation more efficient than scanning the entire grid.
*/
class MinHeap {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);

    let index = this.items.length - 1;

    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);

      if (this.items[parent].distance <= this.items[index].distance) {
        break;
      }

      [this.items[parent], this.items[index]] = [
        this.items[index],
        this.items[parent],
      ];

      index = parent;
    }
  }

  pop() {
    if (this.items.length === 0) {
      return null;
    }

    const minimum = this.items[0];
    const last = this.items.pop();

    if (this.items.length > 0) {
      this.items[0] = last;

      let index = 0;

      while (true) {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let smallest = index;

        if (
          left < this.items.length &&
          this.items[left].distance < this.items[smallest].distance
        ) {
          smallest = left;
        }

        if (
          right < this.items.length &&
          this.items[right].distance < this.items[smallest].distance
        ) {
          smallest = right;
        }

        if (smallest === index) {
          break;
        }

        [this.items[index], this.items[smallest]] = [
          this.items[smallest],
          this.items[index],
        ];

        index = smallest;
      }
    }

    return minimum;
  }

  get size() {
    return this.items.length;
  }
}

function getNeighbors(row, col) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const neighbors = [];

  for (const [rowChange, colChange] of directions) {
    const nextRow = row + rowChange;
    const nextCol = col + colChange;

    if (nextRow >= 0 && nextRow < ROWS && nextCol >= 0 && nextCol < COLS) {
      neighbors.push({
        row: nextRow,
        col: nextCol,
      });
    }
  }

  return neighbors;
}

export function dijkstra(grid) {
  return shortestPath(grid, () => 0);
}

export function aStar(grid) {
  // Manhattan distance is consistent because every traversable cell costs >= 1.
  return shortestPath(grid, (row, col) => Math.abs(row - END.row) + Math.abs(col - END.col));
}

function shortestPath(grid, heuristic) {
  const distances = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(Infinity),
  );

  const previous = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));

  const visitedOrder = [];

  const queue = new MinHeap();

  distances[START.row][START.col] = 0;

  queue.push({
    row: START.row,
    col: START.col,
    distance: 0,
  });

  while (queue.size > 0) {
    const current = queue.pop();

    const { row, col } = current;

    if (visited[row][col]) {
      continue;
    }

    if (grid[row][col].type === "wall") {
      continue;
    }

    visited[row][col] = true;

    visitedOrder.push({
      row,
      col,
    });

    if (row === END.row && col === END.col) {
      break;
    }

    const neighbors = getNeighbors(row, col);

    for (const neighbor of neighbors) {
      const nextRow = neighbor.row;
      const nextCol = neighbor.col;

      if (visited[nextRow][nextCol] || grid[nextRow][nextCol].type === "wall") {
        continue;
      }

      const newDistance = distances[row][col] + grid[nextRow][nextCol].weight;

      if (newDistance < distances[nextRow][nextCol]) {
        distances[nextRow][nextCol] = newDistance;

        previous[nextRow][nextCol] = {
          row,
          col,
        };

        queue.push({
          row: nextRow,
          col: nextCol,
          distance: newDistance + heuristic(nextRow, nextCol),
        });
      }
    }
  }

  const path = [];

  if (distances[END.row][END.col] !== Infinity) {
    let current = {
      row: END.row,
      col: END.col,
    };

    while (current) {
      path.unshift(current);

      current = previous[current.row][current.col];
    }
  }

  return {
    visitedOrder,
    path,
    cost: distances[END.row][END.col],
  };
}

