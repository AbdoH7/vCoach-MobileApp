import React,{useState} from "react";
import { View,Text,StyleSheet } from "react-native";
export default function ResultsScreen({route}) {
    const {results} = route.params;
    const arr = [1,2,3]
  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Assignments</Text>
    </View>
    <View style={styles.results}>
      <Text style={styles.text}>Scores:</Text>
      {arr.map((result,index) => {
          return <Text key={index} style={styles.text}>{`Push-up score: ${result}`}</Text>
      })}
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#1B1620'
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 20,
    },
    header: {
        backgroundColor: "#6C63FF",
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: "center",
    },
    text:{
        fontSize: 24,
        color: "#E6E6E6",
        padding:15,
        fontWeight:'bold'
    },
    results:{
        flex:1,
    }
});
 