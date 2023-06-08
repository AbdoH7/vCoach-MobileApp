import React,{useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator,View,Text } from 'react-native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext';

function AppNav(){
    const {userToken,isLoading} = useContext(AuthContext)
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
            {userToken ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
    )
}
export default AppNav
