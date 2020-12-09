import './App.css';
import React from 'react';
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const Login = React.lazy(() => import("./Login/Login"));
const Register = React.lazy(() => import("./Register/Register"));
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Cargando...</div>
);
class App extends React.Component {

  cookies = this.props.cookies;
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render() {
    return (
      <HashRouter >
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={(props) => (
              <Login cookies={this.cookies} {...props} ></Login>
            )} >
            </Route>
            <Route exact path="/register" name="Register" render={(props) => (
              <Register cookies={this.cookies} {...props}></Register>
            )}>
            </Route>
            <Route exact path="/" name="Home">

            </Route>
            <Redirect
              path="/"
              to={this.props.cookies.cookies.token ? "/" : "/login"}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default withCookies(App);
