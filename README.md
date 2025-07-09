# Bayern Express - Water Damage Restoration Website

A modern, responsive website for Bayern Express, a water damage restoration and building renovation company based in Munich, Germany. Built with Next.js and Tailwind CSS to provide fast loading times and an excellent user experience.

## 🌐 Live Website

**[https://bayern-express.vercel.app/](https://bayern-express.vercel.app/)**

## 📋 About

This project was created to help improve the online presence of Bayern Express, a local business specializing in:
- Water damage restoration
- Building drying services
- Renovation and reconstruction
- Emergency 24/7 services

The website features a modern design with detailed service information, contact forms with reCAPTCHA protection, and integrated Google Maps for easy location finding.

## 🚀 Technologies

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework
- **[MongoDB](https://mongodb.com)** - Database for contact form submissions
- **[reCAPTCHA v2](https://www.google.com/recaptcha/)** - Spam protection
- **[Google Maps API](https://developers.google.com/maps)** - Location integration
- **[Vercel](https://vercel.com)** - Deployment platform

## ✨ Features

- **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Fast Loading Times** - Optimized with Next.js and modern web practices
- **Contact Form** - Secure form with reCAPTCHA protection and MongoDB storage
- **Service Pages** - Dynamic service detail pages
- **Google Maps Integration** - Interactive map showing business location
- **SEO Optimized** - Proper meta tags and structured data
- **Accessibility** - WCAG compliant design
- **Easy to Maintain** - Clean code structure and comprehensive documentation

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MongoDB database
- Google reCAPTCHA keys
- Google Maps API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bayern-express
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your actual values:
   ```bash
   cp .env.example .env
   ```
   
   Required environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   ```

4. **Validate configuration**
   ```bash
   npm run validate-recaptcha
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📝 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types
- `npm run validate-recaptcha` - Validate reCAPTCHA configuration
- `npm run debug-recaptcha` - Debug reCAPTCHA issues

## 🔧 Configuration

### reCAPTCHA Setup

For detailed reCAPTCHA setup instructions, see [RECAPTCHA_PRODUCTION_SETUP.md](RECAPTCHA_PRODUCTION_SETUP.md).

### MongoDB Setup

The contact form stores submissions in MongoDB. Ensure your MongoDB instance is properly configured and the connection string is set in your environment variables.

## 📁 Project Structure

```
bayern-express/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── api/            # API routes
│   │   ├── datenschutz/    # Privacy policy page
│   │   ├── impressum/      # Legal notice page
│   │   └── leistungen/     # Services pages
│   ├── components/         # React components
│   ├── models/            # MongoDB models
│   └── utils/             # Utility functions
├── public/                # Static assets
├── scripts/               # Development scripts
└── notes/                 # Project documentation
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project: `npm run build`
2. Start production server: `npm run start`
3. Ensure environment variables are set on your hosting platform

## 🔍 Troubleshooting

### Common Issues

- **reCAPTCHA not working**: Run `npm run debug-recaptcha` to diagnose issues
- **Environment variables not loading**: Ensure `.env` file exists and variables are properly formatted
- **MongoDB connection issues**: Verify your connection string and network access

For detailed troubleshooting, see [RECAPTCHA_PRODUCTION_SETUP.md](RECAPTCHA_PRODUCTION_SETUP.md).

## 📄 License

This project is private and created for Bayern Express business use.

## 🤝 Contributing

This is a private project created for a specific business. If you're interested in similar work, please reach out directly.

---

**Note**: This website was created to help improve the online presence of a local Munich business, showcasing modern web development practices with Next.js and TypeScript.
