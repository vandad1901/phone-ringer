import { Platform } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export const LightTheme = MD3LightTheme;
export const DarkTheme = MD3DarkTheme;

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
