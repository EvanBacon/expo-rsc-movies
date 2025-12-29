import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
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
            {Platform.select({
              ios: <Icon sf="magnifyingglass" />,
              default: (
                <Icon
                  src={
                    <VectorIcon family={MaterialCommunityIcons} name="magnify" />
                  }
                />
              ),
            })}
          </NativeTabs.Trigger>
          <NativeTabs.Trigger name="(settings)">
            <Label>From Expo</Label>
            {Platform.select({
              ios: <Icon sf="app.gift.fill" />,
              default: (
                <Icon
                  src={
                    <VectorIcon family={MaterialCommunityIcons} name="gift" />
                  }
                />
              ),
            })}
          </NativeTabs.Trigger>
        </NativeTabs>
      </ReanimatedScreenProvider>
      {process.env.EXPO_OS === "android" && <StatusBar style="auto" />}
    </ThemeProvider>
  );
}
