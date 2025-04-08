import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { authAPI } from "../services/api";

interface User {
  id: string;
  name: string;
  email: string;
  vehicle_no: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    fullname: string,
    vehicle_no: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedToken = await SecureStore.getItemAsync("userToken");

      if (storedToken) {
        setToken(storedToken);
        // Fetch user profile
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
          // If profile fetch fails, clear stored data
          await SecureStore.deleteItemAsync("userToken");
          setToken(null);
          setUser(null);
        }
      }
    } catch (error) {
      console.error("Error checking auth state:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authAPI.login(email, password);

      if (!response.message) {
        throw new Error("Invalid response format from server");
      }

      // Store the token
      await SecureStore.setItemAsync("userToken", response.message);
      setToken(response.message);

      // Fetch user profile after successful login
      const userData = await authAPI.getProfile();
      setUser(userData);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    fullname: string,
    vehicle_no: string,
    email: string,
    password: string
  ) => {
    try {
      setIsLoading(true);
      const response = await authAPI.register(
        fullname,
        vehicle_no,
        email,
        password
      );

      if (response.status === 200) {
        // After successful registration, log the user in
        await login(email, password);
      } else {
        throw new Error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authAPI.logout();

      // Clear stored data
      await SecureStore.deleteItemAsync("userToken");

      setToken(null);
      setUser(null);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await authAPI.updateProfile(data);
      setUser(response);
    } catch (error) {
      console.error("Profile update error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
