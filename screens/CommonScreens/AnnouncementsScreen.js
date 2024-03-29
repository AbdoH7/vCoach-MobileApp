import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { fetchGlobal, Announcements } from "../../APIs";
import global from "../../styles/global";
import ViewAnnouncment from "../../Components/Common/announcements/ViewAnnouncement";
import { AuthContext } from "../../context/AuthContext";
import AddAnouncement from "../../Components/Common/announcements/AddAnouncement";
import BottomBar from "../../Components/Common/BottomBar";

export default function AnnouncmentsScreen({ navigation }) {
  const [announcements, setAnnouncements] = useState([]);
  const [submitted, setSubmitted] = useState(false); // to force re-render [not used
  const { user } = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      const fetchAnnouncements = async () => {
        try {
          const response = await fetchGlobal(Announcements);
          setAnnouncements(response.data.announcements);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchAnnouncements();
    }, [])
  );
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetchGlobal(Announcements);
        setAnnouncements(response.data.announcements);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAnnouncements();
    setSubmitted(false);
  }, [submitted]);

  return (
    <View style={[global.defaultBackgroundColor ,styles.outerContainer]}>
    <ScrollView style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>Announcements</Text>
      </View>
      {user.user_type == "doctor" && (
        <AddAnouncement submitted={setSubmitted} navigation={navigation} />
      )}
      {announcements.map((announcement, index) => {
        return (
          <ViewAnnouncment
            announcementt={announcement}
            navigation={navigation}
            key={index}
						submitted={setSubmitted}
            isLast={index == announcements.length - 1}
          />
        );
      })}
    </ScrollView>
      <BottomBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
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
  container: {
    flex: 1,
  },
});
