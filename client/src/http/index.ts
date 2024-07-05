import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ASYNC_STORAGE_KEYS } from "../common/constans";

export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.TOKEN_KEY);

  config.headers.authorization = `Bearer ${token}`;
  return config;
});
