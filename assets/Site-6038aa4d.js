/* empty css                 */import{d as _,R as m,o as i,c as v,b as n,a as p,t as T,F as x,aw as S,u as s,p as y,m as w,_ as d,X as k,l as b,y as h,ax as I,cl as B,Q as u,z as r,ao as L,ap as g}from"./index-48fbbfb5.js";import{L as V,T as D}from"./ToolBar-3d650d56.js";import{N}from"./LayoutFooter-78085a0a.js";/* empty css                                                                */const $=_({__name:"ActionDetail",props:{icon:{},label:{}},setup(e){return(t,a)=>{const c=m("x-icon");return i(),v(x,null,[n(c,{name:t.icon,size:24},null,8,["name"]),p("span",null,T(t.label),1)],64)}}}),l=S(),R=()=>{l.setNavTheme(l.darkTheme?"dark":"light"),l.setDarkTheme(!l.darkTheme)},j=e=>(y("data-v-a642e6ae"),e=e(),w(),e),z=j(()=>p("span",{class:"title"},"OpenDataV",-1)),A=_({__name:"Logo",setup(e){return(t,a)=>(i(),v(x,null,[n(s(V),{width:"65px"}),z],64))}});const C=d(A,[["__scopeId","data-v-a642e6ae"]]),F=_({__name:"ThemeIcon",setup(e){const t=k("DarkTheme",b(()=>!0)),a=b(()=>t.value?"sun":"moon");return(c,f)=>{const o=m("x-icon");return i(),h(o,{name:a.value,size:24},null,8,["name"])}}}),G=_({__name:"Toolbar",emits:["change"],setup(e,{emit:t}){const a=I(),c=B[0].children.map(o=>({label:o.meta.title,action:async()=>{t("change","help"),await a.push({name:o.name})},icon:()=>u($,{icon:o.meta.icon,label:o.meta.title}),location:"left"})),f=[{label:"首页",action:async o=>{await a.push({name:"Pages"})},icon:()=>u(C),divider:!0,location:"left"},...c,{label:"GitHub",action:()=>{window.open("https://github.com/AnsGoo/openDataV","_blank")},icon:"github",location:"right"},{label:"主题",action:R,icon:()=>u(F),location:"right"}];return(o,M)=>(i(),h(s(D),{bars:f}))}});const O=d(G,[["__scopeId","data-v-8f54cd9c"]]),H=e=>(y("data-v-6b6f7c9c"),e=e(),w(),e),P=H(()=>p("div",{class:"copyleft"},[p("div",null,"OpenDataV · Made by AnsGoo")],-1)),E=_({__name:"Site",setup(e){return(t,a)=>{const c=m("RouterView");return i(),h(s(g),{position:"absolute"},{default:r(()=>[n(s(L),{style:{height:"60px"}},{default:r(()=>[n(s(O))]),_:1}),n(s(g),{"has-sider":"","sider-placement":"left",style:{height:"calc(99vh - 60px)",overflow:"hidden"}},{default:r(()=>[n(c),n(s(N),{position:"absolute"},{default:r(()=>[P]),_:1})]),_:1})]),_:1})}}});const K=d(E,[["__scopeId","data-v-6b6f7c9c"]]);export{K as default};
