import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <main>
        <h1>Brandon Cryan</h1>
        <p>My personal portfolio</p>
      </main>
    </div>
  );
}

export default App;
