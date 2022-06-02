import React, {Component, Fragment} from 'react'
const Store = require('electron-store');
import '../../style/flexlayout.scss'
import * as FlexLayout from "flexlayout-react";
import {IJsonModel, Layout} from "flexlayout-react";
import './app.scss'
import RosView from "../rosView/rosView";

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
        layout: {
            type: "row",
            weight: 100,
            children: [
                {
                    type: "tabset",
                    weight: 30,
                    children: [
                        {
                            type: "tab",
                            name: "Electron-ROS Boilerplate",
                            component: "RosView",
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
    }

    private factory(node : any) {
        const component = node.getComponent();
        if (component === "RosView") {
            return (<RosView/>);
        }
    }

    public addPlot(id:number){
        this.layoutRef.current.addTabToTabSet( "PLOT", {type:"tab", component:'Plot '+id.toString(), name:'new plot'});
    }

    public render() {
        return (
            <div className={'app'}>
                <FlexLayout.Layout
                    ref={this.layoutRef}
                    model={this.state.model}
                    factory={this.factory.bind(this)}/>
            </div>
        );
    }
}