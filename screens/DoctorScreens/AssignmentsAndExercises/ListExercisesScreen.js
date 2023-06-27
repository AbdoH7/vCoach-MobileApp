import React,{useContext} from 'react'
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native'
import { AuthContext } from '../../../context/AuthContext'
import { fetchGlobal, getExercises } from '../../../APIs'
import { useEffect, useState } from 'react'
export default function ListExercisesScreen({navigation, route}) {
  const [exercises, setExercises] = useState([])
	useEffect(() => {
			const fetchExercises = async () => {
			try {
					const response = await fetchGlobal(getExercises);
					setExercises(response.data.exercises);
			} catch (error) {
					console.error('Error fetching data:', error);
			}
			}
			fetchExercises()
	},[])
  const {user} = useContext(AuthContext)
  return (
    <View>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      <Text>Some Text</Text>
      {exercises.length == 0 && <Text>No exercises available</Text>}
      {exercises.map((exercise) => {
          return (
            
          <View key={exercise.id}>
            <TouchableOpacity onPress={()=>{navigation.navigate("ExerciseDetailsScreen", {patient_id: route.params.patient_id, exercise: exercise, type: "create"})}}>
              <Text>{exercise.name}</Text>
            </TouchableOpacity>
          </View>
          )
          }
      )}
    </View>
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
