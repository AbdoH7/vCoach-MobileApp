import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postGlobal,DoctorPatientAssignmentsRemoveEndpoint } from '../../APIs';
import global from '../../styles/global';
import Patient from '../../Components/DoctorComponents/Patient';
export default function SeePatientScreen({navigation,route}) {
    const {user} = useContext(AuthContext)
    const {patients} = route.params
    const removePatient = async (patientId) => {
      //need to figure out how to rerender
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
      setPatients((patients) => patients.filter((patient) => patient.id !== patientId))
    }
    const hideDropMenu = () => {

    }
    return (
    <View onTouchEnd={hideDropMenu} style={[global.container,global.defaultBackgroundColor]}>
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
      <Text style={global.listTitles}>Patients</Text>
      <View style={styles.patientContainer}>
        {
          patients.length == 0 ? <Text style={global.notFoundText}>No Patients assigned</Text> : <Patient patients={patients} removePatient={removePatient} /> 
        }
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  image:{
    width:60,
    height:60,
    borderRadius:30
  },
  patientContainer:{
    padding:10,
  }
});
