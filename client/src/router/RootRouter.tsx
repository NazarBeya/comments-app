import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RouterNames } from "../types/router.type";
import { AuthScreen, HomeScreen, RegisterScreen } from "../screens";

const RootStack = createNativeStackNavigator();

const RootRouter = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name={RouterNames.HOME} component={HomeScreen} />
        <RootStack.Screen name={RouterNames.AUTH} component={AuthScreen} />
        <RootStack.Screen
          name={RouterNames.REGISTER}
          component={RegisterScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { RootRouter };
