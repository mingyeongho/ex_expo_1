import { icons } from "@/constants";
import { Button } from "@/src/components";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Image, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert(error.message);
    router.push("/(auth)/sign-in");
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
  }, []);

  return (
    <SafeAreaView className="items-center justify-center bg-white flex-1">
      <Text className="text-3xl font-pblack">
        {user?.id && (
          <Image
            source={icons.profile}
            resizeMode="contain"
            className="w-6 h-6"
          />
        )}
      </Text>
      <Button label="SignOut" onClick={signOut}></Button>
    </SafeAreaView>
  );
};

export default Profile;
