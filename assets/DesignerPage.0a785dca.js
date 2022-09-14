var Eo=Object.defineProperty,To=Object.defineProperties;var Po=Object.getOwnPropertyDescriptors;var bn=Object.getOwnPropertySymbols;var Ao=Object.prototype.hasOwnProperty,No=Object.prototype.propertyIsEnumerable;var vn=(e,t,n)=>t in e?Eo(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ft=(e,t)=>{for(var n in t||(t={}))Ao.call(t,n)&&vn(e,n,t[n]);if(bn)for(var n of bn(t))No.call(t,n)&&vn(e,n,t[n]);return e},_t=(e,t)=>To(e,Po(t));var Re=(e,t,n)=>new Promise((o,a)=>{var r=c=>{try{l(n.next(c))}catch(i){a(i)}},s=c=>{try{l(n.throw(c))}catch(i){a(i)}},l=c=>c.done?o(c.value):Promise.resolve(c.value).then(r,s);l((n=n.apply(e,t)).next())});import{d as L,A as z,a0 as Vo,a1 as Lo,a2 as h,a3 as gn,a4 as Uo,a5 as $t,a6 as Mo,a7 as y,a8 as M,a9 as O,aa as Ae,ab as Oo,ac as je,ad as Te,ae as He,af as Qe,ag as Ne,ah as it,ai as et,aj as Xe,ak as st,c as V,al as Tt,am as dt,an as cn,ao as ht,ap as Yt,aq as Kt,ar as Jt,as as jo,at as Ho,au as Y,av as Pt,aw as jn,ax as _e,ay as Wo,az as At,aA as ye,aB as nt,D as Pe,aC as be,aD as ct,aE as Xo,aF as Zt,aG as Go,aH as qo,aI as Yo,aJ as Ko,aK as Jo,E as me,aL as Zo,aM as le,aN as tt,aO as kt,aP as Qo,aQ as ea,aR as xt,aS as ta,I as De,aT as na,aU as oa,aV as Ee,aW as Hn,aX as Dt,aY as aa,aZ as bt,a_ as Wn,a$ as vt,b0 as mt,b1 as ra,b2 as la,b3 as ia,b4 as Qt,b5 as sa,b6 as xn,b7 as yn,b8 as da,b9 as ca,F as Ce,ba as ua,bb as fa,bc as pa,bd as ha,be as ma,bf as _n,bg as ba,bh as va,C as Nt,L as ot,o as R,b as J,P as ue,T as Ge,f as Ve,a as v,_ as we,bi as Ie,G as P,r as Be,e as X,n as Vt,bj as ga,u as Se,bk as en,bl as wn,N as Xn,k as Cn,M as It,w as U,h as xa,bm as ya,i as Bt,bn as Lt,p as tn,bo as _a,bp as Gn,x as Me,bq as wa,br as Ca,bs as Ut,bt as qn,bu as Yn,bv as Kn,K as Mt,bw as Sa,J as Ue,bx as ka,by as Ra,Z as $a,Y as Jn,bz as Zn,bA as un,bB as Da,v as Ia,y as Ba,bC as $e,bD as Ot,bE as nn,bF as za,bG as Fa,bH as Qn,bI as Ea,bJ as Sn,bK as jt,bL as Ta}from"./index.a2bd6492.js";import{u as eo,a as to,S as Pa}from"./Shape.cf53e9dc.js";import{e as Fe,u as zt}from"./useEventBus.96b726e0.js";import{u as Aa,s as Na,g as Va}from"./pages.2f00b808.js";import{N as yt,a as fn,b as Ft}from"./FormItem.d9f17fa5.js";import"./index.ca0023ed.js";function no(e,t,n){t/=100,n/=100;const o=t*Math.min(n,1-n)+n;return[e,o?(2-2*n/o)*100:0,o*100]}function Rt(e,t,n){t/=100,n/=100;const o=n-n*t/2,a=Math.min(o,1-o);return[e,a?(n-o)/a*100:0,o*100]}function Oe(e,t,n){t/=100,n/=100;let o=(a,r=(a+e/60)%6)=>n-n*t*Math.max(Math.min(r,4-r,1),0);return[o(5)*255,o(3)*255,o(1)*255]}function on(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),a=o-Math.min(e,t,n),r=a&&(o==e?(t-n)/a:o==t?2+(n-e)/a:4+(e-t)/a);return[60*(r<0?r+6:r),o&&a/o*100,o*100]}function an(e,t,n){e/=255,t/=255,n/=255;let o=Math.max(e,t,n),a=o-Math.min(e,t,n),r=1-Math.abs(o+o-a-1),s=a&&(o==e?(t-n)/a:o==t?2+(n-e)/a:4+(e-t)/a);return[60*(s<0?s+6:s),r?a/r*100:0,(o+o-a)*50]}function rn(e,t,n){t/=100,n/=100;let o=t*Math.min(n,1-n),a=(r,s=(r+e/30)%12)=>n-o*Math.max(Math.min(s-3,9-s,1),-1);return[a(0)*255,a(8)*255,a(4)*255]}function oo(e,t="default",n=[]){const a=e.$slots[t];return a===void 0?n:a()}function kn(e,t="default",n=[]){const{children:o}=e;if(o!==null&&typeof o=="object"&&!Array.isArray(o)){const a=o[t];if(typeof a=="function")return a()}return n}const La=gn(".v-x-scroll",{overflow:"auto",scrollbarWidth:"none"},[gn("&::-webkit-scrollbar",{width:0,height:0})]),Ua=L({name:"XScroll",props:{disabled:Boolean,onScroll:Function},setup(){const e=z(null);function t(a){!(a.currentTarget.offsetWidth<a.currentTarget.scrollWidth)||a.deltaY===0||(a.currentTarget.scrollLeft+=a.deltaY+a.deltaX,a.preventDefault())}const n=Vo();return La.mount({id:"vueuc/x-scroll",head:!0,anchorMetaName:Lo,ssr:n}),Object.assign({selfRef:e,handleWheel:t},{scrollTo(...a){var r;(r=e.value)===null||r===void 0||r.scrollTo(...a)}})},render(){return h("div",{ref:"selfRef",onScroll:this.onScroll,onWheel:this.disabled?void 0:this.handleWheel,class:"v-x-scroll"},this.$slots)}});var Ma=/\s/;function Oa(e){for(var t=e.length;t--&&Ma.test(e.charAt(t)););return t}var ja=/^\s+/;function Ha(e){return e&&e.slice(0,Oa(e)+1).replace(ja,"")}var Rn=0/0,Wa=/^[-+]0x[0-9a-f]+$/i,Xa=/^0b[01]+$/i,Ga=/^0o[0-7]+$/i,qa=parseInt;function $n(e){if(typeof e=="number")return e;if(Uo(e))return Rn;if($t(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=$t(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=Ha(e);var n=Xa.test(e);return n||Ga.test(e)?qa(e.slice(2),n?2:8):Wa.test(e)?Rn:+e}var Ya=function(){return Mo.Date.now()};const Ht=Ya;var Ka="Expected a function",Ja=Math.max,Za=Math.min;function ln(e,t,n){var o,a,r,s,l,c,i=0,f=!1,d=!1,p=!0;if(typeof e!="function")throw new TypeError(Ka);t=$n(t)||0,$t(n)&&(f=!!n.leading,d="maxWait"in n,r=d?Ja($n(n.maxWait)||0,t):r,p="trailing"in n?!!n.trailing:p);function m(I){var g=o,x=a;return o=a=void 0,i=I,s=e.apply(x,g),s}function w(I){return i=I,l=setTimeout(S,t),f?m(I):s}function C(I){var g=I-c,x=I-i,_=t-g;return d?Za(_,r-x):_}function b(I){var g=I-c,x=I-i;return c===void 0||g>=t||g<0||d&&x>=r}function S(){var I=Ht();if(b(I))return $(I);l=setTimeout(S,C(I))}function $(I){return l=void 0,p&&o?m(I):(o=a=void 0,s)}function F(){l!==void 0&&clearTimeout(l),i=0,o=c=a=l=void 0}function T(){return l===void 0?s:$(Ht())}function j(){var I=Ht(),g=b(I);if(o=arguments,a=this,c=I,g){if(l===void 0)return w(c);if(d)return clearTimeout(l),l=setTimeout(S,t),m(c)}return l===void 0&&(l=setTimeout(S,t)),s}return j.cancel=F,j.flush=T,j}var Qa="Expected a function";function Wt(e,t,n){var o=!0,a=!0;if(typeof e!="function")throw new TypeError(Qa);return $t(n)&&(o="leading"in n?!!n.leading:o,a="trailing"in n?!!n.trailing:a),ln(e,t,{leading:o,maxWait:t,trailing:a})}const ao=L({name:"Add",render(){return h("svg",{width:"512",height:"512",viewBox:"0 0 512 512",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M256 112V400M400 256H112",stroke:"currentColor","stroke-width":"32","stroke-linecap":"round","stroke-linejoin":"round"}))}}),er=L({name:"ChevronLeft",render(){return h("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},h("path",{d:"M10.3536 3.14645C10.5488 3.34171 10.5488 3.65829 10.3536 3.85355L6.20711 8L10.3536 12.1464C10.5488 12.3417 10.5488 12.6583 10.3536 12.8536C10.1583 13.0488 9.84171 13.0488 9.64645 12.8536L5.14645 8.35355C4.95118 8.15829 4.95118 7.84171 5.14645 7.64645L9.64645 3.14645C9.84171 2.95118 10.1583 2.95118 10.3536 3.14645Z",fill:"currentColor"}))}}),tr=L({name:"Remove",render(){return h("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},h("line",{x1:"400",y1:"256",x2:"112",y2:"256",style:`
        fill: none;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      `}))}}),nr=y("input-group",`
 display: inline-flex;
 width: 100%;
 flex-wrap: nowrap;
 vertical-align: bottom;
`,[M(">",[y("input",[M("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),M("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 margin-left: -1px!important;
 `)]),y("button",[M("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[O("state-border, border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)]),M("&:not(:first-child)",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[O("state-border, border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])]),M("*",[M("&:not(:last-child)",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `,[M(">",[y("input",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),y("base-selection",[y("base-selection-label",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),y("base-selection-tags",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `),O("box-shadow, border, state-border",`
 border-top-right-radius: 0!important;
 border-bottom-right-radius: 0!important;
 `)])])]),M("&:not(:first-child)",`
 margin-left: -1px!important;
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `,[M(">",[y("input",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),y("base-selection",[y("base-selection-label",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),y("base-selection-tags",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `),O("box-shadow, border, state-border",`
 border-top-left-radius: 0!important;
 border-bottom-left-radius: 0!important;
 `)])])])])])]),or={},ar=L({name:"InputGroup",props:or,setup(e){const{mergedClsPrefixRef:t}=Ae(e);return Oo("-input-group",nr,t),{mergedClsPrefix:t}},render(){const{mergedClsPrefix:e}=this;return h("div",{class:`${e}-input-group`},this.$slots)}});function rr(e,t){switch(e[0]){case"hex":return t?"#000000FF":"#000000";case"rgb":return t?"rgba(0, 0, 0, 1)":"rgb(0, 0, 0)";case"hsl":return t?"hsla(0, 0%, 0%, 1)":"hsl(0, 0%, 0%)";case"hsv":return t?"hsva(0, 0%, 0%, 1)":"hsv(0, 0%, 0%)"}return"#000000"}function gt(e){return e===null?null:/^ *#/.test(e)?"hex":e.includes("rgb")?"rgb":e.includes("hsl")?"hsl":e.includes("hsv")?"hsv":null}function lr(e){return e=Math.round(e),e>=360?359:e<0?0:e}function ir(e){return e=Math.round(e*100)/100,e>1?1:e<0?0:e}const sr={rgb:{hex(e){return je(Te(e))},hsl(e){const[t,n,o,a]=Te(e);return He([...an(t,n,o),a])},hsv(e){const[t,n,o,a]=Te(e);return Qe([...on(t,n,o),a])}},hex:{rgb(e){return Ne(Te(e))},hsl(e){const[t,n,o,a]=Te(e);return He([...an(t,n,o),a])},hsv(e){const[t,n,o,a]=Te(e);return Qe([...on(t,n,o),a])}},hsl:{hex(e){const[t,n,o,a]=it(e);return je([...rn(t,n,o),a])},rgb(e){const[t,n,o,a]=it(e);return Ne([...rn(t,n,o),a])},hsv(e){const[t,n,o,a]=it(e);return Qe([...no(t,n,o),a])}},hsv:{hex(e){const[t,n,o,a]=et(e);return je([...Oe(t,n,o),a])},rgb(e){const[t,n,o,a]=et(e);return Ne([...Oe(t,n,o),a])},hsl(e){const[t,n,o,a]=et(e);return He([...Rt(t,n,o),a])}}};function ro(e,t,n){return n=n||gt(e),n?n===t?e:sr[n][t](e):null}const lt="12px",dr=12,Ke="6px",cr=6,ur="linear-gradient(90deg,red,#ff0 16.66%,#0f0 33.33%,#0ff 50%,#00f 66.66%,#f0f 83.33%,red)",fr=L({name:"HueSlider",props:{clsPrefix:{type:String,required:!0},hue:{type:Number,required:!0},onUpdateHue:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(r){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,a),o(r))}function o(r){const{value:s}=t;if(!s)return;const{width:l,left:c}=s.getBoundingClientRect(),i=lr((r.clientX-c-cr)/(l-dr)*360);e.onUpdateHue(i)}function a(){var r;st("mousemove",document,o),st("mouseup",document,a),(r=e.onComplete)===null||r===void 0||r.call(e)}return{railRef:t,handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-slider`,style:{height:lt,borderRadius:Ke}},h("div",{ref:"railRef",style:{boxShadow:"inset 0 0 2px 0 rgba(0, 0, 0, .24)",boxSizing:"border-box",backgroundImage:ur,height:lt,borderRadius:Ke,position:"relative"},onMousedown:this.handleMouseDown},h("div",{style:{position:"absolute",left:Ke,right:Ke,top:0,bottom:0}},h("div",{class:`${e}-color-picker-handle`,style:{left:`calc((${this.hue}%) / 359 * 100 - ${Ke})`,borderRadius:Ke,width:lt,height:lt}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:`hsl(${this.hue}, 100%, 50%)`,borderRadius:Ke,width:lt,height:lt}})))))}}),pt="12px",pr=12,Je="6px",hr=L({name:"AlphaSlider",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},alpha:{type:Number,default:0},onUpdateAlpha:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(r){!t.value||!e.rgba||(Xe("mousemove",document,o),Xe("mouseup",document,a),o(r))}function o(r){const{value:s}=t;if(!s)return;const{width:l,left:c}=s.getBoundingClientRect(),i=(r.clientX-c)/(l-pr);e.onUpdateAlpha(ir(i))}function a(){var r;st("mousemove",document,o),st("mouseup",document,a),(r=e.onComplete)===null||r===void 0||r.call(e)}return{railRef:t,railBackgroundImage:V(()=>{const{rgba:r}=e;return r?`linear-gradient(to right, rgba(${r[0]}, ${r[1]}, ${r[2]}, 0) 0%, rgba(${r[0]}, ${r[1]}, ${r[2]}, 1) 100%)`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-slider`,ref:"railRef",style:{height:pt,borderRadius:Je},onMousedown:this.handleMouseDown},h("div",{style:{borderRadius:Je,position:"absolute",left:0,right:0,top:0,bottom:0,overflow:"hidden"}},h("div",{class:`${e}-color-picker-checkboard`}),h("div",{class:`${e}-color-picker-slider__image`,style:{backgroundImage:this.railBackgroundImage}})),this.rgba&&h("div",{style:{position:"absolute",left:Je,right:Je,top:0,bottom:0}},h("div",{class:`${e}-color-picker-handle`,style:{left:`calc(${this.alpha*100}% - ${Je})`,borderRadius:Je,width:pt,height:pt}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:Ne(this.rgba),borderRadius:Je,width:pt,height:pt}}))))}}),wt="12px",Ct="6px",mr=L({name:"Pallete",props:{clsPrefix:{type:String,required:!0},rgba:{type:Array,default:null},displayedHue:{type:Number,required:!0},displayedSv:{type:Array,required:!0},onUpdateSV:{type:Function,required:!0},onComplete:Function},setup(e){const t=z(null);function n(r){!t.value||(Xe("mousemove",document,o),Xe("mouseup",document,a),o(r))}function o(r){const{value:s}=t;if(!s)return;const{width:l,height:c,left:i,bottom:f}=s.getBoundingClientRect(),d=(f-r.clientY)/c,p=(r.clientX-i)/l,m=100*(p>1?1:p<0?0:p),w=100*(d>1?1:d<0?0:d);e.onUpdateSV(m,w)}function a(){var r;st("mousemove",document,o),st("mouseup",document,a),(r=e.onComplete)===null||r===void 0||r.call(e)}return{palleteRef:t,handleColor:V(()=>{const{rgba:r}=e;return r?`rgb(${r[0]}, ${r[1]}, ${r[2]})`:""}),handleMouseDown:n}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-pallete`,onMousedown:this.handleMouseDown,ref:"palleteRef"},h("div",{class:`${e}-color-picker-pallete__layer`,style:{backgroundImage:`linear-gradient(90deg, white, hsl(${this.displayedHue}, 100%, 50%))`}}),h("div",{class:`${e}-color-picker-pallete__layer ${e}-color-picker-pallete__layer--shadowed`,style:{backgroundImage:"linear-gradient(180deg, rgba(0, 0, 0, 0%), rgba(0, 0, 0, 100%))"}}),this.rgba&&h("div",{class:`${e}-color-picker-handle`,style:{width:wt,height:wt,borderRadius:Ct,left:`calc(${this.displayedSv[0]}% - ${Ct})`,bottom:`calc(${this.displayedSv[1]}% - ${Ct})`}},h("div",{class:`${e}-color-picker-handle__fill`,style:{backgroundColor:this.handleColor,borderRadius:Ct,width:wt,height:wt}})))}}),pn=Tt("n-color-picker");function br(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),255)):!1}function vr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),360)):!1}function gr(e){return/^\d{1,3}\.?\d*$/.test(e.trim())?Math.max(0,Math.min(parseInt(e),100)):!1}function xr(e){const t=e.trim();return/^#[0-9a-fA-F]+$/.test(t)?[4,5,7,9].includes(t.length):!1}function yr(e){return/^\d{1,3}\.?\d*%$/.test(e.trim())?Math.max(0,Math.min(parseInt(e)/100,100)):!1}const _r={paddingSmall:"0 4px"},Dn=L({name:"ColorInputUnit",props:{label:{type:String,required:!0},value:{type:[Number,String],default:null},showAlpha:Boolean,onUpdateValue:{type:Function,required:!0}},setup(e){const t=z(""),{themeRef:n}=dt(pn,null);cn(()=>{t.value=o()});function o(){const{value:s}=e;if(s===null)return"";const{label:l}=e;return l==="HEX"?s:l==="A"?`${Math.floor(s*100)}%`:String(Math.floor(s))}function a(s){t.value=s}function r(s){let l,c;switch(e.label){case"HEX":c=xr(s),c&&e.onUpdateValue(s),t.value=o();break;case"H":l=vr(s),l===!1?t.value=o():e.onUpdateValue(l);break;case"S":case"L":case"V":l=gr(s),l===!1?t.value=o():e.onUpdateValue(l);break;case"A":l=yr(s),l===!1?t.value=o():e.onUpdateValue(l);break;case"R":case"G":case"B":l=br(s),l===!1?t.value=o():e.onUpdateValue(l);break}}return{mergedTheme:n,inputValue:t,handleInputChange:r,handleInputUpdateValue:a}},render(){const{mergedTheme:e}=this;return h(yt,{size:"small",placeholder:this.label,theme:e.peers.Input,themeOverrides:e.peerOverrides.Input,builtinThemeOverrides:_r,value:this.inputValue,onUpdateValue:this.handleInputUpdateValue,onChange:this.handleInputChange,style:this.label==="A"?"flex-grow: 1.25;":""})}}),wr=L({name:"ColorInput",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},modes:{type:Array,required:!0},showAlpha:{type:Boolean,required:!0},value:{type:String,default:null},valueArr:{type:Array,default:null},onUpdateValue:{type:Function,required:!0},onUpdateMode:{type:Function,required:!0}},setup(e){return{handleUnitUpdateValue(t,n){const{showAlpha:o}=e;if(e.mode==="hex"){e.onUpdateValue((o?je:ht)(n));return}let a;switch(e.valueArr===null?a=[0,0,0,0]:a=Array.from(e.valueArr),e.mode){case"hsv":a[t]=n,e.onUpdateValue((o?Qe:Jt)(a));break;case"rgb":a[t]=n,e.onUpdateValue((o?Ne:Kt)(a));break;case"hsl":a[t]=n,e.onUpdateValue((o?He:Yt)(a));break}}}},render(){const{clsPrefix:e,modes:t}=this;return h("div",{class:`${e}-color-picker-input`},h("div",{class:`${e}-color-picker-input__mode`,onClick:this.onUpdateMode,style:{cursor:t.length===1?"":"pointer"}},this.mode.toUpperCase()+(this.showAlpha?"A":"")),h(ar,null,{default:()=>{const{mode:n,valueArr:o,showAlpha:a}=this;if(n==="hex"){let r=null;try{r=o===null?null:(a?je:ht)(o)}catch(s){}return h(Dn,{label:"HEX",showAlpha:a,value:r,onUpdateValue:s=>{this.handleUnitUpdateValue(0,s)}})}return(n+(a?"a":"")).split("").map((r,s)=>h(Dn,{label:r.toUpperCase(),value:o===null?null:o[s],onUpdateValue:l=>{this.handleUnitUpdateValue(s,l)}}))}}))}}),Cr=L({name:"ColorPickerTrigger",props:{clsPrefix:{type:String,required:!0},value:{type:String,default:null},hsla:{type:Array,default:null},disabled:Boolean,onClick:Function},setup(e){const{colorPickerSlots:t,renderLabelRef:n}=dt(pn,null);return()=>{const{hsla:o,value:a,clsPrefix:r,onClick:s,disabled:l}=e,c=t.label||n.value;return h("div",{class:[`${r}-color-picker-trigger`,l&&`${r}-color-picker-trigger--disabled`],onClick:l?void 0:s},h("div",{class:`${r}-color-picker-trigger__fill`},h("div",{class:`${r}-color-picker-checkboard`}),h("div",{style:{position:"absolute",left:0,right:0,top:0,bottom:0,backgroundColor:o?He(o):""}}),a&&o?h("div",{class:`${r}-color-picker-trigger__value`,style:{color:o[2]>50||o[3]<.5?"black":"white"}},c?c(a):a):null))}}});function Sr(e,t){if(t==="hsv"){const[n,o,a,r]=et(e);return Ne([...Oe(n,o,a),r])}return e}function kr(e){const t=document.createElement("canvas").getContext("2d");return t.fillStyle=e,t.fillStyle}const Rr=L({name:"ColorPickerSwatches",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},swatches:{type:Array,required:!0},onUpdateColor:{type:Function,required:!0}},setup(e){const t=V(()=>e.swatches.map(r=>{const s=gt(r);return{value:r,mode:s,legalValue:Sr(r,s)}}));function n(r){const{mode:s}=e;let{value:l,mode:c}=r;return c||(c="hex",/^[a-zA-Z]+$/.test(l)?l=kr(l):(jo("color-picker",`color ${l} in swatches is invalid.`),l="#000000")),c===s?l:ro(l,s,c)}function o(r){e.onUpdateColor(n(r))}function a(r,s){r.key==="Enter"&&o(s)}return{parsedSwatchesRef:t,handleSwatchSelect:o,handleSwatchKeyDown:a}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-swatches`},this.parsedSwatchesRef.map(t=>h("div",{class:`${e}-color-picker-swatch`,tabindex:0,onClick:()=>this.handleSwatchSelect(t),onKeydown:n=>this.handleSwatchKeyDown(n,t)},h("div",{class:`${e}-color-picker-swatch__fill`,style:{background:t.legalValue}}))))}}),$r=L({name:"ColorPreview",props:{clsPrefix:{type:String,required:!0},mode:{type:String,required:!0},color:{type:String,default:null,validator:e=>{const t=gt(e);return Boolean(!e||t&&t!=="hsv")}},onUpdateColor:{type:Function,required:!0}},setup(e){function t(n){var o;const a=n.target.value;(o=e.onUpdateColor)===null||o===void 0||o.call(e,ro(a.toUpperCase(),e.mode,"hex")),n.stopPropagation()}return{handleChange:t}},render(){const{clsPrefix:e}=this;return h("div",{class:`${e}-color-picker-preview__preview`},h("span",{class:`${e}-color-picker-preview__fill`,style:{background:this.color||"#000000"}}),h("input",{class:`${e}-color-picker-preview__input`,type:"color",value:this.color,onChange:this.handleChange}))}}),Dr=M([y("color-picker",`
 display: inline-block;
 box-sizing: border-box;
 height: var(--n-height);
 font-size: var(--n-font-size);
 width: 100%;
 position: relative;
 `),y("color-picker-panel",`
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
 `,[Ho(),y("input",`
 text-align: center;
 `)]),y("color-picker-checkboard",`
 background: white; 
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[M("&::after",`
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
 `)]),y("color-picker-slider",`
 margin-bottom: 8px;
 position: relative;
 box-sizing: border-box;
 `,[O("image",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `),M("&::after",`
 content: "";
 position: absolute;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 pointer-events: none;
 `)]),y("color-picker-handle",`
 z-index: 1;
 box-shadow: 0 0 2px 0 rgba(0, 0, 0, .45);
 position: absolute;
 background-color: white;
 overflow: hidden;
 `,[O("fill",`
 box-sizing: border-box;
 border: 2px solid white;
 `)]),y("color-picker-pallete",`
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
 `,[Y("shadowed",`
 box-shadow: inset 0 0 2px 0 rgba(0, 0, 0, .24);
 `)])]),y("color-picker-preview",`
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
 `)]),y("color-picker-input",`
 display: flex;
 align-items: center;
 `,[y("input",`
 flex-grow: 1;
 flex-basis: 0;
 `),O("mode",`
 width: 72px;
 text-align: center;
 `)]),y("color-picker-control",`
 padding: 12px;
 `),y("color-picker-action",`
 display: flex;
 margin-top: -4px;
 border-top: 1px solid var(--n-divider-color);
 padding: 8px 12px;
 justify-content: flex-end;
 `,[y("button","margin-left: 8px;")]),y("color-picker-trigger",`
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
 `),Y("disabled","cursor: not-allowed"),y("color-picker-checkboard",`
 border-radius: var(--n-border-radius);
 `,[M("&::after",`
 --n-block-size: calc((var(--n-height) - 8px) / 3);
 background-size: calc(var(--n-block-size) * 2) calc(var(--n-block-size) * 2);
 background-position: 0 0, 0 var(--n-block-size), var(--n-block-size) calc(-1 * var(--n-block-size)), calc(-1 * var(--n-block-size)) 0px; 
 `)])]),y("color-picker-swatches",`
 display: grid;
 grid-gap: 8px;
 flex-wrap: wrap;
 position: relative;
 grid-template-columns: repeat(auto-fill, 18px);
 margin-top: 10px;
 `,[y("color-picker-swatch",`
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
 `),M("&:focus",`
 outline: none;
 `,[O("fill",[M("&::after",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 left: 0;
 background: inherit;
 filter: blur(2px);
 content: "";
 `)])])])])]),Ir=Object.assign(Object.assign({},_e.props),{value:String,show:{type:Boolean,default:void 0},defaultShow:Boolean,defaultValue:String,modes:{type:Array,default:()=>["rgb","hex","hsl"]},placement:{type:String,default:"bottom-start"},to:Zt.propTo,showAlpha:{type:Boolean,default:!0},showPreview:Boolean,swatches:Array,disabled:{type:Boolean,default:void 0},actions:{type:Array,default:null},internalActions:Array,size:String,renderLabel:Function,onComplete:Function,onConfirm:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),sn=L({name:"ColorPicker",props:Ir,setup(e,{slots:t}){const n=z(null);let o=null;const a=Pt(e),{mergedSizeRef:r,mergedDisabledRef:s}=a,{localeRef:l}=jn("global"),{mergedClsPrefixRef:c,namespaceRef:i,inlineThemeDisabled:f}=Ae(e),d=_e("ColorPicker","-color-picker",Dr,Wo,e,c);At(pn,{themeRef:d,renderLabelRef:ye(e,"renderLabel"),colorPickerSlots:t});const p=z(e.defaultShow),m=nt(ye(e,"show"),p);function w(u){const{onUpdateShow:k,"onUpdate:show":A}=e;k&&le(k,u),A&&le(A,u),p.value=u}const{defaultValue:C}=e,b=z(C===void 0?rr(e.modes,e.showAlpha):C),S=nt(ye(e,"value"),b),$=z([S.value]),F=z(0),T=V(()=>gt(S.value)),{modes:j}=e,I=z(gt(S.value)||j[0]||"rgb");function g(){const{modes:u}=e,{value:k}=I,A=u.findIndex(G=>G===k);~A?I.value=u[(A+1)%u.length]:I.value="rgb"}let x,_,B,N,q,ie,se,H;const Z=V(()=>{const{value:u}=S;if(!u)return null;switch(T.value){case"hsv":return et(u);case"hsl":return[x,_,B,H]=it(u),[...no(x,_,B),H];case"rgb":case"hex":return[q,ie,se,H]=Te(u),[...on(q,ie,se),H]}}),W=V(()=>{const{value:u}=S;if(!u)return null;switch(T.value){case"rgb":case"hex":return Te(u);case"hsv":return[x,_,N,H]=et(u),[...Oe(x,_,N),H];case"hsl":return[x,_,B,H]=it(u),[...rn(x,_,B),H]}}),K=V(()=>{const{value:u}=S;if(!u)return null;switch(T.value){case"hsl":return it(u);case"hsv":return[x,_,N,H]=et(u),[...Rt(x,_,N),H];case"rgb":case"hex":return[q,ie,se,H]=Te(u),[...an(q,ie,se),H]}}),fe=V(()=>{switch(I.value){case"rgb":case"hex":return W.value;case"hsv":return Z.value;case"hsl":return K.value}}),pe=z(0),ve=z(1),oe=z([0,0]);function xe(u,k){const{value:A}=Z,G=pe.value,te=A?A[3]:1;oe.value=[u,k];const{showAlpha:ee}=e;switch(I.value){case"hsv":ne((ee?Qe:Jt)([G,u,k,te]),"cursor");break;case"hsl":ne((ee?He:Yt)([...Rt(G,u,k),te]),"cursor");break;case"rgb":ne((ee?Ne:Kt)([...Oe(G,u,k),te]),"cursor");break;case"hex":ne((ee?je:ht)([...Oe(G,u,k),te]),"cursor");break}}function de(u){pe.value=u;const{value:k}=Z;if(!k)return;const[,A,G,te]=k,{showAlpha:ee}=e;switch(I.value){case"hsv":ne((ee?Qe:Jt)([u,A,G,te]),"cursor");break;case"rgb":ne((ee?Ne:Kt)([...Oe(u,A,G),te]),"cursor");break;case"hex":ne((ee?je:ht)([...Oe(u,A,G),te]),"cursor");break;case"hsl":ne((ee?He:Yt)([...Rt(u,A,G),te]),"cursor");break}}function ae(u){switch(I.value){case"hsv":[x,_,N]=Z.value,ne(Qe([x,_,N,u]),"cursor");break;case"rgb":[q,ie,se]=W.value,ne(Ne([q,ie,se,u]),"cursor");break;case"hex":[q,ie,se]=W.value,ne(je([q,ie,se,u]),"cursor");break;case"hsl":[x,_,B]=K.value,ne(He([x,_,B,u]),"cursor");break}ve.value=u}function ne(u,k){k==="cursor"?o=u:o=null;const{nTriggerFormChange:A,nTriggerFormInput:G}=a,{onUpdateValue:te,"onUpdate:value":ee}=e;te&&le(te,u),ee&&le(ee,u),A(),G(),b.value=u}function ge(u){ne(u,"input"),kt(ke)}function ke(u=!0){const{value:k}=S;if(k){const{nTriggerFormChange:A,nTriggerFormInput:G}=a,{onComplete:te}=e;te&&te(k);const{value:ee}=$,{value:ce}=F;u&&(ee.splice(ce+1,ee.length,k),F.value=ce+1),A(),G()}}function Le(){const{value:u}=F;u-1<0||(ne($.value[u-1],"input"),ke(!1),F.value=u-1)}function at(){const{value:u}=F;u<0||u+1>=$.value.length||(ne($.value[u+1],"input"),ke(!1),F.value=u+1)}function ut(){const{value:u}=S,{onConfirm:k}=e;k&&k(u),w(!1)}const rt=V(()=>F.value>=1),ze=V(()=>{const{value:u}=$;return u.length>1&&F.value<u.length-1});Pe(m,u=>{u||($.value=[S.value],F.value=0)}),cn(()=>{if(!(o&&o===S.value)){const{value:u}=Z;u&&(pe.value=u[0],ve.value=u[3],oe.value=[u[1],u[2]])}o=null});const D=V(()=>{const{value:u}=r,{common:{cubicBezierEaseInOut:k},self:{textColor:A,color:G,panelFontSize:te,boxShadow:ee,border:ce,borderRadius:re,dividerColor:he,[be("height",u)]:qe,[be("fontSize",u)]:Ye}}=d.value;return{"--n-bezier":k,"--n-text-color":A,"--n-color":G,"--n-panel-font-size":te,"--n-font-size":Ye,"--n-box-shadow":ee,"--n-border":ce,"--n-border-radius":re,"--n-height":qe,"--n-divider-color":he}}),E=f?ct("color-picker",V(()=>r.value[0]),D,e):void 0;function Q(){var u;const{value:k}=W,{value:A}=pe,{internalActions:G,modes:te,actions:ee}=e,{value:ce}=d,{value:re}=c;return h("div",{class:[`${re}-color-picker-panel`,E==null?void 0:E.themeClass.value],onDragstart:he=>{he.preventDefault()},style:f?void 0:D.value},h("div",{class:`${re}-color-picker-control`},h(mr,{clsPrefix:re,rgba:k,displayedHue:A,displayedSv:oe.value,onUpdateSV:xe,onComplete:ke}),h("div",{class:`${re}-color-picker-preview`},h("div",{class:`${re}-color-picker-preview__sliders`},h(fr,{clsPrefix:re,hue:A,onUpdateHue:de,onComplete:ke}),e.showAlpha?h(hr,{clsPrefix:re,rgba:k,alpha:ve.value,onUpdateAlpha:ae,onComplete:ke}):null),e.showPreview?h($r,{clsPrefix:re,mode:I.value,color:W.value&&ht(W.value),onUpdateColor:he=>ne(he,"input")}):null),h(wr,{clsPrefix:re,showAlpha:e.showAlpha,mode:I.value,modes:te,onUpdateMode:g,value:S.value,valueArr:fe.value,onUpdateValue:ge}),((u=e.swatches)===null||u===void 0?void 0:u.length)&&h(Rr,{clsPrefix:re,mode:I.value,swatches:e.swatches,onUpdateColor:he=>ne(he,"input")})),ee!=null&&ee.length?h("div",{class:`${re}-color-picker-action`},ee.includes("confirm")&&h(tt,{size:"small",onClick:ut,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>l.value.confirm})):null,t.action?h("div",{class:`${re}-color-picker-action`},{default:t.action}):G?h("div",{class:`${re}-color-picker-action`},G.includes("undo")&&h(tt,{size:"small",onClick:Le,disabled:!rt.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>l.value.undo}),G.includes("redo")&&h(tt,{size:"small",onClick:at,disabled:!ze.value,theme:ce.peers.Button,themeOverrides:ce.peerOverrides.Button},{default:()=>l.value.redo})):null)}return{mergedClsPrefix:c,namespace:i,selfRef:n,hsla:K,rgba:W,mergedShow:m,mergedDisabled:s,isMounted:Xo(),adjustedTo:Zt(e),mergedValue:S,handleTriggerClick(){w(!0)},handleClickOutside(u){var k;!((k=n.value)===null||k===void 0)&&k.contains(Go(u))||w(!1)},renderPanel:Q,cssVars:f?void 0:D,themeClass:E==null?void 0:E.themeClass,onRender:E==null?void 0:E.onRender}},render(){const{$slots:e,mergedClsPrefix:t,onRender:n}=this;return n==null||n(),h("div",{class:[this.themeClass,`${t}-color-picker`],ref:"selfRef",style:this.cssVars},h(qo,null,{default:()=>[h(Yo,null,{default:()=>h(Cr,{clsPrefix:t,value:this.mergedValue,hsla:this.hsla,disabled:this.mergedDisabled,onClick:this.handleTriggerClick},{label:e.label})}),h(Ko,{placement:this.placement,show:this.mergedShow,containerClass:this.namespace,teleportDisabled:this.adjustedTo===Zt.tdkey,to:this.adjustedTo},{default:()=>h(Jo,{name:"fade-in-scale-up-transition",appear:this.isMounted},{default:()=>this.mergedShow?me(this.renderPanel(),[[Zo,this.handleClickOutside,void 0,{capture:!0}]]):null})})]}))}}),Br=y("collapse","width: 100%;",[y("collapse-item",`
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 margin: 16px 0 0 0;
 `,[Y("disabled",[O("header","cursor: not-allowed;",[O("header-main",`
 color: var(--n-title-text-color-disabled);
 `),y("collapse-item-arrow",`
 color: var(--n-arrow-color-disabled);
 `)])]),y("collapse-item","margin-left: 32px;"),M("&:first-child","margin-top: 0;"),M("&:first-child >",[O("header","padding-top: 0;")]),Y("left-arrow-placement",[O("header",[y("collapse-item-arrow","margin-right: 4px;")])]),Y("right-arrow-placement",[O("header",[y("collapse-item-arrow","margin-left: 4px;")])]),O("content-wrapper",[O("content-inner","padding-top: 16px;"),Qo({duration:"0.15s"})]),Y("active",[O("header",[Y("active",[y("collapse-item-arrow","transform: rotate(90deg);")])])]),M("&:not(:first-child)","border-top: 1px solid var(--n-divider-color);"),O("header",`
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
 `),y("collapse-item-arrow",`
 display: flex;
 transition:
 transform .15s var(--n-bezier),
 color .3s var(--n-bezier);
 font-size: 18px;
 color: var(--n-arrow-color);
 `)])])]),zr=Object.assign(Object.assign({},_e.props),{defaultExpandedNames:{type:[Array,String],default:null},expandedNames:[Array,String],arrowPlacement:{type:String,default:"left"},accordion:{type:Boolean,default:!1},displayDirective:{type:String,default:"if"},onItemHeaderClick:[Function,Array],"onUpdate:expandedNames":[Function,Array],onUpdateExpandedNames:[Function,Array],onExpandedNamesChange:{type:[Function,Array],validator:()=>!0,default:void 0}}),lo=Tt("n-collapse"),io=L({name:"Collapse",props:zr,setup(e,{slots:t}){const{mergedClsPrefixRef:n,inlineThemeDisabled:o,mergedRtlRef:a}=Ae(e),r=z(e.defaultExpandedNames),s=V(()=>e.expandedNames),l=nt(s,r),c=_e("Collapse","-collapse",Br,ea,e,n);function i(C){const{"onUpdate:expandedNames":b,onUpdateExpandedNames:S,onExpandedNamesChange:$}=e;S&&le(S,C),b&&le(b,C),$&&le($,C),r.value=C}function f(C){const{onItemHeaderClick:b}=e;b&&le(b,C)}function d(C,b,S){const{accordion:$}=e,{value:F}=l;if($)C?(i([b]),f({name:b,expanded:!0,event:S})):(i([]),f({name:b,expanded:!1,event:S}));else if(!Array.isArray(F))i([b]),f({name:b,expanded:!0,event:S});else{const T=F.slice(),j=T.findIndex(I=>b===I);~j?(T.splice(j,1),i(T),f({name:b,expanded:!1,event:S})):(T.push(b),i(T),f({name:b,expanded:!0,event:S}))}}At(lo,{props:e,mergedClsPrefixRef:n,expandedNamesRef:l,slots:t,toggleItem:d});const p=xt("Collapse",a,n),m=V(()=>{const{common:{cubicBezierEaseInOut:C},self:{titleFontWeight:b,dividerColor:S,titleTextColor:$,titleTextColorDisabled:F,textColor:T,arrowColor:j,fontSize:I,titleFontSize:g,arrowColorDisabled:x}}=c.value;return{"--n-font-size":I,"--n-bezier":C,"--n-text-color":T,"--n-divider-color":S,"--n-title-font-size":g,"--n-title-text-color":$,"--n-title-text-color-disabled":F,"--n-title-font-weight":b,"--n-arrow-color":j,"--n-arrow-color-disabled":x}}),w=o?ct("collapse",void 0,m,e):void 0;return{rtlEnabled:p,mergedTheme:c,mergedClsPrefix:n,cssVars:o?void 0:m,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),h("div",{class:[`${this.mergedClsPrefix}-collapse`,this.rtlEnabled&&`${this.mergedClsPrefix}-collapse--rtl`,this.themeClass],style:this.cssVars},this.$slots)}}),Fr=L({name:"CollapseItemContent",props:{displayDirective:{type:String,required:!0},show:Boolean,clsPrefix:{type:String,required:!0}},setup(e){return{onceTrue:ta(ye(e,"show"))}},render(){return h(na,null,{default:()=>{const{show:e,displayDirective:t,onceTrue:n,clsPrefix:o}=this,a=t==="show"&&n,r=h("div",{class:`${o}-collapse-item__content-wrapper`},h("div",{class:`${o}-collapse-item__content-inner`},this.$slots));return a?me(r,[[De,e]]):e?r:null}})}}),Er={title:String,name:[String,Number],disabled:Boolean,displayDirective:String},so=L({name:"CollapseItem",props:Er,setup(e){const{mergedRtlRef:t}=Ae(e),n=oa(),o=Ee(()=>{var d;return(d=e.name)!==null&&d!==void 0?d:n}),a=dt(lo);a||Hn("collapse-item","`n-collapse-item` must be placed inside `n-collapse`.");const{expandedNamesRef:r,props:s,mergedClsPrefixRef:l,slots:c}=a,i=V(()=>{const{value:d}=r;if(Array.isArray(d)){const{value:p}=o;return!~d.findIndex(m=>m===p)}else if(d){const{value:p}=o;return p!==d}return!0});return{rtlEnabled:xt("Collapse",t,l),collapseSlots:c,randomName:n,mergedClsPrefix:l,collapsed:i,mergedDisplayDirective:V(()=>{const{displayDirective:d}=e;return d||s.displayDirective}),arrowPlacement:V(()=>s.arrowPlacement),handleClick(d){a&&!e.disabled&&a.toggleItem(i.value,o.value,d)}}},render(){var e;const{collapseSlots:t,$slots:n,arrowPlacement:o,collapsed:a,mergedDisplayDirective:r,mergedClsPrefix:s,disabled:l}=this,c=n.header?n.header():this.title,i=n["header-extra"]||t["header-extra"],f=n.arrow||t.arrow;return h("div",{class:[`${s}-collapse-item`,`${s}-collapse-item--${o}-arrow-placement`,l&&`${s}-collapse-item--disabled`,!a&&`${s}-collapse-item--active`]},h("div",{class:[`${s}-collapse-item__header`,!a&&`${s}-collapse-item__header--active`]},h("div",{class:`${s}-collapse-item__header-main`,onClick:this.handleClick},o==="right"&&c,h("div",{class:`${s}-collapse-item-arrow`,key:this.rtlEnabled?0:1},f?f({collapsed:a}):h(Dt,{clsPrefix:s},{default:(e=t.expandIcon)!==null&&e!==void 0?e:()=>this.rtlEnabled?h(er,null):h(aa,null)})),o==="left"&&c),i&&h("div",{class:`${s}-collapse-item__header-extra`,onClick:this.handleClick},{default:i})),h(Fr,{clsPrefix:s,displayDirective:r,show:!a},n))}}),Tr={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},co=Tt("n-radio-group");function Pr(e){const t=Pt(e,{mergedSize($){const{size:F}=e;if(F!==void 0)return F;if(s){const{mergedSizeRef:{value:T}}=s;if(T!==void 0)return T}return $?$.mergedSize.value:"medium"},mergedDisabled($){return!!(e.disabled||s!=null&&s.disabledRef.value||$!=null&&$.disabled.value)}}),{mergedSizeRef:n,mergedDisabledRef:o}=t,a=z(null),r=z(null),s=dt(co,null),l=z(e.defaultChecked),c=ye(e,"checked"),i=nt(c,l),f=Ee(()=>s?s.valueRef.value===e.value:i.value),d=Ee(()=>{const{name:$}=e;if($!==void 0)return $;if(s)return s.nameRef.value}),p=z(!1);function m(){if(s){const{doUpdateValue:$}=s,{value:F}=e;le($,F)}else{const{onUpdateChecked:$,"onUpdate:checked":F}=e,{nTriggerFormInput:T,nTriggerFormChange:j}=t;$&&le($,!0),F&&le(F,!0),T(),j(),l.value=!0}}function w(){o.value||f.value||m()}function C(){w()}function b(){p.value=!1}function S(){p.value=!0}return{mergedClsPrefix:s?s.mergedClsPrefixRef:Ae(e).mergedClsPrefixRef,inputRef:a,labelRef:r,mergedName:d,mergedDisabled:o,uncontrolledChecked:l,renderSafeChecked:f,focus:p,mergedSize:n,handleRadioInputChange:C,handleRadioInputBlur:b,handleRadioInputFocus:S}}const Ar=y("radio",`
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
`,[Y("checked",[O("dot",`
 background-color: var(--n-color-active);
 `)]),O("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),y("radio-input",`
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
 `,[M("&::before",`
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
 `),Y("checked",{boxShadow:"var(--n-box-shadow-active)"},[M("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),O("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),bt("disabled",`
 cursor: pointer;
 `,[M("&:hover",[O("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),Y("focus",[M("&:not(:active)",[O("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),Y("disabled",`
 cursor: not-allowed;
 `,[O("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[M("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),Y("checked",`
 opacity: 1;
 `)]),O("label",{color:"var(--n-text-color-disabled)"}),y("radio-input",`
 cursor: not-allowed;
 `)])]),Nr=L({name:"Radio",props:Object.assign(Object.assign({},_e.props),Tr),setup(e){const t=Pr(e),n=_e("Radio","-radio",Ar,Wn,e,t.mergedClsPrefix),o=V(()=>{const{mergedSize:{value:i}}=t,{common:{cubicBezierEaseInOut:f},self:{boxShadow:d,boxShadowActive:p,boxShadowDisabled:m,boxShadowFocus:w,boxShadowHover:C,color:b,colorDisabled:S,colorActive:$,textColor:F,textColorDisabled:T,dotColorActive:j,dotColorDisabled:I,labelPadding:g,labelLineHeight:x,[be("fontSize",i)]:_,[be("radioSize",i)]:B}}=n.value;return{"--n-bezier":f,"--n-label-line-height":x,"--n-box-shadow":d,"--n-box-shadow-active":p,"--n-box-shadow-disabled":m,"--n-box-shadow-focus":w,"--n-box-shadow-hover":C,"--n-color":b,"--n-color-active":$,"--n-color-disabled":S,"--n-dot-color-active":j,"--n-dot-color-disabled":I,"--n-font-size":_,"--n-radio-size":B,"--n-text-color":F,"--n-text-color-disabled":T,"--n-label-padding":g}}),{inlineThemeDisabled:a,mergedClsPrefixRef:r,mergedRtlRef:s}=Ae(e),l=xt("Radio",s,r),c=a?ct("radio",V(()=>t.mergedSize.value[0]),o,e):void 0;return Object.assign(t,{rtlEnabled:l,cssVars:a?void 0:o,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender})},render(){const{$slots:e,mergedClsPrefix:t,onRender:n,label:o}=this;return n==null||n(),h("label",{class:[`${t}-radio`,this.themeClass,{[`${t}-radio--rtl`]:this.rtlEnabled,[`${t}-radio--disabled`]:this.mergedDisabled,[`${t}-radio--checked`]:this.renderSafeChecked,[`${t}-radio--focus`]:this.focus}],style:this.cssVars},h("input",{ref:"inputRef",type:"radio",class:`${t}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur}),h("div",{class:`${t}-radio__dot-wrapper`},"\xA0",h("div",{class:[`${t}-radio__dot`,this.renderSafeChecked&&`${t}-radio__dot--checked`]})),vt(e.default,a=>!a&&!o?null:h("div",{ref:"labelRef",class:`${t}-radio__label`},a||o)))}}),Vr=y("radio-group",`
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
 `,[Y("checked",{backgroundColor:"var(--n-button-border-color-active)"}),Y("disabled",{opacity:"var(--n-opacity-disabled)"})]),Y("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[y("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),O("splitor",{height:"var(--n-height)"})]),y("radio-button",`
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
 `,[y("radio-input",`
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
 `),M("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[O("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),M("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[O("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),bt("disabled",`
 cursor: pointer;
 `,[M("&:hover",[O("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),bt("checked",{color:"var(--n-button-text-color-hover)"})]),Y("focus",[M("&:not(:active)",[O("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),Y("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),Y("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function Lr(e,t,n){var o;const a=[];let r=!1;for(let s=0;s<e.length;++s){const l=e[s],c=(o=l.type)===null||o===void 0?void 0:o.name;c==="RadioButton"&&(r=!0);const i=l.props;if(c!=="RadioButton"){a.push(l);continue}if(s===0)a.push(l);else{const f=a[a.length-1].props,d=t===f.value,p=f.disabled,m=t===i.value,w=i.disabled,C=(d?2:0)+(p?0:1),b=(m?2:0)+(w?0:1),S={[`${n}-radio-group__splitor--disabled`]:p,[`${n}-radio-group__splitor--checked`]:d},$={[`${n}-radio-group__splitor--disabled`]:w,[`${n}-radio-group__splitor--checked`]:m},F=C<b?$:S;a.push(h("div",{class:[`${n}-radio-group__splitor`,F]}),l)}}return{children:a,isButtonGroup:r}}const Ur=Object.assign(Object.assign({},_e.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Mr=L({name:"RadioGroup",props:Ur,setup(e){const t=z(null),{mergedSizeRef:n,mergedDisabledRef:o,nTriggerFormChange:a,nTriggerFormInput:r,nTriggerFormBlur:s,nTriggerFormFocus:l}=Pt(e),{mergedClsPrefixRef:c,inlineThemeDisabled:i,mergedRtlRef:f}=Ae(e),d=_e("Radio","-radio-group",Vr,Wn,e,c),p=z(e.defaultValue),m=ye(e,"value"),w=nt(m,p);function C(j){const{onUpdateValue:I,"onUpdate:value":g}=e;I&&le(I,j),g&&le(g,j),p.value=j,a(),r()}function b(j){const{value:I}=t;!I||I.contains(j.relatedTarget)||l()}function S(j){const{value:I}=t;!I||I.contains(j.relatedTarget)||s()}At(co,{mergedClsPrefixRef:c,nameRef:ye(e,"name"),valueRef:w,disabledRef:o,mergedSizeRef:n,doUpdateValue:C});const $=xt("Radio",f,c),F=V(()=>{const{value:j}=n,{common:{cubicBezierEaseInOut:I},self:{buttonBorderColor:g,buttonBorderColorActive:x,buttonBorderRadius:_,buttonBoxShadow:B,buttonBoxShadowFocus:N,buttonBoxShadowHover:q,buttonColorActive:ie,buttonTextColor:se,buttonTextColorActive:H,buttonTextColorHover:Z,opacityDisabled:W,[be("buttonHeight",j)]:K,[be("fontSize",j)]:fe}}=d.value;return{"--n-font-size":fe,"--n-bezier":I,"--n-button-border-color":g,"--n-button-border-color-active":x,"--n-button-border-radius":_,"--n-button-box-shadow":B,"--n-button-box-shadow-focus":N,"--n-button-box-shadow-hover":q,"--n-button-color-active":ie,"--n-button-text-color":se,"--n-button-text-color-hover":Z,"--n-button-text-color-active":H,"--n-height":K,"--n-opacity-disabled":W}}),T=i?ct("radio-group",V(()=>n.value[0]),F,e):void 0;return{selfElRef:t,rtlEnabled:$,mergedClsPrefix:c,mergedValue:w,handleFocusout:S,handleFocusin:b,cssVars:i?void 0:F,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender}},render(){var e;const{mergedValue:t,mergedClsPrefix:n,handleFocusin:o,handleFocusout:a}=this,{children:r,isButtonGroup:s}=Lr(mt(oo(this)),t,n);return(e=this.onRender)===null||e===void 0||e.call(this),h("div",{onFocusin:o,onFocusout:a,ref:"selfElRef",class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,s&&`${n}-radio-group--button-group`],style:this.cssVars},r)}}),uo=Symbol("DESCRIPTION_ITEM_FLAG");function Or(e){return typeof e=="object"&&e&&!Array.isArray(e)?e.type&&e.type[uo]:!1}const jr=M([y("descriptions",{fontSize:"var(--n-font-size)"},[y("descriptions-separator",`
 display: inline-block;
 margin: 0 8px 0 2px;
 `),y("descriptions-table-wrapper",[y("descriptions-table",[y("descriptions-table-row",[y("descriptions-table-header",{padding:"var(--n-th-padding)"}),y("descriptions-table-content",{padding:"var(--n-td-padding)"})])])]),bt("bordered",[y("descriptions-table-wrapper",[y("descriptions-table",[y("descriptions-table-row",[M("&:last-child",[y("descriptions-table-content",{paddingBottom:0})])])])])]),Y("left-label-placement",[y("descriptions-table-content",[M("> *",{verticalAlign:"top"})])]),Y("left-label-align",[M("th",{textAlign:"left"})]),Y("center-label-align",[M("th",{textAlign:"center"})]),Y("right-label-align",[M("th",{textAlign:"right"})]),Y("bordered",[y("descriptions-table-wrapper",`
 border-radius: var(--n-border-radius);
 overflow: hidden;
 background: var(--n-merged-td-color);
 border: 1px solid var(--n-merged-border-color);
 `,[y("descriptions-table",[y("descriptions-table-row",[M("&:not(:last-child)",[y("descriptions-table-content",{borderBottom:"1px solid var(--n-merged-border-color)"}),y("descriptions-table-header",{borderBottom:"1px solid var(--n-merged-border-color)"})]),y("descriptions-table-header",`
 font-weight: 400;
 background-clip: padding-box;
 background-color: var(--n-merged-th-color);
 `,[M("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})]),y("descriptions-table-content",[M("&:not(:last-child)",{borderRight:"1px solid var(--n-merged-border-color)"})])])])])]),y("descriptions-header",`
 font-weight: var(--n-th-font-weight);
 font-size: 18px;
 transition: color .3s var(--n-bezier);
 line-height: var(--n-line-height);
 margin-bottom: 16px;
 color: var(--n-title-text-color);
 `),y("descriptions-table-wrapper",`
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[y("descriptions-table",`
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 box-sizing: border-box;
 `,[y("descriptions-table-row",`
 box-sizing: border-box;
 transition: border-color .3s var(--n-bezier);
 `,[y("descriptions-table-header",`
 font-weight: var(--n-th-font-weight);
 line-height: var(--n-line-height);
 display: table-cell;
 box-sizing: border-box;
 color: var(--n-th-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),y("descriptions-table-content",`
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
 `)])])])]),y("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color);
 --n-merged-td-color: var(--n-td-color);
 --n-merged-border-color: var(--n-border-color);
 `),ra(y("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-modal);
 --n-merged-td-color: var(--n-td-color-modal);
 --n-merged-border-color: var(--n-border-color-modal);
 `)),la(y("descriptions-table-wrapper",`
 --n-merged-th-color: var(--n-th-color-popover);
 --n-merged-td-color: var(--n-td-color-popover);
 --n-merged-border-color: var(--n-border-color-popover);
 `))]),Hr=Object.assign(Object.assign({},_e.props),{title:String,column:{type:Number,default:3},columns:Number,labelPlacement:{type:String,default:"top"},labelAlign:{type:String,default:"left"},separator:{type:String,default:":"},size:{type:String,default:"medium"},bordered:Boolean,labelStyle:[Object,String],contentStyle:[Object,String]}),Wr=L({name:"Descriptions",props:Hr,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:n}=Ae(e),o=_e("Descriptions","-descriptions",jr,ia,e,t),a=V(()=>{const{size:s,bordered:l}=e,{common:{cubicBezierEaseInOut:c},self:{titleTextColor:i,thColor:f,thColorModal:d,thColorPopover:p,thTextColor:m,thFontWeight:w,tdTextColor:C,tdColor:b,tdColorModal:S,tdColorPopover:$,borderColor:F,borderColorModal:T,borderColorPopover:j,borderRadius:I,lineHeight:g,[be("fontSize",s)]:x,[be(l?"thPaddingBordered":"thPadding",s)]:_,[be(l?"tdPaddingBordered":"tdPadding",s)]:B}}=o.value;return{"--n-title-text-color":i,"--n-th-padding":_,"--n-td-padding":B,"--n-font-size":x,"--n-bezier":c,"--n-th-font-weight":w,"--n-line-height":g,"--n-th-text-color":m,"--n-td-text-color":C,"--n-th-color":f,"--n-th-color-modal":d,"--n-th-color-popover":p,"--n-td-color":b,"--n-td-color-modal":S,"--n-td-color-popover":$,"--n-border-radius":I,"--n-border-color":F,"--n-border-color-modal":T,"--n-border-color-popover":j}}),r=n?ct("descriptions",V(()=>{let s="";const{size:l,bordered:c}=e;return c&&(s+="a"),s+=l[0],s}),a,e):void 0;return{mergedClsPrefix:t,cssVars:n?void 0:a,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender,compitableColumn:Qt(e,["columns","column"]),inlineThemeDisabled:n}},render(){const e=this.$slots.default,t=e?mt(e()):[];t.length;const{compitableColumn:n,labelPlacement:o,labelAlign:a,size:r,bordered:s,title:l,cssVars:c,mergedClsPrefix:i,separator:f,onRender:d}=this;d==null||d();const p=t.filter(b=>Or(b)),m={span:0,row:[],secondRow:[],rows:[]},C=p.reduce((b,S,$)=>{const F=S.props||{},T=p.length-1===$,j=["label"in F?F.label:kn(S,"label")],I=[kn(S)],g=F.span||1,x=b.span;b.span+=g;const _=F.labelStyle||F["label-style"]||this.labelStyle,B=F.contentStyle||F["content-style"]||this.contentStyle;if(o==="left")s?b.row.push(h("th",{class:`${i}-descriptions-table-header`,colspan:1,style:_},j),h("td",{class:`${i}-descriptions-table-content`,colspan:T?(n-x)*2+1:g*2-1,style:B},I)):b.row.push(h("td",{class:`${i}-descriptions-table-content`,colspan:T?(n-x)*2:g*2},h("span",{class:`${i}-descriptions-table-content__label`,style:_},[...j,f&&h("span",{class:`${i}-descriptions-separator`},f)]),h("span",{class:`${i}-descriptions-table-content__content`,style:B},I)));else{const N=T?(n-x)*2:g*2;b.row.push(h("th",{class:`${i}-descriptions-table-header`,colspan:N,style:_},j)),b.secondRow.push(h("td",{class:`${i}-descriptions-table-content`,colspan:N,style:B},I))}return(b.span>=n||T)&&(b.span=0,b.row.length&&(b.rows.push(b.row),b.row=[]),o!=="left"&&b.secondRow.length&&(b.rows.push(b.secondRow),b.secondRow=[])),b},m).rows.map(b=>h("tr",{class:`${i}-descriptions-table-row`},b));return h("div",{style:c,class:[`${i}-descriptions`,this.themeClass,`${i}-descriptions--${o}-label-placement`,`${i}-descriptions--${a}-label-align`,`${i}-descriptions--${r}-size`,s&&`${i}-descriptions--bordered`]},l||this.$slots.header?h("div",{class:`${i}-descriptions-header`},l||oo(this,"header")):null,h("div",{class:`${i}-descriptions-table-wrapper`},h("table",{class:`${i}-descriptions-table`},h("tbody",null,C))))}}),Xr={label:String,span:{type:Number,default:1},labelStyle:[Object,String],contentStyle:[Object,String]},Gr=L({name:"DescriptionsItem",[uo]:!0,props:Xr,render(){return null}});function qr(e){return e==null||typeof e=="string"&&e.trim()===""?null:Number(e)}function Yr(e){return e.includes(".")&&(/^(-)?\d+.*(\.|0)$/.test(e)||/^\.\d+$/.test(e))}function Xt(e){return e==null?!0:!Number.isNaN(e)}function In(e,t){return e==null?"":t===void 0?String(e):e.toFixed(t)}function Gt(e){if(e===null)return null;if(typeof e=="number")return e;{const t=Number(e);return Number.isNaN(t)?null:t}}const Kr=M([y("input-number-suffix",`
 display: inline-block;
 margin-right: 10px;
 `),y("input-number-prefix",`
 display: inline-block;
 margin-left: 10px;
 `)]),Bn=800,zn=100,Jr=Object.assign(Object.assign({},_e.props),{autofocus:Boolean,loading:{type:Boolean,default:void 0},placeholder:String,defaultValue:{type:Number,default:null},value:Number,step:{type:[Number,String],default:1},min:[Number,String],max:[Number,String],size:String,disabled:{type:Boolean,default:void 0},validator:Function,bordered:{type:Boolean,default:void 0},showButton:{type:Boolean,default:!0},buttonPlacement:{type:String,default:"right"},readonly:Boolean,clearable:Boolean,keyboard:{type:Object,default:{}},updateValueOnInput:{type:Boolean,default:!0},parse:Function,format:Function,precision:Number,status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClear:[Function,Array],onChange:[Function,Array]}),hn=L({name:"InputNumber",props:Jr,setup(e){const{mergedBorderedRef:t,mergedClsPrefixRef:n,mergedRtlRef:o}=Ae(e),a=_e("InputNumber","-input-number",Kr,sa,e,n),{localeRef:r}=jn("InputNumber"),s=Pt(e),{mergedSizeRef:l,mergedDisabledRef:c,mergedStatusRef:i}=s,f=z(null),d=z(null),p=z(null),m=z(e.defaultValue),w=ye(e,"value"),C=nt(w,m),b=z(""),S=u=>{const k=String(u).split(".")[1];return k?k.length:0},$=u=>{const k=[e.min,e.max,e.step,u].map(A=>A===void 0?0:S(A));return Math.max(...k)},F=Ee(()=>{const{placeholder:u}=e;return u!==void 0?u:r.value.placeholder}),T=Ee(()=>{const u=Gt(e.step);return u!==null?u===0?1:Math.abs(u):1}),j=Ee(()=>{const u=Gt(e.min);return u!==null?u:null}),I=Ee(()=>{const u=Gt(e.max);return u!==null?u:null}),g=u=>{const{value:k}=C;if(u===k){_();return}const{"onUpdate:value":A,onUpdateValue:G,onChange:te}=e,{nTriggerFormInput:ee,nTriggerFormChange:ce}=s;te&&le(te,u),G&&le(G,u),A&&le(A,u),m.value=u,ee(),ce()},x=({offset:u,doUpdateIfValid:k,fixPrecision:A,isInputing:G})=>{const{value:te}=b;if(G&&Yr(te))return!1;const ee=(e.parse||qr)(te);if(ee===null)return k&&g(null),null;if(Xt(ee)){const ce=S(ee),{precision:re}=e;if(re!==void 0&&re<ce&&!A)return!1;let he=parseFloat((ee+u).toFixed(re!=null?re:$(ee)));if(Xt(he)){const{value:qe}=I,{value:Ye}=j;if(qe!==null&&he>qe){if(!k||G)return!1;he=qe}if(Ye!==null&&he<Ye){if(!k||G)return!1;he=Ye}return e.validator&&!e.validator(he)?!1:(k&&g(he),he)}}return!1},_=()=>{const{value:u}=C;if(Xt(u)){const{format:k,precision:A}=e;k?b.value=k(u):u===null||A===void 0||S(u)>A?b.value=In(u,void 0):b.value=In(u,A)}else b.value=String(u)};_();const B=Ee(()=>x({offset:0,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})===!1),N=Ee(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=T;return x({offset:-k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1}),q=Ee(()=>{const{value:u}=C;if(e.validator&&u===null)return!1;const{value:k}=T;return x({offset:+k,doUpdateIfValid:!1,isInputing:!1,fixPrecision:!1})!==!1});function ie(u){const{onFocus:k}=e,{nTriggerFormFocus:A}=s;k&&le(k,u),A()}function se(u){var k,A;if(u.target===((k=f.value)===null||k===void 0?void 0:k.wrapperElRef))return;const G=x({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0});if(G!==!1){const ce=(A=f.value)===null||A===void 0?void 0:A.inputElRef;ce&&(ce.value=String(G||"")),C.value===G&&_()}else _();const{onBlur:te}=e,{nTriggerFormBlur:ee}=s;te&&le(te,u),ee()}function H(u){const{onClear:k}=e;k&&le(k,u)}function Z(){const{value:u}=q;if(!u){ge();return}const{value:k}=C;if(k===null)e.validator||g(pe());else{const{value:A}=T;x({offset:A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}function W(){const{value:u}=N;if(!u){ne();return}const{value:k}=C;if(k===null)e.validator||g(pe());else{const{value:A}=T;x({offset:-A,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})}}const K=ie,fe=se;function pe(){if(e.validator)return null;const{value:u}=j,{value:k}=I;return u!==null?Math.max(0,u):k!==null?Math.min(0,k):0}function ve(u){H(u),g(null)}function oe(u){var k,A,G;!((k=p.value)===null||k===void 0)&&k.$el.contains(u.target)&&u.preventDefault(),!((A=d.value)===null||A===void 0)&&A.$el.contains(u.target)&&u.preventDefault(),(G=f.value)===null||G===void 0||G.activate()}let xe=null,de=null,ae=null;function ne(){ae&&(window.clearTimeout(ae),ae=null),xe&&(window.clearInterval(xe),xe=null)}function ge(){Le&&(window.clearTimeout(Le),Le=null),de&&(window.clearInterval(de),de=null)}function ke(){ne(),ae=window.setTimeout(()=>{xe=window.setInterval(()=>{W()},zn)},Bn),Xe("mouseup",document,ne,{once:!0})}let Le=null;function at(){ge(),Le=window.setTimeout(()=>{de=window.setInterval(()=>{Z()},zn)},Bn),Xe("mouseup",document,ge,{once:!0})}const ut=()=>{de||Z()},rt=()=>{xe||W()};function ze(u){var k,A;if(u.key==="Enter"){if(u.target===((k=f.value)===null||k===void 0?void 0:k.wrapperElRef))return;x({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&((A=f.value)===null||A===void 0||A.deactivate())}else if(u.key==="ArrowUp"){if(!q.value||e.keyboard.ArrowUp===!1)return;u.preventDefault(),x({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&Z()}else if(u.key==="ArrowDown"){if(!N.value||e.keyboard.ArrowDown===!1)return;u.preventDefault(),x({offset:0,doUpdateIfValid:!0,isInputing:!1,fixPrecision:!0})!==!1&&W()}}function D(u){b.value=u,e.updateValueOnInput&&!e.format&&!e.parse&&e.precision===void 0&&x({offset:0,doUpdateIfValid:!0,isInputing:!0,fixPrecision:!1})}Pe(C,()=>{_()});const E={focus:()=>{var u;return(u=f.value)===null||u===void 0?void 0:u.focus()},blur:()=>{var u;return(u=f.value)===null||u===void 0?void 0:u.blur()}},Q=xt("InputNumber",o,n);return Object.assign(Object.assign({},E),{rtlEnabled:Q,inputInstRef:f,minusButtonInstRef:d,addButtonInstRef:p,mergedClsPrefix:n,mergedBordered:t,uncontrolledValue:m,mergedValue:C,mergedPlaceholder:F,displayedValueInvalid:B,mergedSize:l,mergedDisabled:c,displayedValue:b,addable:q,minusable:N,mergedStatus:i,handleFocus:K,handleBlur:fe,handleClear:ve,handleMouseDown:oe,handleAddClick:ut,handleMinusClick:rt,handleAddMousedown:at,handleMinusMousedown:ke,handleKeyDown:ze,handleUpdateDisplayedValue:D,mergedTheme:a,inputThemeOverrides:{paddingSmall:"0 8px 0 10px",paddingMedium:"0 8px 0 12px",paddingLarge:"0 8px 0 14px"},buttonThemeOverrides:V(()=>{const{self:{iconColorDisabled:u}}=a.value,[k,A,G,te]=Te(u);return{textColorTextDisabled:`rgb(${k}, ${A}, ${G})`,opacityDisabled:`${te}`}})})},render(){const{mergedClsPrefix:e,$slots:t}=this,n=()=>h(yn,{text:!0,disabled:!this.minusable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleMinusClick,onMousedown:this.handleMinusMousedown,ref:"minusButtonInstRef"},{icon:()=>xn(t["minus-icon"],()=>[h(Dt,{clsPrefix:e},{default:()=>h(tr,null)})])}),o=()=>h(yn,{text:!0,disabled:!this.addable||this.mergedDisabled||this.readonly,focusable:!1,theme:this.mergedTheme.peers.Button,themeOverrides:this.mergedTheme.peerOverrides.Button,builtinThemeOverrides:this.buttonThemeOverrides,onClick:this.handleAddClick,onMousedown:this.handleAddMousedown,ref:"addButtonInstRef"},{icon:()=>xn(t["add-icon"],()=>[h(Dt,{clsPrefix:e},{default:()=>h(ao,null)})])});return h("div",{class:[`${e}-input-number`,this.rtlEnabled&&`${e}-input-number--rtl`]},h(yt,{ref:"inputInstRef",autofocus:this.autofocus,status:this.mergedStatus,bordered:this.mergedBordered,loading:this.loading,value:this.displayedValue,onUpdateValue:this.handleUpdateDisplayedValue,theme:this.mergedTheme.peers.Input,themeOverrides:this.mergedTheme.peerOverrides.Input,builtinThemeOverrides:this.inputThemeOverrides,size:this.mergedSize,placeholder:this.mergedPlaceholder,disabled:this.mergedDisabled,readonly:this.readonly,textDecoration:this.displayedValueInvalid?"line-through":void 0,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeydown:this.handleKeyDown,onMousedown:this.handleMouseDown,onClear:this.handleClear,clearable:this.clearable,internalLoadingBeforeSuffix:!0},{prefix:()=>{var a;return this.showButton&&this.buttonPlacement==="both"?[n(),vt(t.prefix,r=>r?h("span",{class:`${e}-input-number-prefix`},r):null)]:(a=t.prefix)===null||a===void 0?void 0:a.call(t)},suffix:()=>{var a;return this.showButton?[vt(t.suffix,r=>r?h("span",{class:`${e}-input-number-suffix`},r):null),this.buttonPlacement==="right"?n():null,o()]:(a=t.suffix)===null||a===void 0?void 0:a.call(t)}}))}}),Zr=Object.assign(Object.assign({},_e.props),{trigger:String,xScrollable:Boolean,onScroll:Function}),Qr=L({name:"Scrollbar",props:Zr,setup(){const e=z(null);return Object.assign(Object.assign({},{scrollTo:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollTo(n[0],n[1])},scrollBy:(...n)=>{var o;(o=e.value)===null||o===void 0||o.scrollBy(n[0],n[1])}}),{scrollbarInstRef:e})},render(){return h(da,Object.assign({ref:"scrollbarInstRef"},this.$props),this.$slots)}}),fo=Qr,mn=Tt("n-tabs"),po={tab:[String,Number,Object,Function],name:{type:[String,Number],required:!0},disabled:Boolean,displayDirective:{type:String,default:"if"},closable:{type:Boolean,default:void 0},tabProps:Object,label:[String,Number,Object,Function]},Ze=L({__TAB_PANE__:!0,name:"TabPane",alias:["TabPanel"],props:po,setup(e){const t=dt(mn,null);return t||Hn("tab-pane","`n-tab-pane` must be placed inside `n-tabs`."),{style:t.paneStyleRef,class:t.paneClassRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){return h("div",{class:[`${this.mergedClsPrefix}-tab-pane`,this.class],style:this.style},this.$slots)}}),el=Object.assign({internalLeftPadded:Boolean,internalAddable:Boolean,internalCreatedByPane:Boolean},pa(po,["displayDirective"])),dn=L({__TAB__:!0,inheritAttrs:!1,name:"Tab",props:el,setup(e){const{mergedClsPrefixRef:t,valueRef:n,typeRef:o,closableRef:a,tabStyleRef:r,tabChangeIdRef:s,onBeforeLeaveRef:l,triggerRef:c,handleAdd:i,activateTab:f,handleClose:d}=dt(mn);return{trigger:c,mergedClosable:V(()=>{if(e.internalAddable)return!1;const{closable:p}=e;return p===void 0?a.value:p}),style:r,clsPrefix:t,value:n,type:o,handleClose(p){p.stopPropagation(),!e.disabled&&d(e.name)},activateTab(){if(e.disabled)return;if(e.internalAddable){i();return}const{name:p}=e,m=++s.id;if(p!==n.value){const{value:w}=l;w?Promise.resolve(w(e.name,n.value)).then(C=>{C&&s.id===m&&f(p)}):f(p)}}}},render(){const{internalAddable:e,clsPrefix:t,name:n,disabled:o,label:a,tab:r,value:s,mergedClosable:l,style:c,trigger:i,$slots:{default:f}}=this,d=a!=null?a:r;return h("div",{class:`${t}-tabs-tab-wrapper`},this.internalLeftPadded?h("div",{class:`${t}-tabs-tab-pad`}):null,h("div",Object.assign({key:n,"data-name":n,"data-disabled":o?!0:void 0},ca({class:[`${t}-tabs-tab`,s===n&&`${t}-tabs-tab--active`,o&&`${t}-tabs-tab--disabled`,l&&`${t}-tabs-tab--closable`,e&&`${t}-tabs-tab--addable`],onClick:i==="click"?this.activateTab:void 0,onMouseenter:i==="hover"?this.activateTab:void 0,style:e?void 0:c},this.internalCreatedByPane?this.tabProps||{}:this.$attrs)),h("span",{class:`${t}-tabs-tab__label`},e?h(Ce,null,h("div",{class:`${t}-tabs-tab__height-placeholder`},"\xA0"),h(Dt,{clsPrefix:t},{default:()=>h(ao,null)})):f?f():typeof d=="object"?d:ua(d!=null?d:n)),l&&this.type==="card"?h(fa,{clsPrefix:t,class:`${t}-tabs-tab__close`,onClick:this.handleClose,disabled:o}):null))}}),tl=y("tabs",`
 box-sizing: border-box;
 width: 100%;
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
`,[Y("segment-type",[y("tabs-rail",[M("&.transition-disabled","color: red;",[y("tabs-tab",`
 transition: none;
 `)])])]),y("tabs-rail",`
 padding: 3px;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 background-color: var(--n-color-segment);
 transition: background-color .3s var(--n-bezier);
 display: flex;
 align-items: center;
 `,[y("tabs-tab-wrapper",`
 flex-basis: 0;
 flex-grow: 1;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[y("tabs-tab",`
 overflow: hidden;
 border-radius: var(--n-tab-border-radius);
 width: 100%;
 display: flex;
 align-items: center;
 justify-content: center;
 `,[Y("active",`
 font-weight: var(--n-font-weight-strong);
 color: var(--n-tab-text-color-active);
 background-color: var(--n-tab-color-segment);
 box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .08);
 `),M("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])])]),Y("flex",[y("tabs-nav",{width:"100%"},[y("tabs-wrapper",{width:"100%"},[y("tabs-tab",{marginRight:0})])])]),y("tabs-nav",`
 box-sizing: border-box;
 line-height: 1.5;
 display: flex;
 transition: border-color .3s var(--n-bezier);
 `,[O("prefix, suffix",`
 display: flex;
 align-items: center;
 `),O("prefix","padding-right: 16px;"),O("suffix","padding-left: 16px;")]),y("tabs-nav-scroll-wrapper",`
 flex: 1;
 position: relative;
 overflow: hidden;
 `,[Y("shadow-before",[M("&::before",`
 box-shadow: inset 10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),Y("shadow-after",[M("&::after",`
 box-shadow: inset -10px 0 8px -8px rgba(0, 0, 0, .12);
 `)]),M("&::before, &::after",`
 transition: box-shadow .3s var(--n-bezier);
 pointer-events: none;
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 20px;
 z-index: 1;
 `),M("&::before",`
 left: 0;
 `),M("&::after",`
 right: 0;
 `)]),y("tabs-nav-scroll-content",`
 display: flex;
 position: relative;
 min-width: 100%;
 width: fit-content;
 `),y("tabs-wrapper",`
 display: inline-flex;
 flex-wrap: nowrap;
 position: relative;
 `),y("tabs-tab-wrapper",`
 display: flex;
 flex-wrap: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `),y("tabs-tab",`
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
 `,[Y("disabled",{cursor:"not-allowed"}),O("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `),O("label",`
 display: flex;
 align-items: center;
 `)]),y("tabs-bar",`
 position: absolute;
 bottom: 0;
 height: 2px;
 border-radius: 1px;
 background-color: var(--n-bar-color);
 transition:
 left .2s var(--n-bezier),
 max-width .2s var(--n-bezier),
 background-color .3s var(--n-bezier);
 `,[M("&.transition-disabled",`
 transition: none;
 `),Y("disabled",`
 background-color: var(--n-tab-text-color-disabled)
 `)]),y("tabs-pane-wrapper",`
 position: relative;
 overflow: hidden;
 transition: max-height .2s var(--n-bezier);
 `),y("tab-pane",`
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
 `,[M("&.next-transition-leave-active, &.prev-transition-leave-active, &.next-transition-enter-active, &.prev-transition-enter-active",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .2s var(--n-bezier),
 opacity .2s var(--n-bezier);
 `),M("&.next-transition-leave-active, &.prev-transition-leave-active",`
 position: absolute;
 `),M("&.next-transition-enter-from, &.prev-transition-leave-to",`
 transform: translateX(32px);
 opacity: 0;
 `),M("&.next-transition-leave-to, &.prev-transition-enter-from",`
 transform: translateX(-32px);
 opacity: 0;
 `),M("&.next-transition-leave-from, &.next-transition-enter-to, &.prev-transition-leave-from, &.prev-transition-enter-to",`
 transform: translateX(0);
 opacity: 1;
 `)]),y("tabs-tab-pad",`
 width: var(--n-tab-gap);
 flex-grow: 0;
 flex-shrink: 0;
 `),Y("line-type, bar-type",[y("tabs-tab",`
 font-weight: var(--n-tab-font-weight);
 box-sizing: border-box;
 vertical-align: bottom;
 `,[M("&:hover",{color:"var(--n-tab-text-color-hover)"}),Y("active",`
 color: var(--n-tab-text-color-active);
 font-weight: var(--n-tab-font-weight-active);
 `),Y("disabled",{color:"var(--n-tab-text-color-disabled)"})])]),y("tabs-nav",[Y("line-type",[O("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),y("tabs-nav-scroll-content",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),y("tabs-bar",`
 border-radius: 0;
 bottom: -1px;
 `)]),Y("card-type",[O("prefix, suffix",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),y("tabs-pad",`
 flex-grow: 1;
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),y("tabs-tab-pad",`
 transition: border-color .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-tab-border-color);
 `),y("tabs-tab",`
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
 `,[Y("addable",`
 padding-left: 8px;
 padding-right: 8px;
 font-size: 16px;
 `,[O("height-placeholder",`
 width: 0;
 font-size: var(--n-tab-font-size);
 `),bt("disabled",[M("&:hover",`
 color: var(--n-tab-text-color-hover);
 `)])]),Y("closable","padding-right: 6px;"),Y("active",`
 border-bottom: 1px solid #0000;
 background-color: #0000;
 font-weight: var(--n-tab-font-weight-active);
 color: var(--n-tab-text-color-active);
 `),Y("disabled","color: var(--n-tab-text-color-disabled);")]),y("tabs-scroll-padding","border-bottom: 1px solid var(--n-tab-border-color);")])])]),nl=Object.assign(Object.assign({},_e.props),{value:[String,Number],defaultValue:[String,Number],trigger:{type:String,default:"click"},type:{type:String,default:"bar"},closable:Boolean,justifyContent:String,size:{type:String,default:"medium"},tabStyle:[String,Object],barWidth:Number,paneClass:String,paneStyle:[String,Object],addable:[Boolean,Object],tabsPadding:{type:Number,default:0},animated:Boolean,onBeforeLeave:Function,onAdd:Function,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],onClose:[Function,Array],labelSize:String,activeName:[String,Number],onActiveNameChange:[Function,Array]}),Et=L({name:"Tabs",props:nl,setup(e,{slots:t}){var n,o,a,r;const{mergedClsPrefixRef:s,inlineThemeDisabled:l}=Ae(e),c=_e("Tabs","-tabs",tl,ha,e,s),i=z(null),f=z(null),d=z(null),p=z(null),m=z(null),w=z(!0),C=z(!0),b=Qt(e,["labelSize","size"]),S=Qt(e,["activeName","value"]),$=z((o=(n=S.value)!==null&&n!==void 0?n:e.defaultValue)!==null&&o!==void 0?o:t.default?(r=(a=mt(t.default())[0])===null||a===void 0?void 0:a.props)===null||r===void 0?void 0:r.name:null),F=nt(S,$),T={id:0},j=V(()=>{if(!(!e.justifyContent||e.type==="card"))return{display:"flex",justifyContent:e.justifyContent}});Pe(F,()=>{T.id=0,x()});function I(){var D;const{value:E}=F;return E===null?null:(D=i.value)===null||D===void 0?void 0:D.querySelector(`[data-name="${E}"]`)}function g(D){if(e.type==="card")return;const{value:E}=f;if(!!E&&D){const Q=`${s.value}-tabs-bar--disabled`,{barWidth:u}=e;if(D.dataset.disabled==="true"?E.classList.add(Q):E.classList.remove(Q),typeof u=="number"&&D.offsetWidth>=u){const k=Math.floor((D.offsetWidth-u)/2)+D.offsetLeft;E.style.left=`${k}px`,E.style.maxWidth=`${u}px`}else E.style.left=`${D.offsetLeft}px`,E.style.maxWidth=`${D.offsetWidth}px`;E.style.width="8192px",E.offsetWidth}}function x(){if(e.type==="card")return;const D=I();D&&g(D)}const _=z(null);let B=0,N=null;function q(D){const E=_.value;if(E){B=D.getBoundingClientRect().height;const Q=`${B}px`,u=()=>{E.style.height=Q,E.style.maxHeight=Q};N?(u(),N(),N=null):N=u}}function ie(D){const E=_.value;if(E){const Q=D.getBoundingClientRect().height,u=()=>{document.body.offsetHeight,E.style.maxHeight=`${Q}px`,E.style.height=`${Math.max(B,Q)}px`};N?(N(),N=null,u()):N=u}}function se(){const D=_.value;D&&(D.style.maxHeight="",D.style.height="")}const H={value:[]},Z=z("next");function W(D){const E=F.value;let Q="next";for(const u of H.value){if(u===E)break;if(u===D){Q="prev";break}}Z.value=Q,K(D)}function K(D){const{onActiveNameChange:E,onUpdateValue:Q,"onUpdate:value":u}=e;E&&le(E,D),Q&&le(Q,D),u&&le(u,D),$.value=D}function fe(D){const{onClose:E}=e;E&&le(E,D)}function pe(){const{value:D}=f;if(!D)return;const E="transition-disabled";D.classList.add(E),x(),D.classList.remove(E)}let ve=0;function oe(D){var E;if(D.contentRect.width===0&&D.contentRect.height===0||ve===D.contentRect.width)return;ve=D.contentRect.width;const{type:Q}=e;(Q==="line"||Q==="bar")&&pe(),Q!=="segment"&&ke((E=m.value)===null||E===void 0?void 0:E.$el)}const xe=Wt(oe,64);Pe([()=>e.justifyContent,()=>e.size],()=>{kt(()=>{const{type:D}=e;(D==="line"||D==="bar")&&pe()})});const de=z(!1);function ae(D){var E;const{target:Q,contentRect:{width:u}}=D,k=Q.parentElement.offsetWidth;if(!de.value)k<u&&(de.value=!0);else{const{value:A}=p;if(!A)return;k-u>A.$el.offsetWidth&&(de.value=!1)}ke((E=m.value)===null||E===void 0?void 0:E.$el)}const ne=Wt(ae,64);function ge(){const{onAdd:D}=e;D&&D(),kt(()=>{const E=I(),{value:Q}=m;!E||!Q||Q.scrollTo({left:E.offsetLeft,top:0,behavior:"smooth"})})}function ke(D){if(!D)return;const{scrollLeft:E,scrollWidth:Q,offsetWidth:u}=D;w.value=E<=0,C.value=E+u>=Q}const Le=Wt(D=>{ke(D.target)},64);At(mn,{triggerRef:ye(e,"trigger"),tabStyleRef:ye(e,"tabStyle"),paneClassRef:ye(e,"paneClass"),paneStyleRef:ye(e,"paneStyle"),mergedClsPrefixRef:s,typeRef:ye(e,"type"),closableRef:ye(e,"closable"),valueRef:F,tabChangeIdRef:T,onBeforeLeaveRef:ye(e,"onBeforeLeave"),activateTab:W,handleClose:fe,handleAdd:ge}),ma(()=>{x()}),cn(()=>{const{value:D}=d;if(!D)return;const{value:E}=s,Q=`${E}-tabs-nav-scroll-wrapper--shadow-before`,u=`${E}-tabs-nav-scroll-wrapper--shadow-after`;w.value?D.classList.remove(Q):D.classList.add(Q),C.value?D.classList.remove(u):D.classList.add(u)});const at=z(null);Pe(F,()=>{if(e.type==="segment"){const D=at.value;D&&kt(()=>{D.classList.add("transition-disabled"),D.offsetWidth,D.classList.remove("transition-disabled")})}});const ut={syncBarPosition:()=>{x()}},rt=V(()=>{const{value:D}=b,{type:E}=e,Q={card:"Card",bar:"Bar",line:"Line",segment:"Segment"}[E],u=`${D}${Q}`,{self:{barColor:k,closeIconColor:A,closeIconColorHover:G,closeIconColorPressed:te,tabColor:ee,tabBorderColor:ce,paneTextColor:re,tabFontWeight:he,tabBorderRadius:qe,tabFontWeightActive:Ye,colorSegment:bo,fontWeightStrong:vo,tabColorSegment:go,closeSize:xo,closeIconSize:yo,closeColorHover:_o,closeColorPressed:wo,closeBorderRadius:Co,[be("panePadding",D)]:So,[be("tabPadding",u)]:ko,[be("tabGap",u)]:Ro,[be("tabTextColor",E)]:$o,[be("tabTextColorActive",E)]:Do,[be("tabTextColorHover",E)]:Io,[be("tabTextColorDisabled",E)]:Bo,[be("tabFontSize",D)]:zo},common:{cubicBezierEaseInOut:Fo}}=c.value;return{"--n-bezier":Fo,"--n-color-segment":bo,"--n-bar-color":k,"--n-tab-font-size":zo,"--n-tab-text-color":$o,"--n-tab-text-color-active":Do,"--n-tab-text-color-disabled":Bo,"--n-tab-text-color-hover":Io,"--n-pane-text-color":re,"--n-tab-border-color":ce,"--n-tab-border-radius":qe,"--n-close-size":xo,"--n-close-icon-size":yo,"--n-close-color-hover":_o,"--n-close-color-pressed":wo,"--n-close-border-radius":Co,"--n-close-icon-color":A,"--n-close-icon-color-hover":G,"--n-close-icon-color-pressed":te,"--n-tab-color":ee,"--n-tab-font-weight":he,"--n-tab-font-weight-active":Ye,"--n-tab-padding":ko,"--n-tab-gap":Ro,"--n-pane-padding":So,"--n-font-weight-strong":vo,"--n-tab-color-segment":go}}),ze=l?ct("tabs",V(()=>`${b.value[0]}${e.type[0]}`),rt,e):void 0;return Object.assign({mergedClsPrefix:s,mergedValue:F,renderedNames:new Set,tabsRailElRef:at,tabsPaneWrapperRef:_,tabsElRef:i,barElRef:f,addTabInstRef:p,xScrollInstRef:m,scrollWrapperElRef:d,addTabFixed:de,tabWrapperStyle:j,handleNavResize:xe,mergedSize:b,handleScroll:Le,handleTabsResize:ne,cssVars:l?void 0:rt,themeClass:ze==null?void 0:ze.themeClass,animationDirection:Z,renderNameListRef:H,onAnimationBeforeLeave:q,onAnimationEnter:ie,onAnimationAfterEnter:se,onRender:ze==null?void 0:ze.onRender},ut)},render(){const{mergedClsPrefix:e,type:t,addTabFixed:n,addable:o,mergedSize:a,renderNameListRef:r,onRender:s,$slots:{default:l,prefix:c,suffix:i}}=this;s==null||s();const f=l?mt(l()).filter(b=>b.type.__TAB_PANE__===!0):[],d=l?mt(l()).filter(b=>b.type.__TAB__===!0):[],p=!d.length,m=t==="card",w=t==="segment",C=!m&&!w&&this.justifyContent;return r.value=[],h("div",{class:[`${e}-tabs`,this.themeClass,`${e}-tabs--${t}-type`,`${e}-tabs--${a}-size`,C&&`${e}-tabs--flex`],style:this.cssVars},h("div",{class:[`${e}-tabs-nav--${t}-type`,`${e}-tabs-nav`]},vt(c,b=>b&&h("div",{class:`${e}-tabs-nav__prefix`},b)),w?h("div",{class:`${e}-tabs-rail`,ref:"tabsRailElRef"},p?f.map((b,S)=>(r.value.push(b.props.name),h(dn,Object.assign({},b.props,{internalCreatedByPane:!0,internalLeftPadded:S!==0}),b.children?{default:b.children.tab}:void 0))):d.map((b,S)=>(r.value.push(b.props.name),S===0?b:Tn(b)))):h(_n,{onResize:this.handleNavResize},{default:()=>h("div",{class:`${e}-tabs-nav-scroll-wrapper`,ref:"scrollWrapperElRef"},h(Ua,{ref:"xScrollInstRef",onScroll:this.handleScroll},{default:()=>{const b=h("div",{style:this.tabWrapperStyle,class:`${e}-tabs-wrapper`},C?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}),p?f.map(($,F)=>(r.value.push($.props.name),qt(h(dn,Object.assign({},$.props,{internalCreatedByPane:!0,internalLeftPadded:F!==0&&(!C||C==="center"||C==="start"||C==="end")}),$.children?{default:$.children.tab}:void 0)))):d.map(($,F)=>(r.value.push($.props.name),qt(F!==0&&!C?Tn($):$))),!n&&o&&m?En(o,(p?f.length:d.length)!==0):null,C?null:h("div",{class:`${e}-tabs-scroll-padding`,style:{width:`${this.tabsPadding}px`}}));let S=b;return m&&o&&(S=h(_n,{onResize:this.handleTabsResize},{default:()=>b})),h("div",{ref:"tabsElRef",class:`${e}-tabs-nav-scroll-content`},S,m?h("div",{class:`${e}-tabs-pad`}):null,m?null:h("div",{ref:"barElRef",class:`${e}-tabs-bar`}))}}))}),n&&o&&m?En(o,!0):null,vt(i,b=>b&&h("div",{class:`${e}-tabs-nav__suffix`},b))),p&&(this.animated?h("div",{ref:"tabsPaneWrapperRef",class:`${e}-tabs-pane-wrapper`},Fn(f,this.mergedValue,this.renderedNames,this.onAnimationBeforeLeave,this.onAnimationEnter,this.onAnimationAfterEnter,this.animationDirection)):Fn(f,this.mergedValue,this.renderedNames)))}});function Fn(e,t,n,o,a,r,s){const l=[];return e.forEach(c=>{const{name:i,displayDirective:f,"display-directive":d}=c.props,p=w=>f===w||d===w,m=t===i;if(c.key!==void 0&&(c.key=i),m||p("show")||p("show:lazy")&&n.has(i)){n.has(i)||n.add(i);const w=!p("if");l.push(w?me(c,[[De,m]]):c)}}),s?h(ba,{name:`${s}-transition`,onBeforeLeave:o,onEnter:a,onAfterEnter:r},{default:()=>l}):l}function En(e,t){return h(dn,{ref:"addTabInstRef",key:"__addable",name:"__addable",internalCreatedByPane:!0,internalAddable:!0,internalLeftPadded:t,disabled:typeof e=="object"&&e.disabled})}function Tn(e){const t=va(e);return t.props?t.props.internalLeftPadded=!0:t.props={internalLeftPadded:!0},t}function qt(e){return Array.isArray(e.dynamicProps)?e.dynamicProps.includes("internalLeftPadded")||e.dynamicProps.push("internalLeftPadded"):e.dynamicProps=["internalLeftPadded"],e}const ol={class:"value"},al=L({__name:"RulerLine",props:{scale:null,thick:null,palette:null,index:null,start:null,vertical:{type:Boolean},value:null,isShowReferLine:{type:Boolean}},emits:["onMouseDown","onRelease","onRemove"],setup(e,{emit:t}){const n=e,o=z(0),a=z(!0);Nt(()=>{o.value=n.value});const r=p=>{a.value=p>=0},s=V(()=>{const p=(o.value-n.start)*n.scale;r(p);const m=p+"px";return n.vertical?{top:m}:{left:m}}),l=V(()=>{var C,b;const p=`1px ${((C=n.palette)==null?void 0:C.lineBoardStyle)||"dashed"} ${(b=n.palette)==null?void 0:b.lineColor}`,m=n.vertical?{borderTop:p}:{borderLeft:p},w=n.isShowReferLine?n.vertical?"ns-resize":"ew-resize":"none";return ft({cursor:w},m)}),c=V(()=>n.vertical?{left:n.thick+"px"}:{top:n.thick+"px"}),i=p=>{p.stopPropagation();const m=n.vertical?p.clientY:p.clientX,w=o.value;t("onMouseDown");const C=S=>{const $=n.vertical?S.clientY:S.clientX,F=Math.round(w+($-m)/n.scale);o.value=F},b=()=>{t("onRelease",o.value,n.index),document.removeEventListener("mousemove",C,!0),document.removeEventListener("mouseup",b)};document.addEventListener("mousemove",C,!0),document.addEventListener("mouseup",b)},f=()=>{t("onRemove",n.index)},d=()=>[{text:"\u5220\u9664",subText:"",handler:()=>f()}];return(p,m)=>{const w=ot("contextmenu");return me((R(),J("div",{class:"line",style:Ve([v(s),v(l)]),onMousedown:i},[ue("div",{class:"action",style:Ve(v(c))},[ue("span",ol,Ge(o.value),1)],4)],36)),[[De,a.value],[w,d,void 0,{stop:!0}]])}}});const rl=we(al,[["__scopeId","data-v-15802f5c"]]),ll=e=>e<=.25?40:e<=.5?20:e<=1?10:e<=2?5:e<=4?2:1,Pn=.83,il=(e,t,n,o,a,r)=>{const{scale:s,width:l,height:c,ratio:i,palette:f}=a,{bgColor:d,fontColor:p,shadowColor:m,longfgColor:w,shortfgColor:C}=f;if(e.scale(i,i),e.clearRect(0,0,l,c),e.fillStyle=d,e.fillRect(0,0,l,c),o){const _=(n-t)*s,B=o*s;e.fillStyle=m,r?e.fillRect(_,0,B,c*3/8):e.fillRect(0,_,l*3/8,B)}const b=ll(s),S=b*s,$=b*10,F=$*s,T=Math.floor(t/b)*b,j=Math.floor(t/$)*$,I=(T-t)/b*S,g=(j-t)/$*F,x=t+Math.ceil((r?l:c)/s);e.beginPath(),e.fillStyle=p,e.strokeStyle=w;for(let _=j,B=0;_<x;_+=$,B++){const N=g+B*F+.5;r?e.moveTo(N,0):e.moveTo(0,N),e.save(),r?e.translate(N,c*.4):e.translate(l*.4,N),r||e.rotate(-Math.PI/2),e.scale(Pn/i,Pn/i),e.fillText(_.toString(),4*i,7*i),e.restore(),r?e.lineTo(N,c*9/16):e.lineTo(l*9/16,N)}e.stroke(),e.closePath(),e.beginPath(),e.strokeStyle=C;for(let _=T,B=0;_<x;_+=b,B++){const N=I+B*S+.5;r?e.moveTo(N,0):e.moveTo(0,N),_%$!==0&&(r?e.lineTo(N,c*1/4):e.lineTo(l*1/4,N))}e.stroke(),e.closePath(),e.setTransform(1,0,0,1,0,0)},sl=L({__name:"index",props:{showIndicator:{type:Boolean},valueNum:null,scale:null,ratio:null,palette:null,vertical:{type:Boolean},start:null,width:null,height:null,selectStart:null,selectLength:null},emits:["onAddLine","update:showIndicator","update:valueNum"],setup(e,{emit:t}){const n=e,o=Ie({canvasContext:null});let a=1;const r=z(null);Nt(()=>{a=n.ratio||window.devicePixelRatio||1,s(),l(a),c(a)});const s=()=>{o.canvasContext=r.value&&r.value.getContext("2d")},l=f=>{if(r.value){r.value.width=n.width*f,r.value.height=n.height*f;const d=o.canvasContext;d&&(d.font=`${12*f}px -apple-system,
                "Helvetica Neue", ".SFNSText-Regular",
                "SF UI Text", Arial, "PingFang SC", "Hiragino Sans GB",
                "Microsoft YaHei", "WenQuanYi Zen Hei", sans-serif`,d.lineWidth=1,d.textBaseline="middle")}},c=f=>{const d={scale:n.scale,width:n.width,height:n.height,palette:n.palette,ratio:f};o.canvasContext&&il(o.canvasContext,n.start,n.selectStart,n.selectLength,d,!n.vertical)};Pe(()=>n.start,()=>c(a)),Pe([()=>n.width,()=>n.height],()=>{l(a),c(a)});const i=(f,d)=>{const p=(C,b,S)=>Math.round(b+C/S),m=n.vertical?f.offsetY:f.offsetX,w=p(m,n.start,n.scale);switch(d){case"click":t("onAddLine",w);break;case"enter":t("update:valueNum",w),t("update:showIndicator",!0);break;default:t("update:valueNum",w);break}};return(f,d)=>(R(),J("canvas",{ref_key:"canvas",ref:r,class:"ruler",onClick:d[0]||(d[0]=p=>i(p,"click")),onMouseenter:d[1]||(d[1]=p=>i(p,"enter")),onMousemove:d[2]||(d[2]=p=>i(p,"move")),onMouseleave:d[3]||(d[3]=p=>f.$emit("update:showIndicator",!1))},null,544))}}),dl={class:"lines"},cl={class:"value"},ul=L({__name:"RulerWrapper",props:{scale:null,ratio:null,thick:null,selectStart:null,selectLength:null,isShowReferLine:{type:Boolean},palette:null,vertical:{type:Boolean,default:!0},width:{default:200},height:{default:200},start:{default:0}},setup(e,{expose:t}){const n=e,o=z(!1),a=z(0),r=z([]),s=V(()=>n.vertical?"v-container":"h-container");t({clearLines:()=>{r.value=[]}});const c=V(()=>{const m={width:`calc(100% - ${n.thick}px)`,height:`${n.thick+1}px`,left:`${n.start}px`},w={width:`${n.thick&&n.thick+1}px`,height:`calc(100% - ${n.thick}px)`,top:`${n.start}px`};return n.vertical?w:m}),i=V(()=>{var b,S;const m=(a.value-(n.start||0))*n.scale;let w="top",C="borderLeft";return w=n.vertical?"top":"left",C=n.vertical?"borderBottom":"borderLeft",{[w]:m+"px",[C]:`1px ${((b=n.palette)==null?void 0:b.lineBoardStyle)||"dashed"} ${(S=n.palette)==null?void 0:S.lineColor}`}}),f=m=>{r.value.push(m)},d=(m,w)=>{const C=m-(n.start||0),b=(n.vertical?n.height||200:n.width||200)/n.scale;C<0||C>b?p(w):r.value[w]=m},p=m=>{r.value.splice(m,1)};return(m,w)=>(R(),J("div",{class:Vt(v(s)),style:Ve(v(c))},[P(sl,{vertical:e.vertical,scale:e.scale,width:e.width,height:e.height,start:e.start,ratio:e.ratio,"select-start":e.selectStart,"select-length":e.selectLength,palette:e.palette,valueNum:a.value,"onUpdate:valueNum":w[0]||(w[0]=C=>a.value=C),showIndicator:o.value,"onUpdate:showIndicator":w[1]||(w[1]=C=>o.value=C),onOnAddLine:f},null,8,["vertical","scale","width","height","start","ratio","select-start","select-length","palette","valueNum","showIndicator"]),me(ue("div",dl,[(R(!0),J(Ce,null,Be(r.value,(C,b)=>(R(),X(rl,{key:C+b,index:b,value:C>>0,scale:e.scale,start:e.start,thick:e.thick,palette:e.palette,vertical:e.vertical,"is-show-refer-line":e.isShowReferLine,onOnRemove:p,onOnRelease:d},null,8,["index","value","scale","start","thick","palette","vertical","is-show-refer-line"]))),128))],512),[[De,e.isShowReferLine]]),me(ue("div",{class:"indicator",style:Ve(v(i))},[ue("div",cl,Ge(a.value),1)],4),[[De,o.value]])],6))}});const An=we(ul,[["__scopeId","data-v-7b9de42f"]]),fl={id:"mb-ruler",class:"style-ruler mb-ruler"},pl=L({__name:"Index",props:{scale:{default:1},ratio:{default:0},thick:{default:16},palette:null,startX:null,startY:null,width:{default:200},height:{default:200},shadow:null},setup(e){const t=e,n=z(null),o=z(null),a=z(!0),r=()=>{var c,i;(c=n.value)==null||c.clearLines(),(i=o.value)==null||i.clearLines(),a.value=!0},s=()=>[{text:"\u663E\u793A\u8F85\u52A9\u7EBF",subText:"",disable:a.value,handler:()=>a.value=!0},{text:"\u9690\u85CF\u8F85\u52A9\u7EBF",subText:"",disable:!a.value,handler:()=>a.value=!1},{text:"\u6E05\u7A7A\u8F85\u52A9\u7EBF",subText:"",disable:!a.value,handler:r}],l=V(()=>{function c(i,f){return Object.keys(i).forEach(d=>{d&&i.hasOwnProperty(d)&&(typeof f.key=="object"?i[d]=c(i[d],f[d]):f.hasOwnProperty(d)&&(i[d]=f[d]))}),i}return c({bgColor:"rgba(225,225,225, 0)",longfgColor:"#BABBBC",shortfgColor:"#C8CDD0",fontColor:"#7D8694",shadowColor:"#E8E8E8",lineColor:"#37d4cf",lineBoardStyle:"dashed",borderColor:"#DADADC",cornerActiveColor:"rgb(235, 86, 72, 0.6)",menu:{bgColor:"#fff",dividerColor:"#DBDBDB",listItem:{textColor:"#415058",hoverTextColor:"#298DF8",disabledTextColor:"rgba(65, 80, 88, 0.4)",bgColor:"#fff",hoverBgColor:"#F2F2F2"}}},t.palette||{})});return(c,i)=>{var d,p,m,w;const f=ot("contextmenu");return me((R(),J("div",fl,[P(An,{vertical:!1,ref_key:"HRulerWrapperref",ref:o,width:e.width,height:16,"is-show-refer-line":a.value,thick:e.thick,ratio:e.ratio,start:e.startX,"select-start":((d=e.shadow)==null?void 0:d.x)||0,"select-length":((p=e.shadow)==null?void 0:p.width)||0,scale:e.scale,palette:v(l)},null,8,["width","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"]),P(An,{vertical:!0,ref_key:"VRulerWrapperref",ref:n,width:16,height:e.height,"is-show-refer-line":a.value,thick:e.thick,ratio:e.ratio,start:e.startY,"select-start":((m=e.shadow)==null?void 0:m.y)||0,"select-length":((w=e.shadow)==null?void 0:w.height)||0,scale:e.scale,palette:v(l)},null,8,["height","is-show-refer-line","thick","ratio","start","select-start","select-length","scale","palette"])])),[[f,s,void 0,{stop:!0}]])}}});const hl=L({__name:"Ruler",props:{width:null,height:null,isShowReferLine:{type:Boolean}},setup(e){const a={h:[],v:[]},r=20;return(s,l)=>(R(),X(v(pl),{thick:r,scale:1,width:e.width,height:e.height,startX:0,startY:0,lines:a,isShowReferLine:e.isShowReferLine},null,8,["width","height","isShowReferLine"]))}});const ml=we(hl,[["__scopeId","data-v-31710d38"]]),bl=L({__name:"Area",props:{start:null,width:null,height:null},setup(e){const t=eo(),n=()=>{t.compose(),Fe.emit("hideArea")},o=()=>{t.flushLeft(),Fe.emit("hideArea")},a=()=>{t.flushRight(),Fe.emit("hideArea")},r=()=>{t.flushTop(),Fe.emit("hideArea")},s=()=>{t.flushBottom(),Fe.emit("hideArea")},l=()=>{t.flushRow(),Fe.emit("hideArea")},c=()=>{t.flushColumn(),Fe.emit("hideArea")},i=()=>{t.batchDeleteComponent(t.components),Fe.emit("hideArea")},f=()=>[{text:"\u7EC4\u5408",subText:"",disable:!t.canCompose,handler:n},{divider:!0},{text:"\u5220\u9664",subText:"Ctrl + Delete",disable:t.components.length<=0,handler:i},{divider:!0},{text:"\u5DE6\u5BF9\u9F50",subText:"",handler:o},{text:"\u53F3\u5BF9\u9F50",subText:"",handler:a},{text:"\u9876\u5BF9\u9F50",subText:"",handler:r},{text:"\u5E95\u5BF9\u9F50",subText:"",handler:s},{divider:!0},{text:"\u6C34\u5E73\u5BF9\u9F50",subText:"",handler:l},{text:"\u5782\u76F4\u5BF9\u9F50",subText:"",handler:c}];return(d,p)=>{const m=ot("contextmenu");return me((R(),J("div",{style:Ve({left:e.start.x+"px",top:e.start.y+"px",width:e.width+"px",height:e.height+"px"}),class:"area"},null,4)),[[m,f,void 0,{stop:!0}]])}}});const Nn=we(bl,[["__scopeId","data-v-a1be5080"]]);const vl={},gl={class:"grid",width:"100%",height:"100%",xmlns:"http://www.w3.org/2000/svg"},xl=ga('<defs data-v-9ff3aadd><pattern id="smallGrid" width="7.236328125" height="7.236328125" patternUnits="userSpaceOnUse" data-v-9ff3aadd><path d="M 7.236328125 0 L 0 0 0 7.236328125" fill="none" stroke="rgba(207, 207, 207, 0.3)" stroke-width="1" data-v-9ff3aadd></path></pattern><pattern id="grid" width="36.181640625" height="36.181640625" patternUnits="userSpaceOnUse" data-v-9ff3aadd><rect width="36.181640625" height="36.181640625" fill="url(#smallGrid)" data-v-9ff3aadd></rect><path d="M 36.181640625 0 L 0 0 0 36.181640625" fill="none" stroke="rgba(186, 186, 186, 0.5)" stroke-width="1" data-v-9ff3aadd></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" data-v-9ff3aadd></rect>',2),yl=[xl];function _l(e,t){return R(),J("svg",gl,yl)}const wl=we(vl,[["render",_l],["__scopeId","data-v-9ff3aadd"]]),Cl={class:"mark-line"},Sl=L({__name:"MarkLine",setup(e){const t=Se(),n=z([]),o=Ie(["xt","xc","xb","yl","yc","yr"]),a=z(3),r=Ie({xt:!1,xc:!1,xb:!1,yl:!1,yc:!1,yr:!1}),s=p=>{n.value.push(p)},l=()=>{Object.keys(r).forEach(p=>{r[p]=!1})};zt("move",p=>{c(p.isDownward,p.isRightward)}),zt("unmove",()=>{l()});const c=(p,m)=>{const w=t.componentData;if(t.curComponent){const{top:C,left:b,right:S,bottom:$}=en(t.curComponent.positionStyle),F=(S-b)/2,T=($-C)/2;l(),w.forEach(j=>{if(j==t.curComponent)return;const I=en(j.positionStyle),{top:g,left:x,bottom:_,right:B}=I,N=(B-x)/2,q=(_-g)/2,ie={top:[{isNearly:i(C,g),lineNode:n.value[0],line:"xt",dragShift:g,lineShift:g},{isNearly:i($,g),lineNode:n.value[0],line:"xt",dragShift:g-($-C||0),lineShift:g},{isNearly:i((C||0)+T,g+q),lineNode:n.value[1],line:"xc",dragShift:g+q-T,lineShift:g+q},{isNearly:i(C,_),lineNode:n.value[2],line:"xb",dragShift:_,lineShift:_},{isNearly:i($,_),lineNode:n.value[2],line:"xb",dragShift:_-($-C||0),lineShift:_}],left:[{isNearly:i(b,x),lineNode:n.value[3],line:"yl",dragShift:x,lineShift:x},{isNearly:i(S,x),lineNode:n.value[3],line:"yl",dragShift:x-(S-b||0),lineShift:x},{isNearly:i((b||0)+F,x+N),lineNode:n.value[4],line:"yc",dragShift:x+N-F,lineShift:x+N},{isNearly:i(b,B),lineNode:n.value[5],line:"yr",dragShift:B,lineShift:B},{isNearly:i(S,B),lineNode:n.value[5],line:"yr",dragShift:B-(S-b||0),lineShift:B}]},se=[],{rotate:H}=t.curComponent.style;Object.keys(ie).forEach(Z=>{ie[Z].forEach(W=>{if(!W.isNearly)return;const K=H!=0?f(Z,W,{width:S-b,height:$-C}):W.dragShift;t.setCurComponentStyle(Z,K),W.lineNode.style[Z]=`${W.lineShift}px`,se.push(W.line)})}),se.length&&d(se,p,m)})}},i=(p,m)=>Math.abs(p-m)<=a.value,f=(p,m,w)=>{const{width:C,height:b}=t.curComponent.style;return p=="top"?Math.round(m.dragShift-(b-w.height)/2):Math.round(m.dragShift-(C-w.width)/2)},d=(p,m,w)=>{w?p.includes("yr")?r.yr=!0:p.includes("yc")?r.yc=!0:p.includes("yl")&&(r.yl=!0):p.includes("yl")?r.yl=!0:p.includes("yc")?r.yc=!0:p.includes("yr")&&(r.yr=!0),m?p.includes("xb")?r.xb=!0:p.includes("xc")?r.xc=!0:p.includes("xt")&&(r.xt=!0):p.includes("xt")?r.xt=!0:p.includes("xc")?r.xc=!0:p.includes("xb")&&(r.xb=!0)};return(p,m)=>(R(),J("div",Cl,[(R(!0),J(Ce,null,Be(o,w=>me((R(),J("div",{key:w,class:Vt(["line",w.includes("x")?"xline":"yline"]),ref_for:!0,ref:s},null,2)),[[De,r[w]||!1]])),128))]))}});const kl=we(Sl,[["__scopeId","data-v-a18c1d1e"]]),Rl=["onMousedown"],$l=L({__name:"Index",setup(e){const t=Se(),n=eo(),o=to(),a=H=>Cn(H,["top","left","width","height","rotate"]),r=V(()=>n.style.width>0&&!g.value&&!t.isClickComponent),s=V(()=>({x:n.style.left,y:n.style.top})),l=V(()=>n.style.width),c=V(()=>n.style.height),i=()=>{g.value=!1,j.value=0,I.value=0,n.setAreaData({left:0,top:0,width:0,height:0},[])},f=()=>{t.clearCanvas()},d=(H,Z)=>{const W=document.querySelector("#editor").getBoundingClientRect(),K=Z.pageY-W.top,fe=Z.pageX-W.left;o.paste(!0,fe,K)},p=()=>[{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:d},{text:"\u6E05\u7A7A\u753B\u5E03",subText:"",handler:f}];zt("hideArea",i),Nt(()=>{console.log("\u8FDB\u5165\u7F16\u8F91\u6A21\u5F0F"),t.setEditMode(wn.EDIT),document.addEventListener("paste",S)}),Xn(()=>{console.log("\u8FDB\u5165\u9884\u89C8\u6A21\u5F0F"),t.setEditMode(wn.PREVIEW),document.removeEventListener("paste",S),t.clearCanvas()});const m=V(()=>t.componentData),w=V(()=>t.canvasStyleData),C=V(()=>t.curComponent),b=V(()=>{const H=_t(ft({},w.value),{backgroundImage:w.value.image,backgroundSize:"cover"});return Cn(H,["width","height","backgroundImage","backgroundSize"])}),S=H=>{if(H.clipboardData){const Z=H.clipboardData.getData("text");try{const W=JSON.parse(Z);"component"in W&&(W.change("top",W.positionStyle.top+10),W.change("left",W.positionStyle.left+10),It(JSON.stringify(W)),H.preventDefault(),t.appendComponent(W))}catch(W){console.log(W)}}},$=z(0),F=z(0),T=Ie({x:0,y:0}),j=z(0),I=z(0),g=z(!0),x=z(null),_=z(!0),B=H=>{var ve;t.setClickComponentStatus(!1),H.preventDefault(),H.stopPropagation(),i();const Z=(ve=x.value)==null?void 0:ve.getBoundingClientRect();$.value=Z.x,F.value=Z.y;const W=H.clientX,K=H.clientY;T.x=W-$.value,T.y=K-F.value,g.value=!0;const fe=oe=>{oe.preventDefault(),oe.stopPropagation(),j.value=Math.abs(oe.clientX-W),I.value=Math.abs(oe.clientY-K),oe.clientX<W&&(T.x=oe.clientX-$.value),oe.clientY<K&&(T.y=oe.clientY-F.value)},pe=oe=>{if(document.removeEventListener("mousemove",fe),document.removeEventListener("mouseup",pe),oe.clientX==W&&oe.clientY==K){i();return}const xe={left:T.x,top:T.y,right:j.value+T.x,bottom:T.y+I.value},de=N(xe);if(de){const ae=de.rect;n.setAreaData({top:ae.top,left:ae.left,width:ae.right-ae.left,height:ae.bottom-ae.top,rotate:0},de.components),T.x=ae.left,T.y=ae.top,j.value=ae.right-ae.left,I.value=ae.bottom-ae.top}else i()};document.addEventListener("mousemove",fe),document.addEventListener("mouseup",pe)},N=H=>{const Z=[],W=new Set,K=new Set,fe=new Set,pe=new Set;if(t.componentData.forEach(ve=>{const{width:oe,height:xe,left:de,top:ae,rotate:ne}=ve.style,ge=en({width:oe,height:xe,left:de,top:ae,rotate:ne});ge.left>=H.left&&ge.right<=H.right&&ge.top>=H.top&&ge.bottom<=H.bottom&&(Z.push(ve),W.add(ge.left),K.add(ge.top),fe.add(ge.right),pe.add(ge.bottom))}),Z.length>0){const ve=Math.min(...W),oe=Math.max(...fe),xe=Math.min(...K),de=Math.max(...pe);return{components:Z,rect:{left:ve,right:oe,top:xe,bottom:de}}}},q=H=>Re(this,null,function*(){H.preventDefault(),H.stopPropagation();const Z=H.dataTransfer.getData("componentName");if(Z){const W=new tn[Z],K=document.querySelector("#editor").getBoundingClientRect(),fe=H.pageY-K.top,pe=H.pageX-K.left;W.change("top",fe),W.change("left",pe),t.appendComponent(W)}}),ie=H=>{H.preventDefault(),H.dataTransfer.dropEffect="copy"},se=()=>{t.isClickComponent||t.setCurComponent(void 0)};return(H,Z)=>{const W=ot("contextmenu");return me((R(),J("div",{class:"editor edit",ref_key:"editor",ref:x,id:"editor",style:Ve(v(b)),onMousedown:Lt(B,["left"]),onDrop:q,onDragover:ie,onMouseup:se},[P(wl),P(ml,{width:v(w).width,height:v(w).height,isShowReferLine:_.value},null,8,["width","height","isShowReferLine"]),(R(!0),J(Ce,null,Be(v(m),(K,fe)=>(R(),J(Ce,{key:K.id},[v(t).isEditMode&&K.display?(R(),X(v(Pa),{key:0,id:"shape"+K.id,defaultStyle:K.style,style:Ve(a(K.style)),active:K.id===(v(C)||{}).id,info:K,class:Vt({lock:K.locked}),index:fe},{default:U(()=>[(R(),X(xa(K.component),{class:"component",style:Ve(v(ya)(K)),component:K,id:"component"+K.id},null,8,["style","component","id"]))]),_:2},1032,["id","defaultStyle","style","active","info","class","index"])):Bt("",!0)],64))),128)),P(kl),g.value?(R(),X(Nn,{key:0,start:T,width:j.value,height:I.value},null,8,["start","width","height"])):v(r)?(R(),X(Nn,{key:1,start:v(s),width:v(l),height:v(c)},null,8,["start","width","height"])):Bt("",!0)],44,Rl)),[[W,p,void 0,{stop:!0}]])}}});const Dl=we($l,[["__scopeId","data-v-a899149b"]]),ho=_a(),We=Se(),St=Gn(),Il=()=>Re(void 0,null,function*(){const e=yield ho.lastRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),Bl=()=>Re(void 0,null,function*(){const e=yield ho.nextRecord();e?We.setLayoutData({canvasData:e.canvasData,canvasStyle:e.canvasStyle}):Me.warning("\u6CA1\u6709\u5FEB\u7167\u4E86")}),zl=()=>{We.toggleShowEm()},Fl=e=>{const t=`${We.name}`||"OpenDataV";wa(`${t}.json`,JSON.stringify({id:e,name:t,canvasData:We.layoutData,canvasStyle:We.canvasStyleData}))},El=()=>{Ca(Tl,".json")},Tl=e=>{if(e.target&&e.target.result){const t=JSON.parse(e.target.result);t&&(We.setComponentData(t.canvasData),We.setCanvasStyle(t.canvasStyle))}},Pl=()=>{St.setNavTheme(St.darkTheme?"dark":"light"),St.setDarkTheme(!St.darkTheme)},Al=L({__name:"ThemeIcon",setup(e){const t=Gn(),n=V(()=>t.darkTheme?"sun-one":"moon");return(o,a)=>{const r=Ut("icon-park");return R(),X(r,{name:v(n)},null,8,["name"])}}}),Nl="2946854",Vl="\u65B9\u5411",Ll="iconfont",Ul="icon-",Ml="",Ol=[{icon_id:"11291350",name:"\u7EC4",font_class:"zu",unicode:"e854",unicode_decimal:59476},{icon_id:"1817751",name:"\u67F1\u5F62\u56FE",font_class:"zhuxingtu",unicode:"e626",unicode_decimal:58918},{icon_id:"3868284",name:"\u4EEA\u8868\u76D8",font_class:"yibiaopan",unicode:"eb67",unicode_decimal:60263},{icon_id:"4354243",name:"\u56FE\u8868-\u997C\u56FE",font_class:"tubiao-bingtu",unicode:"eb95",unicode_decimal:60309},{icon_id:"4354246",name:"\u56FE\u8868-\u5361\u7247",font_class:"tubiao-qiapian",unicode:"eb96",unicode_decimal:60310},{icon_id:"4354248",name:"\u56FE\u8868-\u6298\u7EBF\u56FE",font_class:"tubiao-zhexiantu",unicode:"eb97",unicode_decimal:60311},{icon_id:"4906240",name:"\u6309\u94AE\u7EC4",font_class:"anniuzu",unicode:"e782",unicode_decimal:59266},{icon_id:"5383645",name:"\u5BFC\u822A",font_class:"daohang",unicode:"e77d",unicode_decimal:59261},{icon_id:"5961366",name:"\u5217\u8868",font_class:"liebiao",unicode:"ec6b",unicode_decimal:60523},{icon_id:"5971297",name:"\u91C7\u7164\u673A",font_class:"caimeiji",unicode:"e603",unicode_decimal:58883},{icon_id:"7040619",name:"\u5176\u4ED6",font_class:"qita",unicode:"e63b",unicode_decimal:58939},{icon_id:"7556180",name:"\u5B9A\u5236",font_class:"dingzhi",unicode:"e609",unicode_decimal:58889},{icon_id:"9752796",name:"\u57FA\u7840",font_class:"jichu",unicode:"e60f",unicode_decimal:58895},{icon_id:"9921108",name:"chart",font_class:"chartt",unicode:"e60a",unicode_decimal:58890},{icon_id:"14475731",name:"\u88C5\u9970\u88C5\u4FEE",font_class:"zhuangshizhuangxiu",unicode:"e6a6",unicode_decimal:59046},{icon_id:"16562592",name:"\u6E29\u5EA6\u8BA1",font_class:"wenduji",unicode:"e6de",unicode_decimal:59102},{icon_id:"22712019",name:"\u6761\u5F62\u8FDB\u5EA6\u56FE",font_class:"tiaoxingjindutu",unicode:"e66b",unicode_decimal:58987},{icon_id:"22761375",name:"\u8FB9\u6846",font_class:"biankuang",unicode:"e6b7",unicode_decimal:59063},{icon_id:"22885432",name:"\u8FDB\u5EA6\u56FE",font_class:"jindutu",unicode:"f24b",unicode_decimal:62027},{icon_id:"124495",name:"\u8B66\u544A",font_class:"jinggao1",unicode:"e601",unicode_decimal:58881},{icon_id:"1846445",name:"\u9884\u8B66\u706F",font_class:"yujingdeng",unicode:"e67f",unicode_decimal:59007},{icon_id:"2239579",name:"\u81EA\u52A8\u7CFB\u7EDF\u8B66\u544A\u706F",font_class:"zidongxitongjinggaodeng1",unicode:"e605",unicode_decimal:58885},{icon_id:"4988542",name:"\u9884\u8B66",font_class:"yujing1",unicode:"e644",unicode_decimal:58948},{icon_id:"9974390",name:"\u9884\u8B66",font_class:"yujing3",unicode:"e6fe",unicode_decimal:59134},{icon_id:"10817515",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng",unicode:"e64b",unicode_decimal:58955},{icon_id:"14151833",name:"\u62A5\u8B66",font_class:"baojing1",unicode:"e630",unicode_decimal:58928},{icon_id:"16965399",name:"\u8B66\u544A\u706F",font_class:"hong",unicode:"e60d",unicode_decimal:58893},{icon_id:"20379044",name:"\u9884\u8B66\u706F",font_class:"yujingdeng1",unicode:"e623",unicode_decimal:58915},{icon_id:"23819336",name:"\u62A5\u8B66 \u8B66\u544A \u9884\u8B66 \u8B66\u544A\u706F",font_class:"a-baojingjinggaoyujingjinggaodeng",unicode:"e628",unicode_decimal:58920},{icon_id:"24312218",name:"light",font_class:"light",unicode:"e63a",unicode_decimal:58938},{icon_id:"24614518",name:"\u544A\u8B66\u706F",font_class:"gaojingdeng9",unicode:"e664",unicode_decimal:58980},{icon_id:"25567211",name:"\u8B66\u544A\u706F",font_class:"jinggaodeng1",unicode:"e613",unicode_decimal:58899},{icon_id:"12041083",name:"\u9884\u8B66",font_class:"yujing5",unicode:"e671",unicode_decimal:58993},{icon_id:"577357",name:"\u5220\u9664",font_class:"shanchu",unicode:"e74b",unicode_decimal:59211},{icon_id:"1986988",name:"\u5220\u9664",font_class:"shanchu1",unicode:"e625",unicode_decimal:58917},{icon_id:"12795401",name:"\u9996\u9875",font_class:"shouye",unicode:"e62d",unicode_decimal:58925},{icon_id:"201556",name:"\u67E5\u770B",font_class:"chakan",unicode:"e600",unicode_decimal:58880},{icon_id:"201638",name:"\u7F16\u8F91",font_class:"bianji",unicode:"e602",unicode_decimal:58882},{icon_id:"11729723",name:"\u590D\u5236",font_class:"fuzhi",unicode:"e608",unicode_decimal:58888},{icon_id:"7269302",name:"\u9996\u9875-\u9ED8\u8BA4",font_class:"shouye-moren",unicode:"e619",unicode_decimal:58905},{icon_id:"658044",name:"\u89E3\u9501",font_class:"jiesuo",unicode:"e669",unicode_decimal:58985},{icon_id:"10097949",name:"\u65CB\u8F6C",font_class:"xuanzhuan",unicode:"e680",unicode_decimal:59008},{icon_id:"374774",name:"\u5F00\u5173",font_class:"kaiguan",unicode:"e61f",unicode_decimal:58911},{icon_id:"122162",name:"\u65F6\u949F",font_class:"clock",unicode:"e63e",unicode_decimal:58942},{icon_id:"1242185",name:"\u53CD\u9988\u4FE1\u606F",font_class:"fankuixinxi",unicode:"e660",unicode_decimal:58976},{icon_id:"2468505",name:"37\u7C7B\u5EFA\u7B51\u4FEE\u7406x16",font_class:"leijianzhuxiulix",unicode:"e695",unicode_decimal:59029},{icon_id:"11747267",name:"\u65F6\u95F4",font_class:"weibiaoti-",unicode:"e618",unicode_decimal:58904},{icon_id:"14794143",name:"sds_\u7B2C37\u7C7B \u5EFA\u7B51\u4FEE\u7406",font_class:"sds_di37leijianzhuxiuli",unicode:"e61e",unicode_decimal:58910},{icon_id:"17762035",name:"\u8054\u52A8\u63A7\u5236",font_class:"liandongkongzhi",unicode:"e624",unicode_decimal:58916},{icon_id:"18165278",name:"\u9501,\u5BC6\u7801,\u5F00\u9501,\u89E3\u9501",font_class:"unlock-full",unicode:"e882",unicode_decimal:59522},{icon_id:"288554",name:"ascend",font_class:"ascend",unicode:"e6b4",unicode_decimal:59060},{icon_id:"288556",name:"falling",font_class:"falling",unicode:"e6b6",unicode_decimal:59062},{icon_id:"815867",name:"\u6309\u94AE-\u5173",font_class:"buttonoff",unicode:"e614",unicode_decimal:58900},{icon_id:"815872",name:"\u6309\u94AE-\u5F00",font_class:"buttonon",unicode:"e615",unicode_decimal:58901},{icon_id:"2674878",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushang",unicode:"e62c",unicode_decimal:58924},{icon_id:"2674928",name:"\u7BAD\u5934 \u53F3",font_class:"jiantouyou",unicode:"e632",unicode_decimal:58930},{icon_id:"2674929",name:"\u7BAD\u5934 \u4E0B",font_class:"jiantouxia",unicode:"e633",unicode_decimal:58931},{icon_id:"7594038",name:"24gl-next",font_class:"24gl-next",unicode:"ea6b",unicode_decimal:60011},{icon_id:"7594046",name:"24gl-pauseCircle",font_class:"24gl-pauseCircle",unicode:"ea6f",unicode_decimal:60015},{icon_id:"7594068",name:"24gl-previous",font_class:"24gl-previous",unicode:"ea73",unicode_decimal:60019},{icon_id:"7594086",name:"24gl-stopCircle",font_class:"24gl-stopCircle",unicode:"ea79",unicode_decimal:60025},{icon_id:"10268256",name:"\u6309\u94AE_\u5F00\u542F",font_class:"anniu_kaiqi",unicode:"e659",unicode_decimal:58969},{icon_id:"10268257",name:"\u6309\u94AE_\u5173\u95ED",font_class:"anniu_guanbi",unicode:"e65b",unicode_decimal:58971},{icon_id:"25807963",name:"\u7BAD\u5934 \u4E0A",font_class:"jiantoushangzuo-copy",unicode:"ec63",unicode_decimal:60515},{icon_id:"25808146",name:"\u5411\u53F32",font_class:"xiangzuo2-copy",unicode:"ec64",unicode_decimal:60516},{icon_id:"166602",name:"\u5173\u95ED\u64AD\u653E",font_class:"guanbibofang",unicode:"e61d",unicode_decimal:58909},{icon_id:"577396",name:"\u5411\u4E0A3",font_class:"xiangshang3",unicode:"e76f",unicode_decimal:59247},{icon_id:"577401",name:"\u5411\u4E0B5",font_class:"xiangxia5",unicode:"e774",unicode_decimal:59252},{icon_id:"577403",name:"\u5411\u53F32",font_class:"xiangyou2",unicode:"e776",unicode_decimal:59254},{icon_id:"1159910",name:"\u53F3\u64AD\u653E",font_class:"youbofang",unicode:"e62e",unicode_decimal:58926},{icon_id:"1159911",name:"\u5DE6\u64AD\u653E",font_class:"zuobofang",unicode:"e62f",unicode_decimal:58927},{icon_id:"1185945",name:"\u64AD\u653E",font_class:"bofang2",unicode:"e606",unicode_decimal:58886},{icon_id:"1488892",name:"\u64AD\u653E",font_class:"bofang5",unicode:"e607",unicode_decimal:58887},{icon_id:"1727559",name:"323\u5411\u5DE6\u4EA4\u6362",font_class:"xiangzuojiaohuan",unicode:"e8f8",unicode_decimal:59640},{icon_id:"1727561",name:"324\u5411\u53F3\u4EA4\u6362",font_class:"xiangyoujiaohuan",unicode:"e8f9",unicode_decimal:59641},{icon_id:"2076218",name:"\u64AD\u653E2",font_class:"bofang6",unicode:"e87c",unicode_decimal:59516},{icon_id:"7594051",name:"24gl-playCircle",font_class:"24gl-playCircle",unicode:"ea6e",unicode_decimal:60014},{icon_id:"11121478",name:"\u5411\u4E0A",font_class:"xiangshang7",unicode:"e63c",unicode_decimal:58940},{icon_id:"16388177",name:"\u64AD\u653E",font_class:"bofang26",unicode:"e60e",unicode_decimal:58894},{icon_id:"18176557",name:"\u64AD\u653E",font_class:"play1",unicode:"ea8d",unicode_decimal:60045},{icon_id:"24267227",name:"\u64AD\u653E-\u5FEB\u9000",font_class:"bofang-kuaitui",unicode:"e68a",unicode_decimal:59018},{icon_id:"24267260",name:"\u64AD\u653E09",font_class:"bofang09",unicode:"e690",unicode_decimal:59024},{icon_id:"24268374",name:"\u64AD\u653E-\u5FEB\u8FDB",font_class:"bofang-kuaijin",unicode:"e6d8",unicode_decimal:59096},{icon_id:"25807740",name:"\u5411\u4E0A",font_class:"xiangxia7",unicode:"ec62",unicode_decimal:60514}],jl={id:Nl,name:Vl,font_family:Ll,css_prefix_text:Ul,description:Ml,glyphs:Ol},Hl={class:"icon-list"},Wl=["onClick"],Xl=L({__name:"IconFont",setup(e){const t=V(()=>jl.glyphs.map(r=>`icon-${r.font_class}`)),n=z(!0),o=()=>{n.value=!1},a=r=>{It(r),Me.success(`\u590D\u5236\u56FE\u6807: ${r}`)};return(r,s)=>(R(),X(Yn,null,{default:U(()=>[P(v(qn),{class:"show-card",show:n.value,preset:"card",onMaskClick:o,title:`\u56FE\u6807\u6570\u91CF${v(t).length}`,onClose:o,"onUpdate:show":s[0]||(s[0]=()=>n.value=!1),style:{width:"50%",maxWidth:"800px"}},{default:U(()=>[ue("ul",Hl,[(R(!0),J(Ce,null,Be(v(t),l=>(R(),J("li",{key:l,class:"dib",onClick:c=>a(l)},[ue("span",{class:Vt(`icon iconfont ${l}`)},null,2)],8,Wl))),128))])]),_:1},8,["show","title"])]),_:1}))}});const Gl=we(Xl,[["__scopeId","data-v-538b9921"]]),ql=()=>{const e=P(Gl,{},null),t=document.createElement("div"),n=document.querySelector("#app");Kn(e,t),n==null||n.appendChild(t)},Yl=ql,Kl={class:"dialog-footer"},Jl=Mt("\u53D6\u6D88"),Zl=Mt("\u65B0\u589E"),Ql=Mt("\u66F4\u65B0"),ei=L({__name:"SavePage",props:{index:null},setup(e){const t=e,n=Se(),o=z(!0),a=Ie({name:"",thumbnail:""}),r=Ie({name:[{required:!0,message:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0",trigger:"blur"}]}),s=l=>Re(this,null,function*(){const{name:c,thumbnail:i}=a;if(!c){Me.error("\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0");return}const f={name:c,thumbnail:i,canvasData:n.layoutData,canvasStyle:n.canvasStyleData};if(l==="update")try{(yield Aa(t.index,f)).status===200&&Me.success("\u4FEE\u6539\u6210\u529F")}catch(d){Me.error("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u5BFC\u51FA\u5230\u672C\u5730\uFF0C\u5E76\u91CD\u65B0\u8FDB\u5165\u6B64\u9875\u9762")}finally{o.value=!1}else try{const d=yield Na(f);d.status===201&&(Me.success("\u4FDD\u5B58\u6210\u529F"),Sa.push({name:"Editor",params:{index:d.data.id}}))}catch(d){Me.error(`\u4FDD\u5B58\u5931\u8D25\uFF0C\u5931\u8D25\u4FE1\u606F:${(d==null?void 0:d.message)||d}`)}finally{o.value=!1}});return(l,c)=>(R(),X(Yn,null,{default:U(()=>[P(v(qn),{show:o.value,"mask-closable":!1,preset:"card",center:"",title:"\u4FDD\u5B58\u5F53\u524D\u5E03\u5C40",style:{width:"30%",minWidth:"600px"},"onUpdate:show":c[5]||(c[5]=()=>o.value=!1),size:"medium"},{footer:U(()=>[ue("span",Kl,[P(v(tt),{onClick:c[2]||(c[2]=i=>o.value=!1)},{default:U(()=>[Jl]),_:1}),e.index?(R(),X(v(tt),{key:1,type:"primary",onClick:c[4]||(c[4]=i=>s("update"))},{default:U(()=>[Ql]),_:1})):(R(),X(v(tt),{key:0,type:"primary",onClick:c[3]||(c[3]=i=>s("new"))},{default:U(()=>[Zl]),_:1}))])]),default:U(()=>[P(v(fn),{model:a,rules:r,onSubmit:c[1]||(c[1]=Lt(()=>{},["prevent"]))},{default:U(()=>[P(v(Ft),{label:"\u9875\u9762\u540D\u79F0",prop:"name"},{default:U(()=>[P(v(yt),{modelValue:a.name,"onUpdate:modelValue":c[0]||(c[0]=i=>a.name=i),placeholder:"\u8BF7\u8F93\u5165\u9875\u9762\u540D\u79F0"},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["show"])]),_:1}))}}),ti=e=>{const t=P(ei,{index:e},null),n=document.createElement("div");Kn(t,n)},ni=ti,Vn=L({__name:"ToolBarItem",props:{label:null,action:null,disable:{type:Function,default:()=>!1},icon:null,divider:{type:[Boolean,null]},children:null,otherShow:null},setup(e){const t=e,n=V(()=>typeof t.icon=="string"?h(Ue,{name:t.icon,size:"24"}):t.icon());return(o,a)=>(R(),J(Ce,null,[P(v(ka),null,{trigger:U(()=>[P(v(tt),{quaternary:"",size:"small",onClick:e.action,title:e.label},{default:U(()=>[P(v(n))]),_:1},8,["onClick","title"])]),default:U(()=>[ue("span",null,Ge(e.label),1)]),_:1}),e.divider?(R(),X(v(Ra),{key:0,vertical:""})):Bt("",!0)],64))}}),oi={class:"tool-bar"},ai={class:"tool-bar-item"},ri={class:"tool-bar-title"},li={class:"tool-bar-item"},ii=L({__name:"Toolbar",setup(e){const t=Se(),n=$a(),o=Jn(),a=[{label:"\u9996\u9875",action:l=>{n.push({name:"Pages"})},icon:"home",divider:!0,location:"left"},{label:"\u4FDD\u5B58",action:()=>ni(o.params.index),icon:"save-one",location:"left"},{label:"\u9884\u89C8",action:l=>{const{href:c}=n.resolve("/preview");window.open(c,"_blank")},icon:"computer",location:"left"},{label:"\u64A4\u9500",action:Il,icon:"back",location:"left"},{label:"\u6062\u590D",action:Bl,icon:"next",location:"left"},{label:"\u5BFC\u51FA",action:()=>Fl(o.params.index||""),icon:"download-one",location:"left"},{label:"\u5BFC\u5165",action:El,icon:"upload-one",location:"left"},{label:"\u5168\u5C4F",action:()=>{const l=document.querySelector("#editor");document.fullscreenEnabled&&l&&l.requestFullscreen()},icon:"full-screen",location:"left"},{label:"\u5750\u6807",action:zl,icon:"cones",location:"left"},{label:"\u56FE\u6807",action:Yl,icon:"game-ps",location:"right"},{label:"\u4E3B\u9898",action:Pl,icon:()=>h(Al),location:"right"}],r=a.filter(l=>l.location==="left"),s=a.filter(l=>l.location==="right");return(l,c)=>(R(),J("div",oi,[ue("div",ai,[(R(!0),J(Ce,null,Be(v(r),(i,f)=>(R(),X(Vn,{key:f,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))]),ue("div",ri,Ge(v(t).name),1),ue("div",li,[(R(!0),J(Ce,null,Be(v(s),(i,f)=>(R(),X(Vn,{key:f,action:i.action,label:i.label,divider:i.divider,icon:i.icon},null,8,["action","label","divider","icon"]))),128))])]))}});const si=we(ii,[["__scopeId","data-v-4243bd17"]]),di=["data-component"],ci=L({__name:"ComponentItem",props:{component:null,name:null},setup(e){return(t,n)=>(R(),J("div",{draggable:"true","data-component":e.component},[ue("div",null,Ge(e.name),1)],8,di))}}),ui={class:"components"},Ln=L({__name:"ComponentList",setup(e){const t=V(()=>{const o={};Object.keys(tn).forEach(r=>{const s=new tn[r],l=s.group;!l||!s.show||(o[l]||(o[l]=[]),o[l].push(s))});const a=[];return Zn.forEach(r=>{var s;a.push({label:()=>r.name,key:r.key,icon:()=>h(Ue,{name:`${r.icon}`}),children:(s=o[r.key])==null?void 0:s.map(l=>({label:()=>h(ci,{component:l.component,name:l.name,ondragstart:n}),key:l.component}))})}),a}),n=o=>{o.dataTransfer.setData("componentName",o.target.dataset.component)};return(o,a)=>(R(),J("div",ui,[P(v(un),{options:v(t),accordion:!1},null,8,["options"])]))}}),fi={key:0,class:"layer"},pi={key:1,class:"layer"},hi=L({__name:"LayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),a=(c,i)=>{var f;(f=c.dataTransfer)==null||f.setData("compomentIndex",i),c.stopPropagation()},r=(c,i,f=!1)=>{c.preventDefault(),c.stopPropagation(),f&&i!==n.activeKey&&Fe.emit("ActiveMenu",i)},s=(c,i)=>{var C;c.preventDefault(),c.stopPropagation();const f=(C=c.dataTransfer)==null?void 0:C.getData("compomentIndex"),d=l(f,i),p=f.split("-").map(b=>Number(b)),m=o.getComponentByIndex(p),w=o.cutComponent(p[p.length-1],m==null?void 0:m.parent);if(w&&d){const b=f.split("-").map($=>Number($)),S=o.getComponentByIndex(b);o.insertComponent(b[b.length-1],w,S),t("select",i)}},l=(c,i)=>{const f=c.split("-").map(m=>parseInt(m)),d=i.split("-").map(m=>parseInt(m)),p=f.length;for(let m=0;m<p;m++)if(f[m]!==d[m]){if(f[m]>d[m])return i;if(f[m]<d[m])return m+1==p?(d[m]=d[m]-1,d.join("-")):i}return i};return(c,i)=>{const f=Ut("icon-park"),d=ot("contextmenu");return me((R(),J("div",{draggable:"true",onDragstart:i[0]||(i[0]=p=>a(p,e.index)),onDrop:i[1]||(i[1]=p=>s(p,e.index)),onDragover:i[2]||(i[2]=p=>r(p,e.index,!0))},[e.component.component==="Group"?(R(),J("div",fi,[me(ue("span",null,Ge(e.component.name||"\u5206\u7EC4"),513),[[De,e.mode==="expand"]]),e.component.display?(R(),X(f,{key:0,name:"preview-open",size:"15"})):(R(),X(f,{key:1,name:"preview-close-one",size:"15"}))])):(R(),J("div",pi,[me(ue("span",null,Ge(e.component.name),513),[[De,e.mode==="expand"]]),e.component.display?(R(),X(f,{key:0,size:"15",name:"preview-open"})):(R(),X(f,{key:1,size:"15",name:"preview-close-one"}))]))],32)),[[d,e.contextmenus,void 0,{stop:!0}]])}}});const Un=we(hi,[["__scopeId","data-v-debdcf62"]]),mi=L({__name:"SimpleLayerItem",props:{component:null,index:null,activeKey:null,mode:{default:"expand"},name:null,contextmenus:null},emits:["select"],setup(e,{emit:t}){const n=e,o=Se(),a=(c,i)=>{var f;(f=c.dataTransfer)==null||f.setData("compomentIndex",i),c.stopPropagation()},r=(c,i,f=!1)=>{c.preventDefault(),c.stopPropagation(),f&&i!==n.activeKey&&Fe.emit("ActiveMenu",i)},s=(c,i)=>{var C;c.preventDefault(),c.stopPropagation();const f=(C=c.dataTransfer)==null?void 0:C.getData("compomentIndex"),d=l(f,i),p=f.split("-").map(b=>Number(b)),m=o.getComponentByIndex(p),w=o.cutComponent(p[p.length-1],m==null?void 0:m.parent);if(w&&d){const b=f.split("-").map($=>Number($)),S=o.getComponentByIndex(b);o.insertComponent(b[b.length-1],w,S),t("select",i)}},l=(c,i)=>{const f=c.split("-").map(m=>parseInt(m)),d=i.split("-").map(m=>parseInt(m)),p=f.length;for(let m=0;m<p;m++)if(f[m]!==d[m]){if(f[m]>d[m])return i;if(f[m]<d[m])return m+1==p?(d[m]=d[m]-1,d.join("-")):i}return i};return(c,i)=>{const f=Ut("IconPark"),d=ot("contextmenu");return me((R(),X(f,{draggable:"true",onDragstart:i[0]||(i[0]=p=>a(p,e.index)),onDrop:i[1]||(i[1]=p=>s(p,e.index)),onDragover:i[2]||(i[2]=p=>r(p,e.index,!0)),name:e.name},null,8,["name"])),[[d,e.contextmenus,void 0,{stop:!0}]])}}});const Mn=we(mi,[["__scopeId","data-v-33315ec9"]]),On=L({__name:"Layer",setup(e){const t=Se(),n=to(),o={};Zn.map(g=>{o[g.key]=g.icon});const a=V(()=>t.componentData),r=z(null),s=z("");zt("ActiveMenu",g=>{const x=g;s.value=x,r.value&&r.value.open&&r.value.open(x)});const c=g=>{s.value=g;const x=g.split("-").map(B=>Number(B)),_=t.getComponentByIndex(x);_&&t.setCurComponent(_,g)},i=z([]),f=(g,x,_)=>{for(let B=0;B<x.length;B++){const N=x[B],q=d(B,g);if(N.component==="Group"){const ie=[];_.push({label:()=>h(Un,{component:N,index:q,contextmenus:()=>I(q),onclick:()=>c(q)}),key:q,icon:()=>h(Mn,{name:"branch-one",component:N,index:q,contextmenus:()=>I(q),onclick:()=>c(q)}),children:f(q,N.subComponents||[],ie)})}else _.push({label:()=>h(Un,{component:N,index:q,contextmenus:()=>I(q)}),key:q,icon:()=>h(Mn,{name:`${o[N.group]}`,component:N,index:q,contextmenus:()=>I(q),onclick:()=>c(q)})})}return _},d=(g,x)=>x?`${x}-${g}`:g.toString(),p=g=>{const x=g.split("-").map(B=>Number(B)),_=t.getComponentByIndex(x);_&&(_.groupStyle=void 0,It(JSON.stringify(_.toJson())),n.copy())},m=g=>Re(this,null,function*(){var _;c(g);const x=g.split("-").map(B=>Number(B));t.removeComponent(x[x.length-1],(_=t.curComponent)==null?void 0:_.parent)}),w=g=>Re(this,null,function*(){var _;c(g);const x=g.split("-").map(B=>Number(B));t.upComponent(x[x.length-1],(_=t.curComponent)==null?void 0:_.parent)}),C=g=>Re(this,null,function*(){var _;c(g);const x=g.split("-").map(B=>Number(B));t.downComponent(x[x.length-1],(_=t.curComponent)==null?void 0:_.parent)}),b=g=>Re(this,null,function*(){var _;c(g);const x=g.split("-").map(B=>Number(B));t.topComponent(x[x.length-1],(_=t.curComponent)==null?void 0:_.parent)}),S=g=>Re(this,null,function*(){var _;c(g);const x=g.split("-").map(B=>Number(B));t.bottomComponent(x[x.length-1],(_=t.curComponent)==null?void 0:_.parent)}),$=g=>{c(g);const x=g.split("-").map(B=>Number(B)),_=t.getComponentByIndex(x);_&&_.hiddenComponent()},F=g=>{c(g);const x=g.split("-").map(B=>Number(B)),_=t.getComponentByIndex(x);_&&_.showComponent()},T=g=>{const x=g.split("-").map(N=>Number(N)),_=t.getComponentByIndex(x),B=t.cutComponent(x[x.length-1],_==null?void 0:_.parent);B&&(It(JSON.stringify(B.toJson())),n.copy())},j=g=>{const x=g.split("-").map(N=>Number(N)),_=n.copyData,B=t.getComponentByIndex(x);if(_){const N=Ia(n.copyData);N.id=Ba(),t.insertComponent(x[x.length-1],N,B==null?void 0:B.parent)}},I=g=>{var _,B,N;const x=g.split("-").map(q=>parseInt(q));return[{text:"\u590D\u5236",subText:"Ctrl + C",handler:()=>p(g)},{text:"\u7C98\u8D34",subText:"Ctrl + V",handler:()=>j(g)},{text:"\u526A\u5207",subText:"Ctrl + V",handler:()=>T(g)},{text:"\u62C6\u5206",subText:"Ctrl + V",disable:((_=t.getComponentByIndex(g.split("-").map(q=>Number(q))))==null?void 0:_.component)!=="Group",handler:()=>t.decompose()},{text:"\u5220\u9664",subText:"",handler:()=>m(g)},{divider:!0},{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(g),children:[{text:"\u7F6E\u4E8E\u9876\u5C42",handler:()=>b(g)},{text:"\u4E0A\u79FB\u4E00\u5C42",handler:()=>w(g)}]},{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(g),children:[{text:"\u7F6E\u4E8E\u5E95\u5C42",handler:()=>S(g)},{text:"\u4E0B\u79FB\u4E00\u5C42",handler:()=>C(g)}]},{divider:!0},{text:"\u663E\u793A",disable:(B=t.getComponentByIndex(x))==null?void 0:B.display,subText:"",handler:()=>F(g)},{text:"\u9690\u85CF",disable:!((N=t.getComponentByIndex(x))!=null&&N.display),subText:"",handler:()=>$(g)}]};return Pe(()=>t.componentData,()=>{const g=t.componentData;i.value=[],i.value=f("",g,[])},{deep:!0,immediate:!0}),(g,x)=>(R(),J("div",null,[v(a).length>0?(R(),X(v(un),{key:0,options:i.value,"onUpdate:value":c},null,8,["options"])):(R(),X(v(Wr),{key:1,class:"placeholder"},{default:U(()=>[P(v(Gr),null,{default:U(()=>[P(v(Da),{description:"\u753B\u5E03\u4E3A\u7A7A"})]),_:1})]),_:1}))]))}}),bi=ue("span",null,"\u7EC4\u4EF6",-1),vi=ue("span",null,"\u56FE\u5C42",-1),gi=L({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("components"),o=r=>{t("update:iscollapsed",!1),n.value=r},a=r=>{n.value=r};return(r,s)=>{const l=Ut("IconPark");return e.iscollapsed?(R(),X(v(Et),{key:1,type:"line",animated:"","bar-width":48,"justify-content":"center","onUpdate:value":[o,s[4]||(s[4]=c=>n.value=c)],value:n.value},{default:U(()=>[n.value==="components"?(R(),X(v(Ze),{key:0,name:"components","display-directive":"show:lazy"},{tab:U(()=>[P(l,{name:"components",onClick:s[2]||(s[2]=c=>a("layer"))})]),default:U(()=>[P(Ln)]),_:1})):n.value==="layer"?(R(),X(v(Ze),{key:1,name:"layer","display-directive":"show:lazy"},{tab:U(()=>[P(l,{name:"layers",onClick:s[3]||(s[3]=c=>a("components"))})]),default:U(()=>[P(On)]),_:1})):Bt("",!0)]),_:1},8,["value"])):(R(),X(v(Et),{key:0,type:"line",animated:"","bar-width":100,"justify-content":"center",value:n.value,"onUpdate:value":[s[0]||(s[0]=c=>n.value=c),s[1]||(s[1]=c=>n.value=c)]},{default:U(()=>[P(v(Ze),{name:"components","display-directive":"show:lazy"},{tab:U(()=>[P(l,{name:"components"}),bi]),default:U(()=>[P(Ln)]),_:1}),P(v(Ze),{name:"layer","display-directive":"show:lazy"},{tab:U(()=>[P(l,{name:"layers"}),vi]),default:U(()=>[P(On)]),_:1})]),_:1},8,["value"]))}}}),xi=[{label:"4K",value:"3840X2160"},{label:"2k",value:"2048X1080"},{label:"1080P",value:"1920X1080"},{label:"720P",value:"1366X768"},{label:"iPhoneXR",value:"414X896"},{label:"iPhoneSE",value:"375X667"},{label:"iPhone12Pro",value:"390X884"},{label:"GalaxyS8+",value:"360X740"},{label:"GalaxyS20Ultra+",value:"412X915"},{label:"iPadAir",value:"820X1180"},{label:"iPadMini",value:"768X1024"},{label:"SurfacePro7",value:"912X1368"},{label:"NestHub",value:"1024X600"},{label:"NestMax",value:"1028X800"}],yi=xi,_i={class:"attr-list"},wi=L({__name:"Canvas",setup(e){const t=V(()=>[{label:"\u672C\u8BBE\u5907",value:`${window.screen.width}X${window.screen.height}`},...yi]),n=Se(),o=V(()=>n.canvasStyleData),a=z("\u672C\u8BBE\u5907"),r=[{key:"width",label:"\u5BBD\u5EA6",type:$e.NUMBER},{key:"height",label:"\u9AD8\u5EA6",type:$e.NUMBER},{key:"image",label:"\u80CC\u666F\u56FE",type:$e.TEXT}],s=l=>{const c=l.split("X"),i=parseInt(c[0]),f=parseInt(c[1]);n.setCanvasStyle(_t(ft({},o.value),{width:i,height:f}))};return(l,c)=>(R(),J("div",_i,[P(v(fo),null,{default:U(()=>[P(v(fn),{size:"small",onSubmit:c[1]||(c[1]=Lt(()=>{},["prevent"])),"label-placement":"left","label-align":"left"},{default:U(()=>[P(v(Ft),{label:"\u5206\u8FA8\u7387"},{default:U(()=>[P(v(Ot),{value:a.value,"onUpdate:value":[c[0]||(c[0]=i=>a.value=i),s],placeholder:"\u9009\u62E9\u5206\u8FA8\u7387",options:v(t)},null,8,["value","options"])]),_:1}),(R(),J(Ce,null,Be(r,({key:i,label:f,type:d},p)=>P(v(Ft),{key:p,label:f},{default:U(()=>[d==="number"?(R(),X(v(hn),{key:0,value:v(o)[i],"onUpdate:value":m=>v(o)[i]=m},null,8,["value","onUpdate:value"])):(R(),X(v(yt),{key:1,value:v(o)[i],"onUpdate:value":m=>v(o)[i]=m},null,8,["value","onUpdate:value"]))]),_:2},1032,["label"])),64))]),_:1})]),_:1})]))}});const Ci=we(wi,[["__scopeId","data-v-240a5e48"]]),Si=[{label:"Arial",value:"Arial"},{label:"\u5FAE\u8F6F\u96C5\u9ED1",value:"Microsoft Yahei"},{label:"\u5B8B\u4F53",value:"SimSun"},{label:"\u9ED1\u4F53",value:"SimHei"},{label:"\u6977\u4F53",value:"KaiTi"},{label:"\u65B0\u5B8B\u4F53",value:"NSimSun"},{label:"\u4EFF\u5B8B",value:"FangSong"},{label:"\u82F9\u65B9",value:"PingFang SC"},{label:"\u534E\u6587\u9ED1\u4F53",value:"STHeiti"},{label:"\u534E\u6587\u6977\u4F53",value:"STKaiti"},{label:"\u534E\u6587\u5B8B\u4F53",value:"STSong"},{label:"\u534E\u6587\u4EFF\u5B8B",value:"STFangSong"},{label:"\u534E\u6587\u4E2D\u5B8B",value:"STZhongSong"},{label:"\u534E\u6587\u7425\u73C0",value:"STHupo"},{label:"\u534E\u6587\u65B0\u9B4F",value:"STXinwei"},{label:"\u534E\u6587\u96B6\u4E66",value:"STLiti"},{label:"\u534E\u6587\u884C\u6977",value:"STXingkai"},{label:"\u51AC\u9752\u9ED1\u4F53",value:"Hiragino Sans GB"},{label:"\u5170\u4EAD\u9ED1",value:"Lantinghei SC"},{label:"\u504F\u504F\u4F53",value:"Hanzipen SC"},{label:"\u624B\u672D\u4F53",value:"Hannotate SC"},{label:"\u5B8B\u4F53",value:"Songti SC"},{label:"\u5A03\u5A03\u4F53",value:"Wawati SC"},{label:"\u884C\u6977",value:"Xingkai SC"},{label:"\u5706\u4F53",value:"Yuanti SC"},{label:"\u534E\u6587\u7EC6\u9ED1",value:"STXihei"},{label:"\u5E7C\u5706",value:"YouYuan"},{label:"\u96B6\u4E66",value:"LiSu"},{label:"LED",value:"LED"},{label:"LCD",value:"LCD"}],ki=[{label:"100 Thin",value:100},{label:"200 ExtraThin",value:200},{label:"300 Light",value:300},{label:"400 Normal",value:400},{label:"500 Medium",value:500},{label:"600 Semi Bold",value:600},{label:"700 Bold",value:700},{label:"Extra Bold",value:800},{label:"Black",value:900}],Ri=L({__name:"FontStyle",props:{value:{default:""}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),a=Ie(Si),r=s=>{o.value=s,t("update:value",o.value),t("change",o.value)};return(s,l)=>(R(),X(v(Ot),{clearable:"",value:o.value,"onUpdate:value":[l[0]||(l[0]=c=>o.value=c),r],placeholder:"\u8BF7\u9009\u62E9\u5B57\u4F53",options:a},null,8,["value","options"]))}}),$i=L({__name:"FontWeight",props:{value:{default:400}},emits:["update:value","change"],setup(e,{emit:t}){const o=z(e.value),a=Ie(ki),r=s=>{o.value=s,t("update:value",o.value),t("change",o.value)};return(s,l)=>(R(),X(v(Ot),{clearable:"",value:o.value,"onUpdate:value":[l[0]||(l[0]=c=>o.value=c),r],placeholder:"\u8BF7\u9009\u62E9\u5B57\u91CD",options:a},null,8,["value","options"]))}}),Di={class:"linear-gradient"},Ii=L({__name:"LinearGradient",props:{value:{default:()=>({angle:0,color1:"",color2:""})}},emits:["update:value","change"],setup(e,{emit:t}){const n=e,o=z({angle:n.value.angle||0,color1:n.value.color1||"",color2:n.value.color2||""}),a=(r,s)=>{o.value[r]=s,t("update:value",o.value),t("change",o.value)};return(r,s)=>(R(),J("div",Di,[P(v(hn),{modelValue:e.value.angle,"onUpdate:value":s[0]||(s[0]=l=>a("angle",l)),controls:!0,min:0,max:360,step:1},null,8,["modelValue"]),P(v(sn),{value:e.value.color1,"onUpdate:value":s[1]||(s[1]=l=>a("color1",l)),swatches:v(nn)},null,8,["value","swatches"]),P(v(sn),{value:e.value.color2,"onUpdate:value":s[2]||(s[2]=l=>a("color2",l)),swatches:v(nn)},null,8,["value","swatches"])]))}}),Bi=L({props:{args:{type:Object,default:()=>{}},component:{type:Object,default:()=>{}},value:{type:Object}},emits:["update:value","change"],setup(e,{emit:t}){const n=o=>{t("update:value",o),t("change",o)};return()=>[h(e.component,_t(ft({},e.args),{value:e.value,onChange:n}))]}}),mo=L({__name:"FormAttr",props:{data:null,children:null,name:null,uid:null,ukey:null},emits:["change"],setup(e,{emit:t}){const o=Ie(e.data),a=(r,s)=>{t("change",s,r)};return(r,s)=>(R(),X(v(fn),{size:"small",onSubmit:s[0]||(s[0]=Lt(()=>{},["prevent"])),"label-placement":"left","label-align":"left"},{default:U(()=>[(R(!0),J(Ce,null,Be(e.children,({prop:l,label:c,type:i,componentOptions:f})=>(R(),X(v(Ft),{key:`${e.ukey}${l}`,label:c},{default:U(()=>[i===v($e).COLOR?(R(),X(v(sn),{key:0,value:o[l],"onUpdate:value":[d=>o[l]=d,d=>a(d,l)],swatches:v(nn),modes:["hex","rgb","hsl"]},null,8,["value","onUpdate:value","swatches"])):i===v($e).SELECT?(R(),X(v(Ot),{key:1,modelValue:o[l],"onUpdate:modelValue":d=>o[l]=d,placeholder:c,"onUpdate:value":d=>a(d,l),options:(f==null?void 0:f.options)||[]},null,8,["modelValue","onUpdate:modelValue","placeholder","onUpdate:value","options"])):i===v($e).RADIO?(R(),X(v(Mr),{key:2,value:o[l],"onUpdate:value":[d=>o[l]=d,d=>a(d,l)],placeholder:c},{default:U(()=>[(R(!0),J(Ce,null,Be((f==null?void 0:f.options)||[],d=>(R(),X(v(Nr),{label:d.value,key:d.value},{default:U(()=>[Mt(Ge(d.label),1)]),_:2},1032,["label"]))),128))]),_:2},1032,["value","onUpdate:value","placeholder"])):i===v($e).NUMBER?(R(),X(v(hn),{key:3,value:o[l],"onUpdate:value":[d=>o[l]=d,d=>a(d,l)]},null,8,["value","onUpdate:value"])):i===v($e).SWITCH?(R(),X(v(za),{key:4,value:o[l],"onUpdate:value":[d=>o[l]=d,d=>a(d,l)]},null,8,["value","onUpdate:value"])):i===v($e).FONT_STYLE?(R(),X(v(Ri),{key:5,value:o[l],"onUpdate:value":d=>o[l]=d,onChange:d=>a(d,l)},null,8,["value","onUpdate:value","onChange"])):i===v($e).FONT_WEIGHT?(R(),X(v($i),{key:6,value:o[l],"onUpdate:value":d=>o[l]=d,onChange:d=>a(d,l)},null,8,["value","onUpdate:value","onChange"])):i===v($e).LINEAR_GRADIENT?(R(),X(v(Ii),{key:7,value:o[l],"onUpdate:value":d=>o[l]=d,onChange:d=>a(d,l)},null,8,["value","onUpdate:value","onChange"])):i===v($e).CUSTOM?(R(),X(v(Bi),{key:8,value:o[l],"onUpdate:value":d=>o[l]=d,onChange:d=>a(d,l),component:f.componentType,args:f.args},null,8,["value","onUpdate:value","onChange","component","args"])):(R(),X(v(yt),{key:9,clearable:"",value:o[l],"onUpdate:value":[d=>o[l]=d,d=>a(d,l)],readonly:f.editable===!1,disabled:f.disabled},null,8,["value","onUpdate:value","readonly","disabled"]))]),_:2},1032,["label"]))),128))]),_:1}))}}),zi={class:"attr-list"},Fi=L({__name:"StyleList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Ie({}),a=V(()=>t.curComponent?t.curComponent.styleFormValue:{}),r=ln((c,i)=>{if(t.curComponent)if(["top","left","width","height","rotate"].includes(c)){const d=t.curComponent.parent;n.syncComponentLoction({[c]:i},d,!0),d&&n.resizeAutoComponent(d)}else n.setCurComponentStyle(c,i)},300),s=ln(c=>{const i=Fa(c,o);i&&Object.keys(i).forEach(f=>{o[f]=i[f]})},200),l=()=>{t.curComponent&&(Qn(o),s(t.curComponent.style))};return Pe(()=>[t.curComponent.id,t.curComponent.positionStyle],()=>{t.curComponent&&t.curComponent.id&&l()},{immediate:!0,deep:!0}),(c,i)=>(R(),J("div",zi,[P(v(io),{accordion:""},{default:U(()=>[(R(!0),J(Ce,null,Be(v(a),({label:f,prop:d,children:p})=>(R(),X(v(so),{key:`${e.curComponent.id}${d}`,title:f,name:d},{default:U(()=>[P(mo,{children:p,data:o,onChange:v(r),name:f,uid:d,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Ei=we(Fi,[["__scopeId","data-v-2ea2fc07"]]),Ti={class:"attr-list"},Pi=L({__name:"AttrList",props:{curComponent:null},setup(e){const t=e,n=Se(),o=Ie({common:{name:t.curComponent.name,component:t.curComponent.component,id:t.curComponent.id}}),a=V(()=>t.curComponent?t.curComponent.propFromValue:[]),r=(l,c,i)=>{n.setCurComponentPropValue(l,c,i)},s=()=>{Qn(o,["common"]),o.common.name=t.curComponent.name,o.common.component=t.curComponent.component,o.common.id=t.curComponent.id,t.curComponent&&t.curComponent.propValue&&Object.keys(t.curComponent.propValue).forEach(l=>{o[l]=t.curComponent.propValue[l]})};return Pe(()=>t.curComponent.id,()=>{s()},{immediate:!0}),(l,c)=>(R(),J("div",Ti,[P(v(io),{accordion:""},{default:U(()=>[(R(!0),J(Ce,null,Be(v(a),({label:i,prop:f,children:d})=>(R(),X(v(so),{key:`${e.curComponent.id}${f}`,title:i,name:f},{default:U(()=>[P(mo,{children:d,data:o[f],onChange:(p,m)=>r(f,p,m),name:i,uid:f,ukey:e.curComponent.id},null,8,["children","data","onChange","name","uid","ukey"])]),_:2},1032,["title","name"]))),128))]),_:1})]))}});const Ai=we(Pi,[["__scopeId","data-v-9a5ea275"]]),Ni={key:0},Vi={key:1},Li=L({__name:"SideBar",props:{iscollapsed:{type:Boolean,default:!1}},emits:["update:iscollapsed"],setup(e,{emit:t}){const n=z("attr"),o=Se(),a=V(()=>o.curComponent),r=V(()=>o.curComponent?[{label:"\u6837\u5F0F",key:"4",icon:()=>h(Ue,{name:"text-style",onClick:()=>s("style")})},{label:"\u5C5E\u6027",key:"2",icon:()=>h(Ue,{name:"internal-data",onClick:()=>s("attr")})}]:[{label:"\u753B\u5E03",key:"1",icon:()=>h(Ue,{name:"page"})}]),s=l=>{t("update:iscollapsed",!1),n.value=l};return(l,c)=>e.iscollapsed?(R(),J("div",Vi,[P(v(un),{options:v(r)},null,8,["options"])])):(R(),J("div",Ni,[v(a)?(R(),X(v(Et),{key:0,type:"line",animated:"","justify-content":"center",value:n.value,"onUpdate:value":[c[0]||(c[0]=i=>n.value=i),c[1]||(c[1]=i=>n.value=i)]},{default:U(()=>[P(v(Ze),{name:"style","display-directive":"show:lazy"},{tab:U(()=>[P(v(Ue),{name:"text-style"}),me(ue("span",null,"\u6837\u5F0F",512),[[De,!e.iscollapsed]])]),default:U(()=>[P(v(Ei),{curComponent:v(a)},null,8,["curComponent"])]),_:1}),P(v(Ze),{name:"attr","display-directive":"show:lazy"},{tab:U(()=>[P(v(Ue),{name:"internal-data"}),me(ue("span",null,"\u5C5E\u6027",512),[[De,!e.iscollapsed]])]),default:U(()=>[P(v(Ai),{curComponent:v(a)},null,8,["curComponent"])]),_:1})]),_:1},8,["value"])):(R(),X(v(Et),{key:1,type:"line",animated:"","justify-content":"center"},{default:U(()=>[P(v(Ze),{name:"canvas","display-directive":"show:lazy"},{tab:U(()=>[P(v(Ue),{name:"page"}),me(ue("span",null,"\u753B\u5E03",512),[[De,!e.iscollapsed]])]),default:U(()=>[P(Ci)]),_:1})]),_:1}))]))}}),Ui=L({__name:"DesignerPage",setup(e){const t=Se(),n=z(!1),o=z(!1),a=Jn();Nt(()=>Re(this,null,function*(){const f=a.params.index;f&&(yield r(f))}));const r=f=>Re(this,null,function*(){const d=yield Va(f);!d.data||t.setLayoutData(d.data)}),s=z(0),l=z(0),c=V(()=>({width:s.value+"px",height:l.value+"px"})),i=f=>{const d=f[0],{width:p,height:m}=d.contentRect;s.value=p,l.value=m};return Xn(()=>{t.clearCanvas()}),(f,d)=>{const p=ot("resize");return R(),X(v(jt),{class:"home"},{default:U(()=>[P(v(Ea),{class:"header"},{default:U(()=>[P(v(si))]),_:1}),P(v(jt),{"has-sider":"",class:"main"},{default:U(()=>[P(v(Sn),{class:"left",width:"200",collapsed:n.value,"native-scrollbar":!1,bordered:"","collapse-mode":"width","show-trigger":"",onCollapse:d[2]||(d[2]=()=>n.value=!0),onExpand:d[3]||(d[3]=()=>n.value=!1)},{default:U(()=>[P(v(gi),{iscollapsed:n.value,"onUpdate:iscollapsed":[d[0]||(d[0]=m=>n.value=m),d[1]||(d[1]=m=>n.value=m)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"]),P(v(jt),{"has-sider":"","sider-placement":"right"},{default:U(()=>[me((R(),X(v(Ta),{class:"content"},{default:U(()=>[P(v(fo),{"x-scrollable":"",style:Ve(v(c))},{default:U(()=>[P(Dl)]),_:1},8,["style"])]),_:1})),[[p,i]]),P(v(Sn),{class:"right",width:"240",collapsed:o.value,"native-scrollbar":!1,bordered:"","collapsed-width":35,"collapse-mode":"width","show-trigger":"arrow-circle",onCollapse:d[6]||(d[6]=()=>o.value=!0),onExpand:d[7]||(d[7]=()=>o.value=!1)},{default:U(()=>[P(v(Li),{iscollapsed:o.value,"onUpdate:iscollapsed":[d[4]||(d[4]=m=>o.value=m),d[5]||(d[5]=m=>o.value=m)]},null,8,["iscollapsed"])]),_:1},8,["collapsed"])]),_:1})]),_:1})]),_:1})}}});const qi=we(Ui,[["__scopeId","data-v-0ebe2819"]]);export{qi as default};
