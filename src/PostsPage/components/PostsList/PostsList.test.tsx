import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { PostsList } from "./PostsList";
import { PostType } from "../../../types";

describe("PostsList", () => {
  const posts: PostType[] = [
    { id: 1, title: "Post 1", body: "This is the first post", userId: 1 },
    { id: 2, title: "Post 2", body: "This is the second post", userId: 1 },
  ];

  it("renders posts correctly", () => {
    render(<PostsList posts={posts} onDelete={() => {}} />);

    posts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  it("calls onDelete when delete button is clicked", () => {
    const onDelete = vi.fn();
    render(<PostsList posts={posts} onDelete={onDelete} />);

    posts.forEach((post) => {
      const deleteButton = screen.getByLabelText(
        `Delete post titled ${post.title}`,
      );
      fireEvent.click(deleteButton);
      expect(onDelete).toHaveBeenCalledWith(post.id);
    });

    expect(onDelete).toHaveBeenCalledTimes(posts.length);
  });
});
