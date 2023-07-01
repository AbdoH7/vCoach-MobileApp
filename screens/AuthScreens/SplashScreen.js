import { LinearGradient } from "expo-linear-gradient";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
export default function SplashScreen({ navigation }) {
  const [showImage, setShowImage] = useState(true);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <>
    { showImage &&
    <ImageBackground
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      source={require("../../assets/startScreen.png")}
      >
      </ImageBackground>
    }
    { !showImage &&
    <WelcomeScreen navigation={navigation}/>
    }
    </>
    // <LinearGradient
    //   colors={["black", "#7B68EE", "#7B68EE", "black"]}
    //   style={{ flex: 1 }}
    // >
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //     {showImage && (
    //       <Image
    //         source={require("../../assets/logoMain.png")}
    //         style={{ width: "20%", height: "20%" }}
    //       />
    //     )}
    //     {!showImage && <WelcomeScreen navigation={navigation}/>}
    //   </View>
    // </LinearGradient>
  );
}
const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
      }}
    >
      <LinearGradient
        colors={[`rgba(0,0,0,0.1)`, `black`]}
        style={{
          height: 400,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "white",
            marginTop: 60,
          }}
        >
          {" "}
          Welcome to
        </Text>

        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "white",
          }}
        >
          VCOACH
        </Text>

        <Text
          style={{
            marginTop: 30,
            fontSize: 14,
            color: "white",
            marginBottom: 20,
          }}
        >
          The AI-powered coach helping you to achieve healthier life and ease the communication with your doctor.
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: "#7B68EE",
            // paddingHorizontal:40,
            paddingRight: 15,
            paddingVertical: 12,
            borderRadius: 30,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("CarouselSlider");
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color:'white'
            }}
          >
            {" "}
            Get Started
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

/*
with react native you can style you react native with javascript 

 */

const styles = StyleSheet.create({});
