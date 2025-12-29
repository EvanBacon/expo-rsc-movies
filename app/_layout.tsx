import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import ThemeProvider from "@/components/ui/ThemeProvider";
import { ReanimatedScreenProvider } from "react-native-screens/reanimated";

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <ReanimatedScreenProvider>
        <NativeTabs>
          <NativeTabs.Trigger
            name="(index)"
            role="search"
            options={{
              specialEffects: {
                overrideScrollViewContentInsetAdjustmentBehavior: true,
              },
            }}
          >
            <Label>Search</Label>
            <Icon sf="magnifyingglass" />
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(settings)">
            <Label>From Expo</Label>
            <Icon sf="app.gift.fill" />
          </NativeTabs.Trigger>
        </NativeTabs>
      </ReanimatedScreenProvider>
      {process.env.EXPO_OS === "android" && <StatusBar style="auto" />}
    </ThemeProvider>
  );
}
