import { QueryClient } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils/error.utils";

export const queryClient = new QueryClient();

queryClient.getQueryCache().subscribe((event) => {
  if (event?.type === "updated") {
    const error = event.query.state.error;

    if (error) {
      console.error(getErrorMessage(error));
    }
  }
});

queryClient.getMutationCache().subscribe((event) => {
  if (event?.type === "updated") {
    const error = event.mutation.state.error;

    if (error) {
      console.error(getErrorMessage(error));
    }
  }
});