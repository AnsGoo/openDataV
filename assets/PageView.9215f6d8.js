var w=Object.defineProperty,S=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var g=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var v=(n,a,e)=>a in n?w(n,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[a]=e,_=(n,a)=>{for(var e in a||(a={}))b.call(a,e)&&v(n,e,a[e]);if(g)for(var e of g(a))E.call(a,e)&&v(n,e,a[e]);return n},y=(n,a)=>S(n,k(a));var p=(n,a,e)=>new Promise((u,c)=>{var l=s=>{try{o(e.next(s))}catch(t){c(t)}},m=s=>{try{o(e.throw(s))}catch(t){c(t)}},o=s=>s.done?u(s.value):Promise.resolve(s.value).then(l,m);o((e=e.apply(n,a)).next())});import{C}from"./ComponentWrapper.39964b7a.js";import{g as x}from"./pages.608008bc.js";import{_ as z,d as D,B as f,c as B,k as F,E as I,S as P,$ as L,o as d,b as h,F as V,r as A,e as R,f as U,a as W,a0 as q,a1 as H}from"./index.530c5dc4.js";import"./index.52c73ba8.js";const M=D({__name:"PageView",setup(n){const a=f([]),e=f({width:0,height:0,scale:0,image:""}),u=B(()=>{const t=y(_({},e.value),{backgroundImage:e.value.image,backgroundSize:"cover"});return F(t,["width","height","backgroundImage","backgroundSize"])}),c=q(),l=H(),m=t=>p(this,null,function*(){console.log("\u52A0\u8F7D\u901A\u7528\u7EC4\u4EF6");try{const r=yield x(t);o(r)}catch(r){l.push({name:"Error"})}}),o=t=>{t.canvasStyle&&(e.value=t.canvasStyle),t.canvasData&&(a.value=t.canvasData),s()};I(()=>p(this,null,function*(){yield m(c.params.index),window.addEventListener("resize",s)})),P(()=>{window.removeEventListener("resize",s)});const s=()=>{const t=document.querySelector(".screen");if(t){const r=e.value.width,i=e.value.height;L(t,r,i)}};return(t,r)=>(d(),h("div",{class:"bg",style:U(W(u))},[(d(!0),h(V,null,A(a.value,i=>(d(),R(C,{key:i.id,component:i},null,8,["component"]))),128))],4))}});var N=z(M,[["__scopeId","data-v-6212b44c"]]);export{N as default};