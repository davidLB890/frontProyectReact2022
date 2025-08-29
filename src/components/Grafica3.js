import React, { useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const Grafica3 = () => {

    const coin = useRef(null)
    const monedasState = useSelector(state => state.monedas.monedas)
    const transaccionesState = useSelector(state => state.transacciones.transacciones);
    const [transMoneda, setTransMoneda] = useState([])
 
    const mostrarMoneda = () => {
        let trans = transaccionesState.filter(unaTransaccion => unaTransaccion.moneda == parseInt(coin.current.value))
        setTransMoneda(trans); 
        console.log(trans)
    }

    const select = < div >
        <select ref={coin} name="slcMonedas" id="monedasSlc" onChange={mostrarMoneda} >
            {monedasState.map(moneda => <option key={moneda.id} value={moneda.id}> {moneda.nombre}</option>)}
        </select>
    </div >
   
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const labels2 = transMoneda.map(unaTrans => unaTrans.valor_actual)
    
    const data = {
        labels: transMoneda.map((trans, i) => i), /* Horizontal */
        datasets: [
            {
                fill: true,
                label: 'MONEDAS',
                data: labels2, /* Vertical */
                borderColor: '#074b79',
                backgroundColor: 'rgba(53, 162, 235, 0.8)',
            },
        ],
    };


    return (
        <article className="col-5 m-4" id="graf1">
            <h3>VALORES DE MONEDA</h3>
            {select}
            <Line options={options} data={data} />
        </article>
    )

}

export default Grafica3