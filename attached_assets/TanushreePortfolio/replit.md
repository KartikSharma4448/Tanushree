# Tanushree Bharti Portfolio

## Overview

This is a full-stack portfolio website for Tanushree Bharti, a Junior Research Fellow and Full Stack Developer specializing in AI, IoT, and web development. The application showcases academic achievements, research publications, projects, and a blog platform. It features a modern, animated interface with a professional academic aesthetic designed to highlight both scholarly credibility and technical expertise.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router

**UI Component System**
- Shadcn/ui component library (New York style variant) providing pre-built, accessible components
- Radix UI primitives for headless, accessible UI components
- Tailwind CSS for utility-first styling with custom design tokens
- Framer Motion for declarative animations and page transitions
- Custom design system defined in `design_guidelines.md` emphasizing clean typography (Inter font family) and generous spacing

**State Management**
- TanStack Query (React Query) for server state management, data fetching, and caching
- Local component state with React hooks
- Theme management via Context API (light/dark mode support)

**Styling Architecture**
- CSS variables for theming with support for light and dark modes
- Custom color system using HSL color space for consistent theming
- Component-specific elevation utilities (`hover-elevate`, `active-elevate-2`) for interaction feedback

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom middleware for request logging and JSON body parsing with raw body preservation
- HTTP server creation for potential WebSocket support

**API Design**
- RESTful API endpoints under `/api` namespace
- Blog post CRUD operations (`/api/blog/posts`)
- Validation using Zod schemas derived from Drizzle ORM models

**Data Storage**
- Drizzle ORM for type-safe database interactions
- PostgreSQL as the database (configured via @neondatabase/serverless)
- In-memory storage fallback (MemStorage class) for development with seeded blog post data
- Schema-first approach with schemas defined in `shared/schema.ts`

**Development Server**
- Vite middleware integration for HMR in development mode
- Custom error overlay for runtime error reporting
- Separate build process: Vite for client bundle, esbuild for server bundle

### Database Schema

**Users Table**
- UUID primary key with automatic generation
- Username (unique) and password fields for authentication
- Currently defined but not actively used in the application

**Blog Posts Table**
- UUID primary key
- Content fields: title, slug (unique), excerpt, content (HTML), optional imageUrl
- Timestamps: publishedAt, createdAt, updatedAt
- Slug-based routing for SEO-friendly URLs

### Authentication & Authorization

**Admin System**
- Simple password-based authentication for admin panel access
- Client-side auth state stored in localStorage
- Admin verification endpoint (`/api/admin/verify`) - currently returns mock data
- Protected admin routes for blog post management

### Build & Deployment

**Development Mode**
- Single command: `npm run dev` runs TypeScript server with Vite middleware
- Hot module replacement for both client and server code
- Replit-specific plugins for cartographer and dev banner (conditional on REPL_ID)

**Production Build**
- Two-stage build process:
  1. Vite builds client bundle to `dist/public`
  2. esbuild bundles server code to `dist/index.js` with ESM format
- Static file serving of built client assets
- Environment-based configuration (NODE_ENV)

**Type Safety**
- Shared type definitions between client and server via `@shared` alias
- Path aliases configured in both tsconfig.json and vite.config.ts
- Zod schemas for runtime validation matching database schema types

## External Dependencies

### Database & ORM
- **PostgreSQL** via @neondatabase/serverless - Serverless PostgreSQL database
- **Drizzle ORM** - Type-safe ORM with schema definition and migrations
- **drizzle-zod** - Automatic Zod schema generation from Drizzle schemas

### UI Component Libraries
- **Radix UI** - Complete suite of accessible headless components (accordion, dialog, dropdown, navigation, etc.)
- **Shadcn/ui** - Pre-styled component system built on Radix UI
- **Framer Motion** - Animation library for React
- **Embla Carousel** - Carousel/slider component
- **CMDK** - Command menu component

### Form & Validation
- **React Hook Form** - Form state management
- **@hookform/resolvers** - Validation resolver for React Hook Form
- **Zod** - Schema validation library

### Utilities
- **class-variance-authority (CVA)** - Type-safe variant generation for components
- **clsx** & **tailwind-merge** - Conditional CSS class composition
- **date-fns** - Date manipulation and formatting
- **lucide-react** - Icon library

### Development Tools
- **Vite** - Build tool and dev server
- **TypeScript** - Type checking and compilation
- **esbuild** - Fast bundler for server code
- **Replit plugins** - Development tooling specific to Replit environment (@replit/vite-plugin-runtime-error-modal, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner)

### Session Management
- **connect-pg-simple** - PostgreSQL session store for Express (dependency present but not actively configured in visible code)

### Fonts
- **Google Fonts** - Inter (primary font family) and JetBrains Mono (monospace for code/technical details)