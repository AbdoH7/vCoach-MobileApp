import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import React, { useContext, useState, useEffect } from "react";
import global from "../../styles/global";
import {
  fetchGlobal,
  DoctorPatientAssignmentsEndpoint,
  getAssignments,
  updateAssignment,
  putGlobal
} from "../../APIs";
import invitesList from "../../assets/invitesList.png";
import assignPatientIcon from "../../assets/addUser.png";
import assignedExercisesIcon from "../../assets/assignedExercises.png";
import PreviewAssignment from "../../Components/PatientComponents/PreviewAssignment";
import BottomBar from "../../Components/Common/BottomBar";

export default function DoctorMainScreen({ navigation }) {
  const [update, setUpdate] = useState(false);
  const { user } = useContext(AuthContext);
  const [assignments, setAssignments] = useState([]);
  const itemsShown = 3
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetchGlobal(getAssignments);
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAssignments();
  }, []);

    useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetchGlobal(getAssignments);
        setAssignments(response.data.assignments);
        setUpdate(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDoctors();
  }, [update,navigation]);

  const markAsDone = async (id) => {
    const res = await putGlobal(updateAssignment(id),{status:true})
    setUpdate(true);
  }

  return (
    <View style={[styles.container, global.defaultBackgroundColor]}>
      <View style={[global.userInfo, styles.userInfoContainer]}>
        <Text style={global.userInfoText}>
          <Text style={[global.helloText, styles.helloText]}>Hello,</Text>
          <Text>{"\n"}</Text>
          <Text style={[global.userNameText, styles.userName]}>
            {user?.first_name}
          </Text>
        </Text>
        <View style={global.imageContainer}>
          <View style={[global.imageContainer]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UpdateUserScreen", { user: user })
              }
            >
              <Image style={global.profileImage} source={{uri:user?.avatar?.url}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        <View style={styles.actionsMenuContainer}>
          <View style={styles.actionsMenuButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddDoctorScreen")}
              style={styles.button}
            >
              <Image source={assignPatientIcon} />
            </TouchableOpacity>
            <Text style={styles.btnText}>Add a New Doctor</Text>
          </View>

          <View style={styles.actionsMenuButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ListExercisesScreen")}
              style={styles.button}
            >
              <Image source={invitesList} />
            </TouchableOpacity>
            <Text style={styles.btnText}>See All Exercises</Text>
          </View>

          <View style={styles.actionsMenuButtons}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SeeAsignedExercises")}
              style={styles.button}
            >
              <Image source={assignedExercisesIcon} />
            </TouchableOpacity>
            <Text style={styles.btnText}>Assigned Exercises</Text>
          </View>

          <View style={styles.actionsMenuButtons}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SeeDoctorScreen")
              }
              style={styles.button}
            >
              <Image source={assignedExercisesIcon} />
            </TouchableOpacity>
            <Text style={styles.btnText}>See your Doctors</Text>
          </View>
        </View>
        <View>
          <View style={styles.seeAllPatients}>
            <Text style={styles.patientText}>Assigned Exercises</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SeeAsignedExercises")}
              style={styles.seeAllBtn}
            >
              <Text style={styles.seeAllText}>See All Exercises</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            alwaysBounceVertical={true}
            bounces={true}
            style={styles.patientInfoContainer}
          >
            {assignments.filter((assignment) => assignment.status == false).slice(0,3).map((assignment, index) => (
              <View key={index} style={styles.previewAssignmentView}>
              <View
                key={assignment.id}
                style={
                  index == assignments.filter((assignment) => assignment.status == false).slice(0,3).length - 1
                    ? styles.hideLastPatientBorder
                    : styles.showPatientBorder
                }
              >
                <PreviewAssignment assignment={assignment} />
              </View>
              <View style={[styles.btnView,index == assignments.filter((assignment) => assignment.status == false).slice(0,3).length - 1 ? styles.hideLastPatientBorder: null]}>
                <TouchableOpacity
                  style={[styles.removeButton]}
                  onPress={() => {
                    markAsDone(assignment.id);
                  }}
                >
                  <Text style={[{ color: "#26ae60",fontWeight:'bold' }, styles.removeButtonText]}>
                  {"\u2713"}
                  </Text>
                </TouchableOpacity>
              </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <BottomBar navigation={navigation} />
      </View>
  );
}

const styles = StyleSheet.create({
  test: {
    flexDirection: "column",
  },
  container: {
    flex: 1,
  },
  previewAssignmentView:{
    flexDirection: "row",
  },
  showPatientBorder: {
    borderBottomWidth: 1,
    borderColor: "gray",
    paddingVertical: 10,
  },
  hideLastPatient: {
    borderBottomWidth: 0,
  },
  userInfoContainer: {
    marginBottom: 30,
    padding: 15,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    alignSelf: "center",
    marginTop: 10,
    textAlign: "center",
  },
  submitButton: {
    borderRadius: 30,
    backgroundColor: "#6C63FF",
    marginTop: 1,
    alignItems: "center",
    alignSelf: "center",
    width: "20%",
  },
  actionsMenuButtons: {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    width: "25%",
  },
  actionsMenuContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    padding: 5,
    // justifyContent:'space-around',
  },
  actionsMenuText: {
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
  },
  button: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 50,
    width: 47,
    padding: 10,
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
  userName: {
    fontSize: 30,
  },
  helloText: {
    fontSize: 20,
  },
  patientInfoContainer: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    margin: 10,
    marginBottom: 5,
    flexDirection: "column",
    backgroundColor: "#21202E",
    borderRadius: 15,
  },
  patientText: {
    fontSize: 20,
    color: "white",
    width: "75%",
    alignSelf: "flex-end",
  },
  seeAllPatients: {
    padding: 10,
    flexDirection: "row",
  },
  seeAllText: {
    color: "white",
    marginTop: 5,
  },
  seeAllBtn: {
    borderRadius: 30,
  },
  removeButton: {
    marginTop: "50%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 30,
    width: 25,
    height: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  removeButtonText: {
    fontSize: 15,
    alignSelf: "center",
  },
  btnView: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "center",
    borderBottomWidth:1,
    borderColor:'grey',
  },
  hideLastPatientBorder: {
    borderBottomWidth: 0,
    marginBottom:5,
  },
});
