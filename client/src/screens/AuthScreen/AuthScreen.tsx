import React, { useMemo } from "react";
import { Text, View } from "react-native";
import styles from "./AuthScreen.style";
import { TextField } from "../../components/atoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "../../components/molecules";

const AuthFromValues = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const { container } = styles();

  const methods = useForm({ defaultValues: AuthFromValues });

  return (
    <SafeAreaView style={container}>
      <View>
        <FormProvider {...methods}>
          <TextField
            placeholder="Email"
            label="Email"
            isControled
            name="email"
          />
          <TextField
            label="Password"
            placeholder="Password"
            isControled
            name="password"
          />
        </FormProvider>
      </View>
      <LoadingButton
        title="Login"
        isLoaing
        onPress={methods.handleSubmit((data) => console.log(data))}
      />
    </SafeAreaView>
  );
};

export { AuthScreen };
