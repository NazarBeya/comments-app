import React from "react";
import { StyleSheet, View } from "react-native";
import { LoadingButton } from "../../components/molecules";
import { scale } from "../../styles/scaling";
import { TextField } from "../../components/atoms";

const RegisterScreen = () => {
  return (
    <View className="bg-white flex-1">
      <View style={styles.test}>
        <TextField label="Name" />
        <TextField label="Email" />
        <TextField label="Password" />
        <LoadingButton title="ewq" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    gap: scale(10),
    padding: scale(15),
  },
});

export { RegisterScreen };
