# React Enterprise Boilerplate

A modern, scalable, and highly opinionated React boilerplate based on the **Feature-Sliced Design (FSD)** architecture. It is designed to prioritize vertical feature slices over flat file-type directories, making it perfect for enterprise-level applications.

## 🚀 Technologies Used

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Client State) & React Query (Server State)
- **Routing**: React Router v7
- **Validation**: Zod
- **Networking**: Axios
- **Mocking**: MSW (Mock Service Worker)
- **Testing**: Vitest & React Testing Library
- **Icons**: Lucide React

## 📂 Project Architecture (FSD)

This project follows the **Feature-Sliced Design** methodology. The `src/` directory is divided into specific layers:

- **`app/`**: The wiring layer. Contains the root configuration, global styles, providers, and routing setup.
- **`shared/`**: The foundation layer. Contains globally reusable code (UI components, config, hooks, utils, types) that is completely agnostic to business logic.
- **`features/`**: The business logic layer. Isolated, vertical slices of business logic (e.g., specific domains like `example-feature`). They act as independent micro-applications.
- **`pages/`**: The composition layer. Responsible for assembling components from features and shared layouts, then mapping them to a specific URL route.

For a deeply detailed file-by-file breakdown, refer to the [PROJECT_STRUCTURE_GUIDE.md](./PROJECT_STRUCTURE_GUIDE.md) and [ARCHITECTURE.md](./ARCHITECTURE.md) files.

## 📦 Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

### 3. Development Server

Start the development server:

```bash
npm run dev
```

### 4. Build for Production

Build the application for production:

```bash
npm run build
```

## 🧪 Testing

Run the test suite using Vitest:

```bash
npm run test
```

For test coverage:

```bash
npm run test:coverage
```

## 📝 License

This project is open-source and available under the MIT License.
