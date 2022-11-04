import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const ListaCategoria = () => {
    const [Lista, setLista] = useState([]);
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerLista();
    },[]);

    const obtenerLista = () => {
        debugger;
        axios.get('http://127.0.0.1:8000/api/ListaCategoria/')
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
        const url = 'http://127.0.0.1:8000/api/EliminarCategoria/' + id ;
        axios.delete(url)
            .then((response) => {
                navigate('/ListaCategoria/');
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
                        <Card.Title>Lista de Categorias <Link className="btn btn-primary" to={"/CrearCategoria/"}>Crear +</Link></Card.Title>
                        <Table striped bordered hover variant="sm">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Tipo</th>
                                    <th>Concepto</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Lista.map(item =>
                                    <tr key={"item-" + item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.Tipo}</td>
                                        <td>{item.Concepto}</td>
                                        <td>
                                            <Link className="btn btn-primary" to={"/EditarCategoria/"+ item.id}>Editar</Link>
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
export default ListaCategoria;