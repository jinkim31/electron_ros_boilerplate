import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {SerialPort} from "serialport";
import {log10} from "chart.js/helpers";
import {act} from "react-dom/test-utils";

export interface LogState {
    terminalLog: string,
}

const initialState: LogState = {
    terminalLog : 'initial str',
}

export const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        appendTerminalLog: (state, action) => {
            state.terminalLog += action.payload;
            console.log('terminal:' + state.terminalLog)
        },
    }
})

export const {appendTerminalLog} = logSlice.actions
export default logSlice.reducer