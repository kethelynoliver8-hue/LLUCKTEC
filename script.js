document.documentElement.classList.remove('no-js');


const header=document.querySelector('.site-header');
const hero=document.querySelector('.hero');
const visual=document.querySelector('.hero-visual');
const bg=document.querySelector('.hero-bg');
const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.querySelector('.mobile-menu');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer=matchMedia('(hover: hover) and (pointer: fine)').matches;

// Cabeçalho sólido após o início do scroll.
const syncHeader=()=>header.classList.toggle('scrolled',scrollY>18);
syncHeader(); addEventListener('scroll',syncHeader,{passive:true});

// Menu mobile acessível.
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');mobileMenu.classList.remove('open');mobileMenu.setAttribute('aria-hidden','true')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';if(open)return closeMenu();menuButton.setAttribute('aria-expanded','true');menuButton.setAttribute('aria-label','Fechar menu');mobileMenu.classList.add('open');mobileMenu.setAttribute('aria-hidden','false')});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu()});

// Tilt 3D: RAF evita múltiplas escritas de estilo por frame.
if(finePointer&&!reduced){let raf=0,px=0,py=0;const render=()=>{raf=0;const r=hero.getBoundingClientRect();const nx=(px-r.left)/r.width-.5,ny=(py-r.top)/r.height-.5;visual.style.transform=`rotateX(${(-ny*3.2).toFixed(2)}deg) rotateY(${(nx*4.5).toFixed(2)}deg) translate3d(${(-nx*5).toFixed(1)}px,${(-ny*3).toFixed(1)}px,0)`;bg.style.backgroundPosition=`calc(100% + ${(nx*8).toFixed(1)}px) calc(0% + ${(ny*5).toFixed(1)}px)`};hero.addEventListener('pointerenter',()=>hero.classList.add('is-hovering'));hero.addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;if(!raf)raf=requestAnimationFrame(render)},{passive:true});hero.addEventListener('pointerleave',()=>{hero.classList.remove('is-hovering');visual.style.transform='rotateX(0) rotateY(0) translate3d(0,0,0)';bg.style.backgroundPosition='100% 0%'})}

// Partículas discretas para profundidade tecnológica.
const canvas=document.querySelector('#particles'),ctx=canvas.getContext('2d');let particles=[],anim=0,visible=true;
function resize(){const d=Math.min(devicePixelRatio||1,2),r=canvas.getBoundingClientRect();canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);ctx.setTransform(d,0,0,d,0,0);particles=Array.from({length:innerWidth<700?10:24},()=>({x:Math.random()*r.width,y:Math.random()*r.height,s:Math.random()*1.2+.3,v:Math.random()*.13+.03,a:Math.random()*.45+.1}))}
function draw(){if(!visible||reduced)return;const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const p of particles){p.y-=p.v;if(p.y<0){p.y=r.height;p.x=Math.random()*r.width}ctx.beginPath();ctx.fillStyle=`rgba(70,190,255,${p.a})`;ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill()}anim=requestAnimationFrame(draw)}
if(!reduced){resize();draw();addEventListener('resize',resize,{passive:true});new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(visible&&!anim)draw();else if(!visible){cancelAnimationFrame(anim);anim=0}},{threshold:.05}).observe(hero)}



/* ==========================================================
   SERVIÇOS — Linha de Energia LLUCKTEC
   ========================================================== */
(() => {
  const section=document.querySelector('.services-section'); if(!section)return;
  const journey=section.querySelector('#energy-journey'),stationsHost=section.querySelector('#energy-stations'),svg=section.querySelector('#energy-circuit');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
  const WA='https://wa.me/5548991169113?text=';
  const services=[
    {n:'01',icon:'assets/images/residencial.png',alt:'Casa em wireframe representando instalações elétricas residenciais',title:'Instalações Elétricas<br>Residenciais',plain:'Instalações Elétricas Residenciais',desc:'Projetos elétricos completos para obra nova, reforma ou retrofit — do quadro de distribuição aos pontos de tomada e iluminação, com segurança certificada.'},
    {n:'02',icon:'assets/images/industrial.png',alt:'Quadro de comando em wireframe representando instalações industriais',title:'Projetos e Instalações<br>Industriais',plain:'Projetos e Instalações Industriais',desc:'Execução de infraestrutura elétrica industrial: quadros de comando, cabeamento, subestações e adequação às normas NR10 e NBR 14039.'},
    {n:'03',icon:'assets/images/manutencao.png',alt:'Chave de manutenção com raio em wireframe neon',title:'Manutenção Preventiva e<br>Corretiva',plain:'Manutenção Preventiva e Corretiva',desc:'Diagnóstico técnico e manutenção de instalações elétricas residenciais e industriais, com atendimento emergencial 24h.'},
    {n:'04',icon:'assets/images/automacao.png',alt:'Hub tecnológico em wireframe representando automação',title:'Automação Residencial e<br>Industrial',plain:'Automação Residencial e Industrial',desc:'Integração de sistemas automatizados — de iluminação inteligente a controle de processos industriais com CLP e sensores.'},
    {n:'05',icon:'assets/images/spda.png',alt:'Edificação com para-raios e aterramento em wireframe',title:'Padrão de Entrada e<br>Aterramento (SPDA)',plain:'Padrão de Entrada e Aterramento (SPDA)',desc:'Instalação de padrão de entrada junto à concessionária, aterramento e sistemas de proteção contra descargas atmosféricas.'},
    {n:'06',icon:'assets/images/laudos.png',alt:'Projeto técnico com selo de aprovação em wireframe',title:'Laudos Técnicos e<br>ART/TRT',plain:'Laudos Técnicos e ART/TRT',desc:'Vistoria, laudo técnico e emissão de ART/TRT por profissionais habilitados, garantindo segurança jurídica em todo o projeto.'}
  ];
  stationsHost.innerHTML=services.map((s,i)=>`<article class="energy-station" data-station="${i}"><div class="energy-visual"><div class="energy-hud" aria-hidden="true"></div><img class="energy-icon" src="${s.icon}" alt="${s.alt}" loading="${i<2?'eager':'lazy'}" decoding="async"></div><div class="energy-copy"><span class="energy-number">${s.n}</span><h3>${s.title}</h3><p>${s.desc}</p><a class="energy-more" href="${WA}${encodeURIComponent('Olá! Vim através do site da LLUCKTEC e quero saber mais sobre '+s.plain+'.')}" target="_blank" rel="noopener noreferrer">Saiba mais <span aria-hidden="true">→</span></a></div></article>`).join('');
  const stations=[...stationsHost.querySelectorAll('.energy-station')],head=section.querySelector('.services-head'),cta=section.querySelector('.services-cta');
  const show=el=>el&&el.classList.add('is-visible');
  if(reduced||!('IntersectionObserver'in window)){show(head);stations.forEach(show);show(cta)}else{
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target)}}),{threshold:.16,rootMargin:'0px 0px -10% 0px'});[head,...stations,cta].forEach(el=>io.observe(el));
  }

  const NS='http://www.w3.org/2000/svg',mk=(tag,attrs={})=>{const e=document.createElementNS(NS,tag);Object.entries(attrs).forEach(([k,v])=>e.setAttribute(k,v));return e};
  let mainPath=null,livePath=null,nodes=[],pathLength=1;
  const rel=(r,b)=>({left:r.left-b.left,right:r.right-b.left,top:r.top-b.top,bottom:r.bottom-b.top,cx:(r.left+r.right)/2-b.left,cy:(r.top+r.bottom)/2-b.top});
  function buildRoute(points,w,mobile){
    if(!points.length)return'';let d=`M ${points[0].x} ${points[0].y}`;
    for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i],mid=(a.y+b.y)/2;if(mobile){const lane=i%2?Math.min(w*.18,72):Math.min(w*.28,108);d+=` L ${a.x} ${mid-18} L ${lane} ${mid-18} L ${lane} ${mid+18} L ${b.x} ${mid+18} L ${b.x} ${b.y}`}else{const lane=i%2?w*.56:w*.44;d+=` L ${a.x} ${mid-26} L ${lane} ${mid-26} L ${lane} ${mid+26} L ${b.x} ${mid+26} L ${b.x} ${b.y}`}}return d;
  }
  function drawEnergy(){
    const b=journey.getBoundingClientRect();if(!b.width||!b.height)return;svg.setAttribute('viewBox',`0 0 ${b.width} ${b.height}`);svg.innerHTML='';nodes=[];
    const mobile=innerWidth<768,rects=stations.map(s=>rel(s.getBoundingClientRect(),b));
    const points=rects.map((r,i)=>mobile?({x:Math.min(b.width*.13,48),y:r.top+Math.min(86,(r.bottom-r.top)*.22)}):({x:i%2?b.width*.54:b.width*.46,y:r.cy}));
    const start={x:mobile?points[0].x:b.width*.5,y:Math.max(8,points[0].y-150)},end={x:mobile?points.at(-1).x:b.width*.5,y:Math.min(b.height-20,points.at(-1).y+150)},all=[start,...points,end],d=buildRoute(all,b.width,mobile);
    svg.append(mk('path',{d,class:'energy-path-glow'}),mk('path',{d,class:'energy-path-base'}));
    mainPath=mk('path',{d,class:'energy-path-live'});mainPath.setAttribute('pathLength','1');mainPath.style.strokeDasharray='1';mainPath.style.strokeDashoffset='1';svg.append(mainPath);livePath=mainPath;
    const red=mk('path',{d,class:'energy-path-red',pathLength:'1'});svg.append(red);
    points.forEach((pt,i)=>{const g=mk('g',{class:'energy-node','data-node':i});g.append(mk('circle',{cx:pt.x,cy:pt.y,r:9,class:'energy-node-ring'}),mk('circle',{cx:pt.x,cy:pt.y,r:2.5,class:'energy-node-core'}));svg.append(g);nodes.push(g);const r=rects[i],target=mobile?{x:r.left+18,y:r.top+45}:{x:i%2?r.left:r.right,y:r.cy};const branch=`M ${pt.x} ${pt.y} L ${target.x} ${pt.y} L ${target.x} ${target.y}`;svg.append(mk('path',{d:branch,class:'energy-branch'}))});
    try{pathLength=mainPath.getTotalLength()||1}catch{pathLength=1}
    syncEnergy();
  }
  let ticking=false;
  function syncEnergy(){
    ticking=false;if(reduced||!livePath)return;const r=journey.getBoundingClientRect(),vh=innerHeight||1;const start=vh*.72,end=vh*.26-r.height;const progress=Math.max(0,Math.min(1,(start-r.top)/(start-end)));livePath.style.strokeDashoffset=String(1-progress);
    stations.forEach((s,i)=>{const sr=s.getBoundingClientRect(),active=sr.top<vh*.68;nodes[i]?.classList.toggle('is-active',active)});
  }
  // O circuito de Serviços só acompanha o scroll enquanto a própria seção está próxima da viewport.
  // Isso evita leituras de layout dos seis cards enquanto o usuário está em Certificações/Regiões.
  let energyTracking=false;
  if('IntersectionObserver'in window){new IntersectionObserver(([e])=>{energyTracking=e.isIntersecting;if(energyTracking)syncEnergy()},{rootMargin:'160px 0px',threshold:0}).observe(section)}else energyTracking=true;
  const onScroll=()=>{if(energyTracking&&!ticking){ticking=true;requestAnimationFrame(syncEnergy)}};addEventListener('scroll',onScroll,{passive:true});
  let rt;const schedule=()=>{clearTimeout(rt);rt=setTimeout(drawEnergy,160)};addEventListener('resize',schedule,{passive:true});if('ResizeObserver'in window)new ResizeObserver(schedule).observe(journey);requestAnimationFrame(drawEnergy);
  if(fine&&!reduced)stations.forEach((s,i)=>{s.addEventListener('mouseenter',()=>{stations.forEach((o,j)=>o.classList.toggle('is-dim',j!==i));nodes[i]?.classList.add('is-hot')});s.addEventListener('mouseleave',()=>{stations.forEach(o=>o.classList.remove('is-dim'));nodes[i]?.classList.remove('is-hot')})});

  if(!reduced&&innerWidth>=768){const canvas=section.querySelector('#services-particles'),ctx=canvas.getContext('2d');let pts=[],raf=0,active=false,last=0;function resizeP(){const r=section.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.4);canvas.width=Math.max(1,Math.round(r.width*d));canvas.height=Math.max(1,Math.round(r.height*d));canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:innerWidth>=1200?18:10},()=>({x:Math.random()*r.width,y:Math.random()*r.height,s:.3+Math.random()*.7,v:.05+Math.random()*.11}))}function loop(t){if(!active){raf=0;return}raf=requestAnimationFrame(loop);if(t-last<40)return;last=t;const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);ctx.fillStyle='rgba(124,200,255,.34)';pts.forEach(p=>{p.y-=p.v;if(p.y<0)p.y=r.height;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fill()})}resizeP();new IntersectionObserver(([e])=>{active=e.isIntersecting;section.classList.toggle('is-paused',!active);if(active&&!raf)raf=requestAnimationFrame(loop);else if(!active&&raf){cancelAnimationFrame(raf);raf=0}},{threshold:.02}).observe(section);addEventListener('resize',()=>setTimeout(resizeP,180),{passive:true})}
})();


/* ==========================================================
   CERTIFICAÇÕES — Sistema de Conformidade LLUCKTEC
   ========================================================== */
function initComplianceSystem(){
  const section=document.querySelector('#certificacoes'); if(!section)return;
  const system=section.querySelector('#compliance-system'),svg=section.querySelector('#compliance-circuit');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveal=[...section.querySelectorAll('.compliance-reveal')];
  reveal.forEach((el,i)=>el.style.setProperty('--reveal-delay',`${Math.min(i,8)*90}ms`));
  const show=el=>{el.classList.add('is-visible')};
  if(reduced||!('IntersectionObserver'in window)) reveal.forEach(show);
  else{
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){show(e.target);io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -8% 0px'});
    reveal.forEach(el=>io.observe(el));
  }
  const NS='http://www.w3.org/2000/svg';
  const mk=(tag,attrs)=>{const e=document.createElementNS(NS,tag);Object.entries(attrs||{}).forEach(([k,v])=>e.setAttribute(k,v));return e};
  let groups=[];
  function center(el,base){const r=el.getBoundingClientRect();return{x:r.left+r.width/2-base.left,y:r.top+r.height/2-base.top,left:r.left-base.left,right:r.right-base.left,top:r.top-base.top,bottom:r.bottom-base.top}}
  function orth(a,b,mobile){if(mobile)return`M ${a.x} ${a.bottom} L ${a.x} ${(a.bottom+b.top)/2} L ${b.x} ${(a.bottom+b.top)/2} L ${b.x} ${b.top}`;const mid=(a.y+b.y)/2;return`M ${a.x} ${a.y} L ${a.x} ${mid} L ${b.x} ${mid} L ${b.x} ${b.y}`}
  function drawCompliance(){
    const base=system.getBoundingClientRect();if(!base.width||!base.height)return;svg.setAttribute('viewBox',`0 0 ${base.width} ${base.height}`);svg.innerHTML='';groups=[];
    const core=section.querySelector('[data-node="core"]'),nrs=[...section.querySelectorAll('.compliance-node')],crea=section.querySelector('[data-node="crea"]'),nbr=section.querySelector('[data-node="nbr"]'),valid=section.querySelector('[data-node="valid"]');
    const mobile=innerWidth<640;const pairs=[];if(mobile){const seq=[core,...nrs,crea,nbr,valid];for(let i=0;i<seq.length-1;i++)pairs.push([seq[i],seq[i+1]])}else{nrs.forEach(n=>pairs.push([core,n]));pairs.push([core,crea],[crea,nbr],[nbr,valid])}
    pairs.forEach((pair,i)=>{const a=center(pair[0],base),b=center(pair[1],base),d=orth(a,b,mobile),g=mk('g',{class:'comp-group'});const glow=mk('path',{d,class:'comp-path-glow'}),path=mk('path',{d,class:'comp-path draw',pathLength:'1'}),pulse=mk('path',{d,class:'comp-pulse',pathLength:'1'});path.style.setProperty('--path-delay',`${.15+i*.08}s`);pulse.style.setProperty('--pulse-dur',`${4+(i%4)}s`);pulse.style.setProperty('--pulse-delay',`${-i*.47}s`);const redAccent=[1,4,7,9].includes(i),redPulse=[2,8].includes(i),redNode=[4,9].includes(i);if(redAccent){g.classList.add('has-red-accent');const red=mk('path',{d,class:'comp-red-segment',pathLength:'1'});red.style.setProperty('--red-offset',`${-(.14+(i%4)*.17)}`);g.append(glow,path,red,pulse)}else g.append(glow,path,pulse);if(redPulse)g.classList.add('has-red-pulse');if(redNode)g.classList.add('has-red-node');g.append(mk('circle',{cx:b.x,cy:b.y,r:'4',class:'comp-pad'}));svg.append(g);groups.push({g,a:pair[0],b:pair[1]})});
    system.style.setProperty('--scan-distance',`${Math.max(300,base.height-20)}px`)
  }
  let timer;const schedule=()=>{clearTimeout(timer);timer=setTimeout(drawCompliance,180)};drawCompliance();addEventListener('resize',schedule,{passive:true});if('ResizeObserver'in window)new ResizeObserver(schedule).observe(system);
  section.querySelectorAll('[data-node]').forEach(node=>{node.addEventListener('mouseenter',()=>groups.forEach(x=>x.g.classList.toggle('is-hot',x.a===node||x.b===node)));node.addEventListener('mouseleave',()=>groups.forEach(x=>x.g.classList.remove('is-hot')))});
  // Um único observer controla apenas as animações contínuas da seção.
  // Ele permanece ativo depois da primeira entrada para pausar a GPU/CPU fora da viewport.
  if('IntersectionObserver'in window){
    let activated=false;
    const active=new IntersectionObserver(([e])=>{
      const visible=e.isIntersecting;
      section.classList.toggle('is-paused',!visible);
      system.classList.toggle('is-active',visible);
      if(visible&&!activated){system.classList.add('is-activated');activated=true}
    },{threshold:.06,rootMargin:'120px 0px'});
    active.observe(section);
  }else{system.classList.add('is-activated','is-active')}
}
initComplianceSystem();


/* ==========================================================
   REGIÕES — Google Maps + cidades interativas
   ========================================================== */
function initRegions(){
  const section=document.querySelector('#regioes'); if(!section)return;
  const map=section.querySelector('#regions-map');
  const mapModule=section.querySelector('.map-module');
  const mapPlaceholder=section.querySelector('#map-placeholder');
  let mapLoaded=false,pendingPlace='Grande Florianópolis';
  const loadMap=()=>{if(mapLoaded)return;mapLoaded=true;map.src=map.dataset.src||`https://www.google.com/maps?q=${encodeURIComponent(pendingPlace+', SC, Brasil')}&output=embed`;map.addEventListener('load',()=>mapModule?.classList.add('is-map-ready'),{once:true})};
  if('IntersectionObserver'in window){const mapObserver=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){loadMap();mapObserver.disconnect()}},{rootMargin:'1000px 0px',threshold:0});mapObserver.observe(mapModule)}else loadMap();
  const label=section.querySelector('#map-location');
  const status=section.querySelector('.map-status');
  const external=section.querySelector('#open-google-maps');
  const buttons=[...section.querySelectorAll('.city-item')];
  const baseButton=section.querySelector('#show-base');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mapQuery=place=>`${place}, SC, Brasil`;
  let currentPlace=pendingPlace;
  function selectCity(name,button){
    const query=mapQuery(name);
    // Evita recarregar o iframe quando a cidade selecionada já é a atual.
    const changed=name!==currentPlace;
    pendingPlace=name;
    if(!mapLoaded)loadMap();
    else if(changed)map.src=`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
    currentPlace=name;
    external.href=`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    label.textContent=`${name.toUpperCase()} — SC`;
    buttons.forEach(b=>{const active=b===button;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
    status.classList.remove('is-pulsing');
  }
  buttons.forEach(button=>button.addEventListener('click',()=>selectCity(button.dataset.city,button)));
  baseButton?.addEventListener('click',()=>{const button=buttons.find(b=>b.dataset.city==='Santo Amaro da Imperatriz');selectCity('Santo Amaro da Imperatriz',button);map.focus({preventScroll:true})});
  const reveals=[...section.querySelectorAll('.regions-reveal')];
  if(reduced||!('IntersectionObserver'in window))reveals.forEach(el=>el.classList.add('is-visible'));
  else{const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -10% 0px'});reveals.forEach((el,i)=>{el.style.setProperty('--regions-delay',`${i*90}ms`);el.style.transitionDelay=`var(--regions-delay)`;io.observe(el)})}
}
initRegions();


/* ==========================================================
   DÚVIDAS FREQUENTES — Central Técnica LLUCKTEC
   ========================================================== */
function initFaqCentral(){
  const section=document.querySelector('.faq-section'); if(!section)return;
  const items=[...section.querySelectorAll('.faq-item')],filters=[...section.querySelectorAll('.faq-filter')],count=section.querySelector('#faq-count');
  const setCount=n=>count.textContent=`${n} ${n===1?'QUESTÃO DISPONÍVEL':'QUESTÕES DISPONÍVEIS'}`;
  function closeItem(item){const b=item.querySelector('.faq-question'),a=item.querySelector('.faq-answer');item.classList.remove('is-open');b.setAttribute('aria-expanded','false');a.setAttribute('aria-hidden','true')}
  function openItem(item){items.forEach(other=>{if(other!==item)closeItem(other)});const b=item.querySelector('.faq-question'),a=item.querySelector('.faq-answer');item.classList.add('is-open');b.setAttribute('aria-expanded','true');a.setAttribute('aria-hidden','false')}
  items.forEach(item=>item.querySelector('.faq-question').addEventListener('click',()=>item.classList.contains('is-open')?closeItem(item):openItem(item)));
  filters.forEach(filter=>filter.addEventListener('click',()=>{
    const value=filter.dataset.filter;filters.forEach(f=>{const active=f===filter;f.classList.toggle('is-active',active);f.setAttribute('aria-pressed',String(active))});
    let visible=0;items.forEach(item=>{closeItem(item);const show=value==='all'||item.dataset.category===value;item.hidden=!show;if(show)visible++});setCount(visible);
  }));
  const reveal=[section.querySelector('.faq-head'),section.querySelector('.faq-console'),...items,section.querySelector('.faq-cta')].filter(Boolean);
  if(reduced||!('IntersectionObserver'in window)){reveal.forEach(el=>el.classList.add('is-visible'))}else{
    const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){const el=entry.target,index=items.indexOf(el);if(index>=0)el.style.transitionDelay=`${Math.min(index*45,315)}ms`;el.classList.add('is-visible');io.unobserve(el)}}),{threshold:.1,rootMargin:'0px 0px -10% 0px'});reveal.forEach(el=>io.observe(el));
  }
}
initFaqCentral();


/* ==========================================================
   FOOTER — Final do Circuito LLUCKTEC
   ========================================================== */
function initSiteFooter(){
  const footer=document.querySelector('.site-footer');
  if(!footer)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced||!('IntersectionObserver'in window)){footer.classList.add('is-visible');return}
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){footer.classList.add('is-visible');observer.unobserve(footer)}})},{threshold:.12,rootMargin:'0px 0px -4% 0px'});
  observer.observe(footer);
}
initSiteFooter();


