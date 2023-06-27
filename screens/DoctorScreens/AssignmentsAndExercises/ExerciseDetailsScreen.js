import React,{useContext} from 'react'
import {View,Text,StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native'
import { postGlobal, putGlobal, createAssignment, doctorUpdateAssignment } from '../../../APIs'
import * as Yup from 'yup';
import { Formik } from 'formik';


export default function ExerciseDetailsScreen({navigation, route}) {
	const { patient_id, exercise, type, assignment } = route.params;
	
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
	

	const handleSubmit = async (values) => {
		date = new Date
		if(type === "create"){
			const payload = {
				exercise_id: exercise.id,
				patient_id: patient_id,
				notes: values.notes,
				instructions: exercise.instructions.instructions.reduce((acc, instruction, index) => {
					acc[instruction] = values[instruction];
					return acc;
				}, {}),
				date: [date, date+1, date+2]
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
			navigation.navigate("ListAssignmentsScreen")
		}
	}
	return (
		<View>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}>
					{(formikProps) => (
						<ScrollView>
							<Text>Assign an exercise</Text>
							{exercise.instructions.instructions.map((instruction) => {
							return (
								<View>
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
							<TouchableOpacity
							style={styles.button}
							onPress={formikProps.handleSubmit}
							disabled={formikProps.isSubmitting}>
								<Text style={styles.buttonText}>Submit</Text>
							</TouchableOpacity>
						</ScrollView>
					)}
				</Formik>
		</View>
)}

const styles = StyleSheet.create({
  image:{
    borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  }
})
