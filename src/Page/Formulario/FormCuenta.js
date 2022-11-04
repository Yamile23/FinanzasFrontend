import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormCuenta =()=>{
    const { id } = useParams();
    const navigate = useNavigate();
    const [ setLista] = useState([]);
    const [Nombre, setNombre] = useState('');
    const [Saldo, setSaldo] = useState('0');
    const [insert, setInsert] = useState(false);

    useEffect(() => {
        fetchDatos(id);
    }, [id]);

    const fetchDatos = (id) => {

        const url = 'http://127.0.0.1:8000/api/Cuenta/'+id;
        axios.get(url)
            .then((response) => {
                const ObjCuenta = response.data;
                setNombre(ObjCuenta.Nombre);
                setSaldo(ObjCuenta.Saldo);
                
                setInsert(false);
                
            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }
    const enviarDatos = () => {
        const params = {
            "Nombre": Nombre,
            "Saldo": Saldo,
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
        const url = 'http://127.0.0.1:8000/api/registerCuenta/';
        axios.post(url, params)
            .then(response => {
                navigate('/ListaCuenta/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const Actualizar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/updateCuenta/' + id + "/";
        axios.put(url, params)
            .then(response => {
                navigate('/ListaCuenta/');
            }).catch(error => {
                console.log(error);
            });
    }
    return(
        <Row className="mt-3">
            <Col md={{ span: 6, offset: 3 }}>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>Crear Cuenta</Card.Title>
                        <div><label>Nombre:</label></div>
                        <div><input className="form-control" type="text" value={Nombre} onChange={(e) => {
                            setNombre(e.target.value);
                        }} /></div>
                        <div><label>Saldo:</label></div>
                        <div><input className="form-control" type="num" value={Saldo} disabled onChange={(e) => {
                            setSaldo(e.target.value);
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
export default FormCuenta;