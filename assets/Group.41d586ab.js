import{_ as k,u as x,g as b,c as v,f as m}from"./index.395efaf1.js";import{S as I}from"./Shape.30ccea4b.js";import{d as V,k as y,G as r,O as e,X as n,F as p,_ as f,P as i,R as d,W as g,$ as _,Q as $,a2 as w}from"./@vue.a2815691.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.6ffd8c7f.js";import"./date-fns.3c009aaa.js";import"./axios.744bc20e.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const B={key:0,class:"group"},G={key:1,class:"group"},E=V({__name:"Group",props:{componentId:null,subComponents:{default:()=>[]},index:null},setup(s){const h=y(()=>a.isEditMode),a=x(),C=y(()=>a.curComponent),u=t=>!(a.isEditMode&&t===!1),S=t=>{var l;return(l=t.groupStyle)!=null&&l.gheight?m(t.groupStyle,["gtop","gleft","gwidth","gheight","grotate"]):m(t.style,["top","left","width","height","rotate"])};return(t,l)=>r(h)?(e(),n("div",G,[(e(!0),n(p,null,f(s.subComponents,(o,c)=>(e(),n(p,{key:o.id},[u(o.display)?(e(),i(I,{key:0,id:"shape"+o.id,defaultStyle:o.style,style:d(S(o)),active:o.id===(r(C)||{}).id,info:o,index:`${s.index}-${c.toString()}`,class:w({lock:o.isLock}),isInner:!0},{default:$(()=>[(e(),i(g(o.component),{class:"component",style:d(r(v)(o)),propValue:o.propValue,componentId:o.id,id:"component"+o.id,subComponents:o.subComponents,index:`${s.index}-${c.toString()}`},null,8,["style","propValue","componentId","id","subComponents","index"]))]),_:2},1032,["id","defaultStyle","style","active","info","index","class"])):_("",!0)],64))),128))])):(e(),n("div",B,[(e(!0),n(p,null,f(s.subComponents,o=>(e(),n(p,{key:o.id},[u(o.display)?(e(),i(g(o.component),{key:0,class:"component",style:d(r(b)(o)),propValue:o.propValue,id:"component"+o.id,componentId:o.id,subComponents:o.subComponents},null,8,["style","propValue","id","componentId","subComponents"])):_("",!0)],64))),128))]))}});var so=k(E,[["__scopeId","data-v-3f4d4e8a"]]);export{so as default};