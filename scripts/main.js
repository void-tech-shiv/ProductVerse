// Main JavaScript file to initialize and display products

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Create sample products using our classes
    const products = [
        new Electronics(1, 'Smartphone X', 699.99, 'Latest smartphone with amazing features', 'TechBrand', 2),
        new Electronics(2, 'Wireless Headphones', 199.99, 'Noise-cancelling wireless headphones', 'SoundMax', 1),
        new Clothing(3, 'Casual T-Shirt', 29.99, 'Comfortable cotton t-shirt', 'M', 'Blue', 'Cotton'),
        new Clothing(4, 'Designer Jeans', 79.99, 'Stylish slim fit jeans', '32', 'Dark Blue', 'Denim'),
        new Book(5, 'JavaScript Guide', 39.99, 'Complete guide to modern JavaScript', 'John Developer', 'Programming', 450),
        new Book(6, 'CSS Mastery', 45.99, 'Advanced CSS techniques and tips', 'Style Master', 'Web Design', 380)
    ];

    // Get the product container
    const productContainer = document.getElementById('productContainer');

    // Display products
    products.forEach(product => {
        const productElement = createProductCard(product);
        productContainer.appendChild(productElement);
    });

    // Set up theme switching
    setupThemeSwitching();
});

// Function to create product card HTML
function createProductCard(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-card';

    // Product image placeholder
    const imageDiv = document.createElement('div');
    imageDiv.className = 'product-image';
    
    // Create an svg element for the image
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("viewBox", "0 0 300 200");
    svgEl.setAttribute("preserveAspectRatio", "xMidYMid slice");
    
    // Create background rectangle
    const bgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    bgRect.setAttribute("width", "100%");
    bgRect.setAttribute("height", "100%");
    
    // Set different colors based on product type
    let bgColor, textColor, iconText;
    if (product instanceof Electronics) {
        bgColor = "#3498db";
        textColor = "#ffffff";
        iconText = "📱";
    } else if (product instanceof Clothing) {
        bgColor = "#2ecc71";
        textColor = "#ffffff";
        iconText = "👕";
    } else if (product instanceof Book) {
        bgColor = "#e74c3c";
        textColor = "#ffffff";
        iconText = "📚";
    } else {
        bgColor = "#95a5a6";
        textColor = "#ffffff";
        iconText = "📦";
    }
    
    bgRect.setAttribute("fill", bgColor);
    
    // Create text element
    const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textEl.setAttribute("x", "50%");
    textEl.setAttribute("y", "50%");
    textEl.setAttribute("text-anchor", "middle");
    textEl.setAttribute("dominant-baseline", "middle");
    textEl.setAttribute("font-family", "Arial, sans-serif");
    textEl.setAttribute("font-size", "40");
    textEl.setAttribute("fill", textColor);
    textEl.textContent = iconText;
    
    // Create product name text
    const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
    nameText.setAttribute("x", "50%");
    nameText.setAttribute("y", "75%");
    nameText.setAttribute("text-anchor", "middle");
    nameText.setAttribute("dominant-baseline", "middle");
    nameText.setAttribute("font-family", "Arial, sans-serif");
    nameText.setAttribute("font-size", "16");
    nameText.setAttribute("fill", textColor);
    nameText.textContent = product.name;
    
    svgEl.appendChild(bgRect);
    svgEl.appendChild(textEl);
    svgEl.appendChild(nameText);
    imageDiv.appendChild(svgEl);

    // Product info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-info';

    const nameEl = document.createElement('h3');
    nameEl.textContent = product.name;

    const priceEl = document.createElement('div');
    priceEl.className = 'product-price';
    priceEl.textContent = `$${product.price.toFixed(2)}`;

    const descEl = document.createElement('div');
    descEl.className = 'product-description';
    descEl.textContent = product.description;

    const detailsEl = document.createElement('div');
    detailsEl.className = 'product-details';
    
    // Show different details based on product type
    if (product instanceof Electronics) {
        detailsEl.textContent = product.getTechSpecs();
    } else if (product instanceof Clothing) {
        detailsEl.textContent = product.getSizeInfo();
    } else if (product instanceof Book) {
        detailsEl.textContent = product.getBookInfo();
    } else {
        detailsEl.textContent = 'Standard product';
    }

    // Append info elements
    infoDiv.appendChild(nameEl);
    infoDiv.appendChild(priceEl);
    infoDiv.appendChild(descEl);
    infoDiv.appendChild(detailsEl);

    // Product actions
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'product-actions';

    const cartBtn = document.createElement('button');
    cartBtn.className = 'add-to-cart';
    cartBtn.textContent = 'Add to Cart';
    cartBtn.addEventListener('click', () => {
        alert(`Added ${product.name} to cart!`);
    });

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'view-details';
    detailsBtn.textContent = 'View Details';
    detailsBtn.addEventListener('click', () => {
        alert(`Product Details:\n${product.display()}`);
    });

    actionsDiv.appendChild(cartBtn);
    actionsDiv.appendChild(detailsBtn);

    // Assemble the product card
    productDiv.appendChild(imageDiv);
    productDiv.appendChild(infoDiv);
    productDiv.appendChild(actionsDiv);

    return productDiv;
}

// Function to set up theme switching
function setupThemeSwitching() {
    const lightThemeBtn = document.getElementById('lightTheme');
    const darkThemeBtn = document.getElementById('darkTheme');

    lightThemeBtn.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 'light');
    });

    darkThemeBtn.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 'dark');
    });
}