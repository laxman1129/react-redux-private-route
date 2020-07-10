import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import css from "./App.module.css";
import Routes from "./shared/router/Routes";

function App() {
  return (
    <div className={css.container}>
      <Router>
        <div className={css.containt}>
          <Routes />
        </div>
      </Router>
    </div>
  );
}

export default App;
