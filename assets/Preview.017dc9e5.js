var f=Object.defineProperty,b=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,D=Object.prototype.propertyIsEnumerable;var p=(n,t,e)=>t in n?f(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,m=(n,t)=>{for(var e in t||(t={}))w.call(t,e)&&p(n,e,t[e]);if(d)for(var e of d(t))D.call(t,e)&&p(n,e,t[e]);return n},v=(n,t)=>b(n,k(t));var _=(n,t,e)=>new Promise((i,s)=>{var l=o=>{try{a(e.next(o))}catch(c){s(c)}},r=o=>{try{a(e.throw(o))}catch(c){s(c)}},a=o=>o.done?i(o.value):Promise.resolve(o.value).then(l,r);a((e=e.apply(n,t)).next())});import{C}from"./ComponentWrapper.183bdb60.js";import{d as z,bp as x,u as B,c as g,A as E,k as L,C as W,N as I,$ as P,o as u,b as S,F,r as O,e as q,a as h,f as A,_ as H}from"./index.3fe0a683.js";const M=z({__name:"Preview",setup(n){const t=x(),e=B(),i=g(()=>e.componentData),s=E({width:0,height:0,scale:0,image:"",color:"#084860"}),l=g(()=>{const a=v(m({},s.value),{backgroundImage:s.value.image,backgroundSize:"cover",backgroundColor:s.value.color||"#084860"});return L(a,["width","height","backgroundImage","backgroundSize","backgroundColor"])});W(()=>_(this,null,function*(){const a=yield t.latestRecord();a&&e.setLayoutData({canvasData:a.canvasData,canvasStyle:a.canvasStyle}),s.value=e.canvasStyleData,r(),window.addEventListener("resize",r)})),I(()=>{window.removeEventListener("resize",r)});const r=()=>{const a=document.querySelector(".screen");if(a){const o=s.value.width,c=s.value.height;P(a,o,c)}};return(a,o)=>(u(),S("div",{class:"bg",style:A(h(l))},[(u(!0),S(F,null,O(h(i),(c,y)=>(u(),q(C,{key:y,component:c},null,8,["component"]))),128))],4))}});const $=H(M,[["__scopeId","data-v-1c608135"]]);export{$ as default};