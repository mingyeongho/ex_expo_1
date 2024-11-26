import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardTypeOptions,
} from "react-native";
import React, { useRef, useState } from "react";
import { icons, images } from "@/constants";

type Props = {
  title: string;
  placeholder: string;
  value: string;
  onChange: (e: any) => void;
  otherStyles?: string;
  keyboardType?: KeyboardTypeOptions;
};

export const FormField = ({
  title,
  placeholder,
  value,
  otherStyles,
  onChange,
  keyboardType,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base font-pmedium text-gray-100">{title}</Text>
      <View
        className={`flex-row w-full h-16 px-4 mt-1 bg-black-100 border-2 rounded-2xl focus:border-secondary items-center ${
          isFocused ? "border-secondary" : "border-black-200"
        } transition-colors`}
      >
        <TextInput
          className="flex-1 text-white font-psemibold text-base h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={onChange}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType || "default"}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
