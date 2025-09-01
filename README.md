# Frontend Application

A modern web application built with Vite for fast development and optimal performance.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Getting Started

Follow these steps to set up and run the application locally:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

Install all required packages using npm:

```bash
npm install
```

### 3. Environment Setup

The application requires environment variables to be configured:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and update the `VITE_API_URL` variable:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   
   Replace `http://localhost:3000` with your actual local API server URL and port.

### 4. Start the Development Server

Run the development server:

```bash
npm run dev
```

The application will start and be available at `http://localhost:5173` (or another port if 5173 is already in use).

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run the linter (if configured)

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000` |



---

Happy coding! 🚀