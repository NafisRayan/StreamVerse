# StreamVerse

![StreamVerse Logo](public/logo.svg)

StreamVerse is a modern, responsive web application for streaming movies, TV shows, and anime. Built with React, TypeScript, and Tailwind CSS, it provides a Netflix-like user experience with a clean, intuitive interface.

## 📋 Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Authentication](#authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop devices
- **Content Discovery**: Browse trending, popular movies, TV shows, and anime
- **Search Functionality**: Search for specific titles across all content types
- **Content Details**: View detailed information about movies, TV shows, and anime
- **Video Playback**: Stream content with quality selection options
- **User Authentication**: Register, login, and manage user profiles
- **Watchlist**: Save content to watch later (for authenticated users)
- **Personalized Recommendations**: Get content recommendations based on viewing history

## 🎬 Demo

Visit the live demo: [StreamVerse Demo](https://streamverse-demo.example.com)

![StreamVerse Screenshot](docs/screenshot.png)

## 🛠️ Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Linting**: [ESLint](https://eslint.org/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NafisRayan/streamverse.git
   cd streamverse
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

3. For production build:
   ```bash
   npm run build
   ```

4. To preview the production build:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
streamverse/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── detail/      # Detail page components
│   │   ├── home/        # Home page components
│   │   ├── layout/      # Layout components (Navbar, Footer)
│   │   └── ui/          # UI components (buttons, cards, etc.)
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── store/           # State management
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── .eslintrc.js         # ESLint configuration
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## 🔌 API Integration

StreamVerse uses a mock API service for demonstration purposes. In a production environment, you would integrate with a real streaming API. The mock service is located in `src/services/api.ts`.

To integrate with a real API:

1. Update the API endpoints in the services directory
2. Configure environment variables for API keys and base URLs
3. Update the data models in the types directory if necessary

## 🔐 Authentication

The application includes a mock authentication system with the following features:

- User registration
- User login
- Profile management
- Session persistence

Authentication state is managed using Zustand and persisted in local storage. In a production environment, you would integrate with a real authentication service.

## 📦 Deployment

### Building for Production

```bash
npm run build
```

This will create a `dist` directory with the production-ready build.

### Deployment Options

- **Vercel**: Recommended for easy deployment
  ```bash
  npm install -g vercel
  vercel
  ```

- **Netlify**: Another great option for static site hosting
  ```bash
  npm install -g netlify-cli
  netlify deploy
  ```

- **GitHub Pages**: For simple hosting
  ```bash
  npm run build
  # Configure for GitHub Pages deployment
  ```