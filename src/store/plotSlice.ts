import {createAsyncThunk, createSlice, Draft, isFulfilled, PayloadAction} from '@reduxjs/toolkit'
import CommManager from "../model/comm/commManager";
import {act} from "react-dom/test-utils";
import {ChartData, ChartOptions} from "chart.js";

interface Plot {
    name: string,
    id: number,
    data: any,
    options: any
}

export interface PlotState {
    plots: { [id: number]: Plot; }
}

const initialState: PlotState = {
    plots: {}
}

export const plotSlice = createSlice({
    name: 'plot',
    initialState,
    reducers: {
        addPlot: (state, action) => {
            console.log('action payload:' + action.payload)
            const newPlot: Plot = {
                name: 'plotname',
                id: action.payload.id,
                data: {
                    datasets: [
                        {
                            readoutId: action.payload.readoutId,
                            label: action.payload.readoutId,
                            data: []
                        }
                    ]
                },
                options:{
                    animation: {
                        duration: 0 // general animation time
                    },
                    hover: {
                        animationDuration: 0 // duration of animations when hovering an item
                    },
                    responsiveAnimationDuration: 0,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'millisecond'
                            }
                        },
                        y: {
                            beginAtZero: true
                        }
                    },
                    plugins: {
                        legend: {
                            position: "bottom"
                        }
                    },
                    maintainAspectRatio: false,

                }
            }

            state.plots[action.payload.id] = newPlot
            console.log('plot ' + action.payload + ' added.')
        },

        updatePlot: (state, action) => {
            Object.values(state.plots).forEach((plot)=>{
                console.log('plot:' + plot)
                plot.data.datasets.forEach((dataset:any)=>{
                    console.log('datasetId:'+dataset.readoutId + ' readoutId:'+action.payload.readoutId)
                    if(dataset.readoutId===action.payload.readoutId){
                        dataset.data.push({x: '2020-3-10 23:39:'+action.payload.value, y: action.payload.value})
                    }
                })
            })

            // const index = state.plots.findIndex(
            //     (plot) => plot.id === action.payload.id
            // )
            // if (index == -1) {
            //     console.warn('plot with id ' + action.payload.id.toString() + 'seems to be removed.')
            // }
            //state.plots[index].value = action.payload.value
        },
    }
})

export const {addPlot, updatePlot} = plotSlice.actions
export default plotSlice.reducer