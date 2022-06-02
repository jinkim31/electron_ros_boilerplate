import React, {useEffect} from "react";
import {Line} from 'react-chartjs-2'
import './plot.scss'
import {faFileExport, faGear} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'chartjs-adapter-moment'
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {log10} from "chart.js/helpers";
import {refreshPorts} from "../../store/commSlice";
import {addPlot} from "../../store/plotSlice";
import 'chartjs-adapter-luxon';
import 'chartjs-plugin-streaming';
import {store} from '../../store/store'

interface Props{
    id:number
}

export default function Plot(props:Props){

    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('adding plot')
        dispatch(addPlot(123))
    }, [])

    return(
        <div className={'plot'}>
            <div className={'controls'}>
                <label>{props.id}</label>
                <div style={{flexGrow: 1}}></div>
                <button className={'button_icon'}><FontAwesomeIcon icon={faGear}/></button>
                <button className={'button_icon'}><FontAwesomeIcon icon={faFileExport} /></button>
            </div>
            <div className={'line_container'}>
                <Line
                    datasetIdKey='id'
                    // data={useSelector((state: RootState) => state.plot.plots[props.id]).data}
                    data={{
                        datasets: [
                            {
                                label: 'label',
                                data: []
                            }
                        ]
                    }}
                    options={{
                        scales:{
                            x:{
                                type: 'realtime',
                                realtime: {
                                    refresh:100,
                                    onRefresh: chart => {
                                        chart.data.datasets.forEach(dataset=>{
                                            dataset.data.push({
                                                x: Date.now(),
                                                y: store.getState().plot.plots[props.id].data
                                            })
                                        })
                                    }
                                }
                            },
                            y:{
                                beginAtZero: true
                            }
                        },
                        plugins:{
                            legend:{
                                position: "bottom"
                            }
                        },
                        maintainAspectRatio: false,

                    }}
                />
            </div>
        </div>

    )
}