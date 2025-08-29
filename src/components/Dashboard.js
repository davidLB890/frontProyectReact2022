import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Transaccion from "./Transaccion"
import { guardarTransacciones } from "../features/transaccionesSlice"
import ListaTransacciones from "./ListaTransacciones"
import Inversiones from "./Inversiones"
import Grafica from "./Grafica"
import Grafica2 from "./Grafica2"
import Grafica3 from "./Grafica3"
import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Dashboard = () => {

  let usuarioId = localStorage.getItem('id');
  let usuarioKey = localStorage.getItem('apiKey');

  let navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('apiKey') === null) {
      navigate("/");
    } else {
      //Conseguimos las transacciones del usuario ingresado y las cargamos en el store
      fetch(`https://crypto.develotion.com/transacciones.php?idUsuario=${usuarioId}`, {
        method: "GET",
        headers: {
          "apikey": usuarioKey,
          "Content-Type": "application/json",
        }
      }).then(r => r.json())
        .then(datos => {
          //console.log(datos.transacciones);
          let transas = datos.transacciones
          dispatch(guardarTransacciones(transas))
        })

    }
  }, []);

  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
/*     <body> */
      <main className="container-fluid">

        <header className="row text-center">
          <h1>CRYPTO WEB</h1>
          <input type="button" value="logout" id="btnLogout" onClick={cerrarSesion}/>
        </header>

        <section className="row text-center">
          <Transaccion />
          <ListaTransacciones />
        </section>

        <section className="row text-center">
            <Inversiones />
        </section>

        <section className="row text-center">
          <Grafica/>
          {/* <article className="col-1"></article> */}
          <Grafica3/>
          <Grafica2/>
        </section>
        <footer></footer>

      </main>
/*     </body> */
      

  )
}

      export default Dashboard