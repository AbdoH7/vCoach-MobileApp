import { StyleSheet, Text, View,Image,TouchableOpacity} from 'react-native';

export default function AuthMain({navigation}) {
    return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/Cycle.png')} style={styles.image}/>
      </View>
        <Image source={require('../../assets/Logo.png')} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.text} >AI powered coach that helps you to achieve healthier life and ease the communication with your doctor </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("CheckType")}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.text}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.boldText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  imageContainer:{
    flex:.6,
    marginBottom:20,
    zIndex: 0,
  },
  image:{
    borderRadius:1,
    width:'100%',
    height:'100%',
  },
  content:{
    flex:1,
    zIndex: 1,
  },
  boldText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
  ,icon:{
    alignSelf:'center',
    width:125,
    height:125,
    marginBottom:15
  },
  text:{
    fontSize: 15,
    textAlign:'center',
    marginBottom:10
  },
  textContainer:{
    marginLeft:'auto',
    marginRight:'auto',
    width:'80%',
  },
  signUpButton:{
    backgroundColor:'#359960', //6495ED
    padding: 15,
    borderRadius:15,
    width:200,
  },
  signUpText:{
    color:'white',
    textAlign:'center',
    fontSize: 20,
  },
  btnContainer:{    
    alignItems:'center',
  }
});
