import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

interface LoaderProps {
  style?: any;
}
export const LoaderDark: React.FC<LoaderProps> = ({ style }) => {
  return (
    <View className="z-10">
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 18,
          ...style,
        }}
        colorFilters={[{ keypath: "Loader", color: "red" }]}
        source={require("../../../assets/loader-animated-icon-dark.json")}
      />
    </View>
  );
};
