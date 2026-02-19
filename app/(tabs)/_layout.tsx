import { Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Cloud, Search, Settings } from "lucide-react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { tab: string }) {
  if (props.tab === "index") {
    return <Cloud color="#777" />;
  }
  if (props.tab === "search") {
    return <Search color="#777" />;
  }
  if (props.tab === "settings") {
    return <Settings color="#777" />;
  }
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Weather",
          tabBarIcon: () => <TabBarIcon tab="index" />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({}) => <TabBarIcon tab="search" />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({}) => <TabBarIcon tab="settings" />,
        }}
      />
    </Tabs>
  );
}
