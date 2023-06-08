import { StyleSheet, Text, View,Image,Button,TouchableOpacity} from 'react-native';

export default function AuthMain({navigation}) {
    return (
    <View style={styles.container}>
      <Image source={require('../../assets/gym.png')} style={styles.image}/>
      <View style={styles.content}>
        <Image source={require('../../assets/v.png')} style={styles.icon} />
        <Text style={styles.text} >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod et enim eligendi pariatur assumenda temporibus, nesciunt aspernatur sed! Qui, corporis. </Text>
        <View style={styles.btnContainer}>
          <Button title='Sign in' color={'#6495ED'} style={styles.bt} onPress={()=>{navigation.navigate("Login")}}/>
          <Text style={styles.text1}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("CheckType")}>
            <Text style={styles.boldText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
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
