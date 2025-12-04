// Cargar librerías GSAP desde CDN
const gsapScript = document.createElement('script');
gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js';
document.head.appendChild(gsapScript);

const scrollTriggerScript = document.createElement('script');
scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
document.head.appendChild(scrollTriggerScript);

// Gestionar botones expandibles
document.querySelectorAll('.expand-btn').forEach(button => {
  button.addEventListener('click', function() {
    const sectionId = this.getAttribute('data-section');
    const content = document.getElementById(sectionId);
    
    if (content) {
      content.classList.toggle('active');
      
      // Cerrar otras secciones abiertas
      document.querySelectorAll('.collapsible-content.active').forEach(item => {
        if (item.id !== sectionId) {
          item.classList.remove('active');
        }
      });
    }
  });
});

// Animaciones suaves al cargar
window.addEventListener('load', function() {
  console.log('Página cargada y lista');
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
