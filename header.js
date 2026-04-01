document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const body = document.body;

    // Smooth sticky header effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Initial check for scroll position
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    }

    // Mobile menu toggle functionality
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
    });

    // Close mobile menu
    closeMenuBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.m-link, .mobile-quote');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });
});
