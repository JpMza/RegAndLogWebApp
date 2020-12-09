import React from 'react';

export default class Register extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    
    render() {

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
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>mdo@mdo.com</td>
                                <td>markotto</td>
                                <td>
                                    <button onClick={this.handleSubmit} className="btn btn-success mr-2 p-1" type="button">Editar</button>
                                    <button className="btn btn-primary p-1" type="button">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
