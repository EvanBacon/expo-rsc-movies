"use client";
"use no memo";

import React, { useEffect } from "react";
import { StyleSheet, useColorScheme, ViewStyle } from "react-native";

import { BlurView } from "expo-blur";
import { Stack } from "expo-router";
import Animated, {
  AnimatedRef,
  interpolate,
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import * as AC from "@bacons/apple-colors";
import { useReanimatedHeaderHeight } from "react-native-screens/reanimated";

export const ScrollContext =
  React.createContext<AnimatedRef<Animated.ScrollView> | null>(null);

const ABlurView = Animated.createAnimatedComponent(BlurView);
const HEADER_HEIGHT = 300;
const ANIM_START = HEADER_HEIGHT * 0.66;

export function ShowPageBody({ children }: { children: React.ReactNode }) {
  "use no memo";
  const ref = useAnimatedRef<Animated.ScrollView>();

  const scroll = useScrollViewOffset(ref);
  const style =
    process.env.EXPO_OS === "ios"
      ? useAnimatedStyle(() => {
          const inputRange = [ANIM_START, ANIM_START + 30];
          return {
            opacity: interpolate(scroll.get(), inputRange, [0, 1], "clamp"),
            borderBottomColor: interpolateColor(scroll.get(), inputRange, [
              `rgba(84.15, 84.15, 89.25,0)`,
              `rgba(84.15, 84.15, 89.25,0.5)`,
            ]),
          };
        })
      : useAnimatedStyle(() => {
          return {
            opacity: interpolate(scroll.get(), [100, 150], [0, 1], "clamp"),

            borderBottomColor: `rgba(84.15, 84.15, 89.25,${interpolate(
              scroll.get(),
              [100, 150],
              [0, 0.2],
              "clamp"
            )})`,
          };
        });
  const titleStyle = useAnimatedStyle(() => {
    const inputRange = [ANIM_START, ANIM_START + 30];
    return {
      opacity: interpolate(scroll.get(), inputRange, [0, 1], "clamp"),
      transform: [
        { translateY: interpolate(scroll.get(), inputRange, [5, 0], "clamp") },
      ],
    };
  });

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo();
    }
  }, [ref]);

  return (
    <>
      {/* <Animated.View
        style={[
          // StyleSheet.absoluteFill,
          {
            zIndex: 999,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,

            maxHeight: headerHeight.get(),
            minHeight: headerHeight.get(),
            width: "auto",
            // height: "auto",
            borderBottomWidth: 0.5,
          },
          style,
        ]}
      >
        <BlurView
          intensity={100}
          tint={"systemChromeMaterial"}
          style={[
            StyleSheet.absoluteFill,
            {
              flex: 1,
            },
          ]}
        />
      </Animated.View> */}
      <Animated.ScrollView
        ref={ref}
        style={{ backgroundColor: AC.systemGroupedBackground }}
        automaticallyAdjustsScrollIndicatorInsets={true}
        contentInsetAdjustmentBehavior="never"
      >
        <Stack.Screen
          options={{
            headerTransparent: true,
            headerLargeTitle: false,
            headerLargeStyle: {
              backgroundColor: undefined,
            },
            headerBlurEffect: "none",
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: AC.label,
            headerBackground() {
              if (process.env.EXPO_OS === "web") {
                return <AnimatedShowHeaderBackground style={style} />;
              }
              return null;
            },
            headerTitle(props) {
              if (process.env.EXPO_OS === "web") {
                return (
                  <Animated.Text
                    style={[
                      {
                        width: "100%",
                        color: AC.label,
                        fontSize: 16,
                        fontWeight: "600",
                      },
                      titleStyle,
                    ]}
                  >
                    {props.children}
                  </Animated.Text>
                );
              }
              return null;
            },
          }}
        />

        <ScrollContext.Provider value={ref}>{children}</ScrollContext.Provider>
      </Animated.ScrollView>
    </>
  );
}

function AnimatedShowHeaderBackgroundIos({ style }: { style: ViewStyle }) {
  const headerHeight = useReanimatedHeaderHeight();

  return (
    <Animated.View
      style={[
        // StyleSheet.absoluteFill,
        {
          zIndex: 999,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,

          maxHeight: headerHeight,
          minHeight: headerHeight,
          width: "auto",
          // height: "auto",
          borderBottomWidth: 0.5,
        },
        style,
      ]}
    >
      <BlurView
        intensity={100}
        tint={"systemChromeMaterial"}
        style={[
          StyleSheet.absoluteFill,
          {
            flex: 1,
          },
        ]}
      />
    </Animated.View>
  );
}

export function ParallaxImageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  "use no memo";
  const ref = React.use(ScrollContext);
  const scrollOffset = useScrollViewOffset(ref);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
            "clamp"
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: HEADER_HEIGHT,
        },
        headerAnimatedStyle,
      ]}
    >
      {children}
    </Animated.View>
  );
}

export function AnimatedShowHeaderBackground({ style }: { style: ViewStyle }) {
  const theme = useColorScheme();

  return (
    <ABlurView
      intensity={100}
      tint={
        theme === "dark" ? "systemChromeMaterialDark" : "systemChromeMaterial"
      }
      style={[
        StyleSheet.absoluteFill,
        {
          borderBottomWidth: 0.5,
        },
        style,
      ]}
    />
  );
}
