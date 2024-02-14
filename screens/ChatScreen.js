import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar } from "@rneui/themed";
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as firebase from "firebase/app";
import * as firestore from "firebase/firestore";
import { db, auth } from "../firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerBackTitle: "Back to All Chats",
      headerTitle: () => (
        <View
          className="flex-row items-center"
          style={{ flexDirection: "row" }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <Avatar
              rounded
              source={{
                // uri: auth?currentUser?.photoURL,
                uri:
                  messages[0]?.data.photoURL ||
                  "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
              }}
            />
            <Text className="text-white ml-10 font-bold">
              {route.params.chatName}
            </Text>
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          style={{ marginLeft: 10 }}
          onPress={navigation.goBack}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row justify-between w-[80] mr-[20]">
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      //   headerStyle: { backgroundColor: "#fff" },
      //   headerTitleStyle: { color: "black" },
      //   headerTintColor: "black",
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return () => {
      second;
    };
  }, [route]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) => {
                data.email === auth.currentUser.email ? (
                  <View
                    key={id}
                    className="receiver p-[15] bg-[#ECECEC] self-end rounded-[20] mr-[15] mb-[20] max-w-[80%] relative"
                  >
                    <Avatar
                      rounded
                      position="absolute"
                      // Web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5,
                      }}
                      size={30}
                      bottom={-15}
                      right={-5}
                      source={{
                        // uri: data.photoURL,
                        uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
                      }}
                    />
                    <Text className="text-white font-medium ml-[10] mb-[15]">
                      {data.message}
                    </Text>
                  </View>
                ) : (
                  <View className="sender p-[15] bg-[#2B68E6] self-start rounded-[20] m-[15] max-w-[80%] relative">
                    <Avatar
                      rounded
                      position="absolute"
                      // Web
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        left: -5,
                      }}
                      size={30}
                      bottom={-15}
                      left={-5}
                      source={{
                        // uri: data.photoURL,
                        uri: "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
                      }}
                    />
                    <Text className="text-white font-medium ml-[10] mb-[15]">
                      {data.message}
                    </Text>
                    <Text className="left-[10] pr-[10] text-[10px] text-white">
                      {data.displayName}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
            <View className="flex-row items-center w-full p-[15]">
              <TextInput
                value={input}
                onChangeText={(text) => (setInput = text)}
                onSubmitEditing={sendMessage}
                placeholder="Signal Message"
                className="bottom-0 h-[40] flex-1 mr-[15] bg-[#ECECEC] p-[10] text-gray-400 rounded-[30]"
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
