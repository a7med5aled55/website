const fs = require('fs');
const htmlPath = 'index.html';

let html = fs.readFileSync(htmlPath, 'utf8');

// Update image paths
html = html.replace(/src="([a-zA-Z0-9_-]+\.(?:png|jpg|svg))"/g, 'src="assets/images/$1"');

// Update classic burgundy clean specifically
html = html.replace(/src="classic_burgundy_clean\.png"/g, 'src="assets/images/classic_burgundy_clean.png"');
html = html.replace(/src="assets\/images\/assets\/images\//g, 'src="assets/images/');

fs.writeFileSync(htmlPath, html);
console.log("HTML image paths updated.");

const products = [
    { brand: "sneakers", isSale: true, badge: "Sale -15%", badgeClass: "badge-limited", badgeStyle: "background: red;", image: "sneaker_nike.png", name: "Neon X Genesis", brandName: "Nike", price: "$250", oldPrice: "$295" },
    { brand: "sneakers", isSale: true, badge: "Sale -20%", badgeClass: "badge-bestseller", badgeStyle: "background: red;", image: "sneaker_adidas.png", name: "Crimson Runner 2.0", brandName: "Adidas", price: "$220", oldPrice: "$275" },
    { brand: "sneakers", isSale: false, image: "sneaker_puma.png", name: "Ice Drift", brandName: "Puma", price: "$180" },
    { brand: "sneakers", isSale: false, image: "hero_sneaker.png", name: "Electric Orange Pro", brandName: "Nike", price: "$290" },
    { brand: "casual", isSale: false, image: "casual_1.png", name: "Suede Slip-On", brandName: "KOTCHI", price: "$190" },
    { brand: "casual", isSale: false, image: "casual_2.png", name: "White Minimalist", brandName: "KOTCHI", price: "$210" },
    { brand: "casual", isSale: false, image: "casual_3.png", name: "Tan Desert Boot", brandName: "KOTCHI", price: "$230" },
    { brand: "casual", isSale: false, image: "casual_4.png", name: "Grey Knit Walker", brandName: "KOTCHI", price: "$160" },
    { brand: "sport", isSale: false, image: "sport_1.png", name: "Neon Velocity", brandName: "KOTCHI Performance", price: "$240" },
    { brand: "sport", isSale: false, image: "sport_2.png", name: "Alpha Trainer", brandName: "KOTCHI Performance", price: "$200" },
    { brand: "sport", isSale: false, image: "sport_3.png", name: "Marathon Elite", brandName: "KOTCHI Performance", price: "$260" },
    { brand: "sport", isSale: false, image: "sport_4.png", name: "Stealth Carbon", brandName: "KOTCHI Performance", price: "$310" },
    { brand: "classic", isSale: false, image: "classic_black.png", name: "Onyx Black Leather", brandName: "Kotchi Heritage", price: "$350" },
    { brand: "classic", isSale: false, image: "classic_tan.png", name: "Classic Tan Leather", brandName: "Kotchi Heritage", price: "$350" },
    { brand: "classic", isSale: false, image: "classic_navy.png", name: "Midnight Navy Suede", brandName: "Kotchi Heritage", price: "$320" },
    { brand: "classic", isSale: false, image: "classic_grey.png", name: "Slate Grey Leather", brandName: "Kotchi Heritage", price: "$340" }
];

const jsCode = `const productsData = ${JSON.stringify(products, null, 4)};

function renderProducts() {
    const grid = document.getElementById('product-grid-container');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    productsData.forEach(p => {
        let badgeHtml = '';
        if (p.badge) {
            badgeHtml = \`<div class="badge \${p.badgeClass}" style="\${p.badgeStyle}">\${p.badge}</div>\`;
        }
        
        let priceHtml = \`\${p.price}\`;
        if (p.oldPrice) {
            priceHtml = \`<del style="color:var(--text-muted); font-size:0.8em; margin-right:5px;">\${p.oldPrice}</del>\${p.price}\`;
        }
        
        const card = document.createElement('div');
        card.className = 'product-card reveal';
        card.setAttribute('data-brand', p.brand);
        if (p.isSale) {
            card.setAttribute('data-sale', 'true');
        }
        
        card.innerHTML = \`
            \${badgeHtml}
            <div class="product-image-wrapper">
                <img src="assets/images/\${p.image}" alt="\${p.name}">
                <button class="quick-view-btn">Quick View</button>
            </div>
            <div class="product-info">
                <p class="brand">\${p.brandName}</p>
                <h3>\${p.name}</h3>
                <p class="price">\${priceHtml}</p>
            </div>
        \`;
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProducts);
`;

fs.writeFileSync('js/products.js', jsCode);
console.log("products.js generated.");
