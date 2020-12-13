import React from 'react';
import './Login.css';
import { login } from '../ApiRequest/ApiRequest';
import { parseJwt } from '../Utils/Functions';

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        rememberme: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(this.state.username, this.state.password, this.state.rememberme);
            console.log(response);
            await this.saveToken(response);
            this.props.history.push(`/users`);
        } catch (error) {
            console.log(error)
        }
    }

    saveToken = async ({ data: { id_token } }) => {
        const { cookies } = this.props;
        let parsedToken = parseJwt(id_token);
        cookies.set("token", id_token, {
            maxAge: parsedToken.exp,
        });
    };

    render() {
        return (

            <div>
                <div className="text-center">
                    <main className="form-signin">
                        <form>
                            <h1 className="h3 mb-3 fw-normal">Login</h1>
                            <label htmlFor="inputEmail" className="visually-hidden">Nombre de Usuario</label>
                            <input type="text" id="username" onChange={this.handleChange} value={this.state.username} className="form-control" placeholder="Nombre de Usuario" required autoFocus />
                            <label htmlFor="inputPassword" className="visually-hidden">Contraseña</label>
                            <input type="password" onChange={this.handleChange} id="password" value={this.state.password} className="form-control" placeholder="Contraseña" required />
                            <div className="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value={this.state.rememberme} onClick={() => this.setState({ rememberme: !this.state.rememberme })} /> Recordarme
                                        </label>
                            </div>
                            <button onClick={e => this.handleSubmit(e)} className="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
                        </form>
                    </main>
                </div>
            </div>

        );
    }
}

export default Login