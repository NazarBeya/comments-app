import React from "react";
import { Text, View } from "react-native";
import { LoadingButton } from "../../components/molecules";
import useAuthStore from "../../store/AuthStore";
import { logoutUser } from "../../services/AuthService";

const HomeScreen = () => {
  const { setIsAuth } = useAuthStore();

  const logout = () => {
    logoutUser();
    setIsAuth(false);
  };

  return (
    <View>
      <Text>HomeScreen</Text>
      <LoadingButton title="ewqe" onPress={logout} />
    </View>
  );
};

export { HomeScreen };
