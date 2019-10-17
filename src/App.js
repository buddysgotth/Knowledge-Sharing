import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import log from "loglevel";

import Home from "./Route/Home";
import Article from "./Route/Article";

log.setLevel("debug");

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/article">Article Details</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/article/" component={Article} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
