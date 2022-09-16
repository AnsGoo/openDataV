import{an as he,bU as wt,T as ke,bV as Nn,d as ve,a3 as v,am as Ze,r as O,i as $,bW as Hn,a8 as S,aa as w,a9 as N,av as V,a_ as ye,ab as Je,ay as ge,bX as Un,bY as Kn,ac as Yn,ax as Xn,aB as xe,aC as Zn,aw as Jn,aW as nt,a as Rt,ao as rt,aA as Ie,aS as Gn,aD as ee,bZ as Qn,aE as Ft,b0 as we,bb as De,bd as er,F as tr,bk as nr,aP as it,ak as at,b_ as ot,b$ as rr,aY as lt,aN as X,al as st,c0 as kt,c1 as dt,c2 as Le,c3 as Ct,c4 as ir,aV as ut,c5 as ar,aL as or,at as ct}from"./index.2b95adb8.js";function lr(n,e,t){var r;const a=he(n,null);if(a===null)return;const l=(r=wt())===null||r===void 0?void 0:r.proxy;ke(t,o),o(t.value),Nn(()=>{o(void 0,t.value)});function o(f,c){const h=a[e];c!==void 0&&s(h,c),f!==void 0&&d(h,f)}function s(f,c){f[c]||(f[c]=[]),f[c].splice(f[c].findIndex(h=>h===l),1)}function d(f,c){f[c]||(f[c]=[]),~f[c].findIndex(h=>h===l)||f[c].push(l)}}const sr=ve({name:"Eye",render(){return v("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},v("path",{d:"M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 0 0-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 0 0 0-17.47C428.89 172.28 347.8 112 255.66 112z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"}),v("circle",{cx:"256",cy:"256",r:"80",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"}))}}),dr=ve({name:"EyeOff",render(){return v("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},v("path",{d:"M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z",fill:"currentColor"}),v("path",{d:"M255.66 384c-41.49 0-81.5-12.28-118.92-36.5c-34.07-22-64.74-53.51-88.7-91v-.08c19.94-28.57 41.78-52.73 65.24-72.21a2 2 0 0 0 .14-2.94L93.5 161.38a2 2 0 0 0-2.71-.12c-24.92 21-48.05 46.76-69.08 76.92a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416a239.13 239.13 0 0 0 75.8-12.58a2 2 0 0 0 .77-3.31l-21.58-21.58a4 4 0 0 0-3.83-1a204.8 204.8 0 0 1-51.16 6.47z",fill:"currentColor"}),v("path",{d:"M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96a227.34 227.34 0 0 0-74.89 12.83a2 2 0 0 0-.75 3.31l21.55 21.55a4 4 0 0 0 3.88 1a192.82 192.82 0 0 1 50.21-6.69c40.69 0 80.58 12.43 118.55 37c34.71 22.4 65.74 53.88 89.76 91a.13.13 0 0 1 0 .16a310.72 310.72 0 0 1-64.12 72.73a2 2 0 0 0-.15 2.95l19.9 19.89a2 2 0 0 0 2.7.13a343.49 343.49 0 0 0 68.64-78.48a32.2 32.2 0 0 0-.1-34.78z",fill:"currentColor"}),v("path",{d:"M256 160a95.88 95.88 0 0 0-21.37 2.4a2 2 0 0 0-1 3.38l112.59 112.56a2 2 0 0 0 3.38-1A96 96 0 0 0 256 160z",fill:"currentColor"}),v("path",{d:"M165.78 233.66a2 2 0 0 0-3.38 1a96 96 0 0 0 115 115a2 2 0 0 0 1-3.38z",fill:"currentColor"}))}}),St=Ze("n-input");function ur(n){let e=0;for(const t of n)e++;return e}function Ee(n){return n===""||n==null}function cr(n){const e=O(null);function t(){const{value:l}=n;if(!(l!=null&&l.focus)){a();return}const{selectionStart:o,selectionEnd:s,value:d}=l;if(o==null||s==null){a();return}e.value={start:o,end:s,beforeText:d.slice(0,o),afterText:d.slice(s)}}function r(){var l;const{value:o}=e,{value:s}=n;if(!o||!s)return;const{value:d}=s,{start:f,beforeText:c,afterText:h}=o;let b=d.length;if(d.endsWith(h))b=d.length-h.length;else if(d.startsWith(c))b=c.length;else{const g=c[f-1],R=d.indexOf(g,f-1);R!==-1&&(b=R+1)}(l=s.setSelectionRange)===null||l===void 0||l.call(s,b,b)}function a(){e.value=null}return ke(n,a),{recordCursor:t,restoreCursor:r}}const ft=ve({name:"InputWordCount",setup(n,{slots:e}){const{mergedValueRef:t,maxlengthRef:r,mergedClsPrefixRef:a}=he(St),l=$(()=>{const{value:o}=t;return o===null||Array.isArray(o)?0:ur(o)});return()=>{const{value:o}=r,{value:s}=t;return v("span",{class:`${a.value}-input-word-count`},Hn(e.default,{value:s===null||Array.isArray(s)?"":s},()=>[o===void 0?l.value:`${l.value} / ${o}`]))}}}),fr=S("input",`
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
`,[w("input, textarea",`
 overflow: hidden;
 flex-grow: 1;
 position: relative;
 `),w("input-el, textarea-el, input-mirror, textarea-mirror, separator, placeholder",`
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
 `),w("input-el, textarea-el",`
 -webkit-appearance: none;
 scrollbar-width: none;
 width: 100%;
 min-width: 0;
 text-decoration-color: var(--n-text-decoration-color);
 color: var(--n-text-color);
 caret-color: var(--n-caret-color);
 background-color: transparent;
 `,[N("&::-webkit-scrollbar, &::-webkit-scrollbar-track-piece, &::-webkit-scrollbar-thumb",`
 width: 0;
 height: 0;
 display: none;
 `),N("&::placeholder",`
 color: #0000;
 -webkit-text-fill-color: transparent !important;
 `),N("&:-webkit-autofill ~",[w("placeholder","display: none;")])]),V("round",[ye("textarea","border-radius: calc(var(--n-height) / 2);")]),w("placeholder",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 overflow: hidden;
 color: var(--n-placeholder-color);
 `,[N("span",`
 width: 100%;
 display: inline-block;
 `)]),V("textarea",[w("placeholder","overflow: visible;")]),ye("autosize","width: 100%;"),V("autosize",[w("textarea-el, input-el",`
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
 `),w("input-mirror",`
 padding: 0;
 height: var(--n-height);
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: nowrap;
 pointer-events: none;
 `),w("input-el",`
 padding: 0;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[N("+",[w("placeholder",`
 display: flex;
 align-items: center; 
 `)])]),ye("textarea",[w("placeholder","white-space: nowrap;")]),w("eye",`
 transition: color .3s var(--n-bezier);
 `),V("textarea","width: 100%;",[S("input-word-count",`
 position: absolute;
 right: var(--n-padding-right);
 bottom: var(--n-padding-vertical);
 `),V("resizable",[S("input-wrapper",`
 resize: vertical;
 min-height: var(--n-height);
 `)]),w("textarea-el, textarea-mirror, placeholder",`
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
 `),w("textarea-mirror",`
 width: 100%;
 pointer-events: none;
 overflow: hidden;
 visibility: hidden;
 position: static;
 white-space: pre-wrap;
 overflow-wrap: break-word;
 `)]),V("pair",[w("input-el, placeholder","text-align: center;"),w("separator",`
 display: flex;
 align-items: center;
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 white-space: nowrap;
 `,[S("icon",`
 color: var(--n-icon-color);
 `),S("base-icon",`
 color: var(--n-icon-color);
 `)])]),V("disabled",`
 cursor: not-allowed;
 background-color: var(--n-color-disabled);
 `,[w("border","border: var(--n-border-disabled);"),w("input-el, textarea-el",`
 cursor: not-allowed;
 color: var(--n-text-color-disabled);
 text-decoration-color: var(--n-text-color-disabled);
 `),w("placeholder","color: var(--n-placeholder-color-disabled);"),w("separator","color: var(--n-text-color-disabled);",[S("icon",`
 color: var(--n-icon-color-disabled);
 `),S("base-icon",`
 color: var(--n-icon-color-disabled);
 `)]),S("input-word-count",`
 color: var(--n-count-text-color-disabled);
 `),w("suffix, prefix","color: var(--n-text-color-disabled);",[S("icon",`
 color: var(--n-icon-color-disabled);
 `),S("internal-icon",`
 color: var(--n-icon-color-disabled);
 `)])]),ye("disabled",[w("eye",`
 display: flex;
 align-items: center;
 justify-content: center;
 color: var(--n-icon-color);
 cursor: pointer;
 `,[N("&:hover",`
 color: var(--n-icon-color-hover);
 `),N("&:active",`
 color: var(--n-icon-color-pressed);
 `)]),N("&:hover",[w("state-border","border: var(--n-border-hover);")]),V("focus","background-color: var(--n-color-focus);",[w("state-border",`
 border: var(--n-border-focus);
 box-shadow: var(--n-box-shadow-focus);
 `)])]),w("border, state-border",`
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
 `),w("state-border",`
 border-color: #0000;
 z-index: 1;
 `),w("prefix","margin-right: 4px;"),w("suffix",`
 margin-left: 4px;
 `),w("suffix, prefix",`
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
 `,[w("placeholder",[S("base-icon",`
 transition: color .3s var(--n-bezier);
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 `)])]),N(">",[S("icon",`
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
 `),["warning","error"].map(n=>V(`${n}-status`,[ye("disabled",[S("base-loading",`
 color: var(--n-loading-color-${n})
 `),w("input-el, textarea-el",`
 caret-color: var(--n-caret-color-${n});
 `),w("state-border",`
 border: var(--n-border-${n});
 `),N("&:hover",[w("state-border",`
 border: var(--n-border-hover-${n});
 `)]),N("&:focus",`
 background-color: var(--n-color-focus-${n});
 `,[w("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)]),V("focus",`
 background-color: var(--n-color-focus-${n});
 `,[w("state-border",`
 box-shadow: var(--n-box-shadow-focus-${n});
 border: var(--n-border-focus-${n});
 `)])])]))]),hr=S("input",[V("disabled",[w("input-el, textarea-el",`
 -webkit-text-fill-color: var(--n-text-color-disabled);
 `)])]),vr=Object.assign(Object.assign({},ge.props),{bordered:{type:Boolean,default:void 0},type:{type:String,default:"text"},placeholder:[Array,String],defaultValue:{type:[String,Array],default:null},value:[String,Array],disabled:{type:Boolean,default:void 0},size:String,rows:{type:[Number,String],default:3},round:Boolean,minlength:[String,Number],maxlength:[String,Number],clearable:Boolean,autosize:{type:[Boolean,Object],default:!1},pair:Boolean,separator:String,readonly:{type:[String,Boolean],default:!1},passivelyActivated:Boolean,showPasswordOn:String,stateful:{type:Boolean,default:!0},autofocus:Boolean,inputProps:Object,resizable:{type:Boolean,default:!0},showCount:Boolean,loading:{type:Boolean,default:void 0},allowInput:Function,renderCount:Function,onMousedown:Function,onKeydown:Function,onKeyup:Function,onInput:[Function,Array],onFocus:[Function,Array],onBlur:[Function,Array],onClick:[Function,Array],onChange:[Function,Array],onClear:[Function,Array],status:String,"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],textDecoration:[String,Array],attrSize:{type:Number,default:20},onInputBlur:[Function,Array],onInputFocus:[Function,Array],onDeactivate:[Function,Array],onActivate:[Function,Array],onWrapperFocus:[Function,Array],onWrapperBlur:[Function,Array],internalDeactivateOnEnter:Boolean,internalForceFocus:Boolean,internalLoadingBeforeSuffix:Boolean,showPasswordToggle:Boolean}),ri=ve({name:"Input",props:vr,setup(n){const{mergedClsPrefixRef:e,mergedBorderedRef:t,inlineThemeDisabled:r,mergedRtlRef:a}=Je(n),l=ge("Input","-input",fr,Un,n,e);Kn&&Yn("-input-safari",hr,e);const o=O(null),s=O(null),d=O(null),f=O(null),c=O(null),h=O(null),b=O(null),g=cr(b),R=O(null),{localeRef:m}=Xn("Input"),C=O(n.defaultValue),p=xe(n,"value"),M=Zn(p,C),x=Jn(n),{mergedSizeRef:A,mergedDisabledRef:q,mergedStatusRef:E}=x,H=O(!1),B=O(!1),L=O(!1),K=O(!1);let k=null;const z=$(()=>{const{placeholder:i,pair:u}=n;return u?Array.isArray(i)?i:i===void 0?["",""]:[i,i]:i===void 0?[m.value.placeholder]:[i]}),_=$(()=>{const{value:i}=L,{value:u}=M,{value:y}=z;return!i&&(Ee(u)||Array.isArray(u)&&Ee(u[0]))&&y[0]}),j=$(()=>{const{value:i}=L,{value:u}=M,{value:y}=z;return!i&&y[1]&&(Ee(u)||Array.isArray(u)&&Ee(u[1]))}),Q=nt(()=>n.internalForceFocus||H.value),re=nt(()=>{if(q.value||n.readonly||!n.clearable||!Q.value&&!B.value)return!1;const{value:i}=M,{value:u}=Q;return n.pair?!!(Array.isArray(i)&&(i[0]||i[1]))&&(B.value||u):!!i&&(B.value||u)}),te=$(()=>{const{showPasswordOn:i}=n;if(i)return i;if(n.showPasswordToggle)return"click"}),J=O(!1),ie=$(()=>{const{textDecoration:i}=n;return i?Array.isArray(i)?i.map(u=>({textDecoration:u})):[{textDecoration:i}]:["",""]}),ne=O(void 0),de=()=>{var i,u;if(n.type==="textarea"){const{autosize:y}=n;if(y&&(ne.value=(u=(i=R.value)===null||i===void 0?void 0:i.$el)===null||u===void 0?void 0:u.offsetWidth),!s.value||typeof y=="boolean")return;const{paddingTop:I,paddingBottom:W,lineHeight:D}=window.getComputedStyle(s.value),ae=Number(I.slice(0,-2)),oe=Number(W.slice(0,-2)),le=Number(D.slice(0,-2)),{value:me}=d;if(!me)return;if(y.minRows){const be=Math.max(y.minRows,1),We=`${ae+oe+le*be}px`;me.style.minHeight=We}if(y.maxRows){const be=`${ae+oe+le*y.maxRows}px`;me.style.maxHeight=be}}},ue=$(()=>{const{maxlength:i}=n;return i===void 0?void 0:Number(i)});Rt(()=>{const{value:i}=M;Array.isArray(i)||je(i)});const G=wt().proxy;function Y(i){const{onUpdateValue:u,"onUpdate:value":y,onInput:I}=n,{nTriggerFormInput:W}=x;u&&X(u,i),y&&X(y,i),I&&X(I,i),C.value=i,W()}function P(i){const{onChange:u}=n,{nTriggerFormChange:y}=x;u&&X(u,i),C.value=i,y()}function U(i){const{onBlur:u}=n,{nTriggerFormBlur:y}=x;u&&X(u,i),y()}function Me(i){const{onFocus:u}=n,{nTriggerFormFocus:y}=x;u&&X(u,i),y()}function Ve(i){const{onClear:u}=n;u&&X(u,i)}function Te(i){const{onInputBlur:u}=n;u&&X(u,i)}function pe(i){const{onInputFocus:u}=n;u&&X(u,i)}function Ge(){const{onDeactivate:i}=n;i&&X(i)}function Pt(){const{onActivate:i}=n;i&&X(i)}function $t(i){const{onClick:u}=n;u&&X(u,i)}function zt(i){const{onWrapperFocus:u}=n;u&&X(u,i)}function Et(i){const{onWrapperBlur:u}=n;u&&X(u,i)}function qt(){L.value=!0}function Ot(i){L.value=!1,i.target===h.value?_e(i,1):_e(i,0)}function _e(i,u=0,y="input"){const I=i.target.value;if(je(I),i instanceof InputEvent&&!i.isComposing&&(L.value=!1),n.type==="textarea"){const{value:D}=R;D&&D.syncUnifiedContainer()}if(k=I,L.value)return;g.recordCursor();const W=It(I);if(W)if(!n.pair)y==="input"?Y(I):P(I);else{let{value:D}=M;Array.isArray(D)?D=[D[0],D[1]]:D=["",""],D[u]=I,y==="input"?Y(D):P(D)}G.$forceUpdate(),W||it(g.restoreCursor)}function It(i){const{allowInput:u}=n;return typeof u=="function"?u(i):!0}function Mt(i){Te(i),i.relatedTarget===o.value&&Ge(),i.relatedTarget!==null&&(i.relatedTarget===c.value||i.relatedTarget===h.value||i.relatedTarget===s.value)||(K.value=!1),Pe(i,"blur"),b.value=null}function Vt(i,u){pe(i),H.value=!0,K.value=!0,Pt(),Pe(i,"focus"),u===0?b.value=c.value:u===1?b.value=h.value:u===2&&(b.value=s.value)}function Tt(i){n.passivelyActivated&&(Et(i),Pe(i,"blur"))}function Bt(i){n.passivelyActivated&&(H.value=!0,zt(i),Pe(i,"focus"))}function Pe(i,u){i.relatedTarget!==null&&(i.relatedTarget===c.value||i.relatedTarget===h.value||i.relatedTarget===s.value||i.relatedTarget===o.value)||(u==="focus"?(Me(i),H.value=!0):u==="blur"&&(U(i),H.value=!1))}function jt(i,u){_e(i,u,"change")}function Wt(i){$t(i)}function Dt(i){Ve(i),n.pair?(Y(["",""]),P(["",""])):(Y(""),P(""))}function Lt(i){const{onMousedown:u}=n;u&&u(i);const{tagName:y}=i.target;if(y!=="INPUT"&&y!=="TEXTAREA"){if(n.resizable){const{value:I}=o;if(I){const{left:W,top:D,width:ae,height:oe}=I.getBoundingClientRect(),le=14;if(W+ae-le<i.clientX&&i.clientX<W+ae&&D+oe-le<i.clientY&&i.clientY<D+oe)return}}i.preventDefault(),H.value||Qe()}}function Nt(){var i;B.value=!0,n.type==="textarea"&&((i=R.value)===null||i===void 0||i.handleMouseEnterWrapper())}function Ht(){var i;B.value=!1,n.type==="textarea"&&((i=R.value)===null||i===void 0||i.handleMouseLeaveWrapper())}function Ut(){q.value||te.value==="click"&&(J.value=!J.value)}function Kt(i){if(q.value)return;i.preventDefault();const u=I=>{I.preventDefault(),st("mouseup",document,u)};if(at("mouseup",document,u),te.value!=="mousedown")return;J.value=!0;const y=()=>{J.value=!1,st("mouseup",document,y)};at("mouseup",document,y)}function Yt(i){var u;switch((u=n.onKeydown)===null||u===void 0||u.call(n,i),i.key){case"Escape":Be();break;case"Enter":Xt(i);break}}function Xt(i){var u,y;if(n.passivelyActivated){const{value:I}=K;if(I){n.internalDeactivateOnEnter&&Be();return}i.preventDefault(),n.type==="textarea"?(u=s.value)===null||u===void 0||u.focus():(y=c.value)===null||y===void 0||y.focus()}}function Be(){n.passivelyActivated&&(K.value=!1,it(()=>{var i;(i=o.value)===null||i===void 0||i.focus()}))}function Qe(){var i,u,y;q.value||(n.passivelyActivated?(i=o.value)===null||i===void 0||i.focus():((u=s.value)===null||u===void 0||u.focus(),(y=c.value)===null||y===void 0||y.focus()))}function Zt(){var i;!((i=o.value)===null||i===void 0)&&i.contains(document.activeElement)&&document.activeElement.blur()}function Jt(){var i,u;(i=s.value)===null||i===void 0||i.select(),(u=c.value)===null||u===void 0||u.select()}function Gt(){q.value||(s.value?s.value.focus():c.value&&c.value.focus())}function Qt(){const{value:i}=o;(i==null?void 0:i.contains(document.activeElement))&&i!==document.activeElement&&Be()}function en(i){if(n.type==="textarea"){const{value:u}=s;u==null||u.scrollTo(i)}else{const{value:u}=c;u==null||u.scrollTo(i)}}function je(i){const{type:u,pair:y,autosize:I}=n;if(!y&&I)if(u==="textarea"){const{value:W}=d;W&&(W.textContent=(i!=null?i:"")+`\r
`)}else{const{value:W}=f;W&&(i?W.textContent=i:W.innerHTML="&nbsp;")}}function tn(){de()}const et=O({top:"0"});function nn(i){var u;const{scrollTop:y}=i.target;et.value.top=`${-y}px`,(u=R.value)===null||u===void 0||u.syncUnifiedContainer()}let $e=null;rt(()=>{const{autosize:i,type:u}=n;i&&u==="textarea"?$e=ke(M,y=>{!Array.isArray(y)&&y!==k&&je(y)}):$e==null||$e()});let ze=null;rt(()=>{n.type==="textarea"?ze=ke(M,i=>{var u;!Array.isArray(i)&&i!==k&&((u=R.value)===null||u===void 0||u.syncUnifiedContainer())}):ze==null||ze()}),Ie(St,{mergedValueRef:M,maxlengthRef:ue,mergedClsPrefixRef:e});const rn={wrapperElRef:o,inputElRef:c,textareaElRef:s,isCompositing:L,focus:Qe,blur:Zt,select:Jt,deactivate:Qt,activate:Gt,scrollTo:en},an=Gn("Input",a,e),tt=$(()=>{const{value:i}=A,{common:{cubicBezierEaseInOut:u},self:{color:y,borderRadius:I,textColor:W,caretColor:D,caretColorError:ae,caretColorWarning:oe,textDecorationColor:le,border:me,borderDisabled:be,borderHover:We,borderFocus:on,placeholderColor:ln,placeholderColorDisabled:sn,lineHeightTextarea:dn,colorDisabled:un,colorFocus:cn,textColorDisabled:fn,boxShadowFocus:hn,iconSize:vn,colorFocusWarning:gn,boxShadowFocusWarning:pn,borderWarning:mn,borderFocusWarning:bn,borderHoverWarning:yn,colorFocusError:xn,boxShadowFocusError:wn,borderError:Rn,borderFocusError:Fn,borderHoverError:kn,clearSize:Cn,clearColor:Sn,clearColorHover:An,clearColorPressed:_n,iconColor:Pn,iconColorDisabled:$n,suffixTextColor:zn,countTextColor:En,countTextColorDisabled:qn,iconColorHover:On,iconColorPressed:In,loadingColor:Mn,loadingColorError:Vn,loadingColorWarning:Tn,[ee("padding",i)]:Bn,[ee("fontSize",i)]:jn,[ee("height",i)]:Wn}}=l.value,{left:Dn,right:Ln}=Qn(Bn);return{"--n-bezier":u,"--n-count-text-color":En,"--n-count-text-color-disabled":qn,"--n-color":y,"--n-font-size":jn,"--n-border-radius":I,"--n-height":Wn,"--n-padding-left":Dn,"--n-padding-right":Ln,"--n-text-color":W,"--n-caret-color":D,"--n-text-decoration-color":le,"--n-border":me,"--n-border-disabled":be,"--n-border-hover":We,"--n-border-focus":on,"--n-placeholder-color":ln,"--n-placeholder-color-disabled":sn,"--n-icon-size":vn,"--n-line-height-textarea":dn,"--n-color-disabled":un,"--n-color-focus":cn,"--n-text-color-disabled":fn,"--n-box-shadow-focus":hn,"--n-loading-color":Mn,"--n-caret-color-warning":oe,"--n-color-focus-warning":gn,"--n-box-shadow-focus-warning":pn,"--n-border-warning":mn,"--n-border-focus-warning":bn,"--n-border-hover-warning":yn,"--n-loading-color-warning":Tn,"--n-caret-color-error":ae,"--n-color-focus-error":xn,"--n-box-shadow-focus-error":wn,"--n-border-error":Rn,"--n-border-focus-error":Fn,"--n-border-hover-error":kn,"--n-loading-color-error":Vn,"--n-clear-color":Sn,"--n-clear-size":Cn,"--n-clear-color-hover":An,"--n-clear-color-pressed":_n,"--n-icon-color":Pn,"--n-icon-color-hover":On,"--n-icon-color-pressed":In,"--n-icon-color-disabled":$n,"--n-suffix-text-color":zn}}),ce=r?Ft("input",$(()=>{const{value:i}=A;return i[0]}),tt,n):void 0;return Object.assign(Object.assign({},rn),{wrapperElRef:o,inputElRef:c,inputMirrorElRef:f,inputEl2Ref:h,textareaElRef:s,textareaMirrorElRef:d,textareaScrollbarInstRef:R,rtlEnabled:an,uncontrolledValue:C,mergedValue:M,passwordVisible:J,mergedPlaceholder:z,showPlaceholder1:_,showPlaceholder2:j,mergedFocus:Q,isComposing:L,activated:K,showClearButton:re,mergedSize:A,mergedDisabled:q,textDecorationStyle:ie,mergedClsPrefix:e,mergedBordered:t,mergedShowPasswordOn:te,placeholderStyle:et,mergedStatus:E,textAreaScrollContainerWidth:ne,handleTextAreaScroll:nn,handleCompositionStart:qt,handleCompositionEnd:Ot,handleInput:_e,handleInputBlur:Mt,handleInputFocus:Vt,handleWrapperBlur:Tt,handleWrapperFocus:Bt,handleMouseEnter:Nt,handleMouseLeave:Ht,handleMouseDown:Lt,handleChange:jt,handleClick:Wt,handleClear:Dt,handlePasswordToggleClick:Ut,handlePasswordToggleMousedown:Kt,handleWrapperKeydown:Yt,handleTextAreaMirrorResize:tn,getTextareaScrollContainer:()=>s.value,mergedTheme:l,cssVars:r?void 0:tt,themeClass:ce==null?void 0:ce.themeClass,onRender:ce==null?void 0:ce.onRender})},render(){var n,e;const{mergedClsPrefix:t,mergedStatus:r,themeClass:a,type:l,onRender:o}=this,s=this.$slots;return o==null||o(),v("div",{ref:"wrapperElRef",class:[`${t}-input`,a,r&&`${t}-input--${r}-status`,{[`${t}-input--rtl`]:this.rtlEnabled,[`${t}-input--disabled`]:this.mergedDisabled,[`${t}-input--textarea`]:l==="textarea",[`${t}-input--resizable`]:this.resizable&&!this.autosize,[`${t}-input--autosize`]:this.autosize,[`${t}-input--round`]:this.round&&l!=="textarea",[`${t}-input--pair`]:this.pair,[`${t}-input--focus`]:this.mergedFocus,[`${t}-input--stateful`]:this.stateful}],style:this.cssVars,tabindex:!this.mergedDisabled&&this.passivelyActivated&&!this.activated?0:void 0,onFocus:this.handleWrapperFocus,onBlur:this.handleWrapperBlur,onClick:this.handleClick,onMousedown:this.handleMouseDown,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onCompositionstart:this.handleCompositionStart,onCompositionend:this.handleCompositionEnd,onKeyup:this.onKeyup,onKeydown:this.handleWrapperKeydown},v("div",{class:`${t}-input-wrapper`},we(s.prefix,d=>d&&v("div",{class:`${t}-input__prefix`},d)),l==="textarea"?v(er,{ref:"textareaScrollbarInstRef",class:`${t}-input__textarea`,container:this.getTextareaScrollContainer,triggerDisplayManually:!0,useUnifiedContainer:!0,internalHoistYRail:!0},{default:()=>{var d,f;const{textAreaScrollContainerWidth:c}=this,h={width:this.autosize&&c&&`${c}px`};return v(tr,null,v("textarea",Object.assign({},this.inputProps,{ref:"textareaElRef",class:[`${t}-input__textarea-el`,(d=this.inputProps)===null||d===void 0?void 0:d.class],autofocus:this.autofocus,rows:Number(this.rows),placeholder:this.placeholder,value:this.mergedValue,disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,readonly:this.readonly,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,style:[this.textDecorationStyle[0],(f=this.inputProps)===null||f===void 0?void 0:f.style,h],onBlur:this.handleInputBlur,onFocus:b=>this.handleInputFocus(b,2),onInput:this.handleInput,onChange:this.handleChange,onScroll:this.handleTextAreaScroll})),this.showPlaceholder1?v("div",{class:`${t}-input__placeholder`,style:[this.placeholderStyle,h],key:"placeholder"},this.mergedPlaceholder[0]):null,this.autosize?v(nr,{onResize:this.handleTextAreaMirrorResize},{default:()=>v("div",{ref:"textareaMirrorElRef",class:`${t}-input__textarea-mirror`,key:"mirror"})}):null)}}):v("div",{class:`${t}-input__input`},v("input",Object.assign({type:l==="password"&&this.mergedShowPasswordOn&&this.passwordVisible?"text":l},this.inputProps,{ref:"inputElRef",class:[`${t}-input__input-el`,(n=this.inputProps)===null||n===void 0?void 0:n.class],style:[this.textDecorationStyle[0],(e=this.inputProps)===null||e===void 0?void 0:e.style],tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[0],disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[0]:this.mergedValue,readonly:this.readonly,autofocus:this.autofocus,size:this.attrSize,onBlur:this.handleInputBlur,onFocus:d=>this.handleInputFocus(d,0),onInput:d=>this.handleInput(d,0),onChange:d=>this.handleChange(d,0)})),this.showPlaceholder1?v("div",{class:`${t}-input__placeholder`},v("span",null,this.mergedPlaceholder[0])):null,this.autosize?v("div",{class:`${t}-input__input-mirror`,key:"mirror",ref:"inputMirrorElRef"},"\xA0"):null),!this.pair&&we(s.suffix,d=>d||this.clearable||this.showCount||this.mergedShowPasswordOn||this.loading!==void 0?v("div",{class:`${t}-input__suffix`},[we(s["clear-icon-placeholder"],f=>(this.clearable||f)&&v(ot,{clsPrefix:t,show:this.showClearButton,onClear:this.handleClear},{placeholder:()=>f,icon:()=>{var c,h;return(h=(c=this.$slots)["clear-icon"])===null||h===void 0?void 0:h.call(c)}})),this.internalLoadingBeforeSuffix?null:d,this.loading!==void 0?v(rr,{clsPrefix:t,loading:this.loading,showArrow:!1,showClear:!1,style:this.cssVars}):null,this.internalLoadingBeforeSuffix?d:null,this.showCount&&this.type!=="textarea"?v(ft,null,{default:f=>{var c;return(c=s.count)===null||c===void 0?void 0:c.call(s,f)}}):null,this.mergedShowPasswordOn&&this.type==="password"?v("div",{class:`${t}-input__eye`,onMousedown:this.handlePasswordToggleMousedown,onClick:this.handlePasswordToggleClick},this.passwordVisible?De(s["password-visible-icon"],()=>[v(lt,{clsPrefix:t},{default:()=>v(sr,null)})]):De(s["password-invisible-icon"],()=>[v(lt,{clsPrefix:t},{default:()=>v(dr,null)})])):null]):null)),this.pair?v("span",{class:`${t}-input__separator`},De(s.separator,()=>[this.separator])):null,this.pair?v("div",{class:`${t}-input-wrapper`},v("div",{class:`${t}-input__input`},v("input",{ref:"inputEl2Ref",type:this.type,class:`${t}-input__input-el`,tabindex:this.passivelyActivated&&!this.activated?-1:void 0,placeholder:this.mergedPlaceholder[1],disabled:this.mergedDisabled,maxlength:this.maxlength,minlength:this.minlength,value:Array.isArray(this.mergedValue)?this.mergedValue[1]:void 0,readonly:this.readonly,style:this.textDecorationStyle[1],onBlur:this.handleInputBlur,onFocus:d=>this.handleInputFocus(d,1),onInput:d=>this.handleInput(d,1),onChange:d=>this.handleChange(d,1)}),this.showPlaceholder2?v("div",{class:`${t}-input__placeholder`},v("span",null,this.mergedPlaceholder[1])):null),we(s.suffix,d=>(this.clearable||d)&&v("div",{class:`${t}-input__suffix`},[this.clearable&&v(ot,{clsPrefix:t,show:this.showClearButton,onClear:this.handleClear},{icon:()=>{var f;return(f=s["clear-icon"])===null||f===void 0?void 0:f.call(s)},placeholder:()=>{var f;return(f=s["clear-icon-placeholder"])===null||f===void 0?void 0:f.call(s)}}),d]))):null,this.mergedBordered?v("div",{class:`${t}-input__border`}):null,this.mergedBordered?v("div",{class:`${t}-input__state-border`}):null,this.showCount&&l==="textarea"?v(ft,null,{default:d=>{var f;const{renderCount:c}=this;return c?c(d):(f=s.count)===null||f===void 0?void 0:f.call(s,d)}}):null)}}),gr=S("form",[V("inline",`
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `,[S("form-item",{width:"auto",marginRight:"18px"},[N("&:last-child",{marginRight:0})])])]),Se=Ze("n-form"),At=Ze("n-form-item-insts");var pr=globalThis&&globalThis.__awaiter||function(n,e,t,r){function a(l){return l instanceof t?l:new t(function(o){o(l)})}return new(t||(t=Promise))(function(l,o){function s(c){try{f(r.next(c))}catch(h){o(h)}}function d(c){try{f(r.throw(c))}catch(h){o(h)}}function f(c){c.done?l(c.value):a(c.value).then(s,d)}f((r=r.apply(n,e||[])).next())})};const mr=Object.assign(Object.assign({},ge.props),{inline:Boolean,labelWidth:[Number,String],labelAlign:String,labelPlacement:{type:String,default:"top"},model:{type:Object,default:()=>{}},rules:Object,disabled:Boolean,size:String,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:!0},onSubmit:{type:Function,default:n=>n.preventDefault()},showLabel:{type:Boolean,default:void 0},validateMessages:Object}),ii=ve({name:"Form",props:mr,setup(n){const{mergedClsPrefixRef:e}=Je(n);ge("Form","-form",gr,kt,n,e);const t={},r=O(void 0),a=d=>{const f=r.value;(f===void 0||d>=f)&&(r.value=d)};function l(d,f=()=>!0){return pr(this,void 0,void 0,function*(){return yield new Promise((c,h)=>{const b=[];for(const g of dt(t)){const R=t[g];for(const m of R)m.path&&b.push(m.internalValidate(null,f))}Promise.all(b).then(g=>{if(g.some(R=>!R.valid)){const R=g.filter(m=>m.errors).map(m=>m.errors);d&&d(R),h(R)}else d&&d(),c()})})})}function o(){for(const d of dt(t)){const f=t[d];for(const c of f)c.restoreValidation()}}return Ie(Se,{props:n,maxChildLabelWidthRef:r,deriveMaxChildLabelWidth:a}),Ie(At,{formItems:t}),Object.assign({validate:l,restoreValidation:o},{mergedClsPrefix:e})},render(){const{mergedClsPrefix:n}=this;return v("form",{class:[`${n}-form`,this.inline&&`${n}-form--inline`],onSubmit:this.onSubmit},this.$slots)}});function se(){return se=Object.assign?Object.assign.bind():function(n){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])}return n},se.apply(this,arguments)}function br(n,e){n.prototype=Object.create(e.prototype),n.prototype.constructor=n,Ce(n,e)}function He(n){return He=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},He(n)}function Ce(n,e){return Ce=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(r,a){return r.__proto__=a,r},Ce(n,e)}function yr(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(n){return!1}}function Oe(n,e,t){return yr()?Oe=Reflect.construct.bind():Oe=function(a,l,o){var s=[null];s.push.apply(s,l);var d=Function.bind.apply(a,s),f=new d;return o&&Ce(f,o.prototype),f},Oe.apply(null,arguments)}function xr(n){return Function.toString.call(n).indexOf("[native code]")!==-1}function Ue(n){var e=typeof Map=="function"?new Map:void 0;return Ue=function(r){if(r===null||!xr(r))return r;if(typeof r!="function")throw new TypeError("Super expression must either be null or a function");if(typeof e!="undefined"){if(e.has(r))return e.get(r);e.set(r,a)}function a(){return Oe(r,arguments,He(this).constructor)}return a.prototype=Object.create(r.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),Ce(a,r)},Ue(n)}var wr=/%[sdj%]/g,Rr=function(){};typeof process!="undefined"&&process.env;function Ke(n){if(!n||!n.length)return null;var e={};return n.forEach(function(t){var r=t.field;e[r]=e[r]||[],e[r].push(t)}),e}function Z(n){for(var e=arguments.length,t=new Array(e>1?e-1:0),r=1;r<e;r++)t[r-1]=arguments[r];var a=0,l=t.length;if(typeof n=="function")return n.apply(null,t);if(typeof n=="string"){var o=n.replace(wr,function(s){if(s==="%%")return"%";if(a>=l)return s;switch(s){case"%s":return String(t[a++]);case"%d":return Number(t[a++]);case"%j":try{return JSON.stringify(t[a++])}catch(d){return"[Circular]"}break;default:return s}});return o}return n}function Fr(n){return n==="string"||n==="url"||n==="hex"||n==="email"||n==="date"||n==="pattern"}function T(n,e){return!!(n==null||e==="array"&&Array.isArray(n)&&!n.length||Fr(e)&&typeof n=="string"&&!n)}function kr(n,e,t){var r=[],a=0,l=n.length;function o(s){r.push.apply(r,s||[]),a++,a===l&&t(r)}n.forEach(function(s){e(s,o)})}function ht(n,e,t){var r=0,a=n.length;function l(o){if(o&&o.length){t(o);return}var s=r;r=r+1,s<a?e(n[s],l):t([])}l([])}function Cr(n){var e=[];return Object.keys(n).forEach(function(t){e.push.apply(e,n[t]||[])}),e}var vt=function(n){br(e,n);function e(t,r){var a;return a=n.call(this,"Async Validation Error")||this,a.errors=t,a.fields=r,a}return e}(Ue(Error));function Sr(n,e,t,r,a){if(e.first){var l=new Promise(function(b,g){var R=function(p){return r(p),p.length?g(new vt(p,Ke(p))):b(a)},m=Cr(n);ht(m,t,R)});return l.catch(function(b){return b}),l}var o=e.firstFields===!0?Object.keys(n):e.firstFields||[],s=Object.keys(n),d=s.length,f=0,c=[],h=new Promise(function(b,g){var R=function(C){if(c.push.apply(c,C),f++,f===d)return r(c),c.length?g(new vt(c,Ke(c))):b(a)};s.length||(r(c),b(a)),s.forEach(function(m){var C=n[m];o.indexOf(m)!==-1?ht(C,t,R):kr(C,t,R)})});return h.catch(function(b){return b}),h}function Ar(n){return!!(n&&n.message!==void 0)}function _r(n,e){for(var t=n,r=0;r<e.length;r++){if(t==null)return t;t=t[e[r]]}return t}function gt(n,e){return function(t){var r;return n.fullFields?r=_r(e,n.fullFields):r=e[t.field||n.fullField],Ar(t)?(t.field=t.field||n.fullField,t.fieldValue=r,t):{message:typeof t=="function"?t():t,fieldValue:r,field:t.field||n.fullField}}}function pt(n,e){if(e){for(var t in e)if(e.hasOwnProperty(t)){var r=e[t];typeof r=="object"&&typeof n[t]=="object"?n[t]=se({},n[t],r):n[t]=r}}return n}var _t=function(e,t,r,a,l,o){e.required&&(!r.hasOwnProperty(e.field)||T(t,o||e.type))&&a.push(Z(l.messages.required,e.fullField))},Pr=function(e,t,r,a,l){(/^\s+$/.test(t)||t==="")&&a.push(Z(l.messages.whitespace,e.fullField))},qe,$r=function(){if(qe)return qe;var n="[a-fA-F\\d:]",e=function(A){return A&&A.includeBoundaries?"(?:(?<=\\s|^)(?="+n+")|(?<="+n+")(?=\\s|$))":""},t="(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}",r="[a-fA-F\\d]{1,4}",a=(`
(?:
(?:`+r+":){7}(?:"+r+`|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:`+r+":){6}(?:"+t+"|:"+r+`|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:`+r+":){5}(?::"+t+"|(?::"+r+`){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:`+r+":){4}(?:(?::"+r+"){0,1}:"+t+"|(?::"+r+`){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:`+r+":){3}(?:(?::"+r+"){0,2}:"+t+"|(?::"+r+`){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:`+r+":){2}(?:(?::"+r+"){0,3}:"+t+"|(?::"+r+`){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:`+r+":){1}(?:(?::"+r+"){0,4}:"+t+"|(?::"+r+`){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::(?:(?::`+r+"){0,5}:"+t+"|(?::"+r+`){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1
`).replace(/\s*\/\/.*$/gm,"").replace(/\n/g,"").trim(),l=new RegExp("(?:^"+t+"$)|(?:^"+a+"$)"),o=new RegExp("^"+t+"$"),s=new RegExp("^"+a+"$"),d=function(A){return A&&A.exact?l:new RegExp("(?:"+e(A)+t+e(A)+")|(?:"+e(A)+a+e(A)+")","g")};d.v4=function(x){return x&&x.exact?o:new RegExp(""+e(x)+t+e(x),"g")},d.v6=function(x){return x&&x.exact?s:new RegExp(""+e(x)+a+e(x),"g")};var f="(?:(?:[a-z]+:)?//)",c="(?:\\S+(?::\\S*)?@)?",h=d.v4().source,b=d.v6().source,g="(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)",R="(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*",m="(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))",C="(?::\\d{2,5})?",p='(?:[/?#][^\\s"]*)?',M="(?:"+f+"|www\\.)"+c+"(?:localhost|"+h+"|"+b+"|"+g+R+m+")"+C+p;return qe=new RegExp("(?:^"+M+"$)","i"),qe},mt={email:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,hex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/i},Re={integer:function(e){return Re.number(e)&&parseInt(e,10)===e},float:function(e){return Re.number(e)&&!Re.integer(e)},array:function(e){return Array.isArray(e)},regexp:function(e){if(e instanceof RegExp)return!0;try{return!!new RegExp(e)}catch(t){return!1}},date:function(e){return typeof e.getTime=="function"&&typeof e.getMonth=="function"&&typeof e.getYear=="function"&&!isNaN(e.getTime())},number:function(e){return isNaN(e)?!1:typeof e=="number"},object:function(e){return typeof e=="object"&&!Re.array(e)},method:function(e){return typeof e=="function"},email:function(e){return typeof e=="string"&&e.length<=320&&!!e.match(mt.email)},url:function(e){return typeof e=="string"&&e.length<=2048&&!!e.match($r())},hex:function(e){return typeof e=="string"&&!!e.match(mt.hex)}},zr=function(e,t,r,a,l){if(e.required&&t===void 0){_t(e,t,r,a,l);return}var o=["integer","float","array","regexp","object","method","email","number","date","url","hex"],s=e.type;o.indexOf(s)>-1?Re[s](t)||a.push(Z(l.messages.types[s],e.fullField,e.type)):s&&typeof t!==e.type&&a.push(Z(l.messages.types[s],e.fullField,e.type))},Er=function(e,t,r,a,l){var o=typeof e.len=="number",s=typeof e.min=="number",d=typeof e.max=="number",f=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,c=t,h=null,b=typeof t=="number",g=typeof t=="string",R=Array.isArray(t);if(b?h="number":g?h="string":R&&(h="array"),!h)return!1;R&&(c=t.length),g&&(c=t.replace(f,"_").length),o?c!==e.len&&a.push(Z(l.messages[h].len,e.fullField,e.len)):s&&!d&&c<e.min?a.push(Z(l.messages[h].min,e.fullField,e.min)):d&&!s&&c>e.max?a.push(Z(l.messages[h].max,e.fullField,e.max)):s&&d&&(c<e.min||c>e.max)&&a.push(Z(l.messages[h].range,e.fullField,e.min,e.max))},fe="enum",qr=function(e,t,r,a,l){e[fe]=Array.isArray(e[fe])?e[fe]:[],e[fe].indexOf(t)===-1&&a.push(Z(l.messages[fe],e.fullField,e[fe].join(", ")))},Or=function(e,t,r,a,l){if(e.pattern){if(e.pattern instanceof RegExp)e.pattern.lastIndex=0,e.pattern.test(t)||a.push(Z(l.messages.pattern.mismatch,e.fullField,t,e.pattern));else if(typeof e.pattern=="string"){var o=new RegExp(e.pattern);o.test(t)||a.push(Z(l.messages.pattern.mismatch,e.fullField,t,e.pattern))}}},F={required:_t,whitespace:Pr,type:zr,range:Er,enum:qr,pattern:Or},Ir=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t,"string")&&!e.required)return r();F.required(e,t,a,o,l,"string"),T(t,"string")||(F.type(e,t,a,o,l),F.range(e,t,a,o,l),F.pattern(e,t,a,o,l),e.whitespace===!0&&F.whitespace(e,t,a,o,l))}r(o)},Mr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&F.type(e,t,a,o,l)}r(o)},Vr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(t===""&&(t=void 0),T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&(F.type(e,t,a,o,l),F.range(e,t,a,o,l))}r(o)},Tr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&F.type(e,t,a,o,l)}r(o)},Br=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),T(t)||F.type(e,t,a,o,l)}r(o)},jr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&(F.type(e,t,a,o,l),F.range(e,t,a,o,l))}r(o)},Wr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&(F.type(e,t,a,o,l),F.range(e,t,a,o,l))}r(o)},Dr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(t==null&&!e.required)return r();F.required(e,t,a,o,l,"array"),t!=null&&(F.type(e,t,a,o,l),F.range(e,t,a,o,l))}r(o)},Lr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&F.type(e,t,a,o,l)}r(o)},Nr="enum",Hr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l),t!==void 0&&F[Nr](e,t,a,o,l)}r(o)},Ur=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t,"string")&&!e.required)return r();F.required(e,t,a,o,l),T(t,"string")||F.pattern(e,t,a,o,l)}r(o)},Kr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t,"date")&&!e.required)return r();if(F.required(e,t,a,o,l),!T(t,"date")){var d;t instanceof Date?d=t:d=new Date(t),F.type(e,d,a,o,l),d&&F.range(e,d.getTime(),a,o,l)}}r(o)},Yr=function(e,t,r,a,l){var o=[],s=Array.isArray(t)?"array":typeof t;F.required(e,t,a,o,l,s),r(o)},Ne=function(e,t,r,a,l){var o=e.type,s=[],d=e.required||!e.required&&a.hasOwnProperty(e.field);if(d){if(T(t,o)&&!e.required)return r();F.required(e,t,a,s,l,o),T(t,o)||F.type(e,t,a,s,l)}r(s)},Xr=function(e,t,r,a,l){var o=[],s=e.required||!e.required&&a.hasOwnProperty(e.field);if(s){if(T(t)&&!e.required)return r();F.required(e,t,a,o,l)}r(o)},Fe={string:Ir,method:Mr,number:Vr,boolean:Tr,regexp:Br,integer:jr,float:Wr,array:Dr,object:Lr,enum:Hr,pattern:Ur,date:Kr,url:Ne,hex:Ne,email:Ne,required:Yr,any:Xr};function Ye(){return{default:"Validation error on field %s",required:"%s is required",enum:"%s must be one of %s",whitespace:"%s cannot be empty",date:{format:"%s date %s is invalid for format %s",parse:"%s date could not be parsed, %s is invalid ",invalid:"%s date %s is invalid"},types:{string:"%s is not a %s",method:"%s is not a %s (function)",array:"%s is not an %s",object:"%s is not an %s",number:"%s is not a %s",date:"%s is not a %s",boolean:"%s is not a %s",integer:"%s is not an %s",float:"%s is not a %s",regexp:"%s is not a valid %s",email:"%s is not a valid %s",url:"%s is not a valid %s",hex:"%s is not a valid %s"},string:{len:"%s must be exactly %s characters",min:"%s must be at least %s characters",max:"%s cannot be longer than %s characters",range:"%s must be between %s and %s characters"},number:{len:"%s must equal %s",min:"%s cannot be less than %s",max:"%s cannot be greater than %s",range:"%s must be between %s and %s"},array:{len:"%s must be exactly %s in length",min:"%s cannot be less than %s in length",max:"%s cannot be greater than %s in length",range:"%s must be between %s and %s in length"},pattern:{mismatch:"%s value %s does not match pattern %s"},clone:function(){var e=JSON.parse(JSON.stringify(this));return e.clone=this.clone,e}}}var Xe=Ye(),Ae=function(){function n(t){this.rules=null,this._messages=Xe,this.define(t)}var e=n.prototype;return e.define=function(r){var a=this;if(!r)throw new Error("Cannot configure a schema with no rules");if(typeof r!="object"||Array.isArray(r))throw new Error("Rules must be an object");this.rules={},Object.keys(r).forEach(function(l){var o=r[l];a.rules[l]=Array.isArray(o)?o:[o]})},e.messages=function(r){return r&&(this._messages=pt(Ye(),r)),this._messages},e.validate=function(r,a,l){var o=this;a===void 0&&(a={}),l===void 0&&(l=function(){});var s=r,d=a,f=l;if(typeof d=="function"&&(f=d,d={}),!this.rules||Object.keys(this.rules).length===0)return f&&f(null,s),Promise.resolve(s);function c(m){var C=[],p={};function M(A){if(Array.isArray(A)){var q;C=(q=C).concat.apply(q,A)}else C.push(A)}for(var x=0;x<m.length;x++)M(m[x]);C.length?(p=Ke(C),f(C,p)):f(null,s)}if(d.messages){var h=this.messages();h===Xe&&(h=Ye()),pt(h,d.messages),d.messages=h}else d.messages=this.messages();var b={},g=d.keys||Object.keys(this.rules);g.forEach(function(m){var C=o.rules[m],p=s[m];C.forEach(function(M){var x=M;typeof x.transform=="function"&&(s===r&&(s=se({},s)),p=s[m]=x.transform(p)),typeof x=="function"?x={validator:x}:x=se({},x),x.validator=o.getValidationMethod(x),x.validator&&(x.field=m,x.fullField=x.fullField||m,x.type=o.getType(x),b[m]=b[m]||[],b[m].push({rule:x,value:p,source:s,field:m}))})});var R={};return Sr(b,d,function(m,C){var p=m.rule,M=(p.type==="object"||p.type==="array")&&(typeof p.fields=="object"||typeof p.defaultField=="object");M=M&&(p.required||!p.required&&m.value),p.field=m.field;function x(E,H){return se({},H,{fullField:p.fullField+"."+E,fullFields:p.fullFields?[].concat(p.fullFields,[E]):[E]})}function A(E){E===void 0&&(E=[]);var H=Array.isArray(E)?E:[E];!d.suppressWarning&&H.length&&n.warning("async-validator:",H),H.length&&p.message!==void 0&&(H=[].concat(p.message));var B=H.map(gt(p,s));if(d.first&&B.length)return R[p.field]=1,C(B);if(!M)C(B);else{if(p.required&&!m.value)return p.message!==void 0?B=[].concat(p.message).map(gt(p,s)):d.error&&(B=[d.error(p,Z(d.messages.required,p.field))]),C(B);var L={};p.defaultField&&Object.keys(m.value).map(function(z){L[z]=p.defaultField}),L=se({},L,m.rule.fields);var K={};Object.keys(L).forEach(function(z){var _=L[z],j=Array.isArray(_)?_:[_];K[z]=j.map(x.bind(null,z))});var k=new n(K);k.messages(d.messages),m.rule.options&&(m.rule.options.messages=d.messages,m.rule.options.error=d.error),k.validate(m.value,m.rule.options||d,function(z){var _=[];B&&B.length&&_.push.apply(_,B),z&&z.length&&_.push.apply(_,z),C(_.length?_:null)})}}var q;if(p.asyncValidator)q=p.asyncValidator(p,m.value,A,m.source,d);else if(p.validator){try{q=p.validator(p,m.value,A,m.source,d)}catch(E){console.error==null||console.error(E),d.suppressValidatorError||setTimeout(function(){throw E},0),A(E.message)}q===!0?A():q===!1?A(typeof p.message=="function"?p.message(p.fullField||p.field):p.message||(p.fullField||p.field)+" fails"):q instanceof Array?A(q):q instanceof Error&&A(q.message)}q&&q.then&&q.then(function(){return A()},function(E){return A(E)})},function(m){c(m)},s)},e.getType=function(r){if(r.type===void 0&&r.pattern instanceof RegExp&&(r.type="pattern"),typeof r.validator!="function"&&r.type&&!Fe.hasOwnProperty(r.type))throw new Error(Z("Unknown rule type %s",r.type));return r.type||"string"},e.getValidationMethod=function(r){if(typeof r.validator=="function")return r.validator;var a=Object.keys(r),l=a.indexOf("message");return l!==-1&&a.splice(l,1),a.length===1&&a[0]==="required"?Fe.required:Fe[this.getType(r)]||void 0},n}();Ae.register=function(e,t){if(typeof t!="function")throw new Error("Cannot register a validator by type, validator is not a function");Fe[e]=t};Ae.warning=Rr;Ae.messages=Xe;Ae.validators=Fe;function Zr(n){const e=he(Se,null);return{mergedSize:$(()=>n.size!==void 0?n.size:(e==null?void 0:e.props.size)!==void 0?e.props.size:"medium")}}function Jr(n){const e=he(Se,null),t=$(()=>{const{labelPlacement:g}=n;return g!==void 0?g:e!=null&&e.props.labelPlacement?e.props.labelPlacement:"top"}),r=$(()=>t.value==="left"&&(n.labelWidth==="auto"||(e==null?void 0:e.props.labelWidth)==="auto")),a=$(()=>{if(t.value==="top")return;const{labelWidth:g}=n;if(g!==void 0&&g!=="auto")return Le(g);if(r.value){const R=e==null?void 0:e.maxChildLabelWidthRef.value;return R!==void 0?Le(R):void 0}if((e==null?void 0:e.props.labelWidth)!==void 0)return Le(e.props.labelWidth)}),l=$(()=>{const{labelAlign:g}=n;if(g)return g;if(e!=null&&e.props.labelAlign)return e.props.labelAlign}),o=$(()=>{var g;return[(g=n.labelProps)===null||g===void 0?void 0:g.style,n.labelStyle,{width:a.value}]}),s=$(()=>{const{showRequireMark:g}=n;return g!==void 0?g:e==null?void 0:e.props.showRequireMark}),d=$(()=>{const{requireMarkPlacement:g}=n;return g!==void 0?g:(e==null?void 0:e.props.requireMarkPlacement)||"right"}),f=O(!1),c=$(()=>{const{validationStatus:g}=n;if(g!==void 0)return g;if(f.value)return"error"}),h=$(()=>{const{showFeedback:g}=n;return g!==void 0?g:(e==null?void 0:e.props.showFeedback)!==void 0?e.props.showFeedback:!0}),b=$(()=>{const{showLabel:g}=n;return g!==void 0?g:(e==null?void 0:e.props.showLabel)!==void 0?e.props.showLabel:!0});return{validationErrored:f,mergedLabelStyle:o,mergedLabelPlacement:t,mergedLabelAlign:l,mergedShowRequireMark:s,mergedRequireMarkPlacement:d,mergedValidationStatus:c,mergedShowFeedback:h,mergedShowLabel:b,isAutoLabelWidth:r}}function Gr(n){const e=he(Se,null),t=$(()=>{const{rulePath:o}=n;if(o!==void 0)return o;const{path:s}=n;if(s!==void 0)return s}),r=$(()=>{const o=[],{rule:s}=n;if(s!==void 0&&(Array.isArray(s)?o.push(...s):o.push(s)),e){const{rules:d}=e.props,{value:f}=t;if(d!==void 0&&f!==void 0){const c=Ct(d,f);c!==void 0&&(Array.isArray(c)?o.push(...c):o.push(c))}}return o}),a=$(()=>r.value.some(o=>o.required)),l=$(()=>a.value||n.required);return{mergedRules:r,mergedRequired:l}}const{cubicBezierEaseInOut:bt}=ir;function Qr({name:n="fade-down",fromOffset:e="-4px",enterDuration:t=".3s",leaveDuration:r=".3s",enterCubicBezier:a=bt,leaveCubicBezier:l=bt}={}){return[N(`&.${n}-transition-enter-from, &.${n}-transition-leave-to`,{opacity:0,transform:`translateY(${e})`}),N(`&.${n}-transition-enter-to, &.${n}-transition-leave-from`,{opacity:1,transform:"translateY(0)"}),N(`&.${n}-transition-leave-active`,{transition:`opacity ${r} ${l}, transform ${r} ${l}`}),N(`&.${n}-transition-enter-active`,{transition:`opacity ${t} ${a}, transform ${t} ${a}`})]}const ei=S("form-item",`
 display: grid;
 line-height: var(--n-line-height);
`,[S("form-item-label",`
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 `,[w("asterisk",`
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `),w("asterisk-placeholder",`
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]),S("form-item-blank",`
 grid-area: blank;
 min-height: var(--n-blank-height);
 `),V("auto-label-width",[S("form-item-label","white-space: nowrap;")]),V("left-labelled",`
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: start;
 `,[S("form-item-label",`
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `,[V("left-mark",`
 grid-template-areas:
 "mark text"
 ". text";
 `),V("right-mark",`
 grid-template-areas: 
 "text mark"
 "text .";
 `),V("right-hanging-mark",`
 grid-template-areas: 
 "text mark"
 "text .";
 `),w("text",`
 grid-area: text; 
 `),w("asterisk",`
 grid-area: mark; 
 align-self: end;
 `)])]),V("top-labelled",`
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `,[V("no-label",`
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `),S("form-item-label",`
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]),S("form-item-blank",`
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
 `,[N("&:not(:empty)",`
 padding: var(--n-feedback-padding);
 `),S("form-item-feedback",{transition:"color .3s var(--n-bezier)",color:"var(--n-feedback-text-color)"},[V("warning",{color:"var(--n-feedback-text-color-warning)"}),V("error",{color:"var(--n-feedback-text-color-error)"}),Qr({fromOffset:"-3px",enterDuration:".3s",leaveDuration:".2s"})])])]);var yt=globalThis&&globalThis.__awaiter||function(n,e,t,r){function a(l){return l instanceof t?l:new t(function(o){o(l)})}return new(t||(t=Promise))(function(l,o){function s(c){try{f(r.next(c))}catch(h){o(h)}}function d(c){try{f(r.throw(c))}catch(h){o(h)}}function f(c){c.done?l(c.value):a(c.value).then(s,d)}f((r=r.apply(n,e||[])).next())})};const ti=Object.assign(Object.assign({},ge.props),{label:String,labelWidth:[Number,String],labelStyle:[String,Object],labelAlign:String,labelPlacement:String,path:String,first:Boolean,rulePath:String,required:Boolean,showRequireMark:{type:Boolean,default:void 0},requireMarkPlacement:String,showFeedback:{type:Boolean,default:void 0},rule:[Object,Array],size:String,ignorePathChange:Boolean,validationStatus:String,feedback:String,showLabel:{type:Boolean,default:void 0},labelProps:Object});function xt(n,e){return(...t)=>{try{const r=n(...t);return!e&&(typeof r=="boolean"||r instanceof Error||Array.isArray(r))||(r==null?void 0:r.then)?r:(r===void 0||ct("form-item/validate",`You return a ${typeof r} typed value in the validator method, which is not recommended. Please use `+(e?"`Promise`":"`boolean`, `Error` or `Promise`")+" typed value instead."),!0)}catch(r){ct("form-item/validate","An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation."),console.error(r);return}}}const ai=ve({name:"FormItem",props:ti,setup(n){lr(At,"formItems",xe(n,"path"));const{mergedClsPrefixRef:e,inlineThemeDisabled:t}=Je(n),r=he(Se,null),a=Zr(n),l=Jr(n),{validationErrored:o}=l,{mergedRequired:s,mergedRules:d}=Gr(n),{mergedSize:f}=a,{mergedLabelPlacement:c,mergedLabelAlign:h}=l,b=O([]),g=O(ut()),R=r?xe(r.props,"disabled"):O(!1),m=ge("Form","-form-item",ei,kt,n,e);ke(xe(n,"path"),()=>{n.ignorePathChange||C()});function C(){b.value=[],o.value=!1,n.feedback&&(g.value=ut())}function p(){E("blur")}function M(){E("change")}function x(){E("focus")}function A(){E("input")}function q(k,z){return yt(this,void 0,void 0,function*(){let _,j,Q,re;return typeof k=="string"?(_=k,j=z):k!==null&&typeof k=="object"&&(_=k.trigger,j=k.callback,Q=k.shouldRuleBeApplied,re=k.options),yield new Promise((te,J)=>{E(_,Q,re).then(({valid:ie,errors:ne})=>{ie?(j&&j(),te()):(j&&j(ne),J(ne))})})})}const E=(k=null,z=()=>!0,_={suppressWarning:!0})=>yt(this,void 0,void 0,function*(){const{path:j}=n;_?_.first||(_.first=n.first):_={};const{value:Q}=d,re=r?Ct(r.props.model,j||""):void 0,te={},J={},ie=(k?Q.filter(G=>Array.isArray(G.trigger)?G.trigger.includes(k):G.trigger===k):Q).filter(z).map((G,Y)=>{const P=Object.assign({},G);if(P.validator&&(P.validator=xt(P.validator,!1)),P.asyncValidator&&(P.asyncValidator=xt(P.asyncValidator,!0)),P.renderMessage){const U=`__renderMessage__${Y}`;J[U]=P.message,P.message=U,te[U]=P.renderMessage}return P});if(!ie.length)return{valid:!0};const ne=j!=null?j:"__n_no_path__",de=new Ae({[ne]:ie}),{validateMessages:ue}=(r==null?void 0:r.props)||{};return ue&&de.messages(ue),yield new Promise(G=>{de.validate({[ne]:re},_,Y=>{Y!=null&&Y.length?(b.value=Y.map(P=>{const U=(P==null?void 0:P.message)||"";return{key:U,render:()=>U.startsWith("__renderMessage__")?te[U]():U}}),Y.forEach(P=>{var U;!((U=P.message)===null||U===void 0)&&U.startsWith("__renderMessage__")&&(P.message=J[P.message])}),o.value=!0,G({valid:!1,errors:Y})):(C(),G({valid:!0}))})})});Ie(ar,{path:xe(n,"path"),disabled:R,mergedSize:a.mergedSize,mergedValidationStatus:l.mergedValidationStatus,restoreValidation:C,handleContentBlur:p,handleContentChange:M,handleContentFocus:x,handleContentInput:A});const H={validate:q,restoreValidation:C,internalValidate:E},B=O(null);Rt(()=>{if(!l.isAutoLabelWidth.value)return;const k=B.value;if(k!==null){const z=k.style.whiteSpace;k.style.whiteSpace="nowrap",k.style.width="",r==null||r.deriveMaxChildLabelWidth(Number(getComputedStyle(k).width.slice(0,-2))),k.style.whiteSpace=z}});const L=$(()=>{var k;const{value:z}=f,{value:_}=c,j=_==="top"?"vertical":"horizontal",{common:{cubicBezierEaseInOut:Q},self:{labelTextColor:re,asteriskColor:te,lineHeight:J,feedbackTextColor:ie,feedbackTextColorWarning:ne,feedbackTextColorError:de,feedbackPadding:ue,[ee("labelHeight",z)]:G,[ee("blankHeight",z)]:Y,[ee("feedbackFontSize",z)]:P,[ee("feedbackHeight",z)]:U,[ee("labelPadding",j)]:Me,[ee("labelTextAlign",j)]:Ve,[ee(ee("labelFontSize",_),z)]:Te}}=m.value;let pe=(k=h.value)!==null&&k!==void 0?k:Ve;return _==="top"&&(pe=pe==="right"?"flex-end":"flex-start"),{"--n-bezier":Q,"--n-line-height":J,"--n-blank-height":Y,"--n-label-font-size":Te,"--n-label-text-align":pe,"--n-label-height":G,"--n-label-padding":Me,"--n-asterisk-color":te,"--n-label-text-color":re,"--n-feedback-padding":ue,"--n-feedback-font-size":P,"--n-feedback-height":U,"--n-feedback-text-color":ie,"--n-feedback-text-color-warning":ne,"--n-feedback-text-color-error":de}}),K=Ft("form-item",$(()=>{var k;return`${f.value[0]}${c.value[0]}${((k=h.value)===null||k===void 0?void 0:k[0])||""}`}),L,n);return Object.assign(Object.assign(Object.assign(Object.assign({labelElementRef:B,mergedClsPrefix:e,mergedRequired:s,feedbackId:g,renderExplains:b},l),a),H),{cssVars:t?void 0:L,themeClass:K==null?void 0:K.themeClass,onRender:K==null?void 0:K.onRender})},render(){const{$slots:n,mergedClsPrefix:e,mergedShowLabel:t,mergedShowRequireMark:r,mergedRequireMarkPlacement:a,onRender:l}=this,o=r!==void 0?r:this.mergedRequired;l==null||l();const s=()=>{const d=this.$slots.label?this.$slots.label():this.label;if(!d)return null;const f=v("span",{class:`${e}-form-item-label__text`},d),c=o?v("span",{class:`${e}-form-item-label__asterisk`},a!=="left"?"\xA0*":"*\xA0"):a==="right-hanging"&&v("span",{class:`${e}-form-item-label__asterisk-placeholder`},"\xA0*"),{labelProps:h}=this;return v("label",Object.assign({},h,{class:[h==null?void 0:h.class,`${e}-form-item-label`,`${e}-form-item-label--${a}-mark`],style:this.mergedLabelStyle,ref:"labelElementRef"}),a==="left"?[c,f]:[f,c])};return v("div",{class:[`${e}-form-item`,this.themeClass,`${e}-form-item--${this.mergedSize}-size`,`${e}-form-item--${this.mergedLabelPlacement}-labelled`,this.isAutoLabelWidth&&`${e}-form-item--auto-label-width`,!t&&`${e}-form-item--no-label`],style:this.cssVars},t&&s(),v("div",{class:[`${e}-form-item-blank`,this.mergedValidationStatus&&`${e}-form-item-blank--${this.mergedValidationStatus}`]},n),this.mergedShowFeedback?v("div",{key:this.feedbackId,class:`${e}-form-item-feedback-wrapper`},v(or,{name:"fade-down-transition",mode:"out-in"},{default:()=>{const{mergedValidationStatus:d}=this;return we(n.feedback,f=>{var c;const{feedback:h}=this,b=f||h?v("div",{key:"__feedback__",class:`${e}-form-item-feedback__line`},f||h):this.renderExplains.length?(c=this.renderExplains)===null||c===void 0?void 0:c.map(({key:g,render:R})=>v("div",{key:g,class:`${e}-form-item-feedback__line`},R())):null;return b?d==="warning"?v("div",{key:"controlled-warning",class:`${e}-form-item-feedback ${e}-form-item-feedback--warning`},b):d==="error"?v("div",{key:"controlled-error",class:`${e}-form-item-feedback ${e}-form-item-feedback--error`},b):d==="success"?v("div",{key:"controlled-success",class:`${e}-form-item-feedback ${e}-form-item-feedback--success`},b):v("div",{key:"controlled-default",class:`${e}-form-item-feedback`},b):null})}})):null)}});export{ri as N,ii as a,ai as b};
