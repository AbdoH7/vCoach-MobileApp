import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { fetchGlobal, getAssignments } from '../../APIs';
import Assignment from '../../Components/Common/Assignment';

export default function SeeAssignedExercises({ navigation }) {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetchGlobal(getAssignments);
        setAssignments(response.data.assignments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    console.log("invoked")

    const unsubscribe = navigation.addListener('focus', fetchAssignments);

    return unsubscribe;
  }, [navigation]);


  return (
		<ScrollView style={styles.outerContainer}>
			<View style={styles.header}>
      	<Text style={styles.title}>Assignments</Text>
			</View>
			<ScrollView style={styles.container}>
				{assignments?.map((assignment) => (
          <Assignment key={assignment.id} assignmentProp={assignment} navigation={navigation} />

				))}
    	</ScrollView>
		</ScrollView>
    
  );
}

const styles = StyleSheet.create({
	outerContainer: {
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
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
});
