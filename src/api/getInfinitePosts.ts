import { useInfiniteQuery } from "@tanstack/react-query";

const fetchPosts = async (pageParam: number) => {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=the+lord+of+the+rings&page=${pageParam}&limit=100`
  );
  return res.json();
};

export function useGetInfinitePosts() {
  return useInfiniteQuery({
    queryKey: ['books'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.numFound < lastPage.start) {
        return undefined;
      }

      return lastPage.start === 0 ? 2 : (lastPage.start + 200) / 100;
    },
  });
}
