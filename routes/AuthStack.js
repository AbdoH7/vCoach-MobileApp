import React, { useContext, useEffect,useState } from "react";
import {View,ActivityIndicator,Text} from 'react-native'
import AuthMain from "../screens/AuthScreens/AuthMain";
import Login from "../screens/AuthScreens/Login";
import CheckType from "../screens/AuthScreens/CheckType";
import SignUp from "../screens/AuthScreens/SignUp";
import SplashScreen from "../screens/AuthScreens/SplashScreen";
import CarouselSlider from "../screens/AuthScreens/CarouselSlider";
import { AuthContext } from "../context/AuthContext.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const defaultOptions = {
  headerStyle: {
    backgroundColor: "#6495ED", // Replace with your desired background color
    height: 10,
  },
  headerTintColor: "black", // Replace with your desired text color
  headerTitle: "",
};

const Stack = createNativeStackNavigator();

const AuthenticationStack = () => {
  const { checkFirstTime } = useContext(AuthContext);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(null);
  useEffect(() => {
    const check = async () => {
      let isFirstTime = await checkFirstTime() ? true : false;
      setIsFirstTimeUser(isFirstTime)
    };
    check();
  }, []);
  if (isFirstTimeUser === null) {
    // Render a loading state or any other UI while checking isFirstTimeUser
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} />
      <Text>Loading</Text>
    </View>
    );
  }
  const initialRouteName = isFirstTimeUser ? 'SplashScreen' : 'AuthMain';
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ defaultOptions }}
      />
      <Stack.Screen
        name="CarouselSlider"
        component={CarouselSlider}
        options={{ defaultOptions }}
      />
      <Stack.Screen
        name="AuthMain"
        component={AuthMain}
        options={{ defaultOptions }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ defaultOptions }}
      />
      <Stack.Screen
        name="CheckType"
        component={CheckType}
        options={{ defaultOptions }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ defaultOptions }}
      />
    </Stack.Navigator>
  );
};
export default AuthenticationStack;
