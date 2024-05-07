import{_ as a,n as e,A as l,O as p,t as r}from"./index-40170f2c.js";const o="BasicPieChart";class t extends a{constructor(a,p,r){super({component:o,group:e.PIE,name:p||"基础饼状图",id:a,width:520,height:260,icon:r,dataMode:l.UNIVERSAL})}_prop=[{label:"数据配置",prop:"data",children:[{prop:"upperLimit",label:"上限",type:p.NUMBER,props:{defaultValue:150}},{prop:"lowerLimit",label:"下限",type:p.NUMBER,props:{defaultValue:0}}]},{label:"图例",prop:"legend",children:[{prop:"isShow",label:"是否显示",type:p.SWITCH,props:{defaultValue:!0}}]},{label:"标签",prop:"label",children:[{prop:"isShow",label:"是否显示",type:p.SWITCH,props:{defaultValue:!0}},{prop:"labelColor",label:"文字颜色",type:p.COLOR,props:{defaultValue:"#00BAFF"}},{prop:"labelSize",label:"文字大小",type:p.NUMBER,props:{defaultValue:40}},{prop:"labelWeight",label:"文字宽度",type:p.FONT_WEIGHT,props:{defaultValue:400}}]},{label:"系列样式",prop:"series",children:[{prop:"radiusMin",label:"半径下限",type:p.NUMBER,props:{defaultValue:40,suffix:()=>r("span",{},"%")}},{prop:"radiusMax",label:"半径上限",type:p.NUMBER,props:{defaultValue:70,suffix:()=>r("span",{},"%")}},{prop:"borderRadius",label:"边框半径",type:p.NUMBER,props:{defaultValue:10}}]}];_style=[];get exampleData(){return[{label:"秦",value:Math.round(100*Math.random())},{label:"齐",value:Math.round(100*Math.random())},{label:"楚",value:Math.round(100*Math.random())},{label:"赵",value:Math.round(100*Math.random())},{label:"燕",value:Math.round(100*Math.random())},{label:"韩",value:Math.round(100*Math.random())},{label:"魏",value:Math.round(100*Math.random())}]}}export{o as componentName,t as default};
