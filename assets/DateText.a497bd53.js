import{X,_ as K,d as tt,B as Z,E as et,S as nt,J as rt,o as st,b as it,Y as at,L as ut,A as ot,I as ct}from"./index.6dd09c59.js";import{u as ft}from"./useProp.afe31ed3.js";var P={exports:{}};(function(j,V){(function(O,D){j.exports=D()})(X,function(){var O=1e3,D=6e4,L=36e5,Y="millisecond",v="second",y="minute",$="hour",m="day",g="week",p="month",J="quarter",_="year",H="date",B="Invalid Date",q=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,G=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Q={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},z=function(a,n,t){var r=String(a);return!r||r.length>=n?a:""+Array(n+1-r.length).join(t)+a},R={s:z,z:function(a){var n=-a.utcOffset(),t=Math.abs(n),r=Math.floor(t/60),e=t%60;return(n<=0?"+":"-")+z(r,2,"0")+":"+z(e,2,"0")},m:function a(n,t){if(n.date()<t.date())return-a(t,n);var r=12*(t.year()-n.year())+(t.month()-n.month()),e=n.clone().add(r,p),i=t-e<0,s=n.clone().add(r+(i?-1:1),p);return+(-(r+(t-e)/(i?e-s:s-e))||0)},a:function(a){return a<0?Math.ceil(a)||0:Math.floor(a)},p:function(a){return{M:p,y:_,w:g,d:m,D:H,h:$,m:y,s:v,ms:Y,Q:J}[a]||String(a||"").toLowerCase().replace(/s$/,"")},u:function(a){return a===void 0}},b="en",x={};x[b]=Q;var N=function(a){return a instanceof k},W=function a(n,t,r){var e;if(!n)return b;if(typeof n=="string"){var i=n.toLowerCase();x[i]&&(e=i),t&&(x[i]=t,e=i);var s=n.split("-");if(!e&&s.length>1)return a(s[0])}else{var u=n.name;x[u]=n,e=u}return!r&&e&&(b=e),e||!r&&b},h=function(a,n){if(N(a))return a.clone();var t=typeof n=="object"?n:{};return t.date=a,t.args=arguments,new k(t)},o=R;o.l=W,o.i=N,o.w=function(a,n){return h(a,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var k=function(){function a(t){this.$L=W(t.locale,null,!0),this.parse(t)}var n=a.prototype;return n.parse=function(t){this.$d=function(r){var e=r.date,i=r.utc;if(e===null)return new Date(NaN);if(o.u(e))return new Date;if(e instanceof Date)return new Date(e);if(typeof e=="string"&&!/Z$/i.test(e)){var s=e.match(q);if(s){var u=s[2]-1||0,f=(s[7]||"0").substring(0,3);return i?new Date(Date.UTC(s[1],u,s[3]||1,s[4]||0,s[5]||0,s[6]||0,f)):new Date(s[1],u,s[3]||1,s[4]||0,s[5]||0,s[6]||0,f)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},n.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},n.$utils=function(){return o},n.isValid=function(){return this.$d.toString()!==B},n.isSame=function(t,r){var e=h(t);return this.startOf(r)<=e&&e<=this.endOf(r)},n.isAfter=function(t,r){return h(t)<this.startOf(r)},n.isBefore=function(t,r){return this.endOf(r)<h(t)},n.$g=function(t,r,e){return o.u(t)?this[r]:this.set(e,t)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(t,r){var e=this,i=!!o.u(r)||r,s=o.p(t),u=function(T,l){var w=o.w(e.$u?Date.UTC(e.$y,l,T):new Date(e.$y,l,T),e);return i?w:w.endOf(m)},f=function(T,l){return o.w(e.toDate()[T].apply(e.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(l)),e)},c=this.$W,d=this.$M,S=this.$D,M="set"+(this.$u?"UTC":"");switch(s){case _:return i?u(1,0):u(31,11);case p:return i?u(1,d):u(0,d+1);case g:var I=this.$locale().weekStart||0,C=(c<I?c+7:c)-I;return u(i?S-C:S+(6-C),d);case m:case H:return f(M+"Hours",0);case $:return f(M+"Minutes",1);case y:return f(M+"Seconds",2);case v:return f(M+"Milliseconds",3);default:return this.clone()}},n.endOf=function(t){return this.startOf(t,!1)},n.$set=function(t,r){var e,i=o.p(t),s="set"+(this.$u?"UTC":""),u=(e={},e[m]=s+"Date",e[H]=s+"Date",e[p]=s+"Month",e[_]=s+"FullYear",e[$]=s+"Hours",e[y]=s+"Minutes",e[v]=s+"Seconds",e[Y]=s+"Milliseconds",e)[i],f=i===m?this.$D+(r-this.$W):r;if(i===p||i===_){var c=this.clone().set(H,1);c.$d[u](f),c.init(),this.$d=c.set(H,Math.min(this.$D,c.daysInMonth())).$d}else u&&this.$d[u](f);return this.init(),this},n.set=function(t,r){return this.clone().$set(t,r)},n.get=function(t){return this[o.p(t)]()},n.add=function(t,r){var e,i=this;t=Number(t);var s=o.p(r),u=function(d){var S=h(i);return o.w(S.date(S.date()+Math.round(d*t)),i)};if(s===p)return this.set(p,this.$M+t);if(s===_)return this.set(_,this.$y+t);if(s===m)return u(1);if(s===g)return u(7);var f=(e={},e[y]=D,e[$]=L,e[v]=O,e)[s]||1,c=this.$d.getTime()+t*f;return o.w(c,this)},n.subtract=function(t,r){return this.add(-1*t,r)},n.format=function(t){var r=this,e=this.$locale();if(!this.isValid())return e.invalidDate||B;var i=t||"YYYY-MM-DDTHH:mm:ssZ",s=o.z(this),u=this.$H,f=this.$m,c=this.$M,d=e.weekdays,S=e.months,M=function(l,w,U,A){return l&&(l[w]||l(r,i))||U[w].slice(0,A)},I=function(l){return o.s(u%12||12,l,"0")},C=e.meridiem||function(l,w,U){var A=l<12?"AM":"PM";return U?A.toLowerCase():A},T={YY:String(this.$y).slice(-2),YYYY:this.$y,M:c+1,MM:o.s(c+1,2,"0"),MMM:M(e.monthsShort,c,S,3),MMMM:M(S,c),D:this.$D,DD:o.s(this.$D,2,"0"),d:String(this.$W),dd:M(e.weekdaysMin,this.$W,d,2),ddd:M(e.weekdaysShort,this.$W,d,3),dddd:d[this.$W],H:String(u),HH:o.s(u,2,"0"),h:I(1),hh:I(2),a:C(u,f,!0),A:C(u,f,!1),m:String(f),mm:o.s(f,2,"0"),s:String(this.$s),ss:o.s(this.$s,2,"0"),SSS:o.s(this.$ms,3,"0"),Z:s};return i.replace(G,function(l,w){return w||T[l]||s.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(t,r,e){var i,s=o.p(r),u=h(t),f=(u.utcOffset()-this.utcOffset())*D,c=this-u,d=o.m(this,u);return d=(i={},i[_]=d/12,i[p]=d,i[J]=d/3,i[g]=(c-f)/6048e5,i[m]=(c-f)/864e5,i[$]=c/L,i[y]=c/D,i[v]=c/O,i)[s]||c,e?d:o.a(d)},n.daysInMonth=function(){return this.endOf(p).$D},n.$locale=function(){return x[this.$L]},n.locale=function(t,r){if(!t)return this.$L;var e=this.clone(),i=W(t,r,!0);return i&&(e.$L=i),e},n.clone=function(){return o.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},a}(),F=k.prototype;return h.prototype=F,[["$ms",Y],["$s",v],["$m",y],["$H",$],["$W",m],["$M",p],["$y",_],["$D",H]].forEach(function(a){F[a[1]]=function(n){return this.$g(n,a[0],a[1])}}),h.extend=function(a,n){return a.$i||(a(n,k,h),a.$i=!0),h},h.locale=W,h.isDayjs=N,h.unix=function(a){return h(1e3*a)},h.en=x[b],h.Ls=x,h.p={},h})})(P);var E=P.exports;const ht=tt({__name:"DateText",props:{component:null},setup(j){const V=j;ot($=>({"2dee5ce8":D.value}));const{propValue:O}=ft(V.component),D=Z("20px"),L=$=>{const m=$[0],{height:g}=m.contentRect;D.value=`${g}px`};let Y;const v=Z(E().format(O.base.format||"YYYY-MM-DD HH:mm:ss")),y=()=>{const $=O.base.format;v.value=E().format($||"YYYY-MM-DD HH:mm:ss")};return et(()=>{Y=setInterval(y,1e3)}),nt(()=>{clearInterval(Y)}),($,m)=>{const g=ct("resize");return rt((st(),it("span",null,[at(ut(v.value),1)])),[[g,L]])}}});var $t=K(ht,[["__scopeId","data-v-3953175b"]]);export{$t as default};
