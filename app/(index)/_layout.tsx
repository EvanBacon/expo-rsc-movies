import Stack from "@/components/ui/Stack";
import React from "react";

export const unstable_settings = {
  anchor: "index",
};

export { ErrorBoundary } from "expo-router";

export default function TabLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Search",
        headerLargeTitle: false,
      }}
    />
  );
}
