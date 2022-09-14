var To=Object.defineProperty,Po=Object.defineProperties;var Ao=Object.getOwnPropertyDescriptors;var vn=Object.getOwnPropertySymbols;var No=Object.prototype.hasOwnProperty,Vo=Object.prototype.propertyIsEnumerable;var gn=(e,t,n)=>t in e?To(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_t=(e,t)=>{for(var n in t||(t={}))No.call(t,n)&&gn(e,n,t[n]);if(vn)for(var n of vn(t))Vo.call(t,n)&&gn(e,n,t[n]);return e},Mt=(e,t)=>Po(e,Ao(t));var Re=(e,t,n)=>new Promise((o,r)=>{var a=d=>{try{c(n.next(d))}catch(i){r(i)}},l=d=>{try{c(n.throw(d))}catch(i){r(i)}},c=d=>d.done?o(d.value):Promise.resolve(d.value).then(a,l);c((n=n.apply(e,t)).next())});import{d as V,r as I,a1 as Lo,a2 as Uo,a3 as h,a4 as xn,a5 as Mo,a6 as $t,a7 as Oo,a8 as _,a9 as U,aa as M,ab as Pe,ac as jo,ad as je,ae as Ee,af as He,ag as Ze,ah as Ae,ai as it,aj as Qe,ak as Xe,al as st,i as L,am as Pt,an as dt,ao as dn,ap as ft,aq as Yt,ar as Kt,as as Jt,at as Ho,au as Wo,av as G,aw as At,ax as Hn,ay as we,az as Xo,aA as Nt,aB as _e,aC as tt,S as Te,aD as be,aE as ct,aF as qo,aG as Zt,aH as Go,aI as Yo,aJ as Ko,aK as Jo,aL as Zo,w as me,aM as Qo,aN as le,aO as et,aP as kt,aQ as ea,aR as ta,aS as gt,aT as na,V as De,aU as oa,aV as aa,aW as Fe,aX as Wn,aY as Dt,aZ as ra,a_ as mt,a$ as Xn,b0 as bt,b1 as ht,b2 as la,b3 as ia,b4 as sa,b5 as Qt,b6 as da,b7 as yn,b8 as _n,b9 as ca,ba as ua,F as $e,bb as pa,bc as fa,bd as ha,be as ma,bf as ba,bg as wn,bh as va,bi as ga,a as Vt,f as ot,o as F,c as ee,b as ue,t as nt,l as Ne,u as x,_ as Ce,bj as Be,T as z,e as Ve,A as K,n as Lt,bk as xa,q as Se,bl as en,bm as Cn,v as qn,H as Sn,X as Bt,E as H,D as ya,bn as _a,m as It,bo as cn,K as tn,bp as wa,bq as Gn,P as Me,br as Ca,bs as Sa,bt as xt,bu as Yn,bv as Kn,bw as Jn,z as un,bx as ka,W as Ue,by as Ra,bz as $a,Z as Da,Y as Zn,bA as Qn,bB as pn,bC as Ba,O as Ia,h as za,bD as ye,bE as Ut,bF as nn,bG as Fa,bH as Ea,bI as eo,bJ as Ta,bK as Pa,bL as kn,bM as Ot,bN as Aa}from"./index.394616ab.js";import{u as to,a as no,S as Na}from"./Shape.f45d993c.js";import{e as ze,u as zt}from"./useEventBus.5a4ae06c.js";import{u as Va,s as La,g as Ua}from"./pages.499cc291.js";import{N as yt,a as fn,b as Ft}from"./FormItem.e3d7c9a7.js";import"./index.534d16de.js";function oo(e,t,n){t/=100,n/=100;const o=t*Math.min(n,1-n)+n;return[e,o?(2-2*n/o)*100:0,o*100]}function Rt(e,t,n){t/=100,n/=100;const o=n-n*t/2,r=Math.min(o,1-o);return[e,r?(n-o)/r*100:0,o*100]}function Oe(e,t,n){t/=100,n/=100;let o=(r,a=(r+e/60)%6)=>n-n*t*Math.max(Math.min(a,4-a,1),0);return[o(5)*255,o(3)*255,o(1)*255]}function on(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(a<0?a+6:a),o&&r/o*100,o*100]}function an(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=1-Math.abs(o+o-r-1),l=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(l<0?l+6:l),a?r/a*100:0,(o+o-r)*50]}function rn(e,t,n){t/=100,n/=100;let o=t*Math.min(n,1-n),r=(a,l=(a+e/30)%12)=>n-o*Math.max(Math.min(l-3,9-l,1),-1);return[r(0)*255,r(8)*255,r(4)*255]}function ao(e,t="default",n=[]){const r=e.$slots[t];return r===void 0?n:r()}function Rn(e,t="default",n=[]){const{children:o}=e;if(o!==null&&typeof o=="object"&&!Array.isArray(o)){const r=o[t];if(typeof r=="function")return r()}return n}const Ma=xn(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[xn("&::-webkit-scrollbar",{width:0,height:0})]),Oa=V({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=I(null);function t(r){!(r.currentTarget.offsetWidth<r.currentTarget.scrollWidth)||r.deltaY===0||(r.currentTarget.scrollLeft+=r.deltaY+r.deltaX,r.preventDefault())}const n=Lo();return Ma.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Uo,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...r){var a;(a=e.value)===null||a===void 0||a.scrollTo(...r)}})},render(){return h("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var ja=/\s/;function Ha(e){for(var t=e.length;t--&&ja.test(e.charAt(t)););return t}var Wa=/^\s+/;function Xa(e){return e&&e.slice(0,Ha(e)+1).replace(Wa,"")}var $n=0/0,qa=/^[-+]0x[0-9a-f]+$/i,Ga=/^0b[01]+$/i,Ya=/^0o[0-7]+$/i,Ka=parseInt;function Dn(e){if(typeof e=="number")return e;if(Mo(e))return $n;if($t(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=$t(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Xa(e);var n=Ga.test(e);return n||Ya.test(e)?Ka(e.slice(2),n?2:8):qa.test(e)?$n:+e}var Ja=function(){return Oo.Date.now()};const jt=Ja;var Za="Expected a function",Qa=Math.max,er=Math.min;function ln(e,t,n){var o,r,a,l,c,d,i=0,p=!1,s=!1,f=!0;if(typeof e!="function")throw new TypeError(Za);t=Dn(t)||0,$t(n)&&(p=!!n.leading,s="maxWait"in n,a=s?Qa(Dn(n.maxWait)||0,t):a,f="trailing"in n?!!n.trailing:f);function m(D){var v=o,g=r;return o=r=void 0,i=D,l=e.apply(g,v),l}function y(D){return i=D,c=setTimeout(S,t),p?m(D):l}function C(D){var v=D-d,g=D-i,w=t-v;return s?er(w,a-g):w}function b(D){var v=D-d,g=D-i;return d===void 0||v>=t||v<0||s&&g>=a}function S(){var D=jt();if(b(D))return R(D);c=setTimeout(S,C(D))}function R(D){return c=void 0,f&&o?m(D):(o=r=void 0,l)}function E(){c!==void 0&&clearTimeout(c),i=0,o=d=r=c=void 0}function P(){return c===void 0?l:R(jt())}function O(){var D=jt(),v=b(D);if(o=arguments,r=this,d=D,v){if(c===void 0)return y(d);if(s)return clearTimeout(c),c=setTimeout(S,t),m(d)}return c===void 0&&(c=setTimeout(S,t)),l}return O.cancel=E,O.flush=P,O}var tr="Expected a function";function Ht(e,t,n){var o=!0,r=!0;if(typeof e!="function")throw new TypeError(tr);return $t(n)&&(o="leading"in n?!!n.leading:o,r="trailing"in n?!!n.trailing:r),ln(e,t,{leading:o,maxWait:t,trailing:r})}const ro=V({name:"Add",render(){return h("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),nr=V({name:"ChevronLeft",render(){return h("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),or=V({name:"Remove",render(){return h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},h("line",{x1:"400",y1:"256",x2:"112",y2:"256",style:`
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `}))}}),ar=_("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[U(">",[_("input",[U("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),U("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),_("button",[U("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[M("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),U("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[M("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),U("*",[U("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[U(">",[_("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),_("base-selection",[_("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),_("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),M("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),U("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[U(">",[_("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),_("base-selection",[_("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),_("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),M("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),rr={},lr=V({name:"InputGroup",props:rr,setup(e){const{mergedClsPrefixRef:t}=Pe(e);return jo("-input-group",ar,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return h("div",{class:`${e}-input-group`},this.$slots)}});function ir(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function vt(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function sr(e){return e=Math.round(e),e>=360?359:e<0?0:e}function dr(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const cr={rgb:{hex(e){return je(Ee(e))},hsl(e){const[t,n,o,r]=Ee(e);return He([...an(t,n,o),r])},hsv(e){const[t,n,o,r]=Ee(e);return Ze([...on(t,n,o),r])}},hex:{rgb(e){return Ae(Ee(e))},hsl(e){const[t,n,o,r]=Ee(e);return He([...an(t,n,o),r])},hsv(e){const[t,n,o,r]=Ee(e);return Ze([...on(t,n,o),r])}},hsl:{hex(e){const[t,n,o,r]=it(e);return je([...rn(t,n,o),r])},rgb(e){const[t,n,o,r]=it(e);return Ae([...rn(t,n,o),r])},hsv(e){const[t,n,o,r]=it(e);return Ze([...oo(t,n,o),r])}},hsv:{hex(e){const[t,n,o,r]=Qe(e);return je([...Oe(t,n,o),r])},rgb(e){const[t,n,o,r]=Qe(e);return Ae([...Oe(t,n,o),r])},hsl(e){const[t,n,o,r]=Qe(e);return He([...Rt(t,n,o),r])}}};function lo(e,t,n){return n=n||vt(e),n?n===t?e:cr[n][t](e):null}const lt="12px",ur=12,Ye="6px",pr=6,fr="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",hr=V({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=I(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:c,left:d}=l.getBoundingClientRect(),i=sr((a.clientX-d-pr)/(c-ur)*360);e.onUpdateHue(i)}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-slider`,style:{height:lt,borderRadius:Ye}},h("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:fr,height:lt,borderRadius:Ye,position:"relative"},onMousedown:this.handleMouseDown},h("div",{style:{position:"absolute",left:Ye,right:Ye,top:0,bottom:0}},h("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Ye})`,borderRadius:Ye,width:lt,height:lt}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Ye,width:lt,height:lt}})))))}}),pt="12px",mr=12,Ke="6px",br=V({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=I(null);function n(a){!t.value||!e.rgba||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:c,left:d}=l.getBoundingClientRect(),i=(a.clientX-d)/(c-mr);e.onUpdateAlpha(dr(i))}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,railBackgroundImage:L(()=>{const{rgba:a}=e;return a?`linear-gradient(to right, rgba(${a[0]}, ${a[1]}, ${a[2]}, 0) 0%, rgba(${a[0]}, ${a[1]}, ${a[2]}, 1) 100%)`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:pt,borderRadius:Ke},onMousedown:this.handleMouseDown},h("div",{style:{borderRadius:Ke,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},h("div",{class:`${e}-color-picker-checkboard`}),h("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&h("div",{style:{position:"absolute",left:Ke,right:Ke,top:0,bottom:0}},h("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Ke})`,borderRadius:Ke,width:pt,height:pt}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Ae(this.rgba),borderRadius:Ke,width:pt,height:pt}}))))}}),wt="12px",Ct="6px",vr=V({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=I(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:c,height:d,left:i,bottom:p}=l.getBoundingClientRect(),s=(p-a.clientY)/d,f=(a.clientX-i)/c,m=100*(f>1?1:f<0?0:f),y=100*(s>1?1:s<0?0:s);e.onUpdateSV(m,y)}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{palleteRef:t,handleColor:L(()=>{const{rgba:a}=e;return a?`rgb(${a[0]}, ${a[1]}, ${a[2]})`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},h("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),h("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&h("div",{class:`${e}-color-picker-handle`,style:{width:wt,height:wt,borderRadius:Ct,left:`calc(${this.displayedSv[0]}% - ${Ct})`,bottom:`calc(${this.displayedSv[1]}% - ${Ct})`}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Ct,width:wt,height:wt}})))}}),hn=Pt("n-color-picker");function gr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function xr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function yr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function _r(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function wr(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const Cr={paddingSmall:"0 4px"},Bn=V({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=I(""),{themeRef:n}=dt(hn,null);dn(()=>{t.value=o()});function o(){const{value:l}=e;if(l===null)return"";const{label:c}=e;return c==="HEX"?l:c==="A"?`${Math.floor(l*100)}%`:String(Math.floor(l))}function r(l){t.value=l}function a(l){let c,d;switch(e.label){case"HEX":d=_r(l),d&&e.onUpdateValue(l),t.value=o();break;case"H":c=xr(l),c===!1?t.value=o():e.onUpdateValue(c);break;case"S":case"L":case"V":c=yr(l),c===!1?t.value=o():e.onUpdateValue(c);break;case"A":c=wr(l),c===!1?t.value=o():e.onUpdateValue(c);break;case"R":case"G":case"B":c=gr(l),c===!1?t.value=o():e.onUpdateValue(c);break}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:r}},render(){const{mergedTheme:e}=this;return h(yt,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:Cr,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),Sr=V({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){const{showAlpha:o}=e;if(e.mode==="hex"){e.onUpdateValue((o?je:ft)(n));return}let r;switch(e.valueArr===null?r=[0,0,0,0]:r=Array.from(e.valueArr),e.mode){case"hsv":r[t]=n,e.onUpdateValue((o?Ze:Jt)(r));break;case"rgb":r[t]=n,e.onUpdateValue((o?Ae:Kt)(r));break;case"hsl":r[t]=n,e.onUpdateValue((o?He:Yt)(r));break}}}},render(){const{clsPrefix:e,modes:t}=this;return h("div",{class:`${e}-color-picker-input`},h("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),h(lr,null,{default:()=>{const{mode:n,valueArr:o,showAlpha:r}=this;if(n==="hex"){let a=null;try{a=o===null?null:(r?je:ft)(o)}catch(l){}return h(Bn,{label:"HEX",showAlpha:r,value:a,onUpdateValue:l=>{this.handleUnitUpdateValue(0,l)}})}return(n+(r?"a":"")).split("").map((a,l)=>h(Bn,{label:a.toUpperCase(),value:o===null?null:o[l],onUpdateValue:c=>{this.handleUnitUpdateValue(l,c)}}))}}))}}),kr=V({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:n}=dt(hn,null);return()=>{const{hsla:o,value:r,clsPrefix:a,onClick:l,disabled:c}=e,d=t.label||n.value;return h("div",{class:[`${a}-color-picker-trigger`,c&&`${a}-color-picker-trigger--disabled`],onClick:c?void 0:l},h("div",{class:`${a}-color-picker-trigger__fill`},h("div",{class:`${a}-color-picker-checkboard`}),h("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:o?He(o):""}}),r&&o?h("div",{class:`${a}-color-picker-trigger__value`,style:{color:o[2]>50||o[3]<.5?"black":"white"}},d?d(r):r):null))}}});function Rr(e,t){if(t==="hsv"){const[n,o,r,a]=Qe(e);return Ae([...Oe(n,o,r),a])}return e}function $r(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const Dr=V({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=L(()=>e.swatches.map(a=>{const l=vt(a);return{value:a,mode:l,legalValue:Rr(a,l)}}));function n(a){const{mode:l}=e;let{value:c,mode:d}=a;return d||(d="hex",/^[a-zA-Z]+$/.test(c)?c=$r(c):(Ho("color-picker",`color ${c} in swatches is invalid.`),c="#000000")),d===l?c:lo(c,l,d)}function o(a){e.onUpdateColor(n(a))}function r(a,l){a.key==="Enter"&&o(l)}return{parsedSwatchesRef:t,handleSwatchSelect:o,handleSwatchKeyDown:r}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>h("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>this.handleSwatchSelect(t),onKeydown:n=>this.handleSwatchKeyDown(n,t)},h("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),Br=V({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=vt(e);return Boolean(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(n){var o;const r=n.target.value;(o=e.onUpdateColor)===null||o===void 0||o.call(e,lo(r.toUpperCase(),e.mode,"hex")),n.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-preview__preview`},h("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),h("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Ir=U([_("color-picker",`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 `),_("color-picker-panel",`
 margin: 4px 0;
 width: 240px;
 font-size: var(--n-panel-font-size);
 color: var(--n-text-color);
 background-color: var(--n-color);
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 `,[Wo(),_("input",`
 text-align: center;
 `)]),_("color-picker-checkboard",`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[U("&::after",`
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 12px 12px;
 background-position: 0 0, 0 6px, 6px -6px, -6px 0px;
 background-repeat: repeat;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),_("color-picker-slider",`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[M("image",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),U("&::after",`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),_("color-picker-handle",`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[M("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),_("color-picker-pallete",`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[M("layer",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[G("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),_("color-picker-preview",`
 display: flex;
 `,[M("sliders",`
 flex: 1 0 auto;
 `),M("preview",`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),M("fill",`
 display: block;
 width: 30px;
 height: 30px;
 `),M("input",`
 position: absolute;
 top: 0;
 left: 0;
 width: 30px;
 height: 30px;
 opacity: 0;
 z-index: 1;
 `)]),_("color-picker-input",`
 display: flex;
 align-items: center;
 `,[_("input",`
 flex-grow: 1;
 flex-basis: 0;
 `),M("mode",`
 width: 72px;
 text-align: center;
 `)]),_("color-picker-control",`
 padding: 12px;
 `),_("color-picker-action",`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[_("button","margin-left: 8px;")]),_("color-picker-trigger",`
 border: var(--n-border);
 height: 100%;
 box-sizing: border-box;
 border-radius: var(--n-border-radius);
 transition: border-color .3s var(--n-bezier);
 cursor: pointer;
 `,[M("value",`
 white-space: nowrap;
 position: relative;
 `),M("fill",`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),G("disabled","cursor: not-allowed"),_("color-picker-checkboard",`
 border-radius: var(--n-border-radius);
 `,[U("&::after",`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),_("color-picker-swatches",`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[_("color-picker-swatch",`
 width: 18px;
 height: 18px;
 background-image: linear-gradient(45deg, #DDD 25%, #0000 25%), linear-gradient(-45deg, #DDD 25%, #0000 25%), linear-gradient(45deg, #0000 75%, #DDD 75%), linear-gradient(-45deg, #0000 75%, #DDD 75%);
 background-size: 8px 8px;
 background-position: 0px 0, 0px 4px, 4px -4px, -4px 0px;
 background-repeat: repeat;
 `,[M("fill",`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),U("&:focus",`
 outline: none;
 `,[M("fill",[U("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),zr=Object.assign(Object.assign({},we.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:Zt.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Et=V({name:"ColorPicker",props:zr,setup(e,{slots:t}){const n=I(null);let o=null;const r=At(e),{mergedSizeRef:a,mergedDisabledRef:l}=r,{localeRef:c}=Hn("global"),{mergedClsPrefixRef:d,namespaceRef:i,inlineThemeDisabled:p}=Pe(e),s=we("ColorPicker","-color-picker",Ir,Xo,e,d);Nt(hn,{themeRef:s,renderLabelRef:_e(e,"renderLabel"),colorPickerSlots:t});const f=I(e.defaultShow),m=tt(_e(e,"show"),f);function y(u){const{onUpdateShow:k,"onUpdate:show":A}=e;k&&le(k,u),A&&le(A,u),f.value=u}const{defaultValue:C}=e,b=I(C===void 0?ir(e.modes,e.showAlpha):C),S=tt(_e(e,"value"),b),R=I([S.value]),E=I(0),P=L(()=>vt(S.value)),{modes:O}=e,D=I(vt(S.value)||O[0]||"rgb");function v(){const{modes:u}=e,{value:k}=D,A=u.findIndex(X=>X===k);~A?D.value=u[(A+1)%u.length]:D.value="rgb"}let g,w,B,N,q,ie,se,j;const J=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"hsv":return Qe(u);case"hsl":return[g,w,B,j]=it(u),[...oo(g,w,B),j];case"rgb":case"hex":return[q,ie,se,j]=Ee(u),[...on(q,ie,se),j]}}),W=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"rgb":case"hex":return Ee(u);case"hsv":return[g,w,N,j]=Qe(u),[...Oe(g,w,N),j];case"hsl":return[g,w,B,j]=it(u),[...rn(g,w,B),j]}}),Y=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"hsl":return it(u);case"hsv":return[g,w,N,j]=Qe(u),[...Rt(g,w,N),j];case"rgb":case"hex":return[q,ie,se,j]=Ee(u),[...an(q,ie,se),j]}}),pe=L(()=>{switch(D.value){case"rgb":case"hex":return W.value;case"hsv":return J.value;case"hsl":return Y.value}}),fe=I(0),ve=I(1),oe=I([0,0]);function xe(u,k){const{value:A}=J,X=fe.value,te=A?A[3]:1;oe.value=[u,k];const{showAlpha:Q}=e;switch(D.value){case"hsv":ne((Q?Ze:Jt)([X,u,k,te]),"cursor");break;case"hsl":ne((Q?He:Yt)([...Rt(X,u,k),te]),"cursor");break;case"rgb":ne((Q?Ae:Kt)([...Oe(X,u,k),te]),"cursor");break;case"hex":ne((Q?je:ft)([...Oe(X,u,k),te]),"cursor");break}}function de(u){fe.value=u;const{value:k}=J;if(!k)return;const[,A,X,te]=k,{showAlpha:Q}=e;switch(D.value){case"hsv":ne((Q?Ze:Jt)([u,A,X,te]),"cursor");break;case"rgb":ne((Q?Ae:Kt)([...Oe(u,A,X),te]),"cursor");break;case"hex":ne((Q?je:ft)([...Oe(u,A,X),te]),"cursor");break;case"hsl":ne((Q?He:Yt)([...Rt(u,A,X),te]),"cursor");break}}function ae(u){switch(D.value){case"hsv":[g,w,N]=J.value,ne(Ze([g,w,N,u]),"cursor");break;case"rgb":[q,ie,se]=W.value,ne(Ae([q,ie,se,u]),"cursor");break;case"hex":[q,ie,se]=W.value,ne(je([q,ie,se,u]),"cursor");break;case"hsl":[g,w,B]=Y.value,ne(He([g,w,B,u]),"cursor");break}ve.value=u}function ne(u,k){k==="cursor"?o=u:o=null;const{nTriggerFormChange:A,nTriggerFormInput:X}=r,{onUpdateValue:te,"onUpdate:value":Q}=e;te&&le(te,u),Q&&le(Q,u),A(),X(),b.value=u}function ge(u){ne(u,"input"),kt(ke)}function ke(u=!0){const{value:k}=S;if(k){const{nTriggerFormChange:A,nTriggerFormInput:X}=r,{onComplete:te}=e;te&&te(k);const{value:Q}=R,{value:ce}=E;u&&(Q.splice(ce+1,Q.length,k),E.value=ce+1),A(),X()}}function Le(){const{value:u}=E;u-1<0||(ne(R.value[u-1],"input"),ke(!1),E.value=u-1)}function at(){const{value:u}=E;u<0||u+1>=R.value.length||(ne(R.value[u+1],"input"),ke(!1),E.value=u+1)}function ut(){const{value:u}=S,{onConfirm:k}=e;k&&k(u),y(!1)}const rt=L(()=>E.value>=1),Ie=L(()=>{const{value:u}=R;return u.length>1&&E.value<u.length-1});Te(m,u=>{u||(R.value=[S.value],E.value=0)}),dn(()=>{if(!(o&&o===S.value)){const{value:u}=J;u&&(fe.value=u[0],ve.value=u[3],oe.value=[u[1],u[2]])}o=null});const $=L(()=>{const{value:u}=a,{common:{cubicBezierEaseInOut:k},self:{textColor:A,color:X,panelFontSize:te,boxShadow:Q,border:ce,borderRadius:re,dividerColor:he,[be("height",u)]:qe,[be("fontSize",u)]:Ge}}=s.value;return{"--n-bezier":k,"--n-text-color":A,"--n-color":X,"--n-panel-font-size":te,"--n-font-size":Ge,"--n-box-shadow":Q,"--n-border":ce,"--n-border-radius":re,"--n-height":qe,"--n-divider-color":he}}),T=p?ct("color-picker",L(()=>a.value[0]),$,e):void 0;function Z(){var u;const{value:k}=W,{value:A}=fe,{internalActions:X,modes:te,actions:Q}=e,{value:ce}=s,{value:re}=d;return h("div",{class:[`${re}-color-picker-panel`,T==null?void 0:T.themeClass.value],onDragstart:he=>{he.preventDefault()},style:p?void 0:$.value},h("div",{class:`${re}-color-picker-control`},h(vr,{clsPrefix:re,rgba:k,displayedHue:A,displayedSv:oe.value,onUpdateSV:xe,onComplete:ke}),h("div",{class:`${re}-color-picker-preview`},h("div",{class:`${re}-color-picker-preview__sliders`},h(hr,{clsPrefix:re,hue:A,onUpdateHue:de,onComplete:ke}),e.showAlpha?h(br,{clsPrefix:re,rgba:k,alpha:ve.value,onUpdateAlpha:ae,onComplete:ke}):null),e.showPreview?h(Br,{clsPrefix:re,mode:D.value,color:W.value&&ft(W.value),onUpdateColor:he=>ne(he,"input")}):null),h(Sr,{clsPrefix:re,showAlpha:e.showAlpha,mode:D.value,modes:te,onUpdateMode:v,value:S.value,valueArr:pe.value,onUpdateValue:ge}),((u=e.swatches)===null||u===void 0?void 0:u.length)&&h(Dr,{clsPrefix:re,mode:D.value,swatches:e.swatches,onUpdateColor:he=>ne(he,"input")})),Q!=null&&Q.length?h("div",{class:`${re}-color-picker-action`},Q.includes("confirm")&&h(et,{size:"small",onClick:ut,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>c.value.confirm})):null,t.action?h("div",{class:`${re}-color-picker-action`},{default:t.action}):X?h("div",{class:`${re}-color-picker-action`},X.includes("undo")&&h(et,{size:"small",onClick:Le,disabled:!rt.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>c.value.undo}),X.includes("redo")&&h(et,{size:"small",onClick:at,disabled:!Ie.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>c.value.redo})):null)}return{mergedClsPrefix:d,namespace:i,selfRef:n,hsla:Y,rgba:W,mergedShow:m,mergedDisabled:l,isMounted:qo(),adjustedTo:Zt(e),mergedValue:S,handleTriggerClick(){y(!0)},handleClickOutside(u){var k;!((k=n.value)===null||k===void 0)&&k.contains(Go(u))||y(!1)},renderPanel:Z,cssVars:p?void 0:$,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n==null||n(),h("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},h(Yo,null,{default:()=>[h(Ko,null,{default:()=>h(kr,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),h(Jo,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Zt.tdkey,to:this.adjustedTo},{default:()=>h(Zo,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?me(this.renderPanel(),[[Qo,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),Fr=_("collapse","width: 100%;",[_("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: 16px 0 0 0;
 `,[G("disabled",[M("header","cursor: not-allowed;",[M("header-main",`
 color: var(--n-title-text-color-disabled);
 `),_("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),_("collapse-item","margin-left: 32px;"),U("&:first-child","margin-top: 0;"),U("&:first-child >",[M("header","padding-top: 0;")]),G("left-arrow-placement",[M("header",[_("collapse-item-arrow","margin-right: 4px;")])]),G("right-arrow-placement",[M("header",[_("collapse-item-arrow","margin-left: 4px;")])]),M("content-wrapper",[M("content-inner","padding-top: 16px;"),ea({duration:"0.15s"})]),G("active",[M("header",[G("active",[_("collapse-item-arrow","transform: rotate(90deg);")])])]),U("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),M("header",`
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: 16px 0 0 0;
 color: var(--n-title-text-color);
 cursor: pointer;
 `,[M("header-main",`
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),M("header-extra",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 `),_("collapse-item-arrow",`
 display: flex;
 transition:
 transform .15s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: 18px;
 color: var(--n-arrow-color);
 `)])])]),Er=Object.assign(Object.assign({},we.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),io=Pt("n-collapse"),so=V({name:"Collapse",props:Er,setup(e,{slots:t}){const{mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedRtlRef:r}=Pe(e),a=I(e.defaultExpandedNames),l=L(()=>e.expandedNames),c=tt(l,a),d=we("Collapse","-collapse",Fr,ta,e,n);function i(C){const{"onUpdate:expandedNames":b,onUpdateExpandedNames:S,onExpandedNamesChange:R}=e;S&&le(S,C),b&&le(b,C),R&&le(R,C),a.value=C}function p(C){const{onItemHeaderClick:b}=e;b&&le(b,C)}function s(C,b,S){const{accordion:R}=e,{value:E}=c;if(R)C?(i([b]),p({name:b,expanded:!0,event:S})):(i([]),p({name:b,expanded:!1,event:S}));else if(!Array.isArray(E))i([b]),p({name:b,expanded:!0,event:S});else{const P=E.slice(),O=P.findIndex(D=>b===D);~O?(P.splice(O,1),i(P),p({name:b,expanded:!1,event:S})):(P.push(b),i(P),p({name:b,expanded:!0,event:S}))}}Nt(io,{props:e,mergedClsPrefixRef:n,expandedNamesRef:c,slots:t,toggleItem:s});const f=gt("Collapse",r,n),m=L(()=>{const{common:{cubicBezierEaseInOut:C},self:{titleFontWeight:b,dividerColor:S,titleTextColor:R,titleTextColorDisabled:E,textColor:P,arrowColor:O,fontSize:D,titleFontSize:v,arrowColorDisabled:g}}=d.value;return{"--n-font-size":D,"--n-bezier":C,"--n-text-color":P,"--n-divider-color":S,"--n-title-font-size":v,"--n-title-text-color":R,"--n-title-text-color-disabled":E,"--n-title-font-weight":b,"--n-arrow-color":O,"--n-arrow-color-disabled":g}}),y=o?ct("collapse",void 0,m,e):void 0;return{rtlEnabled:f,mergedTheme:d,mergedClsPrefix:n,cssVars:o?void 0:m,themeClass:y==null?void 0:y.themeClass,onRender:y==null?void 0:y.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),h("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),Tr=V({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:na(_e(e,"show"))}},render(){return h(oa,null,{default:()=>{const{show:e,displayDirective:t,onceTrue:n,clsPrefix:o}=this,r=t==="show"&&n,a=h("div",{class:`${o}-collapse-item__content-wrapper`},h("div",{class:`${o}-collapse-item__content-inner`},this.$slots));return r?me(a,[[De,e]]):e?a:null}})}}),Pr={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},co=V({name:"CollapseItem",props:Pr,setup(e){const{mergedRtlRef:t}=Pe(e),n=aa(),o=Fe(()=>{var s;return(s=e.name)!==null&&s!==void 0?s:n}),r=dt(io);r||Wn("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:a,props:l,mergedClsPrefixRef:c,slots:d}=r,i=L(()=>{const{value:s}=a;if(Array.isArray(s)){const{value:f}=o;return!~s.findIndex(m=>m===f)}else if(s){const{value:f}=o;return f!==s}return!0});return{rtlEnabled:gt("Collapse",t,c),collapseSlots:d,randomName:n,mergedClsPrefix:c,collapsed:i,mergedDisplayDirective:L(()=>{const{displayDirective:s}=e;return s||l.displayDirective}),arrowPlacement:L(()=>l.arrowPlacement),handleClick(s){r&&!e.disabled&&r.toggleItem(i.value,o.value,s)}}},render(){var e;const{collapseSlots:t,$slots:n,arrowPlacement:o,collapsed:r,mergedDisplayDirective:a,mergedClsPrefix:l,disabled:c}=this,d=n.header?n.header():this.title,i=n["header-extra"]||t["header-extra"],p=n.arrow||t.arrow;return h("div",{class:[`${l}-collapse-item`,`${l}-collapse-item--${o}-arrow-placement`,c&&`${l}-collapse-item--disabled`,!r&&`${l}-collapse-item--active`]},h("div",{class:[`${l}-collapse-item__header`,!r&&`${l}-collapse-item__header--active`]},h("div",{class:`${l}-collapse-item__header-main`,onClick:this.handleClick},o==="right"&&d,h("div",{class:`${l}-collapse-item-arrow`,key:this.rtlEnabled?0:1},p?p({collapsed:r}):h(Dt,{clsPrefix:l},{default:(e=t.expandIcon)!==null&&e!==void 0?e:()=>this.rtlEnabled?h(nr,null):h(ra,null)})),o==="left"&&d),i&&h("div",{class:`${l}-collapse-item__header-extra`,onClick:this.handleClick},{default:i})),h(Tr,{clsPrefix:l,displayDirective:a,show:!r},n))}}),Ar={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},uo=Pt("n-radio-group");function Nr(e){const t=At(e,{mergedSize(R){const{size:E}=e;if(E!==void 0)return E;if(l){const{mergedSizeRef:{value:P}}=l;if(P!==void 0)return P}return R?R.mergedSize.value:"medium"},mergedDisabled(R){return!!(e.disabled||l!=null&&l.disabledRef.value||R!=null&&R.disabled.value)}}),{mergedSizeRef:n,mergedDisabledRef:o}=t,r=I(null),a=I(null),l=dt(uo,null),c=I(e.defaultChecked),d=_e(e,"checked"),i=tt(d,c),p=Fe(()=>l?l.valueRef.value===e.value:i.value),s=Fe(()=>{const{name:R}=e;if(R!==void 0)return R;if(l)return l.nameRef.value}),f=I(!1);function m(){if(l){const{doUpdateValue:R}=l,{value:E}=e;le(R,E)}else{const{onUpdateChecked:R,"onUpdate:checked":E}=e,{nTriggerFormInput:P,nTriggerFormChange:O}=t;R&&le(R,!0),E&&le(E,!0),P(),O(),c.value=!0}}function y(){o.value||p.value||m()}function C(){y()}function b(){f.value=!1}function S(){f.value=!0}return{mergedClsPrefix:l?l.mergedClsPrefixRef:Pe(e).mergedClsPrefixRef,inputRef:r,labelRef:a,mergedName:s,mergedDisabled:o,uncontrolledChecked:c,renderSafeChecked:p,focus:f,mergedSize:n,handleRadioInputChange:C,handleRadioInputBlur:b,handleRadioInputFocus:S}}const Vr=_("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[G("checked",[M("dot",`
 background-color: var(--n-color-active);
 `)]),M("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),_("radio-input",`
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 cursor: pointer;
 `),M("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[U("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),G("checked",{boxShadow:"var(--n-box-shadow-active)"},[U("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),M("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),mt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[M("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),G("focus",[U("&:not(:active)",[M("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),G("disabled",`
 cursor: not-allowed;
 `,[M("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[U("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),G("checked",`
 opacity: 1;
 `)]),M("label",{color:"var(--n-text-color-disabled)"}),_("radio-input",`
 cursor: not-allowed;
 `)])]),Lr=V({name:"Radio",props:Object.assign(Object.assign({},we.props),Ar),setup(e){const t=Nr(e),n=we("Radio","-radio",Vr,Xn,e,t.mergedClsPrefix),o=L(()=>{const{mergedSize:{value:i}}=t,{common:{cubicBezierEaseInOut:p},self:{boxShadow:s,boxShadowActive:f,boxShadowDisabled:m,boxShadowFocus:y,boxShadowHover:C,color:b,colorDisabled:S,colorActive:R,textColor:E,textColorDisabled:P,dotColorActive:O,dotColorDisabled:D,labelPadding:v,labelLineHeight:g,[be("fontSize",i)]:w,[be("radioSize",i)]:B}}=n.value;return{"--n-bezier":p,"--n-label-line-height":g,"--n-box-shadow":s,"--n-box-shadow-active":f,"--n-box-shadow-disabled":m,"--n-box-shadow-focus":y,"--n-box-shadow-hover":C,"--n-color":b,"--n-color-active":R,"--n-color-disabled":S,"--n-dot-color-active":O,"--n-dot-color-disabled":D,"--n-font-size":w,"--n-radio-size":B,"--n-text-color":E,"--n-text-color-disabled":P,"--n-label-padding":v}}),{inlineThemeDisabled:r,mergedClsPrefixRef:a,mergedRtlRef:l}=Pe(e),c=gt("Radio",l,a),d=r?ct("radio",L(()=>t.mergedSize.value[0]),o,e):void 0;return Object.assign(t,{rtlEnabled:c,cssVars:r?void 0:o,themeClass:d==null?void 0:d.themeClass,onRender:d==null?void 0:d.onRender})},render(){const{$slots:e,mergedClsPrefix:t,onRender:n,label:o}=this;return n==null||n(),h("label",{class:[`${t}-radio`,this.themeClass,{[`${t}-radio--rtl`]:this.rtlEnabled,[`${t}-radio--disabled`]:this.mergedDisabled,[`${t}-radio--checked`]:this.renderSafeChecked,[`${t}-radio--focus`]:this.focus}],style:this.cssVars},h("input",{ref:"inputRef",type:"radio",class:`${t}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),h("div",{class:`${t}-radio__dot-wrapper`},"\xA0",h("div",{class:[`${t}-radio__dot`,this.renderSafeChecked&&`${t}-radio__dot--checked`]})),bt(e.default,r=>!r&&!o?null:h("div",{ref:"labelRef",class:`${t}-radio__label`},r||o)))}}),Ur=_("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[M("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[G("checked",{backgroundColor:"var(--n-button-border-color-active)"}),G("disabled",{opacity:"var(--n-opacity-disabled)"})]),G("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[_("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),M("splitor",{height:"var(--n-height)"})]),_("radio-button",`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[_("radio-input",`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),M("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),U("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[M("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),U("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[M("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),mt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[M("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),mt("checked",{color:"var(--n-button-text-color-hover)"})]),G("focus",[U("&:not(:active)",[M("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),G("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),G("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function Mr(e,t,n){var o;const r=[];let a=!1;for(let l=0;l<e.length;++l){const c=e[l],d=(o=c.type)===null||o===void 0?void 0:o.name;d==="RadioButton"&&(a=!0);const i=c.props;if(d!=="RadioButton"){r.push(c);continue}if(l===0)r.push(c);else{const p=r[r.length-1].props,s=t===p.value,f=p.disabled,m=t===i.value,y=i.disabled,C=(s?2:0)+(f?0:1),b=(m?2:0)+(y?0:1),S={[`${n}-radio-group__splitor--disabled`]:f,[`${n}-radio-group__splitor--checked`]:s},R={[`${n}-radio-group__splitor--disabled`]:y,[`${n}-radio-group__splitor--checked`]:m},E=C<b?R:S;r.push(h("div",{class:[`${n}-radio-group__splitor`,E]}),c)}}return{children:r,isButtonGroup:a}}const Or=Object.assign(Object.assign({},we.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),jr=V({name:"RadioGroup",props:Or,setup(e){const t=I(null),{mergedSizeRef:n,mergedDisabledRef:o,nTriggerFormChange:r,nTriggerFormInput:a,nTriggerFormBlur:l,nTriggerFormFocus:c}=At(e),{mergedClsPrefixRef:d,inlineThemeDisabled:i,mergedRtlRef:p}=Pe(e),s=we("Radio","-radio-group",Ur,Xn,e,d),f=I(e.defaultValue),m=_e(e,"value"),y=tt(m,f);function C(O){const{onUpdateValue:D,"onUpdate:value":v}=e;D&&le(D,O),v&&le(v,O),f.value=O,r(),a()}function b(O){const{value:D}=t;!D||D.contains(O.relatedTarget)||c()}function S(O){const{value:D}=t;!D||D.contains(O.relatedTarget)||l()}Nt(uo,{mergedClsPrefixRef:d,nameRef:_e(e,"name"),valueRef:y,disabledRef:o,mergedSizeRef:n,doUpdateValue:C});const R=gt("Radio",p,d),E=L(()=>{const{value:O}=n,{common:{cubicBezierEaseInOut:D},self:{buttonBorderColor:v,buttonBorderColorActive:g,buttonBorderRadius:w,buttonBoxShadow:B,buttonBoxShadowFocus:N,buttonBoxShadowHover:q,buttonColorActive:ie,buttonTextColor:se,buttonTextColorActive:j,buttonTextColorHover:J,opacityDisabled:W,[be("buttonHeight",O)]:Y,[be("fontSize",O)]:pe}}=s.value;return{"--n-font-size":pe,"--n-bezier":D,"--n-button-border-color":v,"--n-button-border-color-active":g,"--n-button-border-radius":w,"--n-button-box-shadow":B,"--n-button-box-shadow-focus":N,"--n-button-box-shadow-hover":q,"--n-button-color-active":ie,"--n-button-text-color":se,"--n-button-text-color-hover":J,"--n-button-text-color-active":j,"--n-height":Y,"--n-opacity-disabled":W}}),P=i?ct("radio-group",L(()=>n.value[0]),E,e):void 0;return{selfElRef:t,rtlEnabled:R,mergedClsPrefix:d,mergedValue:y,handleFocusout:S,handleFocusin:b,cssVars:i?void 0:E,themeClass:P==null?void 0:P.themeClass,onRender:P==null?void 0:P.onRender}},render(){var e;const{mergedValue:t,mergedClsPrefix:n,handleFocusin:o,handleFocusout:r}=this,{children:a,isButtonGroup:l}=Mr(ht(ao(this)),t,n);return(e=this.onRender)===null||e===void 0||e.call(this),h("div",{onFocusin:o,onFocusout:r,ref:"selfElRef",class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,l&&`${n}-radio-group--button-group`],style:this.cssVars},a)}}),po=Symbol("DESCRIPTION_ITEM_FLAG");function Hr(e){return typeof e=="object"&&e&&!Array.isArray(e)?e.type&&e.type[po]:!1}const Wr=U([_("descriptions",{fontSize:"var(--n-font-size)"},[_("descriptions-separator",`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),_("descriptions-table-wrapper",[_("descriptions-table",[_("descriptions-table-row",[_("descriptions-table-header",{padding:"var(--n-th-padding)"}),_("descriptions-table-content",{padding:"var(--n-td-padding)"})])])]),mt("bordered",[_("descriptions-table-wrapper",[_("descriptions-table",[_("descriptions-table-row",[U("&:last-child",[_("descriptions-table-content",{paddingBottom:0})])])])])]),G("left-label-placement",[_("descriptions-table-content",[U("> *",{verticalAlign:"top"})])]),G("left-label-align",[U("th",{textAlign:"left"})]),G("center-label-align",[U("th",{textAlign:"center"})]),G("right-label-align",[U("th",{textAlign:"right"})]),G("bordered",[_("descriptions-table-wrapper",`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[_("descriptions-table",[_("descriptions-table-row",[U("&:not(:last-child)",[_("descriptions-table-content",{borderBottom:"1px solid var(--n-merged-border-color)"}),_("descriptions-table-header",{borderBottom:"1px solid var(--n-merged-border-color)"})]),_("descriptions-table-header",`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[U("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})]),_("descriptions-table-content",[U("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})])])])])]),_("descriptions-header",`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),_("descriptions-table-wrapper",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[_("descriptions-table",`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[_("descriptions-table-row",`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[_("descriptions-table-header",`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),_("descriptions-table-content",`
 vertical-align: top;
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-td-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[M("content",`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),M("label",`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),la(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),ia(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Xr=Object.assign(Object.assign({},we.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:"top"},labelAlign:{type:String,default:"left"},separator:{type:String,default:":"},size:{type:String,default:"medium"},bordered:Boolean,labelStyle:[Object,String],contentStyle:[Object,String]}),qr=V({name:"Descriptions",props:Xr,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=Pe(e),o=we("Descriptions","-descriptions",Wr,sa,e,t),r=L(()=>{const{size:l,bordered:c}=e,{common:{cubicBezierEaseInOut:d},self:{titleTextColor:i,thColor:p,thColorModal:s,thColorPopover:f,thTextColor:m,thFontWeight:y,tdTextColor:C,tdColor:b,tdColorModal:S,tdColorPopover:R,borderColor:E,borderColorModal:P,borderColorPopover:O,borderRadius:D,lineHeight:v,[be("fontSize",l)]:g,[be(c?"thPaddingBordered":"thPadding",l)]:w,[be(c?"tdPaddingBordered":"tdPadding",l)]:B}}=o.value;return{"--n-title-text-color":i,"--n-th-padding":w,"--n-td-padding":B,"--n-font-size":g,"--n-bezier":d,"--n-th-font-weight":y,"--n-line-height":v,"--n-th-text-color":m,"--n-td-text-color":C,"--n-th-color":p,"--n-th-color-modal":s,"--n-th-color-popover":f,"--n-td-color":b,"--n-td-color-modal":S,"--n-td-color-popover":R,"--n-border-radius":D,"--n-border-color":E,"--n-border-color-modal":P,"--n-border-color-popover":O}}),a=n?ct("descriptions",L(()=>{let l="";const{size:c,bordered:d}=e;return d&&(l+="a"),l+=c[0],l}),r,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:r,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender,compitableColumn:Qt(e,["columns","column"]),inlineThemeDisabled:n}},render(){const e=this.$slots.default,t=e?ht(e()):[];t.length;const{compitableColumn:n,labelPlacement:o,labelAlign:r,size:a,bordered:l,title:c,cssVars:d,mergedClsPrefix:i,separator:p,onRender:s}=this;s==null||s();const f=t.filter(b=>Hr(b)),m={span:0,row:[],secondRow:[],rows:[]},C=f.reduce((b,S,R)=>{const E=S.props||{},P=f.length-1===R,O=["label"in E?E.label:Rn(S,"label")],D=[Rn(S)],v=E.span||1,g=b.span;b.span+=v;const w=E.labelStyle||E["label-style"]||this.labelStyle,B=E.contentStyle||E["content-style"]||this.contentStyle;if(o==="left")l?b.row.push(h("th",{class:`${i}-descriptions-table-header`,colspan:1,style:w},O),h("td",{class:`${i}-descriptions-table-content`,colspan:P?(n-g)*2+1:v*2-1,style:B},D)):b.row.push(h("td",{class:`${i}-descriptions-table-content`,colspan:P?(n-g)*2:v*2},h("span",{class:`${i}-descriptions-table-content__label`,style:w},[...O,p&&h("span",{class:`${i}-descriptions-separator`},p)]),h("span",{class:`${i}-descriptions-table-content__content`,style:B},D)));else{const N=P?(n-g)*2:v*2;b.row.push(h("th",{class:`${i}-descriptions-table-header`,colspan:N,style:w},O)),b.secondRow.push(h("td",{class:`${i}-descriptions-table-content`,colspan:N,style:B},D))}return(b.span>=n||P)&&(b.span=0,b.row.length&&(b.rows.push(b.row),b.row=[]),o!=="left"&&b.secondRow.length&&(b.rows.push(b.secondRow),b.secondRow=[])),b},m).rows.map(b=>h("tr",{class:`${i}-descriptions-table-row`},b));return h("div",{style:d,class:[`${i}-descriptions`,this.themeClass,`${i}-descriptions--${o}-label-placement`,`${i}-descriptions--${r}-label-align`,`${i}-descriptions--${a}-size`,l&&`${i}-descriptions--bordered`]},c||this.$slots.header?h("div",{class:`${i}-descriptions-header`},c||ao(this,"header")):null,h("div",{class:`${i}-descriptions-table-wrapper`},h("table",{class:`${i}-descriptions-table`},h("tbody",null,C))))}}),Gr={label:String,span:{type:Number,default:1},labelStyle:[Object,String],contentStyle:[Object,String]},Yr=V({name:"DescriptionsItem",[po]:!0,props:Gr,render(){return null}});function Kr(e){return e==null||typeof e=="string"&&e.trim()===""?null:Number(e)}function Jr(e){return e.includes(".")&&(/^(-)?\d+.*(\.|0)$/.test(e)||/^\.\d+$/.test(e))}function Wt(e){return e==null?!0:!Number.isNaN(e)}function In(e,t){return e==null?"":t===void 0?String(e):e.toFixed(t)}function Xt(e){if(e===null)return null;if(typeof e=="number")return e;{const t=Number(e);return Number.isNaN(t)?null:t}}const Zr=U([_("input-number-suffix",`
 display: inline-block;
 margin-right: 10px;
 `),_("input-number-prefix",`
 display: inline-block;
 margin-left: 10px;
 `)]),zn=800,Fn=100,Qr=Object.assign(Object.assign({},we.props),{autofocus:Boolean,loading:{type:Boolean,default:void 0},placeholder:String,defaultValue:{type:Number,default:null},value:Number,step:{type:[Number,String],default:1},min:[Number,String],max:[Number,String],size:String,disabled:{type:Boolean,default:void 0},validator:Function,bordered:{type:Boolean,default:void 0},showButton:{type:Boolean,default:!0},buttonPlacement:{type:String,default:"right"},readonly:Boolean,clearable:Boolean,keyboard:{type:Object,default:{}},updateValueOnInput:{type:Boolean,default:!0},parse:Function,format:Function,precision:Number,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onChange:[Function,Array]}),mn=V({name:"InputNumber",props:Qr,setup(e){const{mergedBorderedRef:t,mergedClsPrefixRef:n,mergedRtlRef:o}=Pe(e),r=we("InputNumber","-input-number",Zr,da,e,n),{localeRef:a}=Hn("InputNumber"),l=At(e),{mergedSizeRef:c,mergedDisabledRef:d,mergedStatusRef:i}=l,p=I(null),s=I(null),f=I(null),m=I(e.defaultValue),y=_e(e,"value"),C=tt(y,m),b=I(""),S=u=>{const k=String(u).split(".")[1];return k?k.length:0},R=u=>{const k=[e.min,e.max,e.step,u].map(A=>A===void 0?0:S(A));return Math.max(...k)},E=Fe(()=>{const{placeholder:u}=e;return u!==void 0?u:a.value.placeholder}),P=Fe(()=>{const u=Xt(e.step);return u!==null?u===0?1:Math.abs(u):1}),O=Fe(()=>{const u=Xt(e.min);return u!==null?u:null}),D=Fe(()=>{const u=Xt(e.max);return u!==null?u:null}),v=u=>{const{value:k}=C;if(u===k){w();return}const{"onUpdate:value":A,onUpdateValue:X,onChange:te}=e,{nTriggerFormInput:Q,nTriggerFormChange:ce}=l;te&&le(te,u),X&&le(X,u),A&&le(A,u),m.value=u,Q(),ce()},g=({offset:u,doUpdateIfValid:k,fixPrecision:A,isInputing:X})=>{const{value:te}=b;if(X&&Jr(te))return!1;const Q=(e.parse||Kr)(te);if(Q===null)return k&&v(null),null;if(Wt(Q)){const ce=S(Q),{precision:re}=e;if(re!==void 0&&re<ce&&!A)return!1;let he=parseFloat((Q+u).toFixed(re!=null?re:R(Q)));if(Wt(he)){const{value:qe}=D,{value:Ge}=O;if(qe!==null&&he>qe){if(!k||X)return!1;he=qe}if(Ge!==null&&he<Ge){if(!k||X)return!1;he=Ge}return e.validator&&!e.validator(he)?!1:(k&&v(he),he)}}return!1},w=()=>{const{value:u}=C;if(Wt(u)){const{format:k,precision:A}=e;k?b.value=k(u):u===null||A===void 0||S(u)>A?b.value=In(u,void 0):b.value=In(u,A)}else b.value=String(u)};w();const B=Fe(()=>g({offset:0,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})===!1),N=Fe(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=P;return g({offset:-k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1}),q=Fe(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=P;return g({offset:+k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1});function ie(u){const{onFocus:k}=e,{nTriggerFormFocus:A}=l;k&&le(k,u),A()}function se(u){var k,A;if(u.target===((k=p.value)===null||k===void 0?void 0:k.wrapperElRef))return;const X=g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0});if(X!==!1){const ce=(A=p.value)===null||A===void 0?void 0:A.inputElRef;ce&&(ce.value=String(X||"")),C.value===X&&w()}else w();const{onBlur:te}=e,{nTriggerFormBlur:Q}=l;te&&le(te,u),Q()}function j(u){const{onClear:k}=e;k&&le(k,u)}function J(){const{value:u}=q;if(!u){ge();return}const{value:k}=C;if(k===null)e.validator||v(fe());else{const{value:A}=P;g({offset:A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}function W(){const{value:u}=N;if(!u){ne();return}const{value:k}=C;if(k===null)e.validator||v(fe());else{const{value:A}=P;g({offset:-A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}const Y=ie,pe=se;function fe(){if(e.validator)return null;const{value:u}=O,{value:k}=D;return u!==null?Math.max(0,u):k!==null?Math.min(0,k):0}function ve(u){j(u),v(null)}function oe(u){var k,A,X;!((k=f.value)===null||k===void 0)&&k.$el.contains(u.target)&&u.preventDefault(),!((A=s.value)===null||A===void 0)&&A.$el.contains(u.target)&&u.preventDefault(),(X=p.value)===null||X===void 0||X.activate()}let xe=null,de=null,ae=null;function ne(){ae&&(window.clearTimeout(ae),ae=null),xe&&(window.clearInterval(xe),xe=null)}function ge(){Le&&(window.clearTimeout(Le),Le=null),de&&(window.clearInterval(de),de=null)}function ke(){ne(),ae=window.setTimeout(()=>{xe=window.setInterval(()=>{W()},Fn)},zn),Xe("mouseup",document,ne,{once:!0})}let Le=null;function at(){ge(),Le=window.setTimeout(()=>{de=window.setInterval(()=>{J()},Fn)},zn),Xe("mouseup",document,ge,{once:!0})}const ut=()=>{de||J()},rt=()=>{xe||W()};function Ie(u){var k,A;if(u.key==="Enter"){if(u.target===((k=p.value)===null||k===void 0?void 0:k.wrapperElRef))return;g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&((A=p.value)===null||A===void 0||A.deactivate())}else if(u.key==="ArrowUp"){if(!q.value||e.keyboard.ArrowUp===!1)return;u.preventDefault(),g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&J()}else if(u.key==="ArrowDown"){if(!N.value||e.keyboard.ArrowDown===!1)return;u.preventDefault(),g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&W()}}function $(u){b.value=u,e.updateValueOnInput&&!e.format&&!e.parse&&e.precision===void 0&&g({offset:0,doUpdateIfValid:!0,isInputing:!0,fixPrecision:!1})}Te(C,()=>{w()});const T={focus:()=>{var u;return(u=p.value)===null||u===void 0?void 0:u.focus()},blur:()=>{var u;return(u=p.value)===null||u===void 0?void 0:u.blur()}},Z=gt("InputNumber",o,n);return Object.assign(Object.assign({},T),{rtlEnabled:Z,inputInstRef:p,minusButtonInstRef:s,addButtonInstRef:f,mergedClsPrefix:n,mergedBordered:t,uncontrolledValue:m,mergedValue:C,mergedPlaceholder:E,displayedValueInvalid:B,mergedSize:c,mergedDisabled:d,displayedValue:b,addable:q,minusable:N,mergedStatus:i,handleFocus:Y,handleBlur:pe,handleClear:ve,handleMouseDown:oe,handleAddClick:ut,handleMinusClick:rt,handleAddMousedown:at,handleMinusMousedown:ke,handleKeyDown:Ie,handleUpdateDisplayedValue:$,mergedTheme:r,inputThemeOverrides:{paddingSmall:"0 8px 0 10px",paddingMedium:"0 8px 0 12px",paddingLarge:"0 8px 0 14px"},buttonThemeOverrides:L(()=>{const{self:{iconColorDisabled:u}}=r.value,[k,A,X,te]=Ee(u);return{textColorTextDisabled:`rgb(${k}, ${A}, ${X})`,opacityDisabled:`${te}`}})})},render(){const{mergedClsPrefix:e,$slots:t}=this,n=()=>h(_n,{text:!0,disabled:!this.minusable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleMinusClick,onMousedown:this.handleMinusMousedown,ref:"minusButtonInstRef"},{icon:()=>yn(t["minus-icon"],()=>[h(Dt,{clsPrefix:e},{default:()=>h(or,null)})])}),o=()=>h(_n,{text:!0,disabled:!this.addable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleAddClick,onMousedown:this.handleAddMousedown,ref:"addButtonInstRef"},{icon:()=>yn(t["add-icon"],()=>[h(Dt,{clsPrefix:e},{default:()=>h(ro,null)})])});return h("div",{class:[`${e}-input-number`,this.rtlEnabled&&`${e}-input-number--rtl`]},h(yt,{ref:"inputInstRef",autofocus:this.autofocus,status:this.mergedStatus,bordered:this.mergedBordered,loading:this.loading,value:this.displayedValue,onUpdateValue:this.handleUpdateDisplayedValue,theme:this.mergedTheme.peers.Input,themeOverrides:this.mergedTheme.peerOverrides.Input,builtinThemeOverrides:this.inputThemeOverrides,size:this.mergedSize,placeholder:this.mergedPlaceholder,disabled:this.mergedDisabled,readonly:this.readonly,textDecoration:this.displayedValueInvalid?"line-through":void 0,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onClear:this.handleClear,clearable:this.clearable,internalLoadingBeforeSuffix:!0},{prefix:()=>{var r;return this.showButton&&this.buttonPlacement==="both"?[n(),bt(t.prefix,a=>a?h("span",{class:`${e}-input-number-prefix`},a):null)]:(r=t.prefix)===null||r===void 0?void 0:r.call(t)},suffix:()=>{var r;return this.showButton?[bt(t.suffix,a=>a?h("span",{class:`${e}-input-number-suffix`},a):null),this.buttonPlacement==="right"?n():null,o()]:(r=t.suffix)===null||r===void 0?void 0:r.call(t)}}))}}),el=Object.assign(Object.assign({},we.props),{trigger:String,xScrollable:Boolean,onScroll:Function}),tl=V({name:"Scrollbar",props:el,setup(){const e=I(null);return Object.assign(Object.assign({},{scrollTo:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollTo(n[0],n[1])},scrollBy:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollBy(n[0],n[1])}}),{scrollbarInstRef:e})},render(){return h(ca,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),fo=tl,bn=Pt("n-tabs"),ho={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Je=V({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:ho,setup(e){const t=dt(bn,null);return t||Wn("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return h("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),nl=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ha(ho,["displayDirective"])),sn=V({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:nl,setup(e){const{mergedClsPrefixRef:t,valueRef:n,typeRef:o,closableRef:r,tabStyleRef:a,tabChangeIdRef:l,onBeforeLeaveRef:c,triggerRef:d,handleAdd:i,activateTab:p,handleClose:s}=dt(bn);return{trigger:d,mergedClosable:L(()=>{if(e.internalAddable)return!1;const{closable:f}=e;return f===void 0?r.value:f}),style:a,clsPrefix:t,value:n,type:o,handleClose(f){f.stopPropagation(),!e.disabled&&s(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){i();return}const{name:f}=e,m=++l.id;if(f!==n.value){const{value:y}=c;y?Promise.resolve(y(e.name,n.value)).then(C=>{C&&l.id===m&&p(f)}):p(f)}}}},render(){const{internalAddable:e,clsPrefix:t,name:n,disabled:o,label:r,tab:a,value:l,mergedClosable:c,style:d,trigger:i,$slots:{default:p}}=this,s=r!=null?r:a;return h("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?h("div",{class:`${t}-tabs-tab-pad`}):null,h("div",Object.assign({key:n,"data-name":n,"data-disabled":o?!0:void 0},ua({class:[`${t}-tabs-tab`,l===n&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,c&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`],onClick:i==="click"?this.activateTab:void 0,onMouseenter:i==="hover"?this.activateTab:void 0,style:e?void 0:d},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),h("span",{class:`${t}-tabs-tab__label`},e?h($e,null,h("div",{class:`${t}-tabs-tab__height-placeholder`},"\xA0"),h(Dt,{clsPrefix:t},{default:()=>h(ro,null)})):p?p():typeof s=="object"?s:pa(s!=null?s:n)),c&&this.type==="card"?h(fa,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),ol=_("tabs",`
 box-sizing: border-box;
 width: 100%;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[G("segment-type",[_("tabs-rail",[U("&.transition-disabled","color: red;",[_("tabs-tab",`
 transition: none;
 `)])])]),_("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[_("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[_("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[G("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),G("flex",[_("tabs-nav",{width:"100%"},[_("tabs-wrapper",{width:"100%"},[_("tabs-tab",{marginRight:0})])])]),_("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[M("prefix, suffix",`
 display: flex;
 align-items: center;
 `),M("prefix","padding-right: 16px;"),M("suffix","padding-left: 16px;")]),_("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[G("shadow-before",[U("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),G("shadow-after",[U("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),U("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `),U("&::before",`
 left: 0;
 `),U("&::after",`
 right: 0;
 `)]),_("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `),_("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),_("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),_("tabs-tab",`
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
 `,[G("disabled",{cursor:"not-allowed"}),M("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),M("label",`
 display: flex;
 align-items: center;
 `)]),_("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[U("&.transition-disabled",`
 transition: none;
 `),G("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),_("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),_("tab-pane",`
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
 `,[U("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),U("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),U("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),U("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),U("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),_("tabs-tab-pad",`
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),G("line-type, bar-type",[_("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[U("&:hover",{color:"var(--n-tab-text-color-hover)"}),G("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),G("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),_("tabs-nav",[G("line-type",[M("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),G("card-type",[M("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-tab",`
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
 `,[G("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[M("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),mt("disabled",[U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),G("closable","padding-right: 6px;"),G("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),G("disabled","color: var(--n-tab-text-color-disabled);")]),_("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),al=Object.assign(Object.assign({},we.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Tt=V({name:"Tabs",props:al,setup(e,{slots:t}){var n,o,r,a;const{mergedClsPrefixRef:l,inlineThemeDisabled:c}=Pe(e),d=we("Tabs","-tabs",ol,ma,e,l),i=I(null),p=I(null),s=I(null),f=I(null),m=I(null),y=I(!0),C=I(!0),b=Qt(e,["labelSize","size"]),S=Qt(e,["activeName","value"]),R=I((o=(n=S.value)!==null&&n!==void 0?n:e.defaultValue)!==null&&o!==void 0?o:t.default?(a=(r=ht(t.default())[0])===null||r===void 0?void 0:r.props)===null||a===void 0?void 0:a.name:null),E=tt(S,R),P={id:0},O=L(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Te(E,()=>{P.id=0,g()});function D(){var $;const{value:T}=E;return T===null?null:($=i.value)===null||$===void 0?void 0:$.querySelector(`[data-name="${T}"]`)}function v($){if(e.type==="card")return;const{value:T}=p;if(!!T&&$){const Z=`${l.value}-tabs-bar--disabled`,{barWidth:u}=e;if($.dataset.disabled==="true"?T.classList.add(Z):T.classList.remove(Z),typeof u=="number"&&$.offsetWidth>=u){const k=Math.floor(($.offsetWidth-u)/2)+$.offsetLeft;T.style.left=`${k}px`,T.style.maxWidth=`${u}px`}else T.style.left=`${$.offsetLeft}px`,T.style.maxWidth=`${$.offsetWidth}px`;T.style.width="8192px",T.offsetWidth}}function g(){if(e.type==="card")return;const $=D();$&&v($)}const w=I(null);let B=0,N=null;function q($){const T=w.value;if(T){B=$.getBoundingClientRect().height;const Z=`${B}px`,u=()=>{T.style.height=Z,T.style.maxHeight=Z};N?(u(),N(),N=null):N=u}}function ie($){const T=w.value;if(T){const Z=$.getBoundingClientRect().height,u=()=>{document.body.offsetHeight,T.style.maxHeight=`${Z}px`,T.style.height=`${Math.max(B,Z)}px`};N?(N(),N=null,u()):N=u}}function se(){const $=w.value;$&&($.style.maxHeight="",$.style.height="")}const j={value:[]},J=I("next");function W($){const T=E.value;let Z="next";for(const u of j.value){if(u===T)break;if(u===$){Z="prev";break}}J.value=Z,Y($)}function Y($){const{onActiveNameChange:T,onUpdateValue:Z,"onUpdate:value":u}=e;T&&le(T,$),Z&&le(Z,$),u&&le(u,$),R.value=$}function pe($){const{onClose:T}=e;T&&le(T,$)}function fe(){const{value:$}=p;if(!$)return;const T="transition-disabled";$.classList.add(T),g(),$.classList.remove(T)}let ve=0;function oe($){var T;if($.contentRect.width===0&&$.contentRect.height===0||ve===$.contentRect.width)return;ve=$.contentRect.width;const{type:Z}=e;(Z==="line"||Z==="bar")&&fe(),Z!=="segment"&&ke((T=m.value)===null||T===void 0?void 0:T.$el)}const xe=Ht(oe,64);Te([()=>e.justifyContent,()=>e.size],()=>{kt(()=>{const{type:$}=e;($==="line"||$==="bar")&&fe()})});const de=I(!1);function ae($){var T;const{target:Z,contentRect:{width:u}}=$,k=Z.parentElement.offsetWidth;if(!de.value)k<u&&(de.value=!0);else{const{value:A}=f;if(!A)return;k-u>A.$el.offsetWidth&&(de.value=!1)}ke((T=m.value)===null||T===void 0?void 0:T.$el)}const ne=Ht(ae,64);function ge(){const{onAdd:$}=e;$&&$(),kt(()=>{const T=D(),{value:Z}=m;!T||!Z||Z.scrollTo({left:T.offsetLeft,top:0,behavior:"smooth"})})}function ke($){if(!$)return;const{scrollLeft:T,scrollWidth:Z,offsetWidth:u}=$;y.value=T<=0,C.value=T+u>=Z}const Le=Ht($=>{ke($.target)},64);Nt(bn,{triggerRef:_e(e,"trigger"),tabStyleRef:_e(e,"tabStyle"),paneClassRef:_e(e,"paneClass"),paneStyleRef:_e(e,"paneStyle"),mergedClsPrefixRef:l,typeRef:_e(e,"type"),closableRef:_e(e,"closable"),valueRef:E,tabChangeIdRef:P,onBeforeLeaveRef:_e(e,"onBeforeLeave"),activateTab:W,handleClose:pe,handleAdd:ge}),ba(()=>{g()}),dn(()=>{const{value:$}=s;if(!$)return;const{value:T}=l,Z=`${T}-tabs-nav-scroll-wrapper--shadow-before`,u=`${T}-tabs-nav-scroll-wrapper--shadow-after`;y.value?$.classList.remove(Z):$.classList.add(Z),C.value?$.classList.remove(u):$.classList.add(u)});const at=I(null);Te(E,()=>{if(e.type==="segment"){const $=at.value;$&&kt(()=>{$.classList.add("transition-disabled"),$.offsetWidth,$.classList.remove("transition-disabled")})}});const ut={syncBarPosition:()=>{g()}},rt=L(()=>{const{value:$}=b,{type:T}=e,Z={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[T],u=`${$}${Z}`,{self:{barColor:k,closeIconColor:A,closeIconColorHover:X,closeIconColorPressed:te,tabColor:Q,tabBorderColor:ce,paneTextColor:re,tabFontWeight:he,tabBorderRadius:qe,tabFontWeightActive:Ge,colorSegment:vo,fontWeightStrong:go,tabColorSegment:xo,closeSize:yo,closeIconSize:_o,closeColorHover:wo,closeColorPressed:Co,closeBorderRadius:So,[be("panePadding",$)]:ko,[be("tabPadding",u)]:Ro,[be("tabGap",u)]:$o,[be("tabTextColor",T)]:Do,[be("tabTextColorActive",T)]:Bo,[be("tabTextColorHover",T)]:Io,[be("tabTextColorDisabled",T)]:zo,[be("tabFontSize",$)]:Fo},common:{cubicBezierEaseInOut:Eo}}=d.value;return{"--n-bezier":Eo,"--n-color-segment":vo,"--n-bar-color":k,"--n-tab-font-size":Fo,"--n-tab-text-color":Do,"--n-tab-text-color-active":Bo,"--n-tab-text-color-disabled":zo,"--n-tab-text-color-hover":Io,"--n-pane-text-color":re,"--n-tab-border-color":ce,"--n-tab-border-radius":qe,"--n-close-size":yo,"--n-close-icon-size":_o,"--n-close-color-hover":wo,"--n-close-color-pressed":Co,"--n-close-border-radius":So,"--n-close-icon-color":A,"--n-close-icon-color-hover":X,"--n-close-icon-color-pressed":te,"--n-tab-color":Q,"--n-tab-font-weight":he,"--n-tab-font-weight-active":Ge,"--n-tab-padding":Ro,"--n-tab-gap":$o,"--n-pane-padding":ko,"--n-font-weight-strong":go,"--n-tab-color-segment":xo}}),Ie=c?ct("tabs",L(()=>`${b.value[0]}${e.type[0]}`),rt,e):void 0;return Object.assign({mergedClsPrefix:l,mergedValue:E,renderedNames:new Set,tabsRailElRef:at,tabsPaneWrapperRef:w,tabsElRef:i,barElRef:p,addTabInstRef:f,xScrollInstRef:m,scrollWrapperElRef:s,addTabFixed:de,tabWrapperStyle:O,handleNavResize:xe,mergedSize:b,handleScroll:Le,handleTabsResize:ne,cssVars:c?void 0:rt,themeClass:Ie==null?void 0:Ie.themeClass,animationDirection:J,renderNameListRef:j,onAnimationBeforeLeave:q,onAnimationEnter:ie,onAnimationAfterEnter:se,onRender:Ie==null?void 0:Ie.onRender},ut)},render(){const{mergedClsPrefix:e,type:t,addTabFixed:n,addable:o,mergedSize:r,renderNameListRef:a,onRender:l,$slots:{default:c,prefix:d,suffix:i}}=this;l==null||l();const p=c?ht(c()).filter(b=>b.type.__TAB_PANE__===!0):[],s=c?ht(c()).filter(b=>b.type.__TAB__===!0):[],f=!s.length,m=t==="card",y=t==="segment",C=!m&&!y&&this.justifyContent;return a.value=[],h("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${r}-size`,C&&`${e}-tabs--flex`],style:this.cssVars},h("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav`]},bt(d,b=>b&&h("div",{class:`${e}-tabs-nav__prefix`},b)),y?h("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},f?p.map((b,S)=>(a.value.push(b.props.name),h(sn,Object.assign({},b.props,{internalCreatedByPane:!0,internalLeftPadded:S!==0}),b.children?{default:b.children.tab}:void 0))):s.map((b,S)=>(a.value.push(b.props.name),S===0?b:Pn(b)))):h(wn,{onResize:this.handleNavResize},{default:()=>h("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},h(Oa,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const b=h("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},C?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),f?p.map((R,E)=>(a.value.push(R.props.name),qt(h(sn,Object.assign({},R.props,{internalCreatedByPane:!0,internalLeftPadded:E!==0&&(!C||C==="center"||C==="start"||C==="end")}),R.children?{default:R.children.tab}:void 0)))):s.map((R,E)=>(a.value.push(R.props.name),qt(E!==0&&!C?Pn(R):R))),!n&&o&&m?Tn(o,(f?p.length:s.length)!==0):null,C?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let S=b;return m&&o&&(S=h(wn,{onResize:this.handleTabsResize},{default:()=>b})),h("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},S,m?h("div",{class:`${e}-tabs-pad`}):null,m?null:h("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),n&&o&&m?Tn(o,!0):null,bt(i,b=>b&&h("div",{class:`${e}-tabs-nav__suffix`},b))),f&&(this.animated?h("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},En(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):En(p,this.mergedValue,this.renderedNames)))}});function En(e,t,n,o,r,a,l){const c=[];return e.forEach(d=>{const{name:i,displayDirective:p,"display-directive":s}=d.props,f=y=>p===y||s===y,m=t===i;if(d.key!==void 0&&(d.key=i),m||f("show")||f("show:lazy")&&n.has(i)){n.has(i)||n.add(i);const y=!f("if");c.push(y?me(d,[[De,m]]):d)}}),l?h(va,{name:`${l}-transition`,onBeforeLeave:o,onEnter:r,onAfterEnter:a},{default:()=>c}):c}function Tn(e,t){return h(sn,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Pn(e){const t=ga(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function qt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const rl={class:"value"},ll=V({__name:"RulerLine",props:{scale:null,thick:null,palette:null,index:null,start:null,vertical:{type:Boolean},value:null,isShowReferLine:{type:Boolean}},emits:["onMouseDown","onRelease","onRemove"],setup(e,{emit:t}){const n=e,o=I(0),r=I(!0);Vt(()=>{o.value=n.value});const a=f=>{r.value=f>=0},l=L(()=>{const f=(o.value-n.start)*n.scale;a(f);const m=f+"px";return n.vertical?{top:m}:{left:m}}),c=L(()=>{var C,b;const f=`1px ${((C=n.palette)==null?void 0:C.lineBoardStyle)||"dashed"} ${(b=n.palette)==null?void 0:b.lineColor}`,m=n.vertical?{borderTop:f}:{borderLeft:f},y=n.isShowReferLine?n.vertical?"ns-resize":"ew-resize":"none";return _t({cursor:y},m)}),d=L(()=>n.vertical?{left:n.thick+"px"}:{top:n.thick+"px"}),i=f=>{f.stopPropagation();const m=n.vertical?f.clientY:f.clientX,y=o.value;t("onMouseDown");const C=S=>{const R=n.vertical?S.clientY:S.clientX,E=Math.round(y+(R-m)/n.scale);o.value=E},b=()=>{t("onRelease",o.value,n.index),document.removeEventListener("mousemove",C,!0),document.removeEventListener("mouseup",b)};document.addEventListener("mousemove",C,!0),document.addEventListener("mouseup",b)},p=()=>{t("onRemove",n.index)},s=()=>[{text:"\u5220\u9664",subText:"",handler:()=>p()}];return(f,m)=>{const y=ot("contextmenu");return me((F(),ee("div",{class:"line",style:Ne([x(l),x(c)]),onMousedown:i},[ue("div",{class:"action",style:Ne(x(d))},[ue("span",rl,nt(o.value),1)],4)],36)),[[De,r.value],[y,s,void 0,{stop:!0}]])}}});const il=Ce(ll,[["__scopeId","data-v-15802f5c"]]),sl=e=>e<=.25?40:e<=.5?20:e<=1?10:e<=2?5:e<=4?2:1,An=.83,dl=(e,t,n,o,r,a)=>{const{scale:l,width:c,height:d,ratio:i,palette:p}=r,{bgColor:s,fontColor:f,shadowColor:m,longfgColor:y,shortfgColor:C}=p;if(e.scale(i,i),e.clearRect(0,0,c,d),e.fillStyle=s,e.fillRect(0,0,c,d),o){const w=(n-t)*l,B=o*l;e.fillStyle=m,a?e.fillRect(w,0,B,d*3/8):e.fillRect(0,w,c*3/8,B)}const b=sl(l),S=b*l,R=b*10,E=R*l,P=Math.floor(t/b)*b,O=Math.floor(t/R)*R,D=(P-t)/b*S,v=(O-t)/R*E,g=t+Math.ceil((a?c:d)/l);e.beginPath(),e.fillStyle=f,e.strokeStyle=y;for(let w=O,B=0;w<g;w+=R,B++){const N=v+B*E+.5;a?e.moveTo(N,0):e.moveTo(0,N),e.save(),a?e.translate(N,d*.4):e.translate(c*.4,N),a||e.rotate(-Math.PI/2),e.scale(An/i,An/i),e.fillText(w.toString(),4*i,7*i),e.restore(),a?e.lineTo(N,d*9/16):e.lineTo(c*9/16,N)}e.stroke(),e.closePath(),e.beginPath(),e.strokeStyle=C;for(let w=P,B=0;w<g;w+=b,B++){const N=D+B*S+.5;a?e.moveTo(N,0):e.moveTo(0,N),w%R!==0&&(a?e.lineTo(N,d*1/4):e.lineTo(c*1/4,N))}e.stroke(),e.closePath(),e.setTransform(1,0,0,1,0,0)},cl=V({__name:"index",props:{showIndicator:{type:Boolean},valueNum:null,scale:null,ratio:null,palette:null,vertical:{type:Boolean},start:null,width:null,height:null,selectStart:null,selectLength:null},emits:["onAddLine","update:showIndicator","update:valueNum"],setup(e,{emit:t}){const n=e,o=Be({canvasContext:null});let r=1;const a=I(null);Vt(()=>{r=n.ratio||window.devicePixelRatio||1,l(),c(r),d(r)});const l=()=>{o.canvasContext=a.value&&a.value.getContext("2d")},c=p=>{if(a.value){a.value.width=n.width*p,a.value.height=n.height*p;const s=o.canvasContext;s&&(s.font=`${12*p}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`,s.lineWidth=1,s.textBaseline="middle")}},d=p=>{const s={scale:n.scale,width:n.width,height:n.height,palette:n.palette,ratio:p};o.canvasContext&&dl(o.canvasContext,n.start,n.selectStart,n.selectLength,s,!n.vertical)};Te(()=>n.start,()=>d(r)),Te([()=>n.width,()=>n.height],()=>{c(r),d(r)});const i=(p,s)=>{const f=(C,b,S)=>Math.round(b+C/S),m=n.vertical?p.offsetY:p.offsetX,y=f(m,n.start,n.scale);switch(s){case"click":t("onAddLine",y);break;case"enter":t("update:valueNum",y),t("update:showIndicator",!0);break;default:t("update:valueNum",y);break}};return(p,s)=>(F(),ee("canvas",{ref_key:"canvas",ref:a,class:"ruler",onClick:s[0]||(s[0]=f=>i(f,"click")),onMouseenter:s[1]||(s[1]=f=>i(f,"enter")),onMousemove:s[2]||(s[2]=f=>i(f,"move")),onMouseleave:s[3]||(s[3]=f=>p.$emit("update:showIndicator",!1))},null,544))}}),ul={class:"lines"},pl={class:"value"},fl=V({__name:"RulerWrapper",props:{scale:null,ratio:null,thick:null,selectStart:null,selectLength:null,isShowReferLine:{type:Boolean},palette:null,vertical:{type:Boolean,default:!0},width:{default:200},height:{default:200},start:{default:0}},setup(e,{expose:t}){const n=e,o=I(!1),r=I(0),a=I([]),l=L(()=>n.vertical?"v-container":"h-container");t({clearLines:()=>{a.value=[]}});const d=L(()=>{const m={width:`calc(100% - ${n.thick}px)`,height:`${n.thick+1}px`,left:`${n.start}px`},y={width:`${n.thick&&n.thick+1}px`,height:`calc(100% - ${n.thick}px)`,top:`${n.start}px`};return n.vertical?y:m}),i=L(()=>{var b,S;const m=(r.value-(n.start||0))*n.scale;let y="top",C="borderLeft";return y=n.vertical?"top":"left",C=n.vertical?"borderBottom":"borderLeft",{[y]:m+"px",[C]:`1px ${((b=n.palette)==null?void 0:b.lineBoardStyle)||"dashed"} ${(S=n.palette)==null?void 0:S.lineColor}`}}),p=m=>{a.value.push(m)},s=(m,y)=>{const C=m-(n.start||0),b=(n.vertical?n.height||200:n.width||200)/n.scale;C<0||C>b?f(y):a.value[y]=m},f=m=>{a.value.splice(m,1)};return(m,y)=>(F(),ee("div",{class:Lt(x(l)),style:Ne(x(d))},[z(cl,{vertical:e.vertical,scale:e.scale,width:e.width,height:e.height,start:e.start,ratio:e.ratio,"select-start":e.selectStart,"select-length":e.selectLength,palette:e.palette,valueNum:r.value,"onUpdate:valueNum":y[0]||(y[0]=C=>r.value=C),showIndicator:o.value,"onUpdate:showIndicator":y[1]||(y[1]=C=>o.value=C),onOnAddLine:p},null,8,["vertical","scale","width","height","start","ratio","select-start","select-length","palette","valueNum","showIndicator"]),me(ue("div",ul,[(F(!0),ee($e,null,Ve(a.value,(C,b)=>(F(),K(il,{key:C+b,index:b,value:C>>0,scale:e.scale,start:e.start,thick:e.thick,palette:e.palette,vertical:e.vertical,"is-show-refer-line":e.isShowReferLine,onOnRemove:f,onOnRelease:s},null,8,["index","value","scale","start","thick","palette","vertical","is-show-refer-line"]))),128))],512),[[De,e.isShowReferLine]]),me(ue("div",{class:"indicator",style:Ne(x(i))},[ue("div",pl,nt(r.value),1)],4),[[De,o.value]])],6))}});const Nn=Ce(fl,[["__scopeId","data-v-7b9de42f"]]),hl={id:"mb-ruler",class:"style-ruler mb-ruler"},ml=V({__name:"Index",props:{scale:{default:1},ratio:{default:0},thick:{default:16},palette:null,startX:null,startY:null,width:{default:200},height:{default:200},shadow:null},setup(e){const t=e,n=I(null),o=I(null),r=I(!0),a=()=>{var d,i;(d=n.value)==null||d.clearLines(),(i=o.value)==null||i.clearLines(),r.value=!0},l=()=>[{text:"\u663E\u793A\u8F85\u52A9\u7EBF",subText:"",disable:r.value,handler:()=>r.value=!0},{text:"\u9690\u85CF\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:()=>r.value=!1},{text:"\u6E05\u7A7A\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:a}],c=L(()=>{function d(i,p){return Object.keys(i).forEach(s=>{s&&i.hasOwnProperty(s)&&(typeof p.key=="object"?i[s]=d(i[s],p[s]):p.hasOwnProperty(s)&&(i[s]=p[s]))}),i}return d({bgColor:"rgba(225,225,225, 0)",longfgColor:"#BABBBC",shortfgColor:"#C8CDD0",fontColor:"#7D8694",shadowColor:"#E8E8E8",lineColor:"#37d4cf",lineBoardStyle:"dashed",borderColor:"#DADADC",cornerActiveColor:"rgb(235, 86, 72, 0.6)",menu:{bgColor:"#fff",dividerColor:"#DBDBDB",listItem:{textColor:"#415058",hoverTextColor:"#298DF8",disabledTextColor:"rgba(65, 80, 88, 0.4)",bgColor:"#fff",hoverBgColor:"#F2F2F2"}}},t.palette||{})});return(d,i)=>{var s,f,m,y;const p=ot("contextmenu");return me((F(),ee("div",hl,[z(Nn,{vertical:!1,ref_key:"HRulerWrapperref",ref:o,width:e.width,height:16,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startX,"select-start":((s=e.shadow)==null?void 0:s.x)||0,"select-length":((f=e.shadow)==null?void 0:f.width)||0,scale:e.scale,palette:x(c)},null,8,["width","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"]),z(Nn,{vertical:!0,ref_key:"VRulerWrapperref",ref:n,width:16,height:e.height,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startY,"select-start":((m=e.shadow)==null?void 0:m.y)||0,"select-length":((y=e.shadow)==null?void 0:y.height)||0,scale:e.scale,palette:x(c)},null,8,["height","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"])])),[[p,l,void 0,{stop:!0}]])}}});const bl=V({__name:"Ruler",props:{width:null,height:null,isShowReferLine:{type:Boolean}},setup(e){const r={h:[],v:[]},a=20;return(l,c)=>(F(),K(x(ml),{thick:a,scale:1,width:e.width,height:e.height,startX:0,startY:0,lines:r,isShowReferLine:e.isShowReferLine},null,8,["width","height","isShowReferLine"]))}});const vl=Ce(bl,[["__scopeId","data-v-31710d38"]]),gl=V({__name:"Area",props:{start:null,width:null,height:null},setup(e){const t=to(),n=()=>{t.compose(),ze.emit("hideArea")},o=()=>{t.flushLeft(),ze.emit("hideArea")},r=()=>{t.flushRight(),ze.emit("hideArea")},a=()=>{t.flushTop(),ze.emit("hideArea")},l=()=>{t.flushBottom(),ze.emit("hideArea")},c=()=>{t.flushRow(),ze.emit("hideArea")},d=()=>{t.flushColumn(),ze.emit("hideArea")},i=()=>{t.batchDeleteComponent(t.components),ze.emit("hideArea")},p=()=>[{text:"\u7EC4\u5408",subText:"",disable:!t.canCompose,handler:n},{divider:!0},{text:"\u5220\u9664",subText:"Ctrl + Delete",disable:t.components.length<=0,handler:i},{divider:!0},{text:"\u5DE6\u5BF9\u9F50",subText:"",handler:o},{text:"\u53F3\u5BF9\u9F50",subText:"",handler:r},{text:"\u9876\u5BF9\u9F50",subText:"",handler:a},{text:"\u5E95\u5BF9\u9F50",subText:"",handler:l},{divider:!0},{text:"\u6C34\u5E73\u5BF9\u9F50",subText:"",handler:c},{text:"\u5782\u76F4\u5BF9\u9F50",subText:"",handler:d}];return(s,f)=>{const m=ot("contextmenu");return me((F(),ee("div",{style:Ne({left:e.start.x+"px",top:e.start.y+"px",width:e.width+"px",height:e.height+"px"}),class:"area"},null,4)),[[m,p,void 0,{stop:!0}]])}}});const Vn=Ce(gl,[["__scopeId","data-v-a1be5080"]]);const xl={},yl={class:"grid",width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},_l=xa('<defs data-v-9ff3aadd><pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse" data-v-9ff3aadd><path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1" data-v-9ff3aadd></path></pattern><pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse" data-v-9ff3aadd><rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)" data-v-9ff3aadd></rect><path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.5)" stroke-width="1" data-v-9ff3aadd></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" data-v-9ff3aadd></rect>',2),wl=[_l];function Cl(e,t){return F(),ee("svg",yl,wl)}const Sl=Ce(xl,[["render",Cl],["__scopeId","data-v-9ff3aadd"]]),kl={class:"mark-line"},Rl=V({__name:"MarkLine",setup(e){const t=Se(),n=I([]),o=Be(["xt","xc","xb","yl","yc","yr"]),r=I(3),a=Be({xt:!1,xc:!1,xb:!1,yl:!1,yc:!1,yr:!1}),l=f=>{n.value.push(f)},c=()=>{Object.keys(a).forEach(f=>{a[f]=!1})};zt("move",f=>{d(f.isDownward,f.isRightward)}),zt("unmove",()=>{c()});const d=(f,m)=>{const y=t.componentData;if(t.curComponent){const{top:C,left:b,right:S,bottom:R}=en(t.curComponent.positionStyle),E=(S-b)/2,P=(R-C)/2;c(),y.forEach(O=>{if(O==t.curComponent)return;const D=en(O.positionStyle),{top:v,left:g,bottom:w,right:B}=D,N=(B-g)/2,q=(w-v)/2,ie={top:[{isNearly:i(C,v),lineNode:n.value[0],line:"xt",dragShift:v,lineShift:v},{isNearly:i(R,v),lineNode:n.value[0],line:"xt",dragShift:v-(R-C||0),lineShift:v},{isNearly:i((C||0)+P,v+q),lineNode:n.value[1],line:"xc",dragShift:v+q-P,lineShift:v+q},{isNearly:i(C,w),lineNode:n.value[2],line:"xb",dragShift:w,lineShift:w},{isNearly:i(R,w),lineNode:n.value[2],line:"xb",dragShift:w-(R-C||0),lineShift:w}],left:[{isNearly:i(b,g),lineNode:n.value[3],line:"yl",dragShift:g,lineShift:g},{isNearly:i(S,g),lineNode:n.value[3],line:"yl",dragShift:g-(S-b||0),lineShift:g},{isNearly:i((b||0)+E,g+N),lineNode:n.value[4],line:"yc",dragShift:g+N-E,lineShift:g+N},{isNearly:i(b,B),lineNode:n.value[5],line:"yr",dragShift:B,lineShift:B},{isNearly:i(S,B),lineNode:n.value[5],line:"yr",dragShift:B-(S-b||0),lineShift:B}]},se=[],{rotate:j}=t.curComponent.style;Object.keys(ie).forEach(J=>{ie[J].forEach(W=>{if(!W.isNearly)return;const Y=j!=0?p(J,W,{width:S-b,height:R-C}):W.dragShift;t.setCurComponentStyle(J,Y),W.lineNode.style[J]=`${W.lineShift}px`,se.push(W.line)})}),se.length&&s(se,f,m)})}},i=(f,m)=>Math.abs(f-m)<=r.value,p=(f,m,y)=>{const{width:C,height:b}=t.curComponent.style;return f=="top"?Math.round(m.dragShift-(b-y.height)/2):Math.round(m.dragShift-(C-y.width)/2)},s=(f,m,y)=>{y?f.includes("yr")?a.yr=!0:f.includes("yc")?a.yc=!0:f.includes("yl")&&(a.yl=!0):f.includes("yl")?a.yl=!0:f.includes("yc")?a.yc=!0:f.includes("yr")&&(a.yr=!0),m?f.includes("xb")?a.xb=!0:f.includes("xc")?a.xc=!0:f.includes("xt")&&(a.xt=!0):f.includes("xt")?a.xt=!0:f.includes("xc")?a.xc=!0:f.includes("xb")&&(a.xb=!0)};return(f,m)=>(F(),ee("div",kl,[(F(!0),ee($e,null,Ve(o,y=>me((F(),ee("div",{key:y,class:Lt(["line",y.includes("x")?"xline":"yline"]),ref_for:!0,ref:l},null,2)),[[De,a[y]||!1]])),128))]))}});const $l=Ce(Rl,[["__scopeId","data-v-a18c1d1e"]]),Dl=["onMousedown"],Bl=V({__name:"Index",setup(e){const t=Se(),n=to(),o=no(),r=j=>Sn(j,["top","left","width","height","rotate"]),a=L(()=>n.style.width>0&&!v.value&&!t.isClickComponent),l=L(()=>({x:n.style.left,y:n.style.top})),c=L(()=>n.style.width),d=L(()=>n.style.height),i=()=>{v.value=!1,O.value=0,D.value=0,n.setAreaData({left:0,top:0,width:0,height:0},[])},p=()=>{t.clearCanvas()},s=(j,J)=>{const W=document.querySelector("#editor").getBoundingClientRect(),Y=J.pageY-W.top,pe=J.pageX-W.left;o.paste(!0,pe,Y)},f=()=>[{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:s},{text:"\u6E05\u7A7A\u753B\u5E03",subText:"",handler:p}];zt("hideArea",i),Vt(()=>{console.log("\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F"),t.setEditMode(Cn.EDIT),document.addEventListener("paste",S)}),qn(()=>{console.log("\u8FDB\u5165\u9884\u89C8\u6A21\u5F0F"),t.setEditMode(Cn.PREVIEW),document.removeEventListener("paste",S),t.clearCanvas()});const m=L(()=>t.componentData),y=L(()=>t.canvasStyleData),C=L(()=>t.curComponent),b=L(()=>{const j=Mt(_t({},y.value),{backgroundImage:y.value.image,backgroundSize:"cover",backgroundColor:y.value.color||"#084860"});return Sn(j,["width","height","backgroundImage","backgroundSize","backgroundColor"])}),S=j=>{if(j.clipboardData){const J=j.clipboardData.getData("text");try{const W=JSON.parse(J);"component"in W&&(W.change("top",W.positionStyle.top+10),W.change("left",W.positionStyle.left+10),Bt(JSON.stringify(W)),j.preventDefault(),t.appendComponent(W))}catch(W){console.log(W)}}},R=I(0),E=I(0),P=Be({x:0,y:0}),O=I(0),D=I(0),v=I(!0),g=I(null),w=I(!0),B=j=>{var ve;t.setClickComponentStatus(!1),j.preventDefault(),j.stopPropagation(),i();const J=(ve=g.value)==null?void 0:ve.getBoundingClientRect();R.value=J.x,E.value=J.y;const W=j.clientX,Y=j.clientY;P.x=W-R.value,P.y=Y-E.value,v.value=!0;const pe=oe=>{oe.preventDefault(),oe.stopPropagation(),O.value=Math.abs(oe.clientX-W),D.value=Math.abs(oe.clientY-Y),oe.clientX<W&&(P.x=oe.clientX-R.value),oe.clientY<Y&&(P.y=oe.clientY-E.value)},fe=oe=>{if(document.removeEventListener("mousemove",pe),document.removeEventListener("mouseup",fe),oe.clientX==W&&oe.clientY==Y){i();return}const xe={left:P.x,top:P.y,right:O.value+P.x,bottom:P.y+D.value},de=N(xe);if(de){const ae=de.rect;n.setAreaData({top:ae.top,left:ae.left,width:ae.right-ae.left,height:ae.bottom-ae.top,rotate:0},de.components),P.x=ae.left,P.y=ae.top,O.value=ae.right-ae.left,D.value=ae.bottom-ae.top}else i()};document.addEventListener("mousemove",pe),document.addEventListener("mouseup",fe)},N=j=>{const J=[],W=new Set,Y=new Set,pe=new Set,fe=new Set;if(t.componentData.forEach(ve=>{const{width:oe,height:xe,left:de,top:ae,rotate:ne}=ve.style,ge=en({width:oe,height:xe,left:de,top:ae,rotate:ne});ge.left>=j.left&&ge.right<=j.right&&ge.top>=j.top&&ge.bottom<=j.bottom&&(J.push(ve),W.add(ge.left),Y.add(ge.top),pe.add(ge.right),fe.add(ge.bottom))}),J.length>0){const ve=Math.min(...W),oe=Math.max(...pe),xe=Math.min(...Y),de=Math.max(...fe);return{components:J,rect:{left:ve,right:oe,top:xe,bottom:de}}}},q=j=>Re(this,null,function*(){j.preventDefault(),j.stopPropagation();const J=j.dataTransfer.getData("componentName");if(J){const W=new tn[J],Y=document.querySelector("#editor").getBoundingClientRect(),pe=j.pageY-Y.top,fe=j.pageX-Y.left;W.change("top",pe),W.change("left",fe),t.appendComponent(W)}}),ie=j=>{j.preventDefault(),j.dataTransfer.dropEffect="copy"},se=()=>{t.isClickComponent||t.setCurComponent(void 0)};return(j,J)=>{const W=ot("contextmenu");return me((F(),ee("div",{class:"editor edit",ref_key:"editor",ref:g,id:"editor",style:Ne(x(b)),onMousedown:cn(B,["left"]),onDrop:q,onDragover:ie,onMouseup:se},[z(Sl),z(vl,{width:x(y).width,height:x(y).height,isShowReferLine:w.value},null,8,["width","height","isShowReferLine"]),(F(!0),ee($e,null,Ve(x(m),(Y,pe)=>(F(),ee($e,{key:Y.id},[x(t).isEditMode&&Y.display?(F(),K(x(Na),{key:0,id:"shape"+Y.id,defaultStyle:Y.style,style:Ne(r(Y.style)),active:Y.id===(x(C)||{}).id,info:Y,class:Lt({lock:Y.locked}),index:pe},{default:H(()=>[(F(),K(ya(Y.component),{class:"component",style:Ne(x(_a)(Y)),component:Y,id:"component"+Y.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):It("",!0)],64))),128)),z($l),v.value?(F(),K(Vn,{key:0,start:P,width:O.value,height:D.value},null,8,["start","width","height"])):x(a)?(F(),K(Vn,{key:1,start:x(l),width:x(c),height:x(d)},null,8,["start","width","height"])):It("",!0)],44,Dl)),[[W,f,void 0,{stop:!0}]])}}});const Il=Ce(Bl,[["__scopeId","data-v-921981e3"]]),mo=wa(),We=Se(),St=Gn(),zl=()=>Re(void 0,null,function*(){const e=yield mo.lastRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),Fl=()=>Re(void 0,null,function*(){const e=yield mo.nextRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),El=()=>{We.toggleShowEm()},Tl=e=>{const t=`${We.name}`||"OpenDataV";Ca(`${t}.json`,JSON.stringify({id:e,name:t,canvasData:We.layoutData,canvasStyle:We.canvasStyleData}))},Pl=()=>{Sa(Al,".json")},Al=e=>{if(e.target&&e.target.result){const t=JSON.parse(e.target.result);t&&(We.setComponentData(t.canvasData),We.setCanvasStyle(t.canvasStyle))}},Nl=()=>{St.setNavTheme(St.darkTheme?"dark":"light"),St.setDarkTheme(!St.darkTheme)},Vl=V({__name:"ThemeIcon",setup(e){const t=Gn(),n=L(()=>t.darkTheme?"sun-one":"moon");return(o,r)=>{const a=xt("icon-park");return F(),K(a,{name:x(n)},null,8,["name"])}}}),Ll="2946854",Ul="\u65B9\u5411",Ml="iconfont",Ol="icon-",jl="",Hl=[{icon_id:"11291350",name:"\u7EC4",font_class:"zu",unicode:"e854",unicode_decimal:59476},{icon_id:"1817751",name:"\u67F1\u5F62\u56FE",font_class:"zhuxingtu",unicode:"e626",unicode_decimal:58918},{icon_id:"3868284",name:"\u4EEA\u8868\u76D8",font_class:"yibiaopan",unicode:"eb67",unicode_decimal:60263},{icon_id:"4354243",name:"\u56FE\u8868-\u997C\u56FE",font_class:"tubiao-bingtu",unicode:"eb95",unicode_decimal:60309},{icon_id:"4354246",name:"\u56FE\u8868-\u5361\u7247",font_class:"tubiao-qiapian",unicode:"eb96",unicode_decimal:60310},{icon_id:"4354248",name:"\u56FE\u8868-\u6298\u7EBF\u56FE",font_class:"tubiao-zhexiantu",unicode:"eb97",unicode_decimal:60311},{icon_id:"4906240",name:"\u6309\u94AE\u7EC4",font_class:"anniuzu",unicode:"e782",unicode_decimal:59266},{icon_id:"5383645",name:"\u5BFC\u822A",font_class:"daohang",unicode:"e77d",unicode_decimal:59261},{icon_id:"5961366",name:"\u5217\u8868",font_class:"liebiao",unicode:"ec6b",unicode_decimal:60523},{icon_id:"5971297",name:"\u91C7\u7164\u673A",font_class:"caimeiji",unicode:"e603",unicode_decimal:58883},{icon_id:"7040619",name:"\u5176\u4ED6",font_class:"qita",unicode:"e63b",unicode_decimal:58939},{icon_id:"7556180",name:"\u5B9A\u5236",font_class:"dingzhi",unicode:"e609",unicode_decimal:58889},{icon_id:"9752796",name:"\u57FA\u7840",font_class:"jichu",unicode:"e60f",unicode_decimal:58895},{icon_id:"9921108",name:"chart",font_class:"chartt",unicode:"e60a",unicode_decimal:58890},{icon_id:"14475731",name:"\u88C5\u9970\u88C5\u4FEE",font_class:"zhuangshizhuangxiu",unicode:"e6a6",unicode_decimal:59046},{icon_id:"16562592",name:"\u6E29\u5EA6\u8BA1",font_class:"wenduji",unicode:"e6de",unicode_decimal:59102},{icon_id:"22712019",name:"\u6761\u5F62\u8FDB\u5EA6\u56FE",font_class:"tiaoxingjindutu",unicode:"e66b",unicode_decimal:58987},{icon_id:"22761375",name:"\u8FB9\u6846",font_class:"biankuang",unicode:"e6b7",unicode_decimal:59063},{icon_id:"22885432",name:"\u8FDB\u5EA6\u56FE",font_class:"jindutu",unicode:"f24b",unicode_decimal:62027},{icon_id:"124495",name:"\u8B66\u544A",font_class:"jinggao1",unicode:"e601",unicode_decimal:58881},{icon_id:"1846445",name:"\u9884\u8B66\u706F",font_class:"yujingdeng",unicode:"e67f",unicode_decimal:59007},{icon_id:"2239579",name:"\u81EA\u52A8\u7CFB\u7EDF\u8B66\u544A\u706F",font_class:"zidongxitongjinggaodeng1",unicode:"e605",unicode_decimal:58885},{icon_id:"4988542",name:"\u9884\u8B66",font_class:"yujing1",unicode:"e644",unicode_decimal:58948},{icon_id:"9974390",name:"\u9884\u8B66",font_class:"yujing3",unicode:"e6fe",unicode_decimal:59134},{icon_id:"10817515",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng",unicode:"e64b",unicode_decimal:58955},{icon_id:"14151833",name:"\u62A5\u8B66",font_class:"baojing1",unicode:"e630",unicode_decimal:58928},{icon_id:"16965399",name:"\u8B66\u544A\u706F",font_class:"hong",unicode:"e60d",unicode_decimal:58893},{icon_id:"20379044",name:"\u9884\u8B66\u706F",font_class:"yujingdeng1",unicode:"e623",unicode_decimal:58915},{icon_id:"23819336",name:"\u62A5\u8B66 \u8B66\u544A \u9884\u8B66 \u8B66\u544A\u706F",font_class:"a-baojingjinggaoyujingjinggaodeng",unicode:"e628",unicode_decimal:58920},{icon_id:"24312218",name:"light",font_class:"light",unicode:"e63a",unicode_decimal:58938},{icon_id:"24614518",name:"\u544A\u8B66\u706F",font_class:"gaojingdeng9",unicode:"e664",unicode_decimal:58980},{icon_id:"25567211",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng1",unicode:"e613",unicode_decimal:58899},{icon_id:"12041083",name:"\u9884\u8B66",font_class:"yujing5",unicode:"e671",unicode_decimal:58993},{icon_id:"577357",name:"\u5220\u9664",font_class:"shanchu",unicode:"e74b",unicode_decimal:59211},{icon_id:"1986988",name:"\u5220\u9664",font_class:"shanchu1",unicode:"e625",unicode_decimal:58917},{icon_id:"12795401",name:"\u9996\u9875",font_class:"shouye",unicode:"e62d",unicode_decimal:58925},{icon_id:"201556",name:"\u67E5\u770B",font_class:"chakan",unicode:"e600",unicode_decimal:58880},{icon_id:"201638",name:"\u7F16\u8F91",font_class:"bianji",unicode:"e602",unicode_decimal:58882},{icon_id:"11729723",name:"\u590D\u5236",font_class:"fuzhi",unicode:"e608",unicode_decimal:58888},{icon_id:"7269302",name:"\u9996\u9875-\u9ED8\u8BA4",font_class:"shouye-moren",unicode:"e619",unicode_decimal:58905},{icon_id:"658044",name:"\u89E3\u9501",font_class:"jiesuo",unicode:"e669",unicode_decimal:58985},{icon_id:"10097949",name:"\u65CB\u8F6C",font_class:"xuanzhuan",unicode:"e680",unicode_decimal:59008},{icon_id:"374774",name:"\u5F00\u5173",font_class:"kaiguan",unicode:"e61f",unicode_decimal:58911},{icon_id:"122162",name:"\u65F6\u949F",font_class:"clock",unicode:"e63e",unicode_decimal:58942},{icon_id:"1242185",name:"\u53CD\u9988\u4FE1\u606F",font_class:"fankuixinxi",unicode:"e660",unicode_decimal:58976},{icon_id:"2468505",name:"37\u7C7B\u5EFA\u7B51\u4FEE\u7406x16",font_class:"leijianzhuxiulix",unicode:"e695",unicode_decimal:59029},{icon_id:"11747267",name:"\u65F6\u95F4",font_class:"weibiaoti-",unicode:"e618",unicode_decimal:58904},{icon_id:"14794143",name:"sds_\u7B2C37\u7C7B \u5EFA\u7B51\u4FEE\u7406",font_class:"sds_di37leijianzhuxiuli",unicode:"e61e",unicode_decimal:58910},{icon_id:"17762035",name:"\u8054\u52A8\u63A7\u5236",font_class:"liandongkongzhi",unicode:"e624",unicode_decimal:58916},{icon_id:"18165278",name:"\u9501,\u5BC6\u7801,\u5F00\u9501,\u89E3\u9501",font_class:"unlock-full",unicode:"e882",unicode_decimal:59522},{icon_id:"288554",name:"ascend",font_class:"ascend",unicode:"e6b4",unicode_decimal:59060},{icon_id:"288556",name:"falling",font_class:"falling",unicode:"e6b6",unicode_decimal:59062},{icon_id:"815867",name:"\u6309\u94AE-\u5173",font_class:"buttonoff",unicode:"e614",unicode_decimal:58900},{icon_id:"815872",name:"\u6309\u94AE-\u5F00",font_class:"buttonon",unicode:"e615",unicode_decimal:58901},{icon_id:"2674878",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushang",unicode:"e62c",unicode_decimal:58924},{icon_id:"2674928",name:"\u7BAD\u5934 \u53F3",font_class:"jiantouyou",unicode:"e632",unicode_decimal:58930},{icon_id:"2674929",name:"\u7BAD\u5934 \u4E0B",font_class:"jiantouxia",unicode:"e633",unicode_decimal:58931},{icon_id:"7594038",name:"24gl-next",font_class:"24gl-next",unicode:"ea6b",unicode_decimal:60011},{icon_id:"7594046",name:"24gl-pauseCircle",font_class:"24gl-pauseCircle",unicode:"ea6f",unicode_decimal:60015},{icon_id:"7594068",name:"24gl-previous",font_class:"24gl-previous",unicode:"ea73",unicode_decimal:60019},{icon_id:"7594086",name:"24gl-stopCircle",font_class:"24gl-stopCircle",unicode:"ea79",unicode_decimal:60025},{icon_id:"10268256",name:"\u6309\u94AE_\u5F00\u542F",font_class:"anniu_kaiqi",unicode:"e659",unicode_decimal:58969},{icon_id:"10268257",name:"\u6309\u94AE_\u5173\u95ED",font_class:"anniu_guanbi",unicode:"e65b",unicode_decimal:58971},{icon_id:"25807963",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushangzuo-copy",unicode:"ec63",unicode_decimal:60515},{icon_id:"25808146",name:"\u5411\u53F32",font_class:"xiangzuo2-copy",unicode:"ec64",unicode_decimal:60516},{icon_id:"166602",name:"\u5173\u95ED\u64AD\u653E",font_class:"guanbibofang",unicode:"e61d",unicode_decimal:58909},{icon_id:"577396",name:"\u5411\u4E0A3",font_class:"xiangshang3",unicode:"e76f",unicode_decimal:59247},{icon_id:"577401",name:"\u5411\u4E0B5",font_class:"xiangxia5",unicode:"e774",unicode_decimal:59252},{icon_id:"577403",name:"\u5411\u53F32",font_class:"xiangyou2",unicode:"e776",unicode_decimal:59254},{icon_id:"1159910",name:"\u53F3\u64AD\u653E",font_class:"youbofang",unicode:"e62e",unicode_decimal:58926},{icon_id:"1159911",name:"\u5DE6\u64AD\u653E",font_class:"zuobofang",unicode:"e62f",unicode_decimal:58927},{icon_id:"1185945",name:"\u64AD\u653E",font_class:"bofang2",unicode:"e606",unicode_decimal:58886},{icon_id:"1488892",name:"\u64AD\u653E",font_class:"bofang5",unicode:"e607",unicode_decimal:58887},{icon_id:"1727559",name:"323\u5411\u5DE6\u4EA4\u6362",font_class:"xiangzuojiaohuan",unicode:"e8f8",unicode_decimal:59640},{icon_id:"1727561",name:"324\u5411\u53F3\u4EA4\u6362",font_class:"xiangyoujiaohuan",unicode:"e8f9",unicode_decimal:59641},{icon_id:"2076218",name:"\u64AD\u653E2",font_class:"bofang6",unicode:"e87c",unicode_decimal:59516},{icon_id:"7594051",name:"24gl-playCircle",font_class:"24gl-playCircle",unicode:"ea6e",unicode_decimal:60014},{icon_id:"11121478",name:"\u5411\u4E0A",font_class:"xiangshang7",unicode:"e63c",unicode_decimal:58940},{icon_id:"16388177",name:"\u64AD\u653E",font_class:"bofang26",unicode:"e60e",unicode_decimal:58894},{icon_id:"18176557",name:"\u64AD\u653E",font_class:"play1",unicode:"ea8d",unicode_decimal:60045},{icon_id:"24267227",name:"\u64AD\u653E-\u5FEB\u9000",font_class:"bofang-kuaitui",unicode:"e68a",unicode_decimal:59018},{icon_id:"24267260",name:"\u64AD\u653E09",font_class:"bofang09",unicode:"e690",unicode_decimal:59024},{icon_id:"24268374",name:"\u64AD\u653E-\u5FEB\u8FDB",font_class:"bofang-kuaijin",unicode:"e6d8",unicode_decimal:59096},{icon_id:"25807740",name:"\u5411\u4E0A",font_class:"xiangxia7",unicode:"ec62",unicode_decimal:60514}],Wl={id:Ll,name:Ul,font_family:Ml,css_prefix_text:Ol,description:jl,glyphs:Hl},Xl={class:"icon-list"},ql=["onClick"],Gl=V({__name:"IconFont",setup(e){const t=L(()=>Wl.glyphs.map(a=>`icon-${a.font_class}`)),n=I(!0),o=()=>{n.value=!1},r=a=>{Bt(a),Me.success(`\u590D\u5236\u56FE\u6807: ${a}`)};return(a,l)=>(F(),K(Kn,null,{default:H(()=>[z(x(Yn),{class:"show-card",show:n.value,preset:"card",onMaskClick:o,title:`\u56FE\u6807\u6570\u91CF${x(t).length}`,onClose:o,"onUpdate:show":l[0]||(l[0]=()=>n.value=!1),style:{width:"50%",maxWidth:"800px"}},{default:H(()=>[ue("ul",Xl,[(F(!0),ee($e,null,Ve(x(t),c=>(F(),ee("li",{key:c,class:"dib",onClick:d=>r(c)},[ue("span",{class:Lt(`icon iconfont ${c}`)},null,2)],8,ql))),128))])]),_:1},8,["show","title"])]),_:1}))}});const Yl=Ce(Gl,[["__scopeId","data-v-538b9921"]]),Kl=()=>{const e=z(Yl,{},null),t=document.createElement("div"),n=document.querySelector("#app");Jn(e,t),n==null||n.appendChild(t)},Jl=Kl,Zl={class:"dialog-footer"},Ql=un("\u53D6\u6D88"),ei=un("\u65B0\u589E"),ti=un("\u66F4\u65B0"),ni=V({__name:"SavePage",props:{index:null},setup(e){const t=e,n=Se(),o=I(!0),r=Be({name:"",thumbnail:""}),a=Be({name:[{required:!0,message:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0",trigger:"blur"}]}),l=c=>Re(this,null,function*(){const{name:d,thumbnail:i}=r;if(!d){Me.error("\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0");return}const p={name:d,thumbnail:i,canvasData:n.layoutData,canvasStyle:n.canvasStyleData};if(c==="update")try{(yield Va(t.index,p)).status===200&&Me.success("\u4FEE\u6539\u6210\u529F")}catch(s){Me.error("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5BFC\u51FA\u5230\u672C\u5730\uFF0C\u5E76\u91CD\u65B0\u8FDB\u5165\u6B64\u9875\u9762")}finally{o.value=!1}else try{const s=yield La(p);s.status===201&&(Me.success("\u4FDD\u5B58\u6210\u529F"),ka.push({name:"Editor",params:{index:s.data.id}}))}catch(s){Me.error(`\u4FDD\u5B58\u5931\u8D25\uFF0C\u5931\u8D25\u4FE1\u606F:${(s==null?void 0:s.message)||s}`)}finally{o.value=!1}});return(c,d)=>(F(),K(Kn,null,{default:H(()=>[z(x(Yn),{show:o.value,"mask-closable":!1,preset:"card",center:"",title:"\u4FDD\u5B58\u5F53\u524D\u5E03\u5C40",style:{width:"30%",minWidth:"600px"},"onUpdate:show":d[5]||(d[5]=()=>o.value=!1),size:"medium"},{footer:H(()=>[ue("span",Zl,[z(x(et),{onClick:d[2]||(d[2]=i=>o.value=!1)},{default:H(()=>[Ql]),_:1}),e.index?(F(),K(x(et),{key:1,type:"primary",onClick:d[4]||(d[4]=i=>l("update"))},{default:H(()=>[ti]),_:1})):(F(),K(x(et),{key:0,type:"primary",onClick:d[3]||(d[3]=i=>l("new"))},{default:H(()=>[ei]),_:1}))])]),default:H(()=>[z(x(fn),{model:r,rules:a,onSubmit:d[1]||(d[1]=cn(()=>{},["prevent"]))},{default:H(()=>[z(x(Ft),{label:"\u9875\u9762\u540D\u79F0",prop:"name"},{default:H(()=>[z(x(yt),{modelValue:r.name,"onUpdate:modelValue":d[0]||(d[0]=i=>r.name=i),placeholder:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1}))}}),oi=e=>{const t=z(ni,{index:e},null),n=document.createElement("div");Jn(t,n)},ai=oi,Ln=V({__name:"ToolBarItem",props:{label:null,action:null,disable:{type:Function,default:()=>!1},icon:null,divider:{type:[Boolean,null]},children:null,otherShow:null},setup(e){const t=e,n=L(()=>typeof t.icon=="string"?h(Ue,{name:t.icon,size:"24"}):t.icon());return(o,r)=>(F(),ee($e,null,[z(x(Ra),null,{trigger:H(()=>[z(x(et),{quaternary:"",size:"small",onClick:e.action,title:e.label},{default:H(()=>[z(x(n))]),_:1},8,["onClick","title"])]),default:H(()=>[ue("span",null,nt(e.label),1)]),_:1}),e.divider?(F(),K(x($a),{key:0,vertical:""})):It("",!0)],64))}}),ri={class:"tool-bar"},li={class:"tool-bar-item"},ii={class:"tool-bar-title"},si={class:"tool-bar-item"},di=V({__name:"Toolbar",setup(e){const t=Se(),n=Da(),o=Zn(),r=[{label:"\u9996\u9875",action:c=>{n.push({name:"Pages"})},icon:"home",divider:!0,location:"left"},{label:"\u4FDD\u5B58",action:()=>ai(o.params.index),icon:"save-one",location:"left"},{label:"\u9884\u89C8",action:c=>{const{href:d}=n.resolve("/preview");window.open(d,"_blank")},icon:"computer",location:"left"},{label:"\u64A4\u9500",action:zl,icon:"back",location:"left"},{label:"\u6062\u590D",action:Fl,icon:"next",location:"left"},{label:"\u5BFC\u51FA",action:()=>Tl(o.params.index||""),icon:"download-one",location:"left"},{label:"\u5BFC\u5165",action:Pl,icon:"upload-one",location:"left"},{label:"\u5168\u5C4F",action:()=>{const c=document.querySelector("#editor");document.fullscreenEnabled&&c&&c.requestFullscreen()},icon:"full-screen",location:"left"},{label:"\u5750\u6807",action:El,icon:"cones",location:"left"},{label:"\u56FE\u6807",action:Jl,icon:"game-ps",location:"right"},{label:"\u4E3B\u9898",action:Nl,icon:()=>h(Vl),location:"right"}],a=r.filter(c=>c.location==="left"),l=r.filter(c=>c.location==="right");return(c,d)=>(F(),ee("div",ri,[ue("div",li,[(F(!0),ee($e,null,Ve(x(a),(i,p)=>(F(),K(Ln,{key:p,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))]),ue("div",ii,nt(x(t).name),1),ue("div",si,[(F(!0),ee($e,null,Ve(x(l),(i,p)=>(F(),K(Ln,{key:p,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))])]))}});const ci=Ce(di,[["__scopeId","data-v-4243bd17"]]),ui=["data-component"],pi=V({__name:"ComponentItem",props:{component:null,name:null},setup(e){return(t,n)=>(F(),ee("div",{draggable:"true","data-component":e.component},[ue("div",null,nt(e.name),1)],8,ui))}}),fi={class:"components"},Un=V({__name:"ComponentList",setup(e){const t=L(()=>{const o={};Object.keys(tn).forEach(a=>{const l=new tn[a],c=l.group;!c||!l.show||(o[c]||(o[c]=[]),o[c].push(l))});const r=[];return Qn.forEach(a=>{var l;r.push({label:()=>a.name,key:a.key,icon:()=>h(Ue,{name:`${a.icon}`}),children:(l=o[a.key])==null?void 0:l.map(c=>({label:()=>h(pi,{component:c.component,name:c.name,ondragstart:n}),key:c.component}))})}),r}),n=o=>{o.dataTransfer.setData("componentName",o.target.dataset.component)};return(o,r)=>(F(),ee("div",fi,[z(x(pn),{options:x(t),accordion:!1},null,8,["options"])]))}}),hi={key:0,class:"layer"},mi={key:1,class:"layer"},bi=V({__name:"LayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),r=(d,i)=>{var p;(p=d.dataTransfer)==null||p.setData("compomentIndex",i),d.stopPropagation()},a=(d,i,p=!1)=>{d.preventDefault(),d.stopPropagation(),p&&i!==n.activeKey&&ze.emit("ActiveMenu",i)},l=(d,i)=>{var C;d.preventDefault(),d.stopPropagation();const p=(C=d.dataTransfer)==null?void 0:C.getData("compomentIndex"),s=c(p,i),f=p.split("-").map(b=>Number(b)),m=o.getComponentByIndex(f),y=o.cutComponent(f[f.length-1],m==null?void 0:m.parent);if(y&&s){const b=p.split("-").map(R=>Number(R)),S=o.getComponentByIndex(b);o.insertComponent(b[b.length-1],y,S),t("select",i)}},c=(d,i)=>{const p=d.split("-").map(m=>parseInt(m)),s=i.split("-").map(m=>parseInt(m)),f=p.length;for(let m=0;m<f;m++)if(p[m]!==s[m]){if(p[m]>s[m])return i;if(p[m]<s[m])return m+1==f?(s[m]=s[m]-1,s.join("-")):i}return i};return(d,i)=>{const p=xt("icon-park"),s=ot("contextmenu");return me((F(),ee("div",{draggable:"true",onDragstart:i[0]||(i[0]=f=>r(f,e.index)),onDrop:i[1]||(i[1]=f=>l(f,e.index)),onDragover:i[2]||(i[2]=f=>a(f,e.index,!0))},[e.component.component==="Group"?(F(),ee("div",hi,[me(ue("span",null,nt(e.component.name||"\u5206\u7EC4"),513),[[De,e.mode==="expand"]]),e.component.display?(F(),K(p,{key:0,name:"preview-open",size:"15"})):(F(),K(p,{key:1,name:"preview-close-one",size:"15"}))])):(F(),ee("div",mi,[me(ue("span",null,nt(e.component.name),513),[[De,e.mode==="expand"]]),e.component.display?(F(),K(p,{key:0,size:"15",name:"preview-open"})):(F(),K(p,{key:1,size:"15",name:"preview-close-one"}))]))],32)),[[s,e.contextmenus,void 0,{stop:!0}]])}}});const Mn=Ce(bi,[["__scopeId","data-v-debdcf62"]]),vi=V({__name:"SimpleLayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},name:null,contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),r=(d,i)=>{var p;(p=d.dataTransfer)==null||p.setData("compomentIndex",i),d.stopPropagation()},a=(d,i,p=!1)=>{d.preventDefault(),d.stopPropagation(),p&&i!==n.activeKey&&ze.emit("ActiveMenu",i)},l=(d,i)=>{var C;d.preventDefault(),d.stopPropagation();const p=(C=d.dataTransfer)==null?void 0:C.getData("compomentIndex"),s=c(p,i),f=p.split("-").map(b=>Number(b)),m=o.getComponentByIndex(f),y=o.cutComponent(f[f.length-1],m==null?void 0:m.parent);if(y&&s){const b=p.split("-").map(R=>Number(R)),S=o.getComponentByIndex(b);o.insertComponent(b[b.length-1],y,S),t("select",i)}},c=(d,i)=>{const p=d.split("-").map(m=>parseInt(m)),s=i.split("-").map(m=>parseInt(m)),f=p.length;for(let m=0;m<f;m++)if(p[m]!==s[m]){if(p[m]>s[m])return i;if(p[m]<s[m])return m+1==f?(s[m]=s[m]-1,s.join("-")):i}return i};return(d,i)=>{const p=xt("IconPark"),s=ot("contextmenu");return me((F(),K(p,{draggable:"true",onDragstart:i[0]||(i[0]=f=>r(f,e.index)),onDrop:i[1]||(i[1]=f=>l(f,e.index)),onDragover:i[2]||(i[2]=f=>a(f,e.index,!0)),name:e.name},null,8,["name"])),[[s,e.contextmenus,void 0,{stop:!0}]])}}});const On=Ce(vi,[["__scopeId","data-v-33315ec9"]]),jn=V({__name:"Layer",setup(e){const t=Se(),n=no(),o={};Qn.map(v=>{o[v.key]=v.icon});const r=L(()=>t.componentData),a=I(null),l=I("");zt("ActiveMenu",v=>{const g=v;l.value=g,a.value&&a.value.open&&a.value.open(g)});const d=v=>{l.value=v;const g=v.split("-").map(B=>Number(B)),w=t.getComponentByIndex(g);w&&t.setCurComponent(w,v)},i=I([]),p=(v,g,w)=>{for(let B=0;B<g.length;B++){const N=g[B],q=s(B,v);if(N.component==="Group"){const ie=[];w.push({label:()=>h(Mn,{component:N,index:q,contextmenus:()=>D(q),onclick:()=>d(q)}),key:q,icon:()=>h(On,{name:"branch-one",component:N,index:q,contextmenus:()=>D(q),onclick:()=>d(q)}),children:p(q,N.subComponents||[],ie)})}else w.push({label:()=>h(Mn,{component:N,index:q,contextmenus:()=>D(q)}),key:q,icon:()=>h(On,{name:`${o[N.group]}`,component:N,index:q,contextmenus:()=>D(q),onclick:()=>d(q)})})}return w},s=(v,g)=>g?`${g}-${v}`:v.toString(),f=v=>{const g=v.split("-").map(B=>Number(B)),w=t.getComponentByIndex(g);w&&(w.groupStyle=void 0,Bt(JSON.stringify(w.toJson())),n.copy())},m=v=>Re(this,null,function*(){var w;d(v);const g=v.split("-").map(B=>Number(B));t.removeComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),y=v=>Re(this,null,function*(){var w;d(v);const g=v.split("-").map(B=>Number(B));t.upComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),C=v=>Re(this,null,function*(){var w;d(v);const g=v.split("-").map(B=>Number(B));t.downComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),b=v=>Re(this,null,function*(){var w;d(v);const g=v.split("-").map(B=>Number(B));t.topComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),S=v=>Re(this,null,function*(){var w;d(v);const g=v.split("-").map(B=>Number(B));t.bottomComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),R=v=>{d(v);const g=v.split("-").map(B=>Number(B)),w=t.getComponentByIndex(g);w&&w.hiddenComponent()},E=v=>{d(v);const g=v.split("-").map(B=>Number(B)),w=t.getComponentByIndex(g);w&&w.showComponent()},P=v=>{const g=v.split("-").map(N=>Number(N)),w=t.getComponentByIndex(g),B=t.cutComponent(g[g.length-1],w==null?void 0:w.parent);B&&(Bt(JSON.stringify(B.toJson())),n.copy())},O=v=>{const g=v.split("-").map(N=>Number(N)),w=n.copyData,B=t.getComponentByIndex(g);if(w){const N=Ia(n.copyData);N.id=za(),t.insertComponent(g[g.length-1],N,B==null?void 0:B.parent)}},D=v=>{var w,B,N;const g=v.split("-").map(q=>parseInt(q));return[{text:"\u590D\u5236",subText:"Ctrl + C",handler:()=>f(v)},{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:()=>O(v)},{text:"\u526A\u5207",subText:"Ctrl + V",handler:()=>P(v)},{text:"\u62C6\u5206",subText:"Ctrl + V",disable:((w=t.getComponentByIndex(v.split("-").map(q=>Number(q))))==null?void 0:w.component)!=="Group",handler:()=>t.decompose()},{text:"\u5220\u9664",subText:"",handler:()=>m(v)},{divider:!0},{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(v),children:[{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(v)},{text:"\u4E0A\u79FB\u4E00\u5C42",handler:()=>y(v)}]},{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v),children:[{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v)},{text:"\u4E0B\u79FB\u4E00\u5C42",handler:()=>C(v)}]},{divider:!0},{text:"\u663E\u793A",disable:(B=t.getComponentByIndex(g))==null?void 0:B.display,subText:"",handler:()=>E(v)},{text:"\u9690\u85CF",disable:!((N=t.getComponentByIndex(g))!=null&&N.display),subText:"",handler:()=>R(v)}]};return Te(()=>t.componentData,()=>{const v=t.componentData;i.value=[],i.value=p("",v,[])},{deep:!0,immediate:!0}),(v,g)=>(F(),ee("div",null,[x(r).length>0?(F(),K(x(pn),{key:0,options:i.value,"onUpdate:value":d},null,8,["options"])):(F(),K(x(qr),{key:1,class:"placeholder"},{default:H(()=>[z(x(Yr),null,{default:H(()=>[z(x(Ba),{description:"\u753B\u5E03\u4E3A\u7A7A"})]),_:1})]),_:1}))]))}}),gi=ue("span",null,"\u7EC4\u4EF6",-1),xi=ue("span",null,"\u56FE\u5C42",-1),yi=V({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=I("components"),o=a=>{t("update:iscollapsed",!1),n.value=a},r=a=>{n.value=a};return(a,l)=>{const c=xt("IconPark");return e.iscollapsed?(F(),K(x(Tt),{key:1,type:"line",animated:"","bar-width":48,"justify-content":"center","onUpdate:value":[o,l[4]||(l[4]=d=>n.value=d)],value:n.value},{default:H(()=>[n.value==="components"?(F(),K(x(Je),{key:0,name:"components","display-directive":"show:lazy"},{tab:H(()=>[z(c,{name:"components",onClick:l[2]||(l[2]=d=>r("layer"))})]),default:H(()=>[z(Un)]),_:1})):n.value==="layer"?(F(),K(x(Je),{key:1,name:"layer","display-directive":"show:lazy"},{tab:H(()=>[z(c,{name:"layers",onClick:l[3]||(l[3]=d=>r("components"))})]),default:H(()=>[z(jn)]),_:1})):It("",!0)]),_:1},8,["value"])):(F(),K(x(Tt),{key:0,type:"line",animated:"","bar-width":100,"justify-content":"center",value:n.value,"onUpdate:value":[l[0]||(l[0]=d=>n.value=d),l[1]||(l[1]=d=>n.value=d)]},{default:H(()=>[z(x(Je),{name:"components","display-directive":"show:lazy"},{tab:H(()=>[z(c,{name:"components"}),gi]),default:H(()=>[z(Un)]),_:1}),z(x(Je),{name:"layer","display-directive":"show:lazy"},{tab:H(()=>[z(c,{name:"layers"}),xi]),default:H(()=>[z(jn)]),_:1})]),_:1},8,["value"]))}}}),_i=[{label:"4K",value:"3840X2160"},{label:"2k",value:"2048X1080"},{label:"1080P",value:"1920X1080"},{label:"720P",value:"1366X768"},{label:"iPhoneXR",value:"414X896"},{label:"iPhoneSE",value:"375X667"},{label:"iPhone12Pro",value:"390X884"},{label:"GalaxyS8+",value:"360X740"},{label:"GalaxyS20Ultra+",value:"412X915"},{label:"iPadAir",value:"820X1180"},{label:"iPadMini",value:"768X1024"},{label:"SurfacePro7",value:"912X1368"},{label:"NestHub",value:"1024X600"},{label:"NestMax",value:"1028X800"}],wi=_i,Ci={class:"attr-list"},Si=V({__name:"Canvas",setup(e){const t=L(()=>[{label:"\u672C\u8BBE\u5907",value:`${window.screen.width}X${window.screen.height}`},...wi]),n=Se(),o=I({width:n.canvasData.width,height:n.canvasData.height,scale:n.canvasData.scale,image:n.canvasData.image,color:n.canvasData.color||"#084860"}),r=()=>{n.setCanvasStyle(o.value)},a=I("\u672C\u8BBE\u5907"),l=[{key:"width",label:"\u5BBD\u5EA6",type:ye.NUMBER},{key:"height",label:"\u9AD8\u5EA6",type:ye.NUMBER},{key:"image",label:"\u80CC\u666F\u56FE",type:ye.TEXT},{key:"color",label:"\u80CC\u666F\u8272",type:ye.COLOR}],c=d=>{const i=d.split("X"),p=parseInt(i[0]),s=parseInt(i[1]);o.value.width=p,o.value.height=s};return(d,i)=>(F(),ee("div",Ci,[z(x(fo),null,{default:H(()=>[z(x(fn),{size:"small",onSubmit:i[1]||(i[1]=cn(()=>{},["prevent"])),"label-placement":"left","label-align":"left"},{default:H(()=>[z(x(Ft),{label:"\u5206\u8FA8\u7387"},{default:H(()=>[z(x(Ut),{value:a.value,"onUpdate:value":[i[0]||(i[0]=p=>a.value=p),c],placeholder:"\u9009\u62E9\u5206\u8FA8\u7387",options:x(t)},null,8,["value","options"])]),_:1}),(F(),ee($e,null,Ve(l,({key:p,label:s,type:f},m)=>z(x(Ft),{key:m,label:s},{default:H(()=>[f===x(ye).NUMBER?(F(),K(x(mn),{key:0,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r]},null,8,["value","onUpdate:value"])):f===x(ye).COLOR?(F(),K(x(Et),{key:1,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r],modes:["hex","rgb","hsl"]},null,8,["value","onUpdate:value"])):(F(),K(x(yt),{key:2,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r]},null,8,["value","onUpdate:value"]))]),_:2},1032,["label"])),64))]),_:1})]),_:1})]))}});const ki=Ce(Si,[["__scopeId","data-v-2cd84705"]]),Ri=[{label:"Arial",value:"Arial"},{label:"\u5FAE\u8F6F\u96C5\u9ED1",value:"Microsoft Yahei"},{label:"\u5B8B\u4F53",value:"SimSun"},{label:"\u9ED1\u4F53",value:"SimHei"},{label:"\u6977\u4F53",value:"KaiTi"},{label:"\u65B0\u5B8B\u4F53",value:"NSimSun"},{label:"\u4EFF\u5B8B",value:"FangSong"},{label:"\u82F9\u65B9",value:"PingFang SC"},{label:"\u534E\u6587\u9ED1\u4F53",value:"STHeiti"},{label:"\u534E\u6587\u6977\u4F53",value:"STKaiti"},{label:"\u534E\u6587\u5B8B\u4F53",value:"STSong"},{label:"\u534E\u6587\u4EFF\u5B8B",value:"STFangSong"},{label:"\u534E\u6587\u4E2D\u5B8B",value:"STZhongSong"},{label:"\u534E\u6587\u7425\u73C0",value:"STHupo"},{label:"\u534E\u6587\u65B0\u9B4F",value:"STXinwei"},{label:"\u534E\u6587\u96B6\u4E66",value:"STLiti"},{label:"\u534E\u6587\u884C\u6977",value:"STXingkai"},{label:"\u51AC\u9752\u9ED1\u4F53",value:"Hiragino Sans GB"},{label:"\u5170\u4EAD\u9ED1",value:"Lantinghei SC"},{label:"\u504F\u504F\u4F53",value:"Hanzipen SC"},{label:"\u624B\u672D\u4F53",value:"Hannotate SC"},{label:"\u5B8B\u4F53",value:"Songti SC"},{label:"\u5A03\u5A03\u4F53",value:"Wawati SC"},{label:"\u884C\u6977",value:"Xingkai SC"},{label:"\u5706\u4F53",value:"Yuanti SC"},{label:"\u534E\u6587\u7EC6\u9ED1",value:"STXihei"},{label:"\u5E7C\u5706",value:"YouYuan"},{label:"\u96B6\u4E66",value:"LiSu"},{label:"LED",value:"LED"},{label:"LCD",value:"LCD"}],$i=[{label:"100 Thin",value:100},{label:"200 ExtraThin",value:200},{label:"300 Light",value:300},{label:"400 Normal",value:400},{label:"500 Medium",value:500},{label:"600 Semi Bold",value:600},{label:"700 Bold",value:700},{label:"Extra Bold",value:800},{label:"Black",value:900}],Di=V({__name:"FontStyle",props:{value:{default:""}},emits:["update:value","change"],setup(e,{emit:t}){const o=I(e.value),r=Be(Ri),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,c)=>(F(),K(x(Ut),{clearable:"",value:o.value,"onUpdate:value":[c[0]||(c[0]=d=>o.value=d),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u4F53",options:r},null,8,["value","options"]))}}),Bi=V({__name:"FontWeight",props:{value:{default:400}},emits:["update:value","change"],setup(e,{emit:t}){const o=I(e.value),r=Be($i),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,c)=>(F(),K(x(Ut),{clearable:"",value:o.value,"onUpdate:value":[c[0]||(c[0]=d=>o.value=d),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u91CD",options:r},null,8,["value","options"]))}}),Ii={class:"linear-gradient"},zi=V({__name:"LinearGradient",props:{value:{default:()=>({angle:0,color1:"",color2:""})}},emits:["update:value"],setup(e,{emit:t}){const n=e,o=I({angle:n.value.angle||0,color1:n.value.color1||"",color2:n.value.color2||""}),r=(a,l)=>{o.value[a]=l,t("update:value",o.value)};return(a,l)=>(F(),ee("div",Ii,[z(x(mn),{modelValue:e.value.angle,"onUpdate:value":l[0]||(l[0]=c=>r("angle",c)),controls:!0,min:0,max:360,step:1},null,8,["modelValue"]),z(x(Et),{value:e.value.color1,"onUpdate:value":l[1]||(l[1]=c=>r("color1",c)),swatches:x(nn)},null,8,["value","swatches"]),z(x(Et),{value:e.value.color2,"onUpdate:value":l[2]||(l[2]=c=>r("color2",c)),swatches:x(nn)},null,8,["value","swatches"])]))}}),Fi=V({props:{args:{type:Object,default:()=>{}},component:{type:Object,default:()=>{}},value:{type:Object}},emits:["update:value","change"],setup(e,{emit:t}){const n=o=>{t("update:value",o),t("change",o)};return()=>[h(e.component,Mt(_t({},e.args),{value:e.value,onChange:n}))]}});function Gt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Ea(e)}const bo=V({components:{FontStyle:Di,FontWeight:Bi,LinearGradient:zi,NSwitch:Fa},props:{name:{type:String,required:!0},uid:{type:String,required:!0},ukey:{type:String,required:!0},children:{type:Array,required:!0},data:{type:Object,required:!0}},emits:["change"],setup(e,{emit:t}){const n=Be(e.data),o=(a,l)=>{t("change",l,a)},r=a=>{var d;let l;const c=((d=a.componentOptions)==null?void 0:d.options)||[];switch(a.type){case ye.COLOR:return z(Et,{value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,swatches:nn,modes:["hex","rgb","hsl"],onUpdateValue:s=>o(s,a.prop)},null);case ye.SELECT:return z(Ut,{value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,placeholder:a.label,onUpdateValue:s=>o(s,a.prop),options:c},null);case ye.RADIO:return z(jr,{value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,placeholder:a.label,onUpdateValue:s=>o(s,a.prop)},Gt(l=c.map(s=>z(Lr,{label:s.value,key:s.value},{default:()=>[s.label]})))?l:{default:()=>[l]});case ye.NUMBER:const i="max"in a.componentOptions?a.componentOptions.max:9999999999,p="min"in a.componentOptions?a.componentOptions.min:-9999999999;return z(mn,{value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,onUpdateValue:s=>o(s,a.prop),max:i,min:p},null);case ye.SWITCH:case ye.FONT_STYLE:case ye.FONT_WEIGHT:case ye.LINEAR_GRADIENT:return h(xt(a.type),{value:n[a.prop],["onUpdate:value"]:s=>{n[a.prop]=s,o(s,a.prop)}});case ye.CUSTOM:return z(Fi,{value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,onUpdateValue:s=>o(s,a.prop),component:a.componentOptions.componentType,args:a.componentOptions.args},null);default:return z(yt,{clearable:!0,value:n[a.prop],"onUpdate:value":s=>n[a.prop]=s,onUpdateValue:s=>o(s,a.prop),readonly:a.componentOptions.editable===!1,disabled:a.componentOptions.disabled},null)}};return()=>{let a;return z(fn,{size:"small",labelPlacement:"left",labelAlign:"left"},Gt(a=e.children.map(l=>{let c;return z(Ft,{key:`${e.ukey}${l.prop}`,label:l.label},Gt(c=r(l))?c:{default:()=>[c]})}))?a:{default:()=>[a]})}}}),Ei={class:"attr-list"},Ti=V({__name:"StyleList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Be({}),r=L(()=>t.curComponent?t.curComponent.styleFormValue:{}),a=ln((d,i)=>{if(t.curComponent)if(["top","left","width","height","rotate"].includes(d)){const s=t.curComponent.parent;n.syncComponentLoction({[d]:i},s,!0),s&&n.resizeAutoComponent(s)}else n.setCurComponentStyle(d,i)},300),l=ln(d=>{const i=Ta(d,o);i&&Object.keys(i).forEach(p=>{o[p]=i[p]})},200),c=()=>{t.curComponent&&(eo(o),l(t.curComponent.style))};return Te(()=>[t.curComponent.id,t.curComponent.positionStyle],()=>{t.curComponent&&t.curComponent.id&&c()},{immediate:!0,deep:!0}),(d,i)=>(F(),ee("div",Ei,[z(x(so),{accordion:""},{default:H(()=>[(F(!0),ee($e,null,Ve(x(r),({label:p,prop:s,children:f})=>(F(),K(x(co),{key:`${e.curComponent.id}${s}`,title:p,name:s},{default:H(()=>[z(x(bo),{children:f,data:o,onChange:x(a),name:p,uid:s,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Pi=Ce(Ti,[["__scopeId","data-v-050459f8"]]),Ai={class:"attr-list"},Ni=V({__name:"AttrList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Be({common:{name:t.curComponent.name,component:t.curComponent.component,id:t.curComponent.id}}),r=L(()=>t.curComponent?t.curComponent.propFromValue:[]),a=(c,d,i)=>{n.setCurComponentPropValue(c,d,i)},l=()=>{eo(o,["common"]),o.common.name=t.curComponent.name,o.common.component=t.curComponent.component,o.common.id=t.curComponent.id,t.curComponent&&t.curComponent.propValue&&Object.keys(t.curComponent.propValue).forEach(c=>{o[c]=t.curComponent.propValue[c]})};return Te(()=>t.curComponent.id,()=>{l()},{immediate:!0}),(c,d)=>(F(),ee("div",Ai,[z(x(so),{accordion:""},{default:H(()=>[(F(!0),ee($e,null,Ve(x(r),({label:i,prop:p,children:s})=>(F(),K(x(co),{key:`${e.curComponent.id}${p}`,title:i,name:p},{default:H(()=>[z(x(bo),{children:s,data:o[p],onChange:(f,m)=>a(p,f,m),name:i,uid:p,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Vi=Ce(Ni,[["__scopeId","data-v-010e5f45"]]),Li={key:0},Ui={key:1},Mi=V({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=I("attr"),o=Se(),r=L(()=>o.curComponent),a=L(()=>o.curComponent?[{label:"\u6837\u5F0F",key:"4",icon:()=>h(Ue,{name:"text-style",onClick:()=>l("style")})},{label:"\u5C5E\u6027",key:"2",icon:()=>h(Ue,{name:"internal-data",onClick:()=>l("attr")})}]:[{label:"\u753B\u5E03",key:"1",icon:()=>h(Ue,{name:"page"})}]),l=c=>{t("update:iscollapsed",!1),n.value=c};return(c,d)=>e.iscollapsed?(F(),ee("div",Ui,[z(x(pn),{options:x(a)},null,8,["options"])])):(F(),ee("div",Li,[x(r)?(F(),K(x(Tt),{key:0,type:"line",animated:"","justify-content":"center",value:n.value,"onUpdate:value":[d[0]||(d[0]=i=>n.value=i),d[1]||(d[1]=i=>n.value=i)]},{default:H(()=>[z(x(Je),{name:"style","display-directive":"show:lazy"},{tab:H(()=>[z(x(Ue),{name:"text-style"}),me(ue("span",null,"\u6837\u5F0F",512),[[De,!e.iscollapsed]])]),default:H(()=>[z(x(Pi),{curComponent:x(r)},null,8,["curComponent"])]),_:1}),z(x(Je),{name:"attr","display-directive":"show:lazy"},{tab:H(()=>[z(x(Ue),{name:"internal-data"}),me(ue("span",null,"\u5C5E\u6027",512),[[De,!e.iscollapsed]])]),default:H(()=>[z(x(Vi),{curComponent:x(r)},null,8,["curComponent"])]),_:1})]),_:1},8,["value"])):(F(),K(x(Tt),{key:1,type:"line",animated:"","justify-content":"center"},{default:H(()=>[z(x(Je),{name:"canvas","display-directive":"show:lazy"},{tab:H(()=>[z(x(Ue),{name:"page"}),me(ue("span",null,"\u753B\u5E03",512),[[De,!e.iscollapsed]])]),default:H(()=>[z(ki)]),_:1})]),_:1}))]))}}),Oi=V({__name:"DesignerPage",setup(e){const t=Se(),n=I(!1),o=I(!1),r=Zn();Vt(()=>Re(this,null,function*(){const p=r.params.index;p&&(yield a(p))}));const a=p=>Re(this,null,function*(){const s=yield Ua(p);!s.data||t.setLayoutData(s.data)}),l=I(0),c=I(0),d=L(()=>({width:l.value+"px",height:c.value+"px"})),i=p=>{const s=p[0],{width:f,height:m}=s.contentRect;l.value=f,c.value=m};return qn(()=>{t.clearCanvas()}),(p,s)=>{const f=ot("resize");return F(),K(x(Ot),{class:"home"},{default:H(()=>[z(x(Pa),{class:"header"},{default:H(()=>[z(x(ci))]),_:1}),z(x(Ot),{"has-sider":"",class:"main"},{default:H(()=>[z(x(kn),{class:"left",width:"200",collapsed:n.value,"native-scrollbar":!1,bordered:"","collapse-mode":"width","show-trigger":"",onCollapse:s[2]||(s[2]=()=>n.value=!0),onExpand:s[3]||(s[3]=()=>n.value=!1)},{default:H(()=>[z(x(yi),{iscollapsed:n.value,"onUpdate:iscollapsed":[s[0]||(s[0]=m=>n.value=m),s[1]||(s[1]=m=>n.value=m)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"]),z(x(Ot),{"has-sider":"","sider-placement":"right"},{default:H(()=>[me((F(),K(x(Aa),{class:"content"},{default:H(()=>[z(x(fo),{"x-scrollable":"",style:Ne(x(d))},{default:H(()=>[z(Il)]),_:1},8,["style"])]),_:1})),[[f,i]]),z(x(kn),{class:"right",width:"240",collapsed:o.value,"native-scrollbar":!1,bordered:"","collapsed-width":35,"collapse-mode":"width","show-trigger":"arrow-circle",onCollapse:s[6]||(s[6]=()=>o.value=!0),onExpand:s[7]||(s[7]=()=>o.value=!1)},{default:H(()=>[z(x(Mi),{iscollapsed:o.value,"onUpdate:iscollapsed":[s[4]||(s[4]=m=>o.value=m),s[5]||(s[5]=m=>o.value=m)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"])]),_:1})]),_:1})]),_:1})}}});const Ki=Ce(Oi,[["__scopeId","data-v-0ebe2819"]]);export{Ki as default};
