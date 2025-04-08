import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';


const url = "192.168.1.4";
// Create axios instance with default config
const api = axios.create({
  baseURL: Platform.select({
    ios: `http://${url}:8000/api`,
    android: `http://${url}:8000/api`,
    default: `http://${url}:8000/api`,
  }),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('userToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      await SecureStore.deleteItemAsync('userToken');
      // You might want to trigger a logout action here
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/accounts/login/', { email, password });
    return response.data;
  },

  register: async (fullname: string, vehicle_no: string, email: string, password: string) => {
    const response = await api.post('/accounts/register/', {
      fullname,
      vehicle_no,
      email,
      password,
    });
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/accounts/logout/');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/accounts/profile/');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/accounts/profile/', data);
    return response.data;
  },
};

// Parking API
export const parkingAPI = {
  getAvailableSpots: async () => {
    const response = await api.get('/parking/spots/');
    return response.data;
  },

  getSpotDetails: async (spotId: string) => {
    const response = await api.get(`/parking/spots/${spotId}/`);
    return response.data;
  },

  bookSpot: async (spotId: string, startTime: string, endTime: string) => {
    const response = await api.post('/parking/bookings/', {
      spot: spotId,
      start_time: startTime,
      end_time: endTime,
    });
    return response.data;
  },

  getBookings: async () => {
    const response = await api.get('/parking/bookings/');
    return response.data;
  },

  cancelBooking: async (bookingId: string) => {
    const response = await api.post(`/parking/bookings/${bookingId}/cancel/`);
    return response.data;
  },
};

// Payment API
export const paymentAPI = {
  getPaymentMethods: async () => {
    const response = await api.get('/payments/methods/');
    return response.data;
  },

  addPaymentMethod: async (data: any) => {
    const response = await api.post('/payments/methods/', data);
    return response.data;
  },

  getTransactions: async () => {
    const response = await api.get('/payments/transactions/');
    return response.data;
  },
};

export default api; 