# DUNYA Catering Website

A modern, full-stack catering website for DUNYA restaurant featuring a beautiful design with green, blue, yellow, and red color scheme on a white background. Built with Node.js, Express, and Stripe payment integration.

[![Node.js](https://img.shields.io/badge/Node.js-14%2B-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.18%2B-blue)](https://expressjs.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment-purple)](https://stripe.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

## 🌟 Features

### 1. Landing Page

- **Visually appealing hero section** with gradient background and call-to-action
- **Professional navigation** with smooth scrolling
- **About section** highlighting key features and services
- **Responsive design** that works on all devices

### 2. Menu Page

- **Categorized menu items**: Breakfast, Lunch, Dinner, Desserts, Drinks
- **Advanced filtering system**:
    - Category filters (All, Breakfast, Lunch, Dinner, Desserts, Drinks)
    - Dietary filters (Vegetarian, Halal, Gluten-Free, Vegan)
- **Interactive menu cards** with pricing and dietary tags
- **Downloadable menu** in text format
- **Beautiful animations** and hover effects

### 3. Booking/Order Form

- **Comprehensive booking form** with all required fields:
    - Name, Email, Phone Number
    - Event Date, Event Type, Number of Guests
    - Catering Package Selection
    - Special Requirements
- **Form validation** with real-time feedback
- **Package information** that updates based on selection
- **Email integration** (simulated)

### 4. Payment System

- **Stripe integration** for secure payment processing
- **Cost calculation** based on package selection and guest count
- **Payment options**:
    - 50% deposit option
    - Full payment option (with 5% discount)
- **Real-time payment processing** with loading states
- **Payment confirmation** with booking details
- **Service fee calculation** (10% automatically added)
- **Secure card input** using Stripe Elements

## 🎨 Design Features

### Color Scheme

- **Primary Green**: #2E8B57 (Sea Green)
- **Secondary Green**: #3CB371 (Medium Sea Green)
- **Primary Blue**: #4169E1 (Royal Blue)
- **Secondary Blue**: #6495ED (Cornflower Blue)
- **Primary Yellow**: #FFD700 (Gold)
- **Secondary Yellow**: #FFA500 (Orange)
- **Primary Red**: #DC143C (Crimson)
- **Secondary Red**: #FF6347 (Tomato)
- **Background**: White (#FFFFFF)

### Typography

- **Headings**: Playfair Display (serif)
- **Body Text**: Poppins (sans-serif)
- **Modern and readable** font combinations

### Responsive Design

- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly navigation**
- **Optimized for all screen sizes**

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (version 14 or higher) for payment processing
- Stripe account for payment processing (optional for demo)

### Installation

#### Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/yourusername/dunya-catering-website.git
cd dunya-catering-website

# Install dependencies
npm install

# Start development servers (frontend + backend)
npm run dev
```

#### Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

#### Environment Setup

1. Copy the environment template:
    ```bash
    cp env.example .env
    ```
2. Fill in your Stripe keys and other configuration in `.env`
3. For production, set `NODE_ENV=production`

#### Available Scripts

- `npm run dev` - Start development servers (frontend + backend)
- `npm run build` - Build production-ready files
- `npm start` - Build and start production server
- `npm test` - Run test suite
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier
- `npm run validate` - Run linting and tests

### Project Structure

```
dunya-catering/
├── public/                 # Frontend source files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles and responsive design
│   └── script.js          # JavaScript functionality
├── server/                 # Backend source files
│   └── payment-handler.js # Express server with Stripe integration
├── config/                 # Configuration files
│   └── app.config.js      # Environment-specific configuration
├── tests/                  # Test files
│   ├── setup.js           # Jest test setup
│   └── server.test.js     # Server API tests
├── scripts/                # Build scripts
│   └── update-references.js # Asset reference updater
├── dist/                   # Built files (generated)
├── coverage/               # Test coverage reports (generated)
├── package.json           # Dependencies and scripts
├── .eslintrc.js           # ESLint configuration
├── .prettierrc            # Prettier configuration
├── jest.config.js         # Jest testing configuration
├── env.example            # Environment variables template
└── README.md              # Project documentation
```

## 📱 Features in Detail

### Navigation

- **Fixed navigation bar** with blur effect
- **Mobile hamburger menu** for smaller screens
- **Smooth scrolling** to sections
- **Active state indicators**

### Menu System

- **12 sample menu items** across all categories
- **Dynamic filtering** by category and dietary preferences
- **Visual tags** for dietary restrictions
- **Price display** for each item
- **Emoji icons** for visual appeal

### Booking System

- **Comprehensive form validation**
- **Real-time field validation**
- **Package selection with descriptions**
- **Date validation** (future dates only)
- **Email and phone format validation**
- **Success feedback** after submission

### Interactive Elements

- **Hover effects** on buttons and cards
- **Smooth animations** using CSS transitions
- **Intersection Observer** for scroll animations
- **Form field highlighting** for better UX

## 🛠️ Customization

### Adding Menu Items

Edit the `menuItems` array in `script.js`:

```javascript
{
    id: 13,
    name: "Your Dish Name",
    description: "Description of the dish",
    price: "$25",
    category: "dinner", // breakfast, lunch, dinner, desserts, drinks
    tags: ["vegetarian", "halal"], // dietary tags
    icon: "🍽️" // emoji icon
}
```

### Changing Colors

Modify the CSS custom properties in `styles.css`:

```css
:root {
    --primary-green: #2e8b57;
    --primary-blue: #4169e1;
    --primary-yellow: #ffd700;
    --primary-red: #dc143c;
    /* ... other colors */
}
```

### Adding New Categories

1. Add the category to the filter buttons in `index.html`
2. Add menu items with the new category in `script.js`
3. Update the download function if needed

## 📧 Contact Information

The website includes placeholder contact information:

- **Phone**: (555) 123-4567
- **Email**: info@dunya-catering.com
- **Address**: 123 Main Street, City, State

## 🔧 Technical Details

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance

- **Lightweight** - No external dependencies
- **Fast loading** - Optimized CSS and JavaScript
- **SEO friendly** - Semantic HTML structure
- **Accessible** - ARIA labels and keyboard navigation

### Security

- **Client-side validation** for immediate feedback
- **XSS protection** through proper input sanitization
- **No sensitive data** stored locally

## 🎯 Future Enhancements

Potential improvements for the website:

- **Backend integration** for real form submission
- **Image upload** for menu items
- **Online payment** integration
- **Customer testimonials** section
- **Blog/News** section
- **Social media** integration
- **Multi-language** support
- **Advanced analytics** tracking

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**DUNYA Catering** - Bringing world-class cuisine to your special moments.
