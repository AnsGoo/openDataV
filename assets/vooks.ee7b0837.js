import{r as f,L as r,w as p,d as M,g as E,q as _,l as y,v as P,a as F}from"./@vue.f8650cf9.js";import{o as l,a as c}from"./evtd.79485e8d.js";function $(e){const n=f(!!e.value);if(n.value)return r(n);const t=p(e,u=>{u&&(n.value=!0,t())});return r(n)}function q(e){const n=M(e),t=f(n.value);return p(n,u=>{t.value=u}),typeof e=="function"?t:{__v_isRef:!0,get value(){return t.value},set value(u){e.set(u)}}}function T(){return E()!==null}const I=typeof window!="undefined";let d,m;const R=()=>{var e,n;d=I?(n=(e=document)===null||e===void 0?void 0:e.fonts)===null||n===void 0?void 0:n.ready:void 0,m=!1,d!==void 0?d.then(()=>{m=!0}):m=!0};R();function K(e){if(m)return;let n=!1;_(()=>{m||d==null||d.then(()=>{n||e()})}),y(()=>{n=!0})}const k=f(null);function j(e){if(e.clientX>0||e.clientY>0)k.value={x:e.clientX,y:e.clientY};else{const{target:n}=e;if(n instanceof Element){const{left:t,top:u,width:s,height:i}=n.getBoundingClientRect();t>0||u>0?k.value={x:t+s/2,y:u+i/2}:k.value={x:0,y:0}}else k.value=null}}let h=0,B=!0;function L(){if(!I)return r(f(null));h===0&&l("click",document,j,!0);const e=()=>{h+=1};return B&&(B=T())?(P(e),y(()=>{h-=1,h===0&&c("click",document,j,!0)})):e(),r(k)}const S=f(void 0);let b=0;function H(){S.value=Date.now()}let D=!0;function V(e){if(!I)return r(f(!1));const n=f(!1);let t=null;function u(){t!==null&&window.clearTimeout(t)}function s(){u(),n.value=!0,t=window.setTimeout(()=>{n.value=!1},e)}b===0&&l("click",window,H,!0);const i=()=>{b+=1,l("click",window,s,!0)};return D&&(D=T())?(P(i),y(()=>{b-=1,b===0&&c("click",window,H,!0),c("click",window,s,!0),u()})):i(),r(n)}function z(e,n){return p(e,t=>{t!==void 0&&(n.value=t)}),M(()=>e.value===void 0?n.value:e.value)}function A(){const e=f(!1);return _(()=>{e.value=!0}),r(e)}function G(e,n){return M(()=>{for(const t of n)if(e[t]!==void 0)return e[t];return e[n[n.length-1]]})}const U=(typeof window=="undefined"?!1:/iPad|iPhone|iPod/.test(navigator.platform)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&!window.MSStream;function J(){return U}function N(e={},n){const t=F({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:u,keyup:s}=e,i=o=>{switch(o.key){case"Control":t.ctrl=!0;break;case"Meta":t.command=!0,t.win=!0;break;case"Shift":t.shift=!0;break;case"Tab":t.tab=!0;break}u!==void 0&&Object.keys(u).forEach(v=>{if(v!==o.key)return;const a=u[v];if(typeof a=="function")a(o);else{const{stop:g=!1,prevent:C=!1}=a;g&&o.stopPropagation(),C&&o.preventDefault(),a.handler(o)}})},w=o=>{switch(o.key){case"Control":t.ctrl=!1;break;case"Meta":t.command=!1,t.win=!1;break;case"Shift":t.shift=!1;break;case"Tab":t.tab=!1;break}s!==void 0&&Object.keys(s).forEach(v=>{if(v!==o.key)return;const a=s[v];if(typeof a=="function")a(o);else{const{stop:g=!1,prevent:C=!1}=a;g&&o.stopPropagation(),C&&o.preventDefault(),a.handler(o)}})},x=()=>{(n===void 0||n.value)&&(l("keydown",document,i),l("keyup",document,w)),n!==void 0&&p(n,o=>{o?(l("keydown",document,i),l("keyup",document,w)):(c("keydown",document,i),c("keyup",document,w))})};return T()?(P(x),y(()=>{(n===void 0||n.value)&&(c("keydown",document,i),c("keyup",document,w))})):x(),r(t)}export{J as a,z as b,G as c,$ as d,N as e,V as f,L as g,A as i,K as o,q as u};