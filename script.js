// script.js
// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

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
                card.animate([{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }], { duration: 400, easing: 'ease-out' });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Navigation & Toasts
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (!this.classList.contains('empty-link') && !this.classList.contains('social-icon')) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        } else if (this.classList.contains('empty-link')) {
            e.preventDefault();
            showToast("Feature Coming Soon!");
        }
    });
});

const toast = document.getElementById('toast');
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
}

// Modal Interactivity
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');

quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function(event) {
        event.stopPropagation();
        const card = this.closest('.product-card');
        document.getElementById('modal-img').src = card.querySelector('img').src;
        document.getElementById('modal-title').textContent = card.querySelector('h3').textContent;
        document.getElementById('modal-brand').textContent = card.querySelector('.brand').textContent;
        document.getElementById('modal-price').textContent = card.querySelector('.price').textContent;
        modal.style.display = "flex";
        setTimeout(() => modal.classList.add('show'), 10);
    });
});

closeBtn.addEventListener('click', () => { modal.classList.remove('show'); setTimeout(() => modal.style.display = "none", 300); });
window.addEventListener('click', e => { if (e.target == modal) closeBtn.click(); });

// PDP Navigation Simulation
const fullDetailsSection = document.getElementById('full-details-section');
const fullInfoTitle = document.getElementById('full-info-title');
const fullInfoImg = document.getElementById('full-info-img');
const fullInfoPrice = document.getElementById('full-info-price');

productCards.forEach(card => {
    const overlay = document.createElement('div');
    overlay.className = 'view-details-overlay';
    overlay.innerHTML = '<span>View Details</span>';
    card.insertBefore(overlay, card.firstChild);

    card.addEventListener('click', function() {
        showToast("Loading Product Details...");
        fullInfoTitle.textContent = this.querySelector('h3').textContent + " - Overview";
        fullInfoImg.src = this.querySelector('img').src;
        if(fullInfoPrice) fullInfoPrice.textContent = this.querySelector('.price').textContent;
        
        document.querySelectorAll('.gallery-thumbnails .thumb').forEach(t => t.classList.remove('active'));
        const firstThumb = document.querySelector('.gallery-thumbnails .thumb');
        if(firstThumb) {
            firstThumb.classList.add('active');
            firstThumb.src = this.querySelector('img').src;
        }

        fullDetailsSection.style.display = 'block';
        revealObserver.observe(fullDetailsSection.querySelector('.reveal'));
        setTimeout(() => fullDetailsSection.scrollIntoView({ behavior: 'smooth' }), 100);
    });
});

// Generic Size/Color Selection
document.querySelectorAll('.size-btn, .color-swatch').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const siblings = this.parentElement.children;
        Array.from(siblings).forEach(s => s.classList.remove('active'));
        this.classList.add('active');
    });
});

// Gallery Slider
const thumbs = document.querySelectorAll('.gallery-thumbnails .thumb');
const mainImg = document.getElementById('full-info-img');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImg.style.opacity = 0;
        setTimeout(() => {
            mainImg.src = this.src;
            mainImg.style.opacity = 1;
        }, 150);
    });
});

// Accordions
const accordions = document.querySelectorAll('.accordion-item');
accordions.forEach(acc => {
    acc.querySelector('.accordion-header').addEventListener('click', function() {
        acc.classList.toggle('active');
    });
});

// ----------------------------------------------------
// Cart Logic
// ----------------------------------------------------
let cartState = [];

const addToCartBtns = document.querySelectorAll('.pdp-add-to-cart, .add-to-cart-btn');
const cartNavIcon = document.getElementById('cart-nav-icon');
const cartBadge = document.getElementById('cart-badge');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutFinalPrice = document.getElementById('checkout-final-price');

// Toggle Cart
cartNavIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function openCart() {
    cartOverlay.classList.add('show');
    cartDrawer.classList.add('open');
}

function closeCart() {
    cartOverlay.classList.remove('show');
    cartDrawer.classList.remove('open');
}

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        let itemTitle = "Premium Sneaker";
        let itemPrice = 250;
        let imgSrc = "hero_sneaker.png";
        
        if(this.classList.contains('pdp-add-to-cart')) {
            itemTitle = document.getElementById('full-info-title').textContent.replace(" - Overview", "");
            itemPrice = parseInt(document.getElementById('full-info-price').textContent.replace('$', ''));
            imgSrc = document.getElementById('full-info-img').src;
        } else if(this.classList.contains('add-to-cart-btn')) {
            itemTitle = document.getElementById('modal-title').textContent;
            itemPrice = parseInt(document.getElementById('modal-price').textContent.replace('$', ''));
            imgSrc = document.getElementById('modal-img').src;
        }
        
        const existingItem = cartState.find(item => item.title === itemTitle);
        if(existingItem) {
            existingItem.qty += 1;
        } else {
            cartState.push({ title: itemTitle, price: itemPrice, imgSrc: imgSrc, qty: 1 });
        }
        
        updateCartUI();

        const flyingItem = document.createElement('div');
        flyingItem.classList.add('flying-item');
        
        const rect = this.getBoundingClientRect();
        flyingItem.style.left = rect.left + (rect.width / 2) - 12 + 'px';
        flyingItem.style.top = rect.top + (rect.height / 2) - 12 + 'px';
        
        document.body.appendChild(flyingItem);
        flyingItem.offsetHeight; 
        
        const cartRect = cartNavIcon.getBoundingClientRect();
        flyingItem.style.left = cartRect.left + (cartRect.width / 2) - 12 + 'px';
        flyingItem.style.top = cartRect.top + (cartRect.height / 2) - 12 + 'px';
        flyingItem.style.transform = 'scale(0.1)';
        flyingItem.style.opacity = '0';
        
        setTimeout(() => {
            flyingItem.remove();
            cartNavIcon.style.transform = 'scale(1.3)';
            cartNavIcon.style.color = 'var(--accent-color)';
            setTimeout(() => {
                cartNavIcon.style.transform = 'scale(1)';
                cartNavIcon.style.color = 'inherit';
                openCart();
            }, 300);
        }, 800);
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cartState.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartState.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartBadge.textContent = count;
    cartTotalPrice.textContent = '$' + total.toFixed(2);
    if(checkoutFinalPrice) checkoutFinalPrice.textContent = '$' + total.toFixed(2);
}

window.changeQty = function(index, delta) {
    if (cartState[index]) {
        cartState[index].qty += delta;
        if (cartState[index].qty <= 0) {
            cartState.splice(index, 1);
        }
        updateCartUI();
    }
};

// Checkout Modal
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutCloseBtn = document.querySelector('.checkout-close-btn');

checkoutBtn.addEventListener('click', () => {
    if(cartState.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    closeCart();
    checkoutModal.style.display = "flex";
    setTimeout(() => checkoutModal.classList.add('show'), 10);
});

if(checkoutCloseBtn) {
    checkoutCloseBtn.addEventListener('click', () => { 
        checkoutModal.classList.remove('show'); 
        setTimeout(() => checkoutModal.style.display = "none", 300); 
    });
}

const paymentForm = document.querySelector('.payment-form');
if(paymentForm) {
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        checkoutModal.classList.remove('show');
        setTimeout(() => {
            checkoutModal.style.display = "none";
            cartState = [];
            updateCartUI();
            showToast("Payment Successful! Thank you.");
        }, 300);
    });
}

document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        checkoutModal.classList.remove('show');
        setTimeout(() => {
            checkoutModal.style.display = "none";
            cartState = [];
            updateCartUI();
            showToast("Payment Processed Successfully!");
        }, 300);
    });
});

// Payment Method Toggle
const paymentRadios = document.querySelectorAll('input[name="payment_method"]');
const cardForm = document.getElementById('card-payment-form');
const confirmOrderBtn = document.getElementById('confirm-order-btn');

if(paymentRadios && cardForm) {
    paymentRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if(this.value === 'card') {
                cardForm.style.display = 'block';
            } else {
                cardForm.style.display = 'none';
            }
        });
    });
}

if(confirmOrderBtn) {
    confirmOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const selectedMethod = document.querySelector('input[name="payment_method"]:checked').value;
        checkoutModal.classList.remove('show');
        setTimeout(() => {
            checkoutModal.style.display = "none";
            cartState = [];
            updateCartUI();
            if(selectedMethod === 'cod') {
                showToast("Order Confirmed! You will pay on delivery.");
            } else {
                showToast("Payment Successful! Thank you.");
            }
        }, 300);
    });
}

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if(menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// User Services Modals
const loginModal = document.getElementById('login-modal');
const ordersModal = document.getElementById('orders-modal');

// Trigger Buttons
const loginTriggers = [document.getElementById('login-link'), document.getElementById('login-icon-link')];
const ordersTriggers = [document.getElementById('orders-link'), document.getElementById('mobile-orders-link')];

// Close Buttons
const loginCloseBtn = document.querySelector('.login-close-btn');
const ordersCloseBtn = document.querySelector('.orders-close-btn');

loginTriggers.forEach(btn => {
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            loginModal.classList.add('show');
            loginModal.style.display = 'flex';
        });
    }
});

ordersTriggers.forEach(btn => {
    if(btn) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            ordersModal.classList.add('show');
            ordersModal.style.display = 'flex';
        });
    }
});

if(loginCloseBtn) {
    loginCloseBtn.addEventListener('click', () => {
        loginModal.classList.remove('show');
        setTimeout(() => loginModal.style.display = 'none', 300);
    });
}

if(ordersCloseBtn) {
    ordersCloseBtn.addEventListener('click', () => {
        ordersModal.classList.remove('show');
        setTimeout(() => ordersModal.style.display = 'none', 300);
    });
}

// Handle Form Submissions (Simulated)
const authForm = document.getElementById('auth-form');
const trackForm = document.getElementById('track-order-form');

if(authForm) {
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Logged in successfully!");
        loginModal.style.display = 'none';
    });
}

if(trackForm) {
    trackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast("Order Found: Preparing for shipment.");
        ordersModal.style.display = 'none';
    });
}

// Arabic Translations Dictionary
const translations = {
    "STEP INTO THE": "اخطُ نحو",
    "FUTURE.": "المستقبل.",
    "Minimalist design. Bold presence. Unmatched urban style.": "تصميم بسيط. حضور جريء. أسلوب حضري لا مثيل له.",
    "Shop Now": "تسوق الآن",
    "New Arrivals": "وصل حديثاً",
    "Classic Shoes": "أحذية كلاسيكية",
    "Sale": "تخفيضات",
    "Contact": "اتصل بنا",
    "Collections": "تشكيلات",
    "KOTCHI Classic": "كوتشي كلاسيك",
    "KOTCHI Classic: Timeless elegance with a rugged edge.": "أناقة خالدة بلمسة قوية.",
    "The Signature Burgundy Oxford": "أكسفورد العنابي المميز",
    "Our flagship rugged oxford crafted from premium seamless leather.": "حذاء أكسفورد الرائد لدينا مصنوع من الجلد الفاخر.",
    "Shop Featured": "تسوق المميز",
    "Quick View": "نظرة سريعة",
    "All": "الكل",
    "Help & Support": "المساعدة والدعم",
    "Orders & Returns": "الطلبات والإرجاع",
    "Sign In": "تسجيل الدخول",
    "Track Order": "تتبع الطلب",
    "Subscribe": "اشترك",
    "Stay in the Loop": "ابق على اطلاع",
    "Subscribe for exclusive drops and early access.": "اشترك للحصول على الإصدارات الحصرية والوصول المبكر.",
    "Elevating urban footwear with minimalist design and uncompromising quality.": "نرتقي بالأحذية الحضرية بتصميم بسيط وجودة لا هوادة فيها.",
    "Shop": "التسوق",
    "Support": "الدعم",
    "Best Sellers": "الأكثر مبيعاً",
    "Release Dates": "تواريخ الإصدار",
    "FAQ": "الأسئلة الشائعة",
    "Shipping & Returns": "الشحن والإرجاع",
    "Contact Us": "اتصل بنا"
};

const originalTexts = new Map();

// Language Switcher Logic
const langSwitchers = document.querySelectorAll('.lang-switcher');
langSwitchers.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isRTL = !document.documentElement.classList.contains('rtl-mode');
        document.documentElement.classList.toggle('rtl-mode', isRTL);
        
        // Toggle text logic
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
            const text = node.nodeValue.trim();
            if (text.length > 0) {
                if (isRTL) {
                    if (translations[text]) {
                        if (!originalTexts.has(node)) originalTexts.set(node, text);
                        node.nodeValue = node.nodeValue.replace(text, translations[text]);
                    }
                } else {
                    if (originalTexts.has(node)) {
                        node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), originalTexts.get(node));
                    }
                }
            }
        }
        
        // Translate placeholders
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            const placeholder = input.getAttribute('placeholder');
            if (placeholder) {
                if (isRTL) {
                    // Quick add some placeholders
                    const phTrans = {
                        "Email Address": "البريد الإلكتروني",
                        "Password": "كلمة المرور",
                        "Enter your email": "أدخل بريدك الإلكتروني"
                    };
                    if (phTrans[placeholder]) {
                        if (!originalTexts.has(input)) originalTexts.set(input, placeholder);
                        input.setAttribute('placeholder', phTrans[placeholder]);
                    }
                } else {
                    if (originalTexts.has(input)) {
                        input.setAttribute('placeholder', originalTexts.get(input));
                    }
                }
            }
        });
        
        if (isRTL) {
            showToast("تم تغيير اللغة إلى العربية");
        } else {
            showToast("Language changed to English");
        }
    });
});
