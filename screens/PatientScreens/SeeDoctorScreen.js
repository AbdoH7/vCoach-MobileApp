import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';
import React,{useContext, useState,useEffect} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DoctorPatientAssignmentsEndpoint,DoctorPatientAssignmentsRemoveEndpoint,fetchGlobal,postGlobal } from '../../APIs';
export default function SeeDoctorScreen({navigation}) {
    const {user} = useContext(AuthContext)
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await fetchGlobal(DoctorPatientAssignmentsEndpoint);
          setDoctors(response.data.users);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchDoctors()
    },[])
    const removeDoctor = async (patientId) => {
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
      setDoctors((doctors) => doctors.filter((doctor) => doctor.id !== patientId))
    }
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/patient.png')}/>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      {doctors.length === 0 && <Text>No doctors assigned to you</Text>}
      {doctors.map((doctor) => {
          return (
          <View key={doctor.id} style={{flex:.15}}>
            <Text style={{fontSize:20}}>{doctor.id}</Text>
            <Text>{doctor.first_name}</Text>
            <Text>{doctor.email}</Text>
            <TouchableOpacity onPress={()=>{removeDoctor(doctor.id)}}><Text style={styles.modalHeaderCloseText}>Remove X</Text>
            </TouchableOpacity>
          </View>
          )
          }
      )}
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
