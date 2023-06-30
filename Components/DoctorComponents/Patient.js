import React, { useState,useRef,useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
export default function Patient({ patient, index }) {
  // const [dropdownStates, setDropdownStates] = useState([false, false, false]);
  const removePatient = async (patientId) => {
    //need to figure out how to rerender
    await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
    setPatients((patients) => patients.filter((patient) => patient.id !== patientId))
  }
  const [dropDownState, setDropDownStates] = useState([false,false,false]);

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image resizeMode="contain" style={styles.patientImage} source={{ uri: patient.avatar.url }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textContainer}>
            <Text style={styles.patientName}>{patient.first_name}{patient.last_name}{'\n'}</Text>
            <Text style={styles.patientBrief}>{patient.email}</Text>
          </Text>
        </View>
        <View style={styles.dropMenuBtnContainer}>
          <TouchableOpacity style={styles.dropMenuBtn} onPress={()=>{}}>
            <Text style={styles.dropMenuBtnText}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dropMenuListContainer}>
        {/* {isDropdownOpen && (
          <View style={styles.dropMenuListView}>
            <View style={styles.dropDownMenuItem}>
              <TouchableOpacity style={styles.dropDownMenuBtn} onPress={() => closeDropdowns}>
                <Text style={styles.dropDownMenuItemText}>Assign Exercise</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dropDownMenuItem}>
              <TouchableOpacity style={styles.dropDownMenuBtn} onPress={() => closeDropdowns}>
                <Text style={styles.dropDownMenuItemText}>Chat</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.dropDownMenuItem}>
              <TouchableOpacity style={styles.dropDownMenuBtn} onPress={() => closeDropdowns}>
                <Text style={styles.dropDownMenuItemText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer:{
    padding: 5,
    width:"20%"
  },
  patientImage:{
    width: 60,
    height: 60,
    borderRadius:30
  },
  infoContainer:{
    width:"65%",
    paddingTop:15,
  },
  textContainer:{
    flexDirection:'column',
    color:'white',
  },
  patientName:{
    fontSize:15,
    fontWeight:'bold'
  },
  patientBrief:{
    fontSize:12,
  },
  dropMenuBtnContainer:{
    width:"15%",
    padding:15,
  },
  dropMenuBtn:{
    // backgroundColor:'gray',
    borderColor:'white',
    borderWidth:1,
    borderRadius:15,
    alignItems:'center',
    alignSelf:'center',
    width:30,
    height:30,
  },
  dropMenuBtnText:{
    color:'white',
  },
  dropMenuListView:{
    position: 'absolute',
    top: 30,
    right: 45,
    backgroundColor: '#332d37',
    borderColor: 'white',
    borderWidth:2,
    padding: 10,
    borderRadius: 5,
    order:1,
  },
  dropDownMenuItem:{
    padding:1,
  },
  dropDownMenuItemText:{
    color:'white',
  }
  // dropDownMenuContainer:{
  //   borderWidth:1,
  //   borderColor:'white',
  //   width:"15%"
  // },
  // dropdownMenuList:{
  //   flexDirection:'column',
  // }


  // patientContainer: {
  //   padding: 10,
  //   paddingTop: 20,
  //   backgroundColor: "#21202E",
  //   borderRadius: 15,
  //   height: "100%",
  //   flexDirection: "column",
  // },
  // patientInfoContainer: {
  //   height: "20%",
  //   marginBottom: 20,
  // },
  // patient: {
  //   paddingBottom: 10,
  //   flexDirection: "row",
  //   width: "100%",
  //   borderRadius: 15,
  //   marginBottom: 20,
  //   justifyContent: "flex-start",
  //   borderBottomWidth: 1,
  //   borderColor: "gray",
  // },
  // lastPatient: {
  //   borderBottomWidth: 0,
  // },
  // removeButtonContainer: {
  //   paddingTop: 10,
  //   textAlign: "center",
  // },
  // removeButton: {
  //   alignSelf: "flex-end",
  //   borderColor: "white",
  //   borderWidth: 1,
  //   borderRadius: 30,
  //   padding: 6,
  //   width: 27,
  //   height: 27,
  // },
  // removeButtonText: {
  //   fontSize: 10,
  //   fontFamily: "sans-serif",
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   top: -3,
  // },
  // patientImage: {
  //   marginRight: 5,
  //   width: 60,
  //   height: 60,
  //   borderRadius: 50,
  // },
  // patientName: {
  //   fontSize: 15,
  //   fontFamily: "sans-serif",
  //   fontWeight: "bold",
  // },
  // patientEmail: {
  //   fontSize: 10,
  //   fontFamily: "sans-serif",
  // },
  // dropdownMenu: {
  //   position: "absolute",
  //   top: 35,
  //   right: 0,
  //   width: 170,
  //   backgroundColor: "#332D38",
  //   borderRadius: 10,
  //   zIndex: 1,
  //   borderColor: "white",
  //   borderWidth: 1,
  //   //Another Styling for the dropdown menu
  //   // marginTop: 10,
  //   // backgroundColor: '#f2f2f2',
  //   // borderRadius: 4,
  //   // paddingVertical: 5,
  //   // paddingHorizontal: 10,
  // },
  // dropdownMenuItemText: {
  //   fontSize: 14,
  //   // borderWidth:1,
  //   // borderRadius:15,
  //   textAlign: "left",
  //   paddingLeft: 10,
  //   paddingTop: 10,
  //   color: "white",
  // },
  // dropdownMenuBtn: {
  //   marginBottom: 3,
  //   borderColor: "gray",
  //   borderRadius: 15,
  // },
});
