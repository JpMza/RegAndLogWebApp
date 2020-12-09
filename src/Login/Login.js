import React from 'react';
import './Login.css';
import { login } from '../ApiRequest/ApiRequest';
import { parseJwt } from '../Utils/Functions';



class Login extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    state = {
        username: "",
        password: "",
        rememberme: false
    }

    handleChange = (e) => {
        console.log(this.props);
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(this.state.username, this.state.password, this.state.rememberme);
            console.log(response);
            await this.saveToken(response);
            
            this.props.history.push(`/register`);
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
        //cookies.set("role", parsedToken.auth);
    };

    render() {
        return (

            <div>
                <body class="text-center">
                    {/* <div>
                        <button>Registrarse</button>

                   </div> */}
                    <main class="form-signin">
                        <form>
                            <h1 class="h3 mb-3 fw-normal">Login</h1>
                            <label for="inputEmail" class="visually-hidden">Nombre de Usuario</label>
                            <input type="text" id="username" onChange={this.handleChange} value={this.state.username} class="form-control" placeholder="Nombre de Usuario" required autofocus />
                            <label for="inputPassword" class="visually-hidden">Contraseña</label>
                            <input type="password" onChange={this.handleChange} id="password" value={this.state.password} class="form-control" placeholder="Contraseña" required />
                            <div class="checkbox mb-3">
                                <label>
                                    <input type="checkbox" value={this.state.rememberme} onClick={() => this.setState({ rememberme: !this.state.rememberme })} /> Recordarme
                                        </label>
                            </div>
                            <button onClick={e => this.handleSubmit(e)} class="w-100 btn btn-lg btn-primary" type="submit">Iniciar Sesión</button>
                        </form>
                    </main>
                </body>
            </div>

        );
    }
}

export default Login