import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a test query client with disabled retry and caching
const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                staleTime: 0, // Disable caching completely
                gcTime: 0, // Garbage collect immediately
            },
        },
    });

// Centralized test wrapper
export const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};
