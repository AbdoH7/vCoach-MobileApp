import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: Yup.string()
    .required("Please enter your password"),
});

export default function SignUp({ route, navigation }) {
  const { login  } = useContext(AuthContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    await login(values);
  }
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        resizeMode="cover"
        style={styles.imageBackground}
        source={require('../../assets/background.jpg')}
      >
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerTextView}>
            <Text style={styles.headerTextTitle}>Login to the app</Text>
            <Text style={styles.headerTextDescription}>Tell us who you are?</Text>
          </View>
          <View style={styles.formView}>
            <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }) => (
                <>
                  <View style={styles.inputFieldView}>
                    <TextInput
                      style={styles.inputField}
                      placeholder="Email"
                      placeholderTextColor="#DCDAFF"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputFieldView}>
                    <TextInput
                      secureTextEntry
                      style={styles.inputField}
                      placeholder="Password"
                      placeholderTextColor="#DCDAFF"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={styles.inputFieldView}>
                    <TouchableOpacity
                      style={[styles.button, !isValid ? styles.disabled : null]}
                      onPress={handleSubmit}
                      disabled={!isValid}
                    >
                      <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(27, 22, 32, 0.8)',
  },
  imageBackground: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  headerTextView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '40%',
  },
  headerTextTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  headerTextDescription: {
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
  },
  formView: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  inputFieldView: {
    marginVertical: 10,
  },
  inputField: {
    height: 55,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#21202E',
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});
