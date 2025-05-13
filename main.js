// main.js

// Facebook Pixel (Meta Pixel)
!function(f, b, e, v, n, t, s) {
  if (f.fbq) return;
  n = f.fbq = function() {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
  };
  if (!f._fbq) f._fbq = n;
  n.push = n;
  n.loaded = !0;
  n.version = '2.0';
  n.queue = [];
  t = b.createElement(e);
  t.async = !0;
  t.src = v;
  s = b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t, s)
}(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1729771167889310');
fbq('track', 'PageView');

document.addEventListener('DOMContentLoaded', function () {
  // ------------ Carrossel de Acomodações ------------
  const acomSlides = Array.from(document.querySelectorAll('.acomodacoes-slide'));
  let acomIndex = acomSlides.findIndex(slide => slide.classList.contains('active'));
  if (acomIndex === -1) acomIndex = 0;
  
  let acomAutoPlayTimer = null;
  
  const showAcomSlide = (index) => {
    acomSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  };
  
  const acomNext = () => {
    acomIndex = (acomIndex + 1) % acomSlides.length;
    showAcomSlide(acomIndex);
    restartAcomAutoPlay();
  };
  
  const acomPrev = () => {
    acomIndex = (acomIndex - 1 + acomSlides.length) % acomSlides.length;
    showAcomSlide(acomIndex);
    restartAcomAutoPlay();
  };
  
  const acomAutoPlay = () => {
    acomIndex = (acomIndex + 1) % acomSlides.length;
    showAcomSlide(acomIndex);
    acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  };
  
  const restartAcomAutoPlay = () => {
    clearTimeout(acomAutoPlayTimer);
    acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  };
  
  const acomBtnNext = document.querySelector('.acomodacoes-carousel-btn.next');
  const acomBtnPrev = document.querySelector('.acomodacoes-carousel-btn.prev');
  
  if (acomBtnNext) {
    acomBtnNext.addEventListener('click', acomNext);
  }
  if (acomBtnPrev) {
    acomBtnPrev.addEventListener('click', acomPrev);
  }
  
  showAcomSlide(acomIndex);
  acomAutoPlayTimer = setTimeout(acomAutoPlay, 6000);
  
  // ------------ Carrossel de Serviços ------------
  const servicesCarousel = document.querySelector(".services-carousel");
  const serviceCards = document.querySelectorAll(".service-card");
  const servicesPrevBtn = document.querySelector(".services-carousel-btn.prev");
  const servicesNextBtn = document.querySelector(".services-carousel-btn.next");
  
  let serviceIndex = 0;
  // Ajuste o valor de cardWidth conforme o seu CSS (aqui soma 20px para espaçamento)
  const cardWidth = serviceCards.length ? serviceCards[0].offsetWidth + 20 : 300;
  
  const scrollToService = (index) => {
    if (servicesCarousel) {
      servicesCarousel.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };
  
  if (servicesPrevBtn) {
    servicesPrevBtn.addEventListener("click", () => {
      serviceIndex = Math.max(serviceIndex - 1, 0);
      scrollToService(serviceIndex);
    });
  }
  
  if (servicesNextBtn) {
    servicesNextBtn.addEventListener("click", () => {
      const maxIndex = serviceCards.length - 1;
      serviceIndex = Math.min(serviceIndex + 1, maxIndex);
      scrollToService(serviceIndex);
    });
  }
});

// (Opcional) Leadster Neurolead Integration:
(function(a, b, c, d) {
  try {
    var e = b.head || b.getElementsByTagName("head")[0];
    var f = b.createElement("script");
    f.setAttribute("src", c);
    f.setAttribute("charset", "UTF-8");
    f.defer = true;
    a.neuroleadId = d;
    e.appendChild(f);
  } catch (g) {}
})(window, document, "https://cdn.leadster.com.br/neurolead/neurolead.min.js", "n1KtVCoHGEyvTCCNhhJf9P6p3");