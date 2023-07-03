import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { Button } from "react-native-paper";

export function DetailScreen({ route, navigation }) {
  const [article, setArticle] = useState([]);
  const { width } = useWindowDimensions();
  const { id } = route.params;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dev.to/api/articles/${id}`)
        .then((res) => {
          setArticle(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <ScrollView>
      <Button
        icon="camera"
        mode="contained"
        onPress={() =>
          navigation.navigate("Comments", {
            id: id,
          })
        }
        style={{
          marginTop: 20,
        }}
      >
        Comments
      </Button>
      <View>
        <RenderHtml
          contentWidth={width}
          source={{
            html: article.body_html,
          }}
        />
      </View>
    </ScrollView>
  );
}
