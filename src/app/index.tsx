import { HintRow } from "@/components/hint-row";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useBlackout } from "@/hooks/use-blackout";
import { useAudioPlayer } from "expo-audio";
import * as Network from "expo-network";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import TcpSocket from "react-native-tcp-socket";

const PORT = 9333;

export default function PlayerScreen() {
  const ip = usePlayerServer();
  const { colors } = useTheme();
  const { setBlackedOut } = useBlackout();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Text variant="titleLarge" style={styles.title}>
        Phone Ringer
      </Text>

      <Text variant="labelMedium" style={styles.code}>
        get started
      </Text>

      <HintRow title="Server IP Address" hint={ip} />
      <Button
        mode="contained"
        onPress={() => {
          setBlackedOut(true);
        }}
      >
        Blackout
      </Button>
    </SafeAreaView>
  );
}

export function usePlayerServer() {
  const player = useAudioPlayer(require("@/assets/sounds/ring.mp3"));
  const playerRef = useRef(player);
  const [ip, setIp] = useState("");

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    Network.getIpAddressAsync().then(setIp);

    const server = TcpSocket.createServer((socket) => {
      let buf = "";
      socket.on("data", (data) => {
        buf += data.toString();
        let i;
        while ((i = buf.indexOf("\n")) >= 0) {
          const cmd = buf.slice(0, i).trim().toUpperCase();
          buf = buf.slice(i + 1);
          const p = playerRef.current;
          if (cmd === "PLAY") {
            p.seekTo(0);
            p.play();
          } else if (cmd === "STOP") {
            p.pause();
            p.seekTo(0);
          }
        }
      });
      socket.on("error", (e) => console.warn("socket error", e));
    });

    server.listen({ port: PORT, host: "0.0.0.0" });
    return () => {
      server.close();
    };
  }, []);

  return ip;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  title: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
});
