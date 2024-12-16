import Posts from "./PostsPage/PostsPage";
import { GlobalStyles } from "./globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
