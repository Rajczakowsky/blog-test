import { useQuery } from "@tanstack/react-query";
import { apiPath } from "../constants";
import { PostType } from "@/types";

export function useGetPosts() {
  return useQuery<PostType[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await fetch(`${apiPath}/posts`);
      return await response.json();
    },
  });
}
