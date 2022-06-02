import React, {Fragment, useEffect, useRef, useState} from "react";
import {Bar} from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'
import {SerialPort} from "serialport";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {refreshPorts} from "../../store/commSlice";
import {appendTerminalLog} from "../../store/logSlice";
import './connectionView.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {refreshPlugin} from "../../store/readoutSlice";
import {addPlotTab} from "../../store/layoutSlice";
import {addPlot} from "../../store/plotSlice";
// @ts-ignore
import * as ROSLIB from 'roslib'
Chart.register(...registerables)

export default function ConnectionView() {
    const [portList, setPortList] = useState([])
    const [selectedPort, setSelectedPort] = useState('')
    const dispatch = useDispatch()

    useEffect(()=>{
        console.log('refreshing')
        dispatch(refreshPorts())

        var ros = new ROSLIB.Ros({
            url : 'ws://localhost:9090'
        });

        ros.on('connection', function() {
            console.log('Connected to websocket server.');
        });

        ros.on('error', function(error:any) {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.on('close', function() {
            console.log('Connection to websocket server closed.');
        });

        // Publishing a Topic
        // ------------------

        var cmdVel = new ROSLIB.Topic({
            ros : ros,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        var twist = new ROSLIB.Message({
            linear : {
                x : 0.1,
                y : 0.2,
                z : 0.3
            },
            angular : {
                x : -0.1,
                y : -0.2,
                z : -0.3
            }
        });
        cmdVel.publish(twist);

    }, [])

    return (
        <div className={'connection_view'}>
            <button className={'button_icon'} onClick={()=>dispatch(refreshPorts())}><FontAwesomeIcon icon={faRotate} /></button>
            <select onChange={(e)=>{setSelectedPort(e.target.value)}} value={selectedPort}>
                {useSelector((state: RootState) => state.comm.ports).map((port, i) => (
                    <option key={i} value={port}>{port}</option>
                ))}
            </select>
        </div>
    );
}