import "./apps/hello-world";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Hello, World</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <hello-world />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
