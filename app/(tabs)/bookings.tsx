import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

const { width } = Dimensions.get("window");

export default function BookingsScreen() {
  const [activeTab, setActiveTab] = useState<"active" | "past">("active");

  const activeBookings = [
    {
      id: "1",
      spotName: "Downtown Parking",
      spotAddress: "123 Main St, City Center",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      date: "Today",
      spotNumber: "A12",
      price: "$8",
    },
    {
      id: "2",
      spotName: "Mall Parking",
      spotAddress: "456 Shopping Ave, Mall Area",
      startTime: "3:00 PM",
      endTime: "6:00 PM",
      date: "Tomorrow",
      spotNumber: "B45",
      price: "$6",
    },
  ];

  const pastBookings = [
    {
      id: "3",
      spotName: "Office Complex",
      spotAddress: "789 Business Blvd, Office Park",
      startTime: "9:00 AM",
      endTime: "5:00 PM",
      date: "Yesterday",
      spotNumber: "C78",
      price: "$16",
      status: "completed",
    },
  ];

  const renderBookingCard = (booking: any) => (
    <View key={booking.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <View>
          <Text style={styles.spotName}>{booking.spotName}</Text>
          <Text style={styles.spotAddress}>{booking.spotAddress}</Text>
        </View>
        <View style={styles.spotNumber}>
          <Text style={styles.spotNumberText}>Spot {booking.spotNumber}</Text>
        </View>
      </View>

      <View style={styles.bookingDetails}>
        <View style={styles.detailItem}>
          <Ionicons
            name="calendar-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>{booking.date}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons
            name="time-outline"
            size={16}
            color={Colors.textSecondary}
          />
          <Text style={styles.detailText}>
            {booking.startTime} - {booking.endTime}
          </Text>
        </View>
      </View>

      <View style={styles.bookingFooter}>
        <Text style={styles.price}>{booking.price}</Text>
        {activeTab === "active" ? (
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.reviewButton}>
            <Text style={styles.reviewButtonText}>Leave Review</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookings</Text>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "active" && styles.activeTab]}
          onPress={() => setActiveTab("active")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "active" && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "past" && styles.activeTab]}
          onPress={() => setActiveTab("past")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "past" && styles.activeTabText,
            ]}
          >
            Past
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView style={styles.bookingsList}>
        {activeTab === "active"
          ? activeBookings.map(renderBookingCard)
          : pastBookings.map(renderBookingCard)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  tabsContainer: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: "#fff",
  },
  bookingsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bookingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  spotName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  spotAddress: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  spotNumber: {
    backgroundColor: Colors.background,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  spotNumberText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
  },
  bookingDetails: {
    flexDirection: "row",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  bookingFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  cancelButton: {
    backgroundColor: Colors.error,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  reviewButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
