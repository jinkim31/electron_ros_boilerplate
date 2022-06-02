import React, {useEffect, useState} from "react";
import commManager from "../../model/comm/commManager";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {setSelectedPlugin} from "../../store/readoutSlice";
import CommManager from "../../model/comm/commManager";
import {refreshPorts} from "../../store/commSlice";

export default function ReadoutMaker()
{
    const dispatch = useDispatch();

    const selectedPlugin = useSelector((state: RootState) => state.readout.selectedPlugin)
    const plugins = useSelector((state: RootState) => state.readout.plugins)

    useEffect(()=>{
        dispatch(refreshPorts())
    }, [])

    return(
        <div>
            <h1>add readout</h1>
            <select onChange={(e)=>{dispatch(setSelectedPlugin(e.target.value))}} value={selectedPlugin}>
                {plugins.map((port, i) => (<option key={i} value={port}>{port}</option>))}
            </select>
            {CommManager.findPlugin(selectedPlugin).ReadoutMaker()}
        </div>
    )
}