import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform, StyleSheet, View } from "react-native";

type BlackoutContextValue = {
  blackedOut: boolean;
  setBlackedOut: (blackedOut: boolean) => void;
};

const BlackoutContext = createContext<BlackoutContextValue | null>(null);

export function BlackoutProvider({ children }: PropsWithChildren) {
  const [blackedOut, setBlackedOut] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(blackedOut, "none");

    if (Platform.OS === "android") {
      void Promise.all([
        NavigationBar.setVisibilityAsync(blackedOut ? "hidden" : "visible"),
        NavigationBar.setBehaviorAsync(blackedOut ? "overlay-swipe" : "inset-swipe"),
      ]).catch((error) => {
        console.warn("Failed to update system bars", error);
      });
    }
  }, [blackedOut]);

  const value = useMemo(() => ({ blackedOut, setBlackedOut }), [blackedOut]);

  return (
    <BlackoutContext.Provider value={value}>
      {children}
      {blackedOut && (
        <View
          style={styles.overlay}
          onTouchStart={() => {
            setBlackedOut(false);
          }}
        />
      )}
      <StatusBar hidden={blackedOut} />
    </BlackoutContext.Provider>
  );
}

export function useBlackout() {
  const context = useContext(BlackoutContext);
  if (!context) {
    throw new Error("useBlackout must be used within a BlackoutProvider");
  }
  return context;
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "black",
    zIndex: 1000,
  },
});
