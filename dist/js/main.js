"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 1.20.5
 * DATE: 2018-05-21
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : void 0 || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";

  _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (a, b) {
    var c,
        d,
        e,
        f,
        g = function g() {
      a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio;
    },
        h = _gsScope._gsDefine.globals,
        i = {},
        j = g.prototype = new a("css");

    j.constructor = g, g.version = "1.20.5", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
      top: j,
      right: j,
      bottom: j,
      left: j,
      width: j,
      height: j,
      fontSize: j,
      padding: j,
      margin: j,
      perspective: j,
      lineHeight: ""
    };

    var k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
        t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
        u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
        v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
        w = /(?:\d|\-|\+|=|#|\.)*/g,
        x = /opacity *= *([^)]*)/i,
        y = /opacity:([^;]*)/i,
        z = /alpha\(opacity *=.+?\)/i,
        A = /^(rgb|hsl)/,
        B = /([A-Z])/g,
        C = /-([a-z])/gi,
        D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
        E = function E(a, b) {
      return b.toUpperCase();
    },
        F = /(?:Left|Right|Width)/i,
        G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
        H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
        I = /,(?=[^\)]*(?:\(|$))/gi,
        J = /[\s,\(]/i,
        K = Math.PI / 180,
        L = 180 / Math.PI,
        M = {},
        N = {
      style: {}
    },
        O = _gsScope.document || {
      createElement: function createElement() {
        return N;
      }
    },
        P = function P(a, b) {
      return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O.createElement(a);
    },
        Q = P("div"),
        R = P("img"),
        S = g._internals = {
      _specialProps: i
    },
        T = (_gsScope.navigator || {}).userAgent || "",
        U = function () {
      var a = T.indexOf("Android"),
          b = P("a");
      return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf("Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1;
    }(),
        V = function V(a) {
      return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1;
    },
        W = function W(a) {
      _gsScope.console && console.log(a);
    },
        X = "",
        Y = "",
        Z = function Z(a, b) {
      b = b || Q;
      var c,
          d,
          e = b.style;
      if (void 0 !== e[a]) return a;

      for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];) {
        ;
      }

      return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) : null;
    },
        $ = ("undefined" != typeof window ? window : O.defaultView || {
      getComputedStyle: function getComputedStyle() {}
    }).getComputedStyle,
        _ = g.getStyle = function (a, b, c, d, e) {
      var f;
      return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a);
    },
        aa = S.convertToPixels = function (a, c, d, e, f) {
      if ("px" === e || !e && "lineHeight" !== c) return d;
      if ("auto" === e || !d) return 0;
      var h,
          i,
          j,
          k = F.test(c),
          l = a,
          m = Q.style,
          n = 0 > d,
          o = 1 === d;
      if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e) {
        if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);else {
          if (m.cssText = "border:0 solid red;position:" + _(a, "position") + ";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) && "rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;else {
            if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
            m[k ? "width" : "height"] = d + e;
          }
          l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (h = aa(a, c, d, e, !0));
        }
      } else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a.style.lineHeight = i;
      return o && (h /= 100), n ? -h : h;
    },
        ba = S.calculateOffset = function (a, b, c) {
      if ("absolute" !== _(a, "position", c)) return 0;

      var d = "left" === b ? "Left" : "Top",
          e = _(a, "margin" + d, c);

      return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0);
    },
        ca = function ca(a, b) {
      var c,
          d,
          e,
          f = {};
      if (b = b || $(a, null)) {
        if (c = b.length) for (; --c > -1;) {
          e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e.replace(C, E)] = b.getPropertyValue(e));
        } else for (c in b) {
          (-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
        }
      } else if (b = a.currentStyle || a.style) for (c in b) {
        "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
      }
      return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z = d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ), f.filters && delete f.filters, f;
    },
        da = function da(a, b, c, d, e) {
      var f,
          g,
          h,
          i = {},
          j = a.style;

      for (g in c) {
        "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
      }

      if (d) for (g in d) {
        "className" !== g && (i[g] = d[g]);
      }
      return {
        difs: i,
        firstMPT: h
      };
    },
        ea = {
      width: ["Left", "Right"],
      height: ["Top", "Bottom"]
    },
        fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
        ga = function ga(a, b, c) {
      if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;
      if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
      var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
          e = ea[b],
          f = e.length;

      for (c = c || $(a, null); --f > -1;) {
        d -= parseFloat(_(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
      }

      return d;
    },
        ha = function ha(a, b) {
      if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
      (null == a || "" === a) && (a = "0 0");
      var c,
          d = a.split(" "),
          e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
          f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];

      if (d.length > 3 && !b) {
        for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) {
          a.push(ha(d[c]));
        }

        return a.join(",");
      }

      return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), ("center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e = "50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !== e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy = parseFloat(f.replace(v, "")), b.v = a), b || a;
    },
        ia = function ia(a, b) {
      return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) || 0;
    },
        ja = function ja(a, b) {
      return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a) || 0;
    },
        ka = function ka(a, b, c, d) {
      var e,
          f,
          g,
          h,
          i,
          j = 1e-6;
      return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h && h > -j && (h = 0), h;
    },
        la = {
      aqua: [0, 255, 255],
      lime: [0, 255, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, 255],
      navy: [0, 0, 128],
      white: [255, 255, 255],
      fuchsia: [255, 0, 255],
      olive: [128, 128, 0],
      yellow: [255, 255, 0],
      orange: [255, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [255, 0, 0],
      pink: [255, 192, 203],
      cyan: [0, 255, 255],
      transparent: [255, 255, 255, 0]
    },
        ma = function ma(a, b, c) {
      return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 : .5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0;
    },
        na = g.parseColor = function (a, b) {
      var c, d, e, f, g, h, i, j, k, l, m;
      if (a) {
        if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];else {
          if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a]) c = la[a];else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];else if ("hsl" === a.substr(0, 3)) {
            if (c = m = a.match(s), b) {
              if (-1 !== a.indexOf("=")) return a.match(t);
            } else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e, c.length > 3 && (c[3] = Number(c[3])), c[0] = ma(g + 1 / 3, d, e), c[1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e);
          } else c = a.match(s) || la.transparent;
          c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (c[3] = Number(c[3]));
        }
      } else c = la.black;
      return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e, f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k, h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f > e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c;
    },
        oa = function oa(a, b) {
      var c,
          d,
          e,
          f = a.match(pa) || [],
          g = 0,
          h = "";
      if (!f.length) return a;

      for (c = 0; c < f.length; c++) {
        d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ? "hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")) + ")";
      }

      return h + a.substr(g);
    },
        pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";

    for (j in la) {
      pa += "|" + j + "\\b";
    }

    pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function (a) {
      var b,
          c = a[0] + " " + a[1];
      pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0;
    }, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);

    var qa = function qa(a, b, c, d) {
      if (null == a) return function (a) {
        return a;
      };
      var e,
          f = b ? (a.match(pa) || [""])[0] : "",
          g = a.split(f).join("").match(u) || [],
          h = a.substr(0, a.indexOf(g[0])),
          i = ")" === a.charAt(a.length - 1) ? ")" : "",
          j = -1 !== a.indexOf(" ") ? " " : ",",
          k = g.length,
          l = k > 0 ? g[0].replace(s, "") : "";
      return k ? e = b ? function (a) {
        var b, m, n, o;
        if ("number" == typeof a) a += l;else if (d && I.test(a)) {
          for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) {
            o[n] = e(o[n]);
          }

          return o.join(",");
        }
        if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m.length, k > n--) for (; ++n < k;) {
          m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
        }
        return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "");
      } : function (a) {
        var b, f, m;
        if ("number" == typeof a) a += l;else if (d && I.test(a)) {
          for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) {
            f[m] = e(f[m]);
          }

          return f.join(",");
        }
        if (b = a.match(u) || [], m = b.length, k > m--) for (; ++m < k;) {
          b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
        }
        return h + b.join(j) + i;
      } : function (a) {
        return a;
      };
    },
        ra = function ra(a) {
      return a = a.split(","), function (b, c, d, e, f, g, h) {
        var i,
            j = (c + "").split(" ");

        for (h = {}, i = 0; 4 > i; i++) {
          h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
        }

        return e.parse(b, h, f, g);
      };
    },
        sa = (S._setPluginRatio = function (a) {
      this.plugin.setRatio(a);

      for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;) {
        b = h[i.v], i.r ? b = i.r(b) : j > b && b > -j && (b = 0), i.t[i.p] = b, i = i._next;
      }

      if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod.call(this._tween, h.rotation, this.t, this._tween) : h.rotation), 1 === a || 0 === a) for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
        if (c = i.t, c.type) {
          if (1 === c.type) {
            for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) {
              e += c["xn" + d] + c["xs" + (d + 1)];
            }

            c[f] = e;
          }
        } else c[f] = c.s + c.xs0;

        i = i._next;
      }
    }, function (a, b, c, d, e) {
      this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d);
    }),
        ta = (S._parseToProxy = function (a, b, c, d, e, f) {
      var g,
          h,
          i,
          j,
          k,
          l = d,
          m = {},
          n = {},
          o = c._transform,
          p = M;

      for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
        if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d, "s", h, j, d.r), d.c = 0), 1 === d.type)) for (g = d.l; --g > 0;) {
          i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
        }
        d = d._next;
      }

      return {
        proxy: m,
        end: n,
        firstMPT: j,
        pt: k
      };
    }, S.CSSPropTween = function (a, b, d, e, g, h, i, j, k, l, m) {
      this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta || f.push(this.n), this.r = j ? "function" == typeof j ? j : Math.round : j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this);
    }),
        ua = function ua(a, b, c, d, e, f) {
      var g = new ta(a, b, c, d - c, e, -1, f);
      return g.b = c, g.e = g.xs0 = d, g;
    },
        va = g.parseComplex = function (a, b, c, d, e, f, h, i, j, l) {
      c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g.colorStringFilter(d), c = d[0], d = d[1]);
      var m,
          n,
          o,
          p,
          u,
          v,
          w,
          x,
          y,
          z,
          A,
          B,
          C,
          D = c.split(", ").join(",").split(" "),
          E = d.split(", ").join(",").split(" "),
          F = D.length,
          G = k !== !1;

      for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (-1 !== (d + c).indexOf("rgb") || -1 !== (d + c).indexOf("hsl") ? (D = D.join(" ").replace(I, ", ").split(" "), E = E.join(" ").replace(I, ", ").split(" ")) : (D = D.join(" ").split(",").join(", ").split(" "), E = E.join(" ").split(",").join(", ").split(" ")), F = D.length), F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++) {
        if (p = D[m], u = E[m] + "", x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u, x), u.replace(t, ""), G && -1 !== u.indexOf("px") ? Math.round : !1, !0);else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""), C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length + u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" : "transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ? h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1).appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0], ",", Math.round, !0).appendXtra("", p[1], u[1] - p[1], ",", Math.round).appendXtra("", p[2], u[2] - p[2], y ? "," : B, Math.round), y && (p = p.length < 4 ? 1 : p[3], h.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex = 0;else if (v = p.match(s)) {
          if (w = u.match(t), !w || w.length !== v.length) return h;

          for (o = 0, n = 0; n < v.length; n++) {
            A = v[n], z = p.indexOf(A, o), h.appendXtra(p.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A.length, 2) ? Math.round : !1, 0 === n), o = z + A.length;
          }

          h["xs" + h.l] += p.substr(o);
        } else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
      }

      if (-1 !== d.indexOf("=") && h.data) {
        for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) {
          B += h["xs" + m] + h.data["xn" + m];
        }

        h.e = B + h["xs" + m];
      }

      return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h;
    },
        wa = 9;

    for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) {
      j["xn" + wa] = 0, j["xs" + wa] = "";
    }

    j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function (a, b, c, d, e, f) {
      var g = this,
          h = g.l;
      return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = {
        s: b + c
      }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g);
    };

    var xa = function xa(a, b) {
      b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0;
    },
        ya = S._registerComplexSpecialProp = function (a, b, c) {
      "object" != _typeof(b) && (b = {
        parser: c
      });
      var d,
          e,
          f = a.split(","),
          g = b.defaultValue;

      for (c = c || [g], d = 0; d < f.length; d++) {
        b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new xa(f[d], b);
      }
    },
        za = S._registerPluginProp = function (a) {
      if (!i[a]) {
        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
        ya(a, {
          parser: function parser(a, c, d, e, f, g, j) {
            var k = h.com.greensock.plugins[b];
            return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (W("Error: " + b + " js file not loaded."), f);
          }
        });
      }
    };

    j = xa.prototype, j.parseComplex = function (a, b, c, d, e, f) {
      var g,
          h,
          i,
          j,
          k,
          l,
          m = this.keyword;

      if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
        for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) {
          b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 === k && (h[g] += " " + m)));
        }

        b = h.join(", "), c = i.join(", ");
      }

      return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
    }, j.parse = function (a, b, c, d, f, g, h) {
      return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this.format(b), f, g);
    }, g.registerSpecialProp = function (a, b, c) {
      ya(a, {
        parser: function parser(a, d, e, f, g, h, i) {
          var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
          return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j;
        },
        priority: c
      });
    }, g.useSVGTransformAttr = !0;

    var Aa,
        Ba = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
        Ca = Z("transform"),
        Da = X + "transform",
        Ea = Z("transformOrigin"),
        Fa = null !== Z("perspective"),
        Ga = S.Transform = function () {
      this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1;
    },
        Ha = _gsScope.SVGElement,
        Ia = function Ia(a, b, c) {
      var d,
          e = O.createElementNS("http://www.w3.org/2000/svg", a),
          f = /([a-z])([A-Z])/g;

      for (d in c) {
        e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
      }

      return b.appendChild(e), e;
    },
        Ja = O.documentElement || {},
        Ka = function () {
      var a,
          b,
          c,
          d = p || /Android/i.test(T) && !_gsScope.chrome;
      return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, {
        width: 100,
        height: 50,
        x: 100
      }), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja.removeChild(a)), d;
    }(),
        La = function La(a, b, c, d, e, f) {
      var h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v = a._gsTransform,
          w = Qa(a, !0);
      v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
        x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
        y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
        width: 0,
        height: 0
      }), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin = k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0], n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin = h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v = c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) : v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "));
    },
        Ma = function Ma(a) {
      var b,
          c = P("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
          d = this.parentNode,
          e = this.nextSibling,
          f = this.style.cssText;
      if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
        b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma;
      } catch (g) {} else this._originalGetBBox && (b = this._originalGetBBox());
      return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style.cssText = f, b;
    },
        Na = function Na(a) {
      try {
        return a.getBBox();
      } catch (b) {
        return Ma.call(a, !0);
      }
    },
        Oa = function Oa(a) {
      return !(!Ha || !a.getCTM || a.parentNode && !a.ownerSVGElement || !Na(a));
    },
        Pa = [1, 0, 0, 1, 0, 0],
        Qa = function Qa(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h,
          i = a._gsTransform || new Ga(),
          j = 1e5,
          k = a.style;
      if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G), d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1].substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = !$(a) || "none" === $(a).display) && a.parentNode || (h && (f = k.display, k.display = "block"), a.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d || "none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k, "display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute("transform"), c && e && (e = a.transform.baseVal.consolidate().matrix, d = "matrix(" + e.a + "," + e.b + "," + e.c + "," + e.d + "," + e.e + "," + e.f + ")", c = 0)), c) return Pa;

      for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) {
        f = Number(e[wa]), e[wa] = (g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
      }

      return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e;
    },
        Ra = S.getTransform = function (a, c, d, e) {
      if (a._gsTransform && d && !e) return a._gsTransform;
      var f,
          h,
          i,
          j,
          k,
          l,
          m = d ? a._gsTransform || new Ga() : new Ga(),
          n = m.scaleX < 0,
          o = 2e-5,
          p = 1e5,
          q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
          r = parseFloat(g.defaultTransformPerspective) || 0;

      if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m, a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(a), f !== Pa) {
        if (16 === f.length) {
          var s,
              t,
              u,
              v,
              w,
              x = f[0],
              y = f[1],
              z = f[2],
              A = f[3],
              B = f[4],
              C = f[5],
              D = f[6],
              E = f[7],
              F = f[8],
              G = f[9],
              H = f[10],
              I = f[12],
              J = f[13],
              K = f[14],
              M = f[11],
              N = Math.atan2(D, H);
          m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K + m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w, F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w + M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L, N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G * w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w + M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L, N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C * w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v - F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY = 180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x + y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) * p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 | 0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 > M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C));
        } else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX && !m.rotationY) {
          var O = f.length >= 6,
              P = O ? f[0] : 1,
              Q = f[1] || 0,
              R = f[2] || 0,
              S = O ? f[3] : 1;
          m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY = j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0, m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S));
        }

        Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ? 180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m.zOrigin = q;

        for (h in m) {
          m[h] < o && m[h] > -o && (m[h] = 0);
        }
      }

      return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001, function () {
        Va(a.style, Ca);
      }) : !Aa && a.getAttribute("transform") && b.delayedCall(.001, function () {
        a.removeAttribute("transform");
      }))), m;
    },
        Sa = function Sa(a) {
      var b,
          c,
          d = this.data,
          e = -d.rotation * K,
          f = e + d.skewX * K,
          g = 1e5,
          h = (Math.cos(e) * d.scaleX * g | 0) / g,
          i = (Math.sin(e) * d.scaleX * g | 0) / g,
          j = (Math.sin(f) * -d.scaleY * g | 0) / g,
          k = (Math.cos(f) * d.scaleY * g | 0) / g,
          l = this.t.style,
          m = this.t.currentStyle;

      if (m) {
        c = i, i = -j, j = -c, b = m.filter, l.filter = "";
        var n,
            o,
            q = this.t.offsetWidth,
            r = this.t.offsetHeight,
            s = "absolute" !== m.position,
            t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
            u = d.x + q * d.xPercent / 100,
            v = d.y + r * d.yPercent / 100;

        if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t += ", sizingMethod='auto expand')", -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
          var y,
              z,
              A,
              B = 8 > p ? 1 : -1;

          for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v), wa = 0; 4 > wa; wa++) {
            z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A = c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa || 2 === wa ? 1 : B))) + "px";
          }
        }
      }
    },
        Ta = S.set3DTransformRatio = S.setTransformRatio = function (a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          o,
          p,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x,
          y,
          z = this.data,
          A = this.t.style,
          B = z.rotation,
          C = z.rotationX,
          D = z.rotationY,
          E = z.scaleX,
          F = z.scaleY,
          G = z.scaleZ,
          H = z.x,
          I = z.y,
          J = z.z,
          L = z.svg,
          M = z.perspective,
          N = z.force3D,
          O = z.skewY,
          P = z.skewX;
      if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void (B || P || L ? (B *= K, x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b, g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(), H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")", L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
      if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G = 2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r = c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r;else {
        if (!(D || C || 1 !== G || M || L)) return void (A[Ca] = (z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" : "translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E || 1 !== F ? " scale(" + E + "," + F + ")" : ""));
        c = g = 1, d = f = 0;
      }
      k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",", w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e = c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m = o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t), 1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F, m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H += e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) + v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w : j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v + (q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ")", A[Ca] = u;
    };

    j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j.scaleZ = 1, ya("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
      parser: function parser(a, b, c, d, f, h, i) {
        if (d._lastParsedTransform === i) return f;
        d._lastParsedTransform = i;
        var j,
            k = i.scale && "function" == typeof i.scale ? i.scale : 0;
        "function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));
        var l,
            m,
            n,
            o,
            p,
            s,
            t,
            u,
            v,
            w = a._gsTransform,
            x = a.style,
            y = 1e-6,
            z = Ba.length,
            A = i,
            B = {},
            C = "transformOrigin",
            D = Ra(a, e, !0, A.parseTransform),
            E = A.transform && ("function" == typeof A.transform ? A.transform(r, q) : A.transform);
        if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d._transform = D, E && "string" == typeof E && Ca) m = Q.style, m[Ca] = E, m.display = "block", m.position = "absolute", -1 !== E.indexOf("%") && (m.width = _(a, "width"), m.height = _(a, "height")), O.body.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin || A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] + t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body.removeChild(Q), l.perspective || (l.perspective = D.perspective), null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null != A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent));else if ("object" == _typeof(A)) {
          if (l = {
            scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
            scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
            scaleZ: ja(A.scaleZ, D.scaleZ),
            x: ja(A.x, D.x),
            y: ja(A.y, D.y),
            z: ja(A.z, D.z),
            xPercent: ja(A.xPercent, D.xPercent),
            yPercent: ja(A.yPercent, D.yPercent),
            perspective: ja(A.transformPerspective, D.perspective)
          }, p = A.directionalRotation, null != p) if ("object" == _typeof(p)) for (m in p) {
            A[m] = p[m];
          } else A.rotation = p;
          "string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D.yPercent)), l.rotation = ka("rotation" in A ? A.rotation : "shortRotation" in A ? A.shortRotation + "_short" : "rotationZ" in A ? A.rotationZ : D.rotation, D.rotation, "rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A.rotationX : "shortRotationX" in A ? A.shortRotationX + "_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l.rotationY = ka("rotationY" in A ? A.rotationY : "shortRotationY" in A ? A.shortRotationY + "_short" : D.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX = ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY);
        }

        for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --z > -1;) {
          v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] || null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
        }

        return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset, t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D, "yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1, "50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ? parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0, f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 = f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i.scale = k), f;
      },
      prefix: !0
    }), ya("boxShadow", {
      defaultValue: "0px 0px 0px 0px #999",
      prefix: !0,
      color: !0,
      multi: !0,
      keyword: "inset"
    }), ya("borderRadius", {
      defaultValue: "0px",
      parser: function parser(a, b, c, f, g, h) {
        b = this.format(b);
        var i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
            z = a.style;

        for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b.split(" "), j = 0; j < y.length; j++) {
          this.p.indexOf("border") && (y[j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o = parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1), u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *= parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || "") : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s && (s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a, "borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w / r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"), m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w + "px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p + s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
        }

        return g;
      },
      prefix: !0,
      formatter: qa("0px 0px 0px 0px", !1, !0)
    }), ya("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
      defaultValue: "0px",
      parser: function parser(a, b, c, d, f, g) {
        return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(b), !1, "0px", f);
      },
      prefix: !0,
      formatter: qa("0px 0px", !1, !0)
    }), ya("backgroundPosition", {
      defaultValue: "0 0",
      parser: function parser(a, b, c, d, f, g) {
        var h,
            i,
            j,
            k,
            l,
            m,
            n = "background-position",
            o = e || $(a, null),
            q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
            r = this.format(b);

        if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",").length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m && "none" !== m)) {
          for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j = 2; --j > -1;) {
            q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : parseFloat(q) / l * 100 + "%");
          }

          q = h.join(" ");
        }

        return this.parseComplex(a.style, q, r, f, g);
      },
      formatter: ha
    }), ya("backgroundSize", {
      defaultValue: "0 0",
      formatter: function formatter(a) {
        return a += "", "co" === a.substr(0, 2) ? a : ha(-1 === a.indexOf(" ") ? a + " " + a : a);
      }
    }), ya("perspective", {
      defaultValue: "0px",
      prefix: !0
    }), ya("perspectiveOrigin", {
      defaultValue: "50% 50%",
      prefix: !0
    }), ya("transformStyle", {
      prefix: !0
    }), ya("backfaceVisibility", {
      prefix: !0
    }), ya("userSelect", {
      prefix: !0
    }), ya("margin", {
      parser: ra("marginTop,marginRight,marginBottom,marginLeft")
    }), ya("padding", {
      parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft")
    }), ya("clip", {
      defaultValue: "rect(0px,0px,0px,0px)",
      parser: function parser(a, b, c, d, f, g) {
        var h, i, j;
        return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g);
      }
    }), ya("textShadow", {
      defaultValue: "0px 0px 0px #999",
      color: !0,
      multi: !0
    }), ya("autoRound,strictUnits", {
      parser: function parser(a, b, c, d, e) {
        return e;
      }
    }), ya("border", {
      defaultValue: "0px solid #000",
      parser: function parser(a, b, c, d, f, g) {
        var h = _(a, "borderTopWidth", e, !1, "0px"),
            i = this.format(b).split(" "),
            j = i[0].replace(w, "");

        return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) + j), this.parseComplex(a.style, this.format(h + " " + _(a, "borderTopStyle", e, !1, "solid") + " " + _(a, "borderTopColor", e, !1, "#000")), i.join(" "), f, g);
      },
      color: !0,
      formatter: function formatter(a) {
        var b = a.split(" ");
        return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0];
      }
    }), ya("borderWidth", {
      parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
    }), ya("float,cssFloat,styleFloat", {
      parser: function parser(a, b, c, d, e, f) {
        var g = a.style,
            h = "cssFloat" in g ? "cssFloat" : "styleFloat";
        return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
      }
    });

    var Ua = function Ua(a) {
      var b,
          c = this.t,
          d = c.filter || _(this.data, "filter") || "",
          e = this.s + this.c * a | 0;
      100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data, "filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(x, "opacity=" + e));
    };

    ya("opacity,alpha,autoAlpha", {
      defaultValue: "1",
      parser: function parser(a, b, c, d, f, g) {
        var h = parseFloat(_(a, "opacity", e, !1, "1")),
            i = a.style,
            j = "autoAlpha" === c;
        return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f = new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f = new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f;
      }
    });

    var Va = function Va(a, b) {
      b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a.removeAttribute(b));
    },
        Wa = function Wa(a) {
      if (this.t._gsClassPT = this, 1 === a || 0 === a) {
        this.t.setAttribute("class", 0 === a ? this.b : this.e);

        for (var b = this.data, c = this.t.style; b;) {
          b.v ? c[b.p] = b.v : Va(c, b.p), b = b._next;
        }

        1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null);
      } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e);
    };

    ya("className", {
      parser: function parser(a, b, d, f, g, h, i) {
        var j,
            k,
            l,
            m,
            n,
            o = a.getAttribute("class") || "",
            p = a.style.cssText;

        if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
          for (m = {}, n = l.data; n;) {
            m[n.p] = 1, n = n._next;
          }

          l.setRatio(1);
        }

        return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e), j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h);
      }
    });

    var Xa = function Xa(a) {
      if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
        var b,
            c,
            d,
            e,
            f,
            g = this.t.style,
            h = i.transform.parse;
        if ("all" === this.e) g.cssText = "", e = !0;else for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) {
          c = b[d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ? Ea : i[c].p), Va(g, c);
        }
        e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform));
      }
    };

    for (ya("clearProps", {
      parser: function parser(a, b, d, e, f) {
        return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f;
      }
    }), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) {
      za(j[wa]);
    }

    j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function (a, b, h, j) {
      if (!a.nodeType) return !1;
      this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;
      var n,
          p,
          s,
          t,
          u,
          v,
          w,
          x,
          z,
          A = a.style;

      if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a, e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this._firstPT = p = i.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
        for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a, "zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A, "zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom = 1, s = p; s && s._next;) {
          s = s._next;
        }

        x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio = Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1, f.pop();
      }

      if (c) {
        for (; p;) {
          for (v = p._next, s = t; s && s.pr > p.pr;) {
            s = s._next;
          }

          (p._prev = s ? s._prev : u) ? p._prev._next = p : t = p, (p._next = s) ? s._prev = p : u = p, p = v;
        }

        this._firstPT = t;
      }

      return !0;
    }, j.parse = function (a, b, c, f) {
      var g,
          h,
          j,
          l,
          m,
          n,
          o,
          p,
          s,
          t,
          u = a.style;

      for (g in b) {
        if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n, g, this, c, f, b);else {
          if ("--" === g.substr(0, 2)) {
            this._tween._propLookup[g] = this._addTween.call(this._tween, a.style, "setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g);
            continue;
          }

          m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n = na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c = va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ga(a, g, e), o = "px") : "left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1), t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p || "lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o), "%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p || "rem" === p || "vw" === p || "vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l, p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n || n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : W("invalid " + g + " tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p));
        }
        f && c && !c.plugin && (c.plugin = f);
      }

      return c;
    }, j.setRatio = function (a) {
      var b,
          c,
          d,
          e = this._firstPT,
          f = 1e-6;
      if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time) {
        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6) for (; e;) {
          if (b = e.c * a + e.s, e.r ? b = e.r(b) : f > b && b > -f && (b = 0), e.type) {
            if (1 === e.type) {
              if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;else {
                for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) {
                  c += e["xn" + d] + e["xs" + (d + 1)];
                }

                e.t[e.p] = c;
              }
            } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
          } else e.t[e.p] = b + e.xs0;
          e = e._next;
        } else for (; e;) {
          2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
        }
      } else for (; e;) {
        if (2 !== e.type) {
          if (e.r && -1 !== e.type) {
            if (b = e.r(e.s + e.c), e.type) {
              if (1 === e.type) {
                for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) {
                  c += e["xn" + d] + e["xs" + (d + 1)];
                }

                e.t[e.p] = c;
              }
            } else e.t[e.p] = b + e.xs0;
          } else e.t[e.p] = e.e;
        } else e.setRatio(a);
        e = e._next;
      }
    }, j._enableTransforms = function (a) {
      this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3;
    };

    var Ya = function Ya(a) {
      this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0);
    };

    j._addLazySet = function (a, b, c) {
      var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);
      d.e = c, d.setRatio = Ya, d.data = this;
    }, j._linkCSSP = function (a, b, c, d) {
      return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a;
    }, j._mod = function (a) {
      for (var b = this._firstPT; b;) {
        "function" == typeof a[b.p] && (b.r = a[b.p]), b = b._next;
      }
    }, j._kill = function (b) {
      var c,
          d,
          e,
          f = b;

      if (b.autoAlpha || b.alpha) {
        f = {};

        for (d in b) {
          f[d] = b[d];
        }

        f.opacity = 1, f.autoAlpha && (f.visibility = 1);
      }

      for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), c = this._firstPT; c;) {
        c.plugin && c.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
      }

      return a.prototype._kill.call(this, f);
    };

    var Za = function Za(a, b, c) {
      var d, e, f, g;
      if (a.slice) for (e = a.length; --e > -1;) {
        Za(a[e], b, c);
      } else for (d = a.childNodes, e = d.length; --e > -1;) {
        f = d[e], g = f.type, f.style && (b.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Za(f, b, c);
      }
    };

    return g.cascadeTo = function (a, c, d) {
      var e,
          f,
          g,
          h,
          i = b.to(a, c, d),
          j = [i],
          k = [],
          l = [],
          m = [],
          n = b._internals.reservedProps;

      for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0, !0, !0), i._enabled(!0), e = m.length; --e > -1;) {
        if (f = da(m[e], k[e], l[e]), f.firstMPT) {
          f = f.difs;

          for (g in d) {
            n[g] && (f[g] = d[g]);
          }

          h = {};

          for (g in f) {
            h[g] = k[e][g];
          }

          j.push(b.fromTo(m[e], c, h, f));
        }
      }

      return j;
    }, a.activate([g]), g;
  }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a) {
  "use strict";

  var b = function b() {
    return (_gsScope.GreenSockGlobals || _gsScope)[a];
  };

  "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = b()) : "function" == typeof define && define.amd && define(["TweenLite"], b);
}("CSSPlugin");
"use strict";

/*!
 * VERSION: 1.16.0
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : void 0 || window;

(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";

  _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (a) {
    var b,
        c,
        d,
        e,
        f = _gsScope.GreenSockGlobals || _gsScope,
        g = f.com.greensock,
        h = 2 * Math.PI,
        i = Math.PI / 2,
        j = g._class,
        k = function k(b, c) {
      var d = j("easing." + b, function () {}, !0),
          e = d.prototype = new a();
      return e.constructor = d, e.getRatio = c, d;
    },
        l = a.register || function () {},
        m = function m(a, b, c, d, e) {
      var f = j("easing." + a, {
        easeOut: new b(),
        easeIn: new c(),
        easeInOut: new d()
      }, !0);
      return l(f, a), f;
    },
        n = function n(a, b, c) {
      this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a);
    },
        o = function o(b, c) {
      var d = j("easing." + b, function (a) {
        this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1;
      }, !0),
          e = d.prototype = new a();
      return e.constructor = d, e.getRatio = c, e.config = function (a) {
        return new d(a);
      }, d;
    },
        p = m("Back", o("BackOut", function (a) {
      return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
    }), o("BackIn", function (a) {
      return a * a * ((this._p1 + 1) * a - this._p1);
    }), o("BackInOut", function (a) {
      return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
    })),
        q = j("easing.SlowMo", function (a, b, c) {
      b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0;
    }, !0),
        r = q.prototype = new a();

    return r.constructor = q, r.getRatio = function (a) {
      var b = a + (.5 - a) * this._p;
      return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 === a ? 0 : 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b;
    }, q.ease = new q(.7, .7), r.config = q.config = function (a, b, c) {
      return new q(a, b, c);
    }, b = j("easing.SteppedEase", function (a, b) {
      a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0;
    }, !0), r = b.prototype = new a(), r.constructor = b, r.getRatio = function (a) {
      return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) * this._p1;
    }, r.config = b.config = function (a, c) {
      return new b(a, c);
    }, c = j("easing.ExpoScaleEase", function (a, b, c) {
      this._p1 = Math.log(b / a), this._p2 = b - a, this._p3 = a, this._ease = c;
    }, !0), r = c.prototype = new a(), r.constructor = c, r.getRatio = function (a) {
      return this._ease && (a = this._ease.getRatio(a)), (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2;
    }, r.config = c.config = function (a, b, d) {
      return new c(a, b, d);
    }, d = j("easing.RoughEase", function (b) {
      b = b || {};

      for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), m = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --m > -1;) {
        c = o ? Math.random() : 1 / l * m, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f * f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math.random() * e - .5 * e : m % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = {
          x: c,
          y: d
        };
      }

      for (j.sort(function (a, b) {
        return a.x - b.x;
      }), h = new n(1, 1, null), m = l; --m > -1;) {
        g = j[m], h = new n(g.x, g.y, h);
      }

      this._prev = new n(0, 0, 0 !== h.t ? h : h.next);
    }, !0), r = d.prototype = new a(), r.constructor = d, r.getRatio = function (a) {
      var b = this._prev;

      if (a > b.t) {
        for (; b.next && a >= b.t;) {
          b = b.next;
        }

        b = b.prev;
      } else for (; b.prev && a <= b.t;) {
        b = b.prev;
      }

      return this._prev = b, b.v + (a - b.t) / b.gap * b.c;
    }, r.config = function (a) {
      return new d(a);
    }, d.ease = new d(), m("Bounce", k("BounceOut", function (a) {
      return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375;
    }), k("BounceIn", function (a) {
      return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375);
    }), k("BounceInOut", function (a) {
      var b = .5 > a;
      return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5;
    })), m("Circ", k("CircOut", function (a) {
      return Math.sqrt(1 - (a -= 1) * a);
    }), k("CircIn", function (a) {
      return -(Math.sqrt(1 - a * a) - 1);
    }), k("CircInOut", function (a) {
      return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
    })), e = function e(b, c, d) {
      var e = j("easing." + b, function (a, b) {
        this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 = this._p2 / h * (Math.asin(1 / this._p1) || 0), this._p2 = h / this._p2;
      }, !0),
          f = e.prototype = new a();
      return f.constructor = e, f.getRatio = c, f.config = function (a, b) {
        return new e(a, b);
      }, e;
    }, m("Elastic", e("ElasticOut", function (a) {
      return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1;
    }, .3), e("ElasticIn", function (a) {
      return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2));
    }, .3), e("ElasticInOut", function (a) {
      return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * this._p2) * .5 + 1;
    }, .45)), m("Expo", k("ExpoOut", function (a) {
      return 1 - Math.pow(2, -10 * a);
    }), k("ExpoIn", function (a) {
      return Math.pow(2, 10 * (a - 1)) - .001;
    }), k("ExpoInOut", function (a) {
      return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)));
    })), m("Sine", k("SineOut", function (a) {
      return Math.sin(a * i);
    }), k("SineIn", function (a) {
      return -Math.cos(a * i) + 1;
    }), k("SineInOut", function (a) {
      return -.5 * (Math.cos(Math.PI * a) - 1);
    })), j("easing.EaseLookup", {
      find: function find(b) {
        return a.map[b];
      }
    }, !0), l(f.SlowMo, "SlowMo", "ease,"), l(d, "RoughEase", "ease,"), l(b, "SteppedEase", "ease,"), p;
  }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function () {
  "use strict";

  var a = function a() {
    return _gsScope.GreenSockGlobals || _gsScope;
  };

  "undefined" != typeof module && module.exports ? (require("../TweenLite.min.js"), module.exports = a()) : "function" == typeof define && define.amd && define(["TweenLite"], a);
}();
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic main library.
 */

/**
 * @namespace ScrollMagic
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser global
    root.ScrollMagic = factory();
  }
})(void 0, function () {
  "use strict";

  var ScrollMagic = function ScrollMagic() {
    _util.log(2, '(COMPATIBILITY NOTICE) -> As of ScrollMagic 2.0.0 you need to use \'new ScrollMagic.Controller()\' to create a new controller instance. Use \'new ScrollMagic.Scene()\' to instance a scene.');
  };

  ScrollMagic.version = "2.0.5"; // TODO: temporary workaround for chrome's scroll jitter bug

  window.addEventListener("mousewheel", function () {}); // global const

  var PIN_SPACER_ATTRIBUTE = "data-scrollmagic-pin-spacer";
  /**
   * The main class that is needed once per scroll container.
   *
   * @class
   *
   * @example
   * // basic initialization
   * var controller = new ScrollMagic.Controller();
   *
   * // passing options
   * var controller = new ScrollMagic.Controller({container: "#myContainer", loglevel: 3});
   *
   * @param {object} [options] - An object containing one or more options for the controller.
   * @param {(string|object)} [options.container=window] - A selector, DOM object that references the main container for scrolling.
   * @param {boolean} [options.vertical=true] - Sets the scroll mode to vertical (`true`) or horizontal (`false`) scrolling.
   * @param {object} [options.globalSceneOptions={}] - These options will be passed to every Scene that is added to the controller using the addScene method. For more information on Scene options see {@link ScrollMagic.Scene}.
   * @param {number} [options.loglevel=2] Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   ** `0` => silent
   ** `1` => errors
   ** `2` => errors, warnings
   ** `3` => errors, warnings, debuginfo
   * @param {boolean} [options.refreshInterval=100] - Some changes don't call events by default, like changing the container size or moving a scene trigger element.  
   This interval polls these parameters to fire the necessary events.  
   If you don't use custom containers, trigger elements or have static layouts, where the positions of the trigger elements don't change, you can set this to 0 disable interval checking and improve performance.
   *
   */

  ScrollMagic.Controller = function (options) {
    /*
    	 * ----------------------------------------------------------------
    	 * settings
    	 * ----------------------------------------------------------------
    	 */
    var NAMESPACE = 'ScrollMagic.Controller',
        SCROLL_DIRECTION_FORWARD = 'FORWARD',
        SCROLL_DIRECTION_REVERSE = 'REVERSE',
        SCROLL_DIRECTION_PAUSED = 'PAUSED',
        DEFAULT_OPTIONS = CONTROLLER_OPTIONS.defaults;
    /*
    	 * ----------------------------------------------------------------
    	 * private vars
    	 * ----------------------------------------------------------------
    	 */

    var Controller = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _sceneObjects = [],
        _updateScenesOnNextCycle = false,
        // can be boolean (true => all scenes) or an array of scenes to be updated
    _scrollPos = 0,
        _scrollDirection = SCROLL_DIRECTION_PAUSED,
        _isDocument = true,
        _viewPortSize = 0,
        _enabled = true,
        _updateTimeout,
        _refreshTimeout;
    /*
    	 * ----------------------------------------------------------------
    	 * private functions
    	 * ----------------------------------------------------------------
    	 */

    /**
     * Internal constructor function of the ScrollMagic Controller
     * @private
     */


    var construct = function construct() {
      for (var key in _options) {
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      }

      _options.container = _util.get.elements(_options.container)[0]; // check ScrollContainer

      if (!_options.container) {
        log(1, "ERROR creating object " + NAMESPACE + ": No valid scroll container supplied");
        throw NAMESPACE + " init failed."; // cancel
      }

      _isDocument = _options.container === window || _options.container === document.body || !document.body.contains(_options.container); // normalize to window

      if (_isDocument) {
        _options.container = window;
      } // update container size immediately


      _viewPortSize = getViewportSize(); // set event handlers

      _options.container.addEventListener("resize", onChange);

      _options.container.addEventListener("scroll", onChange);

      _options.refreshInterval = parseInt(_options.refreshInterval) || DEFAULT_OPTIONS.refreshInterval;
      scheduleRefresh();
      log(3, "added new " + NAMESPACE + " controller (v" + ScrollMagic.version + ")");
    };
    /**
     * Schedule the next execution of the refresh function
     * @private
     */


    var scheduleRefresh = function scheduleRefresh() {
      if (_options.refreshInterval > 0) {
        _refreshTimeout = window.setTimeout(refresh, _options.refreshInterval);
      }
    };
    /**
     * Default function to get scroll pos - overwriteable using `Controller.scrollPos(newFunction)`
     * @private
     */


    var getScrollPos = function getScrollPos() {
      return _options.vertical ? _util.get.scrollTop(_options.container) : _util.get.scrollLeft(_options.container);
    };
    /**
     * Returns the current viewport Size (width vor horizontal, height for vertical)
     * @private
     */


    var getViewportSize = function getViewportSize() {
      return _options.vertical ? _util.get.height(_options.container) : _util.get.width(_options.container);
    };
    /**
     * Default function to set scroll pos - overwriteable using `Controller.scrollTo(newFunction)`
     * Make available publicly for pinned mousewheel workaround.
     * @private
     */


    var setScrollPos = this._setScrollPos = function (pos) {
      if (_options.vertical) {
        if (_isDocument) {
          window.scrollTo(_util.get.scrollLeft(), pos);
        } else {
          _options.container.scrollTop = pos;
        }
      } else {
        if (_isDocument) {
          window.scrollTo(pos, _util.get.scrollTop());
        } else {
          _options.container.scrollLeft = pos;
        }
      }
    };
    /**
     * Handle updates in cycles instead of on scroll (performance)
     * @private
     */


    var updateScenes = function updateScenes() {
      if (_enabled && _updateScenesOnNextCycle) {
        // determine scenes to update
        var scenesToUpdate = _util.type.Array(_updateScenesOnNextCycle) ? _updateScenesOnNextCycle : _sceneObjects.slice(0); // reset scenes

        _updateScenesOnNextCycle = false;
        var oldScrollPos = _scrollPos; // update scroll pos now instead of onChange, as it might have changed since scheduling (i.e. in-browser smooth scroll)

        _scrollPos = Controller.scrollPos();
        var deltaScroll = _scrollPos - oldScrollPos;

        if (deltaScroll !== 0) {
          // scroll position changed?
          _scrollDirection = deltaScroll > 0 ? SCROLL_DIRECTION_FORWARD : SCROLL_DIRECTION_REVERSE;
        } // reverse order of scenes if scrolling reverse


        if (_scrollDirection === SCROLL_DIRECTION_REVERSE) {
          scenesToUpdate.reverse();
        } // update scenes


        scenesToUpdate.forEach(function (scene, index) {
          log(3, "updating Scene " + (index + 1) + "/" + scenesToUpdate.length + " (" + _sceneObjects.length + " total)");
          scene.update(true);
        });

        if (scenesToUpdate.length === 0 && _options.loglevel >= 3) {
          log(3, "updating 0 Scenes (nothing added to controller)");
        }
      }
    };
    /**
     * Initializes rAF callback
     * @private
     */


    var debounceUpdate = function debounceUpdate() {
      _updateTimeout = _util.rAF(updateScenes);
    };
    /**
     * Handles Container changes
     * @private
     */


    var onChange = function onChange(e) {
      log(3, "event fired causing an update:", e.type);

      if (e.type == "resize") {
        // resize
        _viewPortSize = getViewportSize();
        _scrollDirection = SCROLL_DIRECTION_PAUSED;
      } // schedule update


      if (_updateScenesOnNextCycle !== true) {
        _updateScenesOnNextCycle = true;
        debounceUpdate();
      }
    };

    var refresh = function refresh() {
      if (!_isDocument) {
        // simulate resize event. Only works for viewport relevant param (performance)
        if (_viewPortSize != getViewportSize()) {
          var resizeEvent;

          try {
            resizeEvent = new Event('resize', {
              bubbles: false,
              cancelable: false
            });
          } catch (e) {
            // stupid IE
            resizeEvent = document.createEvent("Event");
            resizeEvent.initEvent("resize", false, false);
          }

          _options.container.dispatchEvent(resizeEvent);
        }
      }

      _sceneObjects.forEach(function (scene, index) {
        // refresh all scenes
        scene.refresh();
      });

      scheduleRefresh();
    };
    /**
     * Send a debug message to the console.
     * provided publicly with _log for plugins
     * @private
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */


    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    }; // for scenes we have getters for each option, but for the controller we don't, so we need to make it available externally for plugins


    this._options = _options;
    /**
     * Sort scenes in ascending order of their start offset.
     * @private
     *
     * @param {array} ScenesArray - an array of ScrollMagic Scenes that should be sorted
     * @return {array} The sorted array of Scenes.
     */

    var sortScenes = function sortScenes(ScenesArray) {
      if (ScenesArray.length <= 1) {
        return ScenesArray;
      } else {
        var scenes = ScenesArray.slice(0);
        scenes.sort(function (a, b) {
          return a.scrollOffset() > b.scrollOffset() ? 1 : -1;
        });
        return scenes;
      }
    };
    /**
     * ----------------------------------------------------------------
     * public functions
     * ----------------------------------------------------------------
     */

    /**
     * Add one ore more scene(s) to the controller.  
     * This is the equivalent to `Scene.addTo(controller)`.
     * @public
     * @example
     * // with a previously defined scene
     * controller.addScene(scene);
     *
     * // with a newly created scene.
     * controller.addScene(new ScrollMagic.Scene({duration : 0}));
     *
     * // adding multiple scenes
     * controller.addScene([scene, scene2, new ScrollMagic.Scene({duration : 0})]);
     *
     * @param {(ScrollMagic.Scene|array)} newScene - ScrollMagic Scene or Array of Scenes to be added to the controller.
     * @return {Controller} Parent object for chaining.
     */


    this.addScene = function (newScene) {
      if (_util.type.Array(newScene)) {
        newScene.forEach(function (scene, index) {
          Controller.addScene(scene);
        });
      } else if (newScene instanceof ScrollMagic.Scene) {
        if (newScene.controller() !== Controller) {
          newScene.addTo(Controller);
        } else if (_sceneObjects.indexOf(newScene) < 0) {
          // new scene
          _sceneObjects.push(newScene); // add to array


          _sceneObjects = sortScenes(_sceneObjects); // sort

          newScene.on("shift.controller_sort", function () {
            // resort whenever scene moves
            _sceneObjects = sortScenes(_sceneObjects);
          }); // insert Global defaults.

          for (var key in _options.globalSceneOptions) {
            if (newScene[key]) {
              newScene[key].call(newScene, _options.globalSceneOptions[key]);
            }
          }

          log(3, "adding Scene (now " + _sceneObjects.length + " total)");
        }
      } else {
        log(1, "ERROR: invalid argument supplied for '.addScene()'");
      }

      return Controller;
    };
    /**
     * Remove one ore more scene(s) from the controller.  
     * This is the equivalent to `Scene.remove()`.
     * @public
     * @example
     * // remove a scene from the controller
     * controller.removeScene(scene);
     *
     * // remove multiple scenes from the controller
     * controller.removeScene([scene, scene2, scene3]);
     *
     * @param {(ScrollMagic.Scene|array)} Scene - ScrollMagic Scene or Array of Scenes to be removed from the controller.
     * @returns {Controller} Parent object for chaining.
     */


    this.removeScene = function (Scene) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.removeScene(scene);
        });
      } else {
        var index = _sceneObjects.indexOf(Scene);

        if (index > -1) {
          Scene.off("shift.controller_sort");

          _sceneObjects.splice(index, 1);

          log(3, "removing Scene (now " + _sceneObjects.length + " left)");
          Scene.remove();
        }
      }

      return Controller;
    };
    /**
     * Update one ore more scene(s) according to the scroll position of the container.  
     * This is the equivalent to `Scene.update()`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.  
     * _**Note:** This method gets called constantly whenever Controller detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @public
     * @example
     * // update a specific scene on next cycle
     * controller.updateScene(scene);
     *
     * // update a specific scene immediately
     * controller.updateScene(scene, true);
     *
     * // update multiple scenes scene on next cycle
     * controller.updateScene([scene1, scene2, scene3]);
     *
     * @param {ScrollMagic.Scene} Scene - ScrollMagic Scene or Array of Scenes that is/are supposed to be updated.
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle.  
     This is useful when changing multiple properties of the scene - this way it will only be updated once all new properties are set (updateScenes).
     * @return {Controller} Parent object for chaining.
     */


    this.updateScene = function (Scene, immediately) {
      if (_util.type.Array(Scene)) {
        Scene.forEach(function (scene, index) {
          Controller.updateScene(scene, immediately);
        });
      } else {
        if (immediately) {
          Scene.update(true);
        } else if (_updateScenesOnNextCycle !== true && Scene instanceof ScrollMagic.Scene) {
          // if _updateScenesOnNextCycle is true, all connected scenes are already scheduled for update
          // prep array for next update cycle
          _updateScenesOnNextCycle = _updateScenesOnNextCycle || [];

          if (_updateScenesOnNextCycle.indexOf(Scene) == -1) {
            _updateScenesOnNextCycle.push(Scene);
          }

          _updateScenesOnNextCycle = sortScenes(_updateScenesOnNextCycle); // sort

          debounceUpdate();
        }
      }

      return Controller;
    };
    /**
     * Updates the controller params and calls updateScene on every scene, that is attached to the controller.  
     * See `Controller.updateScene()` for more information about what this means.  
     * In most cases you will not need this function, as it is called constantly, whenever ScrollMagic detects a state change event, like resize or scroll.  
     * The only application for this method is when ScrollMagic fails to detect these events.  
     * One application is with some external scroll libraries (like iScroll) that move an internal container to a negative offset instead of actually scrolling. In this case the update on the controller needs to be called whenever the child container's position changes.
     * For this case there will also be the need to provide a custom function to calculate the correct scroll position. See `Controller.scrollPos()` for details.
     * @public
     * @example
     * // update the controller on next cycle (saves performance due to elimination of redundant updates)
     * controller.update();
     *
     * // update the controller immediately
     * controller.update(true);
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance)
     * @return {Controller} Parent object for chaining.
     */


    this.update = function (immediately) {
      onChange({
        type: "resize"
      }); // will update size and set _updateScenesOnNextCycle to true

      if (immediately) {
        updateScenes();
      }

      return Controller;
    };
    /**
     * Scroll to a numeric scroll offset, a DOM element, the start of a scene or provide an alternate method for scrolling.  
     * For vertical controllers it will change the top scroll offset and for horizontal applications it will change the left offset.
     * @public
     *
     * @since 1.1.0
     * @example
     * // scroll to an offset of 100
     * controller.scrollTo(100);
     *
     * // scroll to a DOM element
     * controller.scrollTo("#anchor");
     *
     * // scroll to the beginning of a scene
     * var scene = new ScrollMagic.Scene({offset: 200});
     * controller.scrollTo(scene);
     *
     * // define a new scroll position modification function (jQuery animate instead of jump)
     * controller.scrollTo(function (newScrollPos) {
     *	$("html, body").animate({scrollTop: newScrollPos});
     * });
     * controller.scrollTo(100); // call as usual, but the new function will be used instead
     *
     * // define a new scroll function with an additional parameter
     * controller.scrollTo(function (newScrollPos, message) {
     *  console.log(message);
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter to the defined custom function
     * controller.scrollTo(100, "my message");
     *
     * // define a new scroll function with an additional parameter containing multiple variables
     * controller.scrollTo(function (newScrollPos, options) {
     *  someGlobalVar = options.a + options.b;
     *	$(this).animate({scrollTop: newScrollPos});
     * });
     * // call as usual, but supply an extra parameter containing multiple options
     * controller.scrollTo(100, {a: 1, b: 2});
     *
     * // define a new scroll function with a callback supplied as an additional parameter
     * controller.scrollTo(function (newScrollPos, callback) {
     *	$(this).animate({scrollTop: newScrollPos}, 400, "swing", callback);
     * });
     * // call as usual, but supply an extra parameter, which is used as a callback in the previously defined custom scroll function
     * controller.scrollTo(100, function() {
     *	console.log("scroll has finished.");
     * });
     *
     * @param {mixed} scrollTarget - The supplied argument can be one of these types:
     * 1. `number` -> The container will scroll to this new scroll offset.
     * 2. `string` or `object` -> Can be a selector or a DOM object.  
     *  The container will scroll to the position of this element.
     * 3. `ScrollMagic Scene` -> The container will scroll to the start of this scene.
     * 4. `function` -> This function will be used for future scroll position modifications.  
     *  This provides a way for you to change the behaviour of scrolling and adding new behaviour like animation. The function receives the new scroll position as a parameter and a reference to the container element using `this`.  
     *  It may also optionally receive an optional additional parameter (see below)  
     *  _**NOTE:**  
     *  All other options will still work as expected, using the new function to scroll._
     * @param {mixed} [additionalParameter] - If a custom scroll function was defined (see above 4.), you may want to supply additional parameters to it, when calling it. You can do this using this parameter – see examples for details. Please note, that this parameter will have no effect, if you use the default scrolling function.
     * @returns {Controller} Parent object for chaining.
     */


    this.scrollTo = function (scrollTarget, additionalParameter) {
      if (_util.type.Number(scrollTarget)) {
        // excecute
        setScrollPos.call(_options.container, scrollTarget, additionalParameter);
      } else if (scrollTarget instanceof ScrollMagic.Scene) {
        // scroll to scene
        if (scrollTarget.controller() === Controller) {
          // check if the controller is associated with this scene
          Controller.scrollTo(scrollTarget.scrollOffset(), additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied scene does not belong to this controller. Scroll cancelled.", scrollTarget);
        }
      } else if (_util.type.Function(scrollTarget)) {
        // assign new scroll function
        setScrollPos = scrollTarget;
      } else {
        // scroll to element
        var elem = _util.get.elements(scrollTarget)[0];

        if (elem) {
          // if parent is pin spacer, use spacer position instead so correct start position is returned for pinned elements.
          while (elem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            elem = elem.parentNode;
          }

          var param = _options.vertical ? "top" : "left",
              // which param is of interest ?
          containerOffset = _util.get.offset(_options.container),
              // container position is needed because element offset is returned in relation to document, not in relation to container.
          elementOffset = _util.get.offset(elem);

          if (!_isDocument) {
            // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
            containerOffset[param] -= Controller.scrollPos();
          }

          Controller.scrollTo(elementOffset[param] - containerOffset[param], additionalParameter);
        } else {
          log(2, "scrollTo(): The supplied argument is invalid. Scroll cancelled.", scrollTarget);
        }
      }

      return Controller;
    };
    /**
     * **Get** the current scrollPosition or **Set** a new method to calculate it.  
     * -> **GET**:
     * When used as a getter this function will return the current scroll position.  
     * To get a cached value use Controller.info("scrollPos"), which will be updated in the update cycle.  
     * For vertical controllers it will return the top scroll offset and for horizontal applications it will return the left offset.
     *
     * -> **SET**:
     * When used as a setter this method prodes a way to permanently overwrite the controller's scroll position calculation.  
     * A typical usecase is when the scroll position is not reflected by the containers scrollTop or scrollLeft values, but for example by the inner offset of a child container.  
     * Moving a child container inside a parent is a commonly used method for several scrolling frameworks, including iScroll.  
     * By providing an alternate calculation function you can make sure ScrollMagic receives the correct scroll position.  
     * Please also bear in mind that your function should return y values for vertical scrolls an x for horizontals.
     *
     * To change the current scroll position please use `Controller.scrollTo()`.
     * @public
     *
     * @example
     * // get the current scroll Position
     * var scrollPos = controller.scrollPos();
     *
     * // set a new scroll position calculation method
     * controller.scrollPos(function () {
     *	return this.info("vertical") ? -mychildcontainer.y : -mychildcontainer.x
     * });
     *
     * @param {function} [scrollPosMethod] - The function to be used for the scroll position calculation of the container.
     * @returns {(number|Controller)} Current scroll position or parent object for chaining.
     */


    this.scrollPos = function (scrollPosMethod) {
      if (!arguments.length) {
        // get
        return getScrollPos.call(Controller);
      } else {
        // set
        if (_util.type.Function(scrollPosMethod)) {
          getScrollPos = scrollPosMethod;
        } else {
          log(2, "Provided value for method 'scrollPos' is not a function. To change the current scroll position use 'scrollTo()'.");
        }
      }

      return Controller;
    };
    /**
     * **Get** all infos or one in particular about the controller.
     * @public
     * @example
     * // returns the current scroll position (number)
     * var scrollPos = controller.info("scrollPos");
     *
     * // returns all infos as an object
     * var infos = controller.info();
     *
     * @param {string} [about] - If passed only this info will be returned instead of an object containing all.  
     Valid options are:
     ** `"size"` => the current viewport size of the container
     ** `"vertical"` => true if vertical scrolling, otherwise false
     ** `"scrollPos"` => the current scroll position
     ** `"scrollDirection"` => the last known direction of the scroll
     ** `"container"` => the container element
     ** `"isDocument"` => true if container element is the document.
     * @returns {(mixed|object)} The requested info(s).
     */


    this.info = function (about) {
      var values = {
        size: _viewPortSize,
        // contains height or width (in regard to orientation);
        vertical: _options.vertical,
        scrollPos: _scrollPos,
        scrollDirection: _scrollDirection,
        container: _options.container,
        isDocument: _isDocument
      };

      if (!arguments.length) {
        // get all as an object
        return values;
      } else if (values[about] !== undefined) {
        return values[about];
      } else {
        log(1, "ERROR: option \"" + about + "\" is not available");
        return;
      }
    };
    /**
     * **Get** or **Set** the current loglevel option value.
     * @public
     *
     * @example
     * // get the current value
     * var loglevel = controller.loglevel();
     *
     * // set a new value
     * controller.loglevel(3);
     *
     * @param {number} [newLoglevel] - The new loglevel setting of the Controller. `[0-3]`
     * @returns {(number|Controller)} Current loglevel or parent object for chaining.
     */


    this.loglevel = function (newLoglevel) {
      if (!arguments.length) {
        // get
        return _options.loglevel;
      } else if (_options.loglevel != newLoglevel) {
        // set
        _options.loglevel = newLoglevel;
      }

      return Controller;
    };
    /**
     * **Get** or **Set** the current enabled state of the controller.  
     * This can be used to disable all Scenes connected to the controller without destroying or removing them.
     * @public
     *
     * @example
     * // get the current value
     * var enabled = controller.enabled();
     *
     * // disable the controller
     * controller.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the controller `true` or `false`.
     * @returns {(boolean|Controller)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Controller.updateScene(_sceneObjects, true);
      }

      return Controller;
    };
    /**
     * Destroy the Controller, all Scenes and everything.
     * @public
     *
     * @example
     * // without resetting the scenes
     * controller = controller.destroy();
     *
     * // with scene reset
     * controller = controller.destroy(true);
     *
     * @param {boolean} [resetScenes=false] - If `true` the pins and tweens (if existent) of all scenes will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (resetScenes) {
      window.clearTimeout(_refreshTimeout);
      var i = _sceneObjects.length;

      while (i--) {
        _sceneObjects[i].destroy(resetScenes);
      }

      _options.container.removeEventListener("resize", onChange);

      _options.container.removeEventListener("scroll", onChange);

      _util.cAF(_updateTimeout);

      log(3, "destroyed " + NAMESPACE + " (reset: " + (resetScenes ? "true" : "false") + ")");
      return null;
    }; // INIT


    construct();
    return Controller;
  }; // store pagewide controller options


  var CONTROLLER_OPTIONS = {
    defaults: {
      container: window,
      vertical: true,
      globalSceneOptions: {},
      loglevel: 2,
      refreshInterval: 100
    }
  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   */

  ScrollMagic.Controller.addOption = function (name, defaultValue) {
    CONTROLLER_OPTIONS.defaults[name] = defaultValue;
  }; // instance extension function for plugins


  ScrollMagic.Controller.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Controller = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Controller, oldClass); // copy properties


    ScrollMagic.Controller.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Controller.prototype.constructor = ScrollMagic.Controller; // restore constructor
  };
  /**
   * A Scene defines where the controller should react and how.
   *
   * @class
   *
   * @example
   * // create a standard scene and add it to a controller
   * new ScrollMagic.Scene()
   *		.addTo(controller);
   *
   * // create a scene with custom options and assign a handler to it.
   * var scene = new ScrollMagic.Scene({
   * 		duration: 100,
   *		offset: 200,
   *		triggerHook: "onEnter",
   *		reverse: false
   * });
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.  
   Instead of setting the options for each scene individually you can also set them globally in the controller as the controllers `globalSceneOptions` option. The object accepts the same properties as the ones below.  
   When a scene is added to the controller the options defined using the Scene constructor will be overwritten by those set in `globalSceneOptions`.
   * @param {(number|function)} [options.duration=0] - The duration of the scene. 
   If `0` tweens will auto-play when reaching the scene start point, pins will be pinned indefinetly starting at the start position.  
   A function retuning the duration value is also supported. Please see `Scene.duration()` for details.
   * @param {number} [options.offset=0] - Offset Value for the Trigger Position. If no triggerElement is defined this will be the scroll distance from the start of the page, after which the scene will start.
   * @param {(string|object)} [options.triggerElement=null] - Selector or DOM object that defines the start of the scene. If undefined the scene will start right at the start of the page (unless an offset is set).
   * @param {(number|string)} [options.triggerHook="onCenter"] - Can be a number between 0 and 1 defining the position of the trigger Hook in relation to the viewport.  
   Can also be defined using a string:
   ** `"onEnter"` => `1`
   ** `"onCenter"` => `0.5`
   ** `"onLeave"` => `0`
   * @param {boolean} [options.reverse=true] - Should the scene reverse, when scrolling up?
   * @param {number} [options.loglevel=2] - Loglevel for debugging. Note that logging is disabled in the minified version of ScrollMagic.
   ** `0` => silent
   ** `1` => errors
   ** `2` => errors, warnings
   ** `3` => errors, warnings, debuginfo
   * 
   */


  ScrollMagic.Scene = function (options) {
    /*
    	 * ----------------------------------------------------------------
    	 * settings
    	 * ----------------------------------------------------------------
    	 */
    var NAMESPACE = 'ScrollMagic.Scene',
        SCENE_STATE_BEFORE = 'BEFORE',
        SCENE_STATE_DURING = 'DURING',
        SCENE_STATE_AFTER = 'AFTER',
        DEFAULT_OPTIONS = SCENE_OPTIONS.defaults;
    /*
    	 * ----------------------------------------------------------------
    	 * private vars
    	 * ----------------------------------------------------------------
    	 */

    var Scene = this,
        _options = _util.extend({}, DEFAULT_OPTIONS, options),
        _state = SCENE_STATE_BEFORE,
        _progress = 0,
        _scrollOffset = {
      start: 0,
      end: 0
    },
        // reflects the controllers's scroll position for the start and end of the scene respectively
    _triggerPos = 0,
        _enabled = true,
        _durationUpdateMethod,
        _controller;
    /**
     * Internal constructor function of the ScrollMagic Scene
     * @private
     */


    var construct = function construct() {
      for (var key in _options) {
        // check supplied options
        if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
          log(2, "WARNING: Unknown option \"" + key + "\"");
          delete _options[key];
        }
      } // add getters/setters for all possible options


      for (var optionName in DEFAULT_OPTIONS) {
        addSceneOption(optionName);
      } // validate all options


      validateOption();
    };
    /*
     * ----------------------------------------------------------------
     * Event Management
     * ----------------------------------------------------------------
     */


    var _listeners = {};
    /**
     * Scene start event.  
     * Fires whenever the scroll position its the starting point of the scene.  
     * It will also fire when scrolling back up going over the start position of the scene. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#start
     *
     * @example
     * scene.on("start", function (event) {
     * 	console.log("Hit start point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene end event.  
     * Fires whenever the scroll position its the ending point of the scene.  
     * It will also fire when scrolling back up from after the scene and going over its end position. If you want something to happen only when scrolling down/right, use the scrollDirection parameter passed to the callback.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#end
     *
     * @example
     * scene.on("end", function (event) {
     * 	console.log("Hit end point of scene.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene enter event.  
     * Fires whenever the scene enters the "DURING" state.  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene enters its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#enter
     *
     * @example
     * scene.on("enter", function (event) {
     * 	console.log("Scene entered.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene - always `"DURING"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene leave event.  
     * Fires whenever the scene's state goes from "DURING" to either "BEFORE" or "AFTER".  
     * Keep in mind that it doesn't matter if the scene plays forward or backward: This event always fires when the scene leaves its active scroll timeframe, regardless of the scroll-direction.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#leave
     *
     * @example
     * scene.on("leave", function (event) {
     * 	console.log("Scene left.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene update event.  
     * Fires whenever the scene is updated (but not necessarily changes the progress).
     *
     * @event ScrollMagic.Scene#update
     *
     * @example
     * scene.on("update", function (event) {
     * 	console.log("Scene updated.");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.startPos - The starting position of the scene (in relation to the conainer)
     * @property {number} event.endPos - The ending position of the scene (in relation to the conainer)
     * @property {number} event.scrollPos - The current scroll position of the container
     */

    /**
     * Scene progress event.  
     * Fires whenever the progress of the scene changes.
     *
     * For details on this event and the order in which it is fired, please review the {@link Scene.progress} method.
     *
     * @event ScrollMagic.Scene#progress
     *
     * @example
     * scene.on("progress", function (event) {
     * 	console.log("Scene progress changed to " + event.progress);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {number} event.progress - Reflects the current progress of the scene
     * @property {string} event.state - The current state of the scene `"BEFORE"`, `"DURING"` or `"AFTER"`
     * @property {string} event.scrollDirection - Indicates which way we are scrolling `"PAUSED"`, `"FORWARD"` or `"REVERSE"`
     */

    /**
     * Scene change event.  
     * Fires whenvever a property of the scene is changed.
     *
     * @event ScrollMagic.Scene#change
     *
     * @example
     * scene.on("change", function (event) {
     * 	console.log("Scene Property \"" + event.what + "\" changed to " + event.newval);
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.what - Indicates what value has been changed
     * @property {mixed} event.newval - The new value of the changed property
     */

    /**
     * Scene shift event.  
     * Fires whenvever the start or end **scroll offset** of the scene change.
     * This happens explicitely, when one of these values change: `offset`, `duration` or `triggerHook`.
     * It will fire implicitly when the `triggerElement` changes, if the new element has a different position (most cases).
     * It will also fire implicitly when the size of the container changes and the triggerHook is anything other than `onLeave`.
     *
     * @event ScrollMagic.Scene#shift
     * @since 1.1.0
     *
     * @example
     * scene.on("shift", function (event) {
     * 	console.log("Scene moved, because the " + event.reason + " has changed.)");
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {string} event.reason - Indicates why the scene has shifted
     */

    /**
     * Scene destroy event.  
     * Fires whenvever the scene is destroyed.
     * This can be used to tidy up custom behaviour used in events.
     *
     * @event ScrollMagic.Scene#destroy
     * @since 1.1.0
     *
     * @example
     * scene.on("enter", function (event) {
     *        // add custom action
     *        $("#my-elem").left("200");
     *      })
     *      .on("destroy", function (event) {
     *        // reset my element to start position
     *        if (event.reset) {
     *          $("#my-elem").left("0");
     *        }
     *      });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.reset - Indicates if the destroy method was called with reset `true` or `false`.
     */

    /**
     * Scene add event.  
     * Fires when the scene is added to a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#add
     * @since 2.0.0
     *
     * @example
     * scene.on("add", function (event) {
     * 	console.log('Scene was added to a new controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     * @property {boolean} event.controller - The controller object the scene was added to.
     */

    /**
     * Scene remove event.  
     * Fires when the scene is removed from a controller.
     * This is mostly used by plugins to know that change might be due.
     *
     * @event ScrollMagic.Scene#remove
     * @since 2.0.0
     *
     * @example
     * scene.on("remove", function (event) {
     * 	console.log('Scene was removed from its controller.');
     * });
     *
     * @property {object} event - The event Object passed to each callback
     * @property {string} event.type - The name of the event
     * @property {Scene} event.target - The Scene object that triggered this event
     */

    /**
     * Add one ore more event listener.  
     * The callback function will be fired at the respective event, and an object containing relevant data will be passed to the callback.
     * @method ScrollMagic.Scene#on
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update progress start end enter leave", callback);
     *
     * @param {string} names - The name or names of the event the callback should be attached to.
     * @param {function} callback - A function that should be executed, when the event is dispatched. An event object will be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */

    this.on = function (names, callback) {
      if (_util.type.Function(callback)) {
        names = names.trim().split(' ');
        names.forEach(function (fullname) {
          var nameparts = fullname.split('.'),
              eventname = nameparts[0],
              namespace = nameparts[1];

          if (eventname != "*") {
            // disallow wildcards
            if (!_listeners[eventname]) {
              _listeners[eventname] = [];
            }

            _listeners[eventname].push({
              namespace: namespace || '',
              callback: callback
            });
          }
        });
      } else {
        log(1, "ERROR when calling '.on()': Supplied callback for '" + names + "' is not a valid function!");
      }

      return Scene;
    };
    /**
     * Remove one or more event listener.
     * @method ScrollMagic.Scene#off
     *
     * @example
     * function callback (event) {
     * 		console.log("Event fired! (" + event.type + ")");
     * }
     * // add listeners
     * scene.on("change update", callback);
     * // remove listeners
     * scene.off("change update", callback);
     *
     * @param {string} names - The name or names of the event that should be removed.
     * @param {function} [callback] - A specific callback function that should be removed. If none is passed all callbacks to the event listener will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.off = function (names, callback) {
      if (!names) {
        log(1, "ERROR: Invalid event name supplied.");
        return Scene;
      }

      names = names.trim().split(' ');
      names.forEach(function (fullname, key) {
        var nameparts = fullname.split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1] || '',
            removeList = eventname === '*' ? Object.keys(_listeners) : [eventname];
        removeList.forEach(function (remove) {
          var list = _listeners[remove] || [],
              i = list.length;

          while (i--) {
            var listener = list[i];

            if (listener && (namespace === listener.namespace || namespace === '*') && (!callback || callback == listener.callback)) {
              list.splice(i, 1);
            }
          }

          if (!list.length) {
            delete _listeners[remove];
          }
        });
      });
      return Scene;
    };
    /**
     * Trigger an event.
     * @method ScrollMagic.Scene#trigger
     *
     * @example
     * this.trigger("change");
     *
     * @param {string} name - The name of the event that should be triggered.
     * @param {object} [vars] - An object containing info that should be passed to the callback.
     * @returns {Scene} Parent object for chaining.
     */


    this.trigger = function (name, vars) {
      if (name) {
        var nameparts = name.trim().split('.'),
            eventname = nameparts[0],
            namespace = nameparts[1],
            listeners = _listeners[eventname];
        log(3, 'event fired:', eventname, vars ? "->" : '', vars || '');

        if (listeners) {
          listeners.forEach(function (listener, key) {
            if (!namespace || namespace === listener.namespace) {
              listener.callback.call(Scene, new ScrollMagic.Event(eventname, listener.namespace, Scene, vars));
            }
          });
        }
      } else {
        log(1, "ERROR: Invalid event name supplied.");
      }

      return Scene;
    }; // set event listeners


    Scene.on("change.internal", function (e) {
      if (e.what !== "loglevel" && e.what !== "tweenChanges") {
        // no need for a scene update scene with these options...
        if (e.what === "triggerElement") {
          updateTriggerElementPosition();
        } else if (e.what === "reverse") {
          // the only property left that may have an impact on the current scene state. Everything else is handled by the shift event.
          Scene.update();
        }
      }
    }).on("shift.internal", function (e) {
      updateScrollOffset();
      Scene.update(); // update scene to reflect new position
    });
    /**
     * Send a debug message to the console.
     * @private
     * but provided publicly with _log for plugins
     *
     * @param {number} loglevel - The loglevel required to initiate output for the message.
     * @param {...mixed} output - One or more variables that should be passed to the console.
     */

    var log = this._log = function (loglevel, output) {
      if (_options.loglevel >= loglevel) {
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ") ->");

        _util.log.apply(window, arguments);
      }
    };
    /**
     * Add the scene to a controller.  
     * This is the equivalent to `Controller.addScene(scene)`.
     * @method ScrollMagic.Scene#addTo
     *
     * @example
     * // add a scene to a ScrollMagic Controller
     * scene.addTo(controller);
     *
     * @param {ScrollMagic.Controller} controller - The controller to which the scene should be added.
     * @returns {Scene} Parent object for chaining.
     */


    this.addTo = function (controller) {
      if (!(controller instanceof ScrollMagic.Controller)) {
        log(1, "ERROR: supplied argument of 'addTo()' is not a valid ScrollMagic Controller");
      } else if (_controller != controller) {
        // new controller
        if (_controller) {
          // was associated to a different controller before, so remove it...
          _controller.removeScene(Scene);
        }

        _controller = controller;
        validateOption();
        updateDuration(true);
        updateTriggerElementPosition(true);
        updateScrollOffset();

        _controller.info("container").addEventListener('resize', onContainerResize);

        controller.addScene(Scene);
        Scene.trigger("add", {
          controller: _controller
        });
        log(3, "added " + NAMESPACE + " to controller");
        Scene.update();
      }

      return Scene;
    };
    /**
     * **Get** or **Set** the current enabled state of the scene.  
     * This can be used to disable this scene without removing or destroying it.
     * @method ScrollMagic.Scene#enabled
     *
     * @example
     * // get the current value
     * var enabled = scene.enabled();
     *
     * // disable the scene
     * scene.enabled(false);
     *
     * @param {boolean} [newState] - The new enabled state of the scene `true` or `false`.
     * @returns {(boolean|Scene)} Current enabled state or parent object for chaining.
     */


    this.enabled = function (newState) {
      if (!arguments.length) {
        // get
        return _enabled;
      } else if (_enabled != newState) {
        // set
        _enabled = !!newState;
        Scene.update(true);
      }

      return Scene;
    };
    /**
     * Remove the scene from the controller.  
     * This is the equivalent to `Controller.removeScene(scene)`.
     * The scene will not be updated anymore until you readd it to a controller.
     * To remove the pin or the tween you need to call removeTween() or removePin() respectively.
     * @method ScrollMagic.Scene#remove
     * @example
     * // remove the scene from its controller
     * scene.remove();
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.remove = function () {
      if (_controller) {
        _controller.info("container").removeEventListener('resize', onContainerResize);

        var tmpParent = _controller;
        _controller = undefined;
        tmpParent.removeScene(Scene);
        Scene.trigger("remove");
        log(3, "removed " + NAMESPACE + " from controller");
      }

      return Scene;
    };
    /**
     * Destroy the scene and everything.
     * @method ScrollMagic.Scene#destroy
     * @example
     * // destroy the scene without resetting the pin and tween to their initial positions
     * scene = scene.destroy();
     *
     * // destroy the scene and reset the pin and tween
     * scene = scene.destroy(true);
     *
     * @param {boolean} [reset=false] - If `true` the pin and tween (if existent) will be reset.
     * @returns {null} Null to unset handler variables.
     */


    this.destroy = function (reset) {
      Scene.trigger("destroy", {
        reset: reset
      });
      Scene.remove();
      Scene.off("*.*");
      log(3, "destroyed " + NAMESPACE + " (reset: " + (reset ? "true" : "false") + ")");
      return null;
    };
    /**
     * Updates the Scene to reflect the current state.  
     * This is the equivalent to `Controller.updateScene(scene, immediately)`.  
     * The update method calculates the scene's start and end position (based on the trigger element, trigger hook, duration and offset) and checks it against the current scroll position of the container.  
     * It then updates the current scene state accordingly (or does nothing, if the state is already correct) – Pins will be set to their correct position and tweens will be updated to their correct progress.
     * This means an update doesn't necessarily result in a progress change. The `progress` event will be fired if the progress has indeed changed between this update and the last.  
     * _**NOTE:** This method gets called constantly whenever ScrollMagic detects a change. The only application for you is if you change something outside of the realm of ScrollMagic, like moving the trigger or changing tween parameters._
     * @method ScrollMagic.Scene#update
     * @example
     * // update the scene on next tick
     * scene.update();
     *
     * // update the scene immediately
     * scene.update(true);
     *
     * @fires Scene.update
     *
     * @param {boolean} [immediately=false] - If `true` the update will be instant, if `false` it will wait until next update cycle (better performance).
     * @returns {Scene} Parent object for chaining.
     */


    this.update = function (immediately) {
      if (_controller) {
        if (immediately) {
          if (_controller.enabled() && _enabled) {
            var scrollPos = _controller.info("scrollPos"),
                newProgress;

            if (_options.duration > 0) {
              newProgress = (scrollPos - _scrollOffset.start) / (_scrollOffset.end - _scrollOffset.start);
            } else {
              newProgress = scrollPos >= _scrollOffset.start ? 1 : 0;
            }

            Scene.trigger("update", {
              startPos: _scrollOffset.start,
              endPos: _scrollOffset.end,
              scrollPos: scrollPos
            });
            Scene.progress(newProgress);
          } else if (_pin && _state === SCENE_STATE_DURING) {
            updatePinState(true); // unpin in position
          }
        } else {
          _controller.updateScene(Scene, false);
        }
      }

      return Scene;
    };
    /**
     * Updates dynamic scene variables like the trigger element position or the duration.
     * This method is automatically called in regular intervals from the controller. See {@link ScrollMagic.Controller} option `refreshInterval`.
     * 
     * You can call it to minimize lag, for example when you intentionally change the position of the triggerElement.
     * If you don't it will simply be updated in the next refresh interval of the container, which is usually sufficient.
     *
     * @method ScrollMagic.Scene#refresh
     * @since 1.1.0
     * @example
     * scene = new ScrollMagic.Scene({triggerElement: "#trigger"});
     * 
     * // change the position of the trigger
     * $("#trigger").css("top", 500);
     * // immediately let the scene know of this change
     * scene.refresh();
     *
     * @fires {@link Scene.shift}, if the trigger element position or the duration changed
     * @fires {@link Scene.change}, if the duration changed
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.refresh = function () {
      updateDuration();
      updateTriggerElementPosition(); // update trigger element position

      return Scene;
    };
    /**
     * **Get** or **Set** the scene's progress.  
     * Usually it shouldn't be necessary to use this as a setter, as it is set automatically by scene.update().  
     * The order in which the events are fired depends on the duration of the scene:
     *  1. Scenes with `duration == 0`:  
     *  Scenes that have no duration by definition have no ending. Thus the `end` event will never be fired.  
     *  When the trigger position of the scene is passed the events are always fired in this order:  
     *  `enter`, `start`, `progress` when scrolling forward  
     *  and  
     *  `progress`, `start`, `leave` when scrolling in reverse
     *  2. Scenes with `duration > 0`:  
     *  Scenes with a set duration have a defined start and end point.  
     *  When scrolling past the start position of the scene it will fire these events in this order:  
     *  `enter`, `start`, `progress`  
     *  When continuing to scroll and passing the end point it will fire these events:  
     *  `progress`, `end`, `leave`  
     *  When reversing through the end point these events are fired:  
     *  `enter`, `end`, `progress`  
     *  And when continuing to scroll past the start position in reverse it will fire:  
     *  `progress`, `start`, `leave`  
     *  In between start and end the `progress` event will be called constantly, whenever the progress changes.
     * 
     * In short:  
     * `enter` events will always trigger **before** the progress update and `leave` envents will trigger **after** the progress update.  
     * `start` and `end` will always trigger at their respective position.
     * 
     * Please review the event descriptions for details on the events and the event object that is passed to the callback.
     * 
     * @method ScrollMagic.Scene#progress
     * @example
     * // get the current scene progress
     * var progress = scene.progress();
     *
     * // set new scene progress
     * scene.progress(0.3);
     *
     * @fires {@link Scene.enter}, when used as setter
     * @fires {@link Scene.start}, when used as setter
     * @fires {@link Scene.progress}, when used as setter
     * @fires {@link Scene.end}, when used as setter
     * @fires {@link Scene.leave}, when used as setter
     *
     * @param {number} [progress] - The new progress value of the scene `[0-1]`.
     * @returns {number} `get` -  Current scene progress.
     * @returns {Scene} `set` -  Parent object for chaining.
     */


    this.progress = function (progress) {
      if (!arguments.length) {
        // get
        return _progress;
      } else {
        // set
        var doUpdate = false,
            oldState = _state,
            scrollDirection = _controller ? _controller.info("scrollDirection") : 'PAUSED',
            reverseOrForward = _options.reverse || progress >= _progress;

        if (_options.duration === 0) {
          // zero duration scenes
          doUpdate = _progress != progress;
          _progress = progress < 1 && reverseOrForward ? 0 : 1;
          _state = _progress === 0 ? SCENE_STATE_BEFORE : SCENE_STATE_DURING;
        } else {
          // scenes with start and end
          if (progress < 0 && _state !== SCENE_STATE_BEFORE && reverseOrForward) {
            // go back to initial state
            _progress = 0;
            _state = SCENE_STATE_BEFORE;
            doUpdate = true;
          } else if (progress >= 0 && progress < 1 && reverseOrForward) {
            _progress = progress;
            _state = SCENE_STATE_DURING;
            doUpdate = true;
          } else if (progress >= 1 && _state !== SCENE_STATE_AFTER) {
            _progress = 1;
            _state = SCENE_STATE_AFTER;
            doUpdate = true;
          } else if (_state === SCENE_STATE_DURING && !reverseOrForward) {
            updatePinState(); // in case we scrolled backwards mid-scene and reverse is disabled => update the pin position, so it doesn't move back as well.
          }
        }

        if (doUpdate) {
          // fire events
          var eventVars = {
            progress: _progress,
            state: _state,
            scrollDirection: scrollDirection
          },
              stateChanged = _state != oldState;

          var trigger = function trigger(eventName) {
            // tmp helper to simplify code
            Scene.trigger(eventName, eventVars);
          };

          if (stateChanged) {
            // enter events
            if (oldState !== SCENE_STATE_DURING) {
              trigger("enter");
              trigger(oldState === SCENE_STATE_BEFORE ? "start" : "end");
            }
          }

          trigger("progress");

          if (stateChanged) {
            // leave events
            if (_state !== SCENE_STATE_DURING) {
              trigger(_state === SCENE_STATE_BEFORE ? "start" : "end");
              trigger("leave");
            }
          }
        }

        return Scene;
      }
    };
    /**
     * Update the start and end scrollOffset of the container.
     * The positions reflect what the controller's scroll position will be at the start and end respectively.
     * Is called, when:
     *   - Scene event "change" is called with: offset, triggerHook, duration 
     *   - scroll container event "resize" is called
     *   - the position of the triggerElement changes
     *   - the controller changes -> addTo()
     * @private
     */


    var updateScrollOffset = function updateScrollOffset() {
      _scrollOffset = {
        start: _triggerPos + _options.offset
      };

      if (_controller && _options.triggerElement) {
        // take away triggerHook portion to get relative to top
        _scrollOffset.start -= _controller.info("size") * _options.triggerHook;
      }

      _scrollOffset.end = _scrollOffset.start + _options.duration;
    };
    /**
     * Updates the duration if set to a dynamic function.
     * This method is called when the scene is added to a controller and in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.change}, if the duration changed
     * @fires {@link Scene.shift}, if the duration changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateDuration = function updateDuration(suppressEvents) {
      // update duration
      if (_durationUpdateMethod) {
        var varname = "duration";

        if (changeOption(varname, _durationUpdateMethod.call(Scene)) && !suppressEvents) {
          // set
          Scene.trigger("change", {
            what: varname,
            newval: _options[varname]
          });
          Scene.trigger("shift", {
            reason: varname
          });
        }
      }
    };
    /**
     * Updates the position of the triggerElement, if present.
     * This method is called ...
     *  - ... when the triggerElement is changed
     *  - ... when the scene is added to a (new) controller
     *  - ... in regular intervals from the controller through scene.refresh().
     * 
     * @fires {@link Scene.shift}, if the position changed
     *
     * @param {boolean} [suppressEvents=false] - If true the shift event will be suppressed.
     * @private
     */


    var updateTriggerElementPosition = function updateTriggerElementPosition(suppressEvents) {
      var elementPos = 0,
          telem = _options.triggerElement;

      if (_controller && telem) {
        var controllerInfo = _controller.info(),
            containerOffset = _util.get.offset(controllerInfo.container),
            // container position is needed because element offset is returned in relation to document, not in relation to container.
        param = controllerInfo.vertical ? "top" : "left"; // which param is of interest ?
        // if parent is spacer, use spacer position instead so correct start position is returned for pinned elements.


        while (telem.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
          telem = telem.parentNode;
        }

        var elementOffset = _util.get.offset(telem);

        if (!controllerInfo.isDocument) {
          // container is not the document root, so substract scroll Position to get correct trigger element position relative to scrollcontent
          containerOffset[param] -= _controller.scrollPos();
        }

        elementPos = elementOffset[param] - containerOffset[param];
      }

      var changed = elementPos != _triggerPos;
      _triggerPos = elementPos;

      if (changed && !suppressEvents) {
        Scene.trigger("shift", {
          reason: "triggerElementPosition"
        });
      }
    };
    /**
     * Trigger a shift event, when the container is resized and the triggerHook is > 1.
     * @private
     */


    var onContainerResize = function onContainerResize(e) {
      if (_options.triggerHook > 0) {
        Scene.trigger("shift", {
          reason: "containerResize"
        });
      }
    };

    var _validate = _util.extend(SCENE_OPTIONS.validate, {
      // validation for duration handled internally for reference to private var _durationMethod
      duration: function duration(val) {
        if (_util.type.String(val) && val.match(/^(\.|\d)*\d+%$/)) {
          // percentage value
          var perc = parseFloat(val) / 100;

          val = function val() {
            return _controller ? _controller.info("size") * perc : 0;
          };
        }

        if (_util.type.Function(val)) {
          // function
          _durationUpdateMethod = val;

          try {
            val = parseFloat(_durationUpdateMethod());
          } catch (e) {
            val = -1; // will cause error below
          }
        } // val has to be float


        val = parseFloat(val);

        if (!_util.type.Number(val) || val < 0) {
          if (_durationUpdateMethod) {
            _durationUpdateMethod = undefined;
            throw ["Invalid return value of supplied function for option \"duration\":", val];
          } else {
            throw ["Invalid value for option \"duration\":", val];
          }
        }

        return val;
      }
    });
    /**
     * Checks the validity of a specific or all options and reset to default if neccessary.
     * @private
     */


    var validateOption = function validateOption(check) {
      check = arguments.length ? [check] : Object.keys(_validate);
      check.forEach(function (optionName, key) {
        var value;

        if (_validate[optionName]) {
          // there is a validation method for this option
          try {
            // validate value
            value = _validate[optionName](_options[optionName]);
          } catch (e) {
            // validation failed -> reset to default
            value = DEFAULT_OPTIONS[optionName];
            var logMSG = _util.type.String(e) ? [e] : e;

            if (_util.type.Array(logMSG)) {
              logMSG[0] = "ERROR: " + logMSG[0];
              logMSG.unshift(1); // loglevel 1 for error msg

              log.apply(this, logMSG);
            } else {
              log(1, "ERROR: Problem executing validation callback for option '" + optionName + "':", e.message);
            }
          } finally {
            _options[optionName] = value;
          }
        }
      });
    };
    /**
     * Helper used by the setter/getters for scene options
     * @private
     */


    var changeOption = function changeOption(varname, newval) {
      var changed = false,
          oldval = _options[varname];

      if (_options[varname] != newval) {
        _options[varname] = newval;
        validateOption(varname); // resets to default if necessary

        changed = oldval != _options[varname];
      }

      return changed;
    }; // generate getters/setters for all options


    var addSceneOption = function addSceneOption(optionName) {
      if (!Scene[optionName]) {
        Scene[optionName] = function (newVal) {
          if (!arguments.length) {
            // get
            return _options[optionName];
          } else {
            if (optionName === "duration") {
              // new duration is set, so any previously set function must be unset
              _durationUpdateMethod = undefined;
            }

            if (changeOption(optionName, newVal)) {
              // set
              Scene.trigger("change", {
                what: optionName,
                newval: _options[optionName]
              });

              if (SCENE_OPTIONS.shifts.indexOf(optionName) > -1) {
                Scene.trigger("shift", {
                  reason: optionName
                });
              }
            }
          }

          return Scene;
        };
      }
    };
    /**
     * **Get** or **Set** the duration option value.
     * As a setter it also accepts a function returning a numeric value.  
     * This is particularly useful for responsive setups.
     *
     * The duration is updated using the supplied function every time `Scene.refresh()` is called, which happens periodically from the controller (see ScrollMagic.Controller option `refreshInterval`).  
     * _**NOTE:** Be aware that it's an easy way to kill performance, if you supply a function that has high CPU demand.  
     * Even for size and position calculations it is recommended to use a variable to cache the value. (see example)  
     * This counts double if you use the same function for multiple scenes._
     *
     * @method ScrollMagic.Scene#duration
     * @example
     * // get the current duration value
     * var duration = scene.duration();
     *
     * // set a new duration
     * scene.duration(300);
     *
     * // use a function to automatically adjust the duration to the window height.
     * var durationValueCache;
     * function getDuration () {
     *   return durationValueCache;
     * }
     * function updateDuration (e) {
     *   durationValueCache = window.innerHeight;
     * }
     * $(window).on("resize", updateDuration); // update the duration when the window size changes
     * $(window).triggerHandler("resize"); // set to initial value
     * scene.duration(getDuration); // supply duration method
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|function)} [newDuration] - The new duration of the scene.
     * @returns {number} `get` -  Current scene duration.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the offset option value.
     * @method ScrollMagic.Scene#offset
     * @example
     * // get the current offset
     * var offset = scene.offset();
     *
     * // set a new offset
     * scene.offset(100);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {number} [newOffset] - The new offset of the scene.
     * @returns {number} `get` -  Current scene offset.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerElement option value.
     * Does **not** fire `Scene.shift`, because changing the trigger Element doesn't necessarily mean the start position changes. This will be determined in `Scene.refresh()`, which is automatically triggered.
     * @method ScrollMagic.Scene#triggerElement
     * @example
     * // get the current triggerElement
     * var triggerElement = scene.triggerElement();
     *
     * // set a new triggerElement using a selector
     * scene.triggerElement("#trigger");
     * // set a new triggerElement using a DOM object
     * scene.triggerElement(document.getElementById("trigger"));
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {(string|object)} [newTriggerElement] - The new trigger element for the scene.
     * @returns {(string|object)} `get` -  Current triggerElement.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the triggerHook option value.
     * @method ScrollMagic.Scene#triggerHook
     * @example
     * // get the current triggerHook value
     * var triggerHook = scene.triggerHook();
     *
     * // set a new triggerHook using a string
     * scene.triggerHook("onLeave");
     * // set a new triggerHook using a number
     * scene.triggerHook(0.7);
     *
     * @fires {@link Scene.change}, when used as setter
     * @fires {@link Scene.shift}, when used as setter
     * @param {(number|string)} [newTriggerHook] - The new triggerHook of the scene. See {@link Scene} parameter description for value options.
     * @returns {number} `get` -  Current triggerHook (ALWAYS numerical).
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the reverse option value.
     * @method ScrollMagic.Scene#reverse
     * @example
     * // get the current reverse option
     * var reverse = scene.reverse();
     *
     * // set new reverse option
     * scene.reverse(false);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {boolean} [newReverse] - The new reverse setting of the scene.
     * @returns {boolean} `get` -  Current reverse option value.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** or **Set** the loglevel option value.
     * @method ScrollMagic.Scene#loglevel
     * @example
     * // get the current loglevel
     * var loglevel = scene.loglevel();
     *
     * // set new loglevel
     * scene.loglevel(3);
     *
     * @fires {@link Scene.change}, when used as setter
     * @param {number} [newLoglevel] - The new loglevel setting of the scene. `[0-3]`
     * @returns {number} `get` -  Current loglevel.
     * @returns {Scene} `set` -  Parent object for chaining.
     */

    /**
     * **Get** the associated controller.
     * @method ScrollMagic.Scene#controller
     * @example
     * // get the controller of a scene
     * var controller = scene.controller();
     *
     * @returns {ScrollMagic.Controller} Parent controller or `undefined`
     */


    this.controller = function () {
      return _controller;
    };
    /**
     * **Get** the current state.
     * @method ScrollMagic.Scene#state
     * @example
     * // get the current state
     * var state = scene.state();
     *
     * @returns {string} `"BEFORE"`, `"DURING"` or `"AFTER"`
     */


    this.state = function () {
      return _state;
    };
    /**
     * **Get** the current scroll offset for the start of the scene.  
     * Mind, that the scrollOffset is related to the size of the container, if `triggerHook` is bigger than `0` (or `"onLeave"`).  
     * This means, that resizing the container or changing the `triggerHook` will influence the scene's start offset.
     * @method ScrollMagic.Scene#scrollOffset
     * @example
     * // get the current scroll offset for the start and end of the scene.
     * var start = scene.scrollOffset();
     * var end = scene.scrollOffset() + scene.duration();
     * console.log("the scene starts at", start, "and ends at", end);
     *
     * @returns {number} The scroll offset (of the container) at which the scene will trigger. Y value for vertical and X value for horizontal scrolls.
     */


    this.scrollOffset = function () {
      return _scrollOffset.start;
    };
    /**
     * **Get** the trigger position of the scene (including the value of the `offset` option).  
     * @method ScrollMagic.Scene#triggerPosition
     * @example
     * // get the scene's trigger position
     * var triggerPosition = scene.triggerPosition();
     *
     * @returns {number} Start position of the scene. Top position value for vertical and left position value for horizontal scrolls.
     */


    this.triggerPosition = function () {
      var pos = _options.offset; // the offset is the basis

      if (_controller) {
        // get the trigger position
        if (_options.triggerElement) {
          // Element as trigger
          pos += _triggerPos;
        } else {
          // return the height of the triggerHook to start at the beginning
          pos += _controller.info("size") * Scene.triggerHook();
        }
      }

      return pos;
    };

    var _pin, _pinOptions;

    Scene.on("shift.internal", function (e) {
      var durationChanged = e.reason === "duration";

      if (_state === SCENE_STATE_AFTER && durationChanged || _state === SCENE_STATE_DURING && _options.duration === 0) {
        // if [duration changed after a scene (inside scene progress updates pin position)] or [duration is 0, we are in pin phase and some other value changed].
        updatePinState();
      }

      if (durationChanged) {
        updatePinDimensions();
      }
    }).on("progress.internal", function (e) {
      updatePinState();
    }).on("add.internal", function (e) {
      updatePinDimensions();
    }).on("destroy.internal", function (e) {
      Scene.removePin(e.reset);
    });
    /**
     * Update the pin state.
     * @private
     */

    var updatePinState = function updatePinState(forceUnpin) {
      if (_pin && _controller) {
        var containerInfo = _controller.info(),
            pinTarget = _pinOptions.spacer.firstChild; // may be pin element or another spacer, if cascading pins


        if (!forceUnpin && _state === SCENE_STATE_DURING) {
          // during scene or if duration is 0 and we are past the trigger
          // pinned state
          if (_util.css(pinTarget, "position") != "fixed") {
            // change state before updating pin spacer (position changes due to fixed collapsing might occur.)
            _util.css(pinTarget, {
              "position": "fixed"
            }); // update pin spacer


            updatePinDimensions();
          }

          var fixedPos = _util.get.offset(_pinOptions.spacer, true),
              // get viewport position of spacer
          scrollDistance = _options.reverse || _options.duration === 0 ? containerInfo.scrollPos - _scrollOffset.start // quicker
          : Math.round(_progress * _options.duration * 10) / 10; // if no reverse and during pin the position needs to be recalculated using the progress
          // add scrollDistance


          fixedPos[containerInfo.vertical ? "top" : "left"] += scrollDistance; // set new values

          _util.css(_pinOptions.spacer.firstChild, {
            top: fixedPos.top,
            left: fixedPos.left
          });
        } else {
          // unpinned state
          var newCSS = {
            position: _pinOptions.inFlow ? "relative" : "absolute",
            top: 0,
            left: 0
          },
              change = _util.css(pinTarget, "position") != newCSS.position;

          if (!_pinOptions.pushFollowers) {
            newCSS[containerInfo.vertical ? "top" : "left"] = _options.duration * _progress;
          } else if (_options.duration > 0) {
            // only concerns scenes with duration
            if (_state === SCENE_STATE_AFTER && parseFloat(_util.css(_pinOptions.spacer, "padding-top")) === 0) {
              change = true; // if in after state but havent updated spacer yet (jumped past pin)
            } else if (_state === SCENE_STATE_BEFORE && parseFloat(_util.css(_pinOptions.spacer, "padding-bottom")) === 0) {
              // before
              change = true; // jumped past fixed state upward direction
            }
          } // set new values


          _util.css(pinTarget, newCSS);

          if (change) {
            // update pin spacer if state changed
            updatePinDimensions();
          }
        }
      }
    };
    /**
     * Update the pin spacer and/or element size.
     * The size of the spacer needs to be updated whenever the duration of the scene changes, if it is to push down following elements.
     * @private
     */


    var updatePinDimensions = function updatePinDimensions() {
      if (_pin && _controller && _pinOptions.inFlow) {
        // no spacerresize, if original position is absolute
        var after = _state === SCENE_STATE_AFTER,
            before = _state === SCENE_STATE_BEFORE,
            during = _state === SCENE_STATE_DURING,
            vertical = _controller.info("vertical"),
            pinTarget = _pinOptions.spacer.firstChild,
            // usually the pined element but can also be another spacer (cascaded pins)
        marginCollapse = _util.isMarginCollapseType(_util.css(_pinOptions.spacer, "display")),
            css = {}; // set new size
        // if relsize: spacer -> pin | else: pin -> spacer


        if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
          if (during) {
            _util.css(_pin, {
              "width": _util.get.width(_pinOptions.spacer)
            });
          } else {
            _util.css(_pin, {
              "width": "100%"
            });
          }
        } else {
          // minwidth is needed for cascaded pins.
          css["min-width"] = _util.get.width(vertical ? _pin : pinTarget, true, true);
          css.width = during ? css["min-width"] : "auto";
        }

        if (_pinOptions.relSize.height) {
          if (during) {
            // the only padding the spacer should ever include is the duration (if pushFollowers = true), so we need to substract that.
            _util.css(_pin, {
              "height": _util.get.height(_pinOptions.spacer) - (_pinOptions.pushFollowers ? _options.duration : 0)
            });
          } else {
            _util.css(_pin, {
              "height": "100%"
            });
          }
        } else {
          // margin is only included if it's a cascaded pin to resolve an IE9 bug
          css["min-height"] = _util.get.height(vertical ? pinTarget : _pin, true, !marginCollapse); // needed for cascading pins

          css.height = during ? css["min-height"] : "auto";
        } // add space for duration if pushFollowers is true


        if (_pinOptions.pushFollowers) {
          css["padding" + (vertical ? "Top" : "Left")] = _options.duration * _progress;
          css["padding" + (vertical ? "Bottom" : "Right")] = _options.duration * (1 - _progress);
        }

        _util.css(_pinOptions.spacer, css);
      }
    };
    /**
     * Updates the Pin state (in certain scenarios)
     * If the controller container is not the document and we are mid-pin-phase scrolling or resizing the main document can result to wrong pin positions.
     * So this function is called on resize and scroll of the document.
     * @private
     */


    var updatePinInContainer = function updatePinInContainer() {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        updatePinState();
      }
    };
    /**
     * Updates the Pin spacer size state (in certain scenarios)
     * If container is resized during pin and relatively sized the size of the pin might need to be updated...
     * So this function is called on resize of the container.
     * @private
     */


    var updateRelativePinSpacer = function updateRelativePinSpacer() {
      if (_controller && _pin && // well, duh
      _state === SCENE_STATE_DURING && ( // element in pinned state?
      // is width or height relatively sized, but not in relation to body? then we need to recalc.
      (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) && _util.get.width(window) != _util.get.width(_pinOptions.spacer.parentNode) || _pinOptions.relSize.height && _util.get.height(window) != _util.get.height(_pinOptions.spacer.parentNode))) {
        updatePinDimensions();
      }
    };
    /**
     * Is called, when the mousewhel is used while over a pinned element inside a div container.
     * If the scene is in fixed state scroll events would be counted towards the body. This forwards the event to the scroll container.
     * @private
     */


    var onMousewheelOverPin = function onMousewheelOverPin(e) {
      if (_controller && _pin && _state === SCENE_STATE_DURING && !_controller.info("isDocument")) {
        // in pin state
        e.preventDefault();

        _controller._setScrollPos(_controller.info("scrollPos") - ((e.wheelDelta || e[_controller.info("vertical") ? "wheelDeltaY" : "wheelDeltaX"]) / 3 || -e.detail * 30));
      }
    };
    /**
     * Pin an element for the duration of the tween.  
     * If the scene duration is 0 the element will only be unpinned, if the user scrolls back past the start position.  
     * Make sure only one pin is applied to an element at the same time.
     * An element can be pinned multiple times, but only successively.
     * _**NOTE:** The option `pushFollowers` has no effect, when the scene duration is 0._
     * @method ScrollMagic.Scene#setPin
     * @example
     * // pin element and push all following elements down by the amount of the pin duration.
     * scene.setPin("#pin");
     *
     * // pin element and keeping all following elements in their place. The pinned element will move past them.
     * scene.setPin("#pin", {pushFollowers: false});
     *
     * @param {(string|object)} element - A Selector targeting an element or a DOM object that is supposed to be pinned.
     * @param {object} [settings] - settings for the pin
     * @param {boolean} [settings.pushFollowers=true] - If `true` following elements will be "pushed" down for the duration of the pin, if `false` the pinned element will just scroll past them.  
     Ignored, when duration is `0`.
     * @param {string} [settings.spacerClass="scrollmagic-pin-spacer"] - Classname of the pin spacer element, which is used to replace the element.
     *
     * @returns {Scene} Parent object for chaining.
     */


    this.setPin = function (element, settings) {
      var defaultSettings = {
        pushFollowers: true,
        spacerClass: "scrollmagic-pin-spacer"
      };
      settings = _util.extend({}, defaultSettings, settings); // validate Element

      element = _util.get.elements(element)[0];

      if (!element) {
        log(1, "ERROR calling method 'setPin()': Invalid pin element supplied.");
        return Scene; // cancel
      } else if (_util.css(element, "position") === "fixed") {
        log(1, "ERROR calling method 'setPin()': Pin does not work with elements that are positioned 'fixed'.");
        return Scene; // cancel
      }

      if (_pin) {
        // preexisting pin?
        if (_pin === element) {
          // same pin we already have -> do nothing
          return Scene; // cancel
        } else {
          // kill old pin
          Scene.removePin();
        }
      }

      _pin = element;
      var parentDisplay = _pin.parentNode.style.display,
          boundsParams = ["top", "left", "bottom", "right", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
      _pin.parentNode.style.display = 'none'; // hack start to force css to return stylesheet values instead of calculated px values.

      var inFlow = _util.css(_pin, "position") != "absolute",
          pinCSS = _util.css(_pin, boundsParams.concat(["display"])),
          sizeCSS = _util.css(_pin, ["width", "height"]);

      _pin.parentNode.style.display = parentDisplay; // hack end.

      if (!inFlow && settings.pushFollowers) {
        log(2, "WARNING: If the pinned element is positioned absolutely pushFollowers will be disabled.");
        settings.pushFollowers = false;
      }

      window.setTimeout(function () {
        // wait until all finished, because with responsive duration it will only be set after scene is added to controller
        if (_pin && _options.duration === 0 && settings.pushFollowers) {
          log(2, "WARNING: pushFollowers =", true, "has no effect, when scene duration is 0.");
        }
      }, 0); // create spacer and insert

      var spacer = _pin.parentNode.insertBefore(document.createElement('div'), _pin),
          spacerCSS = _util.extend(pinCSS, {
        position: inFlow ? "relative" : "absolute",
        boxSizing: "content-box",
        mozBoxSizing: "content-box",
        webkitBoxSizing: "content-box"
      });

      if (!inFlow) {
        // copy size if positioned absolutely, to work for bottom/right positioned elements.
        _util.extend(spacerCSS, _util.css(_pin, ["width", "height"]));
      }

      _util.css(spacer, spacerCSS);

      spacer.setAttribute(PIN_SPACER_ATTRIBUTE, "");

      _util.addClass(spacer, settings.spacerClass); // set the pin Options


      _pinOptions = {
        spacer: spacer,
        relSize: {
          // save if size is defined using % values. if so, handle spacer resize differently...
          width: sizeCSS.width.slice(-1) === "%",
          height: sizeCSS.height.slice(-1) === "%",
          autoFullWidth: sizeCSS.width === "auto" && inFlow && _util.isMarginCollapseType(pinCSS.display)
        },
        pushFollowers: settings.pushFollowers,
        inFlow: inFlow // stores if the element takes up space in the document flow

      };

      if (!_pin.___origStyle) {
        _pin.___origStyle = {};
        var pinInlineCSS = _pin.style,
            copyStyles = boundsParams.concat(["width", "height", "position", "boxSizing", "mozBoxSizing", "webkitBoxSizing"]);
        copyStyles.forEach(function (val) {
          _pin.___origStyle[val] = pinInlineCSS[val] || "";
        });
      } // if relative size, transfer it to spacer and make pin calculate it...


      if (_pinOptions.relSize.width) {
        _util.css(spacer, {
          width: sizeCSS.width
        });
      }

      if (_pinOptions.relSize.height) {
        _util.css(spacer, {
          height: sizeCSS.height
        });
      } // now place the pin element inside the spacer	


      spacer.appendChild(_pin); // and set new css

      _util.css(_pin, {
        position: inFlow ? "relative" : "absolute",
        margin: "auto",
        top: "auto",
        left: "auto",
        bottom: "auto",
        right: "auto"
      });

      if (_pinOptions.relSize.width || _pinOptions.relSize.autoFullWidth) {
        _util.css(_pin, {
          boxSizing: "border-box",
          mozBoxSizing: "border-box",
          webkitBoxSizing: "border-box"
        });
      } // add listener to document to update pin position in case controller is not the document.


      window.addEventListener('scroll', updatePinInContainer);
      window.addEventListener('resize', updatePinInContainer);
      window.addEventListener('resize', updateRelativePinSpacer); // add mousewheel listener to catch scrolls over fixed elements

      _pin.addEventListener("mousewheel", onMousewheelOverPin);

      _pin.addEventListener("DOMMouseScroll", onMousewheelOverPin);

      log(3, "added pin"); // finally update the pin to init

      updatePinState();
      return Scene;
    };
    /**
     * Remove the pin from the scene.
     * @method ScrollMagic.Scene#removePin
     * @example
     * // remove the pin from the scene without resetting it (the spacer is not removed)
     * scene.removePin();
     *
     * // remove the pin from the scene and reset the pin element to its initial position (spacer is removed)
     * scene.removePin(true);
     *
     * @param {boolean} [reset=false] - If `false` the spacer will not be removed and the element's position will not be reset.
     * @returns {Scene} Parent object for chaining.
     */


    this.removePin = function (reset) {
      if (_pin) {
        if (_state === SCENE_STATE_DURING) {
          updatePinState(true); // force unpin at position
        }

        if (reset || !_controller) {
          // if there's no controller no progress was made anyway...
          var pinTarget = _pinOptions.spacer.firstChild; // usually the pin element, but may be another spacer (cascaded pins)...

          if (pinTarget.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // copy margins to child spacer
            var style = _pinOptions.spacer.style,
                values = ["margin", "marginLeft", "marginRight", "marginTop", "marginBottom"];
            margins = {};
            values.forEach(function (val) {
              margins[val] = style[val] || "";
            });

            _util.css(pinTarget, margins);
          }

          _pinOptions.spacer.parentNode.insertBefore(pinTarget, _pinOptions.spacer);

          _pinOptions.spacer.parentNode.removeChild(_pinOptions.spacer);

          if (!_pin.parentNode.hasAttribute(PIN_SPACER_ATTRIBUTE)) {
            // if it's the last pin for this element -> restore inline styles
            // TODO: only correctly set for first pin (when cascading) - how to fix?
            _util.css(_pin, _pin.___origStyle);

            delete _pin.___origStyle;
          }
        }

        window.removeEventListener('scroll', updatePinInContainer);
        window.removeEventListener('resize', updatePinInContainer);
        window.removeEventListener('resize', updateRelativePinSpacer);

        _pin.removeEventListener("mousewheel", onMousewheelOverPin);

        _pin.removeEventListener("DOMMouseScroll", onMousewheelOverPin);

        _pin = undefined;
        log(3, "removed pin (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };

    var _cssClasses,
        _cssClassElems = [];

    Scene.on("destroy.internal", function (e) {
      Scene.removeClassToggle(e.reset);
    });
    /**
     * Define a css class modification while the scene is active.  
     * When the scene triggers the classes will be added to the supplied element and removed, when the scene is over.
     * If the scene duration is 0 the classes will only be removed if the user scrolls back past the start position.
     * @method ScrollMagic.Scene#setClassToggle
     * @example
     * // add the class 'myclass' to the element with the id 'my-elem' for the duration of the scene
     * scene.setClassToggle("#my-elem", "myclass");
     *
     * // add multiple classes to multiple elements defined by the selector '.classChange'
     * scene.setClassToggle(".classChange", "class1 class2 class3");
     *
     * @param {(string|object)} element - A Selector targeting one or more elements or a DOM object that is supposed to be modified.
     * @param {string} classes - One or more Classnames (separated by space) that should be added to the element during the scene.
     *
     * @returns {Scene} Parent object for chaining.
     */

    this.setClassToggle = function (element, classes) {
      var elems = _util.get.elements(element);

      if (elems.length === 0 || !_util.type.String(classes)) {
        log(1, "ERROR calling method 'setClassToggle()': Invalid " + (elems.length === 0 ? "element" : "classes") + " supplied.");
        return Scene;
      }

      if (_cssClassElems.length > 0) {
        // remove old ones
        Scene.removeClassToggle();
      }

      _cssClasses = classes;
      _cssClassElems = elems;
      Scene.on("enter.internal_class leave.internal_class", function (e) {
        var toggle = e.type === "enter" ? _util.addClass : _util.removeClass;

        _cssClassElems.forEach(function (elem, key) {
          toggle(elem, _cssClasses);
        });
      });
      return Scene;
    };
    /**
     * Remove the class binding from the scene.
     * @method ScrollMagic.Scene#removeClassToggle
     * @example
     * // remove class binding from the scene without reset
     * scene.removeClassToggle();
     *
     * // remove class binding and remove the changes it caused
     * scene.removeClassToggle(true);
     *
     * @param {boolean} [reset=false] - If `false` and the classes are currently active, they will remain on the element. If `true` they will be removed.
     * @returns {Scene} Parent object for chaining.
     */


    this.removeClassToggle = function (reset) {
      if (reset) {
        _cssClassElems.forEach(function (elem, key) {
          _util.removeClass(elem, _cssClasses);
        });
      }

      Scene.off("start.internal_class end.internal_class");
      _cssClasses = undefined;
      _cssClassElems = [];
      return Scene;
    }; // INIT


    construct();
    return Scene;
  }; // store pagewide scene options


  var SCENE_OPTIONS = {
    defaults: {
      duration: 0,
      offset: 0,
      triggerElement: undefined,
      triggerHook: 0.5,
      reverse: true,
      loglevel: 2
    },
    validate: {
      offset: function offset(val) {
        val = parseFloat(val);

        if (!_util.type.Number(val)) {
          throw ["Invalid value for option \"offset\":", val];
        }

        return val;
      },
      triggerElement: function triggerElement(val) {
        val = val || undefined;

        if (val) {
          var elem = _util.get.elements(val)[0];

          if (elem) {
            val = elem;
          } else {
            throw ["Element defined in option \"triggerElement\" was not found:", val];
          }
        }

        return val;
      },
      triggerHook: function triggerHook(val) {
        var translate = {
          "onCenter": 0.5,
          "onEnter": 1,
          "onLeave": 0
        };

        if (_util.type.Number(val)) {
          val = Math.max(0, Math.min(parseFloat(val), 1)); //  make sure its betweeen 0 and 1
        } else if (val in translate) {
          val = translate[val];
        } else {
          throw ["Invalid value for option \"triggerHook\": ", val];
        }

        return val;
      },
      reverse: function reverse(val) {
        return !!val; // force boolean
      },
      loglevel: function loglevel(val) {
        val = parseInt(val);

        if (!_util.type.Number(val) || val < 0 || val > 3) {
          throw ["Invalid value for option \"loglevel\":", val];
        }

        return val;
      }
    },
    // holder for  validation methods. duration validation is handled in 'getters-setters.js'
    shifts: ["duration", "offset", "triggerHook"] // list of options that trigger a `shift` event

  };
  /*
   * method used to add an option to ScrollMagic Scenes.
   * TODO: DOC (private for dev)
   */

  ScrollMagic.Scene.addOption = function (name, defaultValue, validationCallback, shifts) {
    if (!(name in SCENE_OPTIONS.defaults)) {
      SCENE_OPTIONS.defaults[name] = defaultValue;
      SCENE_OPTIONS.validate[name] = validationCallback;

      if (shifts) {
        SCENE_OPTIONS.shifts.push(name);
      }
    } else {
      ScrollMagic._util.log(1, "[static] ScrollMagic.Scene -> Cannot add Scene option '" + name + "', because it already exists.");
    }
  }; // instance extension function for plugins
  // TODO: DOC (private for dev)


  ScrollMagic.Scene.extend = function (extension) {
    var oldClass = this;

    ScrollMagic.Scene = function () {
      oldClass.apply(this, arguments);
      this.$super = _util.extend({}, this); // copy parent state

      return extension.apply(this, arguments) || this;
    };

    _util.extend(ScrollMagic.Scene, oldClass); // copy properties


    ScrollMagic.Scene.prototype = oldClass.prototype; // copy prototype

    ScrollMagic.Scene.prototype.constructor = ScrollMagic.Scene; // restore constructor
  };
  /**
   * TODO: DOCS (private for dev)
   * @class
   * @private
   */


  ScrollMagic.Event = function (type, namespace, target, vars) {
    vars = vars || {};

    for (var key in vars) {
      this[key] = vars[key];
    }

    this.type = type;
    this.target = this.currentTarget = target;
    this.namespace = namespace || '';
    this.timeStamp = this.timestamp = Date.now();
    return this;
  };
  /*
   * TODO: DOCS (private for dev)
   */


  var _util = ScrollMagic._util = function (window) {
    var U = {},
        i;
    /**
     * ------------------------------
     * internal helpers
     * ------------------------------
     */
    // parse float and fall back to 0.

    var floatval = function floatval(number) {
      return parseFloat(number) || 0;
    }; // get current style IE safe (otherwise IE would return calculated values for 'auto')


    var _getComputedStyle = function _getComputedStyle(elem) {
      return elem.currentStyle ? elem.currentStyle : window.getComputedStyle(elem);
    }; // get element dimension (width or height)


    var _dimension = function _dimension(which, elem, outer, includeMargin) {
      elem = elem === document ? window : elem;

      if (elem === window) {
        includeMargin = false;
      } else if (!_type.DomElement(elem)) {
        return 0;
      }

      which = which.charAt(0).toUpperCase() + which.substr(1).toLowerCase();
      var dimension = (outer ? elem['offset' + which] || elem['outer' + which] : elem['client' + which] || elem['inner' + which]) || 0;

      if (outer && includeMargin) {
        var style = _getComputedStyle(elem);

        dimension += which === 'Height' ? floatval(style.marginTop) + floatval(style.marginBottom) : floatval(style.marginLeft) + floatval(style.marginRight);
      }

      return dimension;
    }; // converts 'margin-top' into 'marginTop'


    var _camelCase = function _camelCase(str) {
      return str.replace(/^[^a-z]+([a-z])/g, '$1').replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
    };
    /**
     * ------------------------------
     * external helpers
     * ------------------------------
     */
    // extend obj – same as jQuery.extend({}, objA, objB)


    U.extend = function (obj) {
      obj = obj || {};

      for (i = 1; i < arguments.length; i++) {
        if (!arguments[i]) {
          continue;
        }

        for (var key in arguments[i]) {
          if (arguments[i].hasOwnProperty(key)) {
            obj[key] = arguments[i][key];
          }
        }
      }

      return obj;
    }; // check if a css display type results in margin-collapse or not


    U.isMarginCollapseType = function (str) {
      return ["block", "flex", "list-item", "table", "-webkit-box"].indexOf(str) > -1;
    }; // implementation of requestAnimationFrame
    // based on https://gist.github.com/paulirish/1579671


    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];
    var _requestAnimationFrame = window.requestAnimationFrame;
    var _cancelAnimationFrame = window.cancelAnimationFrame; // try vendor prefixes if the above doesn't work

    for (i = 0; !_requestAnimationFrame && i < vendors.length; ++i) {
      _requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame'];
      _cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame'];
    } // fallbacks


    if (!_requestAnimationFrame) {
      _requestAnimationFrame = function _requestAnimationFrame(callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = window.setTimeout(function () {
          callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!_cancelAnimationFrame) {
      _cancelAnimationFrame = function _cancelAnimationFrame(id) {
        window.clearTimeout(id);
      };
    }

    U.rAF = _requestAnimationFrame.bind(window);
    U.cAF = _cancelAnimationFrame.bind(window);
    var loglevels = ["error", "warn", "log"],
        console = window.console || {};

    console.log = console.log || function () {}; // no console log, well - do nothing then...
    // make sure methods for all levels exist.


    for (i = 0; i < loglevels.length; i++) {
      var method = loglevels[i];

      if (!console[method]) {
        console[method] = console.log; // prefer .log over nothing
      }
    }

    U.log = function (loglevel) {
      if (loglevel > loglevels.length || loglevel <= 0) loglevel = loglevels.length;
      var now = new Date(),
          time = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2) + ":" + ("0" + now.getSeconds()).slice(-2) + ":" + ("00" + now.getMilliseconds()).slice(-3),
          method = loglevels[loglevel - 1],
          args = Array.prototype.splice.call(arguments, 1),
          func = Function.prototype.bind.call(console[method], console);
      args.unshift(time);
      func.apply(console, args);
    };
    /**
     * ------------------------------
     * type testing
     * ------------------------------
     */


    var _type = U.type = function (v) {
      return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    };

    _type.String = function (v) {
      return _type(v) === 'string';
    };

    _type.Function = function (v) {
      return _type(v) === 'function';
    };

    _type.Array = function (v) {
      return Array.isArray(v);
    };

    _type.Number = function (v) {
      return !_type.Array(v) && v - parseFloat(v) + 1 >= 0;
    };

    _type.DomElement = function (o) {
      return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
      o && _typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
    };
    /**
     * ------------------------------
     * DOM Element info
     * ------------------------------
     */
    // always returns a list of matching DOM elements, from a selector, a DOM element or an list of elements or even an array of selectors


    var _get = U.get = {};

    _get.elements = function (selector) {
      var arr = [];

      if (_type.String(selector)) {
        try {
          selector = document.querySelectorAll(selector);
        } catch (e) {
          // invalid selector
          return arr;
        }
      }

      if (_type(selector) === 'nodelist' || _type.Array(selector)) {
        for (var i = 0, ref = arr.length = selector.length; i < ref; i++) {
          // list of elements
          var elem = selector[i];
          arr[i] = _type.DomElement(elem) ? elem : _get.elements(elem); // if not an element, try to resolve recursively
        }
      } else if (_type.DomElement(selector) || selector === document || selector === window) {
        arr = [selector]; // only the element
      }

      return arr;
    }; // get scroll top value


    _get.scrollTop = function (elem) {
      return elem && typeof elem.scrollTop === 'number' ? elem.scrollTop : window.pageYOffset || 0;
    }; // get scroll left value


    _get.scrollLeft = function (elem) {
      return elem && typeof elem.scrollLeft === 'number' ? elem.scrollLeft : window.pageXOffset || 0;
    }; // get element height


    _get.width = function (elem, outer, includeMargin) {
      return _dimension('width', elem, outer, includeMargin);
    }; // get element width


    _get.height = function (elem, outer, includeMargin) {
      return _dimension('height', elem, outer, includeMargin);
    }; // get element position (optionally relative to viewport)


    _get.offset = function (elem, relativeToViewport) {
      var offset = {
        top: 0,
        left: 0
      };

      if (elem && elem.getBoundingClientRect) {
        // check if available
        var rect = elem.getBoundingClientRect();
        offset.top = rect.top;
        offset.left = rect.left;

        if (!relativeToViewport) {
          // clientRect is by default relative to viewport...
          offset.top += _get.scrollTop();
          offset.left += _get.scrollLeft();
        }
      }

      return offset;
    };
    /**
     * ------------------------------
     * DOM Element manipulation
     * ------------------------------
     */


    U.addClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.add(classname);else elem.className += ' ' + classname;
      }
    };

    U.removeClass = function (elem, classname) {
      if (classname) {
        if (elem.classList) elem.classList.remove(classname);else elem.className = elem.className.replace(new RegExp('(^|\\b)' + classname.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      }
    }; // if options is string -> returns css value
    // if options is array -> returns object with css value pairs
    // if options is object -> set new css values


    U.css = function (elem, options) {
      if (_type.String(options)) {
        return _getComputedStyle(elem)[_camelCase(options)];
      } else if (_type.Array(options)) {
        var obj = {},
            style = _getComputedStyle(elem);

        options.forEach(function (option, key) {
          obj[option] = style[_camelCase(option)];
        });
        return obj;
      } else {
        for (var option in options) {
          var val = options[option];

          if (val == parseFloat(val)) {
            // assume pixel for seemingly numerical values
            val += 'px';
          }

          elem.style[_camelCase(option)] = val;
        }
      }
    };

    return U;
  }(window || {});

  ScrollMagic.Scene.prototype.addIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling addIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeIndicators = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeIndicators() due to missing Plugin \'debug.addIndicators\'. Please make sure to include plugins/debug.addIndicators.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeTween = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeTween() due to missing Plugin \'animation.gsap\'. Please make sure to include plugins/animation.gsap.js');

    return this;
  };

  ScrollMagic.Scene.prototype.setVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling setVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  ScrollMagic.Scene.prototype.removeVelocity = function () {
    ScrollMagic._util.log(1, '(ScrollMagic.Scene) -> ERROR calling removeVelocity() due to missing Plugin \'animation.velocity\'. Please make sure to include plugins/animation.velocity.js');

    return this;
  };

  return ScrollMagic;
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 2.0.1
 * DATE: 2018-05-30
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
!function (a, b) {
  "use strict";

  var c = {},
      d = a.document,
      e = a.GreenSockGlobals = a.GreenSockGlobals || a,
      f = e[b];
  if (f) return "undefined" != typeof module && module.exports && (module.exports = f), f;

  var g,
      h,
      i,
      j,
      k,
      l = function l(a) {
    var b,
        c = a.split("."),
        d = e;

    for (b = 0; b < c.length; b++) {
      d[c[b]] = d = d[c[b]] || {};
    }

    return d;
  },
      m = l("com.greensock"),
      n = 1e-10,
      o = function o(a) {
    var b,
        c = [],
        d = a.length;

    for (b = 0; b !== d; c.push(a[b++])) {
      ;
    }

    return c;
  },
      p = function p() {},
      q = function () {
    var a = Object.prototype.toString,
        b = a.call([]);
    return function (c) {
      return null != c && (c instanceof Array || "object" == _typeof(c) && !!c.push && a.call(c) === b);
    };
  }(),
      r = {},
      s = function s(d, f, g, h) {
    this.sc = r[d] ? r[d].sc : [], r[d] = this, this.gsClass = null, this.func = g;
    var i = [];
    this.check = function (j) {
      for (var k, m, n, o, p = f.length, q = p; --p > -1;) {
        (k = r[f[p]] || new s(f[p], [])).gsClass ? (i[p] = k.gsClass, q--) : j && k.sc.push(this);
      }

      if (0 === q && g) {
        if (m = ("com.greensock." + d).split("."), n = m.pop(), o = l(m.join("."))[n] = this.gsClass = g.apply(g, i), h) if (e[n] = c[n] = o, "undefined" != typeof module && module.exports) {
          if (d === b) {
            module.exports = c[b] = o;

            for (p in c) {
              o[p] = c[p];
            }
          } else c[b] && (c[b][n] = o);
        } else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function () {
          return o;
        });

        for (p = 0; p < this.sc.length; p++) {
          this.sc[p].check();
        }
      }
    }, this.check(!0);
  },
      t = a._gsDefine = function (a, b, c, d) {
    return new s(a, b, c, d);
  },
      u = m._class = function (a, b, c) {
    return b = b || function () {}, t(a, [], function () {
      return b;
    }, c), b;
  };

  t.globals = e;

  var v = [0, 0, 1, 1],
      w = u("easing.Ease", function (a, b, c, d) {
    this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? v.concat(b) : v;
  }, !0),
      x = w.map = {},
      y = w.register = function (a, b, c, d) {
    for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(","); --j > -1;) {
      for (f = i[j], e = d ? u("easing." + f, null, !0) : m.easing[f] || {}, g = k.length; --g > -1;) {
        h = k[g], x[f + "." + h] = x[h + f] = e[h] = a.getRatio ? a : a[h] || new a();
      }
    }
  };

  for (i = w.prototype, i._calcEnd = !1, i.getRatio = function (a) {
    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
    var b = this._type,
        c = this._power,
        d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
    return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2;
  }, g = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], h = g.length; --h > -1;) {
    i = g[h] + ",Power" + h, y(new w(null, null, 1, h), i, "easeOut", !0), y(new w(null, null, 2, h), i, "easeIn" + (0 === h ? ",easeNone" : "")), y(new w(null, null, 3, h), i, "easeInOut");
  }

  x.linear = m.easing.Linear.easeIn, x.swing = m.easing.Quad.easeInOut;
  var z = u("events.EventDispatcher", function (a) {
    this._listeners = {}, this._eventTarget = a || this;
  });
  i = z.prototype, i.addEventListener = function (a, b, c, d, e) {
    e = e || 0;
    var f,
        g,
        h = this._listeners[a],
        i = 0;

    for (this !== j || k || j.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -1;) {
      f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === i && f.pr < e && (i = g + 1);
    }

    h.splice(i, 0, {
      c: b,
      s: c,
      up: d,
      pr: e
    });
  }, i.removeEventListener = function (a, b) {
    var c,
        d = this._listeners[a];
    if (d) for (c = d.length; --c > -1;) {
      if (d[c].c === b) return void d.splice(c, 1);
    }
  }, i.dispatchEvent = function (a) {
    var b,
        c,
        d,
        e = this._listeners[a];
    if (e) for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) {
      d = e[b], d && (d.up ? d.c.call(d.s || c, {
        type: a,
        target: c
      }) : d.c.call(d.s || c));
    }
  };

  var A = a.requestAnimationFrame,
      B = a.cancelAnimationFrame,
      C = Date.now || function () {
    return new Date().getTime();
  },
      D = C();

  for (g = ["ms", "moz", "webkit", "o"], h = g.length; --h > -1 && !A;) {
    A = a[g[h] + "RequestAnimationFrame"], B = a[g[h] + "CancelAnimationFrame"] || a[g[h] + "CancelRequestAnimationFrame"];
  }

  u("Ticker", function (a, b) {
    var c,
        e,
        f,
        g,
        h,
        i = this,
        l = C(),
        m = b !== !1 && A ? "auto" : !1,
        o = 500,
        q = 33,
        r = "tick",
        s = function s(a) {
      var b,
          d,
          j = C() - D;
      j > o && (l += j - q), D += j, i.time = (D - l) / 1e3, b = i.time - h, (!c || b > 0 || a === !0) && (i.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 && (f = e(s)), d && i.dispatchEvent(r);
    };

    z.call(i), i.time = i.frame = 0, i.tick = function () {
      s(!0);
    }, i.lagSmoothing = function (a, b) {
      return arguments.length ? (o = a || 1 / n, void (q = Math.min(b, o, 0))) : 1 / n > o;
    }, i.sleep = function () {
      null != f && (m && B ? B(f) : clearTimeout(f), e = p, f = null, i === j && (k = !1));
    }, i.wake = function (a) {
      null !== f ? i.sleep() : a ? l += -D + (D = C()) : i.frame > 10 && (D = C() - o + 5), e = 0 === c ? p : m && A ? A : function (a) {
        return setTimeout(a, 1e3 * (h - i.time) + 1 | 0);
      }, i === j && (k = !0), s(2);
    }, i.fps = function (a) {
      return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void i.wake()) : c;
    }, i.useRAF = function (a) {
      return arguments.length ? (i.sleep(), m = a, void i.fps(c)) : m;
    }, i.fps(a), setTimeout(function () {
      "auto" === m && i.frame < 5 && "hidden" !== (d || {}).visibilityState && i.useRAF(!1);
    }, 1500);
  }), i = m.Ticker.prototype = new m.events.EventDispatcher(), i.constructor = m.Ticker;
  var E = u("core.Animation", function (a, b) {
    if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, Y) {
      k || j.wake();
      var c = this.vars.useFrames ? X : Y;
      c.add(this, c._time), this.vars.paused && this.paused(!0);
    }
  });
  j = E.ticker = new m.Ticker(), i = E.prototype, i._dirty = i._gc = i._initted = i._paused = !1, i._totalTime = i._time = 0, i._rawPrevTime = -1, i._next = i._last = i._onUpdate = i._timeline = i.timeline = null, i._paused = !1;

  var F = function F() {
    k && C() - D > 2e3 && ("hidden" !== (d || {}).visibilityState || !j.lagSmoothing()) && j.wake();
    var a = setTimeout(F, 2e3);
    a.unref && a.unref();
  };

  F(), i.play = function (a, b) {
    return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
  }, i.pause = function (a, b) {
    return null != a && this.seek(a, b), this.paused(!0);
  }, i.resume = function (a, b) {
    return null != a && this.seek(a, b), this.paused(!1);
  }, i.seek = function (a, b) {
    return this.totalTime(Number(a), b !== !1);
  }, i.restart = function (a, b) {
    return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0);
  }, i.reverse = function (a, b) {
    return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1);
  }, i.render = function (a, b, c) {}, i.invalidate = function () {
    return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this;
  }, i.isActive = function () {
    var a,
        b = this._timeline,
        c = this._startTime;
    return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this.totalDuration() / this._timeScale - 1e-7;
  }, i._enabled = function (a, b) {
    return k || j.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1;
  }, i._kill = function (a, b) {
    return this._enabled(!1, !1);
  }, i.kill = function (a, b) {
    return this._kill(a, b), this;
  }, i._uncache = function (a) {
    for (var b = a ? this : this.timeline; b;) {
      b._dirty = !0, b = b.timeline;
    }

    return this;
  }, i._swapSelfInParams = function (a) {
    for (var b = a.length, c = a.concat(); --b > -1;) {
      "{self}" === a[b] && (c[b] = this);
    }

    return c;
  }, i._callback = function (a) {
    var b = this.vars,
        c = b[a],
        d = b[a + "Params"],
        e = b[a + "Scope"] || b.callbackScope || this,
        f = d ? d.length : 0;

    switch (f) {
      case 0:
        c.call(e);
        break;

      case 1:
        c.call(e, d[0]);
        break;

      case 2:
        c.call(e, d[0], d[1]);
        break;

      default:
        c.apply(e, d);
    }
  }, i.eventCallback = function (a, b, c, d) {
    if ("on" === (a || "").substr(0, 2)) {
      var e = this.vars;
      if (1 === arguments.length) return e[a];
      null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = q(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b);
    }

    return this;
  }, i.delay = function (a) {
    return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay;
  }, i.duration = function (a) {
    return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration);
  }, i.totalDuration = function (a) {
    return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration;
  }, i.time = function (a, b) {
    return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time;
  }, i.totalTime = function (a, b, c) {
    if (k || j.wake(), !arguments.length) return this._totalTime;

    if (this._timeline) {
      if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
        this._dirty && this.totalDuration();
        var d = this._totalDuration,
            e = this._timeline;
        if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline) for (; e._timeline;) {
          e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline;
        }
      }

      this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (K.length && $(), this.render(a, b, !1), K.length && $());
    }

    return this;
  }, i.progress = i.totalProgress = function (a, b) {
    var c = this.duration();
    return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio;
  }, i.startTime = function (a) {
    return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime;
  }, i.endTime = function (a) {
    return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale;
  }, i.timeScale = function (a) {
    if (!arguments.length) return this._timeScale;
    var b, c;

    for (a = a || n, this._timeline && this._timeline.smoothChildTiming && (b = this._pauseTime, c = b || 0 === b ? b : this._timeline.totalTime(), this._startTime = c - (c - this._startTime) * this._timeScale / a), this._timeScale = a, c = this.timeline; c && c.timeline;) {
      c._dirty = !0, c.totalDuration(), c = c.timeline;
    }

    return this;
  }, i.reversed = function (a) {
    return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed;
  }, i.paused = function (a) {
    if (!arguments.length) return this._paused;
    var b,
        c,
        d = this._timeline;
    return a != this._paused && d && (k || a || j.wake(), b = d.rawTime(), c = b - this._pauseTime, !a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ? b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc && !a && this._enabled(!0, !1), this;
  };
  var G = u("core.SimpleTimeline", function (a) {
    E.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0;
  });
  i = G.prototype = new E(), i.constructor = G, i.kill()._gc = !1, i._first = i._last = i._recent = null, i._sortChildren = !1, i.add = i.insert = function (a, b, c, d) {
    var e, f;
    if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = this.rawTime() - (a._timeline.rawTime() - a._pauseTime)), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), e = this._last, this._sortChildren) for (f = a._startTime; e && e._startTime > f;) {
      e = e._prev;
    }
    return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this._uncache(!0), this;
  }, i._remove = function (a, b) {
    return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this;
  }, i.render = function (a, b, c) {
    var d,
        e = this._first;

    for (this._totalTime = this._time = this._rawPrevTime = a; e;) {
      d = e._next, (e._active || a >= e._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d;
    }
  }, i.rawTime = function () {
    return k || j.wake(), this._totalTime;
  };

  var H = u("TweenLite", function (b, c, d) {
    if (E.call(this, c, d), this.render = H.prototype.render, null == b) throw "Cannot tween a null target.";
    this.target = b = "string" != typeof b ? b : H.selector(b) || b;
    var e,
        f,
        g,
        h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
        i = this.vars.overwrite;
    if (this._overwrite = i = null == i ? W[H.defaultOverwrite] : "number" == typeof i ? i >> 0 : W[i], (h || b instanceof Array || b.push && q(b)) && "number" != typeof b[0]) for (this._targets = g = o(b), this._propLookup = [], this._siblings = [], e = 0; e < g.length; e++) {
      f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(o(f))) : (this._siblings[e] = _(f, this, !1), 1 === i && this._siblings[e].length > 1 && ba(f, this, null, 1, this._siblings[e])) : (f = g[e--] = H.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
    } else this._propLookup = {}, this._siblings = _(b, this, !1), 1 === i && this._siblings.length > 1 && ba(b, this, null, 1, this._siblings);
    (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -n, this.render(Math.min(0, -this._delay)));
  }, !0),
      I = function I(b) {
    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType);
  },
      J = function J(a, b) {
    var c,
        d = {};

    for (c in a) {
      V[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!S[c] || S[c] && S[c]._autoCSS) || (d[c] = a[c], delete a[c]);
    }

    a.css = d;
  };

  i = H.prototype = new E(), i.constructor = H, i.kill()._gc = !1, i.ratio = 0, i._firstPT = i._targets = i._overwrittenProps = i._startAt = null, i._notifyPluginsOfEnabled = i._lazy = !1, H.version = "2.0.1", H.defaultEase = i._ease = new w(null, null, 1, 1), H.defaultOverwrite = "auto", H.ticker = j, H.autoSleep = 120, H.lagSmoothing = function (a, b) {
    j.lagSmoothing(a, b);
  }, H.selector = a.$ || a.jQuery || function (b) {
    var c = a.$ || a.jQuery;
    return c ? (H.selector = c, c(b)) : (d || (d = a.document), d ? d.querySelectorAll ? d.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b) : b);
  };

  var K = [],
      L = {},
      M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
      N = /[\+-]=-?[\.\d]/,
      O = function O(a) {
    for (var b, c = this._firstPT, d = 1e-6; c;) {
      b = c.blob ? 1 === a && null != this.end ? this.end : a ? this.join("") : this.start : c.c * a + c.s, c.m ? b = c.m.call(this._tween, b, this._target || c.t, this._tween) : d > b && b > -d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c._next;
    }
  },
      P = function P(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = [],
        m = 0,
        n = "",
        o = 0;

    for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]), l.length = 0, e = a.match(M) || [], f = b.match(M) || [], d && (d._next = null, d.blob = 1, l._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) {
      k = f[h], j = b.substr(m, b.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 : "rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n), n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
        _next: l._firstPT,
        t: l,
        p: l.length - 1,
        s: g,
        c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - g) || 0,
        f: 0,
        m: o && 4 > o ? Math.round : 0
      }), m += k.length;
    }

    return n += b.substr(m), n && l.push(n), l.setRatio = O, N.test(b) && (l.end = null), l;
  },
      Q = function Q(a, b, c, d, e, f, g, h, i) {
    "function" == typeof d && (d = d(i || 0, a));

    var j,
        k = _typeof(a[b]),
        l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ? b : "get" + b.substr(3),
        m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
        n = "string" == typeof d && "=" === d.charAt(1),
        o = {
      t: a,
      p: b,
      s: m,
      f: "function" === k,
      pg: 0,
      n: e || b,
      m: f ? "function" == typeof f ? f : Math.round : 0,
      pr: 0,
      c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
    };

    return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) || "boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = P(m, n ? parseFloat(o.s) + o.c + (o.s + "").replace(/[0-9\-\.]/g, "") : d, h || H.defaultStringFilter, o), o = {
      t: j,
      p: "setRatio",
      s: 0,
      c: 1,
      f: 2,
      pg: 0,
      n: e || b,
      pr: 0,
      m: 0
    }) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0;
  },
      R = H._internals = {
    isArray: q,
    isSelector: I,
    lazyTweens: K,
    blobDif: P
  },
      S = H._plugins = {},
      T = R.tweenLookup = {},
      U = 0,
      V = R.reservedProps = {
    ease: 1,
    delay: 1,
    overwrite: 1,
    onComplete: 1,
    onCompleteParams: 1,
    onCompleteScope: 1,
    useFrames: 1,
    runBackwards: 1,
    startAt: 1,
    onUpdate: 1,
    onUpdateParams: 1,
    onUpdateScope: 1,
    onStart: 1,
    onStartParams: 1,
    onStartScope: 1,
    onReverseComplete: 1,
    onReverseCompleteParams: 1,
    onReverseCompleteScope: 1,
    onRepeat: 1,
    onRepeatParams: 1,
    onRepeatScope: 1,
    easeParams: 1,
    yoyo: 1,
    immediateRender: 1,
    repeat: 1,
    repeatDelay: 1,
    data: 1,
    paused: 1,
    reversed: 1,
    autoCSS: 1,
    lazy: 1,
    onOverwrite: 1,
    callbackScope: 1,
    stringFilter: 1,
    id: 1,
    yoyoEase: 1
  },
      W = {
    none: 0,
    all: 1,
    auto: 2,
    concurrent: 3,
    allOnStart: 4,
    preexisting: 5,
    "true": 1,
    "false": 0
  },
      X = E._rootFramesTimeline = new G(),
      Y = E._rootTimeline = new G(),
      Z = 30,
      $ = R.lazyRender = function () {
    var a,
        b = K.length;

    for (L = {}; --b > -1;) {
      a = K[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
    }

    K.length = 0;
  };

  Y._startTime = j.time, X._startTime = j.frame, Y._active = X._active = !0, setTimeout($, 1), E._updateRoot = H.render = function () {
    var a, b, c;

    if (K.length && $(), Y.render((j.time - Y._startTime) * Y._timeScale, !1, !1), X.render((j.frame - X._startTime) * X._timeScale, !1, !1), K.length && $(), j.frame >= Z) {
      Z = j.frame + (parseInt(H.autoSleep, 10) || 120);

      for (c in T) {
        for (b = T[c].tweens, a = b.length; --a > -1;) {
          b[a]._gc && b.splice(a, 1);
        }

        0 === b.length && delete T[c];
      }

      if (c = Y._first, (!c || c._paused) && H.autoSleep && !X._first && 1 === j._listeners.tick.length) {
        for (; c && c._paused;) {
          c = c._next;
        }

        c || j.sleep();
      }
    }
  }, j.addEventListener("tick", E._updateRoot);

  var _ = function _(a, b, c) {
    var d,
        e,
        f = a._gsTweenID;
    if (T[f || (a._gsTweenID = f = "t" + U++)] || (T[f] = {
      target: a,
      tweens: []
    }), b && (d = T[f].tweens, d[e = d.length] = b, c)) for (; --e > -1;) {
      d[e] === b && d.splice(e, 1);
    }
    return T[f].tweens;
  },
      aa = function aa(a, b, c, d) {
    var e,
        f,
        g = a.vars.onOverwrite;
    return g && (e = g(a, b, c, d)), g = H.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1;
  },
      ba = function ba(a, b, c, d, e) {
    var f, g, h, i;

    if (1 === d || d >= 4) {
      for (i = e.length, f = 0; i > f; f++) {
        if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);else if (5 === d) break;
      }

      return g;
    }

    var j,
        k = b._startTime + n,
        l = [],
        m = 0,
        o = 0 === b._duration;

    for (f = e.length; --f > -1;) {
      (h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || ca(b, 0, o), 0 === ca(h, j, o) && (l[m++] = h)) : h._startTime <= k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h._startTime <= 2e-10 || (l[m++] = h)));
    }

    for (f = m; --f > -1;) {
      if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
        if (2 !== d && !aa(h, b)) continue;
        h._enabled(!1, !1) && (g = !0);
      }
    }

    return g;
  },
      ca = function ca(a, b, c) {
    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
      if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
      d = d._timeline;
    }

    return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * n > f - b ? n : (f += a.totalDuration() / a._timeScale / e) > b + n ? 0 : f - b - n;
  };

  i._init = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = this.vars,
        h = this._overwrittenProps,
        i = this._duration,
        j = !!g.immediateRender,
        k = g.ease;

    if (g.startAt) {
      this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};

      for (d in g.startAt) {
        e[d] = g.startAt[d];
      }

      if (e.data = "isStart", e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay = null, e.onUpdate = g.onUpdate, e.onUpdateParams = g.onUpdateParams, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this, this._startAt = H.to(this.target || {}, 0, e), j) if (this._time > 0) this._startAt = null;else if (0 !== i) return;
    } else if (g.runBackwards && 0 !== i) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;else {
      0 !== this._time && (j = !1), c = {};

      for (d in g) {
        V[d] && "autoCSS" !== d || (c[d] = g[d]);
      }

      if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c.immediateRender = j, this._startAt = H.to(this.target, 0, c), j) {
        if (0 === this._time) return;
      } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null);
    }

    if (this._ease = k = k ? k instanceof w ? k : "function" == typeof k ? new w(k, g.easeParams) : x[k] || H.defaultEase : H.defaultEase, g.easeParams instanceof Array && k.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (f = this._targets.length, a = 0; f > a; a++) {
      this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
    } else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
    if (b && H._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), g.runBackwards) for (c = this._firstPT; c;) {
      c.s += c.c, c.c = -c.c, c = c._next;
    }
    this._onUpdate = g.onUpdate, this._initted = !0;
  }, i._initProps = function (b, c, d, e, f) {
    var g, h, i, j, k, l;
    if (null == b) return !1;
    L[b._gsTweenID] && $(), this.vars.css || b.style && b !== a && b.nodeType && S.css && this.vars.autoCSS !== !1 && J(this.vars, b);

    for (g in this.vars) {
      if (l = this.vars[g], V[g]) l && (l instanceof Array || l.push && q(l)) && -1 !== l.join("").indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));else if (S[g] && (j = new S[g]())._onInitTween(b, this.vars[g], this, f)) {
        for (this._firstPT = k = {
          _next: this._firstPT,
          t: j,
          p: "setRatio",
          s: 0,
          c: 1,
          f: 1,
          n: g,
          pg: 1,
          pr: j._priority,
          m: 0
        }, h = j._overwriteProps.length; --h > -1;) {
          c[j._overwriteProps[h]] = this._firstPT;
        }

        (j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k);
      } else c[g] = Q.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
    }

    return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this._firstPT && d.length > 1 && ba(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[b._gsTweenID] = !0), i);
  }, i.render = function (a, b, c) {
    var d,
        e,
        f,
        g,
        h = this._time,
        i = this._duration,
        j = this._rawPrevTime;
    if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j === n && "isPause" !== this.data) && j !== a && (c = !0, j > n && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : n);else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== n || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : n)), (!this._initted || this._startAt && this._startAt.progress()) && (c = !0);else if (this._totalTime = this._time = a, this._easeType) {
      var k = a / i,
          l = this._easeType,
          m = this._easePower;
      (1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *= k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k * k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio = 1 - k / 2;
    } else this.ratio = this._ease.getRatio(a / i);

    if (this._time !== h || c) {
      if (!this._initted) {
        if (this._init(), !this._initted || this._gc) return;
        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, K.push(this), void (this._lazy = [a, b]);
        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
      }

      for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, !0, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) {
        f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
      }

      this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, !0, c), b || (this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, !0, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this._rawPrevTime === n && g !== n && (this._rawPrevTime = 0));
    }
  }, i._kill = function (a, b, c) {
    if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
    b = "string" != typeof b ? b || this._targets || this.target : H.selector(b) || b;
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m = c && this._time && c._startTime === this._startTime && this._timeline === c._timeline;
    if ((q(b) || I(b)) && "number" != typeof b[0]) for (d = b.length; --d > -1;) {
      this._kill(a, b[d], c) && (i = !0);
    } else {
      if (this._targets) {
        for (d = this._targets.length; --d > -1;) {
          if (b === this._targets[d]) {
            h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
            break;
          }
        }
      } else {
        if (b !== this.target) return !1;
        h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all";
      }

      if (h) {
        if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != _typeof(a) || !a._tempKill), c && (H.onOverwrite || this.vars.onOverwrite)) {
          for (f in j) {
            h[f] && (l || (l = []), l.push(f));
          }

          if ((l || !a) && !aa(this, c, b, l)) return !1;
        }

        for (f in j) {
          (g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
        }

        !this._firstPT && this._initted && this._enabled(!1, !1);
      }
    }
    return i;
  }, i.invalidate = function () {
    return this._notifyPluginsOfEnabled && H._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], E.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -n, this.render(Math.min(0, -this._delay))), this;
  }, i._enabled = function (a, b) {
    if (k || j.wake(), a && this._gc) {
      var c,
          d = this._targets;
      if (d) for (c = d.length; --c > -1;) {
        this._siblings[c] = _(d[c], this, !0);
      } else this._siblings = _(this.target, this, !0);
    }

    return E.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? H._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1;
  }, H.to = function (a, b, c) {
    return new H(a, b, c);
  }, H.from = function (a, b, c) {
    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new H(a, b, c);
  }, H.fromTo = function (a, b, c, d) {
    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new H(a, b, d);
  }, H.delayedCall = function (a, b, c, d, e) {
    return new H(b, 0, {
      delay: a,
      onComplete: b,
      onCompleteParams: c,
      callbackScope: d,
      onReverseComplete: b,
      onReverseCompleteParams: c,
      immediateRender: !1,
      lazy: !1,
      useFrames: e,
      overwrite: 0
    });
  }, H.set = function (a, b) {
    return new H(a, 0, b);
  }, H.getTweensOf = function (a, b) {
    if (null == a) return [];
    a = "string" != typeof a ? a : H.selector(a) || a;
    var c, d, e, f;

    if ((q(a) || I(a)) && "number" != typeof a[0]) {
      for (c = a.length, d = []; --c > -1;) {
        d = d.concat(H.getTweensOf(a[c], b));
      }

      for (c = d.length; --c > -1;) {
        for (f = d[c], e = c; --e > -1;) {
          f === d[e] && d.splice(c, 1);
        }
      }
    } else if (a._gsTweenID) for (d = _(a).concat(), c = d.length; --c > -1;) {
      (d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
    }

    return d || [];
  }, H.killTweensOf = H.killDelayedCallsTo = function (a, b, c) {
    "object" == _typeof(b) && (c = b, b = !1);

    for (var d = H.getTweensOf(a, b), e = d.length; --e > -1;) {
      d[e]._kill(c, a);
    }
  };
  var da = u("plugins.TweenPlugin", function (a, b) {
    this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = da.prototype;
  }, !0);

  if (i = da.prototype, da.version = "1.19.0", da.API = 2, i._firstPT = null, i._addTween = Q, i.setRatio = O, i._kill = function (a) {
    var b,
        c = this._overwriteProps,
        d = this._firstPT;
    if (null != a[this._propName]) this._overwriteProps = [];else for (b = c.length; --b > -1;) {
      null != a[c[b]] && c.splice(b, 1);
    }

    for (; d;) {
      null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
    }

    return !1;
  }, i._mod = i._roundProps = function (a) {
    for (var b, c = this._firstPT; c;) {
      b = a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m = b : c.m = b), c = c._next;
    }
  }, H._onPluginEvent = function (a, b) {
    var c,
        d,
        e,
        f,
        g,
        h = b._firstPT;

    if ("_onInitAllProps" === a) {
      for (; h;) {
        for (g = h._next, d = e; d && d.pr > h.pr;) {
          d = d._next;
        }

        (h._prev = d ? d._prev : f) ? h._prev._next = h : e = h, (h._next = d) ? d._prev = h : f = h, h = g;
      }

      h = b._firstPT = e;
    }

    for (; h;) {
      h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
    }

    return c;
  }, da.activate = function (a) {
    for (var b = a.length; --b > -1;) {
      a[b].API === da.API && (S[new a[b]()._propName] = a[b]);
    }

    return !0;
  }, t.plugin = function (a) {
    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
    var b,
        c = a.propName,
        d = a.priority || 0,
        e = a.overwriteProps,
        f = {
      init: "_onInitTween",
      set: "setRatio",
      kill: "_kill",
      round: "_mod",
      mod: "_mod",
      initAll: "_onInitAllProps"
    },
        g = u("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function () {
      da.call(this, c, d), this._overwriteProps = e || [];
    }, a.global === !0),
        h = g.prototype = new da(c);
    h.constructor = g, g.API = a.API;

    for (b in f) {
      "function" == typeof a[b] && (h[f[b]] = a[b]);
    }

    return g.version = a.version, da.activate([g]), g;
  }, g = a._gsQueue) {
    for (h = 0; h < g.length; h++) {
      g[h]();
    }

    for (i in r) {
      r[i].func || a.console.log("GSAP encountered missing dependency: " + i);
    }
  }

  k = !1;
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : void 0 || window, "TweenLite");
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic GSAP Animation Plugin.
 *
 * requires: GSAP ~1.14
 * Powered by the Greensock Animation Platform (GSAP): http://www.greensock.com/js
 * Greensock License info at http://www.greensock.com/licensing/
 */

/**
 * This plugin is meant to be used in conjunction with the Greensock Animation Plattform.  
 * It offers an easy API to trigger Tweens or synchronize them to the scrollbar movement.
 *
 * Both the `lite` and the `max` versions of the GSAP library are supported.  
 * The most basic requirement is `TweenLite`.
 * 
 * To have access to this extension, please include `plugins/animation.gsap.js`.
 * @requires {@link http://greensock.com/gsap|GSAP ~1.14.x}
 * @mixin animation.GSAP
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic', 'TweenMax', 'TimelineMax'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    // Loads whole gsap package onto global scope.
    require('gsap');

    factory(require('scrollmagic'), TweenMax, TimelineMax);
  } else {
    // Browser globals
    factory(root.ScrollMagic || root.jQuery && root.jQuery.ScrollMagic, root.TweenMax || root.TweenLite, root.TimelineMax || root.TimelineLite);
  }
})(void 0, function (ScrollMagic, Tween, Timeline) {
  "use strict";

  var NAMESPACE = "animation.gsap";
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!Tween) {
    err("(" + NAMESPACE + ") -> ERROR: TweenLite or TweenMax could not be found. Please make sure GSAP is loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  }
  /*
  	 * ----------------------------------------------------------------
  	 * Extensions for Scene
  	 * ----------------------------------------------------------------
  	 */

  /**
   * Every instance of ScrollMagic.Scene now accepts an additional option.  
   * See {@link ScrollMagic.Scene} for a complete list of the standard options.
   * @memberof! animation.GSAP#
   * @method new ScrollMagic.Scene(options)
   * @example
   * var scene = new ScrollMagic.Scene({tweenChanges: true});
   *
   * @param {object} [options] - Options for the Scene. The options can be updated at any time.
   * @param {boolean} [options.tweenChanges=false] - Tweens Animation to the progress target instead of setting it.  
   Does not affect animations where duration is `0`.
   */

  /**
   * **Get** or **Set** the tweenChanges option value.  
   * This only affects scenes with a duration. If `tweenChanges` is `true`, the progress update when scrolling will not be immediate, but instead the animation will smoothly animate to the target state.  
   * For a better understanding, try enabling and disabling this option in the [Scene Manipulation Example](../examples/basic/scene_manipulation.html).
   * @memberof! animation.GSAP#
   * @method Scene.tweenChanges
   * 
   * @example
   * // get the current tweenChanges option
   * var tweenChanges = scene.tweenChanges();
   *
   * // set new tweenChanges option
   * scene.tweenChanges(true);
   *
   * @fires {@link Scene.change}, when used as setter
   * @param {boolean} [newTweenChanges] - The new tweenChanges setting of the scene.
   * @returns {boolean} `get` -  Current tweenChanges option value.
   * @returns {Scene} `set` -  Parent object for chaining.
   */
  // add option (TODO: DOC (private for dev))


  ScrollMagic.Scene.addOption("tweenChanges", // name
  false, // default
  function (val) {
    // validation callback
    return !!val;
  }); // extend scene

  ScrollMagic.Scene.extend(function () {
    var Scene = this,
        _tween;

    var log = function log() {
      if (Scene._log) {
        // not available, when main source minified
        Array.prototype.splice.call(arguments, 1, 0, "(" + NAMESPACE + ")", "->");

        Scene._log.apply(this, arguments);
      }
    }; // set listeners


    Scene.on("progress.plugin_gsap", function () {
      updateTweenProgress();
    });
    Scene.on("destroy.plugin_gsap", function (e) {
      Scene.removeTween(e.reset);
    });
    /**
     * Update the tween progress to current position.
     * @private
     */

    var updateTweenProgress = function updateTweenProgress() {
      if (_tween) {
        var progress = Scene.progress(),
            state = Scene.state();

        if (_tween.repeat && _tween.repeat() === -1) {
          // infinite loop, so not in relation to progress
          if (state === 'DURING' && _tween.paused()) {
            _tween.play();
          } else if (state !== 'DURING' && !_tween.paused()) {
            _tween.pause();
          }
        } else if (progress != _tween.progress()) {
          // do we even need to update the progress?
          // no infinite loop - so should we just play or go to a specific point in time?
          if (Scene.duration() === 0) {
            // play the animation
            if (progress > 0) {
              // play from 0 to 1
              _tween.play();
            } else {
              // play from 1 to 0
              _tween.reverse();
            }
          } else {
            // go to a specific point in time
            if (Scene.tweenChanges() && _tween.tweenTo) {
              // go smooth
              _tween.tweenTo(progress * _tween.duration());
            } else {
              // just hard set it
              _tween.progress(progress).pause();
            }
          }
        }
      }
    };
    /**
     * Add a tween to the scene.  
     * If you want to add multiple tweens, add them into a GSAP Timeline object and supply it instead (see example below).  
     * 
     * If the scene has a duration, the tween's duration will be projected to the scroll distance of the scene, meaning its progress will be synced to scrollbar movement.  
     * For a scene with a duration of `0`, the tween will be triggered when scrolling forward past the scene's trigger position and reversed, when scrolling back.  
     * To gain better understanding, check out the [Simple Tweening example](../examples/basic/simple_tweening.html).
     *
     * Instead of supplying a tween this method can also be used as a shorthand for `TweenMax.to()` (see example below).
     * @memberof! animation.GSAP#
     *
     * @example
     * // add a single tween directly
     * scene.setTween(TweenMax.to("obj"), 1, {x: 100});
     *
     * // add a single tween via variable
     * var tween = TweenMax.to("obj"), 1, {x: 100};
     * scene.setTween(tween);
     *
     * // add multiple tweens, wrapped in a timeline.
     * var timeline = new TimelineMax();
     * var tween1 = TweenMax.from("obj1", 1, {x: 100});
     * var tween2 = TweenMax.to("obj2", 1, {y: 100});
     * timeline
     *		.add(tween1)
     *		.add(tween2);
     * scene.addTween(timeline);
     *
     * // short hand to add a TweenMax.to() tween
     * scene.setTween("obj3", 0.5, {y: 100});
     *
     * // short hand to add a TweenMax.to() tween for 1 second
     * // this is useful, when the scene has a duration and the tween duration isn't important anyway
     * scene.setTween("obj3", {y: 100});
     *
     * @param {(object|string)} TweenObject - A TweenMax, TweenLite, TimelineMax or TimelineLite object that should be animated in the scene. Can also be a Dom Element or Selector, when using direct tween definition (see examples).
     * @param {(number|object)} duration - A duration for the tween, or tween parameters. If an object containing parameters are supplied, a default duration of 1 will be used.
     * @param {object} params - The parameters for the tween
     * @returns {Scene} Parent object for chaining.
     */


    Scene.setTween = function (TweenObject, duration, params) {
      var newTween;

      if (arguments.length > 1) {
        if (arguments.length < 3) {
          params = duration;
          duration = 1;
        }

        TweenObject = Tween.to(TweenObject, duration, params);
      }

      try {
        // wrap Tween into a Timeline Object if available to include delay and repeats in the duration and standardize methods.
        if (Timeline) {
          newTween = new Timeline({
            smoothChildTiming: true
          }).add(TweenObject);
        } else {
          newTween = TweenObject;
        }

        newTween.pause();
      } catch (e) {
        log(1, "ERROR calling method 'setTween()': Supplied argument is not a valid TweenObject");
        return Scene;
      }

      if (_tween) {
        // kill old tween?
        Scene.removeTween();
      }

      _tween = newTween; // some properties need to be transferred it to the wrapper, otherwise they would get lost.

      if (TweenObject.repeat && TweenObject.repeat() === -1) {
        // TweenMax or TimelineMax Object?
        _tween.repeat(-1);

        _tween.yoyo(TweenObject.yoyo());
      } // Some tween validations and debugging helpers


      if (Scene.tweenChanges() && !_tween.tweenTo) {
        log(2, "WARNING: tweenChanges will only work if the TimelineMax object is available for ScrollMagic.");
      } // check if there are position tweens defined for the trigger and warn about it :)


      if (_tween && Scene.controller() && Scene.triggerElement() && Scene.loglevel() >= 2) {
        // controller is needed to know scroll direction.
        var triggerTweens = Tween.getTweensOf(Scene.triggerElement()),
            vertical = Scene.controller().info("vertical");
        triggerTweens.forEach(function (value, index) {
          var tweenvars = value.vars.css || value.vars,
              condition = vertical ? tweenvars.top !== undefined || tweenvars.bottom !== undefined : tweenvars.left !== undefined || tweenvars.right !== undefined;

          if (condition) {
            log(2, "WARNING: Tweening the position of the trigger element affects the scene timing and should be avoided!");
            return false;
          }
        });
      } // warn about tween overwrites, when an element is tweened multiple times


      if (parseFloat(TweenLite.version) >= 1.14) {
        // onOverwrite only present since GSAP v1.14.0
        var list = _tween.getChildren ? _tween.getChildren(true, true, false) : [_tween],
            // get all nested tween objects
        newCallback = function newCallback() {
          log(2, "WARNING: tween was overwritten by another. To learn how to avoid this issue see here: https://github.com/janpaepke/ScrollMagic/wiki/WARNING:-tween-was-overwritten-by-another");
        };

        for (var i = 0, thisTween, oldCallback; i < list.length; i++) {
          /*jshint loopfunc: true */
          thisTween = list[i];

          if (oldCallback !== newCallback) {
            // if tweens is added more than once
            oldCallback = thisTween.vars.onOverwrite;

            thisTween.vars.onOverwrite = function () {
              if (oldCallback) {
                oldCallback.apply(this, arguments);
              }

              newCallback.apply(this, arguments);
            };
          }
        }
      }

      log(3, "added tween");
      updateTweenProgress();
      return Scene;
    };
    /**
     * Remove the tween from the scene.  
     * This will terminate the control of the Scene over the tween.
     *
     * Using the reset option you can decide if the tween should remain in the current state or be rewound to set the target elements back to the state they were in before the tween was added to the scene.
     * @memberof! animation.GSAP#
     *
     * @example
     * // remove the tween from the scene without resetting it
     * scene.removeTween();
     *
     * // remove the tween from the scene and reset it to initial position
     * scene.removeTween(true);
     *
     * @param {boolean} [reset=false] - If `true` the tween will be reset to its initial values.
     * @returns {Scene} Parent object for chaining.
     */


    Scene.removeTween = function (reset) {
      if (_tween) {
        if (reset) {
          _tween.progress(0).pause();
        }

        _tween.kill();

        _tween = undefined;
        log(3, "removed tween (reset: " + (reset ? "true" : "false") + ")");
      }

      return Scene;
    };
  });
});
"use strict";

(function ($) {
  // Site title
  wp.customize('blogname', function (value) {
    value.bind(function (to) {
      $('.brand').text(to);
    });
  });
})(jQuery);
"use strict";

// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
(function (window, document, $, undefined) {
  "use strict";

  window.console = window.console || {
    info: function info(stuff) {}
  }; // If there's no jQuery, fancyBox can't work
  // =========================================

  if (!$) {
    return;
  } // Check if fancyBox is already initialized
  // ========================================


  if ($.fn.fancybox) {
    console.info("fancyBox already initialized");
    return;
  } // Private default settings
  // ========================


  var defaults = {
    // Enable infinite gallery navigation
    loop: false,
    // Horizontal space between slides
    gutter: 50,
    // Enable keyboard navigation
    keyboard: true,
    // Should display navigation arrows at the screen edges
    arrows: true,
    // Should display counter at the top left corner
    infobar: true,
    // Should display close button (using `btnTpl.smallBtn` template) over the content
    // Can be true, false, "auto"
    // If "auto" - will be automatically enabled for "html", "inline" or "ajax" items
    smallBtn: "auto",
    // Should display toolbar (buttons at the top)
    // Can be true, false, "auto"
    // If "auto" - will be automatically hidden if "smallBtn" is enabled
    toolbar: "auto",
    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons: ["zoom", //"share",
    //"slideShow",
    //"fullScreen",
    //"download",
    "thumbs", "close"],
    // Detect "idle" time in seconds
    idleTime: 3,
    // Disable right-click and use simple image protection for images
    protect: false,
    // Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
    modal: false,
    image: {
      // Wait for images to load before displaying
      //   true  - wait for image to load and then display;
      //   false - display thumbnail and load the full-sized image over top,
      //           requires predefined image dimensions (`data-width` and `data-height` attributes)
      preload: false
    },
    ajax: {
      // Object containing settings for ajax request
      settings: {
        // This helps to indicate that request comes from the modal
        // Feel free to change naming
        data: {
          fancybox: true
        }
      }
    },
    iframe: {
      // Iframe template
      tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
      // Preload iframe before displaying it
      // This allows to calculate iframe content width and height
      // (note: Due to "Same Origin Policy", you can't get cross domain data).
      preload: true,
      // Custom CSS styling for iframe wrapping element
      // You can use this to set custom iframe dimensions
      css: {},
      // Iframe tag attributes
      attr: {
        scrolling: "auto"
      }
    },
    // Default content type if cannot be detected automatically
    defaultType: "image",
    // Open/close animation type
    // Possible values:
    //   false            - disable
    //   "zoom"           - zoom images from/to thumbnail
    //   "fade"
    //   "zoom-in-out"
    //
    animationEffect: "zoom",
    // Duration in ms for open/close animation
    animationDuration: 366,
    // Should image change opacity while zooming
    // If opacity is "auto", then opacity will be changed if image and thumbnail have different aspect ratios
    zoomOpacity: "auto",
    // Transition effect between slides
    //
    // Possible values:
    //   false            - disable
    //   "fade'
    //   "slide'
    //   "circular'
    //   "tube'
    //   "zoom-in-out'
    //   "rotate'
    //
    transitionEffect: "fade",
    // Duration in ms for transition animation
    transitionDuration: 366,
    // Custom CSS class for slide element
    slideClass: "",
    // Custom CSS class for layout
    baseClass: "",
    // Base template for layout
    baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' + '<div class="fancybox-bg"></div>' + '<div class="fancybox-inner">' + '<div class="fancybox-infobar">' + "<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>" + "</div>" + '<div class="fancybox-toolbar">{{buttons}}</div>' + '<div class="fancybox-navigation">{{arrows}}</div>' + '<div class="fancybox-stage"></div>' + '<div class="fancybox-caption"></div>' + "</div>" + "</div>",
    // Loading indicator template
    spinnerTpl: '<div class="fancybox-loading"></div>',
    // Error message template
    errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
    btnTpl: {
      download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;">' + '<svg viewBox="0 0 40 40">' + '<path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" />' + "</svg>" + "</a>",
      zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" />' + "</svg>" + "</button>",
      close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M10,10 L30,30 M30,10 L10,30" />' + "</svg>" + "</button>",
      // This small close button will be appended to your html/inline/ajax content by default,
      // if "smallBtn" option is not set to false
      smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
      // Arrows
      arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;">' + '<svg viewBox="0 0 40 40">' + '<path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path>' + "</svg>" + "</a>",
      arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;">' + '<svg viewBox="0 0 40 40">' + '<path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path>' + "</svg>" + "</a>"
    },
    // Container is injected into this element
    parentEl: "body",
    // Focus handling
    // ==============
    // Try to focus on the first focusable element after opening
    autoFocus: false,
    // Put focus back to active element after closing
    backFocus: true,
    // Do not let user to focus on element outside modal content
    trapFocus: true,
    // Module specific options
    // =======================
    fullScreen: {
      autoStart: false
    },
    // Set `touch: false` to disable dragging/swiping
    touch: {
      vertical: true,
      // Allow to drag content vertically
      momentum: true // Continue movement after releasing mouse/touch when panning

    },
    // Hash value when initializing manually,
    // set `false` to disable hash change
    hash: null,
    // Customize or add new media types
    // Example:

    /*
        media : {
            youtube : {
                params : {
                    autoplay : 0
                }
            }
        }
        */
    media: {},
    slideShow: {
      autoStart: false,
      speed: 4000
    },
    thumbs: {
      autoStart: false,
      // Display thumbnails on opening
      hideOnClose: true,
      // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container",
      // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling

    },
    // Use mousewheel to navigate gallery
    // If 'auto' - enabled for images only
    wheel: "auto",
    // Callbacks
    //==========
    // See Documentation/API/Events for more information
    // Example:

    /*
    afterShow: function( instance, current ) {
    console.info( 'Clicked element:' );
    console.info( current.opts.$orig );
    }
    */
    onInit: $.noop,
    // When instance has been initialized
    beforeLoad: $.noop,
    // Before the content of a slide is being loaded
    afterLoad: $.noop,
    // When the content of a slide is done loading
    beforeShow: $.noop,
    // Before open animation starts
    afterShow: $.noop,
    // When content is done loading and animating
    beforeClose: $.noop,
    // Before the instance attempts to close. Return false to cancel the close.
    afterClose: $.noop,
    // After instance has been closed
    onActivate: $.noop,
    // When instance is brought to front
    onDeactivate: $.noop,
    // When other instance has been activated
    // Interaction
    // ===========
    // Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
    // each option can be string or method that returns value.
    //
    // Possible values:
    //   "close"           - close instance
    //   "next"            - move to next gallery item
    //   "nextOrClose"     - move to next gallery item or close if gallery has only one item
    //   "toggleControls"  - show/hide controls
    //   "zoom"            - zoom image (if loaded)
    //   false             - do nothing
    // Clicked on the content
    clickContent: function clickContent(current, event) {
      return current.type === "image" ? "zoom" : false;
    },
    // Clicked on the slide
    clickSlide: "close",
    // Clicked on the background (backdrop) element;
    // if you have not changed the layout, then most likely you need to use `clickSlide` option
    clickOutside: "close",
    // Same as previous two, but for double click
    dblclickContent: false,
    dblclickSlide: false,
    dblclickOutside: false,
    // Custom options when mobile device is detected
    // =============================================
    mobile: {
      idleTime: false,
      clickContent: function clickContent(current, event) {
        return current.type === "image" ? "toggleControls" : false;
      },
      clickSlide: function clickSlide(current, event) {
        return current.type === "image" ? "toggleControls" : "close";
      },
      dblclickContent: function dblclickContent(current, event) {
        return current.type === "image" ? "zoom" : false;
      },
      dblclickSlide: function dblclickSlide(current, event) {
        return current.type === "image" ? "zoom" : false;
      }
    },
    // Internationalization
    // ====================
    lang: "en",
    i18n: {
      en: {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
        PLAY_START: "Start slideshow",
        PLAY_STOP: "Pause slideshow",
        FULL_SCREEN: "Full screen",
        THUMBS: "Thumbnails",
        DOWNLOAD: "Download",
        SHARE: "Share",
        ZOOM: "Zoom"
      },
      de: {
        CLOSE: "Schliessen",
        NEXT: "Weiter",
        PREV: "Zurück",
        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
        PLAY_START: "Diaschau starten",
        PLAY_STOP: "Diaschau beenden",
        FULL_SCREEN: "Vollbild",
        THUMBS: "Vorschaubilder",
        DOWNLOAD: "Herunterladen",
        SHARE: "Teilen",
        ZOOM: "Maßstab"
      }
    }
  }; // Few useful variables and methods
  // ================================

  var $W = $(window);
  var $D = $(document);
  var called = 0; // Check if an object is a jQuery object and not a native JavaScript object
  // ========================================================================

  var isQuery = function isQuery(obj) {
    return obj && obj.hasOwnProperty && obj instanceof $;
  }; // Handle multiple browsers for "requestAnimationFrame" and "cancelAnimationFrame"
  // ===============================================================================


  var requestAFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }(); // Detect the supported transition-end event property name
  // =======================================================


  var transitionEnd = function () {
    var el = document.createElement("fakeelement"),
        t;
    var transitions = {
      transition: "transitionend",
      OTransition: "oTransitionEnd",
      MozTransition: "transitionend",
      WebkitTransition: "webkitTransitionEnd"
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }

    return "transitionend";
  }(); // Force redraw on an element.
  // This helps in cases where the browser doesn't redraw an updated element properly
  // ================================================================================


  var forceRedraw = function forceRedraw($el) {
    return $el && $el.length && $el[0].offsetHeight;
  }; // Exclude array (`buttons`) options from deep merging
  // ===================================================


  var mergeOpts = function mergeOpts(opts1, opts2) {
    var rez = $.extend(true, {}, opts1, opts2);
    $.each(opts2, function (key, value) {
      if ($.isArray(value)) {
        rez[key] = value;
      }
    });
    return rez;
  }; // Class definition
  // ================


  var FancyBox = function FancyBox(content, opts, index) {
    var self = this;
    self.opts = mergeOpts({
      index: index
    }, $.fancybox.defaults);

    if ($.isPlainObject(opts)) {
      self.opts = mergeOpts(self.opts, opts);
    }

    if ($.fancybox.isMobile) {
      self.opts = mergeOpts(self.opts, self.opts.mobile);
    }

    self.id = self.opts.id || ++called;
    self.currIndex = parseInt(self.opts.index, 10) || 0;
    self.prevIndex = null;
    self.prevPos = null;
    self.currPos = 0;
    self.firstRun = true; // All group items

    self.group = []; // Existing slides (for current, next and previous gallery items)

    self.slides = {}; // Create group elements

    self.addContent(content);

    if (!self.group.length) {
      return;
    } // Save last active element


    self.$lastFocus = $(document.activeElement).trigger("blur");
    self.init();
  };

  $.extend(FancyBox.prototype, {
    // Create DOM structure
    // ====================
    init: function init() {
      var self = this,
          firstItem = self.group[self.currIndex],
          firstItemOpts = firstItem.opts,
          scrollbarWidth = $.fancybox.scrollbarWidth,
          $scrollDiv,
          $container,
          buttonStr; // Hide scrollbars
      // ===============

      if (!$.fancybox.getInstance() && firstItemOpts.hideScrollbar !== false) {
        $("body").addClass("fancybox-active");

        if (!$.fancybox.isMobile && document.body.scrollHeight > window.innerHeight) {
          if (scrollbarWidth === undefined) {
            $scrollDiv = $('<div style="width:100px;height:100px;overflow:scroll;" />').appendTo("body");
            scrollbarWidth = $.fancybox.scrollbarWidth = $scrollDiv[0].offsetWidth - $scrollDiv[0].clientWidth;
            $scrollDiv.remove();
          }

          $("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + scrollbarWidth + "px; }</style>");
          $("body").addClass("compensate-for-scrollbar");
        }
      } // Build html markup and set references
      // ====================================
      // Build html code for buttons and insert into main template


      buttonStr = "";
      $.each(firstItemOpts.buttons, function (index, value) {
        buttonStr += firstItemOpts.btnTpl[value] || "";
      }); // Create markup from base template, it will be initially hidden to
      // avoid unnecessary work like painting while initializing is not complete

      $container = $(self.translate(self, firstItemOpts.baseTpl.replace("{{buttons}}", buttonStr).replace("{{arrows}}", firstItemOpts.btnTpl.arrowLeft + firstItemOpts.btnTpl.arrowRight))).attr("id", "fancybox-container-" + self.id).addClass("fancybox-is-hidden").addClass(firstItemOpts.baseClass).data("FancyBox", self).appendTo(firstItemOpts.parentEl); // Create object holding references to jQuery wrapped nodes

      self.$refs = {
        container: $container
      };
      ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (item) {
        self.$refs[item] = $container.find(".fancybox-" + item);
      });
      self.trigger("onInit"); // Enable events, deactive previous instances

      self.activate(); // Build slides, load and reveal content

      self.jumpTo(self.currIndex);
    },
    // Simple i18n support - replaces object keys found in template
    // with corresponding values
    // ============================================================
    translate: function translate(obj, str) {
      var arr = obj.opts.i18n[obj.opts.lang];
      return str.replace(/\{\{(\w+)\}\}/g, function (match, n) {
        var value = arr[n];

        if (value === undefined) {
          return match;
        }

        return value;
      });
    },
    // Populate current group with fresh content
    // Check if each object has valid type and content
    // ===============================================
    addContent: function addContent(content) {
      var self = this,
          items = $.makeArray(content),
          thumbs;
      $.each(items, function (i, item) {
        var obj = {},
            opts = {},
            $item,
            type,
            found,
            src,
            srcParts; // Step 1 - Make sure we have an object
        // ====================================

        if ($.isPlainObject(item)) {
          // We probably have manual usage here, something like
          // $.fancybox.open( [ { src : "image.jpg", type : "image" } ] )
          obj = item;
          opts = item.opts || item;
        } else if ($.type(item) === "object" && $(item).length) {
          // Here we probably have jQuery collection returned by some selector
          $item = $(item); // Support attributes like `data-options='{"touch" : false}'` and `data-touch='false'`

          opts = $item.data() || {};
          opts = $.extend(true, {}, opts, opts.options); // Here we store clicked element

          opts.$orig = $item;
          obj.src = self.opts.src || opts.src || $item.attr("href"); // Assume that simple syntax is used, for example:
          //   `$.fancybox.open( $("#test"), {} );`

          if (!obj.type && !obj.src) {
            obj.type = "inline";
            obj.src = item;
          }
        } else {
          // Assume we have a simple html code, for example:
          //   $.fancybox.open( '<div><h1>Hi!</h1></div>' );
          obj = {
            type: "html",
            src: item + ""
          };
        } // Each gallery object has full collection of options


        obj.opts = $.extend(true, {}, self.opts, opts); // Do not merge buttons array

        if ($.isArray(opts.buttons)) {
          obj.opts.buttons = opts.buttons;
        } // Step 2 - Make sure we have content type, if not - try to guess
        // ==============================================================


        type = obj.type || obj.opts.type;
        src = obj.src || "";

        if (!type && src) {
          if (found = src.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) {
            type = "video";

            if (!obj.opts.videoFormat) {
              obj.opts.videoFormat = "video/" + (found[1] === "ogv" ? "ogg" : found[1]);
            }
          } else if (src.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i)) {
            type = "image";
          } else if (src.match(/\.(pdf)((\?|#).*)?$/i)) {
            type = "iframe";
          } else if (src.charAt(0) === "#") {
            type = "inline";
          }
        }

        if (type) {
          obj.type = type;
        } else {
          self.trigger("objectNeedsType", obj);
        }

        if (!obj.contentType) {
          obj.contentType = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1 ? "html" : obj.type;
        } // Step 3 - Some adjustments
        // =========================


        obj.index = self.group.length;

        if (obj.opts.smallBtn == "auto") {
          obj.opts.smallBtn = $.inArray(obj.type, ["html", "inline", "ajax"]) > -1;
        }

        if (obj.opts.toolbar === "auto") {
          obj.opts.toolbar = !obj.opts.smallBtn;
        } // Find thumbnail image


        if (obj.opts.$trigger && obj.index === self.opts.index) {
          obj.opts.$thumb = obj.opts.$trigger.find("img:first");
        }

        if ((!obj.opts.$thumb || !obj.opts.$thumb.length) && obj.opts.$orig) {
          obj.opts.$thumb = obj.opts.$orig.find("img:first");
        } // "caption" is a "special" option, it can be used to customize caption per gallery item ..


        if ($.type(obj.opts.caption) === "function") {
          obj.opts.caption = obj.opts.caption.apply(item, [self, obj]);
        }

        if ($.type(self.opts.caption) === "function") {
          obj.opts.caption = self.opts.caption.apply(item, [self, obj]);
        } // Make sure we have caption as a string or jQuery object


        if (!(obj.opts.caption instanceof $)) {
          obj.opts.caption = obj.opts.caption === undefined ? "" : obj.opts.caption + "";
        } // Check if url contains "filter" used to filter the content
        // Example: "ajax.html #something"


        if (obj.type === "ajax") {
          srcParts = src.split(/\s+/, 2);

          if (srcParts.length > 1) {
            obj.src = srcParts.shift();
            obj.opts.filter = srcParts.shift();
          }
        } // Hide all buttons and disable interactivity for modal items


        if (obj.opts.modal) {
          obj.opts = $.extend(true, obj.opts, {
            // Remove buttons
            infobar: 0,
            toolbar: 0,
            smallBtn: 0,
            // Disable keyboard navigation
            keyboard: 0,
            // Disable some modules
            slideShow: 0,
            fullScreen: 0,
            thumbs: 0,
            touch: 0,
            // Disable click event handlers
            clickContent: false,
            clickSlide: false,
            clickOutside: false,
            dblclickContent: false,
            dblclickSlide: false,
            dblclickOutside: false
          });
        } // Step 4 - Add processed object to group
        // ======================================


        self.group.push(obj);
      }); // Update controls if gallery is already opened

      if (Object.keys(self.slides).length) {
        self.updateControls(); // Update thumbnails, if needed

        thumbs = self.Thumbs;

        if (thumbs && thumbs.isActive) {
          thumbs.create();
          thumbs.focus();
        }
      }
    },
    // Attach an event handler functions for:
    //   - navigation buttons
    //   - browser scrolling, resizing;
    //   - focusing
    //   - keyboard
    //   - detect idle
    // ======================================
    addEvents: function addEvents() {
      var self = this;
      self.removeEvents(); // Make navigation elements clickable

      self.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.close(e);
      }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.previous();
      }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (e) {
        e.stopPropagation();
        e.preventDefault();
        self.next();
      }).on("click.fb", "[data-fancybox-zoom]", function (e) {
        // Click handler for zoom button
        self[self.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
      }); // Handle page scrolling and browser resizing

      $W.on("orientationchange.fb resize.fb", function (e) {
        if (e && e.originalEvent && e.originalEvent.type === "resize") {
          requestAFrame(function () {
            self.update();
          });
        } else {
          self.$refs.stage.hide();
          setTimeout(function () {
            self.$refs.stage.show();
            self.update();
          }, $.fancybox.isMobile ? 600 : 250);
        }
      }); // Trap keyboard focus inside of the modal, so the user does not accidentally tab outside of the modal
      // (a.k.a. "escaping the modal")

      $D.on("focusin.fb", function (e) {
        var instance = $.fancybox ? $.fancybox.getInstance() : null;

        if (instance.isClosing || !instance.current || !instance.current.opts.trapFocus || $(e.target).hasClass("fancybox-container") || $(e.target).is(document)) {
          return;
        }

        if (instance && $(e.target).css("position") !== "fixed" && !instance.$refs.container.has(e.target).length) {
          e.stopPropagation();
          instance.focus();
        }
      }); // Enable keyboard navigation

      $D.on("keydown.fb", function (e) {
        var current = self.current,
            keycode = e.keyCode || e.which;

        if (!current || !current.opts.keyboard) {
          return;
        }

        if (e.ctrlKey || e.altKey || e.shiftKey || $(e.target).is("input") || $(e.target).is("textarea")) {
          return;
        } // Backspace and Esc keys


        if (keycode === 8 || keycode === 27) {
          e.preventDefault();
          self.close(e);
          return;
        } // Left arrow and Up arrow


        if (keycode === 37 || keycode === 38) {
          e.preventDefault();
          self.previous();
          return;
        } // Righ arrow and Down arrow


        if (keycode === 39 || keycode === 40) {
          e.preventDefault();
          self.next();
          return;
        }

        self.trigger("afterKeydown", e, keycode);
      }); // Hide controls after some inactivity period

      if (self.group[self.currIndex].opts.idleTime) {
        self.idleSecondsCounter = 0;
        $D.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (e) {
          self.idleSecondsCounter = 0;

          if (self.isIdle) {
            self.showControls();
          }

          self.isIdle = false;
        });
        self.idleInterval = window.setInterval(function () {
          self.idleSecondsCounter++;

          if (self.idleSecondsCounter >= self.group[self.currIndex].opts.idleTime && !self.isDragging) {
            self.isIdle = true;
            self.idleSecondsCounter = 0;
            self.hideControls();
          }
        }, 1000);
      }
    },
    // Remove events added by the core
    // ===============================
    removeEvents: function removeEvents() {
      var self = this;
      $W.off("orientationchange.fb resize.fb");
      $D.off("focusin.fb keydown.fb .fb-idle");
      this.$refs.container.off(".fb-close .fb-prev .fb-next");

      if (self.idleInterval) {
        window.clearInterval(self.idleInterval);
        self.idleInterval = null;
      }
    },
    // Change to previous gallery item
    // ===============================
    previous: function previous(duration) {
      return this.jumpTo(this.currPos - 1, duration);
    },
    // Change to next gallery item
    // ===========================
    next: function next(duration) {
      return this.jumpTo(this.currPos + 1, duration);
    },
    // Switch to selected gallery item
    // ===============================
    jumpTo: function jumpTo(pos, duration) {
      var self = this,
          groupLen = self.group.length,
          firstRun,
          loop,
          current,
          previous,
          canvasWidth,
          currentPos,
          transitionProps;

      if (self.isDragging || self.isClosing || self.isAnimating && self.firstRun) {
        return;
      }

      pos = parseInt(pos, 10); // Should loop?

      loop = self.current ? self.current.opts.loop : self.opts.loop;

      if (!loop && (pos < 0 || pos >= groupLen)) {
        return false;
      }

      firstRun = self.firstRun = !Object.keys(self.slides).length;

      if (groupLen < 2 && !firstRun && !!self.isDragging) {
        return;
      }

      previous = self.current;
      self.prevIndex = self.currIndex;
      self.prevPos = self.currPos; // Create slides

      current = self.createSlide(pos);

      if (groupLen > 1) {
        if (loop || current.index > 0) {
          self.createSlide(pos - 1);
        }

        if (loop || current.index < groupLen - 1) {
          self.createSlide(pos + 1);
        }
      }

      self.current = current;
      self.currIndex = current.index;
      self.currPos = current.pos;
      self.trigger("beforeShow", firstRun);
      self.updateControls();
      currentPos = $.fancybox.getTranslate(current.$slide);
      current.isMoved = (currentPos.left !== 0 || currentPos.top !== 0) && !current.$slide.hasClass("fancybox-animated"); // Validate duration length

      current.forcedDuration = undefined;

      if ($.isNumeric(duration)) {
        current.forcedDuration = duration;
      } else {
        duration = current.opts[firstRun ? "animationDuration" : "transitionDuration"];
      }

      duration = parseInt(duration, 10); // Fresh start - reveal container, current slide and start loading content

      if (firstRun) {
        if (current.opts.animationEffect && duration) {
          self.$refs.container.css("transition-duration", duration + "ms");
        }

        self.$refs.container.removeClass("fancybox-is-hidden");
        forceRedraw(self.$refs.container);
        self.$refs.container.addClass("fancybox-is-open");
        forceRedraw(self.$refs.container); // Make current slide visible

        current.$slide.addClass("fancybox-slide--previous"); // Attempt to load content into slide;
        // at this point image would start loading, but inline/html content would load immediately

        self.loadSlide(current);
        current.$slide.removeClass("fancybox-slide--previous").addClass("fancybox-slide--current");
        self.preload("image");
        return;
      } // Clean up


      $.each(self.slides, function (index, slide) {
        $.fancybox.stop(slide.$slide);
      }); // Make current that slide is visible even if content is still loading

      current.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"); // If slides have been dragged, animate them to correct position

      if (current.isMoved) {
        canvasWidth = Math.round(current.$slide.width());
        $.each(self.slides, function (index, slide) {
          var pos = slide.pos - current.pos;
          $.fancybox.animate(slide.$slide, {
            top: 0,
            left: pos * canvasWidth + pos * slide.opts.gutter
          }, duration, function () {
            slide.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous");

            if (slide.pos === self.currPos) {
              current.isMoved = false;
              self.complete();
            }
          });
        });
      } else {
        self.$refs.stage.children().removeAttr("style");
      } // Start transition that reveals current content
      // or wait when it will be loaded


      if (current.isLoaded) {
        self.revealContent(current);
      } else {
        self.loadSlide(current);
      }

      self.preload("image");

      if (previous.pos === current.pos) {
        return;
      } // Handle previous slide
      // =====================


      transitionProps = "fancybox-slide--" + (previous.pos > current.pos ? "next" : "previous");
      previous.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous");
      previous.isComplete = false;

      if (!duration || !current.isMoved && !current.opts.transitionEffect) {
        return;
      }

      if (current.isMoved) {
        previous.$slide.addClass(transitionProps);
      } else {
        transitionProps = "fancybox-animated " + transitionProps + " fancybox-fx-" + current.opts.transitionEffect;
        $.fancybox.animate(previous.$slide, transitionProps, duration, function () {
          previous.$slide.removeClass(transitionProps).removeAttr("style");
        });
      }
    },
    // Create new "slide" element
    // These are gallery items  that are actually added to DOM
    // =======================================================
    createSlide: function createSlide(pos) {
      var self = this,
          $slide,
          index;
      index = pos % self.group.length;
      index = index < 0 ? self.group.length + index : index;

      if (!self.slides[pos] && self.group[index]) {
        $slide = $('<div class="fancybox-slide"></div>').appendTo(self.$refs.stage);
        self.slides[pos] = $.extend(true, {}, self.group[index], {
          pos: pos,
          $slide: $slide,
          isLoaded: false
        });
        self.updateSlide(self.slides[pos]);
      }

      return self.slides[pos];
    },
    // Scale image to the actual size of the image;
    // x and y values should be relative to the slide
    // ==============================================
    scaleToActual: function scaleToActual(x, y, duration) {
      var self = this,
          current = self.current,
          $content = current.$content,
          canvasWidth = $.fancybox.getTranslate(current.$slide).width,
          canvasHeight = $.fancybox.getTranslate(current.$slide).height,
          newImgWidth = current.width,
          newImgHeight = current.height,
          imgPos,
          posX,
          posY,
          scaleX,
          scaleY;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);
      self.isAnimating = true;
      x = x === undefined ? canvasWidth * 0.5 : x;
      y = y === undefined ? canvasHeight * 0.5 : y;
      imgPos = $.fancybox.getTranslate($content);
      imgPos.top -= $.fancybox.getTranslate(current.$slide).top;
      imgPos.left -= $.fancybox.getTranslate(current.$slide).left;
      scaleX = newImgWidth / imgPos.width;
      scaleY = newImgHeight / imgPos.height; // Get center position for original image

      posX = canvasWidth * 0.5 - newImgWidth * 0.5;
      posY = canvasHeight * 0.5 - newImgHeight * 0.5; // Make sure image does not move away from edges

      if (newImgWidth > canvasWidth) {
        posX = imgPos.left * scaleX - (x * scaleX - x);

        if (posX > 0) {
          posX = 0;
        }

        if (posX < canvasWidth - newImgWidth) {
          posX = canvasWidth - newImgWidth;
        }
      }

      if (newImgHeight > canvasHeight) {
        posY = imgPos.top * scaleY - (y * scaleY - y);

        if (posY > 0) {
          posY = 0;
        }

        if (posY < canvasHeight - newImgHeight) {
          posY = canvasHeight - newImgHeight;
        }
      }

      self.updateCursor(newImgWidth, newImgHeight);
      $.fancybox.animate($content, {
        top: posY,
        left: posX,
        scaleX: scaleX,
        scaleY: scaleY
      }, duration || 330, function () {
        self.isAnimating = false;
      }); // Stop slideshow

      if (self.SlideShow && self.SlideShow.isActive) {
        self.SlideShow.stop();
      }
    },
    // Scale image to fit inside parent element
    // ========================================
    scaleToFit: function scaleToFit(duration) {
      var self = this,
          current = self.current,
          $content = current.$content,
          end;

      if (self.isAnimating || !$content || !(current.type == "image" && current.isLoaded && !current.hasError)) {
        return;
      }

      $.fancybox.stop($content);
      self.isAnimating = true;
      end = self.getFitPos(current);
      self.updateCursor(end.width, end.height);
      $.fancybox.animate($content, {
        top: end.top,
        left: end.left,
        scaleX: end.width / $content.width(),
        scaleY: end.height / $content.height()
      }, duration || 330, function () {
        self.isAnimating = false;
      });
    },
    // Calculate image size to fit inside viewport
    // ===========================================
    getFitPos: function getFitPos(slide) {
      var self = this,
          $content = slide.$content,
          width = slide.width || slide.opts.width,
          height = slide.height || slide.opts.height,
          maxWidth,
          maxHeight,
          minRatio,
          margin,
          aspectRatio,
          rez = {};

      if (!slide.isLoaded || !$content || !$content.length) {
        return false;
      }

      margin = {
        top: parseInt(slide.$slide.css("paddingTop"), 10),
        right: parseInt(slide.$slide.css("paddingRight"), 10),
        bottom: parseInt(slide.$slide.css("paddingBottom"), 10),
        left: parseInt(slide.$slide.css("paddingLeft"), 10)
      }; // We can not use $slide width here, because it can have different diemensions while in transiton

      maxWidth = parseInt(self.$refs.stage.width(), 10) - (margin.left + margin.right);
      maxHeight = parseInt(self.$refs.stage.height(), 10) - (margin.top + margin.bottom);

      if (!width || !height) {
        width = maxWidth;
        height = maxHeight;
      }

      minRatio = Math.min(1, maxWidth / width, maxHeight / height); // Use floor rounding to make sure it really fits

      width = Math.floor(minRatio * width);
      height = Math.floor(minRatio * height);

      if (slide.type === "image") {
        rez.top = Math.floor((maxHeight - height) * 0.5) + margin.top;
        rez.left = Math.floor((maxWidth - width) * 0.5) + margin.left;
      } else if (slide.contentType === "video") {
        // Force aspect ratio for the video
        // "I say the whole world must learn of our peaceful ways… by force!"
        aspectRatio = slide.opts.width && slide.opts.height ? width / height : slide.opts.ratio || 16 / 9;

        if (height > width / aspectRatio) {
          height = width / aspectRatio;
        } else if (width > height * aspectRatio) {
          width = height * aspectRatio;
        }
      }

      rez.width = width;
      rez.height = height;
      return rez;
    },
    // Update content size and position for all slides
    // ==============================================
    update: function update() {
      var self = this;
      $.each(self.slides, function (key, slide) {
        self.updateSlide(slide);
      });
    },
    // Update slide content position and size
    // ======================================
    updateSlide: function updateSlide(slide, duration) {
      var self = this,
          $content = slide && slide.$content,
          width = slide.width || slide.opts.width,
          height = slide.height || slide.opts.height;

      if ($content && (width || height || slide.contentType === "video") && !slide.hasError) {
        $.fancybox.stop($content);
        $.fancybox.setTranslate($content, self.getFitPos(slide));

        if (slide.pos === self.currPos) {
          self.isAnimating = false;
          self.updateCursor();
        }
      }

      slide.$slide.trigger("refresh");
      self.$refs.toolbar.toggleClass("compensate-for-scrollbar", slide.$slide.get(0).scrollHeight > slide.$slide.get(0).clientHeight);
      self.trigger("onUpdate", slide);
    },
    // Horizontally center slide
    // =========================
    centerSlide: function centerSlide(slide, duration) {
      var self = this,
          canvasWidth,
          pos;

      if (self.current) {
        canvasWidth = Math.round(slide.$slide.width());
        pos = slide.pos - self.current.pos;
        $.fancybox.animate(slide.$slide, {
          top: 0,
          left: pos * canvasWidth + pos * slide.opts.gutter,
          opacity: 1
        }, duration === undefined ? 0 : duration, null, false);
      }
    },
    // Update cursor style depending if content can be zoomed
    // ======================================================
    updateCursor: function updateCursor(nextWidth, nextHeight) {
      var self = this,
          current = self.current,
          $container = self.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut"),
          isZoomable;

      if (!current || self.isClosing) {
        return;
      }

      isZoomable = self.isZoomable();
      $container.toggleClass("fancybox-is-zoomable", isZoomable);
      $("[data-fancybox-zoom]").prop("disabled", !isZoomable); // Set cursor to zoom in/out if click event is 'zoom'

      if (isZoomable && (current.opts.clickContent === "zoom" || $.isFunction(current.opts.clickContent) && current.opts.clickContent(current) === "zoom")) {
        if (self.isScaledDown(nextWidth, nextHeight)) {
          // If image is scaled down, then, obviously, it can be zoomed to full size
          $container.addClass("fancybox-can-zoomIn");
        } else {
          if (current.opts.touch) {
            // If image size ir largen than available available and touch module is not disable,
            // then user can do panning
            $container.addClass("fancybox-can-drag");
          } else {
            $container.addClass("fancybox-can-zoomOut");
          }
        }
      } else if (current.opts.touch && current.contentType !== "video") {
        $container.addClass("fancybox-can-drag");
      }
    },
    // Check if current slide is zoomable
    // ==================================
    isZoomable: function isZoomable() {
      var self = this,
          current = self.current,
          fitPos; // Assume that slide is zoomable if:
      //   - image is still loading
      //   - actual size of the image is smaller than available area

      if (current && !self.isClosing && current.type === "image" && !current.hasError) {
        if (!current.isLoaded) {
          return true;
        }

        fitPos = self.getFitPos(current);

        if (current.width > fitPos.width || current.height > fitPos.height) {
          return true;
        }
      }

      return false;
    },
    // Check if current image dimensions are smaller than actual
    // =========================================================
    isScaledDown: function isScaledDown(nextWidth, nextHeight) {
      var self = this,
          rez = false,
          current = self.current,
          $content = current.$content;

      if (nextWidth !== undefined && nextHeight !== undefined) {
        rez = nextWidth < current.width && nextHeight < current.height;
      } else if ($content) {
        rez = $.fancybox.getTranslate($content);
        rez = rez.width < current.width && rez.height < current.height;
      }

      return rez;
    },
    // Check if image dimensions exceed parent element
    // ===============================================
    canPan: function canPan() {
      var self = this,
          rez = false,
          current = self.current,
          $content;

      if (current.type === "image" && ($content = current.$content) && !current.hasError) {
        rez = self.getFitPos(current);
        rez = Math.abs($content.width() - rez.width) > 1 || Math.abs($content.height() - rez.height) > 1;
      }

      return rez;
    },
    // Load content into the slide
    // ===========================
    loadSlide: function loadSlide(slide) {
      var self = this,
          type,
          $slide,
          ajaxLoad;

      if (slide.isLoading || slide.isLoaded) {
        return;
      }

      slide.isLoading = true;
      self.trigger("beforeLoad", slide);
      type = slide.type;
      $slide = slide.$slide;
      $slide.off("refresh").trigger("onReset").addClass(slide.opts.slideClass); // Create content depending on the type

      switch (type) {
        case "image":
          self.setImage(slide);
          break;

        case "iframe":
          self.setIframe(slide);
          break;

        case "html":
          self.setContent(slide, slide.src || slide.content);
          break;

        case "video":
          self.setContent(slide, '<video class="fancybox-video" controls controlsList="nodownload">' + '<source src="' + slide.src + '" type="' + slide.opts.videoFormat + '">' + "Your browser doesn't support HTML5 video" + "</video");
          break;

        case "inline":
          if ($(slide.src).length) {
            self.setContent(slide, $(slide.src));
          } else {
            self.setError(slide);
          }

          break;

        case "ajax":
          self.showLoading(slide);
          ajaxLoad = $.ajax($.extend({}, slide.opts.ajax.settings, {
            url: slide.src,
            success: function success(data, textStatus) {
              if (textStatus === "success") {
                self.setContent(slide, data);
              }
            },
            error: function error(jqXHR, textStatus) {
              if (jqXHR && textStatus !== "abort") {
                self.setError(slide);
              }
            }
          }));
          $slide.one("onReset", function () {
            ajaxLoad.abort();
          });
          break;

        default:
          self.setError(slide);
          break;
      }

      return true;
    },
    // Use thumbnail image, if possible
    // ================================
    setImage: function setImage(slide) {
      var self = this,
          srcset = slide.opts.srcset || slide.opts.image.srcset,
          thumbSrc,
          found,
          temp,
          pxRatio,
          windowWidth; // Check if need to show loading icon

      slide.timouts = setTimeout(function () {
        var $img = slide.$image;

        if (slide.isLoading && (!$img || !$img[0].complete) && !slide.hasError) {
          self.showLoading(slide);
        }
      }, 350); // If we have "srcset", then we need to find first matching "src" value.
      // This is necessary, because when you set an src attribute, the browser will preload the image
      // before any javascript or even CSS is applied.

      if (srcset) {
        pxRatio = window.devicePixelRatio || 1;
        windowWidth = window.innerWidth * pxRatio;
        temp = srcset.split(",").map(function (el) {
          var ret = {};
          el.trim().split(/\s+/).forEach(function (el, i) {
            var value = parseInt(el.substring(0, el.length - 1), 10);

            if (i === 0) {
              return ret.url = el;
            }

            if (value) {
              ret.value = value;
              ret.postfix = el[el.length - 1];
            }
          });
          return ret;
        }); // Sort by value

        temp.sort(function (a, b) {
          return a.value - b.value;
        }); // Ok, now we have an array of all srcset values

        for (var j = 0; j < temp.length; j++) {
          var el = temp[j];

          if (el.postfix === "w" && el.value >= windowWidth || el.postfix === "x" && el.value >= pxRatio) {
            found = el;
            break;
          }
        } // If not found, take the last one


        if (!found && temp.length) {
          found = temp[temp.length - 1];
        }

        if (found) {
          slide.src = found.url; // If we have default width/height values, we can calculate height for matching source

          if (slide.width && slide.height && found.postfix == "w") {
            slide.height = slide.width / slide.height * found.value;
            slide.width = found.value;
          }

          slide.opts.srcset = srcset;
        }
      } // This will be wrapper containing both ghost and actual image


      slide.$content = $('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(slide.$slide.addClass("fancybox-slide--image")); // If we have a thumbnail, we can display it while actual image is loading
      // Users will not stare at black screen and actual image will appear gradually

      thumbSrc = slide.opts.thumb || (slide.opts.$thumb && slide.opts.$thumb.length ? slide.opts.$thumb.attr("src") : false);

      if (slide.opts.preload !== false && slide.opts.width && slide.opts.height && thumbSrc) {
        slide.width = slide.opts.width;
        slide.height = slide.opts.height;
        slide.$ghost = $("<img />").one("error", function () {
          $(this).remove();
          slide.$ghost = null;
        }).one("load", function () {
          self.afterLoad(slide);
        }).addClass("fancybox-image").appendTo(slide.$content).attr("src", thumbSrc);
      } // Start loading actual image


      self.setBigImage(slide);
    },
    // Create full-size image
    // ======================
    setBigImage: function setBigImage(slide) {
      var self = this,
          $img = $("<img />");
      slide.$image = $img.one("error", function () {
        self.setError(slide);
      }).one("load", function () {
        var sizes;

        if (!slide.$ghost) {
          self.resolveImageSlideSize(slide, this.naturalWidth, this.naturalHeight);
          self.afterLoad(slide);
        } // Clear timeout that checks if loading icon needs to be displayed


        if (slide.timouts) {
          clearTimeout(slide.timouts);
          slide.timouts = null;
        }

        if (self.isClosing) {
          return;
        }

        if (slide.opts.srcset) {
          sizes = slide.opts.sizes;

          if (!sizes || sizes === "auto") {
            sizes = (slide.width / slide.height > 1 && $W.width() / $W.height() > 1 ? "100" : Math.round(slide.width / slide.height * 100)) + "vw";
          }

          $img.attr("sizes", sizes).attr("srcset", slide.opts.srcset);
        } // Hide temporary image after some delay


        if (slide.$ghost) {
          setTimeout(function () {
            if (slide.$ghost && !self.isClosing) {
              slide.$ghost.hide();
            }
          }, Math.min(300, Math.max(1000, slide.height / 1600)));
        }

        self.hideLoading(slide);
      }).addClass("fancybox-image").attr("src", slide.src).appendTo(slide.$content);

      if (($img[0].complete || $img[0].readyState == "complete") && $img[0].naturalWidth && $img[0].naturalHeight) {
        $img.trigger("load");
      } else if ($img[0].error) {
        $img.trigger("error");
      }
    },
    // Computes the slide size from image size and maxWidth/maxHeight
    // ==============================================================
    resolveImageSlideSize: function resolveImageSlideSize(slide, imgWidth, imgHeight) {
      var maxWidth = parseInt(slide.opts.width, 10),
          maxHeight = parseInt(slide.opts.height, 10); // Sets the default values from the image

      slide.width = imgWidth;
      slide.height = imgHeight;

      if (maxWidth > 0) {
        slide.width = maxWidth;
        slide.height = Math.floor(maxWidth * imgHeight / imgWidth);
      }

      if (maxHeight > 0) {
        slide.width = Math.floor(maxHeight * imgWidth / imgHeight);
        slide.height = maxHeight;
      }
    },
    // Create iframe wrapper, iframe and bindings
    // ==========================================
    setIframe: function setIframe(slide) {
      var self = this,
          opts = slide.opts.iframe,
          $slide = slide.$slide,
          $iframe;
      slide.$content = $('<div class="fancybox-content' + (opts.preload ? " fancybox-is-hidden" : "") + '"></div>').css(opts.css).appendTo($slide);
      $slide.addClass("fancybox-slide--" + slide.contentType);
      slide.$iframe = $iframe = $(opts.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(opts.attr).appendTo(slide.$content);

      if (opts.preload) {
        self.showLoading(slide); // Unfortunately, it is not always possible to determine if iframe is successfully loaded
        // (due to browser security policy)

        $iframe.on("load.fb error.fb", function (e) {
          this.isReady = 1;
          slide.$slide.trigger("refresh");
          self.afterLoad(slide);
        }); // Recalculate iframe content size
        // ===============================

        $slide.on("refresh.fb", function () {
          var $content = slide.$content,
              frameWidth = opts.css.width,
              frameHeight = opts.css.height,
              $contents,
              $body;

          if ($iframe[0].isReady !== 1) {
            return;
          }

          try {
            $contents = $iframe.contents();
            $body = $contents.find("body");
          } catch (ignore) {} // Calculate contnet dimensions if it is accessible


          if ($body && $body.length && $body.children().length) {
            $content.css({
              width: "",
              height: ""
            });

            if (frameWidth === undefined) {
              frameWidth = Math.ceil(Math.max($body[0].clientWidth, $body.outerWidth(true)));
            }

            if (frameWidth) {
              $content.width(frameWidth);
            }

            if (frameHeight === undefined) {
              frameHeight = Math.ceil(Math.max($body[0].clientHeight, $body.outerHeight(true)));
            }

            if (frameHeight) {
              $content.height(frameHeight);
            }
          }

          $content.removeClass("fancybox-is-hidden");
        });
      } else {
        this.afterLoad(slide);
      }

      $iframe.attr("src", slide.src); // Remove iframe if closing or changing gallery item

      $slide.one("onReset", function () {
        // This helps IE not to throw errors when closing
        try {
          $(this).find("iframe").hide().unbind().attr("src", "//about:blank");
        } catch (ignore) {}

        $(this).off("refresh.fb").empty();
        slide.isLoaded = false;
      });
    },
    // Wrap and append content to the slide
    // ======================================
    setContent: function setContent(slide, content) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      self.hideLoading(slide);

      if (slide.$content) {
        $.fancybox.stop(slide.$content);
      }

      slide.$slide.empty(); // If content is a jQuery object, then it will be moved to the slide.
      // The placeholder is created so we will know where to put it back.

      if (isQuery(content) && content.parent().length) {
        // Make sure content is not already moved to fancyBox
        content.parent().parent(".fancybox-slide--inline").trigger("onReset"); // Create temporary element marking original place of the content

        slide.$placeholder = $("<div>").hide().insertAfter(content); // Make sure content is visible

        content.css("display", "inline-block");
      } else if (!slide.hasError) {
        // If content is just a plain text, try to convert it to html
        if ($.type(content) === "string") {
          content = $("<div>").append($.trim(content)).contents(); // If we have text node, then add wrapping element to make vertical alignment work

          if (content[0].nodeType === 3) {
            content = $("<div>").html(content);
          }
        } // If "filter" option is provided, then filter content


        if (slide.opts.filter) {
          content = $("<div>").html(content).find(slide.opts.filter);
        }
      }

      slide.$slide.one("onReset", function () {
        // Pause all html5 video/audio
        $(this).find("video,audio").trigger("pause"); // Put content back

        if (slide.$placeholder) {
          slide.$placeholder.after(content.hide()).remove();
          slide.$placeholder = null;
        } // Remove custom close button


        if (slide.$smallBtn) {
          slide.$smallBtn.remove();
          slide.$smallBtn = null;
        } // Remove content and mark slide as not loaded


        if (!slide.hasError) {
          $(this).empty();
          slide.isLoaded = false;
        }
      });
      $(content).appendTo(slide.$slide);

      if ($(content).is("video,audio")) {
        $(content).addClass("fancybox-video");
        $(content).wrap("<div></div>");
        slide.contentType = "video";
        slide.opts.width = slide.opts.width || $(content).attr("width");
        slide.opts.height = slide.opts.height || $(content).attr("height");
      }

      slide.$content = slide.$slide.children().filter("div,form,main,video,audio").first().addClass("fancybox-content");
      slide.$slide.addClass("fancybox-slide--" + slide.contentType);
      this.afterLoad(slide);
    },
    // Display error message
    // =====================
    setError: function setError(slide) {
      slide.hasError = true;
      slide.$slide.trigger("onReset").removeClass("fancybox-slide--" + slide.contentType).addClass("fancybox-slide--error");
      slide.contentType = "html";
      this.setContent(slide, this.translate(slide, slide.opts.errorTpl));

      if (slide.pos === this.currPos) {
        this.isAnimating = false;
      }
    },
    // Show loading icon inside the slide
    // ==================================
    showLoading: function showLoading(slide) {
      var self = this;
      slide = slide || self.current;

      if (slide && !slide.$spinner) {
        slide.$spinner = $(self.translate(self, self.opts.spinnerTpl)).appendTo(slide.$slide);
      }
    },
    // Remove loading icon from the slide
    // ==================================
    hideLoading: function hideLoading(slide) {
      var self = this;
      slide = slide || self.current;

      if (slide && slide.$spinner) {
        slide.$spinner.remove();
        delete slide.$spinner;
      }
    },
    // Adjustments after slide content has been loaded
    // ===============================================
    afterLoad: function afterLoad(slide) {
      var self = this;

      if (self.isClosing) {
        return;
      }

      slide.isLoading = false;
      slide.isLoaded = true;
      self.trigger("afterLoad", slide);
      self.hideLoading(slide);

      if (slide.pos === self.currPos) {
        self.updateCursor();
      }

      if (slide.opts.smallBtn && (!slide.$smallBtn || !slide.$smallBtn.length)) {
        slide.$smallBtn = $(self.translate(slide, slide.opts.btnTpl.smallBtn)).prependTo(slide.$content);
      }

      if (slide.opts.protect && slide.$content && !slide.hasError) {
        // Disable right click
        slide.$content.on("contextmenu.fb", function (e) {
          if (e.button == 2) {
            e.preventDefault();
          }

          return true;
        }); // Add fake element on top of the image
        // This makes a bit harder for user to select image

        if (slide.type === "image") {
          $('<div class="fancybox-spaceball"></div>').appendTo(slide.$content);
        }
      }

      self.revealContent(slide);
    },
    // Make content visible
    // This method is called right after content has been loaded or
    // user navigates gallery and transition should start
    // ============================================================
    revealContent: function revealContent(slide) {
      var self = this,
          $slide = slide.$slide,
          end = false,
          start = false,
          effect,
          effectClassName,
          duration,
          opacity;
      effect = slide.opts[self.firstRun ? "animationEffect" : "transitionEffect"];
      duration = slide.opts[self.firstRun ? "animationDuration" : "transitionDuration"];
      duration = parseInt(slide.forcedDuration === undefined ? duration : slide.forcedDuration, 10); // Do not animate if revealing the same slide

      if (slide.pos === self.currPos) {
        if (slide.isComplete) {
          effect = false;
        } else {
          self.isAnimating = true;
        }
      }

      if (slide.isMoved || slide.pos !== self.currPos || !duration) {
        effect = false;
      } // Check if can zoom


      if (effect === "zoom") {
        if (slide.pos === self.currPos && duration && slide.type === "image" && !slide.hasError && (start = self.getThumbPos(slide))) {
          end = self.getFitPos(slide);
        } else {
          effect = "fade";
        }
      } // Zoom animation
      // ==============


      if (effect === "zoom") {
        end.scaleX = end.width / start.width;
        end.scaleY = end.height / start.height; // Check if we need to animate opacity

        opacity = slide.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(slide.width / slide.height - start.width / start.height) > 0.1;
        }

        if (opacity) {
          start.opacity = 0.1;
          end.opacity = 1;
        } // Draw image at start position


        $.fancybox.setTranslate(slide.$content.removeClass("fancybox-is-hidden"), start);
        forceRedraw(slide.$content); // Start animation

        $.fancybox.animate(slide.$content, end, duration, function () {
          self.isAnimating = false;
          self.complete();
        });
        return;
      }

      self.updateSlide(slide); // Simply show content
      // ===================

      if (!effect) {
        forceRedraw($slide);
        slide.$content.removeClass("fancybox-is-hidden");

        if (slide.pos === self.currPos) {
          self.complete();
        }

        return;
      }

      $.fancybox.stop($slide);
      effectClassName = "fancybox-animated fancybox-slide--" + (slide.pos >= self.prevPos ? "next" : "previous") + " fancybox-fx-" + effect;
      $slide.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(effectClassName);
      slide.$content.removeClass("fancybox-is-hidden"); // Force reflow for CSS3 transitions

      forceRedraw($slide);
      $.fancybox.animate($slide, "fancybox-slide--current", duration, function (e) {
        $slide.removeClass(effectClassName).removeAttr("style");

        if (slide.pos === self.currPos) {
          self.complete();
        }
      }, true);
    },
    // Check if we can and have to zoom from thumbnail
    //================================================
    getThumbPos: function getThumbPos(slide) {
      var self = this,
          rez = false,
          $thumb = slide.opts.$thumb,
          thumbPos = $thumb && $thumb.length && $thumb[0].ownerDocument === document ? $thumb.offset() : 0,
          slidePos; // Check if element is inside the viewport by at least 1 pixel

      var isElementVisible = function isElementVisible($el) {
        var element = $el[0],
            elementRect = element.getBoundingClientRect(),
            parentRects = [],
            visibleInAllParents;

        while (element.parentElement !== null) {
          if ($(element.parentElement).css("overflow") === "hidden" || $(element.parentElement).css("overflow") === "auto") {
            parentRects.push(element.parentElement.getBoundingClientRect());
          }

          element = element.parentElement;
        }

        visibleInAllParents = parentRects.every(function (parentRect) {
          var visiblePixelX = Math.min(elementRect.right, parentRect.right) - Math.max(elementRect.left, parentRect.left);
          var visiblePixelY = Math.min(elementRect.bottom, parentRect.bottom) - Math.max(elementRect.top, parentRect.top);
          return visiblePixelX > 0 && visiblePixelY > 0;
        });
        return visibleInAllParents && elementRect.bottom > 0 && elementRect.right > 0 && elementRect.left < $(window).width() && elementRect.top < $(window).height();
      };

      if (thumbPos && isElementVisible($thumb)) {
        slidePos = self.$refs.stage.offset();
        rez = {
          top: thumbPos.top - slidePos.top + parseFloat($thumb.css("border-top-width") || 0),
          left: thumbPos.left - slidePos.left + parseFloat($thumb.css("border-left-width") || 0),
          width: $thumb.width(),
          height: $thumb.height(),
          scaleX: 1,
          scaleY: 1
        };
      }

      return rez;
    },
    // Final adjustments after current gallery item is moved to position
    // and it`s content is loaded
    // ==================================================================
    complete: function complete() {
      var self = this,
          current = self.current,
          slides = {};

      if (current.isMoved || !current.isLoaded) {
        return;
      }

      if (!current.isComplete) {
        current.isComplete = true;
        current.$slide.siblings().trigger("onReset");
        self.preload("inline"); // Trigger any CSS3 transiton inside the slide

        forceRedraw(current.$slide);
        current.$slide.addClass("fancybox-slide--complete"); // Remove unnecessary slides

        $.each(self.slides, function (key, slide) {
          if (slide.pos >= self.currPos - 1 && slide.pos <= self.currPos + 1) {
            slides[slide.pos] = slide;
          } else if (slide) {
            $.fancybox.stop(slide.$slide);
            slide.$slide.off().remove();
          }
        });
        self.slides = slides;
      }

      self.isAnimating = false;
      self.updateCursor();
      self.trigger("afterShow"); // Play first html5 video/audio

      current.$slide.find("video,audio").filter(":visible:first").trigger("play"); // Try to focus on the first focusable element

      if ($(document.activeElement).is("[disabled]") || current.opts.autoFocus && !(current.type == "image" || current.type === "iframe")) {
        self.focus();
      }
    },
    // Preload next and previous slides
    // ================================
    preload: function preload(type) {
      var self = this,
          next = self.slides[self.currPos + 1],
          prev = self.slides[self.currPos - 1];

      if (next && next.type === type) {
        self.loadSlide(next);
      }

      if (prev && prev.type === type) {
        self.loadSlide(prev);
      }
    },
    // Try to find and focus on the first focusable element
    // ====================================================
    focus: function focus() {
      var current = this.current,
          $el;

      if (this.isClosing) {
        return;
      }

      if (current && current.isComplete && current.$content) {
        // Look for first input with autofocus attribute
        $el = current.$content.find("input[autofocus]:enabled:visible:first");

        if (!$el.length) {
          $el = current.$content.find("button,:input,[tabindex],a").filter(":enabled:visible:first");
        }

        $el = $el && $el.length ? $el : current.$content;
        $el.trigger("focus");
      }
    },
    // Activates current instance - brings container to the front and enables keyboard,
    // notifies other instances about deactivating
    // =================================================================================
    activate: function activate() {
      var self = this; // Deactivate all instances

      $(".fancybox-container").each(function () {
        var instance = $(this).data("FancyBox"); // Skip self and closing instances

        if (instance && instance.id !== self.id && !instance.isClosing) {
          instance.trigger("onDeactivate");
          instance.removeEvents();
          instance.isVisible = false;
        }
      });
      self.isVisible = true;

      if (self.current || self.isIdle) {
        self.update();
        self.updateControls();
      }

      self.trigger("onActivate");
      self.addEvents();
    },
    // Start closing procedure
    // This will start "zoom-out" animation if needed and clean everything up afterwards
    // =================================================================================
    close: function close(e, d) {
      var self = this,
          current = self.current,
          effect,
          duration,
          $content,
          domRect,
          opacity,
          start,
          end;

      var done = function done() {
        self.cleanUp(e);
      };

      if (self.isClosing) {
        return false;
      }

      self.isClosing = true; // If beforeClose callback prevents closing, make sure content is centered

      if (self.trigger("beforeClose", e) === false) {
        self.isClosing = false;
        requestAFrame(function () {
          self.update();
        });
        return false;
      } // Remove all events
      // If there are multiple instances, they will be set again by "activate" method


      self.removeEvents();

      if (current.timouts) {
        clearTimeout(current.timouts);
      }

      $content = current.$content;
      effect = current.opts.animationEffect;
      duration = $.isNumeric(d) ? d : effect ? current.opts.animationDuration : 0; // Remove other slides

      current.$slide.off(transitionEnd).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated");
      current.$slide.siblings().trigger("onReset").remove(); // Trigger animations

      if (duration) {
        self.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing");
      } // Clean up


      self.hideLoading(current);
      self.hideControls();
      self.updateCursor(); // Check if possible to zoom-out

      if (effect === "zoom" && !(e !== true && $content && duration && current.type === "image" && !current.hasError && (end = self.getThumbPos(current)))) {
        effect = "fade";
      }

      if (effect === "zoom") {
        $.fancybox.stop($content);
        domRect = $.fancybox.getTranslate($content);
        start = {
          top: domRect.top,
          left: domRect.left,
          scaleX: domRect.width / end.width,
          scaleY: domRect.height / end.height,
          width: end.width,
          height: end.height
        }; // Check if we need to animate opacity

        opacity = current.opts.zoomOpacity;

        if (opacity == "auto") {
          opacity = Math.abs(current.width / current.height - end.width / end.height) > 0.1;
        }

        if (opacity) {
          end.opacity = 0;
        }

        $.fancybox.setTranslate($content, start);
        forceRedraw($content);
        $.fancybox.animate($content, end, duration, done);
        return true;
      }

      if (effect && duration) {
        // If skip animation
        if (e === true) {
          setTimeout(done, duration);
        } else {
          $.fancybox.animate(current.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + effect, duration, done);
        }
      } else {
        done();
      }

      return true;
    },
    // Final adjustments after removing the instance
    // =============================================
    cleanUp: function cleanUp(e) {
      var self = this,
          $body = $("body"),
          instance,
          scrollTop;
      self.current.$slide.trigger("onReset");
      self.$refs.container.empty().remove();
      self.trigger("afterClose", e); // Place back focus

      if (self.$lastFocus && !!self.current.opts.backFocus) {
        self.$lastFocus.trigger("focus");
      }

      self.current = null; // Check if there are other instances

      instance = $.fancybox.getInstance();

      if (instance) {
        instance.activate();
      } else {
        $body.removeClass("fancybox-active compensate-for-scrollbar");
        $("#fancybox-style-noscroll").remove();
      }
    },
    // Call callback and trigger an event
    // ==================================
    trigger: function trigger(name, slide) {
      var args = Array.prototype.slice.call(arguments, 1),
          self = this,
          obj = slide && slide.opts ? slide : self.current,
          rez;

      if (obj) {
        args.unshift(obj);
      } else {
        obj = self;
      }

      args.unshift(self);

      if ($.isFunction(obj.opts[name])) {
        rez = obj.opts[name].apply(obj, args);
      }

      if (rez === false) {
        return rez;
      }

      if (name === "afterClose" || !self.$refs) {
        $D.trigger(name + ".fb", args);
      } else {
        self.$refs.container.trigger(name + ".fb", args);
      }
    },
    // Update infobar values, navigation button states and reveal caption
    // ==================================================================
    updateControls: function updateControls(force) {
      var self = this,
          current = self.current,
          index = current.index,
          caption = current.opts.caption,
          $container = self.$refs.container,
          $caption = self.$refs.caption; // Recalculate content dimensions

      current.$slide.trigger("refresh");
      self.$caption = caption && caption.length ? $caption.html(caption) : null;

      if (!self.isHiddenControls && !self.isIdle) {
        self.showControls();
      } // Update info and navigation elements


      $container.find("[data-fancybox-count]").html(self.group.length);
      $container.find("[data-fancybox-index]").html(index + 1);
      $container.find("[data-fancybox-prev]").toggleClass("disabled", !current.opts.loop && index <= 0);
      $container.find("[data-fancybox-next]").toggleClass("disabled", !current.opts.loop && index >= self.group.length - 1);

      if (current.type === "image") {
        // Re-enable buttons; update download button source
        $container.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", current.opts.image.src || current.src).show();
      } else if (current.opts.toolbar) {
        $container.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
      }
    },
    // Hide toolbar and caption
    // ========================
    hideControls: function hideControls() {
      this.isHiddenControls = true;
      this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
    },
    showControls: function showControls() {
      var self = this,
          opts = self.current ? self.current.opts : self.opts,
          $container = self.$refs.container;
      self.isHiddenControls = false;
      self.idleSecondsCounter = 0;
      $container.toggleClass("fancybox-show-toolbar", !!(opts.toolbar && opts.buttons)).toggleClass("fancybox-show-infobar", !!(opts.infobar && self.group.length > 1)).toggleClass("fancybox-show-nav", !!(opts.arrows && self.group.length > 1)).toggleClass("fancybox-is-modal", !!opts.modal);

      if (self.$caption) {
        $container.addClass("fancybox-show-caption ");
      } else {
        $container.removeClass("fancybox-show-caption");
      }
    },
    // Toggle toolbar and caption
    // ==========================
    toggleControls: function toggleControls() {
      if (this.isHiddenControls) {
        this.showControls();
      } else {
        this.hideControls();
      }
    }
  });
  $.fancybox = {
    version: "3.3.5",
    defaults: defaults,
    // Get current instance and execute a command.
    //
    // Examples of usage:
    //
    //   $instance = $.fancybox.getInstance();
    //   $.fancybox.getInstance().jumpTo( 1 );
    //   $.fancybox.getInstance( 'jumpTo', 1 );
    //   $.fancybox.getInstance( function() {
    //       console.info( this.currIndex );
    //   });
    // ======================================================
    getInstance: function getInstance(command) {
      var instance = $('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
          args = Array.prototype.slice.call(arguments, 1);

      if (instance instanceof FancyBox) {
        if ($.type(command) === "string") {
          instance[command].apply(instance, args);
        } else if ($.type(command) === "function") {
          command.apply(instance, args);
        }

        return instance;
      }

      return false;
    },
    // Create new instance
    // ===================
    open: function open(items, opts, index) {
      return new FancyBox(items, opts, index);
    },
    // Close current or all instances
    // ==============================
    close: function close(all) {
      var instance = this.getInstance();

      if (instance) {
        instance.close(); // Try to find and close next instance

        if (all === true) {
          this.close();
        }
      }
    },
    // Close all instances and unbind all events
    // =========================================
    destroy: function destroy() {
      this.close(true);
      $D.add("body").off("click.fb-start", "**");
    },
    // Try to detect mobile devices
    // ============================
    isMobile: document.createTouch !== undefined && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    // Detect if 'translate3d' support is available
    // ============================================
    use3d: function () {
      var div = document.createElement("div");
      return window.getComputedStyle && window.getComputedStyle(div) && window.getComputedStyle(div).getPropertyValue("transform") && !(document.documentMode && document.documentMode < 11);
    }(),
    // Helper function to get current visual state of an element
    // returns array[ top, left, horizontal-scale, vertical-scale, opacity ]
    // =====================================================================
    getTranslate: function getTranslate($el) {
      var domRect;

      if (!$el || !$el.length) {
        return false;
      }

      domRect = $el[0].getBoundingClientRect();
      return {
        top: domRect.top || 0,
        left: domRect.left || 0,
        width: domRect.width,
        height: domRect.height,
        opacity: parseFloat($el.css("opacity"))
      };
    },
    // Shortcut for setting "translate3d" properties for element
    // Can set be used to set opacity, too
    // ========================================================
    setTranslate: function setTranslate($el, props) {
      var str = "",
          css = {};

      if (!$el || !props) {
        return;
      }

      if (props.left !== undefined || props.top !== undefined) {
        str = (props.left === undefined ? $el.position().left : props.left) + "px, " + (props.top === undefined ? $el.position().top : props.top) + "px";

        if (this.use3d) {
          str = "translate3d(" + str + ", 0px)";
        } else {
          str = "translate(" + str + ")";
        }
      }

      if (props.scaleX !== undefined && props.scaleY !== undefined) {
        str = (str.length ? str + " " : "") + "scale(" + props.scaleX + ", " + props.scaleY + ")";
      }

      if (str.length) {
        css.transform = str;
      }

      if (props.opacity !== undefined) {
        css.opacity = props.opacity;
      }

      if (props.width !== undefined) {
        css.width = props.width;
      }

      if (props.height !== undefined) {
        css.height = props.height;
      }

      return $el.css(css);
    },
    // Simple CSS transition handler
    // =============================
    animate: function animate($el, to, duration, callback, leaveAnimationName) {
      var final = false;

      if ($.isFunction(duration)) {
        callback = duration;
        duration = null;
      }

      if (!$.isPlainObject(to)) {
        $el.removeAttr("style");
      }

      $.fancybox.stop($el);
      $el.on(transitionEnd, function (e) {
        // Skip events from child elements and z-index change
        if (e && e.originalEvent && (!$el.is(e.originalEvent.target) || e.originalEvent.propertyName == "z-index")) {
          return;
        }

        $.fancybox.stop($el);

        if (final) {
          $.fancybox.setTranslate($el, final);
        }

        if ($.isPlainObject(to)) {
          if (leaveAnimationName === false) {
            $el.removeAttr("style");
          }
        } else if (leaveAnimationName !== true) {
          $el.removeClass(to);
        }

        if ($.isFunction(callback)) {
          callback(e);
        }
      });

      if ($.isNumeric(duration)) {
        $el.css("transition-duration", duration + "ms");
      } // Start animation by changing CSS properties or class name


      if ($.isPlainObject(to)) {
        if (to.scaleX !== undefined && to.scaleY !== undefined) {
          final = $.extend({}, to, {
            width: $el.width() * to.scaleX,
            height: $el.height() * to.scaleY,
            scaleX: 1,
            scaleY: 1
          });
          delete to.width;
          delete to.height;

          if ($el.parent().hasClass("fancybox-slide--image")) {
            $el.parent().addClass("fancybox-is-scaling");
          }
        }

        $.fancybox.setTranslate($el, to);
      } else {
        $el.addClass(to);
      } // Make sure that `transitionend` callback gets fired


      $el.data("timer", setTimeout(function () {
        $el.trigger("transitionend");
      }, duration + 16));
    },
    stop: function stop($el) {
      if ($el && $el.length) {
        clearTimeout($el.data("timer"));
        $el.off("transitionend").css("transition-duration", "");
        $el.parent().removeClass("fancybox-is-scaling");
      }
    }
  }; // Default click handler for "fancyboxed" links
  // ============================================

  function _run(e, opts) {
    var items = [],
        index = 0,
        $target,
        value; // Avoid opening multiple times

    if (e && e.isDefaultPrevented()) {
      return;
    }

    e.preventDefault();
    opts = e && e.data ? e.data.options : opts || {};
    $target = opts.$target || $(e.currentTarget);
    value = $target.attr("data-fancybox") || ""; // Get all related items and find index for clicked one

    if (value) {
      items = opts.selector ? $(opts.selector) : e.data ? e.data.items : [];
      items = items.length ? items.filter('[data-fancybox="' + value + '"]') : $('[data-fancybox="' + value + '"]');
      index = items.index($target); // Sometimes current item can not be found (for example, if some script clones items)

      if (index < 0) {
        index = 0;
      }
    } else {
      items = [$target];
    }

    $.fancybox.open(items, opts, index);
  } // Create a jQuery plugin
  // ======================


  $.fn.fancybox = function (options) {
    var selector;
    options = options || {};
    selector = options.selector || false;

    if (selector) {
      // Use body element instead of document so it executes first
      $("body").off("click.fb-start", selector).on("click.fb-start", selector, {
        options: options
      }, _run);
    } else {
      this.off("click.fb-start").on("click.fb-start", {
        items: this,
        options: options
      }, _run);
    }

    return this;
  }; // Self initializing plugin for all elements having `data-fancybox` attribute
  // ==========================================================================


  $D.on("click.fb-start", "[data-fancybox]", _run); // Enable "trigger elements"
  // =========================

  $D.on("click.fb-start", "[data-trigger]", function (e) {
    _run(e, {
      $target: $('[data-fancybox="' + $(e.currentTarget).attr("data-trigger") + '"]').eq($(e.currentTarget).attr("data-index") || 0),
      $trigger: $(this)
    });
  });
})(window, document, window.jQuery || jQuery); // ==========================================================================
//
// Media
// Adds additional media type support
//
// ==========================================================================


(function ($) {
  "use strict"; // Formats matching url to final form

  var format = function format(url, rez, params) {
    if (!url) {
      return;
    }

    params = params || "";

    if ($.type(params) === "object") {
      params = $.param(params, true);
    }

    $.each(rez, function (key, value) {
      url = url.replace("$" + key, value || "");
    });

    if (params.length) {
      url += (url.indexOf("?") > 0 ? "&" : "?") + params;
    }

    return url;
  }; // Object containing properties for each media type


  var defaults = {
    youtube: {
      matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
      params: {
        autoplay: 1,
        autohide: 1,
        fs: 1,
        rel: 0,
        hd: 1,
        wmode: "transparent",
        enablejsapi: 1,
        html5: 1
      },
      paramPlace: 8,
      type: "iframe",
      url: "//www.youtube.com/embed/$4",
      thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
    },
    vimeo: {
      matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
      params: {
        autoplay: 1,
        hd: 1,
        show_title: 1,
        show_byline: 1,
        show_portrait: 0,
        fullscreen: 1,
        api: 1
      },
      paramPlace: 3,
      type: "iframe",
      url: "//player.vimeo.com/video/$2"
    },
    instagram: {
      matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
      type: "image",
      url: "//$1/p/$2/media/?size=l"
    },
    // Examples:
    // http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
    // https://www.google.com/maps/@37.7852006,-122.4146355,14.65z
    // https://www.google.com/maps/@52.2111123,2.9237542,6.61z?hl=en
    // https://www.google.com/maps/place/Googleplex/@37.4220041,-122.0833494,17z/data=!4m5!3m4!1s0x0:0x6c296c66619367e0!8m2!3d37.4219998!4d-122.0840572
    gmap_place: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
      type: "iframe",
      url: function url(rez) {
        return "//maps.google." + rez[2] + "/?ll=" + (rez[9] ? rez[9] + "&z=" + Math.floor(rez[10]) + (rez[12] ? rez[12].replace(/^\//, "&") : "") : rez[12] + "").replace(/\?/, "&") + "&output=" + (rez[12] && rez[12].indexOf("layer=c") > 0 ? "svembed" : "embed");
      }
    },
    // Examples:
    // https://www.google.com/maps/search/Empire+State+Building/
    // https://www.google.com/maps/search/?api=1&query=centurylink+field
    // https://www.google.com/maps/search/?api=1&query=47.5951518,-122.3316393
    gmap_search: {
      matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
      type: "iframe",
      url: function url(rez) {
        return "//maps.google." + rez[2] + "/maps?q=" + rez[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
      }
    }
  };
  $(document).on("objectNeedsType.fb", function (e, instance, item) {
    var url = item.src || "",
        type = false,
        media,
        thumb,
        rez,
        params,
        urlParams,
        paramObj,
        provider;
    media = $.extend(true, {}, defaults, item.opts.media); // Look for any matching media type

    $.each(media, function (providerName, providerOpts) {
      rez = url.match(providerOpts.matcher);

      if (!rez) {
        return;
      }

      type = providerOpts.type;
      provider = providerName;
      paramObj = {};

      if (providerOpts.paramPlace && rez[providerOpts.paramPlace]) {
        urlParams = rez[providerOpts.paramPlace];

        if (urlParams[0] == "?") {
          urlParams = urlParams.substring(1);
        }

        urlParams = urlParams.split("&");

        for (var m = 0; m < urlParams.length; ++m) {
          var p = urlParams[m].split("=", 2);

          if (p.length == 2) {
            paramObj[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }

      params = $.extend(true, {}, providerOpts.params, item.opts[providerName], paramObj);
      url = $.type(providerOpts.url) === "function" ? providerOpts.url.call(this, rez, params, item) : format(providerOpts.url, rez, params);
      thumb = $.type(providerOpts.thumb) === "function" ? providerOpts.thumb.call(this, rez, params, item) : format(providerOpts.thumb, rez);

      if (providerName === "youtube") {
        url = url.replace(/&t=((\d+)m)?(\d+)s/, function (match, p1, m, s) {
          return "&start=" + ((m ? parseInt(m, 10) * 60 : 0) + parseInt(s, 10));
        });
      } else if (providerName === "vimeo") {
        url = url.replace("&%23", "#");
      }

      return false;
    }); // If it is found, then change content type and update the url

    if (type) {
      if (!item.opts.thumb && !(item.opts.$thumb && item.opts.$thumb.length)) {
        item.opts.thumb = thumb;
      }

      if (type === "iframe") {
        item.opts = $.extend(true, item.opts, {
          iframe: {
            preload: false,
            attr: {
              scrolling: "no"
            }
          }
        });
      }

      $.extend(item, {
        type: type,
        src: url,
        origSrc: item.src,
        contentSource: provider,
        contentType: type === "image" ? "image" : provider == "gmap_place" || provider == "gmap_search" ? "map" : "video"
      });
    } else if (url) {
      item.type = item.opts.defaultType;
    }
  });
})(window.jQuery || jQuery); // ==========================================================================
//
// Guestures
// Adds touch guestures, handles click and tap events
//
// ==========================================================================


(function (window, document, $) {
  "use strict";

  var requestAFrame = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || // if all else fails, use setTimeout
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    };
  }();

  var cancelAFrame = function () {
    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || function (id) {
      window.clearTimeout(id);
    };
  }();

  var getPointerXY = function getPointerXY(e) {
    var result = [];
    e = e.originalEvent || e || window.e;
    e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [e];

    for (var key in e) {
      if (e[key].pageX) {
        result.push({
          x: e[key].pageX,
          y: e[key].pageY
        });
      } else if (e[key].clientX) {
        result.push({
          x: e[key].clientX,
          y: e[key].clientY
        });
      }
    }

    return result;
  };

  var distance = function distance(point2, point1, what) {
    if (!point1 || !point2) {
      return 0;
    }

    if (what === "x") {
      return point2.x - point1.x;
    } else if (what === "y") {
      return point2.y - point1.y;
    }

    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  };

  var isClickable = function isClickable($el) {
    if ($el.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || $.isFunction($el.get(0).onclick) || $el.data("selectable")) {
      return true;
    } // Check for attributes like data-fancybox-next or data-fancybox-close


    for (var i = 0, atts = $el[0].attributes, n = atts.length; i < n; i++) {
      if (atts[i].nodeName.substr(0, 14) === "data-fancybox-") {
        return true;
      }
    }

    return false;
  };

  var hasScrollbars = function hasScrollbars(el) {
    var overflowY = window.getComputedStyle(el)["overflow-y"],
        overflowX = window.getComputedStyle(el)["overflow-x"],
        vertical = (overflowY === "scroll" || overflowY === "auto") && el.scrollHeight > el.clientHeight,
        horizontal = (overflowX === "scroll" || overflowX === "auto") && el.scrollWidth > el.clientWidth;
    return vertical || horizontal;
  };

  var isScrollable = function isScrollable($el) {
    var rez = false;

    while (true) {
      rez = hasScrollbars($el.get(0));

      if (rez) {
        break;
      }

      $el = $el.parent();

      if (!$el.length || $el.hasClass("fancybox-stage") || $el.is("body")) {
        break;
      }
    }

    return rez;
  };

  var Guestures = function Guestures(instance) {
    var self = this;
    self.instance = instance;
    self.$bg = instance.$refs.bg;
    self.$stage = instance.$refs.stage;
    self.$container = instance.$refs.container;
    self.destroy();
    self.$container.on("touchstart.fb.touch mousedown.fb.touch", $.proxy(self, "ontouchstart"));
  };

  Guestures.prototype.destroy = function () {
    this.$container.off(".fb.touch");
  };

  Guestures.prototype.ontouchstart = function (e) {
    var self = this,
        $target = $(e.target),
        instance = self.instance,
        current = instance.current,
        $content = current.$content,
        isTouchDevice = e.type == "touchstart"; // Do not respond to both (touch and mouse) events

    if (isTouchDevice) {
      self.$container.off("mousedown.fb.touch");
    } // Ignore right click


    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    } // Ignore taping on links, buttons, input elements


    if (!$target.length || isClickable($target) || isClickable($target.parent())) {
      return;
    } // Ignore clicks on the scrollbar


    if (!$target.is("img") && e.originalEvent.clientX > $target[0].clientWidth + $target.offset().left) {
      return;
    } // Ignore clicks while zooming or closing


    if (!current || instance.isAnimating || instance.isClosing) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    self.realPoints = self.startPoints = getPointerXY(e);

    if (!self.startPoints.length) {
      return;
    }

    e.stopPropagation();
    self.startEvent = e;
    self.canTap = true;
    self.$target = $target;
    self.$content = $content;
    self.opts = current.opts.touch;
    self.isPanning = false;
    self.isSwiping = false;
    self.isZooming = false;
    self.isScrolling = false;
    self.startTime = new Date().getTime();
    self.distanceX = self.distanceY = self.distance = 0;
    self.canvasWidth = Math.round(current.$slide[0].clientWidth);
    self.canvasHeight = Math.round(current.$slide[0].clientHeight);
    self.contentLastPos = null;
    self.contentStartPos = $.fancybox.getTranslate(self.$content) || {
      top: 0,
      left: 0
    };
    self.sliderStartPos = self.sliderLastPos || $.fancybox.getTranslate(current.$slide); // Since position will be absolute, but we need to make it relative to the stage

    self.stagePos = $.fancybox.getTranslate(instance.$refs.stage);
    self.sliderStartPos.top -= self.stagePos.top;
    self.sliderStartPos.left -= self.stagePos.left;
    self.contentStartPos.top -= self.stagePos.top;
    self.contentStartPos.left -= self.stagePos.left;
    $(document).off(".fb.touch").on(isTouchDevice ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", $.proxy(self, "ontouchend")).on(isTouchDevice ? "touchmove.fb.touch" : "mousemove.fb.touch", $.proxy(self, "ontouchmove"));

    if ($.fancybox.isMobile) {
      document.addEventListener("scroll", self.onscroll, true);
    }

    if (!(self.opts || instance.canPan()) || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      if ($target.is(".fancybox-image")) {
        e.preventDefault();
      }

      return;
    }

    if (!($.fancybox.isMobile && (isScrollable($target) || isScrollable($target.parent())))) {
      e.preventDefault();
    }

    if (self.startPoints.length === 1 || current.hasError) {
      if (self.instance.canPan()) {
        $.fancybox.stop(self.$content);
        self.$content.css("transition-duration", "");
        self.isPanning = true;
      } else {
        self.isSwiping = true;
      }

      self.$container.addClass("fancybox-controls--isGrabbing");
    }

    if (self.startPoints.length === 2 && current.type === "image" && (current.isLoaded || current.$ghost)) {
      self.canTap = false;
      self.isSwiping = false;
      self.isPanning = false;
      self.isZooming = true;
      $.fancybox.stop(self.$content);
      self.$content.css("transition-duration", "");
      self.centerPointStartX = (self.startPoints[0].x + self.startPoints[1].x) * 0.5 - $(window).scrollLeft();
      self.centerPointStartY = (self.startPoints[0].y + self.startPoints[1].y) * 0.5 - $(window).scrollTop();
      self.percentageOfImageAtPinchPointX = (self.centerPointStartX - self.contentStartPos.left) / self.contentStartPos.width;
      self.percentageOfImageAtPinchPointY = (self.centerPointStartY - self.contentStartPos.top) / self.contentStartPos.height;
      self.startDistanceBetweenFingers = distance(self.startPoints[0], self.startPoints[1]);
    }
  };

  Guestures.prototype.onscroll = function (e) {
    var self = this;
    self.isScrolling = true;
    document.removeEventListener("scroll", self.onscroll, true);
  };

  Guestures.prototype.ontouchmove = function (e) {
    var self = this,
        $target = $(e.target); // Make sure user has not released over iframe or disabled element

    if (e.originalEvent.buttons !== undefined && e.originalEvent.buttons === 0) {
      self.ontouchend(e);
      return;
    }

    if (self.isScrolling || !($target.is(self.$stage) || self.$stage.find($target).length)) {
      self.canTap = false;
      return;
    }

    self.newPoints = getPointerXY(e);

    if (!(self.opts || self.instance.canPan()) || !self.newPoints.length || !self.newPoints.length) {
      return;
    }

    if (!(self.isSwiping && self.isSwiping === true)) {
      e.preventDefault();
    }

    self.distanceX = distance(self.newPoints[0], self.startPoints[0], "x");
    self.distanceY = distance(self.newPoints[0], self.startPoints[0], "y");
    self.distance = distance(self.newPoints[0], self.startPoints[0]); // Skip false ontouchmove events (Chrome)

    if (self.distance > 0) {
      if (self.isSwiping) {
        self.onSwipe(e);
      } else if (self.isPanning) {
        self.onPan();
      } else if (self.isZooming) {
        self.onZoom();
      }
    }
  };

  Guestures.prototype.onSwipe = function (e) {
    var self = this,
        swiping = self.isSwiping,
        left = self.sliderStartPos.left || 0,
        angle; // If direction is not yet determined

    if (swiping === true) {
      // We need at least 10px distance to correctly calculate an angle
      if (Math.abs(self.distance) > 10) {
        self.canTap = false;

        if (self.instance.group.length < 2 && self.opts.vertical) {
          self.isSwiping = "y";
        } else if (self.instance.isDragging || self.opts.vertical === false || self.opts.vertical === "auto" && $(window).width() > 800) {
          self.isSwiping = "x";
        } else {
          angle = Math.abs(Math.atan2(self.distanceY, self.distanceX) * 180 / Math.PI);
          self.isSwiping = angle > 45 && angle < 135 ? "y" : "x";
        }

        self.canTap = false;

        if (self.isSwiping === "y" && $.fancybox.isMobile && (isScrollable(self.$target) || isScrollable(self.$target.parent()))) {
          self.isScrolling = true;
          return;
        }

        self.instance.isDragging = self.isSwiping; // Reset points to avoid jumping, because we dropped first swipes to calculate the angle

        self.startPoints = self.newPoints;
        $.each(self.instance.slides, function (index, slide) {
          $.fancybox.stop(slide.$slide);
          slide.$slide.css("transition-duration", "");
          slide.inTransition = false;

          if (slide.pos === self.instance.current.pos) {
            self.sliderStartPos.left = $.fancybox.getTranslate(slide.$slide).left - $.fancybox.getTranslate(self.instance.$refs.stage).left;
          }
        }); // Stop slideshow

        if (self.instance.SlideShow && self.instance.SlideShow.isActive) {
          self.instance.SlideShow.stop();
        }
      }

      return;
    } // Sticky edges


    if (swiping == "x") {
      if (self.distanceX > 0 && (self.instance.group.length < 2 || self.instance.current.index === 0 && !self.instance.current.opts.loop)) {
        left = left + Math.pow(self.distanceX, 0.8);
      } else if (self.distanceX < 0 && (self.instance.group.length < 2 || self.instance.current.index === self.instance.group.length - 1 && !self.instance.current.opts.loop)) {
        left = left - Math.pow(-self.distanceX, 0.8);
      } else {
        left = left + self.distanceX;
      }
    }

    self.sliderLastPos = {
      top: swiping == "x" ? 0 : self.sliderStartPos.top + self.distanceY,
      left: left
    };

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.requestId = requestAFrame(function () {
      if (self.sliderLastPos) {
        $.each(self.instance.slides, function (index, slide) {
          var pos = slide.pos - self.instance.currPos;
          $.fancybox.setTranslate(slide.$slide, {
            top: self.sliderLastPos.top,
            left: self.sliderLastPos.left + pos * self.canvasWidth + pos * slide.opts.gutter
          });
        });
        self.$container.addClass("fancybox-is-sliding");
      }
    });
  };

  Guestures.prototype.onPan = function () {
    var self = this; // Prevent accidental movement (sometimes, when tapping casually, finger can move a bit)

    if (distance(self.newPoints[0], self.realPoints[0]) < ($.fancybox.isMobile ? 10 : 5)) {
      self.startPoints = self.newPoints;
      return;
    }

    self.canTap = false;
    self.contentLastPos = self.limitMovement();

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  }; // Make panning sticky to the edges


  Guestures.prototype.limitMovement = function () {
    var self = this;
    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;
    var distanceX = self.distanceX;
    var distanceY = self.distanceY;
    var contentStartPos = self.contentStartPos;
    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;
    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;
    var minTranslateX, minTranslateY, maxTranslateX, maxTranslateY, newOffsetX, newOffsetY;

    if (currentWidth > canvasWidth) {
      newOffsetX = currentOffsetX + distanceX;
    } else {
      newOffsetX = currentOffsetX;
    }

    newOffsetY = currentOffsetY + distanceY; // Slow down proportionally to traveled distance

    minTranslateX = Math.max(0, canvasWidth * 0.5 - currentWidth * 0.5);
    minTranslateY = Math.max(0, canvasHeight * 0.5 - currentHeight * 0.5);
    maxTranslateX = Math.min(canvasWidth - currentWidth, canvasWidth * 0.5 - currentWidth * 0.5);
    maxTranslateY = Math.min(canvasHeight - currentHeight, canvasHeight * 0.5 - currentHeight * 0.5); //   ->

    if (distanceX > 0 && newOffsetX > minTranslateX) {
      newOffsetX = minTranslateX - 1 + Math.pow(-minTranslateX + currentOffsetX + distanceX, 0.8) || 0;
    } //    <-


    if (distanceX < 0 && newOffsetX < maxTranslateX) {
      newOffsetX = maxTranslateX + 1 - Math.pow(maxTranslateX - currentOffsetX - distanceX, 0.8) || 0;
    } //   \/


    if (distanceY > 0 && newOffsetY > minTranslateY) {
      newOffsetY = minTranslateY - 1 + Math.pow(-minTranslateY + currentOffsetY + distanceY, 0.8) || 0;
    } //   /\


    if (distanceY < 0 && newOffsetY < maxTranslateY) {
      newOffsetY = maxTranslateY + 1 - Math.pow(maxTranslateY - currentOffsetY - distanceY, 0.8) || 0;
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.limitPosition = function (newOffsetX, newOffsetY, newWidth, newHeight) {
    var self = this;
    var canvasWidth = self.canvasWidth;
    var canvasHeight = self.canvasHeight;

    if (newWidth > canvasWidth) {
      newOffsetX = newOffsetX > 0 ? 0 : newOffsetX;
      newOffsetX = newOffsetX < canvasWidth - newWidth ? canvasWidth - newWidth : newOffsetX;
    } else {
      // Center horizontally
      newOffsetX = Math.max(0, canvasWidth / 2 - newWidth / 2);
    }

    if (newHeight > canvasHeight) {
      newOffsetY = newOffsetY > 0 ? 0 : newOffsetY;
      newOffsetY = newOffsetY < canvasHeight - newHeight ? canvasHeight - newHeight : newOffsetY;
    } else {
      // Center vertically
      newOffsetY = Math.max(0, canvasHeight / 2 - newHeight / 2);
    }

    return {
      top: newOffsetY,
      left: newOffsetX
    };
  };

  Guestures.prototype.onZoom = function () {
    var self = this; // Calculate current distance between points to get pinch ratio and new width and height

    var contentStartPos = self.contentStartPos;
    var currentWidth = contentStartPos.width;
    var currentHeight = contentStartPos.height;
    var currentOffsetX = contentStartPos.left;
    var currentOffsetY = contentStartPos.top;
    var endDistanceBetweenFingers = distance(self.newPoints[0], self.newPoints[1]);
    var pinchRatio = endDistanceBetweenFingers / self.startDistanceBetweenFingers;
    var newWidth = Math.floor(currentWidth * pinchRatio);
    var newHeight = Math.floor(currentHeight * pinchRatio); // This is the translation due to pinch-zooming

    var translateFromZoomingX = (currentWidth - newWidth) * self.percentageOfImageAtPinchPointX;
    var translateFromZoomingY = (currentHeight - newHeight) * self.percentageOfImageAtPinchPointY; // Point between the two touches

    var centerPointEndX = (self.newPoints[0].x + self.newPoints[1].x) / 2 - $(window).scrollLeft();
    var centerPointEndY = (self.newPoints[0].y + self.newPoints[1].y) / 2 - $(window).scrollTop(); // And this is the translation due to translation of the centerpoint
    // between the two fingers

    var translateFromTranslatingX = centerPointEndX - self.centerPointStartX;
    var translateFromTranslatingY = centerPointEndY - self.centerPointStartY; // The new offset is the old/current one plus the total translation

    var newOffsetX = currentOffsetX + (translateFromZoomingX + translateFromTranslatingX);
    var newOffsetY = currentOffsetY + (translateFromZoomingY + translateFromTranslatingY);
    var newPos = {
      top: newOffsetY,
      left: newOffsetX,
      scaleX: pinchRatio,
      scaleY: pinchRatio
    };
    self.canTap = false;
    self.newWidth = newWidth;
    self.newHeight = newHeight;
    self.contentLastPos = newPos;

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.requestId = requestAFrame(function () {
      $.fancybox.setTranslate(self.$content, self.contentLastPos);
    });
  };

  Guestures.prototype.ontouchend = function (e) {
    var self = this;
    var dMs = Math.max(new Date().getTime() - self.startTime, 1);
    var swiping = self.isSwiping;
    var panning = self.isPanning;
    var zooming = self.isZooming;
    var scrolling = self.isScrolling;
    self.endPoints = getPointerXY(e);
    self.$container.removeClass("fancybox-controls--isGrabbing");
    $(document).off(".fb.touch");
    document.removeEventListener("scroll", self.onscroll, true);

    if (self.requestId) {
      cancelAFrame(self.requestId);
      self.requestId = null;
    }

    self.isSwiping = false;
    self.isPanning = false;
    self.isZooming = false;
    self.isScrolling = false;
    self.instance.isDragging = false;

    if (self.canTap) {
      return self.onTap(e);
    }

    self.speed = 366; // Speed in px/ms

    self.velocityX = self.distanceX / dMs * 0.5;
    self.velocityY = self.distanceY / dMs * 0.5;
    self.speedX = Math.max(self.speed * 0.5, Math.min(self.speed * 1.5, 1 / Math.abs(self.velocityX) * self.speed));

    if (panning) {
      self.endPanning();
    } else if (zooming) {
      self.endZooming();
    } else {
      self.endSwiping(swiping, scrolling);
    }

    return;
  };

  Guestures.prototype.endSwiping = function (swiping, scrolling) {
    var self = this,
        ret = false,
        len = self.instance.group.length;
    self.sliderLastPos = null; // Close if swiped vertically / navigate if horizontally

    if (swiping == "y" && !scrolling && Math.abs(self.distanceY) > 50) {
      // Continue vertical movement
      $.fancybox.animate(self.instance.current.$slide, {
        top: self.sliderStartPos.top + self.distanceY + self.velocityY * 150,
        opacity: 0
      }, 200);
      ret = self.instance.close(true, 200);
    } else if (swiping == "x" && self.distanceX > 50 && len > 1) {
      ret = self.instance.previous(self.speedX);
    } else if (swiping == "x" && self.distanceX < -50 && len > 1) {
      ret = self.instance.next(self.speedX);
    }

    if (ret === false && (swiping == "x" || swiping == "y")) {
      if (scrolling || len < 2) {
        self.instance.centerSlide(self.instance.current, 150);
      } else {
        self.instance.jumpTo(self.instance.current.index);
      }
    }

    self.$container.removeClass("fancybox-is-sliding");
  }; // Limit panning from edges
  // ========================


  Guestures.prototype.endPanning = function () {
    var self = this;
    var newOffsetX, newOffsetY, newPos;

    if (!self.contentLastPos) {
      return;
    }

    if (self.opts.momentum === false) {
      newOffsetX = self.contentLastPos.left;
      newOffsetY = self.contentLastPos.top;
    } else {
      // Continue movement
      newOffsetX = self.contentLastPos.left + self.velocityX * self.speed;
      newOffsetY = self.contentLastPos.top + self.velocityY * self.speed;
    }

    newPos = self.limitPosition(newOffsetX, newOffsetY, self.contentStartPos.width, self.contentStartPos.height);
    newPos.width = self.contentStartPos.width;
    newPos.height = self.contentStartPos.height;
    $.fancybox.animate(self.$content, newPos, 330);
  };

  Guestures.prototype.endZooming = function () {
    var self = this;
    var current = self.instance.current;
    var newOffsetX, newOffsetY, newPos, reset;
    var newWidth = self.newWidth;
    var newHeight = self.newHeight;

    if (!self.contentLastPos) {
      return;
    }

    newOffsetX = self.contentLastPos.left;
    newOffsetY = self.contentLastPos.top;
    reset = {
      top: newOffsetY,
      left: newOffsetX,
      width: newWidth,
      height: newHeight,
      scaleX: 1,
      scaleY: 1
    }; // Reset scalex/scaleY values; this helps for perfomance and does not break animation

    $.fancybox.setTranslate(self.$content, reset);

    if (newWidth < self.canvasWidth && newHeight < self.canvasHeight) {
      self.instance.scaleToFit(150);
    } else if (newWidth > current.width || newHeight > current.height) {
      self.instance.scaleToActual(self.centerPointStartX, self.centerPointStartY, 150);
    } else {
      newPos = self.limitPosition(newOffsetX, newOffsetY, newWidth, newHeight); // Switch from scale() to width/height or animation will not work correctly

      $.fancybox.setTranslate(self.$content, $.fancybox.getTranslate(self.$content));
      $.fancybox.animate(self.$content, newPos, 150);
    }
  };

  Guestures.prototype.onTap = function (e) {
    var self = this;
    var $target = $(e.target);
    var instance = self.instance;
    var current = instance.current;
    var endPoints = e && getPointerXY(e) || self.startPoints;
    var tapX = endPoints[0] ? endPoints[0].x - $(window).scrollLeft() - self.stagePos.left : 0;
    var tapY = endPoints[0] ? endPoints[0].y - $(window).scrollTop() - self.stagePos.top : 0;
    var where;

    var process = function process(prefix) {
      var action = current.opts[prefix];

      if ($.isFunction(action)) {
        action = action.apply(instance, [current, e]);
      }

      if (!action) {
        return;
      }

      switch (action) {
        case "close":
          instance.close(self.startEvent);
          break;

        case "toggleControls":
          instance.toggleControls(true);
          break;

        case "next":
          instance.next();
          break;

        case "nextOrClose":
          if (instance.group.length > 1) {
            instance.next();
          } else {
            instance.close(self.startEvent);
          }

          break;

        case "zoom":
          if (current.type == "image" && (current.isLoaded || current.$ghost)) {
            if (instance.canPan()) {
              instance.scaleToFit();
            } else if (instance.isScaledDown()) {
              instance.scaleToActual(tapX, tapY);
            } else if (instance.group.length < 2) {
              instance.close(self.startEvent);
            }
          }

          break;
      }
    }; // Ignore right click


    if (e.originalEvent && e.originalEvent.button == 2) {
      return;
    } // Skip if clicked on the scrollbar


    if (!$target.is("img") && tapX > $target[0].clientWidth + $target.offset().left) {
      return;
    } // Check where is clicked


    if ($target.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) {
      where = "Outside";
    } else if ($target.is(".fancybox-slide")) {
      where = "Slide";
    } else if (instance.current.$content && instance.current.$content.find($target).addBack().filter($target).length) {
      where = "Content";
    } else {
      return;
    } // Check if this is a double tap


    if (self.tapped) {
      // Stop previously created single tap
      clearTimeout(self.tapped);
      self.tapped = null; // Skip if distance between taps is too big

      if (Math.abs(tapX - self.tapX) > 50 || Math.abs(tapY - self.tapY) > 50) {
        return this;
      } // OK, now we assume that this is a double-tap


      process("dblclick" + where);
    } else {
      // Single tap will be processed if user has not clicked second time within 300ms
      // or there is no need to wait for double-tap
      self.tapX = tapX;
      self.tapY = tapY;

      if (current.opts["dblclick" + where] && current.opts["dblclick" + where] !== current.opts["click" + where]) {
        self.tapped = setTimeout(function () {
          self.tapped = null;
          process("click" + where);
        }, 500);
      } else {
        process("click" + where);
      }
    }

    return this;
  };

  $(document).on("onActivate.fb", function (e, instance) {
    if (instance && !instance.Guestures) {
      instance.Guestures = new Guestures(instance);
    }
  });
})(window, document, window.jQuery || jQuery); // ==========================================================================
//
// SlideShow
// Enables slideshow functionality
//
// Example of usage:
// $.fancybox.getInstance().SlideShow.start()
//
// ==========================================================================


(function (document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M13,12 L27,20 L13,27 Z" />' + '<path d="M15,10 v19 M23,10 v19" />' + "</svg>" + "</button>"
    },
    slideShow: {
      autoStart: false,
      speed: 3000
    }
  });

  var SlideShow = function SlideShow(instance) {
    this.instance = instance;
    this.init();
  };

  $.extend(SlideShow.prototype, {
    timer: null,
    isActive: false,
    $button: null,
    init: function init() {
      var self = this;
      self.$button = self.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
        self.toggle();
      });

      if (self.instance.group.length < 2 || !self.instance.group[self.instance.currIndex].opts.slideShow) {
        self.$button.hide();
      }
    },
    set: function set(force) {
      var self = this; // Check if reached last element

      if (self.instance && self.instance.current && (force === true || self.instance.current.opts.loop || self.instance.currIndex < self.instance.group.length - 1)) {
        self.timer = setTimeout(function () {
          if (self.isActive) {
            self.instance.jumpTo((self.instance.currIndex + 1) % self.instance.group.length);
          }
        }, self.instance.current.opts.slideShow.speed);
      } else {
        self.stop();
        self.instance.idleSecondsCounter = 0;
        self.instance.showControls();
      }
    },
    clear: function clear() {
      var self = this;
      clearTimeout(self.timer);
      self.timer = null;
    },
    start: function start() {
      var self = this;
      var current = self.instance.current;

      if (current) {
        self.isActive = true;
        self.$button.attr("title", current.opts.i18n[current.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause");
        self.set(true);
      }
    },
    stop: function stop() {
      var self = this;
      var current = self.instance.current;
      self.clear();
      self.$button.attr("title", current.opts.i18n[current.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play");
      self.isActive = false;
    },
    toggle: function toggle() {
      var self = this;

      if (self.isActive) {
        self.stop();
      } else {
        self.start();
      }
    }
  });
  $(document).on({
    "onInit.fb": function onInitFb(e, instance) {
      if (instance && !instance.SlideShow) {
        instance.SlideShow = new SlideShow(instance);
      }
    },
    "beforeShow.fb": function beforeShowFb(e, instance, current, firstRun) {
      var SlideShow = instance && instance.SlideShow;

      if (firstRun) {
        if (SlideShow && current.opts.slideShow.autoStart) {
          SlideShow.start();
        }
      } else if (SlideShow && SlideShow.isActive) {
        SlideShow.clear();
      }
    },
    "afterShow.fb": function afterShowFb(e, instance, current) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow && SlideShow.isActive) {
        SlideShow.set();
      }
    },
    "afterKeydown.fb": function afterKeydownFb(e, instance, current, keypress, keycode) {
      var SlideShow = instance && instance.SlideShow; // "P" or Spacebar

      if (SlideShow && current.opts.slideShow && (keycode === 80 || keycode === 32) && !$(document.activeElement).is("button,a,input")) {
        keypress.preventDefault();
        SlideShow.toggle();
      }
    },
    "beforeClose.fb onDeactivate.fb": function beforeCloseFbOnDeactivateFb(e, instance) {
      var SlideShow = instance && instance.SlideShow;

      if (SlideShow) {
        SlideShow.stop();
      }
    }
  }); // Page Visibility API to pause slideshow when window is not active

  $(document).on("visibilitychange", function () {
    var instance = $.fancybox.getInstance();
    var SlideShow = instance && instance.SlideShow;

    if (SlideShow && SlideShow.isActive) {
      if (document.hidden) {
        SlideShow.clear();
      } else {
        SlideShow.set();
      }
    }
  });
})(document, window.jQuery || jQuery); // ==========================================================================
//
// FullScreen
// Adds fullscreen functionality
//
// ==========================================================================


(function (document, $) {
  "use strict"; // Collection of methods supported by user browser

  var fn = function () {
    var fnMap = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], // new WebKit
    ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], // old WebKit (Safari 5.1)
    ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]];
    var ret = {};

    for (var i = 0; i < fnMap.length; i++) {
      var val = fnMap[i];

      if (val && val[1] in document) {
        for (var j = 0; j < val.length; j++) {
          ret[fnMap[0][j]] = val[j];
        }

        return ret;
      }
    }

    return false;
  }(); // If browser does not have Full Screen API, then simply unset default button template and stop


  if (!fn) {
    if ($ && $.fancybox) {
      $.fancybox.defaults.btnTpl.fullScreen = false;
    }

    return;
  }

  var FullScreen = {
    request: function request(elem) {
      elem = elem || document.documentElement;
      elem[fn.requestFullscreen](elem.ALLOW_KEYBOARD_INPUT);
    },
    exit: function exit() {
      document[fn.exitFullscreen]();
    },
    toggle: function toggle(elem) {
      elem = elem || document.documentElement;

      if (this.isFullscreen()) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    isFullscreen: function isFullscreen() {
      return Boolean(document[fn.fullscreenElement]);
    },
    enabled: function enabled() {
      return Boolean(document[fn.fullscreenEnabled]);
    }
  };
  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M9,12 v16 h22 v-16 h-22 v8" />' + "</svg>" + "</button>"
    },
    fullScreen: {
      autoStart: false
    }
  });
  $(document).on({
    "onInit.fb": function onInitFb(e, instance) {
      var $container;

      if (instance && instance.group[instance.currIndex].opts.fullScreen) {
        $container = instance.$refs.container;
        $container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (e) {
          e.stopPropagation();
          e.preventDefault();
          FullScreen.toggle();
        });

        if (instance.opts.fullScreen && instance.opts.fullScreen.autoStart === true) {
          FullScreen.request();
        } // Expose API


        instance.FullScreen = FullScreen;
      } else if (instance) {
        instance.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      }
    },
    "afterKeydown.fb": function afterKeydownFb(e, instance, current, keypress, keycode) {
      // "F"
      if (instance && instance.FullScreen && keycode === 70) {
        keypress.preventDefault();
        instance.FullScreen.toggle();
      }
    },
    "beforeClose.fb": function beforeCloseFb(e, instance) {
      if (instance && instance.FullScreen && instance.$refs.container.hasClass("fancybox-is-fullscreen")) {
        FullScreen.exit();
      }
    }
  });
  $(document).on(fn.fullscreenchange, function () {
    var isFullscreen = FullScreen.isFullscreen(),
        instance = $.fancybox.getInstance();

    if (instance) {
      // If image is zooming, then force to stop and reposition properly
      if (instance.current && instance.current.type === "image" && instance.isAnimating) {
        instance.current.$content.css("transition", "none");
        instance.isAnimating = false;
        instance.update(true, true, 0);
      }

      instance.trigger("onFullscreenChange", isFullscreen);
      instance.$refs.container.toggleClass("fancybox-is-fullscreen", isFullscreen);
    }
  });
})(document, window.jQuery || jQuery); // ==========================================================================
//
// Thumbs
// Displays thumbnails in a grid
//
// ==========================================================================


(function (document, $) {
  "use strict";

  var CLASS = "fancybox-thumbs",
      CLASS_ACTIVE = CLASS + "-active",
      CLASS_LOAD = CLASS + "-loading"; // Make sure there are default values

  $.fancybox.defaults = $.extend(true, {
    btnTpl: {
      thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}">' + '<svg viewBox="0 0 120 120">' + '<path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" />' + "</svg>" + "</button>"
    },
    thumbs: {
      autoStart: false,
      // Display thumbnails on opening
      hideOnClose: true,
      // Hide thumbnail grid when closing animation starts
      parentEl: ".fancybox-container",
      // Container is injected into this element
      axis: "y" // Vertical (y) or horizontal (x) scrolling

    }
  }, $.fancybox.defaults);

  var FancyThumbs = function FancyThumbs(instance) {
    this.init(instance);
  };

  $.extend(FancyThumbs.prototype, {
    $button: null,
    $grid: null,
    $list: null,
    isVisible: false,
    isActive: false,
    init: function init(instance) {
      var self = this,
          first,
          second;
      self.instance = instance;
      instance.Thumbs = self;
      self.opts = instance.group[instance.currIndex].opts.thumbs; // Enable thumbs if at least two group items have thumbnails

      first = instance.group[0];
      first = first.opts.thumb || (first.opts.$thumb && first.opts.$thumb.length ? first.opts.$thumb.attr("src") : false);

      if (instance.group.length > 1) {
        second = instance.group[1];
        second = second.opts.thumb || (second.opts.$thumb && second.opts.$thumb.length ? second.opts.$thumb.attr("src") : false);
      }

      self.$button = instance.$refs.toolbar.find("[data-fancybox-thumbs]");

      if (self.opts && first && second && first && second) {
        self.$button.show().on("click", function () {
          self.toggle();
        });
        self.isActive = true;
      } else {
        self.$button.hide();
      }
    },
    create: function create() {
      var self = this,
          instance = self.instance,
          parentEl = self.opts.parentEl,
          list = [],
          src;

      if (!self.$grid) {
        // Create main element
        self.$grid = $('<div class="' + CLASS + " " + CLASS + "-" + self.opts.axis + '"></div>').appendTo(instance.$refs.container.find(parentEl).addBack().filter(parentEl)); // Add "click" event that performs gallery navigation

        self.$grid.on("click", "li", function () {
          instance.jumpTo($(this).attr("data-index"));
        });
      } // Build the list


      if (!self.$list) {
        self.$list = $("<ul>").appendTo(self.$grid);
      }

      $.each(instance.group, function (i, item) {
        src = item.opts.thumb || (item.opts.$thumb ? item.opts.$thumb.attr("src") : null);

        if (!src && item.type === "image") {
          src = item.src;
        }

        list.push('<li data-index="' + i + '" tabindex="0" class="' + CLASS_LOAD + '"' + (src && src.length ? ' style="background-image:url(' + src + ')" />' : "") + "></li>");
      });
      self.$list[0].innerHTML = list.join("");

      if (self.opts.axis === "x") {
        // Set fixed width for list element to enable horizontal scrolling
        self.$list.width(parseInt(self.$grid.css("padding-right"), 10) + instance.group.length * self.$list.children().eq(0).outerWidth(true));
      }
    },
    focus: function focus(duration) {
      var self = this,
          $list = self.$list,
          $grid = self.$grid,
          thumb,
          thumbPos;

      if (!self.instance.current) {
        return;
      }

      thumb = $list.children().removeClass(CLASS_ACTIVE).filter('[data-index="' + self.instance.current.index + '"]').addClass(CLASS_ACTIVE);
      thumbPos = thumb.position(); // Check if need to scroll to make current thumb visible

      if (self.opts.axis === "y" && (thumbPos.top < 0 || thumbPos.top > $list.height() - thumb.outerHeight())) {
        $list.stop().animate({
          scrollTop: $list.scrollTop() + thumbPos.top
        }, duration);
      } else if (self.opts.axis === "x" && (thumbPos.left < $grid.scrollLeft() || thumbPos.left > $grid.scrollLeft() + ($grid.width() - thumb.outerWidth()))) {
        $list.parent().stop().animate({
          scrollLeft: thumbPos.left
        }, duration);
      }
    },
    update: function update() {
      var that = this;
      that.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible);

      if (that.isVisible) {
        if (!that.$grid) {
          that.create();
        }

        that.instance.trigger("onThumbsShow");
        that.focus(0);
      } else if (that.$grid) {
        that.instance.trigger("onThumbsHide");
      } // Update content position


      that.instance.update();
    },
    hide: function hide() {
      this.isVisible = false;
      this.update();
    },
    show: function show() {
      this.isVisible = true;
      this.update();
    },
    toggle: function toggle() {
      this.isVisible = !this.isVisible;
      this.update();
    }
  });
  $(document).on({
    "onInit.fb": function onInitFb(e, instance) {
      var Thumbs;

      if (instance && !instance.Thumbs) {
        Thumbs = new FancyThumbs(instance);

        if (Thumbs.isActive && Thumbs.opts.autoStart === true) {
          Thumbs.show();
        }
      }
    },
    "beforeShow.fb": function beforeShowFb(e, instance, item, firstRun) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible) {
        Thumbs.focus(firstRun ? 0 : 250);
      }
    },
    "afterKeydown.fb": function afterKeydownFb(e, instance, current, keypress, keycode) {
      var Thumbs = instance && instance.Thumbs; // "G"

      if (Thumbs && Thumbs.isActive && keycode === 71) {
        keypress.preventDefault();
        Thumbs.toggle();
      }
    },
    "beforeClose.fb": function beforeCloseFb(e, instance) {
      var Thumbs = instance && instance.Thumbs;

      if (Thumbs && Thumbs.isVisible && Thumbs.opts.hideOnClose !== false) {
        Thumbs.$grid.hide();
      }
    }
  });
})(document, window.jQuery || jQuery); //// ==========================================================================
//
// Share
// Displays simple form for sharing current url
//
// ==========================================================================


(function (document, $) {
  "use strict";

  $.extend(true, $.fancybox.defaults, {
    btnTpl: {
      share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}">' + '<svg viewBox="0 0 40 40">' + '<path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z">' + "</svg>" + "</button>"
    },
    share: {
      url: function url(instance, item) {
        return (!instance.currentHash && !(item.type === "inline" || item.type === "html") ? item.origSrc || item.src : false) || window.location;
      },
      tpl: '<div class="fancybox-share">' + "<h1>{{SHARE}}</h1>" + "<p>" + '<a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg>' + "<span>Facebook</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg>' + "<span>Twitter</span>" + "</a>" + '<a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}">' + '<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg>' + "<span>Pinterest</span>" + "</a>" + "</p>" + '<p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p>' + "</div>"
    }
  });

  function escapeHtml(string) {
    var entityMap = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
      "/": "&#x2F;",
      "`": "&#x60;",
      "=": "&#x3D;"
    };
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
      return entityMap[s];
    });
  }

  $(document).on("click", "[data-fancybox-share]", function () {
    var instance = $.fancybox.getInstance(),
        current = instance.current || null,
        url,
        tpl;

    if (!current) {
      return;
    }

    if ($.type(current.opts.share.url) === "function") {
      url = current.opts.share.url.apply(current, [instance, current]);
    }

    tpl = current.opts.share.tpl.replace(/\{\{media\}\}/g, current.type === "image" ? encodeURIComponent(current.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(url)).replace(/\{\{url_raw\}\}/g, escapeHtml(url)).replace(/\{\{descr\}\}/g, instance.$caption ? encodeURIComponent(instance.$caption.text()) : "");
    $.fancybox.open({
      src: instance.translate(instance, tpl),
      type: "html",
      opts: {
        animationEffect: false,
        afterLoad: function afterLoad(shareInstance, shareCurrent) {
          // Close self if parent instance is closing
          instance.$refs.container.one("beforeClose.fb", function () {
            shareInstance.close(null, 0);
          }); // Opening links in a popup window

          shareCurrent.$content.find(".fancybox-share__links a").click(function () {
            window.open(this.href, "Share", "width=550, height=450");
            return false;
          });
        }
      }
    });
  });
})(document, window.jQuery || jQuery); // ==========================================================================
//
// Hash
// Enables linking to each modal
//
// ==========================================================================


(function (document, window, $) {
  "use strict"; // Simple $.escapeSelector polyfill (for jQuery prior v3)

  if (!$.escapeSelector) {
    $.escapeSelector = function (sel) {
      var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;

      var fcssescape = function fcssescape(ch, asCodePoint) {
        if (asCodePoint) {
          // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
          if (ch === "\0") {
            return "\uFFFD";
          } // Control characters and (dependent upon position) numbers get escaped as code points


          return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
        } // Other potentially-special ASCII characters get backslash-escaped


        return "\\" + ch;
      };

      return (sel + "").replace(rcssescape, fcssescape);
    };
  } // Get info about gallery name and current index from url


  function parseUrl() {
    var hash = window.location.hash.substr(1),
        rez = hash.split("-"),
        index = rez.length > 1 && /^\+?\d+$/.test(rez[rez.length - 1]) ? parseInt(rez.pop(-1), 10) || 1 : 1,
        gallery = rez.join("-");
    return {
      hash: hash,

      /* Index is starting from 1 */
      index: index < 1 ? 1 : index,
      gallery: gallery
    };
  } // Trigger click evnt on links to open new fancyBox instance


  function triggerFromUrl(url) {
    var $el;

    if (url.gallery !== "") {
      // If we can find element matching 'data-fancybox' atribute, then trigger click event for that.
      // It should start fancyBox
      $el = $("[data-fancybox='" + $.escapeSelector(url.gallery) + "']").eq(url.index - 1).trigger("click.fb-start");
    }
  } // Get gallery name from current instance


  function getGalleryID(instance) {
    var opts, ret;

    if (!instance) {
      return false;
    }

    opts = instance.current ? instance.current.opts : instance.opts;
    ret = opts.hash || (opts.$orig ? opts.$orig.data("fancybox") : "");
    return ret === "" ? false : ret;
  } // Start when DOM becomes ready


  $(function () {
    // Check if user has disabled this module
    if ($.fancybox.defaults.hash === false) {
      return;
    } // Update hash when opening/closing fancyBox


    $(document).on({
      "onInit.fb": function onInitFb(e, instance) {
        var url, gallery;

        if (instance.group[instance.currIndex].opts.hash === false) {
          return;
        }

        url = parseUrl();
        gallery = getGalleryID(instance); // Make sure gallery start index matches index from hash

        if (gallery && url.gallery && gallery == url.gallery) {
          instance.currIndex = url.index - 1;
        }
      },
      "beforeShow.fb": function beforeShowFb(e, instance, current, firstRun) {
        var gallery;

        if (!current || current.opts.hash === false) {
          return;
        } // Check if need to update window hash


        gallery = getGalleryID(instance);

        if (!gallery) {
          return;
        } // Variable containing last hash value set by fancyBox
        // It will be used to determine if fancyBox needs to close after hash change is detected


        instance.currentHash = gallery + (instance.group.length > 1 ? "-" + (current.index + 1) : ""); // If current hash is the same (this instance most likely is opened by hashchange), then do nothing

        if (window.location.hash === "#" + instance.currentHash) {
          return;
        }

        if (!instance.origHash) {
          instance.origHash = window.location.hash;
        }

        if (instance.hashTimer) {
          clearTimeout(instance.hashTimer);
        } // Update hash


        instance.hashTimer = setTimeout(function () {
          if ("replaceState" in window.history) {
            window.history[firstRun ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + "#" + instance.currentHash);

            if (firstRun) {
              instance.hasCreatedHistory = true;
            }
          } else {
            window.location.hash = instance.currentHash;
          }

          instance.hashTimer = null;
        }, 300);
      },
      "beforeClose.fb": function beforeCloseFb(e, instance, current) {
        var gallery;

        if (current.opts.hash === false) {
          return;
        }

        gallery = getGalleryID(instance); // Goto previous history entry

        if (instance.currentHash && instance.hasCreatedHistory) {
          window.history.back();
        } else if (instance.currentHash) {
          if ("replaceState" in window.history) {
            window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (instance.origHash || ""));
          } else {
            window.location.hash = instance.origHash;
          }
        }

        instance.currentHash = null;
        clearTimeout(instance.hashTimer);
      }
    }); // Check if need to start/close after url has changed

    $(window).on("hashchange.fb", function () {
      var url = parseUrl(),
          fb; // Find last fancyBox instance that has "hash"

      $.each($(".fancybox-container").get().reverse(), function (index, value) {
        var tmp = $(value).data("FancyBox"); //isClosing

        if (tmp.currentHash) {
          fb = tmp;
          return false;
        }
      });

      if (fb) {
        // Now, compare hash values
        if (fb.currentHash && fb.currentHash !== url.gallery + "-" + url.index && !(url.index === 1 && fb.currentHash == url.gallery)) {
          fb.currentHash = null;
          fb.close();
        }
      } else if (url.gallery !== "") {
        triggerFromUrl(url);
      }
    }); // Check current hash and trigger click event on matching element to start fancyBox, if needed

    setTimeout(function () {
      if (!$.fancybox.getInstance()) {
        triggerFromUrl(parseUrl());
      }
    }, 50);
  });
})(document, window, window.jQuery || jQuery); // ==========================================================================
//
// Wheel
// Basic mouse weheel support for gallery navigation
//
// ==========================================================================


(function (document, $) {
  "use strict";

  var prevTime = new Date().getTime();
  $(document).on({
    "onInit.fb": function onInitFb(e, instance, current) {
      instance.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (e) {
        var current = instance.current,
            currTime = new Date().getTime();

        if (instance.group.length < 2 || current.opts.wheel === false || current.opts.wheel === "auto" && current.type !== "image") {
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (current.$slide.hasClass("fancybox-animated")) {
          return;
        }

        e = e.originalEvent || e;

        if (currTime - prevTime < 250) {
          return;
        }

        prevTime = currTime;
        instance[(-e.deltaY || -e.deltaX || e.wheelDelta || -e.detail) < 0 ? "next" : "previous"]();
      });
    }
  });
})(document, window.jQuery || jQuery);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * ScrollMagic v2.0.5 (2015-04-29)
 * The javascript library for magical scroll interactions.
 * (c) 2015 Jan Paepke (@janpaepke)
 * Project Website: http://scrollmagic.io
 * 
 * @version 2.0.5
 * @license Dual licensed under MIT license and GPL.
 * @author Jan Paepke - e-mail@janpaepke.de
 *
 * @file ScrollMagic jQuery plugin.
 *
 * requires: jQuery ~1.11 or ~2.1
 */

/**
 * This plugin is meant to be used in conjunction with jQuery.  
 * It enables ScrollMagic to make use of jQuery's advanced selector engine (sizzle) for all elements supplied to ScrollMagic objects, like scroll containers or trigger elements.  
 * ScrollMagic also accepts jQuery elements for all methods that expect references to DOM elements. Please note, that in most cases the first element of the matched set will be used.
 * 
 * Additionally it provides the ScrollMagic object within the jQuery namespace, so it can be accessed using `$.ScrollMagic`.
 *
 * In contrast to most other plugins it does not offer new API additions for ScrollMagic.
 *
 * To have access to this extension, please include `plugins/jquery.ScrollMagic.js`.
 * @example
 * // create a new scene making use of jQuery's advanced selector engine
 * var scene = new $.ScrollMagic.Scene({
 *   triggerElement: "#parent div.trigger[attr='thisone']:not(.notthisone)"
 * });
 * @requires {@link http://jquery.com/|jQuery ~1.11 or ~2.1}
 * @mixin framework.jQuery
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ScrollMagic', 'jquery'], factory);
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    // CommonJS
    factory(require('scrollmagic'), require('jquery'));
  } else {
    // Browser global
    factory(root.ScrollMagic, root.jQuery);
  }
})(void 0, function (ScrollMagic, $) {
  "use strict";

  var NAMESPACE = "jquery.ScrollMagic";
  var console = window.console || {},
      err = Function.prototype.bind.call(console.error || console.log || function () {}, console);

  if (!ScrollMagic) {
    err("(" + NAMESPACE + ") -> ERROR: The ScrollMagic main module could not be found. Please make sure it's loaded before this plugin or use an asynchronous loader like requirejs.");
  }

  if (!$) {
    err("(" + NAMESPACE + ") -> ERROR: jQuery could not be found. Please make sure it's loaded before ScrollMagic or use an asynchronous loader like requirejs.");
  }

  ScrollMagic._util.get.elements = function (selector) {
    return $(selector).toArray();
  };

  ScrollMagic._util.addClass = function (elem, classname) {
    $(elem).addClass(classname);
  };

  ScrollMagic._util.removeClass = function (elem, classname) {
    $(elem).removeClass(classname);
  };

  $.ScrollMagic = ScrollMagic;
});
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * VERSION: 0.1.12
 * DATE: 2018-02-15
 * UPDATES AND DOCS AT: http://greensock.com/jquery-gsap-plugin/
 *
 * Requires TweenLite version 1.8.0 or higher and CSSPlugin.
 *
 * @license Copyright (c) 2013-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 */
!function (a) {
  "use strict";

  var b,
      c,
      d,
      e = a.fn.animate,
      f = a.fn.stop,
      g = !0,
      h = function h(a) {
    var b,
        c = {};

    for (b in a) {
      c[b] = a[b];
    }

    return c;
  },
      i = {
    overwrite: 1,
    delay: 1,
    useFrames: 1,
    runBackwards: 1,
    easeParams: 1,
    yoyo: 1,
    immediateRender: 1,
    repeat: 1,
    repeatDelay: 1,
    autoCSS: 1
  },
      j = ",scrollTop,scrollLeft,show,hide,toggle,",
      k = j,
      l = function l(a, b) {
    for (var c in i) {
      i[c] && void 0 !== a[c] && (b[c] = a[c]);
    }
  },
      m = function m(a) {
    return function (b) {
      return a.getRatio(b);
    };
  },
      n = {},
      _o = function o() {
    var e,
        f,
        g,
        h = window.GreenSockGlobals || window;
    if (b = h.TweenMax || h.TweenLite, b && (e = (b.version + ".0.0").split("."), f = !(Number(e[0]) > 0 && Number(e[1]) > 7), h = h.com.greensock, c = h.plugins.CSSPlugin, n = h.easing.Ease.map || {}), !b || !c || f) return b = null, void (!d && window.console && (window.console.log("The jquery.gsap.js plugin requires the TweenMax (or at least TweenLite and CSSPlugin) JavaScript file(s)." + (f ? " Version " + e.join(".") + " is too old." : "")), d = !0));

    if (a.easing) {
      for (g in n) {
        a.easing[g] = m(n[g]);
      }

      _o = !1;
    }
  };

  a.fn.animate = function (d, f, i, j) {
    if (d = d || {}, _o && (_o(), !b || !c)) return e.call(this, d, f, i, j);
    if (!g || d.skipGSAP === !0 || "object" == _typeof(f) && "function" == typeof f.step) return e.call(this, d, f, i, j);
    var m,
        p,
        q,
        r,
        s = a.speed(f, i, j),
        t = {
      ease: n[s.easing] || (s.easing === !1 ? n.linear : n.swing)
    },
        u = this,
        v = "object" == _typeof(f) ? f.specialEasing : null;

    for (p in d) {
      if (m = d[p], m instanceof Array && n[m[1]] && (v = v || {}, v[p] = m[1], m = m[0]), "show" === m || "hide" === m || "toggle" === m || -1 !== k.indexOf(p) && -1 !== k.indexOf("," + p + ",")) return e.call(this, d, f, i, j);
      t[-1 === p.indexOf("-") ? p : a.camelCase(p)] = m;
    }

    if (v) {
      t = h(t), r = [];

      for (p in v) {
        m = r[r.length] = {}, l(t, m), m.ease = n[v[p]] || t.ease, -1 !== p.indexOf("-") && (p = a.camelCase(p)), m[p] = t[p], delete t[p];
      }

      0 === r.length && (r = null);
    }

    return q = function q(c) {
      var d,
          e = h(t);
      if (r) for (d = r.length; --d > -1;) {
        b.to(this, a.fx.off ? 0 : s.duration / 1e3, r[d]);
      }
      e.onComplete = function () {
        c ? c() : s.old && a(this).each(s.old);
      }, b.to(this, a.fx.off ? 0 : s.duration / 1e3, e);
    }, s.queue !== !1 ? (u.queue(s.queue, q), "function" == typeof s.old && a(u[u.length - 1]).queue(s.queue, function (a) {
      s.old.call(u), a();
    })) : q.call(u), u;
  }, a.fn.stop = function (a, c) {
    if (f.call(this, a, c), b) {
      if (c) for (var d, e = b.getTweensOf(this), g = e.length; --g > -1;) {
        d = e[g].totalTime() / e[g].totalDuration(), d > 0 && 1 > d && e[g].seek(e[g].totalDuration());
      }
      b.killTweensOf(this);
    }

    return this;
  }, a.gsap = {
    enabled: function enabled(a) {
      g = a;
    },
    version: "0.1.12",
    legacyProps: function legacyProps(a) {
      k = j + a + ",";
    }
  };
}(jQuery);
"use strict";

/* Lettering.JS 0.6.1 by Dave Rupert  - http://daverupert.com */
(function ($) {
  function injector(t, splitter, klass, after) {
    var a = t.text().split(splitter),
        inject = '';

    if (a.length) {
      $(a).each(function (i, item) {
        inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
      });
      t.empty().append(inject);
    }
  }

  var methods = {
    init: function init() {
      return this.each(function () {
        injector($(this), '', 'char', '');
      });
    },
    words: function words() {
      return this.each(function () {
        injector($(this), ' ', 'word', ' ');
      });
    },
    lines: function lines() {
      return this.each(function () {
        var r = "eefec303079ad17405c889e092e105b0";
        injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
      });
    }
  };

  $.fn.lettering = function (method) {
    if (method && methods[method]) {
      return methods[method].apply(this, [].slice.call(arguments, 1));
    } else if (method === 'letters' || !method) {
      return methods.init.apply(this, [].slice.call(arguments, 0));
    }

    $.error('Method ' + method + ' does not exist on jQuery.lettering');
    return this;
  };
})(jQuery);
"use strict";

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */
(function ($) {
  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function init() {
        // JavaScript to be fired on all pages
        //
        // Declare javascript, basically
        var doc = document.documentElement;
        doc.className = doc.className.replace('no-js', 'has-js');
        doc.setAttribute('data-useragent', navigator.userAgent);
        doc.setAttribute('data-platform', navigator.platform); //
        ///////////////
        // FUNCTIONS //
        ///////////////
        // Change MENU to EXIT

        function changeLetters(btn) {
          var m = $('.toggle__menu span.m'),
              e = $('.toggle__menu span.e'),
              n = $('.toggle__menu span.n'),
              u = $('.toggle__menu span.u');
          e.toggleClass('toggle__close');

          if (btn.hasClass('open')) {
            m.text('E');
            n.text('I');
            u.text('T');
          } else {
            m.text('M');
            n.text('N');
            u.text('U');
          }
        } // END FUNCTIONS
        //////////////////
        // START JQUERY //
        //////////////////
        // Multilevel links
        //				$('.multilevel-link').on('click touchstart', function() {
        //					$(this).next('ul').animate({
        //						width : 'toggle'
        //					}, 200);
        //				});
        // find wordpress galleries


        var wpGallery = document.querySelector('.entry__content .gallery'); // add .get-faded class

        $(wpGallery).addClass('get-faded'); // Slide nav menu up and down
        // Initial scroll position

        var scrollState = 0; // Store navbar classes

        var navClasses = document.getElementById('masthead').classList; // returns current scroll position

        var scrollTop = function scrollTop() {
          return window.scrollY;
        }; // Primary scroll event function


        var scrollDetect = function scrollDetect(home, down, up) {
          // Current scroll position
          var currentScroll = scrollTop();

          if (scrollTop() === 0) {
            home();
          } else if (currentScroll > scrollState) {
            down();
          } else {
            up();
          } // Set previous scroll position


          scrollState = scrollTop();
        };

        function homeAction() {
          console.log('home');
        }

        function downAction() {
          navClasses.remove('slide--down');
          navClasses.add('slide--up');
        }

        function upAction() {
          navClasses.remove('slide--up');
          navClasses.add('slide--down');
        }

        window.addEventListener('scroll', function () {
          scrollDetect(homeAction, downAction, upAction);
        }); // Add or remove scrolling navbar classes

        $(window).scroll(function () {
          if ($(document).scrollTop() > 50) {
            $('nav').addClass('transparent');
          } else {
            $('nav').removeClass('transparent');
          }
        }); // click to smoothscroll

        $('a[href^="#"]').on('click', function (e) {
          e.preventDefault();
          $('html,body').animate({
            scrollTop: $(this.hash).offset().top
          }, 1500);
        }); // add scrolling class to contact

        $('a[href^="#contact"]').on('click', function () {
          $('#contact').addClass('said-hi');
          $('#mobile_menu').removeClass('is-visible');
        }); // Fancybox

        $('[data-fancybox], .fancybox, .gallery-item a').fancybox({
          // Enable infinite gallery navigation
          loop: true,
          // What buttons should appear in the top right corner.
          // Buttons will be created using templates from `btnTpl` option
          // and they will be placed into toolbar (class="fancybox-toolbar"` element)
          buttons: ['zoom', 'share', //'slideShow',
          'fullScreen', //'download',
          'thumbs', 'close'],
          // Open/close animation type
          // Possible values:
          //   false            - disable
          //   "zoom"           - zoom images from/to thumbnail
          //   "fade"
          //   "zoom-in-out"
          animationEffect: 'zoom',
          // Duration in ms for open/close animation
          animationDuration: 200,
          // Transition effect between slides
          //
          // Possible values:
          //   false            - disable
          //   'fade'
          //   'slide'
          //   'circular'
          //   'tube'
          //   'zoom-in-out'
          //   'rotate'
          //
          transitionEffect: 'slide',
          // Duration in ms for transition animation
          transitionDuration: 400,
          // Customize or add new media types
          // Example:

          /*
          	media : {
          		youtube : {
          			params : {
          				autoplay : 0
          			}
          		}
          	}
          */
          media: {},
          thumbs: {
            autoStart: true // Display thumbnails on opening

          }
        }); // END JQUERY
        /////////////////////
        // BEGIN GREENSOCK //
        /////////////////////
        // Init ScrollMagic

        var controller = new ScrollMagic.Controller({
          globalSceneOptions: {
            triggerHook: 0.8
          } //					addIndicators : true

        }); // Viewport in log

        var viewportWidth = window.innerWidth,
            viewportHeight = window.innerHeight;
        console.log('Current viewport: ' + viewportWidth + 'w × ' + viewportHeight + 'h'); // Mobile menu

        var mobileToggle = $('#menu_toggle'),
            navbar = $('#masthead'),
            mobileMenu = $('#desktop_menu'),
            desktopMenu = $('#primary_nav'),
            menuItems = $('#desktop_menu').children(),
            menuDuration = 0.3,
            menuBetween = 0.05,
            mobileTimeline = new TimelineMax({
          paused: true,
          delay: 1
        }),
            desktopTimeline = new TimelineMax(),
            $this = $(this);

        if (viewportWidth < 601) {
          mobileTimeline.to(navbar, menuDuration, {
            height: '100%',
            opacity: 1,
            ease: Power2.easeOut
          }, 0).to(mobileMenu, menuDuration, {
            top: 0,
            autoAlpha: 1,
            ease: Power2.easeOut
          }, 0).staggerFrom(menuItems, menuDuration, {
            y: 20,
            opacity: 0,
            ease: Back.easeOut
          }, menuBetween);
          navbar.on('click', '#menu_toggle', function () {
            if (mobileTimeline.time() > 0) {
              mobileTimeline.reverse();
            } else {
              mobileTimeline.play(0);
            } // change MENU to EXIT


            mobileToggle.toggleClass('open');
            changeLetters(mobileToggle); // Add padding to navbar area

            $('#page').toggleClass('padded'); // Move filters down on Featured Work page
            //						if (window.matchMedia("(min-width: 600px)").matches) {

            if (typeof mixitup == 'function') {
              $('.gallery__filter').toggleClass('with-sticky');
            } //						}

          });
        } else {
          desktopTimeline.to(desktopMenu, menuDuration, {
            y: -100
          }, 0);
          navbar.on('click', '#menu_toggle', function () {
            if (desktopTimeline.time() > 0) {
              desktopTimeline.reverse();
            } else {
              desktopTimeline.play(0);
            }

            mobileToggle.toggleClass('open'); // change MENU to EXIT

            changeLetters(mobileToggle); // Invert logo color

            $('#logo').toggleClass('inverted'); // Add padding to navbar area

            $('#page').toggleClass('padded');
          });
        } // END GREENSOCK
        ///////////////////////
        // BEGIN SCROLLMAGIC //
        ///////////////////////
        // Parallax images


        $('.parallax').each(function () {
          var parallaxParent = this,
              parallaxChild = $(this).children('.parallax__image');

          if (viewportWidth >= 840) {
            var tweenParallax = new TimelineMax().to(parallaxChild, 1, {
              y: '80%',
              ease: Linear.easeNone
            });
            var parallaxScene = new ScrollMagic.Scene({
              triggerElement: parallaxParent,
              duration: '200%'
            }).setTween(tweenParallax).setClassToggle(this, 'parallax--scrolling').addTo(controller);
          }
        }); // Fade in content blocks

        $('.get-faded').each(function () {
          var fadeParent = this,
              fadeChild = $(this).children(),
              fadeDuration = 0.3,
              fadeBetween = 0.3;
          var tweenFade = new TimelineMax().staggerTo(fadeChild, fadeDuration, {
            y: 0,
            autoAlpha: 1
          }, fadeBetween);
          var fadeScene = new ScrollMagic.Scene({
            triggerElement: fadeParent,
            triggerHook: 1,
            reverse: false
          }).setTween(tweenFade).setClassToggle(fadeChild, 'got-faded').addTo(controller);
        }); //				$('.type-post').each(function() {
        //					var $this = $(this),
        //						$contentParent  = this,
        //						$content = $this.children('.post__content');
        //					console.log($content)
        //					var expandContent = new TimelineMax()
        //						.to($content, 1, {
        //							width : '200%'
        //						})
        //					
        //					var expandContentScene = new ScrollMagic.Scene({
        //						triggerElement : $content,
        //						triggerHook    : 1,
        //						reverse        : false
        //					})
        //						.setTween(expandContent)
        //						.addTo(controller);
        //				});
        // END SCROLLMAGIC
        ////////////////
        // BEGIN APIS //
        ////////////////
        // load google fonts with webfont loader

        WebFontConfig = {
          google: {
            families: ['Barlow Semi Condensed:400,700', 'Barlow:400,700', 'Abril Fatface']
          },
          timeout: 2000
        };

        (function (d) {
          var wf = d.createElement('script'),
              s = d.scripts[0];
          wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
          wf.async = true;
          s.parentNode.insertBefore(wf, s);
        })(document); // END APIS

      },
      finalize: function finalize() {// JavaScript to be fired on all pages, after page specific JS is fired
      }
    },
    // Home page
    'home': {
      init: function init() {
        // JavaScript to be fired on the home page
        var title = $('#home_title'),
            line = title.children();
        line.each(function () {
          var $this = $(this),
              chars = $this.lettering('words'),
              words = chars.children('span');
          var titleTimeline = new TimelineMax(),
              titleChar = words,
              titleDuration = 1;
          titleTimeline.staggerFromTo(titleChar, titleDuration, {
            opacity: 0,
            y: 80
          }, {
            opacity: 1,
            y: 0
          }, 0.15);
          titleTimeline.staggerTo('.line', 1, {
            width: 100
          });
        }); // Dribbble galleries
        // Set the Access Token

        var accessToken = '49a19ad15272251972056008d1f46e1be28cca04264a5ddf535cb735a2bf2ac6',
            numberOfShots = '6'; // Call Dribble v2 API

        $.ajax({
          url: 'https://api.dribbble.com/v2/user/shots?per_page=' + numberOfShots + '&access_token=' + accessToken,
          dataType: 'json',
          type: 'GET',
          success: function success(data) {
            if (data.length > 0) {
              $.each(data.reverse(), function (i, val) {
                $('#dribbbles').prepend('<figure id="shot_' + val.id + '" class="shot"><img src="' + val.images.teaser + '" alt="' + val.title + '" srcset="' + val.images.normal + ' 400w, ' + val.images.hidpi + ' 800w" class="shot__image" /><figcaption class="shot--hover">' + val.title + '<span class="shot__description">' + val.description + '</span><a class="shot__link" href="' + val.html_url + '" target="_blank" title="' + val.title + '"></a></figcaption></figure>');
              });
            } else {
              $('#dribbbles').append('<code>Error loading shots. Try <a href="javascript:history.go(0);">reloading</a> the page?</code>');
            }
          }
        });
      },
      finalize: function finalize() {
        // JavaScript to be fired on the home page, after the init JS
        // Links are stripped out of wysiwyg editor, manually add them in
        var link_to_mighty = $('#title_1').children('.word3'),
            link_to_work = $('#title_2').children('.word4');
        link_to_mighty.wrapInner('<a href="//mightyinthemidwest.com/"></a>');
        link_to_work.wrapInner('<a href="/design/"></a>');
      }
    },
    // About us page, note the change from about-us to about_us.
    // 'about_us' : {
    // init : function () {
    // JavaScript to be fired on the about us page
    // }
    // },
    // Featured Projects
    'design': {
      init: function init() {
        // JavaScript to be fired on the featured projects page
        // Mixitup.js
        // https://github.com/patrickkunka/mixitup/tree/v2
        var containerEl = document.querySelector('#gallery');
        var mixer = mixitup(containerEl, {
          //					animation : {
          //						effectsIn  : 'fade',
          //						effectsOut : 'fade',
          //						easing     : 'linear'
          //					},
          controls: {
            toggleLogic: 'and'
          }
        });
      }
    }
  }; // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event

  var UTIL = {
    fire: function fire(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = funcname === undefined ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function loadEvents() {
      // Fire common init JS
      UTIL.fire('common'); // Fire page-specific init JS, and then finalize JS

      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function (i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      }); // Fire common finalize JS

      UTIL.fire('common', 'finalize');
    }
  }; // Load Events

  $(document).ready(UTIL.loadEvents);
})(jQuery); // Fully reference jQuery after this point.
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**!
 * MixItUp v3.2.2
 * A high-performance, dependency-free library for animated filtering, sorting and more
 * Build 20a1a182-d7bd-4c8f-807d-b888e325e44d
 *
 * @copyright Copyright 2014-2017 KunkaLabs Limited.
 * @author    KunkaLabs Limited.
 * @link      https://www.kunkalabs.com/mixitup/
 *
 * @license   Commercial use requires a commercial license.
 *            https://www.kunkalabs.com/mixitup/licenses/
 *
 *            Non-commercial use permitted under same terms as CC BY-NC 3.0 license.
 *            http://creativecommons.org/licenses/by-nc/3.0/
 */
(function (window) {
  'use strict';

  var _mixitup = null,
      h = null;

  (function () {
    var VENDORS = ['webkit', 'moz', 'o', 'ms'],
        canary = window.document.createElement('div'),
        i = -1; // window.requestAnimationFrame

    for (i = 0; i < VENDORS.length && !window.requestAnimationFrame; i++) {
      window.requestAnimationFrame = window[VENDORS[i] + 'RequestAnimationFrame'];
    } // Element.nextElementSibling


    if (typeof canary.nextElementSibling === 'undefined') {
      Object.defineProperty(window.Element.prototype, 'nextElementSibling', {
        get: function get() {
          var el = this.nextSibling;

          while (el) {
            if (el.nodeType === 1) {
              return el;
            }

            el = el.nextSibling;
          }

          return null;
        }
      });
    } // Element.matches


    (function (ElementPrototype) {
      ElementPrototype.matches = ElementPrototype.matches || ElementPrototype.machesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || ElementPrototype.webkitMatchesSelector || function (selector) {
        return Array.prototype.indexOf.call(this.parentElement.querySelectorAll(selector), this) > -1;
      };
    })(window.Element.prototype); // Object.keys
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys


    if (!Object.keys) {
      Object.keys = function () {
        var hasOwnProperty = Object.prototype.hasOwnProperty,
            hasDontEnumBug = false,
            dontEnums = [],
            dontEnumsLength = -1;
        hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable('toString');
        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
        dontEnumsLength = dontEnums.length;
        return function (obj) {
          var result = [],
              prop = '',
              i = -1;

          if (_typeof(obj) !== 'object' && (typeof obj !== 'function' || obj === null)) {
            throw new TypeError('Object.keys called on non-object');
          }

          for (prop in obj) {
            if (hasOwnProperty.call(obj, prop)) {
              result.push(prop);
            }
          }

          if (hasDontEnumBug) {
            for (i = 0; i < dontEnumsLength; i++) {
              if (hasOwnProperty.call(obj, dontEnums[i])) {
                result.push(dontEnums[i]);
              }
            }
          }

          return result;
        };
      }();
    } // Array.isArray
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray


    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
      };
    } // Object.create
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create


    if (typeof Object.create !== 'function') {
      Object.create = function (undefined) {
        var Temp = function Temp() {};

        return function (prototype, propertiesObject) {
          if (prototype !== Object(prototype) && prototype !== null) {
            throw TypeError('Argument must be an object, or null');
          }

          Temp.prototype = prototype || {};
          var result = new Temp();
          Temp.prototype = null;

          if (propertiesObject !== undefined) {
            Object.defineProperties(result, propertiesObject);
          }

          if (prototype === null) {
            /* jshint ignore:start */
            result.__proto__ = null;
            /* jshint ignore:end */
          }

          return result;
        };
      }();
    } // String.prototyoe.trim


    if (!String.prototype.trim) {
      String.prototype.trim = function () {
        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
    } // Array.prototype.indexOf
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf


    if (!Array.prototype.indexOf) {
      Array.prototype.indexOf = function (searchElement) {
        var n, k, t, len;

        if (this === null) {
          throw new TypeError();
        }

        t = Object(this);
        len = t.length >>> 0;

        if (len === 0) {
          return -1;
        }

        n = 0;

        if (arguments.length > 1) {
          n = Number(arguments[1]);

          if (n !== n) {
            n = 0;
          } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
          }
        }

        if (n >= len) {
          return -1;
        }

        for (k = n >= 0 ? n : Math.max(len - Math.abs(n), 0); k < len; k++) {
          if (k in t && t[k] === searchElement) {
            return k;
          }
        }

        return -1;
      };
    } // Function.prototype.bind
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind


    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        var aArgs, self, FNOP, fBound;

        if (typeof this !== 'function') {
          throw new TypeError();
        }

        aArgs = Array.prototype.slice.call(arguments, 1);
        self = this;

        FNOP = function FNOP() {};

        fBound = function fBound() {
          return self.apply(this instanceof FNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        if (this.prototype) {
          FNOP.prototype = this.prototype;
        }

        fBound.prototype = new FNOP();
        return fBound;
      };
    } // Element.prototype.dispatchEvent


    if (!window.Element.prototype.dispatchEvent) {
      window.Element.prototype.dispatchEvent = function (event) {
        try {
          return this.fireEvent('on' + event.type, event);
        } catch (err) {}
      };
    }
  })();
  /**
   * The `mixitup()` "factory" function creates and returns individual instances
   * of MixItUp, known as "mixers", on which API methods can be called.
   *
   * When loading MixItUp via a script tag, the factory function is accessed
   * via the global variable `mixitup`. When using a module loading
   * system (e.g. ES2015, CommonJS, RequireJS), the factory function is
   * exported into your module when you require the MixItUp library.
   *
   * @example
   * mixitup(container [,config] [,foreignDoc])
   *
   * @example <caption>Example 1: Creating a mixer instance with an element reference</caption>
   * var containerEl = document.querySelector('.container');
   *
   * var mixer = mixitup(containerEl);
   *
   * @example <caption>Example 2: Creating a mixer instance with a selector string</caption>
   * var mixer = mixitup('.container');
   *
   * @example <caption>Example 3: Passing a configuration object</caption>
   * var mixer = mixitup(containerEl, {
   *     animation: {
   *         effects: 'fade scale(0.5)'
   *     }
   * });
   *
   * @example <caption>Example 4: Passing an iframe reference</caption>
   * var mixer = mixitup(containerEl, config, foreignDocument);
   *
   * @global
   * @namespace
   * @public
   * @kind        function
   * @since       3.0.0
   * @param       {(Element|string)}  container
   *      A DOM element or selector string representing the container(s) on which to instantiate MixItUp.
   * @param       {object}            [config]
   *      An optional "configuration object" used to customize the behavior of the MixItUp instance.
   * @param       {object}            [foreignDoc]
   *      An optional reference to a `document`, which can be used to control a MixItUp instance in an iframe.
   * @return      {mixitup.Mixer}
   *      A "mixer" object holding the MixItUp instance.
   */


  _mixitup = function mixitup(container, config, foreignDoc) {
    var el = null,
        returnCollection = false,
        instance = null,
        facade = null,
        doc = null,
        output = null,
        instances = [],
        id = '',
        elements = [],
        i = -1;
    doc = foreignDoc || window.document;

    if (returnCollection = arguments[3]) {
      // A non-documented 4th paramater enabling control of multiple instances
      returnCollection = typeof returnCollection === 'boolean';
    }

    if (typeof container === 'string') {
      elements = doc.querySelectorAll(container);
    } else if (container && _typeof(container) === 'object' && h.isElement(container, doc)) {
      elements = [container];
    } else if (container && _typeof(container) === 'object' && container.length) {
      // Although not documented, the container may also be an array-like list of
      // elements such as a NodeList or jQuery collection, is returnCollection is true
      elements = container;
    } else {
      throw new Error(_mixitup.messages.errorFactoryInvalidContainer());
    }

    if (elements.length < 1) {
      throw new Error(_mixitup.messages.errorFactoryContainerNotFound());
    }

    for (i = 0; el = elements[i]; i++) {
      if (i > 0 && !returnCollection) break;

      if (!el.id) {
        id = 'MixItUp' + h.randomHex();
        el.id = id;
      } else {
        id = el.id;
      }

      if (_mixitup.instances[id] instanceof _mixitup.Mixer) {
        instance = _mixitup.instances[id];

        if (!config || config && config.debug && config.debug.showWarnings !== false) {
          console.warn(_mixitup.messages.warningFactoryPreexistingInstance());
        }
      } else {
        instance = new _mixitup.Mixer();
        instance.attach(el, doc, id, config);
        _mixitup.instances[id] = instance;
      }

      facade = new _mixitup.Facade(instance);

      if (config && config.debug && config.debug.enable) {
        instances.push(instance);
      } else {
        instances.push(facade);
      }
    }

    if (returnCollection) {
      output = new _mixitup.Collection(instances);
    } else {
      // Return the first instance regardless
      output = instances[0];
    }

    return output;
  };
  /**
   * The `.use()` static method is used to extend the functionality of mixitup with compatible
   * extensions and libraries in an environment with modular scoping e.g. ES2015, CommonJS, or RequireJS.
   *
   * You need only call the `.use()` function once per project, per extension, as module loaders
   * will cache a single reference to MixItUp inclusive of all changes made.
   *
   * @example
   * mixitup.use(extension)
   *
   * @example <caption>Example 1: Extending MixItUp with the Pagination Extension</caption>
   *
   * import mixitup from 'mixitup';
   * import mixitupPagination from 'mixitup-pagination';
   *
   * mixitup.use(mixitupPagination);
   *
   * // All mixers created by the factory function in all modules will now
   * // have pagination functionality
   *
   * var mixer = mixitup('.container');
   *
   * @public
   * @name     use
   * @memberof mixitup
   * @kind     function
   * @static
   * @since    3.0.0
   * @param    {*}  extension   A reference to the extension or library to be used.
   * @return   {void}
   */


  _mixitup.use = function (extension) {
    _mixitup.Base.prototype.callActions.call(_mixitup, 'beforeUse', arguments); // Call the extension's factory function, passing
    // the mixitup factory as a paramater


    if (typeof extension === 'function' && extension.TYPE === 'mixitup-extension') {
      // Mixitup extension
      if (typeof _mixitup.extensions[extension.NAME] === 'undefined') {
        extension(_mixitup);
        _mixitup.extensions[extension.NAME] = extension;
      }
    } else if (extension.fn && extension.fn.jquery) {
      // jQuery
      _mixitup.libraries.$ = extension;
    }

    _mixitup.Base.prototype.callActions.call(_mixitup, 'afterUse', arguments);
  };

  _mixitup.instances = {};
  _mixitup.extensions = {};
  _mixitup.libraries = {};
  /**
   * @private
   */

  h = {
    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        cls
     * @return  {boolean}
     */
    hasClass: function hasClass(el, cls) {
      return !!el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        cls
     * @return  {void}
     */
    addClass: function addClass(el, cls) {
      if (!this.hasClass(el, cls)) el.className += el.className ? ' ' + cls : cls;
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        cls
     * @return  {void}
     */
    removeClass: function removeClass(el, cls) {
      if (this.hasClass(el, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        el.className = el.className.replace(reg, ' ').trim();
      }
    },

    /**
     * Merges the properties of the source object onto the
     * target object. Alters the target object.
     *
     * @private
     * @param   {object}    destination
     * @param   {object}    source
     * @param   {boolean}   [deep=false]
     * @param   {boolean}   [handleErrors=false]
     * @return  {void}
     */
    extend: function extend(destination, source, deep, handleErrors) {
      var sourceKeys = [],
          key = '',
          i = -1;
      deep = deep || false;
      handleErrors = handleErrors || false;

      try {
        if (Array.isArray(source)) {
          for (i = 0; i < source.length; i++) {
            sourceKeys.push(i);
          }
        } else if (source) {
          sourceKeys = Object.keys(source);
        }

        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];

          if (!deep || _typeof(source[key]) !== 'object' || this.isElement(source[key])) {
            // All non-object properties, or all properties if shallow extend
            destination[key] = source[key];
          } else if (Array.isArray(source[key])) {
            // Arrays
            if (!destination[key]) {
              destination[key] = [];
            }

            this.extend(destination[key], source[key], deep, handleErrors);
          } else {
            // Objects
            if (!destination[key]) {
              destination[key] = {};
            }

            this.extend(destination[key], source[key], deep, handleErrors);
          }
        }
      } catch (err) {
        if (handleErrors) {
          this.handleExtendError(err, destination);
        } else {
          throw err;
        }
      }

      return destination;
    },

    /**
     * @private
     * @param   {Error}  err
     * @param   {object} destination
     * @return  {void}
     */
    handleExtendError: function handleExtendError(err, destination) {
      var re = /property "?(\w*)"?[,:] object/i,
          matches = null,
          erroneous = '',
          message = '',
          suggestion = '',
          probableMatch = '',
          key = '',
          mostMatchingChars = -1,
          i = -1;

      if (err instanceof TypeError && (matches = re.exec(err.message))) {
        erroneous = matches[1];

        for (key in destination) {
          i = 0;

          while (i < erroneous.length && erroneous.charAt(i) === key.charAt(i)) {
            i++;
          }

          if (i > mostMatchingChars) {
            mostMatchingChars = i;
            probableMatch = key;
          }
        }

        if (mostMatchingChars > 1) {
          suggestion = _mixitup.messages.errorConfigInvalidPropertySuggestion({
            probableMatch: probableMatch
          });
        }

        message = _mixitup.messages.errorConfigInvalidProperty({
          erroneous: erroneous,
          suggestion: suggestion
        });
        throw new TypeError(message);
      }

      throw err;
    },

    /**
     * @private
     * @param   {string} str
     * @return  {function}
     */
    template: function template(str) {
      var re = /\${([\w]*)}/g,
          dynamics = {},
          matches = null;

      while (matches = re.exec(str)) {
        dynamics[matches[1]] = new RegExp('\\${' + matches[1] + '}', 'g');
      }

      return function (data) {
        var key = '',
            output = str;
        data = data || {};

        for (key in dynamics) {
          output = output.replace(dynamics[key], typeof data[key] !== 'undefined' ? data[key] : '');
        }

        return output;
      };
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        type
     * @param   {function}      fn
     * @param   {boolean}       useCapture
     * @return  {void}
     */
    on: function on(el, type, fn, useCapture) {
      if (!el) return;

      if (el.addEventListener) {
        el.addEventListener(type, fn, useCapture);
      } else if (el.attachEvent) {
        el['e' + type + fn] = fn;

        el[type + fn] = function () {
          el['e' + type + fn](window.event);
        };

        el.attachEvent('on' + type, el[type + fn]);
      }
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        type
     * @param   {function}      fn
     * @return  {void}
     */
    off: function off(el, type, fn) {
      if (!el) return;

      if (el.removeEventListener) {
        el.removeEventListener(type, fn, false);
      } else if (el.detachEvent) {
        el.detachEvent('on' + type, el[type + fn]);
        el[type + fn] = null;
      }
    },

    /**
     * @private
     * @param   {string}      eventType
     * @param   {object}      detail
     * @param   {Document}    [doc]
     * @return  {CustomEvent}
     */
    getCustomEvent: function getCustomEvent(eventType, detail, doc) {
      var event = null;
      doc = doc || window.document;

      if (typeof window.CustomEvent === 'function') {
        event = new window.CustomEvent(eventType, {
          detail: detail,
          bubbles: true,
          cancelable: true
        });
      } else if (typeof doc.createEvent === 'function') {
        event = doc.createEvent('CustomEvent');
        event.initCustomEvent(eventType, true, true, detail);
      } else {
        event = doc.createEventObject(), event.type = eventType;
        event.returnValue = false;
        event.cancelBubble = false;
        event.detail = detail;
      }

      return event;
    },

    /**
     * @private
     * @param   {Event} e
     * @return  {Event}
     */
    getOriginalEvent: function getOriginalEvent(e) {
      if (e.touches && e.touches.length) {
        return e.touches[0];
      } else if (e.changedTouches && e.changedTouches.length) {
        return e.changedTouches[0];
      } else {
        return e;
      }
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        selector
     * @return  {Number}
     */
    index: function index(el, selector) {
      var i = 0;

      while ((el = el.previousElementSibling) !== null) {
        if (!selector || el.matches(selector)) {
          ++i;
        }
      }

      return i;
    },

    /**
     * Converts a dash or snake-case string to camel case.
     *
     * @private
     * @param   {string}    str
     * @param   {boolean}   [isPascal]
     * @return  {string}
     */
    camelCase: function camelCase(str) {
      return str.toLowerCase().replace(/([_-][a-z])/g, function ($1) {
        return $1.toUpperCase().replace(/[_-]/, '');
      });
    },

    /**
     * Converts a dash or snake-case string to pascal case.
     *
     * @private
     * @param   {string}    str
     * @param   {boolean}   [isPascal]
     * @return  {string}
     */
    pascalCase: function pascalCase(str) {
      return (str = this.camelCase(str)).charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Converts a camel or pascal-case string to dash case.
     *
     * @private
     * @param   {string}    str
     * @return  {string}
     */
    dashCase: function dashCase(str) {
      return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
    },

    /**
     * @private
     * @param   {HTMLElement}       el
     * @param   {HTMLHtmlElement}   [doc]
     * @return  {boolean}
     */
    isElement: function isElement(el, doc) {
      doc = doc || window.document;

      if (window.HTMLElement && el instanceof window.HTMLElement) {
        return true;
      } else if (doc.defaultView && doc.defaultView.HTMLElement && el instanceof doc.defaultView.HTMLElement) {
        return true;
      } else {
        return el !== null && el.nodeType === 1 && typeof el.nodeName === 'string';
      }
    },

    /**
     * @private
     * @param   {string}            htmlString
     * @param   {HTMLHtmlElement}   [doc]
     * @return  {DocumentFragment}
     */
    createElement: function createElement(htmlString, doc) {
      var frag = null,
          temp = null;
      doc = doc || window.document;
      frag = doc.createDocumentFragment();
      temp = doc.createElement('div');
      temp.innerHTML = htmlString.trim();

      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }

      return frag;
    },

    /**
     * @private
     * @param   {Node} node
     * @return  {void}
     */
    removeWhitespace: function removeWhitespace(node) {
      var deleting;

      while (node && node.nodeName === '#text') {
        deleting = node;
        node = node.previousSibling;
        deleting.parentElement && deleting.parentElement.removeChild(deleting);
      }
    },

    /**
     * @private
     * @param   {Array<*>}  a
     * @param   {Array<*>}  b
     * @return  {boolean}
     */
    isEqualArray: function isEqualArray(a, b) {
      var i = a.length;
      if (i !== b.length) return false;

      while (i--) {
        if (a[i] !== b[i]) return false;
      }

      return true;
    },

    /**
     * @private
     * @param   {object}  a
     * @param   {object}  b
     * @return  {boolean}
     */
    deepEquals: function deepEquals(a, b) {
      var key;

      if (_typeof(a) === 'object' && a && _typeof(b) === 'object' && b) {
        if (Object.keys(a).length !== Object.keys(b).length) return false;

        for (key in a) {
          if (!b.hasOwnProperty(key) || !this.deepEquals(a[key], b[key])) return false;
        }
      } else if (a !== b) {
        return false;
      }

      return true;
    },

    /**
     * @private
     * @param   {Array<*>}  oldArray
     * @return  {Array<*>}
     */
    arrayShuffle: function arrayShuffle(oldArray) {
      var newArray = oldArray.slice(),
          len = newArray.length,
          i = len,
          p = -1,
          t = [];

      while (i--) {
        p = ~~(Math.random() * len);
        t = newArray[i];
        newArray[i] = newArray[p];
        newArray[p] = t;
      }

      return newArray;
    },

    /**
     * @private
     * @param   {object}    list
     */
    arrayFromList: function arrayFromList(list) {
      var output, i;

      try {
        return Array.prototype.slice.call(list);
      } catch (err) {
        output = [];

        for (i = 0; i < list.length; i++) {
          output.push(list[i]);
        }

        return output;
      }
    },

    /**
     * @private
     * @param   {function}  func
     * @param   {Number}    wait
     * @param   {boolean}   immediate
     * @return  {function}
     */
    debounce: function debounce(func, wait, immediate) {
      var timeout;
      return function () {
        var self = this,
            args = arguments,
            callNow = immediate && !timeout,
            later = null;

        later = function later() {
          timeout = null;

          if (!immediate) {
            func.apply(self, args);
          }
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(self, args);
      };
    },

    /**
     * @private
     * @param   {HTMLElement}   element
     * @return  {object}
     */
    position: function position(element) {
      var xPosition = 0,
          yPosition = 0,
          offsetParent = element;

      while (element) {
        xPosition -= element.scrollLeft;
        yPosition -= element.scrollTop;

        if (element === offsetParent) {
          xPosition += element.offsetLeft;
          yPosition += element.offsetTop;
          offsetParent = element.offsetParent;
        }

        element = element.parentElement;
      }

      return {
        x: xPosition,
        y: yPosition
      };
    },

    /**
     * @private
     * @param   {object}    node1
     * @param   {object}    node2
     * @return  {Number}
     */
    getHypotenuse: function getHypotenuse(node1, node2) {
      var distanceX = node1.x - node2.x,
          distanceY = node1.y - node2.y;
      distanceX = distanceX < 0 ? distanceX * -1 : distanceX, distanceY = distanceY < 0 ? distanceY * -1 : distanceY;
      return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    },

    /**
     * Calcuates the area of intersection between two rectangles and expresses it as
     * a ratio in comparison to the area of the first rectangle.
     *
     * @private
     * @param   {Rect}  box1
     * @param   {Rect}  box2
     * @return  {number}
     */
    getIntersectionRatio: function getIntersectionRatio(box1, box2) {
      var controlArea = box1.width * box1.height,
          intersectionX = -1,
          intersectionY = -1,
          intersectionArea = -1,
          ratio = -1;
      intersectionX = Math.max(0, Math.min(box1.left + box1.width, box2.left + box2.width) - Math.max(box1.left, box2.left));
      intersectionY = Math.max(0, Math.min(box1.top + box1.height, box2.top + box2.height) - Math.max(box1.top, box2.top));
      intersectionArea = intersectionY * intersectionX;
      ratio = intersectionArea / controlArea;
      return ratio;
    },

    /**
     * @private
     * @param   {object}            el
     * @param   {string}            selector
     * @param   {boolean}           [includeSelf]
     * @param   {HTMLHtmlElement}   [doc]
     * @return  {Element|null}
     */
    closestParent: function closestParent(el, selector, includeSelf, doc) {
      var parent = el.parentNode;
      doc = doc || window.document;

      if (includeSelf && el.matches(selector)) {
        return el;
      }

      while (parent && parent != doc.body) {
        if (parent.matches && parent.matches(selector)) {
          return parent;
        } else if (parent.parentNode) {
          parent = parent.parentNode;
        } else {
          return null;
        }
      }

      return null;
    },

    /**
     * @private
     * @param   {HTMLElement}       el
     * @param   {string}            selector
     * @param   {HTMLHtmlElement}   [doc]
     * @return  {NodeList}
     */
    children: function children(el, selector, doc) {
      var children = [],
          tempId = '';
      doc = doc || window.doc;

      if (el) {
        if (!el.id) {
          tempId = 'Temp' + this.randomHexKey();
          el.id = tempId;
        }

        children = doc.querySelectorAll('#' + el.id + ' > ' + selector);

        if (tempId) {
          el.removeAttribute('id');
        }
      }

      return children;
    },

    /**
     * Creates a clone of a provided array, with any empty strings removed.
     *
     * @private
     * @param   {Array<*>} originalArray
     * @return  {Array<*>}
     */
    clean: function clean(originalArray) {
      var cleanArray = [],
          i = -1;

      for (i = 0; i < originalArray.length; i++) {
        if (originalArray[i] !== '') {
          cleanArray.push(originalArray[i]);
        }
      }

      return cleanArray;
    },

    /**
     * Abstracts an ES6 promise into a q-like deferred interface for storage and deferred resolution.
     *
     * @private
     * @param  {object} libraries
     * @return {h.Deferred}
     */
    defer: function defer(libraries) {
      var deferred = null,
          promiseWrapper = null,
          $ = null;
      promiseWrapper = new this.Deferred();

      if (_mixitup.features.has.promises) {
        // ES6 native promise or polyfill
        promiseWrapper.promise = new Promise(function (resolve, reject) {
          promiseWrapper.resolve = resolve;
          promiseWrapper.reject = reject;
        });
      } else if (($ = window.jQuery || libraries.$) && typeof $.Deferred === 'function') {
        // jQuery
        deferred = $.Deferred();
        promiseWrapper.promise = deferred.promise();
        promiseWrapper.resolve = deferred.resolve;
        promiseWrapper.reject = deferred.reject;
      } else if (window.console) {
        // No implementation
        console.warn(_mixitup.messages.warningNoPromiseImplementation());
      }

      return promiseWrapper;
    },

    /**
     * @private
     * @param   {Array<Promise>}    tasks
     * @param   {object}            libraries
     * @return  {Promise<Array>}
     */
    all: function all(tasks, libraries) {
      var $ = null;

      if (_mixitup.features.has.promises) {
        return Promise.all(tasks);
      } else if (($ = window.jQuery || libraries.$) && typeof $.when === 'function') {
        return $.when.apply($, tasks).done(function () {
          // jQuery when returns spread arguments rather than an array or resolutions
          return arguments;
        });
      } // No implementation


      if (window.console) {
        console.warn(_mixitup.messages.warningNoPromiseImplementation());
      }

      return [];
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @param   {string}        property
     * @param   {Array<string>} vendors
     * @return  {string}
     */
    getPrefix: function getPrefix(el, property, vendors) {
      var i = -1,
          prefix = '';
      if (h.dashCase(property) in el.style) return '';

      for (i = 0; prefix = vendors[i]; i++) {
        if (prefix + property in el.style) {
          return prefix.toLowerCase();
        }
      }

      return 'unsupported';
    },

    /**
     * @private
     * @return  {string}
     */
    randomHex: function randomHex() {
      return ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6).toUpperCase();
    },

    /**
     * @private
     * @param   {HTMLDocument}  [doc]
     * @return  {object}
     */
    getDocumentState: function getDocumentState(doc) {
      doc = _typeof(doc.body) === 'object' ? doc : window.document;
      return {
        scrollTop: window.pageYOffset,
        scrollLeft: window.pageXOffset,
        docHeight: doc.documentElement.scrollHeight,
        docWidth: doc.documentElement.scrollWidth,
        viewportHeight: doc.documentElement.clientHeight,
        viewportWidth: doc.documentElement.clientWidth
      };
    },

    /**
     * @private
     * @param   {object}    obj
     * @param   {function}  fn
     * @return  {function}
     */
    bind: function bind(obj, fn) {
      return function () {
        return fn.apply(obj, arguments);
      };
    },

    /**
     * @private
     * @param   {HTMLElement}   el
     * @return  {boolean}
     */
    isVisible: function isVisible(el) {
      var styles = null;
      if (el.offsetParent) return true;
      styles = window.getComputedStyle(el);

      if (styles.position === 'fixed' && styles.visibility !== 'hidden' && styles.opacity !== '0') {
        // Fixed elements report no offsetParent,
        // but may still be invisible
        return true;
      }

      return false;
    },

    /**
     * @private
     * @param   {object}    obj
     */
    seal: function seal(obj) {
      if (typeof Object.seal === 'function') {
        Object.seal(obj);
      }
    },

    /**
     * @private
     * @param   {object}    obj
     */
    freeze: function freeze(obj) {
      if (typeof Object.freeze === 'function') {
        Object.freeze(obj);
      }
    },

    /**
     * @private
     * @param   {string}    control
     * @param   {string}    specimen
     * @return  {boolean}
     */
    compareVersions: function compareVersions(control, specimen) {
      var controlParts = control.split('.'),
          specimenParts = specimen.split('.'),
          controlPart = -1,
          specimenPart = -1,
          i = -1;

      for (i = 0; i < controlParts.length; i++) {
        controlPart = parseInt(controlParts[i].replace(/[^\d.]/g, ''));
        specimenPart = parseInt(specimenParts[i].replace(/[^\d.]/g, '') || 0);

        if (specimenPart < controlPart) {
          return false;
        } else if (specimenPart > controlPart) {
          return true;
        }
      }

      return true;
    },

    /**
     * @private
     * @constructor
     */
    Deferred: function Deferred() {
      this.promise = null;
      this.resolve = null;
      this.reject = null;
      this.id = h.randomHex();
    },

    /**
     * @private
     * @param   {object}  obj
     * @return  {boolean}
     */
    isEmptyObject: function isEmptyObject(obj) {
      var key = '';

      if (typeof Object.keys === 'function') {
        return Object.keys(obj).length === 0;
      }

      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }

      return true;
    },

    /**
     * @param   {mixitup.Config.ClassNames}   classNames
     * @param   {string}                      elementName
     * @param   {string}                      [modifier]
     * @return  {string}
     */
    getClassname: function getClassname(classNames, elementName, modifier) {
      var classname = '';
      classname += classNames.block;

      if (classname.length) {
        classname += classNames.delineatorElement;
      }

      classname += classNames['element' + this.pascalCase(elementName)];
      if (!modifier) return classname;

      if (classname.length) {
        classname += classNames.delineatorModifier;
      }

      classname += modifier;
      return classname;
    },

    /**
     * Returns the value of a property on a given object via its string key.
     *
     * @param   {object}    obj
     * @param   {string}    stringKey
     * @return  {*} value
     */
    getProperty: function getProperty(obj, stringKey) {
      var parts = stringKey.split('.'),
          returnCurrent = null,
          current = '',
          i = 0;

      if (!stringKey) {
        return obj;
      }

      returnCurrent = function returnCurrent(obj) {
        if (!obj) {
          return null;
        } else {
          return obj[current];
        }
      };

      while (i < parts.length) {
        current = parts[i];
        obj = returnCurrent(obj);
        i++;
      }

      if (typeof obj !== 'undefined') {
        return obj;
      } else {
        return null;
      }
    }
  };
  _mixitup.h = h;
  /**
   * The Base class adds instance methods to all other extensible MixItUp classes,
   * enabling the calling of any registered hooks.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.Base = function () {};

  _mixitup.Base.prototype = {
    constructor: _mixitup.Base,

    /**
     * Calls any registered hooks for the provided action.
     *
     * @memberof    mixitup.Base
     * @private
     * @instance
     * @since       2.0.0
     * @param       {string}    actionName
     * @param       {Array<*>}  args
     * @return      {void}
     */
    callActions: function callActions(actionName, args) {
      var self = this,
          hooks = self.constructor.actions[actionName],
          extensionName = '';
      if (!hooks || h.isEmptyObject(hooks)) return;

      for (extensionName in hooks) {
        hooks[extensionName].apply(self, args);
      }
    },

    /**
     * Calls any registered hooks for the provided filter.
     *
     * @memberof    mixitup.Base
     * @private
     * @instance
     * @since       2.0.0
     * @param       {string}    filterName
     * @param       {*}         input
     * @param       {Array<*>}  args
     * @return      {*}
     */
    callFilters: function callFilters(filterName, input, args) {
      var self = this,
          hooks = self.constructor.filters[filterName],
          output = input,
          extensionName = '';
      if (!hooks || h.isEmptyObject(hooks)) return output;
      args = args || [];

      for (extensionName in hooks) {
        args = h.arrayFromList(args);
        args.unshift(output);
        output = hooks[extensionName].apply(self, args);
      }

      return output;
    }
  };
  /**
   * The BaseStatic class holds a set of static methods which are then added to all other
   * extensible MixItUp classes as a means of integrating extensions via the addition of new
   * methods and/or actions and hooks.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.BaseStatic = function () {
    this.actions = {};
    this.filters = {};
    /**
     * Performs a shallow extend on the class's prototype, adding one or more new members to
     * the class in a single operation.
     *
     * @memberof    mixitup.BaseStatic
     * @public
     * @static
     * @since       2.1.0
     * @param       {object} extension
     * @return      {void}
     */

    this.extend = function (extension) {
      h.extend(this.prototype, extension);
    };
    /**
     * Registers a function to be called on the action hook of the provided name.
     *
     * @memberof    mixitup.BaseStatic
     * @public
     * @static
     * @since       2.1.0
     * @param       {string}    hookName
     * @param       {string}    extensionName
     * @param       {function}  func
     * @return      {void}
     */


    this.registerAction = function (hookName, extensionName, func) {
      (this.actions[hookName] = this.actions[hookName] || {})[extensionName] = func;
    };
    /**
     * Registers a function to be called on the filter of the provided name.
     *
     * @memberof    mixitup.BaseStatic
     * @public
     * @static
     * @since       2.1.0
     * @param       {string}    hookName
     * @param       {string}    extensionName
     * @param       {function}  func
     * @return      {void}
     */


    this.registerFilter = function (hookName, extensionName, func) {
      (this.filters[hookName] = this.filters[hookName] || {})[extensionName] = func;
    };
  };
  /**
   * The `mixitup.Features` class performs all feature and CSS prefix detection
   * neccessary for MixItUp to function correctly, as well as storing various
   * string and array constants. All feature decection is on evaluation of the
   * library and stored in a singleton instance for use by other internal classes.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */


  _mixitup.Features = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.boxSizingPrefix = '';
    this.transformPrefix = '';
    this.transitionPrefix = '';
    this.boxSizingPrefix = '';
    this.transformProp = '';
    this.transformRule = '';
    this.transitionProp = '';
    this.perspectiveProp = '';
    this.perspectiveOriginProp = '';
    this.has = new _mixitup.Has();
    this.canary = null;
    this.BOX_SIZING_PROP = 'boxSizing';
    this.TRANSITION_PROP = 'transition';
    this.TRANSFORM_PROP = 'transform';
    this.PERSPECTIVE_PROP = 'perspective';
    this.PERSPECTIVE_ORIGIN_PROP = 'perspectiveOrigin';
    this.VENDORS = ['Webkit', 'moz', 'O', 'ms'];
    this.TWEENABLE = ['opacity', 'width', 'height', 'marginRight', 'marginBottom', 'x', 'y', 'scale', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ'];
    this.callActions('afterConstruct');
  };

  _mixitup.BaseStatic.call(_mixitup.Features);

  _mixitup.Features.prototype = Object.create(_mixitup.Base.prototype);
  h.extend(_mixitup.Features.prototype,
  /** @lends mixitup.Features */
  {
    constructor: _mixitup.Features,

    /**
     * @private
     * @return  {void}
     */
    init: function init() {
      var self = this;
      self.callActions('beforeInit', arguments);
      self.canary = document.createElement('div');
      self.setPrefixes();
      self.runTests();
      self.callActions('beforeInit', arguments);
    },

    /**
     * @private
     * @return  {void}
     */
    runTests: function runTests() {
      var self = this;
      self.callActions('beforeRunTests', arguments);
      self.has.promises = typeof window.Promise === 'function';
      self.has.transitions = self.transitionPrefix !== 'unsupported';
      self.callActions('afterRunTests', arguments);
      h.freeze(self.has);
    },

    /**
     * @private
     * @return  {void}
     */
    setPrefixes: function setPrefixes() {
      var self = this;
      self.callActions('beforeSetPrefixes', arguments);
      self.transitionPrefix = h.getPrefix(self.canary, 'Transition', self.VENDORS);
      self.transformPrefix = h.getPrefix(self.canary, 'Transform', self.VENDORS);
      self.boxSizingPrefix = h.getPrefix(self.canary, 'BoxSizing', self.VENDORS);
      self.boxSizingProp = self.boxSizingPrefix ? self.boxSizingPrefix + h.pascalCase(self.BOX_SIZING_PROP) : self.BOX_SIZING_PROP;
      self.transitionProp = self.transitionPrefix ? self.transitionPrefix + h.pascalCase(self.TRANSITION_PROP) : self.TRANSITION_PROP;
      self.transformProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.TRANSFORM_PROP) : self.TRANSFORM_PROP;
      self.transformRule = self.transformPrefix ? '-' + self.transformPrefix + '-' + self.TRANSFORM_PROP : self.TRANSFORM_PROP;
      self.perspectiveProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.PERSPECTIVE_PROP) : self.PERSPECTIVE_PROP;
      self.perspectiveOriginProp = self.transformPrefix ? self.transformPrefix + h.pascalCase(self.PERSPECTIVE_ORIGIN_PROP) : self.PERSPECTIVE_ORIGIN_PROP;
      self.callActions('afterSetPrefixes', arguments);
    }
  });
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.Has = function () {
    this.transitions = false;
    this.promises = false;
    h.seal(this);
  }; // Assign a singleton instance to `mixitup.features` and initialise:


  _mixitup.features = new _mixitup.Features();

  _mixitup.features.init();
  /**
   * A group of properties defining the mixer's animation and effects settings.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        animation
   * @namespace
   * @public
   * @since       2.0.0
   */


  _mixitup.ConfigAnimation = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A boolean dictating whether or not animation should be enabled for the MixItUp instance.
     * If `false`, all operations will occur instantly and syncronously, although callback
     * functions and any returned promises will still be fulfilled.
     *
     * @example <caption>Example: Create a mixer with all animations disabled</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         enable: false
     *     }
     * });
     *
     * @name        enable
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.enable = true;
    /**
     * A string of one or more space-seperated properties to which transitions will be
     * applied for all filtering animations.
     *
     * Properties can be listed any order or combination, although they will be applied in a specific
     * predefined order to produce consistent results.
     *
     * To learn more about available effects, experiment with our <a href="https://www.kunkalabs.com/mixitup/">
     * sandbox demo</a> and try out the "Export config" button in the Animation options drop down.
     *
     * @example <caption>Example: Apply "fade" and "translateZ" effects to all animations</caption>
     * // As targets are filtered in and out, they will fade between
     * // opacity 1 and 0 and transform between translateZ(-100px) and
     * // translateZ(0).
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'fade translateZ(-100px)'
     *     }
     * });
     *
     * @name        effects
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     'fade scale'
     */

    this.effects = 'fade scale';
    /**
     * A string of one or more space-seperated effects to be applied only to filter-in
     * animations, overriding `config.animation.effects` if set.
     *
     * @example <caption>Example: Apply downwards vertical translate to targets being filtered in</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effectsIn: 'fade translateY(-100%)'
     *     }
     * });
     *
     * @name        effectsIn
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.effectsIn = '';
    /**
     * A string of one or more space-seperated effects to be applied only to filter-out
     * animations, overriding `config.animation.effects` if set.
     *
     * @example <caption>Example: Apply upwards vertical translate to targets being filtered out</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effectsOut: 'fade translateY(-100%)'
     *     }
     * });
     *
     * @name        effectsOut
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.effectsOut = '';
    /**
     * An integer dictating the duration of all MixItUp animations in milliseconds, not
     * including any additional delay apllied via the `'stagger'` effect.
     *
     * @example <caption>Example: Apply an animation duration of 200ms to all mixitup animations</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         duration: 200
     *     }
     * });
     *
     * @name        duration
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {number}
     * @default     600
     */

    this.duration = 600;
    /**
     * A valid CSS3 transition-timing function or shorthand. For a full list of accepted
     * values, visit <a href="http://easings.net" target="_blank">easings.net</a>.
     *
     * @example <caption>Example 1: Apply "ease-in-out" easing to all animations</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         easing: 'ease-in-out'
     *     }
     * });
     *
     * @example <caption>Example 2: Apply a custom "cubic-bezier" easing function to all animations</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)'
     *     }
     * });
     *
     * @name        easing
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     'ease'
     */

    this.easing = 'ease';
    /**
     * A boolean dictating whether or not to apply perspective to the MixItUp container
     * during animations. By default, perspective is always applied and creates the
     * illusion of three-dimensional space for effects such as `translateZ`, `rotateX`,
     * and `rotateY`.
     *
     * You may wish to disable this and define your own perspective settings via CSS.
     *
     * @example <caption>Example: Prevent perspective from being applied to any 3D transforms</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         applyPerspective: false
     *     }
     * });
     *
     * @name        applyPerspective
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {bolean}
     * @default     true
     */

    this.applyPerspective = true;
    /**
     * The perspective distance value to be applied to the container during animations,
     * affecting any 3D-transform-based effects.
     *
     * @example <caption>Example: Set a perspective distance of 2000px</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'rotateY(-25deg)',
     *         perspectiveDistance: '2000px'
     *     }
     * });
     *
     * @name        perspectiveDistance
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     '3000px'
     */

    this.perspectiveDistance = '3000px';
    /**
     * The perspective-origin value to be applied to the container during animations,
     * affecting any 3D-transform-based effects.
     *
     * @example <caption>Example: Set a perspective origin in the top-right of the container</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'transateZ(-200px)',
     *         perspectiveOrigin: '100% 0'
     *     }
     * });
     *
     * @name        perspectiveOrigin
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {string}
     * @default     '50% 50%'
     */

    this.perspectiveOrigin = '50% 50%';
    /**
     * A boolean dictating whether or not to enable the queuing of operations.
     *
     * If `true` (default), and a control is clicked or an API call is made while another
     * operation is progress, the operation will go into the queue and will be automatically exectuted
     * when the previous operaitons is finished.
     *
     * If `false`, any requested operations will be ignored, and the `onMixBusy` callback and `mixBusy`
     * event will be fired. If `debug.showWarnings` is enabled, a console warning will also occur.
     *
     * @example <caption>Example: Disable queuing</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         queue: false
     *     }
     * });
     *
     * @name        queue
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.queue = true;
    /**
     * An integer dictacting the maximum number of operations allowed in the queue at
     * any time, when queuing is enabled.
     *
     * @example <caption>Example: Allow a maximum of 5 operations in the queue at any time</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         queueLimit: 5
     *     }
     * });
     *
     * @name        queueLimit
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {number}
     * @default     3
     */

    this.queueLimit = 3;
    /**
     * A boolean dictating whether or not to transition the height and width of the
     * container as elements are filtered in and out. If disabled, the container height
     * will change abruptly.
     *
     * It may be desirable to disable this on mobile devices as the CSS `height` and
     * `width` properties do not receive GPU-acceleration and can therefore cause stuttering.
     *
     * @example <caption>Example 1: Disable the transitioning of the container height and/or width</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         animateResizeContainer: false
     *     }
     * });
     *
     * @example <caption>Example 2: Disable the transitioning of the container height and/or width for mobile devices only</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         animateResizeContainer: myFeatureTests.isMobile ? false : true
     *     }
     * });
     *
     * @name        animateResizeContainer
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.animateResizeContainer = true;
    /**
     * A boolean dictating whether or not to transition the height and width of target
     * elements as they change throughout the course of an animation.
     *
     * This is often a must for flex-box grid layouts where the size of target elements may change
     * depending on final their position in relation to their siblings, or for `.changeLayout()`
     * operations where the size of targets change between layouts.
     *
     * NB: This feature requires additional calculations and manipulation to non-hardware-accelerated
     * properties which may adversely affect performance on slower devices, and is therefore
     * disabled by default.
     *
     * @example <caption>Example: Enable the transitioning of target widths and heights</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         animateResizeTargets: true
     *     }
     * });
     *
     * @name        animateResizeTargets
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.animateResizeTargets = false;
    /**
     * A custom function used to manipulate the order in which the stagger delay is
     * incremented when using the ‘stagger’ effect.
     *
     * When using the 'stagger' effect, the delay applied to each target element is incremented
     * based on its index. You may create a custom function to manipulate the order in which the
     * delay is incremented and create engaging non-linear stagger effects.
     *
     * The function receives the index of the target element as a parameter, and must
     * return an integer which serves as the multiplier for the stagger delay.
     *
     * @example <caption>Example 1: Stagger target elements by column in a 3-column grid</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'fade stagger(100ms)',
     *         staggerSequence: function(i) {
     *             return i % 3;
     *         }
     *     }
     * });
     *
     * @example <caption>Example 2: Using an algorithm to produce a more complex sequence</caption>
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'fade stagger(100ms)',
     *         staggerSequence: function(i) {
     *             return (2*i) - (5*((i/3) - ((1/3) * (i%3))));
     *         }
     *     }
     * });
     *
     * @name        staggerSequence
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {function}
     * @default     null
     */

    this.staggerSequence = null;
    /**
     * A boolean dictating whether or not to reverse the direction of `translate`
     * and `rotate` transforms for elements being filtered out.
     *
     * It can be used to create carousel-like animations where elements enter and exit
     * from opposite directions. If enabled, the effect `translateX(-100%)` for elements
     * being filtered in would become `translateX(100%)` for targets being filtered out.
     *
     * This functionality can also be achieved by providing seperate effects
     * strings for `config.animation.effectsIn` and `config.animation.effectsOut`.
     *
     * @example <caption>Example: Reverse the desired direction on any translate/rotate effect for targets being filtered out</caption>
     * // Elements being filtered in will be translated from '100%' to '0' while
     * // elements being filtered out will be translated from 0 to '-100%'
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         effects: 'fade translateX(100%)',
     *         reverseOut: true,
     *         nudge: false // Disable nudging to create a carousel-like effect
     *     }
     * });
     *
     * @name        reverseOut
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.reverseOut = false;
    /**
     * A boolean dictating whether or not to "nudge" the animation path of targets
     * when they are being filtered in and out simulatenously.
     *
     * This has been the default behavior of MixItUp since version 1, but it
     * may be desirable to disable this effect when filtering directly from
     * one exclusive set of targets to a different exclusive set of targets,
     * to create a carousel-like effect, or a generally more subtle animation.
     *
     * @example <caption>Example: Disable the "nudging" of targets being filtered in and out simulatenously</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         nudge: false
     *     }
     * });
     *
     * @name        nudge
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.nudge = true;
    /**
     * A boolean dictating whether or not to clamp the height of the container while MixItUp's
     * geometry tests are carried out before an operation.
     *
     * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
     * height of the container might affect its vertical positioning in the viewport
     * (e.g. a vertically-centered container), this should be turned off to ensure accurate
     * test results and a smooth animation.
     *
     * @example <caption>Example: Disable container height-clamping</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         clampHeight: false
     *     }
     * });
     *
     * @name        clampHeight
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.clampHeight = true;
    /**
     * A boolean dictating whether or not to clamp the width of the container while MixItUp's
     * geometry tests are carried out before an operation.
     *
     * To prevent scroll-bar flicker, clamping is turned on by default. But in the case where the
     * width of the container might affect its horitzontal positioning in the viewport
     * (e.g. a horizontall-centered container), this should be turned off to ensure accurate
     * test results and a smooth animation.
     *
     * @example <caption>Example: Disable container width-clamping</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     animation: {
     *         clampWidth: false
     *     }
     * });
     *
     * @name        clampWidth
     * @memberof    mixitup.Config.animation
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.clampWidth = true;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigAnimation);

  _mixitup.ConfigAnimation.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigAnimation.prototype.constructor = _mixitup.ConfigAnimation;
  /**
   * A group of properties relating to the behavior of the Mixer.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        behavior
   * @namespace
   * @public
   * @since       3.1.12
   */

  _mixitup.ConfigBehavior = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A boolean dictating whether to allow "live" sorting of the mixer.
     *
     * Because of the expensive nature of sorting, MixItUp makes use of several
     * internal optimizations to skip redundant sorting operations, such as when
     * the newly requested sort command is the same as the active one. The caveat
     * to this optimization is that "live" edits to the value of a target's sorting
     * attribute will be ignored when requesting a re-sort by the same attribute.
     *
     * By setting to `behavior.liveSort` to `true`, the mixer will always re-sort
     * regardless of whether or not the sorting attribute and order have changed.
     *
     * @example <caption>Example: Enabling `liveSort` to allow for re-sorting</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     behavior: {
     *         liveSort: true
     *     },
     *     load: {
     *         sort: 'edited:desc'
     *     }
     * });
     *
     * var target = containerEl.children[3];
     *
     * console.log(target.getAttribute('data-edited')); // '2015-04-24'
     *
     * target.setAttribute('data-edited', '2017-08-10'); // Update the target's edited date
     *
     * mixer.sort('edited:desc')
     *     .then(function(state) {
     *         // The target is now at the top of the list
     *
     *         console.log(state.targets[0] === target); // true
     *     });
     *
     * @name        liveSort
     * @memberof    mixitup.Config.behavior
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.liveSort = false;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigBehavior);

  _mixitup.ConfigBehavior.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigBehavior.prototype.constructor = _mixitup.ConfigBehavior;
  /**
   * A group of optional callback functions to be invoked at various
   * points within the lifecycle of a mixer operation.
   *
   * Each function is analogous to an event of the same name triggered from the
   * container element, and is invoked immediately after it.
   *
   * All callback functions receive the current `state` object as their first
   * argument, as well as other more specific arguments described below.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        callbacks
   * @namespace
   * @public
   * @since       2.0.0
   */

  _mixitup.ConfigCallbacks = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A callback function invoked immediately after any MixItUp operation is requested
     * and before animations have begun.
     *
     * A second `futureState` argument is passed to the function which represents the final
     * state of the mixer once the requested operation has completed.
     *
     * @example <caption>Example: Adding an `onMixStart` callback function</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixStart: function(state, futureState) {
     *              console.log('Starting operation...');
     *         }
     *     }
     * });
     *
     * @name        onMixStart
     * @memberof    mixitup.Config.callbacks
     * @instance
     * @type        {function}
     * @default     null
     */

    this.onMixStart = null;
    /**
     * A callback function invoked when a MixItUp operation is requested while another
     * operation is in progress, and the animation queue is full, or queueing
     * is disabled.
     *
     * @example <caption>Example: Adding an `onMixBusy` callback function</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixBusy: function(state) {
     *              console.log('Mixer busy');
     *         }
     *     }
     * });
     *
     * @name        onMixBusy
     * @memberof    mixitup.Config.callbacks
     * @instance
     * @type        {function}
     * @default     null
     */

    this.onMixBusy = null;
    /**
     * A callback function invoked after any MixItUp operation has completed, and the
     * state has been updated.
     *
     * @example <caption>Example: Adding an `onMixEnd` callback function</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixEnd: function(state) {
     *              console.log('Operation complete');
     *         }
     *     }
     * });
     *
     * @name        onMixEnd
     * @memberof    mixitup.Config.callbacks
     * @instance
     * @type        {function}
     * @default     null
     */

    this.onMixEnd = null;
    /**
     * A callback function invoked whenever an operation "fails", i.e. no targets
     * could be found matching the requested filter.
     *
     * @example <caption>Example: Adding an `onMixFail` callback function</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixFail: function(state) {
     *              console.log('No items could be found matching the requested filter');
     *         }
     *     }
     * });
     *
     * @name        onMixFail
     * @memberof    mixitup.Config.callbacks
     * @instance
     * @type        {function}
     * @default     null
     */

    this.onMixFail = null;
    /**
     * A callback function invoked whenever a MixItUp control is clicked, and before its
     * respective operation is requested.
     *
     * The clicked element is assigned to the `this` keyword within the function. The original
     * click event is passed to the function as the second argument, which can be useful if
     * using `<a>` tags as controls where the default behavior needs to be prevented.
     *
     * Returning `false` from the callback will prevent the control click from triggering
     * an operation.
     *
     * @example <caption>Example 1: Adding an `onMixClick` callback function</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixClick: function(state, originalEvent) {
     *              console.log('The control "' + this.innerText + '" was clicked');
     *         }
     *     }
     * });
     *
     * @example <caption>Example 2: Using `onMixClick` to manipulate the original click event</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixClick: function(state, originalEvent) {
     *              // Prevent original click event from bubbling up:
     *              originalEvent.stopPropagation();
     *
     *              // Prevent default behavior of clicked element:
     *              originalEvent.preventDefault();
     *         }
     *     }
     * });
     *
     * @example <caption>Example 3: Using `onMixClick` to conditionally cancel operations</caption>
     * var mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixClick: function(state, originalEvent) {
     *              // Perform some conditional check:
     *
     *              if (myApp.isLoading) {
     *                  // By returning false, we can prevent the control click from triggering an operation.
     *
     *                  return false;
     *              }
     *         }
     *     }
     * });
     *
     * @name        onMixClick
     * @memberof    mixitup.Config.callbacks
     * @instance
     * @type        {function}
     * @default     null
     */

    this.onMixClick = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigCallbacks);

  _mixitup.ConfigCallbacks.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigCallbacks.prototype.constructor = _mixitup.ConfigCallbacks;
  /**
   * A group of properties relating to clickable control elements.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        controls
   * @namespace
   * @public
   * @since       2.0.0
   */

  _mixitup.ConfigControls = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A boolean dictating whether or not controls should be enabled for the mixer instance.
     *
     * If `true` (default behavior), MixItUp will search the DOM for any clickable elements with
     * `data-filter`, `data-sort` or `data-toggle` attributes, and bind them for click events.
     *
     * If `false`, no click handlers will be bound, and all functionality must therefore be performed
     * via the mixer's API methods.
     *
     * If you do not intend to use the default controls, setting this property to `false` will
     * marginally improve the startup time of your mixer instance, and will also prevent any other active
     * mixer instances in the DOM which are bound to controls from controlling the instance.
     *
     * @example <caption>Example: Disabling controls</caption>
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         enable: false
     *     }
     * });
     *
     * // With the default controls disabled, we can only control
     * // the mixer via its API methods, e.g.:
     *
     * mixer.filter('.cat-1');
     *
     * @name        enable
     * @memberof    mixitup.Config.controls
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.enable = true;
    /**
     * A boolean dictating whether or not to use event delegation when binding click events
     * to the default controls.
     *
     * If `false` (default behavior), each control button in the DOM will be found and
     * individually bound when a mixer is instantiated, with their corresponding actions
     * cached for performance.
     *
     * If `true`, a single click handler will be applied to the `window` (or container element - see
     * `config.controls.scope`), and any click events triggered by elements with `data-filter`,
     * `data-sort` or `data-toggle` attributes present will be handled as they propagate upwards.
     *
     * If you require a user interface where control buttons may be added, removed, or changed during the
     * lifetime of a mixer, `controls.live` should be set to `true`. There is a marginal but unavoidable
     * performance deficit when using live controls, as the value of each control button must be read
     * from the DOM in real time once the click event has propagated.
     *
     * @example <caption>Example: Setting live controls</caption>
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         live: true
     *     }
     * });
     *
     * // Control buttons can now be added, remove and changed without breaking
     * // the mixer's UI
     *
     * @name        live
     * @memberof    mixitup.Config.controls
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.live = false;
    /**
     * A string dictating the "scope" to use when binding or querying the default controls. The available
     * values are `'global'` or `'local'`.
     *
     * When set to `'global'` (default behavior), MixItUp will query the entire document for control buttons
     * to bind, or delegate click events from (see `config.controls.live`).
     *
     * When set to `'local'`, MixItUp will only query (or bind click events to) its own container element.
     * This may be desireable if you require multiple active mixer instances within the same document, with
     * controls that would otherwise intefere with each other if scoped globally.
     *
     * Conversely, if you wish to control multiple instances with a single UI, you would create one
     * set of controls and keep the controls scope of each mixer set to `global`.
     *
     * @example <caption>Example: Setting 'local' scoped controls</caption>
     * var mixerOne = mixitup(containerOne, {
     *     controls: {
     *         scope: 'local'
     *     }
     * });
     *
     * var mixerTwo = mixitup(containerTwo, {
     *     controls: {
     *         scope: 'local'
     *     }
     * });
     *
     * // Both mixers can now exist within the same document with
     * // isolated controls placed within their container elements.
     *
     * @name        scope
     * @memberof    mixitup.Config.controls
     * @instance
     * @type        {string}
     * @default     'global'
     */

    this.scope = 'global'; // enum: ['local' ,'global']

    /**
     * A string dictating the type of logic to apply when concatenating the filter selectors of
     * active toggle buttons (i.e. any clickable element with a `data-toggle` attribute).
     *
     * If set to `'or'` (default behavior), selectors will be concatenated together as
     * a comma-seperated list. For example:
     *
     * `'.cat-1, .cat-2'` (shows any elements matching `'.cat-1'` OR `'.cat-2'`)
     *
     * If set to `'and'`, selectors will be directly concatenated together. For example:
     *
     * `'.cat-1.cat-2'` (shows any elements which match both `'.cat-1'` AND `'.cat-2'`)
     *
     * @example <caption>Example: Setting "and" toggle logic</caption>
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         toggleLogic: 'and'
     *     }
     * });
     *
     * @name        toggleLogic
     * @memberof    mixitup.Config.controls
     * @instance
     * @type        {string}
     * @default     'or'
     */

    this.toggleLogic = 'or'; // enum: ['or', 'and']

    /**
     * A string dictating the filter behavior when all toggles are inactive.
     *
     * When set to `'all'` (default behavior), *all* targets will be shown by default
     * when no toggles are active, or at the moment all active toggles are toggled off.
     *
     * When set to `'none'`, no targets will be shown by default when no toggles are
     * active, or at the moment all active toggles are toggled off.
     *
     * @example <caption>Example 1: Setting the default toggle behavior to `'all'`</caption>
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         toggleDefault: 'all'
     *     }
     * });
     *
     * mixer.toggleOn('.cat-2')
     *     .then(function() {
     *         // Deactivate all active toggles
     *
     *         return mixer.toggleOff('.cat-2')
     *     })
     *     .then(function(state) {
     *          console.log(state.activeFilter.selector); // 'all'
     *          console.log(state.totalShow); // 12
     *     });
     *
     * @example <caption>Example 2: Setting the default toggle behavior to `'none'`</caption>
     * var mixer = mixitup(containerEl, {
     *     controls: {
     *         toggleDefault: 'none'
     *     }
     * });
     *
     * mixer.toggleOn('.cat-2')
     *     .then(function() {
     *         // Deactivate all active toggles
     *
     *         return mixer.toggleOff('.cat-2')
     *     })
     *     .then(function(state) {
     *          console.log(state.activeFilter.selector); // 'none'
     *          console.log(state.totalShow); // 0
     *     });
     *
     * @name        toggleDefault
     * @memberof    mixitup.Config.controls
     * @instance
     * @type        {string}
     * @default     'all'
     */

    this.toggleDefault = 'all'; // enum: ['all', 'none']

    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigControls);

  _mixitup.ConfigControls.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigControls.prototype.constructor = _mixitup.ConfigControls;
  /**
   * A group of properties defining the output and structure of class names programmatically
   * added to controls and containers to reflect the state of the mixer.
   *
   * Most commonly, class names are added to controls by MixItUp to indicate that
   * the control is active so that it can be styled accordingly - `'mixitup-control-active'` by default.
   *
   * Using a "BEM" like structure, each classname is broken into the three parts:
   * a block namespace (`'mixitup'`), an element name (e.g. `'control'`), and an optional modifier
   * name (e.g. `'active'`) reflecting the state of the element.
   *
   * By default, each part of the classname is concatenated together using single hyphens as
   * delineators, but this can be easily customised to match the naming convention and style of
   * your project.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        classNames
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigClassNames = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * The "block" portion, or top-level namespace added to the start of any class names created by MixItUp.
     *
     * @example <caption>Example 1: changing the `config.classNames.block` value</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: 'portfolio'
     *     }
     * });
     *
     * // Active control output: "portfolio-control-active"
     *
     * @example <caption>Example 2: Removing `config.classNames.block`</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: ''
     *     }
     * });
     *
     * // Active control output: "control-active"
     *
     * @name        block
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'mixitup'
     */

    this.block = 'mixitup';
    /**
     * The "element" portion of the class name added to container.
     *
     * @name        elementContainer
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'container'
     */

    this.elementContainer = 'container';
    /**
     * The "element" portion of the class name added to filter controls.
     *
     * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
     * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
     *
     * @example <caption>Example 1: changing the `config.classNames.elementFilter` value</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         elementFilter: 'filter'
     *     }
     * });
     *
     * // Active filter output: "mixitup-filter-active"
     *
     * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementFilter` values</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: 'portfolio',
     *         elementFilter: 'filter'
     *     }
     * });
     *
     * // Active filter output: "portfolio-filter-active"
     *
     * @name        elementFilter
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'control'
     */

    this.elementFilter = 'control';
    /**
     * The "element" portion of the class name added to sort controls.
     *
     * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
     * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
     *
     * @example <caption>Example 1: changing the `config.classNames.elementSort` value</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         elementSort: 'sort'
     *     }
     * });
     *
     * // Active sort output: "mixitup-sort-active"
     *
     * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementSort` values</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: 'portfolio',
     *         elementSort: 'sort'
     *     }
     * });
     *
     * // Active sort output: "portfolio-sort-active"
     *
     * @name        elementSort
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'control'
     */

    this.elementSort = 'control';
    /**
     * The "element" portion of the class name added to multimix controls.
     *
     * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
     * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
     *
     * @example <caption>Example 1: changing the `config.classNames.elementMultimix` value</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         elementMultimix: 'multimix'
     *     }
     * });
     *
     * // Active multimix output: "mixitup-multimix-active"
     *
     * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementMultimix` values</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: 'portfolio',
     *         elementSort: 'multimix'
     *     }
     * });
     *
     * // Active multimix output: "portfolio-multimix-active"
     *
     * @name        elementMultimix
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'control'
     */

    this.elementMultimix = 'control';
    /**
     * The "element" portion of the class name added to toggle controls.
     *
     * By default, all filter, sort, multimix and toggle controls take the same element value of `'control'`, but
     * each type's element value can be individually overwritten to match the unique classNames of your controls as needed.
     *
     * @example <caption>Example 1: changing the `config.classNames.elementToggle` value</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         elementToggle: 'toggle'
     *     }
     * });
     *
     * // Active toggle output: "mixitup-toggle-active"
     *
     * @example <caption>Example 2: changing the `config.classNames.block` and `config.classNames.elementToggle` values</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         block: 'portfolio',
     *         elementToggle: 'toggle'
     *     }
     * });
     *
     * // Active toggle output: "portfolio-toggle-active"
     *
     * @name        elementToggle
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'control'
     */

    this.elementToggle = 'control';
    /**
     * The "modifier" portion of the class name added to active controls.
     * @name        modifierActive
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'active'
     */

    this.modifierActive = 'active';
    /**
     * The "modifier" portion of the class name added to disabled controls.
     *
     * @name        modifierDisabled
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'disabled'
     */

    this.modifierDisabled = 'disabled';
    /**
     * The "modifier" portion of the class name added to the container when in a "failed" state.
     *
     * @name        modifierFailed
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     'failed'
     */

    this.modifierFailed = 'failed';
    /**
     * The delineator used between the "block" and "element" portions of any class name added by MixItUp.
     *
     * If the block portion is ommited by setting it to an empty string, no delineator will be added.
     *
     * @example <caption>Example: changing the delineator to match BEM convention</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         delineatorElement: '__'
     *     }
     * });
     *
     * // example active control output: "mixitup__control-active"
     *
     * @name        delineatorElement
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     '-'
     */

    this.delineatorElement = '-';
    /**
     * The delineator used between the "element" and "modifier" portions of any class name added by MixItUp.
     *
     * If the element portion is ommited by setting it to an empty string, no delineator will be added.
     *
     * @example <caption>Example: changing both delineators to match BEM convention</caption>
     * var mixer = mixitup(containerEl, {
     *     classNames: {
     *         delineatorElement: '__'
     *         delineatorModifier: '--'
     *     }
     * });
     *
     * // Active control output: "mixitup__control--active"
     *
     * @name        delineatorModifier
     * @memberof    mixitup.Config.classNames
     * @instance
     * @type        {string}
     * @default     '-'
     */

    this.delineatorModifier = '-';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigClassNames);

  _mixitup.ConfigClassNames.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigClassNames.prototype.constructor = _mixitup.ConfigClassNames;
  /**
   * A group of properties relating to MixItUp's dataset API.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        data
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigData = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A string specifying the name of the key containing your data model's unique
     * identifier (UID). To use the dataset API, a UID key must be specified and
     * be present and unique on all objects in the dataset you provide to MixItUp.
     *
     * For example, if your dataset is made up of MongoDB documents, the UID
     * key would be `'id'` or `'_id'`.
     *
     * @example <caption>Example: Setting the UID to `'id'`</caption>
     * var mixer = mixitup(containerEl, {
     *     data: {
     *         uidKey: 'id'
     *     }
     * });
     *
     * @name        uidKey
     * @memberof    mixitup.Config.data
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.uidKey = '';
    /**
     * A boolean dictating whether or not MixItUp should "dirty check" each object in
     * your dataset for changes whenever `.dataset()` is called, and re-render any targets
     * for which a change is found.
     *
     * Depending on the complexity of your data model, dirty checking can be expensive
     * and is therefore disabled by default.
     *
     * NB: For changes to be detected, a new immutable instance of the edited model must be
     * provided to mixitup, rather than manipulating properties on the existing instance.
     * If your changes are a result of a DB write and read, you will most likely be calling
     * `.dataset()` with a clean set of objects each time, so this will not be an issue.
     *
     * @example <caption>Example: Enabling dirty checking</caption>
     *
     * var myDataset = [
     *     {
     *         id: 0,
     *         title: "Blog Post Title 0"
     *         ...
     *     },
     *     {
     *         id: 1,
     *         title: "Blog Post Title 1"
     *         ...
     *     }
     * ];
     *
     * // Instantiate a mixer with a pre-loaded dataset, and a target renderer
     * // function defined
     *
     * var mixer = mixitup(containerEl, {
     *     data: {
     *         uidKey: 'id',
     *         dirtyCheck: true
     *     },
     *     load: {
     *         dataset: myDataset
     *     },
     *     render: {
     *         target: function() { ... }
     *     }
     * });
     *
     * // For illustration, we will clone and edit the second object in the dataset.
     * // NB: this would typically be done server-side in response to a DB update,
     * and then re-queried via an API.
     *
     * myDataset[1] = Object.assign({}, myDataset[1]);
     *
     * myDataset[1].title = 'Blog Post Title 11';
     *
     * mixer.dataset(myDataset)
     *    .then(function() {
     *        // the target with ID "1", will be re-rendered reflecting its new title
     *    });
     *
     * @name        dirtyCheck
     * @memberof    mixitup.Config.data
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.dirtyCheck = false;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigData);

  _mixitup.ConfigData.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigData.prototype.constructor = _mixitup.ConfigData;
  /**
   * A group of properties allowing the toggling of various debug features.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        debug
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigDebug = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A boolean dictating whether or not the mixer instance returned by the
     * `mixitup()` factory function should expose private properties and methods.
     *
     * By default, mixer instances only expose their public API, but enabling
     * debug mode will give you access to various mixer internals which may aid
     * in debugging, or the authoring of extensions.
     *
     * @example <caption>Example: Enabling debug mode</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     debug: {
     *         enable: true
     *     }
     * });
     *
     * // Private properties and methods will now be visible on the mixer instance:
     *
     * console.log(mixer);
     *
     * @name        enable
     * @memberof    mixitup.Config.debug
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.enable = false;
    /**
     * A boolean dictating whether or not warnings should be shown when various
     * common gotchas occur.
     *
     * Warnings are intended to provide insights during development when something
     * occurs that is not a fatal, but may indicate an issue with your integration,
     * and are therefore turned on by default. However, you may wish to disable
     * them in production.
     *
     * @example <caption>Example 1: Disabling warnings</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     debug: {
     *         showWarnings: false
     *     }
     * });
     *
     * @example <caption>Example 2: Disabling warnings based on environment</caption>
     *
     * var showWarnings = myAppConfig.environment === 'development' ? true : false;
     *
     * var mixer = mixitup(containerEl, {
     *     debug: {
     *         showWarnings: showWarnings
     *     }
     * });
     *
     * @name        showWarnings
     * @memberof    mixitup.Config.debug
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.showWarnings = true;
    /**
     * Used for server-side testing only.
     *
     * @private
     * @name        fauxAsync
     * @memberof    mixitup.Config.debug
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.fauxAsync = false;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigDebug);

  _mixitup.ConfigDebug.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigDebug.prototype.constructor = _mixitup.ConfigDebug;
  /**
   * A group of properties relating to the layout of the container.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        layout
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigLayout = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A boolean dictating whether or not mixitup should query all descendants
     * of the container for targets, or only immediate children.
     *
     * By default, mixitup will query all descendants matching the
     * `selectors.target` selector when indexing targets upon instantiation.
     * This allows for targets to be nested inside a sub-container which is
     * useful when ring-fencing targets from locally scoped controls in your
     * markup (see `controls.scope`).
     *
     * However, if you are building a more complex UI requiring the nesting
     * of mixers within mixers, you will most likely want to limit targets to
     * immediate children of the container by setting this property to `false`.
     *
     * @example <caption>Example: Restricting targets to immediate children</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     layout: {
     *         allowNestedTargets: false
     *     }
     * });
     *
     * @name        allowNestedTargets
     * @memberof    mixitup.Config.layout
     * @instance
     * @type        {boolean}
     * @default     true
     */

    this.allowNestedTargets = true;
    /**
     * A string specifying an optional class name to apply to the container when in
     * its default state.
     *
     * By changing this class name or adding a class name to the container via the
     * `.changeLayout()` API method, the CSS layout of the container can be changed,
     * and MixItUp will attemp to gracefully animate the container and its targets
     * between states.
     *
     * @example <caption>Example 1: Specifying a container class name</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     layout: {
     *         containerClassName: 'grid'
     *     }
     * });
     *
     * @example <caption>Example 2: Changing the default class name with `.changeLayout()`</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     layout: {
     *         containerClassName: 'grid'
     *     }
     * });
     *
     * mixer.changeLayout('list')
     *     .then(function(state) {
     *          console.log(state.activeContainerClass); // "list"
     *     });
     *
     * @name        containerClassName
     * @memberof    mixitup.Config.layout
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.containerClassName = '';
    /**
     * A reference to a non-target sibling element after which to insert targets
     * when there are no targets in the container.
     *
     * @example <caption>Example: Setting a `siblingBefore` reference element</caption>
     *
     * var addButton = containerEl.querySelector('button');
     *
     * var mixer = mixitup(containerEl, {
     *     layout: {
     *         siblingBefore: addButton
     *     }
     * });
     *
     * @name        siblingBefore
     * @memberof    mixitup.Config.layout
     * @instance
     * @type        {HTMLElement}
     * @default     null
     */

    this.siblingBefore = null;
    /**
     * A reference to a non-target sibling element before which to insert targets
     * when there are no targets in the container.
     *
     * @example <caption>Example: Setting an `siblingAfter` reference element</caption>
     *
     * var gap = containerEl.querySelector('.gap');
     *
     * var mixer = mixitup(containerEl, {
     *     layout: {
     *         siblingAfter: gap
     *     }
     * });
     *
     * @name        siblingAfter
     * @memberof    mixitup.Config.layout
     * @instance
     * @type        {HTMLElement}
     * @default     null
     */

    this.siblingAfter = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigLayout);

  _mixitup.ConfigLayout.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigLayout.prototype.constructor = _mixitup.ConfigLayout;
  /**
   * A group of properties defining the initial state of the mixer on load (instantiation).
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        load
   * @namespace
   * @public
   * @since       2.0.0
   */

  _mixitup.ConfigLoad = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A string defining any filtering to be statically applied to the mixer on load.
     * As per the `.filter()` API, this can be any valid selector string, or the
     * values `'all'` or `'none'`.
     *
     * @example <caption>Example 1: Defining an initial filter selector to be applied on load</caption>
     *
     * // The mixer will show only those targets matching '.category-a' on load.
     *
     * var mixer = mixitup(containerEl, {
     *     load: {
     *         filter: '.category-a'
     *     }
     * });
     *
     * @example <caption>Example 2: Hiding all targets on load</caption>
     *
     * // The mixer will show hide all targets on load.
     *
     * var mixer = mixitup(containerEl, {
     *     load: {
     *         filter: 'none'
     *     }
     * });
     *
     * @name        filter
     * @memberof    mixitup.Config.load
     * @instance
     * @type        {string}
     * @default     'all'
     */

    this.filter = 'all';
    /**
     * A string defining any sorting to be statically applied to the mixer on load.
     * As per the `.sort()` API, this should be a valid "sort string" made up of
     * an attribute to sort by (or `'default'`) followed by an optional sorting
     * order, or the value `'random'`;
     *
     * @example <caption>Example: Defining sorting to be applied on load</caption>
     *
     * // The mixer will sort the container by the value of the `data-published-date`
     * // attribute, in descending order.
     *
     * var mixer = mixitup(containerEl, {
     *     load: {
     *         sort: 'published-date:desc'
     *     }
     * });
     *
     * @name        sort
     * @memberof    mixitup.Config.load
     * @instance
     * @type        {string}
     * @default     'default:asc'
     */

    this.sort = 'default:asc';
    /**
     * An array of objects representing the underlying data of any pre-rendered targets,
     * when using the `.dataset()` API.
     *
     * NB: If targets are pre-rendered when the mixer is instantiated, this must be set.
     *
     * @example <caption>Example: Defining the initial underyling dataset</caption>
     *
     * var myDataset = [
     *     {
     *         id: 0,
     *         title: "Blog Post Title 0",
     *         ...
     *     },
     *     {
     *         id: 1,
     *         title: "Blog Post Title 1",
     *         ...
     *     }
     * ];
     *
     * var mixer = mixitup(containerEl, {
     *     data: {
     *         uidKey: 'id'
     *     },
     *     load: {
     *         dataset: myDataset
     *     }
     * });
     *
     * @name        dataset
     * @memberof    mixitup.Config.load
     * @instance
     * @type        {Array.<object>}
     * @default     null
     */

    this.dataset = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigLoad);

  _mixitup.ConfigLoad.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigLoad.prototype.constructor = _mixitup.ConfigLoad;
  /**
   * A group of properties defining the selectors used to query elements within a mixitup container.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        selectors
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigSelectors = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A selector string used to query and index target elements within the container.
     *
     * By default, the class selector `'.mix'` is used, but this can be changed to an
     * attribute or element selector to match the style of your project.
     *
     * @example <caption>Example 1: Changing the target selector</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     selectors: {
     *         target: '.portfolio-item'
     *     }
     * });
     *
     * @example <caption>Example 2: Using an attribute selector as a target selector</caption>
     *
     * // The mixer will search for any children with the attribute `data-ref="mix"`
     *
     * var mixer = mixitup(containerEl, {
     *     selectors: {
     *         target: '[data-ref="mix"]'
     *     }
     * });
     *
     * @name        target
     * @memberof    mixitup.Config.selectors
     * @instance
     * @type        {string}
     * @default     '.mix'
     */

    this.target = '.mix';
    /**
     * A optional selector string used to add further specificity to the querying of control elements,
     * in addition to their mandatory data attribute (e.g. `data-filter`, `data-toggle`, `data-sort`).
     *
     * This can be used if other elements in your document must contain the above attributes
     * (e.g. for use in third-party scripts), and would otherwise interfere with MixItUp. Adding
     * an additional `control` selector of your choice allows MixItUp to restrict event handling
     * to only those elements matching the defined selector.
     *
     * @name        control
     * @memberof    mixitup.Config.selectors
     * @instance
     * @type        {string}
     * @default     ''
     *
     * @example <caption>Example 1: Adding a `selectors.control` selector</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     selectors: {
     *         control: '.mixitup-control'
     *     }
     * });
     *
     * // Will not be handled:
     * // <button data-filter=".category-a"></button>
     *
     * // Will be handled:
     * // <button class="mixitup-control" data-filter=".category-a"></button>
     */

    this.control = '';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigSelectors);

  _mixitup.ConfigSelectors.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigSelectors.prototype.constructor = _mixitup.ConfigSelectors;
  /**
   * A group of optional render functions for creating and updating elements.
   *
   * All render functions receive a data object, and should return a valid HTML string.
   *
   * @constructor
   * @memberof    mixitup.Config
   * @name        render
   * @namespace
   * @public
   * @since       3.0.0
   */

  _mixitup.ConfigRender = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A function returning an HTML string representing a target element, or a reference to a
     * single DOM element.
     *
     * The function is invoked as part of the `.dataset()` API, whenever a new item is added
     * to the dataset, or an item in the dataset changes (if `dataset.dirtyCheck` is enabled).
     *
     * The function receives the relevant dataset item as its first parameter.
     *
     * @example <caption>Example 1: Using string concatenation</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     render: {
     *         target: function(item) {
     *             return (
     *                 '&lt;div class="mix"&gt;' +
     *                     '&lt;h2&gt;' + item.title + '&lt;/h2&gt;' +
     *                 '&lt;/div&gt;'
     *             );
     *         }
     *     }
     * });
     *
     * @example <caption>Example 2: Using an ES2015 template literal</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     render: {
     *         target: function(item) {
     *             return (
     *                 `&lt;div class="mix"&gt;
     *                     &lt;h2&gt;${item.title}&lt;/h2&gt;
     *                  &lt;/div&gt;`
     *             );
     *         }
     *     }
     * });
     *
     * @example <caption>Example 3: Using a Handlebars template</caption>
     *
     * var targetTemplate = Handlebars.compile('&lt;div class="mix"&gt;&lt;h2&gt;{{title}}&lt;/h2&gt;&lt;/div&gt;');
     *
     * var mixer = mixitup(containerEl, {
     *     render: {
     *         target: targetTemplate
     *     }
     * });
     *
     * @example <caption>Example 4: Returning a DOM element</caption>
     *
     * var mixer = mixitup(containerEl, {
     *     render: {
     *         target: function(item) {
     *              // Create a single element using your framework's built-in renderer
     *
     *              var el = ...
     *
     *              return el;
     *         }
     *     }
     * });
     *
     * @name        target
     * @memberof    mixitup.Config.render
     * @instance
     * @type        {function}
     * @default     'null'
     */

    this.target = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigRender);

  _mixitup.ConfigRender.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigRender.prototype.constructor = _mixitup.ConfigRender;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.ConfigTemplates = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ConfigTemplates);

  _mixitup.ConfigTemplates.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ConfigTemplates.prototype.constructor = _mixitup.ConfigTemplates;
  /**
   * `mixitup.Config` is an interface used for customising the functionality of a
   * mixer instance. It is organised into several semantically distinct sub-objects,
   * each one pertaining to a particular aspect of MixItUp functionality.
   *
   * An object literal containing any or all of the available properies,
   * known as the "configuration object", can be passed as the second parameter to
   * the `mixitup` factory function when creating a mixer instance to customise its
   * functionality as needed.
   *
   * If no configuration object is passed, the mixer instance will take on the default
   * configuration values detailed below.
   *
   * @example <caption>Example 1: Creating and passing the configuration object</caption>
   * // Create a configuration object with desired values
   *
   * var config = {
   *     animation: {
   *         enable: false
   *     },
   *     selectors: {
   *         target: '.item'
   *     }
   * };
   *
   * // Pass the configuration object to the mixitup factory function
   *
   * var mixer = mixitup(containerEl, config);
   *
   * @example <caption>Example 2: Passing the configuration object inline</caption>
   * // Typically, the configuration object is passed inline for brevity.
   *
   * var mixer = mixitup(containerEl, {
   *     controls: {
   *         live: true,
   *         toggleLogic: 'and'
   *     }
   * });
   *
   *
   * @constructor
   * @memberof    mixitup
   * @namespace
   * @public
   * @since       2.0.0
   */

  _mixitup.Config = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.animation = new _mixitup.ConfigAnimation();
    this.behavior = new _mixitup.ConfigBehavior();
    this.callbacks = new _mixitup.ConfigCallbacks();
    this.controls = new _mixitup.ConfigControls();
    this.classNames = new _mixitup.ConfigClassNames();
    this.data = new _mixitup.ConfigData();
    this.debug = new _mixitup.ConfigDebug();
    this.layout = new _mixitup.ConfigLayout();
    this.load = new _mixitup.ConfigLoad();
    this.selectors = new _mixitup.ConfigSelectors();
    this.render = new _mixitup.ConfigRender();
    this.templates = new _mixitup.ConfigTemplates();
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Config);

  _mixitup.Config.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.Config.prototype.constructor = _mixitup.Config;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.MixerDom = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.document = null;
    this.body = null;
    this.container = null;
    this.parent = null;
    this.targets = [];
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.MixerDom);

  _mixitup.MixerDom.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.MixerDom.prototype.constructor = _mixitup.MixerDom;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.UiClassNames = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.base = '';
    this.active = '';
    this.disabled = '';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.UiClassNames);

  _mixitup.UiClassNames.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.UiClassNames.prototype.constructor = _mixitup.UiClassNames;
  /**
   * An object into which all arbitrary arguments sent to '.dataset()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandDataset = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.dataset = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandDataset);

  _mixitup.CommandDataset.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandDataset.prototype.constructor = _mixitup.CommandDataset;
  /**
   * An object into which all arbitrary arguments sent to '.multimix()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandMultimix = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.filter = null;
    this.sort = null;
    this.insert = null;
    this.remove = null;
    this.changeLayout = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandMultimix);

  _mixitup.CommandMultimix.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandMultimix.prototype.constructor = _mixitup.CommandMultimix;
  /**
   * An object into which all arbitrary arguments sent to '.filter()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandFilter = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.selector = '';
    this.collection = null;
    this.action = 'show'; // enum: ['show', 'hide']

    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandFilter);

  _mixitup.CommandFilter.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandFilter.prototype.constructor = _mixitup.CommandFilter;
  /**
   * An object into which all arbitrary arguments sent to '.sort()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandSort = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.sortString = '';
    this.attribute = '';
    this.order = 'asc';
    this.collection = null;
    this.next = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandSort);

  _mixitup.CommandSort.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandSort.prototype.constructor = _mixitup.CommandSort;
  /**
   * An object into which all arbitrary arguments sent to '.insert()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandInsert = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.index = 0;
    this.collection = [];
    this.position = 'before'; // enum: ['before', 'after']

    this.sibling = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandInsert);

  _mixitup.CommandInsert.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandInsert.prototype.constructor = _mixitup.CommandInsert;
  /**
   * An object into which all arbitrary arguments sent to '.remove()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandRemove = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.targets = [];
    this.collection = [];
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandRemove);

  _mixitup.CommandRemove.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandRemove.prototype.constructor = _mixitup.CommandRemove;
  /**
   * An object into which all arbitrary arguments sent to '.changeLayout()' are mapped.
   *
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.CommandChangeLayout = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.containerClassName = '';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.CommandChangeLayout);

  _mixitup.CommandChangeLayout.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.CommandChangeLayout.prototype.constructor = _mixitup.CommandChangeLayout;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   * @param       {string}        type
   * @param       {string}        selector
   * @param       {boolean}       [live]
   * @param       {string}        [parent]
   *     An optional string representing the name of the mixer.dom property containing a reference to a parent element.
   */

  _mixitup.ControlDefinition = function (type, selector, live, parent) {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.type = type;
    this.selector = selector;
    this.live = live || false;
    this.parent = parent || '';
    this.callActions('afterConstruct');
    h.freeze(this);
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.ControlDefinition);

  _mixitup.ControlDefinition.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.ControlDefinition.prototype.constructor = _mixitup.ControlDefinition;
  _mixitup.controlDefinitions = [];

  _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('multimix', '[data-filter][data-sort]'));

  _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('filter', '[data-filter]'));

  _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('sort', '[data-sort]'));

  _mixitup.controlDefinitions.push(new _mixitup.ControlDefinition('toggle', '[data-toggle]'));
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */


  _mixitup.Control = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.el = null;
    this.selector = '';
    this.bound = [];
    this.pending = -1;
    this.type = '';
    this.status = 'inactive'; // enum: ['inactive', 'active', 'disabled', 'live']

    this.filter = '';
    this.sort = '';
    this.canDisable = false;
    this.handler = null;
    this.classNames = new _mixitup.UiClassNames();
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Control);

  _mixitup.Control.prototype = Object.create(_mixitup.Base.prototype);
  h.extend(_mixitup.Control.prototype,
  /** @lends mixitup.Control */
  {
    constructor: _mixitup.Control,

    /**
     * @private
     * @param {HTMLElement} el
     * @param {string}      type
     * @param {string}      selector
     */
    init: function init(el, type, selector) {
      var self = this;
      this.callActions('beforeInit', arguments);
      self.el = el;
      self.type = type;
      self.selector = selector;

      if (self.selector) {
        self.status = 'live';
      } else {
        self.canDisable = typeof self.el.disable === 'boolean';

        switch (self.type) {
          case 'filter':
            self.filter = self.el.getAttribute('data-filter');
            break;

          case 'toggle':
            self.filter = self.el.getAttribute('data-toggle');
            break;

          case 'sort':
            self.sort = self.el.getAttribute('data-sort');
            break;

          case 'multimix':
            self.filter = self.el.getAttribute('data-filter');
            self.sort = self.el.getAttribute('data-sort');
            break;
        }
      }

      self.bindClick();

      _mixitup.controls.push(self);

      this.callActions('afterInit', arguments);
    },

    /**
     * @private
     * @param  {mixitup.Mixer} mixer
     * @return {boolean}
     */
    isBound: function isBound(mixer) {
      var self = this,
          isBound = false;
      this.callActions('beforeIsBound', arguments);
      isBound = self.bound.indexOf(mixer) > -1;
      return self.callFilters('afterIsBound', isBound, arguments);
    },

    /**
     * @private
     * @param  {mixitup.Mixer} mixer
     * @return {void}
     */
    addBinding: function addBinding(mixer) {
      var self = this;
      this.callActions('beforeAddBinding', arguments);

      if (!self.isBound()) {
        self.bound.push(mixer);
      }

      this.callActions('afterAddBinding', arguments);
    },

    /**
     * @private
     * @param  {mixitup.Mixer} mixer
     * @return {void}
     */
    removeBinding: function removeBinding(mixer) {
      var self = this,
          removeIndex = -1;
      this.callActions('beforeRemoveBinding', arguments);

      if ((removeIndex = self.bound.indexOf(mixer)) > -1) {
        self.bound.splice(removeIndex, 1);
      }

      if (self.bound.length < 1) {
        // No bindings exist, unbind event click handlers
        self.unbindClick(); // Remove from `mixitup.controls` list

        removeIndex = _mixitup.controls.indexOf(self);

        _mixitup.controls.splice(removeIndex, 1);

        if (self.status === 'active') {
          self.renderStatus(self.el, 'inactive');
        }
      }

      this.callActions('afterRemoveBinding', arguments);
    },

    /**
     * @private
     * @return {void}
     */
    bindClick: function bindClick() {
      var self = this;
      this.callActions('beforeBindClick', arguments);

      self.handler = function (e) {
        self.handleClick(e);
      };

      h.on(self.el, 'click', self.handler);
      this.callActions('afterBindClick', arguments);
    },

    /**
     * @private
     * @return {void}
     */
    unbindClick: function unbindClick() {
      var self = this;
      this.callActions('beforeUnbindClick', arguments);
      h.off(self.el, 'click', self.handler);
      self.handler = null;
      this.callActions('afterUnbindClick', arguments);
    },

    /**
     * @private
     * @param   {MouseEvent} e
     * @return  {void}
     */
    handleClick: function handleClick(e) {
      var self = this,
          button = null,
          mixer = null,
          isActive = false,
          returnValue = void 0,
          command = {},
          clone = null,
          commands = [],
          i = -1;
      this.callActions('beforeHandleClick', arguments);
      this.pending = 0;
      mixer = self.bound[0];

      if (!self.selector) {
        button = self.el;
      } else {
        button = h.closestParent(e.target, mixer.config.selectors.control + self.selector, true, mixer.dom.document);
      }

      if (!button) {
        self.callActions('afterHandleClick', arguments);
        return;
      }

      switch (self.type) {
        case 'filter':
          command.filter = self.filter || button.getAttribute('data-filter');
          break;

        case 'sort':
          command.sort = self.sort || button.getAttribute('data-sort');
          break;

        case 'multimix':
          command.filter = self.filter || button.getAttribute('data-filter');
          command.sort = self.sort || button.getAttribute('data-sort');
          break;

        case 'toggle':
          command.filter = self.filter || button.getAttribute('data-toggle');

          if (self.status === 'live') {
            isActive = h.hasClass(button, self.classNames.active);
          } else {
            isActive = self.status === 'active';
          }

          break;
      }

      for (i = 0; i < self.bound.length; i++) {
        // Create a clone of the command for each bound mixer instance
        clone = new _mixitup.CommandMultimix();
        h.extend(clone, command);
        commands.push(clone);
      }

      commands = self.callFilters('commandsHandleClick', commands, arguments);
      self.pending = self.bound.length;

      for (i = 0; mixer = self.bound[i]; i++) {
        command = commands[i];

        if (!command) {
          // An extension may set a command null to indicate that the click should not be handled
          continue;
        }

        if (!mixer.lastClicked) {
          mixer.lastClicked = button;
        }

        _mixitup.events.fire('mixClick', mixer.dom.container, {
          state: mixer.state,
          instance: mixer,
          originalEvent: e,
          control: mixer.lastClicked
        }, mixer.dom.document);

        if (typeof mixer.config.callbacks.onMixClick === 'function') {
          returnValue = mixer.config.callbacks.onMixClick.call(mixer.lastClicked, mixer.state, e, mixer);

          if (returnValue === false) {
            // User has returned `false` from the callback, so do not handle click
            continue;
          }
        }

        if (self.type === 'toggle') {
          isActive ? mixer.toggleOff(command.filter) : mixer.toggleOn(command.filter);
        } else {
          mixer.multimix(command);
        }
      }

      this.callActions('afterHandleClick', arguments);
    },

    /**
     * @param   {object}          command
     * @param   {Array<string>}   toggleArray
     * @return  {void}
     */
    update: function update(command, toggleArray) {
      var self = this,
          actions = new _mixitup.CommandMultimix();
      self.callActions('beforeUpdate', arguments);
      self.pending--;
      self.pending = Math.max(0, self.pending);
      if (self.pending > 0) return;

      if (self.status === 'live') {
        // Live control (status unknown)
        self.updateLive(command, toggleArray);
      } else {
        // Static control
        actions.sort = self.sort;
        actions.filter = self.filter;
        self.callFilters('actionsUpdate', actions, arguments);
        self.parseStatusChange(self.el, command, actions, toggleArray);
      }

      self.callActions('afterUpdate', arguments);
    },

    /**
     * @param   {mixitup.CommandMultimix} command
     * @param   {Array<string>}           toggleArray
     * @return  {void}
     */
    updateLive: function updateLive(command, toggleArray) {
      var self = this,
          controlButtons = null,
          actions = null,
          button = null,
          i = -1;
      self.callActions('beforeUpdateLive', arguments);
      if (!self.el) return;
      controlButtons = self.el.querySelectorAll(self.selector);

      for (i = 0; button = controlButtons[i]; i++) {
        actions = new _mixitup.CommandMultimix();

        switch (self.type) {
          case 'filter':
            actions.filter = button.getAttribute('data-filter');
            break;

          case 'sort':
            actions.sort = button.getAttribute('data-sort');
            break;

          case 'multimix':
            actions.filter = button.getAttribute('data-filter');
            actions.sort = button.getAttribute('data-sort');
            break;

          case 'toggle':
            actions.filter = button.getAttribute('data-toggle');
            break;
        }

        actions = self.callFilters('actionsUpdateLive', actions, arguments);
        self.parseStatusChange(button, command, actions, toggleArray);
      }

      self.callActions('afterUpdateLive', arguments);
    },

    /**
     * @param   {HTMLElement}             button
     * @param   {mixitup.CommandMultimix} command
     * @param   {mixitup.CommandMultimix} actions
     * @param   {Array<string>}           toggleArray
     * @return  {void}
     */
    parseStatusChange: function parseStatusChange(button, command, actions, toggleArray) {
      var self = this,
          alias = '',
          toggle = '',
          i = -1;
      self.callActions('beforeParseStatusChange', arguments);

      switch (self.type) {
        case 'filter':
          if (command.filter === actions.filter) {
            self.renderStatus(button, 'active');
          } else {
            self.renderStatus(button, 'inactive');
          }

          break;

        case 'multimix':
          if (command.sort === actions.sort && command.filter === actions.filter) {
            self.renderStatus(button, 'active');
          } else {
            self.renderStatus(button, 'inactive');
          }

          break;

        case 'sort':
          if (command.sort.match(/:asc/g)) {
            alias = command.sort.replace(/:asc/g, '');
          }

          if (command.sort === actions.sort || alias === actions.sort) {
            self.renderStatus(button, 'active');
          } else {
            self.renderStatus(button, 'inactive');
          }

          break;

        case 'toggle':
          if (toggleArray.length < 1) self.renderStatus(button, 'inactive');

          if (command.filter === actions.filter) {
            self.renderStatus(button, 'active');
          }

          for (i = 0; i < toggleArray.length; i++) {
            toggle = toggleArray[i];

            if (toggle === actions.filter) {
              // Button matches one active toggle
              self.renderStatus(button, 'active');
              break;
            }

            self.renderStatus(button, 'inactive');
          }

          break;
      }

      self.callActions('afterParseStatusChange', arguments);
    },

    /**
     * @param   {HTMLElement}   button
     * @param   {string}        status
     * @return  {void}
     */
    renderStatus: function renderStatus(button, status) {
      var self = this;
      self.callActions('beforeRenderStatus', arguments);

      switch (status) {
        case 'active':
          h.addClass(button, self.classNames.active);
          h.removeClass(button, self.classNames.disabled);
          if (self.canDisable) self.el.disabled = false;
          break;

        case 'inactive':
          h.removeClass(button, self.classNames.active);
          h.removeClass(button, self.classNames.disabled);
          if (self.canDisable) self.el.disabled = false;
          break;

        case 'disabled':
          if (self.canDisable) self.el.disabled = true;
          h.addClass(button, self.classNames.disabled);
          h.removeClass(button, self.classNames.active);
          break;
      }

      if (self.status !== 'live') {
        // Update the control's status propery if not live
        self.status = status;
      }

      self.callActions('afterRenderStatus', arguments);
    }
  });
  _mixitup.controls = [];
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.StyleData = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.x = 0;
    this.y = 0;
    this.top = 0;
    this.right = 0;
    this.bottom = 0;
    this.left = 0;
    this.width = 0;
    this.height = 0;
    this.marginRight = 0;
    this.marginBottom = 0;
    this.opacity = 0;
    this.scale = new _mixitup.TransformData();
    this.translateX = new _mixitup.TransformData();
    this.translateY = new _mixitup.TransformData();
    this.translateZ = new _mixitup.TransformData();
    this.rotateX = new _mixitup.TransformData();
    this.rotateY = new _mixitup.TransformData();
    this.rotateZ = new _mixitup.TransformData();
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.StyleData);

  _mixitup.StyleData.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.StyleData.prototype.constructor = _mixitup.StyleData;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.TransformData = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.value = 0;
    this.unit = '';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.TransformData);

  _mixitup.TransformData.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.TransformData.prototype.constructor = _mixitup.TransformData;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.TransformDefaults = function () {
    _mixitup.StyleData.apply(this);

    this.callActions('beforeConstruct');
    this.scale.value = 0.01;
    this.scale.unit = '';
    this.translateX.value = 20;
    this.translateX.unit = 'px';
    this.translateY.value = 20;
    this.translateY.unit = 'px';
    this.translateZ.value = 20;
    this.translateZ.unit = 'px';
    this.rotateX.value = 90;
    this.rotateX.unit = 'deg';
    this.rotateY.value = 90;
    this.rotateY.unit = 'deg';
    this.rotateX.value = 90;
    this.rotateX.unit = 'deg';
    this.rotateZ.value = 180;
    this.rotateZ.unit = 'deg';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.TransformDefaults);

  _mixitup.TransformDefaults.prototype = Object.create(_mixitup.StyleData.prototype);
  _mixitup.TransformDefaults.prototype.constructor = _mixitup.TransformDefaults;
  /**
   * @private
   * @static
   * @since   3.0.0
   * @type    {mixitup.TransformDefaults}
   */

  _mixitup.transformDefaults = new _mixitup.TransformDefaults();
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.EventDetail = function () {
    this.state = null;
    this.futureState = null;
    this.instance = null;
    this.originalEvent = null;
  };
  /**
   * The `mixitup.Events` class contains all custom events dispatched by MixItUp at various
   * points within the lifecycle of a mixer operation.
   *
   * Each event is analogous to the callback function of the same name defined in
   * the `callbacks` configuration object, and is triggered immediately before it.
   *
   * Events are always triggered from the container element on which MixItUp is instantiated
   * upon.
   *
   * As with any event, registered event handlers receive the event object as a parameter
   * which includes a `detail` property containting references to the current `state`,
   * the `mixer` instance, and other event-specific properties described below.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @public
   * @since       3.0.0
   */


  _mixitup.Events = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * A custom event triggered immediately after any MixItUp operation is requested
     * and before animations have begun.
     *
     * The `mixStart` event also exposes a `futureState` property via the
     * `event.detail` object, which represents the final state of the mixer once
     * the requested operation has completed.
     *
     * @name        mixStart
     * @memberof    mixitup.Events
     * @static
     * @type        {CustomEvent}
     */

    this.mixStart = null;
    /**
     * A custom event triggered when a MixItUp operation is requested while another
     * operation is in progress, and the animation queue is full, or queueing
     * is disabled.
     *
     * @name        mixBusy
     * @memberof    mixitup.Events
     * @static
     * @type        {CustomEvent}
     */

    this.mixBusy = null;
    /**
     * A custom event triggered after any MixItUp operation has completed, and the
     * state has been updated.
     *
     * @name        mixEnd
     * @memberof    mixitup.Events
     * @static
     * @type        {CustomEvent}
     */

    this.mixEnd = null;
    /**
     * A custom event triggered whenever a filter operation "fails", i.e. no targets
     * could be found matching the requested filter.
     *
     * @name        mixFail
     * @memberof    mixitup.Events
     * @static
     * @type        {CustomEvent}
     */

    this.mixFail = null;
    /**
     * A custom event triggered whenever a MixItUp control is clicked, and before its
     * respective operation is requested.
     *
     * This event also exposes an `originalEvent` property via the `event.detail`
     * object, which holds a reference to the original click event.
     *
     * @name        mixClick
     * @memberof    mixitup.Events
     * @static
     * @type        {CustomEvent}
     */

    this.mixClick = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Events);

  _mixitup.Events.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.Events.prototype.constructor = _mixitup.Events;
  /**
   * @private
   * @param   {string}      eventType
   * @param   {Element}     el
   * @param   {object}      detail
   * @param   {Document}    [doc]
   */

  _mixitup.Events.prototype.fire = function (eventType, el, detail, doc) {
    var self = this,
        event = null,
        eventDetail = new _mixitup.EventDetail();
    self.callActions('beforeFire', arguments);

    if (typeof self[eventType] === 'undefined') {
      throw new Error('Event type "' + eventType + '" not found.');
    }

    eventDetail.state = new _mixitup.State();
    h.extend(eventDetail.state, detail.state);

    if (detail.futureState) {
      eventDetail.futureState = new _mixitup.State();
      h.extend(eventDetail.futureState, detail.futureState);
    }

    eventDetail.instance = detail.instance;

    if (detail.originalEvent) {
      eventDetail.originalEvent = detail.originalEvent;
    }

    event = h.getCustomEvent(eventType, eventDetail, doc);
    self.callFilters('eventFire', event, arguments);
    el.dispatchEvent(event);
  }; // Asign a singleton instance to `mixitup.events`:


  _mixitup.events = new _mixitup.Events();
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.QueueItem = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.args = [];
    this.instruction = null;
    this.triggerElement = null;
    this.deferred = null;
    this.isToggling = false;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.QueueItem);

  _mixitup.QueueItem.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.QueueItem.prototype.constructor = _mixitup.QueueItem;
  /**
   * The `mixitup.Mixer` class is used to hold discreet, user-configured
   * instances of MixItUp on a provided container element.
   *
   * Mixer instances are returned whenever the `mixitup()` factory function is called,
   * which expose a range of methods enabling API-based filtering, sorting,
   * insertion, removal and more.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @public
   * @since       3.0.0
   */

  _mixitup.Mixer = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.config = new _mixitup.Config();
    this.id = '';
    this.isBusy = false;
    this.isToggling = false;
    this.incPadding = true;
    this.controls = [];
    this.targets = [];
    this.origOrder = [];
    this.cache = {};
    this.toggleArray = [];
    this.targetsMoved = 0;
    this.targetsImmovable = 0;
    this.targetsBound = 0;
    this.targetsDone = 0;
    this.staggerDuration = 0;
    this.effectsIn = null;
    this.effectsOut = null;
    this.transformIn = [];
    this.transformOut = [];
    this.queue = [];
    this.state = null;
    this.lastOperation = null;
    this.lastClicked = null;
    this.userCallback = null;
    this.userDeferred = null;
    this.dom = new _mixitup.MixerDom();
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Mixer);

  _mixitup.Mixer.prototype = Object.create(_mixitup.Base.prototype);
  h.extend(_mixitup.Mixer.prototype,
  /** @lends mixitup.Mixer */
  {
    constructor: _mixitup.Mixer,

    /**
     * @private
     * @instance
     * @since 3.0.0
     * @param {HTMLElement} container
     * @param {HTMLElement} document
     * @param {string}      id
     * @param {object}      [config]
     */
    attach: function attach(container, document, id, config) {
      var self = this,
          target = null,
          i = -1;
      self.callActions('beforeAttach', arguments);
      self.id = id;

      if (config) {
        h.extend(self.config, config, true, true);
      }

      self.sanitizeConfig();
      self.cacheDom(container, document);

      if (self.config.layout.containerClassName) {
        h.addClass(self.dom.container, self.config.layout.containerClassName);
      }

      if (!_mixitup.features.has.transitions) {
        self.config.animation.enable = false;
      }

      if (typeof window.console === 'undefined') {
        self.config.debug.showWarnings = false;
      }

      if (self.config.data.uidKey) {
        // If the dataset API is in use, force disable controls
        self.config.controls.enable = false;
      }

      self.indexTargets();
      self.state = self.getInitialState();

      for (i = 0; target = self.lastOperation.toHide[i]; i++) {
        target.hide();
      }

      if (self.config.controls.enable) {
        self.initControls();
        self.buildToggleArray(null, self.state);
        self.updateControls({
          filter: self.state.activeFilter,
          sort: self.state.activeSort
        });
      }

      self.parseEffects();
      self.callActions('afterAttach', arguments);
    },

    /**
     * @private
     * @instance
     * @since 3.0.0
     * @return {void}
     */
    sanitizeConfig: function sanitizeConfig() {
      var self = this;
      self.callActions('beforeSanitizeConfig', arguments); // Sanitize enum/string config options

      self.config.controls.scope = self.config.controls.scope.toLowerCase().trim();
      self.config.controls.toggleLogic = self.config.controls.toggleLogic.toLowerCase().trim();
      self.config.controls.toggleDefault = self.config.controls.toggleDefault.toLowerCase().trim();
      self.config.animation.effects = self.config.animation.effects.trim();
      self.callActions('afterSanitizeConfig', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @return  {mixitup.State}
     */
    getInitialState: function getInitialState() {
      var self = this,
          state = new _mixitup.State(),
          operation = new _mixitup.Operation();
      self.callActions('beforeGetInitialState', arguments); // Map initial values into a mock state object in order to construct an operation

      state.activeContainerClassName = self.config.layout.containerClassName;

      if (self.config.load.dataset) {
        // Dataset API
        if (!self.config.data.uidKey || typeof self.config.data.uidKey !== 'string') {
          throw new TypeError(_mixitup.messages.errorConfigDataUidKeyNotSet());
        }

        operation.startDataset = operation.newDataset = state.activeDataset = self.config.load.dataset.slice();
        operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;
        operation.show = self.targets.slice();
        state = self.callFilters('stateGetInitialState', state, arguments);
      } else {
        // DOM API
        state.activeFilter = self.parseFilterArgs([self.config.load.filter]).command;
        state.activeSort = self.parseSortArgs([self.config.load.sort]).command;
        state.totalTargets = self.targets.length;
        state = self.callFilters('stateGetInitialState', state, arguments);

        if (state.activeSort.collection || state.activeSort.attribute || state.activeSort.order === 'random' || state.activeSort.order === 'desc') {
          // Sorting on load
          operation.newSort = state.activeSort;
          self.sortOperation(operation);
          self.printSort(false, operation);
          self.targets = operation.newOrder;
        } else {
          operation.startOrder = operation.newOrder = self.targets;
        }

        operation.startFilter = operation.newFilter = state.activeFilter;
        operation.startSort = operation.newSort = state.activeSort;
        operation.startContainerClassName = operation.newContainerClassName = state.activeContainerClassName;

        if (operation.newFilter.selector === 'all') {
          operation.newFilter.selector = self.config.selectors.target;
        } else if (operation.newFilter.selector === 'none') {
          operation.newFilter.selector = '';
        }
      }

      operation = self.callFilters('operationGetInitialState', operation, [state]);
      self.lastOperation = operation;

      if (operation.newFilter) {
        self.filterOperation(operation);
      }

      state = self.buildState(operation);
      return state;
    },

    /**
     * Caches references of DOM elements neccessary for the mixer's functionality.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {HTMLElement}       el
     * @param   {HTMLHtmlElement}   document
     * @return  {void}
     */
    cacheDom: function cacheDom(el, document) {
      var self = this;
      self.callActions('beforeCacheDom', arguments);
      self.dom.document = document;
      self.dom.body = self.dom.document.querySelector('body');
      self.dom.container = el;
      self.dom.parent = el;
      self.callActions('afterCacheDom', arguments);
    },

    /**
     * Indexes all child elements of the mixer matching the `selectors.target`
     * selector, instantiating a mixitup.Target for each one.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @return  {void}
     */
    indexTargets: function indexTargets() {
      var self = this,
          target = null,
          el = null,
          dataset = null,
          i = -1;
      self.callActions('beforeIndexTargets', arguments);
      self.dom.targets = self.config.layout.allowNestedTargets ? self.dom.container.querySelectorAll(self.config.selectors.target) : h.children(self.dom.container, self.config.selectors.target, self.dom.document);
      self.dom.targets = h.arrayFromList(self.dom.targets);
      self.targets = [];

      if ((dataset = self.config.load.dataset) && dataset.length !== self.dom.targets.length) {
        throw new Error(_mixitup.messages.errorDatasetPrerenderedMismatch());
      }

      if (self.dom.targets.length) {
        for (i = 0; el = self.dom.targets[i]; i++) {
          target = new _mixitup.Target();
          target.init(el, self, dataset ? dataset[i] : void 0);
          target.isInDom = true;
          self.targets.push(target);
        }

        self.dom.parent = self.dom.targets[0].parentElement === self.dom.container ? self.dom.container : self.dom.targets[0].parentElement;
      }

      self.origOrder = self.targets;
      self.callActions('afterIndexTargets', arguments);
    },
    initControls: function initControls() {
      var self = this,
          definition = '',
          controlElements = null,
          el = null,
          parent = null,
          delagators = null,
          control = null,
          i = -1,
          j = -1;
      self.callActions('beforeInitControls', arguments);

      switch (self.config.controls.scope) {
        case 'local':
          parent = self.dom.container;
          break;

        case 'global':
          parent = self.dom.document;
          break;

        default:
          throw new Error(_mixitup.messages.errorConfigInvalidControlsScope());
      }

      for (i = 0; definition = _mixitup.controlDefinitions[i]; i++) {
        if (self.config.controls.live || definition.live) {
          if (definition.parent) {
            delagators = self.dom[definition.parent];
            if (!delagators || delagators.length < 0) continue;

            if (typeof delagators.length !== 'number') {
              delagators = [delagators];
            }
          } else {
            delagators = [parent];
          }

          for (j = 0; el = delagators[j]; j++) {
            control = self.getControl(el, definition.type, definition.selector);
            self.controls.push(control);
          }
        } else {
          controlElements = parent.querySelectorAll(self.config.selectors.control + definition.selector);

          for (j = 0; el = controlElements[j]; j++) {
            control = self.getControl(el, definition.type, '');
            if (!control) continue;
            self.controls.push(control);
          }
        }
      }

      self.callActions('afterInitControls', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {HTMLElement} el
     * @param   {string}      type
     * @param   {string}      selector
     * @return  {mixitup.Control|null}
     */
    getControl: function getControl(el, type, selector) {
      var self = this,
          control = null,
          i = -1;
      self.callActions('beforeGetControl', arguments);

      if (!selector) {
        // Static controls only
        for (i = 0; control = _mixitup.controls[i]; i++) {
          if (control.el === el && control.isBound(self)) {
            // Control already bound to this mixer (as another type).
            // NB: This prevents duplicate controls from being registered where a selector
            // might collide, eg: "[data-filter]" and "[data-filter][data-sort]"
            return self.callFilters('controlGetControl', null, arguments);
          } else if (control.el === el && control.type === type && control.selector === selector) {
            // Another mixer is already using this control, add this mixer as a binding
            control.addBinding(self);
            return self.callFilters('controlGetControl', control, arguments);
          }
        }
      } // Create new control


      control = new _mixitup.Control();
      control.init(el, type, selector);
      control.classNames.base = h.getClassname(self.config.classNames, type);
      control.classNames.active = h.getClassname(self.config.classNames, type, self.config.classNames.modifierActive);
      control.classNames.disabled = h.getClassname(self.config.classNames, type, self.config.classNames.modifierDisabled); // Add a reference to this mixer as a binding

      control.addBinding(self);
      return self.callFilters('controlGetControl', control, arguments);
    },

    /**
     * Creates a compound selector by joining the `toggleArray` value as per the
     * defined toggle logic.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @return  {string}
     */
    getToggleSelector: function getToggleSelector() {
      var self = this,
          delineator = self.config.controls.toggleLogic === 'or' ? ', ' : '',
          toggleSelector = '';
      self.callActions('beforeGetToggleSelector', arguments);
      self.toggleArray = h.clean(self.toggleArray);
      toggleSelector = self.toggleArray.join(delineator);

      if (toggleSelector === '') {
        toggleSelector = self.config.controls.toggleDefault;
      }

      return self.callFilters('selectorGetToggleSelector', toggleSelector, arguments);
    },

    /**
     * Breaks compound selector strings in an array of discreet selectors,
     * as per the active `controls.toggleLogic` configuration option. Accepts
     * either a dynamic command object, or a state object.
     *
     * @private
     * @instance
     * @since   2.0.0
     * @param   {object}        [command]
     * @param   {mixitup.State} [state]
     * @return  {void}
     */
    buildToggleArray: function buildToggleArray(command, state) {
      var self = this,
          activeFilterSelector = '';
      self.callActions('beforeBuildToggleArray', arguments);

      if (command && command.filter) {
        activeFilterSelector = command.filter.selector.replace(/\s/g, '');
      } else if (state) {
        activeFilterSelector = state.activeFilter.selector.replace(/\s/g, '');
      } else {
        return;
      }

      if (activeFilterSelector === self.config.selectors.target || activeFilterSelector === 'all') {
        activeFilterSelector = '';
      }

      if (self.config.controls.toggleLogic === 'or') {
        self.toggleArray = activeFilterSelector.split(',');
      } else {
        self.toggleArray = self.splitCompoundSelector(activeFilterSelector);
      }

      self.toggleArray = h.clean(self.toggleArray);
      self.callActions('afterBuildToggleArray', arguments);
    },

    /**
     * Takes a compound selector (e.g. `.cat-1.cat-2`, `[data-cat="1"][data-cat="2"]`)
     * and breaks into its individual selectors.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string} compoundSelector
     * @return  {string[]}
     */
    splitCompoundSelector: function splitCompoundSelector(compoundSelector) {
      // Break at a `.` or `[`, capturing the delineator
      var partials = compoundSelector.split(/([\.\[])/g),
          toggleArray = [],
          selector = '',
          i = -1;

      if (partials[0] === '') {
        partials.shift();
      }

      for (i = 0; i < partials.length; i++) {
        if (i % 2 === 0) {
          selector = '';
        }

        selector += partials[i];

        if (i % 2 !== 0) {
          toggleArray.push(selector);
        }
      }

      return toggleArray;
    },

    /**
     * Updates controls to their active/inactive state based on the command or
     * current state of the mixer.
     *
     * @private
     * @instance
     * @since   2.0.0
     * @param   {object} command
     * @return  {void}
     */
    updateControls: function updateControls(command) {
      var self = this,
          control = null,
          output = new _mixitup.CommandMultimix(),
          i = -1;
      self.callActions('beforeUpdateControls', arguments); // Sanitise to defaults

      if (command.filter) {
        output.filter = command.filter.selector;
      } else {
        output.filter = self.state.activeFilter.selector;
      }

      if (command.sort) {
        output.sort = self.buildSortString(command.sort);
      } else {
        output.sort = self.buildSortString(self.state.activeSort);
      }

      if (output.filter === self.config.selectors.target) {
        output.filter = 'all';
      }

      if (output.filter === '') {
        output.filter = 'none';
      }

      h.freeze(output);

      for (i = 0; control = self.controls[i]; i++) {
        control.update(output, self.toggleArray);
      }

      self.callActions('afterUpdateControls', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.CommandSort}   command
     * @return  {string}
     */
    buildSortString: function buildSortString(command) {
      var self = this;
      var output = '';
      output += command.sortString;

      if (command.next) {
        output += ' ' + self.buildSortString(command.next);
      }

      return output;
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {object}        command
     * @param   {Operation}     operation
     * @return  {Promise.<mixitup.State>}
     */
    insertTargets: function insertTargets(command, operation) {
      var self = this,
          nextSibling = null,
          insertionIndex = -1,
          frag = null,
          target = null,
          el = null,
          i = -1;
      self.callActions('beforeInsertTargets', arguments);
      if (typeof command.index === 'undefined') command.index = 0;
      nextSibling = self.getNextSibling(command.index, command.sibling, command.position);
      frag = self.dom.document.createDocumentFragment();

      if (nextSibling) {
        insertionIndex = h.index(nextSibling, self.config.selectors.target);
      } else {
        insertionIndex = self.targets.length;
      }

      if (command.collection) {
        for (i = 0; el = command.collection[i]; i++) {
          if (self.dom.targets.indexOf(el) > -1) {
            throw new Error(_mixitup.messages.errorInsertPreexistingElement());
          } // Ensure elements are hidden when they are added to the DOM, so they can
          // be animated in gracefully


          el.style.display = 'none';
          frag.appendChild(el);
          frag.appendChild(self.dom.document.createTextNode(' '));
          if (!h.isElement(el, self.dom.document) || !el.matches(self.config.selectors.target)) continue;
          target = new _mixitup.Target();
          target.init(el, self);
          target.isInDom = true;
          self.targets.splice(insertionIndex, 0, target);
          insertionIndex++;
        }

        self.dom.parent.insertBefore(frag, nextSibling);
      } // Since targets have been added, the original order must be updated


      operation.startOrder = self.origOrder = self.targets;
      self.callActions('afterInsertTargets', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Number}      [index]
     * @param   {Element}     [sibling]
     * @param   {string}      [position]
     * @return  {Element}
     */
    getNextSibling: function getNextSibling(index, sibling, position) {
      var self = this,
          element = null;
      index = Math.max(index, 0);

      if (sibling && position === 'before') {
        // Explicit sibling
        element = sibling;
      } else if (sibling && position === 'after') {
        // Explicit sibling
        element = sibling.nextElementSibling || null;
      } else if (self.targets.length > 0 && typeof index !== 'undefined') {
        // Index and targets exist
        element = index < self.targets.length || !self.targets.length ? self.targets[index].dom.el : self.targets[self.targets.length - 1].dom.el.nextElementSibling;
      } else if (self.targets.length === 0 && self.dom.parent.children.length > 0) {
        // No targets but other siblings
        if (self.config.layout.siblingAfter) {
          element = self.config.layout.siblingAfter;
        } else if (self.config.layout.siblingBefore) {
          element = self.config.layout.siblingBefore.nextElementSibling;
        } else {
          self.dom.parent.children[0];
        }
      } else {
        element === null;
      }

      return self.callFilters('elementGetNextSibling', element, arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    filterOperation: function filterOperation(operation) {
      var self = this,
          testResult = false,
          index = -1,
          action = '',
          target = null,
          i = -1;
      self.callActions('beforeFilterOperation', arguments);
      action = operation.newFilter.action;

      for (i = 0; target = operation.newOrder[i]; i++) {
        if (operation.newFilter.collection) {
          // show via collection
          testResult = operation.newFilter.collection.indexOf(target.dom.el) > -1;
        } else {
          // show via selector
          if (operation.newFilter.selector === '') {
            testResult = false;
          } else {
            testResult = target.dom.el.matches(operation.newFilter.selector);
          }
        }

        self.evaluateHideShow(testResult, target, action, operation);
      }

      if (operation.toRemove.length) {
        for (i = 0; target = operation.show[i]; i++) {
          if (operation.toRemove.indexOf(target) > -1) {
            // If any shown targets should be removed, move them into the toHide array
            operation.show.splice(i, 1);

            if ((index = operation.toShow.indexOf(target)) > -1) {
              operation.toShow.splice(index, 1);
            }

            operation.toHide.push(target);
            operation.hide.push(target);
            i--;
          }
        }
      }

      operation.matching = operation.show.slice();

      if (operation.show.length === 0 && operation.newFilter.selector !== '' && self.targets.length !== 0) {
        operation.hasFailed = true;
      }

      self.callActions('afterFilterOperation', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {boolean}   testResult
     * @param   {Element}   target
     * @param   {string}    action
     * @param   {Operation} operation
     * @return  {void}
     */
    evaluateHideShow: function evaluateHideShow(testResult, target, action, operation) {
      var self = this;
      self.callActions('beforeEvaluateHideShow', arguments);

      if (testResult === true && action === 'show' || testResult === false && action === 'hide') {
        operation.show.push(target);
        !target.isShown && operation.toShow.push(target);
      } else {
        operation.hide.push(target);
        target.isShown && operation.toHide.push(target);
      }

      self.callActions('afterEvaluateHideShow', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    sortOperation: function sortOperation(operation) {
      var self = this;
      self.callActions('beforeSortOperation', arguments);
      operation.startOrder = self.targets;

      if (operation.newSort.collection) {
        // Sort by collection
        operation.newOrder = operation.newSort.collection;
      } else if (operation.newSort.order === 'random') {
        // Sort random
        operation.newOrder = h.arrayShuffle(operation.startOrder);
      } else if (operation.newSort.attribute === '') {
        // Sort by default
        operation.newOrder = self.origOrder.slice();

        if (operation.newSort.order === 'desc') {
          operation.newOrder.reverse();
        }
      } else {
        // Sort by attribute
        operation.newOrder = operation.startOrder.slice();
        operation.newOrder.sort(function (a, b) {
          return self.compare(a, b, operation.newSort);
        });
      }

      if (h.isEqualArray(operation.newOrder, operation.startOrder)) {
        operation.willSort = false;
      }

      self.callActions('afterSortOperation', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {mixitup.Target}        a
     * @param   {mixitup.Target}        b
     * @param   {mixitup.CommandSort}   command
     * @return  {Number}
     */
    compare: function compare(a, b, command) {
      var self = this,
          order = command.order,
          attrA = self.getAttributeValue(a, command.attribute),
          attrB = self.getAttributeValue(b, command.attribute);

      if (isNaN(attrA * 1) || isNaN(attrB * 1)) {
        attrA = attrA.toLowerCase();
        attrB = attrB.toLowerCase();
      } else {
        attrA = attrA * 1;
        attrB = attrB * 1;
      }

      if (attrA < attrB) {
        return order === 'asc' ? -1 : 1;
      }

      if (attrA > attrB) {
        return order === 'asc' ? 1 : -1;
      }

      if (attrA === attrB && command.next) {
        return self.compare(a, b, command.next);
      }

      return 0;
    },

    /**
     * Reads the values of any data attributes present the provided target element
     * which match the current sort command.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.Target}    target
     * @param   {string}            [attribute]
     * @return  {(String|Number)}
     */
    getAttributeValue: function getAttributeValue(target, attribute) {
      var self = this,
          value = '';
      value = target.dom.el.getAttribute('data-' + attribute);

      if (value === null) {
        if (self.config.debug.showWarnings) {
          // Encourage users to assign values to all targets to avoid erroneous sorting
          // when types are mixed
          console.warn(_mixitup.messages.warningInconsistentSortingAttributes({
            attribute: 'data-' + attribute
          }));
        }
      } // If an attribute is not present, return 0 as a safety value


      return self.callFilters('valueGetAttributeValue', value || 0, arguments);
    },

    /**
     * Inserts elements into the DOM in the appropriate
     * order using a document fragment for minimal
     * DOM thrashing
     *
     * @private
     * @instance
     * @since   2.0.0
     * @param   {boolean}   isResetting
     * @param   {Operation} operation
     * @return  {void}
     */
    printSort: function printSort(isResetting, operation) {
      var self = this,
          startOrder = isResetting ? operation.newOrder : operation.startOrder,
          newOrder = isResetting ? operation.startOrder : operation.newOrder,
          nextSibling = startOrder.length ? startOrder[startOrder.length - 1].dom.el.nextElementSibling : null,
          frag = window.document.createDocumentFragment(),
          whitespace = null,
          target = null,
          el = null,
          i = -1;
      self.callActions('beforePrintSort', arguments); // Empty the container

      for (i = 0; target = startOrder[i]; i++) {
        el = target.dom.el;
        if (el.style.position === 'absolute') continue;
        h.removeWhitespace(el.previousSibling);
        el.parentElement.removeChild(el);
      }

      whitespace = nextSibling ? nextSibling.previousSibling : self.dom.parent.lastChild;

      if (whitespace && whitespace.nodeName === '#text') {
        h.removeWhitespace(whitespace);
      }

      for (i = 0; target = newOrder[i]; i++) {
        // Add targets into a document fragment
        el = target.dom.el;

        if (h.isElement(frag.lastChild)) {
          frag.appendChild(window.document.createTextNode(' '));
        }

        frag.appendChild(el);
      } // Insert the document fragment into the container
      // before any other non-target elements


      if (self.dom.parent.firstChild && self.dom.parent.firstChild !== nextSibling) {
        frag.insertBefore(window.document.createTextNode(' '), frag.childNodes[0]);
      }

      if (nextSibling) {
        frag.appendChild(window.document.createTextNode(' '));
        self.dom.parent.insertBefore(frag, nextSibling);
      } else {
        self.dom.parent.appendChild(frag);
      }

      self.callActions('afterPrintSort', arguments);
    },

    /**
     * Parses user-defined sort strings (i.e. `default:asc`) into sort commands objects.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string}                sortString
     * @param   {mixitup.CommandSort}   command
     * @return  {mixitup.CommandSort}
     */
    parseSortString: function parseSortString(sortString, command) {
      var self = this,
          rules = sortString.split(' '),
          current = command,
          rule = [],
          i = -1; // command.sortString = sortString;

      for (i = 0; i < rules.length; i++) {
        rule = rules[i].split(':');
        current.sortString = rules[i];
        current.attribute = h.dashCase(rule[0]);
        current.order = rule[1] || 'asc';

        switch (current.attribute) {
          case 'default':
            // treat "default" as sorting by no attribute
            current.attribute = '';
            break;

          case 'random':
            // treat "random" as an order not an attribute
            current.attribute = '';
            current.order = 'random';
            break;
        }

        if (!current.attribute || current.order === 'random') break;

        if (i < rules.length - 1) {
          // Embed reference to the next command
          current.next = new _mixitup.CommandSort();
          h.freeze(current);
          current = current.next;
        }
      }

      return self.callFilters('commandsParseSort', command, arguments);
    },

    /**
     * Parses all effects out of the user-defined `animation.effects` string into
     * their respective properties and units.
     *
     * @private
     * @instance
     * @since   2.0.0
     * @return  {void}
     */
    parseEffects: function parseEffects() {
      var self = this,
          transformName = '',
          effectsIn = self.config.animation.effectsIn || self.config.animation.effects,
          effectsOut = self.config.animation.effectsOut || self.config.animation.effects;
      self.callActions('beforeParseEffects', arguments);
      self.effectsIn = new _mixitup.StyleData();
      self.effectsOut = new _mixitup.StyleData();
      self.transformIn = [];
      self.transformOut = [];
      self.effectsIn.opacity = self.effectsOut.opacity = 1;
      self.parseEffect('fade', effectsIn, self.effectsIn, self.transformIn);
      self.parseEffect('fade', effectsOut, self.effectsOut, self.transformOut, true);

      for (transformName in _mixitup.transformDefaults) {
        if (!(_mixitup.transformDefaults[transformName] instanceof _mixitup.TransformData)) {
          continue;
        }

        self.parseEffect(transformName, effectsIn, self.effectsIn, self.transformIn);
        self.parseEffect(transformName, effectsOut, self.effectsOut, self.transformOut, true);
      }

      self.parseEffect('stagger', effectsIn, self.effectsIn, self.transformIn);
      self.parseEffect('stagger', effectsOut, self.effectsOut, self.transformOut, true);
      self.callActions('afterParseEffects', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {string}    effectName
     * @param   {string}    effectString
     * @param   {StyleData} effects
     * @param   {String[]}  transform
     * @param   {boolean}   [isOut]
     */
    parseEffect: function parseEffect(effectName, effectString, effects, transform, isOut) {
      var self = this,
          re = /\(([^)]+)\)/,
          propIndex = -1,
          str = '',
          match = [],
          val = '',
          units = ['%', 'px', 'em', 'rem', 'vh', 'vw', 'deg'],
          unit = '',
          i = -1;
      self.callActions('beforeParseEffect', arguments);

      if (typeof effectString !== 'string') {
        throw new TypeError(_mixitup.messages.errorConfigInvalidAnimationEffects());
      }

      if (effectString.indexOf(effectName) < 0) {
        // The effect is not present in the effects string
        if (effectName === 'stagger') {
          // Reset stagger to 0
          self.staggerDuration = 0;
        }

        return;
      } // The effect is present


      propIndex = effectString.indexOf(effectName + '(');

      if (propIndex > -1) {
        // The effect has a user defined value in parentheses
        // Extract from the first parenthesis to the end of string
        str = effectString.substring(propIndex); // Match any number of characters between "(" and ")"

        match = re.exec(str);
        val = match[1];
      }

      switch (effectName) {
        case 'fade':
          effects.opacity = val ? parseFloat(val) : 0;
          break;

        case 'stagger':
          self.staggerDuration = val ? parseFloat(val) : 100; // TODO: Currently stagger must be applied globally, but
          // if seperate values are specified for in/out, this should
          // be respected

          break;

        default:
          // All other effects are transforms following the same structure
          if (isOut && self.config.animation.reverseOut && effectName !== 'scale') {
            effects[effectName].value = (val ? parseFloat(val) : _mixitup.transformDefaults[effectName].value) * -1;
          } else {
            effects[effectName].value = val ? parseFloat(val) : _mixitup.transformDefaults[effectName].value;
          }

          if (val) {
            for (i = 0; unit = units[i]; i++) {
              if (val.indexOf(unit) > -1) {
                effects[effectName].unit = unit;
                break;
              }
            }
          } else {
            effects[effectName].unit = _mixitup.transformDefaults[effectName].unit;
          }

          transform.push(effectName + '(' + effects[effectName].value + effects[effectName].unit + ')');
      }

      self.callActions('afterParseEffect', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {State}
     */
    buildState: function buildState(operation) {
      var self = this,
          state = new _mixitup.State(),
          target = null,
          i = -1;
      self.callActions('beforeBuildState', arguments); // Map target elements into state arrays.
      // the real target objects should never be exposed

      for (i = 0; target = self.targets[i]; i++) {
        if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
          state.targets.push(target.dom.el);
        }
      }

      for (i = 0; target = operation.matching[i]; i++) {
        state.matching.push(target.dom.el);
      }

      for (i = 0; target = operation.show[i]; i++) {
        state.show.push(target.dom.el);
      }

      for (i = 0; target = operation.hide[i]; i++) {
        if (!operation.toRemove.length || operation.toRemove.indexOf(target) < 0) {
          state.hide.push(target.dom.el);
        }
      }

      state.id = self.id;
      state.container = self.dom.container;
      state.activeFilter = operation.newFilter;
      state.activeSort = operation.newSort;
      state.activeDataset = operation.newDataset;
      state.activeContainerClassName = operation.newContainerClassName;
      state.hasFailed = operation.hasFailed;
      state.totalTargets = self.targets.length;
      state.totalShow = operation.show.length;
      state.totalHide = operation.hide.length;
      state.totalMatching = operation.matching.length;
      state.triggerElement = operation.triggerElement;
      return self.callFilters('stateBuildState', state, arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {boolean}   shouldAnimate
     * @param   {Operation} operation
     * @return  {void}
     */
    goMix: function goMix(shouldAnimate, operation) {
      var self = this,
          deferred = null;
      self.callActions('beforeGoMix', arguments); // If the animation duration is set to 0ms,
      // or no effects specified,
      // or the container is hidden
      // then abort animation

      if (!self.config.animation.duration || !self.config.animation.effects || !h.isVisible(self.dom.container)) {
        shouldAnimate = false;
      }

      if (!operation.toShow.length && !operation.toHide.length && !operation.willSort && !operation.willChangeLayout) {
        // If nothing to show or hide, and not sorting or
        // changing layout
        shouldAnimate = false;
      }

      if (!operation.startState.show.length && !operation.show.length) {
        // If nothing currently shown, nothing to show
        shouldAnimate = false;
      }

      _mixitup.events.fire('mixStart', self.dom.container, {
        state: operation.startState,
        futureState: operation.newState,
        instance: self
      }, self.dom.document);

      if (typeof self.config.callbacks.onMixStart === 'function') {
        self.config.callbacks.onMixStart.call(self.dom.container, operation.startState, operation.newState, self);
      }

      h.removeClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));

      if (!self.userDeferred) {
        // Queue empty, no pending operations
        deferred = self.userDeferred = h.defer(_mixitup.libraries);
      } else {
        // Use existing deferred
        deferred = self.userDeferred;
      }

      self.isBusy = true;

      if (!shouldAnimate || !_mixitup.features.has.transitions) {
        // Abort
        if (self.config.debug.fauxAsync) {
          setTimeout(function () {
            self.cleanUp(operation);
          }, self.config.animation.duration);
        } else {
          self.cleanUp(operation);
        }

        return self.callFilters('promiseGoMix', deferred.promise, arguments);
      } // If we should animate and the platform supports transitions, go for it


      if (window.pageYOffset !== operation.docState.scrollTop) {
        window.scrollTo(operation.docState.scrollLeft, operation.docState.scrollTop);
      }

      if (self.config.animation.applyPerspective) {
        self.dom.parent.style[_mixitup.features.perspectiveProp] = self.config.animation.perspectiveDistance;
        self.dom.parent.style[_mixitup.features.perspectiveOriginProp] = self.config.animation.perspectiveOrigin;
      }

      if (self.config.animation.animateResizeContainer && operation.startHeight !== operation.newHeight && operation.viewportDeltaY !== operation.startHeight - operation.newHeight) {
        self.dom.parent.style.height = operation.startHeight + 'px';
      }

      if (self.config.animation.animateResizeContainer && operation.startWidth !== operation.newWidth && operation.viewportDeltaX !== operation.startWidth - operation.newWidth) {
        self.dom.parent.style.width = operation.startWidth + 'px';
      }

      if (operation.startHeight === operation.newHeight) {
        self.dom.parent.style.height = operation.startHeight + 'px';
      }

      if (operation.startWidth === operation.newWidth) {
        self.dom.parent.style.width = operation.startWidth + 'px';
      }

      if (operation.startHeight === operation.newHeight && operation.startWidth === operation.newWidth) {
        self.dom.parent.style.overflow = 'hidden';
      }

      requestAnimationFrame(function () {
        self.moveTargets(operation);
      });
      return self.callFilters('promiseGoMix', deferred.promise, arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    getStartMixData: function getStartMixData(operation) {
      var self = this,
          parentStyle = window.getComputedStyle(self.dom.parent),
          parentRect = self.dom.parent.getBoundingClientRect(),
          target = null,
          data = {},
          i = -1,
          boxSizing = parentStyle[_mixitup.features.boxSizingProp];
      self.incPadding = boxSizing === 'border-box';
      self.callActions('beforeGetStartMixData', arguments);

      for (i = 0; target = operation.show[i]; i++) {
        data = target.getPosData();
        operation.showPosData[i] = {
          startPosData: data
        };
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        data = target.getPosData();
        operation.toHidePosData[i] = {
          startPosData: data
        };
      }

      operation.startX = parentRect.left;
      operation.startY = parentRect.top;
      operation.startHeight = self.incPadding ? parentRect.height : parentRect.height - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom) - parseFloat(parentStyle.borderTop) - parseFloat(parentStyle.borderBottom);
      operation.startWidth = self.incPadding ? parentRect.width : parentRect.width - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight) - parseFloat(parentStyle.borderLeft) - parseFloat(parentStyle.borderRight);
      self.callActions('afterGetStartMixData', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    setInter: function setInter(operation) {
      var self = this,
          target = null,
          i = -1;
      self.callActions('beforeSetInter', arguments); // Prevent scrollbar flicker on non-inertial scroll platforms by clamping height/width

      if (self.config.animation.clampHeight) {
        self.dom.parent.style.height = operation.startHeight + 'px';
        self.dom.parent.style.overflow = 'hidden';
      }

      if (self.config.animation.clampWidth) {
        self.dom.parent.style.width = operation.startWidth + 'px';
        self.dom.parent.style.overflow = 'hidden';
      }

      for (i = 0; target = operation.toShow[i]; i++) {
        target.show();
      }

      if (operation.willChangeLayout) {
        h.removeClass(self.dom.container, operation.startContainerClassName);
        h.addClass(self.dom.container, operation.newContainerClassName);
      }

      self.callActions('afterSetInter', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    getInterMixData: function getInterMixData(operation) {
      var self = this,
          target = null,
          i = -1;
      self.callActions('beforeGetInterMixData', arguments);

      for (i = 0; target = operation.show[i]; i++) {
        operation.showPosData[i].interPosData = target.getPosData();
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        operation.toHidePosData[i].interPosData = target.getPosData();
      }

      self.callActions('afterGetInterMixData', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    setFinal: function setFinal(operation) {
      var self = this,
          target = null,
          i = -1;
      self.callActions('beforeSetFinal', arguments);
      operation.willSort && self.printSort(false, operation);

      for (i = 0; target = operation.toHide[i]; i++) {
        target.hide();
      }

      self.callActions('afterSetFinal', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    getFinalMixData: function getFinalMixData(operation) {
      var self = this,
          parentStyle = null,
          parentRect = null,
          target = null,
          i = -1;
      self.callActions('beforeGetFinalMixData', arguments);

      for (i = 0; target = operation.show[i]; i++) {
        operation.showPosData[i].finalPosData = target.getPosData();
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        operation.toHidePosData[i].finalPosData = target.getPosData();
      } // Remove clamping


      if (self.config.animation.clampHeight || self.config.animation.clampWidth) {
        self.dom.parent.style.height = self.dom.parent.style.width = self.dom.parent.style.overflow = '';
      }

      if (!self.incPadding) {
        parentStyle = window.getComputedStyle(self.dom.parent);
      }

      parentRect = self.dom.parent.getBoundingClientRect();
      operation.newX = parentRect.left;
      operation.newY = parentRect.top;
      operation.newHeight = self.incPadding ? parentRect.height : parentRect.height - parseFloat(parentStyle.paddingTop) - parseFloat(parentStyle.paddingBottom) - parseFloat(parentStyle.borderTop) - parseFloat(parentStyle.borderBottom);
      operation.newWidth = self.incPadding ? parentRect.width : parentRect.width - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight) - parseFloat(parentStyle.borderLeft) - parseFloat(parentStyle.borderRight);
      operation.viewportDeltaX = operation.docState.viewportWidth - this.dom.document.documentElement.clientWidth;
      operation.viewportDeltaY = operation.docState.viewportHeight - this.dom.document.documentElement.clientHeight;

      if (operation.willSort) {
        self.printSort(true, operation);
      }

      for (i = 0; target = operation.toShow[i]; i++) {
        target.hide();
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        target.show();
      }

      if (operation.willChangeLayout) {
        h.removeClass(self.dom.container, operation.newContainerClassName);
        h.addClass(self.dom.container, self.config.layout.containerClassName);
      }

      self.callActions('afterGetFinalMixData', arguments);
    },

    /**
     * @private
     * @instance
     * @since    3.0.0
     * @param    {Operation}     operation
     */
    getTweenData: function getTweenData(operation) {
      var self = this,
          target = null,
          posData = null,
          effectNames = Object.getOwnPropertyNames(self.effectsIn),
          effectName = '',
          effect = null,
          widthChange = -1,
          heightChange = -1,
          i = -1,
          j = -1;
      self.callActions('beforeGetTweenData', arguments);

      for (i = 0; target = operation.show[i]; i++) {
        posData = operation.showPosData[i];
        posData.posIn = new _mixitup.StyleData();
        posData.posOut = new _mixitup.StyleData();
        posData.tweenData = new _mixitup.StyleData(); // Process x and y

        if (target.isShown) {
          posData.posIn.x = posData.startPosData.x - posData.interPosData.x;
          posData.posIn.y = posData.startPosData.y - posData.interPosData.y;
        } else {
          posData.posIn.x = posData.posIn.y = 0;
        }

        posData.posOut.x = posData.finalPosData.x - posData.interPosData.x;
        posData.posOut.y = posData.finalPosData.y - posData.interPosData.y; // Process opacity

        posData.posIn.opacity = target.isShown ? 1 : self.effectsIn.opacity;
        posData.posOut.opacity = 1;
        posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity; // Adjust x and y if not nudging

        if (!target.isShown && !self.config.animation.nudge) {
          posData.posIn.x = posData.posOut.x;
          posData.posIn.y = posData.posOut.y;
        }

        posData.tweenData.x = posData.posOut.x - posData.posIn.x;
        posData.tweenData.y = posData.posOut.y - posData.posIn.y; // Process width, height, and margins

        if (self.config.animation.animateResizeTargets) {
          posData.posIn.width = posData.startPosData.width;
          posData.posIn.height = posData.startPosData.height; // "||" Prevents width/height change from including 0 width/height if hiding or showing

          widthChange = (posData.startPosData.width || posData.finalPosData.width) - posData.interPosData.width;
          posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;
          heightChange = (posData.startPosData.height || posData.finalPosData.height) - posData.interPosData.height;
          posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
          posData.posOut.width = posData.finalPosData.width;
          posData.posOut.height = posData.finalPosData.height;
          widthChange = (posData.finalPosData.width || posData.startPosData.width) - posData.interPosData.width;
          posData.posOut.marginRight = posData.finalPosData.marginRight - widthChange;
          heightChange = (posData.finalPosData.height || posData.startPosData.height) - posData.interPosData.height;
          posData.posOut.marginBottom = posData.finalPosData.marginBottom - heightChange;
          posData.tweenData.width = posData.posOut.width - posData.posIn.width;
          posData.tweenData.height = posData.posOut.height - posData.posIn.height;
          posData.tweenData.marginRight = posData.posOut.marginRight - posData.posIn.marginRight;
          posData.tweenData.marginBottom = posData.posOut.marginBottom - posData.posIn.marginBottom;
        } // Process transforms


        for (j = 0; effectName = effectNames[j]; j++) {
          effect = self.effectsIn[effectName];
          if (!(effect instanceof _mixitup.TransformData) || !effect.value) continue;
          posData.posIn[effectName].value = effect.value;
          posData.posOut[effectName].value = 0;
          posData.tweenData[effectName].value = posData.posOut[effectName].value - posData.posIn[effectName].value;
          posData.posIn[effectName].unit = posData.posOut[effectName].unit = posData.tweenData[effectName].unit = effect.unit;
        }
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        posData = operation.toHidePosData[i];
        posData.posIn = new _mixitup.StyleData();
        posData.posOut = new _mixitup.StyleData();
        posData.tweenData = new _mixitup.StyleData(); // Process x and y

        posData.posIn.x = target.isShown ? posData.startPosData.x - posData.interPosData.x : 0;
        posData.posIn.y = target.isShown ? posData.startPosData.y - posData.interPosData.y : 0;
        posData.posOut.x = self.config.animation.nudge ? 0 : posData.posIn.x;
        posData.posOut.y = self.config.animation.nudge ? 0 : posData.posIn.y;
        posData.tweenData.x = posData.posOut.x - posData.posIn.x;
        posData.tweenData.y = posData.posOut.y - posData.posIn.y; // Process width, height, and margins

        if (self.config.animation.animateResizeTargets) {
          posData.posIn.width = posData.startPosData.width;
          posData.posIn.height = posData.startPosData.height;
          widthChange = posData.startPosData.width - posData.interPosData.width;
          posData.posIn.marginRight = posData.startPosData.marginRight - widthChange;
          heightChange = posData.startPosData.height - posData.interPosData.height;
          posData.posIn.marginBottom = posData.startPosData.marginBottom - heightChange;
        } // Process opacity


        posData.posIn.opacity = 1;
        posData.posOut.opacity = self.effectsOut.opacity;
        posData.tweenData.opacity = posData.posOut.opacity - posData.posIn.opacity; // Process transforms

        for (j = 0; effectName = effectNames[j]; j++) {
          effect = self.effectsOut[effectName];
          if (!(effect instanceof _mixitup.TransformData) || !effect.value) continue;
          posData.posIn[effectName].value = 0;
          posData.posOut[effectName].value = effect.value;
          posData.tweenData[effectName].value = posData.posOut[effectName].value - posData.posIn[effectName].value;
          posData.posIn[effectName].unit = posData.posOut[effectName].unit = posData.tweenData[effectName].unit = effect.unit;
        }
      }

      self.callActions('afterGetTweenData', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    moveTargets: function moveTargets(operation) {
      var self = this,
          target = null,
          moveData = null,
          posData = null,
          statusChange = '',
          willTransition = false,
          staggerIndex = -1,
          i = -1,
          checkProgress = self.checkProgress.bind(self);
      self.callActions('beforeMoveTargets', arguments); // TODO: this is an extra loop in addition to the calcs
      // done in getOperation, could some of this be done there?

      for (i = 0; target = operation.show[i]; i++) {
        moveData = new _mixitup.IMoveData();
        posData = operation.showPosData[i];
        statusChange = target.isShown ? 'none' : 'show';
        willTransition = self.willTransition(statusChange, operation.hasEffect, posData.posIn, posData.posOut);

        if (willTransition) {
          // Prevent non-transitioning targets from incrementing the staggerIndex
          staggerIndex++;
        }

        target.show();
        moveData.posIn = posData.posIn;
        moveData.posOut = posData.posOut;
        moveData.statusChange = statusChange;
        moveData.staggerIndex = staggerIndex;
        moveData.operation = operation;
        moveData.callback = willTransition ? checkProgress : null;
        target.move(moveData);
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        posData = operation.toHidePosData[i];
        moveData = new _mixitup.IMoveData();
        statusChange = 'hide';
        willTransition = self.willTransition(statusChange, posData.posIn, posData.posOut);
        moveData.posIn = posData.posIn;
        moveData.posOut = posData.posOut;
        moveData.statusChange = statusChange;
        moveData.staggerIndex = i;
        moveData.operation = operation;
        moveData.callback = willTransition ? checkProgress : null;
        target.move(moveData);
      }

      if (self.config.animation.animateResizeContainer) {
        self.dom.parent.style[_mixitup.features.transitionProp] = 'height ' + self.config.animation.duration + 'ms ease, ' + 'width ' + self.config.animation.duration + 'ms ease ';
        requestAnimationFrame(function () {
          if (operation.startHeight !== operation.newHeight && operation.viewportDeltaY !== operation.startHeight - operation.newHeight) {
            self.dom.parent.style.height = operation.newHeight + 'px';
          }

          if (operation.startWidth !== operation.newWidth && operation.viewportDeltaX !== operation.startWidth - operation.newWidth) {
            self.dom.parent.style.width = operation.newWidth + 'px';
          }
        });
      }

      if (operation.willChangeLayout) {
        h.removeClass(self.dom.container, self.config.layout.ContainerClassName);
        h.addClass(self.dom.container, operation.newContainerClassName);
      }

      self.callActions('afterMoveTargets', arguments);
    },

    /**
     * @private
     * @instance
     * @return  {boolean}
     */
    hasEffect: function hasEffect() {
      var self = this,
          EFFECTABLES = ['scale', 'translateX', 'translateY', 'translateZ', 'rotateX', 'rotateY', 'rotateZ'],
          effectName = '',
          effect = null,
          result = false,
          value = -1,
          i = -1;

      if (self.effectsIn.opacity !== 1) {
        return self.callFilters('resultHasEffect', true, arguments);
      }

      for (i = 0; effectName = EFFECTABLES[i]; i++) {
        effect = self.effectsIn[effectName];
        value = _typeof(effect) && effect.value !== 'undefined' ? effect.value : effect;

        if (value !== 0) {
          result = true;
          break;
        }
      }

      return self.callFilters('resultHasEffect', result, arguments);
    },

    /**
     * Determines if a target element will transition in
     * some fasion and therefore requires binding of
     * transitionEnd
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string}        statusChange
     * @param   {boolean}       hasEffect
     * @param   {StyleData}     posIn
     * @param   {StyleData}     posOut
     * @return  {boolean}
     */
    willTransition: function willTransition(statusChange, hasEffect, posIn, posOut) {
      var self = this,
          result = false;

      if (!h.isVisible(self.dom.container)) {
        // If the container is not visible, the transitionEnd
        // event will not occur and MixItUp will hang
        result = false;
      } else if (statusChange !== 'none' && hasEffect || posIn.x !== posOut.x || posIn.y !== posOut.y) {
        // If opacity and/or translate will change
        result = true;
      } else if (self.config.animation.animateResizeTargets) {
        // Check if width, height or margins will change
        result = posIn.width !== posOut.width || posIn.height !== posOut.height || posIn.marginRight !== posOut.marginRight || posIn.marginTop !== posOut.marginTop;
      } else {
        result = false;
      }

      return self.callFilters('resultWillTransition', result, arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    checkProgress: function checkProgress(operation) {
      var self = this;
      self.targetsDone++;

      if (self.targetsBound === self.targetsDone) {
        self.cleanUp(operation);
      }
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Operation}     operation
     * @return  {void}
     */
    cleanUp: function cleanUp(operation) {
      var self = this,
          target = null,
          whitespaceBefore = null,
          whitespaceAfter = null,
          nextInQueue = null,
          i = -1;
      self.callActions('beforeCleanUp', arguments);
      self.targetsMoved = self.targetsImmovable = self.targetsBound = self.targetsDone = 0;

      for (i = 0; target = operation.show[i]; i++) {
        target.cleanUp();
        target.show();
      }

      for (i = 0; target = operation.toHide[i]; i++) {
        target.cleanUp();
        target.hide();
      }

      if (operation.willSort) {
        self.printSort(false, operation);
      } // Remove any styles applied to the parent container


      self.dom.parent.style[_mixitup.features.transitionProp] = self.dom.parent.style.height = self.dom.parent.style.width = self.dom.parent.style.overflow = self.dom.parent.style[_mixitup.features.perspectiveProp] = self.dom.parent.style[_mixitup.features.perspectiveOriginProp] = '';

      if (operation.willChangeLayout) {
        h.removeClass(self.dom.container, operation.startContainerClassName);
        h.addClass(self.dom.container, operation.newContainerClassName);
      }

      if (operation.toRemove.length) {
        for (i = 0; target = self.targets[i]; i++) {
          if (operation.toRemove.indexOf(target) > -1) {
            if ((whitespaceBefore = target.dom.el.previousSibling) && whitespaceBefore.nodeName === '#text' && (whitespaceAfter = target.dom.el.nextSibling) && whitespaceAfter.nodeName === '#text') {
              h.removeWhitespace(whitespaceBefore);
            }

            if (!operation.willSort) {
              // NB: Sorting will remove targets as a bi-product of `printSort()`
              self.dom.parent.removeChild(target.dom.el);
            }

            self.targets.splice(i, 1);
            target.isInDom = false;
            i--;
          }
        } // Since targets have been removed, the original order must be updated


        self.origOrder = self.targets;
      }

      if (operation.willSort) {
        self.targets = operation.newOrder;
      }

      self.state = operation.newState;
      self.lastOperation = operation;
      self.dom.targets = self.state.targets; // mixEnd

      _mixitup.events.fire('mixEnd', self.dom.container, {
        state: self.state,
        instance: self
      }, self.dom.document);

      if (typeof self.config.callbacks.onMixEnd === 'function') {
        self.config.callbacks.onMixEnd.call(self.dom.container, self.state, self);
      }

      if (operation.hasFailed) {
        // mixFail
        _mixitup.events.fire('mixFail', self.dom.container, {
          state: self.state,
          instance: self
        }, self.dom.document);

        if (typeof self.config.callbacks.onMixFail === 'function') {
          self.config.callbacks.onMixFail.call(self.dom.container, self.state, self);
        }

        h.addClass(self.dom.container, h.getClassname(self.config.classNames, 'container', self.config.classNames.modifierFailed));
      } // User-defined callback function


      if (typeof self.userCallback === 'function') {
        self.userCallback.call(self.dom.container, self.state, self);
      }

      if (typeof self.userDeferred.resolve === 'function') {
        self.userDeferred.resolve(self.state);
      }

      self.userCallback = null;
      self.userDeferred = null;
      self.lastClicked = null;
      self.isToggling = false;
      self.isBusy = false;

      if (self.queue.length) {
        self.callActions('beforeReadQueueCleanUp', arguments);
        nextInQueue = self.queue.shift(); // Update non-public API properties stored in queue

        self.userDeferred = nextInQueue.deferred;
        self.isToggling = nextInQueue.isToggling;
        self.lastClicked = nextInQueue.triggerElement;

        if (nextInQueue.instruction.command instanceof _mixitup.CommandMultimix) {
          self.multimix.apply(self, nextInQueue.args);
        } else {
          self.dataset.apply(self, nextInQueue.args);
        }
      }

      self.callActions('afterCleanUp', arguments);
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseMultimixArgs: function parseMultimixArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandMultimix();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        if (_typeof(arg) === 'object') {
          h.extend(instruction.command, arg);
        } else if (typeof arg === 'boolean') {
          instruction.animate = arg;
        } else if (typeof arg === 'function') {
          instruction.callback = arg;
        }
      } // Coerce arbitrary command arguments into typed command objects


      if (instruction.command.insert && !(instruction.command.insert instanceof _mixitup.CommandInsert)) {
        instruction.command.insert = self.parseInsertArgs([instruction.command.insert]).command;
      }

      if (instruction.command.remove && !(instruction.command.remove instanceof _mixitup.CommandRemove)) {
        instruction.command.remove = self.parseRemoveArgs([instruction.command.remove]).command;
      }

      if (instruction.command.filter && !(instruction.command.filter instanceof _mixitup.CommandFilter)) {
        instruction.command.filter = self.parseFilterArgs([instruction.command.filter]).command;
      }

      if (instruction.command.sort && !(instruction.command.sort instanceof _mixitup.CommandSort)) {
        instruction.command.sort = self.parseSortArgs([instruction.command.sort]).command;
      }

      if (instruction.command.changeLayout && !(instruction.command.changeLayout instanceof _mixitup.CommandChangeLayout)) {
        instruction.command.changeLayout = self.parseChangeLayoutArgs([instruction.command.changeLayout]).command;
      }

      instruction = self.callFilters('instructionParseMultimixArgs', instruction, arguments);
      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseFilterArgs: function parseFilterArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandFilter();

      for (i = 0; i < args.length; i++) {
        arg = args[i];

        if (typeof arg === 'string') {
          // Selector
          instruction.command.selector = arg;
        } else if (arg === null) {
          instruction.command.collection = [];
        } else if (_typeof(arg) === 'object' && h.isElement(arg, self.dom.document)) {
          // Single element
          instruction.command.collection = [arg];
        } else if (_typeof(arg) === 'object' && typeof arg.length !== 'undefined') {
          // Multiple elements in array, NodeList or jQuery collection
          instruction.command.collection = h.arrayFromList(arg);
        } else if (_typeof(arg) === 'object') {
          // Filter command
          h.extend(instruction.command, arg);
        } else if (typeof arg === 'boolean') {
          instruction.animate = arg;
        } else if (typeof arg === 'function') {
          instruction.callback = arg;
        }
      }

      if (instruction.command.selector && instruction.command.collection) {
        throw new Error(_mixitup.messages.errorFilterInvalidArguments());
      }

      instruction = self.callFilters('instructionParseFilterArgs', instruction, arguments);
      h.freeze(instruction);
      return instruction;
    },
    parseSortArgs: function parseSortArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          sortString = '',
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandSort();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        switch (_typeof(arg)) {
          case 'string':
            // Sort string
            sortString = arg;
            break;

          case 'object':
            // Array of element references
            if (arg.length) {
              instruction.command.collection = h.arrayFromList(arg);
            }

            break;

          case 'boolean':
            instruction.animate = arg;
            break;

          case 'function':
            instruction.callback = arg;
            break;
        }
      }

      if (sortString) {
        instruction.command = self.parseSortString(sortString, instruction.command);
      }

      instruction = self.callFilters('instructionParseSortArgs', instruction, arguments);
      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since   2.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseInsertArgs: function parseInsertArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandInsert();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        if (typeof arg === 'number') {
          // Insert index
          instruction.command.index = arg;
        } else if (typeof arg === 'string' && ['before', 'after'].indexOf(arg) > -1) {
          // 'before'/'after'
          instruction.command.position = arg;
        } else if (typeof arg === 'string') {
          // Markup
          instruction.command.collection = h.arrayFromList(h.createElement(arg).childNodes);
        } else if (_typeof(arg) === 'object' && h.isElement(arg, self.dom.document)) {
          // Single element
          !instruction.command.collection.length ? instruction.command.collection = [arg] : instruction.command.sibling = arg;
        } else if (_typeof(arg) === 'object' && arg.length) {
          // Multiple elements in array or jQuery collection
          !instruction.command.collection.length ? instruction.command.collection = arg : instruction.command.sibling = arg[0];
        } else if (_typeof(arg) === 'object' && arg.childNodes && arg.childNodes.length) {
          // Document fragment
          !instruction.command.collection.length ? instruction.command.collection = h.arrayFromList(arg.childNodes) : instruction.command.sibling = arg.childNodes[0];
        } else if (_typeof(arg) === 'object') {
          // Insert command
          h.extend(instruction.command, arg);
        } else if (typeof arg === 'boolean') {
          instruction.animate = arg;
        } else if (typeof arg === 'function') {
          instruction.callback = arg;
        }
      }

      if (instruction.command.index && instruction.command.sibling) {
        throw new Error(_mixitup.messages.errorInsertInvalidArguments());
      }

      if (!instruction.command.collection.length && self.config.debug.showWarnings) {
        console.warn(_mixitup.messages.warningInsertNoElements());
      }

      instruction = self.callFilters('instructionParseInsertArgs', instruction, arguments);
      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseRemoveArgs: function parseRemoveArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          target = null,
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandRemove();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        switch (_typeof(arg)) {
          case 'number':
            if (self.targets[arg]) {
              instruction.command.targets[0] = self.targets[arg];
            }

            break;

          case 'string':
            instruction.command.collection = h.arrayFromList(self.dom.parent.querySelectorAll(arg));
            break;

          case 'object':
            if (arg && arg.length) {
              instruction.command.collection = arg;
            } else if (h.isElement(arg, self.dom.document)) {
              instruction.command.collection = [arg];
            } else {
              // Remove command
              h.extend(instruction.command, arg);
            }

            break;

          case 'boolean':
            instruction.animate = arg;
            break;

          case 'function':
            instruction.callback = arg;
            break;
        }
      }

      if (instruction.command.collection.length) {
        for (i = 0; target = self.targets[i]; i++) {
          if (instruction.command.collection.indexOf(target.dom.el) > -1) {
            instruction.command.targets.push(target);
          }
        }
      }

      if (!instruction.command.targets.length && self.config.debug.showWarnings) {
        console.warn(_mixitup.messages.warningRemoveNoElements());
      }

      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseDatasetArgs: function parseDatasetArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandDataset();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        switch (_typeof(arg)) {
          case 'object':
            if (Array.isArray(arg) || typeof arg.length === 'number') {
              instruction.command.dataset = arg;
            } else {
              // Change layout command
              h.extend(instruction.command, arg);
            }

            break;

          case 'boolean':
            instruction.animate = arg;
            break;

          case 'function':
            instruction.callback = arg;
            break;
        }
      }

      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Array<*>}  args
     * @return  {mixitup.UserInstruction}
     */
    parseChangeLayoutArgs: function parseChangeLayoutArgs(args) {
      var self = this,
          instruction = new _mixitup.UserInstruction(),
          arg = null,
          i = -1;
      instruction.animate = self.config.animation.enable;
      instruction.command = new _mixitup.CommandChangeLayout();

      for (i = 0; i < args.length; i++) {
        arg = args[i];
        if (arg === null) continue;

        switch (_typeof(arg)) {
          case 'string':
            instruction.command.containerClassName = arg;
            break;

          case 'object':
            // Change layout command
            h.extend(instruction.command, arg);
            break;

          case 'boolean':
            instruction.animate = arg;
            break;

          case 'function':
            instruction.callback = arg;
            break;
        }
      }

      h.freeze(instruction);
      return instruction;
    },

    /**
     * @private
     * @instance
     * @since       3.0.0
     * @param       {mixitup.QueueItem}         queueItem
     * @return      {Promise.<mixitup.State>}
     */
    queueMix: function queueMix(queueItem) {
      var self = this,
          deferred = null,
          toggleSelector = '';
      self.callActions('beforeQueueMix', arguments);
      deferred = h.defer(_mixitup.libraries);

      if (self.config.animation.queue && self.queue.length < self.config.animation.queueLimit) {
        queueItem.deferred = deferred;
        self.queue.push(queueItem); // Keep controls in sync with user interactions. Mixer will catch up as it drains the queue.

        if (self.config.controls.enable) {
          if (self.isToggling) {
            self.buildToggleArray(queueItem.instruction.command);
            toggleSelector = self.getToggleSelector();
            self.updateControls({
              filter: {
                selector: toggleSelector
              }
            });
          } else {
            self.updateControls(queueItem.instruction.command);
          }
        }
      } else {
        if (self.config.debug.showWarnings) {
          console.warn(_mixitup.messages.warningMultimixInstanceQueueFull());
        }

        deferred.resolve(self.state);

        _mixitup.events.fire('mixBusy', self.dom.container, {
          state: self.state,
          instance: self
        }, self.dom.document);

        if (typeof self.config.callbacks.onMixBusy === 'function') {
          self.config.callbacks.onMixBusy.call(self.dom.container, self.state, self);
        }
      }

      return self.callFilters('promiseQueueMix', deferred.promise, arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Array.<object>}    newDataset
     * @return  {Operation}
     */
    getDataOperation: function getDataOperation(newDataset) {
      var self = this,
          operation = new _mixitup.Operation(),
          startDataset = [];
      operation = self.callFilters('operationUnmappedGetDataOperation', operation, arguments);

      if (self.dom.targets.length && !(startDataset = self.state.activeDataset || []).length) {
        throw new Error(_mixitup.messages.errorDatasetNotSet());
      }

      operation.id = h.randomHex();
      operation.startState = self.state;
      operation.startDataset = startDataset;
      operation.newDataset = newDataset.slice();
      self.diffDatasets(operation);
      operation.startOrder = self.targets;
      operation.newOrder = operation.show;

      if (self.config.animation.enable) {
        self.getStartMixData(operation);
        self.setInter(operation);
        operation.docState = h.getDocumentState(self.dom.document);
        self.getInterMixData(operation);
        self.setFinal(operation);
        self.getFinalMixData(operation);
        self.parseEffects();
        operation.hasEffect = self.hasEffect();
        self.getTweenData(operation);
      }

      self.targets = operation.show.slice();
      operation.newState = self.buildState(operation); // NB: Targets to be removed must be included in `self.targets` for removal during clean up,
      // but are added after state is built so that state is accurate

      Array.prototype.push.apply(self.targets, operation.toRemove);
      operation = self.callFilters('operationMappedGetDataOperation', operation, arguments);
      return operation;
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.Operation} operation
     * @return  {void}
     */
    diffDatasets: function diffDatasets(operation) {
      var self = this,
          persistantStartIds = [],
          persistantNewIds = [],
          insertedTargets = [],
          data = null,
          target = null,
          el = null,
          frag = null,
          nextEl = null,
          uids = {},
          id = '',
          i = -1;
      self.callActions('beforeDiffDatasets', arguments);

      for (i = 0; data = operation.newDataset[i]; i++) {
        if (typeof (id = data[self.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
          throw new TypeError(_mixitup.messages.errorDatasetInvalidUidKey({
            uidKey: self.config.data.uidKey
          }));
        }

        if (!uids[id]) {
          uids[id] = true;
        } else {
          throw new Error(_mixitup.messages.errorDatasetDuplicateUid({
            uid: id
          }));
        }

        if ((target = self.cache[id]) instanceof _mixitup.Target) {
          // Already in cache
          if (self.config.data.dirtyCheck && !h.deepEquals(data, target.data)) {
            // change detected
            el = target.render(data);
            target.data = data;

            if (el !== target.dom.el) {
              // Update target element reference
              if (target.isInDom) {
                target.unbindEvents();
                self.dom.parent.replaceChild(el, target.dom.el);
              }

              if (!target.isShown) {
                el.style.display = 'none';
              }

              target.dom.el = el;

              if (target.isInDom) {
                target.bindEvents();
              }
            }
          }

          el = target.dom.el;
        } else {
          // New target
          target = new _mixitup.Target();
          target.init(null, self, data);
          target.hide();
        }

        if (!target.isInDom) {
          // Adding to DOM
          if (!frag) {
            // Open frag
            frag = self.dom.document.createDocumentFragment();
          }

          if (frag.lastElementChild) {
            frag.appendChild(self.dom.document.createTextNode(' '));
          }

          frag.appendChild(target.dom.el);
          target.isInDom = true;
          target.unbindEvents();
          target.bindEvents();
          target.hide();
          operation.toShow.push(target);
          insertedTargets.push(target);
        } else {
          // Already in DOM
          nextEl = target.dom.el.nextElementSibling;
          persistantNewIds.push(id);

          if (frag) {
            // Close and insert previously opened frag
            if (frag.lastElementChild) {
              frag.appendChild(self.dom.document.createTextNode(' '));
            }

            self.insertDatasetFrag(frag, target.dom.el, insertedTargets);
            frag = null;
          }
        }

        operation.show.push(target);
      }

      if (frag) {
        // Unclosed frag remaining
        nextEl = nextEl || self.config.layout.siblingAfter;

        if (nextEl) {
          frag.appendChild(self.dom.document.createTextNode(' '));
        }

        self.insertDatasetFrag(frag, nextEl, insertedTargets);
      }

      for (i = 0; data = operation.startDataset[i]; i++) {
        id = data[self.config.data.uidKey];
        target = self.cache[id];

        if (operation.show.indexOf(target) < 0) {
          // Previously shown but now absent
          operation.hide.push(target);
          operation.toHide.push(target);
          operation.toRemove.push(target);
        } else {
          persistantStartIds.push(id);
        }
      }

      if (!h.isEqualArray(persistantStartIds, persistantNewIds)) {
        operation.willSort = true;
      }

      self.callActions('afterDiffDatasets', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.1.5
     * @param   {DocumentFragment}          frag
     * @param   {(HTMLElement|null)}        nextEl
     * @param   {Array.<mixitup.Target>}    targets
     * @return  {void}
     */
    insertDatasetFrag: function insertDatasetFrag(frag, nextEl, targets) {
      var self = this;
      var insertAt = nextEl ? Array.from(self.dom.parent.children).indexOf(nextEl) : self.targets.length;
      self.dom.parent.insertBefore(frag, nextEl);

      while (targets.length) {
        self.targets.splice(insertAt, 0, targets.shift());
        insertAt++;
      }
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.CommandSort} sortCommandA
     * @param   {mixitup.CommandSort} sortCommandB
     * @return  {boolean}
     */
    willSort: function willSort(sortCommandA, sortCommandB) {
      var self = this,
          result = false;

      if (self.config.behavior.liveSort || sortCommandA.order === 'random' || sortCommandA.attribute !== sortCommandB.attribute || sortCommandA.order !== sortCommandB.order || sortCommandA.collection !== sortCommandB.collection || sortCommandA.next === null && sortCommandB.next || sortCommandA.next && sortCommandB.next === null) {
        result = true;
      } else if (sortCommandA.next && sortCommandB.next) {
        result = self.willSort(sortCommandA.next, sortCommandB.next);
      } else {
        result = false;
      }

      return self.callFilters('resultWillSort', result, arguments);
    },

    /**
     * A shorthand method for `.filter('all')`. Shows all targets in the container.
     *
     * @example
     *
     * .show()
     *
     * @example <caption>Example: Showing all targets</caption>
     *
     * mixer.show()
     *     .then(function(state) {
     *         console.log(state.totalShow === state.totalTargets); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @return      {Promise.<mixitup.State>}
     */
    show: function show() {
      var self = this;
      return self.filter('all');
    },

    /**
     * A shorthand method for `.filter('none')`. Hides all targets in the container.
     *
     * @example
     *
     * .hide()
     *
     * @example <caption>Example: Hiding all targets</caption>
     *
     * mixer.hide()
     *     .then(function(state) {
     *         console.log(state.totalShow === 0); // true
     *         console.log(state.totalHide === state.totalTargets); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @return      {Promise.<mixitup.State>}
     */
    hide: function hide() {
      var self = this;
      return self.filter('none');
    },

    /**
     * Returns a boolean indicating whether or not a MixItUp operation is
     * currently in progress.
     *
     * @example
     *
     * .isMixing()
     *
     * @example <caption>Example: Checking the status of a mixer</caption>
     *
     * mixer.sort('random', function() {
     *     console.log(mixer.isMixing()) // false
     * });
     *
     * console.log(mixer.isMixing()) // true
     *
     * @public
     * @instance
     * @since   2.0.0
     * @return  {boolean}
     */
    isMixing: function isMixing() {
      var self = this;
      return self.isBusy;
    },

    /**
     * Filters all targets in the container by a provided selector string, or the values `'all'`
     * or `'none'`. Only targets matching the selector will be shown.
     *
     * @example
     *
     * .filter(selector [, animate] [, callback])
     *
     * @example <caption>Example 1: Filtering targets by a class selector</caption>
     *
     * mixer.filter('.category-a')
     *     .then(function(state) {
     *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a').length); // true
     *     });
     *
     * @example <caption>Example 2: Filtering targets by an attribute selector</caption>
     *
     * mixer.filter('[data-category~="a"]')
     *     .then(function(state) {
     *         console.log(state.totalShow === containerEl.querySelectorAll('[data-category~="a"]').length); // true
     *     });
     *
     * @example <caption>Example 3: Filtering targets by a compound selector</caption>
     *
     * // Show only those targets with the classes 'category-a' AND 'category-b'
     *
     * mixer.filter('.category-a.category-c')
     *     .then(function(state) {
     *         console.log(state.totalShow === containerEl.querySelectorAll('.category-a.category-c').length); // true
     *     });
     *
     * @example <caption>Example 4: Filtering via an element collection</caption>
     *
     * var collection = Array.from(container.querySelectorAll('.mix'));
     *
     * console.log(collection.length); // 34
     *
     * // Filter the collection manually using Array.prototype.filter
     *
     * var filtered = collection.filter(function(target) {
     *    return parseInt(target.getAttribute('data-price')) > 10;
     * });
     *
     * console.log(filtered.length); // 22
     *
     * // Pass the filtered collection to MixItUp
     *
     * mixer.filter(filtered)
     *    .then(function(state) {
     *        console.log(state.activeFilter.collection.length === 22); // true
     *    });
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {(string|HTMLElement|Array.<HTMLElement>)} selector
     *      Any valid CSS selector (i.e. `'.category-a'`), or the values `'all'` or `'none'`. The filter method also accepts a reference to single target element or a collection of target elements to show.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    filter: function filter() {
      var self = this,
          instruction = self.parseFilterArgs(arguments);
      return self.multimix({
        filter: instruction.command
      }, instruction.animate, instruction.callback);
    },

    /**
     * Adds an additional selector to the currently active filter selector, concatenating
     * as per the logic defined in `controls.toggleLogic`.
     *
     * @example
     *
     * .toggleOn(selector [, animate] [, callback])
     *
     * @example <caption>Example: Toggling on a filter selector</caption>
     *
     * console.log(mixer.getState().activeFilter.selector); // '.category-a'
     *
     * mixer.toggleOn('.category-b')
     *     .then(function(state) {
     *         console.log(state.activeFilter.selector); // '.category-a, .category-b'
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {string}    selector
     *      Any valid CSS selector (i.e. `'.category-a'`)
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    toggleOn: function toggleOn() {
      var self = this,
          instruction = self.parseFilterArgs(arguments),
          selector = instruction.command.selector,
          toggleSelector = '';
      self.isToggling = true;

      if (self.toggleArray.indexOf(selector) < 0) {
        self.toggleArray.push(selector);
      }

      toggleSelector = self.getToggleSelector();
      return self.multimix({
        filter: toggleSelector
      }, instruction.animate, instruction.callback);
    },

    /**
     * Removes a selector from the active filter selector.
     *
     * @example
     *
     * .toggleOff(selector [, animate] [, callback])
     *
     * @example <caption>Example: Toggling off a filter selector</caption>
     *
     * console.log(mixer.getState().activeFilter.selector); // '.category-a, .category-b'
     *
     * mixer.toggleOff('.category-b')
     *     .then(function(state) {
     *         console.log(state.activeFilter.selector); // '.category-a'
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {string}    selector
     *      Any valid CSS selector (i.e. `'.category-a'`)
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    toggleOff: function toggleOff() {
      var self = this,
          instruction = self.parseFilterArgs(arguments),
          selector = instruction.command.selector,
          selectorIndex = self.toggleArray.indexOf(selector),
          toggleSelector = '';
      self.isToggling = true;

      if (selectorIndex > -1) {
        self.toggleArray.splice(selectorIndex, 1);
      }

      toggleSelector = self.getToggleSelector();
      return self.multimix({
        filter: toggleSelector
      }, instruction.animate, instruction.callback);
    },

    /**
     * Sorts all targets in the container according to a provided sort string.
     *
     * @example
     *
     * .sort(sortString [, animate] [, callback])
     *
     * @example <caption>Example 1: Sorting by the default DOM order</caption>
     *
     * // Reverse the default order of the targets
     *
     * mixer.sort('default:desc')
     *     .then(function(state) {
     *         console.log(state.activeSort.attribute === 'default'); // true
     *         console.log(state.activeSort.order === 'desc'); // true
     *     });
     *
     * @example <caption>Example 2: Sorting by a custom data-attribute</caption>
     *
     * // Sort the targets by the value of a `data-published-date` attribute
     *
     * mixer.sort('published-date:asc')
     *     .then(function(state) {
     *         console.log(state.activeSort.attribute === 'published-date'); // true
     *         console.log(state.activeSort.order === 'asc'); // true
     *     });
     *
     * @example <caption>Example 3: Sorting by multiple attributes</caption>
     *
     * // Sort the targets by the value of a `data-published-date` attribute, then by `data-title`
     *
     * mixer.sort('published-date:desc data-title:asc')
     *     .then(function(state) {
     *         console.log(state.activeSort.attribute === 'published-date'); // true
     *         console.log(state.activeSort.order === 'desc'); // true
     *
     *         console.log(state.activeSort.next.attribute === 'title'); // true
     *         console.log(state.activeSort.next.order === 'asc'); // true
     *     });
     *
     * @example <caption>Example 4: Sorting by random</caption>
     *
     * mixer.sort('random')
     *     .then(function(state) {
     *         console.log(state.activeSort.order === 'random') // true
     *     });
     *
     * @example <caption>Example 5: Sorting via an element collection</caption>
     *
     * var collection = Array.from(container.querySelectorAll('.mix'));
     *
     * // Swap the position of two elements in the collection:
     *
     * var temp = collection[1];
     *
     * collection[1] = collection[0];
     * collection[0] = temp;
     *
     * // Pass the sorted collection to MixItUp
     *
     * mixer.sort(collection)
     *     .then(function(state) {
     *         console.log(state.targets[0] === collection[0]); // true
     *     });
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {(string|Array.<HTMLElement>)}    sortString
     *      A valid sort string (e.g. `'default'`, `'published-date:asc'`, or `'random'`). The sort method also accepts an array of all target elements in a user-defined order.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    sort: function sort() {
      var self = this,
          instruction = self.parseSortArgs(arguments);
      return self.multimix({
        sort: instruction.command
      }, instruction.animate, instruction.callback);
    },

    /**
     * Changes the layout of the container by adding, removing or updating a
     * layout-specific class name. If `animation.animateResizetargets` is
     * enabled, MixItUp will attempt to gracefully animate the width, height,
     * and position of targets between layout states.
     *
     * @example
     *
     * .changeLayout(containerClassName [, animate] [, callback])
     *
     * @example <caption>Example 1: Adding a new class name to the container</caption>
     *
     * mixer.changeLayout('container-list')
     *      .then(function(state) {
     *          console.log(state.activeContainerClass === 'container-list'); // true
     *      });
     *
     * @example <caption>Example 2: Removing a previously added class name from the container</caption>
     *
     * mixer.changeLayout('')
     *      .then(function(state) {
     *          console.log(state.activeContainerClass === ''); // true
     *      });
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {string}    containerClassName
     *      A layout-specific class name to add to the container.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    changeLayout: function changeLayout() {
      var self = this,
          instruction = self.parseChangeLayoutArgs(arguments);
      return self.multimix({
        changeLayout: instruction.command
      }, instruction.animate, instruction.callback);
    },

    /**
     * Updates the contents and order of the container to reflect the provided dataset,
     * if the dataset API is in use.
     *
     * The dataset API is designed for use in API-driven JavaScript applications, and
     * can be used instead of DOM-based methods such as `.filter()`, `.sort()`,
     * `.insert()`, etc. When used, insertion, removal, sorting and pagination can be
     * achieved purely via changes to your data model, without the uglyness of having
     * to interact with or query the DOM directly.
     *
     * @example
     *
     * .dataset(dataset [, animate] [, callback])
     *
     * @example <caption>Example 1: Rendering a dataset</caption>
     *
     * var myDataset = [
     *     {id: 1, ...},
     *     {id: 2, ...},
     *     {id: 3, ...}
     * ];
     *
     * mixer.dataset(myDataset)
     *     .then(function(state) {
     *         console.log(state.totalShow === 3); // true
     *     });
     *
     * @example <caption>Example 2: Sorting a dataset</caption>
     *
     * // Create a new dataset in reverse order
     *
     * var newDataset = myDataset.slice().reverse();
     *
     * mixer.dataset(newDataset)
     *     .then(function(state) {
     *         console.log(state.activeDataset[0] === myDataset[2]); // true
     *     });
     *
     * @example <caption>Example 3: Removing an item from the dataset</caption>
     *
     * console.log(myDataset.length); // 3
     *
     * // Create a new dataset with the last item removed.
     *
     * var newDataset = myDataset.slice().pop();
     *
     * mixer.dataset(newDataset)
     *     .then(function(state) {
     *         console.log(state.totalShow === 2); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {Array.<object>}    dataset
     *      An array of objects, each one representing the underlying data model of a target to be rendered.
     * @param       {boolean}           [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}          [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    dataset: function dataset() {
      var self = this,
          instruction = self.parseDatasetArgs(arguments),
          operation = null,
          queueItem = null,
          animate = false;
      self.callActions('beforeDataset', arguments);

      if (!self.isBusy) {
        if (instruction.callback) self.userCallback = instruction.callback;
        animate = instruction.animate ^ self.config.animation.enable ? instruction.animate : self.config.animation.enable;
        operation = self.getDataOperation(instruction.command.dataset);
        return self.goMix(animate, operation);
      } else {
        queueItem = new _mixitup.QueueItem();
        queueItem.args = arguments;
        queueItem.instruction = instruction;
        return self.queueMix(queueItem);
      }
    },

    /**
     * Performs simultaneous `filter`, `sort`, `insert`, `remove` and `changeLayout`
     * operations as requested.
     *
     * @example
     *
     * .multimix(multimixCommand [, animate] [, callback])
     *
     * @example <caption>Example 1: Performing simultaneous filtering and sorting</caption>
     *
     * mixer.multimix({
     *     filter: '.category-b',
     *     sort: 'published-date:desc'
     * })
     *     .then(function(state) {
     *         console.log(state.activeFilter.selector === '.category-b'); // true
     *         console.log(state.activeSort.attribute === 'published-date'); // true
     *     });
     *
     * @example <caption>Example 2: Performing simultaneous sorting, insertion, and removal</caption>
     *
     * console.log(mixer.getState().totalShow); // 6
     *
     * // NB: When inserting via `multimix()`, an object should be provided as the value
     * // for the `insert` portion of the command, allowing for a collection of elements
     * // and an insertion index to be specified.
     *
     * mixer.multimix({
     *     sort: 'published-date:desc', // Sort the container, including any new elements
     *     insert: {
     *         collection: [newElementReferenceA, newElementReferenceB], // Add 2 new elements at index 5
     *         index: 5
     *     },
     *     remove: existingElementReference // Remove 1 existing element
     * })
     *     .then(function(state) {
     *         console.log(state.activeSort.attribute === 'published-date'); // true
     *         console.log(state.totalShow === 7); // true
     *     });
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {object}    multimixCommand
     *      An object containing one or more things to do
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    multimix: function multimix() {
      var self = this,
          operation = null,
          animate = false,
          queueItem = null,
          instruction = self.parseMultimixArgs(arguments);
      self.callActions('beforeMultimix', arguments);

      if (!self.isBusy) {
        operation = self.getOperation(instruction.command);

        if (self.config.controls.enable) {
          // Update controls for API calls
          if (instruction.command.filter && !self.isToggling) {
            // As we are not toggling, reset the toggle array
            // so new filter overrides existing toggles
            self.toggleArray.length = 0;
            self.buildToggleArray(operation.command);
          }

          if (self.queue.length < 1) {
            self.updateControls(operation.command);
          }
        }

        if (instruction.callback) self.userCallback = instruction.callback; // Always allow the instruction to override the instance setting

        animate = instruction.animate ^ self.config.animation.enable ? instruction.animate : self.config.animation.enable;
        self.callFilters('operationMultimix', operation, arguments);
        return self.goMix(animate, operation);
      } else {
        queueItem = new _mixitup.QueueItem();
        queueItem.args = arguments;
        queueItem.instruction = instruction;
        queueItem.triggerElement = self.lastClicked;
        queueItem.isToggling = self.isToggling;
        return self.queueMix(queueItem);
      }
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {object}            multimixCommand
     * @param   {boolean}           [isPreFetch]
     *      An optional boolean indicating that the operation is being pre-fetched for execution at a later time.
     * @return  {Operation|null}
     */
    getOperation: function getOperation(multimixCommand) {
      var self = this,
          sortCommand = multimixCommand.sort,
          filterCommand = multimixCommand.filter,
          changeLayoutCommand = multimixCommand.changeLayout,
          removeCommand = multimixCommand.remove,
          insertCommand = multimixCommand.insert,
          operation = new _mixitup.Operation();
      operation = self.callFilters('operationUnmappedGetOperation', operation, arguments);
      operation.id = h.randomHex();
      operation.command = multimixCommand;
      operation.startState = self.state;
      operation.triggerElement = self.lastClicked;

      if (self.isBusy) {
        if (self.config.debug.showWarnings) {
          console.warn(_mixitup.messages.warningGetOperationInstanceBusy());
        }

        return null;
      }

      if (insertCommand) {
        self.insertTargets(insertCommand, operation);
      }

      if (removeCommand) {
        operation.toRemove = removeCommand.targets;
      }

      operation.startSort = operation.newSort = operation.startState.activeSort;
      operation.startOrder = operation.newOrder = self.targets;

      if (sortCommand) {
        operation.startSort = operation.startState.activeSort;
        operation.newSort = sortCommand;
        operation.willSort = self.willSort(sortCommand, operation.startState.activeSort);

        if (operation.willSort) {
          self.sortOperation(operation);
        }
      }

      operation.startFilter = operation.startState.activeFilter;

      if (filterCommand) {
        operation.newFilter = filterCommand;
      } else {
        operation.newFilter = h.extend(new _mixitup.CommandFilter(), operation.startFilter);
      }

      if (operation.newFilter.selector === 'all') {
        operation.newFilter.selector = self.config.selectors.target;
      } else if (operation.newFilter.selector === 'none') {
        operation.newFilter.selector = '';
      }

      self.filterOperation(operation);
      operation.startContainerClassName = operation.startState.activeContainerClassName;

      if (changeLayoutCommand) {
        operation.newContainerClassName = changeLayoutCommand.containerClassName;

        if (operation.newContainerClassName !== operation.startContainerClassName) {
          operation.willChangeLayout = true;
        }
      } else {
        operation.newContainerClassName = operation.startContainerClassName;
      }

      if (self.config.animation.enable) {
        // Populate the operation's position data
        self.getStartMixData(operation);
        self.setInter(operation);
        operation.docState = h.getDocumentState(self.dom.document);
        self.getInterMixData(operation);
        self.setFinal(operation);
        self.getFinalMixData(operation);
        self.parseEffects();
        operation.hasEffect = self.hasEffect();
        self.getTweenData(operation);
      }

      if (operation.willSort) {
        self.targets = operation.newOrder;
      }

      operation.newState = self.buildState(operation);
      return self.callFilters('operationMappedGetOperation', operation, arguments);
    },

    /**
     * Renders a previously created operation at a specific point in its path, as
     * determined by a multiplier between 0 and 1.
     *
     * @example
     * .tween(operation, multiplier)
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.Operation}     operation
     *      An operation object created via the `getOperation` method
     *
     * @param   {Float}                 multiplier
     *      Any number between 0 and 1 representing the percentage complete of the operation
     * @return  {void}
     */
    tween: function tween(operation, multiplier) {
      var target = null,
          posData = null,
          toHideIndex = -1,
          i = -1;
      multiplier = Math.min(multiplier, 1);
      multiplier = Math.max(multiplier, 0);

      for (i = 0; target = operation.show[i]; i++) {
        posData = operation.showPosData[i];
        target.applyTween(posData, multiplier);
      }

      for (i = 0; target = operation.hide[i]; i++) {
        if (target.isShown) {
          target.hide();
        }

        if ((toHideIndex = operation.toHide.indexOf(target)) > -1) {
          posData = operation.toHidePosData[toHideIndex];

          if (!target.isShown) {
            target.show();
          }

          target.applyTween(posData, multiplier);
        }
      }
    },

    /**
     * Inserts one or more new target elements into the container at a specified
     * index.
     *
     * To be indexed as targets, new elements must match the `selectors.target`
     * selector (`'.mix'` by default).
     *
     * @example
     *
     * .insert(newElements [, index] [, animate], [, callback])
     *
     * @example <caption>Example 1: Inserting a single element via reference</caption>
     *
     * console.log(mixer.getState().totalShow); // 0
     *
     * // Create a new element
     *
     * var newElement = document.createElement('div');
     * newElement.classList.add('mix');
     *
     * mixer.insert(newElement)
     *     .then(function(state) {
     *         console.log(state.totalShow === 1); // true
     *     });
     *
     * @example <caption>Example 2: Inserting a single element via HTML string</caption>
     *
     * console.log(mixer.getState().totalShow); // 1
     *
     * // Create a new element via reference
     *
     * var newElementHtml = '&lt;div class="mix"&gt;&lt;/div&gt;';
     *
     * // Create and insert the new element at index 1
     *
     * mixer.insert(newElementHtml, 1)
     *     .then(function(state) {
     *         console.log(state.totalShow === 2); // true
     *         console.log(state.show[1].outerHTML === newElementHtml); // true
     *     });
     *
     * @example <caption>Example 3: Inserting multiple elements via reference</caption>
     *
     * console.log(mixer.getState().totalShow); // 2
     *
     * // Create an array of new elements to insert.
     *
     * var newElement1 = document.createElement('div');
     * var newElement2 = document.createElement('div');
     *
     * newElement1.classList.add('mix');
     * newElement2.classList.add('mix');
     *
     * var newElementsCollection = [newElement1, newElement2];
     *
     * // Insert the new elements starting at index 1
     *
     * mixer.insert(newElementsCollection, 1)
     *     .then(function(state) {
     *         console.log(state.totalShow === 4); // true
     *         console.log(state.show[1] === newElement1); // true
     *         console.log(state.show[2] === newElement2); // true
     *     });
     *
     * @example <caption>Example 4: Inserting a jQuery collection object containing one or more elements</caption>
     *
     * console.log(mixer.getState().totalShow); // 4
     *
     * var $newElement = $('&lt;div class="mix"&gt;&lt;/div&gt;');
     *
     * // Insert the new elements starting at index 3
     *
     * mixer.insert(newElementsCollection, 3)
     *     .then(function(state) {
     *         console.log(state.totalShow === 5); // true
     *         console.log(state.show[3] === $newElement[0]); // true
     *     });
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
     *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
     * @param       {number}    index=0
     *      The index at which to insert the new element(s). `0` by default.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    insert: function insert() {
      var self = this,
          args = self.parseInsertArgs(arguments);
      return self.multimix({
        insert: args.command
      }, args.animate, args.callback);
    },

    /**
     * Inserts one or more new elements before a provided reference element.
     *
     * @example
     *
     * .insertBefore(newElements, referenceElement [, animate] [, callback])
     *
     * @example <caption>Example: Inserting a new element before a reference element</caption>
     *
     * // An existing reference element is chosen at index 2
     *
     * var referenceElement = mixer.getState().show[2];
     *
     * // Create a new element
     *
     * var newElement = document.createElement('div');
     * newElement.classList.add('mix');
     *
     * mixer.insertBefore(newElement, referenceElement)
     *     .then(function(state) {
     *         // The new element is inserted into the container at index 2, before the reference element
     *
     *         console.log(state.show[2] === newElement); // true
     *
     *         // The reference element is now at index 3
     *
     *         console.log(state.show[3] === referenceElement); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
     *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
     * @param       {HTMLElement}    referenceElement
     *      A reference to an existing element in the container to insert new elements before.
     *@param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    insertBefore: function insertBefore() {
      var self = this,
          args = self.parseInsertArgs(arguments);
      return self.insert(args.command.collection, 'before', args.command.sibling, args.animate, args.callback);
    },

    /**
     * Inserts one or more new elements after a provided reference element.
     *
     * @example
     *
     * .insertAfter(newElements, referenceElement [, animate] [, callback])
     *
     * @example <caption>Example: Inserting a new element after a reference element</caption>
     *
     * // An existing reference element is chosen at index 2
     *
     * var referenceElement = mixer.getState().show[2];
     *
     * // Create a new element
     *
     * var newElement = document.createElement('div');
     * newElement.classList.add('mix');
     *
     * mixer.insertAfter(newElement, referenceElement)
     *     .then(function(state) {
     *         // The new element is inserted into the container at index 3, after the reference element
     *
     *         console.log(state.show[3] === newElement); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
     *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
     * @param       {HTMLElement}    referenceElement
     *      A reference to an existing element in the container to insert new elements after.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    insertAfter: function insertAfter() {
      var self = this,
          args = self.parseInsertArgs(arguments);
      return self.insert(args.command.collection, 'after', args.command.sibling, args.animate, args.callback);
    },

    /**
     * Inserts one or more new elements into the container before all existing targets.
     *
     * @example
     *
     * .prepend(newElements [,animate] [,callback])
     *
     * @example <caption>Example: Prepending a new element</caption>
     *
     * // Create a new element
     *
     * var newElement = document.createElement('div');
     * newElement.classList.add('mix');
     *
     * // Insert the element into the container
     *
     * mixer.prepend(newElement)
     *     .then(function(state) {
     *         console.log(state.show[0] === newElement); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
     *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    prepend: function prepend() {
      var self = this,
          args = self.parseInsertArgs(arguments);
      return self.insert(0, args.command.collection, args.animate, args.callback);
    },

    /**
     * Inserts one or more new elements into the container after all existing targets.
     *
     * @example
     *
     * .append(newElements [,animate] [,callback])
     *
     * @example <caption>Example: Appending a new element</caption>
     *
     * // Create a new element
     *
     * var newElement = document.createElement('div');
     * newElement.classList.add('mix');
     *
     * // Insert the element into the container
     *
     * mixer.append(newElement)
     *     .then(function(state) {
     *         console.log(state.show[state.show.length - 1] === newElement); // true
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string)}    newElements
     *      A reference to a single element to insert, an array-like collection of elements, or an HTML string representing a single element.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    append: function append() {
      var self = this,
          args = self.parseInsertArgs(arguments);
      return self.insert(self.state.totalTargets, args.command.collection, args.animate, args.callback);
    },

    /**
     * Removes one or more existing target elements from the container.
     *
     * @example
     *
     * .remove(elements [, animate] [, callback])
     *
     * @example <caption>Example 1: Removing an element by reference</caption>
     *
     * var elementToRemove = containerEl.firstElementChild;
     *
     * mixer.remove(elementToRemove)
     *      .then(function(state) {
     *          console.log(state.targets.indexOf(elementToRemove) === -1); // true
     *      });
     *
     * @example <caption>Example 2: Removing a collection of elements by reference</caption>
     *
     * var elementsToRemove = containerEl.querySelectorAll('.category-a');
     *
     * console.log(elementsToRemove.length) // 3
     *
     * mixer.remove(elementsToRemove)
     *      .then(function() {
     *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
     *      });
     *
     * @example <caption>Example 3: Removing one or more elements by selector</caption>
     *
     * mixer.remove('.category-a')
     *      .then(function() {
     *          console.log(containerEl.querySelectorAll('.category-a').length); // 0
     *      });
     *
     * @example <caption>Example 4: Removing an element by index</caption>
     *
     * console.log(mixer.getState.totalShow); // 4
     *
     * // Remove the element at index 3
     *
     * mixer.remove(3)
     *      .then(function(state) {
     *          console.log(state.totalShow); // 3
     *          console.log(state.show[3]); // undefined
     *      });
     *
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {(HTMLElement|Array.<HTMLElement>|string|number)}    elements
     *      A reference to a single element to remove, an array-like collection of elements, a selector string, or the index of an element to remove.
     * @param       {boolean}   [animate=true]
     *      An optional boolean dictating whether the operation should animate, or occur syncronously with no animation. `true` by default.
     * @param       {function}  [callback=null]
     *      An optional callback function to be invoked after the operation has completed.
     * @return      {Promise.<mixitup.State>}
     *      A promise resolving with the current state object.
     */
    remove: function remove() {
      var self = this,
          args = self.parseRemoveArgs(arguments);
      return self.multimix({
        remove: args.command
      }, args.animate, args.callback);
    },

    /**
     * Retrieves the the value of any property or sub-object within the current
     * mixitup configuration, or the whole configuration object.
     *
     * @example
     *
     * .getConfig([stringKey])
     *
     * @example <caption>Example 1: retrieve the entire configuration object</caption>
     *
     * var config = mixer.getConfig(); // Config { ... }
     *
     * @example <caption>Example 2: retrieve a named sub-object of configuration object</caption>
     *
     * var animation = mixer.getConfig('animation'); // ConfigAnimation { ... }
     *
     * @example <caption>Example 3: retrieve a value of configuration object via a dot-notation string key</caption>
     *
     * var effects = mixer.getConfig('animation.effects'); // 'fade scale'
     *
     * @public
     * @instance
     * @since       2.0.0
     * @param       {string}    [stringKey]    A "dot-notation" string key
     * @return      {*}
     */
    getConfig: function getConfig(stringKey) {
      var self = this,
          value = null;

      if (!stringKey) {
        value = self.config;
      } else {
        value = h.getProperty(self.config, stringKey);
      }

      return self.callFilters('valueGetConfig', value, arguments);
    },

    /**
     * Updates the configuration of the mixer, after it has been instantiated.
     *
     * See the Configuration Object documentation for a full list of avilable
     * configuration options.
     *
     * @example
     *
     * .configure(config)
     *
     * @example <caption>Example 1: Updating animation options</caption>
     *
     * mixer.configure({
     *     animation: {
     *         effects: 'fade translateX(-100%)',
     *         duration: 300
     *     }
     * });
     *
     * @example <caption>Example 2: Removing a callback after it has been set</caption>
     *
     * var mixer;
     *
     * function handleMixEndOnce() {
     *     // Do something ..
     *
     *     // Then nullify the callback
     *
     *     mixer.configure({
     *         callbacks: {
     *             onMixEnd: null
     *         }
     *     });
     * };
     *
     * // Instantiate a mixer with a callback defined
     *
     * mixer = mixitup(containerEl, {
     *     callbacks: {
     *         onMixEnd: handleMixEndOnce
     *     }
     * });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {object}    config
     *      An object containing one of more configuration options.
     * @return      {void}
     */
    configure: function configure(config) {
      var self = this;
      self.callActions('beforeConfigure', arguments);
      h.extend(self.config, config, true, true);
      self.callActions('afterConfigure', arguments);
    },

    /**
     * Returns an object containing information about the current state of the
     * mixer. See the State Object documentation for more information.
     *
     * NB: State objects are immutable and should therefore be regenerated
     * after any operation.
     *
     * @example
     *
     * .getState();
     *
     * @example <caption>Example: Retrieving a state object</caption>
     *
     * var state = mixer.getState();
     *
     * console.log(state.totalShow + 'targets are currently shown');
     *
     * @public
     * @instance
     * @since       2.0.0
     * @return      {mixitup.State} An object reflecting the current state of the mixer.
     */
    getState: function getState() {
      var self = this,
          state = null;
      state = new _mixitup.State();
      h.extend(state, self.state);
      h.freeze(state);
      return self.callFilters('stateGetState', state, arguments);
    },

    /**
     * Forces the re-indexing all targets within the container.
     *
     * This should only be used if some other piece of code in your application
     * has manipulated the contents of your container, which should be avoided.
     *
     * If you need to add or remove target elements from the container, use
     * the built-in `.insert()` or `.remove()` methods, and MixItUp will keep
     * itself up to date.
     *
     * @example
     *
     * .forceRefresh()
     *
     * @example <caption>Example: Force refreshing the mixer after external DOM manipulation</caption>
     *
     * console.log(mixer.getState().totalShow); // 3
     *
     * // An element is removed from the container via some external DOM manipulation code:
     *
     * containerEl.removeChild(containerEl.firstElementChild);
     *
     * // The mixer does not know that the number of targets has changed:
     *
     * console.log(mixer.getState().totalShow); // 3
     *
     * mixer.forceRefresh();
     *
     * // After forceRefresh, the mixer is in sync again:
     *
     * console.log(mixer.getState().totalShow); // 2
     *
     * @public
     * @instance
     * @since 2.1.2
     * @return {void}
     */
    forceRefresh: function forceRefresh() {
      var self = this;
      self.indexTargets();
    },

    /**
     * Forces the re-rendering of all targets when using the Dataset API.
     *
     * By default, targets are only re-rendered when `data.dirtyCheck` is
     * enabled, and an item's data has changed when `dataset()` is called.
     *
     * The `forceRender()` method allows for the re-rendering of all targets
     * in response to some arbitrary event, such as the changing of the target
     * render function.
     *
     * Targets are rendered against their existing data.
     *
     * @example
     *
     * .forceRender()
     *
     * @example <caption>Example: Force render targets after changing the target render function</caption>
     *
     * console.log(container.innerHTML); // ... &lt;span class="mix"&gt;Foo&lt;/span&gt; ...
     *
     * mixer.configure({
     *     render: {
     *         target: (item) => `&lt;a href="/${item.slug}/" class="mix"&gt;${item.title}&lt;/a&gt;`
     *     }
     * });
     *
     * mixer.forceRender();
     *
     * console.log(container.innerHTML); // ... &lt;a href="/foo/" class="mix"&gt;Foo&lt;/a&gt; ...
     *
     * @public
     * @instance
     * @since 3.2.1
     * @return {void}
     */
    forceRender: function forceRender() {
      var self = this,
          target = null,
          el = null,
          id = '';

      for (id in self.cache) {
        target = self.cache[id];
        el = target.render(target.data);

        if (el !== target.dom.el) {
          // Update target element reference
          if (target.isInDom) {
            target.unbindEvents();
            self.dom.parent.replaceChild(el, target.dom.el);
          }

          if (!target.isShown) {
            el.style.display = 'none';
          }

          target.dom.el = el;

          if (target.isInDom) {
            target.bindEvents();
          }
        }
      }

      self.state = self.buildState(self.lastOperation);
    },

    /**
     * Removes mixitup functionality from the container, unbinds all control
     * event handlers, and deletes the mixer instance from MixItUp's internal
     * cache.
     *
     * This should be performed whenever a mixer's container is removed from
     * the DOM, such as during a page change in a single page application,
     * or React's `componentWillUnmount()`.
     *
     * @example
     *
     * .destroy([cleanUp])
     *
     * @example <caption>Example: Destroying the mixer before removing its container element</caption>
     *
     * mixer.destroy();
     *
     * containerEl.parentElement.removeChild(containerEl);
     *
     * @public
     * @instance
     * @since   2.0.0
     * @param   {boolean}   [cleanUp=false]
     *     An optional boolean dictating whether or not to clean up any inline `display: none;` styling applied to hidden targets.
     * @return  {void}
     */
    destroy: function destroy(cleanUp) {
      var self = this,
          control = null,
          target = null,
          i = 0;
      self.callActions('beforeDestroy', arguments);

      for (i = 0; control = self.controls[i]; i++) {
        control.removeBinding(self);
      }

      for (i = 0; target = self.targets[i]; i++) {
        if (cleanUp) {
          target.show();
        }

        target.unbindEvents();
      }

      if (self.dom.container.id.match(/^MixItUp/)) {
        self.dom.container.removeAttribute('id');
      }

      delete _mixitup.instances[self.id];
      self.callActions('afterDestroy', arguments);
    }
  });
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.IMoveData = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.posIn = null;
    this.posOut = null;
    this.operation = null;
    this.callback = null;
    this.statusChange = '';
    this.duration = -1;
    this.staggerIndex = -1;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.IMoveData);

  _mixitup.IMoveData.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.IMoveData.prototype.constructor = _mixitup.IMoveData;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.TargetDom = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.el = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.TargetDom);

  _mixitup.TargetDom.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.TargetDom.prototype.constructor = _mixitup.TargetDom;
  /**
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.Target = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.id = '';
    this.sortString = '';
    this.mixer = null;
    this.callback = null;
    this.isShown = false;
    this.isBound = false;
    this.isExcluded = false;
    this.isInDom = false;
    this.handler = null;
    this.operation = null;
    this.data = null;
    this.dom = new _mixitup.TargetDom();
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Target);

  _mixitup.Target.prototype = Object.create(_mixitup.Base.prototype);
  h.extend(_mixitup.Target.prototype, {
    constructor: _mixitup.Target,

    /**
     * Initialises a newly instantiated Target.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {(Element|null)}    el
     * @param   {object}            mixer
     * @param   {object}            [data]
     * @return  {void}
     */
    init: function init(el, mixer, data) {
      var self = this,
          id = '';
      self.callActions('beforeInit', arguments);
      self.mixer = mixer;

      if (!el) {
        // If no element is provided, render it
        el = self.render(data);
      }

      self.cacheDom(el);
      self.bindEvents();

      if (self.dom.el.style.display !== 'none') {
        self.isShown = true;
      }

      if (data && mixer.config.data.uidKey) {
        if (typeof (id = data[mixer.config.data.uidKey]) === 'undefined' || id.toString().length < 1) {
          throw new TypeError(_mixitup.messages.errorDatasetInvalidUidKey({
            uidKey: mixer.config.data.uidKey
          }));
        }

        self.id = id;
        self.data = data;
        mixer.cache[id] = self;
      }

      self.callActions('afterInit', arguments);
    },

    /**
     * Renders the target element using a user-defined renderer function.
     *
     * @private
     * @instance
     * @since   3.1.4
     * @param   {object} data
     * @return  {void}
     */
    render: function render(data) {
      var self = this,
          render = null,
          el = null,
          temp = null,
          output = '';
      self.callActions('beforeRender', arguments);
      render = self.callFilters('renderRender', self.mixer.config.render.target, arguments);

      if (typeof render !== 'function') {
        throw new TypeError(_mixitup.messages.errorDatasetRendererNotSet());
      }

      output = render(data);

      if (output && _typeof(output) === 'object' && h.isElement(output)) {
        el = output;
      } else if (typeof output === 'string') {
        temp = document.createElement('div');
        temp.innerHTML = output;
        el = temp.firstElementChild;
      }

      return self.callFilters('elRender', el, arguments);
    },

    /**
     * Caches references of DOM elements neccessary for the target's functionality.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Element} el
     * @return  {void}
     */
    cacheDom: function cacheDom(el) {
      var self = this;
      self.callActions('beforeCacheDom', arguments);
      self.dom.el = el;
      self.callActions('afterCacheDom', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string}    attributeName
     * @return  {void}
     */
    getSortString: function getSortString(attributeName) {
      var self = this,
          value = self.dom.el.getAttribute('data-' + attributeName) || '';
      self.callActions('beforeGetSortString', arguments);
      value = isNaN(value * 1) ? value.toLowerCase() : value * 1;
      self.sortString = value;
      self.callActions('afterGetSortString', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @return  {void}
     */
    show: function show() {
      var self = this;
      self.callActions('beforeShow', arguments);

      if (!self.isShown) {
        self.dom.el.style.display = '';
        self.isShown = true;
      }

      self.callActions('afterShow', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @return  {void}
     */
    hide: function hide() {
      var self = this;
      self.callActions('beforeHide', arguments);

      if (self.isShown) {
        self.dom.el.style.display = 'none';
        self.isShown = false;
      }

      self.callActions('afterHide', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {mixitup.IMoveData} moveData
     * @return  {void}
     */
    move: function move(moveData) {
      var self = this;
      self.callActions('beforeMove', arguments);

      if (!self.isExcluded) {
        self.mixer.targetsMoved++;
      }

      self.applyStylesIn(moveData);
      requestAnimationFrame(function () {
        self.applyStylesOut(moveData);
      });
      self.callActions('afterMove', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {object}    posData
     * @param   {number}    multiplier
     * @return  {void}
     */
    applyTween: function applyTween(posData, multiplier) {
      var self = this,
          propertyName = '',
          tweenData = null,
          posIn = posData.posIn,
          currentTransformValues = [],
          currentValues = new _mixitup.StyleData(),
          i = -1;
      self.callActions('beforeApplyTween', arguments);
      currentValues.x = posIn.x;
      currentValues.y = posIn.y;

      if (multiplier === 0) {
        self.hide();
      } else if (!self.isShown) {
        self.show();
      }

      for (i = 0; propertyName = _mixitup.features.TWEENABLE[i]; i++) {
        tweenData = posData.tweenData[propertyName];

        if (propertyName === 'x') {
          if (!tweenData) continue;
          currentValues.x = posIn.x + tweenData * multiplier;
        } else if (propertyName === 'y') {
          if (!tweenData) continue;
          currentValues.y = posIn.y + tweenData * multiplier;
        } else if (tweenData instanceof _mixitup.TransformData) {
          if (!tweenData.value) continue;
          currentValues[propertyName].value = posIn[propertyName].value + tweenData.value * multiplier;
          currentValues[propertyName].unit = tweenData.unit;
          currentTransformValues.push(propertyName + '(' + currentValues[propertyName].value + tweenData.unit + ')');
        } else {
          if (!tweenData) continue;
          currentValues[propertyName] = posIn[propertyName] + tweenData * multiplier;
          self.dom.el.style[propertyName] = currentValues[propertyName];
        }
      }

      if (currentValues.x || currentValues.y) {
        currentTransformValues.unshift('translate(' + currentValues.x + 'px, ' + currentValues.y + 'px)');
      }

      if (currentTransformValues.length) {
        self.dom.el.style[_mixitup.features.transformProp] = currentTransformValues.join(' ');
      }

      self.callActions('afterApplyTween', arguments);
    },

    /**
     * Applies the initial styling to a target element before any transition
     * is applied.
     *
     * @private
     * @instance
     * @param   {mixitup.IMoveData} moveData
     * @return  {void}
     */
    applyStylesIn: function applyStylesIn(moveData) {
      var self = this,
          posIn = moveData.posIn,
          isFading = self.mixer.effectsIn.opacity !== 1,
          transformValues = [];
      self.callActions('beforeApplyStylesIn', arguments);
      transformValues.push('translate(' + posIn.x + 'px, ' + posIn.y + 'px)');

      if (self.mixer.config.animation.animateResizeTargets) {
        if (moveData.statusChange !== 'show') {
          // Don't apply posIn width or height or showing, as will be 0
          self.dom.el.style.width = posIn.width + 'px';
          self.dom.el.style.height = posIn.height + 'px';
        }

        self.dom.el.style.marginRight = posIn.marginRight + 'px';
        self.dom.el.style.marginBottom = posIn.marginBottom + 'px';
      }

      isFading && (self.dom.el.style.opacity = posIn.opacity);

      if (moveData.statusChange === 'show') {
        transformValues = transformValues.concat(self.mixer.transformIn);
      }

      self.dom.el.style[_mixitup.features.transformProp] = transformValues.join(' ');
      self.callActions('afterApplyStylesIn', arguments);
    },

    /**
     * Applies a transition followed by the final styles for the element to
     * transition towards.
     *
     * @private
     * @instance
     * @param   {mixitup.IMoveData} moveData
     * @return  {void}
     */
    applyStylesOut: function applyStylesOut(moveData) {
      var self = this,
          transitionRules = [],
          transformValues = [],
          isResizing = self.mixer.config.animation.animateResizeTargets,
          isFading = typeof self.mixer.effectsIn.opacity !== 'undefined';
      self.callActions('beforeApplyStylesOut', arguments); // Build the transition rules

      transitionRules.push(self.writeTransitionRule(_mixitup.features.transformRule, moveData.staggerIndex));

      if (moveData.statusChange !== 'none') {
        transitionRules.push(self.writeTransitionRule('opacity', moveData.staggerIndex, moveData.duration));
      }

      if (isResizing) {
        transitionRules.push(self.writeTransitionRule('width', moveData.staggerIndex, moveData.duration));
        transitionRules.push(self.writeTransitionRule('height', moveData.staggerIndex, moveData.duration));
        transitionRules.push(self.writeTransitionRule('margin', moveData.staggerIndex, moveData.duration));
      } // If no callback was provided, the element will
      // not transition in any way so tag it as "immovable"


      if (!moveData.callback) {
        self.mixer.targetsImmovable++;

        if (self.mixer.targetsMoved === self.mixer.targetsImmovable) {
          // If the total targets moved is equal to the
          // number of immovable targets, the operation
          // should be considered finished
          self.mixer.cleanUp(moveData.operation);
        }

        return;
      } // If the target will transition in some fasion,
      // assign a callback function


      self.operation = moveData.operation;
      self.callback = moveData.callback; // As long as the target is not excluded, increment
      // the total number of targets bound

      !self.isExcluded && self.mixer.targetsBound++; // Tag the target as bound to differentiate from transitionEnd
      // events that may come from stylesheet driven effects

      self.isBound = true; // Apply the transition

      self.applyTransition(transitionRules); // Apply width, height and margin negation

      if (isResizing && moveData.posOut.width > 0 && moveData.posOut.height > 0) {
        self.dom.el.style.width = moveData.posOut.width + 'px';
        self.dom.el.style.height = moveData.posOut.height + 'px';
        self.dom.el.style.marginRight = moveData.posOut.marginRight + 'px';
        self.dom.el.style.marginBottom = moveData.posOut.marginBottom + 'px';
      }

      if (!self.mixer.config.animation.nudge && moveData.statusChange === 'hide') {
        // If we're not nudging, the translation should be
        // applied before any other transforms to prevent
        // lateral movement
        transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
      } // Apply fade


      switch (moveData.statusChange) {
        case 'hide':
          isFading && (self.dom.el.style.opacity = self.mixer.effectsOut.opacity);
          transformValues = transformValues.concat(self.mixer.transformOut);
          break;

        case 'show':
          isFading && (self.dom.el.style.opacity = 1);
      }

      if (self.mixer.config.animation.nudge || !self.mixer.config.animation.nudge && moveData.statusChange !== 'hide') {
        // Opposite of above - apply translate after
        // other transform
        transformValues.push('translate(' + moveData.posOut.x + 'px, ' + moveData.posOut.y + 'px)');
      } // Apply transforms


      self.dom.el.style[_mixitup.features.transformProp] = transformValues.join(' ');
      self.callActions('afterApplyStylesOut', arguments);
    },

    /**
     * Combines the name of a CSS property with the appropriate duration and delay
     * values to created a valid transition rule.
     *
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string}    property
     * @param   {number}    staggerIndex
     * @param   {number}    duration
     * @return  {string}
     */
    writeTransitionRule: function writeTransitionRule(property, staggerIndex, duration) {
      var self = this,
          delay = self.getDelay(staggerIndex),
          rule = '';
      rule = property + ' ' + (duration > 0 ? duration : self.mixer.config.animation.duration) + 'ms ' + delay + 'ms ' + (property === 'opacity' ? 'linear' : self.mixer.config.animation.easing);
      return self.callFilters('ruleWriteTransitionRule', rule, arguments);
    },

    /**
     * Calculates the transition delay for each target element based on its index, if
     * staggering is applied. If defined, A custom `animation.staggerSeqeuence`
     * function can be used to manipulate the order of indices to produce custom
     * stagger effects (e.g. for use in a grid with irregular row lengths).
     *
     * @private
     * @instance
     * @since   2.0.0
     * @param   {number}    index
     * @return  {number}
     */
    getDelay: function getDelay(index) {
      var self = this,
          delay = -1;

      if (typeof self.mixer.config.animation.staggerSequence === 'function') {
        index = self.mixer.config.animation.staggerSequence.call(self, index, self.state);
      }

      delay = !!self.mixer.staggerDuration ? index * self.mixer.staggerDuration : 0;
      return self.callFilters('delayGetDelay', delay, arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {string[]}  rules
     * @return  {void}
     */
    applyTransition: function applyTransition(rules) {
      var self = this,
          transitionString = rules.join(', ');
      self.callActions('beforeApplyTransition', arguments);
      self.dom.el.style[_mixitup.features.transitionProp] = transitionString;
      self.callActions('afterApplyTransition', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Event} e
     * @return  {void}
     */
    handleTransitionEnd: function handleTransitionEnd(e) {
      var self = this,
          propName = e.propertyName,
          canResize = self.mixer.config.animation.animateResizeTargets;
      self.callActions('beforeHandleTransitionEnd', arguments);

      if (self.isBound && e.target.matches(self.mixer.config.selectors.target) && (propName.indexOf('transform') > -1 || propName.indexOf('opacity') > -1 || canResize && propName.indexOf('height') > -1 || canResize && propName.indexOf('width') > -1 || canResize && propName.indexOf('margin') > -1)) {
        self.callback.call(self, self.operation);
        self.isBound = false;
        self.callback = null;
        self.operation = null;
      }

      self.callActions('afterHandleTransitionEnd', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {Event}     e
     * @return  {void}
     */
    eventBus: function eventBus(e) {
      var self = this;
      self.callActions('beforeEventBus', arguments);

      switch (e.type) {
        case 'webkitTransitionEnd':
        case 'transitionend':
          self.handleTransitionEnd(e);
      }

      self.callActions('afterEventBus', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @return  {void}
     */
    unbindEvents: function unbindEvents() {
      var self = this;
      self.callActions('beforeUnbindEvents', arguments);
      h.off(self.dom.el, 'webkitTransitionEnd', self.handler);
      h.off(self.dom.el, 'transitionend', self.handler);
      self.callActions('afterUnbindEvents', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @return  {void}
     */
    bindEvents: function bindEvents() {
      var self = this,
          transitionEndEvent = '';
      self.callActions('beforeBindEvents', arguments);
      transitionEndEvent = _mixitup.features.transitionPrefix === 'webkit' ? 'webkitTransitionEnd' : 'transitionend';

      self.handler = function (e) {
        return self.eventBus(e);
      };

      h.on(self.dom.el, transitionEndEvent, self.handler);
      self.callActions('afterBindEvents', arguments);
    },

    /**
     * @private
     * @instance
     * @since   3.0.0
     * @param   {boolean}   [getBox]
     * @return  {PosData}
     */
    getPosData: function getPosData(getBox) {
      var self = this,
          styles = {},
          rect = null,
          posData = new _mixitup.StyleData();
      self.callActions('beforeGetPosData', arguments);
      posData.x = self.dom.el.offsetLeft;
      posData.y = self.dom.el.offsetTop;

      if (self.mixer.config.animation.animateResizeTargets || getBox) {
        rect = self.dom.el.getBoundingClientRect();
        posData.top = rect.top;
        posData.right = rect.right;
        posData.bottom = rect.bottom;
        posData.left = rect.left;
        posData.width = rect.width;
        posData.height = rect.height;
      }

      if (self.mixer.config.animation.animateResizeTargets) {
        styles = window.getComputedStyle(self.dom.el);
        posData.marginBottom = parseFloat(styles.marginBottom);
        posData.marginRight = parseFloat(styles.marginRight);
      }

      return self.callFilters('posDataGetPosData', posData, arguments);
    },

    /**
     * @private
     * @instance
     * @since       3.0.0
     * @return      {void}
     */
    cleanUp: function cleanUp() {
      var self = this;
      self.callActions('beforeCleanUp', arguments);
      self.dom.el.style[_mixitup.features.transformProp] = '';
      self.dom.el.style[_mixitup.features.transitionProp] = '';
      self.dom.el.style.opacity = '';

      if (self.mixer.config.animation.animateResizeTargets) {
        self.dom.el.style.width = '';
        self.dom.el.style.height = '';
        self.dom.el.style.marginRight = '';
        self.dom.el.style.marginBottom = '';
      }

      self.callActions('afterCleanUp', arguments);
    }
  });
  /**
   * A jQuery-collection-like wrapper around one or more `mixitup.Mixer` instances
   * allowing simultaneous control of said instances similar to the MixItUp 2 API.
   *
   * @example
   * new mixitup.Collection(instances)
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   * @param       {mixitup.Mixer[]}   instances
   */

  _mixitup.Collection = function (instances) {
    var instance = null,
        i = -1;
    this.callActions('beforeConstruct');

    for (i = 0; instance = instances[i]; i++) {
      this[i] = instance;
    }

    this.length = instances.length;
    this.callActions('afterConstruct');
    h.freeze(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Collection);

  _mixitup.Collection.prototype = Object.create(_mixitup.Base.prototype);
  h.extend(_mixitup.Collection.prototype,
  /** @lends mixitup.Collection */
  {
    constructor: _mixitup.Collection,

    /**
     * Calls a method on all instances in the collection by passing the method
     * name as a string followed by any applicable parameters to be curried into
     * to the method.
     *
     * @example
     * .mixitup(methodName[,arg1][,arg2..]);
     *
     * @example
     * var collection = new Collection([mixer1, mixer2]);
     *
     * return collection.mixitup('filter', '.category-a')
     *     .then(function(states) {
     *         state.forEach(function(state) {
     *             console.log(state.activeFilter.selector); // .category-a
     *         });
     *     });
     *
     * @public
     * @instance
     * @since       3.0.0
     * @param       {string}  methodName
     * @return      {Promise<Array<mixitup.State>>}
     */
    mixitup: function mixitup(methodName) {
      var self = this,
          instance = null,
          args = Array.prototype.slice.call(arguments),
          tasks = [],
          i = -1;
      this.callActions('beforeMixitup');
      args.shift();

      for (i = 0; instance = self[i]; i++) {
        tasks.push(instance[methodName].apply(instance, args));
      }

      return self.callFilters('promiseMixitup', h.all(tasks, _mixitup.libraries), arguments);
    }
  });
  /**
   * `mixitup.Operation` objects contain all data neccessary to describe the full
   * lifecycle of any MixItUp operation. They can be used to compute and store an
   * operation for use at a later time (e.g. programmatic tweening).
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.Operation = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.id = '';
    this.args = [];
    this.command = null;
    this.showPosData = [];
    this.toHidePosData = [];
    this.startState = null;
    this.newState = null;
    this.docState = null;
    this.willSort = false;
    this.willChangeLayout = false;
    this.hasEffect = false;
    this.hasFailed = false;
    this.triggerElement = null;
    this.show = [];
    this.hide = [];
    this.matching = [];
    this.toShow = [];
    this.toHide = [];
    this.toMove = [];
    this.toRemove = [];
    this.startOrder = [];
    this.newOrder = [];
    this.startSort = null;
    this.newSort = null;
    this.startFilter = null;
    this.newFilter = null;
    this.startDataset = null;
    this.newDataset = null;
    this.viewportDeltaX = 0;
    this.viewportDeltaY = 0;
    this.startX = 0;
    this.startY = 0;
    this.startHeight = 0;
    this.startWidth = 0;
    this.newX = 0;
    this.newY = 0;
    this.newHeight = 0;
    this.newWidth = 0;
    this.startContainerClassName = '';
    this.startDisplay = '';
    this.newContainerClassName = '';
    this.newDisplay = '';
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Operation);

  _mixitup.Operation.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.Operation.prototype.constructor = _mixitup.Operation;
  /**
   * `mixitup.State` objects expose various pieces of data detailing the state of
   * a MixItUp instance. They are provided at the start and end of any operation via
   * callbacks and events, with the most recent state stored between operations
   * for retrieval at any time via the API.
   *
   * @constructor
   * @namespace
   * @memberof    mixitup
   * @public
   * @since       3.0.0
   */

  _mixitup.State = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /**
     * The ID of the mixer instance.
     *
     * @name        id
     * @memberof    mixitup.State
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.id = '';
    /**
     * The currently active filter command as set by a control click or API call.
     *
     * @name        activeFilter
     * @memberof    mixitup.State
     * @instance
     * @type        {mixitup.CommandFilter}
     * @default     null
     */

    this.activeFilter = null;
    /**
     * The currently active sort command as set by a control click or API call.
     *
     * @name        activeSort
     * @memberof    mixitup.State
     * @instance
     * @type        {mixitup.CommandSort}
     * @default     null
     */

    this.activeSort = null;
    /**
     * The current layout-specific container class name, if applied.
     *
     * @name        activeContainerClassName
     * @memberof    mixitup.State
     * @instance
     * @type        {string}
     * @default     ''
     */

    this.activeContainerClassName = '';
    /**
     * A reference to the container element that the mixer is instantiated on.
     *
     * @name        container
     * @memberof    mixitup.State
     * @instance
     * @type        {Element}
     * @default     null
     */

    this.container = null;
    /**
     * An array of all target elements indexed by the mixer.
     *
     * @name        targets
     * @memberof    mixitup.State
     * @instance
     * @type        {Array.<Element>}
     * @default     []
     */

    this.targets = [];
    /**
     * An array of all target elements not matching the current filter.
     *
     * @name        hide
     * @memberof    mixitup.State
     * @instance
     * @type        {Array.<Element>}
     * @default     []
     */

    this.hide = [];
    /**
     * An array of all target elements matching the current filter and any additional
     * limits applied such as pagination.
     *
     * @name        show
     * @memberof    mixitup.State
     * @instance
     * @type        {Array.<Element>}
     * @default     []
     */

    this.show = [];
    /**
     * An array of all target elements matching the current filter irrespective of
     * any additional limits applied such as pagination.
     *
     * @name        matching
     * @memberof    mixitup.State
     * @instance
     * @type        {Array.<Element>}
     * @default     []
     */

    this.matching = [];
    /**
     * An integer representing the total number of target elements indexed by the
     * mixer. Equivalent to `state.targets.length`.
     *
     * @name        totalTargets
     * @memberof    mixitup.State
     * @instance
     * @type        {number}
     * @default     -1
     */

    this.totalTargets = -1;
    /**
     * An integer representing the total number of target elements matching the
     * current filter and any additional limits applied such as pagination.
     * Equivalent to `state.show.length`.
     *
     * @name        totalShow
     * @memberof    mixitup.State
     * @instance
     * @type        {number}
     * @default     -1
     */

    this.totalShow = -1;
    /**
     * An integer representing the total number of target elements not matching
     * the current filter. Equivalent to `state.hide.length`.
     *
     * @name        totalHide
     * @memberof    mixitup.State
     * @instance
     * @type        {number}
     * @default     -1
     */

    this.totalHide = -1;
    /**
     * An integer representing the total number of target elements matching the
     * current filter irrespective of any other limits applied such as pagination.
     * Equivalent to `state.matching.length`.
     *
     * @name        totalMatching
     * @memberof    mixitup.State
     * @instance
     * @type        {number}
     * @default     -1
     */

    this.totalMatching = -1;
    /**
     * A boolean indicating whether the last operation "failed", i.e. no targets
     * could be found matching the filter.
     *
     * @name        hasFailed
     * @memberof    mixitup.State
     * @instance
     * @type        {boolean}
     * @default     false
     */

    this.hasFailed = false;
    /**
     * The DOM element that was clicked if the last operation was triggered by the
     * clicking of a control and not an API call.
     *
     * @name        triggerElement
     * @memberof    mixitup.State
     * @instance
     * @type        {Element|null}
     * @default     null
     */

    this.triggerElement = null;
    /**
     * The currently active dataset underlying the rendered targets, if the
     * dataset API is in use.
     *
     * @name        activeDataset
     * @memberof    mixitup.State
     * @instance
     * @type        {Array.<object>}
     * @default     null
     */

    this.activeDataset = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.State);

  _mixitup.State.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.State.prototype.constructor = _mixitup.State;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.UserInstruction = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    this.command = {};
    this.animate = false;
    this.callback = null;
    this.callActions('afterConstruct');
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.UserInstruction);

  _mixitup.UserInstruction.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.UserInstruction.prototype.constructor = _mixitup.UserInstruction;
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   */

  _mixitup.Messages = function () {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct');
    /* Errors
    ----------------------------------------------------------------------------- */

    this.ERROR_FACTORY_INVALID_CONTAINER = '[MixItUp] An invalid selector or element reference was passed to the mixitup factory function';
    this.ERROR_FACTORY_CONTAINER_NOT_FOUND = '[MixItUp] The provided selector yielded no container element';
    this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = '[MixItUp] Invalid value for `animation.effects`';
    this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = '[MixItUp] Invalid value for `controls.scope`';
    this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}';
    this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?';
    this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = '[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`';
    this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items';
    this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.';
    this.ERROR_INSERT_INVALID_ARGUMENTS = '[MixItUp] Please provider either an index or a sibling and position to insert, not both';
    this.ERROR_INSERT_PREEXISTING_ELEMENT = '[MixItUp] An element to be inserted already exists in the container';
    this.ERROR_FILTER_INVALID_ARGUMENTS = '[MixItUp] Please provide either a selector or collection `.filter()`, not both';
    this.ERROR_DATASET_NOT_SET = '[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`';
    this.ERROR_DATASET_PRERENDERED_MISMATCH = '[MixItUp] `load.dataset` does not match pre-rendered targets';
    this.ERROR_DATASET_RENDERER_NOT_SET = '[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`';
    /* Warnings
    ----------------------------------------------------------------------------- */

    this.WARNING_FACTORY_PREEXISTING_INSTANCE = '[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored.' + ' If you wish to perform additional methods on this instance, please create a reference.';
    this.WARNING_INSERT_NO_ELEMENTS = '[MixItUp] WARNING: No valid elements were passed to `.insert()`';
    this.WARNING_REMOVE_NO_ELEMENTS = '[MixItUp] WARNING: No valid elements were passed to `.remove()`';
    this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = '[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the ' + 'queue is full or queuing is disabled.';
    this.WARNING_GET_OPERATION_INSTANCE_BUSY = '[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.';
    this.WARNING_NO_PROMISE_IMPLEMENTATION = '[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install' + ' an ES6 Promise polyfill.';
    this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements' + ' which may product unexpected sort output';
    this.callActions('afterConstruct');
    this.compileTemplates();
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Messages);

  _mixitup.Messages.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.Messages.prototype.constructor = _mixitup.Messages;
  /**
   * @return {void}
   */

  _mixitup.Messages.prototype.compileTemplates = function () {
    var errorKey = '';
    var errorMessage = '';

    for (errorKey in this) {
      if (typeof (errorMessage = this[errorKey]) !== 'string') continue;
      this[h.camelCase(errorKey)] = h.template(errorMessage);
    }
  };

  _mixitup.messages = new _mixitup.Messages();
  /**
   * @constructor
   * @memberof    mixitup
   * @private
   * @since       3.0.0
   * @param       {mixitup.Mixer} mixer
   */

  _mixitup.Facade = function Mixer(mixer) {
    _mixitup.Base.call(this);

    this.callActions('beforeConstruct', arguments);
    this.configure = mixer.configure.bind(mixer);
    this.show = mixer.show.bind(mixer);
    this.hide = mixer.hide.bind(mixer);
    this.filter = mixer.filter.bind(mixer);
    this.toggleOn = mixer.toggleOn.bind(mixer);
    this.toggleOff = mixer.toggleOff.bind(mixer);
    this.sort = mixer.sort.bind(mixer);
    this.changeLayout = mixer.changeLayout.bind(mixer);
    this.multimix = mixer.multimix.bind(mixer);
    this.dataset = mixer.dataset.bind(mixer);
    this.tween = mixer.tween.bind(mixer);
    this.insert = mixer.insert.bind(mixer);
    this.insertBefore = mixer.insertBefore.bind(mixer);
    this.insertAfter = mixer.insertAfter.bind(mixer);
    this.prepend = mixer.prepend.bind(mixer);
    this.append = mixer.append.bind(mixer);
    this.remove = mixer.remove.bind(mixer);
    this.destroy = mixer.destroy.bind(mixer);
    this.forceRefresh = mixer.forceRefresh.bind(mixer);
    this.forceRender = mixer.forceRender.bind(mixer);
    this.isMixing = mixer.isMixing.bind(mixer);
    this.getOperation = mixer.getOperation.bind(mixer);
    this.getConfig = mixer.getConfig.bind(mixer);
    this.getState = mixer.getState.bind(mixer);
    this.callActions('afterConstruct', arguments);
    h.freeze(this);
    h.seal(this);
  };

  _mixitup.BaseStatic.call(_mixitup.Facade);

  _mixitup.Facade.prototype = Object.create(_mixitup.Base.prototype);
  _mixitup.Facade.prototype.constructor = _mixitup.Facade;

  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && (typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object') {
    module.exports = _mixitup;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return _mixitup;
    });
  } else if (typeof window.mixitup === 'undefined' || typeof window.mixitup !== 'function') {
    window.mixitup = _mixitup;
  }

  _mixitup.BaseStatic.call(_mixitup.constructor);

  _mixitup.NAME = 'mixitup';
  _mixitup.CORE_VERSION = '3.2.2';
})(window);
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Swiper 4.2.6
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://www.idangero.us/swiper/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: May 1, 2018
 */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Swiper = factory();
})(void 0, function () {
  'use strict';
  /**
   * SSR Window 1.0.0
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: February 10, 2018
   */

  var d;

  if (typeof document === 'undefined') {
    d = {
      body: {},
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      activeElement: {
        blur: function blur() {},
        nodeName: ''
      },
      querySelector: function querySelector() {
        return null;
      },
      querySelectorAll: function querySelectorAll() {
        return [];
      },
      getElementById: function getElementById() {
        return null;
      },
      createEvent: function createEvent() {
        return {
          initEvent: function initEvent() {}
        };
      },
      createElement: function createElement() {
        return {
          children: [],
          childNodes: [],
          style: {},
          setAttribute: function setAttribute() {},
          getElementsByTagName: function getElementsByTagName() {
            return [];
          }
        };
      },
      location: {
        hash: ''
      }
    };
  } else {
    // eslint-disable-next-line
    d = document;
  }

  var doc = d;
  var w;

  if (typeof window === 'undefined') {
    w = {
      document: doc,
      navigator: {
        userAgent: ''
      },
      location: {},
      history: {},
      CustomEvent: function CustomEvent() {
        return this;
      },
      addEventListener: function addEventListener() {},
      removeEventListener: function removeEventListener() {},
      getComputedStyle: function getComputedStyle() {
        return {
          getPropertyValue: function getPropertyValue() {
            return '';
          }
        };
      },
      Image: function Image() {},
      Date: function Date() {},
      screen: {},
      setTimeout: function setTimeout() {},
      clearTimeout: function clearTimeout() {}
    };
  } else {
    // eslint-disable-next-line
    w = window;
  }

  var win = w;
  /**
   * Dom7 2.0.5
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2018, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: April 20, 2018
   */

  var Dom7 = function Dom7(arr) {
    var self = this; // Create array-like object

    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }

    self.length = arr.length; // Return collection with methods

    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;

    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }

    if (selector) {
      // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();

        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';

          if (html.indexOf('<li') === 0) {
            toCreate = 'ul';
          }

          if (html.indexOf('<tr') === 0) {
            toCreate = 'tbody';
          }

          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) {
            toCreate = 'tr';
          }

          if (html.indexOf('<tbody') === 0) {
            toCreate = 'table';
          }

          if (html.indexOf('<option') === 0) {
            toCreate = 'select';
          }

          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;

          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }

          for (i = 0; i < els.length; i += 1) {
            if (els[i]) {
              arr.push(els[i]);
            }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }

    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];

    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) {
        uniqueArray.push(arr[i]);
      }
    }

    return uniqueArray;
  } // Classes and attributes


  function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }

    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') {
          this$1[j].classList.add(classes[i]);
        }
      }
    }

    return this;
  }

  function removeClass(className) {
    var this$1 = this;
    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') {
          this$1[j].classList.remove(classes[i]);
        }
      }
    }

    return this;
  }

  function hasClass(className) {
    if (!this[0]) {
      return false;
    }

    return this[0].classList.contains(className);
  }

  function toggleClass(className) {
    var this$1 = this;
    var classes = className.split(' ');

    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') {
          this$1[j].classList.toggle(classes[i]);
        }
      }
    }

    return this;
  }

  function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) {
        return this[0].getAttribute(attrs);
      }

      return undefined;
    } // Set attrs


    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }

    return this;
  } // eslint-disable-next-line


  function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }

    return this;
  }

  function data(key, value) {
    var this$1 = this;
    var el;

    if (typeof value === 'undefined') {
      el = this[0]; // Get value

      if (el) {
        if (el.dom7ElementDataStorage && key in el.dom7ElementDataStorage) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute("data-" + key);

        if (dataKey) {
          return dataKey;
        }

        return undefined;
      }

      return undefined;
    } // Set value


    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];

      if (!el.dom7ElementDataStorage) {
        el.dom7ElementDataStorage = {};
      }

      el.dom7ElementDataStorage[key] = value;
    }

    return this;
  } // Transforms
  // eslint-disable-next-line


  function transform(transform) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }

    return this;
  }

  function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }

    return this;
  } // Events


  function on() {
    var this$1 = this;
    var assign;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];

    if (typeof args[1] === 'function') {
      assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
      targetSelector = undefined;
    }

    if (!capture) {
      capture = false;
    }

    function handleLiveEvent(e) {
      var target = e.target;

      if (!target) {
        return;
      }

      var eventData = e.target.dom7EventData || [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      if ($(target).is(targetSelector)) {
        listener.apply(target, eventData);
      } else {
        var parents = $(target).parents(); // eslint-disable-line

        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) {
            listener.apply(parents[k], eventData);
          }
        }
      }
    }

    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];

      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }

      listener.apply(this, eventData);
    }

    var events = eventType.split(' ');
    var j;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];

      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];

          if (!el.dom7Listeners) {
            el.dom7Listeners = {};
          }

          if (!el.dom7Listeners[event]) {
            el.dom7Listeners[event] = [];
          }

          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];

          if (!el.dom7LiveListeners) {
            el.dom7LiveListeners = {};
          }

          if (!el.dom7LiveListeners[event$1]) {
            el.dom7LiveListeners[event$1] = [];
          }

          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }

    return this;
  }

  function off() {
    var this$1 = this;
    var assign;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];

    if (typeof args[1] === 'function') {
      assign = args, eventType = assign[0], listener = assign[1], capture = assign[2];
      targetSelector = undefined;
    }

    if (!capture) {
      capture = false;
    }

    var events = eventType.split(' ');

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        var handlers = void 0;

        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }

        for (var k = handlers.length - 1; k >= 0; k -= 1) {
          var handler = handlers[k];

          if (listener && handler.listener === listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          } else if (!listener) {
            el.removeEventListener(event, handler.proxyListener, capture);
            handlers.splice(k, 1);
          }
        }
      }
    }

    return this;
  }

  function trigger() {
    var this$1 = this;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var events = args[0].split(' ');
    var eventData = args[1];

    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];

      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        var evt = void 0;

        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        } // eslint-disable-next-line


        el.dom7EventData = args.filter(function (data, dataIndex) {
          return dataIndex > 0;
        });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }

    return this;
  }

  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;

    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) {
        return;
      }

      callback.call(this, e);

      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }

    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }

    return this;
  }

  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }

      return this[0].offsetWidth;
    }

    return null;
  }

  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }

      return this[0].offsetHeight;
    }

    return null;
  }

  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: box.top + scrollTop - clientTop,
        left: box.left + scrollLeft - clientLeft
      };
    }

    return null;
  }

  function styles() {
    if (this[0]) {
      return win.getComputedStyle(this[0], null);
    }

    return {};
  }

  function css(props, value) {
    var this$1 = this;
    var i;

    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) {
          return win.getComputedStyle(this[0], null).getPropertyValue(props);
        }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }

        return this;
      }
    }

    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }

      return this;
    }

    return this;
  } // Iterate over the collection passing elements to `callback`


  function each(callback) {
    var this$1 = this; // Don't bother continuing without a callback

    if (!callback) {
      return this;
    } // Iterate over the current collection


    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    } // Return `this` to allow chained DOM operations


    return this;
  } // eslint-disable-next-line


  function html(html) {
    var this$1 = this;

    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html;
    }

    return this;
  } // eslint-disable-next-line


  function text(text) {
    var this$1 = this;

    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }

      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text;
    }

    return this;
  }

  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;

    if (!el || typeof selector === 'undefined') {
      return false;
    }

    if (typeof selector === 'string') {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      }

      compareWith = $(selector);

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) {
          return true;
        }
      }

      return false;
    } else if (selector === doc) {
      return el === doc;
    } else if (selector === win) {
      return el === win;
    }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;

      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) {
          return true;
        }
      }

      return false;
    }

    return false;
  }

  function index() {
    var child = this[0];
    var i;

    if (child) {
      i = 0; // eslint-disable-next-line

      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) {
          i += 1;
        }
      }

      return i;
    }

    return undefined;
  } // eslint-disable-next-line


  function eq(index) {
    if (typeof index === 'undefined') {
      return this;
    }

    var length = this.length;
    var returnIndex;

    if (index > length - 1) {
      return new Dom7([]);
    }

    if (index < 0) {
      returnIndex = length + index;

      if (returnIndex < 0) {
        return new Dom7([]);
      }

      return new Dom7([this[returnIndex]]);
    }

    return new Dom7([this[index]]);
  }

  function append() {
    var this$1 = this;
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];

      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;

          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  }

  function prepend(newChild) {
    var this$1 = this;
    var i;
    var j;

    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;

        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }

    return this;
  }

  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }

        return new Dom7([]);
      }

      if (this[0].nextElementSibling) {
        return new Dom7([this[0].nextElementSibling]);
      }

      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];

    if (!el) {
      return new Dom7([]);
    }

    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line

      if (selector) {
        if ($(next).is(selector)) {
          nextEls.push(next);
        }
      } else {
        nextEls.push(next);
      }

      el = next;
    }

    return new Dom7(nextEls);
  }

  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];

      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }

        return new Dom7([]);
      }

      if (el.previousElementSibling) {
        return new Dom7([el.previousElementSibling]);
      }

      return new Dom7([]);
    }

    return new Dom7([]);
  }

  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];

    if (!el) {
      return new Dom7([]);
    }

    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line

      if (selector) {
        if ($(prev).is(selector)) {
          prevEls.push(prev);
        }
      } else {
        prevEls.push(prev);
      }

      el = prev;
    }

    return new Dom7(prevEls);
  }

  function parent(selector) {
    var this$1 = this;
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($(this$1[i].parentNode).is(selector)) {
            parents.push(this$1[i].parentNode);
          }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }

    return $(unique(parents));
  }

  function parents(selector) {
    var this$1 = this;
    var parents = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode; // eslint-disable-line

      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) {
            parents.push(parent);
          }
        } else {
          parents.push(parent);
        }

        parent = parent.parentNode;
      }
    }

    return $(unique(parents));
  }

  function closest(selector) {
    var closest = this; // eslint-disable-line

    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }

    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }

    return closest;
  }

  function find(selector) {
    var this$1 = this;
    var foundElements = [];

    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);

      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }

    return new Dom7(foundElements);
  }

  function children(selector) {
    var this$1 = this;
    var children = []; // eslint-disable-line

    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) {
            children.push(childNodes[j]);
          }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }

    return new Dom7(unique(children));
  }

  function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) {
        this$1[i].parentNode.removeChild(this$1[i]);
      }
    }

    return this;
  }

  function add() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var dom = this;
    var i;
    var j;

    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);

      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }

    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    remove: remove,
    add: add,
    styles: styles
  };
  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = Methods[methodName];
  });
  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {// no getter for object
        }

        try {
          delete object[key];
        } catch (e) {// something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if (delay === void 0) delay = 0;
      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if (axis === void 0) axis = 'x';
      var matrix;
      var curTransform;
      var transformMatrix;
      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;

        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) {
            return a.replace(',', '.');
          }).join(', ');
        } // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case


        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) {
          curTransform = transformMatrix.m41;
        } // Crazy IE10 Matrix
        else if (matrix.length === 16) {
            curTransform = parseFloat(matrix[12]);
          } // Normal Browsers
          else {
              curTransform = parseFloat(matrix[4]);
            }
      }

      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) {
          curTransform = transformMatrix.m42;
        } // Crazy IE10 Matrix
        else if (matrix.length === 16) {
            curTransform = parseFloat(matrix[13]);
          } // Normal Browsers
          else {
              curTransform = parseFloat(matrix[5]);
            }
      }

      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;

      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) {
          return paramsPart !== '';
        });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }

      return query;
    },
    isObject: function isObject(o) {
      return _typeof(o) === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [],
          len$1 = arguments.length;

      while (len$1--) {
        args[len$1] = arguments[len$1];
      }

      var to = Object(args[0]);

      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];

        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));

          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }

      return to;
    }
  };

  var Support = function Support() {
    var testDiv = doc.createElement('div');
    return {
      touch: win.Modernizr && win.Modernizr.touch === true || function checkTouch() {
        return !!('ontouchstart' in win || win.DocumentTouch && doc instanceof win.DocumentTouch);
      }(),
      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,
      transition: function checkTransition() {
        var style = testDiv.style;
        return 'transition' in style || 'webkitTransition' in style || 'MozTransition' in style;
      }(),
      transforms3d: win.Modernizr && win.Modernizr.csstransforms3d === true || function checkTransforms3d() {
        var style = testDiv.style;
        return 'webkitPerspective' in style || 'MozPerspective' in style || 'OPerspective' in style || 'MsPerspective' in style || 'perspective' in style;
      }(),
      flexbox: function checkFlexbox() {
        var style = testDiv.style;
        var styles = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' ');

        for (var i = 0; i < styles.length; i += 1) {
          if (styles[i] in style) {
            return true;
          }
        }

        return false;
      }(),
      observer: function checkObserver() {
        return 'MutationObserver' in win || 'WebkitMutationObserver' in win;
      }(),
      passiveListener: function checkPassiveListener() {
        var supportsPassive = false;

        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            }
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {// No support
        }

        return supportsPassive;
      }(),
      gestures: function checkGestures() {
        return 'ongesturestart' in win;
      }()
    };
  }();

  var SwiperClass = function SwiperClass(params) {
    if (params === void 0) params = {};
    var self = this;
    self.params = params; // Events

    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = {
    components: {
      configurable: true
    }
  };

  SwiperClass.prototype.on = function on(events, handler, priority) {
    var self = this;

    if (typeof handler !== 'function') {
      return self;
    }

    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) {
        self.eventsListeners[event] = [];
      }

      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once(events, handler, priority) {
    var self = this;

    if (typeof handler !== 'function') {
      return self;
    }

    function onceHandler() {
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      handler.apply(self, args);
      self.off(events, onceHandler);
    }

    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off(events, handler) {
    var self = this;

    if (!self.eventsListeners) {
      return self;
    }

    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit() {
    var args = [],
        len = arguments.length;

    while (len--) {
      args[len] = arguments[len];
    }

    var self = this;

    if (!self.eventsListeners) {
      return self;
    }

    var events;
    var data;
    var context;

    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }

    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams(instanceParams) {
    var instance = this;

    if (!instance.modules) {
      return;
    }

    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName]; // Extend params

      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules(modulesParams) {
    if (modulesParams === void 0) modulesParams = {};
    var instance = this;

    if (!instance.modules) {
      return;
    }

    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {}; // Extend instance methods and props

      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];

          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      } // Add event listeners


      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      } // Module create callback


      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;

    if (!Class.use) {
      return;
    }

    Class.use(components);
  };

  SwiperClass.installModule = function installModule(module) {
    var params = [],
        len = arguments.length - 1;

    while (len-- > 0) {
      params[len] = arguments[len + 1];
    }

    var Class = this;

    if (!Class.prototype.modules) {
      Class.prototype.modules = {};
    }

    var name = module.name || Object.keys(Class.prototype.modules).length + "_" + Utils.now();
    Class.prototype.modules[name] = module; // Prototype

    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    } // Class


    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    } // Callback


    if (module.install) {
      module.install.apply(Class, params);
    }

    return Class;
  };

  SwiperClass.use = function use(module) {
    var params = [],
        len = arguments.length - 1;

    while (len-- > 0) {
      params[len] = arguments[len + 1];
    }

    var Class = this;

    if (Array.isArray(module)) {
      module.forEach(function (m) {
        return Class.installModule(m);
      });
      return Class;
    }

    return Class.installModule.apply(Class, [module].concat(params));
  };

  Object.defineProperties(SwiperClass, staticAccessors);

  function updateSize() {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;

    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }

    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }

    if (width === 0 && swiper.isHorizontal() || height === 0 && swiper.isVertical()) {
      return;
    } // Subtract paddings


    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);
    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height
    });
  }

  function updateSlides() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var slides = $wrapperEl.children("." + swiper.params.slideClass);
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];
    var offsetBefore = params.slidesOffsetBefore;

    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;

    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSlidesLength = slidesLength;
    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;
    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;

    if (typeof swiperSize === 'undefined') {
      return;
    }

    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * swiperSize;
    }

    swiper.virtualSize = -spaceBetween; // reset margins

    if (rtl) {
      slides.css({
        marginLeft: '',
        marginTop: ''
      });
    } else {
      slides.css({
        marginRight: '',
        marginBottom: ''
      });
    }

    var slidesNumberEvenToRows;

    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }

      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    } // Calc slides


    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = slidesPerRow - (params.slidesPerColumn * slidesPerRow - slidesLength);

    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);

      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = void 0;
        var column = void 0;
        var row = void 0;

        if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - column * slidesPerColumn;

          if (column > numFullColumns || column === numFullColumns && row === slidesPerColumn - 1) {
            row += 1;

            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }

          newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
          slide.css({
            '-webkit-box-ordinal-group': newSlideOrderIndex,
            '-moz-box-ordinal-group': newSlideOrderIndex,
            '-ms-flex-order': newSlideOrderIndex,
            '-webkit-order': newSlideOrderIndex,
            order: newSlideOrderIndex
          });
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - row * slidesPerRow;
        }

        slide.css("margin-" + (swiper.isHorizontal() ? 'top' : 'left'), row !== 0 && params.spaceBetween && params.spaceBetween + "px").attr('data-swiper-column', column).attr('data-swiper-row', row);
      }

      if (slide.css('display') === 'none') {
        continue;
      } // eslint-disable-line


      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;

        if (currentTransform) {
          slide[0].style.transform = 'none';
        }

        if (swiper.isHorizontal()) {
          slideSize = slide[0].getBoundingClientRect().width + parseFloat(slideStyles.getPropertyValue('margin-left')) + parseFloat(slideStyles.getPropertyValue('margin-right'));
        } else {
          slideSize = slide[0].getBoundingClientRect().height + parseFloat(slideStyles.getPropertyValue('margin-top')) + parseFloat(slideStyles.getPropertyValue('margin-bottom'));
        }

        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }

        if (params.roundLengths) {
          slideSize = Math.floor(slideSize);
        }
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;

        if (params.roundLengths) {
          slideSize = Math.floor(slideSize);
        }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }

      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }

      slidesSizesGrid.push(slideSize);

      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;

        if (prevSlideSize === 0 && i !== 0) {
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        }

        if (i === 0) {
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        }

        if (Math.abs(slidePosition) < 1 / 1000) {
          slidePosition = 0;
        }

        if (index % params.slidesPerGroup === 0) {
          snapGrid.push(slidePosition);
        }

        slidesGrid.push(slidePosition);
      } else {
        if (index % params.slidesPerGroup === 0) {
          snapGrid.push(slidePosition);
        }

        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }

    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({
        width: swiper.virtualSize + params.spaceBetween + "px"
      });
    }

    if (!Support.flexbox || params.setWrapperSize) {
      if (swiper.isHorizontal()) {
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px"
        });
      } else {
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px"
        });
      }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;

      if (swiper.isHorizontal()) {
        $wrapperEl.css({
          width: swiper.virtualSize + params.spaceBetween + "px"
        });
      } else {
        $wrapperEl.css({
          height: swiper.virtualSize + params.spaceBetween + "px"
        });
      }

      if (params.centeredSlides) {
        newSlidesGrid = [];

        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) {
            newSlidesGrid.push(snapGrid[i$1]);
          }
        }

        snapGrid = newSlidesGrid;
      }
    } // Remove last grid elements depending on width


    if (!params.centeredSlides) {
      newSlidesGrid = [];

      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(snapGrid[i$2]);
        }
      }

      snapGrid = newSlidesGrid;

      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }

    if (snapGrid.length === 0) {
      snapGrid = [0];
    }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) {
          slides.css({
            marginLeft: spaceBetween + "px"
          });
        } else {
          slides.css({
            marginRight: spaceBetween + "px"
          });
        }
      } else {
        slides.css({
          marginBottom: spaceBetween + "px"
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }

    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      swiper.emit('snapGridLengthChange');
    }

    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight(speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;

    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    } // Find slides currently in view


    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;

        if (index > swiper.slides.length) {
          break;
        }

        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    } // Find new height from highest slide in view


    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    } // Update Height


    if (newHeight) {
      swiper.$wrapperEl.css('height', newHeight + "px");
    }
  }

  function updateSlidesOffset() {
    var swiper = this;
    var slides = swiper.slides;

    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress(translate) {
    if (translate === void 0) translate = this && this.translate || 0;
    var swiper = this;
    var params = swiper.params;
    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) {
      return;
    }

    if (typeof slides[0].swiperSlideOffset === 'undefined') {
      swiper.updateSlidesOffset();
    }

    var offsetCenter = -translate;

    if (rtl) {
      offsetCenter = translate;
    } // Visible Slides


    slides.removeClass(params.slideVisibleClass);

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + params.spaceBetween);

      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = slideBefore >= 0 && slideBefore < swiper.size || slideAfter > 0 && slideAfter <= swiper.size || slideBefore <= 0 && slideAfter >= swiper.size;

        if (isVisible) {
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }

      slide.progress = rtl ? -slideProgress : slideProgress;
    }
  }

  function updateProgress(translate) {
    if (translate === void 0) translate = this && this.translate || 0;
    var swiper = this;
    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;

    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / translatesDiff;
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }

    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesProgress(translate);
    }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }

    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }

    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses() {
    var swiper = this;
    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    slides.removeClass(params.slideActiveClass + " " + params.slideNextClass + " " + params.slidePrevClass + " " + params.slideDuplicateActiveClass + " " + params.slideDuplicateNextClass + " " + params.slideDuplicatePrevClass);
    var activeSlide;

    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find("." + params.slideClass + "[data-swiper-slide-index=\"" + activeIndex + "\"]");
    } else {
      activeSlide = slides.eq(activeIndex);
    } // Active classes


    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + realIndex + "\"]").addClass(params.slideDuplicateActiveClass);
      }
    } // Next Slide


    var nextSlide = activeSlide.nextAll("." + params.slideClass).eq(0).addClass(params.slideNextClass);

    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    } // Prev Slide


    var prevSlide = activeSlide.prevAll("." + params.slideClass).eq(0).addClass(params.slidePrevClass);

    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }

    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + nextSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicateNextClass);
      }

      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl.children("." + params.slideClass + ":not(." + params.slideDuplicateClass + ")[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass + "[data-swiper-slide-index=\"" + prevSlide.attr('data-swiper-slide-index') + "\"]").addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex(newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;

    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      } // Normalize slideIndex


      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') {
          activeIndex = 0;
        }
      }
    }

    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }

    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1;
    }

    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }

      return;
    } // Get real index


    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');

    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }

    swiper.emit('slideChange');
  }

  function updateClickedSlide(e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest("." + params.slideClass)[0];
    var slideFound = false;

    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) {
          slideFound = true;
        }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;

      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }

    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide
  };

  function getTranslate(axis) {
    if (axis === void 0) axis = this.isHorizontal() ? 'x' : 'y';
    var swiper = this;
    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);

    if (rtl) {
      currentTranslate = -currentTranslate;
    }

    return currentTranslate || 0;
  }

  function setTranslate(translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (!params.virtualTranslate) {
      if (Support.transforms3d) {
        $wrapperEl.transform("translate3d(" + x + "px, " + y + "px, " + z + "px)");
      } else {
        $wrapperEl.transform("translate(" + x + "px, " + y + "px)");
      }
    }

    swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / translatesDiff;
    }

    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate() {
    return -this.snapGrid[0];
  }

  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate
  };

  function setTransition(duration, byController) {
    var swiper = this;
    swiper.$wrapperEl.transition(duration);
    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;

    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) {
        dir = 'next';
      } else if (activeIndex < previousIndex) {
        dir = 'prev';
      } else {
        dir = 'reset';
      }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }

      swiper.emit('slideChangeTransitionStart');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1(runCallbacks, direction) {
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    swiper.animating = false;
    swiper.setTransition(0);
    var dir = direction;

    if (!dir) {
      if (activeIndex > previousIndex) {
        dir = 'next';
      } else if (activeIndex < previousIndex) {
        dir = 'prev';
      } else {
        dir = 'reset';
      }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }

      swiper.emit('slideChangeTransitionEnd');

      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1
  };

  function slideTo(index, speed, runCallbacks, internal) {
    if (index === void 0) index = 0;
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var slideIndex = index;

    if (slideIndex < 0) {
      slideIndex = 0;
    }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;

    if (swiper.animating && params.preventIntercationOnTransition) {
      return false;
    }

    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);

    if (snapIndex >= snapGrid.length) {
      snapIndex = snapGrid.length - 1;
    }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex]; // Update progress

    swiper.updateProgress(translate); // Normalize slideIndex

    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    } // Directions locks


    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }

      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }

    var direction;

    if (slideIndex > activeIndex) {
      direction = 'next';
    } else if (slideIndex < activeIndex) {
      direction = 'prev';
    } else {
      direction = 'reset';
    } // Update Index


    if (rtl && -translate === swiper.translate || !rtl && translate === swiper.translate) {
      swiper.updateActiveIndex(slideIndex); // Update Height

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }

      swiper.updateSlidesClasses();

      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }

      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }

      return false;
    }

    if (speed === 0 || !Support.transition) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);

      if (!swiper.animating) {
        swiper.animating = true;

        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) {
              return;
            }

            if (e.target !== this) {
              return;
            }

            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.transitionEnd(runCallbacks, direction);
          };
        }

        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) index = 0;
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var newIndex = index;

    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;

    if (params.loop) {
      if (animating) {
        return false;
      }

      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }

    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) {
        return false;
      }

      swiper.loopFix(); // eslint-disable-next-line

      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }

    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    var currentSnap = snapGrid[snapGrid.indexOf(translate)];
    var prevSnap = snapGrid[snapGrid.indexOf(translate) - 1];
    var prevIndex;

    if (prevSnap) {
      prevIndex = slidesGrid.indexOf(prevSnap);

      if (prevIndex < 0) {
        prevIndex = swiper.activeIndex - 1;
      }
    }

    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }
  /* eslint no-unused-vars: "off" */


  function slideToClosest(speed, runCallbacks, internal) {
    if (speed === void 0) speed = this.params.speed;
    if (runCallbacks === void 0) runCallbacks = true;
    var swiper = this;
    var index = swiper.activeIndex;
    var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if (translate - currentSnap > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;

    if (params.loop) {
      if (swiper.animating) {
        return;
      }

      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

      if (params.centeredSlides) {
        if (slideToIndex < swiper.loopedSlides - slidesPerView / 2 || slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2) {
          swiper.loopFix();
          slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl.children("." + params.slideClass + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + params.slideDuplicateClass + ")").eq(0).index();
        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide
  };

  function loopCreate() {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl; // Remove duplicated slides

    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();
    var slides = $wrapperEl.children("." + params.slideClass);

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - slides.length % params.slidesPerGroup;

      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(params.slideClass + " " + params.slideBlankClass);
          $wrapperEl.append(blankNode);
        }

        slides = $wrapperEl.children("." + params.slideClass);
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) {
      params.loopedSlides = slides.length;
    }

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;

    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);

      if (index < swiper.loopedSlides) {
        appendSlides.push(el);
      }

      if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
        prependSlides.push(el);
      }

      slide.attr('data-swiper-slide-index', index);
    });

    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }

    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix() {
    var swiper = this;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;
    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

    if (activeIndex < loopedSlides) {
      newIndex = slides.length - loopedSlides * 3 + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if (params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2 || activeIndex > slides.length - params.slidesPerView * 2) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);

      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }

    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy() {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children("." + params.slideClass + "." + params.slideDuplicateClass).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy
  };

  function setGrabCursor(moving) {
    var swiper = this;

    if (Support.touch || !swiper.params.simulateTouch || swiper.params.watchOverflow && swiper.isLocked) {
      return;
    }

    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor() {
    var swiper = this;

    if (Support.touch || swiper.params.watchOverflow && swiper.isLocked) {
      return;
    }

    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor
  };

  function appendSlide(slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;

    if (params.loop) {
      swiper.loopDestroy();
    }

    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) {
          $wrapperEl.append(slides[i]);
        }
      }
    } else {
      $wrapperEl.append(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide(slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }

    var newActiveIndex = activeIndex + 1;

    if (_typeof(slides) === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) {
          $wrapperEl.prepend(slides[i]);
        }
      }

      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    swiper.slideTo(newActiveIndex, 0, false);
  }

  function removeSlide(slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children("." + params.slideClass);
    }

    var newActiveIndex = activeIndex;
    var indexToRemove;

    if (_typeof(slidesIndexes) === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];

        if (swiper.slides[indexToRemove]) {
          swiper.slides.eq(indexToRemove).remove();
        }

        if (indexToRemove < newActiveIndex) {
          newActiveIndex -= 1;
        }
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;

      if (swiper.slides[indexToRemove]) {
        swiper.slides.eq(indexToRemove).remove();
      }

      if (indexToRemove < newActiveIndex) {
        newActiveIndex -= 1;
      }

      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }

    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides() {
    var swiper = this;
    var slidesIndexes = [];

    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }

    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides
  };

  var Device = function Device() {
    var ua = win.navigator.userAgent;
    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap
    };
    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/); // Windows

    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    } // Android


    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }

    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    } // iOS


    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }

    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }

    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    } // iOS 8+ changed UA


    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    } // Desktop


    device.desktop = !(device.os || device.android || device.webView); // Webview

    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i); // Minimal UI

    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    } // Pixel Ratio


    device.pixelRatio = win.devicePixelRatio || 1; // Export object

    return device;
  }();

  function onTouchStart(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;

    if (swiper.animating && params.preventIntercationOnTransition) {
      return;
    }

    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    data.isTouchEvent = e.type === 'touchstart';

    if (!data.isTouchEvent && 'which' in e && e.which === 3) {
      return;
    }

    if (data.isTouched && data.isMoved) {
      return;
    }

    if (params.noSwiping && $(e.target).closest(params.noSwipingSelector ? params.noSwipingSelector : "." + params.noSwipingClass)[0]) {
      swiper.allowClick = true;
      return;
    }

    if (params.swipeHandler) {
      if (!$(e).closest(params.swipeHandler)[0]) {
        return;
      }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    if (Device.ios && !Device.cordova && params.iOSEdgeSwipeDetection && startX <= params.iOSEdgeSwipeThreshold && startX >= win.screen.width - params.iOSEdgeSwipeThreshold) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;

    if (params.threshold > 0) {
      data.allowThresholdMove = false;
    }

    if (e.type !== 'touchstart') {
      var preventDefault = true;

      if ($(e.target).is(data.formElements)) {
        preventDefault = false;
      }

      if (doc.activeElement && $(doc.activeElement).is(data.formElements) && doc.activeElement !== e.target) {
        doc.activeElement.blur();
      }

      if (preventDefault && swiper.allowTouchMove) {
        e.preventDefault();
      }
    }

    swiper.emit('touchStart', e);
  }

  function onTouchMove(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }

      return;
    }

    if (data.isTouchEvent && e.type === 'mousemove') {
      return;
    }

    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }

    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;

      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = Utils.now();
      }

      return;
    }

    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (pageY < touches.startY && swiper.translate <= swiper.maxTranslate() || pageY > touches.startY && swiper.translate >= swiper.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper.translate <= swiper.maxTranslate() || pageX > touches.startX && swiper.translate >= swiper.minTranslate()) {
        return;
      }
    }

    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }

    if (e.targetTouches && e.targetTouches.length > 1) {
      return;
    }

    touches.currentX = pageX;
    touches.currentY = pageY;
    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;

      if (swiper.isHorizontal() && touches.currentY === touches.startY || swiper.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }

    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }

    if (typeof startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }

    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }

    if (!data.startMoving) {
      return;
    }

    swiper.allowClick = false;
    e.preventDefault();

    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }

      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);

      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }

      data.allowMomentumBounce = false; // Grab Cursor

      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }

      swiper.emit('sliderFirstMove', e);
    }

    swiper.emit('sliderMove', e);
    data.isMoved = true;
    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;
    diff *= params.touchRatio;

    if (rtl) {
      diff = -diff;
    }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;
    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;

    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }

    if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
      disableParentSwiper = false;

      if (params.resistance) {
        data.currentTranslate = swiper.minTranslate() - 1 + Math.pow(-swiper.minTranslate() + data.startTranslate + diff, resistanceRatio);
      }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;

      if (params.resistance) {
        data.currentTranslate = swiper.maxTranslate() + 1 - Math.pow(swiper.maxTranslate() - data.startTranslate - diff, resistanceRatio);
      }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    } // Directions locks


    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }

    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    } // Threshold


    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger) {
      return;
    } // Update active index in free mode


    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }

    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime
        });
      }

      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now()
      });
    } // Update progress


    swiper.updateProgress(data.currentTranslate); // Update translate

    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd(event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;

    if (e.originalEvent) {
      e = e.originalEvent;
    }

    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }

    data.allowTouchCallbacks = false;

    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }

      data.isMoved = false;
      data.startMoving = false;
      return;
    } // Return Grab Cursor


    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    } // Time diff


    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap', e);

      if (timeDiff < 300 && touchEndTime - data.lastClickTime > 300) {
        if (data.clickTimeout) {
          clearTimeout(data.clickTimeout);
        }

        data.clickTimeout = Utils.nextTick(function () {
          if (!swiper || swiper.destroyed) {
            return;
          }

          swiper.emit('click', e);
        }, 300);
      }

      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        if (data.clickTimeout) {
          clearTimeout(data.clickTimeout);
        }

        swiper.emit('doubleTap', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) {
        swiper.allowClick = true;
      }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }

    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    var currentPos;

    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      } else if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }

        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();
          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;

          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          } // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.


          if (time > 150 || Utils.now() - lastMoveEvent.time > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }

        swiper.velocity *= params.freeModeMomentumVelocityRatio;
        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;
        var newPosition = swiper.translate + momentumDistance;

        if (rtl) {
          newPosition = -newPosition;
        }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;

        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }

            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }

          if (params.loop && params.centeredSlides) {
            needsLoopFix = true;
          }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }

            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }

          if (params.loop && params.centeredSlides) {
            needsLoopFix = true;
          }
        } else if (params.freeModeSticky) {
          var nextSlide;

          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }

          newPosition = -newPosition;
        }

        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        } // Fix duration


        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) {
              return;
            }

            swiper.emit('momentumBounce');
            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) {
                return;
              }

              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);

          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) {
                return;
              }

              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      return;
    } // Find current slide


    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];

    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    } // Find current slide size


    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) {
          swiper.slideTo(stopIndex + params.slidesPerGroup);
        } else {
          swiper.slideTo(stopIndex);
        }
      }

      if (swiper.swipeDirection === 'prev') {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper.slideTo(stopIndex + params.slidesPerGroup);
        } else {
          swiper.slideTo(stopIndex);
        }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }

      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }

      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize() {
    var swiper = this;
    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) {
      return;
    } // Breakpoints


    if (params.breakpoints) {
      swiper.setBreakpoint();
    } // Save locks


    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid; // Disable locks on resize

    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;
    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();

      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    } // Return locks after resize


    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick(e) {
    var swiper = this;

    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) {
        e.preventDefault();
      }

      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;
    {
      swiper.onTouchStart = onTouchStart.bind(swiper);
      swiper.onTouchMove = onTouchMove.bind(swiper);
      swiper.onTouchEnd = onTouchEnd.bind(swiper);
    }
    swiper.onClick = onClick.bind(swiper);
    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested; // Touch Events

    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          target.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? {
            passive: false,
            capture: capture
          } : capture);
          target.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.addEventListener('mousedown', swiper.onTouchStart, false);
          doc.addEventListener('mousemove', swiper.onTouchMove, capture);
          doc.addEventListener('mouseup', swiper.onTouchEnd, false);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        target.addEventListener('click', swiper.onClick, true);
      }
    } // Resize handler

    swiper.on('resize observerUpdate', onResize, true);
  }

  function detachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;
    var target = params.touchEventsTarget === 'container' ? el : wrapperEl;
    var capture = !!params.nested; // Touch Events

    {
      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
        doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
      } else {
        if (Support.touch) {
          var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? {
            passive: true,
            capture: false
          } : false;
          target.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
          target.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
          target.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.removeEventListener('mousedown', swiper.onTouchStart, false);
          doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
          doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
        }
      } // Prevent Links Clicks


      if (params.preventClicks || params.preventClicksPropagation) {
        target.removeEventListener('click', swiper.onClick, true);
      }
    } // Resize handler

    swiper.off('resize observerUpdate', onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents
  };

  function setBreakpoint() {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides;
    if (loopedSlides === void 0) loopedSlides = 0;
    var params = swiper.params;
    var breakpoints = params.breakpoints;

    if (!breakpoints || breakpoints && Object.keys(breakpoints).length === 0) {
      return;
    } // Set breakpoint for window width and update parameters


    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakPointsParams = breakpoint in breakpoints ? breakpoints[breakpoint] : swiper.originalParams;
      var needsReLoop = params.loop && breakPointsParams.slidesPerView !== params.slidesPerView;
      Utils.extend(swiper.params, breakPointsParams);
      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev
      });
      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakPointsParams);
    }
  }

  function getBreakpoint(breakpoints) {
    // Get breakpoint for window width
    if (!breakpoints) {
      return undefined;
    }

    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) {
      return parseInt(a, 10) - parseInt(b, 10);
    });

    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];

      if (point >= win.innerWidth && !breakpoint) {
        breakpoint = point;
      }
    }

    return breakpoint || 'max';
  }

  var breakpoints = {
    setBreakpoint: setBreakpoint,
    getBreakpoint: getBreakpoint
  };

  var Browser = function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
    }

    return {
      isIE: !!win.navigator.userAgent.match(/Trident/g) || !!win.navigator.userAgent.match(/MSIE/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent)
    };
  }();

  function addClasses() {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }

    if (!Support.flexbox) {
      suffixes.push('no-flexbox');
    }

    if (params.autoHeight) {
      suffixes.push('autoheight');
    }

    if (rtl) {
      suffixes.push('rtl');
    }

    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
    }

    if (Device.android) {
      suffixes.push('android');
    }

    if (Device.ios) {
      suffixes.push('ios');
    } // WP8 Touch Events Fix


    if (Browser.isIE && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      suffixes.push("wp8-" + params.direction);
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });
    $el.addClass(classNames.join(' '));
  }

  function removeClasses() {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;
    $el.removeClass(classNames.join(' '));
  }

  var classes = {
    addClasses: addClasses,
    removeClasses: removeClasses
  };

  function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;

    function onReady() {
      if (callback) {
        callback();
      }
    }

    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
        image.onload = onReady;
        image.onerror = onReady;

        if (sizes) {
          image.sizes = sizes;
        }

        if (srcset) {
          image.srcset = srcset;
        }

        if (src) {
          image.src = src;
        }
      } else {
        onReady();
      }
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages() {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');

    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) {
        return;
      }

      if (swiper.imagesLoaded !== undefined) {
        swiper.imagesLoaded += 1;
      }

      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) {
          swiper.update();
        }

        swiper.emit('imagesReady');
      }
    }

    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(imageEl, imageEl.currentSrc || imageEl.getAttribute('src'), imageEl.srcset || imageEl.getAttribute('srcset'), imageEl.sizes || imageEl.getAttribute('sizes'), true, onReady);
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked;
    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked; // events

    if (wasLocked !== swiper.isLocked) {
      swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
    }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = {
    checkOverflow: checkOverflow
  };
  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    //
    preventIntercationOnTransition: false,
    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    iOSEdgeSwipeDetection: false,
    iOSEdgeSwipeThreshold: 20,
    // Free mode
    freeMode: false,
    freeModeMomentum: true,
    freeModeMomentumRatio: 1,
    freeModeMomentumBounce: true,
    freeModeMomentumBounceRatio: 1,
    freeModeMomentumVelocityRatio: 1,
    freeModeSticky: false,
    freeModeMinimumVelocity: 0.02,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: 'slide',
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: undefined,
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerColumn: 1,
    slidesPerColumnFill: 'column',
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: true,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // Images
    preloadImages: true,
    updateOnImagesReady: true,
    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    // NS
    containerModifierClass: 'swiper-container-',
    // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',
    // Callbacks
    runCallbacksOnInit: true
  };
  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images
  };
  var extendedDefaults = {};

  var Swiper = function (SwiperClass$$1) {
    function Swiper() {
      var assign;
      var args = [],
          len = arguments.length;

      while (len--) {
        args[len] = arguments[len];
      }

      var el;
      var params;

      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        assign = args, el = assign[0], params = assign[1];
      }

      if (!params) {
        params = {};
      }

      params = Utils.extend({}, params);

      if (el && !params.el) {
        params.el = el;
      }

      SwiperClass$$1.call(this, params);
      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      }); // Swiper Instance

      var swiper = this;

      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }

      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];

        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];

          if (_typeof(moduleParams) !== 'object') {
            return;
          }

          if (!(moduleParamName in params && 'enabled' in moduleParams)) {
            return;
          }

          if (params[moduleParamName] === true) {
            params[moduleParamName] = {
              enabled: true
            };
          }

          if (_typeof(params[moduleParamName]) === 'object' && !('enabled' in params[moduleParamName])) {
            params[moduleParamName].enabled = true;
          }

          if (!params[moduleParamName]) {
            params[moduleParamName] = {
              enabled: false
            };
          }
        }
      }); // Extend defaults with modules params

      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams); // Extend defaults with passed params

      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params); // Save Dom lib

      swiper.$ = $; // Find el

      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper); // Find Wrapper

      var $wrapperEl = $el.children("." + swiper.params.wrapperClass); // Extend Swiper

      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],
        // Classes
        classNames: [],
        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
        // Touch Events
        touchEvents: function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];

          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }

          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2]
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2]
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }(),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      }); // Install Modules

      swiper.useModules(); // Init

      if (swiper.params.init) {
        swiper.init();
      } // Return app instance


      return swiper;
    }

    if (SwiperClass$$1) Swiper.__proto__ = SwiperClass$$1;
    Swiper.prototype = Object.create(SwiperClass$$1 && SwiperClass$$1.prototype);
    Swiper.prototype.constructor = Swiper;
    var staticAccessors = {
      extendedDefaults: {
        configurable: true
      },
      defaults: {
        configurable: true
      },
      Class: {
        configurable: true
      },
      $: {
        configurable: true
      }
    };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic() {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;

      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;

        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;

            if (slideSize > swiperSize) {
              breakLoop = true;
            }
          }
        }

        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;

            if (slideSize > swiperSize) {
              breakLoop = true;
            }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }

      return spv;
    };

    Swiper.prototype.update = function update$$1() {
      var swiper = this;

      if (!swiper || swiper.destroyed) {
        return;
      }

      var snapGrid = swiper.snapGrid;
      var params = swiper.params; // Breakpoints

      if (params.breakpoints) {
        swiper.setBreakpoint();
      }

      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }

      var translated;

      if (swiper.params.freeMode) {
        setTranslate();

        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }

        if (!translated) {
          setTranslate();
        }
      }

      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }

      swiper.emit('update');
    };

    Swiper.prototype.init = function init() {
      var swiper = this;

      if (swiper.initialized) {
        return;
      }

      swiper.emit('beforeInit'); // Set breakpoint

      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      } // Add Classes


      swiper.addClasses(); // Create loop

      if (swiper.params.loop) {
        swiper.loopCreate();
      } // Update size


      swiper.updateSize(); // Update slides

      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      } // Set Grab Cursor


      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      } // Slide To Initial Slide


      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      } // Attach events


      swiper.attachEvents(); // Init Flag

      swiper.initialized = true; // Emit

      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) deleteInstance = true;
      if (cleanStyles === void 0) cleanStyles = true;
      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy'); // Init Flag

      swiper.initialized = false; // Detach events

      swiper.detachEvents(); // Destroy loop

      if (params.loop) {
        swiper.loopDestroy();
      } // Cleanup styles


      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');

        if (slides && slides.length) {
          slides.removeClass([params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-slide-index').removeAttr('data-swiper-column').removeAttr('data-swiper-row');
        }
      }

      swiper.emit('destroy'); // Detach emitter events

      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }

      swiper.destroyed = true;
      return null;
    };

    Swiper.extendDefaults = function extendDefaults(newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass$$1;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties(Swiper, staticAccessors);
    return Swiper;
  }(SwiperClass);

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device
    },
    static: {
      device: Device
    }
  };
  var Support$1 = {
    name: 'support',
    proto: {
      support: Support
    },
    static: {
      support: Support
    }
  };
  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser
    },
    static: {
      browser: Browser
    }
  };
  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) {
              return;
            }

            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) {
              return;
            }

            swiper.emit('orientationchange');
          }
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this; // Emit resize

        win.addEventListener('resize', swiper.resize.resizeHandler); // Emit orientationchange

        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      }
    }
  };
  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if (options === void 0) options = {};
      var swiper = this;
      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        mutations.forEach(function (mutation) {
          swiper.emit('observerUpdate', mutation);
        });
      });
      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData
      });
      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;

      if (!Support.observer || !swiper.params.observer) {
        return;
      }

      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();

        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      } // Observe container


      swiper.observer.attach(swiper.$el[0], {
        childList: false
      }); // Observe wrapper

      swiper.observer.attach(swiper.$wrapperEl[0], {
        attributes: false
      });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    }
  };
  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: []
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      }
    }
  };
  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.virtual;
      var previousFrom = ref$1.from;
      var previousTo = ref$1.to;
      var slides = ref$1.slides;
      var previousSlidesGrid = ref$1.slidesGrid;
      var renderSlide = ref$1.renderSlide;
      var previousOffset = ref$1.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;
      var offsetProp;

      if (swiper.rtlTranslate) {
        offsetProp = 'right';
      } else {
        offsetProp = swiper.isHorizontal() ? 'left' : 'top';
      }

      var slidesAfter;
      var slidesBefore;

      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1);
        slidesBefore = slidesPerGroup;
      }

      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();

        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, offset + "px");
        }

        swiper.updateProgress();
        return;
      }

      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: function getSlides() {
            var slidesToRender = [];

            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }

            return slidesToRender;
          }()
        });
        onRendered();
        return;
      }

      var prependIndexes = [];
      var appendIndexes = [];

      if (force) {
        swiper.$wrapperEl.find("." + swiper.params.slideClass).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + i + "\"]").remove();
          }
        }
      }

      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) {
              appendIndexes.push(i$1);
            }

            if (i$1 < previousFrom) {
              prependIndexes.push(i$1);
            }
          }
        }
      }

      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) {
        return a < b;
      }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, offset + "px");
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;

      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }

      var $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $("<div class=\"" + swiper.params.slideClass + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>");

      if (!$slideEl.attr('data-swiper-slide-index')) {
        $slideEl.attr('data-swiper-slide-index', index);
      }

      if (params.cache) {
        swiper.virtual.cache[index] = $slideEl;
      }

      return $slideEl;
    },
    appendSlide: function appendSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.push(slide);
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slide) {
      var swiper = this;
      swiper.virtual.slides.unshift(slide);

      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          newCache[cachedIndex + 1] = cache[cachedIndex];
        });
        swiper.virtual.cache = newCache;
      }

      swiper.virtual.update(true);
      swiper.slideNext(0);
    }
  };
  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {}
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (!swiper.params.virtual.enabled) {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "virtual");
        var overwriteParams = {
          watchSlidesProgress: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
        swiper.virtual.update();
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (!swiper.params.virtual.enabled) {
          return;
        }

        swiper.virtual.update();
      }
    }
  };
  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;

      if (e.originalEvent) {
        e = e.originalEvent;
      } // jquery fix


      var kc = e.keyCode || e.charCode; // Directions locks

      if (!swiper.allowSlideNext && (swiper.isHorizontal() && kc === 39 || swiper.isVertical() && kc === 40)) {
        return false;
      }

      if (!swiper.allowSlidePrev && (swiper.isHorizontal() && kc === 37 || swiper.isVertical() && kc === 38)) {
        return false;
      }

      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }

      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }

      if (swiper.params.keyboard.onlyInViewport && (kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false; // Check that swiper should be inside of visible area of window

        if (swiper.$el.parents("." + swiper.params.slideClass).length > 0 && swiper.$el.parents("." + swiper.params.slideActiveClass).length === 0) {
          return undefined;
        }

        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();

        if (rtl) {
          swiperOffset.left -= swiper.$el[0].scrollLeft;
        }

        var swiperCoord = [[swiperOffset.left, swiperOffset.top], [swiperOffset.left + swiper.width, swiperOffset.top], [swiperOffset.left, swiperOffset.top + swiper.height], [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height]];

        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];

          if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
            inView = true;
          }
        }

        if (!inView) {
          return undefined;
        }
      }

      if (swiper.isHorizontal()) {
        if (kc === 37 || kc === 39) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        if (kc === 39 && !rtl || kc === 37 && rtl) {
          swiper.slideNext();
        }

        if (kc === 37 && !rtl || kc === 39 && rtl) {
          swiper.slidePrev();
        }
      } else {
        if (kc === 38 || kc === 40) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }

        if (kc === 40) {
          swiper.slideNext();
        }

        if (kc === 38) {
          swiper.slidePrev();
        }
      }

      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;

      if (swiper.keyboard.enabled) {
        return;
      }

      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;

      if (!swiper.keyboard.enabled) {
        return;
      }

      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    }
  };
  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      }
    }
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported && doc.implementation && doc.implementation.hasFeature && // always returns true in newer browsers as per the standard.
    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
    doc.implementation.hasFeature('', '') !== true) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }

  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: function getEvent() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) {
        return 'DOMMouseScroll';
      }

      return isEventSupported() ? 'wheel' : 'mousewheel';
    }(),
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;
      var sX = 0;
      var sY = 0; // spinX, spinY

      var pX = 0;
      var pY = 0; // pixelX, pixelY
      // Legacy

      if ('detail' in e) {
        sY = e.detail;
      }

      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }

      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }

      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      } // side scrolling on FF with DOMMouseScroll


      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }

      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) {
          // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else {
          // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      } // Fall-back if spin cannot be determined


      if (pX && !sX) {
        sX = pX < 1 ? -1 : 1;
      }

      if (pY && !sY) {
        sY = pY < 1 ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (!swiper.mouseEntered && !params.releaseOnEdges) {
        return true;
      }

      if (e.originalEvent) {
        e = e.originalEvent;
      } // jquery fix


      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;
      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) {
            delta = data.pixelX * rtlFactor;
          } else {
            return true;
          }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) {
          delta = data.pixelY;
        } else {
          return true;
        }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) {
        return true;
      }

      if (params.invert) {
        delta = -delta;
      }

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) {
              return true;
            }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) {
            return true;
          }
        }

        swiper.mousewheel.lastScrollTime = new win.Date().getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }

        var position = swiper.getTranslate() + delta * params.sensitivity;
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) {
          position = swiper.minTranslate();
        }

        if (position <= swiper.maxTranslate()) {
          position = swiper.maxTranslate();
        }

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if (!wasBeginning && swiper.isBeginning || !wasEnd && swiper.isEnd) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideToClosest();
          }, 300);
        } // Emit event


        swiper.emit('scroll', e); // Stop autoplay

        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) {
          swiper.stopAutoplay();
        } // Return page scroll on edge positions


        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) {
          return true;
        }
      }

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      return false;
    },
    enable: function enable() {
      var swiper = this;

      if (!Mousewheel.event) {
        return false;
      }

      if (swiper.mousewheel.enabled) {
        return false;
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }

      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;

      if (!Mousewheel.event) {
        return false;
      }

      if (!swiper.mousewheel.enabled) {
        return false;
      }

      var target = swiper.$el;

      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }

      target.off(Mousewheel.event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    }
  };
  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now()
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.mousewheel.enabled) {
          swiper.mousewheel.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.mousewheel.enabled) {
          swiper.mousewheel.disable();
        }
      }
    }
  };
  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) {
        return;
      }

      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }

        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }

        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;

      if (!(params.nextEl || params.prevEl)) {
        return;
      }

      var $nextEl;
      var $prevEl;

      if (params.nextEl) {
        $nextEl = $(params.nextEl);

        if (swiper.params.uniqueNavElements && typeof params.nextEl === 'string' && $nextEl.length > 1 && swiper.$el.find(params.nextEl).length === 1) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }

      if (params.prevEl) {
        $prevEl = $(params.prevEl);

        if (swiper.params.uniqueNavElements && typeof params.prevEl === 'string' && $prevEl.length > 1 && swiper.$el.find(params.prevEl).length === 1) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', function (e) {
          e.preventDefault();

          if (swiper.isEnd && !swiper.params.loop) {
            return;
          }

          swiper.slideNext();
        });
      }

      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', function (e) {
          e.preventDefault();

          if (swiper.isBeginning && !swiper.params.loop) {
            return;
          }

          swiper.slidePrev();
        });
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($nextEl && $nextEl.length) {
        $nextEl.off('click');
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }

      if ($prevEl && $prevEl.length) {
        $prevEl.off('click');
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    }
  };
  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;

        if (swiper.params.navigation.hideOnClick && !$(e.target).is($prevEl) && !$(e.target).is($nextEl)) {
          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }

          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      }
    }
  };
  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el; // Current/Total

      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

        if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
          current -= slidesLength - swiper.loopedSlides * 2;
        }

        if (current > total - 1) {
          current -= total;
        }

        if (current < 0 && swiper.params.paginationType !== 'bullets') {
          current = total + current;
        }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      } // Types


      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;

        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', swiper.pagination.bulletSize * (params.dynamicMainBullets + 4) + "px");

          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += current - swiper.previousIndex;

            if (swiper.pagination.dynamicBulletIndex > params.dynamicMainBullets - 1) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }

          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }

        bullets.removeClass(params.bulletActiveClass + " " + params.bulletActiveClass + "-next " + params.bulletActiveClass + "-next-next " + params.bulletActiveClass + "-prev " + params.bulletActiveClass + "-prev-prev " + params.bulletActiveClass + "-main");

        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();

            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }

            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(params.bulletActiveClass + "-main");
              }

              if (bulletIndex === firstIndex) {
                $bullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
              }

              if (bulletIndex === lastIndex) {
                $bullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);

          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);

            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(params.bulletActiveClass + "-main");
            }

            $firstDisplayedBullet.prev().addClass(params.bulletActiveClass + "-prev").prev().addClass(params.bulletActiveClass + "-prev-prev");
            $lastDisplayedBullet.next().addClass(params.bulletActiveClass + "-next").next().addClass(params.bulletActiveClass + "-next-next");
          }
        }

        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (swiper.pagination.bulletSize * dynamicBulletsLength - swiper.pagination.bulletSize) / 2 - midIndex * swiper.pagination.bulletSize;
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', bulletsOffset + "px");
        }
      }

      if (params.type === 'fraction') {
        $el.find("." + params.currentClass).text(current + 1);
        $el.find("." + params.totalClass).text(total);
      }

      if (params.type === 'progressbar') {
        var progressbarDirection;

        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }

        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;

        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }

        $el.find("." + params.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")").transition(swiper.params.speed);
      }

      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }

      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      var paginationHTML = '';

      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;

        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + params.bulletElement + " class=\"" + params.bulletClass + "\"></" + params.bulletElement + ">";
          }
        }

        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find("." + params.bulletClass);
      }

      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + params.currentClass + "\"></span>" + ' / ' + "<span class=\"" + params.totalClass + "\"></span>";
        }

        $el.html(paginationHTML);
      }

      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + params.progressbarFillClass + "\"></span>";
        }

        $el.html(paginationHTML);
      }

      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el) {
        return;
      }

      var $el = $(params.el);

      if ($el.length === 0) {
        return;
      }

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && swiper.$el.find(params.el).length === 1) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass("" + params.modifierClass + params.type + "-dynamic");
        swiper.pagination.dynamicBulletIndex = 0;

        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }

      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', "." + params.bulletClass, function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;

          if (swiper.params.loop) {
            index += swiper.loopedSlides;
          }

          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0]
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;

      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) {
        return;
      }

      var $el = swiper.pagination.$el;
      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);

      if (swiper.pagination.bullets) {
        swiper.pagination.bullets.removeClass(params.bulletActiveClass);
      }

      if (params.clickable) {
        $el.off('click', "." + params.bulletClass);
      }
    }
  };
  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets',
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-',
        // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable',
        // NEW
        lockClass: 'swiper-pagination-lock'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;

        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;

        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;

        if (swiper.params.pagination.el && swiper.params.pagination.hideOnClick && swiper.pagination.$el.length > 0 && !$(e.target).hasClass(swiper.params.pagination.bulletClass)) {
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      }
    }
  };
  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;
      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;

      if (rtl) {
        newPos = -newPos;

        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }

      if (swiper.isHorizontal()) {
        if (Support.transforms3d) {
          $dragEl.transform("translate3d(" + newPos + "px, 0, 0)");
        } else {
          $dragEl.transform("translateX(" + newPos + "px)");
        }

        $dragEl[0].style.width = newSize + "px";
      } else {
        if (Support.transforms3d) {
          $dragEl.transform("translate3d(0px, " + newPos + "px, 0)");
        } else {
          $dragEl.transform("translateY(" + newPos + "px)");
        }

        $dragEl[0].style.height = newSize + "px";
      }

      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;

      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;

      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }

      if (swiper.params.scrollbarHide) {
        $el[0].style.opacity = 0;
      }

      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var pointerPosition;

      if (swiper.isHorizontal()) {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX || e.clientX;
      } else {
        pointerPosition = e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY || e.clientY;
      }

      var positionRatio;
      positionRatio = (pointerPosition - $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] - dragSize / 2) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);

      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      e.preventDefault();
      e.stopPropagation();
      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);
      clearTimeout(swiper.scrollbar.dragTimeout);
      $el.transition(0);

      if (params.hide) {
        $el.css('opacity', 1);
      }

      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) {
        return;
      }

      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }

      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) {
        return;
      }

      swiper.scrollbar.isTouched = false;

      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }

      swiper.emit('scrollbarDragEnd', e);

      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var touchEvents = swiper.touchEvents;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListener ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = Support.passiveListener && params.passiveListener ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        if (Support.touch) {
          target.addEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
          target.addEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
          target.addEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.addEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
          doc.addEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
          doc.addEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
        }
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var touchEvents = swiper.touchEvents;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListener ? {
        passive: false,
        capture: false
      } : false;
      var passiveListener = Support.passiveListener && params.passiveListener ? {
        passive: true,
        capture: false
      } : false;

      if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        if (Support.touch) {
          target.removeEventListener(touchEvents.start, swiper.scrollbar.onDragStart, activeListener);
          target.removeEventListener(touchEvents.move, swiper.scrollbar.onDragMove, activeListener);
          target.removeEventListener(touchEvents.end, swiper.scrollbar.onDragEnd, passiveListener);
        }

        if (params.simulateTouch && !Device.ios && !Device.android || params.simulateTouch && !Support.touch && Device.ios) {
          target.removeEventListener('mousedown', swiper.scrollbar.onDragStart, activeListener);
          doc.removeEventListener('mousemove', swiper.scrollbar.onDragMove, activeListener);
          doc.removeEventListener('mouseup', swiper.scrollbar.onDragEnd, passiveListener);
        }
      }
    },
    init: function init() {
      var swiper = this;

      if (!swiper.params.scrollbar.el) {
        return;
      }

      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;
      var $el = $(params.el);

      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find("." + swiper.params.scrollbar.dragClass);

      if ($dragEl.length === 0) {
        $dragEl = $("<div class=\"" + swiper.params.scrollbar.dragClass + "\"></div>");
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0]
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    }
  };
  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      }
    }
  };
  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;
      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;
      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if (x.indexOf('%') >= 0) {
        x = parseInt(x, 10) * progress * rtlFactor + "%";
      } else {
        x = x * progress * rtlFactor + "px";
      }

      if (y.indexOf('%') >= 0) {
        y = parseInt(y, 10) * progress + "%";
      } else {
        y = y * progress + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
        $el[0].style.opacity = currentOpacity;
      }

      if (typeof scale === 'undefined' || scale === null) {
        $el.transform("translate3d(" + x + ", " + y + ", 0px)");
      } else {
        var currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
        $el.transform("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")");
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, el) {
        swiper.parallax.setTransform(el, progress);
      });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;

        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
        }

        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, el) {
          swiper.parallax.setTransform(el, slideProgress);
        });
      });
    },
    setTransition: function setTransition(duration) {
      if (duration === void 0) duration = this.params.speed;
      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function (index, parallaxEl) {
        var $parallaxEl = $(parallaxEl);
        var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;

        if (duration === 0) {
          parallaxDuration = 0;
        }

        $parallaxEl.transition(parallaxDuration);
      });
    }
  };
  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (!swiper.params.parallax.enabled) {
          return;
        }

        swiper.params.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;

        if (!swiper.params.parallax) {
          return;
        }

        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (!swiper.params.parallax) {
          return;
        }

        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (!swiper.params.parallax) {
          return;
        }

        swiper.parallax.setTransition(duration);
      }
    }
  };
  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) {
        return 1;
      }

      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;

      if (!Support.gestures) {
        if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest('.swiper-slide');

        if (gesture.$slideEl.length === 0) {
          gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
        }

        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }

      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
          return;
        }

        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (Support.gestures) {
        swiper.zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = gesture.scaleMove / gesture.scaleStart * zoom.currentScale;
      }

      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = gesture.maxRatio - 1 + Math.pow(zoom.scale - gesture.maxRatio + 1, 0.5);
      }

      if (zoom.scale < params.minRatio) {
        zoom.scale = params.minRatio + 1 - Math.pow(params.minRatio - zoom.scale + 1, 0.5);
      }

      gesture.$imageEl.transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }

        if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android) {
          return;
        }

        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;

      if (zoom.scale === 1) {
        gesture.$slideEl = undefined;
      }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (image.isTouched) {
        return;
      }

      if (Device.android) {
        e.preventDefault();
      }

      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      swiper.allowClick = false;

      if (!image.isTouched || !gesture.$slideEl) {
        return;
      }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);

        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      } // Define if we need image drag


      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) {
        return;
      }

      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (swiper.isHorizontal() && (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x || Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)) {
          image.isTouched = false;
          return;
        } else if (!swiper.isHorizontal() && (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y || Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)) {
          image.isTouched = false;
          return;
        }
      }

      e.preventDefault();
      e.stopPropagation();
      image.isMoved = true;
      image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
      image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = image.minX + 1 - Math.pow(image.minX - image.currentX + 1, 0.8);
      }

      if (image.currentX > image.maxX) {
        image.currentX = image.maxX - 1 + Math.pow(image.currentX - image.maxX + 1, 0.8);
      }

      if (image.currentY < image.minY) {
        image.currentY = image.minY + 1 - Math.pow(image.minY - image.currentY + 1, 0.8);
      }

      if (image.currentY > image.maxY) {
        image.currentY = image.maxY - 1 + Math.pow(image.currentY - image.maxY + 1, 0.8);
      } // Velocity


      if (!velocity.prevPositionX) {
        velocity.prevPositionX = image.touchesCurrent.x;
      }

      if (!velocity.prevPositionY) {
        velocity.prevPositionY = image.touchesCurrent.y;
      }

      if (!velocity.prevTime) {
        velocity.prevTime = Date.now();
      }

      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;

      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) {
        velocity.x = 0;
      }

      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) {
        velocity.y = 0;
      }

      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();
      gesture.$imageWrapEl.transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }

      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY; // Fix duration

      if (velocity.x !== 0) {
        momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
      }

      if (velocity.y !== 0) {
        momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
      }

      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
      image.currentX = newPositionX;
      image.currentY = newPositionY; // Define if we need image drag

      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
      image.maxX = -image.minX;
      image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
      gesture.$imageWrapEl.transition(momentumDuration).transform("translate3d(" + image.currentX + "px, " + image.currentY + "px,0)");
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;

      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');
        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
        zoom.scale = 1;
        zoom.currentScale = 1;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      gesture.$slideEl.addClass("" + params.zoomedSlideClass);
      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = offsetX + slideWidth / 2 - touchX;
        diffY = offsetY + slideHeight / 2 - touchY;
        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;
        translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
        translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;
        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }

        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }

        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }

      gesture.$imageWrapEl.transition(300).transform("translate3d(" + translateX + "px, " + translateY + "px,0)");
      gesture.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + zoom.scale + ")");
    },
    out: function out() {
      var swiper = this;
      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent("." + params.containerClass);
      }

      if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
        return;
      }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass("" + params.zoomedSlideClass);
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.enabled) {
        return;
      }

      zoom.enabled = true;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false; // Scale image

      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } // Move image


      swiper.$wrapperEl.on(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;

      if (!zoom.enabled) {
        return;
      }

      swiper.zoom.enabled = false;
      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? {
        passive: true,
        capture: false
      } : false; // Scale image

      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } // Move image


      swiper.$wrapperEl.off(swiper.touchEvents.move, "." + swiper.params.zoom.containerClass, zoom.onTouchMove);
    }
  };
  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed'
      }
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3
        },
        image: {
          isTouched: undefined,
          isMoved: undefined,
          currentX: undefined,
          currentY: undefined,
          minX: undefined,
          minY: undefined,
          maxX: undefined,
          maxY: undefined,
          width: undefined,
          height: undefined,
          startX: undefined,
          startY: undefined,
          touchesStart: {},
          touchesCurrent: {}
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined
        }
      };
      'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'.split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;

        if (!swiper.zoom.enabled) {
          return;
        }

        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;

        if (!swiper.zoom.enabled) {
          return;
        }

        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;

        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      }
    }
  };
  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if (loadInDuplicate === void 0) loadInDuplicate = true;
      var swiper = this;
      var params = swiper.params.lazy;

      if (typeof index === 'undefined') {
        return;
      }

      if (swiper.slides.length === 0) {
        return;
      }

      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var $slideEl = isVirtual ? swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-swiper-slide-index=\"" + index + "\"]") : swiper.slides.eq(index);
      var $images = $slideEl.find("." + params.elementClass + ":not(." + params.loadedClass + "):not(." + params.loadingClass + ")");

      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }

      if ($images.length === 0) {
        return;
      }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);
        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');
        swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper && !swiper.params || swiper.destroyed) {
            return;
          }

          if (background) {
            $imageEl.css('background-image', "url(\"" + background + "\")");
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }

            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }

            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find("." + params.preloaderClass).remove();

          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + swiper.params.slideDuplicateClass + ")");
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children("." + swiper.params.slideDuplicateClass + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]");
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }

          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });
        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;
      var slidesPerView = swiperParams.slidesPerView;

      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children("." + swiperParams.slideClass + "[data-swiper-slide-index=\"" + index + "\"]").length) {
            return true;
          }
        } else if (slides[index]) {
          return true;
        }

        return false;
      }

      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }

        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) {
        swiper.lazy.initialImageLoaded = true;
      }

      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children("." + swiperParams.slideVisibleClass).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) {
            swiper.lazy.loadInSlide(i);
          }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }

      if (params.loadPrevNext) {
        if (slidesPerView > 1 || params.loadPrevNextAmount && params.loadPrevNextAmount > 1) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) {
              swiper.lazy.loadInSlide(i$1);
            }
          } // Prev Slides


          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) {
              swiper.lazy.loadInSlide(i$2);
            }
          }
        } else {
          var nextSlide = $wrapperEl.children("." + swiperParams.slideNextClass);

          if (nextSlide.length > 0) {
            swiper.lazy.loadInSlide(slideIndex(nextSlide));
          }

          var prevSlide = $wrapperEl.children("." + swiperParams.slidePrevClass);

          if (prevSlide.length > 0) {
            swiper.lazy.loadInSlide(slideIndex(prevSlide));
          }
        }
      }
    }
  };
  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,
        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;

        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;

        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;

        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || !swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      }
    }
  };
  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;

          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;

            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }

          return maxIndex;
        };
      }();

      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.

      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) {
          return 0;
        } // Get the indexes of x1 and x3 (the array indexes before and after given x2):


        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

        return (x2 - this.x[i1]) * (this.y[i3] - this.y[i1]) / (this.x[i3] - this.x[i1]) + this.y[i1];
      };

      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;

      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid) : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;

      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out

          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }

        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }

      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;

      function setControlledTransition(c) {
        c.setTransition(duration, swiper);

        if (duration !== 0) {
          c.transitionStart();
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) {
              return;
            }

            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }

            c.transitionEnd();
          });
        }
      }

      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    }
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide' // or 'container'

      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper)
        }
      });
    },
    on: {
      update: function update() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;

        if (!swiper.controller.control) {
          return;
        }

        swiper.controller.setTransition(duration, byController);
      }
    }
  };
  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;

      if (e.keyCode !== 13) {
        return;
      }

      var $targetEl = $(e.target);

      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }

        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }

      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }

        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }

      if (swiper.pagination && $targetEl.is("." + swiper.params.pagination.bulletClass)) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;

      if (notification.length === 0) {
        return;
      }

      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) {
        return;
      }

      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;

      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;
      swiper.$el.append(swiper.a11y.liveRegion); // Navigation

      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) {
        swiper.a11y.liveRegion.remove();
      }

      var $nextEl;
      var $prevEl;

      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }

      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }

      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }

      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      } // Pagination


      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', "." + swiper.params.pagination.bulletClass, swiper.a11y.onEnterKey);
      }
    }
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $("<span class=\"" + swiper.params.a11y.notificationClass + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")
        }
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;

        if (!swiper.params.a11y.enabled) {
          return;
        }

        swiper.a11y.destroy();
      }
    }
  };
  var History = {
    init: function init() {
      var swiper = this;

      if (!swiper.params.history) {
        return;
      }

      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }

      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();

      if (!history.paths.key && !history.paths.value) {
        return;
      }

      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);

      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) {
        return part !== '';
      });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return {
        key: key,
        value: value
      };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;

      if (!swiper.history.initialized || !swiper.params.history.enabled) {
        return;
      }

      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));

      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }

      var currentState = win.history.state;

      if (currentState && currentState.value === value) {
        return;
      }

      if (swiper.params.history.replaceState) {
        win.history.replaceState({
          value: value
        }, null, value);
      } else {
        win.history.pushState({
          value: value
        }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;

      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));

          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    }
  };
  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides'
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      }
    }
  };
  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

      if (newHash !== activeSlideHash) {
        swiper.slideTo(swiper.$wrapperEl.children("." + swiper.params.slideClass + "[data-hash=\"" + newHash + "\"]").index());
      }
    },
    setHash: function setHash() {
      var swiper = this;

      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) {
        return;
      }

      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, "#" + swiper.slides.eq(swiper.activeIndex).attr('data-hash') || '');
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;

      if (!swiper.params.hashNavigation.enabled || swiper.params.history && swiper.params.history.enabled) {
        return;
      }

      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');

      if (hash) {
        var speed = 0;

        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');

          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }

      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;

      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    }
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper)
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;

        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      }
    }
  };
  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;

      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }

      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
      }, delay);
    },
    start: function start() {
      var swiper = this;

      if (typeof swiper.autoplay.timeout !== 'undefined') {
        return false;
      }

      if (swiper.autoplay.running) {
        return false;
      }

      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;

      if (!swiper.autoplay.running) {
        return false;
      }

      if (typeof swiper.autoplay.timeout === 'undefined') {
        return false;
      }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }

      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;

      if (!swiper.autoplay.running) {
        return;
      }

      if (swiper.autoplay.paused) {
        return;
      }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
      }

      swiper.autoplay.paused = true;

      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    }
  };
  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) {
              return;
            }

            if (e.target !== this) {
              return;
            }

            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;

            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          }
        }
      });
    },
    on: {
      init: function init() {
        var swiper = this;

        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;

        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;

        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      destroy: function destroy() {
        var swiper = this;

        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
      }
    }
  };
  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;

        if (!swiper.params.virtualTranslate) {
          tx -= swiper.translate;
        }

        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }

        var slideOpacity = swiper.params.fadeEffect.crossFade ? Math.max(1 - Math.abs($slideEl[0].progress), 0) : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl.css({
          opacity: slideOpacity
        }).transform("translate3d(" + tx + "px, " + ty + "px, 0px)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) {
            return;
          }

          if (!swiper || swiper.destroyed) {
            return;
          }

          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "fade");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'fade') {
          return;
        }

        swiper.fadeEffect.setTransition(duration);
      }
    }
  };
  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }

          $cubeShadowEl.css({
            height: swiperWidth + "px"
          });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');

          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;

        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }

        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);

        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }

        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;

        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + round * 4 * swiperSize;
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = 3 * swiperSize + swiperSize * 4 * round;
        }

        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";

        if (progress <= 1 && progress > -1) {
          wrapperRotate = slideIndex * 90 + progress * 90;

          if (rtl) {
            wrapperRotate = -slideIndex * 90 - progress * 90;
          }
        }

        $slideEl.transform(transform);

        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) {
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          }

          if (shadowAfter.length) {
            shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }
      }

      $wrapperEl.css({
        '-webkit-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-moz-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        '-ms-transform-origin': "50% 50% -" + swiperSize / 2 + "px",
        'transform-origin': "50% 50% -" + swiperSize / 2 + "px"
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform("translate3d(0px, " + (swiperWidth / 2 + params.shadowOffset) + "px, " + -swiperWidth / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + params.shadowScale + ")");
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
          var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + (swiperHeight / 2 + offset) + "px, " + -swiperHeight / 2 / scale2 + "px) rotateX(-90deg)");
        }
      }

      var zFactor = Browser.isSafari || Browser.isUiWebView ? -swiperSize / 2 : 0;
      $wrapperEl.transform("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)");
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    }
  };
  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "cube");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'cube') {
          return;
        }

        swiper.cubeEffect.setTransition(duration);
      }
    }
  };
  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;

      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;

        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }

        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;

        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if (shadowBefore.length === 0) {
            shadowBefore = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>");
            $slideEl.append(shadowBefore);
          }

          if (shadowAfter.length === 0) {
            shadowAfter = $("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append(shadowAfter);
          }

          if (shadowBefore.length) {
            shadowBefore[0].style.opacity = Math.max(-progress, 0);
          }

          if (shadowAfter.length) {
            shadowAfter[0].style.opacity = Math.max(progress, 0);
          }
        }

        $slideEl.transform("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)");
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);

      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false; // eslint-disable-next-line

        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) {
            return;
          }

          if (!swiper || swiper.destroyed) {
            return;
          } // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;


          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];

          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    }
  };
  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "flip");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'flip') {
          return;
        }

        swiper.flipEffect.setTransition(duration);
      }
    }
  };
  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth; // Each slide offset from center

      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * params.modifier;
        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

        var translateZ = -translate * Math.abs(offsetMultiplier);
        var translateY = isHorizontal ? 0 : params.stretch * offsetMultiplier;
        var translateX = isHorizontal ? params.stretch * offsetMultiplier : 0; // Fix for ultra small values

        if (Math.abs(translateX) < 0.001) {
          translateX = 0;
        }

        if (Math.abs(translateY) < 0.001) {
          translateY = 0;
        }

        if (Math.abs(translateZ) < 0.001) {
          translateZ = 0;
        }

        if (Math.abs(rotateY) < 0.001) {
          rotateY = 0;
        }

        if (Math.abs(rotateX) < 0.001) {
          rotateX = 0;
        }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";
        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');

          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>");
            $slideEl.append($shadowBeforeEl);
          }

          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>");
            $slideEl.append($shadowAfterEl);
          }

          if ($shadowBeforeEl.length) {
            $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          }

          if ($shadowAfterEl.length) {
            $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
          }
        }
      } // Set correct perspective for IE10


      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
    }
  };
  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper)
        }
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.classNames.push(swiper.params.containerModifierClass + "coverflow");
        swiper.classNames.push(swiper.params.containerModifierClass + "3d");
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;

        if (swiper.params.effect !== 'coverflow') {
          return;
        }

        swiper.coverflowEffect.setTransition(duration);
      }
    }
  }; // Swiper Class

  var components = [Device$1, Support$1, Browser$1, Resize, Observer$1, Virtual$1, Keyboard$1, Mousewheel$1, Navigation$1, Pagination$1, Scrollbar$1, Parallax$1, Zoom$1, Lazy$1, Controller$1, A11y, History$1, HashNavigation$1, Autoplay$1, EffectFade, EffectCube, EffectFlip, EffectCoverflow];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);
  return Swiper;
});