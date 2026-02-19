import { OfflineNotice } from "@/src/components/OfflineNotice";
import { Stack, useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Cloud, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth } from "../src/api/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
      handleReset();
    } catch (error: any) {
      console.log(error);
      alert(error.message);
      Alert.alert("Error logging in", error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Successful registration", "You have been registered.");
      handleReset();
    } catch (error: any) {
      alert(error.message);
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
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            placeholderTextColor="#71727A"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputContainerRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor=""
            secureTextEntry={!showPassword}
            style={styles.inputFlex}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => [
              styles.eyeButton,
              pressed && styles.pressed,
            ]}
          >
            {showPassword ? (
              <Eye size={20} color="#71727A" />
            ) : (
              <EyeOff size={20} color="#71727A" />
            )}
          </Pressable>
        </View>
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
  buttonGap: { gap: 10 },
  label: {
    color: "#71727A",
    fontSize: 12,
    marginBottom: 8,
    fontWeight: "600",
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#333333",
    justifyContent: "center",
  },
  inputContainerRow: {
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    color: "#333333",
    backgroundColor: "transparent",
    fontSize: 16,
    width: "100%",
    ...Platform.select({
      web: {
        outlineStyle: "none" as any,
      },
    }),
  },
  inputFlex: {
    flex: 1,
    color: "#333333",
    fontSize: 16,
    ...Platform.select({
      web: {
        outlineStyle: "none" as any,
      },
    }),
  },
  eyeButton: {
    padding: 4,
  },
  pressed: {
    opacity: 0.7,
  },
});
