import React from 'react';
import { post, register } from '../ApiRequest/ApiRequest.js';
export default class Register extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

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
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" id="login" className="form-control" onChange={this.handleChange} value={this.state.login} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">@</span>
                        <input type="text" id="email" className="form-control" onChange={this.handleChange} value={this.state.email} placeholder="email" aria-label="email" aria-describedby="basic-addon1"></input>
                    </div>
                    <div className="input-group">
                        <span className="input-group-text">Nombre y Apellido</span>
                        <input id="firstName" onChange={this.handleChange} value={this.state.firstName} type="text" aria-label="Nombre" className="form-control"></input>
                        <input id="lastName" onChange={this.handleChange} type="text" value={this.state.lastName} aria-label="Apellido" className="form-control"></input>
                    </div>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-3">
                        <button onClick={this.handleSubmit} className="btn btn-success me-md-2 mr-3" type="button">Confirmar</button>
                        <button className="btn btn-primary" type="button">Volver</button>
                        {/* <button onClick={() => console.log(this.state)} class="btn btn-primary" type="button">estado</button> */}
                    </div>
                </div>
            </div>
        );
    }
}
