import{aS as e,a$ as t,C as n,aZ as r,aa as o}from"./index-40170f2c.js";var i={exports:{}},s=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}},a=s,u=Object.prototype.toString;function c(e){return"[object Array]"===u.call(e)}function f(e){return void 0===e}function l(e){return null!==e&&"object"==typeof e}function h(e){if("[object Object]"!==u.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function d(e){return"[object Function]"===u.call(e)}function p(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),c(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var m={isArray:c,isArrayBuffer:function(e){return"[object ArrayBuffer]"===u.call(e)},isBuffer:function(e){return null!==e&&!f(e)&&null!==e.constructor&&!f(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:l,isPlainObject:h,isUndefined:f,isDate:function(e){return"[object Date]"===u.call(e)},isFile:function(e){return"[object File]"===u.call(e)},isBlob:function(e){return"[object Blob]"===u.call(e)},isFunction:d,isStream:function(e){return l(e)&&d(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:p,merge:function e(){var t={};function n(n,r){h(t[r])&&h(n)?t[r]=e(t[r],n):h(n)?t[r]=e({},n):c(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)p(arguments[r],n);return t},extend:function(e,t,n){return p(t,(function(t,r){e[r]=n&&"function"==typeof t?a(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}},v=m;function g(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var y=function(e,t,n){if(!t)return e;var r;if(n)r=n(t);else if(v.isURLSearchParams(t))r=t.toString();else{var o=[];v.forEach(t,(function(e,t){null!=e&&(v.isArray(e)?t+="[]":e=[e],v.forEach(e,(function(e){v.isDate(e)?e=e.toISOString():v.isObject(e)&&(e=JSON.stringify(e)),o.push(g(t)+"="+g(e))})))})),r=o.join("&")}if(r){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+r}return e},b=m;function w(){this.handlers=[]}w.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},w.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},w.prototype.forEach=function(e){b.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var E,S,x,j,O,T,C,R,N,A,P,k,U,q,B,L,_,D,H,I,F,J,z=w,M=m,V=function(e,t){M.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))},X=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e};function $(){if(S)return E;S=1;var e=X;return E=function(t,n,r,o,i){var s=new Error(t);return e(s,n,r,o,i)}}function W(){if(k)return P;k=1;var e=R?C:(R=1,C=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}),t=A?N:(A=1,N=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e});return P=function(n,r){return n&&!e(r)?t(n,r):r}}function G(){if(D)return _;function e(e){this.message=e}return D=1,e.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},e.prototype.__CANCEL__=!0,_=e}function K(){if(I)return H;I=1;var e=m,t=function(){if(j)return x;j=1;var e=$();return x=function(t,n,r){var o=r.config.validateStatus;r.status&&o&&!o(r.status)?n(e("Request failed with status code "+r.status,r.config,null,r.request,r)):t(r)}}(),n=function(){if(T)return O;T=1;var e=m;return O=e.isStandardBrowserEnv()?{write:function(t,n,r,o,i,s){var a=[];a.push(t+"="+encodeURIComponent(n)),e.isNumber(r)&&a.push("expires="+new Date(r).toGMTString()),e.isString(o)&&a.push("path="+o),e.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}}(),r=y,o=W(),i=function(){if(q)return U;q=1;var e=m,t=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return U=function(n){var r,o,i,s={};return n?(e.forEach(n.split("\n"),(function(n){if(i=n.indexOf(":"),r=e.trim(n.substr(0,i)).toLowerCase(),o=e.trim(n.substr(i+1)),r){if(s[r]&&t.indexOf(r)>=0)return;s[r]="set-cookie"===r?(s[r]?s[r]:[]).concat([o]):s[r]?s[r]+", "+o:o}})),s):s}}(),s=function(){if(L)return B;L=1;var e=m;return B=e.isStandardBrowserEnv()?function(){var t,n=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function o(e){var t=e;return n&&(r.setAttribute("href",t),t=r.href),r.setAttribute("href",t),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return t=o(window.location.href),function(n){var r=e.isString(n)?o(n):n;return r.protocol===t.protocol&&r.host===t.host}}():function(){return!0}}(),a=$(),u=Z(),c=G();return H=function(f){return new Promise((function(l,h){var d,p=f.data,m=f.headers,v=f.responseType;function g(){f.cancelToken&&f.cancelToken.unsubscribe(d),f.signal&&f.signal.removeEventListener("abort",d)}e.isFormData(p)&&delete m["Content-Type"];var y=new XMLHttpRequest;if(f.auth){var b=f.auth.username||"",w=f.auth.password?unescape(encodeURIComponent(f.auth.password)):"";m.Authorization="Basic "+btoa(b+":"+w)}var E=o(f.baseURL,f.url);function S(){if(y){var e="getAllResponseHeaders"in y?i(y.getAllResponseHeaders()):null,n={data:v&&"text"!==v&&"json"!==v?y.response:y.responseText,status:y.status,statusText:y.statusText,headers:e,config:f,request:y};t((function(e){l(e),g()}),(function(e){h(e),g()}),n),y=null}}if(y.open(f.method.toUpperCase(),r(E,f.params,f.paramsSerializer),!0),y.timeout=f.timeout,"onloadend"in y?y.onloadend=S:y.onreadystatechange=function(){y&&4===y.readyState&&(0!==y.status||y.responseURL&&0===y.responseURL.indexOf("file:"))&&setTimeout(S)},y.onabort=function(){y&&(h(a("Request aborted",f,"ECONNABORTED",y)),y=null)},y.onerror=function(){h(a("Network Error",f,null,y)),y=null},y.ontimeout=function(){var e=f.timeout?"timeout of "+f.timeout+"ms exceeded":"timeout exceeded",t=f.transitional||u.transitional;f.timeoutErrorMessage&&(e=f.timeoutErrorMessage),h(a(e,f,t.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",y)),y=null},e.isStandardBrowserEnv()){var x=(f.withCredentials||s(E))&&f.xsrfCookieName?n.read(f.xsrfCookieName):void 0;x&&(m[f.xsrfHeaderName]=x)}"setRequestHeader"in y&&e.forEach(m,(function(e,t){void 0===p&&"content-type"===t.toLowerCase()?delete m[t]:y.setRequestHeader(t,e)})),e.isUndefined(f.withCredentials)||(y.withCredentials=!!f.withCredentials),v&&"json"!==v&&(y.responseType=f.responseType),"function"==typeof f.onDownloadProgress&&y.addEventListener("progress",f.onDownloadProgress),"function"==typeof f.onUploadProgress&&y.upload&&y.upload.addEventListener("progress",f.onUploadProgress),(f.cancelToken||f.signal)&&(d=function(e){y&&(h(!e||e&&e.type?new c("canceled"):e),y.abort(),y=null)},f.cancelToken&&f.cancelToken.subscribe(d),f.signal&&(f.signal.aborted?d():f.signal.addEventListener("abort",d))),p||(p=null),y.send(p)}))}}function Z(){if(J)return F;J=1;var e=m,t=V,n=X,r={"Content-Type":"application/x-www-form-urlencoded"};function o(t,n){!e.isUndefined(t)&&e.isUndefined(t["Content-Type"])&&(t["Content-Type"]=n)}var i,s={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(i=K()),i),transformRequest:[function(n,r){return t(r,"Accept"),t(r,"Content-Type"),e.isFormData(n)||e.isArrayBuffer(n)||e.isBuffer(n)||e.isStream(n)||e.isFile(n)||e.isBlob(n)?n:e.isArrayBufferView(n)?n.buffer:e.isURLSearchParams(n)?(o(r,"application/x-www-form-urlencoded;charset=utf-8"),n.toString()):e.isObject(n)||r&&"application/json"===r["Content-Type"]?(o(r,"application/json"),function(t,n,r){if(e.isString(t))try{return(n||JSON.parse)(t),e.trim(t)}catch(o){if("SyntaxError"!==o.name)throw o}return(r||JSON.stringify)(t)}(n)):n}],transformResponse:[function(t){var r=this.transitional||s.transitional,o=r&&r.silentJSONParsing,i=r&&r.forcedJSONParsing,a=!o&&"json"===this.responseType;if(a||i&&e.isString(t)&&t.length)try{return JSON.parse(t)}catch(u){if(a){if("SyntaxError"===u.name)throw n(u,this,"E_JSON_PARSE");throw u}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};return e.forEach(["delete","get","head"],(function(e){s.headers[e]={}})),e.forEach(["post","put","patch"],(function(t){s.headers[t]=e.merge(r)})),F=s}var Q,Y,ee=m,te=Z();function ne(){return Y?Q:(Y=1,Q=function(e){return!(!e||!e.__CANCEL__)})}var re=m,oe=function(e,t,n){var r=this||te;return ee.forEach(n,(function(n){e=n.call(r,e,t)})),e},ie=ne(),se=Z(),ae=G();function ue(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ae("canceled")}var ce,fe,le=m,he=function(e,t){t=t||{};var n={};function r(e,t){return le.isPlainObject(e)&&le.isPlainObject(t)?le.merge(e,t):le.isPlainObject(t)?le.merge({},t):le.isArray(t)?t.slice():t}function o(n){return le.isUndefined(t[n])?le.isUndefined(e[n])?void 0:r(void 0,e[n]):r(e[n],t[n])}function i(e){if(!le.isUndefined(t[e]))return r(void 0,t[e])}function s(n){return le.isUndefined(t[n])?le.isUndefined(e[n])?void 0:r(void 0,e[n]):r(void 0,t[n])}function a(n){return n in t?r(e[n],t[n]):n in e?r(void 0,e[n]):void 0}var u={url:i,method:i,data:i,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:a};return le.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||o,r=t(e);le.isUndefined(r)&&t!==a||(n[e]=r)})),n};function de(){return fe?ce:(fe=1,ce={version:"0.23.0"})}var pe=de().version,me={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){me[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var ve={};me.transitional=function(e,t,n){return function(r,o,i){if(!1===e)throw new Error(function(e,t){return"[Axios v"+pe+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}(o," has been removed"+(t?" in "+t:"")));return t&&!ve[o]&&(ve[o]=!0),!e||e(r,o,i)}};var ge,ye,be,we,Ee,Se,xe=m,je=y,Oe=z,Te=function(e){return ue(e),e.headers=e.headers||{},e.data=oe.call(e,e.data,e.headers,e.transformRequest),e.headers=re.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),re.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||se.adapter)(e).then((function(t){return ue(e),t.data=oe.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return ie(t)||(ue(e),t&&t.response&&(t.response.data=oe.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},Ce=he,Re={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),o=r.length;o-- >0;){var i=r[o],s=t[i];if(s){var a=e[i],u=void 0===a||s(a,i,e);if(!0!==u)throw new TypeError("option "+i+" must be "+u)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:me},Ne=Re.validators;function Ae(e){this.defaults=e,this.interceptors={request:new Oe,response:new Oe}}Ae.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=Ce(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&Re.assertOptions(t,{silentJSONParsing:Ne.transitional(Ne.boolean),forcedJSONParsing:Ne.transitional(Ne.boolean),clarifyTimeoutError:Ne.transitional(Ne.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(r=r&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var o,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!r){var s=[Te,void 0];for(Array.prototype.unshift.apply(s,n),s=s.concat(i),o=Promise.resolve(e);s.length;)o=o.then(s.shift(),s.shift());return o}for(var a=e;n.length;){var u=n.shift(),c=n.shift();try{a=u(a)}catch(f){c(f);break}}try{o=Te(a)}catch(f){return Promise.reject(f)}for(;i.length;)o=o.then(i.shift(),i.shift());return o},Ae.prototype.getUri=function(e){return e=Ce(this.defaults,e),je(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},xe.forEach(["delete","get","head","options"],(function(e){Ae.prototype[e]=function(t,n){return this.request(Ce(n||{},{method:e,url:t,data:(n||{}).data}))}})),xe.forEach(["post","put","patch"],(function(e){Ae.prototype[e]=function(t,n,r){return this.request(Ce(r||{},{method:e,url:t,data:n}))}}));var Pe=m,ke=s,Ue=Ae,qe=he;var Be=function e(t){var n=new Ue(t),r=ke(Ue.prototype.request,n);return Pe.extend(r,Ue.prototype,n),Pe.extend(r,n),r.create=function(n){return e(qe(t,n))},r}(Z());Be.Axios=Ue,Be.Cancel=G(),Be.CancelToken=function(){if(ye)return ge;ye=1;var e=G();function t(t){if("function"!=typeof t)throw new TypeError("executor must be a function.");var n;this.promise=new Promise((function(e){n=e}));var r=this;this.promise.then((function(e){if(r._listeners){var t,n=r._listeners.length;for(t=0;t<n;t++)r._listeners[t](e);r._listeners=null}})),this.promise.then=function(e){var t,n=new Promise((function(e){r.subscribe(e),t=e})).then(e);return n.cancel=function(){r.unsubscribe(t)},n},t((function(t){r.reason||(r.reason=new e(t),n(r.reason))}))}return t.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},t.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},t.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},t.source=function(){var e;return{token:new t((function(t){e=t})),cancel:e}},ge=t}(),Be.isCancel=ne(),Be.VERSION=de().version,Be.all=function(e){return Promise.all(e)},Be.spread=we?be:(we=1,be=function(e){return function(t){return e.apply(null,t)}}),Be.isAxiosError=Se?Ee:(Se=1,Ee=function(e){return"object"==typeof e&&!0===e.isAxiosError}),i.exports=Be,i.exports.default=Be;const Le=e(i.exports),_e={baseURL:"/",timeout:1e4,headers:{"Content-Type":"application/json;charset=UTF-8"}};class De{axiosInstance;isBlock=!1;constructor(e=!1){this.axiosInstance=Le.create(function(e){if(!e)return _e;const{headers:t}=e;return t&&"object"==typeof t&&(_e.headers={..._e.headers,...t}),{...(n=e,r="headers",Object.keys(n).filter((e=>!r.includes(e))).reduce(((e,t)=>(e[t]=n[t],e)),{})),..._e};var n,r}()),this.httpHookRequest(),this.httpHookResponse(),this.isBlock=e}httpHookRequest(){this.axiosInstance.interceptors.request.use((e=>{const r=t().userToken;r&&e.headers&&(e.headers.authorization=r);const o=n();return this.isBlock&&o.isEditMode?Promise.reject("http is disable where the mode is edit"):e}),(e=>Promise.reject(e)))}httpHookResponse(){this.axiosInstance.interceptors.response.use((e=>e),(e=>{const{response:t}=e;return t&&this.errorHandler(t.status,t.data.message),Promise.reject(e)}))}errorHandler(e,t){if(401===e)r.info("请登录后使用");o.log(e,t)}get(e){return this.request({...e,method:"GET"})}post(e){return this.request({...e,method:"POST"})}put(e){return this.request({...e,method:"PUT"})}patch(e){return this.request({...e,method:"PATCH"})}delete(e){return this.request({...e,method:"DELETE"})}request(e){return new Promise(((t,n)=>{this.axiosInstance.request(e).then((e=>{t(e)})).catch((e=>{n(e)}))}))}}const He=new De(!0),Ie=new De(!1);export{Ie as a,He as h};
