import Plugin from "./plugin/plugin";
import {Dh232} from "./plugin/dh232";
import {Dh485} from "./plugin/dh485";

const plugins:Plugin<any>[] = [new Dh232(), new Dh485()]

function findPlugin(name:string){
    for(let i=0; i<plugins.length; i++){if(plugins[i].getName() === name){return plugins[i]}}
    console.error('plugin '+name+' not found!')
}

export default {findPlugin, plugins}