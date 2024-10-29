// Get DOM elements
let checkoutData = document.querySelector('[checkout-data]');
let itemCheck = JSON.parse(localStorage.getItem('cart')) || [];

function displayItems() {
    checkoutData.innerHTML = "";
    let total = 0;
    
    try {
        if (!itemCheck || itemCheck.length === 0) {
            checkoutData.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">Your cart is empty</td>
                </tr>`;
            document.getElementById('total').innerText = 'R0';
            return;
        }

        itemCheck.forEach((purchase, i) => {
            const itemTotal = parseFloat(purchase.price) * parseFloat(purchase.quantity || 0);
            checkoutData.innerHTML += `
                <tr>
                    <td>${purchase.make}</td>
                    <td>${purchase.type}</td>
                    <td>
                        <div class="quantity-control">
                            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${i}, -1)">-</button>
                            <input type="number" 
                                   class="quantity-input" 
                                   min="1" 
                                   value="${purchase.quantity || 1}"
                                   data-index="${i}"
                                   onchange="handleQuantityChange(event, ${i})">
                            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${i}, 1)">+</button>
                        </div>
                    </td>
                    <td>R${Intl.NumberFormat().format(purchase.price)}</td>
                    <td>R${Intl.NumberFormat().format(itemTotal)}</td>
                </tr>
            `;
            total += itemTotal;
        });

        document.getElementById('total').innerText = `R${Intl.NumberFormat().format(total)}`;
    } catch (error) {
        console.error('Error displaying cart:', error);
        checkoutData.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error loading cart data. Please try clearing your cart.
                </td>
            </tr>`;
    }
}

function updateQuantity(index, change) {
    if (itemCheck[index]) {
        const newQuantity = (parseInt(itemCheck[index].quantity) || 1) + change;
        if (newQuantity >= 1) {
            itemCheck[index].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(itemCheck));
            displayItems();
        }
    }
}

function handleQuantityChange(event, index) {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1 && itemCheck[index]) {
        itemCheck[index].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(itemCheck));
        displayItems();
    }
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        itemCheck = [];
        displayItems();
    }
}

// Payment form handling
function handlePayment(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const card = document.getElementById('card').value;
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basic validation
    if (!name || !card || !expiry || !cvv) {
        alert('Please fill in all payment details');
        return false;
    }
    
    // Simulate payment processing
    try {
        // In a real application, you would send this to a secure payment processor
        alert(`Thank you for your purchase, ${name}! Your order has been processed.`);
        
        // Clear the cart after successful payment
        localStorage.removeItem('cart');
        itemCheck = [];
        displayItems();
        
        // Reset the form
        document.getElementById('payment-form').reset();
        
        return false; // Prevent form submission
    } catch (error) {
        console.error('Payment error:', error);
        alert('There was an error processing your payment. Please try again.');
        return false;
    }
}

// Add event listeners
document.querySelector('[clear-items]').addEventListener('click', clearCart);

// Format expiry date input
document.getElementById('expiry')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Initialize the page
displayItems();