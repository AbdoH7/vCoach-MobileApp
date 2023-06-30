import { StyleSheet, Text, View,Image,Button,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React,{useContext} from 'react';
import global from '../../styles/global';

export default function DoctorMainScreen({navigation}) {
    const {user,logout} = useContext(AuthContext)
    return (
    <View style={[styles.container, global.defaultBackgroundColor]}>
      <Image style={styles.image} source={require('../../assets/patient.png')}/>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
        <View style={{flex:1}}>
            <TouchableOpacity onPress={()=>navigation.navigate('SeeDoctorScreen')} style={styles.submitButton}>
                <Text style={styles.btnText}>See Your Doctors</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('AddDoctorScreen')} style={styles.submitButton}>
                <Text style={styles.btnText}>Add Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('SeeAsignedExercises')} style={styles.submitButton}>
                <Text style={styles.btnText}>See Assigned Exercises</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout} style={styles.submitButton}>
                <Text style={styles.btnText}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 100
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
    borderRadius:25,
    flex:1,
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
