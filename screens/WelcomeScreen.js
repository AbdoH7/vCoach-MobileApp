import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState,useEffect } from 'react';
import { StyleSheet, Text, View,ImageBackground, Dimensions, TouchableOpacity,Image } from 'react-native';
import Colors from './constants/Col'
export default function SplashScreen() {
  
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <LinearGradient colors={['black','#7B68EE','#7B68EE',"black"]} style={{ flex: 1 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showImage && (
        <Image
          source={require('../assets/logo.png')}
          style={{ width: "20%", height:"20%"  }}
        />
      )}
       {!showImage && <WelcomeScreen />}
    </View>
  </LinearGradient>
);
}
const WelcomeScreen=()=>{
 return(
 
  <ImageBackground source={require('../assets/background.jpg')}
  style={{
    width:"100%",
    flex:1,
    justifyContent:"flex-end",
  }}
  >
<LinearGradient  colors={[`rgba(0,0,0,0.1)`,`black`]} 
style={
  {
    height:400,
    paddingHorizontal:30  
  }
}
>
<Text
style={
  {
   fontSize:10, 
   color:Colors.text,
   marginTop:60
  }
}
> Welcome to</Text>


<Text style={{
fontSize:30,

paddingRight:20,
color:'white'}}>
  VCOACH
</Text>

<Text
style={{
  marginTop:30,
  fontSize:9,
  color:'grey',
  marginBottom:20
}}
>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, cumque?
</Text>
<TouchableOpacity
style={{
  
  backgroundColor:'#7B68EE',
  // paddingHorizontal:40,
  paddingRight:15,
  paddingVertical:12,
  borderRadius:30,
  alignItems:'center',
}}
>
<Text 
style={{
  fontSize:12
}}
> get started</Text>
</TouchableOpacity>
</LinearGradient>
  </ImageBackground>
 )
}

/*
with react native you can style you react native with javascript 

 */

const styles = StyleSheet.create({

  

});