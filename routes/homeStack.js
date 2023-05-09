import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';



import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from 'react-navigation';
import Home from "../screens/home";
import Login from "../screens/login";
import Check from "../screens/check";
import UserForm from "../screens/usersForm";
import DoctorForm from "../screens/DoctorsForm";
// const Stack = createNativeStackNavigator();

// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={Home}
//           options={{title: 'Welcome'}}
//         />
//         <Stack.Screen />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const screens={
    Home:{
        screen:Home,
        navigationOptions:{
          title:''        
        },
        Check:{
            screen:Check,
            navigationOptions:{
             title:'check screen'     
            },
        Login:{
            screen:Login
        },
       
        },
        UserForm:{
            screen:UserForm
        },
        DoctorForm:{
            screen:DoctorForm
        }
}
}
const HomeStack=createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerTintColor:'#444',
headerStyle:{backgroundColor:'#6495ED',height:40,
}
    }
});
export default createAppContainer( HomeStack)