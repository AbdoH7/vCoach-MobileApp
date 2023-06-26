import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchGlobal,DoctorPatientAssignmentsEndpoint,postGlobal,DoctorPatientAssignmentsRemoveEndpoint } from '../../APIs';
export default function SeePatientScreen({navigation}) {
    const {user} = useContext(AuthContext)
    const [patients, setPatients] = useState([])
    // need to check results coming from back it comes empty array and causes errors ( handle the empty case as well )
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await fetchGlobal(DoctorPatientAssignmentsEndpoint);
          setPatients(response.data.users);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchPatients()
    },[])
    const removePatient = async (patientId) => {
      //need to figure out how to rerender
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
      setPatients((patients) => patients.filter((patient) => patient.id !== patientId))
    }
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/doctor.png')}/>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      {patients.length == 0 && <Text>No Patients assigned</Text>}
      {patients.map((patient) => {
          return (
          <View key={patient.id} style={{flex:.15}}>
            <Text style={{fontSize:20}}>{patient.id}</Text>
            <Text>{patient.first_name}</Text>
            <Text>{patient.email}</Text>
            <TouchableOpacity onPress={()=>{removePatient(patient.id)}}><Text style={styles.modalHeaderCloseText}>Remove X</Text>
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
