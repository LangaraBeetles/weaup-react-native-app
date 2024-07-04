import { Tabs } from "expo-router";
import Icon from "@src/components/ui/Icon";
import { Text } from "@src/components/ui/typography";
import { theme } from "@src/styles/theme";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.neutral[700],
        tabBarInactiveTintColor: theme.colors.neutral[700],
        tabBarStyle: {
          height: 60,
        },
      }}
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
              style={{
                fontWeight: focused ? "700" : "400",
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
              style={{
                fontWeight: focused ? "700" : "400",
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
              style={{
                fontWeight: focused ? "700" : "400",
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
              style={{
                fontWeight: focused ? "700" : "400",
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
