// TCS third edition: slideshows, service showcase, reveals, parallax and live salon hours.
import {services,money,escapeHTML} from './data.js';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
document.documentElement.classList.add('js');
if(!$('#intro-curtain'))document.documentElement.classList.add('no-intro');

// Accra runs on GMT all year. Hours from the salon's Fresha listing: [open, close] in hours, Sunday first.
const HOURS=[[13,18],[8,19],[8,19],[8,18],[8,19],[8,19],[8,19]];
const fmt=h=>`${h>12?h-12:h}${h>=12?'pm':'am'}`;
function salonStatus(){const now=new Date(),d=now.getUTCDay(),h=now.getUTCHours()+now.getUTCMinutes()/60,[o,c]=HOURS[d];
  if(h>=o&&h<c)return{open:true,text:`Open now · until ${fmt(c)}`};
  if(h<o)return{open:false,text:`Opens today at ${fmt(o)}`};
  const n=HOURS[(d+1)%7];return{open:false,text:`Closed now · opens ${fmt(n[0])} tomorrow`};}
const status=$('.hg-status');
if(status){const s=salonStatus();status.querySelector('span').textContent=s.text;status.classList.toggle('closed',!s.open);}
$$('.hours-panel dl>div').forEach(row=>{const t=row.querySelector('dt').textContent,d=new Date().getUTCDay();
  const map={0:/Sunday/,1:/Monday/,2:/Tuesday/,3:/Wednesday/,4:/Thursday/,5:/Thursday/,6:/Thursday/};if(map[d].test(t))row.classList.add('today');});

// Load a lazily held image source when its slide is first shown.
function wake(el){if(!el)return;[el,...el.querySelectorAll('[data-src],[data-srcset]')].forEach(i=>{if(i.dataset.srcset){i.srcset=i.dataset.srcset;delete i.dataset.srcset;}if(i.dataset.src){i.src=i.dataset.src;delete i.dataset.src;}});}
const visible=new WeakMap();
const seen=new IntersectionObserver(es=>es.forEach(e=>visible.set(e.target,e.isIntersecting)),{threshold:.05});

// Hero slideshow with progress bars.
const hero=$('.lux-hero');
if(hero){const slides=$$('.hs'),dots=$$('.hs-dots button'),cap=$('#slide-caption'),pause=$('.hs-pause'),DUR=6500;let i=0,timer,paused=reduce;
  hero.style.setProperty('--dur',DUR+'ms');
  const show=n=>{i=(n+slides.length)%slides.length;wake(slides[i]);wake(slides[(i+1)%slides.length]);slides.forEach((s,k)=>s.classList.toggle('on',k===i));
    dots.forEach((d,k)=>{d.classList.remove('on');d.setAttribute('aria-pressed',String(k===i));if(k===i){void d.offsetWidth;d.classList.add('on');}});
    if(cap)cap.textContent=`${String(i+1).padStart(2,'0')} / ${slides[i].dataset.caption}`;};
  const run=()=>{clearInterval(timer);$('.hs-dots')?.classList.toggle('paused',paused);if(!paused&&!document.hidden)timer=setInterval(()=>show(i+1),DUR);};
  dots.forEach((d,k)=>d.addEventListener('click',()=>{show(k);run();}));
  pause?.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');if(!paused)show(i);run();});
  if(pause&&paused){pause.textContent='▶';pause.setAttribute('aria-label','Play slideshow');}
  document.addEventListener('visibilitychange',run);
  setTimeout(()=>wake(slides[1]||slides[0]),2500);show(0);run();}

// Small crossfading slideshows inside cards, page headers and service categories.
function rotator(box,sel,every,offset=0){const items=[...box.querySelectorAll(sel)];if(items.length<2||reduce)return;const dots=[...box.querySelectorAll('.cat-dots i')];let k=0;seen.observe(box);
  setTimeout(()=>{wake(items[1]);setInterval(()=>{if(visible.get(box)!==true||document.hidden)return;items[k].classList.remove('on');dots[k]?.classList.remove('on');k=(k+1)%items.length;items[k].classList.add('on');dots[k]?.classList.add('on');wake(items[(k+1)%items.length]);},every);},offset);}
function tilt(el){if(!fine||reduce)return;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`perspective(1100px) rotateX(${-(e.clientY-r.top-r.height/2)/60}deg) rotateY(${(e.clientX-r.left-r.width/2)/60}deg)`;});el.addEventListener('pointerleave',()=>el.style.transform='');}
$$('.cat-slides').forEach((b,n)=>rotator(b,'img',3600,n*700));
$$('.pi-slides').forEach(b=>rotator(b,'picture',5200));

// Service showcase: every category with its own slideshow, price list and search.
const CATS=[
 ['Hair Services','Hair care & treatments','Silk presses, Olaplex and Affirm treatments, shampoo and styling.',['lx-silkpress','lx-blowout','work-1-small']],
 ['Hair & styling','Cuts, wigs & styling','Pixie cuts, layering, closure and frontal installs.',['lx-pixie','work-2-small','lx-custom-unit']],
 ['Braids','Braids & twists','Knotless, boho braids and passion twists.',['lx-updo-braid','lx-boho','lx-feedin']],
 ['Colouring Service','Colour','Balayage, highlights, full colour and wig colouring.',['lx-colour','lx-lace','lx-sleek-bun']],
 ['Nails','Nails','Luxury manicures and pedicures, builder gel, acrylics and nail art.',['work-3-small','lx-acrylic','work-4-small']],
 ['Eyebrows & eyelashes','Brows & lashes','Volume lash sets, lamination, microblading and microshading.',['lx-lashes','work-8-small','lx-brows']],
 ['Makeup','Makeup','From a soft glam to full glam and occasion makeup.',['lx-glam','lx-bridal','lx-pearl-bun']],
 ['Lips','Lips','Lip blush and lip neutralisation.',['lx-lips','lx-glow']],
 ['Facials and Aesthetic Treatments','Facials & skin','HydraRadiance, RejuGlow, peels, dermaplaning and microneedling.',['lx-glow','work-6','lx-gel']],
 ['Massage','Massage','Deep tissue, hot stone, lymphatic drainage and reflexology.',['salon-2','salon-4','editorial-spa']],
 ['Wax Services','Waxing','Full and half leg, arm, Hollywood and more.',['lx-afro','lx-pedicure','salon-4']]];
const src=n=>`assets/${n}.webp`;
const results=$('#svc-results');
if(results){let active='all';const search=$('#svc-search'),count=$('#svc-count');
  const list=services.filter(s=>/^\d+$/.test(s.id));
  $('#svc-chips').innerHTML=`<button data-cat="all" aria-pressed="true">All services</button>`+CATS.map((c,n)=>`<button data-cat="${n}" aria-pressed="false">${c[1]}</button>`).join('');
  results.innerHTML=CATS.map((c,n)=>{const rows=list.filter(s=>s.category===c[0]).sort((a,b)=>a.price-b.price);const from=rows.length?Math.min(...rows.map(r=>r.price)):0;
    return `<section class="cat-block" id="cat-${n}" data-cat="${n}"><div class="cat-media tilt">${c[3].map((im,k)=>`<img ${k?`data-src="${src(im)}"`:`src="${src(im)}"`} alt="${escapeHTML(c[1])}" class="${k?'':'on'}" loading="lazy">`).join('')}<div class="cat-dots">${c[3].map((_,k)=>`<i class="${k?'':'on'}"></i>`).join('')}</div><div class="cat-glass"><small>${String(n+1).padStart(2,'0')} · ${rows.length} SERVICES</small><h2>${escapeHTML(c[1])}</h2><p>${escapeHTML(c[2])}</p></div></div>
    <div class="cat-list"><p class="eyebrow">STARTING FROM ${money(from).toUpperCase()}</p>${rows.map(s=>`<article class="svc-row" data-name="${escapeHTML((s.name+' '+c[1]).toLowerCase())}"><h3>${escapeHTML(s.name.trim())}</h3><div class="row-meta"><strong><small>from</small>${money(s.price)}</strong><span>${s.minutes} min</span></div><button data-service="${s.id}" aria-label="Book ${escapeHTML(s.name.trim())}">↗</button></article>`).join('')}</div></section>`;}).join('')+`<p class="svc-empty" hidden>No services match that search. Try “lash”, “braids” or “facial”.</p>`;
  $$('.cat-media').forEach((m,n)=>{rotator(m,'img',3400,n*400);tilt(m);});
  const apply=()=>{const q=search.value.trim().toLowerCase();let shown=0;
    $$('.cat-block').forEach(b=>{let rows=0;b.querySelectorAll('.svc-row').forEach(r=>{const ok=!q||r.dataset.name.includes(q);r.hidden=!ok;if(ok)rows++;});const on=(active==='all'||b.dataset.cat===active)&&rows>0;b.hidden=!on;if(on)shown+=rows;});
    count.textContent=`${shown} ${shown===1?'service':'services'} to explore`;$('.svc-empty').hidden=shown>0;};
  search.addEventListener('input',apply);
  $('#svc-chips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;active=b.dataset.cat;$$('#svc-chips button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));apply();$('.svc-tools').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});});
  const hash=location.hash.match(/^#cat-(\d+)$/);if(hash){active=hash[1];$$('#svc-chips button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.cat===active)));}
  apply();}

// Scroll reveals with a gentle stagger.
const rvTargets='.section-heading,.discovery-copy>*,.category-card,.sig-head>*,.sig-card,.strip-row,.location-story>img,.location-story>div>*,.cl-card,.lf-top>div,.pi-copy>*,.cat-media,.cat-list,.gallery-photo,.contact-card>*,.hours-panel,.num-card,.way-card,.faq details,.plum-story>div>*';
const rvo=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rvo.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});
function arm(){$$(rvTargets).forEach(el=>{if(el.classList.contains('rv'))return;const sib=[...el.parentElement.children].indexOf(el);el.classList.add('rv');el.style.setProperty('--d',`${Math.min(sib,5)*90}ms`);rvo.observe(el);});}
if(!reduce)arm();

// Parallax, nav progress and the floating glass object.
const par=$$('[data-parallax]');let ticking=false;
function frame(){const vh=innerHeight;par.forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>vh)return;const p=(r.top+r.height/2-vh/2)/vh;el.style.transform=`translate3d(0,${p*-(+el.dataset.parallax)}px,0)`;});
  const max=document.documentElement.scrollHeight-vh;$('.nav-shell')?.style.setProperty('--progress',max>0?(scrollY/max).toFixed(4):0);ticking=false;}
addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(frame);}},{passive:true});frame();
if(fine&&!reduce)$$('.plum-story').forEach(sec=>{const g=sec.querySelector('.glass-object');if(!g)return;sec.addEventListener('pointermove',e=>{const r=sec.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;g.style.transform=`perspective(900px) rotateY(${x*28}deg) rotateX(${-y*22}deg) translateZ(20px)`;});sec.addEventListener('pointerleave',()=>g.style.transform='');});

// Count-up numbers.
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;cio.unobserve(e.target);const el=e.target,end=+el.dataset.count,t0=performance.now();
  const step=t=>{const p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+(el.dataset.suffix||'');if(p<1)requestAnimationFrame(step);};reduce?el.textContent=end+(el.dataset.suffix||''):requestAnimationFrame(step);}),{threshold:.4});
$$('[data-count]').forEach(el=>cio.observe(el));
