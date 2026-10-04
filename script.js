const progress = document.querySelector('#progress');
const menuToggle = document.querySelector('#menuToggle');
const navLinks = document.querySelector('#navLinks');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateProgress(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? 'Close' : 'Menu';
});
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = 'Menu';
}));

const reveals = document.querySelectorAll('.reveal');
if (reduceMotion) reveals.forEach(el => el.classList.add('is-visible'));
else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.14, rootMargin:'0px 0px -40px'});
  reveals.forEach(el => observer.observe(el));
}

const dot = document.querySelector('#cursorDot');
const ring = document.querySelector('#cursorRing');
if (!reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;
  window.addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; dot.style.left = `${x}px`; dot.style.top = `${y}px`; });
  const tick = () => { rx += (x-rx)*.15; ry += (y-ry)*.15; ring.style.left=`${rx}px`; ring.style.top=`${ry}px`; requestAnimationFrame(tick); };
  tick();
  document.querySelectorAll('a,button,.project-card,[data-tilt]').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });
}

document.querySelectorAll('[data-magnetic]').forEach(el => {
  if (reduceMotion || !window.matchMedia('(pointer:fine)').matches) return;
  el.addEventListener('pointermove', e => {
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left+r.width/2)) * .16;
    const dy = (e.clientY - (r.top+r.height/2)) * .16;
    el.style.transform = `translate(${dx}px,${dy}px)`;
  });
  el.addEventListener('pointerleave', () => { el.style.transform = ''; });
});

const tilt = document.querySelector('[data-tilt]');
if (tilt && !reduceMotion && window.matchMedia('(pointer:fine)').matches) {
  tilt.addEventListener('pointermove', e => {
    const r = tilt.getBoundingClientRect();
    const px = (e.clientX-r.left)/r.width-.5;
    const py = (e.clientY-r.top)/r.height-.5;
    tilt.style.transform = `perspective(900px) rotateY(${px*3}deg) rotateX(${py*-3}deg)`;
  });
  tilt.addEventListener('pointerleave', () => tilt.style.transform='');
}
