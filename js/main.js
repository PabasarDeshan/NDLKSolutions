document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('hidden');
                menuBtn.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            } else {
                mobileMenu.classList.add('hidden');
                menuBtn.innerHTML = '<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>';
            }
        });
    }

    // Sticky Navbar Glass Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-xl', 'bg-ndlk-navy/95');
            navbar.classList.remove('bg-ndlk-navy/90');
        } else {
            navbar.classList.remove('shadow-xl', 'bg-ndlk-navy/95');
            navbar.classList.add('bg-ndlk-navy/90');
        }
    });

    // Intersection Observer for Fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Target elements that need animation
    const animatedElements = document.querySelectorAll('.group, .bg-ndlk-blue, section h2, section p, .grid > div');
    animatedElements.forEach(el => {
        // Only add if not already animated (like hero)
        if (!el.classList.contains('animate-fade-in-up')) {
            el.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
            observer.observe(el);
        }
    });

    // Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter');
    if (typeWriterElement) {
        const textToType = "Smart Solutions for a Smarter World";
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                typeWriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Speed of typing
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Initialize Testimonial Swiper
    const testimonialSwiper = new Swiper('.testimonialSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
        }
    });

    // Review Modal Logic
    const reviewModal = document.getElementById('review-modal');
    const openModalBtn = document.getElementById('open-review-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalContainer = document.getElementById('modal-container');
    const reviewForm = document.getElementById('review-form');
    const successMessage = document.getElementById('success-message');

    function openModal() {
        reviewModal.classList.remove('hidden');
        setTimeout(() => {
            modalContainer.classList.remove('scale-95', 'opacity-0');
            modalContainer.classList.add('scale-100', 'opacity-100');
        }, 10);
    }

    function closeModal() {
        modalContainer.classList.add('scale-95', 'opacity-0');
        modalContainer.classList.remove('scale-100', 'opacity-100');
        setTimeout(() => {
            reviewModal.classList.add('hidden');
            // Reset form and message
            reviewForm.classList.remove('hidden');
            successMessage.classList.add('hidden');
            reviewForm.reset();
        }, 300);
    }

    if (openModalBtn) openModalBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values from form inputs
            const name = reviewForm.querySelector('input[placeholder*="Enter your name"]').value;
            const role = reviewForm.querySelector('input[placeholder*="e.g. CEO"]').value;
            const review = reviewForm.querySelector('textarea').value;

            // Create new slide
            const newSlideHTML = `
                <div class="swiper-slide">
                    <div class="glass p-8 rounded-xl relative h-full">
                        <svg class="w-10 h-10 text-ndlk-orange absolute top-6 right-6 opacity-20" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z"></path>
                        </svg>
                        <p class="text-slate-300 italic mb-6 relative z-10">"${review}"</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full border-2 border-ndlk-orange bg-ndlk-blue flex items-center justify-center text-white font-bold uppercase">${name.charAt(0)}</div>
                            <div>
                                <h5 class="text-white font-bold">${name}</h5>
                                <p class="text-xs text-slate-500">${role}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Append to carousel
            testimonialSwiper.appendSlide(newSlideHTML);

            // Critical for Swiper with loop: true - Destroy and Rebuild Loop
            if (testimonialSwiper.params.loop) {
                testimonialSwiper.loopDestroy();
                testimonialSwiper.loopCreate();
            }
            testimonialSwiper.update();

            // Show Success
            reviewForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Auto close after 3 seconds
            setTimeout(closeModal, 3000);
        });
    }

    // Number Counting Animation for Stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                let startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / duration, 1);
                    target.innerText = Math.floor(progress * countTo);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        target.innerText = countTo; // Ensure it ends exactly at target
                    }
                }

                window.requestAnimationFrame(step);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    const initStats = () => {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length > 0) {
            stats.forEach(stat => statsObserver.observe(stat));
        }
    };

    initStats();
});
