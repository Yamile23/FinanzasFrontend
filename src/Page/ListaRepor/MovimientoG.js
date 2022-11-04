
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const MovimientoG = ()=>{

    const [Lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerLista();
    },[]);

    const obtenerLista = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/DetalleMovimiento/')
            .then(response => {
                setLista(response.data);
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
        const url = 'http://127.0.0.1:8000/api/EliminarMovimiento/' + id ;
        axios.delete(url)
            .then((response) => {
                navigate('/ListaMovimiento/');
            }).catch(error => {
                console.log('error', error);
            });
    }
    return(
        <div>
            {cargando === true && <h1>Cargando...</h1>}
            {cargando === false &&
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Extracto de Movimiento <Link className="btn btn-primary" to={"/AgregarMovimiento/"}>Crear +</Link></Card.Title>
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
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Lista.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.fecha}</td>
                                        <td>{item.Concepto}</td>
                                        <td>{item.Monto}</td>
                                        <td>{item.Nombre}</td>
                                        <td>{item.Simbolo}</td>
                                        <td>{item.Destino}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/EditarMovimiento/"+ item.id}>Editar</Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => { Destroy(item.id) }}>Eliminar</button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            }
        </div>
    );
}
export default MovimientoG;