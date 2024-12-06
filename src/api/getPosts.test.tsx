import { describe, it, expect, vi } from "vitest";
import { useGetPosts } from "./getPosts";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { apiPath } from "../constants";

const queryClient = new QueryClient();

describe("useGetPosts", () => {
  it("fetches and returns posts", async () => {
    const mockPosts = [
      { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
      { userId: 2, id: 2, title: "Post 2", body: "Body 2" },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockPosts),
      }),
    ) as unknown as jest.Mock;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result, waitFor } = renderHook(() => useGetPosts(), { wrapper });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(mockPosts);
    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/posts`);
  });
});
