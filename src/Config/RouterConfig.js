import React from "react";
import { Routes,Route } from "react-router-dom";
import FormCategoria from "../Page/Formulario/FormCategoria";
import FormCuenta from "../Page/Formulario/FormCuenta";
import FormMovimiento from "../Page/Formulario/FormMovimiento";
import ListaCategoria from "../Page/ListaRepor/ListaCategoria";
import ListaCuentas from "../Page/ListaRepor/ListaCuentas";
import MovimientoCuenta from "../Page/ListaRepor/MovimientoCuenta";
import MovimientoG from "../Page/ListaRepor/MovimientoG";

const RouterConfig =()=>{
return(
    <Routes>
        <Route path="/ListaCuenta/" element={<ListaCuentas/>}/>
        <Route path="/CrearCuenta/" element={<FormCuenta/>}/>
        <Route path="/EditarCuenta/:id" element={<FormCuenta/>}/>

        <Route path="/ListaCategoria/" element={<ListaCategoria/>}/>
        <Route path="/CrearCategoria/" element={<FormCategoria/>}/>
        <Route path="/EditarCategoria/:id" element={<FormCategoria/>}/>

        <Route path="/ListaMovimiento/" element={<MovimientoG/>}/>
        <Route path="/ExtractoCuenta/" element={<MovimientoCuenta/>}/>
        <Route path="/AgregarMovimiento/" element={<FormMovimiento/>}/>
        <Route path="/EditarMovimiento/:id" element={<FormMovimiento/>}/>
    </Routes>
);
}
export default RouterConfig;