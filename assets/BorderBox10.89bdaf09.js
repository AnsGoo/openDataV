import{_ as u}from"./index.395efaf1.js";import{d as v,r as s,u as h,O as r,X as i,Y as p,F as _,_ as g,R as f,a2 as x,a5 as $}from"./@vue.a2815691.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.6ffd8c7f.js";import"./date-fns.3c009aaa.js";import"./axios.744bc20e.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const b=["width","height"],y=["fill","points"],B=["width","height"],w=["fill"],z=v({__name:"BorderBox10",props:{propValue:null,componentId:null},setup(l){const e=s(150),t=s(150),c=s(["left-top","right-top","left-bottom","right-bottom"]),m=a=>{const o=a[0].contentRect;e.value=o.width,t.value=o.height};return(a,d)=>{const o=$("resize");return h((r(),i("div",{class:"dv-border-box-10",style:f(`box-shadow: inset 0 0 25px 3px ${l.propValue.colorLeft}`)},[(r(),i("svg",{class:"dv-border-svg-container",width:e.value,height:t.value},[p("polygon",{fill:l.propValue.backgroundColor,points:`
          4, 0 ${e.value-4}, 0 ${e.value}, 4 ${e.value}, ${t.value-4} ${e.value-4}, ${t.value}
          4, ${t.value} 0, ${t.value-4} 0, 4
        `},null,8,y)],8,b)),(r(!0),i(_,null,g(c.value,n=>(r(),i("svg",{width:e.value,height:t.value,key:n,class:x(`${n} dv-border-svg-container`)},[p("polygon",{fill:l.propValue.colorRight,points:"40, 0 5, 0 0, 5 0, 16 3, 19 3, 7 7, 3 35, 3"},null,8,w)],10,B))),128))],4)),[[o,m]])}}});var U=u(z,[["__scopeId","data-v-98c8882e"]]);export{U as default};