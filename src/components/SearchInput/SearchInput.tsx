import {
  View,
  Text,
  KeyboardTypeOptions,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type Props = {
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  keyboardType?: KeyboardTypeOptions;
};

export const SearchInput = ({
  onChange,
  placeholder,
  value,
  keyboardType,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      className={`flex-row w-full h-16 px-4 mt-1 bg-black-100 border-2 rounded-2xl focus:border-secondary items-center ${
        isFocused ? "border-secondary" : "border-black-200"
      } transition-colors space-x-4`}
    >
      <TextInput
        className="flex-1 text-white font-psemibold text-base h-full"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={onChange}
        keyboardType={keyboardType || "default"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoCapitalize="none"
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
