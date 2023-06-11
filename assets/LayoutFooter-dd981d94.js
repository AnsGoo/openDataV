import{aA as b,aB as i,d as f,as as v,at as d,l,av as h,Q as m,ce as C,cf as x}from"./index-dfdef63a.js";const y=b("layout-footer",`
 transition:
 box-shadow .3s var(--n-bezier),
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
`,[i("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 bottom: 0;
 `),i("bordered",`
 border-top: solid 1px var(--n-border-color);
 `)]),p=Object.assign(Object.assign({},d.props),{inverted:Boolean,position:C,bordered:Boolean}),z=f({name:"LayoutFooter",props:p,setup(o){const{mergedClsPrefixRef:r,inlineThemeDisabled:n}=v(o),c=d("Layout","-layout-footer",y,x,o,r),a=l(()=>{const{common:{cubicBezierEaseInOut:u},self:s}=c.value,e={"--n-bezier":u};return o.inverted?(e["--n-color"]=s.footerColorInverted,e["--n-text-color"]=s.textColorInverted,e["--n-border-color"]=s.footerBorderColorInverted):(e["--n-color"]=s.footerColor,e["--n-text-color"]=s.textColor,e["--n-border-color"]=s.footerBorderColor),e}),t=n?h("layout-footer",l(()=>o.inverted?"a":"b"),a,o):void 0;return{mergedClsPrefix:r,cssVars:n?void 0:a,themeClass:t?.themeClass,onRender:t?.onRender}},render(){var o;const{mergedClsPrefix:r}=this;return(o=this.onRender)===null||o===void 0||o.call(this),m("div",{class:[`${r}-layout-footer`,this.themeClass,this.position&&`${r}-layout-footer--${this.position}-positioned`,this.bordered&&`${r}-layout-footer--bordered`],style:this.cssVars},this.$slots)}});export{z as N};
