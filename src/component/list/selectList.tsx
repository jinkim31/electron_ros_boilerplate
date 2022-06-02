import React, {useState} from "react";
import ReadoutElement from "../readout/readoutElement";
import './selectList.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {log10} from "chart.js/helpers";

interface Props{
    children: any
    onCheckChange: {(checkedIndexes:number[]): void;}
}

interface ElementProps{
    children:any,
    index:number,
    onChange: {(index:number, checked:boolean): void;}
}

function Element(props:ElementProps){

    const [checked, setChecked] = useState(false)

    return (
        <div className={'element_container'}>
            <input type="checkbox" checked={checked} onChange={(e) => {
                setChecked(!checked)
                props.onChange(props.index, e.target.checked)
            }}/>
            {props.children}
        </div>
    )
}
export default function SelectList(props:Props)
{
    const [indexes, setIndexes] = useState(new Set([]))

    return(
        <div className={'select_list_container'}>
            {React.Children.map(props.children, (child, i) =>
                <Element index={i} onChange={(i, checked) => {
                    const newIndexes = new Set(indexes)
                    if(checked) newIndexes.add(i)
                    else newIndexes.delete(i)
                    setIndexes(newIndexes)

                    props.onCheckChange(Array.from(newIndexes))
                }} children={child}/>
            )}
        </div>
    )
}