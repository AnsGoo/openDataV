import{a as q,o as se}from"./evtd.9eee5233.js";import{B as Me,d as ce,A as G,z as Ce,C as Le}from"./seemly.50a99b79.js";import{a as He,F as Se,C as Ve,d as k,p as Ye,g as Te,i as fe,r as F,o as R,u as ze,t as Z,k as D,m as E,D as Xe,e as K,w as U,s as Ee,A as Ae,h as De,j as Ne,q as _e}from"./@vue.a2815691.js";import{u as ee}from"./@css-render.8efa119b.js";import{d as je,u as ue,o as Pe,i as Ue}from"./vooks.5c35c0ee.js";import{z as qe}from"./vdirs.9c42edfb.js";import{R as Ke}from"./@juggle.37ed2144.js";import{C as Ge}from"./css-render.d5050412.js";function ae(n,e,t="default"){const r=e[t];if(r===void 0)throw new Error(`[vueuc/${n}]: slot[${t}] is empty.`);return r()}function de(n,e=!0,t=[]){return n.forEach(r=>{if(r!==null){if(typeof r!="object"){(typeof r=="string"||typeof r=="number")&&t.push(He(String(r)));return}if(Array.isArray(r)){de(r,e,t);return}if(r.type===Se){if(r.children===null)return;Array.isArray(r.children)&&de(r.children,e,t)}else r.type!==Ve&&t.push(r)}}),t}function he(n,e,t="default"){const r=e[t];if(r===void 0)throw new Error(`[vueuc/${n}]: slot[${t}] is empty.`);const o=de(r());if(o.length===1)return o[0];throw new Error(`[vueuc/${n}]: slot[${t}] should have exactly one child.`)}let H=null;function Fe(){if(H===null&&(H=document.getElementById("v-binder-view-measurer"),H===null)){H=document.createElement("div"),H.id="v-binder-view-measurer";const{style:n}=H;n.position="fixed",n.left="0",n.right="0",n.top="0",n.bottom="0",n.pointerEvents="none",n.visibility="hidden",document.body.appendChild(H)}return H.getBoundingClientRect()}function Je(n,e){const t=Fe();return{top:e,left:n,height:0,width:0,right:t.width-n,bottom:t.height-e}}function oe(n){const e=n.getBoundingClientRect(),t=Fe();return{left:e.left-t.left,top:e.top-t.top,bottom:t.height+t.top-e.bottom,right:t.width+t.left-e.right,width:e.width,height:e.height}}function Qe(n){return n.nodeType===9?null:n.parentNode}function Be(n){if(n===null)return null;const e=Qe(n);if(e===null)return null;if(e.nodeType===9)return document;if(e.nodeType===1){const{overflow:t,overflowX:r,overflowY:o}=getComputedStyle(e);if(/(auto|scroll|overlay)/.test(t+o+r))return e}return Be(e)}const Ze=k({name:"Binder",props:{syncTargetWithParent:Boolean,syncTarget:{type:Boolean,default:!0}},setup(n){var e;Ye("VBinder",(e=Te())===null||e===void 0?void 0:e.proxy);const t=fe("VBinder",null),r=F(null),o=i=>{r.value=i,t&&n.syncTargetWithParent&&t.setTargetRef(i)};let l=[];const p=()=>{let i=r.value;for(;i=Be(i),i!==null;)l.push(i);for(const b of l)se("scroll",b,x,!0)},g=()=>{for(const i of l)q("scroll",i,x,!0);l=[]},a=new Set,m=i=>{a.size===0&&p(),a.has(i)||a.add(i)},y=i=>{a.has(i)&&a.delete(i),a.size===0&&g()},x=()=>{Me(d)},d=()=>{a.forEach(i=>i())},c=new Set,v=i=>{c.size===0&&se("resize",window,u),c.has(i)||c.add(i)},h=i=>{c.has(i)&&c.delete(i),c.size===0&&q("resize",window,u)},u=()=>{c.forEach(i=>i())};return R(()=>{q("resize",window,u),g()}),{targetRef:r,setTargetRef:o,addScrollListener:m,removeScrollListener:y,addResizeListener:v,removeResizeListener:h}},render(){return ae("binder",this.$slots)}});var $t=Ze,Mt=k({name:"Target",setup(){const{setTargetRef:n,syncTarget:e}=fe("VBinder");return{syncTarget:e,setTargetDirective:{mounted:n,updated:n}}},render(){const{syncTarget:n,setTargetDirective:e}=this;return n?ze(he("follower",this.$slots),[[e]]):he("follower",this.$slots)}});function pe(n,e){console.error(`[vueuc/${n}]: ${e}`)}const{c:W}=Ge(),te="vueuc-style";function me(n){return n&-n}class Re{constructor(e,t){this.l=e,this.min=t;const r=new Array(e+1);for(let o=0;o<e+1;++o)r[o]=0;this.ft=r}add(e,t){if(t===0)return;const{l:r,ft:o}=this;for(e+=1;e<=r;)o[e]+=t,e+=me(e)}get(e){return this.sum(e+1)-this.sum(e)}sum(e){if(e===void 0&&(e=this.l),e<=0)return 0;const{ft:t,min:r,l:o}=this;if(e>o)throw new Error("[FinweckTree.sum]: `i` is larger than length.");let l=e*r;for(;e>0;)l+=t[e],e-=me(e);return l}getBound(e){let t=0,r=this.l;for(;r>t;){const o=Math.floor((t+r)/2),l=this.sum(o);if(l>e){r=o;continue}else if(l<e){if(t===o)return this.sum(t+1)<=e?t+1:o;t=o}else return o}return t}}function ve(n){return typeof n=="string"?document.querySelector(n):n()}var et=k({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(n){return{showTeleport:je(Z(n,"show")),mergedTo:D(()=>{const{to:e}=n;return e!=null?e:"body"})}},render(){return this.showTeleport?this.disabled?ae("lazy-teleport",this.$slots):E(Xe,{disabled:this.disabled,to:this.mergedTo},ae("lazy-teleport",this.$slots)):null}});const J={top:"bottom",bottom:"top",left:"right",right:"left"},be={start:"end",center:"center",end:"start"},ie={top:"height",bottom:"height",left:"width",right:"width"},tt={"bottom-start":"top left",bottom:"top center","bottom-end":"top right","top-start":"bottom left",top:"bottom center","top-end":"bottom right","right-start":"top left",right:"center left","right-end":"bottom left","left-start":"top right",left:"center right","left-end":"bottom right"},nt={"bottom-start":"bottom left",bottom:"bottom center","bottom-end":"bottom right","top-start":"top left",top:"top center","top-end":"top right","right-start":"top right",right:"center right","right-end":"bottom right","left-start":"top left",left:"center left","left-end":"bottom left"},rt={"bottom-start":"right","bottom-end":"left","top-start":"right","top-end":"left","right-start":"bottom","right-end":"top","left-start":"bottom","left-end":"top"},ge={top:!0,bottom:!1,left:!0,right:!1},we={top:"end",bottom:"start",left:"end",right:"start"};function ot(n,e,t,r,o,l){if(!o||l)return{placement:n,top:0,left:0};const[p,g]=n.split("-");let a=g!=null?g:"center",m={top:0,left:0};const y=(c,v,h)=>{let u=0,i=0;const b=t[c]-e[v]-e[c];return b>0&&r&&(h?i=ge[v]?b:-b:u=ge[v]?b:-b),{left:u,top:i}},x=p==="left"||p==="right";if(a!=="center"){const c=rt[n],v=J[c],h=ie[c];if(t[h]>e[h]){if(e[c]+e[h]<t[h]){const u=(t[h]-e[h])/2;e[c]<u||e[v]<u?e[c]<e[v]?(a=be[g],m=y(h,v,x)):m=y(h,c,x):a="center"}}else t[h]<e[h]&&e[v]<0&&e[c]>e[v]&&(a=be[g])}else{const c=p==="bottom"||p==="top"?"left":"top",v=J[c],h=ie[c],u=(t[h]-e[h])/2;(e[c]<u||e[v]<u)&&(e[c]>e[v]?(a=we[c],m=y(h,c,x)):(a=we[v],m=y(h,v,x)))}let d=p;return e[p]<t[ie[p]]&&e[p]<e[J[p]]&&(d=J[p]),{placement:a!=="center"?`${d}-${a}`:d,left:m.left,top:m.top}}function it(n,e){return e?nt[n]:tt[n]}function lt(n,e,t,r,o,l){if(l)switch(n){case"bottom-start":return{top:`${Math.round(t.top-e.top+t.height)}px`,left:`${Math.round(t.left-e.left)}px`,transform:"translateY(-100%)"};case"bottom-end":return{top:`${Math.round(t.top-e.top+t.height)}px`,left:`${Math.round(t.left-e.left+t.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top-start":return{top:`${Math.round(t.top-e.top)}px`,left:`${Math.round(t.left-e.left)}px`,transform:""};case"top-end":return{top:`${Math.round(t.top-e.top)}px`,left:`${Math.round(t.left-e.left+t.width)}px`,transform:"translateX(-100%)"};case"right-start":return{top:`${Math.round(t.top-e.top)}px`,left:`${Math.round(t.left-e.left+t.width)}px`,transform:"translateX(-100%)"};case"right-end":return{top:`${Math.round(t.top-e.top+t.height)}px`,left:`${Math.round(t.left-e.left+t.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"left-start":return{top:`${Math.round(t.top-e.top)}px`,left:`${Math.round(t.left-e.left)}px`,transform:""};case"left-end":return{top:`${Math.round(t.top-e.top+t.height)}px`,left:`${Math.round(t.left-e.left)}px`,transform:"translateY(-100%)"};case"top":return{top:`${Math.round(t.top-e.top)}px`,left:`${Math.round(t.left-e.left+t.width/2)}px`,transform:"translateX(-50%)"};case"right":return{top:`${Math.round(t.top-e.top+t.height/2)}px`,left:`${Math.round(t.left-e.left+t.width)}px`,transform:"translateX(-100%) translateY(-50%)"};case"left":return{top:`${Math.round(t.top-e.top+t.height/2)}px`,left:`${Math.round(t.left-e.left)}px`,transform:"translateY(-50%)"};case"bottom":default:return{top:`${Math.round(t.top-e.top+t.height)}px`,left:`${Math.round(t.left-e.left+t.width/2)}px`,transform:"translateX(-50%) translateY(-100%)"}}switch(n){case"bottom-start":return{top:`${Math.round(t.top-e.top+t.height+r)}px`,left:`${Math.round(t.left-e.left+o)}px`,transform:""};case"bottom-end":return{top:`${Math.round(t.top-e.top+t.height+r)}px`,left:`${Math.round(t.left-e.left+t.width+o)}px`,transform:"translateX(-100%)"};case"top-start":return{top:`${Math.round(t.top-e.top+r)}px`,left:`${Math.round(t.left-e.left+o)}px`,transform:"translateY(-100%)"};case"top-end":return{top:`${Math.round(t.top-e.top+r)}px`,left:`${Math.round(t.left-e.left+t.width+o)}px`,transform:"translateX(-100%) translateY(-100%)"};case"right-start":return{top:`${Math.round(t.top-e.top+r)}px`,left:`${Math.round(t.left-e.left+t.width+o)}px`,transform:""};case"right-end":return{top:`${Math.round(t.top-e.top+t.height+r)}px`,left:`${Math.round(t.left-e.left+t.width+o)}px`,transform:"translateY(-100%)"};case"left-start":return{top:`${Math.round(t.top-e.top+r)}px`,left:`${Math.round(t.left-e.left+o)}px`,transform:"translateX(-100%)"};case"left-end":return{top:`${Math.round(t.top-e.top+t.height+r)}px`,left:`${Math.round(t.left-e.left+o)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top":return{top:`${Math.round(t.top-e.top+r)}px`,left:`${Math.round(t.left-e.left+t.width/2+o)}px`,transform:"translateY(-100%) translateX(-50%)"};case"right":return{top:`${Math.round(t.top-e.top+t.height/2+r)}px`,left:`${Math.round(t.left-e.left+t.width+o)}px`,transform:"translateY(-50%)"};case"left":return{top:`${Math.round(t.top-e.top+t.height/2+r)}px`,left:`${Math.round(t.left-e.left+o)}px`,transform:"translateY(-50%) translateX(-100%)"};case"bottom":default:return{top:`${Math.round(t.top-e.top+t.height+r)}px`,left:`${Math.round(t.left-e.left+t.width/2+o)}px`,transform:"translateX(-50%)"}}}const st=W([W(".v-binder-follower-container",{position:"absolute",left:"0",right:"0",top:"0",height:"0",pointerEvents:"none",zIndex:"auto"}),W(".v-binder-follower-content",{position:"absolute",zIndex:"auto"},[W("> *",{pointerEvents:"all"})])]);var St=k({name:"Follower",inheritAttrs:!1,props:{show:Boolean,enabled:{type:Boolean,default:void 0},placement:{type:String,default:"bottom"},syncTrigger:{type:Array,default:["resize","scroll"]},to:[String,Object],flip:{type:Boolean,default:!0},internalShift:Boolean,x:Number,y:Number,width:String,minWidth:String,containerClass:String,teleportDisabled:Boolean,zindexable:{type:Boolean,default:!0},zIndex:Number,overlap:Boolean},setup(n){const e=fe("VBinder"),t=ue(()=>n.enabled!==void 0?n.enabled:n.show),r=F(null),o=F(null),l=()=>{const{syncTrigger:d}=n;d.includes("scroll")&&e.addScrollListener(a),d.includes("resize")&&e.addResizeListener(a)},p=()=>{e.removeScrollListener(a),e.removeResizeListener(a)};K(()=>{t.value&&(a(),l())});const g=ee();st.mount({id:"vueuc/binder",head:!0,anchorMetaName:te,ssr:g}),R(()=>{p()}),Pe(()=>{t.value&&a()});const a=()=>{if(!t.value)return;const d=r.value;if(d===null)return;const c=e.targetRef,{x:v,y:h,overlap:u}=n,i=v!==void 0&&h!==void 0?Je(v,h):oe(c);d.style.setProperty("--v-target-width",`${Math.round(i.width)}px`),d.style.setProperty("--v-target-height",`${Math.round(i.height)}px`);const{width:b,minWidth:z,placement:I,internalShift:C,flip:O}=n;d.setAttribute("v-placement",I),u?d.setAttribute("v-overlap",""):d.removeAttribute("v-overlap");const{style:B}=d;b==="target"?B.width=`${i.width}px`:b!==void 0?B.width=b:B.width="",z==="target"?B.minWidth=`${i.width}px`:z!==void 0?B.minWidth=z:B.minWidth="";const X=oe(d),N=oe(o.value),{left:_,top:s,placement:f}=ot(I,i,X,C,O,u),w=it(f,u),{left:$,top:M,transform:T}=lt(f,N,i,s,_,u);d.setAttribute("v-placement",f),d.style.setProperty("--v-offset-left",`${Math.round(_)}px`),d.style.setProperty("--v-offset-top",`${Math.round(s)}px`),d.style.transform=`translateX(${$}) translateY(${M}) ${T}`,d.style.setProperty("--v-transform-origin",w),d.style.transformOrigin=w};U(t,d=>{d?(l(),m()):p()});const m=()=>{Ee().then(a).catch(d=>console.error(d))};["placement","x","y","internalShift","flip","width","overlap","minWidth"].forEach(d=>{U(Z(n,d),a)}),["teleportDisabled"].forEach(d=>{U(Z(n,d),m)}),U(Z(n,"syncTrigger"),d=>{d.includes("resize")?e.addResizeListener(a):e.removeResizeListener(a),d.includes("scroll")?e.addScrollListener(a):e.removeScrollListener(a)});const y=Ue(),x=ue(()=>{const{to:d}=n;if(d!==void 0)return d;y.value});return{VBinder:e,mergedEnabled:t,offsetContainerRef:o,followerRef:r,mergedTo:x,syncPosition:a}},render(){return E(et,{show:this.show,to:this.mergedTo,disabled:this.teleportDisabled},{default:()=>{var n,e;const t=E("div",{class:["v-binder-follower-container",this.containerClass],ref:"offsetContainerRef"},[E("div",{class:"v-binder-follower-content",ref:"followerRef"},(e=(n=this.$slots).default)===null||e===void 0?void 0:e.call(n))]);return this.zindexable?ze(t,[[qe,{enabled:this.mergedEnabled,zIndex:this.zIndex}]]):t}})}});class ut{constructor(){this.handleResize=this.handleResize.bind(this),this.observer=new Ke(this.handleResize),this.elHandlersMap=new Map}handleResize(e){for(const t of e){const r=this.elHandlersMap.get(t.target);r!==void 0&&r(t)}}registerHandler(e,t){this.elHandlersMap.set(e,t),this.observer.observe(e)}unregisterHandler(e){!this.elHandlersMap.has(e)||(this.elHandlersMap.delete(e),this.observer.unobserve(e))}}var ye=new ut,xe=k({name:"ResizeObserver",props:{onResize:Function},setup(n){let e=!1;const t=Te().proxy;function r(o){const{onResize:l}=n;l!==void 0&&l(o)}K(()=>{const o=t.$el;if(o===void 0){pe("resize-observer","$el does not exist.");return}if(o.nextElementSibling!==o.nextSibling&&o.nodeType===3&&o.nodeValue!==""){pe("resize-observer","$el can not be observed (it may be a text node).");return}o.nextElementSibling!==null&&(ye.registerHandler(o.nextElementSibling,r),e=!0)}),R(()=>{e&&ye.unregisterHandler(t.$el.nextElementSibling)})},render(){return Ae(this.$slots,"default")}});let Q;function at(){return Q===void 0&&("matchMedia"in window?Q=window.matchMedia("(pointer:coarse)").matches:Q=!1),Q}let le;function $e(){return le===void 0&&(le="chrome"in window?window.devicePixelRatio:1),le}const dt=W(".v-vl",{maxHeight:"inherit",height:"100%",overflow:"auto",minWidth:"1px"},[W("&:not(.v-vl--show-scrollbar)",{scrollbarWidth:"none"},[W("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",{width:0,height:0,display:"none"})])]);var Tt=k({name:"VirtualList",inheritAttrs:!1,props:{showScrollbar:{type:Boolean,default:!0},items:{type:Array,default:()=>[]},itemSize:{type:Number,required:!0},itemResizable:Boolean,itemsStyle:[String,Object],visibleItemsTag:{type:[String,Object],default:"div"},visibleItemsProps:Object,ignoreItemResize:Boolean,onScroll:Function,onWheel:Function,onResize:Function,defaultScrollKey:[Number,String],defaultScrollIndex:Number,keyField:{type:String,default:"key"},paddingTop:{type:[Number,String],default:0},paddingBottom:{type:[Number,String],default:0}},setup(n){const e=ee();dt.mount({id:"vueuc/virtual-list",head:!0,anchorMetaName:te,ssr:e}),K(()=>{const{defaultScrollIndex:s,defaultScrollKey:f}=n;s!=null?v({index:s}):f!=null&&v({key:f})});let t=!1,r=!1;De(()=>{if(t=!1,!r){r=!0;return}v({top:x.value,left:y})}),Ne(()=>{t=!0,r||(r=!0)});const o=D(()=>{const s=new Map,{keyField:f}=n;return n.items.forEach((w,$)=>{s.set(w[f],$)}),s}),l=F(null),p=F(void 0),g=new Map,a=D(()=>{const{items:s,itemSize:f,keyField:w}=n,$=new Re(s.length,f);return s.forEach((M,T)=>{const S=M[w],A=g.get(S);A!==void 0&&$.add(T,A)}),$}),m=F(0);let y=0;const x=F(0),d=ue(()=>Math.max(a.value.getBound(x.value-ce(n.paddingTop))-1,0)),c=D(()=>{const{value:s}=p;if(s===void 0)return[];const{items:f,itemSize:w}=n,$=d.value,M=Math.min($+Math.ceil(s/w+1),f.length-1),T=[];for(let S=$;S<=M;++S)T.push(f[S]);return T}),v=(s,f)=>{if(typeof s=="number"){b(s,f,"auto");return}const{left:w,top:$,index:M,key:T,position:S,behavior:A,debounce:L=!0}=s;if(w!==void 0||$!==void 0)b(w,$,A);else if(M!==void 0)i(M,A,L);else if(T!==void 0){const ne=o.value.get(T);ne!==void 0&&i(ne,A,L)}else S==="bottom"?b(0,Number.MAX_SAFE_INTEGER,A):S==="top"&&b(0,0,A)};let h,u=null;function i(s,f,w){const{value:$}=a,M=$.sum(s)+ce(n.paddingTop);if(!w)l.value.scrollTo({left:0,top:M,behavior:f});else{h=s,u!==null&&window.clearTimeout(u),u=window.setTimeout(()=>{h=void 0,u=null},16);const{scrollTop:T,offsetHeight:S}=l.value;if(M>T){const A=$.get(s);M+A<=T+S||l.value.scrollTo({left:0,top:M+A-S,behavior:f})}else l.value.scrollTo({left:0,top:M,behavior:f})}}function b(s,f,w){l.value.scrollTo({left:s,top:f,behavior:w})}function z(s,f){var w,$,M;if(t||n.ignoreItemResize||_(f.target))return;const{value:T}=a,S=o.value.get(s),A=T.get(S),L=(M=($=(w=f.borderBoxSize)===null||w===void 0?void 0:w[0])===null||$===void 0?void 0:$.blockSize)!==null&&M!==void 0?M:f.contentRect.height;if(L===A)return;L-n.itemSize===0?g.delete(s):g.set(s,L-n.itemSize);const j=L-A;if(j===0)return;T.add(S,j);const V=l.value;if(V!=null){if(h===void 0){const re=T.sum(S);V.scrollTop>re&&V.scrollBy(0,j)}else if(S<h)V.scrollBy(0,j);else if(S===h){const re=T.sum(S);L+re>V.scrollTop+V.offsetHeight&&V.scrollBy(0,j)}N()}m.value++}const I=!at();let C=!1;function O(s){var f;(f=n.onScroll)===null||f===void 0||f.call(n,s),(!I||!C)&&N()}function B(s){var f;if((f=n.onWheel)===null||f===void 0||f.call(n,s),I){const w=l.value;if(w!=null){if(s.deltaX===0&&(w.scrollTop===0&&s.deltaY<=0||w.scrollTop+w.offsetHeight>=w.scrollHeight&&s.deltaY>=0))return;s.preventDefault(),w.scrollTop+=s.deltaY/$e(),w.scrollLeft+=s.deltaX/$e(),N(),C=!0,Me(()=>{C=!1})}}}function X(s){if(t||_(s.target)||s.contentRect.height===p.value)return;p.value=s.contentRect.height;const{onResize:f}=n;f!==void 0&&f(s)}function N(){const{value:s}=l;s!=null&&(x.value=s.scrollTop,y=s.scrollLeft)}function _(s){let f=s;for(;f!==null;){if(f.style.display==="none")return!0;f=f.parentElement}return!1}return{listHeight:p,listStyle:{overflow:"auto"},keyToIndex:o,itemsStyle:D(()=>{const{itemResizable:s}=n,f=G(a.value.sum());return m.value,[n.itemsStyle,{boxSizing:"content-box",height:s?"":f,minHeight:s?f:"",paddingTop:G(n.paddingTop),paddingBottom:G(n.paddingBottom)}]}),visibleItemsStyle:D(()=>(m.value,{transform:`translateY(${G(a.value.sum(d.value))})`})),viewportItems:c,listElRef:l,itemsElRef:F(null),scrollTo:v,handleListResize:X,handleListScroll:O,handleListWheel:B,handleItemResize:z}},render(){const{itemResizable:n,keyField:e,keyToIndex:t,visibleItemsTag:r}=this;return E(xe,{onResize:this.handleListResize},{default:()=>{var o,l;return E("div",_e(this.$attrs,{class:["v-vl",this.showScrollbar&&"v-vl--show-scrollbar"],onScroll:this.handleListScroll,onWheel:this.handleListWheel,ref:"listElRef"}),[this.items.length!==0?E("div",{ref:"itemsElRef",class:"v-vl-items",style:this.itemsStyle},[E(r,Object.assign({class:"v-vl-visible-items",style:this.visibleItemsStyle},this.visibleItemsProps),{default:()=>this.viewportItems.map(p=>{const g=p[e],a=t.get(g),m=this.$slots.default({item:p,index:a})[0];return n?E(xe,{key:g,onResize:y=>this.handleItemResize(g,y)},{default:()=>m}):(m.key=g,m)})})]):(l=(o=this.$slots).empty)===null||l===void 0?void 0:l.call(o)])}})}});const ft=W(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[W("&::-webkit-scrollbar",{width:0,height:0})]);var zt=k({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const n=F(null);function e(o){!(o.currentTarget.offsetWidth<o.currentTarget.scrollWidth)||o.deltaY===0||(o.currentTarget.scrollLeft+=o.deltaY+o.deltaX,o.preventDefault())}const t=ee();return ft.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:te,ssr:t}),Object.assign({selfRef:n,handleWheel:e},{scrollTo(...o){var l;(l=n.value)===null||l===void 0||l.scrollTo(...o)}})},render(){return E("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});const Y="v-hidden",ct=W("[v-hidden]",{display:"none!important"});var Et=k({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateOverflow:Function},setup(n,{slots:e}){const t=F(null),r=F(null);function o(){const{value:p}=t,{getCounter:g,getTail:a}=n;let m;if(g!==void 0?m=g():m=r.value,!p||!m)return;m.hasAttribute(Y)&&m.removeAttribute(Y);const{children:y}=p,x=p.offsetWidth,d=[],c=e.tail?a==null?void 0:a():null;let v=c?c.offsetWidth:0,h=!1;const u=p.children.length-(e.tail?1:0);for(let b=0;b<u-1;++b){if(b<0)continue;const z=y[b];if(h){z.hasAttribute(Y)||z.setAttribute(Y,"");continue}else z.hasAttribute(Y)&&z.removeAttribute(Y);const I=z.offsetWidth;if(v+=I,d[b]=I,v>x){const{updateCounter:C}=n;for(let O=b;O>=0;--O){const B=u-1-O;C!==void 0?C(B):m.textContent=`${B}`;const X=m.offsetWidth;if(v-=d[O],v+X<=x||O===0){h=!0,b=O-1,c&&(b===-1?(c.style.maxWidth=`${x-X}px`,c.style.boxSizing="border-box"):c.style.maxWidth="");break}}}}const{onUpdateOverflow:i}=n;h?i!==void 0&&i(!0):(i!==void 0&&i(!1),m.setAttribute(Y,""))}const l=ee();return ct.mount({id:"vueuc/overflow",head:!0,anchorMetaName:te,ssr:l}),K(o),{selfRef:t,counterRef:r,sync:o}},render(){const{$slots:n}=this;return Ee(this.sync),E("div",{class:"v-overflow",ref:"selfRef"},[Ae(n,"default"),n.counter?n.counter():E("span",{style:{display:"inline-block"},ref:"counterRef"}),n.tail?n.tail():null])}});function Ie(n){return n instanceof HTMLElement}function Oe(n){for(let e=0;e<n.childNodes.length;e++){const t=n.childNodes[e];if(Ie(t)&&(ke(t)||Oe(t)))return!0}return!1}function We(n){for(let e=n.childNodes.length-1;e>=0;e--){const t=n.childNodes[e];if(Ie(t)&&(ke(t)||We(t)))return!0}return!1}function ke(n){if(!ht(n))return!1;try{n.focus({preventScroll:!0})}catch(e){}return document.activeElement===n}function ht(n){if(n.tabIndex>0||n.tabIndex===0&&n.getAttribute("tabIndex")!==null)return!0;if(n.getAttribute("disabled"))return!1;switch(n.nodeName){case"A":return!!n.href&&n.rel!=="ignore";case"INPUT":return n.type!=="hidden"&&n.type!=="file";case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}let P=[];const At=k({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(n){const e=Ce(),t=F(null),r=F(null);let o=!1,l=!1;const p=document.activeElement;function g(){return P[P.length-1]===e}function a(u){var i;u.code==="Escape"&&g()&&((i=n.onEsc)===null||i===void 0||i.call(n,u))}K(()=>{U(()=>n.active,u=>{u?(x(),se("keydown",document,a)):(q("keydown",document,a),o&&d())},{immediate:!0})}),R(()=>{q("keydown",document,a),o&&d()});function m(u){if(!l&&g()){const i=y();if(i===null||i.contains(Le(u)))return;c("first")}}function y(){const u=t.value;if(u===null)return null;let i=u;for(;i=i.nextSibling,!(i===null||i instanceof Element&&i.tagName==="DIV"););return i}function x(){var u;if(!n.disabled){if(P.push(e),n.autoFocus){const{initialFocusTo:i}=n;i===void 0?c("first"):(u=ve(i))===null||u===void 0||u.focus({preventScroll:!0})}o=!0,document.addEventListener("focus",m,!0)}}function d(){var u;if(n.disabled||(document.removeEventListener("focus",m,!0),P=P.filter(b=>b!==e),g()))return;const{finalFocusTo:i}=n;i!==void 0?(u=ve(i))===null||u===void 0||u.focus({preventScroll:!0}):n.returnFocusOnDeactivated&&p instanceof HTMLElement&&(l=!0,p.focus({preventScroll:!0}),l=!1)}function c(u){if(!!g()&&n.active){const i=t.value,b=r.value;if(i!==null&&b!==null){const z=y();if(z==null||z===b){l=!0,i.focus({preventScroll:!0}),l=!1;return}l=!0;const I=u==="first"?Oe(z):We(z);l=!1,I||(l=!0,i.focus({preventScroll:!0}),l=!1)}}}function v(u){if(l)return;const i=y();i!==null&&(u.relatedTarget!==null&&i.contains(u.relatedTarget)?c("last"):c("first"))}function h(u){l||(u.relatedTarget!==null&&u.relatedTarget===t.value?c("last"):c("first"))}return{focusableStartRef:t,focusableEndRef:r,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:v,handleEndFocus:h}},render(){const{default:n}=this.$slots;if(n===void 0)return null;if(this.disabled)return n();const{active:e,focusableStyle:t}=this;return E(Se,null,[E("div",{"aria-hidden":"true",tabindex:e?"0":"-1",ref:"focusableStartRef",style:t,onFocus:this.handleStartFocus}),n(),E("div",{"aria-hidden":"true",style:t,ref:"focusableEndRef",tabindex:e?"0":"-1",onFocus:this.handleEndFocus})])}});export{At as F,et as L,xe as V,Tt as a,St as b,Mt as c,$t as d,Et as e,zt as f,ye as r};
