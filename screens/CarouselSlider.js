import { View, Text,StyleSheet, FlatList,Image } from 'react-native'
import React,{useState} from 'react'
import slides from '../slides'
import OnboardingItem from './onboardingItem'
import { TouchableOpacity } from 'react-native'
const CarouselSlider = () =>{
const item=[
    {
        id:'1',
        title:'find the right work for your need',
        img:require('../assets/slide1.png') ,
        buttonTitle:'next',
        islast:1
    },
    {
        id:'2',
        title:'facilite communication with your doctor',
        img:require('../assets/slide2.png'),
        buttonTitle:'next',
        islast:1
    },
    {
        id:'3',
        title:'get the result you desire',
        img:require('../assets/slide3.png'),
        buttonTitle:'finish',
        islast:0
    }
]
const [screen, setScreen]=useState(item[0])

function dothis(){
    const index = parseInt(screen.id) - 1;
    if (index === item.length - 1) {
      // navigate to the other screen
    } else {
      setScreen(item[index + 1]);
    }
  }

  return (
    <View style={styles.container} >
        <Image  source={screen.img} alt={screen.title} style={styles.img} />
       <View style={styles.innerCont}>
       <Text style={styles.title}>{screen.title}</Text>
       <Text style={styles.counter}> {screen.id}/{item.length}</Text>
        <TouchableOpacity>
        <Text onPress={dothis} style={styles.button}>{screen.islast===1? "Next":"last"}</Text>
        </TouchableOpacity>
       </View>   
    </View>
  )
}
const styles=StyleSheet.create({
container:{
    flex:1,
     backgroundColor:'#1B1620',
},
img:{
    //height:'70%',
    flex:0.6,
width:"100%"
},
counter:{
color:'white',
marginTop:30,
alignSelf:'center',
},
innerCont:{
    flex:0.5,
    height:'100%',
backgroundColor:' #262626'
},
title:{
    marginTop:'5%',
    fontSize:15,
width:"50%",
color:'white',
alignSelf:'center',
textAlignVertical: 'center'
},
button:{
     marginTop:"10%",
    width:'70%',
    backgroundColor:'#6C63FF',
     paddingHorizontal:110,
    paddingRight:30,
    paddingVertical:15,
    borderRadius:30,
    alignItems:'center',
    alignSelf:'center',
    fontSize:15,
    
}
})

export default CarouselSlider;