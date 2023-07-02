import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import {  Likes, Comments, postGlobal, deleteGlobal, Like, Announcement } from '../../../APIs';
import { AuthContext } from '../../../context/AuthContext';

export default function ViewAnnouncment({ announcementt, navigation, submitted }) {
	const [announcement, setAnnouncement] = useState(announcementt);
	const [isLiked, setIsLiked] = useState(announcement.is_liked);
	const [commentsCount, setCommentsCount] = useState(announcement.comments_count);
	const [viewInput, setViewInput] = useState(false);
	const [viewAllComments, setViewAllComments] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const { user } = useContext(AuthContext);

	const handleLike = async () => {
		if(!isLiked){
			try {

			await postGlobal(Likes, {announcement_id: announcement.id});
			setIsLiked(true);
			} catch (error) {
				console.error( error);
			}
		}
		else{
			try {
				await deleteGlobal(Like(announcement.like_id));
				setIsLiked(false);
			} catch (error) {
				console.error( error);
			}
		}
	}

	const submitComment = async () => {
		try {
			const response = await postGlobal(Comments, {announcement_id: announcement.id, content: inputValue});
			setCommentsCount(commentsCount+1);
			setInputValue('');
			setViewInput(false);
			setAnnouncement({...announcement, comments: [...announcement.comments, response.data.comment], comments_count: commentsCount+1});
		} catch (error) {
			console.error( error);
		}
	}


	const deleteAnnouncement = async () => {
		try {
			await deleteGlobal(Announcement(announcement.id));
			submitted(true);
			navigation.navigate('AnnouncementsScreen');
		} catch (error) {
			console.error( error);
		}
	}


	

return (
	<ScrollView style={styles.container}>
		<View style={styles.innerContainer}>
		<View style={styles.header}>
			<Image style={ styles.image } resizeMode='cover' source={{uri:announcement.user.avatar.url}} />
			<View style={styles.headerInfo}>
				<Text style={styles.posterName}>{announcement.user.full_name}</Text>
				<Text style={styles.date}>{announcement.created_at}</Text>
			</View>
			{user.user_type == 'doctor' &&
			<TouchableOpacity style={styles.deleteBtn} onPress={deleteAnnouncement}>
				<AntDesign name="delete" size={24} color="white" />
			</TouchableOpacity>}
		</View>
		<Text style={styles.content}>{announcement.content}</Text>
		<View style={styles.actions}>
			<TouchableOpacity onPress={handleLike}>
				{isLiked
				?<AntDesign name="heart" size={24} color="white" />
				:<AntDesign name="hearto" size={24} color="white" />}
				</TouchableOpacity>
			<TouchableOpacity onPress={()=>{setViewInput(!viewInput)}}>	
				<FontAwesome5 name="comment-alt" size={24} color="white" />
			</TouchableOpacity>
		</View>

		{(viewInput && !viewAllComments) &&
		<View style={styles.submitCommentContainer}>
			<TextInput style={styles.input} value={inputValue} onChangeText={setInputValue} placeholder='Add a comment...'/>
			<TouchableOpacity onPress={submitComment}><Ionicons name="md-send-sharp" size={24} color="white" /></TouchableOpacity>
		</View>}
		

		{(!viewAllComments && !viewInput) &&
			<View style={styles.showCommentsText}>
				{commentsCount
				?<TouchableOpacity onPress={()=>{setViewAllComments(true)}}>
						<Text style={styles.whiteFont}>Show all {commentsCount} comments</Text>
					</TouchableOpacity>
				:<Text style={styles.whiteFont}>No comments yet</Text>}
			</View>}

		{viewAllComments && <View style={styles.commentsContainer}>
			{announcement.comments.map((comment, index) => {
			return (
				<ScrollView key={index}>
					<View style={styles.header}>
						<Image style={ styles.image } resizeMode='cover' source={{uri:comment.user.avatar.url}} />
						<View style={styles.headerInfo}>
							<Text style={styles.posterName}>{comment.user.full_name}</Text>
							<Text style={styles.date}>{comment.created_at}</Text>
						</View>
					</View>
					<Text style={styles.content}>{comment.content}</Text>
				</ScrollView>
			)})}
			<TouchableOpacity onPress={()=>{setViewAllComments(false)}}><Text style={styles.whiteFont}>Hide comments</Text></TouchableOpacity>
			<View style={styles.submitCommentContainer}>
			<TextInput style={styles.inputSecond} value={inputValue} onChangeText={setInputValue} placeholder='Add a comment...'/>
			<TouchableOpacity onPress={submitComment}><Ionicons name="md-send-sharp" size={24} color="white" /></TouchableOpacity>
			</View>
		</View>}
		
		{/* <View style={styles.divider}></View> */}
		</View>
					
	</ScrollView> 
	);
}

const styles = StyleSheet.create({
	container: {
		width: '90%',
		alignSelf: 'center',
		marginTop: 20,
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: '#332d37',
	},
	innerContainer: {
		marginBottom: 20,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginRight: 10,
	},
	header: {
		flexDirection: 'row',
		marginBottom: 10,
		marginTop: 10,
		marginLeft: 10,
	},
	headerInfo: {
		flexDirection: 'column',
	},
	posterName: {
		fontWeight: 'bold',
		color: 'white',
		fontSize: 20,
		marginBottom: 5,
	},
	date: {
		color: 'white',
	},
	deleteBtn: {
		marginLeft: 'auto',
		marginRight: 10,
		marginTop: 5,
	},
	content: {
		color: 'white',
		marginBottom: 15,
		marginLeft: 70,
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 15,
	},
	showCommentsText: {
		marginLeft: 60,
	},
	whiteFont: {
		color: 'white',
	},
	submitCommentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
		marginBottom: 10,
	},
	input: {
		backgroundColor: '#DCDAFF',
		borderRadius: 10,
		width: '80%',
		alignSelf: 'center',
		paddingLeft: 10,
	},
	inputSecond: {
		backgroundColor: '#DCDAFF',
		borderRadius: 10,
		width: '85%',
		paddingLeft: 10,
	},
	commentsContainer: {
		width: "80%",
		marginLeft: "10%",
	},
	divider: {
		borderBottomColor: 'white',
		borderBottomWidth: 1,
		marginBottom: 10,
		marginTop: 20,
		width: '80%',
		alignSelf: 'center',
	},
});
