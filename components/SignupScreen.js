import * as React from "react";
import { Text, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { TextInput } from "react-native-paper";
import { Button } from "react-native-paper";

export default function SignUpScreen({ onSignin }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [error, setError] = React.useState("");
  const [code, setCode] = React.useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        username,
        firstName,
        lastName,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      setError(JSON.stringify(err.errors[0].message));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
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
        Sign up
      </Text>
      {!pendingVerification && (
        <View>
          <View>
            <TextInput
              mode="outlined"
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
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

          <View>
            <TextInput
              style={{ width: 320 }}
              mode="outlined"
              value={username}
              placeholder="Username..."
              onChangeText={(username) => setUsername(username)}
            />
          </View>

          <View>
            <TextInput
              style={{ width: 320 }}
              mode="outlined"
              value={firstName}
              placeholder="firstname..."
              onChangeText={(firstName) => setFirstName(firstName)}
            />
          </View>

          <View>
            <TextInput
              style={{ width: 320 }}
              mode="outlined"
              value={lastName}
              placeholder="lastname..."
              onChangeText={(lastName) => setLastName(lastName)}
            />
          </View>

          <Button
            mode="contained"
            onPress={onSignUpPress}
            style={{
              height: 42,
              borderRadius: 5,
              marginTop: 40,
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: 500 }}>Sign up</Text>
          </Button>
          <View
            style={{
              height: 1,
              width: 317,
              backgroundColor: "lightgrey",
              marginTop: 35,
            }}
          />
        </View>
      )}

      {pendingVerification && (
        <View>
          <View>
            <TextInput
              style={{ width: 200 }}
              mode="outlined"
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <Button onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </Button>
        </View>
      )}
      <Button onPress={onSignin} style={{ marginTop: 45 }}>
        <Text style={{ fontSize: 16, fontWeight: 500 }}>
          Already have a account? Sign in
        </Text>
      </Button>
    </View>
  );
}
