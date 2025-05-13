// Facebook Pixel (Meta Pixel)
!function(f,b,e,v,n,t,s){
  if(f.fbq)return;
  n=f.fbq=function(){
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  };
  if(!f._fbq) f._fbq=n;
  n.push=n; n.loaded=!0; n.version='2.0';
  n.queue=[];
  t=b.createElement(e);
  t.async=!0;
  t.src=v;
  s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)
}(window, document, 'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1729771167889310');
fbq('track', 'PageView');

document.addEventListener('DOMContentLoaded', function () {
  // --------- Carrossel de Acomodações com autoplay ---------
  const slides = Array.from(document.querySelectorAll('.acomodacoes-slide'));
  let acomIndex = slides.findIndex(slide => slide.classList.contains('active'));
  if (acomIndex === -1) acomIndex = 0;
  let acomAutoPlayTimer = null;
  
  function showAcomSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function acomodacoesNext() {
    acomIndex = (acomIndex + 1) % slides.length;
    showAcomSlide(acomIndex);
    restartAcomAutoPlay();
  }
  
  function acomodacoesPrev() {
    acomIndex = (acomIndex - 1 + slides.length) % slides.length;
    showAcomSlide(acomIndex);
    restartAcomAutoPlay();
  }
  
  function acomAutoPlay() {
    acomIndex = (acomIndex + 1) % slides.length;
    showAcomSlide(acomIndex);
    acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  }
  
  function restartAcomAutoPlay() {
    clearTimeout(acomAutoPlayTimer);
    acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  }
  
  document.querySelector('.acomodacoes-carousel-btn.next').addEventListener('click', acomodacoesNext);
  document.querySelector('.acomodacoes-carousel-btn.prev').addEventListener('click', acomodacoesPrev);
  
  showAcomSlide(acomIndex);
  acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  
  // --------- Carrossel de Serviços (implementação baseada em scroll) ---------
  const servicesCarousel = document.querySelector(".services-carousel");
  const serviceCards = document.querySelectorAll(".service-card");
  const servicesPrev   = document.querySelector(".services-carousel-btn.prev");
  const servicesNext   = document.querySelector(".services-carousel-btn.next");
  
  let serviceIndex = 0;
  // Calcula a largura do cartão, ajuste conforme seu espaçamento e CSS
  const cardWidth = serviceCards[0].offsetWidth + 20; 
  
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
});

// (Opcional) Adicione outros scripts ou integrações, como o Neurolead, abaixo:
(function(a,b,c,d){
  try{
    var e=b.head||b.getElementsByTagName("head")[0];
    var f=b.createElement("script");
    f.setAttribute("src", c);
    f.setAttribute("charset", "UTF-8");
    f.defer = true;
    a.neuroleadId = d;
    e.appendChild(f);
  } catch(g){}
})(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","n1KtVCoHGEyvTCCNhhJf9P6p3");