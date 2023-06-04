import * as React from 'react';
import Home from "../screens/home";
import Login from "../screens/login";
import Check from "../screens/check";
import Form from '../screens/Form';
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
            name="Home"
            component={Home}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="Login"
            component={Login}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="check"
            component={Check}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="Form"
            component={Form}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}

export default AuthenticationStack