import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Card } from "react-native-paper";

export function HomeScreen({ navigation }) {
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
        {articles.map((el, i) => {
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
