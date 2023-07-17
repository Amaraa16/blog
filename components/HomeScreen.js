import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import { useUser } from "@clerk/clerk-expo";

export function HomeScreen({ navigation }) {
  const { user } = useUser();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://dev.to/api/articles?username=whitep4nth3r")
      .then((res) => {
        setArticles(res.data);
      });
  }, []);

  return (
    <ScrollView>
      <View style={{ gap: 10, marginTop: 20 }}>
        <Text style={{ fontSize: 23, marginLeft: 10, fontWeight: 500 }}>
          greeetings {user.username}
        </Text>
        {articles.map((el, _) => {
          return (
            <Card
              onPress={() =>
                navigation.navigate("Detail", {
                  id: el.id,
                })
              }
            >
              <Card.Title title={el.title} />
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}
