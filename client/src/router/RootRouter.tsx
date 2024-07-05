import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RouterNames } from "../types/router.type";
import { AuthScreen, HomeScreen, RegisterScreen } from "../screens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ASYNC_STORAGE_KEYS } from "../common/constans";
import useAuthStore from "../store/AuthStore";

const RootStack = createNativeStackNavigator();

const RootRouter = () => {
  const { isAuth, setIsAuth } = useAuthStore();

  useEffect(() => {
    const checkIsAuth = async () => {
      const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.TOKEN_KEY);
      const user = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_KEY);
      if (token && user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    };
    checkIsAuth();
  }, [isAuth]);
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {isAuth ? (
          <RootStack.Screen
            name={RouterNames.HOME}
            component={HomeScreen}
            options={{ title: "Home" }}
          />
        ) : (
          <>
            <RootStack.Screen
              name={RouterNames.AUTH}
              component={AuthScreen}
              options={{ title: "Login" }}
            />
            <RootStack.Screen
              name={RouterNames.REGISTER}
              component={RegisterScreen}
              options={{ title: "Registration" }}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootRouter };
