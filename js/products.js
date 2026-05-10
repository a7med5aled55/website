// ─── Product Data ─────────────────────────────────────────────────────────────
const productsData = [
    // ── Sneakers ──────────────────────────────────────────────────────────────
    {
        id: 'sn01', brand: 'sneakers', isSale: true,
        badge: 'خصم 15%', badgeStyle: 'background:#e53935;',
        stock: 'Only 2 Left!', stockClass: 'stock-low',
        name: 'Neon X Genesis', brandName: 'Nike',
        price: 1490, oldPrice: 1750,
        image: 'sneaker_nike.png',
        colors: [
            { hex: '#f5f5f5', img: 'sneaker_nike.png',   label: 'White' },
            { hex: '#111',    img: 'hero_sneaker.png',    label: 'Black/Orange' },
            { hex: '#1a237e', img: 'sneaker_adidas.png',  label: 'Navy' }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'sn02', brand: 'sneakers', isSale: true,
        badge: 'خصم 20%', badgeStyle: 'background:#e53935;',
        stock: 'Trending 🔥', stockClass: 'stock-trending',
        name: 'Crimson Runner 2.0', brandName: 'Adidas',
        price: 1250, oldPrice: 1560,
        image: 'sneaker_adidas.png',
        colors: [
            { hex: '#757575', img: 'sneaker_adidas.png', label: 'Grey' },
            { hex: '#f5f5f5', img: 'sneaker_puma.png',   label: 'White' },
            { hex: '#ff6b00', img: 'hero_sneaker.png',    label: 'Orange' }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sn03', brand: 'sneakers', isSale: false,
        stock: 'Trending 🔥', stockClass: 'stock-trending',
        name: 'Ice Drift', brandName: 'Puma',
        price: 1350,
        image: 'sneaker_puma.png',
        colors: [
            { hex: '#f5f5f5', img: 'sneaker_puma.png',   label: 'White' },
            { hex: '#9e9e9e', img: 'sneaker_adidas.png',  label: 'Grey' }
        ],
        sizes: [39,40,41,42,43,44]
    },
    {
        id: 'sn04', brand: 'sneakers', isSale: false,
        name: 'Electric Orange Pro', brandName: 'Nike',
        price: 1750,
        image: 'hero_sneaker.png',
        colors: [
            { hex: '#ff6b00', img: 'hero_sneaker.png',  label: 'Orange' },
            { hex: '#111',    img: 'sneaker_nike.png',   label: 'Black' }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    // ── Casual ────────────────────────────────────────────────────────────────
    {
        id: 'ca01', brand: 'casual', isSale: false,
        name: 'Suede Slip-On', brandName: 'KOTCHI',
        price: 1200, image: 'casual_1.png',
        colors: [
            { hex: '#d7ccc8', img: 'casual_1.png', label: 'Beige' },
            { hex: '#f5f5f5', img: 'casual_2.png', label: 'White' }
        ],
        sizes: [39,40,41,42,43,44]
    },
    {
        id: 'ca02', brand: 'casual', isSale: false,
        stock: 'Only 3 Left!', stockClass: 'stock-low',
        name: 'White Minimalist', brandName: 'KOTCHI',
        price: 1380, image: 'casual_2.png',
        colors: [
            { hex: '#f5f5f5', img: 'casual_2.png', label: 'White' },
            { hex: '#d7ccc8', img: 'casual_1.png', label: 'Beige' },
            { hex: '#a1887f', img: 'casual_3.png', label: 'Tan'   }
        ],
        sizes: [40,41,42,43,44,45]
    },
    {
        id: 'ca03', brand: 'casual', isSale: false,
        name: 'Tan Desert Boot', brandName: 'KOTCHI',
        price: 1450, image: 'casual_3.png',
        colors: [
            { hex: '#a1887f', img: 'casual_3.png', label: 'Tan'  },
            { hex: '#757575', img: 'casual_4.png', label: 'Grey' }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'ca04', brand: 'casual', isSale: false,
        name: 'Grey Knit Walker', brandName: 'KOTCHI',
        price: 1290, image: 'casual_4.png',
        colors: [
            { hex: '#757575', img: 'casual_4.png', label: 'Grey' },
            { hex: '#a1887f', img: 'casual_3.png', label: 'Tan'  }
        ],
        sizes: [40,41,42,43,44]
    },
    // ── Sport ─────────────────────────────────────────────────────────────────
    {
        id: 'sp01', brand: 'sport', isSale: false,
        stock: 'Trending 🔥', stockClass: 'stock-trending',
        name: 'Neon Velocity', brandName: 'KOTCHI Performance',
        price: 1650, image: 'sport_1.png',
        colors: [
            { hex: '#00e676', img: 'sport_1.png', label: 'Neon'  },
            { hex: '#111',    img: 'sport_2.png', label: 'Black' }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sp02', brand: 'sport', isSale: false,
        name: 'Alpha Trainer', brandName: 'KOTCHI Performance',
        price: 1480, image: 'sport_2.png',
        colors: [
            { hex: '#111',    img: 'sport_2.png', label: 'Black' },
            { hex: '#00e676', img: 'sport_1.png', label: 'Neon'  }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'sp03', brand: 'sport', isSale: false,
        stock: 'Only 2 Left!', stockClass: 'stock-low',
        name: 'Marathon Elite', brandName: 'KOTCHI Performance',
        price: 1800, image: 'sport_3.png',
        colors: [
            { hex: '#e53935', img: 'sport_3.png', label: 'Red'   },
            { hex: '#f5f5f5', img: 'sport_4.png', label: 'White' }
        ],
        sizes: [40,41,42,43,44,45,46]
    },
    {
        id: 'sp04', brand: 'sport', isSale: false,
        name: 'Stealth Carbon', brandName: 'KOTCHI Performance',
        price: 1950, image: 'sport_4.png',
        colors: [
            { hex: '#f5f5f5', img: 'sport_4.png', label: 'White' },
            { hex: '#e53935', img: 'sport_3.png', label: 'Red'   }
        ],
        sizes: [41,42,43,44,45,46]
    },
    // ── Classic ───────────────────────────────────────────────────────────────
    {
        id: 'cl01', brand: 'classic', isSale: false,
        stock: 'Trending 🔥', stockClass: 'stock-trending',
        name: 'Onyx Black Leather', brandName: 'Kotchi Heritage',
        price: 1850, image: 'classic_black.png',
        colors: [
            { hex: '#111',    img: 'classic_black.png', label: 'Black' },
            { hex: '#1a237e', img: 'classic_navy.png',  label: 'Navy'  },
            { hex: '#757575', img: 'classic_grey.png',  label: 'Grey'  }
        ],
        sizes: [39,40,41,42,43,44,45,46]
    },
    {
        id: 'cl02', brand: 'classic', isSale: false,
        name: 'Classic Tan Leather', brandName: 'Kotchi Heritage',
        price: 1750, image: 'classic_tan.png',
        colors: [
            { hex: '#a1887f', img: 'classic_tan.png',           label: 'Tan'     },
            { hex: '#6d1f2a', img: 'classic_burgundy_clean.png', label: 'Burgundy'}
        ],
        sizes: [40,41,42,43,44,45]
    },
    {
        id: 'cl03', brand: 'classic', isSale: false,
        name: 'Midnight Navy Suede', brandName: 'Kotchi Heritage',
        price: 1620, image: 'classic_navy.png',
        colors: [
            { hex: '#1a237e', img: 'classic_navy.png',  label: 'Navy'  },
            { hex: '#111',    img: 'classic_black.png', label: 'Black' }
        ],
        sizes: [39,40,41,42,43,44,45]
    },
    {
        id: 'cl04', brand: 'classic', isSale: false,
        stock: 'Only 4 Left!', stockClass: 'stock-low',
        name: 'Slate Grey Leather', brandName: 'Kotchi Heritage',
        price: 1690, image: 'classic_grey.png',
        colors: [
            { hex: '#757575', img: 'classic_grey.png', label: 'Grey' },
            { hex: '#a1887f', img: 'classic_tan.png',  label: 'Tan'  }
        ],
        sizes: [40,41,42,43,44,45,46]
    }
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isRTL()        { return document.documentElement.classList.contains('rtl-mode'); }
function formatPrice(n) { return n.toLocaleString('en-EG') + ' EGP'; }
function formatPriceAr(n){ return n.toLocaleString('ar-EG') + ' ج.م'; }

// ─── Build a single product card ──────────────────────────────────────────────
function buildCard(p) {
    const arabic = isRTL();
    const displayPrice    = arabic ? formatPriceAr(p.price)    : formatPrice(p.price);
    const displayOldPrice = p.oldPrice ? (arabic ? formatPriceAr(p.oldPrice) : formatPrice(p.oldPrice)) : null;

    const badgeHtml = p.badge
        ? `<div class="badge badge-limited" style="${p.badgeStyle || ''}">${p.badge}</div>` : '';
    const stockHtml = p.stock
        ? `<div class="stock-badge ${p.stockClass || ''}">${p.stock}</div>` : '';
    const priceHtml = displayOldPrice
        ? `<del class="old-price">${displayOldPrice}</del> ${displayPrice}`
        : displayPrice;

    // Color swatches (click-only — no hover image swap)
    const swatchHtml = (p.colors || []).map((c, i) =>
        `<button class="card-swatch${i === 0 ? ' active' : ''}"
            data-img="assets/images/${c.img}"
            style="background:${c.hex};"
            title="${c.label}"
            aria-label="${c.label}"></button>`
    ).join('');

    // Hover size strip
    const sizesHtml = (p.sizes || []).map(s =>
        `<button class="card-size-btn">${s}</button>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'product-card slider-card';
    card.dataset.brand    = p.brand;
    card.dataset.id       = p.id;
    card.dataset.priceNum = p.price;
    card.dataset.name     = p.name;
    if (p.isSale) card.dataset.sale = 'true';

    card.innerHTML = `
        ${badgeHtml}
        ${stockHtml}
        <div class="product-image-wrapper">
            <img class="card-main-img"
                 src="assets/images/${p.image}"
                 data-default="assets/images/${p.image}"
                 alt="${p.name}" loading="lazy">
            <div class="card-hover-overlay">
                <div class="card-sizes-strip">${sizesHtml}</div>
                <button class="quick-view-btn">Quick View</button>
            </div>
        </div>
        <div class="product-info">
            <p class="brand">${p.brandName}</p>
            <h3>${p.name}</h3>
            <div class="card-swatches">${swatchHtml}</div>
            <p class="price">${priceHtml}</p>
        </div>`;

    // ── Swatch click → swap image (NOT on hover) ──────────────────────────
    card.querySelectorAll('.card-swatch').forEach(sw => {
        sw.addEventListener('click', e => {
            e.stopPropagation();
            card.querySelectorAll('.card-swatch').forEach(s => s.classList.remove('active'));
            sw.classList.add('active');
            const img = card.querySelector('.card-main-img');
            img.src = sw.dataset.img;
            img.dataset.default = sw.dataset.img; // keep in sync
        });
    });

    // ── Size strip selection ──────────────────────────────────────────────
    card.querySelectorAll('.card-size-btn').forEach(sb => {
        sb.addEventListener('click', e => {
            e.stopPropagation();
            card.querySelectorAll('.card-size-btn').forEach(s => s.classList.remove('active'));
            sb.classList.add('active');
        });
    });

    return card;
}

// ─── Render into slider tracks ────────────────────────────────────────────────
function renderProducts() {
    const categories = ['sneakers', 'casual', 'sport', 'classic'];
    categories.forEach(cat => {
        const track = document.getElementById(`track-${cat}`);
        if (!track) return;
        track.innerHTML = '';
        productsData
            .filter(p => p.brand === cat)
            .forEach(p => track.appendChild(buildCard(p)));
    });
}

// ─── Price refresh on language switch ────────────────────────────────────────
function refreshProductPrices() {
    const arabic = isRTL();
    document.querySelectorAll('.product-card').forEach(card => {
        const priceEl = card.querySelector('.price');
        const p       = productsData.find(x => x.id === card.dataset.id);
        if (!priceEl || !p) return;
        const displayPrice    = arabic ? formatPriceAr(p.price)    : formatPrice(p.price);
        const displayOldPrice = p.oldPrice ? (arabic ? formatPriceAr(p.oldPrice) : formatPrice(p.oldPrice)) : null;
        priceEl.innerHTML = displayOldPrice
            ? `<del class="old-price">${displayOldPrice}</del> ${displayPrice}`
            : displayPrice;
    });
}

renderProducts();
