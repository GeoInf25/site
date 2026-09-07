import { j as p, d as F, p as C, E as M, a as J } from "./runtime-worker-DDmQNApk.js";
const W = "https://registry.npmjs.org";
class $ {
  registryUrl;
  cache;
  constructor(t = {}) {
    this.registryUrl = t.registry || W, this.cache = t.cache || /* @__PURE__ */ new Map();
  }
  /**
   * Fetch package manifest (all versions metadata)
   */
  async getPackageManifest(t) {
    if (this.cache.has(t))
      return this.cache.get(t);
    const e = `${this.registryUrl}/${T(t)}`, r = await fetch(e, {
      headers: {
        Accept: "application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8"
      }
    });
    if (!r.ok)
      throw r.status === 404 ? new Error(`Package not found: ${t}`) : new Error(`Failed to fetch package ${t}: ${r.status}`);
    const n = await r.json();
    return this.cache.set(t, n), n;
  }
  /**
   * Get specific version metadata
   */
  async getPackageVersion(t, e) {
    const r = await this.getPackageManifest(t);
    r["dist-tags"][e] && (e = r["dist-tags"][e]);
    const n = r.versions[e];
    if (!n)
      throw new Error(`Version ${e} not found for package ${t}`);
    return n;
  }
  /**
   * Get latest version number
   */
  async getLatestVersion(t) {
    return (await this.getPackageManifest(t))["dist-tags"].latest;
  }
  /**
   * Get all available versions
   */
  async getVersions(t) {
    const e = await this.getPackageManifest(t);
    return Object.keys(e.versions);
  }
  /**
   * Download tarball as ArrayBuffer
   */
  async downloadTarball(t) {
    const e = await fetch(t);
    if (!e.ok)
      throw new Error(`Failed to download tarball: ${e.status}`);
    return e.arrayBuffer();
  }
  /**
   * Clear the cache
   */
  clearCache() {
    this.cache.clear();
  }
}
function T(s) {
  return s.replace("/", "%2f");
}
new $();
function b(s) {
  const t = s.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  return t ? {
    major: parseInt(t[1], 10),
    minor: parseInt(t[2], 10),
    patch: parseInt(t[3], 10),
    prerelease: t[4]
  } : null;
}
function u(s, t) {
  const e = b(s), r = b(t);
  return !e || !r ? s.localeCompare(t) : e.major !== r.major ? e.major - r.major : e.minor !== r.minor ? e.minor - r.minor : e.patch !== r.patch ? e.patch - r.patch : e.prerelease && !r.prerelease ? -1 : !e.prerelease && r.prerelease ? 1 : e.prerelease && r.prerelease ? e.prerelease.localeCompare(r.prerelease) : 0;
}
function S(s, t) {
  const e = b(s);
  if (!e || e.prerelease && !t.includes("-"))
    return !1;
  if (t = t.trim(), /^\d+\.\d+\.\d+/.test(t) && !t.includes(" ")) {
    const n = t.match(/^(\d+\.\d+\.\d+(?:-[^\s]+)?)/);
    if (n)
      return u(s, n[1]) === 0;
  }
  if (t === "*" || t === "latest" || t === "")
    return !0;
  if (t.includes("||"))
    return t.split("||").some((n) => S(s, n.trim()));
  if (t.includes(" - ")) {
    const [n, i] = t.split(" - ").map((o) => o.trim());
    return u(s, n) >= 0 && u(s, i) <= 0;
  }
  const r = t.match(/(>=|<=|>|<|=)?\s*(\d+\.\d+\.\d+(?:-[^\s]*)?)/g);
  if (r && r.length > 1)
    return r.every((n) => {
      const i = n.match(/^(>=|<=|>|<|=)?\s*(\d+\.\d+\.\d+(?:-[^\s]*)?)$/);
      if (!i) return !0;
      const o = i[1] || "=", f = i[2];
      switch (o) {
        case ">=":
          return u(s, f) >= 0;
        case "<=":
          return u(s, f) <= 0;
        case ">":
          return u(s, f) > 0;
        case "<":
          return u(s, f) < 0;
        case "=":
          return u(s, f) === 0;
        default:
          return u(s, f) === 0;
      }
    });
  if (t.startsWith("^")) {
    const n = t.slice(1), i = b(n);
    return !i || e.major !== i.major || i.major === 0 && (i.minor !== 0 && e.minor !== i.minor || i.minor === 0 && e.minor !== 0) ? !1 : u(s, n) >= 0;
  }
  if (t.startsWith("~")) {
    const n = t.slice(1), i = b(n);
    return !i || e.major !== i.major || e.minor !== i.minor ? !1 : u(s, n) >= 0;
  }
  if (t.startsWith(">=")) {
    const n = t.slice(2).trim();
    return u(s, n) >= 0;
  }
  if (t.startsWith(">")) {
    const n = t.slice(1).trim();
    return u(s, n) > 0;
  }
  if (t.startsWith("<=")) {
    const n = t.slice(2).trim();
    return u(s, n) <= 0;
  }
  if (t.startsWith("<")) {
    const n = t.slice(1).trim();
    return u(s, n) < 0;
  }
  if (t.includes("x") || t.includes("X") || /^\d+$/.test(t) || /^\d+\.\d+$/.test(t)) {
    const n = t.replace(/[xX]/g, "").split(".").filter(Boolean);
    if (n.length === 1)
      return e.major === parseInt(n[0], 10);
    if (n.length === 2)
      return e.major === parseInt(n[0], 10) && e.minor === parseInt(n[1], 10);
  }
  return t.includes(" ") ? t.split(/\s+/).filter(Boolean).every((i) => S(s, i)) : u(s, t) === 0;
}
function U(s, t) {
  const e = [...s].sort((r, n) => u(n, r));
  for (const r of e)
    if (S(r, t))
      return r;
  return null;
}
async function B(s, t = "latest", e = {}) {
  const n = {
    registry: e.registry || new $(),
    resolved: /* @__PURE__ */ new Map(),
    resolving: /* @__PURE__ */ new Set(),
    options: e
  };
  return await _(s, t, n), n.resolved;
}
async function R(s, t = {}) {
  const r = {
    registry: t.registry || new $(),
    resolved: /* @__PURE__ */ new Map(),
    resolving: /* @__PURE__ */ new Set(),
    options: t
  }, n = { ...s.dependencies };
  t.includeDev && s.devDependencies && Object.assign(n, s.devDependencies);
  for (const [i, o] of Object.entries(n))
    await _(i, o, r);
  return r.resolved;
}
async function _(s, t, e) {
  const { registry: r, resolved: n, resolving: i, options: o } = e, f = `${s}@${t}`;
  if (!i.has(f)) {
    if (n.has(s)) {
      const a = n.get(s);
      return S(a.version, t), void 0;
    }
    i.add(f);
    try {
      o.onProgress?.(`Resolving ${s}@${t}`);
      const a = await r.getPackageManifest(s), c = Object.keys(a.versions);
      let l;
      if (t === "latest" || t === "*")
        l = a["dist-tags"].latest;
      else if (a["dist-tags"][t])
        l = a["dist-tags"][t];
      else {
        const g = U(c, t);
        if (!g)
          throw new Error(
            `No matching version found for ${s}@${t}`
          );
        l = g;
      }
      const d = a.versions[l], m = {
        name: s,
        version: l,
        tarballUrl: d.dist.tarball,
        dependencies: d.dependencies || {}
      };
      n.set(s, m);
      const y = {};
      if (d.peerDependencies) {
        const g = d.peerDependenciesMeta || {};
        for (const [w, v] of Object.entries(d.peerDependencies))
          g[w]?.optional || (y[w] = v);
      }
      Object.assign(y, d.dependencies), o.includeOptional && d.optionalDependencies && Object.assign(y, d.optionalDependencies);
      const h = Object.entries(y);
      if (h.length > 0)
        for (let w = 0; w < h.length; w += 8) {
          const v = h.slice(w, w + 8);
          await Promise.all(
            v.map(([j, P]) => _(j, P, e))
          );
        }
    } finally {
      i.delete(f);
    }
  }
}
function* z(s) {
  new TextDecoder();
  let t = 0;
  for (; t < s.length - 512; ) {
    const e = s.slice(t, t + 512);
    if (t += 512, e.every((m) => m === 0))
      break;
    const r = k(e, 0, 100), n = D(e, 100, 8), i = D(e, 124, 12), o = String.fromCharCode(e[156]), f = k(e, 157, 100), a = k(e, 345, 155);
    if (!r)
      continue;
    const c = a ? `${a}/${r}` : r;
    let l;
    switch (o) {
      case "0":
      case "\0":
      case "":
        l = "file";
        break;
      case "5":
        l = "directory";
        break;
      case "1":
      case "2":
        l = "symlink";
        break;
      default:
        l = "unknown";
    }
    let d;
    l === "file" && (d = i > 0 ? s.slice(t, t + i) : new Uint8Array(0), i > 0 && (t += Math.ceil(i / 512) * 512)), yield {
      name: c,
      type: l,
      size: i,
      mode: n,
      content: d,
      linkTarget: l === "symlink" ? f : void 0
    };
  }
}
function k(s, t, e) {
  const r = s.slice(t, t + e), n = r.indexOf(0), i = n >= 0 ? r.slice(0, n) : r;
  return new TextDecoder().decode(i);
}
function D(s, t, e) {
  const r = k(s, t, e).trim();
  return parseInt(r, 8) || 0;
}
function N(s) {
  const t = s instanceof Uint8Array ? s : new Uint8Array(s);
  return C.inflate(t);
}
function A(s, t, e, r = {}) {
  const { stripComponents: n = 1, filter: i, onProgress: o } = r;
  o?.("Decompressing...");
  const f = N(s), a = [];
  for (const c of z(f)) {
    if (c.type !== "file" && c.type !== "directory")
      continue;
    let l = c.name;
    if (n > 0) {
      const m = l.split("/").filter(Boolean);
      if (m.length <= n)
        continue;
      l = m.slice(n).join("/");
    }
    if (i && !i(l))
      continue;
    const d = p(e, l);
    if (c.type === "directory")
      t.mkdirSync(d, { recursive: !0 });
    else if (c.type === "file" && c.content) {
      const m = F(d);
      t.mkdirSync(m, { recursive: !0 }), t.writeFileSync(d, c.content), a.push(d);
    }
  }
  return o?.(`Extracted ${a.length} files`), a;
}
async function L(s, t, e, r = {}) {
  const { onProgress: n } = r;
  n?.(`Downloading ${s}...`);
  const i = await fetch(s);
  if (!i.ok)
    throw new Error(`Failed to download tarball: ${i.status}`);
  const o = await i.arrayBuffer();
  return A(o, t, e, r);
}
const x = typeof window < "u";
async function E() {
  if (!x) {
    console.log("[transform] Skipping esbuild init (not in browser)");
    return;
  }
  if (window.__esbuild) {
    console.log("[transform] Reusing existing esbuild instance");
    return;
  }
  return window.__esbuildInitPromise || (window.__esbuildInitPromise = (async () => {
    try {
      console.log("[transform] Loading esbuild-wasm...");
      const s = await import(
        /* @vite-ignore */
        M
      ), t = s.default || s;
      try {
        await t.initialize({
          wasmURL: J
        }), console.log("[transform] esbuild-wasm initialized");
      } catch (e) {
        if (e instanceof Error && e.message.includes('Cannot call "initialize" more than once'))
          console.log("[transform] esbuild-wasm already initialized, reusing");
        else
          throw e;
      }
      window.__esbuild = t;
    } catch (s) {
      throw console.error("[transform] Failed to initialize esbuild:", s), window.__esbuildInitPromise = void 0, s;
    }
  })()), window.__esbuildInitPromise;
}
function q() {
  return x ? window.__esbuild !== void 0 : !0;
}
async function V(s, t) {
  if (!x)
    return s;
  window.__esbuild || await E();
  const e = window.__esbuild;
  if (!e)
    throw new Error("esbuild not initialized");
  let r = "js";
  t.endsWith(".jsx") ? r = "jsx" : t.endsWith(".ts") ? r = "ts" : t.endsWith(".tsx") ? r = "tsx" : t.endsWith(".mjs") && (r = "js");
  try {
    let i = (await e.transform(s, {
      loader: r,
      format: "cjs",
      target: "esnext",
      platform: "neutral",
      // Replace import.meta with our runtime-provided variable
      // This is the proper esbuild way to handle import.meta in CJS
      define: {
        "import.meta.url": "import_meta.url",
        "import.meta.dirname": "import_meta.dirname",
        "import.meta.filename": "import_meta.filename",
        "import.meta": "import_meta"
      }
    })).code;
    i = i.replace(
      /\bimport\s*\(\s*["']node:([^"']+)["']\s*\)/g,
      'Promise.resolve(require("node:$1"))'
    );
    const o = [
      "assert",
      "buffer",
      "child_process",
      "cluster",
      "crypto",
      "dgram",
      "dns",
      "events",
      "fs",
      "http",
      "http2",
      "https",
      "net",
      "os",
      "path",
      "perf_hooks",
      "querystring",
      "readline",
      "stream",
      "string_decoder",
      "timers",
      "tls",
      "url",
      "util",
      "v8",
      "vm",
      "worker_threads",
      "zlib",
      "async_hooks",
      "inspector",
      "module"
    ];
    for (const f of o) {
      const a = new RegExp(`\\bimport\\s*\\(\\s*["']${f}["']\\s*\\)`, "g");
      i = i.replace(a, `Promise.resolve(require("${f}"))`);
    }
    return i;
  } catch (n) {
    return (n instanceof Error ? n.message : String(n)).includes("Top-level await") ? (console.log(`[transform] Skipping ${t} (has top-level await, likely CLI entry point)`), s) : (console.warn(`[transform] Failed to transform ${t}:`, n), s);
  }
}
function Y(s, t) {
  if (s.endsWith(".mjs"))
    return !0;
  if (s.endsWith(".cjs"))
    return !1;
  const e = /\bimport\s+[\w{*'"]/m.test(t), r = /\bexport\s+(?:default|const|let|var|function|class|{|\*)/m.test(t), n = /\bimport\.meta\b/.test(t);
  return e || r || n;
}
function X(s) {
  return !!(/\bimport\s*\(\s*["']node:/.test(s) || /\bimport\s*\(\s*["'](fs|path|http|https|net|url|util|events|stream|os|crypto)["']/.test(s));
}
function G(s) {
  let t = s;
  t = t.replace(
    /\bimport\s*\(\s*["']node:([^"']+)["']\s*\)/g,
    'Promise.resolve(require("node:$1"))'
  );
  const e = [
    "assert",
    "buffer",
    "child_process",
    "cluster",
    "crypto",
    "dgram",
    "dns",
    "events",
    "fs",
    "http",
    "http2",
    "https",
    "net",
    "os",
    "path",
    "perf_hooks",
    "querystring",
    "readline",
    "stream",
    "string_decoder",
    "timers",
    "tls",
    "url",
    "util",
    "v8",
    "vm",
    "worker_threads",
    "zlib",
    "async_hooks",
    "inspector",
    "module"
  ];
  for (const r of e) {
    const n = new RegExp(`\\bimport\\s*\\(\\s*["']${r}["']\\s*\\)`, "g");
    t = t.replace(n, `Promise.resolve(require("${r}"))`);
  }
  return t;
}
async function H(s, t, e) {
  let r = 0;
  const n = I(s, t);
  e?.(`  Transforming ${n.length} files in ${t}...`);
  const i = 10;
  for (let o = 0; o < n.length; o += i) {
    const f = n.slice(o, o + i);
    await Promise.all(
      f.map(async (a) => {
        try {
          const c = s.readFileSync(a, "utf8");
          if (Y(a, c)) {
            const l = await V(c, a);
            s.writeFileSync(a, l), r++;
          } else if (X(c)) {
            const l = G(c);
            s.writeFileSync(a, l), r++;
          }
        } catch (c) {
          console.warn(`[transform] Skipping ${a}:`, c);
        }
      })
    );
  }
  return r;
}
function I(s, t) {
  const e = [];
  try {
    const r = s.readdirSync(t);
    for (const n of r) {
      const i = t + "/" + n;
      try {
        s.statSync(i).isDirectory() ? n !== "node_modules" && e.push(...I(s, i)) : (n.endsWith(".js") || n.endsWith(".mjs") || n.endsWith(".jsx")) && e.push(i);
      } catch {
      }
    }
  } catch {
  }
  return e;
}
function Z(s, t) {
  return t ? typeof t == "string" ? { [s.includes("/") ? s.split("/").pop() : s]: t } : t : {};
}
class tt {
  vfs;
  registry;
  cwd;
  constructor(t, e = {}) {
    this.vfs = t, this.registry = new $(e), this.cwd = e.cwd || "/";
  }
  /**
   * Install a package and its dependencies
   */
  async install(t, e = {}) {
    const { onProgress: r } = e, { name: n, version: i } = K(t);
    r?.(`Resolving ${n}@${i || "latest"}...`);
    const o = await B(n, i || "latest", {
      registry: this.registry,
      includeDev: e.includeDev,
      includeOptional: e.includeOptional,
      onProgress: r
    }), f = await this.installResolved(o, e);
    if (e.save || e.saveDev) {
      const a = o.get(n);
      a && await this.updatePackageJson(
        n,
        `^${a.version}`,
        e.saveDev || !1
      );
    }
    return r?.(`Installed ${o.size} packages`), { installed: o, added: f };
  }
  /**
   * Install all dependencies from package.json
   */
  async installFromPackageJson(t = {}) {
    const { onProgress: e } = t, r = p(this.cwd, "package.json");
    if (!this.vfs.existsSync(r))
      throw new Error("No package.json found");
    const n = JSON.parse(this.vfs.readFileSync(r, "utf8"));
    e?.("Resolving dependencies...");
    const i = await R(n, {
      registry: this.registry,
      includeDev: t.includeDev,
      includeOptional: t.includeOptional,
      onProgress: e
    }), o = await this.installResolved(i, t);
    return e?.(`Installed ${i.size} packages`), { installed: i, added: o };
  }
  /**
   * Install resolved packages to node_modules
   */
  async installResolved(t, e) {
    const { onProgress: r } = e, n = [], i = p(this.cwd, "node_modules");
    this.vfs.mkdirSync(i, { recursive: !0 });
    const o = [];
    for (const [c, l] of t) {
      const d = p(i, c), m = p(d, "package.json");
      if (this.vfs.existsSync(m))
        try {
          if (JSON.parse(
            this.vfs.readFileSync(m, "utf8")
          ).version === l.version) {
            r?.(`Skipping ${c}@${l.version} (already installed)`);
            continue;
          }
        } catch {
        }
      o.push({ name: c, pkg: l, pkgPath: d });
    }
    const f = e.transform !== !1;
    f && !q() && (r?.("Initializing ESM transformer..."), await E());
    const a = 6;
    r?.(`Installing ${o.length} packages...`);
    for (let c = 0; c < o.length; c += a) {
      const l = o.slice(c, c + a);
      await Promise.all(
        l.map(async ({ name: d, pkg: m, pkgPath: y }) => {
          if (r?.(`  Downloading ${d}@${m.version}...`), await L(m.tarballUrl, this.vfs, y, {
            stripComponents: 1
            // Strip "package/" prefix
          }), f)
            try {
              const h = await H(this.vfs, y, r);
              h > 0 && r?.(`  Transformed ${h} files in ${d}`);
            } catch (h) {
              r?.(`  Warning: Transform failed for ${d}: ${h}`);
            }
          try {
            const h = p(y, "package.json");
            if (this.vfs.existsSync(h)) {
              const g = JSON.parse(this.vfs.readFileSync(h, "utf8")), w = Z(d, g.bin), v = p(i, ".bin");
              for (const [j, P] of Object.entries(w)) {
                this.vfs.mkdirSync(v, { recursive: !0 });
                const O = p(y, P);
                this.vfs.writeFileSync(
                  p(v, j),
                  `node "${O}" "$@"
`
                );
              }
            }
          } catch {
          }
          n.push(d);
        })
      );
    }
    return await this.writeLockfile(t), n;
  }
  /**
   * Write lockfile with resolved versions
   */
  async writeLockfile(t) {
    const e = {};
    for (const [n, i] of t)
      e[n] = {
        version: i.version,
        resolved: i.tarballUrl
      };
    const r = p(this.cwd, "node_modules", ".package-lock.json");
    this.vfs.writeFileSync(r, JSON.stringify(e, null, 2));
  }
  /**
   * Update package.json with new dependency
   */
  async updatePackageJson(t, e, r) {
    const n = p(this.cwd, "package.json");
    let i = {};
    this.vfs.existsSync(n) && (i = JSON.parse(this.vfs.readFileSync(n, "utf8")));
    const o = r ? "devDependencies" : "dependencies";
    i[o] || (i[o] = {}), i[o][t] = e, this.vfs.writeFileSync(n, JSON.stringify(i, null, 2));
  }
  /**
   * List installed packages
   */
  list() {
    const t = p(this.cwd, "node_modules");
    if (!this.vfs.existsSync(t))
      return {};
    const e = {}, r = this.vfs.readdirSync(t);
    for (const n of r)
      if (!n.startsWith("."))
        if (n.startsWith("@")) {
          const i = p(t, n), o = this.vfs.readdirSync(i);
          for (const f of o) {
            const a = p(i, f, "package.json");
            if (this.vfs.existsSync(a)) {
              const c = JSON.parse(this.vfs.readFileSync(a, "utf8"));
              e[`${n}/${f}`] = c.version;
            }
          }
        } else {
          const i = p(t, n, "package.json");
          if (this.vfs.existsSync(i)) {
            const o = JSON.parse(this.vfs.readFileSync(i, "utf8"));
            e[n] = o.version;
          }
        }
    return e;
  }
}
function K(s) {
  if (s.startsWith("@")) {
    const e = s.indexOf("/");
    if (e === -1)
      throw new Error(`Invalid package spec: ${s}`);
    const r = s.slice(e + 1), n = r.indexOf("@");
    return n === -1 ? { name: s } : {
      name: s.slice(0, e + 1 + n),
      version: r.slice(n + 1)
    };
  }
  const t = s.indexOf("@");
  return t === -1 ? { name: s } : {
    name: s.slice(0, t),
    version: s.slice(t + 1)
  };
}
export {
  tt as PackageManager,
  $ as Registry,
  K as parsePackageSpec
};
