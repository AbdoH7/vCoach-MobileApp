import { StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity, TextInput} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { InvitesEndpoint, postGlobal } from '../../APIs';
import global from '../../styles/global';
export default function AssignPatientScreen({navigation}) {
    const {user,userToken} = useContext(AuthContext)
    const [email, setText] = useState('')
    const sendInvite = async ()=>{
      try{
          response = await postGlobal(InvitesEndpoint,{email:email})
      } catch(err){
          console.log(`Send Invite Error: ${err}`)
      }
    }
    return (
    <View style={[styles.container,global.defaultBackgroundColor]}>
      <View style={global.userInfo}>
        <Text style={global.userInfoText}>
          <Text style={global.helloText}>Hello,</Text>
          <Text>{'\n'}</Text>
          <Text style={global.userNameText}>Dr.{user.first_name}</Text>
        </Text>
        <View style={global.imageContainer}>
          <Image style={global.profileImage} source={require('../../assets/doctor.png')}/>
        </View>
      </View>
      <View style={styles.submitContainer}>
        <View style={styles.submitTextInput}>
          <TextInput style={styles.textInput} onChangeText={setText} placeholderTextColor={'#6A6888'} placeholder='Enter Patient Email' />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=>sendInvite(email)} style={styles.submitButton}>
              <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('SeeInvitesList')} style={styles.submitButton}>
            <Text style={styles.btnText}>See All Previous Invites</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
  },
  submitContainer:{
    flexDirection:'column',
    marginTop:10,
    height:"50%",
  },
  submitTextInput:{
    height:'80%',
  },
  textInput:{
    color:'white',
    backgroundColor:'#21202E',
    borderRadius:10,
    alignSelf:'center',
    width:'100%',
    height:'20%',
    textAlign:'center',
  },
  btnContainer:{
    marginBottom:10,
  },
  submitButton:{
    padding:10,
    marginBottom:10,
    width:'100%',
    backgroundColor:'#6C63FF',
    borderRadius:20,
    alignItems:'center',
    alignSelf:'flex-start',
  },
  btnText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
  }

});
