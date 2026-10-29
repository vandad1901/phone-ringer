import { useRef, useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TcpSocket from "react-native-tcp-socket";

import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

const PORT = 9333;

export default function Remote() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();
  const socketConnection = useRef<ReturnType<typeof TcpSocket.createConnection> | null>(null);

  const [serverIP, setServerIP] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.colors.background }]}
      contentInset={insets}
      contentContainerStyle={[styles.contentContainer, { paddingTop: safeAreaInsets.top }]}
    >
      <View style={styles.container}>
        <Text variant="titleLarge">Phone Ringer</Text>
        <TextInput
          mode="outlined"
          label="Server IP Address"
          value={serverIP}
          onChangeText={setServerIP}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Button
          title="Connect"
          disabled={!serverIP}
          onPress={() => {
            if (socketConnection.current) {
              socketConnection.current.destroy();
            }
            const socket = TcpSocket.createConnection({ host: serverIP, port: PORT }, () => {
              setIsConnected(true);
            });
            socketConnection.current = socket;
            socket.on("close", () => {
              if (socketConnection.current === socket) {
                setIsConnected(false);
                socketConnection.current = null;
              }
            });
            socket.on("error", (error) => {
              console.warn("Connection error", error);
              if (socketConnection.current === socket) {
                setIsConnected(false);
                socketConnection.current = null;
              }
            });
          }}
        />
        <Button
          title="Play"
          disabled={!isConnected}
          onPress={() => {
            if (socketConnection.current?.readyState === "open") {
              socketConnection.current.write("PLAY\n");
            }
          }}
        />
        <Button
          title="Stop"
          disabled={!isConnected}
          onPress={() => {
            if (socketConnection.current?.readyState === "open") {
              socketConnection.current.write("STOP\n");
            }
          }}
        />
        <Text variant="labelMedium" style={{ color: isConnected ? "green" : "red" }}>
          {isConnected ? "Connected" : "Disconnected"}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
});
