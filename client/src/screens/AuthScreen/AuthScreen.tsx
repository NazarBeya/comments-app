import React, { useMemo } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import styles from "./AuthScreen.style";
import { TextField } from "../../components/atoms";
import { SafeAreaView } from "react-native-safe-area-context";
import { FormProvider, useForm } from "react-hook-form";
import { LoadingButton } from "../../components/molecules";
import { useNavigation } from "@react-navigation/native";
import { RouterNames } from "../../types/router.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormValue, AuthSchema } from "../../../validation/AuthValidation";
import { fetchLogin } from "../../services/AuthService";

const AuthFromValues = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const { container, formContainer, registerButton } = styles();

  const navigation = useNavigation();

  const methods = useForm({ resolver: yupResolver(AuthSchema) });

  const onSubmit = async (formData: AuthFormValue) => {
    const data = await fetchLogin({
      email: formData.email,
      password: formData.password,
    });
    console.log(data);
  };

  return (
    <SafeAreaView style={container}>
      <View style={formContainer}>
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
        <TouchableOpacity
          onPress={() => navigation.navigate(RouterNames.REGISTER)}
        >
          <Text style={registerButton}>Go to Registration</Text>
        </TouchableOpacity>
      </View>
      <LoadingButton title="Login" onPress={methods.handleSubmit(onSubmit)} />
    </SafeAreaView>
  );
};

export { AuthScreen };
