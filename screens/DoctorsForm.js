import React,{useState} from 'react';
import { ScrollView,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView, StyleSheet,SafeAreaView,Text,Image,View,TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import { TextInput } from 'react-native';
import axios from 'axios';
import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  password: Yup.string().required('Password is required'),
  email: Yup.string().email('Invalid email').required('Required'),
  phone_number: Yup.string()
  .length(11, 'Phone number must be exactly 11 digits')
  .matches(/^[0-9]+$/, 'Phone number must only contain digits')
    .required('Required'),
});

export default function DoctorForm({route,navigation}) {


  const [token, setToken] = useState('');


  const  handleSubmit =(values,{ resetForm }) => {
    console.log(values);

    fetch("https://vcoach-eoymq.ondigitalocean.app/vcoach-backend2/api/v1/users",{
      method: 'POST',
      body: JSON.stringify(values),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log(response.status);
      //console.log('Response Content-Type:', response.headers.get('Content-Type'));
  return response.json();
})
    .then(data => {
      console.log('Success:', data);
      resetForm();
    })
    .catch((error) => {
      console.error('Error:', error);
      if (error instanceof SyntaxError) {
        console.error('JSON Parse Error:', error.message);
      }
    });
  }
  return (
    <KeyboardAvoidingView
    style={styles.inputContainer}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
    <SafeAreaView style={{marginTop:90}}>

<Formik
initialValues={{first_name:'',last_name:'',email:'',phone_number:'',user_type:'doctor',DOB:'2000-02-11T00:00:00.000Z'}}
onSubmit={handleSubmit}
validationSchema={validationSchema}
>
{formikProps =>(
  <View style={styles.container}>
     <Image source={require('../assets/v.png')} style={styles.icon}/>
    <ScrollView>
    <Text style={{textAlign:'center' }}> Create an account</Text>

    <View style={styles.inputContainer}>
      <Text style={styles.Text}>firstName</Text> 
    <TextInput
    value={formikProps.values.first_name}
    style={styles.input}
    onChangeText={formikProps.handleChange('first_name')}
    onBlur={formikProps.handleBlur('first_name')}
    />
     
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.Text} >lastName</Text> 
    <TextInput
    value={formikProps.values.last_name}
    
    style={styles.input}
    onChangeText={formikProps.handleChange('last_name')}
    />
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.Text}>email</Text> 
    <TextInput
    value={formikProps.values.email}

     onBlur={formikProps.handleBlur('email')}
     style={styles.input}
     onChangeText={formikProps.handleChange('email')}
     />
    {formikProps.touched.email &&formikProps.errors.email && (
      <Text style={styles.error}>{formikProps.errors.email}</Text>
      )}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.Text}>phone</Text> 
    <TextInput
    value={formikProps.values.phone_number}
    keyboardType='numeric'
    onBlur={formikProps.handleBlur('phone_number')}
    style={styles.input}
    onChangeText={formikProps.handleChange('phone_number')}
    />
     {formikProps.touched.phone_number &&formikProps.errors.phone_number&& (
       <Text style={styles.error}>{formikProps.errors.phone_number}</Text>
       )}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.Text}>password</Text> 
    <TextInput
    value={formikProps.values.password}

    secureTextEntry={true}
      style={styles.input}
      onChangeText={formikProps.handleChange('password')}
      />
    </View>
<TouchableOpacity
  onPress={formikProps.handleSubmit}
  style={styles.submitButton}
>
 <Text style={styles.submitText}>submit</Text>  
</TouchableOpacity>
  </ScrollView>  
  </View>
)}
</Formik>
{token && <Text>{`Token: ${token}`}</Text>}
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
