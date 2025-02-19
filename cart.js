/* cart.js - Handles cart functionality */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in navbar
function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}

// Function to add an item to the cart
function addToCart(event) {
    let button = event.target;
    let name = button.getAttribute("data-name");
    let price = parseFloat(button.getAttribute("data-price"));
    
    let item = { name, price };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Item added to cart!");
}

// Attach event listeners to all add-to-cart buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
});

// Function to load cart items on cart page
function loadCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    } else {
        cartItemsContainer.innerHTML = "";
        cart.forEach((item, index) => {
            let itemElement = document.createElement("div");
            itemElement.classList.add("d-flex", "justify-content-between", "align-items-center", "border-bottom", "py-2");
            itemElement.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
            totalPrice += item.price;
        });
    }
    document.getElementById("total-price").textContent = totalPrice.toFixed(2);
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Function to proceed to checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Add items before checking out.");
        return;
    }
    alert("Proceeding to checkout...");
    localStorage.removeItem("cart");
    window.location.href = "checkout.html";
}

// Ensure cart count is updated on page load
updateCartCount();

// Load cart if on cart page
if (document.getElementById("cart-items")) {
    loadCart();
}