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
});
