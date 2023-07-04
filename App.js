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
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { View } from "react-native";
import SignUpScreen from "./components/SignupScreen";
import SigninScreen from "./components/SigninScreen";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_c2Vuc2libGUtcG9zc3VtLTM4LmNsZXJrLmFjY291bnRzLmRldiQ";

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
            <SigninScreen />
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
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
