import { FlatList, RefreshControl, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/src/lib/supabase";
import {
  EmptyState,
  SearchInput,
  VideoCard,
  VideoType,
} from "@/src/components";

const Search = () => {
  const { query } = useLocalSearchParams();
  const [search, setSearch] = useState(
    typeof query === "string" ? query : query[0]
  );
  const [videos, setVideos] = useState<VideoType[]>([]);

  const onSearchVideos = async () => {
    const { data: fetchedVideos, error } = await supabase
      .from("videos")
      .select(
        `
      *,
      users (username)
    `
      )
      .ilike("title", `%${query}%`);

    if (error) throw error;

    const formatVideos = fetchedVideos.map((video) => ({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      prompt: video.prompt,
      video: video.video,
      username: video.users?.username || "",
    }));

    setVideos(formatVideos || []);
  };

  useEffect(() => {
    onSearchVideos();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Search results
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  {query}
                </Text>
              </View>
            </View>

            <SearchInput value={search} onChange={setSearch} />
          </View>
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
