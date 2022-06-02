import React from "react";
import Plugin from "./plugin";
import {useDispatch} from "react-redux";
import {addReadout, updateReadout} from "../../../store/readoutSlice";
import {updatePlot} from "../../../store/plotSlice";

interface Abstraction{
    name: string,
    analogIn: number[],
    digitalIn: boolean[],
    analogOut: number[],
    digitalOut: boolean[]
}

const initialAbstraction : Abstraction = {
    name: "",
    analogIn: [],
    digitalIn: [],
    analogOut: [],
    digitalOut: []
}

class Dh232 extends Plugin<Abstraction>{
    constructor() {
        super('dh232', initialAbstraction);
        this.abstraction.analogIn.push(1)
        setInterval(()=>{
            this.abstraction.analogIn[0]++
            this.invokeCallbacks()
        }, 1000)
    }

    public ReadoutMaker(): any {

        const dispatch = useDispatch()

        return (
            <div>
                <h2>dh232 ReadoutMaker</h2>
                <select>
                    <option>Analog</option>
                    <option>Digital</option>
                </select>
                <textarea></textarea>
                <button onClick={()=>{
                    const id = Date.now()
                    this.addReadCallback(abstraction => {
                        dispatch(updateReadout({plotId:id, value:abstraction.analogIn[0]}))
                        dispatch(updatePlot({readoutId:id, value:abstraction.analogIn[0]}))
                    })

                    dispatch(addReadout(id))
                }}>add</button>
            </div>
        )
    }

    protected processBytes(): any {
    }
}

export {Abstraction, Dh232}