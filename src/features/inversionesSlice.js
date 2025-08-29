import {createSlice} from "@reduxjs/toolkit";

const initialState= {
    cuenta: 0
}

export const inversionesSlice = createSlice({
    name: "contador",
    initialState,
    reducers:{
        inversiones: (state, action) => {
            state.cuenta = action.payload;
        },
        incrementar: (state, action) => {
            state.cuenta += action.payload;
        }
    }
})

export const {inversiones, incrementar} = inversionesSlice.actions;
export default inversionesSlice.reducer;