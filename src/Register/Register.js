import React from 'react';


export default class Register extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        login : "",
        fisrtName : "",
        lastName : "",
        email : ""
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleSubmit = () => {

    }

    render() {

        return (
            <div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" id="login" class="form-control" onChange={this.handleChange} value={this.state.login} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                </div>
                <div>
                    <span class="input-group-text" id="basic-addon1">@</span>
                    <input type="text" id="email" class="form-control" onChange={this.handleChange} value={this.state.login} placeholder="email" aria-label="email" aria-describedby="basic-addon1"></input>
                </div>
                <div class="input-group">
                    <span class="input-group-text">Nombre y Apellido</span>
                    <input id="firstName" onChange={this.handleChange} value={this.state.fisrtName} type="text" aria-label="First name" class="form-control"></input>
                    <input id="lastName" type="text" value={this.state.lastName} aria-label="Last name" class="form-control"></input>
                </div>
                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button class="btn btn-success me-md-2" type="button">Confirmar</button>
                    <button class="btn btn-primary" type="button">Volver</button>
                </div>
            </div>
        );
    }
}
