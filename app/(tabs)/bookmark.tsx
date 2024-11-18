import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Bookmark = () => {
  return (
    <SafeAreaView className="items-center justify-center bg-white flex-1">
      <Text className="text-3xl font-pblack">Bookmark!</Text>
    </SafeAreaView>
  );
};

export default Bookmark;
