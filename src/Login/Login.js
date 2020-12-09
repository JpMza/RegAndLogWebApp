import React from 'react';
import './Login.css';

class Login extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

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
               <div className="text-center">
                    <main className="form-signin">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Login</h1>
                            <label htmlFor="inputEmail" className="visually-hidden">Nombre de Usuario</label>
                            <input type="email" id="login" className="form-control" placeholder="Email address" required />
                            <label htmlFor="inputPassword" className="visually-hidden">Contraseña</label>
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value="remember-me" /> Remember me
                                        </label>
                            </div>
                            <button onClick={this.hangdleSubmit} className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        </form>
                    </main>
                </div>
            </div>
        );
    }
}

export default Login