import React from 'react';
import AuthMain from "../screens/AuthScreens/AuthMain";
import Login from "../screens/AuthScreens/Login";
import CheckType from "../screens/AuthScreens/CheckType";
import SignUp from '../screens/AuthScreens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const defaultOptions = {
    headerStyle: {
      backgroundColor: '#6495ED', // Replace with your desired background color
      height:10,
    },
    headerTintColor: 'black', // Replace with your desired text color
    headerTitle: '',
  };

const Stack = createNativeStackNavigator()

const AuthenticationStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
            name="AuthMain"
            component={AuthMain}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="CheckType"
            component={CheckType}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default AuthenticationStack
