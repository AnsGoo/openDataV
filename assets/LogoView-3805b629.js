import{by as t,bz as n,bA as r,bB as i,bC as e,bD as a,d as o,au as u,o as s,v as f,f as c,u as v,bE as d,I as l,ab as p}from"./index-40170f2c.js";var m=/\s/;var b=/^\s+/;function g(t){return t?t.slice(0,function(t){for(var n=t.length;n--&&m.test(t.charAt(n)););return n}(t)+1).replace(b,""):t}var h=NaN,x=/^[-+]0x[0-9a-f]+$/i,y=/^0b[01]+$/i,T=/^0o[0-7]+$/i,w=parseInt;function _(r){if("number"==typeof r)return r;if(t(r))return h;if(n(r)){var i="function"==typeof r.valueOf?r.valueOf():r;r=n(i)?i+"":i}if("string"!=typeof r)return 0===r?r:+r;r=g(r);var e=y.test(r);return e||T.test(r)?w(r.slice(2),e?2:8):x.test(r)?h:+r}const E=function(){return r.Date.now()};var I=Math.max,$=Math.min;function j(t,r,i){var e,a,o,u,s,f,c=0,v=!1,d=!1,l=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function p(n){var r=e,i=a;return e=a=void 0,c=n,u=t.apply(i,r)}function m(t){var n=t-f;return void 0===f||n>=r||n<0||d&&t-c>=o}function b(){var t=E();if(m(t))return g(t);s=setTimeout(b,function(t){var n=r-(t-f);return d?$(n,o-(t-c)):n}(t))}function g(t){return s=void 0,l&&e?p(t):(e=a=void 0,u)}function h(){var t=E(),n=m(t);if(e=arguments,a=this,f=t,n){if(void 0===s)return function(t){return c=t,s=setTimeout(b,r),v?p(t):u}(f);if(d)return clearTimeout(s),s=setTimeout(b,r),p(f)}return void 0===s&&(s=setTimeout(b,r)),u}return r=_(r)||0,n(i)&&(v=!!i.leading,o=(d="maxWait"in i)?I(_(i.maxWait)||0,r):o,l="trailing"in i?!!i.trailing:l),h.cancel=function(){void 0!==s&&clearTimeout(s),c=0,e=f=a=s=void 0},h.flush=function(){return void 0===s?u:g(E())},h}function A(t){return"string"==typeof t||!i(t)&&e(t)&&"[object String]"==a(t)}const D={class:"logo"},L=["src"],M=p(o({__name:"LogoView",props:{width:{default:"60px"}},setup:t=>(u((t=>({"3361bb46":t.width}))),(t,n)=>(s(),f("div",D,[c("img",{src:v(d),alt:"",class:l({"mr-2":!0})},null,8,L)])))}),[["__scopeId","data-v-18e64b7d"]]);export{M as L,j as d,A as i};
