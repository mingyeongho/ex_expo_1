import {
  View,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";

type Props = {
  value: string;
  onChange: (e: any) => void;
  keyboardType?: KeyboardTypeOptions;
};

export const SearchInput = ({ onChange, value, keyboardType }: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();

  return (
    <View
      className={`flex-row w-full h-16 px-4 mt-1 bg-black-100 border-2 rounded-2xl focus:border-secondary items-center ${
        isFocused ? "border-secondary" : "border-black-200"
      } transition-colors space-x-4`}
    >
      <TextInput
        className="flex-1 text-white font-psemibold text-base h-full"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={onChange}
        keyboardType={keyboardType || "default"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={() => {
          if (!value) {
            return Alert.alert("Error", "Please enter a search query");
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query: value });
          } else {
            router.push(`/search/${value}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
