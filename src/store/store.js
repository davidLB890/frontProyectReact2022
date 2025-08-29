import { configureStore } from "@reduxjs/toolkit";
import monedasReducer from "../features/monedasSlice";
import transaccionReducer from "../features/transaccionesSlice"
import inversionesReducer from "../features/inversionesSlice"


export const store = configureStore({
    reducer: {
        monedas: monedasReducer,
        transacciones: transaccionReducer,
        contador: inversionesReducer
    }
})