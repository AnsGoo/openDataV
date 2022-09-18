var Lo=Object.defineProperty,Uo=Object.defineProperties;var Mo=Object.getOwnPropertyDescriptors;var yn=Object.getOwnPropertySymbols;var Oo=Object.prototype.hasOwnProperty,jo=Object.prototype.propertyIsEnumerable;var _n=(e,t,n)=>t in e?Lo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ct=(e,t)=>{for(var n in t||(t={}))Oo.call(t,n)&&_n(e,n,t[n]);if(yn)for(var n of yn(t))jo.call(t,n)&&_n(e,n,t[n]);return e},Ut=(e,t)=>Uo(e,Mo(t));var $e=(e,t,n)=>new Promise((o,r)=>{var a=c=>{try{s(n.next(c))}catch(i){r(i)}},l=c=>{try{s(n.throw(c))}catch(i){r(i)}},s=c=>c.done?o(c.value):Promise.resolve(c.value).then(a,l);s((n=n.apply(e,t)).next())});import{d as N,r as z,a1 as Ho,a2 as Wo,a3 as m,a4 as wn,a5 as Xo,a6 as Dt,a7 as Go,a8 as _,a9 as U,aa as j,ab as ze,ac as qo,ad as je,ae as Pe,af as He,ag as Je,ah as Ve,ai as ct,aj as Qe,ak as Xe,al as ut,i as L,am as Pt,an as pt,ao as un,ap as gt,aq as Yt,ar as Zt,as as Jt,at as Ko,au as Yo,av as K,aw as At,ax as qn,ay as ve,az as Zo,aA as Tt,aB as we,aC as nt,T as Ae,aD as me,aE as ft,aF as Jo,aG as Qt,aH as Qo,aI as ea,aJ as ta,aK as na,aL as oa,w as be,aM as aa,aN as le,aO as et,aP as xt,aQ as ra,aR as la,aS as ht,aT as ia,W as Be,aU as sa,aV as ca,aW as Ee,aX as Kn,aY as Bt,aZ as da,a_ as yt,a$ as Yn,b0 as _t,b1 as dt,b2 as ua,b3 as pa,b4 as fa,b5 as en,b6 as ha,b7 as ma,b8 as ba,b9 as Cn,ba as va,bb as Sn,bc as kn,bd as ga,be as xa,F as Se,bf as ya,bg as _a,bh as wa,bi as Ca,bj as Sa,bk as Rn,bl as ka,bm as Ra,a as Nt,f as rt,o as D,c as Q,b as ue,t as ot,l as Le,u as g,_ as Ce,bn as De,U as F,e as Te,A as q,n as Vt,bo as $a,q as ke,bp as tn,bq as $n,v as Zn,H as Dn,a0 as Da,h as Jn,E as M,D as Ba,br as za,m as tt,bs as pn,K as nn,bt as Ia,bu as Qn,Q as Ne,bv as Fa,bw as Ea,bx as mt,by as eo,bz as to,P as no,bA as oo,z as fn,bB as Pa,X as Me,bC as Aa,bD as Ta,Z as Na,Y as ao,bE as ro,bF as hn,bG as Va,O as on,bH as La,bI as ye,bJ as Lt,bK as an,bL as Ua,bM as Ma,bN as Oa,bO as lo,bP as ja,bQ as Ha,bR as Bn,bS as Mt,bT as Wa}from"./index.fa9c529b.js";import{u as io,a as so,S as Xa}from"./Shape.082d44e5.js";import{e as Fe,u as zt}from"./useEventBus.dd7cf656.js";import{u as Ga,s as qa,g as Ka}from"./pages.35c1f7e3.js";import{N as at,a as mn,b as It}from"./FormItem.5b87c6b8.js";import"./index.2a653e98.js";function co(e,t,n){t/=100,n/=100;const o=t*Math.min(n,1-n)+n;return[e,o?(2-2*n/o)*100:0,o*100]}function $t(e,t,n){t/=100,n/=100;const o=n-n*t/2,r=Math.min(o,1-o);return[e,r?(n-o)/r*100:0,o*100]}function Oe(e,t,n){t/=100,n/=100;let o=(r,a=(r+e/60)%6)=>n-n*t*Math.max(Math.min(a,4-a,1),0);return[o(5)*255,o(3)*255,o(1)*255]}function rn(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(a<0?a+6:a),o&&r/o*100,o*100]}function ln(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),r=o-Math.min(e,t,n),a=1-Math.abs(o+o-r-1),l=r&&(o==e?(t-n)/r:o==t?2+(n-e)/r:4+(e-t)/r);return[60*(l<0?l+6:l),a?r/a*100:0,(o+o-r)*50]}function sn(e,t,n){t/=100,n/=100;let o=t*Math.min(n,1-n),r=(a,l=(a+e/30)%12)=>n-o*Math.max(Math.min(l-3,9-l,1),-1);return[r(0)*255,r(8)*255,r(4)*255]}function bn(e,t="default",n=[]){const r=e.$slots[t];return r===void 0?n:r()}function zn(e,t="default",n=[]){const{children:o}=e;if(o!==null&&typeof o=="object"&&!Array.isArray(o)){const r=o[t];if(typeof r=="function")return r()}return n}const Ya=wn(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[wn("&::-webkit-scrollbar",{width:0,height:0})]),Za=N({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=z(null);function t(r){!(r.currentTarget.offsetWidth<r.currentTarget.scrollWidth)||r.deltaY===0||(r.currentTarget.scrollLeft+=r.deltaY+r.deltaX,r.preventDefault())}const n=Ho();return Ya.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Wo,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...r){var a;(a=e.value)===null||a===void 0||a.scrollTo(...r)}})},render(){return m("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ja=/\s/;function Qa(e){for(var t=e.length;t--&&Ja.test(e.charAt(t)););return t}var er=/^\s+/;function tr(e){return e&&e.slice(0,Qa(e)+1).replace(er,"")}var In=0/0,nr=/^[-+]0x[0-9a-f]+$/i,or=/^0b[01]+$/i,ar=/^0o[0-7]+$/i,rr=parseInt;function Fn(e){if(typeof e=="number")return e;if(Xo(e))return In;if(Dt(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=Dt(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=tr(e);var n=or.test(e);return n||ar.test(e)?rr(e.slice(2),n?2:8):nr.test(e)?In:+e}var lr=function(){return Go.Date.now()};const Ot=lr;var ir="Expected a function",sr=Math.max,cr=Math.min;function cn(e,t,n){var o,r,a,l,s,c,i=0,f=!1,u=!1,h=!0;if(typeof e!="function")throw new TypeError(ir);t=Fn(t)||0,Dt(n)&&(f=!!n.leading,u="maxWait"in n,a=u?sr(Fn(n.maxWait)||0,t):a,h="trailing"in n?!!n.trailing:h);function p(I){var v=o,y=r;return o=r=void 0,i=I,l=e.apply(y,v),l}function x(I){return i=I,s=setTimeout(S,t),f?p(I):l}function C(I){var v=I-c,y=I-i,w=t-v;return u?cr(w,a-y):w}function b(I){var v=I-c,y=I-i;return c===void 0||v>=t||v<0||u&&y>=a}function S(){var I=Ot();if(b(I))return k(I);s=setTimeout(S,C(I))}function k(I){return s=void 0,h&&o?p(I):(o=r=void 0,l)}function P(){s!==void 0&&clearTimeout(s),i=0,o=c=r=s=void 0}function E(){return s===void 0?l:k(Ot())}function O(){var I=Ot(),v=b(I);if(o=arguments,r=this,c=I,v){if(s===void 0)return x(c);if(u)return clearTimeout(s),s=setTimeout(S,t),p(c)}return s===void 0&&(s=setTimeout(S,t)),l}return O.cancel=P,O.flush=E,O}var dr="Expected a function";function jt(e,t,n){var o=!0,r=!0;if(typeof e!="function")throw new TypeError(dr);return Dt(n)&&(o="leading"in n?!!n.leading:o,r="trailing"in n?!!n.trailing:r),cn(e,t,{leading:o,maxWait:t,trailing:r})}const uo=N({name:"Add",render(){return m("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},m("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),ur=N({name:"ChevronLeft",render(){return m("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},m("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),pr=N({name:"Remove",render(){return m("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},m("line",{x1:"400",y1:"256",x2:"112",y2:"256",style:`
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `}))}}),fr=_("input-group",`
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
 `,[j("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),U("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[j("state-border, border",`
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
 `),j("box-shadow, border, state-border",`
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
 `),j("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),hr={},mr=N({name:"InputGroup",props:hr,setup(e){const{mergedClsPrefixRef:t}=ze(e);return qo("-input-group",fr,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return m("div",{class:`${e}-input-group`},this.$slots)}});function br(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function wt(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function vr(e){return e=Math.round(e),e>=360?359:e<0?0:e}function gr(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const xr={rgb:{hex(e){return je(Pe(e))},hsl(e){const[t,n,o,r]=Pe(e);return He([...ln(t,n,o),r])},hsv(e){const[t,n,o,r]=Pe(e);return Je([...rn(t,n,o),r])}},hex:{rgb(e){return Ve(Pe(e))},hsl(e){const[t,n,o,r]=Pe(e);return He([...ln(t,n,o),r])},hsv(e){const[t,n,o,r]=Pe(e);return Je([...rn(t,n,o),r])}},hsl:{hex(e){const[t,n,o,r]=ct(e);return je([...sn(t,n,o),r])},rgb(e){const[t,n,o,r]=ct(e);return Ve([...sn(t,n,o),r])},hsv(e){const[t,n,o,r]=ct(e);return Je([...co(t,n,o),r])}},hsv:{hex(e){const[t,n,o,r]=Qe(e);return je([...Oe(t,n,o),r])},rgb(e){const[t,n,o,r]=Qe(e);return Ve([...Oe(t,n,o),r])},hsl(e){const[t,n,o,r]=Qe(e);return He([...$t(t,n,o),r])}}};function po(e,t,n){return n=n||wt(e),n?n===t?e:xr[n][t](e):null}const st="12px",yr=12,Ke="6px",_r=6,wr="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",Cr=N({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:s,left:c}=l.getBoundingClientRect(),i=vr((a.clientX-c-_r)/(s-yr)*360);e.onUpdateHue(i)}function r(){var a;ut("mousemove",document,o),ut("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,handleMouseDown:n}},render(){const{clsPrefix:e}=this;return m("div",{class:`${e}-color-picker-slider`,style:{height:st,borderRadius:Ke}},m("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:wr,height:st,borderRadius:Ke,position:"relative"},onMousedown:this.handleMouseDown},m("div",{style:{position:"absolute",left:Ke,right:Ke,top:0,bottom:0}},m("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Ke})`,borderRadius:Ke,width:st,height:st}},m("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Ke,width:st,height:st}})))))}}),vt="12px",Sr=12,Ye="6px",kr=N({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||!e.rgba||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:s,left:c}=l.getBoundingClientRect(),i=(a.clientX-c)/(s-Sr);e.onUpdateAlpha(gr(i))}function r(){var a;ut("mousemove",document,o),ut("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{railRef:t,railBackgroundImage:L(()=>{const{rgba:a}=e;return a?`linear-gradient(to right, rgba(${a[0]}, ${a[1]}, ${a[2]}, 0) 0%, rgba(${a[0]}, ${a[1]}, ${a[2]}, 1) 100%)`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return m("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:vt,borderRadius:Ye},onMousedown:this.handleMouseDown},m("div",{style:{borderRadius:Ye,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},m("div",{class:`${e}-color-picker-checkboard`}),m("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&m("div",{style:{position:"absolute",left:Ye,right:Ye,top:0,bottom:0}},m("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Ye})`,borderRadius:Ye,width:vt,height:vt}},m("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Ve(this.rgba),borderRadius:Ye,width:vt,height:vt}}))))}}),St="12px",kt="6px",Rr=N({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(a){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,r),o(a))}function o(a){const{value:l}=t;if(!l)return;const{width:s,height:c,left:i,bottom:f}=l.getBoundingClientRect(),u=(f-a.clientY)/c,h=(a.clientX-i)/s,p=100*(h>1?1:h<0?0:h),x=100*(u>1?1:u<0?0:u);e.onUpdateSV(p,x)}function r(){var a;ut("mousemove",document,o),ut("mouseup",document,r),(a=e.onComplete)===null||a===void 0||a.call(e)}return{palleteRef:t,handleColor:L(()=>{const{rgba:a}=e;return a?`rgb(${a[0]}, ${a[1]}, ${a[2]})`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return m("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},m("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),m("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&m("div",{class:`${e}-color-picker-handle`,style:{width:St,height:St,borderRadius:kt,left:`calc(${this.displayedSv[0]}% - ${kt})`,bottom:`calc(${this.displayedSv[1]}% - ${kt})`}},m("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:kt,width:St,height:St}})))}}),vn=Pt("n-color-picker");function $r(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function Dr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function Br(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function zr(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function Ir(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const Fr={paddingSmall:"0 4px"},En=N({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=z(""),{themeRef:n}=pt(vn,null);un(()=>{t.value=o()});function o(){const{value:l}=e;if(l===null)return"";const{label:s}=e;return s==="HEX"?l:s==="A"?`${Math.floor(l*100)}%`:String(Math.floor(l))}function r(l){t.value=l}function a(l){let s,c;switch(e.label){case"HEX":c=zr(l),c&&e.onUpdateValue(l),t.value=o();break;case"H":s=Dr(l),s===!1?t.value=o():e.onUpdateValue(s);break;case"S":case"L":case"V":s=Br(l),s===!1?t.value=o():e.onUpdateValue(s);break;case"A":s=Ir(l),s===!1?t.value=o():e.onUpdateValue(s);break;case"R":case"G":case"B":s=$r(l),s===!1?t.value=o():e.onUpdateValue(s);break}}return{mergedTheme:n,inputValue:t,handleInputChange:a,handleInputUpdateValue:r}},render(){const{mergedTheme:e}=this;return m(at,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:Fr,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),Er=N({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){const{showAlpha:o}=e;if(e.mode==="hex"){e.onUpdateValue((o?je:gt)(n));return}let r;switch(e.valueArr===null?r=[0,0,0,0]:r=Array.from(e.valueArr),e.mode){case"hsv":r[t]=n,e.onUpdateValue((o?Je:Jt)(r));break;case"rgb":r[t]=n,e.onUpdateValue((o?Ve:Zt)(r));break;case"hsl":r[t]=n,e.onUpdateValue((o?He:Yt)(r));break}}}},render(){const{clsPrefix:e,modes:t}=this;return m("div",{class:`${e}-color-picker-input`},m("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),m(mr,null,{default:()=>{const{mode:n,valueArr:o,showAlpha:r}=this;if(n==="hex"){let a=null;try{a=o===null?null:(r?je:gt)(o)}catch(l){}return m(En,{label:"HEX",showAlpha:r,value:a,onUpdateValue:l=>{this.handleUnitUpdateValue(0,l)}})}return(n+(r?"a":"")).split("").map((a,l)=>m(En,{label:a.toUpperCase(),value:o===null?null:o[l],onUpdateValue:s=>{this.handleUnitUpdateValue(l,s)}}))}}))}}),Pr=N({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:n}=pt(vn,null);return()=>{const{hsla:o,value:r,clsPrefix:a,onClick:l,disabled:s}=e,c=t.label||n.value;return m("div",{class:[`${a}-color-picker-trigger`,s&&`${a}-color-picker-trigger--disabled`],onClick:s?void 0:l},m("div",{class:`${a}-color-picker-trigger__fill`},m("div",{class:`${a}-color-picker-checkboard`}),m("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:o?He(o):""}}),r&&o?m("div",{class:`${a}-color-picker-trigger__value`,style:{color:o[2]>50||o[3]<.5?"black":"white"}},c?c(r):r):null))}}});function Ar(e,t){if(t==="hsv"){const[n,o,r,a]=Qe(e);return Ve([...Oe(n,o,r),a])}return e}function Tr(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const Nr=N({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=L(()=>e.swatches.map(a=>{const l=wt(a);return{value:a,mode:l,legalValue:Ar(a,l)}}));function n(a){const{mode:l}=e;let{value:s,mode:c}=a;return c||(c="hex",/^[a-zA-Z]+$/.test(s)?s=Tr(s):(Ko("color-picker",`color ${s} in swatches is invalid.`),s="#000000")),c===l?s:po(s,l,c)}function o(a){e.onUpdateColor(n(a))}function r(a,l){a.key==="Enter"&&o(l)}return{parsedSwatchesRef:t,handleSwatchSelect:o,handleSwatchKeyDown:r}},render(){const{clsPrefix:e}=this;return m("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>m("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>this.handleSwatchSelect(t),onKeydown:n=>this.handleSwatchKeyDown(n,t)},m("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),Vr=N({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=wt(e);return Boolean(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(n){var o;const r=n.target.value;(o=e.onUpdateColor)===null||o===void 0||o.call(e,po(r.toUpperCase(),e.mode,"hex")),n.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return m("div",{class:`${e}-color-picker-preview__preview`},m("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),m("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Lr=U([_("color-picker",`
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
 `,[Yo(),_("input",`
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
 `,[j("image",`
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
 `,[j("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),_("color-picker-pallete",`
 height: 180px;
 position: relative;
 margin-bottom: 8px;
 cursor: crosshair;
 `,[j("layer",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[K("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),_("color-picker-preview",`
 display: flex;
 `,[j("sliders",`
 flex: 1 0 auto;
 `),j("preview",`
 position: relative;
 height: 30px;
 width: 30px;
 margin: 0 0 8px 6px;
 border-radius: 50%;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 overflow: hidden;
 `),j("fill",`
 display: block;
 width: 30px;
 height: 30px;
 `),j("input",`
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
 `),j("mode",`
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
 `,[j("value",`
 white-space: nowrap;
 position: relative;
 `),j("fill",`
 border-radius: var(--n-border-radius);
 position: absolute;
 display: flex;
 align-items: center;
 justify-content: center;
 left: 4px;
 right: 4px;
 top: 4px;
 bottom: 4px;
 `),K("disabled","cursor: not-allowed"),_("color-picker-checkboard",`
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
 `,[j("fill",`
 position: relative;
 width: 100%;
 height: 100%;
 border-radius: 3px;
 box-shadow: rgba(0, 0, 0, .15) 0px 0px 0px 1px inset;
 cursor: pointer;
 `),U("&:focus",`
 outline: none;
 `,[j("fill",[U("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Ur=Object.assign(Object.assign({},ve.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:Qt.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ft=N({name:"ColorPicker",props:Ur,setup(e,{slots:t}){const n=z(null);let o=null;const r=At(e),{mergedSizeRef:a,mergedDisabledRef:l}=r,{localeRef:s}=qn("global"),{mergedClsPrefixRef:c,namespaceRef:i,inlineThemeDisabled:f}=ze(e),u=ve("ColorPicker","-color-picker",Lr,Zo,e,c);Tt(vn,{themeRef:u,renderLabelRef:we(e,"renderLabel"),colorPickerSlots:t});const h=z(e.defaultShow),p=nt(we(e,"show"),h);function x(d){const{onUpdateShow:R,"onUpdate:show":T}=e;R&&le(R,d),T&&le(T,d),h.value=d}const{defaultValue:C}=e,b=z(C===void 0?br(e.modes,e.showAlpha):C),S=nt(we(e,"value"),b),k=z([S.value]),P=z(0),E=L(()=>wt(S.value)),{modes:O}=e,I=z(wt(S.value)||O[0]||"rgb");function v(){const{modes:d}=e,{value:R}=I,T=d.findIndex(X=>X===R);~T?I.value=d[(T+1)%d.length]:I.value="rgb"}let y,w,$,V,G,ie,se,H;const Z=L(()=>{const{value:d}=S;if(!d)return null;switch(E.value){case"hsv":return Qe(d);case"hsl":return[y,w,$,H]=ct(d),[...co(y,w,$),H];case"rgb":case"hex":return[G,ie,se,H]=Pe(d),[...rn(G,ie,se),H]}}),W=L(()=>{const{value:d}=S;if(!d)return null;switch(E.value){case"rgb":case"hex":return Pe(d);case"hsv":return[y,w,V,H]=Qe(d),[...Oe(y,w,V),H];case"hsl":return[y,w,$,H]=ct(d),[...sn(y,w,$),H]}}),Y=L(()=>{const{value:d}=S;if(!d)return null;switch(E.value){case"hsl":return ct(d);case"hsv":return[y,w,V,H]=Qe(d),[...$t(y,w,V),H];case"rgb":case"hex":return[G,ie,se,H]=Pe(d),[...ln(G,ie,se),H]}}),pe=L(()=>{switch(I.value){case"rgb":case"hex":return W.value;case"hsv":return Z.value;case"hsl":return Y.value}}),fe=z(0),ge=z(1),oe=z([0,0]);function _e(d,R){const{value:T}=Z,X=fe.value,te=T?T[3]:1;oe.value=[d,R];const{showAlpha:ee}=e;switch(I.value){case"hsv":ne((ee?Je:Jt)([X,d,R,te]),"cursor");break;case"hsl":ne((ee?He:Yt)([...$t(X,d,R),te]),"cursor");break;case"rgb":ne((ee?Ve:Zt)([...Oe(X,d,R),te]),"cursor");break;case"hex":ne((ee?je:gt)([...Oe(X,d,R),te]),"cursor");break}}function ce(d){fe.value=d;const{value:R}=Z;if(!R)return;const[,T,X,te]=R,{showAlpha:ee}=e;switch(I.value){case"hsv":ne((ee?Je:Jt)([d,T,X,te]),"cursor");break;case"rgb":ne((ee?Ve:Zt)([...Oe(d,T,X),te]),"cursor");break;case"hex":ne((ee?je:gt)([...Oe(d,T,X),te]),"cursor");break;case"hsl":ne((ee?He:Yt)([...$t(d,T,X),te]),"cursor");break}}function ae(d){switch(I.value){case"hsv":[y,w,V]=Z.value,ne(Je([y,w,V,d]),"cursor");break;case"rgb":[G,ie,se]=W.value,ne(Ve([G,ie,se,d]),"cursor");break;case"hex":[G,ie,se]=W.value,ne(je([G,ie,se,d]),"cursor");break;case"hsl":[y,w,$]=Y.value,ne(He([y,w,$,d]),"cursor");break}ge.value=d}function ne(d,R){R==="cursor"?o=d:o=null;const{nTriggerFormChange:T,nTriggerFormInput:X}=r,{onUpdateValue:te,"onUpdate:value":ee}=e;te&&le(te,d),ee&&le(ee,d),T(),X(),b.value=d}function xe(d){ne(d,"input"),xt(Re)}function Re(d=!0){const{value:R}=S;if(R){const{nTriggerFormChange:T,nTriggerFormInput:X}=r,{onComplete:te}=e;te&&te(R);const{value:ee}=k,{value:de}=P;d&&(ee.splice(de+1,ee.length,R),P.value=de+1),T(),X()}}function Ue(){const{value:d}=P;d-1<0||(ne(k.value[d-1],"input"),Re(!1),P.value=d-1)}function lt(){const{value:d}=P;d<0||d+1>=k.value.length||(ne(k.value[d+1],"input"),Re(!1),P.value=d+1)}function bt(){const{value:d}=S,{onConfirm:R}=e;R&&R(d),x(!1)}const it=L(()=>P.value>=1),Ie=L(()=>{const{value:d}=k;return d.length>1&&P.value<d.length-1});Ae(p,d=>{d||(k.value=[S.value],P.value=0)}),un(()=>{if(!(o&&o===S.value)){const{value:d}=Z;d&&(fe.value=d[0],ge.value=d[3],oe.value=[d[1],d[2]])}o=null});const B=L(()=>{const{value:d}=a,{common:{cubicBezierEaseInOut:R},self:{textColor:T,color:X,panelFontSize:te,boxShadow:ee,border:de,borderRadius:re,dividerColor:he,[me("height",d)]:Ge,[me("fontSize",d)]:qe}}=u.value;return{"--n-bezier":R,"--n-text-color":T,"--n-color":X,"--n-panel-font-size":te,"--n-font-size":qe,"--n-box-shadow":ee,"--n-border":de,"--n-border-radius":re,"--n-height":Ge,"--n-divider-color":he}}),A=f?ft("color-picker",L(()=>a.value[0]),B,e):void 0;function J(){var d;const{value:R}=W,{value:T}=fe,{internalActions:X,modes:te,actions:ee}=e,{value:de}=u,{value:re}=c;return m("div",{class:[`${re}-color-picker-panel`,A==null?void 0:A.themeClass.value],onDragstart:he=>{he.preventDefault()},style:f?void 0:B.value},m("div",{class:`${re}-color-picker-control`},m(Rr,{clsPrefix:re,rgba:R,displayedHue:T,displayedSv:oe.value,onUpdateSV:_e,onComplete:Re}),m("div",{class:`${re}-color-picker-preview`},m("div",{class:`${re}-color-picker-preview__sliders`},m(Cr,{clsPrefix:re,hue:T,onUpdateHue:ce,onComplete:Re}),e.showAlpha?m(kr,{clsPrefix:re,rgba:R,alpha:ge.value,onUpdateAlpha:ae,onComplete:Re}):null),e.showPreview?m(Vr,{clsPrefix:re,mode:I.value,color:W.value&&gt(W.value),onUpdateColor:he=>ne(he,"input")}):null),m(Er,{clsPrefix:re,showAlpha:e.showAlpha,mode:I.value,modes:te,onUpdateMode:v,value:S.value,valueArr:pe.value,onUpdateValue:xe}),((d=e.swatches)===null||d===void 0?void 0:d.length)&&m(Nr,{clsPrefix:re,mode:I.value,swatches:e.swatches,onUpdateColor:he=>ne(he,"input")})),ee!=null&&ee.length?m("div",{class:`${re}-color-picker-action`},ee.includes("confirm")&&m(et,{size:"small",onClick:bt,theme:de.peers.Button,themeOverrides:de.peerOverrides.Button},{default:()=>s.value.confirm})):null,t.action?m("div",{class:`${re}-color-picker-action`},{default:t.action}):X?m("div",{class:`${re}-color-picker-action`},X.includes("undo")&&m(et,{size:"small",onClick:Ue,disabled:!it.value,theme:de.peers.Button,themeOverrides:de.peerOverrides.Button},{default:()=>s.value.undo}),X.includes("redo")&&m(et,{size:"small",onClick:lt,disabled:!Ie.value,theme:de.peers.Button,themeOverrides:de.peerOverrides.Button},{default:()=>s.value.redo})):null)}return{mergedClsPrefix:c,namespace:i,selfRef:n,hsla:Y,rgba:W,mergedShow:p,mergedDisabled:l,isMounted:Jo(),adjustedTo:Qt(e),mergedValue:S,handleTriggerClick(){x(!0)},handleClickOutside(d){var R;!((R=n.value)===null||R===void 0)&&R.contains(Qo(d))||x(!1)},renderPanel:J,cssVars:f?void 0:B,themeClass:A==null?void 0:A.themeClass,onRender:A==null?void 0:A.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n==null||n(),m("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},m(ea,null,{default:()=>[m(ta,null,{default:()=>m(Pr,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),m(na,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Qt.tdkey,to:this.adjustedTo},{default:()=>m(oa,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?be(this.renderPanel(),[[aa,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),Mr=_("collapse","width: 100%;",[_("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: 16px 0 0 0;
 `,[K("disabled",[j("header","cursor: not-allowed;",[j("header-main",`
 color: var(--n-title-text-color-disabled);
 `),_("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),_("collapse-item","margin-left: 32px;"),U("&:first-child","margin-top: 0;"),U("&:first-child >",[j("header","padding-top: 0;")]),K("left-arrow-placement",[j("header",[_("collapse-item-arrow","margin-right: 4px;")])]),K("right-arrow-placement",[j("header",[_("collapse-item-arrow","margin-left: 4px;")])]),j("content-wrapper",[j("content-inner","padding-top: 16px;"),ra({duration:"0.15s"})]),K("active",[j("header",[K("active",[_("collapse-item-arrow","transform: rotate(90deg);")])])]),U("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),j("header",`
 font-size: var(--n-title-font-size);
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 transition: color .3s var(--n-bezier);
 position: relative;
 padding: 16px 0 0 0;
 color: var(--n-title-text-color);
 cursor: pointer;
 `,[j("header-main",`
 display: flex;
 flex-wrap: nowrap;
 align-items: center;
 font-weight: var(--n-title-font-weight);
 transition: color .3s var(--n-bezier);
 flex: 1;
 color: var(--n-title-text-color);
 `),j("header-extra",`
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
 `)])])]),Or=Object.assign(Object.assign({},ve.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),fo=Pt("n-collapse"),ho=N({name:"Collapse",props:Or,setup(e,{slots:t}){const{mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedRtlRef:r}=ze(e),a=z(e.defaultExpandedNames),l=L(()=>e.expandedNames),s=nt(l,a),c=ve("Collapse","-collapse",Mr,la,e,n);function i(C){const{"onUpdate:expandedNames":b,onUpdateExpandedNames:S,onExpandedNamesChange:k}=e;S&&le(S,C),b&&le(b,C),k&&le(k,C),a.value=C}function f(C){const{onItemHeaderClick:b}=e;b&&le(b,C)}function u(C,b,S){const{accordion:k}=e,{value:P}=s;if(k)C?(i([b]),f({name:b,expanded:!0,event:S})):(i([]),f({name:b,expanded:!1,event:S}));else if(!Array.isArray(P))i([b]),f({name:b,expanded:!0,event:S});else{const E=P.slice(),O=E.findIndex(I=>b===I);~O?(E.splice(O,1),i(E),f({name:b,expanded:!1,event:S})):(E.push(b),i(E),f({name:b,expanded:!0,event:S}))}}Tt(fo,{props:e,mergedClsPrefixRef:n,expandedNamesRef:s,slots:t,toggleItem:u});const h=ht("Collapse",r,n),p=L(()=>{const{common:{cubicBezierEaseInOut:C},self:{titleFontWeight:b,dividerColor:S,titleTextColor:k,titleTextColorDisabled:P,textColor:E,arrowColor:O,fontSize:I,titleFontSize:v,arrowColorDisabled:y}}=c.value;return{"--n-font-size":I,"--n-bezier":C,"--n-text-color":E,"--n-divider-color":S,"--n-title-font-size":v,"--n-title-text-color":k,"--n-title-text-color-disabled":P,"--n-title-font-weight":b,"--n-arrow-color":O,"--n-arrow-color-disabled":y}}),x=o?ft("collapse",void 0,p,e):void 0;return{rtlEnabled:h,mergedTheme:c,mergedClsPrefix:n,cssVars:o?void 0:p,themeClass:x==null?void 0:x.themeClass,onRender:x==null?void 0:x.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),m("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),jr=N({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:ia(we(e,"show"))}},render(){return m(sa,null,{default:()=>{const{show:e,displayDirective:t,onceTrue:n,clsPrefix:o}=this,r=t==="show"&&n,a=m("div",{class:`${o}-collapse-item__content-wrapper`},m("div",{class:`${o}-collapse-item__content-inner`},this.$slots));return r?be(a,[[Be,e]]):e?a:null}})}}),Hr={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},mo=N({name:"CollapseItem",props:Hr,setup(e){const{mergedRtlRef:t}=ze(e),n=ca(),o=Ee(()=>{var u;return(u=e.name)!==null&&u!==void 0?u:n}),r=pt(fo);r||Kn("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:a,props:l,mergedClsPrefixRef:s,slots:c}=r,i=L(()=>{const{value:u}=a;if(Array.isArray(u)){const{value:h}=o;return!~u.findIndex(p=>p===h)}else if(u){const{value:h}=o;return h!==u}return!0});return{rtlEnabled:ht("Collapse",t,s),collapseSlots:c,randomName:n,mergedClsPrefix:s,collapsed:i,mergedDisplayDirective:L(()=>{const{displayDirective:u}=e;return u||l.displayDirective}),arrowPlacement:L(()=>l.arrowPlacement),handleClick(u){r&&!e.disabled&&r.toggleItem(i.value,o.value,u)}}},render(){var e;const{collapseSlots:t,$slots:n,arrowPlacement:o,collapsed:r,mergedDisplayDirective:a,mergedClsPrefix:l,disabled:s}=this,c=n.header?n.header():this.title,i=n["header-extra"]||t["header-extra"],f=n.arrow||t.arrow;return m("div",{class:[`${l}-collapse-item`,`${l}-collapse-item--${o}-arrow-placement`,s&&`${l}-collapse-item--disabled`,!r&&`${l}-collapse-item--active`]},m("div",{class:[`${l}-collapse-item__header`,!r&&`${l}-collapse-item__header--active`]},m("div",{class:`${l}-collapse-item__header-main`,onClick:this.handleClick},o==="right"&&c,m("div",{class:`${l}-collapse-item-arrow`,key:this.rtlEnabled?0:1},f?f({collapsed:r}):m(Bt,{clsPrefix:l},{default:(e=t.expandIcon)!==null&&e!==void 0?e:()=>this.rtlEnabled?m(ur,null):m(da,null)})),o==="left"&&c),i&&m("div",{class:`${l}-collapse-item__header-extra`,onClick:this.handleClick},{default:i})),m(jr,{clsPrefix:l,displayDirective:a,show:!r},n))}}),Wr={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},bo=Pt("n-radio-group");function Xr(e){const t=At(e,{mergedSize(k){const{size:P}=e;if(P!==void 0)return P;if(l){const{mergedSizeRef:{value:E}}=l;if(E!==void 0)return E}return k?k.mergedSize.value:"medium"},mergedDisabled(k){return!!(e.disabled||l!=null&&l.disabledRef.value||k!=null&&k.disabled.value)}}),{mergedSizeRef:n,mergedDisabledRef:o}=t,r=z(null),a=z(null),l=pt(bo,null),s=z(e.defaultChecked),c=we(e,"checked"),i=nt(c,s),f=Ee(()=>l?l.valueRef.value===e.value:i.value),u=Ee(()=>{const{name:k}=e;if(k!==void 0)return k;if(l)return l.nameRef.value}),h=z(!1);function p(){if(l){const{doUpdateValue:k}=l,{value:P}=e;le(k,P)}else{const{onUpdateChecked:k,"onUpdate:checked":P}=e,{nTriggerFormInput:E,nTriggerFormChange:O}=t;k&&le(k,!0),P&&le(P,!0),E(),O(),s.value=!0}}function x(){o.value||f.value||p()}function C(){x()}function b(){h.value=!1}function S(){h.value=!0}return{mergedClsPrefix:l?l.mergedClsPrefixRef:ze(e).mergedClsPrefixRef,inputRef:r,labelRef:a,mergedName:u,mergedDisabled:o,uncontrolledChecked:s,renderSafeChecked:f,focus:h,mergedSize:n,handleRadioInputChange:C,handleRadioInputBlur:b,handleRadioInputFocus:S}}const Gr=_("radio",`
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
`,[K("checked",[j("dot",`
 background-color: var(--n-color-active);
 `)]),j("dot-wrapper",`
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
 `),j("dot",`
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
 `),K("checked",{boxShadow:"var(--n-box-shadow-active)"},[U("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),j("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),yt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[j("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),K("focus",[U("&:not(:active)",[j("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),K("disabled",`
 cursor: not-allowed;
 `,[j("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[U("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),K("checked",`
 opacity: 1;
 `)]),j("label",{color:"var(--n-text-color-disabled)"}),_("radio-input",`
 cursor: not-allowed;
 `)])]),qr=N({name:"Radio",props:Object.assign(Object.assign({},ve.props),Wr),setup(e){const t=Xr(e),n=ve("Radio","-radio",Gr,Yn,e,t.mergedClsPrefix),o=L(()=>{const{mergedSize:{value:i}}=t,{common:{cubicBezierEaseInOut:f},self:{boxShadow:u,boxShadowActive:h,boxShadowDisabled:p,boxShadowFocus:x,boxShadowHover:C,color:b,colorDisabled:S,colorActive:k,textColor:P,textColorDisabled:E,dotColorActive:O,dotColorDisabled:I,labelPadding:v,labelLineHeight:y,[me("fontSize",i)]:w,[me("radioSize",i)]:$}}=n.value;return{"--n-bezier":f,"--n-label-line-height":y,"--n-box-shadow":u,"--n-box-shadow-active":h,"--n-box-shadow-disabled":p,"--n-box-shadow-focus":x,"--n-box-shadow-hover":C,"--n-color":b,"--n-color-active":k,"--n-color-disabled":S,"--n-dot-color-active":O,"--n-dot-color-disabled":I,"--n-font-size":w,"--n-radio-size":$,"--n-text-color":P,"--n-text-color-disabled":E,"--n-label-padding":v}}),{inlineThemeDisabled:r,mergedClsPrefixRef:a,mergedRtlRef:l}=ze(e),s=ht("Radio",l,a),c=r?ft("radio",L(()=>t.mergedSize.value[0]),o,e):void 0;return Object.assign(t,{rtlEnabled:s,cssVars:r?void 0:o,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender})},render(){const{$slots:e,mergedClsPrefix:t,onRender:n,label:o}=this;return n==null||n(),m("label",{class:[`${t}-radio`,this.themeClass,{[`${t}-radio--rtl`]:this.rtlEnabled,[`${t}-radio--disabled`]:this.mergedDisabled,[`${t}-radio--checked`]:this.renderSafeChecked,[`${t}-radio--focus`]:this.focus}],style:this.cssVars},m("input",{ref:"inputRef",type:"radio",class:`${t}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),m("div",{class:`${t}-radio__dot-wrapper`},"\xA0",m("div",{class:[`${t}-radio__dot`,this.renderSafeChecked&&`${t}-radio__dot--checked`]})),_t(e.default,r=>!r&&!o?null:m("div",{ref:"labelRef",class:`${t}-radio__label`},r||o)))}}),Kr=_("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[j("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[K("checked",{backgroundColor:"var(--n-button-border-color-active)"}),K("disabled",{opacity:"var(--n-opacity-disabled)"})]),K("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[_("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),j("splitor",{height:"var(--n-height)"})]),_("radio-button",`
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
 `),j("state-border",`
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
 `,[j("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),U("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[j("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),yt("disabled",`
 cursor: pointer;
 `,[U("&:hover",[j("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),yt("checked",{color:"var(--n-button-text-color-hover)"})]),K("focus",[U("&:not(:active)",[j("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),K("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),K("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function Yr(e,t,n){var o;const r=[];let a=!1;for(let l=0;l<e.length;++l){const s=e[l],c=(o=s.type)===null||o===void 0?void 0:o.name;c==="RadioButton"&&(a=!0);const i=s.props;if(c!=="RadioButton"){r.push(s);continue}if(l===0)r.push(s);else{const f=r[r.length-1].props,u=t===f.value,h=f.disabled,p=t===i.value,x=i.disabled,C=(u?2:0)+(h?0:1),b=(p?2:0)+(x?0:1),S={[`${n}-radio-group__splitor--disabled`]:h,[`${n}-radio-group__splitor--checked`]:u},k={[`${n}-radio-group__splitor--disabled`]:x,[`${n}-radio-group__splitor--checked`]:p},P=C<b?k:S;r.push(m("div",{class:[`${n}-radio-group__splitor`,P]}),s)}}return{children:r,isButtonGroup:a}}const Zr=Object.assign(Object.assign({},ve.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Jr=N({name:"RadioGroup",props:Zr,setup(e){const t=z(null),{mergedSizeRef:n,mergedDisabledRef:o,nTriggerFormChange:r,nTriggerFormInput:a,nTriggerFormBlur:l,nTriggerFormFocus:s}=At(e),{mergedClsPrefixRef:c,inlineThemeDisabled:i,mergedRtlRef:f}=ze(e),u=ve("Radio","-radio-group",Kr,Yn,e,c),h=z(e.defaultValue),p=we(e,"value"),x=nt(p,h);function C(O){const{onUpdateValue:I,"onUpdate:value":v}=e;I&&le(I,O),v&&le(v,O),h.value=O,r(),a()}function b(O){const{value:I}=t;!I||I.contains(O.relatedTarget)||s()}function S(O){const{value:I}=t;!I||I.contains(O.relatedTarget)||l()}Tt(bo,{mergedClsPrefixRef:c,nameRef:we(e,"name"),valueRef:x,disabledRef:o,mergedSizeRef:n,doUpdateValue:C});const k=ht("Radio",f,c),P=L(()=>{const{value:O}=n,{common:{cubicBezierEaseInOut:I},self:{buttonBorderColor:v,buttonBorderColorActive:y,buttonBorderRadius:w,buttonBoxShadow:$,buttonBoxShadowFocus:V,buttonBoxShadowHover:G,buttonColorActive:ie,buttonTextColor:se,buttonTextColorActive:H,buttonTextColorHover:Z,opacityDisabled:W,[me("buttonHeight",O)]:Y,[me("fontSize",O)]:pe}}=u.value;return{"--n-font-size":pe,"--n-bezier":I,"--n-button-border-color":v,"--n-button-border-color-active":y,"--n-button-border-radius":w,"--n-button-box-shadow":$,"--n-button-box-shadow-focus":V,"--n-button-box-shadow-hover":G,"--n-button-color-active":ie,"--n-button-text-color":se,"--n-button-text-color-hover":Z,"--n-button-text-color-active":H,"--n-height":Y,"--n-opacity-disabled":W}}),E=i?ft("radio-group",L(()=>n.value[0]),P,e):void 0;return{selfElRef:t,rtlEnabled:k,mergedClsPrefix:c,mergedValue:x,handleFocusout:S,handleFocusin:b,cssVars:i?void 0:P,themeClass:E==null?void 0:E.themeClass,onRender:E==null?void 0:E.onRender}},render(){var e;const{mergedValue:t,mergedClsPrefix:n,handleFocusin:o,handleFocusout:r}=this,{children:a,isButtonGroup:l}=Yr(dt(bn(this)),t,n);return(e=this.onRender)===null||e===void 0||e.call(this),m("div",{onFocusin:o,onFocusout:r,ref:"selfElRef",class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,l&&`${n}-radio-group--button-group`],style:this.cssVars},a)}}),vo=Symbol("DESCRIPTION_ITEM_FLAG");function Qr(e){return typeof e=="object"&&e&&!Array.isArray(e)?e.type&&e.type[vo]:!1}const el=U([_("descriptions",{fontSize:"var(--n-font-size)"},[_("descriptions-separator",`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),_("descriptions-table-wrapper",[_("descriptions-table",[_("descriptions-table-row",[_("descriptions-table-header",{padding:"var(--n-th-padding)"}),_("descriptions-table-content",{padding:"var(--n-td-padding)"})])])]),yt("bordered",[_("descriptions-table-wrapper",[_("descriptions-table",[_("descriptions-table-row",[U("&:last-child",[_("descriptions-table-content",{paddingBottom:0})])])])])]),K("left-label-placement",[_("descriptions-table-content",[U("> *",{verticalAlign:"top"})])]),K("left-label-align",[U("th",{textAlign:"left"})]),K("center-label-align",[U("th",{textAlign:"center"})]),K("right-label-align",[U("th",{textAlign:"right"})]),K("bordered",[_("descriptions-table-wrapper",`
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
 `,[j("content",`
 transition: color .3s var(--n-bezier);
 display: inline-block;
 color: var(--n-td-text-color);
 `)]),j("label",`
 font-weight: var(--n-th-font-weight);
 transition: color .3s var(--n-bezier);
 display: inline-block;
 margin-right: 14px;
 color: var(--n-th-text-color);
 `)])])])]),_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ua(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),pa(_("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),tl=Object.assign(Object.assign({},ve.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:"top"},labelAlign:{type:String,default:"left"},separator:{type:String,default:":"},size:{type:String,default:"medium"},bordered:Boolean,labelStyle:[Object,String],contentStyle:[Object,String]}),nl=N({name:"Descriptions",props:tl,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=ze(e),o=ve("Descriptions","-descriptions",el,fa,e,t),r=L(()=>{const{size:l,bordered:s}=e,{common:{cubicBezierEaseInOut:c},self:{titleTextColor:i,thColor:f,thColorModal:u,thColorPopover:h,thTextColor:p,thFontWeight:x,tdTextColor:C,tdColor:b,tdColorModal:S,tdColorPopover:k,borderColor:P,borderColorModal:E,borderColorPopover:O,borderRadius:I,lineHeight:v,[me("fontSize",l)]:y,[me(s?"thPaddingBordered":"thPadding",l)]:w,[me(s?"tdPaddingBordered":"tdPadding",l)]:$}}=o.value;return{"--n-title-text-color":i,"--n-th-padding":w,"--n-td-padding":$,"--n-font-size":y,"--n-bezier":c,"--n-th-font-weight":x,"--n-line-height":v,"--n-th-text-color":p,"--n-td-text-color":C,"--n-th-color":f,"--n-th-color-modal":u,"--n-th-color-popover":h,"--n-td-color":b,"--n-td-color-modal":S,"--n-td-color-popover":k,"--n-border-radius":I,"--n-border-color":P,"--n-border-color-modal":E,"--n-border-color-popover":O}}),a=n?ft("descriptions",L(()=>{let l="";const{size:s,bordered:c}=e;return c&&(l+="a"),l+=s[0],l}),r,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:r,themeClass:a==null?void 0:a.themeClass,onRender:a==null?void 0:a.onRender,compitableColumn:en(e,["columns","column"]),inlineThemeDisabled:n}},render(){const e=this.$slots.default,t=e?dt(e()):[];t.length;const{compitableColumn:n,labelPlacement:o,labelAlign:r,size:a,bordered:l,title:s,cssVars:c,mergedClsPrefix:i,separator:f,onRender:u}=this;u==null||u();const h=t.filter(b=>Qr(b)),p={span:0,row:[],secondRow:[],rows:[]},C=h.reduce((b,S,k)=>{const P=S.props||{},E=h.length-1===k,O=["label"in P?P.label:zn(S,"label")],I=[zn(S)],v=P.span||1,y=b.span;b.span+=v;const w=P.labelStyle||P["label-style"]||this.labelStyle,$=P.contentStyle||P["content-style"]||this.contentStyle;if(o==="left")l?b.row.push(m("th",{class:`${i}-descriptions-table-header`,colspan:1,style:w},O),m("td",{class:`${i}-descriptions-table-content`,colspan:E?(n-y)*2+1:v*2-1,style:$},I)):b.row.push(m("td",{class:`${i}-descriptions-table-content`,colspan:E?(n-y)*2:v*2},m("span",{class:`${i}-descriptions-table-content__label`,style:w},[...O,f&&m("span",{class:`${i}-descriptions-separator`},f)]),m("span",{class:`${i}-descriptions-table-content__content`,style:$},I)));else{const V=E?(n-y)*2:v*2;b.row.push(m("th",{class:`${i}-descriptions-table-header`,colspan:V,style:w},O)),b.secondRow.push(m("td",{class:`${i}-descriptions-table-content`,colspan:V,style:$},I))}return(b.span>=n||E)&&(b.span=0,b.row.length&&(b.rows.push(b.row),b.row=[]),o!=="left"&&b.secondRow.length&&(b.rows.push(b.secondRow),b.secondRow=[])),b},p).rows.map(b=>m("tr",{class:`${i}-descriptions-table-row`},b));return m("div",{style:c,class:[`${i}-descriptions`,this.themeClass,`${i}-descriptions--${o}-label-placement`,`${i}-descriptions--${r}-label-align`,`${i}-descriptions--${a}-size`,l&&`${i}-descriptions--bordered`]},s||this.$slots.header?m("div",{class:`${i}-descriptions-header`},s||bn(this,"header")):null,m("div",{class:`${i}-descriptions-table-wrapper`},m("table",{class:`${i}-descriptions-table`},m("tbody",null,C))))}}),ol={label:String,span:{type:Number,default:1},labelStyle:[Object,String],contentStyle:[Object,String]},al=N({name:"DescriptionsItem",[vo]:!0,props:ol,render(){return null}});let Ht;const rl=()=>{if(!ha)return!0;if(Ht===void 0){const e=document.createElement("div");e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e);const t=e.scrollHeight===1;return document.body.removeChild(e),Ht=t}return Ht},ll=Object.assign(Object.assign({},ve.props),{align:String,justify:{type:String,default:"start"},inline:Boolean,vertical:Boolean,size:{type:[String,Number,Array],default:"medium"},wrapItem:{type:Boolean,default:!0},itemStyle:[String,Object],wrap:{type:Boolean,default:!0},internalUseGap:{type:Boolean,default:void 0}}),Wt=N({name:"Space",props:ll,setup(e){const{mergedClsPrefixRef:t,mergedRtlRef:n}=ze(e),o=ve("Space","-space",void 0,ma,e,t),r=ht("Space",n,t);return{useGap:rl(),rtlEnabled:r,mergedClsPrefix:t,margin:L(()=>{const{size:a}=e;if(Array.isArray(a))return{horizontal:a[0],vertical:a[1]};if(typeof a=="number")return{horizontal:a,vertical:a};const{self:{[me("gap",a)]:l}}=o.value,{row:s,col:c}=ba(l);return{horizontal:Cn(c),vertical:Cn(s)}})}},render(){const{vertical:e,align:t,inline:n,justify:o,itemStyle:r,margin:a,wrap:l,mergedClsPrefix:s,rtlEnabled:c,useGap:i,wrapItem:f,internalUseGap:u}=this,h=dt(bn(this));if(!h.length)return null;const p=`${a.horizontal}px`,x=`${a.horizontal/2}px`,C=`${a.vertical}px`,b=`${a.vertical/2}px`,S=h.length-1,k=o.startsWith("space-");return m("div",{role:"none",class:[`${s}-space`,c&&`${s}-space--rtl`],style:{display:n?"inline-flex":"flex",flexDirection:e?"column":"row",justifyContent:["start","end"].includes(o)?"flex-"+o:o,flexWrap:!l||e?"nowrap":"wrap",marginTop:i||e?"":`-${b}`,marginBottom:i||e?"":`-${b}`,alignItems:t,gap:i?`${a.vertical}px ${a.horizontal}px`:""}},!f&&(i||u)?h:h.map((P,E)=>m("div",{role:"none",style:[r,{maxWidth:"100%"},i?"":e?{marginBottom:E!==S?C:""}:c?{marginLeft:k?o==="space-between"&&E===S?"":x:E!==S?p:"",marginRight:k?o==="space-between"&&E===0?"":x:"",paddingTop:b,paddingBottom:b}:{marginRight:k?o==="space-between"&&E===S?"":x:E!==S?p:"",marginLeft:k?o==="space-between"&&E===0?"":x:"",paddingTop:b,paddingBottom:b}]},P)))}});function il(e){return e==null||typeof e=="string"&&e.trim()===""?null:Number(e)}function sl(e){return e.includes(".")&&(/^(-)?\d+.*(\.|0)$/.test(e)||/^\.\d+$/.test(e))}function Xt(e){return e==null?!0:!Number.isNaN(e)}function Pn(e,t){return e==null?"":t===void 0?String(e):e.toFixed(t)}function Gt(e){if(e===null)return null;if(typeof e=="number")return e;{const t=Number(e);return Number.isNaN(t)?null:t}}const cl=U([_("input-number-suffix",`
 display: inline-block;
 margin-right: 10px;
 `),_("input-number-prefix",`
 display: inline-block;
 margin-left: 10px;
 `)]),An=800,Tn=100,dl=Object.assign(Object.assign({},ve.props),{autofocus:Boolean,loading:{type:Boolean,default:void 0},placeholder:String,defaultValue:{type:Number,default:null},value:Number,step:{type:[Number,String],default:1},min:[Number,String],max:[Number,String],size:String,disabled:{type:Boolean,default:void 0},validator:Function,bordered:{type:Boolean,default:void 0},showButton:{type:Boolean,default:!0},buttonPlacement:{type:String,default:"right"},readonly:Boolean,clearable:Boolean,keyboard:{type:Object,default:{}},updateValueOnInput:{type:Boolean,default:!0},parse:Function,format:Function,precision:Number,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onChange:[Function,Array]}),gn=N({name:"InputNumber",props:dl,setup(e){const{mergedBorderedRef:t,mergedClsPrefixRef:n,mergedRtlRef:o}=ze(e),r=ve("InputNumber","-input-number",cl,va,e,n),{localeRef:a}=qn("InputNumber"),l=At(e),{mergedSizeRef:s,mergedDisabledRef:c,mergedStatusRef:i}=l,f=z(null),u=z(null),h=z(null),p=z(e.defaultValue),x=we(e,"value"),C=nt(x,p),b=z(""),S=d=>{const R=String(d).split(".")[1];return R?R.length:0},k=d=>{const R=[e.min,e.max,e.step,d].map(T=>T===void 0?0:S(T));return Math.max(...R)},P=Ee(()=>{const{placeholder:d}=e;return d!==void 0?d:a.value.placeholder}),E=Ee(()=>{const d=Gt(e.step);return d!==null?d===0?1:Math.abs(d):1}),O=Ee(()=>{const d=Gt(e.min);return d!==null?d:null}),I=Ee(()=>{const d=Gt(e.max);return d!==null?d:null}),v=d=>{const{value:R}=C;if(d===R){w();return}const{"onUpdate:value":T,onUpdateValue:X,onChange:te}=e,{nTriggerFormInput:ee,nTriggerFormChange:de}=l;te&&le(te,d),X&&le(X,d),T&&le(T,d),p.value=d,ee(),de()},y=({offset:d,doUpdateIfValid:R,fixPrecision:T,isInputing:X})=>{const{value:te}=b;if(X&&sl(te))return!1;const ee=(e.parse||il)(te);if(ee===null)return R&&v(null),null;if(Xt(ee)){const de=S(ee),{precision:re}=e;if(re!==void 0&&re<de&&!T)return!1;let he=parseFloat((ee+d).toFixed(re!=null?re:k(ee)));if(Xt(he)){const{value:Ge}=I,{value:qe}=O;if(Ge!==null&&he>Ge){if(!R||X)return!1;he=Ge}if(qe!==null&&he<qe){if(!R||X)return!1;he=qe}return e.validator&&!e.validator(he)?!1:(R&&v(he),he)}}return!1},w=()=>{const{value:d}=C;if(Xt(d)){const{format:R,precision:T}=e;R?b.value=R(d):d===null||T===void 0||S(d)>T?b.value=Pn(d,void 0):b.value=Pn(d,T)}else b.value=String(d)};w();const $=Ee(()=>y({offset:0,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})===!1),V=Ee(()=>{const{value:d}=C;if(e.validator&&d===null)return!1;const{value:R}=E;return y({offset:-R,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1}),G=Ee(()=>{const{value:d}=C;if(e.validator&&d===null)return!1;const{value:R}=E;return y({offset:+R,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1});function ie(d){const{onFocus:R}=e,{nTriggerFormFocus:T}=l;R&&le(R,d),T()}function se(d){var R,T;if(d.target===((R=f.value)===null||R===void 0?void 0:R.wrapperElRef))return;const X=y({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0});if(X!==!1){const de=(T=f.value)===null||T===void 0?void 0:T.inputElRef;de&&(de.value=String(X||"")),C.value===X&&w()}else w();const{onBlur:te}=e,{nTriggerFormBlur:ee}=l;te&&le(te,d),ee()}function H(d){const{onClear:R}=e;R&&le(R,d)}function Z(){const{value:d}=G;if(!d){xe();return}const{value:R}=C;if(R===null)e.validator||v(fe());else{const{value:T}=E;y({offset:T,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}function W(){const{value:d}=V;if(!d){ne();return}const{value:R}=C;if(R===null)e.validator||v(fe());else{const{value:T}=E;y({offset:-T,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}const Y=ie,pe=se;function fe(){if(e.validator)return null;const{value:d}=O,{value:R}=I;return d!==null?Math.max(0,d):R!==null?Math.min(0,R):0}function ge(d){H(d),v(null)}function oe(d){var R,T,X;!((R=h.value)===null||R===void 0)&&R.$el.contains(d.target)&&d.preventDefault(),!((T=u.value)===null||T===void 0)&&T.$el.contains(d.target)&&d.preventDefault(),(X=f.value)===null||X===void 0||X.activate()}let _e=null,ce=null,ae=null;function ne(){ae&&(window.clearTimeout(ae),ae=null),_e&&(window.clearInterval(_e),_e=null)}function xe(){Ue&&(window.clearTimeout(Ue),Ue=null),ce&&(window.clearInterval(ce),ce=null)}function Re(){ne(),ae=window.setTimeout(()=>{_e=window.setInterval(()=>{W()},Tn)},An),Xe("mouseup",document,ne,{once:!0})}let Ue=null;function lt(){xe(),Ue=window.setTimeout(()=>{ce=window.setInterval(()=>{Z()},Tn)},An),Xe("mouseup",document,xe,{once:!0})}const bt=()=>{ce||Z()},it=()=>{_e||W()};function Ie(d){var R,T;if(d.key==="Enter"){if(d.target===((R=f.value)===null||R===void 0?void 0:R.wrapperElRef))return;y({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&((T=f.value)===null||T===void 0||T.deactivate())}else if(d.key==="ArrowUp"){if(!G.value||e.keyboard.ArrowUp===!1)return;d.preventDefault(),y({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&Z()}else if(d.key==="ArrowDown"){if(!V.value||e.keyboard.ArrowDown===!1)return;d.preventDefault(),y({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&W()}}function B(d){b.value=d,e.updateValueOnInput&&!e.format&&!e.parse&&e.precision===void 0&&y({offset:0,doUpdateIfValid:!0,isInputing:!0,fixPrecision:!1})}Ae(C,()=>{w()});const A={focus:()=>{var d;return(d=f.value)===null||d===void 0?void 0:d.focus()},blur:()=>{var d;return(d=f.value)===null||d===void 0?void 0:d.blur()}},J=ht("InputNumber",o,n);return Object.assign(Object.assign({},A),{rtlEnabled:J,inputInstRef:f,minusButtonInstRef:u,addButtonInstRef:h,mergedClsPrefix:n,mergedBordered:t,uncontrolledValue:p,mergedValue:C,mergedPlaceholder:P,displayedValueInvalid:$,mergedSize:s,mergedDisabled:c,displayedValue:b,addable:G,minusable:V,mergedStatus:i,handleFocus:Y,handleBlur:pe,handleClear:ge,handleMouseDown:oe,handleAddClick:bt,handleMinusClick:it,handleAddMousedown:lt,handleMinusMousedown:Re,handleKeyDown:Ie,handleUpdateDisplayedValue:B,mergedTheme:r,inputThemeOverrides:{paddingSmall:"0 8px 0 10px",paddingMedium:"0 8px 0 12px",paddingLarge:"0 8px 0 14px"},buttonThemeOverrides:L(()=>{const{self:{iconColorDisabled:d}}=r.value,[R,T,X,te]=Pe(d);return{textColorTextDisabled:`rgb(${R}, ${T}, ${X})`,opacityDisabled:`${te}`}})})},render(){const{mergedClsPrefix:e,$slots:t}=this,n=()=>m(kn,{text:!0,disabled:!this.minusable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleMinusClick,onMousedown:this.handleMinusMousedown,ref:"minusButtonInstRef"},{icon:()=>Sn(t["minus-icon"],()=>[m(Bt,{clsPrefix:e},{default:()=>m(pr,null)})])}),o=()=>m(kn,{text:!0,disabled:!this.addable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleAddClick,onMousedown:this.handleAddMousedown,ref:"addButtonInstRef"},{icon:()=>Sn(t["add-icon"],()=>[m(Bt,{clsPrefix:e},{default:()=>m(uo,null)})])});return m("div",{class:[`${e}-input-number`,this.rtlEnabled&&`${e}-input-number--rtl`]},m(at,{ref:"inputInstRef",autofocus:this.autofocus,status:this.mergedStatus,bordered:this.mergedBordered,loading:this.loading,value:this.displayedValue,onUpdateValue:this.handleUpdateDisplayedValue,theme:this.mergedTheme.peers.Input,themeOverrides:this.mergedTheme.peerOverrides.Input,builtinThemeOverrides:this.inputThemeOverrides,size:this.mergedSize,placeholder:this.mergedPlaceholder,disabled:this.mergedDisabled,readonly:this.readonly,textDecoration:this.displayedValueInvalid?"line-through":void 0,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onClear:this.handleClear,clearable:this.clearable,internalLoadingBeforeSuffix:!0},{prefix:()=>{var r;return this.showButton&&this.buttonPlacement==="both"?[n(),_t(t.prefix,a=>a?m("span",{class:`${e}-input-number-prefix`},a):null)]:(r=t.prefix)===null||r===void 0?void 0:r.call(t)},suffix:()=>{var r;return this.showButton?[_t(t.suffix,a=>a?m("span",{class:`${e}-input-number-suffix`},a):null),this.buttonPlacement==="right"?n():null,o()]:(r=t.suffix)===null||r===void 0?void 0:r.call(t)}}))}}),ul=Object.assign(Object.assign({},ve.props),{trigger:String,xScrollable:Boolean,onScroll:Function}),pl=N({name:"Scrollbar",props:ul,setup(){const e=z(null);return Object.assign(Object.assign({},{scrollTo:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollTo(n[0],n[1])},scrollBy:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollBy(n[0],n[1])}}),{scrollbarInstRef:e})},render(){return m(ga,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),go=pl,xn=Pt("n-tabs"),xo={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ze=N({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:xo,setup(e){const t=pt(xn,null);return t||Kn("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return m("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),fl=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},wa(xo,["displayDirective"])),dn=N({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:fl,setup(e){const{mergedClsPrefixRef:t,valueRef:n,typeRef:o,closableRef:r,tabStyleRef:a,tabChangeIdRef:l,onBeforeLeaveRef:s,triggerRef:c,handleAdd:i,activateTab:f,handleClose:u}=pt(xn);return{trigger:c,mergedClosable:L(()=>{if(e.internalAddable)return!1;const{closable:h}=e;return h===void 0?r.value:h}),style:a,clsPrefix:t,value:n,type:o,handleClose(h){h.stopPropagation(),!e.disabled&&u(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){i();return}const{name:h}=e,p=++l.id;if(h!==n.value){const{value:x}=s;x?Promise.resolve(x(e.name,n.value)).then(C=>{C&&l.id===p&&f(h)}):f(h)}}}},render(){const{internalAddable:e,clsPrefix:t,name:n,disabled:o,label:r,tab:a,value:l,mergedClosable:s,style:c,trigger:i,$slots:{default:f}}=this,u=r!=null?r:a;return m("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?m("div",{class:`${t}-tabs-tab-pad`}):null,m("div",Object.assign({key:n,"data-name":n,"data-disabled":o?!0:void 0},xa({class:[`${t}-tabs-tab`,l===n&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,s&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`],onClick:i==="click"?this.activateTab:void 0,onMouseenter:i==="hover"?this.activateTab:void 0,style:e?void 0:c},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),m("span",{class:`${t}-tabs-tab__label`},e?m(Se,null,m("div",{class:`${t}-tabs-tab__height-placeholder`},"\xA0"),m(Bt,{clsPrefix:t},{default:()=>m(uo,null)})):f?f():typeof u=="object"?u:ya(u!=null?u:n)),s&&this.type==="card"?m(_a,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),hl=_("tabs",`
 box-sizing: border-box;
 width: 100%;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[K("segment-type",[_("tabs-rail",[U("&.transition-disabled","color: red;",[_("tabs-tab",`
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
 `,[K("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),K("flex",[_("tabs-nav",{width:"100%"},[_("tabs-wrapper",{width:"100%"},[_("tabs-tab",{marginRight:0})])])]),_("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[j("prefix, suffix",`
 display: flex;
 align-items: center;
 `),j("prefix","padding-right: 16px;"),j("suffix","padding-left: 16px;")]),_("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[K("shadow-before",[U("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),K("shadow-after",[U("&::after",`
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
 `,[K("disabled",{cursor:"not-allowed"}),j("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),j("label",`
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
 `),K("disabled",`
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
 `),K("line-type, bar-type",[_("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[U("&:hover",{color:"var(--n-tab-text-color-hover)"}),K("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),K("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),_("tabs-nav",[K("line-type",[j("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),_("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),K("card-type",[j("prefix, suffix",`
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
 `,[K("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[j("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),yt("disabled",[U("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),K("closable","padding-right: 6px;"),K("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),K("disabled","color: var(--n-tab-text-color-disabled);")]),_("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),ml=Object.assign(Object.assign({},ve.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Et=N({name:"Tabs",props:ml,setup(e,{slots:t}){var n,o,r,a;const{mergedClsPrefixRef:l,inlineThemeDisabled:s}=ze(e),c=ve("Tabs","-tabs",hl,Ca,e,l),i=z(null),f=z(null),u=z(null),h=z(null),p=z(null),x=z(!0),C=z(!0),b=en(e,["labelSize","size"]),S=en(e,["activeName","value"]),k=z((o=(n=S.value)!==null&&n!==void 0?n:e.defaultValue)!==null&&o!==void 0?o:t.default?(a=(r=dt(t.default())[0])===null||r===void 0?void 0:r.props)===null||a===void 0?void 0:a.name:null),P=nt(S,k),E={id:0},O=L(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Ae(P,()=>{E.id=0,y()});function I(){var B;const{value:A}=P;return A===null?null:(B=i.value)===null||B===void 0?void 0:B.querySelector(`[data-name="${A}"]`)}function v(B){if(e.type==="card")return;const{value:A}=f;if(!!A&&B){const J=`${l.value}-tabs-bar--disabled`,{barWidth:d}=e;if(B.dataset.disabled==="true"?A.classList.add(J):A.classList.remove(J),typeof d=="number"&&B.offsetWidth>=d){const R=Math.floor((B.offsetWidth-d)/2)+B.offsetLeft;A.style.left=`${R}px`,A.style.maxWidth=`${d}px`}else A.style.left=`${B.offsetLeft}px`,A.style.maxWidth=`${B.offsetWidth}px`;A.style.width="8192px",A.offsetWidth}}function y(){if(e.type==="card")return;const B=I();B&&v(B)}const w=z(null);let $=0,V=null;function G(B){const A=w.value;if(A){$=B.getBoundingClientRect().height;const J=`${$}px`,d=()=>{A.style.height=J,A.style.maxHeight=J};V?(d(),V(),V=null):V=d}}function ie(B){const A=w.value;if(A){const J=B.getBoundingClientRect().height,d=()=>{document.body.offsetHeight,A.style.maxHeight=`${J}px`,A.style.height=`${Math.max($,J)}px`};V?(V(),V=null,d()):V=d}}function se(){const B=w.value;B&&(B.style.maxHeight="",B.style.height="")}const H={value:[]},Z=z("next");function W(B){const A=P.value;let J="next";for(const d of H.value){if(d===A)break;if(d===B){J="prev";break}}Z.value=J,Y(B)}function Y(B){const{onActiveNameChange:A,onUpdateValue:J,"onUpdate:value":d}=e;A&&le(A,B),J&&le(J,B),d&&le(d,B),k.value=B}function pe(B){const{onClose:A}=e;A&&le(A,B)}function fe(){const{value:B}=f;if(!B)return;const A="transition-disabled";B.classList.add(A),y(),B.classList.remove(A)}let ge=0;function oe(B){var A;if(B.contentRect.width===0&&B.contentRect.height===0||ge===B.contentRect.width)return;ge=B.contentRect.width;const{type:J}=e;(J==="line"||J==="bar")&&fe(),J!=="segment"&&Re((A=p.value)===null||A===void 0?void 0:A.$el)}const _e=jt(oe,64);Ae([()=>e.justifyContent,()=>e.size],()=>{xt(()=>{const{type:B}=e;(B==="line"||B==="bar")&&fe()})});const ce=z(!1);function ae(B){var A;const{target:J,contentRect:{width:d}}=B,R=J.parentElement.offsetWidth;if(!ce.value)R<d&&(ce.value=!0);else{const{value:T}=h;if(!T)return;R-d>T.$el.offsetWidth&&(ce.value=!1)}Re((A=p.value)===null||A===void 0?void 0:A.$el)}const ne=jt(ae,64);function xe(){const{onAdd:B}=e;B&&B(),xt(()=>{const A=I(),{value:J}=p;!A||!J||J.scrollTo({left:A.offsetLeft,top:0,behavior:"smooth"})})}function Re(B){if(!B)return;const{scrollLeft:A,scrollWidth:J,offsetWidth:d}=B;x.value=A<=0,C.value=A+d>=J}const Ue=jt(B=>{Re(B.target)},64);Tt(xn,{triggerRef:we(e,"trigger"),tabStyleRef:we(e,"tabStyle"),paneClassRef:we(e,"paneClass"),paneStyleRef:we(e,"paneStyle"),mergedClsPrefixRef:l,typeRef:we(e,"type"),closableRef:we(e,"closable"),valueRef:P,tabChangeIdRef:E,onBeforeLeaveRef:we(e,"onBeforeLeave"),activateTab:W,handleClose:pe,handleAdd:xe}),Sa(()=>{y()}),un(()=>{const{value:B}=u;if(!B)return;const{value:A}=l,J=`${A}-tabs-nav-scroll-wrapper--shadow-before`,d=`${A}-tabs-nav-scroll-wrapper--shadow-after`;x.value?B.classList.remove(J):B.classList.add(J),C.value?B.classList.remove(d):B.classList.add(d)});const lt=z(null);Ae(P,()=>{if(e.type==="segment"){const B=lt.value;B&&xt(()=>{B.classList.add("transition-disabled"),B.offsetWidth,B.classList.remove("transition-disabled")})}});const bt={syncBarPosition:()=>{y()}},it=L(()=>{const{value:B}=b,{type:A}=e,J={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[A],d=`${B}${J}`,{self:{barColor:R,closeIconColor:T,closeIconColorHover:X,closeIconColorPressed:te,tabColor:ee,tabBorderColor:de,paneTextColor:re,tabFontWeight:he,tabBorderRadius:Ge,tabFontWeightActive:qe,colorSegment:wo,fontWeightStrong:Co,tabColorSegment:So,closeSize:ko,closeIconSize:Ro,closeColorHover:$o,closeColorPressed:Do,closeBorderRadius:Bo,[me("panePadding",B)]:zo,[me("tabPadding",d)]:Io,[me("tabGap",d)]:Fo,[me("tabTextColor",A)]:Eo,[me("tabTextColorActive",A)]:Po,[me("tabTextColorHover",A)]:Ao,[me("tabTextColorDisabled",A)]:To,[me("tabFontSize",B)]:No},common:{cubicBezierEaseInOut:Vo}}=c.value;return{"--n-bezier":Vo,"--n-color-segment":wo,"--n-bar-color":R,"--n-tab-font-size":No,"--n-tab-text-color":Eo,"--n-tab-text-color-active":Po,"--n-tab-text-color-disabled":To,"--n-tab-text-color-hover":Ao,"--n-pane-text-color":re,"--n-tab-border-color":de,"--n-tab-border-radius":Ge,"--n-close-size":ko,"--n-close-icon-size":Ro,"--n-close-color-hover":$o,"--n-close-color-pressed":Do,"--n-close-border-radius":Bo,"--n-close-icon-color":T,"--n-close-icon-color-hover":X,"--n-close-icon-color-pressed":te,"--n-tab-color":ee,"--n-tab-font-weight":he,"--n-tab-font-weight-active":qe,"--n-tab-padding":Io,"--n-tab-gap":Fo,"--n-pane-padding":zo,"--n-font-weight-strong":Co,"--n-tab-color-segment":So}}),Ie=s?ft("tabs",L(()=>`${b.value[0]}${e.type[0]}`),it,e):void 0;return Object.assign({mergedClsPrefix:l,mergedValue:P,renderedNames:new Set,tabsRailElRef:lt,tabsPaneWrapperRef:w,tabsElRef:i,barElRef:f,addTabInstRef:h,xScrollInstRef:p,scrollWrapperElRef:u,addTabFixed:ce,tabWrapperStyle:O,handleNavResize:_e,mergedSize:b,handleScroll:Ue,handleTabsResize:ne,cssVars:s?void 0:it,themeClass:Ie==null?void 0:Ie.themeClass,animationDirection:Z,renderNameListRef:H,onAnimationBeforeLeave:G,onAnimationEnter:ie,onAnimationAfterEnter:se,onRender:Ie==null?void 0:Ie.onRender},bt)},render(){const{mergedClsPrefix:e,type:t,addTabFixed:n,addable:o,mergedSize:r,renderNameListRef:a,onRender:l,$slots:{default:s,prefix:c,suffix:i}}=this;l==null||l();const f=s?dt(s()).filter(b=>b.type.__TAB_PANE__===!0):[],u=s?dt(s()).filter(b=>b.type.__TAB__===!0):[],h=!u.length,p=t==="card",x=t==="segment",C=!p&&!x&&this.justifyContent;return a.value=[],m("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${r}-size`,C&&`${e}-tabs--flex`],style:this.cssVars},m("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav`]},_t(c,b=>b&&m("div",{class:`${e}-tabs-nav__prefix`},b)),x?m("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},h?f.map((b,S)=>(a.value.push(b.props.name),m(dn,Object.assign({},b.props,{internalCreatedByPane:!0,internalLeftPadded:S!==0}),b.children?{default:b.children.tab}:void 0))):u.map((b,S)=>(a.value.push(b.props.name),S===0?b:Ln(b)))):m(Rn,{onResize:this.handleNavResize},{default:()=>m("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},m(Za,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const b=m("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},C?null:m("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),h?f.map((k,P)=>(a.value.push(k.props.name),qt(m(dn,Object.assign({},k.props,{internalCreatedByPane:!0,internalLeftPadded:P!==0&&(!C||C==="center"||C==="start"||C==="end")}),k.children?{default:k.children.tab}:void 0)))):u.map((k,P)=>(a.value.push(k.props.name),qt(P!==0&&!C?Ln(k):k))),!n&&o&&p?Vn(o,(h?f.length:u.length)!==0):null,C?null:m("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let S=b;return p&&o&&(S=m(Rn,{onResize:this.handleTabsResize},{default:()=>b})),m("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},S,p?m("div",{class:`${e}-tabs-pad`}):null,p?null:m("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),n&&o&&p?Vn(o,!0):null,_t(i,b=>b&&m("div",{class:`${e}-tabs-nav__suffix`},b))),h&&(this.animated?m("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},Nn(f,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Nn(f,this.mergedValue,this.renderedNames)))}});function Nn(e,t,n,o,r,a,l){const s=[];return e.forEach(c=>{const{name:i,displayDirective:f,"display-directive":u}=c.props,h=x=>f===x||u===x,p=t===i;if(c.key!==void 0&&(c.key=i),p||h("show")||h("show:lazy")&&n.has(i)){n.has(i)||n.add(i);const x=!h("if");s.push(x?be(c,[[Be,p]]):c)}}),l?m(ka,{name:`${l}-transition`,onBeforeLeave:o,onEnter:r,onAfterEnter:a},{default:()=>s}):s}function Vn(e,t){return m(dn,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Ln(e){const t=Ra(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function qt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const bl={class:"value"},vl=N({__name:"RulerLine",props:{scale:null,thick:null,palette:null,index:null,start:null,vertical:{type:Boolean},value:null,isShowReferLine:{type:Boolean}},emits:["onMouseDown","onRelease","onRemove"],setup(e,{emit:t}){const n=e,o=z(0),r=z(!0);Nt(()=>{o.value=n.value});const a=h=>{r.value=h>=0},l=L(()=>{const h=(o.value-n.start)*n.scale;a(h);const p=h+"px";return n.vertical?{top:p}:{left:p}}),s=L(()=>{var C,b;const h=`1px ${((C=n.palette)==null?void 0:C.lineBoardStyle)||"dashed"} ${(b=n.palette)==null?void 0:b.lineColor}`,p=n.vertical?{borderTop:h}:{borderLeft:h},x=n.isShowReferLine?n.vertical?"ns-resize":"ew-resize":"none";return Ct({cursor:x},p)}),c=L(()=>n.vertical?{left:n.thick+"px"}:{top:n.thick+"px"}),i=h=>{h.stopPropagation();const p=n.vertical?h.clientY:h.clientX,x=o.value;t("onMouseDown");const C=S=>{const k=n.vertical?S.clientY:S.clientX,P=Math.round(x+(k-p)/n.scale);o.value=P},b=()=>{t("onRelease",o.value,n.index),document.removeEventListener("mousemove",C,!0),document.removeEventListener("mouseup",b)};document.addEventListener("mousemove",C,!0),document.addEventListener("mouseup",b)},f=()=>{t("onRemove",n.index)},u=()=>[{text:"\u5220\u9664",subText:"",handler:()=>f()}];return(h,p)=>{const x=rt("contextmenu");return be((D(),Q("div",{class:"line",style:Le([g(l),g(s)]),onMousedown:i},[ue("div",{class:"action",style:Le(g(c))},[ue("span",bl,ot(o.value),1)],4)],36)),[[Be,r.value],[x,u,void 0,{stop:!0}]])}}});const gl=Ce(vl,[["__scopeId","data-v-15802f5c"]]),xl=e=>e<=.25?40:e<=.5?20:e<=1?10:e<=2?5:e<=4?2:1,Un=.83,yl=(e,t,n,o,r,a)=>{const{scale:l,width:s,height:c,ratio:i,palette:f}=r,{bgColor:u,fontColor:h,shadowColor:p,longfgColor:x,shortfgColor:C}=f;if(e.scale(i,i),e.clearRect(0,0,s,c),e.fillStyle=u,e.fillRect(0,0,s,c),o){const w=(n-t)*l,$=o*l;e.fillStyle=p,a?e.fillRect(w,0,$,c*3/8):e.fillRect(0,w,s*3/8,$)}const b=xl(l),S=b*l,k=b*10,P=k*l,E=Math.floor(t/b)*b,O=Math.floor(t/k)*k,I=(E-t)/b*S,v=(O-t)/k*P,y=t+Math.ceil((a?s:c)/l);e.beginPath(),e.fillStyle=h,e.strokeStyle=x;for(let w=O,$=0;w<y;w+=k,$++){const V=v+$*P+.5;a?e.moveTo(V,0):e.moveTo(0,V),e.save(),a?e.translate(V,c*.4):e.translate(s*.4,V),a||e.rotate(-Math.PI/2),e.scale(Un/i,Un/i),e.fillText(w.toString(),4*i,7*i),e.restore(),a?e.lineTo(V,c*9/16):e.lineTo(s*9/16,V)}e.stroke(),e.closePath(),e.beginPath(),e.strokeStyle=C;for(let w=E,$=0;w<y;w+=b,$++){const V=I+$*S+.5;a?e.moveTo(V,0):e.moveTo(0,V),w%k!==0&&(a?e.lineTo(V,c*1/4):e.lineTo(s*1/4,V))}e.stroke(),e.closePath(),e.setTransform(1,0,0,1,0,0)},_l=N({__name:"index",props:{showIndicator:{type:Boolean},valueNum:null,scale:null,ratio:null,palette:null,vertical:{type:Boolean},start:null,width:null,height:null,selectStart:null,selectLength:null},emits:["onAddLine","update:showIndicator","update:valueNum"],setup(e,{emit:t}){const n=e,o=De({canvasContext:null});let r=1;const a=z(null);Nt(()=>{r=n.ratio||window.devicePixelRatio||1,l(),s(r),c(r)});const l=()=>{o.canvasContext=a.value&&a.value.getContext("2d")},s=f=>{if(a.value){a.value.width=n.width*f,a.value.height=n.height*f;const u=o.canvasContext;u&&(u.font=`${12*f}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`,u.lineWidth=1,u.textBaseline="middle")}},c=f=>{const u={scale:n.scale,width:n.width,height:n.height,palette:n.palette,ratio:f};o.canvasContext&&yl(o.canvasContext,n.start,n.selectStart,n.selectLength,u,!n.vertical)};Ae(()=>n.start,()=>c(r)),Ae([()=>n.width,()=>n.height],()=>{s(r),c(r)});const i=(f,u)=>{const h=(C,b,S)=>Math.round(b+C/S),p=n.vertical?f.offsetY:f.offsetX,x=h(p,n.start,n.scale);switch(u){case"click":t("onAddLine",x);break;case"enter":t("update:valueNum",x),t("update:showIndicator",!0);break;default:t("update:valueNum",x);break}};return(f,u)=>(D(),Q("canvas",{ref_key:"canvas",ref:a,class:"ruler",onClick:u[0]||(u[0]=h=>i(h,"click")),onMouseenter:u[1]||(u[1]=h=>i(h,"enter")),onMousemove:u[2]||(u[2]=h=>i(h,"move")),onMouseleave:u[3]||(u[3]=h=>f.$emit("update:showIndicator",!1))},null,544))}}),wl={class:"lines"},Cl={class:"value"},Sl=N({__name:"RulerWrapper",props:{scale:null,ratio:null,thick:null,selectStart:null,selectLength:null,isShowReferLine:{type:Boolean},palette:null,vertical:{type:Boolean,default:!0},width:{default:200},height:{default:200},start:{default:0}},setup(e,{expose:t}){const n=e,o=z(!1),r=z(0),a=z([]),l=L(()=>n.vertical?"v-container":"h-container");t({clearLines:()=>{a.value=[]}});const c=L(()=>{const p={width:`calc(100% - ${n.thick}px)`,height:`${n.thick+1}px`,left:`${n.start}px`},x={width:`${n.thick&&n.thick+1}px`,height:`calc(100% - ${n.thick}px)`,top:`${n.start}px`};return n.vertical?x:p}),i=L(()=>{var b,S;const p=(r.value-(n.start||0))*n.scale;let x="top",C="borderLeft";return x=n.vertical?"top":"left",C=n.vertical?"borderBottom":"borderLeft",{[x]:p+"px",[C]:`1px ${((b=n.palette)==null?void 0:b.lineBoardStyle)||"dashed"} ${(S=n.palette)==null?void 0:S.lineColor}`}}),f=p=>{a.value.push(p)},u=(p,x)=>{const C=p-(n.start||0),b=(n.vertical?n.height||200:n.width||200)/n.scale;C<0||C>b?h(x):a.value[x]=p},h=p=>{a.value.splice(p,1)};return(p,x)=>(D(),Q("div",{class:Vt(g(l)),style:Le(g(c))},[F(_l,{vertical:e.vertical,scale:e.scale,width:e.width,height:e.height,start:e.start,ratio:e.ratio,"select-start":e.selectStart,"select-length":e.selectLength,palette:e.palette,valueNum:r.value,"onUpdate:valueNum":x[0]||(x[0]=C=>r.value=C),showIndicator:o.value,"onUpdate:showIndicator":x[1]||(x[1]=C=>o.value=C),onOnAddLine:f},null,8,["vertical","scale","width","height","start","ratio","select-start","select-length","palette","valueNum","showIndicator"]),be(ue("div",wl,[(D(!0),Q(Se,null,Te(a.value,(C,b)=>(D(),q(gl,{key:C+b,index:b,value:C>>0,scale:e.scale,start:e.start,thick:e.thick,palette:e.palette,vertical:e.vertical,"is-show-refer-line":e.isShowReferLine,onOnRemove:h,onOnRelease:u},null,8,["index","value","scale","start","thick","palette","vertical","is-show-refer-line"]))),128))],512),[[Be,e.isShowReferLine]]),be(ue("div",{class:"indicator",style:Le(g(i))},[ue("div",Cl,ot(r.value),1)],4),[[Be,o.value]])],6))}});const Mn=Ce(Sl,[["__scopeId","data-v-7b9de42f"]]),kl={id:"mb-ruler",class:"style-ruler mb-ruler"},Rl=N({__name:"Index",props:{scale:{default:1},ratio:{default:0},thick:{default:16},palette:null,startX:null,startY:null,width:{default:200},height:{default:200},shadow:null},setup(e){const t=e,n=z(null),o=z(null),r=z(!0),a=()=>{var c,i;(c=n.value)==null||c.clearLines(),(i=o.value)==null||i.clearLines(),r.value=!0},l=()=>[{text:"\u663E\u793A\u8F85\u52A9\u7EBF",subText:"",disable:r.value,handler:()=>r.value=!0},{text:"\u9690\u85CF\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:()=>r.value=!1},{text:"\u6E05\u7A7A\u8F85\u52A9\u7EBF",subText:"",disable:!r.value,handler:a}],s=L(()=>{function c(i,f){return Object.keys(i).forEach(u=>{u&&i.hasOwnProperty(u)&&(typeof f.key=="object"?i[u]=c(i[u],f[u]):f.hasOwnProperty(u)&&(i[u]=f[u]))}),i}return c({bgColor:"rgba(225,225,225, 0)",longfgColor:"#BABBBC",shortfgColor:"#C8CDD0",fontColor:"#7D8694",shadowColor:"#E8E8E8",lineColor:"#37d4cf",lineBoardStyle:"dashed",borderColor:"#DADADC",cornerActiveColor:"rgb(235, 86, 72, 0.6)",menu:{bgColor:"#fff",dividerColor:"#DBDBDB",listItem:{textColor:"#415058",hoverTextColor:"#298DF8",disabledTextColor:"rgba(65, 80, 88, 0.4)",bgColor:"#fff",hoverBgColor:"#F2F2F2"}}},t.palette||{})});return(c,i)=>{var u,h,p,x;const f=rt("contextmenu");return be((D(),Q("div",kl,[F(Mn,{vertical:!1,ref_key:"HRulerWrapperref",ref:o,width:e.width,height:16,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startX,"select-start":((u=e.shadow)==null?void 0:u.x)||0,"select-length":((h=e.shadow)==null?void 0:h.width)||0,scale:e.scale,palette:g(s)},null,8,["width","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"]),F(Mn,{vertical:!0,ref_key:"VRulerWrapperref",ref:n,width:16,height:e.height,"is-show-refer-line":r.value,thick:e.thick,ratio:e.ratio,start:e.startY,"select-start":((p=e.shadow)==null?void 0:p.y)||0,"select-length":((x=e.shadow)==null?void 0:x.height)||0,scale:e.scale,palette:g(s)},null,8,["height","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"])])),[[f,l,void 0,{stop:!0}]])}}});const $l=N({__name:"Ruler",props:{width:null,height:null,isShowReferLine:{type:Boolean}},setup(e){const r={h:[],v:[]},a=20;return(l,s)=>(D(),q(g(Rl),{thick:a,scale:1,width:e.width,height:e.height,startX:0,startY:0,lines:r,isShowReferLine:e.isShowReferLine},null,8,["width","height","isShowReferLine"]))}});const Dl=Ce($l,[["__scopeId","data-v-31710d38"]]),Bl=N({__name:"Area",props:{start:null,width:null,height:null},setup(e){const t=io(),n=()=>{t.compose(),Fe.emit("hideArea")},o=()=>{t.flushLeft(),Fe.emit("hideArea")},r=()=>{t.flushRight(),Fe.emit("hideArea")},a=()=>{t.flushTop(),Fe.emit("hideArea")},l=()=>{t.flushBottom(),Fe.emit("hideArea")},s=()=>{t.flushRow(),Fe.emit("hideArea")},c=()=>{t.flushColumn(),Fe.emit("hideArea")},i=()=>{t.batchDeleteComponent(t.components),Fe.emit("hideArea")},f=()=>[{text:"\u7EC4\u5408",subText:"",disable:!t.canCompose,handler:n},{divider:!0},{text:"\u5220\u9664",subText:"Ctrl + Delete",disable:t.components.length<=0,handler:i},{divider:!0},{text:"\u5DE6\u5BF9\u9F50",subText:"",handler:o},{text:"\u53F3\u5BF9\u9F50",subText:"",handler:r},{text:"\u9876\u5BF9\u9F50",subText:"",handler:a},{text:"\u5E95\u5BF9\u9F50",subText:"",handler:l},{divider:!0},{text:"\u6C34\u5E73\u5BF9\u9F50",subText:"",handler:s},{text:"\u5782\u76F4\u5BF9\u9F50",subText:"",handler:c}];return(u,h)=>{const p=rt("contextmenu");return be((D(),Q("div",{style:Le({left:e.start.x+"px",top:e.start.y+"px",width:e.width+"px",height:e.height+"px"}),class:"area"},null,4)),[[p,f,void 0,{stop:!0}]])}}});const On=Ce(Bl,[["__scopeId","data-v-a1be5080"]]);const zl={},Il={class:"grid",width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},Fl=$a('<defs data-v-9ff3aadd><pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse" data-v-9ff3aadd><path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1" data-v-9ff3aadd></path></pattern><pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse" data-v-9ff3aadd><rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)" data-v-9ff3aadd></rect><path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.5)" stroke-width="1" data-v-9ff3aadd></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" data-v-9ff3aadd></rect>',2),El=[Fl];function Pl(e,t){return D(),Q("svg",Il,El)}const Al=Ce(zl,[["render",Pl],["__scopeId","data-v-9ff3aadd"]]),Tl={class:"mark-line"},Nl=N({__name:"MarkLine",setup(e){const t=ke(),n=z([]),o=De(["xt","xc","xb","yl","yc","yr"]),r=z(3),a=De({xt:!1,xc:!1,xb:!1,yl:!1,yc:!1,yr:!1}),l=h=>{n.value.push(h)},s=()=>{Object.keys(a).forEach(h=>{a[h]=!1})};zt("move",h=>{c(h.isDownward,h.isRightward)}),zt("unmove",()=>{s()});const c=(h,p)=>{const x=t.componentData;if(t.curComponent){const{top:C,left:b,right:S,bottom:k}=tn(t.curComponent.positionStyle),P=(S-b)/2,E=(k-C)/2;s(),x.forEach(O=>{if(O==t.curComponent)return;const I=tn(O.positionStyle),{top:v,left:y,bottom:w,right:$}=I,V=($-y)/2,G=(w-v)/2,ie={top:[{isNearly:i(C,v),lineNode:n.value[0],line:"xt",dragShift:v,lineShift:v},{isNearly:i(k,v),lineNode:n.value[0],line:"xt",dragShift:v-(k-C||0),lineShift:v},{isNearly:i((C||0)+E,v+G),lineNode:n.value[1],line:"xc",dragShift:v+G-E,lineShift:v+G},{isNearly:i(C,w),lineNode:n.value[2],line:"xb",dragShift:w,lineShift:w},{isNearly:i(k,w),lineNode:n.value[2],line:"xb",dragShift:w-(k-C||0),lineShift:w}],left:[{isNearly:i(b,y),lineNode:n.value[3],line:"yl",dragShift:y,lineShift:y},{isNearly:i(S,y),lineNode:n.value[3],line:"yl",dragShift:y-(S-b||0),lineShift:y},{isNearly:i((b||0)+P,y+V),lineNode:n.value[4],line:"yc",dragShift:y+V-P,lineShift:y+V},{isNearly:i(b,$),lineNode:n.value[5],line:"yr",dragShift:$,lineShift:$},{isNearly:i(S,$),lineNode:n.value[5],line:"yr",dragShift:$-(S-b||0),lineShift:$}]},se=[],{rotate:H}=t.curComponent.style;Object.keys(ie).forEach(Z=>{ie[Z].forEach(W=>{if(!W.isNearly)return;const Y=H!=0?f(Z,W,{width:S-b,height:k-C}):W.dragShift;t.setCurComponentStyle(Z,Y),W.lineNode.style[Z]=`${W.lineShift}px`,se.push(W.line)})}),se.length&&u(se,h,p)})}},i=(h,p)=>Math.abs(h-p)<=r.value,f=(h,p,x)=>{const{width:C,height:b}=t.curComponent.style;return h=="top"?Math.round(p.dragShift-(b-x.height)/2):Math.round(p.dragShift-(C-x.width)/2)},u=(h,p,x)=>{x?h.includes("yr")?a.yr=!0:h.includes("yc")?a.yc=!0:h.includes("yl")&&(a.yl=!0):h.includes("yl")?a.yl=!0:h.includes("yc")?a.yc=!0:h.includes("yr")&&(a.yr=!0),p?h.includes("xb")?a.xb=!0:h.includes("xc")?a.xc=!0:h.includes("xt")&&(a.xt=!0):h.includes("xt")?a.xt=!0:h.includes("xc")?a.xc=!0:h.includes("xb")&&(a.xb=!0)};return(h,p)=>(D(),Q("div",Tl,[(D(!0),Q(Se,null,Te(o,x=>be((D(),Q("div",{key:x,class:Vt(["line",x.includes("x")?"xline":"yline"]),ref_for:!0,ref:l},null,2)),[[Be,a[x]||!1]])),128))]))}});const Vl=Ce(Nl,[["__scopeId","data-v-a18c1d1e"]]),Ll=["onMousedown"],Ul=N({__name:"Index",setup(e){const t=ke(),n=io(),o=so(),r=H=>Dn(H,["top","left","width","height","rotate"]),a=L(()=>n.style.width>0&&!v.value&&!t.isClickComponent),l=L(()=>({x:n.style.left,y:n.style.top})),s=L(()=>n.style.width),c=L(()=>n.style.height),i=()=>{v.value=!1,O.value=0,I.value=0,n.setAreaData({left:0,top:0,width:0,height:0},[])},f=()=>{t.clearCanvas()},u=(H,Z)=>{const W=document.querySelector("#editor").getBoundingClientRect(),Y=Z.pageY-W.top,pe=Z.pageX-W.left;o.paste(!0,pe,Y)},h=()=>[{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:u},{text:"\u6E05\u7A7A\u753B\u5E03",subText:"",handler:f}];zt("hideArea",i),Nt(()=>{console.log("\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F"),t.setEditMode($n.EDIT),document.addEventListener("paste",S)}),Zn(()=>{console.log("\u8FDB\u5165\u9884\u89C8\u6A21\u5F0F"),t.setEditMode($n.PREVIEW),document.removeEventListener("paste",S),t.clearCanvas()});const p=L(()=>t.componentData),x=L(()=>t.canvasStyleData),C=L(()=>t.curComponent),b=L(()=>{const H=Ut(Ct({},x.value),{backgroundImage:x.value.image,backgroundSize:"cover",backgroundColor:x.value.color||"#084860"});return Dn(H,["width","height","backgroundImage","backgroundSize","backgroundColor"])}),S=H=>{if(H.clipboardData){const Z=H.clipboardData.getData("text");try{const W=Da(JSON.parse(Z));W&&(W.change("top",W.positionStyle.top+10),W.change("left",W.positionStyle.left+10),W.id=Jn(),o.copy(W),H.preventDefault(),H.stopPropagation(),t.appendComponent(W))}catch(W){console.log(W)}}},k=z(0),P=z(0),E=De({x:0,y:0}),O=z(0),I=z(0),v=z(!0),y=z(null),w=z(!0),$=H=>{var ge;t.setClickComponentStatus(!1),H.preventDefault(),H.stopPropagation(),i();const Z=(ge=y.value)==null?void 0:ge.getBoundingClientRect();k.value=Z.x,P.value=Z.y;const W=H.clientX,Y=H.clientY;E.x=W-k.value,E.y=Y-P.value,v.value=!0;const pe=oe=>{oe.preventDefault(),oe.stopPropagation(),O.value=Math.abs(oe.clientX-W),I.value=Math.abs(oe.clientY-Y),oe.clientX<W&&(E.x=oe.clientX-k.value),oe.clientY<Y&&(E.y=oe.clientY-P.value)},fe=oe=>{if(document.removeEventListener("mousemove",pe),document.removeEventListener("mouseup",fe),oe.clientX==W&&oe.clientY==Y){i();return}const _e={left:E.x,top:E.y,right:O.value+E.x,bottom:E.y+I.value},ce=V(_e);if(ce){const ae=ce.rect;n.setAreaData({top:ae.top,left:ae.left,width:ae.right-ae.left,height:ae.bottom-ae.top,rotate:0},ce.components),E.x=ae.left,E.y=ae.top,O.value=ae.right-ae.left,I.value=ae.bottom-ae.top}else i()};document.addEventListener("mousemove",pe),document.addEventListener("mouseup",fe)},V=H=>{const Z=[],W=new Set,Y=new Set,pe=new Set,fe=new Set;if(t.componentData.forEach(ge=>{const{width:oe,height:_e,left:ce,top:ae,rotate:ne}=ge.style,xe=tn({width:oe,height:_e,left:ce,top:ae,rotate:ne});xe.left>=H.left&&xe.right<=H.right&&xe.top>=H.top&&xe.bottom<=H.bottom&&(Z.push(ge),W.add(xe.left),Y.add(xe.top),pe.add(xe.right),fe.add(xe.bottom))}),Z.length>0){const ge=Math.min(...W),oe=Math.max(...pe),_e=Math.min(...Y),ce=Math.max(...fe);return{components:Z,rect:{left:ge,right:oe,top:_e,bottom:ce}}}},G=H=>$e(this,null,function*(){H.preventDefault(),H.stopPropagation();const Z=H.dataTransfer.getData("componentName");if(Z){const W=new nn[Z],Y=document.querySelector("#editor").getBoundingClientRect(),pe=H.pageY-Y.top,fe=H.pageX-Y.left;W.change("top",pe),W.change("left",fe),t.appendComponent(W)}}),ie=H=>{H.preventDefault(),H.dataTransfer.dropEffect="copy"},se=()=>{t.isClickComponent||t.setCurComponent(void 0)};return(H,Z)=>{const W=rt("contextmenu");return be((D(),Q("div",{class:"editor edit",ref_key:"editor",ref:y,id:"editor",style:Le(g(b)),onMousedown:pn($,["left"]),onDrop:G,onDragover:ie,onMouseup:se},[F(Al),F(Dl,{width:g(x).width,height:g(x).height,isShowReferLine:w.value},null,8,["width","height","isShowReferLine"]),(D(!0),Q(Se,null,Te(g(p),(Y,pe)=>(D(),Q(Se,{key:Y.id},[g(t).isEditMode&&Y.display?(D(),q(g(Xa),{key:0,id:"shape"+Y.id,defaultStyle:Y.style,style:Le(r(Y.style)),active:Y.id===(g(C)||{}).id,info:Y,class:Vt({lock:Y.locked}),index:pe},{default:M(()=>[(D(),q(Ba(Y.component),{class:"component",style:Le(g(za)(Y)),component:Y,id:"component"+Y.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):tt("",!0)],64))),128)),F(Vl),v.value?(D(),q(On,{key:0,start:E,width:O.value,height:I.value},null,8,["start","width","height"])):g(a)?(D(),q(On,{key:1,start:g(l),width:g(s),height:g(c)},null,8,["start","width","height"])):tt("",!0)],44,Ll)),[[W,h,void 0,{stop:!0}]])}}});const Ml=Ce(Ul,[["__scopeId","data-v-ef21d6f9"]]),yo=Ia(),We=ke(),Rt=Qn(),Ol=()=>$e(void 0,null,function*(){const e=yield yo.lastRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Ne.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),jl=()=>$e(void 0,null,function*(){const e=yield yo.nextRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Ne.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),Hl=()=>{We.toggleShowEm()},Wl=e=>{const t=`${We.name}`||"OpenDataV";Fa(`${t}.json`,JSON.stringify({id:e,name:t,canvasData:We.layoutData,canvasStyle:We.canvasStyleData}))},Xl=()=>{Ea(Gl,".json")},Gl=e=>{if(e.target&&e.target.result){const t=JSON.parse(e.target.result);t&&(We.setComponentData(t.canvasData),We.setCanvasStyle(t.canvasStyle))}},ql=()=>{Rt.setNavTheme(Rt.darkTheme?"dark":"light"),Rt.setDarkTheme(!Rt.darkTheme)},Kl=N({__name:"ThemeIcon",setup(e){const t=Qn(),n=L(()=>t.darkTheme?"sun-one":"moon");return(o,r)=>{const a=mt("icon-park");return D(),q(a,{name:g(n)},null,8,["name"])}}}),Yl="2946854",Zl="\u65B9\u5411",Jl="iconfont",Ql="icon-",ei="",ti=[{icon_id:"11291350",name:"\u7EC4",font_class:"zu",unicode:"e854",unicode_decimal:59476},{icon_id:"1817751",name:"\u67F1\u5F62\u56FE",font_class:"zhuxingtu",unicode:"e626",unicode_decimal:58918},{icon_id:"3868284",name:"\u4EEA\u8868\u76D8",font_class:"yibiaopan",unicode:"eb67",unicode_decimal:60263},{icon_id:"4354243",name:"\u56FE\u8868-\u997C\u56FE",font_class:"tubiao-bingtu",unicode:"eb95",unicode_decimal:60309},{icon_id:"4354246",name:"\u56FE\u8868-\u5361\u7247",font_class:"tubiao-qiapian",unicode:"eb96",unicode_decimal:60310},{icon_id:"4354248",name:"\u56FE\u8868-\u6298\u7EBF\u56FE",font_class:"tubiao-zhexiantu",unicode:"eb97",unicode_decimal:60311},{icon_id:"4906240",name:"\u6309\u94AE\u7EC4",font_class:"anniuzu",unicode:"e782",unicode_decimal:59266},{icon_id:"5383645",name:"\u5BFC\u822A",font_class:"daohang",unicode:"e77d",unicode_decimal:59261},{icon_id:"5961366",name:"\u5217\u8868",font_class:"liebiao",unicode:"ec6b",unicode_decimal:60523},{icon_id:"5971297",name:"\u91C7\u7164\u673A",font_class:"caimeiji",unicode:"e603",unicode_decimal:58883},{icon_id:"7040619",name:"\u5176\u4ED6",font_class:"qita",unicode:"e63b",unicode_decimal:58939},{icon_id:"7556180",name:"\u5B9A\u5236",font_class:"dingzhi",unicode:"e609",unicode_decimal:58889},{icon_id:"9752796",name:"\u57FA\u7840",font_class:"jichu",unicode:"e60f",unicode_decimal:58895},{icon_id:"9921108",name:"chart",font_class:"chartt",unicode:"e60a",unicode_decimal:58890},{icon_id:"14475731",name:"\u88C5\u9970\u88C5\u4FEE",font_class:"zhuangshizhuangxiu",unicode:"e6a6",unicode_decimal:59046},{icon_id:"16562592",name:"\u6E29\u5EA6\u8BA1",font_class:"wenduji",unicode:"e6de",unicode_decimal:59102},{icon_id:"22712019",name:"\u6761\u5F62\u8FDB\u5EA6\u56FE",font_class:"tiaoxingjindutu",unicode:"e66b",unicode_decimal:58987},{icon_id:"22761375",name:"\u8FB9\u6846",font_class:"biankuang",unicode:"e6b7",unicode_decimal:59063},{icon_id:"22885432",name:"\u8FDB\u5EA6\u56FE",font_class:"jindutu",unicode:"f24b",unicode_decimal:62027},{icon_id:"124495",name:"\u8B66\u544A",font_class:"jinggao1",unicode:"e601",unicode_decimal:58881},{icon_id:"1846445",name:"\u9884\u8B66\u706F",font_class:"yujingdeng",unicode:"e67f",unicode_decimal:59007},{icon_id:"2239579",name:"\u81EA\u52A8\u7CFB\u7EDF\u8B66\u544A\u706F",font_class:"zidongxitongjinggaodeng1",unicode:"e605",unicode_decimal:58885},{icon_id:"4988542",name:"\u9884\u8B66",font_class:"yujing1",unicode:"e644",unicode_decimal:58948},{icon_id:"9974390",name:"\u9884\u8B66",font_class:"yujing3",unicode:"e6fe",unicode_decimal:59134},{icon_id:"10817515",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng",unicode:"e64b",unicode_decimal:58955},{icon_id:"14151833",name:"\u62A5\u8B66",font_class:"baojing1",unicode:"e630",unicode_decimal:58928},{icon_id:"16965399",name:"\u8B66\u544A\u706F",font_class:"hong",unicode:"e60d",unicode_decimal:58893},{icon_id:"20379044",name:"\u9884\u8B66\u706F",font_class:"yujingdeng1",unicode:"e623",unicode_decimal:58915},{icon_id:"23819336",name:"\u62A5\u8B66 \u8B66\u544A \u9884\u8B66 \u8B66\u544A\u706F",font_class:"a-baojingjinggaoyujingjinggaodeng",unicode:"e628",unicode_decimal:58920},{icon_id:"24312218",name:"light",font_class:"light",unicode:"e63a",unicode_decimal:58938},{icon_id:"24614518",name:"\u544A\u8B66\u706F",font_class:"gaojingdeng9",unicode:"e664",unicode_decimal:58980},{icon_id:"25567211",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng1",unicode:"e613",unicode_decimal:58899},{icon_id:"12041083",name:"\u9884\u8B66",font_class:"yujing5",unicode:"e671",unicode_decimal:58993},{icon_id:"577357",name:"\u5220\u9664",font_class:"shanchu",unicode:"e74b",unicode_decimal:59211},{icon_id:"1986988",name:"\u5220\u9664",font_class:"shanchu1",unicode:"e625",unicode_decimal:58917},{icon_id:"12795401",name:"\u9996\u9875",font_class:"shouye",unicode:"e62d",unicode_decimal:58925},{icon_id:"201556",name:"\u67E5\u770B",font_class:"chakan",unicode:"e600",unicode_decimal:58880},{icon_id:"201638",name:"\u7F16\u8F91",font_class:"bianji",unicode:"e602",unicode_decimal:58882},{icon_id:"11729723",name:"\u590D\u5236",font_class:"fuzhi",unicode:"e608",unicode_decimal:58888},{icon_id:"7269302",name:"\u9996\u9875-\u9ED8\u8BA4",font_class:"shouye-moren",unicode:"e619",unicode_decimal:58905},{icon_id:"658044",name:"\u89E3\u9501",font_class:"jiesuo",unicode:"e669",unicode_decimal:58985},{icon_id:"10097949",name:"\u65CB\u8F6C",font_class:"xuanzhuan",unicode:"e680",unicode_decimal:59008},{icon_id:"374774",name:"\u5F00\u5173",font_class:"kaiguan",unicode:"e61f",unicode_decimal:58911},{icon_id:"122162",name:"\u65F6\u949F",font_class:"clock",unicode:"e63e",unicode_decimal:58942},{icon_id:"1242185",name:"\u53CD\u9988\u4FE1\u606F",font_class:"fankuixinxi",unicode:"e660",unicode_decimal:58976},{icon_id:"2468505",name:"37\u7C7B\u5EFA\u7B51\u4FEE\u7406x16",font_class:"leijianzhuxiulix",unicode:"e695",unicode_decimal:59029},{icon_id:"11747267",name:"\u65F6\u95F4",font_class:"weibiaoti-",unicode:"e618",unicode_decimal:58904},{icon_id:"14794143",name:"sds_\u7B2C37\u7C7B \u5EFA\u7B51\u4FEE\u7406",font_class:"sds_di37leijianzhuxiuli",unicode:"e61e",unicode_decimal:58910},{icon_id:"17762035",name:"\u8054\u52A8\u63A7\u5236",font_class:"liandongkongzhi",unicode:"e624",unicode_decimal:58916},{icon_id:"18165278",name:"\u9501,\u5BC6\u7801,\u5F00\u9501,\u89E3\u9501",font_class:"unlock-full",unicode:"e882",unicode_decimal:59522},{icon_id:"288554",name:"ascend",font_class:"ascend",unicode:"e6b4",unicode_decimal:59060},{icon_id:"288556",name:"falling",font_class:"falling",unicode:"e6b6",unicode_decimal:59062},{icon_id:"815867",name:"\u6309\u94AE-\u5173",font_class:"buttonoff",unicode:"e614",unicode_decimal:58900},{icon_id:"815872",name:"\u6309\u94AE-\u5F00",font_class:"buttonon",unicode:"e615",unicode_decimal:58901},{icon_id:"2674878",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushang",unicode:"e62c",unicode_decimal:58924},{icon_id:"2674928",name:"\u7BAD\u5934 \u53F3",font_class:"jiantouyou",unicode:"e632",unicode_decimal:58930},{icon_id:"2674929",name:"\u7BAD\u5934 \u4E0B",font_class:"jiantouxia",unicode:"e633",unicode_decimal:58931},{icon_id:"7594038",name:"24gl-next",font_class:"24gl-next",unicode:"ea6b",unicode_decimal:60011},{icon_id:"7594046",name:"24gl-pauseCircle",font_class:"24gl-pauseCircle",unicode:"ea6f",unicode_decimal:60015},{icon_id:"7594068",name:"24gl-previous",font_class:"24gl-previous",unicode:"ea73",unicode_decimal:60019},{icon_id:"7594086",name:"24gl-stopCircle",font_class:"24gl-stopCircle",unicode:"ea79",unicode_decimal:60025},{icon_id:"10268256",name:"\u6309\u94AE_\u5F00\u542F",font_class:"anniu_kaiqi",unicode:"e659",unicode_decimal:58969},{icon_id:"10268257",name:"\u6309\u94AE_\u5173\u95ED",font_class:"anniu_guanbi",unicode:"e65b",unicode_decimal:58971},{icon_id:"25807963",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushangzuo-copy",unicode:"ec63",unicode_decimal:60515},{icon_id:"25808146",name:"\u5411\u53F32",font_class:"xiangzuo2-copy",unicode:"ec64",unicode_decimal:60516},{icon_id:"166602",name:"\u5173\u95ED\u64AD\u653E",font_class:"guanbibofang",unicode:"e61d",unicode_decimal:58909},{icon_id:"577396",name:"\u5411\u4E0A3",font_class:"xiangshang3",unicode:"e76f",unicode_decimal:59247},{icon_id:"577401",name:"\u5411\u4E0B5",font_class:"xiangxia5",unicode:"e774",unicode_decimal:59252},{icon_id:"577403",name:"\u5411\u53F32",font_class:"xiangyou2",unicode:"e776",unicode_decimal:59254},{icon_id:"1159910",name:"\u53F3\u64AD\u653E",font_class:"youbofang",unicode:"e62e",unicode_decimal:58926},{icon_id:"1159911",name:"\u5DE6\u64AD\u653E",font_class:"zuobofang",unicode:"e62f",unicode_decimal:58927},{icon_id:"1185945",name:"\u64AD\u653E",font_class:"bofang2",unicode:"e606",unicode_decimal:58886},{icon_id:"1488892",name:"\u64AD\u653E",font_class:"bofang5",unicode:"e607",unicode_decimal:58887},{icon_id:"1727559",name:"323\u5411\u5DE6\u4EA4\u6362",font_class:"xiangzuojiaohuan",unicode:"e8f8",unicode_decimal:59640},{icon_id:"1727561",name:"324\u5411\u53F3\u4EA4\u6362",font_class:"xiangyoujiaohuan",unicode:"e8f9",unicode_decimal:59641},{icon_id:"2076218",name:"\u64AD\u653E2",font_class:"bofang6",unicode:"e87c",unicode_decimal:59516},{icon_id:"7594051",name:"24gl-playCircle",font_class:"24gl-playCircle",unicode:"ea6e",unicode_decimal:60014},{icon_id:"11121478",name:"\u5411\u4E0A",font_class:"xiangshang7",unicode:"e63c",unicode_decimal:58940},{icon_id:"16388177",name:"\u64AD\u653E",font_class:"bofang26",unicode:"e60e",unicode_decimal:58894},{icon_id:"18176557",name:"\u64AD\u653E",font_class:"play1",unicode:"ea8d",unicode_decimal:60045},{icon_id:"24267227",name:"\u64AD\u653E-\u5FEB\u9000",font_class:"bofang-kuaitui",unicode:"e68a",unicode_decimal:59018},{icon_id:"24267260",name:"\u64AD\u653E09",font_class:"bofang09",unicode:"e690",unicode_decimal:59024},{icon_id:"24268374",name:"\u64AD\u653E-\u5FEB\u8FDB",font_class:"bofang-kuaijin",unicode:"e6d8",unicode_decimal:59096},{icon_id:"25807740",name:"\u5411\u4E0A",font_class:"xiangxia7",unicode:"ec62",unicode_decimal:60514}],ni={id:Yl,name:Zl,font_family:Jl,css_prefix_text:Ql,description:ei,glyphs:ti},oi={class:"icon-list"},ai=["onClick"],ri=N({__name:"IconFont",setup(e){const t=L(()=>ni.glyphs.map(a=>`icon-${a.font_class}`)),n=z(!0),o=()=>{n.value=!1},r=a=>{no(a),Ne.success(`\u590D\u5236\u56FE\u6807: ${a}`)};return(a,l)=>(D(),q(to,null,{default:M(()=>[F(g(eo),{class:"show-card",show:n.value,preset:"card",onMaskClick:o,title:`\u56FE\u6807\u6570\u91CF${g(t).length}`,onClose:o,"onUpdate:show":l[0]||(l[0]=()=>n.value=!1),style:{width:"50%",maxWidth:"800px"}},{default:M(()=>[ue("ul",oi,[(D(!0),Q(Se,null,Te(g(t),s=>(D(),Q("li",{key:s,class:"dib",onClick:c=>r(s)},[ue("span",{class:Vt(`icon iconfont ${s}`)},null,2)],8,ai))),128))])]),_:1},8,["show","title"])]),_:1}))}});const li=Ce(ri,[["__scopeId","data-v-538b9921"]]),ii=()=>{const e=F(li,{},null),t=document.createElement("div"),n=document.querySelector("#app");oo(e,t),n==null||n.appendChild(t)},si=ii,ci={class:"dialog-footer"},di=fn("\u53D6\u6D88"),ui=fn("\u65B0\u589E"),pi=fn("\u66F4\u65B0"),fi=N({__name:"SavePage",props:{index:null},setup(e){const t=e,n=ke(),o=z(!0),r=De({name:"",thumbnail:""}),a=De({name:[{required:!0,message:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0",trigger:"blur"}]}),l=s=>$e(this,null,function*(){const{name:c,thumbnail:i}=r;if(!c){Ne.error("\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0");return}const f={name:c,thumbnail:i,canvasData:n.layoutData,canvasStyle:n.canvasStyleData};if(s==="update")try{(yield Ga(t.index,f)).status===200&&Ne.success("\u4FEE\u6539\u6210\u529F")}catch(u){Ne.error("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5BFC\u51FA\u5230\u672C\u5730\uFF0C\u5E76\u91CD\u65B0\u8FDB\u5165\u6B64\u9875\u9762")}finally{o.value=!1}else try{const u=yield qa(f);u.status===201&&(Ne.success("\u4FDD\u5B58\u6210\u529F"),Pa.push({name:"Editor",params:{index:u.data.id}}))}catch(u){Ne.error(`\u4FDD\u5B58\u5931\u8D25\uFF0C\u5931\u8D25\u4FE1\u606F:${(u==null?void 0:u.message)||u}`)}finally{o.value=!1}});return(s,c)=>(D(),q(to,null,{default:M(()=>[F(g(eo),{show:o.value,"mask-closable":!1,preset:"card",center:"",title:"\u4FDD\u5B58\u5F53\u524D\u5E03\u5C40",style:{width:"30%",minWidth:"600px"},"onUpdate:show":c[5]||(c[5]=()=>o.value=!1),size:"medium"},{footer:M(()=>[ue("span",ci,[F(g(et),{onClick:c[2]||(c[2]=i=>o.value=!1)},{default:M(()=>[di]),_:1}),e.index?(D(),q(g(et),{key:1,type:"primary",onClick:c[4]||(c[4]=i=>l("update"))},{default:M(()=>[pi]),_:1})):(D(),q(g(et),{key:0,type:"primary",onClick:c[3]||(c[3]=i=>l("new"))},{default:M(()=>[ui]),_:1}))])]),default:M(()=>[F(g(mn),{model:r,rules:a,onSubmit:c[1]||(c[1]=pn(()=>{},["prevent"]))},{default:M(()=>[F(g(It),{label:"\u9875\u9762\u540D\u79F0",prop:"name"},{default:M(()=>[F(g(at),{modelValue:r.name,"onUpdate:modelValue":c[0]||(c[0]=i=>r.name=i),placeholder:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1}))}}),hi=e=>{const t=F(fi,{index:e},null),n=document.createElement("div");oo(t,n)},mi=hi,jn=N({__name:"ToolBarItem",props:{label:null,action:null,disable:{type:Function,default:()=>!1},icon:null,divider:{type:[Boolean,null]},children:null,otherShow:null},setup(e){const t=e,n=L(()=>typeof t.icon=="string"?m(Me,{name:t.icon,size:"24"}):t.icon());return(o,r)=>(D(),Q(Se,null,[F(g(Aa),null,{trigger:M(()=>[F(g(et),{quaternary:"",size:"small",onClick:e.action,title:e.label},{default:M(()=>[F(g(n))]),_:1},8,["onClick","title"])]),default:M(()=>[ue("span",null,ot(e.label),1)]),_:1}),e.divider?(D(),q(g(Ta),{key:0,vertical:""})):tt("",!0)],64))}}),bi={class:"tool-bar"},vi={class:"tool-bar-item"},gi={class:"tool-bar-title"},xi={class:"tool-bar-item"},yi=N({__name:"Toolbar",setup(e){const t=ke(),n=Na(),o=ao(),r=[{label:"\u9996\u9875",action:s=>{n.push({name:"Pages"})},icon:"home",divider:!0,location:"left"},{label:"\u4FDD\u5B58",action:()=>mi(o.params.index),icon:"save-one",location:"left"},{label:"\u9884\u89C8",action:s=>{const{href:c}=n.resolve("/preview");window.open(c,"_blank")},icon:"computer",location:"left"},{label:"\u64A4\u9500",action:Ol,icon:"back",location:"left"},{label:"\u6062\u590D",action:jl,icon:"next",location:"left"},{label:"\u5BFC\u51FA",action:()=>Wl(o.params.index||""),icon:"download-one",location:"left"},{label:"\u5BFC\u5165",action:Xl,icon:"upload-one",location:"left"},{label:"\u5168\u5C4F",action:()=>{const s=document.querySelector("#editor");document.fullscreenEnabled&&s&&s.requestFullscreen()},icon:"full-screen",location:"left"},{label:"\u5750\u6807",action:Hl,icon:"cones",location:"left"},{label:"\u56FE\u6807",action:si,icon:"game-ps",location:"right"},{label:"\u4E3B\u9898",action:ql,icon:()=>m(Kl),location:"right"}],a=r.filter(s=>s.location==="left"),l=r.filter(s=>s.location==="right");return(s,c)=>(D(),Q("div",bi,[ue("div",vi,[(D(!0),Q(Se,null,Te(g(a),(i,f)=>(D(),q(jn,{key:f,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))]),ue("div",gi,ot(g(t).name),1),ue("div",xi,[(D(!0),Q(Se,null,Te(g(l),(i,f)=>(D(),q(jn,{key:f,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))])]))}});const _i=Ce(yi,[["__scopeId","data-v-4243bd17"]]),wi=["data-component"],Ci=N({__name:"ComponentItem",props:{component:null,name:null},setup(e){return(t,n)=>(D(),Q("div",{draggable:"true","data-component":e.component},[ue("div",null,ot(e.name),1)],8,wi))}}),Si={class:"components"},Hn=N({__name:"ComponentList",setup(e){const t=L(()=>{const o={};Object.keys(nn).forEach(a=>{const l=new nn[a],s=l.group;!s||!l.show||(o[s]||(o[s]=[]),o[s].push(l))});const r=[];return ro.forEach(a=>{var l;r.push({label:()=>a.name,key:a.key,icon:()=>m(Me,{name:`${a.icon}`}),children:(l=o[a.key])==null?void 0:l.map(s=>({label:()=>m(Ci,{component:s.component,name:s.name,ondragstart:n}),key:s.component}))})}),r}),n=o=>{o.dataTransfer.setData("componentName",o.target.dataset.component)};return(o,r)=>(D(),Q("div",Si,[F(g(hn),{options:g(t),accordion:!1},null,8,["options"])]))}}),ki={key:0,class:"layer"},Ri={key:1,class:"layer"},$i=N({__name:"LayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=ke(),r=(s,c)=>{var i;(i=s.dataTransfer)==null||i.setData("compomentIndex",c),s.stopPropagation()},a=(s,c,i=!1)=>{s.preventDefault(),s.stopPropagation(),i&&c!==n.activeKey&&Fe.emit("ActiveMenu",c)},l=(s,c)=>{var b;s.preventDefault(),s.stopPropagation();const i=(b=s.dataTransfer)==null?void 0:b.getData("compomentIndex");if(!Va(i,c))return;const u=i.split("-").map(S=>Number(S)),h=o.getComponentByIndex(u),p=on(h),x=c.split("-").map(S=>Number(S)),C=o.getComponentByIndex(x);if(p&&C&&c){const S=C.id;o.cutComponent(u[u.length-1],h==null?void 0:h.parent);const k=C.parent||void 0,E=(k?k.subComponents:o.componentData).findIndex(O=>O.id===S);o.insertComponent(E,p,k),t("select",c)}};return(s,c)=>{const i=mt("icon-park"),f=rt("contextmenu");return be((D(),Q("div",{draggable:"true",onDragstart:c[0]||(c[0]=u=>r(u,e.index)),onDrop:c[1]||(c[1]=u=>l(u,e.index)),onDragover:c[2]||(c[2]=u=>a(u,e.index,!0))},[e.component.component==="Group"?(D(),Q("div",ki,[be(ue("span",null,ot(e.component.name||"\u5206\u7EC4"),513),[[Be,e.mode==="expand"]]),e.component.display?(D(),q(i,{key:0,name:"preview-open",size:"15"})):(D(),q(i,{key:1,name:"preview-close-one",size:"15"}))])):(D(),Q("div",Ri,[be(ue("span",null,ot(e.component.name),513),[[Be,e.mode==="expand"]]),e.component.display?(D(),q(i,{key:0,size:"15",name:"preview-open"})):(D(),q(i,{key:1,size:"15",name:"preview-close-one"}))]))],32)),[[f,e.contextmenus,void 0,{stop:!0}]])}}});const Wn=Ce($i,[["__scopeId","data-v-37f5bfba"]]),Di=N({__name:"SimpleLayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},name:null,contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=ke(),r=(c,i)=>{var f;(f=c.dataTransfer)==null||f.setData("compomentIndex",i),c.stopPropagation()},a=(c,i,f=!1)=>{c.preventDefault(),c.stopPropagation(),f&&i!==n.activeKey&&Fe.emit("ActiveMenu",i)},l=(c,i)=>{var C;c.preventDefault(),c.stopPropagation();const f=(C=c.dataTransfer)==null?void 0:C.getData("compomentIndex"),u=s(f,i),h=f.split("-").map(b=>Number(b)),p=o.getComponentByIndex(h),x=o.cutComponent(h[h.length-1],p==null?void 0:p.parent);if(x&&u){const b=f.split("-").map(k=>Number(k)),S=o.getComponentByIndex(b);o.insertComponent(b[b.length-1],x,S),t("select",i)}},s=(c,i)=>{const f=c.split("-").map(p=>parseInt(p)),u=i.split("-").map(p=>parseInt(p)),h=f.length;for(let p=0;p<h;p++)if(f[p]!==u[p]){if(f[p]>u[p])return i;if(f[p]<u[p])return p+1==h?(u[p]=u[p]-1,u.join("-")):i}return i};return(c,i)=>{const f=mt("IconPark"),u=rt("contextmenu");return be((D(),q(f,{draggable:"true",onDragstart:i[0]||(i[0]=h=>r(h,e.index)),onDrop:i[1]||(i[1]=h=>l(h,e.index)),onDragover:i[2]||(i[2]=h=>a(h,e.index,!0)),name:e.name},null,8,["name"])),[[u,e.contextmenus,void 0,{stop:!0}]])}}});const Xn=Ce(Di,[["__scopeId","data-v-33315ec9"]]),Gn=N({__name:"Layer",setup(e){const t=ke(),n=so(),o={};ro.map(v=>{o[v.key]=v.icon});const r=L(()=>t.componentData),a=z(null),l=z("");zt("ActiveMenu",v=>{const y=v;l.value=y,a.value&&a.value.open&&a.value.open(y)});const c=v=>{l.value=v;const y=v.split("-").map($=>Number($)),w=t.getComponentByIndex(y);w&&t.setCurComponent(w,v)},i=z([]),f=(v,y,w)=>{for(let $=0;$<y.length;$++){const V=y[$],G=u($,v);if(V.component==="Group"){const ie=[];w.push({label:()=>m(Wn,{component:V,index:G,contextmenus:()=>I(G),onclick:()=>c(G)}),key:G,icon:()=>m(Xn,{name:"branch-one",component:V,index:G,contextmenus:()=>I(G),onclick:()=>c(G)}),children:f(G,V.subComponents||[],ie)})}else w.push({label:()=>m(Wn,{component:V,index:G,contextmenus:()=>I(G)}),key:G,icon:()=>m(Xn,{name:`${o[V.group]}`,component:V,index:G,contextmenus:()=>I(G),onclick:()=>c(G)})})}return w},u=(v,y)=>y?`${y}-${v}`:v.toString(),h=v=>{const y=v.split("-").map($=>Number($)),w=on(t.getComponentByIndex(y));w&&n.copy(w)},p=v=>$e(this,null,function*(){var w;c(v);const y=v.split("-").map($=>Number($));t.removeComponent(y[y.length-1],(w=t.curComponent)==null?void 0:w.parent)}),x=v=>$e(this,null,function*(){var w;c(v);const y=v.split("-").map($=>Number($));t.upComponent(y[y.length-1],(w=t.curComponent)==null?void 0:w.parent)}),C=v=>$e(this,null,function*(){var w;c(v);const y=v.split("-").map($=>Number($));t.downComponent(y[y.length-1],(w=t.curComponent)==null?void 0:w.parent)}),b=v=>$e(this,null,function*(){var w;c(v);const y=v.split("-").map($=>Number($));t.topComponent(y[y.length-1],(w=t.curComponent)==null?void 0:w.parent)}),S=v=>$e(this,null,function*(){var w;c(v);const y=v.split("-").map($=>Number($));t.bottomComponent(y[y.length-1],(w=t.curComponent)==null?void 0:w.parent)}),k=v=>{c(v);const y=v.split("-").map($=>Number($)),w=t.getComponentByIndex(y);w&&w.hiddenComponent()},P=v=>{c(v);const y=v.split("-").map($=>Number($)),w=t.getComponentByIndex(y);w&&w.showComponent()},E=v=>{const y=v.split("-").map(V=>Number(V)),w=t.getComponentByIndex(y),$=t.cutComponent(y[y.length-1],w==null?void 0:w.parent);$&&(no(JSON.stringify($.toJson())),n.copy($))},O=v=>{const y=v.split("-").map($=>Number($)),w=t.getComponentByIndex(y);if(n.copyData){const $=on(n.copyData);$.id=Jn(),t.insertComponent(y[y.length-1],$,w==null?void 0:w.parent)}},I=v=>{var w,$,V;const y=v.split("-").map(G=>parseInt(G));return[{text:"\u590D\u5236",subText:"Ctrl + C",handler:()=>h(v)},{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:()=>O(v)},{text:"\u526A\u5207",subText:"Ctrl + V",handler:()=>E(v)},{text:"\u62C6\u5206",subText:"Ctrl + V",disable:((w=t.getComponentByIndex(v.split("-").map(G=>Number(G))))==null?void 0:w.component)!=="Group",handler:()=>t.decompose()},{text:"\u5220\u9664",subText:"",handler:()=>p(v)},{divider:!0},{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(v),children:[{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(v)},{text:"\u4E0A\u79FB\u4E00\u5C42",handler:()=>x(v)}]},{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v),children:[{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(v)},{text:"\u4E0B\u79FB\u4E00\u5C42",handler:()=>C(v)}]},{divider:!0},{text:"\u663E\u793A",disable:($=t.getComponentByIndex(y))==null?void 0:$.display,subText:"",handler:()=>P(v)},{text:"\u9690\u85CF",disable:!((V=t.getComponentByIndex(y))!=null&&V.display),subText:"",handler:()=>k(v)}]};return Ae(()=>t.componentData,()=>{const v=t.componentData;i.value=[],i.value=f("",v,[])},{deep:!0,immediate:!0}),(v,y)=>(D(),Q("div",null,[g(r).length>0?(D(),q(g(hn),{key:0,options:i.value,"onUpdate:value":c},null,8,["options"])):(D(),q(g(nl),{key:1,class:"placeholder"},{default:M(()=>[F(g(al),null,{default:M(()=>[F(g(La),{description:"\u753B\u5E03\u4E3A\u7A7A"})]),_:1})]),_:1}))]))}}),Bi=ue("span",null,"\u7EC4\u4EF6",-1),zi=ue("span",null,"\u56FE\u5C42",-1),Ii=N({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("components"),o=a=>{t("update:iscollapsed",!1),n.value=a},r=a=>{n.value=a};return(a,l)=>{const s=mt("IconPark");return e.iscollapsed?(D(),q(g(Et),{key:1,type:"line",animated:"","bar-width":48,"justify-content":"center","onUpdate:value":[o,l[4]||(l[4]=c=>n.value=c)],value:n.value},{default:M(()=>[n.value==="components"?(D(),q(g(Ze),{key:0,name:"components","display-directive":"show:lazy"},{tab:M(()=>[F(s,{name:"components",onClick:l[2]||(l[2]=c=>r("layer"))})]),default:M(()=>[F(Hn)]),_:1})):n.value==="layer"?(D(),q(g(Ze),{key:1,name:"layer","display-directive":"show:lazy"},{tab:M(()=>[F(s,{name:"layers",onClick:l[3]||(l[3]=c=>r("components"))})]),default:M(()=>[F(Gn)]),_:1})):tt("",!0)]),_:1},8,["value"])):(D(),q(g(Et),{key:0,type:"line",animated:"","bar-width":100,"justify-content":"center",value:n.value,"onUpdate:value":[l[0]||(l[0]=c=>n.value=c),l[1]||(l[1]=c=>n.value=c)]},{default:M(()=>[F(g(Ze),{name:"components","display-directive":"show:lazy"},{tab:M(()=>[F(s,{name:"components"}),Bi]),default:M(()=>[F(Hn)]),_:1}),F(g(Ze),{name:"layer","display-directive":"show:lazy"},{tab:M(()=>[F(s,{name:"layers"}),zi]),default:M(()=>[F(Gn)]),_:1})]),_:1},8,["value"]))}}}),Fi=[{label:"4K",value:"3840X2160"},{label:"2k",value:"2048X1080"},{label:"1080P",value:"1920X1080"},{label:"720P",value:"1366X768"},{label:"iPhoneXR",value:"414X896"},{label:"iPhoneSE",value:"375X667"},{label:"iPhone12Pro",value:"390X884"},{label:"GalaxyS8+",value:"360X740"},{label:"GalaxyS20Ultra+",value:"412X915"},{label:"iPadAir",value:"820X1180"},{label:"iPadMini",value:"768X1024"},{label:"SurfacePro7",value:"912X1368"},{label:"NestHub",value:"1024X600"},{label:"NestMax",value:"1028X800"}],Ei=Fi,Pi={class:"attr-list"},Ai=N({__name:"Canvas",setup(e){const t=L(()=>[{label:"\u672C\u8BBE\u5907",value:`${window.screen.width}X${window.screen.height}`},...Ei]),n=ke(),o=z({width:n.canvasData.width,height:n.canvasData.height,scale:n.canvasData.scale,image:n.canvasData.image,color:n.canvasData.color||"#084860"}),r=()=>{n.setCanvasStyle(o.value)},a=z("\u672C\u8BBE\u5907"),l=[{key:"width",label:"\u5BBD\u5EA6",type:ye.NUMBER},{key:"height",label:"\u9AD8\u5EA6",type:ye.NUMBER},{key:"image",label:"\u80CC\u666F\u56FE",type:ye.TEXT},{key:"color",label:"\u80CC\u666F\u8272",type:ye.COLOR}],s=c=>{const i=c.split("X"),f=parseInt(i[0]),u=parseInt(i[1]);o.value.width=f,o.value.height=u};return(c,i)=>(D(),Q("div",Pi,[F(g(go),null,{default:M(()=>[F(g(mn),{size:"small",onSubmit:i[1]||(i[1]=pn(()=>{},["prevent"])),"label-placement":"left","label-align":"left"},{default:M(()=>[F(g(It),{label:"\u5206\u8FA8\u7387"},{default:M(()=>[F(g(Lt),{value:a.value,"onUpdate:value":[i[0]||(i[0]=f=>a.value=f),s],placeholder:"\u9009\u62E9\u5206\u8FA8\u7387",options:g(t)},null,8,["value","options"])]),_:1}),(D(),Q(Se,null,Te(l,({key:f,label:u,type:h},p)=>F(g(It),{key:p,label:u},{default:M(()=>[h===g(ye).NUMBER?(D(),q(g(gn),{key:0,value:o.value[f],"onUpdate:value":[x=>o.value[f]=x,r]},null,8,["value","onUpdate:value"])):h===g(ye).COLOR?(D(),q(g(Ft),{key:1,value:o.value[f],"onUpdate:value":[x=>o.value[f]=x,r],modes:["hex","rgb","hsl"]},null,8,["value","onUpdate:value"])):(D(),q(g(at),{key:2,value:o.value[f],"onUpdate:value":[x=>o.value[f]=x,r]},null,8,["value","onUpdate:value"]))]),_:2},1032,["label"])),64))]),_:1})]),_:1})]))}});const Ti=Ce(Ai,[["__scopeId","data-v-2cd84705"]]),Ni=[{label:"Arial",value:"Arial"},{label:"\u5FAE\u8F6F\u96C5\u9ED1",value:"Microsoft Yahei"},{label:"\u5B8B\u4F53",value:"SimSun"},{label:"\u9ED1\u4F53",value:"SimHei"},{label:"\u6977\u4F53",value:"KaiTi"},{label:"\u65B0\u5B8B\u4F53",value:"NSimSun"},{label:"\u4EFF\u5B8B",value:"FangSong"},{label:"\u82F9\u65B9",value:"PingFang SC"},{label:"\u534E\u6587\u9ED1\u4F53",value:"STHeiti"},{label:"\u534E\u6587\u6977\u4F53",value:"STKaiti"},{label:"\u534E\u6587\u5B8B\u4F53",value:"STSong"},{label:"\u534E\u6587\u4EFF\u5B8B",value:"STFangSong"},{label:"\u534E\u6587\u4E2D\u5B8B",value:"STZhongSong"},{label:"\u534E\u6587\u7425\u73C0",value:"STHupo"},{label:"\u534E\u6587\u65B0\u9B4F",value:"STXinwei"},{label:"\u534E\u6587\u96B6\u4E66",value:"STLiti"},{label:"\u534E\u6587\u884C\u6977",value:"STXingkai"},{label:"\u51AC\u9752\u9ED1\u4F53",value:"Hiragino Sans GB"},{label:"\u5170\u4EAD\u9ED1",value:"Lantinghei SC"},{label:"\u504F\u504F\u4F53",value:"Hanzipen SC"},{label:"\u624B\u672D\u4F53",value:"Hannotate SC"},{label:"\u5B8B\u4F53",value:"Songti SC"},{label:"\u5A03\u5A03\u4F53",value:"Wawati SC"},{label:"\u884C\u6977",value:"Xingkai SC"},{label:"\u5706\u4F53",value:"Yuanti SC"},{label:"\u534E\u6587\u7EC6\u9ED1",value:"STXihei"},{label:"\u5E7C\u5706",value:"YouYuan"},{label:"\u96B6\u4E66",value:"LiSu"},{label:"LED",value:"LED"},{label:"LCD",value:"LCD"}],Vi=[{label:"100 Thin",value:100},{label:"200 ExtraThin",value:200},{label:"300 Light",value:300},{label:"400 Normal",value:400},{label:"500 Medium",value:500},{label:"600 Semi Bold",value:600},{label:"700 Bold",value:700},{label:"Extra Bold",value:800},{label:"Black",value:900}],Li=N({__name:"FontStyle",props:{value:{default:""}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),r=De(Ni),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,s)=>(D(),q(g(Lt),{clearable:"",value:o.value,"onUpdate:value":[s[0]||(s[0]=c=>o.value=c),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u4F53",options:r},null,8,["value","options"]))}}),Ui=N({__name:"FontWeight",props:{value:{default:400}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),r=De(Vi),a=l=>{o.value=l,t("update:value",o.value),t("change",o.value)};return(l,s)=>(D(),q(g(Lt),{clearable:"",value:o.value,"onUpdate:value":[s[0]||(s[0]=c=>o.value=c),a],placeholder:"\u8BF7\u9009\u62E9\u5B57\u91CD",options:r},null,8,["value","options"]))}}),Mi={class:"linear-gradient"},Oi=N({__name:"LinearGradient",props:{value:{default:()=>({angle:0,color1:"",color2:""})}},emits:["update:value"],setup(e,{emit:t}){const n=e,o=z({angle:n.value.angle||0,color1:n.value.color1||"",color2:n.value.color2||""}),r=(a,l)=>{o.value[a]=l,t("update:value",o.value)};return(a,l)=>(D(),Q("div",Mi,[F(g(gn),{modelValue:e.value.angle,"onUpdate:value":l[0]||(l[0]=s=>r("angle",s)),controls:!0,min:0,max:360,step:1,clearable:""},null,8,["modelValue"]),F(g(Ft),{value:e.value.color1,"onUpdate:value":l[1]||(l[1]=s=>r("color1",s)),swatches:g(an),clearable:""},null,8,["value","swatches"]),F(g(Ft),{value:e.value.color2,"onUpdate:value":l[2]||(l[2]=s=>r("color2",s)),swatches:g(an),clearable:""},null,8,["value","swatches"])]))}}),ji=N({__name:"ArrayItem",props:{value:null,max:{default:1},type:{default:"static"}},emits:["update:value","updateValue"],setup(e,{emit:t}){const n=e,o=z(),r=z(""),a=De(n.type==="static"?new Array(n.max).fill(""):[]);a.splice(0,n.value.length,...n.value);const l=()=>{if(!r.value.trim()){Ne.warning("\u8BF7\u8F93\u5165\u6570\u636E");return}a.push(r.value),t("update:value",a),t("updateValue",a),r.value="",xt(()=>{var i;(i=o.value)==null||i.focus()})},s=i=>{a.splice(i,1),t("update:value",a),t("updateValue",a)},c=i=>{a[i]!==n.value[i]&&(t("update:value",a),t("updateValue",a))};return(i,f)=>{const u=mt("IconPark");return D(),q(g(Wt),{vertical:""},{default:M(()=>[(D(!0),Q(Se,null,Te(a,(h,p)=>(D(),q(g(Wt),{key:p,wrap:!1},{default:M(()=>[F(g(at),{value:a[p],"onUpdate:value":x=>a[p]=x,type:"text",onChange:x=>c(p),placeholder:"\u8BF7\u8F93\u5165\u6570\u636E"},null,8,["value","onUpdate:value","onChange"]),e.type==="dynamic"?(D(),q(u,{key:0,name:"delete-one",color:"#F76560",onClick:x=>s(p)},null,8,["onClick"])):tt("",!0)]),_:2},1024))),128)),e.type==="dynamic"&&a.length<e.max?(D(),q(g(Wt),{key:0,wrap:!1},{default:M(()=>[F(g(at),{ref_key:"addInputEl",ref:o,value:r.value,"onUpdate:value":f[0]||(f[0]=h=>r.value=h),type:"text",onKeypress:Ua(l,["enter"]),placeholder:"\u8BF7\u8F93\u5165\u6570\u636E"},null,8,["value","onKeypress"]),e.type==="dynamic"?(D(),q(u,{key:0,name:"add-three",color:"#4CD263",onClick:l})):tt("",!0)]),_:1})):tt("",!0)]),_:1})}}}),Hi=N({props:{args:{type:Object,default:()=>{}},component:{type:Object,default:()=>{}},value:{type:Object}},emits:["update:value","change"],setup(e,{emit:t}){const n=o=>{t("update:value",o),t("change",o)};return()=>[m(e.component,Ut(Ct({},e.args),{value:e.value,onChange:n}))]}});function Kt(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Oa(e)}const _o=N({components:{FontStyle:Li,FontWeight:Ui,LinearGradient:Oi,NSwitch:Ma},props:{name:{type:String,required:!0},uid:{type:String,required:!0},ukey:{type:String,required:!0},children:{type:Array,required:!0},data:{type:Object,required:!0}},emits:["change"],setup(e,{emit:t}){const n=De(e.data),o=(a,l)=>{t("change",l,a)},r=a=>{var c;let l;const s=((c=a.componentOptions)==null?void 0:c.options)||[];switch(a.type){case ye.COLOR:return F(Ft,{value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,swatches:an,modes:["hex","rgb","hsl"],onUpdateValue:p=>o(p,a.prop),clearable:!0},null);case ye.SELECT:return F(Lt,{value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,placeholder:a.label,onUpdateValue:p=>o(p,a.prop),options:s,clearable:!0},null);case ye.RADIO:return F(Jr,{value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,placeholder:a.label,onUpdateValue:p=>o(p,a.prop),clearable:!0},Kt(l=s.map(p=>F(qr,{label:p.value,key:p.value},{default:()=>[p.label]})))?l:{default:()=>[l]});case ye.NUMBER:const i="max"in a.componentOptions?a.componentOptions.max:9999999999,f="min"in a.componentOptions?a.componentOptions.min:-9999999999;return F(gn,{value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,onUpdateValue:p=>o(p,a.prop),max:i,min:f,clearable:!0},null);case ye.SWITCH:case ye.FONT_STYLE:case ye.FONT_WEIGHT:case ye.LINEAR_GRADIENT:return m(mt(a.type),{value:n[a.prop],["onUpdate:value"]:p=>{n[a.prop]=p,o(p,a.prop)}});case ye.ARRAY:const u="max"in a.componentOptions?a.componentOptions.max:1,h="type"in a.componentOptions?a.componentOptions.type:"static";return m(ji,{value:n[a.prop],["onUpdate:value"]:p=>{n[a.prop]=p,o(p,a.prop)},max:u,type:h});case ye.CUSTOM:return F(Hi,{value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,onUpdateValue:p=>o(p,a.prop),component:a.componentOptions.componentType,args:a.componentOptions.args},null);default:return F(at,{clearable:!0,value:n[a.prop],"onUpdate:value":p=>n[a.prop]=p,onUpdateValue:p=>o(p,a.prop),readonly:a.componentOptions.editable===!1,disabled:a.componentOptions.disabled},null)}};return()=>{let a;return F(mn,{size:"small",labelPlacement:"left",labelAlign:"left"},Kt(a=e.children.map(l=>{let s;return F(It,{key:`${e.ukey}${l.prop}`,label:l.label},Kt(s=r(l))?s:{default:()=>[s]})}))?a:{default:()=>[a]})}}}),Wi={class:"attr-list"},Xi=N({__name:"StyleList",props:{curComponent:null},setup(e){const t=e,n=ke(),o=De({}),r=L(()=>t.curComponent?t.curComponent.styleFormValue:{}),a=cn((c,i)=>{if(t.curComponent)if(["top","left","width","height","rotate"].includes(c)){const u=t.curComponent.parent;n.syncComponentLoction({[c]:i},u,!0),u&&n.resizeAutoComponent(u)}else n.setCurComponentStyle(c,i)},300),l=cn(c=>{const i=ja(c,o);i&&Object.keys(i).forEach(f=>{o[f]=i[f]})},200),s=()=>{t.curComponent&&(lo(o),l(t.curComponent.style))};return Ae(()=>[t.curComponent.id,t.curComponent.positionStyle],()=>{t.curComponent&&t.curComponent.id&&s()},{immediate:!0,deep:!0}),(c,i)=>(D(),Q("div",Wi,[F(g(ho),{accordion:""},{default:M(()=>[(D(!0),Q(Se,null,Te(g(r),({label:f,prop:u,children:h})=>(D(),q(g(mo),{key:`${e.curComponent.id}${u}`,title:f,name:u},{default:M(()=>[F(g(_o),{children:h,data:o,onChange:g(a),name:f,uid:u,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Gi=Ce(Xi,[["__scopeId","data-v-050459f8"]]),qi={class:"attr-list"},Ki=N({__name:"AttrList",props:{curComponent:null},setup(e){const t=e,n=ke(),o=De({common:{name:t.curComponent.name,component:t.curComponent.component,id:t.curComponent.id}}),r=L(()=>t.curComponent?t.curComponent.propFromValue:[]),a=(s,c,i)=>{n.setCurComponentPropValue(s,c,i)},l=()=>{lo(o,["common"]),o.common.name=t.curComponent.name,o.common.component=t.curComponent.component,o.common.id=t.curComponent.id,t.curComponent&&t.curComponent.propValue&&Object.keys(t.curComponent.propValue).forEach(s=>{o[s]=t.curComponent.propValue[s]})};return Ae(()=>t.curComponent.id,()=>{l()},{immediate:!0}),(s,c)=>(D(),Q("div",qi,[F(g(ho),{accordion:""},{default:M(()=>[(D(!0),Q(Se,null,Te(g(r),({label:i,prop:f,children:u})=>(D(),q(g(mo),{key:`${e.curComponent.id}${f}`,title:i,name:f},{default:M(()=>[F(g(_o),{children:u,data:o[f],onChange:(h,p)=>a(f,h,p),name:i,uid:f,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Yi=Ce(Ki,[["__scopeId","data-v-010e5f45"]]),Zi={key:0},Ji={key:1},Qi=N({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("attr"),o=ke(),r=L(()=>o.curComponent),a=L(()=>o.curComponent?[{label:"\u6837\u5F0F",key:"4",icon:()=>m(Me,{name:"text-style",onClick:()=>l("style")})},{label:"\u5C5E\u6027",key:"2",icon:()=>m(Me,{name:"internal-data",onClick:()=>l("attr")})}]:[{label:"\u753B\u5E03",key:"1",icon:()=>m(Me,{name:"page"})}]),l=s=>{t("update:iscollapsed",!1),n.value=s};return(s,c)=>e.iscollapsed?(D(),Q("div",Ji,[F(g(hn),{options:g(a)},null,8,["options"])])):(D(),Q("div",Zi,[g(r)?(D(),q(g(Et),{key:0,type:"line",animated:"","justify-content":"center",value:n.value,"onUpdate:value":[c[0]||(c[0]=i=>n.value=i),c[1]||(c[1]=i=>n.value=i)]},{default:M(()=>[F(g(Ze),{name:"style","display-directive":"show:lazy"},{tab:M(()=>[F(g(Me),{name:"text-style"}),be(ue("span",null,"\u6837\u5F0F",512),[[Be,!e.iscollapsed]])]),default:M(()=>[F(g(Gi),{curComponent:g(r)},null,8,["curComponent"])]),_:1}),F(g(Ze),{name:"attr","display-directive":"show:lazy"},{tab:M(()=>[F(g(Me),{name:"internal-data"}),be(ue("span",null,"\u5C5E\u6027",512),[[Be,!e.iscollapsed]])]),default:M(()=>[F(g(Yi),{curComponent:g(r)},null,8,["curComponent"])]),_:1})]),_:1},8,["value"])):(D(),q(g(Et),{key:1,type:"line",animated:"","justify-content":"center"},{default:M(()=>[F(g(Ze),{name:"canvas","display-directive":"show:lazy"},{tab:M(()=>[F(g(Me),{name:"page"}),be(ue("span",null,"\u753B\u5E03",512),[[Be,!e.iscollapsed]])]),default:M(()=>[F(Ti)]),_:1})]),_:1}))]))}}),es=N({__name:"DesignerPage",setup(e){const t=ke(),n=z(!1),o=z(!1),r=ao();Nt(()=>$e(this,null,function*(){const f=r.params.index;f&&(yield a(f))}));const a=f=>$e(this,null,function*(){const u=yield Ka(f);!u.data||t.setLayoutData(u.data)}),l=z(0),s=z(0),c=L(()=>({width:l.value+"px",height:s.value+"px"})),i=f=>{const u=f[0],{width:h,height:p}=u.contentRect;l.value=h,s.value=p};return Zn(()=>{t.clearCanvas()}),(f,u)=>{const h=rt("resize");return D(),q(g(Mt),{class:"home"},{default:M(()=>[F(g(Ha),{class:"header"},{default:M(()=>[F(g(_i))]),_:1}),F(g(Mt),{"has-sider":"",class:"main"},{default:M(()=>[F(g(Bn),{class:"left",width:"200",collapsed:n.value,"native-scrollbar":!1,bordered:"","collapse-mode":"width","show-trigger":"",onCollapse:u[2]||(u[2]=()=>n.value=!0),onExpand:u[3]||(u[3]=()=>n.value=!1)},{default:M(()=>[F(g(Ii),{iscollapsed:n.value,"onUpdate:iscollapsed":[u[0]||(u[0]=p=>n.value=p),u[1]||(u[1]=p=>n.value=p)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"]),F(g(Mt),{"has-sider":"","sider-placement":"right"},{default:M(()=>[be((D(),q(g(Wa),{class:"content"},{default:M(()=>[F(g(go),{"x-scrollable":"",style:Le(g(c))},{default:M(()=>[F(Ml)]),_:1},8,["style"])]),_:1})),[[h,i]]),F(g(Bn),{class:"right",width:"240",collapsed:o.value,"native-scrollbar":!1,bordered:"","collapsed-width":35,"collapse-mode":"width","show-trigger":"arrow-circle",onCollapse:u[6]||(u[6]=()=>o.value=!0),onExpand:u[7]||(u[7]=()=>o.value=!1)},{default:M(()=>[F(g(Qi),{iscollapsed:o.value,"onUpdate:iscollapsed":[u[4]||(u[4]=p=>o.value=p),u[5]||(u[5]=p=>o.value=p)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"])]),_:1})]),_:1})]),_:1})}}});const ss=Ce(es,[["__scopeId","data-v-0ebe2819"]]);export{ss as default};
