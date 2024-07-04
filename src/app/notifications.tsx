import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FilterMenu from "../components/notifications/FilterMenu";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@src/components/ui/typography";
import Icon from "@src/components/ui/Icon";
import NotificationList from "@src/components/lists/NotificationList";

const Notifications = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("All");

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
          tabs={[
            { value: "All", label: "All" },
            { value: "Summary", label: "Summary" },
            { value: "Challenge", label: "Challenge" },
          ]}
          onChange={setSelectedFilter}
        />
      </View>
      <View style={styles.notificationsContainer}>
        <NotificationList selectedFilter={selectedFilter} />
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
});

export default Notifications;
