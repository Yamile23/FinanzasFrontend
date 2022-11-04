import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";

const MovimientoCuenta = () => {
    const [ListaCuen, setListaCuen] = useState([]);
    const [DetalleCuen, setDetalleCuen] = useState([]);
    const [Cuenta, setCuenta] = useState('');

    useEffect(() => {
        obtenerCuenta();
    }, []);

    const obtenerCuenta = () => {
        axios.get('http://127.0.0.1:8000/api/ListaCuenta/')
            .then(response => {
                setListaCuen(response.data);
            }).catch(error => {
                console.log('error', error);
            });
    }
    const obtenerLista = (params) => {
        debugger;
        axios.post('http://127.0.0.1:8000/api/DetalleCuenta/', params)
            .then(response => {
                setDetalleCuen(response.data);
            }).catch(error => {
                console.log('error', error);
            });

    }
    const enviarDatos = () => {
        const params = {
            "cuenta": Cuenta,
        };
        obtenerLista(params);
    }
    return (
        <div>
            <h2>Extracto de Cuenta</h2>
            <div className="Filtro">
                                <select className="form-select" value={Cuenta} onChange={(e) => {
                                    setCuenta(e.currentTarget.value);
                                }}>
                                    <option value="" disabled>Cuenta</option>
                                    {ListaCuen.map(item2 =>
                                        <option key={item2.id} value={item2.id}>
                                            {item2.Nombre}
                                        </option>
                                    )}
                                </select>
                                <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                                    Filtrar
                                </button>
                            </div>
                            <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Extracto de Movimiento</Card.Title>
                        <Table striped bordered hover variant="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Categoria</th>
                                    <th>Monto</th>
                                    <th>Cuenta Origen</th>
                                    <th>Tipo</th>
                                    <th>Cuenta Origen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DetalleCuen.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.Concepto}</td>
                                        <td>{item.Monto}</td>
                                        <td>{item.Nombre}</td>
                                        <td>{item.Simbolo}</td>
                                        <td>{item.Destino}</td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
        </div>
    );
}
export default MovimientoCuenta;