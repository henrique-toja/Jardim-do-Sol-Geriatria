// Carrossel lateral de serviços (horizontal scroll)
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.services-carousel');
  if (!carousel) return;

  // Adiciona botões de navegação se não existirem
  if (!document.querySelector('.carousel-left') && !document.querySelector('.carousel-right')) {
    const leftBtn = document.createElement('button');
    leftBtn.className = 'carousel-left';
    leftBtn.setAttribute('aria-label', 'Rolar serviços para a esquerda');
    leftBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    carousel.parentElement.appendChild(leftBtn);

    const rightBtn = document.createElement('button');
    rightBtn.className = 'carousel-right';
    rightBtn.setAttribute('aria-label', 'Rolar serviços para a direita');
    rightBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    carousel.parentElement.appendChild(rightBtn);

    leftBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -carousel.offsetWidth * 0.8, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: carousel.offsetWidth * 0.8, behavior: 'smooth' });
    });
  }

  // Drag para mouse e touch
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // Mouse events
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('dragging');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('dragging');
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = x - startX;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Touch events
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = x - startX;
    carousel.scrollLeft = scrollLeft - walk;
  });
});