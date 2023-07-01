import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
const CarouselSlider = ({navigation}) => {
  const item = [
    {
      id: "1",
      title: "Find the right work out for your needs",
      img: require("../../assets/slide1.png"),
      buttonTitle: "next",
      isLast: false,
    },
    {
      id: "2",
      title: "Facilite communication with your doctor",
      img: require("../../assets/slide2.png"),
      buttonTitle: "next",
      isLast: false,
    },
    {
      id: "3",
      title: "Get the results you desire",
      img: require("../../assets/slide3.png"),
      buttonTitle: "finish",
      isLast: true,
    },
  ];
  const [screen, setScreen] = useState(item[0]);

  function dothis() {
    const index = parseInt(screen.id) - 1;
    if (index === item.length - 1) {
      // navigate to the other screen
      navigation.navigate("AuthMain")
    } else {
      setScreen(item[index + 1]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgView}>
        <Image resizeMode="cover" source={screen.img} alt={screen.title} style={styles.img} />
      </View>
      <View style={styles.innerCont}>
        <Text style={styles.title}>{screen.title}</Text>
      </View>
        <View style={styles.buttonView}>
        <Text style={styles.counter}>
          {" "}
          {screen.id}/{item.length}
        </Text>
          <TouchableOpacity onPress={dothis} style={styles.button}>
            <Text style={styles.buttonText}>
              {screen.isLast ? "Continue" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  imgView:{
    height: "65%",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  counter: {
    color: "white",
    alignSelf: "center",
    padding:15,
    fontSize:15,
    fontWeight:'bold',
  },
  innerCont: {
    alignSelf: "center",
    backgroundColor: " #262626",
    flexDirection: "row",
  },
  title: {
    alignSelf: "center",
    flexWrap: "wrap",
    width: "50%",
    marginTop: "5%",
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  buttonView:{
    marginTop:'auto',
    marginBottom:'10%',
  },
  button: {
    width: "75%",
    backgroundColor: "#6C63FF",
    paddingHorizontal: 110,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
    fontSize: 15,
    marginTop:'auto',
  },
  buttonText:{
    color: "white",
    fontSize: 15,
  }
});

export default CarouselSlider;
