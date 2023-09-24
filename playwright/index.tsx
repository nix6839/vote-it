import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
beforeMount(async ({ App }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
});
