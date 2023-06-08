import React from 'react';
import MainMenu from '../screens/HomeScreens/MainMenu';
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

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
            name="MainMenu"
            component={MainMenu}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default HomeStack
