import{ao as he,bL as Rn,G as Ce,bM as Nr,d as ve,a4 as g,an as Ze,B as q,c as z,bN as Hr,a9 as S,ab as x,aa as L,aw as N,a$ as ye,ac as Je,az as ge,bO as Ur,bP as Kr,ad as Yr,ay as Xr,aC as xe,aD as Zr,ax as Jr,aX as rn,E as Fn,ap as tn,aB as Ie,aT as Gr,aE as ee,bQ as Qr,aF as Cn,b1 as we,b8 as De,ba as et,F as nt,bh as rt,aQ as an,al as on,bR as ln,bS as tt,aZ as sn,aO as X,am as dn,bT as Sn,bU as un,bV as Le,bW as An,bX as it,aW as cn,bY as at,aM as ot,au as fn}from"./index.6dd09c59.js";function lt(r,e,n){var t;const o=he(r,null);if(o===null)return;const l=(t=Rn())===null||t===void 0?void 0:t.proxy;Ce(n,a),a(n.value),Nr(()=>{a(void 0,n.value)});function a(f,c){const v=o[e];c!==void 0&&s(v,c),f!==void 0&&d(v,f)}function s(f,c){f[c]||(f[c]=[]),f[c].splice(f[c].findIndex(v=>v===l),1)}function d(f,c){f[c]||(f[c]=[]),~f[c].findIndex(v=>v===l)||f[c].push(l)}}var st=ve({name:"Eye",render(){return g("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},g("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),g("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),dt=ve({name:"EyeOff",render(){return g("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},g("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),g("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),g("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),g("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),g("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}});const _n=Ze("n-input");function ut(r){let e=0;for(const n of r)e++;return e}function $e(r){return r===""||r==null}function ct(r){const e=q(null);function n(){const{value:l}=r;if(!l||!l.focus){o();return}const{selectionStart:a,selectionEnd:s,value:d}=l;if(a==null||s==null){o();return}e.value={start:a,end:s,beforeText:d.slice(0,a),afterText:d.slice(s)}}function t(){var l;const{value:a}=e,{value:s}=r;if(!a||!s)return;const{value:d}=s,{start:f,beforeText:c,afterText:v}=a;let h=d.length;if(d.endsWith(v))h=d.length-v.length;else if(d.startsWith(c))h=c.length;else{const A=c[f-1],R=d.indexOf(A,f-1);R!==-1&&(h=R+1)}(l=s.setSelectionRange)===null||l===void 0||l.call(s,h,h)}function o(){e.value=null}return Ce(r,o),{recordCursor:n,restoreCursor:t}}var hn=ve({name:"InputWordCount",setup(r,{slots:e}){const{mergedValueRef:n,maxlengthRef:t,mergedClsPrefixRef:o}=he(_n),l=z(()=>{const{value:a}=n;return a===null||Array.isArray(a)?0:ut(a)});return()=>{const{value:a}=t,{value:s}=n;return g("span",{class:`${o.value}-input-word-count`},Hr(e.default,{value:s===null||Array.isArray(s)?"":s},()=>[a===void 0?l.value:`${l.value} / ${a}`]))}}}),ft=S("input",`
 max-width: 100%;
 cursor: text;
 line-height: 1.5;
 z-index: auto;
 outline: none;
 box-sizing: border-box;
 position: relative;
 display: inline-flex;
 border-radius: var(--n-border-radius);
 background-color: var(--n-color);
 transition: background-color .3s var(--n-bezier);
 font-size: var(--n-font-size);
 --n-padding-vertical: calc((var(--n-height) - 1.5 * var(--n-font-size)) / 2);
`,[x("input, textarea",`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),x("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder",`
 box-sizing: border-box;
 font-size: inherit;
 line-height: 1.5;
 font-family: inherit;
 border: none;
 outline: none;
 background-color: #0000;
 text-align: inherit;
 transition:
 -webkit-text-fill-color .3s var(--n-bezier),
 caret-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 text-decoration-color .3s var(--n-bezier);
 `),x("input-el, textarea-el",`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[L("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),L("&::placeholder",`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),L("&:-webkit-autofill ~",[x("placeholder","display: none;")])]),N("round",[ye("textarea","border-radius: calc(var(--n-height) / 2);")]),x("placeholder",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[L("span",`
 width: 100%;
 display: inline-block;
 `)]),N("textarea",[x("placeholder","overflow: visible;")]),ye("autosize","width: 100%;"),N("autosize",[x("textarea-el, input-el",`
 position: absolute;
 top: 0;
 left: 0;
 height: 100%;
 `)]),S("input-wrapper",`
 overflow: hidden;
 display: inline-flex;
 flex-grow: 1;
 position: relative;
 padding-left: var(--n-padding-left);
 padding-right: var(--n-padding-right);
 `),x("input-mirror",`
 padding: 0;
 height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: nowrap;
 pointer-events: none;
 `),x("input-el",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[L("+",[x("placeholder",`
 display: flex;
 align-items: center; 
 `)])]),ye("textarea",[x("placeholder","white-space: nowrap;")]),x("eye",`
 transition: color .3s var(--n-bezier);
 `),N("textarea","width: 100%;",[S("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),N("resizable",[S("input-wrapper",`
 resize: vertical;
 min-height: var(--n-height);
 `)]),x("textarea-el, textarea-mirror, placeholder",`
 height: 100%;
 padding-left: 0;
 padding-right: 0;
 padding-top: var(--n-padding-vertical);
 padding-bottom: var(--n-padding-vertical);
 word-break: break-word;
 display: inline-block;
 vertical-align: bottom;
 box-sizing: border-box;
 line-height: var(--n-line-height-textarea);
 margin: 0;
 resize: none;
 white-space: pre-wrap;
 `),x("textarea-mirror",`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),N("pair",[x("input-el, placeholder","text-align: center;"),x("separator",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[S("icon",`
 color: var(--n-icon-color);
 `),S("base-icon",`
 color: var(--n-icon-color);
 `)])]),N("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[x("border","border: var(--n-border-disabled);"),x("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),x("placeholder","color: var(--n-placeholder-color-disabled);"),x("separator","color: var(--n-text-color-disabled);",[S("icon",`
 color: var(--n-icon-color-disabled);
 `),S("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),S("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),x("suffix, prefix","color: var(--n-text-color-disabled);",[S("icon",`
 color: var(--n-icon-color-disabled);
 `),S("internal-icon",`
 color: var(--n-icon-color-disabled);
 `)])]),ye("disabled",[x("eye",`
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `,[L("&:hover",`
 color: var(--n-icon-color-hover);
 `),L("&:active",`
 color: var(--n-icon-color-pressed);
 `)]),L("&:hover",[x("state-border","border: var(--n-border-hover);")]),N("focus","background-color: var(--n-color-focus);",[x("state-border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),x("border, state-border",`
 box-sizing: border-box;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: inherit;
 border: var(--n-border);
 transition:
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `),x("state-border",`
 border-color: #0000;
 z-index: 1;
 `),x("prefix","margin-right: 4px;"),x("suffix",`
 margin-left: 4px;
 `),x("suffix, prefix",`
 transition: color .3s var(--n-bezier);
 flex-wrap: nowrap;
 flex-shrink: 0;
 line-height: var(--n-height);
 white-space: nowrap;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 color: var(--n-suffix-text-color);
 `,[S("base-loading",`
 font-size: var(--n-icon-size);
 margin: 0 2px;
 color: var(--n-loading-color);
 `),S("base-clear",`
 font-size: var(--n-icon-size);
 `,[x("placeholder",[S("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),L(">",[S("icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)]),S("base-icon",`
 font-size: var(--n-icon-size);
 `)]),S("input-word-count",`
 pointer-events: none;
 line-height: 1.5;
 font-size: .85em;
 color: var(--n-count-text-color);
 transition: color .3s var(--n-bezier);
 margin-left: 4px;
 font-variant: tabular-nums;
 `),["warning","error"].map(r=>N(`${r}-status`,[ye("disabled",[S("base-loading",`
 color: var(--n-loading-color-${r})
 `),x("input-el, textarea-el",`
 caret-color: var(--n-caret-color-${r});
 `),x("state-border",`
 border: var(--n-border-${r});
 `),L("&:hover",[x("state-border",`
 border: var(--n-border-hover-${r});
 `)]),L("&:focus",`
 background-color: var(--n-color-focus-${r});
 `,[x("state-border",`
 box-shadow: var(--n-box-shadow-focus-${r});
 border: var(--n-border-focus-${r});
 `)]),N("focus",`
 background-color: var(--n-color-focus-${r});
 `,[x("state-border",`
 box-shadow: var(--n-box-shadow-focus-${r});
 border: var(--n-border-focus-${r});
 `)])])]))]);const ht=S("input",[N("disabled",[x("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]),vt=Object.assign(Object.assign({},ge.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:Function,onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:Boolean,showPasswordToggle:Boolean});var ti=ve({name:"Input",props:vt,setup(r){const{mergedClsPrefixRef:e,mergedBorderedRef:n,inlineThemeDisabled:t,mergedRtlRef:o}=Je(r),l=ge("Input","-input",ft,Ur,r,e);Kr&&Yr("-input-safari",ht,e);const a=q(null),s=q(null),d=q(null),f=q(null),c=q(null),v=q(null),h=q(null),A=ct(h),R=q(null),{localeRef:m}=Xr("Input"),F=q(r.defaultValue),p=xe(r,"value"),M=Zr(p,F),y=Jr(r),{mergedSizeRef:C,mergedDisabledRef:$,mergedStatusRef:E}=y,H=q(!1),T=q(!1),D=q(!1),K=q(!1);let _=null;const O=z(()=>{const{placeholder:i,pair:u}=r;return u?Array.isArray(i)?i:i===void 0?["",""]:[i,i]:i===void 0?[m.value.placeholder]:[i]}),k=z(()=>{const{value:i}=D,{value:u}=M,{value:b}=O;return!i&&($e(u)||Array.isArray(u)&&$e(u[0]))&&b[0]}),B=z(()=>{const{value:i}=D,{value:u}=M,{value:b}=O;return!i&&b[1]&&($e(u)||Array.isArray(u)&&$e(u[1]))}),Q=rn(()=>r.internalForceFocus||H.value),te=rn(()=>{if($.value||r.readonly||!r.clearable||!Q.value&&!T.value)return!1;const{value:i}=M,{value:u}=Q;return r.pair?!!(Array.isArray(i)&&(i[0]||i[1]))&&(T.value||u):!!i&&(T.value||u)}),ne=z(()=>{const{showPasswordOn:i}=r;if(i)return i;if(r.showPasswordToggle)return"click"}),J=q(!1),ie=z(()=>{const{textDecoration:i}=r;return i?Array.isArray(i)?i.map(u=>({textDecoration:u})):[{textDecoration:i}]:["",""]}),re=q(void 0),de=()=>{var i,u;if(r.type==="textarea"){const{autosize:b}=r;if(b&&(re.value=(u=(i=R.value)===null||i===void 0?void 0:i.$el)===null||u===void 0?void 0:u.offsetWidth),!s.value||typeof b=="boolean")return;const{paddingTop:I,paddingBottom:j,lineHeight:W}=window.getComputedStyle(s.value),ae=Number(I.slice(0,-2)),oe=Number(j.slice(0,-2)),le=Number(W.slice(0,-2)),{value:me}=d;if(!me)return;if(b.minRows){const be=Math.max(b.minRows,1),We=`${ae+oe+le*be}px`;me.style.minHeight=We}if(b.maxRows){const be=`${ae+oe+le*b.maxRows}px`;me.style.maxHeight=be}}},ue=z(()=>{const{maxlength:i}=r;return i===void 0?void 0:Number(i)});Fn(()=>{const{value:i}=M;Array.isArray(i)||je(i)});const G=Rn().proxy;function Y(i){const{onUpdateValue:u,"onUpdate:value":b,onInput:I}=r,{nTriggerFormInput:j}=y;u&&X(u,i),b&&X(b,i),I&&X(I,i),F.value=i,j()}function P(i){const{onChange:u}=r,{nTriggerFormChange:b}=y;u&&X(u,i),F.value=i,b()}function U(i){const{onBlur:u}=r,{nTriggerFormBlur:b}=y;u&&X(u,i),b()}function Me(i){const{onFocus:u}=r,{nTriggerFormFocus:b}=y;u&&X(u,i),b()}function Te(i){const{onClear:u}=r;u&&X(u,i)}function Ve(i){const{onInputBlur:u}=r;u&&X(u,i)}function pe(i){const{onInputFocus:u}=r;u&&X(u,i)}function Ge(){const{onDeactivate:i}=r;i&&X(i)}function zn(){const{onActivate:i}=r;i&&X(i)}function En(i){const{onClick:u}=r;u&&X(u,i)}function $n(i){const{onWrapperFocus:u}=r;u&&X(u,i)}function On(i){const{onWrapperBlur:u}=r;u&&X(u,i)}function qn(){D.value=!0}function In(i){D.value=!1,i.target===v.value?ke(i,1):ke(i,0)}function ke(i,u=0,b="input"){const I=i.target.value;if(je(I),i instanceof InputEvent&&!i.isComposing&&(D.value=!1),r.type==="textarea"){const{value:W}=R;W&&W.syncUnifiedContainer()}if(_=I,D.value)return;A.recordCursor();const j=Mn(I);if(j)if(!r.pair)b==="input"?Y(I):P(I);else{let{value:W}=M;Array.isArray(W)?W=[W[0],W[1]]:W=["",""],W[u]=I,b==="input"?Y(W):P(W)}G.$forceUpdate(),j||an(A.restoreCursor)}function Mn(i){const{allowInput:u}=r;return typeof u=="function"?u(i):!0}function Tn(i){Ve(i),i.relatedTarget===a.value&&Ge(),i.relatedTarget!==null&&(i.relatedTarget===c.value||i.relatedTarget===v.value||i.relatedTarget===s.value)||(K.value=!1),Pe(i,"blur"),h.value=null}function Vn(i,u){pe(i),H.value=!0,K.value=!0,zn(),Pe(i,"focus"),u===0?h.value=c.value:u===1?h.value=v.value:u===2&&(h.value=s.value)}function Bn(i){r.passivelyActivated&&(On(i),Pe(i,"blur"))}function jn(i){r.passivelyActivated&&(H.value=!0,$n(i),Pe(i,"focus"))}function Pe(i,u){i.relatedTarget!==null&&(i.relatedTarget===c.value||i.relatedTarget===v.value||i.relatedTarget===s.value||i.relatedTarget===a.value)||(u==="focus"?(Me(i),H.value=!0):u==="blur"&&(U(i),H.value=!1))}function Wn(i,u){ke(i,u,"change")}function Dn(i){En(i)}function Ln(i){Te(i),r.pair?(Y(["",""]),P(["",""])):(Y(""),P(""))}function Nn(i){const{onMousedown:u}=r;u&&u(i);const{tagName:b}=i.target;if(b!=="INPUT"&&b!=="TEXTAREA"){if(r.resizable){const{value:I}=a;if(I){const{left:j,top:W,width:ae,height:oe}=I.getBoundingClientRect(),le=14;if(j+ae-le<i.clientX&&i.clientX<j+ae&&W+oe-le<i.clientY&&i.clientY<W+oe)return}}i.preventDefault(),H.value||Qe()}}function Hn(){var i;T.value=!0,r.type==="textarea"&&((i=R.value)===null||i===void 0||i.handleMouseEnterWrapper())}function Un(){var i;T.value=!1,r.type==="textarea"&&((i=R.value)===null||i===void 0||i.handleMouseLeaveWrapper())}function Kn(){$.value||ne.value==="click"&&(J.value=!J.value)}function Yn(i){if($.value)return;i.preventDefault();const u=I=>{I.preventDefault(),dn("mouseup",document,u)};if(on("mouseup",document,u),ne.value!=="mousedown")return;J.value=!0;const b=()=>{J.value=!1,dn("mouseup",document,b)};on("mouseup",document,b)}function Xn(i){var u;switch((u=r.onKeydown)===null||u===void 0||u.call(r,i),i.key){case"Escape":Be();break;case"Enter":Zn(i);break}}function Zn(i){var u,b;if(r.passivelyActivated){const{value:I}=K;if(I){r.internalDeactivateOnEnter&&Be();return}i.preventDefault(),r.type==="textarea"?(u=s.value)===null||u===void 0||u.focus():(b=c.value)===null||b===void 0||b.focus()}}function Be(){r.passivelyActivated&&(K.value=!1,an(()=>{var i;(i=a.value)===null||i===void 0||i.focus()}))}function Qe(){var i,u,b;$.value||(r.passivelyActivated?(i=a.value)===null||i===void 0||i.focus():((u=s.value)===null||u===void 0||u.focus(),(b=c.value)===null||b===void 0||b.focus()))}function Jn(){var i;!((i=a.value)===null||i===void 0)&&i.contains(document.activeElement)&&document.activeElement.blur()}function Gn(){var i,u;(i=s.value)===null||i===void 0||i.select(),(u=c.value)===null||u===void 0||u.select()}function Qn(){$.value||(s.value?s.value.focus():c.value&&c.value.focus())}function er(){const{value:i}=a;(i==null?void 0:i.contains(document.activeElement))&&i!==document.activeElement&&Be()}function nr(i){if(r.type==="textarea"){const{value:u}=s;u==null||u.scrollTo(i)}else{const{value:u}=c;u==null||u.scrollTo(i)}}function je(i){const{type:u,pair:b,autosize:I}=r;if(!b&&I)if(u==="textarea"){const{value:j}=d;j&&(j.textContent=(i!=null?i:"")+`\r
`)}else{const{value:j}=f;j&&(i?j.textContent=i:j.innerHTML="&nbsp;")}}function rr(){de()}const en=q({top:"0"});function tr(i){var u;const{scrollTop:b}=i.target;en.value.top=`${-b}px`,(u=R.value)===null||u===void 0||u.syncUnifiedContainer()}let ze=null;tn(()=>{const{autosize:i,type:u}=r;i&&u==="textarea"?ze=Ce(M,b=>{!Array.isArray(b)&&b!==_&&je(b)}):ze==null||ze()});let Ee=null;tn(()=>{r.type==="textarea"?Ee=Ce(M,i=>{var u;!Array.isArray(i)&&i!==_&&((u=R.value)===null||u===void 0||u.syncUnifiedContainer())}):Ee==null||Ee()}),Ie(_n,{mergedValueRef:M,maxlengthRef:ue,mergedClsPrefixRef:e});const ir={wrapperElRef:a,inputElRef:c,textareaElRef:s,isCompositing:D,focus:Qe,blur:Jn,select:Gn,deactivate:er,activate:Qn,scrollTo:nr},ar=Gr("Input",o,e),nn=z(()=>{const{value:i}=C,{common:{cubicBezierEaseInOut:u},self:{color:b,borderRadius:I,textColor:j,caretColor:W,caretColorError:ae,caretColorWarning:oe,textDecorationColor:le,border:me,borderDisabled:be,borderHover:We,borderFocus:or,placeholderColor:lr,placeholderColorDisabled:sr,lineHeightTextarea:dr,colorDisabled:ur,colorFocus:cr,textColorDisabled:fr,boxShadowFocus:hr,iconSize:vr,colorFocusWarning:gr,boxShadowFocusWarning:pr,borderWarning:mr,borderFocusWarning:br,borderHoverWarning:yr,colorFocusError:xr,boxShadowFocusError:wr,borderError:Rr,borderFocusError:Fr,borderHoverError:Cr,clearSize:Sr,clearColor:Ar,clearColorHover:_r,clearColorPressed:kr,iconColor:Pr,iconColorDisabled:zr,suffixTextColor:Er,countTextColor:$r,countTextColorDisabled:Or,iconColorHover:qr,iconColorPressed:Ir,loadingColor:Mr,loadingColorError:Tr,loadingColorWarning:Vr,[ee("padding",i)]:Br,[ee("fontSize",i)]:jr,[ee("height",i)]:Wr}}=l.value,{left:Dr,right:Lr}=Qr(Br);return{"--n-bezier":u,"--n-count-text-color":$r,"--n-count-text-color-disabled":Or,"--n-color":b,"--n-font-size":jr,"--n-border-radius":I,"--n-height":Wr,"--n-padding-left":Dr,"--n-padding-right":Lr,"--n-text-color":j,"--n-caret-color":W,"--n-text-decoration-color":le,"--n-border":me,"--n-border-disabled":be,"--n-border-hover":We,"--n-border-focus":or,"--n-placeholder-color":lr,"--n-placeholder-color-disabled":sr,"--n-icon-size":vr,"--n-line-height-textarea":dr,"--n-color-disabled":ur,"--n-color-focus":cr,"--n-text-color-disabled":fr,"--n-box-shadow-focus":hr,"--n-loading-color":Mr,"--n-caret-color-warning":oe,"--n-color-focus-warning":gr,"--n-box-shadow-focus-warning":pr,"--n-border-warning":mr,"--n-border-focus-warning":br,"--n-border-hover-warning":yr,"--n-loading-color-warning":Vr,"--n-caret-color-error":ae,"--n-color-focus-error":xr,"--n-box-shadow-focus-error":wr,"--n-border-error":Rr,"--n-border-focus-error":Fr,"--n-border-hover-error":Cr,"--n-loading-color-error":Tr,"--n-clear-color":Ar,"--n-clear-size":Sr,"--n-clear-color-hover":_r,"--n-clear-color-pressed":kr,"--n-icon-color":Pr,"--n-icon-color-hover":qr,"--n-icon-color-pressed":Ir,"--n-icon-color-disabled":zr,"--n-suffix-text-color":Er}}),ce=t?Cn("input",z(()=>{const{value:i}=C;return i[0]}),nn,r):void 0;return Object.assign(Object.assign({},ir),{wrapperElRef:a,inputElRef:c,inputMirrorElRef:f,inputEl2Ref:v,textareaElRef:s,textareaMirrorElRef:d,textareaScrollbarInstRef:R,rtlEnabled:ar,uncontrolledValue:F,mergedValue:M,passwordVisible:J,mergedPlaceholder:O,showPlaceholder1:k,showPlaceholder2:B,mergedFocus:Q,isComposing:D,activated:K,showClearButton:te,mergedSize:C,mergedDisabled:$,textDecorationStyle:ie,mergedClsPrefix:e,mergedBordered:n,mergedShowPasswordOn:ne,placeholderStyle:en,mergedStatus:E,textAreaScrollContainerWidth:re,handleTextAreaScroll:tr,handleCompositionStart:qn,handleCompositionEnd:In,handleInput:ke,handleInputBlur:Tn,handleInputFocus:Vn,handleWrapperBlur:Bn,handleWrapperFocus:jn,handleMouseEnter:Hn,handleMouseLeave:Un,handleMouseDown:Nn,handleChange:Wn,handleClick:Dn,handleClear:Ln,handlePasswordToggleClick:Kn,handlePasswordToggleMousedown:Yn,handleWrapperKeydown:Xn,handleTextAreaMirrorResize:rr,getTextareaScrollContainer:()=>s.value,mergedTheme:l,cssVars:t?void 0:nn,themeClass:ce==null?void 0:ce.themeClass,onRender:ce==null?void 0:ce.onRender})},render(){var r,e;const{mergedClsPrefix:n,mergedStatus:t,themeClass:o,type:l,onRender:a}=this,s=this.$slots;return a==null||a(),g("div",{ref:"wrapperElRef",class:[`${n}-input`,o,t&&`${n}-input--${t}-status`,{[`${n}-input--rtl`]:this.rtlEnabled,[`${n}-input--disabled`]:this.mergedDisabled,[`${n}-input--textarea`]:l==="textarea",[`${n}-input--resizable`]:this.resizable&&!this.autosize,[`${n}-input--autosize`]:this.autosize,[`${n}-input--round`]:this.round&&l!=="textarea",[`${n}-input--pair`]:this.pair,[`${n}-input--focus`]:this.mergedFocus,[`${n}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.onKeyup,onKeydown:this.handleWrapperKeydown},g("div",{class:`${n}-input-wrapper`},we(s.prefix,d=>d&&g("div",{class:`${n}-input__prefix`},d)),l==="textarea"?g(et,{ref:"textareaScrollbarInstRef",class:`${n}-input__textarea`,container:this.getTextareaScrollContainer,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var d,f;const{textAreaScrollContainerWidth:c}=this,v={width:this.autosize&&c&&`${c}px`};return g(nt,null,g("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${n}-input__textarea-el`,(d=this.inputProps)===null||d===void 0?void 0:d.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(f=this.inputProps)===null||f===void 0?void 0:f.style,v],onBlur:this.handleInputBlur,onFocus:h=>this.handleInputFocus(h,2),onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?g("div",{class:`${n}-input__placeholder`,style:[this.placeholderStyle,v],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?g(rt,{onResize:this.handleTextAreaMirrorResize},{default:()=>g("div",{ref:"textareaMirrorElRef",class:`${n}-input__textarea-mirror`,key:"mirror"})}):null)}}):g("div",{class:`${n}-input__input`},g("input",Object.assign({type:l==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":l},this.inputProps,{ref:"inputElRef",class:[`${n}-input__input-el`,(r=this.inputProps)===null||r===void 0?void 0:r.class],style:[this.textDecorationStyle[0],(e=this.inputProps)===null||e===void 0?void 0:e.style],tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:d=>this.handleInputFocus(d,0),onInput:d=>this.handleInput(d,0),onChange:d=>this.handleChange(d,0)})),this.showPlaceholder1?g("div",{class:`${n}-input__placeholder`},g("span",null,this.mergedPlaceholder[0])):null,this.autosize?g("div",{class:`${n}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"},"\xA0"):null),!this.pair&&we(s.suffix,d=>d||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?g("div",{class:`${n}-input__suffix`},[we(s["clear-icon-placeholder"],f=>(this.clearable||f)&&g(ln,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>f,icon:()=>{var c,v;return(v=(c=this.$slots)["clear-icon"])===null||v===void 0?void 0:v.call(c)}})),this.internalLoadingBeforeSuffix?null:d,this.loading!==void 0?g(tt,{clsPrefix:n,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?d:null,this.showCount&&this.type!=="textarea"?g(hn,null,{default:f=>{var c;return(c=s.count)===null||c===void 0?void 0:c.call(s,f)}}):null,this.mergedShowPasswordOn&&this.type==="password"?g("div",{class:`${n}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?De(s["password-visible-icon"],()=>[g(sn,{clsPrefix:n},{default:()=>g(st,null)})]):De(s["password-invisible-icon"],()=>[g(sn,{clsPrefix:n},{default:()=>g(dt,null)})])):null]):null)),this.pair?g("span",{class:`${n}-input__separator`},De(s.separator,()=>[this.separator])):null,this.pair?g("div",{class:`${n}-input-wrapper`},g("div",{class:`${n}-input__input`},g("input",{ref:"inputEl2Ref",type:this.type,class:`${n}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:d=>this.handleInputFocus(d,1),onInput:d=>this.handleInput(d,1),onChange:d=>this.handleChange(d,1)}),this.showPlaceholder2?g("div",{class:`${n}-input__placeholder`},g("span",null,this.mergedPlaceholder[1])):null),we(s.suffix,d=>(this.clearable||d)&&g("div",{class:`${n}-input__suffix`},[this.clearable&&g(ln,{clsPrefix:n,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var f;return(f=s["clear-icon"])===null||f===void 0?void 0:f.call(s)},placeholder:()=>{var f;return(f=s["clear-icon-placeholder"])===null||f===void 0?void 0:f.call(s)}}),d]))):null,this.mergedBordered?g("div",{class:`${n}-input__border`}):null,this.mergedBordered?g("div",{class:`${n}-input__state-border`}):null,this.showCount&&l==="textarea"?g(hn,null,{default:d=>{var f;const{renderCount:c}=this;return c?c(d):(f=s.count)===null||f===void 0?void 0:f.call(s,d)}}):null)}}),gt=S("form",[N("inline",`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[S("form-item",{width:"auto",marginRight:"18px"},[L("&:last-child",{marginRight:0})])])]);const Ae=Ze("n-form"),kn=Ze("n-form-item-insts");var pt=globalThis&&globalThis.__awaiter||function(r,e,n,t){function o(l){return l instanceof n?l:new n(function(a){a(l)})}return new(n||(n=Promise))(function(l,a){function s(c){try{f(t.next(c))}catch(v){a(v)}}function d(c){try{f(t.throw(c))}catch(v){a(v)}}function f(c){c.done?l(c.value):o(c.value).then(s,d)}f((t=t.apply(r,e||[])).next())})};const mt=Object.assign(Object.assign({},ge.props),{inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:"top"},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:r=>r.preventDefault()},showLabel:{type:Boolean,default:void 0},validateMessages:Object});var ii=ve({name:"Form",props:mt,setup(r){const{mergedClsPrefixRef:e}=Je(r);ge("Form","-form",gt,Sn,r,e);const n={},t=q(void 0),o=d=>{const f=t.value;(f===void 0||d>=f)&&(t.value=d)};function l(d,f=()=>!0){return pt(this,void 0,void 0,function*(){return yield new Promise((c,v)=>{const h=[];for(const A of un(n)){const R=n[A];for(const m of R)m.path&&h.push(m.internalValidate(null,f))}Promise.all(h).then(A=>{if(A.some(R=>!R.valid)){const R=A.filter(m=>m.errors).map(m=>m.errors);d&&d(R),v(R)}else d&&d(),c()})})})}function a(){for(const d of un(n)){const f=n[d];for(const c of f)c.restoreValidation()}}return Ie(Ae,{props:r,maxChildLabelWidthRef:t,deriveMaxChildLabelWidth:o}),Ie(kn,{formItems:n}),Object.assign({validate:l,restoreValidation:a},{mergedClsPrefix:e})},render(){const{mergedClsPrefix:r}=this;return g("form",{class:[`${r}-form`,this.inline&&`${r}-form--inline`],onSubmit:this.onSubmit},this.$slots)}});function se(){return se=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&(r[t]=n[t])}return r},se.apply(this,arguments)}function bt(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,Se(r,e)}function He(r){return He=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(n){return n.__proto__||Object.getPrototypeOf(n)},He(r)}function Se(r,e){return Se=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,o){return t.__proto__=o,t},Se(r,e)}function yt(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(r){return!1}}function qe(r,e,n){return yt()?qe=Reflect.construct.bind():qe=function(o,l,a){var s=[null];s.push.apply(s,l);var d=Function.bind.apply(o,s),f=new d;return a&&Se(f,a.prototype),f},qe.apply(null,arguments)}function xt(r){return Function.toString.call(r).indexOf("[native code]")!==-1}function Ue(r){var e=typeof Map=="function"?new Map:void 0;return Ue=function(t){if(t===null||!xt(t))return t;if(typeof t!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e!="undefined"){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return qe(t,arguments,He(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),Se(o,t)},Ue(r)}var wt=/%[sdj%]/g,Rt=function(){};typeof process!="undefined"&&process.env;function Ke(r){if(!r||!r.length)return null;var e={};return r.forEach(function(n){var t=n.field;e[t]=e[t]||[],e[t].push(n)}),e}function Z(r){for(var e=arguments.length,n=new Array(e>1?e-1:0),t=1;t<e;t++)n[t-1]=arguments[t];var o=0,l=n.length;if(typeof r=="function")return r.apply(null,n);if(typeof r=="string"){var a=r.replace(wt,function(s){if(s==="%%")return"%";if(o>=l)return s;switch(s){case"%s":return String(n[o++]);case"%d":return Number(n[o++]);case"%j":try{return JSON.stringify(n[o++])}catch(d){return"[Circular]"}break;default:return s}});return a}return r}function Ft(r){return r==="string"||r==="url"||r==="hex"||r==="email"||r==="date"||r==="pattern"}function V(r,e){return!!(r==null||e==="array"&&Array.isArray(r)&&!r.length||Ft(e)&&typeof r=="string"&&!r)}function Ct(r,e,n){var t=[],o=0,l=r.length;function a(s){t.push.apply(t,s||[]),o++,o===l&&n(t)}r.forEach(function(s){e(s,a)})}function vn(r,e,n){var t=0,o=r.length;function l(a){if(a&&a.length){n(a);return}var s=t;t=t+1,s<o?e(r[s],l):n([])}l([])}function St(r){var e=[];return Object.keys(r).forEach(function(n){e.push.apply(e,r[n]||[])}),e}var gn=function(r){bt(e,r);function e(n,t){var o;return o=r.call(this,"Async Validation Error")||this,o.errors=n,o.fields=t,o}return e}(Ue(Error));function At(r,e,n,t,o){if(e.first){var l=new Promise(function(h,A){var R=function(p){return t(p),p.length?A(new gn(p,Ke(p))):h(o)},m=St(r);vn(m,n,R)});return l.catch(function(h){return h}),l}var a=e.firstFields===!0?Object.keys(r):e.firstFields||[],s=Object.keys(r),d=s.length,f=0,c=[],v=new Promise(function(h,A){var R=function(F){if(c.push.apply(c,F),f++,f===d)return t(c),c.length?A(new gn(c,Ke(c))):h(o)};s.length||(t(c),h(o)),s.forEach(function(m){var F=r[m];a.indexOf(m)!==-1?vn(F,n,R):Ct(F,n,R)})});return v.catch(function(h){return h}),v}function _t(r){return!!(r&&r.message!==void 0)}function kt(r,e){for(var n=r,t=0;t<e.length;t++){if(n==null)return n;n=n[e[t]]}return n}function pn(r,e){return function(n){var t;return r.fullFields?t=kt(e,r.fullFields):t=e[n.field||r.fullField],_t(n)?(n.field=n.field||r.fullField,n.fieldValue=t,n):{message:typeof n=="function"?n():n,fieldValue:t,field:n.field||r.fullField}}}function mn(r,e){if(e){for(var n in e)if(e.hasOwnProperty(n)){var t=e[n];typeof t=="object"&&typeof r[n]=="object"?r[n]=se({},r[n],t):r[n]=t}}return r}var Pn=function(e,n,t,o,l,a){e.required&&(!t.hasOwnProperty(e.field)||V(n,a||e.type))&&o.push(Z(l.messages.required,e.fullField))},Pt=function(e,n,t,o,l){(/^\s+$/.test(n)||n==="")&&o.push(Z(l.messages.whitespace,e.fullField))},Oe,zt=function(){if(Oe)return Oe;var r="[a-fA-F\\d:]",e=function(C){return C&&C.includeBoundaries?"(?:(?<=\\s|^)(?="+r+")|(?<="+r+")(?=\\s|$))":""},n="(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",t="[a-fA-F\\d]{1,4}",o=(`
(?:
(?:`+t+":){7}(?:"+t+`|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:`+t+":){6}(?:"+n+"|:"+t+`|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:`+t+":){5}(?::"+n+"|(?::"+t+`){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:`+t+":){4}(?:(?::"+t+"){0,1}:"+n+"|(?::"+t+`){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:`+t+":){3}(?:(?::"+t+"){0,2}:"+n+"|(?::"+t+`){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:`+t+":){2}(?:(?::"+t+"){0,3}:"+n+"|(?::"+t+`){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:`+t+":){1}(?:(?::"+t+"){0,4}:"+n+"|(?::"+t+`){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::`+t+"){0,5}:"+n+"|(?::"+t+`){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm,"").replace(/\n/g,"").trim(),l=new RegExp("(?:^"+n+"$)|(?:^"+o+"$)"),a=new RegExp("^"+n+"$"),s=new RegExp("^"+o+"$"),d=function(C){return C&&C.exact?l:new RegExp("(?:"+e(C)+n+e(C)+")|(?:"+e(C)+o+e(C)+")","g")};d.v4=function(y){return y&&y.exact?a:new RegExp(""+e(y)+n+e(y),"g")},d.v6=function(y){return y&&y.exact?s:new RegExp(""+e(y)+o+e(y),"g")};var f="(?:(?:[a-z]+:)?//)",c="(?:\\S+(?::\\S*)?@)?",v=d.v4().source,h=d.v6().source,A="(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)",R="(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",m="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",F="(?::\\d{2,5})?",p='(?:[/?#][^\\s"]*)?',M="(?:"+f+"|www\\.)"+c+"(?:localhost|"+v+"|"+h+"|"+A+R+m+")"+F+p;return Oe=new RegExp("(?:^"+M+"$)","i"),Oe},bn={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,hex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i},Re={integer:function(e){return Re.number(e)&&parseInt(e,10)===e},float:function(e){return Re.number(e)&&!Re.integer(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch(n){return!1}},date:function(e){return typeof e.getTime=="function"&&typeof e.getMonth=="function"&&typeof e.getYear=="function"&&!isNaN(e.getTime())},number:function(e){return isNaN(e)?!1:typeof e=="number"},object:function(e){return typeof e=="object"&&!Re.array(e)},method:function(e){return typeof e=="function"},email:function(e){return typeof e=="string"&&e.length<=320&&!!e.match(bn.email)},url:function(e){return typeof e=="string"&&e.length<=2048&&!!e.match(zt())},hex:function(e){return typeof e=="string"&&!!e.match(bn.hex)}},Et=function(e,n,t,o,l){if(e.required&&n===void 0){Pn(e,n,t,o,l);return}var a=["integer","float","array","regexp","object","method","email","number","date","url","hex"],s=e.type;a.indexOf(s)>-1?Re[s](n)||o.push(Z(l.messages.types[s],e.fullField,e.type)):s&&typeof n!==e.type&&o.push(Z(l.messages.types[s],e.fullField,e.type))},$t=function(e,n,t,o,l){var a=typeof e.len=="number",s=typeof e.min=="number",d=typeof e.max=="number",f=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,c=n,v=null,h=typeof n=="number",A=typeof n=="string",R=Array.isArray(n);if(h?v="number":A?v="string":R&&(v="array"),!v)return!1;R&&(c=n.length),A&&(c=n.replace(f,"_").length),a?c!==e.len&&o.push(Z(l.messages[v].len,e.fullField,e.len)):s&&!d&&c<e.min?o.push(Z(l.messages[v].min,e.fullField,e.min)):d&&!s&&c>e.max?o.push(Z(l.messages[v].max,e.fullField,e.max)):s&&d&&(c<e.min||c>e.max)&&o.push(Z(l.messages[v].range,e.fullField,e.min,e.max))},fe="enum",Ot=function(e,n,t,o,l){e[fe]=Array.isArray(e[fe])?e[fe]:[],e[fe].indexOf(n)===-1&&o.push(Z(l.messages[fe],e.fullField,e[fe].join(", ")))},qt=function(e,n,t,o,l){if(e.pattern){if(e.pattern instanceof RegExp)e.pattern.lastIndex=0,e.pattern.test(n)||o.push(Z(l.messages.pattern.mismatch,e.fullField,n,e.pattern));else if(typeof e.pattern=="string"){var a=new RegExp(e.pattern);a.test(n)||o.push(Z(l.messages.pattern.mismatch,e.fullField,n,e.pattern))}}},w={required:Pn,whitespace:Pt,type:Et,range:$t,enum:Ot,pattern:qt},It=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n,"string")&&!e.required)return t();w.required(e,n,o,a,l,"string"),V(n,"string")||(w.type(e,n,o,a,l),w.range(e,n,o,a,l),w.pattern(e,n,o,a,l),e.whitespace===!0&&w.whitespace(e,n,o,a,l))}t(a)},Mt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&w.type(e,n,o,a,l)}t(a)},Tt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(n===""&&(n=void 0),V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&(w.type(e,n,o,a,l),w.range(e,n,o,a,l))}t(a)},Vt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&w.type(e,n,o,a,l)}t(a)},Bt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),V(n)||w.type(e,n,o,a,l)}t(a)},jt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&(w.type(e,n,o,a,l),w.range(e,n,o,a,l))}t(a)},Wt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&(w.type(e,n,o,a,l),w.range(e,n,o,a,l))}t(a)},Dt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(n==null&&!e.required)return t();w.required(e,n,o,a,l,"array"),n!=null&&(w.type(e,n,o,a,l),w.range(e,n,o,a,l))}t(a)},Lt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&w.type(e,n,o,a,l)}t(a)},Nt="enum",Ht=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l),n!==void 0&&w[Nt](e,n,o,a,l)}t(a)},Ut=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n,"string")&&!e.required)return t();w.required(e,n,o,a,l),V(n,"string")||w.pattern(e,n,o,a,l)}t(a)},Kt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n,"date")&&!e.required)return t();if(w.required(e,n,o,a,l),!V(n,"date")){var d;n instanceof Date?d=n:d=new Date(n),w.type(e,d,o,a,l),d&&w.range(e,d.getTime(),o,a,l)}}t(a)},Yt=function(e,n,t,o,l){var a=[],s=Array.isArray(n)?"array":typeof n;w.required(e,n,o,a,l,s),t(a)},Ne=function(e,n,t,o,l){var a=e.type,s=[],d=e.required||!e.required&&o.hasOwnProperty(e.field);if(d){if(V(n,a)&&!e.required)return t();w.required(e,n,o,s,l,a),V(n,a)||w.type(e,n,o,s,l)}t(s)},Xt=function(e,n,t,o,l){var a=[],s=e.required||!e.required&&o.hasOwnProperty(e.field);if(s){if(V(n)&&!e.required)return t();w.required(e,n,o,a,l)}t(a)},Fe={string:It,method:Mt,number:Tt,boolean:Vt,regexp:Bt,integer:jt,float:Wt,array:Dt,object:Lt,enum:Ht,pattern:Ut,date:Kt,url:Ne,hex:Ne,email:Ne,required:Yt,any:Xt};function Ye(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){var e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}var Xe=Ye(),_e=function(){function r(n){this.rules=null,this._messages=Xe,this.define(n)}var e=r.prototype;return e.define=function(t){var o=this;if(!t)throw new Error("Cannot configure a schema with no rules");if(typeof t!="object"||Array.isArray(t))throw new Error("Rules must be an object");this.rules={},Object.keys(t).forEach(function(l){var a=t[l];o.rules[l]=Array.isArray(a)?a:[a]})},e.messages=function(t){return t&&(this._messages=mn(Ye(),t)),this._messages},e.validate=function(t,o,l){var a=this;o===void 0&&(o={}),l===void 0&&(l=function(){});var s=t,d=o,f=l;if(typeof d=="function"&&(f=d,d={}),!this.rules||Object.keys(this.rules).length===0)return f&&f(null,s),Promise.resolve(s);function c(m){var F=[],p={};function M(C){if(Array.isArray(C)){var $;F=($=F).concat.apply($,C)}else F.push(C)}for(var y=0;y<m.length;y++)M(m[y]);F.length?(p=Ke(F),f(F,p)):f(null,s)}if(d.messages){var v=this.messages();v===Xe&&(v=Ye()),mn(v,d.messages),d.messages=v}else d.messages=this.messages();var h={},A=d.keys||Object.keys(this.rules);A.forEach(function(m){var F=a.rules[m],p=s[m];F.forEach(function(M){var y=M;typeof y.transform=="function"&&(s===t&&(s=se({},s)),p=s[m]=y.transform(p)),typeof y=="function"?y={validator:y}:y=se({},y),y.validator=a.getValidationMethod(y),y.validator&&(y.field=m,y.fullField=y.fullField||m,y.type=a.getType(y),h[m]=h[m]||[],h[m].push({rule:y,value:p,source:s,field:m}))})});var R={};return At(h,d,function(m,F){var p=m.rule,M=(p.type==="object"||p.type==="array")&&(typeof p.fields=="object"||typeof p.defaultField=="object");M=M&&(p.required||!p.required&&m.value),p.field=m.field;function y(E,H){return se({},H,{fullField:p.fullField+"."+E,fullFields:p.fullFields?[].concat(p.fullFields,[E]):[E]})}function C(E){E===void 0&&(E=[]);var H=Array.isArray(E)?E:[E];!d.suppressWarning&&H.length&&r.warning("async-validator:",H),H.length&&p.message!==void 0&&(H=[].concat(p.message));var T=H.map(pn(p,s));if(d.first&&T.length)return R[p.field]=1,F(T);if(!M)F(T);else{if(p.required&&!m.value)return p.message!==void 0?T=[].concat(p.message).map(pn(p,s)):d.error&&(T=[d.error(p,Z(d.messages.required,p.field))]),F(T);var D={};p.defaultField&&Object.keys(m.value).map(function(O){D[O]=p.defaultField}),D=se({},D,m.rule.fields);var K={};Object.keys(D).forEach(function(O){var k=D[O],B=Array.isArray(k)?k:[k];K[O]=B.map(y.bind(null,O))});var _=new r(K);_.messages(d.messages),m.rule.options&&(m.rule.options.messages=d.messages,m.rule.options.error=d.error),_.validate(m.value,m.rule.options||d,function(O){var k=[];T&&T.length&&k.push.apply(k,T),O&&O.length&&k.push.apply(k,O),F(k.length?k:null)})}}var $;if(p.asyncValidator)$=p.asyncValidator(p,m.value,C,m.source,d);else if(p.validator){try{$=p.validator(p,m.value,C,m.source,d)}catch(E){console.error==null||console.error(E),d.suppressValidatorError||setTimeout(function(){throw E},0),C(E.message)}$===!0?C():$===!1?C(typeof p.message=="function"?p.message(p.fullField||p.field):p.message||(p.fullField||p.field)+" fails"):$ instanceof Array?C($):$ instanceof Error&&C($.message)}$&&$.then&&$.then(function(){return C()},function(E){return C(E)})},function(m){c(m)},s)},e.getType=function(t){if(t.type===void 0&&t.pattern instanceof RegExp&&(t.type="pattern"),typeof t.validator!="function"&&t.type&&!Fe.hasOwnProperty(t.type))throw new Error(Z("Unknown rule type %s",t.type));return t.type||"string"},e.getValidationMethod=function(t){if(typeof t.validator=="function")return t.validator;var o=Object.keys(t),l=o.indexOf("message");return l!==-1&&o.splice(l,1),o.length===1&&o[0]==="required"?Fe.required:Fe[this.getType(t)]||void 0},r}();_e.register=function(e,n){if(typeof n!="function")throw new Error("Cannot register a validator by type, validator is not a function");Fe[e]=n};_e.warning=Rt;_e.messages=Xe;_e.validators=Fe;function Zt(r){const e=he(Ae,null);return{mergedSize:z(()=>r.size!==void 0?r.size:(e==null?void 0:e.props.size)!==void 0?e.props.size:"medium")}}function Jt(r){const e=he(Ae,null),n=z(()=>{if(t.value==="top")return;const{labelWidth:h}=r;if(h!==void 0&&h!=="auto")return Le(h);if(h==="auto"||(e==null?void 0:e.props.labelWidth)==="auto"){const A=e==null?void 0:e.maxChildLabelWidthRef.value;return A!==void 0?Le(A):void 0}if((e==null?void 0:e.props.labelWidth)!==void 0)return Le(e.props.labelWidth)}),t=z(()=>{const{labelPlacement:h}=r;return h!==void 0?h:e!=null&&e.props.labelPlacement?e.props.labelPlacement:"top"}),o=z(()=>{const{labelAlign:h}=r;if(h)return h;if(e!=null&&e.props.labelAlign)return e.props.labelAlign}),l=z(()=>{var h;return[(h=r.labelProps)===null||h===void 0?void 0:h.style,r.labelStyle,{width:n.value}]}),a=z(()=>{const{showRequireMark:h}=r;return h!==void 0?h:e==null?void 0:e.props.showRequireMark}),s=z(()=>{const{requireMarkPlacement:h}=r;return h!==void 0?h:(e==null?void 0:e.props.requireMarkPlacement)||"right"}),d=q(!1),f=z(()=>{const{validationStatus:h}=r;if(h!==void 0)return h;if(d.value)return"error"}),c=z(()=>{const{showFeedback:h}=r;return h!==void 0?h:(e==null?void 0:e.props.showFeedback)!==void 0?e.props.showFeedback:!0}),v=z(()=>{const{showLabel:h}=r;return h!==void 0?h:(e==null?void 0:e.props.showLabel)!==void 0?e.props.showLabel:!0});return{validationErrored:d,mergedLabelStyle:l,mergedLabelPlacement:t,mergedLabelAlign:o,mergedShowRequireMark:a,mergedRequireMarkPlacement:s,mergedValidationStatus:f,mergedShowFeedback:c,mergedShowLabel:v}}function Gt(r){const e=he(Ae,null),n=z(()=>{const{rulePath:a}=r;if(a!==void 0)return a;const{path:s}=r;if(s!==void 0)return s}),t=z(()=>{const a=[],{rule:s}=r;if(s!==void 0&&(Array.isArray(s)?a.push(...s):a.push(s)),e){const{rules:d}=e.props,{value:f}=n;if(d!==void 0&&f!==void 0){const c=An(d,f);c!==void 0&&(Array.isArray(c)?a.push(...c):a.push(c))}}return a}),o=z(()=>t.value.some(a=>a.required)),l=z(()=>o.value||r.required);return{mergedRules:t,mergedRequired:l}}const{cubicBezierEaseInOut:yn}=it;function Qt({name:r="fade-down",fromOffset:e="-4px",enterDuration:n=".3s",leaveDuration:t=".3s",enterCubicBezier:o=yn,leaveCubicBezier:l=yn}={}){return[L(`&.${r}-transition-enter-from, &.${r}-transition-leave-to`,{opacity:0,transform:`translateY(${e})`}),L(`&.${r}-transition-enter-to, &.${r}-transition-leave-from`,{opacity:1,transform:"translateY(0)"}),L(`&.${r}-transition-leave-active`,{transition:`opacity ${t} ${l}, transform ${t} ${l}`}),L(`&.${r}-transition-enter-active`,{transition:`opacity ${n} ${o}, transform ${n} ${o}`})]}var ei=S("form-item",{display:"grid",lineHeight:"var(--n-line-height)"},[S("form-item-label",`
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 `,[x("asterisk",`
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `),x("asterisk-placeholder",`
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]),S("form-item-blank",{gridArea:"blank",minHeight:"var(--n-blank-height)"}),N("left-labelled",`
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 `,[S("form-item-label",`
 height: var(--n-blank-height);
 line-height: var(--n-blank-height);
 box-sizing: border-box;
 white-space: nowrap;
 flex-shrink: 0;
 flex-grow: 0;
 `)]),N("top-labelled",`
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: var(--n-label-height) 1fr;
 grid-template-columns: minmax(0, 100%);
 `,[N("no-label",`
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `),S("form-item-label",{display:"flex",alignItems:"flex-end",justifyContent:"var(--n-label-text-align)"})]),S("form-item-blank",`
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `),S("form-item-feedback-wrapper",`
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `,[L("&:not(:empty)",`
 padding: var(--n-feedback-padding);
 `),S("form-item-feedback",{transition:"color .3s var(--n-bezier)",color:"var(--n-feedback-text-color)"},[N("warning",{color:"var(--n-feedback-text-color-warning)"}),N("error",{color:"var(--n-feedback-text-color-error)"}),Qt({fromOffset:"-3px",enterDuration:".3s",leaveDuration:".2s"})])])]),xn=globalThis&&globalThis.__awaiter||function(r,e,n,t){function o(l){return l instanceof n?l:new n(function(a){a(l)})}return new(n||(n=Promise))(function(l,a){function s(c){try{f(t.next(c))}catch(v){a(v)}}function d(c){try{f(t.throw(c))}catch(v){a(v)}}function f(c){c.done?l(c.value):o(c.value).then(s,d)}f((t=t.apply(r,e||[])).next())})};const ni=Object.assign(Object.assign({},ge.props),{label:String,labelWidth:[Number,String],labelStyle:[String,Object],labelAlign:String,labelPlacement:String,path:String,first:Boolean,rulePath:String,required:Boolean,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:void 0},rule:[Object,Array],size:String,ignorePathChange:Boolean,validationStatus:String,feedback:String,showLabel:{type:Boolean,default:void 0},labelProps:Object});function wn(r,e){return(...n)=>{try{const t=r(...n);return!e&&(typeof t=="boolean"||t instanceof Error||Array.isArray(t))||(t==null?void 0:t.then)?t:(t===void 0||fn("form-item/validate",`You return a ${typeof t} typed value in the validator method, which is not recommended. Please use `+(e?"`Promise`":"`boolean`, `Error` or `Promise`")+" typed value instead."),!0)}catch(t){fn("form-item/validate","An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."),console.error(t);return}}}var ai=ve({name:"FormItem",props:ni,setup(r){lt(kn,"formItems",xe(r,"path"));const{mergedClsPrefixRef:e,inlineThemeDisabled:n}=Je(r),t=he(Ae,null),o=Zt(r),l=Jt(r),{validationErrored:a}=l,{mergedRequired:s,mergedRules:d}=Gt(r),{mergedSize:f}=o,{mergedLabelPlacement:c,mergedLabelAlign:v}=l,h=q([]),A=q(cn()),R=t?xe(t.props,"disabled"):q(!1),m=ge("Form","-form-item",ei,Sn,r,e);Ce(xe(r,"path"),()=>{r.ignorePathChange||F()});function F(){h.value=[],a.value=!1,r.feedback&&(A.value=cn())}function p(){E("blur")}function M(){E("change")}function y(){E("focus")}function C(){E("input")}function $(_,O){return xn(this,void 0,void 0,function*(){let k,B,Q,te;return typeof _=="string"?(k=_,B=O):_!==null&&typeof _=="object"&&(k=_.trigger,B=_.callback,Q=_.shouldRuleBeApplied,te=_.options),yield new Promise((ne,J)=>{E(k,Q,te).then(({valid:ie,errors:re})=>{ie?(B&&B(),ne()):(B&&B(re),J(re))})})})}const E=(_=null,O=()=>!0,k={suppressWarning:!0})=>xn(this,void 0,void 0,function*(){const{path:B}=r;k?k.first||(k.first=r.first):k={};const{value:Q}=d,te=t?An(t.props.model,B||""):void 0,ne={},J={},ie=(_?Q.filter(G=>Array.isArray(G.trigger)?G.trigger.includes(_):G.trigger===_):Q).filter(O).map((G,Y)=>{const P=Object.assign({},G);if(P.validator&&(P.validator=wn(P.validator,!1)),P.asyncValidator&&(P.asyncValidator=wn(P.asyncValidator,!0)),P.renderMessage){const U=`__renderMessage__${Y}`;J[U]=P.message,P.message=U,ne[U]=P.renderMessage}return P});if(!ie.length)return{valid:!0};const re=B!=null?B:"__n_no_path__",de=new _e({[re]:ie}),{validateMessages:ue}=(t==null?void 0:t.props)||{};return ue&&de.messages(ue),yield new Promise(G=>{de.validate({[re]:te},k,Y=>{Y!=null&&Y.length?(h.value=Y.map(P=>{const U=(P==null?void 0:P.message)||"";return{key:U,render:()=>U.startsWith("__renderMessage__")?ne[U]():U}}),Y.forEach(P=>{var U;!((U=P.message)===null||U===void 0)&&U.startsWith("__renderMessage__")&&(P.message=J[P.message])}),a.value=!0,G({valid:!1,errors:Y})):(F(),G({valid:!0}))})})});Ie(at,{path:xe(r,"path"),disabled:R,mergedSize:o.mergedSize,mergedValidationStatus:l.mergedValidationStatus,restoreValidation:F,handleContentBlur:p,handleContentChange:M,handleContentFocus:y,handleContentInput:C});const H={validate:$,restoreValidation:F,internalValidate:E},T=q(null);Fn(()=>{T.value!==null&&(t==null||t.deriveMaxChildLabelWidth(Number(getComputedStyle(T.value).width.slice(0,-2))))});const D=z(()=>{var _;const{value:O}=f,{value:k}=c,B=k==="top"?"vertical":"horizontal",{common:{cubicBezierEaseInOut:Q},self:{labelTextColor:te,asteriskColor:ne,lineHeight:J,feedbackTextColor:ie,feedbackTextColorWarning:re,feedbackTextColorError:de,feedbackPadding:ue,[ee("labelHeight",O)]:G,[ee("blankHeight",O)]:Y,[ee("feedbackFontSize",O)]:P,[ee("feedbackHeight",O)]:U,[ee("labelPadding",B)]:Me,[ee("labelTextAlign",B)]:Te,[ee(ee("labelFontSize",k),O)]:Ve}}=m.value;let pe=(_=v.value)!==null&&_!==void 0?_:Te;return k==="top"&&(pe=pe==="right"?"flex-end":"flex-start"),{"--n-bezier":Q,"--n-line-height":J,"--n-blank-height":Y,"--n-label-font-size":Ve,"--n-label-text-align":pe,"--n-label-height":G,"--n-label-padding":Me,"--n-asterisk-color":ne,"--n-label-text-color":te,"--n-feedback-padding":ue,"--n-feedback-font-size":P,"--n-feedback-height":U,"--n-feedback-text-color":ie,"--n-feedback-text-color-warning":re,"--n-feedback-text-color-error":de}}),K=Cn("form-item",z(()=>{var _;return`${f.value[0]}${c.value[0]}${((_=v.value)===null||_===void 0?void 0:_[0])||""}`}),D,r);return Object.assign(Object.assign(Object.assign(Object.assign({labelElementRef:T,mergedClsPrefix:e,mergedRequired:s,feedbackId:A,renderExplains:h},l),o),H),{cssVars:n?void 0:D,themeClass:K==null?void 0:K.themeClass,onRender:K==null?void 0:K.onRender})},render(){var r;const{$slots:e,mergedClsPrefix:n,mergedShowLabel:t,mergedShowRequireMark:o,mergedRequireMarkPlacement:l,onRender:a}=this,s=o!==void 0?o:this.mergedRequired;return a==null||a(),g("div",{class:[`${n}-form-item`,this.themeClass,`${n}-form-item--${this.mergedSize}-size`,`${n}-form-item--${this.mergedLabelPlacement}-labelled`,!t&&`${n}-form-item--no-label`],style:this.cssVars},t&&(this.label||e.label)?g("label",Object.assign({},this.labelProps,{class:[(r=this.labelProps)===null||r===void 0?void 0:r.class,`${n}-form-item-label`],style:this.mergedLabelStyle,ref:"labelElementRef"}),l!=="left"?e.label?e.label():this.label:null,s?g("span",{class:`${n}-form-item-label__asterisk`},l!=="left"?"\xA0*":"*\xA0"):l==="right-hanging"&&g("span",{class:`${n}-form-item-label__asterisk-placeholder`},"\xA0*"),l==="left"?e.label?e.label():this.label:null):null,g("div",{class:[`${n}-form-item-blank`,this.mergedValidationStatus&&`${n}-form-item-blank--${this.mergedValidationStatus}`]},e),this.mergedShowFeedback?g("div",{key:this.feedbackId,class:`${n}-form-item-feedback-wrapper`},g(ot,{name:"fade-down-transition",mode:"out-in"},{default:()=>{const{mergedValidationStatus:d}=this;return we(e.feedback,f=>{var c;const{feedback:v}=this,h=f||v?g("div",{key:"__feedback__",class:`${n}-form-item-feedback__line`},f||v):this.renderExplains.length?(c=this.renderExplains)===null||c===void 0?void 0:c.map(({key:A,render:R})=>g("div",{key:A,class:`${n}-form-item-feedback__line`},R())):null;return h?d==="warning"?g("div",{key:"controlled-warning",class:`${n}-form-item-feedback ${n}-form-item-feedback--warning`},h):d==="error"?g("div",{key:"controlled-error",class:`${n}-form-item-feedback ${n}-form-item-feedback--error`},h):d==="success"?g("div",{key:"controlled-success",class:`${n}-form-item-feedback ${n}-form-item-feedback--success`},h):g("div",{key:"controlled-default",class:`${n}-form-item-feedback`},h):null})}})):null)}});export{ti as N,ai as a,ii as b};
