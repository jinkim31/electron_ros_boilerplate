import React, {Component, Fragment} from 'react'
const Store = require('electron-store');
import '../../style/flexlayout.scss'
import * as FlexLayout from "flexlayout-react";
import {IJsonModel, Layout} from "flexlayout-react";
import ConnectionView from "../connectionView/connectionView";
import Terminal from '../terminal/terminal'
import './app.scss'
import Plot from "../plot/plot";
import ReadoutView from "../readout/readoutView";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store";
import layoutSlice, {setGlobalApp} from "../../store/layoutSlice";

const store = new Store();
store.set('unicorn', '🦄');
console.log(store.get('unicorn'));

interface Props{

}

interface State{
    model:FlexLayout.Model
}

export default class App extends Component {

    private layout: IJsonModel = {
        global: {
            tabEnableClose: false,
            tabEnableFloat: true,
            splitterSize: 1,
            splitterExtra: 8,
            tabSetTabStripHeight: 24
        },
        borders: [
            {
                type: "border",
                location: "bottom",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Terminal",
                        component: "Terminal",
                    }
                ]
            },
            {
                type: "border",
                location: "left",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Devices",
                        component: "",
                    }
                ]
            },
            {
                type: "border",
                location: "right",
                selected: 0,
                children: [
                    {
                        type: "tab",
                        enableClose: false,
                        name: "Readouts",
                        component: "Readout",
                    }
                ]
            },
        ],
        layout: {
            type: "row",
            weight: 100,
            children: [
                {
                    type: "tabset",
                    id:'PLOT',
                    weight: 30,
                    children: [
                        {
                            type: "tab",
                            name: "Welcome",
                            component: "??",
                        }
                    ]
                },
            ]
        }
    };

    state:State={
        model:undefined
    }
    private layoutRef: React.RefObject<Layout>;

    public constructor(props : Props) {
        super(props);
        this.state = {model: FlexLayout.Model.fromJson(this.layout)}
        this.layoutRef = React.createRef();

        setGlobalApp(this)
    }

    private factory(node : any) {
        const component = node.getComponent();
        if (component === "Terminal") {
            return (<Terminal/>);
        }
        if (component === "ConnectionView") {
            return (<ConnectionView/>);
        }
        if (component.startsWith('Plot')) {
            // plot component string format: 'Plot <id>'
            const id = component.split(' ')[1]
            return (<Plot id={+id}/>);
        }
        if (component === "Readout") {
            return (<ReadoutView/>);
        }
    }

    public addPlot(id:number){
        this.layoutRef.current.addTabToTabSet( "PLOT", {type:"tab", component:'Plot '+id.toString(), name:'new plot'});
    }

    public render() {
        return (
            <div className={'app'}>
                <ConnectionView></ConnectionView>
                <FlexLayout.Layout
                    ref={this.layoutRef}
                    model={this.state.model}
                    factory={this.factory.bind(this)}/>
            </div>
        );
    }
}