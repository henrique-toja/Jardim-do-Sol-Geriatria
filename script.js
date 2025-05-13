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

// ========================================================
// CARROSSEL DE ACOMODAÇÕES - AUTO-PLAY + PAUSA EM CLIQUE
// ========================================================

// Variáveis do carrossel de acomodações
let acomIndex = 0;
const slides = document.querySelectorAll('.acomodacoes-slide');
let acomTimer = null;
let acomUserPaused = false;
let acomPauseTimeout = null;

// Mostra o slide atual no carrossel de acomodações
function showAcomSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === n);
  });
}

// Avança para o próximo slide
function acomodacoesNext() {
  acomIndex = (acomIndex + 1) % slides.length;
  showAcomSlide(acomIndex);
}

// Volta ao slide anterior
function acomodacoesPrev() {
  acomIndex = (acomIndex - 1 + slides.length) % slides.length;
  showAcomSlide(acomIndex);
}

// Inicia o autoplay do carrossel (6 segundos por slide)
function startAcomTimer() {
  if (acomTimer) clearInterval(acomTimer);
  acomTimer = setInterval(() => {
    if (!acomUserPaused) {
      acomodacoesNext();
    }
  }, 6000);
}

// Pausa o autoplay por 12 segundos após interação do usuário
function pauseAcomAutoplayOnUserAction() {
  acomUserPaused = true;
  if (acomPauseTimeout) clearTimeout(acomPauseTimeout);
  acomPauseTimeout = setTimeout(() => {
    acomUserPaused = false;
  }, 12000);
}

// Adiciona eventos aos botões de navegação do carrossel de acomodações
document.querySelector('.acomodacoes-carousel-btn.next').addEventListener('click', () => {
  acomodacoesNext();
  pauseAcomAutoplayOnUserAction();
});
document.querySelector('.acomodacoes-carousel-btn.prev').addEventListener('click', () => {
  acomodacoesPrev();
  pauseAcomAutoplayOnUserAction();
});

// Inicializa o carrossel de acomodações
showAcomSlide(acomIndex);
startAcomTimer();

// ========================================================
// CARROSSEL DE PLANOS/QUARTOS (com cálculo de preços)
// ========================================================

// Variáveis de quartos e perfis
let frequencia = 'semestral';
const quartos = [
  { cod: "q3", label: "Quarto Triplo", img: "quarto3.jpg" },
  { cod: "q2", label: "Quarto Duplo", img: "quarto2.jpg" },
  { cod: "q1", label: "Quarto Individual", img: "quarto1.jpg" }
];
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

// Preços e multiplicadores
const roomBase = {
  q3: 3000,  // Triplo
  q2: 3500,  // Duplo
  q1: 4000   // Individual
};
const complexityMultipliers = [1.00, 1.15, 1.30]; // baixa, média, alta
const frequencyMultipliers = {
  semestral: 1.00,
  trimestral: 1.15,
  mensal: 1.30
};
const mesesPorPlano = {
 ("nivelCuidados").value);
  const info = niveisResumo[nivel - 1];
  document.getElementById("descricaoNivel").innerHTML = `
    <div style="margin-top:10px;">
      <strong style="color:#2e7d32;">${info.titulo}</strong>
      <div style="font-size:0.98rem; color:#444; margin-top:4px;">${info.descricao}</div>
    </div>
  `;
}

// Atualiza o preenchimento visual do slider de nível
function atualizarSliderPreenchimento() {
  const slider = document.getElementById.min, 10);
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

// Index do carrossel de planos/quartos
let currentIndex = 0;

// Troca frequência do plano (mensal, trimestral, semestral)
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

// Formata preço para BRL
function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

// Atualiza o carrossel de planos/quartos com os preços corretos
function atualizarCarousel() {
  const nivel = parseInt(document.getElementById("nivelCuidados").value);
  const carouselTrack = document.getElementById('carouselTrack');
  carouselTrack.innerHTML = '';
  quartos.forEach((quarto, i) => {
    // Calcula o preço mensal baseado nos multiplicadores
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

// Move o carrossel de planos/quartos para o índice correto
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

// Inicialização dos eventos do carrossel de planos/quartos
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

// ========================================================
// AJUSTES DE HEADER E CARROSSEL PARA DESKTOP
// ========================================================

// Corrige padding da hero se header for fixo (desktop)
if (window.innerWidth > 1023) {
  document.querySelector('.hero').style.paddingTop = '120px';
  document.querySelectorAll('.carousel-arrow').forEach(btn => {
    btn.style.display = "flex";
  });
}

// ========================================================
// CARROSSEL DOS SERVIÇOS
// ========================================================

// Index e cards do carrossel de serviços
let servIndex = 0;
const servCards = document.querySelectorAll('.services-carousel .service-card');

// Mostra o card ativo no carrossel de serviços
function showServCard(n) {
  servCards.forEach((card, index) => {
    card.classList.toggle('active', index === n);
  });
}

// Próximo card no carrossel de serviços
function serviceNext() {
  servIndex = (servIndex + 1) % servCards.length;
  showServCard(servIndex);
}

// Card anterior no carrossel de serviços
function servicePrev() {
  servIndex = (servIndex - 1 + servCards.length) % servCards.length;
  showServCard(servIndex);
}

// Ajusta exibição dos cards de acordo com o tamanho da tela
function handleResizeServices() {
  if (window.innerWidth < 1024) {
    showServCard(servIndex);
  } else {
    servCards.forEach(card => card.classList.add('active'));
  }
}
handleResizeServices();
window.addEventListener('resize', handleResizeServices);

// ========================================================
// SCRIPT DE INTEGRAÇÃO LEADSTER (WHATSAPP POPUP)
// ========================================================
(function(a,b,c,d){
  try{
    var e=b.head||b.getElementsByTagName("head")[0];
    var f=b.createElement("script");
    f.setAttribute("src",c);
    f.setAttribute("charset","UTF-8");
    f.defer=true;
    a.neuroleadId=d;
    e.appendChild(f)
  }catch(g){}
})(window,document,"https://cdn.leadster.com.br/neurolead/neurolead.min.js","n1KtVCoHGEyvTCCNhhJf9P6p3")
