import{u as y}from"./useProp.b9693bc0.js";import{d as L,A as n,y as c,c as d,E as B,o as $,b as m,P as e,a as s,L as w,Q as C,R as I,_ as z}from"./index.1dcaaf11.js";const k=r=>(C("data-v-87cf69a8"),r=r(),I(),r),D={class:"dv-border-box-8"},M=["width","height"],R=["id","d"],S=["id"],E=k(()=>e("stop",{offset:"0%","stop-color":"#fff","stop-opacity":"1"},null,-1)),N=k(()=>e("stop",{offset:"100%","stop-color":"#fff","stop-opacity":"0"},null,-1)),P=[E,N],V=["id"],A=["fill"],G=["dur","path"],H=["fill","points"],Q=["stroke","xlink:href"],j=["stroke","xlink:href","mask"],q=["from","to","dur"],F=L({__name:"BorderBox",props:{component:null},setup(r){const b=r,{propValue:a}=y(b.component),t=n(150),o=n(150),l=n(`border-box-8-path-${c()}`),u=n(`border-box-8-gradient-${c()}`),_=n(`border-box-8-mask-${c()}`),x=f=>{const i=f[0].contentRect;t.value=i.width,o.value=i.height},p=d(()=>a.base.dur?a.base.dur:3),h=d(()=>(t.value+o.value-5)*2),v=d(()=>a.base.reverse?`M 2.5, 2.5 L 2.5, ${o.value-2.5} L ${t.value-2.5}, ${o.value-2.5} L ${t.value-2.5}, 2.5 L 2.5, 2.5`:`M2.5, 2.5 L${t.value-2.5}, 2.5 L${t.value-2.5}, ${o.value-2.5} L2.5, ${o.value-2.5} L2.5, 2.5`);return(f,g)=>{const i=w("resize");return B(($(),m("div",D,[($(),m("svg",{class:"dv-border-svg-container",width:t.value,height:o.value},[e("defs",null,[e("path",{id:l.value,d:s(v),fill:"transparent"},null,8,R),e("radialGradient",{id:u.value,cx:"50%",cy:"50%",r:"50%"},P,8,S),e("mask",{id:_.value},[e("circle",{cx:"0",cy:"0",r:"150",fill:`url(#${u.value})`},[e("animateMotion",{dur:`${s(p)}s`,path:s(v),rotate:"auto",repeatCount:"indefinite"},null,8,G)],8,A)],8,V)]),e("polygon",{fill:s(a).base.backgroundColor,points:`5, 5 ${t.value-5}, 5 ${t.value-5} ${o.value-5} 5, ${o.value-5}`},null,8,H),e("use",{stroke:s(a).base.colorLeft,"stroke-width":"1","xlink:href":`#${l.value}`},null,8,Q),e("use",{stroke:s(a).base.colorRight,"stroke-width":"3","xlink:href":`#${l.value}`,mask:`url(#${_.value})`},[e("animate",{attributeName:"stroke-dasharray",from:`0, ${s(h)}`,to:`${s(h)}, 0`,dur:`${s(p)}s`,repeatCount:"indefinite"},null,8,q)],8,j)],8,M))])),[[i,x]])}}});const O=z(F,[["__scopeId","data-v-87cf69a8"]]);export{O as default};