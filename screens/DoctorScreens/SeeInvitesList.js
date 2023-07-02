import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchGlobal, InvitesEndpoint } from "../../APIs";
import BottomBar from "../../Components/Common/BottomBar";
export default function SeeInvitesList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [invitesList, setList] = useState([]);
  const [textInputStyle, setStyle] = useState(styles.textInput);
  const invitesListFiltered = invitesList.filter((invite) => {
    return(
    invite.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  });
  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const response = await fetchGlobal(InvitesEndpoint);
        setList(response.data.invites);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchInvites();
  }, []);
  const textInputFocus = (data) => {
    setStyle(styles.textInputFocus);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invites</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={textInputStyle}
          placeholderTextColor={"white"}
          placeholder="Enter Email To Search For"
          onChangeText={setSearchTerm}
          onFocus={textInputFocus}
        ></TextInput>
      </View>
      <ScrollView style={styles.invitesContainer}>
        {searchTerm === "" ? (
          invitesList.map((invites) => {
            return (
              <View style={styles.invite} key={invites.id}>
                <Text style={styles.email}>Email: {invites.email}</Text>
                <Text
                  style={[
                    styles.text,
                    invites.accepted ? styles.green : styles.red,
                  ]}
                >
                  {invites.accepted == true ? "Accepted" : "Not Accepted"}
                </Text>
              </View>
            );
          })
        ) : invitesListFiltered.length > 0 ? (
          invitesListFiltered.map((invites) => {
            return (
              <View style={styles.invite} key={invites.id}>
                <Text style={styles.email}>Email: {invites.email}</Text>
                <Text
                  style={[
                    styles.text,
                    invites.accepted ? styles.green : styles.red,
                  ]}
                >
                  {invites.accepted == true ? "Accepted" : "Not Accepted"}
                </Text>
              </View>
            );
          })
        ) : (
          <View style={styles.noResultsContainer}>
            <Text style={styles.noResultsText}>No results found</Text>
          </View>
        )}
      </ScrollView>
      <BottomBar/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1B1620",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
  },
  header: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  searchBar: {
    height: 50,
    margin: 10,
  },
  textInput: {
    color: "white",
    backgroundColor: "#21202E",
    borderRadius: 15,
    textAlign: "center",
    height: "100%",
    fontSize: 18,
  },
  textInputFocus: {
    color: "white",
    backgroundColor: "#21202E",
    borderRadius: 15,
    textAlign: "left",
    height: "100%",
    paddingLeft: 15,
    fontSize: 18,
  },
  invitesContainer: {
    margin: 10,
    marginBottom:"20%"
  },
  invite: {
    flexDirection: "column",
    backgroundColor: "#231F2E",
    borderWidth: 1,
    borderColor: "#6C636F",
    borderRadius: 30,
    marginTop: 15,
    padding: 15,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
  email: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsText: {
    fontSize: 16,
    color: "gray",
  },
});
