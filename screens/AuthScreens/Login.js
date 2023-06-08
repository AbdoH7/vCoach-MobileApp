import React,{useContext} from 'react';
import { View, Text,Keyboard, TouchableWithoutFeedback,Image ,StyleSheet,Button } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {AuthContext} from '../../context/AuthContext';
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter your email address'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter your password'),
});

export default function Login() {
  const {login} = useContext(AuthContext);
  return (
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.overlay}>
      <Image source={require('../../assets/v.png')} style={styles.icon} />
        <View style={styles.formContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            >
            {({ handleChange, handleBlur, values, errors, touched }) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    autoCapitalize="none"
                    />
                </View>
                {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                    />
                  <FontAwesome name="lock" size={24} color="white" />
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                  )}
                <Button className=' bg-slate-600' style={styles.button} title="Sign In"  onPress={()=>{login(values)}} />
              </>
            )}
          </Formik>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles=StyleSheet.create({
//   backgroundImage: {
//     flex: 1,
// resizeMode: 'cover',
// backgroundColor: 'white',
// },
overlay: {
flex: 1,
backgroundColor: 'rgba(0, 0, 0)',
justifyContent: 'center',
alignItems: 'center',
},
formContainer: {
width: '100%',
backgroundColor: 'white',
padding: 20,
borderRadius: 10,
},
inputContainer: {
flexDirection: 'row',
alignItems: 'center',
marginBottom: 10,
borderBottomWidth: 1,
borderBottomColor: 'lightgray',
},
input: {
flex: 1,
height: 40,
color: 'black',
paddingLeft: 10,
},
error: {
color: 'red',
fontSize: 10,
marginTop: 5,
},
button: {
//backgroundColor: '#6495ED',
padding: 5,
borderRadius:40, 
}
})