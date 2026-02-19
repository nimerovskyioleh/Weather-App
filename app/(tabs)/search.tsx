import { OfflineNotice } from "@/src/components/OfflineNotice";
import { WeatherDisplay } from "@/src/components/WeatherDisplay";
import { useWeatherStore } from "@/src/store/useWeatherStore";
import { Search as SearchIcon } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function SearchScreen() {
  const [city, setCity] = useState("");
  const { weather, forecast, loading, error, getWeatherByCity } =
    useWeatherStore();

  const handleSearch = () => {
    if (city.trim().length < 2) {
      alert("City name must be at least 2 characters long.");
      Alert.alert("Error", "City name must be at least 2 characters long.");
      return;
    }
    if (city.trim()) {
      getWeatherByCity(city.trim());
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <OfflineNotice />

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search for a city..."
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
        <Pressable onPress={handleSearch}>
          <SearchIcon size={24} color="#3b82f6" />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading && <ActivityIndicator size="large" color="#3b82f6" />}

        {error && <Text style={styles.errorText}>{error}</Text>}

        {weather && !loading && (
          <WeatherDisplay weather={weather} forecast={forecast} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  searchBar: {
    flexDirection: "row",
    margin: 20,
    padding: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 15,
    alignItems: "center",
  },
  input: { flex: 1, fontSize: 16, marginLeft: 10, outline: "none" },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});
