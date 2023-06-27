import React from 'react'
import {View,Text,StyleSheet, TouchableOpacity, ScrollView} from 'react-native'
import { fetchGlobal, putGlobal, getAssignments, updateAssignment} from '../../APIs'
import { useEffect, useState } from 'react'

export default function SeeAsignedExercises({navigation}) {
  const [assignments, setAssignments] = useState([])
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus',() => {
			const fetchAssignments = async () => {
			try {
				const response = await fetchGlobal(getAssignments);
				setAssignments(response.data.assignments);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}
		fetchAssignments()
		return unsubscribe;
	  }, [navigation])
	});
	const markAsDone = async (id, value) => {
    const payload = { status: value };
    try {
      const response = await putGlobal(updateAssignment(id), payload);
      const updatedAssignments = assignments.map((assignment) =>
        assignment.id === id ? { ...assignment, status: response.data.assignment.status } : assignment
      );

      setAssignments(updatedAssignments);
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
	}

  return (
    <ScrollView>
			<Text>Assignments</Text>
      {assignments?.map((assignment) => {return(
				<View>
					<Text>{assignment.id}</Text>
					<Text>Doctor: {`${assignment.doctor.first_name} ${assignment.doctor.last_name}`}</Text>
					<Text>Exercise: {assignment.exercise.name}</Text>
					<Text>{assignment.status? "Finished" : "Not Finished"}</Text>
					<Text>{assignment.missed? "Missed" : "Not Missed"}</Text>
					<Text>{`Date: ${assignment.date}`}</Text>
					{assignment.model_available && <Text>{`accuracy: ${assignment.accuracy}`}</Text> }
					{assignment.notes && <Text>{`Notes: ${assignment.notes}`}</Text> }
					{Object.keys(assignment.instructions).map((key) => {return(<Text>{`${key}: ${assignment.instructions[key]}`}</Text>)})}
					<TouchableOpacity onPress={()=>{markAsDone(assignment.id, !assignment.status)}}>
						<Text>{assignment.status? 'Undo' : 'Mark As Done'}</Text>
					</TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate("ExerciseContainer", {exercise: assignment.exercise})}}>
            <Text>See Exercise</Text>
          </TouchableOpacity>
					<Text>---------------------------------------------------------------------------</Text>
				</View>
			)})}
    </ScrollView>
  )
}
