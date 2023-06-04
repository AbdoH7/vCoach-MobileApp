import React,{useContext,useEffect,useState} from 'react';
import { ScrollView,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView, StyleSheet,SafeAreaView,Text,Image,View,TouchableOpacity } from 'react-native';
import { Formik, useFormikContext } from 'formik';
import { TextInput,Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import DateField from '../Components/DateComponent/DateField';
import * as Yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string().required('Password is required').matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone_number: Yup.string()
  .length(11, 'Phone number must be exactly 11 digits')
  .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .required('Required'),
});



export default function Form({route,navigation}) {
    const {signup} = useContext(AuthContext);
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        phone_number: '',
        DOB: '',
        user_type:`${route.params.user_type}`
    }
    const [date, setDate] = useState(new Date(1598051730000));
    const updateDate = async (dateString) => {
        await setDate(dateString);
    }
  return (
    <KeyboardAvoidingView
    style={styles.inputContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView style={{marginTop:90}}>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}>
            {(formikProps) =>(
            <View style={styles.container}>
                <Image source={require('../assets/v.png')} style={styles.icon}/>
                <ScrollView>
                    <Text style={{textAlign:'center' }}> Create an account</Text>
                     <View style={styles.inputContainer}>
                        <Text style={styles.Text}>First Name</Text> 
                        <TextInput
                        style={styles.input}
                        onChangeText={formikProps.handleChange('first_name')}
                        onBlur={formikProps.handleBlur('first_name')}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.Text} >Last Name</Text> 
                        <TextInput   
                        style={styles.input}
                        onChangeText={formikProps.handleChange('last_name')}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.Text}>Email Address</Text> 
                        <TextInput
                        onBlur={formikProps.handleBlur('email')}
                        style={styles.input}
                        onChangeText={formikProps.handleChange('email')}
                        />
                        {formikProps.touched.email &&formikProps.errors.email && (
                        <Text style={styles.error}>{formikProps.errors.email}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.Text}>Phone Number</Text> 
                        <TextInput
                        keyboardType='numeric'
                        onBlur={formikProps.handleBlur('phone_number')}
                        style={styles.input}
                        onChangeText={formikProps.handleChange('phone_number')}
                        />
                        {formikProps.touched.phone_number && formikProps.errors.phone_number&& (
                        <Text style={styles.error}>{formikProps.errors.phone_number}</Text>
                        )}
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.Text}>Password</Text> 
                        <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={formikProps.handleChange('password')}
                        />
                    </View> 
                    <View>
                    <DateField updateDate={updateDate}/>
                    </View> 
                    <TouchableOpacity onPress={() => {signup({...formikProps.values,DOB:date,user_type:route.params.user_type})}} style={styles.submitButton}>
                        <Text style={styles.submitText}>Submit</Text>  
                    </TouchableOpacity>
                </ScrollView>  
            </View>
            )}
        </Formik>
    </SafeAreaView>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    icon:{
        //flex:1,
        marginTop:-60,
        height:'20%'
    },
    
    container: {
        //flex:1,
        width:'100%'
    },
    inputContainer:{
        //flex:1,
        marginBottom:5,
        marginTop:10,
    },
    Text:{
        //color:'darkblue',
        //fontWeight:'thin'
        fontSize:10,
        marginLeft:6,
        marginTop:6
    },
    submitButton:{
        borderRadius:30,
        //flex:1,
    backgroundColor:'#6495ED',
        marginTop:25,
        marginLeft:120,
        marginRight:120,
        textAlign:'center',
        //alignItems:'center',
        justifyContent:'center'
    },
    submitText:{
        textAlign:'center',
        color:'white',
        padding:10,
        fontSize:12
    },
    input:{
        borderWidth:1,
        marginLeft:5,
        marginRight:5,
    },
    error: {
        color: 'red',
        fontSize: 11,
        marginTop: 2,
        textAlign: 'right',
        width: '100%',
    }
});
