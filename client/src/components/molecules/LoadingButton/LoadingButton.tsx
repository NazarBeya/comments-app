import React, { FC } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import styles from "./LoadingButton.style";
import { Loader } from "../../atoms";

interface LoadingButtonProps extends TouchableOpacityProps {
  title: string;
  isLoaing?: boolean;
}
export const LoadingButton: FC<LoadingButtonProps> = ({
  isLoaing,
  title,
  ...rest
}) => {
  const { container, titleStyle } = styles();

  return (
    <TouchableOpacity {...rest} style={container}>
      {isLoaing ? (
        <Loader />
      ) : (
        <View>
          <Text style={titleStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
