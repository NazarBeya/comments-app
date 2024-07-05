import { useQuery } from "@tanstack/react-query";
import { COMMENT_QUERIES_KEYS } from "./commentQueriesKeys";
import { getAllComments } from "../../services/CommentService";

export const useGetCommentsQuery = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: [COMMENT_QUERIES_KEYS.GET_COMMENTS_KEY],
    queryFn: getAllComments,
  });

  return { isLoading, responce: data, error };
};
