# Yardzen Coding Challenge

## Overview

Welcome to the Yardzen Full-Stack Coding Challenge! This exercise is designed to evaluate both your frontend and backend development skills while building something fun and practical. The challenge is designed to take approximately 2-4 hours to complete.

## Project Description

You'll be building a full-stack shopping cart application. On the frontend, users will be able to select items from a catalog and add them to their cart. On the backend, you'll create the API endpoints and database interactions to support these operations. The application will display items grouped by their types, manage cart state, and calculate totals.

## Technical Requirements

### Core Technologies

Frontend:

- React
- TypeScript
- Modern CSS approaches

Backend:

- Node.js
- Express or NestJS
- TypeScript
- SQL database (provided via Docker)

### Setup Requirements

- Docker (for running the provided database)
  - Docker Desktop version 2.2.0.0 or later
  - Docker Engine version 19.03.0 or later
  - Docker Compose version 1.25.0 or later
- Node.js v22.12.0 (LTS) or later
- pnpm

## Acceptance Criteria

### Core Requirements

1. Item Display

   - Fetch and display items with prices via API
   - Group items by their types
   - Frontend must fetch data through API endpoints (no direct database access)

2. Item Selection

   - Users can check/uncheck items on the frontend
   - Selected items can be added to cart

3. Cart Management
   - "Add to Cart" button adds checked items to cart
   - Only one cart should exist in the database
   - Cart should be upserted on each "Add to Cart" action (create if none exists, update if it does)
   - Ability to fetch and display cart items with total price

### Stretch Goals

- Implement filtering/search functionality
- Make the application mobile responsive

## Getting Started

1. Clone this repository

```bash
git clone https://github.com/Yardzen-Inc/coding-challenge
```

```bash
cd coding-challenge
```

2. Install dependencies

```bash
pnpm install
```

3. Start the database

```bash
pnpm compose
```

4. Start development servers

```bash
pnpm dev
```

This will start both the frontend and backend servers:

- Frontend (Next.js): http://localhost:3000
- Backend (NestJS): http://localhost:3333

## Project Structure

This is a monorepo using Nx for workspace management:

- `apps/web`: Next.js frontend application
- `apps/api`: NestJS backend application
- `packages/*`: Shared libraries (if any)
