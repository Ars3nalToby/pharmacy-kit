const CACHE="root-2026-10-31a";
const SHELL=["/","/index.html","/manifest.webmanifest","/icon-192.png","/apple-touch-icon.png","/playbook/icon-192.png","/stockcheck/icon-192.png","/counter/icon-192.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("root-")&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET")return;
  const u=new URL(r.url); if(u.origin!==location.origin)return;
  if(r.mode==="navigate"&&(u.pathname==="/"||u.pathname==="/index.html")){
    e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put("/index.html",c));return res}).catch(()=>caches.match("/index.html")));return;
  }
  if(SHELL.includes(u.pathname)) e.respondWith(caches.match(r).then(hit=>hit||fetch(r)));
});
