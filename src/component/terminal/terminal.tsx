import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import './terminal.scss'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

export default function ConnectionView() {
    const dispatch = useDispatch()

    useEffect(()=>{}, [])

    return (
        <div className={'terminal'}>
            <div className={'title'}>
                <label>Terminal</label>
            </div>
            <textarea className={'text_area'} value={useSelector((state: RootState) => state.log.terminalLog)} onChange={()=>{}}></textarea>
        </div>
);
}