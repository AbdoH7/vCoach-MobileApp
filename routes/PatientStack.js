import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientMainScreen from '../screens/PatientScreens/PatientMainScreen';
import AddDoctorScreen from '../screens/PatientScreens/AddDoctorScreen';
import SeeAsignedExercises from '../screens/CommonScreens/SeeAssignedExercises';
import ModelScreen from '../screens/PatientScreens/ModelScreen.js';
import ExerciseContainer from '../screens/CommonScreens/ExerciseContainer';
import ResultsScreen from '../screens/PatientScreens/ResultsScreen';
import SeeUsersScreen from '../screens/CommonScreens/SeeUsersScreen';
import ListExercisesScreen from '../screens/CommonScreens/ListExercisesScreen';
import AnnouncmentsScreen from '../screens/CommonScreens/AnnouncementsScreen';
import UpdateUserScreen from '../screens/CommonScreens/UpdateUserScreen';
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
            name="HomeScreen"
            component={PatientMainScreen}
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
            <Stack.Screen
            name="SeeDoctorScreen"
            component={SeeUsersScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ListExercisesScreen"
            component={ListExercisesScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="AnnouncmentsScreen"
            component={AnnouncmentsScreen}
            options={{defaultOptions}}
            />
            name="UpdateUserScreen"
            component={UpdateUserScreen}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default PatientStack
