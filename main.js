// Carrossel de Acomodações
const acomodacoesCarousel = document.querySelector(".acomodacoes-carousel");
const acomodacoesSlides = document.querySelectorAll(".acomodacoes-slide");
const acomodacoesPrev = document.querySelector(".acomodacoes-carousel-btn.prev");
const acomodacoesNext = document.querySelector(".acomodacoes-carousel-btn.next");

let acomodacaoIndex = 0;

function updateAcomodacoesCarousel(index) {
  acomodacoesSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });
}

acomodacoesPrev.addEventListener("click", () => {
  acomodacaoIndex = (acomodacaoIndex - 1 + acomodacoesSlides.length) % acomodacoesSlides.length;
  updateAcomodacoesCarousel(acomodacaoIndex);
});

acomodacoesNext.addEventListener("click", () => {
  acomodacaoIndex = (acomodacaoIndex + 1) % acomodacoesSlides.length;
  updateAcomodacoesCarousel(acomodacaoIndex);
});

// Carrossel de Serviços
const servicesCarousel = document.querySelector(".services-carousel");
const serviceCards = document.querySelectorAll(".service-card");
const servicesPrev = document.querySelector(".services-carousel-btn.prev");
const servicesNext = document.querySelector(".services-carousel-btn.next");

let serviceIndex = 0;
const cardWidth = serviceCards[0].offsetWidth + 20; // Inclui espaçamento

function scrollToService(index) {
  servicesCarousel.scrollTo({
    left: index * cardWidth,
    behavior: "smooth"
  });
}

servicesPrev.addEventListener("click", () => {
  serviceIndex = Math.max(serviceIndex - 1, 0);
  scrollToService(serviceIndex);
});

servicesNext.addEventListener("click", () => {
  const maxIndex = serviceCards.length - 1;
  serviceIndex = Math.min(serviceIndex + 1, maxIndex);
  scrollToService(serviceIndex);
});