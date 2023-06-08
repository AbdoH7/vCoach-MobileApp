import { StyleSheet, Text, View,Image,Button,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React,{useContext} from 'react';
export default function MainMenu({navigation}) {
    const {logout} = useContext(AuthContext)
    return (
    <View style={styles.container}>
        <Text>You're Signed In !</Text>
        <TouchableOpacity onPress={logout} style={{paddingVertical:250}}>
            <Text>Sign Out</Text>
        </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  image:{
borderRadius:30,
    width:420,
    height:350,

  },
  content:{
borderRadius:30,
 
    //borderWidth:5,
    //borderColor:'red'
  },
  boldText: {
    marginLeft: 10,
  }
  ,icon:{
   marginLeft:40,
    width:300,
   height:110,
   marginBottom:20
  },
  text:{
    marginLeft:70,
    fontSize: 10,
    //fontWeight: '200',
    marginRight:30,
    marginBottom:40
  },
  text1:{
  fontSize:10,
//fontStyle:'italic',
  },
  bt:{
    padding: 10,
    borderRadius:30
  },
  btnContainer:{
       
       alignItems:'center'
  }
});
