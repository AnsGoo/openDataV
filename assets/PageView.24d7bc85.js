var S=Object.defineProperty,E=Object.defineProperties;var D=Object.getOwnPropertyDescriptors;var v=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var j=(o,s,e)=>s in o?S(o,s,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[s]=e,b=(o,s)=>{for(var e in s||(s={}))x.call(s,e)&&j(o,e,s[e]);if(v)for(var e of v(s))W.call(s,e)&&j(o,e,s[e]);return o},h=(o,s)=>E(o,D(s));var g=(o,s,e)=>new Promise((a,p)=>{var d=n=>{try{i(e.next(n))}catch(u){p(u)}},m=n=>{try{i(e.throw(n))}catch(u){p(u)}},i=n=>n.done?a(n.value):Promise.resolve(n.value).then(d,m);i((e=e.apply(o,s)).next())});import{C}from"./ComponentWrapper.46ad7033.js";import{g as F}from"./pages.7ae502e8.js";import{a as A,u as z}from"./vue-router.32a64423.js";import{_ as B,f as I,p as L,e as P}from"./index.ef2789db.js";import{f as V,r as _,d as q,q as N,o as O,N as f,W as w,F as R,Z as U,O as G,Q as H,u as J}from"./@vue.f8650cf9.js";import"./index.1f44d164.js";import"./axios.19d3e859.js";import"./lodash-es.5f1bdab1.js";import"./pinia.30c42674.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.2edb364b.js";import"./date-fns.3ef01b04.js";import"./seemly.5d1c4af6.js";import"./vueuc.ebfd6ddc.js";import"./evtd.79485e8d.js";import"./@css-render.7ab96087.js";import"./vooks.ee7b0837.js";import"./vdirs.8ff5d312.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./async-validator.fb49d0f5.js";import"./dexie.78e6a997.js";import"./nprogress.5f640c6a.js";import"./@icon-park.f4b03c54.js";const M=V({setup(o){const s=[],e=_([]),a=_({width:0,height:0,scale:0,dataWs:"",image:"https://cdn.jsdelivr.net/gh/AnsGoo/openDataV@gh-pages/images/bg.jpg"}),p=q(()=>{const t=h(b({},a.value),{backgroundImage:a.value.image,backgroundSize:"cover"});return I(t,["width","height","backgroundImage","backgroundSize"])}),d=A(),m=z(),i=t=>g(this,null,function*(){console.log("\u52A0\u8F7D\u901A\u7528\u7EC4\u4EF6");try{const c=yield F(t);n(c)}catch(c){m.push({name:"Error"})}}),n=t=>{t.canvasStyle&&(a.value=t.canvasStyle),t.canvasData&&(e.value=t.canvasData),a.value.dataWs&&s.push(u("actual",a.value.dataWs)),l()};N(()=>g(this,null,function*(){yield i(d.params.index),window.addEventListener("resize",l)}));const u=(t,c)=>{const r=new WebSocket(c);return r.onopen=()=>{console.log("websocket\u8FDE\u63A5\u6210\u529F")},r.onclose=()=>{console.log("websocket\u8FDE\u63A5\u88AB\u5173\u95ED")},r.onmessage=y=>{const k=JSON.parse(y.data);P.emit(t,k)},r};O(()=>{s.forEach(t=>{console.log("\u5173\u95EDwebsocket"),t.close()}),window.removeEventListener("resize",l)});const l=()=>{const t=document.querySelector(".screen");if(t){const c=a.value.width,r=a.value.height;L(t,c,r)}};return(t,c)=>(f(),w("div",{class:"bg",style:H(J(p))},[(f(!0),w(R,null,U(e.value,r=>(f(),G(C,{key:r.id,component:r},null,8,["component"]))),128))],4))}});var we=B(M,[["__scopeId","data-v-093c6f54"]]);export{we as default};