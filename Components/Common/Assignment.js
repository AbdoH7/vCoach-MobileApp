import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  putGlobal,
  updateAssignment,
  deleteGlobal,
  removeAssignment,
} from "../../APIs";
import { AuthContext } from "../../context/AuthContext";
import { AntDesign } from "@expo/vector-icons";

export default function Assignment({ outerIndex,assignmentProp, navigation }) {
  const { user } = useContext(AuthContext);
  const [assignment, setAssignment] = useState(assignmentProp);
  const [isDeleted, setIsDeleted] = useState(false);

  const markAsDone = async (id, value) => {
    const payload = { status: value };
    try {
      const response = await putGlobal(updateAssignment(id), payload);
      setAssignment(response.data.assignment);
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  const deleteAssignment = async (id) => {
    await deleteGlobal(removeAssignment(id));
    setIsDeleted(true);
    setAssignment({});
  };

  const getStatusColor = (status) => {
    return status ? "#6AC259" : "#C25959";
  };

  const getMissedColor = (missed) => {
    return missed ? "#C25959" : "#6AC259";
  };

  return (
    <View key={outerIndex}>
      {!isDeleted && (
        <View style={styles.assignmentContainer}>
          <View style={styles.flexContainer}>
            <View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>
                  {user.user_type === "patient" ? "Doctor:" : "Patient: "}
                </Text>
                <Text style={styles.text}>
                  {user.user_type === "patient"
                    ? `${assignment.doctor.first_name} ${assignment.doctor.last_name}`
                    : `${assignment.patient.first_name} ${assignment.patient.last_name}`}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Exercise: </Text>
                <Text style={styles.text}>{assignment.exercise.name}</Text>
              </View>
              <Text
                style={[
                  styles.status,
                  { color: getStatusColor(assignment.status) },
                ]}
              >
                {assignment.status ? "Finished" : "Not Finished"}
              </Text>
              <Text
                style={[
                  styles.missed,
                  { color: getMissedColor(assignment.missed) },
                ]}
              >
                {assignment.missed && !assignment.status
                  ? "Missed"
                  : "Not Missed"}
              </Text>
              <View style={styles.textContainer}>
                <Text style={styles.label}>Date: </Text>
                <Text style={styles.text}>{assignment.date}</Text>
              </View>
              {assignment.exercise.model_available && (
                <Text style={styles.label}>
                  {assignment.accuracy
                    ? `Accuracy: ${assignment.accuracy}`
                    : "Accuracy: Not Available"}
                </Text>
              )}
              {assignment.notes && (
                <View style={styles.textContainer}>
                  <Text style={styles.label}>Notes: </Text>
                  <Text style={styles.text}>{assignment.notes}</Text>
                </View>
              )}
              <View style={styles.textContainer}>
                <Text style={styles.label}>AI Availability: </Text>
                <Text style={styles.text}>
                  {assignment.exercise.model_available ? "Available" : "Not Available"}
                </Text>
              </View>
              {Object.keys(assignment.instructions).map((key,innerIndex) => (
                <View key={`${innerIndex}${outerIndex}`} style={styles.textContainer}>
                  <Text style={styles.label}>{`${key}: `}</Text>
                  <Text style={styles.text}>
                    {assignment.instructions[key]}
                  </Text>
                </View>
              ))}
            </View>
            {user.user_type === "doctor" && (
              <View style={styles.editBtn}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ExerciseDetailsScreen", {
                      patient_id: assignment.patient.id,
                      exercise: assignment.exercise,
                      type: "update",
                      assignment: assignment,
                    })
                  }
                >
                  <AntDesign name="edit" size={32} color="white" />
                </TouchableOpacity>
              </View>
            )}
          </View>
          {user.user_type === "patient" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                markAsDone(assignment.id, !assignment.status);
              }}
            >
              <Text style={styles.buttonText}>
                {assignment.status ? "Undo" : "Mark As Done"}
              </Text>
            </TouchableOpacity>
          )}
          {user.user_type === "doctor" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                deleteAssignment(assignment.id);
              }}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("ExerciseContainer", {
                exercise: assignment.exercise,
              });
            }}
          >
            <Text style={styles.buttonText}>See Exercise</Text>
          </TouchableOpacity>
          {user.user_type === "patient" && assignment.exercise.name === "Pushup" && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('ModelScreen')
              }}
            >
              <Text style={styles.buttonText}>Start Training</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  assignmentContainer: {
    backgroundColor: "#231F2E",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
  },
  editBtn: {
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  missed: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#6D2E46",
    borderRadius: 5,
    padding: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#E6E6E6",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#E6E6E6",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
