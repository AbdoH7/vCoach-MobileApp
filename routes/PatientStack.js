import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientMainScreen from '../screens/PatientScreens/PatientMainScreen';
import SeeDoctorScreen from '../screens/PatientScreens/SeeDoctorScreen';
import AddDoctorScreen from '../screens/PatientScreens/AddDoctorScreen';
import SeeAsignedExercises from '../screens/CommonScreens/SeeAssignedExercises';
import ModelScreen from '../screens/PatientScreens/ModelScreen.js';
import ExerciseContainer from '../screens/CommonScreens/ExerciseContainer';
import ResultsScreen from '../screens/PatientScreens/ResultsScreen';
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
            <Stack.Screen
            name="SeeAsignedExercises"
            component={SeeAsignedExercises}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ModelScreen"
            component={ModelScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ExerciseContainer"
            component={ExerciseContainer}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ResultsScreen"
            component={ResultsScreen}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default PatientStack
