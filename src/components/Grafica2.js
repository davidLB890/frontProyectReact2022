import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

const Grafica2 = () => {

    const transaccionesState = useSelector(state => state.transacciones.transacciones);
    const monedasState = useSelector(state => state.monedas.monedas)
    const [grafica, setGrafica] = useState([])

    useEffect(() => {
        let monedas = []
        
        monedasState.forEach(moneda => {
            let valorTotal = 0;

            let transVentas = (transaccionesState.filter(trans => trans.tipo_operacion === 2))
            let transMoneda = (transVentas.filter(trans => trans.moneda === moneda.id))

            transMoneda.forEach(trans => {valorTotal += trans.valor_actual* trans.cantidad})
            if(transMoneda.length !== 0){
                monedas.push({
                    nombre: moneda.nombre,
                    total: valorTotal
                })
            }
        })

        setGrafica(monedas)
    }, [transaccionesState]);

    
    const data = {
        labels: grafica.map(moneda => moneda.nombre),
        datasets: [
            {
                label: '# of Votes',
                data: grafica.map(moneda => moneda.total),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    return  (
        <article className="col-3" id="graf1">
            <h3>MONTOS DE VENTA</h3>
            <Pie data={data} />
        </article>
    );
}

export default Grafica2