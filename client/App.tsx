import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootRouter } from "./src/router/RootRouter";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RootRouter />
    </QueryClientProvider>
  );
}
