// Retrieve cart from localStorage or initialize empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to the cart
function addToCart(id, name, price) {
    // Check if the item is already in the cart
    let item = cart.find(item => item.id === id);
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    updateCart();
}

// Function to update cart in localStorage and on the page
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    updateCartCount();
}

// Function to update cart count in the header
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Function to update cart items display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="path/to/image${item.id}.jpg" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button class="btn-secondary" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        document.getElementById('cart-total').textContent = total.toFixed(2);
    }
}

// Function to remove item from the cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Initialize cart display and count on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    updateCartCount();
});
