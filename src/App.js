import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reboot from 'styled-reboot';
import log from 'loglevel';

import 'react-quill/dist/quill.snow.css';
import 'react-accessible-accordion/dist/fancy-example.css';
import 'bulma/css/bulma.min.css';
import './styles.css';

import NavigationBar from './Components/NavigationBar';
import Home from './Route/Home';
import Article from './Route/Article';
import AllArticles from './Route/AllArticles';
import CreateArticle from './Route/Create';
import EditArticle from './Route/Edit';
import Login from './Route/Login';
import Logout from './Route/Logout';
import Dashboard from './Route/Dashboard';

const options = {
  fontFamilyBase:
    'Sarabun ,Kanit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  linkHoverDecoration: 'none'
};

const rebootCss = reboot(options);

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Kanit:400,500,700|Sarabun:400,500,700&display=swap');
  ${rebootCss}
`;

log.setLevel('debug');

function App() {
  log.debug(process.env);
  return (
    <div className="App">
      <GlobalStyle />
      <Router>
        <div>
          <NavigationBar />
          <Switch>
            <Route path="/article/:id" component={Article} />
            <Route path="/articles/" component={AllArticles} />
            <Route path="/create/" component={CreateArticle} />
            <Route path="/edit/:id" component={EditArticle} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" exact component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
