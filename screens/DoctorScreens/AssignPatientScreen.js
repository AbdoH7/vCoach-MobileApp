import { StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity, TextInput} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchGlobal,InvitesEndpoint, postGlobal } from '../../APIs';
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
    console.log(userToken);
    return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/patient.png')}/>
            <Text style={styles.helloText}>You're Signed In (Patient) {user.first_name} !</Text>
        <SafeAreaView style={{flex:1}}>
            <TextInput style={styles.input} onChangeText={setText} placeholder='Enter Patient Email' />
            <TouchableOpacity onPress={()=>sendInvite(email)} style={styles.submitButton}>
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
        </SafeAreaView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 100
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth:1,
    height: 40,
    color: 'black',
    paddingLeft: 10,
    },
  helloText: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center'
  },
  image:{
borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  },
  content:{
borderRadius:30,
 
    //borderWidth:5,
    //borderColor:'red'
  },
  btnText:{
    color:'white',
    fontSize: 20,
  },
  submitButton:{
    borderRadius:30,
    flex:.2,
    backgroundColor:'#6495ED',
    marginTop:50,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
  },
  boldText: {
    marginLeft: 10,
  }
  ,icon:{
   marginLeft:40,
    width:300,
   height:110,
   marginBottom:20
  },
  text:{
    marginLeft:70,
    fontSize: 10,
    //fontWeight: '200',
    marginRight:30,
    marginBottom:40
  },
  text1:{
  fontSize:10,
//fontStyle:'italic',
  },
  bt:{
    padding: 50,
    borderRadius:30,
  },
  btnContainer:{
       alignItems:'center'
  }
});
