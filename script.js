
/* SMOOTH SCROLL SEAVARA */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (event) {
        const targetId = this.getAttribute('href');

        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();

        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + start - 110;
        const distance = end - start;

        const duration = Math.min(
            2200,
            Math.max(1600, Math.abs(distance) * 1.5)
        );

        const startTime = performance.now();
/** @param {number} currentTime */
        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 0.5 - Math.cos(Math.PI * progress) / 2;

            window.scrollTo(0, start + distance * easing);

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            }
        }

        requestAnimationFrame(animateScroll);
    });
});

// ANIMASI KEMUNCULAN ELEMEN
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll(
        '.product-card, .about-features > div, section h2'
    );

    elements.forEach(element => {
        element.classList.add('reveal');
    });

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});
