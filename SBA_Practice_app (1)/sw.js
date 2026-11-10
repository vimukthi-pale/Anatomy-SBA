const CACHE = 'sba-248ab1ac0a';
const ASSETS = ["./", "index.html", "manifest.webmanifest", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "data/check.bin", "data/Head_and_Neck.bin", "data/Thorax.bin", "data/Upper_Limb.bin", "data/Upper_Limb_and_Breast.bin", "data/Lower_Limb.bin", "data/Abdominal_wall.bin", "data/Abdominal_Viscera.bin", "data/Abdominal_Vessel.bin", "data/Pelvis.bin", "data/Perineum.bin", "data/Spine.bin", "data/Neuroanatomy.bin", "data/Autonomic_Nervous_System.bin", "data/Surface.bin", "data/Data_Interpretation_and_Audit.bin", "data/Medicolegal_Aspects_of_Surgery.bin"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
  })));
});
