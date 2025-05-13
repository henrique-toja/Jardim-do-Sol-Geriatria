// Carrossel de Acomodações
const acomodacoesSlides = document.querySelectorAll('.acomodacoes-slide');
const acomodacoesPrev = document.querySelector('.acomodacoes-carousel-btn.prev');
const acomodacoesNext = document.querySelector('.acomodacoes-carousel-btn.next');
let acomodacoesCurrent = 0;
let acomodacoesAuto = true;
let acomodacoesTimer = null;

function showAcomodacoesSlide(idx) {
  acomodacoesSlides.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
  acomodacoesCurrent = idx;
}

function nextAcomodacoesSlide() {
  let idx = (acomodacoesCurrent + 1) % acomodacoesSlides.length;
  showAcomodacoesSlide(idx);
}

function prevAcomodacoesSlide() {
  let idx = (acomodacoesCurrent - 1 + acomodacoesSlides.length) % acomodacoesSlides.length;
  showAcomodacoesSlide(idx);
}

// Troca automática
function startAcomodacoesAuto() {
  acomodacoesAuto = true;
  acomodacoesTimer = setInterval(() => {
    if (acomodacoesAuto) nextAcomodacoesSlide();
  }, 4000);
}
function stopAcomodacoesAuto() {
  acomodacoesAuto = false;
  clearInterval(acomodacoesTimer);
}

// Eventos
acomodacoesNext.addEventListener('click', () => {
  nextAcomodacoesSlide();
  stopAcomodacoesAuto();
});
acomodacoesPrev.addEventListener('click', () => {
  prevAcomodacoesSlide();
  stopAcomodacoesAuto();
});
acomodacoesSlides.forEach(slide => {
  slide.addEventListener('click', stopAcomodacoesAuto);
});
startAcomodacoesAuto();


// Carrossel de Serviços
const serviceCards = document.querySelectorAll('.service-card');
const servicesPrev = document.querySelector('.services-carousel-btn.prev');
const servicesNext = document.querySelector('.services-carousel-btn.next');
const servicesCarousel = document.querySelector('.services-carousel');
let serviceCurrent = 0;

function showServiceCard(idx) {
  // Mostra só 1 card por vez, mas pode ser adaptado para mostrar mais
  serviceCards.forEach((card, i) => {
    card.style.display = (i === idx) ? 'block' : 'none';
  });
  serviceCurrent = idx;
}

function nextServiceCard() {
  let idx = (serviceCurrent + 1) % serviceCards.length;
  showServiceCard(idx);
}

function prevServiceCard() {
  let idx = (serviceCurrent - 1 + serviceCards.length) % serviceCards.length;
  showServiceCard(idx);
}

servicesNext.addEventListener('click', nextServiceCard);
servicesPrev.addEventListener('click', prevServiceCard);

// Inicialização
showAcomodacoesSlide(0);
showServiceCard(0);