import { StyleSheet, Text, View,Image,SafeAreaView,TouchableOpacity, TextInput} from 'react-native';
import React,{useContext, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postGlobal,DoctorPatientAssignmentsEndpoint } from '../../APIs';
import global from '../../styles/global';
import BottomBar from '../../Components/Common/BottomBar';

export default function AddDoctorScreen({navigation}) {
    const {user} = useContext(AuthContext)
    const [doctorToken, setText] = useState('')
    const [textInputStyle, setStyle] = useState(styles.textInput)
    const textInputFocus = () => {
      setStyle(styles.textInputFocus)
    }
    const textInputBlur = () => {
      setStyle(styles.textInput)
    }
    const assignDoctorToPatient = async (doctorToken)=>{
      try{
          response = await postGlobal(DoctorPatientAssignmentsEndpoint,{invite_token:doctorToken})
      } catch(err){
          console.log(`Assign Doctor To Patient Error: ${err}`)
      }
    }
    return (
    <View style={[styles.container,global.defaultBackgroundColor]}>
      <View style={styles.header}>
        <Text style={styles.title}>Add a Doctor</Text>
      </View>
        <View style={styles.submitTextInput}>
          <TextInput onChangeText={setText} style={textInputStyle} onFocus={textInputFocus} onTouchCancel={textInputBlur} onBlur={textInputBlur} placeholderTextColor={'#6A6888'} placeholder='Enter Doctor Token' />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={()=>assignDoctorToPatient(doctorToken)} style={styles.submitButton}>
              <Text style={styles.btnText}>Add</Text>
          </TouchableOpacity>
        </View>
        <BottomBar navigation={navigation}/>
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
    marginBottom:"20%"
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
