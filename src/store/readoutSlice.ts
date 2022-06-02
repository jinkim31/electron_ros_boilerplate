import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {act} from "react-dom/test-utils";

interface Readout{
    name:string,
    id:number,
    value:any,
    description:string
    setCallback: {(payload:SetCallbackPayload): void;}[]
}

interface SetCallbackPayload{
    id:number,
    value:number
}

interface Plot{

}

export interface ReadoutState {
    plugins:string[]
    selectedPlugin:string,
    readouts: { [id: number]: Readout; }
}

const initialState: ReadoutState = {
    plugins: [],
    selectedPlugin:CommManager.plugins[0].getName(),
    readouts:{}
}

export const readoutSlice = createSlice({
    name: 'readout',
    initialState,
    reducers: {
        setSelectedPlugin: (state, action) => {
            state.selectedPlugin = action.payload
        },
        refreshPlugin: (state)=>{
            state.plugins = []
            CommManager.plugins.forEach(plugin => state.plugins.push(plugin.getName()))
        },
        addReadout: (state,action)=>{
            const newReadout:Readout = {
                id: action.payload,
                description:'new readout',
                value:false,
                name:'new readout name',
                setCallback:[]
            }
            state.readouts[action.payload]=newReadout
        },
        updateReadout: (state,action)=>{
            state.readouts[action.payload.plotId].value = action.payload.value
        },
    }
})

export const {setSelectedPlugin, refreshPlugin, updateReadout, addReadout} = readoutSlice.actions
export default readoutSlice.reducer