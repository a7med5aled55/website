// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Product Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        productCards.forEach(card => {
            const cardBrand = card.getAttribute('data-brand');
            if (filterValue === 'all' || filterValue === cardBrand) {
                card.style.display = 'block';
                card.animate([
                    { opacity: 0, transform: 'scale(0.95)' },
                    { opacity: 1, transform: 'scale(1)' }
                ], {
                    duration: 400,
                    easing: 'ease-out'
                });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Navigation Active State
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.classList.contains('empty-link')) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Empty Link Toast
const emptyLinks = document.querySelectorAll('.empty-link');
const toast = document.getElementById('toast');

emptyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showToast("Feature Coming Soon!");
    });
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function() {
        toast.classList.remove("show");
    }, 3000);
}

// Interactivity Separation: Modal vs Navigation
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');

const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalBrand = document.getElementById('modal-brand');
const modalPrice = document.getElementById('modal-price');

const fullDetailsSection = document.getElementById('full-details-section');
const fullInfoTitle = document.getElementById('full-info-title');
const fullInfoImg = document.getElementById('full-info-img');

// 1. Quick View Button -> Modal (Stop Propagation)
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent card click event
        
        const card = this.closest('.product-card');
        const imgSrc = card.querySelector('img').src;
        const title = card.querySelector('h3').textContent;
        const brand = card.querySelector('.brand').textContent;
        const price = card.querySelector('.price').textContent;

        modalImg.src = imgSrc;
        modalTitle.textContent = title;
        modalBrand.textContent = brand;
        modalPrice.textContent = price;

        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});

// 2. Product Card Click -> Navigation to Full Info
productCards.forEach(card => {
    // Dynamically inject the View Details overlay
    const overlay = document.createElement('div');
    overlay.className = 'view-details-overlay';
    overlay.innerHTML = '<span>View Details</span>';
    card.insertBefore(overlay, card.firstChild);

    card.addEventListener('click', function() {
        // Simulate Navigation by showing Full Details Section
        showToast("Navigating to Full Details...");
        
        const imgSrc = this.querySelector('img').src;
        const title = this.querySelector('h3').textContent;

        fullInfoTitle.textContent = title + " - Full Overview";
        fullInfoImg.src = imgSrc;

        fullDetailsSection.style.display = 'block';
        
        // Ensure intersection observer picks it up
        revealObserver.observe(fullDetailsSection.querySelector('.reveal'));
        
        // Scroll to it smoothly
        setTimeout(() => {
            fullDetailsSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
});

// Size Selection Logic
const sizeBtns = document.querySelectorAll('.size-btn');
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent modal closure if somehow bubbling
        sizeBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Close Modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(event) {
    if (event.target == modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}
