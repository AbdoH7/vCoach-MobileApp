import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import global from "../../styles/global";
import User from "../../Components/Common/User";
import BottomBar from "../../Components/Common/BottomBar";
import {
  fetchGlobal,
  DoctorPatientAssignmentsEndpoint,
  postGlobal,
  DoctorPatientAssignmentsRemoveEndpoint,
} from "../../APIs";
export default function SeePatientScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const routeName = route.name;
  const itemHeight = 15;
  const itemsShown = 12;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchGlobal(DoctorPatientAssignmentsEndpoint);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchUsers();
  }, []);
  const removeUser = async (userId) => {
    try {
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, { id: userId });
      setUsers(users.filter((user) => user.id != userId));
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };
  const handleAction = (index, action) => {
    if (action == "remove") {
      Alert.alert(
        "Alert Title",
        "You sure you want to remove this user ?.",
        [
          {
            text: "Yes",
            onPress: () => removeUser(users[index].id),
            style: "default",
          },
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      navigation.navigate("ListExercisesScreen", {
        patient_id: users[index].id,
      });
    }
  };
  return (
    <View style={[styles.container, global.defaultBackgroundColor]}>
      <View style={[global.userInfo, styles.userInfoContainer]}>
        <Text style={global.userInfoText}>
          <Text style={global.helloText}>Hello,</Text>
          <Text>{"\n"}</Text>
          <Text style={global.userNameText}>
            {routeName == "SeePatientScreen" && "Dr. "}
            {user.first_name}
          </Text>
        </Text>
        <View style={global.imageContainer}>
          <Image
            style={global.profileImage}
            source={{ uri: user?.avatar?.url }}
          />
        </View>
      </View>
      <View style={styles.patientContainerTitle}>
        <Text style={styles.patientContainerTitleText}>
          {routeName == "SeePatientScreen" ? "Patients" : "Doctors"}
        </Text>
      </View>
      {users.length == 0 && (
        <View style={styles.noResultsContainer}>
          <Text style={styles.noResultsText}>No users found</Text>
        </View>
      )}
      {users.length != 0 && (
        <ScrollView
          style={[
            styles.patientContainer,
            { maxHeight: itemHeight * itemsShown * users.length },
          ]}
        >
          <View style={styles.patientListContainer}>
            {users.map((user, index) => (
              <View
                key={user.id}
                style={[
                  styles.allContainer,
                  index == users.length - 1 && styles.hideLastPatient,
                ]}
              >
                <View style={styles.showPatientBorder}>
                  <User index={index} key={user.id} user={user} />
                </View>
                <View style={styles.btnView}>
                {routeName == "SeePatientScreen" && 
                  <TouchableOpacity
                    style={[styles.removeButton]}
                    onPress={() => {
                      handleAction(index, "assign");
                    }}
                  >
                    <Text
                      style={[{ color: "#26ae60" }, styles.removeButtonText]}
                    >
                      +
                    </Text>
                  </TouchableOpacity>
                }
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => {
                      handleAction(index, "remove");
                    }}
                  >
                    <Text
                      style={[
                        { color: "#FF000F", fontWeight: "bold" },
                        styles.removeButtonText,
                      ]}
                    >
                      x
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.addPatientBtnContainer}>
        {routeName == "SeePatientScreen" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddPatientScreen")}
            style={styles.addPatientBtn}
          >
            <Text style={styles.addPatientBtnText}>Add Patient</Text>
          </TouchableOpacity>
        )}
        {routeName == "SeeDoctorScreen" && (
          <TouchableOpacity
            onPress={() => navigation.navigate("AddDoctorScreen")}
            style={styles.addPatientBtn}
          >
            <Text style={styles.addPatientBtnText}>Add Doctor</Text>
          </TouchableOpacity>
        )}
      </View>
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  showPatientBorder: {
    paddingVertical: 10,
    width: "80%",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "gray",
  },
  noAssignedUsers: {
    color: "grey",
  },
  removeButtonText: {
    fontSize: 15,
    alignSelf: "center",
  },
  allContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  btnView: {
    flexDirection: "row",
    width: "20%",
    justifyContent: "center",
  },
  dropContainer: {
    backgroundColor: "#332d37",
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },
  dropButton: {
    padding: 10,
    width: "100%",
    alignItems: "center",
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
  hideLastPatient: {
    borderBottomWidth: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
  userInfoContainer: {
    padding: 10,
    marginLeft: 10,
  },
  patientContainer: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 0,
    margin: 10,
    // marginBottom:5,
    flexDirection: "column",
    backgroundColor: "#21202E",
    borderRadius: 15,
    borderColor: "gray",
    borderWidth: 1,
  },
  patientContainerTitle: {
    padding: 10,
    paddingBottom: 0,
  },
  patientContainerTitleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  patientListContainer: {},
  addPatientBtnContainer: {
    margin: 10,
    height: "6%",
    marginTop: "auto",
    marginBottom: "25%",
  },
  addPatientBtn: {
    borderRadius: 20,
    backgroundColor: "#6C63FF",
    height: "100%",
  },
  addPatientBtnText: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
    fontWeight: "bold",
    paddingTop: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
