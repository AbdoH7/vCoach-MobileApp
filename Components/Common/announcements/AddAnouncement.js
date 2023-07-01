import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { postGlobal, Announcements } from "../../../APIs";
import global from "../../../styles/global";

export default function AddAnouncement({ navigation }) {
	const [content, setContent] = useState("");
	const [isClicked, setIsClicked] = useState(false);
	const submitAnnouncement = async () => {
		try {
			await postGlobal(Announcements, { content: content });
			setContent("");
			navigation.navigate("AnnouncementsScreen");
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<View style={[global.defaultBackgroundColor, styles.container]}>
			<View style={styles.inputContainer}>
				<TextInput
					style={[styles.input, isClicked ? styles.focused : styles.blurred]}
					placeholder={!isClicked? "Write an Announcement" : ""}
					placeholderTextColor="#aaaaaa"
					onChangeText={(text) => setContent(text)}
					value={content}
					underlineColorAndroid="transparent"
					autoCapitalize="none"
					multiline={true}
					onFocus={() => setIsClicked(true)}
					onBlur={() => {!content && setIsClicked(false)}}
				/>
				{isClicked &&
					<TouchableOpacity style={styles.button} onPress={submitAnnouncement}>
						<Text style={styles.buttonTitle}>Submit</Text>
					</TouchableOpacity>}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	inputContainer: {
		marginTop: 30,
		marginBottom: 20,
		width: "80%",
	},
	input: {
		borderColor: "#cccccc",
		fontSize: 20,
		height: 50,
		marginBottom: 20,
		color: "white",
	},
	focused: {
		borderWidth: 1,
		borderRadius: 10,
		padding:10,
		height: 150,
	},
	blurred: {
		borderBottomWidth: 1,
	},
	button: {
		height: 50,
		backgroundColor: "#788eec",
		borderRadius: 30,
		alignItems: "center",
		justifyContent: "center",
		marginVertical: 10,
	},
	buttonTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "white",
	},
});
