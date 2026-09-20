const projects = [
  {
    id: "dijkstra",
    title: "Dijkstra Shortest-Path Visualizer",
    category: "PROGRAMMING / ALGORITHMS",
    description: "Build walls and weighted terrain, then watch Dijkstra find the lowest-cost route.",
    skills: ["React", "JavaScript", "Graph Algorithms", "Data Structures"],
    overview: "Explore shortest-path search step by step on an interactive grid.",
    problem: "The fewest steps do not always make the cheapest route when obstacles and terrain costs are involved.",
    approach: "Use a binary min-heap to explore nodes in increasing cost order, then reconstruct the route from predecessor links.",
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
