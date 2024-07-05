import React from "react";
import styles from "./AvatarButton.style";
import { TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { LoaderDark } from "../../atoms";

interface AvatarButtonProps {
  onPress?: () => void;
  source?: string;
  isLoading?: boolean;
}
export const AvatarButton: React.FC<AvatarButtonProps> = ({
  onPress,
  source,
  isLoading,
}) => {
  const { avatar, loader, loaderConteiner } = styles();

  if (isLoading) {
    return (
      <View style={{ ...avatar, ...loaderConteiner }}>
        <LoaderDark style={loader} />
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      {source ? (
        <Image style={avatar} source={{ uri: source }} />
      ) : (
        <View style={avatar}></View>
      )}
    </TouchableOpacity>
  );
};
