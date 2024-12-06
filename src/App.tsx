import Posts from "./PostsPage/PostsPage";
import { GlobalStyles } from "./globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Posts />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
