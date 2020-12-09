import React from 'react';
import { post, register } from '../ApiRequest/ApiRequest.js';
export default class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        login: "",
        firstName: "",
        lastName: "",
        email: "",
        activated: true,
        authorities: ["ROLE_ADMIN"],
        createdBy: null,
        createdDate: new Date().toISOString(),
        id: null,
        imageUrl: "",
        langKey: "es",
        lastModifiedBy: null,
        lastModifiedDate: null,
        lastModifiedDatePartner: null,
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = async () => {
        try {
            await register(this.state).then(resp => console.log(resp));

        } catch (error) {
            console.log(error);
        }
    }

    render() {

        return (
            <div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" id="login" class="form-control" onChange={this.handleChange} value={this.state.login} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" id="email" class="form-control" onChange={this.handleChange} value={this.state.email} placeholder="email" aria-label="email" aria-describedby="basic-addon1"></input>
                </div>
                <div class="input-group">
                    <span class="input-group-text">Nombre y Apellido</span>
                    <input id="firstName" onChange={this.handleChange} value={this.state.firstName} type="text" aria-label="Nombre" class="form-control"></input>
                    <input id="lastName" onChange={this.handleChange} type="text" value={this.state.lastName} aria-label="Apellido" class="form-control"></input>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button onClick={this.handleSubmit} class="btn btn-success me-md-2" type="button">Confirmar</button>
                    <button class="btn btn-primary" type="button">Volver</button>
                    {/* <button onClick={() => console.log(this.state)} class="btn btn-primary" type="button">estado</button> */}
                </div>
            </div>
        );
    }
}
