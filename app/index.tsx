import {
  ActivityIndicator,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-red-400">
        Edit app/index.tsx to edit this screen.
      </Text>
      <TouchableOpacity>
        <Text>Opacity Click Me!</Text>
      </TouchableOpacity>
      <TouchableHighlight>
        <Text>Highlight Click Me!</Text>
      </TouchableHighlight>
      <ActivityIndicator size="large" />
    </View>
  );
}
