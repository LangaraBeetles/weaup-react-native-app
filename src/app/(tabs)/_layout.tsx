import { Tabs } from "expo-router";
import Icon from "@src/components/ui/Icon";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";
import { Platform } from "react-native";

const TabsLayout = () => {
  const isAndroid = Platform.OS === "android";

  const customTabBarOptions = {
    tabBarActiveTintColor: theme.colors.neutral[700],
    tabBarInactiveTintColor: theme.colors.neutral[700],
    tabBarStyle: {
      height: 60,
    },
  };

  return (
    <Tabs
      screenOptions={
        isAndroid
          ? customTabBarOptions
          : {
              tabBarStyle: {
                height: 90,
              },
            }
      }
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused ? "navbar-home-selected" : "navbar-home-notselected"
              }
              style={{ marginTop: 6 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              level="footnote"
              weight={focused ? "bold" : "semibold"}
              style={{
                marginBottom: 6,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="together"
        options={{
          headerTitle: "Ongoing Challenges",
          title: "Together",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-together-selected"
                  : "navbar-together-notselected"
              }
              style={{ marginTop: 6 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              level="footnote"
              weight={focused ? "bold" : "semibold"}
              style={{
                marginBottom: 6,
              }}
            >
              Together
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          headerTitle: "Analytics",
          title: "Analytics",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-analytics-selected"
                  : "navbar-analytics-notselected"
              }
              style={{ marginTop: 6 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              level="footnote"
              weight={focused ? "bold" : "semibold"}
              style={{
                marginBottom: 6,
              }}
            >
              Analytics
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon
              name={
                focused
                  ? "navbar-profile-selected"
                  : "navbar-profile-notselected"
              }
              style={{ marginTop: 6 }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              level="footnote"
              weight={focused ? "bold" : "semibold"}
              style={{
                marginBottom: 6,
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
