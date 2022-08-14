import{_ as h,e as _}from"./index.512f7100.js";import{d as m,r as s,k as g,a5 as y,u as b,O as c,X as d,Y as o,G as t,Z as V,a0 as x,a1 as k}from"./@vue.a2815691.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.3474528c.js";import"./date-fns.3c009aaa.js";import"./axios.744bc20e.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./lodash.f91bfcd2.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const r=a=>(x("data-v-7a6bb5ac"),a=a(),k(),a),C={class:"dv-border-box-11"},L=["width","height"],w=["id"],B=r(()=>o("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null,-1)),N=r(()=>o("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null,-1)),I=["flood-color"],S=r(()=>o("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null,-1)),z=r(()=>o("feMerge",null,[o("feMergeNode",{in:"softGlowColored"}),o("feMergeNode",{in:"SourceGraphic"})],-1)),G=["fill","points"],D=["stroke","filter","points"],M=["stroke","points"],R=["stroke","points"],W=["stroke","fill","filter","points"],A=["filter","fill","points"],E=r(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),F=[E],H=["filter","fill","points"],O=r(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),X=[O],Y=["filter","fill","points"],Z=r(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),j=[Z],q=["filter","fill","points"],J=r(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),K=[J],P=["filter","fill","points"],Q=r(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),T=[Q],U=["filter","fill","points"],ee=r(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),le=[ee],te=["x","fill","font-size"],oe=["fill","filter","points"],ie=["fill","filter","points"],ae=m({__name:"BorderBox11",props:{propValue:null,componentId:null},setup(a){const v=a,e=s(150),i=s(150),u=s(`border-box-11-filterId-${_()}`),$=p=>{const n=p[0].contentRect;e.value=n.width,i.value=n.height},l=g(()=>v.propValue.titleWidth?v.propValue.titleWidth:250);return(p,f)=>{const n=y("resize");return b((c(),d("div",C,[(c(),d("svg",{class:"dv-border-svg-container",width:e.value,height:i.value},[o("defs",null,[o("filter",{id:u.value,height:"150%",width:"150%",x:"-25%",y:"-25%"},[B,N,o("feFlood",{"flood-color":a.propValue.colorRight,result:"glowColor"},null,8,I),S,z],8,w)]),o("polygon",{fill:a.propValue.backgroundColor,points:`
          20, 32 ${e.value*.5-t(l)/2}, 32 ${e.value*.5-t(l)/2+20}, 53
          ${e.value*.5+t(l)/2-20}, 53 ${e.value*.5+t(l)/2}, 32
          ${e.value-20}, 32 ${e.value-8}, 48 ${e.value-8}, ${i.value-25} ${e.value-20}, ${i.value-8}
          20, ${i.value-8} 8, ${i.value-25} 8, 50
        `},null,8,G),o("polyline",{stroke:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          ${(e.value-t(l))/2}, 30
          20, 30 7, 50 7, ${50+(i.value-167)/2}
          13, ${55+(i.value-167)/2} 13, ${135+(i.value-167)/2}
          7, ${140+(i.value-167)/2} 7, ${i.value-27}
          20, ${i.value-7} ${e.value-20}, ${i.value-7} ${e.value-7}, ${i.value-27}
          ${e.value-7}, ${140+(i.value-167)/2} ${e.value-13}, ${135+(i.value-167)/2}
          ${e.value-13}, ${55+(i.value-167)/2} ${e.value-7}, ${50+(i.value-167)/2}
          ${e.value-7}, 50 ${e.value-20}, 30 ${(e.value+t(l))/2}, 30
          ${(e.value+t(l))/2-20}, 7 ${(e.value-t(l))/2+20}, 7
          ${(e.value-t(l))/2}, 30 ${(e.value-t(l))/2+20}, 52
          ${(e.value+t(l))/2-20}, 52 ${(e.value+t(l))/2}, 30
        `},null,8,D),o("polygon",{stroke:a.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value+t(l))/2-5}, 30 ${(e.value+t(l))/2-21}, 11
          ${(e.value+t(l))/2-27}, 11 ${(e.value+t(l))/2-8}, 34
        `},null,8,M),o("polygon",{stroke:a.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value-t(l))/2+5}, 30 ${(e.value-t(l))/2+22}, 49
          ${(e.value-t(l))/2+28}, 49 ${(e.value-t(l))/2+8}, 26
        `},null,8,R),o("polygon",{stroke:a.propValue.colorLeft,fill:a.propValue.colorRight,filter:`url(#${u.value})`,points:`
          ${(e.value+t(l))/2-11}, 37 ${(e.value+t(l))/2-32}, 11
          ${(e.value-t(l))/2+23}, 11 ${(e.value-t(l))/2+11}, 23
          ${(e.value-t(l))/2+33}, 49 ${(e.value+t(l))/2-22}, 49
        `},null,8,W),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"1",points:`
          ${(e.value-t(l))/2-10}, 37 ${(e.value-t(l))/2-31}, 37
          ${(e.value-t(l))/2-25}, 46 ${(e.value-t(l))/2-4}, 46
        `},F,8,A),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value-t(l))/2-40}, 37 ${(e.value-t(l))/2-61}, 37
          ${(e.value-t(l))/2-55}, 46 ${(e.value-t(l))/2-34}, 46
        `},X,8,H),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value-t(l))/2-70}, 37 ${(e.value-t(l))/2-91}, 37
          ${(e.value-t(l))/2-85}, 46 ${(e.value-t(l))/2-64}, 46
        `},j,8,Y),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"1",points:`
          ${(e.value+t(l))/2+30}, 37 ${(e.value+t(l))/2+9}, 37
          ${(e.value+t(l))/2+3}, 46 ${(e.value+t(l))/2+24}, 46
        `},K,8,q),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value+t(l))/2+60}, 37 ${(e.value+t(l))/2+39}, 37
          ${(e.value+t(l))/2+33}, 46 ${(e.value+t(l))/2+54}, 46
        `},T,8,P),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value+t(l))/2+90}, 37 ${(e.value+t(l))/2+69}, 37
          ${(e.value+t(l))/2+63}, 46 ${(e.value+t(l))/2+84}, 46
        `},le,8,U),o("text",{class:"dv-border-box-11-title",x:`${e.value/2}`,y:"32",fill:a.propValue.titleColor||"#ffff","font-size":a.propValue.titleSize,"text-anchor":"middle","dominant-baseline":"middle"},V(a.propValue.title),9,te),o("polygon",{fill:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          7, ${53+(i.value-167)/2} 11, ${57+(i.value-167)/2}
          11, ${133+(i.value-167)/2} 7, ${137+(i.value-167)/2}
        `},null,8,oe),o("polygon",{fill:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          ${e.value-7}, ${53+(i.value-167)/2} ${e.value-11}, ${57+(i.value-167)/2}
          ${e.value-11}, ${133+(i.value-167)/2} ${e.value-7}, ${137+(i.value-167)/2}
        `},null,8,ie)],8,L))])),[[n,$]])}}});var ze=h(ae,[["__scopeId","data-v-7a6bb5ac"]]);export{ze as default};
