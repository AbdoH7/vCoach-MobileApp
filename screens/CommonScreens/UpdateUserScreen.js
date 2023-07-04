import React, { useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from "formik";
import {updateUserInfo,putGlobalFormData} from "../../APIs";
import * as ImagePicker from "expo-image-picker";
import DateField from "../../Components/DateComponent/DateField";
import * as Yup from "yup";
import FormData from "form-data";
import { AuthContext } from "../../context/AuthContext";
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number"
    ),
  email: Yup.string()
    .email("Invalid email format, must have @ and .")
    .required("Required"),
  phone_number: Yup.string().required("Phone number is required"),
});

export default function SignUp({ route, navigation }) {
  const {updateUser} = useContext(AuthContext)
  const {DOB,avatar,email,first_name,last_name,phone_number,user_type,id} = route.params.user;
  const [userDateExists, setUserDateExists] = useState(DOB? true:false);
  const initialValues = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    new_password: "",
    phone_number: phone_number,
    DOB: DOB,
    user_type: user_type,
  };
  const [date, setDate] = useState(DOB);
  const updateDate = async (dateString) => {
    try {
      await setDate(dateString);
    } catch (err) {
      console.log("Date Selection Error(SignUp):", err);
    }
  };
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result.uri);
      }
    } catch (err) {
      console.log("Image Selection Error(SignUp):", err);
    }
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    values.DOB = date;
    if (image) {
      const fileUri = image;
      const fileName = fileUri.split("/").pop();
      const fileType = `image/${fileName.split(".").pop()}`;
      formData.append("avatar", {
        uri: fileUri,
        name: fileName,
        type:  fileType,
      });
    }
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    const res = await putGlobalFormData(updateUserInfo(id),formData);
    if (!res.hasError){
      updateUser(res.data);
      navigation.navigate("HomeScreen");
    }
 
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerTextView}>
        <Text style={styles.headerTextTitle}>Update your information</Text>
        <Text style={styles.headerTextDescription}>Please fill out the fields</Text>
      </View>
      <ScrollView style={styles.formView}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onFocus={console.log("focus")}
        >
          {({
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <>
              <View style={styles.imageView}>
                <TouchableOpacity
                  style={styles.imageButton}
                  onPress={pickImage}
                >
                  {image || avatar.url ? (
                    <Image source={{ uri: image || avatar.url  }} style={styles.image} />
                  ) : (
                    <View style={styles.imagePlacerHolder}>
                      <Text style={styles.imagePlacerHolderText}>
                        Upload Your Picture Here
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.inputFieldsContainer}>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Enter your first name'}
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
                  />
                  {touched.first_name && errors.first_name && (
                    <Text style={styles.errorText}>{errors.first_name}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Enter your last name'}
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    value={values.last_name}
                  />
                  {touched.last_name && errors.last_name && (
                    <Text style={styles.errorText}>{errors.last_name}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Enter your email'}
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    secureTextEntry={true}
                    placeholder="Enter your old password"
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    secureTextEntry={true}
                    placeholder="Enter your new password"
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("new_password")}
                    onBlur={handleBlur("new_password")}
                    value={values.new_password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Enter your phone number'}
                    placeholderTextColor={"#DCDAFF"}
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                  />
                  {touched.phone_number && errors.phone_number && (
                    <Text style={styles.errorText}>{errors.phone_number}</Text>
                  )}
                </View>
                <View style={styles.inputFieldView}>
                  <DateField type={"update"} userDate={DOB} setUserDateExists={setUserDateExists} userDateExists={userDateExists} currentDate={date} updateDate={updateDate} />
                </View>
                <View style={styles.inputFieldView}>
                  <TouchableOpacity
                    style={[styles.button, !isValid && !dirty ? styles.disabled : null]}
                    onPress={() => handleSubmit(values)}
                    disabled={!isValid}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
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
  headerTextView: {
    marginTop: "15%",
    height: "10%",
  },
  headerTextTitle: {
    paddingVertical: 10,
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  headerTextDescription: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
  },
  formView: {},
  imageView: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    borderRadius: 30,
    width: 100,
    height: 100,
  },
  imagePlacerHolder: {
    borderRadius: 30,
    width: 90,
    height: 90,
    backgroundColor: "#21202E",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlacerHolderText: {
    padding: 5,
    color: "#DCDAFF",
    fontSize: 14,
  },
  inputFieldsContainer: {
    marginTop: 20,
  },
  inputFieldView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputField: {
    height: 55,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 15,
    padding: 10,
    backgroundColor: "#21202E",
  },
  button: {
    backgroundColor: "#6C63FF",
    borderRadius: 15,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  errorText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  disabled: {
    opacity: 0.5,
  },
});
