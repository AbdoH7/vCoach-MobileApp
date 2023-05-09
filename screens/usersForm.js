import React,{useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, Text, TextInput, TouchableOpacity, View,Image} from 'react-native';
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  password: Yup.string().required('Password is required'),
   dob: Yup.date().required('Date of birth is required'),
  phone: Yup.number().required('Phone number is required'),
});

const initialValues = {
  firstName:'',
  lastName:'',
  password:'',
  //dob:'',
  phone:'',
};
// const onSubmit = (values, { setSubmitting }) => {
//   setTimeout(() => {
//     alert(JSON.stringify(values, null, 2));
//     setSubmitting(false);
//   }, 400);
// };
// const onSubmit=(values)=>{
// alert(JSON.stringify(values));
// }
  
export default FormComponent = () => { 
return (
    <View>

    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values)=>{
      console.log(values);
   alert(JSON.stringify(values))
    }}
    >

       {/* props */}
    {({ errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
    <Image source={require('../assets/v.png')} style={styles.icon}/>
    <View> 
    <Text>please enter user information</Text>
    </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name:</Text>
          <TextInput
          placeholder='name'
          style={styles.input}
          onChangeText={handleChange('firstName')}
          //onBlur={handleBlur('firstName')}
          value={values.firstName}
          />
          {touched.firstName && errors.firstName && (
            <Text style={styles.error}>{errors.firstName}</Text>
            )}
            </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name:</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange('lastName')}
            onBlur={handleBlur('lastName')}
            value={values.lastName}
            />
          {touched.lastName && errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
            )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && (
              <Text style={styles.error}>{errors.password}</Text>
              )}
        </View>


        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            onChangeText={handleChange('phone')}
            onBlur={handleBlur('phone')}
            value={values.phone}
          />
          {touched.phone && errors.phone && (
              <Text style={styles.error}>{errors.phone}</Text>
              )}
        </View>
         {/* <DatePicker date={date} onDateChange={setDate} /> */}
        
        {/* <Button title='submit' onPress={handleSubmit} /> */}
        <TouchableOpacity
           style={styles.submitButton}
           onPress={handleSubmit}
          //disabled={isSubmitting}
          >
          <Text style={styles.submitButtonText}>Submitt</Text>
          </TouchableOpacity>
      </View>
    )}
  </Formik>
  
</View>
);
}


const styles = StyleSheet.create({
    //container: {
       //marginBottom:100 ,
      // flex: 1,
       //alignItems: 'center',
       //justifyContent: 'center',
       //paddingHorizontal: 20,
     //},
    // inputContainer: {
    //    flex:1,
    //    flexDirection: 'column',
    //     alignItems: 'flex-start',
    //    marginVertical: 50,
    //    width: '100%',
    //  },
     label: {
       fontSize: 9,
       //fontWeight: 'bold',
       marginBottom: 5,
       color:'black'
     },
     input: {
       width: '100%',
       height: 35,
       borderWidth: 1,
       borderRadius: 5,
       paddingHorizontal: 10,
       fontSize: 12,
     },
     error: {
       color: 'red',
       fontSize: 11,
       marginTop: 5,
       textAlign: 'right',
       width: '100%',
     },
     submitButton: {
      marginLeft:80,
      width:'50%' ,
     backgroundColor: '#6495ED',
       paddingVertical: 10,
       paddingHorizontal: 20,
       borderRadius: 25,
       marginTop: 20,
       textAlign:'center'
     },
     submitButtonText: {
       color: 'white',
       fontSize: 14,
       //fontWeight: 'bold',
     },
   });



