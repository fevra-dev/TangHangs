# Tang Collection - Landing Page

A simple, clean, centered landing page for the Tang Collection with fun circular buttons and perfect mobile/desktop compatibility.

## 🎨 Design Features

- **Simple & Clean**: Centered, non-scrollable design focused on essential links
- **Fun Circular Buttons**: Colorful, interactive circular buttons with hover effects
- **Custom Color Scheme**: Features `#00ffea` as the main background color
- **Custom Cursor**: Unique cursor implementation for enhanced user experience
- **Perfect Responsive**: Works flawlessly on both mobile and desktop
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Technical Stack

- **HTML5**: Semantic markup with proper accessibility attributes
- **CSS3**: Modern CSS with custom properties, grid, flexbox, and animations
- **Vanilla JavaScript**: Clean, modular JavaScript with React-ready structure
- **Typography**: DM Sans for body text and Lora for headings

## 📁 Project Structure

```text
Tang_Landing/
├── index.html          # Main HTML file with semantic structure
├── styles.css          # Complete CSS styling with custom cursor
├── script.js           # Interactive JavaScript with modular components
├── favicon.svg         # Custom SVG favicon
└── README.md           # Project documentation
```

## 🛠️ Features

### Centered Layout

- Fixed viewport height (no scrolling)
- Perfect vertical and horizontal centering
- Clean typography with Tang Collection branding

### Circular Link Buttons

- **Token**: Links to @MangTheTang on Twitter (🪙)
- **NFT**: Links to @TangHangs on Twitter (🖼️)
- **Artist**: Links to @0xRadi0 on Twitter (🎨)
- **Depot**: Links to Mang's profile on Meme Depot (🏪)

### Interactive Elements

- Custom cursor implementation
- Ripple effects on button clicks
- Smooth hover animations and scaling
- Colorful gradients for each button type
- Touch-friendly mobile interactions

## 🎯 Framework Migration Ready

The codebase is structured for easy migration to React:

- **Component-based architecture**: Each major section is organized as a component module
- **Modular JavaScript**: Clear separation of concerns with reusable functions
- **CSS Custom Properties**: Easy theming and style management
- **Semantic HTML**: Component-ready markup structure
- **Event handling**: Clean event delegation patterns

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup & Usage

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **No build process required** - runs directly in the browser

For development:

```bash
# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
```

## 🎨 Customization

### Colors

Edit CSS custom properties in `styles.css`:

```css
:root {
  --primary-bg: #00ffea;     /* Main background */
  --primary-text: #000000;   /* Text color */
  --accent-color: #ffffff;   /* Accent highlights */
}
```

### Typography

Fonts are loaded from Google Fonts. To change:

1. Update the Google Fonts link in `index.html`
2. Modify font variables in `styles.css`

### Content

- **Memes**: Update the meme grid in `index.html`
- **Links**: Modify footer links for actual NFT marketplaces
- **Copy**: Update hero text and descriptions

## 🔮 Future Enhancements

- **React Migration**: Component structure is ready for React
- **Web3 Integration**: Wallet connection and NFT interactions
- **API Integration**: Dynamic content loading
- **PWA Features**: Service worker and offline functionality
- **Analytics**: User interaction tracking
- **SEO Optimization**: Meta tags and structured data

## 📊 Performance

- **Lighthouse Score**: Optimized for 90+ scores
- **Core Web Vitals**: Meets Google's performance standards
- **Image Optimization**: Lazy loading and proper sizing
- **CSS/JS Optimization**: Minification ready

## 🎯 Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion preferences

## 📄 License

This project is created as a foundation template. Customize freely for your NFT collection needs.

---

**Ready to launch your NFT collection landing page!** 🚀
