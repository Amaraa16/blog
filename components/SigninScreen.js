import React from "react";
import { Text, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

export default function SignInScreen({ onSignup }) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [error, setError] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async (el, i) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      console.log(JSON.stringify(err));
      setError(JSON.stringify(err.errors[0].longMessage));
    }
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 100,
      }}
    >
      <Text>{error}</Text>
      <Text style={{ fontSize: 50, marginBottom: 20, fontWeight: 500 }}>
        Sign in
      </Text>
      <View>
        <TextInput
          style={{ width: 320 }}
          mode="outlined"
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View>
        <TextInput
          style={{ width: 320 }}
          mode="outlined"
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <Button
        mode="contained"
        onPress={onSignInPress}
        style={{
          height: 42,
          borderRadius: 5,
          marginTop: 40,
          alignItems: "center",
          width: 320,
        }}
      >
        <Text>Sign in</Text>
      </Button>

      <View
        style={{
          height: 1,
          width: 317,
          backgroundColor: "lightgrey",
          marginTop: 35,
        }}
      />

      <Button onPress={onSignup} style={{ marginTop: 45 }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          No account? Make a new one
        </Text>
      </Button>
    </View>
  );
}
