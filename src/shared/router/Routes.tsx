import React from "react";
import css from "./Routes.module.css";
import { Switch, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Login from "../../components/login/Login";
import Admin from "../../components/admin/Admin";
import User from "../../components/user/User";
import Home from "../../components/home/Home";
const Routes = () => (
  <div>
    <main className={css.container}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <PrivateRoute
          path="/admin"
          component={Admin}
          hasAnyAuthorities={["ROLE_ADMIN"]}
        />
        <PrivateRoute
          path="/user"
          component={User}
          hasAnyAuthorities={["ROLE_USER"]}
        />
        <Route path="/" component={Login} />
      </Switch>
    </main>
  </div>
);

export default Routes;
