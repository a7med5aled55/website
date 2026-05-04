// ─── Product Data ────────────────────────────────────────────────────────────
const productsData = [
    // ── Sneakers ──
    {
        id: 'sn01', brand: "sneakers", isSale: true,
        badge: "خصم 15%", badgeClass: "badge-limited", badgeStyle: "background:#e53935;",
        stock: "Only 2 Left!", stockClass: "stock-low",
        name: "Neon X Genesis", brandName: "Nike",
        price: 1490, oldPrice: 1750,
        images: { default: "sneaker_nike.png", hover: "hero_sneaker.png" },
        colors: [
            { label: "White/Orange", hex: "#ff6b00", img: "hero_sneaker.png" },
            { label: "Black",        hex: "#111111", img: "sneaker_nike.png" },
            { label: "Navy",         hex: "#1a237e", img: "sneaker_adidas.png" }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'sn02', brand: "sneakers", isSale: true,
        badge: "خصم 20%", badgeClass: "badge-bestseller", badgeStyle: "background:#e53935;",
        stock: "Trending 🔥", stockClass: "stock-trending",
        name: "Crimson Runner 2.0", brandName: "Adidas",
        price: 1250, oldPrice: 1560,
        images: { default: "sneaker_adidas.png", hover: "sneaker_puma.png" },
        colors: [
            { label: "Grey",   hex: "#757575", img: "sneaker_adidas.png" },
            { label: "White",  hex: "#eeeeee", img: "sneaker_puma.png" },
            { label: "Orange", hex: "#ff6b00", img: "hero_sneaker.png" }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sn03', brand: "sneakers", isSale: false,
        stock: "Trending 🔥", stockClass: "stock-trending",
        name: "Ice Drift", brandName: "Puma",
        price: 1350,
        images: { default: "sneaker_puma.png", hover: "sneaker_adidas.png" },
        colors: [
            { label: "White", hex: "#eeeeee", img: "sneaker_puma.png" },
            { label: "Grey",  hex: "#9e9e9e", img: "sneaker_adidas.png" }
        ],
        sizes: [39,40,41,42,43,44]
    },
    {
        id: 'sn04', brand: "sneakers", isSale: false,
        name: "Electric Orange Pro", brandName: "Nike",
        price: 1750,
        images: { default: "hero_sneaker.png", hover: "sneaker_nike.png" },
        colors: [
            { label: "Orange", hex: "#ff6b00", img: "hero_sneaker.png" },
            { label: "Black",  hex: "#111111", img: "sneaker_nike.png" }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    // ── Casual ──
    {
        id: 'ca01', brand: "casual", isSale: false,
        name: "Suede Slip-On", brandName: "KOTCHI",
        price: 1200,
        images: { default: "casual_1.png", hover: "casual_2.png" },
        colors: [
            { label: "Beige", hex: "#d7ccc8", img: "casual_1.png" },
            { label: "White", hex: "#eeeeee", img: "casual_2.png" }
        ],
        sizes: [39,40,41,42,43,44]
    },
    {
        id: 'ca02', brand: "casual", isSale: false,
        stock: "Only 3 Left!", stockClass: "stock-low",
        name: "White Minimalist", brandName: "KOTCHI",
        price: 1380,
        images: { default: "casual_2.png", hover: "casual_1.png" },
        colors: [
            { label: "White", hex: "#eeeeee", img: "casual_2.png" },
            { label: "Beige", hex: "#d7ccc8", img: "casual_1.png" },
            { label: "Tan",   hex: "#a1887f", img: "casual_3.png" }
        ],
        sizes: [40,41,42,43,44,45]
    },
    {
        id: 'ca03', brand: "casual", isSale: false,
        name: "Tan Desert Boot", brandName: "KOTCHI",
        price: 1450,
        images: { default: "casual_3.png", hover: "casual_4.png" },
        colors: [
            { label: "Tan",  hex: "#a1887f", img: "casual_3.png" },
            { label: "Grey", hex: "#757575", img: "casual_4.png" }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'ca04', brand: "casual", isSale: false,
        name: "Grey Knit Walker", brandName: "KOTCHI",
        price: 1290,
        images: { default: "casual_4.png", hover: "casual_3.png" },
        colors: [
            { label: "Grey", hex: "#757575", img: "casual_4.png" },
            { label: "Tan",  hex: "#a1887f", img: "casual_3.png" }
        ],
        sizes: [40,41,42,43,44]
    },
    // ── Sport ──
    {
        id: 'sp01', brand: "sport", isSale: false,
        stock: "Trending 🔥", stockClass: "stock-trending",
        name: "Neon Velocity", brandName: "KOTCHI Performance",
        price: 1650,
        images: { default: "sport_1.png", hover: "sport_2.png" },
        colors: [
            { label: "Neon",  hex: "#00e676", img: "sport_1.png" },
            { label: "Black", hex: "#111111", img: "sport_2.png" }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sp02', brand: "sport", isSale: false,
        name: "Alpha Trainer", brandName: "KOTCHI Performance",
        price: 1480,
        images: { default: "sport_2.png", hover: "sport_1.png" },
        colors: [
            { label: "Black", hex: "#111111", img: "sport_2.png" },
            { label: "Neon",  hex: "#00e676", img: "sport_1.png" }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'sp03', brand: "sport", isSale: false,
        stock: "Only 2 Left!", stockClass: "stock-low",
        name: "Marathon Elite", brandName: "KOTCHI Performance",
        price: 1800,
        images: { default: "sport_3.png", hover: "sport_4.png" },
        colors: [
            { label: "Red",   hex: "#e53935", img: "sport_3.png" },
            { label: "White", hex: "#eeeeee", img: "sport_4.png" }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sp04', brand: "sport", isSale: false,
        name: "Stealth Carbon", brandName: "KOTCHI Performance",
        price: 1950,
        images: { default: "sport_4.png", hover: "sport_3.png" },
        colors: [
            { label: "White", hex: "#eeeeee", img: "sport_4.png" },
            { label: "Red",   hex: "#e53935", img: "sport_3.png" }
        ],
        sizes: [41,42,43,44,45,46]
    },
    // ── Classic ──
    {
        id: 'cl01', brand: "classic", isSale: false,
        stock: "Trending 🔥", stockClass: "stock-trending",
        name: "Onyx Black Leather", brandName: "Kotchi Heritage",
        price: 1850,
        images: { default: "classic_black.png", hover: "classic_navy.png" },
        colors: [
            { label: "Black", hex: "#111111", img: "classic_black.png" },
            { label: "Navy",  hex: "#1a237e", img: "classic_navy.png" },
            { label: "Grey",  hex: "#757575", img: "classic_grey.png" }
        ],
        sizes: [39,40,41,42,43,44,45,46]
    },
    {
        id: 'cl02', brand: "classic", isSale: false,
        name: "Classic Tan Leather", brandName: "Kotchi Heritage",
        price: 1750,
        images: { default: "classic_tan.png", hover: "classic_burgundy_clean.png" },
        colors: [
            { label: "Tan",     hex: "#a1887f", img: "classic_tan.png" },
            { label: "Burgundy",hex: "#6d1f2a", img: "classic_burgundy_clean.png" }
        ],
        sizes: [40,41,42,43,44,45]
    },
    {
        id: 'cl03', brand: "classic", isSale: false,
        name: "Midnight Navy Suede", brandName: "Kotchi Heritage",
        price: 1620,
        images: { default: "classic_navy.png", hover: "classic_black.png" },
        colors: [
            { label: "Navy",  hex: "#1a237e", img: "classic_navy.png" },
            { label: "Black", hex: "#111111", img: "classic_black.png" }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'cl04', brand: "classic", isSale: false,
        stock: "Only 4 Left!", stockClass: "stock-low",
        name: "Slate Grey Leather", brandName: "Kotchi Heritage",
        price: 1690,
        images: { default: "classic_grey.png", hover: "classic_tan.png" },
        colors: [
            { label: "Grey", hex: "#757575", img: "classic_grey.png" },
            { label: "Tan",  hex: "#a1887f", img: "classic_tan.png" }
        ],
        sizes: [40,41,42,43,44,45,46]
    }
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function isRTL() {
    return document.documentElement.classList.contains('rtl-mode');
}

function formatPrice(num) {
    return num.toLocaleString('en-EG') + ' EGP';
}

function formatPriceAr(num) {
    return num.toLocaleString('ar-EG') + ' ج.م';
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderProducts() {
    const grid = document.getElementById('product-grid-container');
    if (!grid) return;
    grid.innerHTML = '';

    productsData.forEach(p => {
        const arabic = isRTL();

        // Badge
        let badgeHtml = '';
        if (p.badge) badgeHtml = `<div class="badge ${p.badgeClass||''}" style="${p.badgeStyle||''}">${p.badge}</div>`;

        // Stock
        let stockHtml = '';
        if (p.stock) stockHtml = `<div class="stock-badge ${p.stockClass||''}">${p.stock}</div>`;

        // Price
        const displayPrice    = arabic ? formatPriceAr(p.price)    : formatPrice(p.price);
        const displayOldPrice = p.oldPrice ? (arabic ? formatPriceAr(p.oldPrice) : formatPrice(p.oldPrice)) : null;
        let priceHtml = displayPrice;
        if (displayOldPrice) {
            priceHtml = `<del class="old-price">${displayOldPrice}</del> ${displayPrice}`;
        }

        // Color swatches
        const swatchHtml = (p.colors || []).map((c, i) =>
            `<button class="card-swatch${i===0?' active':''}" data-img="assets/images/${c.img}" style="background:${c.hex};" title="${c.label}" aria-label="${c.label}"></button>`
        ).join('');

        // Hover size strip
        const sizesHtml = (p.sizes || []).map(s =>
            `<button class="card-size-btn">${s}</button>`
        ).join('');

        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.setAttribute('data-brand', p.brand);
        card.setAttribute('data-id', p.id);
        card.setAttribute('data-price-num', p.price);
        card.setAttribute('data-name', p.name);
        card.setAttribute('data-brand-name', p.brandName);
        card.setAttribute('data-default-img', `assets/images/${p.images.default}`);
        card.setAttribute('data-hover-img',   `assets/images/${p.images.hover}`);
        if (p.isSale) card.setAttribute('data-sale', 'true');

        card.innerHTML = `
            ${badgeHtml}
            ${stockHtml}
            <div class="product-image-wrapper">
                <img class="card-main-img" src="assets/images/${p.images.default}" alt="${p.name}" loading="lazy">
                <div class="card-hover-overlay">
                    <div class="card-sizes-strip">
                        ${sizesHtml}
                    </div>
                    <button class="quick-view-btn">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <p class="brand">${p.brandName}</p>
                <h3>${p.name}</h3>
                <div class="card-swatches">${swatchHtml}</div>
                <p class="price">${priceHtml}</p>
            </div>
        `;

        // Swatch click → swap image
        card.querySelectorAll('.card-swatch').forEach(sw => {
            sw.addEventListener('click', e => {
                e.stopPropagation();
                card.querySelectorAll('.card-swatch').forEach(s => s.classList.remove('active'));
                sw.classList.add('active');
                const img = card.querySelector('.card-main-img');
                img.src = sw.dataset.img;
                card.setAttribute('data-default-img', sw.dataset.img);
            });
        });

        // Size strip click — select
        card.querySelectorAll('.card-size-btn').forEach(sb => {
            sb.addEventListener('click', e => {
                e.stopPropagation();
                card.querySelectorAll('.card-size-btn').forEach(s => s.classList.remove('active'));
                sb.classList.add('active');
            });
        });

        // Hover image swap (crisp)
        const imgEl = card.querySelector('.card-main-img');
        card.addEventListener('mouseenter', () => {
            imgEl.src = card.getAttribute('data-hover-img');
        });
        card.addEventListener('mouseleave', () => {
            imgEl.src = card.getAttribute('data-default-img');
        });

        grid.appendChild(card);
    });
}

// ─── Price refresh on lang switch ────────────────────────────────────────────
function refreshProductPrices() {
    const arabic = isRTL();
    document.querySelectorAll('.product-card').forEach(card => {
        const priceEl = card.querySelector('.price');
        const num     = parseInt(card.dataset.priceNum, 10);
        if (!priceEl || !num) return;

        const p = productsData.find(x => x.id === card.dataset.id);
        if (!p) return;

        const displayPrice    = arabic ? formatPriceAr(p.price)    : formatPrice(p.price);
        const displayOldPrice = p.oldPrice ? (arabic ? formatPriceAr(p.oldPrice) : formatPrice(p.oldPrice)) : null;

        if (displayOldPrice) {
            priceEl.innerHTML = `<del class="old-price">${displayOldPrice}</del> ${displayPrice}`;
        } else {
            priceEl.textContent = displayPrice;
        }
    });
}

renderProducts();
