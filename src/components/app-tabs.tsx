import { NativeTabs } from "expo-router/native-tabs";
import { useTheme } from "react-native-paper";

export default function AppTabs() {
  const { colors } = useTheme();

  return (
    <NativeTabs
      backgroundColor={colors.elevation.level2}
      indicatorColor={colors.secondaryContainer}
      labelStyle={{
        default: { color: colors.onSurfaceVariant },
        selected: { color: colors.onSurface },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Player</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="play" md="play_arrow" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="remote">
        <NativeTabs.Trigger.Label>Remote</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="wifi" md="wifi" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
