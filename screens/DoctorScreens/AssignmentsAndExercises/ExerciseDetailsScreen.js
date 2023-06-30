import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import {
  postGlobal,
  putGlobal,
  createAssignment,
  doctorUpdateAssignment,
} from "../../../APIs";
import * as Yup from "yup";
import { Formik } from "formik";
import { Calendar } from "react-native-calendars";

export default function ExerciseDetailsScreen({ navigation, route }) {
  const { patient_id, exercise, type, assignment } = route.params;
  const [selectedDates, setSelectedDates] = useState({});
  const [dates, setDate] = useState([]);
  const [calendarStatus, setCalendarStatus] = useState(false);
  const validationSchema = Yup.object().shape(
    exercise.instructions.instructions.reduce(
      (schema, instruction) => {
        return {
          ...schema,
          [instruction]: Yup.string().required("Required"),
        };
      },
      { notes: Yup.string() }
    )
  );
  const initialValues = exercise.instructions.instructions.reduce(
    (acc, instruction) => {
      if (type === "create") acc[instruction] = "";
      else if (type === "update")
        acc[instruction] = assignment.instructions[instruction];
      return acc;
    },
    { notes: type == "update" ? assignment.notes : "" }
  );

  const handleDateSelect = (date) => {
    const updatedDates = { ...selectedDates };
    if (selectedDates[date.dateString]) {
      delete updatedDates[date.dateString];
    } else {
      updatedDates[date.dateString] = { selected: true };
      dates.push(date.dateString);
    }
    setDate(dates);
    setSelectedDates(updatedDates);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    if (type === "create") {
      const payload = {
        exercise_id: exercise.id,
        patient_id: patient_id,
        notes: values.notes,
        instructions: exercise.instructions.instructions.reduce(
          (acc, instruction, index) => {
            acc[instruction] = values[instruction];
            return acc;
          },
          {}
        ),
        date: values.date,
      };
      const response = await postGlobal(createAssignment, payload);
      navigation.navigate("AssignExercisesScreen");
    } else if (type === "update") {
      const payload = {
        notes: values.notes,
        instructions: exercise.instructions.instructions.reduce(
          (acc, instruction, index) => {
            acc[instruction] = values[instruction];
            return acc;
          },
          {}
        ),
        date: [date, date + 1, date + 2],
      };
      const response = await putGlobal(
        doctorUpdateAssignment(assignment.id),
        payload
      );
      navigation.navigate("SeeAssignedExercises");
    }
  };
  const toggleCalendar = () => {
    setCalendarStatus(!calendarStatus);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assign an exercise</Text>
      </View>
      <View style={styles.patientInfo}>
        <Text style={styles.label}>
          Assigning Exercise <Text style={{color:'#FF0F6C'}}>{exercise.name}</Text> to patient {patient_id}
        </Text>
      </View>
      <View style={styles.form}>
        <ScrollView styles={styles.formContainer}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
            }) => (
              <View style={styles.form}>
                <View style={styles.formFields}>
                  {exercise.instructions.instructions.map(
                    (instruction, index) => {
                      return (
                        <View key={index} style={styles.formTextView}>
                          <Text style={styles.label}>{instruction}</Text>
                          <TextInput
                            placeholder={"Enter " + instruction}
                            placeholderTextColor={"white"}
                            style={styles.textInputFocus}
                            onChangeText={handleChange(instruction)}
                            onBlur={handleBlur(instruction)}
                            value={values[instruction]}
                          />
                          {handleBlur(instruction) && errors[instruction] && (
                            <Text style={styles.errorText} >{errors[instruction]}</Text>
                          )}
                        </View>
                      );
                    }
                  )}
                  <View style={styles.formTextView}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                      placeholder="Enter Notes"
                      placeholderTextColor={"white"}
                      style={styles.textInputFocus}
                      onChangeText={handleChange("notes")}
                      onBlur={handleBlur("notes")}
                      value={values.notes}
                    />
                  </View>
                </View>
				{type === "create" && (
				<View style={styles.calendarView}>
				<TouchableOpacity
					style={styles.calendarBtn}
					onPress={toggleCalendar}
				>
					<Text style={styles.submitText}>{!calendarStatus? "Select Dates" : "Close"}</Text>
				</TouchableOpacity>
					{calendarStatus &&<Calendar
						markedDates={selectedDates}
						markingType="multi-dot"
						onDayPress={handleDateSelect}
						theme={{
							calendarBackground: "#009e5F",
							textSectionTitleColor: "#ffffff",
							dayTextColor: "#ffffff",
							todayTextColor: "#ffffff",
							selectedDayTextColor: "#ffffff",
							monthTextColor: "#ffffff",
							textDisabledColor: "#C5C5C5",
						}}
					/>}
				</View>
				)}
                <View style={styles.submitButtonView}>
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.submitText}>{type=="update" ? "Update":"Assign"}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  patientInfo: {
    padding: 10,
    alignItems: "center",
  },
  textInputFocus: {
    color: "white",
    backgroundColor: "#21202E",
    borderRadius: 15,
    textAlign: "left",
    paddingLeft: 15,
    fontSize: 18,
    height: 60,
  },
  label: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  form: {
    padding: 15,
    height: "80%",
  },
  formFields: {
    marginBottom: 20,
    padding: 10,
  },
  formTextView: {
    marginBottom: 15,
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: "#6C63FF",
    padding: 15,
    marginBottom: 5,
  },
  calendarView:{
	  marginBottom: 20,
  },
  calendarBtn:{
	borderRadius: 20,
    backgroundColor: "#6C63FF",
    padding: 10,
    marginBottom: 10,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  image: {
    borderRadius: 30,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
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
});
