// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Mediterranean Breakfast Platter",
        description: "Fresh eggs, olives, feta cheese, tomatoes, and warm pita bread",
        price: "$18",
        category: "breakfast",
        tags: ["vegetarian", "halal"],
        icon: "🍳"
    },
    {
        id: 2,
        name: "Grilled Salmon with Herbs",
        description: "Atlantic salmon with fresh herbs, lemon, and seasonal vegetables",
        price: "$32",
        category: "lunch",
        tags: ["halal"],
        icon: "🐟"
    },
    {
        id: 3,
        name: "Beef Tenderloin Steak",
        description: "Premium cut beef tenderloin with red wine reduction sauce",
        price: "$45",
        category: "dinner",
        tags: ["halal"],
        icon: "🥩"
    },
    {
        id: 4,
        name: "Vegetarian Pasta Primavera",
        description: "Fresh seasonal vegetables with al dente pasta in light cream sauce",
        price: "$24",
        category: "dinner",
        tags: ["vegetarian", "gluten-free"],
        icon: "🍝"
    },
    {
        id: 5,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with molten center, served with vanilla ice cream",
        price: "$12",
        category: "desserts",
        tags: ["vegetarian"],
        icon: "🍫"
    },
    {
        id: 6,
        name: "Fresh Fruit Smoothie",
        description: "Blend of seasonal fruits with yogurt and honey",
        price: "$8",
        category: "drinks",
        tags: ["vegetarian", "gluten-free"],
        icon: "🥤"
    },
    {
        id: 7,
        name: "Shakshuka",
        description: "Poached eggs in spicy tomato sauce with feta and herbs",
        price: "$16",
        category: "breakfast",
        tags: ["vegetarian", "halal"],
        icon: "🍳"
    },
    {
        id: 8,
        name: "Chicken Shawarma Wrap",
        description: "Marinated chicken with tahini sauce, pickles, and fresh vegetables",
        price: "$14",
        category: "lunch",
        tags: ["halal"],
        icon: "🌯"
    },
    {
        id: 9,
        name: "Lamb Tagine",
        description: "Slow-cooked lamb with apricots, almonds, and aromatic spices",
        price: "$38",
        category: "dinner",
        tags: ["halal"],
        icon: "🍖"
    },
    {
        id: 10,
        name: "Quinoa Buddha Bowl",
        description: "Quinoa, roasted vegetables, avocado, and tahini dressing",
        price: "$20",
        category: "lunch",
        tags: ["vegetarian", "vegan", "gluten-free"],
        icon: "🥗"
    },
    {
        id: 11,
        name: "Baklava",
        description: "Layered phyllo pastry with nuts and honey syrup",
        price: "$10",
        category: "desserts",
        tags: ["vegetarian"],
        icon: "🍯"
    },
    {
        id: 12,
        name: "Turkish Coffee",
        description: "Traditional Turkish coffee served with Turkish delight",
        price: "$6",
        category: "drinks",
        tags: ["vegetarian", "halal"],
        icon: "☕"
    }
];

// Initialize menu
let currentCategory = 'all';
let activeFilters = [];

// Render menu items
function renderMenuItems() {
    const menuGrid = document.getElementById('menuGrid');
    const filteredItems = menuItems.filter(item => {
        const categoryMatch = currentCategory === 'all' || item.category === currentCategory;
        const filterMatch = activeFilters.length === 0 || 
            activeFilters.some(filter => item.tags.includes(filter));
        return categoryMatch && filterMatch;
    });

    menuGrid.innerHTML = filteredItems.map(item => `
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
    `).join('');
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
        activeFilters = Array.from(document.querySelectorAll('.dietary-filters input:checked'))
            .map(input => input.dataset.filter);
        renderMenuItems();
    });
});

// Booking form handling
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = Object.fromEntries(formData);
    
    // Basic validation
    if (!bookingData.name || !bookingData.email || !bookingData.phone || 
        !bookingData.eventDate || !bookingData.eventType || !bookingData.guests) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(bookingData.email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(bookingData.phone.replace(/\D/g, ''))) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Date validation
    const selectedDate = new Date(bookingData.eventDate);
    const today = new Date();
    if (selectedDate <= today) {
        alert('Please select a future date for your event.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Thank you for your booking request! We will contact you within 24 hours to confirm your event details.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

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
    anchor.addEventListener('click', function (e) {
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

const observer = new IntersectionObserver((entries) => {
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
});

// Package selection change handler
document.getElementById('package').addEventListener('change', function() {
    const packageInfo = document.createElement('div');
    packageInfo.className = 'package-info';
    packageInfo.style.cssText = 'margin-top: 10px; padding: 10px; background: #f0f8ff; border-radius: 5px; border-left: 4px solid #4169E1;';
    
    const existingInfo = this.parentNode.querySelector('.package-info');
    if (existingInfo) {
        existingInfo.remove();
    }
    
    if (this.value) {
        let info = '';
        switch(this.value) {
            case 'basic':
                info = 'Includes: 3 appetizers, 2 main courses, 1 dessert, basic service staff';
                break;
            case 'premium':
                info = 'Includes: 5 appetizers, 3 main courses, 2 desserts, premium service staff, table setup';
                break;
            case 'luxury':
                info = 'Includes: 7 appetizers, 4 main courses, 3 desserts, luxury service staff, full setup and decoration';
                break;
            case 'custom':
                info = 'Contact us for a personalized menu and service package tailored to your event';
                break;
        }
        packageInfo.textContent = info;
        this.parentNode.appendChild(packageInfo);
    }
});

// Form field validation
document.querySelectorAll('#bookingForm input, #bookingForm select, #bookingForm textarea').forEach(field => {
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
    console.log('DUNYA Catering Website Loaded Successfully!');
}); 