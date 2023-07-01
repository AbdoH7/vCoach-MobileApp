import DateTimePicker from '@react-native-community/datetimepicker';
import {View,Button,Text, TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React,{useState,useEffect} from 'react'
import { AntDesign } from '@expo/vector-icons';

const DateField = (props)=>{
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const onChange = async (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        await setDate(currentDate);
      };
      const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
          setShow(false);
          // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
      };
      const showDatepicker = () => {
        showMode('date');
        setShow(true)
      };
      useEffect(() => {
        let holderDate = date
        let dateString = date_TO_String(holderDate)
        props.updateDate(dateString)
      }, [date])
      return(
        <View style={styles.container}>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                    />
                )}
                <TextInput editable={false} style={styles.textInput} placeholderTextColor={'#DCDAFF'} placeholder={`Date of Birth: ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`} />
            <TouchableOpacity onPress={showDatepicker} style={styles.dateBtn}>
                {/* <Text style={{ fontSize:16,alignItems:'center',textAlign:'center',color:'white'}}>Select Date of Birth</Text> */}
                <AntDesign name="calendar" size={35} color="black" />
            </TouchableOpacity>
        </View>
      )
}

function date_TO_String(date_Object) {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    var date_String = date_Object.getFullYear() +
       "-" +
       (date_Object.getMonth() + 1) +
       "-" +
        (date_Object.getDate());
    return date_String;
 }
export default DateField


const styles = StyleSheet.create({
  container:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
  },
  dateBtn: {
    backgroundColor: "#6C63FF",
    borderRadius: 15,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    padding:5,
    marginTop:0,
    },
  textInput:{
    backgroundColor: "#21202E",   
    height: 55,
    fontSize:14,   
    borderRadius: 15,
    padding:5,
    paddingLeft:10,
    marginTop:0,
    width:'82%'
  }})
