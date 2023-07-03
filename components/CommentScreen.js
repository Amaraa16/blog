import axios from "axios";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-paper";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";

export function CommentScreen({ route, navigation }) {
  const [Comments, setComments] = useState([]);
  const { width } = useWindowDimensions();
  const { id } = route.params;

  useEffect(() => {
    if (id) {
      axios
        .get(`https://dev.to/api/comments?a_id=${id}`)
        .then((res) => {
          setComments(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <View style={{ gap: 10, marginTop: 20 }}>
      {Comments.map((el, i) => (
        <Card>
          <Card.Content>
            <RenderHtml contentWidth={width} source={{ html: el.body_html }} />
          </Card.Content>
        </Card>
      ))}
    </View>
  );
}
