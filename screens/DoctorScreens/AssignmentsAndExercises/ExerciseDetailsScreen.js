import React,{useState} from 'react'
import {View,Text,StyleSheet, TouchableOpacity, ScrollView, TextInput, Button} from 'react-native'
import { postGlobal, putGlobal, createAssignment, doctorUpdateAssignment } from '../../../APIs'
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Calendar } from 'react-native-calendars';

export default function ExerciseDetailsScreen({navigation, route}) {
	const { patient_id, exercise, type, assignment } = route.params;
	const [selectedDates, setSelectedDates] = useState({});
	const [dates, setDate] = useState([]);
	const validationSchema = Yup.object().shape(
		exercise.instructions.instructions.reduce((schema, instruction) => {
			return {
				...schema,
				[instruction]: Yup.string().required('Required'),
			};
		}, { notes: Yup.string() })
	);
	
	const initialValues = exercise.instructions.instructions.reduce((acc, instruction) => {
		if(type === "create") acc[instruction] = '';
		else if(type === "update") acc[instruction] = assignment.instructions[instruction];
		return acc;
	}, 
	{ notes: type=="update"? assignment.notes : '' });

	const handleDateSelect = (date) => {
		const updatedDates = { ...selectedDates };
		if (selectedDates[date.dateString]) {
		  delete updatedDates[date.dateString];
		} else {
			updatedDates[date.dateString] = { selected: true };
			dates.push(date.dateString)
		}
		setDate(dates)
		setSelectedDates(updatedDates);
	  };

	const handleSubmit = async (values) => {
		console.log(values);
		if(type === "create"){
			const payload = {
				exercise_id: exercise.id,
				patient_id: patient_id,
				notes: values.notes,
				instructions: exercise.instructions.instructions.reduce((acc, instruction, index) => {
					acc[instruction] = values[instruction];
					return acc;
				}, {}),
				date: values.date
			}
			const response = await postGlobal(createAssignment, payload)
			navigation.navigate("AssignExercisesScreen")
		}
		else if(type === "update"){
			const payload = {
				notes: values.notes,
				instructions: exercise.instructions.instructions.reduce((acc, instruction, index) => {
					acc[instruction] = values[instruction];
					return acc;
				}, {}),
				date: [date, date+1, date+2]
			}
			const response = await putGlobal(doctorUpdateAssignment(assignment.id), payload)
			navigation.navigate("SeeAssignedExercises")
		}
	}
	return (
		<View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Assign an exercise</Text>
      </View>
		<View style={styles.form}>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
					{(formikProps) => (
						<ScrollView>
							{exercise.instructions.instructions.map((instruction,index) => {
							return (
								<View key={index}>
									<Text>{instruction}</Text>
									<TextInput
									onChangeText={formikProps.handleChange(instruction)}
									onBlur={formikProps.handleBlur(instruction)}
									value={formikProps.values[instruction]}
									/>
									{formikProps.handleBlur(instruction) && formikProps.errors[instruction] && <Text>{formikProps.errors[instruction]}</Text>}
								</View>
							)
							}
							)}
							<View>
								<Text>Notes</Text>
								<TextInput
								onChangeText={formikProps.handleChange("notes")}
								value={formikProps.values.notes}
								/>
							</View>
							{type === "create" && <View>
								<Calendar
								markedDates={selectedDates}
								markingType='multi-dot'
								onDayPress={handleDateSelect}
								/>
							</View>
							}
							<TouchableOpacity
							style={styles.button}
							onPress={()=>{
								formikProps.values.date=dates
								formikProps.handleSubmit()
							}}
							disabled={formikProps.isSubmitting}>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</ScrollView>
					)}
				</Formik>
				</View>
		</View>
)}

const styles = StyleSheet.create({
  image:{
    borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  container:{
	flex:1,
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
})
