import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm/LoginForm";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <LoginForm />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;
