document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const tableBody = document.querySelector('[new-data]');
    const addItemBtn = document.querySelector('#newItem');
    const makeInput = document.querySelector('#make');
    const typeInput = document.querySelector('#type');
    const urlInput = document.querySelector('#url');
    const priceInput = document.querySelector('#price');
    const sortBtn = document.querySelector('button:first-of-type');

    let products = [];

    // Fetch products from JSON file
    function fetchProducts() {
        fetch('../products.json')  // Adjust path based on your file structure
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                products = data;
                // Store in localStorage for editing functionality
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts();
            })
            .catch(error => {
                console.error('Error loading products:', error);
                // Try to load from localStorage as fallback
                const storedProducts = localStorage.getItem('products');
                if (storedProducts) {
                    products = JSON.parse(storedProducts);
                    displayProducts();
                }
            });
    }

    // Display products function
    function displayProducts() {
        if (!tableBody) return;
        
        tableBody.innerHTML = '';
        products.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.make}</td>
                <td class='image'>
                    <img src='${product.image}' alt='${product.make}' style='max-width: 100px;'>
                </td>
                <td>${product.type}</td>
                <td>R ${product.price.toLocaleString()}</td>
                <td>
                    <button class='btn btn-warning btn-sm edit-btn' data-index='${index}'>Edit</button>
                    <button class='btn btn-danger btn-sm delete-btn' data-index='${index}'>Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        attachButtonListeners();
    }

    // Attach event listeners to edit and delete buttons
    function attachButtonListeners() {
        // Edit buttons
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                const product = products[index];
                
                makeInput.value = product.make;
                typeInput.value = product.type;
                urlInput.value = product.image;
                priceInput.value = product.price;

                addItemBtn.textContent = 'Update Product';
                addItemBtn.dataset.editIndex = index;
                
                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();
            });
        });

        // Delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                if (confirm('Are you sure you want to delete this product?')) {
                    const index = e.target.dataset.index;
                    products.splice(index, 1);
                    localStorage.setItem('products', JSON.stringify(products));
                    displayProducts();
                }
            });
        });
    }

    // Add/Edit product
    addItemBtn.addEventListener('click', () => {
        const makeValue = makeInput.value.trim();
        const typeValue = typeInput.value.trim();
        const priceValue = parseFloat(priceInput.value);
        const urlValue = urlInput.value.trim();

        if (makeValue && typeValue && !isNaN(priceValue) && urlValue) {
            const productData = {
                id: products.length + 1,
                make: makeValue,
                type: typeValue,
                price: priceValue,
                image: urlValue,
                year: new Date().getFullYear() // Adding current year as default
            };

            const editIndex = addItemBtn.dataset.editIndex;
            
            if (editIndex !== undefined) {
                // Update existing product
                products[editIndex] = {
                    ...products[editIndex],
                    ...productData,
                    id: products[editIndex].id // Preserve original ID
                };
                delete addItemBtn.dataset.editIndex;
                addItemBtn.textContent = 'Save changes';
            } else {
                // Add new product
                products.push(productData);
            }

            // Save to localStorage
            localStorage.setItem('products', JSON.stringify(products));
            displayProducts();

            // Clear form and close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            modal.hide();
            
            // Reset form
            makeInput.value = '';
            typeInput.value = '';
            priceInput.value = '';
            urlInput.value = '';

            alert(editIndex !== undefined ? 'Product updated successfully!' : 'New product added successfully!');
        } else {
            alert('Please fill in all fields correctly!');
        }
    });

    // Sort functionality
    sortBtn.addEventListener('click', () => {
        products.sort((a, b) => a.price - b.price);
        displayProducts();
    });

    // Initial fetch of products
    fetchProducts();
});