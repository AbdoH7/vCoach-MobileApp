import React,{useContext} from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { AuthContext } from '../../../context/AuthContext'
import { fetchGlobal, DoctorPatientAssignmentsEndpoint } from '../../../APIs'
import { useEffect, useState } from 'react'

export default function AssignExercisesScreen({navigation}) {
  const [patients, setPatients] = useState([])
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
  const {user} = useContext(AuthContext)

  return (
    <View>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      <Text>Some Text</Text>
      {patients.length == 0 && <Text>No Patients assigned</Text>}
      {patients.map((patient) => {
          return (
            
          <View key={patient.id}>
            <TouchableOpacity onPress={()=>{navigation.navigate('ListExercisesScreen', {patient_id: patient.id})}}>
              <Text>{patient.first_name} {patient.last_name}</Text>
              <Text>{patient.email}</Text>
            </TouchableOpacity>
          </View>
          )
          }
      )}
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
