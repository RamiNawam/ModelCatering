# DUNYA Catering Website

A modern, responsive catering website for DUNYA restaurant featuring a beautiful design with green, blue, yellow, and red color scheme on a white background.

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
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load immediately with all functionality

### File Structure
```
dunya-catering/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
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
    --primary-green: #2E8B57;
    --primary-blue: #4169E1;
    --primary-yellow: #FFD700;
    --primary-red: #DC143C;
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