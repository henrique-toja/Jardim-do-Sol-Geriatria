// Facebook Pixel (Meta Pixel) -----------------------------
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1729771167889310');
fbq('track', 'PageView');

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


