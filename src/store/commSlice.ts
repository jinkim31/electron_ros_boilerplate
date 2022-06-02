import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {SerialPort} from "serialport";
import {log10} from "chart.js/helpers";
import {act} from "react-dom/test-utils";
import commManager from "../model/comm/commManager";

export interface CommState {
    ports: string[],
}

export const refreshPorts = createAsyncThunk(
    'users/fetchByIdStatus',
    async (userId, thunkAPI) => {
        const ports = SerialPort.list()
        return ports
    }
)

const initialState: CommState = {
    ports : []
}

export const commSlice = createSlice({
    name: 'comm',
    initialState,
    reducers: {
        addDh232Callback: (state) => {

        },
    },
    extraReducers: builder => {
        builder.addCase(refreshPorts.fulfilled, (state, action)=>{
            state.ports=[]
            action.payload.forEach((port)=>{state.ports.push(port.path)})
        })
    }
})

export const {addDh232Callback} = commSlice.actions
export default commSlice.reducer