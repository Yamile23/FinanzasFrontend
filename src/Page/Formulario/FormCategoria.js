import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormCategoria = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Lista,setLista] = useState([]);
    const [Tipo, setTipo] = useState('');
    const [Concepto, setConcepto] = useState('');
    const [insert, setInsert] = useState(false);

    const [ListaMo, setListaMo] = useState([]);

    useEffect(() => {
        fetchDatos(id);
    }, [id]);

    const fetchDatos = (id) => {

        const url = 'http://127.0.0.1:8000/api/Categoria/' + id;
        axios.get(url)
            .then((response) => {
                const ObjCategoria = response.data;
                setTipo(ObjCategoria.Tipo);
                setConcepto(ObjCategoria.Concepto);

                setInsert(false);

            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }
    
    const enviarDatos = () => {
        const params = {
            "Tipo": Tipo,
            "Concepto": Concepto,
        };
        debugger;
        if (insert === true) {
            Insertar(params);
        } else {
            Actualizar(params);

        }
    }
    const Insertar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/registerCategoria/';
        axios.post(url, params)
            .then(response => {
                navigate('/ListaCategoria/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const Actualizar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/updateCategoria/' + id + "/";
        axios.put(url, params)
            .then(response => {
                navigate('/ListaCategoria/');
            }).catch(error => {
                console.log(error);
            });
    }
    return (
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Crear Categoria</Card.Title>
                        <div><label>Tipo:</label></div>
                        <div>
                            <select className="form-select" value={Tipo} onChange={(e) => {
                                setTipo(e.currentTarget.value);
                            }}>
                                <option value="" disabled>Definir Tipo</option>
                                <option value="Ingreso">Ingreso</option>
                                <option value="Gasto">Gastos</option>
                            </select>
                        </div>
                        <div><label>Concepto:</label></div>
                        <div><input className="form-control" type="text" value={Concepto} onChange={(e) => {
                            setConcepto(e.target.value);
                        }} /></div>

                        <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                            Guardar
                        </button>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
export default FormCategoria;