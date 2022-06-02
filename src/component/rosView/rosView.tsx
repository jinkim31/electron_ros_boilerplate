import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import * as ROSLIB from 'roslib'

export default function RosView(){

    const ros = useRef(new ROSLIB.Ros({
        url : 'ws://localhost:9090'
    }))

    const [msg, setMsg] = useState({
        linear : {
            x : 0.0,
            y : 0.0,
            z : 0.0
        },
        angular : {
            x : 0.0,
            y : 0.0,
            z : 0.0
        }
    })

    useEffect(()=>{
        console.log('refreshing')

        ros.current.on('connection', function() {
            console.log('Connected to websocket server.');
        });

        ros.current.on('error', function(error:any) {
            console.log('Error connecting to websocket server: ', error);
        });

        ros.current.on('close', function() {
            console.log('Connection to websocket server closed.');
        });

        // Publishing a Topic
        // ------------------
    }, [])

    function publishTwist(){
        var cmdVel = new ROSLIB.Topic({
            ros : ros.current,
            name : '/cmd_vel',
            messageType : 'geometry_msgs/Twist'
        });

        var twist = new ROSLIB.Message(msg);
        cmdVel.publish(twist);
    }
    return(
        <div>
            <b>RosView</b>
            <br/>
            Linear<br/>
            X <input value={msg.linear.x} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, linear: {...prevState.linear, x: +e.target.value}}})
            }}/>
            Y <input value={msg.linear.y} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, linear: {...prevState.linear, y: +e.target.value}}})
            }}/>
            Z <input value={msg.linear.z} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, linear: {...prevState.linear, z: +e.target.value}}})
            }}/>
            <br/>
            Angular<br/>
            X <input value={msg.angular.x} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, angular: {...prevState.angular, x: +e.target.value}}})
            }}/>
            Y <input value={msg.angular.y} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, angular: {...prevState.angular, y: +e.target.value}}})
            }}/>
            Z <input value={msg.angular.z} onChange={(e)=> {
                setMsg(prevState => {return {...prevState, angular: {...prevState.angular, z: +e.target.value}}})
            }}/>
            <br/>
            <button onClick={publishTwist}>Publish</button>
        </div>
    )
}