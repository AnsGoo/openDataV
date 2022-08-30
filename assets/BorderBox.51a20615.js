import { u as h } from "./useProp.afe31ed3.js"; import { _ as p } from "./index.3086cced.js"; import { g as L, r as n, b1 as f, o as c, v as i, aI as s, u as r, bl as b, bk as k } from "./pnpm.52e5ead5.js"; const $ = { class: "dv-border-box-13" }, m = ["width", "height"], g = ["fill", "stroke", "d"], B = ["stroke"], x = ["stroke"], w = ["stroke", "d"], y = { class: "border-box-content" }, M = L({
  __name: "BorderBox", props: { component: null }, setup(d) {
    const u = d, { propValue: o } = h(u.component), e = n(150), t = n(150), _ = l => { const a = l[0].contentRect; e.value = a.width, t.value = a.height }; return (l, v) => {
      const a = k("resize"); return f((c(), i("div", $, [(c(), i("svg", { class: "dv-border-svg-container", width: e.value, height: t.value }, [s("path", {
        fill: r(o).base.backgroundColor, stroke: r(o).base.colorLeft, d: `
          M 5 20 L 5 10 L 12 3  L 60 3 L 68 10
          L ${e.value - 20} 10 L ${e.value - 5} 25
          L ${e.value - 5} ${t.value - 5} L 20 ${t.value - 5}
          L 5 ${t.value - 20} L 5 20
        `}, null, 8, g), s("path", { fill: "transparent", "stroke-width": "3", "stroke-linecap": "round", "stroke-dasharray": "10 5", stroke: r(o).base.colorLeft, d: "M 16 9 L 61 9" }, null, 8, B), s("path", { fill: "transparent", stroke: r(o).base.colorRight, d: "M 5 20 L 5 10 L 12 3  L 60 3 L 68 10" }, null, 8, x), s("path", { fill: "transparent", stroke: r(o).base.colorRight, d: `M ${e.value - 5} ${t.value - 30} L ${e.value - 5} ${t.value - 5} L ${e.value - 30} ${t.value - 5}` }, null, 8, w)], 8, m)), s("div", y, [b(l.$slots, "default", {}, void 0, !0)])])), [[a, _]])
    }
  }
}); var D = p(M, [["__scopeId", "data-v-0cb91586"]]); export { D as default };
