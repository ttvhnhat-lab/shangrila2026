/**
 * INTERACTIVE LOGIC - SHANGRI-LA DIALOGUE 2026 SPECIAL WEB PAGE
 * General Secretary, President To Lam's Keynote Address
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. THEME SWITCHER (Light / Dark Mode on Body) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            lightIcon.classList.add('hidden');
            darkIcon.classList.remove('hidden');
        }
    });

    // --- 2. HEADER SCROLL EFFECT ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    const toggleMobileMenu = () => {
        mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Animating hamburger bars into 'X'
        const bars = menuToggle.querySelectorAll('.bar');
        if (mobileNav.classList.contains('open')) {
            bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    };

    menuToggle.addEventListener('click', toggleMobileMenu);
    
    // Close menu when clicking a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileMenu();
            }
        });
    });

    // --- 4. TABS SYSTEM (Executive Highlights Dashboard) ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button & target content
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(`tab-${targetTab}`).classList.add('active');
        });
    });

    // --- 5. ACCORDION SYSTEM (6 Orientations) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 6. SMART READER CONTROLS (Font Size & Reading Themes) ---
    const readerPaper = document.getElementById('reader-paper');
    const themeBtns = document.querySelectorAll('.reader-theme-btn');
    const sizeDecrease = document.getElementById('size-decrease');
    const sizeReset = document.getElementById('size-reset');
    const sizeIncrease = document.getElementById('size-increase');

    // Font Size Adjuster
    let currentSizeMultiplier = 1.15; // Starting font size in rem
    const minMultiplier = 0.90;
    const maxMultiplier = 1.60;
    const sizeStep = 0.10;

    const updateFontSize = () => {
        document.documentElement.style.setProperty('--reader-font-size', `${currentSizeMultiplier}rem`);
        document.documentElement.style.setProperty('--reader-line-height', `${currentSizeMultiplier * 1.6}rem`);
    };

    sizeIncrease.addEventListener('click', () => {
        if (currentSizeMultiplier < maxMultiplier) {
            currentSizeMultiplier += sizeStep;
            updateFontSize();
        }
    });

    sizeDecrease.addEventListener('click', () => {
        if (currentSizeMultiplier > minMultiplier) {
            currentSizeMultiplier -= sizeStep;
            updateFontSize();
        }
    });

    sizeReset.addEventListener('click', () => {
        currentSizeMultiplier = 1.15;
        updateFontSize();
    });

    // Reading Themes Selector
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const theme = btn.getAttribute('data-theme');
            
            // Clear previous theme classes
            readerPaper.classList.remove('theme-light', 'theme-sepia', 'theme-dark');
            
            // Apply new theme class
            readerPaper.classList.add(`theme-${theme}`);
        });
    });

    // --- 7. READING PROGRESS BAR & SCROLLSPY ---
    const progressBar = document.getElementById('reading-progress-bar');
    const speechSection = document.getElementById('toan-van');
    const speechAnchors = document.querySelectorAll('.speech-anchor-section');
    const outlineLinks = document.querySelectorAll('.outline-link');

    const handleScroll = () => {
        // A. Reading Progress Bar Logic
        const rect = speechSection.getBoundingClientRect();
        const speechHeight = speechSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate progress percentage through the speech section
        let progressPercent = 0;
        if (rect.top <= 0) {
            const scrolledHeight = -rect.top;
            progressPercent = (scrolledHeight / (speechHeight - viewportHeight)) * 100;
            progressPercent = Math.min(Math.max(progressPercent, 0), 100);
        } else {
            progressPercent = 0;
        }
        progressBar.style.width = `${progressPercent}%`;

        // B. Scrollspy Sidebar Outline Highlight Logic
        let activeAnchorId = '';
        const offset = 180; // trigger early when scrolling

        speechAnchors.forEach(anchor => {
            const anchorTop = anchor.offsetTop;
            if (window.scrollY >= anchorTop - offset) {
                activeAnchorId = anchor.getAttribute('id');
            }
        });

        if (activeAnchorId) {
            outlineLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${activeAnchorId}`) {
                    link.classList.add('active');
                }
            });
        }
        
        // C. Navbar Active Item Highlight
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        let activeSectionId = 'hero';

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            if (window.scrollY >= secTop - 250) {
                activeSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // --- 8. GALLERY & PRESS LIGHTBOX MODAL ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    const galleryCards = document.querySelectorAll('.gallery-card');
    const pressCards = document.querySelectorAll('.press-card');
    
    let currentGalleryIndex = 0;
    let isGalleryMode = false;
    
    // Array of gallery items
    const galleryItems = Array.from(galleryCards).map(card => ({
        src: card.getAttribute('data-src'),
        caption: card.getAttribute('data-caption')
    }));

    const openLightbox = (src, caption) => {
        lightboxImg.src = src;
        lightboxCaption.innerHTML = caption;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = ''; // Unlock scroll
    };

    // Click Gallery Card
    galleryCards.forEach(card => {
        card.addEventListener('click', () => {
            currentGalleryIndex = parseInt(card.getAttribute('data-index'), 10);
            isGalleryMode = true;
            lightboxPrev.classList.remove('hidden');
            lightboxNext.classList.remove('hidden');
            openLightbox(galleryItems[currentGalleryIndex].src, galleryItems[currentGalleryIndex].caption);
        });
    });

    // Click Press Card (No slide carousel, single photo only)
    pressCards.forEach(card => {
        card.addEventListener('click', () => {
            isGalleryMode = false;
            lightboxPrev.classList.add('hidden');
            lightboxNext.classList.add('hidden');
            
            const src = card.getAttribute('data-src');
            const headline = card.querySelector('.press-headline').innerText;
            const translation = card.querySelector('.press-translation').innerHTML;
            const logoText = card.querySelector('.press-badge').innerText;
            
            const combinedCaption = `<strong>${logoText} - Bản chụp đầy đủ bài báo</strong><br><strong>Tiêu đề:</strong> ${headline}<br>${translation}`;
            openLightbox(src, combinedCaption);
        });
    });

    // Slideshow Navigation in Lightbox
    const showPrevGalleryItem = () => {
        if (!isGalleryMode) return;
        currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
        lightboxImg.src = galleryItems[currentGalleryIndex].src;
        lightboxCaption.innerHTML = galleryItems[currentGalleryIndex].caption;
    };

    const showNextGalleryItem = () => {
        if (!isGalleryMode) return;
        currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
        lightboxImg.src = galleryItems[currentGalleryIndex].src;
        lightboxCaption.innerHTML = galleryItems[currentGalleryIndex].caption;
    };

    lightboxPrev.addEventListener('click', showPrevGalleryItem);
    lightboxNext.addEventListener('click', showNextGalleryItem);
    
    // Close triggers
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Click outside to close
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && isGalleryMode) showPrevGalleryItem();
            if (e.key === 'ArrowRight' && isGalleryMode) showNextGalleryItem();
        }
    });

    // --- 9. INTERSECTION OBSERVER FOR SCROLL REVEAL ---
    const revealElements = [
        ...document.querySelectorAll('.crisis-card'),
        ...document.querySelectorAll('.accordion-item'),
        ...document.querySelectorAll('.gallery-card'),
        ...document.querySelectorAll('.press-card'),
        document.querySelector('.summary-tabs-container'),
        document.querySelector('.speech-layout')
    ];

    // Setup basic visual preparation states
    revealElements.forEach(el => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        }
    });

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Reveal once
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.05, // trigger when 5% of element is in view
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        if (el) revealObserver.observe(el);
    });
});
