import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CheckType = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <TouchableOpacity style={styles.cardContainer} onPress={() =>navigation.navigate('SignUp',{user_type:'doctor'})}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={ require('../../assets/dow.jpg') }
          />
          <Text style={styles.cardText}>Doctor</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('SignUp',{user_type:'patient'})}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            source={require('../../assets/users.png')}
          />
          <Text style={styles.cardText}>User</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  cardContainer: {
    flexDirection:'column',
    marginBottom: 30,
  },
  card: {
    width: 150,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

  },
  image: {
    width: 150,
    height: 100,
  marginBottom:70,
  },
  cardText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});

export default CheckType;
