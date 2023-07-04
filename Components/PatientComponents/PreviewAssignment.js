import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
function PreviewAssignment({ assignment}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="contain"
          style={styles.patientImage}
          source={{ uri: assignment.exercise.image }}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.textContainer}>
          <Text style={styles.patientName}>
            {assignment.exercise.name}
            {"\n"}
          </Text>
          {Object.keys(assignment.instructions).map((key, innerIndex) => (
            <View key={`${innerIndex}`} style={styles.textContainer}>
              <Text style={styles.patientBrief}>
                {`${key}: `}{" "}
                <Text style={styles.patientBrief}>
                  {assignment.instructions[key]} {"\n"}
                </Text>
              </Text>
            </View>
          ))}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer:{
    padding: 5,
    width:"20%"
  },
  patientImage:{
    width: 60,
    height: 60,
    borderRadius:30
  },
  infoContainer:{
    width:"65%",
    paddingTop:15,
  },
  textContainer:{
    flexDirection:'column',
    color:'white',
  },
  patientName:{
    fontSize:15,
    fontWeight:'bold'
  },
  patientBrief:{
    fontSize:12,
    color:'white',
  },
  dropMenuBtnContainer:{
    width:"15%",
    padding:15,
  },
  dropMenuBtn:{
    // backgroundColor:'gray',
    borderColor:'white',
    borderWidth:1,
    borderRadius:15,
    alignItems:'center',
    alignSelf:'center',
    width:30,
    height:30,
  },
  dropMenuBtnText:{
    color:'white',
  },
  dropMenuListView:{
    position: 'absolute',
    top: 30,
    right: 45,
    backgroundColor: '#332d37',
    borderColor: 'white',
    borderWidth:2,
    padding: 10,
    borderRadius: 5,
    order:1,
  },
  dropDownMenuItem:{
    padding:1,
  },
  dropDownMenuItemText:{
    color:'white',
  }
});

export default PreviewAssignment;
