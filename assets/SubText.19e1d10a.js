var i=(r,u,t)=>new Promise((n,o)=>{var l=e=>{try{a(t.next(e))}catch(s){o(s)}},c=e=>{try{a(t.throw(e))}catch(s){o(s)}},a=e=>e.done?n(e.value):Promise.resolve(e.value).then(l,c);a((t=t.apply(r,u)).next())});import{_,d,B as p,E as g,J as b,o as v,b as f,Y as x,L as m,a as h,A as y,I as N}from"./index.7ae9ab08.js";import{u as T}from"./useEventBus.fd7bcfd1.js";import{h as B}from"./index.3b194fea.js";import{u as D}from"./useProp.afe31ed3.js";const S=d({__name:"SubText",props:{componentId:null,component:null},setup(r){const u=r;y(a=>({f17ab540:o.value}));const{propValue:t}=D(u.component),n=p("0"),o=p("20px"),l=a=>{const e=a[0],{height:s}=e.contentRect;o.value=`${s}px`},c=a=>{const e=a;if(t.base.tagName&&e.TagName===t.base.tagName){const s=e.TagValue;n.value=s}};return g(()=>i(this,null,function*(){try{const a={tagName:t.base.tagName},e=yield B.get({url:t.base.url,params:a});e.status===200&&Object.keys(e.data).includes(t.base.tagName)&&c(e[t.base.tagName])}catch(a){console.log(a==null?void 0:a.message)}})),T("globalData",c),(a,e)=>{const s=N("resize");return b((v(),f("span",null,[x(m(n.value)+m(h(t).base.unit),1)])),[[s,l]])}}});var I=_(S,[["__scopeId","data-v-45da51b7"]]);export{I as default};