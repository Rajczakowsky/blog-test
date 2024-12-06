import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { vi, Mock } from "vitest";
import PostsPage from "./PostsPage";
import { useGetPosts, useDeletePosts } from "../api";

vi.mock("../api");

vi.mock("use-debounce", () => ({
  useDebounce: (value: string) => [value],
}));

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("PostsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useDeletePosts as Mock).mockReturnValue({ mutate: () => {} });
  });

  it("should render loading state initially", () => {
    (useGetPosts as Mock).mockReturnValue({ isPending: true });
    render(<PostsPage />, { wrapper });
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("should render error state", () => {
    (useGetPosts as Mock).mockReturnValue({ error: true });
    render(<PostsPage />, { wrapper });
    expect(screen.getByText("An error has occurred: true")).toBeInTheDocument();
  });

  it("should render posts", () => {
    const posts = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];
    (useGetPosts as Mock).mockReturnValue({ data: posts });
    render(<PostsPage />, { wrapper });
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  it("should filter posts based on search query", () => {
    const posts = [
      { id: 1, title: "Post 1", body: "Body 1", userId: 1 },
      { id: 2, title: "Post 2", body: "Body 2", userId: 1 },
    ];
    (useGetPosts as Mock).mockReturnValue({ data: posts });
    render(<PostsPage />, { wrapper });

    fireEvent.change(screen.getByPlaceholderText("Search posts..."), {
      target: { value: "Post 1" },
    });

    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });

  it("should delete a post", async () => {
    const mockDelete = vi.fn();
    const posts = [
      { id: 1, title: "Post 1", body: "Body 1" },
      { id: 2, title: "Post 2", body: "Body 2" },
    ];

    (useGetPosts as Mock).mockReturnValue({ data: posts });
    (useDeletePosts as Mock).mockReturnValue({
      mutate: (id: number, { onSuccess }: { onSuccess: () => void }) => {
        mockDelete(id);
        onSuccess();
      },
    });
    render(<PostsPage />, { wrapper });

    const deleteButton = screen.getByLabelText("Delete post titled Post 1");

    fireEvent.click(deleteButton);

    expect(
      screen.getByText("Are you sure you would like to delete this post?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Yes" }));

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(1);
    });
  });
});
