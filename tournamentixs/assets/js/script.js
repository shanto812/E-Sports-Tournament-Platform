'use strict';
// Cart array to hold items
let cart = [];

// Elements
const cartButton = document.getElementById('cart-button');
const cartContent = document.getElementById('cart-content');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalElement = document.getElementById('cart-total');
const itemCountElement = document.getElementById('item-count');
const checkoutButton = document.getElementById('checkout-btn');
const resetCartButton = document.getElementById('reset-cart-btn');

// Function to add an item to the cart
function addToCart(item) {
  const existingItem = cart.find(cartItem => cartItem.name === item.name);

  if (existingItem) {
    existingItem.quantity += 1;  // Increase quantity if the item already exists
  } else {
    cart.push({ ...item, quantity: 1 });  // Add new item to the cart
  }

  updateCartUI();
}

// Function to update the cart UI inside the button
function updateCartUI() {
  itemCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

  let total = 0;
  cartItemsContainer.innerHTML = ""; // Clear cart items container
  
  cart.forEach(item => {
    total += item.quantity * item.price;

    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Toggle visibility of the cart content when clicking the cart button
cartButton.addEventListener("click", () => {
  cartContent.classList.toggle("show");
});

// Close the cart when the close button is clicked
closeCartButton.addEventListener("click", () => {
  cartContent.classList.remove("show");
});

// Event listener for adding items to the cart (for each "Add to Cart" button)
document.querySelectorAll(".btn-primary").forEach(button => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".gears-card");

    const item = {
      name: card.querySelector(".card-title").textContent.trim(),
      price: parseFloat(card.querySelector(".card-prize").textContent.trim().replace("$", "")),
      image: card.querySelector("img").src,
    };

    addToCart(item);  // Add the item to the cart
  });
});

// Reset Cart
resetCartButton.addEventListener("click", () => {
  cart = [];  // Empty the cart array
  updateCartUI();  // Update the UI
  cartContent.classList.remove("show");  // Close the cart content
});

// Checkout (Placeholder function)
checkoutButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items before checking out.");
  } else {
    alert("Proceeding to checkout...");
    // Here, you can implement the checkout functionality (e.g., payment gateway).
  }
});


/**
 * element toggle function
 */

const elemToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Get the buttons and tournament options
const pcTournamentBtn = document.getElementById("pc-tournament-btn");
const phoneTournamentBtn = document.getElementById("phone-tournament-btn");
const tournamentOptions = document.getElementById("tournament-options");

// Function to toggle the visibility of the tournament options
function toggleTournamentOptions() {
  if (tournamentOptions.style.display === "flex") {
    tournamentOptions.style.display = "none"; // Hide options if they are currently visible
  } else {
    tournamentOptions.style.display = "flex"; // Show options if they are currently hidden
    tournamentOptions.style.animation = "none"; // Reset animation to prevent it from playing again
    tournamentOptions.offsetHeight; // Trigger a reflow to restart the animation
    tournamentOptions.style.animation = "showOptions 0.5s ease-out forwards"; // Reapply animation
  }
}

// Function to navigate to a page
function navigateTo(page) {
  window.location.href = page;
}

// Ensure buttons' active states are reset on page reload
window.addEventListener('load', () => {
  // Reset tournament options display on page load
  tournamentOptions.style.display = "none"; // Ensure options are hidden on page load
  
  // Optionally reset the buttons' "active" states (if necessary)
  if (pcTournamentBtn.classList.contains("active")) {
    pcTournamentBtn.classList.remove("active");
  }
  if (phoneTournamentBtn.classList.contains("active")) {
    phoneTournamentBtn.classList.remove("active");
  }
});


// Add event listeners to toggle options on button click
pcTournamentBtn.addEventListener("click", toggleTournamentOptions);
phoneTournamentBtn.addEventListener("click", toggleTournamentOptions);

/**
 * navbar variables
 */

const navbar = document.querySelector("[data-nav]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

for (let i = 0; i < navElemArr.length; i++) {

  navElemArr[i].addEventListener("click", function () {
    elemToggleFunc(navbar);
    elemToggleFunc(overlay);
    elemToggleFunc(document.body);
  })

}
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  function changeSlide() {
    // Remove the active class from the current item
    items[currentIndex].classList.remove('active');

    // Move to the next slide
    currentIndex = (currentIndex + 1) % items.length;

    // Add the active class to the next item
    items[currentIndex].classList.add('active');
  }

  // Start the slideshow
  items[currentIndex].classList.add('active');
  setInterval(changeSlide, 3000); // Change every 3 seconds
});

/**
 * history turnament
 */
document.getElementById("view-all-btn").addEventListener("click", function () {
  const additionalSections = document.getElementById("additional-sections");
  additionalSections.classList.toggle("hidden");

  // Update button text
  if (additionalSections.classList.contains("hidden")) {
    this.textContent = "View All Teams";
  } else {
    this.textContent = "Show Less";
  }
});
// Example: Toggle event details visibility on click
document.querySelectorAll('.event-card').forEach(card => {
  const details = card.querySelector('.event-details');
  // Initially hide the event details if not already hidden
  details.style.display = 'none';

  // Event listener to toggle the details visibility when clicked
  card.addEventListener('click', () => {
    details.style.display = details.style.display === 'none' ? 'block' : 'none';
  });
});

// Function to toggle between PC and Phone options
function toggleOptions(type) {
  const pcOptions = document.getElementById("pc-options");
  const phoneOptions = document.getElementById("phone-options");

  if (type === "pc") {
    pcOptions.classList.remove("hidden");
    phoneOptions.classList.add("hidden");
  } else if (type === "phone") {
    phoneOptions.classList.remove("hidden");
    pcOptions.classList.add("hidden");
  }
}

// Ensure the correct option is displayed on page load
window.addEventListener('load', () => {
  const selectedOption = localStorage.getItem("selectedOption");

  const pcOptions = document.getElementById("pc-options");
  const phoneOptions = document.getElementById("phone-options");

  // Default to 'pc' if no option is selected
  if (selectedOption === "pc") {
    pcOptions.classList.remove("hidden");
    phoneOptions.classList.add("hidden");
  } else if (selectedOption === "phone") {
    phoneOptions.classList.remove("hidden");
    pcOptions.classList.add("hidden");
  } else {
    // Default state on page load if no selection is saved
    pcOptions.classList.remove("hidden");
    phoneOptions.classList.add("hidden");
  }

  // Check if any event cards should have their details shown or hidden
  document.querySelectorAll('.event-card').forEach(card => {
    const eventDetails = card.querySelector('.event-details');
    // By default, ensure event details are hidden (in case of reload)
    eventDetails.style.display = 'none';
  });
});



/**
 * go top
 */

const goTopButton = document.querySelector('.go-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    goTopButton.classList.add('active');
  } else {
    goTopButton.classList.remove('active');
  }
});
function openTopupForm(gameName) {
  document.getElementById('topup-modal').style.display = 'flex';
  document.getElementById('game-title').textContent = `Top Up - ${gameName}`;
}

function closeTopupForm() {
  document.getElementById('topup-modal').style.display = 'none';
}

document.getElementById('topup-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form from refreshing the page

  const playerId = document.getElementById('player-id').value;
  const diamondPrice = document.getElementById('diamond-price').value;
  const paymentMethod = document.getElementById('payment-method').value;

  alert(`Player ID: ${playerId}\nDiamonds: ${diamondPrice}\nPayment: ${paymentMethod}\nYour order is being processed!`);
  closeTopupForm();
});

