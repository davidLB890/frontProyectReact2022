import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const Grafica = () => {


    const transaccionesState = useSelector(state => state.transacciones.transacciones);
    const monedasState = useSelector(state => state.monedas.monedas)
    const [grafica, setGrafica] = useState([])

    useEffect(() => {
        let monedas = []
        /*    monedasState.forEach(moneda => { monedas.push(moneda.nombre) }) */

        monedasState.forEach(moneda => {
            let valorTotal = 0;
            let transCompras = (transaccionesState.filter(trans => trans.tipo_operacion === 1))

            let transMoneda = (transCompras.filter(trans => trans.moneda === moneda.id))
            transMoneda.forEach(trans => {valorTotal += trans.valor_actual* trans.cantidad})
            monedas.push({
                nombre: moneda.nombre,
                total: valorTotal
            })
        })

        setGrafica(monedas)
    }, [transaccionesState]);
   

    /* console.log(transaccionesState.map(trans => trans.moneda)) */
    return (
        <article className="col-5 m-4" id="graf1">
            <h3>MONTOS DE COMPRA</h3>
            <Bar options={{
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                        title: {
                            display: true,
                            text: 'Chart.js Bar Chart',
                        },
                    },
                },
            }} data={{
                labels: grafica.map(moneda => moneda.nombre),
                datasets: [
                    {
                        label: 'TRANSACCIONES',
                        data: grafica.map(moneda => moneda.total),
                       /*  data: transaccionesState.map(moneda => moneda.total), */
                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                    },
                ],
            }} />
        </article>


        /*  }} data={{
            labels: pronostico.map((dia, i) => i),
            datasets: [
              {
                label: 'Dataset 1',
                data: pronostico.map(dia => dia.main.temp),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              }
            ],
          }} /> */
    )
}

export default Grafica