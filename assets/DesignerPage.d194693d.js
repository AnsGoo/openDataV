var Po=Object.defineProperty,Ao=Object.defineProperties;var No=Object.getOwnPropertyDescriptors;var gn=Object.getOwnPropertySymbols;var Vo=Object.prototype.hasOwnProperty,Lo=Object.prototype.propertyIsEnumerable;var xn=(e,t,n)=>t in e?Po(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,_t=(e,t)=>{for(var n in t||(t={}))Vo.call(t,n)&&xn(e,n,t[n]);if(gn)for(var n of gn(t))Lo.call(t,n)&&xn(e,n,t[n]);return e},Ut=(e,t)=>Ao(e,No(t));var Re=(e,t,n)=>new Promise((o,r)=>{var a=s=>{try{i(n.next(s))}catch(c){r(c)}},l=s=>{try{i(n.throw(s))}catch(c){r(c)}},i=s=>s.done?o(s.value):Promise.resolve(s.value).then(a,l);i((n=n.apply(e,t)).next())});import{d as V,r as z,a1 as Uo,a2 as Mo,a3 as f,a4 as yn,a5 as Oo,a6 as $t,a7 as jo,a8 as _,a9 as U,aa as O,ab as Pe,ac as Ho,ad as je,ae as Ee,af as He,ag as Je,ah as Ae,ai as it,aj as Qe,ak as Xe,al as st,i as L,am as Tt,an as dt,ao as dn,ap as ft,aq as Gt,ar as Yt,as as Kt,at as Wo,au as Xo,av as G,aw as Pt,ax as Wn,ay as we,az as qo,aA as At,aB as _e,aC as tt,T as Te,aD as be,aE as ct,aF as Go,aG as Zt,aH as Yo,aI as Ko,aJ as Zo,aK as Jo,aL as Qo,w as me,aM as ea,aN as le,aO as et,aP as kt,aQ as ta,aR as na,aS as gt,aT as oa,W as De,aU as aa,aV as ra,aW as Fe,aX as Xn,aY as Dt,aZ as la,a_ as mt,a$ as qn,b0 as bt,b1 as ht,b2 as ia,b3 as sa,b4 as da,b5 as Jt,b6 as ca,b7 as _n,b8 as wn,b9 as ua,ba as pa,F as $e,bb as fa,bc as ha,bd as ma,be as ba,bf as va,bg as Cn,bh as ga,bi as xa,a as Nt,f as ot,o as F,c as ee,b as ue,t as nt,l as Ne,u as x,_ as Ce,bj as Be,U as I,e as Ve,A as K,n as Vt,bk as ya,q as Se,bl as Qt,bm as Sn,v as Gn,H as kn,a0 as _a,P as cn,E as H,D as wa,bn as Ca,m as Bt,bo as un,K as en,bp as Sa,bq as Yn,Q as Me,br as ka,bs as Ra,bt as xt,bu as Kn,bv as Zn,bw as Jn,z as pn,bx as $a,X as Ue,by as Da,bz as Ba,Z as za,Y as Qn,bA as eo,bB as fn,bC as Ia,O as tn,bD as Fa,h as Ea,bE as ye,bF as Lt,bG as nn,bH as Ta,bI as Pa,bJ as to,bK as Aa,bL as Na,bM as Rn,bN as Mt,bO as Va}from"./index.16fa4e54.js";import{u as no,a as oo,S as La}from"./Shape.85f0decd.js";import{e as Ie,u as zt}from"./useEventBus.2c8f7926.js";import{u as Ua,s as Ma,g as Oa}from"./pages.35c0b64b.js";import{N as yt,a as hn,b as It}from"./FormItem.0a9140c6.js";import"./index.45df55c0.js";function ao(e,t,n){t/=100,n/=100;const o=t*Math.min(n,1-n)+n;return[e,o?(2-2*n/o)*100:0,o*100]}function Rt(e,t,n){t/=100,n/=100;const o=n-n*t/2,r=Math.min(o,1-o);return[e,r?(n-o)/r*100:0,o*100]}function Oe(e,t,n){t/=100,n/=100;let o=(r,a=(r+e/60)%6)=>n-n*t*Math.max(Math.min(a,4-a,1),0);return[o(5)*255,o(3)*255,o(1)*255]}function on(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(a<0?a+6:a),o&&r/o*100,o*100]}function an(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=1-Math.abs(o+o-r-1),l=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(l<0?l+6:l),a?r/a*100:0,(o+o-r)*50]}function rn(e,t,n){t/=100,n/=100;let o=t*Math.min(n,1-n),r=(a,l=(a+e/30)%12)=>n-o*Math.max(Math.min(l-3,9-l,1),-1);return[r(0)*255,r(8)*255,r(4)*255]}function ro(e,t="default",n=[]){const r=e.$slots[t];return r===void 0?n:r()}function $n(e,t="default",n=[]){const{children:o}=e;if(o!==null&&typeof o=="object"&&!Array.isArray(o)){const r=o[t];if(typeof r=="function")return r()}return n}const ja=yn(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[yn("&::-webkit-scrollbar",{width:0,height:0})]),Ha=V({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=z(null);function t(r){!(r.currentTarget.offsetWidth<r.currentTarget.scrollWidth)||r.deltaY===0||(r.currentTarget.scrollLeft+=r.deltaY+r.deltaX,r.preventDefault())}const n=Uo();return ja.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Mo,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...r){var a;(a=e.value)===null||a===void 0||a.scrollTo(...r)}})},render(){return f("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Wa=/\s/;function Xa(e){for(var t=e.length;t--&&Wa.test(e.charAt(t)););return t}var qa=/^\s+/;function Ga(e){return e&&e.slice(0,Xa(e)+1).replace(qa,"")}var Dn=0/0,Ya=/^[-+]0x[0-9a-f]+$/i,Ka=/^0b[01]+$/i,Za=/^0o[0-7]+$/i,Ja=parseInt;function Bn(e){if(typeof e=="number")return e;if(Oo(e))return Dn;if($t(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=$t(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Ga(e);var n=Ka.test(e);return n||Za.test(e)?Ja(e.slice(2),n?2:8):Ya.test(e)?Dn:+e}var Qa=function(){return jo.Date.now()};const Ot=Qa;var er="Expected a function",tr=Math.max,nr=Math.min;function ln(e,t,n){var o,r,a,l,i,s,c=0,p=!1,d=!1,h=!0;if(typeof e!="function")throw new TypeError(er);t=Bn(t)||0,$t(n)&&(p=!!n.leading,d="maxWait"in n,a=d?tr(Bn(n.maxWait)||0,t):a,h="trailing"in n?!!n.trailing:h);function b(B){var v=o,g=r;return o=r=void 0,c=B,l=e.apply(g,v),l}function y(B){return c=B,i=setTimeout(S,t),p?b(B):l}function C(B){var v=B-s,g=B-c,w=t-v;return d?nr(w,a-g):w}function m(B){var v=B-s,g=B-c;return s===void 0||v>=t||v<0||d&&g>=a}function S(){var B=Ot();if(m(B))return R(B);i=setTimeout(S,C(B))}function R(B){return i=void 0,h&&o?b(B):(o=r=void 0,l)}function E(){i!==void 0&&clearTimeout(i),c=0,o=s=r=i=void 0}function P(){return i===void 0?l:R(Ot())}function M(){var B=Ot(),v=m(B);if(o=arguments,r=this,s=B,v){if(i===void 0)return y(s);if(d)return clearTimeout(i),i=setTimeout(S,t),b(s)}return i===void 0&&(i=setTimeout(S,t)),l}return M.cancel=E,M.flush=P,M}var or="Expected a function";function jt(e,t,n){var o=!0,r=!0;if(typeof e!="function")throw new TypeError(or);return $t(n)&&(o="leading"in n?!!n.leading:o,r="trailing"in n?!!n.trailing:r),ln(e,t,{leading:o,maxWait:t,trailing:r})}const lo=V({name:"Add",render(){return f("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},f("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),ar=V({name:"ChevronLeft",render(){return f("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},f("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),rr=V({name:"Remove",render(){return f("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},f("line",{x1:"400",y1:"256",x2:"112",y2:"256",style:`
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `}))}}),lr=_("input-group",`
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
 `,[O("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),U("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[O("state-border, border",`
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
 `),O("box-shadow, border, state-border",`
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
 `),O("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),ir={},sr=V({name:"InputGroup",props:ir,setup(e){const{mergedClsPrefixRef:t}=Pe(e);return Ho("-input-group",lr,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return f("div",{class:`${e}-input-group`},this.$slots)}});function dr(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function vt(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function cr(e){return e=Math.round(e),e>=360?359:e<0?0:e}function ur(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const pr={rgb:{hex(e){return je(Ee(e))},hsl(e){const[t,n,o,r]=Ee(e);return He([...an(t,n,o),r])},hsv(e){const[t,n,o,r]=Ee(e);return Je([...on(t,n,o),r])}},hex:{rgb(e){return Ae(Ee(e))},hsl(e){const[t,n,o,r]=Ee(e);return He([...an(t,n,o),r])},hsv(e){const[t,n,o,r]=Ee(e);return Je([...on(t,n,o),r])}},hsl:{hex(e){const[t,n,o,r]=it(e);return je([...rn(t,n,o),r])},rgb(e){const[t,n,o,r]=it(e);return Ae([...rn(t,n,o),r])},hsv(e){const[t,n,o,r]=it(e);return Je([...ao(t,n,o),r])}},hsv:{hex(e){const[t,n,o,r]=Qe(e);return je([...Oe(t,n,o),r])},rgb(e){const[t,n,o,r]=Qe(e);return Ae([...Oe(t,n,o),r])},hsl(e){const[t,n,o,r]=Qe(e);return He([...Rt(t,n,o),r])}}};function io(e,t,n){return n=n||vt(e),n?n===t?e:pr[n][t](e):null}const lt="12px",fr=12,Ye="6px",hr=6,mr="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",br=V({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:i,left:s}=l.getBoundingClientRect(),c=cr((a.clientX-s-hr)/(i-fr)*360);e.onUpdateHue(c)}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,handleMouseDown:n}},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-color-picker-slider`,style:{height:lt,borderRadius:Ye}},f("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:mr,height:lt,borderRadius:Ye,position:"relative"},onMousedown:this.handleMouseDown},f("div",{style:{position:"absolute",left:Ye,right:Ye,top:0,bottom:0}},f("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Ye})`,borderRadius:Ye,width:lt,height:lt}},f("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Ye,width:lt,height:lt}})))))}}),pt="12px",vr=12,Ke="6px",gr=V({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||!e.rgba||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:i,left:s}=l.getBoundingClientRect(),c=(a.clientX-s)/(i-vr);e.onUpdateAlpha(ur(c))}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,railBackgroundImage:L(()=>{const{rgba:a}=e;return a?`linear-gradient(to right, rgba(${a[0]}, ${a[1]}, ${a[2]}, 0) 0%, rgba(${a[0]}, ${a[1]}, ${a[2]}, 1) 100%)`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:pt,borderRadius:Ke},onMousedown:this.handleMouseDown},f("div",{style:{borderRadius:Ke,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},f("div",{class:`${e}-color-picker-checkboard`}),f("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&f("div",{style:{position:"absolute",left:Ke,right:Ke,top:0,bottom:0}},f("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Ke})`,borderRadius:Ke,width:pt,height:pt}},f("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Ae(this.rgba),borderRadius:Ke,width:pt,height:pt}}))))}}),wt="12px",Ct="6px",xr=V({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:i,height:s,left:c,bottom:p}=l.getBoundingClientRect(),d=(p-a.clientY)/s,h=(a.clientX-c)/i,b=100*(h>1?1:h<0?0:h),y=100*(d>1?1:d<0?0:d);e.onUpdateSV(b,y)}function r(){var a;st("mousemove",document,o),st("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{palleteRef:t,handleColor:L(()=>{const{rgba:a}=e;return a?`rgb(${a[0]}, ${a[1]}, ${a[2]})`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},f("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),f("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&f("div",{class:`${e}-color-picker-handle`,style:{width:wt,height:wt,borderRadius:Ct,left:`calc(${this.displayedSv[0]}% - ${Ct})`,bottom:`calc(${this.displayedSv[1]}% - ${Ct})`}},f("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Ct,width:wt,height:wt}})))}}),mn=Tt("n-color-picker");function yr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function _r(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function wr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function Cr(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function Sr(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const kr={paddingSmall:"0 4px"},zn=V({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=z(""),{themeRef:n}=dt(mn,null);dn(()=>{t.value=o()});function o(){const{value:l}=e;if(l===null)return"";const{label:i}=e;return i==="HEX"?l:i==="A"?`${Math.floor(l*100)}%`:String(Math.floor(l))}function r(l){t.value=l}function a(l){let i,s;switch(e.label){case"HEX":s=Cr(l),s&&e.onUpdateValue(l),t.value=o();break;case"H":i=_r(l),i===!1?t.value=o():e.onUpdateValue(i);break;case"S":case"L":case"V":i=wr(l),i===!1?t.value=o():e.onUpdateValue(i);break;case"A":i=Sr(l),i===!1?t.value=o():e.onUpdateValue(i);break;case"R":case"G":case"B":i=yr(l),i===!1?t.value=o():e.onUpdateValue(i);break}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:r}},render(){const{mergedTheme:e}=this;return f(yt,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:kr,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),Rr=V({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){const{showAlpha:o}=e;if(e.mode==="hex"){e.onUpdateValue((o?je:ft)(n));return}let r;switch(e.valueArr===null?r=[0,0,0,0]:r=Array.from(e.valueArr),e.mode){case"hsv":r[t]=n,e.onUpdateValue((o?Je:Kt)(r));break;case"rgb":r[t]=n,e.onUpdateValue((o?Ae:Yt)(r));break;case"hsl":r[t]=n,e.onUpdateValue((o?He:Gt)(r));break}}}},render(){const{clsPrefix:e,modes:t}=this;return f("div",{class:`${e}-color-picker-input`},f("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),f(sr,null,{default:()=>{const{mode:n,valueArr:o,showAlpha:r}=this;if(n==="hex"){let a=null;try{a=o===null?null:(r?je:ft)(o)}catch(l){}return f(zn,{label:"HEX",showAlpha:r,value:a,onUpdateValue:l=>{this.handleUnitUpdateValue(0,l)}})}return(n+(r?"a":"")).split("").map((a,l)=>f(zn,{label:a.toUpperCase(),value:o===null?null:o[l],onUpdateValue:i=>{this.handleUnitUpdateValue(l,i)}}))}}))}}),$r=V({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:n}=dt(mn,null);return()=>{const{hsla:o,value:r,clsPrefix:a,onClick:l,disabled:i}=e,s=t.label||n.value;return f("div",{class:[`${a}-color-picker-trigger`,i&&`${a}-color-picker-trigger--disabled`],onClick:i?void 0:l},f("div",{class:`${a}-color-picker-trigger__fill`},f("div",{class:`${a}-color-picker-checkboard`}),f("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:o?He(o):""}}),r&&o?f("div",{class:`${a}-color-picker-trigger__value`,style:{color:o[2]>50||o[3]<.5?"black":"white"}},s?s(r):r):null))}}});function Dr(e,t){if(t==="hsv"){const[n,o,r,a]=Qe(e);return Ae([...Oe(n,o,r),a])}return e}function Br(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const zr=V({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=L(()=>e.swatches.map(a=>{const l=vt(a);return{value:a,mode:l,legalValue:Dr(a,l)}}));function n(a){const{mode:l}=e;let{value:i,mode:s}=a;return s||(s="hex",/^[a-zA-Z]+$/.test(i)?i=Br(i):(Wo("color-picker",`color ${i} in swatches is invalid.`),i="#000000")),s===l?i:io(i,l,s)}function o(a){e.onUpdateColor(n(a))}function r(a,l){a.key==="Enter"&&o(l)}return{parsedSwatchesRef:t,handleSwatchSelect:o,handleSwatchKeyDown:r}},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>f("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>this.handleSwatchSelect(t),onKeydown:n=>this.handleSwatchKeyDown(n,t)},f("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),Ir=V({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=vt(e);return Boolean(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(n){var o;const r=n.target.value;(o=e.onUpdateColor)===null||o===void 0||o.call(e,io(r.toUpperCase(),e.mode,"hex")),n.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-color-picker-preview__preview`},f("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),f("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Fr=U([_("color-picker",`
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
 `,[Xo(),_("input",`
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
 `,[O("image",`
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
 `,[O("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),_("color-picker-pallete",`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[O("layer",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[G("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),_("color-picker-preview",`
 display: flex;
 `,[O("sliders",`
 flex: 1 0 auto;
 `),O("preview",`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),O("fill",`
 display: block;
 width: 30px;
 height: 30px;
 `),O("input",`
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
 `),O("mode",`
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
 `,[O("value",`
 white-space: nowrap;
 position: relative;
 `),O("fill",`
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
 `,[O("fill",`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),U("&:focus",`
 outline: none;
 `,[O("fill",[U("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Er=Object.assign(Object.assign({},we.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:Zt.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ft=V({name:"ColorPicker",props:Er,setup(e,{slots:t}){const n=z(null);let o=null;const r=Pt(e),{mergedSizeRef:a,mergedDisabledRef:l}=r,{localeRef:i}=Wn("global"),{mergedClsPrefixRef:s,namespaceRef:c,inlineThemeDisabled:p}=Pe(e),d=we("ColorPicker","-color-picker",Fr,qo,e,s);At(mn,{themeRef:d,renderLabelRef:_e(e,"renderLabel"),colorPickerSlots:t});const h=z(e.defaultShow),b=tt(_e(e,"show"),h);function y(u){const{onUpdateShow:k,"onUpdate:show":A}=e;k&&le(k,u),A&&le(A,u),h.value=u}const{defaultValue:C}=e,m=z(C===void 0?dr(e.modes,e.showAlpha):C),S=tt(_e(e,"value"),m),R=z([S.value]),E=z(0),P=L(()=>vt(S.value)),{modes:M}=e,B=z(vt(S.value)||M[0]||"rgb");function v(){const{modes:u}=e,{value:k}=B,A=u.findIndex(X=>X===k);~A?B.value=u[(A+1)%u.length]:B.value="rgb"}let g,w,$,N,q,ie,se,j;const Z=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"hsv":return Qe(u);case"hsl":return[g,w,$,j]=it(u),[...ao(g,w,$),j];case"rgb":case"hex":return[q,ie,se,j]=Ee(u),[...on(q,ie,se),j]}}),W=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"rgb":case"hex":return Ee(u);case"hsv":return[g,w,N,j]=Qe(u),[...Oe(g,w,N),j];case"hsl":return[g,w,$,j]=it(u),[...rn(g,w,$),j]}}),Y=L(()=>{const{value:u}=S;if(!u)return null;switch(P.value){case"hsl":return it(u);case"hsv":return[g,w,N,j]=Qe(u),[...Rt(g,w,N),j];case"rgb":case"hex":return[q,ie,se,j]=Ee(u),[...an(q,ie,se),j]}}),pe=L(()=>{switch(B.value){case"rgb":case"hex":return W.value;case"hsv":return Z.value;case"hsl":return Y.value}}),fe=z(0),ve=z(1),oe=z([0,0]);function xe(u,k){const{value:A}=Z,X=fe.value,te=A?A[3]:1;oe.value=[u,k];const{showAlpha:Q}=e;switch(B.value){case"hsv":ne((Q?Je:Kt)([X,u,k,te]),"cursor");break;case"hsl":ne((Q?He:Gt)([...Rt(X,u,k),te]),"cursor");break;case"rgb":ne((Q?Ae:Yt)([...Oe(X,u,k),te]),"cursor");break;case"hex":ne((Q?je:ft)([...Oe(X,u,k),te]),"cursor");break}}function de(u){fe.value=u;const{value:k}=Z;if(!k)return;const[,A,X,te]=k,{showAlpha:Q}=e;switch(B.value){case"hsv":ne((Q?Je:Kt)([u,A,X,te]),"cursor");break;case"rgb":ne((Q?Ae:Yt)([...Oe(u,A,X),te]),"cursor");break;case"hex":ne((Q?je:ft)([...Oe(u,A,X),te]),"cursor");break;case"hsl":ne((Q?He:Gt)([...Rt(u,A,X),te]),"cursor");break}}function ae(u){switch(B.value){case"hsv":[g,w,N]=Z.value,ne(Je([g,w,N,u]),"cursor");break;case"rgb":[q,ie,se]=W.value,ne(Ae([q,ie,se,u]),"cursor");break;case"hex":[q,ie,se]=W.value,ne(je([q,ie,se,u]),"cursor");break;case"hsl":[g,w,$]=Y.value,ne(He([g,w,$,u]),"cursor");break}ve.value=u}function ne(u,k){k==="cursor"?o=u:o=null;const{nTriggerFormChange:A,nTriggerFormInput:X}=r,{onUpdateValue:te,"onUpdate:value":Q}=e;te&&le(te,u),Q&&le(Q,u),A(),X(),m.value=u}function ge(u){ne(u,"input"),kt(ke)}function ke(u=!0){const{value:k}=S;if(k){const{nTriggerFormChange:A,nTriggerFormInput:X}=r,{onComplete:te}=e;te&&te(k);const{value:Q}=R,{value:ce}=E;u&&(Q.splice(ce+1,Q.length,k),E.value=ce+1),A(),X()}}function Le(){const{value:u}=E;u-1<0||(ne(R.value[u-1],"input"),ke(!1),E.value=u-1)}function at(){const{value:u}=E;u<0||u+1>=R.value.length||(ne(R.value[u+1],"input"),ke(!1),E.value=u+1)}function ut(){const{value:u}=S,{onConfirm:k}=e;k&&k(u),y(!1)}const rt=L(()=>E.value>=1),ze=L(()=>{const{value:u}=R;return u.length>1&&E.value<u.length-1});Te(b,u=>{u||(R.value=[S.value],E.value=0)}),dn(()=>{if(!(o&&o===S.value)){const{value:u}=Z;u&&(fe.value=u[0],ve.value=u[3],oe.value=[u[1],u[2]])}o=null});const D=L(()=>{const{value:u}=a,{common:{cubicBezierEaseInOut:k},self:{textColor:A,color:X,panelFontSize:te,boxShadow:Q,border:ce,borderRadius:re,dividerColor:he,[be("height",u)]:qe,[be("fontSize",u)]:Ge}}=d.value;return{"--n-bezier":k,"--n-text-color":A,"--n-color":X,"--n-panel-font-size":te,"--n-font-size":Ge,"--n-box-shadow":Q,"--n-border":ce,"--n-border-radius":re,"--n-height":qe,"--n-divider-color":he}}),T=p?ct("color-picker",L(()=>a.value[0]),D,e):void 0;function J(){var u;const{value:k}=W,{value:A}=fe,{internalActions:X,modes:te,actions:Q}=e,{value:ce}=d,{value:re}=s;return f("div",{class:[`${re}-color-picker-panel`,T==null?void 0:T.themeClass.value],onDragstart:he=>{he.preventDefault()},style:p?void 0:D.value},f("div",{class:`${re}-color-picker-control`},f(xr,{clsPrefix:re,rgba:k,displayedHue:A,displayedSv:oe.value,onUpdateSV:xe,onComplete:ke}),f("div",{class:`${re}-color-picker-preview`},f("div",{class:`${re}-color-picker-preview__sliders`},f(br,{clsPrefix:re,hue:A,onUpdateHue:de,onComplete:ke}),e.showAlpha?f(gr,{clsPrefix:re,rgba:k,alpha:ve.value,onUpdateAlpha:ae,onComplete:ke}):null),e.showPreview?f(Ir,{clsPrefix:re,mode:B.value,color:W.value&&ft(W.value),onUpdateColor:he=>ne(he,"input")}):null),f(Rr,{clsPrefix:re,showAlpha:e.showAlpha,mode:B.value,modes:te,onUpdateMode:v,value:S.value,valueArr:pe.value,onUpdateValue:ge}),((u=e.swatches)===null||u===void 0?void 0:u.length)&&f(zr,{clsPrefix:re,mode:B.value,swatches:e.swatches,onUpdateColor:he=>ne(he,"input")})),Q!=null&&Q.length?f("div",{class:`${re}-color-picker-action`},Q.includes("confirm")&&f(et,{size:"small",onClick:ut,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>i.value.confirm})):null,t.action?f("div",{class:`${re}-color-picker-action`},{default:t.action}):X?f("div",{class:`${re}-color-picker-action`},X.includes("undo")&&f(et,{size:"small",onClick:Le,disabled:!rt.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>i.value.undo}),X.includes("redo")&&f(et,{size:"small",onClick:at,disabled:!ze.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>i.value.redo})):null)}return{mergedClsPrefix:s,namespace:c,selfRef:n,hsla:Y,rgba:W,mergedShow:b,mergedDisabled:l,isMounted:Go(),adjustedTo:Zt(e),mergedValue:S,handleTriggerClick(){y(!0)},handleClickOutside(u){var k;!((k=n.value)===null||k===void 0)&&k.contains(Yo(u))||y(!1)},renderPanel:J,cssVars:p?void 0:D,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n==null||n(),f("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},f(Ko,null,{default:()=>[f(Zo,null,{default:()=>f($r,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),f(Jo,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Zt.tdkey,to:this.adjustedTo},{default:()=>f(Qo,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?me(this.renderPanel(),[[ea,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),Tr=_("collapse","width: 100%;",[_("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: 16px 0 0 0;
 `,[G("disabled",[O("header","cursor: not-allowed;",[O("header-main",`
 color: var(--n-title-text-color-disabled);
 `),_("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),_("collapse-item","margin-left: 32px;"),U("&:first-child","margin-top: 0;"),U("&:first-child >",[O("header","padding-top: 0;")]),G("left-arrow-placement",[O("header",[_("collapse-item-arrow","margin-right: 4px;")])]),G("right-arrow-placement",[O("header",[_("collapse-item-arrow","margin-left: 4px;")])]),O("content-wrapper",[O("content-inner","padding-top: 16px;"),ta({duration:"0.15s"})]),G("active",[O("header",[G("active",[_("collapse-item-arrow","transform: rotate(90deg);")])])]),U("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),O("header",`
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: 16px 0 0 0;
 color: var(--n-title-text-color);
 cursor: pointer;
 `,[O("header-main",`
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),O("header-extra",`
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
 `)])])]),Pr=Object.assign(Object.assign({},we.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),so=Tt("n-collapse"),co=V({name:"Collapse",props:Pr,setup(e,{slots:t}){const{mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedRtlRef:r}=Pe(e),a=z(e.defaultExpandedNames),l=L(()=>e.expandedNames),i=tt(l,a),s=we("Collapse","-collapse",Tr,na,e,n);function c(C){const{"onUpdate:expandedNames":m,onUpdateExpandedNames:S,onExpandedNamesChange:R}=e;S&&le(S,C),m&&le(m,C),R&&le(R,C),a.value=C}function p(C){const{onItemHeaderClick:m}=e;m&&le(m,C)}function d(C,m,S){const{accordion:R}=e,{value:E}=i;if(R)C?(c([m]),p({name:m,expanded:!0,event:S})):(c([]),p({name:m,expanded:!1,event:S}));else if(!Array.isArray(E))c([m]),p({name:m,expanded:!0,event:S});else{const P=E.slice(),M=P.findIndex(B=>m===B);~M?(P.splice(M,1),c(P),p({name:m,expanded:!1,event:S})):(P.push(m),c(P),p({name:m,expanded:!0,event:S}))}}At(so,{props:e,mergedClsPrefixRef:n,expandedNamesRef:i,slots:t,toggleItem:d});const h=gt("Collapse",r,n),b=L(()=>{const{common:{cubicBezierEaseInOut:C},self:{titleFontWeight:m,dividerColor:S,titleTextColor:R,titleTextColorDisabled:E,textColor:P,arrowColor:M,fontSize:B,titleFontSize:v,arrowColorDisabled:g}}=s.value;return{"--n-font-size":B,"--n-bezier":C,"--n-text-color":P,"--n-divider-color":S,"--n-title-font-size":v,"--n-title-text-color":R,"--n-title-text-color-disabled":E,"--n-title-font-weight":m,"--n-arrow-color":M,"--n-arrow-color-disabled":g}}),y=o?ct("collapse",void 0,b,e):void 0;return{rtlEnabled:h,mergedTheme:s,mergedClsPrefix:n,cssVars:o?void 0:b,themeClass:y==null?void 0:y.themeClass,onRender:y==null?void 0:y.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),f("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),Ar=V({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:oa(_e(e,"show"))}},render(){return f(aa,null,{default:()=>{const{show:e,displayDirective:t,onceTrue:n,clsPrefix:o}=this,r=t==="show"&&n,a=f("div",{class:`${o}-collapse-item__content-wrapper`},f("div",{class:`${o}-collapse-item__content-inner`},this.$slots));return r?me(a,[[De,e]]):e?a:null}})}}),Nr={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},uo=V({name:"CollapseItem",props:Nr,setup(e){const{mergedRtlRef:t}=Pe(e),n=ra(),o=Fe(()=>{var d;return(d=e.name)!==null&&d!==void 0?d:n}),r=dt(so);r||Xn("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:a,props:l,mergedClsPrefixRef:i,slots:s}=r,c=L(()=>{const{value:d}=a;if(Array.isArray(d)){const{value:h}=o;return!~d.findIndex(b=>b===h)}else if(d){const{value:h}=o;return h!==d}return!0});return{rtlEnabled:gt("Collapse",t,i),collapseSlots:s,randomName:n,mergedClsPrefix:i,collapsed:c,mergedDisplayDirective:L(()=>{const{displayDirective:d}=e;return d||l.displayDirective}),arrowPlacement:L(()=>l.arrowPlacement),handleClick(d){r&&!e.disabled&&r.toggleItem(c.value,o.value,d)}}},render(){var e;const{collapseSlots:t,$slots:n,arrowPlacement:o,collapsed:r,mergedDisplayDirective:a,mergedClsPrefix:l,disabled:i}=this,s=n.header?n.header():this.title,c=n["header-extra"]||t["header-extra"],p=n.arrow||t.arrow;return f("div",{class:[`${l}-collapse-item`,`${l}-collapse-item--${o}-arrow-placement`,i&&`${l}-collapse-item--disabled`,!r&&`${l}-collapse-item--active`]},f("div",{class:[`${l}-collapse-item__header`,!r&&`${l}-collapse-item__header--active`]},f("div",{class:`${l}-collapse-item__header-main`,onClick:this.handleClick},o==="right"&&s,f("div",{class:`${l}-collapse-item-arrow`,key:this.rtlEnabled?0:1},p?p({collapsed:r}):f(Dt,{clsPrefix:l},{default:(e=t.expandIcon)!==null&&e!==void 0?e:()=>this.rtlEnabled?f(ar,null):f(la,null)})),o==="left"&&s),c&&f("div",{class:`${l}-collapse-item__header-extra`,onClick:this.handleClick},{default:c})),f(Ar,{clsPrefix:l,displayDirective:a,show:!r},n))}}),Vr={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},po=Tt("n-radio-group");function Lr(e){const t=Pt(e,{mergedSize(R){const{size:E}=e;if(E!==void 0)return E;if(l){const{mergedSizeRef:{value:P}}=l;if(P!==void 0)return P}return R?R.mergedSize.value:"medium"},mergedDisabled(R){return!!(e.disabled||l!=null&&l.disabledRef.value||R!=null&&R.disabled.value)}}),{mergedSizeRef:n,mergedDisabledRef:o}=t,r=z(null),a=z(null),l=dt(po,null),i=z(e.defaultChecked),s=_e(e,"checked"),c=tt(s,i),p=Fe(()=>l?l.valueRef.value===e.value:c.value),d=Fe(()=>{const{name:R}=e;if(R!==void 0)return R;if(l)return l.nameRef.value}),h=z(!1);function b(){if(l){const{doUpdateValue:R}=l,{value:E}=e;le(R,E)}else{const{onUpdateChecked:R,"onUpdate:checked":E}=e,{nTriggerFormInput:P,nTriggerFormChange:M}=t;R&&le(R,!0),E&&le(E,!0),P(),M(),i.value=!0}}function y(){o.value||p.value||b()}function C(){y()}function m(){h.value=!1}function S(){h.value=!0}return{mergedClsPrefix:l?l.mergedClsPrefixRef:Pe(e).mergedClsPrefixRef,inputRef:r,labelRef:a,mergedName:d,mergedDisabled:o,uncontrolledChecked:i,renderSafeChecked:p,focus:h,mergedSize:n,handleRadioInputChange:C,handleRadioInputBlur:m,handleRadioInputFocus:S}}const Ur=_("radio",`
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
`,[G("checked",[O("dot",`
 background-color: var(--n-color-active);
 `)]),O("dot-wrapper",`
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
 `),O("dot",`
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
 `)])]),O("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),mt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[O("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),G("focus",[U("&:not(:active)",[O("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),G("disabled",`
 cursor: not-allowed;
 `,[O("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[U("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),G("checked",`
 opacity: 1;
 `)]),O("label",{color:"var(--n-text-color-disabled)"}),_("radio-input",`
 cursor: not-allowed;
 `)])]),Mr=V({name:"Radio",props:Object.assign(Object.assign({},we.props),Vr),setup(e){const t=Lr(e),n=we("Radio","-radio",Ur,qn,e,t.mergedClsPrefix),o=L(()=>{const{mergedSize:{value:c}}=t,{common:{cubicBezierEaseInOut:p},self:{boxShadow:d,boxShadowActive:h,boxShadowDisabled:b,boxShadowFocus:y,boxShadowHover:C,color:m,colorDisabled:S,colorActive:R,textColor:E,textColorDisabled:P,dotColorActive:M,dotColorDisabled:B,labelPadding:v,labelLineHeight:g,[be("fontSize",c)]:w,[be("radioSize",c)]:$}}=n.value;return{"--n-bezier":p,"--n-label-line-height":g,"--n-box-shadow":d,"--n-box-shadow-active":h,"--n-box-shadow-disabled":b,"--n-box-shadow-focus":y,"--n-box-shadow-hover":C,"--n-color":m,"--n-color-active":R,"--n-color-disabled":S,"--n-dot-color-active":M,"--n-dot-color-disabled":B,"--n-font-size":w,"--n-radio-size":$,"--n-text-color":E,"--n-text-color-disabled":P,"--n-label-padding":v}}),{inlineThemeDisabled:r,mergedClsPrefixRef:a,mergedRtlRef:l}=Pe(e),i=gt("Radio",l,a),s=r?ct("radio",L(()=>t.mergedSize.value[0]),o,e):void 0;return Object.assign(t,{rtlEnabled:i,cssVars:r?void 0:o,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender})},render(){const{$slots:e,mergedClsPrefix:t,onRender:n,label:o}=this;return n==null||n(),f("label",{class:[`${t}-radio`,this.themeClass,{[`${t}-radio--rtl`]:this.rtlEnabled,[`${t}-radio--disabled`]:this.mergedDisabled,[`${t}-radio--checked`]:this.renderSafeChecked,[`${t}-radio--focus`]:this.focus}],style:this.cssVars},f("input",{ref:"inputRef",type:"radio",class:`${t}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),f("div",{class:`${t}-radio__dot-wrapper`},"\xA0",f("div",{class:[`${t}-radio__dot`,this.renderSafeChecked&&`${t}-radio__dot--checked`]})),bt(e.default,r=>!r&&!o?null:f("div",{ref:"labelRef",class:`${t}-radio__label`},r||o)))}}),Or=_("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[O("splitor",`
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
 `,[_("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),O("splitor",{height:"var(--n-height)"})]),_("radio-button",`
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
 `),O("state-border",`
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
 `,[O("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),U("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[O("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),mt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[O("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),mt("checked",{color:"var(--n-button-text-color-hover)"})]),G("focus",[U("&:not(:active)",[O("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),G("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),G("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function jr(e,t,n){var o;const r=[];let a=!1;for(let l=0;l<e.length;++l){const i=e[l],s=(o=i.type)===null||o===void 0?void 0:o.name;s==="RadioButton"&&(a=!0);const c=i.props;if(s!=="RadioButton"){r.push(i);continue}if(l===0)r.push(i);else{const p=r[r.length-1].props,d=t===p.value,h=p.disabled,b=t===c.value,y=c.disabled,C=(d?2:0)+(h?0:1),m=(b?2:0)+(y?0:1),S={[`${n}-radio-group__splitor--disabled`]:h,[`${n}-radio-group__splitor--checked`]:d},R={[`${n}-radio-group__splitor--disabled`]:y,[`${n}-radio-group__splitor--checked`]:b},E=C<m?R:S;r.push(f("div",{class:[`${n}-radio-group__splitor`,E]}),i)}}return{children:r,isButtonGroup:a}}const Hr=Object.assign(Object.assign({},we.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Wr=V({name:"RadioGroup",props:Hr,setup(e){const t=z(null),{mergedSizeRef:n,mergedDisabledRef:o,nTriggerFormChange:r,nTriggerFormInput:a,nTriggerFormBlur:l,nTriggerFormFocus:i}=Pt(e),{mergedClsPrefixRef:s,inlineThemeDisabled:c,mergedRtlRef:p}=Pe(e),d=we("Radio","-radio-group",Or,qn,e,s),h=z(e.defaultValue),b=_e(e,"value"),y=tt(b,h);function C(M){const{onUpdateValue:B,"onUpdate:value":v}=e;B&&le(B,M),v&&le(v,M),h.value=M,r(),a()}function m(M){const{value:B}=t;!B||B.contains(M.relatedTarget)||i()}function S(M){const{value:B}=t;!B||B.contains(M.relatedTarget)||l()}At(po,{mergedClsPrefixRef:s,nameRef:_e(e,"name"),valueRef:y,disabledRef:o,mergedSizeRef:n,doUpdateValue:C});const R=gt("Radio",p,s),E=L(()=>{const{value:M}=n,{common:{cubicBezierEaseInOut:B},self:{buttonBorderColor:v,buttonBorderColorActive:g,buttonBorderRadius:w,buttonBoxShadow:$,buttonBoxShadowFocus:N,buttonBoxShadowHover:q,buttonColorActive:ie,buttonTextColor:se,buttonTextColorActive:j,buttonTextColorHover:Z,opacityDisabled:W,[be("buttonHeight",M)]:Y,[be("fontSize",M)]:pe}}=d.value;return{"--n-font-size":pe,"--n-bezier":B,"--n-button-border-color":v,"--n-button-border-color-active":g,"--n-button-border-radius":w,"--n-button-box-shadow":$,"--n-button-box-shadow-focus":N,"--n-button-box-shadow-hover":q,"--n-button-color-active":ie,"--n-button-text-color":se,"--n-button-text-color-hover":Z,"--n-button-text-color-active":j,"--n-height":Y,"--n-opacity-disabled":W}}),P=c?ct("radio-group",L(()=>n.value[0]),E,e):void 0;return{selfElRef:t,rtlEnabled:R,mergedClsPrefix:s,mergedValue:y,handleFocusout:S,handleFocusin:m,cssVars:c?void 0:E,themeClass:P==null?void 0:P.themeClass,onRender:P==null?void 0:P.onRender}},render(){var e;const{mergedValue:t,mergedClsPrefix:n,handleFocusin:o,handleFocusout:r}=this,{children:a,isButtonGroup:l}=jr(ht(ro(this)),t,n);return(e=this.onRender)===null||e===void 0||e.call(this),f("div",{onFocusin:o,onFocusout:r,ref:"selfElRef",class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,l&&`${n}-radio-group--button-group`],style:this.cssVars},a)}}),fo=Symbol("DESCRIPTION_ITEM_FLAG");function Xr(e){return typeof e=="object"&&e&&!Array.isArray(e)?e.type&&e.type[fo]:!1}const qr=U([_("descriptions",{fontSize:"var(--n-font-size)"},[_("descriptions-separator",`
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
 `,[O("content",`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),O("label",`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ia(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),sa(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Gr=Object.assign(Object.assign({},we.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:"top"},labelAlign:{type:String,default:"left"},separator:{type:String,default:":"},size:{type:String,default:"medium"},bordered:Boolean,labelStyle:[Object,String],contentStyle:[Object,String]}),Yr=V({name:"Descriptions",props:Gr,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=Pe(e),o=we("Descriptions","-descriptions",qr,da,e,t),r=L(()=>{const{size:l,bordered:i}=e,{common:{cubicBezierEaseInOut:s},self:{titleTextColor:c,thColor:p,thColorModal:d,thColorPopover:h,thTextColor:b,thFontWeight:y,tdTextColor:C,tdColor:m,tdColorModal:S,tdColorPopover:R,borderColor:E,borderColorModal:P,borderColorPopover:M,borderRadius:B,lineHeight:v,[be("fontSize",l)]:g,[be(i?"thPaddingBordered":"thPadding",l)]:w,[be(i?"tdPaddingBordered":"tdPadding",l)]:$}}=o.value;return{"--n-title-text-color":c,"--n-th-padding":w,"--n-td-padding":$,"--n-font-size":g,"--n-bezier":s,"--n-th-font-weight":y,"--n-line-height":v,"--n-th-text-color":b,"--n-td-text-color":C,"--n-th-color":p,"--n-th-color-modal":d,"--n-th-color-popover":h,"--n-td-color":m,"--n-td-color-modal":S,"--n-td-color-popover":R,"--n-border-radius":B,"--n-border-color":E,"--n-border-color-modal":P,"--n-border-color-popover":M}}),a=n?ct("descriptions",L(()=>{let l="";const{size:i,bordered:s}=e;return s&&(l+="a"),l+=i[0],l}),r,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:r,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender,compitableColumn:Jt(e,["columns","column"]),inlineThemeDisabled:n}},render(){const e=this.$slots.default,t=e?ht(e()):[];t.length;const{compitableColumn:n,labelPlacement:o,labelAlign:r,size:a,bordered:l,title:i,cssVars:s,mergedClsPrefix:c,separator:p,onRender:d}=this;d==null||d();const h=t.filter(m=>Xr(m)),b={span:0,row:[],secondRow:[],rows:[]},C=h.reduce((m,S,R)=>{const E=S.props||{},P=h.length-1===R,M=["label"in E?E.label:$n(S,"label")],B=[$n(S)],v=E.span||1,g=m.span;m.span+=v;const w=E.labelStyle||E["label-style"]||this.labelStyle,$=E.contentStyle||E["content-style"]||this.contentStyle;if(o==="left")l?m.row.push(f("th",{class:`${c}-descriptions-table-header`,colspan:1,style:w},M),f("td",{class:`${c}-descriptions-table-content`,colspan:P?(n-g)*2+1:v*2-1,style:$},B)):m.row.push(f("td",{class:`${c}-descriptions-table-content`,colspan:P?(n-g)*2:v*2},f("span",{class:`${c}-descriptions-table-content__label`,style:w},[...M,p&&f("span",{class:`${c}-descriptions-separator`},p)]),f("span",{class:`${c}-descriptions-table-content__content`,style:$},B)));else{const N=P?(n-g)*2:v*2;m.row.push(f("th",{class:`${c}-descriptions-table-header`,colspan:N,style:w},M)),m.secondRow.push(f("td",{class:`${c}-descriptions-table-content`,colspan:N,style:$},B))}return(m.span>=n||P)&&(m.span=0,m.row.length&&(m.rows.push(m.row),m.row=[]),o!=="left"&&m.secondRow.length&&(m.rows.push(m.secondRow),m.secondRow=[])),m},b).rows.map(m=>f("tr",{class:`${c}-descriptions-table-row`},m));return f("div",{style:s,class:[`${c}-descriptions`,this.themeClass,`${c}-descriptions--${o}-label-placement`,`${c}-descriptions--${r}-label-align`,`${c}-descriptions--${a}-size`,l&&`${c}-descriptions--bordered`]},i||this.$slots.header?f("div",{class:`${c}-descriptions-header`},i||ro(this,"header")):null,f("div",{class:`${c}-descriptions-table-wrapper`},f("table",{class:`${c}-descriptions-table`},f("tbody",null,C))))}}),Kr={label:String,span:{type:Number,default:1},labelStyle:[Object,String],contentStyle:[Object,String]},Zr=V({name:"DescriptionsItem",[fo]:!0,props:Kr,render(){return null}});function Jr(e){return e==null||typeof e=="string"&&e.trim()===""?null:Number(e)}function Qr(e){return e.includes(".")&&(/^(-)?\d+.*(\.|0)$/.test(e)||/^\.\d+$/.test(e))}function Ht(e){return e==null?!0:!Number.isNaN(e)}function In(e,t){return e==null?"":t===void 0?String(e):e.toFixed(t)}function Wt(e){if(e===null)return null;if(typeof e=="number")return e;{const t=Number(e);return Number.isNaN(t)?null:t}}const el=U([_("input-number-suffix",`
 display: inline-block;
 margin-right: 10px;
 `),_("input-number-prefix",`
 display: inline-block;
 margin-left: 10px;
 `)]),Fn=800,En=100,tl=Object.assign(Object.assign({},we.props),{autofocus:Boolean,loading:{type:Boolean,default:void 0},placeholder:String,defaultValue:{type:Number,default:null},value:Number,step:{type:[Number,String],default:1},min:[Number,String],max:[Number,String],size:String,disabled:{type:Boolean,default:void 0},validator:Function,bordered:{type:Boolean,default:void 0},showButton:{type:Boolean,default:!0},buttonPlacement:{type:String,default:"right"},readonly:Boolean,clearable:Boolean,keyboard:{type:Object,default:{}},updateValueOnInput:{type:Boolean,default:!0},parse:Function,format:Function,precision:Number,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onChange:[Function,Array]}),bn=V({name:"InputNumber",props:tl,setup(e){const{mergedBorderedRef:t,mergedClsPrefixRef:n,mergedRtlRef:o}=Pe(e),r=we("InputNumber","-input-number",el,ca,e,n),{localeRef:a}=Wn("InputNumber"),l=Pt(e),{mergedSizeRef:i,mergedDisabledRef:s,mergedStatusRef:c}=l,p=z(null),d=z(null),h=z(null),b=z(e.defaultValue),y=_e(e,"value"),C=tt(y,b),m=z(""),S=u=>{const k=String(u).split(".")[1];return k?k.length:0},R=u=>{const k=[e.min,e.max,e.step,u].map(A=>A===void 0?0:S(A));return Math.max(...k)},E=Fe(()=>{const{placeholder:u}=e;return u!==void 0?u:a.value.placeholder}),P=Fe(()=>{const u=Wt(e.step);return u!==null?u===0?1:Math.abs(u):1}),M=Fe(()=>{const u=Wt(e.min);return u!==null?u:null}),B=Fe(()=>{const u=Wt(e.max);return u!==null?u:null}),v=u=>{const{value:k}=C;if(u===k){w();return}const{"onUpdate:value":A,onUpdateValue:X,onChange:te}=e,{nTriggerFormInput:Q,nTriggerFormChange:ce}=l;te&&le(te,u),X&&le(X,u),A&&le(A,u),b.value=u,Q(),ce()},g=({offset:u,doUpdateIfValid:k,fixPrecision:A,isInputing:X})=>{const{value:te}=m;if(X&&Qr(te))return!1;const Q=(e.parse||Jr)(te);if(Q===null)return k&&v(null),null;if(Ht(Q)){const ce=S(Q),{precision:re}=e;if(re!==void 0&&re<ce&&!A)return!1;let he=parseFloat((Q+u).toFixed(re!=null?re:R(Q)));if(Ht(he)){const{value:qe}=B,{value:Ge}=M;if(qe!==null&&he>qe){if(!k||X)return!1;he=qe}if(Ge!==null&&he<Ge){if(!k||X)return!1;he=Ge}return e.validator&&!e.validator(he)?!1:(k&&v(he),he)}}return!1},w=()=>{const{value:u}=C;if(Ht(u)){const{format:k,precision:A}=e;k?m.value=k(u):u===null||A===void 0||S(u)>A?m.value=In(u,void 0):m.value=In(u,A)}else m.value=String(u)};w();const $=Fe(()=>g({offset:0,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})===!1),N=Fe(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=P;return g({offset:-k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1}),q=Fe(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=P;return g({offset:+k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1});function ie(u){const{onFocus:k}=e,{nTriggerFormFocus:A}=l;k&&le(k,u),A()}function se(u){var k,A;if(u.target===((k=p.value)===null||k===void 0?void 0:k.wrapperElRef))return;const X=g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0});if(X!==!1){const ce=(A=p.value)===null||A===void 0?void 0:A.inputElRef;ce&&(ce.value=String(X||"")),C.value===X&&w()}else w();const{onBlur:te}=e,{nTriggerFormBlur:Q}=l;te&&le(te,u),Q()}function j(u){const{onClear:k}=e;k&&le(k,u)}function Z(){const{value:u}=q;if(!u){ge();return}const{value:k}=C;if(k===null)e.validator||v(fe());else{const{value:A}=P;g({offset:A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}function W(){const{value:u}=N;if(!u){ne();return}const{value:k}=C;if(k===null)e.validator||v(fe());else{const{value:A}=P;g({offset:-A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}const Y=ie,pe=se;function fe(){if(e.validator)return null;const{value:u}=M,{value:k}=B;return u!==null?Math.max(0,u):k!==null?Math.min(0,k):0}function ve(u){j(u),v(null)}function oe(u){var k,A,X;!((k=h.value)===null||k===void 0)&&k.$el.contains(u.target)&&u.preventDefault(),!((A=d.value)===null||A===void 0)&&A.$el.contains(u.target)&&u.preventDefault(),(X=p.value)===null||X===void 0||X.activate()}let xe=null,de=null,ae=null;function ne(){ae&&(window.clearTimeout(ae),ae=null),xe&&(window.clearInterval(xe),xe=null)}function ge(){Le&&(window.clearTimeout(Le),Le=null),de&&(window.clearInterval(de),de=null)}function ke(){ne(),ae=window.setTimeout(()=>{xe=window.setInterval(()=>{W()},En)},Fn),Xe("mouseup",document,ne,{once:!0})}let Le=null;function at(){ge(),Le=window.setTimeout(()=>{de=window.setInterval(()=>{Z()},En)},Fn),Xe("mouseup",document,ge,{once:!0})}const ut=()=>{de||Z()},rt=()=>{xe||W()};function ze(u){var k,A;if(u.key==="Enter"){if(u.target===((k=p.value)===null||k===void 0?void 0:k.wrapperElRef))return;g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&((A=p.value)===null||A===void 0||A.deactivate())}else if(u.key==="ArrowUp"){if(!q.value||e.keyboard.ArrowUp===!1)return;u.preventDefault(),g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&Z()}else if(u.key==="ArrowDown"){if(!N.value||e.keyboard.ArrowDown===!1)return;u.preventDefault(),g({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&W()}}function D(u){m.value=u,e.updateValueOnInput&&!e.format&&!e.parse&&e.precision===void 0&&g({offset:0,doUpdateIfValid:!0,isInputing:!0,fixPrecision:!1})}Te(C,()=>{w()});const T={focus:()=>{var u;return(u=p.value)===null||u===void 0?void 0:u.focus()},blur:()=>{var u;return(u=p.value)===null||u===void 0?void 0:u.blur()}},J=gt("InputNumber",o,n);return Object.assign(Object.assign({},T),{rtlEnabled:J,inputInstRef:p,minusButtonInstRef:d,addButtonInstRef:h,mergedClsPrefix:n,mergedBordered:t,uncontrolledValue:b,mergedValue:C,mergedPlaceholder:E,displayedValueInvalid:$,mergedSize:i,mergedDisabled:s,displayedValue:m,addable:q,minusable:N,mergedStatus:c,handleFocus:Y,handleBlur:pe,handleClear:ve,handleMouseDown:oe,handleAddClick:ut,handleMinusClick:rt,handleAddMousedown:at,handleMinusMousedown:ke,handleKeyDown:ze,handleUpdateDisplayedValue:D,mergedTheme:r,inputThemeOverrides:{paddingSmall:"0 8px 0 10px",paddingMedium:"0 8px 0 12px",paddingLarge:"0 8px 0 14px"},buttonThemeOverrides:L(()=>{const{self:{iconColorDisabled:u}}=r.value,[k,A,X,te]=Ee(u);return{textColorTextDisabled:`rgb(${k}, ${A}, ${X})`,opacityDisabled:`${te}`}})})},render(){const{mergedClsPrefix:e,$slots:t}=this,n=()=>f(wn,{text:!0,disabled:!this.minusable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleMinusClick,onMousedown:this.handleMinusMousedown,ref:"minusButtonInstRef"},{icon:()=>_n(t["minus-icon"],()=>[f(Dt,{clsPrefix:e},{default:()=>f(rr,null)})])}),o=()=>f(wn,{text:!0,disabled:!this.addable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleAddClick,onMousedown:this.handleAddMousedown,ref:"addButtonInstRef"},{icon:()=>_n(t["add-icon"],()=>[f(Dt,{clsPrefix:e},{default:()=>f(lo,null)})])});return f("div",{class:[`${e}-input-number`,this.rtlEnabled&&`${e}-input-number--rtl`]},f(yt,{ref:"inputInstRef",autofocus:this.autofocus,status:this.mergedStatus,bordered:this.mergedBordered,loading:this.loading,value:this.displayedValue,onUpdateValue:this.handleUpdateDisplayedValue,theme:this.mergedTheme.peers.Input,themeOverrides:this.mergedTheme.peerOverrides.Input,builtinThemeOverrides:this.inputThemeOverrides,size:this.mergedSize,placeholder:this.mergedPlaceholder,disabled:this.mergedDisabled,readonly:this.readonly,textDecoration:this.displayedValueInvalid?"line-through":void 0,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onClear:this.handleClear,clearable:this.clearable,internalLoadingBeforeSuffix:!0},{prefix:()=>{var r;return this.showButton&&this.buttonPlacement==="both"?[n(),bt(t.prefix,a=>a?f("span",{class:`${e}-input-number-prefix`},a):null)]:(r=t.prefix)===null||r===void 0?void 0:r.call(t)},suffix:()=>{var r;return this.showButton?[bt(t.suffix,a=>a?f("span",{class:`${e}-input-number-suffix`},a):null),this.buttonPlacement==="right"?n():null,o()]:(r=t.suffix)===null||r===void 0?void 0:r.call(t)}}))}}),nl=Object.assign(Object.assign({},we.props),{trigger:String,xScrollable:Boolean,onScroll:Function}),ol=V({name:"Scrollbar",props:nl,setup(){const e=z(null);return Object.assign(Object.assign({},{scrollTo:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollTo(n[0],n[1])},scrollBy:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollBy(n[0],n[1])}}),{scrollbarInstRef:e})},render(){return f(ua,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),ho=ol,vn=Tt("n-tabs"),mo={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ze=V({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:mo,setup(e){const t=dt(vn,null);return t||Xn("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return f("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),al=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},ma(mo,["displayDirective"])),sn=V({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:al,setup(e){const{mergedClsPrefixRef:t,valueRef:n,typeRef:o,closableRef:r,tabStyleRef:a,tabChangeIdRef:l,onBeforeLeaveRef:i,triggerRef:s,handleAdd:c,activateTab:p,handleClose:d}=dt(vn);return{trigger:s,mergedClosable:L(()=>{if(e.internalAddable)return!1;const{closable:h}=e;return h===void 0?r.value:h}),style:a,clsPrefix:t,value:n,type:o,handleClose(h){h.stopPropagation(),!e.disabled&&d(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){c();return}const{name:h}=e,b=++l.id;if(h!==n.value){const{value:y}=i;y?Promise.resolve(y(e.name,n.value)).then(C=>{C&&l.id===b&&p(h)}):p(h)}}}},render(){const{internalAddable:e,clsPrefix:t,name:n,disabled:o,label:r,tab:a,value:l,mergedClosable:i,style:s,trigger:c,$slots:{default:p}}=this,d=r!=null?r:a;return f("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?f("div",{class:`${t}-tabs-tab-pad`}):null,f("div",Object.assign({key:n,"data-name":n,"data-disabled":o?!0:void 0},pa({class:[`${t}-tabs-tab`,l===n&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,i&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`],onClick:c==="click"?this.activateTab:void 0,onMouseenter:c==="hover"?this.activateTab:void 0,style:e?void 0:s},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),f("span",{class:`${t}-tabs-tab__label`},e?f($e,null,f("div",{class:`${t}-tabs-tab__height-placeholder`},"\xA0"),f(Dt,{clsPrefix:t},{default:()=>f(lo,null)})):p?p():typeof d=="object"?d:fa(d!=null?d:n)),i&&this.type==="card"?f(ha,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),rl=_("tabs",`
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
 `,[O("prefix, suffix",`
 display: flex;
 align-items: center;
 `),O("prefix","padding-right: 16px;"),O("suffix","padding-left: 16px;")]),_("tabs-nav-scroll-wrapper",`
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
 `,[G("disabled",{cursor:"not-allowed"}),O("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),O("label",`
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
 `),G("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),_("tabs-nav",[G("line-type",[O("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),G("card-type",[O("prefix, suffix",`
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
 `,[O("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),mt("disabled",[U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),G("closable","padding-right: 6px;"),G("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),G("disabled","color: var(--n-tab-text-color-disabled);")]),_("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),ll=Object.assign(Object.assign({},we.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Et=V({name:"Tabs",props:ll,setup(e,{slots:t}){var n,o,r,a;const{mergedClsPrefixRef:l,inlineThemeDisabled:i}=Pe(e),s=we("Tabs","-tabs",rl,ba,e,l),c=z(null),p=z(null),d=z(null),h=z(null),b=z(null),y=z(!0),C=z(!0),m=Jt(e,["labelSize","size"]),S=Jt(e,["activeName","value"]),R=z((o=(n=S.value)!==null&&n!==void 0?n:e.defaultValue)!==null&&o!==void 0?o:t.default?(a=(r=ht(t.default())[0])===null||r===void 0?void 0:r.props)===null||a===void 0?void 0:a.name:null),E=tt(S,R),P={id:0},M=L(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Te(E,()=>{P.id=0,g()});function B(){var D;const{value:T}=E;return T===null?null:(D=c.value)===null||D===void 0?void 0:D.querySelector(`[data-name="${T}"]`)}function v(D){if(e.type==="card")return;const{value:T}=p;if(!!T&&D){const J=`${l.value}-tabs-bar--disabled`,{barWidth:u}=e;if(D.dataset.disabled==="true"?T.classList.add(J):T.classList.remove(J),typeof u=="number"&&D.offsetWidth>=u){const k=Math.floor((D.offsetWidth-u)/2)+D.offsetLeft;T.style.left=`${k}px`,T.style.maxWidth=`${u}px`}else T.style.left=`${D.offsetLeft}px`,T.style.maxWidth=`${D.offsetWidth}px`;T.style.width="8192px",T.offsetWidth}}function g(){if(e.type==="card")return;const D=B();D&&v(D)}const w=z(null);let $=0,N=null;function q(D){const T=w.value;if(T){$=D.getBoundingClientRect().height;const J=`${$}px`,u=()=>{T.style.height=J,T.style.maxHeight=J};N?(u(),N(),N=null):N=u}}function ie(D){const T=w.value;if(T){const J=D.getBoundingClientRect().height,u=()=>{document.body.offsetHeight,T.style.maxHeight=`${J}px`,T.style.height=`${Math.max($,J)}px`};N?(N(),N=null,u()):N=u}}function se(){const D=w.value;D&&(D.style.maxHeight="",D.style.height="")}const j={value:[]},Z=z("next");function W(D){const T=E.value;let J="next";for(const u of j.value){if(u===T)break;if(u===D){J="prev";break}}Z.value=J,Y(D)}function Y(D){const{onActiveNameChange:T,onUpdateValue:J,"onUpdate:value":u}=e;T&&le(T,D),J&&le(J,D),u&&le(u,D),R.value=D}function pe(D){const{onClose:T}=e;T&&le(T,D)}function fe(){const{value:D}=p;if(!D)return;const T="transition-disabled";D.classList.add(T),g(),D.classList.remove(T)}let ve=0;function oe(D){var T;if(D.contentRect.width===0&&D.contentRect.height===0||ve===D.contentRect.width)return;ve=D.contentRect.width;const{type:J}=e;(J==="line"||J==="bar")&&fe(),J!=="segment"&&ke((T=b.value)===null||T===void 0?void 0:T.$el)}const xe=jt(oe,64);Te([()=>e.justifyContent,()=>e.size],()=>{kt(()=>{const{type:D}=e;(D==="line"||D==="bar")&&fe()})});const de=z(!1);function ae(D){var T;const{target:J,contentRect:{width:u}}=D,k=J.parentElement.offsetWidth;if(!de.value)k<u&&(de.value=!0);else{const{value:A}=h;if(!A)return;k-u>A.$el.offsetWidth&&(de.value=!1)}ke((T=b.value)===null||T===void 0?void 0:T.$el)}const ne=jt(ae,64);function ge(){const{onAdd:D}=e;D&&D(),kt(()=>{const T=B(),{value:J}=b;!T||!J||J.scrollTo({left:T.offsetLeft,top:0,behavior:"smooth"})})}function ke(D){if(!D)return;const{scrollLeft:T,scrollWidth:J,offsetWidth:u}=D;y.value=T<=0,C.value=T+u>=J}const Le=jt(D=>{ke(D.target)},64);At(vn,{triggerRef:_e(e,"trigger"),tabStyleRef:_e(e,"tabStyle"),paneClassRef:_e(e,"paneClass"),paneStyleRef:_e(e,"paneStyle"),mergedClsPrefixRef:l,typeRef:_e(e,"type"),closableRef:_e(e,"closable"),valueRef:E,tabChangeIdRef:P,onBeforeLeaveRef:_e(e,"onBeforeLeave"),activateTab:W,handleClose:pe,handleAdd:ge}),va(()=>{g()}),dn(()=>{const{value:D}=d;if(!D)return;const{value:T}=l,J=`${T}-tabs-nav-scroll-wrapper--shadow-before`,u=`${T}-tabs-nav-scroll-wrapper--shadow-after`;y.value?D.classList.remove(J):D.classList.add(J),C.value?D.classList.remove(u):D.classList.add(u)});const at=z(null);Te(E,()=>{if(e.type==="segment"){const D=at.value;D&&kt(()=>{D.classList.add("transition-disabled"),D.offsetWidth,D.classList.remove("transition-disabled")})}});const ut={syncBarPosition:()=>{g()}},rt=L(()=>{const{value:D}=m,{type:T}=e,J={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[T],u=`${D}${J}`,{self:{barColor:k,closeIconColor:A,closeIconColorHover:X,closeIconColorPressed:te,tabColor:Q,tabBorderColor:ce,paneTextColor:re,tabFontWeight:he,tabBorderRadius:qe,tabFontWeightActive:Ge,colorSegment:go,fontWeightStrong:xo,tabColorSegment:yo,closeSize:_o,closeIconSize:wo,closeColorHover:Co,closeColorPressed:So,closeBorderRadius:ko,[be("panePadding",D)]:Ro,[be("tabPadding",u)]:$o,[be("tabGap",u)]:Do,[be("tabTextColor",T)]:Bo,[be("tabTextColorActive",T)]:zo,[be("tabTextColorHover",T)]:Io,[be("tabTextColorDisabled",T)]:Fo,[be("tabFontSize",D)]:Eo},common:{cubicBezierEaseInOut:To}}=s.value;return{"--n-bezier":To,"--n-color-segment":go,"--n-bar-color":k,"--n-tab-font-size":Eo,"--n-tab-text-color":Bo,"--n-tab-text-color-active":zo,"--n-tab-text-color-disabled":Fo,"--n-tab-text-color-hover":Io,"--n-pane-text-color":re,"--n-tab-border-color":ce,"--n-tab-border-radius":qe,"--n-close-size":_o,"--n-close-icon-size":wo,"--n-close-color-hover":Co,"--n-close-color-pressed":So,"--n-close-border-radius":ko,"--n-close-icon-color":A,"--n-close-icon-color-hover":X,"--n-close-icon-color-pressed":te,"--n-tab-color":Q,"--n-tab-font-weight":he,"--n-tab-font-weight-active":Ge,"--n-tab-padding":$o,"--n-tab-gap":Do,"--n-pane-padding":Ro,"--n-font-weight-strong":xo,"--n-tab-color-segment":yo}}),ze=i?ct("tabs",L(()=>`${m.value[0]}${e.type[0]}`),rt,e):void 0;return Object.assign({mergedClsPrefix:l,mergedValue:E,renderedNames:new Set,tabsRailElRef:at,tabsPaneWrapperRef:w,tabsElRef:c,barElRef:p,addTabInstRef:h,xScrollInstRef:b,scrollWrapperElRef:d,addTabFixed:de,tabWrapperStyle:M,handleNavResize:xe,mergedSize:m,handleScroll:Le,handleTabsResize:ne,cssVars:i?void 0:rt,themeClass:ze==null?void 0:ze.themeClass,animationDirection:Z,renderNameListRef:j,onAnimationBeforeLeave:q,onAnimationEnter:ie,onAnimationAfterEnter:se,onRender:ze==null?void 0:ze.onRender},ut)},render(){const{mergedClsPrefix:e,type:t,addTabFixed:n,addable:o,mergedSize:r,renderNameListRef:a,onRender:l,$slots:{default:i,prefix:s,suffix:c}}=this;l==null||l();const p=i?ht(i()).filter(m=>m.type.__TAB_PANE__===!0):[],d=i?ht(i()).filter(m=>m.type.__TAB__===!0):[],h=!d.length,b=t==="card",y=t==="segment",C=!b&&!y&&this.justifyContent;return a.value=[],f("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${r}-size`,C&&`${e}-tabs--flex`],style:this.cssVars},f("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav`]},bt(s,m=>m&&f("div",{class:`${e}-tabs-nav__prefix`},m)),y?f("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},h?p.map((m,S)=>(a.value.push(m.props.name),f(sn,Object.assign({},m.props,{internalCreatedByPane:!0,internalLeftPadded:S!==0}),m.children?{default:m.children.tab}:void 0))):d.map((m,S)=>(a.value.push(m.props.name),S===0?m:An(m)))):f(Cn,{onResize:this.handleNavResize},{default:()=>f("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},f(Ha,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const m=f("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},C?null:f("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),h?p.map((R,E)=>(a.value.push(R.props.name),Xt(f(sn,Object.assign({},R.props,{internalCreatedByPane:!0,internalLeftPadded:E!==0&&(!C||C==="center"||C==="start"||C==="end")}),R.children?{default:R.children.tab}:void 0)))):d.map((R,E)=>(a.value.push(R.props.name),Xt(E!==0&&!C?An(R):R))),!n&&o&&b?Pn(o,(h?p.length:d.length)!==0):null,C?null:f("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let S=m;return b&&o&&(S=f(Cn,{onResize:this.handleTabsResize},{default:()=>m})),f("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},S,b?f("div",{class:`${e}-tabs-pad`}):null,b?null:f("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),n&&o&&b?Pn(o,!0):null,bt(c,m=>m&&f("div",{class:`${e}-tabs-nav__suffix`},m))),h&&(this.animated?f("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},Tn(p,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Tn(p,this.mergedValue,this.renderedNames)))}});function Tn(e,t,n,o,r,a,l){const i=[];return e.forEach(s=>{const{name:c,displayDirective:p,"display-directive":d}=s.props,h=y=>p===y||d===y,b=t===c;if(s.key!==void 0&&(s.key=c),b||h("show")||h("show:lazy")&&n.has(c)){n.has(c)||n.add(c);const y=!h("if");i.push(y?me(s,[[De,b]]):s)}}),l?f(ga,{name:`${l}-transition`,onBeforeLeave:o,onEnter:r,onAfterEnter:a},{default:()=>i}):i}function Pn(e,t){return f(sn,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function An(e){const t=xa(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function Xt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const il={class:"value"},sl=V({__name:"RulerLine",props:{scale:null,thick:null,palette:null,index:null,start:null,vertical:{type:Boolean},value:null,isShowReferLine:{type:Boolean}},emits:["onMouseDown","onRelease","onRemove"],setup(e,{emit:t}){const n=e,o=z(0),r=z(!0);Nt(()=>{o.value=n.value});const a=h=>{r.value=h>=0},l=L(()=>{const h=(o.value-n.start)*n.scale;a(h);const b=h+"px";return n.vertical?{top:b}:{left:b}}),i=L(()=>{var C,m;const h=`1px ${((C=n.palette)==null?void 0:C.lineBoardStyle)||"dashed"} ${(m=n.palette)==null?void 0:m.lineColor}`,b=n.vertical?{borderTop:h}:{borderLeft:h},y=n.isShowReferLine?n.vertical?"ns-resize":"ew-resize":"none";return _t({cursor:y},b)}),s=L(()=>n.vertical?{left:n.thick+"px"}:{top:n.thick+"px"}),c=h=>{h.stopPropagation();const b=n.vertical?h.clientY:h.clientX,y=o.value;t("onMouseDown");const C=S=>{const R=n.vertical?S.clientY:S.clientX,E=Math.round(y+(R-b)/n.scale);o.value=E},m=()=>{t("onRelease",o.value,n.index),document.removeEventListener("mousemove",C,!0),document.removeEventListener("mouseup",m)};document.addEventListener("mousemove",C,!0),document.addEventListener("mouseup",m)},p=()=>{t("onRemove",n.index)},d=()=>[{text:"\u5220\u9664",subText:"",handler:()=>p()}];return(h,b)=>{const y=ot("contextmenu");return me((F(),ee("div",{class:"line",style:Ne([x(l),x(i)]),onMousedown:c},[ue("div",{class:"action",style:Ne(x(s))},[ue("span",il,nt(o.value),1)],4)],36)),[[De,r.value],[y,d,void 0,{stop:!0}]])}}});const dl=Ce(sl,[["__scopeId","data-v-15802f5c"]]),cl=e=>e<=.25?40:e<=.5?20:e<=1?10:e<=2?5:e<=4?2:1,Nn=.83,ul=(e,t,n,o,r,a)=>{const{scale:l,width:i,height:s,ratio:c,palette:p}=r,{bgColor:d,fontColor:h,shadowColor:b,longfgColor:y,shortfgColor:C}=p;if(e.scale(c,c),e.clearRect(0,0,i,s),e.fillStyle=d,e.fillRect(0,0,i,s),o){const w=(n-t)*l,$=o*l;e.fillStyle=b,a?e.fillRect(w,0,$,s*3/8):e.fillRect(0,w,i*3/8,$)}const m=cl(l),S=m*l,R=m*10,E=R*l,P=Math.floor(t/m)*m,M=Math.floor(t/R)*R,B=(P-t)/m*S,v=(M-t)/R*E,g=t+Math.ceil((a?i:s)/l);e.beginPath(),e.fillStyle=h,e.strokeStyle=y;for(let w=M,$=0;w<g;w+=R,$++){const N=v+$*E+.5;a?e.moveTo(N,0):e.moveTo(0,N),e.save(),a?e.translate(N,s*.4):e.translate(i*.4,N),a||e.rotate(-Math.PI/2),e.scale(Nn/c,Nn/c),e.fillText(w.toString(),4*c,7*c),e.restore(),a?e.lineTo(N,s*9/16):e.lineTo(i*9/16,N)}e.stroke(),e.closePath(),e.beginPath(),e.strokeStyle=C;for(let w=P,$=0;w<g;w+=m,$++){const N=B+$*S+.5;a?e.moveTo(N,0):e.moveTo(0,N),w%R!==0&&(a?e.lineTo(N,s*1/4):e.lineTo(i*1/4,N))}e.stroke(),e.closePath(),e.setTransform(1,0,0,1,0,0)},pl=V({__name:"index",props:{showIndicator:{type:Boolean},valueNum:null,scale:null,ratio:null,palette:null,vertical:{type:Boolean},start:null,width:null,height:null,selectStart:null,selectLength:null},emits:["onAddLine","update:showIndicator","update:valueNum"],setup(e,{emit:t}){const n=e,o=Be({canvasContext:null});let r=1;const a=z(null);Nt(()=>{r=n.ratio||window.devicePixelRatio||1,l(),i(r),s(r)});const l=()=>{o.canvasContext=a.value&&a.value.getContext("2d")},i=p=>{if(a.value){a.value.width=n.width*p,a.value.height=n.height*p;const d=o.canvasContext;d&&(d.font=`${12*p}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`,d.lineWidth=1,d.textBaseline="middle")}},s=p=>{const d={scale:n.scale,width:n.width,height:n.height,palette:n.palette,ratio:p};o.canvasContext&&ul(o.canvasContext,n.start,n.selectStart,n.selectLength,d,!n.vertical)};Te(()=>n.start,()=>s(r)),Te([()=>n.width,()=>n.height],()=>{i(r),s(r)});const c=(p,d)=>{const h=(C,m,S)=>Math.round(m+C/S),b=n.vertical?p.offsetY:p.offsetX,y=h(b,n.start,n.scale);switch(d){case"click":t("onAddLine",y);break;case"enter":t("update:valueNum",y),t("update:showIndicator",!0);break;default:t("update:valueNum",y);break}};return(p,d)=>(F(),ee("canvas",{ref_key:"canvas",ref:a,class:"ruler",onClick:d[0]||(d[0]=h=>c(h,"click")),onMouseenter:d[1]||(d[1]=h=>c(h,"enter")),onMousemove:d[2]||(d[2]=h=>c(h,"move")),onMouseleave:d[3]||(d[3]=h=>p.$emit("update:showIndicator",!1))},null,544))}}),fl={class:"lines"},hl={class:"value"},ml=V({__name:"RulerWrapper",props:{scale:null,ratio:null,thick:null,selectStart:null,selectLength:null,isShowReferLine:{type:Boolean},palette:null,vertical:{type:Boolean,default:!0},width:{default:200},height:{default:200},start:{default:0}},setup(e,{expose:t}){const n=e,o=z(!1),r=z(0),a=z([]),l=L(()=>n.vertical?"v-container":"h-container");t({clearLines:()=>{a.value=[]}});const s=L(()=>{const b={width:`calc(100% - ${n.thick}px)`,height:`${n.thick+1}px`,left:`${n.start}px`},y={width:`${n.thick&&n.thick+1}px`,height:`calc(100% - ${n.thick}px)`,top:`${n.start}px`};return n.vertical?y:b}),c=L(()=>{var m,S;const b=(r.value-(n.start||0))*n.scale;let y="top",C="borderLeft";return y=n.vertical?"top":"left",C=n.vertical?"borderBottom":"borderLeft",{[y]:b+"px",[C]:`1px ${((m=n.palette)==null?void 0:m.lineBoardStyle)||"dashed"} ${(S=n.palette)==null?void 0:S.lineColor}`}}),p=b=>{a.value.push(b)},d=(b,y)=>{const C=b-(n.start||0),m=(n.vertical?n.height||200:n.width||200)/n.scale;C<0||C>m?h(y):a.value[y]=b},h=b=>{a.value.splice(b,1)};return(b,y)=>(F(),ee("div",{class:Vt(x(l)),style:Ne(x(s))},[I(pl,{vertical:e.vertical,scale:e.scale,width:e.width,height:e.height,start:e.start,ratio:e.ratio,"select-start":e.selectStart,"select-length":e.selectLength,palette:e.palette,valueNum:r.value,"onUpdate:valueNum":y[0]||(y[0]=C=>r.value=C),showIndicator:o.value,"onUpdate:showIndicator":y[1]||(y[1]=C=>o.value=C),onOnAddLine:p},null,8,["vertical","scale","width","height","start","ratio","select-start","select-length","palette","valueNum","showIndicator"]),me(ue("div",fl,[(F(!0),ee($e,null,Ve(a.value,(C,m)=>(F(),K(dl,{key:C+m,index:m,value:C>>0,scale:e.scale,start:e.start,thick:e.thick,palette:e.palette,vertical:e.vertical,"is-show-refer-line":e.isShowReferLine,onOnRemove:h,onOnRelease:d},null,8,["index","value","scale","start","thick","palette","vertical","is-show-refer-line"]))),128))],512),[[De,e.isShowReferLine]]),me(ue("div",{class:"indicator",style:Ne(x(c))},[ue("div",hl,nt(r.value),1)],4),[[De,o.value]])],6))}});const Vn=Ce(ml,[["__scopeId","data-v-7b9de42f"]]),bl={id:"mb-ruler",class:"style-ruler mb-ruler"},vl=V({__name:"Index",props:{scale:{default:1},ratio:{default:0},thick:{default:16},palette:null,startX:null,startY:null,width:{default:200},height:{default:200},shadow:null},setup(e){const t=e,n=z(null),o=z(null),r=z(!0),a=()=>{var s,c;(s=n.value)==null||s.clearLines(),(c=o.value)==null||c.clearLines(),r.value=!0},l=()=>[{text:"\u663E\u793A\u8F85\u52A9\u7EBF",subText:"",disable:r.value,handler:()=>r.value=!0},{text:"\u9690\u85CF\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:()=>r.value=!1},{text:"\u6E05\u7A7A\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:a}],i=L(()=>{function s(c,p){return Object.keys(c).forEach(d=>{d&&c.hasOwnProperty(d)&&(typeof p.key=="object"?c[d]=s(c[d],p[d]):p.hasOwnProperty(d)&&(c[d]=p[d]))}),c}return s({bgColor:"rgba(225,225,225, 0)",longfgColor:"#BABBBC",shortfgColor:"#C8CDD0",fontColor:"#7D8694",shadowColor:"#E8E8E8",lineColor:"#37d4cf",lineBoardStyle:"dashed",borderColor:"#DADADC",cornerActiveColor:"rgb(235, 86, 72, 0.6)",menu:{bgColor:"#fff",dividerColor:"#DBDBDB",listItem:{textColor:"#415058",hoverTextColor:"#298DF8",disabledTextColor:"rgba(65, 80, 88, 0.4)",bgColor:"#fff",hoverBgColor:"#F2F2F2"}}},t.palette||{})});return(s,c)=>{var d,h,b,y;const p=ot("contextmenu");return me((F(),ee("div",bl,[I(Vn,{vertical:!1,ref_key:"HRulerWrapperref",ref:o,width:e.width,height:16,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startX,"select-start":((d=e.shadow)==null?void 0:d.x)||0,"select-length":((h=e.shadow)==null?void 0:h.width)||0,scale:e.scale,palette:x(i)},null,8,["width","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"]),I(Vn,{vertical:!0,ref_key:"VRulerWrapperref",ref:n,width:16,height:e.height,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startY,"select-start":((b=e.shadow)==null?void 0:b.y)||0,"select-length":((y=e.shadow)==null?void 0:y.height)||0,scale:e.scale,palette:x(i)},null,8,["height","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"])])),[[p,l,void 0,{stop:!0}]])}}});const gl=V({__name:"Ruler",props:{width:null,height:null,isShowReferLine:{type:Boolean}},setup(e){const r={h:[],v:[]},a=20;return(l,i)=>(F(),K(x(vl),{thick:a,scale:1,width:e.width,height:e.height,startX:0,startY:0,lines:r,isShowReferLine:e.isShowReferLine},null,8,["width","height","isShowReferLine"]))}});const xl=Ce(gl,[["__scopeId","data-v-31710d38"]]),yl=V({__name:"Area",props:{start:null,width:null,height:null},setup(e){const t=no(),n=()=>{t.compose(),Ie.emit("hideArea")},o=()=>{t.flushLeft(),Ie.emit("hideArea")},r=()=>{t.flushRight(),Ie.emit("hideArea")},a=()=>{t.flushTop(),Ie.emit("hideArea")},l=()=>{t.flushBottom(),Ie.emit("hideArea")},i=()=>{t.flushRow(),Ie.emit("hideArea")},s=()=>{t.flushColumn(),Ie.emit("hideArea")},c=()=>{t.batchDeleteComponent(t.components),Ie.emit("hideArea")},p=()=>[{text:"\u7EC4\u5408",subText:"",disable:!t.canCompose,handler:n},{divider:!0},{text:"\u5220\u9664",subText:"Ctrl + Delete",disable:t.components.length<=0,handler:c},{divider:!0},{text:"\u5DE6\u5BF9\u9F50",subText:"",handler:o},{text:"\u53F3\u5BF9\u9F50",subText:"",handler:r},{text:"\u9876\u5BF9\u9F50",subText:"",handler:a},{text:"\u5E95\u5BF9\u9F50",subText:"",handler:l},{divider:!0},{text:"\u6C34\u5E73\u5BF9\u9F50",subText:"",handler:i},{text:"\u5782\u76F4\u5BF9\u9F50",subText:"",handler:s}];return(d,h)=>{const b=ot("contextmenu");return me((F(),ee("div",{style:Ne({left:e.start.x+"px",top:e.start.y+"px",width:e.width+"px",height:e.height+"px"}),class:"area"},null,4)),[[b,p,void 0,{stop:!0}]])}}});const Ln=Ce(yl,[["__scopeId","data-v-a1be5080"]]);const _l={},wl={class:"grid",width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},Cl=ya('<defs data-v-9ff3aadd><pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse" data-v-9ff3aadd><path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1" data-v-9ff3aadd></path></pattern><pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse" data-v-9ff3aadd><rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)" data-v-9ff3aadd></rect><path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.5)" stroke-width="1" data-v-9ff3aadd></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" data-v-9ff3aadd></rect>',2),Sl=[Cl];function kl(e,t){return F(),ee("svg",wl,Sl)}const Rl=Ce(_l,[["render",kl],["__scopeId","data-v-9ff3aadd"]]),$l={class:"mark-line"},Dl=V({__name:"MarkLine",setup(e){const t=Se(),n=z([]),o=Be(["xt","xc","xb","yl","yc","yr"]),r=z(3),a=Be({xt:!1,xc:!1,xb:!1,yl:!1,yc:!1,yr:!1}),l=h=>{n.value.push(h)},i=()=>{Object.keys(a).forEach(h=>{a[h]=!1})};zt("move",h=>{s(h.isDownward,h.isRightward)}),zt("unmove",()=>{i()});const s=(h,b)=>{const y=t.componentData;if(t.curComponent){const{top:C,left:m,right:S,bottom:R}=Qt(t.curComponent.positionStyle),E=(S-m)/2,P=(R-C)/2;i(),y.forEach(M=>{if(M==t.curComponent)return;const B=Qt(M.positionStyle),{top:v,left:g,bottom:w,right:$}=B,N=($-g)/2,q=(w-v)/2,ie={top:[{isNearly:c(C,v),lineNode:n.value[0],line:"xt",dragShift:v,lineShift:v},{isNearly:c(R,v),lineNode:n.value[0],line:"xt",dragShift:v-(R-C||0),lineShift:v},{isNearly:c((C||0)+P,v+q),lineNode:n.value[1],line:"xc",dragShift:v+q-P,lineShift:v+q},{isNearly:c(C,w),lineNode:n.value[2],line:"xb",dragShift:w,lineShift:w},{isNearly:c(R,w),lineNode:n.value[2],line:"xb",dragShift:w-(R-C||0),lineShift:w}],left:[{isNearly:c(m,g),lineNode:n.value[3],line:"yl",dragShift:g,lineShift:g},{isNearly:c(S,g),lineNode:n.value[3],line:"yl",dragShift:g-(S-m||0),lineShift:g},{isNearly:c((m||0)+E,g+N),lineNode:n.value[4],line:"yc",dragShift:g+N-E,lineShift:g+N},{isNearly:c(m,$),lineNode:n.value[5],line:"yr",dragShift:$,lineShift:$},{isNearly:c(S,$),lineNode:n.value[5],line:"yr",dragShift:$-(S-m||0),lineShift:$}]},se=[],{rotate:j}=t.curComponent.style;Object.keys(ie).forEach(Z=>{ie[Z].forEach(W=>{if(!W.isNearly)return;const Y=j!=0?p(Z,W,{width:S-m,height:R-C}):W.dragShift;t.setCurComponentStyle(Z,Y),W.lineNode.style[Z]=`${W.lineShift}px`,se.push(W.line)})}),se.length&&d(se,h,b)})}},c=(h,b)=>Math.abs(h-b)<=r.value,p=(h,b,y)=>{const{width:C,height:m}=t.curComponent.style;return h=="top"?Math.round(b.dragShift-(m-y.height)/2):Math.round(b.dragShift-(C-y.width)/2)},d=(h,b,y)=>{y?h.includes("yr")?a.yr=!0:h.includes("yc")?a.yc=!0:h.includes("yl")&&(a.yl=!0):h.includes("yl")?a.yl=!0:h.includes("yc")?a.yc=!0:h.includes("yr")&&(a.yr=!0),b?h.includes("xb")?a.xb=!0:h.includes("xc")?a.xc=!0:h.includes("xt")&&(a.xt=!0):h.includes("xt")?a.xt=!0:h.includes("xc")?a.xc=!0:h.includes("xb")&&(a.xb=!0)};return(h,b)=>(F(),ee("div",$l,[(F(!0),ee($e,null,Ve(o,y=>me((F(),ee("div",{key:y,class:Vt(["line",y.includes("x")?"xline":"yline"]),ref_for:!0,ref:l},null,2)),[[De,a[y]||!1]])),128))]))}});const Bl=Ce(Dl,[["__scopeId","data-v-a18c1d1e"]]),zl=["onMousedown"],Il=V({__name:"Index",setup(e){const t=Se(),n=no(),o=oo(),r=j=>kn(j,["top","left","width","height","rotate"]),a=L(()=>n.style.width>0&&!v.value&&!t.isClickComponent),l=L(()=>({x:n.style.left,y:n.style.top})),i=L(()=>n.style.width),s=L(()=>n.style.height),c=()=>{v.value=!1,M.value=0,B.value=0,n.setAreaData({left:0,top:0,width:0,height:0},[])},p=()=>{t.clearCanvas()},d=(j,Z)=>{const W=document.querySelector("#editor").getBoundingClientRect(),Y=Z.pageY-W.top,pe=Z.pageX-W.left;o.paste(!0,pe,Y)},h=()=>[{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:d},{text:"\u6E05\u7A7A\u753B\u5E03",subText:"",handler:p}];zt("hideArea",c),Nt(()=>{console.log("\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F"),t.setEditMode(Sn.EDIT),document.addEventListener("paste",S)}),Gn(()=>{console.log("\u8FDB\u5165\u9884\u89C8\u6A21\u5F0F"),t.setEditMode(Sn.PREVIEW),document.removeEventListener("paste",S),t.clearCanvas()});const b=L(()=>t.componentData),y=L(()=>t.canvasStyleData),C=L(()=>t.curComponent),m=L(()=>{const j=Ut(_t({},y.value),{backgroundImage:y.value.image,backgroundSize:"cover",backgroundColor:y.value.color||"#084860"});return kn(j,["width","height","backgroundImage","backgroundSize","backgroundColor"])}),S=j=>{if(j.clipboardData){const Z=j.clipboardData.getData("text");try{const W=_a(JSON.parse(Z));"component"in W&&(W.change("top",W.positionStyle.top+10),W.change("left",W.positionStyle.left+10),cn(JSON.stringify(W)),j.preventDefault(),t.appendComponent(W))}catch(W){console.log(W)}}},R=z(0),E=z(0),P=Be({x:0,y:0}),M=z(0),B=z(0),v=z(!0),g=z(null),w=z(!0),$=j=>{var ve;t.setClickComponentStatus(!1),j.preventDefault(),j.stopPropagation(),c();const Z=(ve=g.value)==null?void 0:ve.getBoundingClientRect();R.value=Z.x,E.value=Z.y;const W=j.clientX,Y=j.clientY;P.x=W-R.value,P.y=Y-E.value,v.value=!0;const pe=oe=>{oe.preventDefault(),oe.stopPropagation(),M.value=Math.abs(oe.clientX-W),B.value=Math.abs(oe.clientY-Y),oe.clientX<W&&(P.x=oe.clientX-R.value),oe.clientY<Y&&(P.y=oe.clientY-E.value)},fe=oe=>{if(document.removeEventListener("mousemove",pe),document.removeEventListener("mouseup",fe),oe.clientX==W&&oe.clientY==Y){c();return}const xe={left:P.x,top:P.y,right:M.value+P.x,bottom:P.y+B.value},de=N(xe);if(de){const ae=de.rect;n.setAreaData({top:ae.top,left:ae.left,width:ae.right-ae.left,height:ae.bottom-ae.top,rotate:0},de.components),P.x=ae.left,P.y=ae.top,M.value=ae.right-ae.left,B.value=ae.bottom-ae.top}else c()};document.addEventListener("mousemove",pe),document.addEventListener("mouseup",fe)},N=j=>{const Z=[],W=new Set,Y=new Set,pe=new Set,fe=new Set;if(t.componentData.forEach(ve=>{const{width:oe,height:xe,left:de,top:ae,rotate:ne}=ve.style,ge=Qt({width:oe,height:xe,left:de,top:ae,rotate:ne});ge.left>=j.left&&ge.right<=j.right&&ge.top>=j.top&&ge.bottom<=j.bottom&&(Z.push(ve),W.add(ge.left),Y.add(ge.top),pe.add(ge.right),fe.add(ge.bottom))}),Z.length>0){const ve=Math.min(...W),oe=Math.max(...pe),xe=Math.min(...Y),de=Math.max(...fe);return{components:Z,rect:{left:ve,right:oe,top:xe,bottom:de}}}},q=j=>Re(this,null,function*(){j.preventDefault(),j.stopPropagation();const Z=j.dataTransfer.getData("componentName");if(Z){const W=new en[Z],Y=document.querySelector("#editor").getBoundingClientRect(),pe=j.pageY-Y.top,fe=j.pageX-Y.left;W.change("top",pe),W.change("left",fe),t.appendComponent(W)}}),ie=j=>{j.preventDefault(),j.dataTransfer.dropEffect="copy"},se=()=>{t.isClickComponent||t.setCurComponent(void 0)};return(j,Z)=>{const W=ot("contextmenu");return me((F(),ee("div",{class:"editor edit",ref_key:"editor",ref:g,id:"editor",style:Ne(x(m)),onMousedown:un($,["left"]),onDrop:q,onDragover:ie,onMouseup:se},[I(Rl),I(xl,{width:x(y).width,height:x(y).height,isShowReferLine:w.value},null,8,["width","height","isShowReferLine"]),(F(!0),ee($e,null,Ve(x(b),(Y,pe)=>(F(),ee($e,{key:Y.id},[x(t).isEditMode&&Y.display?(F(),K(x(La),{key:0,id:"shape"+Y.id,defaultStyle:Y.style,style:Ne(r(Y.style)),active:Y.id===(x(C)||{}).id,info:Y,class:Vt({lock:Y.locked}),index:pe},{default:H(()=>[(F(),K(wa(Y.component),{class:"component",style:Ne(x(Ca)(Y)),component:Y,id:"component"+Y.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):Bt("",!0)],64))),128)),I(Bl),v.value?(F(),K(Ln,{key:0,start:P,width:M.value,height:B.value},null,8,["start","width","height"])):x(a)?(F(),K(Ln,{key:1,start:x(l),width:x(i),height:x(s)},null,8,["start","width","height"])):Bt("",!0)],44,zl)),[[W,h,void 0,{stop:!0}]])}}});const Fl=Ce(Il,[["__scopeId","data-v-def44b7a"]]),bo=Sa(),We=Se(),St=Yn(),El=()=>Re(void 0,null,function*(){const e=yield bo.lastRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),Tl=()=>Re(void 0,null,function*(){const e=yield bo.nextRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),Pl=()=>{We.toggleShowEm()},Al=e=>{const t=`${We.name}`||"OpenDataV";ka(`${t}.json`,JSON.stringify({id:e,name:t,canvasData:We.layoutData,canvasStyle:We.canvasStyleData}))},Nl=()=>{Ra(Vl,".json")},Vl=e=>{if(e.target&&e.target.result){const t=JSON.parse(e.target.result);t&&(We.setComponentData(t.canvasData),We.setCanvasStyle(t.canvasStyle))}},Ll=()=>{St.setNavTheme(St.darkTheme?"dark":"light"),St.setDarkTheme(!St.darkTheme)},Ul=V({__name:"ThemeIcon",setup(e){const t=Yn(),n=L(()=>t.darkTheme?"sun-one":"moon");return(o,r)=>{const a=xt("icon-park");return F(),K(a,{name:x(n)},null,8,["name"])}}}),Ml="2946854",Ol="\u65B9\u5411",jl="iconfont",Hl="icon-",Wl="",Xl=[{icon_id:"11291350",name:"\u7EC4",font_class:"zu",unicode:"e854",unicode_decimal:59476},{icon_id:"1817751",name:"\u67F1\u5F62\u56FE",font_class:"zhuxingtu",unicode:"e626",unicode_decimal:58918},{icon_id:"3868284",name:"\u4EEA\u8868\u76D8",font_class:"yibiaopan",unicode:"eb67",unicode_decimal:60263},{icon_id:"4354243",name:"\u56FE\u8868-\u997C\u56FE",font_class:"tubiao-bingtu",unicode:"eb95",unicode_decimal:60309},{icon_id:"4354246",name:"\u56FE\u8868-\u5361\u7247",font_class:"tubiao-qiapian",unicode:"eb96",unicode_decimal:60310},{icon_id:"4354248",name:"\u56FE\u8868-\u6298\u7EBF\u56FE",font_class:"tubiao-zhexiantu",unicode:"eb97",unicode_decimal:60311},{icon_id:"4906240",name:"\u6309\u94AE\u7EC4",font_class:"anniuzu",unicode:"e782",unicode_decimal:59266},{icon_id:"5383645",name:"\u5BFC\u822A",font_class:"daohang",unicode:"e77d",unicode_decimal:59261},{icon_id:"5961366",name:"\u5217\u8868",font_class:"liebiao",unicode:"ec6b",unicode_decimal:60523},{icon_id:"5971297",name:"\u91C7\u7164\u673A",font_class:"caimeiji",unicode:"e603",unicode_decimal:58883},{icon_id:"7040619",name:"\u5176\u4ED6",font_class:"qita",unicode:"e63b",unicode_decimal:58939},{icon_id:"7556180",name:"\u5B9A\u5236",font_class:"dingzhi",unicode:"e609",unicode_decimal:58889},{icon_id:"9752796",name:"\u57FA\u7840",font_class:"jichu",unicode:"e60f",unicode_decimal:58895},{icon_id:"9921108",name:"chart",font_class:"chartt",unicode:"e60a",unicode_decimal:58890},{icon_id:"14475731",name:"\u88C5\u9970\u88C5\u4FEE",font_class:"zhuangshizhuangxiu",unicode:"e6a6",unicode_decimal:59046},{icon_id:"16562592",name:"\u6E29\u5EA6\u8BA1",font_class:"wenduji",unicode:"e6de",unicode_decimal:59102},{icon_id:"22712019",name:"\u6761\u5F62\u8FDB\u5EA6\u56FE",font_class:"tiaoxingjindutu",unicode:"e66b",unicode_decimal:58987},{icon_id:"22761375",name:"\u8FB9\u6846",font_class:"biankuang",unicode:"e6b7",unicode_decimal:59063},{icon_id:"22885432",name:"\u8FDB\u5EA6\u56FE",font_class:"jindutu",unicode:"f24b",unicode_decimal:62027},{icon_id:"124495",name:"\u8B66\u544A",font_class:"jinggao1",unicode:"e601",unicode_decimal:58881},{icon_id:"1846445",name:"\u9884\u8B66\u706F",font_class:"yujingdeng",unicode:"e67f",unicode_decimal:59007},{icon_id:"2239579",name:"\u81EA\u52A8\u7CFB\u7EDF\u8B66\u544A\u706F",font_class:"zidongxitongjinggaodeng1",unicode:"e605",unicode_decimal:58885},{icon_id:"4988542",name:"\u9884\u8B66",font_class:"yujing1",unicode:"e644",unicode_decimal:58948},{icon_id:"9974390",name:"\u9884\u8B66",font_class:"yujing3",unicode:"e6fe",unicode_decimal:59134},{icon_id:"10817515",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng",unicode:"e64b",unicode_decimal:58955},{icon_id:"14151833",name:"\u62A5\u8B66",font_class:"baojing1",unicode:"e630",unicode_decimal:58928},{icon_id:"16965399",name:"\u8B66\u544A\u706F",font_class:"hong",unicode:"e60d",unicode_decimal:58893},{icon_id:"20379044",name:"\u9884\u8B66\u706F",font_class:"yujingdeng1",unicode:"e623",unicode_decimal:58915},{icon_id:"23819336",name:"\u62A5\u8B66 \u8B66\u544A \u9884\u8B66 \u8B66\u544A\u706F",font_class:"a-baojingjinggaoyujingjinggaodeng",unicode:"e628",unicode_decimal:58920},{icon_id:"24312218",name:"light",font_class:"light",unicode:"e63a",unicode_decimal:58938},{icon_id:"24614518",name:"\u544A\u8B66\u706F",font_class:"gaojingdeng9",unicode:"e664",unicode_decimal:58980},{icon_id:"25567211",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng1",unicode:"e613",unicode_decimal:58899},{icon_id:"12041083",name:"\u9884\u8B66",font_class:"yujing5",unicode:"e671",unicode_decimal:58993},{icon_id:"577357",name:"\u5220\u9664",font_class:"shanchu",unicode:"e74b",unicode_decimal:59211},{icon_id:"1986988",name:"\u5220\u9664",font_class:"shanchu1",unicode:"e625",unicode_decimal:58917},{icon_id:"12795401",name:"\u9996\u9875",font_class:"shouye",unicode:"e62d",unicode_decimal:58925},{icon_id:"201556",name:"\u67E5\u770B",font_class:"chakan",unicode:"e600",unicode_decimal:58880},{icon_id:"201638",name:"\u7F16\u8F91",font_class:"bianji",unicode:"e602",unicode_decimal:58882},{icon_id:"11729723",name:"\u590D\u5236",font_class:"fuzhi",unicode:"e608",unicode_decimal:58888},{icon_id:"7269302",name:"\u9996\u9875-\u9ED8\u8BA4",font_class:"shouye-moren",unicode:"e619",unicode_decimal:58905},{icon_id:"658044",name:"\u89E3\u9501",font_class:"jiesuo",unicode:"e669",unicode_decimal:58985},{icon_id:"10097949",name:"\u65CB\u8F6C",font_class:"xuanzhuan",unicode:"e680",unicode_decimal:59008},{icon_id:"374774",name:"\u5F00\u5173",font_class:"kaiguan",unicode:"e61f",unicode_decimal:58911},{icon_id:"122162",name:"\u65F6\u949F",font_class:"clock",unicode:"e63e",unicode_decimal:58942},{icon_id:"1242185",name:"\u53CD\u9988\u4FE1\u606F",font_class:"fankuixinxi",unicode:"e660",unicode_decimal:58976},{icon_id:"2468505",name:"37\u7C7B\u5EFA\u7B51\u4FEE\u7406x16",font_class:"leijianzhuxiulix",unicode:"e695",unicode_decimal:59029},{icon_id:"11747267",name:"\u65F6\u95F4",font_class:"weibiaoti-",unicode:"e618",unicode_decimal:58904},{icon_id:"14794143",name:"sds_\u7B2C37\u7C7B \u5EFA\u7B51\u4FEE\u7406",font_class:"sds_di37leijianzhuxiuli",unicode:"e61e",unicode_decimal:58910},{icon_id:"17762035",name:"\u8054\u52A8\u63A7\u5236",font_class:"liandongkongzhi",unicode:"e624",unicode_decimal:58916},{icon_id:"18165278",name:"\u9501,\u5BC6\u7801,\u5F00\u9501,\u89E3\u9501",font_class:"unlock-full",unicode:"e882",unicode_decimal:59522},{icon_id:"288554",name:"ascend",font_class:"ascend",unicode:"e6b4",unicode_decimal:59060},{icon_id:"288556",name:"falling",font_class:"falling",unicode:"e6b6",unicode_decimal:59062},{icon_id:"815867",name:"\u6309\u94AE-\u5173",font_class:"buttonoff",unicode:"e614",unicode_decimal:58900},{icon_id:"815872",name:"\u6309\u94AE-\u5F00",font_class:"buttonon",unicode:"e615",unicode_decimal:58901},{icon_id:"2674878",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushang",unicode:"e62c",unicode_decimal:58924},{icon_id:"2674928",name:"\u7BAD\u5934 \u53F3",font_class:"jiantouyou",unicode:"e632",unicode_decimal:58930},{icon_id:"2674929",name:"\u7BAD\u5934 \u4E0B",font_class:"jiantouxia",unicode:"e633",unicode_decimal:58931},{icon_id:"7594038",name:"24gl-next",font_class:"24gl-next",unicode:"ea6b",unicode_decimal:60011},{icon_id:"7594046",name:"24gl-pauseCircle",font_class:"24gl-pauseCircle",unicode:"ea6f",unicode_decimal:60015},{icon_id:"7594068",name:"24gl-previous",font_class:"24gl-previous",unicode:"ea73",unicode_decimal:60019},{icon_id:"7594086",name:"24gl-stopCircle",font_class:"24gl-stopCircle",unicode:"ea79",unicode_decimal:60025},{icon_id:"10268256",name:"\u6309\u94AE_\u5F00\u542F",font_class:"anniu_kaiqi",unicode:"e659",unicode_decimal:58969},{icon_id:"10268257",name:"\u6309\u94AE_\u5173\u95ED",font_class:"anniu_guanbi",unicode:"e65b",unicode_decimal:58971},{icon_id:"25807963",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushangzuo-copy",unicode:"ec63",unicode_decimal:60515},{icon_id:"25808146",name:"\u5411\u53F32",font_class:"xiangzuo2-copy",unicode:"ec64",unicode_decimal:60516},{icon_id:"166602",name:"\u5173\u95ED\u64AD\u653E",font_class:"guanbibofang",unicode:"e61d",unicode_decimal:58909},{icon_id:"577396",name:"\u5411\u4E0A3",font_class:"xiangshang3",unicode:"e76f",unicode_decimal:59247},{icon_id:"577401",name:"\u5411\u4E0B5",font_class:"xiangxia5",unicode:"e774",unicode_decimal:59252},{icon_id:"577403",name:"\u5411\u53F32",font_class:"xiangyou2",unicode:"e776",unicode_decimal:59254},{icon_id:"1159910",name:"\u53F3\u64AD\u653E",font_class:"youbofang",unicode:"e62e",unicode_decimal:58926},{icon_id:"1159911",name:"\u5DE6\u64AD\u653E",font_class:"zuobofang",unicode:"e62f",unicode_decimal:58927},{icon_id:"1185945",name:"\u64AD\u653E",font_class:"bofang2",unicode:"e606",unicode_decimal:58886},{icon_id:"1488892",name:"\u64AD\u653E",font_class:"bofang5",unicode:"e607",unicode_decimal:58887},{icon_id:"1727559",name:"323\u5411\u5DE6\u4EA4\u6362",font_class:"xiangzuojiaohuan",unicode:"e8f8",unicode_decimal:59640},{icon_id:"1727561",name:"324\u5411\u53F3\u4EA4\u6362",font_class:"xiangyoujiaohuan",unicode:"e8f9",unicode_decimal:59641},{icon_id:"2076218",name:"\u64AD\u653E2",font_class:"bofang6",unicode:"e87c",unicode_decimal:59516},{icon_id:"7594051",name:"24gl-playCircle",font_class:"24gl-playCircle",unicode:"ea6e",unicode_decimal:60014},{icon_id:"11121478",name:"\u5411\u4E0A",font_class:"xiangshang7",unicode:"e63c",unicode_decimal:58940},{icon_id:"16388177",name:"\u64AD\u653E",font_class:"bofang26",unicode:"e60e",unicode_decimal:58894},{icon_id:"18176557",name:"\u64AD\u653E",font_class:"play1",unicode:"ea8d",unicode_decimal:60045},{icon_id:"24267227",name:"\u64AD\u653E-\u5FEB\u9000",font_class:"bofang-kuaitui",unicode:"e68a",unicode_decimal:59018},{icon_id:"24267260",name:"\u64AD\u653E09",font_class:"bofang09",unicode:"e690",unicode_decimal:59024},{icon_id:"24268374",name:"\u64AD\u653E-\u5FEB\u8FDB",font_class:"bofang-kuaijin",unicode:"e6d8",unicode_decimal:59096},{icon_id:"25807740",name:"\u5411\u4E0A",font_class:"xiangxia7",unicode:"ec62",unicode_decimal:60514}],ql={id:Ml,name:Ol,font_family:jl,css_prefix_text:Hl,description:Wl,glyphs:Xl},Gl={class:"icon-list"},Yl=["onClick"],Kl=V({__name:"IconFont",setup(e){const t=L(()=>ql.glyphs.map(a=>`icon-${a.font_class}`)),n=z(!0),o=()=>{n.value=!1},r=a=>{cn(a),Me.success(`\u590D\u5236\u56FE\u6807: ${a}`)};return(a,l)=>(F(),K(Zn,null,{default:H(()=>[I(x(Kn),{class:"show-card",show:n.value,preset:"card",onMaskClick:o,title:`\u56FE\u6807\u6570\u91CF${x(t).length}`,onClose:o,"onUpdate:show":l[0]||(l[0]=()=>n.value=!1),style:{width:"50%",maxWidth:"800px"}},{default:H(()=>[ue("ul",Gl,[(F(!0),ee($e,null,Ve(x(t),i=>(F(),ee("li",{key:i,class:"dib",onClick:s=>r(i)},[ue("span",{class:Vt(`icon iconfont ${i}`)},null,2)],8,Yl))),128))])]),_:1},8,["show","title"])]),_:1}))}});const Zl=Ce(Kl,[["__scopeId","data-v-538b9921"]]),Jl=()=>{const e=I(Zl,{},null),t=document.createElement("div"),n=document.querySelector("#app");Jn(e,t),n==null||n.appendChild(t)},Ql=Jl,ei={class:"dialog-footer"},ti=pn("\u53D6\u6D88"),ni=pn("\u65B0\u589E"),oi=pn("\u66F4\u65B0"),ai=V({__name:"SavePage",props:{index:null},setup(e){const t=e,n=Se(),o=z(!0),r=Be({name:"",thumbnail:""}),a=Be({name:[{required:!0,message:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0",trigger:"blur"}]}),l=i=>Re(this,null,function*(){const{name:s,thumbnail:c}=r;if(!s){Me.error("\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0");return}const p={name:s,thumbnail:c,canvasData:n.layoutData,canvasStyle:n.canvasStyleData};if(i==="update")try{(yield Ua(t.index,p)).status===200&&Me.success("\u4FEE\u6539\u6210\u529F")}catch(d){Me.error("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5BFC\u51FA\u5230\u672C\u5730\uFF0C\u5E76\u91CD\u65B0\u8FDB\u5165\u6B64\u9875\u9762")}finally{o.value=!1}else try{const d=yield Ma(p);d.status===201&&(Me.success("\u4FDD\u5B58\u6210\u529F"),$a.push({name:"Editor",params:{index:d.data.id}}))}catch(d){Me.error(`\u4FDD\u5B58\u5931\u8D25\uFF0C\u5931\u8D25\u4FE1\u606F:${(d==null?void 0:d.message)||d}`)}finally{o.value=!1}});return(i,s)=>(F(),K(Zn,null,{default:H(()=>[I(x(Kn),{show:o.value,"mask-closable":!1,preset:"card",center:"",title:"\u4FDD\u5B58\u5F53\u524D\u5E03\u5C40",style:{width:"30%",minWidth:"600px"},"onUpdate:show":s[5]||(s[5]=()=>o.value=!1),size:"medium"},{footer:H(()=>[ue("span",ei,[I(x(et),{onClick:s[2]||(s[2]=c=>o.value=!1)},{default:H(()=>[ti]),_:1}),e.index?(F(),K(x(et),{key:1,type:"primary",onClick:s[4]||(s[4]=c=>l("update"))},{default:H(()=>[oi]),_:1})):(F(),K(x(et),{key:0,type:"primary",onClick:s[3]||(s[3]=c=>l("new"))},{default:H(()=>[ni]),_:1}))])]),default:H(()=>[I(x(hn),{model:r,rules:a,onSubmit:s[1]||(s[1]=un(()=>{},["prevent"]))},{default:H(()=>[I(x(It),{label:"\u9875\u9762\u540D\u79F0",prop:"name"},{default:H(()=>[I(x(yt),{modelValue:r.name,"onUpdate:modelValue":s[0]||(s[0]=c=>r.name=c),placeholder:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1}))}}),ri=e=>{const t=I(ai,{index:e},null),n=document.createElement("div");Jn(t,n)},li=ri,Un=V({__name:"ToolBarItem",props:{label:null,action:null,disable:{type:Function,default:()=>!1},icon:null,divider:{type:[Boolean,null]},children:null,otherShow:null},setup(e){const t=e,n=L(()=>typeof t.icon=="string"?f(Ue,{name:t.icon,size:"24"}):t.icon());return(o,r)=>(F(),ee($e,null,[I(x(Da),null,{trigger:H(()=>[I(x(et),{quaternary:"",size:"small",onClick:e.action,title:e.label},{default:H(()=>[I(x(n))]),_:1},8,["onClick","title"])]),default:H(()=>[ue("span",null,nt(e.label),1)]),_:1}),e.divider?(F(),K(x(Ba),{key:0,vertical:""})):Bt("",!0)],64))}}),ii={class:"tool-bar"},si={class:"tool-bar-item"},di={class:"tool-bar-title"},ci={class:"tool-bar-item"},ui=V({__name:"Toolbar",setup(e){const t=Se(),n=za(),o=Qn(),r=[{label:"\u9996\u9875",action:i=>{n.push({name:"Pages"})},icon:"home",divider:!0,location:"left"},{label:"\u4FDD\u5B58",action:()=>li(o.params.index),icon:"save-one",location:"left"},{label:"\u9884\u89C8",action:i=>{const{href:s}=n.resolve("/preview");window.open(s,"_blank")},icon:"computer",location:"left"},{label:"\u64A4\u9500",action:El,icon:"back",location:"left"},{label:"\u6062\u590D",action:Tl,icon:"next",location:"left"},{label:"\u5BFC\u51FA",action:()=>Al(o.params.index||""),icon:"download-one",location:"left"},{label:"\u5BFC\u5165",action:Nl,icon:"upload-one",location:"left"},{label:"\u5168\u5C4F",action:()=>{const i=document.querySelector("#editor");document.fullscreenEnabled&&i&&i.requestFullscreen()},icon:"full-screen",location:"left"},{label:"\u5750\u6807",action:Pl,icon:"cones",location:"left"},{label:"\u56FE\u6807",action:Ql,icon:"game-ps",location:"right"},{label:"\u4E3B\u9898",action:Ll,icon:()=>f(Ul),location:"right"}],a=r.filter(i=>i.location==="left"),l=r.filter(i=>i.location==="right");return(i,s)=>(F(),ee("div",ii,[ue("div",si,[(F(!0),ee($e,null,Ve(x(a),(c,p)=>(F(),K(Un,{key:p,action:c.action,label:c.label,divider:c.divider,icon:c.icon},null,8,["action","label","divider","icon"]))),128))]),ue("div",di,nt(x(t).name),1),ue("div",ci,[(F(!0),ee($e,null,Ve(x(l),(c,p)=>(F(),K(Un,{key:p,action:c.action,label:c.label,divider:c.divider,icon:c.icon},null,8,["action","label","divider","icon"]))),128))])]))}});const pi=Ce(ui,[["__scopeId","data-v-4243bd17"]]),fi=["data-component"],hi=V({__name:"ComponentItem",props:{component:null,name:null},setup(e){return(t,n)=>(F(),ee("div",{draggable:"true","data-component":e.component},[ue("div",null,nt(e.name),1)],8,fi))}}),mi={class:"components"},Mn=V({__name:"ComponentList",setup(e){const t=L(()=>{const o={};Object.keys(en).forEach(a=>{const l=new en[a],i=l.group;!i||!l.show||(o[i]||(o[i]=[]),o[i].push(l))});const r=[];return eo.forEach(a=>{var l;r.push({label:()=>a.name,key:a.key,icon:()=>f(Ue,{name:`${a.icon}`}),children:(l=o[a.key])==null?void 0:l.map(i=>({label:()=>f(hi,{component:i.component,name:i.name,ondragstart:n}),key:i.component}))})}),r}),n=o=>{o.dataTransfer.setData("componentName",o.target.dataset.component)};return(o,r)=>(F(),ee("div",mi,[I(x(fn),{options:x(t),accordion:!1},null,8,["options"])]))}}),bi={key:0,class:"layer"},vi={key:1,class:"layer"},gi=V({__name:"LayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),r=(i,s)=>{var c;(c=i.dataTransfer)==null||c.setData("compomentIndex",s),i.stopPropagation()},a=(i,s,c=!1)=>{i.preventDefault(),i.stopPropagation(),c&&s!==n.activeKey&&Ie.emit("ActiveMenu",s)},l=(i,s)=>{var m;i.preventDefault(),i.stopPropagation();const c=(m=i.dataTransfer)==null?void 0:m.getData("compomentIndex");if(!Ia(c,s))return;const d=c.split("-").map(S=>Number(S)),h=o.getComponentByIndex(d),b=tn(h),y=s.split("-").map(S=>Number(S)),C=o.getComponentByIndex(y);if(b&&C&&s){const S=C.id;o.cutComponent(d[d.length-1],h==null?void 0:h.parent);const R=C.parent||void 0,P=(R?R.subComponents:o.componentData).findIndex(M=>M.id===S);o.insertComponent(P,b,R),t("select",s)}};return(i,s)=>{const c=xt("icon-park"),p=ot("contextmenu");return me((F(),ee("div",{draggable:"true",onDragstart:s[0]||(s[0]=d=>r(d,e.index)),onDrop:s[1]||(s[1]=d=>l(d,e.index)),onDragover:s[2]||(s[2]=d=>a(d,e.index,!0))},[e.component.component==="Group"?(F(),ee("div",bi,[me(ue("span",null,nt(e.component.name||"\u5206\u7EC4"),513),[[De,e.mode==="expand"]]),e.component.display?(F(),K(c,{key:0,name:"preview-open",size:"15"})):(F(),K(c,{key:1,name:"preview-close-one",size:"15"}))])):(F(),ee("div",vi,[me(ue("span",null,nt(e.component.name),513),[[De,e.mode==="expand"]]),e.component.display?(F(),K(c,{key:0,size:"15",name:"preview-open"})):(F(),K(c,{key:1,size:"15",name:"preview-close-one"}))]))],32)),[[p,e.contextmenus,void 0,{stop:!0}]])}}});const On=Ce(gi,[["__scopeId","data-v-37f5bfba"]]),xi=V({__name:"SimpleLayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},name:null,contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),r=(s,c)=>{var p;(p=s.dataTransfer)==null||p.setData("compomentIndex",c),s.stopPropagation()},a=(s,c,p=!1)=>{s.preventDefault(),s.stopPropagation(),p&&c!==n.activeKey&&Ie.emit("ActiveMenu",c)},l=(s,c)=>{var C;s.preventDefault(),s.stopPropagation();const p=(C=s.dataTransfer)==null?void 0:C.getData("compomentIndex"),d=i(p,c),h=p.split("-").map(m=>Number(m)),b=o.getComponentByIndex(h),y=o.cutComponent(h[h.length-1],b==null?void 0:b.parent);if(y&&d){const m=p.split("-").map(R=>Number(R)),S=o.getComponentByIndex(m);o.insertComponent(m[m.length-1],y,S),t("select",c)}},i=(s,c)=>{const p=s.split("-").map(b=>parseInt(b)),d=c.split("-").map(b=>parseInt(b)),h=p.length;for(let b=0;b<h;b++)if(p[b]!==d[b]){if(p[b]>d[b])return c;if(p[b]<d[b])return b+1==h?(d[b]=d[b]-1,d.join("-")):c}return c};return(s,c)=>{const p=xt("IconPark"),d=ot("contextmenu");return me((F(),K(p,{draggable:"true",onDragstart:c[0]||(c[0]=h=>r(h,e.index)),onDrop:c[1]||(c[1]=h=>l(h,e.index)),onDragover:c[2]||(c[2]=h=>a(h,e.index,!0)),name:e.name},null,8,["name"])),[[d,e.contextmenus,void 0,{stop:!0}]])}}});const jn=Ce(xi,[["__scopeId","data-v-33315ec9"]]),Hn=V({__name:"Layer",setup(e){const t=Se(),n=oo(),o={};eo.map(v=>{o[v.key]=v.icon});const r=L(()=>t.componentData),a=z(null),l=z("");zt("ActiveMenu",v=>{const g=v;l.value=g,a.value&&a.value.open&&a.value.open(g)});const s=v=>{l.value=v;const g=v.split("-").map($=>Number($)),w=t.getComponentByIndex(g);w&&t.setCurComponent(w,v)},c=z([]),p=(v,g,w)=>{for(let $=0;$<g.length;$++){const N=g[$],q=d($,v);if(N.component==="Group"){const ie=[];w.push({label:()=>f(On,{component:N,index:q,contextmenus:()=>B(q),onclick:()=>s(q)}),key:q,icon:()=>f(jn,{name:"branch-one",component:N,index:q,contextmenus:()=>B(q),onclick:()=>s(q)}),children:p(q,N.subComponents||[],ie)})}else w.push({label:()=>f(On,{component:N,index:q,contextmenus:()=>B(q)}),key:q,icon:()=>f(jn,{name:`${o[N.group]}`,component:N,index:q,contextmenus:()=>B(q),onclick:()=>s(q)})})}return w},d=(v,g)=>g?`${g}-${v}`:v.toString(),h=v=>{const g=v.split("-").map($=>Number($)),w=tn(t.getComponentByIndex(g));w&&n.copy(w)},b=v=>Re(this,null,function*(){var w;s(v);const g=v.split("-").map($=>Number($));t.removeComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),y=v=>Re(this,null,function*(){var w;s(v);const g=v.split("-").map($=>Number($));t.upComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),C=v=>Re(this,null,function*(){var w;s(v);const g=v.split("-").map($=>Number($));t.downComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),m=v=>Re(this,null,function*(){var w;s(v);const g=v.split("-").map($=>Number($));t.topComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),S=v=>Re(this,null,function*(){var w;s(v);const g=v.split("-").map($=>Number($));t.bottomComponent(g[g.length-1],(w=t.curComponent)==null?void 0:w.parent)}),R=v=>{s(v);const g=v.split("-").map($=>Number($)),w=t.getComponentByIndex(g);w&&w.hiddenComponent()},E=v=>{s(v);const g=v.split("-").map($=>Number($)),w=t.getComponentByIndex(g);w&&w.showComponent()},P=v=>{const g=v.split("-").map(N=>Number(N)),w=t.getComponentByIndex(g),$=t.cutComponent(g[g.length-1],w==null?void 0:w.parent);$&&(cn(JSON.stringify($.toJson())),n.copy($))},M=v=>{const g=v.split("-").map($=>Number($)),w=t.getComponentByIndex(g);if(n.copyData){const $=tn(n.copyData);$.id=Ea(),t.insertComponent(g[g.length-1],$,w==null?void 0:w.parent)}},B=v=>{var w,$,N;const g=v.split("-").map(q=>parseInt(q));return[{text:"\u590D\u5236",subText:"Ctrl + C",handler:()=>h(v)},{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:()=>M(v)},{text:"\u526A\u5207",subText:"Ctrl + V",handler:()=>P(v)},{text:"\u62C6\u5206",subText:"Ctrl + V",disable:((w=t.getComponentByIndex(v.split("-").map(q=>Number(q))))==null?void 0:w.component)!=="Group",handler:()=>t.decompose()},{text:"\u5220\u9664",subText:"",handler:()=>b(v)},{divider:!0},{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>m(v),children:[{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>m(v)},{text:"\u4E0A\u79FB\u4E00\u5C42",handler:()=>y(v)}]},{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v),children:[{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v)},{text:"\u4E0B\u79FB\u4E00\u5C42",handler:()=>C(v)}]},{divider:!0},{text:"\u663E\u793A",disable:($=t.getComponentByIndex(g))==null?void 0:$.display,subText:"",handler:()=>E(v)},{text:"\u9690\u85CF",disable:!((N=t.getComponentByIndex(g))!=null&&N.display),subText:"",handler:()=>R(v)}]};return Te(()=>t.componentData,()=>{const v=t.componentData;c.value=[],c.value=p("",v,[])},{deep:!0,immediate:!0}),(v,g)=>(F(),ee("div",null,[x(r).length>0?(F(),K(x(fn),{key:0,options:c.value,"onUpdate:value":s},null,8,["options"])):(F(),K(x(Yr),{key:1,class:"placeholder"},{default:H(()=>[I(x(Zr),null,{default:H(()=>[I(x(Fa),{description:"\u753B\u5E03\u4E3A\u7A7A"})]),_:1})]),_:1}))]))}}),yi=ue("span",null,"\u7EC4\u4EF6",-1),_i=ue("span",null,"\u56FE\u5C42",-1),wi=V({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("components"),o=a=>{t("update:iscollapsed",!1),n.value=a},r=a=>{n.value=a};return(a,l)=>{const i=xt("IconPark");return e.iscollapsed?(F(),K(x(Et),{key:1,type:"line",animated:"","bar-width":48,"justify-content":"center","onUpdate:value":[o,l[4]||(l[4]=s=>n.value=s)],value:n.value},{default:H(()=>[n.value==="components"?(F(),K(x(Ze),{key:0,name:"components","display-directive":"show:lazy"},{tab:H(()=>[I(i,{name:"components",onClick:l[2]||(l[2]=s=>r("layer"))})]),default:H(()=>[I(Mn)]),_:1})):n.value==="layer"?(F(),K(x(Ze),{key:1,name:"layer","display-directive":"show:lazy"},{tab:H(()=>[I(i,{name:"layers",onClick:l[3]||(l[3]=s=>r("components"))})]),default:H(()=>[I(Hn)]),_:1})):Bt("",!0)]),_:1},8,["value"])):(F(),K(x(Et),{key:0,type:"line",animated:"","bar-width":100,"justify-content":"center",value:n.value,"onUpdate:value":[l[0]||(l[0]=s=>n.value=s),l[1]||(l[1]=s=>n.value=s)]},{default:H(()=>[I(x(Ze),{name:"components","display-directive":"show:lazy"},{tab:H(()=>[I(i,{name:"components"}),yi]),default:H(()=>[I(Mn)]),_:1}),I(x(Ze),{name:"layer","display-directive":"show:lazy"},{tab:H(()=>[I(i,{name:"layers"}),_i]),default:H(()=>[I(Hn)]),_:1})]),_:1},8,["value"]))}}}),Ci=[{label:"4K",value:"3840X2160"},{label:"2k",value:"2048X1080"},{label:"1080P",value:"1920X1080"},{label:"720P",value:"1366X768"},{label:"iPhoneXR",value:"414X896"},{label:"iPhoneSE",value:"375X667"},{label:"iPhone12Pro",value:"390X884"},{label:"GalaxyS8+",value:"360X740"},{label:"GalaxyS20Ultra+",value:"412X915"},{label:"iPadAir",value:"820X1180"},{label:"iPadMini",value:"768X1024"},{label:"SurfacePro7",value:"912X1368"},{label:"NestHub",value:"1024X600"},{label:"NestMax",value:"1028X800"}],Si=Ci,ki={class:"attr-list"},Ri=V({__name:"Canvas",setup(e){const t=L(()=>[{label:"\u672C\u8BBE\u5907",value:`${window.screen.width}X${window.screen.height}`},...Si]),n=Se(),o=z({width:n.canvasData.width,height:n.canvasData.height,scale:n.canvasData.scale,image:n.canvasData.image,color:n.canvasData.color||"#084860"}),r=()=>{n.setCanvasStyle(o.value)},a=z("\u672C\u8BBE\u5907"),l=[{key:"width",label:"\u5BBD\u5EA6",type:ye.NUMBER},{key:"height",label:"\u9AD8\u5EA6",type:ye.NUMBER},{key:"image",label:"\u80CC\u666F\u56FE",type:ye.TEXT},{key:"color",label:"\u80CC\u666F\u8272",type:ye.COLOR}],i=s=>{const c=s.split("X"),p=parseInt(c[0]),d=parseInt(c[1]);o.value.width=p,o.value.height=d};return(s,c)=>(F(),ee("div",ki,[I(x(ho),null,{default:H(()=>[I(x(hn),{size:"small",onSubmit:c[1]||(c[1]=un(()=>{},["prevent"])),"label-placement":"left","label-align":"left"},{default:H(()=>[I(x(It),{label:"\u5206\u8FA8\u7387"},{default:H(()=>[I(x(Lt),{value:a.value,"onUpdate:value":[c[0]||(c[0]=p=>a.value=p),i],placeholder:"\u9009\u62E9\u5206\u8FA8\u7387",options:x(t)},null,8,["value","options"])]),_:1}),(F(),ee($e,null,Ve(l,({key:p,label:d,type:h},b)=>I(x(It),{key:b,label:d},{default:H(()=>[h===x(ye).NUMBER?(F(),K(x(bn),{key:0,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r]},null,8,["value","onUpdate:value"])):h===x(ye).COLOR?(F(),K(x(Ft),{key:1,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r],modes:["hex","rgb","hsl"]},null,8,["value","onUpdate:value"])):(F(),K(x(yt),{key:2,value:o.value[p],"onUpdate:value":[y=>o.value[p]=y,r]},null,8,["value","onUpdate:value"]))]),_:2},1032,["label"])),64))]),_:1})]),_:1})]))}});const $i=Ce(Ri,[["__scopeId","data-v-2cd84705"]]),Di=[{label:"Arial",value:"Arial"},{label:"\u5FAE\u8F6F\u96C5\u9ED1",value:"Microsoft Yahei"},{label:"\u5B8B\u4F53",value:"SimSun"},{label:"\u9ED1\u4F53",value:"SimHei"},{label:"\u6977\u4F53",value:"KaiTi"},{label:"\u65B0\u5B8B\u4F53",value:"NSimSun"},{label:"\u4EFF\u5B8B",value:"FangSong"},{label:"\u82F9\u65B9",value:"PingFang SC"},{label:"\u534E\u6587\u9ED1\u4F53",value:"STHeiti"},{label:"\u534E\u6587\u6977\u4F53",value:"STKaiti"},{label:"\u534E\u6587\u5B8B\u4F53",value:"STSong"},{label:"\u534E\u6587\u4EFF\u5B8B",value:"STFangSong"},{label:"\u534E\u6587\u4E2D\u5B8B",value:"STZhongSong"},{label:"\u534E\u6587\u7425\u73C0",value:"STHupo"},{label:"\u534E\u6587\u65B0\u9B4F",value:"STXinwei"},{label:"\u534E\u6587\u96B6\u4E66",value:"STLiti"},{label:"\u534E\u6587\u884C\u6977",value:"STXingkai"},{label:"\u51AC\u9752\u9ED1\u4F53",value:"Hiragino Sans GB"},{label:"\u5170\u4EAD\u9ED1",value:"Lantinghei SC"},{label:"\u504F\u504F\u4F53",value:"Hanzipen SC"},{label:"\u624B\u672D\u4F53",value:"Hannotate SC"},{label:"\u5B8B\u4F53",value:"Songti SC"},{label:"\u5A03\u5A03\u4F53",value:"Wawati SC"},{label:"\u884C\u6977",value:"Xingkai SC"},{label:"\u5706\u4F53",value:"Yuanti SC"},{label:"\u534E\u6587\u7EC6\u9ED1",value:"STXihei"},{label:"\u5E7C\u5706",value:"YouYuan"},{label:"\u96B6\u4E66",value:"LiSu"},{label:"LED",value:"LED"},{label:"LCD",value:"LCD"}],Bi=[{label:"100 Thin",value:100},{label:"200 ExtraThin",value:200},{label:"300 Light",value:300},{label:"400 Normal",value:400},{label:"500 Medium",value:500},{label:"600 Semi Bold",value:600},{label:"700 Bold",value:700},{label:"Extra Bold",value:800},{label:"Black",value:900}],zi=V({__name:"FontStyle",props:{value:{default:""}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),r=Be(Di),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,i)=>(F(),K(x(Lt),{clearable:"",value:o.value,"onUpdate:value":[i[0]||(i[0]=s=>o.value=s),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u4F53",options:r},null,8,["value","options"]))}}),Ii=V({__name:"FontWeight",props:{value:{default:400}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),r=Be(Bi),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,i)=>(F(),K(x(Lt),{clearable:"",value:o.value,"onUpdate:value":[i[0]||(i[0]=s=>o.value=s),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u91CD",options:r},null,8,["value","options"]))}}),Fi={class:"linear-gradient"},Ei=V({__name:"LinearGradient",props:{value:{default:()=>({angle:0,color1:"",color2:""})}},emits:["update:value"],setup(e,{emit:t}){const n=e,o=z({angle:n.value.angle||0,color1:n.value.color1||"",color2:n.value.color2||""}),r=(a,l)=>{o.value[a]=l,t("update:value",o.value)};return(a,l)=>(F(),ee("div",Fi,[I(x(bn),{modelValue:e.value.angle,"onUpdate:value":l[0]||(l[0]=i=>r("angle",i)),controls:!0,min:0,max:360,step:1},null,8,["modelValue"]),I(x(Ft),{value:e.value.color1,"onUpdate:value":l[1]||(l[1]=i=>r("color1",i)),swatches:x(nn)},null,8,["value","swatches"]),I(x(Ft),{value:e.value.color2,"onUpdate:value":l[2]||(l[2]=i=>r("color2",i)),swatches:x(nn)},null,8,["value","swatches"])]))}}),Ti=V({props:{args:{type:Object,default:()=>{}},component:{type:Object,default:()=>{}},value:{type:Object}},emits:["update:value","change"],setup(e,{emit:t}){const n=o=>{t("update:value",o),t("change",o)};return()=>[f(e.component,Ut(_t({},e.args),{value:e.value,onChange:n}))]}});function qt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Pa(e)}const vo=V({components:{FontStyle:zi,FontWeight:Ii,LinearGradient:Ei,NSwitch:Ta},props:{name:{type:String,required:!0},uid:{type:String,required:!0},ukey:{type:String,required:!0},children:{type:Array,required:!0},data:{type:Object,required:!0}},emits:["change"],setup(e,{emit:t}){const n=Be(e.data),o=(a,l)=>{t("change",l,a)},r=a=>{var s;let l;const i=((s=a.componentOptions)==null?void 0:s.options)||[];switch(a.type){case ye.COLOR:return I(Ft,{value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,swatches:nn,modes:["hex","rgb","hsl"],onUpdateValue:d=>o(d,a.prop)},null);case ye.SELECT:return I(Lt,{value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,placeholder:a.label,onUpdateValue:d=>o(d,a.prop),options:i},null);case ye.RADIO:return I(Wr,{value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,placeholder:a.label,onUpdateValue:d=>o(d,a.prop)},qt(l=i.map(d=>I(Mr,{label:d.value,key:d.value},{default:()=>[d.label]})))?l:{default:()=>[l]});case ye.NUMBER:const c="max"in a.componentOptions?a.componentOptions.max:9999999999,p="min"in a.componentOptions?a.componentOptions.min:-9999999999;return I(bn,{value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,onUpdateValue:d=>o(d,a.prop),max:c,min:p},null);case ye.SWITCH:case ye.FONT_STYLE:case ye.FONT_WEIGHT:case ye.LINEAR_GRADIENT:return f(xt(a.type),{value:n[a.prop],["onUpdate:value"]:d=>{n[a.prop]=d,o(d,a.prop)}});case ye.CUSTOM:return I(Ti,{value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,onUpdateValue:d=>o(d,a.prop),component:a.componentOptions.componentType,args:a.componentOptions.args},null);default:return I(yt,{clearable:!0,value:n[a.prop],"onUpdate:value":d=>n[a.prop]=d,onUpdateValue:d=>o(d,a.prop),readonly:a.componentOptions.editable===!1,disabled:a.componentOptions.disabled},null)}};return()=>{let a;return I(hn,{size:"small",labelPlacement:"left",labelAlign:"left"},qt(a=e.children.map(l=>{let i;return I(It,{key:`${e.ukey}${l.prop}`,label:l.label},qt(i=r(l))?i:{default:()=>[i]})}))?a:{default:()=>[a]})}}}),Pi={class:"attr-list"},Ai=V({__name:"StyleList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Be({}),r=L(()=>t.curComponent?t.curComponent.styleFormValue:{}),a=ln((s,c)=>{if(t.curComponent)if(["top","left","width","height","rotate"].includes(s)){const d=t.curComponent.parent;n.syncComponentLoction({[s]:c},d,!0),d&&n.resizeAutoComponent(d)}else n.setCurComponentStyle(s,c)},300),l=ln(s=>{const c=Aa(s,o);c&&Object.keys(c).forEach(p=>{o[p]=c[p]})},200),i=()=>{t.curComponent&&(to(o),l(t.curComponent.style))};return Te(()=>[t.curComponent.id,t.curComponent.positionStyle],()=>{t.curComponent&&t.curComponent.id&&i()},{immediate:!0,deep:!0}),(s,c)=>(F(),ee("div",Pi,[I(x(co),{accordion:""},{default:H(()=>[(F(!0),ee($e,null,Ve(x(r),({label:p,prop:d,children:h})=>(F(),K(x(uo),{key:`${e.curComponent.id}${d}`,title:p,name:d},{default:H(()=>[I(x(vo),{children:h,data:o,onChange:x(a),name:p,uid:d,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Ni=Ce(Ai,[["__scopeId","data-v-050459f8"]]),Vi={class:"attr-list"},Li=V({__name:"AttrList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Be({common:{name:t.curComponent.name,component:t.curComponent.component,id:t.curComponent.id}}),r=L(()=>t.curComponent?t.curComponent.propFromValue:[]),a=(i,s,c)=>{n.setCurComponentPropValue(i,s,c)},l=()=>{to(o,["common"]),o.common.name=t.curComponent.name,o.common.component=t.curComponent.component,o.common.id=t.curComponent.id,t.curComponent&&t.curComponent.propValue&&Object.keys(t.curComponent.propValue).forEach(i=>{o[i]=t.curComponent.propValue[i]})};return Te(()=>t.curComponent.id,()=>{l()},{immediate:!0}),(i,s)=>(F(),ee("div",Vi,[I(x(co),{accordion:""},{default:H(()=>[(F(!0),ee($e,null,Ve(x(r),({label:c,prop:p,children:d})=>(F(),K(x(uo),{key:`${e.curComponent.id}${p}`,title:c,name:p},{default:H(()=>[I(x(vo),{children:d,data:o[p],onChange:(h,b)=>a(p,h,b),name:c,uid:p,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Ui=Ce(Li,[["__scopeId","data-v-010e5f45"]]),Mi={key:0},Oi={key:1},ji=V({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("attr"),o=Se(),r=L(()=>o.curComponent),a=L(()=>o.curComponent?[{label:"\u6837\u5F0F",key:"4",icon:()=>f(Ue,{name:"text-style",onClick:()=>l("style")})},{label:"\u5C5E\u6027",key:"2",icon:()=>f(Ue,{name:"internal-data",onClick:()=>l("attr")})}]:[{label:"\u753B\u5E03",key:"1",icon:()=>f(Ue,{name:"page"})}]),l=i=>{t("update:iscollapsed",!1),n.value=i};return(i,s)=>e.iscollapsed?(F(),ee("div",Oi,[I(x(fn),{options:x(a)},null,8,["options"])])):(F(),ee("div",Mi,[x(r)?(F(),K(x(Et),{key:0,type:"line",animated:"","justify-content":"center",value:n.value,"onUpdate:value":[s[0]||(s[0]=c=>n.value=c),s[1]||(s[1]=c=>n.value=c)]},{default:H(()=>[I(x(Ze),{name:"style","display-directive":"show:lazy"},{tab:H(()=>[I(x(Ue),{name:"text-style"}),me(ue("span",null,"\u6837\u5F0F",512),[[De,!e.iscollapsed]])]),default:H(()=>[I(x(Ni),{curComponent:x(r)},null,8,["curComponent"])]),_:1}),I(x(Ze),{name:"attr","display-directive":"show:lazy"},{tab:H(()=>[I(x(Ue),{name:"internal-data"}),me(ue("span",null,"\u5C5E\u6027",512),[[De,!e.iscollapsed]])]),default:H(()=>[I(x(Ui),{curComponent:x(r)},null,8,["curComponent"])]),_:1})]),_:1},8,["value"])):(F(),K(x(Et),{key:1,type:"line",animated:"","justify-content":"center"},{default:H(()=>[I(x(Ze),{name:"canvas","display-directive":"show:lazy"},{tab:H(()=>[I(x(Ue),{name:"page"}),me(ue("span",null,"\u753B\u5E03",512),[[De,!e.iscollapsed]])]),default:H(()=>[I($i)]),_:1})]),_:1}))]))}}),Hi=V({__name:"DesignerPage",setup(e){const t=Se(),n=z(!1),o=z(!1),r=Qn();Nt(()=>Re(this,null,function*(){const p=r.params.index;p&&(yield a(p))}));const a=p=>Re(this,null,function*(){const d=yield Oa(p);!d.data||t.setLayoutData(d.data)}),l=z(0),i=z(0),s=L(()=>({width:l.value+"px",height:i.value+"px"})),c=p=>{const d=p[0],{width:h,height:b}=d.contentRect;l.value=h,i.value=b};return Gn(()=>{t.clearCanvas()}),(p,d)=>{const h=ot("resize");return F(),K(x(Mt),{class:"home"},{default:H(()=>[I(x(Na),{class:"header"},{default:H(()=>[I(x(pi))]),_:1}),I(x(Mt),{"has-sider":"",class:"main"},{default:H(()=>[I(x(Rn),{class:"left",width:"200",collapsed:n.value,"native-scrollbar":!1,bordered:"","collapse-mode":"width","show-trigger":"",onCollapse:d[2]||(d[2]=()=>n.value=!0),onExpand:d[3]||(d[3]=()=>n.value=!1)},{default:H(()=>[I(x(wi),{iscollapsed:n.value,"onUpdate:iscollapsed":[d[0]||(d[0]=b=>n.value=b),d[1]||(d[1]=b=>n.value=b)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"]),I(x(Mt),{"has-sider":"","sider-placement":"right"},{default:H(()=>[me((F(),K(x(Va),{class:"content"},{default:H(()=>[I(x(ho),{"x-scrollable":"",style:Ne(x(s))},{default:H(()=>[I(Fl)]),_:1},8,["style"])]),_:1})),[[h,c]]),I(x(Rn),{class:"right",width:"240",collapsed:o.value,"native-scrollbar":!1,bordered:"","collapsed-width":35,"collapse-mode":"width","show-trigger":"arrow-circle",onCollapse:d[6]||(d[6]=()=>o.value=!0),onExpand:d[7]||(d[7]=()=>o.value=!1)},{default:H(()=>[I(x(ji),{iscollapsed:o.value,"onUpdate:iscollapsed":[d[4]||(d[4]=b=>o.value=b),d[5]||(d[5]=b=>o.value=b)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"])]),_:1})]),_:1})]),_:1})}}});const Ji=Ce(Hi,[["__scopeId","data-v-0ebe2819"]]);export{Ji as default};
