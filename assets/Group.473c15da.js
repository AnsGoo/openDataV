import{d as x,i as l,q as w,u as s,c,F as p,e as i,n as y,o,B as d,l as u,E as B,G as m,H as E,I as G,m as I,J as f,_ as b}from"./index.785a8cd0.js";import{S as M}from"./Shape.ad988f48.js";import"./useEventBus.5afccbe5.js";const z={key:0,class:"group"},F=x({__name:"Group",props:{component:null},setup(a){const _=a,g=l(()=>r.isEditMode),r=w(),h=l(()=>r.curComponent),S=l(()=>{var n;let t=r.curComponent;for(;t;){if(((n=t.parent)==null?void 0:n.id)===_.component.id)return!0;t=t.parent}return!1}),C=t=>!(r.isEditMode&&t===!1),k=t=>{var n;return(n=t.groupStyle)!=null&&n.gheight?f(t.groupStyle,["gtop","gleft","gwidth","gheight","grotate"]):f(t.style,["top","left","width","height","rotate"])};return(t,n)=>s(g)?(o(),c("div",{key:1,class:y(["group",{dotted:s(S)}])},[(o(!0),c(p,null,i(a.component.subComponents,(e,v)=>(o(),c(p,{key:e.id},[C(e.display)?(o(),d(s(M),{key:0,id:"shape"+e.id,defaultStyle:e.style,style:u(k(e)),active:e.id===(s(h)||{}).id,info:e,class:y({lock:e.locked}),isInner:!0,index:v},{default:E(()=>[(o(),d(m(e.component),{class:"component",style:u(s(G)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):I("",!0)],64))),128))],2)):(o(),c("div",z,[(o(!0),c(p,null,i(a.component.subComponents,e=>(o(),d(m(e.component),{key:e.id,class:"component",style:u(s(B)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"]))),128))]))}});const H=b(F,[["__scopeId","data-v-2183c4e0"]]);export{H as default};
