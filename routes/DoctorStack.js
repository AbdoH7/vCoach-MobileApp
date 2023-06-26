import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorMainScreen from '../screens/DoctorScreens/DoctorMainScreen';
import AssignPatientScreen from '../screens/DoctorScreens/AssignPatientScreen';
import SeePatientScreen from '../screens/DoctorScreens/SeePatientScreen';
import SeeInvitesList from '../screens/DoctorScreens/SeeInvitesList';
import AssignExercisesScreen from '../screens/DoctorScreens/AssignExercisesScreen';
import RequestExerciseScreen from '../screens/DoctorScreens/RequestExerciseScreen';
const defaultOptions = {
    headerStyle: {
      backgroundColor: '#6495ED', // Replace with your desired background color
      height:10,
    },
    headerTintColor: 'black', // Replace with your desired text color
    headerTitle: '',
  };

const Stack = createNativeStackNavigator()

const DoctorStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
            name="DoctorMainScreen"
            component={DoctorMainScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="AssignPatientScreen"
            component={AssignPatientScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SeePatientScreen"
            component={SeePatientScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SeeInvitesList"
            component={SeeInvitesList}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="AssignExercisesScreen"
            component={AssignExercisesScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="RequestExerciseScreen"
            component={RequestExerciseScreen}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default DoctorStack
