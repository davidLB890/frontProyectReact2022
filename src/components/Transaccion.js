import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { guardarMonedas } from "../features/monedasSlice"
import { agregarTransaccion } from "../features/transaccionesSlice";


const Transaccion = () => {
    let usuarioKey = localStorage.getItem('apiKey');
    let usuarioId = localStorage.getItem('id');
    const operacion = useRef(null);
    const coin = useRef(null);
    const cantidad = useRef(null);
    const [reco, setReco] = useState("")

    const monedasState = useSelector(state => state.monedas.monedas)
    const transaccionesState = useSelector(state => state.transacciones.transacciones)

    const dispatch = useDispatch();

    useEffect(() => {
        //Conseguimos las monedas y las guardamos en el store
        fetch("https://crypto.develotion.com/monedas.php", {
            method: "GET",
            headers: {
                "apikey": usuarioKey, //localStorage.getItem('apiKey'),
                "Content-Type": "application/json"
            }
        })
            .then(r => r.json())
            .then(datos => {
                let listaMonedas = (datos.monedas);
                //console.log(listaMonedas);
                dispatch(guardarMonedas(listaMonedas));
            })

    }, []);

    const crearTransaccion = () => {
        let opera = parseInt(operacion.current.value);
        let coi = parseInt(coin.current.value);
        let canti = parseInt(cantidad.current.value);
        let actual = monedasState.find(unaMoneda => unaMoneda.id === coi).cotizacion

        fetch("https://crypto.develotion.com/transacciones.php", {
            method: "POST",
            headers: {
                "apikey": localStorage.getItem("apiKey"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "idUsuario": usuarioId, //localStorage.getItem("id"),
                "tipoOperacion": parseInt(opera),
                "moneda": coi,
                "cantidad": canti,
                "valorActual": actual
            })
        }).then(r => r.json())
            .then(datos => {
                console.log(datos);
                dispatch(agregarTransaccion({
                    cantidad: canti,
                    id: datos.idTransaccion,
                    moneda: coi,
                    tipo_operacion: opera,
                    usuarios_id: usuarioId,
                    valor_actual: actual
                }))
            })
    }

    const recomendacion = () => {
        let monedaElegida = parseInt(coin.current.value);
        let valorActualMoneda = (monedasState.find(unaMoneda => unaMoneda.id === monedaElegida)).cotizacion
        let valorUltimaCompra = transaccionesState.filter(trans => trans.moneda === monedaElegida)

        if (valorUltimaCompra !== undefined) {
            if (valorUltimaCompra.length > 1) {
                valorUltimaCompra = valorUltimaCompra.pop()
            }
        }

        if (valorUltimaCompra.length !== 0 && valorUltimaCompra !== undefined) {
            if (valorUltimaCompra.valor_actual > valorActualMoneda) {
                setReco("En este momento es recomendable comprar")
            } else if (valorUltimaCompra.valor_actual < valorActualMoneda) {
                setReco("En este momento es recomendable vender")
            } else setReco("")
        } else {
            setReco("")
        }
    }

    return (
        <article className="col-4">
            <h2>Transaccion</h2>

            <article className="classTrans" id="trans1"><label htmlFor="operaSlc">Seleccione operación</label>
                <select ref={operacion} name="slcOperacion" id="operaSlc">
                    <option value="1">Compra</option>
                    <option value="2">Venta</option>
                </select>
            </article>

            <article className="classTrans" id="trans2">
                <label htmlFor="monedasSlc">Seleccione cripto moneda</label>
                <select ref={coin} name="slcMonedas" id="monedasSlc" onChange={recomendacion}>
                    {monedasState.map(moneda => <option key={moneda.id} value={moneda.id}> {moneda.nombre} (${moneda.cotizacion})</option>)}
                </select>
                <br></br>
                <span>{reco}</span>
            </article>

            

            <input ref={cantidad} type="number" placeholder="Ingrese cantidad"></input>
            <div className="form-field">
                <input name='transaccion' className="btn" type="submit" value="Comprar" id="btnComprar" onClick={crearTransaccion} />
            </div>

        </article>
    )
}

export default Transaccion