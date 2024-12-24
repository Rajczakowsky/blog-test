import { useQuery } from "@tanstack/react-query";
import { apiPath } from "../constants";
import { PostType } from "@/types";

export const useGetPostsCount = () => {
  const response = useQuery<PostType[]>({
    queryKey: ["postsCount"],
    queryFn: async () => {
      const response = await fetch(`${apiPath}/posts`);
      return await response.json();
    },
  });

  const postsCount = response.data?.length || 0;
  return { ...response, data: postsCount };
};
