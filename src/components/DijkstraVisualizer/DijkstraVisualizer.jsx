import { useEffect, useRef, useState } from "react";
import "./DijkstraVisualizer.css";
import { START, END, keyOf, createGrid, dijkstra } from "./dijkstra";

export default function DijkstraVisualizer() {
  const runId = useRef(0);
  const timer = useRef(null);
  useEffect(() => () => {
    runId.current += 1;
    clearTimeout(timer.current);
  }, []);
  const [status, setStatus] = useState("Ready to explore.");
  const [grid, setGrid] = useState(createGrid);

  const [visitedCells, setVisitedCells] = useState(new Set());

  const [pathCells, setPathCells] = useState(new Set());

  const [brush, setBrush] = useState("wall");

  const [running, setRunning] = useState(false);

  const [stats, setStats] = useState({
    visited: 0,
    cost: null,
    runtime: null,
  });

  function editCell(row, col) {
    if (running) {
      return;
    }

    if (
      (row === START.row && col === START.col) ||
      (row === END.row && col === END.col)
    ) {
      return;
    }

    resetVisualization();
    setGrid((currentGrid) => {
      const copy = currentGrid.map((gridRow) =>
        gridRow.map((cell) => ({ ...cell })),
      );

      if (brush === "wall") {
        copy[row][col] = {
          type: "wall",
          weight: Infinity,
        };
      }

      if (brush === "weight") {
        copy[row][col] = {
          type: "open",
          weight: 5,
        };
      }

      if (brush === "erase") {
        copy[row][col] = {
          type: "open",
          weight: 1,
        };
      }

      return copy;
    });
  }

  async function runAlgorithm() {
    if (running) {
      return;
    }

    const id = ++runId.current;
    const sleep = (ms) => new Promise((resolve) => {
      timer.current = setTimeout(resolve, ms);
    });
    setRunning(true);
    setStatus("Exploring nodes...");
    setStats({ visited: 0, cost: null, runtime: null });

    setVisitedCells(new Set());
    setPathCells(new Set());

    const startTime = performance.now();

    const result = dijkstra(grid);

    const runtime = performance.now() - startTime;

    setStats({ visited: 0, cost: null, runtime: runtime.toFixed(2) });
    for (const cell of result.visitedOrder) {
      if (runId.current !== id) return;
      setStats((current) => ({ ...current, visited: current.visited + 1 }));
      setVisitedCells((current) => {
        const next = new Set(current);

        next.add(keyOf(cell.row, cell.col));

        return next;
      });

      await sleep(12);
    }

    if (runId.current !== id) return;
    setStatus(result.path.length ? "Tracing the shortest path..." : "No path found. Erase some walls and try again.");
    for (const cell of result.path) {
      if (runId.current !== id) return;
      setPathCells((current) => {
        const next = new Set(current);

        next.add(keyOf(cell.row, cell.col));

        return next;
      });

      await sleep(35);
    }

    if (runId.current !== id) return;
    if (result.path.length) setStatus("Shortest path found.");
    setStats({
      visited: result.visitedOrder.length,
      cost: result.cost === Infinity ? "No path" : result.cost,
      runtime: runtime.toFixed(2),
    });

    setRunning(false);
  }

  function resetVisualization() {
    runId.current += 1;
    clearTimeout(timer.current);
    setRunning(false);
    setStatus("Ready to explore.");

    setVisitedCells(new Set());
    setPathCells(new Set());

    setStats({
      visited: 0,
      cost: null,
      runtime: null,
    });
  }

  function clearBoard() {

    setGrid(createGrid());
    resetVisualization();
  }

  function getCellClass(row, col, cell) {
    const classes = ["dijkstra-cell"];

    const key = keyOf(row, col);

    if (row === START.row && col === START.col) {
      classes.push("start");
    } else if (row === END.row && col === END.col) {
      classes.push("end");
    } else if (pathCells.has(key)) {
      classes.push("path");
    } else if (visitedCells.has(key)) {
      classes.push("visited");
    } else if (cell.type === "wall") {
      classes.push("wall");
    } else if (cell.weight === 5) {
      classes.push("weighted");
    }

    return classes.join(" ");
  }

  return (
    <section className="dijkstra-project">
      <div className="dijkstra-header">
        <div>
          <p className="section-label">ALGORITHM VISUALIZER</p>

          <h2>Dijkstra's Algorithm</h2>

          <p className="dijkstra-description">
            Interactive shortest-path visualization using a binary min-heap
            priority queue and weighted graph traversal.
          </p>
        </div>

        <button
          className="button primary-button run-button"
          onClick={runAlgorithm}
          disabled={running}
        >
          {running ? "Running..." : "Run Dijkstra"}
        </button>
      </div>

      <div className="dijkstra-controls">
        <span>Terrain:</span>

        <button
          className={brush === "wall" ? "active" : ""}
          onClick={() => setBrush("wall")}
          aria-pressed={brush === "wall"}
          disabled={running}
        >
          Wall
        </button>

        <button
          className={brush === "weight" ? "active" : ""}
          onClick={() => setBrush("weight")}
          aria-pressed={brush === "weight"}
          disabled={running}
        >
          Weight 5
        </button>

        <button
          className={brush === "erase" ? "active" : ""}
          onClick={() => setBrush("erase")}
          aria-pressed={brush === "erase"}
          disabled={running}
        >
          Erase
        </button>

        <button onClick={resetVisualization}>{running ? "Stop / Reset Search" : "Reset Search"}</button>

        <button onClick={clearBoard}>Clear Board</button>
      </div>

      <p id="dijkstra-instructions" className="dijkstra-description">
        Click or tap cells to paint terrain, or use Tab and Enter / Space.
        S is the start; E is the target. Movement is horizontal or vertical.
        Entering a normal cell costs 1; a weighted cell costs 5. The start costs 0.
        On small screens, scroll the board sideways.
      </p>
      <p role="status">{status}</p>
      <div className="dijkstra-board" role="region" aria-label="Pathfinding board" aria-describedby="dijkstra-instructions" tabIndex={0}>
      <div className="dijkstra-grid">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={keyOf(rowIndex, colIndex)}
              className={getCellClass(rowIndex, colIndex, cell)}
              onClick={() => editCell(rowIndex, colIndex)}
              disabled={running}
              aria-label={`Row ${rowIndex + 1}, column ${colIndex + 1}: ${rowIndex === START.row && colIndex === START.col ? "start" : rowIndex === END.row && colIndex === END.col ? "target" : cell.type === "wall" ? "wall" : `cost ${cell.weight}`}${pathCells.has(keyOf(rowIndex, colIndex)) ? ", shortest path" : visitedCells.has(keyOf(rowIndex, colIndex)) ? ", explored" : ""}`}
            >
              {rowIndex === START.row && colIndex === START.col
                ? "S"
                : rowIndex === END.row && colIndex === END.col
                  ? "E"
                  : cell.weight === 5 && cell.type !== "wall"
                    ? "5"
                    : ""}
            </button>
          )),
        )}
      </div>

      </div>

      <div className="dijkstra-stats">
        <div>
          <span>Nodes Explored</span>
          <strong>{stats.visited}</strong>
        </div>

        <div>
          <span>Path Cost</span>
          <strong>{stats.cost ?? "—"}</strong>
        </div>

        <div>
          <span>Runtime (compute only)</span>
          <strong>{stats.runtime ? `${stats.runtime} ms` : "—"}</strong>
        </div>

        <div>
          <span>Data Structure</span>
          <strong>Min Heap</strong>
        </div>
      </div>

      <div className="dijkstra-legend">
        <span>
          <i className="legend-start" />
          Start
        </span>

        <span>
          <i className="legend-end" />
          Target
        </span>

        <span>
          <i className="legend-wall" />
          Wall
        </span>

        <span>
          <i className="legend-weight" />
          Weight 5
        </span>

        <span>
          <i className="legend-visited" />
          Explored
        </span>

        <span>
          <i className="legend-path" />
          Shortest Path
        </span>
      </div>
    </section>
  );
}
