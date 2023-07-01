import { StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity, TextInput} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { InvitesEndpoint, postGlobal } from '../../APIs';
import global from '../../styles/global';
export default function AddPatientScreen({navigation}) {
    const {user} = useContext(AuthContext)
    const [email, setText] = useState('')
    const [textInputStyle, setStyle] = useState(styles.textInput)
    const sendInvite = async (email)=>{
      try{
          response = await postGlobal(InvitesEndpoint,{email:email})
      } catch(err){
          console.log(`Send Invite Error: ${err}`)
      }
    }
    const textInputFocus = () => {
      setStyle(styles.textInputFocus)
    }
    const textInputBlur = () => {
      setStyle(styles.textInput)
    }
    return (
    <View style={[styles.container,global.defaultBackgroundColor]}>
      <View style={styles.header}>
        <Text style={styles.title}>Send Invite</Text>
      </View>
        <View style={styles.submitTextInput}>
          <TextInput onChangeText={setText} style={textInputStyle} onFocus={textInputFocus} onTouchCancel={textInputBlur} onBlur={textInputBlur} placeholderTextColor={'#6A6888'} placeholder='Enter Patient Email' />
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

  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  container: {
    flex:1,
    // padding: 10,
    flexDirection:'column',
  },
  submitTextInput:{
    marginTop:100,
    height:50,
    paddingHorizontal:20,
  },
  textInput:{
    color:'white',
    backgroundColor:'#21202E',
    borderRadius:15,
    textAlign:'center',    
    height:'100%',
    fontSize:18,
  },
  textInputFocus:{
    color:'white',
    backgroundColor:'#21202E',
    borderRadius:15,
    textAlign:'left',    
    height:'100%',
    paddingLeft:15,
    fontSize:18,
  },
  btnContainer:{
    padding:10,
    marginTop:'auto',
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
