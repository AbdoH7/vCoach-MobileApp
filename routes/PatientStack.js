import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientMainScreen from '../screens/PatientScreens/PatientMainScreen';
import SeeDoctorScreen from '../screens/PatientScreens/SeeDoctorScreen';
import AddDoctorScreen from '../screens/PatientScreens/AddDoctorScreen';
const defaultOptions = {
    headerStyle: {
      backgroundColor: '#6495ED', // Replace with your desired background color
      height:10,
    },
    headerTintColor: 'black', // Replace with your desired text color
    headerTitle: '',
  };

const Stack = createNativeStackNavigator()

const PatientStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
            name="PatientMainScreen"
            component={PatientMainScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SeeDoctorScreen"
            component={SeeDoctorScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="AddDoctorScreen"
            component={AddDoctorScreen}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default PatientStack
