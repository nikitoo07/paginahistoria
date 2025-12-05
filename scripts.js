// Progressive Enhancement - Load GSAP for enhanced animations
(function() {
    'use strict';
    
    // Feature detection and graceful degradation
    const supportsIntersectionObserver = 'IntersectionObserver' in window;
    
    // Load external libraries asynchronously
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    };
    
    // Lazy load GSAP for scroll animations (progressive enhancement)
    Promise.all([
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js'),
        loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js')
    ]).then(() => {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            initScrollAnimations();
        }
    }).catch(err => {
        console.warn('GSAP failed to load. Animations disabled.', err);
    });
    
    // Scroll-based animations (only if libraries loaded)
    function initScrollAnimations() {
        // Fade in sections on scroll
        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    end: 'top 60%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
        
        // Stagger card animations
        gsap.utils.toArray('.card-grid').forEach(grid => {
            gsap.from(grid.children, {
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%'
                },
                opacity: 0,
                y: 40,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Animate content blocks
        gsap.utils.toArray('.content-block').forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 85%',
                    end: 'top 65%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.7,
                ease: 'power2.out'
            });
        });

        // Animate figures
        gsap.utils.toArray('.figure').forEach(figure => {
            gsap.from(figure, {
                scrollTrigger: {
                    trigger: figure,
                    start: 'top 85%',
                    end: 'top 70%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.95,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }
    
    // Smooth scroll for anchor links (with fallback)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus for accessibility
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
    });

    // Add reading progress indicator
    function createProgressBar() {
        const progressBar = document.createElement('div');
        progressBar.id = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #c9a227, #8b2d2d);
            width: 0%;
            z-index: 10000;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // Initialize reading progress
    createProgressBar();

    // Add "Back to Top" button
    function createBackToTopButton() {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.innerHTML = '↑';
        button.setAttribute('aria-label', 'Volver arriba');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #c9a227;
            color: #0a0a0a;
            border: 2px solid rgba(201, 162, 39, 0.3);
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        `;
        
        document.body.appendChild(button);

        // Show/hide button on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        // Smooth scroll to top
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 6px 20px rgba(201, 162, 39, 0.4)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
        });
    }

    // Initialize back to top button
    createBackToTopButton();

    // Add keyboard navigation enhancement
    document.addEventListener('keydown', (e) => {
        // Press 'T' to go to top
        if (e.key === 't' || e.key === 'T') {
            if (!e.target.matches('input, textarea')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }
    });

    // Lazy load images with IntersectionObserver
    if (supportsIntersectionObserver) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add print button functionality
    function addPrintButton() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            if (index === 0) { // Add only to first section
                const printBtn = document.createElement('button');
                printBtn.innerHTML = '🖨️ Imprimir Documento';
                printBtn.setAttribute('aria-label', 'Imprimir documento');
                printBtn.style.cssText = `
                    display: block;
                    margin: 2rem auto;
                    padding: 0.75rem 1.5rem;
                    background: rgba(201, 162, 39, 0.12);
                    color: #c9a227;
                    border: 1px solid rgba(201, 162, 39, 0.3);
                    border-radius: 0.625rem;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;

                printBtn.addEventListener('mouseenter', () => {
                    printBtn.style.background = 'rgba(201, 162, 39, 0.2)';
                    printBtn.style.borderColor = 'rgba(201, 162, 39, 0.5)';
                    printBtn.style.transform = 'translateY(-2px)';
                });

                printBtn.addEventListener('mouseleave', () => {
                    printBtn.style.background = 'rgba(201, 162, 39, 0.12)';
                    printBtn.style.borderColor = 'rgba(201, 162, 39, 0.3)';
                    printBtn.style.transform = 'translateY(0)';
                });

                printBtn.addEventListener('click', () => {
                    window.print();
                });

                section.querySelector('.section__container').appendChild(printBtn);
            }
        });
    }

    // Initialize print button
    addPrintButton();
    
    // Performance monitoring (dev only)
    if (window.performance && window.performance.getEntriesByType) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('📊 Performance Metrics:', {
                'DOM Content Loaded': Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart) + 'ms',
                'Page Load Time': Math.round(perfData.loadEventEnd - perfData.loadEventStart) + 'ms',
                'Total Load Time': Math.round(perfData.loadEventEnd - perfData.fetchStart) + 'ms'
            });

            // Log Core Web Vitals if available
            if ('PerformanceObserver' in window) {
                // Largest Contentful Paint (LCP)
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    console.log('🎨 LCP:', Math.round(lastEntry.renderTime || lastEntry.loadTime) + 'ms');
                }).observe({ entryTypes: ['largest-contentful-paint'] });

                // First Input Delay (FID)
                new PerformanceObserver((entryList) => {
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        console.log('⚡ FID:', Math.round(entry.processingStart - entry.startTime) + 'ms');
                    });
                }).observe({ entryTypes: ['first-input'] });

                // Cumulative Layout Shift (CLS)
                new PerformanceObserver((entryList) => {
                    let clsScore = 0;
                    const entries = entryList.getEntries();
                    entries.forEach(entry => {
                        if (!entry.hadRecentInput) {
                            clsScore += entry.value;
                        }
                    });
                    console.log('📐 CLS:', clsScore.toFixed(4));
                }).observe({ entryTypes: ['layout-shift'] });
            }
        });
    }

    // Add accessibility announcements for screen readers
    function announcePageLoad() {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            white-space: nowrap;
            border: 0;
        `;
        announcement.textContent = 'Documento sobre la Primera Guerra Mundial cargado correctamente. Use las teclas de flecha para navegar.';
        document.body.appendChild(announcement);

        setTimeout(() => {
            announcement.remove();
        }, 3000);
    }

    // Initialize accessibility features
    window.addEventListener('load', announcePageLoad);

    console.log('✅ WWI Historical Document - Initialized successfully');
    console.log('📚 Features: Scroll animations, Reading progress, Back to top, Print support, Accessibility enhanced');
})();