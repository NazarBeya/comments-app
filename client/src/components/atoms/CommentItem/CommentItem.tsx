import { View, Text } from "react-native";
import { UserData } from "../UserAvatar/UserData";
import styles from "./CommentItem.style";

export const CommentItem: React.FC<{ comment: TComment }> = ({ comment }) => {
  const { container } = styles();
  return (
    <View style={container}>
      <View>
        <UserData user={comment.author} />
      </View>

      {comment.children && comment.children.length > 0 && (
        <View>
          {comment.children.map((child) => (
            <CommentItem key={child.id} comment={child} />
          ))}
        </View>
      )}
    </View>
  );
};
