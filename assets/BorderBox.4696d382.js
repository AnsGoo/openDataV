import{u as d}from"./useProp.afe31ed3.js";import{_ as h,d as f,B as r,J as $,o as c,b as a,K as t,a as s,I as k}from"./index.6dd09c59.js";const y={class:"dv-border-box-6"},b=["width","height"],x=["fill","points"],g=["fill"],L=["fill","cx"],m=["fill","cx","cy"],B=["fill","cy"],w=["stroke","points"],R=["stroke","points"],z=["stroke","points"],C=["stroke","points"],D=["stroke"],I=["stroke"],V=["stroke","points"],E=["stroke","points"],H=["stroke","points"],J=["stroke","points"],K=["stroke","points"],N=["stroke","points"],P=f({__name:"BorderBox",props:{component:null},setup(u){const _=u,{propValue:l}=d(_.component),e=r(150),o=r(150),p=i=>{const n=i[0].contentRect;e.value=n.width,o.value=n.height};return(i,v)=>{const n=k("resize");return $((c(),a("div",y,[(c(),a("svg",{class:"dv-border-svg-container",width:e.value,height:o.value},[t("polygon",{fill:s(l).base.backgroundColor,points:`
          9, 7 ${e.value-9}, 7 ${e.value-9}, ${o.value-7} 9, ${o.value-7}
        `},null,8,x),t("circle",{fill:s(l).base.colorRight,cx:"5",cy:"5",r:"2"},null,8,g),t("circle",{fill:s(l).base.colorRight,cx:e.value-5,cy:"5",r:"2"},null,8,L),t("circle",{fill:s(l).base.colorRight,cx:e.value-5,cy:o.value-5,r:"2"},null,8,m),t("circle",{fill:s(l).base.colorRight,cx:"5",cy:o.value-5,r:"2"},null,8,B),t("polyline",{stroke:s(l).base.colorLeft,points:`10, 4 ${e.value-10}, 4`},null,8,w),t("polyline",{stroke:s(l).base.colorLeft,points:`10, ${o.value-4} ${e.value-10}, ${o.value-4}`},null,8,R),t("polyline",{stroke:s(l).base.colorLeft,points:`5, 70 5, ${o.value-70}`},null,8,z),t("polyline",{stroke:s(l).base.colorLeft,points:`${e.value-5}, 70 ${e.value-5}, ${o.value-70}`},null,8,C),t("polyline",{stroke:s(l).base.colorLeft,points:"3, 10, 3, 50"},null,8,D),t("polyline",{stroke:s(l).base.colorLeft,points:"7, 30 7, 80"},null,8,I),t("polyline",{stroke:s(l).base.colorLeft,points:`${e.value-3}, 10 ${e.value-3}, 50`},null,8,V),t("polyline",{stroke:s(l).base.colorLeft,points:`${e.value-7}, 30 ${e.value-7}, 80`},null,8,E),t("polyline",{stroke:s(l).base.colorLeft,points:`3, ${o.value-10} 3, ${o.value-50}`},null,8,H),t("polyline",{stroke:s(l).base.colorLeft,points:`7, ${o.value-30} 7, ${o.value-80}`},null,8,J),t("polyline",{stroke:s(l).base.colorLeft,points:`${e.value-3}, ${o.value-10} ${e.value-3}, ${o.value-50}`},null,8,K),t("polyline",{stroke:s(l).base.colorLeft,points:`${e.value-7}, ${o.value-30} ${e.value-7}, ${o.value-80}`},null,8,N)],8,b))])),[[n,p]])}}});var A=h(P,[["__scopeId","data-v-39126166"]]);export{A as default};
