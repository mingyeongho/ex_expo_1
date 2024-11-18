import { Link } from "expo-router";
import { StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="items-center justify-center bg-white flex-1">
      <Text className="text-3xl font-pblack">Aora!</Text>
      <StatusBar animated />
      <Link href="/profile">Go Profile</Link>
    </SafeAreaView>
  );
}
