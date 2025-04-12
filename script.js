<!-- Script para Carrossel Seção Serviços-->
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.services-container');
  const cards = document.querySelectorAll('.service-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  
  let currentIndex = 0;
  const totalCards = cards.length;
  
  // Function to update carousel position
  function updateCarousel() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }
  
  // Auto slide function
  function autoSlide() {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
  }
  
  // Set auto slide interval
  let slideInterval = setInterval(autoSlide, 5000); // Change slide every 5 seconds
  
  // Reset interval when manually changing slides
  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
  }
  
  // Previous button click
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel();
    resetInterval();
  });
  
  // Next button click
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalCards;
    updateCarousel();
    resetInterval();
  });
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
      resetInterval();
    });
  });
  
  // Pause auto-slide when hovering over carousel
  container.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  // Resume auto-slide when mouse leaves carousel
  container.addEventListener('mouseleave', () => {
    slideInterval = setInterval(autoSlide, 5000);
  });
});


<!-- Script para Carrossel Seção Acomodações-->
  document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.service-carousel');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const nextBtn = carousel.querySelector('.carousel-next');
    const prevBtn = carousel.querySelector('.carousel-prev');
    let currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    setInterval(nextSlide, 6000);
  });