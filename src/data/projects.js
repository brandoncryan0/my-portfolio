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

    githubUrl:
      "https://github.com/brandoncryan0/my-portfolio/tree/main/src/components/DijkstraVisualizer",
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

    githubUrl:
      "https://github.com/brandoncryan0/my-portfolio/tree/main/src/components/EigenvalueVisualizer",
  },
  {
    id: "technical-writing",

    title: "Tiny Bus Conversion Documentation",

    category: "TECHNICAL COMMUNICATION / STRUCTURED AUTHORING",

    description:
      "A reconstructed technical documentation set for converting an existing bus interior into a compact living space, authored in DITA XML and published as HTML5 and PDF.",

    skills: [
      "DITA XML",
      "DITA-OT",
      "Technical Writing",
      "Information Architecture",
      "Technical Illustration",
    ],

    image: "/images/projects/tiny-bus-preview.svg",

    detailImage: "/images/projects/tiny-bus-components.svg",

    overview:
      "I reconstructed documentation for a previous Tiny Bus conversion project in which an existing bus interior was adapted into a tiny-home-style living space. The documentation covers space planning, interior construction, storage, materials, and the overall conversion process.",

    problem:
      "The original project documentation was no longer available. Rather than inventing exact engineering specifications, I needed to reconstruct the project from known information while clearly distinguishing verified details from retrospective interpretation.",

    approach:
      "I organized the content into reusable DITA concept, task, and reference topics, created schematic SVG diagrams for the interior layout and major components, and built separate DITA maps for web and PDF publication. DITA Open Toolkit provides the single-source publishing pipeline, while GitHub Actions automatically builds and deploys the HTML documentation.",

    result:
      "The finished project is a version-controlled structured documentation system that publishes responsive HTML5 documentation through GitHub Pages and a PDF technical manual from the same DITA source.",

    liveUrl: "https://brandoncryan0.github.io/tiny-bus-documentation/",

    pdfUrl:
      "https://brandoncryan0.github.io/tiny-bus-documentation/tiny-bus-conversion.pdf",

    githubUrl: "https://github.com/brandoncryan0/tiny-bus-documentation",
  },
  {
    id: "fitness-tracker",

    title: "Workout Tracker",

    category: "MOBILE DEVELOPMENT / PRODUCT DESIGN",

    description:
      "A mobile-first workout logging app designed for fast gym use, with local workout history, previous-weight recall, and an Android build powered by Capacitor.",

    skills: ["React", "JavaScript", "Local Storage", "Capacitor", "Android"],

    image: "/images/projects/fitness-tracker-preview.png",

    historyImage: "/images/projects/fitness-tracker-history.png",

    overview:
      "A lightweight workout tracker built around a simple lifting workflow. Users choose a workout, enter weights for each exercise, save the session, and automatically see their previous weights the next time they perform that workout.",

    problem:
      "Many fitness apps add unnecessary complexity through accounts, cloud services, dashboards, and features that slow down basic workout logging. I wanted a tracker focused specifically on quickly recording the information I use during a workout.",

    approach:
      "I built the interface in React and stored workout history directly on the device with localStorage. Previous exercise weights are retrieved from the latest saved workout, workout history can be reviewed or deleted, and Capacitor packages the Vite application as an Android app.",

    result:
      "The result is a focused local-first workout tracker that retains workout history and previous weights without requiring an account, server, or cloud database.",

    githubUrl: "https://github.com/brandoncryan0/fitness-tracker",
  },
];

export default projects;
