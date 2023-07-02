import React,{useContext} from "react";
import { View, Text,TouchableOpacity,Image } from "react-native";
import { StyleSheet } from "react-native";
import homeOffIcon from '../../assets/homeOff.png';
import messagesOffIcon from '../../assets/messagesOff.png';
import homeOnIcon from '../../assets/homeOn.png';
import messagesOnIcon from '../../assets/messagesOn.png';
import { AuthContext } from "../../context/AuthContext";
import { useRoute } from '@react-navigation/native';
export default function BottomBar({navigation}) {
  const {logout} = useContext(AuthContext)
  const route = useRoute();
  console.log(route.name)
  const navigateToTab = (index,tabName) => {
    if(index == 3) return logout()
    navigation.navigate(tabName)
  }
  return (
    <View style={styles.container}>
      <View style={styles.quickAccessItem}>
        <TouchableOpacity
          onPress={() => navigateToTab(1, "HomeScreen")}
          style={styles.quickAccessItemBtn}
        >
          <Image source={route.name == 'HomeScreen' ? homeOnIcon : homeOffIcon} />
          <Text style={styles.quickAccessItemText}>Home</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quickAccessItem}>
        <TouchableOpacity
          onPress={() => navigateToTab(2, "Announcements")}
          style={styles.quickAccessItemBtn}
        >
          <Image source={route.name == 'AnnouncementsScreen' ? messagesOnIcon : messagesOffIcon} />
          <Text style={styles.quickAccessItemText}>Announcements</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.quickAccessItem}>
        <TouchableOpacity
          onPress={() => navigateToTab(3, "LogOut")}
          style={styles.quickAccessItemBtn}
        >
          <Image source={require("../../assets/signOut.png")} />
          <Text style={styles.quickAccessItemText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#21202E",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    height: "10%",
    flexDirection:'row',
    alignItems:'flex-end'
  },
  quickAccessItem:{
    width:"33%",
    padding:15,
  },
  quickAccessItemBtn:{
    alignItems:'center',
    justifyContent:'center',
  },
  quickAccessItemText:{
    fontSize:15,
    color:'white',
    width:150,
    textAlign:'center',
  }
});
