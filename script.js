const nav=document.querySelector('.nav'), reveals=document.querySelectorAll('.reveal'), ring=document.querySelector('.cursor-ring'), dot=document.querySelector('.cursor-dot');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
reveals.forEach((e,i)=>{e.style.transitionDelay=Math.min((i%5)*70,280)+'ms';io.observe(e)});
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
if(matchMedia('(pointer:fine)').matches){
let mx=0,my=0,rx=0,ry=0;addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop)})();
document.querySelectorAll('a,button,.project,.focus-card,.photo-frame').forEach(e=>{e.onmouseenter=()=>ring.classList.add('active');e.onmouseleave=()=>ring.classList.remove('active')});
document.querySelectorAll('.magnetic').forEach(el=>{el.onmousemove=e=>{let r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px,${(e.clientY-r.top-r.height/2)*.12}px)`};el.onmouseleave=()=>el.style.transform=''});
let t=document.querySelector('[data-tilt]');if(t){t.onmousemove=e=>{let r=t.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;t.style.transform=`perspective(900px) rotateY(${x*4}deg) rotateX(${-y*4}deg)`};t.onmouseleave=()=>t.style.transform=''}
}else document.querySelectorAll('.cursor-dot,.cursor-ring').forEach(e=>e.style.display='none');