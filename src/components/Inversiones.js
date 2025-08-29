import { useSelector } from "react-redux";
import { inversiones } from "../features/inversionesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const Inversiones = () => {

    const dispatch = useDispatch();
    const inversioness = useSelector(state => state.contador.cuenta)
    const transaccionesState = useSelector(state => state.transacciones.transacciones);
   
    useEffect(() => {
        let total = 0
        let compras = transaccionesState.filter(unaTrans => unaTrans.tipo_operacion === 1)
        let ventas = transaccionesState.filter(unaTrans => unaTrans.tipo_operacion === 2)
        compras.forEach(trans => {
            total += trans.cantidad * trans.valor_actual
        });
        ventas.forEach(trans => {
            total -= trans.cantidad * trans.valor_actual
        });

        dispatch(inversiones(total))
    }, [transaccionesState]);
    
    /* console.log(transaccionesState); */
    return (
        <article className="col-12">
            <h4>INVERSIÓN ${inversioness}</h4>
        </article>
    )
}

export default Inversiones
