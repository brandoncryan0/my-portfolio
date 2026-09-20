const projects = [
  {
    id: "eigenvalue-visualizer",
    title: "Eigenvalue & Eigenvector Visualizer",
    category: "MATHEMATICS / PROGRAMMING",
    description: "Explore how a 2 by 2 matrix transforms the plane, and discover the directions preserved by the transformation.",
    skills: ["Linear Algebra", "React", "JavaScript", "SVG"],
    overview: "An interactive connection between matrix calculations and geometry, with real and complex eigenvalues, eigenvectors, and a step-by-step characteristic polynomial.",
    problem: "Eigenvectors and diagonalizability can feel abstract without seeing how a matrix stretches, reflects, shears, or rotates the plane.",
    approach: "Separate tested mathematical calculations from a responsive SVG plane, and interpolate between the identity and the selected matrix. Render the derivation using KaTeX.",
    result: "Explore presets or a custom matrix, compare algebraic and geometric behavior, and distinguish repeated, defective, and complex eigenvalue cases.",
  },
  {
    id: "dijkstra",
    title: "Pathfinding & Maze Visualizer",
    category: "PROGRAMMING / ALGORITHMS",
    description: "Compare Dijkstra and A* on weighted terrain, or generate a maze with randomized Prim?s.",
    skills: ["React", "JavaScript", "Graph Algorithms", "Data Structures"],
    overview: "Explore Dijkstra and A* shortest-path searches and randomized Prim?s maze generation on an interactive grid.",
    problem: "The fewest steps do not always make the cheapest route when obstacles and terrain costs are involved.",
    approach: "Use a binary min-heap for Dijkstra and A*, with Manhattan distance guiding A*. Randomized Prim?s grows a spanning tree of rooms to carve a connected maze.",
    result: "Compare explored nodes, path cost, and compute runtime across custom boards, including unreachable targets.",
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
