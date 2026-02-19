import { OfflineNotice } from "@/src/components/OfflineNotice";
import { WeatherDisplay } from "@/src/components/WeatherDisplay";
import { useWeatherStore } from "@/src/store/useWeatherStore";
import * as Location from "expo-location";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { weather, loadCachedWeather, getWeatherByLocation, forecast } =
    useWeatherStore();

  useEffect(() => {
    loadCachedWeather();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        getWeatherByLocation(
          location.coords.latitude,
          location.coords.longitude,
        );
      }
    })();
  }, []);

  if (!weather) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <OfflineNotice />
      <ScrollView contentContainerStyle={styles.container}>
        <WeatherDisplay weather={weather} forecast={forecast} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  container: { alignItems: "center", padding: 20 },
  header: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 20 },
  cityName: { fontSize: 22, fontWeight: "600" },
  temp: { fontSize: 100, fontWeight: "200", marginVertical: 10 },
  description: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
    marginBottom: 40,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  detailCard: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "30%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  detailValue: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  detailLabel: { fontSize: 12, color: "#94a3b8" },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  forecastDate: { fontSize: 16, fontWeight: "500", width: 50 },
  forecastTemp: { fontSize: 18, fontWeight: "bold" },
  forecastDesc: { color: "#666", textTransform: "capitalize" },
});
