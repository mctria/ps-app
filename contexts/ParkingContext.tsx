import React, { createContext, useContext, useState, useEffect } from "react";
import { parkingAPI } from "../services/api";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  available: number;
  total: number;
  price: number;
  distance: number;
}

interface Booking {
  id: string;
  spot: ParkingSpot;
  start_time: string;
  end_time: string;
  status: string;
  price: number;
}

interface ParkingContextType {
  spots: ParkingSpot[];
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  fetchSpots: () => Promise<void>;
  fetchBookings: () => Promise<void>;
  bookSpot: (
    spotId: string,
    startTime: string,
    endTime: string
  ) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
}

const ParkingContext = createContext<ParkingContextType | undefined>(undefined);

export function ParkingProvider({ children }: { children: React.ReactNode }) {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpots = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await parkingAPI.getAvailableSpots();
      setSpots(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch parking spots"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await parkingAPI.getBookings();
      setBookings(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch bookings"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const bookSpot = async (
    spotId: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await parkingAPI.bookSpot(spotId, startTime, endTime);
      setBookings((prev) => [...prev, response]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to book spot");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      await parkingAPI.cancelBooking(bookingId);
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to cancel booking"
      );
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch initial data
  useEffect(() => {
    fetchSpots();
    fetchBookings();
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        spots,
        bookings,
        isLoading,
        error,
        fetchSpots,
        fetchBookings,
        bookSpot,
        cancelBooking,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export function useParking() {
  const context = useContext(ParkingContext);
  if (context === undefined) {
    throw new Error("useParking must be used within a ParkingProvider");
  }
  return context;
}
