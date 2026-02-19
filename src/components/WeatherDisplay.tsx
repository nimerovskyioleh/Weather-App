import { Droplets, MapPin, Thermometer, Wind } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const WeatherDisplay = ({
  weather,
  forecast,
}: {
  weather: any | null;
  forecast: any[] | null;
}) => {
  if (!weather) return null;

  return (
    <View style={styles.content}>
      <View style={styles.header}>
        <MapPin size={20} color="#666" />
        <Text style={styles.cityName}>{weather.name}</Text>
      </View>

      <Text style={styles.temp}>{Math.round(weather.main.temp)}°</Text>
      <Text style={styles.description}>{weather.weather[0].description}</Text>

      <View style={styles.detailsRow}>
        <View style={styles.detailCard}>
          <Droplets color="#3b82f6" />
          <Text style={styles.detailValue}>{weather.main.humidity}%</Text>
          <Text style={styles.detailLabel}>Humidity</Text>
        </View>

        <View style={styles.detailCard}>
          <Wind color="#10b981" />
          <Text style={styles.detailValue}>{weather.wind.speed} m/s</Text>
          <Text style={styles.detailLabel}>Wind</Text>
        </View>

        <View style={styles.detailCard}>
          <Thermometer color="#ef4444" />
          <Text style={styles.detailValue}>{weather.main.pressure}</Text>
          <Text style={styles.detailLabel}>Pressure</Text>
        </View>
      </View>

      <View style={styles.forecastContainer}>
        <Text style={styles.forecastTitle}>5-Day Forecast</Text>
        {forecast?.map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.forecastDate}>
              {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </Text>
            <Text style={styles.forecastTemp}>
              {Math.round(day.main.temp)}°C
            </Text>
            <Text style={styles.forecastDesc}>
              {day.weather[0].description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { alignItems: "center", width: "100%" },
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
  },
  detailValue: { fontSize: 16, fontWeight: "bold", marginTop: 8 },
  detailLabel: { fontSize: 12, color: "#94a3b8" },
  forecastContainer: { width: "100%", marginTop: 30 },
  forecastTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
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
