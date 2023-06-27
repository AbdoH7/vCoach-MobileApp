import React from 'react'
import {View,Text,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { fetchGlobal, deleteGlobal, getAssignments, removeAssignment} from '../../../APIs'
import { useEffect, useState } from 'react'
export default function ListAssignmentsScreen({navigation, route}) {
  const [assignments, setAssignments] = useState([])
	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				const response = await fetchGlobal(getAssignments);
				console.log(response.data.assignments)
				setAssignments(response.data.assignments);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
	fetchAssignments()
	},[])

	const deleteAssignment = async (id) => {
		const response = await deleteGlobal(removeAssignment(id))
		console.log(response)
		setAssignments(assignments.filter((assignment) => assignment.id !== id))
	}

  return (
    <ScrollView>
			<Text>Assignments</Text>
      {assignments?.map((assignment) => {return(
				<View>
					<Text>{assignment.id}</Text>
					<Text>"Patient: "{`${assignment.patient.first_name} ${assignment.patient.last_name}`}</Text>
					<Text>"Exercise: "{assignment.exercise.name}</Text>
					<Text>{assignment.status? "Finished" : "Not Finished"}</Text>
					<Text>{assignment.missed? "Missed" : "Not Missed"}</Text>
					<Text>{`Date: ${assignment.date}`}</Text>
					{assignment.model_available && <Text>{`accuracy: ${assignment.accuracy}`}</Text> }
					{assignment.notes && <Text>{assignment.notes}</Text> }
					{Object.keys(assignment.instructions).map((key) => {return(<Text>{`${key}: ${assignment.instructions[key]}`}</Text>)})}
					<TouchableOpacity onPress={()=>{deleteAssignment(assignment.id)}}>
						<Text>Delete</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{navigation.navigate("ExerciseDetailsScreen", {type: "update", assignment: assignment, exercise: assignment.exercise})}}>
						<Text>Update</Text>
					</TouchableOpacity>
					<Text>---------------------------------------------------------------------------</Text>
				</View>
			)})}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image:{
    borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  }
})
