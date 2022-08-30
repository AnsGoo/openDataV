import { u as p } from "./useProp.afe31ed3.js"; import { _ as h } from "./index.3086cced.js"; import { g as f, r as n, b1 as b, o as a, v as i, aI as s, u as t, bk as x } from "./pnpm.52e5ead5.js"; const y = { class: "dv-border-box-2" }, m = ["width", "height"], $ = ["fill", "points"], g = ["stroke", "points"], B = ["stroke", "points"], k = ["fill"], w = ["fill", "cx"], z = ["fill", "cx", "cy"], C = ["fill", "cy"], D = f({
  __name: "BorderBox", props: { component: null }, setup(u) {
    const _ = u, { propValue: l } = p(_.component), e = n(150), o = n(150), v = r => { const c = r[0].contentRect; e.value = c.width, o.value = c.height }; return (r, d) => {
      const c = x("resize"); return b((a(), i("div", y, [(a(), i("svg", { class: "dv-border-svg-container", width: e.value, height: o.value }, [s("polygon", {
        fill: t(l).base.backgroundColor, points: `
          7, 7 ${e.value - 7}, 7 ${e.value - 7}, ${o.value - 7} 7, ${o.value - 7}
        `}, null, 8, $), s("polyline", { stroke: t(l).base.color1, points: `2, 2 ${e.value - 2} ,2 ${e.value - 2}, ${o.value - 2} 2, ${o.value - 2} 2, 2` }, null, 8, g), s("polyline", { stroke: t(l).base.color2, points: `6, 6 ${e.value - 6}, 6 ${e.value - 6}, ${o.value - 6} 6, ${o.value - 6} 6, 6` }, null, 8, B), s("circle", { fill: t(l).base.color1, cx: "11", cy: "11", r: "1" }, null, 8, k), s("circle", { fill: t(l).base.color1, cx: e.value - 11, cy: "11", r: "1" }, null, 8, w), s("circle", { fill: t(l).base.color1, cx: e.value - 11, cy: o.value - 11, r: "1" }, null, 8, z), s("circle", { fill: t(l).base.color1, cx: "11", cy: o.value - 11, r: "1" }, null, 8, C)], 8, m))])), [[c, v]])
    }
  }
}); var H = h(D, [["__scopeId", "data-v-7518b734"]]); export { H as default };
