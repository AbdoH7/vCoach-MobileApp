import React,{useContext} from 'react'
import {View,Text,StyleSheet, TouchableOpacity,Image} from 'react-native'
import { AuthContext } from '../../../context/AuthContext'
import { fetchGlobal, getExercises } from '../../../APIs'
import { useEffect, useState } from 'react'
import global from '../../../styles/global'
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
    <View style={[global.defaultBackgroundColor,styles.container]}>
      <View style={global.userInfo}>
        <Text style={global.userInfoText}>
          <Text style={global.helloText}>Hello,</Text>
          <Text>{'\n'}</Text>
          <Text style={global.userNameText}>Dr.{user.first_name}</Text>
        </Text>
        <View style={global.imageContainer}>
          <Image style={global.profileImage} source={require('../../../assets/doctor.png')}/>
        </View>
      </View>
      <View>
        <Text style={global.title}>Exercises</Text>
        {exercises.length == 0 ? 
        <Text style={global.notFoundText}>No exercises available</Text> :
        exercises.map((exercise) => {
            return (
            <View style={styles.exerciseContainer} key={exercise.id}>
              <TouchableOpacity onPress={()=>{navigation.navigate("ExerciseDetailsScreen", {patient_id: route.params.patient_id, exercise: exercise, type: "create"})}}>
                <Text>{exercise.name}</Text>
              </TouchableOpacity>
            </View>
            )
          })
        }
       </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10
  },
  exerciseContainer:{
    marginTop:10,
    padding:10,
    paddingTop:20,
    backgroundColor:'#21202E',
    marginLeft:10,
    marginRight:10,
    borderRadius:15,
    height:'90%',
    marginBottom:20,
  },
})
