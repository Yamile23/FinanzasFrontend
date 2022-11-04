import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ListaCuentas = () => {
    const [Lista, setLista] = useState([]);
    const [Saldo, setSaldo] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerLista();
        obtenerSaldo();
    });

    const obtenerLista = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/ListaCuenta/')
            .then(response => {
                setLista(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const obtenerSaldo = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/Saldototal/')
            .then(response => {
                setSaldo(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }

    const Destroy = (id) => {
        debugger;
        const confirmation = window.confirm('¿Estas seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        const url = 'http://127.0.0.1:8000/api/EliminarCuenta/' + id;
        axios.delete(url)
            .then((response) => {
                navigate('/ListaCuenta/');
            }).catch(error => {
                console.log('error', error);
            });
    }
    return (
        <div>
            {cargando === true && <h1>Cargando...</h1>}
            {cargando === false &&
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Lista de Cuentas <Link className="btn btn-primary" to={"/CrearCuenta/"}>Crear +</Link></Card.Title>
                        <Table striped bordered hover variant="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Saldo</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Lista.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.Nombre}</td>
                                        <td>{item.Saldo}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/EditarCuenta/" + item.id}>Editar</Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { Destroy(item.id) }}>Eliminar</button>
                                        </td>
                                    </tr>)}
                                    <tr>
                                        <td colSpan={2}><strong>Saldo Total :</strong></td>
                                        <td><strong>{Saldo}</strong></td>
                                    </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            }

        </div>
    );
}
export default ListaCuentas;