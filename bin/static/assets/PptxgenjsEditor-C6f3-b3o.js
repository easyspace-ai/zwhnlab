import { j as ee, _ as Bt } from "./three-BECTMk9d.js";
import { a as ue, c as st, g as ca } from "./monaco-BSfMmt4N.js";
import { L as $e, c as jt, p as da, a as fa, q as pa, r as ua, y as ha, s as ma, S as ga, __tla as __tla_0 } from "./main-gNlFrJgr.js";
import { a as va } from "./routes-UgFNxPGD.js";
import { r as Tt, p as Xe } from "./themePresets-Bm4AFvWW.js";
import { c as ya, W as ba, P as wa, __tla as __tla_1 } from "./pptx-worker-BWo1NuJo.js";
import { P as Gt } from "./PipelineProgressPanel-vwbccnca.js";
let zr, xa, Wr;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })()
]).then(async () => {
  xa = function({ pptxBytes: e, deckLabel: o, className: t, hideToolbarSettings: i }) {
    const [n, A] = ue.useState(null), [l, c] = ue.useState(null), [s, a] = ue.useState(0), [r, f] = ue.useState(0), [g, d] = ue.useState(null), [m, h] = ue.useState("idle"), y = ue.useRef(null), v = ue.useRef(0);
    ue.useEffect(() => {
      let x = false, k = null;
      return h("starting"), (async () => {
        try {
          const B = await ya(new ba());
          if (x) {
            B.close();
            return;
          }
          k = B, A(B), h("ready");
        } catch (B) {
          if (!x) {
            const T = B instanceof Error ? B.message : String(B);
            d(`\u9884\u89C8 Worker \u542F\u52A8\u5931\u8D25: ${T}`), h("idle");
          }
        }
      })(), () => {
        x = true, k == null ? void 0 : k.close(), A(null);
      };
    }, []);
    const b = ue.useCallback((x, k) => {
      y.current = new Uint8Array(k), v.current += 1, f(v.current), c(x), a(0), d(null);
    }, []);
    return ue.useEffect(() => {
      if (!(e == null ? void 0 : e.byteLength)) {
        y.current = null, f(0), c(null), a(0);
        return;
      }
      b(o || "\u6F14\u793A\u6587\u7A3F", e);
    }, [
      e,
      o,
      b
    ]), ue.useEffect(() => {
      if (!n || r === 0 || !y.current) return;
      const x = r, k = new Uint8Array(y.current);
      let B = false;
      return (async () => {
        try {
          const T = await n.open(k, {});
          if (B || x !== v.current) return;
          a(T.slideCount), d(null);
        } catch (T) {
          if (B || x !== v.current) return;
          const R = T instanceof Error ? T.message : String(T);
          d(R), a(0);
        }
      })(), () => {
        B = true;
      };
    }, [
      n,
      r
    ]), ee.jsxs("div", {
      className: jt("flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0e0e10] text-[#ececec]", t),
      children: [
        m === "starting" && ee.jsxs("div", {
          className: "flex shrink-0 items-center gap-2 border-b border-[#2a2a30] px-4 py-2 text-xs text-[#6aa3ff]",
          children: [
            ee.jsx($e, {
              size: 14,
              className: "animate-spin"
            }),
            "\u6B63\u5728\u542F\u52A8\u9884\u89C8\u5F15\u64CE\u2026"
          ]
        }),
        g && ee.jsx("div", {
          className: "shrink-0 border-b border-red-900/40 bg-red-950/40 px-4 py-2 text-xs text-red-300",
          children: g
        }),
        (e == null ? void 0 : e.byteLength) && s > 0 ? ee.jsx(wa, {
          controller: n,
          name: l,
          slideCount: s,
          className: "min-h-0 flex-1",
          style: {
            flex: 1,
            minHeight: 0
          },
          hideToolbarSettings: i
        }, `${r}-${s}`) : m === "ready" && !g ? ee.jsx("div", {
          className: "flex flex-1 items-center justify-center text-sm text-slate-500",
          children: (e == null ? void 0 : e.byteLength) ? "\u6B63\u5728\u89E3\u6790 PPTX\u2026" : o ? "\u6B63\u5728\u751F\u6210 PPTX \u9884\u89C8\u2026" : "\u751F\u6210 Slide Schema \u540E\u5C06\u5728\u6B64\u663E\u793A PPTX \u9884\u89C8"
        }) : null
      ]
    });
  };
  function At(e) {
    throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
  }
  var vt = {
    exports: {}
  };
  var Qt;
  function Ca() {
    return Qt || (Qt = 1, (function(e, o) {
      (function(t) {
        e.exports = t();
      })(function() {
        return (function t(i, n, A) {
          function l(a, r) {
            if (!n[a]) {
              if (!i[a]) {
                var f = typeof At == "function" && At;
                if (!r && f) return f(a, true);
                if (c) return c(a, true);
                var g = new Error("Cannot find module '" + a + "'");
                throw g.code = "MODULE_NOT_FOUND", g;
              }
              var d = n[a] = {
                exports: {}
              };
              i[a][0].call(d.exports, function(m) {
                var h = i[a][1][m];
                return l(h || m);
              }, d, d.exports, t, i, n, A);
            }
            return n[a].exports;
          }
          for (var c = typeof At == "function" && At, s = 0; s < A.length; s++) l(A[s]);
          return l;
        })({
          1: [
            function(t, i, n) {
              var A = t("./utils"), l = t("./support"), c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
              n.encode = function(s) {
                for (var a, r, f, g, d, m, h, y = [], v = 0, b = s.length, x = b, k = A.getTypeOf(s) !== "string"; v < s.length; ) x = b - v, f = k ? (a = s[v++], r = v < b ? s[v++] : 0, v < b ? s[v++] : 0) : (a = s.charCodeAt(v++), r = v < b ? s.charCodeAt(v++) : 0, v < b ? s.charCodeAt(v++) : 0), g = a >> 2, d = (3 & a) << 4 | r >> 4, m = 1 < x ? (15 & r) << 2 | f >> 6 : 64, h = 2 < x ? 63 & f : 64, y.push(c.charAt(g) + c.charAt(d) + c.charAt(m) + c.charAt(h));
                return y.join("");
              }, n.decode = function(s) {
                var a, r, f, g, d, m, h = 0, y = 0, v = "data:";
                if (s.substr(0, v.length) === v) throw new Error("Invalid base64 input, it looks like a data url.");
                var b, x = 3 * (s = s.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
                if (s.charAt(s.length - 1) === c.charAt(64) && x--, s.charAt(s.length - 2) === c.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
                for (b = l.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); h < s.length; ) a = c.indexOf(s.charAt(h++)) << 2 | (g = c.indexOf(s.charAt(h++))) >> 4, r = (15 & g) << 4 | (d = c.indexOf(s.charAt(h++))) >> 2, f = (3 & d) << 6 | (m = c.indexOf(s.charAt(h++))), b[y++] = a, d !== 64 && (b[y++] = r), m !== 64 && (b[y++] = f);
                return b;
              };
            },
            {
              "./support": 30,
              "./utils": 32
            }
          ],
          2: [
            function(t, i, n) {
              var A = t("./external"), l = t("./stream/DataWorker"), c = t("./stream/Crc32Probe"), s = t("./stream/DataLengthProbe");
              function a(r, f, g, d, m) {
                this.compressedSize = r, this.uncompressedSize = f, this.crc32 = g, this.compression = d, this.compressedContent = m;
              }
              a.prototype = {
                getContentWorker: function() {
                  var r = new l(A.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")), f = this;
                  return r.on("end", function() {
                    if (this.streamInfo.data_length !== f.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
                  }), r;
                },
                getCompressedWorker: function() {
                  return new l(A.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
                }
              }, a.createWorkerFrom = function(r, f, g) {
                return r.pipe(new c()).pipe(new s("uncompressedSize")).pipe(f.compressWorker(g)).pipe(new s("compressedSize")).withStreamInfo("compression", f);
              }, i.exports = a;
            },
            {
              "./external": 6,
              "./stream/Crc32Probe": 25,
              "./stream/DataLengthProbe": 26,
              "./stream/DataWorker": 27
            }
          ],
          3: [
            function(t, i, n) {
              var A = t("./stream/GenericWorker");
              n.STORE = {
                magic: "\0\0",
                compressWorker: function() {
                  return new A("STORE compression");
                },
                uncompressWorker: function() {
                  return new A("STORE decompression");
                }
              }, n.DEFLATE = t("./flate");
            },
            {
              "./flate": 7,
              "./stream/GenericWorker": 28
            }
          ],
          4: [
            function(t, i, n) {
              var A = t("./utils"), l = (function() {
                for (var c, s = [], a = 0; a < 256; a++) {
                  c = a;
                  for (var r = 0; r < 8; r++) c = 1 & c ? 3988292384 ^ c >>> 1 : c >>> 1;
                  s[a] = c;
                }
                return s;
              })();
              i.exports = function(c, s) {
                return c !== void 0 && c.length ? A.getTypeOf(c) !== "string" ? (function(a, r, f, g) {
                  var d = l, m = g + f;
                  a ^= -1;
                  for (var h = g; h < m; h++) a = a >>> 8 ^ d[255 & (a ^ r[h])];
                  return -1 ^ a;
                })(0 | s, c, c.length, 0) : (function(a, r, f, g) {
                  var d = l, m = g + f;
                  a ^= -1;
                  for (var h = g; h < m; h++) a = a >>> 8 ^ d[255 & (a ^ r.charCodeAt(h))];
                  return -1 ^ a;
                })(0 | s, c, c.length, 0) : 0;
              };
            },
            {
              "./utils": 32
            }
          ],
          5: [
            function(t, i, n) {
              n.base64 = false, n.binary = false, n.dir = false, n.createFolders = true, n.date = null, n.compression = null, n.compressionOptions = null, n.comment = null, n.unixPermissions = null, n.dosPermissions = null;
            },
            {}
          ],
          6: [
            function(t, i, n) {
              var A = null;
              A = typeof Promise < "u" ? Promise : t("lie"), i.exports = {
                Promise: A
              };
            },
            {
              lie: 37
            }
          ],
          7: [
            function(t, i, n) {
              var A = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", l = t("pako"), c = t("./utils"), s = t("./stream/GenericWorker"), a = A ? "uint8array" : "array";
              function r(f, g) {
                s.call(this, "FlateWorker/" + f), this._pako = null, this._pakoAction = f, this._pakoOptions = g, this.meta = {};
              }
              n.magic = "\b\0", c.inherits(r, s), r.prototype.processChunk = function(f) {
                this.meta = f.meta, this._pako === null && this._createPako(), this._pako.push(c.transformTo(a, f.data), false);
              }, r.prototype.flush = function() {
                s.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
              }, r.prototype.cleanUp = function() {
                s.prototype.cleanUp.call(this), this._pako = null;
              }, r.prototype._createPako = function() {
                this._pako = new l[this._pakoAction]({
                  raw: true,
                  level: this._pakoOptions.level || -1
                });
                var f = this;
                this._pako.onData = function(g) {
                  f.push({
                    data: g,
                    meta: f.meta
                  });
                };
              }, n.compressWorker = function(f) {
                return new r("Deflate", f);
              }, n.uncompressWorker = function() {
                return new r("Inflate", {});
              };
            },
            {
              "./stream/GenericWorker": 28,
              "./utils": 32,
              pako: 38
            }
          ],
          8: [
            function(t, i, n) {
              function A(d, m) {
                var h, y = "";
                for (h = 0; h < m; h++) y += String.fromCharCode(255 & d), d >>>= 8;
                return y;
              }
              function l(d, m, h, y, v, b) {
                var x, k, B = d.file, T = d.compression, R = b !== a.utf8encode, G = c.transformTo("string", b(B.name)), P = c.transformTo("string", a.utf8encode(B.name)), I = B.comment, H = c.transformTo("string", b(I)), L = c.transformTo("string", a.utf8encode(I)), E = P.length !== B.name.length, u = L.length !== I.length, S = "", Z = "", M = "", te = B.dir, X = B.date, ae = {
                  crc32: 0,
                  compressedSize: 0,
                  uncompressedSize: 0
                };
                m && !h || (ae.crc32 = d.crc32, ae.compressedSize = d.compressedSize, ae.uncompressedSize = d.uncompressedSize);
                var N = 0;
                m && (N |= 8), R || !E && !u || (N |= 2048);
                var F = 0, K = 0;
                te && (F |= 16), v === "UNIX" ? (K = 798, F |= (function(J, le) {
                  var we = J;
                  return J || (we = le ? 16893 : 33204), (65535 & we) << 16;
                })(B.unixPermissions, te)) : (K = 20, F |= (function(J) {
                  return 63 & (J || 0);
                })(B.dosPermissions)), x = X.getUTCHours(), x <<= 6, x |= X.getUTCMinutes(), x <<= 5, x |= X.getUTCSeconds() / 2, k = X.getUTCFullYear() - 1980, k <<= 4, k |= X.getUTCMonth() + 1, k <<= 5, k |= X.getUTCDate(), E && (Z = A(1, 1) + A(r(G), 4) + P, S += "up" + A(Z.length, 2) + Z), u && (M = A(1, 1) + A(r(H), 4) + L, S += "uc" + A(M.length, 2) + M);
                var j = "";
                return j += `
\0`, j += A(N, 2), j += T.magic, j += A(x, 2), j += A(k, 2), j += A(ae.crc32, 4), j += A(ae.compressedSize, 4), j += A(ae.uncompressedSize, 4), j += A(G.length, 2), j += A(S.length, 2), {
                  fileRecord: f.LOCAL_FILE_HEADER + j + G + S,
                  dirRecord: f.CENTRAL_FILE_HEADER + A(K, 2) + j + A(H.length, 2) + "\0\0\0\0" + A(F, 4) + A(y, 4) + G + S + H
                };
              }
              var c = t("../utils"), s = t("../stream/GenericWorker"), a = t("../utf8"), r = t("../crc32"), f = t("../signature");
              function g(d, m, h, y) {
                s.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = m, this.zipPlatform = h, this.encodeFileName = y, this.streamFiles = d, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
              }
              c.inherits(g, s), g.prototype.push = function(d) {
                var m = d.meta.percent || 0, h = this.entriesCount, y = this._sources.length;
                this.accumulate ? this.contentBuffer.push(d) : (this.bytesWritten += d.data.length, s.prototype.push.call(this, {
                  data: d.data,
                  meta: {
                    currentFile: this.currentFile,
                    percent: h ? (m + 100 * (h - y - 1)) / h : 100
                  }
                }));
              }, g.prototype.openedSource = function(d) {
                this.currentSourceOffset = this.bytesWritten, this.currentFile = d.file.name;
                var m = this.streamFiles && !d.file.dir;
                if (m) {
                  var h = l(d, m, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                  this.push({
                    data: h.fileRecord,
                    meta: {
                      percent: 0
                    }
                  });
                } else this.accumulate = true;
              }, g.prototype.closedSource = function(d) {
                this.accumulate = false;
                var m = this.streamFiles && !d.file.dir, h = l(d, m, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                if (this.dirRecords.push(h.dirRecord), m) this.push({
                  data: (function(y) {
                    return f.DATA_DESCRIPTOR + A(y.crc32, 4) + A(y.compressedSize, 4) + A(y.uncompressedSize, 4);
                  })(d),
                  meta: {
                    percent: 100
                  }
                });
                else for (this.push({
                  data: h.fileRecord,
                  meta: {
                    percent: 0
                  }
                }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
                this.currentFile = null;
              }, g.prototype.flush = function() {
                for (var d = this.bytesWritten, m = 0; m < this.dirRecords.length; m++) this.push({
                  data: this.dirRecords[m],
                  meta: {
                    percent: 100
                  }
                });
                var h = this.bytesWritten - d, y = (function(v, b, x, k, B) {
                  var T = c.transformTo("string", B(k));
                  return f.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(v, 2) + A(v, 2) + A(b, 4) + A(x, 4) + A(T.length, 2) + T;
                })(this.dirRecords.length, h, d, this.zipComment, this.encodeFileName);
                this.push({
                  data: y,
                  meta: {
                    percent: 100
                  }
                });
              }, g.prototype.prepareNextSource = function() {
                this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
              }, g.prototype.registerPrevious = function(d) {
                this._sources.push(d);
                var m = this;
                return d.on("data", function(h) {
                  m.processChunk(h);
                }), d.on("end", function() {
                  m.closedSource(m.previous.streamInfo), m._sources.length ? m.prepareNextSource() : m.end();
                }), d.on("error", function(h) {
                  m.error(h);
                }), this;
              }, g.prototype.resume = function() {
                return !!s.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
              }, g.prototype.error = function(d) {
                var m = this._sources;
                if (!s.prototype.error.call(this, d)) return false;
                for (var h = 0; h < m.length; h++) try {
                  m[h].error(d);
                } catch {
                }
                return true;
              }, g.prototype.lock = function() {
                s.prototype.lock.call(this);
                for (var d = this._sources, m = 0; m < d.length; m++) d[m].lock();
              }, i.exports = g;
            },
            {
              "../crc32": 4,
              "../signature": 23,
              "../stream/GenericWorker": 28,
              "../utf8": 31,
              "../utils": 32
            }
          ],
          9: [
            function(t, i, n) {
              var A = t("../compressions"), l = t("./ZipFileWorker");
              n.generateWorker = function(c, s, a) {
                var r = new l(s.streamFiles, a, s.platform, s.encodeFileName), f = 0;
                try {
                  c.forEach(function(g, d) {
                    f++;
                    var m = (function(b, x) {
                      var k = b || x, B = A[k];
                      if (!B) throw new Error(k + " is not a valid compression method !");
                      return B;
                    })(d.options.compression, s.compression), h = d.options.compressionOptions || s.compressionOptions || {}, y = d.dir, v = d.date;
                    d._compressWorker(m, h).withStreamInfo("file", {
                      name: g,
                      dir: y,
                      date: v,
                      comment: d.comment || "",
                      unixPermissions: d.unixPermissions,
                      dosPermissions: d.dosPermissions
                    }).pipe(r);
                  }), r.entriesCount = f;
                } catch (g) {
                  r.error(g);
                }
                return r;
              };
            },
            {
              "../compressions": 3,
              "./ZipFileWorker": 8
            }
          ],
          10: [
            function(t, i, n) {
              function A() {
                if (!(this instanceof A)) return new A();
                if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
                  var l = new A();
                  for (var c in this) typeof this[c] != "function" && (l[c] = this[c]);
                  return l;
                };
              }
              (A.prototype = t("./object")).loadAsync = t("./load"), A.support = t("./support"), A.defaults = t("./defaults"), A.version = "3.10.1", A.loadAsync = function(l, c) {
                return new A().loadAsync(l, c);
              }, A.external = t("./external"), i.exports = A;
            },
            {
              "./defaults": 5,
              "./external": 6,
              "./load": 11,
              "./object": 15,
              "./support": 30
            }
          ],
          11: [
            function(t, i, n) {
              var A = t("./utils"), l = t("./external"), c = t("./utf8"), s = t("./zipEntries"), a = t("./stream/Crc32Probe"), r = t("./nodejsUtils");
              function f(g) {
                return new l.Promise(function(d, m) {
                  var h = g.decompressed.getContentWorker().pipe(new a());
                  h.on("error", function(y) {
                    m(y);
                  }).on("end", function() {
                    h.streamInfo.crc32 !== g.decompressed.crc32 ? m(new Error("Corrupted zip : CRC32 mismatch")) : d();
                  }).resume();
                });
              }
              i.exports = function(g, d) {
                var m = this;
                return d = A.extend(d || {}, {
                  base64: false,
                  checkCRC32: false,
                  optimizedBinaryString: false,
                  createFolders: false,
                  decodeFileName: c.utf8decode
                }), r.isNode && r.isStream(g) ? l.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : A.prepareContent("the loaded zip file", g, true, d.optimizedBinaryString, d.base64).then(function(h) {
                  var y = new s(d);
                  return y.load(h), y;
                }).then(function(h) {
                  var y = [
                    l.Promise.resolve(h)
                  ], v = h.files;
                  if (d.checkCRC32) for (var b = 0; b < v.length; b++) y.push(f(v[b]));
                  return l.Promise.all(y);
                }).then(function(h) {
                  for (var y = h.shift(), v = y.files, b = 0; b < v.length; b++) {
                    var x = v[b], k = x.fileNameStr, B = A.resolve(x.fileNameStr);
                    m.file(B, x.decompressed, {
                      binary: true,
                      optimizedBinaryString: true,
                      date: x.date,
                      dir: x.dir,
                      comment: x.fileCommentStr.length ? x.fileCommentStr : null,
                      unixPermissions: x.unixPermissions,
                      dosPermissions: x.dosPermissions,
                      createFolders: d.createFolders
                    }), x.dir || (m.file(B).unsafeOriginalName = k);
                  }
                  return y.zipComment.length && (m.comment = y.zipComment), m;
                });
              };
            },
            {
              "./external": 6,
              "./nodejsUtils": 14,
              "./stream/Crc32Probe": 25,
              "./utf8": 31,
              "./utils": 32,
              "./zipEntries": 33
            }
          ],
          12: [
            function(t, i, n) {
              var A = t("../utils"), l = t("../stream/GenericWorker");
              function c(s, a) {
                l.call(this, "Nodejs stream input adapter for " + s), this._upstreamEnded = false, this._bindStream(a);
              }
              A.inherits(c, l), c.prototype._bindStream = function(s) {
                var a = this;
                (this._stream = s).pause(), s.on("data", function(r) {
                  a.push({
                    data: r,
                    meta: {
                      percent: 0
                    }
                  });
                }).on("error", function(r) {
                  a.isPaused ? this.generatedError = r : a.error(r);
                }).on("end", function() {
                  a.isPaused ? a._upstreamEnded = true : a.end();
                });
              }, c.prototype.pause = function() {
                return !!l.prototype.pause.call(this) && (this._stream.pause(), true);
              }, c.prototype.resume = function() {
                return !!l.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
              }, i.exports = c;
            },
            {
              "../stream/GenericWorker": 28,
              "../utils": 32
            }
          ],
          13: [
            function(t, i, n) {
              var A = t("readable-stream").Readable;
              function l(c, s, a) {
                A.call(this, s), this._helper = c;
                var r = this;
                c.on("data", function(f, g) {
                  r.push(f) || r._helper.pause(), a && a(g);
                }).on("error", function(f) {
                  r.emit("error", f);
                }).on("end", function() {
                  r.push(null);
                });
              }
              t("../utils").inherits(l, A), l.prototype._read = function() {
                this._helper.resume();
              }, i.exports = l;
            },
            {
              "../utils": 32,
              "readable-stream": 16
            }
          ],
          14: [
            function(t, i, n) {
              i.exports = {
                isNode: typeof Buffer < "u",
                newBufferFrom: function(A, l) {
                  if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(A, l);
                  if (typeof A == "number") throw new Error('The "data" argument must not be a number');
                  return new Buffer(A, l);
                },
                allocBuffer: function(A) {
                  if (Buffer.alloc) return Buffer.alloc(A);
                  var l = new Buffer(A);
                  return l.fill(0), l;
                },
                isBuffer: function(A) {
                  return Buffer.isBuffer(A);
                },
                isStream: function(A) {
                  return A && typeof A.on == "function" && typeof A.pause == "function" && typeof A.resume == "function";
                }
              };
            },
            {}
          ],
          15: [
            function(t, i, n) {
              function A(B, T, R) {
                var G, P = c.getTypeOf(T), I = c.extend(R || {}, r);
                I.date = I.date || /* @__PURE__ */ new Date(), I.compression !== null && (I.compression = I.compression.toUpperCase()), typeof I.unixPermissions == "string" && (I.unixPermissions = parseInt(I.unixPermissions, 8)), I.unixPermissions && 16384 & I.unixPermissions && (I.dir = true), I.dosPermissions && 16 & I.dosPermissions && (I.dir = true), I.dir && (B = v(B)), I.createFolders && (G = y(B)) && b.call(this, G, true);
                var H = P === "string" && I.binary === false && I.base64 === false;
                R && R.binary !== void 0 || (I.binary = !H), (T instanceof f && T.uncompressedSize === 0 || I.dir || !T || T.length === 0) && (I.base64 = false, I.binary = true, T = "", I.compression = "STORE", P = "string");
                var L = null;
                L = T instanceof f || T instanceof s ? T : m.isNode && m.isStream(T) ? new h(B, T) : c.prepareContent(B, T, I.binary, I.optimizedBinaryString, I.base64);
                var E = new g(B, L, I);
                this.files[B] = E;
              }
              var l = t("./utf8"), c = t("./utils"), s = t("./stream/GenericWorker"), a = t("./stream/StreamHelper"), r = t("./defaults"), f = t("./compressedObject"), g = t("./zipObject"), d = t("./generate"), m = t("./nodejsUtils"), h = t("./nodejs/NodejsStreamInputAdapter"), y = function(B) {
                B.slice(-1) === "/" && (B = B.substring(0, B.length - 1));
                var T = B.lastIndexOf("/");
                return 0 < T ? B.substring(0, T) : "";
              }, v = function(B) {
                return B.slice(-1) !== "/" && (B += "/"), B;
              }, b = function(B, T) {
                return T = T !== void 0 ? T : r.createFolders, B = v(B), this.files[B] || A.call(this, B, null, {
                  dir: true,
                  createFolders: T
                }), this.files[B];
              };
              function x(B) {
                return Object.prototype.toString.call(B) === "[object RegExp]";
              }
              var k = {
                load: function() {
                  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                },
                forEach: function(B) {
                  var T, R, G;
                  for (T in this.files) G = this.files[T], (R = T.slice(this.root.length, T.length)) && T.slice(0, this.root.length) === this.root && B(R, G);
                },
                filter: function(B) {
                  var T = [];
                  return this.forEach(function(R, G) {
                    B(R, G) && T.push(G);
                  }), T;
                },
                file: function(B, T, R) {
                  if (arguments.length !== 1) return B = this.root + B, A.call(this, B, T, R), this;
                  if (x(B)) {
                    var G = B;
                    return this.filter(function(I, H) {
                      return !H.dir && G.test(I);
                    });
                  }
                  var P = this.files[this.root + B];
                  return P && !P.dir ? P : null;
                },
                folder: function(B) {
                  if (!B) return this;
                  if (x(B)) return this.filter(function(P, I) {
                    return I.dir && B.test(P);
                  });
                  var T = this.root + B, R = b.call(this, T), G = this.clone();
                  return G.root = R.name, G;
                },
                remove: function(B) {
                  B = this.root + B;
                  var T = this.files[B];
                  if (T || (B.slice(-1) !== "/" && (B += "/"), T = this.files[B]), T && !T.dir) delete this.files[B];
                  else for (var R = this.filter(function(P, I) {
                    return I.name.slice(0, B.length) === B;
                  }), G = 0; G < R.length; G++) delete this.files[R[G].name];
                  return this;
                },
                generate: function() {
                  throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                },
                generateInternalStream: function(B) {
                  var T, R = {};
                  try {
                    if ((R = c.extend(B || {}, {
                      streamFiles: false,
                      compression: "STORE",
                      compressionOptions: null,
                      type: "",
                      platform: "DOS",
                      comment: null,
                      mimeType: "application/zip",
                      encodeFileName: l.utf8encode
                    })).type = R.type.toLowerCase(), R.compression = R.compression.toUpperCase(), R.type === "binarystring" && (R.type = "string"), !R.type) throw new Error("No output type specified.");
                    c.checkSupport(R.type), R.platform !== "darwin" && R.platform !== "freebsd" && R.platform !== "linux" && R.platform !== "sunos" || (R.platform = "UNIX"), R.platform === "win32" && (R.platform = "DOS");
                    var G = R.comment || this.comment || "";
                    T = d.generateWorker(this, R, G);
                  } catch (P) {
                    (T = new s("error")).error(P);
                  }
                  return new a(T, R.type || "string", R.mimeType);
                },
                generateAsync: function(B, T) {
                  return this.generateInternalStream(B).accumulate(T);
                },
                generateNodeStream: function(B, T) {
                  return (B = B || {}).type || (B.type = "nodebuffer"), this.generateInternalStream(B).toNodejsStream(T);
                }
              };
              i.exports = k;
            },
            {
              "./compressedObject": 2,
              "./defaults": 5,
              "./generate": 9,
              "./nodejs/NodejsStreamInputAdapter": 12,
              "./nodejsUtils": 14,
              "./stream/GenericWorker": 28,
              "./stream/StreamHelper": 29,
              "./utf8": 31,
              "./utils": 32,
              "./zipObject": 35
            }
          ],
          16: [
            function(t, i, n) {
              i.exports = t("stream");
            },
            {
              stream: void 0
            }
          ],
          17: [
            function(t, i, n) {
              var A = t("./DataReader");
              function l(c) {
                A.call(this, c);
                for (var s = 0; s < this.data.length; s++) c[s] = 255 & c[s];
              }
              t("../utils").inherits(l, A), l.prototype.byteAt = function(c) {
                return this.data[this.zero + c];
              }, l.prototype.lastIndexOfSignature = function(c) {
                for (var s = c.charCodeAt(0), a = c.charCodeAt(1), r = c.charCodeAt(2), f = c.charCodeAt(3), g = this.length - 4; 0 <= g; --g) if (this.data[g] === s && this.data[g + 1] === a && this.data[g + 2] === r && this.data[g + 3] === f) return g - this.zero;
                return -1;
              }, l.prototype.readAndCheckSignature = function(c) {
                var s = c.charCodeAt(0), a = c.charCodeAt(1), r = c.charCodeAt(2), f = c.charCodeAt(3), g = this.readData(4);
                return s === g[0] && a === g[1] && r === g[2] && f === g[3];
              }, l.prototype.readData = function(c) {
                if (this.checkOffset(c), c === 0) return [];
                var s = this.data.slice(this.zero + this.index, this.zero + this.index + c);
                return this.index += c, s;
              }, i.exports = l;
            },
            {
              "../utils": 32,
              "./DataReader": 18
            }
          ],
          18: [
            function(t, i, n) {
              var A = t("../utils");
              function l(c) {
                this.data = c, this.length = c.length, this.index = 0, this.zero = 0;
              }
              l.prototype = {
                checkOffset: function(c) {
                  this.checkIndex(this.index + c);
                },
                checkIndex: function(c) {
                  if (this.length < this.zero + c || c < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + c + "). Corrupted zip ?");
                },
                setIndex: function(c) {
                  this.checkIndex(c), this.index = c;
                },
                skip: function(c) {
                  this.setIndex(this.index + c);
                },
                byteAt: function() {
                },
                readInt: function(c) {
                  var s, a = 0;
                  for (this.checkOffset(c), s = this.index + c - 1; s >= this.index; s--) a = (a << 8) + this.byteAt(s);
                  return this.index += c, a;
                },
                readString: function(c) {
                  return A.transformTo("string", this.readData(c));
                },
                readData: function() {
                },
                lastIndexOfSignature: function() {
                },
                readAndCheckSignature: function() {
                },
                readDate: function() {
                  var c = this.readInt(4);
                  return new Date(Date.UTC(1980 + (c >> 25 & 127), (c >> 21 & 15) - 1, c >> 16 & 31, c >> 11 & 31, c >> 5 & 63, (31 & c) << 1));
                }
              }, i.exports = l;
            },
            {
              "../utils": 32
            }
          ],
          19: [
            function(t, i, n) {
              var A = t("./Uint8ArrayReader");
              function l(c) {
                A.call(this, c);
              }
              t("../utils").inherits(l, A), l.prototype.readData = function(c) {
                this.checkOffset(c);
                var s = this.data.slice(this.zero + this.index, this.zero + this.index + c);
                return this.index += c, s;
              }, i.exports = l;
            },
            {
              "../utils": 32,
              "./Uint8ArrayReader": 21
            }
          ],
          20: [
            function(t, i, n) {
              var A = t("./DataReader");
              function l(c) {
                A.call(this, c);
              }
              t("../utils").inherits(l, A), l.prototype.byteAt = function(c) {
                return this.data.charCodeAt(this.zero + c);
              }, l.prototype.lastIndexOfSignature = function(c) {
                return this.data.lastIndexOf(c) - this.zero;
              }, l.prototype.readAndCheckSignature = function(c) {
                return c === this.readData(4);
              }, l.prototype.readData = function(c) {
                this.checkOffset(c);
                var s = this.data.slice(this.zero + this.index, this.zero + this.index + c);
                return this.index += c, s;
              }, i.exports = l;
            },
            {
              "../utils": 32,
              "./DataReader": 18
            }
          ],
          21: [
            function(t, i, n) {
              var A = t("./ArrayReader");
              function l(c) {
                A.call(this, c);
              }
              t("../utils").inherits(l, A), l.prototype.readData = function(c) {
                if (this.checkOffset(c), c === 0) return new Uint8Array(0);
                var s = this.data.subarray(this.zero + this.index, this.zero + this.index + c);
                return this.index += c, s;
              }, i.exports = l;
            },
            {
              "../utils": 32,
              "./ArrayReader": 17
            }
          ],
          22: [
            function(t, i, n) {
              var A = t("../utils"), l = t("../support"), c = t("./ArrayReader"), s = t("./StringReader"), a = t("./NodeBufferReader"), r = t("./Uint8ArrayReader");
              i.exports = function(f) {
                var g = A.getTypeOf(f);
                return A.checkSupport(g), g !== "string" || l.uint8array ? g === "nodebuffer" ? new a(f) : l.uint8array ? new r(A.transformTo("uint8array", f)) : new c(A.transformTo("array", f)) : new s(f);
              };
            },
            {
              "../support": 30,
              "../utils": 32,
              "./ArrayReader": 17,
              "./NodeBufferReader": 19,
              "./StringReader": 20,
              "./Uint8ArrayReader": 21
            }
          ],
          23: [
            function(t, i, n) {
              n.LOCAL_FILE_HEADER = "PK", n.CENTRAL_FILE_HEADER = "PK", n.CENTRAL_DIRECTORY_END = "PK", n.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", n.ZIP64_CENTRAL_DIRECTORY_END = "PK", n.DATA_DESCRIPTOR = "PK\x07\b";
            },
            {}
          ],
          24: [
            function(t, i, n) {
              var A = t("./GenericWorker"), l = t("../utils");
              function c(s) {
                A.call(this, "ConvertWorker to " + s), this.destType = s;
              }
              l.inherits(c, A), c.prototype.processChunk = function(s) {
                this.push({
                  data: l.transformTo(this.destType, s.data),
                  meta: s.meta
                });
              }, i.exports = c;
            },
            {
              "../utils": 32,
              "./GenericWorker": 28
            }
          ],
          25: [
            function(t, i, n) {
              var A = t("./GenericWorker"), l = t("../crc32");
              function c() {
                A.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
              }
              t("../utils").inherits(c, A), c.prototype.processChunk = function(s) {
                this.streamInfo.crc32 = l(s.data, this.streamInfo.crc32 || 0), this.push(s);
              }, i.exports = c;
            },
            {
              "../crc32": 4,
              "../utils": 32,
              "./GenericWorker": 28
            }
          ],
          26: [
            function(t, i, n) {
              var A = t("../utils"), l = t("./GenericWorker");
              function c(s) {
                l.call(this, "DataLengthProbe for " + s), this.propName = s, this.withStreamInfo(s, 0);
              }
              A.inherits(c, l), c.prototype.processChunk = function(s) {
                if (s) {
                  var a = this.streamInfo[this.propName] || 0;
                  this.streamInfo[this.propName] = a + s.data.length;
                }
                l.prototype.processChunk.call(this, s);
              }, i.exports = c;
            },
            {
              "../utils": 32,
              "./GenericWorker": 28
            }
          ],
          27: [
            function(t, i, n) {
              var A = t("../utils"), l = t("./GenericWorker");
              function c(s) {
                l.call(this, "DataWorker");
                var a = this;
                this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, s.then(function(r) {
                  a.dataIsReady = true, a.data = r, a.max = r && r.length || 0, a.type = A.getTypeOf(r), a.isPaused || a._tickAndRepeat();
                }, function(r) {
                  a.error(r);
                });
              }
              A.inherits(c, l), c.prototype.cleanUp = function() {
                l.prototype.cleanUp.call(this), this.data = null;
              }, c.prototype.resume = function() {
                return !!l.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, A.delay(this._tickAndRepeat, [], this)), true);
              }, c.prototype._tickAndRepeat = function() {
                this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (A.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
              }, c.prototype._tick = function() {
                if (this.isPaused || this.isFinished) return false;
                var s = null, a = Math.min(this.max, this.index + 16384);
                if (this.index >= this.max) return this.end();
                switch (this.type) {
                  case "string":
                    s = this.data.substring(this.index, a);
                    break;
                  case "uint8array":
                    s = this.data.subarray(this.index, a);
                    break;
                  case "array":
                  case "nodebuffer":
                    s = this.data.slice(this.index, a);
                }
                return this.index = a, this.push({
                  data: s,
                  meta: {
                    percent: this.max ? this.index / this.max * 100 : 0
                  }
                });
              }, i.exports = c;
            },
            {
              "../utils": 32,
              "./GenericWorker": 28
            }
          ],
          28: [
            function(t, i, n) {
              function A(l) {
                this.name = l || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = {
                  data: [],
                  end: [],
                  error: []
                }, this.previous = null;
              }
              A.prototype = {
                push: function(l) {
                  this.emit("data", l);
                },
                end: function() {
                  if (this.isFinished) return false;
                  this.flush();
                  try {
                    this.emit("end"), this.cleanUp(), this.isFinished = true;
                  } catch (l) {
                    this.emit("error", l);
                  }
                  return true;
                },
                error: function(l) {
                  return !this.isFinished && (this.isPaused ? this.generatedError = l : (this.isFinished = true, this.emit("error", l), this.previous && this.previous.error(l), this.cleanUp()), true);
                },
                on: function(l, c) {
                  return this._listeners[l].push(c), this;
                },
                cleanUp: function() {
                  this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
                },
                emit: function(l, c) {
                  if (this._listeners[l]) for (var s = 0; s < this._listeners[l].length; s++) this._listeners[l][s].call(this, c);
                },
                pipe: function(l) {
                  return l.registerPrevious(this);
                },
                registerPrevious: function(l) {
                  if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                  this.streamInfo = l.streamInfo, this.mergeStreamInfo(), this.previous = l;
                  var c = this;
                  return l.on("data", function(s) {
                    c.processChunk(s);
                  }), l.on("end", function() {
                    c.end();
                  }), l.on("error", function(s) {
                    c.error(s);
                  }), this;
                },
                pause: function() {
                  return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
                },
                resume: function() {
                  if (!this.isPaused || this.isFinished) return false;
                  var l = this.isPaused = false;
                  return this.generatedError && (this.error(this.generatedError), l = true), this.previous && this.previous.resume(), !l;
                },
                flush: function() {
                },
                processChunk: function(l) {
                  this.push(l);
                },
                withStreamInfo: function(l, c) {
                  return this.extraStreamInfo[l] = c, this.mergeStreamInfo(), this;
                },
                mergeStreamInfo: function() {
                  for (var l in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, l) && (this.streamInfo[l] = this.extraStreamInfo[l]);
                },
                lock: function() {
                  if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                  this.isLocked = true, this.previous && this.previous.lock();
                },
                toString: function() {
                  var l = "Worker " + this.name;
                  return this.previous ? this.previous + " -> " + l : l;
                }
              }, i.exports = A;
            },
            {}
          ],
          29: [
            function(t, i, n) {
              var A = t("../utils"), l = t("./ConvertWorker"), c = t("./GenericWorker"), s = t("../base64"), a = t("../support"), r = t("../external"), f = null;
              if (a.nodestream) try {
                f = t("../nodejs/NodejsStreamOutputAdapter");
              } catch {
              }
              function g(m, h) {
                return new r.Promise(function(y, v) {
                  var b = [], x = m._internalType, k = m._outputType, B = m._mimeType;
                  m.on("data", function(T, R) {
                    b.push(T), h && h(R);
                  }).on("error", function(T) {
                    b = [], v(T);
                  }).on("end", function() {
                    try {
                      var T = (function(R, G, P) {
                        switch (R) {
                          case "blob":
                            return A.newBlob(A.transformTo("arraybuffer", G), P);
                          case "base64":
                            return s.encode(G);
                          default:
                            return A.transformTo(R, G);
                        }
                      })(k, (function(R, G) {
                        var P, I = 0, H = null, L = 0;
                        for (P = 0; P < G.length; P++) L += G[P].length;
                        switch (R) {
                          case "string":
                            return G.join("");
                          case "array":
                            return Array.prototype.concat.apply([], G);
                          case "uint8array":
                            for (H = new Uint8Array(L), P = 0; P < G.length; P++) H.set(G[P], I), I += G[P].length;
                            return H;
                          case "nodebuffer":
                            return Buffer.concat(G);
                          default:
                            throw new Error("concat : unsupported type '" + R + "'");
                        }
                      })(x, b), B);
                      y(T);
                    } catch (R) {
                      v(R);
                    }
                    b = [];
                  }).resume();
                });
              }
              function d(m, h, y) {
                var v = h;
                switch (h) {
                  case "blob":
                  case "arraybuffer":
                    v = "uint8array";
                    break;
                  case "base64":
                    v = "string";
                }
                try {
                  this._internalType = v, this._outputType = h, this._mimeType = y, A.checkSupport(v), this._worker = m.pipe(new l(v)), m.lock();
                } catch (b) {
                  this._worker = new c("error"), this._worker.error(b);
                }
              }
              d.prototype = {
                accumulate: function(m) {
                  return g(this, m);
                },
                on: function(m, h) {
                  var y = this;
                  return m === "data" ? this._worker.on(m, function(v) {
                    h.call(y, v.data, v.meta);
                  }) : this._worker.on(m, function() {
                    A.delay(h, arguments, y);
                  }), this;
                },
                resume: function() {
                  return A.delay(this._worker.resume, [], this._worker), this;
                },
                pause: function() {
                  return this._worker.pause(), this;
                },
                toNodejsStream: function(m) {
                  if (A.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
                  return new f(this, {
                    objectMode: this._outputType !== "nodebuffer"
                  }, m);
                }
              }, i.exports = d;
            },
            {
              "../base64": 1,
              "../external": 6,
              "../nodejs/NodejsStreamOutputAdapter": 13,
              "../support": 30,
              "../utils": 32,
              "./ConvertWorker": 24,
              "./GenericWorker": 28
            }
          ],
          30: [
            function(t, i, n) {
              if (n.base64 = true, n.array = true, n.string = true, n.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", n.nodebuffer = typeof Buffer < "u", n.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") n.blob = false;
              else {
                var A = new ArrayBuffer(0);
                try {
                  n.blob = new Blob([
                    A
                  ], {
                    type: "application/zip"
                  }).size === 0;
                } catch {
                  try {
                    var l = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                    l.append(A), n.blob = l.getBlob("application/zip").size === 0;
                  } catch {
                    n.blob = false;
                  }
                }
              }
              try {
                n.nodestream = !!t("readable-stream").Readable;
              } catch {
                n.nodestream = false;
              }
            },
            {
              "readable-stream": 16
            }
          ],
          31: [
            function(t, i, n) {
              for (var A = t("./utils"), l = t("./support"), c = t("./nodejsUtils"), s = t("./stream/GenericWorker"), a = new Array(256), r = 0; r < 256; r++) a[r] = 252 <= r ? 6 : 248 <= r ? 5 : 240 <= r ? 4 : 224 <= r ? 3 : 192 <= r ? 2 : 1;
              a[254] = a[254] = 1;
              function f() {
                s.call(this, "utf-8 decode"), this.leftOver = null;
              }
              function g() {
                s.call(this, "utf-8 encode");
              }
              n.utf8encode = function(d) {
                return l.nodebuffer ? c.newBufferFrom(d, "utf-8") : (function(m) {
                  var h, y, v, b, x, k = m.length, B = 0;
                  for (b = 0; b < k; b++) (64512 & (y = m.charCodeAt(b))) == 55296 && b + 1 < k && (64512 & (v = m.charCodeAt(b + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (v - 56320), b++), B += y < 128 ? 1 : y < 2048 ? 2 : y < 65536 ? 3 : 4;
                  for (h = l.uint8array ? new Uint8Array(B) : new Array(B), b = x = 0; x < B; b++) (64512 & (y = m.charCodeAt(b))) == 55296 && b + 1 < k && (64512 & (v = m.charCodeAt(b + 1))) == 56320 && (y = 65536 + (y - 55296 << 10) + (v - 56320), b++), y < 128 ? h[x++] = y : (y < 2048 ? h[x++] = 192 | y >>> 6 : (y < 65536 ? h[x++] = 224 | y >>> 12 : (h[x++] = 240 | y >>> 18, h[x++] = 128 | y >>> 12 & 63), h[x++] = 128 | y >>> 6 & 63), h[x++] = 128 | 63 & y);
                  return h;
                })(d);
              }, n.utf8decode = function(d) {
                return l.nodebuffer ? A.transformTo("nodebuffer", d).toString("utf-8") : (function(m) {
                  var h, y, v, b, x = m.length, k = new Array(2 * x);
                  for (h = y = 0; h < x; ) if ((v = m[h++]) < 128) k[y++] = v;
                  else if (4 < (b = a[v])) k[y++] = 65533, h += b - 1;
                  else {
                    for (v &= b === 2 ? 31 : b === 3 ? 15 : 7; 1 < b && h < x; ) v = v << 6 | 63 & m[h++], b--;
                    1 < b ? k[y++] = 65533 : v < 65536 ? k[y++] = v : (v -= 65536, k[y++] = 55296 | v >> 10 & 1023, k[y++] = 56320 | 1023 & v);
                  }
                  return k.length !== y && (k.subarray ? k = k.subarray(0, y) : k.length = y), A.applyFromCharCode(k);
                })(d = A.transformTo(l.uint8array ? "uint8array" : "array", d));
              }, A.inherits(f, s), f.prototype.processChunk = function(d) {
                var m = A.transformTo(l.uint8array ? "uint8array" : "array", d.data);
                if (this.leftOver && this.leftOver.length) {
                  if (l.uint8array) {
                    var h = m;
                    (m = new Uint8Array(h.length + this.leftOver.length)).set(this.leftOver, 0), m.set(h, this.leftOver.length);
                  } else m = this.leftOver.concat(m);
                  this.leftOver = null;
                }
                var y = (function(b, x) {
                  var k;
                  for ((x = x || b.length) > b.length && (x = b.length), k = x - 1; 0 <= k && (192 & b[k]) == 128; ) k--;
                  return k < 0 || k === 0 ? x : k + a[b[k]] > x ? k : x;
                })(m), v = m;
                y !== m.length && (l.uint8array ? (v = m.subarray(0, y), this.leftOver = m.subarray(y, m.length)) : (v = m.slice(0, y), this.leftOver = m.slice(y, m.length))), this.push({
                  data: n.utf8decode(v),
                  meta: d.meta
                });
              }, f.prototype.flush = function() {
                this.leftOver && this.leftOver.length && (this.push({
                  data: n.utf8decode(this.leftOver),
                  meta: {}
                }), this.leftOver = null);
              }, n.Utf8DecodeWorker = f, A.inherits(g, s), g.prototype.processChunk = function(d) {
                this.push({
                  data: n.utf8encode(d.data),
                  meta: d.meta
                });
              }, n.Utf8EncodeWorker = g;
            },
            {
              "./nodejsUtils": 14,
              "./stream/GenericWorker": 28,
              "./support": 30,
              "./utils": 32
            }
          ],
          32: [
            function(t, i, n) {
              var A = t("./support"), l = t("./base64"), c = t("./nodejsUtils"), s = t("./external");
              function a(h) {
                return h;
              }
              function r(h, y) {
                for (var v = 0; v < h.length; ++v) y[v] = 255 & h.charCodeAt(v);
                return y;
              }
              t("setimmediate"), n.newBlob = function(h, y) {
                n.checkSupport("blob");
                try {
                  return new Blob([
                    h
                  ], {
                    type: y
                  });
                } catch {
                  try {
                    var v = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                    return v.append(h), v.getBlob(y);
                  } catch {
                    throw new Error("Bug : can't construct the Blob.");
                  }
                }
              };
              var f = {
                stringifyByChunk: function(h, y, v) {
                  var b = [], x = 0, k = h.length;
                  if (k <= v) return String.fromCharCode.apply(null, h);
                  for (; x < k; ) y === "array" || y === "nodebuffer" ? b.push(String.fromCharCode.apply(null, h.slice(x, Math.min(x + v, k)))) : b.push(String.fromCharCode.apply(null, h.subarray(x, Math.min(x + v, k)))), x += v;
                  return b.join("");
                },
                stringifyByChar: function(h) {
                  for (var y = "", v = 0; v < h.length; v++) y += String.fromCharCode(h[v]);
                  return y;
                },
                applyCanBeUsed: {
                  uint8array: (function() {
                    try {
                      return A.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
                    } catch {
                      return false;
                    }
                  })(),
                  nodebuffer: (function() {
                    try {
                      return A.nodebuffer && String.fromCharCode.apply(null, c.allocBuffer(1)).length === 1;
                    } catch {
                      return false;
                    }
                  })()
                }
              };
              function g(h) {
                var y = 65536, v = n.getTypeOf(h), b = true;
                if (v === "uint8array" ? b = f.applyCanBeUsed.uint8array : v === "nodebuffer" && (b = f.applyCanBeUsed.nodebuffer), b) for (; 1 < y; ) try {
                  return f.stringifyByChunk(h, v, y);
                } catch {
                  y = Math.floor(y / 2);
                }
                return f.stringifyByChar(h);
              }
              function d(h, y) {
                for (var v = 0; v < h.length; v++) y[v] = h[v];
                return y;
              }
              n.applyFromCharCode = g;
              var m = {};
              m.string = {
                string: a,
                array: function(h) {
                  return r(h, new Array(h.length));
                },
                arraybuffer: function(h) {
                  return m.string.uint8array(h).buffer;
                },
                uint8array: function(h) {
                  return r(h, new Uint8Array(h.length));
                },
                nodebuffer: function(h) {
                  return r(h, c.allocBuffer(h.length));
                }
              }, m.array = {
                string: g,
                array: a,
                arraybuffer: function(h) {
                  return new Uint8Array(h).buffer;
                },
                uint8array: function(h) {
                  return new Uint8Array(h);
                },
                nodebuffer: function(h) {
                  return c.newBufferFrom(h);
                }
              }, m.arraybuffer = {
                string: function(h) {
                  return g(new Uint8Array(h));
                },
                array: function(h) {
                  return d(new Uint8Array(h), new Array(h.byteLength));
                },
                arraybuffer: a,
                uint8array: function(h) {
                  return new Uint8Array(h);
                },
                nodebuffer: function(h) {
                  return c.newBufferFrom(new Uint8Array(h));
                }
              }, m.uint8array = {
                string: g,
                array: function(h) {
                  return d(h, new Array(h.length));
                },
                arraybuffer: function(h) {
                  return h.buffer;
                },
                uint8array: a,
                nodebuffer: function(h) {
                  return c.newBufferFrom(h);
                }
              }, m.nodebuffer = {
                string: g,
                array: function(h) {
                  return d(h, new Array(h.length));
                },
                arraybuffer: function(h) {
                  return m.nodebuffer.uint8array(h).buffer;
                },
                uint8array: function(h) {
                  return d(h, new Uint8Array(h.length));
                },
                nodebuffer: a
              }, n.transformTo = function(h, y) {
                if (y = y || "", !h) return y;
                n.checkSupport(h);
                var v = n.getTypeOf(y);
                return m[v][h](y);
              }, n.resolve = function(h) {
                for (var y = h.split("/"), v = [], b = 0; b < y.length; b++) {
                  var x = y[b];
                  x === "." || x === "" && b !== 0 && b !== y.length - 1 || (x === ".." ? v.pop() : v.push(x));
                }
                return v.join("/");
              }, n.getTypeOf = function(h) {
                return typeof h == "string" ? "string" : Object.prototype.toString.call(h) === "[object Array]" ? "array" : A.nodebuffer && c.isBuffer(h) ? "nodebuffer" : A.uint8array && h instanceof Uint8Array ? "uint8array" : A.arraybuffer && h instanceof ArrayBuffer ? "arraybuffer" : void 0;
              }, n.checkSupport = function(h) {
                if (!A[h.toLowerCase()]) throw new Error(h + " is not supported by this platform");
              }, n.MAX_VALUE_16BITS = 65535, n.MAX_VALUE_32BITS = -1, n.pretty = function(h) {
                var y, v, b = "";
                for (v = 0; v < (h || "").length; v++) b += "\\x" + ((y = h.charCodeAt(v)) < 16 ? "0" : "") + y.toString(16).toUpperCase();
                return b;
              }, n.delay = function(h, y, v) {
                setImmediate(function() {
                  h.apply(v || null, y || []);
                });
              }, n.inherits = function(h, y) {
                function v() {
                }
                v.prototype = y.prototype, h.prototype = new v();
              }, n.extend = function() {
                var h, y, v = {};
                for (h = 0; h < arguments.length; h++) for (y in arguments[h]) Object.prototype.hasOwnProperty.call(arguments[h], y) && v[y] === void 0 && (v[y] = arguments[h][y]);
                return v;
              }, n.prepareContent = function(h, y, v, b, x) {
                return s.Promise.resolve(y).then(function(k) {
                  return A.blob && (k instanceof Blob || [
                    "[object File]",
                    "[object Blob]"
                  ].indexOf(Object.prototype.toString.call(k)) !== -1) && typeof FileReader < "u" ? new s.Promise(function(B, T) {
                    var R = new FileReader();
                    R.onload = function(G) {
                      B(G.target.result);
                    }, R.onerror = function(G) {
                      T(G.target.error);
                    }, R.readAsArrayBuffer(k);
                  }) : k;
                }).then(function(k) {
                  var B = n.getTypeOf(k);
                  return B ? (B === "arraybuffer" ? k = n.transformTo("uint8array", k) : B === "string" && (x ? k = l.decode(k) : v && b !== true && (k = (function(T) {
                    return r(T, A.uint8array ? new Uint8Array(T.length) : new Array(T.length));
                  })(k))), k) : s.Promise.reject(new Error("Can't read the data of '" + h + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                });
              };
            },
            {
              "./base64": 1,
              "./external": 6,
              "./nodejsUtils": 14,
              "./support": 30,
              setimmediate: 54
            }
          ],
          33: [
            function(t, i, n) {
              var A = t("./reader/readerFor"), l = t("./utils"), c = t("./signature"), s = t("./zipEntry"), a = t("./support");
              function r(f) {
                this.files = [], this.loadOptions = f;
              }
              r.prototype = {
                checkSignature: function(f) {
                  if (!this.reader.readAndCheckSignature(f)) {
                    this.reader.index -= 4;
                    var g = this.reader.readString(4);
                    throw new Error("Corrupted zip or bug: unexpected signature (" + l.pretty(g) + ", expected " + l.pretty(f) + ")");
                  }
                },
                isSignature: function(f, g) {
                  var d = this.reader.index;
                  this.reader.setIndex(f);
                  var m = this.reader.readString(4) === g;
                  return this.reader.setIndex(d), m;
                },
                readBlockEndOfCentral: function() {
                  this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
                  var f = this.reader.readData(this.zipCommentLength), g = a.uint8array ? "uint8array" : "array", d = l.transformTo(g, f);
                  this.zipComment = this.loadOptions.decodeFileName(d);
                },
                readBlockZip64EndOfCentral: function() {
                  this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
                  for (var f, g, d, m = this.zip64EndOfCentralSize - 44; 0 < m; ) f = this.reader.readInt(2), g = this.reader.readInt(4), d = this.reader.readData(g), this.zip64ExtensibleData[f] = {
                    id: f,
                    length: g,
                    value: d
                  };
                },
                readBlockZip64EndOfCentralLocator: function() {
                  if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
                },
                readLocalFiles: function() {
                  var f, g;
                  for (f = 0; f < this.files.length; f++) g = this.files[f], this.reader.setIndex(g.localHeaderOffset), this.checkSignature(c.LOCAL_FILE_HEADER), g.readLocalPart(this.reader), g.handleUTF8(), g.processAttributes();
                },
                readCentralDir: function() {
                  var f;
                  for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(c.CENTRAL_FILE_HEADER); ) (f = new s({
                    zip64: this.zip64
                  }, this.loadOptions)).readCentralPart(this.reader), this.files.push(f);
                  if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                },
                readEndOfCentral: function() {
                  var f = this.reader.lastIndexOfSignature(c.CENTRAL_DIRECTORY_END);
                  if (f < 0) throw this.isSignature(0, c.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                  this.reader.setIndex(f);
                  var g = f;
                  if (this.checkSignature(c.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === l.MAX_VALUE_16BITS || this.diskWithCentralDirStart === l.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === l.MAX_VALUE_16BITS || this.centralDirRecords === l.MAX_VALUE_16BITS || this.centralDirSize === l.MAX_VALUE_32BITS || this.centralDirOffset === l.MAX_VALUE_32BITS) {
                    if (this.zip64 = true, (f = this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                    if (this.reader.setIndex(f), this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, c.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(c.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                    this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(c.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                  }
                  var d = this.centralDirOffset + this.centralDirSize;
                  this.zip64 && (d += 20, d += 12 + this.zip64EndOfCentralSize);
                  var m = g - d;
                  if (0 < m) this.isSignature(g, c.CENTRAL_FILE_HEADER) || (this.reader.zero = m);
                  else if (m < 0) throw new Error("Corrupted zip: missing " + Math.abs(m) + " bytes.");
                },
                prepareReader: function(f) {
                  this.reader = A(f);
                },
                load: function(f) {
                  this.prepareReader(f), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
                }
              }, i.exports = r;
            },
            {
              "./reader/readerFor": 22,
              "./signature": 23,
              "./support": 30,
              "./utils": 32,
              "./zipEntry": 34
            }
          ],
          34: [
            function(t, i, n) {
              var A = t("./reader/readerFor"), l = t("./utils"), c = t("./compressedObject"), s = t("./crc32"), a = t("./utf8"), r = t("./compressions"), f = t("./support");
              function g(d, m) {
                this.options = d, this.loadOptions = m;
              }
              g.prototype = {
                isEncrypted: function() {
                  return (1 & this.bitFlag) == 1;
                },
                useUTF8: function() {
                  return (2048 & this.bitFlag) == 2048;
                },
                readLocalPart: function(d) {
                  var m, h;
                  if (d.skip(22), this.fileNameLength = d.readInt(2), h = d.readInt(2), this.fileName = d.readData(this.fileNameLength), d.skip(h), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                  if ((m = (function(y) {
                    for (var v in r) if (Object.prototype.hasOwnProperty.call(r, v) && r[v].magic === y) return r[v];
                    return null;
                  })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + l.pretty(this.compressionMethod) + " unknown (inner file : " + l.transformTo("string", this.fileName) + ")");
                  this.decompressed = new c(this.compressedSize, this.uncompressedSize, this.crc32, m, d.readData(this.compressedSize));
                },
                readCentralPart: function(d) {
                  this.versionMadeBy = d.readInt(2), d.skip(2), this.bitFlag = d.readInt(2), this.compressionMethod = d.readString(2), this.date = d.readDate(), this.crc32 = d.readInt(4), this.compressedSize = d.readInt(4), this.uncompressedSize = d.readInt(4);
                  var m = d.readInt(2);
                  if (this.extraFieldsLength = d.readInt(2), this.fileCommentLength = d.readInt(2), this.diskNumberStart = d.readInt(2), this.internalFileAttributes = d.readInt(2), this.externalFileAttributes = d.readInt(4), this.localHeaderOffset = d.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
                  d.skip(m), this.readExtraFields(d), this.parseZIP64ExtraField(d), this.fileComment = d.readData(this.fileCommentLength);
                },
                processAttributes: function() {
                  this.unixPermissions = null, this.dosPermissions = null;
                  var d = this.versionMadeBy >> 8;
                  this.dir = !!(16 & this.externalFileAttributes), d == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), d == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
                },
                parseZIP64ExtraField: function() {
                  if (this.extraFields[1]) {
                    var d = A(this.extraFields[1].value);
                    this.uncompressedSize === l.MAX_VALUE_32BITS && (this.uncompressedSize = d.readInt(8)), this.compressedSize === l.MAX_VALUE_32BITS && (this.compressedSize = d.readInt(8)), this.localHeaderOffset === l.MAX_VALUE_32BITS && (this.localHeaderOffset = d.readInt(8)), this.diskNumberStart === l.MAX_VALUE_32BITS && (this.diskNumberStart = d.readInt(4));
                  }
                },
                readExtraFields: function(d) {
                  var m, h, y, v = d.index + this.extraFieldsLength;
                  for (this.extraFields || (this.extraFields = {}); d.index + 4 < v; ) m = d.readInt(2), h = d.readInt(2), y = d.readData(h), this.extraFields[m] = {
                    id: m,
                    length: h,
                    value: y
                  };
                  d.setIndex(v);
                },
                handleUTF8: function() {
                  var d = f.uint8array ? "uint8array" : "array";
                  if (this.useUTF8()) this.fileNameStr = a.utf8decode(this.fileName), this.fileCommentStr = a.utf8decode(this.fileComment);
                  else {
                    var m = this.findExtraFieldUnicodePath();
                    if (m !== null) this.fileNameStr = m;
                    else {
                      var h = l.transformTo(d, this.fileName);
                      this.fileNameStr = this.loadOptions.decodeFileName(h);
                    }
                    var y = this.findExtraFieldUnicodeComment();
                    if (y !== null) this.fileCommentStr = y;
                    else {
                      var v = l.transformTo(d, this.fileComment);
                      this.fileCommentStr = this.loadOptions.decodeFileName(v);
                    }
                  }
                },
                findExtraFieldUnicodePath: function() {
                  var d = this.extraFields[28789];
                  if (d) {
                    var m = A(d.value);
                    return m.readInt(1) !== 1 || s(this.fileName) !== m.readInt(4) ? null : a.utf8decode(m.readData(d.length - 5));
                  }
                  return null;
                },
                findExtraFieldUnicodeComment: function() {
                  var d = this.extraFields[25461];
                  if (d) {
                    var m = A(d.value);
                    return m.readInt(1) !== 1 || s(this.fileComment) !== m.readInt(4) ? null : a.utf8decode(m.readData(d.length - 5));
                  }
                  return null;
                }
              }, i.exports = g;
            },
            {
              "./compressedObject": 2,
              "./compressions": 3,
              "./crc32": 4,
              "./reader/readerFor": 22,
              "./support": 30,
              "./utf8": 31,
              "./utils": 32
            }
          ],
          35: [
            function(t, i, n) {
              function A(m, h, y) {
                this.name = m, this.dir = y.dir, this.date = y.date, this.comment = y.comment, this.unixPermissions = y.unixPermissions, this.dosPermissions = y.dosPermissions, this._data = h, this._dataBinary = y.binary, this.options = {
                  compression: y.compression,
                  compressionOptions: y.compressionOptions
                };
              }
              var l = t("./stream/StreamHelper"), c = t("./stream/DataWorker"), s = t("./utf8"), a = t("./compressedObject"), r = t("./stream/GenericWorker");
              A.prototype = {
                internalStream: function(m) {
                  var h = null, y = "string";
                  try {
                    if (!m) throw new Error("No output type specified.");
                    var v = (y = m.toLowerCase()) === "string" || y === "text";
                    y !== "binarystring" && y !== "text" || (y = "string"), h = this._decompressWorker();
                    var b = !this._dataBinary;
                    b && !v && (h = h.pipe(new s.Utf8EncodeWorker())), !b && v && (h = h.pipe(new s.Utf8DecodeWorker()));
                  } catch (x) {
                    (h = new r("error")).error(x);
                  }
                  return new l(h, y, "");
                },
                async: function(m, h) {
                  return this.internalStream(m).accumulate(h);
                },
                nodeStream: function(m, h) {
                  return this.internalStream(m || "nodebuffer").toNodejsStream(h);
                },
                _compressWorker: function(m, h) {
                  if (this._data instanceof a && this._data.compression.magic === m.magic) return this._data.getCompressedWorker();
                  var y = this._decompressWorker();
                  return this._dataBinary || (y = y.pipe(new s.Utf8EncodeWorker())), a.createWorkerFrom(y, m, h);
                },
                _decompressWorker: function() {
                  return this._data instanceof a ? this._data.getContentWorker() : this._data instanceof r ? this._data : new c(this._data);
                }
              };
              for (var f = [
                "asText",
                "asBinary",
                "asNodeBuffer",
                "asUint8Array",
                "asArrayBuffer"
              ], g = function() {
                throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
              }, d = 0; d < f.length; d++) A.prototype[f[d]] = g;
              i.exports = A;
            },
            {
              "./compressedObject": 2,
              "./stream/DataWorker": 27,
              "./stream/GenericWorker": 28,
              "./stream/StreamHelper": 29,
              "./utf8": 31
            }
          ],
          36: [
            function(t, i, n) {
              (function(A) {
                var l, c, s = A.MutationObserver || A.WebKitMutationObserver;
                if (s) {
                  var a = 0, r = new s(m), f = A.document.createTextNode("");
                  r.observe(f, {
                    characterData: true
                  }), l = function() {
                    f.data = a = ++a % 2;
                  };
                } else if (A.setImmediate || A.MessageChannel === void 0) l = "document" in A && "onreadystatechange" in A.document.createElement("script") ? function() {
                  var h = A.document.createElement("script");
                  h.onreadystatechange = function() {
                    m(), h.onreadystatechange = null, h.parentNode.removeChild(h), h = null;
                  }, A.document.documentElement.appendChild(h);
                } : function() {
                  setTimeout(m, 0);
                };
                else {
                  var g = new A.MessageChannel();
                  g.port1.onmessage = m, l = function() {
                    g.port2.postMessage(0);
                  };
                }
                var d = [];
                function m() {
                  var h, y;
                  c = true;
                  for (var v = d.length; v; ) {
                    for (y = d, d = [], h = -1; ++h < v; ) y[h]();
                    v = d.length;
                  }
                  c = false;
                }
                i.exports = function(h) {
                  d.push(h) !== 1 || c || l();
                };
              }).call(this, typeof st < "u" ? st : typeof self < "u" ? self : typeof window < "u" ? window : {});
            },
            {}
          ],
          37: [
            function(t, i, n) {
              var A = t("immediate");
              function l() {
              }
              var c = {}, s = [
                "REJECTED"
              ], a = [
                "FULFILLED"
              ], r = [
                "PENDING"
              ];
              function f(v) {
                if (typeof v != "function") throw new TypeError("resolver must be a function");
                this.state = r, this.queue = [], this.outcome = void 0, v !== l && h(this, v);
              }
              function g(v, b, x) {
                this.promise = v, typeof b == "function" && (this.onFulfilled = b, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
              }
              function d(v, b, x) {
                A(function() {
                  var k;
                  try {
                    k = b(x);
                  } catch (B) {
                    return c.reject(v, B);
                  }
                  k === v ? c.reject(v, new TypeError("Cannot resolve promise with itself")) : c.resolve(v, k);
                });
              }
              function m(v) {
                var b = v && v.then;
                if (v && (typeof v == "object" || typeof v == "function") && typeof b == "function") return function() {
                  b.apply(v, arguments);
                };
              }
              function h(v, b) {
                var x = false;
                function k(R) {
                  x || (x = true, c.reject(v, R));
                }
                function B(R) {
                  x || (x = true, c.resolve(v, R));
                }
                var T = y(function() {
                  b(B, k);
                });
                T.status === "error" && k(T.value);
              }
              function y(v, b) {
                var x = {};
                try {
                  x.value = v(b), x.status = "success";
                } catch (k) {
                  x.status = "error", x.value = k;
                }
                return x;
              }
              (i.exports = f).prototype.finally = function(v) {
                if (typeof v != "function") return this;
                var b = this.constructor;
                return this.then(function(x) {
                  return b.resolve(v()).then(function() {
                    return x;
                  });
                }, function(x) {
                  return b.resolve(v()).then(function() {
                    throw x;
                  });
                });
              }, f.prototype.catch = function(v) {
                return this.then(null, v);
              }, f.prototype.then = function(v, b) {
                if (typeof v != "function" && this.state === a || typeof b != "function" && this.state === s) return this;
                var x = new this.constructor(l);
                return this.state !== r ? d(x, this.state === a ? v : b, this.outcome) : this.queue.push(new g(x, v, b)), x;
              }, g.prototype.callFulfilled = function(v) {
                c.resolve(this.promise, v);
              }, g.prototype.otherCallFulfilled = function(v) {
                d(this.promise, this.onFulfilled, v);
              }, g.prototype.callRejected = function(v) {
                c.reject(this.promise, v);
              }, g.prototype.otherCallRejected = function(v) {
                d(this.promise, this.onRejected, v);
              }, c.resolve = function(v, b) {
                var x = y(m, b);
                if (x.status === "error") return c.reject(v, x.value);
                var k = x.value;
                if (k) h(v, k);
                else {
                  v.state = a, v.outcome = b;
                  for (var B = -1, T = v.queue.length; ++B < T; ) v.queue[B].callFulfilled(b);
                }
                return v;
              }, c.reject = function(v, b) {
                v.state = s, v.outcome = b;
                for (var x = -1, k = v.queue.length; ++x < k; ) v.queue[x].callRejected(b);
                return v;
              }, f.resolve = function(v) {
                return v instanceof this ? v : c.resolve(new this(l), v);
              }, f.reject = function(v) {
                var b = new this(l);
                return c.reject(b, v);
              }, f.all = function(v) {
                var b = this;
                if (Object.prototype.toString.call(v) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                var x = v.length, k = false;
                if (!x) return this.resolve([]);
                for (var B = new Array(x), T = 0, R = -1, G = new this(l); ++R < x; ) P(v[R], R);
                return G;
                function P(I, H) {
                  b.resolve(I).then(function(L) {
                    B[H] = L, ++T !== x || k || (k = true, c.resolve(G, B));
                  }, function(L) {
                    k || (k = true, c.reject(G, L));
                  });
                }
              }, f.race = function(v) {
                var b = this;
                if (Object.prototype.toString.call(v) !== "[object Array]") return this.reject(new TypeError("must be an array"));
                var x = v.length, k = false;
                if (!x) return this.resolve([]);
                for (var B = -1, T = new this(l); ++B < x; ) R = v[B], b.resolve(R).then(function(G) {
                  k || (k = true, c.resolve(T, G));
                }, function(G) {
                  k || (k = true, c.reject(T, G));
                });
                var R;
                return T;
              };
            },
            {
              immediate: 36
            }
          ],
          38: [
            function(t, i, n) {
              var A = {};
              (0, t("./lib/utils/common").assign)(A, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), i.exports = A;
            },
            {
              "./lib/deflate": 39,
              "./lib/inflate": 40,
              "./lib/utils/common": 41,
              "./lib/zlib/constants": 44
            }
          ],
          39: [
            function(t, i, n) {
              var A = t("./zlib/deflate"), l = t("./utils/common"), c = t("./utils/strings"), s = t("./zlib/messages"), a = t("./zlib/zstream"), r = Object.prototype.toString, f = 0, g = -1, d = 0, m = 8;
              function h(v) {
                if (!(this instanceof h)) return new h(v);
                this.options = l.assign({
                  level: g,
                  method: m,
                  chunkSize: 16384,
                  windowBits: 15,
                  memLevel: 8,
                  strategy: d,
                  to: ""
                }, v || {});
                var b = this.options;
                b.raw && 0 < b.windowBits ? b.windowBits = -b.windowBits : b.gzip && 0 < b.windowBits && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new a(), this.strm.avail_out = 0;
                var x = A.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy);
                if (x !== f) throw new Error(s[x]);
                if (b.header && A.deflateSetHeader(this.strm, b.header), b.dictionary) {
                  var k;
                  if (k = typeof b.dictionary == "string" ? c.string2buf(b.dictionary) : r.call(b.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(b.dictionary) : b.dictionary, (x = A.deflateSetDictionary(this.strm, k)) !== f) throw new Error(s[x]);
                  this._dict_set = true;
                }
              }
              function y(v, b) {
                var x = new h(b);
                if (x.push(v, true), x.err) throw x.msg || s[x.err];
                return x.result;
              }
              h.prototype.push = function(v, b) {
                var x, k, B = this.strm, T = this.options.chunkSize;
                if (this.ended) return false;
                k = b === ~~b ? b : b === true ? 4 : 0, typeof v == "string" ? B.input = c.string2buf(v) : r.call(v) === "[object ArrayBuffer]" ? B.input = new Uint8Array(v) : B.input = v, B.next_in = 0, B.avail_in = B.input.length;
                do {
                  if (B.avail_out === 0 && (B.output = new l.Buf8(T), B.next_out = 0, B.avail_out = T), (x = A.deflate(B, k)) !== 1 && x !== f) return this.onEnd(x), !(this.ended = true);
                  B.avail_out !== 0 && (B.avail_in !== 0 || k !== 4 && k !== 2) || (this.options.to === "string" ? this.onData(c.buf2binstring(l.shrinkBuf(B.output, B.next_out))) : this.onData(l.shrinkBuf(B.output, B.next_out)));
                } while ((0 < B.avail_in || B.avail_out === 0) && x !== 1);
                return k === 4 ? (x = A.deflateEnd(this.strm), this.onEnd(x), this.ended = true, x === f) : k !== 2 || (this.onEnd(f), !(B.avail_out = 0));
              }, h.prototype.onData = function(v) {
                this.chunks.push(v);
              }, h.prototype.onEnd = function(v) {
                v === f && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = v, this.msg = this.strm.msg;
              }, n.Deflate = h, n.deflate = y, n.deflateRaw = function(v, b) {
                return (b = b || {}).raw = true, y(v, b);
              }, n.gzip = function(v, b) {
                return (b = b || {}).gzip = true, y(v, b);
              };
            },
            {
              "./utils/common": 41,
              "./utils/strings": 42,
              "./zlib/deflate": 46,
              "./zlib/messages": 51,
              "./zlib/zstream": 53
            }
          ],
          40: [
            function(t, i, n) {
              var A = t("./zlib/inflate"), l = t("./utils/common"), c = t("./utils/strings"), s = t("./zlib/constants"), a = t("./zlib/messages"), r = t("./zlib/zstream"), f = t("./zlib/gzheader"), g = Object.prototype.toString;
              function d(h) {
                if (!(this instanceof d)) return new d(h);
                this.options = l.assign({
                  chunkSize: 16384,
                  windowBits: 0,
                  to: ""
                }, h || {});
                var y = this.options;
                y.raw && 0 <= y.windowBits && y.windowBits < 16 && (y.windowBits = -y.windowBits, y.windowBits === 0 && (y.windowBits = -15)), !(0 <= y.windowBits && y.windowBits < 16) || h && h.windowBits || (y.windowBits += 32), 15 < y.windowBits && y.windowBits < 48 && (15 & y.windowBits) == 0 && (y.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new r(), this.strm.avail_out = 0;
                var v = A.inflateInit2(this.strm, y.windowBits);
                if (v !== s.Z_OK) throw new Error(a[v]);
                this.header = new f(), A.inflateGetHeader(this.strm, this.header);
              }
              function m(h, y) {
                var v = new d(y);
                if (v.push(h, true), v.err) throw v.msg || a[v.err];
                return v.result;
              }
              d.prototype.push = function(h, y) {
                var v, b, x, k, B, T, R = this.strm, G = this.options.chunkSize, P = this.options.dictionary, I = false;
                if (this.ended) return false;
                b = y === ~~y ? y : y === true ? s.Z_FINISH : s.Z_NO_FLUSH, typeof h == "string" ? R.input = c.binstring2buf(h) : g.call(h) === "[object ArrayBuffer]" ? R.input = new Uint8Array(h) : R.input = h, R.next_in = 0, R.avail_in = R.input.length;
                do {
                  if (R.avail_out === 0 && (R.output = new l.Buf8(G), R.next_out = 0, R.avail_out = G), (v = A.inflate(R, s.Z_NO_FLUSH)) === s.Z_NEED_DICT && P && (T = typeof P == "string" ? c.string2buf(P) : g.call(P) === "[object ArrayBuffer]" ? new Uint8Array(P) : P, v = A.inflateSetDictionary(this.strm, T)), v === s.Z_BUF_ERROR && I === true && (v = s.Z_OK, I = false), v !== s.Z_STREAM_END && v !== s.Z_OK) return this.onEnd(v), !(this.ended = true);
                  R.next_out && (R.avail_out !== 0 && v !== s.Z_STREAM_END && (R.avail_in !== 0 || b !== s.Z_FINISH && b !== s.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = c.utf8border(R.output, R.next_out), k = R.next_out - x, B = c.buf2string(R.output, x), R.next_out = k, R.avail_out = G - k, k && l.arraySet(R.output, R.output, x, k, 0), this.onData(B)) : this.onData(l.shrinkBuf(R.output, R.next_out)))), R.avail_in === 0 && R.avail_out === 0 && (I = true);
                } while ((0 < R.avail_in || R.avail_out === 0) && v !== s.Z_STREAM_END);
                return v === s.Z_STREAM_END && (b = s.Z_FINISH), b === s.Z_FINISH ? (v = A.inflateEnd(this.strm), this.onEnd(v), this.ended = true, v === s.Z_OK) : b !== s.Z_SYNC_FLUSH || (this.onEnd(s.Z_OK), !(R.avail_out = 0));
              }, d.prototype.onData = function(h) {
                this.chunks.push(h);
              }, d.prototype.onEnd = function(h) {
                h === s.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = l.flattenChunks(this.chunks)), this.chunks = [], this.err = h, this.msg = this.strm.msg;
              }, n.Inflate = d, n.inflate = m, n.inflateRaw = function(h, y) {
                return (y = y || {}).raw = true, m(h, y);
              }, n.ungzip = m;
            },
            {
              "./utils/common": 41,
              "./utils/strings": 42,
              "./zlib/constants": 44,
              "./zlib/gzheader": 47,
              "./zlib/inflate": 49,
              "./zlib/messages": 51,
              "./zlib/zstream": 53
            }
          ],
          41: [
            function(t, i, n) {
              var A = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
              n.assign = function(s) {
                for (var a = Array.prototype.slice.call(arguments, 1); a.length; ) {
                  var r = a.shift();
                  if (r) {
                    if (typeof r != "object") throw new TypeError(r + "must be non-object");
                    for (var f in r) r.hasOwnProperty(f) && (s[f] = r[f]);
                  }
                }
                return s;
              }, n.shrinkBuf = function(s, a) {
                return s.length === a ? s : s.subarray ? s.subarray(0, a) : (s.length = a, s);
              };
              var l = {
                arraySet: function(s, a, r, f, g) {
                  if (a.subarray && s.subarray) s.set(a.subarray(r, r + f), g);
                  else for (var d = 0; d < f; d++) s[g + d] = a[r + d];
                },
                flattenChunks: function(s) {
                  var a, r, f, g, d, m;
                  for (a = f = 0, r = s.length; a < r; a++) f += s[a].length;
                  for (m = new Uint8Array(f), a = g = 0, r = s.length; a < r; a++) d = s[a], m.set(d, g), g += d.length;
                  return m;
                }
              }, c = {
                arraySet: function(s, a, r, f, g) {
                  for (var d = 0; d < f; d++) s[g + d] = a[r + d];
                },
                flattenChunks: function(s) {
                  return [].concat.apply([], s);
                }
              };
              n.setTyped = function(s) {
                s ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, l)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, c));
              }, n.setTyped(A);
            },
            {}
          ],
          42: [
            function(t, i, n) {
              var A = t("./common"), l = true, c = true;
              try {
                String.fromCharCode.apply(null, [
                  0
                ]);
              } catch {
                l = false;
              }
              try {
                String.fromCharCode.apply(null, new Uint8Array(1));
              } catch {
                c = false;
              }
              for (var s = new A.Buf8(256), a = 0; a < 256; a++) s[a] = 252 <= a ? 6 : 248 <= a ? 5 : 240 <= a ? 4 : 224 <= a ? 3 : 192 <= a ? 2 : 1;
              function r(f, g) {
                if (g < 65537 && (f.subarray && c || !f.subarray && l)) return String.fromCharCode.apply(null, A.shrinkBuf(f, g));
                for (var d = "", m = 0; m < g; m++) d += String.fromCharCode(f[m]);
                return d;
              }
              s[254] = s[254] = 1, n.string2buf = function(f) {
                var g, d, m, h, y, v = f.length, b = 0;
                for (h = 0; h < v; h++) (64512 & (d = f.charCodeAt(h))) == 55296 && h + 1 < v && (64512 & (m = f.charCodeAt(h + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (m - 56320), h++), b += d < 128 ? 1 : d < 2048 ? 2 : d < 65536 ? 3 : 4;
                for (g = new A.Buf8(b), h = y = 0; y < b; h++) (64512 & (d = f.charCodeAt(h))) == 55296 && h + 1 < v && (64512 & (m = f.charCodeAt(h + 1))) == 56320 && (d = 65536 + (d - 55296 << 10) + (m - 56320), h++), d < 128 ? g[y++] = d : (d < 2048 ? g[y++] = 192 | d >>> 6 : (d < 65536 ? g[y++] = 224 | d >>> 12 : (g[y++] = 240 | d >>> 18, g[y++] = 128 | d >>> 12 & 63), g[y++] = 128 | d >>> 6 & 63), g[y++] = 128 | 63 & d);
                return g;
              }, n.buf2binstring = function(f) {
                return r(f, f.length);
              }, n.binstring2buf = function(f) {
                for (var g = new A.Buf8(f.length), d = 0, m = g.length; d < m; d++) g[d] = f.charCodeAt(d);
                return g;
              }, n.buf2string = function(f, g) {
                var d, m, h, y, v = g || f.length, b = new Array(2 * v);
                for (d = m = 0; d < v; ) if ((h = f[d++]) < 128) b[m++] = h;
                else if (4 < (y = s[h])) b[m++] = 65533, d += y - 1;
                else {
                  for (h &= y === 2 ? 31 : y === 3 ? 15 : 7; 1 < y && d < v; ) h = h << 6 | 63 & f[d++], y--;
                  1 < y ? b[m++] = 65533 : h < 65536 ? b[m++] = h : (h -= 65536, b[m++] = 55296 | h >> 10 & 1023, b[m++] = 56320 | 1023 & h);
                }
                return r(b, m);
              }, n.utf8border = function(f, g) {
                var d;
                for ((g = g || f.length) > f.length && (g = f.length), d = g - 1; 0 <= d && (192 & f[d]) == 128; ) d--;
                return d < 0 || d === 0 ? g : d + s[f[d]] > g ? d : g;
              };
            },
            {
              "./common": 41
            }
          ],
          43: [
            function(t, i, n) {
              i.exports = function(A, l, c, s) {
                for (var a = 65535 & A | 0, r = A >>> 16 & 65535 | 0, f = 0; c !== 0; ) {
                  for (c -= f = 2e3 < c ? 2e3 : c; r = r + (a = a + l[s++] | 0) | 0, --f; ) ;
                  a %= 65521, r %= 65521;
                }
                return a | r << 16 | 0;
              };
            },
            {}
          ],
          44: [
            function(t, i, n) {
              i.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
              };
            },
            {}
          ],
          45: [
            function(t, i, n) {
              var A = (function() {
                for (var l, c = [], s = 0; s < 256; s++) {
                  l = s;
                  for (var a = 0; a < 8; a++) l = 1 & l ? 3988292384 ^ l >>> 1 : l >>> 1;
                  c[s] = l;
                }
                return c;
              })();
              i.exports = function(l, c, s, a) {
                var r = A, f = a + s;
                l ^= -1;
                for (var g = a; g < f; g++) l = l >>> 8 ^ r[255 & (l ^ c[g])];
                return -1 ^ l;
              };
            },
            {}
          ],
          46: [
            function(t, i, n) {
              var A, l = t("../utils/common"), c = t("./trees"), s = t("./adler32"), a = t("./crc32"), r = t("./messages"), f = 0, g = 4, d = 0, m = -2, h = -1, y = 4, v = 2, b = 8, x = 9, k = 286, B = 30, T = 19, R = 2 * k + 1, G = 15, P = 3, I = 258, H = I + P + 1, L = 42, E = 113, u = 1, S = 2, Z = 3, M = 4;
              function te(p, U) {
                return p.msg = r[U], U;
              }
              function X(p) {
                return (p << 1) - (4 < p ? 9 : 0);
              }
              function ae(p) {
                for (var U = p.length; 0 <= --U; ) p[U] = 0;
              }
              function N(p) {
                var U = p.state, z = U.pending;
                z > p.avail_out && (z = p.avail_out), z !== 0 && (l.arraySet(p.output, U.pending_buf, U.pending_out, z, p.next_out), p.next_out += z, U.pending_out += z, p.total_out += z, p.avail_out -= z, U.pending -= z, U.pending === 0 && (U.pending_out = 0));
              }
              function F(p, U) {
                c._tr_flush_block(p, 0 <= p.block_start ? p.block_start : -1, p.strstart - p.block_start, U), p.block_start = p.strstart, N(p.strm);
              }
              function K(p, U) {
                p.pending_buf[p.pending++] = U;
              }
              function j(p, U) {
                p.pending_buf[p.pending++] = U >>> 8 & 255, p.pending_buf[p.pending++] = 255 & U;
              }
              function J(p, U) {
                var z, C, w = p.max_chain_length, D = p.strstart, Q = p.prev_length, O = p.nice_match, _ = p.strstart > p.w_size - H ? p.strstart - (p.w_size - H) : 0, V = p.window, $ = p.w_mask, Y = p.prev, ne = p.strstart + I, ye = V[D + Q - 1], ge = V[D + Q];
                p.prev_length >= p.good_match && (w >>= 2), O > p.lookahead && (O = p.lookahead);
                do
                  if (V[(z = U) + Q] === ge && V[z + Q - 1] === ye && V[z] === V[D] && V[++z] === V[D + 1]) {
                    D += 2, z++;
                    do
                      ;
                    while (V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && V[++D] === V[++z] && D < ne);
                    if (C = I - (ne - D), D = ne - I, Q < C) {
                      if (p.match_start = U, O <= (Q = C)) break;
                      ye = V[D + Q - 1], ge = V[D + Q];
                    }
                  }
                while ((U = Y[U & $]) > _ && --w != 0);
                return Q <= p.lookahead ? Q : p.lookahead;
              }
              function le(p) {
                var U, z, C, w, D, Q, O, _, V, $, Y = p.w_size;
                do {
                  if (w = p.window_size - p.lookahead - p.strstart, p.strstart >= Y + (Y - H)) {
                    for (l.arraySet(p.window, p.window, Y, Y, 0), p.match_start -= Y, p.strstart -= Y, p.block_start -= Y, U = z = p.hash_size; C = p.head[--U], p.head[U] = Y <= C ? C - Y : 0, --z; ) ;
                    for (U = z = Y; C = p.prev[--U], p.prev[U] = Y <= C ? C - Y : 0, --z; ) ;
                    w += Y;
                  }
                  if (p.strm.avail_in === 0) break;
                  if (Q = p.strm, O = p.window, _ = p.strstart + p.lookahead, V = w, $ = void 0, $ = Q.avail_in, V < $ && ($ = V), z = $ === 0 ? 0 : (Q.avail_in -= $, l.arraySet(O, Q.input, Q.next_in, $, _), Q.state.wrap === 1 ? Q.adler = s(Q.adler, O, $, _) : Q.state.wrap === 2 && (Q.adler = a(Q.adler, O, $, _)), Q.next_in += $, Q.total_in += $, $), p.lookahead += z, p.lookahead + p.insert >= P) for (D = p.strstart - p.insert, p.ins_h = p.window[D], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[D + 1]) & p.hash_mask; p.insert && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[D + P - 1]) & p.hash_mask, p.prev[D & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = D, D++, p.insert--, !(p.lookahead + p.insert < P)); ) ;
                } while (p.lookahead < H && p.strm.avail_in !== 0);
              }
              function we(p, U) {
                for (var z, C; ; ) {
                  if (p.lookahead < H) {
                    if (le(p), p.lookahead < H && U === f) return u;
                    if (p.lookahead === 0) break;
                  }
                  if (z = 0, p.lookahead >= P && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + P - 1]) & p.hash_mask, z = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), z !== 0 && p.strstart - z <= p.w_size - H && (p.match_length = J(p, z)), p.match_length >= P) if (C = c._tr_tally(p, p.strstart - p.match_start, p.match_length - P), p.lookahead -= p.match_length, p.match_length <= p.max_lazy_match && p.lookahead >= P) {
                    for (p.match_length--; p.strstart++, p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + P - 1]) & p.hash_mask, z = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart, --p.match_length != 0; ) ;
                    p.strstart++;
                  } else p.strstart += p.match_length, p.match_length = 0, p.ins_h = p.window[p.strstart], p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + 1]) & p.hash_mask;
                  else C = c._tr_tally(p, 0, p.window[p.strstart]), p.lookahead--, p.strstart++;
                  if (C && (F(p, false), p.strm.avail_out === 0)) return u;
                }
                return p.insert = p.strstart < P - 1 ? p.strstart : P - 1, U === g ? (F(p, true), p.strm.avail_out === 0 ? Z : M) : p.last_lit && (F(p, false), p.strm.avail_out === 0) ? u : S;
              }
              function fe(p, U) {
                for (var z, C, w; ; ) {
                  if (p.lookahead < H) {
                    if (le(p), p.lookahead < H && U === f) return u;
                    if (p.lookahead === 0) break;
                  }
                  if (z = 0, p.lookahead >= P && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + P - 1]) & p.hash_mask, z = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), p.prev_length = p.match_length, p.prev_match = p.match_start, p.match_length = P - 1, z !== 0 && p.prev_length < p.max_lazy_match && p.strstart - z <= p.w_size - H && (p.match_length = J(p, z), p.match_length <= 5 && (p.strategy === 1 || p.match_length === P && 4096 < p.strstart - p.match_start) && (p.match_length = P - 1)), p.prev_length >= P && p.match_length <= p.prev_length) {
                    for (w = p.strstart + p.lookahead - P, C = c._tr_tally(p, p.strstart - 1 - p.prev_match, p.prev_length - P), p.lookahead -= p.prev_length - 1, p.prev_length -= 2; ++p.strstart <= w && (p.ins_h = (p.ins_h << p.hash_shift ^ p.window[p.strstart + P - 1]) & p.hash_mask, z = p.prev[p.strstart & p.w_mask] = p.head[p.ins_h], p.head[p.ins_h] = p.strstart), --p.prev_length != 0; ) ;
                    if (p.match_available = 0, p.match_length = P - 1, p.strstart++, C && (F(p, false), p.strm.avail_out === 0)) return u;
                  } else if (p.match_available) {
                    if ((C = c._tr_tally(p, 0, p.window[p.strstart - 1])) && F(p, false), p.strstart++, p.lookahead--, p.strm.avail_out === 0) return u;
                  } else p.match_available = 1, p.strstart++, p.lookahead--;
                }
                return p.match_available && (C = c._tr_tally(p, 0, p.window[p.strstart - 1]), p.match_available = 0), p.insert = p.strstart < P - 1 ? p.strstart : P - 1, U === g ? (F(p, true), p.strm.avail_out === 0 ? Z : M) : p.last_lit && (F(p, false), p.strm.avail_out === 0) ? u : S;
              }
              function q(p, U, z, C, w) {
                this.good_length = p, this.max_lazy = U, this.nice_length = z, this.max_chain = C, this.func = w;
              }
              function pe() {
                this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = b, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new l.Buf16(2 * R), this.dyn_dtree = new l.Buf16(2 * (2 * B + 1)), this.bl_tree = new l.Buf16(2 * (2 * T + 1)), ae(this.dyn_ltree), ae(this.dyn_dtree), ae(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new l.Buf16(G + 1), this.heap = new l.Buf16(2 * k + 1), ae(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new l.Buf16(2 * k + 1), ae(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
              }
              function re(p) {
                var U;
                return p && p.state ? (p.total_in = p.total_out = 0, p.data_type = v, (U = p.state).pending = 0, U.pending_out = 0, U.wrap < 0 && (U.wrap = -U.wrap), U.status = U.wrap ? L : E, p.adler = U.wrap === 2 ? 0 : 1, U.last_flush = f, c._tr_init(U), d) : te(p, m);
              }
              function be(p) {
                var U = re(p);
                return U === d && (function(z) {
                  z.window_size = 2 * z.w_size, ae(z.head), z.max_lazy_match = A[z.level].max_lazy, z.good_match = A[z.level].good_length, z.nice_match = A[z.level].nice_length, z.max_chain_length = A[z.level].max_chain, z.strstart = 0, z.block_start = 0, z.lookahead = 0, z.insert = 0, z.match_length = z.prev_length = P - 1, z.match_available = 0, z.ins_h = 0;
                })(p.state), U;
              }
              function ce(p, U, z, C, w, D) {
                if (!p) return m;
                var Q = 1;
                if (U === h && (U = 6), C < 0 ? (Q = 0, C = -C) : 15 < C && (Q = 2, C -= 16), w < 1 || x < w || z !== b || C < 8 || 15 < C || U < 0 || 9 < U || D < 0 || y < D) return te(p, m);
                C === 8 && (C = 9);
                var O = new pe();
                return (p.state = O).strm = p, O.wrap = Q, O.gzhead = null, O.w_bits = C, O.w_size = 1 << O.w_bits, O.w_mask = O.w_size - 1, O.hash_bits = w + 7, O.hash_size = 1 << O.hash_bits, O.hash_mask = O.hash_size - 1, O.hash_shift = ~~((O.hash_bits + P - 1) / P), O.window = new l.Buf8(2 * O.w_size), O.head = new l.Buf16(O.hash_size), O.prev = new l.Buf16(O.w_size), O.lit_bufsize = 1 << w + 6, O.pending_buf_size = 4 * O.lit_bufsize, O.pending_buf = new l.Buf8(O.pending_buf_size), O.d_buf = 1 * O.lit_bufsize, O.l_buf = 3 * O.lit_bufsize, O.level = U, O.strategy = D, O.method = z, be(p);
              }
              A = [
                new q(0, 0, 0, 0, function(p, U) {
                  var z = 65535;
                  for (z > p.pending_buf_size - 5 && (z = p.pending_buf_size - 5); ; ) {
                    if (p.lookahead <= 1) {
                      if (le(p), p.lookahead === 0 && U === f) return u;
                      if (p.lookahead === 0) break;
                    }
                    p.strstart += p.lookahead, p.lookahead = 0;
                    var C = p.block_start + z;
                    if ((p.strstart === 0 || p.strstart >= C) && (p.lookahead = p.strstart - C, p.strstart = C, F(p, false), p.strm.avail_out === 0) || p.strstart - p.block_start >= p.w_size - H && (F(p, false), p.strm.avail_out === 0)) return u;
                  }
                  return p.insert = 0, U === g ? (F(p, true), p.strm.avail_out === 0 ? Z : M) : (p.strstart > p.block_start && (F(p, false), p.strm.avail_out), u);
                }),
                new q(4, 4, 8, 4, we),
                new q(4, 5, 16, 8, we),
                new q(4, 6, 32, 32, we),
                new q(4, 4, 16, 16, fe),
                new q(8, 16, 32, 32, fe),
                new q(8, 16, 128, 128, fe),
                new q(8, 32, 128, 256, fe),
                new q(32, 128, 258, 1024, fe),
                new q(32, 258, 258, 4096, fe)
              ], n.deflateInit = function(p, U) {
                return ce(p, U, b, 15, 8, 0);
              }, n.deflateInit2 = ce, n.deflateReset = be, n.deflateResetKeep = re, n.deflateSetHeader = function(p, U) {
                return p && p.state ? p.state.wrap !== 2 ? m : (p.state.gzhead = U, d) : m;
              }, n.deflate = function(p, U) {
                var z, C, w, D;
                if (!p || !p.state || 5 < U || U < 0) return p ? te(p, m) : m;
                if (C = p.state, !p.output || !p.input && p.avail_in !== 0 || C.status === 666 && U !== g) return te(p, p.avail_out === 0 ? -5 : m);
                if (C.strm = p, z = C.last_flush, C.last_flush = U, C.status === L) if (C.wrap === 2) p.adler = 0, K(C, 31), K(C, 139), K(C, 8), C.gzhead ? (K(C, (C.gzhead.text ? 1 : 0) + (C.gzhead.hcrc ? 2 : 0) + (C.gzhead.extra ? 4 : 0) + (C.gzhead.name ? 8 : 0) + (C.gzhead.comment ? 16 : 0)), K(C, 255 & C.gzhead.time), K(C, C.gzhead.time >> 8 & 255), K(C, C.gzhead.time >> 16 & 255), K(C, C.gzhead.time >> 24 & 255), K(C, C.level === 9 ? 2 : 2 <= C.strategy || C.level < 2 ? 4 : 0), K(C, 255 & C.gzhead.os), C.gzhead.extra && C.gzhead.extra.length && (K(C, 255 & C.gzhead.extra.length), K(C, C.gzhead.extra.length >> 8 & 255)), C.gzhead.hcrc && (p.adler = a(p.adler, C.pending_buf, C.pending, 0)), C.gzindex = 0, C.status = 69) : (K(C, 0), K(C, 0), K(C, 0), K(C, 0), K(C, 0), K(C, C.level === 9 ? 2 : 2 <= C.strategy || C.level < 2 ? 4 : 0), K(C, 3), C.status = E);
                else {
                  var Q = b + (C.w_bits - 8 << 4) << 8;
                  Q |= (2 <= C.strategy || C.level < 2 ? 0 : C.level < 6 ? 1 : C.level === 6 ? 2 : 3) << 6, C.strstart !== 0 && (Q |= 32), Q += 31 - Q % 31, C.status = E, j(C, Q), C.strstart !== 0 && (j(C, p.adler >>> 16), j(C, 65535 & p.adler)), p.adler = 1;
                }
                if (C.status === 69) if (C.gzhead.extra) {
                  for (w = C.pending; C.gzindex < (65535 & C.gzhead.extra.length) && (C.pending !== C.pending_buf_size || (C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), N(p), w = C.pending, C.pending !== C.pending_buf_size)); ) K(C, 255 & C.gzhead.extra[C.gzindex]), C.gzindex++;
                  C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), C.gzindex === C.gzhead.extra.length && (C.gzindex = 0, C.status = 73);
                } else C.status = 73;
                if (C.status === 73) if (C.gzhead.name) {
                  w = C.pending;
                  do {
                    if (C.pending === C.pending_buf_size && (C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), N(p), w = C.pending, C.pending === C.pending_buf_size)) {
                      D = 1;
                      break;
                    }
                    D = C.gzindex < C.gzhead.name.length ? 255 & C.gzhead.name.charCodeAt(C.gzindex++) : 0, K(C, D);
                  } while (D !== 0);
                  C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), D === 0 && (C.gzindex = 0, C.status = 91);
                } else C.status = 91;
                if (C.status === 91) if (C.gzhead.comment) {
                  w = C.pending;
                  do {
                    if (C.pending === C.pending_buf_size && (C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), N(p), w = C.pending, C.pending === C.pending_buf_size)) {
                      D = 1;
                      break;
                    }
                    D = C.gzindex < C.gzhead.comment.length ? 255 & C.gzhead.comment.charCodeAt(C.gzindex++) : 0, K(C, D);
                  } while (D !== 0);
                  C.gzhead.hcrc && C.pending > w && (p.adler = a(p.adler, C.pending_buf, C.pending - w, w)), D === 0 && (C.status = 103);
                } else C.status = 103;
                if (C.status === 103 && (C.gzhead.hcrc ? (C.pending + 2 > C.pending_buf_size && N(p), C.pending + 2 <= C.pending_buf_size && (K(C, 255 & p.adler), K(C, p.adler >> 8 & 255), p.adler = 0, C.status = E)) : C.status = E), C.pending !== 0) {
                  if (N(p), p.avail_out === 0) return C.last_flush = -1, d;
                } else if (p.avail_in === 0 && X(U) <= X(z) && U !== g) return te(p, -5);
                if (C.status === 666 && p.avail_in !== 0) return te(p, -5);
                if (p.avail_in !== 0 || C.lookahead !== 0 || U !== f && C.status !== 666) {
                  var O = C.strategy === 2 ? (function(_, V) {
                    for (var $; ; ) {
                      if (_.lookahead === 0 && (le(_), _.lookahead === 0)) {
                        if (V === f) return u;
                        break;
                      }
                      if (_.match_length = 0, $ = c._tr_tally(_, 0, _.window[_.strstart]), _.lookahead--, _.strstart++, $ && (F(_, false), _.strm.avail_out === 0)) return u;
                    }
                    return _.insert = 0, V === g ? (F(_, true), _.strm.avail_out === 0 ? Z : M) : _.last_lit && (F(_, false), _.strm.avail_out === 0) ? u : S;
                  })(C, U) : C.strategy === 3 ? (function(_, V) {
                    for (var $, Y, ne, ye, ge = _.window; ; ) {
                      if (_.lookahead <= I) {
                        if (le(_), _.lookahead <= I && V === f) return u;
                        if (_.lookahead === 0) break;
                      }
                      if (_.match_length = 0, _.lookahead >= P && 0 < _.strstart && (Y = ge[ne = _.strstart - 1]) === ge[++ne] && Y === ge[++ne] && Y === ge[++ne]) {
                        ye = _.strstart + I;
                        do
                          ;
                        while (Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && Y === ge[++ne] && ne < ye);
                        _.match_length = I - (ye - ne), _.match_length > _.lookahead && (_.match_length = _.lookahead);
                      }
                      if (_.match_length >= P ? ($ = c._tr_tally(_, 1, _.match_length - P), _.lookahead -= _.match_length, _.strstart += _.match_length, _.match_length = 0) : ($ = c._tr_tally(_, 0, _.window[_.strstart]), _.lookahead--, _.strstart++), $ && (F(_, false), _.strm.avail_out === 0)) return u;
                    }
                    return _.insert = 0, V === g ? (F(_, true), _.strm.avail_out === 0 ? Z : M) : _.last_lit && (F(_, false), _.strm.avail_out === 0) ? u : S;
                  })(C, U) : A[C.level].func(C, U);
                  if (O !== Z && O !== M || (C.status = 666), O === u || O === Z) return p.avail_out === 0 && (C.last_flush = -1), d;
                  if (O === S && (U === 1 ? c._tr_align(C) : U !== 5 && (c._tr_stored_block(C, 0, 0, false), U === 3 && (ae(C.head), C.lookahead === 0 && (C.strstart = 0, C.block_start = 0, C.insert = 0))), N(p), p.avail_out === 0)) return C.last_flush = -1, d;
                }
                return U !== g ? d : C.wrap <= 0 ? 1 : (C.wrap === 2 ? (K(C, 255 & p.adler), K(C, p.adler >> 8 & 255), K(C, p.adler >> 16 & 255), K(C, p.adler >> 24 & 255), K(C, 255 & p.total_in), K(C, p.total_in >> 8 & 255), K(C, p.total_in >> 16 & 255), K(C, p.total_in >> 24 & 255)) : (j(C, p.adler >>> 16), j(C, 65535 & p.adler)), N(p), 0 < C.wrap && (C.wrap = -C.wrap), C.pending !== 0 ? d : 1);
              }, n.deflateEnd = function(p) {
                var U;
                return p && p.state ? (U = p.state.status) !== L && U !== 69 && U !== 73 && U !== 91 && U !== 103 && U !== E && U !== 666 ? te(p, m) : (p.state = null, U === E ? te(p, -3) : d) : m;
              }, n.deflateSetDictionary = function(p, U) {
                var z, C, w, D, Q, O, _, V, $ = U.length;
                if (!p || !p.state || (D = (z = p.state).wrap) === 2 || D === 1 && z.status !== L || z.lookahead) return m;
                for (D === 1 && (p.adler = s(p.adler, U, $, 0)), z.wrap = 0, $ >= z.w_size && (D === 0 && (ae(z.head), z.strstart = 0, z.block_start = 0, z.insert = 0), V = new l.Buf8(z.w_size), l.arraySet(V, U, $ - z.w_size, z.w_size, 0), U = V, $ = z.w_size), Q = p.avail_in, O = p.next_in, _ = p.input, p.avail_in = $, p.next_in = 0, p.input = U, le(z); z.lookahead >= P; ) {
                  for (C = z.strstart, w = z.lookahead - (P - 1); z.ins_h = (z.ins_h << z.hash_shift ^ z.window[C + P - 1]) & z.hash_mask, z.prev[C & z.w_mask] = z.head[z.ins_h], z.head[z.ins_h] = C, C++, --w; ) ;
                  z.strstart = C, z.lookahead = P - 1, le(z);
                }
                return z.strstart += z.lookahead, z.block_start = z.strstart, z.insert = z.lookahead, z.lookahead = 0, z.match_length = z.prev_length = P - 1, z.match_available = 0, p.next_in = O, p.input = _, p.avail_in = Q, z.wrap = D, d;
              }, n.deflateInfo = "pako deflate (from Nodeca project)";
            },
            {
              "../utils/common": 41,
              "./adler32": 43,
              "./crc32": 45,
              "./messages": 51,
              "./trees": 52
            }
          ],
          47: [
            function(t, i, n) {
              i.exports = function() {
                this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
              };
            },
            {}
          ],
          48: [
            function(t, i, n) {
              i.exports = function(A, l) {
                var c, s, a, r, f, g, d, m, h, y, v, b, x, k, B, T, R, G, P, I, H, L, E, u, S;
                c = A.state, s = A.next_in, u = A.input, a = s + (A.avail_in - 5), r = A.next_out, S = A.output, f = r - (l - A.avail_out), g = r + (A.avail_out - 257), d = c.dmax, m = c.wsize, h = c.whave, y = c.wnext, v = c.window, b = c.hold, x = c.bits, k = c.lencode, B = c.distcode, T = (1 << c.lenbits) - 1, R = (1 << c.distbits) - 1;
                e: do {
                  x < 15 && (b += u[s++] << x, x += 8, b += u[s++] << x, x += 8), G = k[b & T];
                  t: for (; ; ) {
                    if (b >>>= P = G >>> 24, x -= P, (P = G >>> 16 & 255) === 0) S[r++] = 65535 & G;
                    else {
                      if (!(16 & P)) {
                        if ((64 & P) == 0) {
                          G = k[(65535 & G) + (b & (1 << P) - 1)];
                          continue t;
                        }
                        if (32 & P) {
                          c.mode = 12;
                          break e;
                        }
                        A.msg = "invalid literal/length code", c.mode = 30;
                        break e;
                      }
                      I = 65535 & G, (P &= 15) && (x < P && (b += u[s++] << x, x += 8), I += b & (1 << P) - 1, b >>>= P, x -= P), x < 15 && (b += u[s++] << x, x += 8, b += u[s++] << x, x += 8), G = B[b & R];
                      a: for (; ; ) {
                        if (b >>>= P = G >>> 24, x -= P, !(16 & (P = G >>> 16 & 255))) {
                          if ((64 & P) == 0) {
                            G = B[(65535 & G) + (b & (1 << P) - 1)];
                            continue a;
                          }
                          A.msg = "invalid distance code", c.mode = 30;
                          break e;
                        }
                        if (H = 65535 & G, x < (P &= 15) && (b += u[s++] << x, (x += 8) < P && (b += u[s++] << x, x += 8)), d < (H += b & (1 << P) - 1)) {
                          A.msg = "invalid distance too far back", c.mode = 30;
                          break e;
                        }
                        if (b >>>= P, x -= P, (P = r - f) < H) {
                          if (h < (P = H - P) && c.sane) {
                            A.msg = "invalid distance too far back", c.mode = 30;
                            break e;
                          }
                          if (E = v, (L = 0) === y) {
                            if (L += m - P, P < I) {
                              for (I -= P; S[r++] = v[L++], --P; ) ;
                              L = r - H, E = S;
                            }
                          } else if (y < P) {
                            if (L += m + y - P, (P -= y) < I) {
                              for (I -= P; S[r++] = v[L++], --P; ) ;
                              if (L = 0, y < I) {
                                for (I -= P = y; S[r++] = v[L++], --P; ) ;
                                L = r - H, E = S;
                              }
                            }
                          } else if (L += y - P, P < I) {
                            for (I -= P; S[r++] = v[L++], --P; ) ;
                            L = r - H, E = S;
                          }
                          for (; 2 < I; ) S[r++] = E[L++], S[r++] = E[L++], S[r++] = E[L++], I -= 3;
                          I && (S[r++] = E[L++], 1 < I && (S[r++] = E[L++]));
                        } else {
                          for (L = r - H; S[r++] = S[L++], S[r++] = S[L++], S[r++] = S[L++], 2 < (I -= 3); ) ;
                          I && (S[r++] = S[L++], 1 < I && (S[r++] = S[L++]));
                        }
                        break;
                      }
                    }
                    break;
                  }
                } while (s < a && r < g);
                s -= I = x >> 3, b &= (1 << (x -= I << 3)) - 1, A.next_in = s, A.next_out = r, A.avail_in = s < a ? a - s + 5 : 5 - (s - a), A.avail_out = r < g ? g - r + 257 : 257 - (r - g), c.hold = b, c.bits = x;
              };
            },
            {}
          ],
          49: [
            function(t, i, n) {
              var A = t("../utils/common"), l = t("./adler32"), c = t("./crc32"), s = t("./inffast"), a = t("./inftrees"), r = 1, f = 2, g = 0, d = -2, m = 1, h = 852, y = 592;
              function v(L) {
                return (L >>> 24 & 255) + (L >>> 8 & 65280) + ((65280 & L) << 8) + ((255 & L) << 24);
              }
              function b() {
                this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new A.Buf16(320), this.work = new A.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
              }
              function x(L) {
                var E;
                return L && L.state ? (E = L.state, L.total_in = L.total_out = E.total = 0, L.msg = "", E.wrap && (L.adler = 1 & E.wrap), E.mode = m, E.last = 0, E.havedict = 0, E.dmax = 32768, E.head = null, E.hold = 0, E.bits = 0, E.lencode = E.lendyn = new A.Buf32(h), E.distcode = E.distdyn = new A.Buf32(y), E.sane = 1, E.back = -1, g) : d;
              }
              function k(L) {
                var E;
                return L && L.state ? ((E = L.state).wsize = 0, E.whave = 0, E.wnext = 0, x(L)) : d;
              }
              function B(L, E) {
                var u, S;
                return L && L.state ? (S = L.state, E < 0 ? (u = 0, E = -E) : (u = 1 + (E >> 4), E < 48 && (E &= 15)), E && (E < 8 || 15 < E) ? d : (S.window !== null && S.wbits !== E && (S.window = null), S.wrap = u, S.wbits = E, k(L))) : d;
              }
              function T(L, E) {
                var u, S;
                return L ? (S = new b(), (L.state = S).window = null, (u = B(L, E)) !== g && (L.state = null), u) : d;
              }
              var R, G, P = true;
              function I(L) {
                if (P) {
                  var E;
                  for (R = new A.Buf32(512), G = new A.Buf32(32), E = 0; E < 144; ) L.lens[E++] = 8;
                  for (; E < 256; ) L.lens[E++] = 9;
                  for (; E < 280; ) L.lens[E++] = 7;
                  for (; E < 288; ) L.lens[E++] = 8;
                  for (a(r, L.lens, 0, 288, R, 0, L.work, {
                    bits: 9
                  }), E = 0; E < 32; ) L.lens[E++] = 5;
                  a(f, L.lens, 0, 32, G, 0, L.work, {
                    bits: 5
                  }), P = false;
                }
                L.lencode = R, L.lenbits = 9, L.distcode = G, L.distbits = 5;
              }
              function H(L, E, u, S) {
                var Z, M = L.state;
                return M.window === null && (M.wsize = 1 << M.wbits, M.wnext = 0, M.whave = 0, M.window = new A.Buf8(M.wsize)), S >= M.wsize ? (A.arraySet(M.window, E, u - M.wsize, M.wsize, 0), M.wnext = 0, M.whave = M.wsize) : (S < (Z = M.wsize - M.wnext) && (Z = S), A.arraySet(M.window, E, u - S, Z, M.wnext), (S -= Z) ? (A.arraySet(M.window, E, u - S, S, 0), M.wnext = S, M.whave = M.wsize) : (M.wnext += Z, M.wnext === M.wsize && (M.wnext = 0), M.whave < M.wsize && (M.whave += Z))), 0;
              }
              n.inflateReset = k, n.inflateReset2 = B, n.inflateResetKeep = x, n.inflateInit = function(L) {
                return T(L, 15);
              }, n.inflateInit2 = T, n.inflate = function(L, E) {
                var u, S, Z, M, te, X, ae, N, F, K, j, J, le, we, fe, q, pe, re, be, ce, p, U, z, C, w = 0, D = new A.Buf8(4), Q = [
                  16,
                  17,
                  18,
                  0,
                  8,
                  7,
                  9,
                  6,
                  10,
                  5,
                  11,
                  4,
                  12,
                  3,
                  13,
                  2,
                  14,
                  1,
                  15
                ];
                if (!L || !L.state || !L.output || !L.input && L.avail_in !== 0) return d;
                (u = L.state).mode === 12 && (u.mode = 13), te = L.next_out, Z = L.output, ae = L.avail_out, M = L.next_in, S = L.input, X = L.avail_in, N = u.hold, F = u.bits, K = X, j = ae, U = g;
                e: for (; ; ) switch (u.mode) {
                  case m:
                    if (u.wrap === 0) {
                      u.mode = 13;
                      break;
                    }
                    for (; F < 16; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if (2 & u.wrap && N === 35615) {
                      D[u.check = 0] = 255 & N, D[1] = N >>> 8 & 255, u.check = c(u.check, D, 2, 0), F = N = 0, u.mode = 2;
                      break;
                    }
                    if (u.flags = 0, u.head && (u.head.done = false), !(1 & u.wrap) || (((255 & N) << 8) + (N >> 8)) % 31) {
                      L.msg = "incorrect header check", u.mode = 30;
                      break;
                    }
                    if ((15 & N) != 8) {
                      L.msg = "unknown compression method", u.mode = 30;
                      break;
                    }
                    if (F -= 4, p = 8 + (15 & (N >>>= 4)), u.wbits === 0) u.wbits = p;
                    else if (p > u.wbits) {
                      L.msg = "invalid window size", u.mode = 30;
                      break;
                    }
                    u.dmax = 1 << p, L.adler = u.check = 1, u.mode = 512 & N ? 10 : 12, F = N = 0;
                    break;
                  case 2:
                    for (; F < 16; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if (u.flags = N, (255 & u.flags) != 8) {
                      L.msg = "unknown compression method", u.mode = 30;
                      break;
                    }
                    if (57344 & u.flags) {
                      L.msg = "unknown header flags set", u.mode = 30;
                      break;
                    }
                    u.head && (u.head.text = N >> 8 & 1), 512 & u.flags && (D[0] = 255 & N, D[1] = N >>> 8 & 255, u.check = c(u.check, D, 2, 0)), F = N = 0, u.mode = 3;
                  case 3:
                    for (; F < 32; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    u.head && (u.head.time = N), 512 & u.flags && (D[0] = 255 & N, D[1] = N >>> 8 & 255, D[2] = N >>> 16 & 255, D[3] = N >>> 24 & 255, u.check = c(u.check, D, 4, 0)), F = N = 0, u.mode = 4;
                  case 4:
                    for (; F < 16; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    u.head && (u.head.xflags = 255 & N, u.head.os = N >> 8), 512 & u.flags && (D[0] = 255 & N, D[1] = N >>> 8 & 255, u.check = c(u.check, D, 2, 0)), F = N = 0, u.mode = 5;
                  case 5:
                    if (1024 & u.flags) {
                      for (; F < 16; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      u.length = N, u.head && (u.head.extra_len = N), 512 & u.flags && (D[0] = 255 & N, D[1] = N >>> 8 & 255, u.check = c(u.check, D, 2, 0)), F = N = 0;
                    } else u.head && (u.head.extra = null);
                    u.mode = 6;
                  case 6:
                    if (1024 & u.flags && (X < (J = u.length) && (J = X), J && (u.head && (p = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), A.arraySet(u.head.extra, S, M, J, p)), 512 & u.flags && (u.check = c(u.check, S, J, M)), X -= J, M += J, u.length -= J), u.length)) break e;
                    u.length = 0, u.mode = 7;
                  case 7:
                    if (2048 & u.flags) {
                      if (X === 0) break e;
                      for (J = 0; p = S[M + J++], u.head && p && u.length < 65536 && (u.head.name += String.fromCharCode(p)), p && J < X; ) ;
                      if (512 & u.flags && (u.check = c(u.check, S, J, M)), X -= J, M += J, p) break e;
                    } else u.head && (u.head.name = null);
                    u.length = 0, u.mode = 8;
                  case 8:
                    if (4096 & u.flags) {
                      if (X === 0) break e;
                      for (J = 0; p = S[M + J++], u.head && p && u.length < 65536 && (u.head.comment += String.fromCharCode(p)), p && J < X; ) ;
                      if (512 & u.flags && (u.check = c(u.check, S, J, M)), X -= J, M += J, p) break e;
                    } else u.head && (u.head.comment = null);
                    u.mode = 9;
                  case 9:
                    if (512 & u.flags) {
                      for (; F < 16; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      if (N !== (65535 & u.check)) {
                        L.msg = "header crc mismatch", u.mode = 30;
                        break;
                      }
                      F = N = 0;
                    }
                    u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = true), L.adler = u.check = 0, u.mode = 12;
                    break;
                  case 10:
                    for (; F < 32; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    L.adler = u.check = v(N), F = N = 0, u.mode = 11;
                  case 11:
                    if (u.havedict === 0) return L.next_out = te, L.avail_out = ae, L.next_in = M, L.avail_in = X, u.hold = N, u.bits = F, 2;
                    L.adler = u.check = 1, u.mode = 12;
                  case 12:
                    if (E === 5 || E === 6) break e;
                  case 13:
                    if (u.last) {
                      N >>>= 7 & F, F -= 7 & F, u.mode = 27;
                      break;
                    }
                    for (; F < 3; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    switch (u.last = 1 & N, F -= 1, 3 & (N >>>= 1)) {
                      case 0:
                        u.mode = 14;
                        break;
                      case 1:
                        if (I(u), u.mode = 20, E !== 6) break;
                        N >>>= 2, F -= 2;
                        break e;
                      case 2:
                        u.mode = 17;
                        break;
                      case 3:
                        L.msg = "invalid block type", u.mode = 30;
                    }
                    N >>>= 2, F -= 2;
                    break;
                  case 14:
                    for (N >>>= 7 & F, F -= 7 & F; F < 32; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if ((65535 & N) != (N >>> 16 ^ 65535)) {
                      L.msg = "invalid stored block lengths", u.mode = 30;
                      break;
                    }
                    if (u.length = 65535 & N, F = N = 0, u.mode = 15, E === 6) break e;
                  case 15:
                    u.mode = 16;
                  case 16:
                    if (J = u.length) {
                      if (X < J && (J = X), ae < J && (J = ae), J === 0) break e;
                      A.arraySet(Z, S, M, J, te), X -= J, M += J, ae -= J, te += J, u.length -= J;
                      break;
                    }
                    u.mode = 12;
                    break;
                  case 17:
                    for (; F < 14; ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if (u.nlen = 257 + (31 & N), N >>>= 5, F -= 5, u.ndist = 1 + (31 & N), N >>>= 5, F -= 5, u.ncode = 4 + (15 & N), N >>>= 4, F -= 4, 286 < u.nlen || 30 < u.ndist) {
                      L.msg = "too many length or distance symbols", u.mode = 30;
                      break;
                    }
                    u.have = 0, u.mode = 18;
                  case 18:
                    for (; u.have < u.ncode; ) {
                      for (; F < 3; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      u.lens[Q[u.have++]] = 7 & N, N >>>= 3, F -= 3;
                    }
                    for (; u.have < 19; ) u.lens[Q[u.have++]] = 0;
                    if (u.lencode = u.lendyn, u.lenbits = 7, z = {
                      bits: u.lenbits
                    }, U = a(0, u.lens, 0, 19, u.lencode, 0, u.work, z), u.lenbits = z.bits, U) {
                      L.msg = "invalid code lengths set", u.mode = 30;
                      break;
                    }
                    u.have = 0, u.mode = 19;
                  case 19:
                    for (; u.have < u.nlen + u.ndist; ) {
                      for (; q = (w = u.lencode[N & (1 << u.lenbits) - 1]) >>> 16 & 255, pe = 65535 & w, !((fe = w >>> 24) <= F); ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      if (pe < 16) N >>>= fe, F -= fe, u.lens[u.have++] = pe;
                      else {
                        if (pe === 16) {
                          for (C = fe + 2; F < C; ) {
                            if (X === 0) break e;
                            X--, N += S[M++] << F, F += 8;
                          }
                          if (N >>>= fe, F -= fe, u.have === 0) {
                            L.msg = "invalid bit length repeat", u.mode = 30;
                            break;
                          }
                          p = u.lens[u.have - 1], J = 3 + (3 & N), N >>>= 2, F -= 2;
                        } else if (pe === 17) {
                          for (C = fe + 3; F < C; ) {
                            if (X === 0) break e;
                            X--, N += S[M++] << F, F += 8;
                          }
                          F -= fe, p = 0, J = 3 + (7 & (N >>>= fe)), N >>>= 3, F -= 3;
                        } else {
                          for (C = fe + 7; F < C; ) {
                            if (X === 0) break e;
                            X--, N += S[M++] << F, F += 8;
                          }
                          F -= fe, p = 0, J = 11 + (127 & (N >>>= fe)), N >>>= 7, F -= 7;
                        }
                        if (u.have + J > u.nlen + u.ndist) {
                          L.msg = "invalid bit length repeat", u.mode = 30;
                          break;
                        }
                        for (; J--; ) u.lens[u.have++] = p;
                      }
                    }
                    if (u.mode === 30) break;
                    if (u.lens[256] === 0) {
                      L.msg = "invalid code -- missing end-of-block", u.mode = 30;
                      break;
                    }
                    if (u.lenbits = 9, z = {
                      bits: u.lenbits
                    }, U = a(r, u.lens, 0, u.nlen, u.lencode, 0, u.work, z), u.lenbits = z.bits, U) {
                      L.msg = "invalid literal/lengths set", u.mode = 30;
                      break;
                    }
                    if (u.distbits = 6, u.distcode = u.distdyn, z = {
                      bits: u.distbits
                    }, U = a(f, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, z), u.distbits = z.bits, U) {
                      L.msg = "invalid distances set", u.mode = 30;
                      break;
                    }
                    if (u.mode = 20, E === 6) break e;
                  case 20:
                    u.mode = 21;
                  case 21:
                    if (6 <= X && 258 <= ae) {
                      L.next_out = te, L.avail_out = ae, L.next_in = M, L.avail_in = X, u.hold = N, u.bits = F, s(L, j), te = L.next_out, Z = L.output, ae = L.avail_out, M = L.next_in, S = L.input, X = L.avail_in, N = u.hold, F = u.bits, u.mode === 12 && (u.back = -1);
                      break;
                    }
                    for (u.back = 0; q = (w = u.lencode[N & (1 << u.lenbits) - 1]) >>> 16 & 255, pe = 65535 & w, !((fe = w >>> 24) <= F); ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if (q && (240 & q) == 0) {
                      for (re = fe, be = q, ce = pe; q = (w = u.lencode[ce + ((N & (1 << re + be) - 1) >> re)]) >>> 16 & 255, pe = 65535 & w, !(re + (fe = w >>> 24) <= F); ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      N >>>= re, F -= re, u.back += re;
                    }
                    if (N >>>= fe, F -= fe, u.back += fe, u.length = pe, q === 0) {
                      u.mode = 26;
                      break;
                    }
                    if (32 & q) {
                      u.back = -1, u.mode = 12;
                      break;
                    }
                    if (64 & q) {
                      L.msg = "invalid literal/length code", u.mode = 30;
                      break;
                    }
                    u.extra = 15 & q, u.mode = 22;
                  case 22:
                    if (u.extra) {
                      for (C = u.extra; F < C; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      u.length += N & (1 << u.extra) - 1, N >>>= u.extra, F -= u.extra, u.back += u.extra;
                    }
                    u.was = u.length, u.mode = 23;
                  case 23:
                    for (; q = (w = u.distcode[N & (1 << u.distbits) - 1]) >>> 16 & 255, pe = 65535 & w, !((fe = w >>> 24) <= F); ) {
                      if (X === 0) break e;
                      X--, N += S[M++] << F, F += 8;
                    }
                    if ((240 & q) == 0) {
                      for (re = fe, be = q, ce = pe; q = (w = u.distcode[ce + ((N & (1 << re + be) - 1) >> re)]) >>> 16 & 255, pe = 65535 & w, !(re + (fe = w >>> 24) <= F); ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      N >>>= re, F -= re, u.back += re;
                    }
                    if (N >>>= fe, F -= fe, u.back += fe, 64 & q) {
                      L.msg = "invalid distance code", u.mode = 30;
                      break;
                    }
                    u.offset = pe, u.extra = 15 & q, u.mode = 24;
                  case 24:
                    if (u.extra) {
                      for (C = u.extra; F < C; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      u.offset += N & (1 << u.extra) - 1, N >>>= u.extra, F -= u.extra, u.back += u.extra;
                    }
                    if (u.offset > u.dmax) {
                      L.msg = "invalid distance too far back", u.mode = 30;
                      break;
                    }
                    u.mode = 25;
                  case 25:
                    if (ae === 0) break e;
                    if (J = j - ae, u.offset > J) {
                      if ((J = u.offset - J) > u.whave && u.sane) {
                        L.msg = "invalid distance too far back", u.mode = 30;
                        break;
                      }
                      le = J > u.wnext ? (J -= u.wnext, u.wsize - J) : u.wnext - J, J > u.length && (J = u.length), we = u.window;
                    } else we = Z, le = te - u.offset, J = u.length;
                    for (ae < J && (J = ae), ae -= J, u.length -= J; Z[te++] = we[le++], --J; ) ;
                    u.length === 0 && (u.mode = 21);
                    break;
                  case 26:
                    if (ae === 0) break e;
                    Z[te++] = u.length, ae--, u.mode = 21;
                    break;
                  case 27:
                    if (u.wrap) {
                      for (; F < 32; ) {
                        if (X === 0) break e;
                        X--, N |= S[M++] << F, F += 8;
                      }
                      if (j -= ae, L.total_out += j, u.total += j, j && (L.adler = u.check = u.flags ? c(u.check, Z, j, te - j) : l(u.check, Z, j, te - j)), j = ae, (u.flags ? N : v(N)) !== u.check) {
                        L.msg = "incorrect data check", u.mode = 30;
                        break;
                      }
                      F = N = 0;
                    }
                    u.mode = 28;
                  case 28:
                    if (u.wrap && u.flags) {
                      for (; F < 32; ) {
                        if (X === 0) break e;
                        X--, N += S[M++] << F, F += 8;
                      }
                      if (N !== (4294967295 & u.total)) {
                        L.msg = "incorrect length check", u.mode = 30;
                        break;
                      }
                      F = N = 0;
                    }
                    u.mode = 29;
                  case 29:
                    U = 1;
                    break e;
                  case 30:
                    U = -3;
                    break e;
                  case 31:
                    return -4;
                  case 32:
                  default:
                    return d;
                }
                return L.next_out = te, L.avail_out = ae, L.next_in = M, L.avail_in = X, u.hold = N, u.bits = F, (u.wsize || j !== L.avail_out && u.mode < 30 && (u.mode < 27 || E !== 4)) && H(L, L.output, L.next_out, j - L.avail_out) ? (u.mode = 31, -4) : (K -= L.avail_in, j -= L.avail_out, L.total_in += K, L.total_out += j, u.total += j, u.wrap && j && (L.adler = u.check = u.flags ? c(u.check, Z, j, L.next_out - j) : l(u.check, Z, j, L.next_out - j)), L.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === 12 ? 128 : 0) + (u.mode === 20 || u.mode === 15 ? 256 : 0), (K == 0 && j === 0 || E === 4) && U === g && (U = -5), U);
              }, n.inflateEnd = function(L) {
                if (!L || !L.state) return d;
                var E = L.state;
                return E.window && (E.window = null), L.state = null, g;
              }, n.inflateGetHeader = function(L, E) {
                var u;
                return L && L.state ? (2 & (u = L.state).wrap) == 0 ? d : ((u.head = E).done = false, g) : d;
              }, n.inflateSetDictionary = function(L, E) {
                var u, S = E.length;
                return L && L.state ? (u = L.state).wrap !== 0 && u.mode !== 11 ? d : u.mode === 11 && l(1, E, S, 0) !== u.check ? -3 : H(L, E, S, S) ? (u.mode = 31, -4) : (u.havedict = 1, g) : d;
              }, n.inflateInfo = "pako inflate (from Nodeca project)";
            },
            {
              "../utils/common": 41,
              "./adler32": 43,
              "./crc32": 45,
              "./inffast": 48,
              "./inftrees": 50
            }
          ],
          50: [
            function(t, i, n) {
              var A = t("../utils/common"), l = [
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                13,
                15,
                17,
                19,
                23,
                27,
                31,
                35,
                43,
                51,
                59,
                67,
                83,
                99,
                115,
                131,
                163,
                195,
                227,
                258,
                0,
                0
              ], c = [
                16,
                16,
                16,
                16,
                16,
                16,
                16,
                16,
                17,
                17,
                17,
                17,
                18,
                18,
                18,
                18,
                19,
                19,
                19,
                19,
                20,
                20,
                20,
                20,
                21,
                21,
                21,
                21,
                16,
                72,
                78
              ], s = [
                1,
                2,
                3,
                4,
                5,
                7,
                9,
                13,
                17,
                25,
                33,
                49,
                65,
                97,
                129,
                193,
                257,
                385,
                513,
                769,
                1025,
                1537,
                2049,
                3073,
                4097,
                6145,
                8193,
                12289,
                16385,
                24577,
                0,
                0
              ], a = [
                16,
                16,
                16,
                16,
                17,
                17,
                18,
                18,
                19,
                19,
                20,
                20,
                21,
                21,
                22,
                22,
                23,
                23,
                24,
                24,
                25,
                25,
                26,
                26,
                27,
                27,
                28,
                28,
                29,
                29,
                64,
                64
              ];
              i.exports = function(r, f, g, d, m, h, y, v) {
                var b, x, k, B, T, R, G, P, I, H = v.bits, L = 0, E = 0, u = 0, S = 0, Z = 0, M = 0, te = 0, X = 0, ae = 0, N = 0, F = null, K = 0, j = new A.Buf16(16), J = new A.Buf16(16), le = null, we = 0;
                for (L = 0; L <= 15; L++) j[L] = 0;
                for (E = 0; E < d; E++) j[f[g + E]]++;
                for (Z = H, S = 15; 1 <= S && j[S] === 0; S--) ;
                if (S < Z && (Z = S), S === 0) return m[h++] = 20971520, m[h++] = 20971520, v.bits = 1, 0;
                for (u = 1; u < S && j[u] === 0; u++) ;
                for (Z < u && (Z = u), L = X = 1; L <= 15; L++) if (X <<= 1, (X -= j[L]) < 0) return -1;
                if (0 < X && (r === 0 || S !== 1)) return -1;
                for (J[1] = 0, L = 1; L < 15; L++) J[L + 1] = J[L] + j[L];
                for (E = 0; E < d; E++) f[g + E] !== 0 && (y[J[f[g + E]]++] = E);
                if (R = r === 0 ? (F = le = y, 19) : r === 1 ? (F = l, K -= 257, le = c, we -= 257, 256) : (F = s, le = a, -1), L = u, T = h, te = E = N = 0, k = -1, B = (ae = 1 << (M = Z)) - 1, r === 1 && 852 < ae || r === 2 && 592 < ae) return 1;
                for (; ; ) {
                  for (G = L - te, I = y[E] < R ? (P = 0, y[E]) : y[E] > R ? (P = le[we + y[E]], F[K + y[E]]) : (P = 96, 0), b = 1 << L - te, u = x = 1 << M; m[T + (N >> te) + (x -= b)] = G << 24 | P << 16 | I | 0, x !== 0; ) ;
                  for (b = 1 << L - 1; N & b; ) b >>= 1;
                  if (b !== 0 ? (N &= b - 1, N += b) : N = 0, E++, --j[L] == 0) {
                    if (L === S) break;
                    L = f[g + y[E]];
                  }
                  if (Z < L && (N & B) !== k) {
                    for (te === 0 && (te = Z), T += u, X = 1 << (M = L - te); M + te < S && !((X -= j[M + te]) <= 0); ) M++, X <<= 1;
                    if (ae += 1 << M, r === 1 && 852 < ae || r === 2 && 592 < ae) return 1;
                    m[k = N & B] = Z << 24 | M << 16 | T - h | 0;
                  }
                }
                return N !== 0 && (m[T + N] = L - te << 24 | 64 << 16 | 0), v.bits = Z, 0;
              };
            },
            {
              "../utils/common": 41
            }
          ],
          51: [
            function(t, i, n) {
              i.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
              };
            },
            {}
          ],
          52: [
            function(t, i, n) {
              var A = t("../utils/common"), l = 0, c = 1;
              function s(w) {
                for (var D = w.length; 0 <= --D; ) w[D] = 0;
              }
              var a = 0, r = 29, f = 256, g = f + 1 + r, d = 30, m = 19, h = 2 * g + 1, y = 15, v = 16, b = 7, x = 256, k = 16, B = 17, T = 18, R = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                1,
                1,
                1,
                2,
                2,
                2,
                2,
                3,
                3,
                3,
                3,
                4,
                4,
                4,
                4,
                5,
                5,
                5,
                5,
                0
              ], G = [
                0,
                0,
                0,
                0,
                1,
                1,
                2,
                2,
                3,
                3,
                4,
                4,
                5,
                5,
                6,
                6,
                7,
                7,
                8,
                8,
                9,
                9,
                10,
                10,
                11,
                11,
                12,
                12,
                13,
                13
              ], P = [
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                2,
                3,
                7
              ], I = [
                16,
                17,
                18,
                0,
                8,
                7,
                9,
                6,
                10,
                5,
                11,
                4,
                12,
                3,
                13,
                2,
                14,
                1,
                15
              ], H = new Array(2 * (g + 2));
              s(H);
              var L = new Array(2 * d);
              s(L);
              var E = new Array(512);
              s(E);
              var u = new Array(256);
              s(u);
              var S = new Array(r);
              s(S);
              var Z, M, te, X = new Array(d);
              function ae(w, D, Q, O, _) {
                this.static_tree = w, this.extra_bits = D, this.extra_base = Q, this.elems = O, this.max_length = _, this.has_stree = w && w.length;
              }
              function N(w, D) {
                this.dyn_tree = w, this.max_code = 0, this.stat_desc = D;
              }
              function F(w) {
                return w < 256 ? E[w] : E[256 + (w >>> 7)];
              }
              function K(w, D) {
                w.pending_buf[w.pending++] = 255 & D, w.pending_buf[w.pending++] = D >>> 8 & 255;
              }
              function j(w, D, Q) {
                w.bi_valid > v - Q ? (w.bi_buf |= D << w.bi_valid & 65535, K(w, w.bi_buf), w.bi_buf = D >> v - w.bi_valid, w.bi_valid += Q - v) : (w.bi_buf |= D << w.bi_valid & 65535, w.bi_valid += Q);
              }
              function J(w, D, Q) {
                j(w, Q[2 * D], Q[2 * D + 1]);
              }
              function le(w, D) {
                for (var Q = 0; Q |= 1 & w, w >>>= 1, Q <<= 1, 0 < --D; ) ;
                return Q >>> 1;
              }
              function we(w, D, Q) {
                var O, _, V = new Array(y + 1), $ = 0;
                for (O = 1; O <= y; O++) V[O] = $ = $ + Q[O - 1] << 1;
                for (_ = 0; _ <= D; _++) {
                  var Y = w[2 * _ + 1];
                  Y !== 0 && (w[2 * _] = le(V[Y]++, Y));
                }
              }
              function fe(w) {
                var D;
                for (D = 0; D < g; D++) w.dyn_ltree[2 * D] = 0;
                for (D = 0; D < d; D++) w.dyn_dtree[2 * D] = 0;
                for (D = 0; D < m; D++) w.bl_tree[2 * D] = 0;
                w.dyn_ltree[2 * x] = 1, w.opt_len = w.static_len = 0, w.last_lit = w.matches = 0;
              }
              function q(w) {
                8 < w.bi_valid ? K(w, w.bi_buf) : 0 < w.bi_valid && (w.pending_buf[w.pending++] = w.bi_buf), w.bi_buf = 0, w.bi_valid = 0;
              }
              function pe(w, D, Q, O) {
                var _ = 2 * D, V = 2 * Q;
                return w[_] < w[V] || w[_] === w[V] && O[D] <= O[Q];
              }
              function re(w, D, Q) {
                for (var O = w.heap[Q], _ = Q << 1; _ <= w.heap_len && (_ < w.heap_len && pe(D, w.heap[_ + 1], w.heap[_], w.depth) && _++, !pe(D, O, w.heap[_], w.depth)); ) w.heap[Q] = w.heap[_], Q = _, _ <<= 1;
                w.heap[Q] = O;
              }
              function be(w, D, Q) {
                var O, _, V, $, Y = 0;
                if (w.last_lit !== 0) for (; O = w.pending_buf[w.d_buf + 2 * Y] << 8 | w.pending_buf[w.d_buf + 2 * Y + 1], _ = w.pending_buf[w.l_buf + Y], Y++, O === 0 ? J(w, _, D) : (J(w, (V = u[_]) + f + 1, D), ($ = R[V]) !== 0 && j(w, _ -= S[V], $), J(w, V = F(--O), Q), ($ = G[V]) !== 0 && j(w, O -= X[V], $)), Y < w.last_lit; ) ;
                J(w, x, D);
              }
              function ce(w, D) {
                var Q, O, _, V = D.dyn_tree, $ = D.stat_desc.static_tree, Y = D.stat_desc.has_stree, ne = D.stat_desc.elems, ye = -1;
                for (w.heap_len = 0, w.heap_max = h, Q = 0; Q < ne; Q++) V[2 * Q] !== 0 ? (w.heap[++w.heap_len] = ye = Q, w.depth[Q] = 0) : V[2 * Q + 1] = 0;
                for (; w.heap_len < 2; ) V[2 * (_ = w.heap[++w.heap_len] = ye < 2 ? ++ye : 0)] = 1, w.depth[_] = 0, w.opt_len--, Y && (w.static_len -= $[2 * _ + 1]);
                for (D.max_code = ye, Q = w.heap_len >> 1; 1 <= Q; Q--) re(w, V, Q);
                for (_ = ne; Q = w.heap[1], w.heap[1] = w.heap[w.heap_len--], re(w, V, 1), O = w.heap[1], w.heap[--w.heap_max] = Q, w.heap[--w.heap_max] = O, V[2 * _] = V[2 * Q] + V[2 * O], w.depth[_] = (w.depth[Q] >= w.depth[O] ? w.depth[Q] : w.depth[O]) + 1, V[2 * Q + 1] = V[2 * O + 1] = _, w.heap[1] = _++, re(w, V, 1), 2 <= w.heap_len; ) ;
                w.heap[--w.heap_max] = w.heap[1], (function(ge, Pe) {
                  var je, Ne, He, xe, ot, gt, _e = Pe.dyn_tree, Ut = Pe.max_code, sa = Pe.stat_desc.static_tree, Aa = Pe.stat_desc.has_stree, la = Pe.stat_desc.extra_bits, Xt = Pe.stat_desc.extra_base, Ke = Pe.stat_desc.max_length, it = 0;
                  for (xe = 0; xe <= y; xe++) ge.bl_count[xe] = 0;
                  for (_e[2 * ge.heap[ge.heap_max] + 1] = 0, je = ge.heap_max + 1; je < h; je++) Ke < (xe = _e[2 * _e[2 * (Ne = ge.heap[je]) + 1] + 1] + 1) && (xe = Ke, it++), _e[2 * Ne + 1] = xe, Ut < Ne || (ge.bl_count[xe]++, ot = 0, Xt <= Ne && (ot = la[Ne - Xt]), gt = _e[2 * Ne], ge.opt_len += gt * (xe + ot), Aa && (ge.static_len += gt * (sa[2 * Ne + 1] + ot)));
                  if (it !== 0) {
                    do {
                      for (xe = Ke - 1; ge.bl_count[xe] === 0; ) xe--;
                      ge.bl_count[xe]--, ge.bl_count[xe + 1] += 2, ge.bl_count[Ke]--, it -= 2;
                    } while (0 < it);
                    for (xe = Ke; xe !== 0; xe--) for (Ne = ge.bl_count[xe]; Ne !== 0; ) Ut < (He = ge.heap[--je]) || (_e[2 * He + 1] !== xe && (ge.opt_len += (xe - _e[2 * He + 1]) * _e[2 * He], _e[2 * He + 1] = xe), Ne--);
                  }
                })(w, D), we(V, ye, w.bl_count);
              }
              function p(w, D, Q) {
                var O, _, V = -1, $ = D[1], Y = 0, ne = 7, ye = 4;
                for ($ === 0 && (ne = 138, ye = 3), D[2 * (Q + 1) + 1] = 65535, O = 0; O <= Q; O++) _ = $, $ = D[2 * (O + 1) + 1], ++Y < ne && _ === $ || (Y < ye ? w.bl_tree[2 * _] += Y : _ !== 0 ? (_ !== V && w.bl_tree[2 * _]++, w.bl_tree[2 * k]++) : Y <= 10 ? w.bl_tree[2 * B]++ : w.bl_tree[2 * T]++, V = _, ye = (Y = 0) === $ ? (ne = 138, 3) : _ === $ ? (ne = 6, 3) : (ne = 7, 4));
              }
              function U(w, D, Q) {
                var O, _, V = -1, $ = D[1], Y = 0, ne = 7, ye = 4;
                for ($ === 0 && (ne = 138, ye = 3), O = 0; O <= Q; O++) if (_ = $, $ = D[2 * (O + 1) + 1], !(++Y < ne && _ === $)) {
                  if (Y < ye) for (; J(w, _, w.bl_tree), --Y != 0; ) ;
                  else _ !== 0 ? (_ !== V && (J(w, _, w.bl_tree), Y--), J(w, k, w.bl_tree), j(w, Y - 3, 2)) : Y <= 10 ? (J(w, B, w.bl_tree), j(w, Y - 3, 3)) : (J(w, T, w.bl_tree), j(w, Y - 11, 7));
                  V = _, ye = (Y = 0) === $ ? (ne = 138, 3) : _ === $ ? (ne = 6, 3) : (ne = 7, 4);
                }
              }
              s(X);
              var z = false;
              function C(w, D, Q, O) {
                j(w, (a << 1) + (O ? 1 : 0), 3), (function(_, V, $, Y) {
                  q(_), K(_, $), K(_, ~$), A.arraySet(_.pending_buf, _.window, V, $, _.pending), _.pending += $;
                })(w, D, Q);
              }
              n._tr_init = function(w) {
                z || ((function() {
                  var D, Q, O, _, V, $ = new Array(y + 1);
                  for (_ = O = 0; _ < r - 1; _++) for (S[_] = O, D = 0; D < 1 << R[_]; D++) u[O++] = _;
                  for (u[O - 1] = _, _ = V = 0; _ < 16; _++) for (X[_] = V, D = 0; D < 1 << G[_]; D++) E[V++] = _;
                  for (V >>= 7; _ < d; _++) for (X[_] = V << 7, D = 0; D < 1 << G[_] - 7; D++) E[256 + V++] = _;
                  for (Q = 0; Q <= y; Q++) $[Q] = 0;
                  for (D = 0; D <= 143; ) H[2 * D + 1] = 8, D++, $[8]++;
                  for (; D <= 255; ) H[2 * D + 1] = 9, D++, $[9]++;
                  for (; D <= 279; ) H[2 * D + 1] = 7, D++, $[7]++;
                  for (; D <= 287; ) H[2 * D + 1] = 8, D++, $[8]++;
                  for (we(H, g + 1, $), D = 0; D < d; D++) L[2 * D + 1] = 5, L[2 * D] = le(D, 5);
                  Z = new ae(H, R, f + 1, g, y), M = new ae(L, G, 0, d, y), te = new ae(new Array(0), P, 0, m, b);
                })(), z = true), w.l_desc = new N(w.dyn_ltree, Z), w.d_desc = new N(w.dyn_dtree, M), w.bl_desc = new N(w.bl_tree, te), w.bi_buf = 0, w.bi_valid = 0, fe(w);
              }, n._tr_stored_block = C, n._tr_flush_block = function(w, D, Q, O) {
                var _, V, $ = 0;
                0 < w.level ? (w.strm.data_type === 2 && (w.strm.data_type = (function(Y) {
                  var ne, ye = 4093624447;
                  for (ne = 0; ne <= 31; ne++, ye >>>= 1) if (1 & ye && Y.dyn_ltree[2 * ne] !== 0) return l;
                  if (Y.dyn_ltree[18] !== 0 || Y.dyn_ltree[20] !== 0 || Y.dyn_ltree[26] !== 0) return c;
                  for (ne = 32; ne < f; ne++) if (Y.dyn_ltree[2 * ne] !== 0) return c;
                  return l;
                })(w)), ce(w, w.l_desc), ce(w, w.d_desc), $ = (function(Y) {
                  var ne;
                  for (p(Y, Y.dyn_ltree, Y.l_desc.max_code), p(Y, Y.dyn_dtree, Y.d_desc.max_code), ce(Y, Y.bl_desc), ne = m - 1; 3 <= ne && Y.bl_tree[2 * I[ne] + 1] === 0; ne--) ;
                  return Y.opt_len += 3 * (ne + 1) + 5 + 5 + 4, ne;
                })(w), _ = w.opt_len + 3 + 7 >>> 3, (V = w.static_len + 3 + 7 >>> 3) <= _ && (_ = V)) : _ = V = Q + 5, Q + 4 <= _ && D !== -1 ? C(w, D, Q, O) : w.strategy === 4 || V === _ ? (j(w, 2 + (O ? 1 : 0), 3), be(w, H, L)) : (j(w, 4 + (O ? 1 : 0), 3), (function(Y, ne, ye, ge) {
                  var Pe;
                  for (j(Y, ne - 257, 5), j(Y, ye - 1, 5), j(Y, ge - 4, 4), Pe = 0; Pe < ge; Pe++) j(Y, Y.bl_tree[2 * I[Pe] + 1], 3);
                  U(Y, Y.dyn_ltree, ne - 1), U(Y, Y.dyn_dtree, ye - 1);
                })(w, w.l_desc.max_code + 1, w.d_desc.max_code + 1, $ + 1), be(w, w.dyn_ltree, w.dyn_dtree)), fe(w), O && q(w);
              }, n._tr_tally = function(w, D, Q) {
                return w.pending_buf[w.d_buf + 2 * w.last_lit] = D >>> 8 & 255, w.pending_buf[w.d_buf + 2 * w.last_lit + 1] = 255 & D, w.pending_buf[w.l_buf + w.last_lit] = 255 & Q, w.last_lit++, D === 0 ? w.dyn_ltree[2 * Q]++ : (w.matches++, D--, w.dyn_ltree[2 * (u[Q] + f + 1)]++, w.dyn_dtree[2 * F(D)]++), w.last_lit === w.lit_bufsize - 1;
              }, n._tr_align = function(w) {
                j(w, 2, 3), J(w, x, H), (function(D) {
                  D.bi_valid === 16 ? (K(D, D.bi_buf), D.bi_buf = 0, D.bi_valid = 0) : 8 <= D.bi_valid && (D.pending_buf[D.pending++] = 255 & D.bi_buf, D.bi_buf >>= 8, D.bi_valid -= 8);
                })(w);
              };
            },
            {
              "../utils/common": 41
            }
          ],
          53: [
            function(t, i, n) {
              i.exports = function() {
                this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
              };
            },
            {}
          ],
          54: [
            function(t, i, n) {
              (function(A) {
                (function(l, c) {
                  if (!l.setImmediate) {
                    var s, a, r, f, g = 1, d = {}, m = false, h = l.document, y = Object.getPrototypeOf && Object.getPrototypeOf(l);
                    y = y && y.setTimeout ? y : l, s = {}.toString.call(l.process) === "[object process]" ? function(k) {
                      process.nextTick(function() {
                        b(k);
                      });
                    } : (function() {
                      if (l.postMessage && !l.importScripts) {
                        var k = true, B = l.onmessage;
                        return l.onmessage = function() {
                          k = false;
                        }, l.postMessage("", "*"), l.onmessage = B, k;
                      }
                    })() ? (f = "setImmediate$" + Math.random() + "$", l.addEventListener ? l.addEventListener("message", x, false) : l.attachEvent("onmessage", x), function(k) {
                      l.postMessage(f + k, "*");
                    }) : l.MessageChannel ? ((r = new MessageChannel()).port1.onmessage = function(k) {
                      b(k.data);
                    }, function(k) {
                      r.port2.postMessage(k);
                    }) : h && "onreadystatechange" in h.createElement("script") ? (a = h.documentElement, function(k) {
                      var B = h.createElement("script");
                      B.onreadystatechange = function() {
                        b(k), B.onreadystatechange = null, a.removeChild(B), B = null;
                      }, a.appendChild(B);
                    }) : function(k) {
                      setTimeout(b, 0, k);
                    }, y.setImmediate = function(k) {
                      typeof k != "function" && (k = new Function("" + k));
                      for (var B = new Array(arguments.length - 1), T = 0; T < B.length; T++) B[T] = arguments[T + 1];
                      var R = {
                        callback: k,
                        args: B
                      };
                      return d[g] = R, s(g), g++;
                    }, y.clearImmediate = v;
                  }
                  function v(k) {
                    delete d[k];
                  }
                  function b(k) {
                    if (m) setTimeout(b, 0, k);
                    else {
                      var B = d[k];
                      if (B) {
                        m = true;
                        try {
                          (function(T) {
                            var R = T.callback, G = T.args;
                            switch (G.length) {
                              case 0:
                                R();
                                break;
                              case 1:
                                R(G[0]);
                                break;
                              case 2:
                                R(G[0], G[1]);
                                break;
                              case 3:
                                R(G[0], G[1], G[2]);
                                break;
                              default:
                                R.apply(c, G);
                            }
                          })(B);
                        } finally {
                          v(k), m = false;
                        }
                      }
                    }
                  }
                  function x(k) {
                    k.source === l && typeof k.data == "string" && k.data.indexOf(f) === 0 && b(+k.data.slice(f.length));
                  }
                })(typeof self > "u" ? A === void 0 ? this : A : self);
              }).call(this, typeof st < "u" ? st : typeof self < "u" ? self : typeof window < "u" ? window : {});
            },
            {}
          ]
        }, {}, [
          10
        ])(10);
      });
    })(vt)), vt.exports;
  }
  var La = Ca();
  const Ht = ca(La);
  function ke(e, o, t, i) {
    function n(A) {
      return A instanceof t ? A : new t(function(l) {
        l(A);
      });
    }
    return new (t || (t = Promise))(function(A, l) {
      function c(r) {
        try {
          a(i.next(r));
        } catch (f) {
          l(f);
        }
      }
      function s(r) {
        try {
          a(i.throw(r));
        } catch (f) {
          l(f);
        }
      }
      function a(r) {
        r.done ? A(r.value) : n(r.value).then(c, s);
      }
      a((i = i.apply(e, [])).next());
    });
  }
  const Ae = 914400, nt = 12700, Ce = `\r
`, Ba = 2147483649, yt = /^[0-9a-fA-F]{6}$/, ka = 1.67, Da = 27, Ge = {
    type: "solid",
    color: "666666",
    pt: 1
  }, Kt = [
    0.05,
    0.1,
    0.05,
    0.1
  ], Qe = {
    color: "363636",
    pt: 1
  }, Me = {
    color: "888888",
    style: "solid",
    size: 1,
    cap: "flat"
  }, Le = "000000", Fe = 12, Pa = 18, Oe = "LAYOUT_16x9", kt = "DEFAULT", Zt = "333333", ze = {
    type: "outer",
    blur: 3,
    offset: 23e3 / 12700,
    angle: 90,
    color: "000000",
    opacity: 0.35,
    rotateWithShape: true
  }, rt = [
    0.5,
    0.5,
    0.5,
    0.5
  ], Ot = {
    color: "000000"
  }, Fa = {
    size: 8,
    color: "FFFFFF",
    opacity: 0.75
  }, Re = "2094734552", dt = "2094734553", et = "2094734554", Dt = "2094734555", $t = "2094734556", Ze = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), tt = [
    "C0504D",
    "4F81BD",
    "9BBB59",
    "8064A2",
    "4BACC6",
    "F79646",
    "628FC6",
    "C86360",
    "C0504D",
    "4F81BD",
    "9BBB59",
    "8064A2",
    "4BACC6",
    "F79646",
    "628FC6",
    "C86360"
  ], Na = [
    "5DA5DA",
    "FAA43A",
    "60BD68",
    "F17CB0",
    "B2912F",
    "B276B2",
    "DECF3F",
    "F15854",
    "A7A7A7",
    "5DA5DA",
    "FAA43A",
    "60BD68",
    "F17CB0",
    "B2912F",
    "B276B2",
    "DECF3F",
    "F15854",
    "A7A7A7"
  ];
  var We;
  (function(e) {
    e.left = "left", e.center = "center", e.right = "right", e.justify = "justify";
  })(We || (We = {}));
  var qe;
  (function(e) {
    e.b = "b", e.ctr = "ctr", e.t = "t";
  })(qe || (qe = {}));
  const ea = "{F7021451-1387-4CA6-816F-3879F97B5CBC}";
  var Pt;
  (function(e) {
    e.arraybuffer = "arraybuffer", e.base64 = "base64", e.binarystring = "binarystring", e.blob = "blob", e.nodebuffer = "nodebuffer", e.uint8array = "uint8array";
  })(Pt || (Pt = {}));
  var Ft;
  (function(e) {
    e.area = "area", e.bar = "bar", e.bar3d = "bar3D", e.bubble = "bubble", e.bubble3d = "bubble3D", e.doughnut = "doughnut", e.line = "line", e.pie = "pie", e.radar = "radar", e.scatter = "scatter";
  })(Ft || (Ft = {}));
  var Nt;
  (function(e) {
    e.accentBorderCallout1 = "accentBorderCallout1", e.accentBorderCallout2 = "accentBorderCallout2", e.accentBorderCallout3 = "accentBorderCallout3", e.accentCallout1 = "accentCallout1", e.accentCallout2 = "accentCallout2", e.accentCallout3 = "accentCallout3", e.actionButtonBackPrevious = "actionButtonBackPrevious", e.actionButtonBeginning = "actionButtonBeginning", e.actionButtonBlank = "actionButtonBlank", e.actionButtonDocument = "actionButtonDocument", e.actionButtonEnd = "actionButtonEnd", e.actionButtonForwardNext = "actionButtonForwardNext", e.actionButtonHelp = "actionButtonHelp", e.actionButtonHome = "actionButtonHome", e.actionButtonInformation = "actionButtonInformation", e.actionButtonMovie = "actionButtonMovie", e.actionButtonReturn = "actionButtonReturn", e.actionButtonSound = "actionButtonSound", e.arc = "arc", e.bentArrow = "bentArrow", e.bentUpArrow = "bentUpArrow", e.bevel = "bevel", e.blockArc = "blockArc", e.borderCallout1 = "borderCallout1", e.borderCallout2 = "borderCallout2", e.borderCallout3 = "borderCallout3", e.bracePair = "bracePair", e.bracketPair = "bracketPair", e.callout1 = "callout1", e.callout2 = "callout2", e.callout3 = "callout3", e.can = "can", e.chartPlus = "chartPlus", e.chartStar = "chartStar", e.chartX = "chartX", e.chevron = "chevron", e.chord = "chord", e.circularArrow = "circularArrow", e.cloud = "cloud", e.cloudCallout = "cloudCallout", e.corner = "corner", e.cornerTabs = "cornerTabs", e.cube = "cube", e.curvedDownArrow = "curvedDownArrow", e.curvedLeftArrow = "curvedLeftArrow", e.curvedRightArrow = "curvedRightArrow", e.curvedUpArrow = "curvedUpArrow", e.custGeom = "custGeom", e.decagon = "decagon", e.diagStripe = "diagStripe", e.diamond = "diamond", e.dodecagon = "dodecagon", e.donut = "donut", e.doubleWave = "doubleWave", e.downArrow = "downArrow", e.downArrowCallout = "downArrowCallout", e.ellipse = "ellipse", e.ellipseRibbon = "ellipseRibbon", e.ellipseRibbon2 = "ellipseRibbon2", e.flowChartAlternateProcess = "flowChartAlternateProcess", e.flowChartCollate = "flowChartCollate", e.flowChartConnector = "flowChartConnector", e.flowChartDecision = "flowChartDecision", e.flowChartDelay = "flowChartDelay", e.flowChartDisplay = "flowChartDisplay", e.flowChartDocument = "flowChartDocument", e.flowChartExtract = "flowChartExtract", e.flowChartInputOutput = "flowChartInputOutput", e.flowChartInternalStorage = "flowChartInternalStorage", e.flowChartMagneticDisk = "flowChartMagneticDisk", e.flowChartMagneticDrum = "flowChartMagneticDrum", e.flowChartMagneticTape = "flowChartMagneticTape", e.flowChartManualInput = "flowChartManualInput", e.flowChartManualOperation = "flowChartManualOperation", e.flowChartMerge = "flowChartMerge", e.flowChartMultidocument = "flowChartMultidocument", e.flowChartOfflineStorage = "flowChartOfflineStorage", e.flowChartOffpageConnector = "flowChartOffpageConnector", e.flowChartOnlineStorage = "flowChartOnlineStorage", e.flowChartOr = "flowChartOr", e.flowChartPredefinedProcess = "flowChartPredefinedProcess", e.flowChartPreparation = "flowChartPreparation", e.flowChartProcess = "flowChartProcess", e.flowChartPunchedCard = "flowChartPunchedCard", e.flowChartPunchedTape = "flowChartPunchedTape", e.flowChartSort = "flowChartSort", e.flowChartSummingJunction = "flowChartSummingJunction", e.flowChartTerminator = "flowChartTerminator", e.folderCorner = "folderCorner", e.frame = "frame", e.funnel = "funnel", e.gear6 = "gear6", e.gear9 = "gear9", e.halfFrame = "halfFrame", e.heart = "heart", e.heptagon = "heptagon", e.hexagon = "hexagon", e.homePlate = "homePlate", e.horizontalScroll = "horizontalScroll", e.irregularSeal1 = "irregularSeal1", e.irregularSeal2 = "irregularSeal2", e.leftArrow = "leftArrow", e.leftArrowCallout = "leftArrowCallout", e.leftBrace = "leftBrace", e.leftBracket = "leftBracket", e.leftCircularArrow = "leftCircularArrow", e.leftRightArrow = "leftRightArrow", e.leftRightArrowCallout = "leftRightArrowCallout", e.leftRightCircularArrow = "leftRightCircularArrow", e.leftRightRibbon = "leftRightRibbon", e.leftRightUpArrow = "leftRightUpArrow", e.leftUpArrow = "leftUpArrow", e.lightningBolt = "lightningBolt", e.line = "line", e.lineInv = "lineInv", e.mathDivide = "mathDivide", e.mathEqual = "mathEqual", e.mathMinus = "mathMinus", e.mathMultiply = "mathMultiply", e.mathNotEqual = "mathNotEqual", e.mathPlus = "mathPlus", e.moon = "moon", e.noSmoking = "noSmoking", e.nonIsoscelesTrapezoid = "nonIsoscelesTrapezoid", e.notchedRightArrow = "notchedRightArrow", e.octagon = "octagon", e.parallelogram = "parallelogram", e.pentagon = "pentagon", e.pie = "pie", e.pieWedge = "pieWedge", e.plaque = "plaque", e.plaqueTabs = "plaqueTabs", e.plus = "plus", e.quadArrow = "quadArrow", e.quadArrowCallout = "quadArrowCallout", e.rect = "rect", e.ribbon = "ribbon", e.ribbon2 = "ribbon2", e.rightArrow = "rightArrow", e.rightArrowCallout = "rightArrowCallout", e.rightBrace = "rightBrace", e.rightBracket = "rightBracket", e.round1Rect = "round1Rect", e.round2DiagRect = "round2DiagRect", e.round2SameRect = "round2SameRect", e.roundRect = "roundRect", e.rtTriangle = "rtTriangle", e.smileyFace = "smileyFace", e.snip1Rect = "snip1Rect", e.snip2DiagRect = "snip2DiagRect", e.snip2SameRect = "snip2SameRect", e.snipRoundRect = "snipRoundRect", e.squareTabs = "squareTabs", e.star10 = "star10", e.star12 = "star12", e.star16 = "star16", e.star24 = "star24", e.star32 = "star32", e.star4 = "star4", e.star5 = "star5", e.star6 = "star6", e.star7 = "star7", e.star8 = "star8", e.stripedRightArrow = "stripedRightArrow", e.sun = "sun", e.swooshArrow = "swooshArrow", e.teardrop = "teardrop", e.trapezoid = "trapezoid", e.triangle = "triangle", e.upArrow = "upArrow", e.upArrowCallout = "upArrowCallout", e.upDownArrow = "upDownArrow", e.upDownArrowCallout = "upDownArrowCallout", e.uturnArrow = "uturnArrow", e.verticalScroll = "verticalScroll", e.wave = "wave", e.wedgeEllipseCallout = "wedgeEllipseCallout", e.wedgeRectCallout = "wedgeRectCallout", e.wedgeRoundRectCallout = "wedgeRoundRectCallout";
  })(Nt || (Nt = {}));
  var Be;
  (function(e) {
    e.text1 = "tx1", e.text2 = "tx2", e.background1 = "bg1", e.background2 = "bg2", e.accent1 = "accent1", e.accent2 = "accent2", e.accent3 = "accent3", e.accent4 = "accent4", e.accent5 = "accent5", e.accent6 = "accent6";
  })(Be || (Be = {}));
  var _t;
  (function(e) {
    e.left = "left", e.center = "center", e.right = "right", e.justify = "justify";
  })(_t || (_t = {}));
  var Rt;
  (function(e) {
    e.top = "top", e.middle = "middle", e.bottom = "bottom";
  })(Rt || (Rt = {}));
  var Ee;
  (function(e) {
    e.ACTION_BUTTON_BACK_OR_PREVIOUS = "actionButtonBackPrevious", e.ACTION_BUTTON_BEGINNING = "actionButtonBeginning", e.ACTION_BUTTON_CUSTOM = "actionButtonBlank", e.ACTION_BUTTON_DOCUMENT = "actionButtonDocument", e.ACTION_BUTTON_END = "actionButtonEnd", e.ACTION_BUTTON_FORWARD_OR_NEXT = "actionButtonForwardNext", e.ACTION_BUTTON_HELP = "actionButtonHelp", e.ACTION_BUTTON_HOME = "actionButtonHome", e.ACTION_BUTTON_INFORMATION = "actionButtonInformation", e.ACTION_BUTTON_MOVIE = "actionButtonMovie", e.ACTION_BUTTON_RETURN = "actionButtonReturn", e.ACTION_BUTTON_SOUND = "actionButtonSound", e.ARC = "arc", e.BALLOON = "wedgeRoundRectCallout", e.BENT_ARROW = "bentArrow", e.BENT_UP_ARROW = "bentUpArrow", e.BEVEL = "bevel", e.BLOCK_ARC = "blockArc", e.CAN = "can", e.CHART_PLUS = "chartPlus", e.CHART_STAR = "chartStar", e.CHART_X = "chartX", e.CHEVRON = "chevron", e.CHORD = "chord", e.CIRCULAR_ARROW = "circularArrow", e.CLOUD = "cloud", e.CLOUD_CALLOUT = "cloudCallout", e.CORNER = "corner", e.CORNER_TABS = "cornerTabs", e.CROSS = "plus", e.CUBE = "cube", e.CURVED_DOWN_ARROW = "curvedDownArrow", e.CURVED_DOWN_RIBBON = "ellipseRibbon", e.CURVED_LEFT_ARROW = "curvedLeftArrow", e.CURVED_RIGHT_ARROW = "curvedRightArrow", e.CURVED_UP_ARROW = "curvedUpArrow", e.CURVED_UP_RIBBON = "ellipseRibbon2", e.CUSTOM_GEOMETRY = "custGeom", e.DECAGON = "decagon", e.DIAGONAL_STRIPE = "diagStripe", e.DIAMOND = "diamond", e.DODECAGON = "dodecagon", e.DONUT = "donut", e.DOUBLE_BRACE = "bracePair", e.DOUBLE_BRACKET = "bracketPair", e.DOUBLE_WAVE = "doubleWave", e.DOWN_ARROW = "downArrow", e.DOWN_ARROW_CALLOUT = "downArrowCallout", e.DOWN_RIBBON = "ribbon", e.EXPLOSION1 = "irregularSeal1", e.EXPLOSION2 = "irregularSeal2", e.FLOWCHART_ALTERNATE_PROCESS = "flowChartAlternateProcess", e.FLOWCHART_CARD = "flowChartPunchedCard", e.FLOWCHART_COLLATE = "flowChartCollate", e.FLOWCHART_CONNECTOR = "flowChartConnector", e.FLOWCHART_DATA = "flowChartInputOutput", e.FLOWCHART_DECISION = "flowChartDecision", e.FLOWCHART_DELAY = "flowChartDelay", e.FLOWCHART_DIRECT_ACCESS_STORAGE = "flowChartMagneticDrum", e.FLOWCHART_DISPLAY = "flowChartDisplay", e.FLOWCHART_DOCUMENT = "flowChartDocument", e.FLOWCHART_EXTRACT = "flowChartExtract", e.FLOWCHART_INTERNAL_STORAGE = "flowChartInternalStorage", e.FLOWCHART_MAGNETIC_DISK = "flowChartMagneticDisk", e.FLOWCHART_MANUAL_INPUT = "flowChartManualInput", e.FLOWCHART_MANUAL_OPERATION = "flowChartManualOperation", e.FLOWCHART_MERGE = "flowChartMerge", e.FLOWCHART_MULTIDOCUMENT = "flowChartMultidocument", e.FLOWCHART_OFFLINE_STORAGE = "flowChartOfflineStorage", e.FLOWCHART_OFFPAGE_CONNECTOR = "flowChartOffpageConnector", e.FLOWCHART_OR = "flowChartOr", e.FLOWCHART_PREDEFINED_PROCESS = "flowChartPredefinedProcess", e.FLOWCHART_PREPARATION = "flowChartPreparation", e.FLOWCHART_PROCESS = "flowChartProcess", e.FLOWCHART_PUNCHED_TAPE = "flowChartPunchedTape", e.FLOWCHART_SEQUENTIAL_ACCESS_STORAGE = "flowChartMagneticTape", e.FLOWCHART_SORT = "flowChartSort", e.FLOWCHART_STORED_DATA = "flowChartOnlineStorage", e.FLOWCHART_SUMMING_JUNCTION = "flowChartSummingJunction", e.FLOWCHART_TERMINATOR = "flowChartTerminator", e.FOLDED_CORNER = "folderCorner", e.FRAME = "frame", e.FUNNEL = "funnel", e.GEAR_6 = "gear6", e.GEAR_9 = "gear9", e.HALF_FRAME = "halfFrame", e.HEART = "heart", e.HEPTAGON = "heptagon", e.HEXAGON = "hexagon", e.HORIZONTAL_SCROLL = "horizontalScroll", e.ISOSCELES_TRIANGLE = "triangle", e.LEFT_ARROW = "leftArrow", e.LEFT_ARROW_CALLOUT = "leftArrowCallout", e.LEFT_BRACE = "leftBrace", e.LEFT_BRACKET = "leftBracket", e.LEFT_CIRCULAR_ARROW = "leftCircularArrow", e.LEFT_RIGHT_ARROW = "leftRightArrow", e.LEFT_RIGHT_ARROW_CALLOUT = "leftRightArrowCallout", e.LEFT_RIGHT_CIRCULAR_ARROW = "leftRightCircularArrow", e.LEFT_RIGHT_RIBBON = "leftRightRibbon", e.LEFT_RIGHT_UP_ARROW = "leftRightUpArrow", e.LEFT_UP_ARROW = "leftUpArrow", e.LIGHTNING_BOLT = "lightningBolt", e.LINE_CALLOUT_1 = "borderCallout1", e.LINE_CALLOUT_1_ACCENT_BAR = "accentCallout1", e.LINE_CALLOUT_1_BORDER_AND_ACCENT_BAR = "accentBorderCallout1", e.LINE_CALLOUT_1_NO_BORDER = "callout1", e.LINE_CALLOUT_2 = "borderCallout2", e.LINE_CALLOUT_2_ACCENT_BAR = "accentCallout2", e.LINE_CALLOUT_2_BORDER_AND_ACCENT_BAR = "accentBorderCallout2", e.LINE_CALLOUT_2_NO_BORDER = "callout2", e.LINE_CALLOUT_3 = "borderCallout3", e.LINE_CALLOUT_3_ACCENT_BAR = "accentCallout3", e.LINE_CALLOUT_3_BORDER_AND_ACCENT_BAR = "accentBorderCallout3", e.LINE_CALLOUT_3_NO_BORDER = "callout3", e.LINE_CALLOUT_4 = "borderCallout4", e.LINE_CALLOUT_4_ACCENT_BAR = "accentCallout3=4", e.LINE_CALLOUT_4_BORDER_AND_ACCENT_BAR = "accentBorderCallout4", e.LINE_CALLOUT_4_NO_BORDER = "callout4", e.LINE = "line", e.LINE_INVERSE = "lineInv", e.MATH_DIVIDE = "mathDivide", e.MATH_EQUAL = "mathEqual", e.MATH_MINUS = "mathMinus", e.MATH_MULTIPLY = "mathMultiply", e.MATH_NOT_EQUAL = "mathNotEqual", e.MATH_PLUS = "mathPlus", e.MOON = "moon", e.NON_ISOSCELES_TRAPEZOID = "nonIsoscelesTrapezoid", e.NOTCHED_RIGHT_ARROW = "notchedRightArrow", e.NO_SYMBOL = "noSmoking", e.OCTAGON = "octagon", e.OVAL = "ellipse", e.OVAL_CALLOUT = "wedgeEllipseCallout", e.PARALLELOGRAM = "parallelogram", e.PENTAGON = "homePlate", e.PIE = "pie", e.PIE_WEDGE = "pieWedge", e.PLAQUE = "plaque", e.PLAQUE_TABS = "plaqueTabs", e.QUAD_ARROW = "quadArrow", e.QUAD_ARROW_CALLOUT = "quadArrowCallout", e.RECTANGLE = "rect", e.RECTANGULAR_CALLOUT = "wedgeRectCallout", e.REGULAR_PENTAGON = "pentagon", e.RIGHT_ARROW = "rightArrow", e.RIGHT_ARROW_CALLOUT = "rightArrowCallout", e.RIGHT_BRACE = "rightBrace", e.RIGHT_BRACKET = "rightBracket", e.RIGHT_TRIANGLE = "rtTriangle", e.ROUNDED_RECTANGLE = "roundRect", e.ROUNDED_RECTANGULAR_CALLOUT = "wedgeRoundRectCallout", e.ROUND_1_RECTANGLE = "round1Rect", e.ROUND_2_DIAG_RECTANGLE = "round2DiagRect", e.ROUND_2_SAME_RECTANGLE = "round2SameRect", e.SMILEY_FACE = "smileyFace", e.SNIP_1_RECTANGLE = "snip1Rect", e.SNIP_2_DIAG_RECTANGLE = "snip2DiagRect", e.SNIP_2_SAME_RECTANGLE = "snip2SameRect", e.SNIP_ROUND_RECTANGLE = "snipRoundRect", e.SQUARE_TABS = "squareTabs", e.STAR_10_POINT = "star10", e.STAR_12_POINT = "star12", e.STAR_16_POINT = "star16", e.STAR_24_POINT = "star24", e.STAR_32_POINT = "star32", e.STAR_4_POINT = "star4", e.STAR_5_POINT = "star5", e.STAR_6_POINT = "star6", e.STAR_7_POINT = "star7", e.STAR_8_POINT = "star8", e.STRIPED_RIGHT_ARROW = "stripedRightArrow", e.SUN = "sun", e.SWOOSH_ARROW = "swooshArrow", e.TEAR = "teardrop", e.TRAPEZOID = "trapezoid", e.UP_ARROW = "upArrow", e.UP_ARROW_CALLOUT = "upArrowCallout", e.UP_DOWN_ARROW = "upDownArrow", e.UP_DOWN_ARROW_CALLOUT = "upDownArrowCallout", e.UP_RIBBON = "ribbon2", e.U_TURN_ARROW = "uturnArrow", e.VERTICAL_SCROLL = "verticalScroll", e.WAVE = "wave";
  })(Ee || (Ee = {}));
  var W;
  (function(e) {
    e.AREA = "area", e.BAR = "bar", e.BAR3D = "bar3D", e.BUBBLE = "bubble", e.BUBBLE3D = "bubble3D", e.DOUGHNUT = "doughnut", e.LINE = "line", e.PIE = "pie", e.RADAR = "radar", e.SCATTER = "scatter";
  })(W || (W = {}));
  var ut;
  (function(e) {
    e.TEXT1 = "tx1", e.TEXT2 = "tx2", e.BACKGROUND1 = "bg1", e.BACKGROUND2 = "bg2", e.ACCENT1 = "accent1", e.ACCENT2 = "accent2", e.ACCENT3 = "accent3", e.ACCENT4 = "accent4", e.ACCENT5 = "accent5", e.ACCENT6 = "accent6";
  })(ut || (ut = {}));
  var Te;
  (function(e) {
    e.chart = "chart", e.image = "image", e.line = "line", e.rect = "rect", e.text = "text", e.placeholder = "placeholder";
  })(Te || (Te = {}));
  var se;
  (function(e) {
    e.chart = "chart", e.hyperlink = "hyperlink", e.image = "image", e.media = "media", e.online = "online", e.placeholder = "placeholder", e.table = "table", e.tablecell = "tablecell", e.text = "text", e.notes = "notes";
  })(se || (se = {}));
  var at;
  (function(e) {
    e.title = "title", e.body = "body", e.image = "pic", e.chart = "chart", e.table = "tbl", e.media = "media";
  })(at || (at = {}));
  var Ve;
  (function(e) {
    e.DEFAULT = "&#x2022;", e.CHECK = "&#x2713;", e.STAR = "&#x2605;", e.TRIANGLE = "&#x25B6;";
  })(Ve || (Ve = {}));
  const Je = "data:image/png;base64,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", _a = "data:image/png;base64,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AAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKSEAhgAAAAAAAAgJRTAAAAAAAAAACmhAAYAAAAAAABICQUwAAAAAAAAQEoogAEAAAAAAABSQgEMAAAAAAAAkBIKYAAAAAAAAICUUAADAAAAAAAApIQCGAAAAAAAACAlFMAAAAAAAAAAKaEABgAAAAAAAEgJBTAAAAAAAABASiiAAQAAAAAAAFJCAQwAAAAAAACQEgpgAAAAAAAAgJRQAAMAAAAAAACkhAIYAAAAAAAAICUUwAAAAAAAAAApoQAGAAAAAAAASAkFMAAAAAAAAEBKKIABAAAAAAAAUkIBDAAAAAAAAJASCmAAAAAAAACAlFAAAwAAAAAAAKREkRUAAACwrUpLSwuGDRvWfMCAAS26du3avKysrLiioqKkZcuWzZs1a1bcvHnz0tLS0rJsNtusuLi4ebNmzUoLCgo+8/eijY2N9Zs3b66pra2tqqur21xTU1NdVVVVs2nTptqNGzdWbdiwoeYvf/nL5hUrVlQtWLBgw6xZs6pqamoaJQYAAEDaKYABAACIiIghQ4aUHnTQQW379u3bql27dq3at2/fpkWLFq2bN29eWVpa2qpZs2bNCwsLm2ez2fLCwsLyoqKi8sLCwtKknK+hoaG6vr6+qqGh4S91dXV/aWhoqNq8eXNVTU3NuqqqqvUbNmxYu2rVqjWrV69e99Zbb6177rnnPpgzZ06NTwYAAABJogAGAADIA8OGDWt+xBFHdBwwYECnLl26dGjdunXHFi1adCgtLe1YUlLSvlmzZq0KCgqK07yDwsLCssLCwrKIaPdp/zuNjY21mzdvXrdp06ZVNTU172/YsGHl2rVr31+2bNnKBQsWrHjyySffnzVrVpVPGAAAAE1Fpuexsd9HfaF+ZcSal0ptCAAAIAE6deqUPf744zvtueeeXbp3796lbdu2XSorKzuXlpZ2KS0t7VBYWFhhSztGQ0PDxpqampU1NTXL169fv+yDDz5Y9s477yybPXv2sj/96U8rVqxYUWdLAAAAbE9t9q6Jog4f/TUFMAAAQEJks9nMt7/97Y4jRozo1bdv397t2rXrXl5e3rWsrKxzcXFx+4gosKUmp7G2tnZVTU3Nso0bNy5btWrV0tdff/2tJ598cvG999672noAAADYFgpgAACAhPne977X6a9Fb/v27Xu1bNmyV1lZWa8kvXOXLauvr9/wl7/8ZdG6desWL1u2bNHChQsX/fGPf1w8derUjbYDAADAliiAAQAAmqhsNps59dRTuxx66KH9+/Tp87n27dv3Ly8v719UVOSRzXlq06ZNKzZu3Pj6+++//8abb775xqOPPvrG3XffvcpmAAAA+CsFMAAAQBNx6qmndvniF784qHfv3v3btWv3uYqKis8VFhaW2wxbUl9fv37Dhg1vfPDBB68vXrz4jccee2z+jTfeuNxmAAAA8pMCGAAAYBc45phjWn/rW9/aq3///kPatGnTv6Kiop9HOLO9NDQ0VG/cuPGtNWvWLFy4cOGcO+6445WHHnporc0AAACknwIYAABgJzjjjDO6f+lLX9qrV69eg1u3bj2orKysR0RkbIadJFddXb103bp18xcvXjz30UcffeXqq69+x1oAAADSRwEMAACwnZWWlhb86le/2u3QQw8d1r17931btmw5qLCwsMxmaEoaGhqqP/zww/nvvPPOzGeeeWbW2LFj36ipqWm0GQAAgGRTAAMAAGwHP/7xj7t+9atf3bdXr15D27Ztu1c2m21jKyRJXV3dmg8++OCVRYsWvfznP/95xh/+8IdltgIAAJA8CmAAAIBtcOKJJ7Y75ZRTDujXr9+w1q1bD81ms61shTSpq6tbt3bt2pfffPPNWbfccsvUe++9d7WtAAAANH0KYAAAgE+hoqKi4IILLhg0YsSI/bp27bpfy5YtB2YymUKbIR/kcrmGDz/8cP6777474/nnn59x4YUXvrZx40aPiwYAAGiCFMAAAAAf4/jjj2/7/e9//8D+/fsf2Lp1630KCgpKbAUiGhsbN61fv37eW2+9NeWGG2545u67715lKwAAAE2DAhgAAOB/ZLPZzAUXXPC5I4888sDu3bsfWFFRsVtEFNgMbFl1dfWSd999d8qsWbNmnnvuuS+vW7euwVYAAAB2DQUwAACQ10pLSwsuvfTSQYcccsjBXbt2HVFWVtbDVmDb1dbWrnr//fdfmDp16uRf/vKXL65evbreVgAAAHYeBTAAAJB3Bg0aVHrBBRd8fs899zywQ4cOBxQVFbWwFdj+Ghsba9euXTtrzpw5T59//vmTX3755WpbAQAA2LEUwAAAQF4YNmxY8/POO+/gIUOGHOZ9vrDz/W0ZfNFFFz07a9asKlsBAADY/hTAAABAarVq1arwyiuv3HfEiBEjO3TocFBhYWGZrcCu19DQUP3+++8/O2XKlIk/+clPZm7cuLHRVgAAALYPBTAAAJAqrVq1Kvztb3+7/3777Xd4x44dRxQWFpbbCjRdDQ0NG99///0pM2bMeOqHP/zhC8pgAACAz0YBDAAApMJZZ53V45vf/OaRvXr1GllaWtrVRiB5ampq3l28ePHEO++8c9LVV1/9jo0AAABsPQUwAACQWMOHDy+/6KKLvjB48OCjW7RoMdBGID0+/PDDV+fNmzfhvPPOe3L69Ol/sREAAIBPRwEMAAAkSqtWrQpvuOGGQ/bbb79/atOmzX6ZTCZrK5BeuVyubs2aNTNmzJjx2JgxYyavW7euwVYAAAA+ngIYAABIhB//+Mddv/e9732lZ8+e/1RcXNzWRiD/1NbWfvD2228/dssttzz029/+9l0bAQAA+L8UwAAAQJNVUVFRcO21137+4IMPPrZ169b7ZTKZAlsBIqJxzZo1M59//vnxp5122hR3BQMAAPx/CmAAAKDJOeWUUzqefvrpx/bu3ftL2Wy2jY0AH6e+vn7j0qVLH/vd7373x+uvv36ZjQAAAPlOAQwAADQJ2Ww2c+uttx5wyCGHnNC6deu9I8LdvsDWaFy7du1L06ZN+/OPfvSjZ1evXl1vJQAAQD5SAAMAALtU//79S6655pp/2nPPPY8tLy/vayPAZ1VTU7NswYIF488999wHp06dutFGAACAfKIABgAAdomf//znPU855ZQTu3btemRhYWGZjQDbW2NjY92KFSuevOWWW+689NJLF9kIAACQDxTAAADATuMxz8Cusn79+rlPP/30f5188slT6+rqcjYCAACklQIYAADY4fr27Vv8hz/84a+Pee5nI8CuUlNT8+68efPu/8EPfvDgwoULN9kIAACQNgpgAABghxkyZEjpNddc89XBgwefWFxc3MFGgKaitrZ21dy5c+/5yU9+8uc5c+bU2AgAAJAWWyqAPYoNAADYJqNHj+4wb968n06ZMuXRYcOGnaH8BZqa4uLi9sOGDTtjypQpj86bN++nJ510UntbAQAA0s4dwAAAwFY599xze33/+9//dufOnY/IZDJZGwGSIpfL1S1fvvzJG2644fbLLrvsbRsBAACSyiOgAQCAz+y8887r+53vfOfbHTt2PDyTyRTaCJBUuVyuYcWKFU/cdNNN//XrX/96sY0AAABJowAGAAC22WWXXTboG9/4xg9at249zDaAtFm7du2su++++9pzzjnnNdsAAACSQgEMAABsNcUvkE8UwQAAQJIogAEAgE9N8Qvks7Vr18665557rvv5z38+3zYAAICmaksFcGHlwOj6UV9orIqoWZG1PQAAyBO/+MUvet9xxx3nHHrooT8pLS3tYiNAPiotLe2y7777HvP973+/X1lZ2ZIpU6assxUAAKCpKetcHwXlH/01BTAAAOS5M844o/u99957zpe//OWflZeX94qIjK0AeS5TXl7e8+CDDx71/e9/v3dEvDVjxowPrQUAAGgqFMAAAMD/ceKJJ7a77777fjJq1Kh/KS8v7xOKX4B/lCkvL+99+OGHj/rWt77VfvXq1Qvnz59fbS0AAMCutqUC2DuAAQAgzwwdOrTs+uuvP6l///4nFRYWltkI20NjY2Ns2rQpqquro6amJurr62PTpk2xefPmqK+vj+rq6qivr4/NmzfHpk2boqGhYZv/fxUWFkZJSUk0a9YsioqKoqysLIqKiqJZs2ZRUlISRUVFUVpa+r9/FRQUCIjtoqGhoeq11167a8yYMffMmTOnxkYAAIBdZUvvAFYAAwBAnujUqVP2nnvuGbXXXnudnM1mK22Ej9PQ0BAbN26MDRs2/J+/Nm7cGBs3boyamprYtGlTbNq0KWpqaqK2trbJnqe4uDhKSkqitLT0f/9eUVERFRUV0aJFi//zV0VFRRQWFvog8LHq6urWvvjii7eceOKJf169enW9jQAAADubAhgAAPLcXXfdddAXv/jF00tLS7vZRn7L5XKxYcOGWLt2baxbty7Wrl37d3+tW7cuNmzYkPd7atGiRbRu3TpatWoVrVu3jjZt2vzvf27dunW0aNHCh4morq5e+sgjj1zzne98Z6ptAAAAO5MCGAAA8tTVV189+MQTTzyzoqJioG3kj8bGxli5cmUsX748Pvjgg1i9evX//n3t2rXR2NhoSZ9RYWFhtGrVKtq1axdt27b937937tw5OnTo4LHTeWbDhg3z77333qvOPPPMebYBAADsDApgAADIM1/72tfaXHrppad27979qIjQRKVUQ0NDrFq1KlasWBHvv//+//595cqVTfqRzGlXXFwcHTp0iI4dO0bnzp2jY8eO0alTp2jXrp1HS6dYLpdrfOeddx76+c9/fv2ECRPW2QgAALAjKYABACBP9OrVq9ldd931jT322OM7hYWFZTaSHh9++GG88847sXTp0njvvfdixYoVsXr16mhoaLCchCgsLIz27dtHp06dolu3btG9e/fo3r27x0mnTENDQ9W8efNu++Y3v/nHJUuWbLYRAABgR1AAAwBAHrjrrrtG/NM//dOZJSUlXWwj2davXx9Lly6Nd955539L3w8//NBiUqqysvJ/y+C//tWqVSuLSbiamppljz322G9Gjx49xTYAAIDtTQEMAAAp9qtf/arPD3/4w5+1atVqL9tIno0bN8aSJUvirbfeikWLFsV7770XmzZtspg8V1JSEl27do0+ffpE3759o3fv3lFeXm4xCbRu3bqXr7322ivGjh27yDYAAIDtRQEMAAApNGjQoNI77rjju7vttttJBQUFWRtJhtWrV8ebb74ZixcvjiVLlsTy5cujsbHRYtiigoKC6Ny5c/Tu3Tt69+4d/fr1i7Zt21pMQjQ2Nta98cYbd33rW9+6ff78+TU2AgAAfFYKYAAASJHS0tKCBx988Jj99tvvn7PZbBsbaboaGhri7bffjrfeeisWLFgQS5YscXcv201FRUX06tUr+vbtG3379o2ePXtGYWGhxTRhdXV1a2bMmHHjV77ylYdqamr85gcAALDNFMAAAJASp59+erdf/vKX51ZWVu5jG03T6tWr47XXXouFCxfGm2++GRs3brQUdooWLVpE3759Y8CAATFw4EB3CDdh69evf/E//uM//vPqq69+xzYAAIBtoQAGAICEGzRoUOm99977w969ex+byWTc4teErF+/PubNmxcLFiyIN954Q+FLk9GiRYvo169fDBgwIPbYY4+orKy0lCYkl8s1LF68eNyJJ554rcdCAwAAW0sBDAAACXbNNdcMOemkk35RVlbWyzZ2vVwuF++++27MnTs3XnvttViyZIl3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B7lcrm7y5Mm//vKXv/yIbQAAwK63pXcAK4ABAMg7paWlBTNnzjyzT58+x9vG39uwYUOMGzcuZsyY4VHPQF7KZDKx3377xde//vWoqKiwkH+waNGiP+27775X1dTUeCwEAADsQgpgAAD4H926dctOnjz5V506dRppG/9fLpeLqVOnxp///OfYuHGjhQB5r6KiIkaNGhX777+/x0L/g+XLlz9+6KGHXvLuu+/W2QYAAOwaWyqAvQMYAIC8MXz48PInnnjiynbt2o2wjf/vnXfeiWuvvTaee+652Lx5s4UARMTmzZtjzpw58dprr0XPnj2jRYsWlvI/Kioq+n7rW98aMnXq1Ofee+89f3AAAMAusKV3ACuAAQDIC9/+9rc73n777X9o0aLFANv4b1VVVXHXXXfFvffeG+vXr7cQgI+wbt26eP7552P9+vWx2267RVFRkaVERElJSefjjjvuoA8++GDKK6+88hcbAQCAnUsBDABAXjv//PP7XXzxxX8oKSnpbBv/bfr06XHttdfGokWLLAPgU3jnnXdi2rRp0bp16+jc2R8nERHZbLbyC1/4whElJSUvTp48eY2NAADAzqMABgAgb/3ud7/b60c/+tFVRUVFrWwjYs2aNXHzzTfHpEmTora21kIAtkJtbW289NJL8c4770Tfvn2jtLQ073dSWFhYNnz48C/26dNn4UMPPbTMpwQAAHYOBTAAAHnp1ltv3f+b3/zmfxYWFjbP913kcrl4/vnn4/rrr4/ly5f7cAB8BitXroxp06ZFRUVFdOvWLTKZTF7vo6CgIDto0KBDBw0atOiBBx54xycEAAB2vC0VwJmex8Z+H/WF+pURa17ym6wAACTTww8//KXDDjvsXzKZTN6/rPGDDz6I22+/Pd544w0fDIDtbMCAAfGtb30r2rRpk/e7yOVyjVOmTPn1yJEjH/LJAACAHavN3jVR1OGjv6YABgAgdV555ZXTPve5z30r3/fQ0NAQjz32WDz++ONRV1fngwGwg2Sz2Tj66KPjC1/4QhQUFOT9Pl5//fU79tprr9/7ZAAAwI6jAAYAIC9ks9nMyy+/fFafPn2Oz/ddvPvuu3HbbbfFe++954MBsJN069YtvvOd70S3bt3yfhdLliy5f5999rmypqam0ScDAAC2PwUwAACpV1paWjBr1qyzevfufVw+7yGXy8WTTz4ZDz74oLt+AXaBbDYbxxxzTBxxxBF5fzfw0qVLHxg6dOjlSmAAANj+FMAAAKRar169mk2ePHlsu3btDsrnPaxcuTJuueWWePvtt30oAHaxnj17ximnnBIdOnTI6z2sXr16yiGHHPIvS5Ys2exTAQAA28+WCuDCyoHR9aO+0FgVUbMia3sAADRpQ4cOLXvqqacub9Omzf75uoNcLhfPPPNMXH/99bF27VofCoAmYP369TFlypQoKSmJnj17RiaTycs9NG/evPtJJ500ZPLkyc+sWLHCoykAAGA7KetcHwXlH/01BTAAAIk1ZMiQ0kceeeSKVq1a7Z2vO6iuro7bb789nnjiiWhs9IRNgKaksbEx5s+fH++//34MGDAgstn8/DlLaWlpp6997WuDn3rqqadXrlxZ75MBAACfnQIYAIDUOfTQQ1s8+OCDv2/ZsuUe+bqDOXPmxNVXX+2RzwBN3PLly+OFF16Ijh075u0joUtLSzudcMIJ+7/00ktPv/3227U+FQAA8NkogAEASJVhw4Y1v++++37TsmXLQfl4/vr6+hg/fnz88Y9/jNpaP0MHSILNmzfHiy++GJs3b47ddtstCgoK8m4HxcXFbY866qg9n3vuuaeXL1/ucdAAAPAZKIABAEiNI488snLcuHG/b9GixcB8PP97770XV111VcyZM8eHASCBFi1aFC+//HL069cvWrRokXfnLykp6XDcccftP2fOnGcWLVq0yScCAAC2jQIYAIBUOPLIIyvvvPPO35aXl++Wj+d/+umn48Ybb4wPP/zQhwEgwf7yl7/ECy+8ECUlJdGrV6+8O3+zZs3aHHXUUfspgQEAYNspgAEASLxjjz227W233faH5s2b98m3s1dVVcXNN98cTz31VDQ2NvowAKRAY2NjzJ8/P5YtWxYDBgyIZs2a5dX5mzVr1uaYY4458M0333xm4cKFNT4RAACwdRTAAAAk2qGHHtritttuuzofy9+33347rrnmmli8eLEPAkAKvf/++/HKK69Enz59orKyMq/Ons1mK4888sh9Zs6c+dTSpUs3+zQAAMCnpwAGACCxjjjiiJb33nvvteXl5f3y6dy5XC4mTZoUN998c1RVVfkgAKRYVVVVTJ06NbLZbPTp0ycymUzenL24uLjtV7/61c+/8sorTy1evLjWpwEAAD4dBTAAAIl06KGHtrj33nt/l2/lb3V1ddx0000xefLkyOVyPggAeSCXy8WCBQvi3Xffjd133z2y2fz5mUyzZs1aH3300fvNmDHjSXcCAwDAp6MABgAgcYYOHVo2fvz4qysqKgbk07mXLVsWV111lUc+A+SplStXxiuvvBKf+9znoqKiIm/O3axZszZHH3300GeeeebJFStW1PkkAADAlimAAQBIlCFDhpQ++uij17Rs2XL3fDr31KlT49prr42NGzf6EADksaqqqpg+fXq0bds2unTpkjfnLikpaT9q1KihTz755JMrV66s90kAAICPt6UCuMB6AABoSjp16pSdMGHCv1dWVu6RL2dubGyMcePGxR133BF1dW56AiCitrY2br755hg/fnw0NjbmzbkrKyv3mDBhwr9369bNXQkAALCNFMAAADQZrVq1Kpw+ffolbdq02T9fzlxdXR2/+93vYtKkSd73C8DfyeVy8fjjj8fvf//7qK6uzptzt2nTZv8pU6Zc0qpVq0KfAgAA2HoKYAAAmoSKioqC2bNnX9KuXbuD8uXMS5cujYsuuijmz5/vAwDAx3r11VfjoosuiqVLl+bNmdu1a3fQ7Nmz/72iosLPrgAAYCu5iAYAoEmYOXPmz9q1a3dIvpz35ZdfjiuuuCLWrVsnfAA+0bp16+KKK66Il19+OW/O3K5du4Nnzpz5M+kDAMDWUQADALDLvfjii2N69OgxKh/Omsvl4oEHHogbbrghamtrhQ/Ap1ZbWxs33HBDPPDAA3nz2oAePXqMevHFF8dIHwAAPj0FMAAAu9SkSZO+NnDgwFPy4ax1dXVx8803x8SJE73vF4BtksvlYuLEiXHLLbdEXV1dXpx54MCBJ0+aNOlr0gcAgE9HAQwAwC7z6KOPHnXggQeekw9nXbduXfz617+OWbNmCR6Az2zmzJnx61//Ol9eJZA58MADz3n00UePkjwAAHyywsqB0fWjvtBYFVGzImtDAADsEDfeeOO+Rx999EWZTKYw7Wddvnx5XHXVVbFy5UrBA7DdbNiwIWbPnh0DBw6MioqKtB8307179/179uz56sMPP7xc+gAA5LuyzvVRUP7RX1MAAwCw011xxRV7fPe7372qoKCgWdrPOmfOnPjtb38bGzduFDwA2111dXVMmzYtOnfuHB07dkz1WTOZTOHuu+9+eJs2bV6aNGnSKukDAJDPFMAAADQZZ5xxRvef/exnvy0sLCxP+1knTJgQd999d9TX1wsegB2moaEhXnrppchms9G3b99UnzWTyRTttddeB/3lL395dubMmRukDwBAvlIAAwDQJBx00EEVf/jDH64pLi7ulOZz5nK5eOCBB+Kxxx4TOgA77c+eBQsWRF1dXfTv3z8ymUxqz1pQUFBywAEHDJs+ffqkpUuXbpY+AAD5aEsFcIH1AACwMwwaNKj0vvvuu7qsrKxXms9ZV1cX1113XUyaNEnoAOx0EydOjOuvvz7q6upSfc6ysrJef/rTn67u379/idQBAODvKYABANjhKioqCh577LGLKyoqBqb5nNXV1XHNNdfE7NmzhQ7ALvPKK6/ElVdeGVVVVak+Z4sWLQZOnDhxbEVFhZ9vAQDA33CBDADADjdz5syftW3b9sA0n3HdunVx2WWXxRtvvCFwAHa5xYsXx2WXXRZr165N9TnbtWt34MyZM38mcQAA+P8UwAAA7FBPPvnkqB49eoxK8xlXrVoVV1xxRSxfvlzgADQZK1asiCuuuCJWrlyZ6nP26NFj1KRJk0ZJHAAA/lth5cDo+lFfaKyKqFmRtSEAALbZjTfeuO+XvvSlCzOZTGp/8fDdd9+NK6+8MtatWydwAJqc6urqmDVrVvTv3z8qKytTe85u3boN79mz57yHH37Yb2MBAJAXyjrXR0H5R39NAQwAwA5x3nnn9T311FOvLigoKE7rGV977bW45pprorq6WuAANFmbN2+OGTNmRI8ePaJ9+/apPGMmkykYNGjQIYWFhVOee+45v5UFAEDqKYABANipjjrqqFb/8R//8YdmzZq1SusZX3755bj++uujrq5O4AA0eQ0NDfHSSy9Fp06dolOnTqk8Y0FBQXbYsGGfnz9//qQ33nhjk9QBAEizLRXA3gEMAMB21a1bt+wNN9zwnyUlJR3TesYpU6bEjTfeGPX19QIHIDHq6+vjxhtvjKlTp6b2jCUlJZ1uuOGG/+jWrZu7GgAAyFsKYAAAtqunn376XyorK/dI6/kmTZoUd955ZzQ2NgobgMRpbGyMO+64I5588snUnrGysnLw008//UtpAwCQrxTAAABsN88///w3unTp8k9pPd/EiRNj3LhxkcvlhA1AYuVyubj//vtTXQJ36dLlS88+++yJ0gYAIB95BzAAANvFTTfdNPzII488L5PJZNJ4vsceeyzGjx8vaABS47XXXotmzZpF3759U3m+zp0779urV695Dz/88DJpAwCQNlt6B7ACGACAz+wXv/hF7x/+8IdXFxQUNEvj+R544IF45JFHBA1A6ixYsCDq6upiwIABqTtbJpPJDBo06ODGxsbnpk6dul7aAACkiQIYAIAd5oADDqj43e9+99tmzZq1TeP5xo0bF5MmTRI0AKm1aNGi2Lx5cwwcODB1ZysoKMjut99+w5577rnH33vvvc3SBgAgLbZUAHsHMAAA2yybzWbuvPPOfyktLe2exvNNmDBB+QtAXpg0aVI89NBDqTxbaWlpj3vuuedfstlsRtIAAOQDBTAAANvs+eef/06HDh0OTePZHn744Xj44YeFDEDeeOSRR+LPf/5zKs/WoUOHw5599tlvSxkAgHygAAYAYJvcd999hw8ePPjUNJ7t/vvvjwkTJggZgLzz2GOPxX333ZfKs+25554/+NOf/nSYlAEASDvvAAYAYKudccYZ3ceMGXN5QUFBcdrONnHixHjkkUeEDEDeWrx4cWSz2ejbt2/ajpbp06fPvn/5y18mz5w5c4OkAQBIsi29A1gBDADAVhk2bFjzG2+88Q/NmjVrl7azPfroo6l99CUAbI2FCxdGUVFR9OvXL1XnKigoKD7wwAP3e/LJJx9dsWJFnaQBAEiqLRXAHgENAMBWuffee39ZWlraPW3nevzxx+PBBx8UMAD8jz//+c8xceLE1J2rtLS0x3333fdLCQMAkFYKYAAAPrVJkyaN6tSp0xEpPFeMHz9ewADwD8aPHx+TJ09O3bk6der0hUmTJn1VwgAApJFHQAMA8Kmcd955fU888cR/z2QyRWk618yZM+Puu+8WMAB8jNdeey06duwYnTt3TtW5unbtuk9BQcHzzz333DopAwCQNN4BDADAZ3LEEUe0vOKKK67NZrOVaTrXyy+/HDfffHPkcjkhA8DHyOVyMXv27OjSpUt06tQpNefKZDJF++yzz/CpU6c+9u67726WNAAASeIdwAAAbLNsNpu55ZZb/q2kpKRjms61YMGCuPnmm6OxsVHIAPAJGhsb4+abb44333wzVecqLS3tcvfdd5+fzWYzUgYAIC0UwAAAbNGkSZO+3rZt2wPTdKZly5bFDTfcEPX19QIGgE+prq4urr322li+fHmqztWuXbsDH3/88VESBgAgLTwCGgCAj3XZZZcN+upXvzo2k8mk5hcH33///bjyyiujqqpKwACwlerq6uLll1+OIUOGRHl5eWrO1aVLl31LS0unPvPMM2ukDABAEngENAAAW61///4lJ5988q8ymUxRWs60YcOG+P3vfx8bN24UMABso40bN8bvfve7VP15WlBQkP3hD394ft++fYslDABA4q9vrQAAgI/y4IMPnl1WVtYrLeeprq6O3/zmN7Fq1SrhAsBntGrVqrjyyiujuro6NWcqKyvr8/DDD58lXQAAkk4BDADA/zF+/Pgju3XrdnRazlNfX5/KdxYCwK60fPnyuO6666K+vj41Z+rRo8dXx40bd4R0AQBIMgUwAAB/53vf+16nI4444py0nCeXy8Vtt90Wb7zxhnABYDt7/fXX47bbbotcLpeaMx155JHnfvvb3+4oXQAAkkoBDADA/6qoqCi4+OKLLywsLCxPy5nGjx8fs2bNEi4A7CCzZs2Khx56KDXnKSwsrPj1r399QUVFhZ+bAQCQSC5kAQD4XxMnThxdWVk5OC3nef7552PixImCBYAd7LHHHosXXnghNeeprKzc89FHHz1RsgAAJFFh5cDo+lFfaKyKqFmRtSEAgDxxwQUX7DZq1KgLM5lMYRrO8+qrr8Ytt9ySqkdSAkBT/7O3d+/e0a5du1Scp2PHjkNzudxzU6ZMWSddAACamrLO9VHwMc/wcwcwAADRt2/f4h//+McXZzKZVPwG4HvvvRc33HBDNDY2ChcAdpKGhoa47rrrYtmyZak4T0FBQfbss88e27dv32LpAgCQqGtZKwAAYPz48T8qKyvrkYazbNiwIX7/+99HbW2tYAFgJ9u0aVP8/ve/j40bN6biPGVlZb3GjRs3RrIAACSJAhgAIM/ddNNNw/v06XN8Gs5SX18f1157baxdu1awALCLrFmzJq699tqor69PxXn69ev3jd///vdDJQsAQFIogAEA8thBBx1Uceyxx/5rRGTScJ477rgjFi9eLFgA2MUWLVoUd955Z1qOU/CNb3zj34YNG9ZcsgAAJOIC1goAAPLXzTfffFZxcXG7NJxl4sSJMX36dKECQBMxbdq0mDRpUirOUlJS0unOO+88Q6oAACSBAhgAIE/913/914FdunT5UhrO8tprr8Wf//xnoQJAEzN+/PhYsGBBKs7SrVu3o2+66abhUgUAoKlTAAMA5KEvfelLlV/5yld+lYazrFixIq6//vpobGwULAA0MY2NjXHdddfFihUr0nCczHHHHfergw46qEKyAAA0ZQpgAIA8dPXVV5+ezWYrk36OmpqauPbaa2PTpk1CBYAmatOmTXHttddGTU1N4s+SzWbb3njjjT+RKgAATZkCGAAgz9x6663Du3Tp8uWknyOXy8Utt9wSK1euFCoANHErV66MW2+9NXK5XOLP4lHQAAA0dQpgAIA8MnTo0LKvfvWrv0jDWSZMmBBz584VKgAkxJw5c+Kxxx5LxVlGjRr1i6FDh5ZJFQCApkgBDACQR+64444fFRcXd0z6OV5++eV45JFHBAoACfPQQw+l4he4SkpKOt5xxx0/lCgAAE2RAhgAIE9cfvnlu/fs2XNU0s/xwQcfxB133JGKR0gCQL7J5XJx2223xZo1axJ/lp49ex57+eWX7y5VAACaGgUwAEAe6NatW/a73/3uv2YymURf/9XX18cNN9wQ1dXVQgWAhKqqqoobb7wx6uvrE32OTCZT8N3vfvdX3bp1y0oVAICmRAEMAJAHxo8ff0pZWVmvpJ/jnnvuiaVLlwoUABJuyZIlcd999yX+HGVlZT3Hjx9/ikQBAGhKFMAAACn385//vOeAAQNGJ/0c06dPjylTpggUAFJi8uTJMWPGjMSfY8CAAaN//vOf95QoAABNhQIYACDFstls5qyzzjo3k8kk+tGEK1asiLvvvlugAJAyd911V6xYsSLRZ8hkMtmzzjrr3Gw2m5EoAABNgQIYACDFxo0b98XKysq9knyG2trauOGGG6K2tlagAJAyf/1zfvPmzYk+R2Vl5V7jxo0bKVEAAJoCBTAAQEoNHz68/OCDDz4t6ee4//77Y/ny5QIFgJRavnx5jBs3LvHnGDFixI+HDRvWXKIAAOxqCmAAgJS69dZbT8tms22TfIYZM2bEc889J0wASLnJkyfHzJkzE32G4uLitrfffvtp0gQAYFdTAAMApNBVV121R48ePb6S5DOsXLky7rrrLmECQJ64++6744MPPkj0GXr27PnVK664Yg9pAgCwKymAAQBSprS0tOAb3/jGT5N8rdfY2Bi333679/4CQB6pqamJ2267LRobG5N8jIJvfvObZ5aWlvqZGwAAu+6i1AoAANJlwoQJX6uoqBiQ5DOMHz8+Fi1aJEwAyDNvvvlmPPjgg4k+Q4sWLQY9+OCDx0gTAIBdRQEMAJAiRx55ZOWwYcN+kOQzzJ07N5544glhAkCemjhxYixYsCDRZxg+fPiPjjjiiJbSBABgV1AAAwCkyBVXXHFyUVFRRVLnr6qqijvvvDNyuZwwASBP5XK5uP3226O6ujqxZygqKmrxm9/85mRpAgCwKyiAAQBS4vzzz+/Xu3fv45J8httvvz0+/PBDYQJAnlu3bl3cfvvtiT5D7969jz///PP7SRMAgJ1NAQwAkALZbDZz6qmn/jyTyST2+m769OkxZ84cYQIAERExe/bsmDFjRmLnz2QyBaeeeurPs9lsRpoAAOxMCmAAgBT44x//eERlZeXgpM6/du3auPfeewUJAPyde+65J9atW5fY+SsrKwf/6U9/+oIkAQDYmRTAAAAJ17dv3+JDDjnkR0k+w9133x01NTXCBAD+Tk1NTdx9992JPsPBBx/8o759+xZLEwCAnUUBDACQcHfdddc3S0pKOiV1/smTJ8e8efMECQB8pLlz58azzz6b2PlLSko63nPPPd+SJAAAO4sCGAAgwb70pS9VDhw48KSkzr9mzZoYP368IAGALXrggQdizZo1iZ2/f//+Jx111FGtJAkAwM6gAAYASLArrrji1MLCwvIkzp7L5eK2226LTZs2CRIA2KJNmzbFbbfdFrlcLpHzFxYWll1++eU/kCQAADuDAhgAIKF+8Ytf9O7evftXkjr/s88+G2+88YYgAYBP5Y033ojnn38+sfN369bt6F/96ld9JAkAwI6mAAYASKgf/vCHP8pkMom8nvvggw/igQceECIAsFXGjRsX69atS+TsmUym4NRTT/2xFAEA2NEUwAAACXTdddcNa9eu3YFJnD2Xy8Udd9wRtbW1ggQAtsqmTZvizjvvTOz8bdq02f+mm27aT5IAAOxICmAAgIQpLS0t+NrXvnZ6Uud/4YUXYuHChYIEALbJq6++GjNmzEjs/Mccc8zpFRUVfiYHAMAO42ITACBhbr/99oMrKip2S+LsGzZsiHHjxgkRAPhM7r///qiqqkrk7OXl5X3/67/+6wgpAgCwoyiAAQASpKKiouCwww47Nanz33vvvYn9YS0A0HRs2LAh7r///sTOf9BBB/1zq1atCiUJAMCOoAAGAEiQ+++//+iysrKeSZx9zpw58dJLLwkRANguXnjhhViwYEEiZy8tLe32xz/+8StSBABgR1AAAwAkRN++fYv33Xfff07i7LW1tXHvvfcKEQDYru6+++6oq6tL5Oz77bffKf379y+RIgAA25sCGAAgIW6++eZRxcXFbZM4+yOPPBJr164VIgCwXa1atSoee+yxRM6ezWbb3njjjV+TIgAA25sCGAAgAYYOHVq21157fSeJs7/33nvxxBNPCBEA2CEmTpwYK1asSOTsQ4YM+c7QoUPLpAgAwPakAAYASIBrr732xKKiosqkzZ3L5eKee+6JxsZGIQIAO0R9fX3cddddkcvlEjd7UVFR5bXXXnuCFAEA2J4UwAAATdwBBxxQMWDAgG8kcfYZM2bEW2+9JUQAYId6880348UXX0zk7AMGDPjG8OHDy6UIAMD2ogAGAGjirrrqqhOKiooqkjb3pk2b4oEHHhAgALBT3H///VFbW5u4uYuKilpcffXV7gIGAGC7UQADADRhBx10UEX//v0Teffvww8/HB9++KEQAYCdYv369TFhwoREzj5w4MBvHHDAARVSBABge1AAAwA0Yf/5n/95bGFhYfOkzb1q1aqYPHmyAAGAnerpp5+O1atXJ27uwsLC8ssuu2yUBAEA2B4UwAAATdQBBxxQMWjQoNFJnP3uu++O+vp6IQIAO1V9fX3cddddiZx99913/+bQoUPLpAgAwGelAAYAaKIuv/zyYwsLC8uTNvfcuXNjwYIFAgQAdokFCxbE3LlzEzd3UVFRi9/97ndflyAAAJ+VAhgAoAkaOnRo2aBBgxL37t+6urr405/+JEAAYJf605/+FHV1dYmbe/fdd//mkCFDSiUIAMBnoQAGAGiCfvOb33ylqKioZdLmfu655xL53j0AIF1Wr14dzz33XOLmLioqann11VcfLUEAAD4LBTAAQBPTq1evZoMHD/5m0uaurq6ORx55RIAAQJPwyCOPRHV1deLmHjJkyLe6deuWlSAAANtKAQwA0MTcdNNNxxQXF7dN2twTJkyIqqoqAQIATUJVVVUifzmtuLi43a233uouYAAAtpkCGACgCWnVqlXhXnvtdVLS5l61alU8++yzAgQAmpTJkyfHqlWrEjf30KFDR7dq1apQggAAbAsFMABAE3LLLbccXlJS0jlpcz/44INRX18vQACgSamvr48HH3wwcXOXlJR0vummmw6VIAAA20IBDADQRGSz2cwBBxzw7aTNvWjRonjppZcECAA0SS+99FIsXrw4cXOPGDHiO9lsNiNBAAC2lgIYAKCJuOaaa/YuLy/vm7S5H3roocjlcgIEAJqkXC6XyLuAy8vL+1111VV7SRAAgK2lAAYAaCK+8pWvfDdpM8+bNy8WLlwoPACgSVu4cGG8+uqrrg8BAMgLCmAAgCbgsssuG1RZWblPkmbO5XIxfvx44QEAifDAAw8k7qklrVu33veSSy7pLz0AALaGAhgAoAkYNWrUCUmbefbs2bFs2TLhAQCJsGzZsnjllVcSN/cJJ5xwovQAANgaCmAAgF3sn//5nzt37NjxiCTN3NjYGA888IDwAIBEGT9+fDQ0NCRq5k6dOn1h9OjRHaQHAMCnpQAGANjFfvSjH30tk8kk6rps2rRpsWrVKuEBAImyatWqeOGFFxI1cyaTKfzpT386SnoAAHxaCmAAgF1o0KBBpX369Plqkmaur6+PCRMmCA8ASKQJEyZEXV1dombu27fvV/r27VssPQAAPg0FMADALnTZZZcdXlRUVJGkmadOnRpr164VHgCQSOvXr48pU6YkauaioqLK3/zmN0dIDwCAT0MBDACwi2Sz2cy+++57UpJmrqurc/cvAJB4jz76aOLuAt5///1PymazGekBAPBJFMAAALvI1VdfPbSsrKx3kmaeMmVKbNiwQXgAQKJt2LAhnn/++UTNXFZW1ueqq67aS3oAAHwSBTAAwC7y5S9/+bgkzVtfXx8TJ04UHACQCo8//nji7gL+0pe+dLzkAAD4JApgAIBdYPTo0R3atm07IkkzT5s2LdatWyc8ACAVPvzww5g+fXqiZm7fvv2I0aNHd5AeAABbogAGANgFfvrTn47KZDKFSZm3vr4+HnnkEcEBAKnyyCOPRH19fWLmzWQyhT/96U+/JjkAALZEAQwAsJN16tQp26dPn6OTNLO7fwGANFq3bl1MmzYtUTP36dPnmE6dOmWlBwDAx1EAAwDsZFddddUB2Wy2dVLmbWxsjEmTJgmOVOvYsWN06OCJmgD5aNKkSdHY2JiYebPZbOurrrrqAMkBAPBxFMAAADvZiBEjvp6keV988cVYtWqV4Ei1Ll26xIUXXhinnXZadO3a1UIA8siqVavipZdecj0JAEBqKIABAHaiM844o3tlZeXeSZk3l8vFxIkTBUdeyGQyMXjw4PjVr34VY8aMcUcwQB55/PHHI5fLJWbeysrKvc8444zukgMA4KMogAEAdqJTTjnlqxGRScq8CxYsiPfee09w5JVMJhN77713XHjhhTFmzJho3769pQCk3HvvvRcLFy5M1B9X/3NdCQAA/4cCGABgJ+nVq1ezXr16fTlJM3v3L/nsr0XwBRdcECeffHK0bdvWUgBSLGnXPb169fpyr169mkkOAIB/pAAGANhJrrjiioOLiopaJmXeBN4JAztEYWFhDB8+PC688MIYPXp0VFZWWgpACi1YsCCWLVuWmHmLiopaXnnllYdIDgCAf6QABgDYSYYPH/6VJM2btHfhwY5WVFQUI0aMiEsuuSRGjx4dLVu2tBSAFMnlcvH4448naub99tvvK5IDAOAfKYABAHaC0aNHd6isrByalHnXrl0bL7/8suDgI/y1CL744ovjhBNOiBYtWlgKQEq89NJLsW7dusTMW1lZudfo0aM7SA4AgL+lAAYA2AlOP/30o5J07fXMM89EQ0OD4GALiouL47DDDouxY8fGqFGjoqyszFIAEq6hoSGeeeaZJI1c8D/XmQAA8P8vEq0AAGDHymazmX79+n05KfPW1tbGlClTBAefUnFxcYwcOTIuvfTSGDVqVJSWlloKQII9//zzUVtbm5h5+/Xr9+VsNpuRHAAAf6UABgDYwX7zm9/sWVJS0jkp886YMSOqq6sFB1uppKQkRo4cGZdcckkcffTRUVJSYikACVRdXR0zZ85M0p8/na+44orBkgMA4K8UwAAAO9gXvvCFLyVl1lwuF08//bTQ4DNo3rx5HHXUUXHJJZfEyJEjI5vNWgpAwjz11FORy+USM++RRx75ZakBAPBXCmAAgB1oyJAhpZ07dz4iKfO+/vrrsWLFCsHBdlBeXh6jRo2KSy+9VBEMkDArVqyI119/PTHzdunS5fD+/ft79AQAABGhAAYA2KHGjh17aGFhYWJeCOruX9j+KioqYtSoUXHxxRfH4YcfHkVFRZYC4LpouyosLGz+H//xHwdLDQCACAUwAMAOteeeex6ZlFnXrl0b8+bNExrsIK1atYrjjz8+LrroohgxYkQUFPh2DKApmzdvXqxZsyYx8+61115HSg0AgAgFMADADnPMMce0bt269b5Jmfe5556LxsZGwcEO1qZNmxg9enRcfPHFimCAJqyxsTGee+65JP35MvyYY45pLTkAAPykAQBgBznzzDMPz2Qyibje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FpafffbZvaQFAJA+CmAAgE9p//3375+EOV9//XVhAXmjvLw8Ro0aFf/+7/8eI0eOjGw2aymA67FP6fOf//xAaQEApI8CGADgU+rRo8fuTX3G2traePvtt4UF5J2KiooYNWpUXHzxxXH44Yc3+XdvAum2ePHiRLySo1evXoOkBQCQPgpgAIBPqXXr1k3+DoklS5ZEQ0ODsIC81apVqzj++OPj4osvjhEjRkRBgW97gZ2voaEhlixZ0uTnbNOmjQIYACCFfCcMAPApDBkypLR58+a9m/qcb775prAAIqJ169YxevToGDt2rCIYcF32MZo3b95n0KBBpdICAEgX3wEDAHwKp556av9MJtPkr53eeustYQH8jTZt2sTo0aPjvPPOi+HDhyuCAddlfyOTyRT84Ac/+Jy0AADSxXe+AACfwuDBg5v84/Hq6+tj0aJFwgL4CJ06dYqTTz45/u3f/i323nvvyGQylgLsUIsXL07Eqzn23HPPgdICAEgXBTAAwKfQpUuXAU19xnfeeSfq6uqEBbAFnTt3jjFjxiiCgR2utrY23n333SRc53oPMABAyiiAAQA+hZYtW/Zv6jN6/DPAp9elS5cYM2ZMnHvuuTF48GALAfL2+iwJ17kAAGwdBTAAwCcYPnx4eUlJSeemPqfHPwNsvV69esVpp50W55xzTvTvrwMB8u/6rLS0tPPw4cPLpQUAkB4KYACAT/Ctb31rt4ho8s8IXbx4sbAAtlGfPn3irLPOinPOOSd22203CwG2i4T8gl7m29/+dj9pAQCkhwIYAOAT7L777k2+CVi7dm1s2LBBWACfUZ8+feLss8+OM888M3r27GkhwGfy4Ycfxrp165r8nAMHDlQAAwCkSJEVAABsWadOnZr8D8TefvttQQFsRwMGDIgBAwbEggULYvz48bF06VJLAbb5Oq1Vq1audwEA2GkUwAAAn6CyslIBDJCnBgwYEP3794958+bFQw89FO+++66lAFtlyZIlsddeezX1613PvgcASBEFMADAFnTq1CnbvHnzXk19ziVLlggLYAfJZDIxePDg2GOPPeLll1+OBx98MFauXGkxQGqu05o3b967Xbt2RatXr66XGABA8nkHMADAFowZM6ZnJpPJNuUZGxsbPZoUYCfIZDKx9957x4UXXhhjxoyJ9u3bWwrwiZYuXRqNjY1NesaCgoLsqaee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k8nE7NmzY+LEibFmzRoNAXif/VNSzJo161kTAwBongTAAAC70O233/7KOeecszU/P78022sdMGBAtG/f3tWu0My9+uqrMWnSpFi1apVmALyPjh07xgEHHJCIWhsbG6u/8Y1v/NXUAACaJwEwAMAutHLlyob169fP6tat2+hsrzWVSsXhhx8ekyZNMjhohubMmROTJ0+OJUuWaAbAh3D44YdHKpVKRK3r16+fVVFR0WhqAADNU54WAADsWq+++mpirts77LDDDAyamTfffDP+/d//PX7yk58IfwE+pFQqFSNGjEhMva+88sozpgYA0Hw5AQwAsIvddNNNz5166qnV+fn5rbO91m7dukX//v1j4cKFBgc5btmyZfHYY4/F/PnzNQPgIzrggAOic+fOiai1sbFxy4033jjL1AAAmi8BMADALrZy5cqG8vLyGT179vx0Euo9+uijBcCQw5YvXx7jxo0T/AJ8wv1SUpSXlz9TXl7eYGoAAM2XABgAYDeYMWPGUxdccEEiAuAhQ4ZE69ato7q62uAgh6xcuTImTJgQc+fOjUwmoyEAH1ObNm3i0EMPTUy9zz777FOmBgDQvPkGMADAbvDVr371lYaGhk1JqLWgoCCOOOIIQ4McsW7duvj5z38ed955Z8yZM0f4C/AJjRw5MvLz8xNRa0NDw8abbrrpVVMDAGjenAAGANgNKisrm1atWjW9T58+5ySh3qOPPjqefPJJQREk2Pr16+Oxxx6L2bNn+3cZYBdJpVIxatSoxNS7cuXKadXV1WmTAwBo3pwABgDYTaZNm5aY6/c6duwYAwYMMDRIoA0bNsSvf/3r+Nd//dd49dVXhb8Au9CAAQOiY8eOian36aefftLUAAAQAAMA7CZf+9rX5tTX11ckpd6jjjrK0CBBqqqq4v77749vf/vb8eKLL0ZTU5OmAOxiRx55ZGJqra+vX/eNb3zjdVMDAMAV0AAAu0ltbW16xYoVT++///6fT0K9hx56aLRt2zaqqqoMD7LYli1bYsqUKfHcc8/F9u3bNQRgN2nbtm0MGTIkMfUuX778qdraWtc/AwDgBDAAwO70xz/+cUJSas3Pz4/jjjvO0CBL1dTUxKOPPhq33XZb/OUvfxH+Auxmxx57bOTn5yel3Myvf/3rCaYGAECEABgAYLe66667llZXV89PSr1HH310tGjRwuAgi7wd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qATAAABZ4umnn968fPnyxF3xN3r06GjXrp0BAgBZqUOHDnH88ccnru5ly5ZNmD59+hYTBADgoxIAAwBkkbvvvvtPmUymKUk1FxYWxumnn254AEBWOvPMMxP3yYpMJtN41113/dH0AAD4OATAAABZ5Be/+MWatWvXTkta3UcccUT06tXLAAGArNK7d+847LDDEld3eXn5X+6///51JggAwMchAAYAyDIPP/zwn5JWcyqVijPPPNPwAICsMmbMmEilUomr+8EHH/yT6QEA8HEJgAEAsszXv/71NzZs2DAraXUPHDgwDj74YAMEALLCoEGDYsCAAYmru6KiYuatt966wAQBAPi4BMAAAFlo3Lhxv01i3WPGjIm8PFtMAGDvysvLizFjxiSy9j//+c+/NUEAAD7RflgLAACyz/XXXz+nqqrqr0mru1evXnHUUUcZIACwVx1zzDHRvXv3xNW9adOmV2666aa5JggAwCchAAYAyFJ/+tOf7k1i3WPGjInS0lIDBAD2ijZt2sRZZ52VyNofeOCBe00QAIBPSgAMAJClbrrpprlJPAVcXFwcZ555pgECAHvFWWedFS1btkxc3Zs2bXrl5ptvnmeCAAB8UgJgAIAsNm7cuF8lse5Ro0ZF7969DRAA2KP69OkTI0eOTGTtjz322K9MEACAXUEADACQxcaOHTu7qqrqb0mrO5VKxfnnnx+pVMoQAYA9tv/4/Oc/n8j9R2Vl5d+uueaav5kiAAC7ggAYACDLTZ069bdJrLtv374xZMgQAwQA9ojDDjsssTeQTJ48+TcmCADAriIABgDIcpdeeumLVVVVryax9s9//vNRXFxsiADAblVaWhrnn39+Imuvqqr66+WXX/6SKQIAsKsIgAEAEuChhx76WRLrLisri9NPP90AAYDd6qyzzoqSkpIklp753e9+91MTBABgVxIAAwAkwA033DB3w4YNs5JY+3HHHRd9+vQxRABgt+jbt28cddRRiay9oqJi1te//vU3TBEAgF1JAAwAkBA///nPfxoR6aTVnUql4vOf/3zk5dl6AgC7Vn5+flx00UWRSqWSWH76F7/4xX+bIgAAu5q3cAAACXHHHXe8tW7duulJrL13795xzDHHGCIAsEudcMIJ0b1790TWXl5e/pc77rjjLVMEAGBXEwADACTI3XfffW8mk2lKYu1nnXVWtG3b1hABgF2iQ4cOcfrppyey9kwm03T33Xf/3BQBANgdBMAAAAlyzz33rCgvL386ibW3bNkyzj33XEMEAHaJc889N1q0aJHI2tesWTP1xz/+8UpTBABgdxAAAwAkzA9/+MOfZzKZhiTWPnz48Bg0aJAhAgCfyKGHHhpDhw5NZO3pdLrhBz/4wS9MEQCA3UUADACQMPfee+/qRYsWPZDU+i+++OIoKSkxSADgY2ndunVcfPHFia1/4cKFf7jvvvvKTRIAgN1FAAwAkECXXXbZrxsaGjYlsfaysjJXQQMAH9u5554bpaWliay9oaFh4+WXX/47UwQAYHcSAAMAJNDs2bNrXn311V8ntf4jjjgiDj74YIMEAD6SwYMHx+GHH57Y+l955ZX7Zs+eXWOSAADsTgJgAICEOueccx6tqalZmtT6L7roomjZsqVBAgAfSsuWLeNzn/tcYuuvqalZMmbMmMdMEgCA3U0ADACQUJWVlU3Tpk37RVLrb9++fZx++ukGCQB8KGeccUa0b98+sfU/+eST91ZXV6dNEgCA3U0ADACQYOedd960qqqqV5Ja/wknnOAqaADgAx188MFx/PHHJ7b+TZs2vXzBBRc8a5IAAOwJAmAAgIT74x//eG9EZJJYeyqVigsuuMBV0ADAe2rZsmVccMEFkUqlkrqEzP333/8zkwQAYE8RAAMAJNzNN988b9WqVU8ktf6OHTsm+nt+AMDudcEFF0THjh0TW/+KFSse//rXv/6GSQIAsKcIgAEAcsCNN974k6ampq1JrX/kyJExdOhQgwQA/pdPfepTMWLEiMTW39TUVH3zzTf/t0kCALAnCYABAHLAxIkTK//+97//KslruPDCC6OsrMwwAYCIiGjTpk18/vOfT/QaZs+efd/EiRMrTRMAgD1JAAwAkCPOPvvsh2pqapYntf7S0tK46KKLDBIAiFQqFV/84hejtLQ0sWuoqal566yzznrYNAEA2NMEwAAAOaKioqJx0qRJP07yGgYPHhwjR440TABo5o444og46KCDEr2GJ5544qeVlZVNpgkAwJ4mAAYAyCGXXHLJzIqKihlJXsMFF1wQ3bp1M0wAaKZ69uyZ+KufKyoqZnzhC1+YZZoAAOwNAmAAgBzzb//2b/ek0+ntSa2/RYsWceWVV0ZhYaFhAkAzU1hYGF/60pcSvQ9Ip9Pb/+3f/u0e0wQAYG8RAAMA5Jh777139aJFix5M8hq6d+8eZ555pmECQDNzxhlnRPfu3RO9hsWLFz947733rjZNAAD2FgEwAEAO+uxnP/vL2traRL94PPHEE2Pw4MGGCQDNxKBBg+Kkk05K9Bpqa2tXn3vuub80TQAA9iYBMABADlq8eHH9uHHj/j3Ja0ilUnHJJZdE27ZtDRQAclybNm3ikksuiVQqleh1jBs37t8XL15cb6IAAOxNAmAAgBx1+eWXv1RRUTEjyWsoLS2NL3zhC4l/GQwAvLe3f+mrdevWiV5HRUXFM5dffvlLJgoAwN4mAAYAyGE33HDDXU1NTVuTvIaDDjrI94ABIId95jOfiUMOOSTRa2hqaqq+4YYbfmiaAABkAwEwAEAOGzdu3MbZs2cn/jt0p5xyiu8BA0AOOuSQQ+LTn/504tfx17/+9efjxo3baKIAAGQDATAAQI77zGc+81B1dfXCJK8hlUrFF7/4xejQoYOBAkCO6NixY3zpS19K/KceNm/ePO+00057xEQBAMgWAmAAgBxXXV2dfuCBB34UEekkr6O4uDguvfTSyMuzhQWApMvPz4/LLrssiouLk76U9P333/+ftbW1aVMFACBbeHsGANAMXH/99XMWLVr0YNLXsf/++8e5555roACQcOedd1707ds38etYuHDhH7/61a++bqIAAGQTATAAQDNxySWX/Lyurq486es4/vjjfQ8YABJs2LBhccwxxyR+HXV1dWsuvPDC+0wUAIBsIwAGAGgmXnvttdoHHnjguxGRSfI6UqlUfOlLX4oePXoYKgAkTO/evePSSy9N/Hd/IyLzwAMPfO/111+vNVUAALKNABgAoBm5+uqr/7Z06dJHk76OoqKiGDt2bJSWlhoqACRE69at46qrrorCwsLEr2X58uXjrr766r+ZKgAA2UgADADQzJx33nn/r66ubnXS19GhQ4e4/PLLIy/PlhYAsl1eXl5cfvnl0b59+8Svpb6+ft0ll1zyE1MFACBr999aAADQvLz++uu1Dz744Pcj4VdBR0QMGDAgzjrrLEMFgCw3ZsyYOPDAA3NiLY899tgPXnnllW2mCgBAthIAAwA0Q1/5ylf+umbNmqm5sJaTTz45Dj30UEMFgCw1ZMiQOOmkk3JiLWvXrv3LpZde+oKpAgCQzQTAAADN1GWXXfYf9fX1FUlfRyqViksvvTS6d+9uqACQZXr06BFf/OIXI5VKJX4tDQ0Nm6655pofmioAANlOAAwA0EzNmDGj+oEHHvhO5MBV0C1btozrr78+2rZta7AAkCXatWsX1113XbRs2TIXlpN56KGH/nXSpElVJgsAQLYTAAMANGNf+cpX/rpkyZI/58Ja2rZtG1dffXW0aNHCYAFgL2vRokVcffXVOfPLWUuXLn30iiuueNlkAQBIAgEwAEAzd+655/6ktrZ2eS6spXfv3jlzzSQAJNXbn2fYZ599cmI9tbW1y88555wfmywAAEkhAAYAaOYWLFhQ97Of/ezbmUymMRfWM2zYsDjllFMMFgD2kk9/+tMxdOjQnFhLJpNp/NnPfvbtBQsW1JksAABJIQAGACBuvfXWBfPnz78/V9Zz5plnxuDBgw0WAPaw4cOHx2c+85mcWc/8+fN/d+utty4wWQAAkkQADABARESMGTPmvpqamrdyYS2pVCouu+yy6Nmzp8ECwB7Su3fvuPjii3PmUwxbt25ddPrpp//aZAEASBoBMAAAERGxcuXKhh/+8Ie3pdPpnLjisGXLlvEv//Iv0aVLF8MFgN2sS5cucf3110dRUVFOrKepqanmu9/97jfKy8sbTBcAgKQRAAMA8E933XXX0ueff/6eXFlPaWlpXHvttVFWVma4ALCblJWVxXXXXRclJSU5s6aZM2fe/f/+3/9bZboAACSRABgAgP/l5JNPHldeXv50rqynU6dOMXbs2Jw5kQQA2aSoqCiuueaa6NixY86sqby8/MlTTz11gukCAJBUAmAAAP6PSy655K66urq1ubKefffdN6644orIy7P9BYBdJS8vL6688sro3bt3zqyprq6u/JJLLvmh6QIAkOi9uhYAAPBus2bNqn7ooYfujIh0rqxp4MCBcd555xkuAOwi559/fhxyyCG5tKT0gw8+eOesWbOqTRcAgCTLb3tQ9NzpjndbRG15oQ4BADRTEydOXDNmzJi8Tp06Dc2VNfXp0yfy8/PjzTffNGAA+ATOOuusOOmkk3JqTa+//vp9Z5555kTTBQAgCYq7N0Ze6c5/5gQwAADv6dRTT/31li1bXs+lNZ122mlx9NFHGy4AfEzHHntsnHrqqTm1pi1btrxx2mmn/cZ0AQDIBQJgAADeU0VFReONN974jcbGxqpcWtcFF1wQRx55pAEDwEd05JFHxuc+97mcWlNjY2PVzTff/I2KiopGEwYAIBcIgAEAeF9//OMf1z/yyCPfiRz6HnAqlYqLLroohgwZYsAA8CENHTo0LrrookilUrm0rPQjjzzynfvvv3+dCQMAkCsEwAAAfKBLL730hQULFvwupzbCeXnxpS99Kfbff38DBoAPcNBBB8WXvvSlyMvLrVdJCxYs+N2ll176ggkDAJBLBMAAAHwoo0eP/mVVVdXcXFpTYWFhfOUrX4kePXoYMAC8h169esUVV1wRBQUFObWuqqqqOaNHj/6lCQMAkGsEwAAAfCgVFRWNV1111S0NDQ0bcmldJSUlcfPNN8c+++xjyADwLr17946bbropiouLc2pdDQ0NG6666qqv++4vAAC5SAAMAMCHNmHChE3333//tzKZTDqX1lVcXBzXXXdddO/e3ZABYIfu3bvHtddeG61atcqpdWUymfT999//rQkTJmwyZQAAcpEAGACAj2Ts2LGz58+f/9tcW1fr1q3juuuuiw4dOhgyAM1ehw4d4rrrrovWrVvn3Nrmz5//m7Fjx842ZQAAcpUAGACAj+y44477xaZNm17MtXW1a9cubrzxxmjXrp0hA9BstW3bNmf/Pty4ceOLxx13nO/+AgCQ0wTAAAB8ZNXV1emLL774W3V1datzbW0dO3aMG2+8Mdq0aWPQADQ7ZWVlceONN0bHjh1zbm21tbWrL7zwwturq6vTJg0AQC7Lb3tQ9NzZD9LbImrLC3UIAICdWrZsWf327dtfOvbYY0/Ny8trkUtrKykpiaFDh8Zrr70WNTU1hg1As9ChQ4f42te+Fp06dcq5tTU1NW39zne+M/bBBx9cb9IAAOSC4u6NkVe6858JgAEA+NhefPHFzYcccsiyAQMGnBgRqZzaRBcXx5AhQ4TAADQLHTt2jJtuuik6dOiQi8tLjx8//ravfvWrc0waAIBc8X4BsCugAQD4RC688MIZb7zxxm9ycW3t27ePm266KSdPQgHA2zp16pTL4W+88cYbv77wwgufM2kAAJoLATAAAJ/YqFGjfrFhw4aZubi2t0Pgzp07GzQAOadz585x0003Rfv27XNyfRs2bJg5atSo+0waAIDmRAAMAMAnVltbm77sssu+V1dXtzoX19euXbu44YYbomPHjoYNQM7o0KFDXH/99dGuXbtc3Z+s/sIXvvDd2tratGkDANCc+AYwAAC7xJIlS+oj4pVRo0admpeX1yLX1ldcXBxDhw6NuXPnxrZt2wwcgETr0qVL3HjjjTl77XNTU1P1nXfeec0f/vCHdaYNAEAuer9vAAuAAQDYZWbNmlXVo0ePuYceeujoVCqVn2vra9WqVYwYMSIWLVoUlZWVBg5AIu23335x0003RVlZWU6uL51ON/z617++4fbbb3/TtAEAyFUCYAAA9phJkyatPeqoozbsu+++R+fi+goLC2P48OGxbNmy2LBhg4EDkCgDBgyIa6+9Nlq1apWza5w2bdq/XXLJJc+ZNgAAuez9AmDfAAYAYJc77bTTHn/rrbcezNX1FRUVxTXXXBNDhgwxbAASY8iQIXHNNddEUVFRzq5xwYIFvzv99NOfMG0AAJozATAAALvFEUcccc+GDRtm5ur6CgoK4sorr4wjjjjCsAFIwt/LceWVV0ZBQUHOrrG8vPypESNG/LdpAwDQ3AmAAQDYLaqrq9MXXXTRd2pra1fk7GY6Ly8uvvjiOPLIIw0cgKw1atSouPjiiyMvL3dfA23dunXxZz/72e83NDRkTBwAgObON4ABANhtli9fvr2mpuaFY4899uT8/PyWubjGVCoVgwYNikwmE4sWLTJ0ALLK6aefHueee26kUqmcXWN9fX3FDTfccM3UqVOrTBwAgObi/b4BLAAGAGC3evnll7cUFBS8cMQRR4zOy8trkYtrTKVSccABB0SnTp1i7ty5kck4fATA3lVYWBhXXHFFHHPMMTm9zsbGxuo777zzKz/72c9WmzoAAM2JABgAgL1qxowZlb169Xp98ODBJ6dSqfxcXWfPnj2jb9++8fe//z0aGxsNHoC9olWrVnH11VfHwIEDc3qd6XS64be//e2Nt9122wJTBwCguREAAwCw1z3xxBPlw4cPX9OvX79jIyJn76Hs2LFjDBw4MObMmRN1dXUGD8Ae1a5du7jxxhujT58+ub7U9JQpU779xS9+8XlTBwCgOXq/ADhPewAA2FPGjBkz9Y033vh1rq+zZ8+eceONN0bHjh0NHYA9pkuXLnHTTTdF9+7dc36tc+fO/eU555zzF1MHAID/SwAMAMAe9alPfernS5cufTjX19mlS5e49dZb48ADDzR0AHa7gQMHxje/+c3o1KlTzq/1rbfeemjEiBG/MnUAANg5ATAAAHvcsccee8/GjRtfyPV1FhcXx7XXXhsjRowwdAB2m8MPPzyuuuqqaNmyZc6vdePGjc8fffTR95g6AAC8NwEwAAB7XEVFReNxxx339crKyr/l+loLCgrisssui/PPPz9SqZThA7DLpFKpOP/88+PSSy+NgoKCnF/vpk2bXj7ssMNuqaysbDJ9AAB4bwJgAAD2isWLF9efddZZN1dXV7/ZHNZ7/PHHx5e//OUoKioyfAA+sRYtWsSXv/zlOP7445vFequrq98cM2bMN8rLyxtMHwAA3l9+24Oi585+kN4WUVteqEMAAOw2a9asaVi1atWs0aNHH1dQUNA619fbrVu3OOCAA2LevHlRX1/vAQDgYykrK4trrrkmDjrooGax3rq6uvKxY8de89RTT202fQAA+Ifi7o2RV7rznwmAAQDYq+bNm1ezevXqZ04++eTjCwoKSnN9ve3atYuRI0fG8uXLY+PGjR4AAD6S/v37x0033RRdu3ZtFuutr69fd9111335T3/6U4XpAwDA/xAAAwCQ1ebMmbMtlUq9fOSRR56Ul5eX83ckt2jRIkaMGBG1tbWxdOlSDwAAH8rxxx8fX/rSl5rN5wQaGxu33HXXXdf99Kc/XWn6AADwvwmAAQDIejNnzqzs2bPn64MHDz4plUrl5/p6U6lUHHLIIdGqVatYsGBBZDIZDwEAO5WXlxef/exn4/TTT49UKtUs1pxOp7f//ve//+o3vvGN1z0BAADwfwmAAQBIhEmTJpXvs88+8wYOHHhCKpUqaA5r3m+//WLAgAExd+5c3wUG4P8oKyuL6667LoYNG9Zs1pxOp7f/8Y9/vOmqq676qycAAAB2TgAMAEBiTJw4cc3BBx+85MADDzwulUrlNYc1t2/fPoYOHRqLFi2KLVu2eAgAiIiIffbZJ66//vro2bNns1lzJpNpnDBhwm1f/OIXn/cEAADAexMAAwCQKI8++ujy/fff/42DDjrohOZwHXRERHFxcRx11FHR2NgYb731locAoJkbPXp0XHHFFVFSUtJs1pxOpxsefvjhr15yySWzPAEAAPD+BMAAACTO+PHjVw0cOHDpAQcccGxzOQmcSqViwIAB0aVLl3jjjTeiqanJgwDQzBQVFcWll14aJ554YrP53m/EP07+Pv7447dffPHFMz0FAADwwQTAAAAk0iOPPLLs0EMPXbb//vs3mxA4IqJHjx4xZMiQePPNN2Pr1q0eBIBmonv37vEv//IvccABBzSrdWcymaYnnnji9s997nPPeAoAAODDEQADAJBYDz/88NJjjjlmY+/evY+KiGZzFKq0tDSGDx8eq1evjvXr13sQAHLcwIED45prrol27do1t6VnZsyY8YOzzjprqqcAAAA+PAEwAACJdv/99795zDHHVO6zzz5HRDMKgVu0aBGHHXZYtGzZMhYuXBjpdNrDAJBjCgoK4pxzzonzzz8/WrRo0dyWn37uuefuOuWUUyZ4EgAA4KMRAAMAkHi///3v5w8bNmxF3759j2lO10GnUqno27dvDB06NBYvXhxbtmzxMADkiJ49e8YNN9wQgwcPblbf+434x7XPU6ZM+fbpp58+2ZMAAAAfnQAYAICc8OCDDy4ZNmzYin79+jWrEDgionXr1nHEEUdEfX19LF261MMAkGCpVCpOOOGEuOKKK6JNmzbNbv07wt9vnXPOOX/xNAAAwMcjAAYAIGc89NBDS4YNG7a8X79+xza3EDg/Pz8OPvjg6NWrV8yfPz8aGho8EAAJU1JSEpdffnmccMIJkZ+f3+zWn8lkGp944olvffazn53maQAAgI9PAAwAQE556KGHlo4cOXJdnz59RqWa252ZEdG1a9cYNmxYLFu2LCorKz0QAAnRt2/fuO6662K//fZrluvPZDLpp59++rvnnHPO054GAAD4ZATAAADknD/96U+LDj300KX7779/s7sOOiKiuLg4jjzyyCgpKYk333wz0um0hwIgSxUUFMRnP/vZuPDCC6OkpKRZ9iCdTjc88sgjt5x//vnTPREAAPDJCYABAMhJDz/88NId3wQelUqlmt09mqlUKvr06RMHH3xwLFy4MLZt2+ahAMgynTt3jrFjx8bQoUOjGV5aERH/CH+feOKJ2y+88MLnPBEAALBrCIABAMhZDz300JIePXq8NmjQoGPz8vJaNMcetG3bNkaNGhVNTU2xZMkSDwVAFkilUjF69Oi48soro0OHDs22D01NTdt++9vf/stll132oqcCAAB2HQEwAAA5bdKkSeXdu3efM3jw4GYbAufn58eAAQOiV69esWDBgti+fbsHA2Avad26dVx66aVx/PHHR35+frPtQ2NjY/WvfvWrf7nuuute81QAAMCuJQAGACDnTZ48eW1jY+OMI4444uiCgoKS5tqHrl27xqhRo2Lbtm2xcuVKDwbAHpRKpWLUqFExduzY6NWrV7PuRX19/fo77rjjK9/61rcWejIAAGDXEwADANAsPP/881UbNmx45rjjjjuqsLCwrLn2obCwMAYNGhT77bdfLF68OGpraz0cALtZ+/bt44orrogTTzwxCgub9/uU2tralTfffPPVP/nJT1Z7MgAAYPcQAAMA0Gz87W9/27p27doZJ5xwwsjCwsK2zbkXnTp1ipEjR0Z1dbXTwAC70ciRI+Pqq6+OHj16NPte1NTULL/hhhuu/e1vf7vOkwEAALuPABgAgGbltdde2zpv3rynTznllKFFRUWdmnMvCgsL49BDD4399tsvFi1a5DQwwC709qnfk08+udmf+o2I2Lx587yLL774unHjxm30dAAAwO71fgFwat9zYsTOftC4LmLjq610DwCAxOrVq1fhs88++69du3Y9QTciGhoaYurUqTF58uRobGzUEICPqaCgIE499dQYPXq04HeH8vLyp4499tjvrly5skE3AABg9+swrDYKuuz8ZwJgAAByWuvWrfNeeumlm/fdd9+zdeMfVq9eHffff38sWbJEMwA+ov322y8uuugi1z2/w8KFC38/fPjwnzY0NGR0AwAA9gwBMAAAzd7zzz9/8aGHHnp1RKR0IyKTycTMmTPjz3/+c9TV1WkIwAcoKSmJ8847L0aMGBGplL9Kdki//PLL9xx77LEPagUAAOxZ7xcA+wYwAADNwn333Tfn+OOP39yrV6/DQwgcqVQqevfuHcOHD49169ZFRUWFhwTgPRxyyCExduzY6N+/v/B3h0wm0/jMM8/828knnzxONwAAYM97v28AC4ABAGg2fve7370xePDgJf369Ts6lUrl60hEcXFxjBgxInr06BFLly6N2tpaTQHYoUOHDvGFL3whzjzzzCguLtaQHZqammoeeOCBWz73uc9N1w0AANg7BMAAALDDww8/vKygoOC54cOHH1FQUFCqI//QrVu3OO6446K0tDQWL14cTU1NmgI0Wy1btoxzzjknLr300ujevbuGvENtbe2K22677arbbrvtDd0AAIC9RwAMAADv8Oyzz25avHjx0yeddNKQoqKiTjryD3l5edGnT58YOXJkbN26NVatWqUpQLNz+OGHx1e+8pUYMGBA5OXlacg7VFVV/e3CCy+8/oEHHvDdAAAA2MsEwAAA8C7z58+vefbZZ58+44wz+hcX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OigOOOCAKCoq0pQs0djYuGXmzJk/PvPMMyc2NDS4XgAAAPjQBMAAAJADjjzyyNY/+9nPrujbt++5EZGnI9mluro6Fi5cGPPnz4958+ZFZWWlprBXtGvXLg455JAYMGBA9O/fP1q39nsjWSj91ltv/fmqq676xaxZs6q1AwAA+KgEwAAAkEN++ctfjhgzZsyNrVq16q0b2SmdTsfKlStj0aJFsXDhwli8eHFs27ZNY9gtSkpKol+/ftG/f//Yf//9o1evXpGX53dEslVNTc3yRx999EdXXnnlK7oBAAB8XAJgAADIMd26dSt8+OGHPzd48ODL8vPzbdyzXCaTiTVr1sTChQtj0aJFsWjRotiyZYvG8LGUlZVF//79/xn6du/ePVKplMZkuaampprXXnvtV2PGjHmgoqKiUUcAAIBPQgAMAAA56rjjjiv7r//6r8tdC508mzdvjuXLl8eKFSti+fLlsXjx4qipqdEY/pfi4uLo169f9O7dO/bZZ5/Yd999o6ysTGMSJJPJpJcsWfLn66677pfTp0/3mx8AAMAuIQAGAIAc99Of/nTIueeee3NpaWlf3UimxsbGWLlyZSxdujSWLVsWy5cvj3Xr1kUmk9GcZiKVSkWXLl1in332iT59+kSfPn2iV69eUVBQoDkJtXXr1sUPPvjgj6699tq/6wYAALArCYABAKAZaNeuXf64cePOGTp06BUFBQWtdST56uvrY+XKlf88KbxixYpYu3ZtpNNpzUm4vLy86Nq1a+yzzz7//KdXr17RsmVLzckBjY2NW/7617/+4pxzznm0srKySUcAAIBdTQAMAADNyIknntjmnnvuuXzfffcdk0qlHB3MMdu3b481a9bEmjVrYu3atbF27dooLy+PDRs2CIazUF5eXnTs2DG6desWXbt2jW7dukW3bt2iR48eUVhYqEE5JpPJNC5ZsuRR1z0DAAC7mwAYAACaoa9+9av7Xnfdddd16NDhCN3IfY2Njf8MhNetWxfr1q2LioqKWLduXWzbtk2DdrPS0tLo3LnzP//p0qVLdO3aNbp27eoK52Ziw4YNM//rv/7rxz/60Y+W6wYAALC7CYABAKAZ++UvfznirLPOuq64uNj3gZupmpqaWL9+/T//qaioiMrKyqisrIxNmzZFY2OjJn2AgoKCaN++fbRr1y7at28fHTt2jC5dukSnTp2ic+fOUVxcrEnN1NatW98aP378PVdcccXLugEAAOwpAmAAAGjm2rVrl//ggw+eOWLEiCsLCwvb6gjvtHnz5n+GwZs2bYrKysqorq6OLVu2xJYtW6K6ujqqq6sjk8nk3NpTqVS0bt06WrduHWVlZdGmTZsoLS39X2Fvu3btok2bNh4U/peGhobKl1566efnnHPO+OrqavevAwAAe5QAGAAAiIiIoUOHFt97770XHHjggRfk5+c7ssiHlk6n/xkEV1dXR01Nzfv+k8lkora2NtLpdNTX10dTU1PU1dXt0u8U5+XlRcuWLSM/Pz+KiooiLy8vWrVqFalUKoqLi3f6T0lJSbRq1eqfgW9paWnk5eUZMB9aU1NTzYIFC/745S9/+Y+zZ8+u0REAAGBvEAADAAD/y2mnndb2rrvuurRPnz5n5+XlFeoIe9LbgfDbtm/f/r7XUBcUFESLFi3++b/fDnxhT8pkMg1LliwZd8stt/xq0qRJVToCAADsTQJgAABgp0477bS2d95554X777//5wTBAP9XJpNpWLhw4QO33nrrHwS/AABAtni/ADi/7UHRc2c/SG+LqC33/gcAAHLZokWL6u69995X0un0swcddFCnkpKS3roC8A8VFRUz/7//7/+77aKLLpq6aNGiOh0BAACyRXH3xsgr3fnPBMAAAEDMnDmz8u67736qqalpWr9+/Ypbt27dN5VKpXQGaG4ymUx6zZo1U+65555/Peeccx6cOXNmpa4AAADZRgAMAAB8KDNnzqz88Y9//Gw6nZ4uCAaak7eD37vvvvtfzz///McEvwAAQDYTAAMAAB+JIBhoLgS/AABAEgmAAQCAj+XtILisrOyFvn37diwuLu4VEYJgIBdkKioqnrv33nu/PWbMmEcEvwAAQJK8XwCc2vecGLGzHzSui9j4aivdAwAA/unqq6/u8ZWvfOX8Pn36nJWXl9dCR4CkSafT9UuXLh3/X//1Xw/84he/WKMjAABAEnUYVhsFXXb+MwEwAADwkZ1xxhntb7/99rMPPPDA8/Pz81vrCJDtmpqaqhcsWPDgd77znUcmTpzotC8AAJBoAmAAAGC3GD58eMkPf/jDzwwePPjioqKijjoCZJv6+voNr7322u9vvPHGx2fPnl2jIwAAQC4QAAMAALvV0KFDi++5556zDjnkkPOKioq66giwt9XV1a19/fXXH7z++uvHC34BAIBcIwAGAAD2iFatWuXdc889w0455ZTzO3bseJSOAHtYZsOGDbOmTJny4PXXX/9qbW1tWksAAIBcJAAGAAD2uH/913/tf/7555/dq1ev0/Ly8lroCLC7pNPp+pUrV05+4IEHHvnOd76zSEcAAIBcJwAGAAD2mjPOOKP97bfffvYBBxzw2YKCgjY6AuwqjY2NVW+++eafv/e97z06YcKETToCAAA0FwJgAABgrxs+fHjJ97///dGDBg0aU1paur+OAB9XdXX1wtdee+3Rr371q1Nfe+21Wh0BAACaGwEwAACQVb761a/ue8EFF3y6b9++ZxUUFLTWEeCDNDY2bnnrrbfG/+EPf5j4ox/9aLmOAAAAzZkAGAAAyEpDhw4t/sEPfnDy4MGDz27dunV/HQHerbq6+s2XX375weuuu+7ppUuXbtcRAAAAATAAAJDlCgsLU3ffffeQ0aNHn9G1a9fj8vLyinQFmq90Ol1XXl4+bcqUKROuvfbav+sIAADA/yYABgAAEqNPnz4t/v3f/33UyJEjz2rfvv2nIiKlK9AsZDZt2vTXF1544bGvfe1rzzntCwAA8N4EwAAAQCJddNFFXa6++uqTDzzwwLNbtmzZTUcg99TV1a1ZsGDBuJ/+9KdP3n///et0BAAA4IMJgAEAgETr1q1b4d13333k4YcffmqHDh2OyMvLK9QVSK50Ot2wcePGWbNmzZp8/fXXz6qoqGjUFQAAgA9PAAwAAOSMo48+uvWtt956/CGHHHJKu3btBkdEnq5AIqQrKytfmzdv3uQ777xz+owZM6q1BAAA4OMRAAMAADnpuOOOK/vGN75x/CGHHHJa27ZtB4bvBUO2yVRVVc2dN2/epO9///vTpk+fvkVLAAAAPjkBMAAAkPNuu+22vmedddZJffr0Oa5Vq1a9dQT2ntra2uXLly+f/uijjz51xx13vKUjAAAAu5YAGAAAaFa+9KUvdbv44ouP7t+//wlOBsMekamqqpq7cOHCv/z+97+fcd9995VrCQAAwO4jAAYAAJqtSy65pOtll112jDAYdrl0VVXVvIULF/7lV7/61bO/+93v1moJAADAniEABgAAiIirr766x/nnnz9q//33P7JNmzZDUqlUga7Ah5fJZBoqKyv/vnjx4uf+9Kc/zbr33ntX6woAAMCeJwAGAAB4l379+hV97WtfGzRy5MhRPXv2PLaoqKizrsD/VV9fv37VqlXPvPDCC8/9+7//+5zFixfX6woAAMDeJQAGAAB4H61bt8678847Bx599NFHde/efURpaen+4apomq/M1q1bF69Zs+bF5557btY3v/nNOdXV1WltAQAAyB4CYAAAgI9g8ODBrcaOHXvI8OHDD+vevfvw1q1bHxACYXJXprq6+s01a9a88sorr7z8k5/8ZN5rr71Wqy0AAADZSwAMAADwCVx//fX7nHHGGYf169dvePv27Yfm5+e31hWSrLGxsXrjxo2vvvXWWy+PHz/+lR//+McrdQUAACA5BMAAAAC70Je//OUe55xzzvA+ffoM7tix45CioqKuukI2q6+vX7t27doXFy9ePGfixImv3Xvvvat1BQAAILkEwAAAALvRl7/85R6f+cxnBvfr129Qly5dDm/ZsqVAmL2qrq5u7bp16wS+AAAAOUoADAAAsIe0atUq75prrtnn2GOPPXi//fY7uH379oeUlpb2TaVS+brDbpKuqalZtnHjxnlvvfXW3GeffXbef/3Xfy2vra1Naw0AAEBuEgADAADsRQceeGDLq6+++oAhQ4Yc3LNnz4Pbtm17sGuj+biampqqq6qqXi8vL583Z86ceb/85S/nvfjii1t1BgAAoPkQAAMAAGSZoUOHFn/xi1/cf9CgQQf26NHjwHbt2h3YqlWr3qlUKk932CFdU1OzvLKycsHq1asXzJkzZ8Gf//znJTNmzKjWGgAAgOZNAAwAAJAAxx13XNkFF1xw4MEHH3xA165dDywtLd23pKRkn1QqVag7uS2TyTRs27ZtRXV19dJ169YtfOONNxZOmDBh4YQJEzbpDgAAAO8mAAYAAEiw8847r+OJJ57Yp3///vt16dKlT5s2bfZr3bp1v/z8/GLdSZampqaa6urqxZs3b16ybt26pQsXLlzy9NNPL33ooYc26A4AAAAflgAYAAAgx7Rr1y7/kksu6TFkyJCe++67b89OnTr1Kisr61VcXNyzZcuW3VKpVL4u7R2ZTKaprq6uvKamZtWWLVtWVlRUrFy6dOnK2bNnr7r//vvXVFZWNukSAAAAn4QAGAAAoBnp1KlTwec+97luQ4cO7bnPPvv0aNeuXafWrVt3Li4u7tqyZcvORUVFnfLy8lro1MeTTqe319fXr6+rq6uoqalZW11dvb6y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AACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoIQADAAAAAAAAlBCAAQAAAAAAAEoIwAAAAAAAAAAlBGAAAAAAAACAEgIwAAAAAAAAQAkBGAAAAAAAAKCEAAwAAAAAAABQQgAGAAAAAAAAKCEAAwAAAAAAAJQQgAEAAAAAAABKCMAAAAAAAAAAJQRgAAAAAAAAgBICMAAAAAAAAEAJARgAAAAAAACghAAMAAAAAAAAUEIABgAAAAAAACghAAMAAAAAAACUEIABAAAAAAAASgjAAAAAAAAAACUEYAAAAAAAAIASAjAAAAAAAABACQEYAAAAAAAAoIQADAAAAAAAAFBCAAYAAAAAAAAoMY3JP//9K8My551lzpAk293a7QAAAAAAAAD8iIw3r+SL7TpPxuSt4/ibJJuz20QDBgAAAAAAAHhzrJPp6NvHYcyyjLl7dJTPbl/Jp6sPLufSsM+5ec7q5YOrF0OeP/SVaAAAAAAAAIA3weH7u6zfm79dWDIMSw6225w785vsx3XyzasOby5ssz69c4sAAAAAAAAAr9n69C6bC9sT93a7rKdnORin5Otxynzi1JQcfiwCAwAAAAAAALxO69O7HH68TaaT98cp85R8vbp3Nfszv8q0LHn7xMF1sjk/ZzUPmZ/MmWefhAYAAAAAAAD4oayPdjn7223Gn7x6ZrXPnetX8mBKkpv3cufDd/Pufn5FL56SzcVtNheT3dNt8tQlAwAAAAAAAHyv1sm0ySv/9XtsNWZ3I/lHkgzHi7/4XY7WYz5yiwAAAAAAAAA/Ivtcv/3nPEyS1fHa42t5+vNLyX7JoRsCAAAAAAAAePPt1/nbV3/KvePn1Xc371/NYxEYAAAAAAAA4M0yTHk2rvNo2WdzvHZqzN9v/SF3vju3evng/at5fPDLPDu1yuGyZHSVAAAAAAAAAK/XOGe4ueSvZ4e8M8xZbVe5ceuPufvy3Oqkw4+v5emDX+fuuTlLhhwsEYIBAAAAAAAAXpclGR8OuXP0TR4cPM/9z/+SRyfNDf/1TZezOp/87KdjzizJZkhO7edMy/w/nAUAAAAAAADg/zaMWcZkP8/ZLsmLacr2/MV8+cnvs/tP5/4FmLjAq1ifcioAAAAASUVORK5CYII=";
  function de(e, o, t) {
    return typeof e == "string" && !isNaN(Number(e)) && (e = Number(e)), typeof e == "number" && e < 100 ? he(e) : typeof e == "number" && e >= 100 ? e : typeof e == "string" && e.includes("%") ? Math.round(o && o === "X" ? parseFloat(e) / 100 * t.width : o && o === "Y" ? parseFloat(e) / 100 * t.height : parseFloat(e) / 100 * t.width) : 0;
  }
  function ft(e) {
    return e.replace(/[xy]/g, function(o) {
      const t = Math.random() * 16 | 0;
      return (o === "x" ? t : t & 3 | 8).toString(16);
    });
  }
  function ie(e) {
    return typeof e > "u" || e == null ? "" : e.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  function he(e) {
    return typeof e == "number" && e > 100 ? e : (typeof e == "string" && (e = Number(e.replace(/in*/gi, ""))), Math.round(Ae * e));
  }
  function oe(e) {
    const o = Number(e) || 0;
    return isNaN(o) ? 0 : Math.round(o * nt);
  }
  function Ue(e) {
    return e = e || 0, Math.round((e > 360 ? e - 360 : e) * 6e4);
  }
  function bt(e) {
    const o = e.toString(16);
    return o.length === 1 ? "0" + o : o;
  }
  function wt(e, o, t) {
    return (bt(e) + bt(o) + bt(t)).toUpperCase();
  }
  function me(e, o) {
    let t = (e || "").replace("#", "");
    !yt.test(t) && t !== Be.background1 && t !== Be.background2 && t !== Be.text1 && t !== Be.text2 && t !== Be.accent1 && t !== Be.accent2 && t !== Be.accent3 && t !== Be.accent4 && t !== Be.accent5 && t !== Be.accent6 && (console.warn(`"${t}" is not a valid scheme color or hex RGB! "${Le}" used instead. Only provide 6-digit RGB or 'pptx.SchemeColor' values!`), t = Le);
    const i = yt.test(t) ? "srgbClr" : "schemeClr", n = 'val="' + (yt.test(t) ? t.toUpperCase() : t) + '"';
    return o ? `<a:${i} ${n}>${o}</a:${i}>` : `<a:${i} ${n}/>`;
  }
  function Ra(e, o) {
    let t = "";
    const i = Object.assign(Object.assign({}, o), e), n = Math.round(i.size * nt), A = i.color, l = Math.round(i.opacity * 1e5);
    return t += `<a:glow rad="${n}">`, t += me(A, `<a:alpha val="${l}"/>`), t += "</a:glow>", t;
  }
  function De(e) {
    let o = "solid", t = "", i = "", n = "";
    if (e) switch (typeof e == "string" ? t = e : (e.type && (o = e.type), e.color && (t = e.color), e.alpha && (i += `<a:alpha val="${Math.round((100 - e.alpha) * 1e3)}"/>`), e.transparency && (i += `<a:alpha val="${Math.round((100 - e.transparency) * 1e3)}"/>`)), o) {
      case "solid":
        n += `<a:solidFill>${me(t, i)}</a:solidFill>`;
        break;
      default:
        n += "";
        break;
    }
    return n;
  }
  function Se(e) {
    return e._rels.length + e._relsChart.length + e._relsMedia.length + 1;
  }
  function Et(e) {
    if (!(!e || typeof e != "object")) return e.type !== "outer" && e.type !== "inner" && e.type !== "none" && (console.warn("Warning: shadow.type options are `outer`, `inner` or `none`."), e.type = "outer"), e.angle && ((isNaN(Number(e.angle)) || e.angle < 0 || e.angle > 359) && (console.warn("Warning: shadow.angle can only be 0-359"), e.angle = 270), e.angle = Math.round(Number(e.angle))), e.opacity && ((isNaN(Number(e.opacity)) || e.opacity < 0 || e.opacity > 1) && (console.warn("Warning: shadow.opacity can only be 0-1"), e.opacity = 0.75), e.opacity = Number(e.opacity)), e.color && e.color.startsWith("#") && (console.warn('Warning: shadow.color should not include hash (#) character, , e.g. "FF0000"'), e.color = e.color.replace("#", "")), e;
  }
  function Sa(e, o, t) {
    var i, n;
    const A = 2.3 + (!((i = e.options) === null || i === void 0) && i.autoPageCharWeight ? e.options.autoPageCharWeight : 0), l = Math.floor(o / nt * Ae) / ((!((n = e.options) === null || n === void 0) && n.fontSize ? e.options.fontSize : Fe) / A), c = [];
    let s = [];
    const a = [], r = [];
    e.text && e.text.toString().trim().length === 0 ? s.push({
      _type: se.tablecell,
      text: " "
    }) : typeof e.text == "number" || typeof e.text == "string" ? s.push({
      _type: se.tablecell,
      text: (e.text || "").toString().trim()
    }) : Array.isArray(e.text) && (s = e.text);
    let f = [];
    return s.forEach((g) => {
      var d;
      typeof g.text == "string" && (g.text.split(`
`).length > 1 ? g.text.split(`
`).forEach((m) => {
        f.push({
          _type: se.tablecell,
          text: m,
          options: Object.assign(Object.assign({}, g.options), {
            breakLine: true
          })
        });
      }) : f.push({
        _type: se.tablecell,
        text: g.text.trim(),
        options: g.options
      }), !((d = g.options) === null || d === void 0) && d.breakLine && (a.push(f), f = [])), f.length > 0 && (a.push(f), f = []);
    }), a.forEach((g) => {
      g.forEach((d) => {
        const m = [], y = String(d.text).split(" ");
        y.forEach((v, b) => {
          const x = Object.assign({}, d.options);
          (x == null ? void 0 : x.breakLine) && (x.breakLine = b + 1 === y.length), m.push({
            _type: se.tablecell,
            text: v + (b + 1 < y.length ? " " : ""),
            options: x
          });
        }), r.push(m);
      });
    }), r.forEach((g) => {
      let d = [], m = "";
      g.forEach((h) => {
        m.length + h.text.length > l && (c.push(d), d = [], m = ""), d.push(h), m += h.text.toString();
      }), d.length > 0 && c.push(d);
    }), c;
  }
  function ta(e = [], o = {}, t, i) {
    let n = rt, A = Ae * 1, l = Ae * 1, c = 0, s = 0;
    const a = [], r = de(o.x, "X", t), f = de(o.y, "Y", t), g = de(o.w, "X", t), d = de(o.h, "Y", t);
    let m = g;
    function h() {
      let v = 0;
      a.length === 0 && (v = f || he(n[0])), a.length > 0 && (v = he(o.autoPageSlideStartY || o.newSlideStartY || n[0])), l = (d || t.height) - v - he(n[2]), a.length > 1 && (typeof o.autoPageSlideStartY == "number" ? l = (d || t.height) - he(o.autoPageSlideStartY + n[2]) : typeof o.newSlideStartY == "number" ? l = (d || t.height) - he(o.newSlideStartY + n[2]) : f && (l = (d || t.height) - he((f / Ae < n[0] ? f / Ae : n[0]) + n[2]), l < d && (l = d)));
    }
    if (o.verbose && (console.log("[[VERBOSE MODE]]"), console.log("|-- TABLE PROPS --------------------------------------------------------|"), console.log(`| presLayout.width ................................ = ${(t.width / Ae).toFixed(1)}`), console.log(`| presLayout.height ............................... = ${(t.height / Ae).toFixed(1)}`), console.log(`| tableProps.x .................................... = ${typeof o.x == "number" ? (o.x / Ae).toFixed(1) : o.x}`), console.log(`| tableProps.y .................................... = ${typeof o.y == "number" ? (o.y / Ae).toFixed(1) : o.y}`), console.log(`| tableProps.w .................................... = ${typeof o.w == "number" ? (o.w / Ae).toFixed(1) : o.w}`), console.log(`| tableProps.h .................................... = ${typeof o.h == "number" ? (o.h / Ae).toFixed(1) : o.h}`), console.log(`| tableProps.slideMargin .......................... = ${o.slideMargin ? String(o.slideMargin) : ""}`), console.log(`| tableProps.margin ............................... = ${String(o.margin)}`), console.log(`| tableProps.colW ................................. = ${String(o.colW)}`), console.log(`| tableProps.autoPageSlideStartY .................. = ${o.autoPageSlideStartY}`), console.log(`| tableProps.autoPageCharWeight ................... = ${o.autoPageCharWeight}`), console.log("|-- CALCULATIONS -------------------------------------------------------|"), console.log(`| tablePropX ...................................... = ${r / Ae}`), console.log(`| tablePropY ...................................... = ${f / Ae}`), console.log(`| tablePropW ...................................... = ${g / Ae}`), console.log(`| tablePropH ...................................... = ${d / Ae}`), console.log(`| tableCalcW ...................................... = ${m / Ae}`)), !o.slideMargin && o.slideMargin !== 0 && (o.slideMargin = rt[0]), i && typeof i._margin < "u" ? Array.isArray(i._margin) ? n = i._margin : isNaN(Number(i._margin)) || (n = [
      Number(i._margin),
      Number(i._margin),
      Number(i._margin),
      Number(i._margin)
    ]) : (o.slideMargin || o.slideMargin === 0) && (Array.isArray(o.slideMargin) ? n = o.slideMargin : isNaN(o.slideMargin) || (n = [
      o.slideMargin,
      o.slideMargin,
      o.slideMargin,
      o.slideMargin
    ])), o.verbose && console.log(`| arrInchMargins .................................. = [${n.join(", ")}]`), (e[0] || []).forEach((b) => {
      b || (b = {
        _type: se.tablecell
      });
      const x = b.options || null;
      s += Number((x == null ? void 0 : x.colspan) ? x.colspan : 1);
    }), o.verbose && console.log(`| numCols ......................................... = ${s}`), !g && o.colW && (m = Array.isArray(o.colW) ? o.colW.reduce((v, b) => v + b) * Ae : o.colW * s || 0, o.verbose && console.log(`| tableCalcW ...................................... = ${m / Ae}`)), A = m || he((r ? r / Ae : n[1]) + n[3]), o.verbose && console.log(`| emuSlideTabW .................................... = ${(A / Ae).toFixed(1)}`), !o.colW || !Array.isArray(o.colW)) if (o.colW && !isNaN(Number(o.colW))) {
      const v = [];
      (e[0] || []).forEach(() => v.push(o.colW)), o.colW = [], v.forEach((x) => {
        Array.isArray(o.colW) && o.colW.push(x);
      });
    } else {
      o.colW = [];
      for (let v = 0; v < s; v++) o.colW.push(A / Ae / s);
    }
    let y = {
      rows: []
    };
    return e.forEach((v, b) => {
      const x = [];
      let k = 0, B = 0, T = [];
      v.forEach((I) => {
        var H, L, E, u;
        T.push({
          _type: se.tablecell,
          text: [],
          options: I.options
        }), I.options.margin && I.options.margin[0] >= 1 ? (!((H = I.options) === null || H === void 0) && H.margin && I.options.margin[0] && oe(I.options.margin[0]) > k ? k = oe(I.options.margin[0]) : (o == null ? void 0 : o.margin) && o.margin[0] && oe(o.margin[0]) > k && (k = oe(o.margin[0])), !((L = I.options) === null || L === void 0) && L.margin && I.options.margin[2] && oe(I.options.margin[2]) > B ? B = oe(I.options.margin[2]) : (o == null ? void 0 : o.margin) && o.margin[2] && oe(o.margin[2]) > B && (B = oe(o.margin[2]))) : (!((E = I.options) === null || E === void 0) && E.margin && I.options.margin[0] && he(I.options.margin[0]) > k ? k = he(I.options.margin[0]) : (o == null ? void 0 : o.margin) && o.margin[0] && he(o.margin[0]) > k && (k = he(o.margin[0])), !((u = I.options) === null || u === void 0) && u.margin && I.options.margin[2] && he(I.options.margin[2]) > B ? B = he(I.options.margin[2]) : (o == null ? void 0 : o.margin) && o.margin[2] && he(o.margin[2]) > B && (B = he(o.margin[2])));
      }), h(), c += k + B, o.verbose && b === 0 && console.log(`| SLIDE [${a.length}]: emuSlideTabH ...... = ${(l / Ae).toFixed(1)} `), v.forEach((I, H) => {
        var L;
        const E = {
          _type: se.tablecell,
          _lines: null,
          _lineHeight: he((!((L = I.options) === null || L === void 0) && L.fontSize ? I.options.fontSize : o.fontSize ? o.fontSize : Fe) * (ka + (o.autoPageLineWeight ? o.autoPageLineWeight : 0)) / 100),
          text: [],
          options: I.options
        };
        E.options.rowspan && (E._lineHeight = 0), E.options.autoPageCharWeight = o.autoPageCharWeight ? o.autoPageCharWeight : null;
        let u = o.colW[H];
        I.options.colspan && Array.isArray(o.colW) && (u = o.colW.filter((S, Z) => Z >= H && Z < Z + I.options.colspan).reduce((S, Z) => S + Z)), E._lines = Sa(I, u), x.push(E);
      }), o.verbose && console.log(`
| SLIDE [${a.length}]: ROW [${b}]: START...`);
      let R = 0, G = 0, P = false;
      for (; !P; ) {
        const I = x[R];
        let H = T[R];
        x.forEach((u) => {
          u._lineHeight >= G && (G = u._lineHeight);
        }), c + G > l && (o.verbose && (console.log(`
|-----------------------------------------------------------------------|`), console.log(`|-- NEW SLIDE CREATED (currTabH+currLineH > maxH) => ${(c / Ae).toFixed(2)} + ${(I._lineHeight / Ae).toFixed(2)} > ${l / Ae}`), console.log(`|-----------------------------------------------------------------------|

`)), T.length > 0 && T.map((S) => S.text.length).reduce((S, Z) => S + Z) > 0 && y.rows.push(T), a.push(y), y = {
          rows: []
        }, T = [], v.forEach((S) => T.push({
          _type: se.tablecell,
          text: [],
          options: S.options
        })), h(), c += k + B, o.verbose && console.log(`| SLIDE [${a.length}]: emuSlideTabH ...... = ${(l / Ae).toFixed(1)} `), c = 0, (o.addHeaderToEach || o.autoPageRepeatHeader) && o._arrObjTabHeadRows && o._arrObjTabHeadRows.forEach((S) => {
          const Z = [];
          let M = 0;
          S.forEach((te) => {
            Z.push(te), te._lineHeight > M && (M = te._lineHeight);
          }), y.rows.push(Z), c += M;
        }), H = T[R]);
        const L = I._lines.shift();
        Array.isArray(H.text) && (L ? H.text = H.text.concat(L) : H.text.length === 0 && (H.text = H.text.concat({
          _type: se.tablecell,
          text: ""
        }))), R === x.length - 1 && (c += G), R = R < x.length - 1 ? R + 1 : 0, x.map((u) => u._lines.length).reduce((u, S) => u + S) === 0 && (P = true);
      }
      T.length > 0 && y.rows.push(T), o.verbose && console.log(`- SLIDE [${a.length}]: ROW [${b}]: ...COMPLETE ...... emuTabCurrH = ${(c / Ae).toFixed(2)} ( emuSlideTabH = ${(l / Ae).toFixed(2)} )`);
    }), a.push(y), o.verbose && (console.log(`
|================================================|`), console.log(`| FINAL: tableRowSlides.length = ${a.length}`), a.forEach((v) => console.log(v)), console.log(`|================================================|

`)), a;
  }
  function Ta(e, o, t = {}, i) {
    const n = t || {};
    n.slideMargin = n.slideMargin || n.slideMargin === 0 ? n.slideMargin : 0.5;
    let A = n.w || e.presLayout.width;
    const l = [], c = [], s = [], a = [], r = [];
    let f = [
      0.5,
      0.5,
      0.5,
      0.5
    ], g = 0;
    if (!document.getElementById(o)) throw new Error('tableToSlides: Table ID "' + o + '" does not exist!');
    (i == null ? void 0 : i._margin) ? (Array.isArray(i._margin) ? f = i._margin : isNaN(i._margin) || (f = [
      i._margin,
      i._margin,
      i._margin,
      i._margin
    ]), n.slideMargin = f) : (n == null ? void 0 : n.slideMargin) && (Array.isArray(n.slideMargin) ? f = n.slideMargin : isNaN(n.slideMargin) || (f = [
      n.slideMargin,
      n.slideMargin,
      n.slideMargin,
      n.slideMargin
    ])), A = (n.w ? he(n.w) : e.presLayout.width) - he(f[1] + f[3]), n.verbose && (console.log("[[VERBOSE MODE]]"), console.log("|-- `tableToSlides` ----------------------------------------------------|"), console.log(`| tableProps.h .................................... = ${n.h}`), console.log(`| tableProps.w .................................... = ${n.w}`), console.log(`| pptx.presLayout.width ........................... = ${(e.presLayout.width / Ae).toFixed(1)}`), console.log(`| pptx.presLayout.height .......................... = ${(e.presLayout.height / Ae).toFixed(1)}`), console.log(`| emuSlideTabW .................................... = ${(A / Ae).toFixed(1)}`));
    let d = document.querySelectorAll(`#${o} tr:first-child th`);
    d.length === 0 && (d = document.querySelectorAll(`#${o} tr:first-child td`)), d.forEach((h) => {
      const y = h;
      if (y.getAttribute("colspan")) for (let v = 0; v < Number(y.getAttribute("colspan")); v++) r.push(Math.round(y.offsetWidth / Number(y.getAttribute("colspan"))));
      else r.push(y.offsetWidth);
    }), r.forEach((h) => {
      g += h;
    }), r.forEach((h, y) => {
      const v = Number((Number(A) * (h / g * 100) / 100 / Ae).toFixed(2));
      let b = 0;
      const x = document.querySelector(`#${o} thead tr:first-child th:nth-child(${y + 1})`);
      x && (b = Number(x.getAttribute("data-pptx-min-width")));
      const k = document.querySelector(`#${o} thead tr:first-child th:nth-child(${y + 1})`);
      k && (b = Number(k.getAttribute("data-pptx-width"))), a.push(b > v ? b : v);
    }), n.verbose && console.log(`| arrColW ......................................... = [${a.join(", ")}]`), [
      "thead",
      "tbody",
      "tfoot"
    ].forEach((h) => {
      document.querySelectorAll(`#${o} ${h} tr`).forEach((y) => {
        const v = y, b = [];
        switch (Array.from(v.cells).forEach((x) => {
          const k = window.getComputedStyle(x).getPropertyValue("color").replace(/\s+/gi, "").replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
          let B = window.getComputedStyle(x).getPropertyValue("background-color").replace(/\s+/gi, "").replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
          (window.getComputedStyle(x).getPropertyValue("background-color") === "rgba(0, 0, 0, 0)" || window.getComputedStyle(x).getPropertyValue("transparent")) && (B = [
            "255",
            "255",
            "255"
          ]);
          const T = {
            align: null,
            bold: window.getComputedStyle(x).getPropertyValue("font-weight") === "bold" || Number(window.getComputedStyle(x).getPropertyValue("font-weight")) >= 500,
            border: null,
            color: wt(Number(k[0]), Number(k[1]), Number(k[2])),
            fill: {
              color: wt(Number(B[0]), Number(B[1]), Number(B[2]))
            },
            fontFace: (window.getComputedStyle(x).getPropertyValue("font-family") || "").split(",")[0].replace(/"/g, "").replace("inherit", "").replace("initial", "") || null,
            fontSize: Number(window.getComputedStyle(x).getPropertyValue("font-size").replace(/[a-z]/gi, "")),
            margin: null,
            colspan: Number(x.getAttribute("colspan")) || null,
            rowspan: Number(x.getAttribute("rowspan")) || null,
            valign: null
          };
          if ([
            "left",
            "center",
            "right",
            "start",
            "end"
          ].includes(window.getComputedStyle(x).getPropertyValue("text-align"))) {
            const R = window.getComputedStyle(x).getPropertyValue("text-align").replace("start", "left").replace("end", "right");
            T.align = R === "center" ? "center" : R === "left" ? "left" : R === "right" ? "right" : null;
          }
          if ([
            "top",
            "middle",
            "bottom"
          ].includes(window.getComputedStyle(x).getPropertyValue("vertical-align"))) {
            const R = window.getComputedStyle(x).getPropertyValue("vertical-align");
            T.valign = R === "top" ? "top" : R === "middle" ? "middle" : R === "bottom" ? "bottom" : null;
          }
          window.getComputedStyle(x).getPropertyValue("padding-left") && (T.margin = [
            0,
            0,
            0,
            0
          ], [
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left"
          ].forEach((G, P) => {
            T.margin[P] = Math.round(Number(window.getComputedStyle(x).getPropertyValue(G).replace(/\D/gi, "")));
          })), (window.getComputedStyle(x).getPropertyValue("border-top-width") || window.getComputedStyle(x).getPropertyValue("border-right-width") || window.getComputedStyle(x).getPropertyValue("border-bottom-width") || window.getComputedStyle(x).getPropertyValue("border-left-width")) && (T.border = [
            null,
            null,
            null,
            null
          ], [
            "top",
            "right",
            "bottom",
            "left"
          ].forEach((G, P) => {
            const I = Math.round(Number(window.getComputedStyle(x).getPropertyValue("border-" + G + "-width").replace("px", "")));
            let H = [];
            H = window.getComputedStyle(x).getPropertyValue("border-" + G + "-color").replace(/\s+/gi, "").replace("rgba(", "").replace("rgb(", "").replace(")", "").split(",");
            const L = wt(Number(H[0]), Number(H[1]), Number(H[2]));
            T.border[P] = {
              pt: I,
              color: L
            };
          })), b.push({
            _type: se.tablecell,
            text: x.innerText,
            options: T
          });
        }), h) {
          case "thead":
            l.push(b);
            break;
          case "tbody":
            c.push(b);
            break;
          case "tfoot":
            s.push(b);
            break;
          default:
            console.log(`table parsing: unexpected table part: ${h}`);
            break;
        }
      });
    }), n._arrObjTabHeadRows = l || null, n.colW = a, ta([
      ...l,
      ...c,
      ...s
    ], n, e.presLayout, i).forEach((h, y) => {
      const v = e.addSlide({
        masterName: n.masterSlideName || null
      });
      y === 0 && (n.y = n.y || f[0]), y > 0 && (n.y = n.autoPageSlideStartY || n.newSlideStartY || f[0]), n.verbose && console.log(`| opts.autoPageSlideStartY: ${n.autoPageSlideStartY} / arrInchMargins[0]: ${f[0]} => opts.y = ${n.y}`), v.addTable(h.rows, {
        x: n.x || f[3],
        y: n.y,
        w: Number(A) / Ae,
        colW: a,
        autoPage: false
      }), n.addImage && (n.addImage.options = n.addImage.options || {}, !n.addImage.image || !n.addImage.image.path && !n.addImage.image.data ? console.warn("Warning: tableToSlides.addImage requires either `path` or `data`") : v.addImage({
        path: n.addImage.image.path,
        data: n.addImage.image.data,
        x: n.addImage.options.x,
        y: n.addImage.options.y,
        w: n.addImage.options.w,
        h: n.addImage.options.h
      })), n.addShape && v.addShape(n.addShape.shapeName, n.addShape.options || {}), n.addTable && v.addTable(n.addTable.rows, n.addTable.options || {}), n.addText && v.addText(n.addText.text, n.addText.options || {});
    });
  }
  let Ea = 0;
  function za(e, o) {
    e.bkgd && (o.bkgd = e.bkgd), e.objects && Array.isArray(e.objects) && e.objects.length > 0 && e.objects.forEach((t, i) => {
      const n = Object.keys(t)[0], A = o;
      Te[n] && n === "chart" ? aa(A, t[n].type, t[n].data, t[n].opts) : Te[n] && n === "image" ? ra(A, t[n]) : Te[n] && n === "line" ? St(A, Ee.LINE, t[n]) : Te[n] && n === "rect" ? St(A, Ee.RECTANGLE, t[n]) : Te[n] && n === "text" ? ht(A, [
        {
          text: t[n].text
        }
      ], t[n].options, false) : Te[n] && n === "placeholder" && (t[n].options.placeholder = t[n].options.name, delete t[n].options.name, t[n].options._placeholderType = t[n].options.type, delete t[n].options.type, t[n].options._placeholderIdx = 100 + i, ht(A, [
        {
          text: t[n].text
        }
      ], t[n].options, true));
    }), e.slideNumber && typeof e.slideNumber == "object" && (o._slideNumberProps = e.slideNumber);
  }
  function aa(e, o, t, i) {
    var n;
    function A(f) {
      !f || f.style === "none" || (f.size !== void 0 && (isNaN(Number(f.size)) || f.size <= 0) && (console.warn("Warning: chart.gridLine.size must be greater than 0."), delete f.size), f.style && ![
        "solid",
        "dash",
        "dot"
      ].includes(f.style) && (console.warn("Warning: chart.gridLine.style options: `solid`, `dash`, `dot`."), delete f.style), f.cap && ![
        "flat",
        "square",
        "round"
      ].includes(f.cap) && (console.warn("Warning: chart.gridLine.cap options: `flat`, `square`, `round`."), delete f.cap));
    }
    const l = ++Ea, c = {
      _type: null,
      text: null,
      options: null,
      chartRid: null
    };
    let s = null, a = [];
    Array.isArray(o) ? (o.forEach((f) => {
      a = a.concat(f.data);
    }), s = t || i) : (a = t, s = i), a.forEach((f, g) => {
      f._dataIndex = g, f.labels !== void 0 && !Array.isArray(f.labels[0]) && (f.labels = [
        f.labels
      ]);
    });
    const r = s && typeof s == "object" ? s : {};
    if (r._type = o, r.x = typeof r.x < "u" && r.x != null && !isNaN(Number(r.x)) ? r.x : 1, r.y = typeof r.y < "u" && r.y != null && !isNaN(Number(r.y)) ? r.y : 1, r.w = r.w || "50%", r.h = r.h || "50%", r.objectName = r.objectName ? ie(r.objectName) : `Chart ${e._slideObjects.filter((f) => f._type === se.chart).length}`, [
      "bar",
      "col"
    ].includes(r.barDir || "") || (r.barDir = "col"), r._type === W.AREA && ([
      "stacked",
      "standard",
      "percentStacked"
    ].includes(r.barGrouping || "") || (r.barGrouping = "standard")), r._type === W.BAR && ([
      "clustered",
      "stacked",
      "percentStacked"
    ].includes(r.barGrouping || "") || (r.barGrouping = "clustered")), r._type === W.BAR3D && ([
      "clustered",
      "stacked",
      "standard",
      "percentStacked"
    ].includes(r.barGrouping || "") || (r.barGrouping = "standard")), !((n = r.barGrouping) === null || n === void 0) && n.includes("tacked") && (r.barGapWidthPct || (r.barGapWidthPct = 50)), r.dataLabelPosition && ((r._type === W.AREA || r._type === W.BAR3D || r._type === W.DOUGHNUT || r._type === W.RADAR) && delete r.dataLabelPosition, r._type === W.PIE && ([
      "bestFit",
      "ctr",
      "inEnd",
      "outEnd"
    ].includes(r.dataLabelPosition) || delete r.dataLabelPosition), (r._type === W.BUBBLE || r._type === W.BUBBLE3D || r._type === W.LINE || r._type === W.SCATTER) && ([
      "b",
      "ctr",
      "l",
      "r",
      "t"
    ].includes(r.dataLabelPosition) || delete r.dataLabelPosition), r._type === W.BAR && ([
      "stacked",
      "percentStacked"
    ].includes(r.barGrouping || "") || [
      "ctr",
      "inBase",
      "inEnd"
    ].includes(r.dataLabelPosition) || delete r.dataLabelPosition, [
      "clustered"
    ].includes(r.barGrouping || "") || [
      "ctr",
      "inBase",
      "inEnd",
      "outEnd"
    ].includes(r.dataLabelPosition) || delete r.dataLabelPosition)), r.dataLabelBkgrdColors = r.dataLabelBkgrdColors || !r.dataLabelBkgrdColors ? r.dataLabelBkgrdColors : false, [
      "b",
      "l",
      "r",
      "t",
      "tr"
    ].includes(r.legendPos || "") || (r.legendPos = "r"), [
      "cone",
      "coneToMax",
      "box",
      "cylinder",
      "pyramid",
      "pyramidToMax"
    ].includes(r.bar3DShape || "") || (r.bar3DShape = "box"), [
      "circle",
      "dash",
      "diamond",
      "dot",
      "none",
      "square",
      "triangle"
    ].includes(r.lineDataSymbol || "") || (r.lineDataSymbol = "circle"), [
      "gap",
      "span"
    ].includes(r.displayBlanksAs || "") || (r.displayBlanksAs = "span"), [
      "standard",
      "marker",
      "filled"
    ].includes(r.radarStyle || "") || (r.radarStyle = "standard"), r.lineDataSymbolSize = r.lineDataSymbolSize && !isNaN(r.lineDataSymbolSize) ? r.lineDataSymbolSize : 6, r.lineDataSymbolLineSize = r.lineDataSymbolLineSize && !isNaN(r.lineDataSymbolLineSize) ? oe(r.lineDataSymbolLineSize) : oe(0.75), r.layout && [
      "x",
      "y",
      "w",
      "h"
    ].forEach((f) => {
      const g = r.layout[f];
      (isNaN(Number(g)) || g < 0 || g > 1) && (console.warn("Warning: chart.layout." + f + " can only be 0-1"), delete r.layout[f]);
    }), r.catGridLine = r.catGridLine || (r._type === W.SCATTER ? {
      color: "D9D9D9",
      size: 1
    } : {
      style: "none"
    }), r.valGridLine = r.valGridLine || (r._type === W.SCATTER ? {
      color: "D9D9D9",
      size: 1
    } : {}), r.serGridLine = r.serGridLine || (r._type === W.SCATTER ? {
      color: "D9D9D9",
      size: 1
    } : {
      style: "none"
    }), A(r.catGridLine), A(r.valGridLine), A(r.serGridLine), Et(r.shadow), r.showDataTable = r.showDataTable || !r.showDataTable ? r.showDataTable : false, r.showDataTableHorzBorder = r.showDataTableHorzBorder || !r.showDataTableHorzBorder ? r.showDataTableHorzBorder : true, r.showDataTableVertBorder = r.showDataTableVertBorder || !r.showDataTableVertBorder ? r.showDataTableVertBorder : true, r.showDataTableOutline = r.showDataTableOutline || !r.showDataTableOutline ? r.showDataTableOutline : true, r.showDataTableKeys = r.showDataTableKeys || !r.showDataTableKeys ? r.showDataTableKeys : true, r.showLabel = r.showLabel || !r.showLabel ? r.showLabel : false, r.showLegend = r.showLegend || !r.showLegend ? r.showLegend : false, r.showPercent = r.showPercent || !r.showPercent ? r.showPercent : true, r.showTitle = r.showTitle || !r.showTitle ? r.showTitle : false, r.showValue = r.showValue || !r.showValue ? r.showValue : false, r.showLeaderLines = r.showLeaderLines || !r.showLeaderLines ? r.showLeaderLines : false, r.catAxisLineShow = typeof r.catAxisLineShow < "u" ? r.catAxisLineShow : true, r.valAxisLineShow = typeof r.valAxisLineShow < "u" ? r.valAxisLineShow : true, r.serAxisLineShow = typeof r.serAxisLineShow < "u" ? r.serAxisLineShow : true, r.v3DRotX = !isNaN(r.v3DRotX) && r.v3DRotX >= -90 && r.v3DRotX <= 90 ? r.v3DRotX : 30, r.v3DRotY = !isNaN(r.v3DRotY) && r.v3DRotY >= 0 && r.v3DRotY <= 360 ? r.v3DRotY : 30, r.v3DRAngAx = r.v3DRAngAx || !r.v3DRAngAx ? r.v3DRAngAx : true, r.v3DPerspective = !isNaN(r.v3DPerspective) && r.v3DPerspective >= 0 && r.v3DPerspective <= 240 ? r.v3DPerspective : 30, r.barGapWidthPct = !isNaN(r.barGapWidthPct) && r.barGapWidthPct >= 0 && r.barGapWidthPct <= 1e3 ? r.barGapWidthPct : 150, r.barGapDepthPct = !isNaN(r.barGapDepthPct) && r.barGapDepthPct >= 0 && r.barGapDepthPct <= 1e3 ? r.barGapDepthPct : 150, r.chartColors = Array.isArray(r.chartColors) ? r.chartColors : r._type === W.PIE || r._type === W.DOUGHNUT ? Na : tt, r.chartColorsOpacity = r.chartColorsOpacity && !isNaN(r.chartColorsOpacity) ? r.chartColorsOpacity : null, r.border = r.border && typeof r.border == "object" ? r.border : null, r.border && (!r.border.pt || isNaN(r.border.pt)) && (r.border.pt = Qe.pt), r.border && (!r.border.color || typeof r.border.color != "string") && (r.border.color = Qe.color), r.plotArea = r.plotArea || {}, r.plotArea.border = r.plotArea.border && typeof r.plotArea.border == "object" ? r.plotArea.border : null, r.plotArea.border && (!r.plotArea.border.pt || isNaN(r.plotArea.border.pt)) && (r.plotArea.border.pt = Qe.pt), r.plotArea.border && (!r.plotArea.border.color || typeof r.plotArea.border.color != "string") && (r.plotArea.border.color = Qe.color), r.border && (r.plotArea.border = r.border), r.plotArea.fill = r.plotArea.fill || {
      color: null,
      transparency: null
    }, r.fill && (r.plotArea.fill.color = r.fill), r.chartArea = r.chartArea || {}, r.chartArea.border = r.chartArea.border && typeof r.chartArea.border == "object" ? r.chartArea.border : null, r.chartArea.border && (r.chartArea.border = {
      color: r.chartArea.border.color || Qe.color,
      pt: r.chartArea.border.pt || Qe.pt
    }), r.chartArea.roundedCorners = typeof r.chartArea.roundedCorners == "boolean" ? r.chartArea.roundedCorners : true, r.dataBorder = r.dataBorder && typeof r.dataBorder == "object" ? r.dataBorder : null, r.dataBorder && (!r.dataBorder.pt || isNaN(r.dataBorder.pt)) && (r.dataBorder.pt = 0.75), r.dataBorder && r.dataBorder.color) {
      const f = typeof r.dataBorder.color == "string" && r.dataBorder.color.length === 6 && /^[0-9A-Fa-f]{6}$/.test(r.dataBorder.color), g = Object.values(ut).includes(r.dataBorder.color);
      !f && !g && (r.dataBorder.color = "F9F9F9");
    }
    return !r.dataLabelFormatCode && r._type === W.SCATTER && (r.dataLabelFormatCode = "General"), !r.dataLabelFormatCode && (r._type === W.PIE || r._type === W.DOUGHNUT) && (r.dataLabelFormatCode = r.showPercent ? "0%" : "General"), r.dataLabelFormatCode = r.dataLabelFormatCode && typeof r.dataLabelFormatCode == "string" ? r.dataLabelFormatCode : "#,##0", !r.dataLabelFormatScatter && r._type === W.SCATTER && (r.dataLabelFormatScatter = "custom"), r.lineSize = typeof r.lineSize == "number" ? r.lineSize : 2, r.valAxisMajorUnit = typeof r.valAxisMajorUnit == "number" ? r.valAxisMajorUnit : null, r._type === W.AREA || r._type === W.BAR || r._type === W.BAR3D || r._type === W.LINE ? r.catAxisMultiLevelLabels = !!r.catAxisMultiLevelLabels : delete r.catAxisMultiLevelLabels, c._type = "chart", c.options = r, c.chartRid = Se(e), e._relsChart.push({
      rId: Se(e),
      data: a,
      opts: r,
      type: r._type,
      globalId: l,
      fileName: `chart${l}.xml`,
      Target: `/ppt/charts/chart${l}.xml`
    }), e._slideObjects.push(c), c;
  }
  function ra(e, o) {
    const t = {
      _type: null,
      text: null,
      options: null,
      image: null,
      imageRid: null,
      hyperlink: null
    }, i = o.x || 0, n = o.y || 0, A = o.w || 0, l = o.h || 0, c = o.sizing || null, s = o.hyperlink || "", a = o.data || "", r = o.path || "";
    let f = Se(e);
    const g = o.objectName ? ie(o.objectName) : `Image ${e._slideObjects.filter((m) => m._type === se.image).length}`;
    if (!r && !a) return console.error("ERROR: addImage() requires either 'data' or 'path' parameter!"), null;
    if (r && typeof r != "string") return console.error(`ERROR: addImage() 'path' should be a string, ex: {path:'/img/sample.png'} - you sent ${String(r)}`), null;
    if (a && typeof a != "string") return console.error(`ERROR: addImage() 'data' should be a string, ex: {data:'image/png;base64,NMP[...]'} - you sent ${String(a)}`), null;
    if (a && typeof a == "string" && !a.toLowerCase().includes("base64,")) return console.error("ERROR: Image `data` value lacks a base64 header! Ex: 'image/png;base64,NMP[...]')"), null;
    let d = (r.substring(r.lastIndexOf("/") + 1).split("?")[0].split(".").pop().split("#")[0] || "png").toLowerCase();
    if (a && /image\/(\w+);/.exec(a) && /image\/(\w+);/.exec(a).length > 0 ? d = /image\/(\w+);/.exec(a)[1] : (a == null ? void 0 : a.toLowerCase().includes("image/svg+xml")) && (d = "svg"), t._type = se.image, t.image = r || "preencoded.png", t.options = {
      x: i || 0,
      y: n || 0,
      w: A || 1,
      h: l || 1,
      altText: o.altText || "",
      rounding: typeof o.rounding == "boolean" ? o.rounding : false,
      sizing: c,
      placeholder: o.placeholder,
      rotate: o.rotate || 0,
      flipV: o.flipV || false,
      flipH: o.flipH || false,
      transparency: o.transparency || 0,
      objectName: g,
      shadow: Et(o.shadow)
    }, d === "svg") e._relsMedia.push({
      path: r || a + "png",
      type: "image/png",
      extn: "png",
      data: a || "",
      rId: f,
      Target: `../media/image-${e._slideNum}-${e._relsMedia.length + 1}.png`,
      isSvgPng: true,
      svgSize: {
        w: de(t.options.w, "X", e._presLayout),
        h: de(t.options.h, "Y", e._presLayout)
      }
    }), t.imageRid = f, e._relsMedia.push({
      path: r || a,
      type: "image/svg+xml",
      extn: d,
      data: a || "",
      rId: f + 1,
      Target: `../media/image-${e._slideNum}-${e._relsMedia.length + 1}.${d}`
    }), t.imageRid = f + 1;
    else {
      const m = e._relsMedia.filter((h) => h.path && h.path === r && h.type === "image/" + d && !h.isDuplicate)[0];
      e._relsMedia.push({
        path: r || "preencoded." + d,
        type: "image/" + d,
        extn: d,
        data: a || "",
        rId: f,
        isDuplicate: !!(m == null ? void 0 : m.Target),
        Target: (m == null ? void 0 : m.Target) ? m.Target : `../media/image-${e._slideNum}-${e._relsMedia.length + 1}.${d}`
      }), t.imageRid = f;
    }
    if (typeof s == "object") {
      if (!s.url && !s.slide) throw new Error("ERROR: `hyperlink` option requires either: `url` or `slide`");
      f++, e._rels.push({
        type: se.hyperlink,
        data: s.slide ? "slide" : "dummy",
        rId: f,
        Target: s.url || s.slide.toString()
      }), s._rId = f, t.hyperlink = s;
    }
    e._slideObjects.push(t);
  }
  function Ia(e, o) {
    const t = o.x || 0, i = o.y || 0, n = o.w || 2, A = o.h || 2, l = o.data || "", c = o.link || "", s = o.path || "", a = o.type || "audio";
    let r = "";
    const f = o.cover || _a, g = o.objectName ? ie(o.objectName) : `Media ${e._slideObjects.filter((m) => m._type === se.media).length}`, d = {
      _type: se.media
    };
    if (!s && !l && a !== "online") throw new Error("addMedia() error: either `data` or `path` are required!");
    if (l && !l.toLowerCase().includes("base64,")) throw new Error("addMedia() error: `data` value lacks a base64 header! Ex: 'video/mpeg;base64,NMP[...]')");
    if (!f.toLowerCase().includes("base64,")) throw new Error("addMedia() error: `cover` value lacks a base64 header! Ex: 'data:image/png;base64,iV[...]')");
    if (a === "online" && !c) throw new Error("addMedia() error: online videos require `link` value");
    if (r = o.extn || (l ? l.split(";")[0].split("/")[1] : s.split(".").pop()) || "mp3", d.mtype = a, d.media = s || "preencoded.mov", d.options = {}, d.options.x = t, d.options.y = i, d.options.w = n, d.options.h = A, d.options.objectName = g, a === "online") {
      const m = Se(e);
      e._relsMedia.push({
        path: s || "preencoded" + r,
        data: "dummy",
        type: "online",
        extn: r,
        rId: m,
        Target: c
      }), d.mediaRid = m, e._relsMedia.push({
        path: "preencoded.png",
        data: f,
        type: "image/png",
        extn: "png",
        rId: Se(e),
        Target: `../media/image-${e._slideNum}-${e._relsMedia.length + 1}.png`
      });
    } else {
      const m = e._relsMedia.filter((y) => y.path && y.path === s && y.type === a + "/" + r && !y.isDuplicate)[0], h = Se(e);
      e._relsMedia.push({
        path: s || "preencoded" + r,
        type: a + "/" + r,
        extn: r,
        data: l || "",
        rId: h,
        isDuplicate: !!(m == null ? void 0 : m.Target),
        Target: (m == null ? void 0 : m.Target) ? m.Target : `../media/media-${e._slideNum}-${e._relsMedia.length + 1}.${r}`
      }), d.mediaRid = h, e._relsMedia.push({
        path: s || "preencoded" + r,
        type: a + "/" + r,
        extn: r,
        data: l || "",
        rId: Se(e),
        isDuplicate: !!(m == null ? void 0 : m.Target),
        Target: (m == null ? void 0 : m.Target) ? m.Target : `../media/media-${e._slideNum}-${e._relsMedia.length + 0}.${r}`
      }), e._relsMedia.push({
        path: "preencoded.png",
        type: "image/png",
        extn: "png",
        data: f,
        rId: Se(e),
        Target: `../media/image-${e._slideNum}-${e._relsMedia.length + 1}.png`
      });
    }
    e._slideObjects.push(d);
  }
  function Ma(e, o) {
    e._slideObjects.push({
      _type: se.notes,
      text: [
        {
          text: o
        }
      ]
    });
  }
  function St(e, o, t) {
    const i = typeof t == "object" ? t : {};
    i.line = i.line || {
      type: "none"
    };
    const n = {
      _type: se.text,
      shape: o || Ee.RECTANGLE,
      options: i,
      text: null
    };
    if (!o) throw new Error("Missing/Invalid shape parameter! Example: `addShape(pptxgen.shapes.LINE, {x:1, y:1, w:1, h:1});`");
    const A = {
      type: i.line.type || "solid",
      color: i.line.color || Zt,
      transparency: i.line.transparency || 0,
      width: i.line.width || 1,
      dashType: i.line.dashType || "solid",
      beginArrowType: i.line.beginArrowType || null,
      endArrowType: i.line.endArrowType || null
    };
    if (typeof i.line == "object" && i.line.type !== "none" && (i.line = A), i.x = i.x || (i.x === 0 ? 0 : 1), i.y = i.y || (i.y === 0 ? 0 : 1), i.w = i.w || (i.w === 0 ? 0 : 1), i.h = i.h || (i.h === 0 ? 0 : 1), i.objectName = i.objectName ? ie(i.objectName) : `Shape ${e._slideObjects.filter((l) => l._type === se.text).length}`, typeof i.line == "string") {
      const l = A;
      l.color = String(i.line), i.line = l;
    }
    typeof i.lineSize == "number" && (i.line.width = i.lineSize), typeof i.lineDash == "string" && (i.line.dashType = i.lineDash), typeof i.lineHead == "string" && (i.line.beginArrowType = i.lineHead), typeof i.lineTail == "string" && (i.line.endArrowType = i.lineTail), Ye(e, n), e._slideObjects.push(n);
  }
  function Ua(e, o, t, i, n, A, l) {
    const c = [
      e
    ], s = t && typeof t == "object" ? t : {};
    s.objectName = s.objectName ? ie(s.objectName) : `Table ${e._slideObjects.filter((g) => g._type === se.table).length}`;
    {
      if (o === null || o.length === 0 || !Array.isArray(o)) throw new Error("addTable: Array expected! EX: 'slide.addTable( [rows], {options} );' (https://gitbrent.github.io/PptxGenJS/docs/api-tables.html)");
      if (!o[0] || !Array.isArray(o[0])) throw new Error("addTable: 'rows' should be an array of cells! EX: 'slide.addTable( [ ['A'], ['B'], {text:'C',options:{align:'center'}} ] );' (https://gitbrent.github.io/PptxGenJS/docs/api-tables.html)");
    }
    const a = [];
    o.forEach((g) => {
      const d = [];
      Array.isArray(g) ? g.forEach((m) => {
        const h = {
          _type: se.tablecell,
          text: "",
          options: typeof m == "object" && m.options ? m.options : {}
        };
        typeof m == "string" || typeof m == "number" ? h.text = m.toString() : m.text && (typeof m.text == "string" || typeof m.text == "number" ? h.text = m.text.toString() : m.text && (h.text = m.text), m.options && typeof m.options == "object" && (h.options = m.options)), h.options.border = h.options.border || s.border || [
          {
            type: "none"
          },
          {
            type: "none"
          },
          {
            type: "none"
          },
          {
            type: "none"
          }
        ];
        const y = h.options.border;
        !Array.isArray(y) && typeof y == "object" && (h.options.border = [
          y,
          y,
          y,
          y
        ]), h.options.border[0] || (h.options.border[0] = {
          type: "none"
        }), h.options.border[1] || (h.options.border[1] = {
          type: "none"
        }), h.options.border[2] || (h.options.border[2] = {
          type: "none"
        }), h.options.border[3] || (h.options.border[3] = {
          type: "none"
        }), [
          0,
          1,
          2,
          3
        ].forEach((b) => {
          h.options.border[b] = {
            type: h.options.border[b].type || Ge.type,
            color: h.options.border[b].color || Ge.color,
            pt: typeof h.options.border[b].pt == "number" ? h.options.border[b].pt : Ge.pt
          };
        }), d.push(h);
      }) : (console.log("addTable: tableRows has a bad row. A row should be an array of cells. You provided:"), console.log(g)), a.push(d);
    }), s.x = de(s.x || (s.x === 0 ? 0 : Ae / 2), "X", n), s.y = de(s.y || (s.y === 0 ? 0 : Ae / 2), "Y", n), s.h && (s.h = de(s.h, "Y", n)), s.fontSize = s.fontSize || Fe, s.margin = s.margin === 0 || s.margin ? s.margin : Kt, typeof s.margin == "number" && (s.margin = [
      Number(s.margin),
      Number(s.margin),
      Number(s.margin),
      Number(s.margin)
    ]), JSON.stringify({
      arrRows: a
    }).indexOf("hyperlink") === -1 && (s.color || (s.color = s.color || Le)), typeof s.border == "string" ? (console.warn("addTable `border` option must be an object. Ex: `{border: {type:'none'}}`"), s.border = null) : Array.isArray(s.border) && [
      0,
      1,
      2,
      3
    ].forEach((g) => {
      s.border[g] = s.border[g] ? {
        type: s.border[g].type || Ge.type,
        color: s.border[g].color || Ge.color,
        pt: s.border[g].pt || Ge.pt
      } : {
        type: "none"
      };
    }), s.autoPage = typeof s.autoPage == "boolean" ? s.autoPage : false, s.autoPageRepeatHeader = typeof s.autoPageRepeatHeader == "boolean" ? s.autoPageRepeatHeader : false, s.autoPageHeaderRows = typeof s.autoPageHeaderRows < "u" && !isNaN(Number(s.autoPageHeaderRows)) ? Number(s.autoPageHeaderRows) : 1, s.autoPageLineWeight = typeof s.autoPageLineWeight < "u" && !isNaN(Number(s.autoPageLineWeight)) ? Number(s.autoPageLineWeight) : 0, s.autoPageLineWeight && (s.autoPageLineWeight > 1 ? s.autoPageLineWeight = 1 : s.autoPageLineWeight < -1 && (s.autoPageLineWeight = -1));
    let r = rt;
    if (i && typeof i._margin < "u" && (Array.isArray(i._margin) ? r = i._margin : isNaN(Number(i._margin)) || (r = [
      Number(i._margin),
      Number(i._margin),
      Number(i._margin),
      Number(i._margin)
    ])), s.colW) {
      const g = a[0].reduce((d, m) => {
        var h;
        return !((h = m == null ? void 0 : m.options) === null || h === void 0) && h.colspan && typeof m.options.colspan == "number" ? d += m.options.colspan : d += 1, d;
      }, 0);
      typeof s.colW == "string" || typeof s.colW == "number" || s.colW && Array.isArray(s.colW) && s.colW.length === 1 && g > 1 ? (s.w = Math.floor(Number(s.colW) * g), s.colW = null) : s.colW && Array.isArray(s.colW) && s.colW.length !== g && (console.warn("addTable: mismatch: (colW.length != data.length) Therefore, defaulting to evenly distributed col widths."), s.colW = null);
    } else s.w ? s.w = de(s.w, "X", n) : s.w = Math.floor(n._sizeW / Ae - r[1] - r[3]);
    s.x && s.x < 20 && (s.x = he(s.x)), s.y && s.y < 20 && (s.y = he(s.y)), s.w && typeof s.w == "number" && s.w < 20 && (s.w = he(s.w)), s.h && typeof s.h == "number" && s.h < 20 && (s.h = he(s.h)), a.forEach((g) => {
      g.forEach((d, m) => {
        typeof d == "number" || typeof d == "string" ? g[m] = {
          _type: se.tablecell,
          text: String(g[m]),
          options: s
        } : typeof d == "object" && (typeof d.text == "number" ? g[m].text = g[m].text.toString() : (typeof d.text > "u" || d.text === null) && (g[m].text = ""), g[m].options = d.options || {}, g[m]._type = se.tablecell);
      });
    });
    const f = [];
    return s && !s.autoPage ? (Ye(e, a), e._slideObjects.push({
      _type: se.table,
      arrTabRows: a,
      options: Object.assign({}, s)
    })) : (s.autoPageRepeatHeader && (s._arrObjTabHeadRows = a.filter((g, d) => d < s.autoPageHeaderRows)), ta(a, s, n, i).forEach((g, d) => {
      l(e._slideNum + d) || c.push(A({
        masterName: (i == null ? void 0 : i._name) || null
      })), d > 0 && (s.y = he(s.autoPageSlideStartY || s.newSlideStartY || r[0]));
      {
        const m = l(e._slideNum + d);
        s.autoPage = false, Ye(m, g.rows), m.addTable(g.rows, Object.assign({}, s)), d > 0 && f.push(m);
      }
    })), f;
  }
  function ht(e, o, t, i) {
    const n = {
      _type: i ? se.placeholder : se.text,
      shape: (t == null ? void 0 : t.shape) || Ee.RECTANGLE,
      text: !o || o.length === 0 ? [
        {
          text: "",
          options: null
        }
      ] : o,
      options: t || {}
    };
    function A(l) {
      {
        if (l.placeholder || (l.color = l.color || n.options.color || e.color || Le), (l.placeholder || i) && (l.bullet = l.bullet || false), l.placeholder && e._slideLayout && e._slideLayout._slideObjects) {
          const c = e._slideLayout._slideObjects.filter((s) => s._type === "placeholder" && s.options && s.options.placeholder && s.options.placeholder === l.placeholder)[0];
          (c == null ? void 0 : c.options) && (l = Object.assign(Object.assign({}, l), c.options));
        }
        if (l.objectName = l.objectName ? ie(l.objectName) : `Text ${e._slideObjects.filter((c) => c._type === se.text).length}`, l.shape === Ee.LINE) {
          const c = {
            type: l.line.type || "solid",
            color: l.line.color || Zt,
            transparency: l.line.transparency || 0,
            width: l.line.width || 1,
            dashType: l.line.dashType || "solid",
            beginArrowType: l.line.beginArrowType || null,
            endArrowType: l.line.endArrowType || null
          };
          if (typeof l.line == "object" && (l.line = c), typeof l.line == "string") {
            const s = c;
            typeof l.line == "string" && (s.color = l.line), l.line = s;
          }
          typeof l.lineSize == "number" && (l.line.width = l.lineSize), typeof l.lineDash == "string" && (l.line.dashType = l.lineDash), typeof l.lineHead == "string" && (l.line.beginArrowType = l.lineHead), typeof l.lineTail == "string" && (l.line.endArrowType = l.lineTail);
        }
        l.line = l.line || {}, l.lineSpacing = l.lineSpacing && !isNaN(l.lineSpacing) ? l.lineSpacing : null, l.lineSpacingMultiple = l.lineSpacingMultiple && !isNaN(l.lineSpacingMultiple) ? l.lineSpacingMultiple : null, l._bodyProp = l._bodyProp || {}, l._bodyProp.autoFit = l.autoFit || false, l._bodyProp.anchor = l.placeholder ? null : qe.ctr, l._bodyProp.vert = l.vert || null, l._bodyProp.wrap = typeof l.wrap == "boolean" ? l.wrap : true, (l.inset && !isNaN(Number(l.inset)) || l.inset === 0) && (l._bodyProp.lIns = he(l.inset), l._bodyProp.rIns = he(l.inset), l._bodyProp.tIns = he(l.inset), l._bodyProp.bIns = he(l.inset)), typeof l.underline == "boolean" && l.underline === true && (l.underline = {
          style: "sng"
        });
      }
      return (l.align || "").toLowerCase().indexOf("c") === 0 ? l._bodyProp.align = We.center : (l.align || "").toLowerCase().indexOf("l") === 0 ? l._bodyProp.align = We.left : (l.align || "").toLowerCase().indexOf("r") === 0 ? l._bodyProp.align = We.right : (l.align || "").toLowerCase().indexOf("j") === 0 && (l._bodyProp.align = We.justify), (l.valign || "").toLowerCase().indexOf("b") === 0 ? l._bodyProp.anchor = qe.b : (l.valign || "").toLowerCase().indexOf("m") === 0 ? l._bodyProp.anchor = qe.ctr : (l.valign || "").toLowerCase().indexOf("t") === 0 && (l._bodyProp.anchor = qe.t), Et(l.shadow), l;
    }
    n.options = A(n.options), n.text.forEach((l) => l.options = A(l.options || {})), Ye(e, n.text || ""), e._slideObjects.push(n);
  }
  function Xa(e) {
    (e._slideLayout._slideObjects || []).forEach((o) => {
      o._type === se.placeholder && e._slideObjects.filter((t) => t.options && t.options.placeholder === o.options.placeholder).length === 0 && ht(e, [
        {
          text: ""
        }
      ], o.options, false);
    });
  }
  function na(e, o) {
    var t;
    if (o.bkgd && (o.background || (o.background = {}), typeof o.bkgd == "string" ? o.background.color = o.bkgd : (o.bkgd.data && (o.background.data = o.bkgd.data), o.bkgd.path && (o.background.path = o.bkgd.path), o.bkgd.src && (o.background.path = o.bkgd.src))), !((t = o.background) === null || t === void 0) && t.fill && (o.background.color = o.background.fill), e && (e.path || e.data)) {
      e.path = e.path || "preencoded.png";
      let i = (e.path.split(".").pop() || "png").split("?")[0];
      i === "jpg" && (i = "jpeg"), o._relsMedia = o._relsMedia || [];
      const n = o._relsMedia.length + 1;
      o._relsMedia.push({
        path: e.path,
        type: se.image,
        extn: i,
        data: e.data || null,
        rId: n,
        Target: `../media/${(o._name || "").replace(/\s+/gi, "-")}-image-${o._relsMedia.length + 1}.${i}`
      }), o._bkgdImgRid = n;
    }
  }
  function Ye(e, o, t) {
    let i = [];
    typeof o == "string" || typeof o == "number" || (Array.isArray(o) ? i = o : typeof o == "object" && (i = [
      o
    ]), i.forEach((n, A) => {
      if (t && t[A] && t[A].hyperlink && (n.options = Object.assign(Object.assign({}, n.options), t[A])), Array.isArray(n)) {
        const l = [];
        n.forEach((c) => {
          c.options && !c.text.options && l.push(c.options);
        }), Ye(e, n, l);
      } else if (Array.isArray(n.text)) Ye(e, n.text, t && t[A] ? [
        t[A]
      ] : void 0);
      else if (n && typeof n == "object" && n.options && n.options.hyperlink && !n.options.hyperlink._rId) if (typeof n.options.hyperlink != "object") console.log("ERROR: text `hyperlink` option should be an object. Ex: `hyperlink: {url:'https://github.com'}` ");
      else if (!n.options.hyperlink.url && !n.options.hyperlink.slide) console.log("ERROR: 'hyperlink requires either: `url` or `slide`'");
      else {
        const l = Se(e);
        e._rels.push({
          type: se.hyperlink,
          data: n.options.hyperlink.slide ? "slide" : "dummy",
          rId: l,
          Target: ie(n.options.hyperlink.url) || n.options.hyperlink.slide.toString()
        }), n.options.hyperlink._rId = l;
      }
      else n && typeof n == "object" && n.options && n.options.hyperlink && n.options.hyperlink._rId && e._rels.filter((l) => l.rId === n.options.hyperlink._rId).length === 0 && e._rels.push({
        type: se.hyperlink,
        data: n.options.hyperlink.slide ? "slide" : "dummy",
        rId: n.options.hyperlink._rId,
        Target: ie(n.options.hyperlink.url) || n.options.hyperlink.slide.toString()
      });
    }));
  }
  class Ga {
    constructor(o) {
      var t;
      this.addSlide = o.addSlide, this.getSlide = o.getSlide, this._name = `Slide ${o.slideNumber}`, this._presLayout = o.presLayout, this._rId = o.slideRId, this._rels = [], this._relsChart = [], this._relsMedia = [], this._setSlideNum = o.setSlideNum, this._slideId = o.slideId, this._slideLayout = o.slideLayout || null, this._slideNum = o.slideNumber, this._slideObjects = [], this._slideNumberProps = !((t = this._slideLayout) === null || t === void 0) && t._slideNumberProps ? this._slideLayout._slideNumberProps : null;
    }
    set bkgd(o) {
      this._bkgd = o, (!this._background || !this._background.color) && (this._background || (this._background = {}), typeof o == "string" && (this._background.color = o));
    }
    get bkgd() {
      return this._bkgd;
    }
    set background(o) {
      this._background = o, o && na(o, this);
    }
    get background() {
      return this._background;
    }
    set color(o) {
      this._color = o;
    }
    get color() {
      return this._color;
    }
    set hidden(o) {
      this._hidden = o;
    }
    get hidden() {
      return this._hidden;
    }
    set slideNumber(o) {
      this._slideNumberProps = o, this._setSlideNum(o);
    }
    get slideNumber() {
      return this._slideNumberProps;
    }
    get newAutoPagedSlides() {
      return this._newAutoPagedSlides;
    }
    addChart(o, t, i) {
      const n = i || {};
      return n._type = o, aa(this, o, t, i), this;
    }
    addImage(o) {
      return ra(this, o), this;
    }
    addMedia(o) {
      return Ia(this, o), this;
    }
    addNotes(o) {
      return Ma(this, o), this;
    }
    addShape(o, t) {
      return St(this, o, t), this;
    }
    addTable(o, t) {
      return this._newAutoPagedSlides = Ua(this, o, t, this._slideLayout, this._presLayout, this.addSlide, this.getSlide), this;
    }
    addText(o, t) {
      return ht(this, typeof o == "string" || typeof o == "number" ? [
        {
          text: o,
          options: t
        }
      ] : o, t, false), this;
    }
  }
  function Qa(e, o) {
    return ke(this, void 0, void 0, function* () {
      const t = e.data;
      return yield new Promise((i, n) => {
        var A, l;
        const c = new Ht(), s = (t.length - 1) * 2 + 1, a = ((l = (A = t[0]) === null || A === void 0 ? void 0 : A.labels) === null || l === void 0 ? void 0 : l.length) > 1;
        c.folder("_rels"), c.folder("docProps"), c.folder("xl/_rels"), c.folder("xl/tables"), c.folder("xl/theme"), c.folder("xl/worksheets"), c.folder("xl/worksheets/_rels"), c.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>  <Default Extension="xml" ContentType="application/xml"/>  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>  <Override PartName="/xl/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>  <Override PartName="/xl/tables/table1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/>  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>
`), c.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>
`), c.file("docProps/app.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><Application>Microsoft Macintosh Excel</Application><DocSecurity>0</DocSecurity><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="2" baseType="variant"><vt:variant><vt:lpstr>Worksheets</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="1" baseType="lpstr"><vt:lpstr>Sheet1</vt:lpstr></vt:vector></TitlesOfParts><Company></Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>16.0300</AppVersion></Properties>
`), c.file("docProps/core.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:creator>PptxGenJS</dc:creator><cp:lastModifiedBy>PptxGenJS</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">' + (/* @__PURE__ */ new Date()).toISOString() + '</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">' + (/* @__PURE__ */ new Date()).toISOString() + "</dcterms:modified></cp:coreProperties>"), c.file("xl/_rels/workbook.xml.rels", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/></Relationships>'), c.file("xl/styles.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="1"><numFmt numFmtId="0" formatCode="General"/></numFmts><fonts count="4"><font><sz val="9"/><color indexed="8"/><name val="Geneva"/></font><font><sz val="9"/><color indexed="8"/><name val="Geneva"/></font><font><sz val="10"/><color indexed="8"/><name val="Geneva"/></font><font><sz val="18"/><color indexed="8"/><name val="Arial"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><dxfs count="0"/><tableStyles count="0"/><colors><indexedColors><rgbColor rgb="ff000000"/><rgbColor rgb="ffffffff"/><rgbColor rgb="ffff0000"/><rgbColor rgb="ff00ff00"/><rgbColor rgb="ff0000ff"/><rgbColor rgb="ffffff00"/><rgbColor rgb="ffff00ff"/><rgbColor rgb="ff00ffff"/><rgbColor rgb="ff000000"/><rgbColor rgb="ffffffff"/><rgbColor rgb="ff878787"/><rgbColor rgb="fff9f9f9"/></indexedColors></colors></styleSheet>
`), c.file("xl/theme/theme1.xml", '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont><a:latin typeface="Calibri Light" panose="020F0302020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="Yu Gothic Light"/><a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/><a:font script="Hans" typeface="DengXian Light"/><a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:majorFont><a:minorFont><a:latin typeface="Calibri" panose="020F0502020204030204"/><a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="Yu Gothic"/><a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/><a:font script="Hans" typeface="DengXian"/><a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Tahoma"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>'), c.file("xl/workbook.xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x15" xmlns:x15="http://schemas.microsoft.com/office/spreadsheetml/2010/11/main"><fileVersion appName="xl" lastEdited="7" lowestEdited="6" rupBuild="10507"/><workbookPr/><bookViews><workbookView xWindow="0" yWindow="500" windowWidth="20960" windowHeight="15960"/></bookViews><sheets><sheet name="Sheet1" sheetId="1" r:id="rId1"/></sheets><calcPr calcId="0" concurrentCalc="0"/></workbook>
`), c.file("xl/worksheets/_rels/sheet1.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" Target="../tables/table1.xml"/></Relationships>
`);
        {
          let r = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
          if (e.opts._type === W.BUBBLE || e.opts._type === W.BUBBLE3D) r += `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${s}" uniqueCount="${s}">`;
          else if (e.opts._type === W.SCATTER) r += `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${t.length}" uniqueCount="${t.length}">`;
          else if (a) {
            let f = t.length;
            t[0].labels.forEach((g) => f += g.filter((d) => d && d !== "").length), r += `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${f}" uniqueCount="${f}">`, r += "<si><t/></si>";
          } else {
            const f = t.length + t[0].labels.length * t[0].labels[0].length + t[0].labels.length, g = t.length + t[0].labels.length * t[0].labels[0].length + 1;
            r += `<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${f}" uniqueCount="${g}">`, r += '<si><t xml:space="preserve"></t></si>';
          }
          e.opts._type === W.BUBBLE || e.opts._type === W.BUBBLE3D ? t.forEach((f, g) => {
            g === 0 ? r += "<si><t>X-Axis</t></si>" : (r += `<si><t>${ie(f.name || `Y-Axis${g}`)}</t></si>`, r += `<si><t>${ie(`Size${g}`)}</t></si>`);
          }) : t.forEach((f) => {
            r += `<si><t>${ie((f.name || " ").replace("X-Axis", "X-Values"))}</t></si>`;
          }), e.opts._type !== W.BUBBLE && e.opts._type !== W.BUBBLE3D && e.opts._type !== W.SCATTER && t[0].labels.slice().reverse().forEach((f) => {
            f.filter((g) => g && g !== "").forEach((g) => {
              r += `<si><t>${ie(g)}</t></si>`;
            });
          }), r += `</sst>
`, c.file("xl/sharedStrings.xml", r);
        }
        {
          let r = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
          if (e.opts._type === W.BUBBLE || e.opts._type === W.BUBBLE3D) {
            r += `<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="1" name="Table1" displayName="Table1" ref="A1:${ve(s)}${s}" totalsRowShown="0">`, r += `<tableColumns count="${s}">`;
            let f = 1;
            t.forEach((g, d) => {
              d === 0 ? r += `<tableColumn id="${d + 1}" name="X-Values"/>` : (r += `<tableColumn id="${d + f}" name="${g.name}"/>`, f++, r += `<tableColumn id="${d + f}" name="Size${d}"/>`);
            });
          } else e.opts._type === W.SCATTER ? (r += `<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="1" name="Table1" displayName="Table1" ref="A1:${ve(t.length)}${t[0].values.length + 1}" totalsRowShown="0">`, r += `<tableColumns count="${t.length}">`, t.forEach((f, g) => {
            r += `<tableColumn id="${g + 1}" name="${g === 0 ? "X-Values" : "Y-Value "}${g}"/>`;
          })) : (r += `<table xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" id="1" name="Table1" displayName="Table1" ref="A1:${ve(t.length + t[0].labels.length)}${t[0].labels[0].length + 1}'" totalsRowShown="0">`, r += `<tableColumns count="${t.length + t[0].labels.length}">`, t[0].labels.forEach((f, g) => {
            r += `<tableColumn id="${g + 1}" name="Column${g + 1}"/>`;
          }), t.forEach((f, g) => {
            r += `<tableColumn id="${g + t[0].labels.length + 1}" name="${ie(f.name)}"/>`;
          }));
          r += "</tableColumns>", r += '<tableStyleInfo showFirstColumn="0" showLastColumn="0" showRowStripes="1" showColumnStripes="0"/>', r += "</table>", c.file("xl/tables/table1.xml", r);
        }
        {
          let r = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
          if (r += '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">', e.opts._type === W.BUBBLE || e.opts._type === W.BUBBLE3D ? r += `<dimension ref="A1:${ve(s)}${t[0].values.length + 1}"/>` : e.opts._type === W.SCATTER ? r += `<dimension ref="A1:${ve(t.length)}${t[0].values.length + 1}"/>` : r += `<dimension ref="A1:${ve(t.length + 1)}${t[0].values.length + 1}"/>`, r += '<sheetViews><sheetView tabSelected="1" workbookViewId="0"><selection activeCell="B1" sqref="B1"/></sheetView></sheetViews>', r += '<sheetFormatPr baseColWidth="10" defaultRowHeight="16"/>', e.opts._type === W.BUBBLE || e.opts._type === W.BUBBLE3D) {
            r += "<sheetData>", r += `<row r="1" spans="1:${s}">`, r += '<c r="A1" t="s"><v>0</v></c>';
            for (let f = 1; f < s; f++) r += `<c r="${ve(f + 1)}1" t="s"><v>${f}</v></c>`;
            r += "</row>", t[0].values.forEach((f, g) => {
              r += `<row r="${g + 2}" spans="1:${s}">`, r += `<c r="A${g + 2}"><v>${f}</v></c>`;
              let d = 2;
              for (let m = 1; m < t.length; m++) r += `<c r="${ve(d)}${g + 2}"><v>${t[m].values[g] || ""}</v></c>`, d++, r += `<c r="${ve(d)}${g + 2}"><v>${t[m].sizes[g] || ""}</v></c>`, d++;
              r += "</row>";
            });
          } else if (e.opts._type === W.SCATTER) {
            r += "<sheetData>", r += `<row r="1" spans="1:${t.length}">`;
            for (let f = 0; f < t.length; f++) r += `<c r="${ve(f + 1)}1" t="s"><v>${f}</v></c>`;
            r += "</row>", t[0].values.forEach((f, g) => {
              r += `<row r="${g + 2}" spans="1:${t.length}">`, r += `<c r="A${g + 2}"><v>${f}</v></c>`;
              for (let d = 1; d < t.length; d++) r += `<c r="${ve(d + 1)}${g + 2}"><v>${t[d].values[g] || t[d].values[g] === 0 ? t[d].values[g] : ""}</v></c>`;
              r += "</row>";
            });
          } else if (r += "<sheetData>", a) {
            r += `<row r="1" spans="1:${t.length + t[0].labels.length}">`;
            for (let m = 0; m < t[0].labels.length; m++) r += `<c r="${ve(m + 1)}1" t="s"><v>0</v></c>`;
            for (let m = t[0].labels.length - 1; m < t.length + t[0].labels.length - 1; m++) r += `<c r="${ve(m + t[0].labels.length)}1" t="s"><v>${m}</v></c>`;
            r += "</row>";
            const f = t.length, g = t[0].labels[0].length, d = t[0].labels.length;
            for (let m = 0; m < g; m++) {
              r += `<row r="${m + 2}" spans="1:${f + d}">`;
              let h = f;
              const y = t[0].labels.slice().reverse();
              y.forEach((v, b) => {
                if (v[m]) {
                  const k = b === 0 ? 1 : y[b - 1].filter((B) => B && B !== "").length;
                  h += k, r += `<c r="${ve(m + 1 + b)}${m + 2}" t="s"><v>${h}</v></c>`;
                }
              });
              for (let v = 0; v < f; v++) r += `<c r="${ve(d + v + 1)}${m + 2}"><v>${t[v].values[m] || 0}</v></c>`;
              r += "</row>";
            }
          } else {
            r += `<row r="1" spans="1:${t.length + t[0].labels.length}">`, t[0].labels.forEach((f, g) => {
              r += `<c r="${ve(g + 1)}1" t="s"><v>0</v></c>`;
            });
            for (let f = 0; f < t.length; f++) r += `<c r="${ve(f + 1 + t[0].labels.length)}1" t="s"><v>${f + 1}</v></c>`;
            r += "</row>", t[0].labels[0].forEach((f, g) => {
              r += `<row r="${g + 2}" spans="1:${t.length + t[0].labels.length}">`;
              for (let d = t[0].labels.length - 1; d >= 0; d--) r += `<c r="${ve(t[0].labels.length - d)}${g + 2}" t="s">`, r += `<v>${t.length + g + 1}</v>`, r += "</c>";
              for (let d = 0; d < t.length; d++) r += `<c r="${ve(t[0].labels.length + d + 1)}${g + 2}"><v>${t[d].values[g] || ""}</v></c>`;
              r += "</row>";
            });
          }
          r += "</sheetData>", r += '<pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3"/>', r += `</worksheet>
`, c.file("xl/worksheets/sheet1.xml", r);
        }
        c.generateAsync({
          type: "base64"
        }).then((r) => {
          o.file(`ppt/embeddings/Microsoft_Excel_Worksheet${e.globalId}.xlsx`, r, {
            base64: true
          }), o.file("ppt/charts/_rels/" + e.fileName + ".rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/package" Target="../embeddings/Microsoft_Excel_Worksheet${e.globalId}.xlsx"/></Relationships>`), o.file(`ppt/charts/${e.fileName}`, Oa(e)), i("");
        }).catch((r) => {
          n(r);
        });
      });
    });
  }
  function Oa(e) {
    var o, t, i, n;
    let A = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>', l = false;
    if (A += '<c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">', A += '<c:date1904 val="0"/>', A += `<c:roundedCorners val="${e.opts.chartArea.roundedCorners ? "1" : "0"}"/>`, A += "<c:chart>", e.opts.showTitle ? (A += mt({
      title: e.opts.title || "Chart Title",
      color: e.opts.titleColor,
      fontFace: e.opts.titleFontFace,
      fontSize: e.opts.titleFontSize || Pa,
      titleAlign: e.opts.titleAlign,
      titleBold: e.opts.titleBold,
      titlePos: e.opts.titlePos,
      titleRotate: e.opts.titleRotate
    }, e.opts.x, e.opts.y), A += '<c:autoTitleDeleted val="0"/>') : A += '<c:autoTitleDeleted val="1"/>', e.opts._type === W.BAR3D && (A += `<c:view3D><c:rotX val="${e.opts.v3DRotX}"/><c:rotY val="${e.opts.v3DRotY}"/><c:rAngAx val="${e.opts.v3DRAngAx ? 1 : 0}"/><c:perspective val="${e.opts.v3DPerspective}"/></c:view3D>`), A += "<c:plotArea>", e.opts.layout ? (A += "<c:layout>", A += " <c:manualLayout>", A += '  <c:layoutTarget val="inner" />', A += '  <c:xMode val="edge" />', A += '  <c:yMode val="edge" />', A += '  <c:x val="' + (e.opts.layout.x || 0) + '" />', A += '  <c:y val="' + (e.opts.layout.y || 0) + '" />', A += '  <c:w val="' + (e.opts.layout.w || 1) + '" />', A += '  <c:h val="' + (e.opts.layout.h || 1) + '" />', A += " </c:manualLayout>", A += "</c:layout>") : A += "<c:layout/>", Array.isArray(e.opts._type) ? e.opts._type.forEach((c) => {
      const s = Object.assign(Object.assign({}, e.opts), c.options), a = s.secondaryValAxis ? dt : Re, r = s.secondaryCatAxis ? Dt : et;
      l = l || s.secondaryValAxis, A += Wt(c.type, c.data, s, a, r);
    }) : A += Wt(e.opts._type, e.data, e.opts, Re, et), e.opts._type !== W.PIE && e.opts._type !== W.DOUGHNUT) {
      if (e.opts.valAxes && e.opts.valAxes.length > 1 && !l) throw new Error("Secondary axis must be used by one of the multiple charts");
      if (e.opts.catAxes) {
        if (!e.opts.valAxes || e.opts.valAxes.length !== e.opts.catAxes.length) throw new Error("There must be the same number of value and category axes.");
        A += xt(Object.assign(Object.assign({}, e.opts), e.opts.catAxes[0]), et, Re);
      } else A += xt(e.opts, et, Re);
      e.opts.valAxes ? (A += Ct(Object.assign(Object.assign({}, e.opts), e.opts.valAxes[0]), Re), e.opts.valAxes[1] && (A += Ct(Object.assign(Object.assign({}, e.opts), e.opts.valAxes[1]), dt))) : (A += Ct(e.opts, Re), e.opts._type === W.BAR3D && (A += Wa(e.opts, $t, Re))), !((o = e.opts) === null || o === void 0) && o.catAxes && (!((t = e.opts) === null || t === void 0) && t.catAxes[1]) && (A += xt(Object.assign(Object.assign({}, e.opts), e.opts.catAxes[1]), Dt, dt));
    }
    return e.opts.showDataTable && (A += "<c:dTable>", A += `  <c:showHorzBorder val="${e.opts.showDataTableHorzBorder ? 1 : 0}"/>`, A += `  <c:showVertBorder val="${e.opts.showDataTableVertBorder ? 1 : 0}"/>`, A += `  <c:showOutline    val="${e.opts.showDataTableOutline ? 1 : 0}"/>`, A += `  <c:showKeys       val="${e.opts.showDataTableKeys ? 1 : 0}"/>`, A += "  <c:spPr>", A += "    <a:noFill/>", A += '    <a:ln w="9525" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="tx1"><a:lumMod val="15000"/><a:lumOff val="85000"/></a:schemeClr></a:solidFill><a:round/></a:ln>', A += "    <a:effectLst/>", A += "  </c:spPr>", A += "  <c:txPr>", A += '   <a:bodyPr rot="0" spcFirstLastPara="1" vertOverflow="ellipsis" vert="horz" wrap="square" anchor="ctr" anchorCtr="1"/>', A += "   <a:lstStyle/>", A += "   <a:p>", A += '     <a:pPr rtl="0">', A += `       <a:defRPr sz="${Math.round((e.opts.dataTableFontSize || Fe) * 100)}" b="0" i="0" u="none" strike="noStrike" kern="1200" baseline="0">`, A += '         <a:solidFill><a:schemeClr val="tx1"><a:lumMod val="65000"/><a:lumOff val="35000"/></a:schemeClr></a:solidFill>', A += '         <a:latin typeface="+mn-lt"/>', A += '         <a:ea typeface="+mn-ea"/>', A += '         <a:cs typeface="+mn-cs"/>', A += "       </a:defRPr>", A += "     </a:pPr>", A += '    <a:endParaRPr lang="en-US"/>', A += "   </a:p>", A += " </c:txPr>", A += "</c:dTable>"), A += "  <c:spPr>", A += !((i = e.opts.plotArea.fill) === null || i === void 0) && i.color ? De(e.opts.plotArea.fill) : "<a:noFill/>", A += e.opts.plotArea.border ? `<a:ln w="${oe(e.opts.plotArea.border.pt)}" cap="flat">${De(e.opts.plotArea.border.color)}</a:ln>` : "<a:ln><a:noFill/></a:ln>", A += "    <a:effectLst/>", A += "  </c:spPr>", A += "</c:plotArea>", e.opts.showLegend && (A += "<c:legend>", A += '<c:legendPos val="' + e.opts.legendPos + '"/>', A += '<c:overlay val="0"/>', (e.opts.legendFontFace || e.opts.legendFontSize || e.opts.legendColor) && (A += "<c:txPr>", A += "  <a:bodyPr/>", A += "  <a:lstStyle/>", A += "  <a:p>", A += "    <a:pPr>", A += e.opts.legendFontSize ? `<a:defRPr sz="${Math.round(Number(e.opts.legendFontSize) * 100)}">` : "<a:defRPr>", e.opts.legendColor && (A += De(e.opts.legendColor)), e.opts.legendFontFace && (A += '<a:latin typeface="' + e.opts.legendFontFace + '"/>'), e.opts.legendFontFace && (A += '<a:cs    typeface="' + e.opts.legendFontFace + '"/>'), A += "      </a:defRPr>", A += "    </a:pPr>", A += '    <a:endParaRPr lang="en-US"/>', A += "  </a:p>", A += "</c:txPr>"), A += "</c:legend>"), A += '  <c:plotVisOnly val="1"/>', A += '  <c:dispBlanksAs val="' + e.opts.displayBlanksAs + '"/>', e.opts._type === W.SCATTER && (A += '<c:showDLblsOverMax val="1"/>'), A += "</c:chart>", A += "<c:spPr>", A += !((n = e.opts.chartArea.fill) === null || n === void 0) && n.color ? De(e.opts.chartArea.fill) : "<a:noFill/>", A += e.opts.chartArea.border ? `<a:ln w="${oe(e.opts.chartArea.border.pt)}" cap="flat">${De(e.opts.chartArea.border.color)}</a:ln>` : "<a:ln><a:noFill/></a:ln>", A += "  <a:effectLst/>", A += "</c:spPr>", A += '<c:externalData r:id="rId1"><c:autoUpdate val="0"/></c:externalData>', A += "</c:chartSpace>", A;
  }
  function Wt(e, o, t, i, n, A) {
    let l = -1, c = 1, s = null, a = "";
    switch (e) {
      case W.AREA:
      case W.BAR:
      case W.BAR3D:
      case W.LINE:
      case W.RADAR:
        a += `<c:${e}Chart>`, e === W.AREA && t.barGrouping === "stacked" && (a += '<c:grouping val="' + t.barGrouping + '"/>'), (e === W.BAR || e === W.BAR3D) && (a += '<c:barDir val="' + t.barDir + '"/>', a += '<c:grouping val="' + (t.barGrouping || "clustered") + '"/>'), e === W.RADAR && (a += '<c:radarStyle val="' + t.radarStyle + '"/>'), a += '<c:varyColors val="0"/>', o.forEach((r) => {
          var f;
          l++, a += "<c:ser>", a += `  <c:idx val="${r._dataIndex}"/><c:order val="${r._dataIndex}"/>`, a += "  <c:tx>", a += "    <c:strRef>", a += "      <c:f>Sheet1!$" + ve(r._dataIndex + r.labels.length + 1) + "$1</c:f>", a += '      <c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>' + ie(r.name) + "</c:v></c:pt></c:strCache>", a += "    </c:strRef>", a += "  </c:tx>";
          const g = t.chartColors ? t.chartColors[l % t.chartColors.length] : null;
          a += "  <c:spPr>", g === "transparent" ? a += "<a:noFill/>" : t.chartColorsOpacity ? a += "<a:solidFill>" + me(g, `<a:alpha val="${Math.round(t.chartColorsOpacity * 1e3)}"/>`) + "</a:solidFill>" : a += "<a:solidFill>" + me(g) + "</a:solidFill>", e === W.LINE || e === W.RADAR ? t.lineSize === 0 ? a += "<a:ln><a:noFill/></a:ln>" : (a += `<a:ln w="${oe(t.lineSize)}" cap="${pt(t.lineCap)}"><a:solidFill>${me(g)}</a:solidFill>`, a += '<a:prstDash val="' + (t.lineDash || "solid") + '"/><a:round/></a:ln>') : t.dataBorder && (a += `<a:ln w="${oe(t.dataBorder.pt)}" cap="${pt(t.lineCap)}"><a:solidFill>${me(t.dataBorder.color)}</a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>`), a += Ie(t.shadow, ze), a += "  </c:spPr>", a += '  <c:invertIfNegative val="0"/>', e !== W.RADAR && (a += "<c:dLbls>", a += `<c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, t.dataLabelBkgrdColors && (a += `<c:spPr><a:solidFill>${me(g)}</a:solidFill></c:spPr>`), a += "<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr>", a += `<a:defRPr b="${t.dataLabelFontBold ? 1 : 0}" i="${t.dataLabelFontItalic ? 1 : 0}" strike="noStrike" sz="${Math.round((t.dataLabelFontSize || Fe) * 100)}" u="none">`, a += `<a:solidFill>${me(t.dataLabelColor || Le)}</a:solidFill>`, a += `<a:latin typeface="${t.dataLabelFontFace || "Arial"}"/>`, a += "</a:defRPr></a:pPr></a:p></c:txPr>", t.dataLabelPosition && (a += `<c:dLblPos val="${t.dataLabelPosition}"/>`), a += '<c:showLegendKey val="0"/>', a += `<c:showVal val="${t.showValue ? "1" : "0"}"/>`, a += `<c:showCatName val="0"/><c:showSerName val="${t.showSerName ? "1" : "0"}"/><c:showPercent val="0"/><c:showBubbleSize val="0"/>`, a += `<c:showLeaderLines val="${t.showLeaderLines ? "1" : "0"}"/>`, a += "</c:dLbls>"), (e === W.LINE || e === W.RADAR) && (a += "<c:marker>", a += '  <c:symbol val="' + t.lineDataSymbol + '"/>', t.lineDataSymbolSize && (a += `<c:size val="${t.lineDataSymbolSize}"/>`), a += "  <c:spPr>", a += `    <a:solidFill>${me(t.chartColors[r._dataIndex + 1 > t.chartColors.length ? Math.floor(Math.random() * t.chartColors.length) : r._dataIndex])}</a:solidFill>`, a += `    <a:ln w="${t.lineDataSymbolLineSize}" cap="flat"><a:solidFill>${me(t.lineDataSymbolLineColor || g)}</a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>`, a += "    <a:effectLst/>", a += "  </c:spPr>", a += "</c:marker>"), (e === W.BAR || e === W.BAR3D) && o.length === 1 && (t.chartColors && t.chartColors !== tt && t.chartColors.length > 1 || !((f = t.invertedColors) === null || f === void 0) && f.length) && r.values.forEach((d, m) => {
            const h = d < 0 ? t.invertedColors || t.chartColors || tt : t.chartColors || [];
            a += "  <c:dPt>", a += `    <c:idx val="${m}"/>`, a += '      <c:invertIfNegative val="0"/>', a += '    <c:bubble3D val="0"/>', a += "    <c:spPr>", t.lineSize === 0 ? a += "<a:ln><a:noFill/></a:ln>" : e === W.BAR ? (a += "<a:solidFill>", a += '  <a:srgbClr val="' + h[m % h.length] + '"/>', a += "</a:solidFill>") : (a += "<a:ln>", a += "  <a:solidFill>", a += '   <a:srgbClr val="' + h[m % h.length] + '"/>', a += "  </a:solidFill>", a += "</a:ln>"), a += Ie(t.shadow, ze), a += "    </c:spPr>", a += "  </c:dPt>";
          }), a += "<c:cat>", t.catLabelFormatCode ? (a += "  <c:numRef>", a += `    <c:f>Sheet1!$A$2:$A$${r.labels[0].length + 1}</c:f>`, a += "    <c:numCache>", a += "      <c:formatCode>" + (t.catLabelFormatCode || "General") + "</c:formatCode>", a += `      <c:ptCount val="${r.labels[0].length}"/>`, r.labels[0].forEach((d, m) => a += `<c:pt idx="${m}"><c:v>${ie(d)}</c:v></c:pt>`), a += "    </c:numCache>", a += "  </c:numRef>") : (a += "  <c:multiLvlStrRef>", a += `    <c:f>Sheet1!$A$2:$${ve(r.labels.length)}$${r.labels[0].length + 1}</c:f>`, a += "    <c:multiLvlStrCache>", a += `      <c:ptCount val="${r.labels[0].length}"/>`, r.labels.forEach((d) => {
            a += "<c:lvl>", d.forEach((m, h) => a += `<c:pt idx="${h}"><c:v>${ie(m)}</c:v></c:pt>`), a += "</c:lvl>";
          }), a += "    </c:multiLvlStrCache>", a += "  </c:multiLvlStrRef>"), a += "</c:cat>", a += "<c:val>", a += "  <c:numRef>", a += `<c:f>Sheet1!$${ve(r._dataIndex + r.labels.length + 1)}$2:$${ve(r._dataIndex + r.labels.length + 1)}$${r.labels[0].length + 1}</c:f>`, a += "    <c:numCache>", a += "      <c:formatCode>" + (t.valLabelFormatCode || t.dataTableFormatCode || "General") + "</c:formatCode>", a += `      <c:ptCount val="${r.labels[0].length}"/>`, r.values.forEach((d, m) => a += `<c:pt idx="${m}"><c:v>${d || d === 0 ? d : ""}</c:v></c:pt>`), a += "    </c:numCache>", a += "  </c:numRef>", a += "</c:val>", e === W.LINE && (a += '<c:smooth val="' + (t.lineSmooth ? "1" : "0") + '"/>'), a += "</c:ser>";
        }), a += "  <c:dLbls>", a += `    <c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, a += "    <c:txPr>", a += "      <a:bodyPr/>", a += "      <a:lstStyle/>", a += "      <a:p><a:pPr>", a += `        <a:defRPr b="${t.dataLabelFontBold ? 1 : 0}" i="${t.dataLabelFontItalic ? 1 : 0}" strike="noStrike" sz="${Math.round((t.dataLabelFontSize || Fe) * 100)}" u="none">`, a += "          <a:solidFill>" + me(t.dataLabelColor || Le) + "</a:solidFill>", a += '          <a:latin typeface="' + (t.dataLabelFontFace || "Arial") + '"/>', a += "        </a:defRPr>", a += "      </a:pPr></a:p>", a += "    </c:txPr>", t.dataLabelPosition && (a += ' <c:dLblPos val="' + t.dataLabelPosition + '"/>'), a += '    <c:showLegendKey val="0"/>', a += '    <c:showVal val="' + (t.showValue ? "1" : "0") + '"/>', a += '    <c:showCatName val="0"/>', a += '    <c:showSerName val="' + (t.showSerName ? "1" : "0") + '"/>', a += '    <c:showPercent val="0"/>', a += '    <c:showBubbleSize val="0"/>', a += `    <c:showLeaderLines val="${t.showLeaderLines ? "1" : "0"}"/>`, a += "  </c:dLbls>", e === W.BAR ? (a += `  <c:gapWidth val="${t.barGapWidthPct}"/>`, a += `  <c:overlap val="${(t.barGrouping || "").includes("tacked") ? 100 : t.barOverlapPct ? t.barOverlapPct : 0}"/>`) : e === W.BAR3D ? (a += `  <c:gapWidth val="${t.barGapWidthPct}"/>`, a += `  <c:gapDepth val="${t.barGapDepthPct}"/>`, a += '  <c:shape val="' + t.bar3DShape + '"/>') : e === W.LINE && (a += '  <c:marker val="1"/>'), a += `<c:axId val="${n}"/><c:axId val="${i}"/><c:axId val="${$t}"/>`, a += `</c:${e}Chart>`;
        break;
      case W.SCATTER:
        a += "<c:" + e + "Chart>", a += '<c:scatterStyle val="lineMarker"/>', a += '<c:varyColors val="0"/>', l = -1, o.filter((r, f) => f > 0).forEach((r, f) => {
          l++, a += "<c:ser>", a += `  <c:idx val="${f}"/>`, a += `  <c:order val="${f}"/>`, a += "  <c:tx>", a += "    <c:strRef>", a += `      <c:f>Sheet1!$${ve(f + 2)}$1</c:f>`, a += '      <c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>' + ie(r.name) + "</c:v></c:pt></c:strCache>", a += "    </c:strRef>", a += "  </c:tx>", a += "  <c:spPr>";
          {
            const g = t.chartColors[l % t.chartColors.length];
            g === "transparent" ? a += "<a:noFill/>" : t.chartColorsOpacity ? a += "<a:solidFill>" + me(g, '<a:alpha val="' + Math.round(t.chartColorsOpacity * 1e3).toString() + '"/>') + "</a:solidFill>" : a += "<a:solidFill>" + me(g) + "</a:solidFill>", t.lineSize === 0 ? a += "<a:ln><a:noFill/></a:ln>" : (a += `<a:ln w="${oe(t.lineSize)}" cap="${pt(t.lineCap)}"><a:solidFill>${me(g)}</a:solidFill>`, a += `<a:prstDash val="${t.lineDash || "solid"}"/><a:round/></a:ln>`), a += Ie(t.shadow, ze);
          }
          if (a += "  </c:spPr>", a += "<c:marker>", a += '  <c:symbol val="' + t.lineDataSymbol + '"/>', t.lineDataSymbolSize && (a += `<c:size val="${t.lineDataSymbolSize}"/>`), a += "<c:spPr>", a += `<a:solidFill>${me(t.chartColors[f + 1 > t.chartColors.length ? Math.floor(Math.random() * t.chartColors.length) : f])}</a:solidFill>`, a += `<a:ln w="${t.lineDataSymbolLineSize}" cap="flat"><a:solidFill>${me(t.lineDataSymbolLineColor || t.chartColors[l % t.chartColors.length])}</a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>`, a += "<a:effectLst/>", a += "</c:spPr>", a += "</c:marker>", t.showLabel) {
            const g = ft("-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
            r.labels[0] && (t.dataLabelFormatScatter === "custom" || t.dataLabelFormatScatter === "customXY") && (a += "<c:dLbls>", r.labels[0].forEach((d, m) => {
              (t.dataLabelFormatScatter === "custom" || t.dataLabelFormatScatter === "customXY") && (a += "  <c:dLbl>", a += `    <c:idx val="${m}"/>`, a += "    <c:tx>", a += "      <c:rich>", a += "            <a:bodyPr>", a += "                <a:spAutoFit/>", a += "            </a:bodyPr>", a += "            <a:lstStyle/>", a += "            <a:p>", a += "                <a:pPr>", a += "                    <a:defRPr/>", a += "                </a:pPr>", a += "              <a:r>", a += '                    <a:rPr lang="' + (t.lang || "en-US") + '" dirty="0"/>', a += "                    <a:t>" + ie(d) + "</a:t>", a += "              </a:r>", t.dataLabelFormatScatter === "customXY" && !/^ *$/.test(d) && (a += "              <a:r>", a += '                  <a:rPr lang="' + (t.lang || "en-US") + '" baseline="0" dirty="0"/>', a += "                  <a:t> (</a:t>", a += "              </a:r>", a += '              <a:fld id="{' + ft("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") + '}" type="XVALUE">', a += '                  <a:rPr lang="' + (t.lang || "en-US") + '" baseline="0"/>', a += "                  <a:pPr>", a += "                      <a:defRPr/>", a += "                  </a:pPr>", a += "                  <a:t>[" + ie(r.name) + "</a:t>", a += "              </a:fld>", a += "              <a:r>", a += '                  <a:rPr lang="' + (t.lang || "en-US") + '" baseline="0" dirty="0"/>', a += "                  <a:t>, </a:t>", a += "              </a:r>", a += '              <a:fld id="{' + ft("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx") + '}" type="YVALUE">', a += '                  <a:rPr lang="' + (t.lang || "en-US") + '" baseline="0"/>', a += "                  <a:pPr>", a += "                      <a:defRPr/>", a += "                  </a:pPr>", a += "                  <a:t>[" + ie(r.name) + "]</a:t>", a += "              </a:fld>", a += "              <a:r>", a += '                  <a:rPr lang="' + (t.lang || "en-US") + '" baseline="0" dirty="0"/>', a += "                  <a:t>)</a:t>", a += "              </a:r>", a += '              <a:endParaRPr lang="' + (t.lang || "en-US") + '" dirty="0"/>'), a += "            </a:p>", a += "      </c:rich>", a += "    </c:tx>", a += "    <c:spPr>", a += "        <a:noFill/>", a += "        <a:ln>", a += "            <a:noFill/>", a += "        </a:ln>", a += "        <a:effectLst/>", a += "    </c:spPr>", t.dataLabelPosition && (a += ' <c:dLblPos val="' + t.dataLabelPosition + '"/>'), a += '    <c:showLegendKey val="0"/>', a += '    <c:showVal val="0"/>', a += '    <c:showCatName val="0"/>', a += '    <c:showSerName val="0"/>', a += '    <c:showPercent val="0"/>', a += '    <c:showBubbleSize val="0"/>', a += '       <c:showLeaderLines val="1"/>', a += "    <c:extLst>", a += '      <c:ext uri="{CE6537A1-D6FC-4f65-9D91-7224C49458BB}" xmlns:c15="http://schemas.microsoft.com/office/drawing/2012/chart"/>', a += '      <c:ext uri="{C3380CC4-5D6E-409C-BE32-E72D297353CC}" xmlns:c16="http://schemas.microsoft.com/office/drawing/2014/chart">', a += `            <c16:uniqueId val="{${"00000000".substring(0, 8 - (m + 1).toString().length).toString()}${m + 1}${g}}"/>`, a += "      </c:ext>", a += "        </c:extLst>", a += "</c:dLbl>");
            }), a += "</c:dLbls>"), t.dataLabelFormatScatter === "XY" && (a += "<c:dLbls>", a += "    <c:spPr>", a += "        <a:noFill/>", a += "        <a:ln>", a += "            <a:noFill/>", a += "        </a:ln>", a += "          <a:effectLst/>", a += "    </c:spPr>", a += "    <c:txPr>", a += "        <a:bodyPr>", a += "            <a:spAutoFit/>", a += "        </a:bodyPr>", a += "        <a:lstStyle/>", a += "        <a:p>", a += "            <a:pPr>", a += "                <a:defRPr/>", a += "            </a:pPr>", a += '            <a:endParaRPr lang="en-US"/>', a += "        </a:p>", a += "    </c:txPr>", t.dataLabelPosition && (a += ' <c:dLblPos val="' + t.dataLabelPosition + '"/>'), a += '    <c:showLegendKey val="0"/>', a += ` <c:showVal val="${t.showLabel ? "1" : "0"}"/>`, a += ` <c:showCatName val="${t.showLabel ? "1" : "0"}"/>`, a += ` <c:showSerName val="${t.showSerName ? "1" : "0"}"/>`, a += '    <c:showPercent val="0"/>', a += '    <c:showBubbleSize val="0"/>', a += "    <c:extLst>", a += '        <c:ext uri="{CE6537A1-D6FC-4f65-9D91-7224C49458BB}" xmlns:c15="http://schemas.microsoft.com/office/drawing/2012/chart">', a += '            <c15:showLeaderLines val="1"/>', a += "        </c:ext>", a += "    </c:extLst>", a += "</c:dLbls>");
          }
          o.length === 1 && t.chartColors !== tt && r.values.forEach((g, d) => {
            const m = g < 0 ? t.invertedColors || t.chartColors || tt : t.chartColors || [];
            a += "  <c:dPt>", a += `    <c:idx val="${d}"/>`, a += '      <c:invertIfNegative val="0"/>', a += '    <c:bubble3D val="0"/>', a += "    <c:spPr>", t.lineSize === 0 ? a += "<a:ln><a:noFill/></a:ln>" : (a += "<a:solidFill>", a += ' <a:srgbClr val="' + m[d % m.length] + '"/>', a += "</a:solidFill>"), a += Ie(t.shadow, ze), a += "    </c:spPr>", a += "  </c:dPt>";
          }), a += "<c:xVal>", a += "  <c:numRef>", a += `    <c:f>Sheet1!$A$2:$A$${o[0].values.length + 1}</c:f>`, a += "    <c:numCache>", a += "      <c:formatCode>General</c:formatCode>", a += `      <c:ptCount val="${o[0].values.length}"/>`, o[0].values.forEach((g, d) => {
            a += `<c:pt idx="${d}"><c:v>${g || g === 0 ? g : ""}</c:v></c:pt>`;
          }), a += "    </c:numCache>", a += "  </c:numRef>", a += "</c:xVal>", a += "<c:yVal>", a += "  <c:numRef>", a += `    <c:f>Sheet1!$${ve(f + 2)}$2:$${ve(f + 2)}$${o[0].values.length + 1}</c:f>`, a += "    <c:numCache>", a += "      <c:formatCode>General</c:formatCode>", a += `      <c:ptCount val="${o[0].values.length}"/>`, o[0].values.forEach((g, d) => {
            a += `<c:pt idx="${d}"><c:v>${r.values[d] || r.values[d] === 0 ? r.values[d] : ""}</c:v></c:pt>`;
          }), a += "    </c:numCache>", a += "  </c:numRef>", a += "</c:yVal>", a += '<c:smooth val="' + (t.lineSmooth ? "1" : "0") + '"/>', a += "</c:ser>";
        }), a += "  <c:dLbls>", a += `    <c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, a += "    <c:txPr>", a += "      <a:bodyPr/>", a += "      <a:lstStyle/>", a += "      <a:p><a:pPr>", a += `        <a:defRPr b="${t.dataLabelFontBold ? "1" : "0"}" i="${t.dataLabelFontItalic ? "1" : "0"}" strike="noStrike" sz="${Math.round((t.dataLabelFontSize || Fe) * 100)}" u="none">`, a += "          <a:solidFill>" + me(t.dataLabelColor || Le) + "</a:solidFill>", a += '          <a:latin typeface="' + (t.dataLabelFontFace || "Arial") + '"/>', a += "        </a:defRPr>", a += "      </a:pPr></a:p>", a += "    </c:txPr>", t.dataLabelPosition && (a += ' <c:dLblPos val="' + t.dataLabelPosition + '"/>'), a += '    <c:showLegendKey val="0"/>', a += '    <c:showVal val="' + (t.showValue ? "1" : "0") + '"/>', a += '    <c:showCatName val="0"/>', a += '    <c:showSerName val="' + (t.showSerName ? "1" : "0") + '"/>', a += '    <c:showPercent val="0"/>', a += '    <c:showBubbleSize val="0"/>', a += "  </c:dLbls>", a += `<c:axId val="${n}"/><c:axId val="${i}"/>`, a += "</c:" + e + "Chart>";
        break;
      case W.BUBBLE:
      case W.BUBBLE3D:
        a += "<c:bubbleChart>", a += '<c:varyColors val="0"/>', l = -1, o.filter((r, f) => f > 0).forEach((r, f) => {
          l++, a += "<c:ser>", a += `  <c:idx val="${f}"/>`, a += `  <c:order val="${f}"/>`, a += "  <c:tx>", a += "    <c:strRef>", a += "      <c:f>Sheet1!$" + ve(c + 1) + "$1</c:f>", a += '      <c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>' + ie(r.name) + "</c:v></c:pt></c:strCache>", a += "    </c:strRef>", a += "  </c:tx>";
          {
            a += "<c:spPr>";
            const g = t.chartColors[l % t.chartColors.length];
            g === "transparent" ? a += "<a:noFill/>" : t.chartColorsOpacity ? a += `<a:solidFill>${me(g, '<a:alpha val="' + Math.round(t.chartColorsOpacity * 1e3).toString() + '"/>')}</a:solidFill>` : a += "<a:solidFill>" + me(g) + "</a:solidFill>", t.lineSize === 0 ? a += "<a:ln><a:noFill/></a:ln>" : t.dataBorder ? a += `<a:ln w="${oe(t.dataBorder.pt)}" cap="flat"><a:solidFill>${me(t.dataBorder.color)}</a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>` : (a += `<a:ln w="${oe(t.lineSize)}" cap="flat"><a:solidFill>${me(g)}</a:solidFill>`, a += `<a:prstDash val="${t.lineDash || "solid"}"/><a:round/></a:ln>`), a += Ie(t.shadow, ze), a += "</c:spPr>";
          }
          a += "<c:xVal>", a += "  <c:numRef>", a += `    <c:f>Sheet1!$A$2:$A$${o[0].values.length + 1}</c:f>`, a += "    <c:numCache>", a += "      <c:formatCode>General</c:formatCode>", a += `      <c:ptCount val="${o[0].values.length}"/>`, o[0].values.forEach((g, d) => {
            a += `<c:pt idx="${d}"><c:v>${g || g === 0 ? g : ""}</c:v></c:pt>`;
          }), a += "    </c:numCache>", a += "  </c:numRef>", a += "</c:xVal>", a += "<c:yVal>", a += "  <c:numRef>", a += `<c:f>Sheet1!$${ve(c + 1)}$2:$${ve(c + 1)}$${o[0].values.length + 1}</c:f>`, c++, a += "    <c:numCache>", a += "      <c:formatCode>General</c:formatCode>", a += `      <c:ptCount val="${o[0].values.length}"/>`, o[0].values.forEach((g, d) => {
            a += `<c:pt idx="${d}"><c:v>${r.values[d] || r.values[d] === 0 ? r.values[d] : ""}</c:v></c:pt>`;
          }), a += "    </c:numCache>", a += "  </c:numRef>", a += "</c:yVal>", a += "  <c:bubbleSize>", a += "    <c:numRef>", a += `<c:f>Sheet1!$${ve(c + 1)}$2:$${ve(c + 1)}$${r.sizes.length + 1}</c:f>`, c++, a += "      <c:numCache>", a += "        <c:formatCode>General</c:formatCode>", a += `           <c:ptCount val="${r.sizes.length}"/>`, r.sizes.forEach((g, d) => {
            a += `<c:pt idx="${d}"><c:v>${g || ""}</c:v></c:pt>`;
          }), a += "      </c:numCache>", a += "    </c:numRef>", a += "  </c:bubbleSize>", a += '  <c:bubble3D val="' + (e === W.BUBBLE3D ? "1" : "0") + '"/>', a += "</c:ser>";
        }), a += "<c:dLbls>", a += `<c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, a += "<c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr>", a += `<a:defRPr b="${t.dataLabelFontBold ? 1 : 0}" i="${t.dataLabelFontItalic ? 1 : 0}" strike="noStrike" sz="${Math.round(Math.round(t.dataLabelFontSize || Fe) * 100)}" u="none">`, a += `<a:solidFill>${me(t.dataLabelColor || Le)}</a:solidFill>`, a += `<a:latin typeface="${t.dataLabelFontFace || "Arial"}"/>`, a += "</a:defRPr></a:pPr></a:p></c:txPr>", t.dataLabelPosition && (a += `<c:dLblPos val="${t.dataLabelPosition}"/>`), a += '<c:showLegendKey val="0"/>', a += `<c:showVal val="${t.showValue ? "1" : "0"}"/>`, a += `<c:showCatName val="0"/><c:showSerName val="${t.showSerName ? "1" : "0"}"/><c:showPercent val="0"/><c:showBubbleSize val="0"/>`, a += "<c:extLst>", a += '  <c:ext uri="{CE6537A1-D6FC-4f65-9D91-7224C49458BB}" xmlns:c15="http://schemas.microsoft.com/office/drawing/2012/chart">', a += '    <c15:showLeaderLines val="' + (t.showLeaderLines ? "1" : "0") + '"/>', a += "  </c:ext>", a += "</c:extLst>", a += "</c:dLbls>", a += `<c:axId val="${n}"/><c:axId val="${i}"/>`, a += "</c:bubbleChart>";
        break;
      case W.DOUGHNUT:
      case W.PIE:
        s = o[0], a += "<c:" + e + "Chart>", a += '  <c:varyColors val="1"/>', a += "<c:ser>", a += '  <c:idx val="0"/>', a += '  <c:order val="0"/>', a += "  <c:tx>", a += "    <c:strRef>", a += "      <c:f>Sheet1!$B$1</c:f>", a += "      <c:strCache>", a += '        <c:ptCount val="1"/>', a += '        <c:pt idx="0"><c:v>' + ie(s.name) + "</c:v></c:pt>", a += "      </c:strCache>", a += "    </c:strRef>", a += "  </c:tx>", a += "  <c:spPr>", a += '    <a:solidFill><a:schemeClr val="accent1"/></a:solidFill>', a += '    <a:ln w="9525" cap="flat"><a:solidFill><a:srgbClr val="F9F9F9"/></a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>', t.dataNoEffects ? a += "<a:effectLst/>" : a += Ie(t.shadow, ze), a += "  </c:spPr>", s.labels[0].forEach((r, f) => {
          a += "<c:dPt>", a += ` <c:idx val="${f}"/>`, a += ' <c:bubble3D val="0"/>', a += " <c:spPr>", a += `<a:solidFill>${me(t.chartColors[f + 1 > t.chartColors.length ? Math.floor(Math.random() * t.chartColors.length) : f])}</a:solidFill>`, t.dataBorder && (a += `<a:ln w="${oe(t.dataBorder.pt)}" cap="flat"><a:solidFill>${me(t.dataBorder.color)}</a:solidFill><a:prstDash val="solid"/><a:round/></a:ln>`), a += Ie(t.shadow, ze), a += "  </c:spPr>", a += "</c:dPt>";
        }), a += "<c:dLbls>", s.labels[0].forEach((r, f) => {
          a += "<c:dLbl>", a += ` <c:idx val="${f}"/>`, a += `  <c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, a += "  <c:spPr/><c:txPr>", a += "   <a:bodyPr/><a:lstStyle/>", a += "   <a:p><a:pPr>", a += `   <a:defRPr sz="${Math.round((t.dataLabelFontSize || Fe) * 100)}" b="${t.dataLabelFontBold ? 1 : 0}" i="${t.dataLabelFontItalic ? 1 : 0}" u="none" strike="noStrike">`, a += "    <a:solidFill>" + me(t.dataLabelColor || Le) + "</a:solidFill>", a += `    <a:latin typeface="${t.dataLabelFontFace || "Arial"}"/>`, a += "   </a:defRPr>", a += "      </a:pPr></a:p>", a += "    </c:txPr>", e === W.PIE && t.dataLabelPosition && (a += `<c:dLblPos val="${t.dataLabelPosition}"/>`), a += '    <c:showLegendKey val="0"/>', a += '    <c:showVal val="' + (t.showValue ? "1" : "0") + '"/>', a += '    <c:showCatName val="' + (t.showLabel ? "1" : "0") + '"/>', a += '    <c:showSerName val="' + (t.showSerName ? "1" : "0") + '"/>', a += '    <c:showPercent val="' + (t.showPercent ? "1" : "0") + '"/>', a += '    <c:showBubbleSize val="0"/>', a += "  </c:dLbl>";
        }), a += ` <c:numFmt formatCode="${ie(t.dataLabelFormatCode) || "General"}" sourceLinked="0"/>`, a += "    <c:txPr>", a += "      <a:bodyPr/>", a += "      <a:lstStyle/>", a += "      <a:p>", a += "        <a:pPr>", a += `          <a:defRPr sz="1800" b="${t.dataLabelFontBold ? "1" : "0"}" i="${t.dataLabelFontItalic ? "1" : "0"}" u="none" strike="noStrike">`, a += '            <a:solidFill><a:srgbClr val="000000"/></a:solidFill><a:latin typeface="Arial"/>', a += "          </a:defRPr>", a += "        </a:pPr>", a += "      </a:p>", a += "    </c:txPr>", a += e === W.PIE ? '<c:dLblPos val="ctr"/>' : "", a += '    <c:showLegendKey val="0"/>', a += '    <c:showVal val="0"/>', a += '    <c:showCatName val="1"/>', a += '    <c:showSerName val="0"/>', a += '    <c:showPercent val="1"/>', a += '    <c:showBubbleSize val="0"/>', a += ` <c:showLeaderLines val="${t.showLeaderLines ? "1" : "0"}"/>`, a += "</c:dLbls>", a += "<c:cat>", a += "  <c:strRef>", a += `    <c:f>Sheet1!$A$2:$A$${s.labels[0].length + 1}</c:f>`, a += "    <c:strCache>", a += `         <c:ptCount val="${s.labels[0].length}"/>`, s.labels[0].forEach((r, f) => {
          a += `<c:pt idx="${f}"><c:v>${ie(r)}</c:v></c:pt>`;
        }), a += "    </c:strCache>", a += "  </c:strRef>", a += "</c:cat>", a += "  <c:val>", a += "    <c:numRef>", a += `      <c:f>Sheet1!$B$2:$B$${s.labels[0].length + 1}</c:f>`, a += "      <c:numCache>", a += `           <c:ptCount val="${s.labels[0].length}"/>`, s.values.forEach((r, f) => {
          a += `<c:pt idx="${f}"><c:v>${r || r === 0 ? r : ""}</c:v></c:pt>`;
        }), a += "      </c:numCache>", a += "    </c:numRef>", a += "  </c:val>", a += "  </c:ser>", a += `  <c:firstSliceAng val="${t.firstSliceAng ? Math.round(t.firstSliceAng) : 0}"/>`, e === W.DOUGHNUT && (a += `<c:holeSize val="${typeof t.holeSize == "number" ? t.holeSize : "50"}"/>`), a += "</c:" + e + "Chart>";
        break;
      default:
        a += "";
        break;
    }
    return a;
  }
  function xt(e, o, t) {
    let i = "";
    return e._type === W.SCATTER || e._type === W.BUBBLE || e._type === W.BUBBLE3D ? i += "<c:valAx>" : i += "<c:" + (e.catLabelFormatCode ? "dateAx" : "catAx") + ">", i += '  <c:axId val="' + o + '"/>', i += "  <c:scaling>", i += '<c:orientation val="' + (e.catAxisOrientation || (e.barDir === "col", "minMax")) + '"/>', (e.catAxisMaxVal || e.catAxisMaxVal === 0) && (i += `<c:max val="${e.catAxisMaxVal}"/>`), (e.catAxisMinVal || e.catAxisMinVal === 0) && (i += `<c:min val="${e.catAxisMinVal}"/>`), i += "</c:scaling>", i += '  <c:delete val="' + (e.catAxisHidden ? "1" : "0") + '"/>', i += '  <c:axPos val="' + (e.barDir === "col" ? "b" : "l") + '"/>', i += e.catGridLine.style !== "none" ? zt(e.catGridLine) : "", e.showCatAxisTitle && (i += mt({
      color: e.catAxisTitleColor,
      fontFace: e.catAxisTitleFontFace,
      fontSize: e.catAxisTitleFontSize,
      titleRotate: e.catAxisTitleRotate,
      title: e.catAxisTitle || "Axis Title"
    })), e._type === W.SCATTER || e._type === W.BUBBLE || e._type === W.BUBBLE3D ? i += '  <c:numFmt formatCode="' + (e.valAxisLabelFormatCode ? ie(e.valAxisLabelFormatCode) : "General") + '" sourceLinked="1"/>' : i += '  <c:numFmt formatCode="' + (ie(e.catLabelFormatCode) || "General") + '" sourceLinked="1"/>', e._type === W.SCATTER ? (i += '  <c:majorTickMark val="none"/>', i += '  <c:minorTickMark val="none"/>', i += '  <c:tickLblPos val="nextTo"/>') : (i += '  <c:majorTickMark val="' + (e.catAxisMajorTickMark || "out") + '"/>', i += '  <c:minorTickMark val="' + (e.catAxisMinorTickMark || "none") + '"/>', i += '  <c:tickLblPos val="' + (e.catAxisLabelPos || (e.barDir === "col" ? "low" : "nextTo")) + '"/>'), i += "  <c:spPr>", i += `    <a:ln w="${e.catAxisLineSize ? oe(e.catAxisLineSize) : nt}" cap="flat">`, i += e.catAxisLineShow ? "<a:solidFill>" + me(e.catAxisLineColor || Me.color) + "</a:solidFill>" : "<a:noFill/>", i += '      <a:prstDash val="' + (e.catAxisLineStyle || "solid") + '"/>', i += "      <a:round/>", i += "    </a:ln>", i += "  </c:spPr>", i += "  <c:txPr>", e.catAxisLabelRotate ? i += `<a:bodyPr rot="${Ue(e.catAxisLabelRotate)}"/>` : i += "<a:bodyPr/>", i += "    <a:lstStyle/>", i += "    <a:p>", i += "    <a:pPr>", i += `      <a:defRPr sz="${Math.round((e.catAxisLabelFontSize || Fe) * 100)}" b="${e.catAxisLabelFontBold ? 1 : 0}" i="${e.catAxisLabelFontItalic ? 1 : 0}" u="none" strike="noStrike">`, i += "      <a:solidFill>" + me(e.catAxisLabelColor || Le) + "</a:solidFill>", i += '      <a:latin typeface="' + (e.catAxisLabelFontFace || "Arial") + '"/>', i += "   </a:defRPr>", i += "  </a:pPr>", i += '  <a:endParaRPr lang="' + (e.lang || "en-US") + '"/>', i += "  </a:p>", i += " </c:txPr>", i += ' <c:crossAx val="' + t + '"/>', i += ` <c:${typeof e.valAxisCrossesAt == "number" ? "crossesAt" : "crosses"} val="${e.valAxisCrossesAt || "autoZero"}"/>`, i += ' <c:auto val="1"/>', i += ' <c:lblAlgn val="ctr"/>', i += ` <c:noMultiLvlLbl val="${e.catAxisMultiLevelLabels ? 0 : 1}"/>`, e.catAxisLabelFrequency && (i += ' <c:tickLblSkip val="' + e.catAxisLabelFrequency + '"/>'), (e.catLabelFormatCode || e._type === W.SCATTER || e._type === W.BUBBLE || e._type === W.BUBBLE3D) && (e.catLabelFormatCode && ([
      "catAxisBaseTimeUnit",
      "catAxisMajorTimeUnit",
      "catAxisMinorTimeUnit"
    ].forEach((n) => {
      e[n] && (typeof e[n] != "string" || ![
        "days",
        "months",
        "years"
      ].includes(e[n].toLowerCase())) && (console.warn(`"${n}" must be one of: 'days','months','years' !`), e[n] = null);
    }), e.catAxisBaseTimeUnit && (i += '<c:baseTimeUnit val="' + e.catAxisBaseTimeUnit.toLowerCase() + '"/>'), e.catAxisMajorTimeUnit && (i += '<c:majorTimeUnit val="' + e.catAxisMajorTimeUnit.toLowerCase() + '"/>'), e.catAxisMinorTimeUnit && (i += '<c:minorTimeUnit val="' + e.catAxisMinorTimeUnit.toLowerCase() + '"/>')), e.catAxisMajorUnit && (i += `<c:majorUnit val="${e.catAxisMajorUnit}"/>`), e.catAxisMinorUnit && (i += `<c:minorUnit val="${e.catAxisMinorUnit}"/>`)), e._type === W.SCATTER || e._type === W.BUBBLE || e._type === W.BUBBLE3D ? i += "</c:valAx>" : i += "</c:" + (e.catLabelFormatCode ? "dateAx" : "catAx") + ">", i;
  }
  function Ct(e, o) {
    let t = o === Re ? e.barDir === "col" ? "l" : "b" : e.barDir !== "col" ? "r" : "t";
    o === dt && (t = "r");
    const i = o === Re ? et : Dt;
    let n = "";
    return n += "<c:valAx>", n += '  <c:axId val="' + o + '"/>', n += "  <c:scaling>", e.valAxisLogScaleBase && (n += `<c:logBase val="${e.valAxisLogScaleBase}"/>`), n += '<c:orientation val="' + (e.valAxisOrientation || (e.barDir === "col", "minMax")) + '"/>', (e.valAxisMaxVal || e.valAxisMaxVal === 0) && (n += `<c:max val="${e.valAxisMaxVal}"/>`), (e.valAxisMinVal || e.valAxisMinVal === 0) && (n += `<c:min val="${e.valAxisMinVal}"/>`), n += "  </c:scaling>", n += `  <c:delete val="${e.valAxisHidden ? 1 : 0}"/>`, n += '  <c:axPos val="' + t + '"/>', e.valGridLine.style !== "none" && (n += zt(e.valGridLine)), e.showValAxisTitle && (n += mt({
      color: e.valAxisTitleColor,
      fontFace: e.valAxisTitleFontFace,
      fontSize: e.valAxisTitleFontSize,
      titleRotate: e.valAxisTitleRotate,
      title: e.valAxisTitle || "Axis Title"
    })), n += `<c:numFmt formatCode="${e.valAxisLabelFormatCode ? ie(e.valAxisLabelFormatCode) : "General"}" sourceLinked="0"/>`, e._type === W.SCATTER ? (n += '  <c:majorTickMark val="none"/>', n += '  <c:minorTickMark val="none"/>', n += '  <c:tickLblPos val="nextTo"/>') : (n += ' <c:majorTickMark val="' + (e.valAxisMajorTickMark || "out") + '"/>', n += ' <c:minorTickMark val="' + (e.valAxisMinorTickMark || "none") + '"/>', n += ' <c:tickLblPos val="' + (e.valAxisLabelPos || (e.barDir === "col" ? "nextTo" : "low")) + '"/>'), n += " <c:spPr>", n += `   <a:ln w="${e.valAxisLineSize ? oe(e.valAxisLineSize) : nt}" cap="flat">`, n += e.valAxisLineShow ? "<a:solidFill>" + me(e.valAxisLineColor || Me.color) + "</a:solidFill>" : "<a:noFill/>", n += '     <a:prstDash val="' + (e.valAxisLineStyle || "solid") + '"/>', n += "     <a:round/>", n += "   </a:ln>", n += " </c:spPr>", n += " <c:txPr>", n += `  <a:bodyPr${e.valAxisLabelRotate ? ' rot="' + Ue(e.valAxisLabelRotate).toString() + '"' : ""}/>`, n += "  <a:lstStyle/>", n += "  <a:p>", n += "    <a:pPr>", n += `      <a:defRPr sz="${Math.round((e.valAxisLabelFontSize || Fe) * 100)}" b="${e.valAxisLabelFontBold ? 1 : 0}" i="${e.valAxisLabelFontItalic ? 1 : 0}" u="none" strike="noStrike">`, n += "        <a:solidFill>" + me(e.valAxisLabelColor || Le) + "</a:solidFill>", n += '        <a:latin typeface="' + (e.valAxisLabelFontFace || "Arial") + '"/>', n += "      </a:defRPr>", n += "    </a:pPr>", n += '  <a:endParaRPr lang="' + (e.lang || "en-US") + '"/>', n += "  </a:p>", n += " </c:txPr>", n += ' <c:crossAx val="' + i + '"/>', typeof e.catAxisCrossesAt == "number" ? n += ` <c:crossesAt val="${e.catAxisCrossesAt}"/>` : typeof e.catAxisCrossesAt == "string" ? n += ' <c:crosses val="' + e.catAxisCrossesAt + '"/>' : n += ' <c:crosses val="' + (t === "r" || t === "t" ? "max" : "autoZero") + '"/>', n += ' <c:crossBetween val="' + (e._type === W.SCATTER || Array.isArray(e._type) && e._type.filter((A) => A.type === W.AREA).length > 0 ? "midCat" : "between") + '"/>', e.valAxisMajorUnit && (n += ` <c:majorUnit val="${e.valAxisMajorUnit}"/>`), e.valAxisDisplayUnit && (n += `<c:dispUnits><c:builtInUnit val="${e.valAxisDisplayUnit}"/>${e.valAxisDisplayUnitLabel ? "<c:dispUnitsLbl/>" : ""}</c:dispUnits>`), n += "</c:valAx>", n;
  }
  function Wa(e, o, t) {
    let i = "";
    return i += "<c:serAx>", i += '  <c:axId val="' + o + '"/>', i += '  <c:scaling><c:orientation val="' + (e.serAxisOrientation || (e.barDir === "col", "minMax")) + '"/></c:scaling>', i += '  <c:delete val="' + (e.serAxisHidden ? "1" : "0") + '"/>', i += '  <c:axPos val="' + (e.barDir === "col" ? "b" : "l") + '"/>', i += e.serGridLine.style !== "none" ? zt(e.serGridLine) : "", e.showSerAxisTitle && (i += mt({
      color: e.serAxisTitleColor,
      fontFace: e.serAxisTitleFontFace,
      fontSize: e.serAxisTitleFontSize,
      titleRotate: e.serAxisTitleRotate,
      title: e.serAxisTitle || "Axis Title"
    })), i += `  <c:numFmt formatCode="${ie(e.serLabelFormatCode) || "General"}" sourceLinked="0"/>`, i += '  <c:majorTickMark val="out"/>', i += '  <c:minorTickMark val="none"/>', i += `  <c:tickLblPos val="${e.serAxisLabelPos || e.barDir === "col" ? "low" : "nextTo"}"/>`, i += "  <c:spPr>", i += '    <a:ln w="12700" cap="flat">', i += e.serAxisLineShow ? `<a:solidFill>${me(e.serAxisLineColor || Me.color)}</a:solidFill>` : "<a:noFill/>", i += '      <a:prstDash val="solid"/>', i += "      <a:round/>", i += "    </a:ln>", i += "  </c:spPr>", i += "  <c:txPr>", i += "    <a:bodyPr/>", i += "    <a:lstStyle/>", i += "    <a:p>", i += "    <a:pPr>", i += `    <a:defRPr sz="${Math.round((e.serAxisLabelFontSize || Fe) * 100)}" b="${e.serAxisLabelFontBold ? "1" : "0"}" i="${e.serAxisLabelFontItalic ? "1" : "0"}" u="none" strike="noStrike">`, i += `      <a:solidFill>${me(e.serAxisLabelColor || Le)}</a:solidFill>`, i += `      <a:latin typeface="${e.serAxisLabelFontFace || "Arial"}"/>`, i += "   </a:defRPr>", i += "  </a:pPr>", i += '  <a:endParaRPr lang="' + (e.lang || "en-US") + '"/>', i += "  </a:p>", i += " </c:txPr>", i += ' <c:crossAx val="' + t + '"/>', i += ' <c:crosses val="autoZero"/>', e.serAxisLabelFrequency && (i += ' <c:tickLblSkip val="' + e.serAxisLabelFrequency + '"/>'), e.serLabelFormatCode && ([
      "serAxisBaseTimeUnit",
      "serAxisMajorTimeUnit",
      "serAxisMinorTimeUnit"
    ].forEach((n) => {
      e[n] && (typeof e[n] != "string" || ![
        "days",
        "months",
        "years"
      ].includes(n.toLowerCase())) && (console.warn(`"${n}" must be one of: 'days','months','years' !`), e[n] = null);
    }), e.serAxisBaseTimeUnit && (i += ` <c:baseTimeUnit  val="${e.serAxisBaseTimeUnit.toLowerCase()}"/>`), e.serAxisMajorTimeUnit && (i += ` <c:majorTimeUnit val="${e.serAxisMajorTimeUnit.toLowerCase()}"/>`), e.serAxisMinorTimeUnit && (i += ` <c:minorTimeUnit val="${e.serAxisMinorTimeUnit.toLowerCase()}"/>`), e.serAxisMajorUnit && (i += ` <c:majorUnit val="${e.serAxisMajorUnit}"/>`), e.serAxisMinorUnit && (i += ` <c:minorUnit val="${e.serAxisMinorUnit}"/>`)), i += "</c:serAx>", i;
  }
  function mt(e, o, t) {
    const i = e.titleAlign === "left" || e.titleAlign === "right" ? `<a:pPr algn="${e.titleAlign.substring(0, 1)}">` : "<a:pPr>", n = e.titleRotate ? `<a:bodyPr rot="${Ue(e.titleRotate)}"/>` : "<a:bodyPr/>", A = e.fontSize ? `sz="${Math.round(e.fontSize * 100)}"` : "", l = e.titleBold ? 1 : 0;
    let c = "<c:layout/>";
    if (e.titlePos && typeof e.titlePos.x == "number" && typeof e.titlePos.y == "number") {
      const s = e.titlePos.x + o, a = e.titlePos.y + t;
      let r = s === 0 ? 0 : s * (s / 5) / 10;
      r >= 1 && (r = r / 10), r >= 0.1 && (r = r / 10);
      let f = a === 0 ? 0 : a * (a / 5) / 10;
      f >= 1 && (f = f / 10), f >= 0.1 && (f = f / 10), c = `<c:layout><c:manualLayout><c:xMode val="edge"/><c:yMode val="edge"/><c:x val="${r}"/><c:y val="${f}"/></c:manualLayout></c:layout>`;
    }
    return `<c:title>
      <c:tx>
        <c:rich>
          ${n}
          <a:lstStyle/>
          <a:p>
            ${i}
            <a:defRPr ${A} b="${l}" i="0" u="none" strike="noStrike">
              <a:solidFill>${me(e.color || Le)}</a:solidFill>
              <a:latin typeface="${e.fontFace || "Arial"}"/>
            </a:defRPr>
          </a:pPr>
          <a:r>
            <a:rPr ${A} b="${l}" i="0" u="none" strike="noStrike">
              <a:solidFill>${me(e.color || Le)}</a:solidFill>
              <a:latin typeface="${e.fontFace || "Arial"}"/>
            </a:rPr>
            <a:t>${ie(e.title) || ""}</a:t>
          </a:r>
        </a:p>
        </c:rich>
      </c:tx>
      ${c}
      <c:overlay val="0"/>
    </c:title>`;
  }
  function ve(e) {
    let o = "";
    const t = e - 1;
    return t <= 25 ? o = Ze[t] : o = `${Ze[Math.floor(t / Ze.length - 1)]}${Ze[t % Ze.length]}`, o;
  }
  function Ie(e, o) {
    if (e) {
      if (typeof e != "object") return console.warn("`shadow` options must be an object. Ex: `{shadow: {type:'none'}}`"), "<a:effectLst/>";
    } else return "<a:effectLst/>";
    let t = "<a:effectLst>";
    const i = Object.assign(Object.assign({}, o), e), n = i.type || "outer", A = oe(i.blur), l = oe(i.offset), c = Math.round(i.angle * 6e4), s = i.color, a = Math.round(i.opacity * 1e5), r = i.rotateWithShape ? 1 : 0;
    return t += `<a:${n}Shdw sx="100000" sy="100000" kx="0" ky="0"  algn="bl" blurRad="${A}" rotWithShape="${r}" dist="${l}" dir="${c}">`, t += `<a:srgbClr val="${s}">`, t += `<a:alpha val="${a}"/></a:srgbClr>`, t += `</a:${n}Shdw>`, t += "</a:effectLst>", t;
  }
  function zt(e) {
    let o = "<c:majorGridlines>";
    return o += " <c:spPr>", o += `  <a:ln w="${oe(e.size || Me.size)}" cap="${pt(e.cap || Me.cap)}">`, o += '  <a:solidFill><a:srgbClr val="' + (e.color || Me.color) + '"/></a:solidFill>', o += '   <a:prstDash val="' + (e.style || Me.style) + '"/><a:round/>', o += "  </a:ln>", o += " </c:spPr>", o += "</c:majorGridlines>", o;
  }
  function pt(e) {
    if (!e || e === "flat") return "flat";
    if (e === "square") return "sq";
    if (e === "round") return "rnd";
    {
      const o = e;
      throw new Error(`Invalid chart line cap: ${o}`);
    }
  }
  function Lt(e) {
    var o, t;
    const i = typeof process < "u" && !!(!((o = process.versions) === null || o === void 0) && o.node) && ((t = process.release) === null || t === void 0 ? void 0 : t.name) === "node";
    let n, A;
    const l = i ? () => ke(this, void 0, void 0, function* () {
      ({ default: n } = yield Bt(() => import("./__vite-browser-external-BIHI7g3E.js"), [])), { default: A } = yield Bt(() => import("./__vite-browser-external-BIHI7g3E.js"), []);
    }) : () => ke(this, void 0, void 0, function* () {
    });
    i && l();
    const c = [], s = e._relsMedia.filter((r) => r.type !== "online" && !r.data && (!r.path || r.path && !r.path.includes("preencoded"))), a = [];
    return s.forEach((r) => {
      a.includes(r.path) ? r.isDuplicate = true : (r.isDuplicate = false, a.push(r.path));
    }), s.filter((r) => !r.isDuplicate).forEach((r) => {
      c.push(ke(this, void 0, void 0, function* () {
        if (A || (yield l()), i && n && r.path.indexOf("http") !== 0) try {
          const f = n.readFileSync(r.path);
          return r.data = Buffer.from(f).toString("base64"), s.filter((g) => g.isDuplicate && g.path === r.path).forEach((g) => g.data = r.data), "done";
        } catch (f) {
          throw r.data = Je, s.filter((g) => g.isDuplicate && g.path === r.path).forEach((g) => g.data = r.data), new Error(`ERROR: Unable to read media: "${r.path}"
${String(f)}`);
        }
        return i && A && r.path.startsWith("http") ? yield new Promise((f, g) => {
          A.get(r.path, (d) => {
            let m = "";
            d.setEncoding("binary"), d.on("data", (h) => m += h), d.on("end", () => {
              r.data = Buffer.from(m, "binary").toString("base64"), s.filter((h) => h.isDuplicate && h.path === r.path).forEach((h) => h.data = r.data), f("done");
            }), d.on("error", () => {
              r.data = Je, s.filter((h) => h.isDuplicate && h.path === r.path).forEach((h) => h.data = r.data), g(new Error(`ERROR! Unable to load image (https.get): ${r.path}`));
            });
          });
        }) : yield new Promise((f, g) => {
          const d = new XMLHttpRequest();
          d.onload = () => {
            const m = new FileReader();
            m.onloadend = () => {
              r.data = m.result, s.filter((h) => h.isDuplicate && h.path === r.path).forEach((h) => h.data = r.data), r.isSvgPng ? qt(r).then(() => f("done")).catch(g) : f("done");
            }, m.readAsDataURL(d.response);
          }, d.onerror = () => {
            r.data = Je, s.filter((m) => m.isDuplicate && m.path === r.path).forEach((m) => m.data = r.data), g(new Error(`ERROR! Unable to load image (xhr.onerror): ${r.path}`));
          }, d.open("GET", r.path), d.responseType = "blob", d.send();
        });
      }));
    }), e._relsMedia.filter((r) => r.isSvgPng && r.data).forEach((r) => {
      ke(this, void 0, void 0, function* () {
        i && !n && (yield l()), i && n ? (r.data = Je, c.push(Promise.resolve("done"))) : c.push(qt(r));
      });
    }), c;
  }
  function qt(e) {
    return ke(this, void 0, void 0, function* () {
      return yield new Promise((o, t) => {
        const i = new Image();
        i.onload = () => {
          i.width + i.height === 0 && i.onerror("h/w=0");
          let n = document.createElement("CANVAS");
          const A = n.getContext("2d");
          n.width = i.width, n.height = i.height, A.drawImage(i, 0, 0);
          try {
            e.data = n.toDataURL(e.type), o("done");
          } catch (l) {
            i.onerror(l.toString());
          }
          n = null;
        }, i.onerror = () => {
          e.data = Je, t(new Error(`ERROR! Unable to load image (image.onerror): ${e.path}`));
        }, i.src = typeof e.data == "string" ? e.data : Je;
      });
    });
  }
  const qa = {
    cover: function(e, o) {
      const t = e.h / e.w, n = o.h / o.w > t, A = n ? o.h / t : o.w, l = n ? o.h : o.w * t, c = Math.round(1e5 * 0.5 * (1 - o.w / A)), s = Math.round(1e5 * 0.5 * (1 - o.h / l));
      return `<a:srcRect l="${c}" r="${c}" t="${s}" b="${s}"/><a:stretch/>`;
    },
    contain: function(e, o) {
      const t = e.h / e.w, n = o.h / o.w > t, A = n ? o.w : o.h / t, l = n ? o.w * t : o.h, c = Math.round(1e5 * 0.5 * (1 - o.w / A)), s = Math.round(1e5 * 0.5 * (1 - o.h / l));
      return `<a:srcRect l="${c}" r="${c}" t="${s}" b="${s}"/><a:stretch/>`;
    },
    crop: function(e, o) {
      const t = o.x, i = e.w - (o.x + o.w), n = o.y, A = e.h - (o.y + o.h), l = Math.round(1e5 * (t / e.w)), c = Math.round(1e5 * (i / e.w)), s = Math.round(1e5 * (n / e.h)), a = Math.round(1e5 * (A / e.h));
      return `<a:srcRect l="${l}" r="${c}" t="${s}" b="${a}"/><a:stretch/>`;
    }
  };
  function It(e) {
    var o;
    let t = e._name ? '<p:cSld name="' + e._name + '">' : "<p:cSld>", i = 1;
    return e._bkgdImgRid ? t += `<p:bg><p:bgPr><a:blipFill dpi="0" rotWithShape="1"><a:blip r:embed="rId${e._bkgdImgRid}"><a:lum/></a:blip><a:srcRect/><a:stretch><a:fillRect/></a:stretch></a:blipFill><a:effectLst/></p:bgPr></p:bg>` : !((o = e.background) === null || o === void 0) && o.color ? t += `<p:bg><p:bgPr>${De(e.background)}</p:bgPr></p:bg>` : !e.bkgd && e._name && e._name === kt && (t += '<p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg>'), t += "<p:spTree>", t += '<p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>', t += '<p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/>', t += '<a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>', e._slideObjects.forEach((n, A) => {
      var l, c, s, a, r, f, g, d;
      let m = 0, h = 0, y = de("75%", "X", e._presLayout), v = 0, b, x = "", k = null, B = null, T = 0, R = 0, G = null, P = null;
      const I = (l = n.options) === null || l === void 0 ? void 0 : l.sizing, H = (c = n.options) === null || c === void 0 ? void 0 : c.rounding;
      e._slideLayout !== void 0 && e._slideLayout._slideObjects !== void 0 && n.options && n.options.placeholder && (b = e._slideLayout._slideObjects.filter((u) => u.options.placeholder === n.options.placeholder)[0]), n.options = n.options || {}, typeof n.options.x < "u" && (m = de(n.options.x, "X", e._presLayout)), typeof n.options.y < "u" && (h = de(n.options.y, "Y", e._presLayout)), typeof n.options.w < "u" && (y = de(n.options.w, "X", e._presLayout)), typeof n.options.h < "u" && (v = de(n.options.h, "Y", e._presLayout));
      let L = y, E = v;
      switch (b && ((b.options.x || b.options.x === 0) && (m = de(b.options.x, "X", e._presLayout)), (b.options.y || b.options.y === 0) && (h = de(b.options.y, "Y", e._presLayout)), (b.options.w || b.options.w === 0) && (y = de(b.options.w, "X", e._presLayout)), (b.options.h || b.options.h === 0) && (v = de(b.options.h, "Y", e._presLayout))), n.options.flipH && (x += ' flipH="1"'), n.options.flipV && (x += ' flipV="1"'), n.options.rotate && (x += ` rot="${Ue(n.options.rotate)}"`), n._type) {
        case se.table:
          if (k = n.arrTabRows, B = n.options, T = 0, R = 0, k[0].forEach((u) => {
            G = u.options || null, T += (G == null ? void 0 : G.colspan) ? Number(G.colspan) : 1;
          }), P = `<p:graphicFrame><p:nvGraphicFramePr><p:cNvPr id="${i * e._slideNum + 1}" name="${n.options.objectName}"/>`, P += '<p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr>  <p:nvPr><p:extLst><p:ext uri="{D42A27DB-BD31-4B8C-83A1-F6EECF244321}"><p14:modId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1579011935"/></p:ext></p:extLst></p:nvPr></p:nvGraphicFramePr>', P += `<p:xfrm><a:off x="${m || (m === 0 ? 0 : Ae)}" y="${h || (h === 0 ? 0 : Ae)}"/><a:ext cx="${y || (y === 0 ? 0 : Ae)}" cy="${v || Ae}"/></p:xfrm>`, P += '<a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table"><a:tbl><a:tblPr/>', Array.isArray(B.colW)) {
            P += "<a:tblGrid>";
            for (let u = 0; u < T; u++) {
              let S = he(B.colW[u]);
              (S == null || isNaN(S)) && (S = (typeof n.options.w == "number" ? n.options.w : 1) / T), P += `<a:gridCol w="${Math.round(S)}"/>`;
            }
            P += "</a:tblGrid>";
          } else {
            R = B.colW ? B.colW : Ae, n.options.w && !B.colW && (R = Math.round((typeof n.options.w == "number" ? n.options.w : 1) / T)), P += "<a:tblGrid>";
            for (let u = 0; u < T; u++) P += `<a:gridCol w="${R}"/>`;
            P += "</a:tblGrid>";
          }
          k.forEach((u) => {
            var S, Z;
            for (let M = 0; M < u.length; ) {
              const te = u[M], X = (S = te.options) === null || S === void 0 ? void 0 : S.colspan, ae = (Z = te.options) === null || Z === void 0 ? void 0 : Z.rowspan;
              if (X && X > 1) {
                const N = new Array(X - 1).fill(void 0).map(() => ({
                  _type: se.tablecell,
                  options: {
                    rowspan: ae
                  },
                  _hmerge: true
                }));
                u.splice(M + 1, 0, ...N), M += X;
              } else M += 1;
            }
          }), k.forEach((u, S) => {
            const Z = k[S + 1];
            Z && u.forEach((M, te) => {
              var X, ae;
              const N = M._rowContinue || ((X = M.options) === null || X === void 0 ? void 0 : X.rowspan), F = (ae = M.options) === null || ae === void 0 ? void 0 : ae.colspan, K = M._hmerge;
              if (N && N > 1) {
                const j = {
                  _type: se.tablecell,
                  options: {
                    colspan: F
                  },
                  _rowContinue: N - 1,
                  _vmerge: true,
                  _hmerge: K
                };
                Z.splice(te, 0, j);
              }
            });
          }), k.forEach((u, S) => {
            let Z = 0;
            Array.isArray(B.rowH) && B.rowH[S] ? Z = he(Number(B.rowH[S])) : B.rowH && !isNaN(Number(B.rowH)) ? Z = he(Number(B.rowH)) : (n.options.cy || n.options.h) && (Z = Math.round((n.options.h ? he(n.options.h) : typeof n.options.cy == "number" ? n.options.cy : 1) / k.length)), P += `<a:tr h="${Z}">`, u.forEach((M) => {
              var te, X, ae, N, F;
              const K = M, j = {
                rowSpan: ((te = K.options) === null || te === void 0 ? void 0 : te.rowspan) > 1 ? K.options.rowspan : void 0,
                gridSpan: ((X = K.options) === null || X === void 0 ? void 0 : X.colspan) > 1 ? K.options.colspan : void 0,
                vMerge: K._vmerge ? 1 : void 0,
                hMerge: K._hmerge ? 1 : void 0
              };
              let J = Object.keys(j).map((ce) => [
                ce,
                j[ce]
              ]).filter(([, ce]) => !!ce).map(([ce, p]) => `${String(ce)}="${String(p)}"`).join(" ");
              if (J && (J = " " + J), K._hmerge || K._vmerge) {
                P += `<a:tc${J}><a:tcPr/></a:tc>`;
                return;
              }
              const le = K.options || {};
              K.options = le, [
                "align",
                "bold",
                "border",
                "color",
                "fill",
                "fontFace",
                "fontSize",
                "margin",
                "textDirection",
                "underline",
                "valign"
              ].forEach((ce) => {
                B[ce] && !le[ce] && le[ce] !== 0 && (le[ce] = B[ce]);
              });
              const we = le.valign ? ` anchor="${le.valign.replace(/^c$/i, "ctr").replace(/^m$/i, "ctr").replace("center", "ctr").replace("middle", "ctr").replace("top", "t").replace("btm", "b").replace("bottom", "b")}"` : "", fe = le.textDirection && le.textDirection !== "horz" ? ` vert="${le.textDirection}"` : "";
              let q = !((N = (ae = K._optImp) === null || ae === void 0 ? void 0 : ae.fill) === null || N === void 0) && N.color ? K._optImp.fill.color : !((F = K._optImp) === null || F === void 0) && F.fill && typeof K._optImp.fill == "string" ? K._optImp.fill : "";
              q = q || le.fill ? le.fill : "";
              const pe = q ? De(q) : "";
              let re = le.margin === 0 || le.margin ? le.margin : Kt;
              !Array.isArray(re) && typeof re == "number" && (re = [
                re,
                re,
                re,
                re
              ]);
              let be = "";
              re[0] >= 1 ? be = ` marL="${oe(re[3])}" marR="${oe(re[1])}" marT="${oe(re[0])}" marB="${oe(re[2])}"` : be = ` marL="${he(re[3])}" marR="${he(re[1])}" marT="${he(re[0])}" marB="${he(re[2])}"`, P += `<a:tc${J}>${Jt(K)}<a:tcPr${be}${we}${fe}>`, le.border && Array.isArray(le.border) && [
                {
                  idx: 3,
                  name: "lnL"
                },
                {
                  idx: 1,
                  name: "lnR"
                },
                {
                  idx: 0,
                  name: "lnT"
                },
                {
                  idx: 2,
                  name: "lnB"
                }
              ].forEach((ce) => {
                le.border[ce.idx].type !== "none" ? (P += `<a:${ce.name} w="${oe(le.border[ce.idx].pt)}" cap="flat" cmpd="sng" algn="ctr">`, P += `<a:solidFill>${me(le.border[ce.idx].color)}</a:solidFill>`, P += `<a:prstDash val="${le.border[ce.idx].type === "dash" ? "sysDash" : "solid"}"/><a:round/><a:headEnd type="none" w="med" len="med"/><a:tailEnd type="none" w="med" len="med"/>`, P += `</a:${ce.name}>`) : P += `<a:${ce.name} w="0" cap="flat" cmpd="sng" algn="ctr"><a:noFill/></a:${ce.name}>`;
              }), P += pe, P += "  </a:tcPr>", P += " </a:tc>";
            }), P += "</a:tr>";
          }), P += "      </a:tbl>", P += "    </a:graphicData>", P += "  </a:graphic>", P += "</p:graphicFrame>", t += P, i++;
          break;
        case se.text:
        case se.placeholder:
          if (!n.options.line && v === 0 && (v = Ae * 0.3), n.options._bodyProp || (n.options._bodyProp = {}), n.options.margin && Array.isArray(n.options.margin) ? (n.options._bodyProp.lIns = oe(n.options.margin[0] || 0), n.options._bodyProp.rIns = oe(n.options.margin[1] || 0), n.options._bodyProp.bIns = oe(n.options.margin[2] || 0), n.options._bodyProp.tIns = oe(n.options.margin[3] || 0)) : typeof n.options.margin == "number" && (n.options._bodyProp.lIns = oe(n.options.margin), n.options._bodyProp.rIns = oe(n.options.margin), n.options._bodyProp.bIns = oe(n.options.margin), n.options._bodyProp.tIns = oe(n.options.margin)), t += "<p:sp>", t += `<p:nvSpPr><p:cNvPr id="${A + 2}" name="${n.options.objectName}">`, !((s = n.options.hyperlink) === null || s === void 0) && s.url && (t += `<a:hlinkClick r:id="rId${n.options.hyperlink._rId}" tooltip="${n.options.hyperlink.tooltip ? ie(n.options.hyperlink.tooltip) : ""}"/>`), !((a = n.options.hyperlink) === null || a === void 0) && a.slide && (t += `<a:hlinkClick r:id="rId${n.options.hyperlink._rId}" tooltip="${n.options.hyperlink.tooltip ? ie(n.options.hyperlink.tooltip) : ""}" action="ppaction://hlinksldjump"/>`), t += "</p:cNvPr>", t += "<p:cNvSpPr" + (!((r = n.options) === null || r === void 0) && r.isTextBox ? ' txBox="1"/>' : "/>"), t += `<p:nvPr>${n._type === "placeholder" ? lt(n) : lt(b)}</p:nvPr>`, t += "</p:nvSpPr><p:spPr>", t += `<a:xfrm${x}>`, t += `<a:off x="${m}" y="${h}"/>`, t += `<a:ext cx="${y}" cy="${v}"/></a:xfrm>`, n.shape === "custGeom") t += "<a:custGeom><a:avLst />", t += "<a:gdLst>", t += "</a:gdLst>", t += "<a:ahLst />", t += "<a:cxnLst>", t += "</a:cxnLst>", t += '<a:rect l="l" t="t" r="r" b="b" />', t += "<a:pathLst>", t += `<a:path w="${y}" h="${v}">`, (f = n.options.points) === null || f === void 0 || f.forEach((u, S) => {
            if ("curve" in u) switch (u.curve.type) {
              case "arc":
                t += `<a:arcTo hR="${de(u.curve.hR, "Y", e._presLayout)}" wR="${de(u.curve.wR, "X", e._presLayout)}" stAng="${Ue(u.curve.stAng)}" swAng="${Ue(u.curve.swAng)}" />`;
                break;
              case "cubic":
                t += `<a:cubicBezTo>
									<a:pt x="${de(u.curve.x1, "X", e._presLayout)}" y="${de(u.curve.y1, "Y", e._presLayout)}" />
									<a:pt x="${de(u.curve.x2, "X", e._presLayout)}" y="${de(u.curve.y2, "Y", e._presLayout)}" />
									<a:pt x="${de(u.x, "X", e._presLayout)}" y="${de(u.y, "Y", e._presLayout)}" />
									</a:cubicBezTo>`;
                break;
              case "quadratic":
                t += `<a:quadBezTo>
									<a:pt x="${de(u.curve.x1, "X", e._presLayout)}" y="${de(u.curve.y1, "Y", e._presLayout)}" />
									<a:pt x="${de(u.x, "X", e._presLayout)}" y="${de(u.y, "Y", e._presLayout)}" />
									</a:quadBezTo>`;
                break;
            }
            else "close" in u ? t += "<a:close />" : u.moveTo || S === 0 ? t += `<a:moveTo><a:pt x="${de(u.x, "X", e._presLayout)}" y="${de(u.y, "Y", e._presLayout)}" /></a:moveTo>` : t += `<a:lnTo><a:pt x="${de(u.x, "X", e._presLayout)}" y="${de(u.y, "Y", e._presLayout)}" /></a:lnTo>`;
          }), t += "</a:path>", t += "</a:pathLst>", t += "</a:custGeom>";
          else {
            if (t += '<a:prstGeom prst="' + n.shape + '"><a:avLst>', n.options.rectRadius) t += `<a:gd name="adj" fmla="val ${Math.round(n.options.rectRadius * Ae * 1e5 / Math.min(y, v))}"/>`;
            else if (n.options.angleRange) {
              for (let u = 0; u < 2; u++) {
                const S = n.options.angleRange[u];
                t += `<a:gd name="adj${u + 1}" fmla="val ${Ue(S)}" />`;
              }
              n.options.arcThicknessRatio && (t += `<a:gd name="adj3" fmla="val ${Math.round(n.options.arcThicknessRatio * 5e4)}" />`);
            }
            t += "</a:avLst></a:prstGeom>";
          }
          t += n.options.fill ? De(n.options.fill) : "<a:noFill/>", n.options.line && (t += n.options.line.width ? `<a:ln w="${oe(n.options.line.width)}">` : "<a:ln>", n.options.line.color && (t += De(n.options.line)), n.options.line.dashType && (t += `<a:prstDash val="${n.options.line.dashType}"/>`), n.options.line.beginArrowType && (t += `<a:headEnd type="${n.options.line.beginArrowType}"/>`), n.options.line.endArrowType && (t += `<a:tailEnd type="${n.options.line.endArrowType}"/>`), t += "</a:ln>"), n.options.shadow && n.options.shadow.type !== "none" && (n.options.shadow.type = n.options.shadow.type || "outer", n.options.shadow.blur = oe(n.options.shadow.blur || 8), n.options.shadow.offset = oe(n.options.shadow.offset || 4), n.options.shadow.angle = Math.round((n.options.shadow.angle || 270) * 6e4), n.options.shadow.opacity = Math.round((n.options.shadow.opacity || 0.75) * 1e5), n.options.shadow.color = n.options.shadow.color || Ot.color, t += "<a:effectLst>", t += ` <a:${n.options.shadow.type}Shdw ${n.options.shadow.type === "outer" ? 'sx="100000" sy="100000" kx="0" ky="0" algn="bl" rotWithShape="0"' : ""} blurRad="${n.options.shadow.blur}" dist="${n.options.shadow.offset}" dir="${n.options.shadow.angle}">`, t += ` <a:srgbClr val="${n.options.shadow.color}">`, t += ` <a:alpha val="${n.options.shadow.opacity}"/></a:srgbClr>`, t += " </a:outerShdw>", t += "</a:effectLst>"), t += "</p:spPr>", t += Jt(n), t += "</p:sp>";
          break;
        case se.image:
          if (t += "<p:pic>", t += "  <p:nvPicPr>", t += `<p:cNvPr id="${A + 2}" name="${n.options.objectName}" descr="${ie(n.options.altText || n.image)}">`, !((g = n.hyperlink) === null || g === void 0) && g.url && (t += `<a:hlinkClick r:id="rId${n.hyperlink._rId}" tooltip="${n.hyperlink.tooltip ? ie(n.hyperlink.tooltip) : ""}"/>`), !((d = n.hyperlink) === null || d === void 0) && d.slide && (t += `<a:hlinkClick r:id="rId${n.hyperlink._rId}" tooltip="${n.hyperlink.tooltip ? ie(n.hyperlink.tooltip) : ""}" action="ppaction://hlinksldjump"/>`), t += "    </p:cNvPr>", t += '    <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>', t += "    <p:nvPr>" + lt(b) + "</p:nvPr>", t += "  </p:nvPicPr>", t += "<p:blipFill>", (e._relsMedia || []).filter((u) => u.rId === n.imageRid)[0] && (e._relsMedia || []).filter((u) => u.rId === n.imageRid)[0].extn === "svg" ? (t += `<a:blip r:embed="rId${n.imageRid - 1}">`, t += n.options.transparency ? ` <a:alphaModFix amt="${Math.round((100 - n.options.transparency) * 1e3)}"/>` : "", t += " <a:extLst>", t += '  <a:ext uri="{96DAC541-7B7A-43D3-8B79-37D633B846F1}">', t += `   <asvg:svgBlip xmlns:asvg="http://schemas.microsoft.com/office/drawing/2016/SVG/main" r:embed="rId${n.imageRid}"/>`, t += "  </a:ext>", t += " </a:extLst>", t += "</a:blip>") : (t += `<a:blip r:embed="rId${n.imageRid}">`, t += n.options.transparency ? `<a:alphaModFix amt="${Math.round((100 - n.options.transparency) * 1e3)}"/>` : "", t += "</a:blip>"), I == null ? void 0 : I.type) {
            const u = I.w ? de(I.w, "X", e._presLayout) : y, S = I.h ? de(I.h, "Y", e._presLayout) : v, Z = de(I.x || 0, "X", e._presLayout), M = de(I.y || 0, "Y", e._presLayout);
            t += qa[I.type]({
              w: L,
              h: E
            }, {
              w: u,
              h: S,
              x: Z,
              y: M
            }), L = u, E = S;
          } else t += "  <a:stretch><a:fillRect/></a:stretch>";
          t += "</p:blipFill>", t += "<p:spPr>", t += " <a:xfrm" + x + ">", t += `  <a:off x="${m}" y="${h}"/>`, t += `  <a:ext cx="${L}" cy="${E}"/>`, t += " </a:xfrm>", t += ` <a:prstGeom prst="${H ? "ellipse" : "rect"}"><a:avLst/></a:prstGeom>`, n.options.shadow && n.options.shadow.type !== "none" && (n.options.shadow.type = n.options.shadow.type || "outer", n.options.shadow.blur = oe(n.options.shadow.blur || 8), n.options.shadow.offset = oe(n.options.shadow.offset || 4), n.options.shadow.angle = Math.round((n.options.shadow.angle || 270) * 6e4), n.options.shadow.opacity = Math.round((n.options.shadow.opacity || 0.75) * 1e5), n.options.shadow.color = n.options.shadow.color || Ot.color, t += "<a:effectLst>", t += `<a:${n.options.shadow.type}Shdw ${n.options.shadow.type === "outer" ? 'sx="100000" sy="100000" kx="0" ky="0" algn="bl" rotWithShape="0"' : ""} blurRad="${n.options.shadow.blur}" dist="${n.options.shadow.offset}" dir="${n.options.shadow.angle}">`, t += `<a:srgbClr val="${n.options.shadow.color}">`, t += `<a:alpha val="${n.options.shadow.opacity}"/></a:srgbClr>`, t += `</a:${n.options.shadow.type}Shdw>`, t += "</a:effectLst>"), t += "</p:spPr>", t += "</p:pic>";
          break;
        case se.media:
          n.mtype === "online" ? (t += "<p:pic>", t += " <p:nvPicPr>", t += `<p:cNvPr id="${n.mediaRid + 2}" name="${n.options.objectName}"/>`, t += " <p:cNvPicPr/>", t += " <p:nvPr>", t += `  <a:videoFile r:link="rId${n.mediaRid}"/>`, t += " </p:nvPr>", t += " </p:nvPicPr>", t += ` <p:blipFill><a:blip r:embed="rId${n.mediaRid + 1}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>`, t += " <p:spPr>", t += `  <a:xfrm${x}><a:off x="${m}" y="${h}"/><a:ext cx="${y}" cy="${v}"/></a:xfrm>`, t += '  <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>', t += " </p:spPr>", t += "</p:pic>") : (t += "<p:pic>", t += " <p:nvPicPr>", t += `<p:cNvPr id="${n.mediaRid + 2}" name="${n.options.objectName}"><a:hlinkClick r:id="" action="ppaction://media"/></p:cNvPr>`, t += ' <p:cNvPicPr><a:picLocks noChangeAspect="1"/></p:cNvPicPr>', t += " <p:nvPr>", t += `  <a:videoFile r:link="rId${n.mediaRid}"/>`, t += "  <p:extLst>", t += '   <p:ext uri="{DAA4B4D4-6D71-4841-9C94-3DE7FCFB9230}">', t += `    <p14:media xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" r:embed="rId${n.mediaRid + 1}"/>`, t += "   </p:ext>", t += "  </p:extLst>", t += " </p:nvPr>", t += " </p:nvPicPr>", t += ` <p:blipFill><a:blip r:embed="rId${n.mediaRid + 2}"/><a:stretch><a:fillRect/></a:stretch></p:blipFill>`, t += " <p:spPr>", t += `  <a:xfrm${x}><a:off x="${m}" y="${h}"/><a:ext cx="${y}" cy="${v}"/></a:xfrm>`, t += '  <a:prstGeom prst="rect"><a:avLst/></a:prstGeom>', t += " </p:spPr>", t += "</p:pic>");
          break;
        case se.chart:
          t += "<p:graphicFrame>", t += " <p:nvGraphicFramePr>", t += `   <p:cNvPr id="${A + 2}" name="${n.options.objectName}" descr="${ie(n.options.altText || "")}"/>`, t += "   <p:cNvGraphicFramePr/>", t += `   <p:nvPr>${lt(b)}</p:nvPr>`, t += " </p:nvGraphicFramePr>", t += ` <p:xfrm><a:off x="${m}" y="${h}"/><a:ext cx="${y}" cy="${v}"/></p:xfrm>`, t += ' <a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">', t += '  <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart">', t += `   <c:chart r:id="rId${n.chartRid}" xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"/>`, t += "  </a:graphicData>", t += " </a:graphic>", t += "</p:graphicFrame>";
          break;
        default:
          t += "";
          break;
      }
    }), e._slideNumberProps && (e._slideNumberProps.align || (e._slideNumberProps.align = "left"), t += "<p:sp>", t += " <p:nvSpPr>", t += '  <p:cNvPr id="25" name="Slide Number Placeholder 0"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr>', t += '  <p:nvPr><p:ph type="sldNum" sz="quarter" idx="4294967295"/></p:nvPr>', t += " </p:nvSpPr>", t += " <p:spPr>", t += `<a:xfrm><a:off x="${de(e._slideNumberProps.x, "X", e._presLayout)}" y="${de(e._slideNumberProps.y, "Y", e._presLayout)}"/><a:ext cx="${e._slideNumberProps.w ? de(e._slideNumberProps.w, "X", e._presLayout) : "800000"}" cy="${e._slideNumberProps.h ? de(e._slideNumberProps.h, "Y", e._presLayout) : "300000"}"/></a:xfrm> <a:prstGeom prst="rect"><a:avLst/></a:prstGeom> <a:extLst><a:ext uri="{C572A759-6A51-4108-AA02-DFA0A04FC94B}"><ma14:wrappingTextBoxFlag val="0" xmlns:ma14="http://schemas.microsoft.com/office/mac/drawingml/2011/main"/></a:ext></a:extLst></p:spPr>`, t += "<p:txBody>", t += "<a:bodyPr", e._slideNumberProps.margin && Array.isArray(e._slideNumberProps.margin) ? (t += ` lIns="${oe(e._slideNumberProps.margin[3] || 0)}"`, t += ` tIns="${oe(e._slideNumberProps.margin[0] || 0)}"`, t += ` rIns="${oe(e._slideNumberProps.margin[1] || 0)}"`, t += ` bIns="${oe(e._slideNumberProps.margin[2] || 0)}"`) : typeof e._slideNumberProps.margin == "number" && (t += ` lIns="${oe(e._slideNumberProps.margin || 0)}"`, t += ` tIns="${oe(e._slideNumberProps.margin || 0)}"`, t += ` rIns="${oe(e._slideNumberProps.margin || 0)}"`, t += ` bIns="${oe(e._slideNumberProps.margin || 0)}"`), e._slideNumberProps.valign && (t += ` anchor="${e._slideNumberProps.valign.replace("top", "t").replace("middle", "ctr").replace("bottom", "b")}"`), t += "/>", t += "  <a:lstStyle><a:lvl1pPr>", (e._slideNumberProps.fontFace || e._slideNumberProps.fontSize || e._slideNumberProps.color) && (t += `<a:defRPr sz="${Math.round((e._slideNumberProps.fontSize || 12) * 100)}">`, e._slideNumberProps.color && (t += De(e._slideNumberProps.color)), e._slideNumberProps.fontFace && (t += `<a:latin typeface="${e._slideNumberProps.fontFace}"/><a:ea typeface="${e._slideNumberProps.fontFace}"/><a:cs typeface="${e._slideNumberProps.fontFace}"/>`), t += "</a:defRPr>"), t += "</a:lvl1pPr></a:lstStyle>", t += "<a:p>", e._slideNumberProps.align.startsWith("l") ? t += '<a:pPr algn="l"/>' : e._slideNumberProps.align.startsWith("c") ? t += '<a:pPr algn="ctr"/>' : e._slideNumberProps.align.startsWith("r") ? t += '<a:pPr algn="r"/>' : t += '<a:pPr algn="l"/>', t += `<a:fld id="${ea}" type="slidenum"><a:rPr b="${e._slideNumberProps.bold ? 1 : 0}" lang="en-US"/>`, t += `<a:t>${e._slideNum}</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p>`, t += "</p:txBody></p:sp>"), t += "</p:spTree>", t += "</p:cSld>", t;
  }
  function Mt(e, o) {
    let t = 0, i = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + Ce + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
    return e._rels.forEach((n) => {
      t = Math.max(t, n.rId), n.type.toLowerCase().includes("hyperlink") ? n.data === "slide" ? i += `<Relationship Id="rId${n.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slide${n.Target}.xml"/>` : i += `<Relationship Id="rId${n.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="${n.Target}" TargetMode="External"/>` : n.type.toLowerCase().includes("notesSlide") && (i += `<Relationship Id="rId${n.rId}" Target="${n.Target}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide"/>`);
    }), (e._relsChart || []).forEach((n) => {
      t = Math.max(t, n.rId), i += `<Relationship Id="rId${n.rId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="${n.Target}"/>`;
    }), (e._relsMedia || []).forEach((n) => {
      const A = n.rId.toString();
      t = Math.max(t, n.rId), n.type.toLowerCase().includes("image") ? i += '<Relationship Id="rId' + A + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="' + n.Target + '"/>' : n.type.toLowerCase().includes("audio") ? i.includes(' Target="' + n.Target + '"') ? i += '<Relationship Id="rId' + A + '" Type="http://schemas.microsoft.com/office/2007/relationships/media" Target="' + n.Target + '"/>' : i += '<Relationship Id="rId' + A + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio" Target="' + n.Target + '"/>' : n.type.toLowerCase().includes("video") ? i.includes(' Target="' + n.Target + '"') ? i += '<Relationship Id="rId' + A + '" Type="http://schemas.microsoft.com/office/2007/relationships/media" Target="' + n.Target + '"/>' : i += '<Relationship Id="rId' + A + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/video" Target="' + n.Target + '"/>' : n.type.toLowerCase().includes("online") && (i.includes(' Target="' + n.Target + '"') ? i += '<Relationship Id="rId' + A + '" Type="http://schemas.microsoft.com/office/2007/relationships/image" Target="' + n.Target + '"/>' : i += '<Relationship Id="rId' + A + '" Target="' + n.Target + '" TargetMode="External" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/video"/>');
    }), o.forEach((n, A) => {
      i += `<Relationship Id="rId${t + A + 1}" Type="${n.type}" Target="${n.target}"/>`;
    }), i += "</Relationships>", i;
  }
  function Vt(e, o) {
    var t, i;
    let n = "", A = "", l = "", c = "";
    const s = o ? "a:lvl1pPr" : "a:pPr";
    let a = oe(Da), r = `<${s}${e.options.rtlMode ? ' rtl="1" ' : ""}`;
    {
      if (e.options.align) switch (e.options.align) {
        case "left":
          r += ' algn="l"';
          break;
        case "right":
          r += ' algn="r"';
          break;
        case "center":
          r += ' algn="ctr"';
          break;
        case "justify":
          r += ' algn="just"';
          break;
        default:
          r += "";
          break;
      }
      if (e.options.lineSpacing ? A = `<a:lnSpc><a:spcPts val="${Math.round(e.options.lineSpacing * 100)}"/></a:lnSpc>` : e.options.lineSpacingMultiple && (A = `<a:lnSpc><a:spcPct val="${Math.round(e.options.lineSpacingMultiple * 1e5)}"/></a:lnSpc>`), e.options.indentLevel && !isNaN(Number(e.options.indentLevel)) && e.options.indentLevel > 0 && (r += ` lvl="${e.options.indentLevel}"`), e.options.paraSpaceBefore && !isNaN(Number(e.options.paraSpaceBefore)) && e.options.paraSpaceBefore > 0 && (l += `<a:spcBef><a:spcPts val="${Math.round(e.options.paraSpaceBefore * 100)}"/></a:spcBef>`), e.options.paraSpaceAfter && !isNaN(Number(e.options.paraSpaceAfter)) && e.options.paraSpaceAfter > 0 && (l += `<a:spcAft><a:spcPts val="${Math.round(e.options.paraSpaceAfter * 100)}"/></a:spcAft>`), typeof e.options.bullet == "object") if (!((i = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.bullet) === null || i === void 0) && i.indent && (a = oe(e.options.bullet.indent)), e.options.bullet.type) e.options.bullet.type.toString().toLowerCase() === "number" && (r += ` marL="${e.options.indentLevel && e.options.indentLevel > 0 ? a + a * e.options.indentLevel : a}" indent="-${a}"`, n = `<a:buSzPct val="100000"/><a:buFont typeface="+mj-lt"/><a:buAutoNum type="${e.options.bullet.style || "arabicPeriod"}" startAt="${e.options.bullet.numberStartAt || e.options.bullet.startAt || "1"}"/>`);
      else if (e.options.bullet.characterCode) {
        let f = `&#x${e.options.bullet.characterCode};`;
        /^[0-9A-Fa-f]{4}$/.test(e.options.bullet.characterCode) || (console.warn("Warning: `bullet.characterCode should be a 4-digit unicode charatcer (ex: 22AB)`!"), f = Ve.DEFAULT), r += ` marL="${e.options.indentLevel && e.options.indentLevel > 0 ? a + a * e.options.indentLevel : a}" indent="-${a}"`, n = '<a:buSzPct val="100000"/><a:buChar char="' + f + '"/>';
      } else if (e.options.bullet.code) {
        let f = `&#x${e.options.bullet.code};`;
        /^[0-9A-Fa-f]{4}$/.test(e.options.bullet.code) || (console.warn("Warning: `bullet.code should be a 4-digit hex code (ex: 22AB)`!"), f = Ve.DEFAULT), r += ` marL="${e.options.indentLevel && e.options.indentLevel > 0 ? a + a * e.options.indentLevel : a}" indent="-${a}"`, n = '<a:buSzPct val="100000"/><a:buChar char="' + f + '"/>';
      } else r += ` marL="${e.options.indentLevel && e.options.indentLevel > 0 ? a + a * e.options.indentLevel : a}" indent="-${a}"`, n = `<a:buSzPct val="100000"/><a:buChar char="${Ve.DEFAULT}"/>`;
      else e.options.bullet ? (r += ` marL="${e.options.indentLevel && e.options.indentLevel > 0 ? a + a * e.options.indentLevel : a}" indent="-${a}"`, n = `<a:buSzPct val="100000"/><a:buChar char="${Ve.DEFAULT}"/>`) : e.options.bullet || (r += ' indent="0" marL="0"', n = "<a:buNone/>");
      e.options.tabStops && Array.isArray(e.options.tabStops) && (c = `<a:tabLst>${e.options.tabStops.map((g) => `<a:tab pos="${he(g.position || 1)}" algn="${g.alignment || "l"}"/>`).join("")}</a:tabLst>`), r += ">" + A + l + n + c, o && (r += oa(e.options, true)), r += "</" + s + ">";
    }
    return r;
  }
  function oa(e, o) {
    var t;
    let i = "";
    const n = o ? "a:defRPr" : "a:rPr";
    if (i += "<" + n + ' lang="' + (e.lang ? e.lang : "en-US") + '"' + (e.lang ? ' altLang="en-US"' : ""), i += e.fontSize ? ` sz="${Math.round(e.fontSize * 100)}"` : "", i += (e == null ? void 0 : e.bold) ? ` b="${e.bold ? "1" : "0"}"` : "", i += (e == null ? void 0 : e.italic) ? ` i="${e.italic ? "1" : "0"}"` : "", i += (e == null ? void 0 : e.strike) ? ` strike="${typeof e.strike == "string" ? e.strike : "sngStrike"}"` : "", typeof e.underline == "object" && (!((t = e.underline) === null || t === void 0) && t.style) ? i += ` u="${e.underline.style}"` : typeof e.underline == "string" ? i += ` u="${String(e.underline)}"` : e.hyperlink && (i += ' u="sng"'), e.baseline ? i += ` baseline="${Math.round(e.baseline * 50)}"` : e.subscript ? i += ' baseline="-40000"' : e.superscript && (i += ' baseline="30000"'), i += e.charSpacing ? ` spc="${Math.round(e.charSpacing * 100)}" kern="0"` : "", i += ' dirty="0">', (e.color || e.fontFace || e.outline || typeof e.underline == "object" && e.underline.color) && (e.outline && typeof e.outline == "object" && (i += `<a:ln w="${oe(e.outline.size || 0.75)}">${De(e.outline.color || "FFFFFF")}</a:ln>`), e.color && (i += De({
      color: e.color,
      transparency: e.transparency
    })), e.highlight && (i += `<a:highlight>${me(e.highlight)}</a:highlight>`), typeof e.underline == "object" && e.underline.color && (i += `<a:uFill>${De(e.underline.color)}</a:uFill>`), e.glow && (i += `<a:effectLst>${Ra(e.glow, Fa)}</a:effectLst>`), e.fontFace && (i += `<a:latin typeface="${e.fontFace}" pitchFamily="34" charset="0"/><a:ea typeface="${e.fontFace}" pitchFamily="34" charset="-122"/><a:cs typeface="${e.fontFace}" pitchFamily="34" charset="-120"/>`)), e.hyperlink) {
      if (typeof e.hyperlink != "object") throw new Error("ERROR: text `hyperlink` option should be an object. Ex: `hyperlink:{url:'https://github.com'}` ");
      if (!e.hyperlink.url && !e.hyperlink.slide) throw new Error("ERROR: 'hyperlink requires either `url` or `slide`'");
      e.hyperlink.url ? i += `<a:hlinkClick r:id="rId${e.hyperlink._rId}" invalidUrl="" action="" tgtFrame="" tooltip="${e.hyperlink.tooltip ? ie(e.hyperlink.tooltip) : ""}" history="1" highlightClick="0" endSnd="0"${e.color ? ">" : "/>"}` : e.hyperlink.slide && (i += `<a:hlinkClick r:id="rId${e.hyperlink._rId}" action="ppaction://hlinksldjump" tooltip="${e.hyperlink.tooltip ? ie(e.hyperlink.tooltip) : ""}"${e.color ? ">" : "/>"}`), e.color && (i += " <a:extLst>", i += '  <a:ext uri="{A12FA001-AC4F-418D-AE19-62706E023703}">', i += '   <ahyp:hlinkClr xmlns:ahyp="http://schemas.microsoft.com/office/drawing/2018/hyperlinkcolor" val="tx"/>', i += "  </a:ext>", i += " </a:extLst>", i += "</a:hlinkClick>");
    }
    return i += `</${n}>`, i;
  }
  function Va(e) {
    return e.text ? `<a:r>${oa(e.options, false)}<a:t>${ie(e.text)}</a:t></a:r>` : "";
  }
  function Ja(e) {
    let o = "<a:bodyPr";
    return e && e._type === se.text && e.options._bodyProp ? (o += e.options._bodyProp.wrap ? ' wrap="square"' : ' wrap="none"', (e.options._bodyProp.lIns || e.options._bodyProp.lIns === 0) && (o += ` lIns="${e.options._bodyProp.lIns}"`), (e.options._bodyProp.tIns || e.options._bodyProp.tIns === 0) && (o += ` tIns="${e.options._bodyProp.tIns}"`), (e.options._bodyProp.rIns || e.options._bodyProp.rIns === 0) && (o += ` rIns="${e.options._bodyProp.rIns}"`), (e.options._bodyProp.bIns || e.options._bodyProp.bIns === 0) && (o += ` bIns="${e.options._bodyProp.bIns}"`), o += ' rtlCol="0"', e.options._bodyProp.anchor && (o += ' anchor="' + e.options._bodyProp.anchor + '"'), e.options._bodyProp.vert && (o += ' vert="' + e.options._bodyProp.vert + '"'), o += ">", e.options.fit && (e.options.fit === "none" ? o += "" : e.options.fit === "shrink" ? o += "<a:normAutofit/>" : e.options.fit === "resize" && (o += "<a:spAutoFit/>")), e.options.shrinkText && (o += "<a:normAutofit/>"), o += e.options._bodyProp.autoFit ? "<a:spAutoFit/>" : "", o += "</a:bodyPr>") : (o += ' wrap="square" rtlCol="0">', o += "</a:bodyPr>"), e._type === se.tablecell ? "<a:bodyPr/>" : o;
  }
  function Jt(e) {
    const o = e.options || {};
    let t = [];
    const i = [];
    if (o && e._type !== se.tablecell && (typeof e.text > "u" || e.text === null)) return "";
    let n = e._type === se.tablecell ? "<a:txBody>" : "<p:txBody>";
    n += Ja(e), o.h === 0 && o.line && o.align ? n += '<a:lstStyle><a:lvl1pPr algn="l"/></a:lstStyle>' : e._type === "placeholder" ? n += `<a:lstStyle>${Vt(e, true)}</a:lstStyle>` : n += "<a:lstStyle/>", typeof e.text == "string" || typeof e.text == "number" ? t.push({
      text: e.text.toString(),
      options: o || {}
    }) : e.text && !Array.isArray(e.text) && typeof e.text == "object" && Object.keys(e.text).includes("text") ? t.push({
      text: e.text || "",
      options: e.options || {}
    }) : Array.isArray(e.text) && (t = e.text.map((c) => ({
      text: c.text,
      options: c.options
    }))), t.forEach((c, s) => {
      c.text || (c.text = ""), c.options = c.options || o || {}, s === 0 && c.options && !c.options.bullet && o.bullet && (c.options.bullet = o.bullet), (typeof c.text == "string" || typeof c.text == "number") && (c.text = c.text.toString().replace(/\r*\n/g, Ce)), c.text.includes(Ce) && c.text.match(/\n$/g) === null ? c.text.split(Ce).forEach((a) => {
        c.options.breakLine = true, i.push({
          text: a,
          options: c.options
        });
      }) : i.push(c);
    });
    const A = [];
    let l = [];
    return i.forEach((c, s) => {
      l.length > 0 && (c.options.align || o.align) ? c.options.align !== i[s - 1].options.align && (A.push(l), l = []) : l.length > 0 && c.options.bullet && l.length > 0 && (A.push(l), l = [], c.options.breakLine = false), l.push(c), l.length > 0 && c.options.breakLine && s + 1 < i.length && (A.push(l), l = []), s + 1 === i.length && A.push(l);
    }), A.forEach((c) => {
      var s;
      let a = false;
      n += "<a:p>";
      let r = `<a:pPr ${!((s = c[0].options) === null || s === void 0) && s.rtlMode ? ' rtl="1" ' : ""}`;
      c.forEach((f, g) => {
        f.options._lineIdx = g, g > 0 && f.options.softBreakBefore && (n += "<a:br/>"), f.options.align = f.options.align || o.align, f.options.lineSpacing = f.options.lineSpacing || o.lineSpacing, f.options.lineSpacingMultiple = f.options.lineSpacingMultiple || o.lineSpacingMultiple, f.options.indentLevel = f.options.indentLevel || o.indentLevel, f.options.paraSpaceBefore = f.options.paraSpaceBefore || o.paraSpaceBefore, f.options.paraSpaceAfter = f.options.paraSpaceAfter || o.paraSpaceAfter, r = Vt(f, false), n += r.replace("<a:pPr></a:pPr>", ""), Object.entries(o).filter(([d]) => !(f.options.hyperlink && d === "color")).forEach(([d, m]) => {
          d !== "bullet" && !f.options[d] && (f.options[d] = m);
        }), n += Va(f), (!f.text && o.fontSize || f.options.fontSize) && (a = true, o.fontSize = o.fontSize || f.options.fontSize);
      }), e._type === se.tablecell && (o.fontSize || o.fontFace) ? o.fontFace ? (n += `<a:endParaRPr lang="${o.lang || "en-US"}"` + (o.fontSize ? ` sz="${Math.round(o.fontSize * 100)}"` : "") + ' dirty="0">', n += `<a:latin typeface="${o.fontFace}" charset="0"/>`, n += `<a:ea typeface="${o.fontFace}" charset="0"/>`, n += `<a:cs typeface="${o.fontFace}" charset="0"/>`, n += "</a:endParaRPr>") : n += `<a:endParaRPr lang="${o.lang || "en-US"}"` + (o.fontSize ? ` sz="${Math.round(o.fontSize * 100)}"` : "") + ' dirty="0"/>' : a ? n += `<a:endParaRPr lang="${o.lang || "en-US"}"` + (o.fontSize ? ` sz="${Math.round(o.fontSize * 100)}"` : "") + ' dirty="0"/>' : n += `<a:endParaRPr lang="${o.lang || "en-US"}" dirty="0"/>`, n += "</a:p>";
    }), n.indexOf("<a:p>") === -1 && (n += "<a:p><a:endParaRPr/></a:p>"), n += e._type === se.tablecell ? "</a:txBody>" : "</p:txBody>", n;
  }
  function lt(e) {
    var o, t;
    if (!e) return "";
    const i = !((o = e.options) === null || o === void 0) && o._placeholderIdx ? e.options._placeholderIdx : "", n = !((t = e.options) === null || t === void 0) && t._placeholderType ? e.options._placeholderType : "", A = n && at[n] ? at[n].toString() : "";
    return `<p:ph
		${i ? ' idx="' + i.toString() + '"' : ""}
		${A && at[A] ? ` type="${A}"` : ""}
		${e.text && e.text.length > 0 ? ' hasCustomPrompt="1"' : ""}
		/>`;
  }
  function Ya(e, o, t) {
    let i = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + Ce;
    return i += '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">', i += '<Default Extension="xml" ContentType="application/xml"/>', i += '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', i += '<Default Extension="jpeg" ContentType="image/jpeg"/>', i += '<Default Extension="jpg" ContentType="image/jpg"/>', i += '<Default Extension="svg" ContentType="image/svg+xml"/>', i += '<Default Extension="png" ContentType="image/png"/>', i += '<Default Extension="gif" ContentType="image/gif"/>', i += '<Default Extension="m4v" ContentType="video/mp4"/>', i += '<Default Extension="mp4" ContentType="video/mp4"/>', e.forEach((n) => {
      (n._relsMedia || []).forEach((A) => {
        A.type !== "image" && A.type !== "online" && A.type !== "chart" && A.extn !== "m4v" && !i.includes(A.type) && (i += '<Default Extension="' + A.extn + '" ContentType="' + A.type + '"/>');
      });
    }), i += '<Default Extension="vml" ContentType="application/vnd.openxmlformats-officedocument.vmlDrawing"/>', i += '<Default Extension="xlsx" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>', i += '<Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>', i += '<Override PartName="/ppt/notesMasters/notesMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml"/>', e.forEach((n, A) => {
      i += `<Override PartName="/ppt/slideMasters/slideMaster${A + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>`, i += `<Override PartName="/ppt/slides/slide${A + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`, n._relsChart.forEach((l) => {
        i += `<Override PartName="${l.Target}" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>`;
      });
    }), i += '<Override PartName="/ppt/presProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presProps+xml"/>', i += '<Override PartName="/ppt/viewProps.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml"/>', i += '<Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>', i += '<Override PartName="/ppt/tableStyles.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"/>', o.forEach((n, A) => {
      i += `<Override PartName="/ppt/slideLayouts/slideLayout${A + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>`, (n._relsChart || []).forEach((l) => {
        i += ' <Override PartName="' + l.Target + '" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>';
      });
    }), e.forEach((n, A) => {
      i += `<Override PartName="/ppt/notesSlides/notesSlide${A + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml"/>`;
    }), t._relsChart.forEach((n) => {
      i += ' <Override PartName="' + n.Target + '" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/>';
    }), t._relsMedia.forEach((n) => {
      n.type !== "image" && n.type !== "online" && n.type !== "chart" && n.extn !== "m4v" && !i.includes(n.type) && (i += ' <Default Extension="' + n.extn + '" ContentType="' + n.type + '"/>');
    }), i += ' <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>', i += ' <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>', i += "</Types>", i;
  }
  function ja() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
		<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
		<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
		<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
		</Relationships>`;
  }
  function Ha(e, o) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
	<TotalTime>0</TotalTime>
	<Words>0</Words>
	<Application>Microsoft Office PowerPoint</Application>
	<PresentationFormat>On-screen Show (16:9)</PresentationFormat>
	<Paragraphs>0</Paragraphs>
	<Slides>${e.length}</Slides>
	<Notes>${e.length}</Notes>
	<HiddenSlides>0</HiddenSlides>
	<MMClips>0</MMClips>
	<ScaleCrop>false</ScaleCrop>
	<HeadingPairs>
		<vt:vector size="6" baseType="variant">
			<vt:variant><vt:lpstr>Fonts Used</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>2</vt:i4></vt:variant>
			<vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>1</vt:i4></vt:variant>
			<vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant>
			<vt:variant><vt:i4>${e.length}</vt:i4></vt:variant>
		</vt:vector>
	</HeadingPairs>
	<TitlesOfParts>
		<vt:vector size="${e.length + 1 + 2}" baseType="lpstr">
			<vt:lpstr>Arial</vt:lpstr>
			<vt:lpstr>Calibri</vt:lpstr>
			<vt:lpstr>Office Theme</vt:lpstr>
			${e.map((t, i) => `<vt:lpstr>Slide ${i + 1}</vt:lpstr>`).join("")}
		</vt:vector>
	</TitlesOfParts>
	<Company>${o}</Company>
	<LinksUpToDate>false</LinksUpToDate>
	<SharedDoc>false</SharedDoc>
	<HyperlinksChanged>false</HyperlinksChanged>
	<AppVersion>16.0000</AppVersion>
	</Properties>`;
  }
  function Ka(e, o, t, i) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
	<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		<dc:title>${ie(e)}</dc:title>
		<dc:subject>${ie(o)}</dc:subject>
		<dc:creator>${ie(t)}</dc:creator>
		<cp:lastModifiedBy>${ie(t)}</cp:lastModifiedBy>
		<cp:revision>${i}</cp:revision>
		<dcterms:created xsi:type="dcterms:W3CDTF">${(/* @__PURE__ */ new Date()).toISOString().replace(/\.\d\d\dZ/, "Z")}</dcterms:created>
		<dcterms:modified xsi:type="dcterms:W3CDTF">${(/* @__PURE__ */ new Date()).toISOString().replace(/\.\d\d\dZ/, "Z")}</dcterms:modified>
	</cp:coreProperties>`;
  }
  function Za(e) {
    let o = 1, t = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + Ce;
    t += '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">', t += '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>';
    for (let i = 1; i <= e.length; i++) t += `<Relationship Id="rId${++o}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`;
    return o++, t += `<Relationship Id="rId${o + 0}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="notesMasters/notesMaster1.xml"/><Relationship Id="rId${o + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps" Target="presProps.xml"/><Relationship Id="rId${o + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps" Target="viewProps.xml"/><Relationship Id="rId${o + 3}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="theme/theme1.xml"/><Relationship Id="rId${o + 4}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles" Target="tableStyles.xml"/></Relationships>`, t;
  }
  function $a(e) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"${(e == null ? void 0 : e.hidden) ? ' show="0"' : ""}>${It(e)}<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sld>`;
  }
  function er(e) {
    let o = "";
    return e._slideObjects.forEach((t) => {
      t._type === se.notes && (o += (t == null ? void 0 : t.text) && t.text[0] ? t.text[0].text : "");
    }), o.replace(/\r*\n/g, Ce);
  }
  function tr() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:notesMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:bg><p:bgRef idx="1001"><a:schemeClr val="bg1"/></p:bgRef></p:bg><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Header Placeholder 1"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="hdr" sz="quarter"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="2971800" cy="458788"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/><a:lstStyle><a:lvl1pPr algn="l"><a:defRPr sz="1200"/></a:lvl1pPr></a:lstStyle><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Date Placeholder 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="dt" idx="1"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="3884613" y="0"/><a:ext cx="2971800" cy="458788"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/><a:lstStyle><a:lvl1pPr algn="r"><a:defRPr sz="1200"/></a:lvl1pPr></a:lstStyle><a:p><a:fld id="{5282F153-3F37-0F45-9E97-73ACFA13230C}" type="datetimeFigureOut"><a:rPr lang="en-US"/><a:t>7/23/19</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="4" name="Slide Image Placeholder 3"/><p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldImg" idx="2"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="685800" y="1143000"/><a:ext cx="5486400" cy="3086100"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/><a:ln w="12700"><a:solidFill><a:prstClr val="black"/></a:solidFill></a:ln></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="ctr"/><a:lstStyle/><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="5" name="Notes Placeholder 4"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" sz="quarter" idx="3"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="685800" y="4400550"/><a:ext cx="5486400" cy="3600450"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0"/><a:lstStyle/><a:p><a:pPr lvl="0"/><a:r><a:rPr lang="en-US"/><a:t>Click to edit Master text styles</a:t></a:r></a:p><a:p><a:pPr lvl="1"/><a:r><a:rPr lang="en-US"/><a:t>Second level</a:t></a:r></a:p><a:p><a:pPr lvl="2"/><a:r><a:rPr lang="en-US"/><a:t>Third level</a:t></a:r></a:p><a:p><a:pPr lvl="3"/><a:r><a:rPr lang="en-US"/><a:t>Fourth level</a:t></a:r></a:p><a:p><a:pPr lvl="4"/><a:r><a:rPr lang="en-US"/><a:t>Fifth level</a:t></a:r></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="6" name="Footer Placeholder 5"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="ftr" sz="quarter" idx="4"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="0" y="8685213"/><a:ext cx="2971800" cy="458787"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="b"/><a:lstStyle><a:lvl1pPr algn="l"><a:defRPr sz="1200"/></a:lvl1pPr></a:lstStyle><a:p><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="7" name="Slide Number Placeholder 6"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldNum" sz="quarter" idx="5"/></p:nvPr></p:nvSpPr><p:spPr><a:xfrm><a:off x="3884613" y="8685213"/><a:ext cx="2971800" cy="458787"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr vert="horz" lIns="91440" tIns="45720" rIns="91440" bIns="45720" rtlCol="0" anchor="b"/><a:lstStyle><a:lvl1pPr algn="r"><a:defRPr sz="1200"/></a:lvl1pPr></a:lstStyle><a:p><a:fld id="{CE5E9CC1-C706-0F49-92D6-E571CC5EEA8F}" type="slidenum"><a:rPr lang="en-US"/><a:t>\u2039#\u203A</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp></p:spTree><p:extLst><p:ext uri="{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}"><p14:creationId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1024086991"/></p:ext></p:extLst></p:cSld><p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/><p:notesStyle><a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr><a:lvl2pPr marL="457200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl2pPr><a:lvl3pPr marL="914400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl3pPr><a:lvl4pPr marL="1371600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl4pPr><a:lvl5pPr marL="1828800" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl5pPr><a:lvl6pPr marL="2286000" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl6pPr><a:lvl7pPr marL="2743200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl7pPr><a:lvl8pPr marL="3200400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl8pPr><a:lvl9pPr marL="3657600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl9pPr></p:notesStyle></p:notesMaster>`;
  }
  function ar(e) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Slide Image Placeholder 1"/><p:cNvSpPr><a:spLocks noGrp="1" noRot="1" noChangeAspect="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldImg"/></p:nvPr></p:nvSpPr><p:spPr/></p:sp><p:sp><p:nvSpPr><p:cNvPr id="3" name="Notes Placeholder 2"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="body" idx="1"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" dirty="0"/><a:t>${ie(er(e))}</a:t></a:r><a:endParaRPr lang="en-US" dirty="0"/></a:p></p:txBody></p:sp><p:sp><p:nvSpPr><p:cNvPr id="4" name="Slide Number Placeholder 3"/><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="sldNum" sz="quarter" idx="10"/></p:nvPr></p:nvSpPr><p:spPr/><p:txBody><a:bodyPr/><a:lstStyle/><a:p><a:fld id="${ea}" type="slidenum"><a:rPr lang="en-US"/><a:t>${e._slideNum}</a:t></a:fld><a:endParaRPr lang="en-US"/></a:p></p:txBody></p:sp></p:spTree><p:extLst><p:ext uri="{BB962C8B-B14F-4D97-AF65-F5344CB8AC3E}"><p14:creationId xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main" val="1024086991"/></p:ext></p:extLst></p:cSld><p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:notes>`;
  }
  function rr(e) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
		<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" preserve="1">
		${It(e)}
		<p:clrMapOvr><a:masterClrMapping/></p:clrMapOvr></p:sldLayout>`;
  }
  function nr(e, o) {
    const t = o.map((n, A) => `<p:sldLayoutId id="${Ba + A}" r:id="rId${e._rels.length + A + 1}"/>`);
    let i = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + Ce;
    return i += '<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">', i += It(e), i += '<p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>', i += "<p:sldLayoutIdLst>" + t.join("") + "</p:sldLayoutIdLst>", i += '<p:hf sldNum="0" hdr="0" ftr="0" dt="0"/>', i += '<p:txStyles> <p:titleStyle>  <a:lvl1pPr algn="ctr" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="0"/></a:spcBef><a:buNone/><a:defRPr sz="4400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mj-lt"/><a:ea typeface="+mj-ea"/><a:cs typeface="+mj-cs"/></a:defRPr></a:lvl1pPr> </p:titleStyle> <p:bodyStyle>  <a:lvl1pPr marL="342900" indent="-342900" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="3200" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr>  <a:lvl2pPr marL="742950" indent="-285750" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2013"/><a:defRPr sz="2800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl2pPr>  <a:lvl3pPr marL="1143000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="2400" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl3pPr>  <a:lvl4pPr marL="1600200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2013"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl4pPr>  <a:lvl5pPr marL="2057400" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\xBB"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl5pPr>  <a:lvl6pPr marL="2514600" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl6pPr>  <a:lvl7pPr marL="2971800" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl7pPr>  <a:lvl8pPr marL="3429000" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl8pPr>  <a:lvl9pPr marL="3886200" indent="-228600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:spcBef><a:spcPct val="20000"/></a:spcBef><a:buFont typeface="Arial" pitchFamily="34" charset="0"/><a:buChar char="\u2022"/><a:defRPr sz="2000" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl9pPr> </p:bodyStyle> <p:otherStyle>  <a:defPPr><a:defRPr lang="en-US"/></a:defPPr>  <a:lvl1pPr marL="0" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl1pPr>  <a:lvl2pPr marL="457200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl2pPr>  <a:lvl3pPr marL="914400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl3pPr>  <a:lvl4pPr marL="1371600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl4pPr>  <a:lvl5pPr marL="1828800" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl5pPr>  <a:lvl6pPr marL="2286000" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl6pPr>  <a:lvl7pPr marL="2743200" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl7pPr>  <a:lvl8pPr marL="3200400" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl8pPr>  <a:lvl9pPr marL="3657600" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl9pPr> </p:otherStyle></p:txStyles>', i += "</p:sldMaster>", i;
  }
  function or(e, o) {
    return Mt(o[e - 1], [
      {
        target: "../slideMasters/slideMaster1.xml",
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster"
      }
    ]);
  }
  function ir(e, o, t) {
    return Mt(e[t - 1], [
      {
        target: `../slideLayouts/slideLayout${cr(e, o, t)}.xml`,
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout"
      },
      {
        target: `../notesSlides/notesSlide${t}.xml`,
        type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide"
      }
    ]);
  }
  function sr(e) {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
		<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
			<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster" Target="../notesMasters/notesMaster1.xml"/>
			<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="../slides/slide${e}.xml"/>
		</Relationships>`;
  }
  function Ar(e, o) {
    const t = o.map((i, n) => ({
      target: `../slideLayouts/slideLayout${n + 1}.xml`,
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout"
    }));
    return t.push({
      target: "../theme/theme1.xml",
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme"
    }), Mt(e, t);
  }
  function lr() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
		<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
		</Relationships>`;
  }
  function cr(e, o, t) {
    for (let i = 0; i < o.length; i++) if (o[i]._name === e[t - 1]._slideLayout._name) return i + 1;
    return 1;
  }
  function dr(e) {
    var o, t, i, n;
    const A = !((o = e.theme) === null || o === void 0) && o.headFontFace ? `<a:latin typeface="${(t = e.theme) === null || t === void 0 ? void 0 : t.headFontFace}"/>` : '<a:latin typeface="Calibri Light" panose="020F0302020204030204"/>', l = !((i = e.theme) === null || i === void 0) && i.bodyFontFace ? `<a:latin typeface="${(n = e.theme) === null || n === void 0 ? void 0 : n.bodyFontFace}"/>` : '<a:latin typeface="Calibri" panose="020F0502020204030204"/>';
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="Office Theme"><a:themeElements><a:clrScheme name="Office"><a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1><a:dk2><a:srgbClr val="44546A"/></a:dk2><a:lt2><a:srgbClr val="E7E6E6"/></a:lt2><a:accent1><a:srgbClr val="4472C4"/></a:accent1><a:accent2><a:srgbClr val="ED7D31"/></a:accent2><a:accent3><a:srgbClr val="A5A5A5"/></a:accent3><a:accent4><a:srgbClr val="FFC000"/></a:accent4><a:accent5><a:srgbClr val="5B9BD5"/></a:accent5><a:accent6><a:srgbClr val="70AD47"/></a:accent6><a:hlink><a:srgbClr val="0563C1"/></a:hlink><a:folHlink><a:srgbClr val="954F72"/></a:folHlink></a:clrScheme><a:fontScheme name="Office"><a:majorFont>${A}<a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="\u6E38\u30B4\u30B7\u30C3\u30AF Light"/><a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/><a:font script="Hans" typeface="\u7B49\u7EBF Light"/><a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/><a:font script="Arab" typeface="Times New Roman"/><a:font script="Hebr" typeface="Times New Roman"/><a:font script="Thai" typeface="Angsana New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="MoolBoran"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Times New Roman"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:majorFont><a:minorFont>${l}<a:ea typeface=""/><a:cs typeface=""/><a:font script="Jpan" typeface="\u6E38\u30B4\u30B7\u30C3\u30AF"/><a:font script="Hang" typeface="\uB9D1\uC740 \uACE0\uB515"/><a:font script="Hans" typeface="\u7B49\u7EBF"/><a:font script="Hant" typeface="\u65B0\u7D30\u660E\u9AD4"/><a:font script="Arab" typeface="Arial"/><a:font script="Hebr" typeface="Arial"/><a:font script="Thai" typeface="Cordia New"/><a:font script="Ethi" typeface="Nyala"/><a:font script="Beng" typeface="Vrinda"/><a:font script="Gujr" typeface="Shruti"/><a:font script="Khmr" typeface="DaunPenh"/><a:font script="Knda" typeface="Tunga"/><a:font script="Guru" typeface="Raavi"/><a:font script="Cans" typeface="Euphemia"/><a:font script="Cher" typeface="Plantagenet Cherokee"/><a:font script="Yiii" typeface="Microsoft Yi Baiti"/><a:font script="Tibt" typeface="Microsoft Himalaya"/><a:font script="Thaa" typeface="MV Boli"/><a:font script="Deva" typeface="Mangal"/><a:font script="Telu" typeface="Gautami"/><a:font script="Taml" typeface="Latha"/><a:font script="Syrc" typeface="Estrangelo Edessa"/><a:font script="Orya" typeface="Kalinga"/><a:font script="Mlym" typeface="Kartika"/><a:font script="Laoo" typeface="DokChampa"/><a:font script="Sinh" typeface="Iskoola Pota"/><a:font script="Mong" typeface="Mongolian Baiti"/><a:font script="Viet" typeface="Arial"/><a:font script="Uigh" typeface="Microsoft Uighur"/><a:font script="Geor" typeface="Sylfaen"/><a:font script="Armn" typeface="Arial"/><a:font script="Bugi" typeface="Leelawadee UI"/><a:font script="Bopo" typeface="Microsoft JhengHei"/><a:font script="Java" typeface="Javanese Text"/><a:font script="Lisu" typeface="Segoe UI"/><a:font script="Mymr" typeface="Myanmar Text"/><a:font script="Nkoo" typeface="Ebrima"/><a:font script="Olck" typeface="Nirmala UI"/><a:font script="Osma" typeface="Ebrima"/><a:font script="Phag" typeface="Phagspa"/><a:font script="Syrn" typeface="Estrangelo Edessa"/><a:font script="Syrj" typeface="Estrangelo Edessa"/><a:font script="Syre" typeface="Estrangelo Edessa"/><a:font script="Sora" typeface="Nirmala UI"/><a:font script="Tale" typeface="Microsoft Tai Le"/><a:font script="Talu" typeface="Microsoft New Tai Lue"/><a:font script="Tfng" typeface="Ebrima"/></a:minorFont></a:fontScheme><a:fmtScheme name="Office"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:lumMod val="110000"/><a:satMod val="105000"/><a:tint val="67000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="103000"/><a:tint val="73000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="105000"/><a:satMod val="109000"/><a:tint val="81000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:satMod val="103000"/><a:lumMod val="102000"/><a:tint val="94000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:satMod val="110000"/><a:lumMod val="100000"/><a:shade val="100000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:lumMod val="99000"/><a:satMod val="120000"/><a:shade val="78000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:fillStyleLst><a:lnStyleLst><a:ln w="6350" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="12700" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln><a:ln w="19050" cap="flat" cmpd="sng" algn="ctr"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:prstDash val="solid"/><a:miter lim="800000"/></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst/></a:effectStyle><a:effectStyle><a:effectLst><a:outerShdw blurRad="57150" dist="19050" dir="5400000" algn="ctr" rotWithShape="0"><a:srgbClr val="000000"><a:alpha val="63000"/></a:srgbClr></a:outerShdw></a:effectLst></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill><a:solidFill><a:schemeClr val="phClr"><a:tint val="95000"/><a:satMod val="170000"/></a:schemeClr></a:solidFill><a:gradFill rotWithShape="1"><a:gsLst><a:gs pos="0"><a:schemeClr val="phClr"><a:tint val="93000"/><a:satMod val="150000"/><a:shade val="98000"/><a:lumMod val="102000"/></a:schemeClr></a:gs><a:gs pos="50000"><a:schemeClr val="phClr"><a:tint val="98000"/><a:satMod val="130000"/><a:shade val="90000"/><a:lumMod val="103000"/></a:schemeClr></a:gs><a:gs pos="100000"><a:schemeClr val="phClr"><a:shade val="63000"/><a:satMod val="120000"/></a:schemeClr></a:gs></a:gsLst><a:lin ang="5400000" scaled="0"/></a:gradFill></a:bgFillStyleLst></a:fmtScheme></a:themeElements><a:objectDefaults/><a:extraClrSchemeLst/><a:extLst><a:ext uri="{05A4C25C-085E-4340-85A3-A5531E510DB2}"><thm15:themeFamily xmlns:thm15="http://schemas.microsoft.com/office/thememl/2012/main" name="Office Theme" id="{62F939B6-93AF-4DB8-9C6B-D6C7DFDC589F}" vid="{4A3C46E8-61CC-4603-A589-7422A47A8E4A}"/></a:ext></a:extLst></a:theme>`;
  }
  function fr(e) {
    let o = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" ${e.rtlMode ? 'rtl="1"' : ""} saveSubsetFonts="1" autoCompressPictures="0">`;
    o += '<p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>', o += "<p:sldIdLst>", e.slides.forEach((t) => o += `<p:sldId id="${t._slideId}" r:id="rId${t._rId}"/>`), o += "</p:sldIdLst>", o += `<p:notesMasterIdLst><p:notesMasterId r:id="rId${e.slides.length + 2}"/></p:notesMasterIdLst>`, o += `<p:sldSz cx="${e.presLayout.width}" cy="${e.presLayout.height}"/>`, o += `<p:notesSz cx="${e.presLayout.height}" cy="${e.presLayout.width}"/>`, o += "<p:defaultTextStyle>";
    for (let t = 1; t < 10; t++) o += `<a:lvl${t}pPr marL="${(t - 1) * 457200}" algn="l" defTabSz="914400" rtl="0" eaLnBrk="1" latinLnBrk="0" hangingPunct="1"><a:defRPr sz="1800" kern="1200"><a:solidFill><a:schemeClr val="tx1"/></a:solidFill><a:latin typeface="+mn-lt"/><a:ea typeface="+mn-ea"/><a:cs typeface="+mn-cs"/></a:defRPr></a:lvl${t}pPr>`;
    return o += "</p:defaultTextStyle>", e.sections && e.sections.length > 0 && (o += '<p:extLst><p:ext uri="{521415D9-36F7-43E2-AB2F-B90AF26B5E84}">', o += '<p14:sectionLst xmlns:p14="http://schemas.microsoft.com/office/powerpoint/2010/main">', e.sections.forEach((t) => {
      o += `<p14:section name="${ie(t.title)}" id="{${ft("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")}}"><p14:sldIdLst>`, t._slides.forEach((i) => o += `<p14:sldId id="${i._slideId}"/>`), o += "</p14:sldIdLst></p14:section>";
    }), o += "</p14:sectionLst></p:ext>", o += '<p:ext uri="{EFAFB233-063F-42B5-8137-9DF3F51BA10A}"><p15:sldGuideLst xmlns:p15="http://schemas.microsoft.com/office/powerpoint/2012/main"/></p:ext>', o += "</p:extLst>"), o += "</p:presentation>", o;
  }
  function pr() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:presentationPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"/>`;
  }
  function ur() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<a:tblStyleLst xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" def="{5C22544A-7EE6-4342-B048-85BDC9FD1C3A}"/>`;
  }
  function hr() {
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${Ce}<p:viewPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"><p:normalViewPr horzBarState="maximized"><p:restoredLeft sz="15611"/><p:restoredTop sz="94610"/></p:normalViewPr><p:slideViewPr><p:cSldViewPr snapToGrid="0" snapToObjects="1"><p:cViewPr varScale="1"><p:scale><a:sx n="136" d="100"/><a:sy n="136" d="100"/></p:scale><p:origin x="216" y="312"/></p:cViewPr><p:guideLst/></p:cSldViewPr></p:slideViewPr><p:notesTextViewPr><p:cViewPr><p:scale><a:sx n="1" d="1"/><a:sy n="1" d="1"/></p:scale><p:origin x="0" y="0"/></p:cViewPr></p:notesTextViewPr><p:gridSpacing cx="76200" cy="76200"/></p:viewPr>`;
  }
  const mr = "4.0.1";
  class gr {
    set layout(o) {
      const t = this.LAYOUTS[o];
      if (t) this._layout = o, this._presLayout = t;
      else throw new Error("UNKNOWN-LAYOUT");
    }
    get layout() {
      return this._layout;
    }
    get version() {
      return this._version;
    }
    set author(o) {
      this._author = o;
    }
    get author() {
      return this._author;
    }
    set company(o) {
      this._company = o;
    }
    get company() {
      return this._company;
    }
    set revision(o) {
      this._revision = o;
    }
    get revision() {
      return this._revision;
    }
    set subject(o) {
      this._subject = o;
    }
    get subject() {
      return this._subject;
    }
    set theme(o) {
      this._theme = o;
    }
    get theme() {
      return this._theme;
    }
    set title(o) {
      this._title = o;
    }
    get title() {
      return this._title;
    }
    set rtlMode(o) {
      this._rtlMode = o;
    }
    get rtlMode() {
      return this._rtlMode;
    }
    get masterSlide() {
      return this._masterSlide;
    }
    get slides() {
      return this._slides;
    }
    get sections() {
      return this._sections;
    }
    get slideLayouts() {
      return this._slideLayouts;
    }
    get AlignH() {
      return this._alignH;
    }
    get AlignV() {
      return this._alignV;
    }
    get ChartType() {
      return this._chartType;
    }
    get OutputType() {
      return this._outputType;
    }
    get presLayout() {
      return this._presLayout;
    }
    get SchemeColor() {
      return this._schemeColor;
    }
    get ShapeType() {
      return this._shapeType;
    }
    get charts() {
      return this._charts;
    }
    get colors() {
      return this._colors;
    }
    get shapes() {
      return this._shapes;
    }
    constructor() {
      this._version = mr, this._alignH = _t, this._alignV = Rt, this._chartType = Ft, this._outputType = Pt, this._schemeColor = Be, this._shapeType = Nt, this._charts = W, this._colors = ut, this._shapes = Ee, this.addNewSlide = (A) => {
        const l = this.sections.length > 0 && this.sections[this.sections.length - 1]._slides.filter((c) => c._slideNum === this.slides[this.slides.length - 1]._slideNum).length > 0;
        return A.sectionTitle = l ? this.sections[this.sections.length - 1].title : null, this.addSlide(A);
      }, this.getSlide = (A) => this.slides.filter((l) => l._slideNum === A)[0], this.setSlideNumber = (A) => {
        this.masterSlide._slideNumberProps = A, this.slideLayouts.filter((l) => l._name === kt)[0]._slideNumberProps = A;
      }, this.createChartMediaRels = (A, l, c) => {
        A._relsChart.forEach((s) => c.push(Qa(s, l))), A._relsMedia.forEach((s) => {
          if (s.type !== "online" && s.type !== "hyperlink") {
            let a = s.data && typeof s.data == "string" ? s.data : "";
            !a.includes(",") && !a.includes(";") ? a = "image/png;base64," + a : a.includes(",") ? a.includes(";") || (a = "image/png;" + a) : a = "image/png;base64," + a, l.file(s.Target.replace("..", "ppt"), a.split(",").pop(), {
              base64: true
            });
          }
        });
      }, this.writeFileToBrowser = (A, l) => ke(this, void 0, void 0, function* () {
        const c = document.createElement("a");
        if (c.setAttribute("style", "display:none;"), c.dataset.interception = "off", document.body.appendChild(c), window.URL.createObjectURL) {
          const s = window.URL.createObjectURL(new Blob([
            l
          ], {
            type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
          }));
          return c.href = s, c.download = A, c.click(), setTimeout(() => {
            window.URL.revokeObjectURL(s), document.body.removeChild(c);
          }, 100), yield Promise.resolve(A);
        }
      }), this.exportPresentation = (A) => ke(this, void 0, void 0, function* () {
        const l = [];
        let c = [];
        const s = new Ht();
        return this.slides.forEach((a) => {
          c = c.concat(Lt(a));
        }), this.slideLayouts.forEach((a) => {
          c = c.concat(Lt(a));
        }), c = c.concat(Lt(this.masterSlide)), yield Promise.all(c).then(() => ke(this, void 0, void 0, function* () {
          return this.slides.forEach((a) => {
            a._slideLayout && Xa(a);
          }), s.folder("_rels"), s.folder("docProps"), s.folder("ppt").folder("_rels"), s.folder("ppt/charts").folder("_rels"), s.folder("ppt/embeddings"), s.folder("ppt/media"), s.folder("ppt/slideLayouts").folder("_rels"), s.folder("ppt/slideMasters").folder("_rels"), s.folder("ppt/slides").folder("_rels"), s.folder("ppt/theme"), s.folder("ppt/notesMasters").folder("_rels"), s.folder("ppt/notesSlides").folder("_rels"), s.file("[Content_Types].xml", Ya(this.slides, this.slideLayouts, this.masterSlide)), s.file("_rels/.rels", ja()), s.file("docProps/app.xml", Ha(this.slides, this.company)), s.file("docProps/core.xml", Ka(this.title, this.subject, this.author, this.revision)), s.file("ppt/_rels/presentation.xml.rels", Za(this.slides)), s.file("ppt/theme/theme1.xml", dr(this)), s.file("ppt/presentation.xml", fr(this)), s.file("ppt/presProps.xml", pr()), s.file("ppt/tableStyles.xml", ur()), s.file("ppt/viewProps.xml", hr()), this.slideLayouts.forEach((a, r) => {
            s.file(`ppt/slideLayouts/slideLayout${r + 1}.xml`, rr(a)), s.file(`ppt/slideLayouts/_rels/slideLayout${r + 1}.xml.rels`, or(r + 1, this.slideLayouts));
          }), this.slides.forEach((a, r) => {
            s.file(`ppt/slides/slide${r + 1}.xml`, $a(a)), s.file(`ppt/slides/_rels/slide${r + 1}.xml.rels`, ir(this.slides, this.slideLayouts, r + 1)), s.file(`ppt/notesSlides/notesSlide${r + 1}.xml`, ar(a)), s.file(`ppt/notesSlides/_rels/notesSlide${r + 1}.xml.rels`, sr(r + 1));
          }), s.file("ppt/slideMasters/slideMaster1.xml", nr(this.masterSlide, this.slideLayouts)), s.file("ppt/slideMasters/_rels/slideMaster1.xml.rels", Ar(this.masterSlide, this.slideLayouts)), s.file("ppt/notesMasters/notesMaster1.xml", tr()), s.file("ppt/notesMasters/_rels/notesMaster1.xml.rels", lr()), this.slideLayouts.forEach((a) => {
            this.createChartMediaRels(a, s, l);
          }), this.slides.forEach((a) => {
            this.createChartMediaRels(a, s, l);
          }), this.createChartMediaRels(this.masterSlide, s, l), yield Promise.all(l).then(() => ke(this, void 0, void 0, function* () {
            return A.outputType === "STREAM" ? yield s.generateAsync({
              type: "nodebuffer",
              compression: A.compression ? "DEFLATE" : "STORE"
            }) : A.outputType ? yield s.generateAsync({
              type: A.outputType
            }) : yield s.generateAsync({
              type: "blob",
              compression: A.compression ? "DEFLATE" : "STORE"
            });
          }));
        }));
      });
      const o = {
        name: "screen4x3",
        width: 9144e3,
        height: 6858e3
      }, t = {
        name: "screen16x9",
        width: 9144e3,
        height: 5143500
      }, i = {
        name: "screen16x10",
        width: 9144e3,
        height: 5715e3
      }, n = {
        name: "custom",
        width: 12192e3,
        height: 6858e3
      };
      this.LAYOUTS = {
        LAYOUT_4x3: o,
        LAYOUT_16x9: t,
        LAYOUT_16x10: i,
        LAYOUT_WIDE: n
      }, this._author = "PptxGenJS", this._company = "PptxGenJS", this._revision = "1", this._subject = "PptxGenJS Presentation", this._title = "PptxGenJS Presentation", this._presLayout = {
        name: this.LAYOUTS[Oe].name,
        _sizeW: this.LAYOUTS[Oe].width,
        _sizeH: this.LAYOUTS[Oe].height,
        width: this.LAYOUTS[Oe].width,
        height: this.LAYOUTS[Oe].height
      }, this._rtlMode = false, this._slideLayouts = [
        {
          _margin: rt,
          _name: kt,
          _presLayout: this._presLayout,
          _rels: [],
          _relsChart: [],
          _relsMedia: [],
          _slide: null,
          _slideNum: 1e3,
          _slideNumberProps: null,
          _slideObjects: []
        }
      ], this._slides = [], this._sections = [], this._masterSlide = {
        addChart: null,
        addImage: null,
        addMedia: null,
        addNotes: null,
        addShape: null,
        addTable: null,
        addText: null,
        _name: null,
        _presLayout: this._presLayout,
        _rId: null,
        _rels: [],
        _relsChart: [],
        _relsMedia: [],
        _slideId: null,
        _slideLayout: null,
        _slideNum: null,
        _slideNumberProps: null,
        _slideObjects: []
      };
    }
    stream(o) {
      return ke(this, void 0, void 0, function* () {
        return yield this.exportPresentation({
          compression: o == null ? void 0 : o.compression,
          outputType: "STREAM"
        });
      });
    }
    write(o) {
      return ke(this, void 0, void 0, function* () {
        const t = typeof o == "object" && (o == null ? void 0 : o.outputType) ? o.outputType : o || null, i = typeof o == "object" && (o == null ? void 0 : o.compression) ? o.compression : false;
        return yield this.exportPresentation({
          compression: i,
          outputType: t
        });
      });
    }
    writeFile(o) {
      return ke(this, void 0, void 0, function* () {
        var t, i;
        const n = typeof process < "u" && !!(!((t = process.versions) === null || t === void 0) && t.node) && ((i = process.release) === null || i === void 0 ? void 0 : i.name) === "node";
        typeof o == "string" && (console.warn("[WARNING] writeFile(string) is deprecated - pass { fileName } instead."), o = {
          fileName: o
        });
        const { fileName: A = "Presentation.pptx", compression: l = false } = o, c = A.toLowerCase().endsWith(".pptx") ? A : `${A}.pptx`, s = n ? "nodebuffer" : null, a = yield this.exportPresentation({
          compression: l,
          outputType: s
        });
        if (n) {
          const { promises: r } = yield Bt(() => import("./__vite-browser-external-BIHI7g3E.js"), []), { writeFile: f } = r;
          return yield f(c, a), c;
        }
        return yield this.writeFileToBrowser(c, a), c;
      });
    }
    addSection(o) {
      o ? o.title || console.warn("addSection requires a title") : console.warn("addSection requires an argument");
      const t = {
        _type: "user",
        _slides: [],
        title: o.title
      };
      o.order ? this.sections.splice(o.order, 0, t) : this._sections.push(t);
    }
    addSlide(o) {
      const t = typeof o == "string" ? o : (o == null ? void 0 : o.masterName) ? o.masterName : "";
      let i = {
        _name: this.LAYOUTS[Oe].name,
        _presLayout: this.presLayout,
        _rels: [],
        _relsChart: [],
        _relsMedia: [],
        _slideNum: this.slides.length + 1
      };
      if (t) {
        const A = this.slideLayouts.filter((l) => l._name === t)[0];
        A && (i = A);
      }
      const n = new Ga({
        addSlide: this.addNewSlide,
        getSlide: this.getSlide,
        presLayout: this.presLayout,
        setSlideNum: this.setSlideNumber,
        slideId: this.slides.length + 256,
        slideRId: this.slides.length + 2,
        slideNumber: this.slides.length + 1,
        slideLayout: i
      });
      if (this._slides.push(n), o == null ? void 0 : o.sectionTitle) {
        const A = this.sections.filter((l) => l.title === o.sectionTitle)[0];
        A ? A._slides.push(n) : console.warn(`addSlide: unable to find section with title: "${o.sectionTitle}"`);
      } else if (this.sections && this.sections.length > 0 && !(o == null ? void 0 : o.sectionTitle)) {
        const A = this._sections[this.sections.length - 1];
        A._type === "default" ? A._slides.push(n) : this._sections.push({
          title: `Default-${this.sections.filter((l) => l._type === "default").length + 1}`,
          _type: "default",
          _slides: [
            n
          ]
        });
      }
      return n;
    }
    defineLayout(o) {
      o ? o.name ? o.width ? o.height ? typeof o.height != "number" ? console.warn("defineLayout `height` should be a number (inches)") : typeof o.width != "number" && console.warn("defineLayout `width` should be a number (inches)") : console.warn("defineLayout requires `height`") : console.warn("defineLayout requires `width`") : console.warn("defineLayout requires `name`") : console.warn("defineLayout requires `{name, width, height}`"), this.LAYOUTS[o.name] = {
        name: o.name,
        _sizeW: Math.round(Number(o.width) * Ae),
        _sizeH: Math.round(Number(o.height) * Ae),
        width: Math.round(Number(o.width) * Ae),
        height: Math.round(Number(o.height) * Ae)
      };
    }
    defineSlideMaster(o) {
      const t = JSON.parse(JSON.stringify(o));
      if (!t.title) throw new Error("defineSlideMaster() object argument requires a `title` value. (https://gitbrent.github.io/PptxGenJS/docs/masters.html)");
      const i = {
        _margin: t.margin || rt,
        _name: t.title,
        _presLayout: this.presLayout,
        _rels: [],
        _relsChart: [],
        _relsMedia: [],
        _slide: null,
        _slideNum: 1e3 + this.slideLayouts.length + 1,
        _slideNumberProps: t.slideNumber || null,
        _slideObjects: [],
        background: t.background || null,
        bkgd: t.bkgd || null
      };
      za(t, i), this.slideLayouts.push(i), (t.background || t.bkgd) && na(t.background, i), i._slideNumberProps && !this.masterSlide._slideNumberProps && (this.masterSlide._slideNumberProps = i._slideNumberProps);
    }
    tableToSlides(o, t = {}) {
      Ta(this, o, t, (t == null ? void 0 : t.masterSlideName) ? this.slideLayouts.filter((i) => i._name === t.masterSlideName)[0] : null);
    }
  }
  const vr = {
    cover_hero: {
      description: "Centered title cover with optional subtitle and footer line.",
      use_for: [
        "title",
        "opening"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 60
        },
        subtitle: {
          type: "string",
          required: false,
          max_chars: 120
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        accent_bar: {
          x: 0,
          y: 4.45,
          w: 10,
          h: 0.18,
          kind: "shape",
          fill: "accent"
        },
        title: {
          x: 0.6,
          y: 1.5,
          w: 8.8,
          h: 1.5,
          fontSize: 44,
          align: "center",
          bold: true,
          color: "FFFFFF"
        },
        subtitle: {
          x: 0.8,
          y: 3.1,
          w: 8.4,
          h: 0.9,
          fontSize: 18,
          align: "center",
          color: "secondary"
        },
        footer: {
          x: 0.6,
          y: 4.75,
          w: 8.8,
          h: 0.35,
          fontSize: 10,
          align: "center",
          color: "CCCCCC"
        }
      },
      bg_color: "bg_dark"
    },
    section_break: {
      description: "Dark full-bleed section divider with left accent bar.",
      use_for: [
        "chapter",
        "section"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 40
        },
        subtitle: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        accent_bar: {
          x: 0,
          y: 0,
          w: 0.15,
          h: 5.625,
          kind: "shape",
          fill: "accent"
        },
        title: {
          x: 0.6,
          y: 2,
          w: 8.8,
          h: 1.2,
          fontSize: 40,
          align: "center",
          bold: true,
          color: "FFFFFF"
        },
        subtitle: {
          x: 0.6,
          y: 3.3,
          w: 8.8,
          h: 0.6,
          fontSize: 16,
          align: "center",
          color: "CCCCCC"
        }
      },
      bg_color: "bg_dark"
    },
    bullets_dense: {
      description: "Title + accent rule + dense bullet list (5\u20138 items).",
      use_for: [
        "content",
        "findings"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 50
        },
        bullets: {
          type: "string[]",
          required: true,
          min_items: 2,
          max_items: 8,
          max_chars_per_item: 120
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        top_bar: {
          x: 0,
          y: 0,
          w: 10,
          h: 0.85,
          kind: "shape",
          fill: "primary"
        },
        title: {
          x: 0.5,
          y: 0.12,
          w: 9,
          h: 0.65,
          fontSize: 26,
          bold: true,
          color: "FFFFFF"
        },
        title_rule: {
          x: 0.6,
          y: 1.05,
          w: 1.2,
          h: 0.06,
          kind: "shape",
          fill: "accent"
        },
        bullets: {
          x: 0.7,
          y: 1.25,
          w: 8.6,
          h: 3.75,
          fontSize: 17,
          kind: "bullets",
          color: "text_dark"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9,
          color: "999999"
        }
      }
    },
    three_col_cards: {
      description: "Title + 3 equal card columns (title + body each).",
      use_for: [
        "comparison",
        "pillars",
        "features"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 50
        },
        cards: {
          type: "object[]",
          required: true,
          min_items: 2,
          max_items: 3,
          fields: {
            title: {
              type: "string",
              max_chars: 30
            },
            body: {
              type: "string",
              max_chars: 180
            }
          }
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        title: {
          x: 0.6,
          y: 0.35,
          w: 8.8,
          h: 0.75,
          fontSize: 26,
          bold: true
        },
        card_grid: {
          x: 0.6,
          y: 1.15,
          w: 8.8,
          h: 3.95,
          columns: 3,
          kind: "card_grid"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      }
    },
    stat_row: {
      description: "Optional title + up to 3 horizontal stat boxes.",
      use_for: [
        "metrics",
        "kpi",
        "data_hero"
      ],
      slots: {
        title: {
          type: "string",
          required: false,
          max_chars: 50
        },
        stats: {
          type: "object[]",
          required: true,
          min_items: 1,
          max_items: 3,
          fields: {
            value: {
              type: "string",
              max_chars: 12
            },
            label: {
              type: "string",
              max_chars: 40
            }
          }
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        title: {
          x: 0.6,
          y: 0.45,
          w: 8.8,
          h: 0.7,
          fontSize: 22,
          align: "center",
          bold: true
        },
        stat_row: {
          x: 0.6,
          y: 1.8,
          w: 8.8,
          h: 1.8,
          gap: 0.25,
          kind: "stat_row"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      }
    },
    chart_sidebar: {
      description: "Title + bar/line chart (left) + vertical stat stack (right).",
      use_for: [
        "data",
        "trends"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 50
        },
        chart: {
          type: "object",
          required: true,
          fields: {
            chartType: {
              type: "string",
              enum: [
                "BAR",
                "LINE",
                "PIE",
                "DOUGHNUT",
                "AREA"
              ]
            },
            data: {
              type: "array",
              note: "PptxGenJS chart series: [{ name, values[] }]"
            }
          }
        },
        stats: {
          type: "object[]",
          required: false,
          max_items: 3,
          fields: {
            value: {
              type: "string"
            },
            label: {
              type: "string"
            }
          }
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        title: {
          x: 0.6,
          y: 0.25,
          w: 8.8,
          h: 0.7,
          fontSize: 26,
          bold: true
        },
        chart: {
          x: 0.6,
          y: 1.1,
          w: 5.8,
          h: 3.9,
          kind: "chart"
        },
        stats: {
          x: 6.6,
          y: 1.3,
          w: 2.8,
          h: 3.5,
          kind: "stat_group"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      }
    },
    comparison_table: {
      description: "Title + 2\u20133 column comparison with header row and bullet items.",
      use_for: [
        "versus",
        "options",
        "pros_cons"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 50
        },
        columns: {
          type: "object[]",
          required: true,
          min_items: 2,
          max_items: 3,
          fields: {
            header: {
              type: "string",
              max_chars: 24
            },
            items: {
              type: "string[]",
              max_items: 6,
              max_chars_per_item: 80
            },
            header_color: {
              type: "string",
              required: false,
              note: "6-char hex, defaults to theme.primary"
            }
          }
        },
        highlight_column: {
          type: "number",
          required: false,
          note: "0-based index of recommended column"
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        title: {
          x: 0.6,
          y: 0.15,
          w: 8.8,
          h: 0.7,
          fontSize: 28,
          bold: true
        },
        comparison: {
          x: 0.6,
          y: 1,
          w: 8.8,
          h: 4.2,
          kind: "comparison"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      }
    },
    closing_cta: {
      description: "Dark closing slide with headline, contact line, optional CTA.",
      use_for: [
        "closing",
        "thank_you",
        "qa"
      ],
      slots: {
        headline: {
          type: "string",
          required: true,
          max_chars: 30
        },
        contact: {
          type: "string",
          required: false,
          max_chars: 80
        },
        cta: {
          type: "string",
          required: false,
          max_chars: 40
        }
      },
      regions: {
        headline: {
          x: 0.8,
          y: 1.8,
          w: 8.4,
          h: 1.2,
          fontSize: 44,
          align: "center",
          bold: true,
          color: "FFFFFF"
        },
        contact: {
          x: 0.8,
          y: 3.2,
          w: 8.4,
          h: 0.6,
          fontSize: 16,
          align: "center",
          color: "CCCCCC"
        },
        cta: {
          x: 0.8,
          y: 4,
          w: 8.4,
          h: 0.5,
          fontSize: 14,
          align: "center",
          color: "accent"
        }
      },
      bg_color: "bg_dark"
    },
    split_insight: {
      description: "Left dark panel with big headline; right bullets for evidence.",
      use_for: [
        "insight",
        "conclusion",
        "executive_summary"
      ],
      slots: {
        kicker: {
          type: "string",
          required: false,
          max_chars: 24
        },
        headline: {
          type: "string",
          required: true,
          max_chars: 36
        },
        bullets: {
          type: "string[]",
          required: true,
          min_items: 2,
          max_items: 5,
          max_chars_per_item: 100
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        left_panel: {
          x: 0,
          y: 0,
          w: 4.2,
          h: 5.625,
          kind: "shape",
          fill: "bg_dark"
        },
        kicker: {
          x: 0.35,
          y: 1,
          w: 3.5,
          h: 0.4,
          fontSize: 12,
          color: "secondary"
        },
        headline: {
          x: 0.35,
          y: 1.6,
          w: 3.5,
          h: 2.4,
          fontSize: 30,
          bold: true,
          color: "FFFFFF",
          valign: "middle"
        },
        bullets: {
          x: 4.6,
          y: 1,
          w: 4.8,
          h: 4,
          fontSize: 16,
          kind: "bullets",
          color: "text_dark"
        },
        footer: {
          x: 4.6,
          y: 5.17,
          w: 4.8,
          h: 0.3,
          fontSize: 9
        }
      },
      bg_color: "bg_light"
    },
    quote_hero: {
      description: "Full-bleed quote with accent side bar and attribution.",
      use_for: [
        "quote",
        "thesis",
        "key_message"
      ],
      slots: {
        quote: {
          type: "string",
          required: true,
          max_chars: 120
        },
        attribution: {
          type: "string",
          required: false,
          max_chars: 60
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        accent_bar: {
          x: 0,
          y: 0,
          w: 0.12,
          h: 5.625,
          kind: "shape",
          fill: "accent"
        },
        quote: {
          x: 0.7,
          y: 1.5,
          w: 8.5,
          h: 2.2,
          fontSize: 28,
          italic: true,
          color: "text_dark",
          valign: "middle"
        },
        attribution: {
          x: 0.7,
          y: 4,
          w: 8.5,
          h: 0.5,
          fontSize: 14,
          color: "secondary"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      },
      bg_color: "bg_light"
    },
    timeline_horizontal: {
      description: "Title + horizontal milestone timeline.",
      use_for: [
        "roadmap",
        "history",
        "milestones"
      ],
      slots: {
        title: {
          type: "string",
          required: true,
          max_chars: 50
        },
        items: {
          type: "object[]",
          required: true,
          min_items: 3,
          max_items: 5,
          fields: {
            date: {
              type: "string",
              max_chars: 16
            },
            title: {
              type: "string",
              max_chars: 28
            },
            description: {
              type: "string",
              max_chars: 60
            }
          }
        },
        footer: {
          type: "string",
          required: false,
          max_chars: 80
        }
      },
      regions: {
        title: {
          x: 0.6,
          y: 0.25,
          w: 8.8,
          h: 0.7,
          fontSize: 26,
          bold: true
        },
        timeline: {
          x: 0.5,
          y: 1.2,
          w: 9,
          h: 3.8,
          kind: "timeline",
          direction: "horizontal"
        },
        footer: {
          x: 0.6,
          y: 5.17,
          w: 8.8,
          h: 0.3,
          fontSize: 9
        }
      }
    }
  }, yr = {
    presets: vr
  }, Yt = yr.presets;
  function ct(e, o) {
    const t = String(e ?? "");
    if (!t) return o.text_dark || "333333";
    const i = t.toLowerCase(), n = {
      primary: o.primary,
      secondary: o.secondary,
      accent: o.accent,
      bg_dark: o.bg_dark,
      bg_light: o.bg_light,
      text_dark: o.text_dark,
      text_light: o.text_light
    };
    return n[i] ? n[i] : t.replace(/^#/, "");
  }
  function br(e, o) {
    const t = e[o];
    return typeof t == "string" ? t : "";
  }
  function wr(e, o) {
    var _a2;
    if (((_a2 = e.elements) == null ? void 0 : _a2.length) && !e.layout_preset) return {
      type: e.type,
      bg_color: e.bg_color,
      footer: e.footer,
      notes: e.notes,
      elements: e.elements
    };
    const t = e.layout_preset;
    if (!t || !Yt[t]) throw new Error(`Unknown layout_preset: ${t || "(missing)"}`);
    const i = Tt(o.preset, o), n = Yt[t], A = e.slots || {}, l = [];
    let c = e.bg_color;
    !c && n.bg_color && (c = ct(n.bg_color, i)), c || (c = i.bg_light || "FFFFFF");
    for (const [a, r] of Object.entries(n.regions)) {
      const f = r.kind || xr(a, r), g = r.x, d = r.y, m = r.w, h = r.h;
      if (f === "shape") {
        const v = r.fill || "primary";
        l.push({
          kind: "shape",
          shape: "RECTANGLE",
          x: g,
          y: d,
          w: m,
          h,
          fill: ct(v, i),
          rectRadius: r.rectRadius
        });
        continue;
      }
      if (f === "bullets") {
        const v = A.bullets;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "bullets",
          items: v,
          x: g,
          y: d,
          w: m,
          h,
          fontSize: r.fontSize || 16,
          color: ct(r.color || "text_dark", i)
        });
        continue;
      }
      if (f === "card_grid") {
        const v = A.cards;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "card_grid",
          cards: v,
          columns: r.columns || 3,
          x: g,
          y: d,
          w: m,
          h,
          card_fill: "FFFFFF",
          title_color: i.primary,
          body_color: "555555"
        });
        continue;
      }
      if (f === "stat_group") {
        const v = A.stats;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "stat_group",
          stats: v.map((b, x) => ({
            ...b,
            color: b.color || (x === 0 ? i.accent : i.primary)
          })),
          x: g,
          y: d,
          w: m,
          h
        });
        continue;
      }
      if (f === "stat_row") {
        const v = A.stats;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "stat_row",
          stats: v,
          x: g,
          y: d,
          w: m,
          h,
          gap: r.gap || 0.25,
          theme_primary: i.primary,
          theme_accent: i.accent
        });
        continue;
      }
      if (f === "chart") {
        const v = A.chart;
        if (!v) continue;
        l.push({
          kind: "chart",
          chartType: v.chartType || "BAR",
          data: v.data,
          x: g,
          y: d,
          w: m,
          h,
          chartColors: [
            i.primary,
            i.secondary,
            i.accent
          ].filter(Boolean)
        });
        continue;
      }
      if (f === "comparison") {
        const v = A.columns;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "comparison",
          columns: v.map((b) => ({
            ...b,
            header_color: b.header_color || i.primary
          })),
          highlight_column: A.highlight_column,
          x: g,
          y: d,
          w: m,
          h
        });
        continue;
      }
      if (f === "timeline") {
        const v = A.items;
        if (!(v == null ? void 0 : v.length)) continue;
        l.push({
          kind: "timeline",
          items: v,
          direction: r.direction || "horizontal",
          x: g,
          y: d,
          w: m,
          h
        });
        continue;
      }
      const y = Cr(a, A);
      y && l.push({
        kind: "text",
        text: y,
        x: g,
        y: d,
        w: m,
        h,
        fontSize: r.fontSize || 18,
        bold: r.bold,
        italic: r.italic,
        align: r.align || "left",
        valign: r.valign || "top",
        color: ct(r.color || "text_dark", i),
        fontFace: i.font_body
      });
    }
    const s = e.footer || br(A, "footer");
    return {
      type: e.type,
      bg_color: c,
      footer: s || void 0,
      notes: e.notes,
      elements: l
    };
  }
  function xr(e, o) {
    return e.includes("bullet") ? "bullets" : e.includes("chart") ? "chart" : e.includes("comparison") ? "comparison" : e.includes("timeline") ? "timeline" : e.includes("stat_row") ? "stat_row" : e.includes("card_grid") ? "card_grid" : o.kind === "shape" || e.includes("bar") || e.includes("panel") || e.includes("rule") ? "shape" : "text";
  }
  function Cr(e, o) {
    const t = {
      title: [
        "title"
      ],
      subtitle: [
        "subtitle"
      ],
      footer: [
        "footer"
      ],
      headline: [
        "headline",
        "title"
      ],
      kicker: [
        "kicker"
      ],
      contact: [
        "contact"
      ],
      cta: [
        "cta"
      ],
      quote: [
        "quote"
      ],
      attribution: [
        "attribution"
      ]
    };
    for (const i of t[e] || [
      e
    ]) {
      const n = o[i];
      if (typeof n == "string" && n.trim()) return n;
    }
    return "";
  }
  function Lr(e) {
    var _a2, _b, _c;
    const o = Tt((_b = (_a2 = e.meta) == null ? void 0 : _a2.theme) == null ? void 0 : _b.preset, (_c = e.meta) == null ? void 0 : _c.theme), t = (e.slides || []).map((i) => wr(i, o));
    return {
      meta: {
        ...e.meta,
        theme: o
      },
      slides: t
    };
  }
  function Br(e, o, t) {
    const i = t.stats, n = t.x, A = t.y, l = t.w, c = t.h, s = t.gap || 0.25, a = t.theme_primary || "1E2761", r = t.theme_accent || "F96167", f = i.length, g = (l - (f - 1) * s) / f;
    i.forEach((d, m) => {
      const h = n + m * (g + s);
      o.addShape(e.ShapeType.rect, {
        x: h,
        y: A,
        w: g,
        h: c,
        fill: {
          color: m === 0 ? "F0F4FF" : "FFFFFF"
        },
        line: {
          color: m === 0 ? r : "E2E8F0",
          width: m === 0 ? 1.2 : 0.5
        }
      }), o.addText(d.value, {
        x: h,
        y: A + 0.15,
        w: g,
        h: c * 0.55,
        fontSize: 34,
        bold: true,
        color: m === 0 ? r : a,
        align: "center",
        valign: "bottom"
      }), o.addText(d.label, {
        x: h + 0.1,
        y: A + c * 0.62,
        w: g - 0.2,
        h: c * 0.32,
        fontSize: 12,
        color: "666666",
        align: "center",
        wrap: true
      });
    });
  }
  function kr(e, o, t) {
    const i = o.stats, n = o.x, A = o.y, l = o.w, s = o.h / i.length;
    i.forEach((a, r) => {
      const f = A + r * s;
      e.addText(a.value, {
        x: n,
        y: f,
        w: l,
        h: s * 0.6,
        fontSize: 36,
        bold: true,
        color: a.color || t.primary,
        align: "center",
        valign: "bottom"
      }), e.addText(a.label, {
        x: n,
        y: f + s * 0.6,
        w: l,
        h: s * 0.35,
        fontSize: 13,
        color: "888888",
        align: "center"
      });
    });
  }
  function Dr(e, o, t, i) {
    const n = t.cards, A = t.columns || 2, l = t.x, c = t.y, s = t.w, a = t.h, r = t.card_fill || "FFFFFF", f = t.title_color || i.primary, g = t.body_color || "555555", d = Math.ceil(n.length / A), m = (s - (A - 1) * 0.2) / A, h = (a - (d - 1) * 0.15) / d;
    for (let y = 0; y < n.length; y++) {
      const v = n[y], b = y % A, x = Math.floor(y / A), k = l + b * (m + 0.2), B = c + x * (h + 0.15);
      o.addShape(e.ShapeType.rect, {
        x: k,
        y: B,
        w: m,
        h,
        fill: {
          color: r
        },
        line: {
          color: "E2E8F0",
          width: 0.5
        }
      }), o.addText(v.title, {
        x: k + 0.15,
        y: B + 0.2,
        w: m - 0.3,
        h: 0.45,
        fontSize: 15,
        bold: true,
        color: f,
        fontFace: i.font_body || "Calibri"
      }), o.addText(v.body, {
        x: k + 0.15,
        y: B + 0.7,
        w: m - 0.3,
        h: h - 0.85,
        fontSize: 12,
        color: g,
        fontFace: i.font_body || "Calibri",
        wrap: true,
        lineSpacingMultiple: 1.3
      });
    }
  }
  function Pr(e, o, t, i) {
    const n = t.items, A = t.x, l = t.y, c = t.w, s = t.h, a = t.direction || "horizontal", r = n.length;
    if (a === "horizontal") {
      const f = c / r;
      o.addShape(e.ShapeType.rect, {
        x: A + 0.2,
        y: l + s * 0.35,
        w: c - 0.4,
        h: 0.04,
        fill: {
          color: i.secondary || "CCCCCC"
        },
        line: {
          width: 0
        }
      }), n.forEach((g, d) => {
        const m = A + d * f + f / 2;
        o.addShape(e.ShapeType.ellipse, {
          x: m - 0.15,
          y: l + s * 0.35 - 0.12,
          w: 0.3,
          h: 0.3,
          fill: {
            color: g.color || i.primary
          },
          line: {
            width: 0
          }
        }), o.addText(g.date, {
          x: A + d * f,
          y: l + s * 0.05,
          w: f,
          h: 0.35,
          fontSize: 11,
          bold: true,
          color: g.color || i.primary,
          align: "center"
        }), o.addText(g.title, {
          x: A + d * f + 0.05,
          y: l + s * 0.55,
          w: f - 0.1,
          h: 0.45,
          fontSize: 14,
          bold: true,
          color: i.text_dark || "333333",
          align: "center"
        }), g.description && o.addText(g.description, {
          x: A + d * f + 0.05,
          y: l + s * 0.72,
          w: f - 0.1,
          h: 0.55,
          fontSize: 10,
          color: "666666",
          align: "center",
          wrap: true
        });
      });
    } else {
      const f = s / r;
      n.forEach((g, d) => {
        const m = l + d * f;
        o.addShape(e.ShapeType.rect, {
          x: A + 0.1,
          y: m + 0.15,
          w: 0.08,
          h: f - 0.2,
          fill: {
            color: g.color || i.primary
          },
          line: {
            width: 0
          }
        }), o.addText(`${g.date} \xB7 ${g.title}`, {
          x: A + 0.35,
          y: m + 0.1,
          w: c - 0.45,
          h: 0.35,
          fontSize: 14,
          bold: true,
          color: i.text_dark || "333333"
        }), g.description && o.addText(g.description, {
          x: A + 0.35,
          y: m + 0.45,
          w: c - 0.45,
          h: f - 0.55,
          fontSize: 11,
          color: "666666",
          wrap: true
        });
      });
    }
  }
  function Fr(e, o, t, i) {
    const n = t.columns, A = t.x, l = t.y, c = t.w, s = t.h, a = t.highlight_column, r = (c - (n.length - 1) * 0.15) / n.length;
    n.forEach((f, g) => {
      const d = A + g * (r + 0.15), m = g === a;
      o.addShape(e.ShapeType.rect, {
        x: d,
        y: l,
        w: r,
        h: s,
        fill: {
          color: m ? "F0F7FF" : "FFFFFF"
        },
        line: {
          color: m ? f.header_color || i.primary : "E2E8F0",
          width: m ? 1.5 : 0.5
        }
      }), o.addShape(e.ShapeType.rect, {
        x: d,
        y: l,
        w: r,
        h: 0.55,
        fill: {
          color: f.header_color || i.primary
        },
        line: {
          width: 0
        }
      }), o.addText(f.header, {
        x: d + 0.1,
        y: l + 0.08,
        w: r - 0.2,
        h: 0.4,
        fontSize: 16,
        bold: true,
        color: "FFFFFF",
        align: "center"
      });
      const h = f.items.map((y, v) => ({
        text: y,
        options: {
          bullet: true,
          fontSize: 13,
          color: i.text_dark || "333333",
          breakLine: v < f.items.length - 1,
          paraSpaceAfter: 6
        }
      }));
      o.addText(h, {
        x: d + 0.15,
        y: l + 0.7,
        w: r - 0.3,
        h: s - 0.85,
        fontFace: i.font_body || "Calibri"
      });
    });
  }
  function Nr(e) {
    return e.elements.some((o) => o.kind === "text" && typeof o.y == "number" && o.y > 5);
  }
  function _r(e, o, t) {
    e.addText(o, {
      x: 0.4,
      y: 5.35,
      w: 9.2,
      h: 0.25,
      fontSize: 9,
      color: "999999",
      fontFace: t.font_body || "Calibri"
    });
  }
  function Rr(e, o, t, i) {
    var _a2;
    const n = t.kind;
    switch (n) {
      case "text":
        o.addText(t.text, {
          x: t.x,
          y: t.y,
          w: t.w,
          h: t.h,
          fontSize: t.fontSize || 18,
          fontFace: t.fontFace || i.font_body || "Calibri",
          color: t.color || i.text_dark || "333333",
          bold: !!t.bold,
          italic: !!t.italic,
          align: t.align || "left",
          valign: t.valign || "top",
          margin: t.margin ?? 4,
          lineSpacingMultiple: t.lineSpacingMultiple,
          wrap: true
        });
        break;
      case "bullets": {
        const A = t.items, l = A.map((c, s) => ({
          text: c,
          options: {
            bullet: true,
            fontSize: t.fontSize || 16,
            color: t.color || i.text_dark || "333333",
            breakLine: s < A.length - 1,
            paraSpaceAfter: 8
          }
        }));
        o.addText(l, {
          x: t.x,
          y: t.y,
          w: t.w,
          h: t.h,
          fontFace: t.fontFace || i.font_body || "Calibri"
        });
        break;
      }
      case "shape": {
        const A = String(t.shape || "RECTANGLE").toLowerCase(), l = A === "oval" || A === "ellipse" ? e.ShapeType.ellipse : e.ShapeType.rect;
        o.addShape(l, {
          x: t.x,
          y: t.y,
          w: t.w,
          h: t.h,
          fill: {
            color: t.fill || "CCCCCC"
          },
          line: t.stroke ? {
            color: t.stroke,
            width: t.strokeWidth || 1
          } : {
            color: t.fill || "CCCCCC",
            width: 0
          },
          rectRadius: t.rectRadius
        });
        break;
      }
      case "chart": {
        const A = t.data, l = ((_a2 = A[0]) == null ? void 0 : _a2.labels) || A.map((r) => r.name), c = A.map((r) => ({
          name: r.name,
          labels: r.labels || l,
          values: r.values
        })), s = String(t.chartType || "BAR").toUpperCase(), a = s === "LINE" ? e.ChartType.line : s === "PIE" ? e.ChartType.pie : e.ChartType.bar;
        o.addChart(a, c, {
          x: t.x,
          y: t.y,
          w: t.w,
          h: t.h,
          barDir: t.barDir || "col",
          chartColors: t.chartColors || [
            i.primary,
            i.secondary,
            i.accent
          ].filter(Boolean),
          chartArea: {
            fill: {
              color: "FFFFFF"
            },
            roundedCorners: true
          },
          catAxisLabelColor: "64748B",
          valAxisLabelColor: "64748B",
          valGridLine: {
            color: "E2E8F0",
            size: 0.5
          },
          catGridLine: {
            style: "none"
          },
          showValue: t.showValue !== false,
          showLegend: !!t.showLegend,
          legendPos: t.legendPos || "b"
        });
        break;
      }
      case "card_grid":
        Dr(e, o, t, i);
        break;
      case "stat_group":
        kr(o, t, i);
        break;
      case "stat_row":
        Br(e, o, t);
        break;
      case "timeline":
        Pr(e, o, t, i);
        break;
      case "comparison":
        Fr(e, o, t, i);
        break;
      case "image":
        o.addImage({
          path: t.path,
          data: typeof t.url == "string" && t.url.startsWith("data:") ? t.url : void 0,
          x: t.x,
          y: t.y,
          w: t.w,
          h: t.h
        });
        break;
      case "icon":
      case "icon_group":
        break;
      default:
        console.warn("[renderPptx] unknown kind:", n);
    }
  }
  function Sr(e, o, t, i) {
    for (const n of t.elements) Rr(e, o, n, i);
  }
  async function ia(e) {
    var _a2, _b, _c, _d, _e;
    const o = JSON.parse(e), t = Lr(o);
    if (!((_a2 = t.slides) == null ? void 0 : _a2.length)) throw new Error("Slide schema has no slides");
    const i = new gr(), n = ((_b = t.meta) == null ? void 0 : _b.theme) || {};
    i.layout = ((_c = t.meta) == null ? void 0 : _c.layout) || "LAYOUT_16x9", i.title = ((_d = t.meta) == null ? void 0 : _d.title) || "Presentation", i.author = ((_e = t.meta) == null ? void 0 : _e.author) || "OSINT Tools";
    for (const l of t.slides) {
      const c = i.addSlide();
      c.background = {
        color: l.bg_color || "FFFFFF"
      }, l.notes && c.addNotes(l.notes), Sr(i, c, l, n);
      const s = l.footer;
      s && !Nr(l) && _r(c, s, n);
    }
    const A = await i.write({
      outputType: "blob"
    });
    if (!(A instanceof Blob)) throw new Error("Unexpected pptx output type");
    return A;
  }
  async function Tr(e, o) {
    const t = await ia(e), i = o.endsWith(".pptx") ? o : `${o}.pptx`, n = URL.createObjectURL(t), A = document.createElement("a");
    A.href = n, A.download = i, A.click(), URL.revokeObjectURL(n);
  }
  function Er(e, o, t, i, n) {
    e.stage && e.stage !== "done" && o(e.stage), e.message && t(e.message), e.status === "retry" && e.stage && i((A) => ({
      ...A,
      [e.stage]: ""
    })), e.status === "progress" && e.chunk && e.stage && i((A) => ({
      ...A,
      [e.stage]: (A[e.stage] || "") + e.chunk
    })), e.stage === "error" && n(e.message || "\u751F\u6210\u5931\u8D25");
  }
  zr = function({ homePath: e = va(), useSlideGlancePreview: o = false } = {}) {
    const { projectId: t } = da(), i = fa(), [n, A] = ue.useState(""), [l, c] = ue.useState(""), [s, a] = ue.useState(""), [r, f] = ue.useState(""), [g, d] = ue.useState({}), [m, h] = ue.useState(true), [y, v] = ue.useState(false), [b, x] = ue.useState(""), [k, B] = ue.useState([]), [T, R] = ue.useState(""), [G, P] = ue.useState(false), [I, H] = ue.useState(false), [L, E] = ue.useState(null), [u, S] = ue.useState(false), Z = ue.useRef(false), M = !!l.trim(), te = y || G, X = ue.useMemo(() => {
      var _a2, _b, _c, _d;
      if (!l.trim()) return null;
      try {
        const q = JSON.parse(l), pe = (q.slides || []).map((re) => {
          const be = re;
          return be.layout_preset || be.type || "elements";
        });
        return {
          title: ((_a2 = q.meta) == null ? void 0 : _a2.title) || n,
          slides: ((_b = q.slides) == null ? void 0 : _b.length) ?? 0,
          theme: ((_d = (_c = q.meta) == null ? void 0 : _c.theme) == null ? void 0 : _d.preset) || "\u2014",
          presets: [
            ...new Set(pe)
          ].slice(0, 6).join(", ")
        };
      } catch {
        return null;
      }
    }, [
      l,
      n
    ]), ae = ue.useMemo(() => {
      var _a2, _b, _c;
      if (!l.trim()) return [];
      try {
        const q = JSON.parse(l), pe = Tt((_b = (_a2 = q.meta) == null ? void 0 : _a2.theme) == null ? void 0 : _b.preset, (_c = q.meta) == null ? void 0 : _c.theme);
        return (q.slides || []).slice(0, 12).map((re, be) => {
          var _a3, _b2;
          const ce = re, p = ce.layout_preset || "custom";
          let U = p;
          return ((_a3 = ce.slots) == null ? void 0 : _a3.title) && typeof ce.slots.title == "string" ? U = ce.slots.title : ((_b2 = ce.slots) == null ? void 0 : _b2.headline) && typeof ce.slots.headline == "string" && (U = ce.slots.headline), {
            i: be + 1,
            preset: p,
            title: String(U).slice(0, 28)
          };
        });
      } catch {
        return [];
      }
    }, [
      l
    ]), N = ue.useCallback(async () => {
      var _a2;
      if (!t) return;
      const [q, pe, re] = await Promise.all([
        Xe.getProject(t),
        Xe.listResources(t),
        Xe.getChat(t)
      ]);
      A(q.name), c(((_a2 = pe.find((be) => be.type === "slide_schema")) == null ? void 0 : _a2.content) || ""), B(re);
    }, [
      t
    ]), F = ue.useCallback(async (q) => {
      if (t) try {
        await Xe.saveChat(t, q);
      } catch {
      }
    }, [
      t
    ]), K = ue.useCallback((q) => {
      Er(q, a, f, d, x);
    }, []), j = ue.useCallback(async () => {
      if (!(!t || y)) {
        v(true), x(""), d({}), f(""), a("outline");
        try {
          await Xe.runPipeline(t, K), await N();
        } catch (q) {
          x(q instanceof Error ? q.message : "\u751F\u6210\u5931\u8D25");
        } finally {
          v(false);
        }
      }
    }, [
      t,
      y,
      N,
      K
    ]);
    ue.useEffect(() => {
      N().catch((q) => x(q instanceof Error ? q.message : "\u52A0\u8F7D\u5931\u8D25"));
    }, [
      N
    ]), ue.useEffect(() => {
      var _a2;
      ((_a2 = i.state) == null ? void 0 : _a2.autoRun) && !Z.current && t && (Z.current = true, j());
    }, [
      i.state,
      t,
      j
    ]);
    const J = async () => {
      if (l.trim()) {
        H(true), x("");
        try {
          await Tr(l, `${n || "deck"}.pptx`);
        } catch (q) {
          x(q instanceof Error ? q.message : "PPTX \u5BFC\u51FA\u5931\u8D25");
        } finally {
          H(false);
        }
      }
    }, le = () => {
      if (!l.trim()) return;
      const q = new Blob([
        l
      ], {
        type: "application/json"
      }), pe = URL.createObjectURL(q), re = document.createElement("a");
      re.href = pe, re.download = `${n || "deck"}-schema.json`, re.click(), URL.revokeObjectURL(pe);
    }, we = async () => {
      if (!t || !T.trim() || G) return;
      const q = T.trim();
      R("");
      const pe = [
        ...k,
        {
          role: "user",
          content: q
        }
      ];
      B(pe), F(pe), P(true), v(true), x(""), d({}), f(""), a("outline");
      try {
        await Xe.regenerate(t, q, K);
        const re = [
          ...pe,
          {
            role: "assistant",
            content: "\u5DF2\u6839\u636E\u4F60\u7684\u8BF4\u660E\u66F4\u65B0 Slide Schema\u3002"
          }
        ];
        B(re), F(re), await N();
      } catch (re) {
        const be = re instanceof Error ? re.message : "\u66F4\u65B0\u5931\u8D25", ce = [
          ...pe,
          {
            role: "assistant",
            content: be
          }
        ];
        B(ce), F(ce), x(be);
      } finally {
        P(false), v(false);
      }
    }, fe = ue.useMemo(() => {
      if (!l.trim()) return "";
      try {
        return JSON.stringify(JSON.parse(l), null, 2);
      } catch {
        return l;
      }
    }, [
      l
    ]);
    return ue.useEffect(() => {
      if (!o || !l.trim()) {
        E(null);
        return;
      }
      let q = false;
      return S(true), ia(l).then((pe) => pe.arrayBuffer()).then((pe) => {
        q || E(new Uint8Array(pe));
      }).catch(() => {
        q || E(null);
      }).finally(() => {
        q || S(false);
      }), () => {
        q = true;
      };
    }, [
      l,
      o
    ]), ee.jsxs("div", {
      className: "flex h-full min-h-0 flex-col bg-gray-50",
      children: [
        ee.jsxs("header", {
          className: "flex h-12 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-4",
          children: [
            ee.jsxs("div", {
              className: "flex items-center gap-3",
              children: [
                ee.jsx(pa, {
                  to: e,
                  className: "text-gray-500 hover:text-gray-800",
                  children: ee.jsx(ua, {
                    size: 18
                  })
                }),
                ee.jsx("span", {
                  className: "text-sm font-medium text-gray-900",
                  children: n || "\u52A0\u8F7D\u4E2D\u2026"
                }),
                X && ee.jsxs("span", {
                  className: "hidden text-xs text-gray-400 sm:inline",
                  children: [
                    X.slides,
                    " \u9875 \xB7 ",
                    X.theme,
                    " \xB7 ",
                    X.presets
                  ]
                })
              ]
            }),
            ee.jsxs("div", {
              className: "flex items-center gap-2",
              children: [
                M && ee.jsxs(ee.Fragment, {
                  children: [
                    ee.jsxs("button", {
                      type: "button",
                      onClick: le,
                      className: "flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs hover:bg-gray-50",
                      children: [
                        ee.jsx(ha, {
                          size: 14
                        }),
                        " Schema"
                      ]
                    }),
                    ee.jsxs("button", {
                      type: "button",
                      disabled: I,
                      onClick: () => void J(),
                      className: "flex items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs text-white hover:bg-indigo-500 disabled:opacity-40",
                      children: [
                        I ? ee.jsx($e, {
                          size: 14,
                          className: "animate-spin"
                        }) : ee.jsx(ma, {
                          size: 14
                        }),
                        "\u4E0B\u8F7D PPTX"
                      ]
                    })
                  ]
                }),
                ee.jsx("button", {
                  type: "button",
                  disabled: te,
                  onClick: () => void j(),
                  className: "rounded-lg border border-gray-200 px-3 py-1.5 text-xs hover:bg-gray-50 disabled:opacity-40",
                  children: M ? "\u91CD\u65B0\u751F\u6210" : "\u751F\u6210"
                })
              ]
            })
          ]
        }),
        ee.jsxs("div", {
          className: "flex min-h-0 flex-1",
          children: [
            ee.jsxs("aside", {
              className: "flex w-[38%] min-w-[280px] max-w-[480px] flex-col border-r border-gray-200 bg-white",
              children: [
                ee.jsxs("div", {
                  className: "flex-1 overflow-y-auto p-4 space-y-3",
                  children: [
                    te && ee.jsx(Gt, {
                      stage: s,
                      stageMsg: r,
                      partialByStage: g,
                      expanded: m,
                      onToggleExpanded: () => h((q) => !q),
                      compact: true
                    }),
                    b && ee.jsx("div", {
                      className: "rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700",
                      children: b
                    }),
                    k.length === 0 && !te && ee.jsx("p", {
                      className: "text-xs text-gray-400",
                      children: "\u751F\u6210\u540E\u53EF\u5728\u6B64\u8C03\u6574\u7ED3\u6784\u3001\u8BED\u6C14\u6216\u589E\u5220\u9875\u9762\uFF08\u8F93\u51FA Slide Schema\uFF0C\u7531 PptxGenJS \u6E32\u67D3\u4E3A\u53EF\u7F16\u8F91 PPT\uFF09"
                    }),
                    k.map((q, pe) => ee.jsx("div", {
                      className: jt("rounded-xl px-3 py-2 text-sm", q.role === "user" ? "ml-8 bg-gray-100 text-gray-900" : "mr-8 bg-gray-50 text-gray-700"),
                      children: q.content
                    }, pe))
                  ]
                }),
                ee.jsx("div", {
                  className: "border-t border-gray-100 p-3",
                  children: ee.jsxs("div", {
                    className: "flex items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2",
                    children: [
                      ee.jsx("textarea", {
                        value: T,
                        onChange: (q) => R(q.target.value),
                        onKeyDown: (q) => {
                          q.key === "Enter" && !q.shiftKey && (q.preventDefault(), we());
                        },
                        placeholder: "\u8C03\u6574\u7ED3\u6784\u6216\u5185\u5BB9\u2026",
                        rows: 2,
                        className: "flex-1 resize-none bg-transparent text-sm outline-none",
                        disabled: te
                      }),
                      ee.jsx("button", {
                        type: "button",
                        disabled: !T.trim() || te,
                        onClick: () => void we(),
                        className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white disabled:bg-gray-200",
                        children: G ? ee.jsx($e, {
                          size: 14,
                          className: "animate-spin"
                        }) : ee.jsx(ga, {
                          size: 14
                        })
                      })
                    ]
                  })
                })
              ]
            }),
            ee.jsxs("main", {
              className: "relative flex min-w-0 flex-1 flex-col bg-slate-900",
              children: [
                te && !M && ee.jsxs("div", {
                  className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-slate-900/95 p-8",
                  children: [
                    ee.jsx($e, {
                      className: "animate-spin text-indigo-300",
                      size: 32
                    }),
                    ee.jsx("div", {
                      className: "w-full max-w-lg",
                      children: ee.jsx(Gt, {
                        stage: s,
                        stageMsg: r,
                        partialByStage: g,
                        expanded: m,
                        onToggleExpanded: () => h((q) => !q)
                      })
                    }),
                    ee.jsx("p", {
                      className: "text-sm text-slate-400",
                      children: "\u6B63\u5728\u751F\u6210 PptxGenJS Slide Schema\u2026"
                    })
                  ]
                }),
                o ? ee.jsxs(ee.Fragment, {
                  children: [
                    X && M && ee.jsxs("div", {
                      className: "shrink-0 border-b border-slate-700 bg-slate-800/80 px-4 py-2 text-xs text-slate-300",
                      children: [
                        ee.jsx("span", {
                          className: "font-medium text-white",
                          children: X.title
                        }),
                        ee.jsx("span", {
                          className: "mx-2 text-slate-600",
                          children: "\xB7"
                        }),
                        X.slides,
                        " \u9875",
                        ee.jsx("span", {
                          className: "mx-2 text-slate-600",
                          children: "\xB7"
                        }),
                        X.theme
                      ]
                    }),
                    u && M && ee.jsxs("div", {
                      className: "absolute inset-0 z-10 flex items-center justify-center bg-slate-900/80 text-sm text-slate-400",
                      children: [
                        ee.jsx($e, {
                          className: "mr-2 animate-spin",
                          size: 18
                        }),
                        "\u6B63\u5728\u6E32\u67D3 PPTX \u9884\u89C8\u2026"
                      ]
                    }),
                    ee.jsx(xa, {
                      pptxBytes: L,
                      deckLabel: n || (X == null ? void 0 : X.title) || null,
                      className: "flex-1",
                      hideToolbarSettings: true
                    })
                  ]
                }) : fe ? ee.jsxs("div", {
                  className: "flex h-full flex-col",
                  children: [
                    X && ee.jsxs("div", {
                      className: "shrink-0 border-b border-slate-700 bg-slate-800/80 px-4 py-2 text-xs text-slate-300",
                      children: [
                        ee.jsx("span", {
                          className: "font-medium text-white",
                          children: X.title
                        }),
                        ee.jsx("span", {
                          className: "mx-2 text-slate-600",
                          children: "\xB7"
                        }),
                        X.slides,
                        " slides",
                        ee.jsx("span", {
                          className: "mx-2 text-slate-600",
                          children: "\xB7"
                        }),
                        "theme: ",
                        X.theme
                      ]
                    }),
                    ae.length > 0 && ee.jsx("div", {
                      className: "shrink-0 flex gap-2 overflow-x-auto border-b border-slate-700 bg-slate-800/50 px-3 py-2",
                      children: ae.map((q) => ee.jsxs("div", {
                        className: "min-w-[120px] rounded-lg border border-slate-600 bg-slate-700/80 px-2 py-1.5",
                        children: [
                          ee.jsx("p", {
                            className: "text-[10px] text-indigo-300",
                            children: q.preset
                          }),
                          ee.jsx("p", {
                            className: "truncate text-xs text-slate-200",
                            children: q.title
                          })
                        ]
                      }, q.i))
                    }),
                    ee.jsx("pre", {
                      className: "flex-1 overflow-auto p-4 text-[11px] leading-relaxed text-slate-300 font-mono",
                      children: fe
                    })
                  ]
                }) : te ? null : ee.jsx("div", {
                  className: "flex h-full items-center justify-center text-sm text-slate-500",
                  children: "Slide Schema \u5C06\u5728\u6B64\u663E\u793A"
                })
              ]
            })
          ]
        })
      ]
    });
  };
  Wr = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: zr
  }, Symbol.toStringTag, {
    value: "Module"
  }));
});
export {
  zr as P,
  xa as S,
  __tla,
  Wr as a
};
