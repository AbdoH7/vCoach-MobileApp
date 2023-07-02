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
import BottomBar from "../../Components/Common/BottomBar";
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
      <View style={styles.header}>
        <Text style={styles.title}>Select Exercise</Text>
      </View>
      <Text style={styles.title}>Exercises</Text>
      <ScrollView style={[styles.exercisesViewContainer,user.user_type =="patient" && styles.patientMargin]}>
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
                      patient_id: route.params?.patient_id,
                      exercise: exercise,
                      type: "create",
                      patient_name: route.params?.patient_name
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
      <BottomBar navigation={navigation}/>
    </View>
  );
}

const styles = StyleSheet.create({
  exercisesViewContainer: {
    backgroundColor: "#21202E",
    borderRadius: 15,
    // marginBottom: 10,
    margin:10,
  },
  patientMargin:{
    marginBottom:"25%",
  },
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom:10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  requestView: {
    margin: 10,
    marginBottom:"25%",
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
    paddingTop:10,
  },
  container: {
    flex: 1,
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
