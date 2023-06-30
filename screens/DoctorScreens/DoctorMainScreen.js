import { StyleSheet, Text, View,Image,TouchableOpacity, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React,{useContext,useEffect,useState} from 'react';
import { fetchGlobal,DoctorPatientAssignmentsEndpoint } from '../../APIs';
import invitesList from '../../assets/invitesList.png';
import Patient from '../../Components/DoctorComponents/Patient';
import assignPatientIcon from '../../assets/addUser.png';
import assignExerciseIcon from '../../assets/addKeyframes.png';
import assignedExercisesIcon from '../../assets/assignedExercises.png';
import homeOffIcon from '../../assets/homeOff.png';
import messagesOffIcon from '../../assets/messagesOff.png';
import homeOnIcon from '../../assets/homeOn.png';
import messagesOnIcon from '../../assets/messagesOn.png';
import global from '../../styles/global';
export default function DoctorMainScreen({navigation}) {
    const {user,logout} = useContext(AuthContext)
    const [patients, setPatients] = useState([])
    const [imageIndex, setImageIndex] = useState(1)
    useEffect(() => {
      const fetchPatients = async () => {
        try {
          const response = await fetchGlobal(DoctorPatientAssignmentsEndpoint);
          setPatients(response.data.users);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchPatients()
    },[])

    const navigateToTab = (index,tabName) => {
      setImageIndex(index)
      // navigation.navigate(tabName)
      if(index == 3)
        logout()
    }
    const removePatient = async (patientId) => {
      //need to figure out how to rerender
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
      setPatients((patients) => patients.filter((patient) => patient.id !== patientId))
    }
    return (
      <View style={[global.defaultBackgroundColor,styles.container]}>
          <View style={[global.userInfo,styles.userInfoContainer]}>
            <Text style={global.userInfoText}>
              <Text style={[global.helloText,styles.helloText]}>Hello,</Text>
              <Text>{'\n'}</Text>
              <Text style={[global.userNameText,styles.userName]}>Dr.{user.first_name}</Text>
            </Text>
            <View style={global.imageContainer}>
              <Image style={global.profileImage} source={{uri:user.avatar.url}}/>
            </View>
          </View>
          <View style={styles.actionsMenuContainer}>
            <View style={styles.actionsMenuButtons}>
              <TouchableOpacity onPress={()=> navigation.navigate('AssignPatientScreen')} style={styles.button}>
                <Image source={assignPatientIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.actionsMenuButtons}>
              <TouchableOpacity onPress={()=> navigation.navigate('AssignExercisesScreen',{patients:patients})} style={styles.button}>            
              <Image source={assignExerciseIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.actionsMenuButtons}>
              <TouchableOpacity onPress={()=> navigation.navigate('ListExercisesScreen')} style={styles.button}>
                <Image source={invitesList} />
              </TouchableOpacity>
            </View>
            <View style={styles.actionsMenuButtons}>
              <TouchableOpacity onPress={()=> navigation.navigate('SeeAssignedExercises')} style={styles.button}>
                <Image source={assignedExercisesIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionsMenuText}>
            <Text onPress={()=> navigation.navigate('AssignPatientScreen')} style={styles.buttonText}>New Patient</Text>
            <Text onPress={()=> navigation.navigate('AssignExercisesScreen')} style={styles.buttonText}>Assign Exercises</Text>
            <Text onPress={()=> navigation.navigate('ListExercisesScreen')} style={styles.buttonText}>See list of exercises</Text>
            <Text onPress={()=> navigation.navigate('SeeAssignedExercises')} style={styles.buttonText}>See Assigned Exercises</Text>
          </View>
          <View>
          <View style={styles.seeAllPatients}>
            <Text style={styles.patientText}>Patients</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SeePatientScreen',{patients:patients})} style={styles.seeAllBtn}>
                <Text style={styles.seeAllText}>See All Patients</Text>
            </TouchableOpacity>
          </View>
          <ScrollView alwaysBounceVertical={true} bounces={true} style={styles.patientInfoContainer}>
            {patients.slice(0,3).map((patient,index) => (
              <View key={patient.id} style={index == 2 ? styles.hideLastPatientBorder : styles.showPatientBorder}>
                <Patient  key={patient.id} patient={patient} removePatient={removePatient}/>
              </View>
            ))}
          </ScrollView>
          </View>
        <View style={styles.quickAccessMenuContainer}>
          <View style={styles.quickAccessItem}>
          <TouchableOpacity onPress={()=>navigateToTab(1,'Home')} style={styles.quickAccessItemBtn}>
            <Image source={imageIndex == 1 ? homeOnIcon : homeOffIcon} />
            <Text style={styles.quickAccessItemText}>Home</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.quickAccessItem}>
          <TouchableOpacity onPress={()=>navigateToTab(2,'Messages')} style={styles.quickAccessItemBtn}>
            <Image source={imageIndex == 2 ? messagesOnIcon : messagesOffIcon} />
            <Text style={styles.quickAccessItemText}>Messages</Text>
          </TouchableOpacity>
          </View>
          <View style={styles.quickAccessItem}>
          <TouchableOpacity onPress={()=>navigateToTab(3,'LogOut')}  style={styles.quickAccessItemBtn}>
            <Image source={require('../../assets/signOut.png')} />
            <Text style={styles.quickAccessItemText}>LogOut</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  showPatientBorder:{
    borderBottomWidth:1,
    borderColor:'gray',
    paddingVertical:10,
  },  
  hideLastPatient:{
    borderBottomWidth:0,
  },
  userInfoContainer:{
    marginBottom:30,
    padding:15,
  },
  btnText:{
    color:'white',
    fontSize: 15,
  },
  submitButton:{
    borderRadius:30,
    backgroundColor:'#6C63FF',
    marginTop:1,
    alignItems:'center',
    alignSelf:'center',
    width:"20%"
  },
  actionsMenuButtons:{
    flexDirection:'row',
    width:"25%",
    justifyContent:'center',
  },
  actionsMenuContainer:{
    flexDirection:'row',
    width:"100%",
    padding:5,
  },
  actionsMenuText:{
    flexDirection:'row',
    marginTop:10,
    padding:5,
  },
  button:{
    borderColor:'gray',
    borderWidth:1,
    borderRadius:30,
    width:47,
    height:"100%",
    padding:10,
    alignItems:'center',
  },
  buttonText:{
    fontSize:15,
    color:'white',
    width:"25%",
    textAlign:'center',
  },
  userName:{
    fontSize:30,
  },
  helloText:{
    fontSize:20,
  },
  patientInfoContainer:{
    padding:10,
    paddingBottom:0,
    paddingTop:0,
    margin:10,
    marginBottom:5,
    flexDirection:'column',
    backgroundColor:'#21202E',
    borderRadius:15,
  },
  patientText:{
    fontSize:20,
    color:'white',
    width:"75%",
    alignSelf:'flex-end',
  },
  seeAllPatients:{
    padding:10,
    flexDirection:'row',
  },
  seeAllText:{
    color:'white',
    padding:5
  },
  seeAllBtn:{
    borderRadius:30
  },
  quickAccessMenuContainer:{
    flexDirection:'row',
    marginTop:'auto'
  },
  quickAccessItem:{
    width:"33%",
    padding:15,
    marginTop:"30%",
    borderTopColor:'gray',
    borderTopWidth:.5,
  },
  quickAccessItemBtn:{
    alignItems:'center',
    justifyContent:'center',
  },
  quickAccessItemText:{
    fontSize:15,
    color:'white',
  }
});
