// =====================================================
// Theme Management with localStorage and OS Detection
// =====================================================

function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    // Check if user has a saved preference
    if (savedTheme) {
        // Use saved preference
        themeToggle.checked = savedTheme === 'dark';
    } else {
        // Check OS preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        themeToggle.checked = prefersDark;
        // Save the OS preference
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }

    // Listen for OS theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Only auto-update if user hasn't manually set a preference recently
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            themeToggle.checked = e.matches;
        }
    });

    // Save theme preference when changed
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// =====================================================
// Mobile Navigation Toggle
// =====================================================

function initMobileNav() {
    const navToggle = document.createElement('button');
    navToggle.className = 'mobile-nav-toggle';
    navToggle.setAttribute('aria-label', 'Toggle navigation');
    navToggle.innerHTML = `
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
    `;

    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');

    // Insert toggle button before nav menu
    navContainer.insertBefore(navToggle, navMenu);

    // Toggle menu on button click
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navContainer.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });

    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// =====================================================
// Smooth Scroll Animations & Fade-in Effects
// =====================================================

function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.project-card, .experience-card, .about-content, .hero-content');

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// =====================================================
// Project Filtering by Technology
// =====================================================

function initProjectFilter() {
    const projectsSection = document.querySelector('.projects');
    if (!projectsSection) return; // Only run on projects page

    const projectCards = document.querySelectorAll('.project-card');

    // Define category mappings - consolidate similar technologies
    const categoryMap = {
        'Python': 'Python',
        'Django': 'Web Dev',
        'Bootstrap': 'Web Dev',
        'Arduino': 'Hardware',
        'C++': 'Systems',
        'Robotics': 'Hardware',
        'asyncio': 'Python',
        'aiohttp': 'Python',
        'BeautifulSoup': 'Python',
        'Algorithms': 'Algorithms',
        'Web Crawling': 'Web Dev',
        'SQLite': 'Web Dev'
    };

    const categories = new Set();

    // Collect categories based on project badges
    projectCards.forEach(card => {
        const badges = card.querySelectorAll('.tech-badge');
        badges.forEach(badge => {
            const tech = badge.textContent.trim();
            const category = categoryMap[tech] || tech;
            categories.add(category);
        });
    });

    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filter-container';
    filterContainer.innerHTML = '<div class="container"><div class="filter-buttons"></div></div>';

    const filterButtons = filterContainer.querySelector('.filter-buttons');

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.textContent = 'All';
    allButton.dataset.filter = 'all';
    filterButtons.appendChild(allButton);

    // Add category filter buttons (sorted)
    Array.from(categories).sort().forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        button.dataset.filter = category.toLowerCase();
        filterButtons.appendChild(button);
    });

    // Insert filter container before projects grid
    const sectionTitle = projectsSection.querySelector('.section-title');
    sectionTitle.after(filterContainer);

    // Filter functionality
    filterButtons.addEventListener('click', function(e) {
        if (!e.target.classList.contains('filter-btn')) return;

        // Update active button
        filterButtons.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        const filter = e.target.dataset.filter;

        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = '';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                const badges = card.querySelectorAll('.tech-badge');
                const hasCategory = Array.from(badges).some(badge => {
                    const tech = badge.textContent.trim();
                    const category = categoryMap[tech] || tech;
                    return category.toLowerCase() === filter;
                });

                if (hasCategory) {
                    card.style.display = '';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
}

// =====================================================
// Navbar Scroll Effect
// =====================================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
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
}

// =====================================================
// Image Carousel for Projects
// =====================================================

function initImageCarousels() {
    const carousels = document.querySelectorAll('.project-image-carousel');

    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const leftArrow = carousel.querySelector('.carousel-arrow-left');
        const rightArrow = carousel.querySelector('.carousel-arrow-right');

        if (images.length === 0) return;

        let currentIndex = 0;
        let autoPlayInterval;

        function showImage(index) {
            // Remove active class from all images and dots
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current image and dot
            images[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');

            currentIndex = index;
        }

        function nextImage() {
            const nextIndex = (currentIndex + 1) % images.length;
            showImage(nextIndex);
        }

        function prevImage() {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(prevIndex);
        }

        function startAutoPlay() {
            stopAutoPlay(); // Clear any existing interval
            autoPlayInterval = setInterval(nextImage, 8000); // Auto-cycle every 8 seconds
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        // Arrow click handlers
        if (leftArrow) {
            leftArrow.addEventListener('click', () => {
                prevImage();
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play after manual interaction
            });
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => {
                nextImage();
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play after manual interaction
            });
        }

        // Dot click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showImage(index);
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play after manual interaction
            });
        });

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Start auto-play
        startAutoPlay();
    });
}

// =====================================================
// Initialize All Features on DOM Load
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileNav();
    initScrollAnimations();
    initProjectFilter();
    initNavbarScroll();
    initImageCarousels();
});
