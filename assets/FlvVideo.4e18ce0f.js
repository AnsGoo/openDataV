import{f as i}from"./flv.js.8becf6a2.js";import{_ as m,u as s,b as n}from"./index.512f7100.js";import{d as u,r as c,e as d,O as v,X as _,Y as f}from"./@vue.a2815691.js";import"./axios.744bc20e.js";import"./vue-router.c997c3e8.js";import"./pinia.6e1173f7.js";import"./vue-demi.b3a9cad9.js";import"./mitt.550594b0.js";import"./naive-ui.3474528c.js";import"./date-fns.3c009aaa.js";import"./seemly.50a99b79.js";import"./vueuc.e50d3fb2.js";import"./evtd.9eee5233.js";import"./@css-render.8efa119b.js";import"./vooks.5c35c0ee.js";import"./vdirs.9c42edfb.js";import"./@juggle.37ed2144.js";import"./css-render.d5050412.js";import"./@emotion.6322e2ae.js";import"./treemate.80cdf2c2.js";import"./date-fns-tz.851ed5df.js";import"./async-validator.fb49d0f5.js";import"./lodash-es.5f1bdab1.js";import"./dexie.78e6a997.js";import"./lodash.f91bfcd2.js";import"./nprogress.5b68415b.js";import"./@icon-park.b1426ebe.js";const y=["autoplay","muted","controls"],V=u({__name:"FlvVideo",props:{propValue:null,componentId:null},setup(o){const e=o,a=s(),r=c(null),p=()=>{if(i.isSupported()){const t=i.createPlayer({type:e.propValue.videoType,url:e.propValue.url});t.attachMediaElement(r.value),t.load(),t.play()}};d(()=>{p()});const l=()=>{p()};return a.isEditMode&&n(e.componentId,l),(t,h)=>(v(),_("div",null,[f("video",{ref_key:"video",ref:r,autoplay:o.propValue.autoplay,muted:o.propValue.muted,controls:o.propValue.controls},null,8,y)]))}});var K=m(V,[["__scopeId","data-v-4208300c"]]);export{K as default};
