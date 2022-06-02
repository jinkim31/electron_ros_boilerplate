import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {SerialPort} from "serialport";
import {log10} from "chart.js/helpers";
import {act} from "react-dom/test-utils";
import commManager from "../model/comm/commManager";
import {IJsonModel, Layout, Actions, DockLocation} from "flexlayout-react";
import App from "../component/app/app";

let app:App = undefined

export function setGlobalApp(globalApp:App){
    console.log('app set!')
    app = globalApp
}

export interface LayoutStateState {
}

const initialState: LayoutStateState = {
}

export const commSlice = createSlice({
    name: 'layout',
    initialState,
    reducers: {
        addPlotTab: (state,action) => {
            app.addPlot(action.payload)
        },
    }
})

export const {addPlotTab} = commSlice.actions
export default commSlice.reducer