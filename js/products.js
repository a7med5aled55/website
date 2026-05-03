const productsData = [
    // Sneakers
    { brand: "sneakers", isSale: true,  badge: "خصم 15%", badgeClass: "badge-limited",   badgeStyle: "background: #e53935;", image: "sneaker_nike.png",   name: "Neon X Genesis",      brandName: "Nike",               price: "1,490 EGP", oldPrice: "1,750 EGP", priceAr: "١٬٤٩٠ ج.م", oldPriceAr: "١٬٧٥٠ ج.م" },
    { brand: "sneakers", isSale: true,  badge: "خصم 20%", badgeClass: "badge-bestseller", badgeStyle: "background: #e53935;", image: "sneaker_adidas.png", name: "Crimson Runner 2.0",  brandName: "Adidas",             price: "1,250 EGP", oldPrice: "1,560 EGP", priceAr: "١٬٢٥٠ ج.م", oldPriceAr: "١٬٥٦٠ ج.م" },
    { brand: "sneakers", isSale: false, image: "sneaker_puma.png",   name: "Ice Drift",           brandName: "Puma",               price: "1,350 EGP", priceAr: "١٬٣٥٠ ج.م" },
    { brand: "sneakers", isSale: false, image: "hero_sneaker.png",   name: "Electric Orange Pro", brandName: "Nike",               price: "1,750 EGP", priceAr: "١٬٧٥٠ ج.م" },
    // Casual
    { brand: "casual",   isSale: false, image: "casual_1.png",  name: "Suede Slip-On",    brandName: "KOTCHI",             price: "1,200 EGP", priceAr: "١٬٢٠٠ ج.م" },
    { brand: "casual",   isSale: false, image: "casual_2.png",  name: "White Minimalist", brandName: "KOTCHI",             price: "1,380 EGP", priceAr: "١٬٣٨٠ ج.م" },
    { brand: "casual",   isSale: false, image: "casual_3.png",  name: "Tan Desert Boot",  brandName: "KOTCHI",             price: "1,450 EGP", priceAr: "١٬٤٥٠ ج.م" },
    { brand: "casual",   isSale: false, image: "casual_4.png",  name: "Grey Knit Walker", brandName: "KOTCHI",             price: "1,290 EGP", priceAr: "١٬٢٩٠ ج.م" },
    // Sport
    { brand: "sport",    isSale: false, image: "sport_1.png", name: "Neon Velocity",   brandName: "KOTCHI Performance", price: "1,650 EGP", priceAr: "١٬٦٥٠ ج.م" },
    { brand: "sport",    isSale: false, image: "sport_2.png", name: "Alpha Trainer",   brandName: "KOTCHI Performance", price: "1,480 EGP", priceAr: "١٬٤٨٠ ج.م" },
    { brand: "sport",    isSale: false, image: "sport_3.png", name: "Marathon Elite",  brandName: "KOTCHI Performance", price: "1,800 EGP", priceAr: "١٬٨٠٠ ج.م" },
    { brand: "sport",    isSale: false, image: "sport_4.png", name: "Stealth Carbon",  brandName: "KOTCHI Performance", price: "1,950 EGP", priceAr: "١٬٩٥٠ ج.م" },
    // Classic
    { brand: "classic",  isSale: false, image: "classic_black.png", name: "Onyx Black Leather",   brandName: "Kotchi Heritage", price: "1,850 EGP", priceAr: "١٬٨٥٠ ج.م" },
    { brand: "classic",  isSale: false, image: "classic_tan.png",   name: "Classic Tan Leather",   brandName: "Kotchi Heritage", price: "1,750 EGP", priceAr: "١٬٧٥٠ ج.م" },
    { brand: "classic",  isSale: false, image: "classic_navy.png",  name: "Midnight Navy Suede",   brandName: "Kotchi Heritage", price: "1,620 EGP", priceAr: "١٬٦٢٠ ج.م" },
    { brand: "classic",  isSale: false, image: "classic_grey.png",  name: "Slate Grey Leather",    brandName: "Kotchi Heritage", price: "1,690 EGP", priceAr: "١٬٦٩٠ ج.م" }
];

function isRTL() {
    return document.documentElement.classList.contains('rtl-mode');
}

function renderProducts() {
    const grid = document.getElementById('product-grid-container');
    if (!grid) return;

    grid.innerHTML = '';

    productsData.forEach(p => {
        const arabic = isRTL();

        let badgeHtml = '';
        if (p.badge) {
            badgeHtml = `<div class="badge ${p.badgeClass}" style="${p.badgeStyle}">${p.badge}</div>`;
        }

        const displayPrice    = arabic && p.priceAr    ? p.priceAr    : p.price;
        const displayOldPrice = arabic && p.oldPriceAr ? p.oldPriceAr : p.oldPrice;

        let priceHtml = displayPrice;
        if (displayOldPrice) {
            priceHtml = `<del style="color:var(--text-muted); font-size:0.8em; margin-right:5px;">${displayOldPrice}</del>${displayPrice}`;
        }

        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.setAttribute('data-brand', p.brand);
        card.setAttribute('data-price', p.price);
        card.setAttribute('data-price-ar', p.priceAr || p.price);
        if (p.oldPrice) card.setAttribute('data-old-price', p.oldPrice);
        if (p.oldPriceAr) card.setAttribute('data-old-price-ar', p.oldPriceAr);
        if (p.isSale) card.setAttribute('data-sale', 'true');

        card.innerHTML = `
            ${badgeHtml}
            <div class="product-image-wrapper">
                <img src="assets/images/${p.image}" alt="${p.name}">
                <button class="quick-view-btn">Quick View</button>
            </div>
            <div class="product-info">
                <p class="brand">${p.brandName}</p>
                <h3>${p.name}</h3>
                <p class="price">${priceHtml}</p>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Re-render prices when language switches (called from main.js switchLanguage)
function refreshProductPrices() {
    const arabic = isRTL();
    document.querySelectorAll('.product-card').forEach(card => {
        const priceEl = card.querySelector('.price');
        if (!priceEl) return;

        const price    = arabic ? (card.dataset.priceAr    || card.dataset.price)    : card.dataset.price;
        const oldPrice = arabic ? (card.dataset.oldPriceAr || card.dataset.oldPrice) : card.dataset.oldPrice;

        if (oldPrice) {
            priceEl.innerHTML = `<del style="color:var(--text-muted); font-size:0.8em; margin-right:5px;">${oldPrice}</del>${price}`;
        } else {
            priceEl.textContent = price;
        }
    });
}

renderProducts();
