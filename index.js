// --------- Carrossel de Acomodações ---------
document.addEventListener('DOMContentLoaded', function () {
  // Acomodações
  const slides = Array.from(document.querySelectorAll('.acomodacoes-slide'));
  let acomIndex = slides.findIndex(slide => slide.classList.contains('active'));
  if (acomIndex === -1) acomIndex = 0;

  function showAcomSlide(n) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === n);
    });
  }

  function acomodacoesNext() {
    acomIndex = (acomIndex + 1) % slides.length;
    showAcomSlide(acomIndex);
  }

  function acomodacoesPrev() {
    acomIndex = (acomIndex - 1 + slides.length) % slides.length;
    showAcomSlide(acomIndex);
  }

  document.querySelector('.acomodacoes-carousel-btn.next').addEventListener('click', acomodacoesNext);
  document.querySelector('.acomodacoes-carousel-btn.prev').addEventListener('click', acomodacoesPrev);

  showAcomSlide(acomIndex);

  // --------- Carrossel dos Serviços ---------
  const serviceCards = Array.from(document.querySelectorAll('.services-carousel .service-card'));
  let serviceIndex = 0;

  function showServiceCard(n) {
    serviceCards.forEach((card, i) => {
      card.classList.toggle('active', i === n);
    });
  }

  function serviceNext() {
    serviceIndex = (serviceIndex + 1) % serviceCards.length;
    showServiceCard(serviceIndex);
  }

  function servicePrev() {
    serviceIndex = (serviceIndex - 1 + serviceCards.length) % serviceCards.length;
    showServiceCard(serviceIndex);
  }

  function handleResizeServices() {
    if (window.innerWidth < 1024) {
      showServiceCard(serviceIndex);
    } else {
      serviceCards.forEach(card => card.classList.add('active'));
    }
  }

  document.querySelector('.services-carousel-btn.next').addEventListener('click', serviceNext);
  document.querySelector('.services-carousel-btn.prev').addEventListener('click', servicePrev);

  handleResizeServices();
  window.addEventListener('resize', handleResizeServices);
});