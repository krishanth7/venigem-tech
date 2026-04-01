document.addEventListener('DOMContentLoaded', () => {
    // --- Fancy Number Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const observeCounters = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;
                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 15);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observeCounters.observe(counter);
    });

    // ==========================================================
    // JOURNEY TIMELINE — Vertical Spine Fill + Entry Reveal
    // ==========================================================
    const spineFill = document.getElementById('jrnSpineFill');
    const timeline = document.getElementById('jrnTimeline');
    const journeySection = document.getElementById('journey-section');

    if (spineFill && timeline && journeySection) {
        const entries = timeline.querySelectorAll('.jrn-entry');

        // --- Spine fill on scroll ---
        function updateSpineFill() {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top;
            const timelineHeight = timelineRect.height;
            const viewportHeight = window.innerHeight;

            // How far the viewport center has penetrated the timeline
            const penetration = (viewportHeight * 0.6) - timelineTop;
            const progress = Math.min(Math.max(penetration / timelineHeight, 0), 1);

            spineFill.style.height = (progress * 100) + '%';
        }

        // --- Entry reveal with IntersectionObserver ---
        const entryObserver = new IntersectionObserver((observedEntries) => {
            observedEntries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('jrn-visible');
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        entries.forEach(entry => {
            entryObserver.observe(entry);
        });

        // Listen for scroll to update spine fill
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateSpineFill();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial calculation
        updateSpineFill();
    }
});
