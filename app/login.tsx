import { OfflineNotice } from "@/src/components/OfflineNotice";
import { Stack, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Cloud } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../src/api/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error logging in", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Successful registration", "You have been registered.");
    } catch (error: any) {
      Alert.alert("Error signing up", error.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <OfflineNotice />
        <View style={styles.header}>
          <Text style={styles.title}>Weather App</Text>
          <Cloud size={30} />
        </View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.buttonGap}>
          <Button title="Log in" onPress={handleLogin} />
          <Button title="Create Account" color="green" onPress={handleSignUp} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  buttonGap: { gap: 10 },
});
