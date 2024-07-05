import React from "react";
import { Text, View } from "react-native";
import { CommentList, LoadingButton } from "../../components/molecules";
import useAuthStore from "../../store/AuthStore";
import { logoutUser } from "../../services/AuthService";
import { useGetCommentsQuery } from "../../queries/commentQueries/commentQueries";

const HomeScreen = () => {
  const { setIsAuth } = useAuthStore();

  const { isLoading, responce } = useGetCommentsQuery();

  const logout = () => {
    logoutUser();
    setIsAuth(false);
  };

  if (isLoading) return null;

  return (
    <View>
      <Text>HomeScreen</Text>
      {responce && <CommentList comments={responce} />}

      <LoadingButton title="ewqe" onPress={logout} />
    </View>
  );
};

export { HomeScreen };
