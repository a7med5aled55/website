// Script.js — KOTCHI Core Interactions
// ─── Scroll Reveal ───────────────────────────────────────────────────────────
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

// ─── Toast ───────────────────────────────────────────────────────────────────
const toast = document.getElementById('toast');
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ─── Product Filter — operates on category rows ─────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');

function getCategoryRows() { return document.querySelectorAll('.category-row'); }

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        getCategoryRows().forEach(row => {
            const rowCat = row.getAttribute('data-cat');
            // For 'sale' filter: show all rows but dim non-sale cards inside
            if (filterValue === 'all') {
                row.style.display = '';
                row.querySelectorAll('.slider-card').forEach(c => { c.style.opacity = '1'; c.style.pointerEvents = ''; });
            } else if (filterValue === 'sale') {
                row.style.display = '';
                row.querySelectorAll('.slider-card').forEach(c => {
                    const isSale = c.dataset.sale === 'true';
                    c.style.opacity      = isSale ? '1' : '0.25';
                    c.style.pointerEvents = isSale ? '' : 'none';
                });
            } else {
                row.style.display = (rowCat === filterValue) ? '' : 'none';
                row.querySelectorAll('.slider-card').forEach(c => { c.style.opacity = '1'; c.style.pointerEvents = ''; });
            }
        });
        // scroll into first visible row
        const firstVisible = document.querySelector('.category-row:not([style*="none"])');
        if (firstVisible) firstVisible.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Classic section CTA
const shopClassicBtn = document.getElementById('shop-classic-btn');
if (shopClassicBtn) shopClassicBtn.addEventListener('click', () => {
    document.querySelector('.filter-btn[data-filter="classic"]')?.click();
});

// ─── Carousel / Slider Init ───────────────────────────────────────────────────
function initCarousels() {
    document.querySelectorAll('.category-row').forEach(row => {
        const track    = row.querySelector('.slider-track');
        const viewport = row.querySelector('.slider-viewport');
        const prevBtn  = row.querySelector('.arrow-prev');
        const nextBtn  = row.querySelector('.arrow-next');
        if (!track || !viewport || !prevBtn || !nextBtn) return;

        let scrollPos = 0;

        function getStep() {
            const card = track.querySelector('.slider-card');
            return card ? card.offsetWidth + 20 : 280;
        }

        nextBtn.addEventListener('click', () => {
            const step     = getStep();
            const maxScroll = track.scrollWidth - viewport.clientWidth;
            scrollPos = Math.min(scrollPos + step, maxScroll);
            track.style.transform = `translateX(-${scrollPos}px)`;
        });

        prevBtn.addEventListener('click', () => {
            const step = getStep();
            scrollPos = Math.max(scrollPos - step, 0);
            track.style.transform = `translateX(-${scrollPos}px)`;
        });

        // ── Touch / swipe support ─────────────────────────────────────────
        let touchStartX = 0;
        viewport.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
        viewport.addEventListener('touchend', e => {
            const delta = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(delta) < 30) return;   // ignore tiny taps
            if (delta > 0) nextBtn.click();
            else           prevBtn.click();
        }, { passive: true });

        // ── Recalculate on resize ─────────────────────────────────────────
        window.addEventListener('resize', () => {
            scrollPos = 0;
            track.style.transform = 'translateX(0)';
        });
    });
}

// Carousels are wired AFTER products are rendered (called from products.js or a DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => setTimeout(initCarousels, 50));

// ─── Quick View Modal (event delegation for dynamic cards) ────────────────────
const modal       = document.getElementById('product-modal');
const closeBtn    = document.querySelector('.close-btn');

function openQuickView(card) {
    const img   = card.querySelector('.card-main-img') || card.querySelector('img');
    const title = card.querySelector('h3')?.textContent || '';
    const brand = card.querySelector('.brand')?.textContent || '';
    const price = card.querySelector('.price')?.textContent || '';
    document.getElementById('modal-img').src           = img?.src || '';
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-brand').textContent = brand;
    document.getElementById('modal-price').textContent = price;
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

document.getElementById('product-grid-container')?.addEventListener('click', e => {
    const qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) { e.stopPropagation(); openQuickView(qvBtn.closest('.product-card')); }
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => { modal.classList.remove('show'); setTimeout(() => modal.style.display = 'none', 300); });
}
window.addEventListener('click', e => { if (e.target === modal) closeBtn?.click(); });

// ─── PDP (event delegation) ───────────────────────────────────────────────────
const fullDetailsSection = document.getElementById('full-details-section');
const fullInfoTitle      = document.getElementById('full-info-title');
const fullInfoImg        = document.getElementById('full-info-img');
const fullInfoPrice      = document.getElementById('full-info-price');

document.getElementById('product-grid-container')?.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (!card || e.target.closest('.quick-view-btn') || e.target.closest('.card-swatch') || e.target.closest('.card-size-btn')) return;
    const img   = card.querySelector('.card-main-img') || card.querySelector('img');
    const title = card.querySelector('h3')?.textContent || 'Product';
    const price = card.querySelector('.price')?.textContent || '';
    showToast('Loading Product Details...');
    if (fullInfoTitle) fullInfoTitle.textContent = title + ' — Overview';
    if (fullInfoImg)   fullInfoImg.src = img?.src || '';
    if (fullInfoPrice) fullInfoPrice.textContent = price;
    const firstThumb = document.querySelector('.gallery-thumbnails .thumb');
    if (firstThumb) { firstThumb.src = img?.src || ''; firstThumb.classList.add('active'); }
    if (fullDetailsSection) {
        fullDetailsSection.style.display = 'block';
        const rev = fullDetailsSection.querySelector('.reveal');
        if (rev) revealObserver.observe(rev);
        setTimeout(() => fullDetailsSection.scrollIntoView({ behavior: 'smooth' }), 100);
    }
});

// ─── Size / Color selection (static PDP & modal) ──────────────────────────────
document.addEventListener('click', e => {
    const btn = e.target.closest('.size-btn, .color-swatch');
    if (btn) {
        e.stopPropagation();
        Array.from(btn.parentElement.children).forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
    }
});

// ─── Gallery Slider ───────────────────────────────────────────────────────────
const thumbs  = document.querySelectorAll('.gallery-thumbnails .thumb');
const mainImg = document.getElementById('full-info-img');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
        thumbs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        if (mainImg) { mainImg.style.opacity = 0; setTimeout(() => { mainImg.src = this.src; mainImg.style.opacity = 1; }, 150); }
    });
});

// ─── Accordions ───────────────────────────────────────────────────────────────
document.querySelectorAll('.accordion-item').forEach(acc => {
    acc.querySelector('.accordion-header')?.addEventListener('click', () => acc.classList.toggle('active'));
});

// ─── Cart Logic (EGP) ────────────────────────────────────────────────────────
let cartState = [];

const cartNavIcon          = document.getElementById('cart-nav-icon');
const cartBadge            = document.getElementById('cart-badge');
const cartDrawer           = document.getElementById('cart-drawer');
const cartOverlay          = document.getElementById('cart-overlay');
const closeCartBtn         = document.getElementById('close-cart-btn');
const cartItemsContainer   = document.getElementById('cart-items-container');
const cartTotalPrice       = document.getElementById('cart-total-price');
const checkoutFinalPrice   = document.getElementById('checkout-final-price');

cartNavIcon.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

function openCart(e)  { if(e) e.preventDefault(); cartOverlay.classList.add('show'); cartDrawer.classList.add('open'); }
function closeCart()  { cartOverlay.classList.remove('show'); cartDrawer.classList.remove('open'); }

function parseEGP(str) {
    // Extracts numeric value from strings like "1,490 EGP" or "١٬٤٩٠ ج.م"
    if (!str) return 0;
    const cleaned = str.replace(/[^\d.]/g, '').replace(/,/g, '');
    return parseFloat(cleaned) || 0;
}

function formatEGP(num) {
    return num.toLocaleString('en-EG') + ' EGP';
}

function addToCart(title, priceNum, imgSrc) {
    const existing = cartState.find(item => item.title === title);
    if (existing) { existing.qty += 1; }
    else { cartState.push({ title, price: priceNum, imgSrc, qty: 1 }); }
    updateCartUI();

    // Fly-to-cart animation
    const cartRect = cartNavIcon.getBoundingClientRect();
    const fly = document.createElement('div');
    fly.className = 'flying-item';
    fly.style.cssText = `left:${cartRect.left + cartRect.width/2 - 12}px;top:${cartRect.top - 10}px;`;
    document.body.appendChild(fly);
    setTimeout(() => { fly.style.transform = 'scale(0)'; fly.style.opacity = '0'; }, 50);
    setTimeout(() => { fly.remove(); cartNavIcon.style.transform = 'scale(1.3)'; setTimeout(() => { cartNavIcon.style.transform = ''; openCart(); }, 250); }, 700);
}

// Add-to-cart — PDP button
document.getElementById('pdp-add-to-cart')?.addEventListener('click', e => {
    e.stopPropagation();
    const title    = document.getElementById('full-info-title')?.textContent.replace(' — Overview','').replace(' - Overview','') || 'Product';
    const priceStr = document.getElementById('full-info-price')?.textContent || '0';
    const imgSrc   = document.getElementById('full-info-img')?.src || '';
    addToCart(title, parseEGP(priceStr), imgSrc);
});

// Add-to-cart — Quick View modal
document.querySelector('.add-to-cart-btn')?.addEventListener('click', e => {
    e.stopPropagation();
    const title    = document.getElementById('modal-title')?.textContent || 'Product';
    const priceStr = document.getElementById('modal-price')?.textContent || '0';
    const imgSrc   = document.getElementById('modal-img')?.src || '';
    addToCart(title, parseEGP(priceStr), imgSrc);
});

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0, count = 0;

    if (cartState.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart-msg">Your cart is empty.</div>';
    } else {
        cartState.forEach((item, index) => {
            total += item.price * item.qty;
            count += item.qty;
            const lineTotal = item.price * item.qty;
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.imgSrc}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">${formatEGP(item.price)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="changeQty(${index},-1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="changeQty(${index},1)">+</button>
                    </div>
                    <div style="font-size:0.8rem;opacity:0.6;margin-top:4px;">Line total: ${formatEGP(lineTotal)}</div>
                </div>
            `;
            cartItemsContainer.appendChild(itemEl);
        });
    }

    cartBadge.textContent  = count;
    const totalStr = formatEGP(total);
    if (cartTotalPrice)    cartTotalPrice.textContent    = totalStr;
    if (checkoutFinalPrice) checkoutFinalPrice.textContent = totalStr;
}

window.changeQty = function(index, delta) {
    if (cartState[index]) {
        cartState[index].qty += delta;
        if (cartState[index].qty <= 0) cartState.splice(index, 1);
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

// Hamburger Menu Toggle (disabled — header simplified)
// const menuToggle = document.getElementById('menu-toggle');
// const navMenu = document.getElementById('nav-menu');

// User Services Modals
const loginModal = document.getElementById('login-modal');
const ordersModal = document.getElementById('orders-modal');

// Trigger Buttons
const loginTriggers = [document.getElementById('login-link'), document.getElementById('login-icon-link'), document.getElementById('mobile-bottom-account')];
const ordersTriggers = [document.getElementById('orders-link'), document.getElementById('mobile-orders-link')];

// Mobile Cart Trigger
const mobileCartBtn = document.getElementById('mobile-bottom-cart');
if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', openCart);
}

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

// Support Modal
const supportModal = document.getElementById('support-modal');
const supportCloseBtn = document.querySelector('.support-close-btn');

// Help & Support link — try WhatsApp first, fallback to modal
const helpLink = document.getElementById('help-link');
if (helpLink) {
    // WhatsApp href is already on the anchor; only intercept if you want a modal fallback
    // (Currently direct WhatsApp — no JS needed unless overriding)
}

// Support modal close
if (supportCloseBtn && supportModal) {
    supportCloseBtn.addEventListener('click', () => {
        supportModal.classList.remove('show');
        setTimeout(() => supportModal.style.display = 'none', 300);
    });
    // Close on backdrop click
    window.addEventListener('click', (e) => {
        if (e.target === supportModal) {
            supportModal.classList.remove('show');
            setTimeout(() => supportModal.style.display = 'none', 300);
        }
    });
}

// ─── Auth State Management ─────────────────────────────────────────────────
let currentUser = null;

const loginIconLink  = document.getElementById('login-icon-link');
const profileDropdown = document.getElementById('profile-dropdown');
const profileAvatar   = document.getElementById('profile-avatar');
const profileWrapper  = document.getElementById('profile-wrapper');
const logoutBtn       = document.getElementById('logout-btn');
const tabLogin        = document.getElementById('tab-login');
const tabRegister     = document.getElementById('tab-register');
const authForm        = document.getElementById('auth-form');
const registerForm    = document.getElementById('register-form');
const trackForm       = document.getElementById('track-order-form');

function setLoggedIn(name) {
    currentUser = name;
    const initial = name.charAt(0).toUpperCase();
    // Swap icon → avatar
    if (loginIconLink) loginIconLink.style.display = 'none';
    if (profileAvatar) { profileAvatar.textContent = initial; profileAvatar.style.display = 'flex'; }
    profileWrapper?.classList.add('logged-in');
}

function setLoggedOut() {
    currentUser = null;
    if (loginIconLink) loginIconLink.style.display = '';
    if (profileAvatar) profileAvatar.style.display = 'none';
    profileWrapper?.classList.remove('logged-in');
    if (profileDropdown) profileDropdown.classList.remove('open');
}

// Toggle dropdown on avatar click
profileAvatar?.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    profileDropdown?.classList.toggle('open');
});
document.addEventListener('click', e => {
    if (!profileWrapper?.contains(e.target)) profileDropdown?.classList.remove('open');
});

// Logout
logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    setLoggedOut();
    showToast('You have been logged out.');
});

// Tab switcher
tabLogin?.addEventListener('click', () => {
    tabLogin.classList.add('active'); tabRegister?.classList.remove('active');
    if (authForm)     authForm.style.display = '';
    if (registerForm) registerForm.style.display = 'none';
});
tabRegister?.addEventListener('click', () => {
    tabRegister.classList.add('active'); tabLogin?.classList.remove('active');
    if (authForm)     authForm.style.display = 'none';
    if (registerForm) registerForm.style.display = '';
});

// Login submit
authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email')?.value || 'User';
    const name  = email.split('@')[0];
    setLoggedIn(name);
    loginModal.classList.remove('show');
    setTimeout(() => loginModal.style.display = 'none', 300);
    showToast(`Welcome back, ${name}! 👋`);
});

// Register submit
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name')?.value || 'User';
    setLoggedIn(name);
    loginModal.classList.remove('show');
    setTimeout(() => loginModal.style.display = 'none', 300);
    showToast(`Account created! Welcome, ${name}! 🎉`);
});

// Track order form
trackForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Order Found: Preparing for shipment.');
    ordersModal.style.display = 'none';
});

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
    "Contact Us": "اتصل بنا",
    "Select Size (EU):": "اختر المقاس (EU):",
    "Select Size (EU)": "اختر المقاس (EU)"
};

const originalTexts = new Map();

// Language Switcher Logic
function switchLanguage(targetLang) {
    const isCurrentlyRTL = document.documentElement.classList.contains('rtl-mode');
    if ((targetLang === 'ar' && isCurrentlyRTL) || (targetLang === 'en' && !isCurrentlyRTL)) return;
    
    const isRTL = (targetLang === 'ar');
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
    
    // Update country link
    const countryLinkDesktop = document.getElementById('country-link-desktop');
    const countryLinkMobile = document.getElementById('country-link-mobile');
    
    if (isRTL) {
        if (countryLinkDesktop) countryLinkDesktop.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> مصر / عربي';
        if (countryLinkMobile) countryLinkMobile.textContent = "مصر / عربي";
        showToast("تم تغيير اللغة إلى العربية");
    } else {
        if (countryLinkDesktop) countryLinkDesktop.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Egypt / EN';
        if (countryLinkMobile) countryLinkMobile.textContent = "Egypt / EN";
        showToast("Language changed to English");
    }

    // Refresh product prices for the new language
    if (typeof refreshProductPrices === 'function') refreshProductPrices();

    // Update support modal text
    const supportTitle = document.getElementById('support-modal-title');
    const supportSubtitle = document.getElementById('support-modal-subtitle');
    if (supportTitle) supportTitle.textContent = isRTL ? 'تحتاج مساعدة؟' : 'Need Help?';
    if (supportSubtitle) supportSubtitle.textContent = isRTL
        ? 'فريقنا جاهز لمساعدتك. تواصل معنا مباشرةً:'
        : 'Our team is ready to assist you. Reach us directly:';
}

document.querySelectorAll('.lang-btn-ar').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('ar'); });
});

document.querySelectorAll('.lang-btn-en').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('en'); });
});
