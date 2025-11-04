# Users Dashboard

A dashboard application to manage users, built with React, TypeScript, and Vite.

## Table of Contents

- [Getting started](#getting-started)
- [Available commands](#available-commands)
- [Project structure](#project-structure)
- [Usage](#usage)
    - [Routes configuration](#routes-configuration)
    - [Fetching data](#fetching-data)
    - [Utilities](#utilities)
        - [Json component](#json-component)

## Getting started

This project uses `pnpm` as package manager, if don't want to use it, you can use `npm`.
To install dependencies, run:

```bash
pnpm install
```

or with npm:

```bash
npm install
```

## Available commands

This table lists all the npm/pnpm scripts available in this project for development, testing, and deployment workflows.

| Command              | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| `pnpm dev`           | Start the development server using Vite                      |
| `pnpm build`         | Compile TypeScript and build the project for production      |
| `pnpm preview`       | Preview the production build locally using Vite              |
| `pnpm lint`          | Run ESLint to check code quality and style                   |
| `pnpm format`        | Format code using Prettier                                   |
| `pnpm test`          | Run tests using Vitest                                       |
| `pnpm release`       | Create a new release using release-it                        |
| `pnpm sync:lockfile` | Synchronize package-lock.json with package.json dependencies |

## Project structure

The project is structured as follows:

```
src/
├── assets/          # Static assets like images and styles
├── core/            # Core functionalities (API clients, hooks, models)
├── features/        # Feature-specific components and pages
├── components/      # Reusable UI components
├── test/            # Test utilities and mocks
├── types/           # TypeScript type definitions
├── index.css        # Global styles
├── main.tsx         # Application entry point
└── routes.ts        # Application routes configuration
```

## Usage

### Routes configuration

The routes are defined in `src/routes.ts`. You can add, remove, or modify routes in this file as needed. This project uses [@tanstack/react-router](https://tanstack.com/router/v1) for routing. All configurations respect the library's conventions.

```ts
export const routes: RouterConfig = {
    rootRoute: {
        component: Root,
    },
    routes: [
        {
            path: "/",
            component: Index,
        },
        {
            path: "/$id",
            loader: async ({ params }) => {
                return { id: params.id };
            },
            component: Detail,
        },
    ],
};
```

### Fetching data

Data fetching is handled using [React Query](https://tanstack.com/query/v4). The project includes a `QueryLayout` component that simplifies data fetching for routes. You can use this component to wrap your route components and provide the necessary query configurations.

```tsx
<QueryLayout<User>
    queryClientOptions={{
        queryKeys: ["user"],
        queryParams: {
            id: 1,
        },
        path: ["1", "details"],
    }}
>
    {(data) => <Json obj={data} />}
</QueryLayout>
```

### Utilities

#### Json component

The `Json` component can be used to display JSON data for debugging purposes.

```tsx
<Json obj={data} />
```
