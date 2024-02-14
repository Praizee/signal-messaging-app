import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Input } from "@rneui/themed";
import Icon from "react-native-vector-icons/FontAwesome";
import { db } from "../firebase";

const AddChatScreen = ({ navigation }) => {
  const [Input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
      //   headerStyle: { backgroundColor: "#fff" },
      //   headerTitleStyle: { color: "black" },
      //   headerTintColor: "black",
      //   headerLeft: () => (              ),
      //   headerRight: () => (             ),
    });
  }, [navigation]);

  const CreateChat = async () => {
    await db
      .collection("chats")
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => alert(error));
  };

  return (
    <View className="p-32 h-full bg-white">
      <Text>AddChatScreen</Text>
      <Input
        placeholder="Enter a chat name"
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={CreateChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button onPress={CreateChat} title="Create new chat" />
    </View>
  );
};

export default AddChatScreen;

const styles = StyleSheet.create({});
