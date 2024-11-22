import { Button } from "@/src/components";
import { supabase } from "@/src/lib/supabase";
import { router } from "expo-router";
import { Alert, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) Alert.alert(error.message);
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView className="items-center justify-center bg-white flex-1">
      <Text className="text-3xl font-pblack">Profile!</Text>
      <Button label="SignOut" onClick={signOut}></Button>
    </SafeAreaView>
  );
};

export default Profile;
