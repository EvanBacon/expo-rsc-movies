import { IconSymbol, IconSymbolName } from "@/components/ui/IconSymbol";
import {
  BottomTabBarButtonProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import * as Haptics from "expo-haptics";
import React from "react";
// Better transitions on web, no changes on native.
import { PlatformPressable } from "@react-navigation/elements";
import { Tabs as NativeTabs } from "expo-router";
import { Platform, useWindowDimensions } from "react-native";

// These are the default tab options for iOS, they disable on other platforms.
const DEFAULT_TABS: BottomTabNavigationOptions = {
  headerShown: false,
};
export default function Tabs({
  screenOptions,
  children,
  ...props
}: React.ComponentProps<typeof NativeTabs>) {
  const processedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const { systemImage, title, ...props } = child.props;
      if (systemImage || title != null) {
        return React.cloneElement(child, {
          ...props,
          options: {
            tabBarIcon: !systemImage
              ? undefined
              : (props: any) => <IconSymbol {...props} name={systemImage} />,
            title,
            ...props.options,
          },
        });
      }
    }
    return child;
  });

  const { width } = useWindowDimensions();

  const isMd = width >= 768;
  const isLg = width >= 1024;

  return (
    <NativeTabs
      screenOptions={{
        ...DEFAULT_TABS,

        ...Platform.select({
          ios: isMd
            ? {
                tabBarPosition: "left",
                tabBarVariant: "material",
                tabBarLabelPosition: isLg ? undefined : "below-icon",
                tabBarStyle: {
                  // Use a transparent background on iOS to show the blur effect
                  position: "relative",
                },
              }
            : {
                tabBarPosition: "bottom",
              },
          default: isMd
            ? {
                tabBarPosition: "left",
                tabBarVariant: "material",
                tabBarLabelPosition: isLg ? undefined : "below-icon",
              }
            : {
                tabBarPosition: "bottom",
              },
        }),

        ...screenOptions,
      }}
      {...props}
    >
      {processedChildren}
    </NativeTabs>
  );
}

Tabs.Screen = NativeTabs.Screen as React.FC<
  React.ComponentProps<typeof NativeTabs.Screen> & {
    /** Add a system image for the tab icon. */
    systemImage?: IconSymbolName;
    /** Set the title of the icon. */
    title?: string;
  }
>;

function HapticTab(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === "ios") {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}
