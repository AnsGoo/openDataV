import{d as I,k as s,r as m,e as z,O as C,X as h,Y as f,Z as B,a2 as k,R as $,G as l,a6 as g}from"./@vue.a2815691.js";import{_ as M,u as N,b as q}from"./index.395efaf1.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.6ffd8c7f.js";import"./date-fns.3c009aaa.js";import"./axios.744bc20e.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const w={class:"main"},G={class:"tooltiptext"},O=I({__name:"ControlButton",props:{componentId:null,propValue:null},setup(n){const t=n;g(e=>({"35572cd1":l(c),def8cda4:l(y),fee0de54:l(v),"70f740de":l(S)}));const d=N(),y=s(()=>t.propValue.fontColor);let c=m("none");d.isEditMode&&(c.value="1px red dashed");const v=s(()=>`${t.propValue.fontSize}px`),S=s(()=>`-${parseInt((Number(t.propValue.fontSize)/2).toString())}px`);z(()=>{i.value&&(t.propValue.displayStyle==="display"?a(i.value,!1):p(i.value,!1))});const i=s(()=>{const e=t.propValue.componentId;return d.isEditMode?document.querySelector(`#shape${e}`):document.querySelector(`#component${e}`)}),b=q("buttonGroup",e=>{const o=e.componmentId,u=t.propValue.componentId,x=t.propValue.displayStyle;i.value&&(x==="display"?o===u?a(i.value,!0):a(i.value,!1):o===u?p(i.value,!0):p(i.value,!1))});function _(){r.value=!0;const e=t.propValue.componentId;b({componmentId:e}),setTimeout(()=>r.value=!1,100)}const p=(e,o)=>{e.style.display="block",o?e.style.visibility!=="visible"&&(e.style.visibility="visible"):e.style.visibility!=="hidden"&&(e.style.visibility="hidden")},a=(e,o)=>{e.style.visibility="inherit",o?e.style.display!=="block"&&(e.style.display="block"):e.style.display!=="none"&&(e.style.display="none")},r=m(!1),V=s(()=>{const e={fontSize:`${t.propValue.fontSize}px`};return r.value&&(e.fontSize=`${Number(t.propValue.fontSize)+1}px`),e});return(e,o)=>(C(),h("div",w,[f("div",{class:k(["icon","iconfont",n.propValue.label,"tooltip"]),onClick:o[0]||(o[0]=u=>_()),style:$(l(V))},[f("span",G,B(n.propValue.tooltip),1)],6)]))}});var ae=M(O,[["__scopeId","data-v-e32d366c"]]);export{ae as default};
