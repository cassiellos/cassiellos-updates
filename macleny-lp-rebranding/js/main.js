document.getElementById('year').textContent = new Date().getFullYear();

var header = document.getElementById('site-header');
function onScroll(){
  if (window.scrollY > 24) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

var menuBtn = document.getElementById('menu-btn');
var mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', function(){
  var isOpen = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
mobileMenu.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){
    mobileMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

var steps = document.querySelectorAll('.step');
steps.forEach(function(step, i){
  step.addEventListener('click', function(){
    steps.forEach(function(s){ s.classList.remove('active'); });
    step.classList.add('active');
  });
});
