import{_ as h,c as _}from"./index.2fc0df38.js";import{p as m,r as n,c as g,a7 as y,P as b,y as p,B as o,u as t,H as V,al as j,am as x,x as d}from"./@vue.7df1a0ef.js";import"./@vueuse.fe63d129.js";import"./vue-router.e129948e.js";import"./pinia.685e9614.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./element-plus.54ccd689.js";import"./lodash.8679a684.js";import"./nprogress.5f640c6a.js";import"./async-validator.5d25c98b.js";import"./@popperjs.a8a4a6a0.js";import"./resize-observer-polyfill.8deb1e21.js";import"./lodash-es.4775bb8f.js";import"./dexie.c25c286a.js";import"./@icon-park.87123711.js";const s=i=>(j("data-v-7ba6faba"),i=i(),x(),i),k={class:"dv-border-box-11"},C=["width","height"],L=["id"],w=s(()=>o("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null,-1)),B=s(()=>o("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null,-1)),N=["flood-color"],z=s(()=>o("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null,-1)),S=s(()=>o("feMerge",null,[o("feMergeNode",{in:"softGlowColored"}),o("feMergeNode",{in:"SourceGraphic"})],-1)),I=["fill","points"],D=["stroke","filter","points"],G=["stroke","points"],M=["stroke","points"],R=["stroke","fill","filter","points"],W=["filter","fill","points"],H=s(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),A=[H],E=["filter","fill","points"],F=s(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),P=[F],q=["filter","fill","points"],J=s(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),K=[J],O=["filter","fill","points"],Q=s(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),T=[Q],U=["filter","fill","points"],X=s(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),Y=[X],Z=["filter","fill","points"],ee=s(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),le=[ee],te=["x","fill","font-size"],oe=["fill","filter","points"],ae=["fill","filter","points"],ie=m({props:{propValue:null,element:null},setup(i){const v=i,e=n(150),a=n(150),u=n(`border-box-11-filterId-${_()}`),f=c=>{const r=c[0].contentRect;e.value=r.width,a.value=r.height},l=g(()=>v.propValue.titleWidth?v.propValue.titleWidth:250);return(c,$)=>{const r=y("resize");return b((d(),p("div",k,[(d(),p("svg",{class:"dv-border-svg-container",width:e.value,height:a.value},[o("defs",null,[o("filter",{id:u.value,height:"150%",width:"150%",x:"-25%",y:"-25%"},[w,B,o("feFlood",{"flood-color":i.propValue.colorRight,result:"glowColor"},null,8,N),z,S],8,L)]),o("polygon",{fill:i.propValue.backgroundColor,points:`
          20, 32 ${e.value*.5-t(l)/2}, 32 ${e.value*.5-t(l)/2+20}, 53
          ${e.value*.5+t(l)/2-20}, 53 ${e.value*.5+t(l)/2}, 32
          ${e.value-20}, 32 ${e.value-8}, 48 ${e.value-8}, ${a.value-25} ${e.value-20}, ${a.value-8}
          20, ${a.value-8} 8, ${a.value-25} 8, 50
        `},null,8,I),o("polyline",{stroke:i.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          ${(e.value-t(l))/2}, 30
          20, 30 7, 50 7, ${50+(a.value-167)/2}
          13, ${55+(a.value-167)/2} 13, ${135+(a.value-167)/2}
          7, ${140+(a.value-167)/2} 7, ${a.value-27}
          20, ${a.value-7} ${e.value-20}, ${a.value-7} ${e.value-7}, ${a.value-27}
          ${e.value-7}, ${140+(a.value-167)/2} ${e.value-13}, ${135+(a.value-167)/2}
          ${e.value-13}, ${55+(a.value-167)/2} ${e.value-7}, ${50+(a.value-167)/2}
          ${e.value-7}, 50 ${e.value-20}, 30 ${(e.value+t(l))/2}, 30
          ${(e.value+t(l))/2-20}, 7 ${(e.value-t(l))/2+20}, 7
          ${(e.value-t(l))/2}, 30 ${(e.value-t(l))/2+20}, 52
          ${(e.value+t(l))/2-20}, 52 ${(e.value+t(l))/2}, 30
        `},null,8,D),o("polygon",{stroke:i.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value+t(l))/2-5}, 30 ${(e.value+t(l))/2-21}, 11
          ${(e.value+t(l))/2-27}, 11 ${(e.value+t(l))/2-8}, 34
        `},null,8,G),o("polygon",{stroke:i.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value-t(l))/2+5}, 30 ${(e.value-t(l))/2+22}, 49
          ${(e.value-t(l))/2+28}, 49 ${(e.value-t(l))/2+8}, 26
        `},null,8,M),o("polygon",{stroke:i.propValue.colorLeft,fill:i.propValue.colorRight,filter:`url(#${u.value})`,points:`
          ${(e.value+t(l))/2-11}, 37 ${(e.value+t(l))/2-32}, 11
          ${(e.value-t(l))/2+23}, 11 ${(e.value-t(l))/2+11}, 23
          ${(e.value-t(l))/2+33}, 49 ${(e.value+t(l))/2-22}, 49
        `},null,8,R),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"1",points:`
          ${(e.value-t(l))/2-10}, 37 ${(e.value-t(l))/2-31}, 37
          ${(e.value-t(l))/2-25}, 46 ${(e.value-t(l))/2-4}, 46
        `},A,8,W),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value-t(l))/2-40}, 37 ${(e.value-t(l))/2-61}, 37
          ${(e.value-t(l))/2-55}, 46 ${(e.value-t(l))/2-34}, 46
        `},P,8,E),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value-t(l))/2-70}, 37 ${(e.value-t(l))/2-91}, 37
          ${(e.value-t(l))/2-85}, 46 ${(e.value-t(l))/2-64}, 46
        `},K,8,q),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"1",points:`
          ${(e.value+t(l))/2+30}, 37 ${(e.value+t(l))/2+9}, 37
          ${(e.value+t(l))/2+3}, 46 ${(e.value+t(l))/2+24}, 46
        `},T,8,O),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value+t(l))/2+60}, 37 ${(e.value+t(l))/2+39}, 37
          ${(e.value+t(l))/2+33}, 46 ${(e.value+t(l))/2+54}, 46
        `},Y,8,U),o("polygon",{filter:`url(#${u.value})`,fill:i.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value+t(l))/2+90}, 37 ${(e.value+t(l))/2+69}, 37
          ${(e.value+t(l))/2+63}, 46 ${(e.value+t(l))/2+84}, 46
        `},le,8,Z),o("text",{class:"dv-border-box-11-title",x:`${e.value/2}`,y:"32",fill:i.propValue.titleColor||"#ffff","font-size":i.propValue.titleSize,"text-anchor":"middle","dominant-baseline":"middle"},V(i.propValue.title),9,te),o("polygon",{fill:i.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          7, ${53+(a.value-167)/2} 11, ${57+(a.value-167)/2}
          11, ${133+(a.value-167)/2} 7, ${137+(a.value-167)/2}
        `},null,8,oe),o("polygon",{fill:i.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          ${e.value-7}, ${53+(a.value-167)/2} ${e.value-11}, ${57+(a.value-167)/2}
          ${e.value-11}, ${133+(a.value-167)/2} ${e.value-7}, ${137+(a.value-167)/2}
        `},null,8,ae)],8,C))],512)),[[r,f]])}}});var Ve=h(ie,[["__scopeId","data-v-7ba6faba"]]);export{Ve as default};
