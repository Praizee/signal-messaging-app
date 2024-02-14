import { StyleSheet, View, Text, KeyboardAvoidingView } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "@rneui/themed";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const signIn = () => {
    auth
      .SignInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center p-10 bg-white"
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
          // uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 150, height: 150 }}
      />

      <View className="w-[300] mt-10">
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          keyboardType="default"
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>

      <Button title="Login" onPress={signIn} containerStyle={styles.button} />
      <Button
        title="Register"
        type="outline"
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Register")}
      />
      <View style={{ height: 50 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
});
