import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

interface LoaderProps {
  style?: any;
}
export const LoaderLight: React.FC<LoaderProps> = ({ style }) => {
  return (
    <View>
      <LottieView
        autoPlay
        style={{
          width: 50,
          height: 18,
          ...style,
        }}
        colorFilters={[{ keypath: "Loader", color: "red" }]}
        source={require("../../../assets/loader-animated-icon.json")}
      />
    </View>
  );
};
