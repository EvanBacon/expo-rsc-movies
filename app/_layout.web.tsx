import Tabs from "@/components/ui/Tabs";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ThemeProvider from "@/components/ui/ThemeProvider";
import { ReanimatedScreenProvider } from "react-native-screens/reanimated";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReanimatedScreenProvider>
        {process.env.EXPO_OS === "web" && (
          <meta name="apple-itunes-app" content="app-id=6745745461" />
        )}
        <Tabs>
          <Tabs.Screen
            name="(index)"
            title="Search"
            systemImage="magnifyingglass"
          />
          <Tabs.Screen
            name="(settings)"
            title="From Expo"
            systemImage="app.gift.fill"
          />
        </Tabs>
      </ReanimatedScreenProvider>
      {process.env.EXPO_OS === "android" && <StatusBar style="auto" />}
    </ThemeProvider>
  );
}
