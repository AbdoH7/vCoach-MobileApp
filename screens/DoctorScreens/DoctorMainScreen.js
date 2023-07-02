import { StyleSheet, Text, View,Image,TouchableOpacity, ScrollView} from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import React,{useContext,useEffect,useState} from 'react';
import { fetchGlobal,DoctorPatientAssignmentsEndpoint } from '../../APIs';
import invitesList from '../../assets/invitesList.png';
import User from '../../Components/Common/User';
import assignPatientIcon from '../../assets/addUser.png';
import assignExerciseIcon from '../../assets/addKeyframes.png';
import assignedExercisesIcon from '../../assets/assignedExercises.png';
import BottomBar from '../../Components/Common/BottomBar';
import global from '../../styles/global';

export default function DoctorMainScreen({navigation}) {
    const {user} = useContext(AuthContext)
    const [patients, setPatients] = useState([])
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

    const removePatient = async (patientId) => {
      //need to figure out how to rerender
      await postGlobal(DoctorPatientAssignmentsRemoveEndpoint, {id: patientId})
      setPatients((patients) => patients.filter((patient) => patient.id !== patientId))
    const runAction = async (index) => {
        navigation.navigate('ListExercisesScreen',{patient_id:patients[index].id,patient_name:`${patients[index].first_name} ${patients[index].last_name}`})
    }
    return (
      <View style={[global.defaultBackgroundColor,styles.container]}>
          <View style={[global.userInfo,styles.userInfoContainer]}>
            <Text style={global.userInfoText}>
              <Text style={[global.helloText,styles.helloText]}>Hello,</Text>
              <Text>{'\n'}</Text>
              <Text style={[global.userNameText,styles.userName]}>Dr.{user.first_name}</Text>
            </Text>
            <View style={[global.imageContainer]}>
              <TouchableOpacity onPress={()=> navigation.navigate('UpdateUserScreen',{user:user})}>
              <Image style={global.profileImage} source={{uri:user.avatar.url}}/>
                <Text>press here</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionsMenuContainer}>
            <View style={styles.actionsMenuButtons}>
              <TouchableOpacity onPress={()=> navigation.navigate('AddPatientScreen')} style={styles.button}>
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
            <Text onPress={()=> navigation.navigate('AddPatientScreen')} style={styles.buttonText}>New Patient</Text>
            <Text onPress={()=> navigation.navigate('AssignExercisesScreen')} style={styles.buttonText}>Assign Exercises</Text>
            <Text onPress={()=> navigation.navigate('ListExercisesScreen')} style={styles.buttonText}>See list of exercises</Text>
            <Text onPress={()=> navigation.navigate('SeeAssignedExercises')} style={styles.buttonText}>See Assigned Exercises</Text>
          </View>
          <View>
          <View style={styles.seeAllPatients}>
            <Text style={styles.patientText}>Patients</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('SeePatientScreen',{users:patients})} style={styles.seeAllBtn}>
                <Text style={styles.seeAllText}>See All Patients</Text>
            </TouchableOpacity>
          </View>
          <ScrollView alwaysBounceVertical={true} bounces={true} style={styles.patientInfoContainer}>
            {patients.slice(0,3).map((patient,index) => (
              <View key={index} style={[styles.allContainer,index == patients.slice(0,3).length - 1 && styles.hideLastPatient]}>
            <View key={patient.id} style={styles.showPatientBorder}>
              <User index={index}  key={patient.id} patient={patient}/>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity style={[styles.removeButton]} onPress={()=>{runAction(index)}}>
                <Text style={[{color:'#26ae60'},styles.removeButtonText]}>+</Text>
              </TouchableOpacity>
            </View>
            </View>
            ))}
          </ScrollView>
          </View>
          <BottomBar navigation={navigation}/>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
  },
  allContainer:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'gray',
  },
  hideLastPatient:{
    borderBottomWidth:0,
  },
  showPatientBorder:{
    paddingVertical:10,
    width:'80%',
  }, 
  btnView:{
    flexDirection:'row',
    width:'20%',
    justifyContent:'center',
  },
  removeButton:{
    marginTop:'50%',
    borderColor:'white',
    borderWidth:1,
    borderRadius:30,
    width:25,
    height:25,
    marginLeft:10,
    marginRight:10,
  },
  removeButtonText:{
    fontSize:15,
    alignSelf:'center',
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
  }
});
