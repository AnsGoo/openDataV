import{u as D}from"./index-c01320d9.js";import{d as S,e as s,f as z,h as P,w as B,o as _,c as m,F as I,i as W,a as x,_ as E}from"./index-48fbbfb5.js";function k(c,f){return arguments.length===1?parseInt(String(Math.random()*c+1),10):parseInt(String(Math.random()*(f-c+1)+c),10)}const F={class:"dv-decoration-6"},G=["width","height"],H=["fill","x","y","width","height","index"],N=["values","dur"],T=["values","dur"],V=S({__name:"Decoration",props:{component:{}},setup(c){const f=c,$=(a,n)=>{if(a.length!==2)return;const[o,t]=a;o==="base"&&t==="rectWidth"&&(p.value=n),o==="base"&&t==="space"&&(g.value=n),o==="base"&&t==="color1"&&(y.value[0]=n),o==="base"&&t==="color2"&&(y.value[1]=n),b()},{propValue:d}=D(f.component,$),h=s(300),l=s(35),A=a=>{const n=a.contentRect;h.value=n.width,l.value=n.height,b()},u=s(1),p=s(d.base.rectWidth||7),g=s(d.base.space||0),M=s([]),r=s([]),i=s([]),w=s([]),y=s([d.base.color1,d.base.color2]),b=()=>{const a=Math.round(h.value/(p.value+g.value)),n=h.value/(a+1),o=l.value/(u.value+1),t=new Array(u.value).fill(0).map((e,v)=>new Array(a).fill(0).map((L,C)=>[n*(C+1),o*(v+1)]));M.value=t.reduce((e,v)=>[...e,...v],[]),r.value=r.value=new Array(u.value*a).fill(0).map(()=>Math.random()>.8?k(.7*l.value,l.value):k(.2*l.value,.5*l.value)),i.value=new Array(u.value*a).fill(0).map((e,v)=>r.value[v]*Math.random()),w.value=new Array(u.value*a).fill(0).map(()=>Math.random()+1.5)};return z(()=>{b()}),(a,n)=>{const o=P("resize");return B((_(),m("div",F,[(_(),m("svg",{width:h.value,height:l.value},[(_(!0),m(I,null,W(M.value,(t,e)=>(_(),m("rect",{key:e,fill:y.value[Math.random()>.5?0:1],x:(p.value+g.value)*e,y:t[1]-r.value[e]/2,width:p.value,height:r.value[e],index:e},[x("animate",{attributeName:"y",values:`${t[1]-i.value[e]/2};${t[1]-r.value[e]/2};${t[1]-i.value[e]/2}`,dur:`${w.value[e]}s`,keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null,8,N),x("animate",{attributeName:"height",values:`${i.value[e]};${r.value[e]};${i.value[e]}`,dur:`${w.value[e]}s`,keyTimes:"0;0.5;1",calcMode:"spline",keySplines:"0.42,0,0.58,1;0.42,0,0.58,1",begin:"0s",repeatCount:"indefinite"},null,8,T)],8,H))),128))],8,G))])),[[o,A]])}}});const q=E(V,[["__scopeId","data-v-937c421c"]]);export{q as default};
