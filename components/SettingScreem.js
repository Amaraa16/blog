import { View, Text } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Button } from "react-native-paper";

export function SettingScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
        gap: 10,
      }}
    >
      <View
        style={{
          width: 360,
          height: 500,
          backgroundColor: "white",
          borderRadius: 10,
          paddingBottom: 10,
          justifyContent: "space-between",
        }}
      >
        <Button
          onPress={() => navigation.navigate("Profile")}
          style={{
            marginTop: 20,
          }}
        >
          My Profile
        </Button>
        <SignoutScreen />
      </View>
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
