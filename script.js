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
        e.preventDefault(); // Prevent default link behavior
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

// Modal Functionality
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');

const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalBrand = document.getElementById('modal-brand');
const modalPrice = document.getElementById('modal-price');

productCards.forEach(card => {
    card.addEventListener('click', function() {
        const imgSrc = this.querySelector('img').src;
        const title = this.querySelector('h3').textContent;
        const brand = this.querySelector('.brand').textContent;
        const price = this.querySelector('.price').textContent;

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
    }, 300); // match css transition time
}
