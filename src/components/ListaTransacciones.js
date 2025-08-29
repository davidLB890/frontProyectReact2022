import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"


const ListaTransacciones = () => {

    const transaccionesState = useSelector(state => state.transacciones.transacciones);
    const monedasState = useSelector(state => state.monedas.monedas);
    const operacionesValidas =[{id:1, tipo:"Compra"}, {id:2, tipo:"Venta"}]

  return (
    <article className="col-6">
        {[...transaccionesState].reverse().map(trans => <p key = {trans.id}> 
        Moneda: {(monedasState.find(unaMoneda => unaMoneda.id === trans.moneda)).nombre},
        operación: {(operacionesValidas.find(opera => opera.id === trans.tipo_operacion)).tipo}, 
        cantidad: {trans.cantidad}, valor: {trans.valor_actual} </p>  )}
    </article>
  )
}

export default ListaTransacciones