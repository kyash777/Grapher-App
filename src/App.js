import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GraphPaperForm from "./components/GraphForm";
import GraphPaperDisplay from "./components/GraphDisplay";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GraphPaperForm />} />
        <Route path="/graph-paper" element={<GraphPaperDisplay />} />
      </Routes>
    </Router>
  );
};

export default App;



