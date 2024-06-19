import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, title: "Home" }}
      />
      <Tabs.Screen
        name="together"
        options={{ headerTitle: "Together", title: "Together" }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ headerTitle: "Analytics", title: "Analytics" }}
      />
      <Tabs.Screen
        name="profile"
        options={{ headerTitle: "Profile", title: "Profile" }}
      />
    </Tabs>
  );
};

export default TabsLayout;
