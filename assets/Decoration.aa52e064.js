import{u as P}from"./useProp.afe31ed3.js";import{d as S,A as n,C as k,E as z,o as p,b as m,F as B,r as E,L as I,P as x,_ as W}from"./index.a2bd6492.js";function $(c,f){return arguments.length===1?parseInt(String(Math.random()*c+1),10):parseInt(String(Math.random()*(f-c+1)+c),10)}const F={class:"dv-decoration-6"},G=["width","height"],H=["fill","x","y","width","height","index"],L=["values","dur"],N=["values","dur"],T=S({__name:"Decoration",props:{component:null},setup(c){const f=c,A=(a,s,t)=>{a==="base"&&s==="rectWidth"&&(_.value=t),a==="base"&&s==="space"&&(g.value=t),a==="base"&&s==="color1"&&(y.value[0]=t),a==="base"&&s==="color2"&&(y.value[1]=t),b()},{propValue:d}=P(f.component,A),h=n(300),o=n(35),C=a=>{const t=a[0].contentRect;h.value=t.width,o.value=t.height,b()},u=n(1),_=n(d.base.rectWidth||7),g=n(d.base.space||0),M=n([]),l=n([]),i=n([]),w=n([]),y=n([d.base.color1,d.base.color2]),b=()=>{const a=Math.round(h.value/(_.value+g.value)),s=h.value/(a+1),t=o.value/(u.value+1),r=new Array(u.value).fill(0).map((e,v)=>new Array(a).fill(0).map((V,D)=>[s*(D+1),t*(v+1)]));M.value=r.reduce((e,v)=>[...e,...v],[]),l.value=l.value=new Array(u.value*a).fill(0).map(()=>Math.random()>.8?$(.7*o.value,o.value):$(.2*o.value,.5*o.value)),i.value=new Array(u.value*a).fill(0).map((e,v)=>l.value[v]*Math.random()),w.value=new Array(u.value*a).fill(0).map(()=>Math.random()+1.5)};return k(()=>{b()}),(a,s)=>{const t=I("resize");return z((p(),m("div",F,[(p(),m("svg",{width:h.value,height:o.value},[(p(!0),m(B,null,E(M.value,(r,e)=>(p(),m("rect",{key:e,fill:y.value[Math.random()>.5?0:1],x:(_.value+g.value)*e,y:r[1]-l.value[e]/2,width:_.value,height:l.value[e],index:e},[x("animate",{attributeName:"y",values:`${r[1]-i.value[e]/2};${r[1]-l.value[e]/2};${r[1]-i.value[e]/2}`,dur:`${w.value[e]}s`,keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null,8,L),x("animate",{attributeName:"height",values:`${i.value[e]};${l.value[e]};${i.value[e]}`,dur:`${w.value[e]}s`,keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null,8,N)],8,H))),128))],8,G))])),[[t,C]])}}});const q=W(T,[["__scopeId","data-v-2d18674a"]]);export{q as default};
