import { ChevronDown, ChevronUp, CircleHelp, type LucideIcon } from "lucide-react-native";
import type { PaperProvider } from "react-native-paper";
import type { ComponentProps } from "react";

type IconRenderer = NonNullable<NonNullable<ComponentProps<typeof PaperProvider>["settings"]>["icon"]>;

// react-native-paper renders MaterialCommunityIcons by default, which isn't installed.
// Map the icon names Paper components use internally onto lucide icons instead.
const icons: Record<string, LucideIcon> = {
  "chevron-down": ChevronDown,
  "chevron-up": ChevronUp,
};

export const PaperIcon: IconRenderer = ({ name, color, size, testID }) => {
  const Icon = (typeof name === "string" && icons[name]) || CircleHelp;
  return <Icon color={color} size={size} testID={testID} />;
};
