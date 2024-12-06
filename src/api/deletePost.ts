import { useMutation } from "@tanstack/react-query";
import { apiPath } from "../constants";

export function useDeletePosts() {
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`${apiPath}/posts/${id}`, {
        method: "DELETE",
      });
    },
  });
}
