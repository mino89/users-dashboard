# Users Dashboard

A dashboard application to manage users, built with React, TypeScript, and Vite.

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

## Routes configuration

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
