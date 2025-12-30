// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n =>
    n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    })
);

// Menu Data - DUNYA Restaurant Menu
const menuItems = [
    // Shawarma Station
    {
        id: 1,
        name: 'Beef Shawarma',
        description: 'Fresh marinated beef shawarma, slow-roasted to perfection',
        price: '$9.9',
        category: 'shawarma',
        tags: [],
        icon: '🥩'
    },
    {
        id: 2,
        name: 'Chicken Shawarma',
        description: 'Tender marinated chicken shawarma with authentic Lebanese spices',
        price: '$8.9',
        category: 'shawarma',
        tags: [],
        icon: '🍗'
    },
    // Falafel Station
    {
        id: 3,
        name: 'Falafel Sandwich',
        description: 'Crispy falafel wrapped in pita with tahini, fresh vegetables, and pickles',
        price: '$7.9',
        category: 'falafel',
        tags: ['vegetarian'],
        icon: '🌯'
    },
    {
        id: 4,
        name: 'Falafel Plate',
        description: 'Falafel served with hummus, tahini, fresh salad, and warm pita bread',
        price: '$8',
        category: 'falafel',
        tags: ['vegetarian', 'gluten-free'],
        icon: '🍽️'
    },
    {
        id: 5,
        name: 'Falafel Piece',
        description: 'Single crispy falafel piece, freshly made and perfectly seasoned',
        price: '$1',
        category: 'falafel',
        tags: ['vegetarian', 'gluten-free'],
        icon: '🥙'
    },
    // Sides Station
    {
        id: 6,
        name: 'Fattouch Salad',
        description: 'Fresh Lebanese salad with crispy pita chips, vegetables, and sumac dressing',
        price: '$3',
        category: 'sides',
        tags: ['vegetarian', 'gluten-free'],
        icon: '🥗'
    },
    {
        id: 7,
        name: 'Fries',
        description: 'Crispy golden fries, perfectly seasoned',
        price: '$3',
        category: 'sides',
        tags: ['vegetarian', 'gluten-free'],
        icon: '🍟'
    },
    // Drinks Station
    {
        id: 8,
        name: 'Homemade Ice Tea',
        description: 'Refreshing homemade Lebanese-style iced tea',
        price: '$3',
        category: 'drinks',
        tags: ['vegetarian'],
        icon: '🧊'
    },
    {
        id: 9,
        name: 'Sodas',
        description: 'Assorted soft drinks and sodas',
        price: '$2',
        category: 'drinks',
        tags: ['vegetarian'],
        icon: '🥤'
    }
];

// Initialize menu
let currentCategory = 'all';
let activeFilters = [];
let cart = []; // Shopping cart array

// Render menu items
function renderMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = menuItems.filter(item => {
        const categoryMatch = currentCategory === 'all' || item.category === currentCategory;
        const filterMatch =
            activeFilters.length === 0 || activeFilters.some(filter => item.tags.includes(filter));
        return categoryMatch && filterMatch;
    });

    menuGrid.innerHTML = filteredItems
        .map(
            item => `
        <div class="menu-item fade-in-up">
            <div class="menu-item-image">
                <span>${item.icon}</span>
            </div>
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-item-price">${item.price}</div>
                <div class="menu-item-tags">
                    ${item.tags.map(tag => `<span class="menu-tag ${tag}">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `
        )
        .join('');
}

// Initialize cart with all menu items
function initializeMenuCart() {
    const cartSection = document.getElementById('menuCartSection');
    if (!cartSection) return;

    // Initialize cart with all menu items at quantity 0
    cart = menuItems.map(item => ({
        ...item,
        quantity: 0
    }));

    // Render cart section with quantity inputs
    cartSection.innerHTML = cart
        .map(item => {
            return `
                <div class="menu-cart-item">
                    <div class="menu-cart-item-info">
                        <span class="menu-cart-icon">${item.icon}</span>
                        <div>
                            <h4>${item.name}</h4>
                            <p class="menu-cart-price">${item.price}</p>
                        </div>
                    </div>
                    <div class="menu-cart-quantity">
                        <label for="item-${item.id}">Qty:</label>
                        <input
                            type="number"
                            id="item-${item.id}"
                            class="cart-quantity-input"
                            min="0"
                            value="0"
                            data-item-id="${item.id}"
                            onchange="updateCartFromForm(${item.id})"
                        />
                    </div>
                </div>
            `;
        })
        .join('');

    updateCartTotal();
}

// Update cart from form input
function updateCartFromForm(itemId) {
    const input = document.getElementById(`item-${itemId}`);
    if (!input) return;

    const quantity = parseInt(input.value) || 0;
    const item = cart.find(c => c.id === itemId);
    if (item) {
        item.quantity = quantity;
        updateCartTotal();
    }
}

// Update cart total display
function updateCartTotal() {
    const cartSummary = document.getElementById('cartSummary');
    const cartSubtotal = document.getElementById('cartSubtotal');

    if (!cartSummary || !cartSubtotal) return;

    let total = 0;
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price * item.quantity;
    });

    cartSubtotal.textContent = `$${total.toFixed(2)}`;
    
    if (total > 0) {
        cartSummary.style.display = 'block';
    } else {
        cartSummary.style.display = 'none';
    }
}

// Category filter functionality
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        // Update current category
        currentCategory = btn.dataset.category;
        // Re-render menu
        renderMenuItems();
    });
});

// Dietary filter functionality
document.querySelectorAll('.dietary-filters input').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        activeFilters = Array.from(document.querySelectorAll('.dietary-filters input:checked')).map(
            input => input.dataset.filter
        );
        renderMenuItems();
    });
});

// Payment System Variables
let stripe;
let elements;
let card;
let currentBookingData = null;
let calculatedCost = 0;

// Initialize Stripe
function initializeStripe() {
    // Using Stripe test publishable key - replace with your actual key
    stripe = Stripe(
        'pk_test_51234567890123456789012345678901234567890123456789012345678901234567890123456789'
    );
    elements = stripe.elements();

    // Create card element
    card = elements.create('card', {
        style: {
            base: {
                fontSize: '16px',
                color: '#333',
                '::placeholder': {
                    color: '#aab7c4'
                }
            },
            invalid: {
                color: '#DC143C',
                iconColor: '#DC143C'
            }
        }
    });

    card.mount('#card-element');

    // Handle real-time validation errors from the card Element
    card.on('change', ({ error }) => {
        const displayError = document.getElementById('card-errors');
        if (error) {
            displayError.textContent = error.message;
        } else {
            displayError.textContent = '';
        }
    });
}

// Calculate cost based on package and guests
function calculateBookingCost(packageType, guests) {
    const packagePrices = {
        basic: 25,
        premium: 45,
        luxury: 75,
        custom: 35 // Default price for custom
    };

    const basePrice = packagePrices[packageType] || 0;
    const subtotal = basePrice * guests;
    const serviceFee = subtotal * 0.1; // 10% service fee
    const total = subtotal + serviceFee;

    return {
        basePrice,
        subtotal,
        serviceFee,
        total
    };
}

// Update payment summary
function updatePaymentSummary(costs, guests, paymentMethod) {
    document.getElementById('packageCost').textContent = `$${costs.subtotal.toFixed(2)}`;
    document.getElementById('serviceFee').textContent = `$${costs.serviceFee.toFixed(2)}`;

    let finalAmount = costs.total;

    // Apply discount for full payment
    if (paymentMethod === 'full') {
        finalAmount = costs.total * 0.95; // 5% discount
        document.getElementById('totalAmount').innerHTML =
            `<strong>$${finalAmount.toFixed(2)} <small>(5% discount applied)</small></strong>`;
    } else {
        finalAmount = costs.total * 0.5; // 50% deposit
        document.getElementById('totalAmount').innerHTML =
            `<strong>$${finalAmount.toFixed(2)} <small>(50% deposit)</small></strong>`;
    }

    document.getElementById('submitAmount').textContent = `($${finalAmount.toFixed(2)})`;
    return finalAmount;
}

// Calculate button handler
document.getElementById('calculateBtn').addEventListener('click', function() {
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    const bookingData = Object.fromEntries(formData);

    // Basic validation
    if (!bookingData.name || !bookingData.email || !bookingData.phone || !bookingData.eventDate) {
        alert('Please fill in all required fields.');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Date validation
    const selectedDate = new Date(bookingData.eventDate);
    const today = new Date();
    if (selectedDate <= today) {
        alert('Please select a future date for your event.');
        return;
    }

    // Update cart from form inputs
    cart.forEach(item => {
        const input = document.getElementById(`item-${item.id}`);
        if (input) {
            item.quantity = parseInt(input.value) || 0;
        }
    });

    // Filter out items with quantity 0
    const selectedItems = cart.filter(item => item.quantity > 0);

    // Check if cart is empty
    if (selectedItems.length === 0) {
        alert('Please add items to your order by entering quantities.');
        return;
    }

    // Calculate total from cart
    let subtotal = 0;
    selectedItems.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        subtotal += price * item.quantity;
    });

    // Check minimum order
    if (subtotal < 150) {
        alert(`Minimum order of $150 CAD required for catering orders. Your current total is $${subtotal.toFixed(2)}.`);
        return;
    }

    // Calculate costs
    const serviceFee = subtotal * 0.1; // 10% service fee
    const total = subtotal + serviceFee;

    const costs = {
        subtotal,
        serviceFee,
        total
    };

    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    calculatedCost = updatePaymentSummary(costs, 0, paymentMethod);

    // Store booking data with cart (only selected items)
    currentBookingData = {
        ...bookingData,
        cart: selectedItems,
        orderTotal: total
    };

    // Show payment section
    document.getElementById('paymentSection').style.display = 'block';
    document.getElementById('calculateBtn').style.display = 'none';
    document.getElementById('submitBtn').style.display = 'inline-block';

    // Initialize Stripe if not already done
    if (!stripe) {
        initializeStripe();
    }

    // Scroll to payment section
    document
        .getElementById('paymentSection')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Payment method change handler
document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (currentBookingData && currentBookingData.orderTotal) {
            const costs = {
                subtotal: currentBookingData.orderTotal / 1.1, // Reverse calculate subtotal
                serviceFee: (currentBookingData.orderTotal / 1.1) * 0.1,
                total: currentBookingData.orderTotal
            };
            calculatedCost = updatePaymentSummary(costs, 0, this.value);
        }
    });
});

// Booking form handling with payment
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    if (!currentBookingData || !stripe || !card) {
        alert('Please calculate the cost first and ensure payment information is loaded.');
        return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    submitBtn.disabled = true;

    try {
        // Create payment method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: card,
            billing_details: {
                name: currentBookingData.name,
                email: currentBookingData.email,
                phone: currentBookingData.phone
            }
        });

        if (error) {
            throw new Error(error.message);
        }

        // Simulate payment processing
        await simulatePaymentProcessing(paymentMethod.id, calculatedCost);

        // Show success message
        showPaymentSuccess();
    } catch (error) {
        alert(`Payment failed: ${error.message}`);
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

async function simulatePaymentProcessing(paymentMethodId, amount) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
                    amount: amount
                });
            } else {
                reject(new Error('Payment declined. Please try a different card.'));
            }
        }, 3000);
    });
}

// Show payment success
function showPaymentSuccess() {
    const form = document.getElementById('bookingForm');
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const isDeposit = paymentMethod === 'deposit';

    form.innerHTML = `
        <div class="payment-success">
            <i class="fas fa-check-circle"></i>
            <h3>Payment Successful!</h3>
            <p>Thank you for your booking! We have received your ${isDeposit ? 'deposit' : 'full payment'} of $${calculatedCost.toFixed(2)}.</p>
            <p><strong>Booking Details:</strong></p>
            <ul style="text-align: left; display: inline-block;">
                <li>Event Date: ${currentBookingData.eventDate}</li>
                <li>Event Type: ${currentBookingData.eventType}</li>
                <li>Guests: ${currentBookingData.guests}</li>
                <li>Package: ${currentBookingData.package}</li>
            </ul>
            <p>We will contact you within 24 hours to confirm all event details.</p>
            ${isDeposit ? '<p><small>Remaining balance will be due on the event date.</small></p>' : ''}
            <button type="button" class="btn btn-secondary" onclick="location.reload()">Book Another Event</button>
        </div>
    `;
}

// Download menu PDF function
function downloadMenu() {
    // Create a simple text representation of the menu
    let menuText = 'DUNYA CATERING MENU\n';
    menuText += '====================\n\n';

    const categories = ['breakfast', 'lunch', 'dinner', 'desserts', 'drinks'];

    categories.forEach(category => {
        const categoryItems = menuItems.filter(item => item.category === category);
        if (categoryItems.length > 0) {
            menuText += `${category.toUpperCase()}\n`;
            menuText += '-'.repeat(category.length) + '\n';
            categoryItems.forEach(item => {
                menuText += `${item.name} - ${item.price}\n`;
                menuText += `${item.description}\n`;
                if (item.tags.length > 0) {
                    menuText += `Tags: ${item.tags.join(', ')}\n`;
                }
                menuText += '\n';
            });
        }
    });

    menuText += '\nContact Information:\n';
    menuText += 'Phone: (555) 123-4567\n';
    menuText += 'Email: info@dunya-catering.com\n';
    menuText += 'Address: 123 Main Street, City, State\n';

    // Create and download the file
    const blob = new Blob([menuText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dunya-menu.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature, .menu-item, .contact-item');
    animateElements.forEach(el => observer.observe(el));

    // Initialize menu
    renderMenuItems();

    // Initialize menu cart in form
    initializeMenuCart();
});

// Package selection change handler
document.getElementById('package').addEventListener('change', function() {
    const packageInfo = document.createElement('div');
    packageInfo.className = 'package-info';
    packageInfo.style.cssText =
        'margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 5px; border-left: 4px solid #4169E1;';

    const existingInfo = this.parentNode.querySelector('.package-info');
    if (existingInfo) {
        existingInfo.remove();
    }

    if (this.value) {
        let info = '';
        switch (this.value) {
        case 'basic':
            info = 'Includes: 3 appetizers, 2 main courses, 1 dessert, basic service staff';
            break;
        case 'premium':
            info =
                    'Includes: 5 appetizers, 3 main courses, 2 desserts, premium service staff, table setup';
            break;
        case 'luxury':
            info =
                    'Includes: 7 appetizers, 4 main courses, 3 desserts, luxury service staff, full setup and decoration';
            break;
        case 'custom':
            info =
                    'Contact us for a personalized menu and service package tailored to your event';
            break;
        }
        packageInfo.textContent = info;
        this.parentNode.appendChild(packageInfo);
    }
});

// Form field validation
document
    .querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea')
    .forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#DC143C';
            } else {
                this.style.borderColor = '#2E8B57';
            }
        });

        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '#2E8B57';
            }
        });
    });

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Page initialization complete
});
