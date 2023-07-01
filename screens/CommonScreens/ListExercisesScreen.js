import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { fetchGlobal, getExercises } from "../../APIs";
import global from "../../styles/global";
export default function ListExercisesScreen({ navigation, route }) {
  const [exercises, setExercises] = useState([]);
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetchGlobal(getExercises);
        setExercises(response.data.exercises);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchExercises();
  }, []);
  const { user } = useContext(AuthContext);
  return (
    <View style={[global.defaultBackgroundColor, styles.container]}>
      <View style={global.userInfo}>
        <Text style={global.userInfoText}>
          <Text style={global.helloText}>Hello,</Text>
          <Text>{"\n"}</Text>
          <Text style={global.userNameText}>Dr.{user.first_name}</Text>
        </Text>
        <View style={global.imageContainer}>
          <Image
            style={global.profileImage}
            source={{ uri: user.avatar.url }}
          />
        </View>
      </View>
      <Text style={styles.title}>Exercises</Text>
      <ScrollView style={styles.exercisesViewContainer}>
        {exercises.length == 0 ? (
          <Text style={global.notFoundText}>No exercises available</Text>
        ) : (
          <View style={styles.exerciselistContainer}>
            {exercises.map((exercise, index) => {
              return (
                <TouchableOpacity
                  key={exercise.id}
                  onPress={() => {
                    route.params?.patient_id ? 
                    navigation.navigate("ExerciseDetailsScreen", {
                      patient_id: route.params.patient_id,
                      exercise: exercise,
                      type: "create",
                    }) :
                    navigation.navigate("ExerciseContainer", {
                      exercise: exercise,
                    })
                    ;
                  }}
                  style={[
                    styles.exerciseContainer,
                    (index == 0 && styles.firstExercise) ||
                      (index == 1 && styles.secondExercise) ||
                      (index == 2 && styles.thirdExercise),
                  ]}
                >
                  <Text style={styles.exerciseText}>{exercise.name}</Text>
                  <Image
                    style={styles.exerciseImage}
                    resizeMode="contain"
                    source={{ uri: exercise.image }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
      {user.user_type == "doctor" && (
      <View style={styles.requestView}>
        <TouchableOpacity
          onPress={() => navigation.navigate("RequestExerciseScreen",{exercises:exercises})}
          style={styles.requestBtn}
        >
          <Text style={styles.requestText}>Request Exercise</Text>
        </TouchableOpacity>
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  exercisesViewContainer: {
    backgroundColor: "#21202E",
    borderRadius: 15,
    marginBottom: 10,
  },
  requestView: {
    // marginTop:'auto',
    margin: 10,
    height: "6%",
  },
  requestBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 20,
    alignItems: "center",
    marginTop: "auto",
    height: "100%",
  },
  requestText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    paddingTop: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    flexDirection: "column",
  },
  title: {
    paddingLeft: 10,
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5,
  },
  exerciselistContainer: {
    width: "100%",
  },
  exerciseContainer: {
    padding: 15,
    margin: 15,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exerciseText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },
  exerciseImage: {
    alignSelf: "center",
    width: 135,
    height: 135,
  },
  firstExercise: {
    backgroundColor: "#ff3b30",
  },
  secondExercise: {
    backgroundColor: "#26ae60",
  },
  thirdExercise: {
    backgroundColor: "#017aff",
  },
});
