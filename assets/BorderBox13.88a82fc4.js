import{_ as c}from"./index.395efaf1.js";import{d as u,r as s,u as m,O as l,X as n,Y as r,A as v,a5 as h}from"./@vue.a2815691.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.6ffd8c7f.js";import"./date-fns.3c009aaa.js";import"./axios.744bc20e.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const _={class:"dv-border-box-13"},L=["width","height"],f=["fill","stroke","d"],k=["stroke"],$=["stroke"],g=["stroke","d"],B={class:"border-box-content"},x=u({__name:"BorderBox13",props:{componentId:null,propValue:null},setup(o){const e=s(150),t=s(150),p=i=>{const a=i[0].contentRect;e.value=a.width,t.value=a.height};return(i,d)=>{const a=h("resize");return m((l(),n("div",_,[(l(),n("svg",{class:"dv-border-svg-container",width:e.value,height:t.value},[r("path",{fill:o.propValue.backgroundColor,stroke:o.propValue.colorLeft,d:`
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${e.value-20} 10 L ${e.value-5} 25
          L ${e.value-5} ${t.value-5} L 20 ${t.value-5}
          L 5 ${t.value-20} L 5 20
        `},null,8,f),r("path",{fill:"transparent","stroke-width":"3","stroke-linecap":"round","stroke-dasharray":"10 5",stroke:o.propValue.colorLeft,d:"M 16 9 L 61 9"},null,8,k),r("path",{fill:"transparent",stroke:o.propValue.colorRight,d:"M 5 20 L 5 10 L 12 3  L 60 3 L 68 10"},null,8,$),r("path",{fill:"transparent",stroke:o.propValue.colorRight,d:`M ${e.value-5} ${t.value-30} L ${e.value-5} ${t.value-5} L ${e.value-30} ${t.value-5}`},null,8,g)],8,L)),r("div",B,[v(i.$slots,"default",{},void 0,!0)])])),[[a,p]])}}});var Q=c(x,[["__scopeId","data-v-32ec3ab8"]]);export{Q as default};