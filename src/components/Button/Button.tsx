import { Text, TouchableOpacity } from "react-native";
import React from "react";

type ButtonProps = {
  label: string;
  onClick: () => void;
  containerStyles?: string;
  textStyles?: string;
  loading?: boolean;
};

export const Button = ({
  label,
  onClick,
  containerStyles,
  loading,
  textStyles,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        loading ? "opacity-50" : ""
      }`}
      onPress={onClick}
      disabled={loading}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
