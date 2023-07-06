import { View, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export function ProfileScreen() {
  const { user } = useUser();
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const updateUser = async () => {
    await user.update({
      username: username,
      firstName: firstName,
      lastName: lastName,
    });

    await user.setProfileImage({
      file: image,
    });
  };

  console.log(JSON.stringify(user, null, 4));

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: 30 }}>
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: "white",
        }}
      >
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              position: "absolute",
            }}
          />
        )}
        <TouchableOpacity
          title="Pick an image from camera roll"
          onPress={pickImage}
        >
          <AntDesign name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: 500, marginTop: 15 }}>
          {user.username}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: 400, color: "grey" }}>
          {user.primaryEmailAddress.emailAddress}
        </Text>
      </View>

      <View>
        <TextInput
          style={{ width: 320, marginTop: 70 }}
          mode="outlined"
          placeholder="Change Username"
          onChangeText={(username) => setUsername(username)}
        />
        <TextInput
          style={{ width: 320 }}
          mode="outlined"
          placeholder="Change Firstname"
          onChangeText={(firstName) => setFirstName(firstName)}
        />
        <TextInput
          style={{ width: 320 }}
          mode="outlined"
          placeholder="Change Lastname"
          onChangeText={(lastName) => setLastName(lastName)}
        />
        <Button
          mode="contained"
          onPress={updateUser}
          style={{
            height: 42,
            borderRadius: 15,
            marginTop: 40,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: 500 }}>Update Profile</Text>
        </Button>
      </View>
    </View>
  );
}
