import{u as p}from"./useProp.afe31ed3.js";import{_ as h,d as f,B as n,J as x,o as a,b as i,K as s,a as t,I as b}from"./index.43eed5bc.js";const y={class:"dv-border-box-2"},$=["width","height"],m=["fill","points"],B=["stroke","points"],g=["stroke","points"],k=["fill"],w=["fill","cx"],z=["fill","cx","cy"],C=["fill","cy"],D=f({__name:"BorderBox",props:{component:null},setup(u){const _=u,{propValue:l}=p(_.component),e=n(150),o=n(150),v=r=>{const c=r[0].contentRect;e.value=c.width,o.value=c.height};return(r,d)=>{const c=b("resize");return x((a(),i("div",y,[(a(),i("svg",{class:"dv-border-svg-container",width:e.value,height:o.value},[s("polygon",{fill:t(l).base.backgroundColor,points:`
          7, 7 ${e.value-7}, 7 ${e.value-7}, ${o.value-7} 7, ${o.value-7}
        `},null,8,m),s("polyline",{stroke:t(l).base.color1,points:`2, 2 ${e.value-2} ,2 ${e.value-2}, ${o.value-2} 2, ${o.value-2} 2, 2`},null,8,B),s("polyline",{stroke:t(l).base.color2,points:`6, 6 ${e.value-6}, 6 ${e.value-6}, ${o.value-6} 6, ${o.value-6} 6, 6`},null,8,g),s("circle",{fill:t(l).base.color1,cx:"11",cy:"11",r:"1"},null,8,k),s("circle",{fill:t(l).base.color1,cx:e.value-11,cy:"11",r:"1"},null,8,w),s("circle",{fill:t(l).base.color1,cx:e.value-11,cy:o.value-11,r:"1"},null,8,z),s("circle",{fill:t(l).base.color1,cx:"11",cy:o.value-11,r:"1"},null,8,C)],8,$))])),[[c,v]])}}});var E=h(D,[["__scopeId","data-v-7518b734"]]);export{E as default};