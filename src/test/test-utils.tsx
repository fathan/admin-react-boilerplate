import { render } from '@testing-library/react'
import { Provider as ChakraProvider } from "@/components/ui/provider";

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <ChakraProvider>
      {ui}
    </ChakraProvider>
  )
}