import{_ as w,d as b,c as p,u as B,a as r,o,b as s,F as l,r as y,n as f,e as d,f as u,g as E,h as m,i as g,w as G,j as I,k as h}from"./index.e04c72e0.js";import{S as M}from"./Shape.c00136d1.js";import"./useEventBus.6ade5a91.js";const z={key:0,class:"group"},F=b({__name:"Group",props:{component:null},setup(c){const _=c,S=p(()=>a.isEditMode),a=B(),C=p(()=>a.curComponent),k=p(()=>{var n;let t=a.curComponent;for(;t;){if(((n=t.parent)==null?void 0:n.id)===_.component.id)return!0;t=t.parent}return!1}),i=t=>!(a.isEditMode&&t===!1),v=t=>{var n;return(n=t.groupStyle)!=null&&n.gheight?h(t.groupStyle,["gtop","gleft","gwidth","gheight","grotate"]):h(t.style,["top","left","width","height","rotate"])};return(t,n)=>r(S)?(o(),s("div",{key:1,class:f(["group",{dotted:r(k)}])},[(o(!0),s(l,null,y(c.component.subComponents,(e,x)=>(o(),s(l,{key:e.id},[i(e.display)?(o(),d(M,{key:0,id:"shape"+e.id,defaultStyle:e.style,style:u(v(e)),active:e.id===(r(C)||{}).id,info:e,class:f({lock:e.locked}),isInner:!0,index:x},{default:G(()=>[(o(),d(m(e.component),{class:"component",style:u(r(I)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):g("",!0)],64))),128))],2)):(o(),s("div",z,[(o(!0),s(l,null,y(c.component.subComponents,e=>(o(),s(l,{key:e.id},[i(e.display)?(o(),d(m(e.component),{key:0,class:"component",style:u(r(E)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"])):g("",!0)],64))),128))]))}});var L=w(F,[["__scopeId","data-v-c3af0942"]]);export{L as default};