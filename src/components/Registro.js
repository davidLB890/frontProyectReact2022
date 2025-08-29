import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Registro = () => {

    const [error, setError] = useState("")
    const user = useRef(null);
    const password = useRef(null);
    const idDepto = useRef(null);
    const idCiudad = useRef(null);
    const [departamentos, setDepartamentos] = useState([]);
    const [ciudades, setCiudades] = useState([]);
    let navigate = useNavigate();
    /*   const [deptoId, setDeptoId] = useState = (0); */



    //OBTENGO TODOS LOS DEPARTAMENTOS AL INICIARSE
    useEffect(() => {
        fetch("https://crypto.develotion.com/departamentos.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"//,
            }
        }).then(r => r.json())
            .then(datos => {
                let departamentosApi = datos.departamentos;
                console.log(departamentos);
                setDepartamentos(departamentosApi);
                /* cargarSlcDptos(departamentos) */
                //departamentoId = datos.id;
            })
    }, [])



    //OBTENGO TODAS LAS CIUDADES AL INICIARSE
    useEffect(() => {
        fetch("https://crypto.develotion.com/ciudades.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"//,
            }
        }).then(r => r.json())
            .then(datos => {
                console.log(datos);

                //departamentoId = datos.id;
            })
    }, [])



    //CON ESTA FUNCIÓN OBTENGO LAS CIUDADES DEL DEPARTAMENTO ELEGIDO
    const obtenerCiudadesDelDpto = () => {
        let deparSlc = document.getElementById(`deparSlc`);
        let deparId = deparSlc.value;

        fetch(`https://crypto.develotion.com/ciudades.php?idDepartamento=${deparId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"//,
            }
        }).then(r => r.json())
            .then(datos => {
                let ciudadesDepto = datos.ciudades;
                setCiudades(ciudadesDepto); //al estar cambiando el estado de las ciudades se redibuja el select
                console.log(ciudades);
            })
    }



    //CON ESTA FUNCIÓN HAGO EL REGISTRO SEGÚN LOS DATOS BRINDADOS POR EL USUARIO
    const registroUsu = () => {
        let usuario = (user.current.value);
        let contra = (password.current.value);
        let departamento = (idDepto.current.value);
        let ciudad = (idCiudad.current.value);

        if (usuario.length < 5 || contra.length < 8) {
            setError('El usuario debe ser mayor a 5 y la contraseña mayor a 8 caracteres')
        } else if (departamento != "" && ciudad != "") {
            fetch("https://crypto.develotion.com/usuarios.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"//,
                },
                body: JSON.stringify({
                    "usuario": usuario,
                    "password": contra,
                    "idDepartamento": departamento,
                    "idCiudad": ciudad
                })
            }).then(r => r.json())
                .then(datos => {
                    if (datos.codigo === 409) {
                        console.log(datos.error);
                        setError(datos.mensaje)
                    } else {
                        console.log(datos);
                        let key = datos.apiKey
                        localStorage.setItem('apiKey', key);
                        localStorage.setItem('id', datos.id);
                        console.log(key)
                        navigate("/dashboard")
                    }
                })  
            } else {
                setError('Debe tener departamento y ciudad !')
            }

    }






    return (

        <div className="d-flex justify-content-center h-100">
            <div className="card">
                <div className="card-header">
                    <h3>Register</h3>
                </div>
                <div className="card-body">
                    <form>
                        <div className="input-group form-group">
                            <input ref={user} type="text" className="form-control" placeholder="Usuario" required />
                        </div>

                        <div className="input-group form-group">
                            <input ref={password} type="password" className="form-control" placeholder="Contraseña" required />
                        </div>

                        <div className="slc">
                            <select ref={idDepto} name="slcDepartamento" id="deparSlc" onChange={obtenerCiudadesDelDpto} required>
                                <option value="">Seleccione su departamento</option>
                                {departamentos.map(depto => <option key={depto.id} value={depto.id}> {depto.nombre} </option>)}
                            </select>
                        </div>

                        <div className="slc">

                            <select ref={idCiudad} name="slcCiudad" id="ciudSlc" required>
                                <option value="">Seleccione su ciudad</option>
                                {ciudades.map(ciudad => <option key={ciudad.id} value={ciudad.id}> {ciudad.nombre} </option>)}
                            </select>
                        </div>

                        <input id="login_btn" type="button" onClick={registroUsu} value="Registrarse" className="btn float-right login_btn" />

                    </form>
                    <span>{error}</span>
                </div>

                <div className="card-footer">

                    <div className="d-flex justify-content-center links">
                        Did you have account?<Link to="/">Ingresar</Link>
                    </div>

                </div>
            </div>
        </div>

    )

}

export default Registro