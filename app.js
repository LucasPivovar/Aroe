/**
 * Aroe — Inteligência Artificial que Cria Raiz no Seu Negócio
 * JavaScript Interactivity & Dynamic Calculation
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initCalculator();
  initModals();
  initCtaForm();
  init2StepForm();
  initInfinitePortfolio();
  initQuoteRotator();
  initFaqAccordion();
  initGsapAnimations();
});

/* --------------------------------------------------------------------------
   1. Header & Navigation Logic
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  // Sticky header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateScrollSpy();
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('open');
    });
  }

  // Smooth Scroll on Header Nav Links Click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.startsWith('#') && targetId.length > 1) {
        e.preventDefault();
        const targetSec = document.querySelector(targetId);
        if (targetSec) {
          const offsetTop = targetSec.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        if (navMenu && navMenu.classList.contains('mobile-open')) {
          navMenu.classList.remove('mobile-open');
          if (mobileToggle) mobileToggle.classList.remove('open');
        }
      }
    });
  });

  // ScrollSpy Active Section Indicator (Underline on active section link)
  function updateScrollSpy() {
    const scrollY = window.scrollY;
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      const secId = sec.getAttribute('id');
      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === '#' + secId) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  // Initial check
  updateScrollSpy();
}

/* --------------------------------------------------------------------------
   2. ROI Savings Calculator
   -------------------------------------------------------------------------- */
function initCalculator() {
  const hoursSlider = document.getElementById('calc-amount');
  const costSlider = document.getElementById('calc-years');
  const hoursDisplay = document.getElementById('calc-amount-display');
  const costDisplay = document.getElementById('calc-years-display');
  const resultsDisplay = document.getElementById('calc-results');
  const profitBadge = document.getElementById('calc-profit-badge');

  if (!hoursSlider || !costSlider) return;

  function updateCalculator() {
    const hoursWeek = parseFloat(hoursSlider.value);
    const costHour = parseFloat(costSlider.value);

    // Economia anual = (horas por semana * 52 semanas) * custo por hora * 80% taxa de automação
    const annualSavings = (hoursWeek * 52) * costHour * 0.8;

    // Formatter BRL
    const formattedSavings = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(Math.round(annualSavings));

    hoursDisplay.textContent = `${hoursWeek} Horas`;
    costDisplay.textContent = `R$ ${costHour} / hora`;
    resultsDisplay.textContent = formattedSavings;
    profitBadge.textContent = `+80% Tempo Livre para o Time`;
  }

  hoursSlider.addEventListener('input', updateCalculator);
  costSlider.addEventListener('input', updateCalculator);

  // Run initial calculation
  updateCalculator();
}

/* --------------------------------------------------------------------------
   3. Inline CTA Form Handler
   -------------------------------------------------------------------------- */
function initCtaForm() {
  const ctaForm = document.getElementById('form-cta-inline');
  if (!ctaForm) return;

  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Obrigado! Solicitação enviada com sucesso. Nossos engenheiros entrarão em contato em breve.');
    ctaForm.reset();
  });
}

/* --------------------------------------------------------------------------
   5. Modal Manager System
   -------------------------------------------------------------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const closeBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modalId) {
    const targetModal = document.getElementById(modalId);
    if (targetModal) {
      targetModal.classList.add('active');
      targetModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach(modal => closeModal(modal));
    }
  });

  // Handle Form Submissions inside Modals
  const forms = document.querySelectorAll('.modal-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = form.closest('.modal-overlay');
      closeModal(modal);
      showToast('Obrigado! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.');
      form.reset();
    });
  });
}


/* --------------------------------------------------------------------------
   7. Toast Notification Helper
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--semente)" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* --------------------------------------------------------------------------
   8. 3D Arc Deck & Lorolabs-style 2D Infinite Drag Canvas Portfolio Engine
   -------------------------------------------------------------------------- */
function initInfinitePortfolio() {
  const openBtn = document.getElementById('open-infinite-portfolio');
  const closeBtn = document.getElementById('close-infinite-portfolio');
  const modalOverlay = document.getElementById('infinite-portfolio-modal');
  const ctaCanvasBtn = document.getElementById('cta-canvas-btn');
  const viewport = document.getElementById('canvas-viewport');
  const grid = document.getElementById('canvas-grid');

  if (!openBtn || !closeBtn || !modalOverlay || !viewport || !grid) return;

  const cardEls = Array.from(grid.querySelectorAll('.canvas-item'));
  const cols = 6;
  const cardW = 520;
  const cardH = 350;
  const gapX = 32;
  const gapY = 32;
  const stepX = cardW + gapX; // 552px
  const stepY = cardH + gapY; // 382px

  const totalCols = cols;
  const totalRows = Math.ceil(cardEls.length / cols);
  const totalW = totalCols * stepX; // 6 * 552 = 3312px
  const totalH = totalRows * stepY; // 6 * 382 = 2292px

  // Map each card element to its base grid coordinates
  const cards = cardEls.map((el, index) => {
    const col = index % totalCols;
    const row = Math.floor(index / totalCols);
    return {
      el,
      baseX: col * stepX,
      baseY: row * stepY
    };
  });

  // Position & Inertia Momentum Variables
  let posX = 0;
  let posY = 0;
  let velX = 0;
  let velY = 0;
  let isMouseDown = false;
  let isDragging = false;
  let lastMouseX = 0;
  let lastMouseY = 0;
  let startX = 0;
  let startY = 0;
  let animId = null;

  function wrapPos(pos, step) {
    let mod = pos % step;
    return mod < 0 ? mod + step : mod;
  }

  function updatePositions() {
    const marginX = -550; // Screen left margin wrap threshold
    const marginY = -400; // Screen top margin wrap threshold

    cards.forEach(card => {
      let rawX = card.baseX + posX;
      let rawY = card.baseY + posY;

      let x = marginX + wrapPos(rawX - marginX, totalW);
      let y = marginY + wrapPos(rawY - marginY, totalH);

      card.el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
    });
  }

  function loop() {
    if (!isMouseDown) {
      posX += velX;
      posY += velY;
      velX *= 0.92; // Momentum friction decay
      velY *= 0.92;
    }
    updatePositions();
    animId = requestAnimationFrame(loop);
  }

  const footerOpenBtn = document.getElementById('footer-open-canvas');

  function openCanvasModal() {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    posX = 0;
    posY = 0;
    velX = 0;
    velY = 0;
    if (!animId) loop();
  }

  // Open Fullscreen Canvas Gallery
  openBtn.addEventListener('click', openCanvasModal);
  if (footerOpenBtn) {
    footerOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCanvasModal();
    });
  }

  // Close Fullscreen Canvas Gallery
  closeBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  });

  if (ctaCanvasBtn) {
    ctaCanvasBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (animId) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    });
  }

  // Arc & Canvas Cards Click -> Open Modal Falar Conosco
  document.querySelectorAll('.arc-card, .canvas-item').forEach(card => {
    card.addEventListener('click', (e) => {
      if (isDragging) return;
      const modalInvest = document.getElementById('modal-invest');
      if (modalInvest) {
        modalInvest.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Mouse & Touch Drag Handlers
  function handleStart(e) {
    if (e.type === 'touchstart' && e.cancelable) {
      e.preventDefault();
    }
    isMouseDown = true;
    isDragging = false;
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const pageY = e.touches ? e.touches[0].pageY : e.pageY;
    lastMouseX = pageX;
    lastMouseY = pageY;
    startX = pageX;
    startY = pageY;
    velX = 0;
    velY = 0;
  }

  function handleMove(e) {
    if (!isMouseDown) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const pageX = e.touches ? e.touches[0].pageX : e.pageX;
    const pageY = e.touches ? e.touches[0].pageY : e.pageY;
    const dx = pageX - lastMouseX;
    const dy = pageY - lastMouseY;

    if (Math.hypot(pageX - startX, pageY - startY) > 5) {
      isDragging = true;
    }

    posX += dx;
    posY += dy;

    // Momentum velocity
    velX = dx;
    velY = dy;

    lastMouseX = pageX;
    lastMouseY = pageY;
  }

  function handleEnd() {
    isMouseDown = false;
  }

  viewport.addEventListener('mousedown', handleStart);
  window.addEventListener('mousemove', handleMove, { passive: false });
  window.addEventListener('mouseup', handleEnd);

  viewport.addEventListener('touchstart', handleStart, { passive: false });
  window.addEventListener('touchmove', handleMove, { passive: false });
  window.addEventListener('touchend', handleEnd);

  viewport.addEventListener('dragstart', (e) => e.preventDefault());
  viewport.addEventListener('wheel', (e) => {
    e.preventDefault();
    posX -= e.deltaX;
    posY -= e.deltaY;
  }, { passive: false });

  // Initial static position render
  updatePositions();
}

/* --------------------------------------------------------------------------
   9. Rotating Quote Carousel Logic
   -------------------------------------------------------------------------- */
function initQuoteRotator() {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  const dots = document.querySelectorAll('.quote-dot');

  if (!quoteText || !quoteAuthor || !dots.length) return;

  const testimonials = [
    {
      quote: '“Eles não criaram apenas um site. Criaram uma presença online que representa verdadeiramente nossa marca. Cada detalhe superou nossa visão.”',
      author: 'Marcos Silveira — VP de Operações • Logística & Varejo'
    },
    {
      quote: '“A Aroe entendeu nossa dor desde o primeiro dia. A landing page e o sistema sob medida criaram um funil previsível e ágil de vendas.”',
      author: 'Eduardo Lima — Diretor Comercial • Serviços B2B'
    },
    {
      quote: '“Design impecável, velocidade máxima de carregamento no celular e código limpo. Superou todas as expectativas do nosso conselho.”',
      author: 'Juliana Torres — CTO • SaaS & Tecnologia'
    },
    {
      quote: '“Sem enrolação ou templates genéricos. A equipe da Aroe entregou nosso portal corporativo no prazo com uma qualidade impressionante.”',
      author: 'Antonio Nogueira — Head de Produto • Consultoria'
    }
  ];

  let currentIndex = 0;
  let timerId = null;

  function showQuote(index) {
    currentIndex = index;
    quoteText.style.opacity = '0';
    quoteText.style.transform = 'translateY(10px)';
    quoteAuthor.style.opacity = '0';

    setTimeout(() => {
      quoteText.textContent = testimonials[currentIndex].quote;
      quoteAuthor.textContent = testimonials[currentIndex].author;

      quoteText.style.opacity = '1';
      quoteText.style.transform = 'translateY(0)';
      quoteAuthor.style.opacity = '1';

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }, 300);
  }

  function startAutoplay() {
    stopAutoplay();
    timerId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      showQuote(nextIndex);
    }, 4500);
  }

  function stopAutoplay() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showQuote(idx);
      startAutoplay();
    });
  });

  startAutoplay();
}

/* --------------------------------------------------------------------------
   10. FAQ Accordion Interactivity
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. Interactive 2-Step CTA Form Logic
   -------------------------------------------------------------------------- */
function init2StepForm() {
  const form = document.getElementById('form-cta-2step');
  if (!form) return;

  const btnNext = document.getElementById('btn-next-step');
  const btnPrev = document.getElementById('btn-prev-step');
  const panel1 = document.getElementById('step-panel-1');
  const panel2 = document.getElementById('step-panel-2');
  const fill = document.getElementById('step-fill');
  const label = document.getElementById('step-label');

  if (btnNext && panel1 && panel2 && fill && label) {
    btnNext.addEventListener('click', () => {
      const nameInput = document.getElementById('cta-name');
      const emailInput = document.getElementById('cta-email');

      if (!nameInput.checkValidity() || !emailInput.checkValidity()) {
        nameInput.reportValidity();
        emailInput.reportValidity();
        return;
      }

      panel1.classList.remove('active');
      panel2.classList.add('active');
      fill.style.width = '100%';
      label.textContent = 'Passo 2 de 2: Detalhes do Projeto';
    });
  }

  if (btnPrev && panel1 && panel2 && fill && label) {
    btnPrev.addEventListener('click', () => {
      panel2.classList.remove('active');
      panel1.classList.add('active');
      fill.style.width = '50%';
      label.textContent = 'Passo 1 de 2: Dados de Contato';
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Solicitação enviada com sucesso! Nossos engenheiros entrarão em contato em até 24h.');
    form.reset();
    if (panel2 && panel1 && fill && label) {
      panel2.classList.remove('active');
      panel1.classList.add('active');
      fill.style.width = '50%';
      label.textContent = 'Passo 1 de 2: Dados de Contato';
    }
  });
}

/* --------------------------------------------------------------------------
   11. FAQ Accordion Interactivity
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   12. Section-by-Section GSAP + ScrollTrigger Staggered Animations ("Um por um")
   -------------------------------------------------------------------------- */
function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Hero Entrance
  gsap.from('.hero-badge, .gsap-reveal-title, .gsap-reveal-sub, .hero-cta-group, .hero-stat-pill', {
    duration: 1,
    y: 35,
    opacity: 0,
    stagger: 0.15,
    ease: 'power3.out',
    clearProps: 'all'
  });

  if (typeof ScrollTrigger === 'undefined') return;

  // 2. Sobre a Aroe (#about) — Cards staggered 1 by 1
  gsap.from('.about-card', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    clearProps: 'all'
  });

  // 3. Desafios do Mercado (#problems) — Staggered 1 by 1
  gsap.from('.problem-item', {
    scrollTrigger: {
      trigger: '#problems',
      start: 'top 80%'
    },
    x: -30,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    clearProps: 'all'
  });

  // 4. A Solução Aroe (#differentials) — Rows staggered 1 by 1
  gsap.from('.differential-row', {
    scrollTrigger: {
      trigger: '#differentials',
      start: 'top 80%'
    },
    y: 35,
    opacity: 0,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power2.out',
    clearProps: 'all'
  });

  // 5. Nosso Processo (#workflow) — Cards staggered 1 by 1
  gsap.from('.workflow-card', {
    scrollTrigger: {
      trigger: '#workflow',
      start: 'top 80%'
    },
    y: 40,
    scale: 0.95,
    opacity: 0,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power2.out',
    clearProps: 'all'
  });

  // 6. Portfólio (#portfolio) — Stats & Arc Deck cards staggered 1 by 1
  gsap.from('.stat-box-clean', {
    scrollTrigger: {
      trigger: '.portfolio-stats-grid',
      start: 'top 85%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: 'back.out(1.5)',
    clearProps: 'all'
  });

  gsap.from('.portfolio-arc-container', {
    scrollTrigger: {
      trigger: '.portfolio-arc-container',
      start: 'top 85%'
    },
    y: 50,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
    clearProps: 'all'
  });

  // 7. Dúvidas FAQ (#faq) — Accordions staggered 1 by 1
  gsap.from('.faq-item', {
    scrollTrigger: {
      trigger: '#faq',
      start: 'top 80%'
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    clearProps: 'all'
  });

  // 8. CTA Final (#cta) — Left text & Right form
  gsap.from('.cta-left-text, .cta-right-form-wrapper', {
    scrollTrigger: {
      trigger: '#cta',
      start: 'top 80%'
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'all'
  });
}
