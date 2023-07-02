import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,ImageBackground } from 'react-native';
import {useFocusEffect } from '@react-navigation/native';
import { fetchGlobal, getAssignments } from '../../APIs';
import Assignment from '../../Components/Common/Assignment';
import { AuthContext } from '../../context/AuthContext';
import BottomBar from '../../Components/Common/BottomBar';
export default function SeeAssignedExercises({ navigation,route }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [assignments, setAssignments] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const fetchAssignments = async () => {
        try {
          setIsUpdating(true)
          const response = await fetchGlobal(getAssignments);
          setAssignments(response.data.assignments);
          setIsUpdating(false)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchAssignments();
    }
    , [])
  );
  if(isUpdating){
    return(
      <View style={styles.loadingContainer}>
        <View style={styles.header}>
        <Text style={styles.title}>Assignments</Text>
      </View>
      </View>
    )
  }
  else{
  return (
		<View style={styles.outerContainer}>
			<View style={styles.header}>
      	<Text style={styles.title}>Assignments</Text>
			</View>
			<ScrollView style={styles.container}>
				{assignments?.map((assignment,index) => (
          <Assignment key={index} outerIndex={assignment.id} assignmentProp={assignment} navigation={navigation} />
				))}
    	</ScrollView>
      <BottomBar navigation={navigation}/>
		</View>
    
  );
}}

const styles = StyleSheet.create({
	outerContainer: {
    flex:1,
		backgroundColor: '#1B1620',
	},
	header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: '#1B1620',
    paddingTop:10,
    // paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom:"25%",
  },
  loadingContainer:{
    flex: 1,
    backgroundColor: '#1B1620',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
