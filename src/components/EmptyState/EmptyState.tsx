import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import { Button } from "../Button";
import { router } from "expo-router";

type Props = {
  title: string;
  subTitle: string;
};

export const EmptyState = ({ title, subTitle }: Props) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="font-psemibold text-xl text-center text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subTitle}</Text>
      <Button
        label="Create video"
        onClick={() => router.push("/(tabs)/create")}
        containerStyles="w-full my-5"
      />
    </View>
  );
};
