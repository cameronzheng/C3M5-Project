function toggleMenu() {
    const nav = document.querySelector('nav[aria-label="Main navigation"]');
    if (nav) {
        nav.classList.toggle('active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
            }
        });
    }
});

function filterProjects(category) {
    const projects = document.querySelectorAll('#projects article');
    projects.forEach(project => {
        const projectCategories = project.getAttribute('data-category')?.split(',') || [];
        if (category === 'all' || projectCategories.includes(category)) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Lightbox functionality
function createLightbox() {
    // Create modal elements if not already present
    if (document.getElementById('lightbox-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.position = 'fixed';
    modal.style.top = 0;
    modal.style.left = 0;
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.85)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = 2000;
    modal.style.cursor = 'zoom-out';
    modal.style.transition = 'opacity 0.2s';

    const img = document.createElement('img');
    img.id = 'lightbox-img';
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '80vh';
    img.style.borderRadius = '10px';
    img.alt = '';

    modal.appendChild(img);

    // Close modal on click or Escape key
    modal.addEventListener('click', () => {
        modal.style.opacity = 0;
        setTimeout(() => modal.remove(), 200);
    });
    document.addEventListener('keydown', function escListener(e) {
        if (e.key === 'Escape' && document.getElementById('lightbox-modal')) {
            modal.style.opacity = 0;
            setTimeout(() => modal.remove(), 200);
        }
    });

    document.body.appendChild(modal);
    setTimeout(() => { modal.style.opacity = 1; }, 10);
}

function showLightbox(src, alt) {
    createLightbox();
    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    img.src = src;
    img.alt = alt || '';
    modal.style.opacity = 0;
    setTimeout(() => { modal.style.opacity = 1; }, 10);
}

document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger-menu');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                toggleMenu();
            }
        });
    }

    // Project filter buttons
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = btn.getAttribute('data-category');
            filterProjects(category);
        });
    });

    // Lightbox for project images
    document.querySelectorAll('#projects article img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            showLightbox(img.src, img.alt);
        });
    });

    // Contact form validation with real-time feedback
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');

        // Helper to show or remove error messages
        function showError(input, message) {
            let error = input.parentElement.querySelector('.input-error');
            if (!error) {
                error = document.createElement('div');
                error.className = 'input-error';
                error.style.color = '#ffd700';
                error.style.fontSize = '0.95em';
                error.style.marginTop = '0.2em';
                input.parentElement.appendChild(error);
            }
            error.textContent = message;
        }
        function clearError(input) {
            const error = input.parentElement.querySelector('.input-error');
            if (error) error.remove();
        }

        // Real-time validation events
        name.addEventListener('input', function() {
            if (!name.value.trim()) {
                showError(name, "Please enter your name.");
            } else {
                clearError(name);
            }
        });

        email.addEventListener('input', function() {
            if (!email.value.trim()) {
                showError(email, "Please enter your email.");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, "Please enter a valid email address.");
            } else {
                clearError(email);
            }
        });

        message.addEventListener('input', function() {
            if (!message.value.trim()) {
                showError(message, "Please enter your message.");
            } else {
                clearError(message);
            }
        });

        contactForm.addEventListener('submit', function(e) {
            let valid = true;

            if (!name.value.trim()) {
                showError(name, "Please enter your name.");
                valid = false;
            }
            if (!email.value.trim()) {
                showError(email, "Please enter your email.");
                valid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
                showError(email, "Please enter a valid email address.");
                valid = false;
            }
            if (!message.value.trim()) {
                showError(message, "Please enter your message.");
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
            }
        });
    }
});