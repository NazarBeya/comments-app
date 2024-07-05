import React from "react";
import { View } from "react-native";
import { CommentItem } from "../../atoms";

export const CommentList: React.FC<{ comments: TComment[] }> = ({
  comments,
}) => {
  return (
    <View>
      {comments.map((comment) => {
        return (
          <View>
            <CommentItem comment={comment}></CommentItem>
          </View>
        );
      })}
    </View>
  );
};
