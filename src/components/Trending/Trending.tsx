import { FlatList, ImageBackground, View } from "react-native";
import React from "react";
import { VideoType } from "../VideoCard";

type Props = {
  video: VideoType[];
};

export const Trending = ({ video }: Props) => {
  return (
    <FlatList
      data={video}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <View className="mr-5 relative flex justify-center items-center">
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
        </View>
      )}
      horizontal
    />
  );
};
