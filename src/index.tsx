import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "../apps/users/dist/app.js";
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
          <li>
            <Link to="/users">m2m-users</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <>hello, world</>
          </Route>
          <Route path="/users">
            <m2m-users-app />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
