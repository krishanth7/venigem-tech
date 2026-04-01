document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const body = document.body;
    const navLinks = document.querySelectorAll('.nav-link, .m-link');

    const normalizePathname = (pathname) => {
        let normalized = (pathname || '').toLowerCase();

        if (!normalized || normalized === '/') {
            return '/';
        }

        normalized = normalized.replace(/\/+$/, '');
        const segments = normalized.split('/');
        const lastSegment = segments[segments.length - 1];

        if (lastSegment === 'index.html') {
            return '/';
        }

        return lastSegment;
    };

    const currentPath = normalizePathname(window.location.pathname);

    navLinks.forEach((link) => {
        const linkUrl = new URL(link.getAttribute('href'), window.location.origin);
        const linkPath = normalizePathname(linkUrl.pathname);
        const isActive = linkPath === currentPath;
        link.classList.toggle('active', isActive);
    });

    // Smooth architectural sticky header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const openMobileMenu = () => {
        if (!mobileNav || !menuToggle) return;

        mobileNav.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        body.style.overflow = 'hidden';

        // Stagger animation for links
        const links = mobileNav.querySelectorAll('.m-link');
        links.forEach((link, idx) => {
            link.style.setProperty('--item-index', idx);
        });
    };

    const closeMobileMenu = () => {
        if (!mobileNav || !menuToggle) return;

        mobileNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    };

    // Mobile Menu Animation Controller
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                closeMobileMenu();
                return;
            }
            openMobileMenu();
        });
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    if (mobileNav) {
        mobileNav.addEventListener('click', (event) => {
            if (event.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close on link click
    const mobileLinks = document.querySelectorAll('.m-link, .mobile-quote');
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
});
