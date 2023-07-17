import "react-native-gesture-handler";

import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./components/HomeScreen";
import { DetailScreen } from "./components/DetailScreen";
import { CommentScreen } from "./components/CommentScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingScreen } from "./components/SettingScreem";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen } from "./components/ProfileScreen";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { View } from "react-native";
import { Loginflow } from "./components/Loginflow";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_YW1hemluZy1hc3AtNTguY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <PaperProvider>
        <SignedIn>
          <NavigationContainer>
            <MyStack />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Loginflow />
          </View>
        </SignedOut>
      </PaperProvider>
    </ClerkProvider>
  );
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Comments" component={CommentScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
}
