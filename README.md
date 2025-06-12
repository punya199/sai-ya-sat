# SAI YA SAT - Vite React Firebase Hosting

A modern React application built with Vite, TypeScript, and Tailwind CSS, deployed on Firebase Hosting.

## 🚀 Features

- ⚡ **Vite** - Fast build tool and dev server
- ⚛️ **React 19** - Latest React with concurrent features
- 🔷 **TypeScript** - Type-safe development
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🔥 **Firebase Hosting** - Fast, secure hosting
- 📱 **Responsive Design** - Mobile-first approach
- 🛠️ **ESLint + Prettier** - Code quality and formatting
- 🐶 **Husky** - Git hooks for code quality

## 🛠️ Development

### Prerequisites

- Node.js (version specified in `.nvmrc`)
- Yarn package manager
- Firebase CLI (installed as dev dependency)

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev
```

The development server will be available at `http://localhost:5173`

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build locally
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting

## 🚀 Deployment

### Firebase Hosting Setup

This project is configured for Firebase Hosting with the following features:

- **SPA Routing** - All routes redirect to `index.html` for client-side routing
- **Optimized Build** - Vite builds optimized assets for production
- **Automatic Deployment** - One-command deployment

### Deployment Commands

```bash
# Deploy to Firebase Hosting
yarn deploy:hosting

# Or use the full deploy command
yarn deploy
```

### Manual Deployment Steps

1. **Build the project:**
   ```bash
   yarn build
   ```

2. **Deploy to Firebase:**
   ```bash
   npx firebase deploy --only hosting
   ```

### Deployment URLs

- **Production URL:** https://sai-ya-sat.web.app
- **Firebase Console:** https://console.firebase.google.com/project/sai-ya-sat/overview

## 📁 Project Structure

```
├── src/                 # Source code
├── public/             # Static assets
├── dist/               # Build output (generated)
├── firebase.json       # Firebase configuration
├── .firebaserc         # Firebase project settings
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── package.json        # Dependencies and scripts
```

## 🔧 Configuration

### Firebase Configuration

The `firebase.json` file is configured for:
- **Public Directory:** `dist` (Vite build output)
- **SPA Routing:** All routes redirect to `index.html`
- **Ignore Patterns:** Excludes unnecessary files from deployment

### Vite Configuration

- **Build Output:** `dist/` directory
- **Development Server:** `localhost:5173`
- **Preview Server:** `localhost:4173`

## 🎨 Styling

This project uses Tailwind CSS v4 with the following features:
- Utility-first CSS classes
- Responsive design utilities
- Custom component styling
- Optimized for production builds

## 📝 Code Quality

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **lint-staged** - Run linters on staged files

## 🔄 CI/CD

The project is ready for continuous deployment. You can set up GitHub Actions or other CI/CD tools to automatically deploy on push to main branch.

## 📚 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is private and proprietary.
