import*as q from"onnxruntime-web/webgpu";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const Me=Math.log(255),st=Math.sqrt(2*Me),Ft=1/255,re=12;function Le(a,e,t=new Float32Array(e*2),r=new Float32Array(e)){for(let i=0;i<e;i++){const s=a[3*i],n=a[3*i+1],o=a[3*i+2],c=.5*(s+o),u=.5*(s-o),l=Math.sqrt(u*u+n*n+1e-12);t[2*i]=Math.exp(.5*(c+l)),t[2*i+1]=Math.exp(.5*(c-l)),r[i]=-.5*Math.atan2(2*n,s-o)}return{scale:t,rotation:r}}function nt(a,e,t,r,i,s,n){const o=a*s,c=e*n,u=Math.cos(i),l=Math.sin(i),f=u*t,h=l*r,d=-l*t,p=u*r,g=f*f+h*h,w=f*d+h*p,v=d*d+p*p,b=g*v-w*w;if(!(b>0)||!Number.isFinite(b))return{cx:o,cy:c,sxx:g,sxy:w,syy:v,cxx:0,cxy:0,cyy:0,valid:!1};const m=1/b;return{cx:o,cy:c,sxx:g,sxy:w,syy:v,cxx:v*m,cxy:-w*m,cyy:g*m,valid:!0}}function ot(a,e,t){const r=a.xy.length/2,i=new Float32Array(r*re),s=2*Me;for(let n=0;n<r;n++){const o=nt(a.xy[2*n],a.xy[2*n+1],a.scale[2*n],a.scale[2*n+1],a.rotation[n],e,t),c=n*re;i[c]=o.cx,i[c+1]=o.cy,i[c+2]=o.cxx,i[c+3]=o.cxy,i[c+4]=o.cyy,i[c+5]=a.color[3*n],i[c+6]=a.color[3*n+1],i[c+7]=a.color[3*n+2],i[c+8]=o.valid?Math.sqrt(s*o.sxx):0,i[c+9]=o.valid?Math.sqrt(s*o.syy):0,i[c+10]=o.valid?1:0,i[c+11]=0}return i}function Mt(a,e,t,r,i=t,s=r){let n=0,o=0;for(let c=0;c<3;c++)for(let u=0;u<s;u++){const l=c*t*r+u*t;for(let f=0;f<i;f++){const h=a[l+f]-e[l+f];n+=h*h,o++}}return n/=Math.max(1,o),n===0?1/0:10*Math.log10(1/n)}function Lt(a,e,t){const r=a.length>>1,i=new Int32Array(e*t).fill(-1);if(r===0||e<=0||t<=0)return i;const s=Math.max(1,Math.sqrt(2*e*t/r)),n=Math.max(1,Math.ceil(e/s)),o=Math.max(1,Math.ceil(t/s)),c=new Int32Array(n*o+1),u=new Int32Array(r);for(let d=0;d<r;d++){const p=Math.min(n-1,Math.max(0,Math.floor(a[2*d]*e/s))),w=Math.min(o-1,Math.max(0,Math.floor(a[2*d+1]*t/s)))*n+p;u[d]=w,c[w+1]++}for(let d=0;d<n*o;d++)c[d+1]+=c[d];const l=new Int32Array(r),f=c.slice(0,n*o);for(let d=0;d<r;d++)l[f[u[d]]++]=d;const h=Math.max(n,o);for(let d=0;d<t;d++){const p=Math.min(o-1,Math.floor(d/s));for(let g=0;g<e;g++){const w=Math.min(n-1,Math.floor(g/s));let v=1/0,b=-1;for(let m=0;m<=h;m++){const _=p-m,T=p+m,R=w-m,C=w+m;for(let U=Math.max(0,_);U<=Math.min(o-1,T);U++){const we=U===_||U===T?1:C-R;for(let Q=R;Q<=C;Q+=we){if(Q<0||Q>=n)continue;const Ve=U*n+Q;for(let be=c[Ve];be<c[Ve+1];be++){const se=l[be],je=a[2*se]*e-g,Xe=a[2*se+1]*t-d,xe=je*je+Xe*Xe;(xe<v||xe===v&&se<b)&&(v=xe,b=se)}}}const L=m*s;if(b>=0&&v<=L*L)break}i[d*e+g]=b}}return i}function Ut(a,e,t,r=!1){const i=new Float32Array(3*e*t),s=a.xy.length/2,n=2*Me;for(let o=0;o<s;o++){const c=nt(a.xy[2*o],a.xy[2*o+1],a.scale[2*o],a.scale[2*o+1],a.rotation[o],e,t);if(!c.valid)continue;const u=Math.sqrt(n*c.sxx),l=Math.sqrt(n*c.syy),f=Math.max(0,Math.floor(c.cx-u-1)),h=Math.min(e-1,Math.ceil(c.cx+u+1)),d=Math.max(0,Math.floor(c.cy-l-1)),p=Math.min(t-1,Math.ceil(c.cy+l+1)),g=a.color[3*o],w=a.color[3*o+1],v=a.color[3*o+2];for(let b=d;b<=p;b++){const m=c.cy-b;for(let _=f;_<=h;_++){const T=c.cx-_,R=.5*(c.cxx*T*T+c.cyy*m*m)+c.cxy*T*m;if(R<0||!Number.isFinite(R))continue;const C=Math.exp(-R);if(C<Ft)continue;const L=b*e+_;i[L]+=g*C,i[e*t+L]+=w*C,i[2*e*t+L]+=v*C}}}for(let o=0;o<i.length;o++){let c=i[o]<0?0:i[o]>1?1:i[o];r&&(c=Math.round(c*255)/255),i[o]=c}return i}const Ye=new WeakMap;let $t=1;function Nt(a){let e=Ye.get(a);return e===void 0&&(e=$t++,Ye.set(a,e)),e}class ${device;spec;pipeline;layout;cache=new Map;constructor(e,t,r,i){this.device=e,this.spec=t,this.pipeline=r,this.layout=i}static create(e,t){const r=t.bindings.filter(o=>o!=="uniform").length;if(r>e.limits.maxStorageBuffersPerShaderStage)throw new Error(`${t.label??t.entryPoint}: ${r} storage buffers exceed the device limit ${e.limits.maxStorageBuffersPerShaderStage}`);const i=e.createBindGroupLayout({label:t.label,entries:t.bindings.map((o,c)=>({binding:c,visibility:GPUShaderStage.COMPUTE,buffer:{type:o}}))}),s=e.createShaderModule({code:t.code,label:t.label}),n=e.createComputePipeline({label:t.label,layout:e.createPipelineLayout({bindGroupLayouts:[i]}),compute:{module:s,entryPoint:t.entryPoint}});return new $(e,t,n,i)}bindGroup(e){if(e.length!==this.spec.bindings.length)throw new Error(`${this.spec.label??this.spec.entryPoint}: expected ${this.spec.bindings.length} buffers, got ${e.length}`);const t=new Set;e.forEach((s,n)=>{if(this.spec.bindings[n]==="storage"&&t.has(s))throw new Error(`${this.spec.label??this.spec.entryPoint}: buffer aliased across bindings with a writable use`);t.add(s)});const r=e.map(Nt).join(",");let i=this.cache.get(r);return i||(i=this.device.createBindGroup({layout:this.layout,entries:e.map((s,n)=>({binding:n,resource:{buffer:s}}))}),this.cache.set(r,i)),i}clearCache(){this.cache.clear()}dispatch(e,t,r,i=1,s=1){e.setPipeline(this.pipeline),e.setBindGroup(0,this.bindGroup(t)),e.dispatchWorkgroups(r,i,s)}}const ct=140;function E(a,e,t,r=ct){return a.createBuffer({size:Math.max(16,Math.ceil(e/4)*4),usage:r,label:t})}function Ue(a,e,t){const r=Math.max(16,Math.ceil(e.byteLength/16)*16),i=a.createBuffer({size:r,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:t});return a.queue.writeBuffer(i,0,e.buffer,e.byteOffset,e.byteLength),i}function le(a,e,t,r=ct){const i=E(a,e.byteLength,t,r);return a.queue.writeBuffer(i,0,e.buffer,e.byteOffset,e.byteLength),i}async function _e(a,e,t,r=0){const i=Math.ceil(t/4)*4,s=a.createBuffer({size:i,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),n=a.createCommandEncoder();n.copyBufferToBuffer(e,r,s,0,i),a.queue.submit([n.finish()]),await s.mapAsync(GPUMapMode.READ);const o=s.getMappedRange().slice(0,t);return s.unmap(),s.destroy(),o}function F(a,e){return Math.max(1,Math.ceil(a/e))}const Ke=1024,Be=1024,W=8,It=`
struct P { W: u32, H: u32, N: u32, step: u32, aux: u32, pad0: u32, pad1: u32, pad2: u32 }
@group(0) @binding(0) var<uniform> p: P;
`,j=`
fn fp_encode_lo(v: f32) -> u32 { let fl = floor(v); return u32(min((v - fl) * 4294967296.0, 4294967295.0)); }
fn fp_encode_hi(v: f32) -> u32 { return u32(floor(v)); }
fn fp_decode(lo: u32, hi: u32) -> f32 { return f32(hi) + f32(lo) * 2.3283064365386963e-10; }
`,ke=`
fn fp_add(base: u32, i: u32, v: f32) {
  let lo = fp_encode_lo(v); let hi = fp_encode_hi(v);
  let old = atomicAdd(&ACC[base + 2u * i], lo);
  var carry = 0u; if (old + lo < old) { carry = 1u; }
  atomicAdd(&ACC[base + 2u * i + 1u], hi + carry);
}
`,Dt=`
fn d2(c: i32, x: u32, y: u32) -> f32 {
  let q = pix[u32(c)];
  let dx = f32(x) + 0.5 - q.x; let dy = f32(y) + 0.5 - q.y;
  return dx * dx + dy * dy;
}
`;function P(a,e,t){return{label:a,entryPoint:"main",bindings:e,code:It+t}}const A="uniform",x="read-only-storage",k="storage",zt={fill_u32:P("fill_u32",[A,k],`
@group(0) @binding(1) var<storage, read_write> buf: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x < p.N) { buf[g.x] = p.aux; }
}`),to_pixel:P("to_pixel",[A,x,k],`
@group(0) @binding(1) var<storage, read> pts: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read_write> pix: array<vec2<f32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  let q = pts[g.x];
  pix[g.x] = vec2<f32>(clamp(q.x * f32(p.W), 0.0, f32(p.W) - 1e-3), clamp(q.y * f32(p.H), 0.0, f32(p.H) - 1e-3));
}`),owner_init:P("owner_init",[A,x,k],`
@group(0) @binding(1) var<storage, read> pix: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read_write> owner: array<atomic<i32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  let q = pix[g.x];
  let cx = clamp(u32(floor(q.x)), 0u, p.W - 1u); let cy = clamp(u32(floor(q.y)), 0u, p.H - 1u);
  atomicMax(&owner[cy * p.W + cx], i32(g.x));
}`),jfa_pass:P("jfa_pass",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> pix: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> owner_in: array<i32>;
@group(0) @binding(3) var<storage, read_write> owner_out: array<i32>;
${Dt}
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.W || g.y >= p.H) { return; }
  let idx = g.y * p.W + g.x;
  var best = owner_in[idx];
  var bd = 1e30; if (best >= 0) { bd = d2(best, g.x, g.y); }
  let s = i32(p.step);
  for (var dy = -1; dy <= 1; dy++) {
    let ny = i32(g.y) + dy * s; if (ny < 0 || ny >= i32(p.H)) { continue; }
    for (var dx = -1; dx <= 1; dx++) {
      if (dx == 0 && dy == 0) { continue; }
      let nx = i32(g.x) + dx * s; if (nx < 0 || nx >= i32(p.W)) { continue; }
      let c = owner_in[u32(ny) * p.W + u32(nx)]; if (c < 0) { continue; }
      let d = d2(c, g.x, g.y); if (d < bd) { bd = d; best = c; }
    }
  }
  owner_out[idx] = best;
}`),mark_seen:P("mark_seen",[A,x,k],`
@group(0) @binding(1) var<storage, read> owner: array<i32>;
@group(0) @binding(2) var<storage, read_write> seen: array<u32>;
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.W || g.y >= p.H) { return; }
  let o = owner[g.y * p.W + g.x]; if (o >= 0) { seen[u32(o)] = 1u; }
}`),unseen_flags:P("unseen_flags",[A,x,k],`
@group(0) @binding(1) var<storage, read> seen: array<u32>;
@group(0) @binding(2) var<storage, read_write> flags: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  flags[g.x] = select(1u, 0u, seen[g.x] != 0u);
}`),scan_local:P("scan_local",[A,x,k,k],`
@group(0) @binding(1) var<storage, read> inp: array<u32>;
@group(0) @binding(2) var<storage, read_write> outp: array<u32>;
@group(0) @binding(3) var<storage, read_write> sums: array<u32>;
var<workgroup> ws: array<u32, 256>;
@compute @workgroup_size(256) fn main(@builtin(local_invocation_id) l: vec3<u32>, @builtin(workgroup_id) wg: vec3<u32>) {
  let base = wg.x * 1024u + l.x * 4u;
  var v: array<u32, 4>; var s = 0u;
  for (var kk = 0u; kk < 4u; kk++) { let i = base + kk; var x = 0u; if (i < p.N) { x = inp[i]; } v[kk] = x; s += x; }
  ws[l.x] = s; workgroupBarrier();
  for (var off = 1u; off < 256u; off = off << 1u) {
    var t = 0u; if (l.x >= off) { t = ws[l.x - off]; }
    workgroupBarrier(); ws[l.x] = ws[l.x] + t; workgroupBarrier();
  }
  let incl = ws[l.x]; var run = incl - s;
  for (var kk = 0u; kk < 4u; kk++) { let i = base + kk; if (i < p.N) { outp[i] = run; } run += v[kk]; }
  if (l.x == 255u) { sums[wg.x] = incl; }
}`),scan_add:P("scan_add",[A,k,x],`
@group(0) @binding(1) var<storage, read_write> outp: array<u32>;
@group(0) @binding(2) var<storage, read> sums: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  let b = g.x / 1024u; if (b > 0u) { outp[g.x] = outp[g.x] + sums[b]; }
}`),compact_lost:P("compact_lost",[A,x,x,k,k],`
@group(0) @binding(1) var<storage, read> flags: array<u32>;
@group(0) @binding(2) var<storage, read> scan: array<u32>;
@group(0) @binding(3) var<storage, read_write> lost: array<u32>;
@group(0) @binding(4) var<storage, read_write> counts: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  if (flags[g.x] == 1u) { lost[scan[g.x]] = g.x; }
  if (g.x == p.N - 1u) { counts[0] = scan[g.x] + flags[g.x]; }
}`),recovery:P("recovery",[A,x,x,k,x,x],`
@group(0) @binding(1) var<storage, read> pix: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> owner_in: array<i32>;
@group(0) @binding(3) var<storage, read_write> owner_out: array<i32>;
@group(0) @binding(4) var<storage, read> lost: array<u32>;
@group(0) @binding(5) var<storage, read> counts: array<u32>;
var<workgroup> sx: array<f32, 128>; var<workgroup> sy: array<f32, 128>; var<workgroup> si: array<i32, 128>;
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  let inside = (g.x < p.W) && (g.y < p.H);
  let idx = select(0u, g.y * p.W + g.x, inside);
  var best = -1; var bd = 1e30;
  if (inside) { best = owner_in[idx]; if (best >= 0) { let q = pix[u32(best)]; let dx = f32(g.x) + 0.5 - q.x; let dy = f32(g.y) + 0.5 - q.y; bd = dx * dx + dy * dy; } }
  let L = counts[0];
  for (var t = 0u; t < L; t += 128u) {
    let n = min(128u, L - t);
    if (li < n) { let c = i32(lost[t + li]); let q = pix[u32(c)]; sx[li] = q.x; sy[li] = q.y; si[li] = c; }
    workgroupBarrier();
    if (inside) {
      for (var j = 0u; j < n; j++) {
        let dx = f32(g.x) + 0.5 - sx[j]; let dy = f32(g.y) + 0.5 - sy[j]; let d = dx * dx + dy * dy;
        if (d < bd) { bd = d; best = si[j]; }
      }
    }
    workgroupBarrier();
  }
  if (inside) { owner_out[idx] = best; }
}`),mass_accumulate:P("mass_accumulate",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> owner: array<i32>;
@group(0) @binding(2) var<storage, read> density: array<f32>;
@group(0) @binding(3) var<storage, read_write> ACC: array<atomic<u32>>;
${j}${ke}
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.W || g.y >= p.H) { return; }
  let idx = g.y * p.W + g.x; let o = owner[idx]; let d = density[idx];
  if (o < 0 || d <= 0.0) { return; }
  fp_add(0u, u32(o), d);
}`),mass_decode:P("mass_decode",[A,x,k],`
@group(0) @binding(1) var<storage, read> ACC: array<u32>;
@group(0) @binding(2) var<storage, read_write> mass: array<f32>;
${j}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  mass[g.x] = fp_decode(ACC[2u * g.x], ACC[2u * g.x + 1u]);
}`),sort_init:P("sort_init",[A,x,k,k],`
@group(0) @binding(1) var<storage, read> mass: array<f32>;
@group(0) @binding(2) var<storage, read_write> keys: array<u32>;
@group(0) @binding(3) var<storage, read_write> vals: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  keys[g.x] = bitcast<u32>(max(mass[g.x], 0.0)); vals[g.x] = g.x;
}`),sort_hist:P("sort_hist",[A,x,k],`
@group(0) @binding(1) var<storage, read> keys: array<u32>;
@group(0) @binding(2) var<storage, read_write> hist: array<u32>;
var<workgroup> lh: array<atomic<u32>, 256>;
@compute @workgroup_size(256) fn main(@builtin(local_invocation_id) l: vec3<u32>, @builtin(workgroup_id) wg: vec3<u32>) {
  atomicStore(&lh[l.x], 0u); workgroupBarrier();
  let base = wg.x * 1024u + l.x * 4u;
  for (var kk = 0u; kk < 4u; kk++) { let i = base + kk; if (i < p.N) { let d = (keys[i] >> p.step) & 255u; atomicAdd(&lh[d], 1u); } }
  workgroupBarrier();
  hist[l.x * p.aux + wg.x] = atomicLoad(&lh[l.x]);
}`),sort_scatter:P("sort_scatter",[A,x,x,x,k,k],`
@group(0) @binding(1) var<storage, read> keys_in: array<u32>;
@group(0) @binding(2) var<storage, read> vals_in: array<u32>;
@group(0) @binding(3) var<storage, read> offsets: array<u32>;
@group(0) @binding(4) var<storage, read_write> keys_out: array<u32>;
@group(0) @binding(5) var<storage, read_write> vals_out: array<u32>;
var<workgroup> sd: array<u32, 1024>;
@compute @workgroup_size(256) fn main(@builtin(local_invocation_id) l: vec3<u32>, @builtin(workgroup_id) wg: vec3<u32>) {
  let base = wg.x * 1024u;
  for (var kk = 0u; kk < 4u; kk++) { let j = l.x * 4u + kk; let i = base + j; var d = 0xFFFFFFFFu; if (i < p.N) { d = (keys_in[i] >> p.step) & 255u; } sd[j] = d; }
  workgroupBarrier();
  var d: array<u32, 4>; var cnt: array<u32, 4>;
  for (var kk = 0u; kk < 4u; kk++) { d[kk] = sd[l.x * 4u + kk]; cnt[kk] = 0u; }
  let mine = l.x * 4u;
  for (var m = 0u; m < mine; m++) {
    let s = sd[m];
    for (var kk = 0u; kk < 4u; kk++) { if (s == d[kk]) { cnt[kk] += 1u; } }
  }
  for (var kk = 1u; kk < 4u; kk++) { for (var jj = 0u; jj < kk; jj++) { if (d[jj] == d[kk]) { cnt[kk] += 1u; } } }
  for (var kk = 0u; kk < 4u; kk++) {
    let i = base + l.x * 4u + kk;
    if (i < p.N) { let pos = offsets[d[kk] * p.aux + wg.x] + cnt[kk]; keys_out[pos] = keys_in[i]; vals_out[pos] = vals_in[i]; }
  }
}`),rank_from_sorted:P("rank_from_sorted",[A,x,k,k],`
@group(0) @binding(1) var<storage, read> vals: array<u32>;
@group(0) @binding(2) var<storage, read_write> rank: array<u32>;
@group(0) @binding(3) var<storage, read_write> idx_of_rank: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.N) { return; }
  let v = vals[g.x]; rank[v] = g.x; idx_of_rank[g.x] = v;
}`),adjacency_round:P("adjacency_round",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> owner: array<i32>;
@group(0) @binding(2) var<storage, read> rank: array<u32>;
@group(0) @binding(3) var<storage, read_write> slot: array<atomic<u32>>;
fn ins(src: i32, dst: i32) {
  let kk = rank[u32(dst)]; let r = p.step; var ok = true;
  if (r > 0u) { let l = atomicLoad(&slot[u32(src) * 8u + r - 1u]); ok = (l != 0xFFFFFFFFu) && (kk > l); }
  if (ok) { atomicMin(&slot[u32(src) * 8u + r], kk); }
}
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.W || g.y >= p.H) { return; }
  let idx = g.y * p.W + g.x; let a = owner[idx];
  if (a < 0) { return; }
  if (g.x + 1u < p.W) { let b = owner[idx + 1u]; if (b >= 0 && a != b) { ins(a, b); ins(b, a); } }
  if (g.y + 1u < p.H) { let b = owner[idx + p.W]; if (b >= 0 && a != b) { ins(a, b); ins(b, a); } }
}`),match_phase1:P("match_phase1",[A,x,x,x,x,x,k,k],`
@group(0) @binding(1) var<storage, read> rank: array<u32>;
@group(0) @binding(2) var<storage, read> slot: array<u32>;
@group(0) @binding(3) var<storage, read> idx_of_rank: array<u32>;
@group(0) @binding(4) var<storage, read> alive: array<u32>;
@group(0) @binding(5) var<storage, read> matched: array<u32>;
@group(0) @binding(6) var<storage, read_write> tmin: array<atomic<u32>>;
@group(0) @binding(7) var<storage, read_write> proposed: array<i32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let proposer = (rank[i] < p.aux) && (alive[i] == 1u) && (matched[i] == 0u);
  let sv = slot[i * 8u + p.step];
  var t = i32(i);
  if (sv != 0xFFFFFFFFu) { t = i32(idx_of_rank[sv]); }
  let valid = proposer && (t != i32(i)) && (alive[u32(t)] == 1u);
  if (valid) { proposed[i] = t; atomicMin(&tmin[u32(t)], rank[i]); } else { proposed[i] = -1; }
}`),match_phase2:P("match_phase2",[A,x,x,x,k,k,k],`
@group(0) @binding(1) var<storage, read> rank: array<u32>;
@group(0) @binding(2) var<storage, read> proposed: array<i32>;
@group(0) @binding(3) var<storage, read> tmin: array<u32>;
@group(0) @binding(4) var<storage, read_write> tgt: array<i32>;
@group(0) @binding(5) var<storage, read_write> matched: array<u32>;
@group(0) @binding(6) var<storage, read_write> alive: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let t = proposed[i]; if (t < 0) { return; }
  if (rank[i] == tmin[u32(t)]) { tgt[i] = t; matched[i] = 1u; alive[i] = 0u; }
}`),match_force:P("match_force",[A,x,x,k,k,k],`
@group(0) @binding(1) var<storage, read> rank: array<u32>;
@group(0) @binding(2) var<storage, read> idx_of_rank: array<u32>;
@group(0) @binding(3) var<storage, read_write> tgt: array<i32>;
@group(0) @binding(4) var<storage, read_write> matched: array<u32>;
@group(0) @binding(5) var<storage, read_write> alive: array<u32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let fb = idx_of_rank[p.N - 1u];
  if (rank[i] < p.aux && matched[i] == 0u && alive[i] == 1u && fb != i) { tgt[i] = i32(fb); matched[i] = 1u; alive[i] = 0u; }
}`),merge_acc_init:P("merge_acc_init",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> pts: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> mass: array<f32>;
@group(0) @binding(3) var<storage, read_write> ACC: array<u32>;
${j}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let m = mass[i]; let q = pts[i]; let n2 = 2u * p.N;
  ACC[2u * i] = fp_encode_lo(m); ACC[2u * i + 1u] = fp_encode_hi(m);
  ACC[n2 + 2u * i] = fp_encode_lo(q.x * m); ACC[n2 + 2u * i + 1u] = fp_encode_hi(q.x * m);
  ACC[2u * n2 + 2u * i] = fp_encode_lo(q.y * m); ACC[2u * n2 + 2u * i + 1u] = fp_encode_hi(q.y * m);
}`),merge_accumulate:P("merge_accumulate",[A,x,x,x,x,k],`
@group(0) @binding(1) var<storage, read> pts: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> mass: array<f32>;
@group(0) @binding(3) var<storage, read> matched: array<u32>;
@group(0) @binding(4) var<storage, read> tgt: array<i32>;
@group(0) @binding(5) var<storage, read_write> ACC: array<atomic<u32>>;
${j}${ke}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  if (matched[i] != 1u) { return; }
  let t = tgt[i]; if (t < 0) { return; }
  let m = mass[i]; let q = pts[i]; let n2 = 2u * p.N;
  fp_add(0u, u32(t), m); fp_add(n2, u32(t), q.x * m); fp_add(2u * n2, u32(t), q.y * m);
}`),merge_new:P("merge_new",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> pts: array<vec2<f32>>;
@group(0) @binding(2) var<storage, read> ACC: array<u32>;
@group(0) @binding(3) var<storage, read_write> pts_new: array<vec2<f32>>;
${j}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let n2 = 2u * p.N;
  let mp = fp_decode(ACC[2u * i], ACC[2u * i + 1u]);
  if (mp > 1e-8) {
    let wx = fp_decode(ACC[n2 + 2u * i], ACC[n2 + 2u * i + 1u]);
    let wy = fp_decode(ACC[2u * n2 + 2u * i], ACC[2u * n2 + 2u * i + 1u]);
    pts_new[i] = vec2<f32>(wx / mp, wy / mp);
  } else { pts_new[i] = pts[i]; }
}`),compact_alive:P("compact_alive",[A,x,x,x,k],`
@group(0) @binding(1) var<storage, read> alive: array<u32>;
@group(0) @binding(2) var<storage, read> scan: array<u32>;
@group(0) @binding(3) var<storage, read> pts_new: array<vec2<f32>>;
@group(0) @binding(4) var<storage, read_write> pts_out: array<vec2<f32>>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  if (alive[i] == 1u) { pts_out[scan[i]] = pts_new[i]; }
}`),lloyd_accumulate:P("lloyd_accumulate",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> owner: array<i32>;
@group(0) @binding(2) var<storage, read> density: array<f32>;
@group(0) @binding(3) var<storage, read_write> ACC: array<atomic<u32>>;
${j}${ke}
@compute @workgroup_size(16, 16) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  if (g.x >= p.W || g.y >= p.H) { return; }
  let idx = g.y * p.W + g.x; let o = owner[idx]; let d = density[idx];
  if (o < 0 || d <= 0.0) { return; }
  let cx = (f32(g.x) + 0.5) / f32(p.W); let cy = (f32(g.y) + 0.5) / f32(p.H);
  let n2 = 2u * p.N;
  fp_add(0u, u32(o), d); fp_add(n2, u32(o), d * cx); fp_add(2u * n2, u32(o), d * cy);
}`),lloyd_finalize:P("lloyd_finalize",[A,x,k],`
@group(0) @binding(1) var<storage, read> ACC: array<u32>;
@group(0) @binding(2) var<storage, read_write> pts: array<vec2<f32>>;
${j}
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let n2 = 2u * p.N;
  let w = fp_decode(ACC[2u * i], ACC[2u * i + 1u]);
  if (w > 1e-8) {
    let x = fp_decode(ACC[n2 + 2u * i], ACC[n2 + 2u * i + 1u]) / w;
    let y = fp_decode(ACC[2u * n2 + 2u * i], ACC[2u * n2 + 2u * i + 1u]) / w;
    pts[i] = vec2<f32>(clamp(x, 0.0, 1.0), clamp(y, 0.0, 1.0));
  }
}`),reduce_partial:P("reduce_partial",[A,x,k],`
@group(0) @binding(1) var<storage, read> inp: array<f32>;
@group(0) @binding(2) var<storage, read_write> partial: array<f32>;
var<workgroup> ws: array<f32, 256>;
@compute @workgroup_size(256) fn main(@builtin(local_invocation_id) l: vec3<u32>, @builtin(workgroup_id) wg: vec3<u32>) {
  let base = wg.x * 1024u + l.x * 4u; var s = 0.0;
  for (var kk = 0u; kk < 4u; kk++) { let i = base + kk; if (i < p.N) { s += inp[i]; } }
  ws[l.x] = s; workgroupBarrier();
  for (var off = 128u; off > 0u; off = off >> 1u) { if (l.x < off) { ws[l.x] += ws[l.x + off]; } workgroupBarrier(); }
  if (l.x == 0u) { partial[wg.x] = ws[0]; }
}`),reduce_final:P("reduce_final",[A,x,k],`
@group(0) @binding(1) var<storage, read> partial: array<f32>;
@group(0) @binding(2) var<storage, read_write> total: array<f32>;
var<workgroup> ws: array<f32, 256>;
@compute @workgroup_size(256) fn main(@builtin(local_invocation_id) l: vec3<u32>) {
  var s = 0.0;
  for (var i = l.x; i < p.N; i += 256u) { s += partial[i]; }
  ws[l.x] = s; workgroupBarrier();
  for (var off = 128u; off > 0u; off = off >> 1u) { if (l.x < off) { ws[l.x] += ws[l.x + off]; } workgroupBarrier(); }
  if (l.x == 0u) { total[0] = ws[0]; }
}`),weights_finalize:P("weights_finalize",[A,x,x,k],`
@group(0) @binding(1) var<storage, read> mass: array<f32>;
@group(0) @binding(2) var<storage, read> total: array<f32>;
@group(0) @binding(3) var<storage, read_write> weights: array<f32>;
@compute @workgroup_size(256) fn main(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  weights[i] = mass[i] / (max(total[0], 1e-8) / f32(p.N));
}`)},ut=`
// sigma = 0.5 (cxx dx^2 + cyy dy^2) + cxy dx dy; alpha = exp(-sigma); cutoff 1/255.
fn splat_alpha(dx: f32, dy: f32, conic: vec3<f32>) -> f32 {
  let sigma = 0.5 * (conic.x * dx * dx + conic.z * dy * dy) + conic.y * dx * dy;
  if (sigma < 0.0) { return 0.0; }
  let alpha = exp(-sigma);
  if (alpha < 0.00392156862745098) { return 0.0; }
  return alpha;
}
`,Ot=`
struct Projected { center: vec2<f32>, conic: vec3<f32>, radius: f32, valid: u32 };
fn project_gaussian(xy_norm: vec2<f32>, scale: vec2<f32>, rot: f32, width: f32, height: f32) -> Projected {
  var out: Projected;
  out.center = vec2<f32>(xy_norm.x * width, xy_norm.y * height);
  let c = cos(rot); let s = sin(rot);
  let m00 = c * scale.x; let m01 = s * scale.y; let m10 = -s * scale.x; let m11 = c * scale.y;
  let sxx = m00 * m00 + m01 * m01; let sxy = m00 * m10 + m01 * m11; let syy = m10 * m10 + m11 * m11;
  let det = sxx * syy - sxy * sxy;
  if (det == 0.0) { out.valid = 0u; out.radius = 0.0; out.conic = vec3<f32>(0.0); return out; }
  let inv = 1.0 / det;
  out.conic = vec3<f32>(syy * inv, -sxy * inv, sxx * inv);
  let bm = 0.5 * (sxx + syy);
  let root = sqrt(max(0.1, bm * bm - det));
  out.radius = ceil(3.0 * sqrt(max(bm + root, bm - root)));
  out.valid = 1u;
  return out;
}
`,lt=`
fn bilinear_plane(plane_offset: u32, width: u32, height: u32, x_norm: f32, y_norm: f32) -> f32 {
  let xp = x_norm * f32(width) - 0.5; let yp = y_norm * f32(height) - 0.5;
  let x0 = i32(floor(xp)); let y0 = i32(floor(yp)); let fx = xp - f32(x0); let fy = yp - f32(y0);
  var v = 0.0;
  for (var j = 0; j < 2; j++) {
    for (var k = 0; k < 2; k++) {
      let xx = x0 + k; let yy = y0 + j;
      if (xx >= 0 && xx < i32(width) && yy >= 0 && yy < i32(height)) {
        let w = select(1.0 - fx, fx, k == 1) * select(1.0 - fy, fy, j == 1);
        v += w * MAP[plane_offset + u32(yy) * width + u32(xx)];
      }
    }
  }
  return v;
}
`,Wt={image:!1,diff:!1,density:!1,voronoi:!1,centers:!1,ellipses:!1,diffGain:4,ellipseSigma:1,ellipseWidth:1.25};class ft{width=0;height=0;srcW=1;srcH=1;instanceCount=0;hasImage=!1;hasDensity=!1;hasVoronoi=!1;densityMax=1;overlays={...Wt};disposed=!1;setOverlays(e){this.overlays={...this.overlays,...e}}getOverlays(){return{...this.overlays}}resolveParams(e){return{zoom:e.zoom,tx:e.tx,ty:e.ty,gain:this.overlays.diffGain,canvasW:this.width,canvasH:this.height,srcW:this.srcW,srcH:this.srcH,densityMax:this.densityMax,flags:rr(this.overlays),hasImage:+this.hasImage,hasDensity:+this.hasDensity,hasVoronoi:+this.hasVoronoi,borderMix:Yt(e.zoom,this.srcW,this.srcH,this.instanceCount)}}}const dt=[{location:0,offset:0,size:2},{location:1,offset:8,size:3},{location:2,offset:20,size:3},{location:3,offset:32,size:2},{location:4,offset:40,size:1}],Gt=`
float splat_alpha(float dx, float dy, vec3 conic) {
  float sigma = 0.5 * (conic.x * dx * dx + conic.z * dy * dy) + conic.y * dx * dy;
  if (sigma < 0.0) return 0.0;
  float alpha = exp(-sigma);
  if (alpha < 0.00392156862745098) return 0.0;
  return alpha;
}
`,qt=1,Ht=2,Vt=4,jt=8,ht=.42,Xt=.78;function Yt(a,e,t,r){const i=a*Math.sqrt(e*t/Math.max(1,r)),s=Math.min(1,Math.max(0,(i-2)/6));return Xt*s*s*(3-2*s)}const Kt="mix(0.25, 1.0, smoothstep(2.0, 7.0, rpx))",Jt="mix(0.25, 1.0, smoothstep(2.0, 7.0, rpx))",K=[1,.5,.15],ge=.95,pt=.7;function gt(a,e,t,r){const i=a*Math.sqrt(e*t/Math.max(1,r)),s=Math.min(1,Math.max(0,(i-3)/9));return{radius:1+1.5*s,alpha:.45+.55*s}}const Zt=`
fn cell_tint(id: u32) -> vec3<f32> {
  let h = fract(f32(id % 4096u) * 0.618033988749895 + f32(id / 4096u) * 0.271828);
  let rgb = clamp(abs(fract(h + vec3<f32>(0.0, 0.6666667, 0.3333333)) * 6.0 - 3.0) - 1.0, vec3<f32>(0.0), vec3<f32>(1.0));
  return mix(vec3<f32>(1.0), rgb, 0.55);
}
`,Qt=`
vec3 cell_tint(uint id) {
  float h = fract(float(id % 4096u) * 0.618033988749895 + float(id / 4096u) * 0.271828);
  vec3 rgb = clamp(abs(fract(h + vec3(0.0, 0.6666667, 0.3333333)) * 6.0 - 3.0) - 1.0, 0.0, 1.0);
  return mix(vec3(1.0), rgb, 0.55);
}
`,J=[.62,.96,1],me=.95,mt=.6,er=`
fn colormap(t: f32) -> vec3<f32> {
  let a = vec3<f32>(0.05, 0.03, 0.2); let b = vec3<f32>(0.2, 0.5, 0.9); let c = vec3<f32>(1.0, 0.9, 0.2);
  if (t < 0.5) { return mix(a, b, t * 2.0); }
  return mix(b, c, (t - 0.5) * 2.0);
}
`,tr=`
vec3 colormap(float t) {
  vec3 a = vec3(0.05, 0.03, 0.2); vec3 b = vec3(0.2, 0.5, 0.9); vec3 c = vec3(1.0, 0.9, 0.2);
  if (t < 0.5) return mix(a, b, t * 2.0);
  return mix(b, c, (t - 0.5) * 2.0);
}
`;function vt(a,e,t){const r=e*t,i=new Float32Array(r*4);for(let s=0;s<r;s++)i[4*s]=a[s],i[4*s+1]=a[r+s],i[4*s+2]=a[2*r+s],i[4*s+3]=1;return i}function yt(a){let e=0;for(let t=0;t<a.length;t++)a[t]>e&&(e=a[t]);return e}function rr(a){return(a.image?qt:0)|(a.diff?Ht:0)|(a.density?Vt:0)|(a.voronoi?jt:0)}const Je=dt.map(a=>({shaderLocation:a.location,offset:a.offset,format:a.size===1?"float32":`float32x${a.size}`})),ir=`
struct View { zoom: f32, tx: f32, ty: f32, pad0: f32, canvas: vec2<f32>, pad1: vec2<f32> };
@group(0) @binding(0) var<uniform> view: View;
struct Inst {
  @location(0) center: vec2<f32>, @location(1) conic: vec3<f32>, @location(2) color: vec3<f32>,
  @location(3) ext: vec2<f32>, @location(4) valid: f32,
};
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) @interpolate(flat) center: vec2<f32>,
  @location(1) @interpolate(flat) conic: vec3<f32>,
  @location(2) @interpolate(flat) color: vec3<f32>,
};
${ut}
@vertex fn vs_main(@builtin(vertex_index) vi: u32, inst: Inst) -> VSOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0));
  let c = corners[vi];
  let dc = vec2<f32>(view.zoom * (inst.center.x + 0.5) + view.tx, view.zoom * (inst.center.y + 0.5) + view.ty);
  let half = inst.ext * view.zoom + vec2<f32>(1.0, 1.0);
  var p = dc + c * half;
  if (inst.valid < 0.5) { p = vec2<f32>(-10.0, -10.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p.x / view.canvas.x * 2.0 - 1.0, 1.0 - p.y / view.canvas.y * 2.0, 0.0, 1.0);
  out.center = inst.center; out.conic = inst.conic; out.color = inst.color;
  return out;
}
@fragment fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let sx = (in.pos.x - view.tx) / view.zoom - 0.5;
  let sy = (in.pos.y - view.ty) / view.zoom - 0.5;
  let a = splat_alpha(in.center.x - sx, in.center.y - sy, in.conic);
  if (a <= 0.0) { discard; }
  return vec4<f32>(in.color * a, 1.0);
}
`,ar=`
struct RP { zoom: f32, tx: f32, ty: f32, gain: f32, canvas: vec2<f32>, src: vec2<f32>, densityMax: f32, flags: f32, hasImage: f32, hasDensity: f32, hasVoronoi: f32, borderMix: f32, pad1: f32, pad2: f32 };
@group(0) @binding(0) var<uniform> rp: RP;
@group(0) @binding(1) var accum: texture_2d<f32>;
@group(0) @binding(2) var img: texture_2d<f32>;
@group(0) @binding(3) var dens: texture_2d<f32>;
@group(0) @binding(4) var own: texture_2d<u32>;
${er}
${Zt}
@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4<f32> {
  var pts = array<vec2<f32>, 3>(vec2<f32>(-1.0, -1.0), vec2<f32>(3.0, -1.0), vec2<f32>(-1.0, 3.0));
  return vec4<f32>(pts[vi], 0.0, 1.0);
}
@fragment fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  let px = vec2<i32>(pos.xy);
  var r = clamp(textureLoad(accum, px, 0).rgb, vec3<f32>(0.0), vec3<f32>(1.0));
  r = round(r * 255.0) / 255.0;
  let s = (pos.xy - vec2<f32>(rp.tx, rp.ty)) / rp.zoom - 0.5;
  let si = vec2<i32>(floor(s + vec2<f32>(0.5, 0.5)));
  let inside = si.x >= 0 && si.y >= 0 && si.x < i32(rp.src.x) && si.y < i32(rp.src.y);
  let flags = u32(rp.flags);
  var out = r;
  if (!inside) {
    out = vec3<f32>(0.12, 0.12, 0.13);
  } else {
    var im = vec3<f32>(0.0);
    if (rp.hasImage > 0.5) { im = textureLoad(img, si, 0).rgb; }
    if ((flags & 1u) != 0u && rp.hasImage > 0.5) { out = im; }
    if ((flags & 2u) != 0u && rp.hasImage > 0.5) { out = clamp(abs(r - im) * rp.gain, vec3<f32>(0.0), vec3<f32>(1.0)); }
    if ((flags & 4u) != 0u && rp.hasDensity > 0.5) {
      let d = textureLoad(dens, si, 0).r / max(rp.densityMax, 1e-6);
      out = colormap(clamp(d, 0.0, 1.0));
    }
    if ((flags & 8u) != 0u && rp.hasVoronoi > 0.5) {
      // Every cell is tinted by its owner; a border is one display pixel wide, found by comparing
      // with the source pixels under the next display pixel right and down.
      let o = textureLoad(own, si, 0).r;
      out = mix(out, cell_tint(o), ${ht});
      let sr = vec2<i32>(floor(s + vec2<f32>(1.0 / rp.zoom, 0.0) + vec2<f32>(0.5, 0.5)));
      let sd = vec2<i32>(floor(s + vec2<f32>(0.0, 1.0 / rp.zoom) + vec2<f32>(0.5, 0.5)));
      var border = sr.x < i32(rp.src.x) && textureLoad(own, sr, 0).r != o;
      if (sd.y < i32(rp.src.y) && textureLoad(own, sd, 0).r != o) { border = true; }
      if (border) { out = mix(out, vec3<f32>(0.04, 0.04, 0.05), rp.borderMix); }
    }
  }
  return vec4<f32>(out, 1.0);
}
`,sr=`
@group(0) @binding(0) var src: texture_2d<f32>;
@vertex fn vs_main(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4<f32> {
  var pts = array<vec2<f32>, 3>(vec2<f32>(-1.0, -1.0), vec2<f32>(3.0, -1.0), vec2<f32>(-1.0, 3.0));
  return vec4<f32>(pts[vi], 0.0, 1.0);
}
@fragment fn fs_main(@builtin(position) pos: vec4<f32>) -> @location(0) vec4<f32> {
  return textureLoad(src, vec2<i32>(pos.xy), 0);
}
`,nr=`
struct DP { zoom: f32, tx: f32, ty: f32, radius: f32, canvas: vec2<f32>, alpha: f32, pad: f32 };
@group(0) @binding(0) var<uniform> dp: DP;
struct Inst {
  @location(0) center: vec2<f32>, @location(1) conic: vec3<f32>, @location(2) color: vec3<f32>,
  @location(3) ext: vec2<f32>, @location(4) valid: f32,
};
struct VSOut { @builtin(position) pos: vec4<f32>, @location(0) @interpolate(flat) dc: vec2<f32> };
@vertex fn vs_main(@builtin(vertex_index) vi: u32, inst: Inst) -> VSOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0));
  let dc = vec2<f32>(dp.zoom * (inst.center.x + 0.5) + dp.tx, dp.zoom * (inst.center.y + 0.5) + dp.ty);
  var p = dc + corners[vi] * (dp.radius + 2.0);
  if (inst.valid < 0.5) { p = vec2<f32>(-10.0, -10.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p.x / dp.canvas.x * 2.0 - 1.0, 1.0 - p.y / dp.canvas.y * 2.0, 0.0, 1.0);
  out.dc = dc;
  return out;
}
@fragment fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let d = length(in.pos.xy - in.dc);
  let core = 1.0 - smoothstep(dp.radius - 0.5, dp.radius + 0.5, d);
  let halo = 1.0 - smoothstep(dp.radius + 0.5, dp.radius + 1.5, d);
  if (halo <= 0.002) { discard; }
  let alpha = max(core * ${ge}, halo * ${pt}) * dp.alpha;
  let rgb = vec3<f32>(${K[0]}, ${K[1]}, ${K[2]}) * core * ${ge} * dp.alpha;
  return vec4<f32>(rgb, alpha);
}
`,or=`
struct RG { zoom: f32, tx: f32, ty: f32, sigma: f32, canvas: vec2<f32>, width: f32, pad: f32 };
@group(0) @binding(0) var<uniform> rg: RG;
struct Inst {
  @location(0) center: vec2<f32>, @location(1) conic: vec3<f32>, @location(2) color: vec3<f32>,
  @location(3) ext: vec2<f32>, @location(4) valid: f32,
};
struct VSOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) @interpolate(flat) center: vec2<f32>,
  @location(1) @interpolate(flat) conic: vec3<f32>,
  @location(2) @interpolate(flat) fade: f32,
};
@vertex fn vs_main(@builtin(vertex_index) vi: u32, inst: Inst) -> VSOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0));
  let c = corners[vi];
  let dc = vec2<f32>(rg.zoom * (inst.center.x + 0.5) + rg.tx, rg.zoom * (inst.center.y + 0.5) + rg.ty);
  // ext is the cutoff ellipse's half extent; scale it to the ring radius and pad for the halo.
  let radius = inst.ext * (rg.sigma / ${st}) * rg.zoom;
  let half = radius + vec2<f32>(rg.width + 2.5);
  var p = dc + c * half;
  if (inst.valid < 0.5) { p = vec2<f32>(-10.0, -10.0); }
  var out: VSOut;
  out.pos = vec4<f32>(p.x / rg.canvas.x * 2.0 - 1.0, 1.0 - p.y / rg.canvas.y * 2.0, 0.0, 1.0);
  out.center = inst.center; out.conic = inst.conic;
  let rpx = max(radius.x, radius.y);
  out.fade = ${Kt};
  return out;
}
@fragment fn fs_main(in: VSOut) -> @location(0) vec4<f32> {
  let sx = (in.pos.x - rg.tx) / rg.zoom - 0.5;
  let sy = (in.pos.y - rg.ty) / rg.zoom - 0.5;
  let dx = in.center.x - sx; let dy = in.center.y - sy;
  let d = sqrt(max(in.conic.x * dx * dx + 2.0 * in.conic.y * dx * dy + in.conic.z * dy * dy, 0.0));
  let px = abs(d - rg.sigma) / max(fwidth(d), 1e-6);
  let core = 1.0 - smoothstep(rg.width * 0.5 - 0.5, rg.width * 0.5 + 0.5, px);
  let halo = 1.0 - smoothstep(rg.width * 0.5 + 0.5, rg.width * 0.5 + 1.5, px);
  if (halo <= 0.002) { discard; }
  let alpha = max(core * ${me}, halo * ${mt}) * in.fade;
  let rgb = vec3<f32>(${J[0]}, ${J[1]}, ${J[2]}) * core * ${me} * in.fade;
  return vec4<f32>(rgb, alpha);
}
`;class $e extends ft{device;canvas;context;canvasFormat;kind="webgpu";accumFormat;instanceBuf=null;accumTex=null;displayTex=null;imageTex;densityTex;ownerTex;viewBuf;resolveBuf;ringBuf;dotBuf;splatPipeline;resolvePipeline;blitPipeline;ringPipeline;dotPipeline;splatLayout;resolveLayout;blitLayout;lineLayout;constructor(e,t,r,i){super(),this.device=e,this.canvas=t,this.context=r,this.canvasFormat=i,this.accumFormat=e.features.has("float32-blendable")?"rgba32float":"rgba16float";const s=(f,h)=>e.createBuffer({size:f,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST,label:h});this.viewBuf=s(32,"viewer view"),this.resolveBuf=s(64,"viewer resolve"),this.ringBuf=s(32,"viewer rings"),this.dotBuf=s(32,"viewer dots"),this.splatLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const n=f=>({binding:f,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"unfilterable-float"}});this.resolveLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},n(1),n(2),n(3),{binding:4,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"uint"}}]}),this.blitLayout=e.createBindGroupLayout({entries:[n(0)]}),this.lineLayout=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});const o=e.createShaderModule({code:ir,label:"viewer splat"});this.splatPipeline=e.createRenderPipeline({label:"viewer splat",layout:e.createPipelineLayout({bindGroupLayouts:[this.splatLayout]}),vertex:{module:o,entryPoint:"vs_main",buffers:[{arrayStride:re*4,stepMode:"instance",attributes:Je}]},fragment:{module:o,entryPoint:"fs_main",targets:[{format:this.accumFormat,blend:{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-list"}});const c=e.createShaderModule({code:ar,label:"viewer resolve"});this.resolvePipeline=e.createRenderPipeline({label:"viewer resolve",layout:e.createPipelineLayout({bindGroupLayouts:[this.resolveLayout]}),vertex:{module:c,entryPoint:"vs_main"},fragment:{module:c,entryPoint:"fs_main",targets:[{format:"rgba8unorm"}]},primitive:{topology:"triangle-list"}});const u=e.createShaderModule({code:sr,label:"viewer blit"});this.blitPipeline=e.createRenderPipeline({label:"viewer blit",layout:e.createPipelineLayout({bindGroupLayouts:[this.blitLayout]}),vertex:{module:u,entryPoint:"vs_main"},fragment:{module:u,entryPoint:"fs_main",targets:[{format:i}]},primitive:{topology:"triangle-list"}});const l=(f,h)=>e.createRenderPipeline({label:h,layout:e.createPipelineLayout({bindGroupLayouts:[this.lineLayout]}),vertex:{module:e.createShaderModule({code:f,label:h}),entryPoint:"vs_main",buffers:[{arrayStride:re*4,stepMode:"instance",attributes:Je}]},fragment:{module:e.createShaderModule({code:f,label:h}),entryPoint:"fs_main",targets:[{format:"rgba8unorm",blend:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}]},primitive:{topology:"triangle-list"}});this.ringPipeline=l(or,"viewer rings"),this.dotPipeline=l(nr,"viewer dots"),this.imageTex=this.makeDummy("rgba32float"),this.densityTex=this.makeDummy("r32float"),this.ownerTex=this.makeDummy("r32uint"),this.resize(t.width||1,t.height||1)}static async create(e,t){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not available in this browser");if(!t){const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("WebGPU: no adapter");const n=["float32-blendable"];t=await s.requestDevice({requiredFeatures:n.filter(o=>s.features.has(o))})}const r=e.getContext("webgpu");if(!r)throw new Error("WebGPU: canvas context unavailable");const i=navigator.gpu.getPreferredCanvasFormat();return r.configure({device:t,format:i,alphaMode:"opaque"}),new $e(t,e,r,i)}makeDummy(e){return this.device.createTexture({size:[1,1],format:e,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST})}resize(e,t){e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),this.canvas.width!==e&&(this.canvas.width=e),this.canvas.height!==t&&(this.canvas.height=t),!(e===this.width&&t===this.height&&this.accumTex)&&(this.width=e,this.height=t,this.accumTex?.destroy(),this.displayTex?.destroy(),this.accumTex=this.device.createTexture({size:[e,t],format:this.accumFormat,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING,label:"viewer accum"}),this.displayTex=this.device.createTexture({size:[e,t],format:"rgba8unorm",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC,label:"viewer display"}))}setState(e,t,r){this.srcW=t,this.srcH=r;const i=ot(e,t,r);this.instanceCount=e.xy.length/2,this.instanceBuf?.destroy(),this.instanceBuf=this.device.createBuffer({size:Math.max(16,i.byteLength),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST,label:"viewer instances"}),this.device.queue.writeBuffer(this.instanceBuf,0,i)}setImage(e,t,r){if(this.imageTex.destroy(),!e){this.imageTex=this.makeDummy("rgba32float"),this.hasImage=!1;return}this.imageTex=this.device.createTexture({size:[t,r],format:"rgba32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"viewer image"});const i=vt(e,t,r);this.device.queue.writeTexture({texture:this.imageTex},i,{bytesPerRow:t*16,rowsPerImage:r},[t,r]),this.hasImage=!0}setDensity(e,t,r){if(this.densityTex.destroy(),!e){this.densityTex=this.makeDummy("r32float"),this.hasDensity=!1;return}this.densityTex=this.device.createTexture({size:[t,r],format:"r32float",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"viewer density"}),this.device.queue.writeTexture({texture:this.densityTex},e,{bytesPerRow:t*4,rowsPerImage:r},[t,r]),this.densityMax=yt(e),this.hasDensity=!0}setOwners(e,t,r){if(this.ownerTex.destroy(),!e){this.ownerTex=this.makeDummy("r32uint"),this.hasVoronoi=!1;return}this.ownerTex=this.device.createTexture({size:[t,r],format:"r32uint",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST,label:"viewer owners"}),this.device.queue.writeTexture({texture:this.ownerTex},e,{bytesPerRow:t*4,rowsPerImage:r},[t,r]),this.hasVoronoi=!0}render(e){if(this.disposed||!this.accumTex||!this.displayTex)return;const{device:t}=this,r=this.width,i=this.height;t.queue.writeBuffer(this.viewBuf,0,new Float32Array([e.zoom,e.tx,e.ty,0,r,i,0,0]));const s=this.resolveParams(e);t.queue.writeBuffer(this.resolveBuf,0,new Float32Array([s.zoom,s.tx,s.ty,s.gain,s.canvasW,s.canvasH,s.srcW,s.srcH,s.densityMax,s.flags,s.hasImage,s.hasDensity,s.hasVoronoi,s.borderMix,0,0]));const n=t.createCommandEncoder({label:"viewer frame"}),o=n.beginRenderPass({colorAttachments:[{view:this.accumTex.createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:0},storeOp:"store"}]});this.instanceBuf&&this.instanceCount>0&&(o.setPipeline(this.splatPipeline),o.setBindGroup(0,t.createBindGroup({layout:this.splatLayout,entries:[{binding:0,resource:{buffer:this.viewBuf}}]})),o.setVertexBuffer(0,this.instanceBuf),o.draw(6,this.instanceCount)),o.end();const c=this.displayTex.createView(),u=n.beginRenderPass({colorAttachments:[{view:c,loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});u.setPipeline(this.resolvePipeline),u.setBindGroup(0,t.createBindGroup({layout:this.resolveLayout,entries:[{binding:0,resource:{buffer:this.resolveBuf}},{binding:1,resource:this.accumTex.createView()},{binding:2,resource:this.imageTex.createView()},{binding:3,resource:this.densityTex.createView()},{binding:4,resource:this.ownerTex.createView()}]})),u.draw(3),u.end();const l=this.instanceBuf!==null&&this.instanceCount>0,f=this.overlays.ellipses&&l,h=this.overlays.centers&&l;if(f||h){const p=n.beginRenderPass({colorAttachments:[{view:c,loadOp:"load",storeOp:"store"}]});if(f&&(t.queue.writeBuffer(this.ringBuf,0,new Float32Array([e.zoom,e.tx,e.ty,this.overlays.ellipseSigma,r,i,this.overlays.ellipseWidth,0])),p.setPipeline(this.ringPipeline),p.setBindGroup(0,t.createBindGroup({layout:this.lineLayout,entries:[{binding:0,resource:{buffer:this.ringBuf}}]})),p.setVertexBuffer(0,this.instanceBuf),p.draw(6,this.instanceCount)),h){const g=gt(e.zoom,this.srcW,this.srcH,this.instanceCount);t.queue.writeBuffer(this.dotBuf,0,new Float32Array([e.zoom,e.tx,e.ty,g.radius,r,i,g.alpha,0])),p.setPipeline(this.dotPipeline),p.setBindGroup(0,t.createBindGroup({layout:this.lineLayout,entries:[{binding:0,resource:{buffer:this.dotBuf}}]})),p.setVertexBuffer(0,this.instanceBuf),p.draw(6,this.instanceCount)}p.end()}const d=n.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),loadOp:"clear",clearValue:{r:0,g:0,b:0,a:1},storeOp:"store"}]});d.setPipeline(this.blitPipeline),d.setBindGroup(0,t.createBindGroup({layout:this.blitLayout,entries:[{binding:0,resource:c}]})),d.draw(3),d.end(),t.queue.submit([n.finish()])}async readPixels(){if(!this.displayTex)return new Uint8ClampedArray(0);const e=this.width,t=this.height,r=Math.ceil(e*4/256)*256,i=this.device.createBuffer({size:r*t,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),s=this.device.createCommandEncoder();s.copyTextureToBuffer({texture:this.displayTex},{buffer:i,bytesPerRow:r,rowsPerImage:t},[e,t]),this.device.queue.submit([s.finish()]),await i.mapAsync(GPUMapMode.READ);const n=new Uint8Array(i.getMappedRange()),o=new Uint8ClampedArray(e*t*4);for(let c=0;c<t;c++)o.set(n.subarray(c*r,c*r+e*4),c*e*4);return i.unmap(),i.destroy(),o}dispose(){this.disposed=!0,this.accumTex?.destroy(),this.displayTex?.destroy(),this.instanceBuf?.destroy(),this.imageTex.destroy(),this.densityTex.destroy(),this.ownerTex.destroy(),this.viewBuf.destroy(),this.resolveBuf.destroy(),this.ringBuf.destroy(),this.dotBuf.destroy();try{this.context.unconfigure()}catch{}}}const cr=`#version 300 es
precision highp float;
uniform vec4 uView; uniform vec2 uCanvas;
layout(location=0) in vec2 aCenter; layout(location=1) in vec3 aConic; layout(location=2) in vec3 aColor;
layout(location=3) in vec2 aExt; layout(location=4) in float aValid;
flat out vec2 vCenter; flat out vec3 vConic; flat out vec3 vColor;
const vec2 corners[6] = vec2[6](vec2(-1.0,-1.0), vec2(1.0,-1.0), vec2(-1.0,1.0), vec2(-1.0,1.0), vec2(1.0,-1.0), vec2(1.0,1.0));
void main() {
  vec2 c = corners[gl_VertexID];
  vec2 dc = vec2(uView.x * (aCenter.x + 0.5) + uView.y, uView.x * (aCenter.y + 0.5) + uView.z);
  vec2 hv = aExt * uView.x + vec2(1.0);
  vec2 p = dc + c * hv;
  if (aValid < 0.5) p = vec2(-10.0);
  gl_Position = vec4(p.x / uCanvas.x * 2.0 - 1.0, 1.0 - p.y / uCanvas.y * 2.0, 0.0, 1.0);
  vCenter = aCenter; vConic = aConic; vColor = aColor;
}`,ur=`#version 300 es
precision highp float;
uniform vec4 uView; uniform vec2 uCanvas;
flat in vec2 vCenter; flat in vec3 vConic; flat in vec3 vColor;
out vec4 o;
${Gt}
void main() {
  float X = gl_FragCoord.x; float Y = uCanvas.y - gl_FragCoord.y;
  float sx = (X - uView.y) / uView.x - 0.5; float sy = (Y - uView.z) / uView.x - 0.5;
  float a = splat_alpha(vCenter.x - sx, vCenter.y - sy, vConic);
  if (a <= 0.0) discard;
  o = vec4(vColor * a, 1.0);
}`,lr=`#version 300 es
precision highp float;
const vec2 pts[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main() { gl_Position = vec4(pts[gl_VertexID], 0.0, 1.0); }`,fr=`#version 300 es
precision highp float;
uniform vec4 uView; uniform vec2 uCanvas; uniform vec2 uSrc; uniform float uDensityMax;
uniform int uFlags; uniform int uHasImage; uniform int uHasDensity; uniform int uHasVoronoi; uniform float uBorderMix;
uniform sampler2D uAccum; uniform sampler2D uImage; uniform sampler2D uDensity; uniform highp usampler2D uOwners;
out vec4 o;
${tr}
${Qt}
void main() {
  ivec2 px = ivec2(gl_FragCoord.xy);
  vec3 r = clamp(texelFetch(uAccum, px, 0).rgb, 0.0, 1.0);
  r = floor(r * 255.0 + 0.5) / 255.0;
  vec2 dpos = vec2(gl_FragCoord.x, uCanvas.y - gl_FragCoord.y);
  vec2 s = (dpos - vec2(uView.y, uView.z)) / uView.x - 0.5;
  ivec2 si = ivec2(floor(s + 0.5));
  bool inside = si.x >= 0 && si.y >= 0 && si.x < int(uSrc.x) && si.y < int(uSrc.y);
  vec3 outc = r;
  if (!inside) {
    outc = vec3(0.12, 0.12, 0.13);
  } else {
    vec3 im = vec3(0.0);
    if (uHasImage == 1) im = texelFetch(uImage, si, 0).rgb;
    if ((uFlags & 1) != 0 && uHasImage == 1) outc = im;
    if ((uFlags & 2) != 0 && uHasImage == 1) outc = clamp(abs(r - im) * uView.w, 0.0, 1.0);
    if ((uFlags & 4) != 0 && uHasDensity == 1) { float d = texelFetch(uDensity, si, 0).r / max(uDensityMax, 1e-6); outc = colormap(clamp(d, 0.0, 1.0)); }
    if ((uFlags & 8) != 0 && uHasVoronoi == 1) {
      // Every cell is tinted by its owner; a border is one display pixel wide, found by comparing
      // with the source pixels under the next display pixel right and down.
      uint o = texelFetch(uOwners, si, 0).r;
      outc = mix(outc, cell_tint(o), ${ht});
      ivec2 sr = ivec2(floor(s + vec2(1.0 / uView.x, 0.0) + 0.5));
      ivec2 sd = ivec2(floor(s + vec2(0.0, 1.0 / uView.x) + 0.5));
      bool border = (sr.x < int(uSrc.x) && texelFetch(uOwners, sr, 0).r != o) || (sd.y < int(uSrc.y) && texelFetch(uOwners, sd, 0).r != o);
      if (border) outc = mix(outc, vec3(0.04, 0.04, 0.05), uBorderMix);
    }
  }
  o = vec4(outc, 1.0);
}`,dr=`#version 300 es
precision highp float;
uniform vec4 uDot; uniform vec2 uCanvas; uniform float uAlpha;
layout(location=0) in vec2 aCenter; layout(location=1) in vec3 aConic; layout(location=2) in vec3 aColor;
layout(location=3) in vec2 aExt; layout(location=4) in float aValid;
flat out vec2 vDc;
const vec2 corners[6] = vec2[6](vec2(-1.0,-1.0), vec2(1.0,-1.0), vec2(-1.0,1.0), vec2(-1.0,1.0), vec2(1.0,-1.0), vec2(1.0,1.0));
void main() {
  vec2 dc = vec2(uDot.x * (aCenter.x + 0.5) + uDot.y, uDot.x * (aCenter.y + 0.5) + uDot.z);
  vec2 p = dc + corners[gl_VertexID] * (uDot.w + 2.0);
  if (aValid < 0.5) p = vec2(-10.0);
  gl_Position = vec4(p.x / uCanvas.x * 2.0 - 1.0, 1.0 - p.y / uCanvas.y * 2.0, 0.0, 1.0);
  vDc = dc;
}`,hr=`#version 300 es
precision highp float;
uniform vec4 uDot; uniform vec2 uCanvas; uniform float uAlpha;
flat in vec2 vDc;
out vec4 o;
void main() {
  vec2 dpos = vec2(gl_FragCoord.x, uCanvas.y - gl_FragCoord.y);
  float d = length(dpos - vDc);
  float core = 1.0 - smoothstep(uDot.w - 0.5, uDot.w + 0.5, d);
  float halo = 1.0 - smoothstep(uDot.w + 0.5, uDot.w + 1.5, d);
  if (halo <= 0.002) discard;
  float alpha = max(core * ${ge}, halo * ${pt}) * uAlpha;
  o = vec4(vec3(${K[0]}, ${K[1]}, ${K[2]}) * core * ${ge} * uAlpha, alpha);
}`,pr=`#version 300 es
precision highp float;
uniform vec4 uRing; uniform vec2 uCanvas; uniform float uWidth;
layout(location=0) in vec2 aCenter; layout(location=1) in vec3 aConic; layout(location=2) in vec3 aColor;
layout(location=3) in vec2 aExt; layout(location=4) in float aValid;
flat out vec2 vCenter; flat out vec3 vConic; flat out float vFade;
const vec2 corners[6] = vec2[6](vec2(-1.0,-1.0), vec2(1.0,-1.0), vec2(-1.0,1.0), vec2(-1.0,1.0), vec2(1.0,-1.0), vec2(1.0,1.0));
void main() {
  vec2 c = corners[gl_VertexID];
  vec2 dc = vec2(uRing.x * (aCenter.x + 0.5) + uRing.y, uRing.x * (aCenter.y + 0.5) + uRing.z);
  vec2 radius = aExt * (uRing.w / ${st}) * uRing.x;
  vec2 p = dc + c * (radius + vec2(uWidth + 2.5));
  if (aValid < 0.5) p = vec2(-10.0);
  gl_Position = vec4(p.x / uCanvas.x * 2.0 - 1.0, 1.0 - p.y / uCanvas.y * 2.0, 0.0, 1.0);
  vCenter = aCenter; vConic = aConic;
  float rpx = max(radius.x, radius.y);
  vFade = ${Jt};
}`,gr=`#version 300 es
precision highp float;
uniform vec4 uRing; uniform vec2 uCanvas; uniform float uWidth;
flat in vec2 vCenter; flat in vec3 vConic; flat in float vFade;
out vec4 o;
void main() {
  float X = gl_FragCoord.x; float Y = uCanvas.y - gl_FragCoord.y;
  float sx = (X - uRing.y) / uRing.x - 0.5; float sy = (Y - uRing.z) / uRing.x - 0.5;
  float dx = vCenter.x - sx; float dy = vCenter.y - sy;
  float d = sqrt(max(vConic.x * dx * dx + 2.0 * vConic.y * dx * dy + vConic.z * dy * dy, 0.0));
  float px = abs(d - uRing.w) / max(fwidth(d), 1e-6);
  float core = 1.0 - smoothstep(uWidth * 0.5 - 0.5, uWidth * 0.5 + 0.5, px);
  float halo = 1.0 - smoothstep(uWidth * 0.5 + 0.5, uWidth * 0.5 + 1.5, px);
  if (halo <= 0.002) discard;
  float alpha = max(core * ${me}, halo * ${mt}) * vFade;
  o = vec4(vec3(${J[0]}, ${J[1]}, ${J[2]}) * core * ${me} * vFade, alpha);
}`;function ne(a,e,t,r){const i=(n,o)=>{const c=a.createShader(n);if(a.shaderSource(c,o),a.compileShader(c),!a.getShaderParameter(c,a.COMPILE_STATUS))throw new Error(`${r}: ${a.getShaderInfoLog(c)}`);return c},s=a.createProgram();if(a.attachShader(s,i(a.VERTEX_SHADER,e)),a.attachShader(s,i(a.FRAGMENT_SHADER,t)),a.linkProgram(s),!a.getProgramParameter(s,a.LINK_STATUS))throw new Error(`${r}: ${a.getProgramInfoLog(s)}`);return s}class mr extends ft{canvas;kind="webgl2";gl;accumFormat;instanceBuf;instanceVao;accumTex=null;accumFbo=null;displayTex=null;displayFbo=null;imageTex;densityTex;ownerTex;splatProg;resolveProg;dotProg;ringProg;accumInternalFormat;accumType;constructor(e){super(),this.canvas=e;const t=e.getContext("webgl2",{antialias:!1,alpha:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1});if(!t)throw new Error("WebGL2 is not available");this.gl=t;const r=t.getExtension("EXT_color_buffer_float"),i=t.getExtension("EXT_color_buffer_half_float");if(!r&&!i)throw new Error("WebGL2 backend needs EXT_color_buffer_float or EXT_color_buffer_half_float for float accumulation");const s=t.getExtension("EXT_float_blend");r&&s?(this.accumInternalFormat=t.RGBA32F,this.accumType=t.FLOAT,this.accumFormat="rgba32float"):(this.accumInternalFormat=t.RGBA16F,this.accumType=t.HALF_FLOAT,this.accumFormat="rgba16float"),this.splatProg=ne(t,cr,ur,"viewer splat"),this.resolveProg=ne(t,lr,fr,"viewer resolve"),this.dotProg=ne(t,dr,hr,"viewer dots"),this.ringProg=ne(t,pr,gr,"viewer rings"),this.instanceBuf=t.createBuffer(),this.instanceVao=t.createVertexArray(),t.bindVertexArray(this.instanceVao),t.bindBuffer(t.ARRAY_BUFFER,this.instanceBuf);const n=re*4,o=(c,u,l)=>{t.enableVertexAttribArray(c),t.vertexAttribPointer(c,u,t.FLOAT,!1,n,l),t.vertexAttribDivisor(c,1)};for(const c of dt)o(c.location,c.size,c.offset);t.bindVertexArray(null),this.imageTex=t.createTexture(),this.densityTex=t.createTexture(),this.ownerTex=t.createTexture();for(const c of[this.imageTex,this.densityTex,this.ownerTex])t.bindTexture(t.TEXTURE_2D,c),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);t.bindTexture(t.TEXTURE_2D,this.imageTex),t.texImage2D(t.TEXTURE_2D,0,t.RGBA32F,1,1,0,t.RGBA,t.FLOAT,new Float32Array(4)),t.bindTexture(t.TEXTURE_2D,this.densityTex),t.texImage2D(t.TEXTURE_2D,0,t.R32F,1,1,0,t.RED,t.FLOAT,new Float32Array(1)),t.bindTexture(t.TEXTURE_2D,this.ownerTex),t.texImage2D(t.TEXTURE_2D,0,t.R32UI,1,1,0,t.RED_INTEGER,t.UNSIGNED_INT,new Uint32Array(1)),this.resize(e.width||1,e.height||1)}makeTarget(e,t,r,i,s){const{gl:n}=this,o=n.createTexture();n.bindTexture(n.TEXTURE_2D,o),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),n.texImage2D(n.TEXTURE_2D,0,e,i,s,0,t,r,null);const c=n.createFramebuffer();n.bindFramebuffer(n.FRAMEBUFFER,c),n.framebufferTexture2D(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,o,0);const u=n.checkFramebufferStatus(n.FRAMEBUFFER);if(n.bindFramebuffer(n.FRAMEBUFFER,null),u!==n.FRAMEBUFFER_COMPLETE)throw new Error(`WebGL2 framebuffer incomplete: ${u}`);return{tex:o,fbo:c}}resize(e,t){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),this.canvas.width!==e&&(this.canvas.width=e),this.canvas.height!==t&&(this.canvas.height=t),e===this.width&&t===this.height&&this.accumFbo)return;const{gl:r}=this;this.width=e,this.height=t,this.accumTex&&r.deleteTexture(this.accumTex),this.accumFbo&&r.deleteFramebuffer(this.accumFbo),this.displayTex&&r.deleteTexture(this.displayTex),this.displayFbo&&r.deleteFramebuffer(this.displayFbo),{tex:this.accumTex,fbo:this.accumFbo}=this.makeTarget(this.accumInternalFormat,r.RGBA,this.accumType,e,t),{tex:this.displayTex,fbo:this.displayFbo}=this.makeTarget(r.RGBA8,r.RGBA,r.UNSIGNED_BYTE,e,t)}setState(e,t,r){const{gl:i}=this;this.srcW=t,this.srcH=r;const s=ot(e,t,r);this.instanceCount=e.xy.length/2,i.bindBuffer(i.ARRAY_BUFFER,this.instanceBuf),i.bufferData(i.ARRAY_BUFFER,s,i.STATIC_DRAW)}setImage(e,t,r){const{gl:i}=this;if(i.bindTexture(i.TEXTURE_2D,this.imageTex),!e){i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,1,1,0,i.RGBA,i.FLOAT,new Float32Array(4)),this.hasImage=!1;return}i.texImage2D(i.TEXTURE_2D,0,i.RGBA32F,t,r,0,i.RGBA,i.FLOAT,vt(e,t,r)),this.hasImage=!0}setDensity(e,t,r){const{gl:i}=this;if(i.bindTexture(i.TEXTURE_2D,this.densityTex),!e){i.texImage2D(i.TEXTURE_2D,0,i.R32F,1,1,0,i.RED,i.FLOAT,new Float32Array(1)),this.hasDensity=!1;return}i.pixelStorei(i.UNPACK_ALIGNMENT,1),i.texImage2D(i.TEXTURE_2D,0,i.R32F,t,r,0,i.RED,i.FLOAT,e),i.pixelStorei(i.UNPACK_ALIGNMENT,4),this.densityMax=yt(e),this.hasDensity=!0}setOwners(e,t,r){const{gl:i}=this;if(i.bindTexture(i.TEXTURE_2D,this.ownerTex),!e){i.texImage2D(i.TEXTURE_2D,0,i.R32UI,1,1,0,i.RED_INTEGER,i.UNSIGNED_INT,new Uint32Array(1)),this.hasVoronoi=!1;return}i.texImage2D(i.TEXTURE_2D,0,i.R32UI,t,r,0,i.RED_INTEGER,i.UNSIGNED_INT,e),this.hasVoronoi=!0}render(e){if(this.disposed||!this.accumFbo||!this.displayFbo)return;const{gl:t}=this,r=this.width,i=this.height;t.viewport(0,0,r,i),t.disable(t.DEPTH_TEST),t.disable(t.CULL_FACE),t.bindFramebuffer(t.FRAMEBUFFER,this.accumFbo),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),this.instanceCount>0&&(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE),t.useProgram(this.splatProg),t.uniform4f(t.getUniformLocation(this.splatProg,"uView"),e.zoom,e.tx,e.ty,0),t.uniform2f(t.getUniformLocation(this.splatProg,"uCanvas"),r,i),t.bindVertexArray(this.instanceVao),t.drawArraysInstanced(t.TRIANGLES,0,6,this.instanceCount),t.bindVertexArray(null),t.disable(t.BLEND)),t.bindFramebuffer(t.FRAMEBUFFER,this.displayFbo),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(this.resolveProg);const s=u=>t.getUniformLocation(this.resolveProg,u),n=this.resolveParams(e);t.uniform4f(s("uView"),n.zoom,n.tx,n.ty,n.gain),t.uniform2f(s("uCanvas"),n.canvasW,n.canvasH),t.uniform2f(s("uSrc"),n.srcW,n.srcH),t.uniform1f(s("uDensityMax"),n.densityMax),t.uniform1i(s("uFlags"),n.flags),t.uniform1i(s("uHasImage"),n.hasImage),t.uniform1i(s("uHasDensity"),n.hasDensity),t.uniform1i(s("uHasVoronoi"),n.hasVoronoi),t.uniform1f(s("uBorderMix"),n.borderMix),t.activeTexture(t.TEXTURE0),t.bindTexture(t.TEXTURE_2D,this.accumTex),t.uniform1i(s("uAccum"),0),t.activeTexture(t.TEXTURE1),t.bindTexture(t.TEXTURE_2D,this.imageTex),t.uniform1i(s("uImage"),1),t.activeTexture(t.TEXTURE2),t.bindTexture(t.TEXTURE_2D,this.densityTex),t.uniform1i(s("uDensity"),2),t.activeTexture(t.TEXTURE3),t.bindTexture(t.TEXTURE_2D,this.ownerTex),t.uniform1i(s("uOwners"),3),t.drawArrays(t.TRIANGLES,0,3);const o=this.overlays.ellipses&&this.instanceCount>0,c=this.overlays.centers&&this.instanceCount>0;if(o||c){if(t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),o&&(t.useProgram(this.ringProg),t.uniform4f(t.getUniformLocation(this.ringProg,"uRing"),e.zoom,e.tx,e.ty,this.overlays.ellipseSigma),t.uniform2f(t.getUniformLocation(this.ringProg,"uCanvas"),r,i),t.uniform1f(t.getUniformLocation(this.ringProg,"uWidth"),this.overlays.ellipseWidth),t.bindVertexArray(this.instanceVao),t.drawArraysInstanced(t.TRIANGLES,0,6,this.instanceCount)),c){const u=gt(e.zoom,this.srcW,this.srcH,this.instanceCount);t.useProgram(this.dotProg),t.uniform4f(t.getUniformLocation(this.dotProg,"uDot"),e.zoom,e.tx,e.ty,u.radius),t.uniform2f(t.getUniformLocation(this.dotProg,"uCanvas"),r,i),t.uniform1f(t.getUniformLocation(this.dotProg,"uAlpha"),u.alpha),t.bindVertexArray(this.instanceVao),t.drawArraysInstanced(t.TRIANGLES,0,6,this.instanceCount)}t.bindVertexArray(null),t.disable(t.BLEND)}t.bindFramebuffer(t.READ_FRAMEBUFFER,this.displayFbo),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.blitFramebuffer(0,0,r,i,0,0,r,i,t.COLOR_BUFFER_BIT,t.NEAREST),t.bindFramebuffer(t.FRAMEBUFFER,null)}async readPixels(){const{gl:e}=this,t=this.width,r=this.height,i=new Uint8Array(t*r*4);e.bindFramebuffer(e.FRAMEBUFFER,this.displayFbo),e.readPixels(0,0,t,r,e.RGBA,e.UNSIGNED_BYTE,i),e.bindFramebuffer(e.FRAMEBUFFER,null);const s=new Uint8ClampedArray(t*r*4);for(let n=0;n<r;n++)s.set(i.subarray((r-1-n)*t*4,(r-n)*t*4),n*t*4);return s}dispose(){this.disposed=!0;const{gl:e}=this;e.deleteProgram(this.splatProg),e.deleteProgram(this.resolveProg),e.deleteProgram(this.dotProg),e.deleteProgram(this.ringProg),e.deleteBuffer(this.instanceBuf),e.deleteVertexArray(this.instanceVao),this.accumTex&&e.deleteTexture(this.accumTex),this.displayTex&&e.deleteTexture(this.displayTex),this.accumFbo&&e.deleteFramebuffer(this.accumFbo),this.displayFbo&&e.deleteFramebuffer(this.displayFbo),e.deleteTexture(this.imageTex),e.deleteTexture(this.densityTex),e.deleteTexture(this.ownerTex)}}class vr{canvas;ready;backendKind=null;backend=null;scene=null;k=0;view={zoom:1,tx:0,ty:0};viewSet=!1;overlays={centers:!1,ellipses:!1,density:!1,voronoi:!1,diff:!1,image:!1};diffGain=4;ellipseSigma=1;ellipseWidth=1.25;ownerMaps=new WeakMap;listeners=new Map;uploaded=null;pixelRatio;frame=null;disposed=!1;dragging=null;pointers=new Map;pinch=null;cleanup=[];resizeObserver=null;constructor(e,t){this.canvas=e,this.pixelRatio=t.pixelRatio??(typeof window<"u"&&window.devicePixelRatio||1),this.ready=this.init(t),this.attachControls()}async init(e){const t=e.backend??"auto";let r=null,i=null;if(t==="auto"||t==="webgpu")try{r=await $e.create(this.canvas,e.device)}catch(s){if(i=s,t==="webgpu")throw s}if(!r&&(t==="auto"||t==="webgl2"))try{r=new mr(this.canvas)}catch(s){throw new Error(`no viewer backend: ${String(i??"")} / ${String(s)}`)}if(!r||this.disposed){r?.dispose();return}this.backend=r,this.backendKind=r.kind,this.syncSize(),typeof ResizeObserver<"u"&&this.canvas.isConnected&&(this.resizeObserver=new ResizeObserver(()=>{this.syncSize(),this.requestRender()}),this.resizeObserver.observe(this.canvas)),this.scene&&this.applyScene(),this.requestRender()}syncSize(){if(!this.backend)return;const e=this.canvas.clientWidth,t=this.canvas.clientHeight,r=e>0?Math.round(e*this.pixelRatio):this.canvas.width,i=t>0?Math.round(t*this.pixelRatio):this.canvas.height;this.backend.resize(Math.max(1,r),Math.max(1,i))}applyScene(){if(!this.backend||!this.scene)return;const e=this.scene;this.k=Math.min(this.k,e.states.length-1),this.backend.setState(e.states[this.k],e.width,e.height);const t=e.image instanceof Float32Array?e.image:null,r=e.density??null,i=this.uploaded,s=i!==null&&i.width===e.width&&i.height===e.height;(!s||i.image!==t)&&this.backend.setImage(t,e.width,e.height),(!s||i.density!==r)&&this.backend.setDensity(r,e.width,e.height),this.uploaded={image:t,density:r,width:e.width,height:e.height},this.pushOverlays(),(!this.viewSet||!s)&&this.fit()}pushOverlays(){this.backend&&(this.backend.setOverlays({...this.overlays,diffGain:this.diffGain,ellipseSigma:this.ellipseSigma,ellipseWidth:this.ellipseWidth}),this.syncVoronoi())}syncVoronoi(){if(!this.backend)return;if(!this.overlays.voronoi||!this.scene){this.backend.setOwners(null,0,0);return}const e=this.scene,t=e.states[this.k];let r=this.ownerMaps.get(t);r||(r=Lt(t.xy,e.width,e.height),this.ownerMaps.set(t,r)),this.backend.setOwners(new Uint32Array(r.buffer,r.byteOffset,r.length),e.width,e.height)}setScene(e){if(e.states.length===0)throw new Error("scene has no states");this.scene=e,this.k=0,this.applyScene(),this.requestRender(),this.emit("statechange",{k:this.k})}setState(e){if(!this.scene)return;const t=Math.max(0,Math.min(this.scene.states.length-1,Math.floor(e)));t===this.k&&this.backend||(this.k=t,this.backend?.setState(this.scene.states[this.k],this.scene.width,this.scene.height),this.overlays.voronoi&&this.syncVoronoi(),this.requestRender(),this.emit("statechange",{k:this.k}))}getState(){return this.k}setView(e){this.view={zoom:Math.max(.001,e.zoom),tx:e.tx,ty:e.ty},this.viewSet=!0,this.requestRender(),this.emit("viewchange",{...this.view})}getView(){return{...this.view}}fit(){if(!this.scene)return;const e=this.canvas.width,t=this.canvas.height,r=Math.min(e/this.scene.width,t/this.scene.height);this.setView({zoom:r,tx:(e-this.scene.width*r)/2,ty:(t-this.scene.height*r)/2})}oneToOne(){if(!this.scene)return;const e=this.canvas.width,t=this.canvas.height;this.setView({zoom:1,tx:Math.floor((e-this.scene.width)/2),ty:Math.floor((t-this.scene.height)/2)})}setOverlay(e,t,r){this.overlays[e]=t,r&&typeof r.gain=="number"&&(this.diffGain=r.gain),r&&typeof r.sigma=="number"&&(this.ellipseSigma=r.sigma),r&&typeof r.width=="number"&&(this.ellipseWidth=r.width),this.pushOverlays(),this.requestRender()}psnr(e){if(!this.scene||!(this.scene.image instanceof Float32Array))return null;const t=this.scene.states[e??this.k];if(!t)return null;t.rendered??=Ut(t,this.scene.width,this.scene.height);const r=this.scene.crop??{w:this.scene.width,h:this.scene.height};return Mt(t.rendered,this.scene.image,this.scene.width,this.scene.height,r.w,r.h)}async exportPng(){await this.renderNow();const e=await this.readPixels(),t=this.canvas.width,r=this.canvas.height,i=document.createElement("canvas");i.width=t,i.height=r;const s=i.getContext("2d");if(!s)throw new Error("2D context unavailable for PNG export");return s.putImageData(new ImageData(e,t,r),0,0),new Promise((n,o)=>i.toBlob(c=>c?n(c):o(new Error("toBlob failed")),"image/png"))}on(e,t){let r=this.listeners.get(e);return r||(r=new Set,this.listeners.set(e,r)),r.add(t),()=>{r.delete(t)}}emit(e,t){this.listeners.get(e)?.forEach(r=>{try{r(t)}catch{}})}toSource(e,t){return{x:(e-this.view.tx)/this.view.zoom-.5,y:(t-this.view.ty)/this.view.zoom-.5}}requestRender(){if(this.frame!==null||this.disposed)return;const e=typeof requestAnimationFrame=="function"?requestAnimationFrame:t=>setTimeout(()=>t(performance.now()),16);this.frame=e(()=>{this.frame=null,this.renderFrame()})}renderFrame(){!this.backend||!this.scene||this.backend.render(this.view)}async renderNow(){await this.ready,this.frame!==null&&typeof cancelAnimationFrame=="function"&&(cancelAnimationFrame(this.frame),this.frame=null),this.renderFrame()}async readPixels(){return await this.ready,this.backend?this.backend.readPixels():new Uint8ClampedArray(0)}displayPoint(e){const t=this.canvas.getBoundingClientRect(),r=t.width>0?this.canvas.width/t.width:1,i=t.height>0?this.canvas.height/t.height:1;return{x:(e.clientX-t.left)*r,y:(e.clientY-t.top)*i}}attachControls(){const e=this.canvas;if(typeof e.addEventListener!="function")return;e.hasAttribute("tabindex")||(e.tabIndex=0);const t=(u,l)=>{l=Math.max(.05,Math.min(64,l));const f=l/this.view.zoom;this.setView({zoom:l,tx:u.x-(u.x-this.view.tx)*f,ty:u.y-(u.y-this.view.ty)*f})},r=()=>{const[u,l]=[...this.pointers.values()];return{centre:{x:(u.x+l.x)/2,y:(u.y+l.y)/2},distance:Math.hypot(u.x-l.x,u.y-l.y)}},i=u=>{u.preventDefault(),t(this.displayPoint(u),this.view.zoom*Math.pow(1.1,-u.deltaY/100))},s=u=>{const l=this.displayPoint(u);this.pointers.set(u.pointerId,l),e.setPointerCapture?.(u.pointerId),this.pointers.size===2?(this.dragging=null,this.pinch={distance:r().distance,zoom:this.view.zoom}):this.dragging={x:l.x,y:l.y,tx:this.view.tx,ty:this.view.ty}},n=u=>{const l=this.displayPoint(u);if(this.pointers.has(u.pointerId)&&this.pointers.set(u.pointerId,l),this.pinch&&this.pointers.size>=2){const{centre:f,distance:h}=r();t(f,this.pinch.zoom*(h/Math.max(1,this.pinch.distance)))}else this.dragging?this.setView({zoom:this.view.zoom,tx:this.dragging.tx+(l.x-this.dragging.x),ty:this.dragging.ty+(l.y-this.dragging.y)}):this.emit("hover",{display:l,source:this.toSource(l.x,l.y)})},o=u=>{this.pointers.delete(u.pointerId),e.releasePointerCapture?.(u.pointerId),this.dragging=null,this.pinch=null;const l=[...this.pointers.values()];l.length===1&&(this.dragging={x:l[0].x,y:l[0].y,tx:this.view.tx,ty:this.view.ty})},c=u=>{u.key==="["?(this.setState(this.k-1),u.preventDefault()):u.key==="]"?(this.setState(this.k+1),u.preventDefault()):u.key==="1"?(this.oneToOne(),u.preventDefault()):(u.key==="f"||u.key==="F")&&(this.fit(),u.preventDefault())};e.addEventListener("wheel",i,{passive:!1}),e.addEventListener("pointerdown",s),e.addEventListener("pointermove",n),e.addEventListener("pointerup",o),e.addEventListener("pointercancel",o),e.addEventListener("keydown",c),this.cleanup.push(()=>{e.removeEventListener("wheel",i),e.removeEventListener("pointerdown",s),e.removeEventListener("pointermove",n),e.removeEventListener("pointerup",o),e.removeEventListener("pointercancel",o),e.removeEventListener("keydown",c)})}dispose(){this.disposed=!0,this.frame!==null&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(this.frame),this.frame=null,this.resizeObserver?.disconnect();for(const e of this.cleanup)e();this.backend?.dispose(),this.backend=null}}function yr(a,e={}){return new vr(a,e)}const Ze=[147,78,85,77,80,89];function fe(a){for(let g=0;g<Ze.length;g++)if(a[g]!==Ze[g])throw new Error("not an NPY file");const e=a[6],t=new DataView(a.buffer,a.byteOffset,a.byteLength);let r,i;if(e===1)r=t.getUint16(8,!0),i=10;else if(e===2||e===3)r=t.getUint32(8,!0),i=12;else throw new Error(`unsupported NPY version ${e}`);let s="";for(let g=i;g<i+r;g++)s+=String.fromCharCode(a[g]);const n=/'descr':\s*'([^']+)'/.exec(s),o=/'fortran_order':\s*(True|False)/.exec(s),c=/'shape':\s*\(([^)]*)\)/.exec(s);if(!n||!o||!c)throw new Error(`malformed NPY header: ${s}`);if(o[1]==="True")throw new Error("Fortran-order NPY arrays are not supported");const u=c[1].split(",").map(g=>g.trim()).filter(g=>g.length>0).map(g=>Number(g)),l=u.reduce((g,w)=>g*w,1),f=i+r,h=n[1],d=g=>{const w=l*g.BYTES_PER_ELEMENT;if(f+w>a.byteLength)throw new Error("NPY data truncated");const v=a.slice(f,f+w);return new g(v.buffer)};let p;switch(h){case"<f4":p=d(Float32Array);break;case"<f8":p=d(Float64Array);break;case"<i4":p=d(Int32Array);break;case"<u4":p=d(Uint32Array);break;case"<i8":p=d(BigInt64Array);break;case"|u1":case"|b1":case"|i1":p=d(Uint8Array);break;default:throw new Error(`unsupported NPY dtype ${h}`)}return{dtype:h,shape:u,data:p}}function de(a){if(a.data instanceof Float32Array)return a.data;const e=new Float32Array(a.data.length);if(a.data instanceof BigInt64Array)for(let t=0;t<e.length;t++)e[t]=Number(a.data[t]);else for(let t=0;t<e.length;t++)e[t]=Number(a.data[t]);return e}function wr(a){const e=a.data[0];return Number(e)}function br(a){let e="";for(let t=0;t<a.length;t++)e+=String.fromCharCode(a[t]);return e}function xr(a){const e=new DataView(a),t=new Uint8Array(a);let r=-1;for(let o=a.byteLength-22;o>=Math.max(0,a.byteLength-22-65535);o--)if(e.getUint32(o,!0)===101010256){r=o;break}if(r<0)throw new Error("not a zip archive: no end-of-central-directory record");const i=e.getUint16(r+10,!0);let s=e.getUint32(r+16,!0);const n=[];for(let o=0;o<i;o++){if(e.getUint32(s,!0)!==33639248)throw new Error("corrupt zip central directory");const c=e.getUint16(s+10,!0),u=e.getUint32(s+20,!0),l=e.getUint32(s+24,!0),f=e.getUint16(s+28,!0),h=e.getUint16(s+30,!0),d=e.getUint16(s+32,!0),p=e.getUint32(s+42,!0),g=br(t.subarray(s+46,s+46+f));if(e.getUint32(p,!0)!==67324752)throw new Error(`corrupt zip local header for ${g}`);const w=e.getUint16(p+26,!0),v=e.getUint16(p+28,!0),b=p+30+w+v;n.push({name:g,method:c,compressedSize:u,size:l,data:t.subarray(b,b+u)}),s+=46+f+h+d}return n}async function _r(a){const e=a.slice(),t=new Blob([e]).stream().pipeThrough(new DecompressionStream("deflate-raw"));return new Uint8Array(await new Response(t).arrayBuffer())}async function kr(a){if(a.method===0)return a.data.slice();if(a.method===8){const e=await _r(a.data);if(e.byteLength!==a.size)throw new Error(`zip entry ${a.name}: inflated ${e.byteLength} bytes, expected ${a.size}`);return e}throw new Error(`zip entry ${a.name}: unsupported compression method ${a.method}`)}async function Tr(a){const e=new Map;for(const t of xr(a))t.name.endsWith(".npy")&&e.set(t.name.slice(0,-4),fe(await kr(t)));return e}function Te(a,e,t,r,i,s,n){const o=a.length/2;if(!r||!i){if(!e)throw new Error(`state ${n??""}: needs log-covariance channels or scale and rotation`);({scale:r,rotation:i}=Le(e,o))}if(t||(t=new Float32Array(o*3).fill(1)),e&&e.length!==o*3)throw new Error("cov length mismatch");if(t.length!==o*3)throw new Error("color length mismatch");return{xy:a,cov:e,scale:r,rotation:i,color:t,rendered:s,label:n}}async function Er(a){const e=await Tr(a),t=b=>{const m=e.get(b);return m?de(m):void 0},r=b=>{const m=e.get(b);return m?wr(m):void 0};let i={};const s=e.get("meta");if(s&&s.data instanceof Uint8Array)try{i=JSON.parse(new TextDecoder().decode(s.data))}catch{i={}}let n=r("width"),o=r("height");const c=t("density"),u=e.get("density")?.shape,l=(e.get("final_rendered")??e.get("init_rendered")??e.get("image"))?.shape;if((!n||!o)&&u&&u.length===2&&(o=u[0],n=u[1]),(!n||!o)&&l&&l.length>=2&&(o=l[l.length-2],n=l[l.length-1]),(!n||!o)&&typeof i.width=="number"&&typeof i.height=="number"&&(n=i.width,o=i.height),!n||!o)throw new Error("NPZ scene: cannot determine width and height (need width/height, density, or a rendered image)");const f=[],h=t("states_xy");if(h){const b=e.get("states_xy").shape,m=b[0],_=b[1],T=t("states_cov"),R=t("states_color");for(let C=0;C<m;C++){const L=h.slice(C*_*2,(C+1)*_*2),U=T?T.slice(C*_*3,(C+1)*_*3):void 0,we=R?R.slice(C*_*3,(C+1)*_*3):void 0;f.push(Te(L,U,we,void 0,void 0,void 0,`state ${C}`))}}else{const b=t("points"),m=t("init_log_covariance_channels"),_=t("init_scale"),T=t("init_rotation");b&&(m||_&&T)&&f.push(Te(b,m,t("init_color"),_,T,t("init_rendered"),"initializer"));const R=t("final_points");R&&f.push(Te(R,t("final_log_covariance_channels"),t("final_color"),void 0,void 0,t("final_rendered"),"final"))}if(f.length===0)throw new Error("NPZ scene: no point states found (expected points, final_points, or states_xy)");const d=t("image"),p=i.crop&&typeof i.crop=="object"?i.crop:void 0,g=r("seed");g!==void 0&&(i.seed=g);const w=e.get("profile");w&&w.data instanceof Uint8Array&&(i.profile=new TextDecoder().decode(w.data));const v=t("point_weights");return v&&(i.point_weights=v),{width:n,height:o,crop:p,states:f,density:c,image:d,meta:i}}function Pr(a,e){const t=de(fe(new Uint8Array(a.points))),r=de(fe(new Uint8Array(a.cov))),i=de(fe(new Uint8Array(a.rgb))),s=t.length/2;if(r.length!==s*3||i.length!==s*3)throw new Error("NPY triple: array lengths disagree");const{scale:n,rotation:o}=Le(r,s);return{width:e.width,height:e.height,crop:e.crop,states:[{xy:t,cov:r,scale:n,rotation:o,color:i,label:"final"}],meta:{}}}function Ee(a,e){const t=a.xy.length/2;let r=null;const i=()=>r??=Le(a.cov,t),s={xy:a.xy,cov:a.cov,color:a.color,rendered:a.rendered,label:e};return Object.defineProperty(s,"scale",{get:()=>i().scale,set:n=>{r={scale:n,rotation:i().rotation}},enumerable:!0,configurable:!0}),Object.defineProperty(s,"rotation",{get:()=>i().rotation,set:n=>{r={scale:i().scale,rotation:n}},enumerable:!0,configurable:!0}),s}function Ar(a){const e=[],t=r=>r===0?"initializer":`refinement ${r}`;if(a.snapshots&&a.snapshots.length>0)for(const r of a.snapshots)e.push(Ee(r,t(r.k)));else a.init&&e.push(Ee(a.init,t(a.init.k))),a.final!==a.init&&e.push(Ee(a.final,t(a.final.k)));return{width:a.width,height:a.height,crop:a.crop,states:e,density:a.density,weights:a.weight,meta:{n:a.n,seed:a.seed}}}const wt=.01;function Sr(a,e={}){const t=a.states[e.stateIndex??a.states.length-1];if(!t)throw new Error("scene has no states");const r=t.xy.length/2,i=e.frame!=="padded"&&a.crop?a.crop:{w:a.width,h:a.height};if(i.w>65535||i.h>65535)throw new Error("splat2d stores the frame size as 16-bit integers");const s=new Uint8Array(12+32*r),n=new DataView(s.buffer);s.set([71,83,50,68],0),n.setUint32(4,r,!0),n.setUint16(8,i.h,!0),n.setUint16(10,i.w,!0);const o=new Float32Array(s.buffer,12,2*r),c=a.width/i.w,u=a.height/i.h;for(let d=0;d<r;d++)o[2*d]=t.xy[2*d]*c,o[2*d+1]=t.xy[2*d+1]*u;const l=new Float32Array(s.buffer,12+8*r,2*r);for(let d=0;d<2*r;d++)l[d]=1/Math.max(t.scale[d],wt);return new Float32Array(s.buffer,12+16*r,r).set(t.rotation.subarray(0,r)),new Float32Array(s.buffer,12+20*r,3*r).set(t.color),new Blob([s.buffer],{type:"application/octet-stream"})}function Rr(a){if(a.byteLength<12)throw new Error("splat2d: file too small");const e=new DataView(a);if(String.fromCharCode(e.getUint8(0),e.getUint8(1),e.getUint8(2),e.getUint8(3))!=="GS2D")throw new Error("splat2d: bad magic, expected GS2D");const r=e.getUint32(4,!0),i=e.getUint16(8,!0),s=e.getUint16(10,!0);if(a.byteLength!==12+32*r)throw new Error(`splat2d: ${a.byteLength} bytes, expected ${12+32*r} for ${r} Gaussians`);const n=(h,d)=>new Float32Array(a.slice(h,h+4*d)),o=n(12,2*r),c=n(12+8*r,2*r),u=n(12+16*r,r),l=n(12+20*r,3*r),f=new Float32Array(2*r);for(let h=0;h<2*r;h++)f[h]=1/Math.max(c[h],wt);return{width:s,height:i,states:[{xy:o,scale:f,rotation:u,color:l,label:"final"}],meta:{n:r,format:"splat2d"}}}(()=>{const a=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let r=0;r<8;r++)t=t&1?3988292384^t>>>1:t>>>1;a[e]=t>>>0}return a})();class Ce extends Error{}class G extends Error{}class Br extends Error{}class Cr extends Error{}async function Fr(a){const e=a instanceof Uint8Array?a:new Uint8Array(a),t=new Uint8Array(e.byteLength);t.set(e);const r=await crypto.subtle.digest("SHA-256",t.buffer);return Array.from(new Uint8Array(r),i=>i.toString(16).padStart(2,"0")).join("")}function Mr(a){const e=a.model,t=[];if(e.correction_predict_xy!==!0&&t.push("correction_predict_xy must be true"),e.correction_output_channels!==8&&t.push("correction_output_channels must be 8"),e.correction_input_channels!==17&&t.push("correction_input_channels must be 17"),Math.abs(e.correction_xy_step_pixels-2.56)>1e-9&&t.push("correction_xy_step_pixels must be 2.56"),e.decoder_density_aware!==!1&&t.push("decoder_density_aware must be false"),a.input.pad_multiple!==32&&t.push("input.pad_multiple must be 32"),t.length)throw new G(`web_bundle.json: ${t.join("; ")}`)}async function Lr(a,e=fetch){const t=a.endsWith("/")?a:a+"/",r=await e(t+"web_bundle.json");if(!r.ok)throw new G(`cannot fetch ${t}web_bundle.json: ${r.status}`);const i=await r.json();if(i.schema_version!==1)throw new G(`unsupported schema_version ${i.schema_version}`);Mr(i);const s=new Map;if(await Promise.all(i.files.map(async n=>{if(n.precision!=="f32")return;const o=await e(t+n.path);if(!o.ok)throw new G(`cannot fetch ${n.path}: ${o.status}`);const c=new Uint8Array(await o.arrayBuffer());if(c.byteLength!==n.bytes)throw new G(`${n.path}: size ${c.byteLength} != ${n.bytes}`);if(await Fr(c)!==n.sha256)throw new G(`${n.path}: sha256 mismatch`);s.set(`${n.role}:${n.shape}`,c)})),!s.has("forward_map:dynamic")||!s.has("correction_head:dynamic"))throw new G("bundle must contain dynamic forward_map and correction_head models");return{manifest:i,models:s}}function Ur(a){if(a instanceof Float32Array||typeof a.data<"u"&&a.data instanceof Float32Array){const o=a;if(o.data.length!==3*o.width*o.height)throw new Error("PlanarImage data length must be 3*width*height");return o}let e;if(typeof ImageData<"u"&&a instanceof ImageData)e=a;else{const o=a,u=new OffscreenCanvas(o.width,o.height).getContext("2d");if(!u)throw new Error("2d context unavailable");u.drawImage(o,0,0),e=u.getImageData(0,0,o.width,o.height)}const{width:t,height:r,data:i}=e,s=t*r,n=new Float32Array(3*s);for(let o=0;o<s;o++)n[o]=i[4*o]/255,n[s+o]=i[4*o+1]/255,n[2*s+o]=i[4*o+2]/255;return{data:n,width:t,height:r}}function Ne(a,e=32){const t=Ur(a),r=t.width,i=t.height,s=Math.ceil(r/e)*e,n=Math.ceil(i/e)*e;if(t.prepared===!0&&s===r&&n===i)return{planar:t.data,width:s,height:n,crop:{w:r,h:i}};const o=new Float32Array(3*s*n);for(let c=0;c<3;c++){const u=c*r*i,l=c*s*n;for(let f=0;f<n;f++){const h=Math.min(f,i-1),d=u+h*r,p=l+f*s;for(let w=0;w<r;w++){let v=t.data[d+w];v<0?v=0:v>1&&(v=1),o[p+w]=v}const g=o[p+r-1];for(let w=r;w<s;w++)o[p+w]=g}}return{planar:o,width:s,height:n,crop:{w:r,h:i}}}const $r=`
struct ScanParams { n: u32, pad0: u32, pad1: u32, pad2: u32 };
@group(0) @binding(0) var<uniform> sp: ScanParams;
@group(0) @binding(1) var<storage, read> input: array<u32>;
@group(0) @binding(2) var<storage, read_write> output: array<u32>;
var<workgroup> partials: array<u32, 256>;
@compute @workgroup_size(256) fn scan(@builtin(local_invocation_id) lid: vec3<u32>) {
  let n = sp.n;
  let per = (n + 255u) / 256u;
  let start = lid.x * per;
  var sum = 0u;
  for (var i = 0u; i < per; i++) { let j = start + i; if (j < n) { sum += input[j]; } }
  partials[lid.x] = sum;
  workgroupBarrier();
  for (var offset = 1u; offset < 256u; offset = offset << 1u) {
    var v = partials[lid.x];
    if (lid.x >= offset) { v += partials[lid.x - offset]; }
    workgroupBarrier();
    partials[lid.x] = v;
    workgroupBarrier();
  }
  var run = 0u;
  if (lid.x > 0u) { run = partials[lid.x - 1u]; }
  for (var i = 0u; i < per; i++) { let j = start + i; if (j < n) { output[j] = run; run += input[j]; } }
  if (lid.x == 255u) { output[n] = partials[255u]; }
}
`,Nr={code:$r,entryPoint:"scan",bindings:["uniform","read-only-storage","storage"],label:"scan"};class Ir{device;n;kernel;params;constructor(e,t){this.device=e,this.n=t,this.kernel=$.create(e,Nr),this.params=Ue(e,new Uint32Array([t,0,0,0]),"scan-params")}record(e,t,r){this.kernel.dispatch(e,[this.params,t,r],1)}dispose(){this.params.destroy()}}const I={image:0,density:3,logcov:4,rgb:7,rendered:10,diff:13,hard:16,count:17},N=16,ve=32,O=`
struct Params { W: u32, H: u32, N: u32, tilesX: u32, tilesY: u32, capacity: u32, xy_step: f32, cov_shift: f32 };
`;function Dr(a){const e=new ArrayBuffer(32),t=new Uint32Array(e),r=new Float32Array(e);return t[0]=a.W,t[1]=a.H,t[2]=a.N,t[3]=a.tilesX,t[4]=a.tilesY,t[5]=a.capacity,r[6]=a.xyStep,r[7]=a.covShift??0,new Uint8Array(e)}const zr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> image: array<f32>;
@group(0) @binding(2) var<storage, read> density: array<f32>;
@group(0) @binding(3) var<storage, read> logcov: array<f32>;
@group(0) @binding(4) var<storage, read> rgbmap: array<f32>;
@group(0) @binding(5) var<storage, read_write> features: array<f32>;
@compute @workgroup_size(256) fn pack_static(@builtin(global_invocation_id) g: vec3<u32>) {
  let HW = p.W * p.H; let i = g.x; if (i >= HW) { return; }
  features[i] = image[i]; features[HW + i] = image[HW + i]; features[2u * HW + i] = image[2u * HW + i];
  features[${I.density}u * HW + i] = density[i];
  for (var c = 0u; c < 3u; c++) {
    features[(${I.logcov}u + c) * HW + i] = logcov[c * HW + i] + select(0.0, p.cov_shift, c != 1u);
    features[(${I.rgb}u + c) * HW + i] = rgbmap[c * HW + i];
  }
}
`,Or=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> xy: array<f32>;
@group(0) @binding(2) var<storage, read> MAP: array<f32>;
@group(0) @binding(3) var<storage, read_write> cov: array<f32>;
@group(0) @binding(4) var<storage, read_write> rgb: array<f32>;
${lt}
@compute @workgroup_size(256) fn init_attrs(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let HW = p.W * p.H; let x = xy[2u * i]; let y = xy[2u * i + 1u];
  for (var c = 0u; c < 3u; c++) {
    cov[3u * i + c] = bilinear_plane((${I.logcov}u + c) * HW, p.W, p.H, x, y);
    rgb[3u * i + c] = clamp(bilinear_plane((${I.rgb}u + c) * HW, p.W, p.H, x, y), 0.0, 1.0);
  }
}
`,Wr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> cov: array<f32>;
@group(0) @binding(2) var<storage, read> rgb: array<f32>;
@group(0) @binding(3) var<storage, read> weight: array<f32>;
@group(0) @binding(4) var<storage, read_write> scale: array<f32>;
@group(0) @binding(5) var<storage, read_write> rot: array<f32>;
@group(0) @binding(6) var<storage, read_write> color: array<f32>;
@compute @workgroup_size(256) fn pre_render(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let a = cov[3u * i]; let b = cov[3u * i + 1u]; let c = cov[3u * i + 2u];
  let center = 0.5 * (a + c); let half = 0.5 * (a - c);
  let radius = sqrt(half * half + b * b + 1e-12);
  scale[2u * i] = exp(0.5 * (center + radius));
  scale[2u * i + 1u] = exp(0.5 * (center - radius));
  rot[i] = -0.5 * atan2(2.0 * b, a - c);
  let w = weight[i];
  for (var k = 0u; k < 3u; k++) { color[3u * i + k] = clamp(rgb[3u * i + k] * w, 0.0, 1.0); }
}
`,bt=`
// Native get_tile_bbox: tile-space center and radius, truncation toward zero, clamp to [0, tiles].
fn tile_bbox(center: vec2<f32>, radius: f32) -> vec4<i32> {
  let tcx = center.x / ${N}.0; let tcy = center.y / ${N}.0; let tr = radius / ${N}.0;
  let minx = clamp(i32(tcx - tr), 0, i32(p.tilesX)); let maxx = clamp(i32(tcx + tr + 1.0), 0, i32(p.tilesX));
  let miny = clamp(i32(tcy - tr), 0, i32(p.tilesY)); let maxy = clamp(i32(tcy + tr + 1.0), 0, i32(p.tilesY));
  return vec4<i32>(minx, miny, maxx, maxy);
}
`,Gr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> xy: array<f32>;
@group(0) @binding(2) var<storage, read> scale: array<f32>;
@group(0) @binding(3) var<storage, read> rot: array<f32>;
@group(0) @binding(4) var<storage, read_write> proj: array<f32>;
@group(0) @binding(5) var<storage, read_write> counts: array<atomic<u32>>;
@group(0) @binding(6) var<storage, read_write> large_list: array<u32>;
@group(0) @binding(7) var<storage, read_write> flags: array<atomic<u32>>;
${Ot}
${bt}
@compute @workgroup_size(256) fn project(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let pr = project_gaussian(vec2<f32>(xy[2u * i], xy[2u * i + 1u]), vec2<f32>(scale[2u * i], scale[2u * i + 1u]), rot[i], f32(p.W), f32(p.H));
  let o = 8u * i;
  proj[o] = pr.center.x; proj[o + 1u] = pr.center.y;
  proj[o + 2u] = pr.conic.x; proj[o + 3u] = pr.conic.y; proj[o + 4u] = pr.conic.z;
  proj[o + 5u] = pr.radius; proj[o + 6u] = f32(pr.valid); proj[o + 7u] = 0.0;
  if (pr.valid == 0u || pr.radius <= 0.0) { return; }
  let bb = tile_bbox(pr.center, pr.radius);
  let footprint = (bb.z - bb.x) * (bb.w - bb.y);
  if (footprint > ${ve}) { let slot = atomicAdd(&flags[0], 1u); large_list[slot] = i; return; }
  for (var ty = bb.y; ty < bb.w; ty++) {
    for (var tx = bb.x; tx < bb.z; tx++) { atomicAdd(&counts[u32(ty) * p.tilesX + u32(tx)], 1u); }
  }
}
`,qr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> proj: array<f32>;
@group(0) @binding(2) var<storage, read> offsets: array<u32>;
@group(0) @binding(3) var<storage, read_write> cursors: array<atomic<u32>>;
@group(0) @binding(4) var<storage, read_write> list: array<u32>;
@group(0) @binding(5) var<storage, read_write> flags: array<atomic<u32>>;
${bt}
@compute @workgroup_size(256) fn scatter(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let o = 8u * i;
  let radius = proj[o + 5u];
  if (proj[o + 6u] < 0.5 || radius <= 0.0) { return; }
  let bb = tile_bbox(vec2<f32>(proj[o], proj[o + 1u]), radius);
  let footprint = (bb.z - bb.x) * (bb.w - bb.y);
  if (footprint > ${ve}) { return; }
  for (var ty = bb.y; ty < bb.w; ty++) {
    for (var tx = bb.x; tx < bb.z; tx++) {
      let t = u32(ty) * p.tilesX + u32(tx);
      let w = atomicAdd(&cursors[t], 1u) + offsets[t];
      if (w < p.capacity) { list[w] = i; } else { atomicStore(&flags[1], 1u); }
    }
  }
}
`,Hr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> proj: array<f32>;
@group(0) @binding(2) var<storage, read> color: array<f32>;
@group(0) @binding(3) var<storage, read> list: array<u32>;
@group(0) @binding(4) var<storage, read> offsets: array<u32>;
@group(0) @binding(5) var<storage, read> large_list: array<u32>;
@group(0) @binding(6) var<storage, read> flags: array<u32>;
@group(0) @binding(7) var<storage, read_write> features: array<f32>;
${ut}
var<workgroup> s_x: array<f32, 256>;
var<workgroup> s_y: array<f32, 256>;
var<workgroup> s_cx: array<f32, 256>;
var<workgroup> s_cy: array<f32, 256>;
var<workgroup> s_cz: array<f32, 256>;
var<workgroup> s_r: array<f32, 256>;
var<workgroup> s_g: array<f32, 256>;
var<workgroup> s_b: array<f32, 256>;
var<workgroup> s_ok: array<u32, 256>;
fn stage(gid: u32, li: u32) {
  let o = 8u * gid;
  s_x[li] = proj[o]; s_y[li] = proj[o + 1u];
  s_cx[li] = proj[o + 2u]; s_cy[li] = proj[o + 3u]; s_cz[li] = proj[o + 4u];
  s_ok[li] = u32(proj[o + 6u] > 0.5);
  s_r[li] = color[3u * gid]; s_g[li] = color[3u * gid + 1u]; s_b[li] = color[3u * gid + 2u];
}
// Sum the Gaussians with indices [start, end) into acc, staged 256 at a time through workgroup memory.
// source 0: indices are gid directly (overflow fallback over all N); 1: the tile list; 2: the large list.
fn accumulate(start: u32, end: u32, source: u32, li: u32, inside: bool, fpx: f32, fpy: f32, acc: ptr<function, vec3<f32>>) {
  var count = 0u;
  if (end > start) { count = end - start; }
  let blocks = (count + 255u) / 256u;
  for (var b = 0u; b < blocks; b++) {
    let base = start + b * 256u;
    let idx = base + li;
    if (idx < end) {
      var gid = idx;
      if (source == 1u) { gid = list[idx]; } else if (source == 2u) { gid = large_list[idx]; }
      stage(gid, li);
    }
    workgroupBarrier();
    let staged = min(256u, end - base);
    if (inside) {
      for (var t = 0u; t < staged; t++) {
        if (s_ok[t] == 0u) { continue; }
        let a = splat_alpha(s_x[t] - fpx, s_y[t] - fpy, vec3<f32>(s_cx[t], s_cy[t], s_cz[t]));
        *acc += vec3<f32>(s_r[t], s_g[t], s_b[t]) * a;
      }
    }
    workgroupBarrier();
  }
}
@compute @workgroup_size(${N}, ${N}) fn raster(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  let tile = wg.y * p.tilesX + wg.x;
  let px = wg.x * ${N}u + lid.x; let py = wg.y * ${N}u + lid.y;
  let inside = (px < p.W) && (py < p.H);
  let fpx = f32(px); let fpy = f32(py);
  var acc = vec3<f32>(0.0, 0.0, 0.0);
  if (flags[1] != 0u) {
    // The tile lists overflowed their capacity: every pixel sums every Gaussian.
    accumulate(0u, p.N, 0u, li, inside, fpx, fpy, &acc);
  } else {
    accumulate(offsets[tile], min(offsets[tile + 1u], p.capacity), 1u, li, inside, fpx, fpy, &acc);
    accumulate(0u, flags[0], 2u, li, inside, fpx, fpy, &acc);
  }
  if (inside) {
    let HW = p.W * p.H; let pix = py * p.W + px;
    let out = clamp(acc, vec3<f32>(0.0), vec3<f32>(1.0));
    for (var c = 0u; c < 3u; c++) {
      features[(${I.rendered}u + c) * HW + pix] = out[c];
      features[(${I.diff}u + c) * HW + pix] = features[(${I.image}u + c) * HW + pix] - out[c];
    }
  }
}
`,Vr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> xy: array<f32>;
@group(0) @binding(2) var<storage, read_write> counts: array<atomic<u32>>;
@compute @workgroup_size(256) fn hard_count(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let cx = u32(clamp(floor(xy[2u * i] * f32(p.W)), 0.0, f32(p.W - 1u)));
  let cy = u32(clamp(floor(xy[2u * i + 1u] * f32(p.H)), 0.0, f32(p.H - 1u)));
  atomicAdd(&counts[cy * p.W + cx], 1u);
}
`,jr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> counts: array<u32>;
@group(0) @binding(2) var<storage, read_write> features: array<f32>;
@compute @workgroup_size(256) fn hard_to_f32(@builtin(global_invocation_id) g: vec3<u32>) {
  let HW = p.W * p.H; let i = g.x; if (i >= HW) { return; }
  features[${I.hard}u * HW + i] = f32(counts[i]);
}
`,Xr=`
${O}
@group(0) @binding(0) var<uniform> p: Params;
@group(0) @binding(1) var<storage, read> MAP: array<f32>;
@group(0) @binding(2) var<storage, read_write> xy: array<f32>;
@group(0) @binding(3) var<storage, read_write> cov: array<f32>;
@group(0) @binding(4) var<storage, read_write> rgb: array<f32>;
${lt}
@compute @workgroup_size(256) fn post_head(@builtin(global_invocation_id) g: vec3<u32>) {
  let i = g.x; if (i >= p.N) { return; }
  let HW = p.W * p.H; let x = xy[2u * i]; let y = xy[2u * i + 1u];
  var d: array<f32, 8>;
  for (var c = 0u; c < 8u; c++) { d[c] = bilinear_plane(c * HW, p.W, p.H, x, y); }
  cov[3u * i] += d[0]; cov[3u * i + 1u] += d[1]; cov[3u * i + 2u] += d[2];
  rgb[3u * i] = clamp(rgb[3u * i] + d[3], 0.0, 1.0);
  rgb[3u * i + 1u] = clamp(rgb[3u * i + 1u] + d[4], 0.0, 1.0);
  rgb[3u * i + 2u] = clamp(rgb[3u * i + 2u] + d[5], 0.0, 1.0);
  xy[2u * i] = clamp(x + p.xy_step * d[6], 0.0, 1.0);
  xy[2u * i + 1u] = clamp(y + p.xy_step * d[7], 0.0, 1.0);
}
`,B="read-only-storage",M="storage",D="uniform",Yr={packStatic:{code:zr,entryPoint:"pack_static",bindings:[D,B,B,B,B,M],label:"pack_static"},initAttrs:{code:Or,entryPoint:"init_attrs",bindings:[D,B,B,M,M],label:"init_attrs"},preRender:{code:Wr,entryPoint:"pre_render",bindings:[D,B,B,B,M,M,M],label:"pre_render"},project:{code:Gr,entryPoint:"project",bindings:[D,B,B,B,M,M,M,M],label:"project"},scatter:{code:qr,entryPoint:"scatter",bindings:[D,B,B,M,M,M],label:"scatter"},raster:{code:Hr,entryPoint:"raster",bindings:[D,B,B,B,B,B,B,M],label:"raster"},hardCount:{code:Vr,entryPoint:"hard_count",bindings:[D,B,M],label:"hard_count"},hardToF32:{code:jr,entryPoint:"hard_to_f32",bindings:[D,B,M],label:"hard_to_f32"},postHead:{code:Xr,entryPoint:"post_head",bindings:[D,B,M,M,M],label:"post_head"}};class Kr{device;kernels={};constructor(e){this.device=e;for(const[t,r]of Object.entries(Yr))this.kernels[t]=$.create(e,r)}}function Jr(a){return Math.max(8*a,4096)}class Zr{device;width;height;n;hw;tilesX;tilesY;capacity;xyStep;params;features;xy;cov;rgb;weight;scale;rot;color;proj;counts;offsets;cursors;list;large;flags;hardScratch;delta;scan;k;constructor(e,t,r){this.device=e,this.k=t.kernels,this.width=r.width,this.height=r.height,this.n=r.n,this.hw=r.width*r.height,this.tilesX=Math.ceil(r.width/N),this.tilesY=Math.ceil(r.height/N),this.capacity=Jr(r.n),this.xyStep=r.xyStep??2.56/Math.max(r.width,r.height);const i=this.tilesX*this.tilesY;this.params=Ue(e,Dr({W:r.width,H:r.height,N:r.n,tilesX:this.tilesX,tilesY:this.tilesY,capacity:this.capacity,xyStep:this.xyStep,covShift:r.covShift}),"kloop-params");const s=r.n;this.features=E(e,I.count*this.hw*4,"features"),this.xy=E(e,2*s*4,"xy"),this.cov=E(e,3*s*4,"cov"),this.rgb=E(e,3*s*4,"rgb"),this.weight=E(e,s*4,"weight"),this.scale=E(e,2*s*4,"scale"),this.rot=E(e,s*4,"rot"),this.color=E(e,3*s*4,"color"),this.proj=E(e,8*s*4,"proj"),this.counts=E(e,i*4,"tile-counts"),this.offsets=E(e,(i+1)*4,"tile-offsets"),this.cursors=E(e,i*4,"tile-cursors"),this.list=E(e,this.capacity*4,"tile-list"),this.large=E(e,s*4,"large-list"),this.flags=E(e,16,"flags"),this.hardScratch=E(e,this.hw*4,"hard-scratch"),this.delta=E(e,8*this.hw*4,"delta"),this.scan=new Ir(e,i)}setPoints(e,t,r,i){const s=this.device.queue;s.writeBuffer(this.xy,0,e.buffer,e.byteOffset,2*this.n*4),t&&s.writeBuffer(this.cov,0,t.buffer,t.byteOffset,3*this.n*4),r&&s.writeBuffer(this.rgb,0,r.buffer,r.byteOffset,3*this.n*4),s.writeBuffer(this.weight,0,i.buffer,i.byteOffset,this.n*4)}recordPackStatic(e,t,r,i,s){this.k.packStatic.dispatch(e,[this.params,t,r,i,s,this.features],F(this.hw,256))}recordInitAttrs(e){this.k.initAttrs.dispatch(e,[this.params,this.xy,this.features,this.cov,this.rgb],F(this.n,256))}recordPreRender(e){this.k.preRender.dispatch(e,[this.params,this.cov,this.rgb,this.weight,this.scale,this.rot,this.color],F(this.n,256))}recordSplatClears(e){e.clearBuffer(this.counts),e.clearBuffer(this.cursors),e.clearBuffer(this.flags)}recordSplat(e){const t=F(this.n,256);this.k.project.dispatch(e,[this.params,this.xy,this.scale,this.rot,this.proj,this.counts,this.large,this.flags],t),this.scan.record(e,this.counts,this.offsets),this.k.scatter.dispatch(e,[this.params,this.proj,this.offsets,this.cursors,this.list,this.flags],t),this.k.raster.dispatch(e,[this.params,this.proj,this.color,this.list,this.offsets,this.large,this.flags,this.features],this.tilesX,this.tilesY)}recordRender(e){this.recordSplatClears(e);const t=e.beginComputePass({label:"render"});this.recordPreRender(t),this.recordSplat(t),t.end()}recordHardCount(e){e.clearBuffer(this.hardScratch);const t=e.beginComputePass({label:"hard-count"});this.k.hardCount.dispatch(t,[this.params,this.xy,this.hardScratch],F(this.n,256)),this.k.hardToF32.dispatch(t,[this.params,this.hardScratch,this.features],F(this.hw,256)),t.end()}recordPostHead(e,t){e.copyBufferToBuffer(t,0,this.delta,0,8*this.hw*4);const r=e.beginComputePass({label:"post-head"});this.k.postHead.dispatch(r,[this.params,this.delta,this.xy,this.cov,this.rgb],F(this.n,256)),r.end()}snapshotSegments(e,t){const r=this.n,i=this.hw,s=[{src:this.xy,bytes:2*r*4,offset:0},{src:this.cov,bytes:3*r*4,offset:0},{src:this.color,bytes:3*r*4,offset:0}];return t&&s.push({src:this.rgb,bytes:3*r*4,offset:0}),e&&s.push({src:this.features,bytes:3*i*4,offset:I.rendered*i*4}),s}recordSnapshot(e,t,r,i=!0){const s=this.snapshotSegments(r,i);let n=0;const o=s.map(u=>{const l=n;return n+=Math.ceil(u.bytes/4)*4,l}),c=this.device.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ,label:`snapshot ${t}`});return s.forEach((u,l)=>e.copyBufferToBuffer(u.src,u.offset,c,o[l],u.bytes)),{k:t,staging:c,offs:o,bytes:s.map(u=>u.bytes),includeRendered:r,includeLatent:i}}async readDeferred(e){await e.staging.mapAsync(GPUMapMode.READ);const t=e.staging.getMappedRange(),r=n=>new Float32Array(t.slice(e.offs[n],e.offs[n]+e.bytes[n])),i={k:e.k,xy:r(0),cov:r(1),color:r(2)};let s=3;return e.includeLatent&&(i.rgbLatent=r(s++)),e.includeRendered&&(i.rendered=r(s)),e.staging.unmap(),e.staging.destroy(),i}async snapshot(e,t,r=!0){const i=this.device.createCommandEncoder(),s=this.recordSnapshot(i,e,t,r);return this.device.queue.submit([i.finish()]),this.readDeferred(s)}dispose(){for(const e of[this.params,this.features,this.xy,this.cov,this.rgb,this.weight,this.scale,this.rot,this.color,this.proj,this.counts,this.offsets,this.cursors,this.list,this.large,this.flags,this.hardScratch,this.delta])e.destroy();this.scan.dispose()}}let Qe=!1;function Qr(a={}){Qe||(q.env.wasm.numThreads=1,q.env.wasm.proxy=!1,q.env.wasm.wasmPaths=a.wasmPaths??"/node_modules/onnxruntime-web/dist/",q.env.logLevel=a.logLevel??"warning",q.env.webgpu.powerPreference=a.powerPreference??"high-performance",Qe=!0)}function ei(a){const e=a.adapterInfo;if(!e)return"unknown adapter";const t=[e.description,e.device,e.architecture,e.vendor].filter(r=>typeof r=="string"&&r.length>0);return t.length?Array.from(new Set(t)).join(" · "):"unknown adapter"}async function oe(a,e={}){const t={executionProviders:["webgpu"],preferredOutputLocation:"gpu-buffer",graphOptimizationLevel:"all",logSeverityLevel:2};return e.graphCapture&&(t.enableGraphCapture=!0),q.InferenceSession.create(a,t)}async function ti(){const a=await q.env.webgpu.device;if(!a)throw new Error("ORT did not expose a WebGPU device");return a}function ri(a,e){return q.Tensor.fromGpuBuffer(a,{dataType:"float32",dims:e})}async function xt(a,e,t,r){const i={[e]:ri(t,r)},s=await a.run(i);return Object.entries(s).map(([n,o])=>{if(o.location!=="gpu-buffer")throw new Error(`output ${n} is not on the GPU (${o.location})`);return{name:n,dims:o.dims,buffer:o.gpuBuffer,tensor:o}})}function _t(a){for(const e of a)e.tensor.dispose()}class ii{dynamic;static512;inputName;outputName;kind="ort";session;outputs=null;constructor(e,t,r,i){this.dynamic=e,this.static512=t,this.inputName=r,this.outputName=i,this.session=e}prepare(e,t){this.session=e===512&&t===512&&this.static512?this.static512:this.dynamic}async run(e,t,r){return this.prepare(t,r),this.release(),this.outputs=await xt(this.session,this.inputName,e,[1,17,r,t]),(this.outputs.find(s=>s.name===this.outputName)??this.outputs[0]).buffer}release(){this.outputs&&(_t(this.outputs),this.outputs=null)}dispose(){this.release(),this.dynamic.release(),this.static512?.release()}}const ai={CI:4,CO:8,TX:16,TY:4,PX:1,PY:4};function si(a){return{tileW:a.TX*a.PX,tileH:a.TY*a.PY,threads:a.TX*a.TY}}const ni=`
fn net_of(z: u32, zsplit: u32) -> u32 { return select(0u, 1u, z >= zsplit); }
`;function oi(a){const{CI:e,CO:t,TX:r,TY:i,PX:s,PY:n}=a,o=r*s,c=i*n,u=o+2,l=c+2,f=r*i,h=l*u,d=e*h,p=t*e*9,g=[];for(let m=0;m<t;m++)for(let _=0;_<n;_++)for(let T=0;T<s;T++)g.push(`var a${m}_${_}_${T}: f32 = 0.0;`);const w=[];for(let m=0;m<n+2;m++)for(let _=0;_<s+2;_++)w.push(`let x${m}_${_} = s_in[sb + ${m*u+_}u];`);const v=[];for(let m=0;m<t;m++){const _=[`{ let wb = ${m*e*9}u + c * 9u;`];for(let T=0;T<9;T++)_.push(`let k${T} = s_w[wb + ${T}u];`);for(let T=0;T<n;T++)for(let R=0;R<s;R++){const C=[];for(let L=0;L<3;L++)for(let U=0;U<3;U++)C.push(`k${L*3+U} * x${T+L}_${R+U}`);_.push(`a${m}_${T}_${R} += ${C.join(" + ")};`)}_.push("}"),v.push(_.join(`
      `))}const b=[];for(let m=0;m<t;m++){const _=[`{ let gco = co0 + ${m}u; if (gco < q.cout) { let b = bias[q.b_off + gco];`];for(let T=0;T<n;T++)for(let R=0;R<s;R++)_.push(`{ let x = px + ${R}u; let y = py + ${T}u; if (x < q.W && y < q.H) { outp[q.out_off + gco * HW + y * q.W + x] = a${m}_${T}_${R} + b; } }`);_.push("} }"),b.push(_.join(`
    `))}return`
${ni}
struct NP { W: u32, H: u32, cin: u32, cout: u32, in_off: u32, w_off: u32, b_off: u32, out_off: u32 };
struct P { n: array<NP, 2>, zsplit: u32, pad0: u32, pad1: u32, pad2: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> inp: array<f32>;
@group(0) @binding(2) var<storage, read> wgt: array<f32>;
@group(0) @binding(3) var<storage, read> bias: array<f32>;
@group(0) @binding(4) var<storage, read_write> outp: array<f32>;
var<workgroup> s_in: array<f32, ${d}>;
var<workgroup> s_w: array<f32, ${p}>;
@compute @workgroup_size(${r}, ${i}, 1)
fn conv3x3(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_id) lid: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  let net = net_of(wg.z, p.zsplit); let q = p.n[net]; let zl = wg.z - net * p.zsplit;
  let HW = q.W * q.H;
  let tx0 = wg.x * ${o}u; let ty0 = wg.y * ${c}u; let co0 = zl * ${t}u;
  let px = tx0 + lid.x * ${s}u; let py = ty0 + lid.y * ${n}u;
  ${g.join(`
  `)}
  for (var ci0 = 0u; ci0 < q.cin; ci0 += ${e}u) {
    for (var e = li; e < ${d}u; e += ${f}u) {
      let c = e / ${h}u; let r = e - c * ${h}u; let hy = r / ${u}u; let hx = r - hy * ${u}u;
      let gx = i32(tx0 + hx) - 1; let gy = i32(ty0 + hy) - 1; let ci = ci0 + c;
      var v = 0.0;
      if (ci < q.cin && gx >= 0 && gx < i32(q.W) && gy >= 0 && gy < i32(q.H)) { v = inp[q.in_off + ci * HW + u32(gy) * q.W + u32(gx)]; }
      s_in[e] = v;
    }
    for (var e = li; e < ${p}u; e += ${f}u) {
      let co = e / ${e*9}u; let r = e - co * ${e*9}u; let c = r / 9u; let k = r - c * 9u;
      let gco = co0 + co; let ci = ci0 + c;
      var v = 0.0;
      if (gco < q.cout && ci < q.cin) { v = wgt[q.w_off + (gco * q.cin + ci) * 9u + k]; }
      s_w[e] = v;
    }
    workgroupBarrier();
    for (var c = 0u; c < ${e}u; c++) {
      let sb = c * ${h}u + (lid.y * ${n}u) * ${u}u + lid.x * ${s}u;
      ${w.join(`
      `)}
      ${v.join(`
      `)}
    }
    workgroupBarrier();
  }
  ${b.join(`
  `)}
}
`}const kt=`
var<workgroup> s_n: array<f32, 256>;
var<workgroup> s_m: array<f32, 256>;
var<workgroup> s_m2: array<f32, 256>;
fn welford_reduce(li: u32) {
  workgroupBarrier();
  for (var s = 128u; s > 0u; s = s >> 1u) {
    if (li < s) {
      let nA = s_n[li]; let nB = s_n[li + s];
      if (nB > 0.0) {
        if (nA == 0.0) { s_n[li] = nB; s_m[li] = s_m[li + s]; s_m2[li] = s_m2[li + s]; }
        else {
          let nT = nA + nB; let delta = s_m[li + s] - s_m[li];
          s_m[li] = s_m[li] + delta * nB / nT;
          s_m2[li] = s_m2[li] + s_m2[li + s] + delta * delta * nA * nB / nT;
          s_n[li] = nT;
        }
      }
    }
    workgroupBarrier();
  }
}
`,ci=`
struct NP { count_per_group: u32, chunks: u32, raw_off: u32, part_off: u32 };
struct P { n: array<NP, 2>, groups: u32, chunk_elems: u32, pad0: u32, pad1: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> raw: array<f32>;
@group(0) @binding(2) var<storage, read_write> partials: array<f32>;
${kt}
@compute @workgroup_size(256)
fn gn_partial(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  let q = p.n[wg.z];
  let g = wg.y; let chunk = wg.x;
  if (chunk >= q.chunks) { return; }
  let base = q.raw_off + g * q.count_per_group;
  let start = chunk * p.chunk_elems;
  let end = min(start + p.chunk_elems, q.count_per_group);
  var n = 0.0; var mean = 0.0; var m2 = 0.0;
  for (var i = start + li; i < end; i += 256u) {
    let x = raw[base + i];
    n += 1.0;
    let d = x - mean;
    mean += d / n;
    m2 += d * (x - mean);
  }
  s_n[li] = n; s_m[li] = mean; s_m2[li] = m2;
  welford_reduce(li);
  if (li == 0u) {
    let o = q.part_off + (g * q.chunks + chunk) * 4u;
    partials[o] = s_n[0]; partials[o + 1u] = s_m[0]; partials[o + 2u] = s_m2[0]; partials[o + 3u] = 0.0;
  }
}
`,ui=`
struct NP { chunks: u32, part_off: u32, stats_off: u32, pad: u32 };
struct P { n: array<NP, 2>, groups: u32, eps: f32, pad0: u32, pad1: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> partials: array<f32>;
@group(0) @binding(2) var<storage, read_write> stats: array<f32>;
${kt}
@compute @workgroup_size(256)
fn gn_finalize(@builtin(workgroup_id) wg: vec3<u32>, @builtin(local_invocation_index) li: u32) {
  let q = p.n[wg.z];
  let g = wg.x;
  var n = 0.0; var mean = 0.0; var m2 = 0.0;
  for (var i = li; i < q.chunks; i += 256u) {
    let o = q.part_off + (g * q.chunks + i) * 4u;
    let nB = partials[o]; let mB = partials[o + 1u]; let m2B = partials[o + 2u];
    if (nB > 0.0) {
      if (n == 0.0) { n = nB; mean = mB; m2 = m2B; }
      else { let nT = n + nB; let delta = mB - mean; mean = mean + delta * nB / nT; m2 = m2 + m2B + delta * delta * n * nB / nT; n = nT; }
    }
  }
  s_n[li] = n; s_m[li] = mean; s_m2[li] = m2;
  welford_reduce(li);
  if (li == 0u) {
    let variance = s_m2[0] / max(s_n[0], 1.0);
    stats[q.stats_off + g * 2u] = s_m[0];
    stats[q.stats_off + g * 2u + 1u] = 1.0 / sqrt(variance + p.eps);
  }
}
`,li=`
struct NP { hw: u32, C: u32, cg: u32, dst_ch: u32, raw_off: u32, stats_off: u32, affine_off: u32, dst_off: u32 };
struct P { n: array<NP, 2>, pad0: u32, pad1: u32, pad2: u32, pad3: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> raw: array<f32>;
@group(0) @binding(2) var<storage, read> stats: array<f32>;
@group(0) @binding(3) var<storage, read> gamma: array<f32>;
@group(0) @binding(4) var<storage, read> beta: array<f32>;
@group(0) @binding(5) var<storage, read_write> dst: array<f32>;
@compute @workgroup_size(256)
fn activate(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let q = p.n[gid.z];
  let e = gid.x + gid.y * nw.x * 256u;
  if (e >= q.C * q.hw) { return; }
  let c = e / q.hw; let px = e - c * q.hw; let g = c / q.cg;
  let y = (raw[q.raw_off + e] - stats[q.stats_off + g * 2u]) * stats[q.stats_off + g * 2u + 1u] * gamma[q.affine_off + c] + beta[q.affine_off + c];
  dst[q.dst_off + (q.dst_ch + c) * q.hw + px] = y / (1.0 + exp(-y));
}
`,fi=`
struct NP { W: u32, H: u32, C: u32, src_ch: u32, src_off: u32, dst_off: u32, pad0: u32, pad1: u32 };
struct P { n: array<NP, 2>, pad0: u32, pad1: u32, pad2: u32, pad3: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> src: array<f32>;
@group(0) @binding(2) var<storage, read_write> dst: array<f32>;
@compute @workgroup_size(256)
fn pool2x2(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let q = p.n[gid.z];
  let w2 = q.W / 2u; let h2 = q.H / 2u;
  let e = gid.x + gid.y * nw.x * 256u;
  if (e >= q.C * w2 * h2) { return; }
  let c = e / (w2 * h2); let r = e - c * w2 * h2; let y = r / w2; let x = r - y * w2;
  let base = q.src_off + (q.src_ch + c) * q.W * q.H + (2u * y) * q.W + 2u * x;
  let v = max(max(src[base], src[base + 1u]), max(src[base + q.W], src[base + q.W + 1u]));
  dst[q.dst_off + e] = v;
}
`,di=`
struct NP { w: u32, h: u32, C: u32, dst_ch: u32, src_off: u32, dst_off: u32, pad0: u32, pad1: u32 };
struct P { n: array<NP, 2>, pad0: u32, pad1: u32, pad2: u32, pad3: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> src: array<f32>;
@group(0) @binding(2) var<storage, read_write> dst: array<f32>;
@compute @workgroup_size(256)
fn upsample2x(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let q = p.n[gid.z];
  let W = 2u * q.w; let H = 2u * q.h;
  let e = gid.x + gid.y * nw.x * 256u;
  if (e >= q.C * W * H) { return; }
  let c = e / (W * H); let r = e - c * W * H; let y = r / W; let x = r - y * W;
  let sx = max((f32(x) + 0.5) * 0.5 - 0.5, 0.0);
  let sy = max((f32(y) + 0.5) * 0.5 - 0.5, 0.0);
  let x0 = u32(floor(sx)); let y0 = u32(floor(sy));
  let x1 = min(x0 + 1u, q.w - 1u); let y1 = min(y0 + 1u, q.h - 1u);
  let lx = sx - f32(x0); let ly = sy - f32(y0);
  let base = q.src_off + c * q.w * q.h;
  let top = (1.0 - lx) * src[base + y0 * q.w + x0] + lx * src[base + y0 * q.w + x1];
  let bot = (1.0 - lx) * src[base + y1 * q.w + x0] + lx * src[base + y1 * q.w + x1];
  dst[q.dst_off + (q.dst_ch + c) * W * H + y * W + x] = (1.0 - ly) * top + ly * bot;
}
`,hi=`
struct P { hw: u32, cn: u32, ca: u32, a_off: u32 };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> act: array<f32>;
@group(0) @binding(2) var<storage, read> w_n: array<f32>;
@group(0) @binding(3) var<storage, read> b_n: array<f32>;
@group(0) @binding(4) var<storage, read> w_a: array<f32>;
@group(0) @binding(5) var<storage, read> b_a: array<f32>;
@group(0) @binding(6) var<storage, read_write> outp: array<f32>;
@compute @workgroup_size(256)
fn out1x1(@builtin(global_invocation_id) gid: vec3<u32>, @builtin(num_workgroups) nw: vec3<u32>) {
  let px = gid.x + gid.y * nw.x * 256u;
  if (px >= p.hw) { return; }
  for (var o = 0u; o < 8u; o++) {
    var s = b_n[o] + b_a[o];
    for (var c = 0u; c < p.cn; c++) { s += w_n[o * p.cn + c] * act[c * p.hw + px]; }
    for (var c = 0u; c < p.ca; c++) { s += w_a[o * p.ca + c] * act[p.a_off + c * p.hw + px]; }
    outp[o * p.hw + px] = s;
  }
}
`,et=4096;function ce(a,e=256){const t=Math.max(1,Math.ceil(a/e)),r=Math.min(t,65535);return{x:r,y:Math.ceil(t/r)}}const tt={buf:null,off:[0,0]};class pi{device;width;height;hidden;steps=[];buffers=[];uniforms=[];constructor(e,t,r,i){this.device=e,this.width=t,this.height=r,this.hidden=i}dims(e){return{w:this.width/e,h:this.height/e,hw:this.width/e*(this.height/e)}}alloc(e,t){const r=E(this.device,e*4,t);return this.buffers.push(r),r}shared(e,t,r){const i=this.dims(t).hw,s=this.hidden.map(n=>e*n*i);return{buf:this.alloc(s[0]+s[1],r),off:[0,s[0]]}}uniform(e){const t=Math.ceil(e.length*4/16)*16,r=new ArrayBuffer(t),i=new DataView(r);e.forEach((n,o)=>{Array.isArray(n)?i.setFloat32(o*4,n[1],!0):i.setUint32(o*4,n>>>0,!0)});const s=this.device.createBuffer({size:t,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});return this.device.queue.writeBuffer(s,0,r),this.uniforms.push(s),s}}class Ie{device;layout;convCfg;kind="wgsl";conv3x3;gnPartial;gnFinalize;activate;pool2x2;upsample2x;out1x1;nets;plan=null;uniforms=[];tile;constructor(e,t,r,i=ai){if(this.device=e,this.layout=t,this.convCfg=i,t.format!==1||t.dtype!=="float32")throw new Error("unsupported head layout");const s=t.arch;if(s.kernel_size!==3||s.depth!==2||s.groups!==8||s.in_channels!==17||s.out_channels!==8)throw new Error("head architecture not supported by the WGSL head");this.tile=si(i);const n="storage",o="read-only-storage",c="uniform";this.conv3x3=$.create(e,{label:"head.conv3x3",code:oi(i),entryPoint:"conv3x3",bindings:[c,o,o,o,n]}),this.gnPartial=$.create(e,{label:"head.gn_partial",code:ci,entryPoint:"gn_partial",bindings:[c,o,n]}),this.gnFinalize=$.create(e,{label:"head.gn_finalize",code:ui,entryPoint:"gn_finalize",bindings:[c,o,n]}),this.activate=$.create(e,{label:"head.activate",code:li,entryPoint:"activate",bindings:[c,o,o,o,o,n]}),this.pool2x2=$.create(e,{label:"head.pool2x2",code:fi,entryPoint:"pool2x2",bindings:[c,o,n]}),this.upsample2x=$.create(e,{label:"head.upsample2x",code:di,entryPoint:"upsample2x",bindings:[c,o,n]}),this.out1x1=$.create(e,{label:"head.out1x1",code:hi,entryPoint:"out1x1",bindings:[c,o,o,o,o,o,n]}),this.nets=this.loadWeights(t,r)}static layerSpec(e){return[{conv:"enc_blocks.0.0",gn:"enc_blocks.0.1",cin:17,cout:e,res:1},{conv:"enc_blocks.0.3",gn:"enc_blocks.0.4",cin:e,cout:e,res:1},{conv:"enc_blocks.1.0",gn:"enc_blocks.1.1",cin:e,cout:2*e,res:2},{conv:"enc_blocks.1.3",gn:"enc_blocks.1.4",cin:2*e,cout:2*e,res:2},{conv:"bottleneck.0",gn:"bottleneck.1",cin:2*e,cout:4*e,res:4},{conv:"bottleneck.3",gn:"bottleneck.4",cin:4*e,cout:4*e,res:4},{conv:"merge_blocks.0.0",gn:"merge_blocks.0.1",cin:6*e,cout:2*e,res:2},{conv:"merge_blocks.0.3",gn:"merge_blocks.0.4",cin:2*e,cout:2*e,res:2},{conv:"merge_blocks.1.0",gn:"merge_blocks.1.1",cin:3*e,cout:e,res:1},{conv:"merge_blocks.1.3",gn:"merge_blocks.1.4",cin:e,cout:e,res:1}]}loadWeights(e,t){const r=new Map(e.tensors.map(l=>[l.name,l])),i=(l,f)=>{const h=r.get(l);if(!h)throw new Error(`head weights missing ${l}`);if(h.shape.length!==f.length||h.shape.some((d,p)=>d!==f[p]))throw new Error(`head weight ${l} has shape ${h.shape} expected ${f}`);return t.subarray(h.offset,h.offset+h.count)},s=(l,f)=>{const h=new Float32Array(l.reduce((g,w)=>g+w.length,0)),d=[];let p=0;for(const g of l)d.push(p),h.set(g,p),p+=g.length;return{buf:le(this.device,h,f),off:d}},n=["net","aux_net"],o=[e.arch.hidden,e.arch.aux_hidden],c=o.map(Ie.layerSpec),u=c[0].map((l,f)=>{const h=n.map((v,b)=>{const m=c[b][f];return{cin:m.cin,cout:m.cout,w:i(`${v}.${m.conv}.weight`,[m.cout,m.cin,3,3]),b:i(`${v}.${m.conv}.bias`,[m.cout]),g:i(`${v}.${m.gn}.weight`,[m.cout]),be:i(`${v}.${m.gn}.bias`,[m.cout])}}),d=s(h.map(v=>v.w),`conv${f}.w`),p=s(h.map(v=>v.b),`conv${f}.b`),g=s(h.map(v=>v.g),`gn${f}.gamma`),w=s(h.map(v=>v.be),`gn${f}.beta`);return{convW:d.buf,convB:p.buf,gamma:g.buf,beta:w.buf,cin:h.map(v=>v.cin),cout:h.map(v=>v.cout),wOff:d.off,bOff:p.off,res:c[0][f].res}});return{hidden:o,layers:u,outW:n.map((l,f)=>le(this.device,i(`${l}.out.weight`,[8,o[f],1,1]),`${l}.out.w`)),outB:n.map(l=>le(this.device,i(`${l}.out.bias`,[8]),`${l}.out.b`))}}prepare(e,t){if(this.plan&&this.plan.width===e&&this.plan.height===t)return;if(this.disposePlan(),e%4||t%4)throw new Error("head input size must be a multiple of 4");const r=new pi(this.device,e,t,this.nets.hidden),i=r.shared(1,1,"raw1"),s=r.shared(1,1,"actA1"),n=r.shared(1,1,"actB1"),o=r.shared(3,1,"cat1"),c=r.shared(2,2,"raw2"),u=r.shared(2,2,"actA2"),l=r.shared(2,2,"actB2"),f=r.shared(6,2,"cat0"),h=r.shared(1,2,"pooled0"),d=r.shared(4,4,"raw4"),p=r.shared(4,4,"actA4"),g=r.shared(4,4,"actB4"),w=r.shared(2,4,"pooled1"),v=T=>this.nets.hidden.map(R=>T*R),b=this.nets.layers;this.conv(r,b[0],tt,i),this.groupNorm(r,b[0],i,s,v(0)),this.conv(r,b[1],s,i),this.groupNorm(r,b[1],i,o,v(2)),this.pool(r,o,v(2),v(1),1,h),this.conv(r,b[2],h,c),this.groupNorm(r,b[2],c,u,v(0)),this.conv(r,b[3],u,c),this.groupNorm(r,b[3],c,f,v(4)),this.pool(r,f,v(4),v(2),2,w),this.conv(r,b[4],w,d),this.groupNorm(r,b[4],d,p,v(0)),this.conv(r,b[5],p,d),this.groupNorm(r,b[5],d,g,v(0)),this.upsample(r,g,v(4),4,f,v(0)),this.conv(r,b[6],f,c),this.groupNorm(r,b[6],c,u,v(0)),this.conv(r,b[7],u,c),this.groupNorm(r,b[7],c,l,v(0)),this.upsample(r,l,v(2),2,o,v(0)),this.conv(r,b[8],o,i),this.groupNorm(r,b[8],i,s,v(0)),this.conv(r,b[9],s,i),this.groupNorm(r,b[9],i,n,v(0));const m=e*t,_=r.alloc(8*m,"head.delta");r.steps.push({kernel:this.out1x1,buffers:[r.uniform([m,this.nets.hidden[0],this.nets.hidden[1],n.off[1]]),n.buf,this.nets.outW[0],this.nets.outB[0],this.nets.outW[1],this.nets.outB[1],_],...ce(m),z:1}),this.plan={width:e,height:t,steps:r.steps,buffers:r.buffers,delta:_},this.uniforms=r.uniforms}conv(e,t,r,i){const s=e.dims(t.res),n=t.cout.map(c=>Math.ceil(c/this.convCfg.CO)),o=e.uniform([s.w,s.h,t.cin[0],t.cout[0],r.off[0],t.wOff[0],t.bOff[0],i.off[0],s.w,s.h,t.cin[1],t.cout[1],r.off[1],t.wOff[1],t.bOff[1],i.off[1],n[0],0,0,0]);e.steps.push({kernel:this.conv3x3,buffers:[o,r===tt?"features":r.buf,t.convW,t.convB,i.buf],x:Math.ceil(s.w/this.tile.tileW),y:Math.ceil(s.h/this.tile.tileH),z:n[0]+n[1]})}groupNorm(e,t,r,i,s){const n=this.layout.arch.groups,o=this.layout.arch.eps,c=e.dims(t.res),u=t.cout.map(w=>w/n),l=u.map(w=>w*c.hw),f=l.map(w=>Math.ceil(w/et)),h=[0,n*f[0]*4],d=e.alloc(h[1]+n*f[1]*4,"gn.partials"),p=e.alloc(n*2*2,"gn.stats"),g=[0,n*2];e.steps.push({kernel:this.gnPartial,buffers:[e.uniform([l[0],f[0],r.off[0],h[0],l[1],f[1],r.off[1],h[1],n,et,0,0]),r.buf,d],x:Math.max(f[0],f[1]),y:n,z:2}),e.steps.push({kernel:this.gnFinalize,buffers:[e.uniform([f[0],h[0],g[0],0,f[1],h[1],g[1],0,n,["f32",o],0,0]),d,p],x:n,y:1,z:2}),e.steps.push({kernel:this.activate,buffers:[e.uniform([c.hw,t.cout[0],u[0],s[0],r.off[0],g[0],t.bOff[0],i.off[0],c.hw,t.cout[1],u[1],s[1],r.off[1],g[1],t.bOff[1],i.off[1],0,0,0,0]),r.buf,p,t.gamma,t.beta,i.buf],...ce(Math.max(t.cout[0],t.cout[1])*c.hw),z:2})}pool(e,t,r,i,s,n){const o=e.dims(s);e.steps.push({kernel:this.pool2x2,buffers:[e.uniform([o.w,o.h,i[0],r[0],t.off[0],n.off[0],0,0,o.w,o.h,i[1],r[1],t.off[1],n.off[1],0,0,0,0,0,0]),t.buf,n.buf],...ce(Math.max(i[0],i[1])*(o.hw/4)),z:2})}upsample(e,t,r,i,s,n){const o=e.dims(i);e.steps.push({kernel:this.upsample2x,buffers:[e.uniform([o.w,o.h,r[0],n[0],t.off[0],s.off[0],0,0,o.w,o.h,r[1],n[1],t.off[1],s.off[1],0,0,0,0,0,0]),t.buf,s.buf],...ce(Math.max(r[0],r[1])*o.hw*4),z:2})}get dispatchCount(){return this.plan?.steps.length??0}record(e,t,r,i){this.prepare(r,i);const s=this.plan,n=e.beginComputePass({label:"wgsl-head"});for(const o of s.steps){const c=o.buffers.map(u=>u==="features"?t:u);o.kernel.dispatch(n,c,o.x,o.y,o.z)}return n.end(),s.delta}async run(e,t,r){const i=this.device.createCommandEncoder(),s=this.record(i,e,t,r);return this.device.queue.submit([i.finish()]),s}release(){}disposePlan(){if(this.plan)for(const e of this.plan.buffers)e.destroy();this.plan=null;for(const e of this.uniforms)e.destroy();this.uniforms=[]}dispose(){this.disposePlan();for(const e of this.nets.layers)for(const t of[e.convW,e.convB,e.gamma,e.beta])t.destroy();for(const e of[...this.nets.outW,...this.nets.outB])e.destroy()}}function gi(a,e){const t=JSON.parse(new TextDecoder().decode(a)),r=e.slice(),i=new Float32Array(r.buffer,0,r.byteLength>>>2),s=t.tensors.reduce((n,o)=>Math.max(n,o.offset+o.count),0);if(i.length!==s)throw new Error(`head weights: ${i.length} floats, layout expects ${s}`);return{layout:t,weights:i}}function mi(a,e){const t=Math.max(1,Math.floor(Math.max(a,e)/2));let r=1;for(;r<t;)r*=2;const i=[];for(;r>=1;)i.push(r),r=Math.floor(r/2);return i.push(1),i}function vi(a,e,t,r){const i=Math.max(1,t),s=[];let n=a;for(let o=0;o<i;o++){const c=Math.max(0,n-e),l=o+1===i?c:c>0?Math.max(1,Math.floor(n*r)):0,f=Math.min(c,l);s.push({nIn:n,remove:f}),n-=f}return s}const X=4294967295;class yi{device;width;height;cache=new Map;constructor(e,t,r){this.device=e,this.width=t,this.height=r}get(e,t=0,r=0){const i=`${e},${t},${r}`;let s=this.cache.get(i);return s||(s=Ue(this.device,new Uint32Array([this.width,this.height,e>>>0,t>>>0,r>>>0,0,0,0]),`u:${i}`),this.cache.set(i,s)),s}dispose(){for(const e of this.cache.values())e.destroy();this.cache.clear()}}class Tt{k;u;levels=[];constructor(e,t,r,i){this.k=t,this.u=r;let s=i;for(;;){const n=Math.ceil(s/Ke);if(this.levels.push({sums:E(e,n*4,"scan.sums"),scanned:E(e,n*4,"scan.scanned")}),n<=1)break;s=n}}record(e,t,r,i,s=0){const n=Math.ceil(i/Ke),o=this.levels[s];if(!o)throw new Error("scan length exceeds prepared scratch");this.k.scan_local.dispatch(e,[this.u.get(i),t,r,o.sums],n),n>1&&(this.record(e,o.sums,o.scanned,n,s+1),this.k.scan_add.dispatch(e,[this.u.get(i),r,o.scanned],F(i,256)))}dispose(){for(const e of this.levels)e.sums.destroy(),e.scanned.destroy()}}class wi{k;u;keysA;valsA;keysB;valsB;hist;histScan;scanner;rank;idxOfRank;constructor(e,t,r,i){this.k=t,this.u=r;const s=Math.ceil(i/Be);this.keysA=E(e,i*4,"sort.keysA"),this.valsA=E(e,i*4,"sort.valsA"),this.keysB=E(e,i*4,"sort.keysB"),this.valsB=E(e,i*4,"sort.valsB"),this.hist=E(e,256*s*4,"sort.hist"),this.histScan=E(e,256*s*4,"sort.histScan"),this.scanner=new Tt(e,t,r,256*s),this.rank=E(e,i*4,"rank"),this.idxOfRank=E(e,i*4,"idxOfRank")}record(e,t,r){const i=Math.ceil(r/Be);this.k.sort_init.dispatch(e,[this.u.get(r),t,this.keysA,this.valsA],F(r,256));let s=this.keysA,n=this.valsA,o=this.keysB,c=this.valsB;for(let u=0;u<4;u++){const l=u*8;this.k.sort_hist.dispatch(e,[this.u.get(r,l,i),s,this.hist],i),this.scanner.record(e,this.hist,this.histScan,256*i),this.k.sort_scatter.dispatch(e,[this.u.get(r,l,i),s,n,this.histScan,o,c],i),[s,o]=[o,s],[n,c]=[c,n]}this.k.rank_from_sorted.dispatch(e,[this.u.get(r),n,this.rank,this.idxOfRank],F(r,256))}dispose(){for(const e of[this.keysA,this.valsA,this.keysB,this.valsB,this.hist,this.histScan,this.rank,this.idxOfRank])e.destroy();this.scanner.dispose()}}class bi{device;k;params=null;u;scanner;sorter;schedule=[];plan=[];b={};constructor(e){this.device=e,this.k=Object.fromEntries(Object.entries(zt).map(([t,r])=>[t,$.create(e,r)]))}prepare(e){if(e.knnK!==W)throw new Error(`knnK must be ${W} in v1`);if(e.nMax<e.n||e.n<1)throw new Error("nMax must be >= n >= 1");this.disposeBuffers();const{width:t,height:r,nMax:i,n:s}=e,n=t*r;this.params=e,this.u=new yi(this.device,t,r),this.schedule=mi(t,r),this.plan=vi(i,s,e.mergeRounds,e.perRoundFraction);const o=this.device,c=(u,l)=>(this.b[u]=E(o,l,u),this.b[u]);c("pix",i*8),c("ownerA",n*4),c("ownerB",n*4),c("seen",i*4),c("flags",i*4),c("scanOut",i*4),c("lost",i*4),c("counts",16),c("acc",6*i*4),c("mass",i*4),c("slot",i*W*4),c("tmin",i*4),c("proposed",i*4),c("target",i*4),c("matched",i*4),c("alive",i*4),c("ptsB",i*8),c("ptsC",i*8),c("ptsNew",i*8),c("partial",Math.ceil(i/1024)*4),c("total",16),c("weights",i*4),c("outPoints",s*8),c("outWeights",s*4),c("outMasses",s*4),c("outOwner",n*4),this.scanner=new Tt(o,this.k,this.u,i),this.sorter=new wi(o,this.k,this.u,i),this.u.get(0),this.u.get(n,0,X),this.u.get(s),this.u.get(2*s),this.u.get(6*s);for(const u of this.schedule)this.u.get(0,u);for(const u of this.plan){if(u.remove===0)continue;this.u.get(u.nIn),this.u.get(2*u.nIn),this.u.get(6*u.nIn),this.u.get(u.nIn*W,0,X),this.u.get(u.nIn,0,X),this.u.get(u.nIn,0,1);for(let f=0;f<W;f++)this.u.get(u.nIn,f),this.u.get(u.nIn,f,u.remove);this.u.get(u.nIn,0,u.remove);const l=Math.ceil(u.nIn/Be);for(let f=0;f<32;f+=8)this.u.get(u.nIn,f,l);this.u.get(256*l)}this.u.get(Math.ceil(s/1024))}need(){if(!this.params)throw new Error("call prepare() first");return this.params}fill(e,t,r,i){r<=0||this.k.fill_u32.dispatch(e,[this.u.get(r,0,i),t],F(r,256))}grid2d(){const e=this.need();return[Math.ceil(e.width/16),Math.ceil(e.height/16)]}assignment(e,t,r,i){const s=this.need(),n=s.width*s.height,[o,c]=this.grid2d(),u=this.b;this.k.to_pixel.dispatch(e,[this.u.get(r),t,u.pix],F(r,256)),this.fill(e,u.ownerA,n,X),this.k.owner_init.dispatch(e,[this.u.get(r),u.pix,u.ownerA],F(r,256));let l=u.ownerA,f=u.ownerB;for(const h of this.schedule)this.k.jfa_pass.dispatch(e,[this.u.get(0,h),u.pix,l,f],o,c),[l,f]=[f,l];return i&&(this.fill(e,u.seen,r,0),this.k.mark_seen.dispatch(e,[this.u.get(0),l,u.seen],o,c),this.k.unseen_flags.dispatch(e,[this.u.get(r),u.seen,u.flags],F(r,256)),this.scanner.record(e,u.flags,u.scanOut,r),this.k.compact_lost.dispatch(e,[this.u.get(r),u.flags,u.scanOut,u.lost,u.counts],F(r,256)),this.k.recovery.dispatch(e,[this.u.get(0),u.pix,l,f,u.lost,u.counts],o,c),[l,f]=[f,l]),l}masses(e,t,r,i){const[s,n]=this.grid2d(),o=this.b;return this.fill(e,o.acc,2*i,0),this.k.mass_accumulate.dispatch(e,[this.u.get(i),t,r,o.acc],s,n),this.k.mass_decode.dispatch(e,[this.u.get(i),o.acc,o.mass],F(i,256)),o.mass}adjacency(e,t,r,i){const[s,n]=this.grid2d(),o=this.b;this.fill(e,o.slot,i*W,X);for(let c=0;c<W;c++)this.k.adjacency_round.dispatch(e,[this.u.get(i,c),t,r,o.slot],s,n);return o.slot}matching(e,t,r,i,s,n){const o=this.b,c=F(s,256);this.fill(e,o.alive,s,1),this.fill(e,o.matched,s,0),this.fill(e,o.target,s,X);for(let u=0;u<W;u++)this.fill(e,o.tmin,s,X),this.k.match_phase1.dispatch(e,[this.u.get(s,u,n),t,i,r,o.alive,o.matched,o.tmin,o.proposed],c),this.k.match_phase2.dispatch(e,[this.u.get(s),t,o.proposed,o.tmin,o.target,o.matched,o.alive],c);this.k.match_force.dispatch(e,[this.u.get(s,0,n),t,r,o.target,o.matched,o.alive],c)}mergeRound(e,t,r,i,s,n){const o=this.b,c=F(r,256),u=this.assignment(e,t,r,!0),l=this.masses(e,u,s,r);this.sorter.record(e,l,r);const f=this.adjacency(e,u,this.sorter.rank,r);this.matching(e,this.sorter.rank,this.sorter.idxOfRank,f,r,i),this.k.merge_acc_init.dispatch(e,[this.u.get(r),t,l,o.acc],c),this.k.merge_accumulate.dispatch(e,[this.u.get(r),t,l,o.matched,o.target,o.acc],c),this.k.merge_new.dispatch(e,[this.u.get(r),t,o.acc,o.ptsNew],c),this.scanner.record(e,o.alive,o.scanOut,r),this.k.compact_alive.dispatch(e,[this.u.get(r),o.alive,o.scanOut,o.ptsNew,n],c)}lloyd(e,t,r,i,s){const[n,o]=this.grid2d(),c=this.b;for(let u=0;u<s;u++){const l=this.assignment(e,t,r,!1);this.fill(e,c.acc,6*r,0),this.k.lloyd_accumulate.dispatch(e,[this.u.get(r),l,i,c.acc],n,o),this.k.lloyd_finalize.dispatch(e,[this.u.get(r),c.acc,t],F(r,256))}}weights(e,t,r){const i=this.b,s=Math.ceil(r/1024);return this.k.reduce_partial.dispatch(e,[this.u.get(r),t,i.partial],s),this.k.reduce_final.dispatch(e,[this.u.get(s),i.partial,i.total],1),this.k.weights_finalize.dispatch(e,[this.u.get(r),t,i.total,i.weights],F(r,256)),i.weights}record(e,t){const r=this.need(),i=this.b,s=r.width*r.height;e.copyBufferToBuffer(t.points,0,i.ptsB,0,r.nMax*8);const n=e.beginComputePass({label:"placement"});let o=i.ptsB,c=i.ptsC;for(const h of this.plan)h.remove!==0&&(this.mergeRound(n,o,h.nIn,h.remove,t.density,c),[o,c]=[c,o]);this.lloyd(n,o,r.n,t.density,r.lloydIters);const u=this.assignment(n,o,r.n,!0),l=this.masses(n,u,t.density,r.n),f=this.weights(n,l,r.n);return n.end(),e.copyBufferToBuffer(o,0,i.outPoints,0,r.n*8),e.copyBufferToBuffer(l,0,i.outMasses,0,r.n*4),e.copyBufferToBuffer(f,0,i.outWeights,0,r.n*4),e.copyBufferToBuffer(u,0,i.outOwner,0,s*4),{points:i.outPoints,weights:i.outWeights,owner:i.outOwner,masses:i.outMasses}}recordAssignment(e,t,r,i){const s=this.need();if(r>s.nMax)throw new Error("count exceeds prepared nMax");const n=e.beginComputePass({label:"assignment"}),o=this.assignment(n,t,r,!0);n.end(),e.copyBufferToBuffer(o,0,i,0,s.width*s.height*4)}debug={masses:(e,t,r,i)=>{const s=e.beginComputePass(),n=this.masses(s,t,r,i);return s.end(),n},rank:(e,t,r)=>{const i=e.beginComputePass();return this.sorter.record(i,t,r),i.end(),{rank:this.sorter.rank,idxOfRank:this.sorter.idxOfRank}},adjacency:(e,t,r,i)=>{const s=e.beginComputePass(),n=this.adjacency(s,t,r,i);return s.end(),n},matching:(e,t,r,i,s,n)=>{const o=e.beginComputePass();return this.matching(o,t,r,i,s,n),o.end(),{target:this.b.target,matched:this.b.matched,alive:this.b.alive}},mergeRound:(e,t,r,i,s)=>{const n=e.beginComputePass();return this.mergeRound(n,t,r,i,s,this.b.ptsC),n.end(),this.b.ptsC},assignmentNoRecovery:(e,t,r,i)=>{const s=e.beginComputePass(),n=this.assignment(s,t,r,!1);s.end(),e.copyBufferToBuffer(n,0,i,0,this.need().width*this.need().height*4)},mergeOnly:(e,t)=>{const r=this.need(),i=this.b;e.copyBufferToBuffer(t.points,0,i.ptsB,0,r.nMax*8);const s=e.beginComputePass();let n=i.ptsB,o=i.ptsC;for(const c of this.plan)c.remove!==0&&(this.mergeRound(s,n,c.nIn,c.remove,t.density,o),[n,o]=[o,n]);return s.end(),n},plan:()=>this.plan.slice(),schedule:()=>this.schedule.slice()};disposeBuffers(){for(const e of Object.values(this.b))e.destroy();this.b={},this.scanner?.dispose(),this.sorter?.dispose(),this.u?.dispose();for(const e of Object.values(this.k))e.clearCache()}dispose(){this.disposeBuffers(),this.params=null}}function xi(a){return new bi(a)}const _i=32,ki=2147483647;function Ti(a,e,t,r,i,s){if(!Number.isInteger(e)||!Number.isInteger(t)||e<1||t<1)throw new RangeError(`oversampler: width and height must be positive integers, got ${e}x${t}`);if(a.length!==e*t)throw new RangeError(`oversampler: density length ${a.length} != ${e}*${t}`);if(!Number.isInteger(r)||r<1)throw new RangeError(`oversampler: count must be a positive integer, got ${r}`);if(!Number.isInteger(i)||i<0||i>ki)throw new RangeError(`oversampler: seed must be an integer in [0, 2^31-1], got ${i}`);if(!Number.isInteger(s)||s<0)throw new RangeError(`oversampler: tileCap must be a non-negative integer, got ${s}`)}async function Et(a={}){const t=(await import(a.moduleUrl??new URL(""+new URL("oversampler-D5D06H5m.mjs",import.meta.url).href,import.meta.url).href)).default,r={};if(a.wasmUrl){const n=a.wasmUrl;r.locateFile=(o,c)=>o.endsWith(".wasm")?n:c+o}const i=await t(r);let s=!1;return{sample(n,o,c,u,l,f=_i){if(s)throw new Error("oversampler: disposed");Ti(n,o,c,u,l,f);const h=i._malloc(n.length*4),d=i._malloc(u*2*4);try{i.HEAPF32.set(n,h>>>2);const p=i._gs_density_to_points(h,BigInt(c),BigInt(o),BigInt(u),BigInt(l),BigInt(f),d);if(p!==BigInt(u))throw new Error(`oversampler: sampler returned ${p}, expected ${u}`);return i.HEAPF32.slice(d>>>2,(d>>>2)+u*2)}finally{i._free(d),i._free(h)}},dispose(){s=!0}}}class Ei{device;options;marks={};start=performance.now();last=this.start;constructor(e,t){this.device=e,this.options=t}async mark(e){this.options.profile&&await this.device.queue.onSubmittedWorkDone();const t=performance.now();this.marks[e]=+(t-this.last).toFixed(2),this.last=t}check(){if(this.options.signal?.aborted)throw new Cr("run aborted")}finish(){return this.marks.total=+(performance.now()-this.start).toFixed(2),this.marks}}class Pi{device;bundle;sessions;heads;defaultHead;oversampler;placement;sizeBuffers=null;kernels;adapter;constructor(e,t,r,i,s,n,o){this.device=e,this.bundle=t,this.sessions=r,this.heads=i,this.defaultHead=s,this.oversampler=n,this.placement=o,this.kernels=new Kr(e),this.adapter=ei(e)}get manifest(){return this.bundle.manifest}get headKinds(){const e=[this.defaultHead];return this.defaultHead==="wgsl"?e.push("ort"):this.heads.wgsl&&e.push("wgsl"),e}selectHead(e){if((e??this.defaultHead)==="wgsl"){if(!this.heads.wgsl)throw new Error("wgsl head unavailable: the bundle has no correction_head_wgsl weights");return this.heads.wgsl}return this.heads.ort}buffersFor(e,t){const r=this.sizeBuffers;if(r&&r.width===e&&r.height===t)return r;if(r)for(const n of[r.image,r.density,r.logcov,r.rgb,r.rate])n.destroy();const i=e*t,s={width:e,height:t,image:E(this.device,3*i*4,"image"),density:E(this.device,i*4,"density"),logcov:E(this.device,3*i*4,"logcov"),rgb:E(this.device,3*i*4,"rgbmap"),rate:E(this.device,i*4,"rate")};return this.sizeBuffers=s,s}async run(e,t={}){const r=new Ei(this.device,t),i=this.bundle.manifest,s=Math.max(1,Math.floor(t.states??i.model.correction_iterations)),n=t.seed??i.sampler.seed_default,o=Ne(e,i.input.pad_multiple),{width:c,height:u}=o,l=this.buffersFor(c,u);this.device.queue.writeBuffer(l.image,0,o.planar.buffer,o.planar.byteOffset,o.planar.byteLength),await r.mark("input"),r.check();const f=await this.forwardMap(l,r);r.check();const h=Math.max(1,Math.trunc(f.rateSum)),d=Math.max(1,Math.trunc(t.count!==void 0?t.count:f.rateSum*(t.countScale??1))),p=Math.max(d,Math.ceil(i.sampler.oversample*d)),g=this.oversampler.sample(f.density,c,u,p,n,i.sampler.tile_cap);if(g.length!==2*p)throw new Br(`oversampler returned ${g.length/2} points, expected ${p}`);await r.mark("oversample"),r.check();const w=this.place(l,g,d,p,Math.min(0,Math.log(h/d)));await r.mark("placement_submit"),r.check();const v=this.selectHead(t.headBackend);v.prepare(c,u);const b=_e(this.device,w.weight,d*4),m=await this.refine(w,v,s,t,r),_=new Float32Array(await b);return w.dispose(),{width:c,height:u,crop:o.crop,n:d,adaptiveCount:h,seed:n,states:s,density:f.density,weight:_,...m.init?{init:m.init}:{},final:m.final,...m.snapshots?{snapshots:m.snapshots}:{},timings:r.finish()}}async forwardMap(e,t){const r=this.bundle.manifest,{width:i,height:s}=e,n=i*s,o=i===512&&s===512&&this.sessions.fmStatic||this.sessions.fmDynamic,c=await xt(o,r.io.forward_map.input,e.image,[1,3,s,i]),u=new Map(c.map(w=>[w.name,w])),l=w=>{const v=u.get(w);if(!v)throw new Error(`forward map output ${w} missing`);return v.buffer},f=this.device.createCommandEncoder();f.copyBufferToBuffer(l("density"),0,e.density,0,n*4),f.copyBufferToBuffer(l("log_cov"),0,e.logcov,0,3*n*4),f.copyBufferToBuffer(l("rgb"),0,e.rgb,0,3*n*4),f.copyBufferToBuffer(l("rate"),0,e.rate,0,n*4),this.device.queue.submit([f.finish()]),_t(c),await t.mark("forward_map");const[h,d]=await Promise.all([_e(this.device,e.density,n*4),_e(this.device,e.rate,n*4)]),p=new Float32Array(d);let g=0;for(let w=0;w<p.length;w++)g+=p[w];return await t.mark("readback_maps"),{density:new Float32Array(h),rateSum:g}}place(e,t,r,i,s){if(!this.placement)throw new Error("placement stage unavailable: no Placement implementation was provided");const n=this.bundle.manifest,{width:o,height:c}=e,u={width:o,height:c,n:r,nMax:i,mergeRounds:n.sampler.merge_rounds,perRoundFraction:n.sampler.per_round_fraction,knnK:n.sampler.knn_k,lloydIters:n.sampler.lloyd_iters};this.placement.prepare(u);const l=new Zr(this.device,this.kernels,{width:o,height:c,n:r,xyStep:n.model.correction_xy_step_pixels/Math.max(o,c),covShift:s}),f=le(this.device,t,"oversampled"),h=this.device.createCommandEncoder(),d=this.placement.record(h,{density:e.density,points:f});h.copyBufferToBuffer(d.points,0,l.xy,0,2*r*4),h.copyBufferToBuffer(d.weights,0,l.weight,0,r*4);const p=h.beginComputePass({label:"pack-init"});return l.recordPackStatic(p,e.image,e.density,e.logcov,e.rgb),l.recordInitAttrs(p),p.end(),this.device.queue.submit([h.finish()]),f.destroy(),l}async refine(e,t,r,i,s){const{width:n,height:o}=e,c=i.includeLatent!==!1,u=!!i.keepStates&&!i.onState,l=[];let f=null,h=null;for(let p=0;p<r;p++){const g=p===r-1,w=p===0&&i.includeInit!==!1,v=!!i.includeRendered||g,b=this.device.createCommandEncoder();if(e.recordRender(b),u&&(p>0||w||g)&&l.push(e.recordSnapshot(b,p,v,c)),this.device.queue.submit([b.finish()]),!u&&(w||g||i.onState)){const m=await e.snapshot(p,v,c);w&&(f=m),g&&(h=m),i.onState?.(p,m)}if(await s.mark(`state_${p}`),s.check(),g)break;await this.applyHead(e,t,n,o,p,i,s),s.check()}let d;if(l.length>0&&(d=await Promise.all(l.map(p=>e.readDeferred(p))),i.includeInit!==!1&&d[0]?.k===0&&(f=d[0]),h=d[d.length-1],await s.mark("readback_states")),!h)throw new Error("internal: missing final snapshot");return{init:f,final:h,snapshots:d}}async applyHead(e,t,r,i,s,n,o){const c=async(f,h)=>n.profile?(this.device.queue.submit([f.finish()]),await o.mark(h),this.device.createCommandEncoder()):f;let u=this.device.createCommandEncoder();e.recordHardCount(u),u=await c(u,`hardcount_${s}`);let l;t.record?(l=t.record(u,e.features,r,i),u=await c(u,`head_run_${s}`)):(this.device.queue.submit([u.finish()]),l=await t.run(e.features,r,i),n.profile&&await o.mark(`head_run_${s}`),u=this.device.createCommandEncoder()),e.recordPostHead(u,l),this.device.queue.submit([u.finish()]),t.record||t.release(),await o.mark(`head_${s}`)}dispose(){const e=this.sizeBuffers;if(e)for(const t of[e.image,e.density,e.logcov,e.rgb,e.rate])t.destroy();this.placement?.dispose(),this.oversampler.dispose?.(),this.sessions.fmDynamic.release(),this.sessions.fmStatic?.release(),this.heads.ort.dispose(),this.heads.wgsl?.dispose()}}async function Ai(a){if(typeof navigator>"u"||!("gpu"in navigator))throw new Ce("navigator.gpu is unavailable");if(!await navigator.gpu.requestAdapter({powerPreference:a.powerPreference}))throw new Ce("no WebGPU adapter");Qr({wasmPaths:a.ortWasmPaths,logLevel:a.ortLogLevel,powerPreference:a.powerPreference});const e=await Lr(a.bundleUrl),t=e.manifest.renderer;if(t.tile!==N||t.large_tile_threshold!==ve)throw new G(`bundle renderer rules (tile ${t.tile}, large ${t.large_tile_threshold}) differ from the kernels (${N}, ${ve})`);const r=m=>e.models.get(m),i=await oe(r("forward_map:dynamic")),s=await oe(r("correction_head:dynamic")),n=r("forward_map:static512"),o=r("correction_head:static512"),c=n?await oe(n,{graphCapture:!0}):null,u=o?await oe(o,{graphCapture:!0}):null,l=await ti(),f=a.oversampler?await a.oversampler():await Et(),h=a.placement?await a.placement(l):xi(l),d=new ii(s,u,e.manifest.io.correction_head.input,e.manifest.io.correction_head.output);let p=null;const g=r("correction_head_wgsl:any"),w=r("correction_head_wgsl_layout:any");if(a.headBackend!=="ort"&&g&&w){const{layout:m,weights:_}=gi(w,g);p=new Ie(l,m,_)}else if(a.headBackend==="wgsl")throw new Error("headBackend wgsl requested but the bundle has no correction_head_wgsl files");const v=p?"wgsl":"ort",b=new Pi(l,e,{fmDynamic:i,fmStatic:c},{ort:d,wgsl:p},v,f,h);if(a.warmup){const{width:m,height:_}=a.warmup,T=new Float32Array(3*m*_).fill(.5);try{await b.run({data:T,width:m,height:_},{states:2,count:64})}catch{}}return b}const ue=a=>new URL(a,document.baseURI).href;let rt=null;function De(){return rt??=Ai({bundleUrl:ue("models/"),ortWasmPaths:ue("ort/"),oversampler:()=>Et({moduleUrl:ue("oversampler/oversampler.mjs"),wasmUrl:ue("oversampler/oversampler.wasm")}),warmup:{width:512,height:512}}),rt}function Si(a){const e=a.toLowerCase();return/swiftshader|llvmpipe|lavapipe|software|\bwarp\b|cpu/.test(e)?"software":/nvidia|amd|radeon|apple|qualcomm|adreno|\barm\b|mali/.test(e)?"fast":/intel|integrated|iris|uhd|gen-?\d/.test(e)?"slow":"unknown"}const it=768;function Pt(a,e){const t=Math.max(a,e);if(t<=it)return{width:a,height:e,resized:!1};const r=it/t;return{width:Math.max(1,Math.round(a*r)),height:Math.max(1,Math.round(e*r)),resized:!0}}async function At(a){const e=await createImageBitmap(a),t=Pt(e.width,e.height);if(!t.resized)return e;try{return await createImageBitmap(e,{resizeWidth:t.width,resizeHeight:t.height,resizeQuality:"high"})}finally{e.close()}}async function Ri(a){const e=await De();return Ne(a,e.manifest.input.pad_multiple)}async function Bi(a,e,t=1){const r=await De();return{run:await r.run({data:a.planar,width:a.width,height:a.height,prepared:!0},{states:e,countScale:t,includeRendered:!1,includeInit:!1,keepStates:!0,includeLatent:!1}),adapter:r.adapter}}const S=a=>document.getElementById(a),y={canvas:S("view"),stage:S("stage"),empty:S("empty"),live:S("live"),gpuPill:S("gpuPill"),runStatus:S("runStatus"),status:S("status"),imageDrop:S("imageDrop"),imageInput:S("image"),thumb:S("thumb"),imageName:S("imageName"),imageDims:S("imageDims"),samples:S("samples"),refine:S("refine"),refineValue:S("refineValue"),count:S("count"),countValue:S("countValue"),statN:S("statN"),psnr:S("psnr"),shownRow:S("shownRow"),shown:S("shown"),shownValue:S("shownValue"),export:S("export"),drop:S("drop"),pick:S("pick"),file:S("file")},V=yr(y.canvas,{backend:"auto"});let z=null,St="scene",H=null,Pe=null,Fe=null,te=!1,Ae=!1;const ze=a=>a.toLocaleString("en-US");let Oe=!1,ie=null,ee="unknown";const Ci={fast:"",slow:"Runs take a few seconds on an integrated GPU.",software:"No GPU: this is a software renderer, runs take minutes.",unknown:""};function Y(a,e,t){y.gpuPill.textContent=a,y.gpuPill.classList.remove("on","warn","bad"),y.gpuPill.classList.add(e),y.gpuPill.title=t}const Se="This page needs WebGPU: a current Chrome or Edge, Safari 26, or Firefox on Windows, with a GPU.";function ae(){if(te)return;if(ie){y.runStatus.textContent=ie;return}if(!Oe){y.runStatus.textContent=H?"Loading the model…":"Loading the model and the sample image…";return}const a=Ci[ee];y.runStatus.textContent=(H?"Ready.":"Pick an image to start.")+(a?` ${a}`:"")}V.ready.catch(a=>{Y("no gpu","bad",String(a)),Z(String(a))});De().then(a=>{Oe=!0,ee=Si(a.adapter);const e=a.adapter.split(" · ").pop()??"",t=`${a.adapter} (viewer: ${V.backendKind}). Runs take well under a second on a discrete GPU, a few seconds on an integrated one, and minutes on a software renderer.`;ee==="fast"?Y(`${e} gpu`,"on",t):ee==="slow"?Y("integrated gpu","warn",t):ee==="software"?Y("no gpu · slow","bad",t):Y("gpu","on",t),ae()}).catch(a=>{ie=a instanceof Ce?Se:`${Se} The engine failed to load: ${String(a)}`,Y("no webgpu","bad",Se),ae()});function Z(a){y.status.hidden=!1,y.status.textContent=a}function he(a,e){a.states.length>1&&a.states[0].label==="initializer"&&(a.states=a.states.slice(1)),z=a,St=e,V.setScene(a),y.empty.hidden=!0;const t=a.states.length-1;y.shownRow.hidden=a.states.length<=1,y.shown.max=String(t),y.shown.value=String(t),V.setState(t),y.shownValue.textContent=Rt(a.states[t].label,t),y.statN.textContent=ze(a.states[0].xy.length/2),y.status.hidden=!0,Bt()}function Rt(a,e){return(a??String(e)).replace(/^refinement /,"")}function Bt(){const a=V.psnr();y.psnr.innerHTML=a===null?"—":`${a.toFixed(2)}<small>dB</small>`}const Fi=()=>Math.max(0,Number(y.refine.value)||0);function We(){const a=Number(y.count.value);return Math.abs(a)<=3?1:Math.pow(2,a/50)}async function Mi(a){if(Pe?.file===a)return Pe.input;const e=await At(a);try{const t=await Ri(e);return Pe={file:a,input:t},t}finally{e.close()}}async function ye(){if(!H)return;if(ie){ae();return}if(te){Ae=!0;return}const a=Fi()+1;te=!0,y.runStatus.textContent=Oe?"Running…":"Loading the model, then running…",y.live.hidden=!1,y.live.textContent=a>1?`running ${a-1} refinements`:"running the initializer";const e=H.name;try{const t=await Mi(H),r=await Bi(t,a,We()),i=Ar(r.run);i.image=t.planar,he(i,e),Fe=r.run.adaptiveCount,Ge(),y.runStatus.textContent=`Done on ${r.adapter}.`}catch(t){y.runStatus.textContent=ie??`Run failed: ${String(t)}`}finally{te=!1,y.live.hidden=!0,y.runStatus.dataset.runs=String(Number(y.runStatus.dataset.runs??0)+1),Ae&&(Ae=!1,ye())}}y.refine.addEventListener("input",()=>{y.refineValue.textContent=y.refine.value});y.refine.addEventListener("change",()=>void ye());function Ge(){const a=We();y.countValue.textContent=a===1?"auto":`×${a.toFixed(2)}`,y.count.title=Fe?`${ze(Fe)} at auto`:""}y.count.addEventListener("input",Ge);y.count.addEventListener("change",()=>{We()===1&&(y.count.value="0"),Ge(),ye()});function qe(a){H=a;const e=new DataTransfer;e.items.add(a),y.imageInput.files=e.files;const t=URL.createObjectURL(a);y.thumb.onload=()=>{const r=y.thumb.naturalWidth,i=y.thumb.naturalHeight,s=Pt(r,i),n=s.resized?` · resized to ${s.width}×${s.height}`:"";y.imageDims.textContent=`${r}×${i} · ${(a.size/1024).toFixed(0)} KB${n}`},y.thumb.src=t,y.imageName.textContent=a.name,ae(),ye()}y.imageDrop.addEventListener("click",()=>y.imageInput.click());y.imageInput.addEventListener("change",()=>{const a=y.imageInput.files?.[0];a&&qe(a)});y.stage.addEventListener("dragover",a=>{a.preventDefault(),y.stage.classList.add("over")});y.stage.addEventListener("dragleave",()=>y.stage.classList.remove("over"));y.stage.addEventListener("drop",a=>{a.preventDefault(),y.stage.classList.remove("over");const e=a.dataTransfer?.files?.[0];e&&(e.type.startsWith("image/")?qe(e):He([e]))});const pe=Array.from({length:24},(a,e)=>`kodim${String(e+1).padStart(2,"0")}`);for(const a of pe){const e=document.createElement("button");e.type="button",e.dataset.sample=a,e.title=a,e.setAttribute("role","option"),e.setAttribute("aria-pressed","false");const t=document.createElement("img");t.src=`samples/kodak/thumbs/${a}.jpg`,t.alt=a,t.loading="lazy",e.append(t),e.addEventListener("click",()=>void Ct(a)),y.samples.append(e)}async function Ct(a){for(const e of y.samples.querySelectorAll("button"))e.setAttribute("aria-pressed",String(e.dataset.sample===a));try{const e=await(await fetch(new URL(`samples/kodak/${a}.png`,document.baseURI).href)).blob();qe(new File([e],`${a}.png`,{type:"image/png"})),y.samples.querySelector(`button[data-sample="${a}"]`)?.scrollIntoView({block:"nearest",inline:"center"})}catch(e){Z(`Could not load ${a}: ${String(e)}`),ae()}}const Re=new URLSearchParams(location.search).get("sample");Ct(Re&&pe.includes(Re)?Re:pe[Math.floor(Math.random()*pe.length)]);async function at(a){if(a.image||!H)return a;const e=await At(H);try{e.width===a.width&&e.height===a.height&&(a.image=Ne(e,1).planar)}finally{e.close()}return a}async function He(a){const e=Array.from(a),t=e.find(i=>i.name.endsWith(".npz")),r=e.find(i=>i.name.endsWith(".splat2d"));try{if(r){he(await at(Rr(await r.arrayBuffer())),r.name);return}if(t){he(await at(await Er(await t.arrayBuffer())),t.name);return}const i=c=>e.find(u=>u.name.endsWith(c)),s=i(".points.npy"),n=i(".cov.npy"),o=i(".rgb.npy");if(s&&n&&o){const c=Number(prompt("Frame width in pixels","512")),u=Number(prompt("Frame height in pixels","512"));he(Pr({points:await s.arrayBuffer(),cov:await n.arrayBuffer(),rgb:await o.arrayBuffer()},{width:c,height:u}),s.name);return}Z("Drop a .splat2d, an .npz, or the three .points/.cov/.rgb .npy files.")}catch(i){Z(`Load failed: ${String(i)}`)}}y.drop.addEventListener("dragover",a=>{a.preventDefault(),a.stopPropagation(),y.drop.classList.add("over")});y.drop.addEventListener("dragleave",()=>y.drop.classList.remove("over"));y.drop.addEventListener("drop",a=>{a.preventDefault(),a.stopPropagation(),y.drop.classList.remove("over"),a.dataTransfer?.files&&He(a.dataTransfer.files)});y.pick.addEventListener("click",()=>y.file.click());y.file.addEventListener("change",()=>{y.file.files&&He(y.file.files)});y.shown.addEventListener("input",()=>{V.setState(Number(y.shown.value))});V.on("statechange",({k:a})=>{y.shown.value=String(a),y.shownValue.textContent=Rt(z?.states[a]?.label,a),te||Bt()});for(const a of["image","diff","density","voronoi","centers","ellipses"])S(`ov-${a}`).addEventListener("change",e=>V.setOverlay(a,e.target.checked));y.export.addEventListener("click",()=>{if(!z){Z("Nothing to export yet.");return}const a=Sr(z,{stateIndex:Number(y.shown.value)||z.states.length-1}),e=document.createElement("a");e.href=URL.createObjectURL(a),e.download=`${St.replace(/\.[^.]+$/,"")}.splat2d`,e.click();const t=z.crop??{w:z.width,h:z.height};Z(`Exported ${ze(z.states[0].xy.length/2)} Gaussians at ${t.w}×${t.h} as .splat2d, ${(a.size/1e6).toFixed(1)} MB.`),setTimeout(()=>URL.revokeObjectURL(e.href),1e3)});
