import { renderHook } from "@testing-library/react-hooks";
import { useDeletePosts } from "./deletePost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import { apiPath } from "../constants";
const queryClient = new QueryClient();

global.fetch = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useDeletePosts", () => {
  it("should call fetch with the correct URL and method", async () => {
    const { result, waitFor } = renderHook(() => useDeletePosts(), {
      wrapper,
    });

    const id = 1;
    result.current.mutate(id);

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(`${apiPath}/posts/${id}`, {
        method: "DELETE",
      }),
    );
  });

  it("should handle errors", async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject("API is down"),
    );

    const { result, waitFor } = renderHook(() => useDeletePosts(), {
      wrapper,
    });

    const id = 1;
    result.current.mutate(id);

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
