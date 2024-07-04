import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage'
import axios from 'axios'

export const API_URL = process.env.SERVER_URL

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken')

  config.headers.authorization = `Bearer ${token}`
  return config
})
