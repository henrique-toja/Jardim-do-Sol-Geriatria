// Carrossel Acomodações com rotação automática
let acomIndex = 0;
const slides = document.querySelectorAll('.acomodacoes-slide');
let acomTimer = null;
function showAcomSlide(n) {
  slides.forEach((el, i) => {
    el.classList.remove('active');
    if (i === n) el.classList.add('active');
  });
  resetAcomTimer();
}
function acomodacoesNext() {
  acomIndex = (acomIndex + 1) % slides.length;
  showAcomSlide(acomIndex);
}
function acomodacoesPrev() {
  acomIndex = (acomIndex - 1 + slides.length) % slides.length;
  showAcomSlide(acomIndex);
}
function resetAcomTimer() {
  if (acomTimer) clearInterval(acomTimer);
  acomTimer = setInterval(acomodacoesNext, 3000);
}
showAcomSlide(acomIndex);

// Carrossel dos Serviços
let servIndex = 0;
const servCards = document.querySelectorAll('.services-carousel .service-card');
function showServCard(n) {
  servCards.forEach((card, index) => {
    card.classList.toggle('active', index === n);
  });
}
function serviceNext() {
  servIndex = (servIndex + 1) % servCards.length;
  showServCard(servIndex);
}
function servicePrev() {
  servIndex = (servIndex - 1 + servCards.length) % servCards.length;
  showServCard(servIndex);
}
function handleResizeServices() {
  if (window.innerWidth < 1024) {
    showServCard(servIndex);
  } else {
    servCards.forEach(card => card.classList.add('active'));
  }
}
handleResizeServices();
window.addEventListener('resize', handleResizeServices);