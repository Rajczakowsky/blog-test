import { useState, useMemo, useEffect } from "react";
import { useGetPosts, useDeletePosts, useGetPostsCount } from "../api";
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
} from "./styles";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "./components/Pagination/Pagination";

import { showDeleteConfirmation } from "../utils";

export const PostsPage = () => {
  const offSet = 10;
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsPage = searchParams.get("page") || "1";

  const [startPage, setStartPage] = useState(1);

  const [statePostsList, setStatePostsList] = useState<PostType[]>([]);
  const { data: postsList, isPending, error } = useGetPosts(startPage, offSet);
  const {
    data: postsCount,
    isPending: loadingCount,
    error: countError,
  } = useGetPostsCount();
  const { mutate: deletePost, error: errorDeletingPost } = useDeletePosts();

  const onValueChange = (value: string) => {
    setSearchParams({ page: "1" });
    setQuery(value);
  };

  useEffect(() => {
    const intSearchParamsPage = parseInt(searchParamsPage, 10);
    setStartPage(
      intSearchParamsPage === 1 ? 1 : intSearchParamsPage * offSet - offSet
    );
  }, [searchParamsPage]);

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

  const handleDelete = (id: number) => {
    showDeleteConfirmation(() => deletePostWithSuccessHandler(id));
  };

  const deletePostWithSuccessHandler = (id: number) => {
    deletePost(id, {
      onSuccess: (_, variables) => {
        const postsWithUpdates =
          statePostsList?.filter((post) => post.id !== variables) || [];
        setStatePostsList(postsWithUpdates);
      },
    });
  };

  if (error || errorDeletingPost || countError)
    return (
      <Message>{`An error has occurred: ${error || errorDeletingPost}`}</Message>
    );

  return (
    <>
      <PageHeading>Twinkl Blog</PageHeading>
      <Container>
        <SearchForm query={query} setQuery={onValueChange} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <PostsListContainer>
            <PostsWrapper>
              {filteredPosts.length > 0 && !loadingCount && (
                <PostsList posts={filteredPosts} onDelete={handleDelete} />
              )}
              {(isPending || loadingCount) && (
                <PostsCount>{isPending && "Loading posts..."}</PostsCount>
              )}
              {filteredPosts.length === 0 && !isPending && !loadingCount && (
                <PostsCount>No posts found</PostsCount>
              )}
            </PostsWrapper>
          </PostsListContainer>

          <Pagination postsCount={postsCount} />
        </div>
      </Container>
    </>
  );
};

export default PostsPage;
