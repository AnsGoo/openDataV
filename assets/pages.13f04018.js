var c=(t,s,a)=>new Promise((u,o)=>{var i=e=>{try{r(a.next(e))}catch(g){o(g)}},l=e=>{try{r(a.throw(e))}catch(g){o(g)}},r=e=>e.done?u(e.value):Promise.resolve(e.value).then(i,l);r((a=a.apply(t,s)).next())});import{a as n}from"./index.bba27490.js";import{v as p}from"./index.e04c72e0.js";const d=t=>c(void 0,null,function*(){return n.get({url:`/pages/${t}`})}),f=()=>c(void 0,null,function*(){return n.get({url:"/pages"})}),D=t=>{const s=p(t);return s.canvasData=JSON.stringify(s.canvasData),s.canvasStyle=JSON.stringify(s.canvasStyle),n.post({url:"pages",data:s})},P=(t,s)=>{const a=p(s);return a.canvasData=JSON.stringify(a.canvasData),a.canvasStyle=JSON.stringify(a.canvasStyle),n.put({url:`/pages/${t}`,data:a})},m=t=>n.delete({url:`/pages/${t}`});export{f as a,m as d,d as g,D as s,P as u};