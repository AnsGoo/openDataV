import{d as e,Q as r,u as t,o as a,v as s}from"./index-40170f2c.js";const p=e({__name:"index",setup(e){const{currentRoute:p,replace:n}=r(),{params:o,query:i}=t(p),{path:c,_redirect_type:d="path"}=o;Reflect.deleteProperty(o,"_redirect_type"),Reflect.deleteProperty(o,"path");const u=Array.isArray(c)?c.join("/"):c;return n("name"===d?{name:u,query:i,params:JSON.parse(o._origin_params??"{}")}:{path:u.startsWith("/")?u:"/"+u,query:i}),(e,r)=>(a(),s("div"))}});export{p as default};
