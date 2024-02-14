import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image, Text } from "@rneui/themed";
import { auth, db } from "../firebase"; // Import auth and db directly

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  const register = () => {
    console.log(auth);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg",
        });
      })
      .catch((error) => alert(error.message));
    // .catch((error) => {
    //   console.error("Error creating user:", error); // Log any errors
    // });
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      className="flex-1 items-center justify-center p-10 bg-white"
    >
      <StatusBar style="light" />

      <Text h3 style={{ marginBottom: 50 }}>
        Create a Signal acount
      </Text>

      <Image
        source={{
          uri: "https://seeklogo.com/images/S/signal-logo-20A1616F60-seeklogo.com.png",
        }}
        style={{ width: 80, height: 80 }}
      />

      <View className="w-[300] mt-10">
        <Input
          placeholder="Full Name"
          autoFocus
          type="text"
          value={name}
          keyboardType="default"
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
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
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          type="text"
          keyboardType="url"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
      </View>

      <Button
        title="Register"
        onPress={register}
        raised
        containerStyle={styles.button}
      />
      {/* <Button
        title="Login"
        type="outline"
        containerStyle={styles.button}
        onPress={() => navigation.navigate("Login")}
      /> */}
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  button: {
    width: 200,
    marginTop: 10,
  },
});
