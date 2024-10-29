// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the search functionality
    const searchInput = document.querySelector('[search-product]');
    const sortButton = document.querySelector('[data-sort]');
    let productsData = []; // Store products data globally

    function fetchProducts() {
        const loading = document.querySelector('#spinner');
        const productContainer = document.querySelector('[data-everyItem]');
        
        // Show loading spinner
        if (loading) {
            loading.style.display = 'block';
        }

        // Fetch products from the correct path (adjust if needed)
        fetch('../products.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                productsData = data; // Store the data globally
                displayProducts(data);
                if (loading) {
                    loading.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Error loading products:', error);
                if (productContainer) {
                    productContainer.innerHTML = `
                        <div class="alert alert-danger" role="alert">
                            Error loading products. Please try again later.
                        </div>`;
                }
                if (loading) {
                    loading.style.display = 'none';
                }
            });
    }

    function displayProducts(products) {
        const productContainer = document.querySelector('[data-everyItem]');
        
        if (!productContainer) {
            console.error('Product container not found');
            return;
        }

        if (!Array.isArray(products) || products.length === 0) {
            productContainer.innerHTML = `
                <div class="alert alert-info" role="alert">
                    No products found
                </div>`;
            return;
        }

        // Clear existing content
        productContainer.innerHTML = '';

        // Create and append product cards
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'card m-4';
            productCard.style.width = '18rem'; // Set a fixed width for better layout

            productCard.innerHTML = `
                <div class="card-header">
                    <h5 class="card-title">${product.type} watches</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">Price: R${product.price.toLocaleString()}</p>
                    <p class="card-text">Make: ${product.make}</p>
                    <p class="card-text">Year: ${product.year}</p>
                    <img src="${product.image}" alt="${product.make} ${product.type} watch" 
                         class="card-img-top mb-3" style="max-height: 200px; object-fit: contain;">
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary w-100" onclick='addToCart(${JSON.stringify(product)})'>
                        ADD TO CART
                    </button>
                </div>
            `;

            productContainer.appendChild(productCard);
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredProducts = productsData.filter(product => 
                product.make.toLowerCase().includes(searchTerm) ||
                product.type.toLowerCase().includes(searchTerm)
            );
            displayProducts(filteredProducts);
        });
    }

    // Sort functionality
    if (sortButton) {
        sortButton.addEventListener('click', () => {
            const sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
            displayProducts(sortedProducts);
        });
    }

    // Initialize the page by fetching products
    fetchProducts();
});

// Global addToCart function - needs to be outside DOMContentLoaded to be accessible
window.addToCart = function(product) {
    try {
        // Get existing cart or initialize empty array
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Check if product already exists in cart
        const existingProductIndex = cart.findIndex(item => 
            item.make === product.make && 
            item.type === product.type
        );
        
        if (existingProductIndex !== -1) {
            // If product exists, increment quantity
            cart[existingProductIndex].quantity += 1;
        } else {
            // If product is new, add it with quantity 1
            product.quantity = 1;
            cart.push(product);
        }
        
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`Added ${product.make} ${product.type} to cart!`);
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Sorry, there was an error adding the item to your cart. Please try again.');
    }
};