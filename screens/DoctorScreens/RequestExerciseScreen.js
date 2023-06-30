import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

export default function RequestExerciseScreen({ route }) {
  const { exercises } = route.params;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Exercise name is required"),
    body_area: Yup.string().required("Body Area is required"),
    description: Yup.string().required("A Description is required"),
    equipment: Yup.string(),
  });
  const handleSubmit = (values) => {
    console.log(values);
  };
  const initialValues = {
    description: "",
    body_area: "",
    description: "",
    equipment: "",
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Requests</Text>
      </View>
      <ScrollView styles={styles.formContainer}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <View style={styles.form}>
              <View style={styles.formFields}>
                <View style={styles.formTextView}>
                  <Text style={styles.label}>Exercise Name</Text>
                  <TextInput
                    placeholder="Enter Name"
                    placeholderTextColor={"white"}
                    style={styles.textInputFocus}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <View style={styles.formTextView}>
                  <Text style={styles.label}>Body Area</Text>
                  <TextInput
                    placeholder="Enter Body Area"
                    placeholderTextColor={"white"}
                    style={styles.textInputFocus}
                    onChangeText={handleChange("body_area")}
                    onBlur={handleBlur("body_area")}
                    value={values.body_area}
                  />
                </View>
                {touched.body_area && errors.body_area && (
                  <Text style={styles.errorText}>{errors.body_area}</Text>
                )}
                <View style={styles.formTextView}>
                  <Text style={styles.label}>Description</Text>
                  <TextInput
                    placeholder="Enter Description"
                    placeholderTextColor={"white"}
                    style={styles.textInputFocus}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    value={values.description}
                  />
                </View>
                {touched.description && errors.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
                <View style={styles.formTextView}>
                  <Text style={styles.label}>Equipment Used (if exists)</Text>
                  <TextInput
                    placeholder="Enter Equipment"
                    placeholderTextColor={"white"}
                    style={styles.textInputFocus}
                    onChangeText={handleChange("equipment")}
                    onBlur={handleBlur("equipment")}
                    value={values.equipment}
                  />
                </View>
              </View>
              <View style={styles.submitButtonView}>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
  },
  image: {
    borderRadius: 30,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  textInputFocus: {
    color: "white",
    backgroundColor: "#21202E",
    borderRadius: 15,
    textAlign: "left",
    paddingLeft: 15,
    fontSize: 18,
    height: 60,
  },
  label: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  formContainer: {},
  form: {
    padding: 15,
    marginTop: 20,
    height: "80%",
  },
  formFields: {
    marginBottom: 20,
    padding: 10,
  },
  formTextView: {
    marginBottom: 15,
  },
  submitButtonView: {
    // marginTop: ,
  },
  submitButton: {
    borderRadius: 20,
    backgroundColor: "#6C63FF",
    padding: 20,
    marginBottom: 5,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
});
