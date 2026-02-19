import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { Info, LogOut, ShieldCheck, Star } from "lucide-react-native";
import React from "react";
import {
  Alert,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../../src/api/firebase";

export default function SettingsScreen() {
  const router = useRouter();
  const user = auth.currentUser;

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
            router.replace("/login");
          } catch (error) {
            Alert.alert("Error", "Failed to log out");
          }
        },
      },
    ]);
  };

  const onShare = async () => {
    try {
      await Share.share({
        message:
          "Check out this awesome Weather App I built with React Native!",
      });
    } catch (error) {
      Alert.alert("Error", "Failed to share app");
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.item}>
          <Text style={styles.emailText}>{user?.email || "Guest User"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About App</Text>

        <TouchableOpacity style={styles.item} onPress={onShare}>
          <Star size={20} color="#666" />
          <Text style={styles.itemText}>Share App</Text>
        </TouchableOpacity>

        <View style={styles.item}>
          <Info size={20} color="#666" />
          <Text style={styles.itemText}>Version 1.0.0</Text>
        </View>

        <View style={styles.item}>
          <ShieldCheck size={20} color="#666" />
          <Text style={styles.itemText}>Privacy Policy</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1e293b",
  },
  section: {
    marginBottom: 25,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#94a3b8",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  itemText: { fontSize: 16, color: "#334155" },
  emailText: { fontSize: 16, color: "#334155", fontWeight: "500" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    gap: 10,
    marginTop: "auto",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#fee2e2",
  },
  logoutText: { color: "#ef4444", fontSize: 16, fontWeight: "600" },
});
