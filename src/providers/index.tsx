import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes"
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { ModalProvider } from "./modal.providers";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
