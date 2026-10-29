import AppTabs from "@/components/app-tabs";
import { PaperIcon } from "@/components/paper-icon";
import { DarkTheme, LightTheme } from "@/constants/theme";
import { BlackoutProvider } from "@/hooks/use-blackout";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { PaperProvider } from "react-native-paper";

export default function TabLayout() {
  const scheme = useColorScheme();
  const theme = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <BlackoutProvider>
      <PaperProvider theme={theme} settings={{ icon: PaperIcon }}>
        <AppTabs />
      </PaperProvider>
    </BlackoutProvider>
  );
}
