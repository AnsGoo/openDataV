import{d as N,r as B,az as dt,aA as ct,a9 as f,aB as pe,aC as ft,aD as J,aE as bt,aF as ut,a4 as Ce,aG as U,aH as pt,a8 as vt,i as G,aI as L,aJ as ht,aK as ve,aL as q,aM as gt,aN as mt,aq as Te,aO as xt,aP as yt,F as wt,aQ as St,aR as Rt,aS as Ct,aT as Tt,aU as zt,$ as h,a2 as z,a1 as $,a3 as I,a0 as $t,aV as Pt,aW as he,aX as Bt,U as ee,aY as te,a6 as Wt,aZ as O,a_ as Et,a$ as _t,b0 as At,b1 as ge,b2 as me,b3 as K,w as Lt,X as jt,b4 as It,b5 as kt}from"./index.15868122.js";function Ot(e,a="default",r=[]){const i=e.$slots[a];return i===void 0?r:i()}const Ft=pe(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[pe("&::-webkit-scrollbar",{width:0,height:0})]),Mt=N({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=B(null);function a(i){!(i.currentTarget.offsetWidth<i.currentTarget.scrollWidth)||i.deltaY===0||(i.currentTarget.scrollLeft+=i.deltaY+i.deltaX,i.preventDefault())}const r=dt();return Ft.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:ct,ssr:r}),Object.assign({selfRef:e,handleWheel:a},{scrollTo(...i){var s;(s=e.value)===null||s===void 0||s.scrollTo(...i)}})},render(){return f("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Nt=/\s/;function Dt(e){for(var a=e.length;a--&&Nt.test(e.charAt(a)););return a}var Ht=/^\s+/;function Gt(e){return e&&e.slice(0,Dt(e)+1).replace(Ht,"")}var xe=0/0,Ut=/^[-+]0x[0-9a-f]+$/i,Vt=/^0b[01]+$/i,Xt=/^0o[0-7]+$/i,Yt=parseInt;function ye(e){if(typeof e=="number")return e;if(ft(e))return xe;if(J(e)){var a=typeof e.valueOf=="function"?e.valueOf():e;e=J(a)?a+"":a}if(typeof e!="string")return e===0?e:+e;e=Gt(e);var r=Vt.test(e);return r||Xt.test(e)?Yt(e.slice(2),r?2:8):Ut.test(e)?xe:+e}var Kt=function(){return bt.Date.now()};const ae=Kt;var qt="Expected a function",Jt=Math.max,Qt=Math.min;function Zt(e,a,r){var o,i,s,p,c,g,v=0,w=!1,m=!1,u=!0;if(typeof e!="function")throw new TypeError(qt);a=ye(a)||0,J(r)&&(w=!!r.leading,m="maxWait"in r,s=m?Jt(ye(r.maxWait)||0,a):s,u="trailing"in r?!!r.trailing:u);function x(y){var E=o,_=i;return o=i=void 0,v=y,p=e.apply(_,E),p}function S(y){return v=y,c=setTimeout(R,a),w?x(y):p}function T(y){var E=y-g,_=y-v,H=a-E;return m?Qt(H,s-_):H}function d(y){var E=y-g,_=y-v;return g===void 0||E>=a||E<0||m&&_>=s}function R(){var y=ae();if(d(y))return C(y);c=setTimeout(R,T(y))}function C(y){return c=void 0,u&&o?x(y):(o=i=void 0,p)}function P(){c!==void 0&&clearTimeout(c),v=0,o=g=i=c=void 0}function W(){return c===void 0?p:C(ae())}function D(){var y=ae(),E=d(y);if(o=arguments,i=this,g=y,E){if(c===void 0)return S(g);if(m)return clearTimeout(c),c=setTimeout(R,a),x(g)}return c===void 0&&(c=setTimeout(R,a)),p}return D.cancel=P,D.flush=W,D}var ea="Expected a function";function ne(e,a,r){var o=!0,i=!0;if(typeof e!="function")throw new TypeError(ea);return J(r)&&(o="leading"in r?!!r.leading:o,i="trailing"in r?!!r.trailing:i),Zt(e,a,{leading:o,maxWait:a,trailing:i})}let re;const ta=()=>{if(!ut)return!0;if(re===void 0){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e);const a=e.scrollHeight===1;return document.body.removeChild(e),re=a}return re},aa=Object.assign(Object.assign({},U.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),da=N({name:"Space",props:aa,setup(e){const{mergedClsPrefixRef:a,mergedRtlRef:r}=Ce(e),o=U("Space","-space",void 0,pt,e,a),i=vt("Space",r,a);return{useGap:ta(),rtlEnabled:i,mergedClsPrefix:a,margin:G(()=>{const{size:s}=e;if(Array.isArray(s))return{horizontal:s[0],vertical:s[1]};if(typeof s=="number")return{horizontal:s,vertical:s};const{self:{[L("gap",s)]:p}}=o.value,{row:c,col:g}=ht(p);return{horizontal:ve(g),vertical:ve(c)}})}},render(){const{vertical:e,align:a,inline:r,justify:o,itemStyle:i,margin:s,wrap:p,mergedClsPrefix:c,rtlEnabled:g,useGap:v,wrapItem:w,internalUseGap:m}=this,u=q(Ot(this));if(!u.length)return null;const x=`${s.horizontal}px`,S=`${s.horizontal/2}px`,T=`${s.vertical}px`,d=`${s.vertical/2}px`,R=u.length-1,C=o.startsWith("space-");return f("div",{role:"none",class:[`${c}-space`,g&&`${c}-space--rtl`],style:{display:r?"inline-flex":"flex",flexDirection:e?"column":"row",justifyContent:["start","end"].includes(o)?"flex-"+o:o,flexWrap:!p||e?"nowrap":"wrap",marginTop:v||e?"":`-${d}`,marginBottom:v||e?"":`-${d}`,alignItems:a,gap:v?`${s.vertical}px ${s.horizontal}px`:""}},!w&&(v||m)?u:u.map((P,W)=>f("div",{role:"none",style:[i,{maxWidth:"100%"},v?"":e?{marginBottom:W!==R?T:""}:g?{marginLeft:C?o==="space-between"&&W===R?"":S:W!==R?x:"",marginRight:C?o==="space-between"&&W===0?"":S:"",paddingTop:d,paddingBottom:d}:{marginRight:C?o==="space-between"&&W===R?"":S:W!==R?x:"",marginLeft:C?o==="space-between"&&W===0?"":S:"",paddingTop:d,paddingBottom:d}]},P)))}}),na=Object.assign(Object.assign({},U.props),{trigger:String,xScrollable:Boolean,onScroll:Function}),ra=N({name:"Scrollbar",props:na,setup(){const e=B(null);return Object.assign(Object.assign({},{scrollTo:(...r)=>{var o;(o=e.value)===null||o===void 0||o.scrollTo(r[0],r[1])},scrollBy:(...r)=>{var o;(o=e.value)===null||o===void 0||o.scrollBy(r[0],r[1])}}),{scrollbarInstRef:e})},render(){return f(gt,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),ca=ra,se=mt("n-tabs"),ze={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},fa=N({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:ze,setup(e){const a=Te(se,null);return a||xt("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:a.paneStyleRef,class:a.paneClassRef,mergedClsPrefix:a.mergedClsPrefixRef}},render(){return f("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),oa=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},zt(ze,["displayDirective"])),ie=N({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:oa,setup(e){const{mergedClsPrefixRef:a,valueRef:r,typeRef:o,closableRef:i,tabStyleRef:s,tabChangeIdRef:p,onBeforeLeaveRef:c,triggerRef:g,handleAdd:v,activateTab:w,handleClose:m}=Te(se);return{trigger:g,mergedClosable:G(()=>{if(e.internalAddable)return!1;const{closable:u}=e;return u===void 0?i.value:u}),style:s,clsPrefix:a,value:r,type:o,handleClose(u){u.stopPropagation(),!e.disabled&&m(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){v();return}const{name:u}=e,x=++p.id;if(u!==r.value){const{value:S}=c;S?Promise.resolve(S(e.name,r.value)).then(T=>{T&&p.id===x&&w(u)}):w(u)}}}},render(){const{internalAddable:e,clsPrefix:a,name:r,disabled:o,label:i,tab:s,value:p,mergedClosable:c,style:g,trigger:v,$slots:{default:w}}=this,m=i!=null?i:s;return f("div",{class:`${a}-tabs-tab-wrapper`},this.internalLeftPadded?f("div",{class:`${a}-tabs-tab-pad`}):null,f("div",Object.assign({key:r,"data-name":r,"data-disabled":o?!0:void 0},yt({class:[`${a}-tabs-tab`,p===r&&`${a}-tabs-tab--active`,o&&`${a}-tabs-tab--disabled`,c&&`${a}-tabs-tab--closable`,e&&`${a}-tabs-tab--addable`],onClick:v==="click"?this.activateTab:void 0,onMouseenter:v==="hover"?this.activateTab:void 0,style:e?void 0:g},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),f("span",{class:`${a}-tabs-tab__label`},e?f(wt,null,f("div",{class:`${a}-tabs-tab__height-placeholder`},"\xA0"),f(St,{clsPrefix:a},{default:()=>f(Rt,null)})):w?w():typeof m=="object"?m:Ct(m!=null?m:r)),c&&this.type==="card"?f(Tt,{clsPrefix:a,class:`${a}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),ia=h("tabs",`
 box-sizing: border-box;
 width: 100%;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[z("segment-type",[h("tabs-rail",[$("&.transition-disabled","color: red;",[h("tabs-tab",`
 transition: none;
 `)])])]),h("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[h("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[h("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[z("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),$("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),z("flex",[h("tabs-nav",{width:"100%"},[h("tabs-wrapper",{width:"100%"},[h("tabs-tab",{marginRight:0})])])]),h("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[I("prefix, suffix",`
 display: flex;
 align-items: center;
 `),I("prefix","padding-right: 16px;"),I("suffix","padding-left: 16px;")]),h("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[z("shadow-before",[$("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),z("shadow-after",[$("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),$("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `),$("&::before",`
 left: 0;
 `),$("&::after",`
 right: 0;
 `)]),h("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `),h("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),h("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),h("tabs-tab",`
 cursor: pointer;
 white-space: nowrap;
 flex-wrap: nowrap;
 display: inline-flex;
 align-items: center;
 color: var(--n-tab-text-color);
 font-size: var(--n-tab-font-size);
 background-clip: padding-box;
 padding: var(--n-tab-padding);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[z("disabled",{cursor:"not-allowed"}),I("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),I("label",`
 display: flex;
 align-items: center;
 `)]),h("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[$("&.transition-disabled",`
 transition: none;
 `),z("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),h("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),h("tab-pane",`
 color: var(--n-pane-text-color);
 width: 100%;
 padding: var(--n-pane-padding);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 opacity .2s var(--n-bezier);
 left: 0;
 right: 0;
 top: 0;
 `,[$("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),$("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),$("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),$("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),$("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),h("tabs-tab-pad",`
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),z("line-type, bar-type",[h("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[$("&:hover",{color:"var(--n-tab-text-color-hover)"}),z("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),z("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),h("tabs-nav",[z("line-type",[I("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),h("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),h("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),z("card-type",[I("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),h("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),h("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),h("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 border: 1px solid var(--n-tab-border-color);
 border-top-left-radius: var(--n-tab-border-radius);
 border-top-right-radius: var(--n-tab-border-radius);
 background-color: var(--n-tab-color);
 box-sizing: border-box;
 position: relative;
 vertical-align: bottom;
 display: flex;
 justify-content: space-between;
 font-size: var(--n-tab-font-size);
 color: var(--n-tab-text-color);
 `,[z("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[I("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),$t("disabled",[$("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),z("closable","padding-right: 6px;"),z("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),z("disabled","color: var(--n-tab-text-color-disabled);")]),h("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),sa=Object.assign(Object.assign({},U.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),ba=N({name:"Tabs",props:sa,setup(e,{slots:a}){var r,o,i,s;const{mergedClsPrefixRef:p,inlineThemeDisabled:c}=Ce(e),g=U("Tabs","-tabs",ia,Pt,e,p),v=B(null),w=B(null),m=B(null),u=B(null),x=B(null),S=B(!0),T=B(!0),d=he(e,["labelSize","size"]),R=he(e,["activeName","value"]),C=B((o=(r=R.value)!==null&&r!==void 0?r:e.defaultValue)!==null&&o!==void 0?o:a.default?(s=(i=q(a.default())[0])===null||i===void 0?void 0:i.props)===null||s===void 0?void 0:s.name:null),P=Bt(R,C),W={id:0},D=G(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});ee(P,()=>{W.id=0,_(),H()});function y(){var t;const{value:n}=P;return n===null?null:(t=v.value)===null||t===void 0?void 0:t.querySelector(`[data-name="${n}"]`)}function E(t){if(e.type==="card")return;const{value:n}=w;if(!!n&&t){const l=`${p.value}-tabs-bar--disabled`,{barWidth:b}=e;if(t.dataset.disabled==="true"?n.classList.add(l):n.classList.remove(l),typeof b=="number"&&t.offsetWidth>=b){const A=Math.floor((t.offsetWidth-b)/2)+t.offsetLeft;n.style.left=`${A}px`,n.style.maxWidth=`${b}px`}else n.style.left=`${t.offsetLeft}px`,n.style.maxWidth=`${t.offsetWidth}px`;n.style.width="8192px",n.offsetWidth}}function _(){if(e.type==="card")return;const t=y();t&&E(t)}function H(t){var n;const l=(n=x.value)===null||n===void 0?void 0:n.$el;if(!l)return;const b=y();if(!b)return;const{scrollLeft:A,offsetWidth:k}=l,{offsetLeft:M,offsetWidth:Y}=b;A>M?l.scrollTo({top:0,left:M,behavior:"smooth"}):M+Y>A+k&&l.scrollTo({top:0,left:M+Y-k,behavior:"smooth"})}const V=B(null);let Q=0,j=null;function $e(t){const n=V.value;if(n){Q=t.getBoundingClientRect().height;const l=`${Q}px`,b=()=>{n.style.height=l,n.style.maxHeight=l};j?(b(),j(),j=null):j=b}}function Pe(t){const n=V.value;if(n){const l=t.getBoundingClientRect().height,b=()=>{document.body.offsetHeight,n.style.maxHeight=`${l}px`,n.style.height=`${Math.max(Q,l)}px`};j?(j(),j=null,b()):j=b}}function Be(){const t=V.value;t&&(t.style.maxHeight="",t.style.height="")}const le={value:[]},de=B("next");function We(t){const n=P.value;let l="next";for(const b of le.value){if(b===n)break;if(b===t){l="prev";break}}de.value=l,Ee(t)}function Ee(t){const{onActiveNameChange:n,onUpdateValue:l,"onUpdate:value":b}=e;n&&K(n,t),l&&K(l,t),b&&K(b,t),C.value=t}function _e(t){const{onClose:n}=e;n&&K(n,t)}function ce(){const{value:t}=w;if(!t)return;const n="transition-disabled";t.classList.add(n),_(),t.classList.remove(n)}let fe=0;function Ae(t){var n;if(t.contentRect.width===0&&t.contentRect.height===0||fe===t.contentRect.width)return;fe=t.contentRect.width;const{type:l}=e;(l==="line"||l==="bar")&&ce(),l!=="segment"&&Z((n=x.value)===null||n===void 0?void 0:n.$el)}const Le=ne(Ae,64);ee([()=>e.justifyContent,()=>e.size],()=>{te(()=>{const{type:t}=e;(t==="line"||t==="bar")&&ce()})});const X=B(!1);function je(t){var n;const{target:l,contentRect:{width:b}}=t,A=l.parentElement.offsetWidth;if(!X.value)A<b&&(X.value=!0);else{const{value:k}=u;if(!k)return;A-b>k.$el.offsetWidth&&(X.value=!1)}Z((n=x.value)===null||n===void 0?void 0:n.$el)}const Ie=ne(je,64);function ke(){const{onAdd:t}=e;t&&t(),te(()=>{const n=y(),{value:l}=x;!n||!l||l.scrollTo({left:n.offsetLeft,top:0,behavior:"smooth"})})}function Z(t){if(!t)return;const{scrollLeft:n,scrollWidth:l,offsetWidth:b}=t;S.value=n<=0,T.value=n+b>=l}const Oe=ne(t=>{Z(t.target)},64);Wt(se,{triggerRef:O(e,"trigger"),tabStyleRef:O(e,"tabStyle"),paneClassRef:O(e,"paneClass"),paneStyleRef:O(e,"paneStyle"),mergedClsPrefixRef:p,typeRef:O(e,"type"),closableRef:O(e,"closable"),valueRef:P,tabChangeIdRef:W,onBeforeLeaveRef:O(e,"onBeforeLeave"),activateTab:We,handleClose:_e,handleAdd:ke}),Et(()=>{_(),H()}),_t(()=>{const{value:t}=m;if(!t)return;const{value:n}=p,l=`${n}-tabs-nav-scroll-wrapper--shadow-before`,b=`${n}-tabs-nav-scroll-wrapper--shadow-after`;S.value?t.classList.remove(l):t.classList.add(l),T.value?t.classList.remove(b):t.classList.add(b)});const be=B(null);ee(P,()=>{if(e.type==="segment"){const t=be.value;t&&te(()=>{t.classList.add("transition-disabled"),t.offsetWidth,t.classList.remove("transition-disabled")})}});const Fe={syncBarPosition:()=>{_()}},ue=G(()=>{const{value:t}=d,{type:n}=e,l={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[n],b=`${t}${l}`,{self:{barColor:A,closeIconColor:k,closeIconColorHover:M,closeIconColorPressed:Y,tabColor:Me,tabBorderColor:Ne,paneTextColor:De,tabFontWeight:He,tabBorderRadius:Ge,tabFontWeightActive:Ue,colorSegment:Ve,fontWeightStrong:Xe,tabColorSegment:Ye,closeSize:Ke,closeIconSize:qe,closeColorHover:Je,closeColorPressed:Qe,closeBorderRadius:Ze,[L("panePadding",t)]:et,[L("tabPadding",b)]:tt,[L("tabGap",b)]:at,[L("tabTextColor",n)]:nt,[L("tabTextColorActive",n)]:rt,[L("tabTextColorHover",n)]:ot,[L("tabTextColorDisabled",n)]:it,[L("tabFontSize",t)]:st},common:{cubicBezierEaseInOut:lt}}=g.value;return{"--n-bezier":lt,"--n-color-segment":Ve,"--n-bar-color":A,"--n-tab-font-size":st,"--n-tab-text-color":nt,"--n-tab-text-color-active":rt,"--n-tab-text-color-disabled":it,"--n-tab-text-color-hover":ot,"--n-pane-text-color":De,"--n-tab-border-color":Ne,"--n-tab-border-radius":Ge,"--n-close-size":Ke,"--n-close-icon-size":qe,"--n-close-color-hover":Je,"--n-close-color-pressed":Qe,"--n-close-border-radius":Ze,"--n-close-icon-color":k,"--n-close-icon-color-hover":M,"--n-close-icon-color-pressed":Y,"--n-tab-color":Me,"--n-tab-font-weight":He,"--n-tab-font-weight-active":Ue,"--n-tab-padding":tt,"--n-tab-gap":at,"--n-pane-padding":et,"--n-font-weight-strong":Xe,"--n-tab-color-segment":Ye}}),F=c?At("tabs",G(()=>`${d.value[0]}${e.type[0]}`),ue,e):void 0;return Object.assign({mergedClsPrefix:p,mergedValue:P,renderedNames:new Set,tabsRailElRef:be,tabsPaneWrapperRef:V,tabsElRef:v,barElRef:w,addTabInstRef:u,xScrollInstRef:x,scrollWrapperElRef:m,addTabFixed:X,tabWrapperStyle:D,handleNavResize:Le,mergedSize:d,handleScroll:Oe,handleTabsResize:Ie,cssVars:c?void 0:ue,themeClass:F==null?void 0:F.themeClass,animationDirection:de,renderNameListRef:le,onAnimationBeforeLeave:$e,onAnimationEnter:Pe,onAnimationAfterEnter:Be,onRender:F==null?void 0:F.onRender},Fe)},render(){const{mergedClsPrefix:e,type:a,addTabFixed:r,addable:o,mergedSize:i,renderNameListRef:s,onRender:p,$slots:{default:c,prefix:g,suffix:v}}=this;p==null||p();const w=c?q(c()).filter(d=>d.type.__TAB_PANE__===!0):[],m=c?q(c()).filter(d=>d.type.__TAB__===!0):[],u=!m.length,x=a==="card",S=a==="segment",T=!x&&!S&&this.justifyContent;return s.value=[],f("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${a}-type`,`${e}-tabs--${i}-size`,T&&`${e}-tabs--flex`],style:this.cssVars},f("div",{class:[`${e}-tabs-nav--${a}-type`,`${e}-tabs-nav`]},ge(g,d=>d&&f("div",{class:`${e}-tabs-nav__prefix`},d)),S?f("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},u?w.map((d,R)=>(s.value.push(d.props.name),f(ie,Object.assign({},d.props,{internalCreatedByPane:!0,internalLeftPadded:R!==0}),d.children?{default:d.children.tab}:void 0))):m.map((d,R)=>(s.value.push(d.props.name),R===0?d:Re(d)))):f(me,{onResize:this.handleNavResize},{default:()=>f("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},f(Mt,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const d=f("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},T?null:f("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),u?w.map((C,P)=>(s.value.push(C.props.name),oe(f(ie,Object.assign({},C.props,{internalCreatedByPane:!0,internalLeftPadded:P!==0&&(!T||T==="center"||T==="start"||T==="end")}),C.children?{default:C.children.tab}:void 0)))):m.map((C,P)=>(s.value.push(C.props.name),oe(P!==0&&!T?Re(C):C))),!r&&o&&x?Se(o,(u?w.length:m.length)!==0):null,T?null:f("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let R=d;return x&&o&&(R=f(me,{onResize:this.handleTabsResize},{default:()=>d})),f("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},R,x?f("div",{class:`${e}-tabs-pad`}):null,x?null:f("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),r&&o&&x?Se(o,!0):null,ge(v,d=>d&&f("div",{class:`${e}-tabs-nav__suffix`},d))),u&&(this.animated?f("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},we(w,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):we(w,this.mergedValue,this.renderedNames)))}});function we(e,a,r,o,i,s,p){const c=[];return e.forEach(g=>{const{name:v,displayDirective:w,"display-directive":m}=g.props,u=S=>w===S||m===S,x=a===v;if(g.key!==void 0&&(g.key=v),x||u("show")||u("show:lazy")&&r.has(v)){r.has(v)||r.add(v);const S=!u("if");c.push(S?Lt(g,[[jt,x]]):g)}}),p?f(It,{name:`${p}-transition`,onBeforeLeave:o,onEnter:i,onAfterEnter:s},{default:()=>c}):c}function Se(e,a){return f(ie,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:a,disabled:typeof e=="object"&&e.disabled})}function Re(e){const a=kt(e);return a.props?a.props.internalLeftPadded=!0:a.props={internalLeftPadded:!0},a}function oe(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}export{da as N,fa as a,ba as b,ca as c,Zt as d,Ot as g};
