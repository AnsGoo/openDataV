import{d as x,i as p,q as w,u as s,c as r,F as l,e as y,n as m,o,A as d,l as u,B,D as f,m as _,E,G,H as g,_ as I}from"./index.394616ab.js";import{S as M}from"./Shape.f45d993c.js";import"./useEventBus.5a4ae06c.js";const z={key:0,class:"group"},A=x({__name:"Group",props:{component:null},setup(c){const h=c,S=p(()=>a.isEditMode),a=w(),C=p(()=>a.curComponent),k=p(()=>{var n;let t=a.curComponent;for(;t;){if(((n=t.parent)==null?void 0:n.id)===h.component.id)return!0;t=t.parent}return!1}),i=t=>!(a.isEditMode&&t===!1),b=t=>{var n;return(n=t.groupStyle)!=null&&n.gheight?g(t.groupStyle,["gtop","gleft","gwidth","gheight","grotate"]):g(t.style,["top","left","width","height","rotate"])};return(t,n)=>s(S)?(o(),r("div",{key:1,class:m(["group",{dotted:s(k)}])},[(o(!0),r(l,null,y(c.component.subComponents,(e,v)=>(o(),r(l,{key:e.id},[i(e.display)?(o(),d(s(M),{key:0,id:"shape"+e.id,defaultStyle:e.style,style:u(b(e)),active:e.id===(s(C)||{}).id,info:e,class:m({lock:e.locked}),isInner:!0,index:v},{default:E(()=>[(o(),d(f(e.component),{class:"component",style:u(s(G)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):_("",!0)],64))),128))],2)):(o(),r("div",z,[(o(!0),r(l,null,y(c.component.subComponents,e=>(o(),r(l,{key:e.id},[i(e.display)?(o(),d(f(e.component),{key:0,class:"component",style:u(s(B)(e)),component:e,id:"component"+e.id},null,8,["style","component","id"])):_("",!0)],64))),128))]))}});const H=I(A,[["__scopeId","data-v-9bb4db95"]]);export{H as default};