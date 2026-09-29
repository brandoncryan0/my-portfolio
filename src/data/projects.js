const projects = [
  {
    id: "dijkstra",

    title: "Pathfinding & Maze Visualizer",

    category: "PROGRAMMING / ALGORITHMS",

    description:
      "An interactive pathfinding laboratory for comparing Dijkstra and A* across weighted terrain, obstacles, and procedurally generated mazes.",

    skills: ["React", "JavaScript", "Graph Algorithms", "Data Structures"],

    overview:
      "Explore and compare Dijkstra and A* shortest-path algorithms on an interactive grid, then generate connected mazes using randomized Prim's algorithm.",

    problem:
      "The shortest route by distance is not always the lowest-cost route when obstacles and weighted terrain are involved. Static diagrams also make it difficult to see how different pathfinding algorithms explore the same problem.",

    approach:
      "I implemented Dijkstra and A* using a binary min-heap priority queue, with Manhattan distance serving as the heuristic for A*. I also implemented randomized Prim's algorithm to generate connected mazes and separated the algorithm logic from the React visualization.",

    result:
      "Users can build custom boards, assign terrain costs, generate mazes, and compare explored nodes, path cost, and computation time across algorithms, including cases where no valid path exists.",

    image: "/images/projects/dijkstra-preview.png",
  },
  {
    id: "eigenvalue-visualizer",
    image: "/images/projects/eigenvalue-preview.png",
    title: "Eigenvalue & Eigenvector Visualizer",
    category: "MATHEMATICS / PROGRAMMING",
    description:
      "An interactive linear algebra tool for visualizing matrix transformations, eigenvalues, eigenvectors, and preserved directions in the plane.",
    skills: ["Linear Algebra", "React", "JavaScript", "SVG"],
    overview:
      "An interactive connection between matrix calculations and geometry, with real and complex eigenvalues, eigenvectors, and a step-by-step characteristic polynomial.",
    problem:
      "Eigenvectors and diagonalizability can feel abstract without seeing how a matrix stretches, reflects, shears, or rotates the plane.",
    approach:
      "Separate tested mathematical calculations from a responsive SVG plane, and interpolate between the identity and the selected matrix. Render the derivation using KaTeX.",
    result:
      "Explore presets or a custom matrix, compare algebraic and geometric behavior, and distinguish repeated, defective, and complex eigenvalue cases.",
    image: "/images/projects/eigenvalue-preview.png",
  },
  {
    id: "technical-writing",
    title: "Technical Communication Project",
    category: "TECHNICAL COMMUNICATION",
    description:
      "A technical communication project focused on transforming complex information into clear, audience-centered content.",
    skills: ["Technical Writing", "Research", "Information Design"],
  },

  {
    id: "programming-project",
    title: "Programming Project",
    category: "PROGRAMMING",
    description:
      "A software project demonstrating programming, debugging, and problem-solving skills.",
    skills: ["JavaScript", "Programming", "Problem Solving"],
  },

  {
    id: "mathematics-project",
    title: "Mathematics Project",
    category: "MATHEMATICS",
    description:
      "A mathematics project demonstrating rigorous reasoning, mathematical communication, and analytical problem solving.",
    skills: ["Mathematics", "Analysis", "LaTeX"],
  },
];

export default projects;
