import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import { fetchGlobal, DoctorPatientAssignmentsEndpoint } from "../../../APIs";
import { useEffect, useState } from "react";
import User from "../../../Components/Common/User";
export default function AssignExercisesScreen({ navigation, route }) {
  const { patients } = route.params;

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
      <ScrollView style={[styles.patientContainer, { maxHeight: maxHeight }]}>
        <View style={styles.patientListContainer}>
          {patients.map((patient, index) => (
            <View
              key={patient.id}
              style={
                index == patients.length - 1
                  ? styles.hideLastPatientBorder
                  : styles.showPatientBorder
              }
            >
              <User key={patient.id} patient={patient} />
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ListExercisesScreen", {
            patient_id: patients[0].id,
          });
        }}
      >
        <Text style={{ color: "white" }}>
          Press to assign exercises to patient 63(patient@gmail.com,tempo till
          we fix stylin)
        </Text>
      </TouchableOpacity>
      {/* <View style={styles.patientsContainer}>

      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
  },
  patientContainer: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    margin: 10,
    marginBottom: 5,
    flexDirection: "column",
    backgroundColor: "#21202E",
    borderRadius: 15,
  },
  showPatientBorder: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
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
