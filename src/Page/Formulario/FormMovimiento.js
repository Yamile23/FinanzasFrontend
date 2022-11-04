import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const FormMovimiento = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [insert, setInsert] = useState(false);

    const [ListaMo, setListaMo] = useState([]);
    const [ListaCuen, setListaCuen] = useState([]);
    const [ListaCateg, setListaCateg] = useState([]);

    const [Tipo, setTipo] = useState('');
    const [categoria, setcategoria] = useState('');
    const [Monto, setMonto] = useState('');
    const [CuentaD, setCuentaD] = useState('');
    const [CuentaO, setCuentaO] = useState('');
    const [fecha, setfecha] = useState('');

    const [Nombre, setNombre] = useState('');
    const [Saldo, setSaldo] = useState('');
    const [SaldoD, setSaldoD] = useState('');


    useEffect(() => {
        obtenerMovimiento();
        obtenerCuenta();
        obtenerCategoria();
        fetchDatos(id)
    }, [id]);

    useEffect(() => {
        if (CuentaO)
            fetchCuenta(CuentaO)
        if (CuentaD)
            fetchCuenta(CuentaD, 3);
    }, [CuentaO, CuentaD]);



    const fetchDatos = (id) => {

        const url = 'http://127.0.0.1:8000/api/Movimiento/' + id;
        axios.get(url)
            .then((response) => {
                const ObjMovimiento = response.data;
                setfecha(ObjMovimiento.fecha);
                setMonto(ObjMovimiento.Monto);
                setCuentaO(ObjMovimiento.cuentaOrigen_id);
                setCuentaD(ObjMovimiento.cuentaDestino_id);
                setcategoria(ObjMovimiento.categoria_id);
                setTipo(ObjMovimiento.tipo_id);
                setInsert(false);

            }).catch(error => {
                setInsert(true);
                console.log('error', error);
            });
    }
    const obtenerMovimiento = () => {
        axios.get('http://127.0.0.1:8000/api/ListaTipo/')
            .then(response => {
                setListaMo(response.data);
            }).catch(error => {
                console.log('error', error);
            });
    }
    const obtenerCategoria = () => {
        axios.get('http://127.0.0.1:8000/api/ListaCategoria/')
            .then(response => {
                setListaCateg(response.data);
            }).catch(error => {
                console.log('error', error);
            });
    }
    const obtenerCuenta = () => {
        axios.get('http://127.0.0.1:8000/api/ListaCuenta/')
            .then(response => {
                setListaCuen(response.data);
            }).catch(error => {
                console.log('error', error);
            });
    }
    const fetchCuenta = (Cuenta, tipoTransaccion) => {

        const url = 'http://127.0.0.1:8000/api/Cuenta/' + Cuenta;
        axios.get(url)
            .then((response) => {
                const ObjCuenta = response.data;
                setNombre(ObjCuenta.Nombre);
                if (tipoTransaccion == 3)
                    setSaldoD(ObjCuenta.Saldo);
                else
                    setSaldo(ObjCuenta.Saldo);
            }).catch(error => {
                console.log('error', error);
            });
    }

    const enviarDatos = () => {
        if(CuentaD == CuentaO)
            return alert("La cuenta Origen no puede ser igual que la destino");
        debugger;
        const params = {

            "fecha": fecha,
            "Monto": Monto,
            "cuentaOrigen_id": CuentaO,
            "cuentaDestino_id": CuentaD,
            "categoria_id": categoria,
            "tipo_id": Tipo
        };
            if (insert === true) {
                Insertar(params);
            } else {
                Actualizar(params);
            }


            switch (Tipo) {
                case "1":
                    Ingreso(CuentaO);
                    break;
                case "2":
                    Salida(CuentaO);
                    break;
                case "3":
                    Salida(CuentaO);
                    Ingreso(CuentaD);
                    break;
            }

    }
    const Ingreso = (cuenta) => {
        var res = '';
        if (Tipo == '3') {
            res = Number(SaldoD) + Number(Monto);
        } else {
            res = Number(Saldo) + Number(Monto);
        }
        const paramsAux = {
            "Saldo": res
        };
        ActualizarCuenta(cuenta, paramsAux);
    }
    const Salida = (cuenta) => {
        var res = '';
        res = Number(Saldo) - Number(Monto);
        const paramsAux = {
            "Saldo": res
        };
        ActualizarCuenta(cuenta, paramsAux);
    }
    const Insertar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/registerMovimiento/';
        axios.post(url, params)
            .then(response => {
                navigate('/ListaMovimiento/');
            }).catch(error => {
                alert('Debe llenar todos los espacios');
                console.log(error);
            });
    }
    const Actualizar = (params) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/updateMovimiento/' + id;
        axios.put(url, params)
            .then(response => {
                navigate('/ListaMovimiento/');
            }).catch(error => {
                console.log(error);
            });
    }
    const ActualizarCuenta = (cuenta, paramsAux) => {
        //debugger;
        const url = 'http://127.0.0.1:8000/api/updateCuenta/' + cuenta;
        axios.put(url, paramsAux)
            .then(response => {
                //  navigate('/ListaCuenta/');
                console.log("hecho operacion")
            }).catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Row className="mt-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card className="mt-3">
                        <Card.Body>
                            <Card.Title>Agregar Movimientos</Card.Title>
                            <div><label>fecha:</label></div>
                            <div><input className="form-control" type="date" value={fecha} onChange={(e) => {
                                setfecha(e.target.value);
                            }} /></div>
                            <div><label>Tipo de Movimiento:</label></div>
                            <div>
                                <select className="form-select" value={Tipo} onChange={(e) => {
                                    setTipo(e.currentTarget.value);
                                }}>
                                    <option value="" disabled>Tipo Movimiento</option>
                                    {ListaMo.map(item1 =>
                                        <option key={item1.id} value={item1.id}>
                                            {item1.Nombre}
                                        </option>
                                    )}
                                </select>
                            </div>
                            {(Tipo === '1' || Tipo === '2') &&
                                <div className="Transf">
                                    <div><label>Categoria:</label></div>
                                    <div>
                                        <select className="form-select" value={categoria} onChange={(e) => {
                                            setcategoria(e.currentTarget.value);
                                        }}>
                                            <option value="" disabled>Categoria</option>
                                            {ListaCateg.map(item4 =>
                                                <option key={item4.id} value={item4.id}>
                                                    {item4.Concepto}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            }

                            <div><label>Cuenta Origen:</label></div>
                            <div>
                                <select className="form-select" value={CuentaO} onChange={(e) => {
                                    setCuentaO(e.currentTarget.value);
                                }}>
                                    <option value="" disabled>Cuenta</option>
                                    {ListaCuen.map(item2 =>
                                        <option key={item2.id} value={item2.id}>
                                            {item2.Nombre}
                                        </option>
                                    )}
                                </select>
                            </div>
                            {Tipo === '3' &&
                                <div className="Transf">
                                    <div><label>Cuenta Destino:</label></div>
                                    <div>
                                        <select className="form-select" value={CuentaD} onChange={(e) => {
                                            setCuentaD(e.currentTarget.value);
                                        }}>
                                            <option value="" disabled>Cuenta</option>
                                            {ListaCuen.map(item3 =>
                                                <option key={item3.id} value={item3.id}>
                                                    {item3.Nombre}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            }

                            <div><label>Monto:</label></div>
                            <div><input className="form-control" type="number" value={Monto} onChange={(e) => {
                                setMonto(e.target.value);
                            }} /></div>

                            <button className="btn btn-primary mt-3" onClick={enviarDatos}>
                                Guardar
                            </button>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
export default FormMovimiento;