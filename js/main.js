// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('show');
    });
});

// Gallery functionality (for gallery page)
if (document.querySelector('.gallery-grid')) {
    let currentImages = [];
    let currentIndex = 0;

    window.openModal = function(index) {
        if (!currentImages.length) return;
        currentIndex = index;
        const image = currentImages[currentIndex];
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');

        if (modalImage && modalCaption) {
            modalImage.src = image.url;
            modalCaption.textContent = image.filename;
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    };

    window.closeModal = function() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    };

    window.prevImage = function() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
        const image = currentImages[currentIndex];
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        if (modalImage && modalCaption) {
            modalImage.src = image.url;
            modalCaption.textContent = image.filename;
        }
    };

    window.nextImage = function() {
        if (currentImages.length === 0) return;
        currentIndex = (currentIndex + 1) % currentImages.length;
        const image = currentImages[currentIndex];
        const modalImage = document.getElementById('modalImage');
        const modalCaption = document.getElementById('modalCaption');
        if (modalImage && modalCaption) {
            modalImage.src = image.url;
            modalCaption.textContent = image.filename;
        }
    };

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
        if (e.key === 'ArrowLeft') {
            prevImage();
        }
        if (e.key === 'ArrowRight') {
            nextImage();
        }
    });
}

// Contact form handling (using FormSubmit or similar service)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        const successDiv = document.getElementById('formSuccess');
        if (successDiv) {
            successDiv.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                successDiv.style.display = 'none';
            }, 5000);
        }
        
        // Optional: Actually submit the form to FormSubmit
        // Uncomment the line below to enable actual form submission
        // contactForm.submit();
    });
}

// FAQ Accordion functionality (for faq.html)
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            answer.classList.toggle('show');
            question.classList.toggle('active');
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add active class to current navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
        link.classList.add('active');
    }
});