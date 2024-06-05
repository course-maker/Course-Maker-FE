import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PageRouter from "./PageRouter";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <PageRouter />
      </QueryClientProvider>
    </>
  );
}

export default App;
