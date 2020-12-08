import React from 'react';
import './Login.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        login: "",
        password: ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    } 

    hangdleSubmit = () => {

    }

    render() {
        return (

            <div>
               <body class="text-center">
                   <button></button>
                    <main class="form-signin">
                        <form>
                            <h1 class="h3 mb-3 fw-normal">Login</h1>
                            <label for="inputEmail" class="visually-hidden">Nombre de Usuario</label>
                            <input type="email" id="login" class="form-control" placeholder="Email address" required autofocus />
                            <label for="inputPassword" class="visually-hidden">Contraseña</label>
                            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                            <div class="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                        </label>
                            </div>
                            <button onClick={this.hangdleSubmit} class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </form>
                    </main>
                </body>
            </div>
        );
    }
}

export default Login