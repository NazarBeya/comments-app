import React, { useEffect, useMemo, useState } from "react";
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
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "../../common/constans";
import useAuthStore from "../../store/AuthStore";

const AuthScreen = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuth } = useAuthStore();

  const { container, formContainer, registerButton } = styles();

  const navigation = useNavigation();

  const methods = useForm({ resolver: yupResolver(AuthSchema) });

  useEffect(() => {
    const test = async () => {
      const dasd = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.TOKEN_KEY);
      console.log(dasd);
      const dasewd = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_KEY);
      console.log(dasewd);
    };
    test();
  }, []);

  const onSubmit = async (formData: AuthFormValue) => {
    setIsLoading(true);
    const data = await fetchLogin({
      email: formData.email,
      password: formData.password,
    });
    if (data === "User not found") {
      setError(data);
      setIsLoading(false);
    }
    if (data === "Invalid password") {
      setError(data);
      setIsLoading(false);
    }
    if (data) {
      setIsLoading(false);
      setIsAuth(true);
    }
  };

  return (
    <SafeAreaView style={container}>
      <View style={formContainer}>
        {error && <Text>{error}</Text>}
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
      <LoadingButton
        title="Login"
        onPress={methods.handleSubmit(onSubmit)}
        isLoaing={isLoading}
      />
    </SafeAreaView>
  );
};

export { AuthScreen };
