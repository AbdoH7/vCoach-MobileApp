import { StyleSheet, Text, View,Image, TouchableOpacity,ScrollView} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { postGlobal,DoctorPatientAssignmentsRemoveEndpoint } from '../../APIs';
import global from '../../styles/global';
import Patient from '../../Components/DoctorComponents/Patient';
export default function SeePatientScreen({navigation,route}) {
    const {user} = useContext(AuthContext)
    const {patients} = route.params
    const itemHeight = 75; // Adjust the height of each patient item as needed
    const maxHeight = patients.length * itemHeight;

    return (
    <View style={[styles.container,global.defaultBackgroundColor]}>
      <View style={[global.userInfo,styles.userInfoContainer]}>
        <Text style={global.userInfoText}>
          <Text style={global.helloText}>Hello,</Text>
          <Text>{'\n'}</Text>
          <Text style={global.userNameText}>Dr.{user.first_name}</Text>
        </Text>
        <View style={global.imageContainer}>
          <Image style={global.profileImage} source={{uri:user.avatar.url}}/>
        </View>
      </View>
      <View style={styles.patientContainerTitle}>
        <Text style={styles.patientContainerTitleText}>Patients</Text>
      </View>
      <ScrollView style={[styles.patientContainer,{maxHeight:maxHeight}]}>
        <View style={styles.patientListContainer}>
          {patients.map((patient,index) => (
            <View key={patient.id} style={index == patients.length-1 ? styles.hideLastPatientBorder : styles.showPatientBorder}>
              <Patient  key={patient.id} patient={patient}/>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.addPatientBtnContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('AssignPatientScreen')} style={styles.addPatientBtn}>
          <Text style={styles.addPatientBtnText}>Add Patient</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  showPatientBorder:{
    borderBottomWidth:1,
    borderColor:'gray',
    paddingVertical:10,
  },  
  hideLastPatient:{
    borderBottomWidth:0,
  },
  container:{
    flex:1,
    flexDirection:'column',
  },
  userInfoContainer:{
    padding:10,
  },
  patientContainer:{
    padding:10,
    paddingBottom:0,
    paddingTop:0,
    margin:10,
    marginBottom:5,
    flexDirection:'column',
    backgroundColor:'#21202E',
    borderRadius:15,
  },
  patientContainerTitle:{
    padding:10,
    paddingBottom:0,
  },
  patientContainerTitleText:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
  },
  patientListContainer:{
    
  },
  addPatientBtnContainer:{
    margin:10,
    height:'6%',
    marginTop:'auto'
  },
  addPatientBtn:{
    borderRadius:20,
    backgroundColor:'#6C63FF',
    height:'100%',
  },
  addPatientBtnText:{
    color:'white',
    fontSize:20,
    alignSelf:'center',
    fontWeight:'bold',
    paddingTop:15,
  },
  image:{
    width:60,
    height:60,
    borderRadius:30
  },
});
