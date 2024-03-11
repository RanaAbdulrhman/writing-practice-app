import React from "react";
import "./App.css";
import Navbar from "components/Navbar";
import WritePage from "pages/Write";

function App() {
  return (
    <div className="App min-h-screen">
      <Navbar />
      <div>
        <WritePage />
      </div>
    </div>
  );
}

export default App;
