import AsyncStorage from "@react-native-async-storage/async-storage";
import { $api } from "../http";
import { ASYNC_STORAGE_KEYS } from "../common/constans";
import useAuthStore from "../store/AuthStore";

export const fetchRegister = async (formData: FormData) => {
  try {
    const response = await $api.post<{ user: TUser; token: string }>(
      "/auth/register",
      formData
    );

    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.TOKEN_KEY,
      response.data.token
    );

    console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const fetchLogin = async (data: { email: string; password: string }) => {
  try {
    const response = await $api.post<{ user: TUser; token: string }>(
      "/auth/login",
      data
    );
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.TOKEN_KEY,
      response.data.token
    );
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEYS.USER_KEY,
      JSON.stringify(response.data.user)
    );

    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const logoutUser = async () => {
  await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.TOKEN_KEY);
  await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_KEY);
};
