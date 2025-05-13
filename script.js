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

// Carrossel de Acomodações com auto-play e pausa em interação

let acomIndex = 0;
const slides = document.querySelectorAll('.acomodacoes-slide');
let acomTimer = null;
let acomUserPaused = false;
let acomPauseTimeout = null;

// Função para mostrar o slide atual
function showAcomSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
}

// Próximo slide
function acomodacoesNext() {
  acomIndex = (acomIndex + 1) % slides.length;
  showAcomSlide(acomIndex);
}

// Slide anterior
function acomodacoesPrev() {
  acomIndex = (acomIndex - 1 + slides.length) % slides.length;
  showAcomSlide(acomIndex);
}

// Inicia o autoplay
function startAcomTimer() {
  if (acomTimer) clearInterval(acomTimer);
  acomTimer = setInterval(() => {
    if (!acomUserPaused) {
      acomodacoesNext();
    }
  }, 6000); // 6 segundos
}

// Para o autoplay temporariamente após interação do usuário
function pauseAcomAutoplayOnUserAction() {
  acomUserPaused = true;
  if (acomPauseTimeout) clearTimeout(acomPauseTimeout);
  acomPauseTimeout = setTimeout(() => {
    acomUserPaused = false;
  }, 12000); // 12 segundos de pausa após interação
}

// Eventos das setas
document.querySelector('.acomodacoes-carousel-btn.next').addEventListener('click', () => {
  acomodacoesNext();
  pauseAcomAutoplayOnUserAction();
});
document.querySelector('.acomodacoes-carousel-btn.prev').addEventListener('click', () => {
  acomodacoesPrev();
  pauseAcomAutoplayOnUserAction();
});

// Inicialização
showAcomSlide(acomIndex);
startAcomTimer();

  // Frequência padrão alterada para 'semestral'
  let frequencia = 'semestral';
  const quartos = [
    { cod: "q3", label: "Quarto Triplo", img: "quarto3.jpg" },
    { cod: "q2", label: "Quarto Duplo", img: "quarto2.jpg" },
    { cod: "q1", label: "Quarto Individual", img: "quarto1.jpg" }
  ];
  // Textos de perfil
  const niveisResumo = [
    {
      titulo: "Paciente com baixa complexidade",
      descricao: "Seu familiar é independente para a maioria das tarefas e precisa apenas de supervisão leve e companhia."
    },
    {
      titulo: "Paciente com média complexidade",
      descricao: "Seu familiar necessita de auxílio parcial e acompanhamento em algumas atividades do dia a dia, como higiene, locomoção ou alimentação."
    },
    {
      titulo: "Paciente com alta complexidade",
      descricao: "Seu familiar precisa de suporte próximo e contínuo, com atenção total em todas as suas necessidades e bem-estar."
    }
  ];

  // New pricing multipliers and base prices:
  const roomBase = {
    q3: 3000,  // Triplo
    q2: 3500,  // Duplo
    q1: 4000   // Individual
  };
  const complexityMultipliers = [1.00, 1.15, 1.30]; // low, medium, high
  const frequencyMultipliers = {
    semestral: 1.00,
    trimestral: 1.15,
    mensal: 1.30
  };
  const mesesPorPlano = {
    semestral: 6,
    trimestral: 3,
    mensal: 1
  };

  function atualizarDescricaoNivel() {
    const nivel = parseInt(document.getElementById("nivelCuidados").value);
    const info = niveisResumo[nivel - 1];
    document.getElementById("descricaoNivel").innerHTML = `
      <div style="margin-top:10px;">
        <strong style="color:#2e7d32;">${info.titulo}</strong>
        <div style="font-size:0.98rem; color:#444; margin-top:4px;">${info.descricao}</div>
      </div>
    `;
  }

  function atualizarSliderPreenchimento() {
    const slider = document.getElementById("nivelCuidados");
    const fill = document.getElementById("nivelSliderFill");
    const min = parseInt(slider.min, 10);
    const max = parseInt(slider.max, 10);
    const val = parseInt(slider.value, 10);
    const percent = ((val - min) / (max - min));
    fill.style.width = `calc(${percent * 100}% - ${percent * 28}px + 14px)`;
    fill.style.background = "linear-gradient(90deg, #48BB78 0%, #FFD600 50%, #E53935 100%)";
    let thumbBorder;
    if (val === 1) thumbBorder = "#48BB78";
    else if (val === 2) thumbBorder = "#FFD600";
    else thumbBorder = "#E53935";
    slider.style.setProperty('--thumb-border', thumbBorder);
  }

  let currentIndex = 0;

  function setFrequencia(tipo) {
    frequencia = tipo;
    document.querySelectorAll('.plano-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.textContent.toLowerCase().includes(tipo)) {
        btn.classList.add('active');
      }
    });
    atualizarCarousel();
  }

  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function atualizarCarousel() {
    const nivel = parseInt(document.getElementById("nivelCuidados").value);
    const carouselTrack = document.getElementById('carouselTrack');
    carouselTrack.innerHTML = '';
    quartos.forEach((quarto, i) => {
      // Calculate monthly price using the room base price, complexity, and frequency multipliers
      let precoMensal = roomBase[quarto.cod] *
                        complexityMultipliers[nivel - 1] *
                        frequencyMultipliers[frequencia];
      const mesesPlano = mesesPorPlano[frequencia];
      const precoTotal = Math.round(precoMensal * mesesPlano);

      const perfil = niveisResumo[nivel - 1];
      const mensagem = 
`Olá! Gostaria de avançar na contratação para meu familiar.

Quarto: ${quarto.label}
Perfil: ${perfil.titulo}
${perfil.descricao}
Período: ${frequencia.charAt(0).toUpperCase() + frequencia.slice(1)}

Por favor, envie orientações sobre os próximos passos.`;

      const linkWhats = `https://wa.me/555197879151?text=${encodeURIComponent(mensagem)}`;

      const card = document.createElement('div');
      card.className = 'plano-card';
      card.innerHTML = `
        <img src="${quarto.img}" alt="${quarto.label}">
        <h3>${quarto.label}</h3>
        <div class="preco-profissional">
          <span class="preco-mensal">
            ${mesesPlano > 1 ? `<strong>${mesesPlano}x</strong> de ` : ''}${formatarPreco(Math.round(precoMensal))}
          </span>
          <span class="preco-total">
            Valor total do contrato: <strong>${formatarPreco(precoTotal)}</strong>
          </span>
          <span class="preco-obs">
            * sujeito a alterações
          </span>
        </div>
        <a href="${linkWhats}" class="btn-primary" target="_blank">Conversar no WhatsApp</a>
      `;
      carouselTrack.appendChild(card);
    });
    moveCarousel(currentIndex);
  }

  function moveCarousel(index) {
    const carouselTrack = document.getElementById('carouselTrack');
    const total = quartos.length;
    let visible = 3;
    if(window.innerWidth < 1000 && window.innerWidth >= 768) visible = 2;
    if(window.innerWidth < 768) visible = 1;
    if(index < 0) index = 0;
    if(index > total - visible) index = total - visible;
    currentIndex = index;
    const card = carouselTrack.querySelector('.plano-card');
    if(card) {
      const cardWidth = card.offsetWidth + 32;
      carouselTrack.style.transform = `translateX(-${index * cardWidth}px)`;
    }
    document.getElementById('carouselPrevBtn').style.visibility = (currentIndex === 0) ? "hidden" : "visible";
    document.getElementById('carouselNextBtn').style.visibility = (currentIndex >= (total - visible)) ? "hidden" : "visible";
  }

  document.addEventListener('DOMContentLoaded', () => {
    atualizarDescricaoNivel();
    atualizarSliderPreenchimento();
    atualizarCarousel();
    document.getElementById("nivelCuidados").addEventListener('input', function() {
      atualizarDescricaoNivel();
      atualizarSliderPreenchimento();
      atualizarCarousel();
    });
    document.getElementById('carouselPrevBtn').onclick = () => moveCarousel(currentIndex - 1);
    document.getElementById('carouselNextBtn').onclick = () => moveCarousel(currentIndex + 1);
    window.addEventListener('resize', () => moveCarousel(currentIndex));
  });

// desktop.js
if (window.innerWidth > 1023) {
  // Corrige header fixo cobrindo a hero
  document.querySelector('.hero').style.paddingTop = '120px';

  // Garante que setas do carrossel aparecem no PC
  document.querySelectorAll('.carousel-arrow').forEach(btn => {
    btn.style.display = "flex";
  });
  }
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

(function(a,b,c,d){try{var e=b.head||b.getElementsByTagName("head")[0];var f=b.createElement("script");f.setAttribute("src",c);f.setAttribute("charset","UTF-8");f.defer=true;a.neuroleadId=d;e.appendChild(f)}catch(g){}})(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","n1KtVCoHGEyvTCCNhhJf9P6p3")