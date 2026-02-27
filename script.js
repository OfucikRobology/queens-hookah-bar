/* ============================================
   Queen's Lounge & Hookah Bar - JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---------- Age Verification Modal ----------
    const ageModal = document.getElementById('age-modal');
    const ageYes = document.getElementById('age-yes');
    const ageNo = document.getElementById('age-no');
    const preloader = document.getElementById('preloader');

    // Check if already verified
    if (sessionStorage.getItem('ageVerified') === 'true') {
        ageModal.classList.add('hidden');
        startPreloader();
    } else {
        document.body.classList.add('no-scroll');
    }

    ageYes.addEventListener('click', () => {
        sessionStorage.setItem('ageVerified', 'true');
        ageModal.classList.add('hidden');
        startPreloader();
    });

    ageNo.addEventListener('click', () => {
        window.location.href = 'https://www.google.com';
    });

    function startPreloader() {
        document.body.classList.add('no-scroll');
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('no-scroll');
            animateHeroOnLoad();
        }, 1800);
    }

    // ---------- Hero Load Animation ----------
    function animateHeroOnLoad() {
        const heroElements = document.querySelectorAll('.hero .reveal');
        heroElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 200);
        });
    }

    // ---------- Particles Effect ----------
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        const count = window.innerWidth < 768 ? 30 : 60;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 8 + 4;
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.3 + 0.05;
            const isGold = Math.random() > 0.5;

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}%;
                top: ${y}%;
                background: ${isGold ? 'rgba(201, 168, 76, ' + opacity + ')' : 'rgba(107, 33, 168, ' + opacity + ')'};
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${duration}s ${delay}s ease-in-out infinite;
            `;
            particlesContainer.appendChild(particle);
        }
    }

    // Add particle animation keyframes
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.5;
            }
            25% {
                transform: translate(${Math.random() > 0.5 ? '' : '-'}20px, -30px) scale(1.2);
                opacity: 1;
            }
            50% {
                transform: translate(${Math.random() > 0.5 ? '' : '-'}10px, -60px) scale(0.8);
                opacity: 0.3;
            }
            75% {
                transform: translate(${Math.random() > 0.5 ? '' : '-'}30px, -30px) scale(1.1);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    createParticles();

    // ---------- Navigation ----------
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink() {
        const scrollY = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);

    // ---------- Menu Tabs ----------
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');

    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            menuTabs.forEach(t => t.classList.remove('active'));
            menuContents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById('tab-' + target).classList.add('active');

            // Re-trigger reveal for new tab content
            const newCards = document.querySelectorAll('#tab-' + target + ' .reveal');
            newCards.forEach((card, i) => {
                card.classList.remove('visible');
                setTimeout(() => {
                    card.classList.add('visible');
                }, i * 100);
            });
        });
    });

    // ---------- Scroll Reveal ----------
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger child reveals
                const parent = entry.target.closest('.about-features, .menu-grid, .services-grid, .gallery-grid');
                if (parent) {
                    const siblings = parent.querySelectorAll('.reveal');
                    const index = Array.from(siblings).indexOf(entry.target);
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 100);
                } else {
                    entry.target.classList.add('visible');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        // Don't observe hero elements - they're handled separately
        if (!el.closest('.hero')) {
            revealObserver.observe(el);
        }
    });

    // ---------- Reservation Form ----------
    const reservationForm = document.getElementById('reservation-form');
    const dateInput = document.getElementById('res-date');

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(reservationForm);
        const data = Object.fromEntries(formData);

        // Simple validation
        if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
            showNotification('Prosím vyplňte všechna povinná pole.', 'error');
            return;
        }

        // Show success message
        showNotification('Děkujeme za rezervaci! Brzy vás budeme kontaktovat pro potvrzení.', 'success');
        reservationForm.reset();
    });

    // ---------- Notification ----------
    function showNotification(message, type) {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            z-index: 9999;
            padding: 16px 24px;
            background: ${type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
            border: 1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            border-radius: 12px;
            backdrop-filter: blur(20px);
            color: ${type === 'success' ? '#4ade80' : '#f87171'};
            font-size: 0.9rem;
            animation: slideInRight 0.4s ease;
            max-width: 400px;
        `;

        const notifContent = notification.querySelector('.notification-content');
        notifContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(20px)';
            notification.style.transition = 'all 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // Add notification animation
    const notifStyle = document.createElement('style');
    notifStyle.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(notifStyle);

    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navbar.offsetHeight + 10;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- Parallax Effect on Hero ----------
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
        }
    });

});
