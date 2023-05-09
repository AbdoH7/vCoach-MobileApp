import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home';
import Login from './screens/login';
import Check from './screens/check';
import UserForm from './screens/usersForm';
import DoctorForm from './screens/DoctorsForm'
const Stack=createNativeStackNavigator();
export default function App() {
  const defaultOptions = {
    headerStyle: {
      backgroundColor: '#6495ED', // Replace with your desired background color
      height:10,
    },
    headerTintColor: 'black', // Replace with your desired text color
    headerTitle: '',
  };
  return (
    // <Navigator/>
<NavigationContainer>
<Stack.Navigator
screenOptions={defaultOptions}
>

  <Stack.Screen name="Home" component={Home} options={{headerShown:false}}  />
  <Stack.Screen name="Login" component={Login} options={{headerStyle:{height:20}}} />
  <Stack.Screen name="check"  component={Check} />
  <Stack.Screen name="Doctor" component={DoctorForm} />
  <Stack.Screen name="userForm" component={UserForm} />

</Stack.Navigator>
    </NavigationContainer>
  );
};


