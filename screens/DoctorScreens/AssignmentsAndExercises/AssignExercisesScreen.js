import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import User from "../../../Components/Common/User";
import BottomBar from "../../../Components/Common/BottomBar";
export default function AssignExercisesScreen({ navigation, route }) {
  const { patients } = route.params;

  const runAction = (index,action) => {
    navigation.navigate('ListExercisesScreen',{patient_id:patients[index].id,patient_name:`${patients[index].first_name} ${patients[index].last_name}`})
  }
  const itemHeight = 75; // Adjust the height of each patient item as needed
  const maxHeight = patients.length * itemHeight;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patients</Text>
      </View>
      {patients.length == 0 && (
        <Text style={styles.title}>No Patients assigned</Text>
      )}
      <ScrollView style={[styles.patientContainer]}>
        <View style={styles.patientListContainer}>
          {patients.map((patient,index) => (
            <View key={patient.id} style={[styles.allContainer,index == patients.length-1 && styles.hideLastPatient]}>
            <View style={styles.showPatientBorder}>
              <User index={index}  key={patient.id} patient={patient}/>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity style={[styles.removeButton]} onPress={()=>{runAction(index,'assign')}}>
                <Text style={[{color:'#26ae60'},styles.removeButtonText]}>+</Text>
              </TouchableOpacity>
            </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <BottomBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
  },
  patientContainer:{
    padding:10,
    paddingBottom:0,
    paddingTop:0,
    margin:10,
    marginBottom:"30%",
    flexDirection:'column',
    backgroundColor:'#21202E',
    borderRadius:15,
  },
  allContainer:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'gray',
  },
  hideLastPatient:{
    borderBottomWidth:0,
  },
  showPatientBorder:{
    paddingVertical:10,
    width:'80%',
  },  
  btnView:{
    flexDirection:'row',
    width:'20%',
    justifyContent:'center',
  },
  removeButton:{
    marginTop:'50%',
    borderColor:'white',
    borderWidth:1,
    borderRadius:30,
    width:25,
    height:25,
    marginLeft:10,
    marginRight:10,
  },
  removeButtonText:{
    fontSize:15,
    alignSelf:'center',
  },
  hideLastPatient: {
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  image: {
    borderRadius: 30,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
});
