/* script.js - handles IG avatar fetch, gallery lightbox, slideshow, particles */

const IG_USERNAMES = [
  "eevaaue_","alwalidd.25","heyosmths","girvanagtg","Kosta_ppp","fadliakbar362","5w1h_517",
  "luk_lukmankhak23","alfazkar2212","_firndaa","maelatulw","nation.fajar","rhmiinblaa_",
  "fadilsdhmandi_","rifza_mhda","ilham_suf07","faizmaulana.h","t.lithanrl","fq.bilaa",
  "artheyaelf","knlls_06","haikalkhabibiee","uvwndii._","raemzs","nafis.ainul","vikadwindaa",
  "4rraabb","danweee","riky_aja01","aruuladzim","attilla_mardhotillah_ar_rofiq","samkyy1",
  "kartikadevi_40","akhdanbel","dikamuzaaqi","_ilmanz1","devinargaitunamaorang"
];

const igGrid = document.getElementById('igGrid');

// Utility: fetch Instagram page via allorigins to avoid CORS, then parse og:image
async function fetchProfilePic(username){
  const url = 'https://www.instagram.com/' + username + '/';
  const proxy = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url);
  try{
    const res = await fetch(proxy);
    if(!res.ok) throw new Error('Network not ok');
    const text = await res.text();
    // parse og:image meta tag
    const m = text.match(/property="og:image" content="([^"]+)"/) || text.match(/property='og:image' content='([^']+)'/);
    if(m && m[1]){
      return m[1];
    }else{
      // fallback: try to find "profile_pic_url_hd"
      const m2 = text.match(/"profile_pic_url_hd":"([^"]+)"/);
      if(m2 && m2[1]) return m2[1].replace(/\\u0026/g,'&');
    }
  }catch(e){
    console.warn('fetchProfilePic error', username, e);
  }
  return 'https://i.imgur.com/h7DRznt.jpeg'; // fallback avatar
}

// create IG cards
async function buildIGCards(){
  for(const u of IG_USERNAMES){
    const card = document.createElement('div'); card.className='ig-card';
    const avatar = document.createElement('img'); avatar.className='ig-avatar'; avatar.alt = u + ' profile';
    avatar.src = 'https://i.imgur.com/h7DRznt.jpeg'; // placeholder while fetching
    const meta = document.createElement('div'); meta.className='ig-meta';
    const name = document.createElement('div'); name.className='name'; name.textContent = '@' + u;
    const sub = document.createElement('div'); sub.className='sub'; sub.textContent = 'Loading...';
    meta.appendChild(name); meta.appendChild(sub);
    const action = document.createElement('div'); action.className='ig-action';
    const link = document.createElement('a'); link.href = 'https://instagram.com/' + u; link.target='_blank'; link.rel='noopener'; link.textContent='Kunjungi';
    action.appendChild(link);
    card.appendChild(avatar); card.appendChild(meta); card.appendChild(action);
    igGrid.appendChild(card);
    // fetch profile pic
    fetchProfilePic(u).then(src => {
      avatar.src = src;
      sub.textContent = 'instagram.com/' + u;
    }).catch(()=>{
      sub.textContent = 'instagram.com/' + u;
    });
  }
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lbContent = document.getElementById('lbContent');
const lbClose = document.getElementById('lbClose');
function openLightbox(type, src){
  lbContent.innerHTML='';
  if(type==='img'){
    const i = document.createElement('img'); i.src=src; lbContent.appendChild(i);
  }else if(type==='video'){
    const v = document.createElement('video'); v.src=src; v.controls=true; v.autoplay=true; lbContent.appendChild(v);
  }else if(type==='iframe'){
    const f = document.createElement('iframe'); f.src=src; f.allow='autoplay; encrypted-media'; lbContent.appendChild(f);
  }
  lightbox.style.display='flex';
  lightbox.setAttribute('aria-hidden','false');
  lbClose.style.display='block';
}
function closeLightbox(){ lightbox.style.display='none'; lbContent.innerHTML=''; lbClose.style.display='none'; lightbox.setAttribute('aria-hidden','true'); }
lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) closeLightbox(); });
document.getElementById('lbClose').addEventListener('click', closeLightbox);

// gallery click & slideshow
const gallery = document.getElementById('gallery');
gallery.querySelectorAll('.media-card').forEach(card=>{
  const img = card.querySelector('img');
  const vid = card.querySelector('video');
  if(img){ card.addEventListener('click', ()=> openLightbox('img', img.src)); }
  if(vid){ card.addEventListener('click', ()=> openLightbox('video', vid.querySelector('source').src)); }
});

let slideshowTimer = null;
const cards = Array.from(document.querySelectorAll('.media-card'));
document.getElementById('startSlideshow').addEventListener('click', ()=>{
  if(slideshowTimer) return;
  let idx = 0;
  slideshowTimer = setInterval(()=>{
    const c = cards[idx % cards.length];
    const img = c.querySelector('img');
    const vid = c.querySelector('video');
    if(img) openLightbox('img', img.src);
    else if(vid) openLightbox('video', vid.querySelector('source').src);
    idx++;
  }, 4500);
});
document.getElementById('stopSlideshow').addEventListener('click', ()=>{ clearInterval(slideshowTimer); slideshowTimer = null; closeLightbox(); });

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('dj_theme');
if(saved==='dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) document.documentElement.classList.add('dark-mode');
themeToggle.textContent = document.documentElement.classList.contains('dark-mode')?'🌙':'☀️';
themeToggle.addEventListener('click', ()=>{
  document.documentElement.classList.toggle('dark-mode');
  themeToggle.textContent = document.documentElement.classList.contains('dark-mode')?'🌙':'☀️';
  localStorage.setItem('dj_theme', document.documentElement.classList.contains('dark-mode')?'dark':'light');
});

// Simple particles background
(function particles(){
  const c = document.getElementById('techCanvas');
  if(!c) return;
  const ctx = c.getContext('2d');
  function resize(){ c.width = innerWidth; c.height = innerHeight; }
  window.addEventListener('resize', resize); resize();
  const P = [];
  for(let i=0;i<120;i++) P.push({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.8+0.6,vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,a:Math.random()*0.6+0.2});
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(const p of P){ p.x+=p.vx; p.y+=p.vy; if(p.x<0)p.x=c.width; if(p.x>c.width)p.x=0; if(p.y<0)p.y=c.height; if(p.y>c.height)p.y=0; ctx.beginPath(); ctx.fillStyle='rgba(0,229,255,'+p.a+')'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); }
    requestAnimationFrame(draw);
  }
  draw();
})();

// start
buildIGCards();
