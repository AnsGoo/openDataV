var w=Object.defineProperty,S=Object.defineProperties;var b=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,E=Object.prototype.propertyIsEnumerable;var _=(n,a,e)=>a in n?w(n,a,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[a]=e,v=(n,a)=>{for(var e in a||(a={}))k.call(a,e)&&_(n,e,a[e]);if(p)for(var e of p(a))E.call(a,e)&&_(n,e,a[e]);return n},f=(n,a)=>S(n,b(a));var g=(n,a,e)=>new Promise((u,r)=>{var l=s=>{try{o(e.next(s))}catch(t){r(t)}},d=s=>{try{o(e.throw(s))}catch(t){r(t)}},o=s=>s.done?u(s.value):Promise.resolve(s.value).then(l,d);o((e=e.apply(n,a)).next())});import{C}from"./ComponentWrapper.e2578e22.js";import{g as x}from"./pages.2f00b808.js";import{d as z,A as y,c as D,k as P,Y as F,Z as A,C as B,N as I,$ as L,o as m,b as h,F as V,r as R,e as W,f as q,a as H,_ as M}from"./index.a2bd6492.js";import"./index.ca0023ed.js";const N=z({__name:"PageView",setup(n){const a=y([]),e=y({width:0,height:0,scale:0,image:""}),u=D(()=>{const t=f(v({},e.value),{backgroundImage:e.value.image,backgroundSize:"cover"});return P(t,["width","height","backgroundImage","backgroundSize"])}),r=F(),l=A(),d=t=>g(this,null,function*(){console.log("\u52A0\u8F7D\u901A\u7528\u7EC4\u4EF6");try{const c=yield x(t);o(c.data)}catch(c){l.push({name:"Error"})}}),o=t=>{t.canvasStyle&&(e.value=t.canvasStyle),t.canvasData&&(a.value=t.canvasData),s()};B(()=>g(this,null,function*(){yield d(r.params.index),window.addEventListener("resize",s)})),I(()=>{window.removeEventListener("resize",s)});const s=()=>{const t=document.querySelector(".screen");if(t){const c=e.value.width,i=e.value.height;L(t,c,i)}};return(t,c)=>(m(),h("div",{class:"bg",style:q(H(u))},[(m(!0),h(V,null,R(a.value,i=>(m(),W(C,{key:i.id,component:i},null,8,["component"]))),128))],4))}});const G=M(N,[["__scopeId","data-v-11baf4c1"]]);export{G as default};
