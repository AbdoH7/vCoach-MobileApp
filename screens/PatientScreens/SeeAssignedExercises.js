import React,{useContext} from 'react'
import {View,Text,Image,StyleSheet} from 'react-native'
import { AuthContext } from '../../context/AuthContext'
export default function SeeAsignedExercises() {
  const {user} = useContext(AuthContext)
  return (
    <View>
      <Image style={styles.image} source={require('../../assets/patient.png')}/>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      <Text>Some Text</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  image:{
    borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  }
})
