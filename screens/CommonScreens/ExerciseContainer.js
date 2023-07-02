import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import VideoDisplay from "../../Components/VideoDisplay";
import BottomBar from "../../Components/Common/BottomBar";

const ExerciseContainer = ({ route }) => {
  const exercise = route.params.exercise;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercise Details</Text>
      </View>
      <View style={styles.content}>
        <VideoDisplay video={exercise.video} />
        <View style={styles.detailsContainer}>
          <MaterialIcons name="fitness-center" style={styles.icon} />
					<View style={styles.labelContainer}>
						<Text style={styles.label}>Name</Text>
					</View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{exercise.name}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="body" style={styles.icon} />
					<View style={styles.labelContainer}>
          	<Text style={styles.label}>Body Area</Text>
					</View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{exercise.body_area}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <MaterialIcons
            name="check-circle"
            style={styles.icon}
            color={exercise.model_available ? "#00FF00" : "#FF0000"}
          />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>AI Availability</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {exercise.model_available ? "Yes" : "No"}
            </Text>
          </View>
        </View>
        {exercise.equipment && (
          <View style={styles.detailsContainer}>
            <MaterialIcons name="fitness-center" style={styles.icon} />
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Equipment</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>{exercise.equipment}</Text>
            </View>
          </View>
        )}
        <View style={styles.detailsContainer}>
          <MaterialIcons name="description" style={styles.icon} />
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Description</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{exercise.description}</Text>
          </View>
        </View>
      </View>
      <BottomBar navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
  },
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 30,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
    color: "#E6E6E6",
  },
	labelContainer: {
		width: 140,
		marginEnd: 10,
		backgroundColor: "#6D2E46",
    borderRadius: 8,
    padding: 10,
	},
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoContainer: {
    // backgroundColor: '#231F2E',
    // borderRadius: 8,
    // padding: 10,
  },
  infoText: {
    fontSize: 18,
    color: "#E6E6E6",
		fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 16,
    color: "#CCCCCC",
    fontStyle: "italic",
  },
});

export default ExerciseContainer;
