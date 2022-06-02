import React from "react";
import './readout.scss'

interface Props{
    name:string,
    value:any
}

export default function ReadoutElement(props : Props){
    return(
        <div className={'readout_element'}>
            <div className={'indicator_light'}></div>
            <div> {props.name} </div>
            <div> {props.value.toString()} </div>

        </div>
    )
}