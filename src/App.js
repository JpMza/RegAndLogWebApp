import './App.css';
import React from 'react';
import { HashRouter, Route, Switch, Redirect, Link } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const Login = React.lazy(() => import("./Login/Login"));
const Register = React.lazy(() => import("./Register/Register"));
const User = React.lazy(() => import("./User/User"));
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
        <div className="app">
          <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registrarse</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Usuarios</Link>
                </li>
              </ul>
            </div>
          </nav>
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
              <Route exact path="/" name="Home" render={(props) => (
                <User cookies={this.cookies} {...props}></User>
              )}>
              </Route>
              <Redirect
                path="/"
                to={this.props.cookies.cookies.token ? "/" : "/login"}
              />
            </Switch>
          </React.Suspense>
        </div>
      </HashRouter>
    );
  }
}


export default withCookies(App);
