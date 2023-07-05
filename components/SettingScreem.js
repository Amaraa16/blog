import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "react-native-paper";

export function SettingScreen() {
  return (
    <View>
      <Text></Text>
      <SignoutScreen />
    </View>
  );
}

const SignoutScreen = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button onPress={() => signOut()}>sign out</Button>
    </View>
  );
};
