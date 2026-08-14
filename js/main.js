/* ====================================================================
   MD ASHIK AHMMED – Premium Dynamic Portfolio JavaScript
   Interactions: Custom cursor, scroll reveals, navbar, counters
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ── Navbar scroll effect ──
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      
      if (backToTop) {
        if (scrollY > 400) {
          backToTop.classList.add('show');
        } else {
          backToTop.classList.remove('show');
        }
      }
      
      updateActiveNav();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  
    // ── Active navigation link ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar .nav-link');
    
    function updateActiveNav() {
      let current = '';
      const scrollPos = window.scrollY + 150;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.substring(1) === current) {
          link.classList.add('active');
        }
      });
    }
  
    // ── Smooth scroll for nav links ──
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const navCollapse = document.querySelector('.navbar-collapse');
            if (navCollapse && navCollapse.classList.contains('show')) {
              const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
              if (bsCollapse) bsCollapse.hide();
            }
          }
        }
      });
    });
  
    // ── Enhanced Scroll Reveal ──
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
  
    // ── Counter animation ──
    const statNums = document.querySelectorAll('.hero-stat-num[data-count]');
    let countersStarted = false;
    
    function animateCounters() {
      if (countersStarted) return;
      countersStarted = true;
      
      statNums.forEach(num => {
        const target = parseInt(num.getAttribute('data-count'));
        const suffix = num.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          num.textContent = current + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            num.textContent = target + suffix;
          }
        }
        
        requestAnimationFrame(updateCount);
      });
    }
    
    const heroSection = document.querySelector('#hero');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(animateCounters, 300);
          heroObserver.disconnect();
        }
      }, { threshold: 0.3 });
      heroObserver.observe(heroSection);
    }
  
    // ── Stagger delay assignment ──
    document.querySelectorAll('.stagger-children').forEach(parent => {
      const children = parent.children;
      Array.from(children).forEach((child, idx) => {
        child.style.setProperty('--i', idx);
      });
    });
  
    // ── Typing effect for hero title ──
    const heroTitleEl = document.querySelector('.hero-title-typed');
    if (heroTitleEl) {
      const text = heroTitleEl.getAttribute('data-text');
      heroTitleEl.textContent = '';
      let i = 0;
      
      function typeChar() {
        if (i < text.length) {
          heroTitleEl.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, 50);
        }
      }
      setTimeout(typeChar, 800);
    }
  
    // ── Document card click handlers ──
    document.querySelectorAll('[data-doc-modal]').forEach(card => {
      card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-doc-modal');
        const modal = document.querySelector(modalId);
        if (modal) {
          const bsModal = new bootstrap.Modal(modal);
          bsModal.show();
        }
      });
    });
  
    // ── Gallery Lightbox ──
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const caption = item.getAttribute('data-caption');
        if (img) openLightbox(img.src, caption);
      });
    });
    
    function openLightbox(src, caption) {
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 99999;
        background: rgba(13, 17, 23, 0.95); backdrop-filter: blur(10px);
        display: flex; align-items: center; justify-content: center;
        flex-direction: column; cursor: pointer;
        opacity: 0; transition: opacity 0.3s ease;
      `;
      
      const imgEl = document.createElement('img');
      imgEl.src = src;
      imgEl.style.cssText = `
        max-width: 90vw; max-height: 80vh; border-radius: 12px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        transform: scale(0.9); transition: transform 0.3s ease;
      `;
      
      const captionEl = document.createElement('p');
      captionEl.textContent = caption;
      captionEl.style.cssText = `
        color: #f8fafc; font-size: 1.1rem; margin-top: 1.5rem;
        font-family: 'Inter', sans-serif; opacity: 0.9;
      `;
      
      const closeBtn = document.createElement('button');
      closeBtn.innerHTML = '<i class="bi bi-x-lg"></i>';
      closeBtn.style.cssText = `
        position: absolute; top: 2rem; right: 2rem;
        background: rgba(255,255,255,0.1); border: none;
        color: #fff; font-size: 1.5rem; width: 50px; height: 50px;
        border-radius: 50%; cursor: pointer; display: flex;
        align-items: center; justify-content: center;
        transition: all 0.3s;
      `;
      closeBtn.onmouseover = () => { closeBtn.style.background = '#10b981'; closeBtn.style.color = '#ffffff'; };
      closeBtn.onmouseout = () => { closeBtn.style.background = 'rgba(255,255,255,0.1)'; closeBtn.style.color = '#fff'; };
      
      overlay.appendChild(closeBtn);
      overlay.appendChild(imgEl);
      if (caption) overlay.appendChild(captionEl);
      document.body.appendChild(overlay);
      
      // Trigger animation
      requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        imgEl.style.transform = 'scale(1)';
      });
      
      const close = () => {
        overlay.style.opacity = '0';
        imgEl.style.transform = 'scale(0.9)';
        setTimeout(() => document.body.removeChild(overlay), 300);
      };
      
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn || closeBtn.contains(e.target)) close();
      });
      
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', escHandler);
        }
      });
    }
    
    // ── Gallery See More Toggle ──
    const seeMoreBtn = document.getElementById('seeMoreGalleryBtn');
    const galleryMasonry = document.querySelector('.gallery-masonry');
    if (seeMoreBtn && galleryMasonry) {
      seeMoreBtn.addEventListener('click', () => {
        galleryMasonry.classList.toggle('show-all');
        if (galleryMasonry.classList.contains('show-all')) {
          seeMoreBtn.innerHTML = 'See Less <i class="bi bi-chevron-up ms-1"></i>';
        } else {
          seeMoreBtn.innerHTML = 'See More <i class="bi bi-chevron-down ms-1"></i>';
          // Smooth scroll back to gallery section
          document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
