import { icons } from "@/constants";
import { EmptyState, InfoBox, VideoCard, VideoType } from "@/src/components";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Alert, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [videos, setVideos] = useState<VideoType[]>([]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert(error.message);
    router.push("/(auth)/sign-in");
  };

  const onFetchMyVideos = async () => {
    if (!user?.id) return;

    const { data: fetchedVideos, error } = await supabase
      .from("videos")
      .select(
        `
      *,
      users (username)
    `
      )
      .eq("creator", user?.id);

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
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return setUser(user);
      }

      signOut();
    })();
    onFetchMyVideos();
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={signOut}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={icons.profile}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.user_metadata.username || ""}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={videos.length.toString() || "0"}
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox title="0" subtitle="Followers" titleStyles="text-xl" />
            </View>
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

export default Profile;
