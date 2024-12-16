import Posts from "./PostsPage/PostsPage";
import Post from "./PostsPage/components/Post/Post";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Posts />}></Route>
            <Route path="/post/:id" element={<Post />}></Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
