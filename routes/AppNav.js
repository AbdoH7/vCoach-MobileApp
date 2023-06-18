import React,{useContext,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator,View,Text,StatusBar } from 'react-native';
import AuthStack from './AuthStack';
import DoctorStack from './DoctorStack';
import PatientStack from './PatientStack';
import { AuthContext } from '../context/AuthContext';

const STYLES = ['default', 'dark-content', 'light-content'];

function AppNav(){
    const {user,userToken,isLoading} = useContext(AuthContext)
    const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0],);
    if(isLoading){
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size={'large'}/>
                <Text>Loading</Text>
            </View>
        )
    }
    return (
        <NavigationContainer>
            <StatusBar
            animated={true}
            backgroundColor="#6C63FF"
            barStyle={statusBarStyle}
            />    
            {userToken ? (user.user_type == 'doctor' ? <DoctorStack/> : <PatientStack/>) : <AuthStack/>}
        </NavigationContainer>
    )
}
export default AppNav
