import { u as y } from "./useProp.afe31ed3.js"; import { _ as B, h as d } from "./index.3086cced.js"; import { g as L, r as n, a as u, b1 as w, o as m, v as $, aI as e, u as s, bk as I, aW as C, aX as z } from "./pnpm.52e5ead5.js"; const k = r => (C("data-v-742a6da7"), r = r(), z(), r), D = { class: "dv-border-box-8" }, M = ["width", "height"], S = ["id", "d"], N = ["id"], R = k(() => e("stop", { offset: "0%", "stop-color": "#fff", "stop-opacity": "1" }, null, -1)), V = k(() => e("stop", { offset: "100%", "stop-color": "#fff", "stop-opacity": "0" }, null, -1)), E = [R, V], G = ["id"], H = ["fill"], P = ["dur", "path"], W = ["fill", "points"], X = ["stroke", "xlink:href"], j = ["stroke", "xlink:href", "mask"], q = ["from", "to", "dur"], A = L({ __name: "BorderBox", props: { component: null }, setup(r) { const b = r, { propValue: a } = y(b.component), t = n(150), o = n(150), l = n(`border-box-8-path-${d()}`), c = n(`border-box-8-gradient-${d()}`), _ = n(`border-box-8-mask-${d()}`), x = f => { const i = f[0].contentRect; t.value = i.width, o.value = i.height }, p = u(() => a.base.dur ? a.base.dur : 3), h = u(() => (t.value + o.value - 5) * 2), v = u(() => a.base.reverse ? `M 2.5, 2.5 L 2.5, ${o.value - 2.5} L ${t.value - 2.5}, ${o.value - 2.5} L ${t.value - 2.5}, 2.5 L 2.5, 2.5` : `M2.5, 2.5 L${t.value - 2.5}, 2.5 L${t.value - 2.5}, ${o.value - 2.5} L2.5, ${o.value - 2.5} L2.5, 2.5`); return (f, g) => { const i = I("resize"); return w((m(), $("div", D, [(m(), $("svg", { class: "dv-border-svg-container", width: t.value, height: o.value }, [e("defs", null, [e("path", { id: l.value, d: s(v), fill: "transparent" }, null, 8, S), e("radialGradient", { id: c.value, cx: "50%", cy: "50%", r: "50%" }, E, 8, N), e("mask", { id: _.value }, [e("circle", { cx: "0", cy: "0", r: "150", fill: `url(#${c.value})` }, [e("animateMotion", { dur: `${s(p)}s`, path: s(v), rotate: "auto", repeatCount: "indefinite" }, null, 8, P)], 8, H)], 8, G)]), e("polygon", { fill: s(a).base.backgroundColor, points: `5, 5 ${t.value - 5}, 5 ${t.value - 5} ${o.value - 5} 5, ${o.value - 5}` }, null, 8, W), e("use", { stroke: s(a).base.colorLeft, "stroke-width": "1", "xlink:href": `#${l.value}` }, null, 8, X), e("use", { stroke: s(a).base.colorRight, "stroke-width": "3", "xlink:href": `#${l.value}`, mask: `url(#${_.value})` }, [e("animate", { attributeName: "stroke-dasharray", from: `0, ${s(h)}`, to: `${s(h)}, 0`, dur: `${s(p)}s`, repeatCount: "indefinite" }, null, 8, q)], 8, j)], 8, M))])), [[i, x]]) } } }); var O = B(A, [["__scopeId", "data-v-742a6da7"]]); export { O as default };
