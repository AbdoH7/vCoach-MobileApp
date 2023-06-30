import DateTimePicker from '@react-native-community/datetimepicker';
import {View,Button,Text} from 'react-native'
import React,{useState,useEffect} from 'react'

const DateField = (props)=>{
    const [date, setDate] = useState(new Date(1598051730000));
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
        <View>
            <Button onPress={showDatepicker} title="Select Date of Birth" />
                <Text style={{alignItems:'center',textAlign:'center'}}>Selected: {`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`}</Text>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={onChange}
                    />
                )}
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
