import{_ as h,c as _}from"./index.ef2789db.js";import{f as m,r as n,d as b,a4 as g,G as y,N as c,W as p,X as o,u as t,Y as j,$ as V,a0 as x}from"./@vue.f8650cf9.js";import"./vue-router.32a64423.js";import"./pinia.30c42674.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.2edb364b.js";import"./date-fns.3ef01b04.js";import"./seemly.5d1c4af6.js";import"./vueuc.ebfd6ddc.js";import"./evtd.79485e8d.js";import"./@css-render.7ab96087.js";import"./vooks.ee7b0837.js";import"./vdirs.8ff5d312.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./nprogress.5f640c6a.js";import"./@icon-park.f4b03c54.js";const s=a=>(V("data-v-7a6bb5ac"),a=a(),x(),a),k={class:"dv-border-box-11"},C=["width","height"],L=["id"],w=s(()=>o("feMorphology",{operator:"dilate",radius:"2",in:"SourceAlpha",result:"thicken"},null,-1)),N=s(()=>o("feGaussianBlur",{in:"thicken",stdDeviation:"3",result:"blurred"},null,-1)),B=["flood-color"],I=s(()=>o("feComposite",{in:"glowColor",in2:"blurred",operator:"in",result:"softGlowColored"},null,-1)),S=s(()=>o("feMerge",null,[o("feMergeNode",{in:"softGlowColored"}),o("feMergeNode",{in:"SourceGraphic"})],-1)),z=["fill","points"],G=["stroke","filter","points"],D=["stroke","points"],M=["stroke","points"],W=["stroke","fill","filter","points"],R=["filter","fill","points"],A=s(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),E=[A],F=["filter","fill","points"],H=s(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),X=[H],Y=["filter","fill","points"],q=s(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),J=[q],K=["filter","fill","points"],O=s(()=>o("animate",{attributeName:"opacity",values:"1;0.7;1",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),P=[O],Q=["filter","fill","points"],T=s(()=>o("animate",{attributeName:"opacity",values:"0.7;0.4;0.7",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),U=[T],Z=["filter","fill","points"],ee=s(()=>o("animate",{attributeName:"opacity",values:"0.5;0.2;0.5",dur:"2s",begin:"0s",repeatCount:"indefinite"},null,-1)),le=[ee],te=["x","fill","font-size"],oe=["fill","filter","points"],ie=["fill","filter","points"],ae=m({props:{propValue:null,componentId:null},setup(a){const v=a,e=n(150),i=n(150),u=n(`border-box-11-filterId-${_()}`),f=d=>{const r=d[0].contentRect;e.value=r.width,i.value=r.height},l=b(()=>v.propValue.titleWidth?v.propValue.titleWidth:250);return(d,$)=>{const r=g("resize");return y((c(),p("div",k,[(c(),p("svg",{class:"dv-border-svg-container",width:e.value,height:i.value},[o("defs",null,[o("filter",{id:u.value,height:"150%",width:"150%",x:"-25%",y:"-25%"},[w,N,o("feFlood",{"flood-color":a.propValue.colorRight,result:"glowColor"},null,8,B),I,S],8,L)]),o("polygon",{fill:a.propValue.backgroundColor,points:`
          20, 32 ${e.value*.5-t(l)/2}, 32 ${e.value*.5-t(l)/2+20}, 53
          ${e.value*.5+t(l)/2-20}, 53 ${e.value*.5+t(l)/2}, 32
          ${e.value-20}, 32 ${e.value-8}, 48 ${e.value-8}, ${i.value-25} ${e.value-20}, ${i.value-8}
          20, ${i.value-8} 8, ${i.value-25} 8, 50
        `},null,8,z),o("polyline",{stroke:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
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
        `},null,8,G),o("polygon",{stroke:a.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value+t(l))/2-5}, 30 ${(e.value+t(l))/2-21}, 11
          ${(e.value+t(l))/2-27}, 11 ${(e.value+t(l))/2-8}, 34
        `},null,8,D),o("polygon",{stroke:a.propValue.colorLeft,fill:"transparent",points:`
          ${(e.value-t(l))/2+5}, 30 ${(e.value-t(l))/2+22}, 49
          ${(e.value-t(l))/2+28}, 49 ${(e.value-t(l))/2+8}, 26
        `},null,8,M),o("polygon",{stroke:a.propValue.colorLeft,fill:a.propValue.colorRight,filter:`url(#${u.value})`,points:`
          ${(e.value+t(l))/2-11}, 37 ${(e.value+t(l))/2-32}, 11
          ${(e.value-t(l))/2+23}, 11 ${(e.value-t(l))/2+11}, 23
          ${(e.value-t(l))/2+33}, 49 ${(e.value+t(l))/2-22}, 49
        `},null,8,W),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"1",points:`
          ${(e.value-t(l))/2-10}, 37 ${(e.value-t(l))/2-31}, 37
          ${(e.value-t(l))/2-25}, 46 ${(e.value-t(l))/2-4}, 46
        `},E,8,R),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value-t(l))/2-40}, 37 ${(e.value-t(l))/2-61}, 37
          ${(e.value-t(l))/2-55}, 46 ${(e.value-t(l))/2-34}, 46
        `},X,8,F),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value-t(l))/2-70}, 37 ${(e.value-t(l))/2-91}, 37
          ${(e.value-t(l))/2-85}, 46 ${(e.value-t(l))/2-64}, 46
        `},J,8,Y),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"1",points:`
          ${(e.value+t(l))/2+30}, 37 ${(e.value+t(l))/2+9}, 37
          ${(e.value+t(l))/2+3}, 46 ${(e.value+t(l))/2+24}, 46
        `},P,8,K),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.7",points:`
          ${(e.value+t(l))/2+60}, 37 ${(e.value+t(l))/2+39}, 37
          ${(e.value+t(l))/2+33}, 46 ${(e.value+t(l))/2+54}, 46
        `},U,8,Q),o("polygon",{filter:`url(#${u.value})`,fill:a.propValue.colorLeft,opacity:"0.5",points:`
          ${(e.value+t(l))/2+90}, 37 ${(e.value+t(l))/2+69}, 37
          ${(e.value+t(l))/2+63}, 46 ${(e.value+t(l))/2+84}, 46
        `},le,8,Z),o("text",{class:"dv-border-box-11-title",x:`${e.value/2}`,y:"32",fill:a.propValue.titleColor||"#ffff","font-size":a.propValue.titleSize,"text-anchor":"middle","dominant-baseline":"middle"},j(a.propValue.title),9,te),o("polygon",{fill:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          7, ${53+(i.value-167)/2} 11, ${57+(i.value-167)/2}
          11, ${133+(i.value-167)/2} 7, ${137+(i.value-167)/2}
        `},null,8,oe),o("polygon",{fill:a.propValue.colorLeft,filter:`url(#${u.value})`,points:`
          ${e.value-7}, ${53+(i.value-167)/2} ${e.value-11}, ${57+(i.value-167)/2}
          ${e.value-11}, ${133+(i.value-167)/2} ${e.value-7}, ${137+(i.value-167)/2}
        `},null,8,ie)],8,C))],512)),[[r,f]])}}});var Ne=h(ae,[["__scopeId","data-v-7a6bb5ac"]]);export{Ne as default};
