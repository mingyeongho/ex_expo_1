import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import {
  EmptyState,
  SearchInput,
  Trending,
  VideoCard,
  VideoType,
} from "@/src/components";
import { supabase } from "@/src/lib/supabase";

const Home = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [latestVideos, setLatestVideos] = useState<VideoType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const onFetchVideos = async () => {
    setLoading(true);

    try {
      const { data: fetchedVideos, error } = await supabase.from("videos")
        .select(`
          *,
          users (username)
        `);

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
    } catch (e) {
      Alert.alert("Error", "Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  };

  const onFetchLatestVideos = async () => {
    try {
      const { data: fetchedVideos, error } = await supabase
        .from("videos")
        .select(
          `
          *,
          users (username)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      const formatVideos = fetchedVideos.map((video) => ({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        prompt: video.prompt,
        video: video.video,
        username: video.users?.username || "",
      }));

      setLatestVideos(formatVideos || []);
    } catch (e) {
      Alert.alert("Error", "Failed to fetch latest videos");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await onFetchVideos();
    await onFetchLatestVideos();
    setRefreshing(false);
  };

  useEffect(() => {
    onFetchVideos();
    onFetchLatestVideos();
  }, []);

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
                  Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-white">
                  JSMastery
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  resizeMode="contain"
                  className="w-9 h-10"
                />
              </View>
            </View>

            <SearchInput value={search} onChange={setSearch} />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest Videos
              </Text>

              <Trending video={latestVideos} />
            </View>
          </View>
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subTitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
