import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const CheckType = ({ navigation }) => {
  const [user_type, setUserType] = React.useState("doctor");
  const [selectedIndex, setIndex] = React.useState(0);
  const handleType = (type) => {
    if(type == "doctor"){
      setUserType("doctor");
      setIndex(0);
    }else{
      setUserType("patient");
      setIndex(1);
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.headerTextView}>
        <Text style={[styles.title, styles.bold]}>Let's get you started</Text>
        <Text style={styles.title}>Pick a role!</Text>
      </View>
      <View style={styles.cardsView}>
        <View style={styles.cardBtn}>

          <TouchableOpacity
            style={[styles.cardContainer, selectedIndex == 0 ? styles.selectedColor : null]}
            onPress={()=>{handleType("doctor")}}
          >
              <Image
              style={styles.image}
              source={ require('../../assets/doctor.png') }
            />
              <Text style={styles.cardText}>I'm a Doctor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.cardBtn}>
          <TouchableOpacity
            style={[styles.cardContainer, selectedIndex == 1 ? styles.selectedColor : null]}
            onPress={()=>{handleType("patient")}}
          >
              <Image
              style={styles.image}
              source={ require('../../assets/patient.png') }
            />
              <Text style={styles.cardText}>I seek change</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View styles={styles.submitBtnView}>
        <TouchableOpacity style={styles.submitBtn} onPress={() =>
              navigation.navigate("SignUp", { user_type: user_type })
            }>
            <Text style={styles.submitBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#1B1620",
  },
  submitBtnView:{
    backgroundColor: "#FFF",
  },
  headerTextView: {
    marginTop: "15%",
  },
  title: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
  },
  bold: {
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
  },
  cardsView: {
    marginTop:"20%",
    height: "50%",
    justifyContent: "space-between",
  },
  cardBtn: {
    height:"50%",
    padding:10,
  },
  cardContainer:{
    backgroundColor: "#21202E",
    borderRadius: 15,
    height: "100%",
  },
  cardText: {
    fontSize: 24,
    fontWeight: "bold",
    color:'white',
    marginTop:"8%",
    marginLeft:'8%',
  },
  image:{
    marginLeft:'8%',
    marginTop:"5%",
  },
  submitBtn:{
    backgroundColor: "#6C63FF",
    borderRadius: 25,
    height: "22%",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: "5%",
    marginVertical: "5%",
    marginTop:'auto'
  },
  submitBtnText:{
    fontSize: 19,
    color: "#fff",
  },
  selectedColor:{
    backgroundColor: "#6C63FF",
  },
});

export default CheckType;
