import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FilterMenu from "../components/notifications/FilterMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@src/components/ui/typography";
import Icon from "@src/components/ui/Icon";

const Notifications = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [
    notifications,
    {
      /*setNotifications*/
    },
  ] = useState([
    {
      id: "1",
      type: "Summary",
      text: "28/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "11:00 PM",
    },
    {
      id: "2",
      type: "Challenge",
      text: "Anderson is In! 💪",
      detail:
        'Anderson has joined your challenge "WMDD Battle"! Get ready to compete and have fun!',
      time: "10:43 AM",
    },
    {
      id: "3",
      type: "Challenge",
      text: "Tyler is In! 💪",
      detail:
        'Tyler has joined your challenge "WMDD Battle"! Get ready to compete and have fun!',
      time: "10:20 AM",
    },
    {
      id: "4",
      type: "Summary",
      text: "27/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Yesterday",
    },
    {
      id: "5",
      type: "Challenge",
      text: "Pooja is In! 💪",
      detail:
        'Pooja has joined your challenge "WMDD Battle"! Get ready to compete and have fun!',
      time: "Yesterday",
    },
    {
      id: "6",
      type: "Summary",
      text: "26/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Wednesday",
    },
    {
      id: "7",
      type: "Challenge",
      text: "Challenge Over! ⬅️",
      detail:
        'The challenge "Beetle Bash" has ended! Look at the results and celebrate your progress!',
      time: "Wednesday",
    },
    {
      id: "8",
      type: "Summary",
      text: "25/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Thursday",
    },
    {
      id: "9",
      type: "Summary",
      text: "24/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Friday",
    },
    {
      id: "10",
      type: "Summary",
      text: "23/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Saturday",
    },
    {
      id: "11",
      type: "Summary",
      text: "22/5 Daily Summary Available! 🎉",
      detail:
        "You did a great job yesterday! Check out your Daily Summary now!",
      time: "Sunday",
    },
  ]);

  const filteredNotifications = notifications.filter(
    (notification) =>
      selectedFilter === "All" || notification.type === selectedFilter,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <View style={styles.iconBackground}>
            <Icon name="arrow-left" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle} level="title_3">
          Notifications
        </Text>
      </View>
      <View>
        <FilterMenu
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
      </View>
      <View style={styles.notificationsContainer}>
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notification}>
              <Image
                source={require("../../assets/img/avatar.png")}
                style={styles.avatar}
              />
              <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                  <Text
                    style={styles.notificationTitle}
                    level="footnote"
                    weight="semibold"
                  >
                    {item.text}
                  </Text>
                  <Text style={styles.notificationTime} level="caption_1">
                    {item.time}
                  </Text>
                </View>
                <Text style={styles.notificationDetail} level="caption_1">
                  {item.detail}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#FDD462",
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  backButton: {
    marginStart: 10,
  },
  iconBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF1F4",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    position: "absolute",
    flex: 1,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  notificationsContainer: {
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    paddingTop: 10,
    borderRadius: 20,
    height: "100%",
  },
  notification: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F4",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 20,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  notificationTitle: {
    flexShrink: 1,
  },
  notificationTime: {
    color: "#7F7C76",
    marginLeft: 10,
  },
  notificationDetail: {
    color: "#7F7C76",
  },
});

export default Notifications;
