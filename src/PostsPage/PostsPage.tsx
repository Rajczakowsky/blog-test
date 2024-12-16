import { useState, useMemo, useEffect } from "react";
import { useGetPosts, useDeletePosts } from "../api";
import { PostsList } from "./components/PostsList/PostsList";
import { SearchForm } from "./components/SearchForm/SearchForm";
import type { PostType } from "../types";
import {
  Container,
  PostsCount,
  Message,
  PageHeading,
  PostsWrapper,
  PostsListContainer,
  Button,
  PageIndicator,
  Pagination,
} from "./styles";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

import { showDeleteConfirmation } from "../utils";

export const PostsPage = () => {
  const offSet = 10;
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("page") || "1";

  const [startPage, setStartPage] = useState(1);

  // Adding this useEffect only to imitate deleting posts
  const [statePostsList, setStatePostsList] = useState<PostType[]>([]);
  const { data: postsList, isPending, error } = useGetPosts(startPage, offSet);
  const { mutate: deletePost, error: errorDeletingPost } = useDeletePosts();
  const currentPage = Math.floor(startPage / offSet + 1);

  useEffect(() => {
    const intSearchParamsPage = parseInt(searchParamsPage, 10);
    setStartPage(
      intSearchParamsPage === 1 ? 1 : intSearchParamsPage * offSet - offSet
    );
  }, [searchParamsPage]);

  const updateSearchParams = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const [debouncedQuery] = useDebounce(query, 300);

  const filteredPosts = useMemo(() => {
    return (
      postsList?.filter((post) =>
        `${post.title} ${post.body}`
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      ) || []
    );
  }, [postsList, debouncedQuery]);

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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PostsListContainer>
            <PostsWrapper>
              {filteredPosts.length > 0 && (
                <PostsList posts={filteredPosts} onDelete={handleDelete} />
              )}
              {isPending && (
                <PostsCount>{isPending && "Loading posts..."}</PostsCount>
              )}
              {filteredPosts.length === 0 && !isPending && (
                <PostsCount>No posts found</PostsCount>
              )}
            </PostsWrapper>
          </PostsListContainer>

          <Pagination>
            <Button
              onClick={() => {
                updateSearchParams(currentPage - 1);
              }}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <PageIndicator>Current Page: {currentPage}</PageIndicator>
            <Button
              onClick={() => {
                updateSearchParams(currentPage + 1);
              }}
              disabled={currentPage === 10}
            >
              Next
            </Button>
          </Pagination>
        </div>
      </Container>
    </>
  );
};

export default PostsPage;
