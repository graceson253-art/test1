import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Jobs from "./Jobs";
import Details from "./Details";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Jobs/>} />
        <Route exact path="/details" element={<Details/>} />
      </Routes>
    </Router>
  );
}

export default App;
