import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useVisitorRegistrationStore } from "@/store/VisitorRegistrationStore";

export default function RootLayout() {
  const router = useRouter();
  const visitorId = useVisitorRegistrationStore((state) => state.visitorId);

  useEffect(() => {
    console.log("visitorId", visitorId);

    if (process.env.NODE_ENV === "development" && visitorId) {
      router.push("/HomePage");
    } else if (!visitorId) {
      router.push("/");
    }
  }, [visitorId]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="OTPAuth" options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
