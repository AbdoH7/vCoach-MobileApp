import { StyleSheet, Text, View,Image} from 'react-native';
import React,{useContext, useEffect, useState} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchGlobal,InvitesEndpoint } from '../../APIs';
export default function SeeInvitesList({navigation}) {
    const {user} = useContext(AuthContext)
    const [invitesList,setList] = useState([])
    useEffect(() => {
      const fetchInvites = async () => {
        try {
          const response = await fetchGlobal(InvitesEndpoint);
          setList(response.data.invites)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchInvites()
    },[])
    return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/doctor.png')}/>
      <Text style={styles.helloText}>You're Signed In {user.user_type} {user.first_name} !</Text>
      {
        invitesList.map((invites) => {
          return (
            <View key={invites.id} style={{flex:.1}}>
              <Text style={{fontSize:20}}>{invites.id}</Text>
              <Text>{invites.user_id}</Text>
              <Text>{invites.email}</Text>
            </View>
          )
        })
      }
      {/* {invitesList.length == 0 ? <Text>No Invites</Text> : invitesList.map((invites) => {<Text>{invites.id}</Text>})} */}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 100
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth:1,
    height: 40,
    color: 'black',
    paddingLeft: 10,
    },
  helloText: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: 'center'
  },
  image:{
borderRadius:30,
    width:50,
    height:50,
    alignSelf:'center',
  },
  content:{
borderRadius:30,
 
    //borderWidth:5,
    //borderColor:'red'
  },
  btnText:{
    color:'white',
    fontSize: 20,
  },
  submitButton:{
    borderRadius:30,
    flex:.2,
    backgroundColor:'#6495ED',
    marginTop:50,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center'
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
    padding: 50,
    borderRadius:30,
  },
  btnContainer:{
       alignItems:'center'
  }
});