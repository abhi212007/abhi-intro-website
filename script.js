document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MOBILE MENU TOGGLE
       ========================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = menuToggle.querySelector('i');

    function toggleMenu() {
        mobileNav.classList.toggle('active');
        if (mobileNav.classList.contains('active')) {
            menuIcon.className = 'fa-solid fa-xmark';
        } else {
            menuIcon.className = 'fa-solid fa-bars';
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            menuIcon.className = 'fa-solid fa-bars';
        });
    });

    /* ==========================================
       STICKY HEADER & NAV ACTIVE LINK
       ========================================== */
    const header = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active link on scroll
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================
       DYNAMIC TYPING EFFECT
       ========================================== */
    const typingText = document.querySelector('.typing-text');
    const words = [
        "CSE Student.",
        "Developer.",
        "Problem Solver.",
        "Tech Enthusiast."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // faster deletion
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120; // normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        setTimeout(type, 1000);
    }

    /* ==========================================
       SKILL PROGRESS BAR SCROLL ANIMATION
       ========================================== */
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    // Store original widths and set to 0
    const skillWidths = [];
    skillBars.forEach((bar, index) => {
        skillWidths[index] = bar.style.width;
        bar.style.width = '0%';
    });

    const skillsSection = document.getElementById('skills');
    
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach((bar, index) => {
                    bar.style.width = skillWidths[index];
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const skillsObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.15
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    /* ==========================================
       CONTACT FORM SUBMIT & MODAL POPUP
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form details (could be extended later)
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // In a production app, you would send this to a backend/service
            console.log('Form Submitted:', { name, email, subject, message });

            // Display success modal
            successModal.classList.add('active');

            // Reset form
            contactForm.reset();
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    /* ==========================================
       FADE IN ON SCROLL ANIMATIONS
       ========================================== */
    const fadeElements = document.querySelectorAll('.about-card, .skills-category-card, .timeline-content, .project-card');
    
    // Add initial styling via JS so it degrades gracefully if JS is disabled
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const scrollFadeCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const scrollObserver = new IntersectionObserver(scrollFadeCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });
});
