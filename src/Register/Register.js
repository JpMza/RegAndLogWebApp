import React from 'react';
import { register, put } from '../ApiRequest/ApiRequest.js';
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.token = props.cookies.cookies.token;
    }

    user = (this.props.history && this.props.history.location && this.props.history.location.user) ? this.props.history.location.user : undefined;

    state = {
        login: this.user ? this.user.login : "",
        firstName: this.user ? this.user.email : "",
        lastName: this.user ? this.user.lastName : "",
        email: this.user ? this.user.email : "",
        activated: true,
        authorities: ["ROLE_ADMIN"],
        createdBy: null,
        createdDate: new Date().toISOString(),
        id: this.user ? this.user.id : null,
        imageUrl: "",
        langKey: "es",
        lastModifiedBy: null,
        lastModifiedDate: null,
        lastModifiedDatePartner: null,
    }

    handleChange = (e) => {
        if (e.target.id === 'login') {
            this.setState({ [e.target.id]: e.target.value.trim() })
        } else {
            this.setState({ [e.target.id]: e.target.value })
        }
    }

    handleSubmit = async () => {
        if (this.user) {
            put("users", this.state, this.token)
                .then((response) => {
                    this.props.history.push("/users");
                })
                .catch((error) => console.log(error));
        } else {
            try {
                await register(this.state).then(resp => this.props.history.push('/login'));
            } catch (error) {
                console.log(error);
            }
        }
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Us</span>
                        <input type="text" id="login" className="form-control" onChange={this.handleChange} value={this.state.login} placeholder="Nombre de usuario" aria-label="Username" aria-describedby="basic-addon1"></input>
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} placeholder="Email" aria-label="email" aria-describedby="basic-addon1"></input>
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Nombre y Apellido</span>
                        <input id="firstName" onChange={this.handleChange} value={this.state.firstName} type="text" aria-label="Nombre" className="form-control"></input>
                        <input id="lastName" onChange={this.handleChange} type="text" value={this.state.lastName} aria-label="Apellido" className="form-control"></input>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <button onClick={this.handleSubmit} className="btn btn-success me-md-2 mr-3" type="button">Confirmar</button>
                        <button onClick={() => this.props.history.goBack()} className="btn btn-primary" type="button">Volver</button>
                    </div>
                </div>
            </div>
        );
    }
}
