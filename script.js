/* ============================================================
   NABILA TABASSUM — PORTFOLIO SCRIPTS
   Scroll animations, navigation, mobile menu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Footer Year ──
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Scroll Reveal (Intersection Observer) ──
    const revealElements = document.querySelectorAll('.reveal');
    let revealIndex = 0;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => revealObserver.observe(el));

    // ── Staggered Tag Animations (coursework & skills) ──
    const staggerContainers = document.querySelectorAll('.coursework-tags, .skills-grid');

    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const children = entry.target.querySelectorAll('.reveal, .course-tag, .skill-card');
                children.forEach((child, i) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, i * 60);
                });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    staggerContainers.forEach((container) => {
        // Set initial state for staggered items
        const items = container.querySelectorAll('.course-tag, .skill-card');
        items.forEach((item) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(16px)';
            item.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
        staggerObserver.observe(container);
    });

    // ── Navbar Scroll Effect ──
    const header = document.getElementById('header');
    let lastScroll = 0;

    const handleScroll = () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on load

    // ── Active Nav Link Highlighting ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const activateNavLink = () => {
        const scrollY = window.scrollY + 100;
        const pageBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 50;

        // If at the bottom of the page, activate the last nav link
        if (pageBottom) {
            navLinks.forEach((link) => link.classList.remove('active'));
            const lastSection = sections[sections.length - 1];
            if (lastSection) {
                const lastId = lastSection.getAttribute('id');
                navLinks.forEach((link) => {
                    if (link.getAttribute('href') === `#${lastId}`) {
                        link.classList.add('active');
                    }
                });
            }
            return;
        }

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', activateNavLink, { passive: true });

    // ── Mobile Menu Toggle ──
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('open');
            document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
        });

        // Close mobile menu when a link is clicked
        navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksContainer.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Smooth Scroll for Anchor Links ──
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 72;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ── Parallax-lite for Hero Glows ──
    const heroGlows = document.querySelectorAll('.hero-glow');
    
    if (heroGlows.length > 0) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            heroGlows.forEach((glow, i) => {
                const factor = i === 0 ? 1 : -0.7;
                glow.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        }, { passive: true });
    }

});