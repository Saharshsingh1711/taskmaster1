document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            // Actually, let's just keep it simple, remove scrolled if top
            navbar.classList.remove('scrolled');
            if (window.scrollY > 50) navbar.classList.add('scrolled');
        }
    });

    // Fire scroll event once on load to catch initial state
    window.dispatchEvent(new Event('scroll'));

    // 2. Initial Page Load Animations (Hero)
    const heroReveals = document.querySelectorAll('.reveal');
    heroReveals.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('active');
        }, index * 150 + 50);
    });

    // 3. Scroll Reveal using Intersection Observer
    const scrollReveals = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -20px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                // If it has a custom delay var (for staggered grids)
                const delayStr = entry.target.style.getPropertyValue('--delay');
                let timeout = 0;

                if (delayStr) {
                    timeout = parseFloat(delayStr) * 1000;
                }

                setTimeout(() => {
                    entry.target.classList.add('active');
                }, timeout);

                // Stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    scrollReveals.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Interactive mockups - subtle parallax effect based on mouse movement
    const heroMockup = document.querySelector('.hero-app-mockup');
    const heroSection = document.querySelector('.hero-section');

    if (heroMockup && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            heroMockup.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            heroMockup.style.transform = `rotateY(0deg) rotateX(0deg)`;
            heroMockup.style.transition = 'transform 0.5s ease';
        });

        // Remove CSS transition while moving for instant responsiveness
        heroSection.addEventListener('mouseenter', () => {
            heroMockup.style.transition = 'none';
        });
    }

    // 5. Page Transitions
    const links = document.querySelectorAll('a[href]');

    links.forEach(link => {
        link.addEventListener('click', e => {
            const target = link.getAttribute('href');

            // Ignore anchors, external links, or empty links
            if (target.startsWith('#') || target.startsWith('http') || target === '') {
                return;
            }

            e.preventDefault();
            document.body.classList.add('page-transitioning');

            setTimeout(() => {
                window.location.href = target;
            }, 400); // Matches the 0.4s fade-out animation in CSS
        });
    });
});
