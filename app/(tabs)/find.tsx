import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

export default function FindSpotScreen() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "all", label: "All Spots", icon: "apps" },
    { id: "nearby", label: "Nearby", icon: "location" },
    { id: "available", label: "Available", icon: "checkmark-circle" },
  ];

  const parkingSpots = [
    {
      id: 1,
      name: "Spot A12",
      location: "Level 1, Block A",
      distance: "50m",
      price: "$2/hr",
      available: true,
    },
    {
      id: 2,
      name: "Spot B05",
      location: "Level 2, Block B",
      distance: "120m",
      price: "$1.5/hr",
      available: true,
    },
    {
      id: 3,
      name: "Spot C08",
      location: "Level 1, Block C",
      distance: "200m",
      price: "$1.8/hr",
      available: false,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find a Spot</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color={Colors.textSecondary}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for parking spots"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity>
          <Ionicons
            name="options-outline"
            size={20}
            color={Colors.textSecondary}
          />
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterChip,
              selectedFilter === filter.id && styles.filterChipSelected,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Ionicons
              name={filter.icon as any}
              size={16}
              color={selectedFilter === filter.id ? Colors.card : Colors.text}
            />
            <Text
              style={[
                styles.filterLabel,
                selectedFilter === filter.id && styles.filterLabelSelected,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Map Placeholder */}
      <View style={styles.mapContainer}>
        <Text style={styles.mapPlaceholder}>Map View</Text>
      </View>

      {/* Spots List */}
      <View style={styles.spotsContainer}>
        <Text style={styles.sectionTitle}>Available Spots</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {parkingSpots.map((spot) => (
            <TouchableOpacity key={spot.id} style={styles.spotCard}>
              <View style={styles.spotInfo}>
                <View style={styles.spotHeader}>
                  <Text style={styles.spotName}>{spot.name}</Text>
                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor: spot.available
                          ? Colors.available
                          : Colors.occupied,
                      },
                    ]}
                  />
                </View>
                <Text style={styles.spotLocation}>{spot.location}</Text>
                <View style={styles.spotDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons
                      name="location"
                      size={16}
                      color={Colors.primary}
                    />
                    <Text style={styles.detailText}>{spot.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="cash" size={16} color={Colors.primary} />
                    <Text style={styles.detailText}>{spot.price}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.bookButton,
                  !spot.available && styles.bookButtonDisabled,
                ]}
              >
                <Text style={styles.bookButtonText}>
                  {spot.available ? "Book Now" : "Occupied"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    margin: 20,
    padding: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.text,
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterChipSelected: {
    backgroundColor: Colors.primary,
  },
  filterLabel: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  filterLabelSelected: {
    color: Colors.card,
  },
  mapContainer: {
    height: 200,
    backgroundColor: Colors.card,
    marginHorizontal: 20,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mapPlaceholder: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  spotsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 16,
  },
  spotCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  spotInfo: {
    flex: 1,
  },
  spotHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  spotLocation: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  spotDetails: {
    flexDirection: "row",
    marginTop: 8,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.text,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookButtonDisabled: {
    backgroundColor: Colors.textSecondary,
  },
  bookButtonText: {
    color: Colors.card,
    fontSize: 14,
    fontWeight: "600",
  },
});
