import { PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { List, Surface } from "react-native-paper";

import { Spacing } from "@/constants/theme";

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  return (
    <List.Accordion title={title}>
      <Surface elevation={1} style={styles.content}>
        {children}
      </Surface>
    </List.Accordion>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: Spacing.three,
    borderRadius: Spacing.three,
    marginLeft: Spacing.four,
    padding: Spacing.four,
  },
});
