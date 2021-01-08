import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { mountTo } from "../apps/users/dist/app.js";
import React, { useEffect } from "react";
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
            <M2mUsersApp></M2mUsersApp>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

const M2mUsersApp = () => {
  useEffect(() => {
    mountTo("users");
  }, []);

  return (
    <>
      <div id="users"></div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
