window.addEventListener('load', () => {
  document.querySelectorAll('.reveal-on-scroll').forEach(el => observe(el));
  startHeroAnimation();
});
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
if (navToggle) { navToggle.addEventListener('click', () => nav.classList.toggle('open')); }
function observe(el) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  io.observe(el);
}
(function() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const subject = encodeURIComponent(`Website Enquiry from ${data.name || 'Visitor'}`);
    const body = encodeURIComponent(`Name: ${data.name || ''}%0AEmail: ${data.email || ''}%0APhone: ${data.phone || ''}%0A%0AMessage:%0A${data.message || ''}`);
    window.location.href = `mailto:info@jadula.co.za?subject=${subject}&body=${body}`;
  });
})();
function startHeroAnimation() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = window.devicePixelRatio || 1;
  function resize() {
    canvas.width = canvas.clientWidth * DPR;
    canvas.height = canvas.clientHeight * DPR;
  }
  window.addEventListener('resize', resize);
  resize();
  const dots = Array.from({ length: 60 }, () => ({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.15 * DPR, vy: (Math.random() - 0.5) * 0.15 * DPR }));
  function step() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const d of dots) {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 1.4 * DPR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = 'rgba(245,211,108,0.7)';
      ctx.fill();
    }
    requestAnimationFrame(step);
  }
  step();
}
