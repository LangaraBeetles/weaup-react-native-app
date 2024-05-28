import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerTitle: "Home Page", title: "Home" }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ headerTitle: "Analytics", title: "Analytics" }}
      />
      <Tabs.Screen
        name="challenge"
        options={{ headerTitle: "Challenge", title: "Challenge" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerTitle: "Profile", title: "Profile" }}
      />
    </Tabs>
  );
};

export default TabsLayout;
