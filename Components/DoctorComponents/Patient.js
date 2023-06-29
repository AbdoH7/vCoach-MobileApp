import React,{useState} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native'
import global from '../../styles/global'
import { ScrollView } from 'react-native-gesture-handler';
export default function Patient({patients,removePatient,index}) {
  const [dropdownStates, setDropdownStates] = useState([false,false,false]);
  const toggleDropdown = (index) => {
    const newDropdownStates = dropdownStates.map((state, i) => (i === index ? !state : false));
    setDropdownStates(newDropdownStates);
  };

  return (
    <ScrollView>
      <View style={styles.patientContainer}>
      {patients.map((patient,index) => {
        return (
          <View style={styles.patientInfoContainer} key={patient.id}>
            <View style={[styles.patient, index === patients.length-1 && styles.lastPatient]}>
              <Image resizeMode='contain' style={styles.patientImage} source={require('../../assets/patient.png')} />
              <View style={global.defaultTextView}>
                <Text style={[global.defaultTextColor,styles.patientName]}>{patient.first_name} {patient.last_name}</Text>
                <Text style={[global.defaultTextColor,styles.patientEmail]}>{patient.email}</Text>
              </View>
              <View style={styles.removeButtonContainer}>
                <TouchableOpacity style={styles.removeButton} onPress={()=>{toggleDropdown(index)}}>
                <Text style={[global.defaultTextColor,styles.removeButtonText]}>...</Text>
                </TouchableOpacity>
              </View>
            </View>
            {dropdownStates[index] && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity style={styles.dropdownMenuBtn} onPress={() => console.log(`Dropdown menu option 1 selected for patient ${patient.id}`)}>
                  <Text style={styles.dropdownMenuItemText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownMenuBtn} onPress={() => console.log(`Dropdown menu option 2 selected for patient ${patient.id}`)}>
                  <Text style={styles.dropdownMenuItemText}>Assign Exercise</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownMenuBtn} onPress={removePatient}>
                  <Text style={styles.dropdownMenuItemText}>Remove</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdownMenuBtn} onPress={() => console.log(`Dropdown menu option 4 selected for patient ${patient.id}`)}>
                  <Text style={styles.dropdownMenuItemText}>See Asigned Exercises</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          )
        }
      )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  patientContainer:{
    padding:10,
    paddingTop:20,
    backgroundColor:'#21202E',
    borderRadius:15,
    height:'100%',
    flexDirection:'column',
  },
  patientInfoContainer:{
    height:'20%',
    marginBottom:20,
  },
  patient:{
    paddingBottom:10,
    flexDirection:'row',
    width:'100%',
    borderRadius:15,
    marginBottom:20,
    justifyContent:'flex-start',
    borderBottomWidth:1,
    borderColor:'gray'
  },
  lastPatient:{
    borderBottomWidth:0,
  },
  removeButtonContainer:{
    paddingTop:10,
    textAlign:'center',
  },
  removeButton:{
    alignSelf:'flex-end',
    borderColor:'white',
    borderWidth:1,
    borderRadius:30,
    padding:6,    
    width:27,
    height:27,
  },
  removeButtonText:{
    fontSize:10,
    fontFamily:'sans-serif',
    textAlign:'center',
    fontWeight:'bold',
    top:-3
  },
  patientImage:{
    marginRight:5,
    width:60,
    height:60,
    borderRadius:50,
  },
  patientName:{
    fontSize:15,
    fontFamily:'sans-serif',
    fontWeight:'bold',
  },
  patientEmail:{
    fontSize:10,
    fontFamily:'sans-serif',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0,
    width: 170,
    backgroundColor: '#332D38',
    borderRadius: 10,
    zIndex: 1,
    borderColor:'white',
    borderWidth:1,
    //Another Styling for the dropdown menu
    // marginTop: 10,
    // backgroundColor: '#f2f2f2',
    // borderRadius: 4,
    // paddingVertical: 5,
    // paddingHorizontal: 10,
  },
  dropdownMenuItemText:{
    fontSize:14,
    // borderWidth:1,
    // borderRadius:15,
    textAlign:'left',
    paddingLeft:10,
    paddingTop:10,
    color:'white',
  },
  dropdownMenuBtn:{
    marginBottom:3,
    borderColor:'gray',
    borderRadius:15,
  }
})