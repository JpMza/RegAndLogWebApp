import React from 'react';
import { get, drop } from '../ApiRequest/ApiRequest';
import { NO_ACCESS } from './Constants';
export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.token = this.props.cookies.cookies.token;
    }

    state = {
        users: []
    }

    componentDidMount() {
        if (this.token) {
            this.getData();
        } else {
            return;
        }
    }

    getData = () => {
        get("/users", this.token).then(resp => {
            this.setState({ users: resp.data });
        }).catch(e => console.log(e))
    }

    handleDelete = (user) => {
        drop(`users/${user.login}`, this.token).then(_result => {
            this.getData();
        }).catch((e) => {
            console.log(e)
        })
    }


    render() {

        if (this.token) {
            return (
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <table className="table">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Apellido</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Usuario</th>
                                    <th scope="col">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.users && this.state.users.map((user, i) => (
                                    <tr key={i}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.login}</td>
                                        <td>
                                            <button onClick={() => this.props.history.push({ pathname: '/register', user: user })} className="btn btn-success mr-2 p-1" type="button">Editar</button>
                                            <button onClick={() => this.handleDelete(user)} className="btn btn-primary p-1" type="button">Eliminar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="alert alert-warning" role="alert">
                        {`${NO_ACCESS}`}
                    </div>
                </div>
            )
        }
    }
}
