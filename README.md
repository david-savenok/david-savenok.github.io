# David Savenok - Personal Website

A clean, modern personal portfolio website built with pure HTML and CSS. Features a dark/light mode toggle and responsive design optimized for all devices.

🔗 **Live Site**: [https://david-savenok.github.io](https://david-savenok.github.io)

## Features

- 🎨 **Dark/Light Mode** - CSS-only theme toggle with smooth transitions
- 📱 **Fully Responsive** - Mobile-first design that works on all screen sizes
- ⚡ **Performance** - Pure HTML/CSS with no JavaScript dependencies
- 🎯 **Sections**:
  - Hero with introduction and CTAs
  - About section with background
  - Experience showcase (Everfox internship)
  - Projects gallery (4 featured projects)
  - Resume download functionality

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **GitHub Pages** - Static site hosting

## Local Development

1. Clone the repository:
```bash
git clone https://github.com/david-savenok/david-savenok.github.io.git
cd david-savenok.github.io
```

2. Open `index.html` in your browser:
```bash
open index.html
# or
python -m http.server 8000  # then visit http://localhost:8000
```

## Project Structure

```
david-savenok.github.io/
├── index.html              # Main HTML file
├── assets/
│   ├── resume.pdf         # Resume PDF for download
│   ├── css/
│   │   └── styles.css     # All styles including dark/light mode
│   └── images/
│       └── projects/      # Optional project screenshots
└── README.md
```

## Deployment

This site is automatically deployed via GitHub Pages:

1. Push changes to the `main` branch
2. GitHub Pages will automatically build and deploy
3. Visit [https://david-savenok.github.io](https://david-savenok.github.io)

### Setup GitHub Pages

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/ (root)`
4. Save

## Customization

### Adding Your Resume

Replace the placeholder file at `assets/resume.pdf` with your actual resume PDF.

### Updating Content

- **Personal Info**: Edit text in `index.html` sections
- **Projects**: Update the project cards in the `#projects` section
- **Experience**: Modify the `#experience` section with your work history
- **Colors**: Adjust CSS variables in `:root` and dark mode section in `styles.css`

### Color Themes

Light and dark mode colors are defined using CSS custom properties in `styles.css`:

```css
:root {
    /* Light mode variables */
}

body:has(#theme-toggle:checked) {
    /* Dark mode variables */
}
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

**Note**: The CSS `:has()` selector for dark mode toggle requires modern browser support (2022+). For older browsers, the site defaults to light mode.

## License

MIT License - Feel free to use this as a template for your own portfolio!

## Contact

- **Email**: david.savenok@outlook.com
- **LinkedIn**: [linkedin.com/in/david-savenok](https://linkedin.com/in/david-savenok)
- **GitHub**: [github.com/david-savenok](https://github.com/david-savenok)

---

Built with HTML & CSS | © 2025 David Savenok
