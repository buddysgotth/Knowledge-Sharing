import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reboot from "styled-reboot";
import log from "loglevel";
import "bulma/css/bulma.min.css";

import Home from "./Route/Home";
import Article from "./Route/Article";
import AllArticles from "./Route/AllArticles";

const options = {
  fontFamilyBase:
    'Kanit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
};

const rebootCss = reboot(options);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Kanit:400,500,700&display=swap');
  ${rebootCss}
`;

log.setLevel("debug");

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/articles">Articles List</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/article/:id" component={Article} />
            <Route path="/articles/" component={AllArticles} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
