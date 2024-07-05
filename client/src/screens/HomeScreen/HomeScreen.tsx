import React from "react";
import { Text, View } from "react-native";
import { useGetCommentsQuery } from "../../queries/commentQueries/commentQueries";
import { CommentList } from "../../components/molecules";

const HomeScreen = () => {
  const { isLoading, responce } = useGetCommentsQuery();

  if (isLoading) return null;

  return <>{responce && <CommentList comments={responce}></CommentList>}</>;
};

export { HomeScreen };
