import React from "react";
import { View, Text } from "react-native";
import { Image } from "expo-image";
import styles from "./UserData.style";

export const UserData: React.FC<{ user: TUser }> = ({ user }) => {
  const { container, image } = styles();
  return (
    <View style={container}>
      <Image style={image} source={user.avatar} />
      <Text>{user.username}</Text>
    </View>
  );
};
