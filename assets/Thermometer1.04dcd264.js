import{r as V,h as E}from"./echarts.dba42fd9.js";import{h as z}from"./index.44c3d648.js";import{u as A,b as S}from"./index.512f7100.js";import{t as I}from"./mydark.e6801489.js";import{d as v}from"./lodash-es.5f1bdab1.js";import{d as D,r as F,e as N,w as _,y as k,a5 as B,u as C,O,X as T}from"./@vue.a2815691.js";import{X as M}from"./zrender.0cec7a92.js";import"./tslib.60310f1a.js";import"./axios.744bc20e.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.3474528c.js";import"./date-fns.3c009aaa.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./dexie.78e6a997.js";import"./lodash.f91bfcd2.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const xe=D({__name:"Thermometer1",props:{componentId:null,propValue:null},setup(c){const r=c;V("mydark",I);const d=A(),u=F(null);let o=null,s=100,f,n=[];const x=t=>{const e=t;r.propValue.datatag&&e.TagName===r.propValue.datatag&&(s=Number(e.TagValue),p())};N(()=>{b(),clearInterval(f),w()}),S("actual",x);const h=()=>{n=[];const t=Number(r.propValue.maxValue||100),e=Number(r.propValue.splitNumber||10);for(let a=0,l=t;a<=l;a++)(a-e)%e===0?n.push("-3"):(a-e)%(e/2)===0?n.push("-1"):n.push("")},y=t=>{const e=Number(r.propValue.maxValue||100),a=e/3,l=e/3*2;let i=[];return t>a?i.push({offset:0,color:"#93FE94"},{offset:.5,color:"#E4D225"},{offset:1,color:"#E01F28"}):t>l?i.push({offset:0,color:"#93FE94"},{offset:1,color:"#E4D225"}):i.push({offset:1,color:"#93FE94"}),i};function b(){const t=Number(r.propValue.maxValue||100);z.post({url:r.propValue.history,data:[r.propValue.datatag]}).then(e=>{e.ErrorCode===200&&(s=Number(e.Results[0].TagValue)||0)}).catch(e=>{console.log(e),s=Math.round(Math.random()*t)}).finally(()=>{p()})}const g=t=>{const e=t[0],{width:a,height:l}=e.contentRect,i=o==null?void 0:o.getOption();o==null||o.resize({width:a,height:l}),i.xAxis[3].min=-(a/2)+50,i.xAxis[3].max=a/2,o==null||o.setOption(i)},m=()=>{const t=Number(r.propValue.maxValue||100);h();const e=y(s);let a=e[e.length-1].color;return{title:{text:"\u6E29\u5EA6\u8BA1",show:!1},yAxis:[{show:!1,data:[],min:0,max:t,axisLine:{show:!1}},{show:!1,min:0,max:t},{type:"category",data:["","","","","","","","","","","",""],axisLabel:{fontSize:20,color:"white"},axisLine:{show:!1},axisTick:{show:!1}}],xAxis:[{show:!1,min:-10,max:10,data:[]},{show:!1,min:-10,max:10,data:[]},{show:!1,min:-10,max:10,data:[]},{show:!1,min:-10,max:30}],series:[{name:"\u6761",type:"bar",xAxisIndex:0,data:[{value:s,label:{show:!0,rich:{back:{align:"center",lineHeight:50,fontSize:40,fontFamily:"Arial",color:a},unit:{fontFamily:"\u5FAE\u8F6F\u96C5\u9ED1",fontSize:15,lineHeight:50,color:a},downTxt:{lineHeight:50,fontSize:25,align:"center",color:"#fff"}}}}],barWidth:10,itemStyle:{color:new M(0,1,0,0,e)},z:2},{name:"\u767D\u6846",type:"bar",xAxisIndex:1,barGap:"-100%",data:[t-20],barWidth:18,itemStyle:{color:"#0C2E6D",borderRadius:50},z:1},{name:"\u5916\u6846",type:"bar",xAxisIndex:2,barGap:"-100%",data:[t],barWidth:25,itemStyle:{color:"#4577BA",borderRadius:50},z:0},{name:"\u5706",type:"scatter",emphasis:{scale:!0},data:[0],xAxisIndex:0,symbolSize:25,itemStyle:{color:"#93FE94",opacity:1},z:2},{name:"\u767D\u5706",type:"scatter",emphasis:{scale:!0},data:[0],xAxisIndex:1,symbolSize:35,itemStyle:{color:"#0C2E6D",opacity:1},z:1},{name:"\u5916\u5706",type:"scatter",emphasis:{scale:!0},data:[0],xAxisIndex:2,symbolSize:43,itemStyle:{color:"#4577BA",opacity:1},z:0},{name:"\u523B\u5EA6",type:"bar",yAxisIndex:0,xAxisIndex:3,label:{show:!0,position:"left",distance:1,color:"white",fontSize:12,formatter:function(i){return i.dataIndex>t||i.dataIndex<0?"":i.data==="-3"?i.dataIndex:""}},barGap:"0%",data:n,barWidth:1,itemStyle:{color:"white",borderRadius:120},z:0}]}},p=v(()=>{const t=m();t.series[0].data[0].value=s,o&&o.setOption({series:t.series})},300),w=()=>{o=E(u.value,"mydark"),o.clear(),o.setOption(m())};return d.isEditMode&&_(()=>r.propValue,(t,e)=>{console.log(t),o&&(o.clear(),o.setOption(m()))},{deep:!0}),k(()=>{o&&(o.clear(),o.dispose())}),(t,e)=>{const a=B("resize");return C((O(),T("div",{ref_key:"chartEl",ref:u},null,512)),[[a,g]])}}});export{xe as default};
