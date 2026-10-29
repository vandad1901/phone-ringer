import type { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Surface, Text, useTheme } from "react-native-paper";

import { Spacing } from "@/constants/theme";

type HintRowProps = {
  title?: string;
  hint?: ReactNode;
};

export function HintRow({ title = "Try editing", hint = "app/index.tsx" }: HintRowProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.stepRow}>
      <Text variant="bodyMedium">{title}</Text>
      <Surface elevation={0} style={[styles.codeSnippet, { backgroundColor: colors.surfaceVariant }]}>
        <Text variant="labelMedium" style={{ color: colors.onSurfaceVariant }}>
          {hint}
        </Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.two,
  },
  codeSnippet: {
    borderRadius: Spacing.two,
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
  },
});
