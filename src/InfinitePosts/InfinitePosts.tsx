import { SearchForm } from "../PostsPage/components/SearchForm/SearchForm";
import { useGetInfinitePosts } from "../api";
import {
  PostsListContainer,
  Container,
  PageHeading
} from "../PostsPage/styles";
import { useRef, useMemo, useCallback, useState } from "react";
import { useDebounce } from "use-debounce";
import { PostsWrapper} from './styles';

export default function InfinitePosts() {
  const [query, setQuery] = useState("");
  const observer = useRef<null>(null);

  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetInfinitePosts();

  const onValueChange = (value: string) => {
    setQuery(value);
  };

  const [debouncedQuery] = useDebounce(query, 500);

  const filteredPosts = useMemo(() => {
    const items = data?.pages?.map((page) => page.docs).flat();

    if (!debouncedQuery) return items;

    return (
      items?.filter((post) =>
        `${post.title}`.toLowerCase().includes(debouncedQuery.toLowerCase())
      ) || null
    );
  }, [data, debouncedQuery]);

  const lastItem = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage]
  );

  return (
    <>
          <PageHeading>Loading Loard of the rings books</PageHeading>
          <SearchForm query={query} setQuery={onValueChange} />

    
    <Container>
      <PostsListContainer>
        <PostsWrapper>
          {filteredPosts &&
            filteredPosts?.map((post, index) => {
              if (index + 1 === filteredPosts.length) {
                return (
                  <div
                    key={post.key + post.title}
                    ref={lastItem}
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid lightgrey",
                      opacity: isFetchingNextPage ? 0.5 : 1,
                      transition: "opacity 0.5s",
                    }}
                  >
                    {post.title}
                  </div>
                );
              } else {
                return (
                  <div
                    key={post.key + post.title}
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid lightgrey",
                      opacity: isFetchingNextPage ? 0.5 : 1,
                      transition: "opacity 0.5s",
                    }}
                  >
                    {post.title}
                  </div>
                );
              }
            })}

          <div style={{ padding: "15px" }}>
            {isFetchingNextPage && " Loading..."}
          </div>
        </PostsWrapper>
      </PostsListContainer>
    </Container>
          </>
    
  );
}
