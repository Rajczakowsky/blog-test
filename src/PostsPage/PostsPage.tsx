import { useEffect, useState, useMemo } from "react";
import { useGetPosts, useDeletePosts } from "../api";
import { PostsList } from "./components/PostsList/PostsList";
import { SearchForm } from "./components/SearchForm/SearchForm";
import type { PostType } from "../types";
import { Container, PostsCount, Message, PageHeading } from "./styles";
import { useDebounce } from "use-debounce";
import { showDeleteConfirmation } from "../utils";

/**
 * The `PostsPage` component is responsible for displaying a list of blog posts with search and delete functionality.
 *
 * Features:
 * - Fetches posts data using the `useGetPosts` hook.
 * - Allows users to search posts by title and body content.
 * - Allows users to delete posts using the `useDeletePosts` hook.
 * - Displays the number of posts found based on the search query.
 * - Handles loading and error states during data fetching and deletion.
 *
 * @component
 * @example
 * return (
 *   <PostsPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 */

export const PostsPage = () => {
  const [query, setQuery] = useState("");
  // Adding this useEffect only to imitate deleting posts
  const [statePostsList, setStatePostsList] = useState<PostType[]>([]);
  const { data: postsList, isPending, error } = useGetPosts();
  const { mutate: deletePost, error: errorDeletingPost } = useDeletePosts();

  // Adding this useEffect to update the state when the postsList changes
  // because of fake API not deleting actial data
  useEffect(() => {
    if (postsList) {
      setStatePostsList(postsList);
    }
  }, [postsList]);

  const [debouncedQuery] = useDebounce(query, 300);

  const filteredPosts = useMemo(() => {
    return (
      statePostsList?.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase()),
      ) || []
    );
  }, [statePostsList, debouncedQuery]);

  /**
   * Handles the deletion of a post.
   *
   * @param {number} id - The ID of the post to delete.
   */
  const handleDelete = (id: number) => {
    showDeleteConfirmation(() => deletePostWithSuccessHandler(id));
  };

  /**
   * Deletes a post and updates the state on success.
   *
   * @param {number} id - The ID of the post to delete.
   */
  const deletePostWithSuccessHandler = (id: number) => {
    deletePost(id, {
      onSuccess: (_, variables) => {
        const postsWithUpdates =
          statePostsList?.filter((post) => post.id !== variables) || [];
        setStatePostsList(postsWithUpdates);
      },
    });
  };

  if (error || errorDeletingPost)
    return (
      <Message>{`An error has occurred: ${error || errorDeletingPost}`}</Message>
    );

  return (
    <>
      <PageHeading>Twinkl Blog</PageHeading>
      <Container>
        <SearchForm query={query} setQuery={setQuery} />
        <PostsCount>
          {isPending
            ? "Loading posts..."
            : `${filteredPosts.length} posts found`}
        </PostsCount>
        {filteredPosts.length > 0 && (
          <PostsList posts={filteredPosts} onDelete={handleDelete} />
        )}
      </Container>
    </>
  );
};

export default PostsPage;
