import{d as e,r as a,a7 as t,a8 as i,o as l,v as n,y as u,F as s,E as o,u as r,f as v,J as d,ag as h,ah as p,ab as m}from"./index-40170f2c.js";import{s as b}from"./index.esm-01328638.js";const g={class:"dv-decoration-1"},c=["width","height"],f=["fill","x","y","width","height"],y=["values","begin"],x=["fill","x","y","width","height"],L=["values"],S=["values"],w=["values"],$=["values"],N=["fill","x","y","height"],C=(e=>(h("data-v-99163f14"),e=e(),p(),e))((()=>v("animate",{attributeName:"width",values:"0;40;0",dur:"2s",repeatCount:"indefinite"},null,-1))),k=["values"],_=m(e({__name:"Decoration",props:{component:{}},setup(e){const h=e,{propValue:p}=b(h.component),m=a(200),_=a(60),M=a([200,50]),j=a([1,1]),A=a(4),z=a(20),D=a(Number(p.base.pointSideLength)/2),E=a([]),F=a([]),I=e=>{const a=e.contentRect;m.value=a.width,_.value=a.height,J()},J=()=>{R(),V(),q()},R=()=>{const[e,a]=M.value,t=e/(z.value+1),i=a/(A.value+1);let l=new Array(A.value).fill(0).map(((e,a)=>new Array(z.value).fill(0).map(((e,l)=>[t*(l+1),i*(a+1)]))));E.value=l.reduce(((e,a)=>[...e,...a]),[])},V=()=>{const e=E.value[2*z.value-1],a=E.value[2*z.value-3];F.value=[e,a]},q=()=>{const[e,a]=M.value;j.value=[m.value/e,_.value/a]};return(e,a)=>{const h=t("resize");return i((l(),n("div",g,[(l(),n("svg",{width:`${M.value[0]}px`,height:`${M.value[1]}px`,style:u(`transform:scale(${j.value[0]},${j.value[1]});`)},[(l(!0),n(s,null,o(E.value,((e,a)=>(l(),n(s,{key:a},[Math.random()>.6?(l(),n("rect",{key:a,fill:r(p).base.color1,x:e[0]-D.value,y:e[1]-D.value,width:r(p).base.pointSideLength,height:r(p).base.pointSideLength},[Math.random()>.6?(l(),n("animate",{key:0,attributeName:"fill",values:`${r(p).base.color1};transparent`,dur:"1s",begin:2*Math.random(),repeatCount:"indefinite"},null,8,y)):d("",!0)],8,f)):d("",!0)],64)))),128)),F.value[0]?(l(),n("rect",{key:0,fill:r(p).base.color2,x:F.value[0][0]-r(p).base.pointSideLength,y:F.value[0][1]-r(p).base.pointSideLength,width:2*r(p).base.pointSideLength,height:2*r(p).base.pointSideLength},[v("animate",{attributeName:"width",values:"0;"+2*r(p).base.pointSideLength,dur:"2s",repeatCount:"indefinite"},null,8,L),v("animate",{attributeName:"height",values:"0;"+2*r(p).base.pointSideLength,dur:"2s",repeatCount:"indefinite"},null,8,S),v("animate",{attributeName:"x",values:`${F.value[0][0]};${F.value[0][0]-r(p).base.pointSideLength}`,dur:"2s",repeatCount:"indefinite"},null,8,w),v("animate",{attributeName:"y",values:`${F.value[0][1]};${F.value[0][1]-r(p).base.pointSideLength}`,dur:"2s",repeatCount:"indefinite"},null,8,$)],8,x)):d("",!0),F.value[1]?(l(),n("rect",{key:1,fill:r(p).base.color2,x:F.value[1][0]-40,y:F.value[1][1]-r(p).base.pointSideLength,width:40,height:2*r(p).base.pointSideLength},[C,v("animate",{attributeName:"x",values:`${F.value[1][0]};${F.value[1][0]-40};${F.value[1][0]}`,dur:"2s",repeatCount:"indefinite"},null,8,k)],8,N)):d("",!0)],12,c))])),[[h,I]])}}}),[["__scopeId","data-v-99163f14"]]);export{_ as default};
