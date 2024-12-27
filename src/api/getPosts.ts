import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { apiPath } from "../constants";
import { PostType } from "@/types";

export function useGetPosts(start: number = 0, limit: number = 5) {
  return useQuery<PostType[]>({
    queryKey: ["posts", start],
    queryFn: async () => {
      const response = await fetch(
        `${apiPath}/posts?_start=${start}&_limit=${limit}`
      );
      return await response.json();
    },
    placeholderData: keepPreviousData,
  });
}
