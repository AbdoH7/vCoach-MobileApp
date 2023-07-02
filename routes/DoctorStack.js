import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DoctorMainScreen from '../screens/DoctorScreens/DoctorMainScreen';
import AddPatientScreen from '../screens/DoctorScreens/AddPatientScreen';
import SeeUsersScreen from '../screens/CommonScreens/SeeUsersScreen';
import SeeInvitesList from '../screens/DoctorScreens/SeeInvitesList';
import AssignExercisesScreen from '../screens/DoctorScreens/AssignmentsAndExercises/AssignExercisesScreen';
import RequestExerciseScreen from '../screens/DoctorScreens/RequestExerciseScreen';
import ListExercisesScreen from '../screens/CommonScreens/ListExercisesScreen';
import ExerciseDetailsScreen from '../screens/DoctorScreens/AssignmentsAndExercises/ExerciseDetailsScreen';
import SeeAssignedExercises from '../screens/CommonScreens/SeeAssignedExercises';
import ExerciseContainer from '../screens/CommonScreens/ExerciseContainer';
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

const DoctorStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
            name="DoctorMainScreen"
            component={DoctorMainScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="AddPatientScreen"
            component={AddPatientScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SeePatientScreen"
            component={SeeUsersScreen}
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
            <Stack.Screen
            name="ListExercisesScreen"
            component={ListExercisesScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ExerciseDetailsScreen"
            component={ExerciseDetailsScreen}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="SeeAssignedExercises"
            component={SeeAssignedExercises}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="ExerciseContainer"
            component={ExerciseContainer}
            options={{defaultOptions}}
            />
            <Stack.Screen
            name="UpdateUserScreen"
            component={UpdateUserScreen}
            options={{defaultOptions}}
            />
        </Stack.Navigator>
    )
}
export default DoctorStack
