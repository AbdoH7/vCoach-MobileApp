import React from 'react';
import { Text } from 'react-native';
import { View } from 'react-native';
import VideoDisplay from '../../Components/VideoDisplay';

ExerciseContainer = ({route}) => {
	const exercise = route.params.exercise
	console.log(exercise)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Exercise Details</Text>
			<Text>Name: {exercise.name}</Text>
			<Text>Body Area: {exercise.body_area}</Text>
			<Text>Description: {exercise.description}</Text>
			{/* <Text>Instructions: {{...exercise.instructions}}</Text> */}
			{exercise.equipment && <Text>Equipment: {exercise.equipment}</Text> }
			<Text>AI Availability: {exercise.model_available? 'Yes' : 'No'}</Text>
			<VideoDisplay video={exercise.video}/>
    </View>
  );
};

export default ExerciseContainer;
