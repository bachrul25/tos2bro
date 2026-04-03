document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Tutup menu saat link diklik (untuk mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
            }
        });
    });

    // 2. Smooth Scrolling untuk navigasi anchor
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Scroll Animation (Fade-in elements saat masuk viewport)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Animasi counter dan progress untuk section volume
    const formatCounterValue = (value, decimals) => {
        if (decimals > 0) {
            return value.toFixed(decimals);
        }

        return Math.round(value).toString();
    };

    const animateCounter = counter => {
        const target = Number(counter.dataset.target || 0);
        const decimals = Number(counter.dataset.decimals || 0);
        const duration = 1800;
        const startTime = performance.now();

        const updateValue = currentTime => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = target * eased;

            counter.textContent = formatCounterValue(currentValue, decimals);

            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        };

        requestAnimationFrame(updateValue);
    };

    const volumeCards = document.querySelectorAll('.volume-card');
    const volumeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }

            const card = entry.target;
            card.classList.add('is-visible');

            const counter = card.querySelector('.counter');
            const fill = card.querySelector('.volume-fill');

            if (counter && !counter.dataset.animated) {
                counter.dataset.animated = 'true';
                animateCounter(counter);
            }

            if (fill && !fill.dataset.loaded) {
                fill.dataset.loaded = 'true';
                fill.style.width = `${fill.dataset.fill || 0}%`;
            }

            observer.unobserve(card);
        });
    }, {
        threshold: 0.35
    });

    volumeCards.forEach(card => {
        volumeObserver.observe(card);
    });

    // 5. Dummy Alert untuk Buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            alert('Fitur ini masih dalam tahap pengembangan. Terima kasih atas ketertarikan Anda!');
        });
    });
});
