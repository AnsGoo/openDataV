import{u as b}from"./useProp.afe31ed3.js";import{_ as m,d as g,B as i,y as $,J as y,o as d,b as c,K as t,a,T as k,U as x,I as w}from"./index.7ae9ab08.js";const p=s=>(k("data-v-77b16a65"),s=s(),x(),s),B={class:"dv-border-box-9"},I=["width","height"],C=["id"],N=p(()=>t("animate",{attributeName:"x1",values:"0%;100%;0%",dur:"10s",begin:"0s",repeatCount:"indefinite"},null,-1)),R=p(()=>t("animate",{attributeName:"x2",values:"100%;0%;100%",dur:"10s",begin:"0s",repeatCount:"indefinite"},null,-1)),L=["stop-color"],z=["values"],S=["stop-color"],D=["values"],V=["id"],E=["points"],G=["points"],H=["points"],J=["points"],K=["points"],P=["points"],T=["points"],U=["points"],j=["points"],q=["fill","points"],A=["width","height","fill","mask"],F=g({__name:"BorderBox",props:{component:null},setup(s){const _=s,{propValue:o}=b(_.component),e=i(150),l=i(150),n=i(`border-box-9-gradient-${$()}`),v=i(`border-box-9-mask-${$()}`),f=r=>{const u=r[0].contentRect;e.value=u.width,l.value=u.height};return(r,h)=>{const u=w("resize");return y((d(),c("div",B,[(d(),c("svg",{class:"dv-border-svg-container",width:e.value,height:l.value},[t("defs",null,[t("linearGradient",{id:n.value,x1:"0%",y1:"0%",x2:"100%",y2:"100%"},[N,R,t("stop",{offset:"0%","stop-color":a(o).base.colorLeft},[t("animate",{attributeName:"stop-color",values:`${a(o).base.colorLeft};${a(o).base.colorRight};${a(o).base.colorLeft}`,dur:"10s",begin:"0s",repeatCount:"indefinite"},null,8,z)],8,L),t("stop",{offset:"100%","stop-color":a(o).base.colorRight},[t("animate",{attributeName:"stop-color",values:`${a(o).base.colorRight};${a(o).base.colorLeft};${a(o).base.colorRight}`,dur:"10s",begin:"0s",repeatCount:"indefinite"},null,8,D)],8,S)],8,C),t("mask",{id:v.value},[t("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`8, ${l.value*.4} 8, 3, ${e.value*.4+7}, 3`},null,8,E),t("polyline",{fill:"#fff",points:`8, ${l.value*.15} 8, 3, ${e.value*.1+7}, 3
              ${e.value*.1}, 8 14, 8 14, ${l.value*.15-7}
            `},null,8,G),t("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`${e.value*.5}, 3 ${e.value-3}, 3, ${e.value-3}, ${l.value*.25}`},null,8,H),t("polyline",{fill:"#fff",points:`
              ${e.value*.52}, 3 ${e.value*.58}, 3
              ${e.value*.58-7}, 9 ${e.value*.52+7}, 9
            `},null,8,J),t("polyline",{fill:"#fff",points:`
              ${e.value*.9}, 3 ${e.value-3}, 3 ${e.value-3}, ${l.value*.1}
              ${e.value-9}, ${l.value*.1-7} ${e.value-9}, 9 ${e.value*.9+7}, 9
            `},null,8,K),t("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`8, ${l.value*.5} 8, ${l.value-3} ${e.value*.3+7}, ${l.value-3}`},null,8,P),t("polyline",{fill:"#fff",points:`
              8, ${l.value*.55} 8, ${l.value*.7}
              2, ${l.value*.7-7} 2, ${l.value*.55+7}
            `},null,8,T),t("polyline",{stroke:"#fff","stroke-width":"3",fill:"transparent",points:`${e.value*.35}, ${l.value-3} ${e.value-3}, ${l.value-3} ${e.value-3}, ${l.value*.35}`},null,8,U),t("polyline",{fill:"#fff",points:`
              ${e.value*.92}, ${l.value-3} ${e.value-3}, ${l.value-3} ${e.value-3}, ${l.value*.8}
              ${e.value-9}, ${l.value*.8+7} ${e.value-9}, ${l.value-9} ${e.value*.92+7}, ${l.value-9}
            `},null,8,j)],8,V)]),t("polygon",{fill:a(o).base.backgroundColor,points:`
          15, 9 ${e.value*.1+1}, 9 ${e.value*.1+4}, 6 ${e.value*.52+2}, 6
          ${e.value*.52+6}, 10 ${e.value*.58-7}, 10 ${e.value*.58-2}, 6
          ${e.value*.9+2}, 6 ${e.value*.9+6}, 10 ${e.value-10}, 10 ${e.value-10}, ${l.value*.1-6}
          ${e.value-6}, ${l.value*.1-1} ${e.value-6}, ${l.value*.8+1} ${e.value-10}, ${l.value*.8+6}
          ${e.value-10}, ${l.value-10} ${e.value*.92+7}, ${l.value-10}  ${e.value*.92+2}, ${l.value-6}
          11, ${l.value-6} 11, ${l.value*.15-2} 15, ${l.value*.15-7}
        `},null,8,q),t("rect",{x:"0",y:"0",width:e.value,height:l.value,fill:`url(#${n.value})`,mask:`url(#${v.value})`},null,8,A)],8,I))])),[[u,f]])}}});var Q=m(F,[["__scopeId","data-v-77b16a65"]]);export{Q as default};