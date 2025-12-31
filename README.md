# Med Mokhtar Nasrali - Portfolio

A modern, responsive portfolio website showcasing my work as a Full Stack Developer. Built with React, Framer Motion, and Tailwind CSS, this portfolio features smooth animations, accessibility enhancements, and optimized performance.

## 🚀 Live Demo

Visit the live site: [medmokhtarnasrali.com](https://medmokhtarnasrali.com)

## ✨ Features

### 🎨 Design & UX
- **Modern UI/UX** - Clean, minimalist design with smooth animations
- **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- **Dark Mode Ready** - Prepared for future dark mode implementation
- **Interactive Elements** - Hover effects, transitions, and micro-interactions

### ♿ Accessibility
- **WCAG Compliant** - Follows web accessibility guidelines
- **Keyboard Navigation** - Full keyboard support for all interactive elements
- **ARIA Labels** - Comprehensive ARIA labels for screen readers
- **Focus Management** - Clear focus indicators and modal focus trapping
- **Semantic HTML** - Proper HTML5 semantic elements

### ⚡ Performance
- **Lazy Loading** - Images load only when needed using Intersection Observer
- **Skeleton Screens** - Loading states for better perceived performance
- **Optimized Assets** - Compressed images and efficient code splitting
- **Fast Load Times** - Optimized bundle size and resource loading

### 🔍 SEO
- **Meta Tags** - Comprehensive SEO meta tags
- **Open Graph** - Social media sharing optimization
- **Twitter Cards** - Enhanced Twitter sharing
- **Canonical URLs** - Proper URL canonicalization
- **Semantic Structure** - SEO-friendly HTML structure

### 📱 Mobile Experience
- **Touch Optimized** - Enhanced touch interactions
- **Mobile Menu** - Collapsible navigation for small screens
- **Responsive Typography** - Fluid text sizing across breakpoints
- **Optimized Forms** - Mobile-friendly form inputs

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Latest React with modern features
- **Vite 7.2.4** - Lightning-fast build tool
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Framer Motion 12.23.25** - Production-ready animation library

### Libraries
- **Lucide React** - Beautiful, consistent icons
- **React Icons** - Popular icon library
- **EmailJS** - Contact form email integration

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/med-mokhtar-nasrali/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🚀 Build & Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
The build output in the `dist` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Cloudflare Pages

## 📁 Project Structure

```
portfolio/
├── public/                 # Static assets
│   ├── profile.png        # Profile photo
│   ├── favicon.png        # Favicon
│   ├── *.png             # Project screenshots
│   └── *.pdf             # Resume
├── src/
│   ├── assets/           # React assets
│   ├── App.jsx           # Main application component
│   ├── App.css           # Component styles
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── eslint.config.js      # ESLint configuration
```

## 🎯 Key Components

### Navigation
- Responsive navbar with mobile menu
- Smooth scroll to sections
- Sticky header with backdrop blur

### Hero Section
- Animated introduction
- Social media links
- Call-to-action buttons

### Projects Section
- Project cards with lazy-loaded images
- Modal with detailed project information
- GitHub and live demo links
- Keyboard-accessible interactions

### Skills Section
- Categorized technical skills
- Certifications with external links
- Responsive grid layout

### Contact Form
- EmailJS integration
- Form validation
- Loading states
- Success/error feedback

## ♿ Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Readers**: ARIA labels and semantic HTML for screen reader support
- **Focus Management**: Visible focus indicators and focus trapping in modals
- **Color Contrast**: WCAG AA compliant color contrast ratios
- **Alternative Text**: Descriptive alt text for all images
- **Form Labels**: Proper labels for all form inputs

## 🔧 Configuration

### EmailJS Setup
To enable the contact form:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Update the credentials in `src/App.jsx`:
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
   ```

### Customization
- Update personal information in `src/App.jsx`
- Replace images in `public/` folder
- Modify colors in `tailwind.config.js`
- Update meta tags in `index.html`

## 📊 Performance Metrics

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

While this is a personal portfolio, suggestions and feedback are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Med Mokhtar Nasrali**
- Email: mokhtarbackup03@gmail.com
- LinkedIn: [Mohamed Mokhtar Nasrali](https://www.linkedin.com/in/mohamed-mokhtar-nasrali-458144339/)
- GitHub: [@med-mokhtar-nasrali](https://github.com/med-mokhtar-nasrali)

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/) and [React Icons](https://react-icons.github.io/react-icons/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- UI Framework by [Tailwind CSS](https://tailwindcss.com/)
- Build Tool by [Vite](https://vitejs.dev/)

---

Made with ❤️ by Med Mokhtar Nasrali
