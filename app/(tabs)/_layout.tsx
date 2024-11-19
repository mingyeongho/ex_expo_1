import { Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
          },
        }}
      >
        {[
          {
            name: "home",
            icon: icons.home,
            label: "Home",
          },
          {
            name: "bookmark",
            icon: icons.bookmark,
            label: "Bookmark",
          },
          {
            name: "create",
            icon: icons.plus,
            label: "Create",
          },
          {
            name: "profile",
            icon: icons.profile,
            label: "Profile",
          },
        ].map((tab) => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{
              title: tab.label,
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <Image
                  source={tab.icon}
                  resizeMode="contain"
                  tintColor={color}
                  className="w-6 h-6"
                />
              ),
              tabBarLabel: ({ color, focused }) => (
                <Text
                  className={`${
                    focused ? "font-psemibold" : "font-pregular"
                  } text-xs mt-0.5`}
                  style={{ color }}
                >
                  {tab.label}
                </Text>
              ),
            }}
          />
        ))}
      </Tabs>
    </>
  );
};

export default TabsLayout;
