document.addEventListener('DOMContentLoaded', () => {
    // Set the current year in the footer (if you have an element with id 'footEdit')
    document.querySelector('#footEdit').innerText = new Date().getUTCFullYear();

    function fetchProducts() {
        const loading = document.querySelector('#spinner');
        loading.classList.remove('d-none'); // Show the spinner before fetching
        
        // Fetching products.json from the correct path
        fetch('../products.json') // Ensure this path is correct
            .then(response => {
                console.log('Response status:', response.status); // Log response status
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Parse JSON if response is OK
            })
            .then(data => {
                console.log('Fetched data:', data); // Log fetched data
                displayProducts(data);  
                loading.classList.add('d-none'); // Hide spinner after products are displayed
            })
            .catch(error => {
                console.error('Error loading products', error);
                loading.classList.add('d-none'); // Hide spinner on error
            });
    }

    function displayProducts(products) {
        const allProducts = document.querySelector("[data-everyItem]");

        // Check if products array is valid
        if (Array.isArray(products) && products.length > 0) {
            allProducts.innerHTML = ""; // Clear existing products
            products.forEach(product => {
                allProducts.innerHTML +=
                    `<div class="card m-4">
                        <div class="card-header">
                            <h5>${product.type} watches</h5>
                        </div>
                        <div class="card-body">
                            <p class="card-text">Price: R${product.price}</p>
                            <p>Make: ${product.make}</p>
                            <img src="${product.image}" alt="${product.type} watch" loading="lazy" class="card-img">
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-primary" onclick='cartItems(${JSON.stringify(product)})' data-cart>ADD TO CART</button>
                        </div>
                    </div>`;
            });
        } else {
            allProducts.innerHTML = `<h1>No products found</h1>`; // Display message if no products
        }
    }

    fetchProducts(); // Initiate product fetching
});
